---
title: "RWKV-6 주목할 필요 없이 최신 기술을 활용한 7B LLM"
description: ""
coverImage: "/assets/img/2024-05-16-RWKV-6Attention-freeandState-of-the-art7BLLM_0.png"
date: 2024-05-16 17:38
ogImage: 
  url: /assets/img/2024-05-16-RWKV-6Attention-freeandState-of-the-art7BLLM_0.png
tag: Tech
originalTitle: "RWKV-6: Attention-free and State-of-the-art 7B LLM"
link: "https://medium.com/@bnjmn_marie/rwkv-6-attention-free-and-state-of-the-art-7b-llm-320720df3c8c"
isUpdated: true
---




RWKV 신경 구조는 주의를 사용하지 않습니다. 이는 시퀀스 길이에 대해 제곱으로 증가하는 어텐션 계산 비용을 갖는 트랜스포머 아키텍처보다 추론에서 훨씬 더 효율적입니다. 이 글에서 RWKV를 설명하고 사용하는 방법을 보여드렸어요:

RWKV를 개발한 팀은 주기적으로 아키텍처를 개선하고 새로운 모델을 출시합니다. 현재 RWKV의 여섯 번째 버전이 출시되었으며 Hugging Face Hub에서 7B RWKV-6이 공개되었습니다:

- BlinkDL/rwkv-6-world (Apache 2.0 라이선스)

이 모델은 100개 이상의 언어를 지원하며 2.5T 토큰에 대해 사전 훈련되었습니다. 이 사이즈의 LLM 중 비영어권 언어에 대해 최고의 성능을 보여준다고 하네요. 저희 자체 평가에 따르면요:

<div class="content-ad"></div>

![2024-05-16-RWKV-6Attention-freeandState-of-the-art7BLLM_0.png](/assets/img/2024-05-16-RWKV-6Attention-freeandState-of-the-art7BLLM_0.png)

Llama 3 8B보다 더 좋아 보입니다. 또한 RWKV-5보다 현저히 더 좋습니다. 그러나 영어 작업에 대해서는 Mistral 7B와 Llama 3 8B 대부분의 벤치마크에서 성과가 낮습니다. 아마도 아키텍처 때문이 아니라 단순히 영어 토큰을 훨씬 적게 학습했기 때문일 것입니다.

제 작업을 지원하려면 AI의 최근 발전에 대한 더 많은 기사/튜토리얼을 제공하는 뉴스레터를 구독해 주시기 바랍니다.