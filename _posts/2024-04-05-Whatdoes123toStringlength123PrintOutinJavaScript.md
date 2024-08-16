---
title: "자바스크립트에서 123toStringlength  123은 무엇을 출력할까요"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "What does 123toStringlength  123 Print Out in JavaScript"
link: "https://medium.com/javascript-in-plain-english/what-does-123-tostring-length-123-print-out-in-javascript-f2e7dbac360e"
isUpdated: true
---





<img src="/assets/img/Whatdoes123toStringlength123PrintOutinJavaScript_0.png" />

얼마 전에 쉬운 면접 질문을 받았는데, 처음에는 제대로 된 답을 하지 못했어요. 실제로 95%의 프런트엔드 개발자도 정확히 대답하지 못했어요. 그 면접 질문은 무엇일까요? 함께 살펴보세요…

```js
// 결과는 무엇인가요?
123['toString'].length + 123 = ?
```

처음에 저는 답이 126(3 + 123)일 것이라고 생각했지만, 틀렸어요. 실제 답은 무엇일까요? 비밀을 한 걸음씩 밝혀보겠습니다.

<div class="content-ad"></div>

# 함수의 형식 매개변수 개수

```js
const func1 = () => {};
const func2 = (name) => {};
const func3 = (name, age) => {};
console.log(func1.length); // 0
console.log(func2.length); // 1
console.log(func3.length); // 2
```

이것은 아주 쉽죠. 모든 프론트엔드 개발자가 이 정답을 알고 있어요.

함수는 길이만큼 매개변수를 갖고 있는데, 정말 그런 걸까요? 저를 따라와서 아래로 내려가 보세요...

<div class="content-ad"></div>

# 기본 매개변수

```js
const func1 = (name) => {};
const func2 = (name = "fatfish") => {};
const func3 = (name, age = 24) => {};
const func4 = (name, age = 24, gender) => {};
const func5 = (name = "fatfish", age, gender) => {};
console.log(func1.length); // 1
console.log(func2.length); // 0
console.log(func3.length); // 1
console.log(func4.length); // 1
console.log(func5.length); // 0
```

이건 나를 놀라게 했고, 답변들과 조금 다른 점이 있는 것 같아. 네, 여기서 결론을 도출할 수 있어요:

function.length은 기본값을 가진 첫 번째 매개변수 이전의 매개변수 수를 나타냅니다.

<div class="content-ad"></div>

# 함수의 나머지 매개변수

함수에 나머지 매개변수가 있는 경우, "function.length"는 어떻게 계산될까요?

```js
const func1 = (name, ...args) => {};
console.log(func1.length); // 1
```

네, 맞아요. 당신이 맞아요. 정답은 1입니다. 그러니까 또 다른 결론을 얻을 수 있어요:

<div class="content-ad"></div>

남은 매개변수들은 "function.length" 계산에 포함되지 않습니다.

# 요약

마지막으로, 이 질문에 대한 답을 알고 계신가요?

```js
// Number.prototype.toString.length 출력 결과는 1입니다.
123['toString'].length + 123 = 124
// 1 + 123 = 124
```

<div class="content-ad"></div>

MDN의 요약을 확인해보세요

Length는 함수 객체의 속성이며, 함수가 기대하는 인수의 수를 나타냅니다. 즉, 형식 매개변수의 수입니다.

이 숫자는 나머지 매개변수를 제외하고, 기본값이 있는 첫 번째 매개변수 이전의 매개변수만 포함합니다.

반면에, arguments.length는 함수 내에서 지역적으로 동작하며, 함수에 실제로 전달된 인수의 수를 제공합니다.

<div class="content-ad"></div>

# 마지막으로

읽어 주셔서 감사합니다. 앞으로도 많은 고품질 기사를 기대하고 있습니다.

# 쉽게 설명한 것들 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

<div class="content-ad"></div>

- 작가에게 박수를 보내고 팔로우해 주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 더 많은 콘텐츠: PlainEnglish.io
