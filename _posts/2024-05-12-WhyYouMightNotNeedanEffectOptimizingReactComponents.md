---
title: "왜 효과가 필요하지 않을 수도 있습니다 React 컴포넌트 최적화하기"
description: ""
coverImage: "/assets/img/2024-05-12-WhyYouMightNotNeedanEffectOptimizingReactComponents_0.png"
date: 2024-05-12 21:04
ogImage: 
  url: /assets/img/2024-05-12-WhyYouMightNotNeedanEffectOptimizingReactComponents_0.png
tag: Tech
originalTitle: "Why You Might Not Need an Effect: Optimizing React Components"
link: "https://medium.com/@prachirai/why-you-might-not-need-an-effect-optimizing-react-components-703792738ba3"
---


<img src="/assets/img/2024-05-12-WhyYouMightNotNeedanEffectOptimizingReactComponents_0.png" />

요즘 리액트 개발에서 useEffect 훅은 강력한 도구입니다. 그러나 종종 과도하게 사용되거나 잘못 사용되어 불필요한 복잡성과 성능 문제를 야기할 수 있습니다. useEffect에 항상 의지하는 대신, 고려할 가치가 있는 대안들이 있습니다. 이 글에서는 그러한 대안을 탐구하고 실용적인 코딩 예제를 제공합니다.

# 흔한 오용 사례

# 1. 상태 동기화



일반적인 사용 사례는 상태 변수를 동기화하는 것입니다. 하지만 리액트의 onChange 및 다른 이벤트 핸들러들은 대부분의 상태 업데이트를 직접 처리할 수 있습니다.

잘못된 예시:

```js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [double, setDouble] = useState(0);

  useEffect(() => {
    setDouble(count * 2); // 이중 값 계산을 위한 사이드 이펙트
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <p>카운트: {count}</p>
      <p>이중: {double}</p>
    </div>
  );
}
```

최적화된 솔루션:



```js
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const double = count * 2; // useEffect 없이 직접 계산

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <p>카운트: {count}</p>
      <p>더블: {double}</p>
    </div>
  );
}
```

# 2. 데이터 가져오기

useEffect에서 데이터를 가져오는 것은 필수적이지만, react-query나 React의 새로운 Server Components와 같은 데이터 가져오기 라이브러리를 사용하여 간단히할 수 있습니다.

잘못된 예시:



```js
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setProfile(data);
    }
    fetchProfile();
  }, [userId]);
  return profile ? <div>{profile.name}</div> : <p>Loading...</p>;
}
```

React 서버 구성 요소를 사용한 최적화된 해결책:

```js
// components/UserProfile.server.js
import React from 'react';

export default async function UserProfile({ userId }) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const profile = await response.json();

  return <div>{profile.name}</div>;
}
```

클라이언트 컴포넌트에서의 사용법:




// components/App.client.js
import UserProfile from './UserProfile.server';

function App({ userId }) {
  return (
    <div>
      <h1>User Profile</h1>
      <UserProfile userId={userId} />
    </div>
  );
}

export default App;


## 3. Form Inputs and Debounced Updates

Instead of debouncing updates through useEffect, handle it directly via controlled input components.

Incorrect Example:




```js
import { useState, useEffect } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

커스텀 훅을 사용한 최적화된 솔루션:

```js
import { useState } from 'react';
import useDebounce from './useDebounce';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

useDebounce 커스텀 훅은 디바운싱 로직을 캡슐화합니다:



```js
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;
```

# 4. Prop이 변경될 때 모든 상태를 재설정하는 방법

다른 항목 간을 이동할 때 폼 필드나 필터와 같은 상태 변수를 재설정하는 것이 중요합니다. 이 재설정을 처리하는 비효율적인 방법은 useEffect 훅을 사용하여 prop 변경에 따라 상태를 수동으로 지우는 것입니다. 그러나 이렇게 하면 추가 렌더링 사이클이 발생하고 불필요한 복잡성을 야기합니다.

올바르지 않은 예시:



```js
import { useState, useEffect } from 'react';

export default function ItemDetails({ itemId }) {
  const [input, setInput] = useState('');
  // 🔴 비효율적: 효과를 이용해 상태를 재설정
  useEffect(() => {
    setInput(''); // itemId가 변경될 때 입력 필드를 지움
  }, [itemId]);

  return <input value={input} onChange={(e) => setInput(e.target.value)} />;
}
```

효과에 의존하는 대신 key prop을 사용하여 자동으로 재설정되도록 할 수 있습니다. 컴포넌트를 둘로 분리하고 내부 컴포넌트에 고유한 key prop을 전달하면 React가 새로운 인스턴스로 처리하여 모든 내부 상태를 재설정합니다.

최적화된 솔루션:

```js
export default function ItemDetails({ itemId }) {
  return <ItemForm itemId={itemId} key={itemId} />;
}

function ItemForm({ itemId }) {
  // ✅ key 변경 시 상태 자동 재설정
  const [input, setInput] = useState('');
  return (
    <div>
      <h2>아이템 {itemId}에 대한 세부정보</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
  );
}
```



# 결론

React의 useEffect는 가치가 있지만 종종 잘못 적용될 수 있습니다. 많은 경우, 이벤트 핸들러, react-query와 같은 라이브러리, 또는 커스텀 훅과 같은 대안적인 접근 방식을 사용하면 더 깔끔하고 유지보수가 쉬운 해결책을 제공할 수 있습니다. 더 많은 정보를 원하신다면 React의 가이드를 확인해보세요.