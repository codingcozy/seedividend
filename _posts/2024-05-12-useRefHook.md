---
title: "useRef 훅 "
description: ""
coverImage: "/assets/img/2024-05-12-useRefHook_0.png"
date: 2024-05-12 23:11
ogImage: 
  url: /assets/img/2024-05-12-useRefHook_0.png
tag: Tech
originalTitle: "useRef Hook"
link: "https://medium.com/@arunangshudas/reacts-useref-hook-62276bd9c534"
---


<img src="/assets/img/2024-05-12-useRefHook_0.png" />

웹 개발에서 React는 동적 사용자 인터페이스를 구축하는 데 사용되는 주요 라이브러리로 자리 잡았습니다. 각 버전마다 React는 개발 프로세스에 새로운 기능과 개선 사항을 도입하고 개발자들이 더 효율적이고 유지보수 가능한 코드를 생성할 수 있도록 돕습니다.

React 16.8에서 도입된 useRef 훅은 널리 사용되는 기능 중 하나입니다. 다른 Hooks와 함께 소개된 useRef는 다시 렌더링을 유발하지 않고 렌더링을 거칠 때마다 값이 유지되도록 하는 방법을 제공합니다.

# useRef란 무엇인가요?



리액트에서 useRef를 간단한 메모지로 생각해보세요. 이것은 웹 페이지에서 일어나는 일들을 추적하는 데 도움이 되며 다른 것들을 망가뜨리지 않게 도와줍니다. 버튼 클릭, 텍스트 상자에 입력 또는 전체 페이지를 새로 고침하지 않고 멋진 애니메이션을 추가하는 데 사용할 수 있어요. 포커스 관리, 애니메이션 및 지속적인 업데이트가 필요하지 않은 정보를 유지하는 데 유용합니다.


# 기본 사용법

useRef를 사용하는 것은 간단합니다. 기본 예제를 살펴보죠:

```js
import React, { useRef } from 'react';
const MyComponent = () => {
  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current.focus();
  };
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};
```



이 예시에서는 useRef 훅을 사용하여 ref를 생성하고 input 요소에 연결합니다. 버튼을 클릭하면 `handleFocus` 함수가 호출되고, `inputRef`를 사용하여 다시 렌더링되지 않고 input 요소에 포커스가 맞춰집니다.

# 이전 값 관리

useRef의 또 다른 강력한 측면은 렌더링 간 값의 지속성을 유지할 수 있는 능력입니다. 이는 상태 변수나 프롭의 이전 값을 저장하고 액세스해야 할 때 유용합니다.

```js
import React, { useRef, useEffect } from 'react';
const MyComponent = ({ value }) => {
 const prevValueRef = useRef();
useEffect(() => {
 prevValueRef.current = value;
 }, [value]);
return (
 <div>
 <p>현재 값: {value}</p>
 <p>이전 값: {prevValueRef.current}</p>
 </div>
 );
};
```



이 예시에서는 useRef 훅을 사용하여 `value` 프롭의 이전 값 저장합니다. `value` 프롭이 변경될 때마다 useEffect 훅에서 ref 값을 업데이트합니다. 이를 통해 재랜더링을 유발하지 않고 프롭의 이전 값을 액세스할 수 있습니다.

# 주의사항과 모범 사례

useRef는 강력한 도구지만, 그 한계와 모범 사례를 이해하는 것이 중요합니다:

1. Mutable Values: useRef는 가변 값을 저장할 수 있기 때문에, 특히 useEffect나 useCallback 훅 내에서 이 값을 수정할 때 주의해야 합니다. 값을 직접 변경하는 것은 예상치 못한 동작과 버그를 유발할 수 있습니다.



### 2. 직접 DOM 조작을 피하세요
useRef는 DOM 요소에 직접 접근하고 조작하는 데 일반적으로 사용됩니다. 그러나 가능한 경우 React의 선언적 접근 방식을 사용하는 것이 좋습니다. 직접 DOM 조작은 가급적으로 조심스럽게 사용해야 합니다.

### 3. 메모리 관리
useRef 값은 컴포넌트의 수명 주기 전체 동안 유지되므로 메모리 누수를 방지하려면 참조를 정리하는 것이 중요합니다. 이를 위해 정리 함수에서 ref 값을 null로 설정하거나 빈 종속성 배열을 사용하여 useEffect 내에서 useRef 훅을 사용할 수 있습니다.

# 결론

요약하면 useRef 훅은 React의 훅 중요한 요소로, 값 유지와 다시 렌더링을 유발하지 않고 직접 DOM 요소에 액세스하는 방법을 제공합니다.