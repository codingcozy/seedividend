---
title: "React Native에서 lazy loading으로 성능 개선하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# React Native에서 lazy loading으로 성능 개선하는 방법

<img src="/assets/img/Boosting-React-Native-Performance-with-Lazy-Loading-and-Code-Splitting_0.png" />

<div class="content-ad"></div>

# 소개:

모바일 앱 개발에서 사용자 경험은 매우 중요합니다. 사용자는 플랫폼에 상관없이 앱이 빠르고 반응적이기를 기대합니다. React Native는 크로스 플랫폼 모바일 애플리케이션을 개발하기 위한 인기 있는 프레임워크인데, 성능 최적화는 개발의 중요한 측면입니다. Lazy loading 및 코드 분할은 React Native 앱의 성능을 signficantly 향상시킬 수 있는 두 가지 강력한 기술입니다.

# Lazy Loading 및 코드 분할이란 무엇인가요?

React Native에서 이러한 기술을 어떻게 구현하는지 알아보기 전에, lazy loading과 코드 분할이 무엇인지 명확히 이해해야 합니다.

<div class="content-ad"></div>

# Lazy Loading:

Lazy loading은 필요할 때까지 특정 리소스(예: 컴포넌트, 모듈 또는 이미지)의 로드를 지연시키는 전략입니다. 이 접근 방식은 초기 앱 시작 시 필수 구성 요소만 로드하기 때문에 앱의 초기 로드 시간을 줄입니다. 추가 구성 요소는 사용자가 앱과 상호 작용하는 동안 로드됩니다.

# 코드 분할:

코드 분할은 JavaScript 코드를 더 작고 관리하기 쉬운 청크로 분할할 수 있는 기술입니다. 앱 전체를 단일 JavaScript 파일로 번들하는 대신에 여러 작은 파일 또는 청크로 나눕니다. 이러한 청크는 필요할 때 로드되어 앱의 초기 로드 시간과 전반적인 성능을 향상시킵니다.

이제 개념을 이해했으니, React Native 애플리케이션에서 lazy loading과 코드 분할을 어떻게 구현하는지 살펴보겠습니다.

# React Native에서 Lazy Loading 및 코드 분할 구현

<div class="content-ad"></div>

## 단계 1: React Native 프로젝트 설정

Expo 또는 React Native CLI를 사용하여 새 React Native 프로젝트를 설정합니다. 이 예제에서는 React Native CLI를 사용한다고 가정합니다.

```js
npx react-native init CodeSplittingExample
cd CodeSplittingExample
```

## 단계 2: React Navigation 설치

React Navigation을 사용하여 네비게이션 및 lazy loading을 구현합니다. 다음 명령어로 설치합니다.

```js
npm install react-navigation react-navigation-stack
```

<div class="content-ad"></div>

## 단계 3: 스크린 생성

이 예에서는 홈 화면과 프로필 화면 두 개의 스크린을 생성합니다. 프로필 화면은 사용자가 해당 화면으로 이동할 때만 로드되도록 lazy loading을 사용합니다.

HomeScreen.js와 ProfileScreen.js 두 개의 파일을 생성합니다.

## HomeScreen.js:

```js
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>홈 화면</Text>
      <Button
        title="프로필로 이동"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default HomeScreen;
```

<div class="content-ad"></div>

## ProfileScreen.js:

```js
import React from "react";
import { View, Text } from "react-native";

const ProfileScreen = () => {
  return (
    <View>
      <Text>프로필 화면</Text>
    </View>
  );
};

export default ProfileScreen;
```

<div class="content-ad"></div>

## 단계 4: Lazy Loading으로 네비게이션 설정

App.js(또는 네비게이션을 구성하는 위치)에서 React.lazy()를 사용하여 lazy loading으로 네비게이션을 설정합니다.

```js
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// 스크린들을 lazy load합니다.
const HomeScreen = React.lazy(() => import("./HomeScreen"));
const ProfileScreen = React.lazy(() => import("./ProfileScreen"));

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <React.Suspense fallback={<Text>로딩 중...</Text>}>
      <AppContainer />
    </React.Suspense>
  );
};

export default App;
```

위의 코드에서는 React.lazy()를 사용하여 HomeScreen과 ProfileScreen 컴포넌트를 lazy loading으로 로드합니다. 컴포넌트가 로드되는 동안 로딩 메시지를 표시하기 위해 AppContainer를 React.Suspense로 감쌉니다.

이제 React Native 앱에서 lazy loading 및 코드 분할을 구현하여 초기 로드 시간을 개선하고 더 나은 사용자 경험을 제공할 수 있습니다.
