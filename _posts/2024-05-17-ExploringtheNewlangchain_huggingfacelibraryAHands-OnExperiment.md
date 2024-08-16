---
title: "새로운 langchain_huggingface 라이브러리 만들면서 배우기"
description: ""
coverImage: "/assets/img/2024-05-17-ExploringtheNewlangchain_huggingfacelibraryAHands-OnExperiment_0.png"
date: 2024-05-17 20:46
ogImage: 
  url: /assets/img/2024-05-17-ExploringtheNewlangchain_huggingfacelibraryAHands-OnExperiment_0.png
tag: Tech
originalTitle: "Exploring the New langchain_huggingface library: A Hands-On Experiment"
link: "https://medium.com/@shreyasshinde/exploring-the-new-langchain-huggingface-library-a-hands-on-experiment-45e5163cb8f8"
isUpdated: true
---




<img src="/assets/img/2024-05-17-ExploringtheNewlangchain_huggingfacelibraryAHands-OnExperiment_0.png" />

# 배경

최근에 Langchain과 HuggingFace가 함께 새로운 파트너 패키지를 발표했습니다. Langchain은 이미 커뮤니티에서 유지보수되는 HuggingFace 패키지를 보유하고 있었지만, 이 새로운 버전은 HuggingFace가 Langchain의 파트너로 공식 지원하는 것입니다! Langchain은 다양한 LLM과 상호 작용하기 위한 공통 인터페이스를 제공하며, HuggingFace는 오픈 소스 모델을 포함한 호스팅된 LLM에 대한 추론 엔드포인트를 제공합니다.

이 블로그에서는 HuggingFace의 오픈 소스 모델의 추론을 이 새로운 Langchain 라이브러리로 사용하는 내 경험을 공유하겠습니다.

<div class="content-ad"></div>

# TL;DR

직접 시도해 보고 싶다면, 아래 저장소를 클론해보세요:

# 실험

## HuggingFace를 통한 추론 옵션

<div class="content-ad"></div>

HuggingFace에서 추론을 수행하는 세 가지 방법이 제공됩니다:

- UI를 통해 직접: 각 모델에 대한 채팅 위젯이 제공됩니다. Meta의 LLAMA 모델과 같은 목록에서 모델을 선택할 수 있습니다.
- (무료) 추론 API (서버리스): 이 옵션은 최소한의 테스트에 적합합니다. HuggingFace의 공유 인프라를 사용하므로 요율 제한이 적용됩니다. API 키로 계정 설정에서 액세스 토큰을 사용합니다. 이 옵션을 사용하여 Langchain 라이브러리를 시도해 볼 것입니다.
- (유료) 추론 엔드포인트 (전용 API): 제품 사용에 적합하지만, 이번 실험에서는 배포하고 이 옵션을 사용하지 않을 것입니다.

## Langchain_HuggingFace 라이브러리

이 라이브러리는 HuggingFace LLMs와 상호 작용하기 위해 두 가지 클래스를 노출합니다: HuggingFacePipeline 및 HuggingFaceEndpoint.

<div class="content-ad"></div>

우리는 원격 추론을 가능하게 하는 HuggingFaceEndpoint를 사용하는 것에 관심이 있습니다. 이 클래스의 내부에서는 InferenceClient를 사용합니다. 특정 모델의 경우, 해당 모델의 HuggingFace 페이지(예: Meta의 LLAMA)에서 해당 모델의 약관에 동의해야 사용할 수 있습니다. HuggingFacePipeline은 모델을 로컬로 다운로드해야 하기 때문에 특정 이유가 없는 이상 이상적이지 않습니다.

HuggingFaceEndpoint 클래스를 인스턴스화한 후, 몇 가지 langchain.schema 메시지를 정의합니다. 이 라이브러리에서 또 한 가지 중요한 클래스는 ChatHuggingFace 클래스인데, 이는 특정 모델에 따라 특별 토큰으로 프롬프트를 향상시킵니다. 또한 사용된 토큰과 같은 모델 메타데이터를 응답에 추가하여 Langchain이 약속한 응답의 일관성을 보장합니다.

이 실험을 위해 작성한 코드를 확인해보세요!

## 전반적인 인상

<div class="content-ad"></div>

라이브러리는 작업 중인 것 같아서 전반적인 경험은 원활하지 않았어요. 여기 몇 가지 구체적인 문제가 있었어요:

- 오래된 독스트링: IDE의 클래스 독스트링이 최신으로 업데이트되지 않았어요.

![2024-05-17-ExploringtheNewlangchain_huggingfacelibraryAHands-OnExperiment_1.png](/assets/img/2024-05-17-ExploringtheNewlangchain_huggingfacelibraryAHands-OnExperiment_1.png)

2. 불완전한 문서화: Langchain의 문서가 최신으로 업데이트되지 않아서 아마도 Langchain v0.2에서 업데이트 예정일 것 같아요. 그들의 공지를 따라서 사용하면 분명히 작동하지 않을 거에요.

<div class="content-ad"></div>

3. 비기능적 매개변수: 몇 가지 매개변수는 모델 응답에 영향을 미치지 않거나 오류를 발생시킵니다.

```js
llm = HuggingFaceEndpoint(
    repo_id=LLAMA_INSTRUCT,  # endpoint_url을 사용하는 경우 model_id도 제공해야 함. ChatHuggingFace에서 model_id는 repo_id만큼 영향을 미침
    task="text-generation",
    streaming=True,
    max_new_tokens=1024,  # 출력 길이에 영향을 주는 것 같지 않음
    model="",  # 이 필드는 필수이지만 출력에는 영향을 미치지 않음, repo_id만 영향 있음
    client=None,
    async_client=None,
    return_full_text=True,
    repetition_penalty=1.1,
    cache=False,
    do_sample=False,
)
```

# 결론 및 가능한 향후 작업

그들의 발표는 다음과 같이 마무리되었습니다:

<div class="content-ad"></div>

이 실험이 가치 있는 피드백으로 작용하기를 희망하며, Langchain 저장소에 이슈를 만들 계획입니다. 이 실험을 통해 HuggingFace의 무료 OSS LLM 추론 및 그 Langchain 통합 라이브러리 상태에 대해 더 나은 이해를 얻을 수 있었습니다.

향후 실험에서는 이 예시를 따라 에이전트를 만들고자 합니다. 제 다음 블로그 포스트를 기대해 주세요!