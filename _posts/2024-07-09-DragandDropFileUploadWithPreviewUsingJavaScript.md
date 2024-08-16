---
title: "파일 드래그 앤 드롭 업로드와 프리뷰 구현하는 방법 JavaScript 사용"
description: ""
coverImage: "/assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_0.png"
date: 2024-07-09 14:03
ogImage: 
  url: /assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_0.png
tag: Tech
originalTitle: "Drag and Drop File Upload With Preview Using JavaScript"
link: "https://medium.com/@cwrworksite/drag-and-drop-file-upload-with-preview-using-javascript-cd85524e4a63"
isUpdated: true
---



안녕하세요 개발자 여러분, 이번 튜토리얼에서는 Html, Css 및 JavaScript를 사용하여 파일을 업로드하는 방법을 배우게 될 거에요. 이 프로젝트는 Drag and Drop 또는 파일 찾아보기를 통해 파일을 업로드하고 다운로드 기능을 포함시키는 것을 다루고 있어요. Drag And Drop은 JavaScript를 사용해 파일을 끌어다 놓는 방법을 익히기 위해 forms, CSS 및 JavaScript 개념을 명확하게 이해하는 초보 프로젝트예요.

![Drag and Drop File Upload With Preview Using JavaScript](/assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_0.png)

프로젝트를 시작하기 전에 Drag-and-drop 파일 업로드가 무엇인지 그리고 어떻게 만들 수 있는지 이해해야 해요. Drag-and-drop 파일 업로드는 파일을 웹 페이지로 끌어다 놓아 제출할 수 있는 것을 의미해요. 대부분의 웹사이트에는 이러한 종류의 파일 업로드 기능이 있답니다.

<div class="content-ad"></div>

## 드래그 앤 드롭 파일 업로드란 무엇인가요?

드래그 앤 드롭 파일 업로드는 파일을 끌어다가 놓는 기능을 의미합니다. 웹 애플리케이션은 드래그 앤 드롭 인터페이스를 사용하여 파일을 웹 페이지로 끌어다 놓을 수 있습니다. 대부분의 웹사이트들은 이러한 종류의 파일 업로드 기능을 가지고 있을 것입니다. 몇 줄의 JavaScript 코드로 이러한 드래그 앤 드롭 파일 업로드 기능을 만들 수 있는 여러 JavaScript 프레임워크가 있지만, 이 블로그 포스트에서는 순수한 JavaScript만을 사용하여 이 작업을 수행하는 방법을 안내해 드리겠습니다.

## 프로젝트 구축 단계

본 문서는 초심자를 위한 것입니다. 전문가들이 프로젝트를 어떻게 구축하는지를 가르쳐 드리겠습니다. 그들이 가장 먼저 신경 쓰는 것은 관리입니다. 프로젝트 관리는 모든 코더들이 따르는 첫 번째 단계이며, 프로젝트 관리는 반드시 필요합니다. 프로젝트를 관리하려면 HTML, CSS 및 JavaScript에 대한 별도의 파일을 생성해야 합니다.

<div class="content-ad"></div>

## 전제 조건:

- index.html: 프로젝트에 구조를 추가하는 데 사용합니다.
- styles.css: 프로젝트에 스타일을 추가하는 데 사용합니다.
- script.js: 드래그 앤 듭 또는 브라우즈 기능을 추가하는 데 사용합니다.

이제 프로젝트가 무엇을 포함하는지 대략적으로 알게 되었을 것입니다. 이 글에서는 이 프로젝트를 단계별로 살펴볼 것입니다.

# 1단계: 기본 HTML 코드 추가하기

<div class="content-ad"></div>

HTML은 하이퍼텍스트 마크업 언어로, 프로젝트 구조를 제공하는 주요 기능을 합니다. 이 마크업 언어를 활용하여 프로젝트 구조를 제공할 겁니다. 그러니 이제 HTML 코드를 살펴봅시다.

```js
<html lang="en">
```

```js
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drag, Drop & Browse</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <h3>Upload your File :</h3>
        <div class="drag-area">
            <div class="icon">
                <i class="fas fa-images"></i>
            </div>
            <span class="header">Drag & Drop</span>
            <span class="header">or <span class="button">browse</span></span>
            <input type="file" hidden />
            <span class="support">Supports: JPEG, JPG, PNG</span>
        </div>
        <div>
            <button class="download">Download</button>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>
```

이제 HTML부터 시작해볼까요? index.html 파일 안에 기본 HTML 문서 구조를 생성하고 html, head, title, body 태그를 추가하세요. 아래 단계를 따라주세요.

<div class="content-ad"></div>

저희가 검색 상자 프로젝트를 시작하기 전에 일부 링크를 업데이트해야 합니다. 이 프로젝트를 완료하려면 HTML, CSS 및 JavaScript에 사용한 세 가지 서로 다른 파일을 연결해야 했어요. 이를 위해 CSS 링크를 헤더 안에 배치해주세요.

프로젝트에서 사용한 여러 아이콘들의 모든 링크를 포함해야 해요. 만약 HTML 파일에 링크하려면 Javascript 파일을 HTML의 본문(body) 안에 포함해주세요.

```js
//Head section
<link rel="stylesheet" href="style.css">
<script src="https://kit.fontawesome.com/1cf483120b.js" crossorigin="anonymous"></script>
<script defer src="https://maps.googleapis.com/maps/api/js?key=YourAPIKEY&libraries=places&callback=initMap"></script>
//Body Section
<script src="index.js"></script>
```

이제 드래그 & 드롭 또는 브라우즈 프로젝트의 구조를 추가해봅시다.

<div class="content-ad"></div>

저희는 드래그 앤 드롭 프로젝트의 구조를 추가하기 위해 기본적인 HTML 요소를 사용할 것입니다.

- 드래그 앤 드롭 구조를위한 컨테이너를 만들기 위해 div 태그를 사용할 것입니다.
- h3 태그를 사용하여 프로젝트를 위한 작은 제목을 만들겠습니다.
- 이제 div 태그를 사용하여 파일을 드래그앤드롭 할 영역을 만듭니다.
- 우리는 font-awesome 클래스를 사용하여 이미지 아이콘을 사용하고 span 태그를 사용하여 사용자가 파일을 드래그하여 여기에 드롭할 수 있도록 작은 캡션을 추가할 것입니다.
- 우리는 이제 사용자가 시스템에서 파일을 선택할 수있는 버튼을 만듭니다. "button" 클래스를 가진 span 요소를 사용할 것입니다.
- 사용자가 제출 할 수있는 파일 유형을 알리는 span 태그를 사용할 것입니다.
- 우리는 이미지를 다운로드하는 버튼을 만들 것입니다.

저희는 드래그 앤 드롭 또는 둘러보기를 위한 구조를 구축하기 위해 다른 것은 필요하지 않습니다. 이제 CSS를 사용하여 클립 보드 버튼을 스타일링할 것입니다. 그러나 먼저 우리의 구조를 살펴보겠습니다.

<img src="/assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_1.png" />

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

```js
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');
```

```js
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background: #e0eafc; /* 이전 브라우저를 위한 대체 */
  background: -webkit-linear-gradient(to right, #cfdef3, #e0eafc); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cfdef3,
    #e0eafc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.container {
  max-width: 650px;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.drag-area {
  height: 400px;
  border: 3px dashed #e0eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
}
h3 {
  margin-bottom: 20px;
  font-weight: 500;
}
.drag-area .icon {
  font-size: 50px;
  color: #1683ff;
}
.drag-area .header {
  font-size: 20px;
  font-weight: 500;
  color: #34495e;
}
.drag-area .support {
  font-size: 12px;
  color: gray;
  margin: 10px 0 15px 0;
}
.drag-area .button {
  font-size: 20px;
  font-weight: 500;
  color: #1683ff;
  cursor: pointer;
}
.drag-area.active {
  border: 2px solid #1683ff;
}
.drag-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.download {
  background-color:#4CAF50;
  border: none;
  color: white;
  padding: 6px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 3px 1px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
}
```

CSS 코드 추가 후, 이를 단계별로 검토할 것입니다. 시간을 절약하려면 이 코드를 복사하여 IDE에 붙여넣기하면 됩니다. 이제 코드를 단계별로 검토하겠습니다.

우리는 클립 보드에 복사하는 기본 스타일을 추가할 것이지만, 여러분은 새로운 스타일을 시도하고 의견란에서 코드를 공유해 다른 사람들이 창의적으로 생각할 수 있도록 도와주는 것이 좋습니다.

<div class="content-ad"></div>

1단계: 우리는 가중치가 200, 300, 400 및 500인 사용자 정의 Google 폰트 인 Poppins을 사용할 것입니다. 이제 프로젝트 내에서이 Google 폰트를 추가하기 위해 Google 가져오기 링크를 사용해야합니다.

일반 선택기를 사용하여 전체 페이지의 패딩 및 여백을 제로로 설정하고 상자 크기 속성을 사용하여 border-box를 추가하고 글꼴 패밀리를 "Poppins"로 설정합니다.

```js
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');
```

```js
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
```

<div class="content-ad"></div>

Step2: body 선택자를 사용하여 표시를 "flex"로 설정하고 align-item 속성을 사용하여 항목을 중앙에 맞추고 flex-direction 속성을 사용하여 방향을 열 방식으로 설정합니다. 웹 페이지의 body에 연한 그라데이션 배경을 추가할 것입니다.

```js
body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background: #e0eafc; /* old browsers를 위한 대체 */
  background: -webkit-linear-gradient(to right, #cfdef3, #e0eafc); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cfdef3,
    #e0eafc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
```

Step3: 이제 컨테이너 및 구조의 모든 다른 요소에 스타일을 추가할 것입니다. 클래스 선택자 (.container)를 사용하여 컨테이너의 최대 너비를 650px로 설정하고 실제 너비는 100%로 설정합니다. 또한 30px의 안쪽 여백 및 하얀 배경을 추가했습니다. 상자 그림자 속성을 사용하여 컨테이너에 상자 그림자를 추가했습니다.\

이제 파일 드래그 영역에 스타일을 추가합니다. 높이를 400px로 설정하고 테두리 속성을 사용하여 연한 파란색의 대시 테두리를 3px 폭으로 추가하고 align item 속성을 사용하여 항목을 중앙에 맞출 것입니다. 여백을 사용하여 드래그 영역 외부에 10px 여백을 추가했습니다.

<div class="content-ad"></div>

```css
.container {
  max-width: 650px;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
```

```css
.drag-area {
  height: 400px;
  border: 3px dashed #e0eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
}
```

![Example Image](/assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_2.png)

Step4: 이제, 글꼴 크기를 500으로 설정하고 아래 여백을 20픽셀 추가하겠습니다. 태그 선택기 (h3)를 사용하여 (더 굵게) 선언합니다.

<div class="content-ad"></div>

지금 아이콘 색상과 텍스트 크기는 모두 (.icon) 클래스를 사용하여 어두운 파랑색에 맞추어 조정되었습니다. 우리가 버튼과 지원 섹션에 적용한 스타일링은 유사합니다. 코드를 한 번만 읽어도 쉽게 이해할 수 있을 것입니다.

```js
h3 {
  margin-bottom: 20px;
  font-weight: 500;
}
```

```js
.drag-area .icon {
  font-size: 50px;
  color: #1683ff;
}
.drag-area .header {
  font-size: 20px;
  font-weight: 500;
  color: #34495e;
}
.drag-area .support {
  font-size: 12px;
  color: gray;
  margin: 10px 0 15px 0;
}
.drag-area .button {
  font-size: 20px;
  font-weight: 500;
  color: #1683ff;
  cursor: pointer;
}
.drag-area.active {
  border: 2px solid #1683ff;
}
.drag-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.download {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 6px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 3px 1px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
}
```

![Drag and Drop File Upload with Preview Using JavaScript](/assets/img/2024-07-09-DragandDropFileUploadWithPreviewUsingJavaScript_3.png)

<div class="content-ad"></div>

# Step3: JavaScript Code

이 프로젝트에서 가장 중요한 구성 요소는 JavaScript입니다. JavaScript를 사용하여 우리가 원하는 방식으로 기능하도록 수정할 수 있습니다. 아래 단계를 따라해보세요.

```js
const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");
```

```js
let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");
let file;
button.onclick = () => {
  input.click();
};
// 파일 찾는 중
input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  displayFile();
});
// 파일이 드래그 영역에 있을 때
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "릴리스해서 업로드";
});
// 파일이 드래그 영역을 떠날 때
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "드래그 & 드롭";
});
// 파일이 드롭되었을 때
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0]; // 사용자가 여러 파일을 선택하더라도 단일 파일을 가져옵니다.
  displayFile();
});
function displayFile() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("이 파일은 이미지 파일이 아닙니다.");
    dropArea.classList.remove("active");
  }
}
```

<div class="content-ad"></div>

`document.queryselector` 메서드를 사용하여 필요한 모든 DOM 구성 요소를 선택하는 것부터 시작하겠습니다. 또한 각 HTML 요소의 값을 저장할 변수가 만들어질 것입니다.

이제 버튼 및 입력 태그를 선택하기 위해 dropArea를 사용하여 브라우즈 버튼을 선택합니다.

```js
const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");
```

```js
let button = dropArea.querySelector(".button");
let input = dropArea.querySelector("input");
let file;
```

<div class="content-ad"></div>

이제 드래그 앤 드롭 기능을 먼저 구현할 것입니다. 파일을 저장하고 표시하기 위해 별도의 함수를 만드세요. 업로드를 허용할 수 있는 모든 허용 가능한 파일 형식은 해당 함수 내에서 정의될 것입니다.

파일이 드래그 영역에 들어오는지 모니터링하는 이벤트 리스너가 세 가지 정의될 것입니다. 하나는 파일이 드래그 영역에 들어올 때 추적하며, 하나는 드래그 영역이 떠날 때 추적하고, 다른 하나는 사용자가 드래그 영역 내에 파일을 드롭할 때 추적할 것입니다.

```js
// 파일이 드래그 영역 내에 있을 때
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "업로드하려면 놓아주세요";
  // console.log('파일이 드래그 영역 내에 있음');
});
```

```js
// 파일이 드래그 영역을 떠날 때
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  // console.log('파일이 드래그 영역을 떠남');
  dragText.textContent = "드래그하여 놓기";
});
// 파일이 드래그 영역에 드롭된 경우
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  // console.log('파일이 드래그 영역에 드롭됨');
  file = event.dataTransfer.files[0]; // 사용자가 여러 파일을 선택해도 하나의 파일만 가져옴
  // console.log(file);
  displayFile();
});
function displayFile() {
  let fileType = file.type;
  // console.log(fileType);
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    // console.log('이것은 이미지 파일입니다');
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("이미지 파일이 아닙니다");
    dropArea.classList.remove("active");
  }
}
```

<div class="content-ad"></div>

브라우즈 기능을 활용해 봐요. 브라우즈 버튼을 누른 효과를 낼 거에요. 파일 탐색기가 열리면 파일 입력을 클릭하는 것을 모방할 거예요. 사용자가 파일을 선택하면 변경 이벤트를 기다렸다가 표시 기능을 실행할 거에요.

```js
let file;
```

```js
button.onclick = () => {
  input.click();
};
// 브라우즈할 때
input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  displayFile();
});
```

자바스크립트를 사용해서 드래그 앤 드롭 파일 프로젝트를 완료했어요. 전체 프로젝트를 잘 이해하셨으면 좋겠어요. 이제 라이브 미리보기를 확인해보겠습니다.

<div class="content-ad"></div>

저희는 10개 이상의 프런트엔드 프로젝트를 발표한 기사도 만들었습니다. 관심이 있다면 아래 링크를 확인해보세요.

만약 이 블로그를 유용하게 찾으셨다면, 소스 코드로 프런트엔드 프로젝트를 찾으려면 'codewithrandom'를 구글에서 검색하고, Code with Random의 인스타그램 페이지를 팔로우해주세요.

팔로우: codewithrandom

작성자: Arun

<div class="content-ad"></div>

코드 제공자: BWstreet

# 드래그 앤 드롭 파일 업로드란?

드래그 앤 드롭 파일 업로드는 파일을 끌어다가 놓는 능력을 가리킵니다. 웹 응용 프로그램은 드래그 앤 드롭 인터페이스를 사용하여 파일을 웹 페이지로 끌어다 놓을 수 있습니다. 대부분의 웹 사이트는 이러한 종류의 파일 업로드 기능을 가지고 있을 것입니다.

# 파일 업로드 섹션을 만드는 방법?

<div class="content-ad"></div>

"업로드 파일" 섹션은 form 태그를 사용하여 만들어지며, input 타입은 "file"을 사용합니다.
