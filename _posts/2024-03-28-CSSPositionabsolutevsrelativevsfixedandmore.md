---
title: "CSS position absolute vs relative vs fixed 제대로 알고 사용하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "CSS  Position  absolute vs relative vs fixed and more"
link: "https://medium.com/@jaganjvvn/css-position-absolute-vs-relative-vs-fixed-and-more-642a9c2696b2"
isUpdated: true
---

CSS 위치 속성은 이름 그대로 요소가 웹 페이지 상에 어떻게 위치하는지를 정의합니다.

![이미지](/assets/img/CSSPositionabsolutevsrelativevsfixedandmore_0.png)

더 많은 내용은 https://www.w3schools.com/css/css_positioning.asp 에서 참고할 수 있어요.

CSS 위치 속성은 웹 페이지 상 요소들의 배치와 레이아웃을 조절하는 데 기본적입니다. 이를 통해 개발자들은 요소들을 정확히 배치하고, 서로 겹쳐 놓고, 복잡한 반응형 레이아웃을 만들 수 있어요. CSS의 주요 위치 속성에는 static, relative, absolute, fixed, sticky가 포함되어 있어요. 각 속성은 고유한 목적을 가지고 있으며 문서 흐름과 위치 지정의 맥락에서 다르게 작동합니다.

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

웹 디자인에서 각 위치 지정 기술은 레이아웃 및 동작 제어를 위해 다양한 장점을 제공하며 개발자들이 더 동적이고 반응형이며 상호작용적인 웹 페이지를 만들 수 있게 합니다.

- Sticky:

- 동작: Sticky는 사용자의 스크롤 위치에 따라 상대적인 위치와 고정된 위치 사이를 토글합니다. 특정 지점을 넘어서면 상대적으로 위치한 채로 유지되다가 일정 지점에 고정됩니다.
- 사용 사례: 페이지와 함께 스크롤되어 사라져야 하지만 특정 지점에 도달하면 고정되어 있어야 하는 요소에 유용하며, 스티키 헤더와 같은 요소에 적합합니다.

2. Fixed:

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

- 행동: 고정 요소는 뷰포트에 대해 위치가 고정되어 있어 페이지를 스크롤해도 항상 같은 곳에 남아 있습니다. 요소를 배치하는 데 top, right, bottom 및 left 속성을 사용합니다.
- 사용 사례: 페이지를 스크롤하는 동안 화면에 계속 나타나는 네비게이션 바나 버튼을 만들기에 이상적입니다.

3. Absolute:

- 행동: 절대 위치 지정된 요소는 문서 흐름에서 제거되어 가장 가까운 위치 지정된 조상(즉, static 이외의 위치를 가진 요소)에 대한 지정된 위치에 배치됩니다. 이러한 조상이 없는 경우에는 포함 블록이 초기 포함 블록입니다.
- 사용 사례: 다른 콘텐츠 위에 오버레이되어야 하는 드롭다운 메뉴나 모달을 만들기에 완벽합니다.

4. Relative:

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

- 동작: 상대적으로 위치 지정된 요소는 일단 일반 요소(정적 위치)처럼 배치됩니다. 그런 다음 상단, 오른쪽, 하단 및 왼쪽 값에 따라 자신에 대해 조정됩니다. 다른 콘텐츠는 요소가 남긴 빈 공간에 맞추어 조정되지 않습니다.
- 유스 케이스: 요소의 위치를 문서 흐름에서 일반적으로 있어야 하는 위치에서 약간 조정해야 할 때 또는 절대 위치 지정된 하위 요소에 대한 위치 설정 컨텍스트가 필요할 때 유용합니다.

5. 정적(static):

- 동작: 이것은 요소의 기본 위치입니다. 요소는 문서의 정상 흐름에 따라 위치가 지정됩니다. 상단, 오른쪽, 하단, 왼쪽 및 z-index 속성은 영향을 미치지 않습니다.
- 유스 케이스: 요소가 정적 문서 레이아웃 흐름을 따르도록 원할 때 사용합니다. 웹페이지의 대부분 요소들은 특별히 지정하지 않으면 정적입니다.

아래는 표로 설명된 주요 차이점입니다.

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

![CSS Positioning](/assets/img/CSSPositionabsolutevsrelativevsfixedandmore_1.png)

# 주요 차이점

- 참조 지점:
  - Absolute: 가장 가까운 위치 지정된 조상 요소에 대해 배치됨.
  - Relative: 문서 내의 일반적인 위치에 대해 배치됨.
  - Fixed: 뷰포트에 대해 배치됨.
- 문서 흐름 영향:
  - Absolute와 Fixed: 다른 요소의 레이아웃에 영향을 미치지 않음 (흐름에서 제외됨).
  - Relative: 시각적으로 이동되더라도 문서 흐름에 남아 있어 레이아웃에 영향을 줌.
- 스크롤링 동작:
  - Absolute와 Relative: 스크롤 시 페이지와 함께 이동함.
  - Fixed: 스크롤될 때도 뷰포트 내에서 동일한 위치에 남아 있음.

더 많은 기사를 보려면
제게 팔로우해 주세요.
Jagan Jonnala
감사합니다.
