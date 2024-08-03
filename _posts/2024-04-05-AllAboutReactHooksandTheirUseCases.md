---
title: "리액트 훅을 실제 업무에 활용한 사례들"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "All About React Hooks and Their Use Cases"
link: "https://medium.com/@rishabhraikwar77/all-about-react-hooks-and-their-use-cases-f31f11ad68d4"
---



![/assets/img/AllAboutReactHooksandTheirUseCases_0.png]

React Hooks는 React 16.8에서 소개되어 함수형 컴포넌트를 작성하는 방식을 혁신했습니다. 이를 통해 우리는 React 상태 및 기존에는 클래스 컴포넌트에만 적용되던 다른 기능에 "훅을 걸 수" 있게 되었습니다. 이 글에서는 모든 내장 Hooks 및 그들의 사용 사례를 탐구하며, 고급 시나리오를 위한 사용자 정의 Hooks 개념도 다룹니다.

## 주요 React Hooks

이것들은 다양한 기능을 다루는 가장 자주 사용되는 Hooks입니다:

<div class="content-ad"></div>

# useState

useState Hook은 함수형 컴포넌트에서 상태를 관리하는 데 사용되는 주요 도구입니다. 현재 상태 값을 포함한 배열과 상태를 업데이트하는 함수를 반환합니다.

```js
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>당신은 {count}번 클릭했습니다</p>
      <button onClick={handleClick}>클릭하세요</button>
    </div>
  );
}
```

# useEffect

<div class="content-ad"></div>

```js
useEffect 훅은 함수형 컴포넌트에서 부수 효과를 수행하는 데 사용됩니다. 데이터 가져 오기, 구독, 정리 함수 실행과 같은 동작을 수행할 수 있습니다. 콜백 함수와 선택적 종속성 배열을 사용합니다.

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []); // 빈 종속성 배열은 데이터를 한 번만 가져 오도록합니다.

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

useEffect 훅은 React Hooks의 중심이되어 함수형 컴포넌트에서 부수 효과를 활성화합니다. 컴포넌트가 렌더링된 후 데이터 가져 오기, 구독, 타이머, DOM 조작과 같은 동작을 수행할 수 있습니다.

구조 이해:

<div class="content-ad"></div>

useEffect(() => {
  // 부수 효과 함수 (콜백 함수)
}, [의존성 배열]);

- 콜백 함수: 이 함수에는 실행하고 싶은 실제 부수 효과 로직이 포함되어 있습니다. 비동기적일 수 있습니다 (예: fetch를 사용) 또는 동기적일 수 있습니다 (예: 구독 설정).
- 의존성 배열 (선택사항): 이 배열은 효과를 다시 실행해야 할 때를 지정합니다. 비어 있는 의존성 배열 ([])은 초기 렌더링 이후에 한 번만 효과가 실행됨을 의미합니다. 의존성 배열을 완전히 생략하면, 효과가 각 렌더링마다 실행되며, 클래스 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 것과 유사합니다.

일반적인 사용 사례:

- 데이터 가져오기: 컴포넌트가 마운트된 후 API에서 데이터 가져오고, 가져온 데이터로 상태를 업데이트합니다.

<div class="content-ad"></div>

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, []); // 초기 렌더링 후 한 번만 실행

- 구독: 외부 데이터 소스(예: 웹소켓)에 대한 구독을 설정하고 컴포넌트가 언마운트될 때 정리하여 메모리 누수를 방지하세요.

useEffect(() => {
  const subscription = someService.subscribe((data) => setData(data));
  return () => subscription.unsubscribe(); // 정리 함수
}, []); // 초기 렌더링 후 한 번만 실행하고 언마운트시 정리

- 마운트 및 업데이트 시 코드 실행: 의존성 배열을 사용하여 특정 상태나 프로퍼티 변화에 따라 효과가 다시 실행되는 시점을 제어하세요.

<div class="content-ad"></div>

useEffect(() => {
  console.log("컴포넌트가 마운트되었거나 count가 변경되었습니다");
}, [count]); // count가 변경될 때만 실행됩니다

중요한 사항:

- 과다 요청: 불필요한 API 호출을 피하기 위해 useEffect에서 데이터를 가져올 때 주의하세요. 실제 변경에 기반하여 fetch를 최적화하기 위해 의존성 배열을 사용하세요.
- 정리 함수: 구독 또는 타이머를 사용할 때, 항상 useEffect에서 컴포넌트가 언마운트 될때 적절한 정리를 위한 정리 함수를 반환하세요.

이러한 세부 사항을 이해하면 React 애플리케이션의 부작용을 관리하기 위해 useEffect를 효과적으로 활용할 수 있습니다.

<div class="content-ad"></div>

# useRef

useRef 후크는 다시 렌더링 사이에 지속되는 변경 가능한 ref 객체를 생성합니다. DOM 참조를 저장하거나 포커스를 관리하거나 이전 값들을 추적하는 데 유용합니다.

function InputWithFocus() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

# useContext

<div class="content-ad"></div>

const ThemeContext = React.createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar toggleTheme={toggleTheme} />
      <Content />
    </ThemeContext.Provider>
  );
}

function Toolbar({ toggleTheme }) {
  const theme = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}

# useReducer

`useReducer` 훅은 복잡한 상태를 관리할 때 `useState`의 대안으로 사용됩니다. 리듀서 함수를 사용하여 상태 전환을 캡슐화하며 액션에 기반한 상태 변화를 다룹니다.

<div class="content-ad"></div>

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}

이것들은 단순한 Hooks에 불과해요. 다음 섹션에서는 덜 일반적이지만 유용한 Hooks와 사용자 정의 Hooks를 살펴볼게요.

## 덜 일반적이지만 유용한 Hooks

# useCallback

<div class="content-ad"></div>

useCallback 훅은 메모이제된 콜백 함수를 반환합니다. 메모이제이션은 함수 자체가 캐시되어 종속성이 변경될 때까지 동일한 참조가 반환됩니다. 이는 콜백 함수를 prop으로 사용하는 자식 컴포넌트의 불필요한 다시 렌더링을 방지하는 데 유용합니다.

function ParentComponent() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  const memoizedHandleClick = useCallback(handleClick, [count]); // count가 변경될 때만 재생성

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={memoizedHandleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}

# useMemo

useMemo 훅은 useCallback과 유사하지만 함수와 해당 종속성에 기반한 메모이제된 값을 반환합니다. 이는 prop 또는 상태에 따라 결과가 변경되지 않을 때 매 렌더링마다 비싼 계산을 피하는 데 유용합니다.

<div class="content-ad"></div>

function UserListWithSearch() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]); // 사용자 또는 검색어(text)가 변경될 때만 filteredUsers 재계산

  return (
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

이러한 Hooks는 특정 시나리오에 대한 최적화 기술을 제공합니다.

## 커스텀 Hooks를 활용한 고급 사용 사례

커스텀 Hooks를 사용하면 여러 내장 Hooks를 결합하여 재사용 가능한 로직과 기능을 만들 수 있습니다. 다음은 폼 처리를 위한 커스텀 Hook 예시입니다:

<div class="content-ad"></div>

기본값을 사용하는 useForm 함수를 정의합니다.
함수는 초기값을 받아 상태값(values)과 값을 설정하는 함수(setValues)를 반환합니다.
handleChange 함수는 input 요소의 변화를 감지하고 해당 값을 업데이트합니다.

MyForm 함수에서 useForm 훅을 사용하여 name과 email 값의 상태와 handleChange 함수를 가져옵니다.
handleSubmit 함수는 form 제출 시의 이벤트를 처리합니다.

Custom Hooks는 React 애플리케이션의 복잡한 상호작용에 대한 코드 재사용성과 유지보수성을 촉진합니다.

이 게시물이 React Hooks의 이해와 활용에 튼튼한 기반을 제공하는 데 도움이 되길 바랍니다. 자세한 설명과 추가 Hooks에 대해 알아보려면 공식 React 문서를 참고해 주세요.
