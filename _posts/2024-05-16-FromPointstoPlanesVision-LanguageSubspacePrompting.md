---
title: "점들로부터 평면까지 Vision-Language Subspace Prompting"
description: ""
coverImage: "/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_0.png"
date: 2024-05-16 17:39
ogImage:
  url: /assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_0.png
tag: Tech
originalTitle: "From Points to Planes: Vision-Language Subspace Prompting"
link: "https://medium.com/@venkateshtata9/from-points-to-planes-vision-language-subspace-prompting-d3d04204c48a"
isUpdated: true
---

![lecture image](/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_0.png)

최근에 고급 컴퓨터 비전 수업인 Dr. 이 제가 이끄는 Dr. 송 이제의 흥미로운 게스트 강연을 듣게 되었습니다. Dr. Li는 삼성 AI의 연구 과학자로, 도메인 일반화, 연합 학습 및 PEFT 방법과 같은 인공 지능의 중요 주제를 다루었습니다. 특히, 그의 최신 연구인 "Vision-Language Sub Space Prompting"에 초점을 맞춘 프레젠테이션은 정보 전달 뿐만 아니라 유사성 검색과 같은 작업에서 진화하는 방법론을 구체화하는 데 있어서 흥미롭고 사유를 제공했습니다. 그의 통찰력에 영감을 받아, 저는 그의 최신 연구 작업에 대한 직관에 대한 생각을 이 블로그를 통해 공유할 필요성을 느꼈습니다.

Sub-space prompting의 복잡성에 뛰어들기 전에, 대규모 언어 모델(LLMs)과 시각-언어 모델(VLMs)의 영역에서 우리를 이 시점으로 이끌어 온 혁신의 역사를 잠깐 돌아봅시다. 여러분, 정말 대단한 여정이었습니다!

LLMs의 초기 발전은 Word2Vec 및 GloVe와 같은 모델의 등장으로 시작되었고, 이 모델은 단어의 밀도 있는 벡터 표현을 생성했습니다. 이 임베딩은 단어 간 의미와 관계를 포착해, 더 정교한 모델을 위한 기초를 마련했습니다. 이는 예전 페이스북에서 누군가가 우리를 "찌르다"라는 말만 들어도 정말 즐거웠던 소셜 미디어 초기 시절과 닮았네요.

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

그 다음에는 트랜스포머의 시대가 도래했습니다. 특히 2017년 Vaswani 등이 소개한 트랜스포머 아키텍처는 해당 분야를 완전히 혁신했습니다. 트랜스포머는 셀프 어텐션 메커니즘을 활용하여 모델이 문장이나 문서 전체를 병렬로 처리하고 맥락적 관계를 더 효과적으로 포착할 수 있게 했습니다.

이어서 BERT(Bidirectional Encoder Representations from Transformers)와 GPT(Generative Pre-trained Transformer)가 등장했습니다. BERT는 모델이 양방향으로 컨텍스트를 학습하는 이중향 교육 개념을 소개했고, GPT는 비지도 학습과 자기회귀 언어 생성의 힘을 보여줌으로써 언어 모델링 분야에서 새로운 기준을 세웠습니다. GPT가 마치 AI 세계를 황홀한 롤러코스터 여행에 초대하며 기록을 깨고 모두를 감탄시켰다고 상상해보세요.

한편 VLM(Visual Language Models)도 주목을 받고 있었습니다. VisualBERT와 ViLBERT와 같은 모델은 시각적 및 텍스트 데이터를 결합하여 이미지 캡션 달기, 시각적 질문 응답 등 양쪽 모드를 이해해야 하는 작업을 가능하게 했습니다. AI의 동적인 듀오로 생각해보세요. 함께 세계를 보고 설명하며 복잡한 퍼즐을 해결합니다.

이어서 OpenAI의 CLIP(Contrastive Language–Image Pre-training)이 등장합니다. CLIP은 대규모 이미지-텍스트 쌍 데이터셋에서 훈련하여 이미지와 텍스트를 연관시키는 방법을 학습함으로써 제로샷 분류 작업에서 놀라운 성능을 달성했습니다. CLIP은 마치 AI 파티에 등장해 파티 분위기를 살려 이미지와 텍스트를 완벽하게 이해하는 능력으로 모든 이들을 감탄시켰다고 생각해보세요.

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

서브스페이스 프롬프팅의 구체적인 내용을 살펴보면, 기술의 진화를 이해하는 것이 매우 중요합니다. 각 혁신은 이전 성공과 교훈을 기반으로 구축되어 오늘날 우리가 보는 정교한 모델과 방법론으로 이어졌습니다.

# 비전-언어 모델 이해: CLIP 사례

![이미지](/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_1.png)

비전-언어 모델(VLM)에 대해 생각할 때, 그것들을 AI 세계의 스위스 아미 나이프로 상상해보세요. 다재다능하고 소형이면서 예상치 못하게 강력합니다. 이 분야에서 빛나는 별 한 개는 OpenAI가 개발한 CLIP입니다. 수백만 개의 세심하게 레이블이 붙은 이미지를 사탕 가게에서 사탕을 먹는 아이처럼 먹이는 전통적 모델들이 있는 세계에서, CLIP은 자가 감독 학습 방식으로 젠의 접근을 취합니다. 이 방법은 대조 손실 함수를 사용하여 멋지기만 한 것이 아니라 놀랍도록 효과적으로 작동하여 CLIP이 많은 지도 학습 모델들을 앞설 수 있게 합니다.

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

CLIP은 그냥 어떤 모델이 아닙니다. 그것은 다양한 작업을 동시에 수행하는 마에스트로입니다. 이 모델은 우수한 특성 표현을 만들어내는데, 이는 단순히 좋을 뿐만 아니라 수많은 하위 작업들을 해결하는 금빛 열쇠 같습니다. 예를 들어, CLIP에서 임베딩을 사용하면 순식간에 이미지 또는 텍스트 분류 시스템을 만들 수 있습니다. 또는 이 임베딩을 사용하여 텍스트와 이미지를 결합한 가장 가까운 이웃 검색을 수행할 수 있습니다. 마치 화가가 캔버스에 색을 섞는 것처럼요.

# 프롬프트 엔지니어링의 진화

훌륭한 임베딩이면 큰 책임도 따라옵니다. 즉, 그것들을 효과적으로 활용하는 방법을 알아내야 합니다. 이것이바로 프롬프트 엔지니어링, 모델로부터 최상의 답변을 도출하기 위해 완벽한 질문을 만드는 예술입니다. 이는 데이터를 위한 매치메이킹과 같습니다. 이를 통해 질문과 모델이 완벽히 맞는지를 확인합니다. 연구자들은 구문을 다듬어 순수한 요청인 "'CLASS'의 사진."과 같은 것을 "새 종류 중 'CLASS'의 사진."과 같이 더 화려하게 변환하여 결과물을 향상시키고 있습니다.

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

그러나 수동으로 이러한 프롬프트를 제작하는 것은 설명서 없이 가구를 조립하는 것만큼 지루합니다. 이에 프롬프트 학습 분야가 등장해 밝은 기사갑옷을 입은 기사처럼 나타났습니다. 이는 강한, 수동으로 만들어진 프롬프트를 더 유연한 것으로 대체합니다 — Coop 및 CoCoOp과 같은 작품에서 나타나는 학습 가능한 임베딩, 즉 컨텍스트 최적화(즉, 소프트 프롬프팅이나 소프트 프롬프터라고도 함). 이러한 동적 임베딩은 특정 작업의 맛을 향상시킬 수 있도록 맞춤형 양념 조합과 같습니다. 예를 들어, 정의된 일련의 범주를 분류하는 것과 같은 특정 작업에 더욱 특화된 작업에 특화된 작업에 대한 임베딩입니다.

# Vision-Language Sub Space Prompting

<img src="/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_3.png" />

그들의 논문인 “Vision-Language Sub Space Prompting”에서 컨텍스트 최적화의 일반적인 문제점들이 지적됩니다. 일반적으로 학습 가능한 소프트 프롬프트는 너무 열정적인 학생들처럼 작용합니다 — 익숙한 주제에서 뛰어나지만 새로운 자료에 직면할 때 성능이 떨어지며 새로운 클래스에 마주했을 때 성능이 떨어집니다. 전통적으로 해결책은 수동으로 만들어진 프롬프트 조미료를 약간 뿌리는 것이었지만, 이는 모델이 초기에 학습한 작업에 대해 빛나던 빛깔을 둔화시키는 경우가 많았습니다. 이는 주로 여기서 특징 공간에서 2개의 점 간 거리가 계산되고 점 단독이 항상 수업의 충분한 의미를 포착할 수 없기 때문입니다.

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

이를 해결하기 위해 SuPr (Subspace Prompting) 개념이 제안되었습니다. 클래스를 하나의 공간 점으로 나타내는 대신 전체 하위 공간으로 나타내는 새로운 차원으로의 건너뛰기와 같다고 생각해보세요. 일반적인 소프트 프롬프트 세트를 더 짧은 길이로 분할하여 파라미터 수를 증가시키지 않고도 앙상블을 유지할 수 있습니다. 각 세트는 토큰 시퀀스를 생성하여 텍스트 인코더에 공급하여 임베딩의 꽃다발을 만들어내는 하위 공간을 생성합니다 - 그들은 이를 하위 공간의 지원 지점이라고 부릅니다.

![image alt text](/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_4.png)

기존의 유클리드 메트릭을 뒤바꾸는 포인트-서브스페이스 거리를 사용하여 (누가 평범한 유클리드를 좋아할까요?). 이 방법은 단순히 새로운 레이어를 추가하는 것이 아니라 하위 공간이 VLM(비전-언어 모델)과 상호 작용하는 방식을 변경하여 시각적 의미의 더 풍부한 스펙트럼을 포괄할 수 있는 지평을 넓힙니다.

![image alt text](/assets/img/2024-05-16-FromPointstoPlanesVision-LanguageSubspacePrompting_5.png)

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

이 방법론을 통해 다른 다중 모달에 적용할 수 있는 가능성이 있으며, 여러 기본 모델에 기반을 둔 차별적인 방식으로 공동 내재 표현이 학습될 것으로 예상됩니다.

참고문헌
