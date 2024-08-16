---
title: "모든 React 훅들 간단 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "All React hooks in one short"
link: "https://medium.com/@AbidKazmi/all-react-hooks-in-one-short-4b0ed4b5a6e4"
isUpdated: true
---





![img](/assets/img/AllReacthooksinoneshort_0.png)

리액트 훅은 함수형 컴포넌트에 상태 및 기타 기능을 추가할 수 있는 리액트의 강력한 기능입니다. 이들은 React 16.8에서 소개되었으며 그 이후로 React 개발의 필수 요소가 되었습니다. 이 블로그에서는 가장 일반적으로 사용되는 React 훅 몇 가지를 살펴보고 쉽게 이해할 수 있는 예제를 제공할 것입니다.

# 1: useState 훅

useState 훅을 사용하면 함수형 컴포넌트에 상태를 추가할 수 있습니다. 초기값을 인수로 전달하고 현재 상태 값과 해당 값을 업데이트하는 함수가 포함된 배열을 반환합니다.

<div class="content-ad"></div>

함수형 컴포넌트에 카운터를 추가하는 방법을 설명하는 예제입니다:

```js
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </div>
  );
}
```

이 예제에서는 0으로 시작하여 "증가" 및 "감소" 버튼을 클릭할 때마다 업데이트됩니다.

# 2: useEffect 훅

<div class="content-ad"></div>

`useEffect` 훅을 사용하면 함수형 컴포넌트에서 부작용을 수행할 수 있습니다. 부작용에는 API에서 데이터를 가져오기, DOM을 업데이트하기, 이벤트를 구독하기 등이 포함될 수 있습니다.

아래는 API에서 데이터를 가져오는 방법을 보여주는 `useEffect`의 예제입니다:

```js
import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

이 예제에서는 API에서 데이터를 가져와서 `setData` 함수를 사용하여 컴포넌트의 상태를 업데이트합니다.

<div class="content-ad"></div>

# 3: useContext 훅

useContext 훅은 함수형 컴포넌트에서 컨텍스트 객체에 접근할 수 있게 해줍니다. 컨텍스트는 props를 수동으로 전달하지 않고 컴포넌트 트리를 통해 데이터를 전달하는 방법입니다.

다음은 useContext를 사용하여 테마 컨텍스트에 접근하는 예시입니다:

```js
import React, { useContext } from "react";

const ThemeContext = React.createContext("light");

function ThemeButton() {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{
        background: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      테마 변경
    </button>
  );
}
```

<div class="content-ad"></div>

이 예시에서는 "light"라는 기본 값을 가진 테마 컨텍스트를 만들고 useContext 훅을 사용하여 ThemeButton 컴포넌트에서 액세스합니다.

# 4: useReducer 훅

useReducer 훅을 사용하면 함수형 컴포넌트에서 복잡한 상태를 관리할 수 있습니다. useState 훅과 유사하지만 단순한 값 대신에 리듀서 함수와 초기 상태를 사용합니다.

쇼핑 카트를 관리하기 위해 useReducer를 사용하는 예시가 여기 있습니다:

<div class="content-ad"></div>

```js
import React, { useReducer } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => {
    dispatch({ type: "add", payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: "remove", payload: item });
  };

  return (
    <div>
      <h2>장바구니</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item)}>제거</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem({ id: 1, name: "상품 1", price: 9.99 })}>
        상품 추가
      </button>
    </div>
  );
}
```

이 예제에서는 cartReducer 함수를 정의하여 state 및 action을 받아들이고 action 유형에 따라 새 상태를 반환하는 방법을 정의합니다. 그런 다음 useReducer 훅을 사용하여 cartReducer 함수를 사용하여 cart 상태를 관리합니다.

또한 addItem 및 removeItem 두 함수를 정의하여 cartReducer에 작업을 디스패치하여 장바구니 상태에서 항목을 추가하거나 제거합니다.

마지막으로 장바구니 항목과 항목을 추가하거나 제거할 수 있는 버튼이 있는 쇼핑 카트를 렌더링합니다. 버튼이 클릭되면 useReducer 훅을 통해 반환된 dispatch 함수를 사용하여 카트 상태를 업데이트하기 위해 addItem 또는 removeItem 함수가 호출됩니다.

<div class="content-ad"></div>

# 5: useCallback 훅

useCallback 훅을 사용하면 함수를 메모이즈하여 해당 함수의 종속성이 변경될 때만 다시 생성되도록 할 수 있습니다. 이를 통해 불필요한 다시 렌더링을 방지하여 성능을 향상시킬 수 있습니다.

useCallback을 사용하여 함수를 메모이즈하는 방법의 예시는 다음과 같습니다:

```js
import React, { useState, useCallback } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleQueryChange = useCallback(
    (event) => {
      setQuery(event.target.value);
      onSearch(event.target.value);
    },
    [onSearch]
  );

  return <input type="text" value={query} onChange={handleQueryChange} />;
}
```

<div class="content-ad"></div>

이 예에서는 onSearch 프로퍼티 함수를 사용하는 SearchBar 컴포넌트를 정의합니다. useCallback 훅을 사용하여 handleQueryChange 함수를 메모이제이션하여 onSearch 함수가 변경될 때만 다시 생성되도록합니다.

## 6: useMemo 훅

useMemo 훅을 사용하면 값이 의존성이 변경될 때만 다시 계산되도록 값을 메모이제이션 할 수 있습니다. 이를 통해 불필요한 다시 계산을 방지하여 성능을 향상시킬 수 있습니다.

useMemo를 사용하여 계산된 값을 메모이제이션하는 방법에 대한 예시는 다음과 같습니다:

<div class="content-ad"></div>

```js
import React, { useState, useMemo } from "react";

function ExpensiveCalculation({ a, b }) {
  const result = useMemo(() => {
    console.log("계산 중...");
    return a * b;
  }, [a, b]);

  return <p>결과: {result}</p>;
}
```

이 예제에서는 두 개의 props인 a와 b를 받는 ExpensiveCalculation 컴포넌트를 정의합니다. 계산 결과를 메모이제이션하기 위해 useMemo 훅을 사용하여 a 또는 b가 변경될 때만 다시 계산됩니다.

# 7: useRef 훅

useRef 훅을 사용하면 컴포넌트의 수명 동안 지속되는 변경 가능한 ref 객체를 생성할 수 있습니다. 다시 렌더링을 유발하지 않는 값들을 저장하고 액세스하는 데 사용할 수 있습니다.

<div class="content-ad"></div>

아래 예시는 useRef를 사용하여 입력 요소의 값을 액세스하는 방법을 보여줍니다:

```js
import React, { useRef } from "react";

function InputWithFocus() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

이 예시에서는 useRef 훅을 사용하여 ref 객체를 생성하고 input 요소에 연결하는 InputWithFocus 컴포넌트를 정의합니다. ref 객체를 사용하여 "Focus Input" 버튼을 클릭했을 때 입력에 초점을 맞춥니다.

# 8: useLayoutEffect 훅

<div class="content-ad"></div>

useLayoutEffect 훅은 useEffect와 유사하지만 모든 DOM 변이 후 동기적으로 실행됩니다. 이는 컴포넌트가 렌더링된 직후 DOM을 조작하는 데 유용합니다.

다음은 요소의 크기를 측정할 때 useLayoutEffect를 사용하는 예시입니다:

```js
import React, { useState, useLayoutEffect, useRef } from "react";

function ResizableBox() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(boxRef.current.clientWidth);
      setHeight(boxRef.current.clientHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{ width: "50%", height: "50%", backgroundColor: "red" }}
    >
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

이 예시에서는 resizableBox 컴포넌트를 정의하고, useLayoutEffect 훅을 사용하여 div 요소의 크기를 측정합니다. 그런 다음 크기 값을 사용하여 상자의 너비와 높이를 렌더링합니다. 훅은 창 크기 조정 시 사이즈 값을 업데이트하기 위해 크기 이벤트 리스너를 추가하고 제거합니다.

<div class="content-ad"></div>

# 9: useDebugValue 훅

useDebugValue는 React DevTools에서 사용자 정의 훅에 대한 디버깅 정보를 표시할 수 있는 훅입니다. 이는 훅을 디버깅하고 무엇이 뒤에서 일어나고 있는지 이해하는 데 유용할 수 있습니다.

다음은 useDebugValue를 사용하는 예시입니다:

```js
import { useState, useEffect, useDebugValue } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  useDebugValue(data ? `데이터 로드됨: ${data.length} 항목` : "로딩 중...");

  return data;
}
```

<div class="content-ad"></div>

이 예시에서는 URL에서 데이터를 가져와 반환하는 useFetch라는 사용자 정의 훅을 정의합니다. useDebugValue 훅을 사용하여 React DevTools에 사용자 정의 디버깅 메시지를 표시합니다. 데이터가 로드된 경우 데이터 항목 수를 포함하는 메시지를 표시합니다. 데이터가 아직 로드 중인 경우 "로드 중..."이라는 메시지를 표시합니다.

컴포넌트에서 useFetch 훅을 사용할 때 React DevTools에 사용자 정의 디버깅 메시지가 표시됩니다. 이는 무슨 일이 벌어지고 있는지 이해하고 발생할 수있는 문제를 해결하는 데 도움이 될 수 있습니다.

useDebugValue 훅은 디버깅 목적으로만 사용해야하며 사용자 정의 훅의 동작에는 영향을 미치지 않아야합니다. 사용자 정의 훅 작업 시 디버깅 도구 상에 좋은 도구입니다.

# 10: useImperativeHandle 훅

<div class="content-ad"></div>

`useImperativeHandle` 훅을 사용하면 ref를 사용할 때 부모 컴포넌트에 노출되는 인스턴스 값을 사용자 정의할 수 있습니다. 이를 통해 자식 컴포넌트의 내부 구현 세부 정보를 모두 노출하고 싶지 않을 때 유용할 수 있습니다.

`useImperativeHandle`를 사용하는 예제입니다:

```js
import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    value: inputRef.current.value,
  }));

  return <input type="text" ref={inputRef} placeholder={props.placeholder} />;
});

function App() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <Input ref={inputRef} placeholder="여기에 입력하세요" />
      <button onClick={handleClick}>입력란에 초점 맞추기</button>
    </div>
  );
}
```

이 예제에서는 `useImperativeHandle`을 사용하여 ref를 사용할 때 부모 컴포넌트에 노출될 focus 메서드와 value 속성을 가진 사용자 지정 Input 컴포넌트를 정의했습니다. `useImperativeHandle` 훅은 ref 객체와 부모 컴포넌트에 노출될 속성 및 메서드를 반환하는 콜백 함수 두 가지 인수를 사용합니다.

<div class="content-ad"></div>

앱 컴포넌트에서 Input 컴포넌트를 사용하고 ref 객체를 전달합니다. 또한 클릭 시 inputRef 객체의 focus 메서드를 호출하는 handleClick 함수를 정의합니다.

이 코드를 실행하면 플레이스홀더 텍스트가 있는 입력 필드와 “입력에 초점 맞추기”라는 버튼이 표시됩니다. 버튼을 클릭하면 inputRef 객체의 focus 메서드가 호출되어 입력 필드가 초점을 맞춥니다.

요약하면 useImperativeHandle 훅을 사용하면 ref를 사용할 때 부모 컴포넌트에 노출되는 인스턴스 값을 사용자 정의할 수 있습니다. 자식 컴포넌트의 내부 구현 세부 정보를 모두 노출하고 싶지 않을 때 부모 컴포넌트에 특정 인터페이스를 제공해야 할 때 유용합니다.

# 요약

<div class="content-ad"></div>

- "강력한 React 훅을 사용하면 웹 개발을 더 나은 수준으로 끌어올려 효율적이고 효과적인 애플리케이션을 만들 수 있어요."
- "useReducer로 상태를 관리하거나 useMemo 및 useCallback을 사용해 성능을 최적화하는 등, 이러한 React 훅은 개발자들에게 혁신을 가져다 줍니다."
- "경험이 풍부한 React 개발자든, 막 시작한 개발자든, 이 훅은 코드를 간소화하고 성능을 향상시키며 사용자 경험을 향상시킬 수 있어요."
- "useDebugValue와 useImperativeHandle과 같은 React 훅의 최대 잠재력을 활용하여 코드를 최적화하고 유지보수 및 확장 가능성을 향상시킬 수 있어요."
- "요약하자면, React 훅은 모든 개발자가 갖추어야 할 강력한 도구입니다. 프로젝트에 이러한 훅을 통합함으로써 더 나은, 빠르고 반응성 있는 웹 애플리케이션을 만들 수 있어요."

# 마음에 드시면 좋아요와 팔로우 부탁드려요.
