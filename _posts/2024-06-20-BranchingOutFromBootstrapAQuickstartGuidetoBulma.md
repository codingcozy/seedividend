---
title: "부트스트랩을 벗어나는 방법 불마를 위한 빠른 시작 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_0.png"
date: 2024-06-20 03:15
ogImage:
  url: /assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_0.png
tag: Tech
originalTitle: "Branching Out From Bootstrap: A Quickstart Guide to Bulma"
link: "https://medium.com/@laurawatersalston/branching-out-from-bootstrap-a-quickstart-guide-to-bulma-eaa9950ab3e1"
isUpdated: true
---

마치 중고차 판매원이 되는 것 같지 않지만, CSS 프레임워크에는 다양한 옵션이 있습니다. 무엇이 가장 예쁘고 사용하기 쉬운 프레임워크이며 전체적으로 어떤 보상을 줄 수 있는지에 대해 다양한 의견이 있습니다.

Bootstrap에서 편안함을 느끼고 있지만 Bulma 문서를 한 번 보고 무엇인가 궁금하다고 생각한다면, 이 기사를 참고해보세요. Bulma에 대한 간단한 개요를 통해 탐험 여정을 시작할 수 있습니다.

## 열 구조

Bulma는 반응형 열 구조를 만들기 위해 Flexbox를 활용합니다. 기본 설정은 12개의 균일한 열이지만 사용자는 이 숫자를 쉽게 조정하거나 개별 열의 크기를 맞출 수 있습니다. 화면 폭의 절반을 차지하도록 단일 열을 만들려면 클래스 is-half를 추가하면 됩니다. 다른 열은 자동으로 나머지 공간을 채우게 됩니다. 이 예에서 동일한 효과를 만드는 다른 방법은 요소에 클래스 is-6를 추가하는 것입니다. 그 요소는 12개의 균일한 열 중 6개(전체 화면 폭의 절반)을 차지하게 됩니다.

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

![Offset](/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_0.png)

## Offset

특정 열 요소의 오프셋을 만들려면, 대상 주변의 여백을 자동으로 채울 빈 열을 생성하거나 오프셋 수정자를 사용할 수 있습니다. 다음은 어떻게 보이는지에 대한 예시입니다:

![Offset Example](/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_1.png)

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

## 모바일 반응성

기본적으로 Bulma 컬럼은 모바일 장치에서 쌓이게 됩니다. 그러나 모바일 장치에서 기존의 컬럼 구조가 유지되길 원한다면 간단히 컬럼 컨테이너에 is-mobile 수정자를 추가해주시면 됩니다.

## 브레이크포인트

모든 장치 유형에 대해 컬럼을 사용한다면, 컬럼 요소에 대해 브레이크포인트를 정의할 수 있습니다. 컬럼 크기나 스팬을 조정하는 것과 유사하게 뷰포트 크기(모바일, 태블릿 또는 데스크톱)를 끝에 추가해주시면 됩니다. 예를 들어, 사진에 적용된 컬럼 스팬을 살펴보겠습니다:

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

<div class="columns">
  <div id=”popsiclePhoto” class="column
   is-4-desktop is-6-tablet is-8-mobile/>

<img src="/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_2.png" />

<img src="/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_3.png" />

<img src="/assets/img/2024-06-20-BranchingOutFromBootstrapAQuickstartGuidetoBulma_4.png" />

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

## 컬럼 갭

Bulma에서는 갭을 컬럼 갭이라고 합니다. Bulma 컬럼 갭의 기본 값은 0.75rem이지만 is-gapless를 사용하여 제거하거나 is-0부터 is-8 중 하나를 사용하여 사용자 정의 할 수 있습니다. 기본값은 is-3입니다.

## 기타 스타일링 도구

한 컬럼 컨테이너 안에 여러 줄의 컬럼을 저장하려면 columns 클래스 내에서 is-multiline 수정자를 사용할 수 있습니다. 높이가 다른 컬럼을 수직으로 정렬하려면 columns 컨테이너에 is-vcentered를 추가하십시오. Offset 섹션에서 다룬 방법을 사용하지 않고 컬럼을 수평으로 쉽게 가운데로 정렬하려면 부모 컬럼 요소에 is-centered를 추가하십시오.

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

## 추가 문서

이 글이 Bulma의 구조 기초를 이해하는 데 도움이 되셨으면 좋겠습니다. 더 자세한 정보는 Bulma 웹사이트(https://bulma.io/)를 참조하시기 바랍니다.

행운을 빕니다! 코딩 즐기세요!
