---
title: "그라데이션 오버레이를 사용한 애니메이티드 랜딩 페이지 만들기"
description: ""
coverImage: "/assets/img/2024-07-02-Animatedlandingpagewithgradientoverlay_0.png"
date: 2024-07-02 21:39
ogImage: 
  url: /assets/img/2024-07-02-Animatedlandingpagewithgradientoverlay_0.png
tag: Tech
originalTitle: "Animated landing page with gradient overlay"
link: "https://medium.com/@tom.hendrych/animated-landing-page-with-gradient-overlay-862b26c7958f"
isUpdated: true
---



![이미지](/assets/img/2024-07-02-Animatedlandingpagewithgradientoverlay_0.png)

안녕하세요! 이번 튜토리얼에서는 사용자 상호 작용에 따라 내용을 동적으로 변경하는 애니메이션 랜딩 페이지를 만들어 볼 거에요. 이 튜토리얼은 일반 HTML, CSS, JavaScript 만을 사용하므로 의존성이나 프레임워크는 필요하지 않아요. 여러분이 좋아하는 IDE/텍스트 편집기, 열정, 그리고 새로운 것을 배우려는 시간만 있으면 돼요.

저희의 랜딩 페이지는 아프리카 사바나의 웅장한 동물들을 소개하는 가상 프로젝트로, 동물을 좋아하지 않는 사람이 누가 있겠어요? 🦏 🦒

이 프로젝트를 자유롭게 조정해보세요. 여러분의 창의력을 발휘하고 필요에 맞게 적응시켜보세요. 마블/DC 슈퍼히어로, 포켓몬, 좋아하는 스포츠 스타, 또는 제품을 소개하기 위해 사용해도 좋아요.



<div class="content-ad"></div>
마크다운 형식의 최종 결과입니다

## 튜토리얼 구조

첫 번째 섹션에서는 배경 이미지를 설정하고 오버레이 필터를 적용합니다. 이 필터는 이미지의 밝기를 낮추어 텍스트를 더 잘 볼 수 있도록 합니다. 이를 통해 텍스트가 배경에 명확하게 돋보이며 콘텐츠가 더 접근할 수 있고 시각적으로 매력적으로 보입니다. 또한 페이지를 더욱 매력적으로 만들기 위해 그라디언트를 추가합니다.

두 번째 섹션은 "jumbotron" 네비게이션에 헌정되어 있으며 웹페이지에서 주요한 네비게이션 요소로 작용합니다. 이 섹션은 사용자의 주의를 끌기 위해 설계되었으며, 중요한 콘텐츠에 초점을 맞추기 위해 사용됩니다. jumbotron을 활용하여 중요한 콘텐츠, 공지사항 또는 CTA(호출 대 행동)를 강조함으로써 방문자에게 즉각적으로 볼 수 있도록합니다. 이렇게 함으로써 네비게이션이 직관적이고 시각적으로 매료적이게되어 전체 사용자 경험을 향상시킵니다.



<div class="content-ad"></div>
최종 섹션에서는 사용자 상호작용 시 슬라이드되는 기사 섹션을 생성할 것입니다. 이 동적 기능은 상호작용 및 시각적인 매력을 제공하여 사용자 참여를 높일 것입니다. 슬라이딩 애니메이션은 주목을 끄고 탐색 경험을 더 즐겁게 만들 수 있습니다.

# 목차

- 오버레이 필터 및 그래디언트를 사용한 배경 이미지
- 점보트론 내비게이션
- 기사 섹션

## 설정



<div class="content-ad"></div>
이 미니 프로젝트의 시작점은 이 GitHub 저장소의 "projects" 폴더에 있습니다. 이 튜토리얼의 최종 코드도 여기에서 찾을 수 있어요.

코딩을 시작하기 전에 정말 간단한 프로젝트를 설정해 봅시다. 우리는 HTML 마크업을 위한 하나의 파일(index.html), CSS 파일, 그리고 JavaScript 파일이 필요할 거에요. 먼저 HTML 파일을 생성해볼 텐데요, 여기서 CSS 파일 styles.css를 링크하고 JavaScript 파일 index.js를 생성하고 가져올 거에요. 아래 내용을 자유롭게 복사해서 붙여넣어 주세요.

제가 "link rel="preload" ... /" 태그를 헤더 섹션에 언급하고 싶어요. 이 태그는 브라우저에게 (우리 경우 이미지와 같은) 리소스를 최대한 빨리 로드하도록 지시합니다. 이렇게 하면 이미지가 JavaScript에 의해 필요로 할 때 즉시 준비 상태가 되어, 나중에 튜토리얼에서 유용하게 활용할 수 있을 거에요.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
      rel="stylesheet"
    />
    <link rel="preload" href="./img/rhino.jpg" as="image" />
    <link rel="preload" href="./img/zebra.jpg" as="image" />
    <link rel="preload" href="./img/lion.jpg" as="image" />
    <link rel="stylesheet" href="./styles.css" />
    <script src="./index.js" defer></script>
    <title>Animated landing page</title>
  </head>

  <body>
      <!-- 여기에 우리의 코드가 들어갈 거에요 -->
  </body>
</html>
```



<div class="content-ad"></div>
저희 디렉터리의 루트에 styles.css 파일을 만들어주세요. 구글 폰트에서 Poppins라는 폰트를 불러와 텍스트 컬러와 초기 배경 이미지를 설정할 거에요. 여기엔 특별한 것이 없어요.

```js
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

:root {
    --text-primary: white;
    --background-image: url('./img/rhino.jpg');
}

body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
}
```

# 배경 이미지

먼저, 배경부터 시작해보겠습니다. 배경 이미지는 콘텐츠 아래에 오도록 하고 싶어요. 이를 위해 `main` 요소에 .content 클래스를 추가할 거에요.



<div class="content-ad"></div>
우리는 배경을 여러 층으로 구성할 거예요. Adobe Photoshop과 같은 그래픽 소프트웨어에 익숙하다면, 이는 동일한 개념을 따르며 z-index를 사용하여 이루어질 거에요. 우리는 그레이스케일 필터와 그라데이션 효과를 적용하기 위해 이 작업을 해야 해요.

먼저, 우리는 가상 요소 .content:before를 사용하여 바닥층에 스타일을 선언할 거에요. 중요한 부분은 이것을 다음 층보다 낮은 z-index로 설정하는 것이에요. 또한 배경 이미지와 다른 배경 속성 몇 가지를 설정하여 이미지를 가운데 정렬하고 페이지 전체를 커버할 거에요. 흥미로운 부분은 filter: grayscale(100%)인데, 이는 이미지를 흑백으로 변환해 줘요.

```js
<body>
    <main class="content">
      <!-- 내용이 여기에 들어갈 거에요 -->
    </main>
</body>
```

```js
.content:before {
    position: fixed;
    content: "";
    left: 0;
    right: 0;
    z-index: -2;

    display: block;
    width: 100vw;
    height: 100vh;

    background-image: var(--background-image);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    filter: grayscale(100%);
    transition: background-image 1s 0.2s ease-in-out;
}
```



<div class="content-ad"></div>
다음 단계로 우리는 그라데이션을 설정할 것입니다. styles.css 파일의 맨 위에 아래 CSS 변수를 선언해주세요.

```js
:root {
    --text-primary: white;
    --background-image: url('./img/rhino.jpg');

    --gradient-color-first: rgba(0, 0, 0, 0.7);
    --gradient-color-second: rgba(0, 0, 0, 0.5);
}
```

다음으로, .content::after 가상요소를 설정해야 합니다. 우리의 그라데이션은 위에서 아래로 진행될 것이며, 우선은 검은 그라데이션을 설정할 겁니다. 나중에, 어떻게 그라데이션을 수정하는지 보여드릴게요. 이 그라데이션은 나중에 추가할 흰색 텍스트의 가독성을 향상시킬 겁니다.

```js
.content:after {
    position: fixed;
    content: "";
    left: 0;
    top: 0;
    z-index: -1;

    display: block;
    width: 100vw;
    height: 100vh;

    background: linear-gradient(
        var(--gradient-color-first),
        var(--gradient-color-second)
    );
}
```



<div class="content-ad"></div>
마지막으로 가장 중요한 것은 최종 레이어를 정의해야 합니다. 이 레이어는 맨 위에 있으므로 z-index가 가장 높을 것입니다. 이 경우에는 z-index: 0으로 설정합니다. 이제 코끼리가 나타나는 흑백 배경 이미지를 볼 수 있어야 합니다.

```js
.content {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    color: var(--text-primary);
}
```

## 그라데이션을 사용자 정의하기 - 선택 사항

이 단계는 선택 사항입니다. 배경 이미지의 그라데이션을 사용자 정의할 것입니다. 다른 색상이 어떻게 전체 콘텐츠의 느낌과 분위기를 급격하게 바꿀 수 있는지 확인할 수 있을 것입니다.



<div class="content-ad"></div>
아래 스니펫에서 기본 색상을 찾을 수 있지만 선호하는 색상을 선택해도 괜찮습니다. 그러나 컨텐츠의 대비와 가독성을 유지하기 위해 포화된 색상을 선택하고 알파(불투명도)를 0.5와 0.7 사이로 유지하는 것을 강력히 권장합니다.

사용자 지정 그라디언트를 적용하려면 CSS 변수를 재정의해야 합니다:

--gradient-color-second.

![그라디언트 이미지](/assets/img/2024-07-02-Animatedlandingpagewithgradientoverlay_1.png)



<div class="content-ad"></div>
```js
:root {
    --text-primary: white;
    --background-image: url('./img/rhino.jpg');
    --gradient-color-first: rgba(0, 0, 0, 0.7);
    --gradient-color-second: rgba(0, 0, 0, 0.7);

    // color presets - feel free to pick & try
    --gradient-color-second: rgba(0, 204, 255, 0.7); // 1. 시안
    --gradient-color-second: rgba(255, 0, 200, 0.7); // 2. 마젠타
    --gradient-color-second: rgba(255, 247, 0, 0.7); // 3. 노랑
    --gradient-color-second: rgba(0, 255, 195, 0.7); // 4. 녹색
    --gradient-color-second: rgba(255, 136, 0, 0.7); // 5. 주황
    --gradient-color-second: rgba(0, 136, 255, 0.7); // 6. 파랑
}
```

# 점보트론 내비게이션

두 번째 주요 섹션인 점보트론 내비게이션으로 이동해 봅시다. "점보트론"은 웹 디자인에서 사용되는 크고 두드러진 컴포넌트입니다. 일반적으로 사용자의 주의를 끌기 위해 설계됩니다.

우리의 경우, 점보트론 내비게이션에는 동물 이름이 포함되어 있으며 사용자는 활성 항목 간에 전환할 수 있습니다. 사용자가 동물 이름을 클릭하면 현재 선택된 동물을 전환하고 페이지 배경을 해당 동물로 변경할 것입니다.



<div class="content-ad"></div>
우선으로, .content 내에 있는 .grid-container을 생성할 것입니다. 이 컨테이너에는 두 개의 동일한 크기인 .left와 .right 부분이 포함될 것입니다. 왼쪽에는 jumbotron 내비게이션이 있고, 오른쪽에는 동물에 관한 짧은 기사가 들어갈 것입니다.

저희 내비게이션 아이템 마크업을 보시면, id 속성과 사용자 정의 속성 data-index가 정의되어 있습니다. 이 두 가지 속성을 우리의 자바스크립트에서 정확한 요소에 접근하는 데 사용할 것입니다.

```js
<main class="content">
  <div class="grid-container">

    <div class="left">
      <nav class="jumbo-nav">
          <a class="jumbo-nav__item jumbo-nav__item--active" data-index="0" id="rhino">Rhino</a>
          <a class="jumbo-nav__item" data-index="1" id="zebra">Zebra</a>
          <a class="jumbo-nav__item" data-index="2" id="lion">Lion</a>
      </nav>
    </div>

    <div class="right">
      <!-- 기사 텍스트 -->
    </div>

  <div>
</main>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  margin-top: 190px;
  padding: 0 20px;
  max-width: 1230px;
}
```



<div class="content-ad"></div>
마침내 우리는 내비게이션 스타일을 적용할 것입니다. 상단부터 아래로 내비게이션 항목을 표시하기 위해 부모 요소(플렉스 컨테이너)를 .jumbo-nav로 정의할 것입니다. 항목의 투명도를 0.3으로 설정하여 선택된 내비게이션 항목만 강조되는 시각적으로 비활성 상태를 만들 것입니다.

```js
.jumbo-nav {
  display: inline-flex;
  flex-direction: column;
}

.jumbo-nav__item {
  display: inline-block;
  align-self: flex-start;
  font-size: 100px;
  font-weight: bold;
  color: white;
  opacity: 0.3;
  cursor: pointer;
}

.jumbo-nav__item--active {
  opacity: 1;
}
```

선택한 항목을 호버 상태에 유지하고 싶으므로 가상 클래스를 사용할 수 없습니다. 대신 JavaScript를 사용하여 처리해야 합니다. 기본적으로 새 내비게이션 항목 위로 마우스를 올릴 때 활성 클래스를 추가하고 이전 요소에서 활성 클래스를 제거할 것입니다.

먼저, 모든 점보트론 내비게이션 항목을 쿼리해야 합니다.



<div class="content-ad"></div>
```js
// 모든 네비게이션 아이템 쿼리
const navItems = document.querySelectorAll(".jumbo-nav__item");
const navItemActiveClass = "jumbo-nav__item--active";

// 현재 선택된 항목을 추적합니다.
let selectedItemIndex = 0;
```

이제 활성 클래스를 네비게이션 항목에서 추가하거나 제거하는 역할을 맡은 함수를 만들 차례입니다. 네비게이션 항목 목록을 반복하고 각 요소에 이벤트 리스너를 추가해야 합니다. 다시 말해 이 함수는 사용자가 네비게이션 항목 위로 마우스를 올릴 때마다 마우스오버 이벤트에 따라 호출될 것입니다.

```js
function onMouseOver(e) {
  const currentlyHoveredIndex = e.target.dataset.index;
  const currentItem = navItems[currentlyHoveredIndex];

  // 이전 항목에서 활성 클래스 제거
  if (currentlyHoveredIndex !== selectedItemIndex) {
    const selectedItem = navItems[selectedItemIndex];
    if (selectedItem) {
      selectedItem.classList.remove(navItemActiveClass);
    }
  }

  // 새 항목에 활성 클래스 설정
  if (currentItem) {
    currentItem.classList.add(navItemActiveClass);
    selectedItemIndex = currentlyHoveredIndex;
  }
}

// 모든 네비게이션 항목에 이벤트 리스너 추가
navItems.forEach((element) => {
  element.addEventListener("mouseover", (e) => onMouseOver(e));
});
```

## 네비게이션 전환



<div class="content-ad"></div>
지금은 사용자가 선택한 항목을 강조하는 작동하는 내비게이션이 준비되었어요. 하지만 마우스를 다른 항목으로 이동하면 새 항목이 선택됩니다. 이 작동 방식은 잘 작동하지만, 깜빡이는 효과가 너무 강하고 자연스러워 보이지 않아요. 사용자들에게 더 매력적으로 보이도록 트랜지션을 추가할 거에요.

기존의 .jumbo-nav**item과 .jumbo-nav**item--active 맨 아래에 다음 코드를 추가할 거예요:

```js
.jumbo-nav__item {
  ...
  transition: all 0.5s 0.3s ease;
}

.jumbo-nav__item--active {
  ...
  transform: scale(1.2) translateX(7.5%);
}
```

위 코드를 자세히 살펴보겠습니다. 우리는 모든 속성에 transition을 적용할 거에요. 이렇게 하면 트랜지션의 길이가 0.5초이고 0.3초만큼 지연될 거에요. 이렇게 함으로써 한 상태에서 다른 상태로 자연스럽게 전환될 거예요. 마우스를 올렸을 때 적용되는 활성 상태에 대해 우리는 폰트를 크고 두드러지게 만들고 싶어해요. 이를 위해 transform: scale(1.2) translateX(7.5%)로 설정할 거에요.



<div class="content-ad"></div>
CSS (전환 및 변형) 몇 줄만 추가하면 기능 전체의 느낌을 개선할 수 있다는 게 놀라운 거지요?

## 배경 변경

마지막 본문 섹션으로 이동하기 전에, 해당 동물로 배경을 변경하는 기능을 추가할 거예요. setBackgroundImage라는 새로운 함수를 만들 거에요.

한 가지 유의해야 할 점이 있어요. 의사 요소인 .content::before에 배경 이미지 속성을 정의했는데, 의사 요소는 DOM에 존재하지 않기 때문에 JavaScript를 통해 직접 변경하는 방법이 없어요. 그러나 해결방법이 있어요. 배경 이미지 선언을 포함한 의사 요소를 가진 실제 요소인 .content 클래스를 선택할 수 있어요. 그런 다음 element.style.setProperty(name, value)를 사용해 CSS 변수 --background-image를 새 값으로 설정할 수 있어요. 새 값은 동물 이름인 imageId에요.



<div class="content-ad"></div>
```js
function setBackgroundImage(imageId) {
  const elementWithBackgroundImage = document.querySelector(".content");
  elementWithBackgroundImage.style.setProperty("--background-image", `url('./img/${imageId}.jpg')`);
}
```

마지막으로, 기존의 onMouseOver 함수 맨 아래에서 이 함수를 호출하고 e.target.id를 전달할 것입니다. 여기서 e.target.id는 네비게이션 요소에서 가져온 동물 이름입니다. 이제 네비게이션 항목 위로 마우스를 올리면 배경이 동적으로 변경되어야 하며, 두 번째 메인 섹션을 마쳤습니다. 🎉🎉🎉

```js
function onMouseOver(e) {
  // 이전 코드 생략

  setBackgroundImage(e.target.id);
}
```

# 기사 섹션



<div class="content-ad"></div>
이 튜토리얼의 마지막 주요 섹션에 대해 작업을 시작할 수 있습니다. 선택된 동물에 대한 제목과 몇 개의 단락을 표시하는 기사 섹션을 만들 것입니다. 게다가, 다른 탐색 요소 위로 마우스를 올리면 이 섹션도 업데이트할 것입니다. 다시 말해, UI가 사용자 상호작용에 따라 상황에 맞게 업데이트될 것입니다.

HTML 구조로 이동해봅시다. .grid-container 내부에 이미 .right 클래스를 가진 래핑 엘리먼트가 있고 여기에 기사를 배치합니다. 이 섹션의 HTML은 래핑 `article` 엘리먼트로 구성되어 있으며 중첩된 헤딩 엘리먼트와 몇 개의 단락을 포함하고 있습니다. 다음의 플레이스홀더 텍스트와 함께 이를 복사해보세요.

또한 시각적으로 더 흥미로워 보이도록 일부 스타일을 정의해야 하지만 CSS 코드에서는 특별한 일이 벌어지지는 않습니다. 맨 아래에는 다른 기사를 숨기기 위해 사용할 유틸리티 .hidden 클래스가 있습니다. 더불어 .article에 정의된 전환은 우측에서 새 기사가 슬라이드인 효과를 만들어 줍니다.



<div class="content-ad"></div>
```js
.article {
  color: var(--text-primary);
  max-width: 450px;
  position: absolute;
  transform: translateX(0);
  transition: all 0.6s 0.3s ease-in-out;
  opacity: 1;
  z-index: 3;
}

.article-title {
  font-weight: 600;
  font-size: 42px;
  letter-spacing: -2px;
  margin-bottom: 0;
}

.article-paragraph {
  font-size: 16px;
  line-height: 170%;
  opacity: 0.7;
  font-weight: 300;
}

.hidden {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transform: translateX(100%);
}
```

이제 우리는 모자이크의 마지막 빠진 조각을 추가할 거예요 — 사용자가 내비게이션 항목 위에 호버할 때 article 섹션을 변경하도록 합니다. HTML에서 querySelectorAll()로 3개의 article에 대한 참조를 가져와야 합니다. 우리의 JavaScript 파일 맨 위에 배치하는 것을 잊지 마세요.

```js
const articles = document.querySelectorAll(".article");
```

그리고 이제 onMouseOver 함수를 다음 코드로 업데이트해야 합니다. 이 코드는 활성 항목에서 hidden 클래스를 제거하고 비활성 항목에서 hidden 클래스를 설정할 거에요.



<div class="content-ad"></div>
```js
if (articles[selectedItemIndex]) {
  articles[currentlyHoveredIndex].classList.remove("hidden");
  articles[selectedItemIndex].classList.add("hidden");
}
```

그리고 우리는 jumbotron 탐색에서 활성 클래스를 제거하는 데 사용한 if 문 내에 위의 코드를 넣습니다.

여기 우리의 최종 onMouseOver 함수입니다.

```js
function onMouseOver(e) {
  const currentlyHoveredIndex = e.target.dataset.index;
  const currentItem = navItems[currentlyHoveredIndex];

  // 이전 항목에서 활성 클래스 제거
  if (currentlyHoveredIndex !== selectedItemIndex) {
    const selectedItem = navItems[selectedItemIndex];
    if (selectedItem) {
      selectedItem.classList.remove(navItemActiveClass);
    }

    // 활성 기사 표시/숨김
    if (articles[selectedItemIndex]) {
      articles[currentlyHoveredIndex].classList.remove("hidden");
      articles[selectedItemIndex].classList.add("hidden");
    }
  }

  // 새 항목에 활성 클래스 설정
  if (currentItem) {
    currentItem.classList.add(navItemActiveClass);
    selectedItemIndex = currentlyHoveredIndex;
  }

  setBackgroundImage(e.target.id);
}
```



<div class="content-ad"></div>
그거면 끝이에요!

최종 코드는 여기 있어요: https://github.com/jimmzzz/jimmzzz.github.io

# 결론

이 튜토리얼에서는 몇 가지 주요 디자인 요소를 통해 웹페이지의 시각적 매력과 사용자 경험을 향상시키는 데 초점을 맞췄어요. 배경 이미지에 오버레이 필터를 적용하여 밝기를 줄여 텍스트가 명확하게 돋보이고 쉽게 읽힐 수 있도록 했어요. 이 접근 방식은 콘텐츠 접근성과 시각적 명확성을 향상시킵니다.



<div class="content-ad"></div>
그 다음으로, 중요한 내용, 공지사항 또는 행동 요청에 대한 사용자의 주의를 끌기 위해 두드러지는 "jumbotron" 탐색 요소를 설계했습니다. 이를 통해 탐색이 직관적이고 매력적으로 되도록 했습니다.

마지막으로, 사용자 상호작용 시 슬라이드되는 동적 기사 섹션을 추가하여 콘텐츠를 제시하는 인터랙티브하고 시각적으로 매력적인 방법을 제공했습니다. 이러한 요소들이 함께 작용하여 시각적으로 눈에 띄고 사용자 친화적인 웹페이지를 만들어내어 가독성과 사용자 참여를 높였습니다.
