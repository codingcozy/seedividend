---
title: "데이터 과학자가 알아야 할 선형 대수학 개념"
description: ""
coverImage: "/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_0.png"
date: 2024-06-19 23:27
ogImage:
  url: /assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_0.png
tag: Tech
originalTitle: "Linear Algebra Concepts Every Data Scientist Should Know"
link: "https://medium.com/bitgrit-data-science-publication/linear-algebra-concepts-every-data-scientist-should-know-18b00bd453dd"
isUpdated: true
---

## 데이터 과학

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_0.png)

선형 대수는 모든 데이터 과학 및 머신 러닝 작업의 기반입니다.

이것은 이론적 모델을 실용적인 솔루션으로 변환하는 언어입니다.

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

데이터에서 학습할 수 있도록 하는 원칙을 내포하고 있어요.

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_1.png)

이것들은 다음과 같이 사용됩니다.

- 데이터의 표현: 데이터를 구조화하고 조작하는 구조화된 방법으로, 복잡한 데이터셋을 행렬로 표현할 수 있도록 합니다.
- 차원 축소: PCA와 같은 기법은 중요한 정보를 잃지 않으면서 모델 효율성을 높이기 위해 변수의 수를 줄이는 데 선형대수를 활용합니다.
- 최적화: 그래디언트 디센트는 ML의 핵심 엔진으로, 함수의 최솟값을 찾기 위해 선형대수를 사용합니다.
- 피쳐 엔지니어링: 선형 변환과 행렬 연산을 통해 기존 데이터에서 새로운 피처를 생성합니다.
- 유사성 측정: 임베딩은 벡터로 저장되며, 오늘날 추천 시스템과 AI 챗봇에서 사용됩니다.
- 그 밖에도 많아요!

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

이 기사에서는 선형 대수학 개념, 시각적 설명 및 코드 예제를 살펴볼 거에요.

시작해 봅시다!

코드 → Deepnote 노트북

# 목차

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

### 벡터

- **단위 벡터**: 단위 벡터
- **벡터 연산**
  - **벡터 덧셈**
  - **스칼라 곱**
  - **닷 프로덕트**
- **벡터 공간**
  - **영 공간 (커널)**
  - **Span**
  - **기저**
  - **선형 독립성**

# 행렬

- **함수로서의 행렬**
- **선형 변환**
- **역행렬**
- **특이 행렬**
- **항등 행렬**
- **대각 행렬**
- **직교 행렬**
- **행렬 곱셈**
- **트레이스**
- **행렬식**
- **랭크**
- **고유 벡터와 고유값**

![선형 대수학 개념](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_2.png)

이것이 선형 대수학의 기본적인 구성 요소입니다.

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

벡터를 생각하는 방법은 3가지가 있어요.

첫 번째는 물리학적인 시각입니다. 벡터는 공간에 향하는 화살표로 정의되며, 길이와 방향에 의해 결정됩니다. 평면상의 벡터는 2차원이고, 우리가 사는 공간에 있는 벡터는 3차원입니다.

두 번째는 컴퓨터 과학적 시각입니다. 벡터는 숫자의 순서대로 나열된 목록입니다. 이 목록의 길이가 차원을 결정합니다.

세 번째는 수학자의 시각입니다. 벡터는 서로 더해지거나 숫자로 곱해지는 모든 것이 될 수 있어요.

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

## 단위 벡터

단위 벡터는 크기가 1인 벡터입니다. 종종 크기에 관계없이 벡터의 방향을 나타내는 데 사용됩니다.

# 벡터 연산

## 벡터 덧셈

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

<img src="/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_3.png" />

두 벡터를 요소별로 더하여 새로운 벡터를 형성하는 것을 의미합니다.

<img src="/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_4.png" />

## 스칼라 곱

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

표 태그를 마크다운 형식으로 변경하세요.

## 내적

형식적으로는 두 벡터의 유클리드 크기와 사이의 각도의 코사인의 곱으로, 벡터의 길이와 방향 관계를 모두 반영한다.

![image](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_5.png)

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

직관적으로 생각해보면 한 벡터의 방향성 성장을 다른 벡터에 적용하는 것이라고 생각할 수 있습니다. 또는 "한 벡터가 다른 벡터에게 얼마나 많은 밀어내기/에너지를 주는가?"라고 생각할 수도 있습니다. 결과는 우리가 원래의 벡터를 얼마나 더 강하게 만들었는지를 보여줍니다 (양수, 음수 또는 0).

![Image 6](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_6.png)

만약 내적이 0이라면, 그것은 벡터들이 직교한다는 것을 말해줍니다.

![Image 7](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_7.png)

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

반가운 비유를 하나 소개하겠습니다.

빨간 화살표 벡터는 당신의 속도를 나타내고, 파란 화살표 벡터는 부스터 패드의 방향을 나타냅니다. 숫자가 클수록 더 강력한 파워를 의미합니다. 점곱은 당신이 받을 부스터 양을 나타냅니다.

이 공식을 사용하면, |a|는 당신의 진입 속도, |b|는 최대 부스트이며, 받게 되는 부스트의 백분율은 cos(𝛉)이며, 전체 부스트는 |a| |b| cos(𝛉)가 됩니다.

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_8.png)

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

# 벡터 공간

벡터(또는 선형) 공간은 더하고 숫자로 곱할 수 있는 벡터의 모음입니다. 이 숫자는 이 문맥에서 스칼라라고 불립니다.

V가 벡터 공간이라고 불리기 위해서는 공리 목록을 만족해야 합니다.

이미지를 표시하는 대신 Markdown 형식으로 표를 변경했습니다.

![Vector Space Table](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_9.png)

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

## 널 공간 (커널)

널 공간은 행렬과 곱해졌을 때 영벡터가 되는 벡터들의 집합입니다.

이는 방정식 Ax = 0의 해를 나타냅니다. 여기서 A는 주어진 행렬입니다.

주어진 행렬에 곱해졌을 때 두 벡터를 원점(영벡터)으로 수렴시키는 부분공간으로서 행렬의 널 공간을 시각화할 수 있습니다.

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

## Span

주어진 두 벡터 v와 w의 선형 결합인 av + bw를 통해 도달할 수 있는 모든 가능한 벡터의 집합이며, 여기서 a와 b는 모든 실수입니다.

대부분의 벡터 쌍에 대해, 2차원 벡터 평면의 모든 점에 도달할 수 있습니다.

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

![image](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_10.png)

두 벡터가 일치하는 경우, 원점을 지나는 단일 선에 제한됩니다.

span의 개념은 basis의 개념에 기초합니다.

## Basis

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

기저는 전체 벡터 공간을 구성하는 선형 독립적인 벡터들의 모임입니다. 이는 벡터 공간 내의 모든 벡터를 기저 벡터의 선형 조합으로 표현할 수 있다는 것을 의미합니다.

이들을 공간 내 모든 다른 벡터들을 위한 기본 요소로 생각해보세요.

하나의 벡터를 화살표로 생각하는 것이 도움이 되지만, 벡터들의 집합에 대해서는 점으로 생각해보세요. 대부분의 기저 벡터 쌍은 공간의 전체 2차원 시트를 채울 수 있습니다.

## 선형 독립성

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

일련의 벡터가 선형 독립적인 경우 집합 내의 벡터들이 결과적으로 ax + by 형태인 어떤 식으로도 나타낼 수 없는 경우입니다.

## 행렬

행렬은 입력과 연산을 행과 열로 구성하는 방법입니다.

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_11.png)

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

여기 2행 2열의 행렬이 있어요.

구조화된 방식으로 문제를 해결할 수 있는 수학적 도구입니다.

## 함수로서의 행렬

행렬을 함수로 생각할 수 있어요. 파이썬 함수가 입력 매개변수를 받아 처리하고 출력을 반환하는 것처럼, 행렬 변환은 선형 변환을 통해 입력 벡터를 출력 벡터로 변환합니다.

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

![Linear Transformation](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_12.png)

## 선형 변환

![선형 변환](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_13.png)

선형 변환은 두 벡터 공간 간의 매핑 V → W로, 벡터 덧셈과 스칼라 곱셈의 연산을 보존하는 것을 말합니다.

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

실제로 행렬 A를 벡터 x에 적용하여 다른 벡터 y를 얻는 것(Ax = y 작업을 통해)은 선형 변환입니다.

이것은 데이터 과학에서 많이 사용됩니다:

- 차원 축소: PCA는 선형 변환을 사용하여 고차원 데이터를 낮은 차원 공간으로 매핑합니다.
- 데이터 변환: 데이터 집합을 정규화하거나 표준화하는 것은 선형 변환이다.
- 피처 엔지니어링: 기존 피처의 조합을 통해 새로운 피처를 생성하는 것.

다음은 몇 가지 형태의 행렬입니다:

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

## 역행렬

행렬은 그 역행렬과 곱해지면 항등 행렬이 됩니다.

## 특이 행렬

특이 행렬은 역행렬을 가지지 않는 정방 행렬입니다. 이는 행렬의 행렬식이 0이거나 랭크가 크기보다 작은 것과 동일합니다.

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

## 항등 행렬.

항등 행렬은 주 대각선에는 1의 값을, 그 외의 곳에는 0의 값을 갖는 정사각 행렬입니다. 행렬 곱셈에서 곱셈 항등원으로 작용하여 어떤 행렬에 적용해도 그 행렬을 변경시키지 않습니다. 그냥 숫자 1과 마찬가지로 작용합니다.

## 대각 행렬

대각 행렬은 모든 주 대각선을 제외한 항목이 0인 정사각 행렬입니다. 고유값을 찾거나 행렬식을 계산하는 데 사용됩니다.

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

## 직교 행렬

![직교 행렬](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_14.png)

실수 요소를 갖는 정방 행렬은 전치가 역행렬과 같으면 '직교'로 간주됩니다.

형식적으로, 행렬 A가 AᵀA=AAᵀ = I를 만족하면 A는 직교 행렬입니다. 여기서 I는 항등 행렬입니다.

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

기하학적으로, 행렬은 그 열과 행이 직교하는 단위 벡터인 경우 직교합니다. 다시 말해, 서로 수직이며 크기가 1인 벡터입니다.

두 벡터가 서로 직교하고(90도) 그들 사이의 내적이 0이면 두 벡터는 직교한다는 것을 기억하세요.

## 행렬 곱셈

행렬 곱셈을 수행하는 데에 행렬을 사용합니다.

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

안녕하세요! 아래는 선형대수에 관한 직관적인 가이드에서 가져온 멋진 시각화입니다.

![Visualization](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_15.png)

각 입력 데이터를 각 연산을 통해 흘리는 것을 상상해 보세요.

![Operations](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_16.png)

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

여기 작업의 예시가 있어요.

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_17.png)

작업을 수행한 결과는 다음과 같아요.

![이미지](/assets/img/2024-06-19-LinearAlgebraConceptsEveryDataScientistShouldKnow_18.png)

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

입력은 [3 x 2] 행렬이며, 우리의 작업 행렬은 [2 x 3]입니다. 그 결과는 [2 x 3] [3 x 2] = [2 x 2]입니다.

입력의 크기는 작업의 크기와 일치해야 합니다.

## Trace

행렬의 Trace는 모든 대각 요소의 합입니다. 기저 변경에 불변이며, 행렬에 대한 고유값의 합인 행렬에 대한 정보적인 값을 제공합니다.

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

## 행렬식

행렬식은 출력 변환의 크기를 의미해요.

입력이 단위 벡터인 경우(면적이나 부피가 1일 때), 행렬식은 변환된 면적이나 부피의 크기를 나타냅니다.

예를 들어 이 행렬을 살펴보죠. A의 면적이 6배로 스케일링된 경우, 변환의 행렬식은 6이 되는 거죠.

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

음수 determinant는 전체 공간이 뒤집혔음을 알려줍니다. 이 변환은 종이 더미를 뒤집는 것과 비슷합니다.

빨간색과 녹색 축의 방향이 뒤바뀐 것을 주목하세요.

Determinant가 0이면 행렬이 "파괴적"이며 뒤집을 수 없습니다. 0으로 곱하는 것과 비슷하게 정보가 손실됩니다.

Determinant는 행렬이 역행렬인지를 알려줄 수 있습니다. det(A)가 0이면 역행렬이 존재하지 않으며 행렬은 특이합니다.

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

## Rank

행렬에서 선형 독립 열/행 벡터의 최대 개수를 나타내는 것입니다. 그것은 행 또는 열에 의해 만들어진 벡터 공간의 차원을 나타냅니다.

또한 선형 변환 후 출력 차원의 개수를 알려줍니다.

변환의 출력이 단일 선 (일차원이라고 함)인 경우, 해당 변환이 1의 순위를 가진다고 말합니다.

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

만약 모든 벡터가 일부 2차원 평면에 있을 경우, 해당 변환은 랭크 2를 가졌다고 말합니다.

2x2 행렬의 경우 랭크 2가 가장 좋습니다. 이것이 full rank로 알려져 있죠. 이것은 기저 벡터가 전체 2차원 공간과 0이 아닌 determinant를 표현할 수 있다는 것을 의미합니다.

그러나 3x3 행렬의 경우, 랭크 2는 더 안 좋은데, 완전히 무너진 것은 아닙니다. 하지만, 랭크 1보다는 낫다고 볼 수 있죠.

## 고유벡터와 고유값

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

고유 벡터와 고유 값은 변환의 "축"을 나타냅니다.

고유 벡터는 선형 변환 후에도 방향이 변하지 않는 입력값입니다. 방향은 변하지 않지만 크기는 변할 수 있습니다. 이 크기, 즉 고유 벡터가 확대되거나 축소되는 정도가 고유 값입니다.

지구본을 회전시킬 때 생각해보세요; 극을 제외한 모든 위치가 새로운 방향을 향합니다. 그들의 방향은 변하지 않습니다.

여기 고유 벡터의 시각적 예시가 있습니다.

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

![image](https://miro.medium.com/v2/resize:fit:600/1*d34D2o-Gx1IOgFnuuJ2kog.gif)

행렬 A와 벡터 v에 대해, Av = λv이면 λ가 고유값이고, v가 행렬 A의 고유벡터입니다.

다른 말로, 정방 행렬 A의 고유벡터는 행렬 곱셈 = 스칼라 곱셈인 벡터입니다.

# 읽어 주셔서 감사합니다!

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

# 자원

해커들 방식

- 코더를 위한 계산 선형 대수학
- 파이썬을 활용한 응용 기계 학습을 위한 선형 대수학 소개

시각화

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

- 그래픽 선형 대수학 — LA를 수행하는 새로운 방법
- 3Blue1Brown의 선형대수학 본질 — 놀라운 애니메이션, 개념 시각화
- 인벡터라이즈
- 직관적인 수학

논문/강의/교재

- 딥 러닝에 필요한 행렬 미적분
- 데이터 분석, 신호 처리 및 머신 러닝을 위한 행렬 방법 | 수학 | MIT 오픈코스웨어
- 올바르게 수행하는 선형 대수학
- 선형대수학 4페이지로 알아보기.pdf

# 연락을 유지하세요!

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

비트그릿 데이터 사이언스 퍼블리케이션을 팔로우하면 최신 소식을 받아보실 수 있어요!

데이터 사이언스 및 인공지능 최신 동향을 다른 데이터 과학자들과 함께 논의하고 싶나요? 저희 디스코드 서버에 가입해보세요!

워크숍 및 다가오는 대회 정보를 받아보려면 비트그릿을 팔로우하세요!

디스코드 | 웹사이트 | 트위터 | 링크드인 | 인스타그램 | 페이스북 | 유튜브
