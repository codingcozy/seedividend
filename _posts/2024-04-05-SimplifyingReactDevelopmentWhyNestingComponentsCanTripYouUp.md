---
title: "리액트에서 컴포넌트 중첩의 함정 예방하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Simplifying React Development Why Nesting Components Can Trip You Up"
link: "https://medium.com/@sudha.malpeddi/simplifying-react-development-why-nesting-components-can-trip-you-up-f84cd4313605"
---



소개

React 개발에 뛰어들면 "중첩 컴포넌트 안티-패턴"이라고 알려진 흔한 난관에 부딪힐 수 있습니다. 이것은 코딩 여정에서 잘못된 길을 따라가는 것과 같아요. 코드를 더 깔끔하게 만들 것으로 생각했지만, 혼란스러운 미로에 빠지게 됩니다. 이 글에서는 중첩된 컴포넌트가 머리아픔을 유발하는 이유를 알아보고, 간단한 예제를 통해 React 코드를 구조화하는 더 스무스한 방법을 찾아보겠습니다.

중첩 컴포넌트 안티-패턴

React에서 기본 카운터 앱을 구축한다고 상상해보세요. 숫자를 증가시키는 버튼과 카운트를 보여주는 디스플레이가 있습니다. 처음에는 카운터 디스플레이 컴포넌트를 메인 앱 컴포넌트로 중첩할 수 있습니다.

<div class="content-ad"></div>

```js
import React, { useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function CounterDisplay() {
    return <p>Count: {count}</p>;
  }

  return (
    <div>
      <h1>Counter Application</h1>
      <button onClick={handleIncrement}>Increment</button>
      <CounterDisplay />
    </div>
  );
}

export default CounterApp;
```

첫눈에 보기에는 간단해 보입니다. 그러나 심각한 문제가 발생합니다: 메인 앱 구성 요소가 다시 렌더링될 때마다 카운터 디스플레이 구성 요소가 재정의됩니다. 이로 인해 예기치 않은 동작 및 시간이 지남에 따른 성능 문제가 발생합니다.

구성 요소 상태 손실:

부모 구성 요소가 다시 렌더링될 때마다 구성 요소가 재정의되면 React가 어떤 변경 사항도 캐시할 수 없습니다. 다시 말해, React가 주 구성 요소를 재렌더링할 때마다 카운터 디스플레이 구성 요소를 처음부터 다시 생성해야 합니다. 이는 구성 요소 내의 상태가 손실되어 응용 프로그램에서 예기치 않은 동작이 발생하는 것을 의미합니다. 눈가리개를 쓰고 미로를 헤매다시피할 때, 어떻게든 목적지에 도달할 수 있지만, 확실히 지루하고 비효율적인 여정이 될 것입니다.

<div class="content-ad"></div>

성능 문제:

상태 손실에 추가하여 중첩 구성 요소는 성능에 중대한 영향을 미칠 수 있습니다. React는 구성 요소의 상태나 속성이 변경될 때 구성 요소를 다시 렌더링합니다. 각 구성 요소가 다시 렌더링될 때마다 React는 새로운 가상 DOM 표현을 생성하고 이전 표현과 비교합니다. 이 과정을 조정(reconciliation)이라고 하며, 특히 깊게 중첩된 구성 요소와 함께 작업할 때 자원을 많이 소비할 수 있습니다.

또한 중첩된 구성 요소는 비효율적인 캐싱 결과를 낼 수 있습니다. 다른 구성 요소 내에서 정의된 구성 요소는 React가 렌더링 프로세스를 효과적으로 최적화할 수 없습니다. 이는 불필요한 다시 렌더링과 성능 저하로 이어질 수 있습니다. 흔들리는 토대 위에 초고층을 짓는 것 같은 느낌입니다 — 어떻게 높게 쌓아 올리더라도 결국 다 무너져 내리기 전에는 시간 문제입니다.

주의해야 할 점: 더 나은 접근 방식

<div class="content-ad"></div>

그렇다면 중첩 구성 요소 함정에 빠지지 않으려면 어떻게 해야 할까요? 간단합니다: 구성 요소를 분리하고 모듈화하세요. 구성 요소를 중첩하는 대신 독립적인 기능으로 정의하세요.
다음은 이를 수행하는 방법입니다. 카운터 앱을 다음과 같이 리팩터링할 수 있습니다:

```js
import React, { useState } from "react";

function CounterDisplay({ count }) {
  return <p>Count: {count}</p>;
}

function CounterApp() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>카운터 애플리케이션</h1>
      <button onClick={handleIncrement}>증가</button>
      <CounterDisplay count={count} />
    </div>
  );
}

export default CounterApp;
```

이 새로운 버전에서 카운터 디스플레이 구성 요소를 메인 앱 구성 요소와 분리했습니다. 이제 메인 앱이 다시 렌더링되더라도 카운터 디스플레이에 영향을 미치지 않습니다. 이는 코드가 더 깔끔하고 이해하기 쉽며 효율적이게 만듭니다.

게다가, 우리 개발자들은 프롭스, 컨텍스트, 그리고 React 프레임워크의 기능을 의도대로 활용해야 합니다. 호스트 구성 요소와 상태를 공유하려고 하는 대신, 데이터를 프롭스를 통해 넘겨주거나 컨텍스트를 사용하여 필요한 곳에서 전역 상태 액세스를 제공하는 방식으로 고려하세요. 이러한 지침을 따라가면, 개발자들은 중첩된 구성 요소의 문제에 빠지지 않으면서도 React 애플리케이션을 성능적이고 확장 가능하게 유지할 수 있습니다.

<div class="content-ad"></div>

결론:

리액트에서 컴포넌트를 중첩하는 것은 처음에는 현명해 보일 수 있지만, 종종 코드가 엉키고 성능 문제가 발생할 수 있습니다. 컴포넌트를 깔끔하고 정돈된 상태로 유지하여 중첩된 컴포넌트 안티 패턴의 머리 아픔을 피하고 더 부드러운 리액트 애플리케이션을 만들 수 있습니다. 기억하세요: 단순함이 스트레스 없는 코딩 여정의 핵심입니다.
