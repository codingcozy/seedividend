---
title: "의사결정을 이끄는 매직 놀라움을 발견하라, 추천 시스템을 위한 도서관"
description: ""
coverImage: "/assets/img/2024-06-20-TheMagicThatGuidesOurDecisionsDiscoveringSurprisetheLibraryforRecommendationSystems_0.png"
date: 2024-06-20 02:04
ogImage: 
  url: /assets/img/2024-06-20-TheMagicThatGuidesOurDecisionsDiscoveringSurprisetheLibraryforRecommendationSystems_0.png
tag: Tech
originalTitle: "The Magic That Guides Our Decisions: Discovering Surprise, the Library for Recommendation Systems"
link: "https://medium.com/@lfcaro90/the-magic-that-guides-our-decisions-discovering-surprise-the-library-for-recommendation-systems-662cde62c9c3"
---


<img src="/assets/img/2024-06-20-TheMagicThatGuidesOurDecisionsDiscoveringSurprisetheLibraryforRecommendationSystems_0.png" />

정확히 무엇을 원하는지 모르지만 우리가 필요한 것의 일반적인 아이디어를 갖고 있을 때, 셔츠, 신발 또는 좋은 컴퓨터와 같은 것이더라도, 온라인 상점인 아마존, 알리익스프레스 또는 텀우 등을 방문하고 빠르게 결정을 내릴 수 있게 해주는 제안을 받습니다. 마치 마법처럼 우리에게 우리가 좋아하는 제품을 보여주는 것 같습니다, 디자인이나 색상 때문일 수도 있습니다. 넷플릭스, 애플 TV 또는 아마존 프라임 비디오 같은 스트리밍 플랫폼에서 우리가 좋아하는 쇼의 마지막 시즌을 마친 후 어떤 시리즈를 시청해야 할지 모를 때도 같은 일이 발생합니다. 이러한 사이트들은 우리가 선호하는 배우나 미래지향적인 시리즈 스타일 같은 정확한 추천을 도와줍니다. 이것이 바로 추천 시스템이 작동하는 방식입니다. 그러나 이러한 시스템이 어떻게 구축되는지 궁금했던 적이 있나요?

오늘은 강력한 Python 라이브러리 Surprise를 사용하여 이러한 추천 시스템 중 하나가 어떻게 만들어지는지 이해하는 데 도움을 주기 위해 여행을 떠날 것입니다.

여정의 시작: Surprise가 무엇인가요?

<div class="content-ad"></div>

거의 마법적인 도구가 있다고 상상해보세요. 이 도구는 추천 시스템을 쉽게 만들 수 있게 해줍니다. 이 도구는 'Surprise'라고 불리며, 이는 "간단한 Python 추천 시스템 엔진"을 의미합니다. Facebook의 영국에서 근무 중인 기계 학습 엔지니어이자 박사 후보인 닥터 니콜라스 휙(Nicolas Hug) 박사가 개발한 Surprise는 협업 필터링 기술을 중점으로 한 추천 시스템을 구축하고 분석하는 데 사용됩니다.

Surprise는 추천 시스템(RS)을 생성하는 것뿐만 아니라 그러한 시스템을 평가하는 데 사용할 수 있는 다양한 알고리즘과 도구들을 제공합니다. SVD(특이값 분해)부터 KNN(K-최근접 이웃)까지, 이 라이브러리는 사용자 경험을 효과적으로 개인화하는 데 도움이 되는 다양한 방법을 제공합니다.

우리의 선박: MovieLens 100k

이러한 개념을 탐색하기 위해 우리는 유명한 MovieLens 100k 데이터 세트를 사용할 것입니다. 이 데이터 세트에는 100,000개의 사용자 평가 영화 순위가 포함되어 있으며, 이를 기반으로 추천 모델을 구축하고 평가할 것입니다.

<div class="content-ad"></div>

항해 시작: 데이터 로드 및 조작

우리는 먼저 데이터셋을 로드하고 보다 쉽게 조작할 수 있는 형식으로 변환할 것입니다. Surprise를 사용하면 미리 정의된 또는 사용자 정의 데이터셋과 쉽게 작업할 수 있습니다. MovieLens 100k를 로드한 후에는 pandas DataFrame으로 변환하여 데이터를 보다 쉽게 조작하고 시각화할 수 있을 것입니다.

바다 탐험: 데이터 이해와 시각화

평점이 어떻게 분포되어 있는지를 보여주는 그래프를 생성할 것입니다. 이러한 그래프들은 데이터의 패턴과 트렌드를 명확하게 보여줄 것이며, 정확한 추천 모델을 구축하는 데 기본적입니다.

<div class="content-ad"></div>

최적의 과정을 찾아가는 여정: 추천 모델

우리는 Surprise가 제공하는 두 가지 강력한 알고리즘인 SVD와 KNN을 사용할 것입니다. SVD, 즉 특이값 분해는 등급에서 잠재적인 패턴을 식별하는 행렬 분해 기술입니다. 또한, 우리는 사용자 또는 항목 간 유사성에 기초한 KNN 또는 K-최근접 이웃 알고리즘을 사용하여 가장 가까운 이웃을 찾아주어 제공된 등급을 사용하여 추천을 할 수 있게 합니다.

고도화된 과정: 모델 최적화

우리는 모델의 하이퍼파라미터를 조정하여 정확도를 극대화할 것입니다. GridSearchCV를 통해 각 알고리즘에 대한 최상의 설정값을 찾을 때까지 다양한 매개변수 조합을 테스트할 것입니다. 이 연습의 끝에서는 RMSE(평균 제곱근 오차)와 MAE(평균 절대 오차) 메트릭을 사용하여 모델의 성능을 비교하여 이 특정한 경우에 가장 좋은 추천을 제공하는 모델을 명확히 이해할 수 있도록 결과를 시각적으로 확인할 것입니다.

<div class="content-ad"></div>

탐험의 여정

이 여정 동안 Surprise 라이브러리가 추천 시스템의 생성과 평가를 어떻게 용이하게 도와주는지 안내해 드렸습니다. Surprise는 데이터 탐색부터 모델의 구축과 최적화에 이르기까지 정확하고 개인화된 추천 시스템(RS)을 구축하는 데 필요한 도구를 제공합니다.

Surprise의 데이터 집합과 다양한 알고리즘 및 평가 도구를 활용할 수 있는 능력은 데이터 과학 분야의 초심자부터 전문가에 이르기까지 모두에게 이상적인 라이브러리로 만듭니다. 연구 프로젝트나 상용 응용프로그램 작업 중이던 상관없이 Surprise를 사용하면 추천 시스템을 간편하고 효과적으로 생성, 평가 및 최적화할 수 있습니다.

다음 항해 때, 항해 차트 없이 하지 마세요!

<div class="content-ad"></div>

각 사용자의 경험을 정밀하고 관련성 높은 추천으로 개인화할 수 있는 가능성을 상상해 보세요. 다음으로 볼 영화를 제안하거나 완벽한 책을 추천하는 등, 추천 시스템은 사용자 상호작용을 개선하고 경험을 더 개인적으로 만드는 강력한 도구입니다.

Surprise를 사용하면 강력하고 유연한 라이브러리를 활용하여 추천 시스템을 한 단계 더 발전시킬 수 있습니다. 다음으로 추천 시스템을 구축하고 싶을 때, 마법 같은 도구를 활용하기를 기억해 주세요. 이 흥미로운 AI 여행에 도전하고 Surprise가 제공할 수 있는 것을 발견해 보세요!

```js
# surprise 설치 및 import
%pip install scikit-surprise
```

```js
# 분석을 위한 필요한 라이브러리 import
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from surprise import Dataset, Reader, SVD, KNNBasic
from surprise.model_selection import cross_validate, GridSearchCV
```

<div class="content-ad"></div>

```js
# MovieLens 100k 데이터 세트 로드하기
data = Dataset.load_builtin('ml-100k')

# 데이터 세트를 Pandas DataFrame으로 변환하여 탐색
raw_ratings = data.raw_ratings
ratings_df = pd.DataFrame(raw_ratings, columns=['user_id', 'item_id', 'rating', 'timestamp'])
```

```js
# 데이터 세트 탐색
print("DataFrame 상위 데이터:")
print(ratings_df.head())

print("\nDataFrame 설명:")
print(ratings_df.describe())
```

```js
# 데이터의 분포 그래프
plt.figure(figsize=(12, 6))

# 평점 분포
plt.subplot(1, 2, 1)
plt.hist(ratings_df['rating'], bins=np.arange(0.5, 6, 0.5), edgecolor='black')
plt.title('평점 분포')
plt.xlabel('평점')
plt.ylabel('빈도')
```

```js
# 사용자별 평가 수
ratings_per_user = ratings_df.groupby('user_id').size()
plt.subplot(1, 2, 2)
plt.hist(ratings_per_user, bins=50, edgecolor='black')
plt.title('사용자별 평가 수')
plt.xlabel('평가 수')
plt.ylabel('빈도')

plt.tight_layout()
plt.show()
```

<div class="content-ad"></div>

```js
# 아이템별 평가 횟수
ratings_per_item = ratings_df.groupby('item_id').size()
plt.figure(figsize=(12, 6))
plt.hist(ratings_per_item, bins=50, edgecolor='black')
plt.title('아이템별 평가 횟수')
plt.xlabel('평가 횟수')
plt.ylabel('빈도')
plt.show()
```

```js
# SVD를 사용한 추천 모델 생성
algo_svd = SVD()

# 교차 검증을 통한 모델 평가
results_svd = cross_validate(algo_svd, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

print("\nSVD 모델의 교차 검증 결과:")
print("평균 RMSE: ", np.mean(results_svd['test_rmse']))
print("평균 MAE: ", np.mean(results_svd['test_mae']))
```

```js
# KNN을 사용한 추천 모델 생성
algo_knn = KNNBasic()

# 교차 검증을 통한 모델 평가
results_knn = cross_validate(algo_knn, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

print("\nKNN 모델의 교차 검증 결과:")
print("평균 RMSE: ", np.mean(results_knn['test_rmse']))
print("평균 MAE: ", np.mean(results_knn['test_mae']))
```

```js
# SVD의 하이퍼파라미터 튜닝을 위한 GridSearchCV
param_grid = {
    'n_epochs': [20, 30],
    'lr_all': [0.002, 0.005],
    'reg_all': [0.4, 0.6]
}
gs_svd = GridSearchCV(SVD, param_grid, measures=['rmse', 'mae'], cv=3)
gs_svd.fit(data)

print("\nSVD의 최적 하이퍼파라미터:")
print(gs_svd.best_params['rmse'])
```

<div class="content-ad"></div>

```js
# KNN을 위한 하이퍼파라미터 튜닝을 위한 GridSearchCV
param_grid = {
    'k': [20, 30, 40],
    'sim_options': {'name': ['msd', 'cosine', 'pearson'], 'user_based': [False]}
}
gs_knn = GridSearchCV(KNNBasic, param_grid, measures=['rmse', 'mae'], cv=3)
gs_knn.fit(data)

print("\nKNN을 위한 최적 하이퍼파라미터:")
print(gs_knn.best_params['rmse'])
```

```js
# SVD와 KNN의 결과 비교
algorithms = ['SVD', 'KNN']
rmse_scores = [np.mean(results_svd['test_rmse']), np.mean(results_knn['test_rmse'])]
mae_scores = [np.mean(results_svd['test_mae']), np.mean(results_knn['test_mae'])]
```

```js
# 비교 그래프
fig, ax = plt.subplots(1, 2, figsize=(14, 6))

# RMSE 비교
ax[0].bar(algorithms, rmse_scores, color=['blue', 'green'])
ax[0].set_title('RMSE 비교')
ax[0].set_xlabel('알고리즘')
ax[0].set_ylabel('평균 RMSE')

# MAE 비교
ax[1].bar(algorithms, mae_scores, color=['blue', 'green'])
ax[1].set_title('MAE 비교')
ax[1].set_xlabel('알고리즘')
ax[1].set_ylabel('평균 MAE')

plt.tight_layout()
plt.show()
```

참고 문헌 

<div class="content-ad"></div>

- Hug, N. (2017). 놀라운 추천 시스템을 위한 Python 라이브러리. Journal of Open Source Software, 2(12), 1–4.
- Hug, N. (2020). Surprise 문서. http://surpriselib.com 에서 확인
- Ricci, F., Rokach, L., & Shapira, B. (2011). 추천 시스템 핸드북 소개. 추천 시스템 핸드북(pp. 1–35). Springer.
- Koren, Y., Bell, R., & Volinsky, C. (2009). 추천 시스템을 위한 행렬 분해 기술. Computer, 42(8), 30–37.
- Su, X., & Khoshgoftaar, T. M. (2009). 협업 필터링 기법 조사. 인공지능 발전, 2009, 4.
- Bobadilla, J., Ortega, F., Hernando, A., & Gutiérrez, A. (2013). 추천 시스템 조사. 지식기반 시스템, 46, 109–132.