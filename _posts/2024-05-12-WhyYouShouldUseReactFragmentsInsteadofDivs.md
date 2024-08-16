---
title: "React Div 대신에 React Fragments를 사용해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-05-12-WhyYouShouldUseReactFragmentsInsteadofDivs_0.png"
date: 2024-05-12 21:45
ogImage: 
  url: /assets/img/2024-05-12-WhyYouShouldUseReactFragmentsInsteadofDivs_0.png
tag: Tech
originalTitle: "Why You Should Use React Fragments Instead of Divs"
link: "https://medium.com/@vdsnini/why-you-should-use-react-fragments-instead-of-divs-86509be2336a"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-WhyYouShouldUseReactFragmentsInsteadofDivs_0.png)

프론트엔드 개발의 세계에서는 모든 코드 라인이 중요합니다. 웹 애플리케이션이 더 복잡해지면서 성능 최적화와 가독성 있는 깨끗한 코드 유지가 중요해집니다. React 개발자가 가진 덜 알려진 도구 중 하나인 React 프래그먼트는 이러한 고민을 해소해줍니다. 이 글에서는 프로젝트에 React 프래그먼트를 사용하는 것이 어떻게 게임 체인저가 될 수 있는지 살펴보겠습니다.

React 프래그먼트란 무엇인가요?
React 16.2에서 소개된 React 프래그먼트는 DOM에 추가적인 노드를 생성하지 않고 여러 개의 React 엘리먼트를 그룹화하는 방법을 제공합니다. div나 다른 컨테이너 엘리먼트와 달리 프래그먼트는 추가적인 DOM 레이어를 도입하지 않고 엘리먼트를 그룹화할 수 있습니다.

성능 최적화
React 프래그먼트를 div 대신 선택하는 핵심 이유 중 하나는 성능 최적화입니다. div를 사용하여 엘리먼트 목록을 렌더링할 때 각 div는 DOM 트리에 새로운 노드를 추가합니다. 특히 긴 목록이나 깊게 중첩된 컴포넌트를 다룰 때 불필요한 비대가 될 수 있습니다.
반면에 React 프래그먼트는 새로운 DOM 노드를 만들지 않습니다. 대신, DOM 계층 구조에 추가적인 레이어를 도입하지 않고 엘리먼트를 그룹화할 수 있습니다. 이는 보다 빠른 렌더링 시간과 보다 간결한 DOM 구조를 가져와서 궁극적으로 응용 프로그램의 성능을 향상시킬 수 있습니다.



친절한 톤으로 번역해드리겠습니다.

더 깨끗한 마크업
성능 이점을 넘어서 React Fragments를 사용하면 더 깨끗한 마크업을 얻을 수 있습니다. 아이템 목록을 부모 div로 감싸지 않고 렌더링하고 싶은 시나리오를 생각해보세요. 이때 div를 사용하면 HTML에 불필요한 래퍼 엘리먼트가 도입되어 마크업이 복잡해지고 가독성이 떨어지게 됩니다.
React Fragments는 추가적인 노드를 DOM에 추가하지 않고도 엘리먼트를 그룹화할 수 있어 이 문제를 우아하게 해결합니다. 이를 통해 JSX 마크업을 깔끔하고 간결하게 유지하면서도 필요한 엘리먼트에만 집중할 수 있죠, 부가적인 래퍼에 신경 쓸 필요가 없습니다.

향상된 접근성
접근성은 React Fragments가 빛을 발하는 또 다른 영역입니다. div나 다른 컨테이너 엘리먼트를 사용할 때, 스크린 리더가 이러한 엘리먼트의 존재를 알리고 시각 장애를 가진 사용자들을 혼란스럽게 할 수 있습니다. React Fragments를 사용하면 추가적인 노드를 생성하지 않아 스크린 리더에는 보이지 않으므로 UI가 더 접근성 있게 되는 장점이 있습니다.

결론
요약하면, React Fragments는 React 애플리케이션에서 엘리먼트를 그룹화하는 가벼운 효율적인 방법을 제공합니다. 불필요한 DOM 노드를 피하면서 성능 향상, 깨끗한 마크업, 그리고 높은 접근성을 얻을 수 있습니다. 다음에 엘리먼트를 감싸기 위해 div를 사용하려 할 때는 React Fragment를 대신 활용해보고 직접 이점을 경험해보세요.