---
title: "CSS로 간단한 스크롤 효과를 만들기"
description: ""
coverImage: "/assets/img/2024-05-02-AMAZINGSCROLLEFFECTSINSIMPLECSS_0.png"
date: 2024-05-02 00:49
ogImage: 
  url: /assets/img/2024-05-02-AMAZINGSCROLLEFFECTSINSIMPLECSS_0.png
tag: Tech
originalTitle: "AMAZING SCROLL EFFECTS IN SIMPLE CSS 🤯"
link: "https://medium.com/@adaridonalrahul/amazing-scroll-effects-in-simple-css-1924a82218e4"
---


오늘은 CSS의 멋진 기능에 대해 이야기할 거에요. 여러분, 아래 데모를 한 번 봐주세요

데모

친구들, 제 믿어주세요. 이건 순수한 CSS에요. 오늘 이 포스트에서는 스크롤 시 위와 같은 애니메이션을 달성하는 방법을 공유할 거에요. 👍

![이미지](/assets/img/2024-05-02-AMAZINGSCROLLEFFECTSINSIMPLECSS_0.png)

<div class="content-ad"></div>

친구들, 지금 코드펜에 팔로워가 한 명이에요. 라이브 데모와 멋진 팁을 보려면 코드펜에서 저를 팔로우해 주세요 😆

또한, 제가 일일.dev 스쿼드도 시작했어요. 모두족이 되어서 완전한 업데이트를 받아 보세요.

# 기본 설정

우선 두 개의 h1이 들어 있는 각기 다른 두 개의 div가 있다는 것을 명확히 해 드리겠어요. 각 h1은 Poppins 글꼴로 되어 있고, flex 방법을 사용하여 가운데 정렬됐습니다. 우리가 시작하는 템플릿 안에는 더 이상 내용이 없어요.

<div class="content-ad"></div>

# 애니메이션

여기서 일이 시작됩니다. h1이 스크롤될 때 애니메이션을 적용하기 전에 일반적으로 애니메이션을 만들어야 합니다. @keyframes 속성을 사용하여 애니메이션을 만드세요. 저의 경우 다음과 같은 간단한 애니메이션을 만들었습니다.

```js
@keyframes revealing {
  from {
    color: gray;
    margin-left: 100vw;
    filter: blur(50px);
    opacity: 0.5;
  }
  to {
    margin: 0px;
    filter: blur(0px);
    opacity: 1;
  }
}
```

이제 h1에 해당 애니메이션을 적용하세요. 한 가지를 기억하세요. 시간을 언급하지 마세요. 좋아요 👍

<div class="content-ad"></div>

```jsx
표시되는 것처럼 보이도록 애니메이션을 추가해주세요

animation: revealing;

# 애니메이션 타임라인

애니메이션 타임라인 속성을 사용하여 특정 단계에 애니메이션이 도달하는 시간을 지정합니다.

<div class="content-ad"></div>

참고: 이 기능은 실험적인 기능입니다.

우리 경우에는 특정 요소가 화면에 나타날 때를 의미합니다. 따라서 타임라인을 적용하려면 다음 속성을 지정하세요.

animation-timeline: view(block);

이제 애니메이션이 동작하기 시작할 것입니다. 하지만 완전히 작동하지는 않는 것 같습니다.

<div class="content-ad"></div>

# Animation Range

애니메이션 범위는 뷰포트 관점에서 애니메이션이 시작되고 완료되는 시점을 지정합니다. 뷰포트는 얼마나 많은 부분이 커버되거나 포함되는지에 따라서 결정됩니다. 이렇게 지정할 수 있어요.

animation-range: cover 0% cover 50%;

<div class="content-ad"></div>

해당 요소의 가려짐이 0%인 상태에서 시작해야 하며, 해당 요소가 50% 정도 가려질 때 애니메이션이 끝나야 합니다.

수학이 어려우시거나 이 주제를 이해하기 어려우신 경우를 대비해 스크롤에 따라 애니메이션이 동작하는 웹사이트가 도움이 될 거에요. 이 동작 범위를 시각화해주는 도구가 있답니다. 아래 링크를 제공할게요.

# 축하드립니다 🎉

와우, 애니메이션을 완료했네요. 보셨나요? 자바스크립트 라이브러리인 GSAP 같은 것들보다 이 방법이 얼마나 간단한지요. 이 방법을 사용하면 작업을 단 3줄로 끝낼 수 있어요. 잘가요 👋

<div class="content-ad"></div>

# 마지막으로

친구들, 나는 다음 블로깅 계정을 시작했어. 그들을 주의 깊게 지켜봐, 내가 뉴스, 도구 업데이트와 그 외 많은 것들을 줄 테니까. 만약 그들 중 일부를 팔로우하지 못하더라도, 일일 업데이트는 daily.dev에서 받을 수 있어. 지금 daily.dev에 가입해봐 ⚡. 그 다음, 내 웹사이트를 확인해봐. 방금 2.3 버전이 출시됐어. 지금 citeal과 Codepen도 확인해봐

# 링크 🔗

스크롤로 움직이는 애니메이션
Daily.dev
Codepen
Citeal

<div class="content-ad"></div>

# 읽어주셔서 감사합니다 😉 좋은 하루 보내세요

크레딧: 개발자 Ed 채널의 비디오 썸네일