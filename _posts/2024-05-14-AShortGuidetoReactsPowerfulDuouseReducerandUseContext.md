---
title: "React의 강력한 콤비 useReducer와 useContext에 대한 간단한 안내"
description: ""
coverImage: "/assets/img/2024-05-14-AShortGuidetoReactsPowerfulDuouseReducerandUseContext_0.png"
date: 2024-05-14 11:15
ogImage: 
  url: /assets/img/2024-05-14-AShortGuidetoReactsPowerfulDuouseReducerandUseContext_0.png
tag: Tech
originalTitle: "A Short Guide to React’s Powerful Duo : useReducer and UseContext"
link: "https://medium.com/@seb_5882/a-short-guide-to-reacts-powerful-duo-usereducer-and-usecontext-23cea6f9ab35"
---


<img src="/assets/img/2024-05-14-AShortGuidetoReactsPowerfulDuouseReducerandUseContext_0.png" />

useReducer과 useContext는 React에서 함께 사용하여 전체 애플리케이션의 상태를 관리하는 강력한 두 가지 훅입니다. useReducer는 복잡한 상태 전환을 더 예측 가능하고 관리하기 쉽게 처리할 수 있는 방법을 제공하며, useContext는 각 레벨을 통해 수동으로 props를 전달하지 않아도 컴포넌트 트리로 데이터를 전달할 수 있도록 해주어 데이터를 전역적으로 사용할 수 있게 합니다.

이 블로그에서는 현재 알고 있는 코드 최적화 방법을 적용할 것입니다.

앱에서 "context"라는 폴더를 생성하고 그 폴더 안에 "IncrementContext"라는 파일을 생성하세요.



```js
import { createContext, useContext, useReducer } from 'react';

// 상태를 보유하는 컨텍스트 생성
const IncrementContext = createContext();

// 초기 상태 정의
const initialState = {
  count: 0
};
```



위의 코드 스니펫에서는 세 가지 리액트 훅, createContext, useContext 및 useReducer를 import했습니다.

- CreateContext는 상태를 보유하는 컨텍스트를 생성하는 데 사용됩니다.
- useContext는 컨텍스트를 호출하는 데 사용됩니다.
- useReducer는 상태 변수와 기능을 관리하는 데 사용됩니다.

또한 key-value 쌍인 count를 기본 값 0으로 가진 initialState 객체를 선언했습니다.

이 코드를 useReducer 훅에 전달하여 기능을 구축할 것입니다.



2. 리듀서 함수 작성하기

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// 리듀서와 초기 상태(initialState)와 함께 사용할 컴포넌트를 useReducer 훅 안에 선언할 것입니다.

// IncrementProvider 내부에 선언될 것입니다.
const [state, dispatch] = useReducer(reducer, initialState);
```

리듀서 함수는 현재 상태와 액션 객체를 받아들여 액션의 유형 및 페이로드를 기반으로 새 상태를 반환하는 순수 함수입니다. 이는 React 애플리케이션에서 복잡한 상태 로직을 관리하기 위해 useReducer 훅과 함께 사용됩니다. 리듀서 함수는 현재 상태를 직접 수정하는 대신 항상 새 상태 객체를 반환해야 합니다.

제공된 코드 스니펫에서 리듀서 함수는 현재 상태 객체와 형식(type) 속성이 있는 액션 객체를 받아들입니다. 액션 타입에 따라 리듀서는 count 속성이 증가하거나 감소한 새로운 상태 객체를 반환합니다. 액션 유형이 인식되지 않으면, 리듀서는 잘못된 액션이 전송되었음을 나타내기 위해 오류를 throw합니다.



3. 콘텍스트 프로바이더 작성 및 데이터를 전역적으로 접근 가능하게 만들기

```js
// 리듀서와 초기 상태에 모두 액세스하려면 useReducer를 사용합니다.
const IncrementProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IncrementContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </IncrementContext.Provider>
  );
}

// IncrementProvider를 사용하여 index.js에서 전체 애플리케이션을 래핑합니다.
// 이렇게 하면 콘텍스트 객체를 전역적으로 액세스할 수 있게 됩니다.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IncrementProvider>
      <App />
    </IncrementProvider>
  </React.StrictMode>
);
```

IncrementProvider는 useReducer를 사용하여 상태를 관리하고 createContext를 사용하여 콘텍스트를 생성하는 사용자 정의 프로바이더 컴포넌트입니다. 프로바이더 컴포넌트는 props를 인수로 받아 자식 컴포넌트를 래핑하는 프로바이더 컴포넌트를 반환합니다.

프로바이더 컴포넌트는 IncrementContext.Provider를 사용하여 상태와 디스패치 함수를 컨텍스트를 통해 자식 컴포넌트에 제공합니다. 이를 위해 IncrementContext.Provider에 값을 전달하여 상태와 디스패치 함수가 포함된 객체를 전달합니다.



예제 코드에서 IncrementProvider는 index.js 파일에서 App 컴포넌트를 감싸고 있습니다. 이렇게 함으로써 상태와 디스패치 함수를 App 컴포넌트의 모든 하위 컴포넌트에서 사용할 수 있게 됩니다.

IncrementProvider로 전체 애플리케이션을 감싸면 모든 컴포넌트가 상태에 액세스하고 수정을 위한 액션을 디스패치할 수 있도록 보장합니다. 이는 React 애플리케이션에서 컨텍스트와 useReducer 훅을 사용하여 전역 상태를 관리하는 일반적인 패턴입니다.

4. 컴포넌트에서 데이터에 액세스

```js
import { useIncrementContext } from 'IncrementContext'

const MyComponent = () => {
  // useContext를 사용하여 컨텍스트를 호출할 필요가 없습니다
  // useIncrementContext 함수를 작성하여 컨텍스트를 호출하였기 때문입니다
  const { state, dispatch } = useIncrementContext()

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```



`useIncrementContext`은 `IncrementContext.Provider`에서 생성된 컨텍스트를 소비하는 데 사용되는 사용자 정의 후크입니다. 이 후크는 `useContext` 후크를 사용하는 보일러플레이트 코드를 추상화하여 컨텍스트 값을 쉽게 액세스할 수 있도록 돕습니다.

예시 코드에서 `useIncrementContext`는 `IncrementContext` 파일에서 가져옵니다. `MyComponent` 컴포넌트는 `useIncrementContext` 후크를 사용하여 컨텍스트에서 상태 및 디스패치 함수에 액세스합니다.

`useIncrementContext` 후크를 사용함으로써 컴포넌트에서 `useContext` 후크를 직접 사용할 필요가 없습니다. 대신 `useIncrementContext` 함수를 호출하여 컨텍스트에서 상태 및 디스패치 함수에 액세스할 수 있습니다.

`MyComponent` 컴포넌트는 상태 객체에서 현재 카운트 값을 보여주는 단락을 렌더링합니다. 또한 클릭할 때 증가 또는 감소 액션을 디스패치하는 두 개의 버튼을 렌더링합니다.



이 코드 스니펫은 React 컴포넌트에서 컨텍스트 값을 사용하기 위한 사용자 정의 훅을 어떻게 사용하는지 보여줍니다. 컨텍스트를 사용하는 과정을 간단하게 만들어주며 응용 프로그램의 여러 컴포넌트에서 상태와 디스패치 기능에 쉽게 액세스할 수 있습니다.

이 블로그가 도움이 되기를 바라요!

Github : https://github.com/DevgenX