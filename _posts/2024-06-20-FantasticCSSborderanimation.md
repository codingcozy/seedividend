---
title: "환상적인 CSS 테두리 애니메이션"
description: ""
coverImage: "/assets/img/2024-06-20-FantasticCSSborderanimation_0.png"
date: 2024-06-20 06:05
ogImage: 
  url: /assets/img/2024-06-20-FantasticCSSborderanimation_0.png
tag: Tech
originalTitle: "Fantastic CSS border animation"
link: "https://medium.com/frontend-canteen/fantastic-css-border-animation-b02e06828beb"
---


오늘 나는 블로그 사이트인 shoptalkshow를 방문했는데, 그 사이트에서 다음과 같은 스타일을 보게 되어 정말 흥미로웠어요:


<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_0.png" />


그 사이트의 스타일은 유니크하다고 생각되며, 특히 일부 베젤들이 돋보였어요.

따라서, 이 글에서는 CSS를 사용하여 다양하고 멋진 테두리 효과를 만들어볼 거예요.

<div class="content-ad"></div>

# CSS Border 속성

테두리에 관한 이야기를 할 때, 가장 흔히 사용되는 속성은 solid와 dashed가 생각나는데, 위 그림에서는 dashed가 나타납니다.

가장 일반적인 solid와 dashed 외에도, CSS 테두리는 none, hidden, dotted, double, groove, ridge, inset, outset 등 다른 스타일도 지원합니다. 모든 네이티브 지원 테두리 스타일을 보려면 none, hidden을 제거해주세요:

![Fantastic CSS Border Animation](/assets/img/2024-06-20-FantasticCSSborderanimation_1.png)

<div class="content-ad"></div>

이것들은 기본 사항들입니다. 다른 스타일의 테두리를 구현하거나 테두리에 애니메이션을 추가하려면 몇 가지 다른 속성과 협력하거나 마음을 열어야 합니다. 좋아요, 몇 가지 추가로 흥미로운 테두리를 살펴보겠습니다.

# 테두리 길이 변경

간단한 것부터 시작하여 다음과 같은 효과의 테두리를 얻는 방법을 살펴보겠습니다:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_2.png" />

<div class="content-ad"></div>

사실 이것은 두 가지 의사 요소가 요소를 빌려 사용하는 것입니다. 두 의사 요소의 상단 및 왼쪽 테두리, 아래쪽 및 오른쪽 테두리가 각각 설정되어 있으며, hover을 통해 두 가지 의사 요소의 높이와 너비를 변경할 수 있습니다. 이해하기 매우 쉽습니다.

```js
div {
    position: relative;
    border: 1px solid #03A9F3;
    
    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
    }
    
    &::before {
        top: -5px;
        left: -5px;
        border-top: 1px solid var(--borderColor);
        border-left: 1px solid var(--borderColor);
    }
    
    &::after {
        right: -5px;
        bottom: -5px;
        border-bottom: 1px solid var(--borderColor);
        border-right: 1px solid var(--borderColor);
    }
    
    &:hover::before,
    &:hover::after {
        width: calc(100% + 9px);
        height: calc(100% + 9px);
    }
}
```

CodePen Demo — 너비 테두리 애니메이션

다음으로 난이도를 조금 더 심화해 볼 예정입니다.

<div class="content-ad"></div>

# 점선 테두리 애니메이션

`dashed` 키워드를 사용하여 쉽게 점선 테두리를 만들 수 있어요.

```js
div {
    border: 1px dashed #333;
}
```

![Fantastic CSS border animation](/assets/img/2024-06-20-FantasticCSSborderanimation_3.png)

<div class="content-ad"></div>

물론, 테이블 태그를 마크다운 형식으로 변경하겠습니다.


| 브라우저 | 지원 여부 |
| ------- | --------- |
| Chrome  | 예        |
| Firefox | 예        |
| Safari  | 예        |
| Edge    | 예        |


<div class="content-ad"></div>

그래디언트는 여러 개의 그래디언트를 지원해요. 우리는 모든 컨테이너의 네 면을 나타내기 위해 그래디언트를 사용할 수 있어요:

```js
div {
    background: 
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
        linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
}
```

효과는 다음과 같아요:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_5.png" />

<div class="content-ad"></div>

좋아요, 지금까지 우리의 점선 테두리 애니메이션이 사실상 절반 이상 완료되었습니다. 애니메이션에서 border-style: dashed가 지원되지는 않지만 gradients는 지원됩니다. 우리는 hover 효과를 추가하고 animation을 추가할 때, 배경 위치를 변경할 수 있습니다.

```js
div:hover {
    animation: linearGradientMove .3초 무한 선형;
}

@keyframes linearGradientMove {
    100% {
        background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
    }
}
```

이제 효과를 보세요. hover가 발생할 때 테두리가 이동할 수 있습니다. 애니메이션 전체가 끝에서 끝으로 연결되어 있으므로 무한 루프 애니메이션은 항상 점선 테두리가 계속 이동하는 것처럼 보입니다. 이것은 작은 꼼수나 트릭입니다:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_6.png" />

<div class="content-ad"></div>

여기 또 하나의 작은 꿀팁이 있어요. 만약 주어진 그림자 테두리 애니메이션을 다른 테두리에서 대시 테두리로 전환하고 싶은 경우, 애니메이션을 시뮬레이션하는 것이 가능해요. 예를 들어 다음과 같을 거예요:

```js
div {
    border: 1px solid #333;

    &:hover {
        border: none;
        background: 
            linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
            linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
            linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
            linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
        background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
        background-position: 0 0, 0 100%, 0 0, 100% 0;
    }
}
```

박스 모델에서 테두리와 배경의 위치 차이로 인해 시각적인 정렬 오류가 발생할 수 있어요.

![예시 이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_7.png)

<div class="content-ad"></div>

위 문제를 해결하기 위해 테이블 태그를 마크다운 형식으로 변경할 수 있습니다. 

```js
div {
    outline: 1px solid #333;
    outline-offset: -1px;
    
    &:hover {
        outline: none;
    }
}
```

실제 버튼에 적용된 효과를 살펴보세요:

![버튼 효과](/assets/img/2024-06-20-FantasticCSSborderanimation_8.png)

<div class="content-ad"></div>

위 Demo의 전체 코드는 다음과 같습니다:

CodePen 데모 - 대시 테두리 애니메이션

# 그라데이션의 다른 멋진 사용법

그라데이션을 사용하면 위의 효과뿐만 아니라 더 많은 효과를 얻을 수 있습니다.

<div class="content-ad"></div>

그라데이션에 대해 자세히 들어가서 이러한 배경을 만들기 위해 그라데이션을 사용하고 있어요:

```css
div {
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
    }
}
```

여기에서 요소의 가상 요소로 생성된 그래픽을 사용하고 있으며, 부모 요소의 너비와 높이는 200%이고, `overflow: hidden`으로 설정되어 있습니다.

![FantasticCSSborderanimation_9](/assets/img/2024-06-20-FantasticCSSborderanimation_9.png)

<div class="content-ad"></div>

다음으로, 그것에 회전을 추가해 보세요:

```js
div {
    animation: rotate 4s linear infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}
```

효과를 확인해 보세요:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_10.png" />

<div class="content-ad"></div>

마지막으로 가상 요소를 사용하여 중간 부분을 가리고 멋진 테두리 애니메이션이 나오게 할 수 있어요. (투명한 요소들이 애니메이션 속에서 나타나면, 원리를 이해하는 데 도움이 될 거예요):

![gradient border animation](/assets/img/2024-06-20-FantasticCSSborderanimation_11.png)

위 Demo의 완전한 코드는 다음과 같아요. 이 효과를 처음 본 곳은 이 저자 - Jesse B의 저자.

CodePen Demo - 그라데이션 테두리 애니메이션

<div class="content-ad"></div>

# 그라데이션 색상 변경

위의 기본 기술을 익힌 후에는 그라데이션의 색상을 조정할 수 있습니다. 4가지 색상을 1가지 색상으로 변환할 것입니다:

```js
div::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 0 0;
    background-image: linear-gradient(#399953, #399953);
}
```

이와 같은 그래픽을 얻을 수 있습니다:

<div class="content-ad"></div>


<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_12.png" />

다시 한 번 함께 돌려보고 단색 추격 테두리 애니메이션이 나옵니다:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_13.png" />

CodePen 데모 - 그라데이션 테두리 애니메이션 2


<div class="content-ad"></div>

와우, 정말 멋지네요. 그러나 한 줄인 경우 뚜렷한 결함이 있습니다. 즉, 테두리 끝이 작은 삼각형인 대신 수직인 경우가 있습니다. 이는 특정 시나리오에서 적용되지 않거나 PM이 이를 수용하지 않을 수 있습니다.

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_14.png" />

이러한 작은 삼각형을 제거할 방법이 있을까요? 네, 아래에서는 clip-path를 사용하여 이러한 작은 삼각형을 제거하는 다른 방법을 소개하겠습니다.

# 코닉 그래디언트의 스마트한 사용

<div class="content-ad"></div>

우리가 clip-path에 대해서 더 이상 진행하기 전에, 우선 각도 그라데이션에 대해 이야기해 봅시다.

위에서 언급된 내용은 주로 선형 그라데이션인 linear-gradient에 사용됩니다. 실제로 conic-gradient도 사용할 수 있습니다.

한 번 darker style로 conic-gradient을 시도해 보죠. 아래는 핵심 코드입니다:

```js
.conic {
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
        animation: rotate 4s linear infinite;
    }
}
@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}
```

<div class="content-ad"></div>

다음은 렌더링 및 개요도입니다. 부분 각도 그라데이션을 사용하여 그래프를 회전하고, 다른 가상 요소를 사용하여 중간 부분을 마스킹하여 선 부분 만이 노출되도록합니다:

![이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_15.png)

CodePen 데모 - 회전 테두리 3

# 클립 경로의 스마트한 사용

<div class="content-ad"></div>

이전에 친한 친구 clip-path가 다시 나타났습니다. 재미있는 일은 결코 없을 것입니다.

clip-path는 좌표점 자체를 애니메이션화하여 하나의 클리핑 모양에서 다른 클리핑 모양으로 변환할 수 있습니다.

이 기능을 사용하여 테두리 따라오는 효과를 잘 구현할 수 있습니다. 의사 코드는 다음과 같습니다:

```js
div {
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid gold;
        animation: clippath 3s infinite linear;
    }
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
```

<div class="content-ad"></div>

다음은 스키매틱 다이어그램과 함께 렌더링 내용입니다:

![FantasticCSSborderanimation_16](/assets/img/2024-06-20-FantasticCSSborderanimation_16.png)

CodePen - 클립 패스 보더 애니메이션

여기서는 요소가 클립된다는 점을 감안하고 가상 요소를 사용하여 클리핑 및 애니메이션용 배경으로 사용할 수 있습니다. clip-path를 사용하면 잘려진 보더가 작은 삼각형을 생성하지 않는다는 것을 기억해 주세요. 동시에 이 방법은 둥근 border-radius모서리도 지원합니다.

<div class="content-ad"></div>

만약 다른 가상 요소를 사용하여 실제로 버튼 스타일을 구현한다면 다음과 같은 효과를 얻을 수 있습니다:

![이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_17.png)

CodePen — clip-path border animation 2

# overflow의 스마트한 활용

<div class="content-ad"></div>

다음 트릭은 오버플로우를 사용하여 구현되었습니다. 이러한 테두리 애니메이션을 구현해보세요:

![border animation](/assets/img/2024-06-20-FantasticCSSborderanimation_18.png)

왜 오버플로우로 구현했다고 말하는 건가요?

도표를 붙여주세요:

<div class="content-ad"></div>


<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_19.png" />

CodePen Demo — Using overflow and transform to achieve line hover effect

Two core points:

- We use overflow: hiddento hide an entire element that was originally outside the container
- used transform-origin, controls the center of rotation of the element


<div class="content-ad"></div>

사실 흥미로운 CSS 효과 대부분이 비슷한 기술을 사용한다는 것을 발견했나요?

간단히 말해, 우리가 보는 애니메이션은 원래 현상의 일부에 불과합니다. 특정한 잘라내기, 투명도 변경, 마스크 등을 통해 우리는 결국 원래 현상의 일부만을 보게 됩니다.

# Border-image의 스마트한 활용

border-image를 사용하여 흥미로운 테두리 애니메이션도 구현할 수 있습니다. border-image에 대해 매우 좋은 설명글이 있습니다 -- border-image의 올바른 사용법, 이 글은 기본 정의에 대해 자세히 설명하지 않습니다.

<div class="content-ad"></div>

만약 이런 그래프가 있다면:

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_20.png" />

비슷한 테두리 패턴을 얻기 위해 다음과 같이 사용할 수 있습니다:

```css
div {
  width: 200px;
  height: 120px;
  border: 24px solid;
  border-image: url(image-url);
  border-image-slice: 32;
  border-image-repeat: round;
}
```

<div class="content-ad"></div>

위와 같이 요소의 높이와 너비를 마음대로 변경할 수 있으므로, 컨테이너 테두리의 크기에 맞춰 확장할 수 있습니다:

![이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_21.png)

코드펜 데모 — border-image 데모

그리고, 이 기사인 — border-image를 사용한 SVG 애니메이션 방법 에서도, 매우 멋진 효과를 낼 수 있는 border animation를 설명했었어요.

<div class="content-ad"></div>

위 예제와의 차이점은 우리가 패턴을 움직이게 할 필요가 있다는 점입니다. 즉, 이러한 배경 이미지가 필요합니다:

![이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_22.png)

그럼, 우리도 움직이는 테두리 맵을 얻을 수 있습니다. 코드는 정확히 같지만, 테두리가 움직입니다:

![이미지](/assets/img/2024-06-20-FantasticCSSborderanimation_23.png)

<div class="content-ad"></div>

CodePen 데모 — 춤추는 해골 테두리

# border-image 및 그라데이션

border-image는 텍스처 참조 url에 추가하여 직접 색상 또는 그라데이션을 채울 수 있습니다.

border-image와 filter, clip-path를 사용하여 그라데이션 변환을 가진 둥근 테두리를 만들 수 있습니다.

<div class="content-ad"></div>

```js
.border-image-clip-path {
    width: 200px;
    height: 100px;
    border: 10px solid;
    border-image: linear-gradient(45deg, gold, deeppink) 1;
    clip-path: inset(0px round 10px);
    animation: huerotate 6s infinite linear;
    filter: hue-rotate(360deg);
}

@keyframes huerotate {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
```

<img src="/assets/img/2024-06-20-FantasticCSSborderanimation_24.png" />

코드펜 데모 - clip-path, border-image 및 필터를 사용하여 둥근 그라데이션 테두리 구현하기

# 마무리하기

<div class="content-ad"></div>

iCSS에 좀 더 멋진 CSS 기술 관련 문서들이 요약되어 있어요.

그리고 아마도 제 CodePen을 좋아하실 거에요. 여기에는 놀라운 CSS 효과가 많아요.

여튼, 이 기사는 여기까지입니다. 도움이 되길 바라요. :)