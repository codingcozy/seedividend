---
title: "CSS 애니메이션을 활용하여 버튼에 빛나는 효과 추가하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Adding a dynamic Glow Effect to a Button with CSS animation"
link: "https://medium.com/@ashishpaul5055/adding-a-dynamic-glow-effect-to-a-button-with-css-animation-a70aeb809206"
isUpdated: true
---





HTML과 CSS를 사용하여 반짝이는 버튼 애니메이션 만들기

버튼은 웹 디자인에서 필수적인 요소이며, 그들에 애니메이션을 추가함으로써 사용자 상호작용을 향상시키고 사용자 경험을 더 매력적으로 만들 수 있습니다. 이 튜토리얼에서는 HTML과 CSS를 사용하여 반짝이는 버튼 애니메이션을 만드는 방법을 안내합니다.

HTML 구조:

우선 HTML 구조부터 시작해봅시다. 간단한 버튼을 만들고 내부에 일부 텍스트를 넣겠습니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Button Animation by Ashish</title>
</head>
<body>
  <a class="box__link button-animation" href="#">
    Submit
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </a>
</body>
</html>
```

여기서 "button-animation" 클래스를 가진 `a` 태그가 있습니다. 그 안에 "Submit" 텍스트와 네 개의 빈 `span` 태그가 있습니다. 이러한 `span` 태그들은 빛나는 효과를 만들기 위해 사용될 것입니다.

CSS 스타일링:

이제 CSS 부분으로 이동하여 버튼에 스타일과 애니메이션을 추가해 봅시다.

<div class="content-ad"></div>

```css
/*=============== GOOGLE FONTS ===============*/
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

/*=============== VARIABLES CSS ===============*/
:root {
  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --body-color: #393937;
  --accent-color: #03e9f4;
  --white-color: #fff;
  --box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px
      #03e9f4;

  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Montserrat", sans-serif;
  --normal-font-size: 1rem;

  /*========== Font weight ==========*/
  --font-regular: 400;
  --font-semi-bold: 600;

  /*========== z index ==========*/
  --z-tooltip: 10;
  --z-fixed: 100;
}

/*=============== BASE ===============*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background: var(--body-color);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

.button-animation {
  position: relative;
  display: inline-block;
  padding: 20px 30px;
  color: var(--accent-color);
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 4px;
  transition: 0.5s;
}

.button-animation span {
  position: absolute;
  display: block;
}

.button-animation span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-color));
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

/* Similar animations for other 3 spans */

.button-animation:hover {
  background-color: var(--accent-color);
  color: var(--white-color);
  border-radius: 5px;
  box-shadow: var(--box-shadow);
}
```

<div class="content-ad"></div>

HTML 구조와 CSS 스타일 및 애니메이션을 조합하여 시각적으로 매력적인 빛나는 버튼 애니메이션을 만들었습니다. 색상, 글꼴 및 애니메이션 지속 시간을 사용자 정의하여 디자인 취향에 맞게 조정할 수 있습니다.
