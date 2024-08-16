---
title: "CSS 완전 정복 가이드 파트 I 기본 CSS, 셀렉터, 특이성"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 14:09
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Comprehensive Guide of CSS: Part I Basic CSS, Selectors, Specificity"
link: "https://medium.com/@fangjy.alice2011/comprehensive-guide-of-css-e9e81b797f3d"
isUpdated: true
---




# 소개

웹 개발 세계에서 Cascading Style Sheets (CSS)는 일반적인 HTML 문서를 아름답게 스타일링된 웹 페이지로 변환하는 마법의 지팡이입니다. 새로운 프로젝트에 도입하는 경험이 풍부한 개발자든 웹 디자인 기초를 탐험 중인 초보자든 CSS를 이해하는 것이 중요합니다.

# CSS란 무엇인가요?

CSS는 Cascading Style Sheets의 약자입니다. 이것은 HTML 문서의 표현(모양과 형식)을 정의하는 데 사용되는 언어입니다. HTML은 콘텐츠의 구조를 제공하고, CSS는 해당 콘텐츠를 스타일링하고 배치할 수 있게 해줍니다.

<div class="content-ad"></div>

# CSS 시작하기

HTML에 CSS 연결하기

CSS를 사용하려면 CSS 파일을 HTML 문서에 연결해야 합니다. 일반적으로 이는 HTML 파일의 `head` 섹션 내부에 있는 `link` 태그를 사용하여 수행됩니다.

```js
<head>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
```

<div class="content-ad"></div>

CSS 구문 이해

```js
h1 {
    color: blue;
    font-size: 24px;
}
```

이 예시에서 h1은 셀렉터입니다. color: blue;와 font-size: 24px;는 프로퍼티 선언입니다. 여기서 우리는 모든 h1 헤더 HTML 구성 요소의 색상과 글꼴 크기를 조정합니다.

# 기본 CSS 셀렉터

<div class="content-ad"></div>

## 유형 선택자

유형 선택자는 HTML 태그 이름을 기반으로 요소를 대상으로합니다. 특정 유형의 모든 요소에 스타일을 적용합니다. 예를 들어:

```js
h1 {
    color: green;
}

p {
    color: green;
}

h1, p {
    color: green;
}
```

H1 선택기는 h1 요소의 스타일을 지정합니다. P 선택기는 p 요소의 스타일을 지정합니다. h1, p는 h1 및 p 요소의 스타일을 지정합니다.

<div class="content-ad"></div>

## 클래스 셀렉터

클래스 셀렉터는 요소를 클래스 속성에 기반하여 대상으로 지정합니다. 클래스는 재사용 가능하며 여러 요소에 적용할 수 있습니다. 클래스 셀렉터는 점(.) 뒤에 클래스 이름이 옵니다. 예를 들어:

```js
.highlight {
    background-color: yellow;
}
```

`div class="highlight"`와 같이 어떤 HTML 요소에 highlight 클래스를 적용하여 노란색 배경을 줄 수 있습니다.

<div class="content-ad"></div>

## 아이디 선택자

아이디 선택자는 해당 요소의 id 속성을 기반으로 선택하는데, HTML 문서 내에서 고유해야 합니다. 아이디 선택자는 해시(#) 뒤에 아이디 이름이 옵니다. 예를 들어:

```js
#amazingtitle {
    font-size: 24px;
}
```

이 선택자는 id가 amazingtitle인 고유한 요소에 24픽셀의 글꼴 크기를 적용합니다.

<div class="content-ad"></div>

## 유니버설 셀렉터

* 은 문서의 모든 요소를 선택하는 유니버설 셀렉터입니다. 남용하면 심각한 성능 문제를 일으킬 수 있으니 주의해서 사용해야 합니다.

```js
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

사이트 전체에 스타일을 적용하려면 상속이 종종 더 나은 메커니즘입니다. 많은 스타일이 자식 요소에게 상속되며, 우리는 이 기능을 활용하여 작성하는 코드 양을 줄일 수 있습니다.

<div class="content-ad"></div>

# 속성 선택자

**존재하는 속성 선택자:** 값에 관계없이 특정 속성을 가진 요소를 대상으로 합니다.

```js
input[username] {
    border: 1px solid #ccc;
}
```

이 선택자는 username 속성을 가진 모든 `input` 요소에 테두리를 적용합니다.

<div class="content-ad"></div>

값 속성 선택자: 특정 속성 값이 있는 요소를 대상으로합니다.

```js
a[href^="https://"] {
    color: blue;
}

[class*="btn"] {
    background-color: #f0f0f0;
}
```

첫 번째 선택기는 https://로 시작하는 href 속성을 가진 모든 `a` (앵커) 요소에 파란색을 적용합니다.

두 번째 선택기는 이름에 btn이 포함된 클래스를 가진 요소에 배경색을 적용합니다(btn-primary, button 등).

<div class="content-ad"></div>

가상 클래스 및 의사 요소: 가상 클래스 및 가상 요소는 요소의 상태나 문서 구조 내의 위치에 따라 대상을 지정합니다.

가상 클래스

```js
a:hover {
    color: red;
}
```

이 선택기는 링크(`a` 요소)가 마우스 오버되었을 때 빨간색으로 적용됩니다.

<div class="content-ad"></div>

의사 요소

```js
p::first-line {
    font-weight: bold;
}
```

이 선택자는 모든 `p` 요소의 첫 줄에 굵은 글꼴 두껍기를 적용합니다.

# 결합자 선택자

<div class="content-ad"></div>

컴비네이터 선택자는 HTML 구조에서 요소들 간의 관계에 따라 특정 요소들을 대상으로 하는 데 여러 선택자를 결합합니다.

하위 선택자(` `): 다른 지정된 요소의 자손인 요소를 대상으로합니다.

```js
ul li {
  color: blue
}
```

이 선택자는 ul 요소의 자손(필수적으로 자식이 아님)인 모든 li 요소의 색상을 파란색으로 설정합니다.

<div class="content-ad"></div>

자식 결합자 (>): 지정된 요소의 직속 자식 요소를 대상으로합니다.

```js
.container > h2 {
  margin-top:20px;
}
```

이 선택자는 container 클래스의 직속 자식인 모든 h2 요소에 상단 여백을 20픽셀 적용합니다.

인접 형제 결합자 (`+`): 다른 지정된 요소 바로 앞에 오는 요소를 대상으로합니다.

<div class="content-ad"></div>

```css
h1 + p {
  font-style: italic;
}
```

이 부분은 h1 요소 바로 다음에 나오는 첫 번째 p 요소를 기울임꼴로 표시합니다.

일반 형제 결합자 (`~`): 다른 지정된 요소의 형제인 요소를 대상으로합니다. 그들의 순서와 관계없이.

```css
h2 ~ p {
  color:
}
```

<div class="content-ad"></div>

이 선택자는 h2 요소 다음에 나오며 h2 요소의 형제인 모든 p 요소의 색상을 설정합니다.

# CSS에서의 특이성

"특이성"은 여러 충돌하는 스타일이 있는 경우 요소에 적용되는 CSS 스타일을 결정하는 규칙을 가리킵니다. 특이성을 이해하는 것은 중요합니다. 왜냐하면 브라우저가 HTML 요소를 렌더링할 때 어떤 스타일을 우선시해야 하는지 결정하기 때문입니다. CSS에서 특이성에 대한 자세한 설명을 확인해보세요:

특이성 수준 이해

<div class="content-ad"></div>

CSS 특수성은 레벨 또는 레이어로 생각할 수 있습니다. 더 높은 특수성 레벨을 갖는 스타일이 더 낮은 레벨의 스타일보다 우선합니다. 가장 낮은 수준부터 가장 높은 수준까지 살펴보겠습니다:

- 타입 선택자와 가상 요소: 예를 들어, div, p, :before, :after.
- 클래스 선택자, 속성 선택자 및 가상 클래스: 중간 수준의 특수성을 갖습니다. 예를 들어, .class, [type="text"], :hover, :first-child.
- ID 선택자: 예를 들어, #id.
- 인라인 스타일: 예를 들어, `div style="display":grid"`.

특수성 계산

특수성은 네 가지 값으로 계산됩니다:

<div class="content-ad"></div>

- N개의 인라인 스타일 선택자: N,0,0,0로 계산됩니다.
- N개의 ID 선택자: 0,N,0,0으로 계산됩니다.
- N개의 클래스 선택자, 속성 선택자 및 가상 클래스: 0,0,N,0으로 계산됩니다.
- N개의 타입 선택자 및 가상 요소: 0,0,0,N으로 계산됩니다.

선택자를 비교할 때 값은 왼쪽에서 오른쪽으로 비교되며, 가장 왼쪽 위치에 높은 값을 갖는 선택자가 승리합니다.

특정성 계산 예시

만약 속성 선언에 클래스 선택자 하나와 속성 선택자 하나가 있다면, 해당 속성의 특정성 점수는 0,0,1,0이 됩니다.

<div class="content-ad"></div>

예시

```js
button[type="submit"] {
    border: 2px solid cyan;
}
```

만약 속성 선언에 ID 선택기가 하나이고 클래스 선택기가 하나이면, 그 명시성 점수는 0,1,1,0입니다.

예시

<div class="content-ad"></div>

```js
#main.main{
  display:grid;
}
```

!중요

속성 뒤에 !important를 추가하면 해당 속성 값이 선택기의 구체성 수준에 관계없이 적용됩니다. 예를 들어,

```js
p{
  color: green !important;
}
```

<div class="content-ad"></div>

아래는 모든 문단 구성 요소에 녹색 색상이 적용됩니다. 우선순위에 관계 없이 !important를 최대한 피해야 합니다. !important를 무시할 수 없기 때문에 가능한 한 사용을 피해야 합니다.

마지막으로, 전체 선택기 *

*은 실제로 우선 순위에 영향을 미치지 않으므로 이를 타입 선택기보다 심지어 낮은 우선 순위로 생각할 수 있습니다. * 선택기 아래에 정의된 스타일은 동일한 속성에 대한 경쟁 정의가 없는 경우에만 적용됩니다.