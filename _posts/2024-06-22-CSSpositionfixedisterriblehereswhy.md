---
title: "CSS position fixed가 문제인 3가지 이유"
description: ""
coverImage: "/assets/img/2024-06-22-CSSpositionfixedisterriblehereswhy_0.png"
date: 2024-06-22 03:40
ogImage: 
  url: /assets/img/2024-06-22-CSSpositionfixedisterriblehereswhy_0.png
tag: Tech
originalTitle: "CSS position: fixed is terrible, here’s why"
link: "https://medium.com/@decketts/css-position-fixed-is-terrible-heres-why-a9b0a87bf154"
---


## 자바스크립트 UI - 개발 블로그 #4

![이미지](/assets/img/2024-06-22-CSSpositionfixedisterriblehereswhy_0.png)

## 소개

HTML과 CSS는 근본적인 문제를 해결하기보다 예외 사항을 도입하는 경향이 있습니다. 특히 position 속성과 특히 position: fixed는 그 증거입니다. 이런 언어들이 계속해서 개념, 규칙 및 규례를 만들어 내지만 더 많은 이상한 행동과 일관성이 내가 셀 수 있는 것보다 더 많이 있어서 이해하기 어렵습니다.

<div class="content-ad"></div>

그게 무슨 뜻이지?

## 규칙

당신이 뷰 트리의 가장 기본적인 규칙을 직관적으로 이해하려면 로켓 과학자가 되어있을 필요는 없어요:

- 우리 코드의 트리는 뷰 트리와 똑같이 보여야 해요 (한숨)
- 각 뷰는 유일하며 트리에 한 번만 나타날 수 있어요
- 각 뷰는 정확히 하나의 부모를 가지고 있어요. 루트는 부모가 없어요
- 뷰는 0개 이상의 자식을 가질 수 있어요
- 나중에 정의된 뷰가 일찍 정의된 뷰 위에 나타나요

<div class="content-ad"></div>

이것은 직관적이고 명확하며 간단합니다. 위치:고정을 입력하세요.

## 위치: 고정의 엉망인 디자인

HTML에는 우리의 계층 구조를 정의하는 방법에 대한 특정한 엄격함이 있으며 이는 올바른 레이아웃/사용자 인터페이스 개념을 근본적으로 훼손합니다. 이를 해결하기 위해 CSS가 개입해 HTML에 패치를 적용해야 했고, 결과적으로 레이아웃 구축과 관련하여 더 많은 문제가 발생했습니다. 이 예제를 살펴보세요. 이 스니펫은 화면에 어떻게 보일까요?

```js
<body>
  <div id="fixed_1" style="position: fixed">
    <div id="fixed_2" style="position: fixed"></div>
  </div>
  <div id="regular"></div>
</body>
```  

<div class="content-ad"></div>

fixed_1은 일반적인 흐름에서 벗어나 뷰포트에 대해 상대적으로 배치되어 부모가 변경됩니다. fixed_2도 동일하지만 시각적으로 fixed_1의 자식이 아닌 형제가 되었습니다 (fixed_1은 fixed_1을 자르거나 스크롤할 수 없습니다). 더불어 (위치상의) 그들은 정해진 것보다 뒤에 정의되었다는 사실에도 불구하고 일반적인 것 위에 나타납니다. 그리고 웹 전문가들이 의미론적으로 생각하는 것입니다.

수백 페이지의 명세서를 쓰고, 끝없는 예외, 이상한 새로운 개념, 쌓임 맥락, 포함 블록을 도입하고 CSS가 가파른 학습 곡선을 가지고 있다고 말해도, 결과는 여전히 대참사일 것입니다. 심지어 하나의 요소에 position: fixed를 추가하면, 앞서 정의한 다섯 가지 규칙을 근본적으로 어길 것입니다 (오히려 이것은 내 규칙이 아니라 HTML과 CSS의 핵심입니다). 이 모든 것은 HTML이 뷰포트에 뷰를 직접 추가하는 것을 허용하지 않기 때문입니다.

## 해결책

HTML 가르침을 잠시 내려놓고 이 코드 조각을 살펴보시기 바랍니다:

<div class="content-ad"></div>

```js
<viewport>
  <html>
    <body>
      <div id="regular">웹 사이트의 본문</div>
    </body>
  </html>
  <div id="fixed_1">고정입니다</div>
  <div id="fixed_2">여기도 고정입니다</div>
</viewport>
```

이것은 명백히 유효하지 않은 HTML이지만 매우 가깝습니다. 이전에 정의한 다섯 가지 규칙을 모두 준수하며 고정 위치를 필요로하지 않습니다. 사실, 위치 속성조차 필요하지 않습니다. 뷰를 소유한 곳에 두어 뷰 계층 구조가 명확합니다. 무작정 특정 예외를 생성하는 대신 자체 규칙을 이해함으로써 더 적은 노력으로 더 많은 것을 달성할 수 있습니다.

안타깝게도 브라우저에서 뷰 트리의 루트는 이보다 훨씬 복잡합니다. 실제 viewport는 직접 접근할 수 없으며 `html`은 viewport도 아니고 viewport의 첫 번째 자식조차 아닙니다. 실제 트리는 다음과 같이 더 복잡합니다:

```js
window //object
  screen //object, window의 상위
  viewport //object, 접근 불가, 루트 뷰여야 함
    #document //node, 실제 루트 뷰
      #doctype //node
      <html> //"root" element
        <head> //보이지 않는 요소 (메타데이터)
        <body>  //"root" element
          <div> //요소 (고정), viewport의 직접 자식이어야 함
          <div> //요소 (일반)
```

<div class="content-ad"></div>

절대 아름다워요.

## JavaScriptUI는 어떻게 작동하나요

JavaScriptUI에서는 position: fixed를 사용할 필요가 없습니다. 사실 position 속성 전체가 불필요합니다. 대신에 적절한 뷰 계층 구조와 직관적인 컨테이너가 있습니다 (사실 display 속성도 제거되었지만, 이 부분은 다른 설치에서 다룰 예정입니다). 당신이 작성한 대로 결과가 나옵니다.

이것은 정확히 같은 예제이지만 엉망과 혼란이 없습니다:

<div class="content-ad"></div>

```js
App(
  Stack(
    Text("웹 사이트의 본문입니다.")
  ),
  Text("고정입니다."),
  Text("또 다른 고정입니다.")
);
```

다시 말씀드리지만, 이 코드는 유효한 JavaScript 코드입니다. 단일 라이브러리에 의존하고 있습니다. 여전히 레거시 혼란이 유효한지 생각하시나요?

## 하지만, 그게 왜 중요한가요?

알겠어요. 이건 단 하나의 속성일 뿐이고 누가 신경 쓸까요, 맞죠? 제가 전하는 포인트는 HTML과 CSS가 이러한 성가신 문제에 침통해 있으며, 프로젝트가 확장될수록 이러한 문제들이 얼마나 많은 압박을 가하는지 심지어 인지하지 못할 수 있을 것이라는 것입니다. 오버레이, 팝업, 문서 내 다른 레이어가 필요한 경우 이 문제를 마주치게 될 것이며, CSS 코드를 부풀려 HTML 계층 구조를 엉망으로 만들며 혼란을 증가시키고 접근성을 해치고 반응성을 부정적으로 영향을 미칠 것입니다.

<div class="content-ad"></div>

## 마무리

이번 포스트는 짧았지만 여전히 도움이 된다면 좋겠습니다. 다음 주에는 더 많은 CSS 속성 및 값에 대해 알아보고 사용하기 좋은 추상화를 구축할 것입니다.

만약 이 프로젝트가 마음에 든다면 박수 치거나 댓글을 남기고 다른 사람들과 이 블로그를 공유해주세요.

감사합니다, 즐거운 시간 보내세요!

<div class="content-ad"></div>

⬅️ DevBlog #3 — CSS를 대체하기 위한 새로운 스타일 시스템 설계