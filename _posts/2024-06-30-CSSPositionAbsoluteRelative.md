---
title: "CSS Position  Absolute와 Relative 비교 올바르게 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-30-CSSPositionAbsoluteRelative_0.png"
date: 2024-06-30 18:37
ogImage: 
  url: /assets/img/2024-06-30-CSSPositionAbsoluteRelative_0.png
tag: Tech
originalTitle: "CSS Position — Absolute , Relative"
link: "https://medium.com/@sonikamaheshwari067/css-position-arelative-564c1eaed407"
isUpdated: true
---




# 위치: 상대적(relative);

요소가 상대적으로 위치할 때는 문서 흐름에서의 정상적인 위치를 기준으로 배치됩니다. 주변 요소에 영향을 미치지 않으며 문서 흐름 상에서의 위치를 유지합니다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상대적 위치 설정 예시</title>
    <style>
        .relative-box {
            width: 200px;
            height: 100px;
            background-color: lightblue;
            position: relative;
            top: 20px;
            left: 30px;
        }
        .text {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="relative-box">
        상대적으로 위치한 상자입니다.
    </div>
    <div class="text">
        상자 아래에 있는 일부 텍스트입니다.
    </div>
</body>
</html>
```

# 위치: 절대적(absolute);

<div class="content-ad"></div>

절대 위치로 요소를 배치하면 이 요소는 가장 가까운 위치 지정된 조상에 대해 배치됩니다 (즉, 정적이 아닌 위치를 가진 가장 가까운 조상). 이러한 조상이 없는 경우 초기 포함 블록에 대해 배치됩니다 (일반적으로 뷰포트).

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>절대 위치 지정 예시</title>
    <style>
        .relative-container {
            position: relative;
            width: 300px;
            height: 200px;
            background-color: lightgray;
        }
        .absolute-box {
            position: absolute;
            top: 20px;
            right: 30px;
            width: 100px;
            height: 50px;
            background-color: lightcoral;
        }
        .text {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="relative-container">
        <div class="absolute-box">
            저는 절대 위치로 배치된 상자입니다.
        </div>
        컨테이너
    </div>
    <div class="text">
        컨테이너 아래의 텍스트입니다.
    </div>
</body>
</html>
```

또는

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상대 및 절대 위치 지정 예시</title>
    <style>
        .outer-container {
            width: 400px;
            height: 300px;
            background-color: lightgray;
            position: relative;
            margin-bottom: 20px;
        }

        .inner-container {
            width: 300px;
            height: 200px;
            background-color: lightblue;
            position: relative;
            top: 20px;  /* inner-container의 위치에서 아래로 20px 이동 */
            left: 20px; /* inner-container의 위치에서 오른쪽으로 20px 이동 */
        }

        .absolute-box {
            width: 100px;
            height: 50px;
            background-color: lightcoral;
            position: absolute;
            bottom: 10px; /* 상자를 inner-container의 하단에서 10px로 배치 */
            left: 10px;   /* 상자를 inner-container의 왼쪽에서 10px로 배치 */
        }

        .text {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="outer-container">
        <div class="inner-container">
            <div class="absolute-box">
                저는 절대 위치로 배치된 상자입니다.
            </div>
            저는 상대적 위치로 배치된 내부 컨테이너입니다.
        </div>
        저는 상대적 위치로 배치된 외부 컨테이너입니다.
    </div>
    <div class="text">
        외부 컨테이너 아래의 텍스트입니다.
    </div>
</body>
</html>
```

<div class="content-ad"></div>

# 읽어 주셔서 감사합니다

- 장기 멘토십을 위해 Preplaced.com에서 연락하세요,

무료 체험 신청하세요! — https://www.preplaced.in/profile/sonika-maheshwari

📰 코딩 및 디자인 라운드 인터뷰에 대한 더 많은 콘텐츠 보기 - https://sonikamaheshwari067.medium.com/

<div class="content-ad"></div>

🔔 Follow me on LinkedIn! — [https://www.linkedin.com/in/sonika-maheshwari-81542220/](https://www.linkedin.com/in/sonika-maheshwari-81542220/)

저는 항상 개선할 부분이 있을 것이라고 믿어요. 의견을 자유롭게 공유해주세요.