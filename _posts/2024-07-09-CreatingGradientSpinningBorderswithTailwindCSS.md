---
title: "Tailwind CSS로 그라데이션 스피닝 보더 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_0.png"
date: 2024-07-09 18:01
ogImage:
  url: /assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_0.png
tag: Tech
originalTitle: "Creating Gradient Spinning Borders with Tailwind CSS"
link: "https://medium.com/@akshitdayal99/creating-gradient-spinning-borders-with-tailwind-css-7c7f8a3d242b"
---

![Image](/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_0.png)

우리는 다소 복잡하지 않은 작업에 Tailwind를 좋아합니다. 하지만 여전히 Tailwind를 사용하여 우리의 개인적인 창의성을 현실로 만드는 데는 약간의 노력이 필요합니다. 오늘은 인기있는 요령을 사용하여 Tailwind에서 Gradient 테두리를 다루는 방법을 보여드릴 거에요.

다음과 같은 것들을 만드는 방법을 볼 거에요:

- 그라데이션 테두리
- 그라데이션 발광 효과
- 그라데이션 회전 테두리
- 투명 네온 회전 원

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

# Tailwind Gradient Border

![image](/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_1.png)

그라데이션 테두리 효과를 만들기 위한 한 가지 꿀팁은 우리가 보여 주고 싶은 div 아래에 그라데이션 div를 넣는 것입니다.

우리는 "relative" 위치를 가진 부모 div를 사용하여 이 작업을 수행할 수 있습니다. 그 부모 div의 자식 요소에는 그라데이션 div와 위에 있는 우리 div가 포함됩니다. 다음과 같이 할 수 있습니다:

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
<!-- 부모 Div -->
<div class="w-[20%] h-[60px] flex justify-center items-center relative">

    <!-- 기본 그라데이션 Div-->
    <div class="absolute w-full h-full inset-0 rounded-lg bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500"></div>

    <!-- 주요 Div --- 상위에 그라데이션 Div이 보이도록 relative를 사용합니다 -->
    <div class="relative w-[96%] h-[96%] bg-black rounded-lg p-4">
        <p class="ml-2 text-2xl">그라데이션 테두리</p>
        <p class="mt-2">원래 표시하려는 내용입니다.</p>
    </div>

</div>
```

만약 아래 이미지처럼 배경이 보이도록 하려면, 아래 코드를 사용하세요:

<img src="/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_2.png" />

```js
<!-- 그라데이션 테두리를 위해 -->
<div class="absolute inset-0 rounded-lg -translate-x-1 translate-y-1 bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500"></div>
<div class="relative bg-black rounded-lg p-4">
    <p class="ml-2 text-xl">반 테두리</p>
</div>
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

만약 배경을 흐릿하게 만들고 싶다면 Gradient div에 "blur"를 추가할 수 있어요. 이렇게 하면 됩니다:

![Image](/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_3.png)

```js
<div class="blur absolute inset-0 rounded-lg -translate-x-1 translate-y-1 bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500"></div>
```

# 그라데이션 형광 배경 효과

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 배경을 빛나는 효과를 내기 위해 간단한 트릭은 점차 기울이는 애니메이션을 사용하여 빛나는 것처럼 보이도록 하는 것입니다.

이를 위해 먼저 tailwind.config.js 파일로 이동하여 다음과 같이 keyframes 및 animation을 추가하여 파일을 수정해야 합니다:

```js
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        tilt: "tilt 3s linear infinite",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1.5deg)" },
          "75%": { transform: "rotate(-1.5deg)" },
        },
      },
    },
  },
  plugins: [],
};
```

rotate()의 숫자를 늘려 rotate(5deg) 및 rotate(-5deg) 또는 원하는 값에 따라 수를 증가시켜 기울이기를 늘릴 수 있습니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이제 이 애니메이션을 그라디언트 `div`에 다음과 같이 추가할 수 있어요:

```js
<div class="absolute w-full h-full blur rounded-lg bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500 animate-tilt"></div>
```

# 그라디언트 회전 테두리

<img src="/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_4.png" />

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

여기에서는 네온 효과를 주기 위해 세 개의 원형 div를 사용하고 있어요. Tailwind에서 그라디언트 그림자를 만드는 것이 쉽지 않기 때문이에요.

```js
<div class="flex w-[200px] h-[200px] justify-center items-center relative">
  <div class="w-[110%] h-[110%] shadow-lg shadow-pink-500 bg-transparent rounded-full absolute"></div>
  <div class="w-[108%] h-[108%] shadow-lg shadow-violet-500 bg-transparent rounded-full absolute rotate-90"></div>
  <div class="w-[106%] h-[106%] shadow-lg shadow-cyan-500 bg-transparent rounded-full absolute rotate-180"></div>
</div>
```

여기서 rotate-90 및 rotate-180을 사용하여 div 및 그림자를 회전시켜 원형 효과를 줍니다. 배경은 투명하므로 원하는 배경 이미지가 여전히 보이게 됩니다.

이것은 주로 여러분이 사용하는 메인 div들을 이 것 아래에 추가하면 돼요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

내용을 이 원 안에 넣으려면 다음과 같이 코드를 작성할 수 있어요:

<img src="/ui-log-2/assets/img/2024-07-09-CreatingGradientSpinningBorderswithTailwindCSS_5.png" />

```js
<div class="relative flex justify-center items-center">
  <div class="absolute">
    <div class="flex w-[200px] h-[200px] justify-center items-center relative">
      <div class="w-[110%] h-[110%] shadow-lg shadow-pink-500 bg-transparent rounded-full absolute "></div>
      <div class="w-[108%] h-[108%] shadow-lg shadow-violet-500 bg-transparent rounded-full absolute rotate-90"></div>
      <div class="w-[106%] h-[106%] shadow-lg shadow-cyan-500 bg-transparent rounded-full absolute rotate-180"></div>
    </div>
  </div>

  <p>Your div here</p>
</div>
```

# 네온 회전하는 원

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이 원들을 돌리려면 회전 애니메이션을 추가할 수 있어요.

이를 위해 우리는 tailwind.config.js로 이동해서 다음과 같이 keyframes를 작성할 거예요:

```js
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        // {...}
        spin_right: "spin_right 3s linear infinite",
        spin_right_fast: "spin_right 2s linear infinite",
        spin_left: "spin_left 3s linear infinite",
      },
      keyframes: {
        // {...}
        spin_right: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin_left: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-180deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
```

이제, 바깥쪽과 안쪽 원을 시계 방향으로, 중간 원을 반시계 방향으로 돌리겠어요.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

```js
<div class="flex w-[200px] h-[200px] justify-center items-center relative">
  <div class="w-[110%] h-[110%] shadow-lg shadow-pink-500 bg-transparent rounded-full absolute animate-spin_right"></div>
  <div class="w-[108%] h-[108%] shadow-lg shadow-violet-500 bg-transparent rounded-full absolute animate-spin_left"></div>
  <div class="w-[106%] h-[106%] shadow-lg shadow-cyan-500 bg-transparent rounded-full absolute animate-spin_right_fast"></div>
</div>
```

이 마크다운 형식의 테이블을 사용하는 것이 범위 경계에 대해 도움이 되길 바라요. 곧 사각형 그라데이션 테두리에 대한 다른 게시물을 작성할 거예요.

이 글이 도움이 되었기를 바라요! 즐거운 코딩하세요 :D
