---
title: "앵귤러 172에서의 Material 3 실험적 지원"
description: ""
coverImage: "/assets/img/2024-05-14-Material3ExperimentalSupportinAngular172_0.png"
date: 2024-05-14 12:36
ogImage: 
  url: /assets/img/2024-05-14-Material3ExperimentalSupportinAngular172_0.png
tag: Tech
originalTitle: "Material 3 Experimental Support in Angular 17.2"
link: "https://medium.com/angular-blog/material-3-experimental-support-in-angular-17-2-8e681dde650e"
---


<img src="/assets/img/2024-05-14-Material3ExperimentalSupportinAngular172_0.png" />

안녕하세요! Angular 17.2에서는 Angular Material에서 Material 3 테마를 실험적으로 지원한다는 기쁜 소식을 전합니다.

본 블로그 포스트에서는 이 기능에 대한 최신 소식을 업데이트하고 Material 3 지원에 대한 미리보기를 제공할 예정입니다.

# Material 3이란 무엇인가요?



Material 3는 Material Design의 최신 진화 버전으로, 구글의 오픈 소스 디자인 시스템입니다. Angular용 Material 3는 대체 테마로 구현되어 있으며, 현재 사용 중인 Angular Material 구성 요소와 Sass 믹스인과 호환됩니다.

Material 3 테마는 디자인 토큰을 기반으로 하며(CSS 사용자 정의 속성으로 구현됨), CSS 선택기 특이성을 증가시키지 않고도 테마를 더 쉽게 재정의할 수 있게 합니다. 이는 내부 Angular Material 요소에 CSS 선택기를 지정할 필요 없이 특정 속성을 세밀하게 재정의할 수 있도록 합니다.

# 애플리케이션에서 Material 3 사용하기

앱에서 Material 3를 사용하려면, matx.define-theme을 사용하여 Sass에서 M3 테마를 생성하고 현재 사용 중인 Angular Material Sass 믹스인에 전달하면 됩니다.



```scss
@use '@angular/material' as mat;
@use '@angular/material-experimental' as matx;

$m3-dark-theme: matx.define-theme((
  color: (
    theme-type: dark,
    primary: matx.$m3-indigo-palette,
    tertiary: matx.$m3-blue-palette,
  )
));

$m3-light-theme: matx.define-theme((
  color: (
    primary: matx.$m3-indigo-palette,
    tertiary: matx.$m3-blue-palette,
    )
));

.dark-theme {
  @include mat.all-component-themes($m3-dark-theme);
}

.light-theme {
  @include mat.all-component-themes($m3-light-theme);
}
```

M3 테마는 CSS 사용자 정의 속성을 기반으로 하므로, 테마, 색상, 타이포그래피, 밀도 믹스인은 모두 추가 선택기 가중치 없이 CSS 사용자 정의 속성만 출력됨이 보장됩니다. 이는 최상위 수준에서 사용자 정의 속성을 정의하고 해당 속성이 필요한 구성 요소로 흐르게 할 수 있음을 의미합니다. Sass에서 `.dark-theme` 및 `.light-theme`의 순서와 상관없이 다음 레이아웃들이 예상대로 작동합니다.

```html
<body class="light-theme">
  Light theme
  <sidenav class="dark-theme">With a dark sidenav!</sidenav>
</body>
```

```html
<body class="dark-theme">
  Dark theme
  <sidenav class="light-theme">With a light sidenav!</sidenav>
</body>
```



Sass API 이상의 세밀한 사용자 정의는 CSS 사용자 지정 속성을 직접 설정하여 가능합니다. 예를 들어, 사용자가 특히 주의해야 할 체크박스를 강조하려는 경우:

```js
<mat-checkbox class="scary-setting">내 계정 삭제</mat-checkbox>
```

```js
.scary-setting {
  // 내부 체크박스 선택기를 대상으로할 필요가 없어요! 🎉
  - mdc-checkbox-unselected-hover-state-layer-color: red;
  - mdc-checkbox-unselected-hover-icon-color: red;
}
```

공식 Sass 믹스인과 마찬가지로, 이러한 속성은 사용되는 곳으로 흘러내려가기 때문에, 전체 부분이 무서운 체크박스가 있는 경우 해당 클래스를 모두에 적용할 필요가 없습니다. 이러한 사용자 정의가 적용되어야 하는 가장 높은 수준 요소에만 적용하면 됩니다.



```js
<section class="scary-setting">
  <mat-checkbox>내 계정 삭제하기</mat-checkbox>
  <mat-checkbox>내 은행 계좌 비우기</mat-checkbox>
</section>
```

# Material 2 지원

매우 기쁘게도 Material 3를 소개할 수 있어 흥분되고 있으며, Material 2 테마는 완전히 지원됩니다.

M2와 M3 테마를 처리하는 방식에는 몇 가지 차이가 있습니다. 특히 컴포넌트 색상 변형과 관련된 점이 주목할 만합니다. Material 3 사용 가이드에서 이러한 차이에 대해 자세히 알아볼 수 있습니다.



# 지금 시작하세요

앵귤러 커뮤니티 여러분께 이번 업데이트 소식을 전하게 되어 너무 흥분되고 기쁩니다. 여러분의 피드백을 손꼽아 기다리고 있어요 — 이 게시물에 댓글을 남겨 의겢을 나눠주세요. Material 3 가이드로 이 기능을 오늘 바로 시도해볼 수 있어요. 우리는 안정적인 상태로 업그레이드하기 위해 사용자 정의 색상 팔레트 생성, 시스템 수준 토큰을 위한 CSS 변수, 그리고 API 개선에 계속해서 노력할 예정입니다.

읽어주셔서 감사합니다. [전송 종료]