---
title: "대용량 JSON 파일을 효율적으로 전송하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-HowToTransferLargeJSONFilesEfficiently_0.png"
date: 2024-05-20 21:43
ogImage: 
  url: /assets/img/2024-05-20-HowToTransferLargeJSONFilesEfficiently_0.png
tag: Tech
originalTitle: "How To Transfer Large JSON Files Efficiently"
link: "https://medium.com/gitconnected/how-to-transfer-large-json-files-efficiently-08c4b83ee058"
---


<img src="/assets/img/2024-05-20-HowToTransferLargeJSONFilesEfficiently_0.png" />

대규모 JSON 데이터를 전송할 때, 기존 방식을 사용하면 데이터 처리를 시작하기 전에 완전한 JSON 데이터를 수신해야 하므로 사용자 경험에 영향을 줄 수 있습니다. 이 문제를 해결하기 위해 기존의 JSON 스트림 구문 분석 라이브러리를 사용할 수 있습니다. 예를 들어 내부적으로 TextDecoder API를 사용하는 @streamparser/json이 있습니다.

TextDecoder API는 이진 데이터 (일반적으로 ArrayBuffer 또는 TypedArray)를 문자열로 디코딩하기 위한 JavaScript API입니다. 이는 Web 플랫폼의 일부이며 텍스트 인코딩의 디코딩을 처리하는 데 주로 사용됩니다. 예를 들어, 서버로부터 수신한 스트리밍 데이터, 파일 데이터 등을 처리하는 데 사용됩니다.

# TextDecoder API 사용 이유

<div class="content-ad"></div>

웹 애플리케이션에서 이진 데이터를 다룰 때, 이 데이터를 읽을 수 있는 문자열 형식으로 변환해야 하는 경우가 종종 있습니다. TextDecoder를 사용하면 이를 효율적이고 편리하게 할 수 있습니다.

TextDecoder API에는 다음과 같은 기능이 있습니다:

- 효율적: 수동으로 바이트 단위로 처리하는 것보다 효율적이며, 문자열로 직접 디코딩이 가능합니다.
- 여러 인코딩 지원: 다양한 텍스트 인코딩(예: UTF-8, UTF-16, ISO-8859-1 등)을 지원합니다.
- 스트리밍 처리 지원: 데이터를 조각조각으로 처리할 수 있어 대용량 데이터 스트림 또는 실시간 처리가 필요한 데이터에 적합합니다.

# TextDecoder API 사용 방법

<div class="content-ad"></div>

다음으로, TextDecoder API를 사용하는 네 가지 시나리오를 소개하겠습니다:

- 서로 다른 인코딩된 바이너리 데이터 해독
- 스트리밍 JSON 데이터 디코딩
- 대용량 JSON 파일의 데이터 청크 디코딩

## 1. 서로 다른 인코딩된 바이너리 데이터 해독

```js
// 다른 인코딩으로 TextDecoder 인스턴스 생성
const utf16Decoder = new TextDecoder('utf-16');
const iso88591Decoder = new TextDecoder('iso-8859-1');

const utf16Array = new Uint16Array([0x0048, 0x0065, 0x006C, 0x006C, 0x006F]);
const iso88591Array = new Uint8Array([72, 101, 108, 108, 111]);

// 문자열로 디코딩
const utf16String = utf16Decoder.decode(utf16Array);
const iso88591String = iso88591Decoder.decode(iso88591Array);

console.log(utf16String); // 출력："Hello"
console.log(iso88591String); // 출력："Hello"
```

<div class="content-ad"></div>

## 2. 스트리밍 JSON 데이터 디코딩

먼저, 결과를 살펴봅시다:

![이미지](/assets/img/2024-05-20-HowToTransferLargeJSONFilesEfficiently_1.png)

위의 예제에서는 Node.js의 http 모듈을 사용하여 로컬 SSE (서버 전송 이벤트) 서버를 빠르게 구축합니다.

<div class="content-ad"></div>

server.js

```js
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    });

    let id = 1;
    const interval = setInterval(() => {
      const data = {
        id: id,
        message: `This is message ${id}`,
        timestamp: +new Date(),
      };
      res.write(`data: ${JSON.stringify(data)}\n\n`);

      if (id == 5) {
        res.write("event: end\n");
        res.write("data: End of stream\n\n");
        clearInterval(interval);
        res.end();
      }

      id++;
    }, 1000);

    req.on("close", () => {
      clearInterval(interval);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

sse 핸들러에서는 Content-Type 응답 헤더의 유형을 "text/event-stream"으로 설정하여 클라이언트에게 스트리밍 데이터를 반환한다는 것을 알려줍니다.

index.html

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSE & TextDecoder</title>
</head>
<body>
    <h1>서버-전송 이벤트 JSON 스트림 데이터 디코딩</h1>
    <div id="messages"></div>
    <script src="client.js"></script>
</body>
</html>
```

client.js

```js
document.addEventListener("DOMContentLoaded", () => {
  const messagesDiv = document.querySelector("#messages");
  const textDecoder = new TextDecoder("utf-8");

  fetch("http://localhost:3000/sse").then((response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }

            const chunk = textDecoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const json = line.slice(6);
                const data = JSON.parse(json);
                const p = document.createElement("p");
                p.textContent = `ID: ${data.id}, Message: ${data.message}, Timestamp: ${data.timestamp}`;
                messagesDiv.appendChild(p);
              } else if (line.startsWith("event: end")) {
                const p = document.createElement("p");
                p.textContent = "스트림의 끝";
                messagesDiv.appendChild(p);
                return;
              }
            }
            push();
          });
        }
        push();
      },
    });
  });
});
```

SSE 이벤트 스트림은 간단한 텍스트 데이터 스트림이며 해당 텍스트는 UTF-8 형식을 사용하여 인코딩됩니다. 따라서 textDecoder 객체를 생성할 때 인코딩을 utf-8로 설정해야 합니다. 텍스트Decoder 객체가 준비되면 해당 객체가 제공하는 decode 메소드를 호출하여 디코딩할 수 있습니다.


<div class="content-ad"></div>

## 3. 대용량 JSON 파일에서 데이터 청크 디코딩하기

다시 한번, 먼저 결과를 살펴봅시다:

![이미지](/assets/img/2024-05-20-HowToTransferLargeJSONFilesEfficiently_2.png)

위 그림에서 JSON 데이터 출력은 다음 large.json 파일에서 나온 것입니다. 우리는 파일을 0.5KB씩 잘라서 500ms마다 다음 청크를 보내는 방식으로 처리합니다. @streamparser/json 라이브러리를 사용하여 JSON 청크를 파싱할 수 있는 기능을 구현했습니다.

<div class="content-ad"></div>


large.json

```js
[
  {},
  {
    "image": [
      {
        "shape": "rect",
        "fill": "#333",
        "stroke": "#999",
        "x": 0.5e1,
        "y": 0.5,
        "z": 0.8,
        "w": 0.5e5,
        "u": 2e10,
        "foo": 2e1,
        "bar": 2,
        "width": 47,
        "height": 47
      }
    ],
    "corners": { "1": true, "3": true, "7": true, "9": true }
  },
 ...
]
```

json-server.js

```js
const http = require("http");
const { join } = require("path");
const { readFileSync } = require("fs");

const PORT = 3000;

const largeJson = readFileSync(join(__dirname, "large.json")).toString();

const server = http.createServer((req, res) => {
  if (req.url === "/stream-json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    });

    const CHUNK_SIZE = 512;
    let position = 0;

    const interval = setInterval(() => {
      const chunk = largeJson.slice(position, position + CHUNK_SIZE);
      res.write(chunk);
      position += CHUNK_SIZE;

      if (position >= largeJson.length) {
        clearInterval(interval);
        res.end();
      }
    }, 500);

    req.on("close", () => {
      clearInterval(interval);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
``` 


<div class="content-ad"></div>

stream.html

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stream JSON</title>
  </head>
  <body>
    <h1>Stream JSON</h1>
    <div id="messages"></div>
    <script type="module">
      import { JSONParser } from "https://cdn.jsdelivr.net/npm/@streamparser/json-whatwg@0.0.21/+esm";
      const messagesDiv = document.querySelector("#messages");

      document.addEventListener("DOMContentLoaded", async () => {
        const parser = new JSONParser();

        const response = await fetch("http://localhost:3000/stream-json");

        const reader = response.body.pipeThrough(parser).getReader();
        while (true) {
          const { done, value: parsedElementInfo } = await reader.read();
          if (done) break;

          const { value, key, parent, stack, partial } = parsedElementInfo;
          if (partial) {
            console.log(`Parsing value: ${value}... (still parsing)`);
          } else {
            const p = document.createElement("p");
            p.textContent = `${JSON.stringify(value)}`;
            messagesDiv.appendChild(p);
            console.log(`Value parsed: ${JSON.stringify(value)}`);
          }
        }
      });
    </script>
  </body>
</html>
```

@streamparser/json 라이브러리는 다른 용도도 있어요. 관심이 있다면 사용 설명서를 살펴보세요. TextDecoder API에 대한 다른 유용한 사용 사례가 있으면 댓글을 남겨주세요.

TypeScript는 정말 멋지고 배울 가치가 있어요. TypeScript를 배우고 싶다면 Medium이나 Twitter에서 저를 팔로우해서 TS와 JS에 관한 더 많은 내용을 읽을 수 있어요!