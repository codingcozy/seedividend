---
title: "리액트의 useCallback이 어떻게 작동하는지 알아보기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How ReactuseCallback works"
link: "https://medium.com/@ramnayan699/how-react-usecallback-working-with-react-memo-f9d8129ed8f7"
isUpdated: true
---

![HowReactuseCallbackworks_0](/assets/img/HowReactuseCallbackworks_0.png)

React.useCallback: useCallback은 React Hook으로, 다시 렌더링 사이에 함수 정의를 캐시할 수 있게 해줍니다.

렌더링 성능을 최적화할 때, 자식 컴포넌트로 전달하는 함수를 캐치해야 합니다.

```js
/** 부모 컴포넌트 */

import React, { useCallback, useState } from "react";
import "./styles.css";
import Child from "./child";

export default function Parent({ theme, addCount }) {
  const [count, setCount] = useState(0);
  const [member, addMember] = useState(0);

  // 캐시된 함수, 테마가 변경될 때마다 이는 다른 함수가 될 것입니다(동일한 함수 정의지만 다른 id/주소)
  const onCount = useCallback(() => {
    setCount(addCount + 1);
  }, [addCount]);

  const handleMember = () => {
    addMember(member + 1);
  };

  return (
    <div className={theme}>
      <h4>Member : {member} </h4>
      <h4>Count : {count} </h4>
      <button onClick={handleMember}>Add Member</button>
      <Child onCount={onCount} />
    </div>
  );
}


/** App 컴포넌트 */

import "./styles.css";
import Parent from "./parent";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Parent theme={"dark"} addCount={1} />
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

기본적으로 React는 컴포넌트가 다시 렌더링될 때 모든 하위 컴포넌트를 재귀적으로 다시 렌더링합니다. 따라서 부모 컴포넌트가 다른 테마 속성으로 다시 렌더링되면 자식 컴포넌트도 다시 렌더링됩니다. 그러나 자식 컴포넌트의 다시 렌더링을 건너뛰고 싶다면 React.memo를 사용하세요.

```js
import React, { memo } from "react";

function Child({ onCount }) {
  return (
    <div className="App">
      <h4>자식 컴포넌트</h4>
      <button onClick={onCount}>카운트 추가</button>
    </div>
  );
}

export default memo(Child);
```

데모👉Codesandbox

React의 useCallback에 대해 더 많이 읽고 싶다면 React 업데이트된 문서 페이지를 확인해보세요.

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

여기에 오신 걸 환영합니다! 👍
