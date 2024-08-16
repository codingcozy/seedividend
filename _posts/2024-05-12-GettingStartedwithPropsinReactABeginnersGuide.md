---
title: "React에서 Props 시작하기 초보자를 위한 가이드"
description: ""
coverImage: "/assets/img/2024-05-12-GettingStartedwithPropsinReactABeginnersGuide_0.png"
date: 2024-05-12 20:31
ogImage: 
  url: /assets/img/2024-05-12-GettingStartedwithPropsinReactABeginnersGuide_0.png
tag: Tech
originalTitle: "Getting Started with Props in React; A Beginners Guide."
link: "https://medium.com/@jeremy.wangai/getting-started-with-props-in-react-a-beginners-guide-58dd5d199f7d"
isUpdated: true
---




React에 오신 것을 환영합니다. 초보자라면 'props'에 대해 들어봤을 것입니다. 함께 props가 무엇이며 어떻게 사용하는지 알아보겠습니다.

Props란

Props는 React에서 특별한 키워드로, 속성을 나타냅니다. 주로 데이터를 한 컴포넌트에서 다른 컴포넌트로 전달하는 데 사용됩니다. 컴포넌트는 사용자 인터페이스의 구성 요소입니다. props는 컴포넌트 간에 통신하기 위해 사용하는 메시지로 생각할 수 있습니다.

컴포넌트에 Props 전달하기



Props를 전달하려면 HTML 요소와 마찬가지로 컴포넌트에 속성을 추가해야 합니다. 아래에 예를 통해 한 가지 컴포넌트를 만들고 그에게 props를 전달하는 예제가 있습니다.

```html
<Button label="Click me!" />
```

이 예제에서 우리의 컴포넌트는 `Button`이며, 'label'이라는 prop을 전달하여 레이블을 지정했습니다.

Props에 접근하기



컴포넌트에 속성을 전달한 후에는 해당 속성에 어떻게 접근하는지 살펴봅시다. 컴포넌트에 속성을 전달한 후에는 해당 컴포넌트 내에서 ‘props’ 객체를 사용하여 속성에 접근할 수 있습니다. 이전 예제에서 전달했던 ‘label’ 속성에 접근해 봅시다. ‘props.label’을 사용할 것입니다.

```javascript
function Button(props) {
  return `<button>${props.label}</button>`;
}
```

이렇게 함으로써 우리의 속성에 접근할 수 있었습니다.

속성 사용하기: 동적 콘텐츠 렌더링



Props를 사용하면 컴포넌트를 동적으로 만들 수 있어요. 컴포넌트의 동작과 모습은 전달된 데이터를 기반으로 한 Props를 통해 사용자 정의할 수 있어요. 아래 예시를 통해 `Button` 컴포넌트로 서로 다른 레이블을 전달하여 다른 버튼을 만들 수 있어요:

```html
<Button label="Save" />
<Button label="Edit" />
<Button label="Delete" />
```

기본 Props

부모 컴포넌트로부터 전달되지 않은 경우를 위해 Props에 기본 값이 제공되어야 하는 경우를 생각해보세요. React에는 'defaultProps'라는 속성이 있어 Props의 기본 값을 지정할 수 있어요.



아래의 예시를 참고해주세요:

```javascript
function Button(props) {
  return `<button>${props.label}</button>`;
}

Button.defaultProps = {
  label: "제출",
};
```

결론


지금까지 우리는 props를 이해하는 데 성공했습니다. 프롭스는 React에서 기본적인 개념으로, 동적이고 재사용 가능한 컴포넌트를 만들 수 있는 기회를 제공합니다. 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달함으로써 사용자 입력에 반응하고 데이터를 동적으로 표시하는 강력한 UI를 만들 수 있습니다.