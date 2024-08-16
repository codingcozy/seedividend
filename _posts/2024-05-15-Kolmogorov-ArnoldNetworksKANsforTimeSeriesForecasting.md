---
title: "Kolmogorov-Arnold Networks KANs를 사용한 시계열 예측"
description: ""
coverImage: "/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_0.png"
date: 2024-05-15 11:39
ogImage: 
  url: /assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_0.png
tag: Tech
originalTitle: "Kolmogorov-Arnold Networks (KANs) for Time Series Forecasting"
link: "https://medium.com/towards-data-science/kolmogorov-arnold-networks-kans-for-time-series-forecasting-9d49318c3172"
isUpdated: true
---





![링크](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_0.png)

다층 퍼셉트론(MLP)은 딥러닝 모델의 기본적인 구조 중 하나입니다. 이는 N-BEATS, NHiTS 및 TSMixer와 같은 최신 예측 모델의 기본 구성 요소도 됩니다.

2024년 4월 30일에 KAN: Kolmogorov-Arnold Network 논문이 발표되었으며, 많은 딥러닝 분야의 전문가들의 주목을 끌었습니다. 여기서 저자들은 MLP의 대안으로 콜모고로프-아놀드 네트워크 또는 KAN을 제안합니다.

가중치와 고정 활성화 함수를 사용하는 대신, KAN은 스플라인으로 매개변수화 된 학습 가능한 함수를 사용합니다. 연구자들은 KAN이 MLP보다 더 적은 학습 가능한 매개변수로 더 정확할 수 있다고 제안합니다.




이 글에서는 우리가 KAN의 아키텍쳐와 주요 요소를 이해하는 데 도움이 되는 스플라인에 대해 먼저 살펴보겠습니다. 그런 다음, 우리는 KAN의 내부 작동 방식을 자세히 살펴보겠습니다. 마지막으로, 우리는 KAN을 시계열 예측에 적용하고 표준 MLP 및 N-BEATS 모델과의 성능을 평가할 것입니다.

더 자세한 내용은 KAN에 대한 원본 논문을 읽어보세요.

시작해봅시다!

# 스플라인 방문



스플라인은 콜모고로프-아놀드 네트워크의 핵심이기 때문에 이를 이해하는 데 시간을 투자해봅시다.

스플라인은 다항식으로 조각조각 나누어진 함수로 간단하게 정의됩니다. 이를 통해 우리는 고차 다항식을 사용하지 않고도 많은 데이터 포인트를 횡단하는 부드러운 선을 구축할 수 있습니다. 고차 다항식은 진동이 심하여 피하는 것이 좋습니다.

다음 예시를 살펴보세요.

![image](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_1.png)



위 그림에서 볼 수 있듯이, 네 개의 데이터 포인트가 있습니다. 이들을 통해 선을 맞추고 싶다면 3차 다항식을 사용할 수 있습니다. 차수가 n인 다항식은 n+1개의 계수를 갖는다는 것을 기억해야 합니다. 따라서 좋은 적합을 위해 최소한 n+1개의 데이터 포인트가 필요합니다.

우리는 이를 Excel에서 시도해볼 수 있습니다. 데이터에 트렌드 라인을 추가하고 3차 다항식을 지정해 보세요.

![그림](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_2.png)

보시다시피, 이 경우에 다항식을 적합시키는 것이 잘 작동합니다. 부드러운 곡선을 얻을 수 있습니다.



그러나 더 많은 데이터 포인트가 있을 때 어떻게 될까요?

이 경우, Excel은 6차 다항식으로 제한됩니다. 그래서 아래에 표시된 것처럼 일곱 개의 데이터 포인트를 통과하는 선을 맞추어 보겠습니다.

![이미지](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_3.png)

위 그림에서 처음 몇 점을 통해 맞는 것은 합리적이지만, 오른쪽 끝의 마지막 두 점에서 큰 진동이 발생합니다. 이것이 고차 다항식을 사용하는 문제입니다.



현실에서 우리는 매우 큰 데이터셋을 다루기 때문에 점차적으로 커지는 다항식을 사용하는 것은 의미가 없어요. 

대신, 우리는 저차수 다항식을 각 부분 데이터 집합에 맞추어 데이터셋을 나눌 수 있어요.

이 경우에는 7개의 데이터 포인트를 통과하는 단일 선을 맞추는 대신, 첫 네 개의 포인트에 3차 다항식을 맞추고, 마지막 네 개의 포인트에 다른 3차 다항식을 맞출 수 있어요. 각 세트가 최종적인 맞춤에 공백이 없도록 하기 위해 하나의 데이터 포인트를 공유한다는 점에 유의해주시면 좋겠어요.

<img src="/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_4.png" />



위의 그림에서, 우리는 적은 진동을 얻는 것을 볼 수 있습니다. 그러나 네 번째 데이터 포인트를 자세히 살펴보세요. 맞춘 선에 이상한 단절이 나타납니다. 이로 인해 부드러운 적합이 아닙니다.

단절이 발생하는 지점을 노트라고 합니다. 곡선의 부자연스러움을 해결하기 위해 각 다항식의 도함수가 노트에서 동일해야 한다는 조건을 추가합니다.

이것은 모든 데이터 포인트에서 부드러운 적합 곡선을 보장합니다. 더불어 임의의 데이터 포인트를 사용할 수 있도록 하기 위해 각 다항식의 두 번째 도함수에도 제약 조건을 설정하여 노트에서 두 번째 도함수도 동일하게 만듭니다.

데이터를 하위 시퀀스로 분할하고 각 시퀀스에 낮은 차수의 다항식을 적합하며 노트에서 제약 조건이 준수되도록 하는 결과는 스플라인입니다. 만약 스플라인이 많은 3차 다항식으로 구성된다면, cubic 스플라인을 얻게 됩니다.



위의 그림에서는 스플라인을 사용하여 데이터 포인트를 맞추는 결과를 볼 수 있습니다. 선이 부드럽고 이상한 진동이 없는 것을 볼 수 있으며 원하는만큼 많은 포인트를 사용할 수 있습니다.

KAN의 경우, 기저 스플라인 또는 B-스플라인을 사용합니다.

아이디어는 임의의 스플라인 함수가 B-스플라인의 선형 조합으로 표현될 수 있다는 것입니다. 더 중요한 것은 각 스플라인 함수가 B-스플라인의 고유한 조합을 가지고 있다는 것입니다.



그 모든 것을 염두에 두고, KAN 아키텍처를 더 자세히 살펴보겠습니다.

# 콜모고로프-아놀드 네트워크 탐색

지금은 스플라인에 대한 보다 깊은 이해를 갖게 되었으니, 콜모고로프-아놀드 네트워크 아키텍처에 통합된 방식을 살펴보겠습니다.

먼저, 말할 것도 없이 KAN은 콜모고로프-아놀드 표현 정리에 기초합니다. 이는 다변수 연속 함수를 단변수 함수와 덧셈 연산의 유한 조합으로 표현할 수 있다는 것을 확립합니다.



간단히 말해, 다변수 함수는 여러 단변수 함수를 결합하는 것으로 요약됩니다.

이 정리는 단변수 함수가 부드럽고 학습 가능한 경우에만 실용적인 가치를 갖습니다. 만약 그것들이 비부드러운 함수이거나 프랙탈 함수라면 학습할 수 없게 되어서 KAN이 쓸모가 없어집니다.

다행히 대부분의 사용 사례는 부드러운 함수를 포함하고 있기 때문에, KAN은 MLP 대안으로 제안되고 있습니다.

## KAN의 아키텍처



그 후 연구자들은 다변수 함수를 표현하기 위해 단변수 함수를 학습하는 신경망을 구축했습니다.

![KAN Architecture](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_6.png)

위 그림에서 우리는 KAN의 구조와 MLP와 비교하는 방법을 볼 수 있습니다.

KAN의 엣지(선으로 표시된)는 학습 가능한 단변수 함수로, B-스플라인으로 매개변수화됩니다. 그런 다음, 노드(점으로 표시된)에서는 합산이 수행됩니다.



Kolmogorov-Arnold 표현 정리가 신경망에서 작동 중이라는 것을 인식하는 데 시간을 갖는 것이 좋습니다. 여러 단변량 함수가 학습되고 결합되어 최종적으로 다른 프로세스를 표현하도록 합니다.

또한, MLP 아키텍처와 대조되는 방법을 볼 수 있습니다. MLP에서 노드는 고정된 활성화 함수로 설정되어 있으며 일반적으로 ReLU와 같은 비선형 함수입니다. 그런 다음, MLP는 가중치를 학습할 수 있는 엣지를 가지고 있습니다.

따라서 KAN과 MLP 간의 주요 차이점은 KAN에서 비선형 함수가 학습 가능하고 MLP에서는 고정되어 있다는 것입니다. 따라서 KAN은 입력 데이터로부터 더 적은 매개변수를 사용하여 학습할 수 있으며 함수가 입력 데이터에 따라 학습되고 조정되기 때문에 기술적으로 더 나은 결과를 얻을 수 있습니다.

물론 더 크고 깊은 KAN을 사용하면 근사 및 일반화 능력이 향상되어 네트워크가 임의의 함수를 학습할 수 있습니다.



이제 KAN을 더 깊게 만들면서도 매개변수를 효과적으로 유지하는 비결은 그리드 확장에 있습니다.

## KAN에서의 그리드 확장

그리드 확장은 KAN에서 각 B-스플라인 함수에 대해 모델의 정확도와 효율성을 높이는 방법으로 사용됩니다.

![그리드 확장](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_7.png)



위의 그림에서 KAN (왼쪽)에서 활성화 흐름과 각 스플라인에 적용된 그리드 확장 기술 (오른쪽)을 볼 수 있습니다.

그리드 확장을 통해 스플라인 그리드의 세분화를 증가시켜 복잡한 함수의 더 나은 근사치를 얻을 수 있습니다. 이는 같은 영역 내에서 간격의 수를 증가시킴으로써 이루어집니다. 그림에서는 G1 = 5에서 G2 = 10으로 변화함으로써 이를 설명하고 있습니다.

간격의 수를 증가시킴으로써 최종 스플라인 함수를 구성하는 조각의 수도 증가합니다. 이는 데이터에서 보다 세부적인 행동을 배울 수 있게 합니다.

이 확장 기능은 MLP의 경우와 대조적입니다. MLP의 경우 더 복잡한 함수를 학습하기 위해 모델이 더 깊어져야 합니다. 그러나 KAN에서는 각 스플라인마다 이 작업을 수행하므로 더 복잡한 함수를 학습하기 위해서는 기술적으로 더 적은 층이 필요합니다.



이제 우리는 KAN과 그 내부 작동에 대해 잘 이해했으니 파이썬을 사용하여 시계열 예측에 적용하는 방법을 살펴보겠습니다.

# KAN으로 예측하기

이 섹션에서는 파이썬을 사용하여 예측 작업에 KAN 아키텍처를 테스트합니다.

본 문서 작성 시점에서 KAN은 매우 새로운 기술이므로, 내가 좋아하는 예측 라이브러리 neuralforecast를 이 Pytorch 기반의 KAN 구현으로 확장하였고 이를 시계열 예측에 적용했습니다.



또한, KAN 모델이 neuralforecast의 안정적인 릴리스에서 사용할 수 없을 수도 있습니다. 결과를 재현하려면 다음을 수행할 수 있습니다:

- neuralforecast 저장소를 복제하고 이 브랜치에서 작업
- 또는 브랜치가 병합된 경우 다음을 실행할 수 있습니다.

```js
pip install git+https://github.com/Nixtla/neuralforecast.git
```

지금 이 실험에서는 Creative Commons Attribution 4.0 라이선스를 통해 제공된 월간 M3 데이터셋에 KAN 모델을 테스트합니다.



이 데이터셋은 다양한 도메인에서 나온 월별 주기를 가진 1428개의 고유한 시계열을 포함하고 있습니다.

KAN의 성능은 간단한 MLP와 N-BEATS 모델과 비교될 것입니다.

이러한 결과를 재현하는 모든 코드는 GitHub에서 확인할 수 있습니다.

시작해봅시다!



## 초기 설정

우리는 이 실험에 필요한 패키지들을 import하여 시작합니다.

```js
import pandas as pd

from datasetsforecast.m3 import M3

from utilsforecast.losses import mae, smape
from utilsforecast.evaluation import evaluate

from neuralforecast import NeuralForecast
from neuralforecast.models import KAN, MLP, NBEATS
```

우리는 neuralforecast와 호환성 있는 형식으로 월간 M3 데이터셋을 불러오기 위해 datasetsforecast 라이브러리를 사용합니다.



```js
Y_df, *_ = M3.load("./data", "Monthly")
```

그런 다음 데이터셋 사양에 지정된 대로 18의 예측 기간을 사용합니다. 따라서 마지막 18 개의 시간 단계를 테스트 세트로 예약하고 나머지 데이터를 학습에 사용합니다.

```js
horizon = 18

test_df = Y_df.groupby('unique_id').tail(horizon)
train_df = Y_df.drop(test_df.index).reset_index(drop=True)
```

좋아요! 이 단계에서는 학습 및 테스트 세트가 준비되었으므로 모델을 적합할 준비가 되었습니다.



## 모델 맞추기

모델을 맞추기 위해, 우리는 훈련시키고자 하는 모든 모델들의 목록을 간단히 정의합니다. 여기서는 기본 설정을 유지합니다. 기본 KAN과 MLP는 입력 레이어, 은닉 레이어, 출력 레이어로 이루어진 세 개의 레이어만 가지고 있음을 유의해 주세요.

또한 1000번의 훈련 단계로 설정하고, 인내심을 3으로 설정했습니다. 이는 검증 손실이 세 번의 확인 후에도 개선되지 않으면 모델이 훈련을 멈출 것임을 의미합니다.

```js
models = [
    KAN(input_size=2*horizon,
        h=horizon,
        scaler_type='robust',
        max_steps=1000,
        early_stop_patience_steps=3),
    MLP(input_size=2*horizon,
        h=horizon,
        scaler_type='robust',
        max_steps=1000,
        early_stop_patience_steps=3),
    NBEATS(input_size=2*horizon,
           h=horizon,
           scaler_type='robust',
           max_steps=1000,
           early_stop_patience_steps=3)
]
```



대박! 이제 데이터를 처리하고 모델을 맞추는 NeuralForecast의 인스턴스를 만듭니다. 그런 다음 fit 메소드를 호출하여 각 모델을 훈련시킵니다.

```js
nf = NeuralForecast(models=models, freq='M')

nf.fit(train_df, val_size=horizon)
```

훈련이 완료되면 예측을 수행하고 각 모델의 성능을 평가할 수 있습니다.

## 평가



이제 적합된 모델을 활용하여 예측을 수행할 수 있고, 해당 값들을 테스트 세트에 저장된 실제 값과 비교할 수 있습니다.

```js
preds = nf.predict()

preds = preds.reset_index()

test_df = pd.merge(test_df, preds, 'left', ['ds', 'unique_id'])
```

우리의 모델을 평가하기 위해 평균 절대 오차(MAE)와 대칭 평균 절대 백분율 오차(sMAPE)를 사용합니다.

이 부분에서는 예측 모델을 평가하는 많은 메트릭과 유틸리티 함수를 편리하게 제공하는 utilsforecast 라이브러리를 사용합니다.



```js
평가 = evaluate(
    test_df,
    metrics=[mae, smape],
    models=["KAN", "MLP", "NBEATS"],
    target_col="y",
)

평가 = 평가.drop(['unique_id'], axis=1).groupby('metric').mean().reset_index()
평가
```

위의 코드 블록은 아래에 표시된 결과를 출력합니다.

<img src="/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_8.png" />

위의 표에서 KAN이 아주 간단한 MLP과 비교하여 최악의 성능을 달성하는 것을 볼 수 있습니다. 예상대로, N-BEATS는 MAE가 637, sMAPE가 7.1%로 최상의 성능을 달성했습니다.



KAN의 성능이 그리 눈에 띄지는 않지만, 알아두세요. KAN은 학습 가능한 매개변수가 272k로 MLP(1.1M)와 N-BEATS(2.2M)에 비해 적습니다. MLP에 비해 매개변수 수를 75% 줄인 것이죠. 그럼에도 불구하고, 이 시나리오에서 그 성능은 실망스럽습니다.

## 시계열 예측을 위한 KAN의 벤치마킹

위 실험은 전체 M3 데이터셋뿐만 아니라 M4 데이터셋에도 손쉽게 확장할 수 있습니다. 두 데이터셋 모두 Creative Commons Attribution 4.0 라이선스로 제공됩니다.

아래에서 벤치마킹 결과가 표시됩니다. 최고의 성능은 굵게, 두 번째로 좋은 성능은 밑줄로 표시되어 있습니다.



<img src="/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_9.png" />

위 표를 보면 KAN이 종종 최악의 예측 모델이라는 것을 알 수 있습니다. 일반적으로 간단한 MLP보다 성능이 낮습니다. KAN은 주간 M4 데이터셋에서 MLP보다 우수한 성과를 보이며, 시간당 M4 데이터셋에서 가장 우수한 성과를 내고 있음을 알 수 있습니다. 또한 KAN이 벤치마크에서 가장 느린 모델임을 주목해 주세요.

모든 예측 작업에 대해 KAN은 실제로 MLP 또는 N-BEATS보다 매개변수 효율적이지만 성능은 실망스럽습니다.

# KAN에 대한 내 의견



KAN 아키텍처는 많은 관심을 끌고 있고 해당 모델을 중심으로 큰 홍보가 진행되고 있습니다. 그러나 예측 작업에 적용할 경우 상당히 부정적인 결과가 나왔습니다.

MLP도 예측 모델로는 그리 좋지 않다는 점은 예상했습니다. KAN은 MLP의 대체제로 제안되었기 때문입니다.

논문의 저자들은 MLP 대비 성능이 향상된다고 주장하지만, 시계열 예측에 적용했을 때는 그러한 성과가 나타나지 않았습니다.

제 생각에 진정한 잠재력은 MLP 유닛을 N-BEATS나 NHiTS와 같이 고급 시계열 예측 모델에서 KAN으로 대체하는 데 있다고 생각합니다. 결국 시계열 예측은 어려운 작업이며, KAN이나 MLP와 같은 모델은 스스로만으로는 성능이 충분하지 않습니다.



그러나 KAN 기반의 N-BEATS 또는 NHiTS를 사용하면 가벼워지고 더 빠르며 더 나은 예측이 가능할 수 있습니다. 이를 곧 테스트되길 희망합니다.

# 결론

Kolmogorov-Arnold 네트워크(KAN)는 딥러닝에서 근본적인 다층 퍼셉트론(MLP) 대체로 제시됩니다.

이는 Kolmogorov-Arnold 표현 정리를 적용하여 다변수 함수가 일변수 함수의 조합으로 표현될 수 있다고 설명하고 있습니다.



KAN에서는 단변량 함수들이 B-스플라인으로 학습되고 매개변수화됩니다. MLP가 고정된 비선형 활성화 함수를 사용하는 것과는 달리, 스플라인은 학습되어 훈련 데이터에 맞게 조정될 수 있는 비선형 함수입니다.

이는 KAN이 MLP보다 매개변수를 효율적으로 사용할 수 있게 하며 이론적으로 더 나은 성능을 달성할 수 있다는 것을 의미합니다.

그러나 KAN을 시계열 예측에 적용한 결과, 모델이 매우 간단한 MLP보다 성능이 부족한 경우가 많았습니다.

그 잠재력은 아마 MLP를 N-BEATS나 NHiTS와 같은 더 정립된 예측 모델로 대체하는 데 있을 것으로 예상됩니다.



KAN은 아주 새로운 기술이지만, 여전히 딥 러닝 분야에서 흥미로운 진전을 보여줍니다.

읽어 주셔서 감사합니다! 즐겁게 읽으셨기를 바라며 무언가 새로운 것을 배우셨으면 좋겠어요!

건배 🍻

# 제게 응원을 해주세요



제 일에 만족하고 계신가요? 지지를 표현해보세요. 'Buy me a coffee'는 저를 격려하는 간단한 방법입니다. 한 잔의 커피를 마실 수 있고, 여러분도 응원할 수 있어요! 응원하고 싶다면 아래 버튼을 클릭해주세요 👇

![KAN: Kolmogorov–Arnold Networks by Ziming Liu1, Yixuan Wang Sachin Vaidya Fabian Ruehle, James Halverson, Marin Soljačić, Thomas Y. Hou, Max Tegmark](/assets/img/2024-05-15-Kolmogorov-ArnoldNetworksKANsforTimeSeriesForecasting_10.png)

# 참고문헌

KAN: Kolmogorov–Arnold Networks 저자: Ziming Liu1, Yixuan Wang Sachin Vaidya Fabian Ruehle, James Halverson, Marin Soljačić, Thomas Y. Hou, Max Tegmark



GitHub에 Kolmogorov-Arnold network의 효율적인 구현이 있어요!