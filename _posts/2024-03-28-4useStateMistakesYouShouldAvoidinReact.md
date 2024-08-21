---
title: "리액트에서 피해야 할 4가지 useState 실수"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "4 useState Mistakes You Should Avoid in React"
link: "https://medium.com/gitconnected/4-usestate-mistakes-you-should-avoid-in-react-0d9d676869e2"
isUpdated: true
---

![4useStateMistakesYouShouldAvoidinReact_0](/assets/img/4useStateMistakesYouShouldAvoidinReact_0.png)

## 소개

React.js는 현대 웹 개발의 중심 요소가 되었으며, 컴포넌트 내에서 상태를 관리하는 독특한 방식으로 유명합니다. 일반적인 훅 중 하나인 useState는 기본적이지만 종종 오용됩니다. 이러한 일반적인 실수를 이해하고 피하는 것은 효율적이고 버그가 없는 애플리케이션을 만드는 것을 목표로 하는 초보자와 경험있는 개발자 양쪽에게 모두 중요합니다.

본 블로그에서는 React에서 useState를 사용할 때 피해야 할 네 가지 중요한 실수에 대해 살펴볼 것입니다. 함께 React 스킬을 향상시켜봅시다!

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

더 들어가기 전에 내 개인 웹사이트에서 웹 개발에 관한 보다 심층적인 기사들을 살펴보세요:

### 실수 1: 이전 상태를 고려하지 않는 것 😨

React의 useState 훅을 사용할 때 흔한 실수는 가장 최근의 상태를 업데이트할 때 고려하지 않는 것입니다. 이 실수는 특히 빠른 상태 업데이트나 여러 상태 업데이트와 관련된 경우에 예상치 못한 행동으로 이어질 수 있습니다.

### ❌ 이슈를 이해하기

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

상상해보세요. React에서 카운터를 만들고 있는 상황입니다. 버튼이 클릭될 때마다 카운트를 증가시키는 것이 목표입니다. 간단한 접근 방법은 현재 상태 값에 1을 더하는 것일 수 있습니다. 그러나 이렇게 하면 문제가 발생할 수 있습니다.

```js
import React, { useState } from "react";

const CounterComponent = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1); // 항상 올바르게 작동하지 않을 수 있습니다
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

export default CounterComponent;
```

위 코드에서 incrementCounter는 현재 값에 기반하여 카운터를 업데이트합니다. 이것은 간단해 보이지만 문제를 일으킬 수 있습니다. React는 여러 번의 setCounter 호출을 묶을 수도 있고, 다른 상태 업데이트가 간섭하여 카운터가 매번 올바르게 업데이트되지 않을 수 있습니다.

## ✅ 수정 방법:

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

이 문제를 피하려면 setCounter 메서드의 기능적 형태를 사용하십시오. 이 버전은 함수를 인수로 취하며, React는 가장 최신의 상태 값을 전달합니다. 이를 통해 항상 최신 상태 값을 사용하게 됩니다.

```js
import React, { useState } from "react";

const CounterComponent = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1); // 최신 상태를 기반으로 올바르게 업데이트
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

export default CounterComponent;
```

이 수정된 코드에서 incrementCounter는 함수를 사용하여 상태를 업데이트합니다. 이 함수는 가장 최신 상태(prevCounter)를 받아 업데이트된 상태를 반환합니다. 이 방식은 특히 업데이트가 빠르게 또는 여러 번 연속해서 발생하는 경우에 훨씬 더 신뢰할 수 있습니다.

## 실수 2: 상태 불변성을 방치하기 🧊

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

## ❌ 문제 이해하기

React에서는 상태(state)를 불변(immutable)하게 다루어야 합니다. 일반적인 실수 중 하나는 객체나 배열과 같은 복잡한 데이터 구조를 직접 수정하는 것입니다.

다음과 같이 잘못된 방식을 살펴보세요:

```js
import React, { useState } from "react";

const ProfileComponent = () => {
  const [profile, setProfile] = useState({ name: "John", age: 30 });

  const updateAge = () => {
    profile.age = 31; // 상태 직접 수정하는 실수
    setProfile(profile);
  };

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <button onClick={updateAge}>나이 업데이트</button>
    </div>
  );
};

export default ProfileComponent;
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

테이블 태그를 Markdown 형식으로 변경하십시오.

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

수정된 코드에서 updateAge는 상태 불변성을 유지하면서 업데이트된 나이로 새 프로필 객체를 생성하기 위해 스프레드 연산자를 사용합니다.

## 실수 3: 비동기 업데이트 오해 ⏳

## ❌ 문제 이해하기

React의 useState를 통한 상태 업데이트는 비동기적으로 이루어집니다. 이는 종종 여러 상태 업데이트가 빠르게 일어날 때 헷갈릴 수 있습니다. 개발자들은 setState 호출 후 즉시 상태가 변경될 것으로 기대할 수 있지만, 사실은 React가 이러한 업데이트를 성능상의 이유로 일괄 처리합니다.

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

자주 발생하는 상황을 살펴보면 이해를 잘못하여 문제가 생길 수 있다는 점을 알 수 있어요

```js
import React, { useState } from "react";

const AsyncCounterComponent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
    setCount(count + 1);
    // 개발자는 카운트가 두 번 증가될 것으로 예상합니다
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
};

export default AsyncCounterComponent;
```

이 예시에서, 개발자는 count를 두 번 증가시키려고 합니다. 그러나 상태 업데이트가 비동기적인 성질을 가지고 있기 때문에, 두 `setCount` 호출 모두 같은 초기 상태를 기반으로 하여 카운트가 한 번만 증가됩니다.

## ✅ 수정 방법:

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

비동기 업데이트를 올바르게 다루려면 setCount의 함수형 업데이트 형식을 사용해야 합니다. 이를 통해 각 업데이트가 가장 최근의 상태를 기반으로 하도록 보장합니다.

```js
import React, { useState, useEffect } from "react";

const AsyncCounterComponent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    // 이제 각 업데이트는 가장 최근 상태에 맞게 정확히 의존합니다
  };
  // 선택 사항: 업데이트된 상태를 확인하기 위해 useEffect 사용
  useEffect(() => {
    console.log(count); // 2
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
};

export default AsyncCounterComponent;
```

위 코드에서 setCount 호출은 상태의 가장 최신 값을 사용하여 정확하고 순차적인 업데이트를 보장합니다. 이 접근 방식은 현재 상태에 의존하는 작업에 중요하며 특히 연속으로 여러 상태 업데이트가 발생할 때 핵심적입니다.

## 실수 4: 파생 데이터에 상태를 오용하기 📊

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

## ❌ 이해해야 할 사항

자주 발생하는 오류 중 하나는 기존 상태나 속성에서 파생될 수 있는 데이터에 상태를 사용하는 것입니다. 이 중복된 상태는 복잡하고 오류가 발생하기 쉬운 코드로 이어질 수 있습니다.

예를 들어:

```js
import React, { useState } from "react";

const GreetingComponent = ({ name }) => {
  const [greeting, setGreeting] = useState(`Hello, ${name}`);

  return <div>{greeting}</div>;
};

export default GreetingComponent;
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

여기서 인사말 상태는 이름에서 직접 유도할 수 있기 때문에 필요하지 않습니다.

## ✅ 수정 내용:

state 대신 기존 state나 props로부터 데이터를 직접 유도하도록 수정하세요.

```js
import React from "react";

const GreetingComponent = ({ name }) => {
  const greeting = `안녕하세요, ${name}`; // props로부터 직접 유도

  return <div>{greeting}</div>;
};

export default GreetingComponent;
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

수정된 코드에서는 greeting이 이름 속성에서 직접 계산되어 컴포넌트를 단순화하고 불필요한 상태 관리를 피했습니다.

## 결론 🚀

React에서 useState 훅을 효과적으로 활용하는 것은 신뢰할 수 있고 효율적인 애플리케이션을 구축하는 데 중요합니다. 이전 상태를 무시하거나 상태의 불변성을 지키지 않는 것, 비동기 업데이트를 간과하는 것, 파생 데이터를 위한 중복 상태를 만들지 않는 것과 같은 일반적인 실수를 이해하고 피함으로써 더 부드럽고 예측 가능한 컴포넌트 동작을 보장할 수 있습니다. 이러한 통찰력을 염두에 두고 React 개발 여정을 향상시키고 더 견고한 애플리케이션을 만들어보세요.

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

행복한 코딩하세요!!
