---
title: "필수 CSS 인터뷰 질문 15선"
description: ""
coverImage: "/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_0.png"
date: 2024-06-22 03:44
ogImage: 
  url: /assets/img/2024-06-22-15EssentialCSSInterviewQuestions_0.png
tag: Tech
originalTitle: "15 Essential CSS Interview Questions"
link: "https://medium.com/dev-genius/15-essential-css-interview-questions-52622b4f6ef8"
isUpdated: true
---




<img src="/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_0.png" />

저희의 핵심 웹 개발 인터뷰 질문 시리즈에 다시 오신 것을 환영합니다! 지난 번에는 HTML에 대해 다뤘는데요, 놓치셨다면 링크를 확인해보세요:

이제 CSS로 들어가 봅시다 🎨 인터뷰를 위한 준비를 하거나 기술을 갱신하거나 CSS를 얼마나 잘 이해하는지 궁금하다면 이 블로그가 딱입니다.

이 블로그에서는 모든 웹 개발자가 알아야 할 주요 주제와 개념을 다뤄볼 것입니다. 이러한 질문은 지식을 테스트하고 CSS를 명확하게 설명할 수 있는지 확인하는 데 훌륭합니다.

<div class="content-ad"></div>

시작해봅시다! CSS에 대해 얼마나 알고 계신지 확인해보세요! 🚀

## 1. "id"와 "class"의 차이점

- Id: 고유한 요소를 식별하는 데 사용됩니다. 한 번 이상 사용할 수 없습니다. 재사용할 수 없습니다.
- Class: 페이지 내에서 여러 요소를 선택하는 데 사용됩니다.

예시: 웹사이트에 로고가 있다면 id를 사용할 것이지만, 동일한 스타일을 공유할 많은 글이 있다면 class를 사용할 것입니다.

<div class="content-ad"></div>

## 2. CSS에서 "id"와 "class"를 선택하는 방법

- Id: #으로 선택됩니다.
- Class: .으로 선택됩니다.

## 3. 텍스트의 글꼴을 변경할 수 있는 속성은 무엇인가요?

font-family

<div class="content-ad"></div>

## 4. 웹사이트의 배경을 변경하는 방법은 무엇인가요?

배경 또는 배경 이미지

## 5. 메뉴를 고정하는 데 사용해야 하는 속성은 무엇인가요?

position: fixed;

<div class="content-ad"></div>

예: 웹 사이트에서 스크롤하고 나서 내비게이션바에 "position: fixed;"를 적용하면 스크롤 양에 관계없이 페이지 상단에 고정됩니다.

## 6. 그림자를 추가할 수 있는 속성은 무엇인가요?

text-shadow 또는 box-shadow

## 7. inline, inline-block 및 block 간에는 어떤 차이가 있나요?

<div class="content-ad"></div>

- 인라인: 이 요소들은 새로운 줄 바꿈을 시작하지 않고 텍스트 라인 안에서 부드럽게 통합되며 필요한 너비만 차지합니다. 너비와 높이를 포함한 요소의 차원은 시각적으로 나타나지 않습니다.
- Inline-block: 인라인 요소와 유사하지만, 이 구성 요소들은 새로운 줄에서 시작하지 않고 너비와 높이 값을 명시적으로 설정할 수 있어 외형에 대한 더 많은 제어를 제공합니다.
- 블록: 대조적으로, 블록 요소는 새로운 줄에서 시작하고 전체 사용 가능한 너비를 채우도록 확장됩니다. 디자인 요구 사항에 맞게 너비와 높이 값을 조정하는 유연성을 제공합니다.

![이미지](/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_1.png)

## 8. 웹 사이트를 반응형으로 만들 수 있는 방법은 무엇인가요?

백분율 단위로 측정하고 미디어 쿼리를 사용함으로써 가능합니다.

<div class="content-ad"></div>

## 9. 이미지가 상자를 벗어나는 경우 제한하고 싶다면 어떻게 해야 하나요?

overflow: hidden

## 10. "visibility: hidden"과 "display: none"의 차이점을 설명해주세요.

- visibility: hidden: 요소를 숨기지만 웹 문서에서 공간을 차지하고 문서 레이아웃에 영향을 줍니다.
- display: none: 요소를 숨기지만 어떤 공간도 차지하지 않고 문서 레이아웃에 영향을 주지 않습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_2.png" />

## 11. Flexbox와 CSS 그리드의 차이:

내용을 구조화하는 방식이 다릅니다:

- Flexbox는 요소를 배치하는 그리드를 제공합니다.
- CSS 그리드는 좀 더 콜라주와 같은 느낌입니다.

<div class="content-ad"></div>

## 12. CSS 전처리기와 프레임워크의 차이:

- 전처리기: 코드 작성 속도를 높이기 위한 추가 기능을 제공합니다 (SASS).
- 프레임워크: 사전 정의된 디자인과 기능을 위해 태그와 클래스를 간단히 적용할 수 있는 미리 만들어진 요소를 제공합니다 (부트스트랩).

## 13. 레이어 관리 방법:

z-index 속성을 사용하여 레이어를 관리합니다. 이를 통해 한 레이어를 다른 레이어 앞이나 뒤로 나타낼 수 있습니다.

<div class="content-ad"></div>

## 14. Margin과 Padding의 차이:

- Margin은 외부 간격입니다.
- Padding은 내부 간격입니다.

![CSS Interview Questions](/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_3.png)

## 15. RGBA에서 A는 무엇을 의미합니까?

<div class="content-ad"></div>

RGBA 색 모델에서 "A"는 "알파"를 나타냅니다. 이 구성요소는 색상의 투명도 또는 불투명도 수준을 나타냅니다. 값이 0이면 완전히 투명하고, 값이 1이면 완전히 불투명합니다.

# 마무리

![image](/assets/img/2024-06-22-15EssentialCSSInterviewQuestions_4.png)

읽어 주셔서 감사합니다! 다른 유용한 질문이 있으면 댓글에 공유해 주세요. 함께 공부하고 면접을 위해 준비할 수 있도록 도와주세요 🤗

<div class="content-ad"></div>

저희의 다가오는 블로그를 기대해 주세요. JavaScript와 React에 관한 인터뷰 질문에 대해 자세히 다룰 예정이에요.

더 많은 통찰과 업계의 모범 사례를 위해 디스코드 커뮤니티에 가입하고 인스타그램을 팔로우해 주세요. 💬👥📢

DevOps, 웹 개발 및 기술 관련 주제에 대한 시각적 자습서와 심층적인 탐구를 원하신다면 ✨ YouTube 채널 ✨을 구독해 주세요.

즐거운 코딩하세요!  👩🏻‍💻👩🏼‍💻