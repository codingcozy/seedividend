---
title: "Nodejs에서 이벤트 기반 및 비동기 프로그래밍 탐험하기"
description: ""
coverImage: "/assets/img/2024-05-13-ExploringEvent-DrivenandAsynchronousProgramminginNodejs_0.png"
date: 2024-05-13 00:34
ogImage: 
  url: /assets/img/2024-05-13-ExploringEvent-DrivenandAsynchronousProgramminginNodejs_0.png
tag: Tech
originalTitle: "Exploring Event-Driven and Asynchronous Programming in Node.js"
link: "https://medium.com/@kernel.rb/exploring-event-driven-and-asynchronous-programming-in-node-js-ff42bd49c840"
---


![Node.js Logo](/assets/img/2024-05-13-ExploringEvent-DrivenandAsynchronousProgramminginNodejs_0.png)

Node.js의 핵심에 오신 것을 환영합니다. 여기는 이벤트가 다스리고 비동기가 왕이 되는 곳입니다. 이 시리즈에서는 Node.js의 이벤트 주도 아키텍처를 해독하고 비동기 능력에 대해 자세히 살펴볼 것입니다. 초보자이든 경험이 풍부한 개발자이든 Node.js의 비밀을 해제할 준비를 해주세요. 여정을 시작해봅시다!

1. 이벤트 주도 아키텍처:

Node.js는 이벤트 주도 아키텍처에서 작동하며 작업은 이벤트 루프를 통해 비동기적으로 관리됩니다. 이 루프는 바쁜 교차로에서 교통 규제자와 유사하게 여러 작업을 효율적으로 동시에 처리합니다. 들어오는 요청이나 파일 작업과 같은 이벤트는 논블로킹 방식으로 대기열에 추가되고 처리되어 각 작업이 완료될 때까지 기다릴 필요 없이 원활하게 실행됩니다. 이 아키텍처를 통해 Node.js는 다양한 동시 작업을 효율적으로 처리하여 반응성이 뛰어나고 확장 가능한 애플리케이션을 만들기에 이상적입니다.



2. Node.js에서 이벤트 처리하기:

Node.js에서는 EventEmitter 클래스를 통해 이벤트 처리를 원활하게 할 수 있습니다. 이 클래스를 사용하면 개발자가 사용자 정의 이벤트를 생성하고 해당 이벤트에 대한 리스너를 붙일 수 있어 응용 프로그램 내에서 비동기 통신을 쉽게 할 수 있습니다.

다음은 Node.js에서 이벤트 처리를 시작하는 방법입니다:

```js
// EventEmitter 클래스를 가져오기
const EventEmitter = require('events');

// EventEmitter 클래스의 인스턴스 생성
const myEmitter = new EventEmitter();

// 사용자 정의 이벤트 생성 및 리스너 붙이기
myEmitter.on('sayHi', () => {
  console.log('Hi!');
});

myEmitter.on('sayGoodbye', () => {
  console.log('Goodbye!');
});

// 이벤트 발생
myEmitter.emit('sayHi'); // 출력: Hi!
myEmitter.emit('sayGoodbye'); // 출력: Goodbye!
```



3. 비동기 프로그래밍:

비동기 프로그래밍은 Node.js에서의 기본 개념으로, 작업을 주 프로그램 흐름과 독립적으로 실행할 수 있게 합니다. 이 접근 방식은 I/O 작업, 네트워크 요청 또는 데이터베이스 쿼리와 같이 완료까지 시간이 걸릴 수 있는 작업을 처리할 때 주 프로그램 흐름을 차단하지 않고 다른 작업을 실행하는 데 중요합니다.

Node.js에서 비동기 프로그래밍은 고성능이면서 블로킹되지 않는 애플리케이션을 개발하는 데 필수적입니다. 다음은 Node.js에서 비동기 프로그래밍에 사용되는 주요 메커니즘을 살펴보겠습니다:

- 콜백 함수: 콜백 함수는 다른 함수의 인수로 전달되어 작업이 완료되면 실행됩니다. Node.js에서 비동기 프로그래밍의 기본 구성 요소입니다. 그러나 여러 중첩된 콜백을 관리하는 것은 코드를 읽거나 유지하기 어렵게 만들 수 있는 콜백 지옥에 빠질 수 있습니다.
- 프로미스: 프로미스는 비동기 작업을 처리하고 콜백 지옥을 줄이는 더 구조화된 방법을 제공합니다. 프로미스는 비동기 작업의 최종 완료(또는 실패)를 나타내며 .then() 및 .catch() 메서드를 사용하여 작업을 연결할 수 있습니다. 프로미스는 코드 가독성과 유지 관리성을 향상시킵니다.
- Async/Await: Async/Await은 ES2017 (ES8)에서 소개된 구문 설탕으로, 비동기 코드를 더욱 간단하게 작성할 수 있습니다. 이를 사용하면 동기적으로 보이는 비동기 코드를 작성할 수 있어 이해하기 쉽고 유지하기 쉽습니다. Async 함수는 암묵적으로 프로미스를 반환하며, await 키워드는 async 함수 내에서 비동기 작업의 완료를 기다리기 위해 사용됩니다.



```js
// 콜백 함수를 사용한 예시
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('파일을 읽는 중 오류 발생:', err);
    return;
  }
  console.log('파일 내용:', data);
});

console.log('파일 읽는 중...');

// 프로미스를 사용한 예시
const readFilePromise = new Promise((resolve, reject) => {
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
});

readFilePromise
  .then(data => {
    console.log('파일 내용:', data);
  })
  .catch(err => {
    console.error('파일을 읽는 중 오류 발생:', err);
  });

console.log('파일 읽는 중...');

// Async/Await를 사용한 예시
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('example.txt', 'utf8');
    console.log('파일 내용:', data);
  } catch (err) {
    console.error('파일을 읽는 중 오류 발생:', err);
  }
}

readFileAsync();
console.log('파일 읽는 중...');
```

4. 이벤트 루프의 동작:

이벤트 루프는 Node.js의 핵심으로, 비동기 작업을 효율적으로 실행하는 역할을 합니다. 이벤트 루프의 내부 동작 방식을 간단히 살펴보고, Node.js에서 비동기 작업을 처리하는 방법에 대해 알아봅시다.

1. 이벤트 큐:



- Node.js에서 I/O 작업이나 타이머와 같은 비동기 작업을 만나면, 이러한 작업은 즉시 실행되지 않습니다.
- 대신에, 이러한 작업은 이벤트 큐에 들어가서 처리될 차례를 기다립니다.

2. 이벤트 루프 반복:

- 이벤트 루프는 계속해서 반복하면서, 실행 준비가 된 이벤트 큐의 작업을 확인합니다.
- 이벤트 큐가 비어있다면, 이벤트 루프는 작업이 추가될 때까지 기다립니다.

3. 실행 단계:



- 이벤트 큐에서 작업이 검색되면 실행 단계로 들어갑니다.
- 작업이 처리되고 동기 작업인 경우 즉시 실행됩니다.

4. Non-Blocking I/O:

- 비동기 작업인 I/O 작업과 같은 작업의 경우, 이벤트 루프는 작업을 기저 시스템에 위임하여 Node.js가 그 동안 다른 작업을 계속 실행할 수 있도록 합니다.
- 비동기 작업이 완료되면 해당 작업과 연결된 콜백이 콜백 큐에 배치됩니다.

5. 콜백 큐:



- 비동기 콜백은 연관된 작업들이 완료된 후에 콜백 큐에 저장됩니다.
- 이벤트 루프는 각 반복마다 콜백 큐를 확인하여 실행 대기 중인 콜백이 있는지 확인합니다.

6. 콜백 실행:

- 이벤트 루프가 콜백 큐에서 콜백을 만나면 하나씩 검색하고 실행합니다.
- 이 과정을 통해 비동기 작업이 완료된 순서대로 실행되어 프로그램 로직의 무결성을 유지합니다.

![이미지](/assets/img/2024-05-13-ExploringEvent-DrivenandAsynchronousProgramminginNodejs_1.png)



- 이벤트 기반 아키텍처:

- Node.js는 이벤트 기반 아키텍처에서 작동하며, 작업들이 이벤트 루프를 통해 비동기적으로 관리됩니다.
- 이벤트 루프는 이벤트를 대기열에 넣고 처리함으로써 여러 작업을 효율적으로 동시에 처리합니다.

2. Node.js에서 이벤트 처리:

- Node.js는 EventEmitter 클래스를 제공하여 사용자 정의 이벤트를 생성하고 해당 이벤트에 청취자(listener)를 연결할 수 있습니다.
- 이벤트와 청취자는 Node.js 애플리케이션 내에서 비동기 통신을 용이하게 만듭니다.



3. 비동기 프로그래밍:

- 비동기 프로그래밍은 주 프로그램 흐름과 독립적으로 작업을 실행할 수 있어 애플리케이션의 응답성을 향상시킵니다.
- 콜백, 프로미스, 그리고 async/await는 Node.js에서 비동기 작업을 처리하는 데 사용되는 메커니즘입니다.
- 콜백은 기본적이지만 콜백 지옥에 빠질 수 있습니다. 프로미스와 async/await는 보다 구조화되고 가독성이 좋은 대안을 제공합니다.

4. 이벤트 루프 동작:

- Node.js의 이벤트 루프는 지속적으로 반복하여 이벤트 큐에서 작업을 확인하고 처리합니다.
- I/O 작업과 같은 비동기 작업은 하부 시스템에 위임되어 Node.js가 여러 동시 작업을 효율적으로 처리할 수 있게 합니다.