---
title: "애니메이션 네비게이션 탭 메뉴 만드는 방법소스코드 있음 "
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Building an Animated Navigation Tab Menu  FREE Source Code"
link: "https://medium.com/@withaarzoo/building-an-animated-navigation-tab-menu-free-source-code-7283dad1a7c1"
isUpdated: true
---

<img src="https://miro.medium.com/v2/resize:fit:1400/1*YOfgHoUXj3bi9bzTRCMTOw.gif" />

웹 사이트의 내비게이션을 화려한 애니메이션으로 꾸미고 싶나요? 이 블로그 포스트에서는 HTML, CSS 및 JavaScript를 사용하여 애니메이션 내비게이션 탭 메뉴를 만드는 과정을 안내합니다. 이 프로젝트는 매일 실습을 통해 코딩 스킬을 향상시키는 #100DaysOfCode Challenge의 6일차 일환입니다.

# 단계 1: 프로젝트 설정

먼저, 시작하려면 여기에서 전체 소스 코드를 다운로드하세요. 파일을 다운로드한 후, 텍스트 편집기에서 새 HTML 파일을 만들어 index.html로 이름을 지정하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Step 2: HTML 구조

index.html 파일에서 프로젝트를 위한 기본 구조를 설정하세요. 내비게이션 탭을 보유할 'ul' 목록을 정의하세요. 각 탭은 'a' 태그를 포함한 'li' 요소로 나타낼 것입니다.

```js
<!DOCTYPE html>
<html lang="en">
<head>
<!-- 문서 메타데이터 정의 -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 외부 스타일시트 링크 설정 -->
<link rel="stylesheet" href="style.css">
<!-- 문서 제목 설정 -->
<title>Animated Navigation Tab Menu</title>
</head>
<body>
<!-- 내비게이션 메뉴 -->
<ul class="navigation">
<!-- 홈 탭 -->
<li class="active">
<a href="#">
<!-- 홈 아이콘 -->
<span class="icon">
<ion-icon name="home-outline"></ion-icon>
</span>
<!-- 홈 텍스트 -->
<span class="text">Home</span>
</a>
</li>
<!-- 프로필 탭 -->
<li>
<a href="#">
<!-- 프로필 아이콘 -->
<span class="icon">
<ion-icon name="person-outline"></ion-icon>
</span>
<!-- 프로필 텍스트 -->
<span class="text">Profile</span>
</a>
</li>
<!-- 메시지 탭 -->
<li>
<a href="#">
<!-- 메시지 아이콘 -->
<span class="icon">
<ion-icon name="chatbubble-outline"></ion-icon>
</span>
<!-- 메시지 텍스트 -->
<span class="text">Messages</span>
</a>
</li>
<!-- 사진 탭 -->
<li>
<a href="#">
<!-- 사진 아이콘 -->
<span class="icon">
<ion-icon name="camera-outline"></ion-icon>
</span>
<!-- 사진 텍스트 -->
<span class="text">Photos</span>
</a>
</li>
<!-- 설정 탭 -->
<li>
<a href="#">
<!-- 설정 아이콘 -->
<span class="icon">
<ion-icon name="settings-outline"></ion-icon>
</span>
<!-- 설정 텍스트 -->
<span class="text">Settings</span>
</a>
</li>
</ul>
<!-- Ionicons 라이브러리 포함 -->
<script src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'></script>
<!-- 사용자 정의 JavaScript 파일 포함 -->
<script src="./script.js"></script>
</body>
</html>
```

# Step 3: CSS 스타일링

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 시각적으로 매력적인 내비게이션 메뉴를 만들기 위해 스타일을 추가해봅시다. style.css 파일을 열어서 내비게이션 메뉴, 목록 항목, 아이콘 및 텍스트의 모양을 사용자 정의하는 CSS 규칙을 추가해주세요.

```js
/* Google Fonts 가져오기 - Poppins */
@import url("https://fonts.googlesapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
/* CSS 스타일 */
/* 기본 마진, 패딩 및 박스 모델 재설정 */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Poppins", sans-serif;
}
/* Body 스타일링 */
body {
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
background: #262433;
}
/* 내비게이션 스타일링 */
.navigation {
position: relative;
width: 540px;
height: 120px;
background: #242433;
box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.5),
inset 5px 5px 20px rgba(255, 255, 255, 0.2),
inset -5px -5px 15px rgba(0, 0, 0, 0.75);
border-radius: 25px;
display: flex;
justify-content: center;
align-items: center;
}
/* 목록 항목 스타일링 */
.navigation li {
position: relative;
list-style: none;
width: 80px;
margin: 0 5px;
}
/* 목록 항목 점 스타일링 */
.navigation li::before {
content: "";
position: absolute;
top: 35px;
left: 50%;
transform: translateX(-50%);
width: 5px;
height: 5px;
background: #222;
border-radius: 50%;
transition: 0.5s;
}
/* 활성 상태의 목록 항목 점 스타일링 */
.navigation li.active::before {
background: #0f0;
box-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0,
0 0 40px #0f0, 0 0 50px #0f0;
}
/* 링크 태그 스타일링 */
.navigation li a {
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-decoration: none;
}
/* 아이콘 스타일링 */
.navigation li a .icon {
position: absolute;
font-size: 1.75em;
width: 80px;
height: 80px;
display: flex;
align-items: center;
justify-content: center;
color: #aaa;
border-radius: 50px;
transition: 0.5s;
transition-delay: 0.2s;
}
/* 활성 상태의 아이콘 스타일링 */
.navigation li.active a .icon {
background: #29fd53;
color: #fff;
transform: translateY(-55px);
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.25),
inset 2px 2px 3px rgba(255, 255, 255, 0.25),
inset -3px -3px 5px rgba(0, 0, 0, 0.5);
transition-delay: 0s;
}
/* 아이콘 내부 원 스타일링 */
.navigation li a .icon::before {
content: "";
position: absolute;
inset: 10px;
background: #2f363e;
border-radius: 50%;
box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5),
inset 2px 2px 3px rgba(255, 255, 255, 0.25),
inset -3px -3px 5px rgba(0, 0, 0, 0.5);
transform: scale(0);
transition: 0.5s;
}
/* 활성 상태의 아이콘 내부 원 스타일링 */
.navigation li.active a .icon::before {
transform: scale(1);
}
/* 텍스트 스타일링 */
.navigation li a .text {
position: absolute;
font-size: 0.75em;
color: #2f363e;
opacity: 0;
transform: translateY(20px);
padding: 2px 10px;
background: #fff;
border-radius: 15px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.25),
inset -3px -3px 5px rgba(0, 0, 0, 0.5);
transition: 0.5s;
transition-delay: 0s;
}
/* 활성 상태의 텍스트 스타일링 */
.navigation li.active a .text {
opacity: 1;
transform: translateY(10px);
transition-delay: 0.2s;
}
```

# 스텝 4: JavaScript 기능

내비게이션 메뉴의 애니메이션 효과를 구현하기 위해 JavaScript를 사용할 것입니다. script.js 파일을 열고 내비게이션 탭의 클릭 이벤트를 처리하는 코드를 작성해주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// 내비게이션 메뉴 내 모든 목록 항목 선택
let list = document.querySelectorAll(".navigation li");

// 클릭된 링크 활성화하는 함수
function activeLink() {
  // 모든 목록 항목에서 'active' 클래스 제거
  list.forEach((item) => item.classList.remove("active"));
  // 클릭된 목록 항목에 'active' 클래스 추가
  this.classList.add("active");
}

// 각 목록 항목에 클릭 이벤트 리스너 추가하여 링크 활성화
list.forEach((item) => item.addEventListener("click", activeLink));
```

# 단계 5: 테스트 및 개선

구현을 완료하면 웹 브라우저에서 index.html 파일을 열어 내비게이션 메뉴를 테스트하세요. 탭을 클릭하여 애니메이션이 예상대로 작동하는지 확인하세요. 사용자 경험을 개선하기 위해 필요한 조정을 수행하세요.

# 단계 6: 결론

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

축하합니다! 웹사이트를 위한 애니메이션 네비게이션 탭 메뉴를 성공적으로 구축했습니다. 디자인을 추가적으로 사용자 정의하거나 기존 프로젝트에 통합해보세요. 문제가 발생하거나 궁금한 점이 있으면 언제든지 도움을 요청해 주세요.

# 연락처

이 프로젝트에 대해 궁금한 사항이 있거나 더 알고 싶다면 언제든지 Bento를 통해 연락해 주세요.

# 마지막으로

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 프로젝트와 같은 것들을 만드는 것은 코딩 기술을 향상시키고 웹사이트에 멋진 기능을 추가하는 좋은 방법입니다. 계속해서 코딩 여정을 이어가면서 새로운 아이디어와 도전을 탐험해보세요. #100DaysOfCode 챌린지를 통해 진행되는 더욱 흥미로운 프로젝트와 자습서를 기대해 주세요!
