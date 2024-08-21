---
title: "HTML5 svg 태그로 이모지 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_0.png"
date: 2024-06-27 18:04
ogImage:
  url: /assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_0.png
tag: Tech
originalTitle: "Creating emojis with HTML5 <svg> tag"
link: "https://medium.com/@hello_im_kvy/creating-emojis-with-html5-svg-tag-d65afbbf01e4"
isUpdated: true
---

이미지를 추가한 코드입니다.

`svg` 태그는 서로 다른 모양을 담는 컨테이너이며, 각 모양은 컨테이너 내의 특정 지점에 배치될 수 있습니다. 다음은 `svg` 태그를 살펴봅시다.

```js
<svg width="100" height="100" viewbox="0 0 100 100"></svg>
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

폭(width)과 높이(height) 속성은 컨테이너의 크기를 나타냅니다. 폭과 높이를 늘릴수록 이미지의 크기도 컨테이너에 맞게 조정됩니다. Viewbox 속성은 컨테이너의 좌표를 정의합니다.

| viewbox = “x y width height”

<img src="/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_1.png" />

기본 모양은 문서 내에 요소를 만들어 컨테이너에 삽입할 수 있습니다. 저희가 이모지를 만들 때 사용할 기본 모양은 원과 사각형입니다.

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

우리 이모지를 만드는 데 사용되는 기본 모양입니다

원

원을 만들려면 `circle` 요소를 사용하고 속성을 사용하여 색상과 스타일을 추가합니다.

```js
<circle cx="100" cy="100" r="50" fill="black" />
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

cx — SVG 태그에서 지정된 너비를 기준으로 x 좌표 지점, cy — SVG 태그에서 지정된 높이를 기준으로 y 좌표 지점, r — 원의 반지름, fill — 색상값을 입력합니다.

사각형

우리는 `rect` 요소를 사용하여 직사각형을 생성하고 속성을 사용하여 색상과 스타일을 추가합니다.

```js
<rect x="35" y="65" width="30" height="5" fill="black" />
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

x — x 좌표 위치, y — y 좌표 위치, width — 사각형의 너비, height — svg 태그에 대한 높이, fill — 색을 값으로 취합니다.

중립적인 얼굴 이모지

<img src="/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_2.png" />

```js
코드 스니펫
<svg width=”100" height=”100" viewbox=”0 0 100 100">
 <circle cx=”50" cy=”50" r=”40" fill=”yellow” stroke=”black” stroke-width=”5"/> //얼굴
 <circle cx=”35" cy=”40" r=”5" fill=”black”/> //왼쪽 눈
 <circle cx=”65" cy=”40" r=”5" fill=”black”/> //오른쪽 눈
 <rect x=”35" y=”65" width=”30" height=”5" fill=”black”/> //입
</svg>
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

웃는 얼굴

<img src="/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_3.png" />

```js
<svg width="100" height="100" viewbox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="5" /> //얼굴
  <circle cx="35" cy="63" r="5" fill="black" /> //왼쪽 눈
  <circle cx="65" cy="63" r="5" fill="black" /> // 오른쪽 눈
  <circle cx="50" cy="40" r="15" fill="none" stroke="black" stroke-width="5" />
  //입구
  <rect x="30" y="60" width="40" height="18" fill="yellow" /> //원의 상단 절반을 덮는 사각형
</svg>
```

거꾸로 된 웃는 얼굴

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

![SVG](/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_4.png)

```js
<svg width="100" height="100" viewbox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="5" />
  <circle cx="50" cy="45" r="15" fill="none" stroke="black" stroke-width="5" />
  <rect x="30" y="45" width="40" height="18" fill="yellow" /> //to hide the lower part of the circle
  <circle cx="35" cy="67" r="5" fill="black" />
  <circle cx="65" cy="67" r="5" fill="black" />
</svg>
```

Frowning face

![SVG](/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_5.png)

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
<svg width="100" height="100" viewbox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="5" />
  <circle cx="35" cy="37" r="5" fill="black" />
  <circle cx="65" cy="37" r="5" fill="black" />
  <circle cx="50" cy="69" r="11" fill="none" stroke="black" stroke-width="5" />
  <rect x="32" y="70" width="36" height="13" fill="yellow" /> //아래 반원을 가리는데 사용됩니다
</svg>
```

놀라운 모습

<img src="/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_6.png" />

```js
<svg width="100" height="100" viewbox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="yellow" stroke="black" stroke-width="5" />
  <circle cx="35" cy="37" r="5" fill="black" />
  <circle cx="65" cy="37" r="5" fill="black" />
  <circle cx="50" cy="65" r="10" fill="black" />
</svg>
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

<img src="/assets/img/2024-06-27-CreatingemojiswithHTML5svgtag_7.png" />

읽어 주셔서 감사합니다. 즐거운 하루 되세요!
