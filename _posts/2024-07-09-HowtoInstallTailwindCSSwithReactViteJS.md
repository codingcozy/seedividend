---
title: "React와 Vite JS로 Tailwind CSS 설치하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_0.png"
date: 2024-07-09 18:34
ogImage:
  url: /assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_0.png
tag: Tech
originalTitle: "How to Install Tailwind CSS with React + Vite JS"
link: "https://medium.com/@ansarimazhar7353/tahow-to-install-tailwind-css-with-react-vite-js-a51f4f89e2ec"
isUpdated: true
---

![이미지](/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_0.png)

Tailwind CSS는 매우 쉽게 웹사이트를 디자인할 수 있게 해주는 가장 멋진 CSS 프레임워크 중 하나에요. 그리고 React는 많은 프론트엔드 개발자들이 사용자 인터페이스를 만들기 위해 좋아하는 라이브러리입니다.

하지만 두 가지 최고의 기술을 함께 결합한다면 어떨까요?🤔 이 블로그에서는 Tailwind CSS를 React JS와 함께 구성하는 방법을 보여 드릴게요:

첫째로, ReactJS를 설치해야 해요. 저는 ReactJS를 설치하기 위해 Vite를 사용하고 있어요.⚛️

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

우선 원하시는 프로젝트를 만들 폴더를 열어주세요 📂 VSCode 터미널이나 선호하는 다른 터미널에서 다음 명령어를 실행해주세요 :

```js
npm create vite@latest
```

위 명령어는 Vite 웹사이트에서 가져온 것인데, 이 명령어를 실행한 후 프로젝트 이름과 패키지 이름을 입력하라고 할 것입니다:

<img src="/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_1.png" />

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

프로젝트와 패키지 이름을 지정하고 Enter 키를 누르세요.

그 다음 프레임워크를 선택하라는 메시지가 표시될 것인데, 우리는 React를 선택할 예정입니다 (알고 계시겠지만 라이브러리입니다 😅)

<img src="/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_2.png" />

그리고 나서 언어 선택을 요청하는 창이 나타날 텐데, 여기서 JavaScript를 선택한 후 Enter 키를 누르세요.

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

<img src="/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_3.png" />

그런 다음 생성된 프로젝트 폴더로 이동하여 아래 명령을 실행하세요:

```js
npm install
```

필요한 종속성을 모두 설치하게 됩니다. 이제 프로젝트를 실행할 수 있게 되는데, “npm run dev”를 실행하여 프로젝트를 실행할 수 있습니다. 그전에 Tailwind CSS를 설치해야 합니다. 아래 링크를 통해 Tailwind 웹사이트로 이동하세요:

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

터미널에서 다음 2개의 명령어를 하나씩 실행해보세요 👨🏾‍💻:

```js
npm install -D tailwindcss postcss autoprefixer
```

```js
npx tailwindcss init -p
```

위의 2개의 명령어를 실행하면 tailwind.config.js와 postcss.config.js 파일이 추가됩니다 🗃️. 디렉토리와 파일 구조는 다음과 같이 보일 것입니다:

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

<img src="/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_4.png" />

이후에는 현재 다음과 같이 보이는 tailwind.config.js 파일을 엽니다:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

위의 코드에서는 Tailwind 웹사이트에서 보여주는 대로 "content" 키만 변경해야 합니다:

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

![이미지](/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_5.png)

# 또는 아래의 \"content\" 섹션을 복사하여 붙여넣을 수도 있습니다:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

이후에 src/index.css 파일 맨 위에 tailwind 지시문을 추가하시면 됩니다.

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

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

이제 `npm run dev`를 실행하여 개발 서버를 실행하고 localhost:5173에서 프로젝트가 실행되는 것을 확인할 수 있습니다.

<img src="/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_6.png" />

App.jsx 파일로 이동하여 tailwind css 클래스를 작성해보세요! ✍🏾

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

![이미지](/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_7.png)

프로젝트에 반영된 변경 사항을 확인할 수 있습니다:

![이미지](/assets/img/2024-07-09-HowtoInstallTailwindCSSwithReactViteJS_8.png)

축하합니다!! 🥳🎉🥳🎊 React에 Tailwind를 성공적으로 설치하셨으니 이제 사이트를 원하는 대로 사용자 정의할 수 있습니다!

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

Tailwind CSS를 ReactJS와 구성하는 방법에 대해 설명했어요. 이 블로그 글이 마음에 들었으면 박수를 보내주세요. JavaScript, React 또는 웹 개발 관련 콘텐츠를 자주 올리기 때문에 팔로우해주시면 좋겠어요.

읽어주셔서 감사합니다 😄😄
