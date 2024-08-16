---
title: "html css js로 간단한 계산기 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Navigating JavaScript My Journey to Building a Simple Calculator"
link: "https://medium.com/@cyrilbassey/navigating-javascript-my-journey-to-building-a-simple-calculator-088146f45f85"
isUpdated: true
---





내 튜터가 JavaScript에서 계산기 함수를 만들라고 시키자, 나는 조금 헷갈렸어. 수업 중 몇 부분에서 완전히 깨어 있지 못한 채로 있었기 때문에 수업의 중요한 부분을 놓쳤어. 결과적으로 과제를 위해 준비가 되지 않았던 거야.

뒤쳐지지 않기 위해 도움을 얻기 위해 YouTube를 찾아봤어. "eval" 함수에 대해 알게 됐는데, 내 코드를 빠르게 작성하는 빠른 방법으로 보였어. 계산기를 만드는 것을 쉽게 할 수 있을 것 같아서 한번 시도해보기로 결심했어.

하지만 계획대로 되지 않았어. 제출했을 때, 튜터가 "eval" 함수를 사용할 수 없다고 했어. 우리는 수업에서 배운 조건문만 사용할 수 있었어. 나는 놀랐고 약간 걱정했어.내가 잘못했을까?

하지만 포기하고 싶지 않았어. 수업에서 배운 것을 준수하며 다시 시도하기로 결심했어. 쉽지 않았어. 갇힌 듯하고 확신이 없는 순간이 있었지만, 계속 도전했어.

<div class="content-ad"></div>

천천히지만 확실하게, 나는 문제들을 이해하기 시작했다. 과제의 각 부분을 차근차근 풀어가면서 올바르게 해냈다. 그리고 갑자기, 모든 것이 이해되었다. 나는 수업에서 배운 것만을 이용해 JavaScript 계산기를 만들었다.

과거를 돌아보면, 무언가를 하기 전에 무엇을 하는지 이해하는 것이 얼마나 중요한지 깨달았다. 개발자로서, 코드를 그냥 복사해서 붙이기만 하는 것이 간단할 수 있다. 하지만 진정한 학습은 개념을 정말로 이해하는 데서 온다는 것을 배웠다.

내 경험을 공유함으로써 고민 중인 다른 사람들에 도움이 되기를 바란다. JavaScript 계산기를 만드는 데 어려움이 있었지만, 그것은 어떤 것을 끝까지 해내고 문제를 해결하며 포기하지 않는 법에 대해 많은 것을 가르쳐줬다. 그것 때문에 감사하다.

그래서 코드 블록을 작성하기 전에 코드의 구성 요소를 설명해보려 한다... 설명은 코드 블록 앞에 올 것이다.

<div class="content-ad"></div>

![이미지](https://miro.medium.com/v2/resize:fit:1280/1*G2X3MKzj-D8az6P2jep0dA.gif)

# 시작해봅시다!

# HTML 파일에서 한 작업을 설명해드릴게요

`html lang=”en”`: 이 코드는 HTML 문서를 시작하고 문서가 영어로 작성되었다는 것을 브라우저에 알려줍니다.

<div class="content-ad"></div>

**head**: 이 섹션에는 문서에 대한 메타데이터가 포함되어 있습니다.

**meta charset=”UTF-8"**: 이는 문서의 문자 인코딩을 UTF-8로 지정하여 다양한 언어와 문자를 지원하도록 합니다.

**meta name=”viewport” content=”width=device-width, initial-scale=1.0"**: 이는 뷰포트를 기기의 너비로 설정하고 초기 줌 레벨을 1.0으로 설정하여 다양한 기기에서 올바른 표시를 보장합니다.

**title`Simple Calculator`/title**: 이는 웹페이지의 제목을 설정하여 브라우저의 제목 표시줄이나 탭에 표시됩니다.

<div class="content-ad"></div>

`link rel=”stylesheet” href=”styles1.css”`: 이 코드는 외부 CSS 파일인 “styles1.css”를 연결하여 계산기를 스타일링합니다.

`/head`: 헤드 섹션의 끝을 표시합니다.

`body`: 이 섹션에는 웹페이지의 visible content가 포함됩니다.

`div class=”calculator”`: 이 코드는 계산기가 들어갈 컨테이너를 생성합니다.

<div class="content-ad"></div>

`input type="text" id="display" readonly`: 여기에는 사용자의 입력 및 계산 결과가 표시되는 입력 필드가 생성됩니다. 직접 사용자 입력을 방지하기 위해 읽기 전용입니다.

`div class="keys"`: 계산기 키/버튼을 위한 컨테이너를 생성합니다.

`` button onclick="clearDisplay()"`C`/button ``: 이 버튼을 클릭하면 디스플레이가 지워집니다.

`` button onclick="appendToDisplay('7')"`7`/button ``: 이 버튼을 클릭하면 숫자 7이 디스플레이에 추가됩니다.

<div class="content-ad"></div>

... (다른 버튼에 대해서도 유사한 줄)

`<script src="script.js"></script>`: 이 코드는 "script.js"라는 외부 JavaScript 파일을 링크하여 계산기에 기능을 제공합니다.

`</body>`: 이것은 body 섹션의 끝을 나타냅니다.

`</html>`: 이것은 HTML 문서의 끝을 나타냅니다.

<div class="content-ad"></div>

# 위에 설명한 내용을 HTML 파일에 붙여 넣을 수 있는 HTML 코드 블록입니다.

```js
<html lang="en">
head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>간단한 계산기</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" readonly>
        <div class="keys">
            <button onclick="clearDisplay()">C</button>
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('+')">+</button>
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('-')">-</button>
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="appendToDisplay('*')">*</button>
            <button onclick="appendToDisplay('0')">0</button>
            <button onclick="appendToDisplay('.')">.</button>
            <button onclick="calculateResult()">=</button>
            <button onclick="appendToDisplay('/')">/</button>
            <button onclick="display.value = display.value.toString().slice(0,-1)" id="operators" class="button">DE</button>
        </div>
    </div>
</body>
</html>
```

<div class="content-ad"></div>

- `.calculator`: 해당 선택자는 클래스가 "calculator"인 요소를 대상으로 합니다.

- `width: 200px;`: "calculator" 클래스를 가진 요소의 너비를 200픽셀로 설정합니다.

- `margin: 50px auto;`: 위아래 여백을 50픽셀로 설정하고, 요소를 가로 중앙으로 정렬하기 위해 자동으로 좌우 여백을 지정합니다.

- `border: 1px solid #ccc;`: 요소 주위에 1픽셀의 회색(#ccc) 실선 테두리를 추가합니다.

<div class="content-ad"></div>

- `border-radius: 5px;`: 요소의 모서리를 5픽셀의 border-radius로 둥글게 만듭니다.

- `padding: 10px;`: 내부에 10픽셀의 간격을 만들기 위해 요소 안에 패딩을 추가합니다.

- `box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);`: 요소에 약간의 음영 효과를 주는 상자 그림자를 추가합니다. 수평 및 수직 오프셋이 0이고, 5픽셀의 흐림 반경, RGBA 형식으로 지정된 색상(0.1의 투명도를 가진 검정색)으로 구성됩니다.

2. `#display`: 이 선택자는 ID가 "display"인 요소를 대상으로 합니다.

<div class="content-ad"></div>

- `width: 100%;`: "display" ID를 가진 요소의 너비를 부모 컨테이너의 너비의 100%로 설정합니다.

- `margin-bottom: 10px;`: 이 요소와 다음 형제 요소 사이에 공간을 만들기 위해 하단 여백을 10픽셀 추가합니다.

- `padding: 5px;`: 요소 내부에 5픽셀의 안쪽 여백을 추가합니다.

3. `.keys`: 이 선택자는 "keys" 클래스를 가진 요소들을 대상으로 합니다.

<div class="content-ad"></div>

- `display: grid;`: "keys" 클래스를 가진 요소를 그리드 컨테이너로 표시합니다.

- `grid-template-columns: repeat(4, 1fr);`: 그리드를 폭이 동일한 4개의 열로 설정합니다.

- `grid-gap: 5px;`: 그리드 아이템 간의 간격을 5px로 추가합니다.

4. `button`: 이 선택자는 "button" 요소를 대상으로 합니다.

<div class="content-ad"></div>

- `padding: 10px;`: 각 버튼 안쪽에 10픽셀의 여백을 추가합니다.

- `font-size: 18px;`: 각 버튼 안의 텍스트 크기를 18픽셀로 설정합니다.

- `border: none;`: 각 버튼 주위의 테두리를 제거합니다.

- `cursor: pointer;`: 각 버튼 위로 마우스를 올리면 커서를 포인터로 변경합니다.

<div class="content-ad"></div>

- `background-color: #f0f0f0;`: 각 버튼의 배경색을 연한 회색 (#f0f0f0)으로 설정합니다.

5. `button:hover`: 이 코드는 버튼을 마우스로 가리킬 때 적용됩니다.

- `background-color: #ddd;`: 마우스를 올렸을 때 각 버튼의 배경색을 약간 더 어두운 회색 (#ddd)으로 변경합니다.

# 아래는 위에서 설명한 CSS 코드 블록입니다:

<div class="content-ad"></div>

당신이 CSS 파일에 직접 붙여넣을 수 있어요

```js
.calculator {
    width: 200px;
    margin: 50px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

#display {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
}

.keys {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
}

button {
    padding: 10px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    background-color: #f0f0f0;
}

button:hover {
    background-color: #ddd;
}
```

# JavaScript 파일에서 한 일에 대한 설명이에요...

- `let display = document.getElementById(‘display’);`: 이 줄은 ID가 "display"인 HTML 요소를 가져와 `display` 변수에 할당해요. 이 요소는 사용자의 입력과 계산 결과가 표시될 곳이에요.
- `function appendToDisplay(value) { … }`: 숫자나 연산자 버튼을 클릭할 때 호출되는 함수에요. 주어진 `value`를 `display` 필드에 추가하여 사용자가 숫자와 연산자를 입력할 수 있도록 해줘요.
- `function clearDisplay() { … }`: 'C' (지우기) 버튼을 클릭할 때 호출되는 함수에요. `display` 필드의 내용을 지워 새 계산을 시작할 수 있게 해줘요.
- `function calculateResult() { … }`: '=' (등호) 버튼을 클릭할 때 호출되는 함수에요. 사용자가 입력한 식의 결과를 계산하여 `display` 필드에 결과를 업데이트해줘요.

<div class="content-ad"></div>

- `let expression = display.value;`: 이 코드는 `display` 필드의 내용을 가져와서 사용자가 입력한 수학식을 나타내는 변수 `expression`에 할당합니다.
- `let result;`: 이는 계산된 결과를 저장할 변수 `result`를 선언합니다.
- `if…else if` 문은 `expression`에서 산술 연산자(+, -, \*, /)의 유무를 확인하고 해당하는 산술 연산을 수행합니다.
- 각 조건 내에서는 피연산자에 따라 수식을 나누고, `parseFloat`를 사용하여 부동 소수점 숫자로 변환한 후, 산술 연산을 수행합니다.
- 수식에 나눗셈(`/`)이 포함되어 있고 나누는 수가 0인 경우, 0으로 나누는 것을 피하기 위해 오류 메시지를 반환합니다.
- 마지막으로, 계산된 `result`가 `display` 필드에 할당되어 계산 결과를 표시합니다.

이 CSS 파일에 직접 붙여넣을 수 있습니다

```js
let display = document.getElementById("display");

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculateResult() {
  let expression = display.value;
  let result;

  if (expression.includes("+")) {
    let numbers = expression.split("+");
    result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
  } else if (expression.includes("-")) {
    let numbers = expression.split("-");
    result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
  } else if (expression.includes("*")) {
    let numbers = expression.split("*");
    result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
  } else if (expression.includes("/")) {
    let numbers = expression.split("/");
    if (parseFloat(numbers[1]) === 0) {
      result = "Error: Division by zero";
    } else {
      result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    }
  }

  display.value = result;
}
```

나는 작업한 각 코드 조각이 개발자로서成長하는 데 도움이되었습니다. 분명히 멈춰있거나 불확실한 순간이 있었지만, 그런 순간이 알아내면서 느낀 성취감에 비해 훨씬 많았습니다.

<div class="content-ad"></div>

앞으로, 나는 더 나은 스킬 향상과 새로운 것을 배우는 것을 열망하고 있어. 내가 쓰는 각 줄의 코드는 프로그래밍에서 내 목표에 한 걸음 더 다가가게 해줘.

이 여정은 코드 그 자체뿐만 아니라, 내가 배운 교훈, 마주한 도전, 그리고 기다리고 있는 흥미로운 기회에 대한 것이기도 해. 나는 이 여정의 모든 부분에 감사하고 있어.

내 프로젝트를 계속 여기에 공유하고, 어떻게 해 나아갔는지도 계속 알려줄게...
