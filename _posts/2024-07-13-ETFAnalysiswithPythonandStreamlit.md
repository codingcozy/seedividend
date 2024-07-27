---
title: "Python과 Streamlit을 사용한 ETF 분석 방법"
description: ""
coverImage: "/assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_0.png"
date: 2024-07-13 21:16
ogImage: 
  url: /assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_0.png
tag: Tech
originalTitle: "ETF Analysis with Python and Streamlit"
link: "https://medium.com/python-in-plain-english/etf-analysis-with-python-and-streamlit-99bf9cffcc3b"
---


이전에 주식과 비슷한 도전 과제를 함께 해봤죠. 그럼 다른 주식을 포함하는 "주식"은 어떨까요? 함께 살펴봅시다.

![이미지](/assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_0.png)

# 소개

ETF 또는 상장지수펀드는 투자자들 사이에서 인기가 높아지고 있는데, 상장지수펀드는 상호펀드에 비해 다양성, 유동성, 그리고 낮은 비용 비율을 제공하는 능력으로 인해 매우 인기를 모으고 있습니다. 다양한 ETF가 존재하는 가운데, 이를 분석하고 비교할 수 있는 적절한 도구를 갖고 있는 것이 중요합니다. 이 기사에서는 Python(코딩)과 Streamlit(시각화)을 사용하여 견고한 ETF 정보 대시보드를 구축하는 방법을 보여드리겠습니다. 이 인터랙티브 대시보드를 통해 사용자는 ETF를 선택하고 전역 가치, 배당 정보, 기본 및 기술 분석 지표, 그리고 ETF의 상위 10개 구성요소를 포함한 자세한 정보를 볼 수 있습니다.

<div class="content-ad"></div>

# ETF란 무엇인가요?

ETF는 주식 거래소에서 거래되는 투자 펀드로, 개별 주식과 유사합니다. 특정 지수, 섹터, 상품 또는 기타 자산의 성과를 추적하도록 설계되어 있어 투자자에게 여러 개의 개별 주식을 관리하는 복잡성 없이 다양한 포트폴리오에 투자할 수 있는 방법을 제공합니다. ETF에는 주식, 상품 및 채권을 포함한 다양한 종류의 투자가 포함될 수 있습니다. 일반적으로 상호펀드보다 비용 비율이 낮아 경제적인 투자자에게 매력적인 선택지가 됩니다.

# 우리가 하는 일

이 프로젝트에서는 Python 어플리케이션을 개발하여 Streamlit을 사용하여 직관적이고 상호작용 가능한 ETF 정보 대시보드를 만들고자 합니다. 이 대시보드는 투자자가 다양한 ETF에 대한 통찰력을 얻어 정보에 기반한 투자 결정을 내릴 수 있는 종합적인 도구로 작용할 것입니다. Python과 Streamlit의 강력한 기능을 활용하여, 핵심 데이터를 조직화되고 쉽게 소화할 수 있는 방식으로 제공하는 사용자 친화적인 인터페이스를 구축할 수 있습니다.

<div class="content-ad"></div>

대시보드는 사용자가 원하는 ETF를 선택하고 해당 ETF에 대한 다양한 정보에 액세스할 수 있도록 합니다. 대시보드의 주요 기능은 다음과 같습니다:

- 글로벌 값: 이 섹션에는 ETF의 이름, 최신 시장 가격, 52주 최고가 및 최저가, 1년, 3년 및 5년 수익율, 총 자산 및 평균 거래량과 같은 ETF에 대한 기본 정보가 표시됩니다. 이러한 지표는 ETF의 성과와 시장 존재 간략한 개요를 제공합니다.
- 배당 정보: 수입 중심 투자자에게 ETF의 배당 정책을 이해하는 것은 중요합니다. 이 섹션에는 ETF가 배당을 지급하는지 여부와 배당 수익률, 배당 비율, 및 배당무상일과 같은 세부 정보가 포함됩니다. 이 정보는 투자자가 ETF의 소득 생성 잠재력을 파악하는 데 도움이 됩니다.
- 기본 분석 지표: 이 섹션에는 주요 가치 평가 지표인 주가수익비율(P/E), 주당순이익(EPS), 시가총액, 주가순자산비율(P/B), 및 주가매출비율(P/S)과 같은 지표가 제시됩니다. 이러한 지표는 ETF의 기초 자산의 재정 건전성 및 가치평가를 평가하는 데 중요합니다.
- 기술 분석 지표: 기술 분석은 투자 결정을 위해 가격 움직임과 추세를 분석하는 것을 포함합니다. 이 섹션에는 50일 이동평균과 200일 이동평균, 상대강도지수(RSI), 이동평균수렴확산(MACD) 등의 지표가 포함됩니다. 이 지표들은 투자자가 ETF의 가격 모멘텀과 잠재적인 미래 움직임을 이해하는 데 도움이 됩니다.
- 상위 10개 구성요소: ETF의 주요 보유지를 알면 특정 자산이나 부문에 노출됨을 이해할 수 있습니다. 이 섹션에는 ETF의 상위 10개 구성요소가 포트폴리오에서의 비중, 최신 가격 및 최근 가격 변동을 포함한 목록으로 제공됩니다. 이 정보는 투자자가 ETF의 구성 및 위험 프로필을 이해하는 데 도움이 됩니다.

이러한 기능을 결합하여, ETF 정보 대시보드는 각 ETF에 대해 종합적인 정보를 제공하여 초보자나 숙련된 투자자 모두에게 가치 있는 자료원이 될 것입니다. ETF의 성과를 분석하거나 가치를 평가하거나 배당 정책을 이해하기 원하는 경우에도 이 대시보드는 필요한 데이터를 명확하고 간결한 형식으로 제공할 것입니다.

수정된 것은 여기까지, 그럼 이제 시작해 봅시다!...

<div class="content-ad"></div>

# 프로젝트 설정하기

새로운 프로젝트를 만드세요. 가상 환경을 설정하고 활성화하세요.

```js
pyton -m venv venv
venv/scripts/activate
```

프로젝트 환경을 설정하기 위해 필요한 라이브러리와 함께 Python이 설치되어 있는지 확인하세요. 필요한 라이브러리를 다음 명령어를 사용하여 설치할 수 있습니다:

<div class="content-ad"></div>

```js
pip install streamlit yfinance pandas requests
```

# 데이터 가져오기

ETF 및 해당 구성요소에 대한 상세 정보를 가져오기 위해 Yahoo Finance API를 사용할 것입니다. 다음 코드는 데이터를 검색하는 방법을 보여줍니다:

```js
def get_etf_data(etf_name):
    etf = yf.Ticker(etf_name)
    info = etf.info

    # 디버깅: 전체 정보 딕셔너리 출력
    print(info)

    # 최신 가격을 위한 대체 키 확인
    latest_price = info.get('regularMarketPrice') or info.get('regularMarketPreviousClose') or info.get('navPrice') or info.get('lastPrice') or info.get('previousClose')
    if latest_price is None:
        print("ETF에 대한 최신 가격을 찾을 수 없음:", etf_name)
        latest_price = 0

    global_values = {
        "ETF 이름": info.get('shortName', 'N/A'),
        "최신 가격": round(latest_price, 2),
        "52주 최고가": round(info.get('fiftyTwoWeekHigh', 0), 2),
        "52주 최저가": round(info.get('fiftyTwoWeekLow', 0), 2),
        "1년 수익률 %": round(info.get('trailingAnnualReturn', 0) * 100, 2),
        "3년 수익률 %": round(info.get('threeYearAverageReturn', 0) * 100, 2),
        "5년 수익률 %": round(info.get('fiveYearAverageReturn', 0) * 100, 2),
        "총 자산": f"${round(info.get('totalAssets', 0) / 1e9, 2)}B",
        "평균 거래량": f"{info.get('averageVolume', 0):,}"
    }

    dividends = {
        "배당 지급": "예" if info.get('dividendYield', 0) > 0 else "아니요",
        "배당 수익률": f"{round(info.get('dividendYield', 0) * 100, 2)}%",
        "배당 비율": round(info.get('dividendRate', 0), 2),
        "배당 기일": info.get('exDividendDate', 'N/A')
    }

    fundamental_metrics = {
        "P/E 비율": round(info.get('trailingPE', 0), 2),
        "EPS": round(info.get('trailingEps', 0), 2),
        "시가총액": f"${round(info.get('marketCap', 0) / 1e9, 2)}B",
        "주당책가치비율": round(info.get('priceToBook', 0), 2),
        "주당매출비율": round(info.get('priceToSalesTrailing12Months', 0), 2)
    }

    history = etf.history(period="1y")
    technical_metrics = {}
    if len(history) >= 200:
        technical_metrics["50일 이동평균선"] = round(history['Close'].rolling(window=50).mean().iloc[-1], 2)
        technical_metrics["200일 이동평균선"] = round(history['Close'].rolling(window=200).mean().iloc[-1], 2)
        technical_metrics["RSI"] = round(calculate_rsi(history['Close']), 2)
        technical_metrics["MACD"] = round(calculate_macd(history['Close']), 2)
    else:
        technical_metrics["50일 이동평균선"] = "N/A"
        technical_metrics["200일 이동평균선"] = "N/A"
        technical_metrics["RSI"] = "N/A"
        technical_metrics["MACD"] = "N/A"

    return global_values, dividends, fundamental_metrics, technical_metrics

def calculate_rsi(series, period=14):
    delta = series.diff(1)
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(window=period, min_periods=1).mean()
    avg_loss = loss.rolling(window=period, min_periods=1).mean()
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs)).iloc[-1]

def calculate_macd(series, short_period=12, long_period=26, signal_period=9):
    short_ema = series.ewm(span=short_period, adjust=False).mean()
    long_ema = series.ewm(span=long_period, adjust=False).mean()
    macd = short_ema - long_ema
    return macd.iloc[-1]
```

<div class="content-ad"></div>

위 섹션에서는 기술적, 기본적, 배당 정보 및 글로벌 수준 값과 같은 모든 주요 메트릭을 확인했습니다. 데이터를 대시보드에 표시하려면 처리하고 구조화해야 합니다. 이 과정에는 기술적 분석을 위해 RSI 및 MACD와 같은 메트릭을 계산하는 것이 포함되며, 이는 위 섹션에서 이미 수행되었습니다.

ETF에 대한 것은 다 처리했지만 yfinance API에서 주식 구성 요소에 대한 관련 데이터를 제공하지 않습니다. 이를 위해 Financial Modeling Prep API를 사용할 것이며, 이는 등록과 API 키가 필요합니다.

```js
def get_etf_components(etf_list, api_key):
    base_url = "https://financialmodelingprep.com/api/v3/etf-holder/"
    summaries = {}

    for etf in etf_list:
        request_url = f"{base_url}{etf}?apikey={api_key}"
        response = requests.get(request_url)

        if response.status_code == 200:
            data = response.json()
            sorted_data = sorted(data, key=lambda x: x.get('weightPercentage', 0), reverse=True)
            summary = [{"name": comp['asset'], "weight": comp['weightPercentage'] / 100} for comp in sorted_data[:10]]
            summaries[etf] = summary
        else:
            summaries[etf] = f"Error fetching data for {etf}"
    return summaries
```

모든 설정이 완료되었습니다. 메서드는 거의 준비되어 있습니다. 뭘 빼먹었을까요? 분석하려는 ETF 목록 및 해당 ETF 구성 요소의 주식 데이터가 없습니다. 이것도 여기서 채워봅시다.

<div class="content-ad"></div>

```python
def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    history = stock.history(period="5d")  # 최소 2개의 영업일이 있는지 확인하기 위해 지난 5일 동안의 데이터 가져오기

    if len(history) >= 2:
        current_price = history['Close'].iloc[-1]
        prev_price = history['Close'].iloc[-2]
        price_change = (current_price - prev_price) / prev_price * 100
        return round(current_price, 2), round(price_change, 2)
    else:
        return 0, 0


def read_etf_names(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            etf_names = [line.strip() for line in file.readlines()]
        return etf_names
    else:
        st.error("The file etf.txt does not exist.")
        return []

# 이후로는 이미 정리된 준비 작업들을 완료했습니다. 이제 바로 메인 코드를 작성해보죠 — 지금까지의 모든 준비물을 연결하는 주된 부분이랍니다.

def main():
    st.set_page_config(layout="wide")
    st.title("ETF Information Dashboard")

    etf_file_path = "etf.txt"
    etf_names = read_etf_names(etf_file_path)
    api_key = "FMP에서 API 키 받아서 넣으세요"  # 여러분의 API 키를 넣으세요

    etf_name = st.selectbox("ETF 심볼 선택:", etf_names)

    if st.button("ETF 분석하기"):
        global_values, dividends, fundamental_metrics, technical_metrics = get_etf_data(etf_name)

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("글로벌 값")
            global_df = pd.DataFrame(global_values.items(), columns=["메트릭", "값"])
            st.table(global_df)

            st.subheader("배당금 정보")
            dividend_df = pd.DataFrame(dividends.items(), columns=["메트릭", "값"])
            st.table(dividend_df)

        with col2:
            st.subheader("기본 분석 메트릭")
            fundamental_df = pd.DataFrame(fundamental_metrics.items(), columns=["메트릭", "값"])
            st.table(fundamental_df)

            st.subheader("기술적 분석 메트릭")
            technical_df = pd.DataFrame(technical_metrics.items(), columns=["메트릭", "값"])
            st.table(technical_df)

        st.subheader("상위 10개 구성 요소")
        etf_components = get_etf_components([etf_name], api_key)
        components = etf_components.get(etf_name, [])

        if isinstance(components, str):
            st.error(components)
        else:
            for comp in components:
                price, change = get_stock_data(comp['name'])
                comp['최신 가격'] = price
                comp['가격 변동률'] = change

            comp_df = pd.DataFrame(components)
            comp_df['weight'] = comp_df['weight'].apply(lambda x: f"{x:.2}")
            comp_df['최신 가격'] = comp_df['최신 가격'].apply(lambda x: f"${x:.2f}")
            comp_df['가격 변동률'] = comp_df['가격 변동률'].apply(lambda x: f"{x:.2f}%")

            # 인덱스를 1부터 시작하도록 재설정
            comp_df.index = range(1, len(comp_df) + 1)

            def color_price_change(val):
                try:
                    val = float(val.strip('%'))
                    color = 'green' if val > 0 else 'red'
                    return f'color: {color}'
                except:
                    return ''

            styled_comp_df = comp_df.style.applymap(color_price_change, subset=['가격 변동률'])
            st.dataframe(styled_comp_df)
```

<div class="content-ad"></div>

길죠? 조금씩 나눠볼까요?

- 페이지 구성 및 제목 설정: st.set_page_config(layout="wide")는 Streamlit 앱의 레이아웃을 넓게 설정하여 수평 공간을 늘려줍니다. 테이블과 차트를 나란히 표시하는 데 유용합니다. st.title("ETF Information Dashboard")는 대시보드의 주요 제목을 설정하여 페이지 상단에 표시합니다.
- 파일 경로 및 ETF 이름 읽기: etf_file_path는 ETF 심볼이 포함된 텍스트 파일의 경로를 지정하고, etf_names = read_etf_names(etf_file_path)는 지정된 파일에서 ETF 심볼을 read_etf_names 함수를 사용하여 읽습니다.
- API 키: api_key는 Financial Modeling Prep API에서 ETF 구성 요소 데이터를 가져오는 데 필요한 API 키를 보유합니다.
- ETF 선택용 드롭다운: etf_name = st.selectbox("Select ETF symbol:", etf_names)는 사용자가 파일에서 읽은 ETF 이름 목록에서 ETF 심볼을 선택할 수 있는 드롭다운 메뉴를 생성합니다.
- 분석 버튼: st.button("Analyze ETF")을 눌렀는지 확인합니다.
- ETF 데이터 가져오기: 버튼이 클릭되면 global_values, dividends, fundamental_metrics, technical_metrics = get_etf_data(etf_name)가 호출되어 선택된 ETF의 데이터를 가져오고 처리합니다.
- 열 생성: col1, col2 = st.columns(2)은 표시된 데이터의 레이아웃을 조직화하기 위해 두 개의 열을 생성하여 나란히 비교할 수 있게 합니다.

열 1 콘텐츠: col1 내부에서:

- 전역 값: st.subheader("Global Values")는 하위 제목을 설정합니다. global_df = pd.DataFrame(global_values.items(), columns=["Metric", "Value"])는 전역 값 사전에서 DataFrame을 생성하고 st.table(global_df)로 테이블 형식으로 표시합니다.
- 배당 정보: 마찬가지로 st.subheader("Dividend Information")로 다른 하위 제목을 설정하고 배당 정보가 테이블로 표시됩니다.

<div class="content-ad"></div>

2열 내용: col2 내부에서:

- 기본 분석 지표: 서브헤더를 설정하고 기본 지표가 테이블에 표시됩니다.
- 기술 분석 지표: 서브헤더를 설정하고 기술 지표가 테이블에 표시됩니다.

상위 10개 구성요소: st.subheader("상위 10개 구성요소")는 상위 10개 구성요소 섹션에 서브헤더를 설정합니다. etf_components = get_etf_components([etf_name], api_key)는 제공된 API 키를 사용하여 선택한 ETF의 상위 10개 구성요소 데이터를 가져옵니다. components = etf_components.get(etf_name, [])는 ETF의 구성요소 목록을 검색합니다.

구성요소 데이터 처리:

<div class="content-ad"></div>

- 오류 처리: if isinstance(components, str): st.error(components)은 구성 요소 데이터를 가져오는 데 오류가 있는지 확인하고, 그렇다면 오류 메시지를 표시합니다.
- 주식 데이터 가져오기: 각 구성 요소에 대해 price, change = get_stock_data(comp[`name`])은 get_stock_data 함수를 사용하여 최신 가격과 가격 변경 비율을 가져오고, 이러한 값들이 구성 요소 데이터에 추가됩니다.
- DataFrame 생성: comp_df = pd.DataFrame(components)는 구성 요소 목록에서 DataFrame을 만듭니다. 중요도, 최신 가격 및 가격 변경 % 열이 표시용으로 서식이 지정됩니다.
- 인덱스 설정: comp_df.index = range(1, len(comp_df) + 1)은 DataFrame 인덱스를 가독성을 높이기 위해 1부터 다시 설정합니다.
- 색상 부여된 가격 변경: color_price_change 함수는 가격 변경 % 열에 색상 부여를 적용하여 양수 변화에는 녹색, 음수 변화에는 빨강으로 표시합니다.
- 구성 요소 데이터 표시: st.dataframe(styled_comp_df)는 상위 10개 구성 요소와 스타일이 적용된 DataFrame을 표시합니다.

여기서 끝인가요? 아닙니다. 애플리케이션이 실행되도록 가장 마지막에 주요 메소드를 호출하고 있습니다.

```js
if __name__ == "__main__":
    main()
```

이제, 이 코드를 IDE 터미널에서 streamlit과 함께 실행할 겁니다.

<div class="content-ad"></div>

<table> 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

이미지 태그를 Markdown 형식으로 변경하겠습니다.

![ETF Analysis 3](/assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_3.png)

SPY를 선택하면, 코드로 분류된 정보 슬라이스를 볼 수 있습니다.

![ETF Analysis 4](/assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_4.png)

끝까지 스크롤하면, ETF 구성 요소(전체가 아니지만 상위 10개)가 최근 성과 및 ETF 내의 가중치와 함께 표시됩니다.

<div class="content-ad"></div>


![ETF Analysis](/assets/img/2024-07-13-ETFAnalysiswithPythonandStreamlit_5.png)

# 결론

Python과 Streamlit을 사용하여 ETF 정보 대시보드를 만드는 것은 ETF를 분석하고 투자 결정을 내리는 강력한 방법입니다. 이 안내서에서는 프로젝트 설정, 핵심 ETF 데이터 가져오기, 처리 및 표시하는 과정을 안내했습니다. 이 도구를 사용하여 투자 요구에 맞는 포괄적인 분석 플랫폼을 구축할 수 있습니다.

이 문서에서 안내된 단계를 따라가면 Python과 Streamlit을 활용하여 자체 금융 대시보드를 만들고 투자 분석을 더욱 발전시킬 수 있습니다. 즐거운 코딩 투자하세요!


<div class="content-ad"></div>

애플리케이션의 완료된 코드입니다:

```js
import streamlit as st
import yfinance as yf
import pandas as pd
import requests
import os

...

if __name__ == "__main__":
    main()
```

그리고 상위 100개 ETF의 완전한 목록입니다:

```js
SPY
IVV
VOO
VTI
QQQ
VEA
VUG
IEFA
VTV
BND
AGG
IWF
IJH
IJR
VIG
IEMG
VWO
VXUS
VGT
XLK
IWM
VO
GLD
VB
IWD
SCHD
VYM
ITOT
BNDX
RSP
EFA
TLT
VCIT
IVW
QUAL
XLV
SCHX
XLE
VEU
XLF
MUB
SCHF
IXUS
VT
VCSH
IWB
VV
DIA
JEPI
SPLG
IVE
VNQ
IWR
VTEB
LQD
BSV
BIL
MBB
VBR
IEF
IUSB
SCHB
IAU
DFAC
SCHG
DGRO
VGIT
GOVT
SPYG
SHY
USMV
GBTC
QQQM
JPST
COWZ
TQQQ
MDY
IGSB
SPYV
SDY
VGSH
SPDW
XLY
VGK
ACWI
SGOV
VONG
MGK
TIP
SMH
VXF
DVY
EEM
SHV
XLI
XLC
VHT
VMBS
USFR
BIV
```

<div class="content-ad"></div>

감사합니다!

# 쉽게 풀어 쓴 영어 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 반드시 박수를 꽉 쥐고 작가를 팔로우해 주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기