---
title: "암호화폐를 이용한 파이썬 리스크 포트폴리오 관리 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-RiskPortfolioManagementinPythonwithCryptos_0.png"
date: 2024-07-12 19:42
ogImage: 
  url: /TIL/assets/img/2024-07-12-RiskPortfolioManagementinPythonwithCryptos_0.png
tag: Tech
originalTitle: "Risk Portfolio Management in Python with Cryptos"
link: "https://medium.com/algo-trading-mastery/risk-portfolio-management-in-python-with-cryptos-f205a178df54"
---


디지털 자산이 전례 없는 중요성을 얻는 시대에는 강력하고 효과적인 포트폴리오 관리 전략이 이전보다 중요합니다. 이 기사는 역사적 시장 데이터를 활용하고 첨단 금융 알고리즘을 적용하여 암호화폐 포트폴리오를 최적화하는 Python 스크립트에 대해 심층적으로 다룹니다. 강력한 ccxt 라이브러리를 통합하여 늘어난 암호화폐 거래소에서 역사적 가격 데이터를 가져옵니다. 이를 통해 심층적인 분석과 전략 실행이 가능해집니다. 스크립트의 기능은 이동 평균 교차 전략을 활용하여 최적의 거래 신호를 식별하는 데 도움이 됩니다. 더불어, 위험과 수익을 효율적으로 균형잡는 볼록 최적화 기법을 사용한 포트폴리오 최적화 모듈을 포함하고 있습니다. 이 포괄적인 가이드는 시장 데이터를 획득하고 처리하는 기술적 세부 사항을 보여주는데 그치지 않고, 전략 수립부터 포트폴리오 시각화에 이르기까지의 실용적인 응용에 대한 통찰력을 제공하여 트레이더와 투자자가 암호화폐의 다이내믹한 세계에서 정보에 기반한 결정을 내릴 수 있도록 돕습니다.

# 포트폴리오 리스크 관리 사용의 장점

- 위험 완화: 포트폴리오 리스크 관리는 위험을 식별, 평가 및 완화하여 포트폴리오가 중요한 손실에 대해 보호받도록 돕습니다.
- 정보기반 결정: 역사적 데이터와 시장 동향을 분석함으로써 투자자는 자산 할당을 최적화하여 보다 정보에 기반한 결정을 내릴 수 있습니다.
- 수익 향상: 효과적인 리스크 관리를 통해 투자자는 수익을 극대화하고 동시에 위험을 최소화하는 포트폴리오를 달성할 수 있습니다.
- 다양성: 다양성을 홍보하여 어떤 단일 자산의 불리한 움직임에 대한 영향을 줄입니다.
- 일관성: 일관된 투자 전략을 유지하여 시장 변동성에 기반한 충동적인 결정을 피합니다.
- 준수: 규제 요구 사항과 지침을 준수하는 데 도움을 줌으로써 법적과 윤리적 기준을 준수합니다.

# 포트폴리오 리스크 관리 사용의 단점

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

- 복잡성: 포트폴리오 위험 관리 전략을 구현하는 것은 복잡할 수 있으며, 재무 시장과 금융 상품에 대한 심층적인 이해가 필요합니다.
- 비용: 위험 관리 도구와 소프트웨어에는 연관된 비용이 있으며, 모든 투자자가 감당할 수 없을 수도 있습니다.
- 시간 소모: 지속적인 모니터링과 분석이 필요하기 때문에 시간이 많이 소요되며 자원이 많이 소모될 수 있습니다.
- 과도한 조심: 위험 관리에 과도하게 초점을 맞출 경우, 과도한 보수적인 전략으로 이어질 수 있어 수익을 제한할 수 있습니다.
- 역사적 데이터에 의존: 위험 관리는 종종 역사적 데이터에 의존하는데, 이는 미래 시장 상황을 정확하게 예측하지 못할 수 있습니다.

# 포트폴리오 위험 관리의 장점

- 안정성 향상: 위험을 효과적으로 관리함으로써 포트폴리오는 더 큰 안정성을 달성할 수 있어 극단적인 손실 가능성을 줄일 수 있습니다.
- 자본 할당 개선: 더 나은 자본 할당이 가능하며, 자원이 가장 유망한 자산에 투자되도록 보장합니다.
- 투자자 신뢰 증대: 투자자들이 위험 감소에 초점을 두고 투자를 관리하고 있다는 사실에 대한 신뢰감을 높여줍니다.
- 전략적 유연성: 전략적 유연성을 제공하여 시장 변화에 따라 전략을 조정할 수 있도록 허용합니다.
- 성과 모니터링 향상: 지속적인 성과 모니터링을 가능하게 하여 투자자가 필요에 따라 전략을 추적하고 조정할 수 있도록 도와줍니다.

# 포트폴리오 위험 관리의 단점

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

- 자원 소모가 많음: 효율적으로 구현하고 유지하기 위해서는 상당한 시간, 자금 및 전문지식이 필요합니다.
- 과도한 최적화 가능성: 리스크를 최소화하는 데 초점을 맞추다 보면 높은 수익 기회가 놓칠 수 있는 과도한 최적화의 위험이 있습니다.
- 데이터 의존성: 정확하고 최신 데이터에 대한 높은 의존성으로 인해 획득과 유지가 어려울 수 있습니다.
- 시장의 예측 불가능성: 견고한 리스크 관리 실천에도 불구하고 시장은 예측할 수 없으며 예기치 못한 사건이 포트폴리오에 여전히 영향을 줄 수 있습니다.
- 소규모 투자자에 대한 적용 범위가 제한적: 복잡성과 비용 제한으로 인해 고급 리스크 관리의 혜택이 소규모 투자자에게 덜 접근하기 어려울 수 있습니다.

![이미지](/TIL/assets/img/2024-07-12-RiskPortfolioManagementinPythonwithCryptos_0.png)

```js
바이낸스에서의 역사적 데이터 획득 중...

최적화 결과:
BTC/USDT: 1.0
ETH/USDT: -5.538816095795286e-23

예상 포트폴리오 수익률: 0.0017
최소 포트폴리오 분산: 0.0195
```

![이미지](/TIL/assets/img/2024-07-12-RiskPortfolioManagementinPythonwithCryptos_1.png)

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


# 필요한 라이브러리 가져오기
import ccxt
import pandas as pd
import numpy as np
import cvxpy as cp
import matplotlib.pyplot as plt
from datetime import datetime

# ccxt에서 기록 데이터 가져오는 함수
def get_ccxt_data(exchange_name, symbols, timeframe, since):
    exchange = getattr(ccxt, exchange_name)()
    data = {}

    for symbol in symbols:
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe, since=since)
        
        if ohlcv:
            df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            df['time'] = pd.to_datetime(df['timestamp'], unit='ms')
            df.set_index('time', inplace=True)
            df.drop(['timestamp', 'open', 'high', 'low', 'volume'], axis=1, inplace=True)
            
            # 일일 수익률 계산
            df['return'] = df['close'].pct_change().fillna(0)
            
            # 데이터 사전에 저장
            data[symbol] = df
    
    return data

# 이동평균 교차 전략 적용하는 함수
def apply_sma_strategy(data, short_window=12, long_window=26):
    for symbol, df in data.items():
        df['SMA_50'] = df['close'].rolling(window=short_window).mean()
        df['SMA_200'] = df['close'].rolling(window=long_window).mean()
        df['signal'] = 0
        df.loc[df.index[short_window:], 'signal'] = np.where(
            df.loc[df.index[short_window:], 'SMA_50'] > df.loc[df.index[short_window:], 'SMA_200'], 1, 0
        )
        df['position'] = df['signal'].shift(1).fillna(0)
    return data

# 전략에 따라 수익 조정하는 함수
def adjust_returns(data):
    for symbol, df in data.items():
        df['adjusted_return'] = df['return'] * df['position']
    return data

# 포트폴리오 최적화하는 함수
def optimize_portfolio(data):
    symbols = list(data.keys())
    n_assets = len(symbols)
    
    # 모든 자산 중 가장 작은 데이터 길이 찾기
    min_length = min(len(data[symbol]) for symbol in symbols)
    
    # 수익 조정하고 정규화하기
    returns = np.zeros((min_length, n_assets))
    for i, symbol in enumerate(symbols):
        # 데이터 길이 조정
        df = data[symbol].iloc[:min_length]
        returns[:, i] = df['adjusted_return'].values
    
    # 공분산 행렬과 기대수익률 계산
    cov_matrix = np.cov(returns, rowvar=False)
    expected_returns = np.mean(returns, axis=0)
    
    # 최적화 변수
    weights = cp.Variable(n_assets)
    risk = cp.quad_form(weights, cov_matrix)
    objective = cp.Maximize(expected_returns @ weights - 0.5 * risk)
    
    # 제약 조건
    constraints = [cp.sum(weights) == 1, weights >= 0]
    
    # 최적화 문제 해결
    prob = cp.Problem(objective, constraints)
    prob.solve()
    
    # 최적화 결과 표시
    print("\n최적화 결과:")
    for i, symbol in enumerate(symbols):
        print(f"{symbol}: {weights.value[i]}")
    
    # 포트폴리오의 최소 분산과 기대수익률 계산
    min_variance = cp.sqrt(cp.quad_form(weights.value, cov_matrix)).value
    expected_return_portfolio = expected_returns @ weights.value
    
    print(f"\n예상 포트폴리오 수익률: {expected_return_portfolio:.4f}")
    print(f"최소 포트폴리오 분산: {min_variance:.4f}")
    
    return symbols, weights.value

# 결과 시각화하는 함수
def visualize_results(symbols, weights):
    # 포트폴리오의 각 자산 가중치 그래프로 표시
    plt.figure(figsize=(10, 6))
    plt.bar(symbols, weights, color='blue')
    plt.xlabel('자산')
    plt.ylabel('가중치')
    plt.title('최적화된 포트폴리오 내 자산 가중치')
    plt.show()

# 메인 스크립트 실행
if __name__ == "__main__":
    # 매개변수 정의
    exchange_name = 'binance'  # 거래소 이름
    symbols = ["BTC/USDT", "ETH/USDT"]  # 자산 심볼
    timeframe = '1d'  # 시간프레임 (1일)
    since = ccxt.binance().parse8601('2023-01-01T00:00:00Z')  # 시작 날짜
    
    # ccxt에서 기록 데이터 가져오기
    print(f"{exchange_name}에서 기록 데이터 가져오는 중...")
    data = get_ccxt_data(exchange_name, symbols, timeframe, since)
    
    if data:
        # 이동평균 교차 전략 적용
        data = apply_sma_strategy(data)
        
        # 전략에 따라 수익 조정
        data = adjust_returns(data)
        
        # 포트폴리오 최적화
        symbols, weights = optimize_portfolio(data)
        
        # 결과 시각화
        visualize_results(symbols, weights)
