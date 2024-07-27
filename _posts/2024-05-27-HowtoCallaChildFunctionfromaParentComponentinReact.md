---
title: "React에서 부모 컴포넌트에서 자식 함수를 호출하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_0.png"
date: 2024-05-27 18:46
ogImage: 
  url: /assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_0.png
tag: Tech
originalTitle: "How to Call a Child Function from a Parent Component in React"
link: "https://medium.com/@ankit-royal/how-to-call-a-childs-function-from-a-parent-component-in-react-a3494c3a658a"
---


<img src="/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_0.png" />

React에서는 부모 컴포넌트에서 자식 컴포넌트의 메소드를 호출해야 하는 경우가 있습니다. 이를 위해 useImperativeHandle 훅과 useEffect 훅을 사용할 수 있습니다. 이 기사에서는 각 접근 방식을 사용하는 시점과 단계별 지침을 제공하겠습니다.

# 방법 1: useImperativeHandle 훅 사용

useImperativeHandle 훅은 React에서 그다지 알려지지 않은 훅으로, ref를 사용할 때 부모 컴포넌트에 노출되는 인스턴스 값을 사용자 정의할 수 있습니다. 이 방법은 불필요한 재렌더링을 유발하지 않고 자식 컴포넌트에서 여러 메소드를 직접 호출해야 할 때 권장됩니다.

<div class="content-ad"></div>

- 부모 구성 요소에서 ref를 선언하세요: useRef 훅을 사용하여 부모 구성 요소에 참조를 생성하세요.
- 참조를 자식 구성 요소로 전달하세요: 참조를 자식 구성 요소에 prop으로 전달하세요.
- 자식 구성 요소를 forwardRef로 감싸세요: forwardRef 하이어오더 컴포넌트를 사용하여 참조를 자식 구성 요소로 전달하세요.
- useImperativeHandle로 자식 메소드 정의하기: 자식 구성 요소에서 useImperativeHandle 훅을 사용하여 노출하고자 하는 메소드를 정의하세요.

# 예시 코드

![예시 이미지 1](/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_1.png)

![예시 이미지 2](/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_2.png)

<div class="content-ad"></div>

# 설명

- 자식 컴포넌트는 부모가 메서드에 액세스할 수 있도록 forwardRef로 래핑됩니다.
- 자식 컴포넌트 내부에서 useImperativeHandle을 사용하여 부모에 노출할 메서드를 정의합니다.
- 부모 컴포넌트는 useRef를 사용하여 참조를 생성하고 이를 자식에 전달한 후 이 참조를 통해 자식의 메서드를 호출합니다.

# 방법 2: useEffect Hook 사용

부모 컴포넌트에서 자식의 함수를 호출하는 또 다른 방법은 useEffect 훅을 사용하는 것입니다. 이 접근 방식은 부모에서 사이드 이펙트를 통해 자식 함수를 트리거하는 부모의 상태를 설정하는 것을 포함합니다.

<div class="content-ad"></div>

- 부모 구성 요소의 트리거 상태 선언: 자식 함수를 트리거할 수 있는 부모 구성 요소에 상태를 생성합니다.
- 자식 구성 요소로 트리거 상태 전달: 이 상태를 자식 구성 요소로 속성(prop)으로 전달합니다.
- 자식 구성 요소에서 useEffect 사용: 자식 구성 요소에서 useEffect 훅을 사용하여 트리거 상태의 변경을 감시하고 그에 따라 함수를 호출합니다.

# 예시 코드

![image](/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_3.png)

![image](/assets/img/2024-05-27-HowtoCallaChildFunctionfromaParentComponentinReact_4.png)

<div class="content-ad"></div>

# 설명

- 상위 컴포넌트는 버튼 클릭시 증가하는 트리거 상태를 유지합니다.
- 트리거 상태는 자식 컴포넌트에 프롭으로 전달됩니다.
- 자식 컴포넌트는 useEffect 훅을 사용하여 트리거 상태의 변경을 감지하고 트리거가 변경될 때마다 handleSubmit을 호출합니다.

# 어떤 방법을 사용해야 하나요?

- 상위 컴포넌트에서 자식의 메서드를 직접 호출할 때 이상적입니다.
- 자식을 다시 렌더링하지 않아도 되는 경우 또는 여러 메서드를 호출해야 할 때 적합합니다.

<div class="content-ad"></div>

- 부모 상태 변경에 따라 자식에서 함수를 트리거하는 데 유용합니다.
- 상태 변경으로 인해 부작용이 자연스럽게 발생하는 상황에 적합합니다.

# 마지막으로

React에서 부모 구성 요소에서 자식의 함수를 호출할 때는 useImperativeHandle 또는 useEffect를 사용하여 효율적으로 관리할 수 있습니다. 두 가지 방법 중에서 선택하는 것은 특정 요구 사항과 구성 요소 상호 작용의 복잡성에 달려 있습니다. 이러한 메서드를 이해하고 구현함으로써 React 애플리케이션의 상호 작용성과 유지 관리성을 향상시킬 수 있습니다.

좋은 코딩 되세요! 😎