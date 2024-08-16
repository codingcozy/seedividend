---
title: "고통 없는 리액트 다시 렌더링 피하기와 의존성 간소화하기"
description: ""
coverImage: "/assets/img/2024-05-14-ReactwithoutPainAvoidRe-RendersandSimplifyDependencies_0.png"
date: 2024-05-14 14:04
ogImage: 
  url: /assets/img/2024-05-14-ReactwithoutPainAvoidRe-RendersandSimplifyDependencies_0.png
tag: Tech
originalTitle: "React without Pain: Avoid Re-Renders and Simplify Dependencies"
link: "https://medium.com/@lahmataja-pa4vara/react-without-pain-avoid-re-renders-and-simplify-dependencies-6f731b75e288"
isUpdated: true
---





![React without Pain: Avoid Re-Renders and Simplify Dependencies](/assets/img/2024-05-14-ReactwithoutPainAvoidRe-RendersandSimplifyDependencies_0.png)

React에서 다시 렌더링을 추적하는 것은 고통스러운 과정일 수 있습니다. Fine-grain 반응성 패턴은 이 문제를 완전히 제거하는 해결책을 제공하여 React 엔지니어가 종속성을 추적하는 것을 잊고 코드 작성에 집중할 수 있게 합니다. 이 기사에서는 라이브러리 Mlyn이 종속성 관리를 간단하게 하고 React 애플리케이션에서 불필요한 다시 렌더링을 방지하는 방법을 살펴보겠습니다.

# 종속성 관리: 공통 문제

기존의 React 애플리케이션에서 상태와 종속성을 관리하는 것은 종종 복잡하고 오류가 발생하기 쉬운 코드로 이어질 수 있습니다. 이 문제를 설명하기 위해 간단한 카운터 예제를 살펴보겠습니다.




# 전통적인 리액트 예제

```js
import React, { useState, useCallback } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  const onIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, [count]); // count에 의존
  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={onIncrement}>증가</button>
    </div>
  );
};
export default Counter;
```

# 의존성 문제

이 예제에서 onIncrement 함수는 count를 의존성으로 하는 useCallback으로 래핑되어 있습니다. count가 변경될 때마다 onIncrement가 다시 생성됩니다.



# Mlyn과 함께 간단하게

Mlyn은 세부적인 반응성을 소개하여 의존성을 걱정하지 않고 상태 업데이트를 관리할 수 있습니다. Mlyn을 사용하여 동일한 예제를 다시 작성해 봅시다.

# Mlyn 예제

```js
import React, { useCallback } from "react";
import { rc, useSubject } from "mlyn/react";
const Counter = rc(() => {
  const state = useSubject({ count: 0 });
  const increment = useCallback(() => {
    state.count(state.count() + 1);
  }, []);
  return (
    <div>
      <h1>Count: {state.count()}</h1>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
});

export default Counter;
```  



state.count의 참조가 변경되지 않기 때문에 useCallback에서 해당 값을 다시 만들지 않고도 읽을 수 있습니다.

# 정교한 Reactivity의 장점

- Stable Callbacks: Mlyn의 onIncrement 함수는 state.count를 의존성으로 필요로하지 않습니다. 이러한 안정성은 함수의 불필요한 재생성을 방지합니다. 그리고 onIncrement의 소비자들은 count가 변경되어도 다시 렌더링되지 않습니다.
- 단순화된 코드: Mlyn을 사용하면 종속성을 수동으로 추적할 필요가 없습니다.

# IncrementButton 추출: 다시 렌더링에 대한 더 깊은 이해



Let’s extract the increment button into theIncrementButton component to understand how Mlyn’s approach prevents unnecessary re-renders.

# Traditional React: Re-Rendering Issue

In the traditional example, IncrementButton re-renders every time count changes because increment is a new function reference each time.

```js
const IncrementButton = React.memo(({ onIncrement }) => {
  console.log("IncrementButton re-rendered");
  return (
    <div>
      <button onClick={onIncrement}>Increment from Child</button>
    </div>
  );
});

const Counter = () => {
  const [count, setCount] = useState(0);
  const onIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, [count]); // Dependency on count
  return (
    <div>
      <h1>Count: {count}</h1>
      <IncrementButton onIncrement={onIncrement} />
    </div>
  );
};
```



# Mlyn: 불필요한 다시 렌더링 방지

Mlyn을 사용하면 onIncrement가 동일한 참조로 유지되어 IncrementButton이 불필요하게 다시 렌더링되지 않습니다. 이것은 섬세한 용량으로 반응하는 주요 장점입니다.

# 예제 재방문

```js
const Counter = rc(() => {
  const state = useSubject({ count: 0 });
  const onIncrement = useCallback(() => {
    state.count(state.count() + 1); // 어떤 종속성도 필요하지 않습니다
  }, []);
  return (
    <div>
      <h1>Count: {state.count()}</h1>
      <IncrementButton onIncrement={onIncrement} />
    </div>
  );
});
```



# 개요

Mlyn의 섬세한 리액티브는 상태 관리를 간단하게 만들어 줍니다:

- 의존성 추적이 필요 없어집니다: 수동으로 종속성을 업데이트할 필요 없이 더 깨끗하고 유지보수가 쉬운 코드를 작성할 수 있습니다.
- 불필요한 다시 렌더링 방지: 컴포넌트는 실제 상태나 프롭이 변경될 때만 다시 렌더링되어 성능과 효율성을 향상시킵니다.

Mlyn을 도입함으로써, React 엔지니어는 복잡한 상태 종속성을 관리하는 귀찮음 없이 기능이 풍부한 코드 작성에 집중할 수 있습니다. 다음 프로젝트에 Mlyn을 통합해보고 섬세한 리액티브의 편리함을 경험해보세요!



mlyn에 관심이 있다면, GitHub에서 확인해보세요: [https://github.com/vaukalak/mlyn](https://github.com/vaukalak/mlyn)