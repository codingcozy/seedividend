---
title: "잡음 저항 칼만 필터 이동 평균KMA 대 단순 이동 평균SMA 교차 알고 트레이딩 전략 BAC 쇼케이스"
description: ""
coverImage: "/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_0.png"
date: 2024-06-20 04:43
ogImage: 
  url: /assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_0.png
tag: Tech
originalTitle: "Noise-Resistant Kalman Filter Moving Average (KMA) vs SMA Crossover Algo-Trading Strategies: BAC Showcase"
link: "https://medium.com/@alexzap922/noise-resistant-kalman-filter-moving-average-kma-vs-sma-crossover-algo-trading-strategies-bac-b1573e7d38ee"
isUpdated: true
---




- 대부분의 기술적거래지표(TTI)는 과거 주식 데이터에서 유래되며 미래 가격 흐름 반전을 예측하고 거래 결정을 내리는 데 거래자들에 의해 사용됩니다.
- 금융 시장 예측은 시간에 따라 변하는 시장 소음 수준이 뒤틀리는 기본 트렌드와 계절적 주기의 이미지를 왜곡하기 때문에 매우 어려운 작업임이 널리 인정되고 있습니다.
- 알고트레이딩에서 기술적 분석은 항상 패턴 및 신호를 식별하는 데 의존하지만 때로는 신뢰성 없는 것이 있을 수 있습니다. (신호/소음)`1.
- 실제로, 가짜 가격 변동 및 오작동이 잘못된 TTI 신호를 초래하여 리스크-수익 최적화를 감소시키고 좋지 않은 거래 전략을 야기할 수 있습니다.
- 본 게시물에서는 불확실하고 정확하지 않은 시계열 데이터에 기초한 숨겨진 변수의 소음이 적절한 확률 추정을 제공하는 칼만 필터(KF)를 사용하여 TTI의 상기한 단점을 다룰 것입니다.
- KF는 선형 가우시안 상태 공간 모델에서 이론적으로 최적인 것으로 알려져 있으며, 추정된 오차 공분산을 최소화함으로써 베이지안 예측 및 수정의 최적의 재귀적 구현이라고 할 수 있습니다. 
- 여기서, 우리의 목적은 짧은 윈도우 칼만 필터 이동 평균(KMA)를 도입하여 SMA 크로스오버 거래 전략의 극심한 소음 민감성을 줄이는 것입니다.
- 사례 예시로, BAC 주식의 예상 수익율을 비교하여 KMA, SMA 크로스오버 및 매수 & 보유 알고트레이딩 전략의 백테스트 분석을 수행할 것입니다.
- 비즈니스적인 측면에서, 제안된 연구는 계속되는 알고트레이딩 SaaS R&D 노력을 촉진하여 BAC에 대한 거래 봇 및 백테스팅 결과를 업데이트합니다. 이러한 노력은 은행이 대량의 핀테크 데이터를 분석하고 신속하게 거래를 실행하여 이윤을 극대화하고 인적 오류를 최소화합니다.

우리의 접근 방식을 구체적으로 살펴보겠습니다.

## 기본 Imports 및 설정

<div class="content-ad"></div>

- 현재 작업 디렉토리를 YOURPATH로 설정하기

```python
import os
os.chdir('YOURPATH')    # 작업 디렉토리 설정
os.getcwd()
```

- Python 라이브러리 가져오고 설치하기

```python
!pip install yfinance, pykalman

import pandas as pd 
import matplotlib.pyplot as plt 
import requests
import math
from termcolor import colored as cl 
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
from pykalman import KalmanFilter

plt.style.use('fivethirtyeight')
plt.rcParams['figure.figsize'] = (12, 6)
```

<div class="content-ad"></div>

## 주식 데이터 입력 읽기

- 야후 파이낸스에서 BAC의 과거 데이터 가져오기

```js
data = yf.download('BAC', start='2023-01-01', end='2024-06-01')

df=data.drop(columns=['Open', 'High','Low','Adj Close','Volume'])
df.tail()

           Close
Date 
2024-05-24 39.700001
2024-05-28 39.320000
2024-05-29 38.720001
2024-05-30 38.630001
2024-05-31 39.990002
```

## KMA vs SMA40

<div class="content-ad"></div>

- 파이칼만(pykalman)을 사용한 KF 구현 및 SMA40 계산하기

```python
kf = KalmanFilter(
    transition_matrices=[1],
    observation_matrices=[1],
    initial_state_mean=0,
    initial_state_covariance=1,
    observation_covariance=1,
    transition_covariance=0.01
)

state_means, _ = kf.filter(df['Close'].values)
state_means = pd.Series(state_means.flatten(), index=df.index)
df['kma'] = state_means
df['sma'] = df['Close'].rolling(window=40).mean()

df.tail()

           Close     kma       sma
Date   
2024-05-24 39.700001 38.568957 37.64750
2024-05-28 39.320000 38.640400 37.69250
2024-05-29 38.720001 38.647972 37.72800
2024-05-30 38.630001 38.646262 37.75775
2024-05-31 39.990002 38.774086 37.83450
```

- 여기에서 KF에 대해 더 알아보기.
- KMA vs SMA40 그래프 그리기

```python
plt.figure(figsize=(12,6))
plt.plot(df['Close'], label='BAC', linewidth=5, alpha=0.3)
plt.plot(df['kma'], label='KMA')
plt.plot(df['sma'], label='SMA40')
plt.title('BAC KMA/SMA')
plt.xlabel('Date')
plt.ylabel('Close Price USD')
plt.legend(loc='upper left')
plt.show()
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_1.png" />

## KMA vs SMA20

- KMA와 20일 이동평균(SMA)을 비교

```js
mean30 = df['Close'].rolling(window=20).mean()

#plt.figure(figsize=(12,6))
plt.plot(state_means)
plt.plot(df['Close'])
plt.plot(mean30)
plt.title('Kalman filter estimate of average', fontsize=20)
plt.legend(['Kalman', 'Price', '20-day MA'], fontsize=20)
plt.xlabel('Date')
plt.ylabel('Close Price USD')
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_2.png)

## KMA-SMA40 Trading Strategy

- `implement_sma_strategy` 함수를 사용하여 KMA-SMA40 트레이딩 전략 구현하기

```python
def implement_sma_strategy(data, short_window, long_window):
    sma1 = short_window
    sma2 = long_window
    buy_price = []
    sell_price = []
    sma_signal = []
    signal = 0
    
    for i in range(len(data)):
        if sma1.iloc[i] > sma2.iloc[i]:
            if signal != 1:
                buy_price.append(data.iloc[i])
                sell_price.append(np.nan)
                signal = 1
                sma_signal.append(signal)
            else:
                buy_price.append(np.nan)
                sell_price.append(np.nan)
                sma_signal.append(0)
        elif sma2.iloc[i] > sma1.iloc[i]:
            if signal != -1:
                buy_price.append(np.nan)
                sell_price.append(data.iloc[i])
                signal = -1
                sma_signal.append(-1)
            else:
                buy_price.append(np.nan)
                sell_price.append(np.nan)
                sma_signal.append(0)
        else:
            buy_price.append(np.nan)
            sell_price.append(np.nan)
            sma_signal.append(0)
            
    return buy_price, sell_price, sma_signal

sma_20 = df['kma']
sma_50 = df['sma']

buy_price, sell_price, signal = implement_sma_strategy(df['Close'], sma_20, sma_50)
```


<div class="content-ad"></div>

- 우리 Position 생성하기

```js
position = []
for i in range(len(signal)):
    if signal[i] > 1:
        position.append(0)
    else:
        position.append(1)
        
for i in range(len(df['Close'])):
    if signal[i] == 1:
        position[i] = 1
    elif signal[i] == -1:
        position[i] = 0
    else:
        position[i] = position[i-1]

sma_20 = pd.DataFrame(sma_20).rename(columns = {0:'sma_20'})
sma_50 = pd.DataFrame(sma_50).rename(columns = {0:'sma_50'}) 
signal = pd.DataFrame(signal).rename(columns = {0:'sma_signal'}).set_index(df.index)
position = pd.DataFrame(position).rename(columns = {0:'sma_position'}).set_index(df.index)

frames = [sma_20, sma_50, signal, position]
strategy = pd.concat(frames, join = 'inner', axis = 1)
strategy = strategy.reset_index().drop('Date', axis = 1)

df_ret = pd.DataFrame(np.diff(df['Close'])).rename(columns = {0:'returns'})
sma_strategy_ret = []

for i in range(len(df_ret)):
    try:
        returns = df_ret['returns'][i]*strategy['sma_position'][i]
        sma_strategy_ret.append(returns)
    except:
        pass
    
sma_strategy_ret_df = pd.DataFrame(sma_strategy_ret).rename(columns = {0:'sma_returns'})
```

- BAC KMA/SMA 트레이딩 신호 플로팅

```js
plt.plot(df['Close'], alpha = 0.3, label = 'BAC')
plt.plot(sma_20, alpha = 0.6, label = 'KMA')
plt.plot(sma_50, alpha = 0.6, label = 'SMA40')
plt.scatter(df.index, buy_price, marker = '^', s = 200, color = 'darkblue', label = '매수 신호')
plt.scatter(df.index, sell_price, marker = 'v', s = 200, color = 'crimson', label = '매도 신호')
plt.legend(loc = 'lower right')
plt.xlabel('날짜')
plt.ylabel('종가 USD')
plt.title('BAC KMA/SMA 트레이딩 신호')
plt.show()
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_3.png)

- 저희 전략의 백테스팅을 수행 중입니다.

```python
import math
from termcolor import colored as cl
투자금 = 100000
주식수 = math.floor(투자금 / df['Close'].iloc[1])
sma_투자_수익 = []

for i in range(len(sma_strategy_ret_df['sma_returns'])):
    수익 = 주식수 * sma_strategy_ret_df['sma_returns'].iloc[i]
    sma_투자_수익.append(수익)

sma_투자_수익_df = pd.DataFrame(sma_투자_수익).rename(columns = {0:'투자_수익'})
총_투자_수익 = round(sum(sma_투자_수익_df['투자_수익']), 2)
print(cl('BAC에 10만 달러를 투자하여 전략으로 얻은 이익: ${}'.format(총_투자_수익), attrs = ['bold']))

BAC에 10만 달러를 투자하여 전략으로 얻은 이익: $29026.39
```

## SMA 20–50 트레이딩 전략


<div class="content-ad"></div>

- 표준 SMA 20-50 거래 전략 구현

```python
def sma(data, n):
    sma = data.rolling(window=n).mean()
    return pd.DataFrame(sma)

n = [20, 50]
for i in n:
    df[f'sma_{i}'] = sma(df['Close'], i)

Close       sma_20    sma_50         sma_40
Date    
2024-05-24 39.700001 38.3415 37.4868 37.64750
2024-05-28 39.320000 38.4300 37.5650 37.69250
2024-05-29 38.720001 38.5155 37.6192 37.72800
2024-05-30 38.630001 38.5995 37.6712 37.75775
2024-05-31 39.990002 38.7550 37.7360 37.83450
```

- SMA 20-50 플로팅

```python
plt.plot(df['Close'], label='BAC', linewidth=5, alpha=0.3)
plt.plot(df['sma_20'], label='SMA 20')
plt.plot(df['sma_50'], label='SMA 50')
plt.title('BAC Simple Moving Averages (20, 50)')
plt.legend(loc='upper left')

plt.xlabel('Date')
plt.ylabel('Close Price USD')
plt.show()
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_4.png" />

- implement_sma_strategy 함수를 사용하여 BAC SMA (20,50) 거래 신호를 생성합니다.

```js
def implement_sma_strategy(data, short_window, long_window):
    sma1 = short_window
    sma2 = long_window
    buy_price = []
    sell_price = []
    sma_signal = []
    signal = 0
    
    for i in range(len(data)):
        if sma1.iloc[i] > sma2.iloc[i]:
            if signal != 1:
                buy_price.append(data.iloc[i])
                sell_price.append(np.nan)
                signal = 1
                sma_signal.append(signal)
            else:
                buy_price.append(np.nan)
                sell_price.append(np.nan)
                sma_signal.append(0)
        elif sma2.iloc[i] > sma1.iloc[i]:
            if signal != -1:
                buy_price.append(np.nan)
                sell_price.append(data.iloc[i])
                signal = -1
                sma_signal.append(-1)
            else:
                buy_price.append(np.nan)
                sell_price.append(np.nan)
                sma_signal.append(0)
        else:
            buy_price.append(np.nan)
            sell_price.append(np.nan)
            sma_signal.append(0)
            
    return buy_price, sell_price, sma_signal

sma_20 = df['sma_20']
sma_50 = df['sma_50']

buy_price, sell_price, signal = implement_sma_strategy(df['Close'], sma_20, sma_50)
```

- BAC SMA (20,50) 거래 신호를 플로팅합니다.

<div class="content-ad"></div>

```js
plt.plot(df['Close'], alpha = 0.3, label = 'BAC')
plt.plot(sma_20, alpha = 0.6, label = 'SMA 20')
plt.plot(sma_50, alpha = 0.6, label = 'SMA 50')
plt.scatter(df.index, buy_price, marker = '^', s = 200, color = 'darkblue', label = 'BUY SIGNAL')
plt.scatter(df.index, sell_price, marker = 'v', s = 200, color = 'crimson', label = 'SELL SIGNAL')
plt.legend(loc = 'upper left')
plt.title('BAC SMA CROSSOVER TRADING SIGNALS')
plt.xlabel('Date')
plt.ylabel('Close Price USD')
plt.show()
```

<img src="/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_5.png" />

- 포지션 생성

```js
position = []
for i in range(len(signal)):
    if signal[i] > 1:
        position.append(0)
    else:
        position.append(1)
        
for i in range(len(df['Close'])):
    if signal[i] == 1:
        position[i] = 1
    elif signal[i] == -1:
        position[i] = 0
    else:
        position[i] = position[i-1]

sma_20 = pd.DataFrame(sma_20).rename(columns = {0:'sma_20'})
sma_50 = pd.DataFrame(sma_50).rename(columns = {0:'sma_50'}) 
signal = pd.DataFrame(signal).rename(columns = {0:'sma_signal'}).set_index(df.index)
position = pd.DataFrame(position).rename(columns = {0:'sma_position'}).set_index(df.index)

frames = [sma_20, sma_50, signal, position]
strategy = pd.concat(frames, join = 'inner', axis = 1)
strategy = strategy.reset_index().drop('Date', axis = 1)
```

<div class="content-ad"></div>

- 우리 전략의 백테스팅을 수행중입니다

```js
msft_ret = pd.DataFrame(np.diff(df['Close'])).rename(columns = {0:'returns'})
sma_strategy_ret = []

for i in range(len(msft_ret)):
    try:
        returns = msft_ret['returns'].iloc[i]*strategy['sma_position'].iloc[i]
        sma_strategy_ret.append(returns)
    except:
        pass

sma_strategy_ret_df = pd.DataFrame(sma_strategy_ret).rename(columns = {0:'sma_returns'})

investment_value = 100000
number_of_stocks = math.floor(investment_value/df['Close'].iloc[1])
sma_investment_ret = []

for i in range(len(sma_strategy_ret_df['sma_returns'])):
    returns = number_of_stocks*sma_strategy_ret_df['sma_returns'].iloc[i]
    sma_investment_ret.append(returns)

sma_investment_ret_df = pd.DataFrame(sma_investment_ret).rename(columns = {0:'investment_returns'})
total_investment_ret = round(sum(sma_investment_ret_df['investment_returns']), 2)
print(cl('장기 배당 수익 전략에 $100K 투자로 얻은 이익: ${}'.format(total_investment_ret), attrs = ['bold']))

장기 배당 수익 전략에 $100K 투자로 얻은 이익: $13473.41
```

## 수동 매수 & 보유 전략

- 일일 수익에 기반한 누적 수익률 계산 중

<div class="content-ad"></div>

```js
df['daily_return'] = df['Close'].pct_change()
# 누적 수익률 계산
df['cum_return'] = np.exp(np.log1p(df['daily_return']).cumsum())

투자금 = 100000
수익률=(df['cum_return'].iloc[-1]-1)*투자금
print(round(수익률,2))
19337.52

수익=round(수익률,2)
print(cl('BAC에 10만 달러를 투자하여 Buy & Hold 전략에서 얻은 수익: ${} '.format(수익), attrs = ['bold']))

BAC에 10만 달러를 투자하여 Buy & Hold 전략에서 얻은 수익: $19337.52 
```

- 결과 그래프 그리기

```js
df['cum_return'].plot()
plt.title('BAC Buy-Hold 누적 수익률')
```

<img src="/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_6.png" />


<div class="content-ad"></div>

## 결론

- 2023년 1월 3일부터 2024년 5월 31일까지의 백테스트 결과를 기반으로, KMA 알고 트레이딩 전략은 SMA 크로스오버 및 Buy & Hold 전략에 비해 매우 유망한 성과를 보여주었습니다.

```js
BAC에 10만 달러를 투자하여 KMA 전략으로 얻은 이익 : $29026.39

BAC에 10만 달러를 투자하여 Buy & Hold 전략으로 얻은 이익 : $19337.52

BAC에 10만 달러를 투자하여 SMA 크로스오버 전략으로 얻은 이익 : $13473.41
```

![이미지](/assets/img/2024-06-20-Noise-ResistantKalmanFilterMovingAverageKMAvsSMACrossoverAlgo-TradingStrategiesBACShowcase_7.png)

<div class="content-ad"></div>

- 우리는 KF가 TTI의 제한을 극복하고 algo-trading 전략의 성능을 향상시킬 수 있다는 것을 보여줬어요.
- 비선형 시스템, 이상치 및 잡음을 효율적이고 견고하게 처리하면서 동시에 최적 부드량화와 자동 매개변수 추정이 가능한 KF 프레임워크는 모든 KF 수정사항과 이점을 함께 포함할 수 있게 해 줄 거에요.

## 전체 Python 코드 및 입출력

```js
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt
import yfinance as yf
from pandas_datareader import data as web
from sklearn.decomposition import PCA
import seaborn as sns
from datetime import datetime as dt, timedelta as td
from pykalman import KalmanFilter
sns.set()

data = yf.download('BAC', start='2023-01-01', end='2024-06-01')

df=data.drop(columns=['Open', 'High','Low','Adj Close','Volume'])
df.tail()

Close
Date 
2024-05-24 39.700001
2024-05-28 39.320000
2024-05-29 38.720001
2024-05-30 38.630001
2024-05-31 39.990002

import matplotlib.pyplot as plt 
import requests
import math
from termcolor import colored as cl 

from pykalman import KalmanFilter

plt.style.use('fivethirtyeight')
plt.rcParams['figure.figsize'] = (15, 8)

kf = KalmanFilter(
    transition_matrices = [1],
    observation_matrices = [1],
    initial_state_mean = 0,
    initial_state_covariance = 1,
    observation_covariance=1,
    transition_covariance=0.01
)
state_means, _ = kf.filter(df.values)
state_means = pd.Series(state_means.flatten(), index=df.index)

...

print(signal)
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, ...

position = []
for i in range(len(signal)):
    if signal[i] > 1:
        position.append(0)
    else:
        position.append(1)
        
for i in range(len(df['Close'])):
    if signal[i] == 1:
        position[i] = 1
    elif signal[i] == -1:
        position[i] = 0
    else:
        position[i] = position[i-1]

sma_20 = pd.DataFrame(sma_20).rename(columns = {0:'sma_20'})
sma_50 = pd.DataFrame(sma_50).rename(columns = {0:'sma_50'}) 
signal = pd.DataFrame(signal).rename(columns = {0:'sma_signal'}).set_index(df.index)
position = pd.DataFrame(position).rename(columns = {0:'sma_position'}).set_index(df.index)

...

print(cl('100K달러를 BAC에 투자하여 전략으로 얻은 이익 : ${}'.format(total_investment_ret), attrs = ['bold']))

100K달러를 BAC에 투자하여 전략으로 얻은 이익 : $13473.41
```

## 더 알아보기

<div class="content-ad"></div>

- 신호/잡음 비율이 낮은 칼만 필터 기반 객체 추적
- 칼만 필터를 사용한 대상 궤적 추적 성능 QC 분석
- 견고한 1차원 칼만 필터의 해부학
- 칼만 필터를 사용한 주식 시장 변동성 예측

## 참고 자료

- 파이썬에서 SMA를 이용한 알고리즘 트레이딩
- 금융 분야에서의 칼만 필터 (KF)
- 칼만 필터를 기반으로 한 트레이딩 전략 구현
- 파이썬에서 칼만 필터, 칼만 스무서, EM 알고리즘 구현
- 칼만 필터를 활용한 주식 거래 마스터하기: 포괄적인 가이드
- 파이썬에서 주식 가격 예측을 위한 칼만 필터 사용
- 주식 거래에서의 칼만 필터
- 시장 탁계를 탐색하는 주식 분석에서의 칼만 필터

## 연락처

<div class="content-ad"></div>

- 웹사이트
- GitHub
- X/트위터
- 핀터레스트
- 마스토돈
- 텀블러