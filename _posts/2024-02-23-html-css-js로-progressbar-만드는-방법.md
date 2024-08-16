---
title: "html css js로 progressbar 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 16:52
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---





# html css js로 progressbar 만드는 방법

<img src="./img/2024-02-23-html-css-js로-progressbar-만드는-방법-1.gif" width="500" />

# 소개:

Progress Bar는 포트폴리오와 이력서에서 흔히 볼 수 있는 기능으로, 어드민 페이지 같은 데이터를 많이 사용하는 곳에서 이용되는데요.
이 글에서는 HTML, CSS 및 JavaScript를 사용하여 인터랙티브한 Progress Bar를 만드는 방법에 대해 살펴보겠습니다.

# HTML 구조:

Progress Bar의 HTML 구조를 먼저 작성해보겠습니다. 콘텐츠를 구성하기 위해 'section', 'h3', 'div', 'p'와 같은 의미 있는 HTML 요소를 사용합니다. 이름, 진행 막대 및 퍼센트를 나타내는 컨테이너로 사용될 요소들입니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <!-- importing "Poppins" font family from google font -->
    <title>Skill Bar</title>
  </head>
  <body>
    <section class="skills" id="skills">
      <h3 class="skills-header">My Skills</h3>
      <div class="skills-container">
        <div class="skill-container">
          <p>HTML</p>
          <div class="percentage html-percentage">90%</div>
          <div class="bar">
            <span class="html"></span>
          </div>
        </div>

        <div class="skill-container">
          <p>CSS</p>
          <div class="percentage css-percentage">90%</div>
          <div class="bar">
            <span class="css"></span>
          </div>
        </div>

        <div class="skill-container">
          <p>JavaScript</p>
          <div class="percentage javascript-percentage">80%</div>
          <div class="bar">
            <span class="javascript"></span>
          </div>
        </div>

        <div class="skill-container">
          <p>React.JS</p>
          <div class="percentage react-percentage">70%</div>
          <div class="bar">
            <span class="react"></span>
          </div>
        </div>

        <div class="skill-container">
          <p>Node.JS</p>
          <div class="percentage node-percentage">50%</div>
          <div class="bar">
            <span class="node"></span>
          </div>
        </div>
      </div>
    </section>
    <script src="./script.js"></script>
  </body>
</html>
```

<div class="content-ad"></div>

# CSS 스타일링:

다음으로 CSS를 사용하여 Progress Bar를 스타일링합니다. 전반적인 레이아웃, 진행바 컨테이너, 진행 막대 및 퍼센트 표시기에 대한 스타일을 정의합니다. 또한 막대의 시각적 매력을 높이기 위해 애니메이션을 포함합니다.

```css
*,
::before,
::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  background: #111222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.skills {
  width: 600px;
  min-width: 300px;
  max-width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.skills-header {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.skills-container {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.skill-container {
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  position: relative;
}

.skill-container p {
  margin: 5px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}

.bar {
  width: 100%;
  background: #475472;
  display: block;
  height: 20px;
  border: none;
  border-radius: 100vw;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 8, 0.25, 1);
}

.bar span {
  height: 20px;
  float: left;
  background: #5271ff;
  border: none;
  border-radius: 100vw;
}

/* adding animation to skill bar */

.html.animate,
.css.animate {
  width: 90%;
  animation: html_css 3s;
}

.javascript.animate {
  width: 80%;
  animation: javascript 3s;
}

.react.animate {
  width: 70%;
  animation: react 3s;
}

.node.animate {
  width: 50%;
  animation: node 3s;
}

@keyframes html_css {
  0% {
    width: 0%;
  }

  100% {
    width: 90%;
  }
}

@keyframes javascript {
  0% {
    width: 0%;
  }

  100% {
    width: 80%;
  }
}

@keyframes react {
  0% {
    width: 0%;
  }

  100% {
    width: 70%;
  }
}

@keyframes node {
  0% {
    width: 0%;
  }

  100% {
    width: 50%;
  }
}

.percentage {
  content: "";
  position: absolute;
  top: 12px;
  width: 25px;
  height: 20px;
  background: #5271ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 2px;
  z-index: 10;
  transition: all 0.3s ease-in-out;
}

.percentage::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  margin: auto;
  width: 10px;
  height: 10px;
  background: #5271ff;
  z-index: -1;
}

/* adding animation to .percentage */

.html-percentage.animate,
.css-percentage.animate {
  left: 90%;
  animation: html_css_percentage 3s;
}

.javascript-percentage.animate {
  left: 80%;
  animation: javascript_percentage 3s;
}

.react-percentage.animate {
  left: 70%;
  animation: react_percentage 3s;
}

.node-percentage.animate {
  left: 70%;
  animation: react_percentage 3s;
}

@keyframes html_css_percentage {
  0% {
    left: 0;
  }
  100% {
    left: 90%;
  }
}

@keyframes javascript_percentage {
  0% {
    left: 0;
  }
  100% {
    left: 80%;
  }
}

@keyframes react_percentage {
  0% {
    left: 0;
  }
  100% {
    left: 70%;
  }
}

@keyframes node_percentage {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
  }
}
```

<div class="content-ad"></div>

# JavaScript 상호작용:

Progress Bar를 상호작용 가능하게 만들기 위해 JavaScript를 사용합니다. 막대가 화면에 나타날 때 애니메이션을 트리거하기 위해 Intersection Observer API를 사용합니다. 또한 막대의 너비를 기반으로 퍼센트 표시기의 위치를 동적으로 계산하고 설정합니다.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    spans.forEach((span, index) => {
      const percentage = percentages[index];
      if (entry.isIntersecting) {
        span.classList.add("animate");
        percentage.classList.add("animate");
      } else {
        span.classList.remove("animate");
        percentage.classList.remove("animate");
      }
    });
  });
});

const skillContainer = document.querySelector(".skills-container");
const spans = document.querySelectorAll(".bar span");
const percentages = document.querySelectorAll(".percentage");
observer.observe(skillContainer);

function updatePercentagePositions() {
  const barWidth = document.querySelector(".bar").clientWidth;
  percentages.forEach((percentage) => {
    const widthPercentage = parseFloat(percentage.textContent) / 100;
    percentage.style.left = `${barWidth * widthPercentage - 12.5}px`;
  });
}

updatePercentagePositions(); // Call initially
```

# 결론:

이 튜토리얼에서는 HTML, CSS 및 JavaScript를 사용하여 인터랙티브한 Progress Bar를 만드는 방법을 배웠습니다. 이러한 기술을 결합하여 웹사이트와 포트폴리오에서 기술을 시각적으로 매력적이고 매력적으로 표현할 수 있습니다.
