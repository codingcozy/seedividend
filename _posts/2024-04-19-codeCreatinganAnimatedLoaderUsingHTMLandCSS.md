---
title: "HTML과 CSS를 사용하여 애니메이션 로더 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "codeCreating an Animated Loader Using HTML and CSS"
link: "https://medium.com/@withaarzoo/creating-an-animated-loader-using-html-and-css-0a2f319bc560"
isUpdated: true
---

![이미지](https://miro.medium.com/v2/resize:fit:1200/1*h8jwJu8Ccrcv7Q_hpjipPw.gif)

환영합니다! #100DaysOfCode 챌린지 8일차에 오신 것을 환영합니다! 오늘은 HTML과 CSS를 사용하여 애니메이션 로더를 만들어볼 것입니다. 이 로더는 웹 프로젝트에 멋진 요소를 추가하고 사용자들이 콘텐츠를 로드할 때 기다릴 동안 사용자들을 끌어들일 것입니다. 이제 단계별로 살펴봅시다!

# 단계 1: 프로젝트 설정하기

먼저 HTML 파일과 CSS 파일을 만들어 프로젝트를 설정해봅시다.

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

index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Animated Loader</title>
  </head>
  <body>
    <div class="loader"></div>
  </body>
</html>
```

style.css:

```css
/* 여기에 CSS 스타일을 작성하세요 */
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

# 단계 2: 로더 만들기

이제 HTML을 사용하여 로더를 만들고 CSS를 사용하여 스타일을 지정해 봅시다.

index.html:

```js
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>애니메이션 로더</title>
</head>
<body>
    <div class="loader"></div>
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

```js
스타일.css:

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

# 단계 3: 로더 사용자 정의하기

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

로더의 모양을 원하는 대로 조정하여 색상, 크기 및 애니메이션 속도를 변경할 수 있습니다.

style.css:

.loader {
  border: 8px solid #f3f3f3; /* 바깥 테두리 색상 */
  border-top: 8px solid #3498db; /* 로더 색상 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

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

# 단계 4: 개성을 담아보세요

로더에 개인적인 터치를 더해보는 건 어떨까요? 색상을 변경하거나 그라데이션을 추가하거나, 로고를 넣는 것도 좋은 아이디어입니다.

style.css:

.loader {
  border: 8px solid #f3f3f3; /* 바깥 테두리 색상 */
  border-top: 8px solid #ff6347; /* 로더 색상 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

# 단계 5: 마무리 작업

추가적인 효과를 위해 트랜지션을 추가하거나 애니메이션 속도를 조절하여 로더를 더욱 향상시킬 수 있습니다.

style.css:

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

.loader {
  border: 8px solid #f3f3f3; /* 외곽 테두리 색상 */
  border-top: 8px solid #ff6347; /* 로더 색상 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* 빠른 애니메이션 */
  transition: border-color 0.3s ease; /* 부드러운 전환 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

# 단계 6: 결론

축하합니다! HTML과 CSS를 사용하여 세련된 애니메이션 로더를 성공적으로 만들었습니다. 이 로더를 웹 프로젝트에 통합하여 사용자 경험을 향상시키세요.

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

여기서 전체 소스 코드를 다운로드하고 트위터에서 제 코딩 여정을 따라와주세요. 도움이 필요하거나 피드백이 있으면 Bento에서 저에게 연락할 수 있어요.

즐거운 코딩하세요! 🚀
```
