---
title: "리액트 초보 개발자가 일반적인 오류를 피하는 팁"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering React Tips to Avoid Common Beginner Errors"
link: "https://medium.com/@megha.kumari_63653/mastering-react-tips-to-sidestep-common-beginner-errors-72b1470e8d77"
---



![마스터링 리액트: 초보자가 피해야 할 일반 오류를 피하는 팁](/assets/img/MasteringReactTipstoAvoidCommonBeginnerErrors_0.png)

리액트는 사용자 인터페이스를 구축하는 강력한 라이브러리이지만, 어떤 도구든 마찬가지로 오용될 수 있습니다. 초보자들은 종종 유지 관리가 어려우며 성능이 낮아지는 애플리케이션으로 이어질 수 있는 함정에 빠지곤 합니다. 이 게시물에서는 이러한 일반적인 함정과 그것들을 피하는 방법을 살펴보겠습니다.

# 실수 1: State 과용

State는 절약해서 사용하고 컴포넌트의 동적 정보를 표현하는 데이터에만 사용해야 합니다. State를 과용하면 불필요한 재렌더링이 발생할 수 있고, 컴포넌트의 로직을 이해하기 어렵게 만들 수 있습니다.

<div class="content-ad"></div>

문제: 때때로, 꼭 필요하지 않은 상태의 모든 값을 저장하는 실수를 자주 저질러요.

해결책: 데이터 변경과 재렌더링을 유발하는 경우에만 상태를 사용하세요.

```js
// 나쁨: 파생 데이터에 불필요한 상태
function PriceComponent({ basePrice }) {
  const [price, setPrice] = useState(basePrice);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(basePrice * 0.2); // 파생 데이터는 상태에 저장하지 않아야 합니다.
  }, [basePrice]);

  return <div>총 가격: {price + tax}</div>;
}

// 좋음: 직접 파생 데이터 계산
function PriceComponent({ basePrice }) {
  const tax = basePrice * 0.2;

  return <div>총 가격: {basePrice + tax}</div>;
}
```

# 실수 2: 프래그먼트 사용하지 않기

<div class="content-ad"></div>

React Fragments는 추가 노드를 DOM에 추가하지 않고 여러 요소를 반환할 수 있게 해줍니다. 이는 DOM 트리를 깔끔하게 유지하고 성능을 향상시키는 데 유용합니다.

문제: 불필요한 DOM 요소가 마크업을 지저분하게 만들고 성능에 영향을 미칠 수 있습니다.

해결책: React Fragments를 사용하여 추가 노드를 DOM에 추가하지 않고 자식 요소 목록을 그룹화합니다.

```js
// 안 좋은 방법: Extra div element
function List() {
  return (
    <div>
      <ListItem />
      <ListItem />
    </div>
  );
}

// 좋은 방법: React.Fragment 사용
function List() {
  return (
    <>
      <ListItem />
      <ListItem />
    </>
  );
}
```

<div class="content-ad"></div>

# 실수 3: Prop Types 무시하기

Prop types는 컴포넌트로 전달된 속성의 의도된 유형을 문서화하는 방법입니다. 개발 중에 데이터 유형을 유효성 검사하여 버그를 방지하는 데 도움이 될 수 있습니다.

문제: prop을 유효성 검사하지 않으면 응용 프로그램에서 예상치 못한 버그가 발생할 수 있습니다.

해결책: propTypes를 사용하여 컴포넌트가 올바른 유형의 prop을 받도록 하세요.

<div class="content-ad"></div>

```js
import PropTypes from "prop-types";

// Good: Using prop types for validation
function UserProfile({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

# 실수 4: 컴포넌트 재렌더링 오해

컴포넌트가 상태가 변경되었을 때뿐만 아니라 프롭이 변경되었거나 부모 컴포넌트가 재렌더링 될 때도 재렌더링됩니다. 이를 제대로 관리하지 않으면 성능 문제가 발생할 수 있습니다.

문제: React 컴포넌트는 상태가 변경될 때만 재렌더링된다고 생각하기.

<div class="content-ad"></div>

해결책: 컴포넌트는 부모가 다시 렌더링될 때나 프롭이 변경될 때도 다시 렌더링된다는 것을 이해해주세요.

```js
// 좋은 예시: React.memo로 최적화하기
const ChildComponent = React.memo(({ value }) => {
  console.log("ChildComponent이 렌더링됨");
  return <div>{value}</div>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildComponent value={count} />
      <button onClick={() => setCount(count + 1)}>증가</button>
    </>
  );
}
```

# 실수 5: 상태 직접 변경하기

상태를 직접 변이하는 것은 예상치 못한 동작을 초래할 수 있습니다. React는 변경 사항을 감지하기 위해 불변성에 의존하기 때문에 항상 setState 함수나 훅에서 제공하는 업데이터 함수를 사용해주세요.

<div class="content-ad"></div>

문제: 상태를 직접 변경하면 예측할 수 없는 컴포넌트 동작을 유도할 수 있습니다.

해결책: 항상 setState 함수를 사용하여 상태를 업데이트하십시오.

```js
// 나쁜 예: 상태를 직접 변경
function MyComponent() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    items.push(newItem); // 이것은 재렌더링을 일으키지 않습니다
    setItems(items);
  }

  // ...
}

// 좋은 예: 함수 업데이트 사용
function MyComponent() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // ...
}
```

# 결론

<div class="content-ad"></div>

자주 하는 실수를 피하면 더 나은, 더 신뢰할 수 있는 React 애플리케이션이 될 것입니다. React를 배우는 것은 여정입니다. 계속 실험하고, 독해하고, 코딩해보세요. 즐거운 개발되세요!
