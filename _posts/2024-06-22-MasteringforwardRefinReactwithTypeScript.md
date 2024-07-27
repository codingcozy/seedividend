---
title: "TypeScript로 React의 forwardRef 완벽 마스터하기"
description: ""
coverImage: "/assets/img/2024-06-22-MasteringforwardRefinReactwithTypeScript_0.png"
date: 2024-06-22 03:08
ogImage: 
  url: /assets/img/2024-06-22-MasteringforwardRefinReactwithTypeScript_0.png
tag: Tech
originalTitle: "Mastering forwardRef in React with TypeScript"
link: "https://medium.com/@mattdeveloper/mastering-forwardref-in-react-with-typescript-c44857e7ff2f"
---


부모 컴포넌트에서 자식 컴포넌트의 DOM 요소에 액세스하거나 메서드를 호출합니다.

![이미지](/assets/img/2024-06-22-MasteringforwardRefinReactwithTypeScript_0.png)

## 소개

React에서 참조(refs)를 처리하고 부모 컴포넌트가 자식 컴포넌트와 상호 작용하는 것은 까다로울 수 있습니다. 다행스럽게도, React의 forwardRef 기능을 사용하면 이러한 상호작용을 효율적으로 관리할 수 있는 좋은 방법을 제공합니다. TypeScript와 함께 사용될 때, forwardRef는 컴포넌트간의 통신을 더 원활하게 만들뿐만 아니라 코드 안전성과 유지 보수의 용이성을 향상시킵니다. 이 안내서에서는 TypeScript와 함께 forwardRef를 사용하는 방법을 살펴보고, 실용적인 예제를 보여주며 최상의 사용 사례에 대한 팁을 공유할 것입니다.

<div class="content-ad"></div>

## forwardRef 이해하기

React에서 forwardRef를 사용하면 참조(ref)를 한 컴포넌트를 통해 바로 해당 컴포넌트의 자식 컴포넌트로 전달할 수 있습니다. 이 기술은 특히 부모 컴포넌트에서 자식 컴포넌트의 DOM 요소에 직접 액세스하거나 메소드를 호출하는 데 유용합니다.

## TypeScript와 함께 사용하는 기본 구문

```js
import { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return <button ref={ref} onClick={props.onClick}>Click Me!</button>;
});
```

<div class="content-ad"></div>

# TypeScript를 이용한 간단한 예제

자식 구성 요소에서 DOM 요소에 액세스하기 위해 forwardRef를 사용하는 간단한 사용 사례를 보여드립니다.

## forwardRef를 사용한 자식 구성 요소

```js
import { forwardRef } from 'react';

const TextInput = forwardRef<HTMLInputElement, { placeholder: string }>(
  (props, ref) => {
    return <input ref={ref} type="text" placeholder={props.placeholder} />;
  }
);
```

<div class="content-ad"></div>

## 부모 컴포넌트가 자식의 DOM 노드에 액세스하는 방법

```js
import { useRef, useEffect } from 'react';

const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <TextInput ref={inputRef} placeholder="Focus on me" />;
};
```

이 예제에서 부모 컴포넌트는 TextInput 컴포넌트에 포커스를 맞추며, DOM 요소를 조작하기 위해 forwardRef를 간단하게 활용한 것을 보여줍니다.

# 고급 사용법: 자식 컴포넌트 메서드 노출

<div class="content-ad"></div>

더 복잡한 시나리오는 자식 컴포넌트 메서드를 부모에 노출하는 것을 포함합니다. 이것이 forwardRef가 진정으로 빛을 발하는 곳이며, 특히 useImperativeHandle과 함께 사용할 때 빛을 발합니다.

## 노출된 메서드를 가진 자식 컴포넌트

이 시나리오에서는 onClick 메서드를 노출하는 버튼이 있습니다. 이 메서드는 부모 컴포넌트에서 트리거될 것입니다.

```js
import { forwardRef, useImperativeHandle } from "react";

interface ChildProps {}

/**
 * 부모 컴포넌트에 노출될 인터페이스입니다.
 */
export interface ChildRef {
  onClick: () => void;
}

export const ChildComponent = forwardRef<ChildRef, ChildProps>((props, ref) => {
  const onClick = () => {
    alert("자식 컴포넌트의 버튼이 클릭되었습니다!");
  };

  /**
   * `onClick` 함수를 부모 컴포넌트에 노출합니다.
   */
  useImperativeHandle(ref, () => ({
    onClick,
  }));

  return <button onClick={onClick}>알림 표시하기!</button>;
});
```

<div class="content-ad"></div>

## 자식을 제어하는 부모 컴포넌트

부모 컴포넌트에서는 자식 컴포넌트의 `onClick` 메서드를 트리거할 것입니다. 여기서는 또한 `ChildRef`를 사용하여 ref의 타입을 지정합니다.

```js
import { useRef } from "react";

import { ChildComponent, ChildRef } from "../child";

export const App: React.FC = () => {
  const childRef = useRef<ChildRef>(null);

  const triggerChild = () => {
    childRef.current?.onClick();
  };

  return (
    <div className="app">
      <header>
        forwardRef의 사용법을 보여줍니다.{" "}
        <a onClick={triggerChild}>여기를 클릭</a>하여 자식 컴포넌트의 버튼을 클릭하는 이벤트를 발생시킵니다.
      </header>

      <div className="child">
        <ChildComponent ref={childRef} />
      </div>
    </div>
  );
};
```

이 섹션은 TypeScript에서 `forwardRef`와 `useImperativeHandle`를 결합하여 자식 컴포넌트의 동작을 제어하는 방법을 보여줍니다. 이 패턴을 사용하여 아코디언을 토글하거나 모달을 열기와 같은 다양한 기능을 구현할 수 있습니다.

<div class="content-ad"></div>

GitHub 레포지토리에서 고급 예제의 완전한 소스 코드를 찾아볼 수 있습니다: [https://github.com/mattdeveloper/mastering-react-forward-ref](https://github.com/mattdeveloper/mastering-react-forward-ref)

# forwardRef를 사용한 컴포넌트 타입 지정

TypeScript에서 forwardRef를 사용할 때, props와 refs에 알맞은 유형을 정의하여 타입 안정성을 보장하는 것이 매우 중요합니다.

## 유형 정의

<div class="content-ad"></div>

컴포넌트의 props와 ref를 명확히하려면 먼저 각각의 타입을 정의해야 합니다.

```js
interface MyComponentProps {
  label: string;
}

interface MyComponentRef {
  focus: () => void;
}
```

## 타입 구현하기

정의된 타입을 사용하여 forwardRef를 이용해 컴포넌트를 구현하세요. 이렇게 하면 props와 ref가 명시된 타입에 따라 작동하게 됩니다.

<div class="content-ad"></div>

```js
const MyComponent = forwardRef<MyComponentRef, MyComponentProps>((props, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current?.focus();
    },
  }));

  return <input ref={internalRef} aria-label={props.label} />;
});
```

# 소스 코드

여기 고급 예제의 완전한 소스 코드가 포함된 GitHub 리포지토리가 있습니다: https://github.com/mattdeveloper/mastering-react-forward-ref

# 최고의 사례와 고려 사항

<div class="content-ad"></div>

컴포넌트에서 forwardRef를 활용할 때, 특히 TypeScript와 함께 사용할 때는 다음과 같은 모범 사례를 고려해보세요:

- forwardRef를 사용하는 경우는 자식 컴포넌트의 DOM 노드나 메서드에 직접 액세스해야 할 때에만 사용하세요.
- useImperativeHandle을 활용하여 자식 컴포넌트의 필요한 기능만 노출시켜 컴포넌트의 API를 깔끔하고 명시적으로 유지하세요.
- 중첩된 컴포넌트나 forwardRef를 다룰 때 특히 ref를 올바르게 전파하세요.

# 결론

특히 TypeScript와 함께 사용할 때 forwardRef는 React 컴포넌트의 유연성, 재사용성, 유형 안정성을 향상시키는 강력한 방법을 제공합니다. 사용 패턴과 모범 사례를 이해하면 더 유지보수하기 쉽고 견고한 React 애플리케이션을 만들 수 있습니다.