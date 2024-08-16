---
title: "HTML, CSS, 및 JavaScript로 기본 계산기 만들기 방법"
description: ""
coverImage: "/assets/img/2024-07-09-BuildingaBasicCalculatorUsingHTMLCSSandJavaScript_0.png"
date: 2024-07-09 18:11
ogImage: 
  url: /assets/img/2024-07-09-BuildingaBasicCalculatorUsingHTMLCSSandJavaScript_0.png
tag: Tech
originalTitle: "Building a Basic Calculator Using HTML, CSS, and JavaScript"
link: "https://medium.com/@bhageshwaree11/building-a-basic-calculator-using-html-css-and-javascript-346ac49a7f58"
isUpdated: true
---



<img src="/assets/img/2024-07-09-BuildingaBasicCalculatorUsingHTMLCSSandJavaScript_0.png" />

안녕하세요! 웹 개발의 다이내믹한 세계에 오신 것을 환영합니다. 상호작용적이고 기능적인 사용자 인터페이스를 만들 수 있는 능력은 중요한 기술입니다. 개인 웹사이트부터 복잡한 웹 애플리케이션까지, 이 기술은 현대 디지털 경험의 핵심 요소입니다. 이러한 기술을 연마하기에 완벽한 프로젝트는 기본 계산기를 만드는 것입니다. 이 단계별 튜토리얼에서 우리는 HTML, CSS 및 JavaScript의 3대 요소를 사용하여 간단한 계산기를 만드는 흥미진진한 여정을 떠날 것입니다. 이 안내서를 마치면 작동하는 계산기뿐만 아니라 이러한 기술이 어떻게 원활하게 함께 작동하는지에 대한 깊은 이해도 얻게 될 것입니다.

HTML 설정하기

이 여정은 HTML을 통해 우리 계산기의 구조적 기반을 만드는 것으로 시작됩니다. 웹의 마크업 언어인 HTML은 프로젝트에 구조를 부여합니다. 아래는 우리 계산기를 위한 무대를 설정하는 HTML 코드 일부입니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Calculator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="calculator">
        <input type="text" id="result" readonly>
        <div class="buttons">
            <button class="clear">C</button>
            <button class="operator">/</button>
            <button class="operator">*</button>
            <button class="operator">-</button>
            <button class="number">7</button>
            <button class="number">8</button>
            <button class="number">9</button>
            <button class="operator">+</button>
            <button class="number">4</button>
            <button class="number">5</button>
            <button class="number">6</button>
            <button class="equals">=</button>
            <button class="number">1</button>
            <button class="number">2</button>
            <button class="number">3</button>
            <button class="number">0</button>
            <button class="decimal">.</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>
```

CSS 스타일링

기반 작업이 완료되었으니, 이제 CSS가 제공하는 시각적 매력을 추가할 시간입니다. CSS는 우리의 계산기에 미학과 레이아웃을 제공하여 사용자들에게 시각적으로 매력적인 환경을 제공합니다. 아래는 우리 계산기 모습을 부여하는 CSS 코드 일부분입니다.

```js
* {
    box-sizing: border-box;
    margin: 0;
  }

  .calculator {
    background-color: black;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    border: solid 1px #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-top: 40px;
  }

  #result {
     background-color: yellowgreen;
     width: 100%;
     padding: 10px;
     font-size: 24px;
     border: none;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3) inset;
     border-radius: 5px;
  }

  .buttons {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     grid-gap: 10px;
     margin-top: 20px;
  }

  button {
     padding: 10px;
     font-size: 24px;
     border: none;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
     border-radius: 5px;
     cursor: pointer;
     transition: background-color 0.3s ease;
  }

  button:hover {
     background-color: #ddd;
  }

  .clear {
     background-color: #ff4136;
     color: #fff;
  }

  .number, .decimal {
     background-color: #fff;
     color: #333;
  }

  .operator {
     background-color: #0074d9;
     color: #fff;
  }

  .equals {
     background-color: #01ff70;
     grid-row: span 3;
     color: #fff;
  }
```

<div class="content-ad"></div>

자바스크립트로 기능 추가하기

자바스크립트는 우리의 계산기에 상호 작용성을 부여하는 마법 지팡이입니다. 버튼을 클릭함으로써 계산을 가능하게 하는 엔진입니다. 아래에서는 우리의 계산기 기능을 부여하는 코드 세그먼트를 자세히 살펴보겠습니다.

```js
const button = document.querySelectorAll("button");
const result = document.getElementById("result");

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", () => {
    const buttonValue = button[i].textContent;
    if (buttonValue === "C") {
      clearResult();
    } else if (buttonValue === "=") {
      calculateResult();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  result.value = "";
}

function calculateResult() {
  result.value = eval(result.value);
}

function appendValue(buttonValue) {
  result.value = result.value + buttonValue;
}
```

계산기를 만드는 것은 웹 개발 여정에서 작지만 중요한 단계입니다. HTML, CSS 및 자바스크립트에서 얻은 능력을 가지고 있으면 앞으로 나아가는 도중 마주치게 될 여러 도전에 대비할 수 있습니다. 사용자 중심 웹사이트를 개발하거나 몰입형 웹 애플리케이션을 만들거나 최신 웹 트렌드를 탐구하는 등, 이 계산기를 만들면서 배운 교훈은 여러분의 코딩 역량의 중추가 될 것입니다.

<div class="content-ad"></div>

GitHub :- https://github.com/bhageshwaree11/basic-calculator
