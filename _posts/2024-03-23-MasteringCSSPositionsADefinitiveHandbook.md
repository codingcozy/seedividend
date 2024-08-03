---
title: "CSS Position 마스터하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Mastering CSS Positions  A Definitive Handbook"
link: "https://medium.com/@paddyuiux/mastering-css-positions-a-comprehensive-guide-41cfda95b7a6"
---



<img src="/assets/img/Mastering-CSS-Positions-:-A-Definitive-Handbook_0.png" />

CSS (Cascading Style Sheets)는 웹 개발에서 강력한 스타일링 및 요소 위치 지정 도구를 제공하는 기본 기술입니다. CSS positions 중요한 역할을 하는 요소의 레이아웃을 제어하는 데 중요한 역할을 합니다. 본문에서는 CSS positions를 탐구하면서 다양한 유형을 알아보고 사용 예를 통해 설명합니다.

# CSS Positions 이해

CSS positions는 요소가 포함 요소 내에 위치하는 방식을 결정합니다. CSS에는 static, relative, absolute, fixed, sticky. 다섯 가지 주요 position 값이 있습니다. 이제 이러한 positions을 자세히 살펴보겠습니다:

<div class="content-ad"></div>

## 1- 정적 위치 지정

- 정적 위치 지정은 CSS에서 요소의 기본 동작입니다.
- 정적 위치 지정된 요소는 문서의 일반적인 흐름에 따라 위치가 지정됩니다.

```js
.static-example {
  position: static;
}
```

## 2- 상대적 위치 지정

<div class="content-ad"></div>

- 상대 위치 지정은 요소를 일반 위치를 기준으로 배치할 수 있게 합니다.
- 요소가 상대적으로 위치지정되면 top, right, bottom 및 left 속성을 사용하여 이동할 수 있습니다.

```css
.relative-example {
  position: relative;
  top: 20px;
  left: 10px;
}
```

## 3- 절대 위치 지정

- 절대 위치 지정은 요소를 일반 문서 흐름에서 제거하고 가장 가까운 상대적으로 위치가 지정된 조상을 기준으로 배치합니다.
- 절대적으로 위치가 지정된 요소는 다른 요소에 영향을 받지 않고 겹칠 수 있습니다.

<div class="content-ad"></div>

```js
.absolute-example {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 4- 고정 위치

- 고정 위치는 요소를 브라우저 창을 기준으로 배치합니다.
- 고정된 요소는 페이지를 스크롤해도 같은 위치에 유지됩니다.

```js
.fixed-example {
  position: fixed;
  top: 0;
  right: 0;
}
```

<div class="content-ad"></div>

## 5- 스티키 포지셔닝

- 스티키 포지셔닝은 상대 포지셔닝과 고정 포지셔닝의 혼합입니다.
- 요소가 지정된 임계값에 도달할 때까지 상대적인 위치를 유지하다가 그 이후에 고정 포지션으로 변합니다.

```js
.sticky-example {
  position: sticky;
  top: 0;
}
```

## 실용적인 예제

<div class="content-ad"></div>

자 CSS 위치 지정을 사용하여 간단한 레이아웃을 만드는 실용적인 예시를 살펴봅시다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Positions Example</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="box"></div>
  </div>
</body>
</html>
```

```js
.container {
  position: relative;
  height: 200px;
  border: 1px solid #000;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: #f00;
}
```

## 결론

<div class="content-ad"></div>

CSS positions을 마스터하는 것은 동적이고 시각적으로 매력적인 웹 레이아웃을 만드는 데 중요합니다. 다양한 position 값과 그 동작을 이해함으로써, 웹 개발자들은 웹페이지의 요소들의 위치를 효과적으로 제어할 수 있습니다. 다양한 position 값과 속성을 실험하면 웹 프로젝트를 위해 다재다능하고 반응형 레이아웃을 만들 수 있게 될 것입니다.
