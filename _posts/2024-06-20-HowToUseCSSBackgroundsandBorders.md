---
title: "CSS 배경과 테두리 사용하기"
description: ""
coverImage: "/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_0.png"
date: 2024-06-20 03:10
ogImage: 
  url: /assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_0.png
tag: Tech
originalTitle: "How To Use CSS Backgrounds and Borders"
link: "https://medium.com/@ed.wacc1995/how-to-use-css-backgrounds-and-borders-bf95d6448967"
isUpdated: true
---




![이미지](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_0.png)

CSS 배경과 테두리의 슈퍼파워를 해제할 준비가 되셨나요? 이 강의는 화려한 그라데이션부터 매력적인 이미지, 부드러운 둥근 모서리까지 활용하는 창의적인 방법을 살펴봅니다. 지루한 웹 사이트는 잊고, 배경과 테두리가 디자인 마법의 열쇠입니다!

# CSS로 창의적인 배경 만들기

CSS 스타일시트의 복잡한 배경 속성에 압도당하고 있나요? 걱정 마세요, 우린 여기 있어요! 배경의 단축 속성이 많은 정보를 담을 수 있지만, 이 강의에서는 한 단계씩 세부적으로 설명하겠습니다.

<div class="content-ad"></div>

사각형.box를 예시로 들어 설명하면, 처음에는 복잡해 보일지 모르겠지만 개별 구성 요소인 그라데이션, 이미지, 색상 등을 분해하여 전체 가능성을 펼쳐보자구!

<div class="content-ad"></div>

## CSS에서 배경 설정하기

CSS의 `background-color` 속성을 사용하면 어떤 요소든 생동감 있는 배경으로 칠할 수 있습니다. 전통적인 "빨간색"과 같은 고전적인 이름부터 팬시한 헥스 코드(#FF0000)까지 모든 유효한 색상 형식을 허용합니다. 이 색상은 콘텐츠, 패딩, 심지어 요소의 테두리 뒷면 (다른 방식으로 지정하지 않으면)을 모두 채웁니다.

실제 동작을 확인해 보세요! 다음 예시에서는 다양한 색상 값을 사용하여 상자, 제목, `span` 요소에 화려함을 더해 보았습니다. 상상할 수 있는 모든 색상으로 실험해 보세요!

<img src="/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_1.png" />

<div class="content-ad"></div>


.box {
  background-color: #567895;
}

h2 {
  background-color: black;
  color: white;
}
span {
  background-color: rgb(255 255 255 / 50%);
}



<div class="box">
  <h2>배경 색상</h2>
  <p>배경 <span>색상</span>을 변경해보세요.</p>
</div>


## CSS 배경 이미지로 이미지 추가하기

CSS의 background-image 속성을 사용하면 어떤 요소든 멋진 이미지를 표현할 수 있습니다. 단순히 이미지 파일의 경로를 제공하면 요소의 배경에 이미지가 나타납니다.


<div class="content-ad"></div>

마법을 실행해 봅시다! 이 예제에서는 두 개의 상자가 있습니다:

- 상자 1: 상자보다 큰 배경 이미지("balloons.jpg")가 있습니다. 기본적으로 이미지의 일부분만 볼 수 있습니다.
- 상자 2: 더 작은 이미지("star.png")를 사용합니다. 여기서 이미지는 상자의 전체 배경을 채우기 위해 반복(타일 구성)됩니다.

이 예제는 배경 이미지에 관한 두 가지 중요한 사항을 강조합니다:

- 크기 조절: 큰 이미지는 자동으로 요소에 맞게 축소되지 않습니다.
- 타일링: 작은 이미지는 전체 배경 영역을 채우기 위해 반복됩니다.

<div class="content-ad"></div>

본 수업에서는 이러한 행동을 제어하고 배경 이미지로 더 멋진 효과를 만드는 방법을 나중에 살펴볼 예정입니다!

![image](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_2.png)

```css
.a {
  background-image: url(balloons.jpg);
}

.b {
  background-image: url(star.png);
}
```

```html
<div class="wrapper">
  <div class="box a"></div>
  <div class="box b"></div>
</div>
```

<div class="content-ad"></div>

이미지로 색상이 빛날 수 있다면 어떨까요? 위의 예제에 background-color 속성을 추가해 보세요! 일반적으로 배경 이미지는 정의한 모든 색상 위에 배치됩니다. 이것을 마음껏 조절해 보세요. 예상치 못한 멋진 효과를 얻을 수도 있어요!

## 배경 반복 제어하기

background-repeat 속성은 이미지의 타일링 동작을 제어하는 데 사용됩니다. 사용 가능한 값은 다음과 같습니다:

- no-repeat — 배경 반복 금지합니다.
- repeat-x — 가로로 반복합니다.
- repeat-y — 세로로 반복합니다.
- repeat — 기본값으로, 양방향으로 반복합니다.
- space — 가능한 한 많이 반복하되, 여분의 공간이 있으면 이미지 사이에 공간을 추가합니다.
- round — space 와 비슷하지만, 여분 공간을 채우기 위해 이미지를 늘립니다.

<div class="content-ad"></div>

아래 예시에서 이 값들을 시도해보세요. 값이 no-repeat으로 설정되어 있어서 별 하나만 보일 것입니다. 다른 값들인 repeat-x와 repeat-y를 시도해 보면 그 효과를 확인할 수 있습니다.

<img src="/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_3.png" />

```js
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
}
```

```js
<div class="box"></div>
```

<div class="content-ad"></div>

## CSS에서 배경 이미지 크기 조절

"balloons.jpg" 예제를 기억하시나요? 이미지가 너무 크고 상자 크기를 초과하여 잘리는 문제가 있었죠. 하지만 걱정하지 마세요, CSS가 완벽한 이미지 크기 조절 키를 가지고 있습니다!

background-size 속성을 사용하면 배경 이미지가 요소 내에 어떻게 맞춰지는지를 제어할 수 있습니다. 다음을 사용할 수 있습니다:

- 길이 또는 퍼센트: 정확한 크기를 지정하여 (예: "100px" 또는 "50%") 정밀한 제어가 가능합니다. (이는 이미지 왜곡을 일으킬 수 있으니 조심하세요!)




<div class="content-ad"></div>

키워드:

- cover: 이미지를 상자 안을 완전히 채우면서 가로세로 비율을 유지합니다. 이미지의 일부가 상자 외부에 숨겨질 수 있습니다.
- contain: 이미지를 상자 안에 완전히 맞추면서 가로세로 비율을 유지합니다. 이로 인해 이미지 주변에 빈 공간이 남을 수 있습니다.

아래 예제에서 실험해 봅시다!

- 길이 조정: background-size의 픽셀 값을 변경하여 이미지에 어떤 영향을 주는지 확인해보세요.
- 키워드 마니아: 픽셀 값을 제거하고 background-size: cover 또는 background-size: contain을 설정하여 자동으로 크기를 조절해보세요.
- 작은 이미지 반복: 이미지가 상자보다 작을 경우, background-repeat를 조정하여 이미지를 반복하고 공간을 채울 수 있습니다.

<div class="content-ad"></div>

이 기술들을 활용하면 이미지 크기와 요소 크기 사이에 완벽한 균형을 찾을 수 있어요!

![image](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_4.png)

```css
.box {
  background-image: url(balloons.jpg);
  background-repeat: no-repeat;
  background-size: 100px 10em;
}
```

```html
<div class="box"></div>
```

<div class="content-ad"></div>

## 배경 이미지를 배치하는 위치

배경 위치 속성을 사용하면 상자 내에서 배경 이미지가 나타나는 정확한 위치를 정할 수 있습니다. 상자에 무대가 있다고 상상해보세요. (0,0)이 중앙 무대 조명인 것처럼요.

이것이 이미지 배치를 위한 도구 상자입니다:

- 키워드: 간단하고 직접적이에요! 이미지를 배치할 때 “top”, “bottom”, “left”, “right”와 같은 용어를 사용하세요. (배경 위치 문서에서 더 많은 옵션을 살펴보세요!)
- 길이와 백분율: 정확한 제어가 필요하신가요? 픽셀 값 (예: “20px”)이나 백분율 (예: “10%”)을 지정하여 정확한 위치를 지정할 수 있어요.

<div class="content-ad"></div>


.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top center;
}



.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 20px 10%;
}



.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 20px top;
}



.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top 20px right 10px;
}


<div class="content-ad"></div>

준비가 되셨나요? 조합해 보세요! 그림을 자유롭게 조절할 수 있어요. 단, 첫 번째 값이 수평 위치(좌우), 두 번째 값이 수직 위치(상하)를 제어합니다.

모험을 즐길 준비가 되셨나요? 4개의 값 구문을 사용하여 더 많은 제어를 해보세요. 특정 상자 가장자리에서 그림을 미끄러뜨리거나 끌어내리는 상상해 보세요. 예를 들어, "위 20px 오른쪽 10px"는 그림을 위에서 20픽셀 아래로, 오른쪽 가장자리에서 10픽셀 멀리 위치시킵니다.

이제 실습해 볼까요? 아래 예제의 값을 바꿔서 노는 것도 좋아요. 그 별을 진정한 이미지 감독처럼 이동해 보세요!

![그림](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_5.png)

<div class="content-ad"></div>

```js
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 120px 1em;
}
```

```js
<div class="box"></div>
```

## 그라디언트 배경의 힘을 발휘해보세요

단조로운 색상에 지쳤나요? 그라디언트는 귀하의 웹사이트에 화려한 전환을 더할 수 있습니다! 그라디언트는 배경 이미지처럼 작동하며 익숙한 background-image 속성을 사용하여 설정됩니다. 

<div class="content-ad"></div>

그라데이션을 더 깊게 탐구해보세요! 'gradient' 데이터 유형에 대한 MDN 페이지에서 다양한 유형과 가능성에 대해 설명합니다. (MDN 페이지 링크를 여기에 삽입).

코딩 없이 실험해 보고 싶나요? CSSGradient.io와 같은 멋진 CSS 그라데이션 생성기가 온라인에 많이 있습니다. 가볍게 놀며 멋진 그라데이션을 만들고 생성된 코드를 간단히 복사하여 붙여넣어보세요!

실제로 확인해보세요! 아래 예시에서 두 개의 상자가 서로 다른 그라데이션을 보여줍니다:

- 상자 1: 전체 상자를 우아하게 가로지르는 선형 그라데이션.
- 상자 2: 정의된 크기를 가지는 원형 그라데이션으로 반복되는 패턴을 만듭니다.

<div class="content-ad"></div>

자신만의 매혹적인 그라데이션을 만들 준비가 되셨나요? 가능성을 탐험해보세요!

![그라데이션 이미지](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_6.png)

```js
.a {
  background-image: linear-gradient(105deg, rgb(0 249 255 / 100%) 39%, rgb(51 56 57 / 100%) 96%);
}

.b {
  background-image: radial-gradient(circle, rgb(0 249 255 / 100%) 39%, rgb(51 56 57 / 100%) 96%);
  background-size: 100px 50px;
}
```

```js
<div class="wrapper">
  <div class="box a"></div>
  <div class="box b"></div>
</div>
```

<div class="content-ad"></div>

## 여러 배경 이미지 사용하기

계층화된 배경 효과를 만들고 싶나요? CSS를 사용하면 한 번에 여러 배경 이미지를 포함할 수 있어요! 간단히 background-image 속성에서 각 이미지 URL을 쉼표로 구분하세요.

이것을 한 덩어리로 생각해보세요:

- 코드에서 나열하는 마지막 이미지는 스택의 아래쪽에 배치되어요 (기본 레이어처럼).
- 각 이전 이미지는 위로 층을 이루며 아름다운 시각적 효과를 만들어냅니다.

<div class="content-ad"></div>

보너스! 그라데이션도 함께 참여하여 일반 이미지와 혼합하여 더 많은 창의적인 가능성을 끌어올릴 수 있어요.

레이어 제어하기:

다른 background-* 속성들(예: repeat 및 position)도 쉼표로 구분된 여러 값들과 함께 작동할 수 있어요. 여기 주의할 점이 있어요:
- 속성의 각 값은 background-image 목록에 나타난 순서에 맞춰 이미지와 일치해야 해요.
- 이미지보다 적은 값이 있는 경우, 해당 값들은 이미지들을 순환하게 될 거에요.

<div class="content-ad"></div>

예를 들어, 아래 코드에서는 네 개의 이미지가 있지만 background-position 값이 두 개뿐입니다. 처음 두 위치는 첫 번째 두 이미지에 적용되고 나머지 이미지에 대해서도 동일하게 반복됩니다.

실험해 보세요! 아래 예제를 활용해 다음을 해보세요:

- 이미지 목록에서 이미지 순서를 바꿔보면 쌓임 순서가 어떻게 변경되는지 확인해보세요.
- 다른 속성을 수정하여 이미지의 위치, 크기 또는 이미지 반복 빈도를 조절해 보세요.

약간의 연습으로 층으로 구성된 시각적으로 멋진 배경을 만들어내는 마스터가 될 수 있을 거에요!

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_7.png" />

```js
.box {
  background-image: url(star.png), url(big-star.png);
}
```

```js
<div class="wrapper">
  <div class="box"></div>
</div>
```

## 배경 첨부

<div class="content-ad"></div>

CSS에서 배경을 다룰 때, 컨테이너 내의 콘텐츠가 스크롤될 때 배경이 어떻게 작동하는지 제어할 수 있어요. 이건 background-attachment 속성을 사용하여 달성되며, 주요 세 가지 값이 있어요:

- scroll (기본값): 이 설정은 배경 이미지가 페이지 콘텐츠와 함께 스크롤되도록 만들어요. 그러나 요소 자체에 스크롤 가능한 콘텐츠가 있는 경우, 배경은 요소에 대해 고정되어 스크롤 콘텐츠와 함께 움직이지 않아요.
- fixed: 이 값은 배경 이미지를 화면(브라우저 창의 보이는 영역)에 고정시켜요. 페이지나 요소의 콘텐츠를 얼마나 스크롤해도 배경 이미지는 화면에서 같은 위치에 유지돼요.
- local: 이 설정은 배경 이미지를 적용된 요소에 고정시킵니다. 따라서 요소의 콘텐츠를 스크롤하면 배경 이미지가 함께 스크롤되어 요소 자체 내에서 스크롤 효과가 생겨요.

배경-attachment 속성은 요소나 페이지 내에서 실제로 스크롤할 콘텐츠가 있는 경우에만 뚜렷한 효과가 있다는 것이 중요해요.

여기서 직접 해보세요!

<div class="content-ad"></div>

## 효율성을 위한 배경 단축키

CSS는 한 번에 여러 배경 속성을 정의하는 단축키를 제공하여 코드 양을 줄이고 가독성을 향상시킬 수 있습니다. 이 단축키는 `background` 속성 자체이며, 단축키 역할을 합니다.

여러 배경을 사용할 때는 `background` 속성 값 내에서 쉼표로 구분된 리스트로 각 배경의 모든 속성을 지정할 수 있습니다.

값을 구성하는 방법은 다음과 같습니다:

<div class="content-ad"></div>

- 각 배경 정의에는 색상, 이미지, 위치, 반복 방법 등과 같은 해당 속성을 위한 값이 포함됩니다.
- 순서가 중요합니다. 한 배경에 대한 모든 속성은 다음 배경 정의로 넘어가기 전에 함께 나열되어야 합니다.
- 배경 색상 위치: 여러 개의 배경을 사용할 경우, 배경 색상 속성은 마지막 콤마 뒤에만 지정할 수 있으며, 다른 배경 정의와 구분되어야 합니다.
- 배경 크기 및 위치: 배경 크기와 배경 위치를 함께 사용하는 경우, 슬래시 (/)로 구분하여 함께 배치해야 합니다.

![How To Use CSS Backgrounds and Borders](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_8.png)

```css
.box {
  background:
  linear-gradient(105deg, rgb(255 255 255 / 20%) 39%, rgb(51 56 57 / 100%) 96%) center center / 400px 200px no-repeat,
  url(big-star.png) center no-repeat,
  rebeccapurple;
}
```

```html
<div class="box"></div>
```

<div class="content-ad"></div>

## 배경 접근성 향상하기

- 색 대비가 중요합니다: 배경 이미지나 색상을 사용할 때 텍스트와 배경 사이에 충분한 대비가 있는지 확인하세요. 이렇게 함으로써 시각 장애를 가진 사용자를 포함한 모든 사람이 텍스트를 쉽게 읽을 수 있습니다. 충분한 대비 여부를 확인할 수 있는 온라인 도구가 있습니다.
- 배경 이미지를 위한 대체 시스템: 텍스트가 배경 이미지 위에 있는 경우, 항상 배경 색상을 지정하세요. 이 색상은 이미지가 어떤 이유로든 로드되지 않는 경우에도 텍스트가 가독성있게 유지되도록 합니다.
- 장식 용도의 배경 이미지: 화면 낭독기가 배경 이미지를 해석할 수 없으므로 배경 이미지는 장식 용도로만 사용하세요. 중요 정보는 배경 이미지 안에 숨기지 말고 HTML 콘텐츠에 직접 포함시키세요. 이렇게 하면 모든 사람이 정보에 접근할 수 있습니다.

# 테두리를 창의적으로 활용하기

이전 레슨에서 배운 박스 모델을 기억하시나요? 테두리는 그 모델 내에서 요소의 크기를 정의하는 데 중요한 역할을 합니다. 이제 테두리를 디자인 목적으로 창의적으로 활용하는 방법을 살펴봅시다.

<div class="content-ad"></div>

- 효율을 위한 간편한 표기법: CSS에서는 보통 border shorthand 속성을 사용하여 테두리의 색상, 너비 및 스타일을 한 줄로 정의합니다. 이 속성은 요소의 네 면에 동일한 스타일을 적용합니다.
- 개별 측면 지정: 상자의 특정 측면에 대한 테두리를 지정할 수도 있습니다. border-top, border-right, border-bottom, border-left와 같은 속성을 사용하여 각 측면을 독립적으로 스타일링할 수 있습니다.

개별 테두리 속성: border shorthand는 세 개의 개별 속성으로 확장됩니다:

- border-width: 테두리 선의 두께를 제어합니다.
- border-style: 테두리의 시각적 모양을 정의합니다 (예: solid, dashed, dotted).
- border-color: 테두리의 색상을 설정합니다.

세심한 제어를 위한 Longhand 속성: 더 세밀한 제어를 위해 CSS는 테두리 각 측면에 대한 longhand 속성을 제공합니다.

<div class="content-ad"></div>

- 너비에 대한 border-top-width, border-right-width, border-bottom-width 및 border-left-width가 있습니다.
- 스타일에 대한 border-top-style, border-right-style, border-bottom-style 및 border-left-style이 있습니다.
- 색상에 대한 border-top-color, border-right-color, border-bottom-color 및 border-left-color가 있습니다.

논리적 속성(다음 레슨): 다음 레슨에서는 논리적 테두리 속성을 살펴보겠습니다. 이러한 속성은 문서의 작성 모드(예: 왼쪽에서 오른쪽 또는 오른쪽에서 왼쪽)에 적응합니다.

스타일 실험: 테두리에는 다양한 스타일이 있습니다. border-width, border-style 및 border-color를 조정하여 요소에 독특한 시각적 효과를 만들어보세요.

<img src="/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_9.png" />

<div class="content-ad"></div>

```css
.box {
  background-color: #567895;
  border: 5px solid #0b385f;
  border-bottom-style: dashed;
  color: #fff;
}

h2 {
  border-top: 2px dotted rebeccapurple;
  border-bottom: 1em double rgb(24 163 78);
}
```

```html
<div class="box">
  <h2>Borders</h2>
  <p>Try changing the borders.</p>
</div>
```

## 꼭지각형으로 모양 만들기

border-radius 속성을 사용하면 상자의 모서리를 둥글게 형성할 수 있습니다. 곡률을 정의하는 shorthand와 longhand 옵션이 모두 제공됩니다.

<div class="content-ad"></div>

- "Uniform Radii에 대한 단축 표기법: 대부분의 경우, border-radius의 단축 형식을 사용할 것입니다. 하나 또는 두 값을 허용합니다."
- "단일 값: 단일 값은 상자의 네 꼭지 모두에 동일한 곡률을 적용합니다."
- "두 값: 두 값은 별도의 수평 및 수직 반지름을 정의하며, 타원형 코너를 만들 수 있습니다."
- "예제: 일괄 라운딩: 모든 코너에 10px 반경을 만드는 방법은 다음과 같습니다:"

```js
.box {
  border-radius: 10px;
}
```

- "개별 코너에 대한 Longhand 속성: 더 많은 제어가 필요한 경우, border-top-right-radius와 같은 Longhand 속성을 사용하여 각 코너를 개별적으로 스타일링할 수 있습니다. 이러한 속성은 shorthand와 유사하게 하나 또는 두 값을 취합니다."
- "예제: 타원형 코너: 이 예제에서는 상단 오른쪽 코너에 1em 가로 반지름과 10% 세로 반지름을 설정하여 타원형 효과를 만듭니다:"

```js
.box {
  border-top-right-radius: 1em 10%;
}
```

<div class="content-ad"></div>

- 논리적 속성 (다음 레슨): 테두리와 유사하게, 논리적 테두리 반경 속성은 문서의 작성 모드에 맞게 조정됩니다.
- 실험하고 탐험해보세요: 원하는 코너 모양을 얻기 위해 다양한 반경 값으로 놀아보세요. 자세한 구문 옵션은 보더 반경 속성 문서(여기에 포함되지 않음)를 참조하세요. "border-radius 생성기"와 같은 온라인 도구도 있어서 구체적인 둥근 코너 스타일을 시각화하고 코드를 생성하는 데 도움이 될 수 있습니다.

![이미지](/assets/img/2024-06-20-HowToUseCSSBackgroundsandBorders_10.png)

```js
.box {
  border: 10px solid rebeccapurple;
  border-radius: 1em;
  border-top-right-radius: 10% 30%;
}
```

```js
<div class="box">
  <h2>테두리</h2>
  <p>테두리를 변경해보세요.</p>
</div>
```

<div class="content-ad"></div>

# 요약

상자의 모서리를 부드럽게 만들고 싶나요? 그럼 border-radius 속성을 확인해보세요! 이를 통해 꼭지의 정도를 제어할 수 있어요.

- 균일한 둥근 모서리 (가장 일반적): 네 개 모서리에 동일한 둥근 정도를 적용하기 위해 값(픽셀, ems 또는 백분율)을 제공하세요.
- 타원형 모서리: 고급스러운 느낌을 원하시나요? 두 개의 값으로 타원 효과를 위한 별도의 수평 및 수직 반지름을 정의하세요.
- 개별 모서리 제어 (옵션): 더 정밀한 조절이 필요하다면 CSS는 각 모서리를 독립적으로 스타일링할 수 있게 하는 border-top-left-radius와 같은 확장 속성을 제공합니다.

```js
type SocialMedia = {
  LinkedIn: string;
  GitHub: string;
  StackOverflow: string;
  Litsy: string;
  Email: string;
  X: string;
}

function newSocialMedia(): SocialMedia {
  return {
    LinkedIn: "https://www.linkedin.com/in/edwardcasanova/",
    GitHub: "https://github.com/ed3899",
    StackOverflow: "stackoverflow.com/users/11941146/edward-casanova",
    Litsy: "https://www.litsy.com/web/stack/edca3899/read",
    Email: "ed.wacc1995@gmail.com",
    X: "https://twitter.com/edca3911"
  };
}
const subscribe = (): string => {
  return "https://medium.com/@ed.wacc1995/subscribe";
};
const tip = (): string => {
  return "https://paypal.me/edca3899?country.x=MX&locale.x=es_XC";
};
```