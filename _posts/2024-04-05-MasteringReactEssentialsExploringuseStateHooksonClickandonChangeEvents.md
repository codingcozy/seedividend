---
title: "리액트 기초 정리 useState 훅, onClick 및 onChange 이벤트"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Mastering React Essentials Exploring useState Hooks, onClick, and onChange Events"
link: "https://medium.com/@otahaghogho/mastering-react-essentials-exploring-usestate-hooks-onclick-and-onchange-events-3534cf8dd023"
isUpdated: true
---

소개: React와 함께 하는 여정은 정말 흥미로운 경험이지만, 강력하고 동적인 웹 애플리케이션을 구축하려면 React의 핵심 개념을 숙달하는 것이 중요합니다. 이 포괄적인 안내서에서는 useState 훅, onClick 이벤트, onChange 이벤트 세 가지 핵심 개념에 대해 살펴보겠습니다. 실용적인 코드 샘플과 실제 사례를 통해 이러한 기본 요소에 대한 견고한 이해를 얻을 수 있어 사용자 경험을 원활하게 만들고 React 기술을 한 단계 높일 수 있습니다.

- useState 훅의 힘을 이해하기:

- useState 훅을 사용하면 함수형 컴포넌트에서 클래스 컴포넌트를 사용하지 않고 상태를 관리할 수 있습니다.
- 실용적인 예제: useState 훅을 사용하여 카운터 애플리케이션을 생성하여 카운트 상태를 추적하고 업데이트하는 방법.

```javascript
import React, { useState } from "react";
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

```js
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
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

```javascript
export default Counter;

2. Handling onClick Events:

- onClick 이벤트를 사용하면 사용자가 버튼이나 링크와 같은 요소와 상호 작용할 때 동작이나 함수를 트리거할 수 있습니다.
- 실제 예시: 라이트 모드와 다크 모드를 전환하는 토글 버튼 구현하기.

import React, { useState } from 'react';
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

```javascript
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`App ${theme}`}>
      <h1>테마: {theme}</h1>
      <button onClick={toggleTheme}>테마 전환</button>
    </div>
  );
}

export default ThemeToggle;
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

3. onChange 이벤트의 힘을 활용해보세요:

- onChange 이벤트는 사용자 입력을 캡처하고 폼 요소의 값이 변경될 때 동작을 트리거하는 데 사용됩니다.
- 실제 예시: 사용자 입력을 관리하는 제어 컴포넌트를 사용해 동적 폼을 만드는 것입니다.

```javascript
import React, { useState } from “react”;

function DynamicForm() {
   const [inputValue, setInputValue] = useState(“”);
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

```js
const handleChange = (e) => {
  setInputValue(e.target.value);
};

return (
  <div>
    <input type="text" value={inputValue} onChange={handleChange} placeholder="텍스트를 입력하세요..." />
    <p>입력한 내용: {inputValue}</p>
  </div>
);

export default DynamicForm;
```

결론: 축하합니다! 이제 React의 기초를 습득했습니다. useState 훅을 사용하여 상태를 관리하고 onClick 및 onChange 이벤트를 처리하는 방법까지 배웠습니다. 이러한 개념을 실전 시나리오에 적용함으로써 React 개발자로서 여정을 시작할 기초 기술을 습득했습니다. 계속해서 탐험하고 실험하며 빌드하는 과정에서 React 전문가로서의 역량이 계속 성장함을 확인할 것입니다.

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

행복한 코딩하세요!

```js
/
```
