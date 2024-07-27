---
title: "리얼타임 스트리밍 Askbot을 React, Express, ChatGPT로 개발하기"
description: ""
coverImage: "/assets/img/2024-05-12-Real-timestreamingAskbotwithReactExpressChatGPT_0.png"
date: 2024-05-12 20:32
ogImage: 
  url: /assets/img/2024-05-12-Real-timestreamingAskbotwithReactExpressChatGPT_0.png
tag: Tech
originalTitle: "Real-time streaming Askbot with React, Express , ChatGPT"
link: "https://medium.com/@jsameer/real-time-askbot-with-react-express-chatgpt-8bb465352a77"
---


![이미지](https://miro.medium.com/v2/resize:fit:1244/1*pgF3zoeDTN7tEbUP67AzaA.gif)

이 블로그는 React를 사용하여 ChatGPT 앱을 안전하게 설정하는 데 초점을 맞춥니다.

OpenAI는 클라이언트 라이브러리를 제공하여 React 앱에서 ChatGPT를 직접 사용할 수 있지만, 라이브러리 자체가 경고하는 대로:

그러므로 이상적인 방법은 서버가 ChatGPT와 통신하여 원하는 응답을 받은 다음 해당 응답을 다시 React 앱으로 전달하는 것입니다.



하지만 위 스크린샷에 나와 있는 것처럼 ChatGPT와 같은 스트리밍 응답을 어떻게 구현할 수 있을까요?

이를 달성하기 위한 세 가지 단계는 다음과 같습니다:

- NodeJS-Express 서버 설정
- OpenAI 및 스트리밍 응답 설정
- React 앱에서 작동시키기

# NodeJS-Express 서버 설정



첫 번째로, React 앱과 OpenAI ChatGPT API 사이에서 중계 역할을 하는 Express 서버를 만들어야 합니다. 이 서버는 OpenAI로의 API 호출을 처리하고 응답을 React 앱으로 스트리밍합니다.

먼저 Node.js와 npm이 설치되어 있는지 확인하세요. 그런 다음 프로젝트 디렉토리에서 다음 명령을 실행하세요:

```js
npm install express cors body-parser
```

아래 코드를 사용하여 app.js에 빠른 Express 서버 설정을해보세요:



```js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ data: "success" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

다음 명령어를 사용하여 서버를 실행하세요:

```js
node app.js
```

팁: 언제든지 변경 사항을 만들 때마다 Express 서버를 다시로드하려면 nodemon을 사용할 수 있습니다.



# OpenAI 및 스트리밍 응답 설정

## OpenAI 설정하기

오픈에이아이 라이브러리를 설치하고 시작하세요!

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
});

const systemMessage = {
  role: "system",
  content:
    "You are a Askbot. You are supposed to answer the questions asked by the users. Validate the prompts to be a question and it should not in approprite. Give funky responses",
};

export const getStreamingCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [systemMessage, { role: "user", content: userPrompt }],
    stream: true,
  });
};
```



OpenAI 웹사이트에서 실제 OpenAI API 키를 얻을 수 있습니다.

작성 시점에서 현재 안정 버전인 openai 라이브러리(3.3.0)에서는 스트리밍이 제대로 작동하지 않습니다. 여기에 설명된 대로.

라이브러리의 곧 출시될 v4 버전에서는 이를 지원할 것입니다. 베타 버전을 통해 이미 사용 가능합니다. 그럼 설치해봅시다:
npm install openai@4.0.0-beta.6 . 코드는 그대로 유지됩니다.

## ChatGPT에서 스트리밍 패치 설정



스트리밍 응답의 큰 장점은 응답이 도착하는 대로 표시될 수 있어 사용자가 완전한 응답을 기다릴 필요가 없다는 것입니다. 이것은 프롬프트에 따라 시간이 오래 소요될 수 있기 때문에 중요합니다.

스트리밍 응답을 소비하려면 아래 코드를 확인해보세요:

```js
let starttime = Date.now();
const stream = await getStreamingCompletion({ userPrompt: userPrompt });
 for await (const part of stream) {
    const chunkTime = (Date.now() - starttime) / 1000;
    process.stdout.write(JSON.stringify(part.choices[0]?.delta || ""));
    console.log(" chunk time:", chunkTime);
}
```

해보세요. 델타와 해당 델타가 표시되기까지 걸린 시간을 볼 수 있어야 합니다. 델타는 결과에서 다음 토큰입니다. 사용자가 "안녕"이라는 프롬프트를 제시하면 다음과 유사한 응답을 받게 될 것입니다:




![이미지](/assets/img/2024-05-12-Real-timestreamingAskbotwithReactExpressChatGPT_0.png)

## Express API로부터의 스트리밍 응답

Express에는 응답을 스트림으로 반환하는 API가 이미 준비되어 있습니다.

아래는 Express 서버의 전체 코드입니다:



```js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getStreamingCompletion } from "./src/modules/openai/index.js";

const app = express();
const port = 2000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ data: "success" });
});

app.post("/aiCompletion", async (req, res) => {
  const data = req.body;
  let starttime = Date.now();
  const stream = await getStreamingCompletion({ userPrompt: data?.userPrompt });
  for await (const part of stream) {
    // here express will stream the response
    res.write(part.choices[0]?.delta.content || "");
  }
  // here express sends the closing/done/end signal for the stream consumer
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```
# 리액트 앱에서 작동시키는 방법

프론트 엔드를 설정해 봅시다. 나는 React SPA를 사용하고 있어요. 왜 SPA를 사용하냐고요? Next나 Remix가 제공하는 풀 스택 기능이 필요하지 않기 때문에 ExpressJS 기반의 백엔드를 이미 사용하고 있어요.

Vite를 사용해서 빠르게 설정해 보세요 (당연한 이유로 CRA는 사용하지 않는 것이 좋아요).



스트리밍 데이터를 읽기 위해 응답으로부터 리더를 사용해야 하며, 그 데이터를 바이트 스트림에서 문자열로 변환하기 위해 디코딩해야 합니다. 아래는 그에 대한 샘플 코드입니다:

```js
  // 사용자 프롬프트에 기반한 서버 응답 가져오기
  const response = await fetch("http://localhost:2000/aiCompletion", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userPrompt: prompt }),
  });
  if (!response.ok || !response.body) {
    throw response.statusText;
  }

  // 여기서 스트리밍 응답 준비를 시작합니다
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const loopRunner = true;

  while (loopRunner) {
    // 여기서 스트림을 읽기 시작합니다. 완료될 때까지.
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    setAnswer(answer => answer + decodedChunk); // 새 청크로 상태 업데이트
  }
```

React에서 useState를 사용하여 decodedChunk를 추가해 실시간 스트리밍 응답을 형성할 수 있습니다.

이 예제는 ReactJS, Express, 그리고 OpenAI ChatGPT API를 사용하여 스트리밍 채팅 응답을 구현하는 기본적인 예제를 보여줍니다. 사용 사례 및 요구 사항에 따라 오류 처리를 개선하거나 스타일을 추가하고 대화 흐름을 세밀하게 조정해야 할 수 있습니다.



당신은 이 레포지토리를 사용하여 직접 askbot을 실행하고 실험해볼 수 있어요.