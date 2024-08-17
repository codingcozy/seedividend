---
title: "Claude AI와 함께하는 AWS Bedrock 입문 가이드 정리"
description: ""
coverImage: "/assets/img/2024-08-17-AnIn-depthyetSimpleBeginnerGuideonAWSBedrockwithClaudeAI_0.png"
date: 2024-08-17 01:14
ogImage: 
  url: /assets/img/2024-08-17-AnIn-depthyetSimpleBeginnerGuideonAWSBedrockwithClaudeAI_0.png
tag: Tech
originalTitle: "An In-depth yet Simple Beginner Guide on AWS Bedrock with Claude AI"
link: "https://medium.com/ai-advances/an-in-depth-yet-simple-beginner-guide-on-aws-bedrock-with-claude-ai-092e0f2896c3"
isUpdated: true
updatedAt: 1723864115162
---


# 소개

이번 주는 AWS에게는 놀라운 소식이 많은 한 주였습니다. re:Invent 컨퍼런스 중에 많은 발표가 있었습니다. 주목해야 할 주요 서비스 중 하나인 AWS Bedrock은 지난 9월에 일반 공개되어 re:Invent 2023 중에 여러 가지 흥미로운 개선사항을 받았습니다.

본 안내서에서는 AWS Bedrock 및 Claude AI를 사용하여 Gradio와 함께 챗봇을 만드는 방법을 살펴볼 것입니다. 이 강력한 도구 세트로 시작하는 데 도움이 되는 단계별 안내를 제공할 것입니다.

본 안내서를 따르면 다음을 얻게 됩니다:

<div class="content-ad"></div>

# AWS 베드락 및 주요 기능 개요
- OpenAI와 비교하여 Claude AI 모델의 이유는 무엇인가요?
- 챗봇을 생성하고 챗봇 프론트엔드를 베드락 백엔드에 연결하는 개발자를 위한 완벽한 가이드

## 시작하기 전에! 🦸🏻‍♀️

만약 이 주제가 마음에 들고 지원하고 싶다면:

- LinkedIn에서 나를 팔로우하고 무료 프렌드 링크를 클릭하여 이 글 및 데이터에 관한 다른 정보를 확인하세요 🔭
- 제 글을 50번 클랩해 주시면 정말로 저를 도와주실 거예요.👏
- Medium에서 나를 팔로우하고 제 최신 글을 받아보기 위해 구독해주세요🫶AWS 베드락: 초보자를 위한 소개

<div class="content-ad"></div>

## AWS 베드락이란 무엇인가요?

AWS 베드락은 머신 러닝 GenAI 애플리케이션을 구축하고 배포하기 위한 LLM 모델, 임베딩 모델, 이미지 생성 모델, 지식 베이스 도구 및 에이전트 서비스 범위를 제공하는 강력한 플랫폼입니다. 쉽게 사용할 수 있도록 설계되었으며 초보자와 전문가 모두에게 이상적인 다양한 기능을 제공합니다.

## 사용 가능한 모델

다음 두 개의 그래프에서 동부 미국 버지니아 지역에서 사용할 수 있는 모든 모델을 찾을 수 있습니다.

<div class="content-ad"></div>

세밀함과 우아함에 사로잡힌 AI가 만들어낸 이미지에 항상 관심이 있었어요. 그러나 이번에는 AI가 예술이 아닌 코미디에 손을 대보기로 결정한 것 같아요.

제 작은 소녀는 자신의 자동차 옆에서 고귀하게 서 있는 미니 마우스를 보기 위해 기대했어요. 그러나 우리의 큰 놀라움은, 미니가 확고히 서 있는 대신에 이상하게 춤을 추는 것 같았다는 거예요! 우리는 AI의 예상치 못한 유머에 웃음을 참지 못했지만, 제 아이는 그 모습에 너무 재미있어 했어요. 🤣

<div class="content-ad"></div>

## 지식베이스 옵션

데이터의 RAG 기능을 활용하기를 고려 중이라면, AWS Bedrock의 벡터 저장소로 데이터를 벡터화하는 것이 확실한 선택지입니다. 현재 세 가지 선택지가 있는데요: AWS Open Search, Pinecone 및 Redis Enterprise Cloud입니다. 그리고 몽고DB 애호가들에게 기쁜 소식 — 곧 벡터 저장소 옵션으로 데뷰합니다.

## Amazon Bedrock용 에이전트

Amazon Bedrock 에이전트를 사용하면 개발자가 애플리케이션에 자율적인 에이전트를 구축할 수 있습니다. 이러한 에이전트는 데이터 소스, 소프트웨어 및 사용자 대화 사이의 상호작용을 조율하여 최종 사용자가 작업을 완료할 수 있도록 돕습니다. 에이전트는 API를 자동으로 호출하고 지식 베이스를 호출하여 작업을 완료하는 데 필요한 정보를 보완합니다. 이러한 에이전트를 통합함으로써 개발자는 AI 애플리케이션의 전달을 가속화하고 상당한 개발 시간을 절약할 수 있습니다.

<div class="content-ad"></div>

# Claude AI: 개요

## Claude AI란 무엇인가요?

Claude AI는 챗봇 및 다른 대화형 인터페이스를 만들기 위해 사용할 수 있는 강력한 도구입니다. 초보자와 전문가 모두에게 이상적인 기능을 제공하며 쉽게 사용할 수 있도록 설계되었습니다.

## Claude AI를 사용하는 이유는 무엇인가요?

<div class="content-ad"></div>

Claude AI는 챗봇 및 다른 대화 인터페이스를 구축하기에 이상적인 도구로 만드는 다양한 혜택을 제공합니다. 일부 주요 혜택은 다음과 같습니다:

- Claude AI는 Bedrock에서 사용 가능한 가장 고급 대화형 모델 중 하나입니다. Anthropic이 Constitutional AI 기술을 사용하여 개발한 Claude는 도움이 되고, 해를 끼치지 않으며, 정직하게 설계되었습니다. 맥락을 이해하고, 실수를 인정하고, 부적절한 요청을 거부할 수 있습니다.
- Claude의 200,000 토큰 입력 길이 확장으로 인해, 다른 챗봇 엔진과 비교했을 때 훨씬 복잡한 대화와 추론을 다룰 수 있습니다. 이는 보다 세밀한 대화를 통한 더 다양한 느낌을 가능하게 합니다. Claude는 다단계 명령을 따르고, 세부적인 질문에 답변하며, 창의적인 콘텐츠를 생성할 수 있습니다.
- 반대로, ChatGPT 4는 최대 128,000 입력 토큰을 처리할 수 있으며, 이는 대략 300페이지의 텍스트와 동등합니다.
- ChatGPT4보다 훨씬 저렴한 가격으로, Gen AI 프로젝트 비용 분석에 대한 이전 기사를 참고할 수 있습니다.

```js
| 제공자         | 모델                    | 입력/1,000 토큰 | 출력/1,000 토큰 |
| OpenAI / Azure | GPT-4                 | $0.03          | $0.06          |
| OpenAI / Azure | GPT-4                 | $0.06          | $0.12          |
| Anthropic      | Claude Instant        | $0.00163       | $0.00551       |
| Anthropic      | Claude 2              | $0.008         | $0.024         |
```

Claude AI와 AWS Bedrock을 결합하면, 개발자들은 차세대 챗봇을 구축할 강력한 플랫폼을 갖게 됩니다. Bedrock는 인프라 및 모델 접근을 제공하며, Claude는 고급 대화 기능을 제공합니다. 함께 사용하면, 실 사용 가능한 챗봇을 생성하는 장벽이 낮아집니다.

<div class="content-ad"></div>

# AWS Bedrock 및 Claude AI를 활용한 챗봇 구현

AWS Bedrock와 Claude AI를 사용하여 챗봇을 만드는 것은 몇 가지 필수적인 단계로 나눌 수 있는 간단한 과정입니다.

## AWS Bedrock 설정:

가장 먼저, AWS Bedrock 런타임 클라이언트를 초기화해야 합니다. AWS Bedrock는 머신러닝 모델의 배포와 관리를 용이하게 해주는 서비스입니다. boto3 클라이언트를 사용하여 쉽게 초기화할 수 있습니다. boto3는 AWS 서비스를 위한 Python SDK입니다.

<div class="content-ad"></div>

```js
import gradio as gr
import boto3
import json
import random
import time

# Bedrock Runtime 클라이언트 초기화
brt = boto3.client(service_name='bedrock-runtime')
```

## 채팅 인터페이스 구축하기:

다음 단계는 사용자가 상호작용할 채팅 인터페이스를 설정하는 것입니다. 이를 위해 모델 테스트를 위한 UI를 빠르게 생성하는 Gradio 라이브러리를 활용할 수 있습니다. Chatbot 인터페이스, 입력용 Textbox 및 대화를 쉽게 재설정할 수 있는 ClearButton을 설정할 수 있습니다.

```js
# Gradio 인터페이스 설정
with gr.Blocks() as demo:
    chatbot = gr.Chatbot()
    msg = gr.Textbox()
    clear = gr.ClearButton([msg, chatbot])
```

<div class="content-ad"></div>

## 응답 로직 생성:

이제 재미있는 부분입니다. 챗봇의 응답 로직을 만들기 위해 AWS Bedrock를 사용하여 Claude AI 모델을 호출할 것입니다.

```js
def respond(message, chat_history):
        # Bedrock 모델 호출
        body = json.dumps({
            "prompt": f"\n\nHuman: {message}\n\nAssistant:",
            "max_tokens_to_sample": 300,
            "temperature": 0.1,
            "top_p": 0.9,
        })

        model_id = 'anthropic.claude-v2'
        accept = 'application/json'
        content_type = 'application/json'

        # Bedrock 모델 호출
        response = brt.invoke_model(body=body, modelId=model_id, accept=accept, contentType=content_type)
```

## 모델 응답 처리하기:

<div class="content-ad"></div>

모델을 호출한 후에는 Bedrock 모델 응답을 구문 분석하여 채팅 기록에 추가합니다. 이렇게 하면 실시간 대화를 모방하는 자연스러운 채팅 기록을 표시할 수 있습니다.

```js
 # Bedrock 모델 응답 구문 분석
        response_body = json.loads(response.get('body').read())

        # 채팅 기록 표시
        chat_history.append((message, response_body.get('completion')))
        time.sleep(2)
        return "", chat_history

    msg.submit(respond, [msg, chatbot], [msg, chatbot])
```

## 챗봇 실행:

챗봇을 시작하는 마지막 단계는 Gradio 인터페이스를 실행하여 모든 것을 움직이게 하는 것입니다.

<div class="content-ad"></div>

```js
demo.launch()
```

요약하면, Gradio와 Anthropic의 Claude 모델을 AWS Bedrock 런타임을 통해 통합하여 챗봇 UI를 제공합니다.

최종 화면을 살펴보겠습니다.

# 결론적인 생각들

<div class="content-ad"></div>

여기 있습니다! AWS Bedrock와 Claude AI의 힘을 결합하여 직접 챗봇을 만드는 방법에 대한 포괄적인 안내서입니다. Gradio의 도움으로 작업하는 방법을 알아보았습니다.

AWS Bedrock의 핵심을 이해하고 Claude AI의 다이내믹스를 파헤치며 이러한 구성 요소를 완전히 작동하는 챗봇으로 변환하는 상세하고 재미있는 여정을 통해, 이 안내서는 이 흥미로운 탐험을 하는 동안 핵심 동반이 되는 것을 목표로 하였습니다.

2023년 AWS re:Invent의 최근 시리즈 발표에서는 AI 애플리케이션 개발의 가능성을 넓혔습니다. Bedrock의 다양한 유망한 기능과 통합, Claude AI의 고급 대화 기능을 결합하여 챗봇 생성을 새로운 수준으로 끌어올렸습니다.

마지막으로, 예상된 MongoDB 추가를 포함한 확장되는 벡터 저장소 옵션 풀은 사용자 경험을 더욱 풍부하고 다양하며 직관적으로 만들어 RAG 기능을 데이터와 활용하는 가능성을 더욱 넓히는 흥미로운 층을 더합니다.

<div class="content-ad"></div>

AI의 성과를 많이 찾으며, Minnie를 만나 웃음도 짓고 여행을 즐기길 바라요!

## 여정을 떠나기 전에! 🦸🏻‍♀️

만약 내 이야기를 좋아하고 지원하고 싶다면:

- 제 글을 50번 클랩해 주세요, 정말로 저에게 큰 도움이 될 거에요. 👏
- Medium에서 저를 팔로우하고 최신 글을 받아보세요 🫶
- LinkedIn에서 나를 팔로우하여 데이터 관련 다른 정보를 받아보세요 🔭

<div class="content-ad"></div>

![2024-08-17-AnIn-depthyetSimpleBeginnerGuideonAWSBedrockwithClaudeAI_0.png](/assets/img/2024-08-17-AnIn-depthyetSimpleBeginnerGuideonAWSBedrockwithClaudeAI_0.png)