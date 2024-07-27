---
title: "안드로이드 개발에서 ActivityNotFoundException 해결하는 방법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-12 21:50
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Resolving ActivityNotFoundException in Android Development"
link: "https://medium.com/@kasata/resolving-activitynotfoundexception-in-android-development-a1fdc622eb9b"
---


## 소개

Android 개발 중 ActivityNotFoundException을 만나는 것은 흔한 일이 아닙니다. 이 예외는 Intent가 시작될 때 시스템이 요청을 처리할 활동을 찾지 못했을 때 발생합니다. 이 글에서는 이 예외의 원인을 탐구하고 해결 방안을 상세히 제공할 것입니다.

## ActivityNotFoundException 이해하기

ActivityNotFoundException은 Intent를 사용하여 활동을 시작하려고 할 때 제공된 Intent 필터와 일치하는 활동이 없을 때 발생하는 런타임 예외입니다. 일반적인 이유는 다음과 같습니다:

<div class="content-ad"></div>

- 잘못된 Intent 작업 또는 범주: 지정한 작업 또는 범주가 기기의 모든 활동에서 지원되지 않을 수 있습니다.
- 잘못 구성된 AndroidManifest.xml: 대상 활동이 AndroidManifest.xml 파일에 올바르게 선언되지 않았을 수 있습니다.
- 누락된 권한: 때로는 Intent가 부여되지 않거나 선언되지 않은 권한을 필요로 할 수 있습니다.

## 일반적인 시나리오 및 해결책

## 시나리오 1: 잘못된 Intent 작업 또는 범주

이 예외를 만나는 가장 일반적인 이유 중 하나는 Intent에 대한 잘못된 작업 또는 범주를 지정하는 것입니다. 예를 들어:

<div class="content-ad"></div>

```js
// 잘못된 액션 이름
Intent intent = new Intent("com.example.NON_EXISTENT_ACTION");
startActivity(intent);
```

이 문제를 해결하려면 대상 액티비티에서 선언된 액션과 일치하는 올바른 액션 문자열을 사용하는지 확인하십시오. 예를 들어:

```js
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.example.com"));
startActivity(intent);
```

## 시나리오 2: AndroidManifest.xml 구성 오류

<div class="content-ad"></div>

다른 흔한 문제는 AndroidManifest.xml에서 대상 활동을 올바르게 선언하지 않는 경우입니다. 해당 활동이 올바른 인텐트 필터로 선언되었는지 확인해주세요. 예를 들면:

```js
<activity android:name=".TargetActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

패키지 이름과 활동 이름이 올바르게 지정되어 있는지 확인해주세요.

## 시나리오 3: 권한 누락

<div class="content-ad"></div>

가끔은 필요한 권한이 없어서 예외가 발생할 수 있습니다. 예를 들어, 이메일을 보내려고 할 때:

```js
Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("mailto","test@example.com", null));
startActivity(emailIntent);
```

AndroidManifest.xml 파일에 필요한 권한을 선언했는지 확인하세요:

```js
<uses-permission android:name="android.permission.INTERNET" />
```

<div class="content-ad"></div>

## 최상의 실천 방법

## 항상 가능한 활동 확인하기

활동을 시작하기 전에, 인텐트를 처리할 수 있는 활동이 있는지 확인하는 것이 좋습니다. 다음 메소드를 사용하여 확인하세요: 

```js
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.example.com"));
if (intent.resolveActivity(getPackageManager()) != null) {
    startActivity(intent);
} else {
    // 인텐트를 처리할 수 있는 활동이 없는 경우 처리
}
```

<div class="content-ad"></div>

## 예외 처리

예외를 정상적으로 처리하는 것이 좋은 습관입니다:

```js
try {
    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.example.com"));
    startActivity(intent);
} catch (ActivityNotFoundException e) {
    // 사용자 친화적인 메시지를 표시하거나 예외를 로깅합니다
}
```

## 결론

<div class="content-ad"></div>

안드로이드 개발 중 ActivityNotFoundException을 만나면 의도와 해당 활동을 정의하는 데 더 자세한 주의가 필요한 신호입니다. 의도 작업 및 카테고리를 주의 깊게 지정하고 AndroidManifest.xml에서 활동을 올바르게 선언하며 필요한 권한을 선언하고 최선의 방법을 구현하여, 개발자는 이 예외를 피하고 원활한 사용자 경험을 제공할 수 있습니다.

좋은 코딩 되세요!