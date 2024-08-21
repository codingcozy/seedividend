---
title: "파이썬으로 모멘텀 전략 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-MomentumStrategyusingPython_0.png"
date: 2024-06-22 05:44
ogImage:
  url: /assets/img/2024-06-22-MomentumStrategyusingPython_0.png
tag: Tech
originalTitle: "Momentum Strategy using Python"
link: "https://medium.com/@manishpeshwani/momentum-strategy-using-python-3a4bb7ecf5cf"
isUpdated: true
---

이번 주에는 점심 시간에 몇몇 동료들과 흥미로운 대화를 나누었습니다. 그들은 투자에 어떤 방법론을 사용하는지 물어보았어요. 저는 '모멘텀 투자'를 사용한다고 언급했는데, 그들은 정확히 무슨 의미인지 이해하기 어려워했어요. 그래서 이 기사를 쓰기로 결심했습니다. 제가 모멘텀 투자를 위해 따르는 단계를 설명하겠습니다.

# 모멘텀 투자란?

모멘텀 투자는 시장에서 이미 존재하는 추세를 기반으로 이익을 얻고자 하는 강력한 전략입니다. 지난 성과가 우수한 주식에 집중함으로써, 투자자들은 모멘텀의 흐름을 타고 인상적인 수익을 얻을 수 있을지도 모릅니다. 이 기사에서는 Nifty 50 주식을 위한 모멘텀 전략에 대해 자세히 살펴보고, 그 방법론을 설명하며 해당 전략을 구현하는 데 도움이 되는 Python 코드 조각을 제공할 것입니다.

모멘텀 투자는 과거에 우수한 성과를 보인 주식이 가까운 미래에도 계속 우수한 성과를 내리라는 전제에 기반합니다. 이 전략은 특정 기간 동안(예: 지난 1년) 우수한 성과를 보인 주식을 매수하고, 일정 기간(예: 1개월) 보유한 후 포트폴리오를 재평가하는 것을 포함합니다.

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

# 전략 개요

우리의 모멘텀 전략은 다음과 같은 간단한 단계로 구성되어 있습니다:

- 주식의 우주 선택: 여기서는 Nifty 50 주식에 초점을 맞출 것입니다.
- 과거 수익률 계산: 각 주식에 대해 12개월 수익률을 계산합니다.
- 주식 순위 매기기: 주식을 12개월 수익률에 기반하여 순위 매깁니다.
- 최고 주식 선택: 수익률이 가장 높은 상위 10개 주식을 선택합니다.
- 매월 리밸런싱: 매달 포트폴리오를 재평가하고 리밸런싱합니다.

# 전략 백테스팅

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

백테스팅은 거래 전략의 성과를 평가하는 데 중요합니다. 이전 데이터에 전략을 적용하여 과거 성과를 평가하고 잠재적인 미래 성과에 대한 통찰력을 얻을 수 있습니다.

파이썬을 사용하여 이 전략을 3년 동안 백테스트하고 해당 결과를 지수(여기서는 Nifty50)의 매수 및 보유 전략과 비교해보겠습니다.

## 단계 1: 데이터 수집

먼저, 지난 3년간 Nifty 50 주식의 히스토리컬 가격 데이터를 수집해야 합니다. 여기서는 야후 파이낸스 API를 사용하여 지난 3년간의 히스토리컬 데이터를 가져왔습니다.

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
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Nifty 50 주식 기호 목록
nifty50_symbols = ["RELIANCE.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS", "TCS.NS", "KOTAKBANK.NS",
                   "HINDUNILVR.NS", "SBIN.NS", "BHARTIARTL.NS", "HDFC.NS", "ITC.NS", "BAJFINANCE.NS",
                   "ASIANPAINT.NS", "HCLTECH.NS", "LT.NS", "MARUTI.NS", "AXISBANK.NS", "ULTRACEMCO.NS",
                   "WIPRO.NS", "NESTLEIND.NS", "ONGC.NS", "TITAN.NS", "SUNPHARMA.NS", "M&M.NS",
                   "POWERGRID.NS", "JSWSTEEL.NS", "TATASTEEL.NS", "TECHM.NS", "HDFCLIFE.NS", "COALINDIA.NS",
                   "BPCL.NS", "INDUSINDBK.NS", "BAJAJ-AUTO.NS", "IOC.NS", "BRITANNIA.NS", "HEROMOTOCO.NS",
                   "ADANIPORTS.NS", "DRREDDY.NS", "GRASIM.NS", "CIPLA.NS", "DIVISLAB.NS", "EICHERMOT.NS",
                   "BAJAJFINSV.NS", "SHREECEM.NS", "TATAMOTORS.NS", "SBILIFE.NS", "ADANIENT.NS",
                   "DABUR.NS", "VEDL.NS", "APOLLOHOSP.NS"]

# 시간 범위 정의
end_date = datetime.today()
start_date = end_date - timedelta(days=365*3)  # 최근 3년간

# 데이터 가져오기
data = yf.download(nifty50_symbols, start=start_date, end=end_date)['Adj Close']

# 누락된 값 채우기
data = data.fillna(method='ffill').dropna()

# 데이터의 처음 몇 행 표시
print(data.head())
```

## 단계 2: 전략 구현 및 수익률 계산

그다음, 모멘텀 전략을 구현하고 지난 3년간 포트폴리오 수익률을 계산합니다.

```js
def calculate_portfolio_returns(data, top_n=10):
    # 월간 수익률 계산
    monthly_returns = data.resample('M').ffill().pct_change()

    # 12개월 수익률 계산
    twelve_month_returns = monthly_returns.rolling(window=12).apply(lambda x: np.prod(1 + x) - 1, raw=True)

    # 월별 포트폴리오 가치를 저장할 빈 목록 초기화
    portfolio_values = []

    # 초기 자본 부여
    initial_capital = 100000  # 1 lakh
    capital = initial_capital

    # 13번째 달부터 시작하여 각 월 반복
    for i in range(12, len(twelve_month_returns)):
        # 현재 달의 12개월 수익률 가져오기
        current_returns = twelve_month_returns.iloc[i]

        # 주식을 12개월 수익률에 따라 순위 매기기
        ranked_stocks = current_returns.sort_values(ascending=False)

        # 상위 N개 주식 선택
        top_stocks = ranked_stocks.head(top_n).index

        # 각 주식에 대한 동일 가중치 계산
        weight = 1 / top_n

        # 현재 달의 포트폴리오 수익률 계산
        portfolio_return = (monthly_returns.iloc[i][top_stocks] * weight).sum()

        # 자본 업데이트
        capital = capital * (1 + portfolio_return)

        # 현재 자본을 포트폴리오 가치 목록에 추가
        portfolio_values.append(capital)

    # 포트폴리오 가치 목록을 pandas Series로 변환
    portfolio_values = pd.Series(portfolio_values, index=twelve_month_returns.index[12:])

    return portfolio_values

# 포트폴리오 수익률 계산
momentum_portfolio_returns = calculate_portfolio_returns(data)

# 포트폴리오 수익률 표시
print(momentum_portfolio_returns)
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

## 단계 3: Nifty 50 지수와 비교

모멘텀 전략의 성능을 평가하기 위해 해당 전략의 수익률을 동일 기간 동안 Nifty 50 지수의 수익률과 비교합니다.

```js
# Nifty 50 지수 데이터 가져오기
nifty50_index = yf.download("^NSEI", start=start_date, end=end_date)['Adj Close']

# Nifty 50 월간 수익률 계산하기
nifty50_monthly_returns = nifty50_index.resample('ME').ffill().pct_change()

# Nifty 50 누적 수익률 계산하기
nifty50_cumulative_returns = (1 + nifty50_monthly_returns).cumprod()

# 모멘텀 포트폴리오 누적 수익률 계산하기
momentum_cumulative_returns = (1 + momentum_portfolio_returns.pct_change()).cumprod()

# 결과 그래프로 플로팅하기
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(momentum_cumulative_returns, label='모멘텀 포트폴리오')
plt.plot(nifty50_cumulative_returns, label='Nifty 50 지수', linestyle='--')
plt.title('모멘텀 포트폴리오 vs Nifty 50 지수')
plt.xlabel('날짜')
plt.ylabel('누적 수익률')
plt.legend()
plt.grid(True)
plt.show()
```

<img src="/assets/img/2024-06-22-MomentumStrategyusingPython_0.png" />

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

# 결과 및 분석

위의 그림은 지난 3년간 모멘텀 포트폴리오의 누적 수익률을 Nifty 50 지수와 비교한 것입니다. 다음은 주요 관측 사항입니다:

- 이 기간 동안 모멘텀 포트폴리오가 일반적으로 Nifty 50 지수를 능가하여 모멘텀 전략의 효과를 입증했습니다.
- 모멘텀 포트폴리오가 상당한 변동을 겪는 등의 변동성이 있었는데, 이는 모멘텀 기반 전략에 특징적인 것입니다.
- 전반적으로, 모멘텀 전략은 Nifty 50 지수를 단순 보유하는 것보다 더 높은 투자 수익을 제공했습니다.

# 결론

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

니프티 50 주식들에 대한 모멘텀 투자 전략은 지난 3년 동안 기대를 불러일으켰어요. 12개월 수익률에 기반한 상위 10개 주식을 선택하고 매월 포트폴리오를 리밸런싱 함으로써, 이 전략은 니프티 50 지수를 능가했어요. 하지만 과거 성과가 미래 성과를 반영한다는 점을 명심해야 하며, 투자자는 이 전략을 실행하기 전에 위험 허용 수준 및 투자 목표를 신중히 고려해야 해요.

제공된 Python 코드 스니펫을 사용하여 이 모멘텀 전략을 백테스트하고 원하는 대로 사용자 정의할 수 있어요. 모멘텀 투자는 투자자의 무기로 강력할 수 있지만, 일관된 성공을 거두기 위해서는 규율과 체계적인 접근이 필요해요.
