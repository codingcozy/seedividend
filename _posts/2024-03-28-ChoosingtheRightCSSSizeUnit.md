---
title: "상황에 맞는 올바른 CSS 단위 선택하는 방법px, , em, rem, vh, vw"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Choosing the Right CSS Size Unit"
link: "https://medium.com/@rashmipatil24/css-size-unit-d1e2abb334d7"
isUpdated: true
---

## 픽셀로 노는 중

px, %, em, rem, vh, vw 등을 언제 사용해야 하는지 헷갈리시나요? 그렇다면 걱정하지 마세요! 이 블로그에서는 CSS 사이즈 단위를 깊이있게 살펴보며 그 의미와 각각의 사용 시점, 그리고 서로 간의 관계를 탐구해볼 거에요. 이 블로그를 끝까지 읽으면 CSS 사이즈 단위에 대한 튼튼한 이해력을 갖게 되어 프로젝트에 적합한 단위를 자신있게 선택할 수 있을 거예요.

![Choosing the Right CSS Size Unit](/assets/img/ChoosingtheRightCSSSizeUnit_0.png)

# CSS 사이즈 단위란?

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

CSS 크기 단위는 웹페이지의 요소들의 크기를 지정하는 데 사용됩니다. 이는 요소의 너비, 높이, 안쪽 여백, 바깥 여백, 글꼴 크기 등이 얼마나 크거나 작아야 하는지 결정합니다. CSS 크기 단위에는 여러 종류가 있으며, 각각의 특징과 사용 사례가 있습니다.

## 픽셀 (px):

하나의 픽셀은 화면상의 하나의 점을 나타냅니다. 화면 해상도에 대한 고정된 측정 값을 제공하여 장치 간 일관된 렌더링을 보장합니다.

사용 시기: 픽셀은 요소의 크기를 정확하게 제어해야 하거나 고정폭 레이아웃을 디자인할 때 사용합니다. 예를 들어, 사이드바의 너비나 이미지 크기를 설정할 때 사용됩니다.

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

## 백분율 (%):

백분율은 부모 요소의 크기에 따라 조절되는 상대적인 단위입니다. 이들은 유연성을 제공하여 요소가 다양한 화면 크기와 해상도에 적응할 수 있게 합니다.

사용할 때: 뷰포트 크기나 부모 컨테이너의 크기에 따라 동적으로 조정되는 유동 레이아웃을 만들 때 백분율을 사용하세요. 예를 들어, div의 너비를 부모 컨테이너의 너비의 절반을 차지하도록 설정하기 위해 div의 너비를 50%로 설정합니다.

## em & rem:

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

"em" 단위는 요소의 부모의 글꼴 크기에 상대적입니다. 1em 단위는 요소 자체의 글꼴 크기와 동일합니다. 예를 들어, 요소의 글꼴 크기가 2em으로 설정되면 부모의 글꼴 크기의 두 배가 됩니다. em 단위는 확장 가능하고 접근성 있는 디자인을 만드는 데 유용합니다.

"em"과 유사하게, "rem" 단위는 루트 (html) 글꼴 크기에 상대적입니다. 따라서 하나의 "rem"은 루트 요소의 글꼴 크기와 같습니다. rem 단위는 문서 전체에 일관된 참조 지점을 제공하여 스타일을 간단히합니다.

사용 시기: 글꼴 크기, 여백, 안쪽 여백 및 기타 간격 관련 속성 정의를 위해 em 및 rem 단위를 사용하세요. 특히 서로 다른 기기 및 화면 크기에서 일관된 수직 리듬을 유지하고 접근성을 보장하는 데 유용합니다.

## 뷰포트 너비 (vw) 및 뷰포트 높이 (vh):

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

뷰포트 너비(vw)와 뷰포트 높이(vh)는 뷰포트 크기를 기준으로 한 상대적인 단위입니다. 뷰포트는 브라우저 창 내 웹 페이지의 보이는 영역을 의미합니다. 하나의 뷰포트 너비 단위(1vw)는 뷰포트 너비의 1%에 해당하며, 하나의 뷰포트 높이 단위(1vh)는 뷰포트 높이의 1%에 해당합니다. 이를 통해 디자이너들은 화면 크기에 적응하는 레이아웃을 생성하여 다양한 기기에서 최적의 시각적 경험을 제공할 수 있습니다.

언제 사용해야 하는지: vw와 vh 단위는 헤로 섹션 또는 배경 이미지와 같은 전체 화면 요소를 생성하고, 그 크기를 뷰포트 크기에 비례하여 조정해야 할 때 사용합니다.

아래 가이드는 엘리먼트 또는 섹션 스타일링에 적합한 크기 단위를 선택하는 빠른 참고용 가이드를 제공합니다.

너비/높이 → 백분율 (%)
여백/패딩 → 픽셀 (px) 또는 백분율 (%)
글꼴 크기 → 픽셀 (px), Em (em), 또는 Rem (rem)
테두리 너비 → 픽셀 (px)
뷰포트 기반 크기 조정 → 뷰포트 너비 (vw) 또는 뷰포트 높이 (vh)
컨테이너/레이아웃 → 백분율 (%), 뷰포트 너비 (vw), 뷰포트 높이 (vh)
이미지 → 픽셀 (px), 백분율 (%)

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

CSS 크기 단위를 이해하는 것은 요소 크기를 정밀하게 제어하기 위해 중요합니다. 이를 통해 다양한 디바이스와 화면 크기 사이의 호환성을 보장할 수 있습니다. 이는 개발자가 반응형 레이아웃을 만들고 사용자 선호도를 수용하며 접근성을 향상시킬 수 있게 합니다. 적절한 단위를 선택하면 디자인 유연성과 가용성이 최적화되어 전체 웹사이트의 사용자 경험을 향상시킬 수 있습니다. 다양한 단위로 실험하고 연습해보며, 더 깊은 이해를 위해 추가 탐구를 망설이지 마세요! 웹 개발에서 창의성을 발휘해보세요!

웹 개발의 멋진 세계에 대한 더 많은 통찰력을 기다려주세요. 즐거운 코딩 되세요!
