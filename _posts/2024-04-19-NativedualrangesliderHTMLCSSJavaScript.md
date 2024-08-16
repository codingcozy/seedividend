---
title: "HTML, CSS, JavaScript로 Native dual range slider 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Native dual range slider  HTML, CSS , JavaScript"
link: "https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816"
isUpdated: true
---





듀얼 범위 슬라이더가 필요한 이유는 무엇일까요?
듀얼 범위 슬라이더는 우리가 어떤 것의 일부분을 선택해야 하는 상황에서 인기 있는 실용적인 해결책입니다. 예를 들어, "가격대가 일치하는 제품들을 보여주고 싶다"라고 할 때 사용할 수 있습니다.

아쉽게도 이 명확한 목적을 위해 사용할 수 있는 네이티브 HTML5 요소가 없습니다. 해결책을 제공하는 플러그인들이 있지만, 스스로 구현할 수 있는 방법이 있다면 항상 플러그인을 쓸 필요는 없죠.
이 튜토리얼에서는 HTML `input type="range" /`와 CSS를 사용하여 우리가 원하는 대로 보이도록 만들고, 바닐라 자바스크립트를 사용하여 올바르게 작동하도록 할 것입니다.

최종 결과물은 이렇게 보일 것입니다:

![image](https://miro.medium.com/v2/resize:fit:1194/1*xS4WSGC4UunAmR916RfR3g.gif)

<div class="content-ad"></div>

이제 처음부터 시작해 봅시다.
우리의 레인지 슬라이더가 CSS와 JS 없이 어떻게 보이는지는 다음 이미지에서 확인할 수 있어요.

![이미지](/assets/img/NativedualrangesliderHTMLCSS-JavaScript_1.png)

위 이미지는 우리의 초기 단계를 보여줍니다. 위 이미지에 나와 있는 HTML은 최종 HTML 버전이며, 여기에 제시되어 있어요.

이제 CSS를 사용하여 사용자 정의를 해보겠습니다.

<div class="content-ad"></div>

.range_container, .sliders_control, .form_control, input[type=”number”]는 자명한 선택기들이므로 설명할 필요가 없습니다.
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button은 입력 숫자 옆에 계속해서 위아래 화살표를 표시하는 용도로 사용됩니다.

input[type=range]::-webkit-slider-thumb 선택기는 썸을 원하는 대로 사용자 정의하는 데 사용됩니다.
-webkit-appearance: none;은 플랫폼별 스타일링 외관을 제거하고 우리가 원하는 대로 사용자 정의할 수 있도록 합니다. ::-moz-range-thumb 선택기는 Mozilla Firefox에서 외관 변경을 적용하는 데 사용됩니다.

가장 흥미로운 부분은 input[type=”range”] 선택기입니다.
먼저 외관: none;을 사용하여 플랫폼별 스타일링을 제거하고 자체 사용자 정의를 수행합니다.
position: absolute;은 두 개의 슬라이더가 서로 겹치도록 지시하고 두 개의 썸이 있는 슬라이더를 얻게 됩니다.
슬라이더 외관을 사용자 정의하기 위해 background-color가 사용되며, 이 속성은 JavaScript 사용자 정의에 사용됩니다.

그리고 주어진 HTML과 CSS로 다음 결과를 얻었습니다:

<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1200/1*qx9oEiYRSLw07ppzEmI-6g.gif" />

모든 것이 좋아 보이지만 아무것도 작동하지 않네요. :-)

이제 JavaScript를 추가해서 모든 것을 정리해야 합니다.

먼저 네 가지 컨트롤러를 가져왔어요: fromSlider, toSlider, fromInput, toInput.
fillSlider 함수가 먼저 호출됩니다. 이 함수는 초기에 썸 사이의 범위를 적절한 색상으로 채우고 각 슬라이더 이동 시에도 적절한 색상으로 채우는 데 사용됩니다. 함수 안에서 우리는 거리를 얻고 원하는 색으로 채색합니다. 슬라이더의 나머지 부분은 회색으로 채색됩니다.

<div class="content-ad"></div>

그 다음으로 setToggleAccessible이 호출됩니다. 이 함수는 toSlider 요소의 zIndex를 fromSlider의 zIndex보다 크게 설정하는 미션이 하나만 있습니다. 이 상황은 toSlider가 값을 0으로 이동하거나 toSlider의 초기 값이 0인 경우에만 발생합니다.
처음에 fromSlider가 더 강한 zIndex를 가지고 있으며 항상 toSlider를 가려야 하며 이는 원하는 동작입니다. 그러나 두 값이 모두 0일 때는 toSlider가 강해져야 하는 상황이 필요하며 다시 말해 toSlider 썸이 fromSlider 썸을 가리도록 해야 합니다.

마지막으로 각 컨트롤러에 모든 변경에 반응하는 리스너를 설정합니다. 모든 컨트롤러가 하는 것은 비슷합니다.
현재 값을 가져오고 현재 값으로 색상 슬라이더를 설정합니다. 또한 from 값이 to 값보다 커지지 않도록 조절하고 그 반대도 마찬가지입니다.

듀얼 슬라이더를 만드는 다양한 방법이 있지만, 이 방법은 이번에 흥미로웠습니다. 궁금한 점이 있으면 댓글란에 질문해 주세요. 다음 글까지 힘내세요.
