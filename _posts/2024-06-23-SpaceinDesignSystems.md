---
title: "디자인 시스템에서 공간 활용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-SpaceinDesignSystems_0.png"
date: 2024-06-23 14:20
ogImage:
  url: /assets/img/2024-06-23-SpaceinDesignSystems_0.png
tag: Tech
originalTitle: "Space in Design Systems"
link: "https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62"
isUpdated: true
---

## 기본 개념부터 공간을 의도적으로 적용하는 확장 컨셉으로

시스템의 시각적 언어에 대해 오래 전부터 Color, Type 및 Icons를 "Big 3"로 참조해왔습니다. 모든 UI 구성 요소 — 버튼부터 시작 — 는 이들과 함께 구축됩니다. 하지만 뭔가를 잊고 있었습니다. 공간, 우리의 최종 터전.

## 공간이 색에 미치는 영향

공간은 어디에나 존재합니다. CSS는 패딩, 마진, 절대 위치 지정의 좌측, 우측, 상단 및 하단과 같은 속성을 사용하여 객체를 분리합니다. 부트스트랩, Salesforce Lightning, Foundation, 이전 프로젝트 및 현재 프로젝트라는 다섯 개의 라이브러리에서, 이런 공간 속성이 색, 크기, 타입, 레이아웃 및 기타 속성 그룹에 비해 얼마나 자주 나타나는지 비교해보았습니다.

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

CSS에서 이미 결정 시스템을 제공하고 있는 영향(예:0으로 지정된 값 또는 투명 또는 자동과 같은 예약 용어)을 제거한 후, 공간 규칙은 색상을 제외하고 다른 모든 것보다 더 많이 나타났습니다. 다른 것들은 전혀 아니었습니다. 글꼴, 크기, 레이아웃 등이 가까이에 있었던 적도 없었습니다. 우리 라이브러리에는 공간에 내재된 복잡성이 너무 많이 포함되어 있습니다. 그랬다고 하지도 않아도 제품에 어디에큐브의 공간적 복잡성은 너무 많이 포함되어 있습니다ㅠ

## 공간은 우리를 나눕니다

공간은 디자인과 개발 사이의 "나는 이렇게 디자인했는데, 당신은 저렇게 만들었다"라는 격차를 대표합니다. 우리는 오랫동안 디자인에 뿌려진 빨간색 가이드 스펙을 슬퍼했습니다. 그것은 절대로 그렇게 할 가치가 없는 것 같았습니다. 그럼에도 불구하고 그것들은 우리 제품의 완성된 재료인 HTML의 박스 모델에 의해 정보 없이 여전히 지속됩니다.

비용이 막대합니다: 주석 달기, 번역하기, QA 중에 시각적으로 정제된 내용을 논의하기. 그 모든 작업... 여전히 충분하지 않은 것을 위해. 따라서 공간은 감정적인 대가를 냅니다.

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

## 공간 개념은 기본적이에요

디자인, 코드 및 대화를 통해 더 의도적인 공간 개념을 연결할 수 있어요. 하지만 그렇게 하지 않아요. 우리는 그냥 티셔츠 사이즈를 사용하고 하루를 마무리해요. 더 나은 방법이 있어요. 우리는 미래적 공간의 명확성을 향해 들이따, 눌렀다, 늘렸다, 쌓아가며 붉은 선이어터 붉은 얼굴의 분노를 대체할 수 있어요.

그런 의미에서, 시스템 작업에 공간을 적용할 때 제가 경험한 기본 원리, 확장된 어휘 및 추가 경험을 소개해드릴게요.

# 공간 기본 원리

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

## 그리드 ≠ 공간. 그리드는 컴포넌트이며, 공간을 활용합니다.

그리드는 열, 거터, 외부 여백 및 반응형 뉴안스에 대한 공간 결정이 풍부합니다. 팀은 사용자가 쉽게 페이지를 만들 수 있도록 미리 그리드를 사용합니다. 유감스럽게도, 그것이 종종 공간 대화가 종료되는 시점입니다.

그리드는 완전한 공간 시스템이 아닙니다. 그리드는 다른 모든 컴포넌트와 마찬가지로 공간을 활용하는 컴포넌트입니다. 그리드는 다른 느낌이 납니다. 보이지 않으며 빠르게 나오며 공간만 처리합니다. 그러나 공간은 그리드 이상입니다.

결론: 그리드를 활용하여 공간 규칙을 도입하지만 거기서 멈추지 마십시오. 그리드의 여백, 거터 및 열 값은 전체 컴포넌트 라이브러리에 깊게 섞인 더 깊은 공간 개념과 일치시킵니다.

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

## 기억에 남는 기본 숫자 선택하기 & 기대치 설정하기

팀은 다른 공간 값들을 기준으로 잡을 수 있는 기억에 남는 숫자를 선택합니다. 어떤 팀은 손가락으로 세는 방법에 따라 10진수를 선호합니다. 누군가는 2와 3의 도움이 되는 요인을 갖는 6진수를 사용하여 3, 4, 6, 8, 9, 12, 15, 16, 18, 21, 24, 32 등 다양한 숫자를 유연하게 사용하기도 했습니다. 너무 심각해지지 마세요!

저는 지금까지 다양한 시스템들이 16을 사용하는 것을 보았습니다. 이는 기본 글꼴 크기로서 좋은 선택입니다. 이는 모든 화면 해상도(320, 768, 1024)의 배수이며, 시작점보다 크고(32, 64, ...) 시작점보다 작은 요인(8, 4, 2)을 제공합니다.

요점: 기억에 남는 기본 숫자를 선택하여 공간 시스템의 범위를 설정하고 사용 방법에 대한 기대치를 제한하세요.

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

## 비선형적인 비율 조정 옵션

기존의 기반을 확립한 후에도 팀은 무작위 단계로 빠질 수 있습니다(12, 14, 18, 22, 24, 28, 30, 32, …). 이를 방지하기 위해 다른 사람들은 각 단계가 일정한 증분인 선형 척도(4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, …)를 사용합니다. 나에게는 어느 결과든 예측하기 어렵게 사용되며, 너무 가까운 선택지를 제공합니다. 언제 24 또는 28을 사용해야 할지 모르겠어요.

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_0.png)

대안은 비선형적입니다. 선택지로는 황금 비율, 모듈러 척도 또는 각 단계를 두배씩 증가시킬 수 있는 비슷한 기하급수가 있습니다. 기본부터 시작하여 작은 중지점(16, 8, 4, 2)과 큰 중지점(16, 32, 64, 그리고... 여기서 마무리)으로 갈 것입니다.

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

![Space in Design Systems](/assets/img/2024-06-23-SpaceinDesignSystems_1.png)

**요약:** 기하 급수나 유사하게 비선형적인 것을 고려해보세요. 16과 32 사이에 24를 추가하는 압박을 가끔 느낄 수 있습니다. 그러나 제 경험상 그러한 순간들은 드물고 간혹 그 간단한 시스템을 깰 정도로 정당화되는 경우는 거의 없습니다.

## 기억하기 쉽고 정확하게 재사용할 수 있도록 각 단계에 이름 지정하기

저는 Gmail의 Compact, Cozy, Comfortable 스페이스 토글을 좋아합니다. 그래서 우리의 공간 시스템을 만들 때 나는 우리의 작업에서 그 레이블을 사용하는 것을 제안했습니다. 곧바로 팀원 한 명이 나를 도전했습니다: "다른 단계를 뭐라고 부르면 좋을까?" 제 정찬, 작고, 그리고 호화로운 옵션들은 통과하지 못했습니다.

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

![SpaceinDesignSystems_2](/assets/img/2024-06-23-SpaceinDesignSystems_2.png)

우리가 항상 하는 것처럼, 티셔츠 사이즈 척도를 사용했어요. 중간 크기는 기본값에 해당하며, S, XS, L, XL 그리고 필요에 따라 XXS와 XXL도 다른 옵션입니다. 대부분의 라이브러리(Bootstrap, Lightning 등)에서도 이렇게 사용하고 있어요.

중요한 점은 이름 공간 옵션을 간단하게 유지하여, 사람들이 기억하고 정확히 적용할 수 있는 언어를 만들어내는 것이에요. 더 구체적인 라벨을 사용하려고 하면, 동료가 "작은 것, 중간 크기, 큰 것 중에서 선택해주세요." 라고 응답할 준비를 해야 해요.

많은 라이브러리를 검토하고 많은 디자이너들과 이야기를 나눠봤어요. 기본 숫자와 명명된 척도에 대한 간단한 관례가 대화의 종착점인 곳이었어요. 이 몇 가지 옵션은 간단하지만, 여전히 공간을 사용하는 데 있어서 약간 무작위한 느낌이 들었어요. 그래서 더 필요했어요.

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

# 공간을 위한 어휘 확장

우리의 최근 작업을 검토해 보면, 공간을 적용하는 명확한 의도는 많지 않습니다. 예를 들어, 제가 가장 좋아하는 컴포넌트인 카드를 살펴보겠습니다:

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_3.png)

프론트엔드 개발자로써, 저는 모든 요소 상자들을 시각화하여 요소를 서로 맞춰 보는 것을 상상합니다.

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

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_4.png)

카드는 우리가 사용하는 여러 공간 개념을 유용하게 보여줍니다: 가장자리에서 콘텐츠를 삽입, 삽입 모양을 다양화, 항목을 인라인으로 간격 지정하고 구성 요소 내부 및 사이에 항목을 쌓는 방법.

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_5.png)

이 개념들 - 삽입, 삽입 압축, 삽입 늘이기, 쌓기, 인라인, 그리드 - 은 우리 라이브러리의 대부분의 CSS 규칙을 다룹니다: 패딩, 마진, 왼쪽, 오른쪽, 위, 아래. 또한 이러한 개념들은 각 원자 별로 독립적이며, 합성성을 향상시킵니다.

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

## Concept 1: (Square) Inset

인셋은 벽에 걸린 사진의 매트처럼 모든 네 면에 들어가는 콘텐츠를 표시합니다. 이 사용법은 3개의 모듈과 블록 메시지 중간 느낌의 컴팩트한 피르, 혹은 넓은 푸터와 말머리 등 다양한 크기의 여러 컴포넌트들에서 퍼져 있습니다.

<img src="/assets/img/2024-06-23-SpaceinDesignSystems_6.png" />

말머리 클릭을 하여 더 읽기! 안 눌러미세요!

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

![Screenshot](/assets/img/2024-06-23-SpaceinDesignSystems_7.png)

## Concept 2: Squish Inset

A squished inset reduces space top and bottom, in our case by 50%. While less common than its squared counterpart, a squish occurred frequently in elements (like a button) and cell-like containers like a data table or list item.

![Screenshot](/assets/img/2024-06-23-SpaceinDesignSystems_8.png)

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

## 개념 3: 스트레치 인셋

버튼이나 피랍처럼 압축되는 것과 대조적으로, 우리는 텍스트 상자, 텍스트 영역 및 기타 양식 요소들의 인셋을 수직으로 늘렸습니다.

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_9.png)

## 개념 4: 스택

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

수평 스크롤 UI에 대한 존경을 표합니다. 압도적인 대다수는 수직으로 스크롤합니다. 이것은 한 가지를 의미합니다: 우리는 여러 가지를 쌓습니다. 메시지를 헤딩 위에 데이터 테이블에 쌓습니다. 레일즈에서 모듈을 쌓습니다. 카드 안에 총 데이터, 항목 및 도구 모두를 그리드에 각각 쌓습니다. 참나, 무한 스크롤은 무한하게 쌓이는 것을 의미합니다! 우리는 쌓고 쌓고 쌓습니다.

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_10.png)

## 컨셉트 5: 인라인

우리는 객체를 인라인으로 배열하기도 합니다. 흘러가는 것처럼 좌측 또는 우측에서 텍스트처럼 흘러가는 대로 포장합니다. 피맛으로, 태그, 경로, 그리고 더 많은 것과 같은 객체들은 독립적으로 서있을 수도 있고, 다른 객체들과 함께 쌓이고 섞일 수도 있습니다.

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

이미지 태그를 Markdown 형식으로 변경해보세요.

![SpaceinDesignSystems](/assets/img/2024-06-23-SpaceinDesignSystems_11.png)

## Concept 6: Grid

아, 격자를 마지막에 남겨두자구요? 간격이 안정화되면서, 격자 여백과 거터를 다시 살펴보게 되고, 이 공간들을 마법같은 시작점과 다른 용도에 맞춰 정렬합니다.

그래서, 카드 컴포넌트에 적용되는 경우, 스타일이 적용된 패딩과 여백은 다음과 같이 보일 수 있습니다:

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

# 배운 내용

공간 개념을 사용하는 것은 새로운 것에 적응해야 한다는 것을 의미합니다. 제 팀에서는 가볍게 회의적인 태도를 가진 사람들이 새로운 모델을 받아들이기까지 하루가 걸렸습니다.

## 시각적으로 공간 시스템 가르치기

대부분의 협력자들은 공간을 볼 수 없습니다. 이것이 임의로 적용되는 이유 중 하나입니다. 그러나 이제 우리는 시스템을 가지고 있습니다: 각각이 제한된 옵션 범위를 제공하는 제한된 개념 수.

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

![이미지](/assets/img/2024-06-23-SpaceinDesignSystems_12.png)

요점: 골격 다이어그램이나 치트 시트를 사용하여 공간 개념을 가르치세요. 이러한 참고 자료를 활용하면 디자인과 코드를 통해 개념을 이해하고 적용하며 유지하는 속도가 빨라집니다.

## 간단한 도우미 제공 및 사용 모니터링

어리석은 짓은 하지 마세요. 이 여섯 가지 모델이 모든 문제를 해결하는 것은 아닙니다. 때로는 여전히 여기 저기 여백을 조정해야 합니다. 그러므로 더 일반적인 대안(예: $space-m)을 사용하여 더 의도적인 공간 옵션을 따르는 것이 타당합니다.

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

요약: 일반적인 옵션을 제공하되, 절약해서 사용하고 제품 팀이 사용할 것을 기대합니다. 비판 또는 풀 리퀘스트에 나타나면, 인셋 또는 스택과 같은 더 구체적인 개념을 팀원들에게 교육하세요.

## 패딩이나 마진을 사용한 변수명 피하기

더 복잡한 것을 소개할 때, 다른 사람들이 이해할 만한 것을 옹호하는 것은 정당합니다. 예를 들어, "왜 변수명에 패딩과 마진을 사용할 수 없을까요?" 이 경우, 패딩을 사용한 2개 이상의 공간 개념이 있고, 이러한 개념은 좌우 속성을 통해도 적용할 수 있습니다. 마진은 스택, 그리드 및 공간 인라인에 사용됩니다. 게다가, HTML을 사용하지 않는 비웹 플랫폼은 어떻게 할까요?

요약: 속성 이름에서 개념을 분리하세요. 여러 개의 개념이 하나로 제한될 뿐만 아니라 특정 플랫폼에서만 재사용 가능합니다.

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

## 충돌을 체계적으로 해결하고 줄 간격 시스템

간단한 안쪽 여백과 스택 여백 규칙이 오랫동안 알려진 공간 적대 요소와 충돌하였습니다: 줄 높이입니다. 이 상호작용은 공간을 예측할 수 없게 증가시켜, 간단한 안쪽 기본값(16px) 위와 아래에 픽셀이 추가되었습니다.

![Space in Design Systems](/assets/img/2024-06-23-SpaceinDesignSystems_13.png)

그러나 우리는 아이디어의 발전을 따라가며 (@kevinmpowell의 “의사 요소를 사용하여 공간을 음수 여백하자! 그러나 얼마나?”) 일부 수학을 활용했습니다(내 대학 학위를 활용할 수 있게!). 결과적으로, 글꼴 크기와 줄 높이를 결합한 믹스인 공식이 타입 간격을 줄이고 충돌하는 객체 위와 아래의 공간을 축소시키는 것이었습니다.

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

포기하지 마세요. 예외 때문에 체계적인 명확성을 방치하지 마세요. 문제를 해결해 보세요. 이러한 세세한 사항을 극복할 수 있다면, CSS요령을 사용하여도 단순한 개념을 전달할 수 있다는 것을 기억하세요.

## 공간 개념 활용하여 밀도 조절하기

inset, stack 및 grid와 같은 개념을 사용하여 밀도 조절 다이얼을 섬세하게 조절할 수 있습니다. 저장소에서 관심 있는 inset 및 stack을 찾아 확장하거나 재정의하여 디스플레이 밀도를 섬세하게 조정하세요.

![SpaceinDesignSystems_14](/assets/img/2024-06-23-SpaceinDesignSystems_14.png)

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

요약: 약간 원시적인 옵션 세트로 심도를 조절할 수 있습니다. 이 옵션이 없으면 밀도 제어는 꿈일 뿐입니다. 그러나 이 옵션들이 있다면, 의도를 갖고 공간을 찾아 조정하고 조절할 수 있는 강력한 엔진을 점차적으로 구축할 수 있습니다. 이는 위험을 줄이고 클라이언트에게 좋은 의도를 갖고 디자인을 할 수 있게 해줍니다.

디자인 시스템을 준비하려는가요? 제품 및 플레이어에 대해 논의를 진행하려면? EightShapes는 시스템 계획 워크숍을 진행하고 디자인 시스템에 대해 고객을 코칭합니다. 얘기 나눠볼까요?
