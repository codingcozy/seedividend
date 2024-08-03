---
title: "애니메이션 로켓 로더 만들기소스코드 있음"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building an Animated Rocket Loader  FREE Source Code"
link: "https://medium.com/@withaarzoo/building-an-animated-rocket-loader-free-source-code-543edcdbc2a8"
---



<img src="https://miro.medium.com/v2/resize:fit:1400/1*7ZmbAQ3KO-vYEaFiol1_tQ.gif" />

어서오세요! #100DaysOfCode 챌린지 6일차에 오신 것을 환영합니다! 오늘은 HTML과 CSS를 사용하여 흥미로운 프로젝트를 만들어볼 거에요: 로켓 애니메이션 로더입니다. 이 로더는 여러분의 웹페이지를 보다 흥미롭게 만들 뿐만 아니라 사용자들에게 재미를 더해줄 거예요. 함께 시작해봅시다!

# 단계 1: 프로젝트 설정하기

먼저, Visual Studio Code 또는 Sublime Text와 같은 텍스트 편집기가 준비되어 있는지 확인해주세요. 프로젝트를 위한 새 폴더를 만들고 선호하는 텍스트 편집기에서 해당 폴더를 열어주세요.

<div class="content-ad"></div>

# 단계 2: HTML 구조

텍스트 편집기를 열고 새 HTML 파일을 만들어보세요. 파일 이름은 index.html로 지정합시다. 이 파일 안에 웹페이지의 기본 구조를 설정할 거에요:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Animated Rocket Loader</title>
</head>
<body>
    <div class="container">
        <div class="loader">
            <div class="rocket">
                <!-- 로켓과 구름 아이콘이 여기에 들어갈 거에요 -->
            </div>
            <span>
                <!-- 다른 로켓 아이콘이 여기에 들어갈 거에요 -->
            </span>
        </div>
    </div>
</body>
</html>
```

# 단계 3: CSS로 스타일링하기

<div class="content-ad"></div>

이제 로켓 로더를 멋지게 보이도록 몇 가지 스타일을 추가해 봅시다. style.css라는 새 파일을 만들고 HTML 파일에 링크하세요.

```js
/* 모든 요소에 대한 리셋 스타일 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 컨테이너의 스타일 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #eaeef0;
}

/* 여기에 더 많은 CSS 스타일을 추가합니다 */
```

# 단계 4: 로켓 및 구름 아이콘 추가

우리는 로켓 및 구름 아이콘에 Font Awesome를 사용할 것입니다. HTML 파일에 Font Awesome가 연결되어 있는지 확인해 주세요.

<div class="content-ad"></div>

```js
<head>
    <!-- 이전 메타 태그 및 스타일시트 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- 자체 스타일시트에 대한 링크 -->
    <link rel="stylesheet" href="style.css">
    <!-- 웹페이지 제목 -->
    <title>Animated Rocket Loader</title>
</head>
<body>
    <!-- 이전의 HTML 구조 -->
    <div class="rocket">
        <i class="fas fa-rocket"></i>
        <i class="fas fa-cloud" style="--i:0"></i>
        <i class="fas fa-cloud" style="--i:1"></i>
        <i class="fas fa-cloud" style="--i:2"></i>
        <i class="fas fa-cloud" style="--i:3"></i>
    </div>
    <span>
        <i class="fa-solid fa-rocket"></i>
    </span>
    <!-- 여기에 더 많은 HTML 요소가 추가될 것입니다 -->
</body>
```

# 단계 5: 로켓과 구름 애니메이션

로켓과 구름이 움직이도록 애니메이션을 추가해 봅시다. 이를 위해 CSS 애니메이션을 사용할 것입니다.

```js
/* 로더 회전을 위한 애니메이션 */
@keyframes animateLoader {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 로켓 이동을 위한 애니메이션 */
@keyframes animateRocket {
    0%,
    100% {
        transform: translate(0, 0) rotate(-45deg);
    }

    50% {
        transform: translate(0, 3px) rotate(-45deg);
    }
}

/* 구름 이동을 위한 애니메이션 */
@keyframes animateCloud {
    0% {
        transform: translateY(calc(-35 * 5px));
    }

    100% {
        transform: translateY(calc(35 * 5px));
    }
}
```

<div class="content-ad"></div>

# 단계 6: 마지막 손질과 테스트

결과에 만족할 때까지 스타일과 애니메이션을 조정하세요. 작업을 마치면 파일을 저장하고 웹 브라우저에서 index.html을 열어 애니메이트된 로켓 로더가 작동하는 것을 확인해보세요!

여기까지입니다! 성공적으로 애니메이트된 로켓 로더를 만들었습니다. 계속해서 사용자 정의하고 다른 사람들과 공유해보세요.

# 결론

<div class="content-ad"></div>

오늘은 HTML과 CSS를 사용하여 애니메이션 로켓 로더를 만드는 방법을 배웠어요. 이 프로젝트는 사용자 경험을 향상시키는데 도움이 되며, 당신의 웹페이지에 창의성을 더해줍니다. 계속해서 새로운 기술을 실험하고 탐험해보세요. 즐거운 코딩되세요!

이 프로젝트는 #100DaysOfCode 도전의 6일차입니다. 여기에서 전체 소스 코드를 다운로드할 수 있어요. 궁금한 점이나 피드백이 있으면 언제든지 Bento를 통해 저에게 연락할 수 있어요.
