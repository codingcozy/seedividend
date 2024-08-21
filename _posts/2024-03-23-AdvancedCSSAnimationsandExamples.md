---
title: "고급 CSS 애니메이션 만드는 방법 3가지"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Advanced CSS Animations and Examples"
link: "https://medium.com/@eleftheriabatsou/advanced-css-animations-and-examples-7199e19f6e5d"
isUpdated: true
---

## Keyframes, transforms, and transitions. 어떻게 동적이고 매력적인 애니메이션을 만들기 위해 사용될 수 있는지.

![Advanced-CSS-Animations-and-Examples_0.png] (/assets/img/고급-CSS-애니메이션과-예제\_0.png)

웹 디자인 분야에서 애니메이션은 사용자의 주의를 끌고 동적이고 몰입적인 경험을 만드는 데 중요한 역할을 합니다. 이 글에서는 몇 가지 고급 CSS 애니메이션과 예제를 소개해 드리겠습니다. 우리는 키프레임, 변형, 그리고 전환에 대해 논의할 예정입니다.

# Keyframes: 동적인 모션을 만들어내는 방법

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Keyframes는 CSS 애니메이션의 기본이며 복잡하고 다단계 애니메이션을 만들 수 있게 합니다. 여러 개의 keyframes를 포함한 예제를 살펴보겠습니다:

```js
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.element {
  animation: pulse 2s infinite;
}
```

여기서 pulse 애니메이션은 요소를 20% 확대하고 다시 원래 크기로 반복하여 떨리게 만듭니다.

CSS 애니메이션의 Keyframes는 애니메이션 과정을 정밀하게 제어할 수 있어 복잡한 움직임 시퀀스를 만들 수 있습니다. 추가 예제를 살펴보겠습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 여러 키프레임을 사용한 순차 애니메이션

```js
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.ball {
  animation: bounce 1s infinite;
}
```

이 예시에서 bounce 애니메이션은 서로 다른 키프레임 비율에서 translateY 속성을 변경하여 공이 위아래로 튀게 만듭니다.

## 복잡한 애니메이션 순서

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
@키프레임 spinAndColor {
  0% { transform: rotate(0); background-color: #3498db; }
  50% { transform: rotate(180deg); background-color: #e74c3c; }
  100% { transform: rotate(360deg); background-color: #2ecc71; }
}

.spinner {
  animation: spinAndColor 3s infinite;
}
```

이 spinAndColor 애니메이션은 회전과 배경색 변경을 결합하여 요소의 회전 주기 동안 색상을 전환하는 회전 효과를 만듭니다.

## 투명도와 크기 애니메이션

```js
@키프레임 fadeAndGrow {
  0% { 투명도: 0; 변환: 확대(0); }
  50% { 투명도: 0.7; 변환: 확대(1.2); }
  100% { 투명도: 1; 변환: 확대(1); }
}

.box {
  animation: fadeAndGrow 2s ease-in-out alternate infinite;
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기, fadeAndGrow 애니메이션은 요소를 서서히 희미해지면서 동시에 확대하여 부드럽고 매력적인 효과를 만듭니다.

키프레임 애니메이션 결합

```js
@keyframes move {
  0% { transform: translateX(0); }
  50% { transform: translateX(200px); }
  100% { transform: translateX(0); }
}

@keyframes rotate {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}

.element {
  animation: move 4s infinite, rotate 2s infinite alternate;
}
```

이 예시는 두 개의 별도 키프레임 애니메이션(move 및 rotate)이 동시에 적용된 요소에 대해 수행되어 수평으로 이동하면서 동시에 회전할 수 있도록 가능케 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 변형: 요소 모양 변경

CSS 변형은 요소를 이동, 회전, 확대 또는 비틀 수 있는 여러 가지 가능성을 제공합니다. 여러 변형을 결합한 예제를 살펴보겠습니다:

```js
.box {
  transform-origin: center;
  transition: transform 0.5s ease-in-out;
}

.box:hover {
  transform: rotate(180deg) scale(1.5);
}
```

이 예에서 상자 요소를 가리킬 때, 요소가 중심을 중심으로 시계 방향으로 180도 회전하면서 동시에 원래 크기의 1.5배로 확대됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 여러 개의 변형 함수를 결합하기

```js
.element {
  transform: translate(20px, 20px) rotate(45deg) scale(1.5) skew(20deg, 10deg);
}
```

여기서 .element는 동시에 여러 개의 변형을 겪습니다. 수평으로 20픽셀, 수직으로 20픽셀 이동하며, 45도 회전하고, 원래 크기의 150%로 확대하며, 수평으로 20도, 수직으로 10도 기울입니다.

## 3D 변형

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
.cube {
  transform-style: preserve-3d;
  transform: rotateY(45deg) rotateX(45deg);
}
```

preserve-3d를 rotateY와 rotateX와 함께 사용하여 이 예제는 Y축과 X축을 중심으로 회전하여 3D 큐브 효과를 만듭니다.

## Transform Origin and Transition

```js
.square {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  transition: transform 0.3s ease-in-out;
}

.square:hover {
  transform: rotate(180deg);
  transform-origin: top left;
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

정사각형 요소를 가리킬 때 지정된 transform-origin으로 인해 180도 돌아가는 부드러운 회전 효과가 생성됩니다.

## Keyframes를 사용한 Transform

```js
@keyframes growAndRotate {
  0% { transform: scale(1) rotate(0); }
  50% { transform: scale(1.5) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

.shape {
  animation: growAndRotate 3s infinite;
}
```

growAndRotate 키프레임 애니메이션은 .shape 요소를 점차 확대하고 회전시키며, 성장 후 180도 뒤집히고 전체 360도 회전하는 시퀀스를 만듭니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

CSS 변환은 창의적으로 결합하고 적용할 때, 웹사이트/앱의 시각적 효과를 놀라우게 향상시키며 사용자 상호작용을 향상시킬 수 있습니다. 각 변환 함수의 세세한 부분을 이해하고 그들의 조합을 탐험함으로써, 웹 요소의 미적 감각과 상호작용성을 상당히 높일 수 있습니다.

## 전이

전이는 지정된 기간 동안 CSS 속성 값의 부드러운 변경을 제공하여 CSS 애니메이션을 보완합니다. 좀 더 복잡한 전이 예제를 살펴봅시다:

## 매끈한 요소 변경

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
.button {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.button:hover {
  transform: rotateY(180deg);
  color: #fff;
  background-color: #3498db;
  border-color: #3498db;
}
```

버튼 위에 마우스를 올리면 변환(플립 효과), 색상 변경 및 테두리 조정이 트리거됩니다. 모두 사용자 정의 cubic-bezier 타이밍 함수를 사용하여 0.3초 동안 부드럽게 전환됩니다.

## 사용자 지정 타이밍 함수

```js
.element {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.element:hover {
  transform: scale(1.5);
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

사용자 정의 cubic-bezier 타이밍 함수를 적용하여 `.element`이 호버될 때 부드럽게 확대되며, 전환에 대한 고유한 애니메이션 곡선을 제공합니다.

## 다중 속성 전환

```js
.button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: #3498db;
  color: #fff;
}
```

여기서는 버튼 요소의 `background-color` 및 `color` 속성 모두에 전환 효과가 적용되어, 호버 효과가 발생할 때 두 속성 모두 부드럽게 변경됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

트랜지션 지연

```js
.box {
  transition: transform 0.3s ease-in-out 0.2s;
}

.box:hover {
  transform: rotate(180deg);
}
```

트랜지션에 0.2초의 지연을 추가하면 변환(이 경우 회전)이 호버 이벤트 후에 약간의 지연으로 시작됩니다.

## 높이와 너비의 트랜지션

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
.box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}

.box:hover {
  width: 150px;
  height: 150px;
}
```

상자 위에 마우스를 올리면 부드럽게 너비와 높이가 변화하여 100x100px에서 150x150px로 커지는 부분을 부드러운 애니메이션 효과로 보여줍니다.

다양한 속성, 타이밍 함수 및 딜레이를 결합하여 전환으로 정적 요소를 인터랙티브 구성 요소로 변환함으로써 웹 상호 작용을 직관적이고 매력적으로 만들 수 있습니다!

# Quicky: 고급 애니메이션 속성

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

기본적인 내용을 넘어서서, 몇 가지 잘 알려지지 않은 고급 애니메이션 속성을 살펴보겠습니다:

- animation-timing-function: 고유한 cubic-bezier 함수를 사용하여 독특한 애니메이션 가속 및 감속 효과를 만드는 방법.
- animation-play-state: JavaScript를 사용하여 애니메이션 상태를 제어하여 동적으로 애니메이션을 일시 중지하고 다시 재개하는 방법.
- will-change: 어떤 속성이 변경될 가능성이 높은지 브라우저에 알려주어 애니메이션을 최적화하여 성능을 향상시키는 방법.

# 결론

CSS 애니메이션의 힘을 활용하고 고급 기술을 탐구함으로써, 매력적이고 상호작용성 있는 웹 경험을 만들 수 있습니다. 이러한 기술은 창의성과 혁신의 문을 열어줍니다. 사용자의 관심을 사로잡고 전반적인 사용자 경험을 높일 수 있는 기억에 남고 매력적인 디지털 콘텐츠를 만들 수 있게 해줍니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

키프레임, 변형, 트랜지션 및 고급 애니메이션 속성을 확실히 이해하면 정적 디자인을 매력적이고 동적인 걸작으로 변형하는 고급 웹 애니메이션의 세계로 자신있게 진출할 수 있습니다. 실험과 탐험이 중요합니다. 도전하고 경계를 넓혀 예외적인 웹 애니메이션을 만들어보세요.

👋 안녕하세요, 저는 커뮤니티 매니저이자 개발자, 공개 연설자, 콘텐츠 크리에이터인 Eleftheria입니다.

🥰 만약 이 기사를 좋아하셨다면 공유해주시기 바랍니다.

🔗 모든 링크 | X | 링크드인

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

사이트: https://blog.eleftheriabatsou.com
게시 날짜: 2024년 1월 2일.
