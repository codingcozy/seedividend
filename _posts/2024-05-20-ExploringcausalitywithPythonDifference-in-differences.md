---
title: "파이썬으로 인과 관계 탐색하기 차이인차이법"
description: ""
coverImage: "/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_0.png"
date: 2024-05-20 21:55
ogImage:
  url: /assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_0.png
tag: Tech
originalTitle: "Exploring causality with Python. Difference-in-differences"
link: "https://medium.com/towards-data-science/exploring-causality-in-python-difference-in-differences-90179fe71e62"
isUpdated: true
---

<img src="/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_0.png" />

인과 관계를 확립하는 것은 현대 분석에서 가장 중요하면서 종종 간과되는 영역 중 하나입니다. 저는 다가오는 시리즈의 기사에서 우리의 인과 추론 워크샵에서 가장 많이 사용되는 도구를 설명하고 강조하고 싶습니다.

# 인과 추론 101

인과 추론을 정의하는 것부터 시작해봅시다. 저는 Scott Cunningham의 "믹스테잎" 책에서 가져온 정의를 사용할 것입니다.

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

그는 그것을 특정 결과에 대한 사건과 선택의 영향을 추정하는 연구로 정의합니다. 우리는 변수 간의 인과 관계를 수립하려고 노력합니다 (우리는 이들을 처리와 효과라고 부를 수 있습니다). 이는 비즈니스부터 공공 정책 설정까지 다양한 영역에서 널리 발생하는 문제입니다.

일반적으로 인과성 파악 프레임워크의 설정은 상대적으로 간단하며 다음으로 구성됩니다:

- 처리군 — 처리를 받는 그룹
- 대조군 — 처리 효과를 평가하기 위한 기준으로 삼으려는 그룹
- 처리 — 분석하고자 하는 처리에 직접적으로 관련된 모든 활동
- 관심 결과

이 설정은 이론적인 개념뿐만 아니라 광범위한 실제 시나리오에 적용할 수 있는 실용적인 도구입니다. 웹사이트 최적화부터 A/B 테스트, 약물 임상 실험부터 개발 프로그램의 효과 추정에 이르기까지, 인과 추론의 응용 분야는 광범위하고 다양합니다.

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

우리가 인과 효과를 확인하기 위해 충족시켜야 하는 조건을 고려해 봅시다. 먼저, 우리는 처리 그룹과 대조 그룹이 비교 가능하다고 가정해야 합니다. 두 그룹은 처리를 받았을 때와 받지 않았을 때 동일하게 행동해야 합니다. 예를 들어, 처리 그룹의 객체는 처리를 받지 않았을 경우 대조 그룹의 객체와 동일하게 행동해야 합니다.

그 반대도 마찬가지입니다. 대조 그룹의 객체는 처리를 받았을 경우 처리 그룹의 객체와 동일하게 행동해야 합니다. 그러므로 두 그룹 간의 유일한 차이점은 처리에서만 나와야 합니다. 처리 그룹의 결과를 대조 그룹의 결과와 비교하여 우리는 처리 효과를 확인할 수 있습니다.

대조 그룹은 비교뿐만 아니라 처리 그룹의 대체불능을 제시합니다. 이것은 주어진 처리에 노출되지 않았을 때 전자가 어떻게 행동했을지를 보여줍니다. 이것은 인과 효과를 확인하는 데 대조 그룹의 중요한 역할을 강조합니다.

두 그룹이 비슷하다는 가정은 강력하며 가용 데이터와 연구 설계에 따라 달라집니다. 이러한 비교 가능성을 달성하는 것이 인과 추론의 중요한 과제입니다.

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

# 가짜 — 실험

어떻게 그러한 조건들을 얻을 수 있을까요? 인과 관계 주제를 다루는 대부분의 논문은 무작위 실험이 인과 관계를 확립하는 데 있어 황금 표준이라는 개념으로 시작합니다. 그러나 이러한 실험은 종종 실현 가능하거나 실용적으로 수행하기 어려울 수 있습니다.

그래서 우리는 계속해서 우리가 인과 관계를 찾는 데 도움이 되는 도구를 찾고 있습니다. 이 문제에 대처하는 연구 방법을 가짜 실험이라고 부릅니다.

본 문서의 나머지 부분에서는 가장 중요하고 자주 사용되는 가짜 실험적 방법 중 하나인 차이 차이 방법에 초점을 맞출 것입니다.

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

# 최저 임금 연구

이 방법을 고전적인 응용 분야에서 설명하겠습니다. 이 접근 방식을 이해하기 위해 Card와 Kruger의 유명한 최저 임금 연구를 살펴보겠습니다.

최저 임금이 고용에 미치는 영향은 경제학과 공공 정책 분야에서 가장 뜨거운 논쟁 중 하나입니다. 이 연구의 저자들은 이 질문에 대한 답을 찾으려고 했습니다. 이러한 유형의 문제는 무작위 실험을 사용하여 설명할 수 없는 사례의 완벽한 예입니다. 특정 그룹이나 지역을 서로 다른 최저 임금 수준에 무작위로 할당하는 것은 사실상 불가능합니다.

1992년, 뉴저지는 최저 임금을 시간당 4.25달러에서 5.05달러로 인상했습니다. Card와 Kruger는 뉴저지를 비교할 기준을 찾고 있었습니다.

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

연구자들은 뉴저지와 펜실베이니아의 고용 수준을 비교하기로 결정했습니다. 전자 주가 대조군 역할을 하는 것으로 선택되었습니다. 뉴저지와 지리적, 경제적 조건 면에서 유사한 펜실베이니아가 선택되었습니다.

연구자들은 1992년 이전과 이후에 두 주의 패스트푸드 레스토랑을 조사하여 종업원 수를 확인했습니다. 고용량 연구 자료를 사용한 이유는 패스트푸드 업계가 최저임금 변화에 빠르게 대응할 수 있기 때문입니다.

## 데이터 세트

이제 데이터를 자세히 살펴보는 적절한 시기입니다. 필요한 데이터 변환을 거친 후 (교육 목적을 위해 간소화된 내용), 다음 데이터 구조가 사용 가능합니다. David Card 웹사이트(https://davidcard.berkeley.edu/data_sets.html)에서 데이터 세트를 사용했습니다.

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

<img src="/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_1.png" />

각 행을 식당 설문조사 결과로 취급할 수 있습니다. 중요한 정보는 주 이름, 총 고용 인원, 그리고 주어진 레코드가 최저임금 변경 전이나 후 기간인지를 나타내는 플래그입니다. 최저임금의 변경을 분석 대상의 처리 변수로 취급할 것입니다.

기술적으로, 차트 작성을 쉽게 하기 위해 시간별 및 주별 평균을 데이터 프레임에 저장할 것입니다:

## 직관적인 접근

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

최저임금 인상의 영향을 직관적으로 알아보려면 어떻게 해야 할까요?

가장 직관적인 방법은 처리 후 두 주(State)의 평균 고용량을 비교하는 것입니다.

![그림](/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_2.png)

차트를 통해 뉴저지의 평균 고용량이 펜실베이니아보다 약간 낮았음을 알 수 있습니다. 최저임금에 반대하는 사람들은 모두 크게 기뻐할 것이고 이 경제 정책 도구가 제대로 작동하지 않는다고 결론을 내릴 수 있습니다. 또는 아직 결론을 내기에는 너무 이르지 않을까요?

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

안타깝게도, 이 방법은 올바르지 않습니다. 이는 두 주 간의 사전 처리 차이에 대한 중요한 정보를 빼먹고 있습니다. 우리가 가지고 있는 정보는 무작위 실험 이외의 것에서 나온 것이기 때문에 두 주 간의 격차를 설명할 수 있는 다양한 요인을 식별할 수 없게 됩니다.

이 두 주는 거기서 일하는 사람들의 수와 그들의 경제 상태 면에서 매우 다를 수 있습니다. 이들을 처리 후 비교하는 것은 최저임금의 영향에 대한 것을 밝혀 내지 않을 뿐만 아니라 부정확한 결론에 이를 수도 있습니다. 저는 거의 모든 경우에 이러한 유형의 비교를 피하는 것이 좋다고 생각합니다.

## 처리 전/후 비교

우리는 처리 후 두 주를 비교하여 결론을 내릴 수 없습니다. 어떤가요, 최저임금 변경에 영향을 받은 주만 살펴볼까요? 이 프로그램의 영향을 평가하는 다른 방법은 뉴저지의 최저임금 변경 전후 고용을 비교하는 것입니다. 아래 코드 블록은 정확히 이를 수행합니다.

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

<img src="/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_3.png" />

이전/이후 비교는 다른 결과를 보여줍니다. 최저 임금을 인상한 후, 뉴져지 주의 패스트푸드 레스토랑의 평균 고용량이 증가했습니다.

유감스럽게도, 이러한 결론은 결정적이지 않습니다. 이 간단한 비교에는 많은 결함이 있습니다. 처리 전후를 비교할 때 강력한 가정 하나를 보여줍니다: 최저 임금이 인상되지 않았다면 뉴저지의 고용 수준은 변경 전과 동일하게 유지되었을 것이라는 것입니다.

직관적으로, 이는 그럴듯한 시나리오로 보이지는 않습니다. 이 기간 동안 일반 경제 활동이 증가할 가능성이 있었고, 정부 프로그램이 고용을 보조할 수도 있었으며, 레스토랑 업계가 수요 증가로 큰 폭으로 경험할 수도 있었습니다. 이러한 시나리오 중 일부는 고용 수준에 영향을 미칠 수 있습니다. 간단히 선천과 후천을 비교하여 처리의 인과 관계적 영향을 확립하는 데는 보통 충분하지 않습니다.

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

이와 같은 비교는 다양한 상황에서 매우 일반적입니다. 이전에 논의한 방법보다 더 신뢰할 수 있다고 생각하더라도 결과를 비교할 때는 항상 신중해야 합니다.

# 차이 차이법

마침내 이제 우리는 공연의 주인공인 차이 차이법을 소개할 준비가 다 되어 있습니다. 우리가 처리 이후 두 그룹을 비교해서 인과 효과가 있는지 확인하는 것만으로는 부족하다는 것을 발견했습니다. 처리 전후에 처리된 그룹을 비교하는 것만으로도 충분하지 않습니다. 이 두 방법을 결합해 볼까요?

차이 차이 분석을 통해 선택한 그룹 간의 결과 변수 변화를 시간에 따라 비교할 수 있습니다. 시간은 매우 중요한 요소로, 우리는 처리가 시작된 이후에 무엇이 어떻게 변했는지 비교할 수 있습니다. 이 방법의 단순함은 놀랍지만, 모든 인과적 접근 방법과 마찬가지로 가정에 의존합니다.

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

나중에 다양한 유의점에 대해 다룰 예정이에요. 우선, 이 평가 연구를 수행하는 데 필요한 구성 요소에 대해 시작해보죠. DiD 연구는 적어도 두 개의 서로 다른 시기에 두 개의 그룹이 필요해요. 한 그룹은 치료를 받고, 다른 하나는 비교 그룹으로 사용돼요. 언제 그룹을 비교할지 알아야 해요. 이 작업을 위해 필요한 항목은 무엇이 있을까요?

- 통제 그룹의 전 치료 시점 결과 변수 값
- '치료받는' 그룹의 전 치료 시점 결과 변수 값
- 통제 그룹의 후 치료 시점 결과 변수 값
- '치료받는' 그룹의 후 치료 시점 결과 변수 값

다음 단계로 진행하여 다음 메트릭을 계산해야 합니다:

- 치료받는 그룹과 통제 그룹 사이의 결과 변수 차이(치료 전 기간)
- 치료받는 그룹과 통제 그룹 사이의 결과 변수 차이(치료 후)

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

다음으로 할 일은 무엇인가요? 우리는 마침내 차이-차이(differece-in-differences)를 계산합니다. 이는 전 처리와 후 처리 사이의 차이를 의미합니다. 이 측정은 평균 처리 효과의 추정을 제공합니다.

이 전략의 이유를 쉽게 이해할 수 있어요. 무작위화 실험에서의 데이터 부족으로 인해 그룹 간의 차이를 비교할 수 없습니다. 그러나 그룹 간의 차이를 측정하는 것은 가능합니다. 치료 이전과 이후 기간을 비교하여 치료 효과를 나타내는 결과 변수의 차이를 측정할 수 있습니다.

왜 그럴까요? 치료가 시작되기 전에 두 그룹 모두 결과 변수에 대한 기준 값을 갖고 있었습니다. 아무 일도 일어나지 않았다면 두 그룹에서 무엇이든 동일하게 유지될 것으로 가정합니다. 그러나 치료가 진행되었습니다.

치료는 한 그룹에만 영향을 미쳤습니다. 따라서, 결과 변수에서의 어떠한 변화는 '치료된' 그룹에서만 발생해야 합니다. 치료 그룹에서의 어떠한 변화는 결과 변수를 통제 그룹과 비교했을 때 결과 변수를 바꿀 것입니다. 이 변화는 치료의 효과입니다.

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

제어 그룹의 성과와 추이가 치료 전과 동일할 것으로 가정합니다. 또한, 치료가 발생하지 않았다면 치료 그룹의 개인들이 이전 활동을 유지했을 것으로 가정해야 합니다. 한 그룹에서의 치료 발생은 상황을 변화시키고 치료 효과를 제공합니다.

## 응용

새로운 도구를 사용하여 최저임금의 영향을 조사할 수 있습니다. 최저임금 예시로 돌아가서, 우리가 가지고 있는 정보를 토대로 다음 숫자를 알아낼 수 있습니다:

- 뉴저지의 최저임금 인상 전 고용 상황
- 펜실베이니아의 최저임금 인상 전 고용 상황
- 뉴저지의 최저임금 인상 후 고용 상황
- 펜실베이니아의 최저임금 인상 후 고용 상황

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

최저임금이 인상되기 전에는 펜실베이니아의 패스트푸드 레스토랑 평균 고용량이 더 많았습니다. 그러나 인상 이후에는 상황이 변했고, 두 주 간의 평균 고용 차이가 훨씬 줄었습니다.

아래 코드는 최저임금 인상 이전과 이후의 고용 차이를 계산합니다 (nj_difference 및 penn_difference). 또한 두 차이를 빼는 것으로 차이 차이 추정치를 계산합니다.

아래 코드는 차이를 플롯하여 시각적인 비교를 제공합니다. 추가로 대조사실선을 추가하고 있습니다. 기술적으로, 패스트푸드 레스토랑 업종이 펜실베이니아의 추세를 따른다면 뉴저지의 사후처리 고용량을 추정하는 것입니다. 차이-차이 이해에 중요한 역할을 하는 다음 단락에서 이 대조사실선에 대해 논의할 것입니다.

차트에서 보듯이 뉴저지의 평균 고용량이 0.59 증가했고, 펜실베이니아에서는 감소했습니다. 이를 계산하여 차이를 측정하면 처리 효과를 2.75로 얻을 수 있습니다. 최저임금 인상은 평균 고용량 증가로 이어졌는데, 이는 놀라운 결과입니다.

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

![Screenshot](/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_4.png)

한번 이 결과를 초래한 것에 대해 고려해 보겠습니다. 뉴저지의 고용은 크게 증가하지 않았습니다. 그러나 펜실베이니아의 평균 고용률은 감소했습니다.

최저 시급이 오르지 않았다면, 뉴저지의 평균 고용은 펜실베이니아에서 관측된 추세를 따라가는 것으로 예상됩니다. 최저 시급이 오르지 않았다면, 평균 고용은 더 낮았을 것입니다.

차트에서 보면, 뉴저지의 추세가 펜실베이니아에서 관측된 추세를 따르는 대역상실한 선으로 표시되어 있습니다. 대역상실한 선과 뉴저지에서 관측된 실제 값과의 차이는 2.75의 치료 효과를 나타냅니다.

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

치료의 도입으로 이러한 추세가 변하고 뉴저지의 고용이 해당 값을 유지하고 약간 증가할 수 있습니다. 이러한 유형의 분석에서 중요한 것은 처리 그룹의 변화가 대조 그룹에서 관찰된 변화와 비교하여 어떻게 되는지입니다.

아래 표는 대개 DiD 분석에서 만나는 형식으로 계산 내용을 요약합니다. 치료 및 대조 그룹은 열에 나타내고, 기간은 행에 나타내며, 결과 변수의 측정값은 셀에 나타냅니다.

오른쪽 하단 모서리에는 차이를 계산한 후 최종 추정치가 표시됩니다.

![표](/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_5.png)

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

## 선형 회귀를 사용한 차이 차이 방법

몇 가지 평균을 간단히 계산해 보았습니다. 차이 차이 모델의 계산의 간단함은 그 장점 중 하나입니다.

그 결과를 얻는 다른 방법도 있습니다. 좋고 오래된 선형 회귀를 사용하여 동일한 결론에 도달할 수 있습니다. 이 모델을 여러 기간 및 그룹으로 확장하는 것이 유익할 것입니다.

차이 차이 모델의 주요 장점 중 하나는 그 간단함입니다. 이 모델을 실행하기 위해 소수의 변수만 필요로 하며, 이를 간단하고 쉽게 사용할 수 있습니다.

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

- 결과 변수: 총 고용 (Y)
- 기간: 처리 이전에는 0이고 처리 기간에는 1인 더미 변수 (T)
- 그룹: 대조군에는 0이고 치료군에는 1인 더미 변수 (G)

모델은 다음과 같은 형태를 가지고 있습니다:

![식](/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_6.png)

이 모델을 어떻게 해석할까요? B1은 처리 기간이 시작될 때 결과 변수 값의 증가를 나타냅니다. 우리의 예제는 처리 전후의 대조군 평균 고용 차이를 보여줍니다. 우리는 최저 임금이 증가하지 않는 상황에서 이 변화가 발생할 것으로 기대합니다.

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

B2는 통제 그룹에서 처리 그룹으로 결과 변수가 변경된 것을 나타냅니다. 이는 치료 전 세계의 두 그룹 간의 기준 차이입니다.

치료 기간과 그룹 간의 상호 작용 용어(T\*G)는 처리 기간과 처리 그룹이 모두 활성화 되었을 때 결과 변수의 변화를 보여줍니다. 처리된 그룹의 경우 처리된 기간에 대해 0이 아닌 값이 있습니다.

DiD 분석에서 우리는 처리된 그룹에서 처리 기간 동안의 결과 변수 변경을 통제 그룹과 비교하는 것을 원합니다.

이 모델의 결과를 Python에서 계산하는 많은 방법이 있습니다. 이 예제에서는 statsmodels 라이브러리를 사용할 것입니다. 우리 예제에서의 선형 모델의 명세는 다음과 같습니다:

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

회귀 출력 결과를 보면, (노란색으로 표시된) 치료 효과가 바로 위에서 계산한 값과 동일함을 확인할 수 있습니다. 모든 계수가 이전에 계산한 값과 일치하는지 확인할 수 있어요.

![같이 보기](/assets/img/2024-05-20-ExploringcausalitywithPythonDifference-in-differences_7.png)

간단한 평균 계산에 회귀 분석을 사용하는 것이 지나치다고 느껴질 수 있지만, 여러 이점이 있답니다.

먼저, 모든 그룹에 대한 평균을 계산하는 것보다 계산이 더 간단해요. 또한 모델을 확장하여 여러 비교 그룹과 기간을 포함할 때 회귀의 이점을 볼 수 있을 거예요.

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

핵심적인 가정들입니다.

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

회귀 분석은 차이 차이 모델의 적용을 결론 지었습니다. 이 시연은 이 방법이 얼마나 강력한지를 보여줍니다. 마무리하기 전에 이 모델의 잠재적인 한계에 대해 생각해 봅시다.

원인 추론의 대부분에 대해, 모델은 우리가 그에 대해 하는 가정만큼 좋습니다. 이 방법에서 올바른 비교 그룹을 찾는 것은 필수적이며 도메인 전문 지식이 필요합니다.

차이 차이에 대해 읽을 때 항상 평행한 추세 가정을 만나게 됩니다. 이는 치료 전에 두 그룹이 결과 변수의 일관된 추세를 가졌다는 것을 의미합니다. 또한 이 모델은 해당 추세가 시간이 지남에 따라 지속되고 그 차이가 치료가 없을 때 결과 변수에서 두 그룹 간에 동일하게 유지되도록 요구합니다.

우리의 예에서는 두 주에서 패스트푸드 음식점의 평균 고용 변화가 시간에 따라 동일하게 변경된다고 가정합니다. 이 가정이 충족되지 않는 경우 차이 차이 분석은 편향됩니다.

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

역사는 하나의 것이지만, 우리는 또한 이 추세가 시간이 지나도 계속될 것으로 가정하며, 이것은 우리가 결코 알지 못하고 테스트할 수 없는 것입니다.

이 가정은 부분적으로만 테스트할 수 있습니다. 우리는 역사적인 추세를 살펴보아 비슷한지 평가할 수 있습니다. 이를 위해 더 많은 역사적 데이터가 필요합니다—시간을 경과하며 추세를 그래프로 나타내면 이 가정의 좋은 지표가 됩니다.

이것은 부분적으로 테스트할 수 있으며, 우리는 치료를 받은 그룹의 행동만 평가할 수 있습니다. 병든 그룹이 우리의 통제 그룹과 동일한 행동을 보였다고 가정하지만, 우리는 100% 확신할 수 없습니다. 우리가 평가할 수 있는 세상은 단 하나뿐입니다. 이것이 인과 추론의 근본적인 문제입니다.

차이-차이(Difference-in-Differences)는 두 그룹의 구조가 시간이 지나도 동일하게 유지되어야 합니다. 치료 전에 두 그룹이 동일한 구성을 가져야 합니다. 그들은 치료에 노출되는 것을 제외하고는 동일한 특성을 가져야 합니다.

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

# 요약

첫눈에는 모든 가정들이 이 방법을 덜 매력적으로 만들 수 있습니다. 그렇지만 가정 없이 통계적이고 분석적인 접근이 있을까요? 가능한 한 품질 좋은 데이터를 확보하고, 민감도 분석을 수행하며, 도메인 지식을 활용해야 합니다. 그러면 차이-차이 방법을 사용하여 흥미로운 통찰을 발견할 수 있습니다.

위 게시물은 한 가지 단점이 있습니다 (그 외에도 많을 수 있습니다 — 알려주시면 감사하겠습니다). 상대적으로 간단한 시나리오인 두 그룹과 두 기간을 다루고 있습니다. 다가오는 게시물에서는 동일한 기술을 좀 더 복잡한 환경에서 사용하여 이 그림을 더 복잡하게 만들 것입니다.

차이-차이 방법에 관한 설명이 도움이 되었으면 좋겠습니다. 이 글은 인과 추론에 대한 내 학습을 공유하기 위한 첫걸음입니다. 더 많은 내용이 이어질 예정입니다.

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

# 참고 자료

Card, David & Krueger, Alan B, 1994. “Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania,” American Economic Review, American Economic Association, vol. 84(4), pages 772–793, September

https://davidcard.berkeley.edu/data_sets.html

Impact Evaluation in Practice — Second Edition https://www.worldbank.org/en/programs/sief-trust-fund/publication/impact-evaluation-in-practice

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

https://mixtape.scunning.com/09-difference_in_differences
