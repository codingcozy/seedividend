---
title: "React Hooks useState, useEffect를 제대로 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-NavigatingPitfallsAGuidetoReactHooksuseStateuseEffect_0.png"
date: 2024-05-20 23:26
ogImage: 
  url: /assets/img/2024-05-20-NavigatingPitfallsAGuidetoReactHooksuseStateuseEffect_0.png
tag: Tech
originalTitle: "Navigating Pitfalls: A Guide to React Hooks (useState , useEffect)"
link: "https://medium.com/@Choco23/navigating-pitfalls-a-guide-to-react-hooks-usestate-useeffect-2aa2d1eca746"
isUpdated: true
---




<img src="/assets/img/2024-05-20-NavigatingPitfallsAGuidetoReactHooksuseStateuseEffect_0.png" />

개발자로서, 우리는 종종 useState와 useEffect의 힘을 활용하여 애플리케이션에 생명을 불어넣는 황홀한 모험을 떠납니다. 그러나 흥분 속에, 조심하지 않는 이들을 덫에 걸릴 위험한 함정이 숨어 있습니다.

걱정하지 마세요. 이 안내서에서는 이 위험한 영역을 통과하기 위한 코스를 제시하여 안전하게 항해할 수 있는 지식과 도구를 갖춰 드립니다. 함께 useState와 useEffect의 신비를 해독하고 모험을 떠나 봅시다! 🌟

# useState

<div class="content-ad"></div>

```js
const [state, setState] = useState(initialState);
```

- 상태와 상태를 변경하는 함수를 반환합니다.
- 초기 렌더링 중에 반환된 상태(state)는 첫 번째 인수로 전달된 값(initialState)과 동일합니다.
- setState 함수는 상태를 업데이트하는 데 사용됩니다. 새 상태 값을 받아 구성 요소의 다시 렌더링을 대기열에 넣습니다.

## 상태 업데이트

setState 메서드를 통해 상태를 업데이트할 수 있습니다. 예를 들어:

<div class="content-ad"></div>

```js
const [count, setCount] = useState(0);

function handleOnClick(){
  setCount(prevCount => prevCount + 1)
  setCount(prevCount => prevCount + 1)
  setCount(prevCount => prevCount + 1)
}

return (
    <div>
        <div>
            count: {count}
        </div>
        <button onClick={handleOnClick}>
            +1
        </button>
    </div>
);
```

버튼을 클릭할 때 setCount(count + 1)을 세 번 연속 호출하면 인터페이스에 표시된 카운트 값이 +3이 아니라 +1씩만 증가하는 것을 알 수 있어요. 🔄

## 함수형 업데이트

새 상태를 이전 상태를 사용하여 계산해야 할 경우 setState에 함수를 전달할 수 있어요. 이 함수는 이전 상태를 받고 업데이트된 값을 반환할 거예요.


<div class="content-ad"></div>

```js
setCount(count => count + 1);
setCount(count => count + 1);
setCount(count => count + 1);
```

## 객체 업데이트

useState의 값이 객체일 때, 뷰가 업데이트되지 않는 상황이 발생할 수 있습니다. 예를 들어:

```js
const [list, setList] = useState([0, 1, 2]);
const [userInfo, setUserInfo] = useState({
  name: 'Bob',
  age: 20
});

function handleOnClick(){
  list.push(4);
  list.push(4);
  setList([...list]);

  userInfo.name = 'Jack';
  userInfo.age = 30;
  setUserInfo({...userInfo});
}

return (
    <div>
        <p>Name：{userInfo.name}</p>
        <p>Age：{userInfo.age}</p>
        <p>list.length: {list.length}</p>
        <button onClick={handleOnClick}>
            Edit
        </button>
    </div>
);
```

<div class="content-ad"></div>

문제의 원인: 문제는 React의 기본 얕은 비교 메커니즘에서 발생합니다. 상태가 객체인 경우 React는 객체의 참조(주소)를 스택에 저장합니다. setState를 호출하면 힙에있는 데이터가 수정되지만 스택의 참조는 변경되지 않습니다. React의 얕은 비교는 참조가 변경되었는지 확인하고, 그렇지 않으면 상태가 변경되지 않았다고 가정하고 페이지를 다시 렌더링하지 않습니다. 🔄

해결책: 단순히 원본 객체의 주소를 변경하면 이를 다음과 같은 방법으로 달성할 수 있습니다.

- 원본 객체를 복제합니다.
- ES6 전개 연산자를 사용합니다.

배열의 경우 배열의 자체 메서드 중 일부를 사용하여 깊은 복사를 수행할 수 있습니다.

<div class="content-ad"></div>

```js
// Array.slice
const nextList = list.slice(0);
nextList.push("slice");
setList(nextList);

// Array.concat
const nextList = list.concat();
nextList.push("concat");
setList(nextList);
```

요약: useState에서나 함수로 전달된 매개변수에서, 객체 자체를 직접 조작하지 말아야 합니다. 먼저 복사본을 만들고 그 복사본을 조작하여 예상치 못한 문제가 발생하는 것을 피하세요.

## setState 이후 최신 값 가져올 수 없음

setState는 즉시 업데이트되지 않기 때문에, React는 업데이트 전 어느 시점에서 여러 setState 호출을 병합합니다. 따라서 setState 이후 최신 값을 가져오는 것은 어려울 수 있습니다. 다음은 몇 가지 접근 방법입니다:

<div class="content-ad"></div>

1. useRef를 사용해보세요: 이 방법은 useState의 값을 저장하지만 화면 업데이트를 트리거하지 않습니다.

2. useEffect를 활용하세요: 효과적이지만 항상 적합한 방법은 아닙니다. 왜냐하면 이 방법은 모든 업데이트마다 내용을 실행하기 때문에 특정 요구에 부합하지 않을 수 있습니다.

3. 함수 업데이트를 사용하세요.

4. [useGetstate 훅 사용 원칙]: 최신 상태에 안전하게 액세스할 수 있는 hand를 제공하기 위해 useState값을 저장하는 useRef를 활용하세요. 🔄

```js
const [count, setCount] = useState(0);
const countRef = useRef(0);

useEffect(()=>{
  console.log("useEffect", count);
},[count]);

function handleOnClick(){
  countRef.current += 1;
  setCount(count + 1);
  setCount((count) => {
    return count;
  });
}

return (
    <div>
        <div>
            count: {count}
        </div>
        <button onClick={handleOnClick}>
            +1
        </button>
    </div>
);
```

<div class="content-ad"></div>

```js
const useGetState = (initiateState) => {
  const [state, setState] = useState(initiateState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
};
```

## 타이머에서 최신 값을 가져오기

다음 예제에서는 뷰나 출력과 관계없이 count의 값은 항상 0입니다.

```js
const [count, setCount] = useState(0);
useEffect(()=>{
  const interval = setInterval(() => {
    setCount(count + 1);
  },1000);
  return () => {
    clearInterval(interval);
  }
},[]);
```

<div class="content-ad"></div>

문제의 원인: 타이머가 생성된 후에 정리되지 않아 내부 상태가 항상 초기값을 반영하게 되었습니다.

해결책:

1️⃣ 타이머는 최신 상태를 캡처하기 위해 함수 업데이트를 사용하여 내부적으로 상태를 업데이트해야 합니다. 이렇게 하면 화면 업데이트 문제가 해결되지만 타이머는 여전히 0을 출력합니다.

2️⃣ useEffect에서 상태를 종속성으로 활용합니다. 이를 통해 상태 변경 후에 타이머가 다시 생성되어 문제가 해결됩니다. 🔄

<div class="content-ad"></div>

# useEffect

componentDidMount와는 달리, useEffect 훅에 전달된 함수는 브라우저가 레이아웃 및 그리기를 완료한 후 지연 이벤트로 호출됩니다. 🎨 이 특성은 구독 설정 및 이벤트 처리와 같은 여러 일반 부작용 시나리오에 적합하게 만듭니다. 🔄 이러한 작업은 일반적으로 브라우저의 화면 업데이트를 차단해서는 안됩니다.

```js
import React, { useState, useEffect } from 'react';

function Example(){
  const [count, setCount] = useState(0);

  useEffect(()=>{
    document.title = `You clicked &{count} times`;
  });

    return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

useEffect는 첫 번째 렌더링 및 모든 업데이트를 포함한 모든 렌더링 후에 실행됩니다. React는 효과가 실행될 때마다 DOM이 업데이트된 것을 보장합니다. 🔄✨

<div class="content-ad"></div>

다음은 `useEffect`를 언제 실행할지 결정하는 두 번째 매개변수에 대한 설명입니다.

```js
import { useState, useEffect } from "react";

export default () => {
   const [count, setCount] = useState(0);
   const [number, setNumber] = useState(0);

   // 의존성이 없는 경우, 매번 다시 렌더링될 때마다 실행됩니다.
   useEffect(() => {
     console.log("null", count);
   });

   // 의존성 값이 비어 있으며, 처음 렌더링 후 한 번만 실행됩니다.
   useEffect(() => {
     console.log("[]", count);
   }, []);

   // 의존성 값이 변경될 때만 실행되며, 첫 렌더링 시에도 실행됩니다.
   useEffect(() => {
     console.log("count", count);
   }, [count]);

    function addCount() {
    setCount(count + 1);
    }
  
    function addNumber() {
      setNumber(number + 1);
    }
  
    return (
      <div>
        <div>count: {count}</div>
        <div>number: {number}</div>
        <button onClick={addCount}>count+1</button>
        <button onClick={addNumber}>number+1</button>
      </div>
    );
}
```

## 의존성 값이 객체인 경우

자주 객체를 사용하여 의존 관계를 설정합니다.

<div class="content-ad"></div>

useEffect에서 객체의 변경 사항 처리하는 것이 중요합니다. 보통은 객체의 내용이 변경되었을 때 특정 작업을 수행하고 싶어합니다. 그러나 실제 비즈니스 개발 중에는 이유를 알 수 없는 문제가 발생할 수 있습니다. 몇 가지 흔한 현상을 살펴보겠습니다:

🤔 객체의 내용이 분명히 변경되었는데, 왜 useEffect가 작동하지 않을까요?

🤔 객체의 내용이 분명히 변경되지 않았는데, 왜 useEffect가 항상 작동할까요?

이것은 말장난처럼 들릴 수 있지만, 이 문제의 본질은 객체가 참조 유형이라는 점에 있습니다. 아래 예시를 통해 보다 깊은 이해를 얻을 수 있습니다. 🔄✨

<div class="content-ad"></div>

Case 1️⃣: 객체의 속성 값을 변경하면 useEffect가 트리거되지 않습니다

```js
const [info, setInfo] = useState({
  name: "Bob",
  age: 20
});

useEffect(() => {
  console.log("info", info);
},[info]);

function handleChangeName(e){
  const value = e.target.value;
  setInfo((info)=>{
    info.name = value;
    return info;
  });
}

return <input onChange={handleChangeName} />;
```

문제의 원인: setInfo를 호출할 때 입력 매개변수가 직접 변경됩니다. 이때 변경된 정보가 반환되며 그 참조가 변경되지 않습니다.

참고: 어떠한 경우에도 입력 매개변수를 직접 변경하거나 상태 값을 직접 변경해서는 안 됩니다.

<div class="content-ad"></div>


```js
//잘못된 작성법
info.name = value;
setInfo(info);

//잘못된 작성법
setInfo((info) => {
   info.name = value;
   return info;
});

//올바른 작성법
setInfo({
     ...info,
     name: value
});

// 올바른 작성법
setInfo((info) => {
   return {
     ...info,
     name: value
   };
});
```

Case 2️⃣: 부모 구성 요소의 객체 속성을 종속성으로 수락하여 useEffect가 자주 트리거됨

컴포넌트를 개발할 때 일부 속성에 대한 기본 값을 설정하는 것이 종종 필요합니다. 전형적인 접근 방식은 props를 구조화하고 기본 값 동시에 할당하는 것입니다. 🛠️🔧

```js
const {
    count = 0,
    list = []
} = 
```
 



<div class="content-ad"></div>

부모 컴포넌트에서 "list" 속성을 전달하지 않으면, 자식 컴포넌트는 부모 컴포넌트가 다시 렌더링될 때마다 다시 렌더링되어 useEffect가 각 렌더링마다 트리거됩니다. 🔃

```js
import { useState, useEffect } from "react";

const Com = () => {
  const [count, setCount] = useState(0);
  
  function handleOnClick(){
    setCount((count) => count + 1);
  }

  return (
    <div>
      <button onClick={hanleOnClick}>add</button>
      <SubCom count={count} />
    </div>
  );
};

const SubCom  = (props) => {
  const { list = [], count } = props;
  
  useEffect(() => {
    console.log(list)
  },[list])

  return <div>child component: {count}</div>;

};

export default Com;
```

문제의 원인: 부모 컴포넌트가 업데이트될 때, 자식 컴포넌트가 다시 렌더링되어 각 렌더링마다 새로운 props.list 참조가 제공됩니다. 빈 배열로 표시되더라도, useEffect는 list의 참조 변경을 감지하여 실행됩니다. 복잡한 시나리오에서 빈번한 업데이트는 화면이 흰색으로 나타나는 문제를 야기할 수 있습니다.

올바른 접근법: 컴포넌트가 사용된 곳에서 호환성 처리를 구현하고, 기본값을 직접 할당하는 것을 피하십시오. 🛠️

<div class="content-ad"></div>

Case 3️⃣: 객체 내용이 변경되지 않았을 때 useEffect가 트리거되지 않도록 설정하고 싶어요.

객체가 의존성으로 사용될 때, 해당 실행이 내용이 변경될 때 트리거되는 것이 일반적입니다. 그러나 useEffect의 본질은 참조 변경을 모니터하는 것이라, 실제 비즈니스 개발과 다소 일치하지 않을 수 있어요. 🤔

- 비즈니스 레이어는 종종 일부 상태를 재설정하고, setState([]) 또는 setState('')을 사용합니다. 상태 값 자체가 [] 또는 ''일 수 있으며, 재설정 후 내용은 변경되지 않았지만 참조가 변경되어 useEffect가 트리거되는 경우가 생길 수 있어요.

```js
import { useState, useEffect } from "react";

const Com = () => {
   const [list, setList] = useState([]);

   function reset() {
     setList([]);
   }

   return (
     <div>
       <p>{list.join(",")}</p>
       <button onClick={reset}>reset</button>
       <SubCom list={list} />
     </div>
   );
};

const SubCom = (props) => {
   const { list } = props;

   useEffect(() => {
     console.log(list);
   }, [list]);

   return <div>자식 컴포넌트</div>;
};

export default Com;
```

<div class="content-ad"></div>

솔루션:

- 오브젝트를 문자열로 변환한 뒤 useEffect의 의존성으로 사용하세요.

```js
useEffect(() => {
  console.log(list);
}, [JSON.stringify(list)]);
```

- 문제를 해결하기 위해 훅의 useDeepCompareEffect을 사용하세요. 사용 방법은 useEffect와 동일하지만 deps는 lodash isEqual을 통해 깊게 비교됩니다.

<div class="content-ad"></div>


Case 4️⃣: 두 개의 useEffect 업데이트가 서로에게 의존하며 무한 업데이트로 인해 화면이 흰색으로 나타납니다.

```js
const {
     value,
     defaultValue = 0.5,
     onChange
} = props;

const [innerValue, setInnerValue] = useState<number>(defaultValue);

// useEffect1이라고 명명된 효과
useEffect(() => {
     if (value !== undefined) {
         setInnerValue(value);
     }
}, [value]);

// useEffect2라고 명명된 효과
useEffect(() => {
     onChange?.(innerValue);
}, [innerValue]);
```

문제:


<div class="content-ad"></div>

- 🔍 첫 번째 로드 시, useEffect2가 트리거되어 onChange 메서드가 호출됩니다.
- 🔄 비즈니스 레이어에서 값이 수동으로 변경되면, onChange도 트리거됩니다.

올바르게 작성하는 방법:

- 🛠️ 실제로 양식 값 변경을 수동으로 하는 경우, useEffect를 직접 사용하는 대신 innerValue의 변경 사항을 모니터링하기 위해 onChange를 호출하세요.

Case 5️⃣: useRef 값을 모니터링하는데 의존하면, 때로는 업데이트가 트리거될 수 있지만 때로는 업데이트가 트리거되지 않을 수 있습니다.

<div class="content-ad"></div>

```js
import { useState, useEffect, useRef } from "react";

export default () => {
   const [count, setCount] = useState(0);
   const countRef = useRef(0);
    
   // Named useEffect1
   useEffect(() => {
     console.log("count", count);
   }, [count]);

   // Named useEffect2
   useEffect(() => {
     console.log("countRef", countRef);
   }, [countRef.current]);

  

   return (
     <div>
       <p>{count}</p>
       <button onClick={() => setCount((c) => c + 1)}>button1</button>
       <button onClick={() => (countRef.current += 1)}>button2</button>
     </div>
   );
};
```

현상:
🔘 버튼1을 클릭하면 useEffect1이 실행됩니다.
🔘 버튼2를 클릭하면 useEffect2가 실행되지 않습니다.
🔘 버튼1을 다시 클릭하면 useEffect1과 useEffect2가 모두 실행됩니다.

문제의 원인:
🔍 상태가 변경될 때만 업데이트가 트리거됩니다. useState와 useReducer는 업데이트를 시작할 수 있는 유일한 훅입니다.

사용 안내:
📌 useRef의 값은 useRef의 변경으로 상태 변경이 필요한 경우가 확실한 경우에만 의존성으로 사용하세요.

<div class="content-ad"></div>

# 요약

React 개발의 광활한 바다에서 useState와 useEffect는 우리의 애플리케이션에 생명과 기능을 부여할 수 있는 강력한 동료들입니다. 그러나 강력한 도구처럼, 그들만의 문제와 함정이 따릅니다.

올바른 상태 업데이트를 보장하고 의존성과 부작용을 처리하는 등, 이 안내서는 React 개발의 위험한 지형을 안전하게 탐험하기 위해 필요한 지식과 전략을 제공했습니다.

여정을 계속하면서 주의를 기울이고 철저하게 테스트하며, 동료 개발자로부터 지식을 얻거나 신뢰할 만한 자료를 참고하는 것을 꺼리지 마세요. useState와 useEffect를 잘 이해하고 인내심을 가지면 가장 어려운 React 프로젝트도 정복하고 우수한 애플리케이션을 구축할 수 있습니다. 즐거운 코딩하세요! 🚀🌟