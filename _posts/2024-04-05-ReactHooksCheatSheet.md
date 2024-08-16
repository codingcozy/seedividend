---
title: "React Hooks 치트 시트"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Hooks Cheat Sheet"
link: "https://medium.com/stackademic/react-hooks-cheat-sheet-5ecba851e1fe"
isUpdated: true
---





React Hooks cheat sheet을 왜 필요로 하는지 궁금하십니까? React 세계에서 Hooks의 소개는 개발자 커뮤니티에 환영받는 추가였습니다. 본질적으로,

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_0.png)

이것은 하위 호환성이 있으며 클래스와 함께 작동하지 않습니다. Hooks 세계에 새로운 사람이거나 경험이 풍부한 전문가라면, 이 치트 시트가 여러분의 의문과 질문을 모두 해결하는 데 도움이 될 것입니다.

# Basic level — React Hooks Cheat Sheet

<div class="content-ad"></div>

# 1. 후크(React Hooks)가 도입된 이유 혹은 왜 필요한가요?

React팀은 후크를 도입한 이유를 다음과 같이 설명했습니다:

- 컴포넌트 계층 구조를 변경하지 않고 상태 논리를 재사용하기 위해서: 후크를 사용하면 컴포넌트에서 상태 논리를 추출하여 독립적으로 테스트하고 필요할 때 재사용할 수 있습니다. 이를 통해 후크를 여러 컴포넌트 간이나 팀의 다른 사람과 쉽게 공유할 수 있습니다. 렌더 프롭(Render Props)이나 고차 컴포넌트(Higher Order Components)와 같은 패턴은 컴포넌트 구조를 다시 정렬해야 합니다. 이는 불편하고 코드를 따라가기 어렵게 만듭니다. 후크가 도입된 후에 상태 논리를 공유하는 것이 더 좋아졌습니다.
- 하나의 컴포넌트를 작은 함수로 나누기 위해서: 후크는 또한 라이프사이클 메서드를 쉽게 작성할 수 있도록 만들었습니다. 각 라이프사이클 메서드는 종종 관련 없는 논리가 섞여 있습니다. 컴포넌트는 componentDidMount()를 사용하여 데이터를 가져오지만, 반면에 이 메서드는 이벤트 리스너를 설정하는 등 관련 없는 논리를 포함할 수 있습니다.

![React Hooks Cheat Sheet 1](/assets/img/ReactHooksCheatSheet_1.png)

<div class="content-ad"></div>

만약 내장된 React Hooks인 useState와 useEffect를 사용하여 동일한 작업을 수행하려면 다음과 같이 할 수 있어요:

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_2.png)

이 두 개의 Hooks를 사용하여 작성한 코드는 더 직관적이고 간결합니다. 게다가, 팀으로 작업할 때 이해하고 작업하기 쉽다구요. componentDidMount(), componentDidUpdate(), componentWillUnmount()과 같은 라이프사이클 메서드를 사용할 때 이것들은 각각 다뤄야 했지만, React Hooks를 사용하면 useEffect() Hook 하나로 이 모든 것을 처리할 수 있어요.

React의 클래스 없이 더 많은 기능을 사용하는 방법: React에 Hooks 개념이 없던 시절에는 주로 클래스 기반 컴포넌트를 사용했어요. 클래스로 컴포넌트를 만들 때는 항상 클래스 사이를 전환해야 해서 번거로웠고 때로는 불필요한 노력이 필요했어요. React Hooks 덕분에 이제 함수형 컴포넌트를 사용하여 이 모든 것들을 클래스 간 전환없이 처리할 수 있어요.

<div class="content-ad"></div>

- 클래스 기반 컴포넌트 사용:

![ReactHooksCheatSheet_3](/assets/img/ReactHooksCheatSheet_3.png)

- 함수형 컴포넌트 사용:

![ReactHooksCheatSheet_4](/assets/img/ReactHooksCheatSheet_4.png)

<div class="content-ad"></div>

만약 두 가지를 비교해 보면, 함수형 컴포넌트를 사용하는 두 번째 방법은 동일한 결과를 얻는 데 사용되는 훨씬 간단한 코드입니다. 클래스 인스턴스에 공간을 할당하고 render() 함수를 호출할 필요가 없습니다. 대신에 간단히 함수를 호출하면 됩니다.

# 2. useState 훅

상태 값을 반환하고 해당 값을 업데이트하는 함수를 함께 제공합니다. 여기에 기본 호출 서명이 있습니다:

![ReactHooksCheatSheet_5](/assets/img/ReactHooksCheatSheet_5.png)

<div class="content-ad"></div>

setState 함수는 상태를 업데이트하는 데 사용되며 새로운 상태 값을 (newState) 인자로 받습니다:

![ReactHooksCheatSheet_6](/assets/img/ReactHooksCheatSheet_6.png)

useState에 관한 중요한 점들은 다음과 같습니다:

- 상태 변수 선언: 상태 변수를 선언하려면 초기 값과 함께 useState를 호출하기만 하면 됩니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet 7](/assets/img/ReactHooksCheatSheet_7.png)

2. 상태 변수 업데이트: 여기서는 useState를 호출하여 반환된 업데이트 함수를 호출해야 합니다.

![React Hooks Cheat Sheet 8](/assets/img/ReactHooksCheatSheet_8.png)

3. 다중 상태 변수 사용: 함수 컴포넌트 내에서 다중 상태 변수를 사용하고 업데이트할 수 있습니다. 아래 예시를 참고하세요.

<div class="content-ad"></div>

![React Hooks Cheat Sheet 9](/assets/img/ReactHooksCheatSheet_9.png)

4. 객체 상태 변수 사용하기: useState에 전달된 초기값으로 전체 객체를 사용할 수도 있습니다. 자동으로 업데이트 객체를 병합하지는 않습니다.

![React Hooks Cheat Sheet 10](/assets/img/ReactHooksCheatSheet_10.png)

새 상태 객체는 다음과 같이 됩니다. { name: "John", age: "unknown" }.

<div class="content-ad"></div>

5. 함수형 useState: useState를 호출한 후 반환된 업데이트 함수는 클래스 기반 컴포넌트의 setState에서 해왔던 것과 마찬가지로 함수를 사용할 수 있습니다:

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_11.png)

두 가지 형태 모두 updateValue를 호출하는 데 유효합니다.

# 3. useEffect Hook

<div class="content-ad"></div>

`useEffect`에 전달된 함수는 렌더가 화면에 반영된 후에 실행됩니다. 이 효과들은 렌더가 완료된 후에 실행되지만 특정 값의 변경에 따라 실행되도록 선택할 수도 있습니다.

다음은 `useEffect`의 호출 시그니처입니다:

![useEffect Call Signature](/assets/img/ReactHooksCheatSheet_12.png)

기본적인 사이드 이펙트를 만들기 위해 다음 예제에서는 `useState`와 `useEffect` 후크를 모두 사용할 것입니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_13.png)

useEffect 블록은 handleClick 함수를 실행한 후 현재 탭/브라우저 창의 제목을 업데이트합니다.

다음은 useEffect에 관련된 유용한 내용입니다:

- 효과 정리: 효과를 정리해야 하는데, 일반적으로 useEffect에 전달된 효과 함수 내에서 함수를 반환하여 정리합니다.

<div class="content-ad"></div>

<img src="/assets/img/ReactHooksCheatSheet_14.png" />

이 정리 함수는 컴포넌트가 UI에서 제거되기 전 메모리 누수를 방지하기 위해 실행됩니다. 또한 새로운 정리를 작성하면, 이전 효과가 다음 효과를 실행하기 전에 정리됩니다.

2. 여러 효과 생성: 여러 효과를 추가하려면 함수 컴포넌트 내에서 둘 이상의 useEffect 호출을 사용할 수 있습니다. 아래와 같이 보입니다:

<img src="/assets/img/ReactHooksCheatSheet_15.png" />

<div class="content-ad"></div>

3. 효과를 건너뛸 수 있는 여러 가지 방법: 우리는 매 렌더링마다 호출되지 않도록 useEffect 호출을 건너뛸 수 있습니다. 이를 위해 여러 가지 방법이 있습니다:

- 배열 의존성 사용: 여기서 `useEffect`는 값의 배열이 전달됩니다. 값이 생성될 때마다 효과 함수가 호출됩니다. 예를 들어,

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_16.png)

- 빈 배열 의존성 사용: 이 경우에는 `useEffect`에 빈 배열 `[]`이 전달됩니다. 효과 함수는 이제 마운트할 때만 호출됩니다:

<div class="content-ad"></div>

![img](/assets/img/ReactHooksCheatSheet_17.png)

- 배열 의존성 없이 사용: 어떤 배열 의존성도 제공하지 않고 효과를 완전히 건너뛸 수 있습니다. 효과 함수는 모든 렌더링 후에 실행됩니다:

![img](/assets/img/ReactHooksCheatSheet_18.png)

# 4. 훅 규칙

<div class="content-ad"></div>

React Hooks를 효율적으로 활용하기 위해서는 다음 두 가지 기본 규칙을 따라야 합니다:

- 최상위 수준에서 Hook 호출: 이 규칙은 다음과 같이 제시됩니다:

루프, 조건문 또는 중첩 함수 내에서 Hook을 호출하지 마십시오.

이는 컴포넌트가 렌더링될 때마다 Hooks가 동일한 순서로 호출되도록 보장하는 것을 의미합니다. 이는 앱의 상태를 유지하고 여러 개의 useState 및 useEffect 호출 사이에서 도움이 됩니다.

<div class="content-ad"></div>

함수의 맨 위 레벨에서 조기 반환하기 전에 항상 Hook을 사용해야 합니다. React는 Hook이 호출된 순서에 의존하기 때문에 매번 동일한 순서로 Hook을 호출하면 다음과 같이 됩니다.

![React Hooks Cheat Sheet 19](/assets/img/ReactHooksCheatSheet_19.png)

하지만 조건문 안에 persistForm Hook 호출을 넣으면 다음과 같이 됩니다.

![React Hooks Cheat Sheet 20](/assets/img/ReactHooksCheatSheet_20.png)

<div class="content-ad"></div>

그럼 조건문 안에서 Hook을 사용하면 첫 번째 규칙을 어겨버리게 돼요! 이제 순서가 다음과 같이 변경됩니다:

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_21.png)

React는 두 번째 useState 호출에 어떤 값을 반환해야 하는지 모르게 됩니다. 따라서 여러 개의 Hook이 건너뜁니다. 문제가 발생될 수 있어요.

2. 오직 React 함수 내부에서만 Hook을 호출하세요: 이 규칙은 다음과 같이 말하고 있어요:

<div class="content-ad"></div>

- 일반 JavaScript 함수에서 Hooks를 호출하지 마세요.

이 규칙을 따르면 컴포넌트의 모든 상태 논리 코드가 그 소스 코드에서 명확히 드러납니다.

일반 함수에서 호출하는 대신 다음을 할 수 있습니다:

- React 함수 컴포넌트에서 Hooks를 호출합니다.
- 커스텀 Hooks에서 Hooks를 호출합니다.

<div class="content-ad"></div>

# 중급 단계 — React Hooks 요약 시트

## 1. 커스텀 훅 만들기

useState와 useEffect 훅을 사용하는 것 외에도, 필요에 따라 커스텀 훅을 만들어서 컴포넌트 로직을 재사용 가능한 함수로 추출할 수 있습니다.

커스텤 훅은 특정한 서명을 가져도록 하지 않아도 됩니다. 커스텀 훅을 만들 때 다음 사항을 기억해야 합니다:

<div class="content-ad"></div>

- 커스텀 훅 추출하기: 커스텀 훅은 두 JavaScript 함수 사이에서 로직을 공유하고 이를 세 번째 함수로 추출하고 싶을 때 사용됩니다. 커스텀 훅 내에서 다른 훅을 호출할 때는 반드시 커스텀 훅의 최상위 수준에서 호출하는 것이 중요합니다.
  다음은 예시입니다:

![ReactHooksCheatSheet_22](/assets/img/ReactHooksCheatSheet_22.png)

이 예시에서는 useFriendStatus 훅이 useState와 useEffect 훅을 활용하여 특정 코드를 이용해 친구 상태를 구독하는 것을 볼 수 있습니다.

2. 커스텀 훅 사용하기: 커스텀 훅을 만든 후에는 해당 훅을 컴포넌트 내에서 어디서든 사용할 수 있습니다. 예를 들어, useBoolean이라는 커스텀 훅을 만들었다면 해당 훅을 호출하여 상태와 상태 업데이트 함수를 배열로 반환할 수 있습니다:

<div class="content-ad"></div>

<img src="/assets/img/ReactHooksCheatSheet_23.png" />

초기 상태를 기본값 (false)과 함께 인수로 전달하고 있는 것을 유의해주세요. App 컴포넌트로 돌아와서, 이 훅을 사용하려면 초기 상태를 전달하고 반환된 값을 사용하여 상태를 표시하고 업데이트할 수 있습니다. 아래에 표시된 것처럼:

<img src="/assets/img/ReactHooksCheatSheet_24.png" />

# 2. The useContext Hook

<div class="content-ad"></div>

`useContext` 훅은 Context consumer에 의존하지 않아도 될 수 있도록 도와줍니다.

context 객체는 React.createContext로부터 오며, 트리에서 호출하는 컴포넌트 위에 있는 `MyContext.Provider`의 value prop에 의해 결정됩니다.

다음은 해당 훅의 호출 서명입니다:

![React Hooks Cheat Sheet 25](/assets/img/ReactHooksCheatSheet_25.png)

<div class="content-ad"></div>

React의 Context는 createContext 최상위 API로 초기화됩니다. 여기에 예시가 있습니다:

![React Context 예시](/assets/img/ReactHooksCheatSheet_26.png)

createContext 함수는 초기값을 인수로 취하며, 값 prop이 정의되지 않은 경우 기본값이 됩니다. 우리는 예시 Book 컴포넌트에서 사용할 수 있습니다:

![Book 컴포넌트 예시](/assets/img/ReactHooksCheatSheet_27.png)

<div class="content-ad"></div>

useState Hook은 Context를 매개변수로 받아 그 값에서 값을 가져옵니다. 이제, useContext를 사용하여 위의 Book 컴포넌트를 작성하려면 아래와 같은 결과를 얻게 됩니다:

![ReactHooksCheatSheet_28](/assets/img/ReactHooksCheatSheet_28.png)

## 3. useReducer Hook

다음과 같은 호출 시그니처를 갖습니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet 29](/assets/img/ReactHooksCheatSheet_29.png)

이것은 (state, action) =` newState 유형의 리듀서를 수용하고 현재 상태와 디스패치 메서드를 반환합니다. 이 Hook을 사용하는 예시는 다음과 같습니다:

![React Hooks Cheat Sheet 30](/assets/img/ReactHooksCheatSheet_30.png)

우리는 초기화 함수를 세 번째 인수로 전달하여 상태를 늦게 초기화할 수 있습니다. 이 함수에서 반환된 것은 상태 객체로 반환됩니다. 이것을 설명하는 예시는 다음과 같습니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_31.png)

## 4. useCallback 훅

이 훅은 최적화된 하위 컴포넌트에 콜백을 전달할 때 불필요한 렌더링을 방지하는 데 유용합니다. 호출 서명은 다음과 같습니다:

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_32.png)

<div class="content-ad"></div>

인라인 함수와 함께 useCallback을 사용하려면 다음과 같이 호출할 수 있어요:

![ReactHooksCheatSheet_33](/assets/img/ReactHooksCheatSheet_33.png)

여기서 `Instructions /` 자식 컴포넌트는 useCallback 훅을 사용하여 전달된 doSomething prop을 가지고 있어요.

# 5. useMemo 훅

<div class="content-ad"></div>

“create” 함수와 종속성 배열을 전달하면 memoized된 값이 생성됩니다. 이 훅은 다음과 같은 호출 서명을 가지고 있습니다:

![React Hooks Cheat Sheet 34](/assets/img/ReactHooksCheatSheet_34.png)

useMemo Hook을 사용할 때 다음 사항을 유념해야 합니다:

- 전달한 종속성 중 하나가 변경될 때에만 memoized된 값이 재계산됩니다.
- 호출에 부작용을 추가해서는 안 되며, 대신 useEffect Hook에 속해야 합니다.
- 초기 렌더링 중에 useMemo은 계산을 호출하고 결과를 memoize한 후 해당 컴포넌트로 반환합니다.
- 배열을 제공하지 않으면, useMemo이 사용된 컴포넌트의 각 렌더링마다 새 값이 계산됩니다.

<div class="content-ad"></div>

`CalculateFactorial` 컴포넌트를 가지고 있다고 가정해 봅시다:

![CalculateFactorial](/assets/img/ReactHooksCheatSheet_35.png)

여기서 컴포넌트가 다시 렌더링될 때마다 팩토리얼 계산을 memoize 할 수 있습니다. 아래 업데이트된 코드에서 `useMemo(() => factorialOf(number), [number])`을 사용하여 구현할 수 있습니다:

![Updated Code](/assets/img/ReactHooksCheatSheet_36.png)

<div class="content-ad"></div>

# 6. useRef 훅

다음과 같은 호출 서명을 갖습니다:

![이미지](/assets/img/ReactHooksCheatSheet_37.png)

useRef에 관한 중요한 포인트는 다음과 같습니다:

<div class="content-ad"></div>

- useRef는 `.current` 속성에 가변 값이 저장될 수 있는 "상자" 역할을 합니다.
- 이 Hook은 일반 JavaScript 객체를 생성합니다. useRef()와 직접 { current: ... } 객체를 생성하는 것의 차이점은 useRef가 모든 렌더링마다 동일한 ref 객체를 제공한다는 것입니다.
- .current 속성을 변경해도 다시 렌더링되지 않습니다. Hook은 내용이 변경될 때 알려주지 않습니다.
- 참조값은 유지되며, 컴포넌트 재렌더링 사이에 값이 변하지 않습니다.
- 참조값을 사용하여 DOM 요소에도 액세스할 수 있습니다. 이를 위해 액세스하려는 요소의 ref 속성을 참조해야 합니다.

다음은 컴포넌트가 마운트될 때 입력 필드에 포커스를 주기 위해 DOM 요소에 액세스해야 하는 예시입니다:

![ReactHooksCheatSheet_38](/assets/img/ReactHooksCheatSheet_38.png)

inputRef에 입력 요소를 보관하기 위한 참조를 생성한 후, 이것이 입력 필드의 ref 속성에 할당됩니다. 마운트된 후, React는 inputRef.current를 입력 요소로 설정합니다.

<div class="content-ad"></div>

# Advance level — React Hooks Cheatsheet

# 1. React Hooks 테스트

만약 당신의 테스트 솔루션이 React 내부에 의존하지 않는다면, Hook을 사용하는 컴포넌트를 테스트하는 것은 일반적인 컴포넌트를 테스트하는 것과 다르지 않습니다.

다음과 같은 컴포넌트가 있다고 가정해 봅시다. 이 컴포넌트는 당신이 버튼을 클릭한 횟수를 세는 기능을 합니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet 39](/assets/img/ReactHooksCheatSheet_39.png)

이제 React DOM이나 React Testing Library를 사용하여 보일러플레이트 코드를 줄일 수 있습니다. 그러나 일반 코드로 테스트하는 방법을 알아봅시다. 브라우저에서 발생하는 동작과 일치하는지 확인하려면 아래와 같이 코드 렌더링 및 업데이트를 여러 번 ReactTestUtils.act() 호출로 래핑할 것입니다.

![React Hooks Cheat Sheet 40](/assets/img/ReactHooksCheatSheet_40.png)

# 2. React Hooks로 데이터 가져오기

<div class="content-ad"></div>

리액트 앱을 사용할 때 데이터를 가져오는 것은 꽤 전형적인 패턴입니다. 하지만 특정 앱 컴포넌트에서 Hooks를 사용하고 있다면 데이터를 가져오는 방법을 알아봅시다.

먼저, 아이템 목록을 보여주는 기본 App 컴포넌트가 있다고 가정해봅시다:

![ReactHooksCheatSheet_41.png](/assets/img/ReactHooksCheatSheet_41.png)

상태와 상태 업데이트 함수는 모두 useState Hook에서 제공됩니다. 이제 여기서 데이터를 가져오기 위해 Axios 라이브러리를 사용해봅시다. 우리는 다음과 같이 effect Hook을 구현할 수 있습니다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet #42](/assets/img/ReactHooksCheatSheet_42.png)

하지만 앱을 실행하면 코드가 루프에 갇힌 것을 볼 수 있습니다. `useEffect` 훅은 컴포넌트가 마운트될 때 실행되지만 업데이트될 때도 실행됩니다. 우리는 매번 데이터를 가져온 후 상태를 설정하고 있습니다. 이 문제를 해결하기 위해 우리는 컴포넌트가 마운트될 때만 데이터를 가져오길 원합니다.

따라서, `useEffect` 훅에 두 번째 인자로 빈 배열을 제공해야 합니다. 아래와 같이:

![React Hooks Cheat Sheet #43](/assets/img/ReactHooksCheatSheet_43.png)

<div class="content-ad"></div>

코드 품질을 더 향상시키기 위해 useEffect 내에서 async 함수를 사용하여 Promise에서 클린업 함수를 반환하도록 할 수 있습니다. 따라서 최종 코드는 다음과 같습니다:

![이미지](/assets/img/ReactHooksCheatSheet_44.png)

## 3. Hooks를 사용하여 로딩 지시기 만들기

위의 데이터로딩 예제와 동일한 예제를 사용하여 기본 로딩 지시기를 구현할 수 있습니다. 이를 위해 useState Hook을 사용하여 다른 상태 값을 추가할 것입니다.

<div class="content-ad"></div>

<img src="/assets/img/ReactHooksCheatSheet_45.png" />

이제 useEffect 호출 내부에서 setIsLoading의 true와 false 값을 토글할 수 있습니다:

<img src="/assets/img/ReactHooksCheatSheet_46.png" />

컴포넌트가 마운트되거나 URL 상태가 변경될 때 데이터를 가져오기 위해 이펙트가 호출되면 로딩 상태가 true로 설정됩니다. 이 변경 후 전체 코드는 다음과 같습니다:

<div class="content-ad"></div>

<img src="/assets/img/ReactHooksCheatSheet_47.png" />

# 4. 훅을 사용하여 데이터 가져오기 중단하기

Component가 이미 마운트된 상태에도 컴포넌트 상태가 설정된 경우가 종종 있습니다. 이로 인해 컴포넌트에서 데이터 가져오기를 중단하고 버그나 루프를 방지하고 싶어집니다.

컴포넌트가 마운트 해제될 때 실행되는 정리 함수가 포함된 effect Hook을 사용할 수 있습니다. 다음 예시에서 데이터 가져오기를 방지하는 데 사용해 봅시다:

<div class="content-ad"></div>

![React Hooks Cheat Sheet](/assets/img/ReactHooksCheatSheet_48.png)

여기서 우리는 didCancel이라는 부울 값을 사용하여 데이터 가져오기 코드가 컴포넌트의 상태(마운트되었는지, 언마운트되었는지)를 알 수 있도록 했습니다. 만약 컴포넌트가 마운트 해제되면 플래그가 true로 설정되어 데이터 가져오기가 비동기적으로 해결된 후 컴포넌트 상태를 설정하는 것을 방지합니다.

# 5. Hooks를 사용하여 이전 props 또는 상태 가져오기

때로는 사용한 효과를 정리하기 위해 컴포넌트의 이전 props가 필요합니다. 이를 설명하기 위해 userId props에 기반한 소켓을 구독하는 효과가 있다고 가정해 봅시다. 이 prop이 변경되면 이전에 설정된 userId의 구독을 취소하고 다음 userId에 대해 구독하려고 합니다.

<div class="content-ad"></div>

다음과 같이 useEffect 함수와 함께 정리 기능을 사용할 수 있습니다.

![code](/assets/img/ReactHooksCheatSheet_49.png)

여기서 userId가 변경될 때 ChatAPI.unsubscribeFromSocket(3)가 먼저 실행되고, 그 다음에 ChatAPI.unsubscribeFromSocket(4)가 실행됩니다. 따라서, 정리 함수가 이 작업을 대신해 줍니다. 이전 userId를 클로저에 캡처합니다.

# 결론 — React Hooks Cheat Sheet

<div class="content-ad"></div>

React Hooks 치트 시트에서는 Hook에 관련된 모든 핵심 주제를 다루었습니다. 왜 필요한지부터 Hook의 강력한 기능을 활용해 앱 상태를 효과적으로 관리하고 처리하는 방법까지 모든 것이 관련 예제와 함께 다루어졌습니다.

이 치트 시트가 앞으로나 이전 React 애플리케이션 작업에 도움이 되기를 바랍니다.

# Stackademic

끝까지 읽어 주셔서 감사합니다. 고맙습니다:

<div class="content-ad"></div>

- 작가에게 박수를 보내 주시고 팔로우도 부탁드려요! 👏
- 팔로우해 주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해 보세요: In Plain English | CoFeed | Venture
