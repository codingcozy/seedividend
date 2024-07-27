---
title: "React에서 Lazy Loading의 내부 작동 원리 이해하기"
description: ""
coverImage: "/assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_0.png"
date: 2024-06-27 17:56
ogImage: 
  url: /assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_0.png
tag: Tech
originalTitle: "Under the Hood of Lazy Loading in React"
link: "https://medium.com/@princybhalu11/under-the-hood-of-lazy-loading-in-react-a758fe89686f"
---


우리와 함께 게으른 로딩의 세계로 들어가보세요! 이 블로그에서는 게으른 로딩 뒤에 숨겨진 비밀을 밝혀내며, 이 똑똑한 기술이 앱의 성능을 최적화하는 방법을 안내해 드릴 거에요. 리액트가 어떻게 구성 요소를 동적으로 로드하고 사용자 경험을 향상시키는 지 살펴보며 함께 재미있게 탐험해 봐요. 당신의 앱 속도와 효율을 높이기 준비가 되셨나요? 함께 시작해봅시다!

# 게으른 로딩이란?

게으른 로딩은 이미지와 같은 웹페이지의 일부를 필요할 때까지 로딩을 지연시키는 기술입니다. 모든 것을 한 번에 로딩하는 것이 아니라(열렬한 로딩), 브라우저는 사용자가 스크롤하거나 해당 부분과 상호 작용할 때에만 리소스를 요청합니다. 이는 웹페이지의 빠른 로딩과 성능 향상에 도움이 됩니다.

# 왜 게으른 로딩이 필요할까요?

<div class="content-ad"></div>

리액트에서는 일반적으로 전체 코드가 번들링되어 한꺼번에 배포됩니다. 이는 성능에 큰 영향을 미치지 않기 때문에 작은 Single Page Applications (SPAs)에 대해 잘 작동합니다. 그러나 고객 및 관리자 포턄을 따로 두는 콘텐츠 관리 시스템과 같은 대규모 애플리케이션의 경우, 한꺼번에 모든 것을 로딩하는 것은 효율적이지 않습니다. 이는 불필요한 데이터 전송으로 이어져 웹사이트 로딩이 느려지게 됩니다. 고객은 관리자 기능이 필요 없으므로 이를 로딩하는 것은 메모리와 시간을 낭비하게 됩니다.

# 리액트에서 어떻게 lazy loading을 구현할까요?

리액트에서 lazy loading을 구현하려면 React.lazy 함수와 Suspense 컴포넌트를 함께 사용할 수 있습니다. 다음은 이를 어떻게 할 수 있는지 설명하는 간단한 예시입니다:

- 리액트와 필요한 컴포넌트를 가져오기:

<div class="content-ad"></div>

```js
import React, { Suspense, lazy } from 'react';
```

2. 
적게 로드되는 구성 요소를 정의하십시오:

구성 요소를 직접 가져 오는 대신 React.lazy를 사용하여 게으르게로드하십시오.

```js
const LazyComponent = lazy(() => import('./LazyComponent'));
```

<div class="content-ad"></div>

3. `Suspense`로 지연로드된 컴포넌트 감싸기:

지연로드된 컴포넌트를 가져오는 동안 로딩 스피너와 같은 대체 UI를 제공하도록 `Suspense` 컴포넌트를 사용하세요.

```js
function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

완성된 예시는 여기에 있습니다:

<div class="content-ad"></div>

```js
import React, { Suspense, lazy } from 'react';

// 컴포넌트의 Lazy로딩
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

이 예시에서 LazyComponent는 필요할 때만 로드되어서 애플리케이션의 초기 로드 시간을 단축시킵니다. Suspense 컴포넌트는 LazyComponent가 로드될 때까지 대체 UI(이 경우 간단한 "로딩 중..." 메시지)를 보여줍니다.

# 내부적으로 Lazy Loading은 어떻게 작동하나요?

우선, 이 주제에서 React 내부에서 어떻게 Lazy Loading이 설정되는지 설명하겠습니다. 이 주제를 잘 이해하기 위해서는 Fiber 노드와 그 속성에 익숙해져야 합니다.

<div class="content-ad"></div>

더 많은 정보를 원하시면 Fiber 노드에 관한 이 기사를 참조해보세요: React에서 Virtual DOM 구조 이해하기.

여기에서 다이어그램은 레이지 로딩이 추가되었을 때 Fiber 노드 트리가 어떻게 작동하는지, 동적 import promise가 실행되는 방식, 그리고 폴백이 표시되는 방식을 보여줍니다.

![다이어그램](/assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_0.png)

Suspense Fiber 노드: 이 노드는 동적 import의 promise를 포함하는 WeakSet을 추적합니다.

<div class="content-ad"></div>

예시: import('./LazyComponent')로 생성된 promise;

React.offScreen 노드: 이 노드는 나태한 promise를 추적하여 해결되었는지 여부를 결정합니다. 이 노드에서는 보류 중인 결과를 promise에서 기다립니다.

![](/assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_1.png)

_payload 프로퍼티에서 _result는 promise(동적 import)이 포함되어 있으며, _status에는 promise의 상태(예: 0은 대기 중)가 포함됩니다.

<div class="content-ad"></div>

Fallback Div Node: 만약 프라미스가 보류 상태인 경우, 대체 div가 표시됩니다. 이 대체 div는 React.offScreen의 형제 포인터에서 나옵니다.

프라미스가 해결될 때 실제 컴포넌트가 표시되는 과정에 대한 설명입니다.

![이미지](/assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_2.png)

Suspense 노드: WeakSet은 프라미스를 추적하며, 프라미스가 해결되면 세트가 비워집니다.

<div class="content-ad"></div>

React.offScreen 노드: 이 노드는 실제 구성 요소를 표시하도록 값을 업데이트합니다. 형제 포인터를 null로 설정하고 실제 구성 요소를 자식 포인터로 설정합니다. 대기 중인 props가 변경되어 memorizedProps 와 동일해집니다.

그리고 Pending props가 변경되고 memorized props 와 동일해집니다.

![이미지](/assets/img/2024-06-27-UndertheHoodofLazyLoadinginReact_3.png)

약속이 이행되면: _result 속성에는 실제 모듈이 저장됩니다. _status 속성은 약속이 오류 없이 이행되었음을 나타내는 1로 설정됩니다.

<div class="content-ad"></div>

# 만약 지연 컴포넌트가 사용되지 않는다면?

만약 지연 컴포넌트가 사용되지 않는다면, React.offScreen 노드가 트리에 생성되지 않고 프로미스가 실행되지 않습니다. 따라서 추가 작업이 수행되지 않습니다.

# 요약

- 프로미스가 해결되면, 실제 컴포넌트가 React.offScreen 노드를 업데이트하여 표시됩니다.
- 지연 컴포넌트를 사용하지 않는 경우, 추가 노드나 프로미스가 생성되거나 실행되지 않습니다.