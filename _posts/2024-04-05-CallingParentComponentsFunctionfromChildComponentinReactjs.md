---
title: "Reactjs에서 자식 컴포넌트에서 부모 컴포넌트의 함수 호출하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Calling Parent Components Function from Child Component in Reactjs"
link: "https://medium.com/@s.salman0193/calling-parent-components-function-from-child-component-in-react-js-e2d550ccd66b"
isUpdated: true
---





React.js에서는 데이터와 함수를 부모 컴포넌트에서 자식 컴포넌트로 props를 통해 전달하는 것이 일반적입니다. 그러나 자식 컴포넌트에서 부모 컴포넌트의 함수를 호출해야 하는 경우는 어떨까요? 자식 컴포넌트 내에서 발생하는 이벤트를 기반으로 부모의 상태를 업데이트하거나 다른 작업을 수행해야 할 때 이러한 상황이 발생할 수 있습니다. 다행히 React는 이를 달성하기 위한 간편하고 효과적인 방법을 제공합니다.

방법 1: 콜백 함수

부모 컴포넌트의 함수를 자식 컴포넌트에서 호출하는 한 가지 방법은 자식 컴포넌트로 콜백 함수를 props로 전달하는 것입니다. 작동 방식은 다음과 같습니다:

- 부모 컴포넌트에서 자식 컴포넌트로 전달할 함수를 정의합니다.

<div class="content-ad"></div>

```js
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <ChildComponent onIncrement={handleIncrement} />
      <p>Count: {count}</p>
    </div>
  );
};
export default ParentComponent;
```

- 자식 컴포넌트에서는 프롭을 함수로 사용하고 이벤트가 발생할 때 호출하십시오.

```js
import React from "react";

const ChildComponent = ({ onIncrement }) => {
  return <button onClick={onIncrement}>Count 증가</button>;
};
export default ChildComponent;
```

방법 2: Ref 사용하기

<div class="content-ad"></div>

부모 컴포넌트의 함수를 자식 컴포넌트에서 호출하는 또 다른 방법은 refs를 사용하는 것입니다. 이 방법은 부모 함수를 직접 호출해야 할 때 유용합니다. 예를 들어, 폼 제출이나 API 호출과 같은 경우입니다.

- 부모 컴포넌트에서 ref를 생성하고 이를 자식 컴포넌트로 전달하세요.

```js
import React, { useRef } from "react";
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
  const childRef = useRef(null);
  const handleParentFunction = () => {
    // 부모 컴포넌트에서 작업 수행
  };
  return (
    <div>
      <ChildComponent ref={childRef} parentFunction={handleParentFunction} />
    </div>
  );
};
export default ParentComponent;
```

- 자식 컴포넌트에서 useImperativeHandle을 사용하여 부모 함수를 노출하세요.

<div class="content-ad"></div>

```js
import React, { forwardRef, useImperativeHandle } from "react";

const ChildComponent = forwardRef(({ parentFunction }, ref) => {
  const handleChildEvent = () => {
    // 자식 컴포넌트에서 무언가를 수행합니다
    parentFunction(); // 부모 함수 호출
  };
  useImperativeHandle(ref, () => ({
    // 부모 함수를 부모 컴포넌트에 노출
    callParentFunction: handleChildEvent,
  }));
  return <button onClick={handleChildEvent}>Call Parent Function</button>;
});
export default ChildComponent;
```

결론

React.js에서 자식 컴포넌트에서 부모 컴포넌트의 함수를 호출하는 것은 콜백 함수 또는 ref를 사용하여 수행할 수 있습니다. 이러한 간단한 방법을 따르면 부모 및 자식 컴포넌트 간의 원활한 통신을 구축하여 더 다이내믹하고 인터랙티브한 애플리케이션을 개발할 수 있습니다. 콜백 함수 또는 ref 중 어떤 것을 선택할지는 특정 사용 사례에 따라 다를 수 있지만, 두 가지 방법 모두 컴포넌트 간 상호 작용을 유연하게 관리하는 데 강력하고 유연성을 제공합니다.




