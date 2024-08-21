---
title: "시니어 개발자도 모르는 CSS 속성과 기술들"
description: ""
coverImage: "/assets/img/2024-05-01-UnveilingHiddenTreasuresLesser-KnownCSSPropertiesandTechniques_0.png"
date: 2024-05-01 23:05
ogImage:
  url: /assets/img/2024-05-01-UnveilingHiddenTreasuresLesser-KnownCSSPropertiesandTechniques_0.png
tag: Tech
originalTitle: "Unveiling Hidden Treasures: Lesser-Known CSS Properties and Techniques"
link: "https://medium.com/dev-genius/unveiling-hidden-treasures-lesser-known-css-properties-and-techniques-1d92716a5ce2"
isUpdated: true
---

<img src="/assets/img/2024-05-01-UnveilingHiddenTreasuresLesser-KnownCSSPropertiesandTechniques_0.png" />

- mix-blend-mode: 창의적 블렌딩 모드

지루한 단색 배경과 직선적인 색에 지쳤나요? mix-blend-mode로 디자인에 창의성을 불어넣어 보세요. 이 속성을 사용하면 요소의 색상을 뒤에 있는 내용과 혼합하여 독특하고 눈에 띄는 효과를 만들 수 있습니다.

```js
div {
  mix-blend-mode: multiply;
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

![image](https://miro.medium.com/v2/resize:fit:1400/1*2PbamXURjubWXJKy1oSWlg.gif)

2. clip-path: 사용자 지정 모양 클리핑

사각형 요소의 제약에서 벗어나 clip-path로 자유롭게 행동하세요. 이 속성을 사용하면 원, 다각형 또는 복잡한 곡선으로 요소에 사용자 지정 클리핑 경로를 정의할 수 있습니다. 지루한 직사각형은 이제 작별하고 동적이고 매력적인 디자인과 인사하세요.

```js
div {
  clip-path: circle(50% at center);
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

![Scroll Snap Example](https://miro.medium.com/v2/resize:fit:1212/1*_S39ZNCxYi2eOIh66HTmKg.gif)

3. scroll-snap-type와 scroll-snap-align: 부드러운 스크롤링 제어

스크롤 가능한 요소의 사용자 경험을 향상시키려면 scroll-snap-type 및 scroll-snap-align을 사용하세요. 이러한 속성을 사용하면 요소를 자동으로 특정 간격이나 위치에 맞춰 부드럽고 직관적인 스크롤 경험을 만들 수 있습니다.

```js
section {
  scroll-snap-type: y mandatory;
}

div {
  scroll-snap-align: start;
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

![이미지](https://miro.medium.com/v2/resize:fit:900/1*nt6BatwGw0hctcRxLiAi_Q.gif)

4. backdrop-filter: 멋진 시각 효과

백드롭 필터(backdrop-filter)로 디자인의 시각적 매력을 한층 높여보세요. 이 속성은 요소 뒤에 있는 영역에 흐림 또는 색상 이동과 같은 그래픽 효과를 적용하여 아름다운 시각적 효과를 만들어내며, 페이지 전체적인 미학을 향상시킵니다.

```js
div {
  backdrop-filter: blur(5px);
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

![image](https://miro.medium.com/v2/resize:fit:1400/1*fn8-zI7MWHBHw73F8P0fBg.gif)

5. will-change: 성능 최적화

요소를 애니메이션화하거나 복잡한 변형을 적용할 때 성능이 저하될 수 있습니다. 여기서 will-change가 등장합니다. 이 속성은 브라우저에 미리 알려주어 요소의 속성이 변경될 것으로 예상되어 렌더링을 최적화하고 부드러운 애니메이션을 제공할 수 있게 합니다.

```js
div {
  will-change: transform;
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

6. shape-outside: 텍스트를 모양 주변으로 감싸기

지루한 직사각형 모양에서 텍스트가 흐르는 것이 지겨우신가요? shape-outside으로 레이아웃에 활력을 불어넣어보세요. 이 속성은 텍스트가 감싸일 사용자 정의 모양을 정의할 수 있게 해주어 주변 요소와 상호작용하는 시각적으로 매력적인 레이아웃을 만들 수 있습니다.

```js
img {
  shape-outside: circle(50%);
}
```

<img src="https://miro.medium.com/v2/resize:fit:1304/1*C5njQ4Z4M216a5M_OEygPA.gif" />

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

7. 오버스크롤 동작 사용자 정의: 스크롤 동작을 제어하세요

오버스크롤 동작을 통해 사용자가 스크롤 가능한 영역 끝에 도달했을 때 웹 페이지가 어떻게 반응하는지 제어하세요. 이 속성을 사용하면 브라우저가 스크롤 오버플로우를 처리하는 방법을 정의할 수 있습니다. 이는 오버플로우를 허용하거나 방지하거나 경계로 다시 되돌아가는 방식 중 어떻게 처리할지를 정할 수 있습니다.

```js
div {
  overscroll-behavior: contain;
}
```

![예시 이미지](https://miro.medium.com/v2/resize:fit:784/1*K_A4_GW4p9mkJzmU_YBUbg.gif)

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

8. 텍스트 방향 및 writing-mode: 수직 텍스트 레이아웃

일부 아시아 스크립트와 같이 위에서 아래로 또는 오른쪽에서 왼쪽으로 전통적으로 읽는 언어에 대해, text-orientation 및 writing-mode은 필수적인 도구를 제공합니다. 이러한 속성들은 텍스트의 방향과 방향을 제어하여 수직 레이아웃을 가능하게하고 접근성을 향상시키는 데 도움을 줍니다.

```js
p {
  writing-mode: vertical-lr;
  text-orientation: upright;
}
```

![수직 텍스트 레이아웃](https://miro.medium.com/v2/resize:fit:1400/1*Wz7buEDtszMgOhHrF-tbTg.gif)

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*4MPGEuRjtxEsaUJ-FEgOhQ.gif)

9. content-visibility: 렌더링 성능 향상

대량의 목록이나 그리드를 다룰 때 렌더링 성능이 저하될 수 있습니다. content-visibility는 브라우저가 오프스크린 콘텐츠를 필요한 경우까지 렌더링을 건너뛸 수 있게 해 성능을 크게 향상시키고 리소스 소비를 줄일 수 있습니다.

```js
ul {
  content-visibility: auto;
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

![image](https://miro.medium.com/v2/resize:fit:1400/1*C2Q223zce9QYqesknQHaNQ.gif)

10. aspect-ratio: Preserving Aspect Ratios

비디오나 컨테이너와 같은 요소들의 비율을 유지하는 것은 어려울 수 있지만, aspect-ratio 속성을 사용하면 이 작업을 간단히 할 수 있습니다. 이 속성을 사용하면 요소의 원하는 종횡비를 지정할 수 있어 내용이나 크기와 관계없이 비례적으로 크기가 조절됨을 보장할 수 있습니다.

```js
div {
  aspect-ratio: 16 / 9;
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

![CSS](https://miro.medium.com/v2/resize:fit:1400/1*FTxfXRBfT7sTlZHRG3oolQ.gif)

CSS는 웹 디자이너와 개발자들에게 다양한 가능성을 제공하는 다재다능한 언어입니다. 여기서 강조된 잘 알려지지 않은 속성과 기술을 탐험함으로써, 여러분의 프로젝트에서 창의성, 효율성, 그리고 성능의 새로운 차원을 개척할 수 있습니다. 이 숨겨진 보석들을 받아들이고, 여러분의 디자인이 새로운 우아함과 기능성으로 번성하는 것을 지켜보세요.
