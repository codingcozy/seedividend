---
title: "프론트엔드 개발자를 위한 50가지 프로젝트 No05 - Blurry Loading"
description: ""
coverImage: "/assets/img/2024-05-17-50Front-EndCombatProjectNo05BlurryLoading_0.png"
date: 2024-05-17 21:26
ogImage: 
  url: /assets/img/2024-05-17-50Front-EndCombatProjectNo05BlurryLoading_0.png
tag: Tech
originalTitle: "50 Front-End Combat Project No.05: Blurry Loading"
link: "https://medium.com/@cendz/50-front-end-combat-project-no-05-blurry-loading-f139fe89f562"
isUpdated: true
---




<img src="/assets/img/2024-05-17-50Front-EndCombatProjectNo05BlurryLoading_0.png" />

오늘은 50개의 프론트엔드 실전 프로젝트 No.05: Blurry Loading에 대해 이야기하려고 해요. 이 프로젝트의 소스 코드 다운로드 주소는 다음과 같아요: [여기를 클릭해주세요](https://github.com/bradtraversy/50projects50days/tree/master/blurry-loading)

# 프로젝트 소개

이 프로젝트는 웹 페이지 로드 중에 희미한 로딩 효과를 시뮬레이션해요. 페이지는 흐릿한 배경 이미지로 시작하여 점점 선명해지고 로딩 진행률 텍스트가 변경되는 효과를 보여줍니다.

<div class="content-ad"></div>


![Blurry Loading](/assets/img/2024-05-17-50Front-EndCombatProjectNo05BlurryLoading_1.png)

# 핵심 코드

- `section class=”bg”``/section`: 로딩을 위해 배경 이미지를 흐릿하게 처리하는 데 사용됩니다.
- `div class=”loading-text”``/div`: 로딩 진행 상황을 표시하는 텍스트입니다.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Blurry Loading</title>
  </head>
  <body>
    <section class="bg"></section>
    <div class="loading-text">0%</div>

    <script src="script.js"></script>
  </body>
</html>
```

<div class="content-ad"></div>

- .bg의 filter: blur(0px): 초기 blur 효과를 정의합니다.
- .loading-text.style.opacity: 로드 진행 텍스트의 투명도를 제어합니다.

```js
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.bg {
  background: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80')
    no-repeat center center/cover;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
}

.loading-text {
  font-size: 50px;
  color: #fff;
}
```

- 로드 진행 텍스트와 배경 요소에 대한 DOM 노드 참조 획득.
- 로드 진행을 기록할 변수 load를 정의합니다.
- setInterval 함수를 사용하여 30밀리초마다 블러링 함수를 호출하는 타이머를 설정하여 로딩 프로세스를 모방합니다.
- 블러링 함수:
— 로드 값을 증가시켜 로딩 진행을 모방합니다.
— 로딩이 완료되었는지 확인하고 타이머를 해제합니다.
— 로드 진행 텍스트의 콘텐츠를 업데이트합니다.
— scale 함수를 사용하여 로드 진행 값을 blur 필터의 강도 값으로 변환하고 배경의 blur 효과를 업데이트합니다.
— scale 함수를 사용하여 로드 진행 값을 텍스트의 투명도 값으로 변환하고 로드 진행 텍스트의 투명도를 업데이트합니다 (값이 100에 가까울수록 투명도가 낮아집니다).

```js
const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

let int = setInterval(blurring, 30)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
```

<div class="content-ad"></div>

# 개요

이 프로젝트는 CSS의 filter: blur(px) 속성을 사용하여 흐릿한 효과를 구현하고, JavaScript 타이머 (setInterval)를 사용하여 로딩 과정을 시뮬레이션합니다. 로딩 진행이 늘어남에 따라 블러 필터의 값이 점차 감소하고 배경 이미지가 선명해집니다. 동시에 JavaScript 코드는 로딩 진행 텍스트의 값과 투명도도 업데이트합니다.

GIF의 전체 과정은 다음과 같이 나타납니다:

![이미지](/assets/img/2024-05-17-50Front-EndCombatProjectNo05BlurryLoading_2.png)

<div class="content-ad"></div>

이 이야기를 읽은 후 도움이 될 것 같다고 생각된다면 박수를 보내주시고 팔로우해주세요. 공유도 해주세요. 혹시 당신의 리트윗이 다른 사람들에게 영감을 줄 수도 있습니다. 또한, 제안 사항이 있으면 아래에 제안해 주시면 감사하겠습니다. 향후 기술에 관한 더 많은 기사를 공유하겠습니다. 감사합니다!