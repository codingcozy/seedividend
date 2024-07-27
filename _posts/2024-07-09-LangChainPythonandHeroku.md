---
title: "2024년 최신 LangChain, Python, Heroku 사용 방법 실제 사용 사례와 팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_0.png"
date: 2024-07-09 20:59
ogImage:
  url: /assets/img/2024-07-09-LangChainPythonandHeroku_0.png
tag: Tech
originalTitle: "LangChain, Python, and Heroku"
link: "https://medium.com/gitconnected/langchain-python-and-heroku-f87369a258dc"
---

<img src="/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_0.png" />

## 커피숍에서 코딩하기

2022년 말 이후 ChatGPT의 출시 및 널리 사용되면서 대형 언어 모델(LLM) 및 생성적 AI(GenAI)에서 비롯된 도구, 제품 및 혁신에 대한 뉴스 폭풍이 몰려왔습니다. 많은 기술 유행이 몇 년 내에 사라지는 반면, LLM 및 GenAI가 여기에 남아있음이 분명합니다.

이러한 새로운 도구와 제품의 배경에 이어지는 다양한 도구들과 제품들에 대해 궁금한 적이 있나요? 또한 개발자와 최종 사용자 모두가 활용하는 이러한 도구들이 어떻게 운영되는지 궁금해할 수도 있습니다. 이러한 도구와 응용 프로그램 중 많은 경우, LangChain, Python 및 Heroku를 알 수 있습니다.

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

이 문서에서는 다룰 조각들입니다. 인공 지능/기계 학습 개발자들이 이들을 사용하여 복잡한 LLM 파이프라인 구성 요소를 구축하고 쉽게 배포하는 실제 예시를 살펴보겠습니다.

# LLM 워크플로우와 파이프라인 해독하기

기계 학습 파이프라인과 워크플로우는 AI 세계에 입문한 이들에게는 불투명해 보일 수 있습니다. 특히 LLM과 그와 관련된 도구에서는 더 그렇습니다. 왜냐하면 이들은 (비교적으로) 새로운 기술들이기 때문입니다. LLM을 처리하는 것은 도전적일 수 있습니다. 특히 엔지니어링이 강화되고 제품용으로 준비된 파이프라인, 워크플로 및 배포를 만들려고 할 때입니다. 새로운 도구들, 빠르게 변화하는 문서 및 제한된 지침들로 인해 어디서부터 시작하거나 무엇을 사용해야 할지를 알기 어려울 수 있습니다. 그래서 LangChain과 Heroku의 기본부터 시작해 봅시다.

LangChain의 문서에는 다음과 같이 나와 있습니다: "LangChain은 언어 모델을 기반으로 한 애플리케이션을 개발할 수 있는 프레임워크입니다."

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

한편, Heroku는 다음과 같이 자신을 설명합니다: "Heroku는 회사가 앱을 구축, 전달, 모니터링 및 확장할 수 있는 클라우드 플랫폼입니다. 아이디어에서 URL로 이동하는 가장 빠른 방법입니다. 모든 인프라 문제를 우회합니다."

이를 LLM 애플리케이션 구축의 맥락으로 놓으면, LangChain과 Heroku는 최고의 조합입니다. 우리는 LLM 애플리케이션을 구축하기 위해 테스트된 쉬운 프레임워크(LangChain)가 필요하고, 그 애플리케이션을 배포하고 호스팅할 방법(Heroku)이 필요합니다.

이제 각 기술에 대해 자세히 살펴보겠습니다.

## LangChain 탐구하기

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

LangChain을 사용하는 방법에 대해 간단히 이야기해 봅시다. LangChain은 LLM 모델과 사용 사례를 기반으로 한 애플리케이션을 개발하는 개발자들을 지원하는 프레임워크입니다. Python, JavaScript, TypeScript를 지원합니다. 예를 들어, 사용자 입력에 기반을 둔 보고서를 생성하거나 고객 지원 응답을 자동화하는 도구를 개발 중이라고 가정해 봅시다. LangChain은 프로젝트의 골조로 작용하여 언어 모델을 효율적으로 솔루션에 통합할 수 있는 도구와 구조를 제공합니다.

LangChain 내에는 몇 가지 주요 구성 요소가 있습니다:

- 에이전트: 에이전트는 우리의 요구 사항에 따라 작업을 수행하기 위해 언어 모델과 상호 작용하는 구성 요소입니다. 이것은 우리 애플리케이션의 두뇌로, 언어 모델의 기능을 활용하여 텍스트를 이해하고 생성합니다.
- 체인: 에이전트가 작업을 수행하는 데 따르는 동작이나 프로세스의 시퀀스입니다. 예를 들어, 고객 지원을 자동화한다면 체인은 고객 질문 수락, 관련 정보 찾기, 그리고 응답 작성 등의 단계를 포함할 수 있습니다.
- 템플릿: 템플릿은 언어 모델의 출력을 구조화하는 방법을 제공합니다. 예를 들어, 애플리케이션이 보고서를 생성하는 경우, 모델의 출력을 기반으로 이러한 보고서를 일관되게 포맷하는 데 도움이 되는 템플릿을 활용할 것입니다.
- LangServe: 개발자가 LangChain 애플리케이션을 REST API로 배포하고 제공할 수 있도록 합니다.
- LangSmith: 이 도구는 언어 모델 애플리케이션의 상호 작용을 평가, 테스트 및 정제하여 제품을 상용화할 준비를 얻도록 도와줍니다.

LangChain은 인기 있는 AI 및 LLM 애플리케이션을 구축하기 위한 프레임워크이며, 그 이유를 쉽게 이해할 수 있습니다. LangChain은 제품을 끝까지 구축하고 배포하는 데 필요한 기능을 제공합니다.

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

## Heroku를 탐험해보세요

Heroku는 클라우드 플랫폼 서비스(PaaS)로서 애플리케이션을 클라우드에 간단하게 배포할 수 있게 해주어 가장 잘 알려져 있습니다. 개발자들은 주로 코드와 구현에만 집중하고 싶어합니다. 이미 복잡한 데이터 파이프라인과 LLM 기반 애플리케이션을 다루고 있을 때는 서버, 네트워크, 지속적인 저장소와 같은 인프라 문제를 다루는데 필요한 자원이나 전문지식이 부족할 수 있습니다.

Heroku를 통해 애플리케이션을 쉽게 배포할 수 있기 때문에 프로젝트를 제품화하는 주요 장벽이 손쉽게 처리됩니다.

# LangChain으로 빌드하기

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

LangChain이 LLM 애플리케이션에서 어떻게 사용되는지 더 잘 이해하기 위해 몇 가지 예제 문제를 통해 과정을 명확하게 알아보겠습니다. 일반적으로, LLM 체인을 구성하기 위해 다음 항목을 연결하여 단일 워크플로우를 형성합니다:

- 사용자의 매개 변수를 기반으로 프롬프트를 생성하는 프롬프트 템플릿으로 시작합니다.
- 언어 모델이 원래 훈련되지 않은 데이터를 검색하는 리트리버를 체인에 추가합니다(예: 문서 데이터베이스에서).
- 더 나은 응답을 형성하기 위해 언어 모델에 맥락을 제공하기 위해 채팅 기록을 포함하는 회화 검색 체이닝을 추가합니다.
- 실제 LLM과 상호 작용하는 에이전트를 추가합니다.

LangChain을 사용하면 LLM 애플리케이션의 기본을 형성하는 프로세스를 연결할 수 있습니다. 이는 우리의 구현을 쉽고 친근하게 만듭니다. 간단한 예제를 통해 함께 살펴보겠습니다.

이 예시에서는 OpenAI와 함께 작업하겠습니다. 프롬프트를 이렇게 작성해 보겠습니다:

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

안녕하세요! LangChain을 사용하고 계시다니 멋지네요! 여기 저희 훌륭한 가상 트레이너, OpenAI에게 문의하시면 됩니다. 사용자의 질문을 입력해 주세요. 요청하신 내용에 따라 OpenAI가 도움을 들어드리겠습니다. 함께 성공적인 코딩 여정을 시작해봐요!

Markdown 형식을 사용해 표를 만들어보세요:

| 컬럼1   | 컬럼2   |
| ------- | ------- |
| 데이터1 | 데이터2 |

그럼 좋은 하루 보내세요!

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

main.py라는 새 파일을 만들겠습니다. 우리의 기본 Python 코드는 다음과 같습니다:

```python
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

my_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly and encouraging fitness trainer."),
    ("user", "{input}")
])

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"])

chain = my_prompt | llm
```

여기서 그만입니다! 이 기본 예제에서는 LangChain을 사용하여 프롬프트 템플릿과 OpenAI 에이전트를 연결했습니다.

이를 명령줄에서 사용하려면 다음 코드를 추가해야합니다:

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
user_input = input("피트니스 목표와 관련된 질문을 하세요.\n");
response = chain.invoke({
  input: user_input,
});

print(response);
```

위에서 코드블록을 보면 우리 애플리케이션을 명령줄에서 테스트할 수 있습니다.

```js
(venv) $ OPENAI_API_KEY=insert-key-here python3 main.py
피트니스 목표와 관련된 질문을 하세요.
60초 동안 플랭크를 유지하는 방법은 무엇인가요?
content="60초 동안 플랭크를 유지하는 것은 좋은 목표입니다! 60초 동안 플랭크를 유지하기 위해선 올바른 자세로 시작하고 천천히 플랭크를 유지하는 시간을 늘려나가는 것이 중요합니다. 진행하는 데 도움이 될 몇 가지 팁을 드리겠습니다:\n\n1. 짧은 시간으로 시작하기: 자세를 잘 유지한 채로 플랭크를 유지할 수 있는 시간부터 시작해보세요. 몇 초만이라도 괜찮으니 강해지면서 시간을 늘려가세요.\n\n2. 올바른 자세에 집중하기: 머리부터 발끝까지 직선으로 몸을 유지하고 복부 근육을 사용하며 어깨를 팔꿈치 바로 위에 유지하세요.\n\n3. 꾸준히 연습하기: 매주 몇 번씩 플랭크를 운동 루틴에 포함시키도록 노력해보세요. 꾸준함이 힘과 인내를 키우는 데 중요합니다.\n\n4. 다양한 플랭크 도전하기: 사이드 플랭크나 다리를 들거나하는 등 다양한 플랭크 변형을 시도하여 다른 근육 꾸러미에 작용하고 운동을 도전스럽게 유지하세요.\n\n5. 몸의 신호를 듣기: 자신을 밀어내는 것도 중요하지만 자신의 한계를 알아야 합니다. 통증이나 불편함을 느낀다면 멈추고 휴식을 취하세요.\n\n기억하세요, 발전에는 시간과 인내가 필요합니다. 새로운 플랭크 기법을 마스터하거나 몇 초 더 플랭크를 유지한다든지하는 모든 단계를 축하하세요. 당신은 할 수 있어요!"
```

(가독성을 위해 위에서 줄 바꿈을 추가했습니다.)

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

그것은 훌륭한 시작이에요. 하지만 출력물을 조금 더 사람이 읽기 쉬운 형식으로 포맷팅하는 것이 좋겣죠. 이를 위해 단순히 체인에 출력 파서를 추가하면 됩니다. StrOutputParser를 사용할 거에요.

```js
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

my_prompt = ChatPromptTemplate.from_messages([
    ("system", "당신은 친절하고 격려하는 피트니스 트레이너입니다."),
    ("user", "{input}")
])

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"))
output_parser = StrOutputParser()

chain = my_prompt | llm | output_parser

user_input = input("당신의 피트니스 목표에 관한 질문을 해주세요.\n")
response = chain.invoke({
  "input": user_input
})

print(response)
```

이제 명령행에서 우리의 애플리케이션이 이렇게 보일 거에요:

```js
(venv) $ OPENAI_API_KEY=insert-key-here python3 main.py
당신의 피트니스 목표에 관한 질문을 해주세요.
피스톨 스쿼트를 어떻게 배우나요?
그것은 훌륭한 목표에요! 피스톨 스쿼트는 도전적일 수 있지만, 연습과 인내로 꼭 배울 수 있어요.

피스톨 스쿼트를 연습하기 위해 다음 단계를 따라가보세요:

1. 스쿼트, 런지, 스텝업과 같은 운동으로 하체 근력을 키워보세요.
2. 단일다리 균형 운동을 통해 균형과 안정성을 향상시켜보세요.
3. 벤치나 의자 위로 몸을 내려친다는 부분적인 피스톨 스쿼트를 연습한 후 점차 전체적인 피스톨 스쿼트를 수행할 수 있게 되세요.
4. TRX 밴드나 막대기와 같은 지원 도구를 사용하여 균형 유지와 몸을 내려치는 데 도움을 받아, 충분한 근력을 쌓아 무도도 수행할 수 있도록 하세요.

피스톨 스쿼트를 시도하기 전에 반드시 웜업을 실시하고 부상을 피하기 위해 몸의 신호를 들어주는 것을 잊지 마세요. 그리고 가장 중요한 것은, 이 도전적인 운동을 마스터하는 데 노력하는 동안 긍정적이고 인내심을 가지세요. 당신은 할 수 있어요!
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

LLM 응담은 가독성을 향상시키기 위해 형식화되었습니다.

강력한 LLM 애플리케이션을 구축하기 위해, 우리의 체인은 이보다 훨씬 더 복잡할 것입니다. 그렇지만 그것이 LangChain의 강점이자 간결함입니다. 프레임워크는 당신의 필요에 맞는 로직을 모듈화할 수 있도록 해줘서 복잡한 워크플로우를 쉽게 연결할 수 있습니다.

간단한 LLM 애플리케이션을 만들었으니, 여전히 우리 애플리케이션을 배포하고 호스팅하며 서비스하기 위한 능력이 필요합니다. 인프라보다 앱 빌드에 초점을 맞춘 개발자로써, LangServe와 Heroku에 의존합니다.

# LangServe로 서비스 하기

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

LangServe는 LangChain 체인과 상호 작용할 수 있도록 REST API를 통해 도와줍니다. LangChain LLM 애플리케이션의 서빙 부분을 작성하기 위해 세 가지 주요 구성 요소가 필요합니다:

- 유효한 체인 (우리가 위에서 구축한 것과 같이)
- API 애플리케이션 프레임워크 (예: FastAPI)
- 라우트 정의 (REST API를 구축할 때와 같이)

LangServe 문서에는 시작하는 방법에 대한 유용한 예제가 제공됩니다. 우리 예제에서는 FastAPI를 사용하여 API 서버를 시작하고 LangServe의 add_routes()를 호출하여 체인을 API 엔드포인트를 통해 접근 가능하게 만들면 됩니다.

이와 함께 기존 코드를 약간 수정해야합니다.

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

- 우리는 StrOutputParser의 사용을 제거할 것입니다. 이렇게 하면 API를 호출하는 사용자들이 출력을 어떻게 형식화하고 사용할지에 대해 유연성을 가질 수 있습니다.
- 명령 줄에서 사용자 입력을 요청하지 않을 것입니다. API 호출 요청이 사용자의 입력을 제공할 것입니다.
- chain.invoke()를 호출하지 않을 것입니다. LangServe가 API 요청 처리의 일부로 이를 처리할 것입니다.

우리는 프로젝트에 FastAPI와 LangServe 패키지를 추가했음을 확인합니다:

```js
(venv) $ pip install langserve fastapi
```

우리의 최종 main.py 파일은 다음과 같습니다:

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
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from fastapi import FastAPI
from langserve import add_routes

my_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly and encouraging fitness trainer."),
    ("user", "{input}")
])

llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"))

chain = my_prompt | llm

app = FastAPI(title="Fitness Trainer")

add_routes(app, chain)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
```

내 로컬 머신인 우분투 20.04.6 LTS에서는 Python 3.8.10을 실행 중이었는데, 몇 가지 경고 메시지를 제거하기 위해 추가 패키지를 설치해야 했습니다. 당신의 머신에서는 이 작업이 필요하지 않을 수도 있어요.

```shell
(venv) $ pip install sse_starlette pydantic==1.10.13
```

이제 서버를 시작해 볼까요?

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

(venv) $ OPENAI_API_KEY=insert-key-here python3 main.py

INFO: 서버 프로세스 시작 [629848]
INFO: 애플리케이션 시작을 기다리는 중.

LANGSERVE: "/" 경로의 Playground이 활성화되었습니다:
LANGSERVE: │
LANGSERVE: └──> /playground/
LANGSERVE:
LANGSERVE: 사용 가능한 모든 경로는 /docs/에서 확인할 수 있습니다.

INFO: 애플리케이션 시작 완료.
INFO: Uvicorn이 http://localhost:8000에서 실행 중 (종료하려면 CTRL+C를 누르세요)

와아... 멋져요!

브라우저에서 http://localhost:8000/docs 로 이동할 수 있어요. 여기에서 확인할 수 있는 내용은:

<img src="/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_1.png" />

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

LangServe는 Swagger UI를 사용하는 API 문서 페이지를 제공합니다! 이제 LangServe를 통해 사용 가능한 엔드포인트들이 있습니다. 우리는 invoke/ 엔드포인트로 POST 요청을 보낼 수 있습니다. 하지만 LangServe는 우리에게 chain을 직접 다룰 수 있는 웹 인터페이스가 있는 playground/ 엔드포인트도 제공합니다.

![이미지](/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_2.png)

우리는 입력을 제공하고 시작을 클릭합니다. 결과는 다음과 같습니다:

![이미지](/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_3.png)

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

LLM 애플리케이션 워크플로의 맥락에서 API의 중요성을 강조하는 것이 중요합니다. LLM 및 해당 애플리케이션의 대부분 사용 사례를 생각해보면, 로컬 모델 및 자원에 의존할 수 없습니다. 이것은 합리적이지 않고 확장성이 떨어집니다.

LLM 애플리케이션의 실제 파워는 이전까지 설명한 복잡한 워크플로를 추상화하는 능력에 있습니다. 우리는 수행한 모든 것을 API 뒤에 숨겨 사용 사례가 확장되고 다른 사람들이 통합할 수 있도록 하려고 합니다. 이는 API를 호스팅하고 제공할 수 있는 쉬운 옵션이 있다면에만 가능합니다. 그리고 바로 그것이 Heroku에서 할 수 있습니다.

# Heroku에 배포

Heroku는 LLM 애플리케이션 구현의 중요한 마지막 부분입니다. 우리는 LangChain을 사용하여 워크플로를 조합하고 LangServe를 사용하여 유용한 REST API로 제공합니다. 이제 복잡한 자원을 수동으로 설정하여 트래픽을 호스팅하고 제공하는 대신, Heroku를 사용하여 애플리케이션을 간단히 배포할 수 있습니다.

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

헤로쿠 계정을 설정한 후에, 이제 거의 배포할 준비가 끝났어요. 함께 순서대로 진행해볼게요.

## 새로운 헤로쿠 앱 생성하기

헤로쿠 CLI를 사용해서 로그인하고 새로운 앱을 생성해요.

```js
$ heroku login
$ heroku create my-langchain-app
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

## 설정 변수 설정하기

이제 Heroku 앱 환경에서 OPENAI_API_KEY 환경 변수를 설정해야 합니다.

```js
$ heroku config:set OPENAI_API_KEY=여러분의-openai-api-key로-대체하세요
```

## Python 애플리케이션 배포를 위한 설정 파일 만들기

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

헤로쿠가 우리의 파이썬 애플리케이션을 실행하기 위해 필요한 것을 알 수 있도록 하려면 세 가지 간단한 파일을 만들어야 합니다:

- Procfile: 헤로쿠가 앱을 시작하는 데 사용해야 하는 명령을 선언합니다.
- requirements.txt: 헤로쿠가 설치해야 하는 Python 패키지 종속성을 지정합니다.
- runtime.txt: 앱에 사용하려는 정확한 Python 런타임 버전을 지정합니다.

이 파일들은 빠르고 쉽게 만들 수 있습니다. 각각은 프로젝트의 루트 폴더에 들어갑니다. Procfile을 만들려면 다음 명령을 실행하면 됩니다:

```bash
$ echo 'web: uvicorn main:app --host=0.0.0.0 --port=${PORT}' > Procfile
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

이것은 Heroku에게 Python에서 웹 서버 구현인 uvicorn을 실행하도록 지시합니다.

requirements.txt에 대해, pip freeze 명령을 사용하여 설치된 패키지 목록을 출력할 수 있습니다.

```js
$ pip freeze > requirements.txt
```

마지막으로, runtime.txt에는 Python 3.11.8을 사용할 것입니다.

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
$ echo 'python-3.11.8' > runtime.txt
```

이 파일들이 준비된 상태에서 프로젝트 루트 폴더는 다음과 같이 보일 것입니다:

```js
$ tree
.
├── main.py
├── Procfile
├── requirements.txt
└── runtime.txt

0 directories, 4 files
```

이 파일들을 모두 GitHub 저장소에 커밋합니다.

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

## Heroku와 GitHub 저장소 연결하기

마지막으로 할 일은 GitHub 저장소에 대한 Heroku 원격을 생성한 다음 코드를 해당 원격으로 푸시하는 것입니다. Heroku는 새 코드를 푸시하면 해당 코드를 응용 프로그램에 배포합니다.

```js
$ heroku git:remote -a my-langchain-app
$ git push heroku main
```

우리의 코드가 Heroku 원격으로 푸시되면, Heroku는 애플리케이션을 빌드하고 종속성을 설치한 다음 Procfile에서 지정된 명령을 실행합니다. git push 명령어의 최종 결과는 다음과 같습니다:

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
…

remote: -----> 프로세스 유형 검색 중
remote:        Procfile이 다음 유형을 선언함 -> web
remote:
remote: -----> 압축 중...
remote:        완료: 71.8M
remote: -----> 배포 중...
remote:        v4 버전이 릴리스됨
remote:        https://my-langchain-app-ea95419b2750.herokuapp.com/ 에 배포됨
remote:
remote: 배포 확인... 완료.
```

우리의 Heroku 앱 URL이 표시됩니다. 브라우저에서 https://my-langchain-app-ea95419b2750.herokuapp.com/playground을 방문해주세요.

![이미지](/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_4.png)

또한 Swagger UI 문서 페이지를 확인하려면 https://my-langchain-app-ea95419b2750.herokuapp.com/docs를 방문해주세요.

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

![이미지](/TIL/assets/img/2024-07-09-LangChainPythonandHeroku_5.png)

그리고 그렇게해서 우리는 시작했어요!

이 프로세스는 LangChain과 함께 작업할 때 개발 시간과 오버헤드를 줄이는 최상의 방법입니다. LangChain으로 작성된 API를 쉽게 몇 가지 간단한 명령어로 Heroku에 배포할 수 있는 기능은 LangChain과 Heroku를 결합하는 것을 당연하게 만듭니다.

# 결론

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

오늘의 기업과 개발자들은 AI와 LLM(언어 모델)의 파도를 타기에 올바른 선택을 했습니다. 이들 영역에서 혁신과 새로운 개발 가능성이 많습니다. 그러나 성공과 실패의 차이는 그들이 애플리케이션을 구축하고 배포하는 데 사용하는 도구 체인에 많이 달렸습니다.

LangChain 프레임워크를 사용하면 LLM 기반 애플리케이션을 만드는 프로세스가 접근 가능하고 반복 가능해집니다. 그러나 구현은 전투의 반이에 불과합니다. 애플리케이션이 만들어지면, 이러한 애플리케이션 API를 클라우드에 쉽고 빠르게 배포할 수 있는 능력이 필요합니다. 그 곳에서 더 빠른 반복과 개발의 장점을 가질 수 있고, Heroku를 통해 그 길에 도달할 수 있습니다.
