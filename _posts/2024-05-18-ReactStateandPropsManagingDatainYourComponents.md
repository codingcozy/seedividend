---
title: "React State와 Props 컴포넌트에서 데이터 관리하기"
description: ""
coverImage: "/assets/img/2024-05-18-ReactStateandPropsManagingDatainYourComponents_0.png"
date: 2024-05-18 22:14
ogImage:
  url: /assets/img/2024-05-18-ReactStateandPropsManagingDatainYourComponents_0.png
tag: Tech
originalTitle: "React State and Props: Managing Data in Your Components"
link: "https://medium.com/@iammayank20/react-state-and-props-managing-data-in-your-components-366010fb1213"
isUpdated: true
---

## 컴포넌트에서 데이터 관리하기

## 소개

React에서 데이터를 효과적으로 관리하는 것은 동적이고 상호작용적인 애플리케이션을 구축하는 데 중요합니다. 이를 돕는 두 가지 핵심 개념은 state와 props입니다. 이러한 개념을 올바르게 사용하는 방법을 이해하면 React 애플리케이션의 유지보수성과 기능성이 크게 향상됩니다. 이 포스트에서는 props와 state가 무엇인지, props를 통해 데이터를 전달하는 방법, 로컬 상태를 관리하는 방법, 그리고 상태를 공유 데이터 처리를 위해 끌어올리는 방법에 대해 살펴보겠습니다.

# Props와 State 설명

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 속성

Props(속성의 줄임말)은 한 컴포넌트에서 다른 컴포넌트로 데이터를 전달하는 데 사용되는 읽기 전용 속성입니다. 일반적으로 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용됩니다. Props를 사용하여 컴포넌트를 재사용하기 쉽게 만들 수 있습니다.

Props 사용 예시

```js
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 예시에서 Greeting 컴포넌트는 name prop을 받아와 개인화된 인사를 렌더링합니다.

## State

State는 컴포넌트 수명 동안 변경될 수 있는 데이터를 보유하는 내장 객체입니다. props와 달리 state는 컴포넌트 내에서 관리되며 `setState` 함수를 사용하여 수정할 수 있습니다.

State 사용 예시

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import React, { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}
```

이 예제에서 `Counter` 컴포넌트는 `useState` 훅을 사용하여 자체 상태를 관리하며, 버튼이 클릭될 때 동적으로 count 값을 업데이트할 수 있습니다.

# Props를 통한 데이터 전달

Props를 통한 데이터 전달은 간단합니다. 부모 컴포넌트에서 속성을 정의하고 이를 props를 사용하여 자식 컴포넌트에서 액세스하면 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

예시: 다중 프롭 전달

```js
function UserInfo(props) {
  return (
    <div>
      <h2>{props.name}</h2> <p>Age: {props.age}</p>
      <p>Location: {props.location}</p>
    </div>
  );
}
function App() {
  return (
    <div>
      <UserInfo name="Alice" age={25} location="뉴욕" />
      <UserInfo name="Bob" age={30} location="샌프란시스코" />
    </div>
  );
}
```

여기서 `UserInfo` 컴포넌트는 `name`, `age`, `location`을 프롭으로 받아와서 표시합니다.

# 로컬 상태 관리

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

로컬 상태를 관리하는 방법은 함수 컴포넌트에서 `useState` 훅을 사용하거나 클래스 컴포넌트에서 `this.state` 및 `this.setState` 메서드를 사용하는 것을 포함합니다. 현대적인 React에서는 함수 컴포넌트가 더 일반적으로 사용되므로 그에 중점을 두겠습니다.

예시: 폼 상태 관리

```js
import React, { useState } from "react";
function Form() {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("제출 내용: " + inputValue);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">제출</button>
    </form>
  );
}
function App() {
  return (
    <div>
      <Form />
    </div>
  );
}
```

이 예시에서 `Form` 컴포넌트는 `useState` 훅을 사용하여 입력 값 상태를 관리합니다. `handleChange` 함수는 상태를 업데이트하고, `handleSubmit` 함수는 폼 제출을 처리합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 상태 올리기

상태를 올리는 것은 여러 컴포넌트가 동일한 상태를 공유하고 상호작용해야 할 때 사용하는 기술입니다. 공유된 상태는 컴포넌트의 가장 가까운 공통 조상에 의해 관리됩니다.

예제: 상태 올리기

```js
import React, { useState } from "react";
function TemperatureInput(props) {
  const handleChange = (event) => {
    props.onTemperatureChange(event.target.value);
  };
  return (
    <div>
      <label>{props.scale} 온도:</label>
      <input type="text" value={props.temperature} onChange={handleChange} />
    </div>
  );
}
function TemperatureCalculator() {
  const [temperature, setTemperature] = useState("");
  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
  };
  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
  };
  return (
    <div>
      <TemperatureInput scale="섭씨" temperature={temperature} onTemperatureChange={handleCelsiusChange} />

      <TemperatureInput scale="화씨" temperature={temperature} onTemperatureChange={handleFahrenheitChange} />
    </div>
  );
}
function App() {
  return (
    <div>
      <TemperatureCalculator />
    </div>
  );
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 예시에서 `TemperatureCalculator` 컴포넌트는 온도 값을 관리하기 위해 상태를 끌어올립니다. 그런 다음 해당 상태는 `TemperatureInput` 컴포넌트에 props를 통해 전달됩니다. 이를 통해 두 입력란이 동일한 상태를 반영하도록 보장할 수 있습니다.

# 결론

프롭과 상태를 이해하고 효과적으로 활용하는 것은 React 개발에 기초적입니다. 프롭을 통해 데이터와 설정을 컴포넌트 트리 아래로 전달하고, 상태를 통해 컴포넌트가 동적 데이터를 관리하고 반응하도록 할 수 있습니다. 이러한 개념과 상태 끌어올리기와 같은 기술을 숙달하여 보다 견고하고 유지보수 가능하며 상호작용 가능한 애플리케이션을 구축할 수 있습니다.

제공된 예시를 활용하고 이러한 실천사항을 프로젝트에 통합해 보세요. 궁금한 사항이 있거나 추가 설명이 필요하면 아래에 댓글을 남겨주세요! 즐거운 코딩 하세요!
