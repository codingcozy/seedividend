---
title: "ESLint  Husky  Lint-staged 사용 방법 및 설정 가이드"
description: ""
coverImage: "/assets/img/2024-06-23-UsingESLintHuskyLint-staged_0.png"
date: 2024-06-23 13:55
ogImage: 
  url: /assets/img/2024-06-23-UsingESLintHuskyLint-staged_0.png
tag: Tech
originalTitle: "Using ESLint + Husky + Lint-staged"
link: "https://medium.com/@bkn020612/using-eslint-husky-lint-staged-6d6609b02fc2"
---


저는 새로운 회사에 프론트엔드 개발자로 합류했어요!

하지만 여기서 또 다시 시작되는군요 — 완벽한 코드 스타일을 위한 영원한 탐험이라니...

제 개인적인 생각으로는 이 방대한 코딩 우주에서 '나쁜 코드'란 존재하지 않는다고 확신하고 있어요. 각자가 고유한 스타일을 갖고 있으니까 말이에요.

그렇지만 5명 이상이 참여하는 프로젝트에서 각자 다른 스타일로 코딩한 걸 보면, 특히 네이밍 규약과 함수 이름 (사실 패턴까지도)에 다양한 스타일이 있음을 알게 되었어요.

<div class="content-ad"></div>

제가 회사에 새로 합류한 입장에서는 코드를 이해하는 데 시간이 걸렸는데, 이러한 시간을 최소화하기 위해 이름 규칙을 적어도 일관되게 적용할 방법에 대해 생각하기 시작했습니다.

![이미지](/assets/img/2024-06-23-UsingESLintHuskyLint-staged_0.png)

물론, 우리는 일반적으로 알려진 ESLint와 Prettier를 사용하고 있었습니다. 그러나 체크를 실행하지 않고 푸시하는 등 실수가 발생한 경우가 있었습니다.

사실, 이는 이 두 도구의 사용을 무효화시키는 결과를 초래합니다!

<div class="content-ad"></div>

요즘에는 VSCode와 같은 IDE가 팝업 알림을 제공하지만, 커밋하기 전에 추가적인 확인을 하는 것도 나쁘지 않은 생각이에요. 

그래서, 커밋 전에 코드 스타일을 확인하는 라이브러리 husky를 사용해보자는 아이디어를 생각해냈어요. 이렇게 하면 더 편리할 거에요.

추가적인 단계로, ESLint를 사용자 정의하여 내 규칙이나 회사별 규칙을 설정해볼 생각이에요!

먼저, 대부분의 분들이 이미 알고 있을 것 같지만, ESLint와 Prettier가 무엇인지 간단히 설명드리겠어요.

<div class="content-ad"></div>

## ESLint: 코드의 수호천사 👼

ESLint를 만나보세요 — 당신의 신뢰할 수 있는 리터입니다. 그것은 하루를 구해주는 친구와 같아요!
코드를 위한 문법 검사기를 가지고 있는 것 같아요.
ESLint는 교묘한 구문 오류를 잡는 것뿐만 아니라 일관된 코드 스타일을 위해 매치메이커 역할을 하며, 당신의 코드가 최상급인지 확인합니다. 🌟

## Prettier: 코드 스타일리스트 ✨

코드베이스를 위한 패션 관리자가 있는 것 같아요.
Prettier는 코드를 새롭게 꾸며주는 데 도움을 줍니다.

<div class="content-ad"></div>

이 두 가지 도구는 때때로 구성 사항 간의 충돌로 이어져있는 코드 스타일과 관련된 측면을 다룹니다. 이러한 충돌을 처리하는 것이 중요합니다.

자, 이 글의 주요 내용인 Husky에 대해 살펴봅시다.

## Husky

이전에 논의한 바와 같이 Husky는 git commit이나 git push와 같은 중요한 Git 이벤트가 발생하기 전에 지정된 스크립트를 실행하는 데 도움이 되는 다재다능한 라이브러리입니다. 이 고급 도구는 사실상 지휘자 역할을 하여 Git 내에서의 작업 흐름을 안내하고 개발자가 개발 과정을 보다 세밀하게 통제할 수 있도록 돕습니다. Husky는 Git 이벤트 사이에 전략적으로 배치된 후크를 구현하여 작동하며 작업 흐름을 섬세하게 조정할 수 있게 합니다. 이런 제어된 이벤트 저지 기법 패러다임은 보통 git 후크 관리로 불립니다.

<div class="content-ad"></div>

## lint-staged

깃에서 스테이징의 개념은 lint-staged의 가치를 이해하는 데 기초를 제공합니다. 코드 린트 활동을 수행할 때 개발자들은 종종 검사할 파일을 수동으로 지정해야 하는 선택을 직면할 수 있습니다. - 이는 잠재적으로 고통스러운 노력일 수 있습니다 - 또는 전체 프로젝트 저장소를 검토에 노출시킬 수 있습니다.
그러나 프로젝트가 규모가 커질수록 복잡성도 증가합니다.
이러한 맥락에서, 감독은 점점 걱정거리가 되며, 린트 과정 중 실수로 빠뜨린 파일이 상당히 많이 발생할 수 있습니다.
lint-staged는 코드 품질 보증 분야에서 세련되고 전략적인 협업자입니다. 깃 add를 사용하여 스테이징 상태로 전환된 파일만 엄밀히 검사함으로써, lint-staged는 감독을 방지하고 린팅 정밀도와 효율성을 향상시키는 아주 우아한 해결책을 제공합니다.

실용적인 사용법을 알아보겠습니다!

## husky & lint-staged 사용하기

<div class="content-ad"></div>

Husky 및 lint-staged을 설치하세요

```js
npx mrm lint-staged
```

위 명령어를 실행하면 .husky라는 이름의 폴더가 생성되고 package.json 파일에 코드가 추가됩니다.

```js
{
  "scripts": {
    "prepare": "husky install"
  },
  ...
  "lint-staged": {
    "*.js": "eslint --cache --fix"
  }
}
```

<div class="content-ad"></div>

## husky 설정하기

mrm은 다운로드 시 기본 구성을 제공하기 때문에 별도로 구성할 것이 별로 없습니다. 그러나 재미를 위해 몇 가지 사용자 정의 문구를 셸 스크립트에 추가했습니다. (?)

## lint-staged 설정하기

lint-staged의 구성은 사용 중인 프로그래밍 언어에 따라 다를 수 있습니다.

<div class="content-ad"></div>

나의 경우에는 TypeScript를 사용하고 있기 때문에 별도로 설정해주어야 했습니다.

```js
"lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --max-warnings 0 ."
    ]
}
```

처음에는 경고를 완전히 무시하고 싶지 않았기 때문에 --max-warnings 0을 포함시켰습니다.

당신의 상황에 따라 제거하는 것도 고려해볼 수 있어요!

<div class="content-ad"></div>

이제 실행하면 아래와 같이 Husky가 원활하게 작동하는 것을 확인할 수 있습니다.

```bash
git commit -m 'husky work'
```

# 💀

<img src="/assets/img/2024-06-23-UsingESLintHuskyLint-staged_1.png" />


<div class="content-ad"></div>

# 😎

![Image](/assets/img/2024-06-23-UsingESLintHuskyLint-staged_2.png)