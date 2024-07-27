---
title: "Web Workers 자바스크립트 멀티스레딩 잠재력 해방하기 "
description: ""
coverImage: "/assets/img/2024-06-22-WebWorkersUnlockingJavaScriptsMultithreadingPotential_0.png"
date: 2024-06-22 02:05
ogImage: 
  url: /assets/img/2024-06-22-WebWorkersUnlockingJavaScriptsMultithreadingPotential_0.png
tag: Tech
originalTitle: "Web Workers: Unlocking JavaScript’s Multithreading Potential 🚀"
link: "https://medium.com/javascript-in-plain-english/web-workers-unlocking-javascripts-multithreading-potential-e8a0b88a35ad"
---


<img src="/assets/img/2024-06-22-WebWorkersUnlockingJavaScriptsMultithreadingPotential_0.png" />

JavaScript은 초기에 Brendan Eich에 의해 고안된대로 시작되어 웹 페이지 내 간단한 동적 기능을 위해 설계된 간결한 스크립팅 언어로 출발했습니다. JavaScript는 오늘날의 웹 애플리케이션에서 볼 수 있는 복잡성을 다루기 위해 만들어진 것이 아니었습니다. 이것이 JavaScript가 단일 스레드 언어로 구축된 이유입니다. 동시에 다중 스레드가 동일한 DOM 요소를 동시에 사용하려고 한다면 어떤 혼란이 벌어질지 상상해보세요! 🤯

# 단일 스레드 현실

단일 스레드는 JavaScript의 핵심입니다. 브라우저는 JavaScript 이벤트를 한 번에 하나씩 처리할 수 있도록 설계되었습니다. 이에는 중요한 영향이 몇 가지 있습니다.

<div class="content-ad"></div>

- 동시 실행 불가: JavaScript가 실행 중일 때 이벤트 핸들러나 타이머와 같은 다른 작업은 차례를 기다립니다.
- 반응성이 중요합니다: 오랫동안 실행되는 JavaScript 함수는 브라우저를 멈출 수 있어 사용자 경험이 불편해질 수 있습니다.

이것이 바로 현대의 fetch()와 같은 비동기 API가 만들어진 이유입니다 - 메인 스레드를 막힘 없이 유지하기 위해서!

# 웹 워커로 진입 💪

웹 앱이 더 복잡해지고 데이터 조작 및 복잡한 논리 처리를 위해 더 많은 처리 능력을 요구함에 따라 JavaScript의 단일 스레드 모델의 한계가 드러납니다. 이때 웹 워커가 구원에 나서는 것입니다. 🎉

<div class="content-ad"></div>

웹 워커는 HTML5 사양의 일부로 실제로 오랫동안 사용되어 왔습니다! 이 개념은 2009년에 처음 제안되었습니다. 웹 워커를 사용하면 백그라운드 스레드에서 스크립트를 실행할 수 있어서 주 웹페이지의 스레드와 독립적으로 작동합니다. 이는 더 부드러운 성능과 더 만족스러운 사용자 경험을 제공합니다. 😃

# 웹 워커의 종류

웹 워커에는 세 가지 주요 유형이 있습니다:

- 전용 워커(Dedicated Workers): 이 워커는 생성된 특정 스크립트에 연결됩니다. 즉, 일대일 관계입니다.
- 공유 워커(Shared Workers): 이름에서 알 수 있듯이, 이 워커는 동일한 도메인에 속하는 여러 창 또는 아이프레임에서 실행되는 여러 스크립트에서 공유할 수 있습니다.
- 서비스 워커(Service Workers): 이 특별한 워커는 웹 앱, 브라우저, 네트워크 사이에 위치하여 프록시처럼 동작합니다. 이를 통해 견고한 오프라인 경험을 구축하고, 네트워크 요청을 가로채는 기능과 푸시 알림과 같은 기능을 활성화할 수 있습니다.

<div class="content-ad"></div>

# 웹 워커 사용하기: 간단한 예제

기본 예제를 살펴보겠습니다:

메인 스레드:

```js
const worker = new Worker("/worker.js");

worker.onmessage = (e) => {
  console.log(e.data); // 출력: "안녕, 주인님!"
};
worker.postMessage("안녕하세요, 워커!");
```

<div class="content-ad"></div>

워커 스레드(worker.js):

```js
self.onmessage = (e) => {
  console.log(e.data); // 출력: "안녕, 워커!" 
  self.postMessage("안녕하세요, 마스터!");
};
```

# 웹 워커 생성

웹 워커를 생성하는 것은 간단합니다:

<div class="content-ad"></div>

```js
const worker = new Worker(aURL, options);
```

위의 코드를 보겠습니다:

- aURL: 워커가 실행할 JavaScript 파일의 경로입니다. 중요한 점은, 워커 스크립트가 메인 웹페이지와 동일한 도메인에 호스팅되어야 한다는 동일 출처 정책을 따라야 합니다.
- options (옵션): 이 인자를 사용하여 워커의 몇 가지 측면을 사용자 정의할 수 있습니다.

# 웹 워커를 이용한 오류 처리


<div class="content-ad"></div>

웹 워커는 두 가지 유용한 오류 처리 이벤트를 제공합니다:

- error: 워커 내에서 오류가 발생했을 때 트리거됩니다.
- messageerror: 이 이벤트는 워커가 올바르게 역직렬화할 수 없는 메시지를 수신했을 때 발생합니다.

![웹 워커 이미지](/assets/img/2024-06-22-WebWorkersUnlockingJavaScriptsMultithreadingPotential_1.png)

# 스레드 간 데이터 교환: 평범하지 않은 통신

<div class="content-ad"></div>

JavaScript의 Web Workers는 스레드 간 데이터 교환을 용이하게 하는 간단한 메커니즘을 사용합니다:

- 구조화된 복제 알고리즘: 이것은 기본 및 가장 호환성 있는 방법입니다. 객체의 깊은 복사본을 안전하게 공유할 수 있는 견고한 방법입니다.
- 전송 가능한 객체: 최적의 성능을 요구하는 시나리오에서는 전송 가능한 객체를 사용하는 것이 좋습니다. 이들은 ArrayBuffers와 같은 특정 데이터 유형의 소유권 이전을 가능하게 하여, 불필요한 복사를 없애줍니다.
- SharedArrayBuffer: 이것은 스레드 간의 진정한 공유 메모리를 활성화합니다. 동시 액세스와 수정을 허용하며, 그러나 경쟁 조건을 방지하고 데이터 무결성을 보장하기 위해 추가적인 주의가 필요합니다.

![이미지](/assets/img/2024-06-22-WebWorkersUnlockingJavaScriptsMultithreadingPotential_2.png)

# 실용적인 응용: 웹 워커의 작동 방식

<div class="content-ad"></div>

웹 워커는 이런 경우에 빛을 발합니다:

- CPU 집약적 작업: 데이터 처리, 이미지 조작 또는 암호화와 같은 작업을 워커에 넘겨서 메인 UI 스레드를 반응성 있게 유지하세요.
- 비동기 작업: 데이터 가져오기 또는 기타 비동기 작업을 처리할 때, 웹 워커는 이러한 작업이 사용자 인터페이스의 원할한 흐름을 방해하지 않도록 합니다.

# 웹 워커를 사용해야 할 때 (그리고 사용하지 말아야 할 때)

웹 워커는 강력하지만 항상 필요한 것은 아닙니다. 간단하고 단기적인 작업의 경우에는, 웹 워커를 사용하면 오히려 불필요한 작업부하가 생길 수 있습니다.

<div class="content-ad"></div>

다음은 몇 가지 지침입니다:

- 장기적인 워커: 워커를 자주 생성하고 파괴하는 대신, 작업 스트림을 처리하는 지속적인 워커를 만드는 것이 좋습니다.
- 스레드 관리: 과도한 워커 생성은 시스템 자원을 과도하게 소모할 수 있습니다. 최적의 성능을 위해 활성 워커 수를 신중하게 고려해야 합니다.

# 결론: 웹 워커, 귀하의 아뮬렛에 담긴 강력한 도구

웹 워커는 JavaScript 개발자 툴킷에 중요한 요소로, 고성능 및 응답성이 뛰어난 웹 응용 프로그램을 구축할 수 있도록 도와줍니다. 이들의 능력과 한계를 이해함으로써, 브라우저에서 멀티스레딩의 참 꽃을 펼칠 수 있습니다. 즐거운 코딩하세요! 😄

<div class="content-ad"></div>

# 평문으로 이해하기 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 반드시 👏 둘썽 박수를 치고 작성자를 팔로우하세요!
- 저희를 팔로우하세요: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼도 방문해보세요: CoFeed | Differ
- PlainEnglish.io 에서 더 많은 콘텐츠를 확인하세요.