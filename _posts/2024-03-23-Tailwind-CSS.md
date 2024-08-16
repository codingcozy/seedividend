---
title: "Nextjs 13 에서 Tailwind CSS 사용 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Tailwind CSS"
link: "undefined"
isUpdated: true
---





# Tailwind CSS

Tailwind CSS는 Next.js와 탁월하게 작동하는 유틸리티 기반 CSS 프레임워크입니다.

## Tailwind 설치하기

Tailwind CSS 패키지를 설치하고 init 명령어를 실행하여 tailwind.config.js와 postcss.config.js 파일을 생성하세요.

<div class="content-ad"></div>

```js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Tailwind 설정

tailwind.config.js 안에 Tailwind CSS 클래스 이름을 사용할 파일의 경로를 추가하세요:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 'app' 디렉토리가 추가되었음을 주의하세요.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // 만약 'src' 디렉토리를 사용한다면:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

<div class="content-ad"></div>

postcss.config.js를 수정할 필요가 없습니다.

## 스타일 가져오기

Tailwind CSS 지시문을 추가하면 Tailwind가 생성한 스타일을 전역 스타일시트에 주입합니다. 이는 다음과 같은 방법으로 애플리케이션에 삽입할 수 있습니다:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<div class="content-ad"></div>

커스텀 앱 파일(pages/\_app.js) 안에서 전역 스타일 시트인 globals.css를 import하여 애플리케이션의 모든 경로에 스타일을 적용하세요.

```typescript
// 이 스타일은 애플리케이션의 모든 경로에 적용됩니다
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

## 클래스 사용하기

Tailwind CSS를 설치한 후 전역 스타일을 추가하면 응용 프로그램에서 Tailwind의 유틸리티 클래스를 사용할 수 있습니다.

<div class="content-ad"></div>

```typescript
export default function Page() {
  return <h1 className="text-3xl font-bold underline">안녕, Next.js!</h1>;
}
```

## Turbopack와 함께 사용하기

Next.js 13.1부터 Turbopack로 Tailwind CSS와 PostCSS를 지원합니다.

<div class="content-ad"></div>
