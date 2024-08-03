---
title: "내가 자바스크립트 프론트엔드 프레임워크를 만들며 성장한 이야기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How Making My Own Javascript Fronted Framework Moved Me Ahead"
link: "https://medium.com/@ori.holis/how-making-my-own-javascript-fronted-framework-moved-me-ahead-be7872eaeb4e"
---



![HowMakingMyOwnJavascriptFrontedFrameworkMovedMeAhead_0.png](/assets/img/HowMakingMyOwnJavascriptFrontedFrameworkMovedMeAhead_0.png)

언제나 JavaScript의 새로운 기능에 대해 궁금했어요. 많은 영상, 기사, 그리고 MDN을 통해 그것들을 발견하려 애썼죠.

그런데 한 번은 다르더군요. 제 동료 중 한 명이 자체 JavaScript 프런트엔드 프레임워크를 만들었어요. 그래서 이 도전을 시도해볼 필요가 있구나 생각했어요.

자체 프레임워크를 만드는 것은 쉬운 작업은 아니에요. DOM과 JavaScript 자체에 대해 많은 지식이 필요하죠.

<div class="content-ad"></div>

그래서 나는 동료의 프레임워크에서 영감을 얻어 작업을 조금 단순화하기로 결정했어. 이것이 어디서부터 시작해야 할지 결정하는 데 도움이 되었어.

## 모든 것이 시작된 곳

처음에 나는 나의 영감으로부터 판단하여 Vue나 React처럼 반응성을 구현하고 싶지 않다고 결정했어.

나에게 가장 중요한 것은 새로운 컴포넌트를 쉽게 작성하고 속도였어. 개발 과정에서 더욱 중요해졌어. 어느 순간부터 나는 그것에 광적이 되었어.

<div class="content-ad"></div>

첫 번째로, 내 프레임워크에 포함시키고 싶은 기능 목록을 작성했습니다.

두 번째로, 구현된 새로운 자바스크립트 기능을 살펴보고 싶었습니다.

이것들을 결정하고 나니 나는 과제에 착수할 준비가 되었습니다.

![이미지](/assets/img/HowMakingMyOwnJavascriptFrontedFrameworkMovedMeAhead_1.png)

<div class="content-ad"></div>

## 코딩 시작

내 앞에 있는 함수 목록을 보면서 코딩에 바로 착수했어요.

몇 시간 후에 초안이 완성되었습니다. 프레임워크는 몇 백 줄의 코드로 이루어져 있었어요. 최신 기능을 사용자 지정 웹 구성 요소나 쉐도우 DOM으로 구현했죠.

이때 새로운 생각이 떠올랐어요.

<div class="content-ad"></div>

내 코드를 살펴보니 다른 요소들처럼 간단하게 렌더링할 수 있도록 프레임워크를 수정하는 것이 꽤 쉽다고 생각했어요. 하지만 크게 오산이었네요.

각 SVG 구성 요소의 중요 요소를 SVG 요소로 렌더링하도록 수정해야 했지만 DOM으로부터 요소를 연결하고 분리하는 함수를 유지하고 싶었어요.

하지만 그것이 문제가 아니었어요. 표준 요소에 대해 내 프레임워크를 시도해보지 않았거든요.

SVG 렌더링을 위한 확장 기능을 개발한 후 내 프레임워크를 사용해 첫 번째 구성 요소를 작성했지만, 아무 일도 일어나지 않았어요.

<div class="content-ad"></div>

응, 맞아. 아무 일도 일어나지 않았어.

## 내 실수 해결하기

아무 일도 일어나지 않은 것에 놀랐어, 잘 작동해야 했다고 생각했는데.

![이미지](/assets/img/HowMakingMyOwnJavascriptFrontedFrameworkMovedMeAhead_2.png)

<div class="content-ad"></div>

코드를 확인한 후에 몇 가지 실수를 발견했어요. 몇 시간 동안 그것들을 고쳤고, 이제 시도할 준비가 되어 있어요.

두 번째 시도... 그리고 작동했어요. 아마 8시간 정도 걸렸는데, 내 프레임워크가 움직이기 시작했어요.

## 어떻게 나의 생각을 바꾸었나요

프레임워크를 만드는 것은 복잡한 작업이기 때문에, 고수준의 생각을 하게 되는 계기가 되죠.

<div class="content-ad"></div>

당신은 모든 것인 호환성, 속도, 확장성에 대해 고려해야 합니다. 그리고 이를 개발 과정 전반에 걸쳐 염두에 두어야 합니다.

만약 프레임워크를 만들기에 실패한다 해도, 당신은 DOM에 대해 새로운 이해를 얻고 자신의 지평을 넓히는 함수들을 탐험할 것입니다. 그것이 당신이 하는 다른 프로젝트들의 이점입니다.

마지막으로, 그리고 가장 중요한 것은 실행 중인 것을 보고 기쁨과 자부심을 느낍니다. 그런 느낌은 다른 어떤 것과도 비교할 수 없습니다.

도전에 참여할 준비가 되셨나요? 도전해 보는 것을 닆을 장려합니다.

<div class="content-ad"></div>
