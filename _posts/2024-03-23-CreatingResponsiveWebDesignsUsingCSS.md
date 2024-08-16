---
title: "React에서 CSS를 활용한 반응형 사이트 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Creating Responsive Web Designs Using CSS"
link: "https://medium.com/@fitrafilthmongers/creating-responsive-web-designs-using-css-b9084f86f7c5"
isUpdated: true
---





웹 개발의 계속 변화하는 풍경에서 반응형 웹사이트를 만드는 것이 중요해졌어요. 오늘날 다양한 기기와 화면 크기로 인해 웹사이트가 모든 플랫폼에서 완벽하게 보이고 작동되도록 하는 것이 중요합니다. Cascading Style Sheets (CSS)는 유연하고 적응 가능한 레이아웃을 만들 수 있는 수단을 제공함으로써 이 목표를 달성하는 데 중요한 역할을 합니다. 이 튜토리얼에서는 CSS를 사용하여 반응형 웹 디자인의 기본을 살펴볼 거예요.

반응형 웹 디자인 이해하기

반응형 웹 디자인은 데스크톱, 랩톱부터 태블릿과 스마트폰까지 다양한 기기에서 최적의 화면 표시 및 상호작용 경험을 보장하는 웹사이트를 구축하는 접근 방식입니다. 반응형 디자인의 주요 원칙에는 유연한 그리드, 유연한 이미지 및 미디어 쿼리가 포함됩니다.

HTML 구조 설정하기

<div class="content-ad"></div>

CSS에 빠지기 전에 웹페이지를 위한 기본 HTML 구조를 설정해 보죠:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>반응형 웹 디자인 튜토리얼</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>반응형 웹 디자인</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">홈</a></li>
            <li><a href="#">소개</a></li>
            <li><a href="#">서비스</a></li>
            <li><a href="#">문의</a></li>
        </ul>
    </nav>
    <section>
        <h2>우리 웹사이트에 오신 걸 환영합니다</h2>
        <p>이것은 샘플 텍스트입니다. 교체하세요.</p>
    </section>
    <footer>
        <p>&copy; 2024 귀하의 웹사이트. 판권 소유. </p>
    </footer>
</body>
</html>
```

CSS를 사용하여 스타일을 만들어 보죠.

이제 웹사이트를 반응형으로 만들기 위해 CSS를 추가해 보겠습니다. `styles.css`라는 이름의 파일을 만들고 HTML 파일에 연결해 주세요.

<div class="content-ad"></div>

```js
/* styles.css */

/* 기본 여백과 패딩 재설정 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 기본 스타일 설정 */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f2f2f2;
}

header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px 0;
}

nav {
    background-color: #666;
}

nav ul {
    list-style-type: none;
    text-align: center;
}

nav ul li {
    display: inline;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    display: inline-block;
}

section {
    padding: 20px;
    margin: 20px;
    background-color: #fff;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
}
```

반영 미디어 쿼리

미디어 쿼리를 이용하면 기기의 특성에 따라 다른 스타일을 적용할 수 있습니다. 웹사이트를 반응형으로 만들기 위해 미디어 쿼리를 추가해봅시다.

```js
/* 반응형을 위한 미디어 쿼리 */
@media only screen and (max-width: 768px) {
    /* 작은 화면에 맞춰 네비게이션 조정 */
    nav ul li {
        display: block;
        margin-bottom: 10px;
    }
}

@media only screen and (max-width: 600px) {
    /* 작은 화면에 맞춰 헤더와 푸터 조정 */
    header h1 {
        font-size: 24px;
    }
    footer p {
        font-size: 14px;
    }
}
```

<div class="content-ad"></div>

결론

이번 튜토리얼에서는 CSS를 사용하여 반응형 웹 디자인을 만드는 기본 사항에 대해 다뤘습니다. 유연한 그리드, 가변 이미지, 미디어 쿼리를 활용하여 웹사이트가 다양한 기기에서 멋지게 보이고 매끄럽게 작동하도록 할 수 있습니다. 다양한 기기에서 디자인을 테스트하고 다양한 기술을 실험하여 반응형 웹 개발 기술을 향상시키고 개선해 보세요. 즐거운 코딩되세요!
