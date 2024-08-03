---
title: "CSS 최적화 비교 분석"
description: ""
coverImage: "/assets/img/2024-07-13-OptimizingCSSAComparativeAnalysis_0.png"
date: 2024-07-13 18:51
ogImage: 
  url: /assets/img/2024-07-13-OptimizingCSSAComparativeAnalysis_0.png
tag: Tech
originalTitle: "Optimizing CSS: A Comparative Analysis"
link: "https://medium.com/@skyz03/optimizing-css-a-comparative-analysis-9ef4d5463e82"
---


웹 개발 분야에서 깨끗하고 효율적이며 유지보수가 쉬운 CSS를 작성하는 것이 중요합니다. 이 게시물에서는 두 가지 CSS 코드 스니펫에 대한 비교 분석을 살펴보고 후자 버전에서 이루어진 주요 개선 사항과 최적화를 강조할 것입니다.

과거 버전: [여기를 클릭해 이동하세요](https://twiztss.github.io/Frontend-Design/Social-Proof-Section/)

새로운 버전: [여기를 클릭해 이동하세요](https://skyz03.github.io/Frontend-Design-1/Social-Proof-Section/)

<div class="content-ad"></div>

## 중복된 속성 제거

변경 전:

```js
.wrapper {
  height: 100%;
  height: auto;
}
```

변경 후: 첫 번째 코드 조각에서 .wrapper 클래스의 height 속성이 두 번 정의되었지만, 후자의 코드 조각에서 이러한 중복이 제거되었습니다.

<div class="content-ad"></div>

## 병합된 선택자

이전:

```js
.main-text {
  width: 80%;
}
.main-review {
  width: 80%;
}
```

<div class="content-ad"></div>

```js
.main-text, .main-review {
  width: 80%;
}
```

`.main-text`과 `.main-review`의 너비 속성이 후자의 코드 스니펫에서 결합되어 가독성을 높였습니다.

## 중복 감소

이전:

<div class="content-ad"></div>

```js
.review-card, .client-review {
  padding: 0 15px;
  background-color: var(--Very-Dark-Magenta);
}
```

이전 코드에서 .review-card 및 .client-review 클래스가 간소화되어 중복을 줄이기 위해 적절히 결합되었습니다.

<div class="content-ad"></div>

## 일관성 향상

후자 스니펫에서 들여쓰기와 간격이 보다 일관성 있게 조정되어 가독성과 유지 보수성이 향상되었습니다.

패딩: 0 15px와 같은 줄임 속성의 사용 - 패딩: 0px 15px 0px 15px 대신에.

## 향상된 Flexbox 사용

<div class="content-ad"></div>

아래와 같이 Markdown 형식으로 변경하였습니다.

```css
.review-card {
  margin: 5px 0;
}
```

.review-card에 margin: 5px 0;을 추가하여 요소 간의 간격을 더 잘 설정했습니다. 처음 코드 조각에는 간격 설정이 부족했습니다.

## 일관된 색상 변수 사용

<div class="content-ad"></div>

변경 전:

```js
background-color: hsl(300, 43%, 22%);
```

변경 후:

```js
background-color: var(--Very-Dark-Magenta);
```

<div class="content-ad"></div>

두 번째 코드 스니펫은 일관적으로 색상 변수를 사용합니다.

# 자세한 차이점

## 루트 변수

:root 섹션에는 중요한 변화가 없었습니다.

<div class="content-ad"></div>

## 유니버설 선택자

두 코드 조각은 동일한 유니버설 선택자를 가지고 있어요:

```js
* { font-family: Inter; }
```

## .container

<div class="content-ad"></div>

나중 코드 조각에서는 너비와 높이 속성 (width: 100vw; height: 100vh;)이 제거되었는데요, 이는 더 나은 반응성을 위해 그리고 오버플로 문제를 피하기 위함일 수 있어요.

## .sub-container

이 부분에서는 변경 사항이 없습니다.

## .wrapper

<div class="content-ad"></div>

아래 코드 조각은 중복되는 height 속성이 제거되었습니다.

## .main-text와 .main-review

아래 코드 조각에서 width 속성이 결합되어 가독성이 향상되었고 형식이 향상되었습니다.

## .review-card

<div class="content-ad"></div>

표 태그를 마크다운 형식으로 변경했습니다.

<div class="content-ad"></div>

동일한 색 변수를 일관되게 사용하도록하여 중복 속성을 제거하여 간단한 형식을 간소화했습니다.

## .client-profile

형식을 개선하고 동일한 색 변수를 일관되게 사용하도록했습니다.

## 미디어 쿼리

<div class="content-ad"></div>

동일한 글자 속성의 일관된 사용을 보장하고 가독성을 향상시키하기 위해 서막 속성을 사용한 것을 변경했습니다.

# 개선 요약

- 간소화: 중복 속성을 제거하고 유사한 것을 결합함으로써 후자의 코드가 간소화되었습니다.
- 일관성: 색상 변수의 일관된 사용과 포맷팅을 보장했습니다.
- 가독성: 들여쓰기, 간격, 관련 속성의 그룹화가 더 나은 가독성을 제공합니다.
- 반응성: 여백과 패딩과 같은 속성 조정으로 다양한 화면 크기에 대한 응답성과 레이아웃 일관성을 향상시킵니다.

전체적으로 후자의 코드 스니펫은 최적화되고 가독성이 높아지며 유지보수가 용이하여 효과적인 CSS 리팩터링의 좋은 예입니다. 이러한 핵심 영역에 집중함으로써 개발자는 더 깨끗하고 효율적인 스타일시트를 만들어 미래에 더 나은 성능 및 더 쉬운 유지보수에 기여할 수 있습니다.