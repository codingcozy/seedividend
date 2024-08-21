---
title: "챗봇 치트 코드 Qwen110B로 스트림릿에서 돈을 쓰지 않고 활용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_0.png"
date: 2024-05-17 03:23
ogImage:
  url: /assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_0.png
tag: Tech
originalTitle: "Chatbot cheat code: Qwen110B on Streamlit without spending a penny — Part 2"
link: "https://medium.com/generative-ai/chatbot-cheat-code-qwen110b-on-streamlit-without-spending-a-penny-part-2-3731a827f27f"
isUpdated: true
---

제1부에서는 수십억 개의 매개변수를 가진 큰 언어 모델에 무료로 액세스하고 활용할 수 있다는 것을 발견했어요. 제처럼 여러분도 하드웨어 한정으로 고민 중이라면, 이 해킹 방법은 하이엔드 GPU나 유료 구독 없이도 Qwen-110B-chat과 같은 대규모 모델과 상호 작용할 수 있는 기쁨을 선사할 거예요.

제2부에서는 지금부터 체험을 더 향상시키기 위해 스트림릿 인터페이스로 동일한 개념을 적용하여 챗봇에 시각적으로 매력적인 스트리밍 효과를 추가할 거예요.

과정을 되짚어보자면, Python, Gradio_client 및 코딩 능력이 필요해요. AI 챗봇을 텍스트 인터페이스를 통해 만드는 데 초점을 맞추었어요:

- 환경 설정: 먼저 가상 환경을 만들고 필요한 패키지(huggingface_hub, gradio-client 및 streamlit)를 설치하세요. PyTorch나 TensorFlow가 필요하지 않으며, 상호 작용은 API를 통해 이루어질 거예요.
- Hugging Face API 토큰: 사용자는 Hugging Face에 등록하고 모델 추론 API에 액세스하기 위해 API 토큰을 생성해야 해요.
- 챗봇 코딩: Hugging Face Spaces에서 Gradio의 "API를 통해 사용" 기능을 활용하여 이러한 강력한 모델에 Python 코드로 연결하는 방법을 배웠어요. 특히 여러 언어로 상업적 이용을 위한 라이선스가 허용되는 Qwen 시리즈 모델에 초점을 맞췄어요.
- 스트리밍 효과: 코드 구조를 살펴보면, 모델과 상호 작용할 수 있는 함수를 만드는 방법을 설명했어요. predict() 및 submit() 메서드 중에서 선택하여 스트리밍 효과와 함께 또는 없이 응답을 생성하는 방법을 강조했어요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

조금 헤매고 있다면 part 1부터 시작하는 것을 제안해요:

## 핵심 코드부터 Streamlit 인터페이스까지

이걸 꼭 말해야 해요: 터미널에서 모든 앱이 정상 작동하지 않으면 그래픽 인터페이스를 시작하지 말아야 해요.

이건 필수 조건이에요! 그래서 Streamlit 인터페이스를 만드는 것이 아주 쉬울 거에요: 이미 이전 파트에서 라이브러리와 상호작용이 어떻게 작동하는지 확인했기 때문이죠.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

모든 것은 이 핵심을 중심으로 움직입니다:

```js
from gradio_client import Client

client = Client("Qwen/Qwen1.5-110B-Chat-demo")
result = client.submit(
        query='What is Science?',
        history=[],
        system="You are a helpful assistant.",
        api_name="/model_chat"
)
print(result)
```

그리고 submit() 메소드를 사용하여 스트리밍 객체/반복자를 얻을 수 있다는 것을 알고 있습니다. Streamlit을 사용하면 스트림을 다루기가 훨씬 쉬워집니다. 사실, 애플리케이션은 항상 페이지 위젯을 새로 고치기 때문에 텍스트 애플리케이션에서 사용되는 지루한 알고리즘을 무시할 수 있습니다. 기억하시나요?

```js
    final = ''
    for chunk in result:
        if final == '':
            final=chunk[1][0][1]
            print(chunk[1][0][1], end="", flush=True)
        else:
            try:
                print(chunk[1][0][1].replace(final,''), end="", flush=True)
                final = chunk[1][0][1]
            except:
                pass
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

string.replace()을 사용하여 이미 생성된 것에서 새로운 단어를 빼내는 작업을 했었는데, 더이상 필요하지 않아요.🥳

# Streamlit 앱

습관적인 사람이라... 그래서 내 코드가 다른 프로젝트와 매우 비슷하다는 사실을 발견할 수 있을 거에요. 그런데 괜찮아요! 결국, 템플릿을 적용하고 수정하는 것이 매번 처음부터 시작하는 것보다 쉽고 빠를 수 있거든.

새 파일을 만들어보세요: 제 파일은 st-Qwen1.5–110B-Chat.py라고 해요. 주요 라이브러리를 가져와 세션 상태 전역 변수를 생성하는 것부터 시작해볼까요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
import streamlit as st
import time
import sys
from gradio_client import Client
# Internal usage
import os
from time import sleep


if "hf_model" not in st.session_state:
    st.session_state.hf_model = "Qwen1.5-110B-Chat"
# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []
```

프로그램에서 전역 변수는 공유되어 사용될 수 있습니다. 또한 session_state라고 불리는 이러한 객체들이 streamlit의 매 실행마다 변경되지 않는 것을 필요로합니다.

그리고 2가지 주요 함수를 정의합니다:

```python
@st.cache_resource
def create_client():
    yourHFtoken = "hf_xxxxxxxxxxxxxxxxxxxxxxx" #여기에 여러분의 HF 토큰을 넣으세요
    print(f'{st.session_state.hf_model}에 대한 API Gradio 클라이언트를 로딩 중입니다.')
    client = Client("Qwen/Qwen1.5-110B-Chat-demo", hf_token=yourHFtoken)
    return client

# 모든 채팅 메시지를 chathistory.txt에 기록하는 함수
def writehistory(text):
    with open('chathistorywen110b.txt', 'a', encoding='utf-8') as f:
        f.write(text)
        f.write('\n')
    f.close()
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희는 @st.cache_resource 데코레이터를 사용하고 있습니다. 이는 Qwen1.5-110에 대한 API gradio 클라이언트를 Streamlit이 매 실행마다 로딩하지 않기를 원하기 때문입니다 (이는 분당 1회 이상 발생할 수 있습니다): Gradio 클라이언트 연결이 실행 중에 변경되지 않을 것이기 때문에, 이 리소스를 특별한 메모리에 캐싱하고 있습니다 (@st.cache_resource). 자세한 내용은 여기에서 확인하실 수 있습니다.

## 일부 그래픽 조정

이제 기본 Streamlit 페이지 요소와 챗봇에 사용할 아이콘을 설정할 수 있습니다.

```js
#아바타
av_us = '🧑‍💻'  # './man.png'  #"🦖"  # "🧑‍💻", "🤖", "🦖"과 같은 단일 이모지입니다. Shortcut은 지원되지 않습니다.
av_ass = "🤖"   #'./robot.png'
# 기본 모델 설정

### STREAMLIT UI 시작
st.image('https://github.com/fabiomatricardi/ChatBOTMastery/raw/main/qwen100logo.png', )
st.markdown("### *Streamlit & Gradio_client로 구동됨*", unsafe_allow_html=True )
st.markdown('---')

client = create_client()
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 채팅 인터페이스에 로컬 이미지를 사용할 수도 있어요 (코드의 주석을 참고하세요!)
- 마지막으로, create_client()로 클라이언트 연결을 인스턴스화해요.

# 본문 — 채팅 인터페이스

Streamlit은 자신의 위젯에 변경이 발생할 때마다 또는 입력(버튼, 선택기, 라디오 요소 등)으로 사용자 조작이 호출될 때마다 코드를 맨 위부터 다시 실행해요.

그래서 저희는 대화 기록을 맨 위에 먼저 렌더링하기 시작했어요. 여기서는 뭐라도 새롭게 발명한 건 없어요: Streamlit 블로그의 공식 자습서에서 모두 배웠거든요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이것은 표준 렌더링입니다. OpenAI API와 호환되는 chat_completion 형식에 모두 적용 가능합니다.

코드로 돌아가서, 우리는 chat_template 메시지들을 표시하고, 메시지 목록을 반복하며 사용자 프롬프트(myprompt)가 제출되기를 기다립니다.

```js
# 앱 재실행 시 이전 대화 내용을 보여줍니다
for message in st.session_state.messages:
    if message["role"] == "user":
        with st.chat_message(message["role"],avatar=av_us):
            st.markdown(message["content"])
    else:
        with st.chat_message(message["role"],avatar=av_ass):
            st.markdown(message["content"])
# 사용자 입력 받기
if myprompt := st.chat_input("인공지능 모델이란 무엇인가요?"):
    # 사용자 메시지를 대화 내역에 추가
    st.session_state.messages.append({"role": "user", "content": myprompt})
    # 대화 메시지 컨테이너에 사용자 메시지 표시
    with st.chat_message("user", avatar=av_us):
        st.markdown(myprompt)
        usertext = f"user: {myprompt}"
        writehistory(usertext)
        # 차후 사용을 위해 대화 상대의 응답을 표시
```

여기에 이상한 writehistory(usertext) 지시문을 추가하고 있는 것을 볼 수 있습니다. 기억하시나요? 처음에 이 함수를 선언했던 거죠? 저는 모든 대화 내용을 로컬 텍스트 파일에 저장하는 버릇이 있어요. 이는 프롬프트를 분석하거나 미래 활용을 위해 자료를 조직화할 때 매우 편리합니다.🙂

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프롬프트에서 제출된 내용을 확인한 후, gradio 클라이언트 인스턴스(client.submit)를 호출하고 스트리밍을 시작합니다 (message_placeholder.markdown(r[1][0][1]+ "▌"))

```js
    # 채팅 메시지 컨테이너에 어시스턴트 응답 표시
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        res  =  client.submit(
                query=myprompt,
                history=[],
                system="You are a helpful assistant.",
                api_name="/model_chat"
                )
        for r in res:
            full_response=r[1][0][1]
            message_placeholder.markdown(r[1][0][1]+ "▌")

        message_placeholder.markdown(full_response)
        asstext = f"assistant: {full_response}"
        writehistory(asstext)
        st.session_state.messages.append({"role": "assistant", "content": full_response})
```

이게 전부에요. full_response는 최종 텍스트가 들어 있는 변수이므로 대화 기록에도 추가하여 표시합니다.

해결했으면 댓글에 알려주세요 👍

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

파이썬 파일을 저장한 후 터미널에서 가상 환경을 활성화한 상태에서 다음과 같이 실행하세요.

```js
streamlit run .\st-Qwen1.5-110B-Chat.py
```

아래처럼 나와야 합니다... 그리고 기본 브라우저가 로컬 URL인 http://localhost:8501로 열리게 됩니다.

![이미지](/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_0.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Streamlit은 로컬 네트워크로의 편리한 라우팅을 제공합니다. 예를 들어, 핸드폰이 동일한 액세스 포인트에 연결되어 있으면 Network URL로 표시된 주소인 http://192.168.2.6:8501을 통해 핸드폰에서도 이 애플리케이션을 사용할 수 있습니다.

![이미지](/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_1.png)

# 다른 모델 실행에 대한 참고 사항

GitHub 리포지토리에서도 Streamlit Python 파일을 실행하는 방법을 찾을 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- OpenELM 3B
- Phi-3-mini-Instruct 128k
- QwenMoE

고객 구성이 변경될 예정입니다 (물론...) 그리고 스트리밍 지침도 변경될 것입니다. 이는 API 엔드포인트가 다른 데이터 유형을 반환하기 때문에 발생합니다. OpenELM 및 Phi-3의 경우 순수한 문자열이 반환되므로 어떠한 사전/튜플 위치에 있는 LLM 응답을 추출할 필요가 없습니다. 여기를 살펴보세요:

그리고 또한 PLEASE, 기억해주세요...

![이미지](/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_2.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 결론

이 모든 복잡성을 다루는 이유는 무엇일까요? 우리는 어떻게 일하는지 배우고, 나만의 AI 비서를 만드는 방법을 알고 싶기 때문입니다. 내가 상상할 수 있는 최고의 목적을 위해 콘텐츠 생성, 학습 자료, 프레젠테이션, 교육 지원 등.

어디에 사용할 건가요?

글이 마음에 드셨으면 좋겣습니다. 이 이야기가 가치를 제공했고 조금이라도 지원하고 싶다면 다음을 해볼 수 있습니다 :

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 이 이야기에 대해 많이 박수를 쳐 주세요
- 기억할 가치가 있는 부분을 강조하십시오 (나중에 찾기 쉽고, 더 나은 기사를 쓰는 데 도움이 될 것입니다)
- Build Your Own AI를 시작하는 방법을 배우려면, 무료 eBook을 다운로드하세요
- 내 링크를 사용하여 Medium 멤버십 가입하기 - (무제한 Medium 이야기를 읽으려면 매달 $5)
- Medium에서 나를 팔로우하기
- 내 최신 기사 읽기 https://medium.com/@fabio.matricardi

여기 몇 가지 더 흥미로운 읽을거리:

추가 학습 자료

![이미지](/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_3.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 이야기는 Generative AI Publication에서 발행되었습니다.

최신 AI 이야기를 놓치지 않으려면 Substack, LinkedIn 및 Zeniteq에서 저희와 연락하여 AI의 미래를 함께 창조해보세요!

![이미지](/assets/img/2024-05-17-ChatbotcheatcodeQwen110BonStreamlitwithoutspendingapennyPart2_4.png)
