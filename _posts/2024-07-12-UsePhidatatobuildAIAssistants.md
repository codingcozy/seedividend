---
title: "Phidata를 사용하여 AI 어시스턴트 구축하는 방법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-12 19:48
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Use Phidata to build AI Assistants"
link: "https://medium.com/ai-advances/use-phidata-to-build-ai-assistants-5e0a07074b64"
---


지금까지 기능 호출을 사용하는 심플한 AI 시스템을 만드는 것은 다소 까다로웠습니다. 일반적으로 사용되는 대형 언어 모델 (LLM)의 특정 API 명세에 대한 심층적인 지식이 필요했으며 코딩 기술 수준도 일정 수준 이상이어야 했습니다.

Phidata는 이러한 복잡성을 해결하고 기능 호출을 사용하여 손쉽게 AI 어시스턴트를 구축할 수 있는 툴킷을 제공함으로써 전체 프로세스를 간단히 만들고 있습니다.

기능 호출을 통해 LLM은 함수를 호출하여 작업을 수행하고 응답에 따라 다음 단계를 지능적으로 선택할 수 있습니다. 이는 인간이 문제를 해결하는 방식과 유사합니다.

## Phidata는 누구인가요?

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

Phidata는 2023년에 Ashpreet Bedi에 의해 설립되었어요. 그는 Airbnb와 Facebook에서 10년간 데이터 엔지니어링 및 ML 인프라를 구축한 뒤 Phidata를 만들었죠. Phidata의 초기 비전은 AI 엔지니어링과 데브옵스 사이의 간극을 줄이는 것이었습니다.

## Phidata에 접속하려면?

Phidata는 무료로 이용할 수 있어요. 아래의 문서 웹사이트 링크로 이동해보세요.

또한, 그들의 GitHub 리포도 확인해보세요.

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

## 할 일

이 기사에서 여러 예시를 사용하여 Phidata를 사용하여 유용한 작업을 수행할 수 있는 어시스턴트를 구축하는 방법을 보여드릴 거에요.

현재 Phidata는 OpenAI와 Ollama를 포함한 여러 LLM을 지원하고 있어요. 테스트 케이스에서는 먼저 Mistral LLM을 사용한 Ollama를 사용한 후 openhermes로 전환한 다음 OpenAI GPT-4를 사용할 거예요. Ollama에 익숙하지 않다면, 접속 및 사용에 대한 글을 작성했어요. 아래를 클릭하여 읽어보세요.

코드를 따라하려면 Mistral 및 openhermes 모델을 Ollama를 통해 다운로드했는지 확인하세요.

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

먼저 시스템에 영향을 주지 않고 코딩 및 실험을 할 수 있는 별도의 개발 환경을 설정해야 합니다. 저는 conda를 사용하여 개발 환경을 설정하지만 여러분이 편한 방법을 사용하셔도 괜찮습니다.

```js
# 테스트 환경 생성
conda create -n phidata python=3.11 -y
```

환경이 생성되면 activate 명령을 사용하여 해당 환경으로 전환한 후 필요한 모든 라이브러리를 설치할 수 있습니다.

```js
# 이제 해당 환경을 활성화합니다
conda activate phidata
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

```js
# 필수 라이브러리 설치
pip install -U phidata
pip install ollama duckduckgo-search openai pydantic

# 저는 Windows의 WSL에서 실행 중이며 종종 Notebook을 실행할 때
# chardet과 관련된 오류가 발생합니다.
# 따라서 다음 설치 명령어를 사용하여 문제를 해결할 수 있습니다.
pip install chardet
```

```js
# Jupyter 설치
conda install jupyter -y
```

이제 명령 프롬프트에서 'jupyter notebook'을 입력하세요. 브라우저에서 Jupyter Notebook이 열릴 것입니다. 자동으로 열리지 않는다면 'jupyter notebook' 명령어를 실행한 후 화면 가장 아래에 URL이 표시될 것입니다. 해당 URL을 복사하여 브라우저에 붙여넣으면 Jupyter Notebook을 시작할 수 있습니다.

당신의 URL은 제 것과 다를 수 있지만 다음과 유사한 형식이어야 합니다:-


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
http://127.0.0.1:8888/tree?token=3b9f7bd07b6966b41b68e2350721b2d0b6f388d248cc69da
```

안녕하세요, 코드를 시작해봅시다. 각 섹션으로 나누어 주석을 달아두겠습니다. 무슨 일이 일어나고 있는지 설명할게요.

Phidata는 Assistant를 사용하여 AI 애플리케이션을 개발합니다. Assistant는 기능을 호출하여 작업을 수행하기 위해 LLM을 이용합니다. 내장 메모리, 지식 및 저장소를 사용하여 자율적인 AI 애플리케이션을 쉽게 구축할 수 있습니다.

## 예시 1 — 간단한 요청/응답 Assistant

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
# 이제 이게 가장 쉬운 방법입니다
# 비서를 설정하고, 그 후에 요청을 해보세요
#
from phi.assistant import Assistant
from phi.llm.ollama import Ollama

assistant = Assistant(
    llm=Ollama(model="mistral"),
    description="당신은 경험 많은 시인입니다",
)
assistant.print_response("여름 목초지에 대한 짧은 시를 써주세요", markdown=True)

>>

╭──────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ 메시지  │ 여름 목초지에 대한 짧은 시를 써주세요                                                               │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 응답    │                                                                                                      │
│ (3.5초) │  # 여름의 목초지                                                                                          │
│          │                                                                                                      │
│          │  황금빛에 녹아 있는,                                                                                │
│          │  여름 목초지가 피어나 있고,                                                                          │
│          │  진주와 금빛으로 된 이불에 싸여 있어,                                                               │
│          │  자연의 비밀들이 과감하게 드러나 있습니다.                                                       │
│          │                                                                                                      │
│          │  햇빛이 반짝이는 도드람 속을 춤추며 지나가,                                                │
│          │  잎들이 속삭이며, 자장가처럼 부드럽게 속삭이며,                                        │
│          │  나비들이 따뜻한 공기 속에서 물줄기를 그리고,                                          │
│          │  비교할 수 없는 모습의 심포니가 펼쳐집니다.                                                │
│          │                                                                                                      │
│          │  국화와 미국쑥은 손에 손을 잡고,                                                         │
│          │  데이지는 온화한 하늘 아래에서 핀다,                                                       │
│          │  꿀벌들은 달콤한 기쁨을 찾아 떠 돕니다,                                               │
│          │  고요함이 불을 지피는 이 안식처에서.                                                    │
│          │                                                                                                      │
│          │  하늘의 푸른 천장 아래서,                                                              │
│          │  여름 목초지는 평화로운 음조를 뽑습니다.                                             │
│          │  생명과 사랑의 판,                                                                        │
│          │  아름다움의 끝없는 이야기가 펼쳐집니다.                                                 │
│          │  ``                                                                                                  │
│          │                                                                                                      │
╰──────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

## 예시 2 — 인터넷 검색하기

LLM과 도구 호출을 사용할 때 몇 가지 문제가 발생하는 것으로 보입니다. Mistral 모델을 사용할 때 일부 문제가 발생했습니다. Openhermes로 LLM 모델을 변경하면 Phidata가 더 잘 대처하는 것으로 보여, 계속하기 전에 Ollama와 함께 openhermes를 먼저 실행하십시오.

```python
# phidata에는 여러 도구가 있습니다
# duckduckgo는 인터넷 기반 연구를 할 때 매우 유용합니다
#
from phi.tools.duckduckgo import DuckDuckGo
from phi.llm.ollama import Ollama

assistant = Assistant(
  tools=[DuckDuckGo()], 
  llm=Ollama(model="openhermes"),
  description="당신은 경험이 많은 연구자입니다",
  show_tool_calls=True)

assistant.print_response("AI에서 가장 최신 트렌드인 이야기 찾기? 소스를 포함하여 최상위 이야기 요약.")

>>

╭──────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ 메시지  │ AI에서 가장 최신 트렌드인 이야기 찾기? 소스를 포함하여 최상위 이야기 요약.                                  │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 응답    │                                                                                                      │
│ (7.8초) │ 실행 중:                                                                                                 │
│          │  - duckduckgo_news(쿼리=AI에서 가장 최신 트렌드인 이야기, 최대 결과=1)                                 │
│          │  - duckduckgo_news(쿼리=AI에서 최상위 이야기, 최대 결과=3)                                         │
│          │                                                                                                      │
│          │ AI에서 가장 최신 트렌드와 최상위 이야기를 기반으로, 다음은 그 이야기들과 출처를 요약한 것입니다:│
│          │                                                                                                      │
│          │ 1. "Walmart의 생성 AI 검색의 빠른 성공으로 Google이 걱정해야 할 이유": Walmart은                    │
│          │ 웹사이트 검색에 생성 AI를 효과적으로 통합하여 맞춤형 쇼핑 경험을 더해가고 있습니다.                  │
│          │ 이로 인해 Google의 검색 시장에 미치는 잠재적 영향에 대한 우려가 제기되고 있습니다. (출처:           │
│          │ CNBC on MSN.com)                                                                                     │
│          │ 2. "모두가 SoundHound AI에 대해 이야기하고 있는데, 그것이 다음 백만장자 메이커 기술 주식인가?": SoundHound AI는||
│          │ 투자자, 언론 및 월스트리트로부터 상당한 관심을 받고 있으며, 음성 기반 AI 어시스턴트에 대한 관심이             ||
│          │ 커지면서 더욱 주목을 받고 있습니다. (출처: The Motley Fool on MSN.com)                                    ||
│          │ 3. "AI로 이야기하는 책들이 나왔습니다. 인간들은 일자리를 잃을까요? 이 스타트업은 해결책을 갖고 있습니다": AI 소프트웨어||
│          │ 가 점차적으로 오디오북과 뉴스 기사를 이야기하는 데 사용되면서, 인간 이야기꾼들의 미래에 대한 우려가 올라옵니다.  ||
│          │ 한 스타트업은 인간 보코이버를 대체하기 위한 AI 모델을 훈련시켜 아닌 보코오버를 강화시키기 위한 해결책을 제공합니다.   ||
│          │ (출처: MSN)                                                                                        ||
│          │ 4. "Nvidia 주식이 상승하고 있습니다. 그 칩들이 메타의 새 AI 모델을 구동하고 있습니다": Nvidia 주식이 상승하는 이유는  ||
│          │ 메타 플랫폼의 최신 인공지능 훈련을 지원하고 있기 때문입니다                                                 ||
╰──────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────╯
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

## 예제 3 — 외부 함수 호출

이전 프로젝트에서 전 세계의 모든 지명 위치의 온도를 가져오기 위해 파이썬 함수를 작성했어요. 그것을 Phidata와 어떻게 통합할 수 있는지 알아봅시다. 제 함수는 OpenWeatherMap API를 사용해요. 무료로 API 키를 등록하고 얻을 수 있어요. 아래 링크를 클릭해보세요.

```js
# 우리가 작성한 Python 함수를
# Phidata에 아주 쉽게 통합할 수 있어요
#
from phi.llm.ollama import Ollama
from phi.tools import Toolkit
from phi.assistant import Assistant

import requests

class GetTemp(Toolkit):
    def __init__(self):
        super().__init__()

    def get_temp(self,location:str)->str:
        # 여기에 API 키를 입력해주세요
        API_KEY = "여기에_당신의_웨더맵_키를_입력하세요"
    
        # url을 저장하는 base_url 변수
        base_url = "http://api.openweathermap.org/data/2.5/weather?"
    
        # 요청 전체 URL
        complete_url = base_url + "appid=" + API_KEY + "&q=" + location
    
        # requests 모듈의 get 메서드
        # 응답 객체를 반환합니다
        response = requests.get(complete_url)
        x = response.json()
     
        # "cod" 키의 값이 "404"와 같으면
        # 위치가 발견된 것이고 그렇지 않으면
        # 도시가 발견되지 않았어요
        if x["cod"] != "404":
            y = x["main"]
            # 가독성을 위해 온도를 켈빈에서 섭씨로 변환
            temp_celsius = y["temp"] - 273.15
            return str(temp_celsius)
        else:
            return None

assistant = Assistant(
    description="도구를 이용해 세계 온도 데이터를 얻는 유용한 Assistant에요", 
    tools=[GetTemp().get_temp], 
    llm=Ollama(model="openhermes"),
)

assistant.print_response("에든버러의 온도는?")
assistant.print_response("뉴욕의 온도는?")

>>

╭──────────┬──────────────────────────────────────────────────────────────╮
│ 메시지   │ 에든버러의 온도는?                                            │
├──────────┼──────────────────────────────────────────────────────────────┤
│ 응답     │ 에든버러의 온도는 현재 10.62도 입니다                           │
│ (1.3초)  │                                                              │
╰──────────┴──────────────────────────────────────────────────────────────╯
╭──────────┬───────────────────────────────────────────────────────╮
│ 메시지   │ 뉴욕의 온도는?                                              │
├──────────┼───────────────────────────────────────────────────────┤
│ 응답     │ 뉴욕의 온도는 현재 7.99도 입니다                             │
│ (1.0초)  │                                                       │
╰──────────┴───────────────────────────────────────────────────────╯
```

## 예제 4 — 파이썬 코드 작성과 실행

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

이번 테스트에서는 Phidata에게 CSV 파일에서 간단한 탐색적 데이터 분석을 수행하는 Python 프로그램을 작성해 달라고 요청할 것입니다. 사용할 데이터는 IMDB 영화 통계 레코드 세트입니다. 이 데이터는 Phidata가 AWS S3 버킷에 저장하고 제공합니다. 데이터 세트에는 1000개의 레코드가 있으며 처음 몇 개는 다음과 같습니다.

Phidata에게 데이터 세트의 모든 영화의 평균 상영 시간을 계산하는 Python 프로그램을 작성해 달라고 요청할 것입니다. 이를 위해 OpenAI GPT-4 LLM을 사용해야 하므로 API 키가 필요합니다. 이미 API 키를 보유하고 있지 않다면 platform.openai.com에 방문하여 획득하십시오. 참고: 이를 위해서는 결제 세부 정보를 입력해야 합니다. 시작합니다.

```python
from phi.assistant.python import PythonAssistant
from phi.file.local.csv import CsvFile
from phi.tools import Toolkit
from phi.assistant import Assistant
from phi.llm.openai import OpenAIChat

import os
os.environ["OPENAI_API_KEY"] = "여러분의_OPENAI_API_KEY"


python_assistant = PythonAssistant(
    files=[
        CsvFile(
            path="https://phidata-public.s3.amazonaws.com/demo_data/IMDB-Movie-Data.csv",
            description="IMDB의 영화 정보를 담고 있습니다.",
        )
    ],
    llm=OpenAIChat(model="gpt-4"),
    pip_install=True,
    
)

python_assistant.print_response("영화들의 평균 상영 시간을 계산하세요. 최종 응답은 '영화의 평균 상영 시간은 <avg_runtime> 분입니다' 형식이어야 합니다. <avg_runtime>은 여러분이 계산한 값입니다.", markdown=True)
```

이것이 출력입니다.

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
╭──────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────╮
│          │ 영화의 평균 런타임을 분 단위로 계산하세요? 최종 응답은 '<avg_runtime> 분입니다' 형식으로 나와야 합니다. 여기서 <avg_runtime은 계산된 값 입니다. │
├──────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Message  │ 제공된 "IMDB-Movie-Data.csv"에서 영화의 평균 런타임을 계산하려면 다음 단계를 따르세요:                 │
│ (34.0s)  │                                                                                                      │
│ Response │  1. 팬더스(Pandas)를 사용하여 CSV 파일에서 데이터를 로드합니다. 팬더스는 대용량 데이터를 처리하는 효율적인 라이브러리입니다.  │
│          │  2. 'Runtime (Minutes)' 열의 평균을 계산합니다.                                                       │
│          │  3. 데이터셋이 이미 온라인에서 사용 가능하기 때문에 데이터를 다운로드할 필요가 없습니다.                │
│          │                                                                                                      │
│          │ 이를 계산하기 위한 파이썬 코드는 다음과 같습니다:                                                        │
│          │                                                                                                    │
│          │                                                                                                  │
│          │  import pandas as pd                                                                              │
│          │                                                                                                    │
│          │  def calculate_average_runtime():                                                                 │
│          │      url = 'https://phidata-public.s3.amazonaws.com/demo_data/IMDB-Movie-Data.csv'                  │
│          │      data = pd.read_csv(url)                                                                      │
│          │      avg_runtime = data['Runtime (Minutes)'].mean()                                                 │
│          │      return avg_runtime                                                                           │
│          │                                                                                                    │
│          │  if __name__ == "__main__":                                                                       │
│          │      print(f'영화의 평균 런타임은 {calculate_average_runtime()} 분입니다')                         │
│          │                                                                                                    │
│          │                                                                                                    │
│          │ 코드를 저장하고 실행해 봅시다: 오류가 있는 것으로 보입니다. 프로그램은 평균 런타임을 반환하지 않고 출력합니다. 평균 런타임을 반환하도록 코드를 수정할 것입니다.  │
│          │                                                                                                    │
│          │ 수정된 파이썬 코드는 다음과 같습니다:                                                                   │
│          │                                                                                                    │
│          │                                                                                                    │
│          │  import pandas as pd                                                                              │
│          │                                                                                                    │
│          │  def calculate_average_runtime():                                                                 │
│          │      url = 'https://phidata-public.s3.amazonaws.com/demo_data/IMDB-Movie-Data.csv'                  │
│          │      data = pd.read_csv(url)                                                                      │
│          │      avg_runtime = data['Runtime (Minutes)'].mean()                                                 │
│          │      return avg_runtime                                                                           │
│          │                                                                                                    │
│          │  if __name__ == "__main__":                                                                       │
│          │      avg_runtime = calculate_average_runtime()                                                      │
│          │      print(f'영화의 평균 런타임은 {avg_runtime} 분입니다')                                         │
│          │                                                                                                    │
│          │                                                                                                    │
│          │ 이제 스크립트 실행 시 avg_runtime이 반환될 것이며, save_to_file_and_run 함수에서 해당 변수를 요청할 수 있습니다. 수정하겠습니다. 영화의 평균 런타임은 ...분입니다 │
╰──────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────╯
INFO     Saved: /home/tom/average_runtime.py                                                                       
INFO     Running /home/tom/average_runtime.py                                                                      
영화의 평균 런타임은 113.172 분입니다
INFO     Saved: /home/tom/average_runtime.py                                                                       
INFO     Running /home/tom/average_runtime.py                                                                      
영화의 평균 런타임은 113.172 분입니다
```

113.172 분의 답이 정확하다는 것을 확인할 수 있습니다(아래 참조).

## 결론

Phidata에 꽤 impressed했습니다. 여러 가지 작업을 효율적으로 수행할 수 있는 것 같습니다. 현재 local LLMs를 사용하는 부분이 조금 hit-and-miss 한 것이 유일한 문제입니다. 하지만 이것 또한 앞으로 몇 주 및 몇 달 사이에 개선될 것으로 기대합니다. 만약 누군가가 이미 시도해보고 새로운 용도를 발견했다면 댓글로 알려주세요.

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

이 컨텐츠가 마음에 드셨다면, 다음 게시물들도 흥미롭게 보실 수 있을 거예요.