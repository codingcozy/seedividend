---
title: "HTML, CSS 및 JavaScript로 다이나믹아일랜드 팝업 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Building an Interactive Island Popup with HTML, CSS, and JavaScript  FREE Source Code"
link: "https://medium.com/@withaarzoo/building-an-interactive-island-popup-with-html-css-and-javascript-free-source-code-af2e39717e03"
isUpdated: true
---





![이미지](https://miro.medium.com/v2/resize:fit:1400/1*8CRNlJ-0OirG-3vxkTs_-g.gif)

코딩 모험을 떠날 준비가 되셨나요? 오늘은 #100DaysOfCode 챌린지의 일환으로 HTML, CSS 및 JavaScript를 사용하여 인터랙티브 섬 팝업을 만드는 흥미로운 프로젝트에 착수하게 될 거에요. 이 프로젝트는 코딩 기술을 향상시킬 뿐만 아니라 포트폴리오에 창의성을 더할 수 있습니다. 그러니 시작해봐요!

# Day 8: 기반 구축

단계 1: HTML 구조 설정먼저, 프로젝트용 기본 HTML 구조를 만들어봅시다. 컨테이너 상자, 섬 팝업 및 탐색 버튼과 같은 필요한 요소를 포함할 거에요.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 외부 스타일시트 링크 -->
    <link rel="stylesheet" href="style.css">
    <title>Dynamic Island of iPhone</title>
</head>

<body>
    <!-- 컨테이너 상자 -->
    <div class="box">
        <div class="inner">
            <!-- 아일랜드 팝업 -->
            <div class="island_popup">
                <div class="content">
                    <!-- 세부 정보 섹션 -->
                    <div class="details">
                        <!-- 이미지 상자 -->
                        <div class="imgBx">
                            <!-- 이미지 소스 -->
                            <img src="img.jpg">
                        </div>
                        <!-- 설명 -->
                        <p>Alexa Calling</p>
                    </div>
                    <!-- 동작 섹션 -->
                    <div class="action">
                        <!-- 전화 아이콘 -->
                        <ion-icon name="call" class="red"></ion-icon>
                        <ion-icon name="call" class="green"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
        <!-- 내비게이션 버튼 -->
        <i class="btn btn1"></i>
        <i class="btn btn2"></i>
        <i class="btn btn3"></i>
        <i class="rightSide"></i>
    </div>

    <!-- Ionicons 스크립트 로드 -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <!-- 사용자 지정 스크립트 -->
    <script src="script.js"></script>
</body>

</html>
```

단계 2: CSS로 스타일 지정을 통해 프로젝트를 꾸며 보겠습니다. 레이아웃, 색상 및 애니메이션을 정의하여 아일랜드 팝업을 생동감 있게 만들어 봅시다.

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

/* 기본 스타일 재설정 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

/* body 스타일 지정 */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
}

/* 컨테이너 상자 스타일 지정 */
.box {
  position: relative;
  width: 300px;
  height: 600px;
  background: #fff;
  border-radius: 50px;
  background: #666;
}

/* 상자 앞의 가상 요소 스타일 지정 */
.box::before {
  content: "";
  position: absolute;
  inset: 3px;
  background: #000;
  border-radius: 48px;
}

/* 내부 컨테이너 스타일 지정 */
.inner {
  position: absolute;
  inset: 3px;
  background: url(bg.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 48px;
  border: 10px solid #000;
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: 0.5s;
}

/* 호버 시 내부 컨테이너 공개 */
.box:hover .inner {
  opacity: 1;
}

/* 내비게이션 버튼 스타일 지정 */
.btn {
  position: absolute;
  width: 3px;
  left: -2px;
  top: 110px;
  height: 26px;
  background: #444;
  background: radial-gradient(#ccc, #666, #222);
  z-index: 10;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.btn.btn2 {
  top: 160px;
  height: 40px;
}
.btn.btn3 {
  top: 220px;
  height: 40px;
}

/* 오른쪽 쪽 요소 스타일 지정 */
.rightSide {
  position: absolute;
  width: 3px;
  right: -2px;
  top: 170px;
  height: 70px;
  background: #444;
  background: radial-gradient(#ccc, #666, #222);
  z-index: 10;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* 아일랜드 팝업 스타일 지정 */
.island_popup {
  position: absolute;
  top: 10px;
  width: 90px;
  height: 25px;
  background: #000;
  border-radius: 20px;
  transition: 0.5s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 200px; */
}

/* 호버 시 아일랜드 팝업 확대 */
.island_popup:hover {
  width: 200px;
  height: 25px;
  border-radius: 50px;
}

/* 활성화된 아일랜드 팝업 스타일 지정 */
.island_popup.active {
  width: 250px;
  height: 60px;
  border-radius: 50px;
}
```

<div class="content-ad"></div>

```js
// 섬 팝업 요소 선택
let popup = document.querySelector(".island_popup");

// 클릭 이벤트 리스너 추가해서 섬 팝업에 활성 클래스를 전환합니다
popup.onclick = function () {
  popup.classList.toggle("active");
};
```

# 결론

축하합니다! HTML, CSS, 그리고 JavaScript를 사용하여 상호작용하는 섬 팝업을 만들어 #100DaysOfCode 도전의 제 8일을 성공적으로 완료했습니다. 이 프로젝트를 통해 웹 개발에서 소중한 기술을 배우고 창의적인 프로젝트를 포트폴리오에 추가했습니다. 훌륭한 작업을 이어가고 앞으로 더 많은 코딩 모험을 기대해주세요!

이 프로젝트의 전체 소스 코드는 여기서 다운로드할 수 있습니다. 질문이나 제안이 있으면 Bento에서 언제든지 연락해주세요. 즐거운 코딩하세요! 🚀




