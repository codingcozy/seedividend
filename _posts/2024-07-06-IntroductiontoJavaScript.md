---
title: "2024년 자바스크립트 입문 가이드"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-06 02:14
ogImage:
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Introduction to JavaScript"
link: "https://medium.com/@shivabiradar2003/introduction-to-javascript-83a3cebbfc6c"
isUpdated: true
---

자바스크립트는 브라우저에서 실행되어 웹페이지를 인터랙티브하게 만듭니다.
HTML 및 CSS와 쉽게 통합하여 웹페이지 기능을 향상시킬 수 있습니다.
자바스크립트는 클릭 및 입력과 같은 사용자 조작에 응답하여 동적 사용자 경험을 만듭니다.

웹 페이지에 자바스크립트를 추가하는 방법은 세 가지가 있습니다:

- 내부 자바스크립트
  내부 자바스크립트는 아래와 같이 HTML 내부에 작성할 수 있습니다.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>내부 스크립트 예제</title>
  </head>
  <body>
    <button onclick="alert('내부 자바스크립트에 오신 것을 환영합니다!')">클릭해주세요</button>
  </body>
</html>
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

2. 내부 JavaScript
   내부 스크립트는 헤드(head) 또는 본문(body)에 작성할 수 있지만, HTML 문서의 본문에 넣는 것이 좋습니다.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>내부 스크립트</title>
    <script>
      console.log('자바스크립트에 오신 것을 환영합니다')
    </script>
  </head>
  <body></body>
</html>
```

3. 외부 JavaScript
   내부 스크립트와 유사하게, 외부 스크립트는 헤드나 본문에 작성할 수 있지만, 본문에 넣는 것이 좋습니다. 먼저, .js 확장자를 가지는 외부 JavaScript 파일을 생성해야 합니다. .js 확장자로 끝나는 모든 파일은 JavaScript 파일입니다. .js 파일을 생성한 후, 이 파일을 본문의 가장 아래에 또는 헤드의 가장 아래에 링크해야 합니다.

헤드에 있는 외부 스크립트

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>External script</title>
    <script src="introduction.js"></script>
  </head>
  <body></body>
</html>
```

외부 스크립트를 body 태그 안에 추가

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>External script</title>
  </head>
  <body>
    <!-- JavaScript 외부 링크는 헤더나 본문에 위치할 수 있습니다 -->
    <!-- 본문 닫히는 태그 이전에 외부 자바스크립트 스크립트를 넣는 것이 권장됩니다 -->
    <script src="introduction.js"></script>
  </body>
</html>
```

곧 나올 글에서는 JavaScript에서의 변수와 그들의 타입에 대해 배울 것입니다.
