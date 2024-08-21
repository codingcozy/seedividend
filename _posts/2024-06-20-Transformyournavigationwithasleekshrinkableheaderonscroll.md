---
title: "스크롤할 때 멋진, 축소 가능한 헤더로 내비게이션을 변환해 보세요 "
description: ""
coverImage: "/assets/img/2024-06-20-Transformyournavigationwithasleekshrinkableheaderonscroll_0.png"
date: 2024-06-20 03:29
ogImage:
  url: /assets/img/2024-06-20-Transformyournavigationwithasleekshrinkableheaderonscroll_0.png
tag: Tech
originalTitle: "Transform your navigation with a sleek, shrinkable header on scroll! 🚀✨"
link: "https://medium.com/@codingmadeeasy92/transform-your-navigation-with-a-sleek-shrinkable-header-on-scroll-7d326e534632"
isUpdated: true
---

<img src="/assets/img/2024-06-20-Transformyournavigationwithasleekshrinkableheaderonscroll_0.png" />

웹 디자인에서 스크롤할 때 헤더를 축소하는 것은 사용자 경험을 향상시키는 일반적인 기술입니다. 사용자가 페이지를 아래로 스크롤할수록 내비게이션 바를 더 조밀하게 만들어 화면 공간을 절약하는 동시에 필수적인 내비게이션 링크를 산만하지 않게 보여줍니다. 이 기능을 구현하기 위해서는 HTML로 구조를 만들고 CSS로 스타일을 지정하며 JavaScript로 스크롤 동작을 처리해야 합니다.

이 글에서는 페이지를 스크롤할 때 높이가 자연스럽게 축소되는 슈링크 헤더를 만드는 방법에 대해 살펴보겠습니다. 먼저, 헤더와 페이지 내용을 위한 기본 HTML 구조를 설정합니다. 다음으로, 헤더의 확장 및 축소 상태를 정의하는 CSS로 헤더를 스타일링합니다. 마지막으로, JavaScript를 추가하여 스크롤 이벤트를 감지하고 적절한 클래스를 헤더에 적용하여 축소 효과를 발생시킵니다.

이 튜토리얼을 마치면 웹페이지의 사용성과 미학을 향상시키는 기능적인 슈링크 헤더를 가지게 될 것입니다. 이 안내서는 웹사이트에 세련된 터치를 더하고자 하는 초보자와 경험 있는 개발자 모두에게 적합합니다.

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

이 효과를 위한 두 가지 중요한 부분이 있어요.

구조 생성: HTML 섹션에서 사용자가 페이지를 스크롤할 때 네비게이션 바가 줄어드는 효과를 보여주는 기본적인 웹사이트 레이아웃을 설정할 거에요.

디자인 구성: CSS 및 JavaScript 섹션에서 우리는 네비게이션 바를 스타일링하고 JavaScript를 사용하여 사용자가 스크롤할 때 네비게이션 바가 부드럽게 줄어드는 효과를 구현할 거에요.

전체 코드

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
<html>

<head>
 <meta name="viewport" content="width=device-width, initial-scale=1">

 <title>
  페이지 제목
 </title>
 <style>
  CSS 스타일 내용
 </style>

 <script>
  JavaScript 스크립트 내용
 </script>

</head>


<body>
 <!-- 헤더 내비게이션 -->
 <div id="navlist">
  <a href="#default" id="logo">
   CODEMAGNET
  </a>

  <div id="navlist-right">
   <a href="#home">홈</a>
   <a href="#about">제품</a>
   <a href="#about">경력</a>
   <a href="#contact">문의</a>
   <a href="#about">회사 소개</a>
  </div>
 </div>

 <!-- 페이지 내용 -->
 <div class="content">
  <b>
   열정을 가진 코딩 포털
  </b>
  <p>
   뛰어난 코딩 포털에 오신 것을 환영합니다. 모든 수준의 열정적인 사람들이 모여 배우고 공유하며 성장할 수 있는 곳입니다! 프로그래밍 열정을 키우는 데 필요한 다양한 리소스, 자습서 및 커뮤니티 지원에 몰입해 보세요. #코딩 #코드배우기 🚀💻
  </p>
 </div>
</body>

</html>
```

자세한 내용은 아래 링크를 확인해주세요.

https://codemagnet.in/2024/06/18/create-shrink-header-on-scroll-html-css-and-javascript/
