---
title: "hsl과 rgb로 스타일링 쉽게 하기 상대 색상과 투명도 활용 방법"
description: ""
coverImage: "/assets/img/2024-07-09-SimplifyingStylingwithhslandrgbLeveragingRelativeColorsandOpacity_0.png"
date: 2024-07-09 14:06
ogImage:
  url: /assets/img/2024-07-09-SimplifyingStylingwithhslandrgbLeveragingRelativeColorsandOpacity_0.png
tag: Tech
originalTitle: "Simplifying Styling with hsl() and rgb(): Leveraging Relative Colors and Opacity"
link: "https://medium.com/@guhaprasaanth/simplifying-styling-with-hsl-and-rgb-leveraging-relative-colors-and-opacity-1d4161ec0cf4"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-SimplifyingStylingwithhslandrgbLeveragingRelativeColorsandOpacity_0.png)

색상으로 스타일링하는 것은 웹 개발의 기본적인 측면으로, 미적인 면과 사용자 경험에 모두 영향을 미칩니다. CSS에서 사용되는 두 가지 인기 있는 색상 모델은 HSL (색조, 채도, 명도)과 RGB (빨강, 녹색, 파랑)입니다. 각 모델은 상대적인 색상 및 불투명도 처리 시 특히 색상 관리를 간단화하는 독특한 장점을 제공합니다. 이 기사에서는 hsl() 및 rgb()가 스타일링을 더 쉽게 만드는 방법, 각각의 이점 및 사용 사례에 대한 실제 예시를 탐구합니다.

# HSL과 RGB 이해

## HSL (색조, 채도, 명도)

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

HSL 색 모델은 색상을 색상, 채도 및 밝기로 표현합니다:

- 색상: 0부터 360도의 색상 바퀴 상에서 표현된 색상 유형입니다.
- 채도: 색의 강도로, 0% (회색)에서 100% (전체 색상)까지입니다.
- 밝기: 색의 밝기로, 0% (검정)에서 100% (흰색)까지입니다.

구문:

```js
color: hsl(색상, 채도%, 밝기%);
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

예시:

```js
color: hsl(120, 50%, 50%); /* 중간 녹색 */
```

## RGB (빨강, 초록, 파랑)

RGB 색 모델은 0부터 255까지의 강도로 빨강, 초록 및 파랑 광을 결합하여 색상을 표현합니다.

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

문법:

```js
color: rgb(red, green, blue);
```

예시:

```js
color: rgb(0, 128, 0); /* 중간 녹색 */
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

# HSL 스타일링의 장점

## 1. 직관적인 색상 조정

색조 조절: 쉽게 색조를 조절하여 동일한 색상의 다른 음영을 만들 수 있습니다. 예시:

```js
.primary {
  color: hsl(200, 70%, 50%); /* 파란색 */
}
.secondary {
  color: hsl(220, 70%, 50%); /* 약간 다른 음영의 파란색 */
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

채도 및 명도 조절: 채도와 명도를 조절하여 색조, 음영, 그리고 톤을 만들어 보세요. 예시:

```js
.light-blue {
  color: hsl(200, 70%, 70%); /* 더 밝은 파란색 */
}
.dark-blue {
  color: hsl(200, 70%, 30%); /* 더 어두운 파란색 */
}
```

## 2. 일관된 색상 관계

색조를 일정하게 유지하면서 채도와 명도를 조절함으로써 일관된 색채 구성을 유지하기 쉽습니다. 예시:

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
.primary {
  color: hsl(150, 50%, 50%); /* 기본 녹색 */
}
.secondary {
  color: hsl(150, 50%, 40%); /* 같은 녹색의 짙은 음영 */
}
.accent {
  color: hsl(150, 50%, 60%); /* 같은 녹색의 밝은 음영 */
}
```

## 3. 가독성 및 유지보수

HSL 값은 RGB보다 사람이 읽고 이해하기 쉽기 때문에 색상을 식별하고 수정하기 쉽습니다. 예시:

```js
.header {
  color: hsl(300, 70%, 50%); /* 보라색 */
}
.footer {
  color: hsl(300, 70%, 30%); /* 짙은 보라색 */
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

# RGB를 사용하는 이유

## 1. 색상 표현의 정밀성

RGB는 빨강, 초록, 파랑 성분의 강도를 정밀하게 조절할 수 있어 특정 색상을 달성하는 데 유용합니다. 예시:

```js
.primary {
  color: rgb(255, 99, 71); /* 토마토 빨강 */
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

## 2. 호환성과 지원

RGB는 다양한 플랫폼과 도구에서 널리 지원되고 이해되어 일관된 색상 표현을 보장합니다. 예시:

```js
.background {
  background-color: rgb(240, 248, 255); /* 앨리스 블루 */
}
```

## 3. 다른 색상 모델과의 통합

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

RGB는 다른 색 모델(예: HEX)로 쉽게 변환할 수 있으며 종종 알파 투명도(rgba)와 함께 사용됩니다. 예시:

```js
.transparent-bg {
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 블랙 */
}
```

# HSL 및 RGB를 사용한 불투명도 처리

## HSL(HSLA)에서 불투명도

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

다음은 HSL 모델에 알파 채널을 추가하며 불투명도를 조절할 수 있는 HSLA입니다. 구문:

```js
color: hsla(색상, 채도%, 밝기%, 알파);
```

예시:

```js
.transparent-blue {
  color: hsla(200, 70%, 50%, 0.5); /* 50% 투명한 파란색 */
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

## RGB( RGBA)에서 불투명도

RGBA는 불투명도 제어를 위해 RGB 모델에 알파 채널을 추가합니다. 구문:

```js
color: rgba(red, green, blue, alpha);
```

예시:

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
.transparent-red {
  color: rgba(255, 0, 0, 0.5); /* 50% 반투명 빨강 */
}
```

# 실용적인 예제 및 사용 사례

## HSL을 사용한 테마 설정

라이트 테마와 다크 테마:

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
:root {
  --primary-hue: 220;
  --primary-saturation: 60%;
  --primary-lightness-light: 70%;
  --primary-lightness-dark: 40%;
}

body.light-theme {
  color: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness-light));
}

body.dark-theme {
  color: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness-dark));
}
```

## Gradients with RGBA

Creating Smooth Transitions:

```js
.background-gradient {
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.8),
    rgba(255, 165, 0, 0.8),
    rgba(255, 255, 0, 0.8)
  );
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

# 결론

CSS 스타일링에서 HSL과 RGB는 각자의 독특한 장점을 가지고 있습니다. 특히 상대적인 색상과 투명도를 다룰 때 유용합니다. HSL은 직관적인 조정과 일관된 색상 관계를 제공하여 색상 구성을 만들고 유지하는 데 이상적입니다. RGB는 정밀성과 넓은 호환성을 제공하여 특정 색상 요구 사항과 다른 모델과의 통합에 신뢰성 있는 선택지가 됩니다.

HSL과 RGB의 강점을 이해하고 활용함으로써 개발자들은 스타일링 프로세스를 간단하게 만들고 가독성과 유지 관리성을 향상시킬 수 있으며 시각적으로 매력적이고 일관된 사용자 인터페이스를 만들 수 있습니다. 색상을 프로그래밍적으로 다루거나 디자인을 세밀하게 조정하는 경우에도 이러한 색상 모델은 원하는 결과를 달성하기 위해 필요한 유연성과 통제력을 제공합니다.
