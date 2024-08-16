---
title: "React에서 함수형 컴포넌트만 사용하고 더 이상 클래스 컴포넌트를 사용하지 않는 이유"
description: ""
coverImage: "/assets/img/2024-05-12-WhyWeOnlyUseFunctionalComponentsandNoLongerClassComponentsInReact_0.png"
date: 2024-05-12 23:07
ogImage: 
  url: /assets/img/2024-05-12-WhyWeOnlyUseFunctionalComponentsandNoLongerClassComponentsInReact_0.png
tag: Tech
originalTitle: "Why We Only Use Functional Components and No Longer Class Components In React"
link: "https://medium.com/@andrewaliaj/why-we-only-use-functional-components-and-no-longer-class-components-in-react-441b39c93e92"
isUpdated: true
---




리액트 개발자로서, UI에 대해 함수형 컴포넌트 또는 클래스 컴포넌트를 사용할 수 있습니다. 클래스 컴포넌트는 리액트 개발자들이 선호하는 선택이었습니다. 그러나 2018년 리액트 버전 16.8에서 리액트 훅이 소개되면서 함수형 컴포넌트가 리액트 개발자들에게 선호되는 선택이 되었습니다.

![이미지](/assets/img/2024-05-12-WhyWeOnlyUseFunctionalComponentsandNoLongerClassComponentsInReact_0.png)

# 왜 리액트 개발자들이 과거에 클래스 컴포넌트를 함수형 컴포넌트보다 선호했는가

리액트에서 컴포넌트 UI를 렌더링하는 두 가지 방법이 있습니다. 하나는 JavaScript 함수인 함수형 컴포넌트이고, 다른 하나는 JavaScript 클래스인 클래스 컴포넌트입니다. 클래스 컴포넌트는 UI를 동적으로 만들기 위해 로직과 상태를 추가할 수 있어서 리액트 개발자들에게 선호되었습니다. 함수형 컴포넌트는 과거에는 정적 UI만 렌더링했습니다. 특히 현대적인 웹 앱을 개발할 때 클래스 컴포넌트가 리액트 개발자들에게 선호되었던 이유가 분명합니다.



# React에서 Hooks가 소개된 이유

기존에는 클래스 컴포넌트가 UI를 렌더링하는 선호 방법이었지만, 이에는 문제점이 있었습니다. 하나의 문제는 클래스 컴포넌트 사이에서 로직과 상태 데이터를 공유하는 것이 어려웠다는 점입니다. 클래스 컴포넌트 사이에서 데이터 흐름을 관리하는 것은 번거로운 작업이었습니다. 또 다른 문제는 클래스 컴포넌트가 상태 로직이 커질수록 이해하기 어렵다는 것이었습니다. 이 복잡성으로 인해 컴포넌트를 렌더링하는 것이 더 어려워졌습니다. 이러한 문제를 해결하기 위해 React에서 Hooks가 소개되었습니다. Hooks를 사용하면 개발자가 함수형 컴포넌트에 더 많은 로직과 상태를 추가할 수 있으며, 이를 통해 컴포넌트 UI를 동적으로 만들고 로직을 재사용할 수 있게 되었습니다. 결과적으로 함수형 컴포넌트는 UI 컴포넌트를 렌더링하는 선호 방법이 되었으며, Hooks를 통해 개발자들이 함수형 컴포넌트를 통해 더 명확하고 관리하기 쉬운 코드를 작성할 수 있었습니다.

# 결론

그래서 React 개발자로서 함수형 컴포넌트를 전용으로 사용해야 합니다. 유지보수해야 할 레거시 코드베이스가 있는 경우를 제외하고요.