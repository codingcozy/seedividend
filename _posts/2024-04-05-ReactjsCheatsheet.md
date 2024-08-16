---
title: "Reactjs Cheat sheet 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Reactjs Cheatsheet"
link: "https://codedthemes.medium.com/react-js-cheatsheet-dcf7964e732c"
isUpdated: true
---





![React.js Cheat Sheet](/assets/img/ReactjsCheatsheet_0.png)

React.js 는 동적이고 효율적인 사용자 인터페이스를 디자인하는 데 사용할 수 있는 최고의 도구입니다. 경험 많은 개발자든 웹 개발에 처음 시작한 사람이든, 이 블로그에서 React 컴포넌트, 엘리먼트 및 주요 아이디어를 설명해 드리겠습니다. JSX 구문, React 속성 및 조건문을 마스터하는 데 도움을 드릴 것입니다.

# React Cheat Sheet

React는 선언적이고 효율적인 방식으로 사용자 인터페이스를 구축하는 데 사용되는 오픈 소스 JavaScript 라이브러리입니다. Model View Controller (MVC) 아키텍처의 뷰 계층 내에서만 작동하며 컴포넌트 기반 접근 방식을 채택합니다. 모듈식 사용자 인터페이스 생성을 용이하게 하며, React는 동적 데이터를 제시하는 데 용이한 재사용 가능한 UI 컴포넌트 개발을 촉진합니다.

<div class="content-ad"></div>

React Cheat Sheet은 자주 사용되는 React 메소드들을 간결하게 정리한 것으로, React Elements, Components, 및 Methods에 대한 주요 내용을 모두 한 페이지에 담아 쉽게 참고할 수 있습니다. React Cheat Sheet를 통해 React에 대해 더 쉽게 이해해 보세요!

## React Elements

React elements은 일반적인 HTML 요소와 유사한 구문을 가지고 있습니다. React에서는 어떤 유효한 HTML 요소라도 표현할 수 있습니다.

```js
<h1>내 제목</h1>
<p>내 단락</p>
<button>내 버튼</button>
```

<div class="content-ad"></div>

이 React 요소는 JSX를 사용하여 구성되었어요. JSX는 React의 독특한 기능으로 HTML 구문과 JavaScript 함수를 혼합합니다.

그러나 JSX의 성격이 HTML이 아닌 JavaScript 함수이기 때문에 몇 가지 구문적인 차이가 있어요. 특히 img 요소와 같은 단일 태그 요소는 self-closing이어야 하며 앞 슬래시 /로 끝내야 해요:

```js
<img src="my-image.png" />
<br />
<hr />
```

## React 요소 속성

<div class="content-ad"></div>

JSX는 JavaScript의 camelCase 규칙에 따라 속성에 대한 수정된 구문을 도입합니다. 예를 들어, HTML의 class 속성은 JSX에서 className으로 변환됩니다.

```js
<div className="container"></div>
```

## React 요소 스타일

JSX에서 인라인 스타일을 적용하는 방법은 이중 중괄호를 사용하는 것입니다. 스타일은 일반 문자열로 표현되는 것이 아니라 객체 내의 속성으로 표현됩니다:

<div class="content-ad"></div>

```js
<h1 style={ fontSize: 24, margin: '0 auto', textAlign: 'center' }>제 헤더</h1>
```

## 리액트 Fragments

리액트는 모든 요소를 하나의 부모 컴포넌트 내에서 반환해야 하는 요구 사항에 대한 처리를 위해 fragment라고 불리는 특별한 요소를 제공합니다. React는 반환된 요소에 대해 단일 "부모"를 요구하므로, div와 같은 컨테이너 요소를 사용하기를 원치 않는 경우 fragment를 사용할 수 있습니다:

```js
// 유효한 구문
function MyComponent() {
  return (
    <>
      <h1>제 헤더</h1>
      <p>내 단락</p>
    </>
  );
}
```

<div class="content-ad"></div>

프래그먼트는 일반 또는 속기 구문으로 작성될 수 있습니다: `<>` 또는 `</>`.

## 리액트 컴포넌트

리액트의 useState 훅 영역에서는 요소 군집을 리액트 컴포넌트라고 하는 것으로 구성할 수 있습니다.

기본적인 함수 컴포넌트는 일반 JavaScript 함수와 매우 유사하게 만들어지지만 주의할 점이 몇 가지 있습니다.

<div class="content-ad"></div>

먼저, 컴포넌트 이름은 대문자로 시작해야 합니다. 즉, myComponent 대신 MyComponent와 같이 작성해야 합니다. 또한, 일반적인 JavaScript 함수와 달리 컴포넌트는 JSX를 graceful하게 반환해야 합니다.

React 함수 컴포넌트의 기본 구문은 다음과 같습니다:

```js
function App() {
  return <div>Hello world!</div>;
}
```

## React Props

<div class="content-ad"></div>

React 세계에서 컴포넌트는 우리가 props라고 부르는 데이터를 전달 받을 수 있는 능력을 갖고 있어요.

이러한 props는 부모 컴포넌트에서 자식 컴포넌트로 전달됩니다. 예를 들어, App 컴포넌트에서 User 컴포넌트로 'name'이라는 prop을 전달하는 것을 고려해 보세요:

```js
function App() {
  return <User name="John Doe" />;
}
function User(props) {
  return <h1>Hello, {props.name}</h1>; // Hello, John Doe!
}
```

props는 사실 객체이기 때문에 User 컴포넌트 내에서 'name' prop의 값을 react 훅을 통해 추출할 수 있어요.

<div class="content-ad"></div>

더 깔끔한 코드 접근 방식을 위해, "name" 같은 단일 prop을 다룰 때 객체 비구조화를 사용할 수 있습니다:

```js
function App() {
  return <User name="John Doe" />;
}
function User({ name }) {
  return <h1>Hello, {name}!</h1>; // Hello, John Doe!
}
```

주의할 점은 다른 요소와 컴포넌트를 포함한 모든 JavaScript 값이 prop으로 전달될 수 있다는 것입니다.

## React Children Props

<div class="content-ad"></div>

프롭스는 컴포넌트의 여는 태그와 닫는 태그 사이에 데이터를 넣어 전달할 수도 있습니다. 이런 방식으로 전달된 이러한 프롭스는 children 속성 안에 위치합니다.

예를 들어, User 컴포넌트의 태그 사이에 내용을 전달하는 것을 고려해 보세요:

```js
function App() {
  return (
    <User>
      <h1>Hello, John Doe!</h1>
    </User>
  );
}
function User({ children }) {
  return children; // Hello, John Doe!
}
```

## 리액트 조건문

<div class="content-ad"></div>

리액트 컴포넌트와 엘리먼트는 조건부로 표시할 수 있습니다. 한 가지 방법은 if 문을 사용한 별도의 return 문을 사용하는 것입니다.

```js
function App() {
  const isAuthUser = useAuth();
  if (isAuthUser) {
    // 만약 사용자가 인증된 경우, 앱을 사용할 수 있도록 함
    return <AuthApp />;
  }
  // 사용자가 인증되지 않은 경우 다른 화면을 보여줍니다
  return <UnAuthApp />;
}
```

만약 return 문 안에 조건을 만들고 싶다면, 값을 반환하는 조건문을 사용해야 합니다.

삼항 연산자를 사용하려면 전체 조건을 중괄호로 감싸야 합니다.

<div class="content-ad"></div>

```js
function App() {
  const isAuthUser = useAuth();
  return (
    <>
      <h1>내 어플리케이션</h1>
      {isAuthUser ? <AuthApp /> : <UnAuthApp />}
    </>
  );
}
```

## React 리스트

React 컴포넌트의 목록은 .map() 함수를 사용하여 생성할 수 있습니다. 이 함수를 사용하면 데이터 배열을 순회하고 JSX를 생성할 수 있습니다.

SoccerPlayer 컴포넌트를 사용하여 축구 선수 목록을 출력하는 예시를 살펴보겠습니다:

<div class="content-ad"></div>

```js
function SoccerPlayers() {
  const players = ["Messi", "Ronaldo", "Laspada"];
  return (
    <div>
      {players.map((playerName) => (
        <SoccerPlayer key={playerName} name={playerName} />
      ))}
    </div>
  );
}
```

데이터 배열을 순회할 때 key 속성을 꼭 포함해야 하며, 이 key는 단순히 요소 인덱스가 아닌 유일한 값을 부여해야 합니다. 위 예시에서는 유일한 값인 playerName이 key로 사용됩니다.

## 리액트 컨텍스트

리액트 컨텍스트는 컴포넌트 트리 전체에 데이터를 손쉽게 전달하는 메커니즘으로, 프롭트에만 의존하는 것을 없애줍니다.

<div class="content-ad"></div>

Props에 대한 도전 과제는 때때로 데이터가 필요하지 않은 중간 컴포넌트를 통해 그들을 전달해야 하는 필요성이 있습니다. 이를 프롭 드릴링이라고 일반적으로 언급합니다.

'Body' 컴포넌트를 통해 props가 필요 없이 전달되는 간단한 시나리오를 고려해보세요:

```js
function App() {
  return <Body name="John Doe" />;
}
function Body({ name }) {
  return <Greeting name={name} />;
}
function Greeting({ name }) {
  return <h1>Welcome, {name}</h1>;
}
```

Context를 받아들이기 전에, 우리의 컴포넌트가 불필요한 세그먼트를 통해 props를 전달하는 실천 방식을 우회할 수 있는 더 나은 구조로 향상될 수 있는지를 탐구하는 것이 가치 있다고 생각합니다.

<div class="content-ad"></div>

Context를 구현할 때는 React에서 제공하는 createContext 함수를 사용합니다. 이 함수는 초기값과 함께 호출되어 해당 값을 컨텍스트의 시작점으로 설정합니다.

결과적으로 컨텍스트는 Provider와 Consumer 속성으로 구성되며 둘 다 컴포넌트로 작동합니다. Provider는 데이터가 전파되어야 하는 컴포넌트 트리 주변에 래핑되고, Consumer는 이 값이 소비되어야 하는 컴포넌트 내에 배치됩니다.

```js
import { createContext } from "react";
const NameContext = createContext("");
function App() {
  return (
    <NameContext.Provider value="John Doe">
      <Body />
    </NameContext.Provider>
  );
}
function Body() {
  return <Greeting />;
}
function Greeting() {
  return (
    <NameContext.Consumer>
      {(name) => <h1>Welcome, {name}</h1>}
    </NameContext.Consumer>
  );
}
```

이 접근법을 채택함으로써 컴포넌트의 구성을 개선하고 컴포넌트 트리에서 부가적인 엘리먼트를 통해 프롭을 전달할 필요를 회피할 수 있습니다.

<div class="content-ad"></div>

## 리액트 훅

리액트 훅은 리액트 버전 16.8에서 등장하여, 재사용 가능한 상태를 가진 로직을 리액트 함수 컴포넌트에 편리하게 통합할 수 있는 방법을 제공합니다. 이를 통해 기능을 확장시킬 수 있게 되었는데, 이 기능은 기존에 클래스 컴포넌트에서만 가능했던 내용을 초월하게 해줍니다.

이러한 훅들은 우리에게 이전에 클래스 컴포넌트로 제한되었던 기능들을 활용할 수 있게 만들어 주며, 우리는 심지어 애플리케이션에 특정 기능을 부여하기 위해 사용자 정의 훅을 만들어 사용할 수도 있습니다. 리액트 라이브러리에는 중요한 여러 훅들이 포함되어 있는데, 여러분이 이해하기에 중요한 6가지에 대해 자세히 살펴보겠습니다:

- useState
- useEffect
- useRef
- useContext
- useCallback
- useMemo

<div class="content-ad"></div>

useState 훅은 특히 함수 컴포넌트 내에서 상태 값들을 활용할 수 있게 해줌으로써 그 이름에 걸맞게 작동합니다. 이 훅은 간단한 변수보다는 선호되며, 상태를 수정할 때 컴포넌트가 자동으로 다시 렌더링되어 업데이트된 값을 반영합니다.

useState를 사용할 때는 컴포넌트 상단에서 이를 초기화하며, 선택적으로 상태 변수에 초기값을 전달할 수 있습니다. 반환된 값에 대해 배열 구조 분해를 사용하면 저장된 상태와 해당 상태를 업데이트하는 함수에 모두 접근할 수 있습니다.

```js
import { useState } from "react";
function MyComponent() {
  const [stateValue, setStateValue] = useState(initialValue);
}
```

실용적인 예시로는 상호 작용 시 증가하는 기본 카운터를 활용합니다:

```js
import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount(count + 1);
  }
  return <button onClick={updateCount}>Count is: {count}</button>;
}
```

이를 통해 useState가 React 함수 컴포넌트의 기능을 풍부하고 간단한 방식으로 관리하는 데 어떻게 도움을 주는지 보여줍니다.

<div class="content-ad"></div>

## React useState 훅

React useState 훅은 간단한 목적을 제공합니다 — 함수 컴포넌트 내에서 상태 값을 활용할 수 있도록 합니다.

기본 변수에 의존하는 대신, 상태가 수정되면 컴포넌트가 다시 렌더링되고 일반적으로 최신 값이 표시됩니다. 이러한 이유로 useState가 사용됩니다.

다른 훅의 패턴을 따라, 컴포넌트 시작 부분에 useState를 호출하여 상태 변수를 초기값으로 제공할 수 있도록 합니다.

<div class="content-ad"></div>

`useState`에서 반환된 값에 대한 배열 구조 분해의 사용을 통해, 우리는 저장된 상태와 해당 상태를 업데이트하는 함수에 모두 손쉽게 접근할 수 있도록 할 수 있습니다.

```js
import { useState } from 'react';
function MyComponent() {
  const [stateValue, setStateValue] = useState(initialValue);
}
실용적인 데모를 위해, 카운터를 증가시키는 기본 예제를 고려해 봅시다.
import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  function updateCount() {
    setCount(count + 1);
  }
  return <button onClick={updateCount}>Count is: {count}</button>;
}
```

이것은 `useState` 훅이 함수 컴포넌트에서 상태를 관리하는 것을 간소화하는 방법을 보여줍니다. 상태 변경을 처리하는 무난한 방법을 제공함으로써, React 컴포넌트의 기능성을 향상시키며, 이를 단순한 카운터 시나리오로 설명했습니다.

<div class="content-ad"></div>

---

## React useEffect 훅

React의 useEffect 훅은 API 호출과 같은 외부 환경과 상호작용해야 할 때 사용됩니다. 주요 목적은 사이드 이펙트를 처리하는 것으로, 예측할 수 없는 결과를 초래하는 애플리케이션 외의 작업을 포괄합니다.

useEffect의 기본 구문은 첫 번째 인수로 함수를 제공하고 두 번째 인수로 배열을 제공하는 것입니다.

<div class="content-ad"></div>

```js
import { useEffect } from "react";
function MyComponent() {
  useEffect(() => {
    // 여기서 사이드 이펙트 수행
  }, []);
}
```

게시물 목록을 가져와서 표시하는 예제를 보여주기 위해 다음과 같은 예시를 살펴봅시다:

```js
import { useEffect } from "react";
function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  }, []);
  return posts.map((post) => <Post key={post.id} post={post} />);
}
```

이펙트 함수 외부에서 값을 필요로 하는 경우, 이를 종속성 배열에 포함해야 합니다. 해당 값이 변경되면 이펙트 함수가 다시 실행됩니다.

<div class="content-ad"></div>

예를 들어, 이 코드 스니펫을 살펴보세요. 이 코드는 모바일 메뉴가 열린 상태인지 닫힌 상태인지에 따라 본문 요소에 "overflow-hidden" 클래스를 토글합니다.

```js
function Mobile({ open }) {
  useEffect(() => {
    const body = document.querySelector("#__next");
    if (open) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [open]);
  // ...
}
```

이는 useEffect가 사이드 이펙트를 효율적으로 관리하여 React 컴포넌트 라이프사이클에 외부 세계와의 상호 작용을 원활하게 통합하는 방법을 보여줍니다.

## React useRef

<div class="content-ad"></div>

React의 useRef 훅은 JSX 요소로의 직접적인 게이트웨이를 제공하여 prop 전달이 필요하지 않은 상태에서 접근할 수 있는 메커니즘을 제공합니다.

useRef를 활용하려면 단순히 훅을 호출하고 반환된 값을 가져와 원하는 React 요소의 ref prop에 할당하면 됩니다. ref는 컴포넌트의 고유한 속성이 아니라 React 요소의 속성이라는 점을 중요히 기억해야 합니다.

useRef의 기본 구문은 다음과 같습니다:

```js
import { useRef } from "react";
function MyComponent() {
  const ref = useRef();
  return <div ref={ref} />;
}
```

<div class="content-ad"></div>

특정 요소에 링크된 ref는 ref.current에 저장된 값이 해당 요소와 직접 상호 작용하는 데 사용될 수 있습니다. 예를 들어 사용자가 Control + K 키 조합을 사용할 때 검색 입력란에 초점을 맞추고 싶다고 가정해 보겠습니다:

```js
import { useWindowEvent } from "@mantine/hooks";
import { useRef } from "react";
function Header() {
  const inputRef = useRef();
  useWindowEvent("keydown", (event) => {
    if (event.code === "KeyK" && event.ctrlKey) {
      event.preventDefault();
      inputRef.current.focus();
    }
  });
  return <input ref={inputRef} />;
}
```

이 시나리오에서 inputRef는 입력 요소에 직접 액세스하는 데 사용되며, useRef가 React 컴포넌트 내에서 특정 요소와 상호 작용할 수 있는 능력을 향상시킨다는 것을 보여줍니다.

## React useContext

<div class="content-ad"></div>

React의 useContext 훅은 기존의 Context.Consumer 컴포넌트를 사용하는 것에 비해 context를 사용하는 것을 간편하게 해줍니다.

이 구문은 사용하려는 전체 Context 객체를 useContext에 전달하는 것을 포함합니다. 반환된 값은 Context를 통해 전파된 값과 일치합니다.

```js
import { useContext } from 'react';
function MyComponent() {
  const value = useContext(Context);
  // ...
}
useContext 훅을 사용하여 이전 예제를 적용하는 방법:
import { createContext, useContext } from 'react';
const NameContext = createContext('');
function App() {
  return (
    <NameContext.Provider value="John Doe">
      <Body />
    </NameContext.Provider>
  );
}
function Body() {
  return <Greeting />;
}
function Greeting() {
  const name = useContext(NameContext);
  return (
    <h1>Welcome, {name}</h1>
  );
}
```

이는 useContext가 전통적인 Context.Consumer 컴포넌트와 비교하여 더 간결하고 읽기 쉬운 접근 방식을 제공하여 context 값에 액세스하는 프로세스를 단순화하는 방법을 보여줍니다.

<div class="content-ad"></div>

## React useCallback

React의 useCallback 훅은 우리 애플리케이션의 성능을 최적화하는 데 유용한 도구입니다. 이를 통해 컴포넌트가 다시 렌더링될 때마다 함수를 재생성하는 것을 방지할 수 있습니다. 우리 앱의 효율성을 유지하는 데 중요한 요소입니다.

예를 들어, 이전에 살펴본 PlayerList 예제를 고려해보겠습니다. 플레이어를 배열에 추가할 수 있도록 기능을 개선하고 플레이어를 제거하는 함수(handleRemovePlayer)를 프롭을 통해 전달한다고 가정했을 때, 이 함수는 다시 렌더링할 때마다 새롭게 생성되어 성능에 영향을 줄 수 있습니다.

이를 해결하기 위해 우리는 useCallback을 활용할 수 있습니다. 우리의 콜백 함수를 캡슐화하고 그 종속성 배열에 유일한 인수인 player를 포함시켜야 합니다. 아래는 코드의 인간이 읽기 쉬운 버전입니다:

<div class="content-ad"></div>

```js
function App() {
  const [player, setPlayer] = React.useState("");
  const [players, setPlayers] = React.useState(["Messi", "Ronaldo", "Laspada"]);

  function handleChangeInput(event) {
    setPlayer(event.target.value);
  }

  function handleAddPlayer() {
    setPlayers(players.concat(player));
  }

  const handleRemovePlayer = useCallback((player) => {
    setPlayers(players.filter((p) => p !== player));
  }, [players]);

  return (
    <>
      <input onChange={handleChangeInput} />
      <button onClick={handleAddPlayer}>Add Player</button>
      <PlayerList players={players} handleRemovePlayer={handleRemovePlayer} />
    </>
  );
}

function PlayerList({ players, handleRemovePlayer }) {
  return (
    - [x] {players.map((player) => (
      - [x] <li key={player} onClick={() => handleRemovePlayer(player)}>
          - [x] {player}
        - [x] </li>
      - [x] ))}
  );
}
```

## React useMemo

이어서, useMemo는 성능을 향상시키는 훅으로, 비싼 계산 결과를 기억하여 불필요한 다시 계산을 피할 수 있게 합니다.

useEffect 및 useCallback과 달리, useMemo는 값의 반환을 설계된 것입니다. 콜백 함수와 의존성 배열이 필요하며, 콜백은 명시적으로 값을 반환해야 합니다. mdx-bundler 문서에서 .mdx 파일을 React 구성 요소로 변환하는 실제 예제를 살펴보겠습니다.

<div class="content-ad"></div>

```js
import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

function Post({ code, frontmatter }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <main>
        <Component />
      </main>
    </>
  );
}
```

여기서 useMemo는 Component 값이 불필요하게 다시 생성되지 않도록하여 성능을 향상시킵니다.
