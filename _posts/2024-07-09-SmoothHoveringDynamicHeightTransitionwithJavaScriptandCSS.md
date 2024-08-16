---
title: "JavaScript와 CSS로 매끄러운 호버 동적 높이 전환 방법"
description: ""
coverImage: "/assets/img/2024-07-09-SmoothHoveringDynamicHeightTransitionwithJavaScriptandCSS_0.png"
date: 2024-07-09 08:47
ogImage: 
  url: /assets/img/2024-07-09-SmoothHoveringDynamicHeightTransitionwithJavaScriptandCSS_0.png
tag: Tech
originalTitle: "Smooth “Hovering” Dynamic Height Transition with JavaScript and CSS"
link: "https://medium.com/@francismaria/smooth-hovering-dynamic-height-transition-with-javascript-and-css-3dee7c1acf6a"
isUpdated: true
---



![이미지](/assets/img/2024-07-09-SmoothHoveringDynamicHeightTransitionwithJavaScriptandCSS_0.png)

안녕하세요, 친애하는 독자 여러분! 오늘은 JavaScript와 CSS를 사용하여 다음 웹 애플리케이션에 멋진 높이 전환을 만드는 방법을 보여 드리겠습니다.

# 아이디어

프로그래머로서의 멋진 점 중 하나(많은 중요한 점 중에 하나!)은 여러분이 직접 응용 프로그램을 만들고 다양한 도구로 실험할 수 있다는 것입니다. 이렇게 함으로써 일반적으로 지나치고 실제로 어떻게 작동하는지와 구현에 필요한 노력을 깨닫지 못하는 웹사이트의 기본 기능을 배울 수 있습니다.

<div class="content-ad"></div>

내 개인 웹사이트를 구축하면서 확장 가능한 컨테이너 요소에 대한 아이디어가 떠올랐어요. 먼저 눈에 띄게 세부 내용을 숨기지만 호버링 시 동적으로 확장되어 추가 콘텐츠를 보여주는 동적 컨테이너를 만들기로 결정했거든요. 아래 모의 이미지처럼요.

![이미지](/assets/img/2024-07-09-SmoothHoveringDynamicHeightTransitionwithJavaScriptandCSS_1.png)

호버링 시 보이기/숨기기의 기능 요구 사항 외에도 멋진 효과가 있었으면 했어요. 이제 구체적인 아이디어가 생겼으니, 구현 세부 사항으로 넘어가봅시다!

# 호버 애니메이션

<div class="content-ad"></div>

사용자 동작으로 정의된 "호버링"은 컴포넌트를 "플로팅"/"마우스를 이동"하는 것을 의미합니다. CSS에는 사용자가 커서를 이용해 요소 위를 호버할 때 발생하는 가상 클래스인 hover가 있습니다. 이것은 우리 문제에 완벽한 자원처럼 보입니다. 그러나 요소의 높이가 동일하지 않습니다(다른 텍스트 길이는 요소의 높이에 직접적으로 영향을 미칠 수 있습니다) 그리고 CSS는 트랜지션을 트리거하도록 동적으로 요소의 높이를 계산하는 방법을 제공하지 않습니다(높이: 0 - auto는 트랜지션을 트리거하지 않습니다) 따라서 여기서 약간의 추가 도움을 위해 JavaScript를 사용해야 합니다. 다음은 이러한 단계를 요약한 것입니다:

- [CSS] 높이 트랜지션 정의
- [JavaScript] 호버된 요소의 높이 계산
- [JavaScript] 요소의 높이를 직접 업데이트하여 트랜지션 트리거

다음 코드 스니펫은 세부 컨테이너에 대한 높이별 트랜지션 CSS 코드를 제시합니다.

트랜지션 속성과 높이 속성을 대상으로하는 transition 속성 및 컨테이너가 접혀있을 때 섹션이 숨겨지고 텍스트가 다음 사용 가능한 요소들 위에 작성되는 것을 방지하기 위한 overflow: hidden 지시문에 유의해야 합니다.

<div class="content-ad"></div>

이제 CSS 코드를 적용했으니 JavaScript 구현을 확인하고 적절한 값으로 높이 전환을 트리거할 수 있는 방법을 알아봅시다.

여기서의 로직은 먼저 클래스 이름을 통해 전환 대상이 될 모든 기존 컨테이너 요소를 가져와야 하고, 그런 다음 각각에 대해 mouseenter 및 mouseleave 이벤트에 대한 리스너를 추가해야 합니다. 왜냐하면 우리는 컨테이너 세부 구성 요소가 호버 시 반응하고 확장되거나 축소되기를 원하기 때문입니다.

요소에 호버하는 경우 이벤트 리스너는 hoverHandler 함수를 호출하며, 현재 요소의 높이(clientHeight)가 0(숨겨진 상태)인지 확인한 뒤, 그렇지 않은 경우 적절한 높이 값(scrollHeight)을 직접 style.height 속성 값을 설정하여 CSS 전환 대상으로 확장시킵니다.

# 최종 결과

<div class="content-ad"></div>

아이디어를 완벽하게 구현한 CodePen이 아래에 제시되어 있습니다. 그리고 컨테이너의 높이가 부드럽게 확장되고 축소되는 방법을 보여줍니다.

# 확장성

이 솔루션은 React와 같은 다른 프레임워크로 손쉽게 확장할 수 있습니다. 아래에 나와 있는 대로 `div` 컨테이너에 설정된 이벤트 리스너용으로 onMouseEnter와 onMouseLeave 프롭스를 사용한 점에 주목해주세요.

이 코드가 제대로 작동하려면 CSS 코드를 애플리케이션에 포함해야 합니다.

<div class="content-ad"></div>

# 결론

이 글이 유용했기를 바라며, 다음 프론트엔드 프로젝트에 적용해보시기를 바랍니다. 자세한 내용 및 이 글에서 사용된 다양한 개념에 대한 작성자들의 참고 자료는 아래를 참조해주세요. 다음에 또 뵙겠습니다! :)

# 참고 자료

- https://stackoverflow.com/a/44468310/8880170
- https://stackoverflow.com/questions/68881229/css-transition-doesnt-work-on-height-property
- https://stackoverflow.com/a/56763801
- https://medium.com/@clairecodes/how-to-embed-codepens-in-blog-posts-on-dev-to-and-medium-a9ad8577a6d1
