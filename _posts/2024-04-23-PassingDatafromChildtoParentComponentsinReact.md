---
title: "React에서 자식 컴포넌트에서 부모 컴포넌트로 데이터 전달하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Passing Data from Child to Parent Components in React"
link: "https://medium.com/@ozhanli/passing-data-from-child-to-parent-components-in-react-e347ea60b1bb"
---



React에서는 일반적으로 데이터가 부모 컴포넌트에서 자식 컴포넌트로 props를 통해 전달됩니다. 그러나 자식에서 부모로 데이터를 전달하는 것은 조금 더 복잡할 수 있습니다.

자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하는 한 가지 방법은 부모 컴포넌트에서 콜백 함수를 정의하고 해당 함수를 자식 컴포넌트로 props로 전달하는 것입니다. 자식 컴포넌트는 그런 다음 부모에 전달하려는 데이터와 함께 이 함수를 호출할 수 있습니다.

다음은 예시입니다:

```js
// 부모 컴포넌트
import { useState } from "react";
import Child from "./Child";

function Parent() {
  const [dataFromChild, setDataFromChild] = useState("");

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  return (
    <div>
      <h1>자식으로부터의 데이터: {dataFromChild}</h1>
      <Child sendDataToParent={handleDataFromChild} />
    </div>
  );
}

export default Parent;

// 자식 컴포넌트
import { useState } from "react";

function Child({ sendDataToParent }) {
  const [data, setData] = useState("");

  function handleClick() {
    sendDataToParent(data);
  }

  return (
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={handleClick}>부모에 데이터 전송</button>
    </div>
  );
}

export default Child;
```

<div class="content-ad"></div>

이 예제에서 Parent 컴포넌트는 dataFromChild라는 상태 변수와 이를 업데이트하는 handleDataFromChild 함수를 정의합니다. Parent 컴포넌트는 또한 `Child` 컴포넌트를 렌더링하고 sendDataToParent라는 prop으로 handleDataFromChild 함수를 하향 전달합니다.

Child 컴포넌트는 자체의 상태 변수 data와 sendDataToParent 함수를 호출하는 handleClick 함수를 정의합니다. 이 함수는 현재 data 값을 인수로 사용하여 하향 전달된 sendDataToParent 함수를 호출합니다. Child 컴포넌트는 `input` 요소와 `button` 요소를 렌더링하며, 버튼이 클릭되면 handleClick 함수가 호출됩니다.

handleClick 함수가 호출되면 Parent 컴포넌트로부터 하향 전달된 sendDataToParent 함수가 호출됩니다. 이렇게 함으로써 Parent 컴포넌트의 handleDataFromChild 함수가 하위 컴포넌트의 data로 호출되어 dataFromChild 상태 변수가 업데이트됩니다. 마지막으로, 업데이트된 dataFromChild 값이 Parent 컴포넌트의 `h1` 요소에 표시됩니다.

이 방식을 통해 하위 컴포넌트가 부모 컴포넌트와 깔끔하고 효율적으로 통신할 수 있습니다. 부모 컴포넌트에서 콜백 함수를 정의하고 이를 prop으로 하위 컴포넌트로 전달함으로써, 복잡한 상태 관리 기술에 의존하지 않고도 하위 컴포넌트에서 상위 컴포넌트로 데이터를 쉽게 전달할 수 있습니다.

<div class="content-ad"></div>

요약하자면, React에서 자식 컴포넌트에서 상위 컴포넌트로 데이터를 전달하는 것은 상위 컴포넌트에서 콜백 함수를 정의하고 이를 자식 컴포넌트로 prop으로 전달하여 달성할 수 있습니다. 자식 컴포넌트는 이 함수를 호출하여 상위 컴포넌트로 전달하려는 데이터를 전달할 수 있으며, 이를 통해 컴포넌트 간에 효율적이고 간단한 통신이 가능해집니다.
