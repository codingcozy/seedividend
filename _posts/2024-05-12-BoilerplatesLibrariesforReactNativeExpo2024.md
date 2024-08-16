---
title: "2024년 최신 React Native Expo용 보일러플레이트 라이브러리"
description: ""
coverImage: "/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_0.png"
date: 2024-05-12 19:16
ogImage: 
  url: /assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_0.png
tag: Tech
originalTitle: "Boilerplates Libraries for React Native Expo (2024)"
link: "https://medium.com/@emilyxiong/boilerplates-libraries-for-react-native-expo-2024-abfb43b0ecff"
isUpdated: true
---



지금은 2024년입니다. 프로그래밍에서는 항상 우리가 선택할 수 있는 최신하이팅 라이브러리들이 있지만, 최신하이팅 라이브러리들이 항상 완벽하지는 않습니다.

여러 해 전에 웹 개발자로써, 저는 네이티브 앱을 어떻게 시작할지 완전히 이해하지 못했습니다. 이 블로그에서는 나의 선택한 라이브러리들과 함께 새로운 React Native/Expo 앱을 어떻게 만들 것인지 보여드리겠습니다. React Native에서 새로운 개발자이며 시작점을 모르는 경우, 이 블로그가 도움이 될 것입니다.

# Component Library

React Native 컴포넌트 라이브러리 중 인기 있는 것들은:

- react-native-paper
- react-native-elements
- gluestack

Npm trends: [https://npmtrends.com/native-base-vs-react-native-elements-vs-react-native-paper](https://npmtrends.com/native-base-vs-react-native-elements-vs-react-native-paper)

![Image](/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_0.png)

이 모든 라이브러리들은 테마를 적용할 수 있고, 좋은 접근성 지원이 가능하며, 좋은 문서와 유사한 구성 요소 세트를 제공합니다.

## 리액트 네이티브 엘리먼츠

이 블로그를 작성하는 시점에서, 리액트 네이티브 엘리먼츠가 가장 많은 컴포넌트를 제공하고 있어요. 하지만, AirbnbRating, PricingCard 또는 SocialIcon 같은 몇몇 컴포넌트는 제 프로젝트에서 사용할 일이 없어 보여요.

<img src="/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_1.png" />

하지만, 이 라이브러리는 가장 유연한 테마 설정을 제공하는 것 같아요. 이 라이브러리를 사용하면 개발자들이 각 컴포넌트 유형에 맞게 테마를 사용자 정의할 수 있어요: https://reactnativeelements.com/docs/customizing#using-themeprovider.

```js
const theme = createTheme({
  components: {
    [themeKey]: {
      // ... props
    },
  },
});
```

## react-native-paper

react-native-paper는 구글의 머티리얼 디자인을 따릅니다. 만약 머티리얼 디자인을 사용하는 웹사이트가 있다면, react-native-paper가 일관성을 제공해줍니다.

<img src="/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_2.png" />


## gluestack

gluestack은 유틸리티 우선이에요. 이 말은 컴포넌트가 마진, marginTop, fontFamily와 같은 props를 가지고 있는 것을 의미해요. 반면에 react-native-paper와 react-native-elements는 하나의 스타일 prop만 사용해요.

예를 들어, React Native에서 컴포넌트를 스타일링하기 위해 스타일 시트를 생성해야 해요:

```js
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0891b2",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "center",
    width: 375,
    maxWidth: "100%",
  },
});
```

그럼 컴포넌트에 스타일을 적용해야 해요: `View style='styles.topContainer'`.

네이티브 베이스에서는 해당 컴포넌트의 속성에 간단히 추가할 수 있어요: `Box bg="primary.600" py="4" px="3" borderRadius="5" rounded="md" width='375' maxWidth="100%"`.

## 제 의견 기반

- react-native-paper

새로운 프로젝트를 처음부터 시작하려는 신입 개발자라면, npm 다운로드 수가 가장 많아 커뮤니티가 크고, 웹에서 쉽게 사용할 수 있다는 이유로 react-native-paper를 선택할 것입니다.

# CSS 유틸리티

CSS 유틸리티 라이브러리는 flex, pt-4, text-center, rotate-90과 같은 미리 정의된 CSS 클래스 목록을 제공합니다.

위에서 언급된 native-base는 유틸리티 중심 스타일링에 대해 언급되었습니다; 그러나 React Native용 tailwind나 tachyons와 유사한 CSS 유틸리티 라이브러리가 있을까요? 네, 있습니다.

나 이전에 사용한 라이브러리들은:

- Native Wind
- react-native-style-tachyons

Npm trends: [https://npmtrends.com/nativewind-vs-react-native-style-tachyons](https://npmtrends.com/nativewind-vs-react-native-style-tachyons)

![이미지](/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_3.png)

## 내 주관적인 선택

- 소규모 프로젝트: 내장 스타일링, 라이브러리 사용하지 않음
- 대규모 프로젝트: Native Wind

소규모 프로젝트의 경우 내장 스타일링이 충분할 것입니다. 대규모 프로젝트의 경우, 팀원들이 이미 Tailwind에 익숙하다면 Native Wind를 선택할 것입니다. 저는 이미 Tailwind 라이브러리에 익숙하며, 네이티브 프로젝트에 이 라이브러리를 사용하기 시작하는 것이 꽤 쉬웠습니다.

# 네비게이션

인기 있는 선택지는 다음과 같습니다:

- react-router-native
- @react-navigation/native
- expo-router (Expo 전용)

Npm trends: https://npmtrends.com/@react-navigation/native-vs-expo-router-vs-react-router-native

![이미지](/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_4.png)

엑스포 전용 라이브러리로 expo-router가 있습니다. 이는 파일 기반 라우팅 규칙으로, Next.js를 떠올리게 합니다.

React 웹 개발자이면 아마 react-router에 익숙할 것입니다. 이의 네이티브 버전인 react-router-native도 있지만, 널리 사용되지는 않습니다.

## 제 개인적인 선택

- @react-navigation/native

이 라이브러리는 이제 React-Native 네비게이션을 위한 주요 라이브러리로 거의 사용되고 있어요.

# 상태 관리

상태 관리를 위해 선택할 수 있는 라이브러리가 더 많이 있거나 라이브러리를 전혀 사용하지 않을 수도 있어요. 인기 있는 라이브러리는 다음과 같아요:

- Redux
- TanStack Query (또는 React Query로 더 잘 알려져 있어요)
- Redux Toolkit Query (또는 RTK Query로 더 잘 알려져 있어요)
- React Context (내장되어 있어 라이브러리가 필요하지 않아요)
- MobX
- Jotai
- Recoil
- XState

Npm trends: https://npmtrends.com/@tanstack/react-query-vs-@xstate/react-vs-jotai-vs-mobx-vs-react-redux-vs-recoil

![Screenshot](/assets/img/2024-05-12-BoilerplatesLibrariesforReactNativeExpo2024_5.png)

## 내 주관적인 선택

- 친숙한 올드 Redux + TansSack Query

이 두 개는 가장 인기 있는 것들 중 하나이고 많은 해 동안 사용되었습니다. 그것들은 방탄이며 개발자 커뮤니티도 넓게 보유하고 있어요.

Redux와 Transack Query를 사용한 상태 관리하는 방법에 대한 나의 블로그 포스트를 확인해보세요:

# Monorepo

모노레포란 무엇인가요?

여러 개의 React Native 앱이 필요하거나 웹 및 네이티브 앱 간에 공통 로직을 공유해야 한다면, 모노 저장소는 좋은 도구가 될 것입니다.

이는 인기 있는 선택지들 중 하나로, 여기에는 다음이 포함됩니다:

- yarn workspace
- Lerna
- Turborepo
- @nx/react-native / @nxl/expo

내 주관적인 의견은 @nx/react-native / @nx/expo입니다.

내용을 표 기호(Markdown format)로 변경하면 아래와 같습니다.

For yarn workspace and Lerna, developers need to do their configuration and setup. Turborepo provides a starter app; however, it is locked to the Expo and Next.js tech stack; if developers want to use a different tech stack, they still need to do their configuration.

For new developers, @x/react-native and @nx/expo provide a good developer experience and documentation to start; nevertheless, it still gives developers flexibility on the tech stack. To start, run this command:


# react-native
npx create-nx-workspace --preset=react-native

# expo
npx create-nx-workspace --preset=expo


# Summary

새로운 React Native / Expo 앱을 만들 때 선택할 수 있는 라이브러리 목록입니다. 이 리스트는 유일한 선택지는 아닙니다.

아름다운 React Native 앱을 만들어 봅시다.

- 공식 @nx/expo 플러그인: https://nx.dev/packages/expo
- 공식 @nx/react-native 플러그인: https://nx.dev/packages/react-native

# 더 알아보기

- 🧠 Nx 문서
- 👩‍💻 Nx GitHub
- 💬 Nx 커뮤니티 Slack
- 📹 Nx 유튜브 채널
- 🥚 무료 Egghead 강좌
- 🚀 CI를 빠르게 실행
