---
title: "400줄의 코드로 나만의 Reactjs 만들기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_0.png"
date: 2024-05-14 10:30
ogImage: 
  url: /assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_0.png
tag: Tech
originalTitle: "Build Your Own React.js in 400 Lines of Code"
link: "https://medium.com/gitconnected/build-your-own-react-js-in-400-lines-of-code-5a02c1db5e0a"
isUpdated: true
---




## 리액트 원리 심도있는 공부

![image](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_0.png)

내 뉴스레터에 원본으로 게시되었습니다.

리액트 v19 베타 버전이 출시되었습니다. React 18과 비교해 보면 사용자 친화적인 많은 API를 제공하지만, 핵심 원칙은 크게 변하지 않았습니다. 리액트를 오랫동안 사용해 왔을 수도 있지만, 그것이 어떻게 작동하는지 아시나요?



이 기사는 비동기 업데이트를 지원하며 중단될 수 있는 React 버전을 약 400줄의 코드로 빌드하는 방법에 대해 도와줄 것입니다. 이는 많은 고수준 API가 의존하는 React의 핵심 기능입니다. 최종 효과 GIF는 다음과 같습니다:

![Final Effect Gif](https://miro.medium.com/v2/resize:fit:1400/0*x5ppDSDgiUaSz82X.gif)

React 공식 웹사이트에서 제공한 틱택토 튜토리얼 예제를 사용하여 잘 작동하는 것을 확인했습니다.

현재 이 코드는 내 GitHub에 호스팅되어 있으며 직접 시도해 볼 수 있는 온라인 버전도 방문할 수 있습니다.



# JSX와 createElement

mini-react.ts의 원리에 깊이 파볼 때, JSX가 무엇을 나타내는지를 이해하는 것이 중요합니다. 우리는 JSX를 사용하여 DOM을 설명하고 JavaScript 논리를 쉽게 적용할 수 있습니다. 그러나 브라우저는 JSX를 기본적으로 이해하지 못하기 때문에 우리가 작성한 JSX는 브라우저가 이해할 수 있는 JavaScript로 컴파일됩니다.

![이미지](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_1.png)

React.createElement을 호출하는 것을 볼 수 있습니다. 여기에는 다음 옵션이 제공됩니다:



- 유형: 현재 노드의 유형을 나타냅니다. div와 같은 것입니다.
- 구성: 현재 엘리먼트 노드의 속성을 나타냅니다. 예를 들어 'id: "test"'입니다.
- 자식: 여러 엘리먼트, 간단한 텍스트 또는 React.createElement로 생성된 노드일 수 있는 자식 엘리먼트들입니다.

경험이 풍부한 React 사용자라면, React 18 이전에 JSX를 올바르게 작성하기 위해 `react`에서 React를 import해야 했다는 것을 기억할 수 있습니다. 그러나 React 18부터는 이러한 작업이 더 이상 필요하지 않아 개발자 경험을 향상시켰지만, 여전히 React.createElement가 내부적으로 호출됩니다.

![image](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_2.png)

우리의 단순화된 React 구현에는 JSX를 직접적으로 React.createElement 구현으로 컴파일하도록 Vite를 `jsxRuntime: 'classic'`으로 구성해야 합니다.



그럼 우리 자체를 구현할 수 있어요:

<img src="/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_3.png" />

# 렌더

다음으로, 이전에 생성된 데이터 구조를 기반으로 JSX를 실제 DOM에 렌더링하는 간소화된 버전의 렌더 함수를 구현해보겠습니다.


![이미지](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_4.png)

온라인 구현 링크가 여기 있습니다. 현재 JSX를 한 번만 렌더링하므로 상태 업데이트를 처리하지 않습니다.

# Fiber 아키텍처와 동시성 모드

Fiber 아키텍처와 동시성 모드는 주로 한 번 완전한 요소 트리가 재귀되면 중단될 수 없는 문제를 해결하기 위해 개발되었습니다. 이는 주 스레드를 오랜 기간 블로킹할 수 있습니다. 사용자 입력 또는 애니메이션과 같은 고우선 순위 작업이 적시에 처리되지 않을 수 있습니다.



React의 소스 코드에서 작업은 작은 단위로 나누어집니다. 브라우저가 유휴 상태일 때 작은 작업 단위들을 처리하여 주요 작업을 우선적으로 처리할 수 있도록 메인 스레드의 제어를 양보합니다. 한 작업의 모든 작은 단위가 완료되면 결과는 실제 DOM에 매핑됩니다.

주요 포인트는 메인 스레드를 양보하는 방법과 작업을 관리 가능한 단위로 나누는 방법입니다.

# requestIdleCallback

requestIdleCallback은 브라우저가 유휴 상태일 때 콜백을 실행하는 실험적인 API입니다. 아직 모든 브라우저에서 지원되지 않습니다. React에서는 requestIdleCallback보다 복잡한 스케줄링 로직을 갖춘 스케줄러 패키지에서 사용되며, 이 패키지는 작업 우선순위 업데이트와 같은 기능을 포함하고 있습니다.



그러나 여기서는 비동기 인터럽트성만을 고려합니다, 그래서 React를 흉내 내는 기본 구현이 있습니다:

![이미지](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_5.png)

일부 주요 포인트에 대한 간단한 설명은 다음과 같습니다:

MessageChannel을 왜 사용해야 하나요?



기본적으로 이 방법은 각 단위 작업 라운드를 처리하기 위해 매크로 테스크를 사용합니다. 하지만 왜 매크로 테스크를 사용해야 할까요?

이는 브라우저가 DOM을 업데이트하거나 이번 휴식 기간 동안 이벤트를 받을 수 있도록 주 스레드의 제어를 양보해야 하기 때문입니다. 브라우저가 DOM을 업데이트할 때는 별도의 작업으로 처리되며, 그때에는 JavaScript가 실행되지 않습니다.

주 스레드는 한 번에 하나의 작업만 처리할 수 있습니다. 즉, JavaScript를 실행하거나 DOM 계산, 스타일 계산, 입력 이벤트 처리 등을 수행할 수 있습니다. 그러나 마이크로 테스크는 주 스레드의 제어를 양보하지 않습니다.

setTimeout을 사용하지 않는 이유는 무엇일까요?



현대 브라우저는 중첩된 setTimeout 호출을 다섯 번 이상으로 간주하며 그 최소 지연 시간을 4밀리초로 설정하므로 충분히 정밀하지 않습니다.

# 알고리즘

React는 계속 발전하고 있으므로 제가 설명하는 알고리즘들이 최신이 아닐 수 있지만, 이는 React의 기본 원리를 이해하는 데 충분합니다.

React 패키지가 매우 큰 이유 중 하나입니다.



다음은 작업 단위 간 연결을 보여주는 다이어그램입니다:

![work-units-connections](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_6.png)

React에서 각 작업 단위는 Fiber 노드라고 불립니다. 이들은 연결 리스트와 유사한 구조를 사용하여 서로 연결되어 있습니다:

- child: 부모 노드에서 첫 번째 자식 요소로의 포인터.
- return/parent: 모든 자식 요소는 부모 요소로 돌아가는 포인터를 가지고 있습니다.
- sibling: 첫 번째 자식 요소에서 다음 형제 요소로의 포인터가 있습니다.



위의 데이터 구조가 구축되면 구체적인 구현을 살펴보겠습니다.

단순히 렌더 로직을 확장하여 workLoop -` performUnitOfWork -` reconcileChildren -` commitRoot 호출 시퀀스를 재구성합니다.

- workLoop: requestIdleCallback을 계속 호출하여 유휴 시간을 가져옵니다. 현재 유휴 상태이고 실행할 unit 작업이 있는 경우 각 unit 작업을 실행합니다.
- performUnitOfWork: 특정 unit 작업을 수행합니다. 이는 연결 리스트 아이디어의 구현입니다. 구체적으로 한 번에 하나의 Fiber 노드만 처리하고 처리할 다음 노드를 반환합니다.
- reconcileChildren: 실제로 가상 DOM을 비교하고 변경 사항을 기록하는 현재 Fiber 노드를 조정합니다. 이제 JavaScript 객체의 수정만 있는 것이므로 실제 DOM에는 영향을 주지 않고 각 Fiber 노드에 직접 수정 및 저장했다는 것을 볼 수 있습니다.
- commitRoot: 현재 업데이트가 필요하고 (wipRoot에 따라) 다음 unit 작업을 처리해야 할 필요가 없는 경우 (!nextUnitOfWork에 따라), 가상 변경 사항을 실제 DOM에 매핑해야 합니다. commitRoot는 Fiber 노드의 변경에 따라 실제 DOM을 수정하는 것입니다.

이러한 접근으로 Fiber 아키텍처를 실제 DOM 업데이트에 인터럽트 할 수 있지만 아직 트리거가 부족합니다.



# 업데이트 트리거

React에서 가장 일반적인 트리거는 useState로, 가장 기본적인 업데이트 메커니즘이에요. 저희 Fiber 엔진을 발화하기 위해 이를 구현해봅시다.

여기 구체적인 구현이 있는 간단한 함수입니다:

![Function implementation](/assets/img/2024-05-14-BuildYourOwnReactjsin400LinesofCode_7.png)



훅의 상태를 Fiber 노드에 지능적으로 유지하고 큐를 통해 상태를 수정하는 방식으로 작동합니다. 여기서 React 훅 호출의 순서를 변경해서는 안 되는 이유를 이해할 수 있습니다.

# 결론

비동기 및 중단 가능한 업데이트를 지원하는 React의 최소한의 모델을 구현했습니다. 의존성이 없으며 주석 및 유형을 제외하면 400줄 미만의 코드일 수 있습니다. 도움이 되었으면 좋겠습니다.

만약 이 내용이 도움이 되었다면, 웹 개발에 대한 자세한 통찰을 더 얻고 싶다면 제 뉴스레터 구독을 고려해보세요. 읽어 주셔서 감사합니다!