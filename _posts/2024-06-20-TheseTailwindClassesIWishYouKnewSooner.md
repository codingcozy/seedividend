---
title: "Tailwind 클래스 중에서 이전에 알았더라면 좋았을 것 같은 것들"
description: ""
coverImage: "/assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_0.png"
date: 2024-06-20 00:46
ogImage:
  url: /assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_0.png
tag: Tech
originalTitle: "These Tailwind Classes I Wish You Knew Sooner"
link: "https://medium.com/javascript-in-plain-english/these-tailwind-classes-i-wish-you-knew-sooner-cedd1fec8adb"
isUpdated: true
---

![Tailwind CSS](/assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_0.png)

Tailwind CSS는 빠른 개발과 높은 사용자 정의가 필요한 프런트엔드 프로젝트에 이상적인 강력하고 유연한 CSS 프레임워크입니다. 유틸리티 클래스, 반응형 디자인 지원, 그리고 고도로 사용자 정의가 가능한 구성을 통해 개발자들은 개발 효율성을 향상시키고 코드 일관성을 유지할 수 있습니다.

# 1. isolate

isolate 클래스는 요소가 새로운 쌓임 맥락을 만들지 여부를 제어하는 CSS isolation 속성을 설정하는 데 사용됩니다.

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
<div class="isolate">This element creates a new stacking context</div>
```

더 알아보기: https://tailwindcss.com/docs/isolation

# 2. scroll-snap

scroll-snap 클래스는 수평 또는 수직 스크롤이 있는 컨테이너에 적합한 스크롤 스냅 효과를 구현하는 데 사용됩니다.

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
<div class="scroll-snap-x snap-mandatory overflow-x-auto flex">
  <div class="snap-start">아이템 1</div>
  <div class="snap-start">아이템 2</div>
  <div class="snap-start">아이템 3</div>
</div>
```

더보기: https://tailwindcss.com/docs/scroll-snap-type

# 3. pointer-events

pointer-events 클래스는 요소의 마우스 이벤트 응답 동작을 제어하는 데 사용됩니다.

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
<div class="pointer-events-none">
    해당 요소는 포인터 이벤트를 무시합니다
</div>
<div class="pointer-events-auto">
    해당 요소는 포인터 이벤트에 응답합니다
</div>
```

더보기: https://tailwindcss.com/docs/pointer-events

# 4. truncate

Tailwind CSS에서 truncate는 텍스트 자르기에 사용되는 유틸리티 클래스입니다. 텍스트 내용이 컨테이너의 너비를 초과하는 경우, 생략 부분을 점 세 개(…)으로 표시하여 페이지에서 텍스트가 넘치지 않도록 합니다. 이 유틸리티 클래스는 카드 제목, 테이블 셀 등 고정 너비 텍스트 요소를 표시할 때 유용합니다.

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

## This is a very long title that will be truncated with an ellipsis.

![Image](/assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_1.png)

More details can be found here: [Text Overflow in Tailwind CSS](https://tailwindcss.com/docs/text-overflow)

# 5. Gradients: from, via, to

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

선형 그라디언트는 가장 일반적인 그라디언트 유형입니다. Tailwind CSS는 접두사 from-_, via-_, 및 to-\*를 사용하여 그라디언트의 시작점, 중간점, 및 끝점 색상을 정의하는 클래스를 제공합니다.

```js
<div class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-10 rounded-lg shadow-lg">
  <h1 class="text-2xl font-bold">선형 그라디언트</h1>
  <p class="mt-2">이것은 선형 그라디언트 배경이 있는 상자입니다.</p>
</div>
```

이 예제에서:

- bg-gradient-to-r: 그라디언트 방향을 왼쪽에서 오른쪽으로 정의합니다.
- from-green-400: 그라디언트의 시작 색상을 정의합니다.
- via-blue-500: 그라디언트의 중간 색상을 정의합니다.
- to-purple-600: 그라디언트의 끝 색상을 정의합니다.

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

![이미지](/assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_2.png)

더보기: https://tailwindcss.com/docs/gradient-color-stops

# 6. 애니메이션

Tailwind CSS는 간단한 CSS 애니메이션 효과를 빠르게 추가할 수 있도록 내장된 애니메이션 클래스 세트를 제공합니다. 이 클래스에는 회전, 흔들림, 맥박 등과 같은 일반적인 애니메이션이 포함되어 있어 사용자 지정 CSS를 작성하지 않고도 빠르게 애니메이션을 적용할 수 있습니다.

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

다음은 일반적인 Tailwind CSS 애니메이션 클래스 몇 가지입니다:

- animate-none: 애니메이션을 비활성화합니다.
- animate-spin: 회전 애니메이션
- animate-ping: 펄스 애니메이션
- animate-pulse: 맥박 효과
- animate-bounce: 튕기는 효과

```html
<div class="flex items-center justify-center space-x-4">
  <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  <p class="text-lg font-semibold">로딩 중...</p>
</div>
```

![로딩 중](https://miro.medium.com/v2/resize:fit:1400/1*EgQzEHlcZlmUFIg6W3lWtw.gif)

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

내장된 애니메이션 클래스 외에도 Tailwind CSS를 통해 구성 파일을 통해 애니메이션을 확장하고 사용자 정의할 수 있습니다. Tailwind CSS 구성 파일에 사용자 지정 애니메이션 효과를 추가할 수 있습니다.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 2s infinite",
      },
    },
  },
};
```

이 예시에서는 spin-slow와 ping-slow라는 두 가지 사용자 정의 애니메이션을 추가했으며, 다른 애니메이션 클래스처럼 HTML에 적용할 수 있습니다.

자세히 알아보기: https://tailwindcss.com/docs/animation

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

# 7. 가로세로비

Tailwind CSS는 요소에 특정한 가로세로비를 부여하는 aspect-ratio 플러그인을 제공합니다. 반응형 디자인을 만들거나 이미지, 비디오, 또는 다른 콘텐츠가 올바른 비율로 표시되도록 하는 데 유용합니다.

aspect-ratio 플러그인을 사용하기 전에 설치하고 구성해야 합니다. Tailwind CSS가 이미 설치되어 있다면, 다음 단계를 따라 aspect-ratio 플러그인을 추가할 수 있습니다:

```js
npm install @tailwindcss/aspect-ratio
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

tailwind.config.js 파일에서 다음 플러그인을 추가해주세요:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require("@tailwindcss/aspect-ratio")],
};
```

플러그인을 구성한 후에는 HTML 파일에서 aspect-ratio 클래스를 사용할 수 있습니다.

```js
<div class="aspect-w-16 aspect-h-9">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    class="w-full h-full"
    allowfullscreen
  ></iframe>
</div>
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

더 많은 정보: [https://tailwindcss.com/docs/aspect-ratio](https://tailwindcss.com/docs/aspect-ratio)

## 8. ring

ring 유틸리티는 요소에 링 효과를 적용하는 데 사용됩니다. 이 효과는 요소 주변에 하나 이상의 반투명한 테두리를 그리며 해당 요소를 강조하거나 강조합니다. 박스 그림자와 유사하지만 Tailwind에만 고유 한 ring은 더 유연하고 사용하기 쉬운 옵션을 제공합니다. 예를 들어:

```js
<div class="ring-2 ring-blue-500">이 요소에는 링이 있습니다.</div>
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

위 코드는 너비가 2인 요소 주위에 파란색 링을 그립니다.

링의 색상을 설정하려면 ring-'색상' 클래스를 사용하세요. 불투명도를 조절하려면 값이 0부터 100까지의 범위인 ring-opacity-'값'을 사용하세요. Tailwind는 링을 요소의 외부가 아닌 내부에 그리는 ring-inset 클래스도 제공합니다.

```js
<div class="m-4 p-4">
  <div class="ring-1 ring-black p-4 mb-4">너비가 1인 링</div>
  <div class="ring-2 ring-red-500 p-4 mb-4">빨간색 링이 있는 너비가 2인 링</div>
  <div class="ring-4 ring-green-500 ring-opacity-50 p-4 mb-4">너비가 4이고, 녹색이며 50% 불투명도인 링</div>
  <div class="ring-4 ring-blue-500 ring-inset p-4 mb-4">너비가 4이고 파란색인 내부 링</div>
</div>
```

이 예시는 Tailwind CSS의 ring 클래스를 사용하여 다양한 링 효과를 생성하는 방법을 보여줍니다. 이 유틸리티 클래스를 사용함으로써 프로젝트에 링 효과를 쉽게 추가하여 사용자 인터페이스(UI)의 시각적 효과와 상호작용 경험을 향상시킬 수 있습니다.

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

![이미지](/assets/img/2024-06-20-TheseTailwindClassesIWishYouKnewSooner_3.png)

자세한 내용은 여기를 참조하세요: [링 너비](https://tailwindcss.com/docs/ring-width)

Tailwind CSS는 프론트엔드 개발자에게 강력한 도구이며, 유틸리티 클래스는 그 중 일부에 불과합니다. 이러한 도구들을 워크플로우에 통합하면 개발 프로세스를 간소화하고 동적이고 시각적으로 매력적인 웹 디자인을 만들 수 있습니다. 아직 이러한 클래스를 시도해보지 않았다면 한번 시도해보고 다음 프로젝트에 어떻게 도움이 될 수 있는지 확인해보세요.

# 간단히 설명한 것 🚀

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

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 칭찬하고 팔로우해주십시오 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
