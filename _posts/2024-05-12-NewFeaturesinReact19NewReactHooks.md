---
title: "리액트 19의 새로운 기능 - 새로운 리액트 훅"
description: ""
coverImage: "/assets/img/2024-05-12-NewFeaturesinReact19NewReactHooks_0.png"
date: 2024-05-12 21:07
ogImage: 
  url: /assets/img/2024-05-12-NewFeaturesinReact19NewReactHooks_0.png
tag: Tech
originalTitle: "New Features in React 19 — New React Hooks"
link: "https://medium.com/@vageeshawihangi/new-features-in-react-19-new-react-hooks-af9c05d0d284"
---


🚀 React 19의 새로운 시대를 탐험하다: 혁명적인 훅의 일단 봐 🌟

![이미지](/assets/img/2024-05-12-NewFeaturesinReact19NewReactHooks_0.png)

안녕하세요, React 팬 여러분! 우리의 컴포넌트와 상호 작용하는 방법을 재정의할 새로운 훅이 등장하는 React 19의 미래로 여행을 떠나 봅시다. React Hooks의 팬이라면, 놀라운 일이 기다리고 있어요!

React Hooks의 진화:



리액트 훅스는 처음 소개된 이후로 게임 체인저 역할을 했어요. 상태 관리와 라이프사이클 메서드를 간편하게 만들어주죠. 만약 리액트의 내장 훅을 사용하거나 사용자 정의 훅을 만들었다면, 당신의 애플리케이션에 가져다주는 힘과 유연성을 고맙게 느낄 거예요.

리액트 19에서는 useMemo, forwardRef, useEffect, useContext의 사용 방법이 바뀔 거에요. 이는 새로운 훅, use가 소개되기 때문이죠.

useMemo()로 간단한 메모이제이션:

주목할만한 변경 중 하나는 useMemo() 훅의 단순화입니다. 리액트 19 이후에는 useMemo()을 명시적으로 사용할 필요가 없어요. 새 리액트 컴파일러가 메모이제이션을 자동으로 처리할 거예요. 이는 더 깨끗한 코드와 향상된 성능을 가져다줘요. 아래 예시에서 보여드릴게요:



React 19 이전:

```js
import React, { useState, useMemo } from 'react';

function ExampleComponent() {
  const [inputValue, setInputValue] = useState('');

  // 입력 값이 비어 있는지 확인 결과를 메모이제이션합니다
  const isInputEmpty = useMemo(() => {
    console.log('입력 값이 비어 있는지 확인 중...');
    return inputValue.trim() === '';
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="뭔가 입력해 보세요..."
      />
      <p>{isInputEmpty ? '입력 값이 비었습니다' : '입력 값이 비어 있지 않습니다'}</p>
    </div>
  );
}

export default ExampleComponent;
```

React 19 이후:

```js
import React, { useState } from 'react';

function ExampleComponent() {
  const [inputValue, setInputValue] = useState('');

  const isInputEmpty = () => {
    console.log('입력 값이 비어 있는지 확인 중...');
    return inputValue.trim() === '';
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="뭔가 입력해 보세요..."
      />
      <p>{isInputEmpty ? '입력 값이 비었습니다' : '입력 값이 비어 있지 않습니다'}</p>
    </div>
  );
}

export default ExampleComponent;
```



아래 예제에서 확인할 수 있듯이 React19 이후에는 값에 memo를 적용할 필요가 없습니다. React19에서는 이 기능을 자체적으로 처리합니다. 코드가 훨씬 깔끔해졌죠.

forwardRef()로 리팩터링:

React 19에서 forwardRef()를 사용하는 컴포넌트를 리팩터링하는 것은 간단해졌습니다. forwardRef()를 사용하는 대신 ref를 직접 속성으로 전달할 수 있으며, 코드의 복잡성을 줄일 수 있습니다:

```js
// React 19 이전
const ExampleButton = forwardRef((props, ref) => (
  <button ref={ref}>
    {props.children}
  </button>
));

// React 19 이후
const ExampleButton = ({ ref, children }) => (
  <button ref={ref}>
    {children}
  </button>
);
```



새로운 'use' Hook을 소개합니다:

React 19에서 가장 흥미로운 추가 기능은 'use' 훅인데요, 이를 통해 우리는 약속, 비동기 코드 및 컨텍스트를 다루는 방법을 단순화할 수 있습니다. 이 훅은 다음 예시에서 보여지는 것처럼 더 깔끔하고 간결한 코드를 작성할 수 있습니다:

```js
const users = use(fetchUsers());
```

'use' 훅을 통해 비동기 작업 및 컨텍스트를 처리하는 새로운 가능성을 엽니다.



아래 코드는 fetch 요청이 ne "use" 훅과 함께 처리되는 방법을 보여줍니다.

```js
import { use } from "react";

const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
};

const UsersItems = () => {
    const users = use(fetchUsers());

    return (
        <ul>
            {users.map((user) => (
                <div key={user.id} className='bg-blue-50 p-2 my-4 rounded-lg'>
                    <h2 className='text-xl font-bold'>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </ul>
    );
};

export default UsersItems;
```

이 코드는 다음과 같은 방식으로 작동합니다: fetchUsers 함수가 GET 요청을 처리합니다.
use 훅을 사용하여 fetchUsers 함수를 실행합니다. useEffect나 useState 훅을 사용하는 대신에 사용합니다.
useState 훅의 반환값은 사용자가 될 것이고, 이는 GET 요청의 응답(사용자)을 갖게 됩니다.
return 블록에서는 사용자를 사용하여 매핑하고 목록을 생성합니다.

새로운 훅을 사용할 수 있는 다른 곳은 Context입니다. React에서 Context API는 외부 상태 관리 라이브러리를 필요로하지 않고 컴포넌트 전체에서 전역 상태를 효과적으로 관리하는 강력한 방법을 제공합니다. use 훅의 도입으로 Context 작업이 더욱 간단해졌습니다.



표 태그를 마크다운 형식으로 변경하세요.



두 번째 예시는 테이블 태그가 아닌 HTML5로 렌더링된 SVG이미지를 사용하는 방법입니다. HTML5의 캔버스 요소를 사용하여 그래픽을 생성하고 작업할 수 있습니다. 이 예시에서는 표시되는 SVG이미지와 사용된 JavaScript 코드를 확인할 수 있습니다.



```js
const { status } = useFormStatus()
```

pending: Form이 보류 상태에 있으면 true가 되고, 그렇지 않으면 false가 됩니다.
data: parent `form`이 제출하는 데이터가 포함된 FormData 인터페이스를 구현한 객체입니다.
method: HTTP 메소드 — GET 또는 POST. 기본적으로 GET일 것입니다.
action: 함수 참조

useFormStatus()를 사용하여 Form 제출 상태에 따라 UI를 업데이트하는 반응형 Form을 만들 수 있습니다.

다음은 코드 예시입니다:



```js
import { useFormStatus } from "react-dom";

function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending}>{status.pending ? '제출 중...' : '제출'}</button>;
}

const formAction = async () => {
  // 2초 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

const FormStatus = () => {
  return (
    <form action={formAction}>
      <Submit />
    </form>
  );
};

export default FormStatus;
```

위의 코드에서, 폼을 제출하면 useFormStatus 훅에서 보류 상태를 가져옵니다. 보류 중일 때 UI에 "제출 중..."이라는 텍스트가 표시됩니다. 보류가 false가 되면 "제출"으로 텍스트가 변경됩니다.

useFormState() 훅

useFormState() 훅을 사용하면 폼 제출 결과를 기반으로 상태를 업데이트할 수 있습니다. 이는 특히 폼의 결과에 따라 UI 요소를 업데이트하거나 동작을 트리거하는 데 유용합니다:




여기가 문법입니다:

```js
const [state, formAction] = useFormState(fn, initialState, permalink?);
```

fn: 폼이 제출되거나 버튼이 눌릴 때 호출되는 함수입니다.
initialState: 상태가 초기에 가질 값입니다. 직렬화 가능한 값이어야 합니다. 이 인수는 처음 액션이 호출된 후 무시됩니다.
permalink: 옵션입니다. fn이 서버에서 실행될 경우 페이지가 permalink으로 리디렉트됩니다.

이 훅은 반환할 것입니다:



초기 상태: initialState로 전달한 값이 초기 상태로 설정됩니다.
formAction: 폼 액션으로 전달될 액션입니다. 이 값의 반환값이 상태에서 사용 가능합니다.

useFormState()를 사용하면 복잡한 상태 관리 로직 없이 폼 상태를 쉽게 관리하고 폼 제출에 기반한 작업을 수행할 수 있습니다.

useOptimistic() 훅:

useOptimistic() 훅을 사용하면 비동기 작업이 진행 중일 때 다른 상태를 표시하여 더 반응성 있는 사용자 경험을 제공할 수 있습니다. 요청이 성공할 것이라 가정하고 즉시 UI를 업데이트하여 서버로부터 응답을 받기 전에도 UI가 갱신됩니다.



여기 문법이에요:

```js
const [ optimisticMessage, addOptimisticMessage] = useOptimistic(state, updatefn)
```

예를 들어, 응답이 오는 중일 때 사용자에게 즉각적인 응답을 제공하기 위해 "상태"를 표시할 수 있어요. 실제 응답이 서버로부터 반환되면 "낙관적" 상태가 그것으로 대체될 거예요.

`useOptimistic` 훅은 요청이 성공할 것으로 가정하고 즉시 UI를 업데이트할 거예요. 이름이 "낙관적"인 이유는 사용자가 작업을 수행하는 낙관적(성공) 결과를 보게 되지만 실제 작업 완료까지 시간이 걸리기 때문이에요.



useOptimistic()을 사용하면 양식의 인지 성능을 향상시키고 사용자에게 즉각적인 피드백을 제공할 수 있습니다.

다음 섹션에서는 useOptimistic 훅의 실제 구현에 대해 실제 예제로 자세히 살펴보겠습니다. 코드 실습과 즐거운 코딩을 기대해주세요!! 🚀

관련 링크

React 19의 새로운 기능



React 19의 새로운 기능 — React 컴파일러

React 19의 새로운 기능 — 서버 컴포넌트

React 19의 새로운 기능 — 액션

React 19의 새로운 기능 — 웹 컴포넌트



React 19의 새로운 기능 — 문서 메타데이터

React 19의 새로운 기능 — 자산 로딩