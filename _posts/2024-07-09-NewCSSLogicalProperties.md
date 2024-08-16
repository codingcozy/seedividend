---
title: "새로운 CSS 논리 속성들"
description: ""
coverImage: "/assets/img/2024-07-09-NewCSSLogicalProperties_0.png"
date: 2024-07-09 17:49
ogImage: 
  url: /assets/img/2024-07-09-NewCSSLogicalProperties_0.png
tag: Tech
originalTitle: "New CSS Logical Properties!"
link: "https://medium.com/@elad/new-css-logical-properties-bc6945311ce7"
isUpdated: true
---



## CSS 진화의 다음 단계

# 소개

대부분의 개발자들은 옛날에는 좌우, 상하의 개념으로 생각했습니다. 이는 인터넷 초기에는 주로 문서를 업로드하기 위해 사용되었기 때문이며, 오늘날 우리가 알고 있는 복잡한 웹 사이트 구조를 위한 것이 아니었습니다.
이것이 왜 다국어 웹사이트의 필요성을 고려한 적이 없는지에 대한 이유입니다.

<img src="/assets/img/2024-07-09-NewCSSLogicalProperties_0.png" />

<div class="content-ad"></div>

최근까지는 RTL/LTR 웹사이트와 같은 다방향 웹사이트를 지원하는 가장 좋은 방법은 SASS와 SASS 변수를 사용하는 것이었습니다.
(더 알고 싶다면, “SASS로 RTL 웹사이트 만드는 최상의 방법!”이라는 제 논문을 읽어보세요).

이러한 새로운 논리적 속성들은 우리에게 더 많은 힘을 줘서 웹사이트를 제어하는 데 큰 도움을 줍니다. 우리가 사용하는 언어(영어, 아랍어, 일본어 등)에 관계없이 최소한의 스타일 변경으로도 가능합니다.

이제 시작해봅시다!

# CSS 논리적 속성으로 생각하기

<div class="content-ad"></div>

박스 모델을 토론할 때, 이러한 이미지를 사용하여 설명하는 것이 익숙해졌었죠:

![Box-model](/assets/img/2024-07-09-NewCSSLogicalProperties_1.png)

그것이 그 때는 맞았고 지금도 그렇지만, 여기에는 margin-left, padding-right, border-top과 같은 전통적인 물리적 속성이 마지막 날일 수도 있습니다.

새로운 논리적 속성을 사용하기 시작하기 전에, 왼쪽/오른쪽 또는 위/아래와 같은 용어로 생각하는 것을 그만두고, 대신 inline-start/inline-end 및 block-start/block-end로 바꿔야 합니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-09-NewCSSLogicalProperties_2.png" />

## 인라인 축

예를 들어 영어 언어를 살펴보겠습니다. 읽기 방향은 왼쪽에서 시작하여 오른쪽 끝에 도달합니다. 이것이 속성의 인라인 측면입니다. display: inline로 정렬된 일련의 요소를 고려할 때 매우 쉽게 기억할 수 있습니다. 각 항목은 동일한 줄에 나타납니다.

예를 들어, padding-inline-start는 현재 언어가 시작하는 쪽의 패딩이 될 것입니다.
영어에서 padding-inline-start = padding-left
아랍어에서 padding-inline-start = padding-right
일본어에서 padding-inline-start = padding-top

<div class="content-ad"></div>

## 블록 축

위와 아래와 관련된 속성을 대체하면, 위는 웹사이트의 시작이고 아래는 끝입니다. 쉽게 기억하기 매우 쉬울 것입니다. 한 줄에 쌓인 여러 `display: block;` 요소를 상상해보세요.

그래도 자신에게 물을지도 모르지만, 이 상황에서 항상 그런 것이 아니라고 생각해볼 수 있습니다!

답은 조금 더 복잡합니다. 현재, 모든 다른 언어로 된 웹사이트에서는 다른 방법이 없었기 때문에 이런 방식으로 작동합니다.

<div class="content-ad"></div>

일본어 및 일부 동양 언어로 작성된 웹사이트는 위에서 아래로가 아니라 오른쪽에서 왼쪽으로 시작합니다! 이를 이해하려면 화면을 오른쪽으로 90도 회전시키는 것을 상상해보세요. 웹사이트의 스크롤이 더 이상 수직이 아니라 수평이 됩니다!

예시(블록 케이스):
영어와 아랍어에서 padding-block-start = padding-top
일본어에서 padding-block-start = padding-right

![이미지](/assets/img/2024-07-09-NewCSSLogicalProperties_3.png)

# 새로운 상자 모델 속성

<div class="content-ad"></div>

(여백, 안팎, 테두리)
인라인과 블록 축을 이해한 후 필요에 따라 사용해보세요.

영어 예시:
여백
margin-block-start = margin-top
margin-block-end = margin-bottom
margin-inline-start = margin-left
margin-inline-end = margin-right

안팎
padding-block-start = padding-top
padding-block-end = padding-bottom
padding-inline-start = padding-left
padding-inline-end = padding-right

테두리
border-block-start = border-top
border-block-end = border-bottom
border-inline-start = border-left
border-inline-end = border-right

<div class="content-ad"></div>

# 논리적 차원

너비와 높이는 inline-size와 block-size로 대체되었습니다.

높이와 너비 속성도 이 새로운 방법론에 맞게 조정되어야 합니다. inline/block 방법론을 이해하면 차원을 더 쉽게 이해할 수 있습니다. 영어로는 너비 속성이 inline-size로, 높이 속성이 block-size로 대체됩니다.

예시(inline/block size):
영어와 아랍어 (LTR/RTL)
너비 = inline-size
높이 = block-size

<div class="content-ad"></div>

위에서 아래로(줄을 읽는) 언어인 일본어처럼, 반대로 볼 수 있습니다:
inline-size = 높이, block-size = 너비.

최소/최대 속성에 대해서는 속성 시작 부분에 min/max를 추가하세요.
예시: min-inline-size: 300px; max-block-size: 100px;.

![NewCSSLogicalProperties_4](/assets/img/2024-07-09-NewCSSLogicalProperties_4.png)

## CSS Positions

<div class="content-ad"></div>

위치 속성의 이전 이름인 top/right/left/bottom은 새로운 이름 집합으로 발전했습니다. 모두 접두사 inset을 가지고 있어요: inset-block-start/ inset-inline-end/inset-block-end/inset-inline-start.

영어로(LTR):
top = inset-block-start
bottom = inset-block-end
left = inset-inline-start
right = inset-inline-end

```js
/* 이전 기술 */
.popup{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
/* 새로운 기술 */
.popup{
   position:fixed;
   inset-block-start:0;  /*top - 영어로*/
   inset-block-end:0;    /*bottom - 영어로*/
   inset-inline-start:0; /*left - 영어로*/
   inset-inline-end:0;   /*right - 영어로*/
}
```

처음에는 왜 이렇게 복잡한 이름이 필요한지 의심스러울 수 있어요! 그러나 이에는 좋은 이유가 있어요. 새로운 속성 이름에서는 속성이 패딩/여백/테두리와 유사하게 결합될 수 있고, 이것이 위치에 대해 이전에 존재하지 않았던 새로운 축약 기능이에요.

<div class="content-ad"></div>

예시:

```js
.popup {
   position:fixed;
   inset:0 0 0 0;   /*위, 오른쪽, 아래, 왼쪽 - 영어로 표시*/
}
```

## CSS Floats

Float는 매우 직관적이며, left/right의 값 대신 inline-start/inline-end 두 가지 값만 있습니다.

<div class="content-ad"></div>

Markdown 형식으로 테이블 태그를 변경하십시오.

| 영어 (LTR)   | 한국어              |
| ------------ | ------------------- |
| float: left  | float: inline-start |
| float: right | float: inline-end   |

## 텍스트 정렬

float보다 더 간단합니다. 값을 left/right 대신 start/end로 대체합니다.

| 영어 (LTR)        | 한국어             |
| ----------------- | ------------------ |
| text-align: left  | text-align: start; |
| text-align: right | text-align: end;   |

<div class="content-ad"></div>

## 더 많은 내용

Resize 속성: 주로 `textarea`에 사용되며, 가로/세로 값은 inline/block으로 업데이트됩니다.

영어 (LTR)로:
resize: horizontal = resize: inline;
resize: vertical = resize: block;

background-position: 현재 어떤 브라우저에서도 구현되어 있지는 않지만, 깊이 파고들면 Mozilla의 MDN 웹사이트에서 background-position-inline 및 background-position-block에 대한 참조를 찾을 수 있습니다. 완전한 문서는 아직 없지만 작업 중에 있습니다! :-)

<div class="content-ad"></div>

그 외 사항: transform-origin과 같은 속성들이 방향과 관련된 모든 속성과 마찬가지로 업데이트될 것을 가정할 수 있습니다.

## CSS Grid 및 CSS Flexbox

CSS Grid 및 CSS Flexbox에 대한 좋은 소식은 이 두 기능이 이미 새로운 논리 속성 방법론으로 구축되어 있으며 업데이트할 필요가 없다는 것입니다.

## 논리 속성과 함께하는 워크플로 이해

<div class="content-ad"></div>

우선, 처음에는 매우 복잡해 보일 수 있지만 실제로 사용하기는 매우 쉽습니다. 스타일을 작성할 때는 다국어 지원에 대해 걱정할 필요가 없습니다. 옛날 물리적 속성 대신 논리적 속성을 사용하고 선호하는 언어에 맞게 일치시키면 됩니다.

# 언어에 맞춰 정렬 적용하기

새로운 논리적 속성들의 모든 업데이트를 배운 후, 여기에는 웹사이트의 블록 축 정렬(흐름)과 인라인 축 정렬(텍스트를 읽는 방향)을 정의할 수 있게 해주는 두 가지 속성이 있습니다.

## Writing-mode 속성(블록 축)

<div class="content-ad"></div>

웹사이트의 흐름을 정의합니다. 대부분의 경우 위에서 아래로 흐를 것이지만, 언급했듯이 특정 언어는 오른쪽에서 왼쪽으로(일본어) 또는 왼쪽에서 오른쪽으로(몽골어) 흐를 수 있습니다. 두 경우 모두 수직 스크롤이 아닌 우리가 익숙한 수평 스크롤을 사용할 것입니다.

참고: 현재 writing-mode에는 3가지 주요 값이 있습니다. 이들의 이름은 약간 혼란스럽습니다. 그 이유는 그들의 이름에 block-axis 방향과 그 경우에 텍스트의 정렬 위치(inline-axis)가 함께 들어있기 때문입니다. 이것은 분명히 매우 귀찮은 일이며, 텍스트 정렬은 중복되어 혼란만을 야기합니다.

이 혼란을 없애기 위해 값을 사용할 때는 값의 inline-axis 부분을 무시하고 block-axis 부분에만 초점을 맞추는 것이 좋습니다.

예시:

<div class="content-ad"></div>

values:

- `writing-mode: horizontal-tb;` = Top to Bottom flow, like in English (default value)
- `writing-mode: vertical-rl;` = Right to Left Flow, for Japanese.
- `writing-mode: vertical-lr;` = Left to Right Flow, for Mongolian.

As for my personal opinion, I would have preferred that the values included only: tb/rl/lr (block-axis part), to eliminate this potential confusion.

Example definition for Japanese:

<div class="content-ad"></div>

```css
html {
  writing-mode: vertical-rl;
}
```

![2024-07-09-NewCSSLogicalProperties_5](/assets/img/2024-07-09-NewCSSLogicalProperties_5.png)

## 방향 속성 (인라인 축)

텍스트가 왼쪽에서 오른쪽으로 시작해야 하는지 오른쪽에서 왼쪽으로 시작해야 하는지를 정의하지만 기본 수평 writing-mode 속성이 활성화된 경우에만 적용됩니다. writing-mode를 수직 모드 중 하나로 변경하면 실제 텍스트 방향인 왼쪽에서 오른쪽으로가 상단에서 하단으로 변경됩니다. 또는 반대로, rtl(right-to-left) 값으로 변경하면 아래에서 위로 변경됩니다.

<div class="content-ad"></div>

```js
html{
    direction: rtl;
}
```

사이트를 위아래에서 오른쪽에서 왼쪽으로 변환하는 것이 얼마나 쉬운지 놀라우십니다. 수평 스크롤을 사용할 수 있는 Firefox에서 확인하시는 것이 가장 좋습니다.

제가 만든 데모는 여기 있습니다. (현재 더 많은 기능을 지원하는 Firefox에서 최상의 효과를 볼 수 있습니다)

<div class="content-ad"></div>

실시간 예시 (언어 선택해보세요!):

# 브라우저 지원

- 상자 모델 속성 마진/패딩/테두리와 새로운 너비/높이(inline-size, block-size) 속성은 Edge를 제외한 모든 주요 브라우저에서 작동합니다.
- text-align의 새로운 값은 Edge를 제외한 모든 주요 브라우저에서 작동합니다.
- float/position/resize - 값/속성은 Firefox에서만 작동합니다.

# 논리 속성에 관한 문제

<div class="content-ad"></div>

이번 새로운 수정 사항으로 인해 새로운 문제에 직면하게 되었습니다. 예를 들어, margin 속성을 축약해서 사용하고 싶을 때 다음과 같이 작성하면 어떻게 해석될지 예측할 수 없을 것입니다: margin: 10px 20px 8px 5px;
웹사이트가 물리적 속성을 사용하는 경우 값은 다음과 같이 해석될 것입니다: margin-top/margin-right/margin-bottom/margin-left,
그러나 웹사이트가 새로운 논리적 속성을 사용하는 경우 값은 다음과 같아야 합니다: margin-block-start/margin-inline-end/margin-block-end/margin-inline-start.

영어 웹사이트에서는 물리적 속성과 논리적 속성이 동일하게 작동합니다. 다른 언어에서는 margin과 같은 축약형을 사용할 때, 그것이 방향 속성이나 새로운 속성 writing-mode에 따라 작동하길 바랍니다.

이것은 아직 해결되지 않은 문제입니다. 제가 github csswg-drafts에 문제 해결을 위한 제안을 추가했습니다. 더 나은 해결책을 갖고 있다고 생각한다면 거기에 댓글을 달아주세요!

지금은 논리적 속성을 사용하고 싶다면 축약형 없이 전체 속성 이름을 사용해야 합니다.

<div class="content-ad"></div>

저의 문제 해결 방안은 다음과 같습니다:

```js
html {
    flow-mode: physical;
       /* 또는 */
    flow-mode: logical;
}
.box {
    /* HTML flow-mode 값에 따라 해석될 것입니다 */
    margin: 10px 5px 6px 3px;
    padding: 5px 10px 2px 7px;
}
```

## 반응형 디자인 문제

완벽하게 작동하는 데모를 만들려고 할 때, 미디어 쿼리에서 새로운 "max-width" 속성 max-inline-size를 사용해보았습니다. 좌에서 우로/우에서 좌로인 경우 max-width처럼 작동하고 일본어와 같은 언어에서는 max-height처럼 작동할 것으로 이해했습니다. 안타깝게도 현재 브라우저들은 미디어 쿼리에서 이 속성을 제대로 해석하지 못하고 있습니다.

<div class="content-ad"></div>

```js
/ * 작동하지 않음 * /
@media (max-inline-size: 1000px) {
  .main-content {
    background: red;
    grid-template-columns: auto;
  }
}
```

## 고려해야 할 변경 사항

이 게시물을 작성할 때, 논리 속성의 개념을 깊게 학습하고 이해한 후에도 미래에 반영해야 할 몇 가지 누락된 적응 사항이 있었습니다:

- line-height를 “line-size”로 할 수 있음
- border-width를 “border-size”로 할 수 있음

그러나 적어도 border-width의 경우 그렇지 않아 보입니다. 그것은 여전히 논리 속성으로 업데이트되었지만 이름에 여전히 'width'라는 단어가 포함되어 있습니다.
예: border-block-start-width.

<div class="content-ad"></div>

하지만 누가 알겠어요, 혹시 w3c의 적절한 분들이 이 게시물을 읽을 수도 있을거에요 :-)

# 마지막으로

이상이에요,
이 글을 즐겁게 읽으시고 제 경험을 통해 배우셨으면 좋겠어요.
만약 이 게시물을 좋아하신다면, 박수와 공유를 감사히 받겠습니다 :-)

CSS에 관한 많은 콘텐츠를 만들고 있어요. 트위터, 링크드인, 그리고 미디엄을 통해 저를 팔로우해주세요.

<div class="content-ad"></div>

당신은 eladsc.com에서 내 모든 컨텐츠에 접근할 수도 있어요.

타이포그래피에 대한 더 많은 추천 포스트:

- CSS Writing Modes — 매우 추천됩니다!
- 텍스트 방향

저의 CSS 관련 포스트:

- 왜 CSS HSL 색상이 더 나은가!
- 새로운 반응형 디자인 진화
- CSS Position Sticky — 실제 작동 방식!

제 소개:
저는 웹 개발자인 Elad Shechter이며, CSS 및 HTML 디자인 및 아키텍처에 특화되어 있어요.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-09-NewCSSLogicalProperties_6.png)

# CSS Logical Properties에 관한 제 발표 — 새로운 소식!

CSS Logical Properties에 대한 전체 발표 자료입니다. 자유롭게 공유해주세요 🙂
