---
title: "여러분의 RAG 어플리케이션 성능 향상을 위한 5가지 꿀팁"
description: ""
coverImage: "/assets/img/2024-05-17-5HacksToImproveYourRAGApplication_0.png"
date: 2024-05-17 04:20
ogImage:
  url: /assets/img/2024-05-17-5HacksToImproveYourRAGApplication_0.png
tag: Tech
originalTitle: "5 Hacks To Improve Your RAG Application"
link: "https://medium.com/@mansoorsyed05/5-hacks-to-improve-your-rag-application-7b4aa76397fb"
isUpdated: true
---

RAG는 기업 및 비즈니스에서 Gen AI 기능을 사용자 지정 데이터와 통합하는 데 중요한 도구가 되었습니다.

![image](/assets/img/2024-05-17-5HacksToImproveYourRAGApplication_0.png)

다음은 RAG 애플리케이션을 개선하는 몇 가지 팁입니다.

- 쿼리 보강
- 문서 청킹
- 결과 재랭킹
- 임베딩 어댑터
- 가상 문서 임베딩

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

쿼리 확장:

관련 데이터를 검색하고 정확한 응답을 얻기 위해 프롬프트와 함께 보강하는 것이 중요합니다.

단계:

- 코사인 유사도나 유클리드 거리를 사용하여 벡터 임베딩 데이터베이스를 사용하여 사용자 쿼리를 기반으로 문서를 검색합니다.
- 검색된 데이터/문서와 프롬프트를 결합합니다.
- LLM(언어 모델)을 사용하여 하이브리드 데이터로부터 데이터를 생성합니다.

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
import chromadb
import openai

def augmented_query_creator(user_query, retrieved_documents):
    information = "\n\n".join(retrieved_documents)
    prompt = (f'You are a movie critic.\n'
    f'Your users are asking questions about movie review.\n'
    f'You will be shown the user\'s question, and the relevant information from the movie.\n'
    f'Answer the user\'s question using only this information.\n\n'
    f'Question: {query}. \n Information: {information}')
    return prompt

def generate_answer(prompt):
    openai.api_key = "YOUR_OPENAI_API_KEY"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    query = "What is the review of the movie?"

    # 1 Retrive relevant documents
    results = chroma_collection.query(query_texts=[query], n_results=5)
    retrieved_documents = results['documents'][0]

    # 2 Augmented query generation
    augmented_query = augmented_query_creator(query,retrieved_documents)

    # 3 Response for augmented query
    result = generate_answer(augmented_query)
```

문서 청크 데이터 중복 :

다양한 문서에 대한 벡터 데이터베이스를 구축할 때, 토큰 제한으로 인해 데이터 손실이 발생할 수 있습니다. 이 문제를 해결하기 위해 데이터를 작은 세그먼트로 분할하는 것이 해결책입니다.

하지만 이러한 청크를 사용하더라도 한 문서와 다른 문서 사이의 의미와 연속성 손실이 발생할 수 있습니다. 이 문제를 완화하기 위해 데이터의 일관성과 흐름을 유지하기 위해 청크 사이에 중첩을 도입하는 것이 중요합니다.

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
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings  # 귀하의 선택한 임베딩 모델로 대체하십시오
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader

# 문서 경로와 임베딩 모델 정의 (귀하의 것으로 대체하십시오)
document_path = "your_document.txt"
embedding_model = OpenAIEmbeddings

# 청크 크기 및 선택적인 오버랩 설정
chunk_size = 500
chunk_overlap = 100

# 문서를 로드하고 RecursiveCharacterTextSplitter로 분할합니다.
text_loader = TextLoader(document_path)
documents = text_loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
texts = splitter.split_documents(documents)

# 임베딩을 사용하여 ChromaDB 생성
persist_directory = "chroma_db"
chroma_collection = Chroma.from_documents(
    documents=texts, embedding=embedding_model(), persist_directory=persist_directory
)
```

재랭킹

결과를 재랭킹하는 것은 검색된 문서를 검색기에 의해 검색된 후 특정 기준에 따라 다시 정렬하는 것을 의미합니다. 응답을 생성하기 전에 검색된 문서의 관련성을 더욱 정제하는 데 유용할 수 있습니다.

우리는 문서의 관련성 순서를 변경하기 위해 코사인 유사성 대신 크로스 인코더 모델을 사용합니다.

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

Step 1: 크로스-인코더 모델을 로드합니다.

Step 2: 관련성 점수를 변경하는 재랭크 함수입니다.

Step 3: 문서를 정렬하고 반환합니다.

```python
from sentence_transformers import SentenceTransformer

# ChromaDB와 크로스-인코더 모델을 로드합니다.
chromadb = Chroma.load("chroma_db")
cross_encoder = SentenceTransformer("all-mpnet-base-v2")

def re_rank_results(query, retrieved_chunks, k=3):

  scored_chunks = []
  for chunk in retrieved_chunks:
    score = cross_encoder.compute_similarity([query], [chunk])[0][0]
    scored_chunks.append({"chunk": chunk, "score": score})

  # 점수를 기준으로 (내림차순으로) 정렬하고 상위 k개 결과를 반환합니다.
  sorted_chunks = sorted(scored_chunks, key=lambda x: x["score"], reverse=True)
  return sorted_chunks[:k]
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

임베딩 어댑터:

임베딩 어댑터는 초기 임베딩 프로세스와 검색 단계 간의 세세한 조정 단계로 작용하는 소규모 신경망 모듈입니다. 그 목적은 쿼리의 임베딩과 지식베이스에 저장된 문서 표현의 정렬을 개선하는 것입니다.

단계 1: 임베딩 생성

단계 2: 임베딩 어댑터로 섬세하게 조정하기

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

3단계: 개선된 검색

```js
from langchain.vectorstores import Chroma
from langchain.text_embeddings import SentenceTransformerEmbeddings
from langchain.text_encoders import IdentityEncoder  # 원본 텍스트 보존
from langchain.document_loaders import TextLoader

# 문서 경로 및 임베딩 모델 정의
document_path = "your_document.txt"
embedding_model = SentenceTransformerEmbeddings("all-mpnet-base-v2")

# 문서 로드
text_loader = TextLoader(document_path)
documents = text_loader.load()

# 텍스트 인코더를 사용하여 ChromaDB 생성 (선택 사항)
persist_directory = "chroma_db"
text_encoder = IdentityEncoder()

vectordb = Chroma.from_documents(
    documents=documents,
    embedding=embedding_model(),
    text_encoder=text_encoder,
    persist_directory=persist_directory
)

# 선택적 지속성
vectordb.persist()

# 텍스트 검색 예시
query = "북극 해는 어디에 있나요?"

# 인코딩된 텍스트를 기반으로 검색 (임베딩 아님)
results = vectordb.search(query, k=5)  # 상위 5개 결과 가져오기

# 검색된 문서 출력
for doc in results:
    print(doc)

print("ChromaDB 검색 완료!")
```

가상 문서 임베딩:

HyDE는 대형 언어 모델(Large Language Models, LLMs)을 활용하여 문서로부터 정보 검색을 개선하는 기술입니다.

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

Step 1: Query 이해하기: 모든 것은 사용자 쿼리로 시작됩니다. HyDE는 이 쿼리를 입력으로 받습니다.

Step 2: 가상 문서 생성: HyDE는 GPT-3과 같은 LLM을 사용하여 사용자 쿼리에 완벽한 답변이 될 것으로 믿는 가상 문서를 생성합니다. 이 문서에는 사실적인 정보 뿐만 아니라 창의적인 요소나 사용자 의도에 부합하는 설명이 포함될 수 있습니다.

Step 3: 가설 인코딩: 가상 문서가 생성된 후, HyDE는 문서 자체를 사용하지 않습니다. 대신, 문서의 의미를 수학적 벡터 표현으로 인코딩합니다. 이 벡터는 가상 답변 내의 핵심 개념과 정보를 포착합니다.

Step 4: 유사 문서 찾기: 이제 검색 과정이 시작됩니다. HyDE는 가상 문서를 나타내는 벡터를 사용하여 방대한 문서 컬렉션(보통 미리 인코딩된)을 검색합니다. 이것은 가상 문서의 벡터와 유사한 실제 문서를 탐색합니다. 유사성은 이 실제 문서들이 가상 답변과 유사한 방법으로 사용자 쿼리에 대응한다는 것을 나타냅니다.

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

5단계: 검색된 문서를 활용하기: HyDE 프로세스를 기반으로 가장 관련성 높은 것으로 간주된 이러한 검색된 문서는 이후 RAG 시스템에 공급됩니다. RAG 내의 LLM은 이 문서들을 사용하여 사용자의 초기 쿼리에 대한 더 포괄적이고 유익한 응답을 생성할 수 있습니다.

참고 자료:

- https://platform.openai.com/docs/assistants/overview
- LinkedIn GitHub
