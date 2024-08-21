---
title: "Firebase와 Nodejs를 사용한 푸시 알림 설정 방법"
description: ""
coverImage: "/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_0.png"
date: 2024-06-22 13:59
ogImage:
  url: /assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_0.png
tag: Tech
originalTitle: "P ush Notification using firebase and node-js."
link: "https://medium.com/@Bisal.r/push-notification-using-firebase-and-node-js-7508f61fa25c"
isUpdated: true
---

## 이 설명서는 Firebase Admin SDK를 사용하여 Node.js 애플리케이션에 Firebase Cloud Messaging (FCM) 푸시 알림을 구현하는 단계별 가이드를 제공합니다.

Firebase 푸시 알림을 찾느라 지쳤다면, 여기에서 간단하게 구현하는 방법을 설명했습니다! (딥 링킹 포함!)

# 준비 사항:-

시작하기 전에 다음 사항을 준비해야 합니다:

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

- Firebase 콘솔 (https://console.firebase.google.com)에서 생성된 Firebase 프로젝트.
- 개발 컴퓨터에 Node.js가 설치되어 있어야 합니다 (https://nodejs.org).

# 단계 1: 종속 항목 설치

Node.js 애플리케이션에서 푸시 알림을 보내려면 Firebase Admin SDK가 필요합니다.

다음 명령어를 사용하여 설치하세요: "npm install firebase-admin"

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

# 단계 2: Firebase Admin SDK 설정하기

- Firebase 콘솔로 이동하여 프로젝트를 선택하고 프로젝트 설정으로 이동합니다.
- "서비스 계정" 탭에서 "새 개인 키 생성"을 클릭합니다. 이렇게 하면 서비스 계정 자격 증명이 포함된 JSON 파일이 다운로드됩니다. 이 파일을 안전하게 보관하세요.
- Node.js 애플리케이션에서 다운로드한 서비스 계정 키를 사용하여 Firebase Admin SDK를 초기화합니다:

![이미지1](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_0.png)

![이미지2](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_1.png)

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

알림 유형:-

![push notification using firebase and node-js](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_2.png)

알림 카테고리:-

![push notification using firebase and node-js](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_3.png)

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

파이어베이스 클라우드 메시징(FCM)에서는 Firebase Cloud Messaging 토큰(일반적으로 "등록 토큰"으로 불리는)이 중요한 역할을 합니다. 이 토큰은 특정 기기 또는 사용자와 관련된 고유 식별자로, 애플리케이션에서 푸시 알림을 올바른 수신자에게 라우팅하는 데 사용됩니다. 아래에서 이 역할과 어디서 토큰을 얻을 수 있는지 살펴보겠습니다:

Firebase Cloud Messaging 토큰의 역할:

- 기기 식별: FCM에 의해 모바일 애플리케이션을 실행하는 각 기기에 고유한 등록 토큰이 할당됩니다. 이 토큰은 FCM 인프라 내에서 기기를 식별합니다.
- 수신자 주소: 특정 기기나 사용자에게 푸시 알림을 보내고 싶을 때, 해당 등록 토큰을 사용하여 주소로 설정합니다. 이를 통해 알림이 의도한 수신자에게 도달할 수 있습니다.
- 구독 관리: 등록 토큰을 사용하여 특정 주제나 그룹에 대한 기기를 구독하거나 구독 취소할 수 있습니다. 이를 통해 특정 관심사나 특성을 가진 기기 그룹에 알림을 보낼 수 있습니다.

Firebase Cloud Messaging 토큰을 얻는 곳:

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

Firebase Cloud Messaging 토큰은 일반적으로 클라이언트 측(즉, 모바일 앱 내)에서 얻어지고, 이후 서버로 전송되어 저장 및 메시지 라우팅에 사용됩니다. 아래는 토큰을 얻는 방법입니다:

프론트엔드 Android 팀에서 디바이스 Firebase 토큰을 제공하므로 해당 토큰을 데이터베이스의 사용자 컬렉션에 저장해야 합니다.

이제 사용자의 Firebase 토큰을 가져와야 합니다:

![이미지](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_4.png)

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

제가 meta-Data Replacer 라는 폴더를 만들었어요. 거기에 사용자 정의 메시지를 설정하고 해당 기능을 호출하고 사용자 정의 동적 메시지를 설정할 수 있어요.

비즈니스 로직:-

![image 1](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_5.png)

![image 2](/assets/img/2024-06-22-PushNotificationusingfirebaseandnode-js_6.png)

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

# 결론

축하합니다! Node.js 애플리케이션에 Firebase 푸시 알림을 성공적으로 구현하셨습니다. 이제 이 지식을 활용하여 애플리케이션 내에서 다양한 트리거와 이벤트에 기반한 사용자에게 알림을 보낼 수 있습니다. 더 많은 고급 기능 및 사용자 정의를 원하신다면 Firebase 문서 (https://firebase.google.com/docs/cloud-messaging)를 참고해보세요.
