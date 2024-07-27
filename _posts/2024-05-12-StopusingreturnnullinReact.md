---
title: "리액트에서 return null을 사용하지 마세요"
description: ""
coverImage: "/assets/img/2024-05-12-StopusingreturnnullinReact_0.png"
date: 2024-05-12 21:01
ogImage: 
  url: /assets/img/2024-05-12-StopusingreturnnullinReact_0.png
tag: Tech
originalTitle: "Stop using 'return null' in React"
link: "https://medium.com/@davidkelley87/stop-using-return-null-in-react-a2ebf08fc9cd"
---


<img src="/assets/img/2024-05-12-StopusingreturnnullinReact_0.png" />

React를 사용할 때 컴포넌트에서 반환된 값의 의미를 이해하는 것이 중요합니다. 컴포넌트가 아무것도 렌더링하지 않아야 한다는 것을 나타내기 위해 return null을 사용하는 것이 유혹스러울 수 있지만, 이는 의도하지 않은 결과를 초래할 수 있습니다. 이 게시물에서는 React 컴포넌트에서 return null을 사용하는 것이 나쁜 습관으로 여겨지는 이유와 return false가 더 좋은 대안인 이유에 대해 살펴보겠습니다.

# "return null" 사용에 대한 문제점

컴포넌트에서 return null을 사용하는 주된 문제점은 애플리케이션에서 예상치 못한 동작을 일으킬 수 있다는 것입니다. 특히, null은 React에서 렌더링할 유효한 값으로 처리되며, 이로 인해 컴포넌트의 자식 요소가 트리에서 분리될 수 있습니다. 이는 예기치 않은 다시 렌더링이나 상태 불일치 등 다양한 문제를 초래할 수 있습니다.



이것이 발생하는 이유를 이해하기 위해서는 React가 어떻게 작동하는지에 대해 알아야 도움이 됩니다. 컴포넌트가 렌더링될 때, React는 현재 UI 상태를 나타내는 가상 DOM 트리를 생성합니다. 그런 다음 이 트리는 이전 트리와 비교되어 UI의 어느 부분을 업데이트해야 하는지를 결정합니다. 컴포넌트가 null을 반환하면, React에게 아무것도 렌더링할 필요가 없다고 알립니다. 그러나 이는 컴포넌트의 자식들이 업데이트되어야 하는 상태나 프롭을 가지고 있을 때 문제를 일으킬 수 있습니다.

다음 예시를 살펴보세요:

```js
function Parent() {
  return (
    <div>
      <Child />
    </div>
  );
}

function Child() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Child rendered');
  });

  if (count === 0) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

이 예시에서, Child 컴포넌트는 count가 0과 같을 때 아무것도 렌더링하지 않아야 한다는 것을 나타내기 위해 return null을 사용합니다. 그러나 이는 Child 컴포넌트가 count의 값이 0이 아닌 값으로 다시 렌더링될 때 문제를 일으킬 수 있습니다. 이 경우에 React는 Child 컴포넌트를 트리에 다시 연결해야 하며, 예상치 못한 동작을 일으킬 수 있습니다.



# "return false"의 장점

return null 대신에 return false를 사용하는 것이 더 좋은 방법입니다. 컴포넌트가 false를 반환하면 React는 이를 null을 반환한 것처럼 처리하지만, 또한 React에게 해당 컴포넌트의 자식들을 렌더링하지 말라고 말합니다. 이렇게 하면 컴포넌트와 해당 자식들이 트리에 연결된 채로 유지되어, return null을 사용했을 때 발생할 수 있는 문제점을 회피할 수 있습니다.

다음은 return false를 사용하는 이전 예제의 업데이트된 버전입니다:

```js
function Parent() {
  return (
    <div>
      <Child />
    </div>
  );
}

function Child() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Child rendered');
  });

  if (count === 0) {
    return false;
  }

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```



이 버전에서 Child 컴포넌트는 count가 0과 동일할 때 null 대신 false를 반환합니다. 이렇게 하면 컴포넌트와 해당 하위 요소가 렌더링할 필요가 없을 때에도 트리에 연결된 상태를 유지합니다. 결과적으로, 컴포넌트가 더 예측 가능하게 동작하고 return null을 사용할 때 발생할 수 있는 문제를 피할 수 있습니다.

# "return false"를 사용하는 경우

일반적으로 return null 대신에 return false를 사용하는 것이 더 나은 실천 방법이지만, 적용하기에 적절하지 않을 수 있는 경우가 있음을 기억하는 것이 중요합니다. 구체적으로, 컴포넌트가 렌더링할 필요가 없음을 나타내야 하는 경우에만 return false를 사용해야 합니다. 컴포넌트가 조건에 따라 무언가를 렌더링해야 하는 경우에는 if 문이나 삼항 연산자와 같은 조건부 렌더링 기술을 사용해야 합니다.

다음은 if 문을 사용한 조건부 렌더링 예시입니다:



```js
function MyComponent({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return <Dashboard />;
}
```

이 예에서 MyComponent 컴포넌트는 사용자가 로그인했는지에 따라 LoginForm 또는 Dashboard를 조건부로 렌더링하는 if 문을 사용합니다. 이는 return false 대신 조건부 렌더링을 사용하는 더 적절한 방법입니다.

# 결론

결론적으로, React 컴포넌트에서 return null을 사용하면 예기치 않은 동작을 유발하므로 일반적으로 피해야 합니다. 대신 컴포넌트가 렌더링하지 말아야 함을 나타내어야 할 때는 return false를 사용해야 합니다. 이렇게 함으로써 컴포넌트와 그 하위 요소는 트리에 연결된 상태를 유지하고 return null 사용으로 발생할 수 있는 문제를 피할 수 있습니다.




그러나 return false를 사용하는 경우는 컴포넌트가 아무것도 렌더링하지 말아야 하는 경우에만 사용해야 한다는 점을 명심해야 합니다. 컴포넌트가 조건부로 렌더링해야 하는 경우에는 조건부 렌더링 기술을 사용해야 합니다.