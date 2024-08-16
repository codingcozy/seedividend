---
title: "SASS vs Native CSS, 2024년에는 CSS가 더 좋은 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "SASS vs Native CSS Choosing the Right Tool for the Job"
link: "https://medium.com/@temiye13/sass-vs-native-css-choosing-the-right-tool-for-the-job-db37d8c7feb5"
isUpdated: true
---





CSS, 혹은 Cascading Style Sheets 언어는 현대 웹 디자인의 기반입니다. 웹 페이지가 어떻게 보이고 느껴지는지를 결정하며, 기본적인 스타일링부터 복잡한 애니메이션까지 다룹니다. 하지만 때로는 일반 CSS만으로는 조금... 흠.. 평범하게 느껴질 수 있어요. 그런 부분에서 SASS 같은 프리프로세서가 필요합니다.

이 글에서는 SASS와 원시 CSS의 세계에 대해 탐험하며, 그들의 기능, 작업 흐름, 그리고 이상적인 사용 사례를 비교해볼 거에요. 끝까지 오면, 다음 웹 프로젝트에 적합한 도구를 선택할 수 있게 될 거예요!

SASS와 원시 CSS 이해하기

SASS(Syntactically Awesome Style Sheets)는 프리프로세서로, 기본 CSS의 확장이라고 할 수 있어요. 변수, 믹스인, 그리고 중첩과 같은 기능을 통해 일반 CSS에 슈퍼파워를 추가합니다. 이러한 기능들은 특히 대규모 프로젝트에게는 스타일시트를 보다 유지보수하기 쉽고 조직적이며 효율적으로 만들어줍니다.

<div class="content-ad"></div>

네이티브 CSS는 우리가 모두 알고 사랑하는 바닐라 버전입니다. 이것은 웹페이지 스타일링의 핵심 언어이며 추가 도구가 필요하지 않습니다.

기능 대결

SASS와 네이티브 CSS가 몇 가지 주요 영역에서 어떻게 대척점을 맞추는지 살펴봅시다:

- 변수:
- SASS: $ 기호를 사용하여 변수 정의 (예: $primary-color: blue). 스타일 시트를 더 일관되게 만들고 더 쉽게 업데이트할 수 있습니다.

<div class="content-ad"></div>

위 코드 스니펫은 Sass 변수를 사용한 CSS 스타일을 보여줍니다.

```js
$primary-color: blue;
$secondary-color: #f1f1f1;
```

```js
.button {
  color: $primary-color;
  background-color: $secondary-color;
}
.heading {
  color: $primary-color;
}
```

```js
* **Native CSS:** `var()` 함수로 사용자 지정 속성을 도입했습니다 (예: `--primary-color: blue`). 동적 업데이트를 제공하지만 구문이 덜 직관적일 수 있습니다.
```

<div class="content-ad"></div>

CSS

```js
:root {
  --primary-color: blue;
  --secondary-color: #f1f1f1;
}
```

```js
.button {
  color: var(--primary-color);
  background-color: var(--secondary-color);
}
.heading {
  color: var(--primary-color);
}
```

- 중첩:
- SASS: 서로 중첩된 셀렉터를 사용할 수 있어요 (예: .button { color: white; background-color: $primary-color; }). 복잡한 스타일을 작성할 때 가독성을 높여줘요.

<div class="content-ad"></div>

코드 조각

```js
.button {
  color: white;
  background-color: $primary-color;
```

```js
  &:hover {
    opacity: 0.8;
  }
}
```

```js
* **Native CSS:** 더 많은 선택자가 필요합니다 (예: `.button { color: white; } .button { background-color: blue; }`).
```

<div class="content-ad"></div>

CSS

```js
.button {
  color: white;
}
```

```js
.button {
  background-color: blue;
}
.button:hover {
  opacity: 0.8;
}
```

- 믹신:
- SASS: 스타일 정의를 위한 재사용 가능한 코드 블록 (예: @mixin button-style { color: white; background-color: $primary-color; }). 코드 재사용을 촉진하고 중복을 줄입니다.

<div class="content-ad"></div>

```js
@mixin button-style {
  color: white;
  background-color: $primary-color;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

```js
.primary-button {
  @include button-style;
}
.secondary-button {
  @include button-style;
  background-color: $secondary-color;
}
```

```js
* **Native CSS:** 내장 믹스인은 없지만 클래스와 가상 클래스를 사용하여 해결할 수 있습니다.
```

<div class="content-ad"></div>

빌드 프로세스 대 워크플로우

여기에서 차이가 있어요:

- SASS: SASS 코드를 일반 CSS로 컴파일해야만 브라우저가 이해할 수 있는 추가적인 단계가 필요해요. 이 컴파일 과정은 워크플로에 복잡성을 추가해요. sass나 libsass와 같은 SASS 컴파일러가 필요할 거예요.
- Native CSS: 컴파일이 필요 없어요! CSS를 작성하기만 하면 됩니다. 특히 작은 프로젝트에는 더 간단한 워크플로가 제격이에요.

브라우저 호환성

<div class="content-ad"></div>

SASS와 Native CSS 모두 훌륭한 브라우저 지원을 가지고 있지만, 고급 SASS 기능을 사용할 때는 컴파일 단계에서 오래된 브라우저를 위해 벤더 접두사를 추가해야 할 수도 있습니다. 표준인 Native CSS는 일반적으로 더 넓은 호환성을 즐깁니다.

무기 선택하기

그렇다면 언제 어느 쪽을 선택해야 할까요?

- Native CSS: 소규모 프로젝트나 빠른 프로토타입 또는 간편함이 요구될 때 이상적입니다. 스타일링 웹페이지의 기본을 이해하기 위한 초심자에게 좋은 선택지입니다.

<div class="content-ad"></div>

CSS

```js
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
```

```js
.heading {
  font-size: 2em;
  margin-bottom: 10px;
}
.button {
  color: white;
  background-color: blue;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
.button:hover {
  opacity: 0.8;
}
```

- SASS: 대규모 프로젝트, 복잡한 스타일시트 또는 더 나은 구성 및 유지 관리를 원할 때 이상적입니다. 변수, 믹스인, 중첩과 같은 기능이 더 깨끗하고 확장 가능한 코드를 지향합니다.

<div class="content-ad"></div>

# 코드 스니펫

```js
$primary-color: blue;
$secondary-color: #f1f1f1;
```

```js
@mixin button-style {
  color: white;
  background-color: $primary-color;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
.heading {
  font-size: 2em;
  margin-bottom: 10px;
}
.button {
  @include button-style;
}
.secondary-button {
  @include button-style;
  background-color: $secondary-color;
}
.button:hover {
  opacity: 0.8;
}
```

결론

<div class="content-ad"></div>

어떤 것이 "최고"인 선택지는 없어요. SASS와 기본 CSS는 각자의 장점이 있어요.

- 초보자를 위한 팁: 기본 CSS로 시작해서 기초를 익히세요.
- 숙련된 개발자를 위한 팁: 프로젝트가 더 많은 기능과 조직이 필요할 때는 SASS를 고려해보세요.

최종 선택은 프로젝트 요구사항, 팀의 선호도, 그리고 각 방식에 대한 편안함에 달려있어요. 그래서 실험해보고, 탐험해보세요. 여러분이 놀라운 웹 경험을 만들 수 있게 하는 도구를 찾아보세요!

## 추가 팁

<div class="content-ad"></div>

SASS를 처음 시작하시는 분이라면, 온라인 튜토리얼과 자료들이 많이 있어요. SASS 공식 문서나 Codecademy나 Udemy와 같은 플랫폼에서 제공하는 온라인 강좌가 인기가 있어요.
