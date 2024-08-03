---
title: "React 프레임워크에 너무 의존하면 안되는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Why React Framework Is Not Going To Make You a Better Web Developer"
link: "https://medium.com/@ori.holis/why-react-framework-is-not-going-to-make-you-a-better-web-developer-754529d32911"
---



![React framework에 대한 부정적인 영향](/assets/img/WhyReactFrameworkIsNotGoingToMakeYouaBetterWebDeveloper_0.png)

일이 좋아지고 좋아지면서 우리의 작업이 점차 더 쉬워지는 동안 종종 기본 원칙을 잊기 쉽습니다. React는 수백만 개발자들의 삶을 간단하게 만들면서 빠르게 발전해왔습니다. 하지만 이와 같은 프로그래머들은 종종 프레임워크 내부에서 무슨 일이 벌어지는지 이해하지 못하거나 React state 변수에 완전히 의존하면서 순수 Javascript로 작업할 수 없을 수도 있습니다. 이러한 기본적인 오류는 중대한 성능 저하나 현재 코드로 새로운 문제와 도전을 해결하지 못할 수도 있습니다.

## 비용

React의 학습 곡선은 내가 본 가장 빠른 것 중 하나입니다. 쉬운 개념, 사용할 준비가 된 여러 라이브러리, 거대한 커뮤니티 및 간단한 구문이 함께 제공됩니다. 거의 최고의 선택지인 것 같습니다. 그러나 특정 비용이 발생하며 그것은 속도입니다. 네, 들었던 대로입니다. React가 모든 것을 대신 처리해주지만 번들러는 만능이 아닙니다. 번들러는 당신의 의도를 명확하게 파악할 수 없기 때문에 리액트성을 제공하기 위해 많은 쓸모 없는 코드를 추가합니다. 그렇기 때문에 모든 라이브러리를 가져온 후에 코드 번들을 한 후에 번들 크기가 순수 Javascript 프레임워크의 경우보다 훨씬 커지는 경우가 많습니다. 극단적인 경우에는 몇 배나 커져서 더 느린 장치에서 로딩 시간이 길어질 수도 있습니다.

<div class="content-ad"></div>

![WhyReactFrameworkIsNotGoingToMakeYouaBetterWebDeveloper_1.png](/assets/img/WhyReactFrameworkIsNotGoingToMakeYouaBetterWebDeveloper_1.png)

이 문제들은 해결할 수 있지만, 재미있는 점은 모든 해결책이 매우 복잡하고 적절한 최적화를 위해 상당한 지식이 필요하다는 것입니다. 리액트의 아이디어를 완전히 뒤집어, 프로그래머를 위해 가능한 간단하게하고 "프레임워크가 나머지를 처리할 것"이라는 생각을 전혀 상반되게 합니다.

대부분의 시간에 반응성은 원활하게 작동하지만 대량의 데이터 세트와 동시에 많은 반응 컴포넌트를 처리하기 시작하면 문제가 발생합니다. 데이터를 가능한 한 적게로 로딩하거나 화면을 여러 부분으로 분할하는 등 소란스러운 최적화로 이어져 React가 그들의 빠른 렌더링을 처리하지 못하기 때문입니다.

예를 들어 주문 시스템이 있을 때 많은 데이터가 있다면 사용자로서 데이터에 빠르게 액세스하고 싶을 것입니다. 그러나 Material UI DataGrid에 수백 개 이상의 행을 표시하려고 하면 작업이 느려지거나 제대로 렌더링되지 않을 수 있습니다. 그에 비해 다른 프레임워크(일반 자바스크립트, Vue 또는 Svelte)는 훨씬 더 원활합니다. 렌더링 속도가 빠르고 대량 데이터 세트를 빠르게 처리합니다. 이러한 이점들은 일반 자바스크립트 프레임워크나 Vue에서 서로 다른 비용이 들어가야 합니다(여기서 잘못 이해하진 말아주세요).

<div class="content-ad"></div>

![WhyReactFrameworkIsNotGoingToMakeYouaBetterWebDeveloper_2.png](/assets/img/WhyReactFrameworkIsNotGoingToMakeYouaBetterWebDeveloper_2.png)

## 결론

리액트는 쉬운 개념과 다양한 라이브러리로 대부분이 알아주는 이유 때문에 나에게 가장 좋아하는 프레임워크 중 하나다. 하지만 이 문제를 간과해서는 안 된다고 생각한다. 모두들 적어도 하나의 프레임워크를 고르기 전에 다른 프레임워크를 시도해보아야 한다. 이 경험을 통해 기술로 제한되지 않고 가능한 자원을 활용하는 색다른 사고를 갖게 될 수 있다. 또한 중요한 경험은 언어의 기본을 배우는 것이다. 지난 몇 년 동안 소개된 새로운 기능을 공부하고, 데이터 구조 간의 차이, 가장 기본적인 알고리즘, 그리고 그 밖에도 여러 가지를 확인해보라. 모든 것이 당신에게 우위를 줄 수 있다. 가장 좋은 솔루션으로 문제를 해결하는 경험을 쌓아가는 것이다.

읽어 주셔서 감사합니다. 이런 다른 기사들도 여러분의 관심을 끌 수 있을 것입니다:
