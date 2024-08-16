---
title: "React useEffect를 올바르게 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React You are Using useEffect Wrong, Do This Instead"
link: "https://medium.com/stackademic/why-you-should-avoid-using-useeffect-hook-in-react-and-what-to-do-instead-740660e33420"
isUpdated: true
---





![React hooks](/assets/img/ReactYouareUsinguseEffectWrongDoThisInstead_0.png)

리액트를 공부하기로 결정했다면, 훅(Hooks)은 가장 먼저 배워야 하는 것 중 하나입니다. 하지만 훅을 사용하는 것에 대해 처음에는 당황스러울 수도 있습니다. 훅은 리액트의 필수 요소로, 첫 번째 몇 버전의 리액트에서 발생한 여러 문제를 해결하기 위해 만들어졌습니다. 리액트는 렌더링이 컴포넌트의 라이프사이클 함수 내에서 모두 수행되던 시절이 있었는데, 그런 문제들을 해결하고자 만들어진 것이죠.

그렇다면, 모두가 처음으로 다루는 첫 번째 훅(함수)은 useState()와 useEffect()일 것입니다. useState()는 상태 관리와 컴포넌트가 다시 렌더링되어야 하는 시점을 제어하는 데 사용됩니다. 반면 useEffect()는 위에서 언급한 라이프사이클 함수와 약간 유사한 방식으로 동작합니다.

useEffect() 훅은 두 가지 출력을 받을 수 있습니다. 첫 번째는 콜백 함수이고, 두 번째는 선택적으로 이 훅이 언제 호출되어야 하는지 정의합니다.

<div class="content-ad"></div>

```js
  useEffect((prevProps) => { //prevProps는 선택적이며 특정 목적에 사용됩니다. 라이프사이클 함수와 비교될 때 어떻게 작동하는지 확인하십시오.
 //사용자 정의 함수 내용….
    사용자 정의 함수 내용…

    return () => {
      // 컴포넌트가 해제되거나 종속성이 변경될 때 실행할 코드
      // 메모리 누출과 예기치 못한 동작을 피하는 데 도움이 됩니다.
    };
  }, [배열 형태의 종속성]);
```

많은 초보자들이 많이 혼동하는 주의 사항 중 하나는 두 번째 매개변수가 어떻게 작동하는지이다. 요약해보겠습니다:

useEffect의 작동 방식을 다시 살펴보았으니, 메모이제이션이라는 최적화 기술에 대해 자세히 알아야 합니다. 메모이제이션은 불필요한 다시 렌더링을 방지하고, useEffect에서 종속성 배열을 다룰 때 특히 컴포넌트의 성능을 크게 향상시킬 수 있습니다.

useEffect 훅의 주요 아이디어는 외부 API나 데이터베이스 접근, HTTP 요청 완료를 기다릴 때와 같이 데이터 전송을 동기화하는 것입니다. 그러나 이 훅을 코드 내의 가능한 모든 상황에서 사용하는 경향이 있어서 코드가 특히 Case A와 C\*에 나열된 상황에서 더럽고 코드가 길어지면서 한 가지의 상태를 변경하면 프로세스 중에 종속성 배열의 하나를 변경하면 루프를 트리거할 수 있습니다.

<div class="content-ad"></div>

이렇게 코드를 너무 비효율적으로 만들 수도 있어요. useEffect는 마치 코드를 실행하다가 다른 일을 한 다음에 다시 메인 스레드로 돌아오는 것처럼 동작하기 때문에 더 효율적일 수 있어요.

좋아요, 이제 가끔은 useEffect가 최선의 해결책이 아닐 수 있다는 것을 알았네요. 이제 각각의 경우를 자세히 살펴보겠습니다.

이제 우리는 각 경우에 대해 상세히 이야기할 거에요:

약속한 해결책에 대해 이제 이야기해 볼게요. 이 두 컴포넌트(부모 및 자식)를 고려해 봅시다:

<div class="content-ad"></div>

```js
// ParentComponent.js
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from Parent!');
const incrementCount = () => {
 setCount(count + 1);
setMessage(`Button clicked ${count + 1} times!`);
}

  return (
      <ChildComponent count={count} message={message}
        callbackFunction={incrementCount} />
  );
}

export default ParentComponent;


// ChildComponent.js
import React from 'react';

function ChildComponent({ count, message, callbackFunction }) {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Received Count from Parent: {count}</p>
      <p>Received Message from Parent: {message}</p>
      <button onClick={callbackFunction}>Click Me</button>
    </div>
  );
}

export default ChildComponent;
```

여기에서 어떤 일이 일어나고 있는지 설명해보겠습니다:

우리는 코드를 수정해서 Child Component로 콜백 함수를 전달하도록 하였습니다. 이 변경사항을 주목해주세요:

<div class="content-ad"></div>

요약하자면, 여기서 제공된 통찰력은 가치 있는 지침을 제공하지만, 소프트웨어 개발은 동적인 분야임을 인식하는 것이 중요하며 해결책은 일상에 맞지 않는 경우가 있습니다. useEffect는 React의 매우 중요한 부분이지만 때로는 최선의 해결책이 아닐 수도 있습니다.

오늘은 여기까지입니다. 읽어 주셔서 감사합니다!

# Stackademic

오늘까지 읽어 주셔서 감사합니다. 떠나시기 전에:

<div class="content-ad"></div>

- 작가에게 박수를 보내고 팔로우해주세요! 👏
- 트위터(X)가 아닌 링크드인과 유튜브에서도 팔로우해주세요.
- 전 세계적으로 무료 프로그래밍 교육의 민주화를 실현하는 Stackademic.com을 방문해보세요.
