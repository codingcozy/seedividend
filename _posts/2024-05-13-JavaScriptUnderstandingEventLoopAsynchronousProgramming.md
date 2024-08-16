---
title: "JavaScript 이벤트 루프와 비동기 프로그래밍 이해하기"
description: ""
coverImage: "/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_0.png"
date: 2024-05-13 00:05
ogImage: 
  url: /assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_0.png
tag: Tech
originalTitle: "[JavaScript] Understanding Event Loop , Asynchronous Programming"
link: "https://medium.com/@tyliang/javascript-understanding-event-loop-asynchronous-programming-30419d919eed"
isUpdated: true
---




<img src="/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_0.png" />

자바스크립트는 한 번에 하나의 작업을 이벤트 큐에서 처리하기 때문에 싱글 스레드 언어라는 점을 알고 계실 것입니다. 현재 작업이 완료되기 전까지는 다른 작업을 수행할 수 없습니다. 비동기 작업을 처리하는 방식을 이해하는 데 이 특징은 중요합니다.

매우 명확해 보이죠? 그런데 비동기적으로 작업을 수행해야 한다면 어떻게 해야 할까요? 시간이 필요한 단계를 수행해야 하지만 사용자 인터페이스가 멈춰있는 것을 원치 않을 때는 어떻게 해야 할까요?

예를 들어, setTimeout을 사용하여 타이머를 설정하거나 API에서 데이터를 가져올 때, 이와 같이 반만 로드된 웹 사이트를 사용자에게 보여주고 싶지는 않을 것입니다.



![JavaScript Event Loop and Asynchronous Programming](/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_1.png)

요약해보겠습니다. JavaScript를 단일 스레드 언어로 생각할 때, 위 스니펫은 "Apple" → "Elephant" → "Orange" 순서로 로그를 남길 것으로 생각할 수 있습니다.

하지만 실제 결과는 "Apple" → "Orange" → "Elephant" 순서로 나타납니다.

- console.log(‘Apple’) : 이 부분은 콘솔에 "Apple"을 동기적으로 기록합니다.
- setTimeout(() => console.log('Elephant'), 0): 이 부분은 "Elephant"를 0밀리초의 지연 후 콘솔에 기록하기로 예약합니다. 그러나 지연이 0밀리초로 지정되어 있더라도, Node.js와 같은 JavaScript 엔진은 이 작업을 콜백 큐로 밀어 넣어 모든 동기적 작업이 완료된 후에 실행되도록 합니다.
- console.log('Orange'): 이 부분은 첫 console.log('Apple') 문 이후에 콘솔에 "Orange"을 동기적으로 기록합니다.
- 결국, 모든 동기적 작업이 완료된 후 이벤트 루프가 타임아웃 작업을 가져와 "Elephant"를 콘솔에 기록합니다.



# 이벤트 루프

이전에 언급한 대로 JavaScript는 한 번에 한 가지 일만 할 수 있기 때문에 비동기 작업을 관리하고 이러한 블로킹 함수가 다른 이벤트의 실행을 방해하는 것을 방지하는 메커니즘이 필요합니다.

이 메커니즘을 "이벤트 루프"라고 합니다. 기본적으로 비동기 함수가 발견되면 이후에 실행할 콜백 대기열에 추가되어 런타임이 동기 코드를 계속 실행하도록 허용합니다.

여기 JavaScript 이벤트 루프 모델이 있습니다:



![이미지1](/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_2.png)

![이미지2](/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_3.png)

1. 호출 스택:
JavaScript는 호출 스택을 사용하여 프로그램 내의 함수를 추적하고 동기 방식으로 함수 호출을 관리합니다. 함수가 호출되면 호출 스택의 맨 위에 추가되며, 함수가 반환되면 스택에서 제거됩니다. 이 프로세스는 나중에 추가된 것이 먼저 제거되는 (Last In, First Out, LIFO) 원칙을 따릅니다.

2. 메모리 힙:
JavaScript 런타임에서 메모리 힙은 동적으로 할당된 객체와 변수가 위치하는 메모리 영역입니다.



3. Callback Queue:
비동기 함수의 콜백이 대기열에 저장되어 있고, 호출 스택이 비어 있을 때 실행을 위해 대기하는 곳입니다. 이벤트 루프가 이를 처리하기 위해 가져와서 처리합니다.

4. 이벤트 루프:
이벤트 루프는 콜백 대기열과 호출 스택을 모니터링하는 계속적으로 실행되는 프로세스입니다. 호출 스택이 비어 있지 않으면, 이벤트 루프는 호출 스택이 비어질 때까지 기다렸다가 다음 함수를 콜백 대기열에서 호출 스택으로 이동시킵니다.

JavaScript 자체는 본질적으로 동기적이지만, Web API 및 이벤트 루프와 같은 메커니즘을 통해 비동기 작업을 효과적으로 처리할 수 있습니다.

# 작업 및 마이크로작업



더 자세히 살펴보면, 실행 문맥에는 두 가지 다른 유형이 있습니다: 작업과 마이크로태스크가 있습니다. JavaScript의 이벤트 루프에서 언제 실행되는지에 따라 다른 우선순위를 갖습니다.

호출 스택이 비어있을 때, 먼저 마이크로태스크 큐를 확인합니다. 마이크로태스크 큐도 비어있으면 태스크 큐에 있는 함수를 실행하기 시작합니다.

태스크

태스크는 이벤트 루프에서 더 높은 수준의 작업 단위입니다. 일반적으로 I/O 작업, 렌더링 및 사용자 입력 이벤트와 같은 다른 비동기 이벤트가 포함됩니다.



일반적인 작업 예시로는 setTimeout, setInterval, DOM 조작, 그리고 사용자 상호작용을 위한 이벤트 리스너 등이 있습니다.

마이크로태스크

마이크로태스크는 이벤트 루프에서 작업보다 우선순위가 높은 하위 수준의 작업 단위입니다. 일반적으로 브라우저가 렌더링을 수행하거나 다른 상위 수준의 작업을 수행하기 전에 실행되어야 하는 비동기 작업에 사용됩니다.

예시로는 프로미스(해결됨 또는 거부됨)과 변이 관찰자가 있습니다.



![JavaScript Event Loop](/assets/img/2024-05-13-JavaScriptUnderstandingEventLoopAsynchronousProgramming_4.png)

요약하자면, JavaScript의 이벤트 루프는 웹 API에 작업을 전달하고, 그 작업을 태스크 큐에서 가져와 콜 스택에서 실행하는 주기적인 프로세스를 포함합니다. 작업을 지속적으로 관리하는 이 프로세스는 JavaScript에서 실행 흐름을 주도합니다.

# 참고 자료

[Philip Roberts: 이벤트 루프가 도대체 뭐길래]
(https://youtu.be/8aGhZQkoFbQ)



[JavaScript의 콜 스택이란 무엇인가요?]
https://www.linkedin.com/pulse/what-call-stack-javascript-jay-tillu-252vf/

[이벤트 루프 - 친숙하면서도 낯선 것들]
https://medium.com/@Hsu.Yang-Min/event-loop-a61631e0048b