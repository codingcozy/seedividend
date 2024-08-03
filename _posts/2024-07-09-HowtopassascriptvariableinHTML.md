---
title: "HTML에서 스크립트 변수를 전달하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-HowtopassascriptvariableinHTML_0.png"
date: 2024-07-09 18:07
ogImage:
  url: /assets/img/2024-07-09-HowtopassascriptvariableinHTML_0.png
tag: Tech
originalTitle: "How to pass a script variable in HTML?"
link: "https://medium.com/@brajagopal.tripathi/how-to-pass-a-script-variable-in-html-4436eb41a12e"
---

<img src="/assets/img/2024-07-09-HowtopassascriptvariableinHTML_0.png" />

HTML에서 스크립트 변수를 전달하는 몇 가지 방법이 있습니다:

1. document.getElementById() 메서드를 사용하는 방법:

이 방법을 사용하면 HTML 문서에서 지정된 ID를 가진 요소를 가져올 수 있습니다. 요소를 얻은 후에는 해당 요소의 값을 스크립트 변수의 값으로 설정할 수 있습니다.

<div class="content-ad"></div>

예를 들어, 아래 코드는 스크립트 변수 myVariable의 값을 ID가 myInput인 `input` 요소로 전달합니다:

HTML

```js
<input type="text" id="myInput">
```

JavaScript

<div class="content-ad"></div>

```js
var myVariable = "안녕, 세상!";
```

```js
document.getElementById("myInput").value = myVariable;
```

2. innerHTML 속성 사용하기:

innerHTML 속성을 사용하면 요소의 HTML 내용을 설정할 수 있습니다. innerHTML 속성을 사용하여 HTML에서 스크립트 변수를 전달하려면 스크립트 변수의 값을 HTML 내용에 삽입하기만 하면 됩니다.

<div class="content-ad"></div>

예를 들어, 다음 코드는 스크립트 변수 myVariable의 값을 ID가 myParagraph인 `p` 요소로 전달합니다.

HTML

```js
<p id="myParagraph"></p>
```

JavaScript

<div class="content-ad"></div>

```js
var myVariable = "Hello, world!";
```

```js
document.getElementById("myParagraph").innerHTML = myVariable;
```

3. Using the data- attributes:

The data- attributes allow you to store custom data on HTML elements. To pass a script variable in HTML using the data- attributes, you can simply set the value of the data- attribute to the value of the script variable.

<div class="content-ad"></div>

예를 들어, 아래 코드는 스크립트 변수 myVariable의 값을 ID가 myDiv인 `div` 요소로 전달합니다:

HTML

```js
<div id="myDiv" data-my-variable="Hello, world!"></div>
```

JavaScript

<div class="content-ad"></div>

```js
var myVariable = "Hello, world!";
```

그런 다음 JavaScript를 사용하여 스크립트 변수의 값을 다음과 같이 액세스할 수 있습니다:

JavaScript

```js
var myVariable = document.getElementById("myDiv").getAttribute("data-my-variable");
```

<div class="content-ad"></div>

어떤 방법을 선택할지는 당신의 특정한 요구에 따라 다를 것입니다. 스크립트 변수의 값을 특정 요소로 전달해야 한다면 document.getElementById() 메서드가 최상의 옵션입니다. 스크립트 변수의 값을 요소의 HTML 콘텐츠로 전달해야 한다면 innerHTML 속성이 최상의 옵션입니다. 스크립트 변수의 값을 요소의 사용자 정의 데이터 속성에 전달해야 한다면 data- 속성이 최상의 옵션입니다.

도움이 되었으면 좋겠어요!
