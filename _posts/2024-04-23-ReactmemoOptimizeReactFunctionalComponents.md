---
title: "Reactmemo를 사용하여 React 함수형 컴포넌트 성능 최적화하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Reactmemo  Optimize React Functional Components"
link: "https://medium.com/@amalhan43/react-memo-optimize-react-functional-components-0e42f91e6579"
---



![ReactmemoOptimizeReactFunctionalComponents_0](/assets/img/ReactmemoOptimizeReactFunctionalComponents_0.png)

리액트에서 함수형 컴포넌트의 성능을 최적화하는 것은 부드럽고 효율적인 사용자 인터페이스를 보장하기 위해 중요합니다. 이를 달성하는 한 가지 방법은 React.memo 함수를 사용하는 것인데, 이 함수는 이러한 컴포넌트의 렌더링 프로세스를 최적화하는 데 도움이 되는 고차 컴포넌트입니다. 이 글에서는 React.memo의 개념을 살펴보고 이를 통해 리액트 애플리케이션의 성능을 향상시킬 수 있는 방법을 알아보겠습니다.

## 설명:

React.memo는 함수형 컴포넌트의 렌더링 결과를 메모이제이션하는 데 사용할 수 있는 함수입니다. 이 함수는 컴포넌트의 렌더링 출력을 캐싱하고 컴포넌트에 전달된 입력(프롭스)이 변경될 때만 다시 렌더링합니다. 이는 복잡한 컴포넌트나 큰 데이터 세트를 처리할 때 불필요한 다시 렌더링의 수를 크게 줄일 수 있습니다.

<div class="content-ad"></div>

## 예시:

간단한 예시를 살펴보겠습니다. "UserList"라는 기능 컴포넌트가 사용자 목록을 렌더링합니다. 사용자 목록은 컴포넌트에 속성(prop)으로 전달됩니다. React.memo를 사용하지 않으면 부모 컴포넌트의 변경이 발생하면 "UserList" 컴포넌트가 완전히 다시 렌더링됩니다. 심지어 사용자 목록이 동일한 경우에도요.

```js
import React from "react";

const UserList = ({ users }) => {
  return -item1 - item2 - item3;
};
export default UserList;
```

"UserList" 컴포넌트의 렌더링을 최적화하기 위해 React.memo로 래핑할 수 있습니다.

<div class="content-ad"></div>

```js
import React from "react";

const UserList = React.memo(({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
});
export default UserList;
```

이제, 부모 컴포넌트가 다시 렌더링되더라도 사용자 목록이 동일하면 React.memo가 "UserList" 컴포넌트의 재렌더링을 방지할 것입니다. 사용자 prop이 변경될 때만 다시 렌더링됩니다.

## 결론:

React.memo는 React의 함수형 컴포넌트의 성능을 최적화하기 위한 강력한 도구입니다. 렌더링 결과를 메모이제이션함으로써 불필요한 재렌더링을 줄이고 응용 프로그램의 전반적인 효율성을 향상시킵니다. 특히 렌더링 프로세스가 비용이 많이 드는 컴포넌트나 props로 대량의 데이터가 전달되는 컴포넌트와 관련된 경우, React.memo를 분별하여 사용하는 것을 기억해 주세요.

<div class="content-ad"></div>

고맙습니다! 끝까지 오신 것을 반가워요.

저와 소통해요. 아래 링크를 클릭하시면 더 많이 알 수 있어요.

다음 블로그를 발행할 때 알림을 받으려면 구독해주세요. 다음에 만나요.
