---
title: "CSS Pseudo-클래스 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering CSS Pseudo-classes  A Comprehensive Guide - Part 1"
link: "https://medium.com/@paddyuiux/mastering-css-pseudo-classes-a-comprehensive-guide-part-1-2192d44fafaa"
---



<img src="/assets/img/MasteringCSSPseudo-classesAComprehensiveGuide-Part1_0.png" />

웹 디자인의 중추인 Cascading Style Sheets (CSS)는 개발자들에게 웹 페이지의 외관과 레이아웃을 제어할 수 있는 능력을 제공합니다. CSS가 제공하는 많은 기능 중에서도, 가상 클래스(pseudo-classes)는 다양한 조건과 상태에 따라 요소를 대상으로 스타일을 적용할 수 있는 강력한 도구로 두드러지게 나타납니다.

이 부분에서는 몇 가지 CSS 가상 클래스에 대해 심층적으로 다루고, 그 구문과 응용 분야를 탐구하며 사용법을 마스터할 수 있도록 실제 예시를 제공하겠습니다.

# CSS 가상 클래스의 이해:

<div class="content-ad"></div>

CSS 가상 클래스는 요소의 특별한 상태를 지정하는 키워드입니다. 일반 클래스와 달리 HTML 요소에 직접 할당되는 것이 아니라 사용자 상호작용, 요소 계층 구조 또는 요소 상태와 같은 다양한 조건에 따라 적용됩니다.

![Mastering CSS Pseudo-classes](/assets/img/MasteringCSSPseudo-classesAComprehensiveGuide-Part1_1.png)

## 사용되는 CSS 가상 클래스:

- :hover
- :active
- :link
- :visited
- :focus
- :read-only
- :read-write
- :in-range
- :out-of-range
- :target

<div class="content-ad"></div>

## 1. :hover

:hover 가상 클래스는 CSS에서 사용자가 포인터 장치(마우스 등)로 요소 위에 올라갈 때 스타일을 적용하는 데 사용됩니다.

일반적으로 이를 사용하여 인터랙티브 효과를 만들고 사용자에게 시각적 피드백을 제공합니다.

이를 통해 개발자들은 사용자 상호 작용에 대응하여 요소의 모양을 변경함으로써 인터랙티브하고 매력적인 사용자 인터페이스를 만들 수 있습니다.

<div class="content-ad"></div>

---

간단한 HTML 버튼 요소를 고려해보세요:

```js
<button>위에 마우스를 올려주세요</button>
```

이제 사용자가 버튼 위에 마우스를 올렸을 때 버튼에 스타일을 적용하려면 :hover를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
/* 버튼을 마우스 오버했을 때 버튼의 스타일을 지정합니다 */
button:hover {
  background-color: #007bff; /* 배경색을 파란색으로 변경합니다 */
  color: #ffffff; /* 텍스트 색상을 흰색으로 변경합니다 */
}
```

이 예제에서는 사용자가 버튼 요소 위에 마우스를 올렸을 때 배경색이 파란색으로 변경되고 텍스트 색상이 흰색으로 변경됩니다.

— — —

:hover 가상 클래스는 버튼뿐만 아니라 링크 (`a`), 이미지, div와 같은 다양한 HTML 요소에 적용하여 호버 효과를 만들고 사용자 경험을 향상시킬 수 있습니다.

<div class="content-ad"></div>

```js
/* :hover 사용 예시 */

/* 마우스를 올릴 때 링크 스타일 변경 */
a:hover {
  text-decoration: underline; /* 링크 텍스트에 밑줄 표시 */
}

/* 마우스를 올릴 때 이미지 스타일 변경 */
img:hover {
  opacity: 0.8; /* 불투명도를 80%로 낮춤 */
}

/* 마우스를 올릴 때 디브 스타일 변경 */
div:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
}
```

이 예시에서는 링크가 밑줄 처리되고, 이미지가 약간 투명해지며, 디브에 그림자 효과가 추가됩니다.

:hover를 사용하여 사용자의 관심을 끌고 웹사이트 상호작용을 개선하는 시각적 매력적인 호버 효과를 만들 수 있습니다.

## 2. :active

<div class="content-ad"></div>

CSS에서 :active 가상 클래스는 사용자에 의해 활성화될 때 요소에 스타일을 적용하는 데 사용됩니다. 이는 일반적으로 사용자가 요소를 클릭할 때(버튼 또는 링크와 같은) 발생합니다.

:active 가상 클래스는 상호 작용 중에 사용자에게 즉각적인 시각적 피드백을 제공하는 데 유용합니다.

이는 요소가 클릭되거나 활성화될 때 스타일을 적용합니다.

<div class="content-ad"></div>

간단한 HTML 버튼 엘리먼트를 생각해보세요:

```js
<button>클릭하세요</button>
```

이제 해당 버튼이 클릭될 때 스타일을 지정하려면 :active를 사용할 수 있습니다:

```js
/* 버튼이 클릭될 때 스타일 지정 */
button:active {
  background-color: #ff0000; /* 배경 색을 빨간색으로 변경 */
  color: #ffffff; /* 텍스트 색상을 흰색으로 변경 */
}
```

<div class="content-ad"></div>

이 예제에서 사용자가 버튼 요소를 클릭하면 해당 배경색이 빨간색으로 바뀌고 텍스트 색상이 흰색으로 변경됩니다.

:active 가상 클래스는 일반적으로 버튼 및 링크와 같은 클릭 가능한 요소에 대한 시각적 피드백을 생성하여 사용자가 해당 요소와 상호 작용했음을 인식할 수 있도록합니다.

## 3. :link

CSS의 :link 가상 클래스는 사용자가 아직 방문하지 않은 링크를 스타일링하는데 사용됩니다.

<div class="content-ad"></div>

이 유사 클래스는 링크가 상호작용되기 전에 초기 스타일을 설정하는 데 종종 사용됩니다.

이 클래스는 아직 방문하지 않은 href 속성을 가진 앵커(`a`) 요소에 스타일을 적용합니다.

---

앵커(`a`) 요소가 있는 간단한 HTML 구조를 고려해 보세요.

<div class="content-ad"></div>

```js
[https://example.com](Visit Example)
```

이제 방문 전에이 링크를 특별히 스타일링하려면 :link:를 사용할 수 있습니다.

```js
/* 방문하지 않은 링크를 스타일 지정 */
a:link {
  color: blue;
  text-decoration: none;
}
```

이 예시에서는 많은 브라우저에서 방문하지 않은 링크의 기본 스타일인 파란색과 밑줄이 없는 상태로 표시됩니다.

<div class="content-ad"></div>

:link 가상 클래스는 방문하지 않은 링크에만 적용된다는 점을 기억하는 것이 중요합니다.

한 번 링크를 방문하면 :link 가상 클래스와 일치하지 않게되며, :visited 가상 클래스나 다른 CSS 규칙에 따라 스타일이 변경될 수 있습니다.

## 4. :visited

CSS의 :visited 가상 클래스는 사용자가 방문한 링크의 스타일을 지정하는 데 사용됩니다.

<div class="content-ad"></div>

이 의사 클래스는 사용자가 이미 방문한 링크와 아직 방문하지 않은 링크를 구별할 수 있게 해줍니다.

이미 방문한 href 속성을 가진 앵커(`a`) 요소에 스타일을 적용합니다.

— — —

앵커(`a`) 요소를 포함한 이전과 동일한 HTML 구조를 고려해보세요:

<div class="content-ad"></div>

```js
<a href="https://example.com">Visit Example</a>
```

이제, 사용자가 이미 방문한 후에이 링크를 특별히 스타일링하려면 :visited를 사용할 수 있습니다:

```js
/* 사용자가 이미 방문한 링크를 스타일 지정 */
a:visited {
  color: purple;
}
```

이 예에서 사용자가 이미 방문한 후에 링크가 보라색으로 표시됩니다.

<div class="content-ad"></div>

중요한 점은 :visited 가상 클래스가 방문한 링크에만 적용된다는 것입니다.

한 번 링크를 방문하면 :visited 가상 클래스와 일치하며, 방문한 링크에 지정된 규칙이 반영됩니다.

## 5. :focus

CSS의 :focus 가상 클래스는 요소가 포커스를 받을 때 스타일을 적용하는 데 사용됩니다.

<div class="content-ad"></div>

사용자가 입력 필드, 텍스트 영역 또는 링크와 상호 작용할 때 자주 발생합니다. 사용자가 클릭하거나 키보드를 사용하여 해당 요소로 이동하는 경우 발생합니다.

양식 요소나 링크와 상호 작용할 때 사용자에게 시각적 피드백을 제공하는 데 자주 사용됩니다.

---

간단한 HTML 입력 필드를 갖는 양식을 고려해보세요:

<div class="content-ad"></div>

```js
<form>
  <label for="username">사용자 이름:</label>
  <input type="text" id="username" name="username">
</form>
```

이제, 입력란이 포커스를 받았을 때 스타일을 지정하고 싶다면, :focus를 사용할 수 있어요:

```js
/* 입력란이 포커스를 받았을 때 스타일을 지정합니다 */
input:focus {
  border-color: #007bff; /* 테두리 색을 파란색으로 변경 */
  box-shadow: 0 0 5px #007bff; /* 파란색 그림자 추가 */
}
```

이 예시에서, "username"이라는 id를 가진 입력란이 포커스를 받으면 테두리 색이 파란색으로 바뀌고 파란색 그림자가 생기게 될 거에요.```

<div class="content-ad"></div>

:focus 가상 클래스는 폼 요소에만 적용되는 것이 아니라, 링크 (`a` 요소)에 포커스를 받았을 때 스타일을 적용하는 데 사용할 수 있습니다.

이 기능은 웹 사이트의 접근성 및 키보드 탐색을 개선하는 데 특히 유용합니다.

## 6. :read-only

CSS의 :read-only 가상 클래스는 읽기 전용 상태에 있는 폼 요소에 스타일을 적용하는 데 사용됩니다.

<div class="content-ad"></div>

이 의사 클래스는 사용자가 편집할 수 있는 입력 요소와 읽기 전용인 요소들을 시각적으로 구별할 수 있도록 도와줍니다.

readonly 속성이 설정된 입력 요소, 텍스트영역 및 기타 폼 컨트롤에 스타일을 적용합니다.

— — —

읽기 전용으로 설정된 입력 필드가 포함된 간단한 HTML 폼을 고려해보십시오:

<div class="content-ad"></div>

```js
<input type="text" value="읽기 전용 입력" readonly>
```

이제 입력 필드가 읽기 전용 상태일 때 스타일을 지정하고 싶다면 :read-only를 사용할 수 있습니다:

```js
/* 입력 필드가 읽기 전용 상태일 때 스타일 지정 */
input:read-only {
  background-color: #f2f2f2; /* 배경색을 연한 회색으로 변경 */
  color: #999999; /* 텍스트 색상을 회색으로 변경 */
}
```

이 예시에서는 입력 필드가 읽기 전용 상태일 때 연한 회색 배경 색상과 회색 텍스트 색상을 가지게 됩니다.

<div class="content-ad"></div>

:read-only 가상 클래스는 텍스트 영역, 체크박스 및 라디오 버튼과 같은 다른 폼 요소도 읽기 전용으로 설정될 때 스타일을 적용하는 데 사용할 수 있습니다.

## 7. :read-write

CSS의 :read-write 가상 클래스는 사용자가 편집 가능한 폼 요소에 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 사용자가 편집할 수 있는 입력 요소와 읽기 전용인 요소 간의 시각적 차이를 만들어낼 수 있습니다.

<div class="content-ad"></div>

입력 요소, 텍스트 영역 및 읽기 전용 상태가 아닌 다른 양식 컨트롤에 스타일을 적용합니다.

— — —

입력 필드가 있는 간단한 HTML 양식을 고려해 보세요:

```js
<input type="text" value="편집 가능한 입력란">
```

<div class="content-ad"></div>

이제 사용자가 편집 가능한 입력 필드를 스타일링하려면 :read-write를 사용할 수 있어요.

```js
/* 사용자가 수정 가능한 상태일 때 입력 필드를 스타일링합니다 */
input:read-write {
  border: 2px solid #007bff; /* 파란 테두리 추가 */
  padding: 5px; /* 안쪽 여백 추가 */
}
```

이 예시에서는 사용자가 편집 가능할 때 입력 필드가 파란 테두리와 안쪽 여백을 갖게 됩니다.

:read-write 가상 클래스는 다른 폼 요소도 스타일링할 때 사용할 수 있어요. 예를 들어 텍스트영역, 체크박스, 라디오 버튼 등이 편집 가능할 때도 스타일을 적용할 수 있습니다.

<div class="content-ad"></div>

## 8. :in-range

CSS의 :in-range 가상 클래스는 특정 범위 내에 값을 갖는 입력 필드 또는 레인지 슬라이더와 같은 폼 요소에 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 현재 값이 정의된 범위 내에 있는 요소에 스타일을 적용할 수 있습니다.

입력 요소(예: 텍스트 필드 또는 레인지 슬라이더)의 값이 해당 min 및 max 속성에 의해 정의된 허용 범위 내에 있을 때 스타일이 적용됩니다.

<div class="content-ad"></div>

---

수용 가능한 값 범위를 갖는 간단한 HTML 입력 필드를 살펴보세요:

```js
<input type="number" min="0" max="100" value="50">
```

이제, 값이 0에서 100 범위 내에 있는 경우 입력 필드에 스타일을 적용하려면 `:in-range`을 사용할 수 있습니다.

<div class="content-ad"></div>

```js
/* 특정 범위 내의 값일 때 input 필드를 스타일링합니다 */
input:in-range {
  background-color: #cfe2f3; /* 배경색을 연한 파랑색으로 변경합니다 */
  color: #000000; /* 텍스트 색상을 검정색으로 변경합니다 */
}
```

이 예시에서는 입력 필드의 값이 0에서 100 사이일 때, 배경색이 연한 파랑색이고 텍스트가 검정색으로 보입니다.

— — —

:in-range 가상 클래스는 범위 내의 값인 경우 다른 폼 요소를 스타일링하는 데에도 사용될 수 있습니다. range 슬라이더와 같은 다른 폼 요소도 해당 범위 내의 값을 가질 때 이 가상 클래스로 스타일을 지정할 수 있습니다.```

<div class="content-ad"></div>

```js
<input type="range" min="0" max="100" value="50">
```

```js
/* 정해진 범위 내의 값일 때 range 슬라이더 스타일을 지정합니다 */
input[type="range"]:in-range {
  background-color: #cfe2f3; /* 배경색을 연한 파란색으로 변경합니다 */
}
```

이 예시에서는 값이 0에서 100 사이에 있는 경우 range 슬라이더의 배경이 연한 파란색으로 표시됩니다.

`:in-range`를 사용하여 사용자에게 입력값이 허용 범위 내에 있는지 시각적으로 나타내어 사용성 및 사용자 경험을 향상시킬 수 있습니다.

<div class="content-ad"></div>

## 9. :out-of-range

CSS에서 사용되는 :out-of-range 가상 클래스는 값이 지정된 범위를 벗어나는 형식 요소(예: 입력 필드 또는 범위 슬라이더)에 스타일을 적용하는 데 사용됩니다.

이 가상 클래스를 사용하면 현재 값이 정의된 범위를 벗어난 요소에 스타일을 적용할 수 있습니다.

이는 입력 필드(텍스트 필드 또는 범위 슬라이더)의 값이 min 및 max 속성에 의해 정의된 허용 범위를 벗어난 경우 해당 요소에 스타일을 적용합니다.

<div class="content-ad"></div>

---

허용되는 값 범위가 있는 간단한 HTML 입력 필드를 고려해보세요:

```js
<input type="number" min="0" max="100" value="150">
```

이제 값이 0부터 100까지의 범위를 벗어나면 입력 필드에 스타일을 적용하려면 `:out-of-range`를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
/* 특정 범위를 벗어나는 경우 input 필드의 스타일을 지정합니다 */
input:out-of-range {
  border: 2px solid #ff0000; /* 빨간 테두리 추가 */
}
```

이 예제에서 입력 필드의 값이 0부터 100 사이의 범위를 벗어나면 빨간 테두리가 생깁니다.

— — —

:out-of-range 가상 클래스는 값이 지정된 범위를 벗어나는 경우 range 슬라이더와 같은 다른 폼 요소에도 스타일을 적용하는 데 사용할 수 있습니다.

<div class="content-ad"></div>

```js
<input type="range" min="0" max="100" value="150">
```

```js
/* 지정된 범위를 벗어난 경우 range 슬라이더의 스타일 설정 */
input[type="range"]:out-of-range {
  background-color: #ffd6d6; /* 배경색을 연한 빨간색으로 변경 */
}
```

이 예제에서는 범위가 0부터 100까지인 경우 range 슬라이더의 배경이 연한 빨간색이 됩니다.

:out-of-range를 사용하여 사용자가 허용 범위를 벗어나는 입력임을 시각적으로 나타내어 사용성과 전반적인 사용자 경험을 향상시킬 수 있습니다.

<div class="content-ad"></div>

## 10. :target

CSS의 :target 가상 클래스는 URL의 단편 식별자의 대상인 요소를 스타일링하는 데 사용됩니다.

이 가상 클래스는 주로 앵커 링크(`a` 태그)와 함께 사용되어 웹 페이지 내에서 스크롤-맨 위로 또는 스크롤-앵커 기능을 만드는 데 사용됩니다.

URL에 단편 식별자(예: #section1)가 추가되고 해당 URL의 id 속성과 일치하는 요소가 페이지에 있다면 해당 요소가 대상이 되며, :target 가상 클래스를 사용하여 해당 요소를 스타일링할 수 있습니다.

<div class="content-ad"></div>

---

앵커 링크와 해당 섹션을 갖는 간단한 HTML 구조를 고려해 보세요:

```js
<nav>
  <ul>
    <li><a href="#section1">섹션 1</a></li>
    <li><a href="#section2">섹션 2</a></li>
    <li><a href="#section3">섹션 3</a></li>
  </ul>
</nav>

<section id="section1">
  <h2>섹션 1</h2>
  <p>이것은 섹션 1의 내용입니다.</p>
</section>

<section id="section2">
  <h2>섹션 2</h2>
  <p>이것은 섹션 2의 내용입니다.</p>
</section>

<section id="section3">
  <h2>섹션 3</h2>
  <p>이것은 섹션 3의 내용입니다.</p>
</section>
```

이제 앵커 링크를 클릭했을 때 대상 섹션을 스타일링하려면 :target을 사용할 수 있습니다.

<div class="content-ad"></div>

```js
/* 대상 섹션을 스타일링합니다 */
section:target {
  background-color: #f0f0f0; /* 배경색을 연한 회색으로 변경합니다 */
}
```

이 예시에서는 사용자가 앵커 링크(예: "Section 1")를 클릭할 때 해당 섹션(`section id="section1"`)이 대상이 되며, 연한 회색 배경색이 적용됩니다.

:target 가상 클래스는 부드러운 스크롤 효과가 있는 단일 페이지 웹사이트를 만들거나 앵커 링크를 통해 웹페이지의 섹션을 강조하는 데 특히 유용합니다.

# 결론:

<div class="content-ad"></div>

CSS 가상 클래스는 개발자가 동적이고 인터랙티브한 웹 경험을 만들 수 있는 강력한 도구입니다. 그들의 구문과 적용을 이해하면 웹 프로젝트의 시각적 매력과 사용성을 향상시킬 수 있습니다.

이러한 가상 클래스를 실험해보고 CSS 아카이브에 편입하여 웹 디자인 기술을 한 단계 업그레이드하세요. 연습과 창의력을 발휘하면 가능성이 무한해집니다.
