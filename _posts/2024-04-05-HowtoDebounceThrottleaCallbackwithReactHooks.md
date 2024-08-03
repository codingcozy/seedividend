---
title: "리액트 훅을 사용하여 콜백을 Debounce하고 Throttle하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to Debounce Throttle a Callback with React Hooks"
link: "https://medium.com/programming-essentials/how-to-debounce-throttle-a-callback-with-react-hooks-deb26b2fd7c"
---



<img src="/assets/img/HowtoDebounceThrottleaCallbackwithReactHooks_0.png" />

이전 글에서 우리는 텍스트 입력을 위한 현재 값과 디바운스 값 둘 다 제공하는 후크를 만드는 방법을 살펴보았어요. 이번에는 컴포넌트가 받는 입력 콜백을 디바운스하거나 스로틀할 거에요.

간단한 검색 입력을 관리하고 콜백을 받는 컴포넌트를 만들어 보겠습니다.

# Input 컴포넌트 만들기

<div class="content-ad"></div>

리액트에서 입력을 처리하는 표준 방식은 입력 값이 변경될 때 해당 state 변수도 변경하는 것입니다.

우리의 경우 이 상태 변수는 value라고 부르겠습니다.

```js
const [value, setValue] = useState("");
```

우리는 상태 변수를 검색 입력란과 연결하기 위해 해당 값과 onChange 속성을 설정합니다.

<div class="content-ad"></div>

```js
import { useState } from "react";
function DebouncedInput() {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  return <input type="search" value={value} onChange={onChange} />;
}
export default DebouncedInput;
```

# 콜백

이제 도전 과제로 돌아가서 컴포넌트 매개변수에 콜백을 추가해 봅시다.

```js
function DebouncedInput({ onInput }) {}
```

<div class="content-ad"></div>

처음에 컴포넌트는 사용자가 입력할 때 제공된 콜백을 호출합니다. 기본적으로는 onChange 핸들러 내에서 호출하는 것을 의미합니다.

```js
import { useState, useCallback } from "react";
function DebouncedInput({ onInput }) {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInput(newValue);
  };
  return <input type="search" value={value} onChange={onChange} />;
}
export default DebouncedInput;
```

사용자가 무언가를 입력할 때마다 onInput 콜백이 새 값과 함께 호출됩니다. 이게 좋은데, 때로는 네트워크 호출을 하고 사용자가 새 키를 누를 때마다 API를 호출하는 것이 아니라 타이핑을 멈추었을 때 호출하고 싶을 수도 있습니다.

# 디바운스된 콜백

<div class="content-ad"></div>

이미 도전에 대처하는 데 도움이 되는 유틸리티 함수가 라이브러리에 있음을 아시겠지만, 그런 함수를 다시 작성할 필요는 없습니다. 우리는 React 컴포넌트와 통합하기만 하면 됩니다.

debounce 함수는 함수와 주어진 밀리초 단위의 시간을 가져와 새로운 함수를 반환합니다. 반환된 함수를 여러 번 호출하면 주어진 밀리초 단위의 시간이 지난 후에 원래 함수를 호출합니다.

따라서 우리가 할 일은 콜백의 debounced 버전을 만드는 것입니다.

```js
const onInputDebounced = debounce(onInput, 400),
```

<div class="content-ad"></div>

하지만 React 함수 컴포넌트가 작동하는 방식 때문에 이 방법은 작동하지 않을 것입니다. 값 상태 변수가 변경될 때마다 함수 컴포넌트가 다시 렌더링되고 새로운 디바운스된 콜백이 생성됩니다.

입력 콜백이 변경될 때만 변경되는 디바운스된 콜백이 필요합니다. 이를 해결하기 위해 useCallback 훅을 사용할 수 있습니다.

useCallback 훅은 콜백과 의존성 목록을 가져와서 기억된 콜백을 반환합니다. 의존성이 변경될 때만 반환 콜백이 변경됩니다. 각 컴포넌트 재렌더링 시 useCallback이 호출되더라도 해당 케이스에서는 동일한 디바운스 함수가 반환됩니다.

```js
const onInputDebounced = useCallback(debounce(onInput, 400), [onInput]);
```

<div class="content-ad"></div>

해야 할 일은 이것이 전부에요. 이제 onChange 핸들러에서, 컴포넌트 매개변수에 제공된 핸들러 대신 디바운스된 콜백을 호출해야 합니다.

```js
import { useState, useCallback } from "react";
import { debounce } from "lodash";

function DebouncedInput({ onInput }) {
  const [value, setValue] = useState("");
  const onInputDebounced = useCallback(debounce(onInput, 400), [onInput]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputDebounced(newValue);
  };

  return <input type="search" value={value} onChange={onChange} />;
}

export default DebouncedInput;
```

# 디바운스된 콜백 사용하기

아래는 이전 DebouncedInput 컴포넌트를 사용하는 예시입니다. 사용자가 입력을 멈출 때까지 기다린 후 검색 콜백이 호출됨을 주목해주세요.

<div class="content-ad"></div>

```js
import DebouncedInput from "./DebouncedInput";
function App() {
  const search = (text) => {
    console.log({ search: text });
  };
  return (
    <form>
      <DebouncedInput onInput={search} />
    </form>
  );
}
export default App;
```

# 쓰로틀링된 콜백

비슷하게, throttle 유틸리티 함수를 사용하여 주어진 콜백을 쓰로틀링할 수 있습니다.

throttle은 함수와 밀리초 단위의 시간을 인자로 사용하며, 새로운 함수를 반환합니다. 반환된 함수는 여러 번 호출되어도 지정된 밀리초 단위로 원본 함수를 최대 한 번만 호출합니다.

<div class="content-ad"></div>

```js
import { useState, useCallback } from "react";
import { throttle } from "lodash";
function ThrottledInput({ onInput }) {
  const [value, setValue] = useState("");
  const onInputThrottled = useCallback(throttle(onInput, 400), [onInput]);
  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputThrottled(newValue);
  };
  return <input type="search" value={value} onChange={onChange} />;
}
export default ThrottledInput;
```

그것으로 끝입니다. 여기에 전체 코드가 있습니다.

읽어 주셔서 감사합니다!
