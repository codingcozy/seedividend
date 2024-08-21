---
title: "해석 가능한 시계열 예측을 위한 Temporal Fusion Transformer TFT 사용법"
description: ""
coverImage: "/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_0.png"
date: 2024-06-22 02:49
ogImage:
  url: /assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_0.png
tag: Tech
originalTitle: "Temporal Fusion Transformer for Interpretable Time Series Predictions"
link: "https://medium.com/dataman-in-ai/temporal-fusion-transformer-for-interpretable-time-series-predictions-4b439aa3d9bd"
isUpdated: true
---

![2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_0](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_0.png)

무료 샘플 eBook 장(chapters) 보기: [여기](https://github.com/dataman-git/modern-time-series/blob/main/20240522beauty_TOC.pdf)

Teachable.com에서 eBook 구매: $22.50 [여기](https://drdataman.teachable.com/p/home)

Amazon.com에서 인쇄판 구매: $65 [여기](https://a.co/d/25FVsMx)

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

우리는 Walmart, Target 및 Best Buy와 같은 소매업체에서 쇼핑을 합니다. Macy's, Nordstrom 및 Sears와 같은 백화점에서 물건을 사거나 Kroger, Safeway 및 Whole Foods와 같은 슈퍼마켓을 방문하기도 합니다. Amazon 및 eBay와 같은 온라인 소매업체에서 제품을 구매하기도 합니다. 우리는 제품이 정확한 시간에 문 앞으로 도착하기를 기대합니다. 제품이 품절일 경우 실망스럽게 여깁니다. 이러한 비즈니스들은 여러 가지 공통점이 있습니다: 수백 개에서 수천 개의 제품을 판매하며, 모두 계획 지침을 위해 좋은 데이터 과학 모델에 의존합니다. 이러한 종류의 데이터 과학 모델은 수천 개의 제품에 대한 예측을 제공해야 합니다. 예측은 하나의 기간만이 아니라 여러 기간이어야 합니다. 예측은 위험 완화를 위한 예측 구간을 가져야 합니다.

이 챕터에서는 여러 제품, 여러 기간 및 확률적 예측을 제공할 수 있는 Transformer 기반의 예측 모델을 소개합니다. 그것은 Temporal Fusion Transformer (TFT) 모델입니다. TFT는 특정 작업에서 다른 모델보다 우수한 성능을 보여준 바 있습니다. 그 효율성, 유연성 및 해석 가능성은 다양한 응용 분야에서 가치 있는 자산으로 만듭니다. 그리고 2019년에 Lim, Arik, Loeff, Pfister에 의해 소개된 것처럼 그 제목 또한 흥미로워합니다. "Temporal"은 시간 관련 데이터나 시간 종속성이 있는 순차 데이터를 처리한다는 것을 나타냅니다. “Fusion”은 여러 데이터 소스나 특성에서 정보를 혼합하는 설계를 포착합니다. 그리고 “Transformer”는 Transformer 기반 모델이기 때문에 사용되었습니다. 문헌 "Attention is All You Need" (2017)의 Transformer 모델은 모든 현대 대형 언어 모델 (LLM)의 백본입니다. 이전 챕터인 "RNN/LSTM에서 Temporal Fusion Transformers 및 Lag-Llama"를 참고하실 수 있습니다.

오늘날의 데이터 과학 모델은 복잡한 기계이며, 아마도 아직 완전히 알아내기 어려운 미로의 영아 단계에 있을지도 모릅니다. 한편, 데이터 과학 커뮤니티는 모델의 투명성과 해석 가능성을 요구합니다. 모델이 예측을 어떻게 하는지에 대한 질문을 합니다. 모델 해석 가능성은 책 "The explainable AI"에서 다루었듯이 책 "An Explanation for eXplainable AI"에서 다루었듯이 책 "An Explanation for eXplainable AI"에서 다루었듯이 책 "An Explanation for eXplainable AI" 모델의 책임 있는 예측을 보장하기 위한 활발한 연구 분야입니다. TFT의 주요 특징인 모델 해석 가능성은 모델이 예측을 어떻게 하는지에 대한 통찰력을 제공합니다. 이는 미래 값을 예측하는 데 가장 영향력 있는 과거 시간 단계가 무엇인지 설명해줍니다. 코드 예제에서 나중에 보게 될 변수 중요도 플롯은 모델이 예측하는 방식을 설명합니다.

이 챕터에서는 TFT 모델을 구축하기 위한 실제 데이터 케이스를 따라가보겠습니다. 다음 주제들을 다룰 예정입니다:

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

- 글로벌 시계열 모델 구축
- TFT의 구조
- 소프트웨어 요구 사항
- 데이터
- 데이터 Darts Python 라이브러리로 변환
- 모델링
- 예측
- 그래프 그리기
- 모델 해석 가능성

이 장을 완료하면 TFT를 미래 사례에 적용하고 TFT의 혜택을 설명할 수 있을 것입니다.

글로벌 시계열 모델 구축

Walmart이나 Amazon의 수천 가지 제품은 수천 개의 시계열을 의미합니다. 모든 시계열을 함께 모델링하면 모델은 전역 모델입니다. 각 시계열을 단일 변수 시계열 모델로 모델링하는 경우 지역 모델입니다. 실제로 제품이나 서비스의 계층구조에 따라 별도의 글로벌 모델을 구축할 수 있습니다. 각 글로벌 모델은 제품 범주를 제공하며 관련 제품이 포함됩니다.

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

글로벌 모델의 장점은 무엇인가요? 글로벌 모델은 여러 시계열 간의 공통 패턴과 관계를 포착할 수 있어 개별 시계열의 예측 정확도를 향상시킬 수 있습니다. 글로벌 모델은 새로운 제품과 같이 데이터가 제한적인 경우 유용할 수 있습니다. 글로벌 모델은 새 제품이 동일 범주 내 유사한 제품의 기능을 활용할 수 있도록 합니다. 한편 로컬 모델은 단일 시계열에 훈련된 것이기 때문에 독특한 패턴을 포착할 수 있습니다. 시계열 간에 상당한 차이가 있는 경우 로컬 모델이 유용할 수 있습니다.

Temporal Fusion Transformer(TFT) 모델은 글로벌 모델로, 각 시계열을 독립적으로 모델링하는 대신 다른 시계열 간의 관계를 모델링합니다. TFT의 아이디어는 시계열 간의 관계를 모든 시리즈에 걸친 기본 패턴과 트렌드를 포착하는 공유 표현으로 캡처할 수 있다는 것입니다. 모든 시리즈의 결합 분포를 모델링함으로써 TFT는 단일 시계열만 고려하는 로컬 모델로는 모델링하기 어려운 복잡한 패턴과 관계를 포착할 수 있습니다.

TFT 아키텍처에 대한 다음 섹션이 상당히 길다는 점을 알려드리고 싶습니다. 대신 모델링을 학습할 "소프트웨어 요구사항" 섹션으로 건너뛰어보세요. 이후 다시 TFT 아키텍처로 돌아오셔도 됩니다.

TFT 아키텍처

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

(A) 도표는 원본 논문의 TFT 아키텍처를 보여줍니다 [1]. 이 다이어그램이 조금 복잡해 보일 수 있어요. 하나씩 차근차근 블록을 설명해 드릴게요.

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_1.png)

(A) 도표는 아래에서부터 읽어야 해요. 먼저 아래의 입력값부터 시작해요. 그 다음으로 'Variable Selection' 상자를 위로 한 단계 올려 보세요. 그 다음으로 'Encoders' 상자를 위로 한 단계 올려가는 식으로, 계속 해 보세요. 최종 출력은 맨 위에 있는 분위수 예측입니다.

입력 데이터

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

시계열 데이터는 크게 세 가지 유형으로 그룹화될 수 있어요:

- 첫 번째 그룹은 시간이 지나도 변하지 않는 정적 메타데이터입니다. 예를 들어 상점 위치나 제품 카테고리와 같은 정보가 여기에 속해요.
- 두 번째 그룹은 k 기간 전의 입력 데이터에 해당해요.
- 세 번째 그룹은 공휴일 플래그, 요일 또는 월, 예정된 프로모션 이벤트와 같은 다양한 공변수에 해당해요. 우리는 미래를 예측할 것이기 때문에 이러한 공변수들은 t+𝛕 기간까지 준비되어 있거나 알려져 있어야 해요.

변수 선택 네트워크

모든 입력 데이터가 목표 데이터를 예측하는 데 필요하지는 않아요. 변수 선택 네트워크(VSNs)는 어떤 입력 데이터가 예측에 가장 관련성이 있는지를 결정해요. 이는 TFT의 직관적인 설계입니다. VSNs는 각 시간 단계마다 예측에 가장 관련된 입력 데이터 하위 집합을 동적으로 선택해요. 이 동적 기능 선택 메커니즘은 모델이 예측 정확도를 향상시킬 수 있게 해줘요. 그러나 미리 어떤 입력이 목표와 관련이 있는지 또는 선형인지 비선형인지 관계가 명확하지 않아요. 어떻게 관련 입력을 식별할 수 있을까요? VSNs는 모델이 필요에 따라 유연하게 입력 변수를 선택하고 정보를 제거할 수 있게 해줘요. (B) 그림에 Variable Selection Network가 나와요. 각 입력 특징에 대해 게이트된 잔차 네트워크가 있어요. 다이어그램의 "변수 선택 가중치"는 변수 중요도에 대한 가중치입니다. 가중치는 훈련 과정 중에 결정돼요.

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

<img src="/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_2.png" />

GRN을 이해해 봅시다.

게이트된 잔여 네트워크 (GRN)

게이트된 잔여 네트워크 (GRN)는 TFT 전반에서 복잡한 시계열 데이터의 시간적 패턴 및 의존성을 캡처하기 위해 사용됩니다. GRN은 게이트 메커니즘과 잔여 연결을 가지고 있습니다. 게이팅 메커니즘을 통해 모델은 각 레이어에서 다른 특징들의 중요성을 적응적으로 조절할 수 있습니다. 이러한 게이팅 함수는 일반적으로 시그모이드 활성화 함수의 형태를 취하며 0과 1 사이의 값을 생성합니다. 이들은 이전 레이어에서 얼마나 많은 정보가 다음 레이어로 전달되어야 하는지를 결정하며, 필요에 따라 정보를 선택적으로 보존하거나 버릴 수 있도록 합니다.

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

![Temporal Fusion Transformer for Interpretable Time Series Predictions](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_3.png)

Figure (C) has a dashed line for the residual connection. The output of the previous layer(s) is added to the output of the current layer. This mechanism helps address the vanishing gradient problem. Also, with the additions of the outputs of previous and subsequent layers through residual connections, the GRN has mixed the input features and can capture the non-linear interactions between features. That’s why the name “Fusion” was coined.

After explaining the row of VSNs in Figure (A), let’s move up one row to the Static Covariate Encoders, as shown in Figure (D).

![Temporal Fusion Transformer for Interpretable Time Series Predictions](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_4.png)

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

정적 공변량 인코더

그림 (D)의 정적 공변량 인코더는 범주형 정적 공변량을 숫자로 변환합니다. 이 임베딩 프로세스는 자연어 처리의 단어 임베딩과 유사합니다. 각 범주형 변수는 임베딩 공간에 있는 고차원 벡터에 매핑됩니다. 이 임베딩 프로세스는 다양한 범주 간 의미 관계를 포착합니다. 텍스트 표현과 단어 임베딩에 대한 친절한 설명을 제공하는 책 "The Handbook of NLP with Gensim" [3]의 1장에서 3장을 읽는 것이 좋습니다.

LSTM 인코더

18장 "From RNN/LSTM to Temporal Fusion Transformers and Lag-Llama"에서 우리는 시계열 데이터에 대해 Transformer 모델을 직접 사용하지 않는 이유를 설명했습니다. 시계열 데이터와 언어 데이터는 다르기 때문입니다. 시계열 데이터를 어떻게 인코딩할까요? 시계열 데이터는 독특한 시간적 종속성과 패턴을 가지고 있습니다. 그림 (D)에 나타난 TFT의 인코더는 LSTM(Long Short-Term Memory) 네트워크입니다. LSTM 인코더는 순차 데이터를 효과적으로 모델링하는 능력으로 알려진 순환 신경망(RNN) 아키텍처의 일종입니다. LSTM 인코더가 입력 시계열 데이터를 처리할 때, 관련 특징을 추출하고 데이터에 있는 시간적 동적의 의미 있는 표현을 학습합니다.

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

정적 공변량 인코더에서 LSTM 인코더로 향하는 화살표에 대해 알아보셨을 겁니다. Figure (D)에서 보이는 노란색 화살표는 정적 공변량의 수치 표현이 LSTM 인코더 내의 시간적 특성과 연결된다는 것을 의미합니다. 이 연결 과정은 정적 공변량과 시간적 특성 모두로부터 정보를 결합합니다. 이는 모델이 정확한 예측을 위해 시간적 및 정적 정보를 모두 활용할 수 있도록 도와줍니다. 예를 들어 코드 예제에서 정적 공변량 중 하나인 매장(store)이 있습니다. 매장의 매출은 매장 위치에 따라 다를 수 있습니다. 매장 정보를 과거 시간적 특성과 결합하는 것은 모델이 매장별 매출을 정확하게 예측할 수 있도록 유연성을 제공합니다.

LSTM 디코더

LSTM 디코더는 Figure (D)의 오른쪽에 있습니다. 왼쪽 화살표에서 LSTM 인코더의 정보를 가져옵니다. 또한 앞으로의 𝛕 기간을 위한 공변량이 담긴 아래쪽 화살표에서도 정보를 받습니다. LSTM 인코더와 마찬가지로 LSTM 디코더는 데이터 내의 시간 의존성과 패턴을 캡처할 수 있는 능력을 갖추고 있습니다.

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

이제 우리는 Figure (E)에 나와 있는 Figure (A)의 정적 보강으로 이동합시다.

![image](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_5.png)

GRNs를 활용한 정적 보강

LSTM 인코더로부터 입력을 받는 GRN 세트와 LSTM 디코더로부터 입력을 받는 다른 GRN 세트가 있습니다. 두 세트의 GRN은 벡터 형태의 정적 공변량도 입력으로 사용합니다. 다시 말해, GRN의 정적 보강은 TFT가 시간 의존성과 정적 공변량 정보를 결합하여 보다 정확한 예측을 할 수 있도록 합니다.

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

이제 Figure (A)에 표시된 Figure (F)의 Temporal Self-Attention으로 이동해 보겠습니다.

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_6.png)

Temporal Multi-head Self-Attention

Temporal self-attention 메커니즘은 모델이 동일한 입력 시퀀스에서 다른 시간 단계에 주의를 기울이도록하고 그들 사이의 복잡한 관계를 학습할 수 있게 합니다. Temporal self-attention 메커니즘은 transformer 아키텍처에서 사용되는 표준 self-attention 메커니즘과 유사하게 작동합니다. 입력 시퀀스의 각 시간 단계에서 temporal self-attention 메커니즘은 입력 시퀀스를 인코딩할 때 각 시간 단계에 얼마나 집중해야하는지 결정하는 attention weights를 계산합니다. 예측 작업에 더 관련이 있거나 정보를 전달하는 시간 단계는 더 높은 attention weights를 받고, 덜 관련이있는 시간 단계는 더 낮은 attention weights를 받습니다. 이러한 weights는 TFT가 모델 해석력을 수행하는 데 필요한 구성 요소입니다. 코드 예제에서 self-attention weights를 시각화하는 방법을 살펴보겠습니다.

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

셀프 어텐션 매커니즘은 멀티헤드입니다. 이것은 모델이 입력 시퀀스의 다양한 측면에 동시에 주의를 기울일 수 있도록 합니다. 단일 셀프 어텐션은 동일한 시계열 세그먼트 내의 일부에 주의를 기울이는 것을 의미합니다. 마찬가지로, 한 번만 주의를 계산하는 대신 멀티헤드는 모델이 여러 번 동시에 주의를 계산할 수 있도록 합니다. 각 어텐션 헤드는 입력 시퀀스 내에서 다른 유형의 관계를 포착하기 위한 고유한 어텐션 가중치 집합을 학습합니다. 여러 어텐션 헤드를 사용함으로써 모델은 다양한 패턴과 종속성을 더 효과적으로 포착할 수 있습니다.

그 다음, Figure (A)에 있는 Position-wise Feed-forward Network로 이동해 보겠습니다. Figure (G)에 표시된 것입니다.

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_7.png)

Position-wise Feed-forward Network

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

전통적인 피드포워드 네트워크와 달리 TFT(Temporary Fluctuations in Temperature)의 위치별 FFN은 입력 시퀀스의 각 위치를 독립적으로 처리합니다. 이 위치별 처리는 모델이 입력 시퀀스 내에서 위치별 정보 및 상호 작용을 포착할 수 있도록 합니다. 피드포워드 네트워크는 비선형 활성화 함수(예: ReLU 또는 GELU)를 적용합니다.

추가 & 정규화

"추가 & 정규화" 블록이 몇 개 있습니다. "추가 & 정규화" 기술은 TFT 모델의 교육 안정성과 수렴 속도를 향상시킵니다. "추가" 작업의 목적은 모델이 입력으로부터 원래 정보를 유지하면서 출력으로부터 변환된 정보를 통합하는 것입니다. 레이어의 출력에 입력을 추가함으로써 모델은 원래 정보가 변환 과정 전체에서 보존되도록 보장할 수 있습니다. 이는 기울기 소멸 문제를 완화하는 데 도움이 됩니다.

다중 기간에 대한 분위 회귀 출력

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

마지막으로, 모델은 동시에 여러 미래 시간 단계에 대한 분위수 예측을 생성합니다. 분위 회귀는 다양한 불확실성 수준을 양적화하기 위해 여러 분위수(예: 10, 50, 90 백분위수)를 추정합니다. 그림 (D)에 설명된 것처럼, 이 부분은 "다중 기간 확률적 예측을 위한 선형 회귀"와 "다중 기간 시계열 확률적 예측을 위한 Tree-based XGB, LightGBM 및 CatBoost 모델"의 분위 회귀 기법과 동일합니다.

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_8.png)

최적화

TFT의 최적화 알고리즘은 표준 신경망 알고리즘입니다. 확률적 경사 하강법(SGD)이나 그 변형을 사용합니다. 실제 값과 예측 값 사이의 손실 함수를 정의합니다. 역전파를 사용하여 모델 매개변수에 대한 손실의 그래디언트를 계산합니다. 그래디언트는 학습률로 모수를 업데이트하는 데 사용되며, 학습률은 단계 크기를 결정합니다. 미니 배치 학습은 학습 속도를 높이고 일반화를 향상시키기 위해 사용됩니다. 오버피팅을 방지하기 위해 L1 또는 L2 정칙화와 같은 정칙화 기법을 적용할 수 있습니다. 학습률 스케줄링을 통해 학습률을 시간에 따라 조정합니다. 최적화 알고리즘은 이러한 단계를 반복적으로 수행하며 최대 에폭 수나 원하는 성능 수준과 같은 중지 기준을 충족할 때까지 작동합니다.

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

실제 데이터 케이스를 사용하여 TFT 모델을 구축해 보겠습니다. Python 노트북은 이 Github 링크를 통해 다운로드할 수 있습니다.

소프트웨어 요구 사항

Darts Python 라이브러리를 설치해야 합니다. 이 책은 Darts 데이터 형식을 설명하는 "시계열 데이터 형식을 쉽게 만드는 방법" 장을 별도로 제공합니다. 또한 이 책은 다음 장에서 Darts를 자세히 설명합니다:

- 시계열 데이터 형식을 쉽게 만드는 방법
- 다중 기간 확률 예측을 위한 선형 회귀
- 다중 기간 시계열 확률 예측을 위한 Tree-based XGB, LightGBM 및 CatBoost 모델
- 응용: 아마존의 DeepAR을 활용한 주식 예측

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

필요한 라이브러리를 가져오겠습니다.

```js
import pandas as pd
import numpy as np
from datetime import timedelta
import matplotlib.pyplot as plt

from darts import TimeSeries
from darts.dataprocessing.pipeline import Pipeline
from darts.models import TFTModel
from darts.dataprocessing.transformers import Scaler
from darts.utils.timeseries_generation import datetime_attribute_timeseries
from darts.utils.likelihood_models import QuantileRegression
from darts.dataprocessing.transformers import StaticCovariatesTransformer, MissingValuesFiller
```

데이터 준비

에콰도르의 Favorita 스토어에서의 상점 매출 데이터를 사용할 것입니다. 이 데이터셋은 Kaggle에서 제공됩니다. 데이터셋에는 체인 스토어에서 판매되는 수천 가지 제품 군이 포함되어 있습니다. 훈련 데이터에는 날짜, 상점 및 제품 정보, 해당 제품이 프로모션 중인지 여부, 그리고 매출 숫자가 포함되어 있습니다. 추가 파일에는 모델을 구축하는 데 유용할 수 있는 보조 정보가 포함되어 있습니다.

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

아래 코드는 여러 파일을 병합합니다.

```js
# CSV 파일 읽기
path = 'data/store-sales-time-series-forecasting'
data = pd.read_csv(path + '/train.csv', delimiter=",")
holidays = pd.read_csv(path + '/holidays_events.csv', delimiter=",").drop('type', axis=1)
stores = pd.read_csv(path + '/stores.csv', delimiter=",")
transactions = pd.read_csv(path + '/transactions.csv', delimiter=",")
# 파일 병합
holidays['holiday_flag'] = 1
data = data.merge(holidays, on='date', how='left')
data = data.merge(stores, on='store_nbr', how='left')
data = data[data['date'] != '2013-01-01'] # 잘못된 데이터
data = data.merge(transactions, on=['date', 'store_nbr'], how='left')
# 기본 데이터 조작
data['date'] = pd.to_datetime(data["date"])
data = data.drop_duplicates(subset=['date','store_nbr', 'family'], keep='last')
data.loc[data['holiday_flag'].isna(),'holiday_flag'] = 0
data['year'] = data['date'].dt.year
data.columns
```

데이터에는 다음과 같은 열이 있습니다:

- store_nbr: 상점 번호
- family: 제품 패밀리
- sales: 상품 패밀리의 상점 및 날짜별 총 매출
- onpromotion: 상품 패밀리 중 특정 날짜에 할인된 제품의 총 수
- holiday_flag: 휴일 플래그

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

데이터에는 각 매장의 제품이 시계열 데이터이기 때문에 수백 개의 시계열이 있습니다. 설명을 위해, 우리는 전역 모델을 구축하기 위해 네 개의 가장 큰 매장과 네 개의 가장 큰 제품 카테고리를 선택할 것입니다. 앞서 언급한 코드는 16개의 시계열 데이터를 선택한 다음 이를 훈련 및 테스트 데이터로 분할합니다.

데이터 변환을 Darts로

여러 시계열을 위한 전역 모델을 구축하려면 다수의 시계열을 포함하는 데이터를 구조화해야 합니다. 이는 "Time Series Data Formats Made Easy" 장에서 설명된대로 Darts에 의해 편리하게 처리됩니다. 시계열의 가장 세부 레벨은 매장 및 제품 카테고리 수준이므로 "store_nbr" 및 "family"로 그룹화를 지정합니다. 이 두 변수는 단순히 그룹화 변수뿐만 아니라 예측 변수로도 사용될 수 있습니다. 예를 들어 특정 매장이나 제품 카테고리가 다른 매장이나 제품 카테고리보다 더 많이 팔릴 수 있습니다. 이 두 변수는 매장 및 제품별 정보를 포착할 수 있습니다.

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

```js
TIME_COL = "date";
TARGET = "sales";
STATIC_COLS = ["store_nbr", "family"];
FREQ = "D";
FORECAST_HORIZON = test["date"].nunique();
COVARIATES = ["onpromotion", "holiday_flag"];
SCALER = Scaler();
TRANSFORMER = StaticCovariatesTransformer();
PIPELINE = Pipeline([SCALER, TRANSFORMER]);
```

타겟은 "sales"이고, 공변량은 "onpromotion"과 "holiday_flag"입니다. Darts의 .from_group_dataframe() 함수는 누락된 값이나 값을 외삽화할 수 있는 편리한 도구입니다.

```js
# 학습 및 테스트 데이터셋을 읽고 변환합니다
train_darts = TimeSeries.from_group_dataframe(df=train,
                                              group_cols=STATIC_COLS,
                                              time_col=TIME_COL,
                                              value_cols=TARGET,
                                              freq=FREQ,
                                              fill_missing_dates=True,
                                              fillna_value=0)
test_darts = TimeSeries.from_group_dataframe(df=test,
                                             group_cols=GROUP_COLS,
                                             time_col=TIME_COL,
                                             value_cols=TARGET,
                                             freq=FREQ,
                                             fill_missing_dates=True,
                                             fillna_value=0)

[len(train_darts[0]), len(test_darts[0])] # [561, 32]는 학습 데이터와 테스트 데이터의 기간 수입니다
```

시간 인덱스에는 많은 숨은 정보가 포함되어 있습니다. 특정 이벤트가 특정 날에 발생할 수 있습니다. 예를 들어, 고객들은 주말에 일반적으로 더 많이 쇼핑하며, 여름 달은 보통 야외 제품에 대한 수요가 더 많습니다. 시간 인덱스를 사용하여 더 많은 공변량을 생성할 수 있습니다. 앞에서 제공한 코드는 연도의 12개월과 52주에 대한 지표를 생성합니다.

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

```js
create_covariates = []
for ts in train_darts:
    # 월과 주를 공선변수로 추가
    covariate = datetime_attribute_timeseries(
        ts,
        attribute="month",
        one_hot=True,
        cyclic=False,
        add_length=FORECAST_HORIZON,
    )
    covariate = covariate.stack(
        datetime_attribute_timeseries(
            ts,
            attribute="week",
            one_hot=True,
            cyclic=False,
            add_length=FORECAST_HORIZON,
        )
    )
    store = ts.static_covariates['store_nbr'].item()
    family = ts.static_covariates['family'].item()

    # 공선변수 생성
    other_cov = TimeSeries.from_dataframe(data[(data['store_nbr'] == store) & (data['family'] == family)], time_col=TIME_COL, value_cols=COVARIATES, freq=FREQ, fill_missing_dates=True)
    covariate = covariate.stack(MissingValuesFiller().transform(other_cov))

    create_covariates.append(covariate)

create_covariates[0].columns

#Index(['month_0', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5',
#       'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11',
#       'week_0', 'week_1', 'week_2', 'week_3', 'week_4', 'week_5', 'week_6',
#       'week_7', 'week_8', 'week_9', 'week_10', 'week_11', 'week_12',
#       'week_13', 'week_14', 'week_15', 'week_16', 'week_17', 'week_18',
#       'week_19', 'week_20', 'week_21', 'week_22', 'week_23', 'week_24',
#       'week_25', 'week_26', 'week_27', 'week_28', 'week_29', 'week_30',
#       'week_31', 'week_32', 'week_33', 'week_34', 'week_35', 'week_36',
#       'week_37', 'week_38', 'week_39', 'week_40', 'week_41', 'week_42',
#       'week_43', 'week_44', 'week_45', 'week_46', 'week_47', 'week_48',
#       'week_49', 'week_50', 'week_51', 'onpromotion', 'holiday_flag'],
#      dtype='object', name='component')
```

어떻게 보이나요? Darts 데이터를 다시 Pandas 데이터 프레임으로 변환하여 확인할 수 있습니다. 이들은 단순한 이진 지표들입니다.

```js
TimeSeries.pd_dataframe(create_covariates[0]).tail();
```

<img src="/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_9.png" />

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

마찬가지로, 대상 데이터 "sales"를 Pandas 데이터 프레임으로 변환하여 살펴볼 수 있습니다:

```js
TimeSeries.pd_dataframe(train_darts[15]).tail();
```

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_10.png)

모델링 전에 데이터를 표준화하려고 합니다. 이는 많은 데이터 과학 모델에서 흔한 실천법입니다. 앞의 코드는 훈련 데이터에 따라 스케일러를 작성합니다. 이 스케일러는 나중에 테스트 데이터에 적용될 것입니다. 입문자가 훈련 및 테스트 데이터를 독립적으로 스케일링하는 실수를 저지를 수 있습니다. 이러한 오류를 피하고 싶다면 "경력에 영향을 줄 수 있는 치명적인 모델링 실수를 피하세요"라는 게시물을 참조할 수 있습니다.

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

```js
# 데이터 스케일링 및 정적 공변량 변환
# PIPELINE에 SCALER이 포함되어 있기 때문에 SCALER이 먼저 온다.
train_transformed = PIPELINE.fit_transform(train_darts)
# 공변량 스케일링
covariates_transformed = SCALER.fit_transform(create_covariates)
```

이제 모델을 구축해 봅시다.

모델링

모델 선언은 일반 신경망 하이퍼파라미터와 시계열 특정 하이퍼파라미터를 포함합니다. 가독성을 높이기 위해 하이퍼파라미터를 다음과 같이 그룹화했습니다:

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

- 데이터 준비를 위한 하이퍼파라미터: 이 그룹은 코드에서 input_chunk_length와 output_chunk_length를 가리킵니다. 이들은 단변량 시리즈에서 샘플을 생성하는 데 관련됩니다. 설명을 위해, 도식 (G)은 y0부터 y15까지의 시리즈에서 생성된 샘플을 보여줍니다. 각 샘플은 입력 청크와 출력 청크를 포함합니다. 입력 청크의 길이가 5이고 출력 청크의 길이가 2라고 가정합시다. 첫 번째 샘플은 입력 청크로 y0 ~ y4를, 출력 청크로 y5, y6을 갖습니다. 시리즈를 따라 창이 이동하여 시리즈의 끝까지 샘플을 생성합니다.

![이미지](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_11.png)

- 시계열을 위한 하이퍼파라미터: 예측 구간을 생성하기 위해 분위 회귀를 사용할 것입니다. 이것은 모델이 예측 불확실성을 생성하는 데 중요한 기능입니다.
- 모델 아키텍처를 위한 하이퍼파라미터: 숨겨진 레이어 수, 어텐션 헤드 수, LSTM 레이어 수를 포함한 모델 스펙을 다양하게 조정할 수 있습니다.
- 최적화를 위한 하이퍼파라미터: 이는 표준 신경망 하이퍼파라미터입니다. 이러한 하이퍼파라미터에 대한 설명은 별지에 추가했습니다.

```js
TFT_params = {
    # 데이터 준비를 위한 하이퍼파라미터
    "input_chunk_length": 52, # 과거를 바라보는 주 수
    "output_chunk_length": FORECAST_HORIZON,

    # 시계열 하이퍼파라미터
    "likelihood": QuantileRegression(quantiles=[0.25, 0.5, 0.75]),

    # 모델 아키텍처를 위한 하이퍼파라미터
    "use_static_covariates": True,
    "hidden_size": 4,
    "lstm_layers": 4,
    "num_attention_heads": 4,

    # 최적화를 위한 하이퍼파라미터
    "dropout": 0.1,
    "batch_size": 16,
    "n_epochs": 60,
    "random_state": 42,
    "optimizer_kwargs": {"lr": 1e-3},
}

tft_model = TFTModel(**TFT_params)
tft_model.fit(train_transformed, # 훈련 기간
              future_covariates=covariates_transformed, # 전체 기간
              verbose=False)
```

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

모델이 훈련되면 예측에 사용할 것입니다.

예측

예측 단계는 간단합니다. 기억해야 할 한 가지는 "future_covariates"입니다. 이미 미래 공변량을 포함하고 있으며, 월 1-12, 주 1-52 및 휴일 플래그와 같은 다른 알려진 공변량을 포함합니다. 또한, 외부에서 가져올 "onpromotion" 플래그와 같은 여러 다른 공변량도 포함됩니다.

예측된 값은 스케일된 값입니다. 스케일된 값을 다시 원래 스케일로 역변환하는 것을 기억해 주세요.

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

```js
# 스케일링된 예측값을 가져옵니다
scaled_pred = tft_model.predict(n=FORECAST_HORIZON,
                                series=train_transformed, # 훈련 기간
                                num_samples=50,
                                future_covariates=covariates_transformed # 전체 기간
                               )

# 스케일링된 예측값을 일반 스케일로 변환합니다
prediction = PIPELINE.inverse_transform(scaled_pred)
```

지금까지 우리는 우리가 다루는 글로벌 모델을 완성하고 불확실성을 고려한 예측을 제공했습니다.

플로팅

실제 매출, 예상 매출 및 25% 및 75%의 예측 구간을 플롯팅해 봅시다. 아래 함수는 상점의 4가지 제품 패밀리를 플롯팅합니다.

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

```python
def plot_it():
    fig, axs = plt.subplots(2, 2, figsize=(10, 6), dpi=100)
    ax0 = axs[0,0]
    ax1 = axs[0,1]
    ax2 = axs[1,0]
    ax3 = axs[1,1]

    plt.suptitle("Store:" +  str(store) , fontsize=12)

    val0[: pred0.end_time()].plot(ax=ax0, label="actual", marker='o', linewidth=1)
    pred0.plot(ax = ax0, low_quantile=0.25, high_quantile=0.75, label="prediction", marker='o',linewidth=1,alpha=0.2 )
    ax0.title.set_text('Product: '+family[0])

    val1[: pred1.end_time()].plot(ax=ax1, label="actual", marker='o', linewidth=1)
    pred1.plot(ax = ax1, low_quantile=0.25, high_quantile=0.75, label="prediction", marker='o',linewidth=1,alpha=0.2 )
    ax1.title.set_text('Product: '+family[1])

    val2[: pred2.end_time()].plot(ax=ax2, label="actual", marker='o', linewidth=1)
    pred2.plot(ax = ax2, low_quantile=0.25, high_quantile=0.75, label="prediction", marker='o',linewidth=1,alpha=0.2 )
    ax2.title.set_text('Product: '+family[2])

    val3[: pred3.end_time()].plot(ax=ax3, label="actual", marker='o', linewidth=1)
    pred3.plot(ax = ax3, low_quantile=0.25, high_quantile=0.75, label="prediction", marker='o',linewidth=1,alpha=0.2 )
    ax3.title.set_text('Product: '+family[3])
    fig.tight_layout()
    plt.show()


store_nbr = [44, 45, 47, 3]
family = ['GROCERY I', 'BEVERAGES', 'PRODUCE', 'CLEANING']

for i in range(0,16,4):
    k = int(i/4)
    store = store_nbr[k]
    pred0 = prediction[i]
    pred1 = prediction[i+1]
    pred2 = prediction[i+2]
    pred3 = prediction[i+3]
    val0 = test_darts[i]
    val1 = test_darts[i+1]
    val2 = test_darts[i+2]
    val3 = test_darts[i+3]
    plot_it()
```

아래 4개의 그림은 가게 44와 45의 GroceryI 및 Beverages 제품군에 대한 실제 값과 예측 값입니다.

![image](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_12.png)

![image](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_13.png)

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

TFT의 중요한 기능 중 하나는 모델 해석 가능성입니다. 함께 알아봐요.

모델 해석 가능성

TFT는 자기 주의 메커니즘을 통해 해석 가능성을 제공합니다. 자기 주의 메커니즘은 예측을 할 때 입력 시퀀스의 서로 다른 부분에 주의를 기울입니다. 특정 기능이나 시간 단계에 주의를 기울여 모델이 예측 과정에서 상대적인 중요성을 강조할 수 있습니다. 이를 통해 예측을 이끄는 근본적인 요소를 이해하고 데이터에 대한 통찰력을 얻을 수 있습니다. 이를 수행하기 위해 TFTExplainer() 함수를 사용할 것입니다.

```js
from darts.explainability import TFTExplainer

explainer = TFTExplainer(
    tft_model,
    background_series=train_transformed[1],
    background_future_covariates=dynamic_covariates_transformed[1],
)
explainability_result = explainer.explain()
```

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

몇 분은 "explainer" 함수 이름이 SHAP 값의 explainer 함수와 달라 보일 수 있습니다. 비록 다른 기능을 하지만, 모델 자체를 설명하는 데 동일한 목표를 가지고 있습니다. SHAP explainer나 기타 기술은 "설명 가능한 AI에 대한 설명"과 "설명 가능한 AI" 책에서 찾을 수 있습니다.

이제 주의 가중치를 시각화할 준비가 되었습니다. 이러한 시각화는 다른 변수나 시간 단계간의 패턴과 관계를 확인할 수 있습니다. 첫 번째 변수 중요도 차트는 인코더 중요도입니다.

인코더 변수 중요도는 각 입력 변수가 예측의 정확성에 얼마나 기여하는지를 측정합니다. 이는 모델이 각 시간 단계에서 가장 관련성 있는 입력 변수에 초점을 맞출 수 있도록 해주는 주의 메커니즘을 사용하여 계산됩니다.

```python
plt.rcParams["figure.figsize"] = (10,5)
plt.barh(data=explainer._encoder_importance.melt().sort_values(by='value').tail(10), y='variable', width='value')
plt.xlabel('중요도')
plt.ylabel('특성')
plt.title('Encoder 중요도')
plt.show()
```

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

![TFT Model](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_14.png)

TFT 모델에서 디코더는 여러 계층으로 구성되어 있으며, 각 계층은 셀프 어텐션 메커니즘 다음에 피드 포워드 신경망(FFNN)이 이어집니다. 셀프 어텐션 메커니즘을 통해 모델은 입력 시퀀스의 여러 부분에 주의를 기울이고 출력 시퀀스를 생성할 때 그 중요성을 가중 평가할 수 있습니다. FFNN은 셀프 어텐션 메커니즘의 출력을 처리하고 현재 시간 단계의 최종 출력을 생성합니다.

다음으로 중요한 변수 그래프가 디코더 중요도 차트입니다. 디코더 변수 중요도는 모델이 입력 시퀀스를 활용하여 출력 시퀀스를 생성하는 방식을 이해하는 데 유용합니다. 디코더 변수 중요도는 디코더의 각 변수에 할당된 어텐션 가중치를 분석하여 계산됩니다. 어텐션 가중치를 사용하여 각 변수의 중요도 점수가 계산되며, 이는 출력 시퀀스를 생성할 때 디코더에서 변수가 얼마나 중요한지 나타냅니다. 중요도 점수는 다음과 같이 계산됩니다:

중요도 점수 = ∑ (어텐션 가중치 \* 어텐션 헤드의 중요성)

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

```js
plt.rcParams["figure.figsize"] = (10, 5);
plt.barh(
  (data = explainer._decoder_importance
    .melt()
    .sort_values((by = "value"))
    .tail(10)),
  (y = "variable"),
  (width = "value")
);
plt.xlabel("중요도");
plt.ylabel("특성");
plt.title("디코더 중요도");
plt.show();
```

위 출력에서 "month5", "week_39", "week_29" 등이 상위 입력 변수로 표시됩니다.

<img src="/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_15.png" />

모델의 두 정적 변수의 효과를 검토할 수 있습니다. 그래프에서 "family"가 "store"보다 상대적으로 중요한 지표임을 보여줍니다.

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

```js
plt.rcParams["figure.figsize"] = (10, 5);
plt.barh(
  (data = explainer._static_covariates_importance
    .melt()
    .sort_values((by = "value"))
    .tail(10)),
  (y = "variable"),
  (width = "value")
);
plt.xlabel("중요도");
plt.ylabel("특성");
plt.title("고정 Cov 중요도");
plt.show();
```

<img src="/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_16.png" />

TFT 모델에서는 다중 헤드 어텐션이라는 기술을 사용하여 주의 시각화가 이루어집니다. 다중 헤드 어텐션을 통해 모델은 서로 다른 표현 공간에서 서로 다른 위치의 정보를 동시에 고려할 수 있습니다. 주의 가중치는 학습 중에 학습되고 입력 순서의 가중 합을 계산하는 데 사용되며, 그것은 비선형 활성화 함수를 통해 출력을 생성하기 위해 전달됩니다.

미래 예측을 위한 주의 가중치를 시각화할 수도 있습니다. 그림(F)은 피라미드의 빛 굴절과 같은 그래프로, 미래를 위한 주의 가중치를 보여줍니다. 가까운 미래에 대한 예측은 더 높은 주의 가중치를 가지며, 먼 미래에 대한 예측은 더 낮은 주의 가중치를 가집니다.

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

```js
explainer.plot_attention(explainability_result, (plot_type = "all"), (show_index_as = "time"));
```

![Image](/assets/img/2024-06-22-TemporalFusionTransformerforInterpretableTimeSeriesPredictions_17.png)

내 하드웨어

TFT는 계산 성능을 요구합니다. 저는 TFT를 Apple 2020 Mac Mini M1 칩 (8GB RAM, 512GB SSD 저장 용량)에서 실행했습니다. TFT를 세밀하게 조정하고 Figure (H) 및 (I)를 얻기 위해 더 나아가 데이터를 두 가게와 두 제품 패밀리로 제한하여 최대 60회 에포크까지 실행했습니다.

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

결론

이 장에서는 Temporal Fusion Transformer (TFT) 기술을 설명했습니다. 이 장은 Temporal Fusion Transformer의 네 가지 중요한 측면을 강조했습니다: Multi-Horizon Forecasting, Interpretability, Temporal Fusion Mechanism 및 Transformer Architecture. 이 장은 공변량을 사용하여 전역 모델을 구축하는 방법을 보여주었습니다. 그런 다음 TFT의 모델 해석 특성에 대한 설명을 제공했습니다.

부록

TFT는 신경망 모델이므로 표준 신경망 하이퍼파라미터를 사용합니다. 여기서 "드롭아웃", "배치 크기" 및 "에포크" 개념을 이해하게 될 것입니다.

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

드롭아웃

신경망에서 드롭아웃은 오버피팅을 방지하고 모델의 일반화 성능을 향상시키는 정규화 기술입니다. 오버피팅은 모델이 훈련 데이터에 너무 꼭 맞아 맞춰져, 새로운 보이지 않는 데이터에서 성능이 나빠지는 현상을 말합니다.

드롭아웃은 훈련 중에 층(layer) 내의 일부 뉴런(neuron)을 사용자가 지정한 확률로 랜덤하게 제거하면서 동작합니다. 이는 제거된 뉴런을 대체하기 위해 나머지 뉴런이 더 견고한 특징을 학습하도록 만듭니다.

테스트 중에는 드롭아웉되지 않은 상태로 모든 뉴런이 사용됩니다. 제거된 뉴런은 실제로 네트워크에서 제거되지 않으므로, 이는 특정 세트의 뉴런에 의존하지 않고 예측을 만드는 데 도움이 됩니다. 이를 통해 오버피팅을 방지할 수 있습니다.

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

드롭아웃률, 즉 뉴런이 중단되는 확률은 일반적으로 0.1과 0.5 사이로 설정됩니다. 높은 드롭아웃률은 일반화 성능을 개선할 수 있지만, 학습 중에 일부 뉴런이 효과적으로 네트워크에서 제거되어 모델 용량이 감소할 수도 있습니다.

배치 크기

배치 크기는 학습 프로세스의 각 반복에서 한 번의 전진 및 후진 패스를 통해 처리되는 훈련 예제의 수를 나타냅니다. 학습 중에 신경망은 다양한 입력 예제를 제시받는데, 각 입력은 네트워크를 통해 전달되어 출력을 계산합니다. 그런 다음 예측된 출력과 실제 출력 간의 차이에 기초하여 네트워크의 매개변수가 조정됩니다. 이와 같은 과정을 역전파라고합니다.

배치 크기는 각 반복에서 매개변수를 업데이트하는 데 사용되는 입력 예제의 수를 결정합니다. 더 큰 배치 크기는 기울기의 더 신뢰할 수있는 추정을 제공할 수 있으며, 학습 프로세스의 정확성과 안정성을 향상시킬 수 있습니다. 그러나 큰 배치 크기는 더 많은 메모리 및 계산 리소스가 필요하므로 특정 응용 프로그램에는 제한이 될 수 있습니다.

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

제가 설명하는 방법은 베이킹 스토리를 사용하여 신경망의 배치 크기 개념을 설명하는 것을 좋아해요. 상상해봐요, 베이킹을 원하는 많은 쿠키 반죽이 있다고 해봅시다. 이 쿠키를 작은 배치 또는 큰 배치로 베이킹할 수 있어요. 한 번에 큰 배치로 쿠키를 베이킹하면 굉장히 오랜 시간이 걸릴 거예요 (ㅋㅋ). 쿠키를 8개 또는 16개 배치로 나눌 수 있어요. 몇 가지 훈련 예시를 한 번에 처리할 수 있어요. 이렇게 하면 모델 매개변수를 더 자주 업데이트할 수 있고, 기울기는 각 작은 배치 후에 계산되고 적용됩니다. 이는 보다 빠른 수렴과 더 자주 무게 업데이트를 가져올 수 있지만, 샘플 크기가 작아서 매개변수 업데이트에 더 많은 노이즈가 발생할 수도 있어요.

에포크

에포크는 전체 훈련 데이터 세트를 한 번 통과하는 것을 의미해요. 각 에포크 동안 신경망은 훈련 데이터 세트의 각 예시를 예측하고 예측된 값과 실제 값 사이의 오차에 따라 가중치와 바이어스를 업데이트해요.

책 "이미지 분류를 위한 전이 학습"에서는 1,000개의 이미지 데이터 세트로 에포크 개념을 설명해요. 각 에포크 중에 신경망은 1,000개의 이미지 각각을 예측하고 예측된 값과 실제 값 사이의 오차에 따라 가중치와 바이어스를 업데이트해요. 이 프로세스는 일정한 횟수의 에포크 동안 반복되어 신경망이 전체 훈련 데이터 세트를 여러 번 보게 될 때까지 지속돼요.

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

에포크의 수는 신경망이 전체 학습 데이터 세트를 몇 번 보게 될지를 결정합니다. 에포크 수가 너무 낮으면, 신경망은 데이터의 기저 패턴을 배울 충분한 기회가 없을 수 있으며, 정확하지 않은 예측을 할 수 있습니다. 반면에, 에포크 수가 너무 높으면, 신경망은 학습 데이터에 오버피팅될 수 있으며, 새로운 보이지 않는 데이터에 대해 정확하지 않은 예측을 할 수 있습니다.

참고 자료

- [1] Lim, B., Arik, S.Ö., Loeff, N., & Pfister, T. (2019). Temporal Fusion Transformers for Interpretable Multi-horizon Time Series Forecasting. ArXiv, abs/1912.09363.
- [2] Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems (p./pp. 5998–6008).
- [3] Kuo, C. (2023). The Handbook of NLP with Gensim: Leverage topic modeling to uncover hidden patterns, themes, and valuable insights within textual data. Packt Publishing.

샘플 eBook 장(chapter) 무료 다운로드: [https://github.com/dataman-git/modern-time-series/blob/main/20240522beauty_TOC.pdf](https://github.com/dataman-git/modern-time-series/blob/main/​20240522beauty_TOC.pdf)

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

- 아름다운 형식으로 책을 재현해준 The Innovation Press, LLC의 직원들에게 감사드립니다. 즐거운 독서 경험을 위해 Teachable 플랫폼을 선택하고 전 세계 독자들에게 분배하였습니다. 신용 카드 거래는 Teachable.com이 신뢰성 있고 안전하게 처리합니다.

Teachable.com에서의 eBook: $22.50
https://drdataman.teachable.com/p/home

Amazon.com의 인쇄판: $65
https://a.co/d/25FVsMx

- 인쇄판은 광택 처리된 표지, 컬러 인쇄 및 아름다운 Springer 글꼴과 레이아웃을 채택하여 즐길 수 있는 독서를 제공합니다. 7.5 x 9.25 인치의 크기로 대부분의 책장에 맞습니다.
- "이 책은 시계열 분석과 예측 분석, 이상 감지에 대한 깊은 이해를 보여주는 Kuo의 증명서입니다. 이 책은 독자들이 현실 세계의 과제에 대처하는 데 필요한 기술을 제공합니다. 데이터 과학으로의 경력 전환을 원하는 사람들에게 특히 가치 있습니다. Kuo는 전통적이고 첨단 기술을 자세히 탐구합니다. Kuo는 최신 동향과 분야의 최신 발전을 반영하기 위해 신경망 및 기타 고급 알고리즘에 대한 토론을 통합합니다. 이를 통해 독자들이 확립된 방법뿐만 아니라 데이터 과학 분야의 가장 최신이고 혁신적인 기술과 소통할 준비가 되어 있음을 보장합니다. 이 책의 명확성과 접근성은 Kuo의 매력적인 글쓰기 스타일에 의해 향상됩니다. 그는 복잡한 수학적 및 통계적 개념을 해독하여 엄격성을 희생하지 않고 접근 가능하게 만들었습니다."

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

# 모던 시계열 예측: 예측 분석과 이상 감지를 위한

제로장: 서문

제1장: 소개

제2장: 비즈니스 예측을 위한 선지자

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

## Chapter 3: 튜토리얼 I: 추세 + 계절성 + 휴일 및 이벤트

## Chapter 4: 튜토리얼 II: 추세 + 계절성 + 휴일 및 이벤트 + 자기회귀(AR) + 지연 회귀자 + 미래 회귀자

## Chapter 5: 시계열의 변곡점 탐지

## Chapter 6: 시계열 확률 예측을 위한 몬테카를로 시뮬레이션

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

# 제 7장: 시계열 확률적 예측을 위한 분위 회귀

# 제 8장: 시계열 확률적 예측을 위한 적응형 예측

# 제 9장: 시계열 확률적 예측을 위한 적응형 분위 회귀

# 제 10장: 자동 ARIMA!

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

# 챕터 11: 시계열 데이터 형식 간단히

# 챕터 12: 다중 기간 확률 예측을 위한 선형 회귀

# 챕터 13: 트리 기반 시계열 모델용 특성 공학

# 챕터 14: 다중 기간 시계열 예측을 위한 주요 두 가지 전략

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

15장: Tree 기반 XGB, LightGBM 및 CatBoost 모델을 활용한 다기간 시계열 확률 예측

16장: 시계열 모델링 기법의 진화

17장: 시계열 확률 예측을 위한 Deep Learning 기반 DeepAR

18장: 응용 – 주식 가격에 대한 확률 예측

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

# 19장: RNN에서 트랜스포머 기반 시계열 모델로

# 20장: 해석 가능한 시계열 예측을 위한 Temporal Fusion Transformer

# 21장: 시계열 예측을 위한 오픈 소스 Lag-Llama 튜토리얼
