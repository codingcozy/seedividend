---
title: "다양한 화면 크기에 맞춰 CSS로 폰트를 반응형으로 조절하는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-HowtoScaleFontsResponsivelywithCSSforDifferentScreenSizes_0.png"
date: 2024-07-07 21:20
ogImage:
  url: /assets/img/2024-07-07-HowtoScaleFontsResponsivelywithCSSforDifferentScreenSizes_0.png
tag: Tech
originalTitle: "How to Scale Fonts Responsively with CSS for Different Screen Sizes"
link: "https://medium.com/@sikirus81/how-to-scale-fonts-responsively-with-css-for-different-screen-sizes-4107f233988b"
---

<img src="/assets/img/2024-07-07-HowtoScaleFontsResponsivelywithCSSforDifferentScreenSizes_0.png" />

반응형 웹 디자인은 오늘날 다양한 디바이스 및 화면 크기에서 사용자에게 최적의 보기 및 상호 작용 경험을 제공하기 위해 중요합니다. 반응형 디자인의 중요한 측면은 화면 크기를 기반으로 텍스트와 폰트를 비례적으로 확대/축소하여 가독성을 극대화하는 것입니다.

이 게시물에서는 데스크톱, 태블릿 및 모바일 레이아웃 전체에 걸쳐 CSS를 사용하여 폰트를 반응형으로 조정하는 다양한 기술과 모범 사례를 탐구할 것입니다.

# 뷰포트 메타 태그 설정

<div class="content-ad"></div>

반응형 웹 디자인의 첫 번째 단계는 HTML 페이지의 헤드 섹션에 viewport 메타 태그를 포함하는 것입니다. 이는 브라우저에 반응형 렌더링을 사용하도록 지시합니다:

```js
<meta name="viewport" content="width=device-width, initial-scale=1">
```

viewport 너비를 장치의 너비로 설정하고 초기 줌 레벨을 1로 설정하면 페이지가 화면의 차원과 내용을 적절하게 조정할 수 있습니다. 이를 사용하지 않으면 모바일 브라우저가 페이지를 데스크톱 화면 너비로 렌더링한 다음 축소하여 글꼴 크기가 너무 작아지는 현상이 발생할 수 있습니다.

# CSS 미디어 쿼리 사용

<div class="content-ad"></div>

CSS 미디어 쿼리를 사용하면 너비, 해상도 및 방향과 같은 장치 특성에 따라 CSS 스타일을 조건부로 적용할 수 있습니다. 반응형 폰트 스케일링에 중요한 요소입니다.

예를 들어, 큰 화면에는 기본 글꼴 크기를 늘리고 작은 모바일 화면에는 줄일 수 있습니다:

```js
/* 기본 스타일 */
body {
  font-size: 16px;
}

/* 큰 화면 */
@media (min-width: 992px) {
  body {
    font-size: 18px;
  }
}

/* 작은 태블릿 및 모바일 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

이제 뷰포트가 확장됨에 따라 본문 텍스트는 14px에서 18px까지 확대/축소됩니다.

<div class="content-ad"></div>

네, 이런 식으로 해도 돼요:

# CSS Locks 사용하기

뷰포트의 크기를 기반으로 한 상대적인 단위인 vw, vh, vmin 및 vmax와 같은 CSS lock 단위를 사용하면 텍스트 크기를 응담형으로 조절할 수 있어요.

<div class="content-ad"></div>

```css
body {
  font-size: 4vw;
}
```

이렇게 하면 기본 글꼴 크기가 뷰포트 너비의 4%로 설정됩니다. 뷰포트가 커지거나 작아지면 텍스트 크기가 비례적으로 조정됩니다.

잠금 단위는 제목 크기에도 잘 작동합니다:

```css
h1 {
  font-size: 6vw;
}

h2 {
  font-size: 5vw;
}
```

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해 주세요.

<div class="content-ad"></div>

예를 들어:

```css
html {
  font-size: 14px;
}

h1 {
  font-size: 3rem; /* 3 * 14px = 42px */
}

p {
  font-size: 1rem; /* 1 * 14px = 14px */
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }

  h1 {
    font-size: 3rem; /* 3 * 16px = 48px */
  }

  p {
    font-size: 1rem; /* 1 * 16px = 16px */
  }
}
```

이를 통해 모든 텍스트 요소가 미디어 쿼리를 통해 설정한 루트 html 폰트 사이즈에 따라 확대 또는 축소될 수 있게 됩니다.

# JavaScript 사용하기

<div class="content-ad"></div>

더 다이나믹한 컨트롤을 위해 JavaScript를 사용하여 브라우저 너비를 감지하고 CSS 폰트 크기 스타일을 동적으로 설정할 수 있어요:

```js
const setFontSize = () => {
  const width = window.innerWidth;

  if (width >= 1200) {
    document.body.style.fontSize = "18px";
  } else if (width >= 992) {
    document.body.style.fontSize = "16px";
  } else {
    document.body.style.fontSize = "14px";
  };

  window.addEventListener("resize", setFontSize);
  setFontSize(); // 초기 호출
```

이를 통해 장치 크기에 따라 가독성을 향상시키기 위해 이산적인 브레이크포인트 값에 따라 폰트 크기를 설정할 수 있어요.

더 많은 제어를 위해 리사이즈 이벤트를 디바운싱하고 미디어 매치를 사용하면 더 세련된 제어가 가능해요.

<div class="content-ad"></div>

# 최소 및 최대 글꼴 크기 설정

글의 가독성을 유지하기 위해 CSS에서 최소 및 최대 글꼴 크기를 설정하는 것이 좋은 실천 방법입니다:

```js
body {
  font-size: 16px;
  min-font-size: 12px;
  max-font-size: 20px;
}
```

글꼴 크기는 12px부터 20px까지 조절되어 너무 크거나 작은 텍스트를 방지합니다.

<div class="content-ad"></div>

미디어 쿼리와 함께 사용하여 각 레이아웃 크기에 대한 다른 최소/최대 값으로 조절할 수 있어요.

# 줄 높이와 수직 리듬

수직 리듬을 유지하려면 줄 높이도 반응형으로 조절되어야 해요. 하나의 방법은 글꼴 크기에 비례하는 단위 없는 줄 높이를 사용하는 것이에요.

예를 들면:

<div class="content-ad"></div>

```js
body {
  line-height: 1.5;
}

p {
  line-height: 1.4;
}
```

라인 높이는 항상 서로 다른 글꼴 크기에 비례적으로 관련될 것입니다.

또 다른 방법으로, viewport 단위를 사용할 수도 있습니다:

```js
body {
  line-height: 4vh;
}
```

<div class="content-ad"></div>

# 반응형 테스트

포트레이트 및 랜드스케이프 방향에서 실제 장치에서 폰트 크기를 테스트하는 것이 중요합니다. 반응형 디자인 문제는 브라우저 창 크기를 조정할 때는 눈에 띄지 않을 수 있습니다.

BrowserStack과 같은 서비스를 활용하면 1000개 이상의 실제 모바일 및 데스크톱 환경에서 사이트를 미리보고 반응형 폰트 크기 조정 문제를 확인할 수 있습니다.

# 결론

<div class="content-ad"></div>

반응형 글꼴 크기 조정은 화면 크기에 걸맞게 가독성을 향상시키는 요소로, 모바일 환경에서 매우 중요합니다. 미디어 쿼리, 뷰포트 단위, rem/em 크기 조정, 최소/최대 값 등 다양한 CSS 기술을 활용하여 글꼴 크기를 비례적으로 조절할 수 있습니다. 실제 모바일 기기에서 테스트하는 것이 반응형 글꼴이 어디에서나 아름답게 작동하는지 확인하는 핵심 요소입니다.

적절한 반응형 글꼴 크기 조정은 웹사이트가 어느 환경에서든 세련되고 최적화된 사용자 경험을 제공합니다. 강력한 CSS 전략과 철저한 테스트를 통해 어떠한 기기나 레이아웃에도 동적으로 적응하는 글자체를 구성할 수 있습니다.
