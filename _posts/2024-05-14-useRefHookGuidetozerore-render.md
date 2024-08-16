---
title: "useRef 훅 렌더링 제로로 가는 길 안내"
description: ""
coverImage: "/assets/img/2024-05-14-useRefHookGuidetozerore-render_0.png"
date: 2024-05-14 11:48
ogImage: 
  url: /assets/img/2024-05-14-useRefHookGuidetozerore-render_0.png
tag: Tech
originalTitle: "useRef Hook: Guide to zero re-render"
link: "https://medium.com/@omkarbhavare2406/useref-hook-guide-to-zero-re-render-49c9f451b1cf"
isUpdated: true
---




리액트는 사용자 인터페이스를 구축하기 위한 인기 있는 자바스크립트 라이브러리로, 응용 프로그램의 문서 객체 모델(DOM)을 효과적으로 관리하는 중요한 useRef라는 강력한 후크를 제공합니다. 이 안내서에서는 useRef가 무엇인지, 어떻게 효과적으로 사용하는지, 그리고 실제 시나리오에서의 다양한 응용 방법을 살펴볼 것입니다.

![이미지](/assets/img/2024-05-14-useRefHookGuidetozerore-render_0.png)

# useRef 소개:

useRef 후크는 리액트의 기본 요소로, 개발자가 ref라고 불리는 변경 가능한 객체를 만들 수 있게 합니다. 상태 변수와 달리 ref는 값이 변경되어도 다시 렌더링을 유발하지 않습니다. useRef의 주요 목적은 DOM에 직접 액세스하고 상호 작용하는 것으로, 개발자가 포커스를 관리하고 양식을 처리하며 애니메이션을 효과적으로 다룰 수 있도록 합니다.



```js
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  // ref 객체 생성
  const myRef = useRef();

  // ref를 React 요소에 연결
  useEffect(() => {
    myRef.current.innerText = '안녕하세요, useRef!';
  }, []);

  return <div ref={myRef}></div>;
}
```

이 예제에서는 useRef를 사용하여 ref를 생성하고 div 요소에 연결합니다. useEffect 훅은 컴포넌트가 마운트될 때 div의 inner text를 설정하는 데 사용됩니다.

```js
import React, { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.innerText =
      "useRef의 초기 값은 useEffect가 초기 렌더링 시 실행되어 업데이트됩니다.";
  }, []);

  const focusInput = () => {
    // DOM 요소 직접 액세스 및 수정
    inputRef.current.innerText = "focusInput 호출됨";
  };

  const focusOutput = () => {
    // DOM 요소 직접 액세스 및 수정
    inputRef.current.innerText = "focusOutput 호출됨";
  };

  return (
    <div>
      <div ref={inputRef} className="mb-4 p-2">
        {/* 필요시 inner text에 스타일링 추가 */}
      </div>

      <button onClick={focusInput} className="bg-violet-400 p-2 block mb-4">
        Focus Input 호출
      </button>
      <button onClick={focusOutput} className="bg-cyan-400 p-2 block">
        Focus Output 호출
      </button>
    </div>
  );
}

export default App;
```

<img src="https://miro.medium.com/v2/resize:fit:1200/1*eTiF-2EjQFlx-u22tEPdpA.gif" />




## 최선의 실천방법:

직접 DOM 조작을 피하세요: Refs는 DOM에 직접 액세스를 제공하지만 가능한 경우 React의 선언적 접근을 사용하는 것이 좋습니다.

적절한 정리를 보장하세요: 컴포넌트 내에서 ref를 생성한 후에 해당 컴포넌트를 DOM에서 제거하면 메모리 누수를 방지하기 위해 ref를 정리해야 합니다.

## 실제 적용 사례:



## 서드파티 라이브러리 관리: 직접 DOM 조작이 필요한 서드파티 라이브러리 통합 시, useRef는 유용한 도구가 될 수 있어요.

성능 최적화: 다시 렌더링을 유발하지 않고 렌더링 간 값 유지가 필요한 경우, useState 대신 useRef를 사용하면 성능상 이점을 제공할 수 있어요.

## 다른 훅들과 비교:

useState: 업데이트될 때 다시 렌더링을 유발하는 상태를 관리하는 경우 useState를 사용하세요.



`useEffect`을 사용할 때는 부가 효과와 라이프사이클 메소드에 주로 사용되지만, `useRef`는 DOM에 직접 접근하고 상호 작용하는 데 중점을 둡니다.

# FAQ

## React에서 useRef 훅의 주요 용도는 무엇인가요?

`useRef`는 주로 React 컴포넌트에서 DOM에 직접 접근하고 상호 작용하는 데 사용됩니다.



## useRef 객체의 주요 속성은 무엇이며 어떻게 접근할 수 있나요?

주요 속성은 current이며 ref.current 구문을 통해 접근할 수 있습니다.

## useRef와 useState의 다른 점은 무엇인가요?

반면에 ref.current 값을 수정해도 다시 렌더링을 일으키지 않습니다. useRef는 컴포넌트가 다시 렌더링되지 않고도 값의 지속성을 유지하고 싶을 때 유용합니다.



📚이전 포스트:

👉 React Hooks: useState & useEffect
👉 React 함수형 컴포넌트와 Hooks 이해하기
👉 useContext Hooks를 활용한 React 상태 관리 재고
👉 React Props 언플러그드: 데이터 흐름 해제하기

🔍 다음에는:

👉 useLayoutEffect Hook
👉 useMemo Hook
👉 useCallback Hook



웹 개발 세계에서 더 많은 통찰력을 기대해주세요! 🚀📦

🤝 LinkedIn에서 함께해요: [LinkedIn 프로필 링크](https://www.linkedin.com/in/omkarbhavare/)