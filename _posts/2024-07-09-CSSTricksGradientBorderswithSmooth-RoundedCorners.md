---
title: "CSS 트릭 매끄러운 둥근 모서리와 그래디언트 테두리 쉽게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-CSSTricksGradientBorderswithSmooth-RoundedCorners_0.png"
date: 2024-07-09 13:54
ogImage:
  url: /assets/img/2024-07-09-CSSTricksGradientBorderswithSmooth-RoundedCorners_0.png
tag: Tech
originalTitle: "CSS Tricks: Gradient Borders with Smooth-Rounded Corners"
link: "https://medium.com/javascript-in-plain-english/css-tricks-gradient-borders-with-smooth-rounded-corners-238211094580"
---

<img src="/assets/img/2024-07-09-CSSTricksGradientBorderswithSmooth-RoundedCorners_0.png" />

오늘은 최근에 마주한 일반적인 CSS 과제에 대해 이야기하려고 해요: 둥근 모서리가 있는 그라데이션 테두리 만드는 방법입니다.

의외로 CSS를 사용하여 그라데이션 테두리를 추가하는 것은 매우 간단합니다. 필요한 것은 border-image 속성 뿐이에요. 어떻게 작동하는지 알아볼까요?

## 그라데이션 테두리 만들기

<div class="content-ad"></div>

먼저 요소의 테두리에 그라데이션을 추가하려면 border와 border-image 속성을 사용해야 합니다. 아래는 스타일의 예시입니다:

결과는 45도 각도에서 빨간색에서 파란색으로 변하는 그라데이션 테두리입니다.

<img src="/assets/img/2024-07-09-CSSTricksGradientBorderswithSmooth-RoundedCorners_1.png" />

그러나 그라데이션 효과는 성공했지만 둥근 모서리가 없습니다. 다행히도, 그것을 추가하는 것은 간단합니다!

<div class="content-ad"></div>

## 둥근 모서리 추가

일반적으로 둥근 모서리를 만들려면 border-radius 속성을 추가합니다:
