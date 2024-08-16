---
title: "Nodejs는 단일 스레드인가요"
description: ""
coverImage: "/assets/img/2024-05-14-IsNodejssingle-threaded_0.png"
date: 2024-05-14 12:29
ogImage: 
  url: /assets/img/2024-05-14-IsNodejssingle-threaded_0.png
tag: Tech
originalTitle: "Is Node.js single-threaded?"
link: "https://medium.com/@relja.jovicevic/is-node-js-single-threaded-c57c4f193c0d"
isUpdated: true
---





![Node.js](/assets/img/2024-05-14-IsNodejssingle-threaded_0.png)

아마도 노드.제이에스(Node.js)는 싱글 스레드, 비동기 런타임 환경이라고 들어봤을 것입니다. 그러나 이는 완전히 사실이 아닙니다. JavaScript 환경 자체는 하나의 스레드에서 실행되지만, 노드.제이에스 아키텍처에서 Libuv라는 중요한 구성 요소가 또 있습니다.

## Libuv란?

Libuv는 논 블로킹 I/O 작업을 추상화하기 위해 노드.제이에스를 위해 원래 작성된 C 라이브러리입니다.




## Libuv를 신경 써야 하는 이유

Node.js에서 Libuv를 이해하는 것이 중요한 이유는 Libuv가 비동기 I/O 기능을 제공하여 높은 동시성 및 I/O 바운드 작업을 효율적으로 처리하여 응답성과 확장성을 보장하기 때문입니다.

이 게시물에서는 Libuv의 주요 기능 중 하나인 스레드 풀에 대해 더 자세히 살펴보겠습니다.

## Libuv의 스레드 풀이란 무엇인가요?



Libuv는 파일 시스템 및 DNS 작업과 같이 이벤트 루프를 차단할 수 있는 일부 I/O 작업을 오프로드하기 위해 작업자 스레드 풀을 사용합니다. 스레드 풀을 통해 이러한 작업이 주 이벤트 루프를 차단하지 않고 비동기적으로 수행되어 Node.js가 반응적이고 효율적으로 유지되도록합니다.

## Libuv의 스레드 풀에서 무슨 일이 벌어질까요?

태스크는 이벤트 루프에서 스레드 풀로 전달되며, 주로 두 가지 유형으로 분류됩니다:

- I/O 집중적인



- DNS: dns.lookup(), dns.lookupService(). 
- 파일 시스템: fs.FSWatcher()을 제외한 모든 파일 시스템 API

2. CPU 집약적

- Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair(). 
- Zlib: 명시적으로 동기화되지 않는 모든 zlib API는 libuv의 스레드 풀을 사용합니다.

*C++ 애드온도 스레드 풀을 사용할 수 있습니다.



기본 쓰레드 수는 4입니다. 위에서 언급한 작업들을 많이 의존한다면 UV_THREADPOOL_SIZE를 늘리거나 쓰레드 풀에 대한 경합을 피하기 위해 이러한 함수들을 사용하지 않는 것이 좋습니다.

## 결론

Node.js가 종종 완전히 싱글 스레드로 오해되는 반면, Libuv와 그 쓰레드 풀의 역할을 이해하면 좀 더 세밀한 그림이 드러납니다. Node.js는 Libuv의 기능을 활용하여 I/O와 CPU 집약적 작업을 효율적으로 처리합니다.