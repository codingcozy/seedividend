---
title: "오픈 소스 모델, 온도 조정, 재순위 매기기 등 최신 LLM 반드시 읽어야 할 글들을 놓치지 마세요"
description: ""
coverImage: "/assets/img/2024-05-17-Open-SourceModelsTemperatureScalingRe-RankingandMoreDontMissOurRecentLLMMust-Reads_0.png"
date: 2024-05-17 04:22
ogImage:
  url: /assets/img/2024-05-17-Open-SourceModelsTemperatureScalingRe-RankingandMoreDontMissOurRecentLLMMust-Reads_0.png
tag: Tech
originalTitle: "Open-Source Models, Temperature Scaling, Re-Ranking, and More: Don’t Miss Our Recent LLM Must-Reads"
link: "https://medium.com/towards-data-science/open-source-models-temperature-scaling-re-ranking-and-more-dont-miss-our-latest-llm-must-reads-ed8e43190333"
isUpdated: true
---

새로운 LLM들이 거의 매일 등장하고, 그들이 가능케 하는 도구와 워크플로우도 더 빨리 확산됩니다. 우리는 이 영원히 변화하는 지형에서 최근 대화들을 되짚는 좋은 순간이라고 생각했고, 그것을 하는 더 나은 방법을 생각해내지 못했습니다. 과거 몇 주간의 강력한 기사 중 몇 가지를 강조함으로써 그것을 할 수 있다고 판단했습니다.

우리가 모아둔 글의 라인업은 고수준의 질문과 미시적인 문제들을 다루고 있습니다. 그래서 AI 윤리에 관심이 있다든지, 오픈 소스 기술의 발전에 흥미가 있다든지, 혁신적인 RAG 접근법이 궁금하다든지 하더라도, 여기에서 여러분의 관심을 끄는 것이 있을 거라고 확신합니다. 함께 살펴보죠.

- 변화하는 흐름: 오픈 소스 LLM이 닫힌 소스 LLM에 비해 경쟁 우위에 있는 이유
  생산적인 AI 도구의 초기 물결은 OpenAI가 출시한 프로프레타리 모델들에 의해 주도되었습니다.
  레오니 몬티아티(LTM’s)의 새로운 기사는 떠오르는 트렌드에 초점을 맞추고 있습니다: 데이터 보안, 맞춤화, 비용 등의 요소로 주목받는 작은 오픈 소스 재단 모델들이 등장하면서 점차 더 많은 시장을 지배하고 있다는 점.
- 챗봇의 윤리?
  LLM들이 사실 정보를 요청했을 때 환각을 유발할 수 있다는 것은 알고 있습니다. 사용자들이 윤리에 초점을 맞춘 조언을 요청하기 시작했을 때 어떻게 될까요?
  에얼 아하로니와 에디 나미아스는 이 tricky한 질문과 "특정한, 통제된 상황에서 인간의 윤리적 대화를 모방하거나 합성할 수 있는" 챗봇들의 도덕성 지각에 내재된 위험에 대한 최신 연구를 제시합니다.
- LLM의 추천이 제품 가시성 향상을 위해 조작될 수 있을까요?
  전자상거래는 이미 조작과 의문 스러운 비즈니스 관행에 민감한 분야입니다.
  파룰 판데이는 최근 논문 분석에서 보듯이, 텍스트와 다른 미디어를 빠르게 대량으로 생산할 수 있는 LLM은 이미이 생태계에서 여러 갭과 맹점을 악용할 수 있도록 준비되어 있습니다.

![Open-SourceModelsTemperatureScalingRe-RankingandMoreDontMissOurRecentLLMMust-Reads_0](/assets/img/2024-05-17-Open-SourceModelsTemperatureScalingRe-RankingandMoreDontMissOurRecentLLMMust-Reads_0.png)

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

- LLM에서 온도 스케일링 및 빔 서치 텍스트 생성, ML-인접
  포괄적이고 예시 가득한 가이드에서,
  마이크 체트가
  생성적 AI 워크플로우 문맥에서 온도 개념을 해체합니다: 이는 모델의 출력 순서의 예측 가능성을 수정하는 매개변수이며, 그 세세한 점을 숙달함으로써 실무자들이 AI 도구를 보다 효과적으로 활용할 수 있습니다.
- 더 나은 LLM RAG 검색을 위한 Re-Ranking 사용 방법
  검색 확장 생성에 대한 초기 흥분 이후, 많은 실무자들에게 RAG 시스템이 더 고급 정제 방법에서 효과를 볼 수 있는 것으로 명확해졌습니다.
  Leon Eversberg 박사
  의 최근 자습서에서, 우리를 더 나은 결과를 위해 (오픈 소스 바이-인코더와 크로스-인코더를 사용하는) 두 단계 검색을 활용하는 워크플로우를 안내합니다.

우리의 저자들은 항상 그랬던 것처럼, 최근 몇 주간 다양한 주제로 뻗어나가며 우수한 기사들을 제공했고, 여기 대표적인 샘플이 있습니다:

- 고객 평생 가치 시리즈를 여기저기에 끝낸 후,
  캐서린 군이
  가용한 예측 방법의 상세 개요와 각각에 대한 마케터와 데이터 과학자들이 기대할 수 있는 것을 제공합니다.
- 모든
  사친 데이트가
  몰입 분석은 축하할 가치가 있으며, 최신 버전도 이외의 것이 아닙니다. 19세기 난파 사건을 통해 설득력 있는 통계 수렴의 철저한 탐구입니다.
- 최신 초보자 친화적 가이드에서,
  Srijanie Dey 박사
  는 Llama 3로 이동하고, 그 변환기 구조의 세세한 점을 해체합니다.
- 분자 생물학, 생물 정보학 및 AI의 교차로에서 글쓰는,
  무르토 힐라리가
  단백질 상호 작용의 변이에 대한 효과를 예측하는 다중 분류 모델을 구축하는 방법을 보여줍니다.
- 물리학 (및 관련 분야)에서 데이터 과학으로의 직업 전환을 고려 중이라면,
  사라 노브레가
  스스로의 여정과 그동안 모은 경험을 바탕으로 한 실용적인 가이드를 놓치지 마십시오.
- 딥 러닝을 시작하는 사람들에게는,
  쉬레야 라오가
  컨볼루션 신경망에 대한 새로운 초보자 친화적이고 전문적으로 그림으로 설명된 입문서를 가져왔습니다.
- 콜모고로프-아놀드 네트워크 (KANs)를 공개한 논문은 겨우 2주 된 것이지만 이미 분야에서 큰 파장을 일으키고 있습니다.
  테오 울프가
  KANs가 어떻게 작동하며 그에 대한 소문이 무엇인지 이해하는 데 도움이 되는 TDS 초간단 기사를 첫 번째로 소개했습니다.

우리의 저자들을 지원해 주셔서 감사합니다! 우리는 새로운 저자들로부터의 기사를 출판하는 것을 사랑하므로, 최근에 재미있는 프로젝트 설명서, 자습서 또는 핵심 주제 중 하나에 대한 이론적 반성을 작성한 경우 우리와 공유하시기 바랍니다.

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

다음 변수까지,

TDS 팀
