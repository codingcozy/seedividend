---
title: "Position Sticky 문제 해결하기 Overflow Clip으로 Overflow Hidden 문제 해결하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-OvercomingPositionStickyIssuesSolvingOverflowHiddenProblemswithOverflowClip_0.png"
date: 2024-06-22 15:33
ogImage:
  url: /assets/img/2024-06-22-OvercomingPositionStickyIssuesSolvingOverflowHiddenProblemswithOverflowClip_0.png
tag: Tech
originalTitle: "Overcoming Position Sticky Issues: Solving Overflow Hidden Problems with Overflow Clip"
link: "https://medium.com/@ehsaneona/overcoming-position-sticky-issues-solving-overflow-hidden-problems-with-overflow-clip-e8e79a7b0c34"
isUpdated: true
---

<img src="/assets/img/2024-06-22-OvercomingPositionStickyIssuesSolvingOverflowHiddenProblemswithOverflowClip_0.png" />

Position sticky는 특정 스크롤 위치에 도달했을 때 요소가 뷰포트에 "붙어 있는" CSS 위치 지정 속성입니다. 그러나 CSS overflow 속성과 호환되지 않아 종종 "overflow: hidden"을 사용하는 상황에서 문제가 발생합니다. 이로 인해 요소가 "붙어 있지 않고" 대신 "고정된 것처럼" 행동할 수 있습니다. 그러나 이 문제를 해결하는 방법이 있습니다. 대신 "overflow: clip"을 사용하는 것입니다.

이 문제에 대한 자세한 내용과 "overflow: clip"이 어떻게 문제를 해결하는 데 도움이 되는지 살펴보겠습니다.

Position sticky: 간단한 개요

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우선, position: sticky가 무엇을 하는지 간략히 살펴봅시다. 요소에 position: sticky를 적용하면 일정 지점을 스크롤하면 "sticky"가 됩니다. 이로써 요소가 화면 내에 계속 보이게 할 수 있고, 지나치게 스크롤했을 때에도 그대로 보이게 됩니다. 사용자가 웹 사이트를 스크롤하는 동안 계속 보이게 하고 싶은 내비게이션 바, 헤더 및 기타 요소를 만들 때 유용한 속성입니다.

overflow: hidden 문제점

position: sticky를 사용할 때, CSS overflow 속성을 "hidden" 값과 함께 사용하면 제대로 작동하지 않을 수 있습니다. 이는 “overflow: hidden”이 요소에 새로운 블록 형식화 컨텍스트를 만들기 때문입니다. 이것은 요소의 크기와 위치를 제한하는 컨테이너로 작용하므로 자식 요소의 크기와 위치에 영향을 줍니다.

position: sticky가 적용된 요소가 "overflow: hidden" 속성이 적용된 요소 내에 있을 때, 요소는 뷰포트에 대한 위치를 더 이상 알 수 없어 "붙지" 못하는 현상이 발생합니다. 대신, 스크롤하면 화면에서 고정된 위치에 남아 있게 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

해결책: overflow: clip

좋은 소식은 이 문제에 대한 간단한 해결책이 있다는 것입니다. “overflow: hidden” 대신에 “overflow: clip”을 사용할 수 있습니다. 이 속성 값은 요소의 콘텐츠를 클립하여 보여주는 방식에서 “overflow: hidden”과 유사하지만 새로운 블록 서식 맥락을 만들지 않습니다. 즉, “overflow: clip”이 적용된 요소 안의 요소들은 “overflow: hidden”과 같은 방식으로 영향을 받지 않습니다.

“overflow: hidden” 대신에 “overflow: clip”을 사용함으로써 position: sticky가 있는 요소가 기대한 대로 작동하도록 할 수 있습니다. 스크롤하면 해당 요소들이 뷰포트에 고정되는 것을 확인할 수 있습니다.

결론

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

요약하자면, `position: sticky`는 사용자가 웹사이트를 스크롤할 때 요소가 뷰포트에 "붙는" 유용한 CSS 속성입니다. 그러나 "overflow: hidden"과 함께 사용할 때 예상치 못한 동작을 일으켜 요소가 제대로 고정되지 못하는 상황이 발생할 수 있습니다. 이 문제를 해결하려면 대신에 "overflow: clip"을 사용할 수 있습니다. 새로운 블록 포맷팅 컨텍스트를 생성하지 않고 요소의 콘텐츠를 클립하는 기능을 제공합니다. 이렇게 하면 `position: sticky`가 있는 요소가 예상대로 작동하고 사용자가 그 요소를 스크롤하면 계속 가시적으로 유지됩니다.
