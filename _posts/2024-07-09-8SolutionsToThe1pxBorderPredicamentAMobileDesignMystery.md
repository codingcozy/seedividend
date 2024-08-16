---
title: "1px 테두리 문제 해결을 위한 8가지 솔루션 모바일 디자인 미스터리 "
description: ""
coverImage: "/assets/img/2024-07-09-8SolutionsToThe1pxBorderPredicamentAMobileDesignMystery_0.png"
date: 2024-07-09 08:55
ogImage: 
  url: /assets/img/2024-07-09-8SolutionsToThe1pxBorderPredicamentAMobileDesignMystery_0.png
tag: Tech
originalTitle: "8 Solutions To The 1px Border Predicament: A Mobile Design Mystery 🕵️‍♀️"
link: "https://medium.com/javascript-in-plain-english/8-solutions-to-the-1px-border-predicament-a-mobile-design-mystery-%EF%B8%8F-%EF%B8%8F-82c678ca206c"
isUpdated: true
---



<img src="/assets/img/2024-07-09-8SolutionsToThe1pxBorderPredicamentAMobileDesignMystery_0.png" />

1픽셀 테두리가 모바일 기기에서 의도한 것보다 두껍게 보이는 경우가 종종 있었죠? 혼자가 아니랍니다! 이 불일치는 모바일 화면의 픽셀 밀도가 서로 다르기 때문입니다.

웹 개발에서는 CSS를 사용하여 페이지를 스타일링합니다. 그러나 CSS에서의 1px은 기기에서의 물리적인 1px로 항상 변환되지 않습니다. 이 불일치가 “1px 테두리 문제”가 발생하는 곳입니다.

## 주범: 픽셀 밀도

<div class="content-ad"></div>

모든 장치에는 기기 독립적인 픽셀과 실제 픽셀 사이의 비율을 알려주는 devicePixelRatio로 측정된 특정 픽셀 밀도가 있습니다.

# 8 회 테스트된 솔루션 🧰

픽셀 비율이 2 이상인 시나리오에 초점을 맞춰 솔루션을 살펴보겠습니다.

## 1. 0.5px 테두리: 간단한 고치기 방법

<div class="content-ad"></div>

이 방법은 장치 픽셀 비율이 2 이상인 경우 조건부로 0.5px 테두리를 적용하는 것을 포함합니다.

```js
// Check if devicePixelRatio exists and is greater than or equal to 2
if(window.devicePixelRatio && devicePixelRatio>=2){
  // Create a temporary div element for testing
  var testElem =…
```
