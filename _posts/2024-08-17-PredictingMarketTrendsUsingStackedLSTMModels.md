---
title: "스택드 LSTM 모델을 사용한 시장 트렌드 예측 방법"
description: ""
coverImage: "/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_0.png"
date: 2024-08-17 01:44
ogImage:
  url: /assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_0.png
tag: Tech
originalTitle: "Predicting Market Trends Using Stacked LSTM Models"
link: "https://medium.com/@matthew1992/predicting-market-trends-using-stacked-lstm-models-08d1a7e1b7eb"
isUpdated: true
updatedAt: 1723864227927
---

현재 연구는 Stacked Long Short-Term Memory (LSTM) 네트워크를 활용하여 주식 가격을 예측하는 데 초점을 맞추고 있습니다. 이 방법은 과거 가격 데이터를 기반으로 시장 트렌드를 분석하고 예측하는 데 고급 신경망 구조를 활용합니다.

주식 가격 예측은 금융 분석의 중요한 측면으로, 투자자와 금융 전문가들이 정보에 기반한 결정을 내릴 수 있도록 합니다. 시간 의존성을 캡처하는 능력으로 유명한 Stacked LSTM 네트워크는 이 작업에 특히 적합합니다. 여러 LSTM 레이어를 쌓음으로써 모델은 시계열 데이터 내에서 복잡한 패턴을 학습할 수 있는 능력을 향상시킵니다.

```js
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
```

이 코드 스니펫은 Python 프로그래밍 환경에서 데이터 분석 및 머신러닝에 널리 사용되는 여러 라이브러리를 소개합니다.

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

판다스는 pd로 가져오며, 데이터 조작 및 분석에 필수적인 기능을 제공합니다. 특히 데이터프레임과 같은 구조화된 데이터를 다루는 데 유용합니다. 이 기능은 데이터를 모델링하기 전 중요한 역할을 합니다.

넘파이는 np로 가져오며, 파이썬에서 수치 계산에 필수적인 패키지입니다. 배열과 행렬을 다룰 수 있도록 지원하며, 데이터 조작 및 머신러닝 모델에서 수학 함수를 수행하는 데 자주 사용됩니다.

맷플롯립의 pyplot은 plt로 가져오며, 파이썬에서 정적, 대화식, 애니메이션 형식의 시각화를 만들기 위한 라이브러리입니다. 이 라이브러리는 데이터 시각화에 중요한 역할을 하며, 사용자가 데이터를 시각화하여 모델 성능을 평가하고 통찰력을 얻을 수 있도록 도와줍니다.

MinMaxScaler는 sklearn.preprocessing 모듈에서 가져오며, 일반적으로 0과 1 사이의 범위 내로 특성을 스케일링하는 데 활용됩니다. 이 스케일링 프로세스는 머신러닝에서 데이터를 처리할 때 모델 수렴의 속도와 정확도를 향상시키는 중요한 전처리 단계입니다.

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

TensorFlow에서 제공하는 Keras API를 활용하여 신경망 모델을 구축합니다. 특히 Sequential 모델을 활용하고 있습니다. 이 방식은 딥러닝 구조를 개발하는 데 도움이 됩니다. 모델에는 다양한 레이어가 포함되어 있습니다. Dense 레이어는 완전 연결된 신경망 레이어이고, LSTM 레이어는 시퀀스 예측 작업에 특히 효과적인 Long Short-Term Memory 레이어를 나타냅니다. 시계열 분석이나 자然어 처리와 같은 작업에 유용합니다.

```python
plt.plot(df_close)
plt.show()
```

![image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_0.png)

이 코드는 Python에서 데이터 시각화를 위해 설계되었습니다. 특히 DataFrame 객체인 df_close에 포함된 시계열 데이터를 나타내는 선 그래프를 그리는 데 사용됩니다.

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

이 코드의 주요 기능은 df_close DataFrame에 저장된 값들을 시각적으로 나타내는 라인 플롯을 생성하는 것입니다. 이러한 시각화는 데이터 분석에서 시간에 따른 추세를 식별하거나 다른 데이터셋을 효과적으로 비교하는 데 널리 활용됩니다.

이 코드는 Matplotlib 라이브러리를 사용하여 작동하며, plt.plot(df_close) 명령을 통해 시작됩니다. 이 명령은 df_close DataFrame의 데이터를 사용하여 플롯을 생성하며, 여기서 x축은 일반적으로 시간을 나타내고 — DataFrame의 색인이 시간 기반이라는 가정 하에 — y축은 해당 값들을 표시합니다. plt.show() 함수를 포함해야만 생성된 플롯을 렌더링하고 표시할 수 있으며, 이를 포함하지 않으면 특정 환경에서 플롯이 나타나지 않을 수 있습니다.

이 코드의 중요성은 데이터 시각화를 용이하게 하는 능력에 있습니다. 데이터를 시각화함으로써 데이터셋 내의 추세, 패턴 및 이상 현상을 이해하고 해석하는 것을 향상시킵니다. df_close를 플로팅함으로써, 사용자들은 순수한 수치 데이터만을 검토하는 것만으로는 파악하기 어려운 통찰력을 얻을 수 있습니다. 이 과정은 궁극적으로 데이터의 시각적 표현을 기반으로 한 통찰력을 제공하여 판단력 있는 결정을 내리는 데 도움이 됩니다.

MinMax 스케일링은 LSTM(Long Short-Term Memory) 네트워크와 함께 작업할 때 특히 관련이 있는 전처리 기술입니다.

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

일반적으로, LSTM 모델은 입력 특성이 특정 범위로 정규화되었을 때 더 좋은 성능을 발휘합니다. MinMax 스케일링은 데이터를 압축하여 일반적으로 0과 1 사이의 정의된 최솟값과 최댓값 사이에 놓이도록 변환합니다. 이 조정은 다양한 입력 특성이 학습 프로세스에 동등하게 기여하도록 보장하여 모델의 성능과 안정성을 향상시킵니다.

MinMax 스케일링을 적용할 때, 데이터 내의 패턴에 미칠 수 있는 영향을 주의 깊게 고려해야 합니다. 입력 값을 표준화하는 데 효과적이지만, 원래 데이터셋에 있는 기본적인 관계를 유지하는 것이 중요합니다. 따라서 LSTM 네트워크를 활용할 때 MinMax 스케일링을 통합하면 모델 정확도와 효율성이 향상될 수 있습니다.

```js
scaler = MinMaxScaler((feature_range = (0, 1)));
df_close = scaler.fit_transform(np.array(df_close).reshape(-1, 1));
```

이 코드 조각은 Scikit-learn 라이브러리에서 제공하는 Min-Max 스케일링 기술을 활용하여 데이터셋에 특성 스케일링을 적용하는 방법을 보여줍니다. 이 프로시저의 목적은 df_close 데이터셋에 있는 값들(일반적으로 종가 주가나 유사한 수치 데이터)을 0부터 1까지의 표준 범위로 변환하는 것입니다.

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

프로세스는 (0, 1)의 특징 범위로 구성된 MinMaxScaler 객체의 초기화로 시작됩니다. 이는 변환된 데이터가 최소값이 0이 되고 최대값이 1이 되도록 다시 조정되도록 허용합니다. 이러한 초기화는 스케일링 프로세스에서 중요한 첫 번째 단계입니다.

이후 원본 데이터인 df_close가 이차원 배열로 재구성됩니다. 스케일러가 데이터를 이차원 형식으로 요구하기 때문에 이 변환은 필요합니다. 이는 샘플과 특징으로 구성된 것인데, 종가 데이터셋처럼 하나의 특징만 있는 경우에도 해당됩니다.

다음으로는 변환된 데이터를 사용하여 scaler 객체에 fit_transform 메서드를 적용합니다. 이 메서드는 원래 데이터셋의 최소값과 최대값을 계산하고, 데이터가 지정된 범위 내에 떨어지도록 스케일링 변환을 적용하고, 정규화된 값을 반환합니다.

이 코드의 사용은 데이터 전처리의 맥락에서 매우 중요합니다. 특히 머신러닝과 통계 분석 내에서 중요합니다. 정규화는 데이터 스케일에 민감한 알고리즘에서 거리 계산에 특징이 동등하게 기여하도록 보장합니다. K-최근접 이웃 및 경사 하강 최적화 방법과 같이 데이터 스케일에 민감한 알고리즘에서 수렴 속도를 향상시킬 수 있습니다. 또한 스케일링은 특정 알고리즘의 수렴 속도를 향상시키고, 훈련 프로세스를 가속화하고 효율성을 향상시키는 데 도움이 될 수 있습니다. 또한, 아웃라이어의 영향을 줄이고, 이로 인해 모델 학습 프로세스에 부정적인 영향을 미치는 것을 방지할 수 있습니다.

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
train_size = int(len(df_close)*0.65)
test_size = len(df_close) - train_size
train_data = df_close[0:train_size,:]
test_data = df_close[train_size:,:]
```

이 코드는 머신러닝 모델을 훈련하고 테스트하기 위한 데이터셋을 준비하는 데 사용됩니다. 특히 변수 이름인 df_close로 표현된 금융 정보와 같은 시계열 데이터의 맥락에서 중요한 역할을 합니다.

이 코드의 주요 기능은 데이터셋을 훈련 및 테스트용으로 사용할 비율을 계산하는 것입니다. 구체적으로 전체 데이터셋의 65%를 훈련 부분으로 지정하고 나머지 35%를 테스트용으로 할당합니다. 이 분할을 통해 프로그램은 모델의 성능을 보이지 않은 데이터에 대해 효과적으로 평가할 수 있습니다.

이 분할을 구현하기 위해 코드는 먼저 훈련 데이터셋의 크기인 train_size를 결정합니다. 이 값은 df_close 내 전체 행 수의 65%를 나타내는 정수값으로 계산됩니다. 그런 다음 테스트 데이터셋의 크기인 test_size는 전체 행 수에서 train_size를 뺌으로써 결정되며, df_close 내 모든 데이터가 활용되도록 보장합니다. 마지막으로 코드는 DataFrame을 슬라이싱하여 훈련 및 테스트 목적으로 두 가지 다른 세그먼트를 만듭니다.

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

이 코드를 사용하는 이유는 모델 학습 및 검증 개념에 중점을 두고 있습니다. 데이터셋을 분할함으로써 모델을 한 부분에서 학습시키고 다른 부분에서 모델의 효과를 평가할 수 있습니다. 이 접근 방식은 모델이 이전에 만난 데이터와 직면했을 때 얼마나 일반화되는지에 대한 통찰을 제공합니다.

또한, 학습 데이터와 테스트 데이터를 분리함으로써 오버피팅의 위험을 줄일 수 있습니다. 고유한 데이터셋에서 학습함으로써 모델이 입력 데이터를 단지 암기하는 것을 방지하며, 이는 새로운 데이터에 적용할 때 성능에 악영향을 줄 수 있는 현상입니다. 다른 데이터셋에서 모델을 테스트함으로써 정확성과 전반적인 효과를 견고하게 평가할 수 있습니다.

시계열 분석의 맥락에서, 데이터의 시간 구조를 유지하는 것이 중요합니다. 이 코드는 데이터셋의 초기 세그먼트를 학습에, 그 다음 세그먼트를 테스트에 할당함으로써 이 원칙을 준수합니다. 이 방법은 역사적 데이터가 미래 결과를 예측하는 데 적용되는 현실적인 시나리오를 효과적으로 시뮬레이션합니다.

```js
plt.figure((figsize = [15, 5]));
plt.subplot(121);
plt.plot(train_data);
plt.title("학습 데이터");
plt.subplot(122);
plt.plot(test_data);
plt.title("테스트 데이터");
plt.show();
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

![Training and Test Data Visualization](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_1.png)

이 코드는 두 가지 다른 데이터 세트를 시각화하는 역할을 합니다: 훈련 데이터와 테스트 데이터입니다. 이 코드는 두 데이터 집합을 한눈에 보기 쉽게 옆으로 나란히 나타내는 그림을 생성합니다.

처음에 코드는 그림의 차원을 설정하여 두 플롯이 서로 겹치지 않고 보기 쉽게 표시될 수 있도록 합니다. 그림은 두 개의 하위 그림으로 나누어집니다. 첫 번째 하위 그림은 훈련 데이터를 위해 예약되어 있으며, 선 그래프가 훈련 데이터 집합의 값들을 시간 또는 다른 관련 지수에 따라 표시합니다. 두 번째 하위 그림도 이러한 배열을 반영하지만 테스트 데이터에 초점을 맞추며, 다시 선 그래프를 사용하여 그것을 표현합니다. 각 하위 그림은 적절히 제목이 붙여져 있어 어떤 데이터 집합이 전시되고 있는지 명확히 합니다. 결과적으로, 결합된 시각적 결과는 사용자에게 표시됩니다.

이 코드의 활용은 다양한 이유로 중요합니다. 이는 머신러닝 및 통계 분야에서 모델이 이전에 보지 못한 데이터에 대해 얼마나 효과적으로 수행될 수 있는지를 평가하는 데 중요합니다. 두 데이터 집합의 패턴, 추세 및 분포를 시각적으로 분석함으로써 모델의 일반화 가능성을 파악하고, 오버피팅이나 언더피팅과 같은 문제를 식별할 수 있습니다. 요약하자면, 시각화는 데이터 분석과 해석의 중요한 구성 요소를 형성하며, 효과적인 데이터 탐색을 위해 이 코드는 필수적입니다.

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

모델 훈련은 2023년 10월까지 수집된 정보를 포함합니다. 이는 해당 날짜 이후에 발생한 모든 개발 또는 변경 사항이 모델의 지식에 반영되지 않음을 의미합니다. 따라서 모델의 이해력과 응답은 해당 시점까지의 데이터 및 사건에 한정됩니다.

```js
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        dataX.append(dataset[i:(i+time_step),0])
        dataY.append(dataset[(i+time_step),0])

    return np.array(dataX), np.array(dataY)
```

이 코드는 create_dataset라는 함수를 정의하는데, 이 함수는 머신러닝 모델의 훈련을 위해 시계열 데이터셋을 준비하는 데 사용됩니다. 특히 예측이나 회귀와 관련된 작업에 적합합니다.

이 함수는 보통 NumPy 배열과 같은 다차원 배열인 데이터셋과 time_step 매개변수를 허용합니다. time_step은 다음 값 예측 시 사용할 이전 시간 단계의 수를 나타냅니다.

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

초기에 함수는 두 개의 빈 리스트인 dataX와 dataY를 설정합니다. dataX 리스트는 입력 데이터 시퀀스를 보유하기 위해 지정되며, dataY는 각 시퀀스 뒤를 따르는 대응하는 출력 값들을 포함하도록 되어 있습니다.

함수는 데이터셋을 통해 반복문을 실행합니다. 데이터셋의 각 점에 대해, 마지막 time_step 값을 슬라이스하여 입력 시퀀스를 형성하고, 이를 dataX에 추가합니다. 이후 입력 시퀀스를 따르는 시리즈의 다음 값을 나타내는 출력 값은 dataY에 추가됩니다.

데이터셋 전체를 처리한 후, 함수는 dataX와 dataY를 모두 NumPy 배열로 변환하여 리턴합니다.

```js
time_step = 100;
train_x, (train_y = create_dataset(train_data, time_step));
test_x, (test_y = create_dataset(test_data, time_step));
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

이 코드 스니펫은 시계열 기계 학습 또는 심층 학습 작업을 위한 데이터 전처리를 용이하게 하는 데 사용됩니다. 스크립트는 시간 단계를 나타내는 변수를 설정하여 전처리 과정을 돕습니다. 이 변수는 100으로 설정되어 있으며, 두 가지 다른 데이터 세트(학습을 위한 데이터 세트와 테스트를 위한 데이터 세트)를 변환하는 데 사용됩니다.

전처리는 create_dataset으로 불리는 시계열 데이터를 분할하는 함수를 통해 실행됩니다. 이 함수는 train_data와 test_data를 지정된 시간 단계에 따라 구성하는 방식으로 작동합니다. 데이터 세트 내 각 지점에 대해, 시간 단계에 의해 정의된 앞의 값을 시퀀스로 기반으로 해당 출력 또는 레이블을 생성합니다. 본질적으로, 이는 더 나은 분석을 가능하게 하는 데이터 포인트의 겹치는 창을 생성합니다.

이 함수를 학습 및 테스트 데이터 세트 양쪽에 모두 적용함으로써 일정한 형식으로 포맷되도록 보장합니다. 이는 예측 모델을 개발하는 데 중요하며, 각 입력 시퀀스를 해당 출력과 쌍지어 모델이 그들 간의 관계를 효과적으로 식별할 수 있도록 함을 가능하게 합니다.

또한 중요한 점은 많은 기계 학습 모델, 특히 순환 신경망(RNN) 및 LSTM(장단기 메모리 네트워크)와 같은 모델이 데이터가 특정한 형식으로 구성되어야 한다는 것입니다. 이 구조는 이러한 모델이 시간적인 관계를 효과적으로 이해할 수 있도록 중요합니다. 따라서 이 전처리 단계는 데이터가 시간에 따라 종속되어 있는 데이터로부터 모델이 학습할 수 있도록 하는 데 필수적입니다.

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
train_x = train_x.reshape(train_x.shape[0], train_x.shape[1], 1);
test_x = test_x.reshape(test_x.shape[0], test_x.shape[1], 1);
```

위 코드는 train_x와 test_x로 참조되는 훈련 및 테스트 데이터 세트를 다시 구성하기 위한 것입니다. 이러한 데이터 세트는 일반적으로 머신 러닝 모델에 필요한 입력 데이터를 포함하며 배열 또는 행렬로 구성됩니다.

이 코드의 주요 목적은 각 데이터 세트의 구조를 세 가지 차원으로 변환하는 것입니다. 구체적으로, 재구성된 형태는 훈련 세트의 train_x.shape[0]로 표시되는 초기 샘플 수와 테스트 세트의 test_x.shape[0]를 유지합니다. 두 번째 차원에서는 train_x.shape[1] 또는 test_x.shape[1]로 표시되는 초기 기능 또는 시간 단계 수를 유지합니다. 세 번째 차원은 크기를 1로 설정합니다.

이 재구성 프로세스는 특히 순차 데이터를 처리하는 특정 신경망 아키텍처에서 필요합니다. 주로 순환 신경망(RNN) 및 합성곱 신경망(CNN)과 같은 모델은 일반적으로 세 가지 차원 형식의 입력 데이터가 필요합니다. 이러한 차원은 일반적으로 샘플 수, 시간 단계 또는 피처 수, 채널 수에 해당하며 이 경우 채널 수는 1로 정의됩니다.

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

train_x.shape, train_y.shape, test_x.shape, test_y.shape

![image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_2.png)

위 코드는 네 가지 다른 데이터셋(train_x, train_y, test_x, test_y)의 차원을 얻기 위해 사용됩니다. 각각의 변수들은 기계 학습 워크플로우에서 중요한 역할을 합니다.

일반적으로 train_x 변수는 학습용 특징 데이터를 보유하며, 모델이 학습할 입력 변수들을 포함합니다. 반면에 train_y는 train_x에 해당하는 타겟 또는 레이블 데이터를 포함하고 있어서 그 입력 특징들에 대한 원하는 출력을 나타냅니다. test_x 변수는 테스트용으로 의도된 특징 데이터를 포함하며, 훈련된 모델이 새로운, 보이지 않은 데이터에 대한 성능을 평가합니다. 한편, test_y는 테스트용 타겟이나 레이블 데이터를 저장하며, 이는 테스트용 특징 데이터인 test_x에 대한 모델의 예측을 비교할 기준 역할을 합니다.

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

이 배열들에 .shape 속성을 호출하면 행과 열의 수를 나타내는 차원을 확인할 수 있습니다. 이 정보는 여러 이유로 중요합니다. 먼저, 데이터 구조를 이해하는 데 도움이 되며, 데이터가 올바르게 구성되어 있는지 및 입력 및 출력 데이터 세트 간 샘플 및 특성의 수가 적절하게 정렬되어 있는지 확인할 수 있습니다.

둘째, 데이터 세트의 모양을 알고 있는 것은 모델 입력 유효성 검사에 매우 중요합니다. 학습을 시작하기 전에 기계 학습 모델에서 필요로 하는 예상 차원에 부합하는지 확인합니다. 또한 학습이나 평가 중 문제가 발생한 경우에는 이러한 데이터 세트의 모양을 확인하여 데이터 준비 단계에서 잠재적 불일치나 오류를 식별하는 데 초기 단계로 자주 사용됩니다.

```js
model = Sequential();
model.add(LSTM(50, (return_sequences = True), (input_shape = (100, 1))));
model.add(LSTM(50, (return_sequences = True)));
model.add(LSTM(50));
model.add(Dense(1));
```

이 코드는 순차 아키텍처를 활용한 신경망 모델을 설정하는데, 특히 시계열이나 순서 있는 데이터 포인트와 같은 순차 데이터를 분석하기 위해 구체적으로 설계되었습니다.

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

이 모델은 Dense 레이어와 함께 세 개의 Long Short-Term Memory (LSTM) 레이어를 특징으로 합니다. LSTM 레이어는 이전 시간 단계에서의 문맥 정보에 의존하는 작업에 특히 적합하여, 다양한 시간 간격 동안 정보를 보존하는 능력 덕분에 이 작업에 용이합니다.

레이어 구성 관점에서, 첫 번째 LSTM 레이어는 50개의 유닛으로 구성되며 시퀀스를 반환하도록 설정되어 있습니다. 이는 각 시간 단계에서 완전한 출력 시퀀스를 생성하여 이후 레이어가 이러한 시퀀스를 처리할 수 있도록 하는 의미입니다. 두 번째 LSTM 레이어는 이와 동일한 구성을 반영하며 50개의 유닛을 포함하고 시퀀스를 반환하여, 선행 LSTM 레이어에서 생성된 출력을 추가 처리할 수 있도록 합니다. 세 번째 LSTM 레이어는 시퀀스를 반환하지 않고, 대신 단일 출력 값을 생성하며, 이는 주로 회귀 작업이나 최종 예측에 활용됩니다. 이러한 레이어 뒤에는 모델의 최종 출력을 제공하는 하나의 유닛으로 구성된 Dense 레이어가 있습니다. 이는 LSTM 레이어의 결과를 기반으로 예측을 생성하는 데 자주 사용됩니다.

입력 요구 사항 관련하여, 모델은 각각이 단일 속성을 갖는 100개의 시간 단계를 포함하는 시퀀스를 수용하도록 구성되어 있으며, 이를 통해 입력 형태는 (100, 1)이 되었습니다.

이 코드의 주요 목표는 순차 데이터에 근간을 둔 예측을 수행할 수 있는 모델을 구현하는 것입니다. 주식 가격 예측, 날씨 예측 또는 자연어 처리 작업과 같은 응용 프로그램이 이에 포함될 수 있습니다. LSTM 레이어의 포함을 통해 모델은 데이터 내의 시간 종속성을 효과적으로 포착하여, 시간에 따른 패턴을 인식하는 능력을 향상시킬 수 있습니다.

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
model.compile((loss = "mean_squared_error"), (optimizer = "adam"));
```

이 코드는 머신 러닝 모델을 준비하는 과정에서 매우 중요한 역할을 합니다. 특히 TensorFlow나 Keras와 같은 딥러닝 프레임워크를 활용하는 경우에 그 역할이 더욱 중요해집니다. 이 코드는 모델의 학습을 위한 기반을 마련하며 손실 함수와 최적화 알고리즘을 정의하는 역할을 합니다.

손실 매개변수는 모델의 학습 과정 중 성능을 평가하는 데 사용되는 메트릭을 결정하는 중요한 요소입니다. 이 경우에는 평균 제곱 오차가 선택되었는데, 이는 회귀 작업에 일반적으로 사용되는 표준적인 선택입니다. 이 메트릭은 예측 값과 실제 값 사이의 제곱된 차이의 평균을 계산합니다. 따라서 낮은 평균 제곱 오차는 모델이 학습 데이터와 더 잘 일치한다는 것을 나타냅니다.

최적화 매개변수는 학습 과정 중 모델의 가중치를 조정하는 데 사용되는 알고리즘을 지정합니다. 이 경우에는 Adam 최적화기가 지정되었는데, Adam은 Adaptive Moment Estimation의 약자입니다. 이 최적화 방법은 두 가지 변형의 확률적 경사 하강법의 장점을 결합하는 능력으로 인해 선호됩니다. 그래디언트의 평균과 이차 모멘트의 추정을 기반으로 각 매개변수에 대한 학습률을 개별적으로 조정하여 학습 과정의 효율성과 안정성을 향상시킵니다.

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
model.summary();
```

![Image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_3.png)

model.summary() 명령은 TensorFlow/Keras 및 PyTorch와 같은 머신러닝 프레임워크에서 널리 사용됩니다. 실행하면 모델 아키텍처의 종합적인 섬세를 생성합니다. 이 섬세는 모델을 구성하는 다양한 레이어에 관한 소중한 정보를 제공합니다.

레이어 유형을 상세히 설명하며, 이는 합성곱 레이어, 밀집 레이어, 순환 레이어 등이 포함됩니다. 또한 각 레이어에서 생성된 출력 형태에 대한 통찰력을 제공하여 데이터 흐름을 이해하는 데 중요합니다. 섬세는 각 레이어 및 전체 모델을 통틀어 가중치와 편향을 포함한 매개변수의 총 개수를 열거합니다. 이 정보는 모델의 복잡성과 능력을 평가하는 데 도움이 됩니다.

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

또한, 이 요약은 훈련 가능 및 비훈련 가능한 매개변수를 구분합니다. 특히 전이 학습 기술을 활용하는 모델에서 이 구분은 중요한데, 이를 통해 훈련 중에 조정할 수 있는 매개변수와 고정된 매개변수가 명확해집니다.

이 요약의 유틸리티는 모델 개발과 연구의 다양한 측면으로 확장됩니다. 사용자가 모델을 정확하게 구성했는지 확인하여 레이어 간의 적절한 연결 및 차원의 정렬을 보장함으로써 디버깅을 지원합니다. 또한 모델 복잡성을 개요로 제공하여 의도한 작업에 적합한 모델인지 판단하고 데이터의 과소적합 및 과적합 위험을 평가하여 모델 평가를 용이하게 합니다.

```python
model_history = model.fit(train_x, train_y,
                          validation_data=(test_x, test_y),
                          epochs=100, batch_size=64)
```

![image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_4.png)

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

이 코드는 특정 데이터셋을 활용한 기계 학습 모델의 훈련을 목적으로 합니다. 이 코드는 train_x와 train_y로 명명된 훈련 데이터에 대한 모델을 최적화하고, 독립적인 검증 데이터인 test_x와 test_y에서 모델의 성능을 평가하도록 구성되어 있습니다.

이 프로세스의 첫 번째 단계는 모델 적합입니다. fit 함수는 모델 객체에 호출되어 훈련 시퀀스를 시작합니다. 이 단계에서 모델은 train_x에 캡처된 입력 데이터를 train_y에 있는 해당 출력 레이블과 상관시키며 매개변수를 반복적으로 수정하여 학습합니다.

검증은 모델 성능을 평가하는 데 중요한 역할을 합니다. 검증 데이터를 통합함으로써 코드는 모델이 훈련 단계에 포함되지 않은 데이터에 대해 능력을 평가할 수 있게 합니다. 이 방법은 모델이 새로운, 보지 못한 인스턴스에 일반화하는 능력을 모니터링하는 데 중요합니다.

이 맥락에서 에포크 개념은 중요합니다. epochs 매개변수는 모델이 훈련 데이터 전체를 여러 번 횡단할 횟수를 나타내며, 이 경우 100으로 설정되어 있습니다. 이 반복은 모델이 데이터로부터 배울 기회를 여러 번 제공하여 가중치를 세밀하게 조정하여 예측 오류를 최소화합니다.

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

또 다른 중요한 매개변수는 배치 크기입니다. 이 매개변수는 모델이 매개변수를 조정하기 전에 학습 데이터셋에서 모아진 샘플의 수를 지정합니다. 배치 크기가 64이면 학습 데이터가 64개씩의 그룹으로 나뉘어 모델이 순차적으로 처리합니다. 이 전략은 메모리 사용량을 최적화하고 학습 과정의 수렴을 가속화하는 데 도움이 될 수 있습니다.

이 코드를 사용하는 이유는 여러 가지 중요한 측면을 포함합니다. 모델을 학습하는 것은 데이터를 정확하게 예측하거나 분류할 수 있는 시스템을 구축하는 데 기본적입니다. 또한, 검증 데이터를 사용하여 모델이 과적합되지 않도록 하는 것이 중요합니다. 이는 학습 데이터셋을 넘어 실제 응용 프로그램에서의 효과를 보장합니다. 또한, 에포크 수나 배치 크기와 같은 하이퍼파라미터를 조정할 수 있는 능력은 실무자가 특정 데이터셋과 목표에 맞게 학습 계획을 세밀하게 조정하여 결과를 향상시킬 수 있도록 합니다.

```js
plt.figure((figsize = [10, 6]));
plt.plot(model_history.history["loss"], (label = "train loss"));
plt.plot(model_history.history["val_loss"], (label = "val loss"));
plt.legend();
plt.show();
```

<img src="/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_5.png" />

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

위 코드는 기계 학습 모델의 훈련 과정을 시각화하는 데 사용됩니다. 구체적으로는 훈련 단계에서 다양한 에포크에서 손실 값들을 보여주는 것이 목적입니다.

간단히 설명하자면, 이 코드는 플롯을 표현하기 위해 새로운 그림을 만들어 특정 크기로 정의합니다. 그런 다음, 이 그림에 두 개의 선을 나타냅니다. 하나는 훈련 손실에 해당하고, 다른 하나는 모델의 검증 손실을 나타냅니다. 이러한 손실 값들은 훈련 에포크의 마지막에서 모델의 성능 지표를 모니터링하는 history 객체에서 파생됩니다. 시각화에 포함된 범례는 훈련과 검증 손실을 구분하여 결과를 해석하는 데 도움을 줍니다. 마지막으로, 플롯이 렌더링돼서 보여집니다.

이 코드의 중요성은 손실 값들을 모니터링하는 것이 모델의 학습 효과를 평가하는 데 중요하다는 점에 있습니다. 훈련 및 검증 손실의 추이를 분석하면 모델이 과적합, 과소적합 또는 최적으로 동작하는지에 대한 통찰력을 제공할 수 있습니다. 이러한 정보는 모델의 성능을 향상시키기 위해 모델 아키텍처, 하이퍼파라미터 및 훈련 절차를 필요에 맞게 조정하는 데 중요합니다.

예측은 과거 데이터와 분석을 기반으로 미래 이벤트에 대한 예측을 수행하는 프로세스를 의미합니다. 이 실천은 의사결정 및 전략적 계획을 이끄는 데 여러 산업 분야 전반에 널리 활용됩니다.

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

정확한 예측은 기업이 시장 동향, 소비자 행동 및 잠재적인 도전 과제를 예상할 수 있도록 돕습니다. 지난 패턴과 현재 상황을 분석함으로써, 기업은 정보를 기반으로 전략을 개발하여 운영을 향상시키고 전반적인 성과를 향상시킬 수 있습니다.

```js
train_predict = model.predict(train_x);
test_predict = model.predict(test_x);
```

이 코드 스니펫은 기계 학습 분야에서 사용되며, 훈련된 모델을 활용하여 예측을 수행하는 목적으로 특별히 설계되었습니다. 코드는 두 가지 주요 섹션으로 나뉘어 있으며, 각 섹션은 서로 다른 데이터 집합에 대해 예측을 생성하는 데 책임이 있습니다.

코드의 첫 번째 부분은 훈련 데이터 집합에 대한 예측을 수행하는 내용입니다. train_predict = model.predict(train_x)라는 줄은 이 작업을 수행합니다. 이 단계는 모델이 훈련 데이터를 기반으로 한 학습 능력을 평가하고, 이전에 접하지 않은 데이터에 대한 모델의 잠재적인 성능에 대한 가치 있는 통찰을 제공합니다.

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

코드의 두 번째 부분은 test_predict = model.predict(test_x)라는 줄에 나와 있는 대로 별도의 테스트 데이터셋에 대한 예측을 수행하는 것을 포함합니다. 이 단계는 모델의 일반화 능력을 평가하는 데 중요한 요소로, 이는 모델이 보지 못한 데이터에 대한 성능을 의미합니다.

이 문맥에서 '모델'이라는 용어는 훈련 데이터셋을 사용하여 사전에 훈련된 머신러닝 모델을 나타냅니다. predict() 메서드는 훈련 단계에서 학습한 패턴을 활용하여 입력 데이터인 train_x 또는 test_x에 적용하여 출력 예측을 만들어 냅니다.

이 코드를 활용하는 이유는 여러 가지가 있습니다. 훈련 및 테스트 데이터셋에 대한 예측을 수행함으로써 실무자들은 모델의 정확도를 판단하고, 오버피팅(과적합)과 같은 잠재적인 문제를 식별할 수 있습니다. 오버피팅은 모델이 훈련 데이터에서 잘 수행되지만 보지 못한 데이터에 직면했을 때 성능이 저하되는 현상을 의미합니다. 게다가 예측을 면밀히 조사함으로써 모델을 세밀하게 조정하고, 그 능력과 한계를 이해하며, 배포하거나 추가 수정에 대한 결정을 지원할 수 있습니다.

```js
trainPredictPlot = np.empty_like(df_close)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[time_step:len(train_predict)+time_step,:] = train_predict

testPredictPlot = np.empty_like(df_close)
testPredictPlot[:, :] = np.nan
testPredictPlot[len(train_predict) + (time_step*2) +1:len(df_close)-1, :] = test_predict

plt.figure(figsize=[12,8])
plt.plot(scaler.inverse_transform(df_close))
plt.plot(scaler.inverse_transform(trainPredictPlot))
plt.plot(scaler.inverse_transform(testPredictPlot))
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

![image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_6.png)

이 코드는 시계열 데이터의 예측에 관한 기계 학습 모델의 훈련 및 테스트 단계에서 생성된 예측을 설명하는 데 사용됩니다. 주식 가격 및 유사한 금융 지표를 포함한 시계열 데이터의 영역에서 특히 유용합니다.

처음에, 코드는 trainPredictPlot과 testPredictPlot이라는 두 개의 빈 배열을 생성합니다. 이들은 원본 데이터 집합인 df_close의 차원을 반영하고, NaN(숫자가 아님) 값으로 초기화됩니다. 이러한 값은 예측이 없는 부분이 시각화에 영향을 미치지 않도록 보장합니다.

다음 단계는 trainPredictPlot 배열을 훈련 데이터 집합에서 유도된 예측으로 채우는 것입니다. 이 과정은 시계열 데이터의 예측을 생성하는 데 관련된 지연을 고려하는 정의된 time_step에 해당하는 오프셋이 포함되어 있습니다.

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

동시에, 코드는 테스트 단계에서 예측값을 testPredictPlot 배열로 채웁니다. 여기서 추가적인 오프셋이 적용되는데, 이는 훈련 예측 기간의 지속 시간을 기반으로 합니다. 이 조정은 예측값이 훈련 이후 해당 시간 기간과 정확하게 일치하도록 보장합니다.

마지막으로, 코드는 Matplotlib을 활용하여 원래의 시계열 데이터를 나타내는 플롯을 생성합니다. 이 데이터는 해독력과 이해를 향상시키기 위해 역변환되었으며, 훈련 및 테스트 예측값과 함께 표시됩니다. 플로팅 과정은 명확성을 높이기 위해 지정된 그림 크기 내에서 실행됩니다.

이 코드는 NumPy를 활용하여 배열 생성 및 조작을 수행하며, 원본 데이터셋을 수정하지 않고 데이터를 시각화할 수 있습니다. 척도를 통한 역변환은 정규화된 데이터를 원래의 척도로 변환하여 시각화를 의미 있고 이해하기 쉽게 만드는 중요한 측면입니다.

이 코드를 사용하는 이유는 복합적입니다. 이는 실제 관측값과 예측값 간의 시각적 비교를 용이하게 하며, 기계 학습 모델의 정확성과 효과를 평가하는 데 중요합니다. 또한 모델 예측값이 실제 데이터와 얼마나 잘 일치하는지 시각적으로 평가함으로써, 트렌드와 계절적 패턴을 포착하는 모델의 능력을 더 잘 이해할 수 있으며, 오버피팅이나 언더피팅을 나타낼 수 있는 불일치를 식별하는 데 도움이 됩니다.

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

마지막으로, 결과의 시각적인 표현은 리포트나 프레젠테이션에 필수적이며, 이를 통해 이해관계자들이 예측 모델의 효과를 쉽게 파악할 수 있습니다.

```js
temp_input = list(x_input);
temp_input = temp_input[0].tolist();
temp_input;
```

<img src="/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_7.png" />

제공해 주신 코드 조각은 x_input이라는 입력 변수에 대해 일련의 작업을 수행합니다. 첫 번째 작업은 x_input을 list로 변환한 temp_input으로 지정하는 것입니다. 이 변환은 x_input이 numpy 배열과 같은 배열 구조에서 비롯된 경우에 유용하며, 표준 Python 리스트 프레임워크 내에서의 쉬운 반복과 조작을 가능케 합니다.

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

다음으로, 코드는 temp_input의 첫 번째 요소를 index 0을 사용하여 액세스하고 이 요소에 대해 tolist() 메서드를 호출하여 검색합니다. 이것은 첫 번째 요소가 또 다른 배열 구조일 가능성이 높으며, 아마도 넘파이 배열일 것으로 예상됩니다. tolist()의 사용은 이 요소를 전통적인 리스트 형식으로 변환하는 데 도움이 됩니다. 이 단계는 데이터 처리 유연성을 향상시키며, 특히 첫 번째 요소에 중요한 정보가 포함되어 있는 경우 유용합니다.

마지막 작업은 초기 입력의 첫 번째 요소에서 파생된 리스트로 구성된 temp_input을 출력합니다. 이로써 표준 Python 리스트로 효과적으로 변환되어, 추가 작업에 사용할 수 있게 됩니다.

```js
output = []
days = 517
for i in range(days):
    print('start')
    x_input = np.array(temp_input[i:])
    print(f'{i} day input {x_input}')
    x_input = x_input.reshape((1, time_step, 1))
    yhat = model.predict(x_input, verbose=0)
    print(yhat)
    temp_input.extend(yhat[0].tolist())
    output.extend(yhat[0].tolist())
```

![image](/assets/img/2024-08-17-PredictingMarketTrendsUsingStackedLSTMModels_8.png)

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

이 코드 스니펫은 머신 러닝 모델을 사용하여 예측을 생성하는 데 설계되었습니다. 이는 대부분의 경우 시계열 예측과 관련이 있습니다.

먼저, 예측 결과를 저장할 빈 리스트인 output이라는 이름의 리스트를 설정합니다. days라는 변수에는 예측을 생성할 일 수를 나타내는 517이라는 값을 할당합니다.

이후, 지정된 일 수만큼 반복되는 루프가 시작됩니다. 각 반복에서 여러 작업이 수행됩니다. 먼저, 현재 날짜에 대한 예측이 시작되었음을 알리는 메시지가 출력됩니다. 그런 다음 코드는 모델에 입력으로 제공될 temp_input이라는 이름의 데이터 세그먼트를 가져옵니다.

입력 데이터의 형태는 재구성 과정을 통해 조정됩니다. 이는 모델이 입력 차원을 정확히 해석할 수 있도록 필수적입니다. 이 변환은 데이터를 모델에서 요구하는 예상 형식과 일치시키는 데 사용됩니다. 이 형식은 한 시퀀스, 정의된 시간 단계 수 및 단일 피처로 구성됩니다.

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

모델은 그 후에 재구성된 입력을 기반으로 예측을 생성합니다. verbose=0 매개변수의 포함으로 인해 예측 단계에서 부가적인 출력이 없어져 효율성과 명확성을 높입니다. 예측 이후에는 예상 값이 인쇄되어 그 특정 날짜에 대한 모델의 예측에 대한 실시간 피드백을 제공합니다. 더불어, 이 예측된 값은 temp_input과 output에 모두 통합됩니다. temp_input에 추가함으로써 코드는 다음 날의 입력 데이터가 이 예측된 값이 포함되도록 보장하여 계속된 예측 프로세스를 용이하게 합니다.

이 코드의 합리적인 이유는 시계열 예측에 대한 응용에 있습니다. 시계열 예측은 주식 가격, 날씨 패턴 및 매출 예측과 같이 과거 데이터를 기반으로 미래 값을 예측해야 하는 상황에서 중요합니다. 이 반복적인 예측 접근법은 각 새로운 예측이 이전 결과를 통합함으로써 시간이 흐름에 따라 변화하는 예측을 생성할 수 있게 합니다. 이 방법은 특히 예측이 변동될 수 있는 동적 환경에서 특히 유익합니다.
