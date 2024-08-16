---
title: "CSS calc를 활용한 반응형 웹사이트 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Complete Guide to Building Responsive UI with CSS calc"
link: "https://medium.com/@anton.martyniuk/complete-guide-to-building-responsive-ui-with-css-calc-a787832dc8b3"
isUpdated: true
---





<img src="/assets/img/CompleteGuidetoBuildingResponsiveUIwithCSScalc_0.png" />

# 소개

반응형 디자인은 웹 콘텐츠가 어떤 화면 크기에서든 잘 보이고 잘 작동하도록 보장합니다. 이러한 디자인은 현대 웹 앱에서 반드시 필요한 요소입니다.

오늘의 글에서는 다양한 CSS 속성에 대한 값들을 동적으로 계산하는 방법을 배우며, 웹 디자인의 반응성과 유연성을 향상시킬 것입니다.

<div class="content-ad"></div>

# calc() CSS 함수란 무엇인가요?

CSS의 calc() 함수는 개발자가 CSS 속성 값을 결정하기 위해 계산을 수행할 수 있게 해줍니다. 이 함수는 덧셈(+), 뺄셈(-), 곱셈(\*), 나눗셈(/)과 같은 기본적인 수학 연산을 수행할 수 있습니다.

그 문법은 매우 간단합니다:

```js
element {
    property: calc(expression);
}
```

<div class="content-ad"></div>

여기서 표현 매개변수는 계산을 나타내며 그 결과가 CSS 속성 값으로 사용됩니다. 표현은 숫자, 정수, 백분율, 길이, 주파수, 각도 또는 시간 값과 함께 사용할 수 있습니다.

대부분의 경우 픽셀(px), 백분율(%), 뷰포트 단위(vw, vh), em, rem과 같은 단위가 식에서 사용됩니다. calc() 함수 내부의 식은 이러한 단위를 혼합하여 사용할 수 있습니다. 예를들어:

```js
.content {
    width: calc(100% - 100px);
    height: calc(100vh - 100px);
    font-size: calc(2vw + 5px);
    margin: calc(2rem + 10px);
}
```

화면의 높이에서 헤더의 크기를 제외한 메인 콘텐츠를 만드는 실제 사용 사례를 살펴보겠습니다:

<div class="content-ad"></div>

```js
<style>
    body {
        font-size: clamp(1.5rem, 2vw, 2rem);
        text-align: center;
        margin: 0;
        padding: 0;
    }

    header {
        width: 100%;
        height: 4rem;
        background-color: darkseagreen;
    }

    main {
        width: 100%;
        height: calc(100vh - 4rem);
        background-color: #d1d5db;
    }
</style>

<body>
    <header>헤더 영역</header>
    <main>콘텐츠 영역</main>
</body>
```

## CSS 속성 일부를 계산하는 calc() 함수 사용

calc() 함수를 사용하면 CSS 속성 중 일부를 계산하는 데 사용할 수 있습니다. 예를 들어 유연한 배경 위치를 만들 수 있습니다:

```js
.content {
    background-position: calc(100% - 500px) center;
}
```

<div class="content-ad"></div>

이 스타일은 배경 이미지의 가로 여백을 추가하고 세로 가운데 정렬을 유지합니다.

동일한 방식으로 여백이나 안쪽 여백의 일부를 동적으로 계산할 수 있습니다:

```js
.content {
    margin: 20px calc(2rem + 10px);
    padding: 10px calc(2rem + 10px) 10px calc(1rem + 5px);
}
```

## 다른 함수 내부에서 calc() 사용하기

<div class="content-ad"></div>

calc() 함수의 매우 멋진 기능 중 하나는 다른 함수 내에서 중첩될 수 있다는 것입니다. 더 복잡한 계산을 위해 calc()를 다른 함수 내에 중첩하여 사용할 수 있습니다. clamp() 함수 내에서 calc()를 사용하여 서로 다른 화면 크기에 대한 반응형 글꼴 크기를 만들 수 있습니다:

```js
body {
    font-size: clamp(16px, calc(1vw + 1em), 24px);
}
```

이 예에서 clamp()는 글꼴 크기가 16px 미만이거나 24px를 초과하지 않도록 보장합니다. 중간 값은 1em에 1vw를 추가하는 calc()를 사용하여 서로 다른 화면 크기에 유연한 스케일링 효과를 제공합니다.

clamp()와 calc()를 함께 사용하면 더 나은 반응형 디자인을 위해 매우 복잡한 계산을 만들 수 있습니다.

<div class="content-ad"></div>

재밌는 사실: calc() 함수는 다른 calc() 함수 안에 중첩될 수 있어요.

## calc() 함수를 사용하여 수학 계산하기

calc() 함수는 수학 계산을 더 우아하게 표현하는 방법으로 사용될 수 있어요:

```js
.content {
    width: calc(100% / 9);
}
```

<div class="content-ad"></div>

이렇게 하는 것이 낭독하기가 훨씬 좋아요: 11,11111111111111%;

# Custom Properties에 calc() CSS 함수 사용하기

Custom CSS 속성 또는 CSS 변수라고도 불리는 것은 웹 디자인을 위한 강력한 도구입니다. 놀라운 소식은 calc() 함수를 custom 속성에 사용할 수 있다는 것입니다.

일반적으로 custom CSS 속성은 전역적으로 접근할 수 있도록 root 레벨에서 선언되지만 필요에 따라 개별 선택자에 대해 범위를 정할 수 있습니다. 다음과 같이 정의됩니다:

<div class="content-ad"></div>

```js
:root {
    --main-color: #374151;
    --padding: 16px;
}
```

그럼 이러한 속성들은 스타일시트 전체에서 재사용할 수 있습니다. 예를 들어, 한 곳에서 색깔을 변수로 정의하고 다른 페이지에서 다른 CSS 스타일에서 재사용할 수 있습니다.

사용자 지정 CSS 속성에는 calc() 함수를 사용할 수 있습니다.

```js
:root {
    --base-font-size: 18px;
}

.content {
    font-size: calc(var(--base-font-size) + 1vw);
}
```

<div class="content-ad"></div>

여기서 기본 글꼴 크기로 속성을 정의하고 뷰포트 너비에 따라 조정합니다. CSS 변수의 이름을 액세스하려면 var 함수를 사용해야 합니다. 이 함수는 변수의 이름을 하나의 매개변수로 받습니다.

# calc() CSS 함수 사용 시 제한 사항

## 공백의 중요성

calc()를 사용할 때 가장 흔한 함정 중 하나는 연산자 주변의 공백을 처리하는 것입니다. calc() 표현식에서 덧셈(+) 및 뺄셈(-) 연산자는 공백으로 둘러싸여 있어야만 연산자로 인식됩니다. 적절한 공백이 없으면 이러한 연산자가 숫자의 일부로 해석될 수 있어 구문 오류가 발생할 수 있습니다.

<div class="content-ad"></div>

제대로 된 공백 사용:

```js
.content {
    width: calc(100% - 50px);
}
```

잘못된 공백 사용:

```js
.content {
    width: calc(100%-50px);
}
```

<div class="content-ad"></div>

음수도 사용할 수 있습니다.

```js
.content {
    width: calc(100% - -50px);
}
```

곱셈 (\*) 및 나눗셈 (/) 연산자의 경우 공백을 사용할 필요가 없습니다. 그러나 코드의 가독성을 높이기 위해 모든 산술 연산자 주변에 공백을 포함하는 것이 좋은 관행으로 간주됩니다.

## 덧셈 (+) 및 뺄셈 (-) 요구사항

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경해주세요.

| Operator | Description                            |
| -------- | -------------------------------------- |
| +        | Adds one value to another value        |
| -        | Subtracts one value from another value |

<div class="content-ad"></div>

```js
.content {
    width: calc(100% - 5);
    font-size: calc(2vw + 10);
    margin: calc(2rem + 10px + 5);
}
```

## 곱셈 (\*) 및 나눗셈 (/) 요구 사항

곱셈 (\*) 연산자는 식 내의 숫자 중 하나가 단위 없이 있어야 합니다. 나눗셈 (/) 연산자는 식 내의 두 번째 숫자가 단위 없이 있어야 합니다.

올바른 사용법:

<div class="content-ad"></div>

```css
.content {
  font-size: calc(1.5 * 16px);
  width: calc(100% / 9);
}
```

잘못된 사용법:

```css
.content {
  font-size: calc(1.5% * 16px);
  width: calc(100% / 9px);
  height: calc(100 / 9px);
}
```

## 미디어 쿼리에서의 사용법

<div class="content-ad"></div>

안타깝게도, calc() CSS 함수는 미디어 쿼리에서 사용할 수 없습니다. 예를 들어:

```js
@media (min-width: calc(500px + 10vw)) {
    /* 이렇게 하면 작동하지 않습니다 */
}
```

# 요약

calc() CSS 함수는 CSS 속성 값을 결정하기 위해 계산을 수행할 수 있게 합니다. 이 함수는 픽셀, 백분율, 뷰포트 크기, em, rem 등과 같은 다양한 CSS 단위 간에 덧셈, 뺄셈, 곱셈, 나눗셈과 같은 기본 산술 연산을 지원합니다.

<div class="content-ad"></div>

이 기능은 필요한 속성을 동적으로 조정하여 유연한 반응형 디자인을 만드는 데 정말 도움이 됩니다.

그러나 그 힘에도 불구하고, calc를 사용할 때 그 한계를 이해하는 것이 중요합니다:

- 산술 연산자 주변에 공백이 필수적임
- 서로 다른 산술 연산자에 대한 CSS 단위 및 단위 없는 숫자에 대한 미묘한 차이
- calc는 미디어 쿼리에서 사용할 수 없습니다

이 블로그 포스트가 유용하게 사용되었으면 좋겠습니다. 즐거운 코딩되세요!

<div class="content-ad"></div>

https://antondevtips.com에서 처음 발행되었습니다.

# 글을 읽은 후 다음 사항을 고려해보세요:

- 최신 블로그 글이 포함된 뉴스레터를 받으려면 구독하세요
- 이 글에 대한 소스 코드를 내 github에서 다운로드하세요 (BuyMeACoffee와 Patreon의 후원자를 대상으로 제공됩니다)

내 콘텐츠가 마음에 든다면 제게 지원을 고려해주세요

<div class="content-ad"></div>

프렌들리 톤으로 번역하면 다음과 같습니다.

나의 Patreon과 Buy Me A Coffee 커뮤니티에 가입하여 블로그 포스트의 소스 코드에 대한 독점 액세스를 얻으세요!

![Image 1](/assets/img/CompleteGuidetoBuildingResponsiveUIwithCSScalc_1.png)

![Image 2](/assets/img/CompleteGuidetoBuildingResponsiveUIwithCSScalc_2.png)
