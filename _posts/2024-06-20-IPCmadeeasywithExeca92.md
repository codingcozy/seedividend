---
title: "IPC 만들기가 Execa 92로 쉬워졌어요"
description: ""
coverImage: "/assets/img/2024-06-20-IPCmadeeasywithExeca92_0.png"
date: 2024-06-20 04:27
ogImage: 
  url: /assets/img/2024-06-20-IPCmadeeasywithExeca92_0.png
tag: Tech
originalTitle: "IPC made easy with Execa 9.2"
link: "https://medium.com/itnext/ipc-made-easy-with-execa-9-2-939c6a358731"
isUpdated: true
---




<img src="/assets/img/2024-06-20-IPCmadeeasywithExeca92_0.png" />

# 프로세스 간 복잡성

당신의 운영 체제가 어떤 기술적 경이로운 것들로 구축되어 있는지 잊기 쉽습니다. 터미널에서 다음 명령어를 입력하는 것만으로도 여러 추상화 계층이 관여됩니다.

```js
npx open-cli "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

<div class="content-ad"></div>

npx는 호출한 셸과 별도의 프로세스에서 실행되며, 그런 다음 open-cli를 위해 또 다른 서브프로세스를 생성합니다. 각 프로세스에는 실행 파일과 자원(메모리, CPU 상태, 파일 디스크립터 등)이 있습니다.

프로세스는 서로 격리되어 있습니다. 이는 보안상의 이유로 좋은면도 있지만, 이로 인해 프로세스 간 통신(IPC)이 필요합니다.

가장 일반적인 IPC 메커니즘은: 인수, 종료 코드, 환경 변수, 시그널, 표준 스트림(stdin, stdout, stderr), 파일 디스크립터, 파일, 공유 메모리, 그리고 네트워크 호출입니다.

하지만 이러한 해결책들은 종종 너무 한정된 경우나 너무 복잡한 경우가 많습니다. 방금 출시된 Execa 9.2는 두 프로세스 모두 Node.js를 사용할 때 IPC를 간단하게 만드는 것을 목표로 합니다.

<div class="content-ad"></div>

# 프로세스에 어떤 것이라도 전달하기

대부분의 IPC 방법을 사용하면 문자열을 보내는 것이 간단합니다. 그러나 구조화된 데이터를 전송하려면 직렬화(serializing)하고 파싱(parsing)해야 합니다. 예를 들어, 일반 객체는 JSON을 사용할 수 있습니다.

Execa에서는 ipcInput 옵션이 대부분의 유형을 자동으로 변환하므로 수동으로 직렬화하거나 파싱할 필요가 없습니다.

이것은 구조화된 복제 알고리즘을 따릅니다. 요약하면, 거의 모든 JavaScript 값이 허용되지만 함수(클래스 인스턴스 메서드를 포함한)가 두드러진 예외입니다.

<div class="content-ad"></div>

일반적으로 인수와 환경 변수의 크기 제한은 1MB 미만인 반면, ipcInput 옵션은 최대 2GB까지 처리할 수 있습니다.

```js
// main.js
import {execaNode} from 'execa';

const ipcInput = [
  {
    task: 'lint',
    ignore: /test\.js/,
  },
  {
    task: 'copy',
    files: new Set([
      'main.js',
      'index.js',
    ]),
  },
];
await execaNode({ipcInput})`build.js`;
```

```js
// build.js
import {getOneMessage} from 'execa';

const ipcInput = await getOneMessage();
for (const {task, ignore, files} of ipcInput) {
  await runTask(task, {ignore, files});
}
```

# 프로세스로부터 아무 것이나 반환

<div class="content-ad"></div>

프로세스의 출력물에도 동일한 문제가 있습니다. stdout와 stderr은 어떤 내용이든 출력할 수 있지만 호출자는 이를 구문 분석해야 합니다.

Execa를 사용하면 프로세스가 sendMessage(message)를 호출하여 거의 모든 데이터를 반환할 수 있습니다. 부모 프로세스는 결과.ipcOutput 배열을 사용하여 그대로 가져옵니다.

```js
// main.js
import {execaNode} from 'execa';

const {ipcOutput} = await execaNode`build.js`;
console.log(ipcOutput[0]); // {kind: 'start', timestamp: date}
console.log(ipcOutput[1]); // {kind: 'stop', timestamp: date}
```

```js
// build.js
import {sendMessage} from 'execa';

await sendMessage({kind: 'start', timestamp: new Date()});
await runBuild();
await sendMessage({kind: 'stop', timestamp: new Date()});
```

<div class="content-ad"></div>

# 메시지 교환

만약 프로세스가 실행 중일 때 출력을 검색해야 하는 경우 어떻게 할까요? 진행률 표시를 위해 예를 들면요? 또는 이미 시작된 프로세스 이후에 추가 입력을 제공해야 할 때는 어떻게 해야 할까요?

일반적으로 이는 stdin, stdout, stderr를 스트리밍하거나 네트워크 호출을 수행하여 해결됩니다. 성능 조정 및 잠재적 I/O 오류 처리를 다룰 때 특히 어려울 수 있습니다.

Execa는 메시지를 교환하기 위한 간단한 메서드 세트를 제공합니다: sendMessage(message)와 getOneMessage().

<div class="content-ad"></div>

```js
// parent.js
import {execaNode} from 'execa';

const subprocess = execaNode`child.js`;
await subprocess.sendMessage('Hello from parent');
const message = await subprocess.getOneMessage();
console.log(message); // 'Hello from child'
await subprocess;
```   

```js
// child.js
import {getOneMessage, sendMessage} from 'execa';

const message = await getOneMessage(); // 'Hello from parent'
const newMessage = message.replace('parent', 'child'); // 'Hello from child'
await sendMessage(newMessage);
```

# 메시지 수신

또한 한 프로세스(또는 양쪽 모두)가 상대방에서 오는 요청을 처리하는 클라이언트/서버 모델을 따를 수 있습니다. 이것은 getEachMessage()를 사용하여 모든 수신 메시지를 수신함으로써 구현됩니다.

<div class="content-ad"></div>

```js
// parent.js
import {execaNode} from 'execa';

const subprocess = execaNode`child.js`;
await subprocess.sendMessage(0);

// This loop ends when the subprocess exits.
// It throws if the subprocess fails.
for await (const message of subprocess.getEachMessage()) {
  console.log(message); // 1, 3, 5, 7, 9
  await subprocess.sendMessage(message + 1);
}
```

```js
// child.js
import {sendMessage, getEachMessage} from 'execa';

// The subprocess exits when hitting `break`
for await (const message of getEachMessage()) {
  if (message === 10) {
    break;
  }

  console.log(message); // 0, 2, 4, 6, 8
  await sendMessage(message + 1);
}
```

# 메시지 필터링

`getOneMessage()` 메서드에는 특정 메시지를 선택하는 필터 옵션이 있습니다. 이는 서로 다른 유형의 이벤트를 수신할 때 유용합니다.


<div class="content-ad"></div>

```js
import {execaNode} from 'execa';

const subprocess = execaNode`build.js`;
const stopMessage = await subprocess.getOneMessage({
  filter: message => message.type === 'stop',
});
```

# 보장된 수신

IPC는 본질적으로 상태를 가지며 시간에 민감하기 때문에 미묘한 레이스 컨디션 버그를 만들어낼 수 있습니다. 대부분의 네트워크 프로토콜은 메시지를 보낼 때 메시지가 제대로 수신되도록 보장하여 이를 예방합니다. 예를 들어, TCP는 ACK 번호를 사용합니다.

Execa에서는 strict 옵션이 그 목적을 충족시킵니다. 활성화된 경우, 다른 프로세스가 메시지를 제대로 수신하는 것을 보장합니다.

<div class="content-ad"></div>

```js
// main.js
import {execaNode} from 'execa';

const subprocess = execaNode`build.js`;
// `build` 메시지를 받음
await subprocess.sendMessage('build', {strict: true});
// `lint` 메시지를 받지 못해 예외가 발생함
await subprocess.sendMessage('lint', {strict: true});
await subprocess; 
```

```js
// build.js
import {getOneMessage} from 'execa';

// `build` 메시지를 받음
const task = await getOneMessage();
// `runTask()`이 진행 중일 때 `lint` 메시지가 전송됨
// 따라서 `lint` 메시지는 버려짐
await runTask(task);

// `lint` 메시지를 받지 않음
// `strict`이 없으면 영원히 대기할 것
const secondTask = await getOneMessage();
await runTask(secondTask);
```

# 프로세스를 멈추지 않기

메시지를 보낸 쪽에서 보낸 모든 메시지가 다른 쪽에서 받도록 하려면, 메시지를 수신할 때 프로세스를 유지합니다.


<div class="content-ad"></div>

그러나 메시지가 전송되었는지 여부를 확신할 수 없을 때는 이 방법이 잘 작동하지 않을 수 있습니다. 그렇게 되면 프로세스가 영원히 멈춰있는 상황이 발생할 수 있습니다. 이 문제는 reference: false 옵션을 사용하여 해결할 수 있습니다.

```js
import {getEachMessage} from 'execa';

// {type: 'gracefulExit'}가 가끔 수신되지만 항상 그렇지는 않습니다
for await (const message of getEachMessage({reference: false})) {
  if (message.type === 'gracefulExit') {
    gracefulExit();
  }
}
```

# 디버깅

프로세스가 격리되어 있기 때문에 디버깅하기 어려운 블랙 박스가 될 수 있습니다. 이를 해결하기 위해 Execa 프로세스에서 보낸 모든 IPC 메시지는 오류 메시지와 상세 로그 모두 자동으로 출력됩니다.

<div class="content-ad"></div>

```js
// build.js
import {execaNode} from 'execa';

await execaNode`npm run build`;
```

```js
# 자세한 모드로 실행
# 각 * 심볼이 있는 행은 IPC 메시지입니다

$ NODE_DEBUG=execa node build.js
[00:57:44.658] [0] $ npm run build
[00:57:44.670] [0]   응용프로그램 빌드 중...
[00:57:44.692] [0] * {name: 'start'}
[00:57:44.701] [0] * {name: 'entrypoint', value: 'mispelled_index.js'} 
[00:57:44.740] [0]   오류: 입구점이 잘못되었습니다.
[00:57:44.747] [0] ✘ 명령은 종료 코드 1로 실패했습니다: npm run build
[00:57:44.747] [0] ✘ (89ms에 완료됨)
```

# 우아한 종료

프로세스를 부드럽게 다루는 것은 쉽지 않습니다. 사실, 그들을 종료하는 것은 보통 꽤 무자비합니다. 표준 접근 방식은 SIGTERM과 같은 신호를 보내는 것입니다. 그러나 이러한 절차는 프로세스가 급작스럽게 종료되어 진행 중인 작업이 모두 종료된다는 점을 의미합니다. 이로 인해 파일 작성이 중간에 멈추거나, HTTP 요청이 멈추거나, 데이터가 손상될 수 있습니다.

<div class="content-ad"></div>

Unix에서는 핸들러가 시그널을 가로채서 정리 작업을 실행할 수 있습니다. 하지만 윈도우에서는 작동하지 않습니다.

gracefulCancel 옵션은 이 문제에 대한 크로스 플랫폼 솔루션을 제공합니다. 이는 IPC를 사용하여 프로세스와 해당 부모 프로세스 사이에서 AbortSignal을 공유합니다.

```js
// main.js
import {execaNode} from 'execa';

const controller = new AbortController();
setTimeout(() => {
  controller.abort();
}, 5000);

const cancelSignal = controller.signal;
await execaNode({cancelSignal, gracefulCancel: true})`build.js`;
```

```js
// build.js
import {getCancelSignal} from 'execa';

const cancelSignal = await getCancelSignal();
const url = 'https://example.com/build/info';
const response = await fetch(url, {signal: cancelSignal});
```

<div class="content-ad"></div>

# 속내를 들여다보기

우리는 이러한 기능들을 Node의 내장 IPC 위에 구축했습니다. 명명된 파이프는 프로세스 간 통신 채널로 사용됩니다. 메시지 페이로드는 V8로 직렬화됩니다.

IPC는 고급 기능입니다. 95%의 경우, 필요하지 않을 것입니다. Execa는 이미 스크립트에서 파이핑 또는 스트리밍까지 보다 간단한 방법을 제공합니다. 그러나 더 복잡한 시나리오에서는 IPC가 시간 절약의 도구가 될 수 있습니다.