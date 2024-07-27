---
title: "React Context와 TypeScript를 마스터하기 포괄적인 튜토리얼"
description: ""
coverImage: "/assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_0.png"
date: 2024-05-12 22:51
ogImage: 
  url: /assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_0.png
tag: Tech
originalTitle: "Mastering React Context with TypeScript: A Comprehensive Tutorial"
link: "https://medium.com/@nitinjha5121/mastering-react-context-with-typescript-a-comprehensive-tutorial-5bab5ef48a3b"
---


친절한 톤으로 한국어로 번역하면 다음과 같습니다.

"이 글에서는 TypeScript를 사용하여 더 가독성이 좋고 쉽게 이해할 수 있으며 최신 best practice에 맞는 React 컨텍스트를 만드는 과정을 안내하겠습니다. React 컨텍스트는 컴포넌트 트리의 모든 수준을 통해 props를 전달하지 않고 상태 데이터를 관리하고 공유할 수 있는 방법을 제공합니다.

React Context 설정 방법

먼저, React Context API를 사용하여 기본 값이 null인 컨텍스트를 생성해봅시다."



기본값을 null로 설정한 이유에 대해 궁금할 수 있습니다. 이 선택은 곧 명백해질 목적이 있습니다.

콘텍스트 제공자 생성하기

다음은 우리가 콘텍스트 제공자를 구성하는 방법입니다:

![Context Provider Structure](/assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_1.png)



제공된 코드 스니펫에서 useMemo의 사용을 알 수 있을 것입니다. 여기서의 목적은 context 값이 각 렌더링마다 변경되지 않도록 똑똑하게 저장하는 것입니다. 이 과정을 통해 컨텍스트가 다시평가될 때 불필요한 변경을 방지합니다.

조금 더 자세히 살펴보죠: 애플리케이션의 표시가 컨텍스트 제공자 내부 업데이트로 인해 변경되는 경우를 상상해보세요. 이러한 경우에는 컨텍스트 객체를 재설정하는 것이 합리적입니다. 그러나 부모 구성 요소의 상태 변경과 같은 외부 요소에서 업데이트가 발생하는 경우도 고려해야 합니다. 이러한 시나리오에서 매번 새 객체를 만드는 것은 과도합니다. 최적화된 방식을 통해 이러한 비제공자 유발 렌더 중에는 불필요한 객체 재생성을 방지합니다.

매 렌더링마다 객체를 재생성하는 것에 대해 왜 걱정해야 하는지 의문이 생길 수 있는 데요? 사실, 많은 경우에는 이것이 심각한 문제처럼 보이지 않을 수 있습니다. 그러나 더 깊이 파고들면, 이러한 실천은 예기치 못한 버그로 이어질 수 있습니다. 예를 들어, 컨텍스트 값 객체가 useEffect 훅 내에서 종속성으로 사용될 때 관련 문제가 발생할 수 있습니다. 객체 참조 일관성을 유지함으로써 우연한 다시 렌더링으로 인한 잠재적인 이상 현상을 우회합니다. 이러한 전략적 기동이 결국 코드베이스의 견고성과 안정성에 기여합니다.

커스텀 훅을 사용한 컨텍스트 소비 최적화



내용을 이해하기 위해 커스텀 훅을 만들 것입니다. 이 접근 방식은 모듈화 및 코드 가독성을 높이는 데 도움이 됩니다.

![마크다운](/assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_2.png)

이 조각에서는 useMessageContext라는 커스텀 훅을 생성하여 컨텍스트의 사용을 캡슐화하고 있습니다. 이를 통해 두 가지 중요한 목표를 달성합니다:

- 모듈화: 커스텀 훅은 컨텍스트 사용의 세부 정보를 추상화하여 관리 및 재사용을 쉽게 만듭니다. 응용 프로그램 전체에서 컨텍스트 소비 방법을 변경해야 할 경우, 한 곳에서 수행할 수 있습니다.
- 명확성과 가독성: 일반적인 useContext 대신 useMessageContext를 사용함으로써 더 구체적인 의미 체계를 제공하여 코드를 이해하기 쉽게 만듭니다. 코드베이스에서 작업하는 사람은 누구나 컨텍스트 소비의 목적을 빠르게 파악할 수 있습니다.



여기 useMessageContext 훅이 의존하는 useContextWrapper 함수의 구현 내용입니다:

![이미지](/assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_3.png)

이 useContextWrapper 함수는 추가적인 오류 처리 레이어를 추가합니다. 해당 프로바이더가 제대로 제공되지 않으면, 명료하고 유익한 오류 메시지가 표시되어 개발자가 효과적으로 문제를 해결할 수 있도록 안내됩니다.

마무리하며



이 가이드라인을 따라가면 효율적이고 유지보수가 쉬운 TypeScript를 사용한 잘 구조화된 React 컨텍스트를 만들 수 있습니다. 컨텍스트 프로바이더를 올바르게 설정하고 유형을 정의하며 사용자 지정 후크를 통해 컨텍스트를 소비하는 것은 더 견고하고 확장 가능한 애플리케이션에 기여할 것입니다.

![이미지](/assets/img/2024-05-12-MasteringReactContextwithTypeScriptAComprehensiveTutorial_4.png)

즐거운 코딩 되세요!