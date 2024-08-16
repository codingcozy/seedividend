---
title: "리액트 제어 및 비제어 훅"
description: ""
coverImage: "/assets/img/2024-05-12-Reactcontrolledanduncontrolledhooks_0.png"
date: 2024-05-12 21:02
ogImage: 
  url: /assets/img/2024-05-12-Reactcontrolledanduncontrolledhooks_0.png
tag: Tech
originalTitle: "React controlled and uncontrolled hooks"
link: "https://medium.com/@manish-baral/react-controlled-and-uncontrolled-hooks-0ddd675560f6"
isUpdated: true
---




<img src="/assets/img/2024-05-12-Reactcontrolledanduncontrolledhooks_0.png" />

리액트에서, 제어 및 비제어 컴포넌트는 폼 입력을 관리하는 데 사용되는 패턴입니다. 리액트 훅은 함수형 컴포넌트 내에서 상태를 관리하기 위한 제어 및 비제어 훅의 개념을 도입했습니다. 여기에 대한 개요입니다:

## 제어 훅(Controlled Hooks):

useState 훅: 제어 훅을 사용하면 상태가 직접적으로 리액트에 의해 관리됩니다. useState 훅을 사용하면 상태 변수를 선언하고, 리액트가 제공하는 setter 함수를 사용하여 해당 변수를 업데이트할 수 있습니다. 컴포넌트의 상태가 변경되면 리액트가 업데이트된 상태로 컴포넌트를 다시 렌더링합니다.



```js
import React, { useState } from 'react';

function ControlledComponent() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
```

이 예시에서는 입력 필드의 값이 'value' 상태 변수에 의해 제어되며, 업데이트는 'setValue' 함수로 처리됩니다.

## Uncontrolled Hooks:

useRef Hook: Uncontrolled hooks를 사용하면 DOM 내부에서 상태를 직접 관리할 수 있습니다. React의 상태 관리 시스템을 통해가 아니라 직접 DOM 내에서 관리할 수 있습니다. useRef 훅은 렌더링 간에 다시 렌더링을 유발하지 않고 지속되는 값(current 속성)을 보유할 수 있는 가변 ref 객체를 생성합니다. 




```js
import React, { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Log Value</button>
    </div>
  );
}
```

이 예제에서 입력 필드의 값은 inputRef.current.value를 통해 DOM에 의해 직접 관리되며 변경 사항은 React의 상태 관리 시스템을 거치지 않고 액세스됩니다.

# 제어 및 비제어 훅 사이 선택하기:

- 제어된 훅(Controlled Hooks): React가 응용 프로그램 전체의 form 입력 상태를 관리하고 동기화해야 할 때 제어된 훅을 사용하세요. 제어된 컴포넌트는 form 데이터에 대한 단일 진실의 원천을 제공하여 변경 사항을 추적하고 관리하기 쉽게 만듭니다.
- 비제어 훅(Uncontrolled Hooks): DOM 요소에 직접 액세스해야 하는 경우나 제어된 컴포넌트가 성능 문제를 일으킬 수 있는 대형 폼을 다룰 때 비제어 훅을 사용하세요. 비제어 컴포넌트는 모든 상태 변경마다 다시 렌더링을 유발하지 않아 더 빠를 수 있습니다. 그러나 복잡한 응용 프로그램에서는 특히 추적하고 관리하기 어려울 수 있습니다.



제어 및 비제어 훅은 각자의 사용 사례가 있으며 선택은 특정 요구 사항과 선호도에 따라 다릅니다.