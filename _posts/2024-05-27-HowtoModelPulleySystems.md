---
title: "풀리 시스템 모델링 방법"
description: ""
coverImage: "/assets/img/2024-05-27-HowtoModelPulleySystems_0.png"
date: 2024-05-27 18:33
ogImage:
  url: /assets/img/2024-05-27-HowtoModelPulleySystems_0.png
tag: Tech
originalTitle: "How to Model Pulley Systems"
link: "https://medium.com/@keith-mcnulty/how-to-model-pulley-systems-7dc71ab4eb6b"
isUpdated: true
---

![Pulley System](/assets/img/2024-05-27-HowtoModelPulleySystems_0.png)

풀리 시스템은 비탄성 케이블이나 줄을 통해 연결된 물체들의 시스템으로, 일반적으로 고정된 축 위의 바퀴인 부드러운 풀리를 통해 통과됩니다. 일상생활에서 가장 흔히 발견되는 풀리 시스템은 강철 케이블로 연결된 두 묵직한 물체로 구성됩니다. 케이블이 시스템 상단의 부드러운 풀리를 통과하고 물체들은 풀리 양쪽에서 수직으로 올라가거나 내려갑니다.

풀리의 한 쪽에 엘리베이터가 있고 다른 쪽에 카운터웨이트가 있는 엘리베이터 시스템이 일반적인 예입니다. 또 다른 일반적이고 비슷한 예로는 인간이 카운터웨이트에 맞서 풀리를 통해 케이블을 당기는 웨이트 머신이 있습니다.

풀리 시스템 문제는 고등학교에서 흔히 배우는 수학 도구를 사용하여 해결하는 데 재미있고 깔끔할 수 있습니다. 최근에 매우 만족스러운 해결책이 있는 이 형태의 문제를 발견했습니다. 이 문제를 해결하기 위해서는 뉴턴의 법칙, 운동의 기본 방정식, 그리고 에너지와 운동량에 대한 기본 지식이 필요합니다. 또한 문제를 수학으로 모델링하기 위해 체계적으로 생각할 수 있어야 합니다.

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

문제를 설명하겠습니다.

A 파일드라이버는 가벼운 무게 m의 경량 카운터웨이트에 의해 무거운 질량 M의 무게로 구성되어 있으며 매끄럽고 가벼운 고정 풀리를 통해 전달되는 불편한 조건자 그리고 카운터웨이트가 연결된 무거운 질량 M으로 이루어져 있습니다. 편은 파일 아래에 위치합니다. 파일 드라이버는 파일 위에 위치한 상태에서 정지된 상태에서 시작되며, 그 이후의 충돌은 파일드라이버와 파일 간에만 발생하며 이러한 충돌은 완전히 탄력적입니다. 파일드라이버가 정지 상태에 이르기까지 걸리는 시간이 처음으로 파일을 제동시키기까지 걸리는 시간의 세 배임을 보여줍니다.

## 문제 이해

역학 문제의 경우 다이어그램이 많은 도움이 됩니다. 이것이 파일 위에 위치한 초기 상황의 다이어그램입니다:

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

![How to Model Pulley Systems Part 1](/assets/img/2024-05-27-HowtoModelPulleySystems_1.png)

이 시스템은 정지 상태에서 출발되며, 우리는 편막기가 말뚝을 타격할 것으로 예상할 수 있습니다. 이 충돌이 완전히 탄성 없다고 합니다. 이는 모든 운동 에너지가 손실되고 편막기가 말뚝에서 튕겨 나오지 않고 충돌 후 그 자리에서 그대로 남게 될 것을 의미합니다.

그러나 카운터웨이트는 충돌 후에도 계속해서 상승할 것이며, 그 결과 줄은 느슨해질 것입니다. 이것은 중력이 카운터웨이트를 멈출 때까지 계속될 것이며, 그리고 다시 하강하기 시작합니다. 이 상황의 다이어그램은 다음과 같습니다:

![How to Model Pulley Systems Part 2](/assets/img/2024-05-27-HowtoModelPulleySystems_2.png)

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

어느 순간, 줄이 다시 팽창되어 긴장이 생기면서 편입기가 중력에 의해 느려지고 제로가 될 때까지 위로 올라갈 것입니다. 그런 다음, 파일과 충돌할 때까지 떨어지며, 이 과정은 시스템이 영구적으로 정지할 때까지 반복됩니다.

## 첫 번째 충돌 전에 움직임 이해하기

시스템이 해제되면 힘이 작용하고, 가속될 것으로 예상할 수 있습니다. 아래쪽 힘을 양수, 위쪽 힘을 음수로 간주합시다. 풀리의 각 측면에서 힘을 분해하고 뉴턴의 제2법칙을 사용하여 동시 방정식을 구할 수 있습니다 (중력 가속도를 나타내는 데 g를 사용):

![image](/assets/img/2024-05-27-HowtoModelPulleySystems_3.png)

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

두 번째 방정식을 재배열하고 첫 번째 방정식에 대입하면, 시스템의 가속도에 대한 식을 유도할 수 있습니다. 다음과 같이:

![이미지](/assets/img/2024-05-27-HowtoModelPulleySystems_4.png)

이제 이 질문에 대한 진전을 이루기 위해, 첫 충돌이 발생하는데 걸리는 시간에 대한 식을 구해야 합니다. 이를 위해 이동 방정식을 사용할 수 있습니다. 우리는 가속도를 알고 있고, 초기 속도 u = 0임을 알고 있습니다. 충돌 지점에서의 속도를 v로 부르겠습니다. 첫 번째 충돌이 발생하는 데 걸리는 시간을 찾기 위해 v = u + at와 같은 방정식을 사용해 봅시다:

![이미지](/assets/img/2024-05-27-HowtoModelPulleySystems_5.png)

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

## 첫 번째와 두 번째 충돌 사이의 움직임 연구

알다시피, 첫 충돌 직후 집게는 정지 상태를 유지하지만, 카운터웨이트는 중력에 반항하여 계속 상승하다가 중력이 그것을 느리게 하여 멈추고 다시 하강하기 시작합니다.

이제 충돌 시점에서 집게의 속도를 v로 가정하겠습니다. 따라서 충돌 시점에서 카운터웨이트도 속력 v로 상승 중입니다. 충돌 이후에도 카운터웨이트는 이 초기 속도로 계속 상승하며, 줄은 늘어나게 되고, 중력이 카운터웨이트를 느리게 하여 멈추게 한 후 다시 하강하기 시작합니다. 줄이 다시 팽팽해지는 시점에, 다시 속도 v에 도달하게 됩니다. 이전과 같은 운동 방정식을 사용하고, 초기 속도가 v이고 최종 속도가 0이며 가속도가 -g임을 고려하면, 카운터웨이트가 멈추기까지 걸리는 시간이 v/g임을 쉽게 찾을 수 있고, 줄이 다시 팽팽해지기까지 걸리는 시간은 2v/g임을 알 수 있습니다.

이제 줄이 다시 팽팽해지는 시점에서, 장력은 집게와 카운터웨이트가 새로운 속도로 함께 움직이도록 유발할 것입니다. 우리는 전단량 보존 법칙을 사용하여 우리가 v₁이라고 부를 새로운 속도를 계산할 수 있습니다.

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

![2024-05-27-HowtoModelPulleySystems_6](/assets/img/2024-05-27-HowtoModelPulleySystems_6.png)

이제 이 시스템이 중력으로 인해 느려지고, 더블카드가 두 번째로 펠을 충돌할 때 속도 v₁로 다시 돌아올 것을 알았습니다. 우리는 이전에 계산한 것과 같은 방법을 사용하여 더블카드가 멈출 때까지 걸리는 시간을 계산합니다. 초기 속도는 v₁, 최종 속도는 0이며, 가속도는 전체 시스템의 가속도입니다. 따라서 다음과 같습니다:

![2024-05-27-HowtoModelPulleySystems_7](/assets/img/2024-05-27-HowtoModelPulleySystems_7.png)

첫 번째와 두 번째 충돌 사이의 총 시간 T₁을 얻으려면 이 값을 두 배하여 역추적하는 시간을 더해야 합니다:

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

![이미지](/assets/img/2024-05-27-HowtoModelPulleySystems_8.png)

## 연속적인 충돌 사이의 움직임 공부

우리의 논리를 반복하면, 만약 v₁가 두 번째 충돌 직전 시스템의 속도라면, 반추중량은 2v₁/g 시간에 탄력줄 위치로 돌아올 것입니다. 이 시점에서 우리는 시스템의 새로운 속도 v₂가 다음과 같은 조건을 만족한다고 말할 수 있습니다:

![이미지](/assets/img/2024-05-27-HowtoModelPulleySystems_9.png)

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

이러한 방법을 사용하여 결합된 시스템이 제로로 느려지는 데 걸리는 시간을 계산할 수도 있습니다. 이 계산 결과는 다음과 같습니다:

![image](/assets/img/2024-05-27-HowtoModelPulleySystems_10.png)

그리고 같은 과정을 따라 두 번째 충돌과 세 번째 충돌 사이의 시간 T₂를 결정할 수 있습니다:

![image](/assets/img/2024-05-27-HowtoModelPulleySystems_11.png)

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

그리고 이제 충돌 사이의 소요 시간이 등비 수열인 것을 쉽게 알 수 있습니다. 즉:

![image](/assets/img/2024-05-27-HowtoModelPulleySystems_12.png)

## 마지막 단계

충돌 사이의 시간 순열이 공비율 m/(M+m) 과 첫 항 T₁을 가진 등비 수열임을 알았으며, 공비율이 명백히 1보다 작음을 고려하면, 모든 충돌의 시작부터 끝까지의 총 시간이 극한값으로 수렴함을 말할 수 있고, 등비 급수의 합 T = T₁ + T₂ + … 를 다음과 같이 계산할 수 있습니다:

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

![image](/assets/img/2024-05-27-HowtoModelPulleySystems_13.png)

그냥 언급할 사항만 남았네요. 이는 망치가 처음으로 말끔히 칠 때까지 걸리는 시간의 두 배입니다(이전에 계산한 것). 따라서 시스템이 정지할 때까지 걸리는 총 시간은 망치가 처음으로 말끔히 칠 때까지 걸리는 시간의 세 배입니다.

이 문제에 대해 어떻게 생각하셨나요? 다르게 접근할 방법이 있나요? 자유롭게 의견을 남겨주세요!
