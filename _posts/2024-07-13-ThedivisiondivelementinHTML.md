---
title: "HTML의 div 요소 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-07-13-ThedivisiondivelementinHTML_0.png"
date: 2024-07-13 18:56
ogImage: 
  url: /assets/img/2024-07-13-ThedivisiondivelementinHTML_0.png
tag: Tech
originalTitle: "The division (<div>) element in HTML."
link: "https://medium.com/@nagy_razvan/the-division-div-element-in-html-b5fb7daff9f6"
isUpdated: true
---




`div` 요소는 다른 페이지 요소를 캡슐화하는 블록 수준 요소입니다. 이러한 컨테이너는 CSS 또는 JavaScript를 사용하여 스타일링이나 레이아웃 목적으로 다른 HTML 요소를 그룹화하는 데 사용할 수 있습니다.

`div` 요소는 웹 페이지 섹션을 그룹화하고 스타일링하는 데 사용되는 다른 HTML 요소의 컨테이너입니다.

![이미지](/assets/img/2024-07-13-ThedivisiondivelementinHTML_0.png)

## 기본 구문.

<div class="content-ad"></div>

`div` 태그의 기본 구문은 다음과 같습니다.

```js
<div>
<!-- 내용을 입력하세요 -->
</div>
```

보시다시피 `div` 요소에는 여는 태그와 닫는 태그가 있습니다. 이제 예제를 작성해봅시다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Div Tag Example</title>
</head>
<body>
    <div>
        <h1>Hello, World!</h1>
        <p style="color: darkred;">This is a paragraph inside a div.</p>
    </div>
</body>
</html>
```

<div class="content-ad"></div>

### 단계 1. "HTML div 튜토리얼"이라는 폴더를 만드세요.

![이미지](/assets/img/2024-07-13-ThedivisiondivelementinHTML_1.png)

### 단계 2. "HTML div.txt" 라는 텍스트 파일을 만드세요.

![이미지](/assets/img/2024-07-13-ThedivisiondivelementinHTML_2.png)

<div class="content-ad"></div>

Step 3. 위의 코드를 복사하여 텍스트 파일에 붙여넣고 "HTML div.html"로 저장하여 브라우저(Chrome, Mozzila, Opera 등)로 열 수 있는 HTML 웹 페이지로 변환합니다.

![HTML div.html](/assets/img/2024-07-13-ThedivisiondivelementinHTML_3.png)

이제 브라우저로 "HTML div.html" 파일을 열면 이를 볼 수 있어요.

![HTML div.html](/assets/img/2024-07-13-ThedivisiondivelementinHTML_4.png)

<div class="content-ad"></div>

## `div`의 속성

`div` 태그는 다음과 같은 전역 속성을 지원합니다. 이 속성들은 모든 HTML 요소에 대해 표준입니다.

- id — `div`를 식별하는 고유한 ID를 지정합니다.
- class — `div`에 하나 이상의 클래스 이름을 지정합니다.
- style — CSS 스타일링 규칙을 포함합니다.
- title: `div`에 관련된 추가 정보를 제공합니다. (텍스트 위에 마우스를 올렸을 때 작동)

이제 이러한 속성을 개별적으로 적용해 보겠습니다.

<div class="content-ad"></div>

## CSS를 사용하여 `div` 스타일링하기

예제를 작성해보겠습니다. 항상 사용하던 Sublime 텍스트 편집기를 사용할 거에요.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Div</title>
    <style>
        .styled-div {
            width: 50%;
            margin: 0 auto;
            padding: 20px;
            border: 2px solid #000;
            background-color: #f0f0f0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="styled-div">
        <h1>Styled Div</h1>
        <p>This div is styled with CSS.</p>
    </div>
</body>
</html>
```

`head` 태그 안에서, 웹 페이지에서 내용이 어떻게 표시될지 담당하는 메타데이터 (데이터 정보)를 먼저 정의했어요.

<div class="content-ad"></div>

그럼 `body` 태그 안에 `div class="styled-div"` 클래스를 정의하고, 우리 클래스의 이름인 "styled-div"를 할당해 보겠습니다.

이제 위의 예시를 저장하고 마지막에 .html 형식으로 저장한 다음 브라우저에서 열면 다음과 같은 것이 나타납니다:

<img src="/assets/img/2024-07-13-ThedivisiondivelementinHTML_5.png" />

<div class="content-ad"></div>

중첩 `div` 태그입니다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nested Divs</title>
    <style>
        .outer {
            border: 2px solid blue;
            padding: 20px;
            margin: 20px;
        }
        .inner {
            border: 2px solid red;
            padding: 10px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="outer">
        Outer Div
        <div class="inner">
            Inner Div
        </div>
    </div>
</body>
</html>
```

첫 번째 예제와 같이 `head` 태그에는 우리 정보를 표시하는 데 책임이 있는 두 가지 메타데이터 정보가 있습니다.

그리고 스타일 속성에서 스타일링을 담당하는 두 클래스를 정의했습니다. 외부 테두리는 파란색이고 내부 테두리는 빨간색입니다. 외부 `div`는 파란 테두리를 가진 outer 클래스를 가지고 있고, 내부 `div`는 빨간 테두리를 가진 inner 클래스를 가지고 있습니다.

<div class="content-ad"></div>

외부 `div`에는 내부 `div`가 포함되어 중첩 구조가 만들어집니다. 이것은 여러 계층의 컨테이너를 사용하여 복잡한 레이아웃을 만드는 데 유용합니다.

위의 예제를 저장하면 다음과 같이 두 개의 테두리가 나타납니다:

![image](/assets/img/2024-07-13-ThedivisiondivelementinHTML_6.png)

`id` 태그입니다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Div with Attributes</title>
    <style>
        .container {
            border: 1px solid #000;
            padding: 10px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div id="main" class="container" style="background-color: lightblue;" title="This is a container">
        <h1>Welcome</h1>
        <p>This div has several attributes.</p>
    </div>
</body>
</html>
```

위의 두 예시와 같이 `head` 태그에 메타데이터 정보가 있습니다.

다음은 `style` 속성으로 "container"라는 클래스가 정의되어 있으며, 이 클래스는 테두리, 안 여백 및 바깥 여백을 정의합니다.

그 다음은 `body` 태그입니다. 여기서 `div`에 id="main"이라는 고유 식별자가 할당되어 있습니다. 이 식별자를 사용하여 CSS 스타일을 적용할 수 있습니다.


<div class="content-ad"></div>

그럼 div의 배경색을 설정하는 인라인 CSS로 style = "background-color: light-blue;"을 추가합니다.

div 위로 마우스를 올리면 나타나는 툴팁을 제공하는 title="This is a container"를 추가합니다.

만일 위의 코드를 텍스트 편집기에 저장하고 확장자 .html로 저장하시면 이렇게 보여질 것입니다:

![image](/assets/img/2024-07-13-ThedivisiondivelementinHTML_7.png)

<div class="content-ad"></div>

분할 태그에 대해 더 알고 싶다면, 아래 링크를 확인해보세요.