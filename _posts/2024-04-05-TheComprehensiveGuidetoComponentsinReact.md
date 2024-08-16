---
title: "리액트에서 컴포넌트에 대한 포괄적인 안내"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "The Comprehensive Guide to Components in React"
link: "https://medium.com/@priyaeswaran/the-comprehensive-guide-to-components-in-react-154ac7490dd3"
isUpdated: true
---





# 소개:

웹사이트를 방문할 때 사용자로서 가장 눈에 띄는 것은 외관과 기능입니다. 그것은 매력적이고 이해하기 쉽고 사용하기 편리해야 합니다. 이 아름다운 사이트들이 어떻게 만들어지는지 궁금했던 적이 있나요? 그렇다면, 그것들은 React와 같은 다양한 프레임워크와 라이브러리를 사용하여 만들어집니다. React는 완전히 컴포넌트로 구성되어 있습니다. 이 블로그 글은 주로 초보자 친화적인 방식으로 컴포넌트가 무엇이며, 왜 필요한지, 그 이점은 무엇인지, 유형은 무엇인지 등을 이해하는 데 초점을 맞춥니다. 그러니 시작해봅시다! 🤩

![The Comprehensive Guide to Components in React](/assets/img/TheComprehensiveGuidetoComponentsinReact_0.png)

# 목차:

<div class="content-ad"></div>

# 소개:

- 컴포넌트란 무엇인가요?
- 리액트 개발에서 컴포넌트가 왜 중요한가요?
- UI를 다른 컴포넌트로 나누는 방법은 무엇인가요?
- 새로운 컴포넌트를 만드는 시점은 언제인가요?
- 컴포넌트를 만들 때 유의해야 할 사항은 무엇인가요?
- 컴포넌트 라이프사이클은 무엇인가요?
- 컴포넌트의 종류:
  - 함수형 컴포넌트
  - 클래스 컴포넌트
  - 순수 컴포넌트
  - 고차 컴포넌트(HOC)
  - 표현형 컴포넌트
- 컴포넌트 합성이란 무엇인가요?
- 위에서 언급한 몇 가지 기본 용어:
  - JSX
  - Props
  - State
  - Prop drilling
- 결론

# 컴포넌트란 무엇인가요?

컴포넌트는 React에서 사용자 인터페이스의 구성 요소입니다. 개발자로서 전체 애플리케이션을 여러 컴포넌트로 나누어 각 컴포넌트마다 헤더, 푸터 등과 같은 특정 기능과 UI를 연결합니다. 이러한 모든 컴포넌트를 모아 하나의 전체 애플리케이션을 구성합니다. 각 컴포넌트는 자체 데이터/내용, 로직, 외관/스타일을 갖습니다. 컴포넌트는 재사용되며 중첩되며 props를 이용해 데이터를 공유할 수 있습니다.

# 리액트 개발에서 컴포넌트가 왜 중요한가요?

<div class="content-ad"></div>

- 재사용성: 컴포넌트를 사용하면 UI를 작은 조각으로 나눌 수 있어 유지보수가 쉽고 응용 프로그램의 다양한 부분에서 재사용할 수 있어 코드를 중복해서 작성할 필요가 없다.
- 관심사 분리: 각 컴포넌트는 특정 기능 또는 UI 작업을 처리하며 리스트 렌더링, 사용자 상호 작용 관리, 상태 처리 등을 담당한다. 이는 더 깨끗하고 유지보수하기 쉬운 코드를 촉진한다.

## 어떻게 UI를 다른 컴포넌트로 분할할까요?

우리는 UI를 해당하는 논리와 컴포넌트의 재사용성에 기반하여 분할합니다. 각 컴포넌트는 특정 책임, 논리, 그리고 재사용성을 가져야 합니다. 컴포넌트는 상태가 없는 컴포넌트(표현만을 위한 것), 상태를 포함하고 재사용이 가능한 상태 컴포넌트, 또는 구조적 컴포넌트(큰 컴포넌트이며 종종 페이지 레이아웃을 담당)일 수 있습니다.

## 언제 새로운 컴포넌트를 생성해야 할까요?

<div class="content-ad"></div>

✅ 컴포넌트 내의 콘텐츠가 서로 밀접한 관련이 없을 때는 이를 위해 새로운 컴포넌트를 만드세요.

✅ 코드 일부가 재사용 가능하고 응용 프로그램의 다른 부분에서 재사용하고 싶을 때는 별도의 컴포넌트로 만드세요.

✅ 컴포넌트가 다양한 작업을 수행하고 너무 많은 props 및 상태/효과가 필요할 때는 이를 새로운 컴포넌트로 분리하세요.

✅ 코드가 혼란스럽거나 복잡할 때는 해당 부분을 작은 컴포넌트로 분할하세요.

<div class="content-ad"></div>

# 컴포넌트를 만들 때 주의할 점:

✔️ 컴포넌트 이름은 항상 "대문자"로 시작해야 합니다.

✔️ 각 컴포넌트는 하나의 JSX 요소만 반환해야 합니다.

✔️ 한 컴포넌트에서 반환할 여러 요소가 있는 경우, div나 React fragment(``,`/`)로 감싸야 합니다.

<div class="content-ad"></div>

✔️ 컴포넌트 정의 내에서 직접적으로 컴포넌트를 호출하는 것을 피해야 합니다. 그렇게 하면 무한 루프가 발생할 수 있습니다.

# 컴포넌트 라이프사이클이란?

컴포넌트는 마운팅 단계, 리렌더링 단계, 언마운팅 단계 등 다양한 단계를 거칩니다.

✅ 마운팅 단계/초기 렌더링 — 컴포넌트가 처음으로 렌더링됩니다. 새로운 상태와 프롭스가 생성됩니다.

<div class="content-ad"></div>

✅ 다시 렌더링 단계(선택적인 단계) — 상태, 프롭스, 부모 컴포넌트의 다시 렌더링 또는 컨텍스트 변경이 발생할 때 발생합니다.

✅ 언마운팅 단계 — 컴포넌트 인스턴스가 파기되고 제거됩니다. 상태와 프롭스도 삭제됩니다.

# 컴포넌트 유형:

- 함수형 컴포넌트
- 클래스 컴포넌트
- 순수 컴포넌트
- 고차 컴포넌트(HOCs)
- 프레젠테이션 컴포넌트

<div class="content-ad"></div>

## 기능적 컴포넌트:

기능적 컴포넌트는 리액트에서 컴포넌트를 작성하는 일반적이고 현대적인 방법입니다. 컴포넌트를 만드는 가장 간단한 형태입니다. 자바스크립트 함수를 작성하는 것과 비슷하지만 입력으로 프롭을 받고 출력으로 JSX(JavaScript XML)를 반환하여 컴포넌트의 UI를 표현하는 등의 기능을 추가적으로 제공합니다.

리액트 훅스가 도입되면서 기능적 컴포넌트는 더 많은 기능과 유연성을 얻게 되었으며, 클래스 컴포넌트를 사용하지 않고도 상태(state)와 부수효과(side effects)를 관리할 수 있게 되었습니다.

```js
// app component는 모든 다른 컴포넌트를 중첩할 메인 컴포넌트입니다
function App(){
    return <>
           <Hello />
            <Msg />
            </>
}
 // Hello 컴포넌트 만들기
function Hello(){
    return <div>Hello World !</div>
}

// Msg 컴포넌트 만들기
function Msg(){
    return <p>컴포넌트에 대해 배웠습니다</p>
}

//출력:
Hello World!
컴포넌트에 대해 배웠습니다
```

<div class="content-ad"></div>

## 클래스 컴포넌트:

클래스 컴포넌트는 React를 확장한 ES6 클래스입니다. Component. 그들은 JSX를 반환하는 render() 메서드를 가지고 있습니다. 함수형 컴포넌트와 비교하여 더 복잡한 구문을 가지고 있으며, 전통적으로 상태 및 라이프사이클 메서드를 관리하는 데 사용됩니다.

```js
class MyComponent extends React.Component {
  render() {
    return <div>Hello, World!</div>;
  }
}
```

## 순수(퓨어) 컴포넌트:

<div class="content-ad"></div>

순수 컴포넌트는 리액트에서의 성능 최적화 방법 중 하나에요. 클래스 컴포넌트와 유사하지만 shouldComponentUpdate()을 자동으로 구현하여 얕은 속성 및 상태 비교로 다시 렌더링이 필요한지 확인해 불필요한 다시 렌더링을 방지합니다.

```js
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>안녕, {this.props.name}!</div>;
  }
}
```

## 고차 컴포넌트(HOC):

고차 컴포넌트는 컴포넌트를 입력으로 받아 새로운 향상된 프로퍼티를 추가한 새로운 컴포넌트를 반환하는 함수입니다. 일반적인 기능을 여러 컴포넌트에서 추상화하기 위해 공통 기능을 별도의 컴포넌트로 분리하고 여러 컴포넌트에 적용하여 코드 재사용성을 높입니다.

<div class="content-ad"></div>

```js
import React, { useState } from "react";

// 컴포넌트에 카운터 기능을 추가하는 고차 컴포넌트(Higher-Order Component, HOC) 함수를 정의해봤어요
const counterFunction = (WrappedComponent) => {
  // HOC 컴포넌트인 WithCounter를 만들었어요
  const WithCounter = () => {
    const [count, setCount] = useState(0);

    // 카운터 증가를 처리하는 함수에요
    const incrementCounter = () => {
      setCount(count + 1);
    };

    return (
      <WrappedComponent count={count} incrementCounter={incrementCounter} />
    );
  };

  // HOC 컴포넌트를 반환해요
  return WithCounter;
};

// 카운터를 표시하고 클릭 시 증가시키는 간단한 컴포넌트를 정의해봤어요
const CounterComponent = ({ count, incrementCounter }) => {
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

// 동일한 HOC를 사용하는 다른 컴포넌트에요
const AnotherCounter = ({ count, incrementCounter }) => {
  return (
    <div>
      <h2>Another Counter: {count}</h2>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

// CounterComponent에 HOC를 적용해요
const CounterWithCounter = withCounter(CounterComponent);
// AnotherCounter에 HOC를 적용해요
const AnotherCounterWithCounter = withCounter(AnotherCounter);

// 사용 예시에요
const App = () => {
  return (
    <div>
      <CounterWithCounter />

      <AnotherCounterWithCounter />
    </div>
  );
};

export default App;
```

- 여기서는 두 카운터 컴포넌트에서 카운트를 증가시키는 일반 기능을 추출하여 공통 HOC 컴포넌트를 만들고 이를 사용해 카운터 컴포넌트를 감쌌어요.

## 프레젠테이션 컴포넌트:

이러한 컴포넌트들은 주로 외관에 초점을 맞춥니다. props를 통해 데이터를 받아 UI 요소를 렌더링합니다. 일반적으로 상태가 없는 함수형 컴포넌트입니다. 예시: 버튼, 카드, 헤더.

<div class="content-ad"></div>

```js
function App() {
  return (
    <div>
      <Header />
      <h1>Hello!</h1>
    </div>
  );
}

function Header() {
  return <header>React Components:</header>;
}
```

# 컴포넌트 합성이란 무엇인가요?

컴포넌트 합성은 서로 다른 컴포넌트를 결합하여 children props를 사용하여 재사용 가능하고 동적인 컴포넌트로 만드는 방법입니다. children prop은 컴포넌트가 자식 컴포넌트를 렌더링할 수 있도록 하는 특별한 prop입니다. 이를 통해 컴포넌트를 동적이고 다용도로 만들 수 있습니다.

- 컴포넌트 합성은 종종 다른 컴포넌트를 props로 전달하여 동적 렌더링과 사용자 정의를 가능하게 합니다.
- 컴포넌트 합성은 여러 개의 컴포넌트 층을 통과해야 하는 "prop drilling" 문제를 피하는 데 도움이 됩니다.
- 각 레이어를 통해 props를 수동으로 전달하는 대신 children prop을 사용하여 필요한 컴포넌트에 직접 props를 전달할 수 있습니다.

<div class="content-ad"></div>

# 위에서 언급한 몇 가지 기본 용어:

## JSX:

JSX는 Javascript XML의 약자입니다. 이는 CSS, Javascript 코드 및 리액트 요소인 상태(state)와 속성(props)을 HTML 안에서 결합할 수 있게 해주는 Javascript의 확장기능입니다. 컴포넌트가 어떻게 보이고 작동해야 하는지 설명하기 위한 선언적인 구문입니다.

## Props:

<div class="content-ad"></div>

프롭스는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다. 이는 함수에 인수를 전달하는 것과 유사합니다. 문자열, 배열, 객체, 함수 및 심지어 다른 리액트 컴포넌트를 포함해 모든 것을 프롭스로 전달할 수 있습니다. 이는 컴포넌트를 사용자 정의하는데 필수적인 도구입니다.

## 상태(State):

상태(State)는 컴포넌트 내에서 데이터를 저장하고 관리하는 데 사용되는 특별한 자바스크립트 객체입니다. 상태는 컴포넌트의 라이프사이클 동안 변경될 수 있는 현재 값을 나타냅니다. 상태의 업데이트는 컴포넌트를 다시 렌더링하여 UI를 동기화 상태로 유지합니다.

## 프롭 드릴링(Prop drilling):

<div class="content-ad"></div>

프롭 프로퍼게이션이란 부모에서 깊게 중첩된 자식 컴포넌트로 프롭을 전달하는 것을 의미합니다. 비록 이러한 컴포넌트들이 해당 프롭을 사용하지 않더라도, 필요한 컴포넌트에 도달할 때까지 단순히 프롭을 전달하는 것입니다.

# 결론:

요약하면, React 컴포넌트는 웹사이트를 멋지고 쉽게 만들어주는 퍼즐 조각들과 같습니다. 웹사이트를 작은 부분으로 나누어 개발자들은 이러한 조각들을 반복해서 사용할 수 있습니다. 웹사이트를 이해하기 쉽고 원활하게 작동할 수 있게 만드는 것이 중요합니다. 컴포넌트 구성, JSX, 프롭, 상태와 같은 개념을 이해하는 것이 효과적인 개발에 중요합니다. 이러한 기본 개념을 이해하면 개발자들은 탁월한 React 애플리케이션을 구축하여 우수한 사용자 경험을 제공할 수 있습니다. 행복한 학습되세요! 🤩
