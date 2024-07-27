---
title: "ETF 데이터 분석을 위한 Python 활용 금융 정보를 가져오고 분석하고 시각화하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-PythonforETFDataAnalysisHowtoFetchAnalyzeandVisualizeFinancialInformation_0.png"
date: 2024-07-13 20:05
ogImage: 
  url: /TIL/assets/img/2024-07-13-PythonforETFDataAnalysisHowtoFetchAnalyzeandVisualizeFinancialInformation_0.png
tag: Tech
originalTitle: "Python for ETF Data Analysis: How to Fetch, Analyze and Visualize Financial Information"
link: "https://medium.com/python-in-plain-english/python-for-etf-data-analysis-how-to-fetch-analyze-and-visualizing-financial-information-6e23024a7b2c"
---


금융 분석을 위한 Python의 힘을 발견하는 여정에 나서보세요! 이 포괄적인 안내서는 CSV 보고서를 작성하거나 대화형 Flask 대시보드를 생성하려는지 여부에 관계없이 Exchange-Traded Funds (ETFs) 데이터를 가져오고 분석하고 시각화하는 단계를 안내해 드립니다. 금융 애호가와 신진 개발자 모두에게 이 이야기는 Python을 사용한 ETF 데이터 분석을 숙달하는 길로 안내해주는 열쇠입니다.

ETFs의 매력을 발견해보세요

금융 시장의 끝없는 미로 속에서 변동성의 용이 불을 내뿜고 불확실성의 그림자가 크게 드리우는 곳에서, 투자 성공의 황금 보물을 찾아 나설 때 위험은 수없이 많습니다. 그러나 이러한 도전 속에 희망과 기회의 빛도 있습니다: Exchange-Traded Funds (ETFs). ETFs를 다양한 갑판에 탑승할 기회를 제공하는, 격동하는 주식 시장의 엉터리 바다를 항해하는 다재다능한 배로 상상해보세요. 시장의 경험 많은 선원이거나 막시 시작한 갑판원이든, ETFs를 이해하는 것은 낡은 먼지 덮인 병에 숨겨진 보물 지도를 발견하는 것과 같습니다.

그런데 이야기의 전개에는 한 가지 반전이 있습니다: 금융 데이터의 방대한 바다를 항해하는 것은 단순히 지도를 가지고 하는 것 이상을 요구합니다; 강력한 신비한 도구가 필요합니다. 현대의 요술사의 지팡이인 Python이 나타납니다. Python이 곁에 있다면, 당신은 수동적인 여행자가 아닌, 시장 트렌드와 투자 기회의 파도를 헤치며 운명을 결정하는 선장이 됩니다.

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

"왜 ETFs에게 그토록 주목해야 하는지 궁금해하실 수 있습니다. 이러한 금융 자산은 여러 가지 이유로 매력적입니다:

- 한 병 속의 다양성: ETFs는 다양한 종목, 채권 또는 상품을 포괄하는 작은 함대와 같습니다. 이 다양성은 귀하의 위험을 분산시켜주어 투자의 궤변에 고립되는 것을 방지합니다.
- 용이한 항해: ETFs 거래는 개별 주식 거래처럼 간편합니다. 시장 가격에서 거래일 내내 거래할 수 있는 유연성을 제공하여 친근한 영혼을 소환하거나 보내는 것과 같은 간단한 일입니다.
- 다양한 옵션의 보물 상자: 대담한 모험가들을 위해 ETFs와 함께 하는 옵션 거래는 자체적인 미로를 제시합니다. 큰 보상의 약속을 가지고 있지만, 위험으로 가득한 길이며 예리한 눈과 안정된 손이 필요한 길입니다.

이 안내서에서는 ETF 데이터 분석을 위해 Python의 힘을 활용하기 위한 여정을 떠납니다. CSV 보고서 형태로 상세한 보물 지도를 만들거나 실시간으로 금융 우주의 비밀을 해제하는 마법의 Flask 대시보드를 작성하려는 목표가 있다면, 이 글은 당신의 나침반이자 항로가 될 것입니다. 파이썬과 유머 한 조각을 더한 채 ETFs의 세계로 떠나보세요. 금융 결정의 능란한 조류를 뚫고 평온한 물들로 향해 갑니다."

![이미지](/TIL/assets/img/2024-07-13-PythonforETFDataAnalysisHowtoFetchAnalyzeandVisualizeFinancialInformation_0.png)

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

당신의 퀘스트 설정하기

금융 데이터 분석의 심오한 모험에 떠나기 전에, 당신의 무기함을 준비하는 것이 중요합니다. 파이썬을 당신의 충실한 말, 코딩의 땅을 횡단하는 여정에서의 존귀한 동반자로 생각해보세요. 여정을 떠날 준비가 되지 않은 상태라면 파이썬 웹사이트로 가서 파이썬을 다운로드하고 설치해주세요. 이를 통해 당신의 평범한 PC가 마법사의 탑이 되어 마법(코딩)이 일어나는 곳이 될 것입니다.

당신의 모험가 툴킷은 다음을 포함해야 합니다:

- 용기: 코드의 알려지지 않은 영역으로 모험을 떠날 용기, 그곳에는 아직 거의 없었던 사람들이 있습니다. 도전에 맞설 용기를 가져주세요.
- 인내심: 프로그래밍의 세계나 좋은 모험에서도 시행 착오와 반대 상황을 경험하게 될 것입니다. 기억해주세요, 코드가 반격을 할 수 있지만 모든 오류 메시지는 보물에 한 발 다가갈 수 있는 단서입니다.
- yfinance: 금융 영역의 마법사들에 의해 창조된 이 마법책은 몇 줄의 코드로만 금융 데이터를 불러올 수 있는 마법을 부리는 것을 가능하게 합니다.

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

하지만 여정은 여기서 끝나지 않아요. 데이터의 무성한 숲을 헤치고 분석의 산등성이를 오를 때, 여러분의 가방에는 몇 가지 도구가 더 필요할 거에요:

- pandas: 마치 마법처럼 작용하는 이 책은 여러분의 지도와 나침반 역할을 할 거에요. 데이터를 정리하고 숫자의 안개 속을 숙련된 항해사처럼 안내해 줄 거에요.
- numpy: 이 부적은 여러분의 능력을 향상시켜 더 복잡한 수학적 의식을 손쉽게 수행할 수 있게 해 주는데, 마치 마법으로 데이터를 변형하고 조작하는 것 같아요.
- Flask: 세계와 여러분의 통찰을 공유하고 싶다면, 이 마법의 두루마리는 다른 사람이 여러분이 발견한 경이로움을 엿볼 수 있는 포털(웹 어플리케이션)을 만들 수 있게 도와 줄 거에요.

도구를 준비하고 말을 타기 위해 거의 출발 준비가 끝났어요. 하지만 먼저, 여정에 대비하기 위해 환경을 준비해야 해요:

- 터미널이나 명령 프롬프트를 열고 마법의 주문인 pip install yfinance pandas numpy Flask을 속삭여 주세요. 이 주문은 필요한 라이브러리를 거대한 Python 패키지 인덱스(PyPI)에서 불러오고 환경에 설치할 거에요.
- 작업 디렉토리에 etfs.txt라는 텍스트 파일을 준비하세요. 파일 안에 탐구하고자 하는 ETF의 심볼을 한 줄씩 나열해 주세요. 이 문서는 여러분의 탐구를 안내해 줄 것이며, yfinance에게 건너뛴다는 트레져를 찾을 것을 알려줄 거에요.

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

준비가 완료되어 위대한 모험의 시작점에 서게 되었군요. 깊게 숨을 들이마시세요, 모험가 여러분. 여러분은 해독하지 못한 수수께끼 속으로 들어가게 될 것입니다. 우리는 이 목표를 달성하기 위해 기록해 두겠습니다.

범위 설명
사용자로서, 특정 ETF 성과에 대한 신뢰할 수 있는 지표 세트를 원하며 데이터 분석을 위해 시간에 따른 움직임의 곡선을 이해하고 싶습니다.

- ETF의 최신 가격: 최신 가격은 바다를 가로지르는 배의 현재 위치를 알기와 같습니다. 현재 ETF의 위치를 알려줌으로써 시장의 광대한 바다에서 즉각적인 위치를 파악할 수 있습니다. 그것이 물결을 타고 높이 올라가고 있는지, 물결의 골짜기에 있어서 낮은 입장점을 찾을 수 있는 기회가 있는지를 보여줍니다.
- 52주 최고가 및 최저가: 이러한 지표들은 어둠의 가운데에서 당신을 안내하는 등대입니다. 52주 최고가는 지난 일 년 동안 ETF가 오른 산봉우리를 나타내며 강점 또는 잠재적인 저항을 시그널합니다. 반면, 52주 최저가는 이 ETF가 건너온 가장 깊은 계곡을 보여줌으로써 가능한 지지도나 궁핍 포인트를 나타냅니다. 이 둘이 함께 ETF의 여정을 구성하여 변동성과 안정성에 대한 통찰을 제공합니다.
- 1년, 3년, 5년 수익률: 과거 모험 이야기로 상상해 보세요. 보물의 성장을 시간이 지남에 따라 증명하는 것입니다. 일 년 수익률은 지난 일 년 동안 ETF가 얼마나 성장했는지 또는 줄었는지를 말해줍니다. 셋과 다섯 년 수익률은 이 이야기를 연장하여 더 긴 여정 동안의 성과를 보여줍니다. 이러한 지표들은 ETF 성장의 일관성을 이해하도록 도와주며 여정에 함께 할 가치 있는 선박인지 여부에 대한 결정을 안내합니다.
- 자산 운용액 (AUM): 보물 상자의 크기입니다. 더 큰 AUM은 더 많은 투자자에게 신뢰받는, 잠재적으로 안정된 ETF를 의미합니다. 또한 이것은 더 많은 유동성을 의미하며, 가격에 영향을 미치지 않고 거래하기가 더 쉽습니다.
- 배당 수익률: 이 수치는 ETF 일부를 보유하고 있기만 해도 받는 보물의 일부를 대표합니다. 높은 배당 수익률은 투자로 인해 더 많은 수익을 얻게 해 주어 안정적인 수입을 제공하게 됩니다.
- 평균 거래량: 이것은 시장 광장에서 활발한 활동으로 상상해 보세요. 하루 평균으로 거래되는 ETF 주식 수를 알려줍니다. 높은 거래량은 더 많은 활동을 의미하며 유동성과 ETF에 대한 관심을 나타냅니다. 이는 가격에 큰 영향을 미치지 않고도 진입하고 위치를 떠날 수 있음을 의미합니다.
- 풋 카운트, 콜 카운트, 그리고 옵션 만기일: 이러한 지표들은 ETF에 대한 옵션 시장의 여론을 엿볼 수 있게 합니다. 더 높은 풋 카운트는 하강을 예상하는 투자자가 더 많음을 나타내고, 더 높은 콜 카운트는 상승에 대한 낙관을 시사합니다. 만기일은 이러한 여론에 대한 맥락을 제공하여 ETF의 성과에 대한 시장 기대에 대한 단서를 제시합니다.
- 트렌드 (상승 또는 하락): 풋 카운트와 콜 카운트에서 유래된 이 지표는 시장 여론을 한 단어로 요약합니다. 상승 트렌드는 낙관을 시사하며 상승 궤적을 나타내며, 하락 트렌드는 비관심과 잠재적인 하강을 암시합니다. 시장에서의 주요 희망을 빠르게 파악할 수 있습니다.

이러한 지표들이 여러분의 투자 여정을 안내할 지도가 됩니다. ETF가 밟아온 길, 싸운 전투, 그리고 이겨낸 승리를 보여줌으로써 재물 영광을 위한 여행길에 함께할 가치 있는 동반자인지 여부를 결정할 수 있습니다. 이 지식을 무장하고 이제 ETF 세계가 여러분을 기다리고 있습니다!

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

**코드를 이해하는 여정을 떠나다**

재정적 통찰력을 얻기 위해 파이썬을 믿음직한 전투말, 플라스크를 마법의 주문으로 선택하셨군요. 우리 주문의 초기 단계를 살펴봅시다:

- 호출

```js
from flask import Flask, render_template_string
import yfinance as yf
import pandas as pd
import numpy as np

app = Flask(__name__)

def fetch_options_data(symbol):
    etf = yf.Ticker(symbol)
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

우리의 동맹들을 모으는 중이에요. Flask는 마법같은 대시보드를 만들어줄 거에요, yfinance는 금융 데이터의 세계로 들어가는 당신의 게이트웨이입니다, pandas는 이 데이터를 정리하는 데 도움을 주고, numpy는 당신이 필요로 할 어떤 숫자적 마법도 지원할 거에요. fetch_options_data 이 함수는 마치 요술사와 상담을 하는 것과도 같아요. 당신이 ETF의 심볼을 제공함으로써, 옵션 데이터를 통해 선물 시장에 대한 정보를 찾고 있습니다. yf.Ticker(symbol)의 주문은 당신이 선택한 ETF에 대한 정보를 불러올 거에요.

2. 요술사의 통찰력

```js
try:
    expiration_dates = etf.options
    if expiration_dates:
        first_expiration_date = expiration_dates[0]
        options_chain = etf.option_chain(first_expiration_date)
        puts = options_chain.puts
        calls = options_chain.calls
        return len(puts), len(calls), first_expiration_date
```

이 세그먼트에서는 시간의 안개를 통해 거래자들이 베팅한 선물을 엿볼 거에요. etf.options는 옵션의 존재하는 미래 날짜를 보여주며, 시장 관련자들의 기대를 엿볼 수 있게 도와줍니다. 첫 번째 만기일의 옵션 체인을 조사함으로써, ETF에 대한 베팅을 풀어내는 puts(ETF에 대한 베팅)와 calls(ETF를 위한 베팅)의 수를 알아냅니다. 이 숫자들과 만기일은 시장의 심리를 암시하는 보물이 되어요.

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

3. 미지의 처리:

```python
try:
    except Exception as e:
        print(f"심볼 {symbol}에 대한 옵션 데이터를 가져올 수 없습니다: {e}")
    return None, None, None
```

최강의 마법도 가끔은 실패할 수 있어요. 여기서는 예기치 못한 상황에 대비합니다. 만약 예언자가 침묵을 지키거나 안개가 너무 짙다면, 당신은 우아하게 미지를 받아들여 앞이 가려져 있다고 신호를 보냅니다.

이 코드는 ETF와 옵션의 신비로운 세계로의 첫 걸음입니다. 여러분은 지식을 찾고, 불확실성에 대비하며 시장의 속삭임을 해석하는 법을 배우게 될 거예요. 우리 여정이 깊어질수록 기억해 주세요: 가장 위대한 마법사들도 한 때는 단지 수습생에 불과했으며, 그 힘은 호기심, 성실함, 그리고 시작할 용기를 통해 형성되었어요.

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

자산 총액 형식화

당신이 찾는 보물의 규모를 이해하는 것은 중요합니다. 여기에서는 단순한 죽염(예를 들어 EFT의 총 자산)을 이해할 수 있는 언어로 번역하는 format_assets라는 주문이 있습니다. format_assets는 EFT의 왕국인 총 자산의 광대함에 초점을 맞춘 마법 같은 돋보기로 생각할 수 있습니다. 이 주문은 이 왕국의 크기를 모험가와 거래자들이 이해하기 쉬운 용어로 전달하려 합니다. 만약 보물의 규모가 수십억을 넘는다면 이 주문은 숫자를 수십억 단위(B)로 표현하여 표시합니다. 이는 "이 EFT는 10억 골드 코인 이상 가치가 있는 영토를 통제하고 있습니다" 라고 말하는 것과 같습니다. 수십억에 미치지는 못하지만 부유한 영토들에 대해서는 그들의 부를 백만 단위(M)로 표시합니다. 이는 그들의 자산이 상당하지만 엄청난 규모에 미치지는 못할 것을 존중해줍니다. 그리고 그리 희귀하지 않은 소중한 마음에, 이 주문은 그대로 그 가치를 명시함으로써 작은 명보라도 우리의 대모험에서 간과되지 않도록 합니다.

```js
def format_assets(assets):
    if assets >= 1e9:  # 10억 이상
        return f"{assets / 1e9:.2f}B"
    elif assets >= 1e6:  # 100만 이상
        return f"{assets / 1e6:.2f}M"
    return str(assets)
```

마법 도서관 공개: EFT 데이터 가져오기

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

우리의 모험은 yfinance의 마법 도서관 심층으로 이어집니다. 거기에는 방대한 지식의 두루마리가 기다리고 있습니다. fetch_data 주문은 우리가 탐험하고자 하는 어떤 ETF 심볼에 대한 비밀을 해제하는 열쇠입니다. 이 강력한 주문이 어떻게 작동하는지 알아봅시다:

```js
def fetch_data(symbol):
    etf = yf.Ticker(symbol) # 해당 ETF의 본질을 활성화시키고, yfinance 영역 내에서 그 영혼에 직접 연결하는 것입니다. 늘 살아있는 데이터로 뛰어드는 ETF의 마음에 직접 연결된 것과 같습니다.
    info = etf.info # 해당 ETF에 대한 알려진 모든 지식을 수집합니다. 이에는 해당 ETF의 역사, 능력, 그리고 금융 왕국에서의 현재 위치가 포함됩니다.
    puts_count, calls_count, first_expiration_date = fetch_options_data(symbol)
    # 옵션의 비밀스러운 세계로 들어가 우리 ETF에 대한 시장의 감정을 나타내는 징조를 찾습니다. 이는 금융 마법사들을 위한 차례불을 읽는 것과 같습니다.

    latest_price = info.get('previousClose', np.nan)  # 최신 가격을 위한 올바른 키
    # ETF의 최신 종가 스냅샷, 거대한 시장에서의 현재 상태에 대한 중요한 단서

    # 비교 전에 puts_count와 calls_count가 None이 아닌지 확인합니다.
    if puts_count is not None and calls_count is not None:
        trend = "Bearish" if puts_count > calls_count else "Bullish"
    else:
        trend = "Unknown"  # 두 카운트 중 하나라도 None이면 중립 값입니다.

    # 추가적인 지표 (무수한 반환값 및 총 자산을 위해 None 값을 적절히 처리해야 합니다.)
    one_year_return = round(info.get('ytdReturn', np.nan) * 100, 2) if info.get('ytdReturn') is not None else "N/A"
    three_year_return = round(info.get('threeYearAverageReturn', np.nan) * 100, 2) if info.get('threeYearAverageReturn') is not None else "N/A"
    five_year_return = round(info.get('fiveYearAverageReturn', np.nan) * 100, 2) if info.get('fiveYearAverageReturn') is not None else "N/A"
    total_assets = format_assets(info.get('totalAssets', np.nan)) if info.get('totalAssets') is not None else "N/A"

    return {
        'Symbol': symbol,
        'Name': info.get('longName', 'N/A'),
        'Latest Price': f"${latest_price}",
        '52W High': f"${round(info.get('fiftyTwoWeekHigh', np.nan), 2)}",
        '52W Low': f"${round(info.get('fiftyTwoWeekLow', np.nan), 2)}",
        '1 Year Return': one_year_return,
        '3 Year Return': three_year_return,
        '5 Year Return': five_year_return,
        'Total Assets': total_assets,
        'Dividend Yield': f"{round(info.get('yield', np.nan) * 100, 2)}%" if info.get('yield') is not None else "N/A",
        'Average Volume': info.get('averageVolume', 'N/A'),
        'Puts Count': puts_count,
        'Calls Count': calls_count,
        'Option Expire': first_expiration_date,
        'Trend': trend
    }
```

우리는 옵션의 징조를 해석하여 바람이 베어들을 지지하는지, 아니면 불들을 지지하는지를 분별합니다. 이는 ETF의 미래 경로를 예측하는 데 도움이 되는 중요한 통찰력입니다.

- 수익률과 자산의 보물 지도: 그리고 주문은 이후 1년, 3년, 5년 동안의 수익률과 함께 총 자산을 계산합니다. 이는 보물이 어디에 있을지뿐만 아니라 시간이 지남에 따라 어떻게 자라냈는지를 나타내는 보물 지도를 펼치는 것과 같습니다.
- 지식의 두루마리 제작: 마지막으로, 우리의 주문은 이 모든 지혜를 쉽게 읽을 수 있는 형식으로 나열한 자세한 두루마리를 만듭니다. 이에는 ETF의 이름, 최신 가격, 고점과 저점, 수익률 등이 포함됩니다. 각 정보 조각은 모험가들이 금융 모험에서 정보된 결정을 내릴 수 있도록 도와주는 단서입니다.

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

포탈 제작: Flask가 데이터를 살려 냅니다

코드를 통한 여정이 Flask에 의해 촉발되어 ETF 데이터 스크롤이 전 세계가 볼 수 있는 모습으로 화려하게 펼쳐지는 마법의 포탈을 만들어 냈습니다. 이 마법을 어떻게 구현하는지 살펴봅시다:

```js
@app.route('/')
def etf_data():
```

이 말을 통해 우리는 디지털 영역에서 공간을 만들어내고, ETF 데이터가 공개될 전용 성소를 조성하게 됩니다. 마치 숨겨진 보물이 가득한 방문을 열듯 합니다. 그런 다음, 우리는 ETF 심볼 목록을 소환하고, 시장의 수수께끼를 푸는 열쇠로 이어지는 각각의 심볼을 확인하기 위한 안내서로 활용합니다. 이 목록은 우리의 안내자이자, 원하는 스크롤로 이끌어주는 길잡이입니다. 리스트가 제시되면, 하나씩, 우리는 각 ETF 심볼의 데이터를 호출하여 지식의 포괄적인 두루미를 펼쳐 냅니다. 마치 우리가 고대의 원고를 수집하는 듯한데요, 각각이 통찰과 비밀로 가득한 원고입니다.

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

다음은 무엇일까요? 다음 단계는 수집한 데이터를 시각적인 형태인 테이블로 변환하는 것입니다. 네비게이션하기 쉽고 눈에 즐겁게 보기 좋은 테이블입니다. 그것은 생 데이터를 숫자와 사실들로 짜여진 아름다운 속삭임으로 만드는 주문입니다.

etf_data 함수와 함께, 우리는 단숴분야를 분석한 것뿐만 아니라 코드의 세계와 시각적 이해의 영역 사이에 다리를 만들었습니다. 우리의 Flask 포털은 동료 모험가들을 위한 길잡이가 되어, ETF의 복잡함을 용이하고 통찰력 있게 안내합니다.

```js
    with open('etfs.txt', 'r') as file:
        symbols = file.read().splitlines()

    data = [fetch_data(symbol) for symbol in symbols]
    df = pd.DataFrame(data)

    # Convert DataFrame to HTML without index
    df_html = df.to_html(classes='table table-striped', index=False)
```

마지막 부분은 tricky합니다: 우리는 데이터를 csv 형식으로 다운로드하거나 Flask 대시보드로 이동할 수 있습니다. 따라서 Flask를 가져오고 활성화할 필요가 없습니다. 웹페이지에 표시하는 것이 더 멋지게 보여서 대시보드를 선택할 예정입니다 (개인적인 지각).

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
html_template = """
    <!DOCTYPE html>
    <html>
    <head>
    <title>ETF Data</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    </head>
    <body>
    <div class="container">
        <h1>ETF Data</h1>
        { df_html | safe }
    </div>
    </body>
    </html>
    """
    return render_template_string(html_template, df_html=df_html)

if __name__ == '__main__':
    app.run(debug=True)
```

ETF의 난해한 지식을 이해하기 쉽고 접근 가능하게 만들기 위한 여정에서 우리는 마지막 단계에 도달했습니다. 디지털 태피스트리의 실을 짜기 위해 주문을 외우는 곳입니다. 여기서 우리는 Flask 앱의 형태를 만드는 주문을 외우면서, 기능적이면서 시각적으로 매력적인 포털을 만들어냅니다. 다음으로 포털의 기초를 다지기 위해 나아갑니다. 맨 위에 새긴 제목은 위대한 도서관의 이름처럼 지식 탐구자를 초대합니다. 그리고 우리는 Bootstrap의 힘을 소환합니다. 이 마법은 우리의 태피스트리가 시각적으로 매력적이면서도 정보를 효과적으로 제공한다는 것을 보장합니다.
HTML의 몸체 안에서 우리는 소중한 데이터를 담는 컨테이너로 사용되는 웅장한 홀, div를 세웁니다. "ETF 데이터"라는 제목은 내부에 담긴 지식의 풍부함을 시그널하는 깃발처럼 자랑스럽게 들려줍니다. 그 아래에는 데이터 표가 배치되어 있으며 HTML로 변환되어 안전하게 표시됩니다. 이곳에서 우리의 ETF 데이터는 한때 복잡성의 안개에 감춰져 있던 곳에서 모든 영광을 뽐내며 드러납니다.
그리고 최종 주문을 외우며 포털에 생명을 불어넣고, 이를 가동시킵니다. 이제 준비가 끝났으며, 인터넷의 문턱에서 지식 탐구자들이 문을 통과하기를 기다립니다.

코드가 실행되고 서버가 활성화되는 동안 이것을 생각해보세요. 당신이 만든 것은 단순히 Flask 앱이 아닙니다. 이것은 재정 데이터의 광대한 바다를 항해하는 사람들을 위한 등대입니다. 각각의 ETF를 탐험하며, 각 지표를 이해함으로써, 당신은 숫자를 분석하는 것뿐만 아니라 길을 밝히며, 결정을 이끌며, 아마도 미래를 바꾸고 있습니다.

그래서, 코드가 준비되었습니다. 실행할 수 있고 결과를 볼 수 있습니다.
브라우저를 열고 URL을 입력하세요: http://127.0.0.1:5000/.


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

아래는 귀하가 원하는 코드를 Markdown 형식으로 변경한 것입니다.


![Python for ETF Data Analysis - How to Fetch, Analyze, and Visualize Financial Information](/TIL/assets/img/2024-07-13-PythonforETFDataAnalysisHowtoFetchAnalyzeandVisualizeFinancialInformation_1.png)

UPD: 아래의 코멘트에 제안된 대로, 직접 구현하고 테스트할 수 있는 전체 코드를 추가했습니다 :)

```python
from flask import Flask, render_template_string
import yfinance as yf
import pandas as pd
import numpy as np

app = Flask(__name__)

# 옵션 데이터를 가져오는 함수
def fetch_options_data(symbol):
    etf = yf.Ticker(symbol)
    try:
        expiration_dates = etf.options
        if expiration_dates:
            first_expiration_date = expiration_dates[0]
            options_chain = etf.option_chain(first_expiration_date)
            puts = options_chain.puts
            calls = options_chain.calls
            return len(puts), len(calls), first_expiration_date
    except Exception as e:
        print(f"{symbol}에 대한 옵션 데이터를 가져올 수 없음: {e}")
    return None, None, None

# 쉽게 파악할 수 있도록 총 자산을 포맷하는(helper) 함수
def format_assets(assets):
    if assets >= 1e9:  # 10억 이상
        return f"{assets / 1e9:.2f}B"
    elif assets >= 1e6:  # 1백만 이상
        return f"{assets / 1e6:.2f}M"
    return str(assets)

# 수정된 fetch_data 함수에 모든 수정 사항을 포함
def fetch_data(symbol):
    etf = yf.Ticker(symbol)
    info = etf.info
    puts_count, calls_count, first_expiration_date = fetch_options_data(symbol)
    latest_price = info.get('previousClose', np.nan)  # 최신 가격을 위한 올바른 키

    # puts_count 및 calls_count를 비교하기 전에 None이 아닌지 확인합니다
    if puts_count is not None and calls_count is not None:
        trend = "Bearish" if puts_count > calls_count else "Bullish"
    else:
        trend = "Unknown"  # 어느 하나가 None인 경우 중립 값을 설정

    # 추가 지표 (수익 및 총 자산에 대한 None 값의 적절한 처리 확인)
    one_year_return = round(info.get('ytdReturn', np.nan) * 100, 2) if info.get('ytdReturn') is not None else "N/A"
    three_year_return = round(info.get('threeYearAverageReturn', np.nan) * 100, 2) if info.get('threeYearAverageReturn') is not None else "N/A"
    five_year_return = round(info.get('fiveYearAverageReturn', np.nan) * 100, 2) if info.get('fiveYearAverageReturn') is not None else "N/A"
    total_assets = format_assets(info.get('totalAssets', np.nan)) if info.get('totalAssets') is not None else "N/A"

    return {
        '심볼': symbol,
        '이름': info.get('longName', 'N/A'),
        '최신 가격': f"${latest_price}",
        '52주 최고가': f"${round(info.get('fiftyTwoWeekHigh', np.nan), 2)}",
        '52주 최저가': f"${round(info.get('fiftyTwoWeekLow', np.nan), 2)}",
        '1년 수익률': one_year_return,
        '3년 수익률': three_year_return,
        '5년 수익률': five_year_return,
        '총 자산': total_assets,
        '배당 수익률': f"{round(info.get('yield', np.nan) * 100, 2)}%" if info.get('yield') is not None else "N/A",
        '평균 거래량': info.get('averageVolume', 'N/A'),
        '풋 거래 수': puts_count,
        '콜 거래 수': calls_count,
        '옵션 만기일': first_expiration_date,
        '추세': trend
    }

# Flask를 URL 구조가 보이게 설정: 127.0.0.1:5000/
@app.route('/')
def etf_data():
    with open('etfs.txt', 'r') as file:
        symbols = file.read().splitlines()

    data = [fetch_data(symbol) for symbol in symbols]
    df = pd.DataFrame(data)

    # 인덱스 없이 DataFrame을 HTML로 변환
    df_html = df.to_html(classes='table table-striped', index=False)

    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
    <title>ETF Data</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    </head>
    <body>
    <div class="container">
        <h1>ETF Data</h1>
        { df_html | safe }
    </div>
    </body>
    </html>
    """
    return render_template_string(html_template, df_html=df_html)

if __name__ == '__main__':
    app.run(debug=True)
```

The Treasure Unveiled: What We Have Achieved


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

축하합니다, 친애하는 모험가 여러분! 여러분은 금융 데이터의 미로를 헤쳐나가며, 파이썬의 마법을 휘둘러 ETF의 비밀을 플라스크 대시보드의 투명한 화면을 통해 밝혀내었습니다. 이제 우리가 발견한 보물에 놀라보는 시간을 가져봅시다:

- 지식의 지도: 우리의 여정의 핵심에는 ETF 세계의 전경을 제공하는 강력한 대시보드가 있습니다. 최신 가격, 52주 최고/최저 및 수익률(1년, 3년, 5년)과 같은 지표들을 통해 숫자를 이해뿐만 아니라 시장의 격동하는 수역을 탐험하기 위한 나침반이 되었습니다.
- 숫자 너머의 통찰: 저희 대시보드는 숫자를 표시하는 데 그치지 않고 통찰력을 제공합니다. 풋과 콜을 비교함으로써 투자자에게 시장 심리를 엿보여, 순수한 데이터를 실행 가능한 정보로 바꾸었습니다.
- 미래로의 문: 각 ETF의 데이터가 꼼꼼하게 분류되어 있는 상태에서 우리의 플라스크 앱은 투자자가 잠재적인 미래를 엿볼 수 있는 창문으로 서 있어, 금융용 악마로부터 멀리하고 황금잡이 기회로 나아가는데 도움이 되고자 합니다.

다음 단계: 어떻게 더 나아갈까요?

기반을 다지고 배를 준비한 상태에서, 우리는 여기서 어디로 항해해야 할까요? 금융과 코딩의 영역은 방대하며, 발굴되지 않은 미스터리가 무수히 많습니다. 다음은 여러분이 떠날 수 있는 잠재적인 항해들입니다:

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

- 대시보드를 embold: 우리의 Flask 앱은 기능적이지만, 웹 디자인의 영역에서 아름다움은 힘이 될 수 있어요. 대시보드를 시각적으로 멋진 걸작으로 변신시키기 위해 CSS 마법과 JavaScript 마법을 활용해 보세요. 모든 방문자를 사로잡는 멋진 대시보드로 만들어 보세요.

- Metrics을 확장하다: 금융 세계는 끊임없이 변화하며, 시장의 안개 속에서 나타나는 새로운 지표들이 등장합니다. 대시보드에 더 많은 metrics를 추가하는 것을 고려해 보세요. 샤프 비율, 알파, 베타 등을 추가하여 각 ETF의 성과와 위험 프로필에 대한 더 깊은 통찰력을 제공할 수 있습니다.

- 개인화 및 상호 작용: 시청자를 알아차리는 대시보드를 상상해 보세요. 개인의 투자 성향이나 위험 허용도에 맞게 인사이트를 맞춤화할 수 있는 대시보드를 추가하는 것이 어떨까요? 사용자 계정, 사용자 정의 뷰, 상호 작용 요소를 추가함으로써 당신의 앱을 도구에서 신뢰할 수 있는 자문자로 변신시킬 수 있습니다.

- 실시간 데이터 통합: 현재 대시보드는 한 순간을 포착합니다. 금융의 바다는 항상 변동하기 때문에 실시간 데이터 피드를 통합함으로써 대시보드를 실시간 맵으로 변환할 수 있습니다. 시장의 최신 풍향과 조류로 끊임없이 업데이트되는 대시보드로 만들어 보세요.

- 새로운 해안 탐험: ETF에서 멈추지 마세요. 금융 세계는 암호화폐부터 상품, 주식부터 채권까지 기회의 섬으로 가득합니다. 대시보드를 확장하여 이러한 영역을 다루는 것은 전체 금융 우주를 탐색하는 데 필수적인 나침반으로 만들 수 있습니다.

그래서 여기에서 출발할 때 차트를 손에 쥐고 Python을 가까이 가져 두세요. 금융의 바다는 넓고 야생적이지만, 당신은 능숙한 항해사임이 이미 증명되었습니다. 당신의 투자가 번창하고, 데이터가 정확하며 알고리즘이 효율적하기를 바랍니다.

다시 만나는 그 순간까지, 용감한 모험가여, 이만 작별하겠습니다. 행운의 바람이 당신을 이끌어주길 바라며, 당신이 항상 지혜와 번창의 해안에 도착할 수 있기를 바랍니다.

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

인 플레인 영어 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 작가를 반경하고 팔로우해주세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기