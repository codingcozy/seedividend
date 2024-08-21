---
title: "React 프로젝트에 Tailwind CSS 설정하는 방법  단계별 튜토리얼"
description: ""
coverImage: "/assets/img/2024-07-07-SettingUpTailwindCSSinaReactProjectStep-by-StepTutorial_0.png"
date: 2024-07-07 12:43
ogImage:
  url: /assets/img/2024-07-07-SettingUpTailwindCSSinaReactProjectStep-by-StepTutorial_0.png
tag: Tech
originalTitle: "Setting Up Tailwind CSS in a React Project | Step-by-Step Tutorial"
link: "https://medium.com/@prathapreddy-mudium/setting-up-tailwind-css-in-a-react-project-step-by-step-tutorial-9fb764f79440"
isUpdated: true
---

시작하기 전에, 컴퓨터에 Node.js와 npm이 설치되어 있는지 확인해주세요. 또한 React와 CSS의 기본적인 이해가 필요합니다.

![React Project](/assets/img/2024-07-07-SettingUpTailwindCSSinaReactProjectStep-by-StepTutorial_0.png)

## 단계 1: React 프로젝트 생성하기

새로운 React 프로젝트를 만들어봅시다. 터미널을 열고 다음 명령어를 실행해주세요:

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
npx create-react-app my-tailwind-app
cd my-tailwind-app
```

이 명령어는 'my-tailwind-app'이라는 폴더에 새로운 리액트 프로젝트를 생성합니다.

## 단계 2: Tailwind CSS 설치

Tailwind CSS를 설치해 봅시다. 프로젝트 디렉토리에서 다음 명령어를 실행하세요:

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
npm install -D tailwindcss
npx tailwindcss init
```

## 단계 3: Tailwind CSS 구성

Tailwind CSS를 구성해야 합니다. tailwind.config.js 파일을 열고 content 배열을 업데이트하여 모든 템플릿 파일의 경로를 포함하도록 합니다:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
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

## 단계 4: Tailwind 지시문 추가하기

CSS 파일에 Tailwind의 기본, 구성요소 및 유틸리티 스타일을 추가해야 합니다. src/index.css 파일을 열고 다음 내용으로 대체하십시오:

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 샘플 컴포넌트 만들기:

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

Tailwind를 실제로 사용해보기 위해 샘플 컴포넌트를 만들어봅시다. src/App.js 파일을 열고 다음 코드로 내용을 바꿔주세요:

```js
import "./App.css";

function App() {
  return (
    <div className="text-3xl text-orange-500 border-2 font-semibold mt-4 flex h-screen justify-center items-center">
      <div>Tailwind css를 React에 설정하기</div>
    </div>
  );
}

export default App;
```
