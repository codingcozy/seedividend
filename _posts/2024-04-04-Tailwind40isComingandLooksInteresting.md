---
title: "Tailwind 40 출시 내용 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Tailwind 40 is Coming and Looks Interesting"
link: "https://blog.devgenius.io/tailwind-4-0-is-coming-and-looks-interesting-8534f66dcab3"
isUpdated: true
---





Tailwind를 많이 사용하는 편인데, 그 유연성 때문이죠. Tailwind 4.0은 빠르고 더 좋을 거에요. 변경 사항을 살펴보도록 해요.

![제목 없음](/assets/img/Tailwind40isComingandLooksInteresting_0.png)

## 간단한 구성

현재 버전에서는 tailwind.config.js 파일을 만들고 css 파일에 세 가지 지시문을 추가해야 합니다.

<div class="content-ad"></div>

```js
@tailwind 기본;
@tailwind 구성 요소;
@tailwind 유틸리티;
```

이제 하나의 지시문으로 변경하고, 설정 대신 특별한 지시문 @theme을 사용하여 css 변수를 사용해야 합니다. 아래와 같이 정의합니다:

```js
@import "tailwindcss";

@theme {
  --font-family-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
  --color-neon-cyan: oklch(91.3% 0.139 195.8);
}
```

현재 버전에서는 css 변수를 정의하고 구성에서 사용해야 했습니다. 구성에 정의한대로 구성 요소에서 사용할 수 있습니다.

<div class="content-ad"></div>

이제 위와 같이 사용할 수 있는 색상 중에 예를 들면, 노랑색-라임이 있어요:

```js
<div className="text-neon-lime">예쁜 텍스트</div>
```

## 그들은 Rust를 사용할 것이에요

만약 깃허브에서 현재 저장소를 확인하면, Rust가 프로젝트에서는 작은 부분을 차지하고 있는 것을 볼 수 있어요. 이 상황을 바꿔야 하는데, 그들은 가장 비용이 많이 드는 부분을 Rust로 다시 작성할 계획이에요.

<div class="content-ad"></div>

![Tailwind 2.0 is Coming and Looks Interesting](/assets/img/Tailwind40isComingandLooksInteresting_1.png)

Also, the new engine should be 35% times smaller, so we can expect a 10x times faster build.

## Lightning CSS

The new engine will depend on Lightning CSS. We talked about the speed, so this will help as well. From the docs we can see that:

<div class="content-ad"></div>

## 언제 릴리스될까요?

약속은 하기 싫지만 현재 우리는 알파 버전을 사용할 수 있어요.

## Vite

Tailwind 4.0은 새로운 Vite 플러그인을 제공합니다. 설치는 매우 간단합니다.

<div class="content-ad"></div>

```js
npm install tailwindcss@next @tailwindcss/vite@next
```

vite.config.ts

```js
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

그리고 지시문을 사용합니다...

<div class="content-ad"></div>

```js
@import "tailwindcss";
```

그게 다야. 새 버전이 기대돼요. 더 많은 기능이 추가되었는데, 모두 읽어보고 싶다면 아래 링크를 확인해보세요. 👇👇👇

출처: Tailwind CSS v4.0에서 진행 중인 작업을 오픈소스로 공개합니다.

이 글이 마음에 들었다면 우리의 성장하는 커뮤니티에 참여하고 싶다면 팔로우 버튼을 눌러주세요. 함께 지식 여행을 떠나봐요.

<div class="content-ad"></div>
