---
title: "JavaScript를 사용하여 HTML과 JSON을 연결하는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoConnectHTMLwithJSONUsingJavaScriptABeginnersGuide_0.png"
date: 2024-05-01 23:21
ogImage: 
  url: /assets/img/2024-05-01-HowtoConnectHTMLwithJSONUsingJavaScriptABeginnersGuide_0.png
tag: Tech
originalTitle: "How to Connect HTML with JSON Using JavaScript: A Beginner’s Guide"
link: "https://medium.com/@dizzpy/how-to-connect-html-with-json-using-javascript-a-beginners-guide-25e94306fa0f"
isUpdated: true
---




![이미지](/assets/img/2024-05-01-HowtoConnectHTMLwithJSONUsingJavaScriptABeginnersGuide_0.png)

웹 개발은 흥미로운 여정입니다. 동적 웹 페이지를 만드는 첫 번째 단계 중 하나는 HTML을 JSON 데이터와 연결하는 방법을 배우는 것입니다. 이 초보자를 위한 가이드에서는 시작하는 데 도움이 되는 간단한 예제를 통해 안내해 드리겠습니다.

# 필수 준비물

시작하기 전에 다음이 필요합니다:

<div class="content-ad"></div>

- HTML 및 JavaScript의 기본 지식.
- 코드 편집기(예: Visual Studio Code).
- 웹 브라우저.

# 단계 1: HTML 구조 만들기

JSON 데이터를 표시하기 위한 HTML 구조를 설정하는 것부터 시작해 봅시다. 이 예시에서는 데이터를 표시할 기본 HTML 페이지를 만들어보겠습니다. 여기에 데이터가 표시될 `div`를 생성할 것입니다. 아래는 간단한 HTML 구조입니다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON을 HTML로 변환하는 예시</title>
</head>
<body>
    <div id="dataDisplay">
        <!-- JSON 데이터가 여기에 표시됩니다 -->
    </div>
    <script src="script.js"></script>
</body>
</html>
```

<div class="content-ad"></div>

이 HTML 구조에서는 JSON 데이터를 표시할 `div` 요소를 id가 "dataDisplay"인 요소로 설정했습니다.

# 단계 2: JSON 데이터 생성하기

이제 표시할 데이터가 포함된 간단한 JSON 파일을 만들어보겠습니다. 이 예제에서는 다음과 같은 구조를 가진 data.json이라는 JSON 파일을 사용하겠습니다:

```js
{
    "name": "John Doe",
    "age": 30,
    "city": "Anytown"
}
```

<div class="content-ad"></div>

이 JSON 데이터는 사람의 이름, 나이, 도시를 나타냅니다.

# 단계 3: 자바스크립트를 작성하여 HTML 채우기

자, 이제 JavaScript 파일 (script.js)을 작성하여 JSON 데이터를 가져와 HTML에 표시해 보겠습니다:

```js
document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // JSON 데이터를 표시하는 HTML 요소 생성
            const nameElement = document.createElement("p");
            nameElement.textContent = "이름: " + data.name;

            const ageElement = document.createElement("p");
            ageElement.textContent = "나이: " + data.age;

            const cityElement = document.createElement("p");
            cityElement.textContent = "도시: " + data.city;

            // 요소들을 "dataDisplay" div에 추가
            dataDisplay.appendChild(nameElement);
            dataDisplay.appendChild(ageElement);
            dataDisplay.appendChild(cityElement);
        })
        .catch(error => console.error("JSON 데이터를 가져오는 중 오류 발생:", error));
});
```

<div class="content-ad"></div>

이 JavaScript 코드는 fetch API를 사용하여 data.json에서 JSON 데이터를로드합니다. 그런 다음 JSON 데이터 (이름, 나이 및 도시)를 표시하기 위해 HTML 요소를 생성하고 "dataDisplay" div에 추가합니다.

# 단계 4: 웹 페이지 테스트하기

웹 브라우저에서 HTML 파일을 열면 페이지에 JSON 데이터가 표시됩니다. 축하합니다! JavaScript를 사용하여 HTML과 JSON을 성공적으로 연결했습니다!

이것은 당신의 웹 개발 여정의 시작에 불과합니다. 이 기본 지식을 바탕으로 더 많은 고급 기능을 탐색하고, 상호 작용형 웹 애플리케이션을 만들고 사용자를 참여시킬 동적 웹 사이트를 구축할 수 있습니다.

<div class="content-ad"></div>

디지피 | 즐거운 코딩! 🖥️🥰