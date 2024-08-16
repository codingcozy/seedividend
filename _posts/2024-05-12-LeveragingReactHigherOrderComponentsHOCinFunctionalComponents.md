---
title: "함수 컴포넌트에서 React 고차 컴포넌트HOC 활용하기"
description: ""
coverImage: "/assets/img/2024-05-12-LeveragingReactHigherOrderComponentsHOCinFunctionalComponents_0.png"
date: 2024-05-12 22:15
ogImage: 
  url: /assets/img/2024-05-12-LeveragingReactHigherOrderComponentsHOCinFunctionalComponents_0.png
tag: Tech
originalTitle: "Leveraging React Higher Order Components (HOC) in Functional Components"
link: "https://medium.com/@prathamchauhan/leveraging-react-higher-order-components-hoc-in-functional-components-30012900abbf"
isUpdated: true
---




<img src="/assets/img/2024-05-12-LeveragingReactHigherOrderComponentsHOCinFunctionalComponents_0.png" />

React Higher Order Components (HOC)은 React 애플리케이션에서 코드 재사용, 로직 공유 및 추상화를 위한 강력한 패턴입니다. 보통 클래스 컴포넌트와 관련이 있지만, 고차 컴포넌트는 함수형 컴포넌트와 함께 효율적으로 활용할 수도 있습니다. 이 글에서는 함수형 컴포넌트에서 고차 컴포넌트를 구현하고 활용하는 방법에 대해 살펴보겠습니다.

고차 컴포넌트 이해하기:

고차 컴포넌트는 컴포넌트를 인수로 받아 향상된 기능을 갖춘 새로운 컴포넌트를 반환하는 함수입니다. 인증, 권한 부여, 로깅 및 상태 관리와 같은 교차 관심사를 여러 컴포넌트에서 캡슐화하고 공유할 수 있도록 합니다.



함수형 컴포넌트에서 고차 컴포넌트 구현하기:

함수형 컴포넌트에서는 고차 컴포넌트를 일반 JavaScript 함수로 구현하며, 이 함수는 컴포넌트를 인수로 받아 새로운 함수형 컴포넌트를 반환합니다.

다음 예제를 살펴보겠습니다:

```js
import React from 'react';

const withLogging = (WrappedComponent) => {
  const WithLogging = (props) => {
    console.log('Component rendered:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };

  return WithLogging;
};

const MyComponent = () => {
  return <div>Hello, World!</div>;
};

const EnhancedComponent = withLogging(MyComponent);

export default EnhancedComponent;
```



이 예시에서 withLogging은 렌더링된 컴포넌트의 이름을 콘솔에 로그하는 Higher Order Component입니다. 이는 컴포넌트(WrappedComponent)를 인수로 받아 원래 컴포넌트를 래핑하고 로깅 기능을 추가한 새로운 함수형 컴포넌트(WithLogging)를 반환합니다.

함수형 컴포넌트에서 Higher Order Components 사용하기:

한 번 Higher Order Component가 정의되면, 그것을 사용하여 함수형 컴포넌트를 래핑하여 향상시킬 수 있습니다. 다음은 withLogging Higher Order Component를 함수형 컴포넌트와 함께 사용하는 방법입니다.

```js
import React from 'react';

const MyComponent = () => {
  return <div>안녕, 세상!</div>;
};

const EnhancedComponent = withLogging(MyComponent);

const App = () => {
  return (
    <div>
      <EnhancedComponent />
    </div>
  );
};

export default App;
```



이 예시에서 MyComponent는 일반 함수형 컴포넌트이고, EnhancedComponent는 withLogging Higher Order Component를 MyComponent에 적용한 결과입니다. App 컴포넌트 내에서 EnhancedComponent를 렌더링하면 감싸진 컴포넌트의 이름(MyComponent)이 콘솔에 기록됩니다.

함수형 컴포넌트와 Higher Order Components의 장점:

- 코드 재사용을 촉진하고 교차 관심사의 캡슐화를 장려합니다.
- 로직을 표현으로부터 분리하여 관심사의 분리를 가능하게 합니다.
- 여러 Higher Order Components를 함께 조합할 수 있는 합성 기능을 향상시킵니다.
- 컴포넌트를 보다 집중적이고 격리된 상태로 테스트할 수 있도록 돕습니다.

결론



리액트 고차 컴포넌트는 재사용 가능한 로직과 동작을 확장하는 강력한 방법을 제공합니다. 공통 기능을 고차 컴포넌트 내에 캡슐화함으로써, 개발자들은 리액트 애플리케이션에서 코드 구성, 유지 관리성, 그리고 재사용성을 향상시킬 수 있습니다. 인증, 로깅 또는 기타 교차 관심사를 구현하려는 경우, 고차 컴포넌트는 기능 컴포넌트 강화를 위한 유연하고 효과적인 해결책을 제공합니다.