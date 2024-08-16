---
title: "Matplotlib, Pandas, Scikit으로 하는 지구 온난화 분석 방법"
description: ""
coverImage: "/assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_0.png"
date: 2024-06-23 13:26
ogImage: 
  url: /assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_0.png
tag: Tech
originalTitle: "Global Warming Analytics using Matplotlib, Pandas and Scikit."
link: "https://medium.com/@sudhakar.chelliah1986/global-warming-analytics-using-matplotlib-pandas-and-scikit-a444916224d3"
isUpdated: true
---




NASA의 실제 글로벌 표면 온도 데이터 분석입니다.

지난 몇 년 동안 여름에 온도 상승을 느낄 수 있었어요. 우리는 지난 몇 십 년간 NASA에 기록된 글로벌 표면 온도 지수에 대한 연구를 진행하고 파이썬 선형 회귀 모델을 기반으로 미래 추세를 파악할 거에요.

![Global Warming Plot](/assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_0.png)

지난 140년간의 지구 온난화 그래프:

<div class="content-ad"></div>

우리는 데이터 프레임 gw에 전체 지구 온난화 데이터를 로드하고, 지난 140년간의 완전한 그래프 플롯을 생성했습니다 (음수 섭씨는 녹색, 양수 섭씨는 빨강색). 1970년부터 온도가 천천히 빨간 색으로 변하기 시작했고, 되돌아보지 않은 것 같습니다. 표면 온도가 0도 섭씨를 넘어선 후로 남극과 북극의 얼음이 천천히 녹고 있습니다.

```python
import pandas as pd
import matplotlib.pyplot as plt

gw = pd.read_csv("Global_Warming.csv") # 지구 온난화 데이터를 gw에 로드합니다.

x = gw['Year'] # 연도 값을 x에 할당합니다.
y = gw['Index'] # 지수 값을 y에 할당합니다.

gw2000 = gw[(gw['Year'] > 1999)]  # 2000년 이후의 데이터를 gw2000에 할당합니다.
gw2010 = gw[(gw['Year'] > 2009)]  # 2010년 이후의 데이터를 gw2010에 할당합니다.

x1 = gw2000['Year']
y1 = gw2000['Index']

x2 = gw2010['Year']
y2 = gw2010['Index']

# 음수 지수는 녹색, 양수는 빨간색으로 표시됩니다.
colors = np.where(gw['Index'] >= 0, 'r', 'g') 

plt.figure(figsize =(20,8))
plt.subplot(2, 1, 1)  # 전체 그래프를 표시할 첫 번째 행입니다.
plt.xlabel('Year') 
plt.ylabel('Index') 
plt.bar(x, y, color=colors)

plt.subplot(2, 2, 3) # 2000년 이후 그래프를 표시할 두 번째 행 첫 번째 열입니다.
plt.xlabel('2000년부터의 연도') 
plt.ylabel('Index') 
plt.scatter(x1, y1, s=100, c='y', marker="o", alpha=1, edgecolor='r')

plt.subplot(2, 2, 4) # 2010년 이후 그래프를 표시할 두 번째 행 두 번째 열입니다.
plt.xlabel('2010년부터의 연도') 
plt.ylabel('Index') 

plt.scatter(x2, y2, s=400, c='r', marker="^", alpha=1, edgecolor='b')
```

<img src="/assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_1.png" />

직선 방정식의 값을 식별하는 중입니다.

<div class="content-ad"></div>

Y = mx + c의 직선 방정식입니다.
여기서 m은 추세의 기욱이고 c는 Y-절편의 높이입니다.
scikit 라이브러리를 사용하여 기울기(m)와 Y-절편(c)의 값을 생성할 예정입니다.

```js
# 완전한 데이터 세트 중 1974 이후의 데이터로 데이터프레임 생성.
from sklearn.linear_model import LinearRegression
model = LinearRegression()
X = np.array(gw1974['Year'])
y = np.array(gw1974['Index'])
regression_model = LinearRegression() # scikit의 선형 회귀 모델 사용
regression_model.fit(X.reshape(-1,1), y)
slope = regression_model.coef_  # 기울기 값 식별
intercept = regression_model.intercept_ # Y-절편 값 식별
print("기울기(m) 값은 ", slope, "|| Y-절편(c) 값은 ", intercept)
```

```js
1975년 이후의 NASA 표면 온도 지수(Celsius) 데이터셋입니다.
Year Index
1975 0.02
1976 0.04
1977 0.07
1978 0.12
1979 0.16
...
2022 1.00
2023 1.02
```

<img src="/assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_2.png" />

<div class="content-ad"></div>

미래 추세를 생성하기 위해 기울기와 Y-절편을 기반으로 하는 테이블 값을 변환했습니다:

```js
def line(x):
  # 함수 y = mx + c에 기울기(m)와 절편(c) 값을 할당합니다.
  return 0.0196163 * x + (-38.71344489795919) 
x_pred = range(1974,2051)  # 1974년부터 2051년까지의 범위입니다.

# 연도가 증가함에 따라 직선 방정식을 기반으로 기울기가 추가됩니다.
y_pred = [line(i) for i in x_pred] 

import matplotlib.pyplot as plt
fig,ax = plt.subplots()
ax.bar(gw1974['Year'],gw1974['Index'],color = ['g'])
ax.stackplot(x_pred,y_pred, color="y",linewidth = 2.5,linestyle = '--',alpha = 0.40)
ax.set_xlabel('Year')
ax.set_ylabel('표면 온도 지수')
plt.title('지구 온난화 추세')
plt.show()
```

직선 방정식을 기반으로 미래 추세를 생성하고, 지구 표면 지수가 매우 빠른 시간 내에 1.4도 섭씨를 넘는 것을 확인했습니다.

<img src="/assets/img/2024-06-23-GlobalWarmingAnalyticsusingMatplotlibPandasandScikit_3.png" />

<div class="content-ad"></div>

지난 몇 년 동안 표면 온도 분석을 기반으로 한 추론:

- 탄소 배출이 중요하게 제어/감소되지 않으면 다음 24년 안에 표면 온도가 1.40도 섭씨를 넘을 것입니다.
- 탄소 배출량이 증가하면 2050년 이전에 표면 온도가 1.50도 섭씨를 넘을 가능성이 있습니다.
- 지속 가능한 에너지(태양광, 풍력, 수력, 생물 에너지)가 앞으로 지구 온난화를 통제하는 유일한 해결책이 될 것입니다.

분석을 통해, 온난화가 개념으로만 여겨졌던 것보다 실제로 더 위험한 것으로 보입니다. 탄소 배출이 감소되지 않으면 전 세계적으로 재앙적인 기후 변화가 발생할 것입니다.