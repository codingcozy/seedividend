---
title: "PyBroker를 사용한 포트폴리오 최적화 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PortfolioOptimizationwithPyBroker_0.png"
date: 2024-07-09 14:26
ogImage:
  url: /assets/img/2024-07-09-PortfolioOptimizationwithPyBroker_0.png
tag: Tech
originalTitle: "Portfolio Optimization with PyBroker"
link: "https://medium.com/@edtechre/portfolio-optimization-with-pybroker-5ce0af389bfa"
---

<img src="/TIL/assets/img/2024-07-09-PortfolioOptimizationwithPyBroker_0.png" />

포트폴리오 최적화는 포트폴리오 내 자산을 특정 목표를 충족시키기 위해 할당하는 방법입니다. 예를 들어, 이는 리스크를 최소화하고 수익을 극대화하는 목표로 자산 포트폴리오를 구성하는 데 사용할 수 있습니다.

포트폴리오 최적화는 정기적으로 주식 포트폴리오를 리밸런싱하는 유용한 기술일 수 있습니다. 이 접근 방식을 통해 우리는 포트폴리오의 원하는 목표를 달성하기 위해 가장 최적의 방법으로 주식을 매수하고 매도할 수 있습니다.

이 글에서는 Python과 PyBroker를 사용하여 매월 초에 포트폴리오를 리밸런싱하는 거래 전략을 시뮬레이션하는 방법을 살펴볼 것입니다.

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

## 설정

거래 전략을 시뮬레이션하기 위해서는 Python에서 백테스팅 프레임워크를 사용할 수 있습니다. 우리는 트레이딩 전략을 개발하기 위한 오픈소스 Python 프레임워크인 PyBroker을 사용할 것입니다. PyBroker을 사용하기 위해 아래의 명령어를 터미널에 입력하여 라이브러리를 설치할 수 있습니다:

```js
pip install -U lib-pybroker
```

그 다음으로, 우리가 PyBroker에서 구현할 전략을 위해 포트폴리오 최적화를 수행할 수 있는 Riskfolio-Lib을 설치해봅시다.

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

```shell
pip install -U riskfolio-lib
```

위의 패키지를 설치한 후, 필요한 라이브러리를 import하여 새 노트북을 만들어봅시다:

```shell
import pandas as pd
import pybroker as pyb
import riskfolio as rp
from datetime import datetime
from pybroker import ExecContext, Strategy, YFinance
```

또한 PyBroker에서 데이터 캐싱을 활성화할 수도 있습니다. 이렇게 하면 Yahoo Finance로부터 다운로드된 히스토리컬 데이터가 캐싱되어 전략을 테스트할 수 있습니다:

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
pyb.enable_data_source_cache("rebalancing");
```

## Positions Rebalancing

우리는 PyBroker를 사용하여 매달 처음에 길이만 있는 포트폴리오를 동일한 포지션 사이징을 사용하여 리밸런싱(rebalancing)하는 간단한 전략을 작성해 보겠습니다. 말하자면, 매월 초에 우리 전략은 포트폴리오의 각 주식이 대략적으로 동일한 할당을 갖도록 충분한 주식을 매수하거나 매도할 것입니다.

먼저, 주식의 목표 할당에 도달하기 위해 주식의 충분한 주식을 매수하거나 매도할 수 있는 함수를 구현하는 것으로 시작합니다.

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
def set_target_shares(
    ctxs: dict[str, ExecContext],  # 종목 심볼 -> 실행 컨텍스트
    targets: dict[str, float]      # 종목 심볼 -> 목표 가중치
):
    for symbol, target in targets.items():
        ctx = ctxs[symbol]
        # 목표 가중치를 사용하여 목표 주식수 계산
        target_shares = ctx.calc_target_shares(target)
        pos = ctx.long_pos()
        # 현재 해당 종목의 매수 포지션이 없는 경우 매수
        if pos is None:
            ctx.buy_shares = target_shares
        # 아니면, 목표치에 도달할 만큼 주식을 매수
        elif pos.shares < target_shares:
            ctx.buy_shares = target_shares - pos.shares
        # 현재 할당이 목표 수준을 초과하는 경우, 충분한 주식 매도
        elif pos.shares > target_shares:
            ctx.sell_shares = pos.shares - target_shares
```

현재 할당이 목표 수준을 초과하면 해당 자산의 필요 주식을 판매하고, 현재 할당이 목표 수준 미만이면 해당 자산의 필요 주식을 구매하는 함수입니다.

다음으로 매월 초에 각 주식을 동일 비중으로 타겟팅하는 리밸런싱 함수를 작성합니다:

```python
def rebalance(ctxs: dict[str, ExecContext]):
    if start_of_month(ctxs):
        target = 1 / len(ctxs)  # 동일 가중치
        set_target_shares(ctxs, {symbol: target for symbol in ctxs.keys()})
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

그럼 이제 새로운 달의 시작을 감지하는 도우미 함수를 구현해 봅시다:

```js
def start_of_month(ctxs: dict[str, ExecContext]) -> bool:
    dt = tuple(ctxs.values())[0].dt
    if dt.month != pyb.param('current_month'):
        pyb.param('current_month', dt.month)
        return True
    return False
```

이제 이러한 함수들을 사용하여 다섯 가지 주식 포트폴리오를 위한 리밸런싱 전략을 백테스트할 수 있습니다.

```js
strategy = Strategy(YFinance(), (start_date = "1/1/2018"), (end_date = "1/1/2023"));
strategy.add_execution(None, ["TSLA", "NFLX", "AAPL", "NVDA", "AMZN"]);
strategy.set_after_exec(rebalance);
result = strategy.backtest();
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

백테스트를 실행한 후에는 주문 목록을 확인할 수 있습니다:

```js
result.orders;
```

```js
     type symbol date        shares  limit_price  fill_price  fees
id
1    buy  NFLX   2018-01-03  99      NaN          203.86      0.0
2    buy  AAPL   2018-01-03  464     NaN           43.31      0.0
3    buy  TSLA   2018-01-03  935     NaN           21.36      0.0
4    buy  AMZN   2018-01-03  336     NaN           59.84      0.0
5    buy  NVDA   2018-01-03  376     NaN           52.18      0.0
... ... ... ... ... ... ... ...
292  sell NFLX   2022-12-02   15     NaN         315.99       0.0
293  sell NVDA   2022-12-02   97     NaN         166.89       0.0
294  buy  AAPL   2022-12-02   27     NaN         146.82       0.0
295  buy  TSLA   2022-12-02   70     NaN         193.68       0.0
296  buy  AMZN   2022-12-02   41     NaN          94.57       0.0
```

그리고 우리의 전략을 평가하기 위한 성능 지표를 확인할 수 있습니다:

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
result.metrics_df;
```

```js
trade_count                 207.000000
initial_market_value     100000.000000
end_market_value         320498.810000
total_pnl                305804.840000
total_return_pct            305.804840
max_drawdown            -332039.770000
max_drawdown_pct            -52.068777
```

## 포트폴리오 최적화 사용

포트폴리오에서 각 주식을 동일한 포지션 크기로 할당하는 대신, 포트폴리오 최적화를 사용하여 각 주식의 할당을 결정해 보겠습니다.

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

Riskfolio-Lib을 사용하여 포트폴리오에서 각 주식에 할당해야 하는 금액을 최소화하여 리스크를 계산할 수 있어요. 이것은 각 주식과 연관된 과거 리스크를 측정함으로써 할 수 있어요.

조건부 가치위험(CVaR)은 각 주식의 위험을 평가하는 한 가지 방법이에요. 특정 확률 수준 이상의 최악의 시나리오에서 예상 손실을 제공해요. 예를 들어, CVaR은 95% 신뢰 수준을 고려할 때 시나리오 중 최악의 5%에서의 평균 손실을 추정할 수 있어요.

아래에서는 작년의 수익률을 사용하여 CVaR을 최소화하고 포트폴리오에 할당하기 위해 RiskFolio-Lib을 사용했어요.

```js
pyb.param('lookback', 252)  # 작년의 수익률 사용 -> 252 바.

def calculate_returns(ctxs: dict[str, ExecContext], lookback: int):
    prices = {}
    for ctx in ctxs.values():
        prices[ctx.symbol] = ctx.adj_close[-lookback:]
    df = pd.DataFrame(prices)
    return df.pct_change().dropna()

def optimization(ctxs: dict[str, ExecContext]):
    if start_of_month(ctxs):
        Y = calculate_returns(ctxs, lookback)
        port = rp.Portfolio(returns=Y)
        port.assets_stats(method_mu='hist', method_cov='hist', d=0.94)
        # CVaR을 최소화한 후 목표 가중치 얻기.
        w = port.optimization(
            model='Classic',
            rm='CVaR',
            obj='MinRisk',
            rf=0,      # 무위험 이자율.
            l=0,       # 리스크 회피 계수.
            hist=True  # 과거 시나리오 사용.
        )
        targets = {
            symbol: w.T[symbol].values[0]
            for symbol in ctxs.keys()
        }
        set_target_shares(ctxs, targets)
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

Riskfolio-Lib의 공식 문서에서 더 많은 정보와 예제를 찾을 수 있어요. 이제 전략의 백테스팅으로 넘어가 볼까요?

```js
strategy.set_after_exec(optimization);
result = strategy.backtest((warmup = pyb.param("lookback")));
```

여기서는 새 전략의 성과 지표를 확인해 봅시다:

```js
trade_count                     100.000000
initial_market_value         100000.000000
end_market_value             201318.070000
total_pnl                    139465.420000
total_return_pct                139.465420
max_drawdown                -106042.150000
max_drawdown_pct                -35.190829
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

흥미로운 내용이에요! 이 전략을 사용한 수익률이 평균 포지션 사이즈와 비교했을 때 적은 것을 볼 수 있어요 (139% vs 305%), 그런데 최대 손실액은 낮았다는 것도 알 수 있어요 (35% vs 52%). CVaR을 최소화하는 것이 포트폴리오의 전체 수익률을 크게 줄였다는 점을 고려해봤을 때, 이에 따라 포트폴리오의 하락폭도 크게 감소했어요!

그리고 이 글로 마무리 지을게요! 이제 여러분도 포트폴리오 최적화를 자신만의 거래 전략에 사용하는데 충분히 장비가 되었을 거에요. 또한 https://www.pybroker.com에서 PyBroker 사용에 대한 더 많은 튜토리얼을 찾아볼 수 있어요. 모든 코드는 Github 저장소에서 확인할 수 있어요.

읽어 주셔서 감사합니다!
