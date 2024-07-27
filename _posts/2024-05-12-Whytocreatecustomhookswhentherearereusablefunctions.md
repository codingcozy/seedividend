---
title: "제목 재사용 가능한 함수가 있을 때 왜 커스텀 훅을 만들어야 할까요"
description: ""
coverImage: "/assets/img/2024-05-12-Whytocreatecustomhookswhentherearereusablefunctions_0.png"
date: 2024-05-12 23:13
ogImage: 
  url: /assets/img/2024-05-12-Whytocreatecustomhookswhentherearereusablefunctions_0.png
tag: Tech
originalTitle: "Why to create custom hooks when there are reusable functions?"
link: "https://medium.com/@aiska.basnet/why-to-create-custom-hooks-when-there-are-reusable-functions-a206dbdbe3df"
---


<img src="/assets/img/2024-05-12-Whytocreatecustomhookswhentherearereusablefunctions_0.png" />

함수를 작성할 때 재사용 가능한 함수를 만들 수 있습니다. 함수를 만들어서 내보내고 사용하기만 하면 됩니다. 이 과정은 매우 간단합니다.

```js
export const getTemplateName = (id: number, templatesData: ITemplates[]) => {
  return templatesData?.find((template) => template.id === id)?.name || "-";
};
```

예를 들어, 위 코드에서는 템플릿 목록에서 템플릿을 검색하고 이름을 반환하는 재사용 가능한 함수를 만들었습니다.



이 기능은 지금은 괜찮지만, 함수에서 매번 templatesData를 전달하고 싶지 않고 위 함수 내에서 직접 가져오고 싶다면 어떻게 해야 할까요? 제 templatesData는 리덕스 상태에 저장되어 있으며 아래와 같이 수행하려고 합니다:

```js
export const getTemplateName = (id: number) => {
  // 가능할까요?
  const templatesData = useSelector((state: RootState) => state.templates);
  return templatesData?.find((template) => template.id === id)?.name || "-";
};
```

# 위 코드가 작동할까요?

이 질문에 대한 답변을 위해 간단히 훅 규칙을 살펴보고 알아보겠습니다.



- 훅은 최상위 레벨에서만 호출해 주세요.
- 훅은 React 함수에서만 호출해 주세요.
- 훅은 동일한 순서로 사용해 주세요.
- 훅은 React 컴포넌트에서만 호출해 주세요.
- 훅은 조건부로 호출하지 마세요.

위 코드는 4번 규칙을 위반하여 아래와 같은 오류가 발생했습니다:

![error](/assets/img/2024-05-12-Whytocreatecustomhookswhentherearereusablefunctions_1.png)

이를 해결하기 위해 커스텀 훅이 구원의 역할을 해줍니다.



# 해결 방법

이 문제는 아래와 같이 커스텀 훅을 사용하여 해결할 수 있습니다:

React에서의 커스텀 훅은 JavaScript 함수로, 내장 훅(예: useState, useEffect, useContext 등)이나 다른 커스텀 훅을 활용하여 재사용 가능한 로직을 캡슐화하는 기능입니다.

React에서 훅으로 인식하도록 하려면 커스텀 훅은 반드시 use로 시작해야 합니다.



이제 위 코드를 사용 가능하게 만들기 위해 사용자 정의 훅으로 변환해 봅시다.

```js
export const useTemplateActions = () => {
  // 여기서 필요한 훅을 사용하세요
  const { templatesData } = useSelector((state: RootState) => state.templates);

  const getTemplateName = (id: number) => {
    return templatesData?.find((template) => template.id === id)?.name || "-";
  };

  return { getTemplateName };
};
```

그리고 사용할 때:

```js
const myFunction = () => {
   ...
   const { getTemplateName } = useTemplateActions(); // 이제 일반 함수처럼 사용하세요
   ...
}
```



따라서, 재사용 가능한 함수가 단순한 로직만 포함하고 있다면 재사용 함수를 만드는 것은 괜찮지만, 함수가 리액트 훅 또는 기타 사용자 정의 훅을 호출한다면 사용자 정의 훅을 만들어야 합니다.

감사합니다.