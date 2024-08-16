---
title: "자바스크립트를 사용하지 않고 html css로 할 수 있는 것들 5가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "5 Things You No Longer Need JavaScript to Do"
link: "https://medium.com/@xiuerold/5-things-you-no-longer-need-javascript-to-do-a4c21e4332ac"
isUpdated: true
---





`<img src="/assets/img/5ThingsYouNoLongerNeedJavaScripttoDo_0.png" />`

때로는 JavaScript(JS)에 지나치게 의존하는 것이 웹 개발에서 HTML과 CSS의 강력한 기능을 가리는 경우가 있습니다. 여기서 JS가 뒷전일 수 있는 다섯 가지 기능을 살펴보겠습니다:

# CSS로 제어되는 SVG 애니메이션 🎆

JS에 의존하는 대신 CSS로 화려한 SVG 애니메이션을 만들 수 있습니다. 예를 들어, 아래 스니펫을 사용하여 폭죽을 시뮬레이션할 수 있습니다:

<div class="content-ad"></div>

```js
.trail {
  stroke-width: 2;
  stroke-dasharray: 1 10 5 10 10 5 30 150;
  animation-name: trail;
  animation-timing-function: ease-out;
}

@keyframes trail {
  from,
  to {
    stroke-width: 3;
    stroke-dashoffset: 80;
  }
  100% {
    stroke-width: 0.5;
    stroke-dashoffset: -150;
  }
}
```

SVG 경로에서 선 그리기 효과를 만들기 위해 stroke-dasharray와 animation이 어떻게 조화롭게 작용하는지 살펴보세요.

# CSS로 반응형 사이드바 만들기 📑

순수 CSS를 사용하여 호버로 트리거되는 사이드바를 만들어보세요.

<div class="content-ad"></div>

```js
nav {
  position: absolute;
  right: 100%;
  transition: 0.2s transform;
}

nav:hover,
nav:focus-within {
  transform: translateX(100%);
}
```

키포인트는 transform 속성으로, 해당 요소를 호버시 요소의 너비만큼 이동시킵니다. :focus-within 가상 클래스는 요소를 탭으로 이동할 때 사이드바 상태를 유지하는 데 도움이 됩니다.

# CSS sticky를 활용하여 위치 지정하기 📍

요소들을 고정하는 데 position: sticky를 활용하세요.

<div class="content-ad"></div>

```js
.square {
  position: sticky;
  top: 2em;
}
```

이 CSS 접근 방식은 JS보다 부드럽습니다. 이는 흔들림을 방지하고 브라우저 렌더링과 일치시킵니다.

# 간단한 아코디언 메뉴 🎶

아코디언 효과를 위해 HTML의 `details` 태그를 활용하세요.

<div class="content-ad"></div>

```html
<details>
  <summary>Title Here</summary>
  <p>Content Line 1</p>
  <p>Content Line 2</p>
</details>
```

기본적으로 `summary` 내용은 항상 표시되며, 나머지 세부 정보를 토글할 수 있게 해줍니다.

# CSS를 사용한 다크 모드 구현 🌗

다크 테마의 광범위한 채택으로, prefers-color-scheme 미디어 피처를 사용하세요:

<div class="content-ad"></div>

```css
@media (prefers-color-scheme: light) {
  /* 밝은 테마 스타일 */
}
@media (prefers-color-scheme: dark) {
  /* 어두운 테마 스타일 */
}
```

이 CSS는 사용자의 시스템 설정을 존중하여 매끄러운 경험을 제공합니다.

# 추가 정보 🔍

이 5가지 예시 이상으로, 전체 기사에서는 scroll snapping 및 네이티브 컬러 피커와 같은 다른 기능을 탐구합니다. 다양한 효과와 상호작용에 JS를 활용하는 것이 유혹적일 수 있지만, HTML의 의미론적 요소와 CSS의 스타일링 기능을 활용하면 더 효율적이고 우아한 코딩 솔루션을 찾을 수 있습니다.

<div class="content-ad"></div>

작업에 적합한 도구를 선택하는 것은 숙련된 웹 개발의 특징입니다. JS에 손을 댈 때 앞서 HTML과 CSS를 고려하는 것을 잊지 마세요.
