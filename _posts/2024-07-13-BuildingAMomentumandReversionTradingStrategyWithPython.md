---
title: "파이썬으로 모멘텀 및 되돌림 트레이딩 전략 구축 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-BuildingAMomentumandReversionTradingStrategyWithPython_0.png"
date: 2024-07-13 19:01
ogImage: 
  url: /TIL/assets/img/2024-07-13-BuildingAMomentumandReversionTradingStrategyWithPython_0.png
tag: Tech
originalTitle: "Building A Momentum and Reversion Trading Strategy With Python"
link: "https://medium.com/gitconnected/building-a-momentum-and-reversion-trading-strategy-with-python-b49efee4533c"
---


양적 거래에서는 금융 시장에서 우위를 차지하기 위해 다양한 전략이 사용됩니다. 모멘텀 및 추세 기반 전략은 인기가 많지만, 종종 중요한 알파를 창출하는 데 어려움을 겪습니다. 이들은 종종 유튜브에서 금융 강좌로 판매될 때만 알파를 창출하게 됩니다.

모멘텀 및 추세 접근법은 최근 가격 상승을 보이는 자산이 가까운 미래에 상승세를 이어갈 것이라는 아이디어를 활용하거나, 손실을 보이는 자산이 계속해서 하락할 것이라는 아이디어를 기반으로 합니다. 추세와 모멘텀을 구분하는 것이 중요합니다.

- 추세 추종은 시장 베타를 분석하여 특정 방향의 절대 수익을 목표로 합니다.
- 반면에, 모멘텀 전략은 상대 수익에 초점을 맞추며, 분류나 섹터 내에서 교차부문 성능을 평가하여 시장 중립적 입장을 유지합니다.

회귀 전략은 가격이 특정 기간 동안 평균 또는 다중 평균 값으로 되돌아갈 것이라는 믿음에 기반합니다.

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

이 기사에서는 이러한 전략을 검토하고 해당 분석을 위한 Python 코드 구현을 제공할 것입니다. 우리는 페어 트레이딩을 포함한 더 세련된 전략과 분석을 진행할 것입니다.

우리의 분석은 최근의 시장 상황, 특히 팬데믹 이후의 주식 가격을 기준으로 살펴볼 것입니다. 모든 논의된 전략은 롱 온리이며 레버리지가 걸리지 않은 전략입니다.

시작하기 전에, 투자 커뮤니티에 가입하실 것을 초대합니다. 가입하시면 중요한 기사를 놓치지 않고 투자자로서 스킬을 향상시킬 수 있습니다.

Python 환경을 설정하는 것은 효율적으로 Python 코드를 작성, 실행 및 관리하기 위해 필요한 도구와 라이브러리를 갖추는 것을 포함합니다. Python 환경을 설정하는 자세한 안내서는 여기 있습니다:

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

# 1. 파이썬 설치하기:

만약 여러분의 컴퓨터에 아직 파이썬이 설치되어 있지 않다면, 공식 파이썬 웹사이트([https://www.python.org/](https://www.python.org/))에서 다운로드하고 설치해주세요. 여러분의 운영 체제(Windows, macOS, 또는 Linux)에 맞는 올바른 버전을 선택해야 합니다. 가장 최신의 안정 버전을 설치하는 것이 좋습니다.

# 2. 텍스트 편집기 또는 IDE 선택하기:

파이썬으로 코딩할 때 텍스트 편집기나 통합 개발 환경(IDE)을 선택해주세요. 널리 사용되는 몇 가지 옵션으로는:

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

- Visual Studio Code: 내장된 Python 지원과 다양한 확장 기능을 갖춘 가벼운 사용자 정의 가능한 편집기입니다.
- PyCharm: 코드 완성, 디버깅 및 버전 관리 시스템과 통합된 Python 개발을 위해 최적화된 견고한 IDE입니다.
- Jupyter Notebook: 데이터 분석 및 시각화 작업에 이상적인 웹 브라우저에서 Python 코드를 작성하고 실행할 수 있는 인터랙티브 노트북 인터페이스입니다.

## 3. 가상 환경 설정하기 (선택 사항이지만 권장됨):

가상 환경은 종속성을 관리하고 프로젝트 환경을 격리하는 데 유용합니다. 가상 환경을 만들려면 터미널이나 명령 프롬프트를 열고 프로젝트 디렉토리로 이동한 다음 다음 명령을 실행하십시오:

```js
python -m venv myenv
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

해당 명령어는 프로젝트 디렉토리에 `env`라는 가상 환경을 만듭니다. 가상 환경을 활성화하려면 다음 명령어를 사용하십시오 (사용하는 운영 체제에 따라 명령어가 다를 수 있습니다):

## Windows:

```js
.\env\Scripts\activate
```

## macOS/Linux:

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
source env/bin/activate
```

활성화된 후에 `pip`를 사용하여 프로젝트별 종속성을 설치할 수 있습니다. 이 가상 환경 안에 이들이 포함되어 다른 프로젝트와의 충돌을 방지합니다.

# 4. 필요한 패키지 설치:

```js
python -m venv myenv
pip install numpy pandas matplotlib
pip install -r requirements.txt
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

# 트렌드와 모멘텀 전략

예를 들어 설명하자면, 만약 자산의 가격이 지난 일주일 동안 상승 추세를 보였다면, 그 자산은 같은 방향으로 계속 움직일 가능성이 높습니다. 이 전략은 미래 가격 변동이 과거 움직임의 패턴을 따르리라는 아이디어에 기반을 두고 있습니다. 월스트리트벳 커뮤니티가 자주 외친 것처럼, 주식은 주로 상승하는 경향이 있습니다.

비록 이 전략이 간단하긴 하지만, 다음과 같은 단점이 있습니다:

- 시장 소음과 중요한 이벤트를 무시하여 중요한 변동을 완화할 수 있습니다.
- 빈번한 거래는 거래 수수료 누적으로 이어질 수 있습니다.
- 폭넓게 사용되기 때문에 이 전략을 활용하는 데 경쟁 우위가 제한적이거나 전혀 없을 수 있습니다.

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

# 이동평균 교차 전략

다음 코드는 이 전략을 구현합니다:

```js
def double_simple_moving_average_signals(ticker_ts_df, short_window=5, long_window=30):
    """
    이중 단순 이동평균 (SMA) 전략을 기반으로 거래 신호를 생성합니다.
    매개변수:
    - ticker_ts_df (pandas.DataFrame): 주식의 과거 데이터가 포함 된 DataFrame.
    - short_window (int): 단기 SMA의 창 크기.
    - long_window (int): 장기 SMA의 창 크기.
    반환값:
    - signals (pandas.DataFrame): 거래 신호를 포함하는 DataFrame.
    """
    signals = pd.DataFrame(index=ticker_ts_df.index)
    signals['signal'] = 0.0
    signals['short_mavg'] = ticker_ts_df['Close'].rolling(window=short_window,
                                                          min_periods=1,
                                                          center=False).mean()
    signals['long_mavg'] = ticker_ts_df['Close'].rolling(window=long_window,
                                                         min_periods=1,
                                                         center=False).mean()
    # SMAs가 교차 되었을 때 신호 생성
    signals['signal'] = np.where(
        signals['short_mavg'] > signals['long_mavg'], 1, 0)
    signals['orders'] = signals['signal'].diff()
    signals.loc[signals['orders'] == 0, 'orders'] = None
    return signals
```

필요한 함수를 생성하기 위한 단계를 살펴보겠습니다:

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

- 단기 및 장기 이동평균 값 계산: 단기(빠른) 및 장기(느린) 단순 이동평균(SMA)을 계산하는 함수를 생성하세요.
- 거래 신호 생성: 단기와 장기 이동평균 값을 비교하여 매수 및 매도 신호를 생성하는 함수를 개발하세요.
- 시간에 따른 자본 계산: 생성된 신호를 기반으로 자본을 계산하는 유틸리티 함수를 구현하세요.
- 결과 시각화: 주식의 시계열 데이터와 진입 및 퇴출 신호를 함께 그리는 함수를 작성하세요.

```js
def load_ticker_time_series(ticker, start_date, end_date):
    """
    Yahoo Finance API에서 시간 시리즈 금융 데이터를 검색하고 캐시합니다.
    매개변수:
    - ticker (str): 주식 티커 심볼 (예: 애플의 경우 'AAPL').
    - start_date (str): 데이터 검색을 위한 'YYYY-MM-DD' 형식의 시작 날짜.
    - end_date (str): 데이터 검색을 위한 'YYYY-MM-DD' 형식의 종료 날짜.
    반환값:
    - df (pandas.DataFrame): 금융 시계열 데이터를 포함하는 DataFrame."""
    dir_path = './data'
    cached_file_path = f'{dir_path}/{ticker}_{start_date}_{end_date}.pkl'
    try:
        if os.path.exists(cached_file_path):
            df = pd.read_pickle(cached_file_path)
        else:
            df = yf.download(ticker, start=start_date, end=end_date)
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
            df.to_pickle(cached_file_path)
    except FileNotFoundError:
        print(
            f'주식: {ticker}에 대한 파일을 다운로드 및 캐시하는 중 오류가 발생했습니다.')
    return df

def calculate_profit(signals, prices):
    """
    거래 신호와 주식 가격을 기반으로 누적 수익을 계산합니다.
    매개변수:
    - signals (pandas.DataFrame): 거래 신호를 포함하는 DataFrame (매수: 1, 매도: -1).
    - prices (pandas.Series): 신호 날짜에 해당하는 주식 가격을 포함하는 Series.
    반환값:
    - cum_profit (pandas.Series): 시간에 따른 누적 수익을 포함하는 Series.
    """
    profit = pd.DataFrame(index=prices.index)
    profit['profit'] = 0.0
    buys = signals[signals['orders'] == 1].index
    sells = signals[signals['orders'] == -1].index
    while sells[0] < buys[0]:
        # 롱 포지션 전용 전략입니다. 판매로 시작할 수 없습니다.
        sells = sells[1:]
    if len(buys) == 0 or len(sells) == 0:
        # 아무 조치도 취하지 않았습니다.
        return profit
    if len(sells) < len(buys):
        # 마지막에 판매하는 것으로 가정합니다.
        sells = sells.append(pd.Index(prices.tail(1).index))
    buy_prices = prices.loc[buys]
    sell_prices = prices.loc[sells]
    profit.loc[sells, 'profit'] = sell_prices.values - buy_prices.values
    profit['profit'] = profit['profit'].fillna(0)
    # 누적 수익 생성
    profit['cum_profit'] = profit['profit'].cumsum()
    return profit['cum_profit']

def plot_strategy(prices_df, signal_df, profit):
    """
    매수 및 매도 신호 및 누적 수익을 포함하는 거래 전략을 시각화합니다.
    매개변수:
    - prices (pandas.Series): 주식 가격을 포함하는 Series.
    - signals (pandas.DataFrame): 매수(1) 및 매도(-1) 신호를 포함하는 DataFrame.
    - profit (pandas.Series): 시간에 따른 누적 수익을 포함하는 Series.
    반환값:
    - ax1 (matplotlib.axes.Axes): 주식 가격과 신호를 표시하는 상단 서브플롯.
    - ax2 (matplotlib.axes.Axes): 누적 수익을 표시하는 하단 서브플롯.
    """
    fig, (ax1, ax2) = plt.subplots(2, 1, gridspec_kw={'height_ratios': (3, 1)},
                                   figsize=(18, 12))
    ax1.set_xlabel('날짜')
    ax1.set_ylabel('달러 단위의 가격')
    ax1.plot(prices_df.index, prices_df, color='g', lw=0.25)
    # 매수 및 매도 신호를 플롯합니다.
    ax1.plot(signal_df.loc[signal_df.orders == 1.0].index,
             prices_df[signal_df.orders == 1.0],
             '^', markersize=12, color='blue', label='매수')
    ax1.plot(signal_df.loc[signal_df.orders == -1.0].index,
             prices_df[signal_df.orders == -1.0],
             'v', markersize=12, color='red', label='매도')
    ax2.plot(profit.index, profit, color='b')
    ax2.set_ylabel('누적 수익 (%)')
    ax2.set_xlabel('날짜')
    return ax1, ax2
```

모두를 결합합시다

```js
aapl_ts_df = load_ticker_ts_df('AAPL',
                               start_date='2021-01-01',
                               end_date='2023-01-01')
signal_df = double_simple_moving_average_signals(aapl_ts_df, 5, 30)
profit_series = calculate_profit(signal_df, aapl_ts_df["Adj Close"])
ax1, ax2 = plot_strategy(aapl_ts_df["Adj Close"], signal_df, profit_series)

# 단기 및 장기 이동평균 추가
ax1.plot(signal_df.index, signal_df['short_mavg'],
         linestyle='--', label='빠른 SMA')
ax1.plot(signal_df.index, signal_df['long_mavg'],
         linestyle='--', label='느린 SMA')
ax1.legend(loc='upper left', fontsize=10)
plt.show()
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


![Strategy](/TIL/assets/img/2024-07-13-BuildingAMomentumandReversionTradingStrategyWithPython_0.png)

지난 2년 동안 이 전략은 30%의 수익을 창출했습니다. 최근 S&P 500의 10%의 수익과 비교했을 때, 강력한 전략으로 보입니다.

## 단순 관성 전략

이 전략은 가격 상승 또는 하락의 빈도에 기초합니다. 연속된 일정 기간 동안 가격이 지속적으로 상승하면 매수 기회를, 하락하면 매도 기회로 간주합니다.


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

이전에 논의 된 간단한 이동 평균 (SMA) 전략에서 일부 유틸리티 함수를 재사용할 것입니다.

다음은이 전략의 기본 버전을 구현하는 코드입니다:

```js
def naive_momentum_signals(ticker_ts_df, nb_conseq_days=2):
    """
    연이은 양수 또는 음수 가격 변동에 기반한 소박한 모멘텀 트레이딩 신호를 생성합니다.
    매개변수:
    - ticker_ts_df (pandas.DataFrame): 과거 주식 데이터가 포함 된 DataFrame입니다.
    - nb_conseq_days (int): 신호를 트리거 할 연속적 양수 또는 음수 일수입니다.
    반환 값:
    - signals (pandas.DataFrame): 구매 (1) 및 판매 (-1) 신호가 포함 된 'orders' 열이있는 DataFrame입니다.
    """
    signals = pd.DataFrame(index=ticker_ts_df.index)
    signals['orders'] = 0

    price = ticker_ts_df['Adj Close']
    price_diff = price.diff()
    signal = 0
    cons_day = 0
    for i in range(1, len(ticker_ts_df)):
        if price_diff[i] > 0:
            cons_day = cons_day + 1 if price_diff[i] > 0 else 0
            if cons_day == nb_conseq_days and signal != 1:
                signals['orders'].iloc[i] = 1
                signal = 1
        elif price_diff[i] < 0:
            cons_day = cons_day - 1 if price_diff[i] < 0 else 0
            if cons_day == -nb_conseq_days and signal != -1:
                signals['orders'].iloc[i] = -1
                signal = -1
    return signals

signal_df = naive_momentum_signals(aapl_ts_df)
profit_series = calculate_profit(signal_df, aapl_ts_df["Adj Close"])
ax1, _ = plot_strategy(aapl_ts_df["Adj Close"], signal_df, profit_series)
ax1.legend(loc='upper left', fontsize=10)
plt.show()
```

<img src="/TIL/assets/img/2024-07-13-BuildingAMomentumandReversionTradingStrategyWithPython_1.png" />

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

안타깝지만, 이 전략은 수익을 창출하지 않았고 수익을 얻지 못했습니다.

그러나 모델을 단순히 반전시킴으로써 더 나은 성과를 거둘 수도 있었을 것입니다 (이 기법은 WallStreetBets의 주식 분석에 많이 제안된 방법 중 하나입니다). 이를 위해 거래 신호를 -1로 곱하면 됩니다. 이 반전 접근법은 전략의 원래 신호가 효과적이지 않을 때 일반적으로 효과적입니다.

솔직히 말해서, 이 전략은 일반적으로 개별 상품이 아닌 더 넓은 시장에 적용되며 더 짧은 시간대에 구현됩니다.

# 회귀 전략

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

예를 들어, 일론 머스크가 테슬라에 블록체인을 통합할 것이라는 트윗을 올리면, 테슬라 주식에 과도한 매수 열풍이 불고 있을 것입니다. 그러나 다음 날에는 투자자들이 아무런 근본적인 변화가 없다는 것을 깨닫고 시장이 관심을 잃으면, 가격은 더 합리적인 수준으로 회귀할 것입니다.

따라서 어떤 상품이나 도구가 어느 방향으로든 표준 지수에서 너무 빠르게 벗어날 경우, 결국 오랜 기간에 걸쳐 표준 지수로 돌아가게 될 것입니다.

트렌드와 모멘텀 전략과 유사하게, 회귀 전략은 시장 역학을 간소화하고 시장 참가자들이 일반적으로 사용하는 전략입니다.

# 평균 회귀

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

평균 회귀 전략에서는 주식 가격이 시간이 지남에 따라 평균값 또는 평균값에 가까워질 것이라는 가정 하에 운영합니다.

아래는 이 전략을 구현하는 신호 코드입니다:

```js
def mean_reversion_signals(ticker_ts_df, entry_threshold=1.0, exit_threshold=0.5):
    """
    이동 평균과 임계값을 기반으로 한 평균 회귀 트레이딩 신호 생성.
    매개변수:
    - ticker_ts_df (pandas.DataFrame): 주식의 역사적 데이터가 포함된 DataFrame.
    - entry_threshold (float): 표준 편차의 배수로 표시된 진입 임계값.
    - exit_threshold (float): 표준 편차의 배수로 표시된 종료 임계값.
    반환:
    - signals (pandas.DataFrame): 'orders' 열을 포함한 Buy(1) 및 Sell(-1) 신호가 포함된 DataFrame.
    """
    signals = pd.DataFrame(index=ticker_ts_df.index)
    signals['mean'] = ticker_ts_df['Adj Close'].rolling(
        window=20).mean()  # 필요한대로 창 크기 조정
    signals['std'] = ticker_ts_df['Adj Close'].rolling(
        window=20).std()  # 필요한대로 창 크기 조정
    signals['signal'] = np.where(ticker_ts_df['Adj Close'] > (
        signals['mean'] + entry_threshold * signals['std']), 1, 0)
    signals['signal'] = np.where(ticker_ts_df['Adj Close'] < (
        signals['mean'] - exit_threshold * signals['std']), -1, 0)
    signals['orders'] = signals['signal'].diff()
    signals.loc[signals['orders'] == 0, 'orders'] = None

    return signals
```

이 함수에서는 주식 가격 데이터의 표준 편차와 평균을 결정합니다.

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

가격이 평균에서 일정 표준 편차 수로 벗어날 때 신호가 생성됩니다.

이전에 만든 함수를 사용하여 함께 테스트해보겠습니다:

```js
signal_df = mean_reversion_signals(aapl_ts_df)
profit_series = calculate_profit(signal_df, aapl_ts_df["Adj Close"])
ax1, _ = plot_strategy(aapl_ts_df["Adj Close"], signal_df, profit_series)

ax1.plot(signal_df.index, signal_df['mean'], linestyle='--', label="평균")
ax1.plot(signal_df.index, signal_df['mean'] +
         signal_df['std'], linestyle='--', label="상한 표준편차")
ax1.plot(signal_df.index, signal_df['mean'] -
         signal_df['std'], linestyle='--', label="하한 표준편차")
ax1.legend(loc='upper left', fontsize=10)
plt.show()
```

<img src="/TIL/assets/img/2024-07-13-BuildingAMomentumandReversionTradingStrategyWithPython_2.png" />

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

종이 상으로 10%의 수익률은 만족스럽게 보일 수 있지만, 실제로는 넓은 S&P 500 지수 펀드에 투자함으로써 유사한 결과를 달성할 수 있습니다.

앞으로의 글에서는 Pair-Trading과 통계적 화폐 섹터에 속한 보다 정교한 형태의 복귀 전략을 탐구할 것입니다. 또한 전략 지표인 Sharpe 비율과 같은 전략 평가를 돕는 지표들을 살펴볼 것입니다. 이 분석을 통해 우리는 S&P 500 지수의 수익률에 맞게 하는 이 전략이 왜 약한 것으로 여겨지는지를 이해할 수 있을 것입니다.

저의 추천 링크를 통해 Tradingview 구독비를 최대 100% 할인받을 수 있습니다. 해당 링크에 접속하면 페이지 상단 왼쪽에 있는 Tradingview 아이콘을 클릭하여 원하는 무료 요금제로 이동하세요.

➡️여기에서 제 구독하기 ➡️ https://medium.com/@aamurtazin/subscribe

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

내가 곧 올릴 블로그에서 많은 내용을 공유할 거야.