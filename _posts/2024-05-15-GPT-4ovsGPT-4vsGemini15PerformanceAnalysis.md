---
title: "GPT-4 대 GPT-4 대 Gemini 15   성능 분석"
description: ""
coverImage: "/assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_0.png"
date: 2024-05-15 11:37
ogImage: 
  url: /assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_0.png
tag: Tech
originalTitle: "GPT-4o vs. GPT-4 vs. Gemini 1.5 ⭐ — Performance Analysis"
link: "https://medium.com/@lars.chr.wiik/gpt-4o-vs-gpt-4-vs-gemini-1-5-performance-analysis-6bd207a2c580"
isUpdated: true
---




## 오픈에이아이(OpenAI)의 새로운 프래그십 모델의 영어 언어 이해 능력 측정

![이미지](/assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_0.png)

오픈에이아이의 GPT-4o 최근 공개로 인공지능 언어 모델과 그들과의 상호작용에 새로운 시대가 열렸습니다.

가장 인상적인 부분은 대화 중단과 함께 ChatGPT와의 실시간 상호작용을 지원하는 것이었습니다.



실시간 데모 중 일부 키크는 사건이 있었지만, 팀이 이룬 성과에 놀랍지 않을 수가 없어요.

더 좋은 소식은, 데모 직후 OpenAI가 GPT-4o API에 접속 권한을 부여했어요.

본 기사에서는, 제가 만든 영어 데이터셋을 사용해 GPT-4o 대 GPT-4 대 Google의 Gemini 및 Unicorn 모델의 분류 능력을 측정한 독립적인 분석을 제시할 거에요.

이 모델 중 어떤 것이 영어 이해력에서 가장 강한지 알아볼까요?



![image](/assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_1.png)

# GPT-4o에 대한 새로운 소식

제일 먼저 소개하는 것은 OmnI 모델 개념으로, 텍스트, 오디오, 비디오를 매끄럽게 이해하고 처리하도록 설계되었습니다.

OpenAI의 초점은 GPT-4 수준의 지능을 대중들에게 민주화 하는 방향으로 바뀌어, GPT-4 수준의 언어 모델 지능을 무료 사용자에게도 접근 가능하게 만드는 것을 중심으로 이루어지는 것으로 보입니다.



OpenAI가 GPT-4o에 향상된 품질과 속도로 50개 이상의 언어에 대해 더 포괄적이고 전 세계적으로 접근 가능한 AI 경험을 제공한다고 발표했습니다. 더 저렴한 가격으로!

그들은 또한 유료 구독자들이 비유료 사용자들과 비교하여 5배 용량을 제공받게 될 것이라고 언급했습니다.

게다가 대중을 위해 오디오, 비전, 텍스트 인터페이스를 통해 실시간 추론을 용이하게 하는 ChatGPT의 데스크톱 버전을 출시할 예정입니다.

# GPT-4o API 사용 방법



새로운 GPT-4o 모델은 OpenAI의 기존 채팅 완성 API를 따르며, 역호환성을 유지하고 사용하기 간단합니다.

```js
from openai import AsyncOpenAI


OPENAI_API_KEY = "<your-api-key>"


def openai_chat_resolve(response: dict, strip_tokens = None) -> str:
    if strip_tokens is None:
        strip_tokens = []
    if response and response.choices and len(response.choices) > 0:
        content = response.choices[0].message.content.strip()
        if content is not None or content != '':
            if strip_tokens:
                for token in strip_tokens:
                    content = content.replace(token, '')
            return content
    raise Exception(f'응답을 해결할 수 없습니다: {response}')


async def openai_chat_request(prompt: str, model_nane: str, temperature=0.0):
    message = {'role': 'user', 'content': prompt}
    client = AsyncOpenAI(api_key=OPENAI_API_KEY)
    return await client.chat.completions.create(
        model=model_nane,
        messages=[message],
        temperature=temperature,
    )


openai_chat_request(prompt="안녕하세요!", model_nane="gpt-4o-2024–05–13")
```

GPT-4o는 ChatGPT 인터페이스를 통해도 이용 가능합니다:

<img src="/assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_2.png" />



# 공식 평가

OpenAI의 블로그 게시물에는 MMLU 및 HumanEval과 같은 알려진 데이터셋의 평가 점수가 포함되어 있습니다.

![그래프](/assets/img/2024-05-15-GPT-4ovsGPT-4vsGemini15PerformanceAnalysis_3.png)

그래프에서 확인할 수 있듯이, GPT-4o의 성능은 이 분야에서 최첨단으로 분류될 수 있으며 — 새로운 모델이 더 저렴하고 빠르다는 것을 고려하면 매우 유망하게 들립니다.



지난 해 동안 여러 모델들을 보았는데, State-of-the-art 언어 성능을 주장하는 모델들이 많았어요. 하지만 실제로는 이러한 모델들 중 일부가 이러한 공개 데이터셋에서 부분적으로 학습되었거나 (또는 오버핏팅)하여 리더보드에서 현실적이지 않은 점수를 보여주기도 했어요.

그러므로, 이러한 모델들의 성능을 독립적으로 분석하고, 제가 만든 데이터셋과 같은 잘 알려지지 않은 데이터셋을 사용하여 성능을 평가하는 것이 중요합니다 😄

# 제 평가 데이터셋 🔢

이전 글에서 설명했듯이, 저는 다양한 LLMs를 통해 분류 성능을 측정할 수 있는 토픽 데이터셋을 만들었어요.



데이터셋은 50가지 주제로 분류된 200개의 문장으로 구성되어 있습니다. 일부는 분류 작업을 더 어렵게 만들기 위해 밀접하게 관련되어 있습니다.

전체 데이터셋은 저가 수작업으로 영어로 작성하고 레이블을 지정했습니다.

그런 다음 GPT4 (gpt-4-0613)를 사용하여 데이터셋을 여러 언어로 번역했습니다.

그러나 이 평가 중에는 데이터셋의 영어 버전만 평가할 것이며, 데이터셋 생성과 주제 예측에 동일한 언어 모델을 사용함으로 인해 발생할 수 있는 잠재적인 편향으로 인해 결과에 영향을 미치지 않아야 합니다.



지금 당장 데이터셋을 확인해보세요: 주제 데이터셋.

# 성능 결과 📊

다음 모델들을 평가하기로 결정했어요:

- GPT-4o: gpt-4o-2024–05–13
- GPT-4: gpt-4–0613
- GPT-4-Turbo: gpt-4-turbo-2024–04–09
- Gemini 1.5 Pro: gemini-1.5-pro-preview-0409
- Gemini 1.0: gemini-1.0-pro-002
- Palm 2 Unicorn: text-unicorn@001



언어 모델에 주어진 작업은 데이터셋의 각 문장을 올바른 주제와 일치시키는 것입니다. 이를 통해 각 언어와 각 모델의 정확도 점수 및 오류율을 계산할 수 있습니다.

대부분의 모델이 올바르게 분류되기 때문에 각 모델의 오류율을 그래프로 플로팅하고 있습니다.

낮은 오류율은 더 나은 모델 성능을 나타냅니다.

그래프에서 볼 수 있듯이, GPT-4o는 모든 모델 중에서 가장 낮은 오류율을 보여 2개의 실수만 발생했습니다.



GPT-4, Gemini 1.5, and Palm 2 Unicorn는 GPT-4o보다 한 가지 더 실수가 있었음을 알 수도 있습니다. 이들은 강력한 성능을 보여주고 있습니다. 흥미로운 점은 GPT-4 Turbo가 GPT-4-0613보다 약간 성능이 떨어진다는 것인데, 이는 OpenAI가 모델 페이지에 작성한 내용과는 다른 결과입니다.

마지막으로, Gemini 1.0은 가격대를 고려하면 예상대로 다소 뒤처지고 있습니다.

# 결론 💡

이 독특한 영어 데이터셋을 활용한 이 분석은 이러한 고급 언어 모델의 최첨단 능력에 대한 통찰을 제공합니다.



GPT-4, OpenAI의 최신 모델은 테스트된 모델 중에서 가장 낮은 오류율로 놀랍습니다. 이는 OpenAI가 성능에 관한 주장을 확증합니다.

인공지능 커뮤니티와 사용자들은 서로 독립적인 평가를 계속해야 합니다. 이를 통해 표준화된 벤치마킹만으로는 실용적인 효과를 제공하는 모델에 대해 더 명확한 그림을 제시할 수 있습니다.

데이터셋이 상당히 작기 때문에 결과는 데이터셋에 따라 달라질 수 있습니다. 성능은 영어 데이터셋만을 사용했으며, 다국어 비교는 다음 기회를 기다려야 할 것입니다.

읽어 주셔서 감사합니다!



향후 유사한 콘텐츠를 받으려면 팔로우하세요!

문의 사항이 있으시면 언제든지 연락해주세요!