---
title: "HTML, CSS 및 Javascript를 사용한 최고의 멋진 슬라이더 효과 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-CreateATopCrazySliderEffectsUsingHTMLCSSandJavascript_0.png"
date: 2024-05-17 21:21
ogImage: 
  url: /assets/img/2024-05-17-CreateATopCrazySliderEffectsUsingHTMLCSSandJavascript_0.png
tag: Tech
originalTitle: "Create A Top Crazy Slider Effects Using HTML CSS and Javascript"
link: "https://medium.com/@chauhanomprakash7206/create-a-top-crazy-slider-effects-using-html-css-and-javascript-4f54d6e7d2f7"
---


<img src="https://miro.medium.com/v2/resize:fit:1140/1*5lwNm-FVTRS5eGwUvm8Hbw.gif" />

웹사이트의 사용자 경험을 크게 향상시킬 수 있는 멋진 상호작용 슬라이더를 만들어보세요. 이 기사에서는 HTML, CSS 및 JavaScript를 사용하여 최고 수준의 멋진 슬라이더 효과를 구축하는 과정을 안내합니다. 초보자든 숙련된 개발자든 상관없이 이 자습서를 통해 시각적으로 매력적이고 매우 기능적인 슬라이더를 만들 수 있을 것입니다.

이 쉽게 이해할 수 있는 비디오를 시청해보세요 🙏😁

## 단계 1: HTML 구조 설정

<div class="content-ad"></div>

먼저, 슬라이더의 기초 역할을 하는 간단한 HTML 구조가 필요합니다. 다음은 설정 방법에 대한 예시입니다:

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Slider</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
</head>

<body>
    <div class="gallery-wrap">

        <div class="gallery">
            <div>
                <span><img src="./images/image-1.png" alt=""></span>
                <span><img src="./images/image-2.png" alt=""></span>
                <span><img src="./images/image-3.png" alt=""></span>
                <span><img src="./images/image-4.png" alt=""></span>
                <span><img src="./images/image-5.png" alt=""></span>
                <span><img src="./images/image-6.png" alt=""></span>
            </div>

        </div>

        <div class="Btn-group">
            <span><i id="topBtn" class="ri-arrow-up-fill"></i></span>
            <span><i id="downBtn" class="ri-arrow-down-fill"></i></span>
        </div>
    </div>

    <script src="app.js"></script>
</body>

</html>
```

## 단계 2: CSS로 스타일링

다음은 슬라이더를 CSS로 스타일링하여 멋지게 보이고 원활하게 작동하도록하는 샘플 CSS 코드입니다:

<div class="content-ad"></div>

```css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body {  
    height: 100vh;
    width: 100%;
    background-color: #191919;
    overflow: hidden;
}
.gallery-warp{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10% auto;
    flex-direction: column;
}
.gallery{
    display: flex;
    width: 27%;
    height: 587px;
    overflow-y: scroll;
}
.gallery::-webkit-scrollbar{
    display: none;
}
.gallery div{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.gallery div img{
    filter: grayscale(100%);
    width: 100%;
    transition: transform 0.5s;
}
.gallery div img:hover{
    filter: grayscale(0);
    cursor: pointer;
    transform: scale(1.1);
}
.Btn-group{
    margin-top: 1rem;
    display: flex;
    gap: 18px;
}
.Btn-group span i{
    padding: 4px 4px;
    border: 1px solid;
    font-size: 24px;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    transition: all ease-in-out 0.8s;
}
.Btn-group span i:hover{
    background-color: #fff;
    color: #191919;
    border: none;
}
```
## Step 3: Adding JavaScript for Functionality

Finally, add JavaScript to bring the slider to life. This script will handle the slide transitions and navigation functionality:

```js
let scrollContainer = document.querySelector(".gallery");
let topBtn = document.getElementById("topBtn")
let downBtn = document.getElementById("downBtn");

scrollContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollContainer.style.scrollBehavior = "auto";
    scrollContainer.scrollTop += e.deltaY;
})

topBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollTop += 610;
})
downBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollTop -= 600;
})
```

<div class="content-ad"></div>

# 향상 및 고급 기능

비디오에서 기본 슬라이더에 추가할 수 있는 가능한 향상 방안을 제안합니다:

- 3D 전환: CSS 변형을 이용하여 슬라이드 전환에 3D 효과를 추가합니다.
- Parallax 효과: 패럴랙스 스크롤링을 구현하여 깊이 효과를 부여합니다.
- 고급 애니메이션: GSAP(그린속 애니메이션 플랫폼)과 같은 라이브러리를 사용하여 더 복잡한 애니메이션을 만듭니다.