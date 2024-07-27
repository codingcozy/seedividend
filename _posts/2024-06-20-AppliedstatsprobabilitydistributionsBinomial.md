---
title: "응용 통계 확률 분포 - 이항분포"
description: ""
coverImage: "/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_0.png"
date: 2024-06-20 02:13
ogImage: 
  url: /assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_0.png
tag: Tech
originalTitle: "Applied stats: probability distributions — Binomial"
link: "https://medium.com/@vitorbeltrao300/applied-stats-probability-distributions-binomial-95276bdcab54"
---


<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_0.png" />

통계의 하나의 목표는 주어진 모집단의 어떤 변수의 분포에 대한 추론(또는 결론)을 샘플이라고 하는 그 일부분의 데이터를 바탕으로 내리는 것입니다.

샘플 데이터와 모집단 간의 링크는 확률적 모델에 의존하는데, 즉, 모집단의 (알려지지 않은) 분포를 나타내는 모델에 의해 달려 있습니다.

이 절차를 통계 추론이라고 합니다.

<div class="content-ad"></div>

만약 모집단에 대해 정의된 변수 X의 확률 분포가 특정 확률 모델에 의해 설명될 수 있다고 가정한다면, 우리의 문제는 해당 모델에 의해 표현된 특정 확률 분포의 매개변수를 추정하는 것으로 간소화됩니다. 이항 분포의 경우, 이러한 매개변수는 다음과 같습니다:

- n = 시도의 횟수.
- p = 각 시도의 성공 확률.

이제 이항 분포를 소개했으니, 조금 더 깊이 파보겠나요? 이 이론적 소개 이후, 실제 응용 사례가 나오면 모든 것이 명확해지고 재미있어질 것입니다!

# 이항 분포: 이론

<div class="content-ad"></div>

이항 분포의 특정 수학 함수를 사용하면 두 가지 결과가 있는 어떤 실생활 이벤트의 결과를 예측할 수 있습니다.

표기법: B(n, p) → n = 시도 횟수; p = 각 시도에서 성공할 확률.

예: X ~ B(10, 0.6) → "변수 X는 10번의 시도와 각각의 시도에서 성공 확률이 0.6인 이항 분포를 따릅니다."

![이항분포 이미지](/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_1.png)

<div class="content-ad"></div>

더 정확한 예측을 위해 기대값과 표준편차를 계산할 수 있습니다. 이 경우:

- E(X) = n . p
- σ² = E(X²) — E(X)² = n . p . (1 — p)

변수 X가 이항 확률 변수가 되려면:

- 각 시행이 독립되어야 합니다.
- 각 시행은 "성공" 또는 "실패"로 표현할 수 있어야 합니다.
- 고정된 횟수의 시행이 있어야 합니다.
- 각 시행에서의 성공 확률이 일정해야 합니다.

<div class="content-ad"></div>

# 이항 분포: 실습

## 예시 1

가게에서 매주 주문의 10%가 반품된다고 가정해 봅시다. 매주 3개 이상의 반품이 발생할 확률이 높다면, 임시 보조 직원을 고용해야 합니다. 이번 주에 가게에서 50건의 매출이 있었다고 가정해 봅시다. 임시 보조 직원을 고용해야할 확률은 어떻게 되나요?

X = 반품 수량.

<div class="content-ad"></div>

n = 50번의 구매.

p = 환불 확률 (성공) = 10%.

q (1-p) = 환불하지 않을 확률 (실패) = 1-10% = 90%.

```js
from scipy.stats import binom

# p = 성공 확률
# n = 시도 횟수
# k = 성공 횟수

n = 50
p = 0.1
k = 2

print('2개 이하의 환불 누적 확률:', 
  binom.cdf(k, n, p)) # P(X=0) + P(X=1) + P(X=2)
print('정확히 2개의 환불이 일어날 확률:', 
  binom.pmf(k, n, p)) # P(X=3)
print('3개 이상의 환불이 일어날 확률:', 
  1 - binom.cdf(k, n, p)) # k를 0, 1, 2로 포함
print('3개 이상의 환불이 일어날 확률:', 
  binom.sf(k, n, p)) # 1 - cdf
```

<div class="content-ad"></div>


![image](/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_2.png)

예시를 확장해서 X=1, X=2, X=3, …, X=50 성공 시 확률을 정확히 계산해보자. 이를 위해 단순히 확률질량함수를 사용하면 된다. 왜냐하면 이는 이산형 변수이기 때문이다.

```js
import plotly.graph_objects as go
from scipy.stats import binom

n = 50
p = 0.1
k = np.arange(0, n+1)
pmf = binom.pmf(k, n, p) # 확률 질량 함수

fig = go.Figure(data=[go.Bar(x=k, y=pmf)])
fig.update_layout(title="이항 분포 (n=50, p=0.1)",
                  xaxis_title="성공 횟수",
                  yaxis_title="확률",
                  font=dict(size=18),
                  width=700,
                  title_x=0.5,
                  height=400,
                  template="simple_white")
fig.show()
```

이 코드는 기사 초반에 보았던 그래프를 나타낼 것입니다. 빠르고 매우 유용하죠?


<div class="content-ad"></div>

## 예시 2

은행 거래에서 사기 발생 확률.

저는 캐글에서 데이터셋을 수집했는데, 이 데이터셋은 한 은행의 거래 내역을 포함하고 있습니다. 그 중 하나의 변수는 해당 거래가 사기인지 아닌지를 나타냅니다. 이 변수의 빈도 분포를 확인해보겠습니다.

![transactions](/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_3.png)

<div class="content-ad"></div>

거래에 대한 데이터를 모두 가정한다면, 사기 및 비 사기의 각각의 발생 확률은 다음과 같습니다:

```js
비 사기의 확률 = (value_counts[0] / len(df_fraud))
사기의 확률 = (value_counts[1] / len(df_fraud))

print('사기가 아닐 확률은:', 비 사기의 확률)
print('사기 확률은:', 사기의 확률)
```

<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_4.png" />

이는 각 거래에서 사기를 저지를 확률입니다. 불균형은 예상대로 발생하며, 우리는 훨씬 더 많은 합법적인 거래를 가지고 있습니다. 중요한 점은 은행에서 많은 일일 거래가 있고 분명 그 중 하나는 사기일 것이라는 것입니다. 이 은행의 평균 일일 거래를 확인해봅시다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_5.png" />

```js
mean_transactions_per_day = transactions_per_day.mean()
print("평균 거래 횟수(하루):", 
  round(mean_transactions_per_day, 0))
```

<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_6.png" />

이제 가장 중요한 부분으로 들어가 봅시다. 이제 비즈니스 문제를 활용하여 궁금증에 답할 수 있습니다. 예를 들어, 50번의 시도에서 1, 2, 3, ... 50건의 사기 사례를 발견할 확률은 얼마인가요?

<div class="content-ad"></div>

```python
## 파이썬을 사용하여 확률 분포 그래프 그리기

import plotly.graph_objects as go
from scipy.stats import binom

n = 50
p = fraud_probability # 0.05
k = np.arange(0, n + 1)
pmf = binom.pmf(k, n, p)

fig = go.Figure(data=[go.Bar(x=k, y=pmf)])
fig.update_layout(title=f"이항 분포 (n={n}, p={fraud_probability})",
                  xaxis_title="성공 횟수",
                  yaxis_title="확률",
                  font=dict(size=18),
                  width=700,
                  title_x=0.5,
                  height=400,
                  template="simple_white")
fig.show()
```

<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_7.png" />

그리고 한 가지 더 예시를 드리면:

```js
print(f'3333번 시도 중 200번 이상 사기가 발생할 확률은:', 
              binom.sf(200, 3333, 0.05))
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-AppliedstatsprobabilitydistributionsBinomial_8.png" />

이곳에서 가능한 한 이론에서 벗어나서 이항 확률 분포의 이론을 실제로 어떻게 활용하는지 보여 주었습니다. 이제 당신이 일상생활에서 이를 식별하고 데이터가 전달하는 내용에 기초하여 올바르게 적용하여 문제를 해결하고 올바른 결정을 내릴 수 있도록 해야 합니다!

# 크레딧

Wheelan, Charles. Naked Statistics: Stripping the Dread from the Data. W.W. Norton & Company, 2013.

<div class="content-ad"></div>

Spiegelhalter, David. The Art of Statistics: How to Learn from Data. Basic Books, 2019.