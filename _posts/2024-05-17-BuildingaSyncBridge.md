---
title: "JavaScript에서 이벤트 기반 API를 Promises로 적용하기"
description: ""
coverImage: "/assets/img/2024-05-17-BuildingaSyncBridge_0.png"
date: 2024-05-17 20:29
ogImage:
  url: /assets/img/2024-05-17-BuildingaSyncBridge_0.png
tag: Tech
originalTitle: "Building a Sync Bridge"
link: "https://medium.com/better-programming/building-a-sync-bridge-ccbd9fd920b5"
isUpdated: true
---

## JavaScript에서 이벤트 기반 API를 Promises로 적응하기

![이미지](/assets/img/2024-05-17-BuildingaSyncBridge_0.png)

이벤트 기반 아키텍처(EDA)는 느슨하게 결합되고 성능이 우수하며 확장 가능한 웹 앱을 구축하는 강력한 방법입니다. 이것은 푸시 알림, 공동 편집 및 멀티플레이어와 같은 풍부한 경험을 제공하며 실시간 상호작용 및 모듈화를 장려합니다.

하지만 때로는 모델이 개발자로서 우리가 해야 할 일과 일치하지 않을 수 있습니다. 두 응용 프로그램 계층이 비동기 메시지 전달을 통해만 통신할 수 있는 경우, 코드를 서투르게 구조화해야 할 수도 있습니다. 요청 코드를 수신 코드와 함께 동일한 위치에 두지 못하고, 청취기 또는 구독을 직접 관리해야 합니다.

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

이 기사에서는 이벤트 기반 API를 편리한 Promise 기반 API로 적응하는 일반적인 솔루션을 소개하고 있습니다. 이를 통해 메시지 전달의 복잡성과 보일러플레이트를 숨기고 응용 프로그램 경계를 가로지르는 선형 코드를 작성할 수 있습니다.

## 요청/응답 대 이벤트 기반 아키텍처

웹의 전통적인 응용 프로그램은 REST, GraphQL, RPC 및 기타 요청/응답 모델을 따르는 사양을 통해 HTTP를 통해 경계를 가로지를 통신을 처리합니다. 이 모델은 요청자가 메시지를 보낸 다음 응답자가 메시지를 받아들이고 처리하고 응답하기를 기다리는 방식으로 특징 지어집니다. 이는 자바스크립트의 비동기 함수 안에서 발생할 수 있지만, 이를 "동기식" 또는 "인밴드"로 일반적으로 참조할 수 있습니다. 요청에 대한 응답이 즉시 기대되고 요청을 실행하는 컨텍스트가 해당 응답을 기다리게 된다는 점에서입니다.

![Building a Sync Bridge - 1](/assets/img/2024-05-17-BuildingaSyncBridge_1.png)

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

EDA(이벤트 기반 아키텍처) 또는 발행/구독 모델이라고도 불리는 것은 데이터 요청 및 수신 프로세스가 분리되어 논블로킹 및 비동기적으로 수행된다는 특징이 있어요. 일반적으로 클라이언트는 서버로부터 메시지를 구독하고, 서버는 클라이언트로부터 메시지를 받습니다. 클라이언트가 데이터를 요청할 때, 단순히 메시지를 보내고 실행을 계속합니다. 서버는 이 메시지를 받아 처리하고 어느 시점에서 다시 클라이언트로 다른 메시지를 보낼 것이에요. 클라이언트는 구독자로서 이 메시지를 "원래 요청으로부터 외줄로" 받아 유용한 대로 처리할 수 있습니다. 중요한 점은 이것이 다른 시간에 이루어지거나 다른 네트워크 요청 또는 다른 프로토콜을 사용해도 된다는 것이에요.

![이미지](/assets/img/2024-05-17-BuildingaSyncBridge_2.png)

이벤트 기반 모델의 능력에는 몇 가지 주요 장점이 있어요. 먼저, EDA는 클라이언트에게 요청하지 않아도 서버에서 이벤트를 알릴 수 있습니다. 이는 비싼 폴링을 제거하고, 다른 곳에서 발생한 알림 및 이벤트에 대한 "푸시" 동작을 가능하게 합니다. 둘째, 이는 메시지 처리를 메시지 전송과 분리할 수 있어서 덜 결합된 코드를 유도할 수 있습니다. 셋째, 이는 개발자에게 병렬 처리를 할 수 있게 하고, 견고하고 이해하기 쉬운 시스템을 구축할 수 있게 합니다. 넷째, 오직 인식된 메시지만이 구독자에 의해 처리되므로 시스템이 기본적으로 내결함적입니다.

웹 기술인 웹훅(Webhooks), 웹소켓(WebSockets), 서버-전송 이벤트(Server-Sent Events)와 MQTT, AMQP와 같은 프로토콜, 이러한 것 위에 구축된 다양한 도구를 사용하여 강력한 이벤트 기반 응용 프로그램을 구현할 수 있습니다.

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

## EDA(이벤트 주도 아키텍처)가 방해할 때

복잡한 앱에서 이벤트 주도 아키텍처는 많은 장점을 제공할 수 있습니다. 하지만 때로는 데이터를 특정 실행 컨텍스트에서 즉시 필요로 하는 경우도 있습니다. 때로는 원격 리소스나 절차를 마치 로컬인 것처럼 다루고 싶은 경우도 있습니다.

다소 인위적인 예로, 사용자 입력에 대해 비용이 많이 드는 계산을 수행해야 하는 애플리케이션이 있다고 가정해 봅시다. 이 계산을 웹 워커에서 수행하는 것이 가장 좋다고 판단하여, 이 작업을 메인 UI 스레드에서 사이클을 소비하지 않고 작업을 수행하는 별도의 스레드를 사용하는 방법으로 설정했습니다. 앱에서 워커와 통신하기 위해 몇 가지 간단한 로직을 설정했습니다:

우리의 Worker 모듈은 메인 스레드로부터 메시지를 수신하고, 비용이 많이 드는 계산을 수행한 후 결과를 메인 스레드로 응답하는 리스너 역할을 합니다:

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

우리가 기대하는 대로 작동합니다. 고객이 계산을 요청한 다음 나중에 결과를 받아 doSomethingWithResult를 수행할 수 있습니다. 그러나 이 솔루션은 expensiveComputation을 수행할 위치에 제한을 가합니다. 우리는 요청을 하고 응답을 동일한 위치에서 사용할 수 없습니다. 이것은 외부 라이브러리 코드나 비동기 함수의 중간과 같은 우리가 제어력이 부족한 컨텍스트에서 해당 기능을 사용하려고 할 때 도전이 될 수 있습니다. "이 데이터가 필요하고 여기서 기다리겠다"라고 말할 수 있다면 좋을텐데요.

Sync Bridge가 나타났습니다.

## Sync Bridge

이벤트 스트림을 "동기적" 방식으로 사용하려면 인터페이스를 Promise를 사용하는 방식으로 변환해야 합니다. 즉, Sync Bridge가 필요합니다. 이벤트 기반 API를 Promise 기반 API로 변환하는 과정은 몇 가지 단계로 나눌 수 있습니다:

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

- 클라이언트에서 메시지를 보내기 전에 요청자를 고유하게 식별할 수 있는 ID나 방법을 메시지에 첨부하십시오. 이것이 우리의 "회신 주소"입니다.
- "빈" Promise를 만들고 이 Promise와 연결된 해결 및 거부 콜백에 메시지의 ID를 연결하여 보류 중인 데이터 구조에 저장하십시오. Map을 사용하는 것이 좋습니다.
- Promise를 요청자에게 반환하고 메시지를 보냅니다.
- 호스트에서 클라이언트 메시지를 구독하십시오. ID를 가진 메시지를 받으면 보통대로 처리하되, 응답 메시지에 동일한 ID를 포함하십시오.
- 클라이언트에서 호스트 메시지를 구독하십시오. ID를 가진 메시지가 수신되면 해당 ID에 대해 보류 중인 Promise가 있는지 확인하십시오. 해당 Promise를 데이터 구조에서 빼내어 호스트 메시지의 내용에 따라 적절히 해결하거나 거부하십시오.

여기서 "클라이언트"와 "호스트"는 메시지 전달에 참여하는 모든 엔티티가 될 수 있습니다. 때로는 클라이언트가 호스트로 작용하거나 그 반대로 작용할 수 있으므로, 사용되는 문맥에 따라 이러한 엔티티를 "요청자"와 "응답자"로도 참조할 수 있습니다.

우리는 클라이언트와 호스트 간의 계약을 체결하여 EDA의 제한을 극복할 수 있습니다. 요청과 해당 응답 메시지에 공통적이고 고유한 ID를 표시하는 것에 동의함으로써, 응답을 올바른 요청자에게 "라우팅"할 수 있습니다. 우리는 요청 측에 약속을 열어 놓아 메시지를 받았을 때 기다리고 있는 메시지에 실제 데이터를 채워넣습니다.

우리가 이를 이전에 다룬 웹 워커 예제에 적용해 보기 위해, 위에 나열된 프로세스를 추상화하는 도우미 클래스를 작성해 보겠습니다. 메시지에 ID를 할당하고 보류 중인 요청을 추적하고 응답을 청취하는 클라이언트 추상화가 필요할 것입니다. 이를 WorkerClient라고 부르겠습니다 :

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

호스트 쪽에서는, 우리가 관심 없는 메시지를 걸러내고 어떤 작업을 수행하며, 요청자의 "반송 주소"로 메시지를 다시 보내는 컨트롤러가 필요할 것입니다. 일종의 프록시 메시지 핸들러, 그렇게 해주는 것이 WorkerHost입니다.

이러한 도우미들을 사용하여 새로운 Promise 기반 API를 사용하도록 애플리케이션 코드를 다시 작성할 것입니다. 이제 클릭 핸들러에서 데이터를 직접 기다릴 수 있다는 점에 유의해 주세요.

우리의 워커도 비슷해 보이지만, 핸들러가 메시지를 게시하는 대신 값만 반환한다는 점이 다릅니다 (메시지 전달은 이미 처리되었습니다).

자, 상당량의 코드를 작성했습니다. 정확히 어떤 이득을 얻었을까요?

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

신크 브릿지 어댑터는 실제로 미래에 어떤 메시지를 받을 것을 기대하는 것을 약속으로 변환합니다. 이를 통해 원격 컨텍스트에서 데이터와 코드를 로컬처럼 처리할 수 있습니다. 무엇보다도, 동일한 위치에서 원격 데이터를 요청하고 사용할 수 있게 해줍니다. 데이터베이스 트랜잭션 가운데서 비싼 계산을 해야 하거나 임의 이벤트 핸들러에서, 심지어 다른 이벤트 스트림의 메시지 핸들러에서도 그냥 전화를 해서 처리할 수 있습니다.

또한 이제 다른 유형의 메시지를 이산 채널에 제한하여 메시지 처리를 구체적이고 빠르게 유지하고 코드를 필요한 곳에만 로컬라이징할 수 있습니다. 원한다면 여러 WorkerClient 객체가 동일한 채널을 공유할 수도 있습니다.

이 패턴은 대부분의 이벤트 주도 시스템으로 쉽게 일반화될 수 있습니다. 예제의 helpers를 수정해서 자체 Worker를 구성하는 대신 어떤 EventTarget을 가져오도록 만들어 임의의 메시지 스트림에 대한 일반적이고 동기적인 인터페이스를 제공할 수 있습니다. 또는 figments와 같이 특정 인터페이스에 대한 래퍼 라이브러리를 작성할 수도 있습니다. 최근에 Figma 플러그인 API의 이벤트 주도 부분을 "브릿지"한 래퍼 세트인 figments와 같이 말입니다.

## 실제 세계에서

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

이벤트 주도 시스템에서 작업할 때 "이벤트로 생각하는 것"이 가장 좋지만, 때로는 탈출구가 필요할 수 있습니다. Sync Bridge는 여기 유용한 도구가 될 수 있지만, 구현하기 전에 이 접근 방식이 필요한지 고려해보세요. 대부분의 경우에는 이벤트 처리가 그냥 작동합니다.

오늘 하루 즐겁고 유익한 일들 가득하길 바라요!

```js
추가 정보 & 자료
---------------------------

이 기사의 예시 코드
• rektdeckard/promisize

EDA에 대한 더 많은 정보
• 이벤트 주도 API – 원리 이해하기
• 이벤트 주도 아키텍처가 뭐죠?

async/await 및 Promises에 대한 깊은 논의
• 이벤트 루프는 대체 뭐죠?
• Loupe
• sindresorhus/promise-fun
```

```js
나와 내가 하는 일
-----------------

• 트위터
• GitHub
• Phosphor 아이콘
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

표 태그를 Markdown 포맷으로 변경해주세요.
