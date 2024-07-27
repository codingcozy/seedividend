---
title: "React  Vite  React에서 Tailwind CSS가 작동되지 않는 문제 해결 2024년 업데이트"
description: ""
coverImage: "/assets/img/2024-05-12-ReactTailwindCSSIsNotWorkingInViteReactSolution2024updated_0.png"
date: 2024-05-12 21:00
ogImage: 
  url: /assets/img/2024-05-12-ReactTailwindCSSIsNotWorkingInViteReactSolution2024updated_0.png
tag: Tech
originalTitle: "React — Tailwind CSS Is Not Working In Vite + React Solution (2024 updated)"
link: "https://medium.com/@rubybellekim/react-tailwind-css-is-not-working-in-vite-react-solution-2024-updated-bba56dcae003"
---


<img src="/assets/img/2024-05-12-ReactTailwindCSSIsNotWorkingInViteReactSolution2024updated_0.png" />

가끔 Tailwind CSS가 작동하지 않고 Vite에 특히 지정된 방법으로 사전 설치를 따르지 않을 때 프로젝트에 적용할 수 없습니다.

# 해결책

간단합니다. 'vite.config.js' 파일에 아래와 같이 tailwindcss 및 css: ' ... '를 가져오는 부분을 추가해야 합니다.



```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

});
```

# 단계별 설치 안내

또는 Vite + React 프로젝트에 Tailwind CSS 설정을 시작부터 따라갈 수도 있습니다.

- Vite에 Tailwind CSS를 설치하는 명령어는 조금 다릅니다. postcss와 autoprefixer가 추가로 필요합니다.



```js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 'tailwind.config.js' 파일을 아래와 같이 편집하여 모든 파일과 확장자를 추가하여 Tailwind CSS를 적용할 수 있습니다.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. 이것들을 당신의 CSS 파일 맨 위에 추가하세요.



```js
@tailwind 기본;
@tailwind 컴포넌트;
@tailwind 유틸리티;
```

완료! npm run dev로 이동해요.

이제 일반적인 지시사항과 다른 부분을 보셨나요? output.css 파일을 생성하고 html 파일에 연결하는 단계가 필요하지 않아요.

Vite + React에서는 사실 더 간단하고 쉬워요.



행복한 React! 🌐