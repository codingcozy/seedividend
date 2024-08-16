---
title: "덜 알려진 10가지 CSS 속성"
description: ""
coverImage: "/assets/img/2024-07-09-10lesserknownCSSproperties_0.png"
date: 2024-07-09 17:57
ogImage: 
  url: /assets/img/2024-07-09-10lesserknownCSSproperties_0.png
tag: Tech
originalTitle: "10 lesser known CSS properties"
link: "https://medium.com/@creativebyte/10-lesser-known-css-properties-09e3be0c77ab"
isUpdated: true
---



![CSS properties](/assets/img/2024-07-09-10lesserknownCSSproperties_0.png)

이것은 제가 이전에 들어보지 못했거나 사용해보지 않은 CSS 속성을 모은 것입니다. 여러분에게도 새로운 정보가 되었으면 좋겠어요!

## 01. background-attachment

background-attachment 속성은 배경 이미지가 페이지의 나머지 부분과 함께 스크롤되는지 또는 고정되는지를 설정합니다.

<div class="content-ad"></div>

```css
div {
  background-attachment: scroll|fixed|local|initial|inherit;
}
```

## 02. will-change

브라우저에게 요소가 어떻게 변할 것으로 예상되는지 알려줍니다.

```css
div {
  will-change: transform;
}
```

<div class="content-ad"></div>

## 03. unicode-bidi

문서 내의 양방향 텍스트가 어떻게 처리되는지 결정하는 방향 속성과 함께 사용됩니다.

```js
div{
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

## 04. all

<div class="content-ad"></div>

이 속성은 모든 속성을 해당 초기값으로 재설정하는 데 자주 사용됩니다.

```js
div{
  background-color: yellow;
  all: initial;
}
```

## 05. currentcolor

currentcolor 키워드는 요소의 color 속성값을 의미합니다.

<div class="content-ad"></div>

#myDiv{
color: green; /_ 그린 텍스트 색상 _/
border: 10px solid currentcolor; /_ 그린 테두리 색상_/
}

## 06. 하이픈

여러 줄에 걸쳐 텍스트가 줄 바꿈 될 때 단어들을 하이픈(-)으로 어떻게 나눌지 결정하여 몇 가지 상황에서 가독성을 향상시킬 수 있습니다.

```js
.div{
  hyphens: auto|manual|none;
}
```

<div class="content-ad"></div>

## 07. scroll-snap-type & scroll-snap-align

scroll-snap-type 속성은 스크롤 끝에서 요소가 어떻게 포커스로 이동하는지와 포커스로 이동하는 방향을 나타냅니다.

이 기능을 사용하려면 부모 요소에 scroll-snap-type 속성이 있어야 하고, 자식 요소에는 scroll-snap-align 속성이 있어야 합니다.

```js
#parentElement{
  scroll-snap-type: none|x|y|block|inline|both|mandatory|proximity|initial|inherit;
}

#childElement{
  scroll-snap-align: none|start|end|center|block inline|initial|inherit;
}
```

<div class="content-ad"></div>

## 08. backdrop-filter

요소 뒤에 있는 영역에 필터 효과를 적용하여 유리에 이슬이 맺힌 것처럼 다른 배경 흐림 효과를 만들 때 유용합니다.

```js
.backdrop{
      backdrop-filter: blur(5px);
    }
```

## 09. overscroll-behavior

<div class="content-ad"></div>

스크롤 가능한 영역의 경계에 도달했을 때 브라우저의 동작을 정의하며 스크롤이 계속되는지 여부를 제어합니다.

```js
.scrollable {
  width: 200px;
  height: 100px;
  overflow: auto;
  overscroll-behavior: contain;
}
```

## 10. shape-outside

텍스트를 감싸는 모양을 지정하여 이미지나 다른 요소 주변에 더 창의적인 텍스트 흐름을 제공합니다.

<div class="content-ad"></div>

.shaped {
shape-outside: circle(50%);
}
