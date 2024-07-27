---
title: "이벤트 루프가 뭐죠 자바스크립트 비동기 프로그래밍 탐구"
description: ""
coverImage: "/assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_0.png"
date: 2024-05-12 22:50
ogImage: 
  url: /assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_0.png
tag: Tech
originalTitle: "What the heck is the Event Loop: Explore Javascript Asynchronous Programming"
link: "https://medium.com/angular-simplified/what-the-heck-is-the-event-loop-explore-javascript-asynchronous-programming-e3c35059d5b4"
---



![이미지](/assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_0.png)

자바스크립트는 본질적으로 싱글 스레드입니다. 그렇다면 프라미스와 비동기 메서드를 어떻게 처리할까요? 그것들을 어떻게 병렬로 실행할까요? 답은 명확하지 않을 수 있습니다. 자바스크립트 비동기 프로그래밍을 탐구해봅시다...

# 정교하고 효율적인 아키텍처

자바스크립트는 이벤트 루프, 태스크 큐 및 마이크로태스크 큐를 결합하여 싱글 스레드 언어가 비동기 작업을 수행할 수 있도록 정교하고 효율적인 아키텍처를 갖추고 있습니다.



<img src="/assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_1.png" />

## 예시를 살펴보겠습니다...

```js
// 메소드-1
console.log("A");

// 메소드-2
setTimeout(()=>{
  console.log("B");
},100);

// 메소드-3
setTimeout(()=>{
  console.log("C");
},0);

// 메소드-4
console.log("D");

/***
*
* 출력:
* ADCB
*
***/

```

- 실행이 시작되면 각 메소드 호출이 실행을 위해 CallStack에 들어갑니다.



<img src="/assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_2.png" />

- 즉시 결과를 제공할 수 있는 메서드(동기 메서드)가 실행됩니다. 비동기 메서드의 콜백은 해당 Web API로 넘어갑니다.

<img src="/assets/img/2024-05-12-WhattheheckistheEventLoopExploreJavascriptAsynchronousProgramming_3.png" />

- 메서드 1과 4는 즉시 반환되고, 메서드 2와 3은 실행 시간이 되었을 때 TaskQueue로 푸시하기 위해 setTimeout API로 넘어갑니다.
- 타이머가 0일 때 메서드 3이 Task Queue로 푸시되고, 타이머가 100일 때 메서드 4가 그 뒤를 이어 실행됩니다.
- 그리고 나중에 Task Queue에 있는 각 메서드가 자유 시간이 되면 실행을 위해 호출 스택으로 이동됩니다. 이것이 Javascript가 비동기 메서드를 처리하는 방식입니다.



## MicroTask Queue이 하는 일은 무엇인가요…?

- MicroTask Queue은 Promise에서의 콜백을 처리하는 전용 큐입니다.
- MicroTask Queue에 있는 콜백은 Task Queue에서의 작업보다 우선순위가 높기 때문에, Task Queue에서의 작업은 MicroTask Queue의 작업이 모두 Call Stack으로 이동한 후에만 Call Stack으로 이동됩니다. 언제 큐에 도착했느냐에 관계없이 그렇습니다.

# 결론

이벤트 루프의 개념은 JavaScript를 더 동적이고 유연하게 만들어 주었습니다. JavaScript가 일 스레드인 한에서 비동기 프로그래밍을 수행하는 데 도움이 됩니다.