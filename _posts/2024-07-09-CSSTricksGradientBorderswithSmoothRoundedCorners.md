---
title: "매끄러운 라운드 코너와 그라데이션 테두리 만드는 CSS 트릭"
description: ""
coverImage: "/assets/img/2024-07-09-CSSTricksGradientBorderswithSmoothRoundedCorners_0.png"
date: 2024-07-09 08:59
ogImage:
  url: /assets/img/2024-07-09-CSSTricksGradientBorderswithSmoothRoundedCorners_0.png
tag: Tech
originalTitle: "CSS Tricks: Gradient Borders with Smooth Rounded Corners"
link: "https://medium.com/@johannes.maendle/css-tricks-gradient-borders-with-smooth-rounded-corners-238211094580"
---

<img src="/assets/img/2024-07-09-CSSTricksGradientBorderswithSmoothRoundedCorners_0.png" />

요즘 자주 겪는 CSS 문제 중 하나를 다루려고 합니다: 부드러운 둥근 코너를 가진 그라데이션 테두리 만들기.

의완치는 CSS를 사용하여 그라데이션 테두리를 추가하는 것이 상당히 간단하다는 것입니다. 필요한 것은 border-image 속성뿐입니다. 어떻게 동작하는지 알아봅시다.

## 그라데이션 테두리 만들기

<div class="content-ad"></div>

먼저, 테두리 및 테두리 이미지 속성을 사용하여 요소의 테두리에 그라데이션을 추가해야 합니다. 스타일은 다음과 같습니다:

결과는 빨강에서 파랑으로 45도 각도로 전환되는 그라데이션 테두리입니다.

![Gradient Border](/assets/img/2024-07-09-CSSTricksGradientBorderswithSmoothRoundedCorners_1.png)

하지만 그라데이션 효과를 얻었지만, 둥근 모서리가 없습니다. 다행히도, 그것을 추가하는 것은 간단합니다!

<div class="content-ad"></div>

## Rounded Corners 추가하기

일반적으로 border-radius 속성을 추가하여 둥근 모서리를 구현합니다.
