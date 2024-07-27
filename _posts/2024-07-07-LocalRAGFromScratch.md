---
title: "처음부터 시작하는 Local RAG 구축하기"
description: ""
coverImage: "/assets/img/2024-07-07-LocalRAGFromScratch_0.png"
date: 2024-07-07 13:57
ogImage: 
  url: /assets/img/2024-07-07-LocalRAGFromScratch_0.png
tag: Tech
originalTitle: "Local RAG From Scratch"
link: "https://medium.com/towards-data-science/local-rag-from-scratch-3afc6d3dea08"
---


## 처음부터 완전히 로컬 RAG 시스템 개발 및 배포하기

# 소개

llama-index 및 Langchain과 같은 라이브러리가 제공하는 고수준 추상화는 검색 보강 생성 (RAG) 시스템의 개발을 간단하게 해주었습니다. 그러나 이러한 라이브러리를 완전히 활용하려는 모든 기계 학습 엔지니어에게는 이러한 라이브러리를 가능하게 하는 기본 메커니즘에 대한 심층적인 이해가 중요합니다. 본문에서는 처음부터 RAG 시스템을 개발하는 과정을 안내할 것입니다. 그리고 한 걸음 더 나아가 컨테이너화된 플라스크 API를 생성할 것입니다. 이번 글은 매우 실용적으로 설계되었습니다: 이 해설서는 실제 사용 사례를 바탕으로 하여 개발되었으며, 얻는 통찰력이 이론적일 뿐만 아니라 즉시 적용 가능하도록 보장합니다.

유용 사례 개요 — 이 구현은 다양한 종류의 문서를 처리할 수 있도록 설계되었습니다. 현재 예제에서는 각각 SKU, 이름, 설명, 가격, 차원 등의 세부 정보를 가진 제품을 나타내는 작은 문서를 많이 사용하고 있지만, 이 접근 방식은 매우 유연합니다. 서로 다른 유형의 정보를 통합하고 처리할 수 있는 이 유연성으로 책의 다양한 라이브러리를 색인화하거나 방대한 계약서에서 데이터를 채굴하거나 다른 문서 집합이 관련된 경우 이 시스템을 특정 상황에 맞게 조정할 수 있습니다. 이 유연성은 다양한 유형의 정보를 매끈하게 통합하고 처리할 수 있도록 합니다.

<div class="content-ad"></div>

빠른 참고 — 본 구현은 텍스트 데이터에 대해서만 작동합니다. 이미지를 임베딩으로 변환하고 이를 CLIP과 같은 멀티 모달 모델을 사용하여 색인화하고 쿼리할 수 있습니다.

# 목차

- 모듈식 프레임워크 개요
- 데이터 준비
- 청킹, 색인화 및 검색 (핵심 기능)
- 언어 모델 기능
- API 빌드 및 배포
- 결론

# 모듈식 프레임워크

<div class="content-ad"></div>

구현에는 네 가지 주요 구성 요소가 있으며 이들을 교체할 수 있습니다.

- 텍스트 데이터
- 임베딩 모델
- LLM (Large Language Model)
- 벡터 저장소

이러한 서비스를 프로젝트에 통합하는 것은 매우 유연하여 귀하의 특정 요구 사항에 맞게 맞춤 설정할 수 있습니다. 이 예시 구현에서는 초기 데이터가 JSON 형식으로 제공되어 문자열로 편리하게 제공되는 시나리오로 시작합니다. 그러나 PDF, 이메일 또는 엑셀 스프레드시트와 같은 다양한 형식의 데이터를 만날 수도 있습니다. 이러한 경우, 데이터를 문자열 형식으로 변환하여 "정규화"해야 합니다. 프로젝트의 요구 사항에 따라 데이터를 메모리 내의 문자열로 변환하거나 파일로 저장하여 추가 수정 또는 후속 처리를 할 수 있습니다.

마찬가지로, 임베딩 모델, 벡터 저장소 및 LLM 선택 사항을 프로젝트의 요구 사항에 맞게 사용자 정의할 수 있습니다. 더 작거나 더 큰 모델 또는 외부 모델이 필요한지 여부에 따라, 이 접근 방식의 유연성을 통해 적절한 옵션으로 간단히 교체할 수 있습니다. 이 플러그 앤 플레이 기능을 통해 핵심 아키텍처를 중요하게 변경하지 않고 프로젝트가 다양한 요구 사항에 적응할 수 있도록 보장됩니다.

<div class="content-ad"></div>

![Travel Image](/assets/img/2024-07-07-LocalRAGFromScratch_0.png)

파란색으로 강조한 부분이요. 이 구현에서 저희 벡터 저장소는 간단히 JSON 파일로 구성됩니다. 다시 한번 강조하지만, 사용 사례에 따라 한 번에 한 파일만 처리하는 경우면 인메모리 벡터 저장소(파이썬 dict)를 사용하는 것이 좋을 수도 있습니다. 이 데이터를 영구적으로 저장해야 하는 경우와 같이, 저희의 경우처럼 이를 저장할 JSON 파일로 저장할 수 있습니다. 수백만 개 또는 수백만 개의 벡터를 저장해야 하는 경우 외부 벡터 저장소(Pinecone, Azure Cognitive Search 등)가 필요할 수 있습니다.

# 데이터 준비

위에서 언급했듯이, 이 구현은 JSON 데이터로 시작합니다. 저는 GPT-4와 Claude를 사용하여 데이터를 합성 생성했습니다. 데이터에는 각각 고유한 SKU를 가진 서로 다른 가구 조각에 대한 제품 설명이 포함되어 있습니다. 여기 예시가 있습니다:

<div class="content-ad"></div>

이미지 태그를 Markdown 형식으로 변경해 드리겠습니다.

<div class="content-ad"></div>

```json
{
  "SKU001": "마스터 침실 가구 - 퀸 사이즈 침대, 매트리스, 하얀색, 인공 가죽 시트 및 원목 프레임",
  "SKU002": "마스터 침실 가구 - 6 서랍 서랍장, 갈색, 높은 품질의 마호가니 원목",
  "SKU003": "마스터 침실 가구 - 금도금된 서랍 커머드, 서정적인 디자인, 클래식한 디테일"
}
{
  "SKU004": "리빙룸 가구 - 롤리 라운지 의자, 네이비 블루, 편안한 벨벳 생지 표면",
  "SKU005": "리빅 룸 가구 - 모던 유리 커피 테이블, 금속 베이스, 견고하고 세련된 디자인",
  "SKU006": "리빙룸 가구 - 프렌치 컨트리 스타일의 벽장, 밝은 화이트, 자연 나무 세부 사항"
}
{
  "SKU007": "아웃도어 파티오 가구 - 파티오 세트, 테이블과 4개의 체어 함께, 틸레 나무로 만든 편안한 쿠션",
  "SKU008": "아웃도어 파티오 가구 - 태양 옥상 우산, 네이비 블루 스트라이프, 튼튼한 알루미늄 프레임",
  "SKU009": "아웃도어 파티오 가구 - 호텔 급 란탄 존슨체어, 양모 페브릭, 내후성 및 내구성이 뛰어남"
}
{
  "SKU010": "엔터테인먼트 가구 - 우드 TV 스탠드, 블랙 폴리우레탄 피니쉬, 공간 절약형 시스템",
  "SKU011": "엔터테인먼트 가구 - 모던 미디어 유닛, 금속 및 유리 콘솔, 현대적인 디자인과 기능성",
  "SKU012": "엔터테인먼트 가구 - 홈 시어터 좌석, 블랙 가죽, 전원 리클라이너와 컵 홀더"
}
{
  "SKU013": "주방 가구 - 스테인레스 스틸 냉장고, 이너 카메라, 스마트 기술 탑재",
  "SKU014": "주방 가구 - 소나시 콘크리트 카운터톱, 견고한 자작나무 베이스, 현대적이고 유틸리티한 디자인",
  "SKU015": "주방 가구 - 유화 화병, 수제 유리, 아이템 저장용 골드 림 디테일"
}
{
  "SKU016": "게스트 침실 가구 - 싱글 침대 프레임, 블랙, 실용적이고 간소한 철제 디자인",
  "SKU017": "게스트 침실 가구 - 접이식 소파 베드, 네이비 블루, 푹신한 베이지 컬러 패브릭",
  "SKU018": "게스트 침실 가구 - 소형 서랍장, 화이트, 프렌치 프로빈셜 스타일의 디테일"
}
{
  "SKU019": "완성된 지하실 가구 - 스모크 그레이 섹셔널 소파, 패턴 시내 더블 스티치링, 스토리지 및 샷홀더 포함",
  "SKU020": "완성된 지하실 가구 - 식탁과 의자, 레트로 디자인, 화려한 컬러 구성",
  "SKU021": "완성된 지하실 가구 - 맞춤형 와인 바, 마호가니 나무, 스페이스 세이빙 아티클 및 선반"
}
```

<div class="content-ad"></div>

위의 사본 텍스트에서 문장을 효율적으로 처리하여 검색이 최적화되도록 해야 합니다. 이 코드는 llama-index SentenceSplitter 클래스를 모델로 설계해 보았습니다.

```js
import re
import os
import uuid
from transformers import AutoTokenizer, AutoModel

def document_chunker(directory_path,
                     model_name,
                     paragraph_separator='\n\n',
                     chunk_size=1024,
                     separator=' ',
                     secondary_chunking_regex=r'\S+?[\.,;!?]',
                     chunk_overlap=0):
    
    tokenizer = AutoTokenizer.from_pretrained(model_name)  # 지정된 모델의 tokenizer를 로드합니다.
    documents = {}  # 결과를 저장할 딕셔너리 초기화

    # 지정한 디렉토리의 각 파일을 읽습니다.
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        base = os.path.basename(file_path)
        sku = os.path.splitext(base)[0]
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as file:
                text = file.read()

            # 문서에 대한 고유 식별자 생성
            doc_id = str(uuid.uuid4())

            # 기존 청킹 로직을 사용하여 각 파일 처리
            paragraphs = re.split(paragraph_separator, text)
            all_chunks = {}
            for paragraph in paragraphs:
                words = paragraph.split(separator)
                current_chunk = ""
                chunks = []

                for word in words:
                    new_chunk = current_chunk + (separator if current_chunk else '') + word
                    if len(tokenizer.tokenize(new_chunk)) <= chunk_size:
                        current_chunk = new_chunk
                    else:
                        if current_chunk:
                            chunks.append(current_chunk)
                        current_chunk = word

                if current_chunk:
                    chunks.append(current_chunk)

                refined_chunks = []
                for chunk in chunks:
                    if len(tokenizer.tokenize(chunk)) > chunk_size:
                        sub_chunks = re.split(secondary_chunking_regex, chunk)
                        sub_chunk_accum = ""
                        for sub_chunk in sub_chunks:
                            if sub_chunk_accum and len(tokenizer.tokenize(sub_chunk_accum + sub_chunk + ' ')) > chunk_size:
                                refined_chunks.append(sub_chunk_accum.strip())
                                sub_chunk_accum = sub_chunk
                            else:
                                sub_chunk_accum += (sub_chunk + ' ')
                        if sub_chunk_accum:
                            refined_chunks.append(sub_chunk_accum.strip())
                    else:
                        refined_chunks.append(chunk)

                final_chunks = []
                if chunk_overlap > 0 and len(refined_chunks) > 1:
                    for i in range(len(refined_chunks) - 1):
                        final_chunks.append(refined_chunks[i])
                        overlap_start = max(0, len(refined_chunks[i]) - chunk_overlap)
                        overlap_end = min(chunk_overlap, len(refined_chunks[i+1]))
                        overlap_chunk = refined_chunks[i][overlap_start:] + ' ' + refined_chunks[i+1][:overlap_end]
                        final_chunks.append(overlap_chunk)
                    final_chunks.append(refined_chunks[-1])
                else:
                    final_chunks = refined_chunks

                # 각 청크에 UUID 할당하고 텍스트 및 메타데이터로 구조화
                for chunk in final_chunks:
                    chunk_id = str(uuid.uuid4())
                    all_chunks[chunk_id] = {"text": chunk, "metadata": {"file_name": sku}}  # metadata 초기화

            # 문서 UUID를 해당 청크 딕셔너리에 매핑
            documents[doc_id] = all_chunks

    return documents

```

여기서 가장 중요한 매개변수는 "chunk_size"입니다. 보시다시피 transformer 라이브러리를 사용하여 주어진 문자열의 토큰 수를 계산합니다. 따라서 chunk_size는 청크 내의 토큰 수를 나타냅니다.

다음은 함수 내부에서 발생하는 일련의 과정입니다.

<div class="content-ad"></div>

제공된 디렉토리의 각 파일에 대해 →

- 텍스트를 단락으로 분할:
- 지정된 구분자를 사용하여 입력 텍스트를 단락으로 분할합니다.
- 단락을 단어로 나누기:
- 각 단락을 단어로 나누세요.
- 지정된 토큰 수를 초과하지 않도록 이러한 단어를 청크로 만듭니다(chunk_size).
- 청크 정제:
- 어떤 청크가 chunk_size를 초과하면, 구두점을 기준으로 정규식을 사용해 해당 청크를 더 분할합니다.
- 청크 크기를 최적화하기 위해 필요한 경우 서브 청크를 병합합니다.
- 오버랩 적용:
- 여러 청크에서 일련의 데이터가 있는 경우, 이들 사이에 오버랩을 만들어 문맥을 보존합니다.
- 청크 컴파일과 반환:
- 최종 청크를 반복하여 모든 고유 ID에 할당하고, 해당 청크의 텍스트와 메타데이터에 매핑되는 이 고유 ID에 이 청크 사전을 할당합니다.

이 예시에서는 많은 작은 문서를 색인화하는 상황을 다루고 있습니다. 청킹 프로세스는 비교적 간단합니다. 간단한 각 문서는 최소한의 세분화가 필요합니다. 이는 장문 협약서에서 특정 섹션을 추출하거나 전체 소설을 색인화하는 경우와 대비적입니다. 여러분이 처리하는 문서의 크기와 복잡성에 따라, 'document_chunker' 함수를 개발했습니다. 이 함수를 사용하면 데이터의 길이나 형식에 관계없이 같은 효율적인 청킹 프로세스를 적용할 수 있습니다. 간결한 제품 설명이든 방대한 문학 작품이든, 'document_chunker'는 데이터가 최적의 색인화 및 검색을 위해 적절하게 분할되도록 보장합니다.

사용 방법:

<div class="content-ad"></div>

```python
문서 = document_chunker(directory_path='/Users/joesasson/Desktop/articles/rag-from-scratch/text_data',
                        model_name='BAAI/bge-small-en-v1.5',
                        chunk_size=256)

키들 = list(문서.keys())
print(len(문서))
print(문서[키들[0]])

결과 -->
105
{'61d6318e-644b-48cd-a635-9490a1d84711': {'텍스트': 'Gaming console storage unit in sleek black, featuring designated compartments for systems, controllers, and games. Ventilated to prevent overheating. Manufactured by GameHub. Dimensions: 42"W x 16"D x 24"H.', '메타데이터': {'파일_이름': 'ENT-5002'}}
```

이제 고유한 문서 ID로 매핑되는 모든 청크를 포함하는 매핑이 있습니다. 각 청크에는 해당 청크의 고유 ID가 있으며 해당 청크의 텍스트와 메타데이터를 가리킵니다.

메타데이터는 임의의 키/값 쌍을 포함할 수 있습니다. 여기서는 파일 이름 (SKU)을 메타데이터로 설정하여 원본 제품으로 모델 결과를 추적할 수 있습니다.

## 색인화


<div class="content-ad"></div>

이제 문서 저장소를 만들었으니, 벡터 저장소를 만들어야 합니다.

이미 알아차린 것일지도 모르지만, 우리는 BAAI/bge-small-en-v1.5를 임베딩 모델로 사용하고 있어요. 이전 함수에서는 토큰화에만 사용했지만, 이제는 텍스트를 벡터화하는 데 사용할 거에요.

배포를 준비하기 위해, 토크나이저와 모델을 로컬에 저장해봅시다.

```python
from transformers import AutoModel, AutoTokenizer

model_name = "BAAI/bge-small-en-v1.5"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

tokenizer.save_pretrained("model/tokenizer")
model.save_pretrained("model/embedding")
```

<div class="content-ad"></div>

```js
def compute_embeddings(text):
    tokenizer = AutoTokenizer.from_pretrained("/model/tokenizer") 
    model = AutoModel.from_pretrained("/model/embedding")

# 입력된 텍스트를 토크나이저로 토큰화하고
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True) 
    
    # 임베딩 생성
    with torch.no_grad():    
        # 마지막 hidden state에서 평균 값으로 임베딩 생성
        embeddings = model(**inputs).last_hidden_state.mean(dim=1).squeeze()

    return embeddings.tolist()
```

```js
def create_vector_store(doc_store):
    vector_store = {}
    for doc_id, chunks in doc_store.items():
        doc_vectors = {}
        for chunk_id, chunk_dict in chunks.items():
            # 각 텍스트 청크에 대한 임베딩 생성
            doc_vectors[chunk_id] = compute_embeddings(chunk_dict.get("text"))
        # 각 문서의 청크 임베딩을 청크 UUID로 매핑하여 저장
        vector_store[doc_id] = doc_vectors
    return vector_store
```

우리가 한 일은 문서 저장소의 청크를 간단히 임베딩으로 변환한 것 뿐입니다. 임베딩 모델과 벡터 저장소를 어떤 것이든 사용할 수 있습니다. 우리의 벡터 저장소는 단순히 사전이기 때문에 JSON 파일로 저장만 하면 됩니다.

## 검색


<div class="content-ad"></div>

자 이제 질문을 통해 함수를 테스트해 보겠습니다!

```js
def compute_matches(vector_store, query_str, top_k):
    """
    이 함수는 벡터 저장소 딕셔너리, 쿼리 문자열 및 정수 'top_k'를 입력으로 받습니다.
    쿼리 문자열의 임베딩을 계산한 다음 딕셔너리에 있는 각 청크 임베딩과의 코사인 유사도를 계산합니다.
    가장 높은 유사도 점수를 기준으로 상위 k개의 일치 항목을 반환합니다.
    """
    # 쿼리 문자열의 임베딩 가져오기
    query_str_embedding = np.array(compute_embeddings(query_str))
    scores = {}

    # 쿼리 임베딩과 각 청크의 임베딩 간의 코사인 유사도 계산
    for doc_id, chunks in vector_store.items():
        for chunk_id, chunk_embedding in chunks.items():
            chunk_embedding_array = np.array(chunk_embedding)
            # 코사인 유사도 계산을 위해 임베딩을 단위 벡터로 정규화
            norm_query = np.linalg.norm(query_str_embedding)
            norm_chunk = np.linalg.norm(chunk_embedding_array)
            if norm_query == 0 or norm_chunk == 0:
                # 0으로 나누는 것을 피하기
                score = 0
            else:
                score = np.dot(chunk_embedding_array, query_str_embedding) / (norm_query * norm_chunk)

            # 문서와 청크에 대한 참조와 함께 점수 저장
            scores[(doc_id, chunk_id)] = score

    # 점수 정렬하고 상위 k개 결과 반환
    sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True)[:top_k]
    top_results = [(doc_id, chunk_id, score) for ((doc_id, chunk_id), score) in sorted_scores]

    return top_results
```

compute_matches 함수는 저장된 텍스트 임베딩 컬렉션에서 주어진 쿼리 문자열에 대한 상위 k개의 가장 유사한 텍스트 청크를 식별하는 데 사용됩니다. 여기서 주요 내용은:

- 쿼리 문자열을 임베딩한다.
- 코사인 유사도를 계산합니다. 각 청크에 대해 쿼리 벡터와 청크 벡터 사이의 코사인 유사도가 계산됩니다. 여기서 np.linalg.norm은 코사인 유사도 계산에 필요한 벡터의 유클리드 노름(L2 노름)을 계산합니다.
- 정규화 처리 및 내적 계산을 수행합니다. 코사인 유사도는 다음과 같이 정의됩니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-07-LocalRAGFromScratch_1.png)

4. 점수를 정렬하고 선택합니다. 점수는 내림차순으로 정렬되며 상위 k개의 결과가 선택됩니다.

사용법:

```js
matches = compute_matches(vector_store=vec_store,
                query_str="실감 LED 불꽃이 있는 벽걸이 전기난로",
                top_k=3)

# 일치하는 결과
[('d56bc8ca-9bbc-4edb-9f57-d1ea2b62362f',
  '3086bed2-65e7-46cc-8266-f9099085e981',
  0.8600385118142513),
 ('240c67ce-b469-4e0f-86f7-d41c630cead2',
  '49335ccf-f4fb-404c-a67a-19af027a9fc2',
  0.7067269230771228),
 ('53faba6d-cec8-46d2-8d7f-be68c3080091',
  'b88e4295-5eb1-497c-8536-59afd84d2210',
  0.6959163226146977)]

# 상위 매치 문서 ID 키를 doc_store에 연결하여 검색된 내용에 액세스합니다
docs['d56bc8ca-9bbc-4edb-9f57-d1ea2b62362f']['3086bed2-65e7-46cc-8266-f9099085e981']

# 결과
{'text': '실감 LED 불꽃이 있는 벽걸이 전기난로로 따뜻함과 분위기를 제공합니다. 블랙 글래스 프레임과 쉬운 조작을 위한 원격 제어가 특징입니다. 따뜻함과 분위기를 더하는 데 이상적입니다. Hearth & Home에서 제조했습니다. 크기: 50"W x 6"D x 21"H.',
 'metadata': {'file_name': 'ENT-4001'}
```

<div class="content-ad"></div>

대박입니다! 모든 거 준비됐네요! 이제 할 일은 LLM 구성요소를 연결시키고 완전한 종단간 테스트를 실행하는 거에요. 그럼 우리가 배포할 준비가 돼요!

LLM 구성요소

우리의 RAG 시스템을 상호작용 가능하게 만들어 사용자 경험을 향상시키기 위해 llama-cpp-python 라이브러리를 활용하겠습니다. 우리의 설정은 Mistral-7B 파라미터 모델을 사용하며 GGUF 3비트 양자화를 적용할 것입니다. 이 구성은 계산 효율성과 성능 사이의 좋은 균형을 제공하는 것으로 알려져 있어요. 광범위한 테스트 결과에 따르면, 이 모델 크기는 특히 제한된 자원을 가진 기기에서 실행될 때 매우 효과적이었어요. 이 방법을 채택함으로써, 우리의 RAG 시스템이 정확하고 관련성 높은 응답을 제공할 뿐만 아니라 대화 형식을 유지하여 최종 사용자들에게 더 매력적이고 접근하기 쉬운 경험을 제공할 수 있게 됩니다.

<div class="content-ad"></div>

로컬에서 LLM을 Mac에 설정하는 방법에 대한 간단한 팁입니다. 저는 아나콘다나 미니콘다를 사용하는 것을 선호합니다. arm64 버전을 설치했는지 확인하고 라이브러리에서 'metal' 설정 지침을 따르세요.

이제 매우 쉽습니다. 필요한 건 사용자 쿼리와 검색된 문서가 포함된 프롬프트를 구성하는 함수를 정의하는 것뿐입니다. LLM의 응답은 사용자에게 다시 전송됩니다.

저는 아래 함수들을 정의하여 LLM에서 텍스트 응답을 스트리밍하고 최종 프롬프트를 구성했습니다.

```python
from llama_cpp import Llama
import sys

def stream_and_buffer(base_prompt, llm, max_tokens=800, stop=["Q:", "\n"], echo=True, stream=True):

    # 베이스 프롬프트 형식 지정
    formatted_prompt = f"Q: {base_prompt} A: "

    # LLM에서 응답 스트리밍
    response = llm(formatted_prompt, max_tokens=max_tokens, stop=stop, echo=echo, stream=stream)

    buffer = ""

    for message in response:
        chunk = message['choices'][0]['text']
        buffer += chunk

        # 단어를 얻기 위해 마지막 공백을 기준으로 분할
        words = buffer.split(' ')
        for word in words[:-1]:  # 불완전할 수 있는 마지막 단어를 제외한 모든 단어 처리
            sys.stdout.write(word + ' ')  # 단어와 공백을 함께 출력
            sys.stdout.flush()  # 즉시 표시되도록 함

        # 나머지는 버퍼에 유지
        buffer = words[-1]

    # 버퍼에 남아 있는 내용 출력
    if buffer:
        sys.stdout.write(buffer)
        sys.stdout.flush()

def construct_prompt(system_prompt, retrieved_docs, user_query):
    prompt = f"""{system_prompt}

    여기 검색된 컨텍스트가 있습니다:
    {retrieved_docs}
    
    여기 사용자 질의가 있습니다:
    {user_query}
    """
    return prompt

# 사용법
system_prompt = """
지적 검색 엔진입니다. 일부 검색된 컨텍스트와 사용자 질의가 제공될 것입니다.
    
요청을 이해하고 검색된 컨텍스트를 기반으로 답변할 것이 요구됩니다.
"""

retrieved_docs = """
리얼리스틱 LED 화염 및 열 설정이 있는 벽걸이 전기 벽난로. 블랙 글래스 프레임과 리모컨이 포함되어 운영이 편리합니다. 따뜻함과 분위기 추가하기에 이상적입니다. Hearth & Home 제작. 크기: 50"W x 6"D x 21"H.
"""

prompt = construct_prompt(system_prompt=system_prompt,
                          retrieved_docs=retrieved_docs,
                          user_query="리얼리스틱 LED 화염이 있는 벽걸이 전기 벽난로를 찾고 있어요.")

llm = Llama(model_path="/Users/joesasson/Downloads/mistral-7b-instruct-v0.2.Q3_K_L.gguf", n_gpu_layers=1)

stream_and_buffer(prompt, llm)
```

<div class="content-ad"></div>

이제 RAG 시스템을 배포할 준비가 되었습니다. 다음 부분을 따라와 주시면 저희는 이 거의 스파게티 코드를 사용자들이 사용할 수 있는 API로 바꿔드릴 겁니다.

# API 빌드 및 배포

우리 시스템의 영향력과 사용성을 높이기 위해, 우리는 그것을 컨테이너화된 플라스크 애플리케이션으로 패키징할 것입니다. 이 방식은 우리 모델이 도커 컨테이너 내부에 캡슐화되어 있어, 컴퓨팅 환경에 관계없이 안정성과 일관성을 제공합니다.

<div class="content-ad"></div>

위에서 임베딩 모델과 토크나이저를 다운로드해야 합니다. 이를 애플리케이션 코드, 요구 사항 및 Dockerfile과 같은 수준에 위치시키세요. LLM은 여기에서 다운로드할 수 있습니다.

다음과 같은 디렉토리 구조가 있어야 합니다:

![이미지](/assets/img/2024-07-07-LocalRAGFromScratch_2.png)

## app.py

<div class="content-ad"></div>


플라스크(Flask)에서 로거 레벨을 설정하는 코드를 제공합니다. 코드는 요청에 대한 처리를 수행하고 있습니다. 요청에서 쿼리 문자열을 가져오거나 JSON 데이터에서 쿼리 문자열을 추출하기로 합니다. 적절한 쿼리 문자열이 없는 경우 'query'라는 필수 매개변수가 누락되었다는 오류를 반환합니다. 벡터 스토어와 문서 스토어를 JSON 파일에서 열어 매치를 계산하고 상위 3개 결과를 가져옵니다. 또한 시스템 프롬프트, 검색된 문맥 및 사용자 쿼리를 포함한 기본 프롬프트를 작성합니다.

더불어 중요한 점은 Dockerfile의 두 번째 줄에서 작업 디렉토리를 '/app'으로 설정 중이기 때문에 애플리케이션 코드에서 로컬 경로(모델, 벡터 또는 문서 저장소)를 '/app'으로 접두사로 붙여야 한다는 것입니다.


<div class="content-ad"></div>

앞서 맥 컨테이너에서 앱을 실행할 때 GPU에 접근할 수 없는 점을 확인했어요. 보통 CPU를 사용하면 응답시간이 20분 정도 걸린다고 해요.

빌드 & 실행:


docker build -t `이미지-이름`:`태그` .
docker run -p 5001:5001 `이미지-이름`:`태그`


<div class="content-ad"></div>

컨테이너를 실행하면 앱이 자동으로 시작됩니다 (Dockerfile의 마지막 줄을 참조하세요). 이제 다음 URL로 엔드포인트에 액세스할 수 있습니다:

http://127.0.0.1:5001/rag_endpoint

API를 호출해 보세요:

```python
import requests, json

def call_api(query):
    URL = "http://127.0.0.1:5001/rag_endpoint"
    
    # 요청을 위한 헤더
    headers = {
        "Content-Type": "application/json"
    }

    # 요청을 위한 바디
    body = {"query": query}

    # POST 요청 보내기
    response = requests.post(URL, headers=headers, data=json.dumps(body))
    
    # 요청이 성공했는지 확인
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}, Message: {response.text}"

# 테스트
query = "Wall-mounted electric fireplace with realistic LED flames"

result = call_api(query)
print(result)

# 결과
{'response': {'choices': [{'finish_reason': 'stop', 'index': 0, 'logprobs': None, 'text': ' Based on the retrieved context, the wall-mounted electric fireplace mentioned includes features such as realistic LED flames. Therefore, the answer to the user\'s query "Wall-mounted electric fireplace with realistic LED flames" is a match to the retrieved context. The specific model mentioned in the context is manufactured by Hearth & Home and comes with additional heat settings.'}], 'created': 1715307125, 'id': 'cmpl-dd6c41ee-7c89-440f-9b04-0c9da9662f26', 'model': '/app/mistral-7b-instruct-v0.2.Q3_K_L.gguf', 'object': 'text_completion', 'usage': {'completion_tokens': 78, 'prompt_tokens': 177, 'total_tokens': 255}}
```

<div class="content-ad"></div>

# 요약

이 점에 이르기까지 필요한 모든 단계와 데이터 / 임베딩 / LLM에 대한 작업 흐름을 다시 한번 확인해보고 싶습니다.

- 문서 저장소를 생성하기 위해 텍스트 파일이 담긴 디렉토리를 document_chunker 함수에 전달합니다.
- 임베딩 모델을 선택합니다. 이를 로컬에 저장합니다.
- 문서 저장소를 벡터 저장소로 변환합니다. 이 두 가지를 로컬에 저장합니다.
- HF 허브에서 LLM을 다운로드합니다.
- 파일을 앱 디렉토리로 이동합니다(임베딩 모델, LLM, 문서 저장소 및 벡터 저장소 JSON 파일).
- Docker 컨테이너를 빌드하고 실행합니다.

중요한 점은 빌드 노트북을 사용하여 doc_store 및 vector_store를 생성하고 이를 앱에 배치하는 것입니다.

<div class="content-ad"></div>

깃허브 여러분, 읽어 주셔서 감사합니다!