---
title: "Part 1 CSS와 CSS3의 차이점 진화를 이해하기"
description: ""
coverImage: "/assets/img/2024-07-09-Part1CSSvsCSS3UnderstandingtheEvolution_0.png"
date: 2024-07-09 08:51
ogImage: 
  url: /assets/img/2024-07-09-Part1CSSvsCSS3UnderstandingtheEvolution_0.png
tag: Tech
originalTitle: "Part 1: CSS vs CSS3: Understanding the Evolution"
link: "https://medium.com/@vaaluvishnu5146/part-1-css-vs-css3-understanding-the-evolution-d0d51f21b2fc"
isUpdated: true
---



CSS (Cascading Style Sheets)은 웹 페이지 레이아웃을 스타일링하고 형식을 지정하는 데 사용되는 중요한 기술입니다.

![이미지](/assets/img/2024-07-09-Part1CSSvsCSS3UnderstandingtheEvolution_0.png)

CSS 속성과 값들인 색상, 폰트 패밀리, 배경 등을 통해 웹 페이지의 시각적 표현을 향상시킬 수 있습니다.

CSS (Cascading Style Sheets)은 많은 해동안 웹 디자인의 중추적인 역할을 해오고 있으며, 개발자들이 웹 페이지를 스타일링하고 레이아웃을 정의할 수 있게 해주었습니다. CSS3의 등장으로 CSS의 기능이 크게 확장되었습니다. CSS3는 사실상 CSS의 최신 버전으로, 웹 페이지 디자인을 더 강력하고 유연하게 만드는 새로운 기능, 향상 및 효율성을 가져왔습니다.

<div class="content-ad"></div>

CSS3에서는 모듈이 도입되어 완전한 명세를 기다리지 않고도 개발자가 새로운 기능을 사용할 수 있게 되었습니다. 주목할 만한 추가 기능으로는 둥근 모서리, 그림자, 그라데이션, 전환, 애니메이션 및 Flexbox 및 Grid를 사용한 향상된 레이아웃 옵션이 있습니다. 이러한 기능들이 웹 페이지의 디자인 가능성과 성능을 급격하게 향상시켰습니다.

가장 중요한 기능들:

- 속성 및 값: CSS의 구성 요소
- 클래스 대 ID 대 요소 선택자: HTML 요소 대상 지정
- 표시 속성: 레이아웃 제어
- 위치 속성: 정확한 요소 배치
- Grid vs Flexbox: 현대적인 레이아웃 기술
- CSS 애니메이션: 디자인에 생명을 불어넣기

위에서 언급한 모든 기능에 대해 더 자세히 살펴보겠습니다:

<div class="content-ad"></div>

# CSS의 기본 요소: 속성과 값

CSS의 핵심은 속성과 값입니다. 속성은 스타일을 적용하려는 HTML 요소의 측면입니다. 예를 들어 색상, 글꼴 크기, 여백 및 안쪽 여백 등이 있습니다. 값은 이러한 속성에 할당하는 사양입니다. 예를 들어:

```js
color: blue;
font-size: 16px;
```

이 스니펫에서 색상과 글꼴 크기는 속성이며, 파란색과 16px는 각각의 값입니다. 적절한 값과 속성을 함께 매칭하는 방법을 이해하는 것은 효과적인 스타일링에 필수적입니다.

<div class="content-ad"></div>

# 클래스 vs. ID: HTML 요소 지정하기

클래스, 요소, 그리고 ID는 HTML 요소를 선택하고 스타일을 적용하는 데 사용되지만, 각각 다른 목적을 가지고 있습니다. 클래스는 재사용 가능하며 여러 요소에 적용할 수 있어 사이트 전반에 적용하려는 스타일에 이상적입니다:

```js
<div class="example">이것은 클래스 예제입니다</div>

.example {
    color: red;
}
```

ID는 고유하며 페이지당 한 번만 사용되어야 합니다. 고유한 스타일이 필요한 특정 요소에 대한 스타일을 지정하는 데 유용합니다:

<div class="content-ad"></div>

```js
#unique-example {
    color: blue;
}
```

요소 선택자는 DOM에서 해당 태그의 모든 발생에 적합한 스타일을 변경함으로써 요소를 선택하는 데 도움이 됩니다.

```js
div {
    width: 100px;
    height: 100px;
    color: red;
    background: green;
}
```

적절히 클래스, ID 및 요소 선택자를 사용하여 스타일을 구성하고 유지할 수 있습니다.

<div class="content-ad"></div>

# Display Property: Controlling Layout:

CSS에서 display 속성은 요소가 페이지에 표시되는 방식을 결정하는 데 중요합니다. 일반적으로 사용되는 값은 다음과 같습니다:

- block: 요소가 사용 가능한 전체 너비를 차지합니다.
- inline: 요소가 필요한만큼의 너비만 차지합니다.
- inline-block: 요소가 인라인 요소처럼 동작하지만 너비와 높이를 가질 수 있습니다.
- none: 요소가 전혀 표시되지 않습니다.

```js
<div id="container">

</div>

#container {
    display: block 또는 inline 또는 inline-block 또는 none;
}
```

<div class="content-ad"></div>

화면 표시 속성을 이해하면 페이지의 요소의 흐름과 배열을 관리하는 데 도움이 됩니다.

# 위치 속성: 정확한 요소 위치 지정

위치 속성은 요소의 위치를 지정할 수 있게 해줍니다. 값에는 다음이 포함됩니다:

- static: 기본값; 요소는 문서의 정상적인 흐름에 따라 위치합니다.
- relative: 요소는 정상 위치를 기준으로 배치됩니다.
- absolute: 요소는 가장 가까운 위치 지정 조상을 기준으로 배치됩니다.
- fixed: 요소는 브라우저 창을 기준으로 배치됩니다.
- sticky: 요소는 지정된 지점을 통과할 때까지 상대적으로 취급되며 그 이후에는 고정으로 취급됩니다.

<div class="content-ad"></div>

```css
<div id="container" > </div > #container {
  position: relative or absolute or fixed or static or sticky;
}
```

위치 속성을 효과적으로 사용하면 복잡한 레이아웃을 만들고 요소의 위치를 정확하게 제어할 수 있습니다.

그리고 CSS3의 여러 특징에 대해 이야기해 봅시다.

- 그리드 vs. 플렉스박스: 현대적인 레이아웃 기술
- 콤비네이터
- 가상 요소
- 배경 스타일 속성
- CSS3 키프레임 애니메이션

<div class="content-ad"></div>

위에서 언급한 몇 가지 기능에 대해 자세히 살펴보겠습니다:

# 그리드 대 비엘: 모던 레이아웃 기술

CSS 그리드와 플렉스박스는 CSS3에서 소개된 강력한 레이아웃 시스템입니다.

그리드는 행과 열을 사용하여 웹 페이지를 디자인할 수 있는 2차원 레이아웃 시스템입니다. 양축에 대해 완전한 제어가 필요한 복잡한 레이아웃에 적합합니다.

<div class="content-ad"></div>

```js
<div class="container"></div>

.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
}
```

Flexbox는 한 방향으로만 공간을 분배하는데 이상적인 1차원 레이아웃 시스템입니다(수평 또는 수직).

```js
<div class="container"></div>

.container {
    display: flex;
    justify-content: space-between;
}
```

Grid는 복잡한 레이아웃을 만드는 데 강력하지만, Flexbox는 컨테이너 안의 항목들을 정렬하고 공간을 분배하기에 더 간단하고 직관적입니다.

<div class="content-ad"></div>

# CSS 애니메이션: 디자인에 생명을 불어넣는 방법:

CSS 애니메이션을 통해 CSS 속성의 전환을 애니메이트하여 웹 페이지에 상호 작용성과 역동성을 부여할 수 있습니다. @keyframes 및 animation 속성을 사용하여 애니메이션을 만들 수 있습니다:

```js
@keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
}

div {
    animation: example 5s infinite;
}
```

이 예시는 div 요소의 배경색을 빨간색에서 노란색으로 5초 동안 변경하고 무한히 반복합니다. CSS 애니메이션은 시각적 피드백과 매력적인 상호 작용을 통해 사용자 경험을 향상시킵니다.

<div class="content-ad"></div>

# 결론:

CSS와 CSS3 간의 미묘한 차이, 속성과 값의 역할, 클래스 대 ID의 사용, 그리고 display와 position 속성의 기능을 이해하는 것은 현대 웹 디자인에 중요합니다. Grid와 Flexbox를 숙달하면 복잡한 레이아웃을 만들 수 있는 유연성을 갖게 되며, CSS 애니메이션을 통해 디자인을 생생하게 만들 수 있습니다. 이러한 CSS 개념을 활용하여 시각적으로 매력적이고 높은 기능성을 갖춘 웹 페이지를 만들어 사용자에게 훌륭한 경험을 제공할 수 있습니다. 내용이 마음에 들었다면 박수를 치지마세요. 😉

![이미지](https://miro.medium.com/v2/resize:fit:1000/1*1MjWHpRQRTJbIfkeuTuSgA.gif)
