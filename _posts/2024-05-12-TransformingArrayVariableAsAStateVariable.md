---
title: "배열 변수를 상태 변수로 변환하기"
description: ""
coverImage: "/assets/img/2024-05-12-TransformingArrayVariableAsAStateVariable_0.png"
date: 2024-05-12 18:51
ogImage: 
  url: /assets/img/2024-05-12-TransformingArrayVariableAsAStateVariable_0.png
tag: Tech
originalTitle: "Transforming Array Variable As A State Variable"
link: "https://medium.com/@ybairwa786/transforming-array-variable-as-a-state-variable-7db67cb43ce0"
---


```js
const demoArray = [
  { id: 0, name: "Yogesh", age: 24 },
  { id: 1, name: "Nitesh", age: 21 },
  { id: 2, name: "Hriday", age: 24 },
];
```

화면에 표시하거나 렌더링 목록 기술을 사용하여 배열 정보를 렌더링하는 컴포넌트를 만듭니다.

```js
function TransformArray() {
  const [info, setInfo] = useState(demoArray);

  return (
    <Fragment>
      <h1>소피모어를 하는 우리 동문 정보</h1>
      {info.map((ele) => (
        <Fragment key={ele.id}>
          <h1>
            {ele.name}-{ele.age}
          </h1>
        </Fragment>
      ))}
    </Fragment>
  );
}
```



루트 컴포넌트에서 TransformArray의 컴포넌트 인스턴스를 생성하는 컴포넌트를 반환하세요.

```js
function App() {
  return <TransformArray />;
}
```

렌더링하기

```js
import React from "react";
import { createRoot } from "react-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```



여기 전체 코드가 있어요

```js
import React from "react";
import ReactDOM from "react-dom/client";

// 전역으로 선언된 배열
const demoArray = [
  { id: 0, name: "Yogesh", age: 24 },
  { id: 1, name: "Nitesh", age: 21 },
  { id: 2, name: "Hriday", age: 24 },
];

// 작동하는 컴포넌트
function TransformArray() {
  const [info, setInfo] = useState(demoArray);

  return (
    <Fragment>
      <h1>2학년 시절 우리 동문 정보</h1>
      {info.map((ele) => (
        <Fragment key={ele.id}>
          <h1>
            {ele.name}-{ele.age}
          </h1>
        </Fragment>
      ))}
    </Fragment>
  );
}

// 루트 컴포넌트
function App() {
  return <TransformArray />;
}

// React 컴포넌트 렌더링
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

이제 이 학생들이 10년 후의 나이를 알려주는 버튼을 만들어보세요

```js
import React from "react";
import ReactDOM from "react-dom/client";

// 전역으로 선언된 배열
const demoArray = [
  { id: 0, name: "Yogesh", age: 24 },
  { id: 1, name: "Nitesh", age: 21 },
  { id: 2, name: "Hriday", age: 24 },
];

// 작동하는 컴포넌트
function TransformArray() {
  const [info, setInfo] = useState(demoArray);

  function handleClick() {
    const newVal = info.map((ele) => ({ ...ele, age: ele.age + 10 }));
    setInfo(newVal);
  }

  return (
    <Fragment>
      <h1>2학년 시절 우리 동문 정보</h1>
      {info.map((ele) => (
        <Fragment key={ele.id}>
          <h1>
            {ele.name}-{ele.age}
          </h1>
        </Fragment>
      ))}
      <button onClick={handleClick}>현재 나이</button>
    </Fragment>
  );
}

// 루트 컴포넌트
function App() {
  return <TransformArray />;
}

// React 컴포넌트 렌더링
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```



여기서 우리는 현재 학생의 나이를 처리하는 간단한 버튼을 만들었습니다.

지금은 맵 메서드가 특히 배열 내부의 객체를 업데이트하기 위해 리액트에서 널리 사용됩니다.

우리가 원하는 변수를 업데이트하는 데 꽤 간단한 방법으로 구조 분해 메커니즘을 사용했습니다.