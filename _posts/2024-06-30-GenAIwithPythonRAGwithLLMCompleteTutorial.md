---
title: "파이썬으로 GenAI 개발하기 최신 LLM과 RAG 완벽 튜토리얼"
description: ""
coverImage: "/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_0.png"
date: 2024-06-30 18:30
ogImage: 
  url: /assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_0.png
tag: Tech
originalTitle: "GenAI with Python: RAG with LLM (Complete Tutorial)"
link: "https://medium.com/towards-data-science/genai-with-python-rag-with-llm-complete-tutorial-c276dda6707b"
---


<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_0.png" />

이 기사에서는 개인 문서에서 지식을 효과적으로 학습하고 질문에 대답할 수 있는 간단한 AI를 구축하는 방법을 보여드리겠습니다.

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_1.png" />

## 소개

<div class="content-ad"></div>

자연어 처리(NLP)는 기계와 인간 언어 간의 상호작용을 연구하는 인공 지능 분야입니다. 지금까지 NLP의 정점은 거대한 양의 텍스트 데이터로 훈련된 대형 언어 모델(LLM)의 등장이었습니다. LLM은 언어 패턴과 변형을 학습할 수 있는 능력을 갖추고 있습니다. "언어 모델"이라는 용어는 딥 러닝과 신경망의 발전과 함께 흔해졌습니다. 특히 2018년 구글이 Transformer 기반 아키텍처를 소개한 후에는 NLP 모델의 성능이 크게 향상되었습니다.(구글의 BERT 및 OpenAI의 GPT).

오늘날 LLM은 일반적으로 텍스트 간 작업 또는 "텍스트 생성"(즉, 번역, 요약, 챗봇 및 가상 비서, 심지어 전체 책 작성)에 사용됩니다. 이를 통해 우리는 새로운 콘텐츠(텍스트, 이미지, 오디오, 비디오 등) 작성에 초점을 맞춘 산업 분야인 생성적 인공지능(GenAI)의 부상을 목격하고 있습니다.

최신 LLM 풍경:

- OpenAI의 ChatGPT, 가장 많이 사용됨 (여기서 시도해보기)
- Anthropic의 Claude(여기서 시도해보기)
- Google의 Gemini(여기서 시도해보기)
- Meta의 Llama(여기서 시도해보기)
- Microsoft의 Phi, 사용 가능한 모델 중 가장 작은 모델로 GPU 없이도 노트북에서 실행 가능(여기서 시도해보기)
- StabilityAI의 StableLM
- Cohere의 CommandR(여기서 시도해보기)
- Snowflake의 Arctic(여기서 시도해보기)
- Alibaba의 Qwen(여기서 시도해보기)
- 01AI의 Yi
- X의 Grok
- NVIDIA의 Megatron
- 아마존의 Olympus(아직 출시 예정)
- Apple의 MM1(아직 출시 예정)

<div class="content-ad"></div>

ChatGPT은 가장 일반적으로 사용되는 LLM입니다. 그러나 회사들은 그것으로 업로드하기 어려운 문제가 있습니다. (대부분은 개인 정보 및 보안 상의 이유로) OpenAI에 민감한 데이터를 업로드할 수 없습니다. 따라서 회사들은 비공개 지식베이스에서 LLM의 파워를 활용하기 위해 내부 AI 서비스를 개발하고 있습니다. 이러한 종류의 작업을 검색 증강 생성(RAG)이라고 합니다. 이 기술은 외부 소스에서 가져온 지식 사실을 LLM에 추가하여 검색 및 생성 모델을 결합하는 방법입니다.

조직 내에서, 지식 베이스는 일반적으로 다중 모달 콘텐츠(예: 텍스트, 이미지, 스프레드시트)를 포함한 문서로 구성되어 있으므로, 기계가 이해할 수 있도록 모든 것들을 처리하는 것이 가장 큰 도전입니다. 간단히 말해서, 먼저 모든 문서를 임베딩으로 변환한 다음 사용자 쿼리를 동일한 벡터 공간으로 변환하여 코사인 유사도 검색을 수행합니다.

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_2.png)

이 자습서에서는 GPU 없이 일반 노트북에서 실행 가능한 LLMs 및 다중 모달 데이터를 사용하여 RAG 앱을 만들 것입니다. 다른 유사한 경우에 쉽게 적용할 수 있는 유용한 Python 코드 몇 가지를 제시하고 있으며 (그저 복사하여 붙여넣기하고 실행하면 됩니다), 각 코드 라인에 대한 설명을 포함하여 이 예제를 복제할 수 있도록 안내할 것입니다 (전체 코드에 대한 링크는 아래에 있습니다).

<div class="content-ad"></div>

특히 다음을 살펴볼 것입니다:

- 설정: Pdf2image로 데이터 가져오기, PyTesseract로 OCR 처리하기.
- 전처리: Ollama를 사용하여 LLM으로 데이터를 보강하기.
- 데이터베이스: ChromaDB로 데이터를 벡터로 저장하고 쿼리하기.
- 백엔드: Ollama를 사용하여답변 생성하기.
- 프론트엔드: Streamlit으로 사용자가 AI와 상호작용할 수 있는 인터페이스 구축하기.

## 설정

현실 세계에서 회사들은 대부분의 문서를 공유하기 전에 해당 형식으로 변환하는 PDF를 광범위하게 사용합니다. 또한 이미지, 테이블, 텍스트가 포함된 문서들이 많이 있어 좋은 사용 사례를 나타냅니다. 따라서 이 예제에서는 PDF 형식의 공개 회사의 재무 보고서를 데이터셋으로 사용할 것입니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_3.png)

PDF 문서를 처리하는 두 가지 대안적 방법이 있습니다: 텍스트로 읽거나 이미지로 구문 분석합니다. 둘 다 사용 사례에 따라 다르기 때문에 완벽하지는 않지만, OCR (광학 문자 인식) 기능이 더 잘 작동하는 경향이 있으므로 이를 사용하겠습니다.

이 기사의 초점이 OCR에 있지는 않으며, 작동 방식에 대해 자세히 설명하는 데 너무 많은 시간을 할애하지는 않을 것입니다. 만약 해당 주제를 깊이 파고들고 싶다면, 이 기사를 확인하고 LayoutParser와 Unstructured 같은 고급 OCR 라이브러리를 사용해 보세요.

우선 문서를 이미지로 변환해야 합니다:

<div class="content-ad"></div>


# conda install -c conda-forge poppler
import pdf2image #1.17.0

doc_img = pdf2image.convert_from_path("data/doc_nvidia.pdf", dpi=300)

# 예시로 한 페이지 출력
doc_img[35]


<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_4.png" />

그런 다음, 페이지(이미지)에서 텍스트를 인식하겠습니다. 이를 위해 HP에서 1985년에 만들어진 주요 OCR 시스템 Tesseract를 사용하고 있으며 현재 Google에서 개발 중에 있습니다.


import pytesseract #0.3.10

doc_txt = []
for page in doc_img:
    text = pytesseract.image_to_string(page)
    doc_txt.append(text)

doc_txt[35]


<div class="content-ad"></div>

![2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_5.png](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_5.png)

이제 우리는 생 텍스트를 가지고 있으니, 무엇보다 처리를 해야 할 것입니다. 우리는 언어 모델을 사용할 것입니다. 현재 여러 가지 대체 라이브러리들이 있어서 LLM의 힘을 활용할 수 있습니다: Ollama, HuggingFace, DSPy, LangChain. 제가 사용하는 Ollama는 강력하면서 사용하기 쉽습니다.

먼저, 웹사이트에서 프로그램을 다운로드해야 합니다. 그런 다음, 명령 프롬프트에서 아래 명령을 입력하여 노트북에서 LLM을 실행합니다 (저는 Phi3와 LLaVa를 사용하고 있습니다):

![2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_6.png](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_6.png)

<div class="content-ad"></div>

마지막으로, Python 라이브러리를 설치하면 끝입니다 (pip install ollama).

## 전처리

어떤 데이터 과학 프로젝트든 마찬가지로, 언제나 가장 어려운 부분은 데이터셋입니다. 머신러닝을 얼마나 많이 사용하더라도 데이터가 좋지 않다면 AI가 제대로 작동하지 않을 것입니다.

LLM(대형 언어 모델)의 경우, 임베딩이 포함되어 있기 때문에 표준 플랙티스는 모든 것을 텍스트로 변환하는 것입니다. 가장 일반적인 다중모달 콘텐츠 (텍스트, 테이블, 이미지, 플롯)의 처리 방법을 보여드리겠습니다.

<div class="content-ad"></div>

텍스트 — 문서는 서로 다른 구조와 레이아웃을 가질 수 있기 때문에 데이터 세트를 단락으로 분할해야 합니다. 원시 텍스트 외에도 제목, 태그, 링크와 같은 추가 정보를 활용하여 데이터를 보강할 수 있습니다. 이를 메타데이터 보강이라고 합니다.

```js
# 목차를 사용하여 단락에 태그 지정하기
title_map = {
    "4-12":"비즈니스",
    "13-33":"위험 요인",
    "34-44":"재무",
    "45-46":"이사",
    "47-83":"데이터"
}

lst_docs, lst_ids, lst_metadata = [], [], []
for n,page in enumerate(doc_txt):
    try:
        ## 제목 가져오기
        title = [v for k,v in title_map.items() 
                 if n in range(int(k.split("-")[0]), 
                               int(k.split("-")[1])+1)][0]
        ## 페이지 정리
        page = page.replace("Table of Contents","")
        ## 단락 가져오기
        for i,p in enumerate(page.split('\n\n')):
            if len(p.strip())>5:  ##<--단락 정리
                lst_docs.append(p.strip())
                lst_ids.append(str(n)+"_"+str(i))
                lst_metadata.append({"title":title})
    except:
        continue


## 예시 출력
for id,doc,meta in zip(lst_ids[375:378], 
                       lst_docs[375:378], 
                       lst_metadata[375:378]):
    print(id, "-", meta, "\n", doc, "\n")
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_7.png" />

언어 모델을 사용한 메타데이터 보강은 문서 검색을 크게 향상시킬 수 있습니다. 예를 들어, 각 단락을 몇 가지 키워드로 요약하는 데 Phi3를 사용할 예정입니다.

<div class="content-ad"></div>

```js
import ollama #0.2.1

def keyword_generator(p, top=3):
    prompt = "다음 단락을 3개의 키워드로 요약해주세요, 각각 ,로 구분: "+p
    res = ollama.generate(model="phi3", prompt=prompt)["response"]
    return res.replace("\n"," ").strip()


## test
p = '''Professional artists, architects and designers use NVIDIA partner products accelerated with our GPUs and software platform for a range of creative and design
use cases, such as creating visual effects in movies or designing buildings and products. In addition, generative Al is expanding the market for our workstation-
class GPUs, as more enterprise customers develop and deploy Al applications with their data on-premises.'''
print(keyword_generator(p))
```

결과: “창의적 디자인, NVIDIA 파트너십, AI 확장”. 위와 같이 모든 단락에 적용하겠습니다:

```js
from tqdm.notebook import tqdm

for i,doc in tqdm(enumerate(lst_docs)):
    lst_metadata[i]["keywords"] = keyword_generator(doc)

## 예시 출력
for id,doc,meta in zip(lst_ids[375:378], 
                       lst_docs[375:378], 
                       lst_metadata[375:378]):
    print(id, "-", meta, "\n", doc, "\n")
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_8.png" />

<div class="content-ad"></div>

TABLES - LLM(Large Language Model)는 순차 텍스트를 현저한 정확도로 처리할 수 있는 것으로 잘 알려져 있습니다. 그러나 이제 구조화된 데이터도 이해하기 시작했기 때문에 테이블은 일반 텍스트로 전달될 수 있습니다. 이를 다시 한번 확인해보겠습니다:

```js
table = lst_docs[376]
print("테이블:\n", table)

prompt = f"다음 테이블을 요약해주세요: {table}"
res = ollama.generate(model="phi3", prompt=prompt)["response"]

print("\n요약:\n", res)
```

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_9.png)

이미지 - 이미지의 임베딩은 상당히 까다로울 수 있습니다(3D 배열의 차원을 벡터로 축소해야 함). 따라서 일반적인 실천 방법은 이미지를 설명하는 캡션을 생성하기 위해 AI를 사용하고 가능한 경우 정보를 텍스트로 처리하는 것입니다.

<div class="content-ad"></div>

```python
from matplotlib import image, pyplot

image_file = "data/image.jpeg"

pyplot.imshow(image.imread(image_file))
pyplot.show()
```

![image](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_10.png)

LLM을 위해 이미지를 문자열로 변환해야 합니다:

```python
## 이미지를 base64 문자열로 인코딩
import base64

def encode_image(path):
    with open(path, "rb") as file:
        return base64.b64encode(file.read()).decode('utf-8')

img = encode_image(image_file)
img[:1000]
```

<div class="content-ad"></div>

아래는 테이블 태그를 Markdown 형식으로 변경한 예시입니다.


<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_11.png" />

모델에 이미지 설명을 요청하는 문자열을 전달할 수 있습니다. 안타깝게도 Phi3은 시각 모델이 아니기 때문에 이 작업에 적합하지 않습니다:

```js
prompt = "이미지를 설명해주세요"
res = ollama.generate(model="phi3", prompt=prompt, images=[img])["response"]
print(res)
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_12.png" />


<div class="content-ad"></div>

따라서 적절한 시각 모델을 구해야 합니다. Microsoft의 LLaVa는 GPU 없이도 실행할 수 있어 효율적인 선택입니다 (여기에서 시도해 보세요).

```js
## LLaVA
prompt = "이미지를 설명해주세요"
res = ollama.generate(model="llava", prompt=prompt, images=[img])["response"]
print(res)
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_13.png" />

PLOTS — 이미지와 마찬가지로, 시각 모델은 플롯/차트를 읽고 요약할 수 있지만 결과가 정확하지는 않습니다. 예를 살펴보겠습니다:

<div class="content-ad"></div>

```js
이미지_파일 = "data/plot.png"

pyplot.imshow(image.imread(image_file))
pyplot.show()

img = encode_image(image_file)

prompt = "그래프와 같은 그림에 대해 구체적으로 설명해주세요."
res = ollama.generate(model="llava", prompt=prompt, images=[img])["response"]
print(res)
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_14.png" />

## 데이터베이스

우리는 데이터를 벡터 데이터베이스에 저장할 수 있습니다. 이는 비구조적 데이터를 효율적으로 저장하고 색인화하고 검색하는 가장 좋은 해결책입니다. 요즘 가장 많이 사용되는 벡터 데이터베이스는 Microsoft의 AISearch입니다. 최고의 오픈 소스 도구는 유용하고 쉽고 무료인 ChromaDB입니다.

<div class="content-ad"></div>

빠르게 "pip install chromadb"를 입력하면 Python을 사용하여 세 가지 다른 방법으로 db와 상호 작용할 수 있습니다:

- chromadb.Client()는 디스크 공간을 차지하지 않고 메모리에 일시적으로 유지되는 db를 만듭니다.
- chromadb.PersistentClient(path)는 로컬 기계에서 db를 저장하고 로드합니다.
- chromadb.HttpClient(host='localhost', port=8000)는 브라우저에서 클라이언트-서버 모드를 사용할 수 있습니다.

ChromaDB에 문서를 저장할 때 데이터는 벡터로 저장되어 일치하는 레코드를 검색할 때 쿼리 벡터를 사용할 수 있습니다. 참고로, 그렇게 명시하지 않으면 기본 임베딩 방법은 문장 변환 모델 (all-MiniLM-L6-v2)입니다.

```js
import chromadb #0.5.0

db = chromadb.PersistentClient()

collection_name = "nvidia"
collection = db.get_or_create_collection(name=collection_name, 
               embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())

collection.add(documents=lst_docs, ids=lst_ids, metadatas=lst_metadata, 
               images=None, embeddings=None)
collection.peek(1)
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_15.png" />

어떤 것을 쿼리해보세요:

```js
query = "수익은 얼마인가요?"
collection.query(query_texts=[query])
```

<img src="/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_16.png" />

<div class="content-ad"></div>

쿼리가 동일한 벡터 공간에 포함되어 있고 ChromaDB가 가장 가까운 문서를 검색했습니다. 그들을 결합해서 db에서 최종 응답을 얻을 수 있습니다:

```js
res_db = collection.query(query_texts=[query])["documents"][0][0:10]
context = ' '.join(res_db).replace("\n", " ")
context
```

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_17.png)

db 응답은 컨텍스트로 사용될 수 있으며, 이는 LLM이 저장하고 액세스할 수 있는 소량의 정보 세트입니다. 프롬프트를 사용하여 모델이 컨텍스트 내 정보만 사용할지 훈련 중에 학습한 지식도 사용해야 하는지 지정할 수 있습니다.

<div class="content-ad"></div>

```js
# Context만으로 대화하기
res = ollama.chat(model="phi3", 
                  messages=[{"role":"system", "content":"다음 정보만을 사용하여 가장 정확한 답변을 제공하세요: \n"+context},
                            {"role":"user", "content":query}])
print(res["message"]["content"])
```

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_18.png)

또는 모델의 지식을 추가하여:

```js
# 지식 및 Context로 대화하기
res = ollama.chat(model="phi3", 
                  messages=[{"role":"system", "content":"귀하의 지식과 다음 추가 정보를 사용하여 가장 정확한 답변을 제공하세요: \n"+context},
                            {"role":"user", "content":query}])
print(res["message"]["content"])
``` 


<div class="content-ad"></div>


![Image](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_19.png)

데이터베이스가 설정되어 정상적으로 작동 중입니다. 다음 단계로 진행하여 문서에 관한 질문을 할 수 있는 챗봇 앱을 만들 수 있습니다.

## 프론트엔드

요즘 가장 많이 사용되는 Python 라이브러리인 Streamlit은 NLP 애플리케이션 개발을 간편하게 만들어주는 스트리밍 기능으로 알려져 있습니다.


<div class="content-ad"></div>

시작하기 전에 먼저 레이아웃을 정의해 봅시다: 화면에는 사용자가 채팅 기록을 볼 수 있는 사이드바가 있기를 원합니다.

```python
import streamlit as st #1.35.0

## 레이아웃
st.title('💬 궁금한 점을 적어주세요')
st.sidebar.title("채팅 기록")
app = st.session_state

if "messages" not in app:
    app["messages"] = [{"role":"assistant", "content":"정보를 검색할 준비가 되어 있습니다."}]

if 'history' not in app:
    app['history'] = []

if 'full_response' not in app:
    app['full_response'] = '' 
```

앱 객체(또는 session_state)는 다음과 같은 구조를 갖는 딕셔너리입니다:

![이미지](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_20.png)

<div class="content-ad"></div>

만약 채팅에서 메시지가 사라지는 것을 원하지 않는다면, 다음 코드를 추가하세요:

```js
## 채팅 메시지 유지
for msg in app["messages"]:
    if msg["role"] == "user":
        st.chat_message(msg["role"], avatar="😎").write(msg["content"])
    elif msg["role"] == "assistant":
        st.chat_message(msg["role"], avatar="👾").write(msg["content"])
```

이제 채팅 코어를 코드화해야 합니다: 사용자의 질문은 메시지 목록에 추가되어 AI로 전달되고, 앱은 응답을 스트리밍할 것입니다.

```js
## 채팅
if txt := st.chat_input():
    ### 사용자 입력
    app["messages"].append({"role":"user", "content":txt})
    st.chat_message("user", avatar="😎").write(txt)

    ### AI가 채팅 스트림으로 응답
    app["full_response"] = ""
    st.chat_message("assistant", avatar="👾").write_stream( xxx ) )
    app["messages"].append({"role":"assistant", "content":app["full_response"]})
    
    ### 사이드바 히스토리 보여주기
    app['history'].append("😎: "+txt)
    app['history'].append("👾: "+app["full_response"])
    st.sidebar.markdown("<br />".join(app['history'])+"<br /><br />", unsafe_allow_html=True)
```

<div class="content-ad"></div>

우리는 사용자 질문에 응답하는 기능을 완성한 후 "xxx"로 대체할 자리 표시자를 삽입했습니다. 앱을 실행하면 다음과 같이 보입니다:

![앱 실행 화면](/assets/img/2024-06-30-GenAIwithPythonRAGwithLLMCompleteTutorial_21.png)

## 백엔드

우리는 이미 이 부분에 익숙합니다. 이것을 클래스 내에 넣기만 하면 됩니다. 강조할 몇 가지 포인트가 있습니다:

<div class="content-ad"></div>

- ChromaDB에서 컬렉션 이름을 호출하면, 이미 존재하는 경우 db는 새로 만들지 않고 "가져오게" 됩니다.
- Ollama 채팅 기능의 스트리밍 매개변수는 (stream=True)로 전환하여 완전한 응답 대신 텍스트 청크를 반환합니다.
- LLM을 호출할 때마다 이전 메시지에 대한 참조를 이해할 수 있도록 전체 채팅 기록을 입력으로 전달합니다.

```js
import chromadb #0.5.0
import ollama  #0.5.0

class AI():
 def __init__(self):
  db = chromadb.PersistentClient()
  self.collection = db.get_or_create_collection("nvidia")

 def query(self, q, top=10):
  res_db = self.collection.query(query_texts=[q])["documents"][0][0:top]
  context = ' '.join(res_db).replace("\n", " ")
  return context

 def respond(self, lst_messages, model="phi3", use_knowledge=False):
  q = lst_messages[-1]["content"]
  context = self.query(q)

  if use_knowledge:
   prompt = "Give the most accurate answer using your knowledge and the folling additional information: \n"+context
  else:
   prompt = "Give the most accurate answer using only the folling information: \n"+context

  res_ai = ollama.chat(model=model, 
        messages=[{"role":"system", "content":prompt}]+lst_messages,
                      stream=True)
  for res in res_ai:
   chunk = res["message"]["content"]
   app["full_response"] += chunk
   yield chunk

ai = AI()
```

Streamlit 앱을 실행하려면 다음 명령을 사용해야 합니다: streamlit run rag_app.py

<img src="https://miro.medium.com/v2/resize:fit:1400/1*C722wXvi4JCn3OrN8TbLLA.gif" />

<div class="content-ad"></div>

## 결론

본 글은 Python과 LLMs를 사용하여 RAG 앱을 만드는 방법을 보여주는 튜토리얼이었습니다. 우리는 언어 모델을 사용하여 멀티모달 콘텐츠를 처리하고, 그 데이터를 벡터 데이터베이스에 저장했습니다. ChatGPT와 비슷한 AI가 우리의 질문에 답변할 때 사용하는 데이터베이스입니다. 마지막으로 모델과 채팅할 수 있는 사용자 친화적인 인터페이스를 만들었습니다.

즐겁게 즐겼으면 좋겠습니다! 질문이나 피드백이 있으시면 언제든지 저에게 연락해 주시거나 귀하의 흥미로운 프로젝트를 공유해 주세요.