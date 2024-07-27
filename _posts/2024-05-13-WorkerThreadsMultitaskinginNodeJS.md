---
title: "워커 스레드 NodeJS에서의 멀티태스킹"
description: ""
coverImage: "/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_0.png"
date: 2024-05-13 00:30
ogImage: 
  url: /assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_0.png
tag: Tech
originalTitle: "Worker Threads : Multitasking in NodeJS"
link: "https://medium.com/@manikmudholkar831995/worker-threads-multitasking-in-nodejs-6028cdf35e9d"
---


## Worker 스레드의 심층 탐구

![WorkerThreadsMultitaskinginNodeJS_0.png](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_0.png)

안녕하세요! 이 글은 고급 NodeJS를 다루는 시니어 엔지니어 시리즈의 네 번째 글입니다. 이 글에서는 Worker 스레드가 무엇이고, 왜 필요하며, 어떻게 작동하는지 자세하게 설명하고, Worker 스레드를 사용하여 최상의 성능을 얻는 방법에 대해 알려 드리겠습니다. 공식 문서는 worker_threads에서 확인할 수 있습니다. 이 시리즈의 다른 글들도 아래에서 찾아볼 수 있어요:

```js
글 시리즈 로드맵:

* V8 자바스크립트 엔진
* NodeJS의 비동기 IO
* NodeJS의 이벤트 루프
* Worker Threads: NodeJS에서의 멀티태스킹 (이 글)
* Child Processes: NodeJS에서의 멀티태스킹
* 클러스터링과 PM2: NodeJS에서의 멀티태스킹
* 흔한 NodeJS 오해 허물기
```



```js
목차

* 왜 우리는 모든 일꾼 스레드가 필요한 걸까요?
* 일꾼 스레드가 무엇인지 이해하려면 필수적으로 알아야 할 것들
  * 동시성 vs 병렬성
  * 프로세스와 스레드 이해
  * 비유
* 그렇다면 일꾼 스레드가 무엇인가요?
* 하드웨어 레벨에서 어떻게 작동하는가요?
* 어떤 것을 사용할 수 있을까요?
  * isMainThread, threadId
  * 일꾼 이벤트
  * 일꾼 옵션
  * MessageChannel
  * MessagePort와 MessagePort 이벤트
  * 스레드 간 데이터 전달 방법
  * Atomics
  * 포트 전송
  * 배열 버퍼 전송
  * 공유 배열 버퍼를 사용하여 데이터 공유
* 일꾼 스레드에 유의해야 할 점
```

# 왜 우리는 모든 일꾼 스레드가 필요한 걸까요?

서버는 CPU 집약적인 작업으로 인해 빠르게 작업량이 증가할 수 있습니다. 예를 들어, 간단하고 CPU 부담이 없는 작업을 수행하는 두 가지 엔드포인트가 있다고 상상해보세요. 다른 하나는 10초가 걸리는 복잡한 CPU 집약적인 작업을 처리하는 반면, 서버가 CPU 집약적인 요청으로 작업 중이라면 CPU 부담이 없는 요청에 즉각적으로 응답할 수 없을 것입니다. 이 문제는 NodeJS의 황금 규칙을 어기기 때문에 발생합니다: 즉, 이벤트 루프를 블록하지 말아라.

우리는 NodeJS가 단일 스레드 아키텍처로 CPU 집약적인 작업에 적합하지 않다는 것을 잘 아고 있습니다. 그러나 이것은 CPU 집약적인 작업에 활용할 수 없다거나 멀티 스레드 아키텍처의 이점을 누릴 수 없다는 의미는 아닙니다. 그렇지 않습니다! 등장하세요 영웅: 일꾼 스레드가 구원에 나서는 거죠...



![image](https://miro.medium.com/v2/resize:fit:996/1*tp7TwTTtOJ1VYmYP9r3whQ.gif)

Node.js v10.5.0에서 worker_threads 모듈을 통해 실험적인 Worker Threads 개념이 소개되었으며, 이후 Node.js v12 LTS부터 안정적인 기능으로 제공됩니다.

# Worker threads가 무엇인지 이해하기 위한 선행 조건

![image](https://miro.medium.com/v2/resize:fit:800/1*qU8qdLnz7iixhKlwcsP9bw.gif)



## 동시성 대 병렬성

동시성은 한꺼번에 많은 일을 처리하는 것입니다. 병렬성은 한꺼번에 많은 일을 하는 것입니다. — Rob Pike

![image](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_1.png)

우리는 워커 스레드의 본질을 이해하는 데부터 시작해봅시다: 동시성이 아니라 병렬성입니다. 위의 이미지에서 보듯, 단일 스레드로 여러 작업을 수행하는 것(동시성)은 동시에 실행하는 것(병렬성)에 비해 더 많은 시간이 걸립니다.



동시성 모델은 네트워크 통신, 파일/데이터베이스 읽기 및 쓰기와 같은 IO 작업에서 유용합니다. 왜냐하면 네트워크나 디스크가 실제 데이터를 제공할 때 기다려야 하기 때문입니다. 그리고 CPU나 스레드는 그 속도를 빠르게 할 수 없습니다. 그래서 대부분의 시간이 대기하는 데 사용됩니다. 그래서 스레드는 그 시간에 다른 일을 할 수 있고 그게 더 의미가 있습니다.

그러나 이 접근 방식은 CPU 집약적인 작업에는 적합하지 않을 수 있습니다. 비록 작업 2가 비교적 빨랐지만, 단일 코어/스레드만 사용했기 때문에 더 많은 시간이 걸렸습니다. 여러 스레드/코어를 활용하여 CPU 집약적인 작업을 작업 스레드에 위임하고, 비 CPU 집약적인 작업을 주 스레드에서 실행함으로써 우리는 더 효율적으로 작업할 수 있었습니다.

## 프로세스와 스레드 이해

![WorkerThreadsMultitaskinginNodeJS_2](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_2.png)



프로세스는 운영 체제에서 실행 중인 프로그램입니다. 각각의 프로세스는 자체 메모리를 갖고 있으며 다른 프로세스의 메모리를 볼거나 접근할 수 없습니다. 한 번에 한 가지 작업만 실행될 수 있습니다. 단일 코어 기계에서는 여러 프로세스가 동시에 실행됩니다. 즉, 운영 체제는 규칙적인 간격으로 프로세스 간을 전환합니다. 다중 코어 시스템에서는 운영 체제가 각 프로세스를 동시에 각 코어에서 실행하도록 일정하게 스케줄링합니다. 그러나 코어의 수보다 더 많은 프로세스를 생성하면, 각 코어가 완료될 때까지 동시에 여러 프로세스를 실행합니다.

스레드는 한 번에 한 가지 작업을 실행할 수 있는 프로세스와 유사합니다. 프로세스와 달리 스레드는 자체 메모리를 갖지 않고 프로세스의 메모리 안에 존재합니다. 프로세스를 생성하면 병렬로 코드를 실행하는 여러 스레드가 있을 수 있습니다. 게다가 스레드는 메시지 전달이나 프로세스 메모리 내의 데이터 공유를 통해 서로 통신할 수 있습니다. 이는 스레드를 프로세스에 비해 가볍게 만듭니다. 왜냐하면 스레드 생성 시 운영 체제로부터 더 많은 메모리를 요청하지 않기 때문입니다. 스레드의 실행에 관해서는 프로세스와 유사한 동작을 합니다.

## 비유

요약하자면, 작업자 스레드는 레스토랑에서 주방장과 함께 추가 셰프가 여러 개의 음식을 동시에 준비하는 것과 같습니다.



![WorkerThreadsMultitaskinginNodeJS_3](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_3.png)

# 정확히 worker 스레드는 무엇인가요?

이 섹션에서는 worker-threads 모듈을 사용하여 CPU 집약적 작업을 다른 스레드로 옮겨서 메인 스레드를 차단하지 않도록 하는 방법에 대해 알아볼 것입니다. 이를 위해 CPU 집약적 작업을 포함하는 worker.js 파일을 생성합니다. 그리고 parent.js 파일에서는 worker-threads 모듈을 사용하여 스레드를 초기화하고 worker.js 파일에서 작업을 시작하여 메인 스레드와 병렬로 실행될 수 있도록 합니다. 작업이 완료되면 worker 스레드는 결과를 포함한 메시지를 메인 스레드로 다시 보냅니다.

parent.js에 아래와 같은 내용이 있습니다.



```js
const {Worker} = require('worker_threads');
const worker = new Worker('./worker.js', {workerData: {num: 5});
worker.on('message', (result) => {
console.log('square of 5 is :', result);
})
worker.on("error", (msg) => {
    console.log(msg);
 });
console.log('hurreyy')
```

먼저 worker_threads 모듈을 가져와서 Worker 클래스를 언팩합니다. Worker 클래스를 사용하여 new 키워드를 사용해 worker.js 파일 경로를 사용하여 Worker의 새 인스턴스를 생성합니다. 이렇게 하면 새 쓰레드가 만들어지며 worker.js 파일에 있는 코드가 다른 코어에서 쓰레드에서 실행됩니다.

이후, worker 인스턴스에 on("message") 메소드를 사용하여 메세지 이벤트를 듣도록 이벤트를 추가합니다. worker.js 파일에서 결과를 포함하는 메세지를 수신하면 해당 메소드의 콜백으로 전달되어 콘솔에 CPU 작업의 결과가 포함된 응답이 표시됩니다.

그 다음, worker 인스턴스에 on("error") 메소드를 사용하여 오류 이벤트를 듣도록 다른 이벤트를 추가합니다.




worker.js 파일에 대한 설명입니다.

```javascript
const {parentPort, workerData} = require('worker_threads');
parentPort.postMessage(workerData.num * workerData.num)
```

첫 번째 줄은 worker_threads 모듈을 불러오고 parentPort 클래스를 추출합니다. 이 클래스는 주 스레드에 메시지를 보낼 수 있는 메서드를 제공합니다. WorkerData에는 스레드가 초기화될 때 주 스레드로부터 전달받은 데이터가 포함되어 있습니다. 그런 다음 parentPort 클래스의 postMessage() 메서드를 호출하여, CPU 바운드 작업의 결과가 저장된 제곱 값을 포함한 메시지를 주 스레드로 보냅니다.

node parent.js로 부모를 실행하면 아래 내용이 표시됩니다.




훔쳐
5의 제곱은: 25


# 하드웨어 안에서 무슨 일이 일어날까요?

<img src="/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_4.png" />

이미 알고 있듯이 NodeJS 프로세스가 시작될 때 한 프로세스, 한 스레드, 한 이벤트 루프, 하나의 V8 엔진 인스턴스, 하나의 Node.js 인스턴스와 함께 시작된다는 것을 알고 있습니다. 메인 스레드와 마찬가지로 각 워커는 같은 프로세스 내에서 독자적인 V8, nod, libuv 인스턴스, 그리고 이벤트 루프를 갖게 됩니다.




V8 isolate은 Chrome V8 런타임 내에서 별도의 엔티티를 가리킵니다. 각자의 JS 힙과 마이크로태스크 큐를 보유하고 있죠. 이 독특한 설정 덕분에 모든 Node.js 워커가 다른 워커들로부터 완전히 격리된 상태에서 자체 JavaScript 코드를 실행할 수 있게 되었습니다. 하지만 이런 격리는 비용이 딸리기도 합니다 — 각 워커들은 서로의 힙에 직접적으로 접근할 수 없습니다. 결과적으로 각 워커는 자신만의 libuv 이벤트 루프 버전을 유지하며, 다른 워커들과 부모 워커의 이벤트 루프와 독립적으로 작동합니다.

워커 스레드를 사용하면 스레드가 어느 시점에 종료되더라도 이는 반드시 부모 프로세스의 종료를 의미하지는 않습니다. 워커에 의해 할당된 리소스가 워커가 사라진 후에 남아있는 것은 좋지 않은 관행입니다 — 그렇게 되면 메모리 누수가 발생하게 되고, 우리는 그렇게 하고 싶지 않습니다. 우리는 Node.js를 자체에 넣어주고, Node.js에 새로운 스레드를 생성하고 그 안에 새로운 Node.js 인스턴스를 만들어주고 싶습니다; 결국 동일한 프로세스 내에서 독립적인 스레드를 실행하고 싶은 것입니다.

worker_threads 구현은 애플리케이션이 여러 격리된 JavaScript 워커를 사용할 수 있도록 함으로써 동시성을 제공합니다. 워커들 간 통신 및 부모 워커와의 통신은 Node가 제공하는 것입니다. 주 프로그램과 워커 "스레드" 간에는 암시적인 메모리 공유가 없습니다. 대신, 이벤트 기반 메시징 시스템이 제공되어 값들이 프로세스 간에 교환될 수 있게 됩니다.

각 워커는 메시지 채널을 통해 부모 워커에 연결됩니다.



![이미지](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_5.png)

작업자 스레드는 뒷면에서 두 가지 구분된 단계로 작동합니다. 첫 번째 단계는 작업자 초기화입니다. 여기서 작업자 인스턴스가 생성되고 부모 및 자식 작업자 간의 초기 통신이 수립됩니다. 이를 통해 부모에서 자식 작업자로 작업자 메타데이터를 전송할 수 있습니다.

이 초기화 메타데이터는 무엇일까요? 이는 작업자 실행 스크립트가 작업자를 시작하는 데 필요한 정보입니다: 작업자로 실행할 스크립트 이름, 작업자 데이터 및 추가 세부 정보입니다. 예를 들어, 이 초기화 메타데이터는 다음과 같은 메시지일 수 있습니다: "안녕 작업자, worker-simple.js 파일을 'num: 5'와 함께 실행해 줄 수 있을까요?"

두 번째 단계는 작업자 실행입니다. 여기서 사용자의 작업자 JavaScript 스크립트가 사용자가 제공한 workerData 및 부모 작업자가 제공한 다른 메타데이터를 사용하여 실행됩니다. 이 과정에서 새로운 v8 인스턴스가 생성되고 작업자에 할당됩니다. 그런 다음 libuv가 자체 이벤트 루프로 초기화됩니다. 초기화 메타데이터가 읽히고 worker.js가 실행됩니다.



# 무엇을 작업할 수 있을까요?

## isMainThread, threadId

워커용 새 파일을 만들고 싶지 않다면 워커 인스턴스 스크립트 경로로 __filename을 전달할 수 있습니다. 이렇게 하면 동일한 파일을 사용할 수 있습니다. 그리고 isMainThread을 사용하여 메인 스레드와 워커 스레드에서 실행하고 싶은 논리를 구분할 수 있습니다. 생성된 객체에는 고유한 threadId 속성이 있습니다.

## 워커 이벤트



Worker는 우리가 원하는 콜백과 연결할 수 있는 몇 가지 이벤트를 제공합니다.

- 메시지: `message` 이벤트는 워커 스레드가 parentPort.postMessage()를 호출할 때 발생합니다.
- 종료: `exit` 이벤트는 워커가 중지될 때 발생합니다. 워커가 process.exit()를 호출하여 종료된 경우 exitCode 매개변수는 전달된 종료 코드입니다. 워커가 종료된 경우, exitCode 매개변수는 1입니다. 이는 모든 Worker 인스턴스에서 발생하는 마지막 이벤트입니다.
- 오류: `error` 이벤트는 워커 스레드가 처리되지 않은 예외를 throw할 때 발생합니다. 이 경우 워커가 종료됩니다.
- 온라인: `online` 이벤트는 워커 스레드가 JavaScript 코드를 실행하기 시작했을 때 발생합니다.

위 예제는 각 parseJSAsync() 호출을 위해 Worker 스레드를 생성합니다. 실제로는 이러한 작업을 수행할 Worker 풀을 사용하십시오. 그렇지 않으면 Worker를 생성하는 오버헤드가 혜택을 상회할 수 있습니다.



## Worker 옵션

파일명과 함께 worker를 생성할 때 두 번째 인자로 특정 옵션을 전달할 수 있습니다. const worker = new Worker(__filename, OptionsObject)
일부 OptionObject 속성은 다음과 같습니다:

- argv: worker에 process.argv에 추가되기 전 문자열화 및 연결될 인수 목록입니다. 이것은 대부분 workerData와 유사하지만, 값은 CLI 옵션으로 스크립트에 전달된 것처럼 전역 process.argv에서 사용할 수 있습니다.
- workerdata: 워커 스레드에 전달하려는 데이터입니다. 이 데이터는 HTML 구조화된 클론 알고리즘을 사용하여 복제됩니다.
- transferList: ArrayBuffer, MessagePort, FileHandle, X509Certificate, Blob로 이루어진 항목의 배열입니다. workerData에 하나 이상의 MessagePort와 같은 객체가 전달된 경우, 해당 항목에 대해 transferList가 필요하며, 전달되지 않은 경우에는 ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST가 throw됩니다. 자세한 내용은 아래에서 더 다루겠습니다.
- env: 설정된 경우 Worker 스레드 내부의 process.env의 초기값을 지정합니다. 특별한 값으로 worker.SHARE_ENV를 사용하여, 부모 스레드와 자식 스레드가 환경 변수를 공유해야 함을 지정할 수 있으며, 이 경우 한 스레드의 process.env 객체에 대한 변경 사항은 다른 스레드에도 영향을 줍니다.
- resourceLimits: 새 JS 엔진 인스턴스에 대한 리소스 제한의 선택적 집합입니다. 이러한 제한에 도달하면 Worker 인스턴스가 종료됩니다. 이러한 제한은 JS 엔진에만 영향을 미치며, ArrayBuffer를 포함한 외부 데이터는 영향을 받지 않습니다. 이러한 제한을 설정해도 전역 메모리 부족 상황을 만나게 되면 프로세스가 중단될 수 있습니다. 제약 사항 중 일부는 maxYoungGenerationSizeMb (MB의 메인 힙의 최대 크기), maxOldGenerationSizeMb, codeRangeSizeMb, stackSizeMb입니다.
- name: 디버깅 / 식별 목적을 위해 워커 제목 뒤에 추가할 수 있는 선택적 이름이며, 최종 제목은 [worker $'id'] $'name'입니다. 기본값: ``.

## MessageChannel



쓰레드 간 통신을 위해 중요한 두 가지 구성 요소가 있습니다. 통신 채널과 통신할 포트입니다. 먼저 통신하기 전에 통신 채널인 MessageChannel을 설정해야 합니다. MessageChannel은 비동기, 양방향 통신 채널입니다. MessageChannel에는 별도의 메서드가 없습니다. new MessageChannel()은 port1과 port2 속성을 갖는 객체를 반환하는데, 이 속성들은 연결된 MessagePort 인스턴스를 가리킵니다. 기본적으로 port1과 port2는 채널의 두 끝점에 해당합니다.

```js
const { MessageChannel } = require('node:worker_threads');

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });
// Prints: received { foo: 'bar' } from the `port1.on('message')` listener
```

메시지를 보내는 용도로 한 포트를 사용하고, 메시지를 수신하는 용도로 다른 포트를 사용합니다. 기본적으로 port1과 port2는 채널의 두 끝점에 해당합니다.

[Worker Threads in Node.js](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_6.png)



## MessagePort 및 MessagePort 이벤트

이전에는 worker에서 부모로 메시지를 보내기 위해 `parentPort.postMessage()`를 사용했고 worker에서 메시지를 보내기 위해 `worker.postMessage()`를 사용했습니다. 이는 부모Port와 Worker가 모두 MessagePort 클래스의 인스턴스이기 때문입니다. 이 제공된 postMessage 및 message, close와 같은 이벤트들은 콜백을 태깅할 수 있습니다.

- message: 어떠한 수신 메시지에 대해 이벤트가 발생합니다.
- close: 채널의 어느 한 쪽이 연결을 해제했을 때 이벤트가 발생합니다.

```js
const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

// 출력:
//   foobar
//   closed!
port2.on('message', (message) => console.log(message));
port2.on('close', () => console.log('closed!'));

port1.postMessage('foobar');
port1.close();
```



## 쓰레드 간 데이터 전달 방법

- 데이터 복제
두 개의 쓰레드 간 데이터를 전달하는 여러 가지 방법이 있습니다. 기본적으로 이 데이터는 복제됩니다. 즉, 송신자와 수신자가 데이터의 각각 고유한 사본을 갖게 됩니다. 이 데이터는 '구조화된 복제 알고리즘'을 통해 복제됩니다. 전달되는 데이터가 깊게 중첩된 경우 데이터를 복제하는 데 상당한 처리 능력이 필요할 수 있습니다. 따라서 데이터의 사본을 만들어 두는 것이 항상 최적적이라고 할 수 없습니다.
- 데이터 전송
위의 단점을 극복하는 한 가지 방법은 데이터를 전송하는 것입니다. transferList 옵션을 사용하여 이를 달성할 수 있습니다. transferList를 사용하면 송신자가 수신자에게 데이터를 직접 제공할 수 있습니다. 이렇게 하면 송신자의 쪽에서 해당 데이터에 액세스할 수 없게 됩니다.
transferList는 ArrayBuffer, MessagePort 및 FileHandle 객체의 목록일 수 있습니다. 전송 후에는 채널의 보내는 쪽에서 더 이상 사용할 수 없습니다 (value에 포함되어 있지 않더라도 해당됨). 네트워크 소켓과 같은 핸들을 전송하는 것은 현재 지원되지 않습니다 (이것은 자식 프로세스와 함께 가능합니다).
- 동일한 데이터 공유
SharedArray Buffer를 사용하여 송신자와 수신자 간에 동일한 데이터를 공유할 수 있습니다.

## 원자성

워커 또는 메인 쓰레드에서 동시에 공유 메모리를 생성하고 업데이트할 수 있으며, 이로 인해 경쟁 조건과 동기화 문제가 발생할 수 있습니다. 이 문제를 피하기 위해 Atomics를 사용할 수 있습니다. 메모리가 공유되면 여러 쓰레드가 메모리에서 동일한 데이터를 읽거나 쓸 수 있습니다. 원자 연산은 다음 연산이 시작되기 전에 작업이 완료되도록 하며, 작업이 중단되지 않도록 합니다.
new 연산자로 사용하거나 Atomics 객체를 함수처럼 호출할 수 없습니다. Atomics의 모든 속성과 메소드는 정적(static)입니다 (Math 객체와 마찬가지로).



Atomics.load(): 배열의 지정된 인덱스에서 값 반환. 인덱스의 '게터'의 한 종류.
Atomics.store(): 배열의 지정된 인덱스에 값 저장. 값 반환.
Atomics.and()/Atomics.or()/Atomics.sub()/Atomics.xor()/Atomics.add(): 비트 연산
Atomics.notify()/Atomics.wait(): 특정 조건이 충족될 때까지 대기하는 방법을 제공하며 일반적으로 블로킹 구조로 사용됨.

이제 다양한 방법으로 데이터를 전달해 봅시다

## 포트 전송

이것은 일반적으로 전송 목록에서 포트를 전달하고 싶을 때 유용합니다. 이제 왜 그렇게 하고 싶을까요? 이 방법을 통해 메시지 채널을 재사용할 수 있습니다. 이를 해보겠습니다.



In parent.js

```js
// parent.js

const { Worker, MessageChannel } = require('worker_threads');
const { port1, port2 } = new MessageChannel()

const worker = new Worker('./worker.js')
port1.on("message", msg => {
    console.log(`Worker로부터 온 메시지 ----> ${msg}`)
})
worker.postMessage({ port: port2}, [port2])
```

In worker.js

```js
// worker.js

const {parentPort} = require('worker_threads');
parentPort.on("message", msg => {
    msg.port.postMessage('전달된 포트를 사용하여 Hi를 보냈습니다')
})
```



워커로부터의 메시지: Sent Hi from using transfered port

## 배열 버퍼를 사용한 데이터 전송

배열 버퍼(Array Buffer)는 고정 길이 및 연속된 메모리 영역이며 한 번 길이가 선언되면 변경할 수 없습니다. 보통 배열처럼 내부 값을 직접 액세스할 수 없고 데이터 뷰(Data view)라는 것이 필요합니다. 데이터 뷰는 선언된 배열 버퍼를 볼 때 어떤 렌즈로 보는지에 대한 것입니다. 

예를 들어, 16바이트 배열 버퍼를 선언한다면 (16바이트 === 128비트),
```javascript
const arrayBuffer = new ArrayBuffer(16)
```

이제 이 128비트를 어떤 렌즈로 볼 것인지 다음과 같은 방법으로 할 수 있습니다. 
이 128비트를 8 * 16 블록 즉, 8비트 정수 배열로 볼 수 있습니다.
```javascript
const dataview = new Int8Array(arrayBuffer, 0, 16)
```

또는,
이 128비트를 16 * 8 블록 즉, 16비트 정수 배열로 볼 수 있습니다.
```javascript
const dataview = new Int16Array(arrayBuffer, 0, 8)
```

또는,
이 128비트를 32 * 4 블록 즉, 32비트 정수 배열로 볼 수 있습니다.
```javascript
const dataview = new Int32Array(arrayBuffer, 0, 4)
```

이러한 Int8Array, Int16Array, Int32Array, Int64Array는 배열 버퍼 내부 데이터를 다양하게 표현하기 위한 배열 유형(Types arrays)이라고 불립니다.

parent.js에서



```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js')
const arrayBuffer = new ArrayBuffer(16)
const dataview = new Int8Array(arrayBuffer, 0, 16) // all 0 by default
console.log('부모 안에서 전송하기 전' + dataview)
worker.postMessage(dataview, [dataview.buffer])
// console.log('부모 안에서 전송 후' + dataview)
```

worker.js 파일 내용

```js
const { parentPort } = require('worker_threads');
parentPort.on("message", msg => {
    console.log('전송 후 워커 내에서' + msg)
})
```

위 코드를 실행하면 출력은 다음과 같습니다.




<img src="/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_7.png" />

그래서 데이터가 전송되었다는 것을 증명하는 것이죠.
만약 parent.js의 마지막 줄의 주석을 해제한다면, parent.js가 이미 전송된 배열 버퍼에 액세스할 수 없다는 것을 보여주는 다음 오류가 발생할 겁니다.

<img src="/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_8.png" />

## SharedArray buffer를 사용하여 데이터 공유하기



이제 배열 버퍼를 전송해 봅시다.
부모.js 파일에서 다음과 같이 작성하세요.

```js
const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js')
const sharedArrayBuffer = new SharedArrayBuffer(16)
const dataview = new Int8Array(sharedArrayBuffer, 0, 16) // 기본적으로 모두 0
console.log('부모 안에서 공유하기 전' + dataview)
worker.postMessage(dataview)
console.log('부모 안에서 공유한 후' + dataview)
```

worker.js 파일에서는 다음과 같이 작성하세요.

```js
const {parentPort} = require('worker_threads');
parentPort.on("message", msg => {
    console.log('작업자 안에서 공유한 후' + msg)
})
```



![WorkerThreadsMultitaskinginNodeJS_9](/assets/img/2024-05-13-WorkerThreadsMultitaskinginNodeJS_9.png)

이번에는 부모로부터 온 마지막 로그가 발생하지 않습니다. 데이터가 실제로 공유되고 전송되거나 복사되지 않기 때문입니다.

# 워커 스레드 주의사항

- NodeJS 워커 스레드는 일반적인 스레드가 아닙니다. 다른 언어의 멀티스레딩과 같이 멀티스레딩이 되기를 기대한다면, 기본적으로 스레드는 동일한 상태를 공유해야 합니다. Node.js 워커 스레드는 자체 V8, libuv 인스턴스, 이벤트 루프 및 별도의 힙을 가지는 다른 워커 스레드와 독립적으로 작동합니다.
- IO에 워커 스레드를 사용하는 것은 무의미합니다. 워커 프로세스를 생성하고 유지하는 비용은 Node의 비동기 I/O 구현보다 효율적이지 않습니다.
- 워커 스레드는 성능 절약이 프로세스 생성 비용보다 쉽게 상쇄될 수 있는 경우에 사용해야 합니다.
- 공유 워커 스레드 풀을 활용하면 비효율성을 줄이고 새로 생성하는 필요성을 제거할 수 있습니다. 이 접근 방식은 시간과 자원을 절약할 뿐만 아니라 워커 풀의 관리를 단순화시킵니다. Piscina와 Poolifier와 같은 라이브러리는 워커 풀을 관리하는 복잡성을 처리하여 더 중요한 작업에 집중할 수 있도록 해줍니다.
- 워커 스레드의 디버깅은 이벤트, 해당 워커 및 결과적인 영향 사이의 명확한 연결 부재로 인해 매우 어려울 수 있습니다. 디버깅을 위해 console.log() 문으로만 의존하는 것은 지루하고 오류가 발생하기 쉽습니다. 그러나 문제 해결에 도움이 되는 솔루션이 있습니다. 풀에 AsyncResource를 첨부하여 편집되어진 비동기 스택 추적을 제공받을 수 있습니다. 이 가치 있는 도구를 사용하면 풀 내에서 발생한 활동을 정확하게 추적하는 상세한 비동기 스택 추적을 확인할 수 있습니다.
- 자식 프로세스 또는 워커 스레드를 사용할지 헷갈릴 때, CPU 집중 작업에는 워커 스레드를 사용하고 앱을 확장하려면 자식 프로세스를 사용하세요.
- 코어의 수보다 많은 스레드를 생성하면 성능 향상이 크지 않을 것입니다. CPU 활용률이 컨텍스트 전환에서 소비되기 때문입니다. 이런 이유로 스레드 풀을 신중하게 사용해야 합니다.
- Piscina, Bree, Poolifier, WorkerPool 등 많이 사용되는 라이브러리들은 모듈을 더 편리하게 사용할 수 있도록 랩핑하거나 스레드 풀링과 같은 상위 수준의 기능을 제공합니다.



## 참고 자료

- [Node.js Worker Threads에 대한 심층적 탐구](https://blog.insiderattack.net/deep-dive-into-worker-threads-in-node-js-e75e10546b11)
- [Node.js 스레드 풀 깊이 파헤치기](https://betterprogramming.pub/a-deep-dive-into-the-node-js-thread-pool-a1f32a4f8628)
- [YouTube 영상 - Worker Threads 소개](https://www.youtube.com/watch?v=-JE8P2TiJEg)
- [YouTube 영상 - Node.js 멀티스레딩 사용법](https://www.youtube.com/watch?v=P1sWw1bLyVg)
- [Node.js 공식 블로그 - Worker Threads 소개](https://nodesource.com/blog/worker-threads-nodejs/)
- [DigitalOcean 커뮤니티 - Node.js에서 멀티스레딩 사용 방법](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js)
- [Snyk 블로그 - Worker Threads를 활용한 Node.js 멀티스레딩](https://snyk.io/blog/node-js-multithreading-with-worker-threads/)
- [Snyk 블로그 - Node.js Worker Threads 장단점](https://snyk.io/blog/node-js-multithreading-worker-threads-pros-cons/)
- [YouTube 영상 - Node.js Worker Threads 사용 예시](https://www.youtube.com/watch?v=kDr7YycaZ5E)
- [Stack Overflow 질문 - Node.js Worker Thread가 생성될 때 같은 코어를 이용하는가?](https://stackoverflow.com/questions/61831510/when-a-workerthread-is-created-in-nodejs-does-it-utilize-the-same-core-in-which)

# 떠나시기 전에!

- 추가 정보 받아보세요! 팔로우하고 구독해주세요.
- 👏 버튼을 클릭하고 길게 누르면 무슨 일이 일어나는지 보셨나요?