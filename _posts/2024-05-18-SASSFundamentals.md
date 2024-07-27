---
title: "SASS로 웹사이트 스타일링 하는 방법"
description: ""
coverImage: "/assets/img/2024-05-18-SASSFundamentals_0.png"
date: 2024-05-18 22:07
ogImage: 
  url: /assets/img/2024-05-18-SASSFundamentals_0.png
tag: Tech
originalTitle: "SASS — Fundamentals"
link: "https://medium.com/@hassani20120/sass-fundamentals-086070382bb1"
---


![그림](/assets/img/2024-05-18-SASSFundamentals_0.png)

시대적으로 멋진 스타일 시트(SASS)는 전처리기 스크립팅 언어로 해석되거나 컴파일되어 캐스케이딩 스타일 시트(CSS)로 변환됩니다. 이를 통해 CSS에 기능과 능력이 추가되어 웹 페이지 스타일링이 더욱 강력하고 효율적으로 이루어집니다.

시작하기 전에 SASS와 SCSS의 차이를 파악하는 것이 중요합니다.

들여쓰기 구문으로 알려진 SASS는 코드 블록을 구분하기 위해 공백과 들여쓰기를 활용합니다.

<div class="content-ad"></div>

```js
//SASS 
$primaryColor: #fff
.myclass
  color: $primaryColor
```

한편, SASS의 진화인 SCSS는 CSS에 더 가까운 구문을 채택하여 중괄호와 세미콜론을 활용합니다.

```js
// SCSS
$primaryColor: #fff
.myclass{
  color: $primaryColor ;
}
```

이로써 SCSS는 CSS에 익숙한 개발자들에게 더 친숙하며, 두 언어 간의 전환을 쉽게 만들어 줍니다.

<div class="content-ad"></div>

변수의 힘을 이용하기:

Sass의 주요 기능 중 하나는 변수를 지원하며, 이를 사용하여 개발자가 스타일시트 전반에 걸쳐 재사용 가능한 값을 정의할 수 있습니다. 색상, 글꼴 및 기타 일반적인 속성에 대한 변수를 선언함으로써, 개발자는 프로젝트 전체에서 유지 관리성을 향상시키고 일관성을 확보할 수 있습니다. 예를 들어, 개발자가 여러 번 16진 코드나 글꼴 이름을 반복하지 않고, 변수를 참조함으로써 전역 스타일을 간편하게 업데이트할 수 있게 됩니다.

```js
$fontStack: Helvetica, sans-serif;
$primaryColor: #fff;

body {
  font: 10px $fontStack;
  color: $primaryColor;
}
```

<div class="content-ad"></div>

Sass의 중첩 기능을 사용하면 개발자가 CSS 규칙을 계층적으로 구성하여 HTML 요소의 구조를 반영할 수 있습니다. 이는 가독성을 향상시키고 코드의 반복을 줄이는데 도움이 됩니다. 서로 중첩된 선택기를 사용하여 개발자는 더 간결하고 구조화된 스타일 시트를 만들 수 있습니다. 그러나 네스팅을 사용할 때는 과도하게 구체적이거나 부풀어 올라간 CSS 출력을 생성하지 않도록 주의해야 합니다.

```js
.button { 
  &:visited {
      color: blue;
    } 
  &:hover {
      color: red;
    } 
  &:active {
      color: yellow;
    } 
}
```

믹신을 활용하여 재사용성 향상하기:

믹신은 Sass의 또 다른 강력한 기능으로, 재사용 가능한 스타일과 동작을 캡슐화할 수 있게 해줍니다. 그레디언트, 전환, 또는 애니메이션과 같은 일반적인 패턴에 대한 믹신을 정의함으로써 개발자는 코드를 중복하지 않고 여러 요소에 이러한 스타일을 쉽게 적용할 수 있습니다. 믹신은 인수를 받아들일 수도 있어 더 큰 유연성과 사용자 정의가 가능합니다. 이는 코드 재사용을 촉진하고 유지 관리를 간편화하여 효율적인 개발 워크플로를 이끌어냅니다.

<div class="content-ad"></div>

```js
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}
```

이 예시에서는 기본값이 DarkGray인 $theme라는 선택적 인수를 가지는 theme이라는 mixin을 만들었습니다. 이 mixin은 $theme의 값에 기반하여 배경색, 그림자 박스 및 텍스트 색상을 설정합니다.

해당 mixin을 사용하려면, 스타일에서 @include를 사용하고 필요한 인수를 전달하면 됩니다. 다음은 예시입니다:

```js
.info {
  @include theme;
}

.alert {
  @include theme($theme: DarkRed);
}

.success {
  @include theme($theme: DarkGreen);
}
```

<div class="content-ad"></div>

이 예시에서는 세 가지 다른 클래스에 테마 mixin을 적용했습니다: .info, .alert 및 .success입니다. .info 클래스는 $theme의 기본 값을 사용하고, .alert 및 .success 클래스는 각각 $theme에 대한 고유한 값을 전달합니다.

SASS를 CSS로 컴파일하면 다음과 같은 결과물이 나타납니다:

```js
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

컨트롤 지시문으로 제어를 향상시키기:

<div class="content-ad"></div>

Sass는 @if, @else, @for 및 @each와 같은 제어 지시문을 제공합니다. 이를 통해 개발자들은 조건과 반복을 기반으로 한 동적 스타일 시트를 생성할 수 있습니다. 이러한 지시문은 CSS 생성에 대한 더 큰 제어를 제공하여 개발자들이 표현력 있고 효율적인 코드를 작성할 수 있게 합니다. 예를 들어, 개발자들은 @for 반복문을 사용하여 증가하는 값으로 스타일의 시리즈를 생성하거나 @if문을 사용하여 특정 조건에 따라 다른 스타일을 적용할 수 있습니다.

```js
$type: primary;
h1 {
  @if $type == secondary {
    color: blue;
  } @else if $type == tertiary {
    color: red;
  } @else if $type == primary {
    color: green;
  } @else {
    color: black;
  }
}
```

결론:

Sass는 웹 개발 세계에서 게임 체인저로 떠오르며, 개발자들에게 CSS 작업을 간소화하고 유지 보수가능한 스타일 시트를 생성하는 강력한 도구 세트를 제공합니다. Sass의 기본을 숙달하면 변수, 중첩, 믹스인, 제어 지시문 등을 통해 프로젝트에서 효율성과 생산성을 새로운 수준으로 끌어올릴 수 있습니다. 그래서 무엇을 기다리고 있나요? 지금 당장 Sass에 뛰어들어 웹 개발 기술을 새로운 레벨로 끌어올리세요!