---
title: "Bayesian Framework을 활용한 마케팅 믹스 모델링과 ROAS"
description: ""
coverImage: "/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_0.png"
date: 2024-06-20 02:06
ogImage: 
  url: /assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_0.png
tag: Tech
originalTitle: "MMM: Bayesian Framework for Marketing Mix Modeling and ROAS"
link: "https://medium.com/towards-data-science/mmm-bayesian-framework-for-marketing-mix-modeling-and-roas-ccade4005bd5"
---


이 게시물은 Rafael Guedes와 함께 공동 저술되었습니다.

# 소개

확장 가능한 인터넷 비즈니스는 성장을 이끌기 위해 마케팅에 의존합니다. 물론 그것뿐만이 아니라 특정 규모에서는 매우 효율적으로 고객을 확보하지 않을 수 없는 회사가 매우 적습니다. 기업들이 마케팅에 인공지능(AI) 능력을 가져오기 위해 많이 투자하고 있는 두 가지 핫한 주제는 미디어 믹스 모델링(MMM)과 고객 평생 가치(LTV) 예측입니다. 이 두 가지는 기업들이 마케팅에 투자하는 비용 대비 이익을 증가시키는 데 초점을 맞추고 있습니다. 이 글은 MMM이 무엇인지와 적용하는 데 가장 효과적인 방법에 대해 다루고 있습니다.

MMM은 마케팅 팀이 투자의 영향과 대화 유도에 어떻게 기여하는지를 측정할 수 있는 기술입니다. 이 일의 복잡성은 최근 몇 년 동안 급속히 증가했습니다. 왜냐하면 광고를 할 수 있는 플랫폼이 급증했기 때문입니다. 이 현상은 잠재 고객을 오프라인 또는 온라인 버킷으로 나눌 수 있는 다양한 미디어 채널에 분산시켰습니다. 전통적인 오프라인 채널은 디지털 지원이 없으며 신문, 라디오, 텔레비전 광고, 쿠폰, 박람회 부스 등을 포함할 수 있습니다. 온라인 채널은 급증했고 기업들은 이러한 채널을 함께 사용하고 있습니다. 이메일, 소셜 미디어, 유기적 검색, 유료 검색, 제휴 마케팅, 인플루언서 마케팅 등을 사용합니다.

<div class="content-ad"></div>

중요한 점 중 하나는 좋은 MMM이 동일하게 정확한 데이터 기반 속성 모델이 필요하다는 것입니다. 즉, 어떤 채널이 특정 고객을 확보하는 데 기여했는지를 나타냅니다. 또한 속성은 사용자 수준에서 수행되지만, MMM은 일반적으로 확보 채널 수준에서 적용됩니다. 데이터 기반 속성은 이 글의 범위를 벗어납니다.

이 글에서는 두 가지에 초점을 맞춥니다. 첫째, 각 미디어 채널의 성능에 대한 투명성을 높이기 위해 설계된 베이지안 모델을 개발합니다. 둘째, 이 경우 수익이라는 변수를 최대화하기 위해 예산 할당을 최적화합니다. 베이지안 접근 방식이 MMM에 어떻게 작용하는지에 대한 상세한 내용을 제공하는 동시에 공개 데이터셋을 활용하여 모델의 정확성을 테스트하고 각 채널의 광고비 투자 대비 수익률(ROAS)을 계산합니다. 마지막으로, 수익을 극대화하기 위해 세 가지 채널 간의 가상 예산을 최적화합니다.

항상 코드는 우리의 GitHub에서 이용할 수 있습니다.

<div class="content-ad"></div>

# 미디어 믹스 모델링: 무엇인가요?

MMM은 전 세계 기업들에게 광고 채널의 효과를 측정하고 미디어 비용이 매출에 미치는 영향에 대한 투명성을 제공하여 조직을 강화합니다. 이러한 모델은 매출, 광고 지출 대비 수익 (ROAS), 수익, 전환, LTV 등의 관심 대상 대상 변수를 최적화하여 채널 간 예산 할당 결정 프로세스를 지원하는 데 중요한 역할을 합니다.

지난 몇 년 동안 많은 연구가 수행되었으며, 관심 대상 변수에 영향을 미치는 지출을 모델링하기 위해 여러 모델이 제안되었습니다. 이러한 모델은 지리적으로 집계된 주간 또는 월간 데이터에 기반합니다. 우리는 의존 변수(위에서 정의한 관심 대상 변수 중 하나 이상)와 독립 변수 간의 관계를 모델링하는 데 관심이 있습니다. 일부 독립 변수는 명백합니다. 예를 들어 광고 채널 별 광고 비용이 그렇습니다. 그러나 가격, 제품 유통, 인플레이션, 날씨, 계절성 및 시장 경쟁력과 같은 추가 관련 효과를 포함하여 접근 방식을 확장할 수 있습니다.

전통적인 접근 방식은 회귀 방법을 활용하여 상관 관계에서 인과 관계를 추론합니다. 그러나 매출의 반응은 선형적이지 않습니다 - 고수준 지출에서 수익이 감소하는 포화 현상이 있습니다. 게다가 광고에는 선행 또는 잔류 효과가 있어 이전 주에 지출한 내용이 다음 주의 매출에 영향을 미칠 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_1.png" />

# 미디어 믹스 모델의 베이지안 방법론

베이지안 방법론은 포화/형태와 래그/캐리오버 효과를 고려하기 위해 정의될 수 있습니다.

모델 세부사항에 대해 깊이 파고들기 전에, 모델이 어떤 변수를 고려하는지 더 잘 이해하기 위해 가상의 데이터 세트를 정의해보겠습니다. 국가 수준에서 매주 데이터가 있으며 각 행이 주차(t)를 나타내고 각 열이 미디어 채널(m) 또는 계절성 또는 제품 가격과 같은 제어 변수(c)를 나타내는 가정 데이터 세트를 정의해보겠습니다. 주차 t에서 채널 m의 미디어 비용은 Xt,m로 정의되며 동일한 주차에 대한 제어 변수는 Zt,c로 정의됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_2.png" />

# 랙 또는 캐리오버 효과

캐리오버 효과는 adstock라는 함수에 의해 모델링됩니다 [1]. 이 함수는 특정 채널에서 지출의 누적 효과를 만듭니다. 이 함수는 현재 주와 이전 L-1 주의 미디어 비용을 가중 평균을 통해 변환합니다. L은 특정 미디어 채널의 캐리오버 효과의 최대 기간이며, 가중 평균 방정식에서 가중치 Wm를 추정하는 데 중요한 역할을 합니다.

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_3.png" />

<div class="content-ad"></div>

미디어 채널마다 L을 다르게 설정할 수 있습니다. 이것은 전문가가 정의해야 하는 초매개변수입니다. 특정 채널에 대한 사전 정보가 없는 경우, 저자들은 잠재적으로 지연된 효과를 포착하기 위해 L을 13과 같은 큰 숫자로 설정하는 것이 좋다고 충고합니다.

가중치를 정의하는 방정식은 두 가지 다른 형태를 가질 수 있습니다:

- 즉각적인/Geometric Adstock [2]는 광고 효과 피크가 광고 노출과 동시에 발생할 때 사용됩니다. 즉, 우리가 특정 미디어 채널의 지출을 늘린 주에 매출이 최대치를 기록한 경우입니다. 방정식 2에서 αm은 광고 효과의 유지율입니다.

![equation](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_4.png)

<div class="content-ad"></div>

- 광고 효과의 정점이 더 오랜 시간이 걸려 구축되고 판매에 즉시 영향을 주지 않는 경우를 지연된 Adstock [1]라고합니다. 식 3에서 θm은 정점 효과의 지연을 나타냅니다.

![이미지](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_5.png)

이제 상상 속 데이터셋을 선택하고 Facebook 채널의 즉각적 및 지연 Adstock를 계산해 보겠습니다. 먼저 데이터셋에 5주를 추가했습니다. 보존율(αm)은 80%이며, 정점 지연(θm)은 5주입니다. 이후 즉각적인 효과에 대한 가중치와 지연된 효과에 대한 가중치를 계산하여 8주차에서 즉각 및 지연 Adstock의 최종값에 도달합니다.

![이미지](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_6.png)

<div class="content-ad"></div>

표 3는 각 주별 지출이 8주차의 매출량에 얼마나 기여하는지를 보여줍니다.

![Figure 3](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_7.png)

# 포화 또는 모양 효과

포화 또는 모양 효과는 미디어 비용을 로지스틱 포화 함수 [3]와 같은 곡률 함수를 통해 변환하여 모델링합니다. 다음과 같이 정의됩니다:

<div class="content-ad"></div>

이 중에서 x는 미디어 비용을 나타내고, λ는 포화 곡선의 가파르기를 제어한다. 즉, 미디어 비용 효과가 얼마나 빨리 포화되는지를 결정한다. 그러면 낮은 λ 값은 응답 함수의 증가가 점진적이라고 해석할 수 있으며, 미디어 비용이 넓은 범위의 값들에 대해 주목할 만한 효과를 갖는다는 것을 의미한다. 반대로, 높은 λ 값은 지출에 대한 감소된 수익을 가져올 것이다. Figure 4는 이러한 다른 행동들을 매우 명확히 보여줍니다.

이 모델에 어떤 매개변수를 사용해야 하는지 알기가 어렵습니다. 왜냐하면 이는 각 채널의 행동에 매우 구체적이기 때문입니다. 그럼에도 불구하고, Bayesian 접근 방식에서 이러한 매개변수는 사전 분포를 사용하여 추정됩니다. 따라서, 모델은 주어진 데이터에 대해 가능한 가치 매개변수를 선택합니다. 따라서, 우리는 단일 값이 아닌 분포를 설정해야 합니다.

<div class="content-ad"></div>

# 캐리오버와 형태 효과 결합

이전 두 섹션에서 언급했듯이 캐리오버와 형태 효과를 모델링하려면 각 채널의 미디어 비용에 변환을 적용해야 합니다. 어떤 변환을 먼저 적용해야 하는지에 대한 질문이 제기됩니다. 저자들은 다음을 제안합니다:

- 미디어 비용이 특정 기간에 집중적으로 소비된다면 형태 효과는 캐리오버에 따릅니다.
- 미디어 비용이 여러 시간대에 고르게 분산된다면 캐리오버는 형태 효과에 따릅니다.

기관들은 일반적으로 마케팅 활동을 집중하기 때문에 가장 흔한 접근 방식은 캐리오버 → 형태 효과의 결합입니다.

<div class="content-ad"></div>

이에 따라 t주차의 종속 변수인 매출 y는 미디어 비용 및 제어 변수의 선형 결합을 통해 모델링될 수 있습니다. 또한 회귀 계수 β를 사용하여 각 미디어 채널에 대한 다른 효과를 모델링합니다.

![image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_10.png)

여기서 𝛂는 y절편입니다. 함수 f(xm,t)는 광고재고(지속성) 및 포화 효과를 고려한 대상 변수에 대한 미디어의 기여를 인코딩합니다. γc는 제어 변수 Zt,c의 효과이며, et는 백색 잡음입니다.

# 베이지안 모델

<div class="content-ad"></div>

베이지안 접근법은 모델 매개변수에 대한 사전 분포를 정의하는 것으로 시작하여, 데이터를 고려하기 전의 초기 신념을 반영합니다. 새로운 데이터가 도입되면 모수가 주어졌을 때 데이터를 관찰할 확률을 나타내는 우도 함수가 계산됩니다. 이 문맥에서 데이터에는 미디어 채널 X와 종속 변수 y를 설명하는 제어 변수 Z가 포함됩니다. 베이즈 정리를 사용하여 사후 분포는 사전 분포와 우도 함수를 결합하여 얻어집니다.

저자들은 각 미디어 채널(X)과 제어 변수(Z)의 매개변수 값을 선택하는데 샘플링 효율성 때문에 Gibbs Sampling[4]에 의존합니다.

![이미지](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_11.png)

데이터가 강력한 정보를 함유하고 명확한 패턴을 가질 때 모델은 매개변수를 추정할 때 사전 분포에 더 적게 의존한다는 것을 기억해 주세요.

<div class="content-ad"></div>

하지만, 저자들은 각 매개변수에 대한 사전 분포를 정의하는 방법에 대한 일부 지침을 남겼습니다:

- 유지율 (α)은 [0, 1[으로 제한되어 있으며, beta나 균일 분포와 같이 [0, 1[에 대해 정의된 사전을 가져야 합니다.

![이미지](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_12.png)

- 지연 매개변수 (θ)는 일반적으로 [0, L-1]에 제한되어 있으며, 균일 분포나 스케일링된 베타 분포와 같은 사전을 가져야 합니다.

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_13.png)

- Gamma (γ) and Intercept are usually modeled by a normal distribution.

![image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_14.png)

- Lambda (λ) is usually modeled by a gamma distribution.


<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_15.png" />

- 회귀 계수 (β)는 일반적으로 미디어 소비가 y에 부정적인 영향을 미치지 않기 때문에 정규 분포와 같은 양수 우선 순위로 모델링됩니다.

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_16.png" />

# PyMC를 활용한 베이지안 미디어 믹스 모델링

<div class="content-ad"></div>

해당 섹션은 카글의 공개 데이터셋을 활용하여 CC0 라이선스로 Bayesian 모델을 구현했습니다. 이 데이터셋은 세 가지 다른 미디어 채널(TV, 라디오, 신문)에 대한 지출 및 동일 기간의 판매에 대한 정보를 포함하고 있습니다.

데이터셋은 다음과 같이 구성되어 있습니다:

- ID — 행을 식별합니다.
- TV 광고 예산($) — TV에 대한 광고 지출;
- 라디오 광고 예산($) — 라디오에 대한 광고 지출;
- 신문 광고 예산($) — 신문에 대한 광고 지출;
- 판매($) — 목표 변수입니다.

적합된 Bayesian 모델은 각 채널별 ROAS, 유지율 및 포화 효과를 계산하는 데 도움이 될 것입니다. 또한 미래 주차를 위한 예산 할당을 최적화하는 데도 도움이 될 것입니다.

<div class="content-ad"></div>

모형의 신뢰성을 측정하기 위해 각 매체 채널의 지출과 제어 변수에 기반하여 보이지 않는 데이터에서 종속 변수를 얼마나 잘 모델링할 수 있는지를 평가할 것입니다. 우리는 평균 절대 오차 (MAE)와 같은 회귀 지표를 활용할 것입니다. 벤치마킹 측면에서, 항상 훈련 데이터의 평균 값으로 예측하는 단순 모형을 사용합니다. 그런데, MMM이 없을 때 기업들이 종종 이를 의존합니다.

먼저 라이브러리를 가져오겠습니다:

```js
%matplotlib inline
%load_ext autoreload
%autoreload 2
import arviz as az
import datetime
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import utils
from pymc_marketing.mmm.delayed_saturated_mmm import DelayedSaturatedMMM
from sklearn.metrics import mean_absolute_error
```

그런 다음 데이터셋을 로드하고 일부 기본 전처리 작업을 수행합니다. 열 이름을 간소화하고 ID를 기반으로 새로운 날짜 열을 추가했습니다. 계절성 및 추세와 같은 제어 변수로 데이터셋을 보강하는 데 도움이 됩니다.

<div class="content-ad"></div>

```python
# 데이터 로드 및 열 이름 변경
df = pd.read_csv('data/data.csv')
df = df.rename(columns={'Unnamed: 0': 'id', 'TV Ad Budget ($)':'tv', 'Radio Ad Budget ($)': 'radio', 'Newspaper Ad Budget ($)': 'newspaper', 'Sales ($)': 'sales'})

# 날짜 열 생성
df['ds'] = df['id'].apply(lambda x: pd.to_datetime("2024-02-26")-datetime.timedelta(weeks=len(df)-x))
```

그 후에는 데이터 내 상관 관계를 이해하기 위한 탐색적 데이터 분석을 수행합니다:

1. 종속 변수와 각 매체 채널 간의 상관 관계를 평가합니다.

- TV는 판매와 가장 크게 관련된 특성이며, Newspaper는 가장 낮은 상관 관계를 갖고 있습니다.

<div class="content-ad"></div>

```python
corr_matrix = df[['sales', 'tv', 'radio', 'newspaper']].corr()
sns.heatmap(corr_matrix, annot=True, cmap='Blues')
plt.show()
```

2. 판매량과 각 매체 채널 간의 상관 관계를 평가하기 위해 판매량 대 매체 채널을 그래픽으로 나타냅니다:

- 판매량에는 명확한 추세나 계절성이 없습니다.
- TV 광고의 영향은 판매에 즉각적인 영향을 미칩니다.
- 라디오 광고의 영향도 판매에 즉각적인 영향을 미칩니다. 예를 들어, TV 광고가 낮은 값을 가졌던 2022년 1~3주에는 판매량이 급등하는데, 이는 라디오의 급등과 일치합니다.
- 신문 광고의 영향은 1~2주의 지연이 있는 것으로 보이지만, TV와 라디오 광고가 동시에 진행되었기 때문에 정확히 파악하기 어렵습니다.

```python
# 판매량만
utils.line_plot(df.copy(), ['sales'], '시간에 따른 판매')

# 판매 대 TV 광고
utils.line_plot(df.copy(), ['sales', 'tv'], '시간에 따른 판매 대 TV')

# 판매 대 라디오 광고
utils.line_plot(df.copy(), ['sales', 'radio'], '시간에 따른 판매 대 라디오')

# 판매 대 신문 광고
utils.line_plot(df.copy(), ['sales', 'newspaper'], '시간에 따른 판매 대 신문')
```

<div class="content-ad"></div>

EDA를 마무리했으니 모델링 부분을 준비할 차례입니다:

1. 데이터를 훈련 및 테스트 세트로 나누는 작업을 시작하겠습니다:

```js
train_df = df.sort_values(by='ds').iloc[:-5,:]
test_df = df.sort_values(by='ds').iloc[-5:,:]
```

2. 이전에 생성한 주간 데이터를 사용하여 추세와 계절성과 같은 통제 변수를 추출하려고 합니다.

<div class="content-ad"></div>

- 시계열 모델 Prophet을 사용하여 Meta에서 시계열을 추세 및 계절성으로 분해하고 이를 제어 변수로 사용합니다.

```js
seasonality, trend = utils.extract_trend_seasonality(train_df, 'sales', 5)
train_df.loc[:, 'seasonality'] = seasonality[:-5]
test_df.loc[:,'seasonality'] = seasonality[-5:]
train_df.loc[:,'trend'] = trend[:-5]
test_df.loc[:,'trend'] = trend[-5:]
```

![Image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_17.png)

3. 모델을 위한 다른 하이퍼파라미터를 설정합니다. 이러한 매개변수는 전통적인 ML 하이퍼파라미터 검색을 통해 정의할 수 있습니다. dist, mu 및 sigma 값을 변경하여 일부 회귀 지표를 최적화합니다. 더 높은 표준 편차 값(sigma)은 모델에 더 많은 자유를 제공하여 최적의 매개변수를 탐색할 수 있음을 기억하세요.

<div class="content-ad"></div>

```js
my_model_config = {'intercept': {'dist': 'Normal', 'kwargs': {'mu': 0, 'sigma': 2},
 'beta_channel': {'dist': 'HalfNormal', 'kwargs': {'sigma': 2},
 'alpha': {'dist': 'Beta', 'kwargs': {'alpha': 1, 'beta': 3},
 'lam': {'dist': 'Gamma', 'kwargs': {'alpha': 3, 'beta': 1},
 'likelihood': {'dist': 'Normal',
  'kwargs': {'sigma': {'dist': 'HalfNormal', 'kwargs': {'sigma': 2}},
 'gamma_control': {'dist': 'Normal', 'kwargs': {'mu': 0, 'sigma': 2},
 'gamma_fourier': {'dist': 'Laplace', 'kwargs': {'mu': 0, 'b': 1}}}
```

<img src="/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_18.png" />

Figure 13에서 저희가 구현한 모델의 Kruschke 다이어그램을 제시합니다. 이는 이전에 정의한 내용에 대한 간결한 개요를 제공합니다. 이러한 다이어그램을 해석할 때 고려해야 할 몇 가지 측면이 있습니다. 각 노드 내에서 변수와 해당 분포를 찾을 수 있음을 유의하십시오. 예를 들어, α를 포함하는 원은 이전에 정의한 대로 베타 분포를 나타냅니다. 음영 처리된 노드는 관측된 변수를 나타냅니다. 둥근 모서리 상자는 반복을 나타냅니다. 예를 들어, 저희는 세 개의 확보 채널이 있으므로 각 채널에 대해 별도의 α, β 및 λ 매개변수 집합을 설정합니다. 화살표는 종속성을 보여줍니다. 저희 모델에서는 두 개의 화살표가 가능 함수를 가리키는데, 하나는 mu 매개변수에 종속성을 나타내고 다른 하나는 sigma 매개변수에 종속성을 나타냅니다. mu 매개변수 자체가 세 개의 추가 종속성을 가지고 있음을 상기해 주세요. 우리는 이동 효과, 모양 효과 및 제어 변수를 통합하여 매출을 모델링하기로 선택했음을 기억하세요.

이제 우리는 교육 및 테스트 세트, 그리고 모델 구성을 정의했으므로 베이지안 모델을 초기화하고 교육 데이터에 맞출 수 있습니다.

<div class="content-ad"></div>

- 미디어 채널 ["tv", "radio", "newspaper"]
- 통제 변수 ["seasonality", "trend"]
- EDA에서 광고주는 지연 매개변수로 최대 2까지 인 것으로 보입니다.

```js
mmm = DelayedSaturatedMMM(
    model_config=my_model_config,
    sampler_config={"progressbar": True},
    date_column="ds",
    channel_columns=["tv", "radio", "newspaper"],
    control_columns=["seasonality", "trend"],
    adstock_max_lag=2,
)

mmm.fit(X=train_df[['ds', 'tv', 'radio', "newspaper", "seasonality", "trend"]], y=train_df['sales'], target_accept=0.95, chains=4, random_seed=42)
```

모델을 적합한 후에는 샘플링 예측값(파란색)과 실제 값(검은색)을 비교하여 학습 데이터에 얼마나 잘 맞는지 확인할 수 있습니다. 우리의 경우, 그들이 잘 일치하는 것을 확인할 수 있습니다.

```js
mmm.sample_posterior_predictive(train_df[['ds', 'tv', 'radio', "newspaper", "seasonality", "trend"]], extend_idata=True, combined=True)
mmm.plot_posterior_predictive(original_scale=True);
```

<div class="content-ad"></div>

이제 다양한 방법으로 모델 해석을 시작할 수 있습니다:

1. 파라미터 추정 확인:

- 라디오는 계수(베타)가 가장 높으므로 투자 대비 가장 높은 수익을 보이는 것으로 보입니다(1.185), 그 다음에 TV와 신문이 이어집니다.
- 유지율 α는 TV에 대해 3.2%, 라디오에 대해 2.3%, 신문에 대해 23.9%입니다.

```js
az.summary(data=mmm.fit_result,
    var_names=[
        "intercept",
        "likelihood_sigma",
        "beta_channel",
        "alpha",
        "lam",
        "gamma_control",
    ],
)
```

<div class="content-ad"></div>

- TV에서 포화율 λ가 더 높으며 (3.138), 전체 지출의 73%를 차지합니다. 그림 12에서 3개 채널의 포화율을 더 쉽게 비교할 수 있습니다.

![Figure 12](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_19.png)

2. 채널 기여 및 ROAS 확인:

- ROAS는 매체 채널 중 하나의 지출을 제로로 설정하여 현재 매출 대비 예측 매출이 어떻게 변경되는지를 평가하여 계산됩니다. 예를 들어, 신문의 매체 지출을 제로로 설정하면 매출 큰 감소를 예상하지 않습니다. 따라서, 이에 대한 ROAS는 낮을 것입니다.
- TV가 높은 지출을 했기 때문에 가장 큰 기여를 가지고 있지만, 모델은 라디오에 대해 더 높은 ROAS를 예측합니다.

<div class="content-ad"></div>

```js
# 채널의 공헌도
fig = mmm.plot_channel_contribution_share_hdi(figsize=(7, 5))

# ROAS 계산
utils.plot_ROAS(mmm, train_df, ["tv", "radio", "newspaper"])
```

3. 마지막으로, 각 채널별 광고비 지출을 50% 증가시킨다면 어떤 일이 일어날지도 평가할 수 있습니다. 이때는 캐리오버와 포화 효과를 고려합니다.

X 축은 채널 데이터 백분율 수준입니다:

- When =1 일 때, 모델 입력 지출 데이터가 됩니다.
- When =1.5 일 때, 지출을 50% 증가시켰을 때의 공헌도가 어떨지 볼 수 있습니다.


<div class="content-ad"></div>

신문은 지출이 50% 증가해도 그다지 많은 기여를 못 할 것 같아요. 

라디오는 TV에 비해 훨씬 포화되지 않아 보여요. 두 선의 기울기를 비교해 봤을 때 그렇죠.

```js
plt.rcParams["figure.figsize"] = (20,5)
mmm.plot_channel_contributions_grid(start=0, stop=1.5, num=12);
```

우리의 결론이 올바른지 확인하기 위해 시험 집합을 사용하여 미디어 채널과 제어 변수를 기반으로 미래 매출을 예측하는 모델의 성능을 평가할 수 있어요. 이를 위해 MAE를 사용하고 소박한 모델과 비교할 거에요.

<div class="content-ad"></div>

- 우리는 평균 목표가 13.8인 경우 MAE가 2.01이었습니다.
- 우리는 베이스라인보다 오차가 58% 낮습니다.

```js
y_out_of_sample = mmm.sample_posterior_predictive(X_pred=test_df[['ds', 'tv', 'radio', "newspaper", "seasonality", "trend"]], extend_idata=False)
y_pred = [np.median(x) for x in y_out_of_sample['y']]

print(f"평균 절대 오차 (MAE): {mean_absolute_error(test_df['sales'], y_pred)} (평균 목표: {test_df['sales'].mean()})")
print(f"평균 절대 비율 오차 (MASE): {mean_absolute_error(test_df['sales'], y_pred)/mean_absolute_error(test_df['sales'], [train_df['sales'].mean()]*5)}")
```

회귀 결과는 모델이 매체 채널과 제어 변수를 기반으로 매출을 모델링하기에 신뢰할만하고 잘 한다는 것을 보여줍니다.

# 예산 할당

<div class="content-ad"></div>

판매에 대한 지출 효과가 선형적이지 않을 것으로 가정하기 때문에 어느 시점에서 포화될 것으로 예상됩니다. 따라서, 우리는 어떤 포화 함수가 우리의 데이터와 더 잘 맞는지 결정해야 합니다. 포화 모델링을 위한 두 가지 함수 옵션이 있습니다:

- α(alpha)가 포화 지점인 시그모이드 함수, 즉 지출 증가가 판매 증가로 이어지지 않고, λ(lambda)는 곡선의 기울기를 제어하는 요인입니다. 더 높은 값은 곡선을 더 가파르게 만듭니다.

![이미지](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_20.png)

- 알파(alpha)가 채널이 가질 수 있는 최대 기여도인 Michaelis-Menten 함수이며, 람다(lambda)는 곡선이 방향을 조정하는 순간, 즉 기울기입니다.

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_21.png)

저희 데이터에 더 적합한 곡선을 결정하기 위해, 적합된 MMM을 사용하여 각 함수의 매개변수를 계산할 것입니다. 그 후 두 가지를 모두 플롯하고 시각적으로 어느 것이 더 적합한지 확인할 것입니다.

- 특정 사용 사례에서, 시그모이드 함수가 더 나은 결과를 보였습니다.

```js
# 플롯 및 알파, 람다 추출
sigmoid_response_curve_fig = mmm.plot_direct_contribution_curves(show_fit=True)
sigmoid_params = mmm.compute_channel_curve_optimization_parameters_original_scale(method='sigmoid')

mm_response_curve_fig = mmm.plot_direct_contribution_curves(show_fit=True, method='michaelis-menten')
mm_params = mmm.compute_channel_curve_optimization_parameters_original_scale(method='michaelis-menten')
``` 


<div class="content-ad"></div>

이제 각 미디어 채널의 시그모이드 매개변수(α 및 λ)가 있으므로 각 채널의 포화점을 알 수 있습니다. 따라서 추가 지출은 수익을 증가시키지 않을 것이며, 다른 채널에 투자된 금액은 원하는 효과를 얻을 수 있습니다.

채널 포화도를 기반으로 한 예산 할당을 최적화하기 위한 알고리즘을 사용할 수 있습니다. 이 때 고려해야 할 세 가지 변수는 채널 포화도, 사용 가능한 총 예산 및 각 채널의 예산 제약 사항입니다. PyMC에는 Sequential Least Squares Quadratic Programming (SLSQP)을 구현한 것이 있습니다. 이는 세 가지 변수를 고려하여 모든 채널에서 총 기여도를 최대화합니다:

- 총 예산 제한;
- 각 채널의 최소 및 최대 지출 한도;
- 포화 곡선.

```python
result_sigmoid = mmm.optimize_channel_budget_for_maximum_contribution(
    method='sigmoid', # 포화 함수를 정의
    total_budget=500, # 총 예산
    parameters=sigmoid_params, # 이전에 추출한 시그모이드 매개변수
    budget_bounds={'tv': [75, 296], 'radio': [10, 300], 'newspaper': [1, 25]} # 채널별 예산 제약 사항
)
```

<div class="content-ad"></div>

![image](/assets/img/2024-06-20-MMMBayesianFrameworkforMarketingMixModelingandROAS_22.png)

표 4는 우리의 예산 배정 결과를 보여줍니다. 라디오는 추정 기여도가 가장 높은 채널이며, TV는 가장 높은 예산을 쓰도록 권장받은 채널입니다.

# 시장 불확실성 하의 예산 배정

현재 경제 상황에서 많은 불확실성을 겪고 있습니다. 따라서, 다양한 시나리오를 수용할 수 있는 예산 배정 전략을 설계해야 합니다.

<div class="content-ad"></div>

세 가지 다른 시나리오를 고려해 봅시다:

- 초기: 경제가 안정 상태를 유지하며, 예산 할당은 이전 섹션에서 계산된 것과 동일합니다.
- 시나리오 2: 경제가 경기 침체를 겪고 예산이 40% 삭감됩니다.
- 시나리오 3: 경제가 유리해지고 성장을 시작하며, 예산이 20% 증가합니다.

이러한 다른 시나리오에서 예산 할당을 최적화하기 위해 동일한 적합된 MMM 모델과 모델의 시그모이드 매개변수를 사용할 것입니다. 같은 코드를 사용하지만 이번에는 사용 가능한 예산을 줄이거나 증가시키기 위해 다른 시나리오를 반복할 것입니다.

```js
scenarios_result = []
total_budget = 500
channels = ['tv', 'radio', 'newspaper']

for scenario in np.array([0.6, 1.2]):
    scenarios_result.append(
        mmm.optimize_channel_budget_for_maximum_contribution(
            method="sigmoid",  # 포화 함수 정의
            total_budget=total_budget * scenario,
            parameters=sigmoid_params,
            budget_bounds={
                channel: [1, total_budget * scenario] for channel in channels
            },
        ).to_dict()
    )
_ = mmm.plot_budget_scenearios(
    base_data=result_sigmoid, method="sigmoid", scenarios_data=scenarios_result
)
```

<div class="content-ad"></div>

그림 19에서 보듯이, 경제 불황 시나리오에서 TV에 할당된 예산은 초기 시나리오와 비교했을 때 라디오보다 크게 감소합니다. 이는 라디오의 ROAS가 높기 때문에 예상되는 현상입니다. 반면, 성장 시나리오에서는 TV와 라디오에 할당된 예산이 유사하게 증가합니다.

# 결론

미디어믹스 모델링을 위한 AI는 투자에서 긍정적인 수익을 창출하고 가치 있는 충성고객을 확보하는 차이를 만들어줄 수 있습니다. 또는 잘못된 미디어 채널과 잘못된 고객에게 금전적 자원을 낭비하는 것 사이의 차이를 만들어줄 수도 있습니다.

본 문서에서는 각 회사의 미디어 채널이 새로운 고객을 확보할 수 있는 잠재력을 더 자세히 평가하고 투명성을 제공할 수 있는 마케팅 믹스 모델링을 위한 베이지안 프레임워크를 개발했습니다. 우리의 접근 방식은 마케팅팀의 도메인 지식을 사전 분포를 설정함으로써 통합할 수 있습니다. 이는 모델의 능력을 향상시키고 미디어 채널과 관심 변수(예: 판매) 간의 관계를 이해하는데 도움이 됩니다. 마지막으로, 회사가 새로운 고객을 확보하기 위해 투자할 능력에 따라 예산 할당 전략을 최적화할 수 있습니다. 현재의 거시 경제 상황에서 기업은 수익성으로 돌아갈 수 있으며 성장에 투자할 예산을 줄일 수 있습니다. 우리는 영향을 최소화하면서 어디서 예산을 삭감할지에 대한 데이터 기반 의사결정 방법을 보여주었습니다. 반대로, 상황이 긍정적일 때 어디에 투자할지와 회사가 더 빨리 성장하기 위해 더 많은 자원을 투입하려는 경우 어디에 투자할지를 보여주었습니다.

<div class="content-ad"></div>

우리는 현재 기관들에 새로운 AI 애플리케이션을 개발하고 배포하고 있어요. 예를 들어, 우리는 생성 모델 AI로 고객 경험을 향상시키고 시계열 예측으로 계획 프로세스를 개선하고 있어요. 이 경우에는 AI가 마케팅 예산의 효율성을 향상시킬 수 있는 방법을 보여주고 있어요. 우리의 경험에 따르면, AI 채택 측면에서 선진적이고 성숙한 기관은 핵심 활동에 중점을 둔 특화된 AI 모델 스위트가 필요해요.

# 나에 대해

AI 분야의 시리얼 창업가이자 리더에요. 비즈니스를 위한 AI 제품을 개발하고 AI 중심의 스타트업에 투자하고 있어요.

ZAAI 설립자 | LinkedIn | X/Twitter

<div class="content-ad"></div>

# 참고문헌

[1] Yuxue Jin, Yueqing Wang, Yunting Sun, David Chan, Jim Koehler. (2017). Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects.

[2] Dominique M. Hanssens , Leonard J. Parsons , Randall L. Schultz. (2003). Market response models: econometric and time series analysis. Springer Science & Business Media.

[3] Hill, A. V. (1910). 혈색소 분자의 집단화가 분리 곡선에 미치는 가능한 영향. Journal of Physiology, 40 (suppl), iv–vii. doi:10.1113/jphysiol.1910. sp001386.

<div class="content-ad"></div>

[4] Gelfand, A. E. & Smith, A. F. (1990). Sampling-based approaches to calculating marginal densities. Journal of the American statistical association, 85 (410), 398–409

---

모든 이미지는 저자의 작품이며, 다르게 표기되지 않았습니다.