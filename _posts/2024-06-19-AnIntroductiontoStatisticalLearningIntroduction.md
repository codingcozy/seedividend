---
title: "통계 학습에 대한 소개 - 소개"
description: ""
coverImage: "/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_0.png"
date: 2024-06-19 23:44
ogImage: 
  url: /assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_0.png
tag: Tech
originalTitle: "An Introduction to Statistical Learning — Introduction"
link: "https://medium.com/pythons-gurus/an-introduction-to-statistical-learning-introduction-a5f706f88bd9"
---


## "An Introduction to Statistical Learning: with Applications in Python by Hastie et. al." 에서의 첫 번째 날 메모를 공유합니다. 이것은 제 데이터 과학 학습 문서의 일부입니다.

![이미지](/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_0.png)

## 기계 (통계) 학습 (ML)은 데이터를 이해하는 데 사용되는 다양한 도구 모음을 가리킵니다.

이것은 주로 다음과 같이 분류됩니다:

<div class="content-ad"></div>

- 지도 학습: 하나 이상의 입력을 기반으로 출력을 예측하거나 추정하는 (통계적) 모델을 구축하는 것을 말합니다.
- 비지도 학습: 데이터로부터 관계와 구조를 학습하는 시스템(모델 또는 알고리즘)을 구축하는 것으로, 입력은 있지만 지도 학습에서와 같이 지도 출력이 없습니다.

지도 학습과 비지도 학습의 차이점은 출력 데이터(동의어: 종속 변수, 목표 변수 또는 결과로 "y"로 표시됨)의 가용성에 있습니다.

먼저 필수 라이브러리를 가져와서 Python 코드를 준비해보겠습니다.

```js
# 라이브러리 가져오기
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from ISLP import load_data # 책의 저자가 제공하는 ISLP
```

<div class="content-ad"></div>

기계 학습의 경우 몇 가지 예시가 있습니다:

## 1. 임금 데이터: 지도 학습 — 회귀

데이터를 가져와 봅시다.

```js
## ISLP에서 임금 데이터 가져오기
df_wage = load_data('Wage')
df_wage
```

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_1.png)

이 데이터는 미국 대서양 지역의 남성 집단의 임금과 관련된 요인을 조사하는 데 사용할 수 있습니다. 결과 변수는 임금이며 입력 변수는 데이터의 나머지 변수입니다.

데이터에서 임금은 양적 값이므로 회귀 문제에 직면하고 있음을 의미합니다. 따라서 연속적 또는 양적 결과를 예측하는 작업에 참여하게 됩니다.

만약 직원의 나이, 교육, 그리고 달력 연도와 임금 사이의 관련을 이해하고 싶다면, 각 입력 변수와 임금 간의 관계를 스캐터 플롯과 상자 그림을 사용하여 시각화하여 수행할 수 있습니다.


<div class="content-ad"></div>

```js
# matplotlib 서브플롯 설정하기
fig, ax = plt.subplots(1, 3, figsize=(15,4))

# 그림 1
sns.regplot(data=df_wage, x='age', y='wage', lowess=True, ax=ax[0], scatter_kws={'edgecolor': 'grey', 'facecolor': 'none', 'alpha': 0.5}, line_kws={'color': 'red'})

# 그림 2
sns.regplot(data=df_wage, x='year', y='wage', lowess=True, ax=ax[1], scatter_kws={'edgecolor': 'grey', 'facecolor': 'none', 'alpha': 0.5}, line_kws={'color': 'red'})

# 그림 3
temp = {}
for i in df_wage['education'].unique():
    temp[i] = df_wage[df_wage['education'] == i]['wage'].reset_index(drop=True)
temp = pd.DataFrame(temp)
temp.columns = temp.columns.str.extract(r'(\d)')[0].astype(int)
temp = temp[[i for i in range(1, 6)]]
temp.plot(kind='box', ax=ax[2], color='black', xlabel='교육 수준', ylabel='급여')
```

<img src="/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_2.png" />

위 그래프를 통해 다음을 알 수 있습니다:

- 연령이 증가함에 따라 급여가 증가하며, 약 40세까지 상승한 후 이후에는 약간 감소하는 경향이 있습니다.
- 2003년부터 2009년 사이에 급여는 대략적인 선형으로 증가했지만, 데이터의 변동성에 비해 상승폭은 매우 작습니다.
- 교육 수준이 높을수록 급여가 일반적으로 높습니다. 가장 낮은 교육 수준(1)을 가진 남성은 가장 높은 교육 수준(5)을 가진 사람보다 상당히 낮은 급여를 받는 경향이 있습니다. 

<div class="content-ad"></div>

물론 나이, 교육 및 연도를 개별적으로 사용하는 대신 이러한 요소를 결합하여 머신러닝 모델을 적합시키면 더 정확한 예측을 할 수도 있습니다. 이것은 나이, 교육 및 연도에 기반한 임금을 예측하는 머신러닝 모델을 적합하는 것으로 이루어질 수 있습니다.

# 2. 주식 시장 데이터: 지도 학습 — 분류

데이터를 가져와 봅시다.

```js
# ISLP에서 주식 시장 데이터 가져오기
df_smarket = load_data('Smarket')
df_smarket
```

<div class="content-ad"></div>


![image](/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_3.png)

이 데이터는 2001년부터 2005년까지 5년 동안의 S&P 500 지수의 일일 움직임을 포함하고 있습니다. 이 경우, 우리는 양적 또는 범주적 결과, 즉 오늘의 주식 시장 방향을 예측하는 데 관련되어 있습니다. 이 유형의 문제는 분류 문제라고합니다. 시장이 어느 방향으로 움직일지 정확하게 예측할 수있는 모델은 매우 유용할 것입니다!

마켓 방향이 Lag1, Lag2 및 Lag3의 S&P 백분율 변화에 따라 상승 또는 하락하는 패턴을 이해함으로써 데이터를 조금 이해해 봅시다. 다음과 같이 박스플롯을 생성하여 수행할 수 있습니다:

```javascript
# matplotlib 서브플롯 설정
fig, ax = plt.subplots(1, 3, figsize=(14, 4))

# 그림 1
temp = {}
for i in df_smarket['Direction'].unique():
    temp[i] = df_smarket[df_smarket['Direction'] == i]['Lag1'].reset_index(drop=True)
temp = pd.DataFrame(temp)
temp.plot(kind='box', color='black', ax=ax[0], xlabel='Today\'s Direction', ylabel='Percentage Change in S&P', title='Yesterday')

# 그림 2
temp = {}
for i in df_smarket['Direction'].unique():
    temp[i] = df_smarket[df_smarket['Direction'] == i]['Lag2'].reset_index(drop=True)
temp = pd.DataFrame(temp)
temp.plot(kind='box', color='black', ax=ax[1], xlabel='Today\'s Direction', ylabel='Percentage Change in S&P', title='Two Days Previous')

# 그림 3
temp = {}
for i in df_smarket['Direction'].unique():
    temp[i] = df_smarket[df_smarket['Direction'] == i]['Lag3'].reset_index(drop=True)
temp = pd.DataFrame(temp)
temp.plot(kind='box', color='black', ax=ax[2], xlabel='Today\'s Direction', ylabel='Percentage Change in S&P', title='Three Days Previous')

plt.show()
```

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_4.png)

위의 그래프를 기반으로 하면, 오늘의 방향이 상승인지 하락인지에 따라 S&P의 백분율 변화에 대한 lag1(어제), lag2(이틀 전), lag3(사흘 전)은 어떤 차이도 보이지 않습니다. 이는 이 3가지 변수를 기반으로 시장이 어떻게 움직일지 예측하는 간단한 전략이 없음을 시사합니다. 만약 패턴이 매우 단순하다면, 누구나 시장에서 수익을 얻기 위한 간단한 거래 전략을 채택할 수 있을 것입니다. 대신, 이러한 유형의 문제는 머신 러닝 모델을 사용하여 오늘의 시장을 고정도로 예측하는 데 해결될 수 있습니다.

# 3. 유전자 발현 데이터: 비지도 학습 — 차원 축소 및 클러스터링

머신 러닝의 중요한 문제 유형 중 하나는 출력 변수가 없이 입력 변수만 관찰되는 상황, 즉 비지도 학습이라고 불리는 상황을 다루는 것입니다. 이전 예제와 달리 여기서는 출력 변수를 예측하려는 것이 아니라는 점이 다릅니다.

<div class="content-ad"></div>

여기서 유전자 발현 데이터 예시를 확인해 봅시다:

```js
# 유전자 발현 데이터 가져오기
df_gen = load_data('NCI60')
df_gen
```

<img src="/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_5.png" />

이 데이터에는 64개의 암 세포 주석마다 6,830개의 유전자 발현 측정값이 포함되어 있습니다. 특정 출력 변수를 예측하는 대신, 유전자 발현 측정값을 기반으로 세포 주석들 사이에 그룹 또는 클러스터가 있는지를 결정하는 데 관심이 있습니다. 이것은 어려운 질문이며, 그 이유 중 하나는 각 세포 주석당 수천 개의 유전자 발현 측정값이 있어 데이터를 시각화하기 어렵게 만든다고 합니다.

<div class="content-ad"></div>

여기서는 차원 축소와 클러스터링과 같은 비지도학습 기술을 사용하여 데이터의 패턴을 더 잘 이해할 수 있습니다.

시작해 봅시다!

```js
# 첫 두 개요소에 대한 PCA
from sklearn.decomposition import PCA

pca = PCA(n_components = 2)
Z = pca.fit_transform(df_gen['data'])

# 예시로 4개 클러스터에 대한 K-Means 클러스터링
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=4)
kmeans.fit(Z)

# 결과 시각화
fig, ax = plt.subplots(1, 2, figsize=(10, 4))

# 그림 1
ax[0].scatter(x=Z[:,0], y=Z[:,1], edgecolors='black', facecolor='none')
ax[0].set_xlabel('Z1')
ax[0].set_ylabel('Z2')

# 그림 2
scatter = ax[1].scatter(x=Z[:,0], y=Z[:,1], c=kmeans.labels_)
legendc = ax[1].legend(*scatter.legend_elements(prop='colors'), loc="upper left", title="Cluster")
ax[1].set_xlabel('Z1')
ax[1].set_ylabel('Z2')
plt.show()
```

<img src="/assets/img/2024-06-19-AnIntroductiontoStatisticalLearningIntroduction_6.png" />

<div class="content-ad"></div>

데이터의 처음 두 주성분을 사용하고 있습니다. 이 주성분은 각 세포주에 대해 측정된 6,830개의 발현 측정치를 두 숫자 또는 차원으로 요약합니다. 이 차원 축소로 인해 일부 정보 손실이 있을 수 있지만, 이제는 데이터를 시각적으로 클러스터링하는 것이 가능해졌습니다. 클러스터의 수를 결정하는 것은 종종 어려운 문제입니다. 위 그래프에서는 설명을 위해 4개의 클러스터를 사용하고 있습니다. 이 그래프를 토대로 유사한 특성을 가진 세포주가 이차원 표현에서 서로 가까이에 위치하는 것을 명확히 알 수 있습니다.

계속됩니다...

이것은 제 100일 데이터 과학 학습 여정 중 일부입니다. 더 많은 학습 업데이트를 위해 저를 팔로우해주세요.

제가 학습한 내용에서 여러분도 배울 수 있습니다!

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해보세요.

<div class="content-ad"></div>

- 작가를 팔로우하고 박수를 50번 치세요 ️👏️️
- 우리를 팔로우하세요: 뉴스레터
- 당신도 구루가 되고 싶나요? 우리의 관객에게 도달하기 위해 가장 좋은 기사나 초고를 제출해 보세요.