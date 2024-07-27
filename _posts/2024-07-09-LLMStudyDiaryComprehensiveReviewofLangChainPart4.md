---
title: "LangChain 심층 분석  Part 4 최신 LLM 스터디 다이어리"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-LLMStudyDiaryComprehensiveReviewofLangChainPart4_0.png"
date: 2024-07-09 09:23
ogImage:
  url: /assets/img/2024-07-09-LLMStudyDiaryComprehensiveReviewofLangChainPart4_0.png
tag: Tech
originalTitle: "LLM Study Diary: Comprehensive Review of LangChain — Part 4"
link: "https://medium.com/@mizutori/llm-study-diary-comprehensive-review-of-langchain-part-4-566fb1bbea0d"
---

오늘은 Greg Kamradt의 "The LangChain Cookbook - 7 Core Concepts"의 나머지 챕터들을 끝까지 리뷰하겠습니다!

- Indexes - 문서를 LLM이 작업하기 쉽도록 구조화하는 것

- 문서 로더

원본 코드의 이 부분은 변경 없이 작동했습니다. 그러나 다양한 문서 로더에 대한 참조 링크가 깨져 있어서 해당 로더를 검색했습니다. 현재 지원되는 문서 로더 목록은 아래와 같습니다.

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

# URL 및 웹페이지

unstructured 모듈을 설치해야 합니다.

```js
!pip install unstructured
```

만약 이 모듈이 설치되어 있다면, 원래 코드가 작동될 것입니다.

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

아래와 같은 표를 Markdown 형식으로 변경해주세요.

| Header One | Header Two |
| ---------- | ---------- |
| Item One   | Item Two   |

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

faiss를 설치해야 합니다. CPU만 사용하는 경우 다음과 같이 설치할 수 있습니다:

```js
!pip install faiss-cpu
```

(Nvidia GPU를 사용하는 머신의 경우, 다음 명령을 사용할 수 있습니다: !pip install faiss-gpu)

다음으로, OpenAIEmbeddings의 import 문을 블로그 포스트 Part 2에서 한 것처럼 변경하겠습니다.

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
#langchain.embeddings에서는 OpenAIEmbeddings를 사용합니다.
from langchain_openai import OpenAIEmbeddings
```

저는 `get_relevant_documents` 대신 `invoke`를 사용했습니다.

```js
# docs = retriever.get_relevant_documents("저자가 건설하고 싶어했던 것의 종류는 무엇인가요?")
docs = retriever.invoke("저자가 건설하고 싶어했던 것의 종류는 무엇인가요?")
```

이 두 가지 변경으로 원래 코드가 작동하게 되었고, 벡터 저장소를 사용하여 LLM에서 응답을 받을 수 있었습니다.

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

# VectorStores

이것도 아래와 같이 OpenAIEmbeddings 클래스의 import 소스를 변경함으로써 쉽게 작동합니다.

```js
#from langchain.embeddings import OpenAIEmbeddings
from langchain_openai import OpenAIEmbeddings
```

# Memory

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

원래 코드는 그대로 작동합니다. Langchain의 다양한 메모리 유형 목록에 대한 링크가 깨져 있어 찾아보았습니다. 아래에서 확인할 수 있습니다.

# 체인

SimpleSequentialChain 및 LLMChain이 사용되지 않게 되어 전체적으로 많은 변경을 해야 했습니다. 아래 정보에 따르면 LLMChain 대신 RunnableSequence를 사용하라고 나와 있어서 이 안내에 따르기로 결정했습니다.

두 개 이상의 RunnableSequence를 결합하는 방법을 찾지 못해 당황했습니다. LangChain 문서를 살펴본 결과 아래와 같이 "다중 체인"이라는 문서를 발견했습니다.

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

여기에 작성된 샘플을 참고하여, StrOutputParser를 통해 두 ChatPromptTemplate을 결합해보려고 했고, Cookbook처럼 작동하는 체인을 생성할 수 있었습니다.

```js
from operator import itemgetter

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

prompt1 = ChatPromptTemplate.from_template(
"""사용자가 제안한 지역의 고전 요리를 생각해 내는 것이 당신의 일입니다.
% 사용자 위치
{user_location}

당신의 응답:
"""
)

prompt2 = ChatPromptTemplate.from_template(
"""한 끼 식사가 주어지면, 그 요리를 집에서 어떻게 만들 수 있는 간단한 레시피를 제시해 주세요.
% 요리
{user_meal}

당신의 응답:
"""
)

model = ChatOpenAI(temperature=0, openai_api_key=openai_api_key)

chain1 = prompt1 | model | StrOutputParser()
chain2 = {"user_meal": chain1} | prompt2 | model | StrOutputParser()

chain2.invoke({"user_location": "Paris"})
```

ChatPromptTemplate를 모델과 StrOutputParser에 연결하여 객체를 생성했습니다. Prompt1을 모델에 입력하고 출력 AIMessage를 StrOutputParser를 통해 문자열로 변환했습니다. 이 체인1의 출력에서 "user_meal": "chain1 출력"과 같은 PromptTemplate의 입력을 만들고, prompt2에 연결하여 모델 → StrOutputParser로 연결합니다. 완성된 체인에 "Paris"를 user_location으로 입력했을 때 결과는 다음과 같습니다:

‘집에서 Coq au Vin을 만들려면, 큰 냄비에 베이컨을 볶아주세요. 베이컨을 꺼내고 베이컨 기름에 닭 조각을 볶아주세요. 다진 양파와 버섯을 넣고 레드 와인과 치킨 육수를 부어주세요. 약 1시간 정도 닭이 익고 소스가 농도가 될 때까지 강한 불에서 조리해주세요. 베이글이나 감자 퓨레 위에 또는 후식으로 인기 많은 Crusty Bread와 함께 뜨거운 상태로 제공하세요. 집에서 만든 Coq au Vin을 즐기세요!’

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

chain1의 출력물은 "Coq au Vin"입니다. 그 입력을 사용하여 chain2는 "Coq au Vin"을 어떻게 만드는지 설명합니다. Coq au Vin은 나에게는 전혀 익숙하지 않았던 요리였지만, 빨갛게 푹 구운 수탉 요리인 것 같습니다... 그 요리 이름이 전혀 익숙하지 않아서 사용자 위치로 오사카를 입력해보았더니:

```js
chain2.invoke({ user_location: "Osaka" });
```

아래와 같이 오떼노미야키를 만드는 방법을 안내해주었습니다. 이를 통해 드디어 제대로 작동하고 있다는 느낌이 들었습니다.

'집에서 오떼노미야키를 만들려면, 그릇에 밀가루 1컵, 갈아 만든 야무 1컵, 달걀 2개, 다진 양배추 1컵을 섞어주세요. 돼지고기, 새우 또는 채소와 같은 자신의 선택한 토핑을 추가하세요. 팬이나 비스듬한 팬을 예열하고 형태를 부여하여 배터를 담구면을 붓세요. 각 면이 황금색이 될 때까지 며칠씩 조리하세요. 오떼노미야키를 달콤하고 매콤한 소스, 마요네즈, 윗부분에 가는 안주 살짝 뿌려서 내세요. 만들어진 오떼노미야키를 즐기세요!'

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

# 요약 체인

Cookbook의 코드 부분은 변경 없이 작동했기 때문에 넘어갈게요.

# 에이전트

먼저, google-search-results 모듈을 설치해야 했어요.

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
!pip install google-search-results
```

아래 링크에서 SERP_API_KEY를 얻었습니다.

키를 SERP_API_KEY 환경 변수에 저장했습니다.

```js
from dotenv import load_dotenv
import os

load_dotenv()

serp_api_key=os.getenv('SERP_API_KEY', 'your_api_key')
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

가장 큰 변화는 initialize_agent 함수가 사용되지 않게 되어서 Agent를 호출하는 방법을 근본적으로 변경해야 했다는 것이었습니다.

```js
from langchain.agents import load_tools
# from langchain.agents import initialize_agent
from langchain.llms import OpenAI
import json
from langchain import hub
from langchain.agents import AgentExecutor, create_react_agent

llm = OpenAI(temperature=0, openai_api_key=openai_api_key)
toolkit = load_tools(["serpapi"], llm=llm, serpapi_api_key=serp_api_key)
# agent = initialize_agent(toolkit, llm, agent="zero-shot-react-description", verbose=True, return_intermediate_steps=True)
prompt = hub.pull("hwchase17/react")
agent = create_react_agent(model, toolkit, prompt)
agent_executor = AgentExecutor(agent=agent, tools=toolkit, verbose=True)
agent_executor.invoke({"input":"what was the first album of the"
                    " band that Natalie Bergman is a part of?"})
```

원래 코드는 "zero-shot-react-description"이라는 메모리가 없는 ReAct 프레임워크 에이전트의 인스턴스를 생성했기 때문에, 아래 정보를 참고하여 코드를 다시 작성했습니다.

ReAct라는 용어는 익숙하지 않았지만 아래 설명대로 보면, 추론과 행동을 연결하고 이를 통해 얻은 피드백을 사용하여 다음 추론 단계로 넘어가는 에이전트 구성 방식인 것 같습니다.

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

이 샘플에 사용된 프롬프트는 LangSmith에서 공개된 프롬프트이며, 해당 프롬프트의 내용을 아래에서 확인할 수 있었습니다.

이 에이전트를 상세 모드로 실행할 때 아래와 같은 추론 프로세스가 실행되고 있다는 것을 확인할 수 있었습니다.

![이미지](/TIL/assets/img/2024-07-09-LLMStudyDiaryComprehensiveReviewofLangChainPart4_0.png)

최종 답변은 다음과 같았습니다:

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
{'input': '나탈리 베르그먼이 소속된 밴드의 첫 앨범은 무엇인가요?',
'output': 'Wild Belle'}
```

원래 질문은 "나탈리 베르그먼이 속한 밴드의 첫 앨범은 무엇인가요?"였습니다. 다시 말해서 "나탈리 베르그먼이 속한 밴드의 첫 앨범의 이름을 알려주세요"였습니다. 그러나 최종 답변은 그녀가 속한 밴드의 이름이 나왔습니다. 로그를 보니, 에이전트가 문제를 이해하지 못한 것으로 보입니다.

카름 레이 안사생님은 유튜브 비디오에서 에이전트 기술이 아직 발전 중이라고 언급했습니다. 그러나 Langchain을 사용할 때 이러한 추론이 어떻게 진행되는지 로그를 확인하는 것이 유용할 수 있을 것 같으므로, 앞으로 다양한 에이전트를 살펴보는 기회를 더 만들고 싶습니다.

이를 통해 카름 레이 안사생님의 "The LangChain Cookbook — 7 Core Concepts"의 모든 레시피를 마지막 레시피를 포함하여 제가 작업하며 성공적으로 수행했습니다.

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

때로는 너무 많은 것이 더 이상 사용되지 않아서 포기해야 한다고 생각했던 적이 있었지만, 모든 샘플이 성공적으로 작동되었어요.

이 과정에서 살펴보지 못한 관련된 여러 가지 사항들이 있어서, 그것들을 모두 조사하고 다른 샘플들을 탐구하여 가능하다면 다른 노트에서 소개하고 싶어요.

독서해 주셔서 감사합니다!

네 목차 블로그 시리즈 끝까지 읽어 주셔서 감사합니다. 이 게시물들이 유익하고 통찰력있었기를 바랍니다. 여러분의 지속적인 관심은 저에게 AI 및 언어 기술에 대한 지식을 공유하는 동기가 되었어요.

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

현재 시리즈를 마침하지만, AI 및 언어 기술에 대한 여정은 아직 끝나지 않았습니다. 이 블로그에 대한 질문이나 OpenAI API, LLM 또는 LangChain과 관련된 개발 프로젝트에 관심이 있다면 저에게 연락해 주세요.

Goldrush Computing에서는 일본어 원어민을 보유한 일본 기업으로서의 전문성을 자랑합니다. 우리는 일본어와 문화에 맞춘 프롬프트 및 RAG 시스템을 개발하는 것에 특화되어 있습니다. 일본 시장용 AI 솔루션을 최적화하거나 일본어 애플리케이션을 개발하려는 경우, 저희는 도와드릴 준비가 되어 있습니다. 일본에 특화된 AI 최적화가 필요한 협업이나 프로젝트가 있다면 망설이지 말고 연락해 주세요.

아래 이메일 주소로 직접 연락해 주세요!

```js
mizutori@goldrushcomputing.com
```
