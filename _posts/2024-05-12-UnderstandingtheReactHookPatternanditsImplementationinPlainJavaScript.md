---
title: "리액트 훅 패턴 이해 및 순수 자바스크립트에서의 구현 방법"
description: ""
coverImage: "/assets/img/2024-05-12-UnderstandingtheReactHookPatternanditsImplementationinPlainJavaScript_0.png"
date: 2024-05-12 22:59
ogImage: 
  url: /assets/img/2024-05-12-UnderstandingtheReactHookPatternanditsImplementationinPlainJavaScript_0.png
tag: Tech
originalTitle: "Understanding the ‘React Hook’ Pattern and its Implementation in Plain JavaScript"
link: "https://medium.com/@arietrost/understanding-the-react-hook-pattern-and-its-implementation-in-plain-javascript-9f602a8bafe7"
isUpdated: true
---




<img src="/assets/img/2024-05-12-UnderstandingtheReactHookPatternanditsImplementationinPlainJavaScript_0.png" />

안녕하세요! 여러분은 이들을 보았고, 그들에 대해 읽었으며 널리 사용했습니다. 하지만 그들이 어떻게 작동하며 JavaScript에서 이미 알려진 패턴을 따르는지 궁금했던 적이 있나요? 예를 들어, useState hook을 고려해 봅시다.

```js
const [counter1, setCounter1] = useState(0);
const [counter2, setCounter2] = useState(0);
```

useState는 어떻게 호출될 로컬 상태 변수(counter1 또는 counter2)를 알 수 있을까요? 두 메소드 호출이 동일한 서명을 가지고 있음을 주목해 주세요!



다음 섹션으로 넘어가기 전에 잠시 생각해보세요.

훅은 React의 기능으로, 함수 컴포넌트에서 상태 및 다른 React 기능을 사용할 수 있게 해줍니다. React 16.8에서 소개된 훅은 현대적인 React 개발에서 필수 요소가 되어, 컴포넌트 상태 및 라이프사이클 관리에 더 함수형 접근을 제공합니다.

이 글에서는 훅 패턴을 자세히 살펴보고, 이 패턴을 순수 JavaScript에서 구현하는 방법을 제시할 것입니다. React에서 이 패턴은 모든 종류의 훅에 적용됩니다 - useState, useEffect, useId 등(React v18의 완전한 목록은 Hooks에서 확인할 수 있습니다) - 하지만 여기서는 상태 관리와 useState 훅에 초점을 맞출 것입니다.

## 클래스 컴포넌트에서 상태 관리



먼저 리액트 클래스 컴포넌트에서 상태 관리가 작동하는 방법을 간단히 알아보겠습니다. 리액트 클래스 컴포넌트에서 상태는 this.State 속성과 this.setState(…) 메서드로 관리됩니다:

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    // 여러 상태 변수를 초기화합니다
    this.state = {
      value1: 0,
      value2: 1
    };
  }
 
  render() {
    /* value1과 value2를 사용한 JSX */
  }
 
}
```

클래스 컴포넌트에서 상태를 업데이트하려면 this.setState를 사용합니다. 이 메서드는 컴포넌트의 상태 업데이트를 예약하고 리액트에게 컴포넌트를 다시 렌더링하도록 지시합니다 (훅이 있는 함수형 컴포넌트와 마찬가지로). 다음은 클래스 내에서 로컬 상태를 업데이트하는 방법입니다:

```js
this.setState({ value1: this.state.value1 + 1 });
this.setState({ value2: this.state.value2 + 1 });
```



위의 코드에서 확인할 수 있듯이 상태는 명시적으로 키에 의해 매핑됩니다. 여기서 각 키가 특정 상태 변수에 해당하는 객체를 정의합니다. 따라서 상태 변수와 업데이트 사이의 관계가 명확하고 직접적으로 나타납니다. 이는 JavaScript에서 더 전통적이고 표준적인 코드 패턴입니다. 이제 React Hooks를 살펴보겠습니다.

## 함수형 컴포넌트에서 상태 관리

```js
function MyComponent() {
   
   const [value1, setValue1] = useState(0); // 초기 render 시 value1을 0으로 초기화하거나 후속 render에서 value1을 가져옵니다.
   const [value2, setValue2] = useState(1); // 초기 render 시 value2를 1로 초기화하거나 후속 render에서 value2를 가져옵니다.

   render(
    /* value1과 value2를 사용한 JSX */
   );
  ...
}
```

클래스 컴포넌트와는 다르게, 여기서 상태 관계는 암시적입니다. 함수형 컴포넌트의 useState 훅에서는 각 상태 변수(value1 및 value2 예시에서)가 독립적으로 선언되며 업데이트 메커니즘(세터 함수)이 암시적으로 연결됩니다. 상태 변수와 연결된 객체 매핑 키가 없고, useState 호출마다 현재 상태 값과 업데이트를 위한 메서드 쌍이 반환됩니다.



함수형 컴포넌트에서 상태를 업데이트하려면, React의 useState 메서드를 호출하여 해체된 'setter' 함수를 사용합니다:

```js
setValue1(value1 + 1);
setValue2(value2 + 1);
```

이 글의 목적은 React Hooks에서의 **암시적 상태 연관** 이면을 탐색하고, React 이외의 일반 JavaScript에서 어떻게 구현할 수 있는지 알아보는 것입니다.

# 접근 방식



리액트의 useState 및 유사한 훅이 제공하는 기능은 잘 알려진 JavaScript 디자인 패턴의 전통적인 범주에 정확히 속하지는 않습니다. 대신 이는 주로 함수형 프로그래밍에서 비롯된 여러 프로그래밍 개념들을 고유하게 결합한 것으로, 주로 함수형 컴포넌트 및 반응성 모델의 리액트 컨텍스트에서 특화되어 있습니다. 이는 리액트의 렌더링 및 조정 프로세스와 원활하게 작동하도록 설계되어 있어, 전통적인 JavaScript 패턴과는 다릅니다. 그러나 여전히 몇 가지 이미 존재하는 패턴과 개념들과 느슨하게 관련짓을 수 있습니다. 이 중 몇 가지는 다음과 같습니다:

- Factory Functions
useState는 상태의 인스턴스와 해당 setter 함수를 생성하는 일종의 팩토리 함수로 볼 수 있습니다. 팩토리 함수는 JavaScript에서 객체를 생성하고 반환하는 일반적인 패턴입니다.
- 함수형 프로그래밍
useState는 변경 불가능한 상태 업데이트의 사용을 권장하며 함수형 프로그래밍 패러다임 내에서 잘 맞습니다. 여기서 함수에 부작용이 없는 순수 함수들이 존재합니다.
- 클로저
useState에 의해 반환된 setter 함수(예: const [state, setState] = useState(initialValue)에서 setState부분)는 클로저입니다. 이는 함수 컴포넌트의 스코프 내에서 variable에 대한 접근을 유지하며, 그 외의 즉시적인 스코프 외부에서도 호출됩니다.
- Command Pattern
setter 함수 역시 명령 패턴을 통해 볼 수 있습니다. 여기 요청(상태 변경)을 객체로 캡슐화하는 함수입니다.
- Observer Pattern
직접적인 옵저버 패턴의 실행은 아니지만, 리액트에서 상태 변경이 컴포넌트 재랜더링을 트리거하는 방식은 개념적으로 유사합니다. 상태는 "주체" 역할을 하며, 컴포넌트 재랜더링은 상태 변경에 반응하는 "옵저버"인 셈입니다.
- 함수 호출 추적
훅의 가장 중요한 측면입니다. 이를 통해 React가 특정 함수형 컴포넌트 인스턴스와 상태 및 효과를 관리하고 관련시킬 수 있습니다. 이 기능은 결국 useState나 다른 훅 함수를 여러 번 호출할 수 있게끔 해 주는 것입니다. 컴포넌트가 useState(...)를 여러 번 호출할 때 특정 상태가 어디에 대해 호출되는지를 명시적으로 나타내지 않는다는 것을 참고하세요. 이 메커니즘은 컴포넌트 내에서의 훅 호출 순서에 기반을 두고 작동합니다.

다음의 리액트 코드 스니펫에서, 컴포넌트가 다시 렌더링되고 함수가 다시 호출될 때, 첫 번째 useState 호출은 내부 상태 구조의 첫 번째 "슬롯"(여기에서는 배열을 사용할 수 있음)에서 현재 상태를 가져오며, state1과 같습니다. 그리고 두 번째 useState 호출은 두 번째 슬롯에서 state2를 가져오게 됩니다. 이와 같은 방식으로 React가 특정 useState 호출에 어떤 상태가 대응하는지를 파악할 수 있다는 것이 중요한 포인트입니다.

```js
const [state1, ..] = useState(...)   // 첫 번째 호출은 첫 번째 상태에 대한 매핑을 생성합니다
const [state2, ..] = useState(...)   // 두 번째 호출은 두 번째 상태에 대한 매핑을 생성합니다
...
const [stateN, ..] = useState(...)   // N번째 호출은 n번째 상태에 대한 매핑을 생성합니다
```

7. 컴포넌트 상태 및 효과 관리



이 추적 덕분에 훅의 상태가 변경되거나 이펙트가 실행되어야 할 때 React는 정확히 상호 작용해야 하는 상태나 이펙트를 알 수 있습니다. 이는 컴포넌트의 인덱싱된 목록 내에서 훅의 위치를 참조할 수 있기 때문입니다!

React에서의 훅 패턴, 특히 useState는 함수형 컴포넌트와 그들의 반응성 모델에 특화되어 있습니다. 이는 React의 렌더링 및 조화 과정과 원활하게 작동하도록 설계되어 있어서, 전통적인 JavaScript 패턴과 구분됩니다. 일부 일반적인 프로그래밍 개념을 이용하지만, React 컴포넌트 라이프사이클 및 이벤트 처리와 어우러져 있는 방식이 독특합니다.

# 구현 — 첫 번째 시도

이전 섹션에서 설명한 훅의 본질은 순수 JavaScript로 에뮬레이션될 수 있으며, 상태 관리 및 함수 호출 추적의 기본 개념을 보여줍니다. 우리가 만든 HookState 구현의 전체 코드를 살펴보겠습니다. 여기서 주요 부분들입니다.



## 상태, 세터 및 상태 인덱스

```js
let states = [];    // **state** 값을 보관하기 위한 배열입니다. useState와 비슷한 훅을 흉내내고 싶지만 단순히 'hooks'로 이름을 지을 수도 있습니다
let setters = [];   // **setter** 함수를 보관하기 위한 배열입니다
let stateIndex = 0; // 현재 상태 인덱스를 추적하는 카운터 역할을 합니다
```

## 인덱스 초기화 메서드

이 메서드는 다시 렌더링을 시뮬레이션합니다. 각 새로운 렌더링 사이클(컴포넌트가 다시 렌더링되어야 할 때)마다 이 함수를 호출하여 상태 인덱스를 0으로 재설정해야 합니다:



```js
export function resetHookIndex() {
  stateIndex = 0;
}
```

이 모든 것을 종합해보면, 여기에 순수 JavaScript로 구현된 간단한 훅 시스템이 있습니다.

## HookPattern.js

HookPattern.js는 useHookPattern과 resetHookIndex 두 가지 메서드를 내보냅니다. 이전에 언급했듯이, resetHookIndex는 다시 렌더링 단계를 시뮬레이션하며, 이 글에서는 훅 사용자 코드에서 수동으로 호출할 것입니다. React에서는 이것이 렌더링 및 조정 엔진의 일부이며, 프레임워크에 의해 자동으로 호출될 것이라고 믿을 수 있습니다.



```js
// HookPattern.js

let states = []; 
let setters = [];  
let stateIndex = 0;  

export function resetHookIndex() {
  stateIndex = 0;
}

export function useHookPattern(initialValue) {
  const currentStateIndex = stateIndex;
   
  // state already initialized? 
  if (!setters[currentStateIndex]) {
    // If not, initialize state and create a setter
    states[currentStateIndex] = initialValue;
    
    setters[currentStateIndex] = (newValue) => {
      states[currentStateIndex] = newValue;
    };
  }
  
  stateIndex++;
  return [states[currentStateIndex], setters[currentStateIndex]];
}
```

이제 순수 JavaScript useHookPattern을 사용해 봅시다. 이 예제에서는 React를 사용하지 않습니다.

## ExampleUseHookPattern.js

```js
// ExampleUseHookPattern - 우리가 만든 HookPattern의 사용법을 보여줍니다.

import { useHookPattern, resetHookIndex } from './HookPattern';

function ExampleHook() {
  // 다시 렌더링하기 전에 인덱스를 리셋합니다. React에서는 렌더링 엔진의 일부입니다.
  resetHookIndex();

  const [value1, setValue1] = useHookPattern(0);
  const [value2, setValue2] = useHookPattern(1);

  function handleClick() {
    setValue1(value1 + 1);
    setValue2(value2 + 1);
  }

  return {
    render: () => console.log(`Value1: ${value1}, Value2: ${value2}`),
    handleClick
  };
}

// 컴포넌트 렌더링 모의 실행
const myComponent = ExampleHook();

myComponent.render(); 
// 이는 다음을 출력해야 합니다: Value1: 0, Value2: 1

// 핸들 클릭 및 상태 업데이트 모의 실행
myComponent.handleClick();


// 컴포넌트 다시 렌더링 등 모의 실행
const myComponentUpdated = ExampleHook();

myComponentUpdated.render(); 
// 이는 다음을 출력해야 합니다: Value1: 1, Value2: 2
```



여기서 중요한 점은 ExampleHook의 모든 렌더링에서 value1에 대한 useHookPattern이 항상 value2에 대한 useHookPattern보다 먼저 호출된다는 것입니다. 렌더링 간에 이 순서는 React의 훅 동작을 모방하기 위해 일관되어야 합니다.
따라서 함수 컴포넌트 실행 중에 hookPattern이 호출되는 순서가 중요합니다.

그럼, 이제 작동 방식을 살펴보겠습니다:

먼저, ES6 모듈에 익숙하지 않다면, ES6 import 메커니즘은 가져온 바인딩(상태, 설정자, useHookPattern, resetHookIndex)이 내보낸 값을 실시간 읽기 전용 뷰로 보장합니다. HookPattern.js 모듈에서 이러한 내보낸 값에 대한 변경 사항은 즉시 가져온 모듈에서 볼 수 있습니다.

## 컴포넌트 라이프사이클 시뮬레이션



각각 ExampleHook이 호출될 때마다 컴포넌트의 "렌더"를 시뮬레이션합니다. ExampleHook()를 처음 호출할 때는 hookPattern(initialValue)이 상태 변수들을 초기화하고 만나는 각 상태 변수에 대한 상태와 세터를 설정합니다(states[currentStateIndex]를 설정하고 setters[currentStateIndex]에 세터를 생성함). 따라서 초기에 상태 변수 value1은 0으로 설정되고 상태 변수 value2는 1로 설정됩니다.

처음으로 myComponent.render()를 호출하면, 렌더링됩니다 (여기서 콘솔에 출력됩니다):

Value1: 0, Value2: 1

이후의 ExampleHook() 호출에서는 stateIndex가 ExampleHook()의 시작에서 resetHookIndex()로 재설정되므로, hookPattern() 호출마다 states와 setters에서 동일한 인덱스 위치에 접근됩니다. 이것은 이전에 설정된 상태와 해당 세터들을 초기화 없이 재사용할 수 있도록 해주기 때문에 중요합니다.



그래서 두 번째로 myComponent.render()를 호출하면 다음과 같이 렌더링됩니다:

Value1: 1, Value2: 2

바로 React에서 동작하는 방식입니다!

# 구현 — 두 번째 패스



결과적으로, 우리가 고안한 HookPattern의 사용법은 실제 React 컴포넌트에서 쉽게 시연됩니다!

```js
import React, { useState, useEffect } from 'react';
import { useHookPattern, resetHookIndex } from './HookPattern';

function ExampleHook() {
    const [value1, setValue1] = useHookPattern(0); // 우리의 'useState' 훅
    const [value2, setValue2] = useHookPattern(1);
    const [trigger, setTrigger] = useState(0);     // React의 useState 훅

    function handleClick() {
        setValue1(value1 + 1);
        setValue2(value2 + 2);
        // 리렌더링 트리거
        setTrigger(trigger + 1); 
    }

    useEffect(() => {
        // 각 렌더링 후 훅 인덱스 재설정
        resetHookIndex(); 
    });

    return (
        <>
            Value1: {value1} Value2: {value2}
            <button onClick={handleClick}>훅 패턴 테스트</button>
        </>
    );
}

export default ExampleHook;
```

# 마치며

HookPattern.js에 제공된 구현과 해당 패턴을 순수 JavaScript 및 React 컴포넌트에서 사용하는 것은 훅 패턴에 대한 기초적 이해를 제공합니다. 이 연습용 구현은 훅의 본질을 포착하지만 완전한 기능, 최적화, React 컴포넌트 라이프사이클 및 상태 관리 시스템과의 통합 부분은 빠져 있습니다. React의 실제 useState 및 useEffect와 같은 훅 구현은 React 렌더링 라이프사이클의 성능에 최적화되고 더 복잡합니다.



제가 믿는 바로는 이 탐구가 React 훅의 근본 원리들 중 일부에 대해 명확하게 알려주었고, 현대 웹 개발 세계에서의 학습 또는 가르침에 유익할 것이라고 생각됩니다.