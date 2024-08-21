---
title: "React에서 Tailwind CSS 설치 및 구성하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtoInstallandConfigureTailwindCSSinReact_0.png"
date: 2024-07-09 13:56
ogImage:
  url: /assets/img/2024-07-09-HowtoInstallandConfigureTailwindCSSinReact_0.png
tag: Tech
originalTitle: "How to Install and Configure Tailwind CSS in React"
link: "https://medium.com/@miahossain8888/how-to-install-and-configure-tailwind-css-in-react-13accc4c5b4b"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-HowtoInstallandConfigureTailwindCSSinReact_0.png)

이 글에서는 React에서 Tailwind CSS를 설치하고 구성하는 방법을 보여드리겠습니다.

- React 프로젝트

# 단계 1: React 프로젝트 만들기

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

우선, React 애플리케이션을 만들어야 합니다. 이미 만든 애플리케이션이 없다면 Vite를 사용해 React 애플리케이션을 만드는 방법에 대한 전용 기사가 있습니다.

그렇지 않다면, 다음 명령어를 사용하여 Vite를 이용해 React 애플리케이션을 쉽게 만들 수 있습니다.

```js
npm create vite@latest my-app -- --template react
```

그리고 나서 프로젝트 폴더로 이동하시면 됩니다.

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
cd my-app
```

그리고 종속성을 설치하세요

```js
npm install
```

# 단계 2: Tailwind CSS 설치하기

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

Tailwind와 관련된 다른 패키지를 설치해보세요!

```js
npm install -D tailwindcss postcss autoprefixer
```

이후, tailwind.config.js와 postcss.config.js 파일을 생성해보세요.

```js
npx tailwindcss init -p
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

# 단계 3: 템플릿 경로 설정

tailwind.config.js 파일에 모든 템플릿 파일의 경로를 추가하세요.

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

# 단계 4: CSS에 Tailwind 지시문 추가

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

Tailwind의 각 레이어에 대한 @tailwind 지시문을 ./src/index.css 파일에 추가하세요. 또한 ./src/App.css 파일에도 추가할 수 있습니다.

```js
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# 단계 5: 프로젝트에서 Tailwind가 작동하는지 테스트해보세요

다음 명령어를 사용하여 프로젝트를 실행하세요.

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
npm run dev
```

테스트 목적으로, 이 코드를 App.jsx 파일에 작성해보세요.

```js
// App.jsx
function App() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold underline">Hello World</h1>
    </>
  );
}

export default App;
```

마침내, 작동합니다!

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

![이미지](/assets/img/2024-07-09-HowtoInstallandConfigureTailwindCSSinReact_1.png)

# 결론

본 단계별 튜토리얼에서는 Tailwind CSS를 설치하고 구성 파일을 생성하는 방법을 소개했습니다. 또한 필요한 템플릿 경로를 구성하고 CSS 파일에 Tailwind 지시문을 추가하는 방법을 보여드렸습니다. 마지막으로 React 프로젝트에서 Tailwind가 작동하는지 여부를 테스트하는 방법을 안내했습니다.

# 참고 자료

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

테일윈드 공식 문서가 여기 있어요.

어떤 제안이나 피드백도 언제나 환영해요 😊

## 언제든 연락해주세요

Linkedin, Facebook
