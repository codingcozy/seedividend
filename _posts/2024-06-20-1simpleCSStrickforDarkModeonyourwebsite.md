---
title: "이 웹사이트의 다크 모드를 위한 1가지 간단한 CSS 트릭"
description: ""
coverImage: "/assets/img/2024-06-20-1simpleCSStrickforDarkModeonyourwebsite_0.png"
date: 2024-06-20 03:18
ogImage: 
  url: /assets/img/2024-06-20-1simpleCSStrickforDarkModeonyourwebsite_0.png
tag: Tech
originalTitle: "1 simple CSS trick for Dark Mode on your website"
link: "https://medium.com/x-periment-asteroid/1-simple-css-trick-for-dark-mode-on-your-website-d44ed7a7bfb5"
isUpdated: true
---




## 야간 모드가 기다리고 있어요!

상상해보세요: 밤이 깊어지고 달이 높아지는데, 당신은 편안하게 즐기는 사이트를 둘러보고 있을 때 — 바로 그때! — 밝은 흰색 배경이 마치 협시처럼 쏟아지는 걸 맞이합니다. 이게 최선은 아니겠죠?

개발자들은 이 간단한 문제를 기술적인 미궁으로 만들어, 수많은 클래스, 스타일 및 JavaScript 파일을 추가합니다. 그러나 친애하는 독자여, CSS 마법의 20줄 미만으로 다크 모드를 달성할 수 있는 더 간단한 방법이 있습니다. 네, 들었습니다 — 20줄 미만!

# 다크 모드를 간편화하기

<div class="content-ad"></div>

CSS를 활용하면 사용자 선호 테마에 매끄럽게 적응하는 웹사이트를 구축할 수 있어요. 어떻게요? 미디어 쿼리를 사용하여 --body-bg 및 --body-color CSS 변수를 조정하면 되죠. 라이트 모드에서는 배경을 흰색으로, 다크 모드에서는 검정색으로 설정할 거예요. 이렇게 하면 됩니다:

```js
@media (prefers-color-scheme: dark) {
  :root {
    --body-bg: black;
    --body-color: white;
  }
}
```

```js
@media (prefers-color-scheme: light) {
  :root {
    --body-bg: white;
    --body-color: black;
  }
}
```

만세! 이제 사이트가 낮과 밤 사이를 자유자재로 이동할 수 있답니다.재즈 뮤지션이 조퍼바꾸는 것만큼 부드럽죠.

<div class="content-ad"></div>

# 작동 방식

이 마법의 핵심은 prefers-color-scheme 미디어 쿼리입니다. 이 미디어 쿼리는 사용자의 시스템 환경 설정을 확인하고 해당 스타일을 적용합니다. 사용자가 어두운 테마를 선호하는 경우 CSS 변수 --body-bg와 --body-color은 각각 검정과 흰색으로 설정됩니다. 반대로, 사용자가 밝은 테마를 선호하는 경우 이러한 변수는 흰색과 검정으로 설정됩니다.

# 다크 모드의 이유

하지만 왜 다크 모드를 신경 써야 할까요? 이유는 몇 가지 있습니다:

<div class="content-ad"></div>

- 눈의 피로를 줄여줍니다: 특히 어두운 환경에서는 다크 모드가 눈에 부담을 덜어줄 수 있습니다.
- 배터리 수명 절약: OLED 화면에서는 다크 모드를 사용하여 검은 픽셀이 더 적은 전력을 소비하기 때문에 배터리 수명을 절약할 수 있습니다.
- 멋있어 보입니다: 솔직히 말해서, 다크 모드는 슬릭하고 현대적으로 보입니다.

![이미지](/assets/img/2024-06-20-1simpleCSStrickforDarkModeonyourwebsite_0.png)

# 프로젝트에 다크 모드 구현하기

이 CSS 트릭을 프로젝트에 통합하려면 다음 단계를 따르세요:

<div class="content-ad"></div>

- 변수 정의: CSS 변수를 루트 수준에서 설정하여 스타일 시트 전체에서 액세스할 수 있도록 합니다.
- 미디어 쿼리 적용: 사용자의 선호도에 따라 이러한 변수를 조정하기 위해 prefers-color-scheme 미디어 쿼리를 사용하세요.
- 요소 스타일링: CSS에서 이러한 변수를 사용하여 전체 사이트가 다크 모드 설정을 준수하도록 합니다.

예시:

```js
body {
  background-color: var(--body-bg);
  color: var(--body-color);
}
```

# 결론: 밤 모드가 여러분을 기다립니다!

<div class="content-ad"></div>

여기 있습니다! 웹 개발 생활을 조금 더 쉽게 만드는 빠르고 재미있는 가이드! 기술 분야에서 모든 것이 이렇게 간단했으면 좋겠죠? 이제 용감하게 코딩하고 사용자들을 눈부시게 하거나 배열에 뒤얽히지 않고 진행할 수 있어요! 새벽에 코딩을 하는 야행성 개발자이든, 세련된 현대적인 디자인을 좋아하는 사람이든, 이 간단한 CSS 요령이 여러분을 지켜줄 거예요.

🌚 여정을 즐겼나요? 멋지군요! 아래는 어떻게 저희를 지원할 수 있는지 안내해 드립니다:
👏 50번의 박수가 필요합니다; 여러분도 박수를 보내주세요.
💬 의견을 남겨주세요; 여러분의 피드백을 듣는 것을 좋아해요!