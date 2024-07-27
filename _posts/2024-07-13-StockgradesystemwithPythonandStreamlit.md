---
title: "Python과 Streamlit으로 주식 등급 시스템 만들기"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_0.png"
date: 2024-07-13 19:13
ogImage: 
  url: /TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_0.png
tag: Tech
originalTitle: "Stock grade system with Python and Streamlit."
link: "https://medium.com/@avetik.babayan/stock-grade-system-with-python-and-streamlit-7a65331971b1"
---


![링크](/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_0.png)

주식 시장에 투자하고 싶다니 멋지네요. 어떤 것을 선택하시겠습니까? 투자에 좋은 것과 그렇지 않은 것을 어떻게 정의하겠습니까? 현재 주식 분류를 이해하기 위해 등급 시스템 또는 평가 시스템이 필요할 것입니다. 지금 개발된 해당 시스템의 한 예시를 살펴보죠.

수천 가지의 주식 중에서 선택해야 하는데, 각각이 갖는 메트릭 및 성과 지표가 모두 다르기 때문에, 최상의 투자 기회를 식별하기 위해서는 견고한 분석과 정보에 기반한 의사 결정이 필요합니다. 초보자든 전문가든, 방대한 양의 데이터를 탐색하고 유망한 주식을 강조해 주는 신뢰할 수 있는 도구가 있으면 매우 가치 있을 것입니다.

이 글에서는 기술적 및 기본적 지표를 활용하여 주식을 평가하는 파이썬 기반의 투자 분석 도구를 개발하는 과정을 안내하겠습니다. 이 도구는 장기 투자 가능성을 식별하는 데 도움을 주는 뿐만 아니라 단기 거래 기회를 찾아내도록 돕습니다. 이 안내서를 따라가면, 로컬 머신에서 실행할 수 있는 강력한 스크립트를 보유하게 되며, Streamlit을 사용하여 직관적인 대시보드에 결과를 표시할 수 있습니다.

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

저희는 분석의 기반이 되는 점수 체계를 설명하여 다양한 지표가 각 주식의 잠재력을 평가하는 데 어떻게 사용되는지 자세히 설명하겠습니다. 이 시스템을 이해하는 것은 매우 중요합니다. 왜냐하면 이는 저희 도구의 기초를 형성하고 의사 결정 프로세스를 안내하기 때문입니다. 이제 각 주식의 점수 평가 방법과 해당 점수의 의미에 대해 구체적으로 살펴보겠습니다.

# 점수 체계 설명

점수 체계는 기술적 지표와 기본적 지표를 결합하여 각 주식의 잠재력을 평가하는 데 사용됩니다. 단기적 가격 변동과 장기적 재무 건강 상태를 고려함으로써 서로 다른 투자 전략에 부합하는 균형 잡힌 평가를 도출할 수 있습니다.

기술적 분석은 주식의 가격 움직임과 패턴에 초점을 맞춥니다. 여기서 우리는 두 가지 주요 지표를 사용합니다: 50일 이동평균선(MA)과 상대강도지수(RSI). 주식의 종가가 50일 이동평균선 위에 있는 경우 상승 추세를 나타내므로 해당 주식은 한 점을 받게 됩니다. 또한 RSI가 70 미만인 경우, 해당 주식이 과매수 상태가 아니며 성장할 공간이 있다는 것을 시사하므로 또 한 점을 받게 됩니다.

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

근본적 분석은 회사의 재정 건강 상태를 검토합니다. 우리는 순조 적받지 못한 (P/E) 비율과 부채 대 자본 비율을 살펴봅니다. 20 미만의 순조 P/E 비율은 주식에 1 점을 부여합니다. 이것은 주식이 미래 수익에 비해 저평가될 가능성이 있음을 나타냅니다. 마찬가지로, 1 미만의 부채 대 자본 비율은 회사가 처리 가능한 부채 수준을 갖고 있음을 시사하며, 또 다른 한 점을 획득합니다.

이러한 지표를 결합하여, 점수 체계는 각 주식에 대해 1에서 4 사이의 등급을 지정합니다. 1의 점수는 최소한의 잠재력을 나타내고, 4의 점수는 우수한 잠재력을 나타냅니다. 이 이중 접근법을 통해 우리는 즉시의 시장 심리와 회사의 기본적인 재정 안정성을 동시에 포착하여, 각 주식의 투자 전망에 대해 잘 둘러싼 견해를 제공합니다.

내가 아는 바로는 주식 신뢰도를 이해하는 데 도움이 되는 여러 지표들이 있습니다. 물론, 이 기사는 참된 지표 범위를 보여주는 유일한 것은 아닙니다. 결국, 이것은 실전을 연습하고, 훨씬 더 많은 지표 및 KPI와 함께 나중에 직접 개발한 시스템을 가지기 위한 연습입니다. 아마도 보다 유연하고 맞춤 설정할 수 있을 것입니다. 그러나 다음 빌드의 기초를 마련합시다.

![StockgradesystemwithPythonandStreamlit_1](/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_1.png)

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

# 필요한 도구들

이 투자 분석 도구를 구축하고 실행하기 위해, 우리는 몇 가지 강력한 Python 라이브러리를 활용할 것입니다. 우리가 사용할 주요 라이브러리는 yfinance, pandas, 그리고 streamlit입니다. 이 도구들 각각은 데이터 수집부터 시각화까지 우리 분석의 다양한 부분에서 중요한 역할을 합니다.

yfinance는 인기 있는 라이브러리로, 우리에게 Yahoo Finance로부터 직접적으로 과거의 시장 데이터를 가져올 수 있는 기회를 제공합니다. 이는 주식 가격 기록, 재무 제표, 그리고 다른 중요한 지표에 쉬운 접근을 제공하여 기술적 및 기본적 분석에 꼭 필요한 자원이 됩니다. yfinance를 사용하여 우리는 각 주식을 평가하는 데 필요한 데이터를 프로그래밍적으로 수집할 수 있습니다.

pandas는 다재다능한 데이터 조작 라이브러리로, 우리가 가져온 데이터를 처리하고 분석하는 데 도움이 될 것입니다. pandas를 사용하면 대규모 데이터 세트를 쉽게 처리하고 기술 지표를 계산하며 점수화 프로세스를 관리할 수 있습니다. 강력한 DataFrame 구조를 통해 복잡한 데이터 작업을 간단히 수행할 수 있어 분석이 효율적이고 정확하도록 보장합니다.

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

streamlit은 Python 스크립트에서 직접 인터랙티브 웹 애플리케이션을 만드는 혁신적인 라이브러리입니다. Streamlit을 사용하면 사용자 친화적인 대시보드를 구축하여 투자 제안을 표시할 수 있습니다. 이를 통해 우리는 분석 결과를 명확하고 직관적인 방식으로 시각화하고 데이터를 해석하고 통찰력 있는 결정을 내릴 수 있게 됩니다.

# 모니터링할 메트릭스

우리의 분석에서는 4가지 주요 메트릭스에 집중할 것입니다: 50일 이동평균선(MA), 상대 강도 지수(RSI), 전방 P/E 비율, 그리고 부채 비율입니다. 각 메트릭스는 해당 주식의 성과와 재무 건강 상태에 대한 유용한 통찰을 제공합니다.

50일 이동평균선(MA): 50일 이동평균선은 일별 가격 변동을 완화하여 기본 트렌드를 드러내는 기술적 지표입니다. 주식의 현재 종가를 50일 이동평균선과 비교함으로써 주식이 상승 트렌드인지 하향 트렌드인지 판단할 수 있습니다. 이동평균선 위의 가격은 상승 흐름을 나타내며 성장 잠재력이 있다는 것을 시사합니다.

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

상대강도지수 (RSI): RSI는 주식의 가격 움직임 속도와 변화를 측정하는 모멘텀 오실레이터입니다. 값은 0부터 100까지이며, 70 이상의 값은 주식이 과매수 상태에 있을 수 있음을 나타내고, 30 미만의 값은 과매도 상태일 수 있음을 시사합니다. RSI 추적을 통해 주식이 추세 반전을 겪을지 또는 현재 추세를 이어갈지에 대한 판단을 할 수 있습니다.

정방향 주가 이익 비율 (P/E Ratio): 정방향 P/E 비율은 현재 주가를 예상된 미래 주당 순이익과 비교합니다. 낮은 정방향 P/E 비율은 주식이 미래 수익 잠재력에 비해 저평가되어 있을 수 있다는 것을 나타낼 수 있어 투자 가능성이 있는 기회로 여겨질 수 있습니다. 이 지표를 통해 주식의 가치 평가와 성장 가능성을 평가할 수 있습니다.

부채-자본 비율: 이 기본적인 지표는 기업의 총 부채를 지분 자본과 비교합니다. 낮은 부채-자본 비율은 기업이 빌린 자금에 대한 의존도가 낮고 부채를 관리할 재정적 여력이 있는 것을 시사합니다. 이 비율을 분석함으로써 기업의 재정 안정성과 위험을 평가할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_2.png)

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

# 코드 시작하기

투자 분석 도구를 만들기 위해, 논리적으로 섹션화된 파이썬 스크립트를 작성할 것입니다. 각 섹션은 데이터 수집, 분석 및 시각화의 다른 측면을 다룰 것입니다. 선호하는 파이썬 IDE에서 investment_analysis.py라는 새로운 파이썬 파일을 생성하는 것부터 시작해봅시다.

- 우선, import부터 시작해보겠습니다

```python
import yfinance as yf
import pandas as pd
import time
import datetime
import os
import streamlit as st
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

yfinance: Yahoo Finance에서 주식 시장 데이터를 가져 오는 데 사용됩니다
pandas: 데이터 조작 및 분석에 사용됩니다
time: API 요청 간의 지연을 추가하여 요율 제한을 피하기위해 사용됩니다.
datetime: 날짜 조작에 사용됩니다
os: 파일 작업을 처리하는 데 사용됩니다.
streamlit: 결과를 표시하는 대화형 웹 대시 보드를 만드는 데 사용됩니다.

2. Get and count: 주식 정보 가져 오기 및 기술 지표 계산

```js
# 지난 5 일간의 주식 가격 데이터를 가져 오기위한 함수
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="5d")  # 현재 및 이전 거래일을 포함하는 지난 5 일간의 데이터만 가져옵니다
    if hist.empty:
        raise ValueError(f"{ticker} 에 대한 데이터를 찾을 수 없습니다.")
    return hist

# 50일 이동 평균을 계산하는 함수
def calculate_moving_average(data, window):
    data[f"MA_{window}"] = data['Close'].rolling(window=window).mean()
    return data

# 상대 강도 지수(RSI)를 계산하는 함수
def calculate_rsi(data, window=14):
    delta = data['Close'].diff(1)
    gain = delta.mask(delta < 0, 0)
    loss = -delta.mask(delta > 0, 0)
    avg_gain = gain.rolling(window=window).mean()
    avg_loss = loss.rolling(window=window).mean()
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    data[f"RSI_{window}"] = rsi
    return data
```

get_stock_data: Yahoo Finance에서 지난 5 일간의 주식 가격 데이터를 가져 옴
calculate_moving_average: 지정된 창 기간(이 경우 50 일) 동안 종가의 이동 평균을 계산
calculate_rsi: 가격 움직임의 속도와 변화를 측정하는 모멘텀 오실레이터 인 RSI를 계산

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

3. 기초 지식 습득

```js
# 기초 데이터를 가져오는 함수
def get_fundamentals(ticker):
    stock = yf.Ticker(ticker)
    fundamentals = stock.info
    return fundamentals
```

여기서 AAPL 주식에 대한 기초 데이터 범위를 얻고, 추가적인 필터링을 위해 준비해 봅시다.

4. 시작점을 정해봅시다!

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
# 기술 및 기본 분석에 기반한 주식 평가 함수
def score_stock(data, fundamentals):
    score = 0
    # 기술적 분석
    if data['Close'].iloc[-1] > data['MA_50'].iloc[-1]:
        score += 1
    if data['RSI_14'].iloc[-1] < 70:
        score += 1
    # 기초분석 및 오류 처리
    try:
        if fundamentals.get('forwardPE', None) is not None and fundamentals['forwardPE'] < 20:
            score += 1
        if fundamentals.get('debtToEquity', None) is not None and fundamentals['debtToEquity'] < 1:
            score += 1
    except KeyError as e:
        print(f"Key error: {e}")
    return score
```

score_stock: 주식을 점수화하며, 종가가 50일 이동평균(MA_50)을 초과하고 RSI가 70보다 낮으며, 순방향 P/E 비율이 20 미만이거나 부채 비율이 1 미만인 경우 1을 추가하여 주식에 대한 점수를 매깁니다. 이것이 주식에 대한 점수를 평가하는 척도가 됩니다.

5. 이렇게 분석하고, 저렇게 분석하고, 주식을 분석합니다.

```js
def analyze_stock(ticker):
    try:
        data = get_stock_data(ticker)
        data = calculate_moving_average(data, 50)
        data = calculate_rsi(data)
        fundamentals = get_fundamentals(ticker)
        score = score_stock(data, fundamentals)
        return data, fundamentals, score
    except (IndexError, ValueError) as e:
        print(f"Skipping {ticker} due to error: {e}")
        return None, None, None
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

analyze_stock: 주가 분석을 위해 과거 데이터를 가져오고 기술적 지표를 계산하며 기본 데이터를 가져와서 주식에 점수를 매깁니다. 오류가 발생하면 해당 주식은 건너뜁니다.

6. 상당한 가치평가.

```js
# 분석된 주식에 기반하여 투자 제안하는 기능
def suggest_investments(tickers):
    suggestions = []
    for ticker in tickers:
        data, fundamentals, score = analyze_stock(ticker)
        if data is not None and fundamentals is not None:
            suggestions.append((ticker, score, data['Close'].iloc[-1], str(datetime.date.today())))
        time.sleep(0.25)  # HTTP 429 오류를 피하기 위해 지연 추가
    suggestions.sort(key=lambda x: x[1], reverse=True)
    save_suggestions(suggestions)
    return suggestions

# 제안을 CSV 파일에 저장하는 기능
def save_suggestions(suggestions):
    df = pd.DataFrame(suggestions, columns=['Ticker', 'Score', 'Price', 'Date'])
    df.to_csv('suggestions.csv', mode='a', header=not os.path.exists('suggestions.csv'), index=False)

def get_stock_list():
    # 해당 예시에서는 S&P 500 리스트를 사용하였으나 다른 소스를 사용할 수 있음
    sp500 = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
    return sp500['Symbol'].tolist()
```

suggest_investments: 주식의 점수를 기준으로 투자할 주식을 제안하며 요청 사이에 지연을 추가하고 제안을 CSV 파일에 저장합니다.
save_suggestions: 미래 참고를 위해 제안을 CSV 파일에 저장합니다.
get_stock_list: S&P500에 포함된 주식 목록을 가져옵니다.

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

7. 우리가 가진 내용을 보여줍시다.

```js
def display_dashboard(suggestions):
    st.title("투자 제안 대시보드")
    for ticker, score, price, date in suggestions:
        color = "green" if score >= 3 else "red"
        st.markdown(f"<div style='color:{color}'>티커: {ticker}, 점수: {score}, 가격: {price}, 날짜: {date}</div>", unsafe_allow_html=True)

# 단기 분석을 수행하는 함수
def short_term_analysis(tickers):
    short_term_suggestions = []
    for ticker in tickers:
        data, fundamentals, score = analyze_stock(ticker)
        if data is not None and fundamentals is not None and data['RSI_14'].iloc[-1] < 30:  # 단기 기회를 위한 예시 기준
            short_term_suggestions.append((ticker, score, data['Close'].iloc[-1], str(datetime.date.today()))
        time.sleep(0.25)  # HTTP 429 오류를 피하기 위한 지연 추가
    short_term_suggestions.sort(key=lambda x: x[1], reverse=True)
    save_suggestions(short_term_suggestions)
    return short_term_suggestions

# 지난 제안 성과를 평가하는 함수
def evaluate_performance():
    df = pd.read_csv('suggestions.csv')
    df['평가_날짜'] = pd.to_datetime(df['Date']) + pd.DateOffset(weeks=1)  # 1주 후 평가
    evaluation_results = []
    
    for index, row in df.iterrows():
        ticker = row['Ticker']
        initial_price = row['Price']
        evaluation_date = row['평가_날짜']
        
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(start=str(evaluation_date), end=str(evaluation_date + pd.DateOffset(days=1)))
            final_price = hist['Close'][0]
            price_change = (final_price - initial_price) / initial_price * 100
            evaluation_results.append((ticker, row['Date'], initial_price, final_price, price_change))
        except IndexError:
            # 평가 일자에 데이터가 없는 경우 처리
            evaluation_results.append((ticker, row['Date'], initial_price, None, None))
    
    eval_df = pd.DataFrame(evaluation_results, columns=['티커', '제안_날짜', '초기_가격', '최종_가격', '가격_변화 (%)'])
    eval_df.to_csv('evaluation_results.csv', index=False)
```

display_dashboard: 색상으로 구분된 점수를 사용하여 투자 제안을 Streamlit 대시보드에 표시합니다.
short_term_analysis: RSI 및 기타 기준에 기반하여 단기 투자 기회를 식별합니다.
evaluate_performance: 초기 및 최종 가격을 비교하여 지난 투자 제안의 성과를 평가합니다.

8. 작동하도록 만들기 — 스크립트 실행

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
if __name__ == "__main__":
    try:
        # 주식 분석을 위한 티커 목록 정의
        tickers = get_stock_list()
        
        # 투자 제안서 가져오기
        suggestions = suggest_investments(tickers)
        display_dashboard(suggestions)

        # 단기 투자 제안
        short_term_suggestions = short_term_analysis(tickers)
        st.title("단기 투자 제안")
        display_dashboard(short_term_suggestions)

        # 과거 제안의 성능 평가
        evaluate_performance()
        evaluation_results_df = pd.read_csv('evaluation_results.csv')
        st.title("평가 결과")
        st.write(evaluation_results_df)
        
    except KeyboardInterrupt:
        st.write("사용자에 의해 스크립트가 중단되었습니다.")
```

마지막으로, 주식 티커 가져오기, 투자 제안, 대시보드 표시 및 성능 평가를 포함한 주요 실행 흐름을 정의합니다.
사용자에 의해 스크립트가 중단된 경우, 중단을 우아하게 처리하고 메시지를 표시합니다.
평가 방식:

- 3 또는 4점: 강력한 잠재성이 있음을 나타냅니다. 이러한 주식은 대부분의 기준을 충족하며 좋은 선택지로 간주됩니다.
- 2점: 중간적인 잠재성이 있음을 나타냅니다. 이러한 주식은 일부 기준을 충족하지만 일부 리스크나 약한 지표가 있을 수 있습니다.
- 1점: 최소한의 잠재성이 있음을 나타냅니다. 이러한 주식은 매우 적은 기준을 충족하며 상당한 리스크가 있을 수 있습니다.
- 0점: 우리의 기준에 따라 잠재성이 없음을 나타냅니다. 이러한 주식은 주요 지표 중 어떤 것도 충족하지 않습니다.

이제 다음 명령으로 실행해봅시다.

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
streamlit run .\test.py
```

![Image](/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_3.png)

결과를 확인하세요:

![Image](/TIL/assets/img/2024-07-13-StockgradesystemwithPythonandStreamlit_4.png)


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

7월 12일 2024일의 경우, 우리의 기준에 맞는 주식이 없어요: SP500의 주식 중에는 아무런 높은 등급의 주식이 존재하지 않아요.

다음에 무엇을 할 수 있을까요?

- 기술지표 조정: RSI나 이동평균에 대해 다양한 임계값을 고려해보세요. 예를 들어, 200일 이동평균을 사용하는 것이 더 나은 신호를 제공할 수도 있습니다.
- 추가 지표 통합: 수익 성장률, 배당 수익률 또는 다른 기술적 패턴과 같은 더 많은 기본적 또는 기술적 지표를 분석에 추가하세요.
- 평가: 주식의 성능을 분석하고 실제 재무 결과를 바탕으로 주식을 등급화하여 점수를 매기기 위해 현실적인 등급 시스템을 갖도록 하세요.

일반적인 코드…

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
import yfinance as yf
import pandas as pd
import time
import datetime
import os
import streamlit as st

def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="5d")  
    if hist.empty:
        raise ValueError(f"{ticker}에 대한 데이터를 찾을 수 없습니다.")
    return hist

def calculate_moving_average(data, window):
    data[f"MA_{window}"] = data['Close'].rolling(window=window).mean()
    return data

def calculate_rsi(data, window=14):
    delta = data['Close'].diff(1)
    gain = delta.mask(delta < 0, 0)
    loss = -delta.mask(delta > 0, 0)
    avg_gain = gain.rolling(window=window).mean()
    avg_loss = loss.rolling(window=window).mean()
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    data[f"RSI_{window}"] = rsi
    return data

def get_fundamentals(ticker):
    stock = yf.Ticker(ticker)
    fundamentals = stock.info
    return fundamentals

def score_stock(data, fundamentals):
    score = 0
    if data['Close'].iloc[-1] > data['MA_50'].iloc[-1]:
        score += 1
    if data['RSI_14'].iloc[-1] < 70:
        score += 1
    try:
        if fundamentals.get('forwardPE', None) is not None and fundamentals['forwardPE'] < 20:
            score += 1
        if fundamentals.get('debtToEquity', None) is not None and fundamentals['debtToEquity'] < 1:
            score += 1
    except KeyError as e:
        print(f"Key error: {e}")
    return score

def analyze_stock(ticker):
    try:
        data = get_stock_data(ticker)
        data = calculate_moving_average(data, 50)
        data = calculate_rsi(data)
        fundamentals = get_fundamentals(ticker)
        score = score_stock(data, fundamentals)
        return data, fundamentals, score
    except (IndexError, ValueError) as e:
        print(f"{ticker}을(를) 분석하는 도중 오류가 발생했습니다: {e}")
        return None, None, None

def suggest_investments(tickers):
    suggestions = []
    for ticker in tickers:
        data, fundamentals, score = analyze_stock(ticker)
        if data is not None and fundamentals is not None:
            suggestions.append((ticker, score, data['Close'].iloc[-1], str(datetime.date.today())))
        time.sleep(0.25)   
    suggestions.sort(key=lambda x: x[1], reverse=True)
    save_suggestions(suggestions)
    return suggestions

def save_suggestions(suggestions):
    df = pd.DataFrame(suggestions, columns=['주식 코드', '점수', '가격', '날짜'])
    df.to_csv('suggestions.csv', mode='a', header=not os.path.exists('suggestions.csv'), index=False)

def get_stock_list():
    sp500 = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
    return sp500['Symbol'].tolist()

def display_dashboard(suggestions):
    st.title("투자 제안 대시보드")
    for ticker, score, price, date in suggestions:
        color = "green" if score >= 3 else "red"
        st.markdown(f"<div style='color:{color}'>주식 코드: {ticker}, 점수: {score}, 가격: {price}, 날짜: {date}</div>", unsafe_allow_html=True)

def short_term_analysis(tickers):
    short_term_suggestions = []
    for ticker in tickers:
        data, fundamentals, score = analyze_stock(ticker)
        if data is not None and fundamentals is not None and data['RSI_14'].iloc[-1] < 30:  # 단기 기회 조건 예시
            short_term_suggestions.append((ticker, score, data['Close'].iloc[-1], str(datetime.date.today())))
        time.sleep(0.25)   
    short_term_suggestions.sort(key=lambda x: x[1], reverse=True)
    save_suggestions(short_term_suggestions)
    return short_term_suggestions

def evaluate_performance():
    df = pd.read_csv('suggestions.csv')
    df['평가 날짜'] = pd.to_datetime(df['날짜']) + pd.DateOffset(weeks=1)  # 1주 후에 평가
    evaluation_results = []
    
    for index, row in df.iterrows():
        ticker = row['주식 코드']
        initial_price = row['가격']
        evaluation_date = row['평가 날짜']
        
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(start=str(evaluation_date), end=str(evaluation_date + pd.DateOffset(days=1)))
            final_price = hist['Close'][0]
            price_change = (final_price - initial_price) / initial_price * 100
            evaluation_results.append((ticker, row['날짜'], initial_price, final_price, price_change))
        except IndexError:
            # 평가 날짜에 데이터가 없는 경우 처리
            evaluation_results.append((ticker, row['날짜'], initial_price, None, None))
    
    eval_df = pd.DataFrame(evaluation_results, columns=['주식 코드', '제안 일자', '초기 가격', '최종 가격', '가격 변동 (%)'])
    eval_df.to_csv('evaluation_results.csv', index=False)

if __name__ == "__main__":
    try:
        tickers = get_stock_list()
        
        suggestions = suggest_investments(tickers)
        display_dashboard(suggestions)

        short_term_suggestions = short_term_analysis(tickers)
        st.title("단기 투자 제안")
        display_dashboard(short_term_suggestions)

        evaluate_performance()
        evaluation_results_df = pd.read_csv('evaluation_results.csv')
        st.title("평가 결과")
        st.write(evaluation_results_df)
        
    except KeyboardInterrupt:
        st.write("사용자에 의해 스크립트가 중단되었습니다.")
```

… 그리고 면책 조항.

# 면책 조항

이 글과 함께 제공된 코드는 교육 목적으로만 사용됩니다. 스크립트가 제공하는 제안은 자동 분석의 기능을 보여주기 위한 것이며, 사용자는 제안된 조치를 모니터링하고 시간이 지남에 따라 성공률을 평가해야 합니다. 이 콘텐츠는 행동 요령이 아니며, 재정 자문으로 해석해서는 안 됩니다. 언제든지 본인의 연구를 수행하고 거래 결정을 내리기 전에 전문가와 상의하십시오.

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

# 결론

이러한 단계를 따르면 기술적 및 기본적인 지표를 모두 사용하여 주식을 평가하는 견고한 투자 분석 도구를 만들 수 있습니다. 결과는 인터랙티브 한 Streamlit 대시 보드에 표시되어 분석을 해석하고 조치를 취하기가 쉬워집니다. 즐거운 코딩투자를 하세요!