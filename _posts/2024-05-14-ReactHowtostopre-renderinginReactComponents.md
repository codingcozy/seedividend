---
title: "리액트  리액트 컴포넌트에서 리렌더링을 멈추는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-ReactHowtostopre-renderinginReactComponents_0.png"
date: 2024-05-14 11:12
ogImage: 
  url: /assets/img/2024-05-14-ReactHowtostopre-renderinginReactComponents_0.png
tag: Tech
originalTitle: "React | How to stop re-rendering in React Components"
link: "https://medium.com/@shriharim006/react-how-to-stop-re-rendering-in-react-components-bab286f13d33"
---


<img src="/assets/img/2024-05-14-ReactHowtostopre-renderinginReactComponents_0.png" />

리액트는 초기에 비해 많은 발전을 이루었습니다. 그럼에도 여전히 많은 사람들이 불필요한 다시 렌더링을 고치기 어려운 것으로 생각합니다.

불필요한 다시 렌더링을 피하는 다양한 방법이 있습니다. 여기에서는 리액트에서 불필요한 다시 렌더링을 피하는 몇 가지 방법과 접근법을 논의하고 있습니다.

- useState()를 useRef()훅으로 대체하기.
- 메모이제이션된 셀렉터를 만들기 위해 Reselect 라이브러리 사용.
- 데이터 가져오기를 위한 리액트 훅 라이브러리인 SWR 사용.
- useMemo() 및 useCallback() 훅을 사용한 메모이제이션.



# 1. useState()을 useRef() 훅으로 변경하기

useState() 훅은 React 함수형 컴포넌트에서 상태가 변경될 때 컴포넌트를 다시 렌더링하는 데 자주 사용되는 훅입니다. 그러나 경우에 따라 컴포넌트를 다시 렌더링하지 않고 업데이트를 추적해야 할 때가 있습니다. 이럴 때 useRef() 훅을 사용할 수 있습니다. useRef()를 사용하면 useState()처럼 다시 렌더링을 호출하지 않고 업데이트를 추적할 수 있습니다.

useState()를 사용한 예시:

```js
function inputWithState() {
  const [value, setValue] = useState("");
  return (
    <input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
      type={type} 
    />
  );
}
```



이 예시에서는 input에서 각 키 입력마다 onChange 이벤트로 상태 변경이 발생하여 재렌더링됩니다.

useRef()를 활용한 예시:

```js
function inputWithRef() {
  const inputEl = useRef(null);
  console.log(inputEl?.current?.value);
  return (
    <input ref={inputEl} type="text" />
  );
}
```

이 예시에서는 input에 입력하는 모든 내용을 input 참조를 통해 읽을 수 있습니다. 이 접근법은 각 키 입력마다 불필요한 재렌더링을 피할 수 있습니다.



# 2. Reselect 라이브러리를 사용하여 메모이제이션 셀렉터 만들기

리액트 컴포넌트는 빠른 수명주기를 갖고 있지만, 너무 많은 다시 렌더링으로 늘 피해를 입는 경우가 많습니다. 이를 해결하기 위해 개발자들은 성능을 개선하기 위해 Redux와 함께 사용되는 인기 라이브러리 Reselect의 래퍼인 서드파티 성능 라이브러리 re-select를 만들었습니다. 이 라이브러리는 메모이제이션 셀렉터를 코딩하여 성능을 향상시킵니다.

- 셀렉터는 파생 데이터를 계산할 수 있어 Redux가 가능한 한 적은 상태를 저장할 수 있게 합니다.
- 셀렉터는 효율적입니다. 셀렉터는 인수 중 하나가 변경될 때까지 재계산되지 않습니다.
- 셀렉터는 조합 가능합니다. 다른 셀렉터의 입력으로 사용될 수 있습니다.

예시:



```js
import { createSelector } from 'reselect'
const selectShopItems = state => state.shop.items
const selectTaxPercent = state => state.shop.taxPercent
const selectSubtotal = createSelector(selectShopItems, items =>
  items.reduce((subtotal, item) => subtotal + item.value, 0)
)
const selectTax = createSelector(
  selectSubtotal,
  selectTaxPercent,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)
const selectTotal = createSelector(
  selectSubtotal,
  selectTax,
  (subtotal, tax) => ({ total: subtotal + tax })
)
const exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.2 },
      { name: 'orange', value: 0.95 }
    ]
  }
}
console.log(selectSubtotal(exampleState)) // 2.15
console.log(selectTax(exampleState)) // 0.172
console.log(selectTotal(exampleState)) // { total: 2.322 }
```

여기서 createSelector는 2개의 선택기를 입력으로 받아 메모이즈된 버전을 반환합니다. 값이 다를 때까지 이 메모이즈된 버전을 사용하여 선택기는 다시 계산되지 않을 것입니다.

Reselect는 Redux에만 한정되지 않으나, 공식 Redux Toolkit 패키지에 이미 기본으로 포함되어 있습니다. 추가 설치가 필요하지 않습니다.

# 3. SWR 사용하기 - 데이터 패치용 리액트 훅스 라이브러리



SWR은 데이터 가져오기를 위한 React Hooks 라이브러리입니다.

"SWR"이라는 이름은 stale-while-revalidate의 약자입니다. SWR은 먼저 캐시에서 데이터를 반환한 후(request), 데이터를 업데이트하고(get), 최신 데이터를 다시 가져옵니다. 이를 통해 컴포넌트가 여러 번 다시 렌더링 되는 것을 방지할 수 있습니다.

한 가지 훅으로 프로젝트에서 데이터 가져오기 로직을 크게 간소화할 수 있습니다. 뿐만 아니라 속도, 정확성, 안정성 면에서 모두 다루어져 더 나은 애플리케이션을 구축하는 데 도움이 됩니다.

예시:



```js
function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>로드에 실패했습니다</div>
  if (!data) return <div>로딩 중...</div>
  return <div>안녕하세요 {data.name}님!</div>
}
```

더 많은 정보와 예제는 여기를 참조하세요: [https://swr.vercel.app/](https://swr.vercel.app/)

## 4. useMemo() 및 useCallback()Hooks를 사용한 Memoization

Memoization은 우리의 리액트 코드를 프롭스에 업데이트가 있을 때에만 컴포넌트를 다시 렌더링하도록 하는 것을 가능하게 합니다. 이 접근 방식을 통해 개발자는 불필요한 다시 렌더링을 피하고 응용 프로그램에서의 계산 부하를 줄일 수 있습니다.




리액트는 메모이제이션을 만들기 위해 두 가지 훅을 제공합니다:

- useMemo()
- useCallback()

이 훅들은 계산 없이 입력이 동일한 경우 캐싱되어 동일한 결과를 반환하여 다시 렌더링을 줄입니다. 입력이 업데이트되면 캐시가 무효화되고 새로운 컴포넌트 상태가 렌더링됩니다.

- useMemo()



이 훅은 함수 호출과 렌더 사이에서 계산 결과를 메모이징하는 데 사용됩니다.

예시:

```js
const expensiveFunction = (inputValue) => {
  let expensiveValue = inputValue * 42;
  //... 입력값을 포함한 계산 작업이 많은 경우...
  expensiveValue = 'World';
  return expensiveValue;
};
const MyComponent = ({ something }) => {
  const [inputValue, setInputValue] = useState('');  
  const expensiveValue = useMemo(
    () => expensiveFunction(inputValue), 
    [ inputValue ]
  );  
  return <h1>Hello {expensiveValue}</h1>;
};
```

2. useCallback()



이것은 메모이제이션을 구현하는 또 다른 React Hook입니다. 그러나 useMemo()와 달리 결과를 캐시하지 않고 대신 제공된 콜백 함수를 메모이즈합니다.

예시:

```js
function item() {
  const onClick = useCallback(event => {
    console.log('Clicked Item : ', event.currentTarget);
  }, [item]);
  
  return (
    <li={item} onClick={onClick} />
  );
}
```

예시에서 useCallback()은 onClick 콜백을 메모이즈합니다. 따라서 사용자가 동일한 항목을 계속 클릭해도 컴포넌트를 다시 렌더링하지 않습니다.



이 기사가 리액트 컴포넌트에서 재랜더링 문제를 해결하는 데 도움이 되기를 바랍니다. 만약 리액트에서 재랜더링을 피하는 다른 방법이나 기술이 있다면 댓글에 추가해 주세요.

당신의 지원을 보여주기 위해 아래의 👏 버튼을 최대한 많이 눌러주세요!

독자 여러분, 감사합니다. 화이팅!!!

당신은 멋져요!