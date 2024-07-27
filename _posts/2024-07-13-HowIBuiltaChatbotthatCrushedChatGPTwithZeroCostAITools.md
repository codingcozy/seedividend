---
title: "비용 없이 AI 도구만으로 ChatGPT를 능가하는 챗봇을 구축한 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_0.png"
date: 2024-07-13 19:52
ogImage: 
  url: /TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_0.png
tag: Tech
originalTitle: "How I Built a Chatbot that Crushed ChatGPT with Zero Cost AI Tools"
link: "https://medium.com/@fabio.matricardi/how-i-built-a-chatbot-that-crushed-chatgpt-with-zero-cost-ai-tools-f31ae7b48f59"
---


챗봇은 고객과 상호작용하고 정보를 제공하며 사용자를 즐겁게 해주는 방법으로 점점 더 인기를 얻고 있습니다. 그러나 자연스럽고 매력적인 대화를 나눌 수 있는 AI 애플리케이션을 구축하는 것은 쉬운 일이 아닙니다.

많은 챗봇 개발자들이 ChatGPT와 같은 비싼 독점 AI 모델을 활용하고 있습니다.

하지만 무료 및 오픈 소스 AI 도구를 사용하여 ChatGPT와 어울리는 챗봇을 만들 수 있다면 어떨까요?

저는 그것을 해냈고, 이 글에서 그 방법을 공유하려고 합니다.

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

# 도전과 탐험

이 도전에 도전하게 된 이유에 대해 궁금해 할 수도 있어요. 그 이유는 모두 오픈 소스 언어 모델의 성능에 대해 회의적인 중도 독자로부터 받은 메시지에서 시작되었어요.

중도 독자가 ChatGPT를 사용한 질문/답변 세션을 보내줬고, 오픈 소스 도구를 사용하여 동일한 수준의 품질과 일관성을 실현할 수 있는지 물었어요.

그 질문에 흥미를 느껴서 도전해보기로 결정했어요. 몇 일 동안 Hugging Face의 다양한 오픈 소스 AI 도구를 연구하고 실험하며 조정하는 시간을 보냈어요. 나만의 소규모 전문가 팀을 결성하여 ChatGPT를 넘어서거나 심지어 뛰어넘길 수 있기를 바랬는데, 결과가 궁금하게요?

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

Well done! You've done amazing work by creating a chatbot that can engage in fluent and diverse conversations. What's even more impressive is that you accomplished this on your own computer without relying on external cloud services or APIs. This allowed you to maintain full control and privacy over your data and model.

![Image](/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_0.png)

## The Issue

With the article "Apple's iOS App Store announces sweeping changes in the EU," the objective is to identify the key question implied by the headline (or let the user ask it) and then provide a concise answer based on the article text.

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

여기 ChatGPT에서 받은 결과입니다...

# ChatGPT 결과

![이미지](/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_1.png)

# 우리의 개인 AI가 지역에서 이것을 어떻게 할까요?

음, 당신은 아마도 이것에는 최소한 Mistral-7B만큼 좋은 수퍼 모델이 필요할 것이라고 생각할 수 있습니다. 물론 당신이 좋은 NVidia GPU나 16GB의 메모리, 그리고 양자화된 버전을 갖고 있지 않는 이상 일반 노트북에서 실행할 수 없습니다.

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

그런 일은 없어요. 내가 구글 콜랩에서 실행하는 Mixtures of Experts (SoMoE)를 만들기로 결정했어. 또한 내 미니PC(130 달러짜리 팬리스 컴퓨터로 윈도우 11이 돌아가며 16GB RAM과 7세대 Intel 4코어 4스레드를 가지고 있는)에서도 테스트했어. 그래서 결론적으로 누구나 내 SoMoE를 실행할 수 있어.

![이미지](/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_2.png)

비밀 조리법? 작은 T5 모델이 텍스트를 요약하고 문서의 주요 질문을 제안하며, StableLM-Zephyr-3B의 양자화 버전이 질문에 대답하고 해당 문서에 대한 챗봇 역할을 한다는 것. 모든 것을 연결하기 위해 영어에만 BAAI/bge-base-en-v1.5 임베딩을 사용해서 벡터 데이터베이스를 만들고 유사성 검색 및 관련성 재랭킹에 작동시키고 있어.

![이미지](/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_3.png)

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

# 쉬운 방법

간단히 말하면, 기사의 텍스트 길이는 꽤 짧습니다. 4k 토큰 콘텍스트 길이를 가진 모델은 쉽게 전체 로드를 처리하고 텍스트를 처리할 수 있습니다.

Google Colab의 무료 티어(오직 CPU와 12GB RAM만 사용 가능)에서 다음을 수행할 수 있습니다:

```js
#Dependencies 설치 및 stablelm-zephyr-3b-GGUF 다운로드
!pip install transformers -U --no-cache-dir
!pip install llama-cpp-python==0.2.34
!pip install rich
!huggingface-cli download TheBloke/stablelm-zephyr-3b-GGUF stablelm-zephyr-3b.Q5_K_S.gguf --local-dir . --local-dir-use-symlinks False
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
editedtext = """Apple의 iOS 앱 스토어가 EU에서 대대적인 변화를 발표했습니다.
https://www.axios.com/2024/01/25/apple-app-store-eu-changes
저자: Ashley Gold, Axios Pro의 저자
Apple은 유럽의 디지털 시장 법안을 준수하기 위해 알 터 내 앱 스토어 및 앱 개발자를 위한 다른 새로운 옵션을 허용할 것이라고 회사가 목요일 밝혔습니다.
뉴스 주도: 3월 7일에 발효될 예정인 유럽의 주요 기술 경쟁 법은 개발자들이 배포 및 결제 처리를 위해 앱 스토어에 의존해야 하는 엄격한 규정을 완화하기를 Apple에 요구합니다.
Apple은 오랫동안 ..."""
```

```js
from rich.panel import Panel
import datetime
from rich.console import Console
console = Console(width=110)
with console.status("Loading ✅✅✅✅ stablelm-zephyr-3b with LLAMA.CPP...",
                    spinner="dots12"):
    llm = Llama(
        model_path="/content/stablelm-zephyr-3b.Q5_K_S.gguf",  # 먼저 모델 파일을 다운로드하세요
        n_ctx=4096,  # 사용할 최대 시퀀스 길이 - 더 긴 시퀀스 길이는 더 많은 리소스를 필요로 함을 참고하세요
        n_threads=2,  # 사용할 CPU 스레드 수, 시스템 및 결과 성능에 맞게 조정하세요
    )
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

안녕하세요! 아래 텍스트를 참고해주세요:

```js
context = editedtext # 주로 전체 문서입니다
query = "유럽 디지털 시장법에 대응하여 EU 앱 스토어에서 Apple이 시행하는 주요 변경 사항은 무엇인가요?"
template = f"""<|user|>\n주어진 텍스트 일부는 다음과 같습니다:\n-----
              {context}\n-----\n
              질문에 대한 답변을 해주세요. 답변은 정보를 제공하고 목록 형식으로 구성되어야 합니다. 답변할 수 없는 경우, "답변 불가"라고 말해주세요.\n
              질문: {query}

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

```
![Image](/TIL/assets/img/2024-07-13-HowIBuiltaChatbotthatCrushedChatGPTwithZeroCostAITools_4.png)

# The SoMoE way

I think that the best way to approach a text we don’t know anything about consists at least of 2 steps:

- read a summary
- get an idea of the main questions about that text


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

이러한 이유로 우리는 2개의 함수가 필요합니다: 하나는 텍스트를 요약하는 함수이고, 다른 하나는 텍스트에 대해 통찰력있는 질문을 제공하여 추천 시스템을 구축할 것입니다.

# 🦙 LaMini-Flan-T5–77M — 요약

Flan-T5 패밀리는 인코더-디코더 모델 그룹입니다. 이들은 텍스트 조작과 이해에서 뛰어나게 빠릅니다. 자세한 내용은 여기에서 확인할 수 있어요...

제한 사항은 문맥 크기에 있습니다: 모두 512개의 토큰 이상을 처리할 수 없습니다. 그래서 우리는 Langchain을 사용할 것입니다.

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

이 단계에서는 텍스트 스플릿터만 사용할 것입니다: 큰 텍스트 말뭉치를 작은 조각들로 나누는 도구와 전략입니다. 일반적으로 문단 수준으로 분할하라고 가르치는 자습서를 찾을 수 있지만, 여기서는 토큰만 사용할 것입니다(512 글자 제한이 있기 때문에).

```js
# 텍스트 파일 읽기
with open("/content/Article-edited.txt") as f:
  editedtext = f.read()
f.close()
# 토큰별로 나누기
from langchain.text_splitter import TokenTextSplitter
TOKENtext_splitter = TokenTextSplitter(chunk_size=430, chunk_overlap=20)
splitted_text_sum = TOKENtext_splitter.split_text(editedtext)  # 리스트 생성
```

이제 LaMini 모델에게 각 조각에 대한 간단한 요약을 생성해 달라고 요청하고 모든 요약을 결합할 수 있습니다.

```js
# 모델을 파이프라인으로 로드하기
from transformers import pipeline
model77 = pipeline('text2text-generation',model="MBZUAI/LaMini-Flan-T5-77M")
summary ="요약:\n"
# 조각을 순환하며
for item in splitted_text_sum:
  text = item
  template_summary = f'''텍스트: {text}

위 텍스트에 대한 명확한 요약을 작성하세요.
'''
  res = model77(template_summary, temperature=0.3, repetition_penalty=1.3, max_length=300, do_sample=True)[0]['generated_text']
  summary = summary + res + '\n'
print(summary)
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

매우 쉬워요! 몇 가지 테스트를 진행해 보시는 걸 권장해요.

# 🦙 LaMini-Flan-T5–77M — 질문 생성기

다음 단계는 주요 질문들을 추출하는 것이에요: 이것은 학교 교과서에서 일반적으로 찾을 수 있는 질문들과 동일한 것이죠 (좋은 교과서들에요): 챕터나 섹션 뒤에 작가들이 공부하는 데 도움이 되는 몇 가지 질문을 제공해요.

LaMini를 사용하면 매우 쉬워요, 프롬프트에 몇 가지 속임수만 있으면 돼요. 차별화된 점은 Text-Splitter의 정밀도를 높이는 것이에요. 우리는 크고 일반적인 질문만 원하는 게 아니에요.

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
TOKENtext_splitter = TokenTextSplitter(chunk_size=280, chunk_overlap=20)
splitted_text_qg = TOKENtext_splitter.split_text(editedtext) # 리스트 생성

for item in splitted_text_qg:
  text = item
  template_qg = f'''{text}\n\n
위의 텍스트에 대한 중요한 두 가지 질문을 작성하세요.
질문:
1.
2.
'''
  res = model(template_qg, temperature=0.3, repetition_penalty=1.3, max_length=250, do_sample=True)[0]['generated_text']
  ed_res = res.replace('? ','?#')
  list_res = ed_res.split('#')
  for i in list_res:
     quest2.append(i[3:])
```

280 토큰 단위로 청크가 생성되었습니다. 요약에 사용된 430 토큰과는 다릅니다.

# 최종 결과

GitHub 저장소에서 Google Colab 노트북 2개를 찾을 수 있습니다. 하나는 CPU만으로 실행되고, 다른 하나는 무료 T4 인스턴스(GPU)를 사용할 수 있는 노트북입니다.


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

오픈 소스 LLM이 여기 있고, 당신이 그것을 사용할 때 꼭 고루가 아니어도 됩니다.

가장 많이 사용하는 작업에 대한 몇 가지 함수를 만들면, 어떤 사용 사례에도 사용할 수 있는 스위스 아미 나이프를 갖게 됩니다.

그저 시작하는 용기만 있으면 됩니다!

이 기사를 즐겼기를 바랍니다. 만약 이 이야기가 가치를 제공하고 조금이라도 지원을 보여주고 싶다면 다음과 같은 방법을 사용할 수 있습니다:

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

- 이 이야기에 대해 많이 박수를 치세요
- 기억할 가치가 있는 부분을 강조하세요 (나중에 찾기 쉽고 더 나은 기사를 쓰기 위해)
- 직접 AI를 만들어보기 시작하는 방법을 배운다면, 무료 eBook을 다운로드하세요
- 무제한 Medium 이야기를 읽기 위해 월 $5를 내고 Medium 멤버십에 가입하세요
- Medium에서 나를 팔로우하세요
- 내 최신 기사를 읽어보세요 https://medium.com/@fabio.matricardi

더 많은 정보를 원한다면, 다음은 로컬 AI를 문서와 함께 사용하는 아이디어입니다:

WRITER at MLearning.ai / Midjourney ALPHA / 180K+ AI Art Prompts