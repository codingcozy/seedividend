---
title: "NET Core MVC에서 Tailwind CSS를 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How can you use Tailwindcss with Net Core MVC"
link: "https://medium.com/@omerconsept999/how-can-you-use-tailwindcss-with-net-core-mvc-445694739a6e"
isUpdated: true
---

<img src="/assets/img/How-can-you-use-Tailwindcss-with-.Net-Core-MVC_0.png" />

이 기사는 Tailwind를 .Net Core Mvc 웹 애플리케이션과 함께 사용하는 방법에 대한 것입니다.

# .Net Mvc 프로젝트 생성

이 단계에서는 터미널을 사용할 것이지만 Visual Studio나 기타 툴을 선호하신다면 사용하셔도 됩니다.

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
$ dotnet new sln -n MvcProject
$ dotnet new mvc -n MvcProject.Web
$ dotnet sln add ./MvcProject.Web/MvcProject.Web.csproj
```

# Tailwindcss 설치하기

먼저 Node.js가 필요합니다. 시스템에 Node.js가 없는 경우 여기에서 다운로드할 수 있습니다.

```js
$ cd MvcProject
$ npm init

... (질문에 답변)

$ npm i tailwindcss
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

# Tailwindcss 준비하기

저희 프로젝트에 Tailwindcss를 설치했어요. 이제 Tailwindcss를 사용하기 위해 준비해야 해요.

```js
$ npx tailwincss init
```

이 명령어는 당신의 디렉토리에 tailwind.config.js 파일을 생성할 거에요.

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

그 파일의 기본 버전은 다음과 같습니다

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

하지만 우리는 MVC용으로 이 파일을 편집할 것입니다

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Pages/**/*.cshtml", "./Views/**/*.cshtml"],
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

이제 Tailwind는 .cshtml 파일을 감지할 수 있습니다.

# Mvc를 위한 npm 설정 구성

package.json 파일에 다음 코드를 추가해야 합니다.

```js
"scripts": {
    "css:build": "npx tailwindcss -i ./wwwroot/css/site.css -o ./wwwroot/css/styles.css --minify",
    "watch": "npx tailwindcss -i ./wwwroot/css/site.css -o ./wwwroot/css/styles.css --minify --watch"
  },
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

npm watch 명령어를 사용하여 개발할 수 있어요. 이 명령어는 당신의 변경 사항을 지켜보고 tailwind 코드를 너무 빨리 다시 빌드해줄 거예요.

참고: 하지만 css:build 명령어를 사용하여 빌드해야 해요.

# Views에 Tailwindcss 추가하기

우리는 npm과 tailwindcss 설정을 완료했어요. 이제 우리의 views에 tailwindcss 빌드를 추가할 차례에요.

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

./Views/Shared/\_Layout.cshtml을 열어서 붙여넣어주세요.

```js
<link rel="stylesheet" href="/css/styles.css">
```

작업 완료했어요. 이제 Mvc 프로젝트에서 Tailwindcss를 사용할 수 있어요.

# 나의 정보

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

- Github: [https://github.com/omerasaf01](https://github.com/omerasaf01)
- Medium: [https://medium.com/@omerconsept999](https://medium.com/@omerconsept999)
- Linkedin: [https://www.linkedin.com/in/omerasaf/](https://www.linkedin.com/in/omerasaf/)

읽어 주셔서 감사합니다.
