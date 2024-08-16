---
title: "HTML과 CSS를 사용하여 애니메이션 로켓 로더 만들기"
description: ""
coverImage: "/assets/img/2024-05-01-BuildinganAnimatedRocketLoaderUsingHTMLandCSS_0.png"
date: 2024-05-01 23:11
ogImage: 
  url: /assets/img/2024-05-01-BuildinganAnimatedRocketLoaderUsingHTMLandCSS_0.png
tag: Tech
originalTitle: "Building an Animated Rocket Loader Using HTML and CSS"
link: "https://medium.com/@withaarzoo/building-an-animated-rocket-loader-using-html-and-css-b72a38e366e5"
isUpdated: true
---




![로켓 로더](https://miro.medium.com/v2/resize:fit:1200/1*fE47ZekcAWWg54RB5WWodg.gif)

# 소개
#100DaysOfCode 챌린지의 제 23일을 환영합니다! 오늘은 프론트엔드 개발 세계로 뛰어들어 흥미진진한 프로젝트를 만들어보겠습니다: 애니메이션 로켓 로더입니다. 이 로더는 당신의 웹사이트의 시각적 매력을 높일 뿐만 아니라 사용자들에게 독특한 로딩 경험을 제공할 것입니다. 시작해봅시다!

# 단계 1: 프로젝트 설정

<div class="content-ad"></div>

먼저, 제공된 링크에서 전체 소스 코드를 다운로드하세요: 소스 코드 다운로드. 다운로드 후, 프로젝트용 새 디렉터리를 만들고 소스 코드 파일을 그 안에 압축 해제하세요.

# 단계 2: HTML 구조

코드 편집기에서 index.html 파일을 열어주세요. 우리는 HTML 문서의 기본 구조를 정의하는 것으로 시작하겠습니다. 다음 코드를 복사하여 붙여넣기 해주세요:

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- 문자 인코딩 및 뷰포트 설정 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 외부 스타일시트 연결 -->
    <link rel="stylesheet" href="style.css">
    <!-- 페이지 제목 설정 -->
    <title>Animated Rocket Loader</title>
</head>

<body>
    <!-- 로켓 로더 컨테이너 -->
    <div class="rocket-loader">
        <!-- 로켓 객체 -->
        <div class="rocket">
            <!-- 장식용 로켓 부속품 -->
            <div class="rocket-extras"></div>
            <!-- 제트 애니메이션 -->
            <div class="jet"><span></span></div>
        </div>
    </div>
</body>

</html>
```

<div class="content-ad"></div>

# 단계 3: CSS로 스타일링하기

이제 우리의 로켓 로더를 시각적으로 매력적으로 만들기 위해 몇 가지 스타일을 추가해 봅시다. style.css 파일을 열어주세요. 로켓 로더, 로켓, 제트, 그리고 애니메이션용 스타일을 포함할 것입니다. 제공된 CSS 코드를 복사하여 붙여넣어주세요.

```js
/* Google 폰트 가져오기 */
@import url("https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700,700i");

/* 기본 마진, 패딩, 상자 크기 재설정 */
*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    word-break: break-all;
    box-sizing: border-box;
}

/* 기본 글꼴 크기 설정 */
html {
    font-size: 10px;
}

/* Body 스타일 */
body {
    font-family: "Ubuntu", sans-serif;
    color: #6e6e6e;
    font-size: 1.6rem;
}

/* 헤더와 푸터를 블록 요소로 표시되도록 설정 */
header,
footer {
    display: block;
}

/* 링크 스타일 */
a,
a:link,
a:visited {
    color: #4d4d4d;
    text-decoration: none;
}

/* 이미지 스타일 */
img {
    border: 0;
}

/* 기본 리스트 스타일 제거 */
ul {
    list-style: none;
}

/* 중앙 정렬 컨테이너 */
.center {
    margin: auto;
    width: 110rem;
}

/* 로켓 로더 스타일 */
.rocket-loader {
    /* 먼지 입자 이동 애니메이션 */
    -webkit-animation: moveParticles 6s linear infinite;
    animation: moveParticles 6s linear infinite;
    /* 배경 그라데이션 */
    background: linear-gradient(90deg, gray, transparent 10%) 0 20%/180% 0.2rem repeat-x, linear-gradient(90deg, gray, transparent 20%) 0 80%/150% 0.2rem repeat-x, linear-gradient(90deg, gray, transparent 5%) 0 65%/100% 0.2rem repeat-x, linear-gradient(90deg, gray, transparent 5%) 0 40%/220% 0.2rem repeat-x, linear-gradient(0, white, white);
    /* 테두리와 그림자 */
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    box-shadow: inset 0 0 60px 0 rgba(0, 0, 0, 0.1);
    /* 크기와 위치 */
    height: 125px;
    left: 50%;
    overflow: hidden;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 125px;
}

/* 로켓 로더 앞의 내용 */
.rocket-loader::before {
    /* 깜빡이는 애니메이션 */
    -webkit-animation: blink 1s infinite;
    animation: blink 1s infinite;
    bottom: 6%;
    content: "로딩 중..."; /* 텍스트 내용 */
    font-size: 12px;
    left: 0;
    position: absolute;
    right: 0;
}

/* 로켓 스타일 */
.rocket {
    /* 로켓 이동 애니메이션 */
    -webkit-animation: moveRocket 2s linear infinite;
    animation: moveRocket 2s linear infinite;
    /* 배경 그라데이션 */
    background: lightgray;
    background: linear-gradient(#990000, red, #990000);
    /* 테두리와 위치 */
    border-left: 3px solid rgba(0, 0, 0, 0.4);
    border-radius: 50%/30%;
    height: 15%;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 35%;
}

/* 로켓의 가짜 요소 */
.rocket::before,
.rocket::after {
    content: "";
    position: absolute;
}

/* 로켓 앞의 가짜 요소 */
.rocket::before {
    /* 날개 회전 애니메이션 */
    -webkit-animation: rotateFins 1s infinite;
    animation: rotateFins 1s infinite;
    /* 배경 그라데이션 */
    background: #bababa;
    background: linear-gradient(#990000, red, #990000);
    /* 테두리와 위치 */
    border: 2px solid transparent;
    border-radius: 0 50% 50% 0;
    height: 140%;
    top: 50%;
    transform: translate(0, -50%);
    left: 6px;
    width: 20%;
}

/* 로켓 뒤의 가짜 요소 */
.rocket::after {
    /* 테두리 스타일 */
    border: 7px solid transparent;
    border-left: 14px solid rgba(0, 0, 0, 0.4);
    border-radius: 15%;
    /* 위치 */
    right: -16px;
    top: 2px;
}

/* 로켓 추가효과 스타일 */
.rocket-extras {
    /* 추가효과 이동 애니메이션 */
    -webkit-animation: moveExtras 1s infinite;
    animation: moveExtras 1s infinite;
    /* 배경과 크기 */
    background: rgba(0, 0, 0, 0.4);
    height: 2px;
    left: 12px;
    margin: -2px 0 0;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 10px;
}

/* 로켓 추가효과의 가짜 요소 */
.rocket-extras::before,
.rocket-extras::after {
    content: "";
    position: absolute;
}

/* 로켓 추가효과 앞의 가짜 요소 */
.rocket-extras::before {
    /* 배경 */
    background: white;
    /* 테두리와 위치 */
    border-radius: 50%;
    height: 5px;
    right: -7px;
    top: -1px;
    width: 5px;
}

/* 로켓 추가효과 뒤의 가짜 요소 */
.rocket-extras::after {
    /* 배경과 테두리 */
    background: #cc0000;
    border-top: 1px solid #660000;
    /* 위치 */
    height: 1px;
    left: -10px;
    top: 1px;
    width: 6px;
}

/* 제트 스타일 */
.jet {
    /* 크기와 위치 */
    height: 10px;
    left: -10px;
    position: absolute;
    top: calc(50% - 5px);
    width: 10px;
}

/* 제트의 가짜 요소와 span */
.jet::before,
.jet::after,
.jet span {
    /* 연기 이동 애니메이션 */
    -webkit-animation: moveSmoke 0.3s infinite;
    animation: moveSmoke 0.3s infinite;
    /* 배경, 크기, 위치 */
    background: #e09100;
    border-radius: 50%;
    content: "";
    filter: blur(2px);
    height: 8px;
    left: -6px;
    opacity: 1;
    position: absolute;
    transform: translate(0, 0) scale(1);
    top: 1px;
    width: 15px;
}

/* 제트 뒤의 가짜 요소 */
.jet::after {
    /* 애니메이션 지연 */
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

/* 제트 내 span */
.jet span {
    /* 애니메이션 지연 */
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
```

# 단계 4: 애니메이션 키프레임 추가하기

<div class="content-ad"></div>

우리의 로켓 로더를 활성화하기 위해 다양한 애니메이션을 위한 키프레임을 정의해야 합니다. 이러한 키프레임은 입자, 로켓, 지느러미, 그리고 연기의 움직임을 제어할 것입니다. CSS 파일에 제공된 애니메이션 키프레임을 복사하여 붙여넣어주세요.

```js
/* 입자 움직임 애니메이션을 위한 키프레임 */
@-webkit-keyframes moveParticles {
    100% {
        background-position-x: -500rem;
    }
}

@keyframes moveParticles {
    100% {
        background-position-x: -500rem;
    }
}

/* 로켓 이동 애니메이션을 위한 키프레임 */
@-webkit-keyframes moveRocket {

    0%,
    100% {
        transform: translate(-50%, calc(-50% - 1rem));
    }

    50% {
        transform: translate(-50%, calc(-50% + 1rem));
    }
}

@keyframes moveRocket {

    0%,
    100% {
        transform: translate(-50%, calc(-50% - 1rem));
    }

    50% {
        transform: translate(-50%, calc(-50% + 1rem));
    }
}

/* 지느러미 회전 애니메이션을 위한 키프레임 */
@-webkit-keyframes rotateFins {

    0%,
    100% {
        height: 140%;
    }

    50% {
        border-top: 2px solid #660000;
        border-bottom: 2px solid #660000;
        height: 110%;
    }
}

@keyframes rotateFins {

    0%,
    100% {
        height: 140%;
    }

    50% {
        border-top: 2px solid #660000;
        border-bottom: 2px solid #660000;
        height: 110%;
    }
}

/* 추가 요소 이동 애니메이션을 위한 키프레임 */
@-webkit-keyframes moveExtras {

    0%,
    100% {
        transform: translate(0, calc(-50% + 0.1rem));
    }

    50% {
        transform: translate(0, calc(-50% - 0.1rem));
    }
}

@keyframes moveExtras {

    0%,
    100% {
        transform: translate(0, calc(-50% + 0.1rem));
    }

    50% {
        transform: translate(0, calc(-50% - 0.1rem));
    }
}

/* 연기 이동 애니메이션을 위한 키프레임 */
@-webkit-keyframes moveSmoke {
    100% {
        filter: blur(3px);
        opacity: 0;
        transform: translate(-40px, 0) scale(2);
    }
}

@keyframes moveSmoke {
    100% {
        filter: blur(3px);
        opacity: 0;
        transform: translate(-40px, 0) scale(2);
    }
}

/* 깜빡임 애니메이션을 위한 키프레임 */
@-webkit-keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.2;
    }
}
```

# 단계 5: 테스트 및 조정

모든 파일을 저장하고 웹 브라우저에서 index.html 파일을 엽니다. 애니메이션된 로켓 로더가 작동하는 것을 확인할 수 있어야 합니다! CSS 스타일과 애니메이션 키프레임을 조정하여 로더를 원하는 대로 사용자 정의할 수 있습니다. 색상, 크기, 및 시간을 조절하여 원하는 효과를 얻을 수 있습니다.  