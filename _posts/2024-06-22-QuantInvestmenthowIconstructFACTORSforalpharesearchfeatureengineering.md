---
title: "퀀트 투자  알파 리서치를 위한 요소 구성 방법 피처 엔지니어링"
description: ""
coverImage: "/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_0.png"
date: 2024-06-22 14:12
ogImage:
  url: /assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_0.png
tag: Tech
originalTitle: "Quant Investment — how I construct FACTORS for alpha research (feature engineering)"
link: "https://medium.com/@ericchen556/quant-investment-how-i-construct-factors-for-alpha-research-feature-engineering-bd64309c9218"
isUpdated: true
---

<img src="/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_0.png" />

어린 계량 연구자를 위해, 판매 측면이든 매입 측면이든 교모명지의 목표는 언제나 모델을 적용하기 전에 어디서 시작하고 다양한 데이터 소스를 어떻게 모아야 하는지입니다. 제가 비슷한 어려움을 겪었고, 때때로 아직도 겪지만 이제는 데이터를 보완하는 가장 적합한 방법에 대해 고민하게 됩니다. 이로서 이전 버전보다 조금 더 정확성을 향상시킬 수 있는지 알아보고 있죠.

그래서 이 기사를 작성하고 있는데, 여러분을 도와 처음 시작하도록 하는 것을 목표로 하고 있습니다. 아래와 같은 Factor를 구축하는 방법을 가르쳐 드리겠습니다:

- 지연 수익 및 모멘텀 요인
- Fama 요인
- 산업 별과 같은 재량적 요인들

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

이것들만으로 알파를 생성하기에는 충분하지 않지만, 같은 마음가짐과 방법론을 갖고 있으면 직접 기능을 개발할 수 있을 거에요.

단계 1: 원시 데이터 가져오기

제가 좋아하는 몇 가지 이름을 사용하여 매일의 티커 가격을 야후 파이낸스 패키지를 통해 가져오고 있어요.

```python
import pandas as pd
import numpy as np
# 필수 패키지 가져오기
import yfinance as yf

# 티커 데이터를 검색하려는 시간 범위 설정
PeriodStart = "2000-01-01"
PeriodEnd  = "2024-05-24"
# 티커 목록을 리스트에 넣기
tickerlist = ["NVDA", "AMZN", "AAPL"]

# 여기서는 조정 종가만 가져오고 있습니다(주식 분할/배당금 등이 반영된 가격입니다).
df = yf.download(tickerlist, start = PeriodStart, end = PeriodEnd)['Adj Close']
df.head()
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

<img src="/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_1.png" />

만약 이 패키지에 대해 아직 익숙하지 않거나 이 패키지를 통해 사용 가능한 다른 유용한 데이터 포인트에 대해 상기시키려면 다른 기사를 추천드릴게요. 지금까지 시장 데이터에 대한 최고의 무료 자료입니다.

단계 2.1: 모멘텀 팩터 구성

일반적으로 월간 리밸런스 전략을 사용합니다 (또한 파마 팩터는 월간 기준으로 업데이트됩니다). 그래서 제가 일별 티커를 월별로 리샘플링할 겁니다. 그리고 당신도 원하는 주기로 이 빈도를 변경할 수도 있습니다.

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
df_monthly = df.resample("M").last();

print(len(df), len(df_monthly));
df_monthly.tail();
```

![Image 2](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_2.png)

![Image 3](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_3.png)

We then transform the data following these steps:

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

- 각 티커에 대해 1개월, 2개월, 3개월 등 기간별 수익률을 계산합니다.
- 이상값을 제거하기 위해 수익률을 winsorize합니다. 여기서는 상위 5%와 하위 5%를 정의합니다.
- 한 달 이상의 수익률의 경우, 이를 월 단위로 복리화합니다.

```js
lags = [1,2,3,6,9,12,24]
df_momentum = pd.DataFrame()
outlier_cutoff = 0.05

for lag in lags:
    df_momentum[f'return_{lag}m'] = (df_monthly
                           .pct_change(lag)
                           .stack()
                           .pipe(lambda x: x.clip(lower=x.quantile(outlier_cutoff),
                                                  upper=x.quantile(1-outlier_cutoff)))
                           .add(1)
                           .pow(1/lag)
                           .sub(1)
                           )


df_momentum = df_momentum.swaplevel().sort_index()

df_momentum
```

![이미지](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_4.png)

말씀드린대로, 이 모든 숫자는 서로 다른 기간의 월간 비복리 수익률입니다. 월간 수익률 시리즈 상관 관계를 보여주는 간단한 플롯을 사용합니다.

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
import seaborn as sns
sns.clustermap(df_momentum.corr('spearman'), annot=True, center=0, cmap='vlag', figsize=(6, 6))
```

![Image](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_5.png)

현재 월에 대한 금월 수익률의 차이를 계산하여 모멘텀을 얻습니다.

```python
# 더 긴 기간 수익률에서 지난달 수익률을 뺌으로써 모멘텀 팩터를 얻습니다
for lag in [2, 3, 6, 9, 12, 24]:
    df_momentum[f'return_{lag}m_1m'] = df_momentum[f'return_{lag}m'] - df_momentum['return_1m']
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

![이미지](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_6.png)

단계 2.2: 파마 요인 구축하기

파마 개념은 요인 모델의 기초를 구축합니다. 파마 요인 구축에 관한 다른 전체 기사가 있습니다. 그래서 여기에서는 자세한 내용을 생략하겠습니다. 다만, 파마 결과는 YYYYMM 형식으로 반환되며, 이러한 요인들을 위쪽의 모멘텀과 함께 결합하려면 이를 월말 날짜로 변환해야 합니다.

```js
import warnings
warnings.filterwarnings('ignore')

import pandas_datareader.data as web
from statsmodels.regression.rolling import RollingOLS
import statsmodels.api as sm

# 파마 요인 받아오기
fama_factors = web.DataReader('F-F_Research_Data_5_Factors_2x3', 'famafrench', start='2000')[0].drop('RF', axis=1)
fama_factors.index = fama_factors.index.to_timestamp()
fama_factors = fama_factors.resample('M').last()

# 실제 월 별 수익과 요인 결합
fama_factors = fama_factors.join(df_momentum['return_1m'])
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

![image](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_7.png)

그런 다음 각 요소의 베타를 롤링 12개월 회귀분석을 통해 계산합니다.

```js
T = 12
betas = (fama_factors.groupby(level='Ticker',
                             group_keys=False)
         .apply(lambda x: RollingOLS(endog=x.return_1m,
                                     exog=sm.add_constant(x.drop('return_1m', axis=1)),
                                     window=min(T, x.shape[0]-1))
                .fit(params_only=True)
                .params
                .drop('const', axis=1)))
betas.describe()

sns.clustermap(betas.dropna().corr(), annot=True, center=0, cmap='vlag')
```

![image](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_8.png)

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

![image](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_9.png)

```js
df_momentum = df_momentum.join(betas.groupby((level = "Ticker")).shift()).dropna();

df_momentum.info();
df_momentum[["Mkt-RF", "SMB", "HML", "RMW", "CMA"]].describe();
```

![image](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_10.png)

**단계 2.3:** 판단 데이터에 대한 더미 요인 생성하기

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

야후쿼리 패키지를 이 yahoo에도 적용하였습니다. 이 패키지를 이용하면 기업 수준의 모든 참조 데이터를 제공합니다. 여기서는 단순히 기업 섹터를 보조 데이터로 추가 기능으로 데이터 프레임에 추가하는 방법을 보여드리겠습니다.

```js
import yahooquery as yq
tickers = yq.Ticker(tickerlist)
df_ref = pd.DataFrame(tickers.asset_profile)

df_sector = df_ref.loc['sector', :].to_frame()  #.index.rename('Ticker')
df_sector.index = df_sector.index.rename('Ticker')
df_sector
```

<img src="/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_11.png" />

```js
df_momentum = df_momentum.join(df_sector)

# 더미 데이터 생성
df_dummy = pd.get_dummies(df_momentum,
                          columns = ['sector'])

# 이 방법으로 여러 열 이름을 체계적으로 변경하는 방법을 배웠습니다. 매우 효율적이에요!
df_dummy = df_dummy.rename(columns = lambda x: x.replace('sector_', ''))
df_dummy.info()
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

![Feature Engineering](/assets/img/2024-06-22-QuantInvestmenthowIconstructFACTORSforalpharesearchfeatureengineering_12.png)

이제 머신 러닝 알고리즘을 적용하기 전에 효과적으로 feature를 구성하는 방법을 보았습니다. 일반적인 주제는 dataframe에 일치하는 ticker 및 날짜의 일관된 인덱스 이름과 합병 전에 일관된 날짜를 보장하는 것입니다. 동일한 마인드셋으로 판매, 인적 자본 데이터와 같은 대체 데이터를 동일한 테이블에 결합할 수 있습니다.

이 기사가 도움이 되었기를 바랍니다. 공감이나 댓글을 남기고 생각을 알려주세요!

즐거운 코딩과 유익한 투자되세요 :)
