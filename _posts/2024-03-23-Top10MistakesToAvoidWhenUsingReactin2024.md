---
title: "2024년 React를 사용할 때 가장 많이 하는 10가지 실수"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Top 10 Mistakes To Avoid When Using React in 2024"
link: "https://blog.bitsrc.io/10-mistakes-when-building-react-apps-in-2024-9a3ab6775348"
---



## 2024년에 더 나은 React 앱을 만들기 위해 이 10가지 실수를 피하세요!

실수는 개발을 늦추고 효율적이고 성능이 좋지 않은 애플리케이션으로 이끌 수 있습니다.

그래서 이 기사에서는 React를 사용할 때 개발자가 피해야 할 십 가지 실수에 대해 논의할 것입니다. 이러한 실수를 이해하고 피함으로써 개발자는 React를 효과적으로 사용하고 효율적으로 사용할 수 있습니다.

# 1. 모노리스 React 앱 구축

<div class="content-ad"></div>

리액트와 함께 작업할 때, 건물 덩어리 앱을 만드는 것이 일반적이었어요. 예를 들어, "create-react-app"을 사용하여 리액트 프로젝트를 시작했을 것입니다.

문제: 이렇게 하면 프로젝트가 커질수록 유지보수 및 확장성 문제가 발생할 수 있는 거대한 건물 덩어리 리액트 앱이 만들어지게 됩니다.

해결책: Bit와 같은 차세대 빌드 시스템을 활용하여 모든 리액트 프로젝트를 위해 독립적인 구성 요소를 설계하고 개발할 수 있습니다. Bit를 사용하면 독립적 환경에서 구성 요소를 만들 수 있어 어떤 맥락에서든 사용할 수 있으면서도 사용된 위치를 추적할 수 있습니다.

더불어 Ripple CI를 사용하여 변경 사항이 구성 요소 트리 전체에 자동으로 전달되어 모든 사용 사례가 최신 버전을 사용하도록 보장합니다.

<div class="content-ad"></div>

# 2. 필요 이상으로 가져오기

필요 이상으로 컴포넌트나 모듈을 불러오면 번들 크기가 커지며 성능에 부정적인 영향을 줄 수 있습니다.

문제: 큰 번들 크기는 로드 시간이 더 오래 걸리고 사용자 경험이 나빠질 수 있습니다.

해결책: 모듈에서 필요한 특정 컴포넌트나 함수만 가져오세요. 코드 분할을 사용하여 필요한 시점에 컴포넌트를 로드하세요.

<div class="content-ad"></div>

```js
// 특정 컴포넌트만 가져오기
import { Button } from "./components";

// 코드 분할
import React, { lazy, Suspense } from "react";
const OtherComponent = lazy(() => import("./OtherComponent"));
<Suspense fallback={<div>Loading...</div>}>
  <OtherComponent />
</Suspense>;
```

## 3. 비즈니스 로직과 컴포넌트 로직을 분리하지 않는 문제

컴포넌트 내부에 비즈니스 로직(데이터 가져오기, 변환 등)을 직접 섞는 것은 코드의 재사용성을 떨어뜨리고 테스트 및 유지 보수를 더 어렵게 만들 수 있습니다.

문제: 이로 인해 컴포넌트들 사이의 결합이 강해지고 비즈니스 로직을 독립적으로 테스트하기 어려워집니다.

<div class="content-ad"></div>

해결 방법: 비즈니스 로직을 처리하는 별도의 함수나 서비스를 만들고 컴포넌트에서 해당 함수를 호출하세요.

```js
// 데이터 가져오기 서비스
function fetchUserData() {
  // ...
}

// 컴포넌트
function UserDetails() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUserData().then(setUser);
  }, []);
  // 사용자 데이터 렌더링
}
```

## 4. 프롭 드릴링

프롭 드릴링은 종종 불필요하게 여러 수준의 컴포넌트를 통해 프롭을 전달하여 깊게 중첩된 컴포넌트에 도달하는 것을 의미합니다.

<div class="content-ad"></div>

문제: 코드가 덜 가독성이 있어지며 유지 보수가 더 어려워지고 오류가 발생할 수 있습니다.

해결책: React Context 또는 Redux와 같은 상태 관리 라이브러리를 사용하여 프롭 드릴링 없이 컴포넌트 간 데이터를 더 효과적으로 공유하세요.

```js
// Context
const UserContext = React.createContext();

// Provider
<UserContext.Provider value={ user }>
  {/* 자식 컴포넌트는 프롭 없이도 사용자 데이터에 접근할 수 있습니다 */}
</UserContext.Provider>
// Consumer
<UserContext.Consumer>
  {(user) => {
    // 여기서 사용자 데이터 사용
  }
</UserContext.Consumer>
```

# 5. 각 렌더링에서의 중복 작업

<div class="content-ad"></div>

컴포넌트의 렌더 함수 내에서 비싼 계산이나 작업을 수행하면 성능 문제가 발생할 수 있습니다, 특히 빈번한 다시 렌더링 시에는 더욱 그렇습니다.

문제: 매 렌더링마다 재계산하는 것은 느림 및 성능 병목 현상을 일으킬 수 있습니다.

해결책: React.memo, useMemo 또는 useCallback을 사용하여 메모이제이션과 같은 기술을 활용하여 값을 캐시하고 불필요한 다시 렌더링을 방지하세요.

```js
// 메모이즈된 컴포넌트
const MyComponent = React.memo(function MyComponent(props) {
  // ...
});

// 메모이즈된 값
const memoizedValue = useMemo(() => computeExpensiveValue(props), [props]);
```

<div class="content-ad"></div>

# 6. 코드 가독성과 구조 무시하기

정리되지 않고 난잡한 코드를 작성하면 이해, 유지 보수 및 협업이 어려워질 수 있습니다.

문제: 스파게티 코드는 탐색, 디버깅 및 리팩터링이 어려워져 개발 효율이 저하됩니다.

해결책: 일관된 코딩 스타일을 따르고, 설명적인 변수 이름을 사용하며, 코드를 적절히 들여쓰기하고, 복잡한 기능을 더 작고 재사용 가능한 단위로 분해하세요.

<div class="content-ad"></div>

```js
// 가독성과 구조화된 코드
function MyComponent() {
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={incrementCount}>증가 ({count})</button>
    </div>
  );
}
// 스파게티 코드 (피해주세요!)
function MyComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>({count}) + 1</button>
    </div>
  );
}
```

## 7. 상태 과용과 불필요한 재랜더링

컴포넌트에서 불필요하게 상태를 관리하면 성능 문제와 불필요한 재랜더링을 초래할 수 있습니다.

문제: 빈번한 상태 업데이트는 렌더링을 일으키며, 이러한 변경 사항이 렌더링된 UI에 무관한 경우도 발생합니다.

<div class="content-ad"></div>

솔루션: 컴포넌트가 상태를 필요로 하는지 신중히 고려하고 상태 업데이트를 최적화하여 다시 렌더링을 최소화하십시오. 복잡한 상태 관리에는 useReducer를 사용하십시오.

```js
// 최적화를 위해 메모이제이션 적용
const MyComponent = React.memo(() => {
  const [text, setText] = useState("");
  const filteredText = useMemo(() => text.toUpperCase(), [text]);
  return <p>{filteredText}</p>;
});

// 최적화되지 않음 (메모이제이션 회피)
const MyComponent = () => {
  const [text, setText] = useState("");
  return <p>{text.toUpperCase()}</p>;
};
```

# 8. useEffect Hook를 잘못 사용하기

useEffect 훅은 React 컴포넌트에서 부수 효과를 처리하는 강력한 도구이지만, 의도하지 않은 결과를 피하려면 올바르게 사용하는 것이 중요합니다.

<div class="content-ad"></div>

문제: useEffect의 부적절한 사용은 무한 루프, 메모리 누수 또는 예기치 못한 동작을 초래할 수 있습니다.

해결책: useEffect의 의존성 배열을 이해하고 그것을 사용하여 효과가 실행되는 시점을 제어하세요. 메모리 누수를 방지하기 위해 정리(clean-up) 함수를 주의깊게 다뤄주세요.

```js
useEffect(() => {
  // count가 변경될 때만 실행되는 사이드 이펙트
}, [count]);
```

# 9. 오류 처리 및 로깅 무시하기

<div class="content-ad"></div>

문제: 처리되지 않은 오류는 응용 프로그램을 다운시키며, 부족한 로깅은 문제를 진단하고 해결하기 어렵게 만듭니다.

해결책: try-catch 블록을 구현하여 오류를 우아하게 처리하고, react-error-boundary와 같은 라이브러리를 사용하여 구성 요소 수준의 오류를 처리합니다. winston 또는 debug와 같은 구조화된 로깅 및 간편한 디버깅을 위해 로깅 라이브러리를 활용하세요.

```js
try {
  // 작업 수행
} catch (error) {
  console.error(error);
  // 오류를 우아하게 처리
}

// 오류 경계 예시
<ErrorBoundary>{/* 보호된 구성 요소 */}</ErrorBoundary>;
```

<div class="content-ad"></div>

# 10. 바퀴 다시 발명하기

기존 라이브러리나 구성 요소를 다시 작성하는 데 시간을 낭비하는 것은 비효율적이고 불필요할 수 있습니다.

문제: 기존 기능을 중복해서 작성하는 것은 시간과 노력을 낭비하며, 버그와 불일치를 일으킬 수 있습니다.

해결책: 라우팅, 상태 관리, 폼 처리 등과 같은 표준 기능을 위해 이미 존재하는, 잘 유지되는 라이브러리와 구성 요소를 활용하세요. 정말 필요한 경우에만 사용자 정의 구성 요소를 작성하세요.

<div class="content-ad"></div>

# 결론

요약하자면, React를 정복하기 위해서는 그의 고급 기능을 배우고 효율적이고 유지보수 가능한 코드를 보장하기 위해 최적의 방법을 이해하고 준수해야 합니다. 이 글에서 다뤘던 일반적인 실수를 피함으로써, 개발자들은 React 개발 경험을 크게 향상시키고 고품질 애플리케이션을 구축할 수 있습니다.

기존 라이브러리와 구성 요소를 활용하여 표준 기능에 대한 라이브러리 및 컴포넌트를 재발명하지 않고 시간을 절약하고 코드베이스의 일관성을 유지할 수 있습니다. React 커뮤니티의 최신 동향을 파악하고 지속적으로 기술을 향상시킴으로써 React의 모든 잠재력을 발휘하고 애플리케이션에서 탁월한 사용자 경험을 제공할 수 있습니다.

# 더 알아보기
