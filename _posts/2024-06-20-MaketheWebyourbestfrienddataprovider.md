---
title: "웹을 당신의 최고 친구 데이터 제공업체로 만들어 보세요"
description: ""
coverImage: "/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_0.png"
date: 2024-06-20 04:38
ogImage: 
  url: /assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_0.png
tag: Tech
originalTitle: "Make the Web your best friend data provider"
link: "https://medium.com/generative-ai/make-the-web-your-best-friend-data-provider-16e1a2a31024"
---


<img src="/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_0.png" />

LLM을 도구로 갖추는 아이디어는 그리 새로운 것은 아닙니다. LangChain과 Llamaindex와 같은 강력하고 잘 알려진 프레임워크는 몇 달 전에 이미 이를 실행했습니다.

그들은 위험 부담에 대한 승리했어요!

지금 완전히 열광 중인 AI 에이전트 혁명은 도구 패러다임을 충분히 활용하여 놀라운 결과를 얻고 있어요.

<div class="content-ad"></div>

인공지능이 지금 새로운 벽을 맞이했습니다: 계산 요구 사항과 무료로 이용 가능한 데이터의 끝.

이 기사에서는 이러한 도전 과제를 다루고, 우리의 LLM 애플리케이션을 새로운 관련 데이터로 무료로 풍부하게 만드는 방법을 배울 것입니다!

```js
# 목차
- 중립적 LLM 방향
- 검색 보강 생성: 여전히 최고의 도구
- 웹 검색 및 NLP 뉴스는 도구입니다
- 단락에서 문서까지
- 그럼 이제 무엇을 해야 할까요? 직접 문서 저장소 만들기
```

# 중립적 LLM

<div class="content-ad"></div>

기술 발전은 이미 지난 해의 많은 작업을 이미 완료했습니다. 새로운 하드웨어와 GPU 세트는 이제 더 빠르고 저렴하게 복잡한 신경망 계산을 처리할 수 있습니다.

동시에 엣지-모바일 기기로의 명확한 이동이 있으며, 작은 언어 모델이 큰 모델과 경쟁할 수 있도록 하는 데 특별한 주의를 기울이고 있습니다. TinyLlama 프로젝트를 시작으로 목표는 모바일 전화 하드웨어에서 실행할만큼 충분히 작지만 환각하지 않고 유용한 모델을 만드는 것입니다.

규모 법칙 이상으로, 우리는 LLM이 추상화하고 이성적으로 추론하는 능력을 잃는 한계를 이해해야 합니다. 데이터 없이 신경망을 구축할 수 없지만 동시에 우리는 새로운 위키피디아를 만들고 있지는 않습니다, 맞죠?

AI 커뮤니티에서 진정한 권위자인 Cobus Greyling은 항상 이것을 강조합니다: 데이터 처리 및 데이터 처리를 LLM 응용 프로그램에서 분리하세요. 그에게는 LLM 응용 프로그램은 모델에 중립적이어야 하며 LLM을 유틸리티로 취급해야 한다 - 그러나 이는 신뢰할 수 있는 데이터, 좋은 소식 및 선별된 데이터 집합에 대해 작업해야 한다는 것을 의미합니다.

<div class="content-ad"></div>

우수한 데이터를 이용하면 작은 모델(20억 파라미터 미만)이 탁월한 성과를 거둘 수 있어요!

![image](/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_1.png)

## 검색 증강 생성: 여전히 최고의 도구

좋은 말들이지만, 이를 어떻게 구현할까요?

<div class="content-ad"></div>

Retrieval Augmented Generation (RAG)은 생성된 텍스트의 품질을 향상시키기 위해 자연어 처리에서 사용되는 기술입니다.

마술은 없어요! 우리는 대규모 외부 지식 원본(데이터베이스나 문서 코퍼스 등)에서 관련 정보를 통합하여 LLM 프롬프트에 적용합니다. RAG에서는 쿼리나 프롬프트에 대한 응답을 생성할 때 모델이 매우 좋은 작업을 합니다:

- 먼저 검색 메커니즘을 사용해 외부 지식 원본에서 관련 정보를 검색합니다.
- 검색된 정보는 그 후 생성 모델로 투입되어 자신의 지식을 보완하고
- 보다 정확하고 유익한 응답을 생성합니다.

예를 들어, 특정 역사적 사건에 대한 질문을 하는 경우 RAG 모델은 먼저 역사 문서의 대규모 데이터베이스에서 해당 사건에 대한 정보를 검색하고, 그 정보를 사용하여 귀하의 질문에 대한 세부적이고 정확한 응답을 생성합니다.

<div class="content-ad"></div>

RAG은 순수 생성 모델과 구체적인 사실 정보에 제한을 받을 수 있는 것을 합하고, 오직 검색 기반 모델과 창의적인 대답을 생성하는 데 어려움을 겪을 수 있는 것을 합하면서 이 둘 간의 간극을 좁히는 데 도움을 줍니다.

그러니까 우리 수학 시간을 시작해 볼까요:

- 좋은 이유를 제공하는 작은 LLM이 주어지면
- 좋고 최신 정보를 위해 RAG 파이프라인을 설정하면

... 전례 없는 그리고 의미 있는 문서 세트를 만드는 방법이 필요합니다.

<div class="content-ad"></div>

# 웹 검색 및 NLP 뉴스는 도구들입니다

이전 글에서 LangChain을 DuckDuckGo 웹 검색과 함께 사용하는 방법에 대해 설명했었습니다.

최신 뉴스와 업데이트된 정보를 검색 엔진을 사용하여 가져오는 것은 어떤 반 데이터 모형으로 향하는 놀라운 방법입니다. 생성 모델의 마감일 한계가 우리가 필요한 모든 것과 외부 지식을 제공할 수 있기 때문에 우회됩니다.

확인되고 진실한 정보가 있는 경우, 우리의 LLM 응용 프로그램은 좋은 RAG 전략을 사용함으로써보다 효과적 일 수 있습니다.

<div class="content-ad"></div>

하지만 잘 알려진 웹 검색 도구에도 제한이 있습니다! 무료 Google Colab 노트북을 사용하여 확인해 보세요.

```js
%pip install --upgrade --quiet langchain langchain-community faiss-cpu 
%pip install tiktoken duckduckgo-search llama-cpp-agent newspaper3k
```

Langchain과 함께 duckduckgo-search와 newspaper3k(강력한 NLP 웹 HTML 문서 파서)를 설치합니다.

먼저, 웹 검색의 출력이 무엇인지 살펴봅시다:

<div class="content-ad"></div>

```js
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
wrapper = DuckDuckGoSearchAPIWrapper(region='us-en', 
                                   time="y", 
                                   max_results=10) #time Options: d, w, m, y

rawdb = wrapper.results('LLM Mixture of Agents',max_results=5)
```

여기서는 에이전트 도구가 아닌 wrapper 자체를 사용하여 "LLM 혼합 에이전트"에 대한 정보를 찾습니다. 결과를 출력하고 rawdb 변수에 저장하면 다음과 같은 내용이 나타납니다:

```js
[
    {
        'snippet': '대형 언어 모델(LM)의 최근 발전은 자연어 이해 및 생성 작업에서 상당한 성능을 보여줍니다. 증가하는 LLM의 수로 인해 여러 LLM의 집단적 전문지식을 어떻게 활용할지는 흥미로운 개방 방향입니다. 이 목표를 향해, 우리는 Mixture-of-Agents (MoA) 방법을 통해 여러 LLM의 집단적 강점을 활용하는 새로운 접근 방식을 제안합니다.',
        'title': 'Mixture-of-Agents Enhances Large Language Model Capabilities',
        'link': 'https://arxiv.org/abs/2406.04692'
    },
    {
        'snippet': '첫째로, 우리는 답안 제공자들에 의해 생성된 답 중 하나를 선택하기 위해 집계 모델을 사용하는 LLM 기반 순위 결정기를 Mixture-of-Agents와 비교합니다. 쓰기 결과는 Figure 4에 나와 있으며 MoA 접근 방식이 LLM-순위 결정층 베이스라인을 크게 능가함을 관찰할 수 있습니다.',
        'title': 'Mixture-of-Agents Enhances Large Language Model Capabilities - arXiv.org',
        'link': 'https://arxiv.org/html/2406.04692v1'
    },
    {
        'snippet': '우리는 여러 LLM의 집단적 강점을 활용하여 최첨단 품질을 향상시키기 위한 Mixture of Agents (MoA) 접근 방식을 소개합니다. 그리고 우리는 상태-of-the-art의 품질을 향상하기 위해 여러 오픈소스 LLM 에이전트들을 활용하는 참조 구현인 Together MoA을 제공합니다. Together MoA는 AlpacaEval 2.0에서 65.1%의 점수를 달성하여 이전 리더 GPT-4o (57.5%)를 능가합니다.',
        'title': 'Together MoA — collective intelligence of open-source models pushing ...',
        'link': 'https://www.together.ai/blog/together-moa'
    },
    {
        'snippet': '이 목표를 향해, 여러 LLM의 집단적 강점을 Mixture-of-Agents (MoA) 방법론을 통해 활용하는 새로운 접근 방식을 제안합니다. 우리의 접근 방식에서는 각 층이 여러 LLM 에이전트로 이루어진 층화식 MoA 아키텍처를 구성합니다. 각 에이전트는 이전 층에서 생성된 모든 출력을 보조 정보로 받습니다.',
        'title': 'Mixture-of-Agents Enhances Large Language Model Capabilities',
        'link': 'https://huggingface.co/papers/2406.04692'
    },
    {
        'snippet': 'Mixture of Agents (MoA)는 여러 LLM의 집단적 강점을 활용하여 성능을 향상시키는 혁신적인 접근 방식으로, 최첨단 결과를 달성합니다. 각 층이 여러 LLM 에이전트로 이루어진 층화 구조를 사용하여 MoA는 65.1%의 점수로 AlpacaEval 2.0에서 GPT-4 Omni의 57.5%를 크게 능가합니다.',
        'title': 'GitHub - togethercomputer/MoA',
        'link': 'https://github.com/togethercomputer/moa'
    }
]
```

결과가 정확히 5개인 것을 확인할 수 있습니다. 하지만 텍스트가 짧네요! 이 짧은 조각 텍스트는 구체적인 사실적 질문에 사용할 수는 있지만 새로운 지식 베이스를 구축하기에는 부족합니다!

<div class="content-ad"></div>

좋은 점은 링크도 얻었다는 것이에요 🤣

![image](/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_2.png)

# 스니펫에서 문서로

GitHub 레포지토리를 하나씩 검색하면서 쉽고 완벽한 웹 검색을 찾고 있었는데, newspaper3k를 만나기 전까지요.

<div class="content-ad"></div>

이 Python 라이브러리는 검색 엔진 결과에서 전체 텍스트를 얻기 위한 입구입니다. 그게 전부가 아닙니다!

nltk 라이브러리도 함께 사용되기 때문에 키워드, 설명, 이미지 URL 및 요약과 같은 다양한 메타데이터로 정보를 보완할 수 있습니다!

Google Colab에서 항상 살펴봅시다.

```js
from newspaper import Article
import nltk
nltk.download('punkt')
```

<div class="content-ad"></div>

웹 페이지 텍스트 추출 함수들은 정말 쉽게 사용할 수 있어요. NLTK 기능을 포함하려면 우선 Punkt를 다운로드해야 해요.

NLTK에서 Punkt는 문장 토큰화에 사용되는 비지도 학습 가능한 모델이에요. 이 모델은 문장을 단어로 나누어 문장 시작 단어, 전치사구, 약어에 대한 모델을 개발함으로써 문장을 분리해요.

이제 우리가 작은 Neural toolkit를 준비했으니 웹 페이지에서 가능한 모든 것을 추출해 봅시다. 이전 DuckDuckGo 검색에서 추출된 링크 중 하나를 사용할 수 있어요: https://www.together.ai/blog/together-moa

```js
url = 'https://www.together.ai/blog/together-moa'
article = Article(url) # payload requests를 불러와요
article.download()     # 로컬로 데이터와 메타데이터를 버퍼링해요
article.parse()        # 텍스트 추출
article.nlp()          # 키워드와 요약을 위해 nlp 도구 실행
```

<div class="content-ad"></div>

이제 모든 것이 처리되었으니 데이터를 살펴볼 수 있어요:

```js
print(article.text)
---
우린 Mixture of Agents (MoA)를 소개합니다. 이는 여러 LLM들의 집합적인 강점을 활용하여 최신 기술 수준을 향상시키는 접근법입니다. 또한 우리는 몇몇 오픈 소스 LLM 에이전트를 이용하여 65.1%의 점수를 얻는 Together MoA라는 참조 구현을 제공합니다. 이로써 이전 리더인 GPT-4o (57.5%)를 능가했습니다.\n\n그림 1: 에이전트 혼합 구조의 그림. 이 예시 ...


print(article.authors)

print(article.keywords)
---
['에이전트', '20', '전선', '성능', '모델', 'qwen1510bchat', '응답', 'moa', 'llm', '집단', '오픈소스', 'alpacaeval', '제안자', '인텔리전스', 'gpt4o', '능력강화']

print(article.summary)
---
우리는 Mixture of Agents (MoA)를 소개합니다. 이는 여러 LLM들의 집단적인 강점을 활용하여 최신 기술 수준을 향상시키는 접근법입니다.
개요: 새로운 방법인 Mixture of Agents (MoA)를 소개하게 되어 기쁩니다. 이는 여러 LLM들의 집단적인 강점을 활용하는 혁신적인 접근법입니다.
우리의 참조 구현인 Together MoA는 오직 오픈 소스 모델을 사용하여 AlpacaEval 2.0에서 57.5%인 GPT-4o를 크게 능가하며 65.1%의 점수를 얻습니다.
그림 2는 각 모델이 AlpacaEval 2.0에서 기존 점수를 크게 개선함을 보여줍니다. 특히, 오픈 소스 모델만을 사용하여 AlpacaEval 2.0에서 우리는 57.5% (GPT-4o)에서 65.1% (Together MoA)로 7.6%의 절대 향상을 이룩했습니다.

print(article.meta_description)

print(article.meta_img)
https://cdn.prod.website-files.com/650c3b59079d92475f37b68f/6667e9c28da8569e846b4632_thumbnail.jpg

print(article.meta_keywords)
['']
```

정말 멋지다고 생각해요!

이 몇 줄의 코드로 전체 텍스트와 중요한 메타데이터를 검색했어요. 웹 리소스가 정말 좋은 경우 날짜와 주 이미지도 간단히 이렇게 얻을 수 있답니다:

<div class="content-ad"></div>


```js
article.top_image
article.publish_date
```

![image](/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_3.png)

# 그럼 이제 어떻게 하죠? 자체 문서 저장소 만들기

지금까지 말한 모든 것들은 데이터/정보가 생성 AI 애플리케이션에 있어 핵심이라는 것을 고려할 때에만 관련이 있습니다. LLM은 이제 NLP 작업을 뛰어나게 수행하므로 좋은 텍스트가 필요합니다.


<div class="content-ad"></div>

여기서 더 나아가 봅시다! 웹 검색 쿼리를 입력하면 데이터를 풍부하게 모아서 표준 Langchain 형식으로 정리하는 파이프라인을 직접 만들 수 있습니다. 언제든지 사용할 준비가 완료되었어요!

## Wrapper 실행

```js
from newspaper import Article
import pickle
from rich.markdown import Markdown
import datetime
from rich.console import Console
from langchain.schema.document import Document
console = Console(width=90)
import nltk
# DuckDuckGo 검색 엔진 래퍼 준비
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper
wrapper = DuckDuckGoSearchAPIWrapper(region='us-en', time="y", max_results=10) #time parameter Options: d, w, m, y
# 사용자 쿼리 요청
console.print(f'[bold red1]무엇을 검색하시겠습니까?')
research = console.input(f'[bright_green]> ')
console.print(90*'=')
# Wrapper 실행
rawdb = wrapper.results(research,max_results=5)
```

저는 아이작 아시모프의 원자 폭탄에 대한 이야기를 찾아보겠습니다. 그런 다음 예상 출력 형식을 사용하여 데이터베이스를 구축할 거에요. 다시 설명드리자면, 예상 형식은 다음과 같습니다:

<div class="content-ad"></div>

```js
[
  {
    'snippet': '비디오 콜 - 아이작 아시모프 - 다양한 패운데이션 이야기 (1950년대+) 패운데이션 시리즈는 거대한 시간과 공간을 다룹니다. ... 원자폭탄 - H.G. 웰스 - The World Set Free (1914)',
    'title': '과학 소설이 미래 기술을 예언한 10가지 시간 - 디스트로이드',
    'link': 'https://www.destructoid.com/10-times-sci-fi-predicted-the-future-of-technology/'
  },
  {
    'snippet': '밤바람과 다른 이야기들. 아이작 아시모프의 최고의 과학 소설. 전체...'
  }
]
```

여기에서 이미 황금 광산을 발견했어요: 우리는 DDG 검색 필드에서 제목, 스니펫 및 링크를 얻을 수 있어요.

## 신문 NLP 도구와 Wrapper 결과 병합

이제 rawdb 리스트를 반복하고 각 URL을 사용하여 newspaper3k를 실행할 수 있습니다. 더 똑똒하게 만들기 위해 반복 중 LangChain Document 객체를 만들어요.

<div class="content-ad"></div>

```python
docdocs = []
for items in rawdb:
    url = items["link"]
    try:  # 만약 URL에 접속할 수 없다면 유용합니다
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()
        kw = []
        # NLTK 키워드와 메타 웹페이지 키워드를 병합합니다
        for i in article.keywords + article.meta_keywords:
            if i == '':  # 우리에게는 블랙 키워드가 없습니다
                pass
            else:
                kw.append(i)
        if article.text == '':  # 때로는 구문 분석할 텍스트가 없습니다. 그래서 스니펫을 사용합니다
            docdocs.append(Document(page_content=items["snippet"], metadata={
                'source': items["link"],
                'title': items["title"],
                'snippet': items["snippet"],
                'author': article.authors,
                'keywords': kw,
                'meta_description': article.meta_description,
                'meta_img': article.meta_img,
                'top_image': article.top_image,
                'publish_date': article.publish_date,
                'summary': article.summary}))
        else:
            docdocs.append(Document(page_content=article.text.replace('\n\n', ''), metadata={
                'source': items["link"],
                'title': items["title"],
                'snippet': items["snippet"],
                'author': article.authors,
                'keywords': kw,
                'meta_description': article.meta_description,
                'meta_img': article.meta_img,
                'top_image': article.top_image,
                'publish_date': article.publish_date,
                'summary': article.summary}))
    except:
        pass
```

이제 변수 docdocs에는 메타데이터가 풍부한 LangChain 문서 목록이 있습니다. 이를 FAISS와 같은 벡터 데이터베이스에서 직접 사용하거나 로컬 파일에 저장할 수 있습니다. 저는 두 번째 옵션을 선호합니다. 그 이유는 언제든지 이러한 문서를 나중에 병합할 수 있기 때문입니다.

따라서 나는 이러한 문서를 저장하기 위해 피클 형식을 선택한 것입니다. pickle 모듈은 Python 표준 라이브러리에 포함되어 있습니다. Python 개체 구조를 직렬화하고 역 직렬화하기 위한 이진 프로토콜을 구현합니다.

“Pickling”은 Python 개체 계층 구조를 바이트 스트림으로 변환하는 프로세스이며, “unpickling”은 그 반대 작업으로, 바이너리 파일 또는 바이트류 객체에서 바이트 스트림을 개체 계층 구조로 변환하는 작업입니다.


<div class="content-ad"></div>

```js
## 메타데이터와 함께 문서 세트를 pickle에 저장합니다.
lcdfilename = research.replace(' ','_')+'.lcd'
output = open(lcdfilename, 'wb')
pickle.dump(docdocs, output)
output.close()
console.print(Markdown("> LangChain 문서 데이터가 저장되었습니다..."))
```

이제 LangChain 문서를 가지고 로컬 모델을 실행해 볼 수 있어요. 여기에 하나의 도전 과제가 있네요: 왜 llama-cpp-python만 사용해서 시도해 보지 않으세요?

# 결론

Web 검색 및 자연어 처리(NLP) 도구를 이용하여 최신 및 관련 데이터로 언어 학습 모델(LLM)를 풍부하게 하는 혁신적인 접근 방식을 함께 탐색했습니다.

<div class="content-ad"></div>

이와 같은 전략들은 계산 요구 사항과 무료 데이터의 부족으로 인한 제한을 극복하는 데 중요합니다.

어고노스틱 LLM을 달성하기 위해, 외부 지식 소스를 통합하여 LLM 응답의 정확성과 신뢰도를 향상시키는 Retrieval Augmented Generation (RAG) 기술이 결정적인 기법으로 부상합니다.

저희는 웹 검색 엔진과 newspaper3k와 같은 NLP 라이브러리를 도구로 사용하여 온라인 리소스로부터 전체 텍스트와 가치 있는 메타데이터를 추출하고, 간략한 스니펫을 포괄적인 문서로 변환했습니다.

이 프로세스는 생성 모델의 잘라내기 날짜 제한을 우회하는 것뿐만 아니라 개인화된 문서 저장소를 생성하는 것을 용이하게 합니다.

<div class="content-ad"></div>

무서워하지 마시고 실험해보세요. 하지만 항상 기억하세요, 도구는 좋거나 나쁘지 않습니다! 도구는 사용하는 사람만큼 좋습니다!

만약 이 이야기가 가치 있었고 조금이라도 지원을 보내고 싶다면, 다음을 해볼 수 있습니다:

- 이 이야기에 대해 많이 박수를 보내기
- 기억할 가치가 있는 부분을 강조하기 (나중에 찾기가 쉽고, 나는 더 나은 기사를 쓸 수 있습니다)
- '자체 AI 구축 방법 배우기, 이 무료 eBook 다운로드하기'
- 내 링크를 통해 Medium 멤버십 가입하기 ($5/월로 무제한 Medium 이야기 읽기)
- Medium에서 나를 팔로우하기
- 내 최신 기사를 읽기: https://medium.com/@fabio.matricardi

더 많은 내용을 보고 싶다면, 다음은 몇 가지 아이디어입니다:

<div class="content-ad"></div>

구글 Colab 노트북이 있는 GitHub 저장소

![GitHub Repository](/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_4.png)

이 이야기는 Generative AI에서 발행되었습니다. 최신 AI 이야기를 알고 싶다면 LinkedIn에서 저희와 연결하고 Zeniteq를 팔로우하세요.

저희의 뉴스레터에 가입하여 최신 generative AI 뉴스와 업데이트를 받아보세요. 함께 AI의 미래를 함께 만들어 봅시다!

<div class="content-ad"></div>

`![2024-06-20-MaketheWebyourbestfrienddataprovider_5.png](/assets/img/2024-06-20-MaketheWebyourbestfrienddataprovider_5.png)`