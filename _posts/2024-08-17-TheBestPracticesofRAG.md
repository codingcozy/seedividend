---
title: "최신 RAG Retrieval-Augmented Generation 최고의 실천 방법 5가지"
description: ""
coverImage: "/assets/img/2024-08-17-TheBestPracticesofRAG_0.png"
date: 2024-08-17 01:58
ogImage:
  url: /assets/img/2024-08-17-TheBestPracticesofRAG_0.png
tag: Tech
originalTitle: "The Best Practices of RAG"
link: "https://medium.com/towards-artificial-intelligence/the-best-practices-of-rag-300e313322e6"
isUpdated: true
updatedAt: 1723864283733
---

RAG 프로세스는 복잡한데, 다양한 구성요소들이 필요합니다. 최상의 RAG 방법을 식별하기 위해 기존 RAG 방법과 그들의 최적의 조합을 어떻게 결정할 수 있을까요?

본 글은 "검색-증강 생성에서 최상의 실천법 찾기"라는 새로운 연구에 대해 소개합니다. 이 연구는 이 문제를 다루기 위해 시작되었습니다.

본 글은 네 가지 주요 부분으로 나뉩니다. 먼저 전형적인 RAG 프로세스를 소개합니다. 다음으로, 각 RAG 모듈에 대한 최상의 실천법을 제시합니다. 그리고 포괄적인 평가를 제공합니다. 마지막으로, 나의 생각과 통찰을 공유하며, 요약으로 마무리합니다.

_전형적인 RAG 워크플로우_

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

<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_0.png" />

일반적인 RAG 워크플로우에는 여러 중간 처리 단계가 포함되어 있습니다:

- 쿼리 분류 (입력 쿼리가 검색을 필요로 하는지 여부 결정)
- 검색 (관련 문서를 효율적으로 획득)
- 재순위 지정 (관련성에 따라 검색된 문서의 순서를 최적화)
- 재구성 (구조화된 형태로 검색된 문서를 정리)
- 요약 (주요 정보를 추출하여 응답을 생성하고 중복을 제거합니다)

RAG를 구현하는 것은 또한 문서를 청크로 분할하는 방법, 의미 표현을 위해 사용할 임베딩 선택, 효율적인 특징 저장을 위한 적합한 벡터 데이터베이스 선택, 그림 1에 나와 있는 것과 같이 LLMs를 미세 조정하는 효과적인 방법을 찾는 것을 포함합니다.

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

# 각 과정의 모베스트 프랙티스

## 질의 분류

질의 분류가 왜 필요한가요? LLM(Large Language Models)은 특정 기능을 갖고 있기 때문에 모든 질의가 검색 향상을 필요로 하는 것은 아닙니다. RAG(Retriever-Generator)는 정확도를 향상시키고 환각을 줄일 수 있지만, 반복적인 검색은 응답 시간을 증가시킬 수 있습니다. 따라서, 우리는 먼저 질의를 분류하여 검색이 필요한지 여부를 결정합니다. 일반적으로, 모델 매개변수를 넘어서는 지식이 필요할 때 검색을 권장합니다.

우리는 충분한 정보를 제공하는 작업 및 특정 작업 및 예시를 표시하는지 여부에 기반하여 작업을 15가지 유형으로 분류할 수 있습니다. 사용자가 제공한 정보를 전적으로 기반으로 하는 작업은 "충분"으로 표시되고 검색이 필요하지 않습니다; 그렇지 않으면 "불충분"으로 표시되며 검색이 필요할 수 있습니다.

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

`<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_1.png" />`

이 분류 프로세스는 분류기를 훈련하여 자동화됩니다.

`<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_2.png" />`

## 청킹

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

문서를 작은 조각으로 나누는 것은 검색 정확도를 향상시키고 LLM에서 길이 문제를 피하는 데 중요합니다. 일반적으로 세 가지 수준이 있습니다:

- 토큰 수준의 청킹은 간단하지만 문장을 나눌 수 있어 검색 품질에 영향을 줄 수 있습니다.
- 의미 수준 청킹은 LLM을 사용하여 중단점을 결정하며 문맥을 유지하지만 시간이 더 걸립니다.
- 문장 수준의 청킹은 텍스트 의미를 보존하는 동시에 간결하고 효율적일 수 있습니다.

여기서 문장 수준의 청킹은 간결함과 의미 보존을 균형있게 유지하는 데 사용됩니다. 청킹 프로세스는 아래 네 가지 차원에서 평가됩니다.

청킹 크기

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

조각 크기는 성능에 상당한 영향을 미칩니다. 더 큰 조각은 이해를 향상시키는 맥락을 제공하지만 처리 시간을 증가시킵니다. 더 작은 조각은 회상률을 향상시키고 시간을 단축하지만 충분한 맥락이 없을 수 있습니다.

![이미지](/assets/img/2024-08-17-TheBestPracticesofRAG_3.png)

그림 4에서 보듯이 두 가지 주요 지표가 사용됩니다: 충실도와 관련성. 충실도는 응답이 환각적인지 또는 검색된 텍스트와 일치하는지를 측정합니다. 관련성은 검색된 텍스트와 응답이 쿼리와 일치하는지를 측정합니다.

조각 조직

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

결과는 도표 5에 표시되어 있습니다. 더 작은 청크 크기는 175 토큰이고, 더 큰 청크 크기는 512 토큰이며, 블록 중첩은 20 토큰입니다.

![그림](/assets/img/2024-08-17-TheBestPracticesofRAG_4.png)

임베딩 모델 선택

도표 6에서 볼 수 있듯이, LLM-Embedder는 BAAI/bge-large-en과 비교 가능한 결과를 달성하였지만 그 크기는 후자의 1/3만큼 작습니다. 따라서 성능과 크기를 균형있게 고려하여 LLM-Embedder가 선택되었습니다.

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

<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_5.png" />

메타데이터 추가

제목, 키워드 및 가상 질문과 같은 메타데이터를 사용하여 청크 블록을 개선하면 검색이 개선됩니다.

이 논문은 구체적인 실험은 포함되어 있지 않지만 이를 향후 작업으로 남겨 두었습니다.

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

## 벡터 데이터베이스

제 7번 테이블은 다섯 개의 오픈 소스 벡터 데이터베이스인 Weaviate, Faiss, Chroma, Qdrant 및 Milvus를 자세히 비교해줍니다.

Milvus는 평가받은 데이터베이스 중에서 가장 뛰어나며 모든 기본 기준을 충족하며 성능 면에서 다른 오픈 소스 옵션을 능가합니다.

![이미지](/assets/img/2024-08-17-TheBestPracticesofRAG_6.png)

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

## 검색

사용자 쿼리에 대해 검색 모듈은 유사성에 기반하여 사전에 구축된 말뭉치에서 쿼리와 가장 관련성이 높은 상위 k개 문서를 선택합니다.

다음은 세 가지 검색 관련 기술 및 그 조합을 평가합니다:

- 쿼리 재작성: 이 기술은 쿼리를 개선하여 관련 문서와 더 잘 일치시킵니다. Rewrite-Retrieve-Read 프레임워크에서 영감을 받아 LLM에게 쿼리를 재작성하여 성능을 향상시킵니다.
- 쿼리 분해: 이 방법은 원래 쿼리에서 추출된 하위 질문을 기반으로 문서를 검색합니다. 이러한 하위 질문들은 일반적으로 더 복잡하고 이해하기 어렵습니다.
- 가상 문서 생성: 이 방법은 사용자 쿼리를 기반으로 가상의 문서를 생성하고 해당 가상 답변의 임베딩을 사용하여 유사한 문서를 검색합니다. 주목할만한 구현체는 HyDE입니다.

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

![Figure 8](/assets/img/2024-08-17-TheBestPracticesofRAG_7.png)

지도 학습 방법이 비지도 학습 방법보다 크게 우수한 것을 보여준 그림 8입니다. HyDE와 하이브리드 검색을 결합하여, LLM-Embedder가 가장 높은 점수를 달성했습니다.

따라서, 기본 검색 방법으로 HyDE + 하이브리드 검색을 사용하는 것이 권장됩니다. 하이브리드 검색은 희소 검색(BM25)과 밀도 검색(원래 임베딩)을 결합하여, 상대적으로 낮은 대기 시간으로 높은 성능을 달성합니다.

## 재순위화

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

초기 검색 후 재순위 지정 단계가 문서의 중요성을 향상시켜 상위 목록에 가장 관련성 높은 정보가 나타날 수 있도록 합니다. 두 가지 주요 방법이 고려됩니다:

- DLM 재순위 지정: 이 방법은 Deep Language Models (DLMs)를 사용하여 재순위 지정합니다. 이러한 모델은 쿼리와 문서의 관련성을 "true" 또는 "false"로 분류하도록 세밀하게 조정됩니다. 모델을 세밀하게 조정하는 동안, 쿼리와 문서는 관련성을 주석으로 지정하여 훈련됩니다. 추론 중에 문서는 "true" 레이블의 확률에 따라 정렬됩니다.
- TILDE 재순위 지정: TILDE는 각 쿼리 용어의 가능성을 독립적으로 계산하며 모델 어휘에서 각 용어의 확률을 예측합니다. 문서는 쿼리 용어의 사전 계산된 로그 확률을 합하여 점수를 매기며, 추론 중에 빠른 재순위 지정이 가능합니다. TILDEv2는 문서에만 존재하는 용어를 인덱싱하고, NCE 손실을 사용하고, 문서를 확장하여 효율성을 높이고 인덱스 크기를 줄이는 방식으로 개선됩니다.

![이미지](/assets/img/2024-08-17-TheBestPracticesofRAG_8.png)

그림 9에서 보듯이 성능과 효율성을 균형있게 고려하는 종합적인 방법으로 monoT5를 사용하는 것이 좋습니다. RankLLaMA는 최적의 성능을 찾는 사람들에게 이상적이며, TILDEv2는 고정된 세트에서 빠르게 실험할 때 적합합니다.

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

## 다시 포장하기

다음 프로세스인 LLM 응답 생성과 같은 후속 프로세스의 성능은 제공된 문서의 순서에 따라 영향을 받을 수 있습니다.

이를 해결하기 위해, 우리는 다시 랭킹하는 작업 후에 간단한 재포장 모듈을 워크플로에 추가했습니다. 이 모듈에는 세 가지 방법이 있습니다.

- "forward" 방법은 다시 정렬 단계에서의 관련성 점수를 기준으로 문서를 내림차순으로 재포장합니다.
- "reverse" 방법은 문서를 오름차순으로 정렬합니다.
- "sides" 옵션은 'Lost in the Middle'에서 영감을 받은 것으로, 입력의 시작 또는 끝에 관련 정보가 있는 경우 가장 잘 작동합니다.

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

이 재포장 방법은 주로 후속 모듈에 영향을 미치므로, 이들의 평가는 다음 종합 검토 섹션에서 소개됩니다.

## 요약

검색 결과에는 중복되거나 불필요한 정보가 포함될 수 있으며, 이는 LLM이 정확한 응답을 생성하는 것을 방해할 수 있습니다. 또한 긴 프롬프트는 추론 프로세스를 늦출 수 있습니다. 따라서 검색된 문서를 요약하는 효과적인 방법은 RAG 프로세스에서 중요합니다.

추출식 압축기는 텍스트를 문장으로 세분화하여 중요성에 따라 점수를 매기고 순위를 매깁니다. 생성식 압축기는 여러 문서에서 정보를 종합하여 다시 정리하고 일관된 요약을 생성합니다. 이 작업은 쿼리 기반 또는 비쿼리 기반일 수 있습니다.

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

세 가지 방법이 주로 평가됩니다:

- Recomp: 추출 및 생성 압축기를 모두 갖추고 있습니다. 추출 압축기는 유용한 문장을 선택하고, 생성 압축기는 여러 문서에서 정보를 합성합니다.
- LongLLMLingua: 쿼리와 관련된 주요 정보에 초점을 맞춰 LLMLingua를 개선합니다.
- Selective Context: 입력 콘텍스트에서 중복 정보를 식별하고 제거함으로써 LLM 효율성을 개선합니다.

<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_9.png" />

그림 10에 표시된 것처럼, Recomp을 사용하는 것이 좋습니다. Recomp은 우수한 성능을 발휘합니다. LongLLMLingua는 성능이 좋지 않지만 실험 데이터에서 훈련을 받지 않아도 더 좋은 일반화 능력을 보여줍니다. 따라서 이를 대안적인 방법으로 고려할 수 있습니다.

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

## 생성기 세부 조정

Figure 11은 혼합 관련 및 무작위 문서로 훈련된 모델(Mgr)이 골드 문서 또는 혼합 콘텍스트를 제공받을 때 가장 우수한 성능을 발휘한다는 것을 보여줍니다.

따라서 훈련 중 관련 콘텍스트와 무작위 콘텍스트를 혼합하는 것은 생성기의 강인성을 향상시키고 관련 콘텍스트의 효과적인 활용을 보장할 수 있습니다.

<img src="/assets/img/2024-08-17-TheBestPracticesofRAG_10.png" />

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

# 포괄적 평가

이전에는 각 모듈별로 별도로 평가되었지만, 이제 이러한 모듈들이 통합되어 포괄적인 평가가 이루어집니다.

![이미지](/assets/img/2024-08-17-TheBestPracticesofRAG_11.png)

그림 12에서 보듯이, 다음과 같은 주요 통찰이 도출되었습니다:

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

- 쿼리 분류 모듈: 이 모듐은 효율성과 효과를 향상시키고 전체 점수를 0.428에서 평균 0.443로 높이며 쿼리 대기 시간을 16.41초에서 11.58초로 줄입니다.
- 검색 모듈: "Hybrid with HyDE" 방법은 0.58의 가장 높은 RAG 점수를 달성하였지만 계산 비용이 높아서 쿼리 당 11.71초가 소요됩니다. 따라서 대기 시간을 줄이면서도 비슷한 성능을 유지하는 "Hybrid" 또는 "Original" 방법을 사용하는 것이 좋습니다.
- 재랭킹 모듈: 재랭킹 모듈이 없는 경우 성능이 크게 저하됩니다. MonoT5가 가장 높은 평균 점수를 달성하여 검색된 문서의 관련성 향상에 효과를 입증했습니다. 이는 재랭킹이 생성된 응답의 품질을 향상시키는 데 중요한 역할을 한다는 것을 보여줍니다.
- 다시 패킹 모듈: 역구성은 0.560의 우수한 성능을 보여주었습니다. 이는 더 관련성 높은 컨텍스트를 쿼리 위치에 가까이 배치하는 것이 최상의 결과를 낳는다는 것을 시사합니다.
- 요약 모듈: Recomp은 우수한 성능을 보여주었지만 요약 모듈을 제거하면 보다 낮은 대기 시간에서도 비슷한 결과를 얻을 수 있습니다. 그럼에도 불구하고 Recomp은 생성기의 최대 길이 제한을 해결하기 때문에 선호됩니다.

# 내 생각과 통찰

이 논문으로부터 여러 가지 통찰을 얻었습니다:

- 시스템 구성 요소의 중요성: 논문은 RAG 시스템의 각 구성 요소의 중요성을 강조합니다. 예를 들어 쿼리 분류, 검색, 재랭킹, 문서 다시 패킹, 요약, 생성 등입니다. 복잡한 시스템을 설계할 때 각 구성 요소의 성능을 최적화하는 것이 중요함을 보여줍니다.
- 모듈식 디자인의 중요성: 모듈별로 최적화하고 테스트하는 것은 복잡한 시스템에서 모듈식 디자인의 이점을 보여줍니다. 독립적으로 업데이트 및 최적화가 가능하여 유지보수성을 향상시키며 다양한 응용 프로그램 간에 재사용 및 조정을 용이하게 합니다.
- 체계적인 실험 방법론: 잘 알려진 데이터셋을 대상으로 광범위한 실험을 수행함으로써, 논문은 결과의 신뢰성과 일반성을 보장합니다. 이러한 체계적인 실험 설계 방식은 다른 연구자들에게 훌륭한 예를 제공합니다.

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

RAG의 실제 응용에서 몇 가지 도전 과제가 있습니다.

- 일반화: 앞서 언급한 평가는 주로 공개 주류 데이터셋을 기반으로 하고 있음을 유념해야 하며, 기업의 비공개 데이터셋과 같은 다른 데이터셋에서의 성능은 추가 평가가 필요합니다.
- 커버리지: 예를 들어, ColBERT와 같은 늦은 상호작용 모델을 다루지 않았으며 그래프 RAG나 RAPTOR와 같은 전체적 이해력을 향상시키는 기술을 평가하지 않았습니다. 미래 업데이트를 기대합니다.
- 실시간 성능: 논문은 검색 및 응답 속도를 고려하고 있지만, 실시간 응용에서 속도와 정확성의 균형을 유지하는 것은 여전히 도전입니다.
- 다중 모달 데이터의 통합 및 처리: 서로 다른 모달리티에서 데이터를 효과적으로 처리하고 통합하여 시스템의 안정성과 효과를 보장하는 것은 또 다른 기술적 장벽으로, 이에 대한 대응이 필요합니다.

# 결론

전반적으로, 두 가지 다른 RAG 시스템 구현 전략을 권장합니다:

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

- Best Performance Practice: 가장 높은 성능을 위해 쿼리 분류 모듈을 포함하고, 검색을 위해 "Hybrid with HyDE" 방법을 사용하며, 재순위 지정을 위해 monoT5를 채택하고, 재포장을 위해 "Reverse"를 선택하고, 요약을 위해 Recomp을 활용하세요.
- Balanced Efficiency Practice: 성능과 효율성을 균형있게 유지하려면 쿼리 분류 모듈을 포함하고, 검색을 위해 Hybrid 방법을 구현하고, 재순위 지정에 TILDEv2를 사용하고, 재포장을 위해 "Reverse"를 선택하고, 요약을 위해 Recomp을 사용하세요.

이 논문의 주요 가치는 RAG 가장 좋은 실천법을 연구하기 위한 가치 있는 아이디어와 방법을 제공한다는 것입니다.

RAG 기술에 관심이 있다면 다른 제 논문을 자유롭게 확인해보세요.

그리고 최신 논문이나 비디오는 제 뉴스레터나 YouTube에서 찾을 수 있습니다.

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

이 기사에 오류나 누락 사항이 있거나 궁금한 점이 있으면 댓글 섹션에 알려주세요.
