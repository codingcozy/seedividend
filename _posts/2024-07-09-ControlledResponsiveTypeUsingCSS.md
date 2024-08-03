---
title: "CSS로 반응형 글자 제어하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ControlledResponsiveTypeUsingCSS_0.png"
date: 2024-07-09 08:56
ogImage:
  url: /assets/img/2024-07-09-ControlledResponsiveTypeUsingCSS_0.png
tag: Tech
originalTitle: "Controlled Responsive Type Using CSS"
link: "https://medium.com/@carlos-ruiz-web/controlled-responsive-type-using-css-ab53a00f5322"
---

<img src="/assets/img/2024-07-09-ControlledResponsiveTypeUsingCSS_0.png" />

이것은 모바일 및 데스크톱 값을 사용하여 폰트 크기를 제어하는 멋진 팁입니다. 이 사이의 모든 것을 유동적이고 점진적으로 유지하는 동안. 단순히 다음 4가지 변수 값을 결정하고 아래 표시된 CSS 규칙에 삽입하면 됩니다.

여기 내 데모를 위해 할당한 4가지 변수 값은 다음과 같습니다:

최소 폰트 크기 = 14px
최대 폰트 크기 = 68px
하한 값 = 300px
상한 값 = 1440px

<div class="content-ad"></div>

휴대폰 중심 용어를 사용하면, 가장 작은 글꼴 크기를 14px로 설정하고, 300px 화면 너비부터 글꼴 크기가 점진적으로 증가하여 1440px 화면 너비에 도달하면 글꼴 크기가 68px로 유지됩니다.

다음은 HTML입니다:

<div class="responsive-type-class">
  Responsive Type
</div>

다음은 CSS입니다:

<div class="content-ad"></div>

```js
.responsive-type-class {
  font-size: 14px;
}
@media (min-width: 300px) and (max-width: 1440px) {
  .responsive-type-class {
    font-size: calc(14px + (68 - 14) * (100vw - 300px) / (1440 - 300));
  }
}
@media (min-width: 1440px) {
  .responsive-type-class {
    font-size: 68px;
  }
}
```

calc() 식 안에서 변수 값과 브라우저 너비 모니터링을 위한 100vw 값이 사용되어 마법이 일어납니다.

이를 Codepen에서 데모로 확인할 수 있으며, 마시면 언제든지 의견을 공유하거나 대안적인 방법을 제시해주세요.
