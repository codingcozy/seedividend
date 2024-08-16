---
title: "당신의 안드로이드 앱을 안드로이드 14 API 레벨 34로 마이그레이션하는 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-08-04-AComprehensiveGuidetoMigratingYourAndroidApptoAndroid14APILevel34_0.png"
date: 2024-08-04 19:13
ogImage: 
  url: /assets/img/2024-08-04-AComprehensiveGuidetoMigratingYourAndroidApptoAndroid14APILevel34_0.png
tag: Tech
originalTitle: "A Comprehensive Guide to Migrating Your Android App to Android 14 API Level 34"
link: "https://medium.com/@riteshmaagadh/a-comprehensive-guide-to-migrating-your-android-app-to-android-14-api-level-34-a9e6c5c6fe90"
isUpdated: true
---




안녕하세요 독자 여러분, 이 글에서는 안드로이드 앱을 안드로이드 14 (API 레벨 34)로 이주하는 방법을 쉽게 안내해 드릴 것입니다. 그냥 글을 따라오세요. 시작해봅시다...

![이미지](/assets/img/2024-08-04-AComprehensiveGuidetoMigratingYourAndroidApptoAndroid14APILevel34_0.png)

먼저, compileSdk 및 targetSdk를 34로 변경하고 파일 -'Gradle 파일 동기화'로 이동합시다.

![이미지](/assets/img/2024-08-04-AComprehensiveGuidetoMigratingYourAndroidApptoAndroid14APILevel34_1.png)

<div class="content-ad"></div>

알겠어요!

이제 안드로이드 14나 그 이후 버전에서 앱 실행에 영향을 줄 수 있는 동작 변경 목록을 살펴볼게요.

# 안드로이드 14 이상의 변경 사항:

## 포그라운드 서비스 유형은 필수입니다

<div class="content-ad"></div>

프로젝트에서 전경 서비스를 사용 중이라면 AndroidManifest.xml의 서비스 선언에서 android:foregroundServiceType을 반드시 지정해야 합니다.

![Foreground Service Types](/assets/img/2024-08-04-AComprehensiveGuidetoMigratingYourAndroidApptoAndroid14APILevel34_2.png)

사용 가능한 foregroundServiceType은 camera, connectedDevice, dataSync, health, location, mediaPlayback, mediaProjection, microphone, phoneCall, remoteMessaging, shortService, specialUse, systemExempted입니다.

foregroundServiceType에 대해 더 알아보려면 여기를 클릭하세요.

<div class="content-ad"></div>

## AndroidManifest.xml에 BLUETOOTH_CONNECT 권한

프로젝트에서 Bluetooth 서비스를 사용 중이시라면 AndroidManifest.xml에 BLUETOOTH_CONNECT 권한을 추가해야 합니다.

```js
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```

## JobScheduler는 콜백과 네트워크 동작을 강화합니다.

<div class="content-ad"></div>

만약 앱이 Android 14(API 레벨 34) 이상을 대상으로 하고 onStartJob 및 onStopJob의 부여된 시간을 초과하면 ANR이 발생합니다.

JobScheduler에서 setRequiredNetworkType 또는 setRequiredNetwork 제약 조건을 사용 중이라면 AndroidManifest.xml에 ACCESS_NETWORK_STATE 권한을 명시해야 합니다. 그렇지 않으면 SecurityException이 발생합니다.

비동기 처리를 제공하는 WorkManager로 이전하세요.

## 전체 화면 인텐트 알림을 안전하게 보호하세요

<div class="content-ad"></div>

안녕하세요! Android 11(API 레벨 30)부터 휴대폰 잠금 상태에서 전체 화면 인텐트를 보내기 위해 Notification.Builder.setFullScreenIntent를 사용하고 있었어요. AndroidManifest.xml에 USE_FULL_SCREEN_INTENT 권한을 선언하여 앱 설치 시 자동으로 부여할 수 있었지만, 이제 사용자가 앱 설정에서 이 권한을 끌 수 있어요.

NotificationManager.canUseFullScreenIntent을 사용하여 앱이 전체 화면 인텐트를 표시할 권한이 있는지 확인할 수 있어요. 권한이 없으면 사용자가 권한을 부여할 수 있는 설정 페이지를 실행할 수 있는 새로운 인텐트 ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT를 사용할 수 있어요.

## 암시적 및 대기 중 인텐트에 대한 제약

Android 14부터는 Android 14를 대상으로 할 때 목적지의 패키지 이름을 주어 명시적인 인텐트를 만들어야 해요. 그렇지 않으면 예외가 발생할 거에요.

언제든지 더 물어보세요!

<div class="content-ad"></div>

```kotlin
val explicitIntent = Intent("com.example.action.APP_ACTION")
explicitIntent.apply {
    package = context.packageName
}
context.startActivity(explicitIntent)
```

## 런타임으로 등록된 브로드캐스트 수신기는 내보내기 동작을 명시해야 합니다.

컨텍스트로 등록된 수신기를 사용하는 경우, 장치의 다른 모든 앱에 내보낼지 여부를 나타내는 플래그를 지정해야 합니다: RECEIVER_EXPORTED 또는 RECEIVER_NOT_EXPORTED 중 하나를 선택하십시오.

Android 14의 이주 가이드 및 중요한 변경 사항은 여기까지입니다.

<div class="content-ad"></div>

즐거운 코딩하세요!