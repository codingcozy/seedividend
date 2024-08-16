---
title: "AI 에이전트들을 해킹했어요 이제 모두 무료로 이용할 수 있어요"
description: ""
coverImage: "/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_0.png"
date: 2024-05-20 21:59
ogImage: 
  url: /assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_0.png
tag: Tech
originalTitle: "I hacked the AI agents! Now you can have them all for free!"
link: "https://medium.com/generative-ai/i-hacked-the-ai-agents-now-you-can-have-them-all-for-free-08cae7d29714"
isUpdated: true
---




![image](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_0.png)

몇 주 전, 무료로 Gradio API 호출을 사용할 수 있는 비밀 핵을 발견했습니다(여기 및 여기에서 더 읽을 수 있어요). Ben Auffarth가 지은 멋진 책인 랭체인에 관한 연구를 완료했는데요... 그리고 영감을 받았어요.

Langchain과 함께 Gradio API를 사용하여 무한한 AI 에이전트의 가능성을 무료로 테스트할 수 있는 방법이 있는지 궁금했습니다. 당신도 당신을 위해 무료로 작동하는 에이전트의 기초를 마련할 준비가 되어 있나요?

자리에 튼튼히 잡히세요. 이 기사에서도 여러분이 같은 일을 할 수 있는 방법을 설명하겠습니다.

<div class="content-ad"></div>

# 왜 AI 에이전트?

내게 있어서 AI 에이전트에 관한 이야기는 지금까지 배경 속에 있던 것이라고 말해야겠어요. 첫째로, 나는 오픈 소스 모델만을 사용하여 작업하고 싶다는 생각을 가지고 있어서입니다. 둘째로, AI 에이전트 분야로 이동하기 위해 작고 정확한 모델을 찾고 있었기 때문입니다. GPU가 없기 때문에 모델의 선택과 크기가 항상 우선 순위입니다.

## 그런데... 이 에이전트들이 뭐죠?

저는 공정 제어 산업 자동화 엔지니어이기 때문에 에이전트가 무엇인지 설명하는 것은 쉽게 이해되어요: 에이전트들은 의사 결정 과정의 주도 역할을 합니다.

<div class="content-ad"></div>

- 환경과 상호작용하며 선택을 내리고 특정 목표를 달성하기 위해 설계된 컴퓨터 프로그램 또는 시스템입니다.
- 인간에 의해 직접적으로 제어되지 않고, 자율적인 개체로 독립적으로 작동하여 유연한 문제 해결 능력을 발휘합니다.

에이전트는 반응적(Reactive)이거나 적극적(Proactive)인 성격, 환경의 안정성(고정 또는 동적), 그리고 다중 에이전트 시스템에 참여하는 정도와 같은 독특한 특성에 따라 분류될 수 있습니다.

- 반응적 에이전트는 환경 자극에 신속히 반응하고 이러한 입력에 기반하여 행동을 취합니다.
- 적극적 에이전트는 목표를 달성하기 위해 적극적으로 계획을 세우고 행동합니다.

여러 에이전트가 협력할 때, 그들은 다중 에이전트 시스템을 형성하며 각각이 공통 목표에 기여합니다. 효과적인 조정과 소통을 보장하기 위해 이러한 에이전트들은 행동을 동기화하고 서로 상호작용해야 합니다.

<div class="content-ad"></div>

Langchain은 내장된 기능을 갖춘 강력한 프레임워크로, 모든 종류의 AI 에이전트를 조직화하고 조정하는 데 사용할 수 있습니다. 다음 글에서 그에 대해 자세히 배워보겠습니다.

여기서는 에이전트 애플리케이션을 위한 기본 도구를 만들어보겠습니다.

# 문서는 퍼즐입니다

<div class="content-ad"></div>

아직 예제가 없습니다. Gradio와 Langchain의 문서는 꽤 좋지만 주로 OpenAI 예제에 초점을 맞추고 있습니다. 오픈 소스 도구와 AI를 사용할 때마다 가장 큰 숙제가 바로 이겁니다.

그래서 저는 스스로 만들기로 결심했습니다. 1주일간의 고군분투 끝에 가능하다는 것을 깨달았어요.

동시에 좋은 문서는 해결책의 원천입니다. 우리는 해결해야 할 문제를 알고 있습니다: Gradio API 호출을 Langchain의 LLM 인스턴스로 결합시키기입니다.

두 프레임워크의 문서를 훑어 보면서 몇 가지 영감을 얻었습니다:

<div class="content-ad"></div>

Gradio Python client: Gradio Python client을 사용하면 어떤 Gradio 앱이든 API로 쉽게 사용할 수 있습니다. 예를 들어, 마이크로부터 녹음된 오디오 파일을 전사하는 Hugging Face Space를 고려해보세요. 아래에 예시가 있습니다.

![Gradio Example](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_2.png)

gradio_client 라이브러리를 사용하면 프로그래밍 방식으로 오디오 파일을 전사하는 API로 Gradio를 쉽게 사용할 수 있습니다. 작동 방식을 이해하려면 이전 글 "Chatbot Cheat Code: Build Your AI Assistant Running A HUGE LLM Without Spending A Penny — Part 1/Part 2"를 참조해주세요.

Langchain Gradio component: Hugging Face Spaces에는 수천 개의 Gradio 앱이 있습니다. 이 라이브러리는 이러한 앱들을 LLM(Large Language Model)의 손끝에 두는 데 도움이 됩니다. 구체적으로, gradio-tools는 Gradio 앱을 도구로 변환하는 Python 라이브러리로, 이를 이용해 큰 언어 모델(LLM) 기반 에이전트가 작업을 완료하는 데 활용할 수 있습니다.

<div class="content-ad"></div>

예를 들어, LLM은 온라인에서 찾은 음성 녹음을 전사하고 그 내용을 요약하는 Gradio 도구를 사용할 수 있습니다. 또는 Google 드라이브의 문서에 OCR을 적용한 다음 해당 내용에 대한 질문에 답변하는 다른 Gradio 도구를 사용할 수도 있습니다.

Langchain의 블로그에 따르면, 사전에 구축된 도구 중 하나가 아닌 공간을 사용하려면 쉽게 자체 도구를 만들 수 있습니다. 본 기사를 통해 프로세스가 실제로 쉬운지 여부를 직접 판단하게 될 것입니다...


![이미지](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_3.png)

# 사용자 지정 래퍼를 만들어야 합니다


<div class="content-ad"></div>

Langchain은 거대한 통합 모음을 보유하고 있어요: 기본적으로 언어 모델, 문서 로더, 데이터베이스 등을 모듈식이고 쉽게 연결할 수 있어요.

그들은 우리 모두의 도구 세트와 함께 사용될 수 있는 사용자 정의 LLM 클래스를 생성할 수 있는 가능성을 열어 두었어요. 

여기서는 LangChain에서 Llama-3-8b에 연결하는 방법을 배웠어요. 하지만 이 과정은 다른 툴을 사용하고 싶거나 LangChain에서 지원하는 것과 다른 래퍼를 사용하고 싶을 때에도 동일해요. 

그럼 시작해봐요. 이 예제에서는 Langchain을 Llama-3-8b에 연결할 거에요. 하지만 그레디오 API와 허깅페이스 허브 데모 애플리케이션에 대해서도 (작은 트릭들이 있긴 하지만) 동일한 프로세스가 적용돼요.

<div class="content-ad"></div>

무료 구글 Colab 노트북을 열어보자. CPU만 있는 것으로 충분하다. Google Colab를 처음 사용하거나 무료로 얻는 방법을 모르는 경우 여기 지침을 읽어보세요:

우리가 필요한 라이브러리를 먼저 설치합시다.

```js
%pip install --upgrade --quiet gradio_tools huggingface_hub langchain
```

이 노트북은 HuggingFace 토큰이 없어도 작동합니다. 그러나 강력히 권장하긴 하지만요: 여기 기사에서 지시 사항을 따라 해보세요.

<div class="content-ad"></div>

## Gradio 클라이언트 인스턴스화

이것이 첫 번째 단계입니다. 기본적으로 gradio 도구를 사용하여 Gradio 데모 애플리케이션을 호스팅하고 있는 HuggingFace Space에 API 호출을 설정합니다. 추론은 그 곳에서 이루어지며, LLM으로부터 응답을 받게 될 것입니다.

```js
from gradio_client import Client

client = Client("ysharma/Chat_with_Meta_llama3_8b")

# 이 부분은 연결을 테스트하기 위함입니다
result = client.predict(
  message="Hello!!",
  request=0.95,
  param_3=512,
  api_name="/chat"
)
print(result)
```

노트북 셀을 실행하면 데모 엔드포인트와 결과에 대한 연결이 표시됩니다. HF_token을 전달하지 않으면 경고 메시지가 표시됩니다.

<div class="content-ad"></div>

해당 부분을 수정하려면 다음과 같이 하세요:

```js
from gradio_client import Client

yourHFtoken = "hf_xxxxxxxxxxxxxxxxxxxx" # 여기에 HF 토큰 입력
client = Client("ysharma/Chat_with_Meta_llama3_8b", hf_token=yourHFtoken)
```

이제 Gradio 클라이언트가 작동하는 것을 알았습니다. Gradio와 Langchain을 연결하기 위해 Langchain에 새로운 LLM 래퍼를 생성해야 합니다.

전체 노트북은 해당 GitHub 저장소에서 찾을 수 있습니다:

<div class="content-ad"></div>

## 사용자 정의 LLM 래퍼

사용자 정의 LLM이 구현해야 하는 필수 사항은 두 가지뿐입니다.

![이미지](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_4.png)

위 문서 페이지에 따르면 새로운 클래스에서 최소한으로 _call 및 _llm_type 매개변수부터 시작합니다.

<div class="content-ad"></div>

알림: 위의 Python 코드의 80%는 Langchain 설명서에서 직접 가져온 것입니다 😅 걱정하지 마세요, Colab 노트북 링크를 올릴 테니 그 전에 단계별로 설명해드리겠습니다.

```js
from typing import Any, List, Mapping, Optional
from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain_core.language_models.llms import LLM
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

class GradioClientChat(LLM):
    """
    Gradio API 호출을 기반으로 한 사용자 지정 LLM 클래스입니다.
    """
    from gradio_client import Client
    chatbot: Any = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # ChatBot 클래스를 인스턴스화합니다.
        self.chatbot = Client("ysharma/Chat_with_Meta_llama3_8b")

    @property
    def _llm_type(self) -> str:
        return "Gradio API client Meta_llama3_8b"

    def _call(
            self,
            prompt: str,
            stop: Optional[List[str]] = None,
            run_manager: Optional[CallbackManagerForLLMRun] = None,
            chatbot=None,
            request: float = 0.95,
            param: float = 512,
    ) -> str:
        """
        지정된 프롬프트를 사용하여 Gradio API 클라이언트 Meta_llama3_8b에 API 호출을 실행하고 응답을 반환합니다.
        """
        if chatbot is None:
            chatbot = self.chatbot

        if stop is not None:
            raise ValueError("stop kwargs are not permitted.")

        # API에서 응답 반환
        result = chatbot.predict(   #.submit for streaming effect / .predict for normal output
              message=prompt,
                request=request,
                param_3=param,
                api_name="/chat"
        )
        return str(result)
```

처음 접하신 분들을 위해, 여기에서는 함수를 만드는 게 아니라 클래스를 생성하고 있습니다. 파이썬 클래스는 비슷한 객체 그룹이 공유할 수 있는 메서드(함수)와 속성(변수) 세트를 정의하는 청사진 또는 템플릿입니다. 객체를 생성하는 데 사용되는 청사진 역할을 하며, 건물의 설계와 구조를 개요로 나타내는 건축 청사진과 유사합니다. 클래스는 코드를 구조화하고 코드 재사용성을 제공하여 대규모 프로그램을 쉽게 작성하고 유지할 수 있게 해줍니다.

우리의 클래스로 돌아가면: 필요한 모든 langchain 라이브러리를 가져온 후, GradioClientChat(LLM)라는 새로운 클래스를 생성합니다. 여기서 Gradio 클라이언트를 챗봇으로 사용합니다. 클래스는 LLM Langchain 클래스의 속성을 상속합니다. 이러한 이유로 _call 및 _llm_type 같은 몇 가지 속성과 메서드가 기본 사용자 정의 객체에서 필수적인 것입니다.

<div class="content-ad"></div>

첫 번째 부분은 객체의 초기화와 _llm_type에 대한 부분이에요:

```js
class GradioClientChat(LLM):
    """
    Gradio API 호출을 기반으로 한 사용자 지정 LLM 클래스입니다.
    """
    from gradio_client import Client
    chatbot: Any = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # ChatBot 클래스의 인스턴스 생성
        self.chatbot = Client("ysharma/Chat_with_Meta_llama3_8b")

    @property
    def _llm_type(self) -> str:
        return "Gradio API client Meta_llama3_8b"
```

그 다음으로, _call 메서드를 생성해요. 이 메서드는 가장 중요한 부분인데, 특정 Gradio API에 구성된 모델 매개변수(프롬프트 및 모델 매개변수)를 수락하여 추론을 실행하는 메서드입니다.

```js
def _call(
            self,
            prompt: str,
            stop: Optional[List[str]] = None,
            run_manager: Optional[CallbackManagerForLLMRun] = None,
            chatbot=None,
            request: float = 0.95,
            param: float = 512,
    ) -> str:
        """
        지정된 프롬프트를 사용하여 Gradio API client Meta_llama3_8b에 API 호출을 수행하고 응답을 반환합니다.
        """
        if chatbot is None:
            chatbot = self.chatbot

        if stop is not None:
            raise ValueError("stop kwargs are not permitted.")

        # API에서 응답 반환
        result = chatbot.predict(   #.submit for streaming effect / .predict for normal output
              message=prompt,
                request=request,
                param_3=param,
                api_name="/chat"
        )
        return str(result)
```

<div class="content-ad"></div>

입력 매개변수에는 변수 이름과 함께 기본값으로 request: float = 0.95, param: float = 512와 같은 값을 설정합니다. 이 값들은 구체적인 Gradio API를 반영해야 합니다. 우리의 경우 API 문서에서 ysharma/Chat_with_Meta_llama3_8b를 확인해주세요.

![이미지](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_5.png)

그런 다음, Gradio API 호출을 통해 추론을 실행하고 텍스트를 반환합니다.

```js
# API로부터의 응답 반환
result = chatbot.predict(   #.submit은 스트리밍 효과, .predict은 일반 출력용
      message=prompt,
      request=request,
      param_3=param,
      api_name="/chat"
)
return str(result)
```

<div class="content-ad"></div>

"새로 만든 클래스를 사용하여 셀을 실행해주세요.

![image](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_6.png)

# 우리의 사용자 정의 LLM을 인스턴스화하고 실행해봅시다

이제 HuggingFace 데모 공간으로 둘러싸인 Langchain LLM를 실행할 준비가 되었습니다."

<div class="content-ad"></div>

```js
# llm을 인스턴스화하세요
llm = GradioClientChat()

# _call 메서드를 invoke와 함께 실행하세요
result = llm.invoke("인공 지능이란 무엇인가요?")
print(result)
```

몇 초 안에 실행하면 응답을 받을 수 있어요!

# 보너스 트랙: 스트리밍 효과

한 번 더 단계를 추가하는 것은 문제가 되지 않겠죠? 몇 가지 추가적인 메서드를 생성할 수 있음을 보았습니다. 그 중 하나인 _stream은 생성될 때 토큰을 하나씩 반환하는 역할을 합니다. 이를 위해 이전 클래스 끝에 추가 메서드를 추가할 수 있어요.  


<div class="content-ad"></div>

```python
def _stream(
    self,
    prompt: str,
    stop: Optional[List[str]] = None,
    run_manager: Optional[CallbackManagerForLLMRun] = None,
    chatbot=None,
    request: float = 0.95,
    param: float = 512,
    **kwargs: Any,
) -> Iterator[GenerationChunk]:
    """주어진 프롬프트에서 LLM을 스트리밍합니다. 

    이 메서드는 스트리밍을 지원하는 하위 클래스에 의해 재정의되어야 합니다. 

    구현되지 않은 경우, stream에 대한 호출의 기본 동작은 모델의 비스트리밍 버전으로 
    대체하여 출력을 단일 청크로 반환하는 것입니다. 

    Args: 
        prompt: 생성할 프롬프트. 
        stop: 생성 시 사용할 정지 단어입니다. 모델 출력은 이러한 하위 문자열 중 
            하나가 처음 발생하는 곳에서 잘립니다. 
        run_manager: 실행을 위한 콜백 매니저. 
        **kwargs: 임의의 추가 키워드 인수입니다. 일반적으로 모델 공급자 API 
            호출에 전달됩니다. 

    Returns: 
        GenerationChunks의 이터레이터.
    """
    if chatbot is None:
        chatbot = self.chatbot

    if stop is not None:
        raise ValueError("stop kwargs are not permitted.")

    # API에서 응답 반환
    for char in chatbot.submit(   #.submit for streaming effect / .predict for normal output
          message=prompt,
            request=request,
            param_3=param,
            api_name="/chat"
            ):
        chunk = GenerationChunk(text=char)
        if run_manager:
            run_manager.on_llm_new_token(chunk.text, chunk=chunk)

        yield chunk
```

첫 부분은 기본적으로 동일하다는 점을 알아두세요. 변경 사항은 2곳에서 발생합니다:

- 처음부분에서 메소드의 출력이 문자열이 아닌 Iterator 객체임을 선언합니다.
- 끝부분에서 for 루프를 시작하고, predict 대신 submit() 메서드를 호출합니다. 차이에 대해 제2부에서 설명했습니다.

이제 새로운 추가와 print에서 작은 변경을 한 Class를 다시 실행할 수 있습니다. Google Colab에서도 텍스트가 생성 중에 스트리밍되는 것을 확인할 수 있습니다.


<div class="content-ad"></div>

```python
llm = GradioClientChat()
# 텍스트 인터페이스를 위한 코드 - Steramlit에서는 필요하지 않습니다
final = ''
for token in llm.stream("what is science?"):
        if final == '':
            final=token
            print(token, end="", flush=True)
        else:
            try:
                print(token.replace(final,''), end="", flush=True)
                final = token
            except:
                pass
```

Streamlit을 사용하는 경우, 위의 코드는 필요하지 않습니다. Iterator 객체는 점진적으로 진행되기 때문에 모든 토큰을 하나씩 쌓아둡니다. 하지만 Google Colab에서는 그럴 여유가 없습니다. 단어별로 인쇄해야 하므로, 이미 생성된 내용을 뺀 새 Iterator 스트림으로 인쇄 기능을 조정해야 합니다.

# 결론... 지금까지

우리는 어디에서든 실행할 수 있는 AI 에이전트들의 자유 무리의 기초를 단순하게 놓았습니다. 솔직히 말해서, Gradio API 주변에 새롭게 만든 래퍼를 사용하여 Langchain 튜토리얼을 자유롭게 시도해볼 수 있습니다.


<div class="content-ad"></div>

큰 모델인 Qwen100b와 같은 모델을 약간 조정하여 실행해 볼 수도 있어요. 성공하면 알려주세요.

무엇을 기다리고 있나요?

이 기사를 즐겁게 읽었기를 바라요. 이 기사에 대한 노트북도 있답니다.

이 이야기가 가치 있는 정보를 제공했고 조금이라도 지원하고 싶다면, 다음을 해볼 수 있어요:

<div class="content-ad"></div>

- 이 이야기에 대해 많이 박수를 쳐주세요.
- 기억하기 좀 더 유용한 부분을 강조합니다 (나중에 그것들을 더 쉽게 찾을 수 있고, 나는 더 나은 기사를 쓸 수 있습니다.)
- 자신의 AI를 시작하는 방법을 배우세요. 이 무료 eBook을 다운로드하세요.
- 내 링크를 사용하여 Medium 멤버십에 가입하십시오 — (무제한 Medium 이야기를 읽으려면 매월 $5)
- Medium에서 나를 팔로우하세요.
- 나의 최신 기사를 읽어보세요: https://medium.com/@fabio.matricardi

더 많은 내용을 읽고 싶다면 여기 몇 가지 아이디어가 있습니다:

Youssef Hosni의 이 기사로 직접 시도해 볼 수 있습니다.

학습 자료:

<div class="content-ad"></div>

파이썬 클래스의 예시:

간단한 은행 계좌를 나타내는 프로그램을 만들고 싶다고 상상해보세요. "BankAccount"라는 클래스를 정의할 수 있습니다. 이 클래스에는 계좌 번호를 저장하는 "account_number" 및 현재 잔액을 저장하는 "balance"라는 두 가지 속성이 있을 수 있습니다. 또한 계좌에 돈을 입금하는 "deposit()" 메소드와 계좌에서 돈을 인출하는 "withdraw()" 메소드가 있을 것입니다.

이 클래스의 인스턴스를 생성하려면 다음과 같이 클래스를 호출하는 방식으로 인스턴스화하면 됩니다:

```js
account1 = BankAccount("12345", 1000)
```

<div class="content-ad"></div>

지금, account1은 BankAccount 클래스의 객체이며, 계좌 번호가 "12345"이며 시작 잔고는 1000원입니다. 그런 다음 account1에서 deposit(500)과 같은 메서드를 호출하여 잔고에 500을 추가하거나 withdraw(200)를 호출하여 200을 빼는 등의 작업을 할 수 있습니다.

클래스는 객체 지향 프로그래밍의 기본 개념으로, 관련된 데이터와 함수를 재사용 가능한 구성요소로 구성하여 복잡한 프로그램을 작성할 수 있게 해줍니다.

![이미지](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_7.png)

이 이야기는 Generative AI 출판물의 일환으로 발행되었습니다.

<div class="content-ad"></div>

우리와 함께 최신 AI 이야기 속에 머무르기 위해 Substack, LinkedIn 및 Zeniteq에서 연락을 유지해보세요. 함께 AI의 미래를 만들어 봅시다!

![Image](/assets/img/2024-05-20-IhackedtheAIagentsNowyoucanhavethemallforfree_8.png)