---
title: "CSS로 마우스를 따라다니는 원 만들기 방법"
description: ""
coverImage: "/assets/img/2024-05-02-HowToCreateaCircleThatFollowstheCursorinCSS_0.png"
date: 2024-05-02 00:22
ogImage: 
  url: /assets/img/2024-05-02-HowToCreateaCircleThatFollowstheCursorinCSS_0.png
tag: Tech
originalTitle: "How To Create a Circle That Follows the Cursor in CSS"
link: "https://medium.com/@jacobpatton_3644/how-to-create-a-circle-that-follows-the-cursor-in-css-fddbc37f449e"
isUpdated: true
---




# 간략한 내용

여기 코드만 보고 싶다면 제 Codepen을 확인하세요!

# 배경

저는 개인 프로젝트를 진행하던 중 특정 요소 위에 커서가 있을 때 따라다니는 작은 원을 가지고 싶었습니다. 이것을 어떻게 구현했는지에 대한 설명입니다.

<div class="content-ad"></div>

## 내 요소들

여기 예제의 HTML은 꽤 간단해요.

```js
<div class="container">
  <div class="hover-box"></div>
</div>
```

요소는 단 두 개뿐이에요. 하나는 마우스를 올렸을 때 커서 추적기가 나타나길 원하는 요소이고, 다른 하나는 호버 박스를 가운데 정렬하기 위한 컨테이너 요소예요.

<div class="content-ad"></div>

## 일부 스타일링

여기에 상자와 컨테이너에 적용한 스타일이 있어. 나는 상자를 화면 중앙에 배치하고 싶었어.

```js
:root {
  background-color: black;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hover-box {
  background-color: #32A1F0;
  --hover-box-height: 200px;
  height: var(--hover-box-height);
  width: var(--hover-box-height);
  border-radius: 1em;
}
```

# 시작해볼까요?

<div class="content-ad"></div>

나는 호버 시 나타나는 가상 요소를 사용하기로 결정했어요. translate를 사용하여 가상 요소를 이동시키고 CSS 변수를 사용하여 커서 위치를 추적했어요.

```js
.hover-box:hover::before {
  --cursor-tracker-diameter: 24px;
  background-color: red;
  opacity: 0.5;
  height: var(--cursor-tracker-diameter);
  width: var(--cursor-tracker-diameter);
  border-radius: var(--cursor-tracker-diameter);
  content: "";
  translate: var(--x) var(--y);
}
```

## 커서 위치 추적하기

"mousemove" 이벤트를 사용하여 호버 박스 내에서 마우스가 움직일 때를 추적할 수 있어요. x와 y 오프셋을 얻어와 CSS 변수로 설정했어요.

<div class="content-ad"></div>

```js
const hoverBox = document.querySelector('.hover-box');

hoverBox.addEventListener('mousemove', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  hoverBox.style.setProperty('--x', `${x}px`);
  hoverBox.style.setProperty('--y', `${y}px`);
})
```

## 어디 있죠?

이 시점에서는 커서 추적기가 전혀 나타나지 않았습니다. 몇 가지 시도를 한 후에 가상 요소에 display: flex를 추가하면 나타난다는 것을 발견했습니다. 정확히 왜 이것이 작동하는지는 모르지만, ::before 가상 요소의 기본 표시가 인라인인 것과 관련이 있을 것으로 생각됩니다.

```js
.hover-box:hover::before {
  --cursor-tracker-diameter: 24px;
  background-color: red;
  opacity: 0.5;
  height: var(--cursor-tracker-diameter);
  width: var(--cursor-tracker-diameter);
  border-radius: var(--cursor-tracker-diameter);
  content: "";
  translate: var(--x) var(--y);
  display: block;
}
```

<div class="content-ad"></div>

## 원을 조정하기

<img src="/assets/img/2024-05-02-HowToCreateaCircleThatFollowstheCursorinCSS_0.png" />

그겢은 제가 원하는 것과 조금 다릅니다. X와 Y를 어떤 값으로 설정해야 마우스 커서가 원의 가운데에 위치하게 할 수 있는지 조정해 봅시다.

```js
hoverBox.addEventListener('mousemove', (event) => {
  const x = event.offsetX - 8;
  const y = event.offsetY - 7;
  hoverBox.style.setProperty('--x', `${x}px`);
  hoverBox.style.setProperty('--y', `${y}px`);
})
```

<div class="content-ad"></div>

그것을 좀 더 다뤄 본 후에, 왼쪽으로 8 픽셀 올려서 7 픽셀 올리는 것이 가장 나에게 적합하다고 판단했어.

<img src="/assets/img/2024-05-02-HowToCreateaCircleThatFollowstheCursorinCSS_1.png" />

## 계속해서 커서를 따라옵니다!

가끔 커서 추적기가 요소 바깥에서 커서를 추적하는 것을 알게 되었어.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-02-HowToCreateaCircleThatFollowstheCursorinCSS_2.png" />

박스 밖에 나오지 않도록 하기 위해 호버 박스에 overflow: hidden을 추가했어요.

```js
.hover-box {
  background-color: #32A1F0;
  --hover-box-height: 200px;
  height: var(--hover-box-height);
  width: var(--hover-box-height);
  border-radius: 1em;
  overflow: hidden;
}
```

# 이제 완료되었어요!

<div class="content-ad"></div>

그 정도면 괜찮을 거에요! 도움이 되었으면 좋겣네요.