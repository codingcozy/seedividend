---
title: "HTMX를 활용해 쉬운 페이지 라우팅하기"
description: ""
coverImage: "/assets/img/2024-05-02-EffortlessPageRoutingUsingHTMX_0.png"
date: 2024-05-02 00:04
ogImage:
  url: /assets/img/2024-05-02-EffortlessPageRoutingUsingHTMX_0.png
tag: Tech
originalTitle: "Effortless Page Routing Using HTMX"
link: "https://medium.com/@paulallies/htmx-page-navigation-07b54742d251"
isUpdated: true
---

![이미지](/assets/img/2024-05-02-EffortlessPageRoutingUsingHTMX_0.png)

리액트는 종종 웹 애플리케이션에 지나치게 많은 요소를 포함하고 있을 수 있으며, HTMX와 함께 웹 서버만 사용하여 상호 작용 애플리케이션을 만드는 것이 동등한 결과를 얻을 수 있는 경우가 있습니다.

이 블로그 포스트에서는 HTMX를 활용하여 상호 작용이 가능하고 화면 깜빡임이 없는 페이지 이동을 작성하는 방법을 설명하겠습니다:

## 서버 설정

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
mkdir no-react-app
cd no-react-app
npm init -y
npm install express nunjucks
```

그런 다음 서버 파일을 만들고 실행합니다.

```js
//File: app.js
const express = require("express");
const app = express();

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("pages/home.html");
});

app.get("/users", (req, res) => {
  res.render("pages/users.html");
});

app.get("/posts", (req, res) => {
  res.render("pages/posts.html");
});

app.listen(3000, () => {
  console.info(`Application running http://localhost:3000`);
});
```

저희는 템플릿 엔진으로 nunjucks를 사용합니다. 모든 템플릿, 레이아웃 및 부분 파일은 "views" 디렉토리에 저장됩니다. 따라서 프로젝트 구조는 다음과 같을 것입니다.

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

## 앱 구조

```js
app.js;
views;
layouts;
main.html;
partials;
sidenav.html;
pages;
user.html;
home.html;
posts.html;
```

템플릿 엔진을 사용하기 때문에 모든 뷰가 확장할 레이아웃을 추가합시다.

## 메인 레이아웃

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
<!--File: views/layouts/main.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" />
    <title>HTMX App</title>
</head>

<body class="bg-gray-200">
    <div class="flex h-screen">
        <!-- Side Navigation -->
        {- include('partials/sidenav.html')}

        <!-- Main Content Area -->
        <div class="w-full bg-white p-4" id="main">
            { block content }{ endblock }
        </div>
</body>

</html>
```

sidenav 템플릿 컴포넌트를 partials로 리팩터링하여 레이아웃에 포함했습니다.

## Side Nav Component

```js
<!--File: views/partials/sidenav.html-->
<div class="w-56 bg-gray-800 text-white p-4">
    <a href="/" class="block py-2 px-4 text-white hover:bg-gray-600">Home</a>
    <a href="/users" class="block py-2 px-4 text-white hover:bg-gray-600">Users</a>
    <a href="/posts" class="block py-2 px-4 text-white hover:bg-gray-600">Posts</a>
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

그리고 우리는 메인 페이지인 home.html, users.html 및 posts.html을 만들었습니다.

## 페이지

```js
<!--views/pages/home.html-->
{ extends 'layouts/main.html' }

{ block content }
<h1 class="text-2xl font-bold mb-4">HTMX Nav</h1>
{ endblock }
```

```js
<!--views/pages/users.html-->
{ extends 'layouts/main.html' }

{ block content }
<h1 class="text-2xl font-bold mb-4">Users</h1>
{ endblock }
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
<!-- views/pages/posts.html -->
{ extends 'layouts/main.html' }

{ block content }
<h1 class="text-2xl font-bold mb-4">Posts</h1>
{ endblock }
```

서버를 실행하면 네비게이션이 있지만 전체 페이지가 다시 로드됩니다:

<img src="https://miro.medium.com/v2/resize:fit:1400/1*yPvQ3Jj47osdFfxsoMXqSg.gif" />

HTMX라는 가벼운 JavaScript 라이브러리를 사용하여 이 문제를 해결해야 합니다. 이 라이브러리는 보다 더 순조롭고 상호작용적인 사용자 네비게이션 경험을 크게 향상시킬 수 있습니다. HTMX는 더 다양한 응용 프로그램에서 사용할 수 있지만, 현재 목적에 맞게 더 원활한 네비게이션을 달성하기 위해 그 능력을 활용하는 데 중점을 둘 것입니다.

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

## HTMX를 사용하여 점진적으로 향상시키기

HTMX를 사용하는 가장 빠른 방법은 CDN을 통해 로드하는 것입니다. 다음 코드를 head 태그에 추가하면 간단히 시작할 수 있습니다:

```js
<!--File: views/layouts/main.html-->
...
<script src="https://unpkg.com/htmx.org@latest"></script>
<title>HTMX App</title>
</head>
...
```

이제 사이드네비게이션 바에 작은 변경을 가할 수 있습니다.

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

- href 속성을 제거하고 hx-get 속성으로 대체합니다. 사용자가이 링크를 클릭하면 HTTP GET 요청이 발생합니다.
- 각 앵커에 hx-target 속성을 추가하거나 앵커 상위 div에 하나 추가하십시오. hx-target 속성을 사용하면 응답을 교체할 요소를 대상으로 지정할 수 있습니다.
- 각 앵커에 hx-push-url="true"를 추가하십시오. hx-push-url 속성을 사용하면 URL을 브라우저 위치 기록에 추가할 수 있습니다. 이를 통해 새로운 기록 항목이 생성되어 브라우저의 뒤로/앞으로 버튼을 사용한 탐색이 가능합니다.

이것이 무엇을 하는가: 우리는 "main" id의 div에서 응답을 삽입할 때 HTMX lib에 서버 호출을 만드는 방법을 선언적으로 지시하고 있습니다.

```js
<div class="w-56 bg-gray-800 text-white p-4" hx-target="#main">
  <a hx-get="/" hx-push-url="true" class="block py-2 px-4 text-white hover:bg-gray-600">
    Home
  </a>
  <a hx-get="/users" hx-push-url="true" class="block py-2 px-4 text-white hover:bg-gray-600">
    Users
  </a>
  <a hx-get="/posts" hx-push-url="true" class="block py-2 px-4 text-white hover:bg-gray-600">
    Posts
  </a>
</div>
```

이제 다음과 같습니다.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*LOvL_BdO8v6B-La18uqJug.gif)

번쩍임 문제를 해결했고 새로운 URL로 올바르게 전환됩니다. 이제 다른 사람에게 내비게이션을 공유하고 싶다면 새로운 URL로 이동하게 됩니다.

### 앱을 HTMX 알아보기

각 서버 요청이 HTMX 호출인지 여부를 결정해야 합니다. 만약 HTMX 호출이라면 레이아웃을 사용하지 말고 해당 템플릿의 HTML을 그대로 반환하도록 템플릿 엔진에 지시해야 합니다. 이를 위해 특정 미들웨어를 포함해야 합니다:

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
// 파일: app.js
...
app.use((req, res, next) => {
    res.locals.useLayout = req.headers["hx-request"] !== "true";
    next();
})

app.listen(3000, () => {
    console.info(`애플리케이션이 http://localhost:3000에서 실행 중입니다.`)
})
```

HTMX 요청이 감지되지 않는 경우에만 레이아웃을 사용합니다.

```js
<!-- 파일: views/layouts/main.html -->
{ if useLayout }
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" />
    <script src="https://unpkg.com/htmx.org@latest"></script>
    <title>HTMX App</title>
</head>
<body class="bg-gray-200">
    <div class="flex h-screen">
        <!-- Side Navigation -->
        {- include('partials/sidenav.html')}
        <!-- Main Content Area -->
        <div class="w-full bg-white p-4" id="main">
{ endif }

            { block content }{ endblock }

{ if useLayout }
        </div>
</body>
</html>
{ endif }
```

URL을 공유할 수 있도록 원활하고 번쩍임 없는 내비게이션 경험을 성공적으로 달성했습니다.

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

[이미지](https://miro.medium.com/v2/resize:fit:1400/1*hdhwN-9D2qdkYFyXwJ6XEg.gif)

원본 블로그 게시물: [https://nanosoft.co.za/blog/post/express-htmx](https://nanosoft.co.za/blog/post/express-htmx)

소스 코드: [https://github.com/nanosoftonline/express-htmx](https://github.com/nanosoftonline/express-htmx)
