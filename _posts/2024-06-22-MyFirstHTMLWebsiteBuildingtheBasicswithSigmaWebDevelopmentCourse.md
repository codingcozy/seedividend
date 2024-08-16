---
title: "나의 첫 HTML 웹사이트 Sigma 웹 개발 강좌로 기초부터 배우기"
description: ""
coverImage: "/assets/img/2024-06-22-MyFirstHTMLWebsiteBuildingtheBasicswithSigmaWebDevelopmentCourse_0.png"
date: 2024-06-22 15:18
ogImage: 
  url: /assets/img/2024-06-22-MyFirstHTMLWebsiteBuildingtheBasicswithSigmaWebDevelopmentCourse_0.png
tag: Tech
originalTitle: "My First HTML Website: Building the Basics with Sigma Web Development Course"
link: "https://medium.com/@work.abdulhamid/my-first-html-website-building-the-basics-with-sigma-web-development-course-6306fd371003"
isUpdated: true
---




안녕하세요 여러분! Sigma 웹 개발 코스에서의 웹 개발 여정에 대한 또 다른 흥미로운 업데이트로 돌아왔어요. 두 번째 튜토리얼에서는 첫 번째 HTML 웹사이트를 만드는 방법을 배웠어요. 정말 멋진 경험이었고, 여러분과 자세한 내용을 공유할 수 있어 기쁩니다. 함께 알아봐요!

# 비디오 튜토리얼 시청하기

자세한 안내를 보려면 여기 있는 비디오 튜토리얼을 확인하세요: Your First HTML Website | Sigma Web Development Course — Tutorial #2.

# HTML 시작하기

<div class="content-ad"></div>

# 프로젝트 설정하기

먼저, 새 디렉토리를 만들고 다음 파일들을 추가하여 프로젝트 구조를 설정했습니다:

- index.html
- styles.css

# HTML 작성하기

<div class="content-ad"></div>

다음으로, index.html을 열고 첫 번째 웹사이트의 구조를 만들기 위해 HTML 코드를 작성하기 시작했습니다. 아래는 포함한 내용입니다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내 첫 번째 웹사이트</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>내 첫 번째 웹사이트에 오신 것을 환영합니다</h1>
        <nav>
            <ul>
                <li><a href="#about">소개</a></li>
                <li><a href="#projects">프로젝트</a></li>
                <li><a href="#contact">연락</a></li>
            </ul>
        </nav>
    </header>
    <section id="about">
        <h2>나에 대해</h2>
        <p>안녕하세요! 저는 웹 개발자로 성장하고 있는 사람으로 놀라운 웹사이트를 학습하고 만드는 것을 기대하고 있습니다.</p>
    </section>
    <section id="projects">
        <h2>프로젝트</h2>
        <div class="project">
            <h3>프로젝트 1</h3>
            <p>첫 번째 프로젝트에 대한 설명입니다.</p>
        </div>
        <div class="project">
            <h3>프로젝트 2</h3>
            <p>두 번째 프로젝트에 대한 설명입니다.</p>
        </div>
    </section>
    <section id="contact">
        <h2>연락</h2>
        <p>Email: myemail@example.com</p>
    </section>
    <footer>
        <p> 2024 My First Website</p>
    </footer>
</body>
</html>
```

# CSS로 스타일 추가하기

웹사이트에 스타일을 입히기 위해 styles.css를 열고 기본 CSS를 추가했습니다.

<div class="content-ad"></div>

```js
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
```

```js
header {
    background-color: #333;
    color: white;
    padding: 1em 0;
    text-align: center;
}
header h1 {
    margin: 0;
}
nav ul {
    list-style: none;
    padding: 0;
}
nav ul li {
    display: inline;
    margin: 0 1em;
}
nav ul li a {
    color: white;
    text-decoration: none;
}
section {
    padding: 2em;
    margin: 2em 0;
    background-color: #fff;
    border-radius: 8px;
}
#about, #projects, #contact {
    margin: 0 1em;
}
.project {
    margin-bottom: 1em;
}
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1em 0;
    margin-top: 2em;
}
```

이 CSS는 제 웹사이트에 깔끔하고 전문적인 느낌을 주며 다양한 섹션에서 일관된 레이아웃과 스타일링을 제공했습니다.

# 구조 이해하기

<div class="content-ad"></div>

# HTML 태그와 요소

HTML은 콘텐츠를 구조화하는 데 태그를 사용한다는 것을 배웠어요. 태그는 각각 `<tag>`와 같이 꺾은 괄호 안에 들어가요. 각 태그는 여는 `<tag>`와 닫는 `</tag>`를 가지고 있는데, 그 사이에 콘텐츠가 들어가요.

# 섹션 생성하기

웹페이지를 `section` 태그를 사용해 다양한 섹션으로 나눴어요. 각 섹션은 "About Me", "Projects", "Contact"와 같은 특정 목적을 가지고 있었어요.

<div class="content-ad"></div>

# 내비게이션 바

나는 페이지의 다른 섹션에 대한 링크가 포함된 `nav`와 `ul` 태그를 사용하여 내비게이션 바를 만들었습니다. 이는 사용자가 웹 사이트를 쉽게 탐색할 수 있도록 합니다.

# 실험과 맞춤 설정

기본 구조를 구축한 후에는 웹 사이트를 더 맞춤 설정하기 위해 다양한 HTML 요소와 CSS 스타일을 실험하기 시작했습니다. 이미지를 추가하고 폰트를 조정하며 색상을 변경하여 사이트를 시각적으로 더 매력적으로 만들었습니다.

<div class="content-ad"></div>

# 결론

첫 번째 HTML 웹사이트를 만들면서 엄청난 학습 경험을 했어요. 이제 HTML을 사용하여 웹페이지를 구조화하고 CSS로 스타일을 입히는 방법을 확실히 알게 되었습니다. 이 기본 지식은 웹 개발 여정을 계속하면서 중요한 역할을 할 겁니다.

아직 시작 단계에 있다면 Sigma 웹 개발 과정을 따라가는 것을 강력히 추천해요. 다음 튜토리얼에서는 웹 개발 개념을 깊이 이해하고 보다 고급 프로젝트를 만들어볼 거예요.

즐거운 코딩 되세요!