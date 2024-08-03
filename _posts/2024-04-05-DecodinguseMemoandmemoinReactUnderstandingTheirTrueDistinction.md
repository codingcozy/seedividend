---
title: "리액트에서의 useMemo와 memo 둘의 차이점 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Decoding useMemo and memo in React Understanding Their True Distinction"
link: "https://medium.com/@avinashukla0704/decoding-usememo-and-memo-in-react-understanding-their-true-distinction-05bd5716bd94"
---



![Decoding useMemo and memo in React](/assets/img/DecodinguseMemoandmemoinReactUnderstandingTheirTrueDistinction_0.png)

# 리액트의 useMemo 훅 vs memo 하이어오더 컴포넌트: 초보자를 위한 비교

사용자 인터페이스를 개발하는 데 널리 사용되는 자바스크립트 라이브러리인 리액트는 응용프로그램 성능을 향상시키기 위한 다양한 도구와 전략을 제공합니다. 이 중에서 useMemo와 memo는 불필요한 컴포넌트 재렌더링을 최소화하는 데 자주 사용되는 기술로 두드러집니다. 유사한 목표를 공유하고 있지만, 그들의 구현과 적합한 시나리오에서 현저하게 차이가 납니다. 이 기사에서는 리액트 내의 useMemo와 memo 사이의 명확한 차이점을 탐색합니다.

# useMemo: 리액트의 값 캐싱 훅을 활용하기

<div class="content-ad"></div>

- useMemo은 함수의 결과를 메모이즈하는 훅입니다. 함수와 의존성 배열을 인자로 받아들이며, 의존성 중 하나가 변경되었을 때에만 메모이즈된 값의 재계산이 발생합니다.
- 주로 렌더링할 때마다 다시 실행할 필요가 없는 비용이 많이 드는 계산이나 연산을 최적화하는 데 사용됩니다.

```js
import React, { useState, useMemo } from "react";

const calculateFactorial = (n) => {
  //계산 비용이 높은 팩토리얼 계산을 모방
  console.log("팩토리얼 계산 중...");
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

const FactorialComponent = () => {
  const [number, setNumber] = useState(1);

  // 숫자를 기반으로한 팩토리얼 계산을 메모이즈
  const factorial = useMemo(() => calculateFactorial(number), [number]);

  const handleNumberChange = (e) => {
    const newNumber = parseInt(e.target.value, 10);
    if (!isNaN(newNumber) && newNumber >= 1) {
      setNumber(newNumber);
    }
  };

  return (
    <div>
      <label>숫자를 입력하세요:</label>
      <input type="number" value={number} onChange={handleNumberChange} />
      <div>
        {number}의 팩토리얼: {factorial}
      </div>
    </div>
  );
};

export default FactorialComponent;
```

이 예시에서:

- 사용자가 숫자를 입력할 수 있는 FactorialComponent가 있습니다.
- calculateFactorial은 주어진 숫자에 대한 계산 비용이 많은 팩토리얼 계산을 모방합니다.
- 우리는 useMemo를 사용하여 숫자 상태를 기반으로한 팩토리얼 계산을 메모이즈합니다. 이를 통해 팩토리얼이 숫자가 변경될 때에만 재계산되도록 합니다.
- 사용자가 유효한 숫자를 입력하면 해당 숫자의 팩토리얼이 표시됩니다.

<div class="content-ad"></div>

만약 숫자 state가 렌더링 간에 변경되지 않는다면, useMemo는 이전에 캐시된 팩토리얼 값을 다시 계산하지 않고 반환할 것입니다. 이 최적화를 통해 팩토리얼 계산이 필요할 때만 수행되며, 각 렌더링 사이클마다 불필요한 계산을 피함으로써 컴포넌트의 성능을 향상시킵니다.

# 메모: 리액트 컴포넌트 렌더링 최적화

- memo는 함수형 컴포넌트를 메모이제이션하는 고차원 컴포넌트(HOC)입니다. 이전 프롭스와 다음 프롭스를 비교하고 프롭스가 변경되었을 때에만 컴포넌트를 다시 렌더링합니다.
- 프롭스가 변경되지 않았을 때 함수형 컴포넌트의 불필요한 다시 렌더링을 방지하는 데 유용합니다.

```js
import React, { useState, memo } from "react";

// memo를 사용하여 메모이즈된 함수형 컴포넌트
const MemoizedComponent = memo(({ count }) => {
  console.log("MemoizedComponent 다시 렌더링 중...");
  return <div>Count: {count}</div>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>카운트 증가</button>
      <MemoizedComponent count={count} />
    </div>
  );
};

export default App;
```

<div class="content-ad"></div>

이 예제에서:

- MemoizedComponent는 memo HOC로 래핑된 함수형 컴포넌트입니다.
- 이 컴포넌트는 count prop을 받아 렌더링합니다.
- App은 count 상태를 증가시킬 버튼을 포함한 주요 컴포넌트입니다.
- MemoizedComponent는 App 내에서 렌더링되고 현재 count 값을 표시합니다.
- count 상태가 변경되면 memo에 의해 제공되는 메모이제이션 덕분에 MemoizedComponent가 count prop이 변경된 경우에만 다시 렌더링됩니다.

memo HOC는 이곳에서 MemoizedComponent의 prop(count)이 변경되지 않았을 때의 불필요한 다시 렌더링을 방지하기 위해 사용됩니다. 이 최적화는 특히 prop에 의존하지만 매 렌더링마다 업데이트가 필요하지 않은 함수형 컴포넌트에 유용합니다.

# 결론

<div class="content-ad"></div>

요약하면, useMemo는 함수의 결과를 메모이제이션하는 데 사용되고, memo는 함수형 컴포넌트의 렌더링을 메모이제이션하는 데 사용됩니다. 둘 다 불필요한 계산이나 렌더링을 줄여 성능을 향상시키지만, React 애플리케이션 내에서 서로 다른 맥락에서 적용됩니다.

읽어 주셔서 감사합니다!
