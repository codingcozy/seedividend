---
title: "규모 확장 가능한 개인 정보 보호 GenAI GPU 없이 텍스트 익명화하여 1100의 비용으로"
description: ""
coverImage: "/assets/img/2024-05-15-PrivacyPreservingGenAIatScaleAnonymizeYourTextwithoutGPUsforahundredththecost_0.png"
date: 2024-05-15 16:45
ogImage: 
  url: /assets/img/2024-05-15-PrivacyPreservingGenAIatScaleAnonymizeYourTextwithoutGPUsforahundredththecost_0.png
tag: Tech
originalTitle: "Privacy Preserving GenAI at Scale: Anonymize Your Text without GPUs for a hundredth the cost."
link: "https://medium.com/thirdai-blog/privacy-preserving-genai-at-scale-anonymize-your-text-without-gpus-for-a-hundredth-the-cost-81d643a9d5fb"
---


기업 엔지니어링 팀들은 대량의 비정형 텍스트를 처리하기 위해 OpenAI 및 다른 생성 AI 서비스의 파워를 활용하여 생산성을 크게 향상시키고 있습니다. 그들은 고객, 직원, 및 하위 비즈니스를 위한 생산성 도구를 만들고 평가하고 있습니다. 비즈니스 중요 텍스트를 활용하는 프로덕션급 도구들은 엄격한 데이터 준수 가이드라인이 필요합니다. 대부분의 기업은 고객에게 표시할 수 있는 텍스트 유형 및 OpenAI GPT-4와 같은 제3자 AI API 서비스로 보낼 수 있는 텍스트 유형에 대한 준수 정책을 가지고 있습니다.

![그림](/assets/img/2024-05-15-PrivacyPreservingGenAIatScaleAnonymizeYourTextwithoutGPUsforahundredththecost_0.png)

![그림](/assets/img/2024-05-15-PrivacyPreservingGenAIatScaleAnonymizeYourTextwithoutGPUsforahundredththecost_1.png)

## 원시 비정형 텍스트 청크의 프라이버시 보호 필요성이 커지고 있습니다.



사용자에게 보여지거나 안전한 환경을 벗어난 텍스트에는 SSN, 신용 카드 번호 또는 이메일 등의 PII(개인 식별 정보)가 포함되지 않도록 해야 합니다. 예를 들어 외부 API와 같은 임베딩 서비스나 GPT-4 프롬프팅을 사용하기 전에는 안전한 환경을 벗어나는 텍스트에서 PII를 삭제하여 규정을 준수해야 합니다.

## 기존 솔루션: 높은 GPU 사용량과 증가된 대기 시간

Named Entity Recognition (NER)은 텍스트 분석에서 잘 알려진 문제이며, Hugging Face와 같은 회사에서 제공하는 것처럼 이를 해결하기 위한 여러 오픈 소스 모델이 있습니다. 그러나 이러한 모델을 확장하려면 상당한 GPU 자원이 필요합니다. 예를 들어, BERT와 같은 기본 모델은 리소스 소모가 많으며, 세부 조정을 위해 4대의 V100 GPU에서 몇 시간이 필요합니다(표 1 참조). 또한 배포 중에 느려지는 경우가 있어, 애플리케이션 응답 시간이 약 50배 이상 소요될 수 있습니다(그림 1 참조). 반면, spaCy와 같은 저렴한 대안은 리소스 소비가 적지만, 더 정교한 모델의 93%에 미치지 못하는 65%의 정확도를 제공합니다. 성능 차이는 NER 솔루션을 배포할 때 계산 요구 사항과 정확도 사이의 교환이 강조됩니다.

## ThirdAI의 CPU 전용 NER 모델: 신속한 세부 조정, 초고속 대기 시간, SOTA 정확도. GPU 사이클을 해방하세요.



저희는 NER을 위해 특별히 제작된 사전 훈련된 기본 모델을 자랑스럽게 소개합니다. 최신 기술의 정확성을 제공하며 BERT나 DistillBERT보다 30~50배 빠른 레이턴시로 작동합니다. 놀랍게도 최대 1,000개의 토큰에서도 우리 모델은 단일 CPU 코어에서 1,000개의 라벨 예측에 대해 약 50ms의 레이턴시를 유지합니다. (비교 자료는 도표 1과 테이블 1을 참고하세요)

저렴한 CPU 전용 인스턴스에서 세밀한 조정 가능: 저희 모델은 수백만 개의 라벨이 지정된 샘플을 몇 분 내에 저렴하고 쉽게 구할 수 있는 CPU 전용 인스턴스에서 세밀하게 조정할 수 있습니다. 추론 및 세밀 조정 중에 다양한 프로세서 간에 일관된 성능을 유지합니다.

저희 기술을 활용하고자 하는 개발자들을 위해 사전 훈련된 NER 모델을 배포하는 간단한 스크립트를 제공해드립니다. 이 모델은 여러 언어에서 표준 NER 범주를 식별할 수 있는 능력이 있습니다. 언어 및 지원되는 범주에 대한 자세한 내용은 안내에서 확인할 수 있습니다. 특화된 다국어 데이터셋에 대해 세밀한 조정을 원하시는 경우에는 다음 대체 스크립트를 사용하십시오.

## 순서 개선된 총소유비용(TCO)



Table 1은 세밀 조정 비용을 요약하며 Figure 1의 차이는 배치 비용으로 직접 변환됩니다. ThirdAI의 기술적 차이로 인해 전용 GPU 리소스 제약 조건을 없애고 비용을 100배 절감할 수 있습니다. ThirdAI를 사용하여 언제 어디서나 손쉽게 데이터를 사적으로 보호하세요.

## 중요한 링크

모든 파이썬 노트북 및 지침서 링크: https://github.com/ThirdAILabs/Demos/tree/main/named_entity_recognition