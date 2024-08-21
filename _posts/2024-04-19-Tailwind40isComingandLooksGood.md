---
title: "테일윈드 40 출시, 신기능 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Tailwind 40 is Coming and Looks Good"
link: "https://medium.com/@kristiyan.velkov/tailwind-4-0-is-coming-and-looks-good-e4bb8d976f3c"
isUpdated: true
---

테일윈드 4.0은 더 빠르고 더 좋을 거에요.

![이미지](/assets/img/Tailwind40isComingandLooksGood_0.png)

# 알파 상태의 새로운 기능들을 오늘 바로 시도해보세요

```js
// 테일윈드 버전 4 패키지 설치하기

$ npm install tailwindcss@next @tailwindcss/vite@next
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

```js
// Vite 구성

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```js
// 마지막으로, 주 CSS 파일인 app.css에서 Tailwind를 import합니다.

@import "tailwindcss";
```

그러니 이제 Tailwind 버전 4에서 무엇이 새로운지 강조해 보겠습니다:

# 구성 필요 없는 콘텐츠 감지

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

이전 버전에서는 tailwind.config.js를 생성하고 글로벌 CSS 파일에 세 가지 지시문을 추가해야 했습니다.

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

이제는 config 대신 특별한 지시문 @theme과 함께 CSS 변수를 사용해야 하며, 하나의 지시문만 필요합니다. 아래와 같이 디자인해보세요:

```js
@import "tailwindcss";

@theme {
  --font-family-display: "Satoshi", "sans-serif";
  --breakpoint-4xl: 1920px;
  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
  --color-neon-cyan: oklch(91.3% 0.139 195.8);
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

@theme 지시어는 Tailwind에게 새로운 유틸리티와 변형을 변수에 기반하여 사용할 수 있도록 하도록 지시합니다. 이를 통해 4xl:text-neon-lime과 같은 클래스를 마크업에서 사용할 수 있습니다.

```js
<div class="max-w-lg 4xl:max-w-xl">
  <h1 class="font-display text-4xl">
    Data to <span class="text-neon-cyan">enrich</span> your online business
  </h1>
</div>
```

새로운 CSS 변수를 추가하는 것은 이전 버전의 프레임워크에서 extend가 작동했던 것과 같은 방식으로 동작하지만, --color-\*: initial과 같은 구문을 사용하여 사용자 정의 값들을 정의하기 전에 변수 네임스페이스를 지우는 것으로 모든 사용자 정의 값들을 재정의할 수 있습니다:

main.css

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
@테마 {
  --color-*: 초기값;
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-green-800: #3f6212;
  --color-green-900: #365314;
  --color-green-950: #1a2e05;
}
```

기본 테마를 명시적으로 지우고 처음부터 시작하고 싶지 않은 경우, "tailwindcss/preflight"와 "tailwindcss/utilities"를 가져와서 기본 테마를 가져오지 않고 바로 시작할 수 있습니다:

main.css

```js
@import "tailwindcss";
@import "tailwindcss/preflight" layer(base);
@import "tailwindcss/utilities" layer(utilities);

@테마 {
  --color-*: 초기값;
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  /* ... */
  --color-green-800: #3f6212;
  --color-green-900: #365314;
  --color-green-950: #1a2e05;
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

# 조합 가능한 변형

새 아키텍처를 통해 다른 선택기에 영향을 주는 변형을 함께 구성할 수 있게 되었습니다. 예를 들어 group-_, peer-_, has-* 및 새로운 not-*와 같은 변형이 있습니다.

이전 릴리스에서는 group-has-*와 같은 변형이 명시적으로 프레임워크에 정의되었습니다. 그러나 이제 group-*는 기존 has-\* 변형과 함께 구성될 수 있으며, 이는 focus와 같은 다른 변형과도 조립될 수 있습니다.

index.html

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
<div class="group">
  <div class="group-has-[&:focus]:opacity-100">
  <div class="group-has-focus:opacity-100">
  </div>
</div>h
```

# 변경 사항

- PostCSS 플러그인과 CLI는 별도의 패키지로 나뉘어졌습니다 — 이제 주요 tailwindcss 패키지에 이들이 포함되어 있지 않습니다. 모두가 필요하지는 않기 때문에 대신 @tailwindcss/postcss와 @tailwindcss/cli를 사용하여 별도로 설치해야 합니다.
- 기본 테두리 색상이 없습니다 — 테두리 유틸리티는 과거에는 gray-200으로 기본 설정되어 있었지만, 이제 브라우저처럼 currentColor가 기본값입니다. 주로 아연(Abzinc)이나 슬레이트(Slate)와 같은 다른 회색을 주 색상으로 사용하는 경우 프로젝트에 잘못된 회색이 실수로 포함되는 것을 방지하기 위해 이 변경을 하였습니다.
- 링은 기본적으로 1픽셀입니다 — 링 유틸리티는 과거에는 기본적으로 3픽셀 블루 링이었지만, 이제는 currentColor를 사용하여 1픽셀 링이 기본값입니다. 저희는 프로젝트에서 테두리 대신 링-* 유틸리티를 사용하고 있으며, 포커스 링을 위해서는 outline-*을 사용하고 있기 때문에 일관성 있는 변경이 도움이 될 것이라고 생각합니다.

# 4.0 버전 도입 계획

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

- 명시적 콘텐츠 경로 구성 - 템플릿이 자동 콘텐츠 감지에 충분하지 않을 때 Tailwind에게 정확한 템플릿 위치를 알려줄 수 있게 합니다.
- 다른 다크 모드 지원 - 현재는 미디어 쿼리를 사용해서 다크 모드만 지원하고 있습니다. 선택기 및 변형 전략을 다시 구현해야 합니다.
- 접두사 지원 - 아직 클래스에 접두사를 구성할 수 있는 방법이 없지만, 반드시 다시 제공할 것입니다.
- Safelists 및 blocklists - 아직 Tailwind에게 특정 클래스를 생성하도록 강제할 수도, 생성하지 못하도록 막을 수도 없습니다.
- !important 구성 지원 - 지금은 모든 유틸리티가 !important와 함께 생성될 수 있는 방법이 없지만, 구현할 계획이 있습니다.
- theme() 함수 지원 - 지금은 var()를 사용할 수 있기 때문에 새 프로젝트에는 필요 없지만, 역호환성을 위해 구현할 예정입니다.
- 독립형 CLI - 새 엔진을 위한 독립형 CLI에 대해서는 아직 작업하지 않았지만, v4.0 릴리스 전에 반드시 구현할 것입니다.

# 결론

Tailwind CSS 4는 웹 개발자들이 작업 흐름을 최적화하고 아름다운 반응형 웹사이트를 만드는 데 유용한 강력하고 다재다능한 도구입니다. 성능 향상, 확장된 색상 팔레트, 개선된 사용자 정의 기능, 새로운 유틸리티 클래스, 접근성에 중점을 둔 Tailwind CSS 4는 개발자들에게 필수 도구가 될 것입니다. 작은 프로젝트든 대규모 응용프로그램이든, Tailwind CSS 4는 웹 디자인을 현실로 만드는 데 필요한 기능과 유연성을 제공합니다.

❤️ 만약 제 작업을 좋아하신다면, 제를 팔로우하고 구독해주세요 ❤️

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

- 나를 팔로우하세요
- 구독하기
- LinkedIn
- Front-end World를 방문하고 구독하세요.
