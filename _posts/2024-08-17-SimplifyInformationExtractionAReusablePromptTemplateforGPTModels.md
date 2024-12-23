---
title: "정보 추출 간소화 GPT 모델용 재사용 가능한 프롬프트 만드는 방법"
description: ""
coverImage: "/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_0.png"
date: 2024-08-17 01:53
ogImage:
  url: /assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_0.png
tag: Tech
originalTitle: "Simplify Information Extraction A Reusable Prompt Template for GPT Models"
link: "https://medium.com/towards-data-science/simplify-information-extraction-a-reusable-prompt-template-for-gpt-models-d6d5f1bd25a0"
isUpdated: true
updatedAt: 1723864278575
---

![image](/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_0.png)

# 소개

만약 나에게 정보 추출 작업을 위한 최적의 프롬프트 템플릿을 만들었다고 말한다면, 항상 원하는 성능을 보장하며 놀라운 검출율과 정밀도로 명확한 출력 형식을 얻을 수 있다고 말한다면, 아마 당신은 비웃을지도 모릅니다.

정당한 이유로말이죠 - LLM의 예측할 수 없는 성격으로 인해 누구도 이러한 체크박스를 보장할 수 없기 때문에. -_녹는 얼굴 이모지_-

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

하지만 여기서 제가 말씀드릴 수 있는 것은: 12가지 이상의 미묘한 의료 정보 추출 작업을 철저히 수행한 결과, 각각이 심층적인 도메인 전문 지식을 필요로 하는 작업이었습니다. 나는 나에게 효과를 발휘한 프롬프팅 기술을 활용한 프롬프트 템플릿을 개발하여 성능을 크게 향상시키고 잘못된 출력을 최소화할 수 있었습니다.

이 템플릿은 내 작업 흐름을 개선하고 반복 주기를 줄이며 결과물에 신뢰할 만한 일관성 수준을 제공하는 데 도움이 되었습니다.

이 글에서는 이 템플릿을 따라가며 각 섹션의 저의 논리를 설명하고, 그 과정에서 배운 교훈을 공유하겠습니다. 나의 희망은 이 통찰력을 얻기 위해 발생한 시행착오가 다른 사람들이 복잡한 텍스트 데이터에서 정확한 정보를 추출하는 유사한 어려움에 직면한 사람들에게 도움이 되는 자원으로 이어질 수 있기를 바라는 것입니다.

말하고 싶은 바를 다시 강조하자면, 이 템플릿은 특히 의료 분야와 같은 전문 분야에서 높은 정확도가 중요한 텍스트 데이터에서 주요 정보를 추출하는 작업을 위해 구체적으로 맞춤화된 것임을 강조하고 싶습니다.

# 프롬프트 기술

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

템플릿을 공유하기 전에 성능 향상에 도움이 된 주요 프롬프팅 기술 몇 가지를 공유하겠습니다:

## 퓨-샷 프롬프팅

원하는 입력-출력 쌍의 몇 가지 예를 모델에 제공하는 것을 의미합니다. 모델에 찾아야 하는 구체적인 부분을 제공하고 원하는 출력 형식의 여러 예제를 함께 제공함으로써, 모델이 현재 작업을 더 잘 이해할 수 있게 됩니다.

## 부정적 프롬프팅

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

정확도 향상에 있어서 제외해야 할 부분을 명시적으로 언급하는 것이 중요했습니다. 본 기술은 관련 없거나 잘못된 정보가 추출되는 가능성을 줄입니다.

## 사고 연쇄 추론 (CoT)

![이미지](/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_1.png)

모델이 추론 프로세스를 단계별로 설명하도록 장려함으로써 성능을 향상시키는 두 가지 방법:

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

- 먼저, 모델의 설명은 부정적 프롬프팅 섹션에서 조정이 필요할 수 있는 세세한 점을 밝혀 줄 수 있습니다.
- 둘째로, CoT는 모델이 각 추출된 인용구를 포함 기준과 제외 기준 양쪽에서 교차 확인할 수 있도록 하여 초기 결과 세트를 필터링하여 보다 정확하고 정밀한 응답을 얻을 수 있게 합니다.

## 역할 프롬핑

![image](/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_2.png)

모델에게 특정 역할이나 페르소나를 할당하면 응답을 이끌어내는 데 도움이 됩니다. 역할 프롬핑이 성능을 향상시키는지에 대한 논란이 있지만, 제 특정 작업에서는 이 기술이 유용하다는 경험을 했습니다. 내 프로젝트 중 많은 프로젝트는 각 추출된 부분이 체크리스트에 맞게 들어가는 복잡한 프로세스를 감독하는 도메인 전문가를 필요로 합니다. 모델이 전문가의 역할을 맡으면 특정 정보를 추출하는 이유에 대한 보다 광범위한 맥락을 얻을 수 있으며, 결과물의 품질을 크게 향상시킬 수 있습니다.

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

자, 이제 프롬프트 템플릿으로 넘어가겠습니다!

# 프롬프트 템플릿 구조

이 재사용 가능한 프롬프트 템플릿은 다섯 가지 주요 부분으로 구성되어 있습니다:

- 작업 요약: 정보 추출 작업에 대한 명확하고 간결한 설명으로, 종종 모델의 응답 맥락을 설정하기 위한 역할 프롬프팅을 포함합니다.
- 추출 기준: 추출해야 할 정보를 구체적으로 명시한 지침입니다. 이 부분은 작업의 범위를 정의하여 모델이 관련 데이터에 집중하도록 보장합니다.
- 예시: 올바른 입력-출력 쌍의 시연입니다. 따온을 추출하는 작업에 대한 경우, 일반적으로 예시 인용과 기대되는 출력 형식의 예시목록을 포함합니다. 모델이 마주할 수 있는 다양한 시나리오를 커버하는 다양한 예시를 포함하려고 노력합니다.
- 제외 기준 / 부정적 예시: 추출해서는 안 되는 정보를 명확히 나열하여 모델이 관련 없거나 잘못된 정보를 추출하는 것을 방지합니다. 이전 시도에서 관찰된 일반적인 실수나 오해에 대해 일반적으로 다루게 됩니다.
- 출력 지침: 추출된 정보가 일관된, 사용 가능한 형식으로 제시되도록 하기 위한 지침입니다. 여기에서 정확한 형식(예: JSON, 리스트)을 명시하고 단계별 / CoT 추론을 요청합니다.

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

## 예시: 정신 건강 대화에서의 약물 추출

요 멘토와 멘티 간 대화로부터 항우울제 사용 및 관련 부작용에 대한 정보를 추출하는 템플릿을 작성하는 것에 관한 구체적인 정보를 추출하는 템플릿을 사용한 예시를 확인해보세요.

<img src="/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_3.png" />

```js
PROMPT_MENTAL_HEALTH_COACHING = """
우울증과 불안을 지원하는 정신 건강 코치로서, 멘티가 현재 항우울제를 복용하고 있는지, 그리고 세션 중 언급한 부작용에 대해 판단하는 것이 여러분의 임무입니다. 멘토와 멘티 간의 대화를 검토하여 항우울제 사용 및 관련된 부작용에 대해 관련 정보를 추출하십시오.

추출 기준:
항우울제 사용: 멘티가 명시적으로 항우울제를 복용했다고 언급한 부분을 식별하십시오. 아래는 찾아야 할 일반적인 항우울제의 비완전한 목록입니다:
  - 선택적 세로토닌 재흡수 억제제 (SSRI):
    - 예: 프루옥세틴(프로자크), 세르트라린(조울트), 시탈로프람(셀렉사)
  - 세로토닌-노르에피네프린 재흡수 억제제 (SNRI):
    - 예: 벤라팍신(에펙서), 둘록세틴(신발타)
  - 삼환 항우울제 (TCA):
    - 예: 아미트립틸린, 노르트립틸린
  - 비전형 항우울제:
    - 예: 부프로피온(웰뷰트린), 미르타자핀(레메론)
  - 단일아민 산화효소 억제제 (MAOI):
    - 예: 페넬진(나디릴), 트랄린시프로민(파르네이트)

- 부작용: 멘티가 자신의 항우울제 복용과 관련된 것으로 여기는 어떤 부작용에 대해 언급한 부분을 식별하십시오.

예시:
1. 입력:
   - "지금은 몇 달째 항우울제를 복용 중인데, 최근에 평소보다 피곤해졌다는 걸 느낀 것 같아요. 또한 잠을 자는 게 여전히 어려운데, 이것들이 약 때문의 부작용인 거 아니냐 걱정이 돼요."
   - 출력:
     {
       "antidepressant_use": "지금은 몇 달째 항우울제를 복용 중인데요.",
       "side_effects": ["피로함을 느낌", "잠을 자는 게 어려움"]
     }

2. 입력:
   - "조울트 복용을 시작한 이후로, 불안이 덜해진 걸 느끼는데, 이전에 없었던 두통이 생겼어요."
   - 출력:
     {
       "antidepressant_use": "조울트 복용을 시작한 이후로.",
       "side_effects": ["두통"]
     }

3. 입력:
   - "항우울제 때문인지는 정확히 모르겠지만, 요즘 어지러운 느낌이 들어요. 특히 아침에 심해지는 것 같아요."
   - 출력:
     {
       "antidepressant_use": "항우울제 때문인지는 정확히 모르겠어요.",
       "side_effects": ["어지러움"]
     }

제외 기준 / 부정적 예시:
- 포함하지 마십시오: 항우울제 사용이나 부작용에 명시적으로 연결되지 않는 복지에 관한 일반 논평(예: "오늘 기분이 좋아요" 또는 "요즘 일이 스트레스 받아서요").
- 목적: 멘티가 약물에 귀속시킨 항우울제 사용 및 구체적인 부작용에만 초점을 맞추기 위함입니다.

출력 지침:
- 형식: 추출된 정보는 JSON 형식으로 제공하십시오.
- 구조: 항우울제 사용 및 부작용을 다음 필드에 포함하십시오: antidepressant_use 및 side_effects.
- 상세한 사유: 산출물에는 항우울제 사용과 부작용과 직접 관련된 인용구만 포함되도록 합니다.
- 예시 형식:
  {
    "antidepressant_use": "[항우울제 사용에 관한 추출된 언급]",
    "side_effects": [
      "[부작용 1에 관한 추출된 언급]",
      "[부작용 2에 관한 추출된 언급]",
      ...
    ]
  }

대화 내용: {transcript}
"""
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

# 반복 개선 프로세스

효과적인 프롬프트 템플릿을 만드는 것은 계속해서 개선이 필요한 반복적인 과정입니다. 템플릿의 초기 버전을 개발한 후에는 원하는 성능을 만족시키기 위해 다음 단계를 따릅니다:

- 기본 프롬프트로 시작: 예시나 제외 기준을 포함하지 않고 간단한 프롬프트로 시작합니다.
- 출력 분석: 모델의 출력을 검토하여 오류, 일관성 부족 또는 추출이 부족한 영역을 식별합니다.
- 예시 추가: 올바른 추출을 위해 관련 예시를 추가하여 모델을 안내합니다.
- 제외 기준 도입: 모델이 관련없거나 잘못된 정보를 추출하지 못하도록 명확한 제외 기준을 정의합니다.
- 사고 과정 추리 적용: 정확성과 투명성을 향상시키기 위해 사고 과정 추리를 구현합니다.
- 반복 및 섬세한 조정: 모델의 성능과 오류의 패턴에 따라 각 섹션을 조정하여 단계 2에서 5까지 계속 반복합니다.

예를 들어, 위 시나리오에서 모델이 다른 약물에 대한 정보를 추출하기 시작하는 것을 발견하면 — 즉, Xanax와 같은 진정제나 Lithium과 같은 분위기 조절제에 대한 세부 정보를 잘못 추출하는 경우 — 이러한 흔히 혼란스러운 약물을 명시적으로 나열하여 제외 기준을 수정합니다. 이렇게 하면 모델이 항우울제와 그와 관련된 부작용에만 집중하도록 보장하여 추출 프로세스를 더 정확하고 관련성 높게 개선할 수 있습니다.

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

![Image](/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_4.png)

## 한계와 Best Practices

- 프롬프트 길이: 극단적으로 긴 프롬프트는 모델의 컨텍스트 창을 초과할 수 있습니다. 중요하지 않은 섹션을 식별하고 제거하여 프롬프트 길이를 줄이면서(따라서 비용도 줄이면서) 모델이 가장 관련성 높은 정보에 집중할 수 있는 성공을 거두었습니다.
- 모델별 최적화: 다양한 모델들은 특정 프롬핑 스타일에 더 효과적으로 반응할 수 있습니다. 이 프롬프트는 특히 GPT-3.5 Turbo, GPT-4 및 GPT-4 Turbo에서 효과적이었습니다.
- 작업 복잡성: 매우 복잡한 작업의 경우 관리 가능한 하위 작업으로 분리하거나 명확성과 성능을 향상시키기 위해 다단계 접근을 채택해 보세요.
- 견고성 테스트: 다양한 입력 범위에서 템플릿을 평가하여 신뢰성과 적응성을 확인하세요.

## 결론

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

만약 여기까지 오신 것을 축하드립니다! 아마도 이 프롬프트 템플릿이 정보 추출 작업을 간편화하는 약속을 정말 지킬 수 있는지 궁금해하고 계실 것입니다. 사실, 이 템플릿이 여러분의 작업에 어떻게 작용할지에 대해서는 전혀 모르겠습니다. 하지만 이 템플릿은 적어도 열두 번 이상의 의료 정보 추출 작업에서 조합되어 왔고, 의료 시나리오에서 높은 정밀도가 중요한 환경에서 전투를 거쳐 왔으며, 제 작업 흐름에서 핵심이 되어, 항상 신뢰할 수 있는 결과를 제공해 왔습니다.

![이미지](/assets/img/2024-08-17-SimplifyInformationExtractionAReusablePromptTemplateforGPTModels_5.png)

복잡한 정보 추출 작업이 있는 다른 분들을 위해, 이 템플릿과 작업 흐름이 가치 있는 시작점으로 작용하기를 바랍니다. 이 템플릿이 일종의 맞춤형 해결책이 아니라, 여러분의 작업 독특한 요구를 충족하기 위해 더불어 건설할 수 있는 전략의 기초가 될 것입니다. 사용해 보시고 어떻게 작용하는지 저에게 알려주세요. 추가로, 여러분에게 유용했던 프롬프트 기술에 대한 생각을 듣고 싶습니다! 이쪽에 댓글을 남기거나 christabellepabalan@gmail.com 으로 이메일을 보내주세요.
