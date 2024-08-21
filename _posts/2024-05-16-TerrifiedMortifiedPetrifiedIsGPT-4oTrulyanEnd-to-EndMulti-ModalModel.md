---
title: "GPT-4o가 정말 엔드투엔드 멀티모달 모델인가요 공포, 당황, 암울에 빠진 당신을 떤들어드릴게요"
description: ""
coverImage: "/assets/img/2024-05-16-TerrifiedMortifiedPetrifiedIsGPT-4oTrulyanEnd-to-EndMulti-ModalModel_0.png"
date: 2024-05-16 17:36
ogImage:
  url: /assets/img/2024-05-16-TerrifiedMortifiedPetrifiedIsGPT-4oTrulyanEnd-to-EndMulti-ModalModel_0.png
tag: Tech
originalTitle: "Terrified, Mortified, Petrified: Is GPT-4o Truly an End-to-End Multi-Modal Model?"
link: "https://medium.com/@sergioli/terrified-mortified-petrified-is-gpt-4o-truly-an-end-to-end-multi-modal-model-fe2ab3b934f2"
isUpdated: true
---

![GPT-4 Omni](/assets/img/2024-05-16-TerrifiedMortifiedPetrifiedIsGPT-4oTrulyanEnd-to-EndMulti-ModalModel_0.png)

OpenAI가 강력하고 다재다능한 AI 모델인 GPT-4 옴니를 소개했습니다. 다양한 입력 및 출력 형식을 처리하는 능력이 탁월하지만, 기술 전문가와 연구자들이 GPT-4 옴니가 엔드 투 엔드 다중 모달 모델인지 아닌지를 이해하는 것은 매우 중요합니다. 이 구별은 다양한 영역에서의 응용에 대한 적절한 기대 설정 및 기능을 올바르게 활용하는 데 중요합니다.

다중 모달 모델 이해하기: 다중 모달 모델은 텍스트, 이미지, 오디오, 비디오 등 여러 유형의 데이터를 처리하고 생성하는 AI 시스템입니다. 이러한 모델은 다양한 입력의 종합적인 이해가 필요한 작업을 수행하기 위해 여러 모달리티의 정보를 통합합니다. 특히 엔드 투 엔드 다중 모달 모델은 각 모달리티에 대해 별도의 모델을 사용하지 않고 원시 데이터 입력(예: 음성, 이미지)을 직접 처리하여 출력(예: 텍스트, 생성된 이미지)을 생성합니다.

엔드 투 엔드 모델 이해하기: 머신 러닝에서 "엔드 투 엔드"란 작업을 분리되지 않고 단일하고 일관된 프로세스에서 시작부터 끝까지 수행하는 모델을 가리킵니다. 그러나 GPT-4 옴니는 전달 방식을 사용하여 각각 다른 유형의 데이터 및 작업을 독립적으로 처리하는 전문 컴포넌트를 포함합니다.

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

지켜보면서도 놀라운 발전을 지켜봤어요. 태스크에 특화된 NLP 모델에서부터 BERT와 GPT-3 같은 조기 단계의 사전 훈련된 LLM까지, 마침내 일반적이고 생산적인 ChatGPT로 이어졌습니다. 이러한 모델들은 세상의 지식, 상식적 지식, 심지어 도메인 특정 지식과 추론을 표현하는 데 놀라운 능력을 보여주었답니다. 이러한 발전에도 불구하고 연구자들은 여전히 이러한 신생 능력을 설명할 수 있는 탄탄한 이론을 개발하는 데 어려움을 겪고 있습니다.

텍스트 전용 modalities에서의 종단 간 훈련에 대한 확장 법칙은 어느 정도 이해하기 쉽습니다. 그러나 다중 모달 데이터에 대해 단일 신경망을 최적화하는 종단 간 방식은 정말 놀라운 것이죠. 많은 질문이 떠오르는데요:

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

- 서로 다른 데이터 모달리티를 어떻게 정렬할까요? 각 모달리티(텍스트, 비전, 오디오)는 고유한 특성과 표현 요구사항이 있습니다. 이를 하나의 모델에 정렬하는 것은 복잡한 도전입니다.
- 최적의 학습 매개변수: 각 모달리티가 자체 최적의 학습률, 손실 함수 및 훈련 일정이 필요할까요? 이러한 매개변수를 한 모델에서 균형있게 맞추는 것은 매우 어려울 수 있습니다.
- 계산 리소스: 이러한 모델을 훈련하는 데 얼마나 많은 계산 리소스가 필요할까요? 다중 모달 데이터의 규모와 복잡성은 계산 파워와 시간에 대한 수요를 크게 증가시킵니다.

End-to-End인가 아닌가? 다중 모달 데이터에서 GPT-4o를 훈련하는 것에 대한 탐구 OpenAI의 GPT-4와는 달리 GPT-4 Omni에 대한 포괄적인 기술적 문서가 제공되지 않습니다. 내부 문서가 GPT-4o의 신원을 인식하는 데 도움이 되었을 수 있다고 믿어, 직접 GPT-4o로부터 답을 찾기로 결정했습니다.

![이미지1](/assets/img/2024-05-16-TerrifiedMortifiedPetrifiedIsGPT-4oTrulyanEnd-to-EndMulti-ModalModel_1.png)

![이미지2](/assets/img/2024-05-16-TerrifiedMortifiedPetrifiedIsGPT-4oTrulyanEnd-to-EndMulti-ModalModel_2.png)

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

📝 참고: GPT-4o에서 자체적으로 엔드 투 엔드 훈련을 거부하고 다단계 파이프라인을 주장한 후 질문을 한 것으로, 제 개인적인 편견을 피하기 위해 정확한 정보를 확인하려고 노력했습니다.

# 가능한 다단계 파이프라인은 무엇인가요?

GPT-4o와의 대화를 통해 "모듈식" 및 "분리된" 구성 요소에 대한 세부 정보에 대해 요약했습니다. (이것은 FAKE NEWS일 수도 있습니다)

GPT-4 Omni은 다양한 유형의 입력과 출력을 수용하고 생성할 수 있는 능력을 가지지만, 엔드 투 엔드 구조 대신 모듈식 접근 방식을 따릅니다.

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

모든 비텍스트 입력은 처리되기 전에 먼저 텍스트로 변환되어야 합니다: GPT-4 Omni의 핵심은 GPT-4 언어 모델이며, 이 모델은 텍스트 입력을 처리하고 텍스트 응답을 생성합니다. 이 모델은 방대한 텍스트 데이터 코퍼스에서 훈련되어 제공된 문맥을 기반으로 인간과 유사한 텍스트를 이해하고 생성할 수 있습니다.

다음은 이 작업 흐름의 자세한 내용입니다:

- 음성인식 (음성 입력): GPT-4 Omni는 음성 인식 시스템을 사용하여 말로 된 언어를 텍스트로 변환합니다. 이 시스템은 일반적으로 Google의 Speech-to-Text와 같은 고급 모델을 기반으로 합니다. 음성 인식 구성 요소는 음성 단어를 정확하게 전사하기 위해 오디오 데이터와 해당 텍스트 전사본의 방대한 데이터 세트에서 독립적으로 훈련됩니다.
- 이미지 인식 및 처리: 이미지 입력의 경우 GPT-4 Omni는 외부 이미지 인식 및 처리 시스템에 의존하여 시각 데이터를 언어 모델이 해석할 수 있는 형식으로 변환합니다. 즉, 밀집 벡터(임베딩) 또는 문구 텍스트입니다. 이 두 형식은 모델이 해석할 수 있지만 각각 다른 목적과 영향을 가지고 있습니다. 밀집 벡터 또는 임베딩은 시각 데이터의 숫자 표현입니다. 임베딩은 이미지 분류, 유사성 검색, 특정 유형의 이미지 기반 질문에 대한 답변과 같이 이미지의 추상적인 특징을 이해하고 응답 생성하는 작업에 유용합니다. 이 문구화 과정은 이미지 내용을 자연어 설명으로 번역하여 언어 모델이 직접 해석하고 응답할 수 있도록 합니다. 이 기술은 이미지 내용의 자연어 이해가 필요한 작업에 유용하며, 캡션 생성, 상세한 설명 제공, 이미지의 특정 측면에 대한 질문에 대답하는 등의 작업에 활용됩니다.
- 텍스트 음성 변환: 출력이 발화형태로 전달되어야 할 경우 GPT-4 Omni는 텍스트-음성(TTS) 시스템을 사용합니다. 이 시스템은 생성된 텍스트 응답을 다시 음성으로 변환합니다. TTS 구성 요소는 텍스트와 해당 발화 형태의 쌍으로 훈련되어 자연스러운 발화 합성을 보장합니다.

# 결론

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

GPT-4o의 기술 세부 정보가 공개되길 열심히 기다리고 있습니다. 멀티모달 모델에 대해 전문가가 아니기 때문에 더 알아보기 위해 계획 중입니다. 저와 같이 인간과 비슷한 지능을 모방하려는 연구자들에게 이 정보가 큰 영향을 줄 것으로 믿습니다.
