---
title: "Hugging Face 시작을 위한 종합 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_0.png"
date: 2024-07-09 21:02
ogImage:
  url: /assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_0.png
tag: Tech
originalTitle: "A Comprehensive Guide for Getting Started with Hugging Face"
link: "https://medium.com/towards-artificial-intelligence/a-comprehensive-guide-for-getting-started-with-huggingface-94aeea38692f"
---

![Hugging Face](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_0.png)

대규모 언어 모델들의 급격한 발전으로 다양한 작업을 해결하기 위해 적용되는 경우가 많아졌으며, Hugging Face에 대한 지식은 반드시 알아둬야 할 필수요소가 되었습니다.

왜 Hugging Face를 사용해야 할까요? Hugging Face는 다양한 오픈 소스 모델에 대한 접근성을 제공하는 데 중요한 역할을 합니다. 이 플랫폼 덕분에 데이터 과학자, 개발자 및 연구자들은 최신 모델을 쉽게 탐색하고 활용할 수 있습니다.

본문에서는 Hugging Face의 잠재력, 이를 활용하는 방법 및 가능한 사용 사례에 대해 설명하겠습니다. 시작해봅시다!

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

목차:

- Hugging Face란 무엇인가요?
- Hugging Face의 기본 구성 요소
- Open LLM Leaderboard란 무엇인가요?
- Hugging Face에 접근하는 방법
- Hugging Face로 놀기 시작하기
- Transformers 라이브러리 활용하기

## Hugging Face란 무엇인가요?

<img src="/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_1.png" />

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

허깅페이스는 다양한 작업을 위한 사전 훈련 모델에 민주적인 접근을 제공하는 허브입니다. 번역, 요약, 질의응답, 객체 감지, 이미지 분할 등 다양한 작업에 사용됩니다. 사용자들이 오픈 소스 모델에 기여할 것을 장려합니다.

이 중심화된 저장소의 매력은 허깅페이스 트랜스포머(Hugging Face Transformers)로, 모델을 쉽게 다운로드하고 불러오며 미세 조정할 수 있는 매우 인기 있는 파이썬 라이브러리입니다.

모델뿐만 아니라 데이터셋과 기계 학습 데모인 허깅페이스 스페이스(Hugging Face Spaces)도 호스팅합니다.

## 허깅페이스의 기본 구성요소

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

허깅페이스에는 모델, 데이터셋 및 스페이스 세 가지 주요 구성 요소가 있어요.

![image](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_2.png)

모델 페이지에 들어가보면 수많은 오픈소스 모델로 인해 압도될 수 있지만 걱정 마세요. 먼저 해결하고자 하는 작업을 식별한 후 해당 작업으로 필터링하는 것이 권장됩니다. 작업을 선택한 후에는 인기도와 다운로드 횟수 같은 다양한 기준에 따라 모델을 정렬할 수 있어요.

![image](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_3.png)

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

모델과 마찬가지로, 다양한 종류의 데이터셋이 있어서 다양한 작업에 활용할 수 있습니다. 이전과 마찬가지로 최종 목표에 따라 작업별로 필터링하고 결과를 정렬하는 것이 중요합니다.

![이미지](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_4.png)

마지막으로, Hugging Face 스페이스라는 기계 학습 데모를 빠르게 살펴볼 수 있습니다. Hugging Face 스페이스에서는 Streamlit, Gradio, 그리고 FastAPI를 기반으로 한 대화형 애플리케이션을 통해 모델을 실행할 수 있습니다. 다시 말해, Hugging Face 스페이스를 통해 직관적인 인터페이스를 통해 간접적으로 모델과 상호 작용할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_5.png)

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

위에는 입력 텍스트로부터 이미지를 생성하는 전문 공간 예시가 있습니다. 이 데모인 PixArt-Sigma는 4K 해상도에서 이미지를 생성할 수 있는 PixArt-Sigma 1024px 확산 변환 모델을 활용합니다.

## 오픈 LLM 리더보드란?

![image](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_6.png)

Hugging Face의 또 다른 중요한 기여는 오픈 LLM 리더보드입니다. 이는 오픈 소스 LLMs와 챗봇을 추적하고 평가할 수 있는 머신 러닝 데모 또는 Hugging Face 공간입니다.

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

모델 페이지와 마찬가지로 사용 가능한 모델이 너무 많습니다. 과업을 해결하기 위해 필요한 모델 유형을 식별한 후 이를 기반으로 결과를 필터링하는 것이 좋습니다.

![이미지](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_7.png)

예를 들어, 처음부터 훈련된 모델만 추적하길 원한다고 가정해 봅시다. 이 경우 "사전 훈련된 모델"을 선택하여 필터링해야 합니다.

필터를 수정하면 리더보드 상단의 모델 대부분이 Meta 및 Databricks와 같은 대규모 기술 회사에서 나온 것을 알 수 있을 것입니다. 이것은 모든 회사가 이러한 대규모 모델을 훈련시키기에 컴퓨팅 능력을 갖추지 못한 이유입니다.

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

## Hugging Face에 접속하는 방법

![hugging-face-image](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_8.png)

노트북에서 Hugging Face의 모델과 데이터셋에 액세스하려면 먼저 Hugging Face API 키가 필요합니다. 계정이 아직 없다면 만들어야 합니다. 계정이 생성되면 Settings`Access Tokens`을 클릭하고 "New token" 버튼을 누릅니다.

![hugging-face-image](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_9.png)

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

토큰의 이름인 HF_TOKEN과 해당 토큰의 유형을 결정하세요. 이 유형은 read 또는 write 중 하나로 선택할 수 있습니다. 모델을 다운로드하거나 모델에서 추론을 실행하는 경우 read를 선택하면 가장 일반적인 선택지입니다. 모델을 훈련시키려면 write를 선택하는 것이 좋습니다.

![이미지](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_10.png)

그걸로 끝입니다! 우리는 Hugging Face에서 첫 번째 액세스 토큰을 생성했습니다. 액세스 토큰에 대해 더 깊이 알아보고 싶다면, Hugging Face 문서를 살펴보세요.

## Hugging Face와 놀기 시작

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

<img src="https://miro.medium.com/v2/resize:fit:1400/1*2AywAoMAEN5v8VG8wIFU7Q.gif" />

Hugging Face의 개념이 명확해지면, 이제는 자습서의 실제 부분으로 넘어가는 시간입니다. 영어에서 이탈리아어로 텍스트를 번역하는 모델을 찾고 싶다고 가정해 봅시다. 다음은 다음과 같은 단계입니다:

- 모델 페이지로 이동
- 번역을 작업으로 선택
- 이탈리아어를 언어로 선택

우리는 트렌딩 순으로 정렬된 첫 번째 결과 중에서 나타나는 모델 NLLB-200을 선택하기로 결정했습니다. 모델의 웹 페이지에는 프로젝트 목적에 따라 유용할 수 있는 다양한 버튼도 포함되어 있습니다.

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

![이미지](/TIL/assets/img/2024-07-09-AComprehensiveGuideforGettingStartedwithHuggingFace_11.png)

이 경우에는 모델을 로드하는 코드 라인을 얻기 위해 "Transformers에서 사용" 버튼을 클릭하면 됩니다.

## Transformers 라이브러리 활용

실험을 진행할 경우, Google Colab을 사용하는 것을 추천드립니다. Google Colab은 코드를 웹 브라우저에서 실행하며 CPU 또는 GPU 리소스에 액세스할 수 있는 클라우드 기반 플랫폼입니다.

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

또한, 이 환경은 이전에 얻은 허깅페이스의 액세스 키와 같은 환경 변수를 간단히 가져오는 것을 가능하게 합니다.

구글 코랩을 열고, Secrets로 이동하여 “새로운 비밀”을 클릭하고 허깅페이스 액세스 토큰의 이름과 값을 복사하면 됩니다. 또한, 노트북 액세스를 토글하는 것을 잊지 마세요!

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*Td3lFpVFua1VnP8vsogu3g.gif)

설치해야 할 라이브러리가 있습니다:

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

```js
pip install transformers
```

이 Python 라이브러리를 시작하려면 파이프라인()을 사용하여 추론, 모델 로드, 및 학습을 하는 것이 좋습니다. 이 경우에는 모델 NLLB-200을 로드하려고 합니다.

간단히 "Transformers에서 사용하기" 버튼에서 찾은 코드를 복사하면 됩니다. 아래는 약간의 수정이 필요한 코드입니다:

```js
from transformers import pipeline
import torch

translator = pipeline(task="translation",
                      model="facebook/nllb-200-distilled-600M",
                      torch_dtype=torch.bfloat16
                      )
```

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

pipeline()은 번역 작업용 모델 NLLB-200을 다운로드하고 캐시합니다. 이러한 매개변수들 외에도, 모델을 압축하는 데 성능이 감소하지 않는 torch의 유형을 지정합니다.

이제 이를 사용하여 텍스트를 번역할 수 있습니다:

```js
text = """
ChatGPT 개발자 OpenAI는 단 한 번의 짧은 오디오 샘플만 있으면 인간의 목소리를 재현할 수 있는 새로운 도구를 소개했다.\
이 도구는 고도의 정확도로 음성을 복제하려는 기술 회사들이 개발한 여러 도구 중 하나이다.\
시스템의 이름은 Voice Engine입니다. OpenAI는 3월 29일 Voice Engine에 관한 세부 정보를 공개했다.\
"""

text_translated = translator(text,
                             src_lang="eng_Latn",
                             tgt_lang="ita_Latn")

print(text_translated[0]['translation_text'])
```

이것이 출력 내용입니다:

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

```js
OpenAI의 ChatGPT 개발자가 새로운 도구를 소개했어요!
그 도구는 짧은 음성 샘플을 사용하여 인간의 목소리를 재현할 수 있다고 해요.
이 도구는 음성을 높은 정확도로 복제하기 위해 기술 기업들이 개발한 여러 도구 중 하나에요.
이 시스템의 이름은 Voice Engine이에요. OpenAI는 3월 29일 Voice Engine에 대한 세부 정보를 공개했어요.
```

좋아요! 우리가 과제를 해결했네요. 쉬웠죠?

## 최종 생각

이것은 Hugging Face를 시작하는 데 도움이 되는 입문 가이드였어요. Transformers는 상위 모델, 특히 NLP 모델에 쉽게 액세스할 수 있게 해주는 파이썬 라이브러리에요.

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

이 플랫폼과 파이썬 라이브러리에 대해 더 깊이 파고들고 싶다면, 아래에서 제안하는 리소스를 살펴보세요.

이 글이 유용하게 느껴졌으면 좋겠어요. 즐거운 하루 보내세요!

유용한 리소스:

- Hugging Face 문서
- Hugging Face 무료 강좌
- Hugging Face와 함께하는 오픈소스 모델 강좌
