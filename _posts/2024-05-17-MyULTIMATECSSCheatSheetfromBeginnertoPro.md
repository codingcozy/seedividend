---
title: "프론트엔드 개발자를 위한 CSS 팁"
description: ""
coverImage: "/assets/img/2024-05-17-MyULTIMATECSSCheatSheetfromBeginnertoPro_0.png"
date: 2024-05-17 21:18
ogImage: 
  url: /assets/img/2024-05-17-MyULTIMATECSSCheatSheetfromBeginnertoPro_0.png
tag: Tech
originalTitle: "My ULTIMATE CSS Cheat Sheet from Beginner to Pro"
link: "https://medium.com/gitconnected/my-ultimate-css-cheat-sheet-from-beginner-to-pro-8db154476747"
isUpdated: true
---




## 개발자가 알아야 할 100가지 CSS 속성

![CSS Cheat Sheet](/assets/img/2024-05-17-MyULTIMATECSSCheatSheetfromBeginnertoPro_0.png)

웹 애플리케이션을 만들고 스타일링하는 것을 좋아하며 CSS가 제가 생각하고 이야기하는 가장 좋아하는 것입니다.

4년의 경험을 통해 많은 것을 배웠고, 이 기사에서 그 지식을 여러분과 공유하고 싶습니다.

<div class="content-ad"></div>

오늘은 모든 사람을 위한 궁극적인 CSS 치트 시트를 제공하기 위해 모든 것을 다 할 거에요 - 절대 초보자부터 궁극의 전문가까지.

마지막으로, 아무도 모르는 최고의 CSS 한 줄 코드 몇 가지를 보여드릴 테니, 이를 통해 많은 작업을 절약할 수 있을 거에요.

편안히 앉아서 즐기고 나중을 위해 저장하세요!

# 초보자 레벨

<div class="content-ad"></div>

셀렉터: `element`
지정된 타입의 모든 요소를 선택합니다.

셀렉터: `#id`
지정된 id를 가진 요소를 선택합니다.

셀렉터: `.class`
지정된 클래스를 가진 모든 요소를 선택합니다.

속성: color
텍스트의 색상을 설정합니다.
예시:

<div class="content-ad"></div>

```css
p {
 color: blue;
 }
```

속성: font-size
글꼴 크기를 설정합니다.
예시:

```css
h1 {
 font-size: 24px;
 }
```

속성: background-color
배경 색상을 설정합니다.
예시:

<div class="content-ad"></div>


```css
body {
 background-color: #f0f0f0;
 }
```


Property: margin
Sets the margin properties.
Example:

```css
.container {
 margin: 10px;
 }
```

Property: padding


<div class="content-ad"></div>

패딩 속성을 설정합니다.
예시:

```js
.box {
  padding: 20px;
}
```

속성: display
요소의 표시 방법을 설정합니다.
예시:

```js
.block {
  display: block;
}
```

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

Property: position
Sets the positioning method.
Example:

```js
.absolute {
 position: absolute;
 top: 0;
 left: 0;
 }
```

Property: width
Sets the width of an element.
Example:

```js
img {
 width: 100px;
 }
```

<div class="content-ad"></div>

프로퍼티: 높이
요소의 높이를 설정합니다.
예시:

```js
.header {
 height: 80px;
 }
```

# 중급 레벨

프로퍼티: 글꼴 패밀리
글꼴 패밀리를 설정합니다.
예시:

<div class="content-ad"></div>

```json
body {
 font-family: Arial, sans-serif;
 }
```

속성: font-weight
글꼴의 굵기를 설정합니다.
예시:

```json
.bold-text {
 font-weight: bold;
 }
```

속성: text-transform
텍스트 대문자화를 제어합니다.
예시:


<div class="content-ad"></div>

```js
button {
  cursor: pointer;
}
```

속성: 배경 이미지
요소에 하나 이상의 배경 이미지를 설정합니다.
예시:

```js
.hero-section {
  background-image: url('hero.jpg');
}
```

속성: 배경 위치
배경 이미지의 시작 위치를 설정합니다.
예시:

<div class="content-ad"></div>

```js
.header {
 background-position: center;
 }
```

속성: background-repeat
배경 이미지가 반복되는 방식을 설정합니다.
예시:

```js
.pattern {
 background-repeat: repeat-x;
 }
```

속성: background-size
배경 이미지의 크기를 설정합니다.
예시:

<div class="content-ad"></div>

```css
.cover-image {
 background-size: cover;
 }
```

속성: 투명도
투명도 수준을 설정합니다.
예시:

```css
.overlay {
 opacity: 0.5;
 }
```

# 고급 레벨


<div class="content-ad"></div>

속성: flex
유연한 요소의 유연한 길이를 설정합니다.
예시:

```js
.container {
 display: flex;
 }
```

속성: flex-direction
유연한 컨테이너의 주 축 방향을 지정합니다.
예시:

```js
.container {
 flex-direction: row;
 }
```

<div class="content-ad"></div>

Property: flex-wrap
플렉스 항목이 줄 바꿈해야 하는지를 지정합니다.
예시:

```js
.container {
 flex-wrap: wrap;
 }
```

Property: flex-grow
플렉스 항목이 서로에 비해 어떻게 성장하는지를 지정합니다.
예시:

```js
.item {
 flex-grow: 1;
 }
```

<div class="content-ad"></div>

속성: flex-shrink
서로에 비해 얼마나 flex 항목이 줄어드는지를 지정합니다.
예시:

```js
.item {
  flex-shrink: 0;
}
```

속성: flex-basis
flex 항목의 초기 길이를 지정합니다.
예시:

```js
.item {
  flex-basis: 100px;
}
```

<div class="content-ad"></div>

프로퍼티: align-items
플렉스 컨테이너의 교차 축을 따라 플렉스 아이템을 정렬합니다.
예시:

```js
.container {
 align-items: center;
 }
```

프로퍼티: align-self
개별 플렉스 아이템의 기본 정렬을 재정의할 수 있습니다.
예시:

```js
.item {
 align-self: flex-end;
 }
```

<div class="content-ad"></div>

프로퍼티: justify-content
플렉스 컨테이너의 주축을 따라 플렉스 아이템을 정렬합니다.
예시:

```js
.container {
 justify-content: space-between;
 }
```

프로퍼티: grid-template-columns
그리드 레이아웃에서 열의 크기를 지정합니다.
예시:

```js
.container {
 display: grid;
 grid-template-columns: 1fr 2fr;
 }
```

<div class="content-ad"></div>

속성: grid-template-rows
그리드 레이아웃에서 행의 크기를 지정합니다.
예시:

```js
.container {
 display: grid;
 grid-template-rows: 100px auto;
 }
```

속성: grid-gap
그리드 레이아웃에서 열과 행 사이의 간격을 설정합니다.
예시:

```js
.container {
 display: grid;
 grid-gap: 10px;
 }
```

<div class="content-ad"></div>

속성: grid-auto-columns
암시적 그리드 열의 크기를 지정합니다.
예시:

```js
.container {
 display: grid;
 grid-auto-columns: 100px;
}
```

속성: grid-auto-rows
암시적 그리드 행의 크기를 지정합니다.
예시:

```js
.container {
 display: grid;
 grid-auto-rows: 100px;
}
```

<div class="content-ad"></div>

Property: grid-auto-flow
그리드 레이아웃에서 자동 배치 알고리즘이 작동하는 방식을 지정합니다.
예시:

```js
.container {
 display: grid;
 grid-auto-flow: dense;
 }
```

Property: grid-column
그리드 열 내에서 그리드 항목의 크기와 위치를 지정합니다.
예시:

```js
.item {
 grid-column: 2 / span 2;
 }
```

<div class="content-ad"></div>

Property: grid-row
그리드 항목의 크기 및 그리드 행 내 위치를 지정합니다.
예시:

```js
.item {
 grid-row: 1 / span 2;
 }
```

Property: grid-area
요소의 크기 및 그리드 레이아웃 내 위치를 설정합니다.
예시:

```js
.item {
 grid-area: 1 / 1 / span 2 / span 2;
 }
```

<div class="content-ad"></div>

이 상세한 CSS 치트 시트는 초보부터 고급 수준까지 다양한 속성 및 선택자를 다루며, 사용 예시를 통해 설명합니다. 특정 속성에 대한 질문이 있거나 추가 설명이 필요하다면 댓글로 자유롭게 질문해 주세요!

이 기사가 도움이 되었기를 바랍니다. 여러분의 문제를 해결하는 데 도움이 되었기를 희망합니다! (새로운 문제가 발생하지 않길 바랍니다 ;-))

즐거운 코딩하세요!