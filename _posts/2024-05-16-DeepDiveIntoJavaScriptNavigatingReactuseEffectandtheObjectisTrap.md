---
title: "자바스크립트 심층 탐구 React의 useEffect 및 Objectis 함정 탐색"
description: ""
coverImage: "/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_0.png"
date: 2024-05-16 03:08
ogImage: 
  url: /assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_0.png
tag: Tech
originalTitle: "Deep Dive Into JavaScript: Navigating React useEffect and the Object.is Trap"
link: "https://medium.com/codex/deep-dive-into-javascript-navigating-react-useeffect-and-the-object-is-trap-5575a78cf5d3"
---



![Image](/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_0.png)

React에서 side effect를 수행하고 array dependency가 수정될 때마다 다시 렌더링을 관리하기 위해 useEffect 훅을 자주 사용합니다. 그러나 이 훅에 익숙하지 않은 일부 개발자는 브라우저가 멈추는 상황이나 컴포넌트 상태를 새로고침하는 문제 등 특정 상황에서 약간 헷갈릴 수 있습니다.

간단한 예시를 살펴보겠습니다:

```js
function CountClick() {
  const [count, setCount] = useState(0);

  useEffect(() => {
      console.log('Count updated');
  }, []);

  const onClick = () => setCount(count + 1);

  return (
    <div>
      <button onClick={onClick}>Click me</button>
      <div>Count: {count}</div>
    </div>
  );
}
```



페이지에 접속하면 빈 배열 []을 두 번째 인자로 전달하여 콘솔 로그가 한 번 출력되는 것을 확인할 수 있습니다. 이것은 React가 첫 번째 렌더링에서만 효과를 실행한다는 것을 의미합니다.

<img src="/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_1.png" />

좋아요!

이제 콘솔을 지우고 "Click me" 버튼을 클릭하여 무엇이 발생하는지 확인해봅시다.




![Screenshot](/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_2.png)

카운터가 증가하는 것을 관찰할 수 있지만, 콘솔에서는 아무 일도 일어나지 않습니다. 여기서 useEffect의 의존성이 실제로 작용하게 됩니다.

코드를 조금 조정해 봅시다:

```js
function CountClick() {
  const [count, setCount] = useState(0);

  useEffect(() => {
      console.log('Count updated');
  }, [count]);

  const onClick = () => setCount(count + 1);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```



이제 'Click me' 버튼을 클릭한 후 콘솔에 메시지가 표시되는 것을 확인할 수 있습니다. 그러나 실제 세계에서는 백엔드와 통합되는 앱을 만들며, localStorage에서 데이터를 읽고 더 복잡한 솔루션을 사용합니다. 이전 예시에서 우리는 기본 형식에 대해 작업했습니다.

이번에는 참조 형식인 객체를 사용하는 코드를 만들어보겠습니다:

```js
function CountClick() {
  const [data, setData] = useState<Person>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Count updated');
    setData({ firstName: 'Bruce', lastName: 'Wayne' });
  }, [data]);


  const onClick = () => setCount(count + 1);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

위 코드에서는 실수가 발생했습니다.




![Image 1](/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_3.png)

우리의 코드가 무한 루프를 발생시키고 있어요. 컴포넌트가 불필요하게 계속해서 자기 자신을 다시 렌더링하며, 업데이트의 끝나지 않는 사이클을 초래하고 있죠.

다행히도, React의 소스 코드는 오픈 소스로 제공되어 있어요. 그래서 우리는 이 효과의 구현을 쉽게 찾을 수 있어요!

![Image 2](/assets/img/2024-05-16-DeepDiveIntoJavaScriptNavigatingReactuseEffectandtheObjectisTrap_4.png)




이 코드의 구현을 더 자세히 살펴보면 그리 복잡해 보이지 않아요. 그럼 문제가 뭘까요?

이 함수의 정의를 찾아보려 노력해 봅시다.

있네요! — 우리의 버그/예상 동작은 Object.is 정적 메서드에 있습니다. 그러니 테스트해 봅시다.

```js
console.log(Object.is({ firstName: 'Bruce', lastName: 'Wayne' }, { firstName: 'Bruce', lastName: 'Wayne' }));
// false
```



그래서 현재 동일한 객체 정의에 대해 Object.is가 false를 반환하는 것을 알았죠.

하지만 왜 그럴까요?

자바스크립트는 꽤 표준화된 프로그래밍 언어입니다. Object.is는 SamveValue 추상 작업을 참조합니다. 그것에는 다음과 같이 기술되어 있습니다:

```js
//SameValueNonNumber
7.2.11 SameValueNonNumber ( x, y )
===== TRUNCATED =====
6. 주의: 다른 모든 ECMAScript 언어 값은 동일성으로 비교됩니다.
7. x가 y와 동일하면 true를, 그렇지 않으면 false를 반환합니다.
```



그리고 여기 중요한 참고 사항이 있습니다:

이 함수는 호출될 때 같은 값이 아닌 경우와 원시 유형을 참조하는 SameValueNonNumber 및 SameValue에 대해 다음 단계를 수행함을 의미합니다. 객체, 배열, 함수 등과 같은 다른 값들에 대해서는 내용을 비교하는 대신 메모리 위치가 동일한지 확인하여 비교가 이루어집니다.

따라서 이는 원시 유형에 대해서만 작동합니다.

```js
Object.is(NaN, NaN) // true
Object.is(0, 0) // true
Object.is(1.000123, 1.000123) // true
Object.is(Infinity, Infinity) // true
Object.is(-Infinity, -Infinity) // true
Object.is(0/-1, 0/-1) // true
Object.is("test", "test") // true
Object.is(null, null) // true
Object.is(false, false) // true
Object.is(true, true) // true
```



그리고 참조 유형에 대해서는 해당되지 않습니다

```js
Object.is(Symbol("foo"), Symbol("foo")) // false
Object.is({}, {}) // false
Object.is([], []) // false
```

# 어떻게 이 문제를 해결할까요?

가장 간단한 해결책은 깊은 동등성을 사용하는 것입니다 (다른 해결책에 대한 좋은 기사 몇 개를 링크 섹션에 게시했습니다).



```js
type Person = {
  firstName: string;
  lastName: string;
};

function CountClick() {
  const [data, setData] = useState<Person>()
  const [count, setCount] = useState(0)

  useEffect(() => {
    setData({ firstName: 'Bruce', lastName: 'Wayne' });
    console.log('Count updated');
  }, [data?.firstName]);


  const onClick = () => setCount(count + 1);

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

# 결론

- useEffect 이해: React의 useEffect 훅은 컴포넌트에서 부수효과를 관리하는 데 중요하다. 이를 통해 개발자는 컴포넌트 라이프사이클 이벤트(마운트, 업데이트, 언마운트)에 대응하는 코드를 실행할 수 있다.
- useEffect에서 의존성 배열: useEffect에 전달되는 두 번째 인자인 의존성 배열은 효과가 의존하는 값들을 지정한다. 이 배열이 변경되면 효과가 다시 실행된다. 이 배열을 생략하거나 빈 배열을 전달하면 효과는 최초 렌더링 후 단 한 번만 실행된다.
- 참조 타입 사용 시 주의사항: 객체나 배열과 같은 참조 타입을 의존성 배열에 사용하면 예상치 못한 동작이 발생할 수 있다. 원시 타입과 달리 참조 타입은 값이 아닌 참조에 의해 비교된다. 따라서 두 객체의 내용이 같더라도 동일한 메모리 위치를 참조하지 않는 한 동일하지 않다.
- Object.is 함정: 값 동등성 비교에 사용되는 Object.is 메서드는 참조 타입과 원시 타입에 따라 다르게 동작한다. 객체나 배열과 같은 경우, 이 메서드는 두 값이 동일한지 식별하며, 객체나 배열과 관련된 작업 시 예상치 않은 결과를 가져올 수 있다.
- 해결책: useEffect에서 참조 타입을 사용할 때 무한 루프나 예상치 않은 동작을 피하기 위해 개발자는 깊은 동등성 체크를 활용할 수 있다. 이를 통해 객체의 내용을 기준으로 비교되도록 보장할 수 있다.

# 링크



- 기본 / 참조 유형 https://gist.github.com/branneman/7fb06d8a74d7e6d4cbcf75c50fec599c
- https://github.com/facebook/react/blob/26f24960935cc395dd9892b3ac48249c9dbcc195/packages/react-server/src/ReactFizzHooks.js#L161
- https://tc39.es/ecma262/#sec-samevalue
- https://medium.com/suyeonme/react-lets-deep-dive-into-deps-array-of-useeffect-13ab96468db7