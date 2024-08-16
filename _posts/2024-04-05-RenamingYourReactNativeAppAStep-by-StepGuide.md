---
title: "리액트 네이티브 앱 이름 변경하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Renaming Your React Native App A Step-by-Step Guide"
link: "https://medium.com/stackademic/renaming-your-react-native-app-a-step-by-step-guide-3709a074aa39"
isUpdated: true
---





<img src="/assets/img/RenamingYourReactNativeAppAStep-by-StepGuide_0.png" />

만약 React Native 앱의 이름을 바꿔야 할 필요가 있다면, 브랜드 변경이나 프로젝트 초점 변경으로 인한 경우든 상황은 다를지 모릅니다. 기존의 React Native 앱의 이름을 변경하는 것은 몇 단계를 거쳐 이루어지며, 본 안내서에서는 이를 수동으로 진행해 보겠습니다. 이 단계를 따라가면 외부 패키지에 의존하지 않고도 원활한 전환을 보장할 수 있습니다.

# 단계 1: package.json 업데이트

첫 번째 단계는 package.json 파일을 열고 name 필드를 찾는 것입니다. 이 필드는 앱의 고유 식별자로 작동합니다. 현재의 이름을 원하는 새 이름으로 바꾸어 주십시오.

<div class="content-ad"></div>

```json
{
  "name": "newAppName"
  // other fields...
}
```

## 단계 2: app.json 파일에서 앱 표시 이름 업데이트

app.json 파일에서 displayName 필드를 찾으세요. 이 필드는 기기에 설치된 앱의 표시 이름을 나타냅니다. 새 앱 이름으로 업데이트하십시오.

```json
{
  "name": "newAppName",
  "displayName": "새 앱 이름"
}
```

<div class="content-ad"></div>

# 단계 3: AndroidManifest.xml 업데이트

Android를 위해서는 android/app/src/main/AndroidManifest.xml을 열고 패키지 속성을 찾으세요. 새 앱 이름과 일치하도록 업데이트해주세요.

```js
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  package="com.newAppName">
```

# 단계 4: Info.plist에서 iOS 번들 식별자 업데이트

<div class="content-ad"></div>

iOS의 경우, ios/`newAppName`/Info.plist 파일로 이동하여 CFBundleIdentifier를 찾으세요. 새 앱 이름과 일치하도록 업데이트하세요.

```js
<key>CFBundleIdentifier</key>
<string>com.newAppName</string>
```

# 단계 5: 정리 및 재빌드

프로젝트를 정리하는 것은 변경 사항을 효과적으로 적용하는 데 중요합니다. 안드로이드의 경우 다음 명령을 실행하세요.

<div class="content-ad"></div>

```js
cd android && ./gradlew clean
cd ..
```

iOS 경우, Xcode에서 ios 디렉토리를 열고 프로젝트를 정리하세요.

# 단계 6: 앱 참조 업데이트

코드베이스에서 이전 앱 이름을 새로운 이름으로 수동으로 검색하고 대체하세요. 이 단계는 런타임 문제를 방지하기 위해 중요합니다.

<div class="content-ad"></div>

# 단계 7: 변경 내용 확인

마지막으로 앱을 실행하여 모든 것이 올바르게 작동하는지 확인하십시오. 다음 명령어를 사용하십시오:

```js
npx react-native run-android
```

```js
npx react-native run-ios
```

<div class="content-ad"></div>

이 단계를 따라서 React Native 앱의 이름을 성공적으로 바꾸셨군요. 수동으로 진행하는 이 방법은 프로젝트에 가한 변경 사항을 제어하고 이해할 수 있도록 도와줍니다. 이름을 변경하는 과정을 추적하기 위해 버전 관리에 변경 사항을 커밋하는 것을 기억해 주세요.

제가 제시한 이 가이드가 React Native 앱의 이름을 수동으로 변경하는 과정을 탐험하는 데 도움이 되었으면 좋겠어요. 궁금한 점이나 문제가 발생하면 언제든지 문의해 주세요. 즐거운 코딩하세요!

- 👏 스토리에 박수를 보내고 저자를 팔로우하세요
- 저자의 통찰력 있는 컨텐츠에 감사의 표시를 해주세요.
- Abhishek Kumar를 팔로우하세요.
- 📰 Abhishek Kumar 발행물을 더 살펴보세요
- 🔔 소셜 미디어로 연결유지하세요
- Level Up Coding을 트위터에서 팔로우하고 LinkedIn에서 연결하여 최신 토론과 콘텐츠를 업데이트하세요.

# Stackademic

<div class="content-ad"></div>

마지막까지 읽어 주셔서 감사합니다. 이렇게 줄 글 남겨주셔서 감사합니다!

- 작가를 클랩하고 팔로우할 것을 고려해 주세요! 👏
- 트위터(X), 링크드인, 유튜브에서 팔로우해주세요.
- 전세계에서 무료 프로그래밍 교육을 민주화하는 방법에 대해 더 알아보려면 Stackademic.com을 방문해 주세요.
