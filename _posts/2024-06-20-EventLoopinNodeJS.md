---
title: "NodeJS의 이벤트 루프"
description: ""
coverImage: "/assets/img/2024-06-20-EventLoopinNodeJS_0.png"
date: 2024-06-20 04:22
ogImage:
  url: /assets/img/2024-06-20-EventLoopinNodeJS_0.png
tag: Tech
originalTitle: "Event Loop in NodeJS"
link: "https://medium.com/@manikmudholkar831995/event-loop-in-nodejs-999f6db7eb04"
isUpdated: true
---

## Node.js 내부 심층 분석 (블로킹, 논블로킹 IO, 이벤트 루프, nextTick, 프로미스)

![NodeJS Event Loop](/assets/img/2024-06-20-EventLoopinNodeJS_0.png)

안녕하세요! 이 글은 저의 고급 NodeJS 기술자를 위한 시리즈의 세 번째 글입니다. 이 글에서는 노드JS의 이벤트 루프가 무엇이며, 왜 그리고 어떻게 작동하는지에 대해 자세히 설명하고 있습니다. 아래에서 고급 NodeJS 기술자 시리즈의 다른 글들을 찾아볼 수 있어요:

글 시리즈 로드맵

- V8 JavaScript 엔진
- NodeJS에서의 비동기 IO
- NodeJS의 이벤트 루프 (이 글)
- Worker Threads: NodeJS에서의 멀티태스킹
- 자식 프로세스: NodeJS에서의 멀티태스킹
- 클러스터링과 PM2: NodeJS에서의 멀티태스킹
- 흔한 NodeJS 오해들을 해소

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

차례

- Node.js에서의 이벤트 루프
- process.nextTick 및 프로미스 콜백
- I/O 폴링
- 실습 예제
  - setTimeout
  - 0초 후의 setTimeout
  - 0초의 setTimeout이지만 다른 호출이 차단 중
  - setTimeout 및 setImmediate
  - fs 콜백 내의 setTimeout 및 setImmediate
  - process.nextTick 및 Promise
  - process.nextTick 중첩
  - process.nextTick 프로미스 및 setTimeout
  - IO, process.nextTick 프로미스 및 setTimeout setImmediate

이 글에서는 Event Loop에 대해 깊이 설명하겠습니다. 따라서 초보자라도 이해하기 쉽게 했습니다. 자바스크립트를 배우기 시작할 때 이벤트 루프는 매우 추상적이며 이러한 개념들로 Node.js로 넘어가면 오해하기 쉬울 수 있습니다. 게다가 인터넷에는 많은 잘못된 다이어그램이 있습니다.

# Node.js에서의 이벤트 루프

![Event Loop in Nodejs](https://miro.medium.com/v2/resize:fit:1080/1*17w5J0pMc9Ae49wztRWHhw.gif)

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

이벤트 루프는 종종 "반 무한 루프"라고 불리며, 이벤트 처리할 것이 없을 때까지 실행되며 루프가 살아 있으면 종료되지 않습니다. 활성 핸들이 있거나 활성 요청이 있을 경우도 마찬가지입니다.

![NodeJS Event Loop](/assets/img/2024-06-20-EventLoopinNodeJS_1.png)

- 각 루프 반복의 시작에서 이벤트 루프는 현재 시간(now)을 계산하고 전체 반복에 대한 참조로 저장합니다. 계산된 시간은 시스템 호출 빈도를 줄이기 위해 캐시됩니다.
- UV_RUN_DEFAULT로 루프가 실행된 경우 타이머가 실행됩니다. 이 시점에서 setTimeout 또는 setInterval과 같은 함수를 통해 실행할 콜백들이 예약된 별도의 큐가 있습니다.
- 루프가 살아 있는지 확인하려면 참조된 핸들, 활성 요청 또는 닫힌 핸들이 있는지 확인합니다.
- 대기 중인 콜백이 호출됩니다. 대부분의 I/O 콜백은 I/O 확인 후 즉시 호출됩니다. 그러나 이전 반복에서 콜백 호출이 연기된 경우 다음 루프 반복에서 실행됩니다.
- 아이들 핸들 콜백이 호출됩니다. 불행한 이름에도 불구하고, 아이들 핸들은 활성 상태일 때마다 각 루프 반복에서 실행됩니다. 이 콜백은 이벤트 루프가 시간 중요한 작업으로 바쁘지 않을 때 저 우선 순위 작업을 수행하는 데 사용됩니다. 아이들 핸들은 정기적으로 실행이 필요하지만 특정 이벤트에 대해 즉각적인 조치 또는 응답을 요구하지 않는 작업에 유용합니다.
- I/O 점검 전에 준비 핸들 콜백이 실행되어 데이터 구조 또는 설정과 같은 필요한 작업을 수행합니다.
- I/O 블로킹 전에 폴링 시간이 계산됩니다. 폴링 시간을 계산하는 규칙은 다음과 같습니다:
- UV_RUN_NOWAIT 플래그가 포함된 루프가 실행되었거나 루프가 중지될 예정이고(유비트 스탑()이 호출됨), 활성 핸들이나 요청이 없거나 아이들 핸들이 활성 상태거나 닫힐 핸들이 대기 중이면 타임아웃은 0입니다.
- 위의 경우 중 하나도 일치하지 않으면 타임아웃이 가장 가까운 타이머의 지속 시간으로 설정됩니다. 활성 타이머가 없는 경우 무한대로 설정됩니다.
- 루프가 I/O를 위해 블로킹됩니다. 이 시점에서 루프는 이전 단계에서 계산된 시간만큼 I/O가 블로킹됩니다. 특정 파일 디스크립터의 읽기 또는 쓰기 작업을 모니터링하던 모든 I/O 관련 핸들은 이 시점에 콜백이 실행됩니다.
- I/O 폴링 후에 즉시 핸들 콜백이 실행되어 setImmediate 콜백을 처리합니다.
- 닫기 콜백이 실행됩니다. 이 콜백들은 libuv가 활성 핸들을 처분할 때 실행되도록 예약됩니다.
- '지금'의 루프 개념이 업데이트됩니다.
- 반복이 종료됩니다.

따라서 이러한 단계들은 때로는 단계 또는 큐로 축소될 수 있습니다. 각 상자를 이벤트 루프의 "단계"로 참조할 수 있습니다.

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

<img src="/assets/img/2024-06-20-EventLoopinNodeJS_2.png" />

# process.nextTick과 프로미스 콜백

이제 매크로 태스크에 대해 이야기했는데, process.nextTick() 및 프로미스 콜백 같은 마이크로 태스크는 어떻게 되나요? process.nextTick()이 다이어그램에 표시되지 않은 이유는 process.nextTick()이 기술적으로 이벤트 루프의 일부가 아니기 때문입니다. 대신, nextTickQueue는 현재 작업이 완료된 후에 처리될 것이며, 이는 이벤트 루프의 현재 단계에 관계없이입니다. 여기서 작업이란 기본 C/C++ 핸들러에서 JavaScript를 처리하고 실행해야 하는 것까지의 전환을 의미합니다.

process.nextTick()은 현재 작업이 완료된 후, 이벤트 루프가 다음 단계로 진행하기 전에 즉시 콜백 함수를 실행할 수 있게 하는 함수입니다. 이는 재귀적으로 process.nextTick() 호출을 통해 I/O를 "굶게" 만들고 폴링 단계에 도달하지 못하게 하는 나쁜 상황을 만들 수 있습니다.

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

process.nextTick()를 사용해야 하는 때:

- process.nextTick()의 주요 용도는 시간에 민감하거나 우선순위가 높은 작업으로, 다른 대기 중인 작업을 기다리지 않고 즉각적인 실행이 필요한 경우에 사용합니다.
- 사용자가 오류를 처리하도록 허용하거나 필요 없는 자원을 정리하거나, 이벤트 루프가 계속되기 전에 요청을 다시 시도할 수 있도록 합니다.
- 때로는 콜백이 콜 스택이 풀린 후에 실행되도록 하지만, 이벤트 루프가 계속되기 전에 실행을 허용해야 하는 경우가 있습니다.

출력 순서에 관한 면에서 process.nextTick() 콜백은 항상 Promise 콜백보다 먼저 실행됩니다.

- process.nextTick()은 즉시 동일한 단계에서 발생합니다.
- setImmediate()는 이벤트 루프의 다음 반복이나 `tick`에서 발생합니다.

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

개념도는 다음과 같이 나타날 것입니다

![Conceptual Diagram](/assets/img/2024-06-20-EventLoopinNodeJS_3.png)

## I/O 폴링

몇 가지 예시를 살펴봅시다.

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

예시 1)

```js
const fs = require("fs");

setTimeout(() => {
  console.log("hello");
}, 0);
fs.readFile("./AWS Migration.txt", () => {
  console.log("world");
});
setImmediate(() => {
  console.log("immediate");
});

for (let index = 0; index > 2000000000; index++) {}
```

```js
hello;
immediate;
world;
```

세계가 먼저 출력될 것으로 예상했겠죠? 단계별로 살펴봅시다.

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

- 먼저 "sync user code"를 실행합니다. 즉, for 루프가 실행됩니다.
- EventLoop는 타이머 콜백을 실행하고 타이머가 완료되고 실행 준비가 된 것을 발견합니다. 결과적으로 타이머인 setTimeout이 실행됩니다. 콘솔에는 "hello"가 표시됩니다.
- 이후 EventLoop는 I/O 콜백 단계로 이동합니다. 이 시점에서 파일 읽기 프로세스는 완료되었지만 콜백은 아직 실행 대기 중이며, 이는 IO 콜백이 IO polling 단계에서만 대기열에 들어가기 때문입니다. 즉, 파일 읽기가 완료되어도 이벤트 루프가 IO polling 단계에 도달할 때까지 콜백이 IO 대기열에 추가되지 않습니다. 이 때, readFile() 콜백 이벤트가 수집되어 I/O 대기열에 추가되었지만 아직 실행되지 않습니다. 실행 준비가 되어 있지만 EventLoop는 다음 사이클에서 실행합니다.
- 다음 단계로 넘어가면, EventLoop가 setImmediate() 콜백을 실행합니다. 콘솔에는 "immediate"가 표시됩니다.
- 그런 다음, EventLoop가 다시 시작됩니다. 실행할 타이머가 없으므로 "Call pending callback stage"로 이동하고, readFile() 콜백을 마칩니다. 콘솔에는 "world"가 표시됩니다.

예시 2)

```js
const fs = require("fs");
const now = Date.now();
setTimeout(() => {
  console.log("hello");
}, 50);
fs.readFile(__filename, () => {
  console.log("world");
});
setImmediate(() => {
  console.log("immediate");
});
while (Date.now() - now < 2000) {} // 2초간 블록
```

세 가지 작업을 수행합니다: setTimeot, readFile 및 setImmediate. 그 후에는 스레드를 2초 동안 차단하는 while 루프가 있습니다. 이 기간 동안 세 가지 이벤트가 각각의 대기열에 추가되어야 합니다. 따라서 while 루프가 종료될 때, EventLoop는 모든 세 가지 이벤트를 동일한 사이클에서 처리하고 다이어그램에 표시된 순서대로 콜백을 실행합니다.

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
안녕;
즉시;
세계;
```

하지만 실제 결과는 이렇게 보입니다:

```js
안녕;
세계;
즉시;
```

그 이유는 I/O 폴링이라는 추가적인 과정이 있기 때문입니다.

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

I/O 이벤트는 다른 유형의 이벤트와는 달리 특정 시점에 대기열에 추가됩니다. 그래서 setImmediate()의 콜백이 readFile()의 콜백보다 먼저 실행됩니다. 둘 다 while 루프가 끝날 때 준비가 된 상태입니다.

문제는 EventLoop의 I/O 대기열 확인 단계에서 이미 이벤트 대기열에 있는 콜백만을 실행한다는 점입니다. 이들은 완료된 시점에 자동으로 이벤트 대기열에 추가되지 않습니다. 대신, I/O 폴링 단계 중에 나중에 이벤트 대기열에 추가됩니다.

while 루프가 끝난 후 2초가 지난 후 일어나는 일은 다음과 같습니다.

- EventLoop은 타이머 콜백을 실행하고 타이머가 완료되어 실행 가능한 상태임을 알게 됩니다. 따라서 타이머를 실행합니다. 콘솔에 "hello" 메시지가 출력됩니다.
- 그 후, EventLoop은 I/O 콜백 단계로 진행합니다. 이 시점에서 파일 읽기 프로세스는 완료되었지만 해당 콜백은 아직 실행 대상이 아닙니다. 이후에 실행 대상으로 표시됩니다. EventLoop는 여러 단계를 거치고 I/O 폴링 단계에 도달합니다. 이때 readFile() 콜백 이벤트가 수집되고 I/O 대기열에 추가되지만 아직 실행되지 않습니다. 실행 준비가 된 상태이지만 EventLoop는 다음 사이클에서 실행합니다.
- 다음 단계로 진행하여 EventLoop는 setImmediate() 콜백을 실행합니다. 콘솔에 "immediate"가 표시됩니다.
- 이후 EventLoop는 다시 시작합니다. 실행할 타이머가 없으므로 I/O 콜백 단계로 이동하고 마침내 readFile() 콜백을 찾아 실행합니다. 콘솔에 "world"가 나타납니다.

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

이 예제는 이해하기 약간 어려울 수 있지만, I/O 폴링 프로세스에 대한 유용한 통찰력을 제공합니다. 2초짜리 while 루프를 제거하면 다른 결과를 볼 수 있을 것입니다.

```js
즉시;
월드;
안녕;
```

setImmediate()는 setTimeout이나 파일 시스템 프로세스 중 하나도 완료되지 않았을 때 EventLoop의 첫 번째 사이클에서 작동합니다. 일정 기간이 지나면 타임아웃이 끝나고 EventLoop은 해당 콜백을 실행할 것입니다. 나중에 파일이 읽히면 EventLoop은 readFile의 콜백을 실행할 것입니다.

모든 것은 타임아웃의 지연 시간과 파일의 크기에 따라 달라집니다. 파일이 크면 읽기 프로세스가 완료되는 데 더 오래 걸릴 것입니다. 마찬가지로 타임아웃이 길면 파일 읽기 프로세스가 타임아웃 이전에 완료될 수 있습니다. 그러나 setImmediate() 콜백은 고정되어 있으며 V8이 실행하는 즉시 항상 이벤트 큐에 등록됩니다.

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

# 실습 예시

## 예시 1) setTimeout

```js
console.log("첫번째");
setTimeout(() => {
  console.log("두번째");
}, 10);
console.log("세번째");
```

```js
첫번째;
세번째;
두번째;
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

테이블 태그를 Markdown 형식으로 변경하세요.

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

하지만 왜 결과가 비슷한 걸까요? 네, 이유는 실행 시간이 0밀리초이지만 비동기 함수이기 때문에 여전히 타이머 큐에 들어가서 실행됩니다. 그래서 시간이 걸립니다.

## 예시 3) setTimeout은 0이지만 다른 호출이 블로킹됩니다

만약 세 번째 호출이 루프를 3초 동안 차단하면 우리가 0 밀리초로 설정했던 두 번째 호출이 될까요?

```js
console.log("first");
setTimeout(() => {
  console.log("second");
}, 0);
const startTime = new Date();
const endTime = new Date(startTime.getTime() + 3000);
while (new Date() < endTime) {}
console.log("third");
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

첫 번째
세 번째
두 번째

세 번째 이후에도 여전히 두 번째가 출력됩니다. 0밀리초 타임아웃이 지정되었지만 사용자 코드가 우선시되기 때문에 0초가 보장되지 않습니다. 사용자 동기 코드가 이벤트 루프를 차단하면 타이머가 굶주리게 될 수 있으므로 이벤트 루프를 차단하지 말아야 한다고 말합니다.

## 예제 4) setTimeout & setImmediate

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
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

가끔 프로세스가 실행하는 데 더 오랜 시간이 걸릴 수 있어(밀리초 기준) 타이머 대기열이 비어 있을 때 이벤트 루프가 지나가는 경우가 있습니다. 또는 이벤트 루프가 너무 빨리 작동하여 다중화기가 이벤트를 제때 이벤트 큐에 등록하지 못할 수도 있습니다. 결과적으로 이 예제를 여러 번 실행하면 각 시간마다 다른 결과를 얻을 수 있습니다.

## 예제 4) fs 콜백 내부의 setTimeout & setImmediate

```js
const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  setImmediate(() => {
    console.log("setImmediate");
  });
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

```js
setImmediate;
setTimeout;
```

setTimeout와 setImmediate는 readFile 함수 내부에 작성되어 있으므로, 콜백이 실행될 때 이벤트 루프가 I/O 단계에 있음을 알 수 있습니다. 따라서, 다음으로 진행되는 것은 setImmediate 대기열입니다. setImmediate가 즉시 대기열에 등록되므로 항상 이 순서로 로그가 표시되는 것은 놀라운 일이 아닙니다.

## 예제 5) process.nextTick 및 Promise

```js
console.log("first");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("second");
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

```js
첫 번째
두 번째
다음 실행
프로미스
```

## 예제 5) process.nextTick 중첩

```js
process.nextTick(() => {
  console.log("다음 실행 1");

  process.nextTick(() => {
    console.log("다음 실행 2");

    process.nextTick(() => console.log("다음 실행 3"));
    process.nextTick(() => console.log("다음 실행 4"));
  });

  process.nextTick(() => {
    console.log("다음 실행 5");

    process.nextTick(() => console.log("다음 실행 6"));
    process.nextTick(() => console.log("다음 실행 7"));
  });
});
```

```js
다음 실행 1
다음 실행 2
다음 실행 5
다음 실행 3
다음 실행 4
다음 실행 6
다음 실행 7
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

위 설명 드릴게요:
이 코드를 실행하면 중첩된 process.nextTick 콜백들이 일련의 일정에 맞게 예약됩니다.

- 처음의 process.nextTick 콜백이 가장 먼저 실행되어 콘솔에 `nextTick 1`을 로깅합니다.
- 이 콜백 내에서 두 개의 process.nextTick 콜백이 더 예약됩니다: 하나는 `nextTick 2`를 로깅하고 다른 하나는 `nextTick 5`를 로깅합니다.
- 'nextTick 2'로 로깅된 콜백이 다음에 실행되어 콘솔에 'nextTick 2'를 로깅합니다.
- 이 콜백 내에서 두 개의 process.nextTick 콜백이 더 예약됩니다: 하나는 `nextTick 3`를 로깅하고 다른 하나는 `nextTick 4`를 로깅합니다.
- 'nextTick 5'로 로깅된 콜백은 'nextTick 2' 이후에 실행되어 콘솔에 'nextTick 5'를 로깅합니다.
- 이 콜백 내에서 두 개의 process.nextTick 콜백이 더 예약됩니다: 하나는 `nextTick 6`을 로깅하고 다른 하나는 `nextTick 7`을 로깅합니다.
- 마지막으로, 남은 process.nextTick 콜백들이 예약된 순서대로 실행되어 콘솔에 `nextTick 3`, `nextTick 4`, `nextTick 6`, `nextTick 7`을 로깅합니다.

아래는 실행 중에 대기열이 어떻게 구성될지에 대한 개요입니다.

```js
Process started: [ nT1 ]
nT1 executed: [ nT2, nT5 ]
nT2 executed: [ nT5, nT3, nT4 ]
nT5 executed: [ nT3, nT4, nT6, nT7 ]
// ...
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

## 예제 6) process.nextTick promises 및 setTimeouts

```js
process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

```js
nextTick;
Promise;
setTimeout;
setImmediate;
```

## 예제 7) IO, process.nextTick promises와 setTimeouts setImmediate

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
const fs = require("fs");

fs.readFile(__filename, () => {
  process.nextTick(() => {
    console.log("nextTick in fs");
  });

  setTimeout(() => {
    console.log("setTimeout");

    process.nextTick(() => {
      console.log("nextTick in setTimeout");
    });
  }, 0);

  setImmediate(() => {
    console.log("setImmediate");

    process.nextTick(() => {
      console.log("nextTick in setImmediate");

      Promise.resolve().then(() => {
        console.log("Promise in setImmediate");
      });
    });
  });
});
```

```js
nextTick in fs;
setImmediate;
nextTick in setImmediate;
Promise in setImmediate;
setTimeout;
nextTick in setTimeout;
```

V8이 코드를 실행할 때, 처음에는 fs.readFile() 하나의 작업만 있습니다. 이 작업이 처리되는 동안 Event Loop가 각 큐를 확인하며 작업을 계속합니다. 계속해서 카운터가 0이 되어 Event Loop는 프로세스를 종료할 때까지 큐를 확인합니다.

결국 파일 시스템 읽기 작업이 완료되고, Event Loop는 I/O 큐를 확인하면서 이를 감지합니다. 콜백 함수 내에는 nextTick, setTimeout, 그리고 setImmediate와 같이 세 가지 새로운 작업이 있습니다.

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

자 이제 우선순위에 대해 생각해보세요.

매크로태스크 큐를 모두 실행한 후에는 마이크로태스크가 실행됩니다. 이는 “fs에 있는 nextTick”이 기록될 것이라는 것을 의미합니다. 그리고 마이크로태스크 큐가 비어 있으면 이벤트 루프가 계속 진행됩니다. 다음 단계는 즉시 실행 큐입니다. 그래서 “setImmediate”가 기록될 것입니다. 게다가, 다음 nextTick 큐에 이벤트도 등록됩니다.

이제 즉시 실행할 이벤트가 남아있지 않으면 JavaScript는 마이크로태스크 큐를 확인하기 시작합니다. 결과적으로 “setImmediate 내부의 nextTick”이 기록되고 동시에 프로미스 큐에 이벤트가 추가됩니다. 이제 nextTick 큐가 비어 있으므로 JavaScript는 프로미스 큐를 확인하여 새로 등록된 이벤트로 인해 “setImmediate 내부의 Promise”가 기록됩니다.

이 시점에서 모든 마이크로태스크 큐가 비어 있으므로 이벤트 루프가 계속 진행하고 다음으로 타이머 큐 안에 이벤트를 발견합니다.
이제 마지막으로 “setTimeout”과 “setTimeout 내부의 nextTick”이 우리가 논의한 로직과 동일한 방식으로 기록됩니다.

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

## 예제 8) IO, process.nextTick promises 및 setTimeouts setImmediate

```js
setTimeout(() => console.log("Timeout 1"));
setTimeout(() => {
  console.log("Timeout 2");
  Promise.resolve().then(() => console.log("promise resolve"));
});
setTimeout(() => console.log("Timeout 3"));
```

```js
Timeout 1
Timeout 2
promise resolve
Timeout 3
```

## 참고문헌

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

- 노드 JS 내부 아키텍처 | Ignition, Turbofan, Libuv
- 노드.js가 확장하는 이유는? Libuv 및 epoll 및 fcntl
- 노드.js 자습서 — 42 — 이벤트 루프
- 노드 js 이벤트 루프의 심층 탐구 — Tyler Hawkins
- 이벤트 루프와 전체 그림 — NodeJS 이벤트 루프 파트 1
- https://blog.bitsrc.io/you-dont-know-node-js-eventloop-8ee16831767
- 노드.js 이벤트 루프 이해하기
- 노드.js 이벤트 루프에 대한 실제 상황과 오해: 진실 밝혀내기

# 가기 전에!

- 더 많은 통찰력을 기대해주세요! 팔로우하고 구독하세요.
- 👏 버튼을 클릭하고 누르고 있을 때 발생하는 일을 보셨나요?
