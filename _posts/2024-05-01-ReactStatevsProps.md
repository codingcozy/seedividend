---
title: "리액트 - State vs Props 둘의 차이점을 이해하자"
description: ""
coverImage: "/assets/img/2024-05-01-ReactStatevsProps_0.png"
date: 2024-05-01 18:21
ogImage:
  url: /assets/img/2024-05-01-ReactStatevsProps_0.png
tag: Tech
originalTitle: "React: 'State vs Props'"
link: "https://medium.com/javascript-in-plain-english/react-state-vs-props-3066a1766463"
---

![React State vs Props](/assets/img/2024-05-01-ReactStatevsProps_0.png)

리액트 JS에서 State와 Props의 차이를 완전히 이해하는 것이 매우 중요합니다. 이 두 개념을 완전히 이해하지 않으면 리액트에서 제대로 프로그래밍할 수 없습니다.

## 현재 상황: State 이해하기

State는 컴포넌트의 내부 데이터 저장소로, 현재 상태나 상황을 나타냅니다. 이는 컴포넌트의 개인 다이어리와 같습니다. 여기에는 행동과 외관을 정의하는 모든 흥미로운 세부사항이 기록됩니다. State가 변경될 때마다 React는 컴포넌트와 그 하위 요소를 지혜롭게 다시 렌더링하여 사용자 인터페이스가 최신 상태로 유지되고 데이터와 동기화되도록 보장합니다.

<div class="content-ad"></div>

```js
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
```

이 예제에서 Counter 컴포넌트는 count라는 상태 속성을 가지고 있으며, 초기값은 0으로 설정됩니다. 사용자가 "증가" 버튼을 클릭하면 incrementCount 메서드가 호출되어 setState 메서드를 사용하여 count 값을 증가시킵니다. React는 업데이트된 count 값을 사용하여 컴포넌트를 다시 렌더링합니다.

## Props: 계속해서 선물을 주는 선물

Props는 속성을 의미하는 단어의 축약형으로, 부모 컴포넌트로부터 받는 컴포넌트에 전달되는 데이터입니다. Props는 변경할 수 없으며, 즉 컴포넌트 자체에서 직접적으로 변경할 수 없습니다. 대신, props는 데이터를 컴포넌트 트리 아래로 전달하며, 재사용성과 캡슐화를 가능하게 합니다.

<div class="content-ad"></div>

```js
import React from "react";

const Greeting = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

const App = () => {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
};
```

이 예제에서 Greeting 컴포넌트는 부모 컴포넌트인 App으로부터 name prop을 전달받습니다. App 컴포넌트는 두 개의 Greeting 인스턴스를 렌더링하며 props로 다른 name 값을 전달합니다. Greeting 컴포넌트는 그 후에 받은 name을 h1 요소에 표시합니다.

## 리액트의 역과 양: 상태와 프롭스의 조화

상태와 프롭스는 분리된 엔티티처럼 보일 수 있지만, 종종 동적이고 인터랙티브한 사용자 인터페이스를 만들기 위해 함께 작동합니다. 한 컴포넌트의 상태는 자식 컴포넌트의 프롭스가 될 수 있어 데이터가 컴포넌트 트리를 따라 흐를 수 있습니다.

<div class="content-ad"></div>

```js
import React, { Component } from "react";

class ParentComponent extends Component {
  state = {
    message: "Hello, World!",
  };

  updateMessage = () => {
    this.setState({ message: "Hello, React!" });
  };

  render() {
    return (
      <div>
        <ChildComponent message={this.state.message} />
        <button onClick={this.updateMessage}>Update Message</button>
      </div>
    );
  }
}

const ChildComponent = (props) => {
  return <h1>{props.message}</h1>;
};
```

이 예시에서 ParentComponent는 초기에 'Hello, World!'로 설정된 message라는 상태 속성을 가지고 있습니다. 이 메시지 상태는 ChildComponent로 프롭으로 전달되며, 해당 메시지를 h1 요소에서 표시합니다.

사용자가 'Update Message' 버튼을 클릭하면 updateMessage 메서드가 호출되어 메시지 상태를 'Hello, React!'로 업데이트합니다. React는 ParentComponent 및 해당 하위 컴포넌트를 다시 렌더링하고 업데이트된 메시지 프롭을 ChildComponent에 전달하여 업데이트된 메시지가 표시됩니다.

## 콜백 문제: 자식에서 부모로 통신하기

<div class="content-ad"></div>

props가 컴포넌트 트리 아래로 흘러가는 동안, 자식 컴포넌트가 부모에게 다시 통신해야 할 때가 있습니다. 이때 콜백 함수가 필요합니다. 부모 컴포넌트는 자식 컴포넌트에게 콜백 함수를 prop으로 전달하여 자식이 콜백을 호출하고 데이터를 부모에게 다시 전달할 수 있습니다.

```js
import React, { Component } from "react";

class ParentComponent extends Component {
  state = {
    childMessage: "",
  };

  handleChildMessage = (message) => {
    this.setState({ childMessage: message });
  };

  render() {
    return (
      <div>
        <h1>자식으로부터의 메시지: {this.state.childMessage}</h1>
        <ChildComponent onMessageReceived={this.handleChildMessage} />
      </div>
    );
  }
}

class ChildComponent extends Component {
  state = {
    message: "",
  };

  handleInputChange = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessageToParent = () => {
    this.props.onMessageReceived(this.state.message);
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.message} onChange={this.handleInputChange} />
        <button onClick={this.sendMessageToParent}>부모에게 메시지 전송</button>
      </div>
    );
  }
}
```

이 예시에서 ParentComponent는 초기에 빈 문자열로 설정된 childMessage라는 상태 속성을 가지고 있습니다. ParentComponent는 onMessageReceived라는 prop으로 handleChildMessage 콜백 함수를 ChildComponent에 전달합니다.

ChildComponent에는 입력 필드와 버튼이 있습니다. 사용자가 입력 필드에 입력하면 handleInputChange 메소드가 ChildComponent의 message 상태를 업데이트합니다. 사용자가 "부모에게 메시지 전송" 버튼을 클릭하면 sendMessageToParent 메소드가 호출되어 onMessageReceived 콜백 prop을 호출하고 현재의 message 상태를 인자로 전달합니다.

<div class="content-ad"></div>

부모 컴포넌트에서는 자식 컴포넌트로부터 받은 메시지로 handleChildMessage 콜백 함수를 호출하고, childMessage 상태가 업데이트됩니다. 그리고 부모 컴포넌트는 업데이트된 childMessage 값을 가지고 재렌더링됩니다.

상태 끌어올리기: 공유 상태 관리
일부 경우에는 여러 컴포넌트가 동일한 상태를 공유하고 업데이트해야 할 수 있습니다. 이런 경우에는 공유 상태를 가장 가까운 공통 조상 컴포넌트로 끌어올려서 필요한 컴포넌트로 props로 전달하는 것이 권장됩니다.

```js
import React, { Component } from "react";

class TemperatureApp extends Component {
  state = {
    temperature: 20,
    scale: "celsius",
  };

  handleTemperatureChange = (temperature) => {
    this.setState({ temperature });
  };

  handleScaleChange = (scale) => {
    this.setState({ scale });
  };

  render() {
    const { temperature, scale } = this.state;
    return (
      <div>
        <TemperatureInput
          temperature={scale === "celsius" ? temperature : (temperature * 9) / 5 + 32}
          scale="celsius"
          onTemperatureChange={this.handleTemperatureChange}
        />
        <TemperatureInput
          temperature={scale === "fahrenheit" ? temperature : ((temperature - 32) * 5) / 9}
          scale="fahrenheit"
          onTemperatureChange={this.handleTemperatureChange}
        />
        <button onClick={() => this.handleScaleChange("celsius")}>Celsius</button>
        <button onClick={() => this.handleScaleChange("fahrenheit")}>Fahrenheit</button>
      </div>
    );
  }
}

class TemperatureInput extends Component {
  handleChange = (event) => {
    this.props.onTemperatureChange(parseFloat(event.target.value));
  };

  render() {
    const { temperature, scale } = this.props;

    return (
      <fieldset>
        <legend>Enter temperature in {scale === "celsius" ? "Celsius" : "Fahrenheit"}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default TemperatureApp;
```

이 예시에서 TemperatureApp 컴포넌트가 온도와 척도의 공유 상태를 관리합니다. 이 컴포넌트는 TemperatureInput 컴포넌트의 두 인스턴스를 제공하며, 온도, 척도, 그리고 onTemperatureChange 콜백 함수를 props로 전달합니다.
각 TemperatureInput 컴포넌트는 해당 척도(Celsius 또는 Fahrenheit)에 따라 온도를 표시하고 사용자가 새 온도 값을 입력할 수 있습니다.
사용자가 새 온도를 입력하면 TemperatureInput 컴포넌트의 handleChange 메서드가 호출되며, 이는 TemperatureApp 컴포넌트에서 제공한 onTemperatureChange 콜백 prop을 호출하여 새 온도 값을 인수로 전달합니다.
그리고 TemperatureApp 컴포넌트는 새 온도 값을 가지고 상태를 업데이트하며, 업데이트된 온도 값과 척도와 함께 두 TemperatureInput 컴포넌트가 다시 렌더링됩니다.

<div class="content-ad"></div>

와우, 여기에 많은 내용이 있어서 이해하기 어렵지 않았으면 좋겠어요.

## 결론

State와 Props를 사용하여 친숙해지세요. 서로 다른 부분을 이해하는 것이 매우 중요하며, 익숙해지면 React로 프로그래밍하는 것은 쉬운 일이 될 것입니다.

# 간단히 설명하면 🚀

<div class="content-ad"></div>

인 플레인 잉글리쉬 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가에게 박수를 보내고 팔로우해 주세요 👏
- 저희를 팔로우해 주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서도 만나보세요: 스태카데믹 | 코피드 | 벤처 | 큐브드
- 더 많은 콘텐츠는 PlainEnglish.io에서 확인하세요
