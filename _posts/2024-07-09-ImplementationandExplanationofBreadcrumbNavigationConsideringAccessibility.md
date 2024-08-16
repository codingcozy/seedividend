---
title: "접근성을 고려한 브레드크럼 내비게이션 구현 및 설명"
description: ""
coverImage: "/assets/img/2024-07-09-ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_0.png"
date: 2024-07-09 14:13
ogImage: 
  url: /assets/img/2024-07-09-ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_0.png
tag: Tech
originalTitle: "Implementation and Explanation of Breadcrumb Navigation Considering Accessibility"
link: "https://medium.com/@mogy.code/implementation-and-explanation-of-breadcrumb-navigation-considering-accessibility-e3d011cfdaed"
isUpdated: true
---



# 결론 (전체 코드)

## HTML

```js
<nav class="breadcrumb" aria-label="Current Page Hierarchy">
  <ol class="breadcrumb__list-wrapper">
    <li class="breadcrumb__list">
      <a class="breadcrumb__link" href="../../">
        홈
      </a>
    </li>
    <li class="breadcrumb__list">
      <a class="breadcrumb__link" href="../">
        글 목록
      </a>
    </li>
    <li class="breadcrumb__list">
      <a class="breadcrumb__link" href="./" aria-current="page">
        글
      </a>
    </li>
  </ol>
</nav>
```

## CSS

<div class="content-ad"></div>

/_ reset _/
\*,
::before,
::after {
box-sizing: border-box;
border-style: solid;
border-width: 0;
min-width: 0;
}

html {
line-height: 1.15;
-webkit-text-size-adjust: 100%;
-webkit-tap-highlight-color: transparent;
}

body {
margin: 0;
}

ul,
ol {
margin: 0;
padding: 0;
list-style: none;
}

a {
background-color: transparent;
text-decoration: none;
color: inherit;
}

/_ breadcrumb _/
.breadcrumb {
padding: 16px;
background-color: #f8f9fa;
}

.breadcrumb\_\_list-wrapper {
display: flex;
gap: 8px;
}

.breadcrumb\_\_list {
position: relative;
padding-right: 16px;
}

.breadcrumb\_\_list::after {
content: '';
position: absolute;
right: 0;
top: 50%;
translate: 0 -50%;
rotate: 45deg;
border: solid #6c757d;
border-width: 2px 2px 0 0;
display: inline-block;
padding: 3px;
}

.breadcrumb\_\_list:last-child::after {
content: none;
}

.breadcrumb\_\_link {
font-size: 1rem;
color: #004494;
transition: color 0.3s ease;
}

@media (any-hover:hover) {
.breadcrumb\_\_link:hover {
color: #000000;
}
}

.breadcrumb\_\_link:focus-visible {
color: #000000;
}

.breadcrumb\_\_link[aria-current="page"] {
font-weight: bold;
color: #333333;
}

<div class="content-ad"></div>

## HTML — nav 및 div 태그를 사용한 구현 비교

```js
<nav class="breadcrumb" aria-label="Current Page Hierarchy">
```

nav 태그를 사용하면 이것이 내비게이션임을 명확히 하고 스크린 리더를 통해 탐색할 수 있도록 합니다.

nav 태그를 사용한 구현

<div class="content-ad"></div>

nav 태그를 사용하면 스크린 리더가 이동 경로를 탐색 요소로 인식하여 사용자가 페이지 구조를 이해하는 능력을 향상시킬 수 있습니다.

![이미지](/assets/img/2024-07-09-ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_0.png)

div 태그를 사용한 구현

nav 태그를 사용하지 않으면 스크린 리더가 이동 경로를 탐색 요소로 인식하지 못합니다. 이는 스크린 리더를 의존하여 페이지 레이아웃을 이해하는 사용자들을 혼란스럽게 할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_1.png" />

## HTML — aria-label을 사용한 내비게이션과의 비교

```js
<nav class="breadcrumb" aria-label="현재 페이지 계층구조">
```

aria-label 속성을 사용하면 내비게이션의 이름이 명확해져 화면 낭독기를 통해 읽기와 검색하기가 좋아집니다. 또한 헤더, 브레드크럼, 푸터 등 여러 내비게이션이 있는 경우 구분할 수 있습니다.

<div class="content-ad"></div>

위의 코드에서 작업은 표에 마크다운 형식을 변경하는 것입니다.

| 작업 유형             | 완료 여부 |
| --------------------- | --------- |
| 표 마크다운 형식 변경 | ✅        |

<div class="content-ad"></div>

## HTML — Breadcrumb Navigation의 각 항목은 ol 태그로 구현됩니다

```js
<ol class="breadcrumb__list-wrapper">
    <li class="breadcrumb__list">
        <a class="breadcrumb__link" href="../../">
            Home
        </a>
    </li>
    <!-- 위의 형식대로 li 태그를 계속 구현합니다 -->
</ol>
```

브레드크럼 내비게이션은 페이지의 계층 구조를 나타내므로 계층 구조의 순서를 따르기 위해 ol 태그로 구현됩니다.

## HTML — aria-current를 사용하여 현재 페이지 표시

<div class="content-ad"></div>

```js
<li class="breadcrumb__list">
  <a class="breadcrumb__link" href="./" aria-current="page">
    Article
  </a>
</li>
```

현재 페이지가 "Article" 페이지 (./) 인 경우, 해당 링크에 aria-current 속성이 추가됩니다. 이렇게하면 현재 페이지를 나타내는 링크가 명확하게 표시되어 스크린 리더의 출력이 개선됩니다.

aria-current를 구현한 스크린 리더 출력 예제

현재 페이지를 나타내는 링크에 aria-current 속성이 추가되면, 스크린 리더는 해당 링크를 활성 링크로 식별할 수 있습니다.

<div class="content-ad"></div>

```js
링크 아티클
```

출력: 화면 판독기가 "링크 아티클"이라고 알려주어 사용자가 현재페이지인 "아티클"임을 빠르게 이해할 수 있습니다.

aria-current가 구현되지 않은 화면 판독기 출력 예시

aria-current 속성을 사용하지 않은 경우, 화면 판독기는 현재 페이지와 다른 링크를 구별할 수 없습니다.

<div class="content-ad"></div>

```js
현재 페이지 링크 내용
```

결과: 스크린 리더가 "현재 페이지 링크 내용"을 알리며, 특히 빠르게 링크를 탐색하는 사용자들에게는 덜 명확할 수 있습니다.

## CSS — CSS 변형을 사용하여 Breadcrumb 구분 기호 표현하기

```js
.breadcrumb__list::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    translate: 0 -50%;
    rotate: 45deg;
    border: solid #6c757d;
    border-width: 2px 2px 0 0;
    display: inline-block;
    padding: 3px;
}
```

<div class="content-ad"></div>

화면 판독기가 단어 사이를 이동할 때 '`'를 사용하여 구분하는 것은 화면 판독기가 이를 읽어야 하므로 사용자의 화면 판독 경험을 방해할 수 있습니다. 목록을 원활하게 읽을 수 있도록 구분자는 CSS 변환을 사용하여 구현해야 합니다. 이는 시각적으로 표시되지만 화면 판독기에서 무시됩니다.

CSS 변환을 사용한 화면 판독기 출력 예시:

```js
link home link articles
```

출력: “link home link articles” — 화면 판독기가 구분자를 언급하지 않고 링크 사이를 부드럽게 이동합니다.

<div class="content-ad"></div>

```js
link home 보다 link articles
```

Output: “link home 보다 link articles” — 스크린 리더는 “보다”라고 발음하며, 사용자에게 혼란을 줄 수 있습니다.

## CSS — 색대비 비율 조정

<div class="content-ad"></div>

텍스트 색상과 배경 색상 사이, 그리고 텍스트 색상과 호버 텍스트 색상 사이의 대비 비율을 최소 4.5:1로 조정하여 가독성을 확보해주세요.

대비 비율은 WCAG 가이드라인의 AA 기준에 따릅니다.

웹 콘텐츠 접근성 지침 (WCAG) 2.2 — 성공 기준 1.4.3 대비 (최소)

대비 비율 확인은 WCAG Color Contrast Checker, Google Chrome 확장 프로그램을 사용하여 진행됩니다.

<div class="content-ad"></div>

https://chromewebstore.google.com/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf

WCAG Color Contrast Checker를 사용한 예시

![ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_4](/assets/img/2024-07-09-ImplementationandExplanationofBreadcrumbNavigationConsideringAccessibility_4.png)

# 생각들

<div class="content-ad"></div>

최근에 접근성에 대해 공부하기 시작했고, 이 글을 종이에 메모하는 식으로 작성했어요. 더 많이 배우면서 계속해서 글을 올릴 계획이에요. 의견이나 제안이 있다면 정말 감사할 거예요.

마지막으로, 제 공부에 활용한 참고 링크 몇 개를 넣을 거에요. 필요하면 참고해 주세요. 읽어 주셔서 감사합니다.

# 링크

W3C의 실용적인 실천 팁 모음
ARIA Authoring Practices Guide | APG | WAI | W3C

<div class="content-ad"></div>

## W3C(웹 표준을 만드는 기구)의 실용적인 실천 방법 모음 (Breadcrumb)

| Breadcrumb Example | APG | WAI | W3C |

## WCAG 접근성 지침

웹 콘텐츠 접근성 지침 (WCAG) 2.2

## aria-label 설명

ARIA8: 링크의 접근 가능한 이름을 제공하기 위해 aria-label 사용 | WCAG 2.0 기술

## aria-current 설명

Element: ariaCurrent 속성 — 웹 API | MDN
