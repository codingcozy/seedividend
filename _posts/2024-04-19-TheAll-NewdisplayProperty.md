---
title: "새롭게 변경된 display 속성 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "The All-New display Property"
link: "https://medium.com/javascript-in-plain-english/the-all-new-display-property-e8a41f7ac396"
isUpdated: true
---





![TheAll-NewdisplayProperty_0](/assets/img/TheAll-NewdisplayProperty_0.png)

Chrome 115부터 CSS display 속성에 여러 값이 존재합니다. display: flex는 display: block flex로, display: block은 display: block flow로 변경되었습니다. 이제 단일 값은 레거시로 간주되지만 역 호환성을 위해 브라우저에 유지되어 있습니다.

# 왜 이렇게 오랜 시간이 걸렸을까요?

간단하게 말해, 이것은 상자 모델과 같은 것들을 설명하는 방법을 바꿉니다. 명세는 여전히 CR 스냅샷이며, 이는 W3C가 구현자들로부터 경험을 수집하여 표준을 최종화하는 것을 의미합니다. 따라서 이 중 일부는 아직 변경될 수 있습니다.

<div class="content-ad"></div>

리워크 결과로 표시 유형이 두 부분으로 나뉩니다: 외부 표시 유형과 내부 표시 유형입니다.

외부 표시 유형은 주요 상자 자체가 흐름 레이아웃에 참여하는 방식을 지시합니다.

내부 표시 유형은 하위 상자가 배치되는 방식을 지시합니다(대체 요소를 제외하고 조금 더 복잡합니다).

따라서 display: flex가 display: block flex로 변경되어 외부 표시 유형이 block(외부에서 블록 요소로 작동)이 되지만 하위 요소들은 플렉스 레이아웃에 따라 렌더링됩니다.

<div class="content-ad"></div>

이 변경으로 인해 전과 같은 동작이지만, 이 변경으로 인해 자식 요소와 주변 요소에 대한 표시 속성의 영향에 대해 이야기할 수 있게 되었습니다. 내 의견으로는, 이러한 멘탈 모델은 더 예측 가능한 레이아웃을 만드는 데 도움이 되며, 다양한 레이아웃 모드와 그 효과를 설명하는 데 더 간단해집니다.

새로운 강의나 튜토리얼에서는 상자 모델에 대한 좋은 설명이 마진, 테두리, 안쪽 여백, 너비, 높이 뿐만 아니라 상자 크기 조정과 표시 속성도 다루어야 할 필요가 있습니다.

# display 속성의 유효한 값은 무엇인가요?

이미 언급한 바와 같이, 일부 예전 속성은 이제 레거시입니다. 여기 유효한 모든 속성이 있습니다:

<div class="content-ad"></div>

다중 값 구문 표시를 위한: outer-type inner-type valid 외부 유형은 block, inline 및 run-in입니다. 유효한 내부 표시 유형은 flow, flow-root, table, flex, grid 및 ruby입니다.

또한 유효한 단일 값들도 있습니다: list-item, contents 및 none.

게다가, CSS에는 유효한 내부 표시 값들이 몇 가지 있습니다. 이러한 값들은 table 또는 ruby 표시 유형을 사용할 때 계산될 것입니다.

다음의 조합들은 이제 고대로 간주됩니다: inline-block, inline-table, inline-flex 및 inline-grid. 이들은 그들의 다중 값 상당품, 예를 들어: display: inline flex로 대체될 수 있습니다.

<div class="content-ad"></div>

최신 버전의 모던 브라우저에서는 다중 값이 지원됩니다: [여기를 참고하세요](https://caniuse.com/mdn-css_properties_display_multi-keyword_values)

![이미지](/assets/img/TheAll-NewdisplayProperty_1.png)

여기까지입니다!
읽어 주셔서 정말 감사합니다!

# 간단히 정리

<div class="content-ad"></div>

저희 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해 주세요! 👏
- PlainEnglish.io에서 더 많은 콘텐츠를 찾아보세요! 🚀
- 무료 주간 뉴스레터를 구독하세요. 🗞️
- 트위터, 링크드인, 유튜브, 디스코드에서도 팔로우해 주세요.
