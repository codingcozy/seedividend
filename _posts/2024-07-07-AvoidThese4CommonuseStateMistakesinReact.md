---
title: "반드시 피해야 할 React useState의 일반적인 실수 4가지"
description: ""
coverImage: "/assets/img/2024-07-07-AvoidThese4CommonuseStateMistakesinReact_0.png"
date: 2024-07-07 02:17
ogImage: 
  url: /assets/img/2024-07-07-AvoidThese4CommonuseStateMistakesinReact_0.png
tag: Tech
originalTitle: "Avoid These 4 Common useState Mistakes in React"
link: "https://medium.com/@yadavvshall/avoid-these-4-common-usestate-mistakes-in-react-679fcc29b105"
isUpdated: true
---



<img src="/assets/img/2024-07-07-AvoidThese4CommonuseStateMistakesinReact_0.png" />

리액트 개발 세계에서 `useState`는 함수형 컴포넌트 내에서 상태를 관리하는 강력하고 자주 사용되는 훅입니다. 그러나 오용하면 유지 보수가 어렵고 최적화하기 어려운 코드로 이어질 수 있습니다. 이 블로그에서는 `useState`를 사용할 때 개발자들이 하는 네 가지 일반적인 실수와 더 깔끔하고 효율적인 코드베이스를 위해 이를 어떻게 피해야 하는지 살펴보겠습니다.

1. `useState`를 과용하기

`useState`는 강력한 도구이지만 과용하면 복잡하고 유지보수가 어려운 코드베이스가 될 수 있습니다. 연관된 상태 변수에 대해 여러 `useState` 호출을 사용하는 대신 이를 하나의 상태 객체로 그룹화해 보세요.

<div class="content-ad"></div>

피하세요:

```js
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
```

이렇게 하세요:

```js
const [formState, setFormState] = useState({
  title: "",
  description: "",
  location: "",
});
```

<div class="content-ad"></div>

관련된 상태 변수를 하나의 객체로 그룹화하면 상태 관리를 간소화하고 `useState` 호출 횟수를 줄일 수 있어요.

2. 다시 렌더링 최적화를 하지 않는 것

상태 변수가 업데이트되면 React가 컴포넌트와 하위 항목을 다시 렌더링합니다. 이를 제대로 관리하지 않으면 성능 문제가 발생할 수 있어요. `React.memo` 또는 `useMemo`와 같은 메모이제이션 기술을 사용하여 다시 렌더링을 최적화하는 것을 고려해보세요.

이런 식을 피해주세요:

<div class="content-ad"></div>

```js
const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
function MyComponent({ data }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedExpensiveComponent data={data} />
    </div>
  );
}
```

`ExpensiveComponent`를 memo로 감싸면 불필요한 리렌더링을 방지하여 성능을 향상시킬 수 있어요.

<div class="content-ad"></div>

3. 초기 상태 무시하기

`useState`에 전달된 초기 상태는 첫 번째 렌더링에서만 사용됩니다. 이후 업데이트는 새로운 상태 값을 사용합니다. 의미 있는 초기 상태를 제공해야 합니다.

다음과 같은 예를 피해주세요:

```js
function MyComponent() {
  const [count, setCount] = useState();
  // 첫 번째 렌더링에서 count는 정의되지 않습니다
  return <p>Count: {count}</p>;
}
```

<div class="content-ad"></div>

다음을 해 주세요:

```js
function MyComponent() {
  const [count, setCount] = useState(0);
  // 첫 렌더링 시 count는 0이 됩니다.
  return <p>Count: {count}</p>;
}
```

의미 있는 초기 상태를 제공함으로써 컴포넌트가 처음부터 올바르게 렌더링되도록 보장합니다.

4. 상태 관리 전략 혼합하기

<div class="content-ad"></div>

`useState`과 같은 다른 상태 관리 라이브러리인 Redux나 MobX와 혼합하는 것을 피하세요. 이렇게 하면 혼란을 초래하고 코드베이스를 유지보수하기 어렵게 만들 수 있습니다. 단일 상태 관리 전략을 선택하고 그것을 유지하는 것이 좋습니다.

피하세요:

```js
function MyComponent() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  // useState와 Redux를 혼합하는 예시
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => dispatch(increment())}>Increment (Redux)</button>
    </div>
  );
}
```

이렇게 하세요:

<div class="content-ad"></div>

```js
function MyComponent() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  // Redux만 사용
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
```

한 가지 상태 관리 전략을 고수함으로써 코드베이스를 일관성 있게 유지하고 이해하기 쉽게 만들 수 있습니다.

결론

`useState`의 일반적인 실수를 피하는 것은 더 깔끔하고 효율적인 React 코드베이스로 이어질 수 있습니다. 관련된 상태 변수를 그룹화하고, 다시 렌더링을 최적화하며, 의미 있는 초기 상태를 제공하고, 단일 상태 관리 전략을 고수함으로써 React 애플리케이션의 유지보수성과 성능을 향상시킬 수 있습니다.

<div class="content-ad"></div>

이 블로그가 도움이 되었다면 나중에 다시 찾아볼 수 있도록 저장하고 주변 사람들과 공유해보세요!
