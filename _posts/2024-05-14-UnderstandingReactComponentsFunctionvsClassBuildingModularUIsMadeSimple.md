---
title: "리액트 컴포넌트 이해하기 함수 vs 클래스  모듈화된 UI 만들기를 간단하게 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_0.png"
date: 2024-05-14 12:03
ogImage: 
  url: /assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_0.png
tag: Tech
originalTitle: "Understanding React Components: Function vs Class — Building Modular UIs Made Simple"
link: "https://medium.com/@iamalexcarter/understanding-react-components-function-vs-class-building-modular-uis-made-simple-38d1714d9e48"
---


리액트에서 컴포넌트는 사용자 인터페이스의 주요 구성 요소입니다. 이를 사용하면 UI를 독립적이고 재사용 가능한 조각으로 나눌 수 있으며, 각각이 자체 동작 및 렌더링 로직을 캡슐화합니다. 이 모듈식 접근 방식은 애플리케이션을 유지하고 확장하기 쉽게 만들어줍니다.

![이미지](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_0.png)

리액트에서 컴포넌트는 두 가지 주요 방법으로 정의할 수 있습니다: Function Components(함수 컴포넌트)와 Class Components(클래스 컴포넌트).

# Function Components



기능 구성 요소는 복잡한 상태 관리나 라이프사이클 메서드에 액세스할 필요가 없는 컴포넌트에 권장되며 더 간단합니다. 이들은 본질적으로 React 엘리먼트를 반환하는 JavaScript 함수입니다. 기본 예제를 살펴보겠습니다:

![Welcome function component example](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_1.png)

이 예제에서 Welcome은 프롭스 객체를 수락하고 간단한 인사 메시지인 React 엘리먼트를 반환하는 함수 컴포넌트입니다. 이 컴포넌트는 이름 프롭을 전달하여 UI에서 사용할 수 있습니다:

![Using the Welcome function component](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_2.png)



# 클래스 구성요소

클래스 구성요소는 더 많은 기능을 가지고 있으며, 구성요소가 상태를 관리하거나 라이프사이클 이벤트를 처리해야 할 때 사용됩니다. 이들은 React.Component를 확장한 ES6 클래스로 정의되어 있어야 하며, React 요소를 반환하는 render() 메서드를 반드시 포함해야 합니다:

![Class Components](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_3.png)

이 Welcome 클래스 구성요소는 위에서 보여진 함수 구성요소와 유사하게 작동하지만 클래스로 정의되어 있습니다. 또한 render 메서드 내에서 this.props를 사용하여 props에 액세스합니다.



# 컴포넌트 조합하기

컴포넌트는 출력에서 다른 컴포넌트를 참조할 수 있습니다. 이 조합 기능은 리액트의 강력한 기능 중 하나로, 간단한 구성 요소에서 복잡한 UI를 구축할 수 있게 합니다. 다음은 Welcome 컴포넌트를 사용하여 부모 App 컴포넌트 안에 넣은 예제입니다:

![이미지](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_4.png)

이 App 컴포넌트는 세 개의 다른 이름을 가진 Welcome 컴포넌트를 렌더링하여, 컴포넌트가 다른 속성(props)과 함께 재사용될 수 있는 방법을 보여줍니다.



# 컴포넌트 추출하기

자주 컴포넌트가 너무 복잡해지면 작은 컴포넌트로 추출하는 것이 좋은 방법입니다. 예를 들어, Comment 컴포넌트가 있다면 Avatar와 UserInfo 컴포넌트를 추출하여 Comment 컴포넌트를 단순화할 수 있습니다:

![Component Extraction](/assets/img/2024-05-14-UnderstandingReactComponentsFunctionvsClassBuildingModularUIsMadeSimple_5.png)

이 예에서 Avatar 및 UserInfo는 Comment 컴포넌트의 특정 부분을 처리하는 작은 컴포넌트이며, 주 컴포넌트를 더 깔끔하고 관리하기 쉽게 만듭니다.



# 결론

React 컴포넌트는 동적이고 인터랙티브한 사용자 인터페이스를 구축하는 강력하고 다재다능한 도구입니다. 함수 컴포넌트와 클래스 컴포넌트를 이해하고 활용하며, 구성과 추출을 통해 잘 정리되고 유지보수가 쉬운 React 애플리케이션을 만들 수 있습니다.

# 관련 기사

# Stackademic 🎓



끝까지 읽어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 칭찬하고 팔로우해 주시면 좋겠어요! 👏
- 다음 링크에서 우리를 팔로우해주세요: X | LinkedIn | YouTube | Discord
- 저희 다른 플랫폼도 방문해보세요: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 기반 콘텐츠를 다루는 블로그 플랫폼에 지쳤나요? Differ를 시도해보세요!
- Stackademic.com에서 더 많은 콘텐츠를 만나보세요.