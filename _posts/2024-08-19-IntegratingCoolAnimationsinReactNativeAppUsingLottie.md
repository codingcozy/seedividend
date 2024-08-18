---
title: "로티Lottie를 이용하여 React Native 앱에 멋진 애니메이션 통합하기"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-08-19 03:32
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Integrating Cool Animations in React Native App Using Lottie"
link: "https://medium.com/@mdshibi/integrating-cool-animations-in-react-native-app-using-lottie-da8e7cb51e54"
isUpdated: false
---



![animation](https://miro.medium.com/v2/resize:fit:1400/1*qZMz2abxuSdvi6YQOFkLVg.gif)

애니메이션은 앱을 더 매력적이고 상호작용적으로 만들어 사용자 경험을 현저히 향상시킬 수 있습니다. Lottie는 React Native 앱에 고품질 애니메이션을 쉽게 추가할 수 있게 해주는 인기 있는 애니메이션 라이브러리입니다. 이 라이브러리를 사용하면 Adobe After Effects에서 생성한 애니메이션을 Bodymovin 플러그인을 사용해 JSON 파일로 내보낼 수 있습니다. 이 글에서는 React Native 프로젝트에 Lottie 애니메이션을 통합하는 단계를 안내하겠습니다.

## 전제 조건

시작하기 전에 다음을 준비하세요:


<div class="content-ad"></div>

- React Native 프로젝트 설정 완료 (React Native CLI 또는 Expo).
- Node.js 및 npm / yarn이 설치되어 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*BtxcP1FXbunIiVvwMkxllA.gif)

## 단계 1: Lottie 라이브러리 설치

React Native에서 Lottie를 시작하려면 lottie-react-native 및 lottie-ios 패키지를 설치해야 합니다.

<div class="content-ad"></div>

로티 패키지를 설치해보세요:

만약 React Native CLI를 사용 중이라면, 다음 명령어를 실행해보세요:

```js
yarn add lottie-react-native lottie-ios@latest
```

또는, 만약 npm을 사용 중이라면:

<div class="content-ad"></div>

```js
npm install lottie-react-native lottie-ios@latest
```

원시 모듈 연결하기 (React Native CLI):

React Native CLI 프로젝트의 경우, 프로젝트에 Lottie 패키지를 연결해야 할 수 있습니다:

```js
npx pod-install
```

<div class="content-ad"></div>

이제 Markdown 형식으로 테이블 태그를 변경하겠습니다.

<div class="content-ad"></div>

LottieView를 가져와보세요:

React Native 컴포넌트 파일에 LottieView 컴포넌트를 가져오세요:

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
```

로티 애니메이션을 불러와보세요:

<div class="content-ad"></div>

로티 애니메이션을 불러오려면 JSON 파일을 로컬 또는 URL에서 제공하면 됩니다.

로컬 JSON 파일:

프로젝트 디렉토리에 애니메이션 JSON 파일(e.g., animation.json)을 넣고 다음과 같이 불러올 수 있습니다:

```js
const App = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./path/to/animation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

<div class="content-ad"></div>

원격 JSON 파일:

애니메이션을 원격 URL에서 로드하고 싶다면 URL을 source 속성에 직접 전달할 수 있어요:

```js
const App = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={{ uri: 'https://example.com/path/to/animation.json' }}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

LottieView 사용자 정의:

<div class="content-ad"></div>

로티뷰 컴포넌트에는 애니메이션을 사용자 지정하는 여러 프롭스가 있습니다:

- autoPlay: 컴포넌트가 렌더링될 때 애니메이션을 자동으로 시작합니다.
- loop: 애니메이션을 무한히 반복합니다.
- speed: 애니메이션의 속도를 제어합니다.
- progress: 애니메이션의 현재 진행 상황을 설정합니다 (다른 작업과 동기화하는 데 유용함).
- onAnimationFinish: 애니메이션이 끝날 때 호출되는 콜백 함수입니다 (애니메이션이 끝난 후 작업을 트리거하는 데 유용함).

다음은 이러한 프롭스를 사용한 예제입니다:

```js
const App = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./path/to/animation.json')}
        autoPlay
        loop={false}
        speed={1.5}
        onAnimationFinish={() => {
          console.log('Animation Finished');
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

<div class="content-ad"></div>

## 단계 3: 애니메이션 테스트

컴포넌트에 LottieView를 추가한 후 앱을 실행하여 애니메이션을 확인하세요.

- 안드로이드의 경우: npx react-native run-android
- iOS의 경우: npx react-native run-ios

모든 것이 올바르게 설정되었다면, 앱 내에서 Lottie 애니메이션이 재생되는 것을 확인할 수 있어야 합니다.

<div class="content-ad"></div>

## 결론

React Native에서 Lottie 애니메이션을 통합하면 앱을 아름답고 부드러운 애니메이션으로 향상시킬 수 있습니다. 더불어 높은 성능을 유지할 수 있습니다. Lottie를 사용하면 앱을 보다 상호작용적이고 시각적으로 매력적으로 만들 수 있는 매력적인 애니메이션을 쉽게 추가할 수 있습니다.

더 복잡한 애니메이션이나 고급 사용 사례를 위해 lottie-react-native 패키지가 제공하는 모든 옵션을 탐색할 수 있습니다. 귀하의 프로젝트에서 사용할 수 있는 무료 애니메이션의 광대한 라이브러리를 확인하려면 공식 Lottie 문서와 LottieFiles 웹 사이트를 확인해보세요.