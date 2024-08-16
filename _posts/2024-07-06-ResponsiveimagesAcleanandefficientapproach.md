---
title: "반응형 이미지 깔끔하고 효율적인 적용 방법"
description: ""
coverImage: "/assets/img/2024-07-06-ResponsiveimagesAcleanandefficientapproach_0.png"
date: 2024-07-06 02:18
ogImage: 
  url: /assets/img/2024-07-06-ResponsiveimagesAcleanandefficientapproach_0.png
tag: Tech
originalTitle: "Responsive images: A clean and efficient approach"
link: "https://medium.com/@jangya.satapathy/responsive-images-with-css-a-clean-and-efficient-approach-a600990c47c3"
isUpdated: true
---



요즘 제가 마주한 문제는 JavaScript를 사용하지 않고도 뷰어의 디스플레이에 가장 적합한 이미지를 로드하는 것입니다. 문제와 해결책에 대해 함께 알아보겠습니다. 즐거운 읽기 되세요.

# 문제

아래의 그림을 살펴보면 데스크탑과 모바일에 각기 다른 이미지를 사용하고 있습니다. 이를 어떻게 수행할지 고려해 보세요.

/assets/img/2024-07-06-ResponsiveimagesAcleanandefficientapproach_0.png

<div class="content-ad"></div>

문제를 해결했습니다 🎯

```js
// css 미디어 쿼리를 사용하여 데스크톱에서 표시
<img id="desktop-image" src="desktop.png" alt="hero-image"/>
// css 미디어 쿼리를 사용하여 모바일에서 표시
<img id="mobile-image" src="mobile.png" alt="hero-image"/>
```

그런데, 문제를 해결하는 올바른 방법인가요? 아니요, 디바이스에 관계없이 두 이미지가 항상 네트워크에 로드됩니다. 🤔

적절한 이미지만 로드되도록하려면 장치 너비를 감지한 다음 해당 이미지를로드하면 됩니다. 간단하죠! 😎

<div class="content-ad"></div>

```js
<img id="hero-image" alt="hero-image" />
```

```js
const imageElement = document.getElementById("hero-image");
const desktopImage = "desktop.png";
const mobileImage = "mobile.png";

function setImageBasedOnScreenSize() {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth <= 768; // You can adjust the breakpoint here

  imageElement.src = isMobile ? mobileImage : desktopImage;
}

setImageBasedOnScreenSize();

// Add event listener for resize to handle screen size changes
window.addEventListener("resize", setImageBasedOnScreenSize);
```

여기에서는 JavaScript 접근 방식이 미디어 쿼리와 비교해 약간의 성능 오버헤드가 발생할 수 있는 이유를 설명합니다:

- 미디어 쿼리가 내장되어 있습니다: 브라우저는 미디어 쿼리를 CSS에서 효율적으로 이해하고 처리할 수 있도록 최적화되어 있습니다. 별도의 처리없이 화면 크기에 따라 스타일을 직접 적용할 수 있습니다.
- JavaScript 오버헤드: JavaScript 접근 방식은 여러 단계를 거칩니다.

<div class="content-ad"></div>

- 리사이즈 이벤트에 대한 이벤트 리스너를 추가하면 브라우저의 이벤트 루프에 약간의 오버헤드가 추가됩니다.
- 리사이즈 이벤트가 트리거되면 JavaScript 함수가 실행되어 코드를 처리하고 이미지 소스를 설정해야 합니다.

이러한 단계는 비교적 작지만 미디어 쿼리의 간단한 논리와 비교하면 누적될 수 있습니다.

본질적으로 미디어 쿼리는 브라우저가 직접 따를 수 있는 사전 정의된 규칙과 같습니다. 반면 JavaScript 방식은 각 리사이즈 이벤트마다 추가 처리가 필요합니다.

대부분의 경우, 성능 차이는 무시할 수 있습니다. 그러나 매우 빈번한 리사이즈 작업이나 많은 이미지를 처리해야 하는 경우, 미디어 쿼리 방식이 약간 더 효율적일 수 있습니다.

<div class="content-ad"></div>

# 해결책

이미지 요소를 사용하는 것을 고려해 볼 수 있습니다.

```js
<picture>
  <source srcset="desktop.png" media="(min-width: 768px)">
  <img src="mobile.png" alt="hero-image">
</picture>
```

설명:

<div class="content-ad"></div>

- 이미지 요소를 사용하면 다양한 조건에 따라 여러 이미지 소스를 지정할 수 있습니다.
- picture 내부의 source 요소는 이미지 경로를 포함하고 미디어 쿼리를 포함하는 srcset 속성을 정의합니다.
- 이 경우 데스크톱 이미지를 위한 미디어 쿼리 (min-width: 768px)가 있는 소스가 있습니다.
- img 요소는 소스 중 어느 것과도 일치하지 않는 경우에 표시되는 대체 이미지 역할을 합니다. 우리는 src 속성을 모바일 이미지 경로로 설정했습니다.

추가 고려 사항:

- 서버 측 최적화: 서버 측에서 이미지를 웹용으로 최적화하세요. 이미지 크기를 적절한 차원으로 조정하고 파일 크기를 최소화하는 압축 기술을 사용하세요.
- 브라우저 최적화: 현대적인 브라우저들은 종종 미디어 쿼리를 사용한 이미지를로딩하는 영향을 최소화하기 위해 늦게 로딩하거나 지연 로딩과 같은 기법을 채택합니다.

결론:

<div class="content-ad"></div>

이러한 기술을 활용하여 효율적인 반응형 이미지로딩을 달성할 수 있어 웹사이트 성능과 사용자 경험을 향상시킬 수 있어요.
