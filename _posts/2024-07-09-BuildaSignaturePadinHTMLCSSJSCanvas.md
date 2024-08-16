---
title: "HTML, CSS와 JS로 서명 패드 만들기 단계별 가이드"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-09 18:44
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Build a Signature Pad in HTML, CSS, JS , Canvas"
link: "https://medium.com/@divbydiv/build-a-signature-pad-in-html-css-js-canvas-bd174d999392"
isUpdated: true
---




![image](https://miro.medium.com/v2/resize:fit:1400/1*kSbgHu01E-PFh2JXVoS-jw.gif)

안녕하세요, 오늘은 공유할 만한 멋진 내용이 있어요.

사용자들로부터 서명이나 그림을 수집해야 하는 경우 애플리케이션에 추가할 수 있는 서명 패드를 만드는 방법을 알려드릴게요.

게다가, 서명 패드에서 이미지를 생성하여 서버로 전송하는 방법에 대해서도 알려드릴게요.

<div class="content-ad"></div>

준비되셨나요? 시작해봐요 😀

먼저, 우리가 하는 작업은 '시그니처 패드'의 HTML 구조를 만들고, index.html 페이지에 app.js와 app.css를 링크하는 거예요.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Singature Pad</title>
  <link rel="stylesheet" href="app.css">
</head>
<body>
  <form class="signature-pad-form" action="#" method="POST">
    <h1>Important Contract</h1>
    <p>중요 계약 설명</p>
    <p><b>서명</b></p>
    <canvas height="100" width="300" class="signature-pad"></canvas>
    <p><a href="#" class="clear-button">지우기</a></p>
    <button class="submit-button" type="submit">제출</button>
  </form>
  <script src="app.js"></script>
</body>
</html>
```

이제 app.css 파일에 몇 가지 CSS를 추가해 시그니처 패드처럼 보이도록 만들어봐요.

<div class="content-ad"></div>

```css
:root {
  --primary-color: #000;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  padding: 1rem;
}
.signature-pad-form {
  max-width: 300px;
  margin: 0 auto;
}
.signature-pad {
  cursor: url(pen.png) 1 26, pointer;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
}
.clear-button {
  color: var(--primary-color);
}
.submit-button {
  width: 100%;
  background-color: var(--primary-color);
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  margin-top: 2rem;
}
@media (pointer: coarse) {
  body {
    overflow: hidden; /* Needed to prevent the vertical scroll on touch devices */
  }
}
```

이제 구조와 스타일이 준비되었으니, 재미있는 작업을 시작해봅시다 :)

이제 app.js에서 코드를 작성할 차롈입니다.

먼저, 폼, 캔버스, 서명 패드를 지울 버튼에 대한 몇 가지 상수를 저장하고 싶습니다.  

<div class="content-ad"></div>

```js
const canvas = document.querySelector('canvas');
const form = document.querySelector('.signature-pad-form');
const clearButton = document.querySelector('.clear-button');
```

이제 canvas context를 다른 상수로 저장합시다. 우리는 곧 필요할 것입니다. 이 경우 서명은 2차원이므로 2차원 context만 필요합니다.

```js
const ctx = canvas.getContext('2d');
```

마지막으로, 작성 모드를 설정하거나 해제하는 두 변수를 만들어 봅시다.

<div class="content-ad"></div>

```js
let writingMode = false;
```

좋아요!

다음 단계로 넘어가서 패드와 상호작용하기 위해 이벤트 리스너를 설정할 수 있어요. 패드에 대한 포인터 다운, 포인터 업 및 포인터 이동 이벤트를 듣고 있어야 합니다.

포인터 다운은 쓰기 모드를 true로 설정하는 역할을 맡고, 포인터 업은 쓰기 모드를 false로 설정하는 역할을 합니다.

<div class="content-ad"></div>

```js
canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });
canvas.addEventListener('pointerup', handlePointerUp, { passive: true });
canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
```

이제 핸들러를 구현해 봅시다.

handlePointerDown

```js
const handlePointerDown = (event) => {
  writingMode = true;
  ctx.beginPath();
  const [positionX, positionY] = getCursorPosition(event);
  ctx.moveTo(positionX, positionY);
}
```

<div class="content-ad"></div>

```js
handlePointerUp

const handlePointerUp = () => {
  writingMode = false;
}

handlePointerMove

const handlePointerMove = (event) => {
  if (!writingMode) return
  const [positionX, positionY] = getCursorPosition(event);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
}

<div class="content-ad"></div>

getCursorPosition 함수는 다음과 같습니다:

const getCursorPosition = (event) => {
  positionX = event.clientX - event.target.getBoundingClientRect().x;
  positionY = event.clientY - event.target.getBoundingClientRect().y;
  return [positionX, positionY];
}

다음으로는 그려지는 선의 스타일을 지정하기 위해 캔버스 컨텍스트에 몇 가지 속성을 설정해 봅시다:

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';

<div class="content-ad"></div>

거의 다 왔어요. 추가해야 할 마지막 기능은 캔버스를 지우고, 폼을 제출하는 기능입니다.

참고: 이 예제에서는 데이터를 서버로 보내지 않기 때문에, 따라서 이미지를 생성하고 DOM에 추가하는 용도로만 사용할 예정입니다.

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const imageURL = canvas.toDataURL();
  const image = document.createElement('img');
  image.src = imageURL;
  image.height = canvas.height;
  image.width = canvas.width;
  image.style.display = 'block';
  form.appendChild(image);
  clearPad();
})
const clearPad = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
clearButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearPad();
})

이게 다에요! 최종 결과물은 이렇게 될 거에요.

<div class="content-ad"></div>

```
![image](https://miro.medium.com/v2/resize:fit:1400/1*kSbgHu01E-PFh2JXVoS-jw.gif)

Thanks for reading and I will see you in the next article :) have a nice day and happy coding!
