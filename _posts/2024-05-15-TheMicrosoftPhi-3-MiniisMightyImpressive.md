---
title: "마이크로소프트 Phi-3-Mini는 정말 인상적이에요"
description: ""
coverImage: "/assets/img/2024-05-15-TheMicrosoftPhi-3-MiniisMightyImpressive_0.png"
date: 2024-05-15 16:38
ogImage: 
  url: /assets/img/2024-05-15-TheMicrosoftPhi-3-MiniisMightyImpressive_0.png
tag: Tech
originalTitle: "The Microsoft Phi-3-Mini is Mighty Impressive"
link: "https://medium.com/towards-artificial-intelligence/the-microsoft-phi-3-mini-is-mighty-impressive-a0f1e7bb6a8c"
---


최근에 마이크로소프트 AI가 출시한 Phi-3-Mini 언어 모델입니다. 이 모델은 작은 언어 모델(SLM) 범주에 속하며 LLM이 제공하는 여러 기능을 제공합니다. 유일한 차이점은 SLM은 크기가 더 작고 적은 데이터로 훈련되었다는 것입니다.

마이크로소프트에 따르면 Phi-3 모델은 가장 강력하고 비용 효율적인 작은 언어 모델(SLM)이라고 합니다. 이들은 Phi-3-mini-4k-instruct 및 Phi-3-mini-128k-instruct 모델을 출시했으며 둘 다 어떠한 제약 없이 완전히 오픈 소스입니다. 이는 128k 컨텍스트 길이를 갖는 작은 언어 모델이 처음으로 등장한 시점입니다.

다가오는 몇 주 안에 Phi-3-small (7B) 및 Phi-3-medium (14B) 모델도 출시할 예정입니다.

# 성능 평가



아래는 공식 Phi-3 모델 벤치마크 결과입니다.

![image](/assets/img/2024-05-15-TheMicrosoftPhi-3-MiniisMightyImpressive_0.png)

작고 강력한 Phi-3-Mini 모델은 무게 대비 어마어마한 성능을 자랑합니다. Phi-3-Mini 모델은 38억 개의 매개변수를 가지고 있으며, 추론, 수학, 코드 생성 등 대부분의 벤치마크에서 Gemma-7B, Mistral-7B, Llama-3-8B와 경쟁하여 우수한 성과를 거두었습니다.



Phi-3-Mini 모델이 성능이 잘 나오지 않는 유일한 벤치마크는 사실적인 지식 벤치마크입니다. 그 이유는 이 모델의 작은 크기 때문에 많은 사실을 보존할 수 없기 때문입니다.

하지만 우리는 여전히 Phi-3-Mini 모델을 RAG 및 검색 작업에 사용할 수 있습니다. 여기서 우리는 사실들을 검색하여 모델에 전달하여 답변을 생성할 수 있습니다. 그리고 이 블로그에서는 바로 그것을 구축할 것입니다 — 지역적인 GenAI 기반 검색 엔진.

# 왜 SLMs를 사용해야 하는가?

개발을 계속 진행하기 전에, 왜 작은 언어 모델이 중요한지에 대해 알아보겠습니다.



매우 처음으로 실험이 있습니다. LLM을 실험하는 것은 상당히 비싸요. LLM 위에 무언가를 개발하거나 기존 프로세스/소프트웨어에 기능을 추가하기 위해 실험을 하는 것은 상당한 양의 실험을 필요로 합니다. 이러한 실험에는 다양한 프롬프팅 기술 시도, 출력을 구문 분석하는 여러 방법 사용 등이 포함됩니다.

네, 많은 LLM API 제공 업체들이 요금을 지불하는 방식을 채택하고 있습니다. 그럼에도 불구하고 모든 것을 올바르게 만들기 전에 $10에서 $20을 지출할 수 있습니다. 그러나 SLM을 사용하면 llama-cpp-python 또는 node-llama-cpp와 같은 라이브러리를 사용하여 로컬에서 로드하고 추론을 수행할 수 있습니다.

다음은 클라이언트가 클라우드를 피하려는 경우입니다. 사람들은 보통 내부 조직 정보를 클라우드에 제공하는 것을 조심스러워하며 대부분을 인하우스 또는 대부분 로컬에서 처리하고 싶어합니다. 그들은 메인프레임에서 일부 데이터를 검색하여 사용자에게 제공하거나 서버 측에서 렌더링하여 사용자에게 보여줄 수 있습니다. 이 경우 사용자의 로컬 컴퓨터나 메인프레임과 함께 Phi-3-Mini와 같은 SLM을 사용하여 그들의 검색에 GenAI 기능을 추가할 수 있습니다.

모든 비즈니스는 성능을 최적화하고 저렴한 비용으로 속도 처리량과 보안을 제공합니다. 따라서 마지막으로는 컴퓨팅 효율성, 생성 속도, 특정 작업 및 보안의 조합입니다. LLM은 매우 일반적이지만 대부분의 조직 또는 클라이언트는 그것을 필요로하지 않을 수 있고, 그들은 모델을 자신에게 특화된 작업에 적합하도록 원할 수도 있습니다. 그 경우에는 자체 사용자 정의 명령어 집합으로 SLM을 미세 조정한 다음 미세 조정된 버전을 추론용으로 호스팅할 수 있습니다. 추론은 로컬이나 메인프레임에서 수행할 수 있습니다.



이제 기업이나 개인이 SLM을 사용하는 다양한 이유를 이해했으니 Phi-3-Mini 모델을 활용한 검색 도구를 만들어보겠습니다.

# AI 검색 도구

최근에 나는 Llama-3 8B가 Groq에서 빠른 생성 속도로 검색 요약을 수행하는 데 탁월하다는 주제의 블로그를 작성했습니다. 아직 해당 기사를 읽지 않았다면 아래 링크를 통해 확인해보세요.

저희 이전 블로그에서 구현한 대부분의 내용은 그대로 유지될 것입니다. 변경되는 것은 LLM 및 검색 엔진 뿐입니다.



여기서는 llama-cpp-python 라이브러리를 사용하여 로컬 시스템에 양자화된 Phi-3-Mini-4K-Instruct 모델을 로드하고 모델과 상호 작용하여 텍스트를 생성할 것입니다. 또한 사용자 쿼리를 기반으로 Brave Search API를 사용하여 검색 결과를 검색할 것입니다.

하지만 어쨌든, 하루 끝에 모든 AI 기반 검색 플랫폼의 기본 원리는 사용자 쿼리를 기반으로 내용을 검색하고 요약하는 것입니다. 각각이 이 작업을 수행하는 방식은 운영 규모에 따라 다를 수 있습니다. 대부분의 엔지니어링 노력은 검색 속도를 빠르게 만들기(캐싱 또는 기타 방법으로)와 관련 결과를 검색하며 필요할 때 사실과 숫자로 답하는 데 사용됩니다.

# 검색 API

가장 간단한 구성 요소인 검색 구성 요소부터 시작하여 전체 시스템의 중추인 부분입니다.



위에서 언급한 대로, 블로그에는 Brave Search API를 사용할 것이지만 다른 것을 사용해도 됩니다. Brave Search API를 사용하려면 https://brave.com/search/api/로 이동하여 등록해야 합니다. 등록한 후에는 우리의 신용카드 세부정보를 제공하여 무료 요금제를 구독해야 합니다. 무료 요금제에서는 월 2,000개의 요청과 초당 1개의 요청이 가능하여 실험에 충분합니다.

무료 요금제를 구독한 후에, API Keys 섹션으로 이동하여 API 키를 생성하고 해당 키를 복사하여 .env 파일에 넣어야 합니다.

```js
BRAVE_API_KEY="YOUR_BRAVE_API_KEY"
```

아래에 보여지는 대로 configs.py 파일에 모든 환경 변수를 로드할 것입니다.



```js
# configs.py

import os
from dotenv import load_dotenv

load_dotenv()

BRAVE_API_KEY = os.environ.get("BRAVE_API_KEY")
```

API 키를 구성했어요. 이제 사용자의 쿼리를 검색하는 데 도움이 될 코드를 작성해 봅시다.

```js
# brave_search.py

from configs import BRAVE_API_KEY
import httpx

async def brave_search(search_term):
    brave_api_key = BRAVE_API_KEY
    url = f'https://api.search.brave.com/res/v1/web/search?q={search_term}&count=3'
    headers = {
        'X-Subscription-Token': brave_api_key,
        'Accept': 'application/json'
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print('검색 데이터: ', data)
            return format_search(data)
        print(await response.text())
        return None

def format_search(search_results):
    retrieve_keys = ['web', 'news']
    formatted_results = []
    for value in retrieve_keys:
        if value in search_results:
            results = search_results[value]['results']
            formatted_results.append('\n'.join(
                f"Title: {result['title']} Description: {result['description']} URL: {result['url']}"
                for result in results))
    print('포맷된 결과: ', formatted_results)
    if formatted_results:
        return '\n'.join(formatted_results)
    return None
```

위에서는 검색어를 인수로 사용하는 brave_search 함수를 정의했습니다. 그런 다음 Brave API 웹 검색 엔드포인트를 호출하고 검색 결과를 검색합니다. 검색 결과는 format_search 함수를 사용하여 하나의 문자열로 서식이 지정됩니다.



# 로컬 모델 추론

우리는 llama.cpp 패키지의 Python 바인딩을 llama-cpp-python 라이브러리를 통해 로컬 시스템에 모델을 로드하고 텍스트 생성 또는 추론을 수행할 것입니다.

이를 위해서는 먼저 llama-cpp-python 패키지를 설치하고 아래 제공된 링크에서 Phi-3-Mini-4k-Instruct 모델을 GGUF 형식으로 다운로드해야 합니다.

## llama-cpp-python 설치하기



pip를 사용하여 llama-cpp-python을 설치해 보세요!

```sh
pip install llama-cpp-python --upgrade --force-reinstall --no-cache-dir
```

만약 이미 설치되어 있는 경우, 이 명령어는 llama-cpp-python 패키지를 업그레이드하고 재설치할 것이며, 그렇지 않은 경우에는 새로 설치할 겁니다.

## 모델 다운로드



위에 제공된 링크로 이동하여 Phi-3-mini-4k-instruct-q4.gguf 파일을 다운로드하세요. 다운로드가 완료되면 작업 디렉토리에 모델 폴더를 만들고 모델 파일을 모델 폴더로 이동하세요.

![Phi-3 Mini](/assets/img/2024-05-15-TheMicrosoftPhi-3-MiniisMightyImpressive_1.png)

## 추론을 위한 모델 호출

llama-cpp-python 라이브러리에서 제공하는 유틸리티를 사용하여 모델을 로드하고 추론을 위해 호출하고 생성된 토큰을 스트리밍 및 비스트리밍 방식으로 출력하는 클래스를 작성하겠습니다.



```python
# llm_invoke.py

from llama_cpp import Llama
from ctx import ContextManagement  # 이것은 나중에 나올 것임
from typing import List, Dict, Union

class LLM:

    def __init__(self, model_path: str, **kwargs):
        self.llm = Llama(
            model_path=model_path,
            n_gpu_layers=kwargs.get("n_gpu_layers",
                                    -1),  # GPU 가속화를 사용할 때 주석 해제
            seed=kwargs.get("seed", 1337),  # 특정 시드를 설정할 때 주석 해제
            n_ctx=kwargs.get("n_ctx",
                             4096),  # 컨텍스트 창을 확장할 때 주석 해제
            n_threads=kwargs.get("n_threads", 8))
        self.ctx = ContextManagement(2560)

    def __stream__(self, messages: List[Dict], **kwargs):
        input_message = self.ctx(messages)
        output = self.llm(input_message, stream=True, echo=False, **kwargs)
        for op in output:
            yield op.get("choices")[0].get("text") or ""

    def __complete__(self, messages: List[Dict], **kwargs):
        input_message = self.ctx(messages)
        output = self.llm(input_message, echo=False, **kwargs)
        return output.get("choices")[0].get("text")
```

위에서 llama-cpp-python 모듈에서 사용 가능한 Llama 객체를 사용하여 초기화 인수에서 제공된 model_path에서 모델을로드했습니다.

또한 __init__ 메소드에서 ContextManagement 객체를 초기화합니다. 이것은 Llama 3 + Groq가 AI Heaven 블로그에서 본 것과 유사합니다. 다음 섹션에서 다시 살펴보겠습니다.

LLM 클래스에서 두 가지 메서드가 있습니다. 토큰이 생성되는대로 토큰을 스트리밍하는 __stream__ 메서드와 생성이 완료되면 출력을 반환하는 __complete__ 메서드입니다.



LLM 클래스를 사용하면 이제 모델을 로드하고 호출할 수 있습니다. 이제 LLM (SLM)를 검색과 통합해 보겠습니다.

# 컨텍스트 관리

Phi-3-mini-4k-instruct 모델을 사용하면 최대 4k 토큰을 사용하거나 생성할 수 있습니다. 이 블로그에서 GenAI Search를 대화식으로 만들 계획은 없기 때문에 이 부분을 피할 수 있습니다. 하지만, 호기심을 위해 여기에 작성해 봅시다.

```js
# ctx.py

from typing import List, Dict, Union
from transformers import AutoTokenizer


class ContextManagement:

    def __init__(self, max_available_tokens: int = 3000):
        self.tokenizer = AutoTokenizer.from_pretrained(
            "microsoft/Phi-3-mini-4k-instruct")
        self.max_available_tokens = max_available_tokens

    def __count__tokens__(self, content: str):
        return len(self.tokenizer.tokenize(content)) + 2

    def __pad_tokens__(self, content: str, num_tokens: int):
        return self.tokenizer.decode(
            self.tokenizer.encode(content, max_length=num_tokens))

    def __manage_context__(self, messages: List[Dict]):
        managed_messages = []
        system_message = None
        if messages[0]["role"] == "system":
            system_message = messages[0]
        current_length = 0
        if system_message:
            current_length += self.__count__tokens__(
                system_message.get("content"))
        current_messsage_role = None
        for ix, message in enumerate(messages[1::-1]):
            content = message.get("content")
            message_tokens = self.__count__tokens__(message.get("content"))
            if ix > 1:
                if current_length + message_tokens >= self.max_available_tokens:
                    tokens_to_keep = self.max_available_tokens - current_length
                    if tokens_to_keep > 0:
                        content = self.__pad_tokens__(content, tokens_to_keep)
                        current_length += tokens_to_keep
                    else:
                        break
                if message.get("role") == current_messsage_role:
                    managed_messages[-1]["content"] = f"\n\n{content}"
                else:
                    managed_messages.append({
                        "role": message.get('role'),
                        "content": content
                    })
                    current_messsage_role = message.get("role")
                    current_messsage_role = message.get("role")
                    current_length += message_tokens
            else:
                if current_length + message_tokens >= self.max_available_tokens:
                    tokens_to_keep = self.max_available_tokens - current_length
                    if tokens_to_keep > 0:
                        content = self.__pad_tokens__(content, tokens_to_keep)
                        current_length += tokens_to_keep
                        managed_messages.append({
                            "role": message.get("role"),
                            "content": content
                        })
                    else:
                        break
                else:
                    managed_messages.append({
                        "role": message.get("role"),
                        "content": content
                    })
                    current_length += message_tokens
                current_messsage_role = message.get("role")
            print(f"TOTAL TOKENS: ", current_length)
            managed_messages = managed_messages[::-1]
            if system_message:
                managed_messages = [system_message] + managed_messages
            return managed_messages

    def __create_message_input__(self, messages: List[Dict]):
        return self.tokenizer.apply_chat_template(messages, tokenize=False)

    def __call__(self, messages: List[Dict]):
        managed_messages = self.__manage_context__(messages)
        return self.__create_message_input__(managed_messages)
```



위의 논리의 기본 아이디어는 변환 라이브러리의 AutoTokenizer 객체를 사용하여 특정 토크나이저를 로드하는 것입니다. 위에서는 Phi-3-mini-4k-instruct 토크나이저를 로드했습니다. 이 토크나이저는 모델에서 정의된 필요한 특수 토큰을 사용하여 메시지 목록을 텍스트 입력으로 변환하는 apply_chat_template 메소드를 제공합니다.

__manage_context__ 메소드는 모든 메시지를 역순으로 반복하여(최근성 편향) 각각의 토큰을 계산하고 이를 컨텍스트에 추가합니다. 메시지의 토큰 길이가 max_available_tokens 인자에서 제공된 허용 최대 토큰 길이를 초과하는 경우 해당 메시지는 잘라내어 처리가 종료됩니다.

# 검색 + 로컬 LLM (SLM) = 로컬 GenAI 검색

검색 유틸리티를 LLM (SLM) 호출 코드와 통합하여 로컬 AI 검색 도구를 생성해보겠습니다.



```js
# search_gen.py

from brave_search import brave_search
from llm_invoke import LLM

print(f"LLM을 로딩 중입니다")
llm = LLM("./model/Phi-3-mini-4k-instruct-q4.gguf")
print(f"LLM을 로드했습니다")

async def search(query: str):
    prompt = "당신은 도움이 되는 뉴스 요약 요원입니다. 사용자 쿼리가 단일 역따옴표로 제공되고 검색 결과가 삼중 역따옴표로 반환됩니다. 여러 검색 결과가 있을 것이며 각 결과는 제목과 설명을 포함할 것입니다. 적절한 결과가 많은 경우 쿼리를 간단 명료하게 요약하고 관련이 있는 경우 URL을 인용하여 각 항목에 대해 한 번씩만 콘텐츠를 보여주십시오. 참고: 인용문은 마크다운 형식으로 제공하고 하나의 주제에는 여러 개의 URL이 있더라도 하나의 인용만 제공하십시오."
    search_items = await brave_search(query)
    messages = [{
        "role": "system",
        "content": prompt
    }, {
        "role": "user",
        "content": f"쿼리: `{query}` \n\n 검색 결과: {search_items}"
    }]
    for content in llm.__stream__(messages, max_tokens=512):
        yield content


위 코드에서는 검색 및 LLM 유틸리티를 가져와 LLM 클래스를 다운로드하고 모델 디렉토리/폴더에 저장한 경로를 초기화했습니다.

이후에는 쿼리를 받아와서 해당 쿼리를 통해 검색 결과를 검색 유틸리티를 통해 검색한 후 이러한 검색 결과를 초기화된 llm의 __stream__ 메소드로 전달하고 간단한 시스템 프롬프트와 함께 전달합니다. 

__stream__ 메소드를 사용하므로 생성된 텍스트를 실시간으로 수신하여 반환할 수 있습니다.




# API 노출하기

브라우저에서 쉽게 상호작용할 수 있도록 FastAPI API 엔드포인트를 통해 검색 기능을 노출해 봅시다.

# app.py

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from search_gen import search

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"ok": True}


@app.get("/search")
async def api_search(q: str):
    return StreamingResponse(search(q), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run("app:app", port=8900, host="0.0.0.0")

위 코드에서는 FastAPI 앱인 app.py 파일과 두 개의 엔드포인트를 갖고 있습니다. 검색 엔드포인트는 쿼리 매개변수 q에서 검색어를 받아 검색 함수를 호출하고 응답을 스트리밍합니다.



다음 명령어를 사용하여 FastAPI 서버를 시작할 수 있습니다.

python app.py

API는 포트 번호 8900을 통해 노출되며 다음과 같은 방식으로 상호 작용할 수 있습니다.

아래 제공된 링크에서 전체 코드베이스에 액세스할 수 있습니다.



# 결론

이 블로그에서는 작은 언어 모델(SLMs)에 대해 배우고 이러한 모델의 장점, 그리고 로컬에서 다양한 사용 사례를 실험하기 위해 어떻게 사용하는지를 살펴보았습니다. 특히, Microsoft AI에서 오픈소스로 공개한 최신 Phi-3-Mini-4k-Instruct 모델을 사용했습니다. 우리는 이 모델을 Brave 검색 API와 통합하여 검색 결과를 검색하고 요약하여 로컬 GenAI/AI 검색 엔진을 만들었습니다.

이것으로 이번 블로그를 마치겠습니다. 읽는 데 즐거운 시간이 되셨기를 바랍니다.