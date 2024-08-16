---
title: "대규모 확장을 위해 React Native 앱에서 디자인 시스템 활용하기 제3부"
description: ""
coverImage: "/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_0.png"
date: 2024-05-12 20:20
ogImage: 
  url: /assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_0.png
tag: Tech
originalTitle: "Build for Scale: Use a Design System in your React Native app. Part 3: Develop your Custom ThemeIntroduction"
link: "https://medium.com/@malikchohra/build-for-scale-use-a-design-system-in-your-react-native-app-5790982cae7e"
isUpdated: true
---



<img src="/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_0.png" />

첫 번째와 두 번째 파트에서 일반적으로 디자인 시스템에 대해 논의하고 디자인 시스템을 만드는 데 사용할 도구에 대해 더 많이 이야기했습니다. React Native 개발자를 위한 기술 기사를 쓰는 것에 대한 다양한 요청을 받은 후, 디자인 시스템을 코드하는 방법에 대한 기술적 구현을 안내하겠습니다. 이 부분에서는 TypeScript를 사용하여 React Native 앱에서 디자인 시스템을 구현하며, 라이브러리로 React Native Paper를 사용하고 React Context를 사용하여 앱에 전달할 것입니다.

다음을 구현할 것입니다. 컬러 팔레트를 정의하는 테마를 만들겠습니다. 이 테마에는 Dark 모드와 Light 모드가 포함됩니다. 또한 텍스트의 다양한 변형(글자 간격, 크기, 글꼴 두께, 줄 높이, 글꼴 패밀리)를 정의할 것입니다. 반응형 디자인을 위해 반응형 화면에 대한 React Native Size Matter 라이브러리를 사용할 것입니다. 이는 React Native Paper 제공자에서 인스턴스화되며 테마를 사용하는 방법을 이해할 수 있도록 버튼 예제가 포함될 것입니다. 추가로 다크 모드와 라이트 모드의 전환기를 구현할 것입니다.

또한 화면에 테마 객체를 전달하고 react-navigation을 사용하여 내비게이션에 사용되는 기본 테마를 수정하기 위해 사용자 정의 후크를 사용할 것입니다.

이 기술 기사에서 다음을 배울 수 있습니다:

- 사용자 정의 색상 팔레트 만들고 사용하는 방법
- 타이포그래피(글꼴) 만들고 사용하는 방법
- 앱에서 Rtl 및 Ltr 방향 모두 처리하는 방법
- 앱에서 사용자 정의 공간 차원 만드는 방법
- 반응형 앱 디자인하는 방법
- React Native Paper 테마 사용하여 디자인 시스템 만드는 방법
- 사용자 정의 테마 사용하여 구성 요소 만드는 방법
- React Context 사용법 및 앱에 변수 전달하는 방법
- 다크 모드와 라이트 모드 사용하는 방법
- 앱 구성 관리를 위해 Redux 사용하고 설정 화면에서 테마 변경 처리하는 방법
- 사용자 정의 훅 사용하여 테마 객체 전달하는 방법
- React Native Paper 테마에 대한 TypeScript 수정 사항

# React Native Paper

React Native Paper는 React Native 애플리케이션을 위한 UI 컴포넌트 라이브러리로, Material Design 가이드라인을 따르는 사용 준비 상태의 컴포넌트를 제공하여 개발자가 간편하게 세련된 일관된 사용자 인터페이스를 구축할 수 있도록 도와줍니다.

## 설치

세부 사항에 대해 심층적으로 알 필요 없이, 공식 문서에서 제공하는 안내에 따라 라이브러리를 설치해보세요.

React 네이티브 및 React 네이티브 페이퍼 라이브러리를 함께 사용하려면 해당 문서를 확인하세요. 추가로 사용자 정의가 가능합니다.

# React Context

리액트 컨텍스트는 React의 고급 기능으로, props를 수동으로 각 레벨마다 전달하지 않고 컴포넌트 트리를 통해 데이터를 전달할 수 있게 해줍니다. 이를 통해 리액트 애플리케이션의 컴포넌트들 간에 테마, 사용자 인증 상태 또는 다른 전역 데이터와 같은 값을 공유하여 상태 관리를 효율적으로 할 수 있고 prop 전달을 줄일 수 있습니다.

# 시작해봅시다

# 단계 1: 색상 Scheme 정의하기

디자인 시스템의 첫 번째 단계는 색상 Scheme을 정의하는 것입니다. 기본 색상, 배경 색상, 성공, 오류 및 보충 배경과 같은 다양한 색상을 포함해야 합니다. 우리는 라이트 모드와 다크 모드를 모두 사용할 예정이므로 다음과 같은 객체를 갖게 될 것입니다:

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_1.png)

# 단계 2: 타이포그래피 정의하기

## React Native Paper V3의 폰트 유형

Fonts 객체를 갖기 위해 MD3Typescale을 사용하기 위해 React Native Paper V3를 사용할 것입니다.

사용자 지정 글꼴을 사용하려면 사용자 지정 글꼴 사용 방법에 대한 내 글을 확인해보세요.

Enum 안에 글꼴을 정의한 후 LTR 및 RTL 방향으로 이동하여 MD3Type 스케일을 정의합니다. 각 유형마다 글꼴 크기와 줄 높이에 사용할 것입니다.

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_2.png)

# 단계 3: 크기 정의

앱에 포함하고 싶은 크기를 담을 파일이 있어야합니다 (예: 매번 16px 정도의 일반적인 패딩 및 가장 많이 사용되는 2, 4, 8과 같은 값들을 포함).

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_3.png)

## 단계 4: 테마 객체 정의하기

우리가 이미 색상 체계를 설정했다면, 이제 색상 테마 객체를 내보냅니다.

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_4.png)

# 단계 5: 스토어를 통해 언어 및 테마 유형 정의하기

사용자가 기본 언어와 원하는 테마를 설정할 수 있는 곳이 필요합니다. 저는 Redux 툴킷을 사용하여 이를 관리하고 있습니다. 이를 위한 셀렉터와 변경 액션을 가지고 있어야 합니다.

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_5.png)

# 단계 6: 테마 컨테이너를 생성하세요

![테마 이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_6.png)

# 단계 7: 네비게이션에 테마 전달하기

![테마 이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_7.png)

# 단계 8: 컴포넌트 만들기: Text 컴포넌트의 예시

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_8.png)

# 단계 9: 테마 후크 사용 방법 및 사용자의 다크 또는 라이트 모드 정의

![이미지](/assets/img/2024-05-12-BuildforScaleUseaDesignSysteminyourReactNativeappPart3DevelopyourCustomThemeIntroduction_9.png)

# 결론

이 문서를 읽고 나면 사용자 정의 테마를 앱에 구현할 준비가 됩니다. 자유롭게 댓글을 남기거나 친구들과 공유해보세요.

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*jzfCO3_3Fkz2iJQpNWbP0w.gif)

React Native, React 및 TypeScript에 관한 통찰을 공유합니다. Linkedin이나 Medium에서 팔로우해주세요.

메시지를 보내서 무엇에 대해 쓰길 원한다면 말씀해주세요. 그럼 그에 따라 목록에 추가할게요.

#reactnative #react #typescript #mobiledevelopment #engineering #patterns #bestpractices #memoryleak #performance #scaleApp #fastApp #userexperience #designSystems #Theme #MaterialDesign #uiUX #scaling #redux #reduxtoolkit #reactContext
