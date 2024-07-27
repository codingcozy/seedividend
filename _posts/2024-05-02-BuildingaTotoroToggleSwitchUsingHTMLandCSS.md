---
title: "HTML과 CSS를 사용하여 토토로 토글 스위치 만들기"
description: ""
coverImage: "/assets/img/2024-05-02-BuildingaTotoroToggleSwitchUsingHTMLandCSS_0.png"
date: 2024-05-02 00:19
ogImage: 
  url: /assets/img/2024-05-02-BuildingaTotoroToggleSwitchUsingHTMLandCSS_0.png
tag: Tech
originalTitle: "Building a Totoro Toggle Switch Using HTML and CSS"
link: "https://medium.com/@withaarzoo/building-a-totoro-toggle-switch-using-html-and-css-5043c1904451"
---


![이미지](https://miro.medium.com/v2/resize:fit:1200/1*iYFn9d8WYGm9cfRXBZVzLg.gif)

웹 프로젝트에 재미를 더해볼 준비가 되셨나요? 오늘의 #100DaysOfCode 챌린지에서는 HTML과 CSS를 사용하여 토토로 토글 스위치를 만들어보려고 해요.

이 즐거운 상호 작용 프로젝트는 여러분의 코딩 스킬을 향상시킬 뿐만 아니라 여러분에게 웃음을 선사할 거에요! 함께 단계별로 알아보도록 할게요.

# 단계 1: 환경 설정하기

<div class="content-ad"></div>

시작하기 전에 텍스트 편집기를 준비해주세요. 원하는 에디터를 사용할 수 있어요. 인기 있는 선택지로는 Visual Studio Code, Sublime Text, 또는 Atom이 있어요. 프로젝트를 위한 폴더도 만들어봅시다.

## 단계 2: 소스 코드 다운로드

프로젝트의 전체 소스 코드를 여기서 다운로드할 수 있어요.

## 단계 3: HTML 구조 만들기

<div class="content-ad"></div>

텍스트 에디터를 열고 새 HTML 파일을 만들어보세요. 파일 이름을 index.html로 지정해 볼까요? 기본 HTML 구조를 설정하는 것부터 시작해봅시다.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- 문자 인코딩 및 호환성 설정 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 외부 스타일시트 링크 -->
    <link rel="stylesheet" href="style.css">
    <!-- 문서 제목 -->
    <title>Totro 토글 스위치</title>
</head>

<body>
    <!-- 토글 스위치를 위한 래퍼 -->
    <div class='wrap'>
        <!-- 토글로 사용되는 체크박스 입력 -->
        <input type='checkbox'>
        <!-- 토토로 캐릭터 컨테이너 -->
        <div class='totoro'>
            <!-- 토토로의 귀 -->
            <div class='ears'>
                <div class='ear'></div>
                <div class='ear'></div>
            </div>
            <!-- 토토로의 팔 -->
            <div class='arm'></div>
            <div class='arm'></div>
            <!-- 토토로의 발 -->
            <div class='foot'></div>
            <div class='foot two'></div>
            <!-- 토토로의 몸통 -->
            <div class='body'>
                <!-- 토토로 몸통의 반점 -->
                <div class='spots'>
                    <div class='spot'></div>
                    <div class='spot'></div>
                    <div class='spot'></div>
                    <div class='spot'></div>
                    <div class='spot'></div>
                    <div class='spot'></div>
                    <div class='spot'></div>
                </div>
                <!-- 토토로의 얼굴 특징 -->
                <div class='inner'>
                    <div class='mouth'></div>
                    <div class='eye'></div>
                    <div class='eye'></div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

# Step 4: 토토로의 CSS 스타일링 추가하기

이제 CSS 스타일링을 추가하여 토토로 캐릭터를 활기차게 만들어봅시다. style.css라는 새 CSS 파일을 만들고 HTML 파일에 링크를 걸어주세요.

<div class="content-ad"></div>

```js
/* 본문 스타일링 */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    perspective: 600px;
    background: radial-gradient(circle at center, #cfe4a1, #8eb735);
    overflow: hidden;
}

/* 모든 요소에 대해 3D 변환 유지 */
body * {
    transform-style: preserve-3d;
}

/* 토로 스위치 래퍼 */
body .wrap {
    width: 275px;
    height: 100px;
    position: relative;
    box-shadow: 0 0 0 2px #eee, 0 0 40px 0px rgba(0, 0, 0, 0.15);
    border-radius: 500px;
    background: #fff;
}

/* 래퍼 내 모든 요소에 전환 적용 */
body .wrap * {
    transition: 0.25s linear;
}

/* 토로 캐릭터 스타일링 */
body .wrap .totoro {
    position: absolute;
    width: 100px;
    height: 150px;
    left: 0px;
    top: -30px;
    background: #bbb;
    border-radius: 170px 170px 100px 100px/300px 300px 200px 200px;
    z-index: 2;
}

body .wrap .totoro:before,
body .wrap .totoro:after {
    content: "";
    position: absolute;
    width: 300vw;
    height: 300vh;
    left: -100vw;
    top: -100vh;
    background: rgba(6, 61, 109, 0.75);
    z-index: -1;
    transform: translateZ(-10px);
    opacity: 0;
    transition: 0.5s ease-in-out;
    pointer-events: none;
}

// 이하 생략
```

### 단계 5: 사용자 정의 및 테스트

CSS 코드를 조정하여 토토로 캐릭터의 모양과 애니메이션을 자유롭게 사용자 정의하세요. 만족하시면 파일을 저장하고 웹 브라우저에서 index.html을 열어 토글 스위치를 테스트하세요.

### 단계 6: 프로젝트 공유!

<div class="content-ad"></div>

토토로 토글 스위치를 만들어 축하드려요! #100DaysOfCode 해시태그를 사용해 소셜 미디어에 프로젝트를 공유하고 코딩 여정을 자랑해주세요. 제 프로젝트에 태그를 달고 의견을 알려주시면 감사하겠어요!

# 단계 7: 연락하기

이 프로젝트에 관한 질문이나 피드백이 있다면 언제든지 Bento를 통해 연락해 주세요. 여러분의 의견을 듣고 싶어요!

행복한 코딩을 하시고 여러분의 코딩 여정을 멋지게 이어가세요! 🚀✨