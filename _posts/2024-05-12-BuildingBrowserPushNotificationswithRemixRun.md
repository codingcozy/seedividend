---
title: "Remix Run으로 브라우저 푸시 알림 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-BuildingBrowserPushNotificationswithRemixRun_0.png"
date: 2024-05-12 20:35
ogImage: 
  url: /assets/img/2024-05-12-BuildingBrowserPushNotificationswithRemixRun_0.png
tag: Tech
originalTitle: "Building Browser Push Notifications🔔 with Remix Run💿"
link: "https://medium.com/@kirankumal714/building-browser-push-notifications-with-remix-run-21803e96e4f7"
---


<img src="/assets/img/2024-05-12-BuildingBrowserPushNotificationswithRemixRun_0.png" />

## 소개

오늘날의 디지털 환경에서 사용자 참여는 웹 애플리케이션의 성공에 있어 매우 중요합니다. 사용자 참여를 향상시키기 위한 개발자의 강력한 도구 중 하나는 브라우저 푸시 알림입니다. 이러한 알림은 사용자가 애플리케이션을 활동적으로 사용하지 않을 때에도 웹 애플리케이션에서 적시적이고 관련성 있는 업데이트를 제공할 수 있습니다.

푸시 알림을 구현하는 기술적 세부 사항에 대해 깊이 파고들기 전에, 푸시 알림을 전반적으로 이해해 보겠습니다. 이 전반적인 과정을 이해하면 우리가 탐구할 각 구성 요소에 대한 유용한 맥락을 제공할 것입니다.



## 푸시 알림의 세 가지 주요 단계:

- 클라이언트 측 구독 로직: 이 단계는 사용자가 푸시 알림을 구독할 수 있도록 JavaScript 코드와 UI 요소를 구현하는 것을 포함합니다. 사용자가 수락하면 브라우저가 알림을 전달하는 데 중요한 고유한 키 및 엔드포인트을 생성합니다.
- 푸시 메시지를 위한 백엔드 API 호출: 사용자 구독 후, 백엔드는 사용자의 장치로 푸시 메시지를 보내야 합니다. 이 작업을 처리하기 위해 API 엔드포인트를 생성하고, 인증 및 구독 세부 사항에 따라 알림을 전달하는 역할을 합니다.
- 푸시 이벤트 처리를 위한 서비스 워커: 푸시 알림이 도착하면 서비스 워커(백그라운드 JavaScript 파일)가 중간에 개입합니다. 이 작업은 사용자에게 알림을 표시하거나 알림 내용에 따라 작업을 실행하는 사용자 지정 로직을 트리거합니다.

설치

Remix Run을 사용하여 프로젝트를 설정하여 프론트엔드 및 백엔드 능력을 통합하는 풀스택 개발 경험을 제공하는 새 프로젝트를 시작해 보겠습니다. Remix Run은 현대적인 웹 애플리케이션을 구축하기에 최적의 선택지가 될 수 있도록 프론트엔드 및 백엔드 능력을 원활하게 통합합니다. 이 프로젝트에 필요한 모든 종속성은 package.json 파일에서 찾을 수 있습니다.



package.json

웹 애플리케이션에서 푸시 알림을 활성화하는 책임을 지는 public 폴더 안의 서비스 워커 파일을 만들어봅시다. 이 파일은 활성화되면 푸시 알림에 구독하고 구독 세부 정보를 서버에 저장합니다. 푸시 알림을 받으면 사용자에게 알림을 표시합니다. 또한, base64 문자열을 Uint8Array로 변환하는 유틸리티 함수가 포함되어 있어 VAPID 인증으로 구독할 때 사용할 수 있습니다.

sw.js

서비스 워커 파일을 등록해야 합니다. entry.client.tsx 파일 끝에 다음 코드를 추가해주세요.



```js
/**
 * 페이지가 로드되면 등록할 것입니다
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
```

Remix의 기능을 활용하여 리소스 라우트를 사용하는 API를 만들어 봅시다. routes 폴더 안에 "notification-subscription"이라는 새 디렉토리를 만들고, 이 디렉토리 안에 route.tsx와 subscription.server.ts 두 개의 파일을 생성하세요.

subscription.server.ts

웹 푸시는 백엔드에서 트리거된 푸시 메시지가 웹 푸시 프로토콜을 통해 이루어져야 하며, 푸시 메시지와 함께 데이터를 전송하려면 해당 데이터를 웹 푸시 메시지 암호화 명세에 따라 암호화해야 합니다.




web-push는 메시지를 보내거나 GCM에 의존하는 브라우저에 대한 레거시 지원을 처리하는 데 도움이 됩니다.

route.tsx

- loader: 이 함수는 GET 요청이 발생하면 호출됩니다. 구독 API.sendSubscription()을 비동기적으로 호출하여 구독한 사용자에게 푸시 알림을 보냅니다.
- action: 이 함수는 라우트로 POST 요청이 발생하면 호출됩니다. 요청에서 받은 푸시 알림 구독을 저장하기 위해 SubscriptionAPI.saveSubscriptions('request')를 비동기적으로 호출합니다.

root.tsx



`requestPermission()`: 브라우저 알림 표시를 위한 권한을 요청합니다. 먼저 브라우저가 알림을 지원하는지 확인한 후 사용자에게 권한을 요청합니다. 권한이 거부되면 에러가 발생합니다.

이제 알림을 표시해 보겠습니다. 단순하게 버튼을 클릭할 때 알림을 보여주는 방식으로 진행하겠습니다.

```js
<button onClick={() => {
    fecher.submit({}, {method: "GET", action: "/notification-subscription"})
  }}>
  Show Notifications
</button>
```

버튼을 클릭하면 사용자 브라우저에 알림이 나타납니다. 요약하자면, 알림 기능은 실시간 업데이트와 알림을 통해 사용자 경험을 향상시키며 웹 애플리케이션과 상호작용을 증진시킵니다.



완성된 코드를 보려면 저장소를 방문해주세요.

읽어 주셔서 감사합니다🤞

## 참고

https://web.dev/articles/push-notifications-how-push-works



https://developer.mozilla.org/ko/docs/Web/API/Push_API