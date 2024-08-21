---
title: "NodeJS에서 자식 프로세스 멀티태스킹을 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_0.png"
date: 2024-06-22 02:16
ogImage:
  url: /assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_0.png
tag: Tech
originalTitle: "Child Processes: Multitasking in NodeJS"
link: "https://medium.com/@manikmudholkar831995/child-processes-multitasking-in-nodejs-751f9f7a85c8"
isUpdated: true
---

## 자식 프로세스, Spawn, Exec, ExecFile, Fork, IPC의 심층 탐험

![Child Processes](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_0.png)

이 글은 시니어 엔지니어를 위한 고급 NodeJS 시리즈의 다섯 번째 글입니다. 이 글에서는 자식 프로세스가 어떻게 작동하는지, 왜 필요한지, 어떻게 사용하는지를 자세히 설명하고 자식 프로세스를 사용하여 최상의 성능을 얻는 방법을 알려드리겠습니다. 공식 문서에서 자식 프로세스에 대한 자세한 내용을 확인할 수 있습니다.

[고급 NodeJS 시리즈의 다른 글들](#)

글 시리즈 로드맵

- V8 JavaScript 엔진
- NodeJS의 비동기 I/O
- NodeJS의 이벤트 루프
- 워커 스레드: NodeJS에서의 멀티태스킹
- 자식 프로세스: NodeJS에서의 멀티태스킹 (이 글)
- 클러스터링과 PM2: NodeJS에서의 멀티태스킹
- NodeJS에 대한 흔한 오해의 해소

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
콘텐츠 테이블

* 자식 프로세스란 무엇인가요?
* 왜 필요한 것인가요?
  * 외부 프로그램 실행
  * 향상된 격리성
  * 향상된 확장성
  * 향상된 견고성
* 자식 프로세스 생성
  * 프로세스 생성을 위해 .spawn() 사용
  * 프로세스 생성을 위해 .fork() 사용
  * 프로세스 생성을 위해 exec() 사용
  * 프로세스 생성을 위해 execFile() 사용
  * 동기식 프로세스 생성
  * 언제 어떤 것을 사용해야 할까요?
* 자식 프로세스 중단/중지/종료하기
* 자식 및 부모 프로세스 간 I/O 처리
  * 스트림을 함께 연결하기
* 명령 실행 시 보안
* 자식 프로세스가 부모 프로세스와 독립적으로 실행되도록 설정
* spawn을 사용하여 쉘 구문 및 부모의 표준 I/O 상속 사용
```

# 자식 프로세스란 무엇인가요?

<img src="https://miro.medium.com/v2/resize:fit:1080/1*4FmkxDXT9kOVn-b2x6onYA.gif" />

NodeJS 애플리케이션을 실행하면 VS Code, VLC Player 등과 같이 다른 애플리케이션을 실행할 때와 마찬가지로 자체 프로세스를 가집니다. 이 프로세스의 속성은 글로벌 객체의 process 변수에 사용 가능하며 해당 값을 Node 앱 코드에서 사용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

NodeJS는 본질적으로 단일 스레드이지만 동기화, CPU 집약 작업을 실행해야 하는 경우와 같이 멀티 프로세스가 필요한 경우가 있을 수 있습니다. 여기서 자식 프로세스가 등장합니다. node:child_process 모듈을 사용하면 부모 프로세스와 자식 프로세스 간의 통신 채널인 IPC(Inter Process Communication)을 설정할 수 있습니다.

이 모듈은 긴 작업을 처리하는 데만 한정되지 않고 운영 체제와 쉘 명령을 실행하는 능력이 있습니다. 간단히 말해, 이는 JavaScript뿐만 아니라 Git, Python, PHP 또는 다른 언어도 실행할 수 있도록 해줍니다.

# 그렇다면 왜 필요했을까요?

이미 CPU 집약 작업을 처리하기 위한 워커 스레드가 있는데 왜 자식 프로세스가 필요한지 궁금할 수 있습니다. 워커 스레드는 자체 힙(heap), V8 인스턴스 및 이벤트 루프를 갖고 있기 때문입니다. 하지만 동일한 프로세스 내에서 스레드보다 별도의 서브 프로세스가 더 바람직한 경우가 있습니다. 왜 그런지 설명하겠습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 외부 프로그램 실행

자식 프로세스를 사용하면 외부 프로그램이나 스크립트를 별도의 프로세스로 실행할 수 있습니다. 다른 실행 파일과 상호 작용해야 할 때 매우 유용합니다.

## 향상된 격리성

워커 스레드와 달리, 자식 프로세스는 전체 Node.js 런타임의 별도 인스턴스를 제공합니다. 각 자식 프로세스는 자체 메모리 공간을 가지고 IPC(Inter-Process Communication)를 통해 주 프로세스와 통신합니다. 이러한 수준의 격리는 자원 충돌이나 분리되어야 하는 종속성이 있는 작업에 유용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 향상된 확장성

자식 프로세스는 여러 프로세스 사이에서 작업을 분산하여 멀티 코어 시스템의 성능을 활용할 수 있습니다. 이를 통해 더 많은 동시 요청을 처리하고 응용 프로그램의 전체적인 확장성을 향상시킬 수 있습니다.

## 향상된 안정성

자식 프로세스가 어떤 이유로 인해 충돌하더라도 주 프로세스는 함께 무너지지 않습니다. 이는 응용 프로그램이 실패에도 불구하고 안정적이고 강건하게 유지됨을 보장합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

일꾼 스레드는 특정 시나리오에서 좋지만, 자식 프로세스는 외부 프로그램 실행, 격리 제공, 확장성 향상 및 견고성을 보장하는 멋진 장점을 제공합니다.

# 자식 프로세스 생성

child_process 모듈을 사용하면 운영 체제 기능에 액세스할 수 있습니다. 해당 모듈은 자식 프로세스 내에서 시스템 명령을 실행하는 경우에 사용됩니다. 이러한 자식 프로세스는 동기적 및 비동기적으로 생성할 수 있습니다.

```javascript
const { spawn, fork, exec, execFile } = require("child_process");
```

child_process.spawn(), child_process.fork(), child_process.exec(), child_process.execFile() 메서드는 서브 프로세스를 비동기적으로 생성하는 데 사용됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

각 메소드는 ChildProcess 인스턴스를 반환합니다. 이러한 객체들은 Node.js EventEmitter API를 구현하며, 부모 프로세스가 자식 프로세스의 라이프 사이클 중 특정 이벤트가 발생할 때 호출되는 리스너 함수를 등록할 수 있습니다. 예시는 다음과 같습니다.

- `disconnect` 이벤트는 부모 프로세스에서 subprocess.disconnect() 메소드를 호출한 후에 발생하거나 자식 프로세스에서 process.disconnect() 메소드를 호출한 후에 발생합니다.
- 에러 이벤트는 프로세스가 스폰되거나 종료되거나 자식 프로세스로 메시지를 보내는 데 실패했거나 자식 프로세스로 메시지를 보내는 데 실패할 때 발생합니다.
- `close` 이벤트는 자식 프로세스의 stdio 스트림이 닫힐 때 발생합니다. 이는 `exit` 이벤트와 구별됩니다. 여러 프로세스가 동일한 stdio 스트림을 공유할 수 있기 때문입니다. `close` 이벤트는 항상 `exit`가 이미 발생한 후에 발생하거나 자식이 스폰에 실패한 경우에는 `error`가 발생합니다.
- `exit` 이벤트는 자식 프로세스가 종료된 후에 발생합니다.
- 메시지 이벤트는 가장 중요한 이벤트입니다. 이 이벤트는 자식 프로세스가 process.send() 함수를 사용하여 메시지를 보낼 때 발생합니다. 부모/자식 프로세스가 서로 통신하는 방법입니다.
- `spawn` 이벤트는 자식 프로세스가 성공적으로 생성되면 한 번 발생합니다. 자식 프로세스가 성공적으로 생성되지 않으면 `spawn` 이벤트가 발생하지 않고 대신 `error` 이벤트가 발생합니다.

## 프로세스 생성을 위해 .spawn() 사용하기

.spawn() 메소드를 사용하여 명령어를 실행할 때 전달하려는 인수, 명령을 실행할 때 사용할 인수의 문자열 배열 형식, 마지막으로 프로세스 생성 시 일부 설정을 재정의할 수 있는 options 객체를 전달하여 자식 프로세스를 생성할 수 있습니다. 이 설정에는 환경 변수인 env, 명령을 셸 내에서 실행할지 여부인 shell, 부모가 종료된 후에도 자식 프로세스를 계속 실행할지 여부인 detached, 자식 프로세스를 중단하는 데 사용할 수있는 signal 등이 포함됩니다. 이러한 옵션에 대한 자세한 정보는 spawn의 공식 문서에서 확인할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

.spawn() 메서드가 다른 프로세스 생성 메서드와 다른 점은 외부 응용 프로그램을 새로운 프로세스에서 생성하고 I/O용 스트리밍 인터페이스를 반환한다는 것입니다. 이때문에 데이터가 많이 생성되는 애플리케이션을 처리하거나 데이터가 읽히는 대로 작업하는 데 좋습니다. 스트림 기반의 I/O는 다음과 같은 이점을 제공할 수 있습니다:

- 낮은 메모리 풋프린트.
- 백프레셔를 자동으로 처리합니다.
- 버퍼링된 청크 단위로 데이터를 게으르게 생성하거나 소비합니다.
- 이벤트 기반이며 논블로킹입니다.
- 버퍼를 사용하여 V8 힙 메모리 제한을 회피할 수 있습니다.

각각의 자식 프로세스는 세 가지 표준 stdio 스트림을 갖는데, 이를 child.stderr, child.stdout(각각 읽기 가능한 스트림), child.stdin(쓰기 가능한 스트림)을 통해 액세스할 수 있습니다. 이러한 스트림들은 이벤트 이밋터입니다. 각 자식 프로세스에 연결된 stdio 스트림 들에서 다양한 이벤트를 감지할 수 있습니다. child.stdout와 child.stderr의 경우 데이터 이벤트를 수신하여 명령의 출력이나 명령 실행 중 발생한 오류를 확인할 수 있습니다.

예를 들어 ls -lh /usr를 실행하고 stdout, stderr 및 종료 코드를 캡처하는 예제를 살펴보겠습니다. 이 예제는 리눅스/유닉스 시스템에서 실행해보세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const { spawn } = require("node:child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
```

<img src="/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_1.png" />

한 발 더 나아가 복잡한 예제로 가보죠. 여기서는 ps | grep bash를 실행해볼 겁니다. ps 명령은 현재 진행 중인 프로세스를 반환하고 grep은 일치하는 패턴을 찾을 때 유용한 명령입니다. 여기서는 'bash'를 찾아보겠습니다. ps를 위해 하나의 프로세스가 시작될 것이며, ps.stdout의 출력 스트림을 grep의 입력 스트림으로 작성하려고 합니다. ps가 끝나면 grep의 입력 스트림을 끝내고 grep 명령이 실행될 것입니다. 아래 내용은 index.js 내부에 작성해야 합니다.

```js
const { spawn } = require("node:child_process");
const ps = spawn("ps");
const grep = spawn("grep", ["bash"]);

ps.stdout.on("data", (data) => {
  grep.stdin.write(data);
});

ps.stderr.on("data", (data) => {
  console.error(`ps stderr: ${data}`);
});

ps.on("close", (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on("data", (data) => {
  console.log(data.toString());
});

grep.stderr.on("data", (data) => {
  console.error(`grep stderr: ${data}`);
});

grep.on("close", (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`);
  }
});
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_2.png)

한번 더 예시를 살펴보겠습니다. 여기서는 명령을 실행하는 과정에서 spawn이 실패하는 예제입니다.

```js
const { spawn } = require("node:child_process");
const subprocess = spawn("bad_command");

subprocess.on("error", (err) => {
  console.error("서브프로세스 시작 실패.");
});
```

![Image](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Windows에서 실행할 때는 .bat 및 .cmd 파일을 shell 옵션을 설정하여 child_process.spawn()로 호출하거나 child_process.exec()를 사용하거나 cmd.exe를 생성하고 .bat 또는 .cmd 파일을 인수로 전달하는 방법(즉 shell 옵션과 child_process.exec()가 하는 방식)으로 호출할 수 있습니다. 어떤 경우에도 스크립트 파일 이름에 공백이 포함되어 있다면 인용 부호로 감싸야 합니다.

## 프로세스 생성에 .fork() 사용하기

.fork()는 Node.js 스크립트를 새로운 프로세스에서 실행하고 두 프로세스 간에 IPC 통신 채널을 원할 때 특히 유용합니다. child_process.fork() 메서드는 새로운 Node.js 프로세스를 생성하는 데 사용하는 child_process.spawn()의 특수한 경우입니다. child_process.spawn()과 마찬가지로 ChildProcess 객체가 반환됩니다. 반환된 ChildProcess에는 부모와 자식 간에 메시지를 교환할 수 있는 추가 통신 채널이 내장되어 있습니다.

fork 메서드는 노드 프로세스 간 메시지 전달을 허용하는 IPC 채널을 열게 됩니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 자식 프로세스에서는 process.on('message')와 process.send('부모에게 메시지')를 사용하여 데이터를 수신하고 전송할 수 있습니다.
- 부모 프로세스에서는 child.on('message')와 child.send('자식에게 메시지')를 사용합니다.

간단한 예시를 살펴봅시다. index.js 파일입니다.

```js
const { fork } = require("child_process");

const forked = fork("child_program.js");

forked.on("message", (msg) => {
  console.log("자식으로부터 메시지:", msg);
});

forked.send("안녕 세계");
```

child_program.js 파일에서는

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
process.on("message", (msg) => {
  console.log("부모로부터 온 메시지:", msg);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*CpWRroHhVhSmzrIwyE4zbw.gif" />

부모로부터 자식에게 메시지를 전달하려면 포크된 객체 자체에서 send 함수를 실행하고, 자식 스크립트에서는 전역 process 객체의 메시지 이벤트를 수신할 수 있습니다.

상기 parent.js 파일을 실행하면 먼저 `hello world`를 포크된 자식 프로세스에서 출력하도록 전송한 다음, 포크된 자식 프로세스는 매 초마다 증가된 카운터 값을 부모 프로세스가 출력하도록 전송합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래는 더 실용적인 내용의 예시를 살펴보겠습니다. 아래 예시는 각각 "일반" 또는 "특별" 우선순위로 연결을 처리하는 두 개의 자식 프로세스를 생성합니다:

index.js 파일에서:

```js
const { fork } = require("node:child_process");
const normal = fork("child_program.js", ["normal"]);
const special = fork("schild_program.js", ["special"]);

// 서버를 열고 소켓을 자식 프로세스로 전달합니다. 소켓이 자식 프로세스로 전송되기 전에 읽히지 않도록 pauseOnConnect를 사용합니다.
const server = require("node:net").createServer({ pauseOnConnect: true });
server.on("connection", (socket) => {
  // 특별한 우선순위인 경우...
  if (socket.remoteAddress === "74.125.127.100") {
    special.send("socket", socket);
    return;
  }
  // 일반 우선순위인 경우.
  normal.send("socket", socket);
});
server.listen(1337);
```

child_program.js 파일에서:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
process.on("message", (m, socket) => {
  if (m === "socket") {
    if (socket) {
      // 클라이언트 소켓이 있는지 확인합니다.
      // 소켓이 전송된 후 자식 프로세스에서 수신되는 동안 소켓이 닫힐 수 있습니다.
      socket.end(`Request handled with ${process.argv[2]} priority`);
    }
  }
});
```

상기 예제에 따르면 remoteAddress에 따라 소켓이 해당 자식 프로세스로 전달됩니다. 특정 remoteAddress인 경우 특별한 서브프로세스로, 그렇지 않은 경우 일반 서브프로세스로 전달됩니다. 서브프로세스에 전달된 소켓에 .maxConnections를 사용하지 마십시오. 부모 프로세스는 소켓이 소멸된 시점을 추적할 수 없습니다. 서브프로세스의 `message` 핸들러는 소켓이 존재하는지 확인해야 합니다. 소켓이 전달되는 동안 연결이 닫힐 수 있습니다.

## process 생성을 위한 exec() 사용

exec 함수는 쉘 구문을 사용해야 하고 명령에서 예상되는 데이터의 크기가 작은 경우 좋은 선택입니다. exec 함수는 명령에서 생성된 출력을 버퍼링하고 전체 출력 값을 콜백 함수에 전달합니다 (spawn이 스트림 대신에 사용하는 것입니다).

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

워커가 셸을 설정하고 해당 셸 내에서 명령을 실행합니다. 콜백 함수가 제공된 경우에는 해당 함수가 (error, stdout, stderr) 인자를 사용하여 호출됩니다. 성공할 경우 error는 null이 됩니다. 오류 발생 시 error는 Error의 인스턴스가 됩니다. error.code 속성은 프로세스의 종료 코드가 됩니다. 콜백에 전달된 stdout 및 stderr 인자에는 자식 프로세스의 표준 출력 및 표준 오류 출력이 포함됩니다.

간단한 예제를 살펴봅시다. cat 명령어로 index.js 파일을 읽고 wc -l 명령어로 결과의 라인 수를 세어 보겠습니다.

```js
const { exec } = require("node:child_process");
exec("cat index.js | wc -l", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

![그림](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_4.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 exec에 추가할 수있는 흥미로운 특징은 Options 개체에서 몇 가지 설정을 제공하는 것입니다. 예를들어 cwd 옵션을 사용하여 스크립트의 작업 디렉토리를 변경할 수 있습니다. 예를들어, 위의 예제를 다른 디렉토리에서 실행하도록 설정할 수 있습니다.

아래의 Markdow 형식으로 표를 변경해주셔야합니다.

Since the exec function uses a shell to execute the command, we can use the shell syntax directly here making use of the shell pipe feature.

## Using execFile() for process creation

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그 파일을 쉘을 사용하지 않고 실행해야 할 경우, execFile 함수가 필요합니다. 이 함수는 exec 함수와 정확히 동일하게 작동하지만 쉘을 사용하지 않기 때문에 조금 더 효율적입니다.

```js
const { execFile } = require("node:child_process");
const child = execFile("node", ["--version"], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

![Child Processes in Node.js](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_6.png)

Windows에서는 .bat 또는 .cmd 확장자와 같이 특정 파일은 자체로 실행할 수 없습니다. 이러한 파일은 execFile로 실행할 수 없으며, 실행하려면 exec 또는 spawn을 shell 속성을 true로 설정하여 실행해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 동기적 프로세스 생성

.spawnSync, .execSync 및 .execFileSync 메서드는 동기적이며 Node.js 이벤트 루프를 차단하며, 생성된 프로세스가 종료될 때까지 추가 코드의 실행을 일시 중지합니다.

이러한 차단 호출은 주로 일반 스크립팅 작업을 간소화하고 시작시 응용 프로그램 구성의 로드/처리를 간단화하는 데 유용합니다.

## 언제 어떻게 사용해야 하나요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Child Processes Multitasking in NodeJS](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_7.png)

# 자식 프로세스 중지 및 종료

자식 프로세스를 종료하는 몇 가지 방법이 있습니다.

- ChildProcess 객체에서 .kill()을 사용하여.
- 옵션 객체의 타임아웃 옵션을 사용함으로서. 프로세스가 실행되는 최대 시간을 밀리초로 설정해야 합니다. 기본값: 정의되지 않음
- 시그널을 사용하여, 시그널 옵션이 활성화된 경우, 해당 AbortController에서 .abort()를 호출하는 것은 child 프로세스에서 .kill()을 호출하는 것과 유사하게 동작하지만 콜백에 전달된 오류가

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const { spawn } = require("node:child_process");
const controller = new AbortController();
const { signal } = controller;
const grep = spawn("grep", ["ssh"], { signal });
grep.on("error", (err) => {
  // controller가 중단되면 AbortError가 err로 전달될 것입니다
});
controller.abort(); // 차일드 프로세스를 중지합니다
```

# 자식 및 부모 프로세스 간의 I/O 처리

stdio 옵션은 자식 프로세스의 입/출력 대상을 결정하는 데 책임이 있습니다. 이는 배열 또는 문자열로 할당할 수 있습니다. 문자열 값은 흔히 사용되는 배열 구성으로 자동 변환되는 편리한 바로 가기로 작동합니다.

기본적으로 stdio는 다음과 같이 구성됩니다
stdio: 'pipe'
다음과 같은 배열 값의 단축키입니다:
stdio: [ 'pipe', 'pipe', 'pipe' ]

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 코드는 ChildProcess 객체가 파일 기술자 0부터 2까지 액세스 제공하는 스트림 (child.stdio[0], child.stdio[1], child.stdio[2])를 갖게 됨을 의미합니다.

만약 입출력을 다른 곳으로 보내려면 파일 기술자를 할당할 수 있는 옵션이 있습니다. 반면, 완전히 무시하고 싶다면 'ignore'를 사용할 수도 있습니다.

예를 통해 설명해보겠습니다. 예를 들어 입력을 제공하지 않을 자식 프로세스를 생성하고자 한다면 입력 FD 0 (stdin)을 무시하고 출력 FD 1(stdout)과 오류 FD 2(stderr)를 별도의 로그 파일에 기록하려는 경우에 대해 알아봅시다. 이렇게 구현할 수 있습니다.

```js
let fs = require("fs");
let cp = require("child_process");

let outFd = fs.openSync("./outputlogs", "a");
let errFd = fs.openSync("./errorslogs", "a");
let child = cp.spawn("ls", [], {
  stdio: ["ignore", outFd, errFd],
});
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_8.png" />

## 스트림을 연쇄시키기

한 프로세스의 출력이 다음 프로세스에 공급되는 프로그램을 작성해 봅시다. cat 명령어는 데이터를 파일에서 읽고, 이 데이터를 sort 명령어의 입력으로 전달하여 정렬된 라인을 출력으로 제공할 것이며, 이것은 다시 중복된 줄을 제거할 uniq 명령어의 입력으로 제공되어야 합니다.

in filesToBeChecked.txt

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

LOL
LMAO
ROLF
LOL
GTG

`index.js` 파일에서:

```javascript
let cp = require("child_process");
let cat = cp.spawn("cat", ["filesToBeChecked.txt"]);
let sort = cp.spawn("sort");
let uniq = cp.spawn("uniq");
cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
```

<img src="/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_9.png" />

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 명령 실행과 보안

자식 프로세스가 셸에 액세스할 수 있도록 허용할 때 주의해야 합니다. 셸 구문을 사용하는 것이 보안 위험을 초래할 수 있음을 인식하는 것이 중요합니다, 특히 외부 소스에서 동적 입력을 다룰 때 그렇습니다. 이는 사용자가 셸 구문 문자인 ';' 나 '$' 와 같은 문자를 이용하여 악성 명령을 실행할 수 있는 명령 주입 공격의 가능성을 남겨둡니다. 예를 들어 사용자가 command + '; rm -rf ~' 와 같은 명령을 입력하여 중요 파일을 삭제할 수 있습니다.

예시를 살펴보겠습니다. (시스템에서 하지 마세요)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

유저 입력을 받아 명령어를 실행하는 프로세스가 있다고 가정해 봅시다. 이 때, 입력을 받아 실행하는 명령어가 exec를 이용하여 다음과 같이 구성된 경우가 있습니다.
cp.exec(`고정된 명령어` + req.query.userInput);
악의적인 사용자가 " ; rm -rf / ;" 와 같이 입력을 제공했다고 가정해 봅시다.
아직 이해가 안 된 분들을 위해 설명드리자면, 이 메시지는 정확히 "새로운 명령어(;)를 실행하여 파일 시스템의 중심부에 있는 모든 파일과 디렉토리를 강제로 철저히 삭제하고(; rm -rf /), 명령어를 종료시킵니다(;), 뒤에 뭔가가 더 올 경우 처리합니다." 를 의미합니다.

만약 셸 기능을 필요로 하지 않고 응용 프로그램을 실행하려면, 실제로 execFile을 사용하는 것이 더 안전하고(그리고 약간 빠릅니다).
cp.execFile('고정된 명령어', [req.query.schema]);

여기서 악의적인 인젝션 공격은 셸에서 실행되지 않으므로 실패하고, 외부 응용 프로그램은 전달된 인수를 이해하지 못하고 오류를 발생시킬 가능성이 높습니다.

# 부모 프로세스와 독립적으로 실행되는 자식 프로세스

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 사항을 주의해야 합니다:

- 기본적으로 부모 프로세스는 분리된(떨어져 있는) 자식 프로세스의 종료를 기다릴 것입니다.
- 부모 프로세스와 노드를 연결하는 몇 가지 사항이 있습니다. 부모 프로세스와 자식 프로세스 사이의 참조인 ref 및 부모와 자식 간에 형성된 통신 채널이 있습니다.

자식 프로세스가 독립적으로 실행되도록 만드는 방법은 다음과 같습니다:

- 부모 프로세스가 자식 프로세스 종료 후에도 계속되도록 원한다면, 옵션 객체 중 하나인 option.detached 옵션을 사용할 수 있습니다.
  Windows에서 options.detached를 true로 설정하면 부모 프로세스가 종료된 후에도 자식 프로세스가 계속 실행됩니다. 한 번 활성화되면 다시 비활성화할 수 없습니다.
  Windows 이외의 플랫폼에서 options.detached가 true로 설정된 경우, 자식 프로세스는 새로운 프로세스 그룹 및 세션의 리더로 만들어집니다. 자식 프로세스는 분리되었든 그렇지 않든 부모가 종료되어도 계속 실행할 수 있습니다.
- 부모의 이벤트 루프에서 자식 프로세스의 참조를 유지하면 부모가 종료되지 않습니다. 이 참조를 제거하려면 해당 childprocess에 .unref()를 호출하면 됩니다. (참조를 다시 추가하려면 .ref()를 호출할 수도 있습니다.)
- options.stdio는 부모와 자식 간의 채널을 나타냅니다. options.stdio 옵션은 부모와 자식 프로세스 간에 설정되는 파이프를 구성하는 데 사용됩니다. 이 옵션을 'ignore'로 설정하면 이 통신 채널을 무시하도록 지시합니다. 더 많은 정보는 공식 문서를 참조하세요.

부모의 종료를 무시하려면 부모의 stdio 파일 디스크립터를 무시하여 자식 프로세스를 분리하고 또한 부모의 stdio 파일 디스크립터를 무시하도록 설정한 장기 실행 프로세스의 예시:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const { spawn } = require("node:child_process");

const subprocess = spawn(process.argv[0], ["child_program.js"], {
  detached: true,
  stdio: "ignore",
});

subprocess.unref();
```

더 복잡한 예제를 살펴봅시다. options.stdio를 사용하면 스트림을 어떻게 정의할지 알려줍니다.
예를 들어, 입력 스트림으로 pipe를 전달하고 출력 스트림으로 파일 설명자를 전달하며 현재 주 프로세스의 에러 스트림을 오류 스트림으로 전달하려면 이 옵션이 [`pipe`, fd, process.stderr]와 같이 설정됩니다.
모든 std 스트림을 무시하려면 이전 예제와 같이 'ignore'를 전달하면 됩니다. ignore를 전달하는 것은 ['ignore', 'ignore', 'ignore']를 전달하는 것과 동일합니다. ignore 외에도 pipe, inherit, overlapped, ipc, null, undefined와 같은 다른 옵션이 있습니다. 자세한 내용은 공식 문서를 참조하세요.

파일 설명자를 자식 프로세스에게 출력 스트림으로 전달하여 자식이 지정된 파일에 출력을 작성할 수 있도록 하는 방법을 통해 이를 설명해 보겠습니다.
index.js에서

```js
const fs = require("node:fs");
const { spawn } = require("node:child_process");
const out = fs.openSync("./out.log", "a");

const subprocess = spawn("node", ["child_program.js"], {
  detached: true,
  stdio: ["ignore", out, process.stderr],
});

subprocess.unref();
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

child_program.js 파일에는 아래와 같은 내용이 있습니다.

```js
const { spawn } = require("node:child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
```

![여기](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_10.png)에서 설명한 예제는 fork를 사용하여 동일한 결과를 생성할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const fs = require("node:fs");
const { fork } = require("node:child_process");
const out = fs.openSync("./out.log", "a");

const subprocess = fork("child_program.js", [], {
  detached: true,
  stdio: ["ipc", out, process.stderr],
});

subprocess.unref();
```

# 스폰을 사용하여 쉘 구문 및 부모의 표준 IO 상속하기

만약 우리가 원한다면, 생성된 자식 프로세스가 부모의 표준 IO 객체들을 상속받게 할 수 있지만, 더 중요한 것은 스폰 함수가 쉘 구문을 사용하도록 만들 수 있다는 것입니다.

아래 예시를 살펴봅시다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

child_program.js에 위의 코드를 붙여넣기해주세요.

```js
const { spawn } = require("node:child_process");
const ls = spawn("ls", ["-lh", "/usr"]);
ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});
ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});
ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
```

stdio: `inherit` 및 shell: true을 사용하지 않고

index.js에서 실행해주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const { spawn } = require("node:child_process");
const ps = spawn("node child_program.js", {});
```

![Child Processes Multitasking in Node.js](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_11.png)

spawn 함수가 쉘 구문을 이해하지 못해서 에러가 발생했어요.

새로운 옵션인 shell을 추가해보는 건 어때요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

in index.js

```js
const { spawn } = require("child_process");
const ps = spawn("node child_program.js", { shell: true });
```

![Child Processes Multitasking in NodeJS](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_12.png)

There are a few things to note here. With the use of `shell: true`, the `spawn` method is now able to interpret the shell syntax and run the `child_program.js`. However, the output of the child process is not visible because the terminal/console we are currently viewing is connected to the main process's standard IO streams, not the subprocess's. To display the output of the child process in the main process's terminal, we need to share the main IO stream with the child process. This can be achieved by using the `stdio: 'inherit'` option.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

표 태그를 Markdown 형식으로 바꿔보세요.

```js
const { spawn } = require("node:child_process");
const ps = spawn("node child_program.js", {
  stdio: "inherit",
  shell: true,
});
```

![Child Processes Multitasking in NodeJS](/assets/img/2024-06-22-ChildProcessesMultitaskinginNodeJS_13.png)

`stdio: 'inherit'` 옵션을 추가해보세요. 코드를 실행하면, 자식 프로세스가 주 프로세스의 stdin, stdout 및 stderr를 상속받게 됩니다. 이로 인해 자식 프로세스 데이터 이벤트 핸들러가 주 프로세스 stdout 스트림에서 트리거되어 결과를 즉시 출력하게 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위의 shell: true 옵션 덕분에 전달된 명령어에서 exec와 마찬가지로 셸 구문을 사용할 수 있었습니다. 그러나 이 코드로는 spawn 함수가 제공하는 데이터의 스트리밍 이점도 누릴 수 있습니다.

# 떠나기 전에!

- 더 많은 통찰을 기대해 주세요! 팔로우하고 구독해주세요.
- 박수 👏 버튼을 클릭하고 누르면 무슨 일이 벌어지는지 보셨나요?
