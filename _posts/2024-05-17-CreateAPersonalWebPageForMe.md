---
title: "나를 위한 개인 웹 페이지 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-CreateAPersonalWebPageForMe_0.png"
date: 2024-05-17 03:33
ogImage: 
  url: /assets/img/2024-05-17-CreateAPersonalWebPageForMe_0.png
tag: Tech
originalTitle: "Create A Personal Web Page For Me"
link: "https://medium.com/@compcit/create-a-personal-web-page-for-me-4c4a935d046f"
isUpdated: true
---




웹 페이지를 자랑하는 데 도움이 되는 간단한 코드를 제공했습니다. 코드에 여러 기능을 추가하여 나만의 것을 만들어보세요. 이 코드는 단순한 구조일 뿐입니다. "John Doe"를 위한 웹 페이지를 만들어봅시다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YOUR_NAME - YOUR_ROLE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 1em 0;
            text-align: center;
        }
        nav {
            display: flex;
            justify-content: center;
            background-color: #333;
        }
        nav a {
            color: white;
            padding: 1em;
            text-decoration: none;
            text-align: center;
        }
        nav a:hover {
            background-color: #575757;
        }
        .container {
            padding: 2em;
            max-width: 800px;
            margin: auto;
        }
        footer {
            text-align: center;
            padding: 1em 0;
            background-color: #333;
            color: white;
        }
    </style>
</head>
<body>
    <header>
        <h1>YOUR_NAME</h1>
        <p>YOUR_ROLE</p>
    </header>
    <nav>
        <a href="#about">About Me</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
        <a href="#blog">Blog</a>
    </nav>
    <div class="container">
        <section id="about">
            <h2>About Me</h2>
            <p>Hello! I'm YOUR_NAME, YOUR_DESCRIPTION.</p>
        </section>
        <section id="portfolio">
            <h2>Portfolio</h2>
            <p>Here are some of my recent projects:</p>
            <ul>
                <li><strong>Project 1:</strong> Description of project 1.</li>
                <li><strong>Project 2:</strong> Description of project 2.</li>
                <li><strong>Project 3:</strong> Description of project 3.</li>
            </ul>
        </section>
        <section id="contact">
            <h2>Contact</h2>
            <p>You can reach me at:</p>
            <ul>
                <li>Email: YOUR_EMAIL</li>
                <li>LinkedIn: <a href="YOUR_LINKEDIN_PROFILE" target="_blank">YOUR_LINKEDIN_PROFILE</a></li>
                <li>Twitter: <a href="YOUR_TWITTER_PROFILE" target="_blank">@YOUR_TWITTER_HANDLE</a></li>
            </ul>
        </section>
        <section id="blog">
            <h2>Blog</h2>
            <p>Welcome to my blog! Here, I share my thoughts on software development, technology trends, and much more. Stay tuned for updates!</p>
        </section>
    </div>
    <footer>
        <p>&copy; 2024 YOUR_NAME</p>
    </footer>
</body>
</html>
```

플레이스홀더 정보(예: "John Doe", "Software Developer", 연락처 정보)를 실제 정보로 바꿔주세요. 이 템플릿은 자신의 정보로 About Me 섹션, 포트폴리오, 연락처 정보, 블로그 섹션을 포함하고 깔끔하고 전문적인 디자인을 위해 간단한 CSS로 스타일링된 것입니다. 필요에 맞게 내용과 스타일을 조정해주세요.