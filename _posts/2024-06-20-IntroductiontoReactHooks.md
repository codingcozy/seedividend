---
title: "리액트 훅스 소개"
description: ""
coverImage: "/assets/img/2024-06-20-IntroductiontoReactHooks_0.png"
date: 2024-06-20 05:14
ogImage: 
  url: /assets/img/2024-06-20-IntroductiontoReactHooks_0.png
tag: Tech
originalTitle: "Introduction to React Hooks"
link: "https://medium.com/@ankit-royal/introduction-to-react-hooks-d75233293578"
isUpdated: true
---






![React Hooks](/assets/img/2024-06-20-IntroductiontoReactHooks_0.png)

리액트 훅(React Hooks)은 2018년 10월 React Conf에서 소개되었습니다. 이는 함수 컴포넌트에서 상태(state) 및 사이드 이펙트(side-effects)를 사용하는 방법으로, 훅(React Hooks) 이전에 함수 컴포넌트는 상태를 가지지 않고 라이프사이클 메서드를 관리할 수 없어 상태 관련 로직을 처리하기 위해 함수 컴포넌트를 클래스 컴포넌트로 변환해야 했습니다. 하지만 훅(React Hooks)을 사용하면 함수 컴포넌트에서도 상태와 사이드 이펙트를 처리할 수 있어 클래스 컴포넌트를 사용할 필요가 없어졌습니다.

# React Hooks의 필요성

리액트 훅(React Hooks)은 함수 컴포넌트에서 상태 관리와 사이드 이펙트를 도입하기 위해 설계되었습니다. 이를 통해 컴포넌트의 리팩터링을 방지할 수 있게 되었습니다. 훅(React Hooks) 이전에는 상태와 라이프사이클 메서드를 클래스 컴포넌트에서만 사용할 수 있었습니다. 리액트 훅(React Hooks)을 사용하면 이와 같은 불필요한 리팩터링을 방지하며 리액트 애플리케이션을 보다 우아하고 가벼운 방식으로 작성할 수 있습니다.


<div class="content-ad"></div>

```js
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

export default Counter;
```

```js
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
```

# 부수효과 로직

클래스 컴포넌트에서는 부수효과를 componentDidMount, componentDidUpdate 및 componentWillUnmount와 같은 라이프사이클 메소드에서 관리했습니다. React Hooks는 useEffect Hook을 사용하여 함수 컴포넌트에서 부수효과를 처리할 수 있도록 해줍니다. useEffect Hook은 설정(setup) 및 정리(cleanup) 단계 모두를 캡슐화합니다.


<div class="content-ad"></div>

```js
import React from 'react';

class MyComponent extends React.Component {
  componentDidMount() {
    // 기능 1을 위한 리스너 추가
    // 기능 2를 위한 리스너 추가
  }

  componentWillUnmount() {
    // 기능 1을 위한 리스너 제거
    // 기능 2를 위한 리스너 제거
  }

  ...
}
```

```js
import React from 'react';

function MyComponent() {
  React.useEffect(() => {
    // 기능 1을 위한 리스너 추가 (셋업)
    return () => {
      // 기능 1을 위한 리스너 제거 (정리)
    };
  });

  React.useEffect(() => {
    // 기능 2를 위한 리스너 추가 (셋업)
    return () => {
      // 기능 2를 위한 리스너 제거 (정리)
    };
  });

  ...
}
```

# React의 추상화 지옥

React에서의 고급 패턴인 고차 컴포넌트(HOCs) 및 렌더 프롭 컴포넌트는 종종 복잡한 컴포넌트 트리를 유발했습니다. React Hooks는 이를 단순화시켜 함수에 로직을 캡슐화하여 추가 컴포넌트 대신 더 평평한 컴포넌트 트리를 만들어냅니다.


<div class="content-ad"></div>

```js
import React from 'react';
import { compose, withReducer } from 'recompose';
import { withRouter } from 'react-router-dom';

function App({ history, state, dispatch }) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Content theme={theme}>
          ...
        </Content>
      )}
    </ThemeContext.Consumer>
  );
}

export default compose(
  withRouter,
  withReducer(reducer, initialState)
)(App);
```

```js
import React from 'react';
import { useTheme } from 'styled-components';
import { useRouter } from 'react-router-dom';

function App() {
  const theme = useTheme();
  const history = useRouter();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Content theme={theme}>
      ...
    </Content>
  );
}

export default App;
```

# JavaScript Class Confusion

자바스크립트 클래스는 'this', 클래스 바인딩 및 상속과 같은 개념 때문에 가파른 학습 곡선을 가지고 있습니다. React Hooks는 이러한 복잡성 없이 컴포넌트를 작성할 수 있도록 해주어 React 초심자에게 더 부드러운 학습 곡선을 제공합니다.


<div class="content-ad"></div>

```js
import React, { Component } from 'react';

class Counter extends Component {
  state = { value: 0 };

  onIncrement = () => {
    this.setState(state => ({
      value: state.value + 1
    }));
  };

  onDecrement = () => {
    this.setState(state => ({
      value: state.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.onIncrement}>+</button>
        <button onClick={this.onDecrement}>-</button>
      </div>
    );
  }
}

export default Counter;
```

## React Hooks와 어떻게 다른가요?

React Hooks는 React의 기본 사항을 변경하지는 않고, 단지 컴포넌트를 작성하는 새로운 방법을 제공합니다. 로컬 상태와 라이프사이클 메소드를 가진 클래스 컴포넌트는 여전히 작동하며, HOCs나 Render Props와 같은 고급 패턴도 유효합니다. React Hooks는 보다 간소화된 함수 컴포넌트를 가능케 함으로써 React의 미래 개발을 단순화하는 API를 추가합니다.

## 다루어진 주제들



<div class="content-ad"></div>

- 모든 것이 변화합니다: 훅스는 React 애플리케이션을 작성하는 방식을 변화시킬 것이지만 기존의 클래스 컴포넌트는 여전히 작동합니다.
- React는 덩치가 커지고 있는 중: React는 날씬한 API를 유지하려 노력합니다. 훅스는 미래의 React API를 단순화하는 방향으로 나아가는 한 걸음입니다.
- 클래스는 잘 작동했습니다: 훅스는 특히 React 초심자들에게 컴포넌트를 작성하는 더 간단한 방법을 제공합니다.
- 마법 같아요: 훅스는 마법처럼 보일 수 있지만 클래스 컴포넌트와 마찬가지로 React의 내부 업데이트 큐를 활용합니다.

# 일반적인 React 훅 사용하기

useState 훅은 함수 컴포넌트에서 로컬 상태를 관리하는 데 사용됩니다.

- 예시: 항목 배열 관리하기

<div class="content-ad"></div>

```js
import React from 'react';

const INITIAL_LIST = [
  { id: '0', title: 'React with RxJS', url: 'https://example.com/rxjs' },
  { id: '1', title: 'React with Apollo', url: 'https://example.com/apollo' },
];

function App() {
  const [list, setList] = React.useState(INITIAL_LIST);

  const onRemoveItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  };

  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
          <button type="button" onClick={() => onRemoveItem(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default App;
```

useEffect Hook은 함수 컴포넌트에서 사이드 이펙트를 처리하기 위해 사용됩니다.

- 예시: 간단한 스톱워치 구현

```js
import React from 'react';

function App() {
  const [isOn, setIsOn] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    let interval;

    if (isOn) {
      interval = setInterval(() => setTimer(prevTimer => prevTimer + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [isOn]);

  return (
    <div>
      {timer}

      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}

      {isOn && (
        <button type="button" onClick={() => setIsOn(false)}>
          Stop
        </button>
      )}
    </div>
  );
}

export default App;
```

<div class="content-ad"></div>

이 예시에서 useEffect 훅은 스톱워치가 시작될 때(즉, isOn이 true일 때) 인터벌을 설정하고 스톱워치가 중지될 때(즉, isOn이 false일 때) 인터벌을 정리합니다. 이는 React Hooks를 사용하여 함수 컴포넌트에서 사이드 이펙트를 관리하는 방법을 보여줍니다.

# 결론

React Hooks는 함수 컴포넌트에서 상태와 사이드 이펙트를 관리하는 강력한 방법을 제공하여 클래스 컴포넌트와 복잡한 추상화가 필요하지 않게 합니다. 특히 초보자에게 React 개발을 간단하고 기능적으로 작성할 수 있도록 돕습니다.

즐거운 학습되세요! 😎