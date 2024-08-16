---
title: "useEffect vs useLayoutEffect를 쉽게 이해하기"
description: ""
coverImage: "/assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_0.png"
date: 2024-05-14 11:53
ogImage: 
  url: /assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_0.png
tag: Tech
originalTitle: "useEffect vs. useLayoutEffect in plain language"
link: "https://medium.com/groww-engineering/useeffect-vs-uselayouteffect-in-plain-language-33eb1c7c1f87"
isUpdated: true
---




useEffect vs useLayoutEffect에 대한 차이점과 유사점을 발견하고, 언제 각각을 사용해야 하는지 배워보세요.

![이미지](/assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_0.png)

본 글에서는 useEffect와 useLayoutEffect의 기능, 차이점, 그리고 각각을 언제 사용해야 하는지 다룰 것입니다.

시작하기 전, 간단하고 빠른 답변을 찾는 분들을 위해:



이 두 가지 리액트 훅은 비슷한 기능을 하며 동일한 방식으로 작동합니다.

차이점은 useLayoutEffect가 화면의 변경 사항을 사용자가 볼 수 있는 렌더링 이전에 호출되는 반면, useEffect는 사용자가 화면의 변경 사항을 볼 수 있는 렌더링 이후에 호출된다는 것입니다.

나중에 이것이 무슨 의미인지 자세히 살펴보겠습니다.

지금은 useLayoutEffect 예제와 useEffect 예제를 간단히 살펴보며 시작해보겠습니다.



![이미지](/assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_1.png)

# useLayoutEffect와 useEffect의 유사점은 무엇인가요?

React 훅인 useLayoutEffect와 useEffect는 실제로 사용법과 역할 측면에서 완전히 동일합니다. 두 훅의 서명(signature)은 동일합니다.

그러므로 질문에 대한 대답은 매우 유사합니다. 두 훅을 구분하는 핵심적인 차이점이 단 하나뿐이라는 것입니다.



이러한 훅은 React 컴포넌트에서 작업을 수행할 수 있게 해줍니다. 이 작업들은 조건부로 실행되어 매번 렌더링할 때마다 실행하는 것을 피해 비용이 많이든다.

이제 useEffect에 대해 구체적으로 이야기해 보겠습니다. 이것은 React 내에서 사용되는 핵심 훅 중 하나로, useState와 함께 React에서 사용하는 중요한 요소입니다.

useEffect 훅은 API 호출, 상태 설정, 타이머 사용, 구독, 변이 등과 같은 다양한 작업을 수행하는 데 사용됩니다.

다시 말해, 첫 번째 렌더링 시 또는 프롭이 변경될 때와 같이 가끔 실행하고 싶은 코드가 있다면, useEffect를 사용하여 실행할 수 있습니다.



useEffect를 사용하는 예제입니다:

![useEffect Example](/assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_2.png)

보시다시피 useEffect 후크가 있고, 이를 두 가지로 제공하고 있습니다. 콜백 함수와 의존성 배열입니다.

콜백 함수에는 실행하려는 모든 코드와 해당 코드가 실행되어야 하는 조건이 포함될 것입니다 (필요한 경우).



의존성 배열은 useEffect가 호출될 때 콜백을 조건부로 실행할 수 있는 변수 배열입니다.

이 훅이 호출되면 리액트는 의존성 배열의 각 항목을 이전 버전과 비교합니다.

만약 두 항목이 참조적 동일성(비교했을 때 동일함)을 가지고 있다면 콜백이 호출되지 않습니다. 그러나 일치하지 않는다면 콜백이 호출됩니다.

여기 참조적 동일성의 빠른 예시입니다:



![image](/assets/img/2024-05-14-useEffectvsuseLayoutEffectinplainlanguage_3.png)

# useLayoutEffect vs useEffect의 차이점은 무엇인가요?

이제 이 두 훅 간의 차이점에 대해 이야기해보겠습니다.

이 게시물의 시작 부분에서 useEffect가 페이지와 상호 작용할 수 있는 시점에 실행되고, useLayoutEffect는 페이지와 상호 작용하기 전에 실행된다고 말했습니다. 그것에 대해 조금 더 자세히 살펴보고 코드에 대한 실제로 무슨 의미인지 이해해 봅시다.



## 1. 실행 순서

useLayoutEffect은 화면을 그리기 위해 DOM을 기다리지 않고 즉시 실행됩니다. 이것은 실행 순서에 영향을 미칩니다.

useEffect 훅 안에서,

```js
useEffect(() => {
console.log("log 1")
}, [])
useEffect(() => {
console.log("log 2")
}, [])
```



위 코드는 다음과 같이 출력됩니다:

```js
log 1
log 2
```

이것은 useEffect와 함께 작업할 때 예상되는 동작입니다. 지정된 순서대로 실행됩니다.

이제 두 번째 훅을 useLayoutEffect로 바꿔봅시다:



```js
useEffect(() => {
console.log("log 1")
}, [])
useLayoutEffect(() => {
console.log("log 2")
}, [])
```

위의 출력결과,

```js
log 2
log 1
```

예상대로, useLayoutEffect는 DOM 변이와 관계없이 실행되므로 useEffect 훅보다 더 빠르게 실행됩니다.



## 2. 시각적 불일치

복잡한 사용자 상호작용에 애니메이션이 포함된 경우 ref를 다룰 때 useEffect 대신 useLayoutEffect를 사용하는 것이 좋을 수 있습니다.

```js
React.useLayoutEffect(() => {
  console.log(ref.current)
})
```

위의 예시에서 useLayoutEffect는 기다렸다가 값을 업데이트한 후 다른 코드 조각으로 넘어갑니다. useEffect 훅에서 발생하는 애니메이션 깜빡임을 개선할 수 있을 수도 있습니다.



이것은 비싼 후크 실행과 부드러운 애니메이션 사이의 타협점입니다. 그러나 React는 작은 사용 사례에 대해 최적화되어 충분히 빠르기 때문에 두 가지 사이에 신경 쓸 필요가 없을 겁니다.

## 3. useLayoutEffect 및 SSR

악명 높은 useLayoutEffect 경고가 있습니다.

“경고: 서버에서 useLayoutEffect는 아무것도 수행하지 않습니다. 왜냐하면 해당 효과가 서버 렌더러의 출력 형식으로 인코딩될 수 없기 때문입니다…"



SSR을 다룰 때는 JavaScript가 제대로 로드될 때까지 useEffect 및 useLayoutEffect가 작동하지 않습니다. 따라서 콘솔에서 위와 같은 경고 메시지를 볼 수 있습니다. useEffect는 컴포넌트의 렌더 주기와 상관이 없기 때문에 해당 경고가 발생하지 않는 것이며, useLayoutEffect는 사용자가 컴포넌트를 처음으로 렌더링할 때 사용자가 보게 될 사항을 고려하고 중요시합니다.

React 커뮤니티는 이 문제를 해결하기 위해 두 가지 방법을 제안합니다.

1. 물론 가능하다면 useEffect 훅으로 변환해 보는 것이 첫 번째 시도입니다.

2. useEffect에서 깜빡거림 문제가 있는 경우나 개발자가 useLayoutEffect를 필요로 하는 경우, 다른 방법으로는 JavaScript가 제대로 로드될 때까지 해당 훅을 사용하는 컴포넌트를 지연시키는 것이 될 수 있습니다. 다시 말해, React 컴포넌트를 게으르게 로드하는 방법입니다.



# useLayoutEffect와 useEffect를 사용할 때에 대한 요약

useEffect를 사용하여 시작하는 것이 좋습니다. 대부분의 경우 그냥 그대로 두어도 될 것입니다.

만약 useEffect를 사용할 때 DOM 변이가 있고 문제가 발생한다면, 예를 들어 UI가 한 가지에서 빠르게 다른 것으로 변경되는 상황이라면, useEffect가 시각적 변경 후에 로드되기 때문에 useLayoutEffect로 전환하는 것을 고려해야 합니다.

마지막으로 useLayoutEffect와 useEffect의 차이를 기억하기 위한 도움이 되는 글:



- useLayoutEffect: DOM 변경 후, 시각적 변화 전 그리고 브라우저가 그리기 전에 발생합니다. 이는 사용자가 코드를 기다려야 한다는 것을 의미합니다.
- useEffect: DOM 변경 후, 시각적 변화 후, 그리고 브라우저가 이미 그린 후에 발생합니다. 이는 사용자가 코드를 기다릴 필요가 없다는 것을 의미합니다.

만일 이 이야기를 즐겼다면 👏 버튼을 클릭하고 공유해 주세요. 다른 사람들도 발견할 수 있도록! 아래에 댓글을 남겨주시면 감사하겠습니다.

Groww 엔지니어링팀은 기술 습작, 최신 기술 및 일반적인 프로그래밍 문제를 해결하는 더 나은 방법을 게시합니다. 최신 업데이트를 받으려면 여기에서 구독해주세요.

저희는 채용 중입니다. 채용 공고를 확인하려면 여기를 클릭해주세요.