---
title: "RAG에서 성능 및 효율성을 달성하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_0.png"
date: 2024-07-12 19:29
ogImage: 
  url: /TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_0.png
tag: Tech
originalTitle: "How Achieving Performance and Efficiency in RAG"
link: "https://medium.com/gitconnected/how-achieving-performance-and-efficiency-in-rag-d5bb693efb91"
---


## | LLM | RAG | BENCHMARK |

<img src="/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_0.png" />

LLM들은 답을 모를 때 환각을 일으키곤 합니다. 연구자와 기업에게 가장 큰 머리아픔 중 하나입니다. 특히 민감한 분야를 다룰 때 환각은 참사적인 결과를 초래할 수 있습니다.

그래서 새로운 패러다임인 검색 증강 생성(Retrieval Augmented Generation, RAG)이 발전했습니다. 이 새로운 시스템에서 LLM은 검색된 문맥을 활용하여 응답을 생성합니다. 따라서 RAG는 필요한 문맥을 찾아주며 LLM이 매개변수를 업데이트할 필요가 없도록 합니다.

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

그러나 모델에는 고유한 매개 변수 메모리가 있습니다. 때로는 이 매개 변수 메모리와 컨텍스트 간에 충돌이 발생하여 모델은 매개 변수 내의 답변과 RAG에서 제안된 답변 중에서 선택해야 합니다. 이러한 이유로 시스템을 최적화하는 데 사용되는 다양한 기술이 개발되었습니다.

사실, RAG는 여러 부분으로 구성되어 있고, 우리는 능숙하고 최적화된 시스템을 만들고 싶습니다. 따라서 모델이 쿼리를 문맥적으로 설정하는 방법, 가장 유사한 청크를 찾는 방법, 중요도 순서 등을 최적화해야 합니다. 시간이 흐름에 따라 몇 가지 전문 구성 요소가 발전해 왔습니다.

<img src="/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_1.png" />

각 단계에 대해 다른 방법들이 있기 때문에 복잡성이 증가합니다. 게다가, 더 정교한 RAG 패러다임은 여러 구성 요소로 구성되어 있으며, 각 단계마다 여러 가지 해결책이 가능합니다. 예를 들어, 다양한 종류의 청크화와 수십 가지 패턴의 임베더가 있습니다. 따라서 실무자는 여러 가지 결정을 내려야 합니다. 이러한 각각의 결정은 검색과 생성 단계에 모두 영향을 미칩니다.

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

최근 연구에서는 실증적으로 다양한 구성 요소가 RAG에 미치는 영향을 테스트했습니다.

이 연구에서는 각 단계가 어떻게 영향을 미치는지를 분석하고 각 시나리오에 가장 적합한 전략이 무엇인지 조사했습니다.

이 연구에서는 컴퓨팅 비용을 줄이기 위해:

- 각 RAG 단계에 대한 대표적인 방법을 비교하고 세 가지 최상의 방법을 선택합니다.
- 그런 다음 다른 구성 요소를 일정하게 유지하면서 각 방법을 개별적으로 테스트합니다.
- 마지막으로 일부 시나리오에 대해 구성 요소 세트를 테스트합니다.

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


![image](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_2.png)

모든 쿼리가 검색을 요구하지는 않습니다(이는 LLM이 매개 변수화 메모리를 가지고 있기 때문입니다). RAG도 지연 시간을 늘리고 계산 비용이 발생합니다. 따라서 LLM으로 직접 응답할 쿼리와 RAG가 필요한 쿼리를 선택하는 흥미로운 방법이 있습니다. 실제로, 검색은 모델 매개 변수 이상의 지식 및 작업이 요구하는 것에 대해서만 수행되어야 합니다.

따라서 이 연구에서 저자들은 매개 변수 모델 메모리가 충분한 작업과 충분하지 않은 작업(따라서 검색이 필요할 수 있음)으로 작업을 분류합니다. 저자들은 의사 결정 프로세스를 자동화하기 위해 분류기를 훈련시킵니다.

![image](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_3.png)


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

다양한 종류의 청킹과 관련된 다양한 하이퍼파라미터가 있습니다. 본 연구에서 저자들은 다음을 탐구했습니다:

- 청킹 유형. 토큰 수준 청킹은 가장 간단하지만 종종 성능이 좋지 않습니다. 의미 수준 청킹은 LLMs를 사용하여 분기점을 결정하며 컨텍스트를 보존하지만 계산 비용이 높습니다. 저자들은 문장 수준 청킹이 단순성과 효율성을 균형잡기 때문에 이를 사용합니다.
- 청킹 크기. 큰 청크는 더 많은 컨텍스트를 제공하지만 처리 시간을 증가시킵니다. 반면, 작은 청크는 검색 재현율을 향상시키지만 올바른 컨텍스트를 부족할 수 있습니다. 올바른 청크를 검색하는 것은 충실성 및 관련성과 같은 메트릭을 균형 있게 맞추어야 합니다.
- 청킹 기술. 작은 것에서 큰 것으로, 슬라이딩 윈도우와 같은 고급 기술은 블록 간의 관계를 식별할 수 있게 함으로써 검색 품질을 향상시킵니다. 일반적으로 질문과 일치하기 위해 작은 블록이 사용되는 반면, 컨텍스트 정보가 필요한 경우에는 더 큰 블록이 사용됩니다.

의도적으로 너무 크거나 작은 블록은 유익하지 않습니다. 512가 가장 적당한 크기로 보입니다.

![그림](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_4.png)

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

슬라이딩 윈도우는 최상의 결과를 제공하는 기법인 것 같아요.

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_5.png)

작가들은 임베딩을 위해 여러 모델을 시험한 후, 성능과 크기의 균형 때문에 LLM-Embedder를 선택했어요.

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_6.png)

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

벡터 데이터베이스도 중요합니다. 이 연구에서는 여러 기준을 고려합니다: 다양한 데이터 유형을 지원하는 여러 인덱스 유형, 십억 단위의 벡터 지원 (확장성), 하이브리드 검색 및 클라우드 네이티브 기능을 고려합니다. 보통은 이러한 기준을 선택하여 유연성, 확장성 및 배포 용이성에 미치는 영향을 평가합니다. 그들에게 가장 좋은 것은 Milvus입니다:

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_7.png)

검색을 위해 임베딩이 수행되면 상위 k개의 문서가 선택되어 생성에 사용됩니다. 원본 쿼리가 최적이 아닐 수 있으므로 쿼리 변환 시스템이 사용됩니다:

- 쿼리 재작성. 이 방법은 쿼리를 다시 작성하여 관련 문서와 더 잘 일치하도록 합니다. LLM이 쿼리를 다시 작성하고 성능을 향상시키는 데 사용됩니다.
- 쿼리 분해. 대신, 쿼리를 하위 쿼리로 분해하여 문서와 일치하도록 합니다.
- 의사 문서 생성. 이 방법은 쿼리를 기반으로 가상 문서를 생성하고 해당 임베딩을 사용하여 유사한 문서를 찾습니다 (예: HyDE).

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

저자들은 이러한 방법들과 혼합 검색을 테스트하기도 합니다. 여러 가짜 문서를 원본 쿼리와 함께 연결하면 검색 성능을 크게 향상시킬 수 있습니다. 물론 이렇게 하면 지연 비용이 증가하지만, 가상 문서 하나만으로도 충분한 것 같습니다.

[해당 이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_8.png)를 확인해보세요.

또한, 저자들은 혼합 검색에 대한 다양한 값들을 테스트합니다 (희소 검색 대 밀집 검색 비율). 결과는 α 값이 0.3일 때 가장 좋은 성능을 보인다는 것을 보여줍니다 (희소 검색의 중요도를 조절하는 하이퍼파라미터).

[해당 이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_9.png)도 확인해보세요.

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

검색 결과를 건내 받은 후 문서 재랭킹은 검색 결과의 관련성을 향상시켜줍니다. 저자들은 두 가지 접근 방식을 고려합니다:

monoT5는 성능과 효율성을 균형 있게 유지하는 것으로 보이며, TILDEv2가 가장 빠릅니다.

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_10.png)

저자들은 또한 재랭킹 후 문서를 다시 정렬하는 repacking에 대해 고려합니다. 관련성 순서는 생성 성능에 영향을 미칩니다.

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

검색은 LLM을 혼란스럽게 만들 수 있는 중복되고 불필요한 정보를 포함하는 문서를 찾을 수 있습니다. 또한, 긴 프롬프트는 효율적이지 않습니다. 저자들은 요약에 대해 탐구합니다(관련 단락을 추출하는 추출적 방식과 정보를 압축하여 요약을 생성하는 추상적 방식 모두):

- Recomp. 추출 압축기는 유용한 문장을 선택하고, 추상적 압축기는 여러 문서에서 정보를 종합합니다.
- 선택적 콘텍스트. 중복된 정보를 콘텍스트에서 제거합니다.

Recomp이 가장 잘 수행하는 모델로 보입니다:

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_11.png)

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

작가들은 또한 RAG에 대한 LLM의 세밀한 조정을 탐구합니다. 결과는 모델이 세밀하게 조정되면 특히 교육 중 몇 가지 관련성 있는 문서와 임의로 선택된 문서들로 세밀하게 조정된 경우에 더 잘 작동함을 보여줍니다.

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_12.png)

이 시점에서, 작가들은 다양한 구성 요소 선택과 관련하여 다양한 도메인인 사실 확인, 다중 점프 및 특수 도메인과 비교를 실시합니다. 또한 더 포괄적인 평가를 위해 여러 지표를 측정합니다.

결과는 다음과 같습니다:

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

- Query Classification Module은 정확도 뿐만 아니라 시스템의 평균 대기 시간도 줄입니다 (모든 쿼리가 RAG로 답변되지는 않습니다).
- HyDE 하이브리드는 검색에 대한 최고의 성능을 보여주지만 상대적으로 높은 계산 비용이 발생하므로 저자들은 하이브리드나 하이브리드 없는 검색을 권장합니다.
- 다시 순위 매기는 중요하며 주요 성능 하락으로 이어집니다. MonoT5가 최고의 방법으로 확인됩니다.
- 재포장은 영향을 미칠 것으로 보이며 문서를 오름차순의 관련성 점수로 정리하는 것이 최선인 해결책입니다.
- 요약은 결과를 향상시키지만 대기 시간 비용이 듭니다. 요약과 유사한 성능은 여전히 얻을 수 있습니다.

![이미지](/TIL/assets/img/2024-07-12-HowAchievingPerformanceandEfficiencyinRAG_13.png)

재현성을 위해 코드는 여기에 있습니다:

RAG에 대해 깊이 있는 벤치마킹을 수행하는 연구는 거의 없습니다. 이 작업의 가치는 최적의 구성 요소와 시스템을 체계적으로 연구함으로써 다양한 구성 요소에 대해 심층 연구를 수행했다는 점입니다. 저자에게 결론은:

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

- 최상의 성능 실천 방법. 최상의 성능을 위한 조합은 쿼리 분류 모듈, HyDE와의 하이브리드, monoT5, 역 패킹 및 Recomp을 포함합니다. 이 방법은 계산적으로 많은 리소스를 요구할 수 있어 더 높은 대기 시간을 야기할 수 있습니다.
- 균형있는 효율성 실천. 저자들은 계산 비용을 줄이기 위해 Hybrid with HyDE 및 TILDEv2를 사용하지 않고 재순위 작업을 하지 않는 것을 제안하며 성능에 큰 영향을 끼치지 않습니다.

이 연구는 두 가지 훌륭한 처방을 제시합니다. 계산 비용 문제로 모든 가능한 조합을 탐색하는 것은 불가능할 수 있습니다. 또한 하나의 레시피가 모든 경우에 적용되지 않을 수 있습니다. 서로 다른 레시피가 더 나은 결과를 얻을 수 있는 특정 경우도 있습니다. 또한, 저자들은 RAG 및 생성기의 공동 세밀 조정을 탐구하지 않았으며 이는 성능 (및 환각 감소)에 주목할 만한 영향을 줄 수 있습니다.

## 어떻게 생각하시나요? 두 가지 레시피 중 하나를 시도해 보시겠습니까? 의견을 남겨 주세요.

# 이 흥미로운 내용을 찾으셨다면:

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

저의 다른 글을 읽어보시고 LinkedIn에서 저와 연결하거나 연락하실 수도 있어요. 매주 업데이트되는 머신 러닝 및 인공 지능 뉴스가 포함된 이 저장소를 확인해보세요. 협업 및 프로젝트에 대해 열려 있으며 LinkedIn을 통해 저에게 연락할 수 있어요. 또한 새로운 이야기를 게시할 때 알림을 받으려면 무료로 구독할 수도 있어요.

저의 GitHub 저장소 링크는 여기 있어요. 거기에는 머신 러닝, 인공 지능 등과 관련된 코드 및 다양한 리소스가 수집되어 있어요.

또는 최근 글 중 하나에 관심이 있을 수도 있어요:

# 참고

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

이 글을 작성할 때 참고한 주요 참고 자료 목록입니다. 각 문장의 이름은 한 번만 인용됩니다.

- 고우, 2024, 대형 언어 모델을 위한 검색 증강 생성: 조사, 링크
- 왕, 2024, 검색 증강 생성에서의 최상의 실천법 찾기, 링크
- 노게이라, 2020, 사전 훈련된 시퀀스-투-시퀀스 모델을 사용한 문서 순위 매김, 링크