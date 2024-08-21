---
title: "AI 프롬프트 엔지니어링 탐구 수학적 기초와 RAG 방법론"
description: ""
coverImage: "/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_0.png"
date: 2024-06-20 04:54
ogImage:
  url: /assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_0.png
tag: Tech
originalTitle: "Exploring AI Prompt Engineering: Mathematical Foundations and RAG Methodologies"
link: "https://medium.com/towards-artificial-intelligence/exploring-ai-prompt-engineering-mathematical-foundations-and-rag-methodologies-f2067a7c1996"
isUpdated: true
---

<img src="/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_0.png" />

## 대형 언어 모델 (LLMs)의 수학적 표현

먼저 대형 언어 모델 (LLM)을 다음과 같은 공식으로 표현합니다:

<img src="/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_1.png" />

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

간단해 보이지만, 우리가 AI 기법과 LLM에 적용하는 방법을 이해하려면 LLM 프레임워크 내에서 𝜔, 𝑋 및 𝑌를 특정 항목으로 해석해야 합니다.

LLM 가중치 (ω)

매개변수 세트 𝜔는 신경망 가중치 (모델 계수) 및 편향으로, 모델 훈련 중에 업데이트됩니다. 𝜔는 LLM의 응답에 영향을 줄 수 있지만, 세밀 조정이 이루어질 때까지 고정됩니다. 이러한 매개변수는 다음과 같이 표시될 수 있습니다:

![이미지](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_2.png)

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

𝑛은 현대 LLMs에는 수십억 개에 달할 수 있는 매개변수의 수를 나타냅니다. 그러나 이 논문에서는 이러한 매개변수를 주요 주제로 삼지 않고, AI 프롬프트 엔지니어링과 RAG 방법론에 초점을 맞추고자 합니다.

모델 입력 (X):

입력 𝑋에는 여러 항목이 함께 작동하여 예측 𝑌를 생성하는 데 기여합니다:

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_3.png)

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

- X_query: 사용자로부터 특정 질문 또는 요청.
- X_prompt: 개발자가 설정한 초기 프롬프트.
- X_RAG Prompts: 데이터 소스 D로부터 X_query를 기반으로 검색한 추가 프롬프트(문서).
- X_parameters: 온도, 최대 토큰, 스트림 옵션과 같은 매개변수

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

X\_매개변수는 모델 학습 매개변수가 아니지만 (예: 학습률, 신경망 레이어 수), 추론 중 LLM 동작에 유사한 역할을 합니다. 사용자가 이러한 매개변수를 지정하지 않으면, LLM은 파이썬 함수 기본값과 같은 기본값을 사용합니다. 사용자 매개변수와 기능에 대한 포괄적인 목록은 OpenAI API 문서를 참조하십시오.

출력 변수 (𝑌)

LLM에 의해 생성된 응답. 입력 X에 기반합니다.

입력 및 매개변수 사용자 정의하기

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

다양한 LLM은 다양한 입력 형식과 매개변수 집합이 필요할 수 있습니다. 우리는 OpenAI API를 사용하여 입력 구성에 초점을 맞춥니다. 𝑋의 각 구성 요소가 모델과 상호 작용하는 방법 및 조정이 생성된 응답 𝑌에 어떤 영향을 미치는지 살펴봅니다.

![이미지](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_4.png)

아래의 OpenAI 채팅 완성 API 예제를 사용하여 LLM의 표현을 보여줍니다:

```js
from openai import OpenAI
client = OpenAI()

system_prompt = "당신은 MSFT의 도움이 되는 HR 전문가입니다."

rags = {'Q': "문맥에서 혜택이란 무엇인지 설명하세요", 'A': '회사에서 직원이 받는 혜택으로, 건강 보험, 퇴직 계획 등이 포함됩니다'}

rag_prompt_question = {"role": "user", "content": rags['Q']}
rag_prompt_answer = {"role": "user", "content": rags['A']}
user_query = "MSFT의 데이터 과학자들의 혜택은 어떤가요?"

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": system_prompt},
    rag_prompt_question, rag_prompt_answer,
    {"role": "user", "content": user_query}
  ]
)
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

시스템 프롬프트가 X*쿼리인 경우, 모든 사용자 질문에 대한 고정 프롬프트입니다. rag_prompt_question 및 rag_prompt_answer는 X_RAG(X_query, D)이며, 여기서 D는 간단한 사전 rags로 단순화됩니다. 일반적으로 응용 프로그램에서 X_RAG는 D에서 X*쿼리를 검색하여 동적으로 얻어지지만, 이 예에서는 데모용으로 고정 X_RAG를 사용합니다.

## 맥락 내 학습 LLM의 해석

맥락 내 학습은 LLMs의 특정 용어로, LLMs가 사용자의 질문에 대해 입력-출력 프롬프트에 의존하여 응답하는 것을 의미합니다. 이는 LLMs가 더 적합한 프롬프트를 제공하면 사용자의 요청을 더 잘 해결할 수 있다는 것을 시사합니다. 예를 들어, 사용자가 user_query = “MSFT의 데이터 과학자들의 혜택은 어떤가요?”라는 질문을 한 경우, LLMs는 기본 추론을 사용하여 응답할 수 있으며, 이는 LLMs가 질문에 대한 가장 높은 확률로 사용하는 방식입니다:

![그림](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_5.png)

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

답변은 'MSFT가 당신을 선도하는 데이터 과학자로 만들어줄 수 있습니다'. 물론, 일부 LLM은 '혜택'의 여러 종류를 설명하는 포괄적인 답변을 제공할 수 있습니다. LLM의 응답 절차는 X_query만 가지고 있는 LLM들에게 '제로 샷 학습'을 가능케 하여 프롬프트 없이 응답할 수 있게 합니다. X_prompt 및 X_prompt와 같은 추가 프롬프트를 제공하면 LLM들이 필요한 정보를 응답합니다. 예를 들어 아래 프롬프트를 제공한다면:

Q: 맥락에서 '혜택'이란 단어를 설명해주세요.

A: 기업에서 직원이 받는 혜택으로, 건강 보험 등이 있습니다.

그러면 LLM은 MSFT 직원 혜택에 대해 간략히 설명해줍니다. 이것이 '퓨-샷 학습'으로, LLM에게 응답 품질을 향상시키기 위한 작은 정보 조각을 제공합니다. '샷'이란 LLM이 맥락을 이해하는 데 제공되는 예시 수를 가리킵니다. '퓨-샷'은 몇 가지 예시만 제공되는 것을 의미합니다. 이는 더 많은 정보를 제공하여 질문을 특정하게 만듭니다.

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

![ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_6.png)

'Shot Learning'에서의 'learning'이 LLM에서의 학습(매개변수 업데이트)과는 다르다는 사실을 주목해야 합니다. 여기서 'few-shot context learning'은 LLM이 더 정확한 응답을 생성하는 데 도움을 주기 위해 몇 가지 프롬프트만을 입력합니다. 이는 LLM의 입력 𝑋를 업데이트하여 모델의 출력을 더 구체적이고 관련성 있게 만들어 사전 훈련된 LLM이 추가 학습(모델 훈련)이나 세부 조정 없이도 더 예측 가능하게 합니다.

## RAG 프롬프트 및 개발의 수학적 해석

RAG(검색 증대 생성) 프롬프트는 LLM 응용 프로그램에서 중요합니다. ChatGPT와 같은 준비된 AI 플랫폼은 종종 암묵적으로 검색을 처리하지만, ChatGPT-4는 사용자가 정보 파일을 업로드하여 최종 응답을 생성하는 데 참조합니다.

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

AI 애플리케이션은 보통 RAG 기술에 영향을 받습니다. 이 기술은 모델이 다른 소스의 동일한 사용자와 호환되는 것뿐만 아니라 사용자 정보가 안전하게 보호되어 AI 언어 모델에 직접 액세스할 수 없는 시나리오를 지원합니다. RAG는 사용자나 문맥에 가장 적합한 데이터를 사용하는 상황에서 모델의 반응의 관련성과 정확성이 긍정적으로 영향을 받습니다. 사용자는 ChatGPT-4와 같은 대화식 AI 플랫폼 내에서 자주 사용하는 데이터를 업로드하거나 추가 문맥을 직접 추가할 수 있습니다. 그러나 고객 서비스 등에서 사용되는 것과 같이 더 복잡한 AI 시스템의 경우 이러한 방식으로는 불가능합니다.

다음은 AI 애플리케이션 시스템에서의 RAG 기술 구조입니다:

- X_query: AI 시스템에 사용자의 질문. 고객 서비스와 같은 특정 분야의 쿼리입니다.

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

- X_prompt: 개발자가 만든 AI 응용 프로그램 시스템에 맞는 프롬프트입니다. 신중하게 작성된 프롬프트는 시스템이 보다 정확한 응답을 제공하도록 합니다.

- X_RAG: 사용자의 쿼리, AI 프롬프트 및 사용자가 업로드한 데이터를 기반으로 시스템이 생성한 RAG 프롬프트입니다.

- D: AI 시스템이나 회사의 상용 환경 안에 포함된 비공개 정보입니다. 예를 들어, LLMs는 사용자 쿼리에 추가 정보를 제공하는 추출된 문서를 사용합니다.

- Y: 텍스트 답변이거나 Python 코드 실행 결과, SQL 쿼리 출력물 또는 오디오 응답을 포함한 멀티모달 콘텐츠일 수 있습니다. 사용자의 각 쿼리에 대한 솔루션으로 간주될 수 있습니다.

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

다양한 RAG 기술 및 해석

RAG Prompt의 구조에서 우리는 RAG 기술이 다음 요소들에 의존한다는 것을 알 수 있습니다:

- X_query: 사용자가 LLM에 요청하는 것.
- 개인 데이터 (D): 사용자 또는 개발자가 데이터를 제공합니다.

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

- 연관성 측정치: 쿼리와 D 간의 거리

이것은 원본 또는 변환된 요소 또는 그들의 조합을 사용하여 새로운 RAG 기술을 개발할 수 있다는 것을 의미합니다.

RAG 방법 1: 직접 임베딩 기반 검색

직접 임베딩 기반 검색은 임베딩 모델이 텍스트를 벡터 표현으로 변환하여 데이터베이스에 저장하는 기본적인 기술입니다. 사용자가 쿼리를 보낼 때, RAG 함수는 쿼리 벡터와 가장 유사한 문서 벡터(예: 상위 𝑘 = 5)를 데이터베이스에서 검색합니다. 검색된 문서는 LLM에 의해 더 정확한 응답을 생성하기 위한 추가 프롬프트로 사용됩니다.

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

아래와 같이, RAG 프롬프트는 쿼리와 private data 𝐷(doc) 간의 코사인 거리가 가장 짧은 5개 문서를 선택하여 검색됩니다. 여기서 우리는 코사인 거리를 역 유사성 측정으로 사용합니다.

예시: 직접 임베딩 기반 검색

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

아래 단계는 Azure OpenAI, 대화형 검색 LangChain 및 Chroma Vector 데이터베이스와 같은 도구를 사용하여 직접 삽입 기반 검색을 구현하는 방법을 보여줍니다:

단계 1: Chroma에 데이터 주입

```js
loader = TextLoader("intertnet_ts.txt", (encoding = "utf-8"));
documents = loader.load();
text_splitter = CharacterTextSplitter((chunk_size = 300), (chunk_overlap = 50));
chunks = text_splitter.split_documents(documents);
vectordb = Chroma.from_documents(
  (documents = chunks),
  (embedding = Embeddings_model),
  (persist_directory = "data/chroma_db")
);
```

단계 2: 텍스트 임베딩 모델 설정

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

```js
Embeddings_model = AzureOpenAIEmbeddings(
  (deployment = "embed"),
  (model = "em-ada"),
  (azure_endpoint = "https://HD-gpt4.openai.azure.com/"),
  (openai_api_type = "azure")
);
```

단계 3: RAG 검색기 함수 생성

```js
def get_retriever():
    loaded_vectordb = Chroma(persist_directory = "data/db", embedding_function = Embeddings_model)
    retriever = loaded_vectordb.as_retriever(search_type="mmr", k = 5)
    return retriever
```

단계 4: LLM 초기화

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
chat_model = AzureChatOpenAI(openai_api_version=OPENAI_API_VERSION, azure_deployment=OPENAI_DEPLOYMENT_NAME, temperature=0)
chat_retriever = get_retriever()
```

단계 5: 직접 포함 기반 검색을 위한 LangChain 설정

```python
qa_prompt = ChatPromptTemplate.from_messages(messages)
qa_chain = ConversationalRetrievalChain.from_llm(llm=chat_model, chain_type='stuff', retriever=chat_retriever, return_source_documents=False, combine_docs_chain_kwargs={"prompt": qa_prompt})
```

평가

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

직접 삽입 기반 검색은 인기 있는 RAG 방법입니다. 일반적으로 코사인이나 내적을 거리 측정 항목으로 사용하는데, 이 방법은 때로 의미론적 의미를 캡처하는 데 합리적인 결과를 제공하기 어려울 때가 있습니다. 예를 들어 사용자가 "MSFT의 시니어 데이터 과학자의 혜택은 무엇인가요?"라고 묻는 경우 시스템이 'MSFT에서 시니어 소프트웨어 엔지니어의 직책 책임' 문서를 검색할 수 있습니다. 그러나 이 RAG 방법을 기반으로 한 다른 문서들 중에서 "MSFT에서 시니어 직원을 위한 건강 보험 혜택, 주식 옵션, 전문 개발 프로그램"과 같은 내용도 포함하고 있지만 이 방법에 따라 매우 유사하지 않은 문서들이 더 나은 후보가 될 수 있습니다.

RAG 방법 2: 검색 재랭킹

먼저 Direct Embedding-Based Retrieval 방법을 사용하는 예제를 확인해 보겠습니다:

사용자의 질문: "MSFT에서 시니어 데이터 과학자의 혜택을 알려주세요"

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

아래와 같은 내용을 검색했습니다:

1. "마이크로소프트에서 시니어 소프트웨어 엔지니어의 직무 책임"

2. "마이크로소프트에서 시니어 직원을 위한 건강 보험 혜택, 주식 옵션 및 전문 개발 프로그램"

3. "쥬니어 데이터 과학자로 근무하는 장점에 대한 마이크로소프트의 혜택"

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

4. "시니어 엔지니어를 위한 MSFT의 휴가 정책"

5. "MSFT의 직장 문화 개요"

첫 번째 문서에는 쿼리와 관련성이 적은 유사한 용어들이 많이 포함되어 있습니다. 두 번째 문서는 혜택 (의료 혜택, 주식 옵션)와 더 관련이 있는 내용이므로 더 나은 선택일 것입니다.

따라서 이 문제를 해결하기 위해 RAG 재랭킹을 사용할 수 있습니다. 이 RAG 방법은 노출된 엔티티, 재랭킹 메커니즘 및 점수가 매겨진 문서를 결정하는 데 사용된 모델을 포함합니다. 문서들은 정리되어 가장 관련성이 높은 문서가 먼저 나타날 수 있도록 다시 정렬 및 필터링됩니다.

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

![이미지](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_10.png)

결과적으로 RAG 다시 순위 지정은 AI 프롬프트(X_RERANKED_RAG)를 LLM에 제공합니다. 논리는 LLM이 항상 주어진 순서대로 AI 프롬프트를 고려할 것이라는 것입니다. 사용자의 질문과 일치하는 문서를 AI 프롬프트 상단에 놓으면 더 나은 답변을 제공할 수 있을 것입니다.

예: 다시 순위 지정 검색

다음 단계에서는 다시 순위 지정 검색 과정을 설명합니다. 이 과정에서 llama_index, RankGPTRerank 및 OpenAI API 도구를 활용합니다:

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

문서 로드: SimpleDirectoryReader를 사용하여 문서를 로드하고 특정 데이터 형식으로 분할합니다.

벡터 저장소 인덱스 생성: 문서를 로드한 후 VectorStoreIndex를 사용하여 이러한 문서의 인덱스를 작성합니다. 이 벡터 공간을 사용하여 적합한 문서를 찾습니다.

리트리버 설정: 벡터 인덱스를 사용하여 리트리버를 작성합니다. 쿼리와 유사한 상위 k개의 노드를 가져 오도록 구성합니다.

관련 노드 검색: 쿼리 번들을 기반으로 리트리버에서 상위 k개의 노드를 검색합니다.

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

다시 랭크하는 방법: OpenAI 내장 RankGPTRerank 모델을 설정하여 노드들을 관련성 점수에 따라 내림차순으로 다시 랭크합니다.

평가

RAG 다시 랭크는 LLM의 응답의 정밀도를 향상시킬 수 있습니다. 이 과정은 두 단계로 구성됩니다. 첫 번째 단계는 직접 삽입 기반 검색과 동일합니다. 그런 다음, 보다 계산 집중적인 다시 랭킹이 이 문서들의 순서를 조정합니다. 마지막으로, 이러한 다시 랭크된 AI 프롬프트를 LLM에게 보내어 가장 관련성 높은 결과물을 먼저 검토하도록 합니다. 하지만 첫 번째 단계에서 여전히 코사인 거리를 기반으로 한 랭킹이므로 모든 검색된 문서가 쿼리의 의미적으로 매우 관련성이 높지 않을 수 있습니다. 다음은 예시입니다:

사용자의 질문: "MSFT에서 시니어 데이터 과학자의 혜택은 무엇입니까?"

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

첫 번째 단계 검색 (코사인 거리):

1. "MSFT의 시니어 소프트웨어 엔지니어의 업무 책임"

2. "MSFT에서 시니어 데이터 과학자 고용 프로세스"

3. "MSFT의 사무실 문화"

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

4. "Google에서 시니어 데이터 과학자의 직업 발전"

5. "MSFT의 주니어 직원들을 위한 혜택"

다시 순위를 매겼음에도 검색된 문서는 여전히 관련이 없습니다. 예를 들어, 첫 번째 문서와 네 번째 문서는 각각 '다른 역할'과 '다른 회사'에 관한 것입니다. 이는 첫 번째 단계의 재랭킹 방법의 한계를 보여줍니다.

재랭킹의 또 다른 단점은 계산 비용입니다. 두 번째 단계에서, 의미론적 정보를 정확하게 캡쳐하기 위해 LLM은 전체 문서와 쿼리를 완전히 이해해야 합니다.

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

RAG 방법 3: 변환된 입력 쿼리 검색 (TQR)

이 일반적인 RAG 기술에는 여러 가지 변형이 있지만, 아이디어는 비슷합니다: 원래 쿼리를 업데이트하여 개인 데이터(D)와 더 잘 일치시킵니다:

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_11.png)

여기서 Pipe()는 사용자 정의 함수, 변환기 또는 GPT-3 또는 GPT-4와 같은 LLM(Large Language Models)을 사용하는 LangChain일 수 있습니다. TQR의 합리적 근거는 변환된 쿼리가 개인 데이터 D의 이해하기 쉬운 문서로 변환된다는 것입니다. 때로는 사용자가 매우 개인화된 질문을 할 수 있으며, LLM은 먼저 노이즈를 제거하여 질문을 새로운 문서로 변환할 수 있습니다. 이로써 다음 단계의 RAG에서 개인 데이터의 관련 문서와 더 쉽게 일치시킬 수 있습니다. 수학적으로 보면, X*(query_new)와 D 간의 전체 유사성이 X*(query)와 D 간의 것보다 높습니다:

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

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_12.png)

RAG Method 3.1: 가상 문서 임베딩 (HyDE)

HyDE는 원래 질의 X_query를 가상 문서로 변환하여 TQR로 분류될 수 있습니다. 단계 1에서, 단계 2에서, 시스템은 새로운 쿼리와 개인 데이터 D(doc) 사이의 거리를 최소화하여 상위 k개의 문서를 검색합니다. 이 변환 함수 Pipe()는 OpenAI API를 사용한 LangChain 'hyde.chain'입니다.

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_13.png)

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

이 두 단계 프로세스는 검색된 문서의 관련성과 정확성을 향상시킬 수 있습니다. 그 이유는 LLM에 의해 생성된 가상 문서가 사용자의 쿼리 의도를 더 정확하게 파악할 수 있기 때문입니다. 논문 "HyDE: Hypothetical Document Embeddings"에 따르면, HyDE는 이전 최첨단 영제로 시스템보다 11개의 쿼리에서 현저히 뛰어나다는 것을 입증했습니다.

HyDE RAG는 다음 인기 있는 RAG를 다루고 있습니다:

- Self-querying Retrieval: LLM은 추가적인 관련 정보를 검색하기 위해 자체 쿼리를 생성하고, RAG 프롬프트가 LLM에게 전달되어 더 나은 응답을 생성합니다.

- MultiQuery Retriever: LLM은 사용자의 원래 쿼리로부터 여러 쿼리를 생성하고, 그 후 HyDE 단계를 따릅니다.

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

예시: HyDE

우리는 다음 사용 사례를 공부합니다:

사용자 질의: "MSFT에서 시니어 데이터 과학자의 혜택은 무엇입니까?"

우선 Direct RAG 검색 결과를 확인해 보겠습니다:

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

1. "MSFT에서 시니어 소프트웨어 엔지니어의 직무 책임"

2. "MSFT에서 시니어 데이터 과학자 채용 프로세스"

3. "MSFT의 사무실 문화"

4. "Google의 시니어 데이터 과학자의 경력 진로"

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

5. "MSFT 주니어 직원을 위한 혜택"

검색된 문서는 '시니어 데이터 과학자의 혜택' 질의와 관련이 없습니다.

HyDE RAG를 확인해 봅시다:

Stage 1: 쿼리 변환:

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

단계 2: 관련 문서 검색

변환된 쿼리를 사용하여 D에서 상위 5개 관련 문서를 검색하십시오.

"MSFT의 고위 직원들을 대상으로 하는 건강 관리 혜택, 주식 옵션 및 전문 발전 프로그램"

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

“MSFT는 고급 데이터 과학자들을 위해 건강 보험, 퇴직 계획, 그리고 보너스를 제공합니다."

"MSFT의 고급 직원들은 유급 휴가, 웰빙 프로그램, 그리고 교육 기회를 즐길 수 있습니다."

검색된 문서가 '고급 데이터 과학자의 혜택'에 대한 쿼리와 관련이 더 많음을 보여줍니다. HyDE의 단점은 계산 비용과 텍스트 환각의 위험입니다. 예를 들어, 생성된 가상의 문서는 첫 번째 단계에서 더 나아 보일 수 있지만, 원본 쿼리에서 벗어날 수 있어 최종 검색된 문서가 직접 검색한 것보다 못해질 수 있습니다.

RAG Method 3.2: 향상된 가상 문서 임베딩(EHyDE)”

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

EHyDE는 Stage 1에서 개인 데이터 𝐷(문서)나 context 정보를 원래의 쿼리 𝑋_query에 추가하여 HyDE를 개선합니다. Stage 2에서 수정된 쿼리는 가상 문서(새로운 쿼리)로 변환됩니다. Stage 3에서는 검색 과정이 HyDE와 동일한 단계를 따릅니다. 추가 정보는 NLP 기계 학습을 통해 개인 데이터 𝐷(문서)와 대화 기록에서 얻을 수 있으며, D의 키워드 또는 빈도가 더 높은 쿼리와 같은 내용입니다.

EHyDE의 이점은 개인 데이터 𝐷(문서)에서 정보를 추가하여 Stage 2의 가상 문서가 개인 데이터 D와 관련된 더 많은 근거를 가질 수 있다는 것입니다.

예시: EHyDE

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

여기 EHyDE가 HyDE를 개선하는 예시가 있어요:

사용자 질의: "MSFT의 시니어 데이터 과학자의 혜택은 무엇인가요?"

HyDE 방식:

단계 1: 질의 변환

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

변환된 쿼리를 가정 문서로 만들어보겠습니다.

단계 2: 관련 문서 검색

가정 문서를 사용하여 문서를 검색합니다.

HyDE를 사용한 검색:

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

1. "MSFT의 시니어 직원을 위한 건강 보험 혜택, 주식 옵션 및 전문 개발 프로그램"

2. "MSFT에서 시니어 데이터 과학자를 채용하는 프로세스"

3. "MSFT의 사무실 문화"

HyDE는 채용 프로세스와 사무실 문화에 관한 적합하지 않은 문서도 포함되어 일치하는 문서를 검색합니다.

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

EHyDE를 사용한 검색:

단계 1: 개인 데이터에서 정보 추가

개인 데이터 𝐷에서 관련 키워드를 추출합니다. '의료 혜택', '주식 옵션', '전문 개발 프로그램'과 같은 내용입니다.

쿼리를 이러한 키워드를 포함하도록 수정하세요: 'MSFT의 시니어 데이터 과학자를 위한 의료 혜택, 주식 옵션 및 전문 개발 프로그램은 무엇입니까?'.

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

Stage 2: 쿼리 변환하기

수정된 쿼리를 가상의 문서로 변환해 보겠습니다: 'MSFT의 시니어 데이터 과학자들은 건강 보험 혜택, 주식 옵션 및 전문 개발 프로그램을 받습니다'.

Stage 3: 관련 문서 검색하기

개선된 가상 문서를 사용하여 문서를 검색합니다.

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

EHyDE를 사용한 검색:

1. "MSFT의 고위 직원을 위한 건강 보험, 주식 옵션 및 전문 개발 프로그램"

2. "MSFT는 고위 데이터 과학자를 위해 건강 보험, 퇴직 계획 및 보너스를 제공합니다"

3. "MSFT의 고위 직원은 유급 휴가, 웰니스 프로그램 및 계속되는 교육 기회를 포함한 다양한 혜택을 누립니다"

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

EHyDE는 초기 쿼리 변환 단계에서 개인 데이터에서 주요 정보를 통합하여 관련 문서를 더 많이 검색합니다.

EHyDE RAG에는 다음과 같은 전형적인 RAG가 포함되어 있습니다:

- Step-back Prompting: LLM 또는 지역 모델은 이전 단계나 쿼리를 검토하여 HyDE RAG 프로세스를 위해 원래 쿼리를 변환합니다.
- 히스토리 컨텍스트를 기반으로 쿼리 재생성: LLM 또는 지역 모델은 이전 상호 작용의 역사적 컨텍스트를 사용하여 현재 쿼리를 HyDE RAG 프로세스에 업데이트합니다.

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

RAG Method 3.3: Enhanced Direct Embedding-Based Retrieval

이 방법은 단계 1에서 개인 데이터를 사용하여 원본 쿼리를 개요화하는 검색 절차를 요약하며, 단계 2에서는 직접 임베딩 기반 검색 접근 방식을 따릅니다.

![이미지](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_15.png)

함수 S는 개인 데이터를 기반으로 요약된 쿼리를 생성하고, 요약된 쿼리와 개인 데이터 임베딩간의 거리를 최소화하여 RAG 프롬프트를 검색합니다. 이 접근 방식은 HyDE 접근 방식과 유사하지만 가상의 문서를 생성하는 대신 문서를 개요화하는 데 초점을 맞춥니다. 주요 이점은 다음과 같습니다:

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

· 검색시 LLM 사용 회피로 계산 양 줄이기

· 텍스트 환각 발생 위험 감소

이 RAG 방법은 문서 내 특정 문장 윈도우를 탐색하는 Sentence Window Retrieval을 포함하고 있습니다. 예를 들어, "운동이 정신 건강에 미치는 영향"이라는 쿼리에 대해 이 RAG 방법은 "운동"과 "정신 건강"이 같은 몇 문장에 나타나는 텍스트를 검색합니다.

RAG 방법 4: 변환된 개인 데이터 검색 (TDR)

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

위의 TQR 방법은 원래 쿼리를 변환하여 개인 데이터 일치를 개선할 수 있습니다. 마찬가지로, 우리는 이 기술을 개인 데이터에 적용할 수 있습니다 — Transformed Private Data Retrieval (TDR). 이 방법은 먼저 개인 데이터를 변환하고 관련 문서를 검색하여 LLM에게 RAG 프롬프트를 제공합니다. 이 방법의 합리성은 변환된 개인 데이터가 더 나은 데이터 품질을 갖고 있어 소음을 제거하고 주요 목적을 강조할 수 있다는 것입니다.

![이미지](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_16.png)

1단계에서는 로컬 NLP 모델 또는 LLM을 기반으로 한 트랜스포머와 같은 기계 학습 모델(𝑀으로 나타냄)을 사용하여 개인 데이터에서 TF-IDF 및 Word2Vec에 따라 키워드와 같은 핵심 구성 요소 M(D(doc))을 추출합니다. 이러한 핵심 구성 요소는 인간 의미 텍스트(Prompt_text)와 결합되어 Prompt_transform을 생성합니다. 2단계에서 Prompt_transform은 LLM에게 개인 데이터를 어떻게 변환해야 하는지 알려줍니다. 3단게는 다른 방법과 유사하게, 𝑋_query와 𝐷(doc_new) 간의 5개의 최단 거리를 갖는 문서를 선택합니다.

TQR 방법과 마찬가지로, TDR 기술에는 여러 가지 변형이 있습니다. 적용 시나리오에 따라 개인 데이터를 어떻게 변환해야 하는지에 영향을 받을 수 있습니다. 예를 들어, 일반적인 질문-답변 챗봇을 구축할 때 RAG 데이터로 FAQ 스타일 지식 베이스가 필요할 수 있습니다. 많은 상호 작용하는 인공 지능 에이전트들에게는 지식 그래프, 플로우차트, JSON 파일, 데이터베이스 메타데이터 및 머신 러닝 모델의 출력 패턴과 같은 더 복잡한 데이터 구조를 고려해야 합니다. 여기서 다양한 전형적인 사용 사례에 대해 TDR을 소개하겠습니다.

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

RAG Method 4.1: 개인 데이터 정리를 통한 TDR

이 방법은 개인 데이터에서 쓸모없는 정보를 제거하는 데 목적을 두고 있습니다:

- NLP에서 구두점, 불용어 및 어간추출과 같은 데이터 정리 기술 사용
- LLMs가 이미 알고 있는 지식을 개인 데이터에서 제거

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

· 개인 데이터에서 잘못된 정보 제거하기

데이터 품질을 향상하는 첫 번째 단계입니다. 두 번째 단계는 중복 정보를 걸러내어 LLM 프로세스를 간소화하는 것입니다. 세 번째 단계는 중요하지만 더 많은 확인이 필요합니다. 또한 이러한 작업은 LLM에서 수행할 수 있지만 추가 비용이 발생할 수 있습니다.

예시: 개인 데이터 정리를 통한 TDR

우리는 다음과 같은 RAG 프롬프팅을 위한 개인 데이터 𝐷를 가지고 있습니다:

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

RAG_information = ‘’’ 사원 혜택은 회사로부터 받는 유형의 현저한 이점이나 혜택을 나타내며, 건강 보험, 퇴직 계획, 유급 휴가, 보너스 및 기타 보상 형태와 같은 것이 있습니다. 혜택은 회사에서 일하는 데서 얻는 추상적이고 무형의 이점을 의미하기도 합니다. 구체적으로 회사에서 일하는 것의 긍정적인 면이나 경험을 의미합니다. 도움을 주는 근무 환경, 성장 기회, 커뮤니티 감각 및 전반적인 직장 만족도와 같은 것들이 있습니다.’’’

로컬 NLP 모델이나 LLMs에 기반한 변환기를 사용하여 𝐷에서 다음 정보를 식별할 수 있습니다:

주제 = "혜택이라는 단어의 일반적인 설명"

그런 다음 다음 프롬프트를 LLMs에 전달하여 새로운 비공개 데이터를 만들 수 있습니다:

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

"테이블 태그를 Markdown 형식으로 변경해주세요."

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

RAG 방법 4.2: 비공개 데이터 생성을 통한 TDR

우리는 LLMs를 사용하여 원본 비공개 데이터를 다양한 응용 프로그램에 맞게 구체적인 형태로 변환할 수 있습니다. 아래는 일반적인 예시들입니다:

RAG 방법 4.2.1: 비공개 데이터 요약

이 TDR 방법은 원본 비공개 데이터를 간결한 데이터로 요약하여 주요 포인트를 수집합니다. 이를 위해 LLMs(또는 트랜스포머)를 사용하여 비공개 데이터 𝐷를 RAG 데이터로 변환합니다:

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

먼저 위의 표 태그를 마크다운 형식으로 변경해보겠습니다.

![ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_18](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_18.png)

이 방법은 동시에 다음 조치들을 최소화하도록 명시적으로 목표로 합니다:

![ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_19](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_19.png)

이는 결과적으로 RAG 데이터가 개인 데이터와 밀접한 관련이 있으면서도 텍스트를 최대한 간결하게 유지해야 한다는 것을 의미합니다. 또한, 결과적인 RAG 데이터에는 최소한의 중복이 있어야 하며, 관련 없는 주제를 피해야 한다는 것을 시사합니다.

위의 내용이 도움이 되었기를 바라며, 궁금한 점이 있으면 언제든지 물어보세요!

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

예시: 개인 데이터 요약:

우리는 종종 긴 기업 정책 문서를 간단한 핵심 정책을 강조하는 RAG 데이터로 변환하기 위해 요약 TDR을 사용합니다. 그런 다음 이 RAG 데이터를 사용하여 회사를 위한 FAQ 스타일 지식 베이스를 만들 수 있습니다:

- NLP 기술을 사용하여 문서에서 주요 포인트를 추출합니다.
- 이러한 주요 포인트를 AI 프롬프트에 추가하여 개인 데이터를 요약합니다.

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

LLM과 AI 프롬프트를 사용하여 RAG 데이터를 생성하세요.

다음은 원본 문서의 예시입니다:

“저희는 의료, 치과, 시력 보험을 포함한 종합 건강 보험을 제공합니다. 또한 401(k) 매칭 및 연금 플랜을 포함한 다양한 퇴직 계획도 제공하여 직원들이 은퇴 후 재정 안정성을 확보할 수 있도록 합니다. 유급 휴가: 모든 직원은 유급 휴가(PTO)를 받으며, 휴가 일수, 병가, 개인 사정 일수를 포함합니다. 전문 개발: 계속적인 학습을 장려하고 직무와 관련된 코스, 인증서, 그리고 컨퍼런스에 대한 보상도 제공합니다. 또한 직원들의 안전을 최우선으로 여깁니다. …”

비공개 데이터 접근 방식을 요약한 후, 다음과 같은 잘 구성된 RAG 데이터가 제공됩니다:

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

"안녕하세요! 아래는 회사가 제공하는 혜택에 대한 몇 가지 정보입니다:

1. 건강 보험: 회사는 의료, 치과 및 시력 보험을 포함한 종합 건강 보험을 제공합니다.

2. 퇴직 계획: 401(k) 매칭 및 연금 플랜과 같은 다양한 퇴직 계획을 제공합니다.

3. 유급 휴가: 직원들은 휴가, 병가 및 개인 날 등을 포함한 유급 휴가를 받습니다.

4. 전문 개발: 직장과 관련된 과정, 자격증 및 학회에 대한 보상을 통해 지속적인 학습을 촉진합니다."

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

5. 직장 안전: 직원 안전은 최우선 과제로, OSHA 규정을 준수하고 정기적인 안전 교육을 받습니다...."

참고로, 이 방법은 Parent-child Chunks Retrieval 방법을 포함하며, 문서를 계층적 청크로 나누어 메인 컨텍스트(부모) 및 구체적인 세부 사항(자식) 섹션을 검색합니다.

RAG 방법 4.2.2: 개인 데이터 파라프레이징

가끔 개인 데이터에는 회계, 법률, 건강과학과 같은 분야의 전문 용어가 많이 포함됩니다. 그러나 이러한 문서들은 사용자 쿼리가 동일한 기술 용어를 사용하지 않을 수 있기 때문에 AI 시스템이 RAG를 사용하기 어렵게 만들 수 있습니다. 데이터를 더 간단한 언어로 다시 표현하면 RAG에 더 적합해집니다. 이 방법은 원래 의미를 유지하면서 사용자 쿼리와 일치할 확률을 높이는 데 도움이 됩니다.

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

이 방법은 동시에 다음을 동시에 최소화하기 위해 구체적으로 진행됩니다:

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_20.png)

여기서 D(쿼리)는 비전문 사용자로부터의 일반 쿼리를 나타냅니다.

'개인 데이터 패러프레이징' RAG 기술의 여러 버전은 번역과 같은 방법을 통해 데이터를 다른 언어로 변환하여 더 접근 가능하고 사용하기 쉽게 만듭니다. 이 방법은 주로 다국어 인공지능 지원 시스템을 개발하는 데 활용됩니다.

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

RAG Method 4.2.3: 특별한 구조로 개인 데이터 변환하기

대부분의 AI 응용 프로그램 튜토리얼은 특정 길이의 역사적 텍스트를 추적하는 것과 같은 상호 작용적 작업을 위해 간단한 RAG 방법을 사용합니다. 그러나 실제 대화형 AI 응용 프로그램은 더 고급 접근 방식이 필요합니다. 예를 들어:

- 기본 질문에 답변하는 챗봇은 사용자의 질의만 필요할 수 있습니다. 그러나 복잡한 문제를 해결하는 고객 서비스 봇은 사용자를 효과적으로 안내하기 위해 전체 대화 기록이 필요할 수 있습니다.

- SQL 절이 복잡한 데이터를 검색하도록 AI 시스템에 요청하는 데이터 분석가는 메타데이터, 테이블 관계 및 출력 형식을 포함한 특별히 구조화된 프롬프트가 필요합니다.

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

한 가지 가능한 방법은 개인 데이터를 특수 구조(지식 그래프, 플로우차트, JSON 파일, 데이터베이스 메타데이터, 이미지 파일 및 기계 학습 결과를 포함)로 변환하는 것입니다. 이러한 구조는 고급 AI 시스템에서 RAG 성능을 향상시키는 데 입증되었습니다. 다음 공식은 이 절차를 설명합니다:

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_21.png)

여기서 M(D(doc), Structure)는 일반 변환 함수를 나타내며, LLMs, 트랜스포머 또는 수동 절차를 포함한 로컬 NLP 모델 등이 될 수 있습니다. 두 번째 매개변수인 Structure은 위에서 언급한 데이터 구조를 나타냅니다. 여기서 Prompt는 RAG 프롬프트와 콘텍스트 프롬프트를 통합하며, 최근의 콘텍스트와 같은 대화 콘텍스트의 함수 값입니다.

예시: 인터넷 문제 해결 대화 기록

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

이 예시는 인터넷 문제 해결 대화 내용을 사용하여 대화 바구니 분석을 생성하여 대화 바구니 시퀀스를 만드는 방법을 보여줍니다. 그런 다음 대화 바구니 시퀀스 패턴을 RAG 파일로 사용하여 LLM이 고객 문제를 대화식으로 해결하는 데 사용됩니다. 이는 기계 학습 결과를 사용한 전형적인 RAG 예시입니다.

- 데이터: 과거 인터넷 문제 해결 대화 내용입니다.

- 바구니 분석: 공통 대화 시퀀스를 식별하고 그 빈도 (지원)와 신뢰도 (신뢰도)를 기록합니다.

- 대화 바구니 시퀀스: 식별된 패턴을 기반으로 대화 바구니 시퀀스를 생성합니다.

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

- RAG 파일 생성: 이러한 시퀀스를 구조화된 RAG 파일로 변환합니다.

- LLM 통합: RAG 프롬프트를 만들어 LLM에 전달합니다.

- 문제 해결: LLM은 이 대화 시퀀스를 사용하여 대화를 이끄는 데 사용하고 과거 패턴에 기반한 솔루션을 제공합니다.

인터넷 문제 해결 대화를 거래 데이터로 사용하여 바구니 분석을 수행하여 다음 시퀀스를 얻습니다:

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

1. 라우터 재시작 - 케이블 확인 - 지원 연락

2. 케이블 확인 - 라우터 재시작 - 지원 연락

3. 케이블 확인 - 지원 연락

4. 라우터 재시작 - 케이블 확인

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

5. 연결 상태 확인 - 라우터 재시작 - 케이블 확인

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_22.png)

그런 다음 머신러닝 결과 시퀀스 또는 플롯을 LLM의 RAG 프롬프트로 직접 또는 간접적으로 사용할 수 있습니다.

예시: 캐글 콘테스트 — 쿠폰 교환 예측

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

Kaggle 콘테스트 '쿠폰 사용 예측'을 확인해보세요. 데이터베이스 메타데이터에 특히 관심이 있습니다:

![image](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_23.png)

여기서 다음 단계를 통해 LLM을 사용하여 이미지를 텍스트 메타데이터로 변환할 것입니다:

- 이미지 파일을 업로드하세요

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

"이 대회에 대한 설명은 다음과 같습니다: 쿠폰 사용 예측...

이미지에 표시된 메타데이터와 테이블 간의 관계를 설명해주세요. 각 테이블의 필드와 그들 간의 관계를 설명해야 합니다."

그러면 다음과 같은 RAG 데이터를 얻을 수 있습니다:

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

테이블과 해당 필드:

Train:

id: 각 레코드의 고유 식별자.

campaign_id: 캠페인 데이터와 연결된 식별자.

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

테이블 태그를 마크다운 형식으로 변경해주세요.

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

캠페인 ID: 각 캠페인을 식별하는 고유 식별자입니다.

…

또한 텍스처 메타데이터를 플로차트 또는 텍스트 또는 이미지 형식의 표로 변환하여 역으로 작업을 수행할 수도 있습니다. 이러한 특별한 구조화된 데이터 또는 파일 형식은 LLM들이 복잡한 작업을 해결하는 데 직접적으로 RAG 문서로 사용될 수 있다는 점이 인상적입니다. 예를 들어 Interactive AI Agents by Using Neo4j RAG.

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

개인 데이터를 쉽게 이해할 수 있는 지식 그래프로 변환하는 방법을 Neo4j에서 소개해 드리겠습니다. 이를 통해 정보를 체계적으로 구성하여 LLM이 쉽게 소화할 수 있습니다:

- 그래프를 배치할 Neo4j 공간을 생성합니다.
- LLM을 사용하여 주요 정보를 검색하고 다양한 항목을 구성합니다.
- 위 정보를 JSON으로 변환합니다.

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

· JSON 데이터를 지식 그래프에 로드합니다.
· GraphCypherQAChain으로 그래프에서 쿼리를 실행합니다.

다음은 원본 개인 데이터에서 변환된 지식 그래프의 예시입니다:

Customer1[Customer: ID=1, Age=20–30, Status=Single] → Transaction101[Transaction: ID=101, Date=2023–05–01]

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

다음은 Markdown 형식으로 표를 변경하였습니다.

| 관계                       | 함께 사용되는 항목                                          |
| -------------------------- | ----------------------------------------------------------- |
| Transaction101             | Product1001 [제품: ID=1001, 이름=제품 A, 카테고리=전자제품] |
| Customer2                  | Customer: ID=2, 나이=30-40, 상태=기혼                       |
| Customer2 → Transaction102 | Transaction: ID=102, 날짜=2023-05-02                        |
| Transaction102             | Product1002 [제품: ID=1002, 이름=제품 B, 카테고리=가정용]   |

LLM을 위한 RAG 프롬프트에서 고객-제품 거래 데이터를 기반으로 한 응답을 개선하는데 사용할 수 있는 이 지식 그래프를 참고하세요.

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

RAG Method 5: RPF

RPF(Relevance, Precision, and Fidelity) for RAG은 RAG 데이터의 적절성, 정확성 및 충실도를 평가하고 향상시키는 프레임워크입니다. 이 측정 항목은 RPF 점수라고 하며, LLM이 미리 정의된 알고리즘을 사용하여 만듭니다.

그러나 RPF는 RAG 방법은 아니지만, 해당 메커니즘이 RAG 절차를 설정하는 데 도움이 될 수 있습니다.

쿼리 평가: LLM은 RPF 알고리즘을 사용하여 쿼리를 평가합니다. 개인 데이터의 각 문서에는 RPF 점수가 할당됩니다:

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

![Exploring AI Prompt Engineering Mathematical Foundations and RAG Methodologies](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_24.png)

신뢰도 평가: 가장 높은 RPF 점수 max_score_RPF를 선택하고, 가장 높은 RPF 점수를 가진 문서 X_RAG를 선택합니다. 점수 max_score_RPF가 임계값 T보다 높으면 LLM은 X_RAG를 사용하여 응답하고, 그렇지 않으면 사용자로부터 명확화를 위해 상호 작용적 피드백을 제공하여 사용자로부터 설명을 듣습니다:

![Exploring AI Prompt Engineering Mathematical Foundations and RAG Methodologies](/assets/img/2024-06-20-ExploringAIPromptEngineeringMathematicalFoundationsandRAGMethodologies_25.png)

AI 및 사용자 상호작용: LLM은 사용자에게 질문을 명확히하거나 쿼리의 의미를 이해하기 위해 몇 가지 선택지를 제공합니다.

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

응답: LLM이 쿼리를 이해하면 응답을 검색하고 생성합니다.

## 최종 생각

많은 자습서에서는 대규모 언어 모델, AI 프롬프트 엔지니어링 및 RAG(Retrieval-Augmented Generation)을 소개하나, 종종 구체적인 기술과 상황에 중점을 두고 텍스트 설명이나 코드를 사용합니다. 이 글에서는 이러한 접근 방식을 수학적으로 정리하고 적용 가능성에 대해 요약했습니다. RAG 기술을 체계적으로 정리하고 이러한 모델의 설명을 했습니다. 이러한 방식을 통해 우리는 대규모 언어 모델(BLMs), 지능형 프롬프트 엔지니어링(IPE)과 RAG의 원리, 범주 및 사용 사례를 잘 이해할 수 있습니다. 더 나아가, 이는 대규모 언어 기술의 새로운 발전을 위한 자극제로 활용될 수 있습니다.
