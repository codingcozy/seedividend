---
title: "FB Prophet과 하이퍼파라미터 최적화를 사용한 BTC-USD 가격 예측, 교차 검증 QC, 수정된 알고리즘 거래 전략"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_0.png"
date: 2024-07-13 19:54
ogImage: 
  url: /TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_0.png
tag: Tech
originalTitle: "BTC-USD Price Prediction using FB Prophet with Hyperparameter Optimization, Cross-Validation QC , Modified Algo-Trading Strategies"
link: "https://medium.com/@alexzap922/btc-usd-price-prediction-using-fb-prophet-with-hyperparameter-optimization-cross-validation-qc-7848b41dac30"
---


<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_0.png" />

- 본 글은 이전 연구를 이어가며, Python에서 Facebook의 Prophet을 활용한 BTC-USD 가격 예측에 대한 자세한 프레임워크를 개발하는 것을 목표로 합니다 [1–5] (참고 문헌).
- 현재의 비교 분석은 시간 시리즈 교차 검증 QC를 기반으로 한 히스토리컬 데이터를 사용하여 예측 오차를 측정하는 HPO 또는 모델 튜닝에 대해 자세히 살펴봅니다.
- 시뮬레이션된 BTC 예측에 추가되어, FB Prophet을 사용하여 크립토 알고트레이딩 전략을 최적화하는 방법에 대해 Buy & Hold 기준과 비교하여 설명합니다. 자세한 내용은 여기에서 확인하세요.

## 비즈니스 케이스

- 적절한 암호화폐 예측은 크립토 트레이더들에게 큰 이익을 가져다줄 수 있으며 효과적인 리스크 관리를 제공할 수 있습니다.
- 최근 BTC는 많은 가격 예측의 주제가 되었습니다.
- CoinCodex: BTC의 역사적인 가격 변동과 BTC 하프 사이클을 기반으로, BTC가 상한 가격 대상에 도달한다면 2025년까지 201.59%의 이익을 올릴 수 있습니다. 한편, BTC의 가격은 내년에 $173,833까지 상승할 것으로 예측됩니다.
- 하지만 비트코인 가격이 2030년까지 1백만 달러에 도달할까요?

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## FB Prophet에 대해

- FB Prophet은 추세/계절성 모델링과 베이지안 추론에 기초한 시계열 데이터 예측 절차입니다.
- 강한 계절 효과가 있는 시계열에 가장 적합하며, 누락 된 데이터, 이상치 및 추세 변동에 견고합니다.
- 예측 모델은 다음과 같은 4가지 구성 요소로 구성됩니다: 추세(장기간 동안의 변화), 계절성(주기적 또는 단기 변화), 휴일 및 특정 비즈니스에만 해당되는 조건부 변경 사항.
- 새로운 사용자에게 특히 흥미롭습니다. 모델의 하이퍼파라미터를 자동으로 찾아내는 능력과 쉬운 사용성으로 유명합니다.
- 추가적인 회귀 변수, 곱셈 계절성, 비일일 데이터, 불확실성 측정 및 진단이 포함됩니다.

이 라이브러리를 사용하여 BTC-USD 가격 예측의 구체적 내용을 살펴봅시다.

## 주요 설치 방법

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- pip은 저희가 선호하는 설치 프로그램입니다. Python 3.4부터 Python 이진 설치 프로그램에 기본적으로 포함되어 있습니다.
- Jupyter Notebook을 실행하고 필수 Python 라이브러리를 설치합니다.

```python
!pip install statsmodels, math, yfinance, prophet, plotly,matplotlib, itertools
```

## Imports & Settings

- 코드를 성공적으로 실행할 수 있도록 필요한 라이브러리 및 종속성이 제대로 설치되어 있는지 확인하세요.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import pandas as pd
import plotly.express as px
import requests
import numpy as np
import matplotlib.pyplot as plt
from math import floor
from termcolor import colored as cl
import yfinance as yf
import datetime
from datetime import date, timedelta

# Prophet 라이브러리 불러오기
from prophet import Prophet

plt.rcParams['figure.figsize'] = (12, 6)
plt.style.use('fivethirtyeight')

import os
os.chdir('작업경로')    # 작업 디렉토리 설정
os.getcwd()
```

## 주식 데이터 입력

- 730일의 BTC-USD 이력 데이터 입력

```js
today = date.today()

d1 = today.strftime("%Y-%m-%d")
end_date = d1
d2 = date.today() - timedelta(days=730)
d2 = d2.strftime("%Y-%m-%d")
start_date = d2

data = yf.download('BTC-USD', 
                      start=start_date, 
                      end=end_date, 
                      progress=False)
data["Date"] = data.index
data = data[["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]]
data.reset_index(drop=True, inplace=True)
data.tail()

|   Date    |    Open    |    High    |   Low    |   Close    |  Adj Close  |   Volume      |
|----------|------------|------------|---------|------------|-------------|--------------|
|2024-07-02| 62,844.41  | 63,203.36  | 61,752.75|   62,029.02 |  62,029.02  |  20151616992  |
|2024-07-03| 62,034.33  | 62,187.70  | 59,419.39|   60,173.92 |  60,173.92  |  29756701685  |
|2024-07-04| 60,147.14  | 60,399.68  | 56,777.80|   56,977.70 |  56,977.70  |  41149609230  |
|2024-07-05| 57,022.81  | 57,497.15  | 53,717.38|   56,662.38 |  56,662.38  |  55417544033  |
|2024-07-06| 56,659.07  | 58,472.55  | 56,038.96|   58,303.54 |  58,303.54  |  20610320577  |
```   

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 종가 그래프 그리기

```js
plt.plot(data['Date'], data['Close'])
plt.xlabel('날짜')
plt.ylabel('종가(USD)')
plt.title('BTC-USD 종가')
```

![BTC-USD Close Price](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_1.png)

## 데이터 준비

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Box Cox 변환을 사용하여 비정규적인 종속 변수인 Close 가격을 정규분포 형태로 변환합니다.

```js
### Box Cox 변환
from statsmodels.base.transform import BoxCox

bc = BoxCox()
data["Close"], lmbda = bc.transform_boxcox(data["Close"])
```

- Prophet에 입력 데이터 만들기

```js
data1 = data[["Date", "Close"]]
data1.columns = ["ds", "y"]

data1.tail()

    ds          y
725 2024-07-02 42.381398
726 2024-07-03 42.086488
727 2024-07-04 41.560999
728 2024-07-05 41.507898
729 2024-07-06 41.781750
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Prophet에 입력해야 하는 것은 항상 ds와 y 두 개의 열이 있는 데이터프레임입니다. ds (날짜) 열은 Pandas에서 예상하는 형식이어야 합니다. 날짜의 경우 YYYY-MM-DD이고, 타임스탬프의 경우 YYYY-MM-DD HH:MM:SS입니다. y 열은 숫자이어야 하며, 예측하려는 측정 값을 나타냅니다.

## Max Cap과 5% 표준편차를 사용한 Prophet

- 매년 곱셈 계절성과 로지스틱 성장이 있는 모델 매개변수 목록을 생성합니다.

```js
model_param = {
    "daily_seasonality": False,
    "weekly_seasonality": False,
    "yearly_seasonality": True,
    "seasonality_mode": "multiplicative",
    "growth": "logistic"
}
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 기본적으로 Prophet은 가법 계절성 모델을 적합시키며, 계절성의 영향이 예측을 얻기 위해 추세에 더해집니다. 위 모델에서 계절성은 Prophet이 가정한 것처럼 일정한 가법적 요소가 아니라 추세와 함께 증가하는 다중 계절성입니다.
- 기본적으로 Prophet은 예측을 위해 선형 모델을 사용합니다. 성장을 예측할 때 일반적으로 일정한 최대 달성 가능 지점이 있습니다: 총 시장 규모 등. 이를 운반 용량이라고하며, 예측은 이 지점에서 포화되어야 합니다. Prophet은 지정된 운반 용량을 갖춘 로지스틱 성장 트렌드 모델을 사용하여 예측을 수행할 수 있습니다.
- 모델 실행

```js
model = Prophet(**model_param)
```

- 로지스틱 성장을 사용하기 때문에 예측에 대한 상한선 또는 상한 값을 설정합니다. 상한값은 가격의 최대값에 표준편차의 5%를 더하는 것입니다.

```js
data1['cap'] = data1["y"].max() + data1["y"].std() * 0.05
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 모델을 맞추는 중

```js
model.fit(data1)
```

- 위의 캡을 사용하여 샘플 내부 및 1년 장기 예측 생성

```js
future= model.make_future_dataframe(periods=365)

future['cap'] = data1['cap'].max()

forecast= model.predict(future)
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 중요한 구성 요소를 사용하여 (ds-y) 도메인 예측을 플로팅합니다.

```js
model.plot(forecast,figsize=(14, 8))
```

![BTC-USD 가격 예측](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_2.png)

```js
model.plot_components(forecast,figsize=(16, 10));
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이전에 사용하던 table tag를 Markdown 형식으로 변경해보세요.

## Prophet with Monthly/Quarterly Seasonality & US Holidays

- Prophet를 월별/분기별 계절성 및 미국 공휴일과 함께 실행 중

```js
model = Prophet(**model_param)

model.add_seasonality(name="monthly", period=30, fourier_order=10)
model.add_seasonality(name="quarterly", period=92.25, fourier_order=10)

model.add_country_holidays("US")

model.fit(data1)

# 미래 데이터프레임 생성
future = model.make_future_dataframe(periods=365)
future['cap'] = data1['cap'].max()

forecast = model.predict(future)

from prophet.plot import plot

plot(model, forecast, figsize=(14, 8))
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from prophet.plot import plot_components

plot_components(model, forecast, figsize=(10, 12))
```

위의 코드 블록은 Prophet 모델을 사용하여 예측한 데이터의 구성요소를 시각화하는 부분입니다. 코드를 실행하여 예측 결과를 확인해보세요! 🚀


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 원래 가격을 얻기 위해 역 Box-Cox 변환을 수행합니다

```js
forecast["yhat"]=bc.untransform_boxcox(x=forecast["yhat"], lmbda=lmbda)
forecast["yhat_lower"]=bc.untransform_boxcox(x=forecast["yhat_lower"], lmbda=lmbda)
forecast["yhat_upper"]=bc.untransform_boxcox(x=forecast["yhat_upper"], lmbda=lmbda)
forecast.plot(x="ds", y=["yhat_lower", "yhat", "yhat_upper"])
```

![BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_7](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_7.png)

- 수동으로 선택한 cutoff를 사용하여 예측 성능의 몇 가지 유용한 통계를 계산합니다

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from prophet.diagnostics import cross_validation, performance_metrics
from prophet.plot import plot_cross_validation_metric
df_cv = cross_validation(model, initial="600 days", period="30 days", horizon="90 days")
cutoffs = pd.to_datetime(['2022-09-01', '2023-05-01', '2024-03-01'])
df_cv2 = cross_validation(model, cutoffs=cutoffs, horizon='90 days')
fig = plot_cross_validation_metric(df_cv2, metric='rmse')
```

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_8.png" />

- 성능 메트릭 요약 정보 출력

```js
df_p = performance_metrics(df_cv2)
df_p.head()

    horizon mse      rmse       mae       mape     mdape   smape coverage
0 9 days 3805.462369 61.688430 29.520999 0.893692 0.118312 0.355870 0.0
1 10 days 5382.793620 73.367524 37.768231 1.140719 0.168333 0.425770 0.0
2 11 days 6754.735216 82.187196 45.409934 1.368028 0.286148 0.491224 0.0
3 12 days 7678.053041 87.624500 51.465541 1.551664 0.352840 0.546114 0.0
4 13 days 8071.329465 89.840578 55.027843 1.658574 0.426625 0.584601 0.0
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- MAPE 그래프 그리기

```js
fig = plot_cross_validation_metric(df_cv2, metric='mape')
```

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_9.png" />

- MAE 그래프 그리기

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
fig = plot_cross_validation_metric(df_cv2, metric='mae')
```

![BTC-USD Price Prediction using FB Prophet with Hyperparameter Optimization Cross-Validation QC Modified Algorithm Trading Strategies](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_10.png)

## Hyperparameter Optimization (HPO)

- Running HPO by adding monthly/quarterly seasonality and US holidays

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
rmses = list()

# 각 조합을 순회합니다.
for params in all_params:
    m = Prophet(**params)
    
    m = m.add_seasonality(name='monthly', period=30, fourier_order=5)
    m = m.add_seasonality(name='quarterly', period=92.25, fourier_order=10)

    m.add_country_holidays(country_name='US')
    
    m.fit(data1)
    
    df_cv = cross_validation(m, initial='500 days', period='180 days', horizon='90 days')
    
    df_p = performance_metrics(df_cv, rolling_window=1)
    
    rmses.append(df_p['rmse'].values[0])
    
# 최적의 매개변수를 찾습니다.
best_params = all_params[np.argmin(rmses)]
    
print("\n최적의 매개변수는:", best_params)
```

- 최적화된 모델을 피팅하고 해당하는 예측 생성

```js
model_param1 = {
    'daily_seasonality': False,
    'weekly_seasonality': False,
    'yearly_seasonality': True,
    'seasonality_mode': 'multiplicative',
    'growth': 'logistic',
    'seasonality_prior_scale': 0.1,
    'changepoint_prior_scale': 0.01
}

model1 = Prophet(**model_param1)

model1.add_country_holidays('US')

model1.fit(data1)

# 향후 데이터 프레임 생성
future = model1.make_future_dataframe(periods=365)
future['cap'] = data1['cap'].max()

forecast = model1.predict(future)
```

- 원래 가격을 얻기 위해 역 Box-Cox 변환을 적용합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

 js
forecast["yhat"]=bc.untransform_boxcox(x=forecast["yhat"], lmbda=lmbda)
forecast["yhat_lower"]=bc.untransform_boxcox(x=forecast["yhat_lower"], lmbda=lmbda)
forecast["yhat_upper"]=bc.untransform_boxcox(x=forecast["yhat_upper"], lmbda=lmbda)
forecast.plot(x="ds", y=["yhat_lower", "yhat", "yhat_upper"])


<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_11.png" />

- 수동 cutoff로 교차 검증 QC 실행 중

```js
cutoffs = pd.to_datetime(['2022-09-01', '2023-05-01', '2024-03-01'])
df_cv2 = cross_validation(model1, cutoffs=cutoffs, horizon='90 days')
fig = plot_cross_validation_metric(df_cv2, metric='rmse')
``` 


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![image](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_12.png)


```js
fig = plot_cross_validation_metric(df_cv2, metric='mape')
```

![image](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_13.png)

```js
fig = plot_cross_validation_metric(df_cv2, metric='mae')
``` 


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![BTC-USD Price Prediction](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_14.png)

## 2020년부터 2024년까지 BTC-USD 역사적 데이터 준비

- 박스-콕스(Box-Cox) 변환을 하지 않고 2020년 01월 01일부터 2024년 07월 07일까지의 BTC-USD 역사적 데이터를 준비합니다.

```js
import pandas as pd
import numpy as np
from prophet import Prophet
import matplotlib.pyplot as plt
from functools import reduce

%matplotlib inline
import warnings
warnings.filterwarnings('ignore')

pd.options.display.float_format = "{:,.2f}".format

import yfinance as yf

ticker = 'BTC-USD'
start_date = '2020-01-01'

stock_price = yf.download(ticker, start=start_date)
stock_price["날짜"] = stock_price.index
stock_price.tail()

           Open      High      Low       Close    Adj Close   Volume      날짜
Date       
2024-07-03 62,034.33 62,187.70 59,419.39 60,173.92 60,173.92 29756701685 2024-07-03
2024-07-04 60,147.14 60,399.68 56,777.80 56,977.70 56,977.70 41149609230 2024-07-04
2024-07-05 57,022.81 57,497.15 53,717.38 56,662.38 56,662.38 55417544033 2024-07-05
2024-07-06 56,659.07 58,472.55 56,038.96 58,303.54 58,303.54 20610320577 2024-07-06
2024-07-07 58,239.43 58,367.18 56,644.89 57,198.04 57,198.04 19585976320 2024-07-07

stock_price = stock_price[['날짜','Adj Close']]

stock_price.columns = ['ds', 'y']
stock_price.tail()

           ds          y
Date  
2024-07-03 2024-07-03 60,173.92
2024-07-04 2024-07-04 56,977.70
2024-07-05 2024-07-05 56,662.38
2024-07-06 2024-07-06 58,303.54
2024-07-07 2024-07-07 57,198.04
```


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 기본 Prophet 모델을 적합시키고 2027년 7월 7일까지의 예측을 생성합니다.

```js
model = Prophet()
model.fit(stock_price)
future = model.make_future_dataframe(1095, freq='d')

future_boolean = future['ds'].map(lambda x : True if x.weekday() in range(0, 5) else False)
future = future[future_boolean] 

future.tail()
ds
2738 2027-07-01
2739 2027-07-02
2742 2027-07-05
2743 2027-07-06
2744 2027-07-07

forecast = model.predict(future)
#forecast.tail()

model.plot(forecast);
```

![BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_15](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_15.png)

- 주요 구성 요소를 플롯합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


model.plot_components(forecast);


![Forecast Plot](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_16.png)

- 원래 가격과 예측을 신뢰 구간과 함께 그래픽으로 표시합니다.

```python
stock_price_forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
df = pd.merge(stock_price, stock_price_forecast, on='ds', how='right')
df.set_index('ds').plot(figsize=(16,8), color=['royalblue', "#34495e", "#e74c3c", "#e74c3c"], grid=True);
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![image](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_17.png)

- Date 열을 3 부분(연/월/일)으로 분할하고 Prophet 모델을 fitting합니다.

```python
stock_price['dayname'] = stock_price['ds'].dt.day_name()
stock_price['month'] = stock_price['ds'].dt.month
stock_price['year'] = stock_price['ds'].dt.year
stock_price['month/year'] = stock_price['month'].map(str) + '/' + stock_price['year'].map(str) 

stock_price = pd.merge(stock_price, 
                       stock_price['month/year'].drop_duplicates().reset_index(drop=True).reset_index(),
                       on='month/year',
                       how='left')

stock_price = stock_price.rename(columns={'index':'month/year_index'})

loop_list = stock_price['month/year'].unique().tolist()
max_num = len(loop_list) - 1
forecast_frames = []

for num, item in enumerate(loop_list):

    if  num == max_num:
        pass
    else:
        df = stock_price.set_index('ds')[
             stock_price[stock_price['month/year'] == loop_list[0]]['ds'].min():\
             stock_price[stock_price['month/year'] == item]['ds'].max()]
        
        df = df.reset_index()[['ds', 'y']]
        
        model = Prophet()
        model.fit(df)
        
        future = stock_price[stock_price['month/year_index'] == (num + 1)][['ds']]

        forecast = model.predict(future)
        forecast_frames.append(forecast)
```

- In-sample forecast와 원래 가격을 비교하는 그래프 그리기


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
주가 예측 = reduce(lambda top, bottom: pd.concat([top, bottom], sort=False), 예측_프레임)
주가 예측 = 주가 예측[['일자', '예측값', '예측값_하한', '예측값_상한']]

데이터프레임 = pd.merge(주가[['일자','실제가격', '월/연도_인덱스']], 주가 예측, on='일자')
데이터프레임['변동률'] = 데이터프레임['실제가격'].pct_change()
데이터프레임.set_index('일자')[['실제가격', '예측값', '예측값_하한', '예측값_상한']].plot(figsize=(16,8), color=['royalblue', "#34495e", "#e74c3c", "#e74c3c"], grid=True)
```

![이미지](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_18.png)

- 교차 검증 수행 중

```python
from prophet.diagnostics import performance_metrics
성능_메트릭스 = performance_metrics(df_cv)
성능_메트릭스.head()

  horizon  mse          rmse      mae     mape mdape smape coverage
0 37 일    40,821,715.40 6,389.19 4,890.31 0.18 0.12 0.22 0.55
1 38 일    41,109,990.95 6,411.71 4,913.96 0.18 0.12 0.22 0.55
2 39 일    41,311,288.83 6,427.39 4,922.43 0.19 0.12 0.22 0.55
3 40 일    41,641,137.72 6,452.99 4,943.99 0.19 0.12 0.22 0.55
4 41 일    42,299,834.63 6,503.83 5,003.53 0.19 0.12 0.23 0.54

from prophet.plot import plot_cross_validation_metric
그래프 = plot_cross_validation_metric(df_cv, metric='rmse')
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>


![Plotting MAPE](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_19.png)

- MAPE 플로팅

```js
fig = plot_cross_validation_metric(df_cv, metric='mape')
```

![MAPE Plot](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_20.png)


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- MAE 그래프 플로팅하기

```js
fig = plot_cross_validation_metric(df_cv, metric='mae')
```

![MAE Plot](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_21.png)

- 그리드 검색 하이퍼파라미터 최적화 구현 및 MAE를 사용하여 모델 평가하기

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 하이퍼파라미터 그리드 정의
from sklearn.metrics import mean_absolute_error
param_grid = {
    'seasonality_mode': ['additive', 'multiplicative'],
    'changepoint_prior_scale': [0.01, 0.1, 1, 10],
    'seasonality_prior_scale': [0.01, 0.1, 1, 10],
}

# 모델을 평가하기 위한 도우미 함수
def evaluate_model(model, metric_func):
    df_cv = cross_validation(model, initial='1125 days', period='180 days', horizon='365 days')
    return metric_func(df_cv['y'], df_cv['yhat'])

# 그리드 서치
best_params = {}
best_score = float('inf')

for mode in param_grid['seasonality_mode']:
    for cps in param_grid['changepoint_prior_scale']:
        for sps in param_grid['seasonality_prior_scale']:
            # 현재 하이퍼파라미터를 사용하여 모델 생성
            m = Prophet(seasonality_mode=mode, changepoint_prior_scale=cps, seasonality_prior_scale=sps)
            m.fit(stock_price)

            # 평가 지표로 평가 모델(Mean Absolute Error 사용)
            score = evaluate_model(m, mean_absolute_error)

            # 필요 시 최적의 매개변수 업데이트
            if score < best_score:
                best_score = score
                best_params = {
                    'seasonality_mode': mode,
                    'changepoint_prior_scale': cps,
                    'seasonality_prior_scale': sps
                }

print(best_params)

{'seasonality_mode': 'additive', 'changepoint_prior_scale': 0.1, 'seasonality_prior_scale': 10}

print(best_score)
8675.430008099349
```

- 최적화된 모델을 적합하고 1년 예측 생성

```js
# 최적의 매개변수로 모델 생성
m_best = Prophet(seasonality_mode='additive', changepoint_prior_scale=0.1, seasonality_prior_scale=10)
m_best.fit(stock_price)

# 365일을 포함한 예측을 위한 데이터프레임
future_best = m_best.make_future_dataframe(periods=365)
forecast_best = m_best.predict(future_best)

# 예측 데이터와 함께 그래프 그리기
fig1 = m.plot(forecast_best)
ax = fig1.gca()
ax.set_title("BTC-USD 주가 예측", size=25)
ax.set_xlabel("날짜", size=15)
ax.set_ylabel("가격", size=15)
```

![BTC-USD Stock Price Forecast](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_22.png)


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- scikit-learn과 Prophet 지표를 사용하여 교차 검증 QC 수행 중

```js
# 교차 검증 실행
from sklearn.metrics import mean_squared_error
df_cv = cross_validation(m_best, initial='1125 days', period='180 days', horizon='365 days')

# 성능 지표 계산
df_metrics = performance_metrics(df_cv)

# MAE, MSE 및 RMSE 계산
mae = mean_absolute_error(df_cv['y'], df_cv['yhat'])
mse = mean_squared_error(df_cv['y'], df_cv['yhat'])
rmse = np.sqrt(mse)

print(f'평균 절대 오차: {mae:.2f}')
print(f'평균 제곱 오차: {mse:.2f}')
print(f'제곱근 평균 제곱 오차: {rmse:.2f}')

평균 절대 오차: 8675.43
평균 제곱 오차: 107375840.73
제곱근 평균 제곱 오차: 10362.23

from prophet.plot import plot_cross_validation_metric
df_cv = cross_validation(m_best, initial='1125 days', period='180 days', horizon='365 days')
fig = plot_cross_validation_metric(df_cv, metric='rmse')
```

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_23.png" />

- MAPE 플로팅하기

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
fig = plot_cross_validation_metric(df_cv, metric='mape')
```

![image](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_24.png)

- MAE 그리기

```python
fig = plot_cross_validation_metric(df_cv, metric='mae')
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_25.png" />

- In-Sample 및 Out-of-Sample 1년 Prophet 예측과 신뢰 구간을 동시에 플로팅합니다 (원래 스케일)

```js
loop_list = stock_price['month/year'].unique().tolist()
max_num = len(loop_list) - 1
forecast_frames = []

for num, item in enumerate(loop_list):

    if num == max_num:
        pass
    else:
        df = stock_price.set_index('ds')[
             stock_price[stock_price['month/year'] == loop_list[0]]['ds'].min():\
             stock_price[stock_price['month/year'] == item]['ds'].max()]
        
        df = df.reset_index()[['ds', 'y']]
        
        future = stock_price[stock_price['month/year_index'] == (num + 1)][['ds']]

        forecast = m_best.predict(future)
        forecast_frames.append(forecast)

stock_price_forecast1 = reduce(lambda top, bottom: pd.concat([top, bottom], sort=False), forecast_frames)
stock_price_forecast1 = stock_price_forecast1[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

df1 = pd.merge(stock_price[['ds','y', 'month/year_index']], stock_price_forecast1, on='ds')
df1['Percent Change'] = df1['y'].pct_change()
df1.set_index('ds')[['y', 'yhat', 'yhat_lower', 'yhat_upper']].plot(figsize=(16,8), color=['royalblue', "#34495e", "#e74c3c", "#e74c3c"], grid=True)
```

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_26.png" />

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 수정된 암호화폐 알고리즘 트레이딩 전략

- 다음과 같이 Prophet를 기반으로 한 암호화폐 알고리즘 트레이딩 전략을 수정합시다.

```js
#트레이딩 알고리즘
df=df1.copy()
df['Hold'] = (df['Percent Change'] + 1).cumprod()
df['Prophet'] = ((df['yhat'].shift(-1) > df['yhat']).shift(1) * (df['Percent Change']) + 1).cumprod()
df['Prophet Thresh'] = ((df['y'] < df['yhat_upper']).shift(1) * (df['Percent Change']) + 1).cumprod()
df['Seasonality'] = ((~df['ds'].dt.month.isin([8,9])).shift(1) * (df['Percent Change']) + 1).cumprod()

(df.dropna().set_index('ds')[['Hold', 'Prophet', 'Prophet Thresh','Seasonality']] * 1000).plot(figsize=(16,8), grid=True)

print(f"Hold = {df['Hold'].iloc[-1]*1000:,.0f}")
print(f"Prophet = {df['Prophet'].iloc[-1]*1000:,.0f}")
print(f"Prophet Thresh = {df['Prophet Thresh'].iloc[-1]*1000:,.0f}")
print(f"Seasonality = {df['Seasonality'].iloc[-1]*1000:,.0f}")

Hold = 6,090
Prophet = 87,595
Prophet Thresh = 18,681
Seasonality = 7,172
```

![이미지](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_27.png)

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 여기에서 Prophet Thresh df['y']` df['yhat_lower'] 를 조건 df['y']` df['yhat_upper'] 로 바꿔 더 높은 예상 수익을 얻을 수 있었습니다.
- 위의 Prophet 임계값을 최적화해 봅시다.

```js
performance = {}

for x in np.linspace(.9,.99,10):
    y = ((df['y'] < df['yhat_upper']*x).shift(1)* (df['퍼센트 변화']) + 1).cumprod()
    performance[x] = y
    
best_yhat = pd.DataFrame(performance).max().idxmax()
pd.DataFrame(performance).plot(figsize=(16,8), grid=True);
f'최적의 Yhat = {best_yhat:,.2f}'

'최적의 Yhat = 0.92'
```

![이미지](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_28.png)

- Best Yhat = 0.92로 백테스트 실행중

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
df['Optimized Prophet Thresh'] = ((df['y'] < df['yhat_upper'] * best_yhat).shift(1) * 
                                  (df['Percent Change']) + 1).cumprod()

(df.dropna().set_index('ds')[['Hold', 'Prophet', 'Prophet Thresh', 
                              'Seasonality', 'Optimized Prophet Thresh']] * 1000).plot(figsize=(16,8), grid=True)

print(f"Hold = {df['Hold'].iloc[-1]*1000:,.0f}")
print(f"Prophet = {df['Prophet'].iloc[-1]*1000:,.0f}")
print(f"Prophet Thresh = {df['Prophet Thresh'].iloc[-1]*1000:,.0f}")
print(f"Seasonality = {df['Seasonality'].iloc[-1]*1000:,.0f}")
print(f"Optimized Prophet Thresh = {df['Optimized Prophet Thresh'].iloc[-1]*1000:,.0f}")

Hold = 6,090
Prophet = 87,595
Prophet Thresh = 18,681
Seasonality = 7,172
Optimized Prophet Thresh = 36,769
```

<img src="/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_29.png" />

- 요약:
    - ROI(Prophet)/ROI(Optimized Prophet Thresh) 약 2.4배
    - ROI(Prophet)/ROI(Hold) 약 14.0배
    - ROI(Optimized Prophet Thresh)/ROI(Prophet Thresh) 약 2.0배
    - ROI(Prophet Thresh)/ROI(Seasonality) 약 2.5배
    - ROI(Seasonality)/ROI(Hold) 약 1.0배

## 프로핏 플롯리 시각화와 변경 지점들

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Prophet Plotly 시각화 옵션을 살펴봅시다.

```js
mydf=stock_price[['ds','y']]
mm = Prophet()
mm.fit(mydf)
future = mm.make_future_dataframe(periods=365)
forecast = mm.predict(future)
from prophet.plot import plot_plotly

plot_plotly(mm, forecast)
```

![Prophet Plotly Visualization](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_30.png)

- Plotly를 사용하여 Prophet 예측값과 변화점을 시각화합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
from prophet.plot import plot_plotly

plot_plotly(mm, forecast, changepoints=True)
```

![BTC-USD Price Prediction](/TIL/assets/img/2024-07-13-BTC-USDPricePredictionusingFBProphetwithHyperparameterOptimizationCross-ValidationQCModifiedAlgo-TradingStrategies_31.png)

## 결론

- 이 포스트에서는 Prophet (Facebook의 시계열 예측 라이브러리)를 사용하여 BTC-USD 가격을 예측하는 방법을 분석했습니다.
- Yahoo Finance Python을 사용하여 2 개의 데이터 세트를 다운로드했습니다: (1) 2024-07-06까지 730 일 동안; (2) 2020-01-01부터 2024-07-07까지.
- 데이터 세트 1을 사용하여 Box-Cox 변환과 미국의 휴일을 고려한 HPO를 테스트했습니다.
- 데이터 세트 2를 다운로드하여 Prophet HPO 예측을 3 부분(연도, 월, 일)으로 분할 한 후 루프를 통해 다중 계절성 처리의 가치를 보여주었습니다.
- Prophet 교차 검증 기능에 대한 자세한 내용을 탐구하여 두 데이터 세트에 대한 RMSE, MAPE 및 MAE와 같은 여러 주요 지표를 비교했습니다.
- 데이터 세트 2: 최종 인샘플 Prophet 오류 지표는 다음과 같습니다.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
Mean Absolute Error: 8675.43
Mean Squared Error: 107375840.73
Root Mean Squared Error: 10362.23
```

- 데이터 집합 2: 350일 주기의 외부 샘플 Prophet HPO 오류 메트릭

```js
MAPE 약 0.2-0.4, (MAE, RMSE) 약 10k-15k
```

- Plotly를 사용하여 Prophet 예측 시점의 변화를 그래픽으로 표현하는 가치를 설명했습니다.
- 마지막으로, 데이터 집합 2를 사용하여 여러 유용한 Prophet 기반 백테스팅 암호화 알고리즘 트레이딩 전략을 Hold 벤치마크에 대해 탐색했습니다.
- 백테스팅 결과는 ROI(Prophet)/ROI(Hold) 약 14.0임을 보여주었습니다.
- 테스트 결과, Prophet 추세가 외부 데이터 없이도 정확히 추정될 수 있음을 확인했습니다. 시계열이 강력한 계절적 사업주기를 따른다는 것을 고려할 때, Prophet가 상당히 잘 작동한다는 것을 발견했습니다.
- Prophet의 다른 통계 모델 및 기계 학습보다 중요한 장점 중 하나는 해석 가능성입니다. Prophet은 시간 기능을 따로 만들 필요가 없기 때문에 빠르게 좋은 기준을 제공합니다.
- 전반적으로, 시계열이 비즈니스 주기를 따라간다면 Prophet를 기준 모델로 사용할 가치가 있다는 결론을 내립니다 (참고 자료 참조).

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 참고 자료

- Facebook Prophet를 사용한 주식 가격 예측
- Prophet 진단
- Facebook Prophet 시작하기
- Facebook Prophet로 시계열 예측
- FB Prophet를 사용한 BTC 가격 예측

## 연락처

- 웹사이트
- GitHub
- Facebook
- X/Twitter
- Pinterest
- Mastodon
- Tumblr

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 고지사항

- 다음 고지는 본 글의 정보가 교육 목적으로만 제공되었음을 명확히하며, 재정 또는 투자 자문으로 간주되어서는 안 된다는 것을 명시합니다.
- 제공된 정보는 귀하 개인의 재정 상황, 목표 또는 리스크 허용도를 고려하지 않습니다.
- 귀하가 취하는 투자 결정이나 조치는 전적으로 귀하의 책임입니다.
- 재정 목표, 리스크 허용도 및 투자 기간에 따라 어떠한 투자의 적합성을 독립적으로 평가해야 합니다.
- 특정 요구 사항에 맞는 맞춤 가이드 제공이 가능한 자격을 갖춘 재무 전문가의 조언을 구하는 것이 권장됩니다.
- 제공된 도구, 데이터, 콘텐츠, 정보는 맞춤화되지 않았으며 어떤 개인의 투자 요구 사항에 부합하도록 제공된 것이 아니므로 정보 및 교육 목적만을 위해 제공됩니다.

## 자료

https://www.kaggle.com/code/alexkaggle95/stock-prices-forecast-plotly-prophet 나쁨

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

https://www.kaggle.com/code/ghazanfarali/stock-price-analysis-and-forecasting 페이지를 방문해 보세요! 해당 페이지에는 주식 가격 분석 및 예측과 관련된 정보가 있습니다. 좋은 정보를 얻을 수 있을 거예요!