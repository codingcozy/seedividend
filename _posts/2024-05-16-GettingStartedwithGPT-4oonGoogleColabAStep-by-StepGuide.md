---
title: "Google Colab에서 GPT-4o로 시작하기 단계별 안내"
description: ""
coverImage: "/assets/img/2024-05-16-GettingStartedwithGPT-4oonGoogleColabAStep-by-StepGuide_0.png"
date: 2024-05-16 17:34
ogImage:
  url: /assets/img/2024-05-16-GettingStartedwithGPT-4oonGoogleColabAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Getting Started with GPT-4o on Google Colab: A Step-by-Step Guide"
link: "https://medium.com/@rahulrajpvr7d/getting-started-with-gpt-4o-on-google-colab-a-step-by-step-guide-368477a39fb3"
isUpdated: true
---

<img src="/assets/img/2024-05-16-GettingStartedwithGPT-4oonGoogleColabAStep-by-StepGuide_0.png" />

2024년 5월 13일에 OpenAI는 최신 AI 모델인 GPT-4o를 선보였습니다. 이 모델은 텍스트와 이미지 모두와의 고급 음성 상호작용 능력을 보여주었습니다. 인공지능(AI)은 다양한 산업을 변화시키고 있으며, OpenAI의 GPT-4o 모델은 이 혁명의 선두주자입니다.

<img src="/assets/img/2024-05-16-GettingStartedwithGPT-4oonGoogleColabAStep-by-StepGuide_1.png" />

본 안내서는 Google Colab에서 GPT-4o를 설정하고 사용하는 방법을 안내해 드립니다. 간단한 수학 문제를 해결하거나 복잡한 텍스트를 생성하거나 이미지를 분석하려는 경우, 이 튜토리얼을 통해 시작할 수 있을 것입니다.

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

![image](https://miro.medium.com/v2/resize:fit:1400/0*Ob6Fa-AKD9ZTpBsW.gif)

# 1. 설정

코딩을 시작하기 전에 Google Colab 계정과 OpenAI의 GPT-4o API에 액세스할 수 있는지 확인해주세요. GPT-4o의 환경 설정 및 몇 가지 흥미로운 기능을 탐색하는 단계별 안내서가 여기 있습니다.

## 단계 1: OpenAI Python 패키지 설치

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

먼저 OpenAI Python 패키지를 설치해야 합니다. 새로운 Colab 노트북을 열고 다음 명령을 실행하세요:

```js
!pip install --upgrade openai --quiet
```

## 단계 2: 라이브러리 가져오기 및 API 키 설정

그 다음으로 필요한 라이브러리를 가져오고 API 키를 설정하세요. Google Colab의 userdata 모듈을 사용하여 API 키를 안전하게 저장할 수 있습니다.

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

```js
import json
from openai import OpenAI
import os
from google.colab import userdata

MODEL = "gpt-4o"

client = OpenAI(api_key=userdata.get('openai'))
```

## 단계 3: 첫 번째 완성물 생성

GPT-4o가 어떻게 작동하는지 감을 잡기 위해 간단한 완성물을 만들어 봅시다. 모델에 간단한 수학 문제를 해결하도록 요청하겠습니다.

```js
completion = client.chat.completions.create(
  (model = MODEL),
  (messages = [
    { role: "system", content: "You are a helpful assistant. Help me with my math homework!" },
    { role: "user", content: "Hello! Could you solve 4+5?" },
  ])
);

print("Assistant: " + completion.choices[0].message.content);
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

## 단계 4: 더 복잡한 질문하기

GPT-4o에게 더 복잡한 질문을 하여 기능을 더 잘 이해할 수 있습니다. 예를 들어, 모델의 기원 및 훈련 세부 정보에 대해 질문할 수 있습니다.

```js
completion = client.chat.completions.create(
  (model = MODEL),
  (messages = [{ role: "user", content: "당신의 이름은 무엇이며 누가 만들었나요? 훈련의 종료일은 언제인가요?" }])
);

print("Assistant: " + completion.choices[0].message.content);
```

## 2. 함수 호출을 위한 JSON 모드

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

GPT-4는 JSON 응답을 생성할 수 있어서 구조화된 데이터와 함수 호출에 유용합니다.

![image](https://miro.medium.com/v2/resize:fit:1400/0*TyQQvSdTlOenI5YY.gif)

## 단계 1: JSON 응답 생성

주간 운동 루틴을 생성하기 위해 JSON 응답을 만들어 봅시다.

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

```js
completion = client.chat.completions.create(
  (model = MODEL),
  (response_format = { type: "json_object" }),
  (messages = [
    { role: "system", content: "You are a trainer who always responds in JSON" },
    { role: "user", content: "Create a weekly workout routine for me" },
  ])
);

print(completion.choices[0].message);
json.loads(completion.choices[0].message.content);
```

# 3. Image Understanding

GPT-4o can also understand and process images. We’ll explore how to work with images by encoding them in base64.

![Image](https://miro.medium.com/v2/resize:fit:1080/0*pYZ8nvgtWiL55IhN.gif)

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

## 단계 1: 이미지 인코딩

먼저 이미지를 base64로 인코딩하세요.

```js
from IPython.display import Image, display
import base64

IMAGE_PATH = "/content/IMG-20240118-WA0023.jpg"

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

base64_image = encode_image(IMAGE_PATH)
display(Image(IMAGE_PATH))
```

## 단계 2: 이미지 분석

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

```js
response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "당신은 친절하고 마크다운으로 응답하는 도우미입니다. 수학 숙제를 도와주세요!"},
        {"role": "user", "content": [
            {"type": "text", "text": "꽃의 색깔은 무엇인가요?"},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{base64_image}"}}
        ]}
    ],
    temperature=0.0,
)

print(response.choices[0].message.content)
```

## 단계 3: URL 이미지 분석

URL에서 직접 이미지를 분석할 수도 있습니다.

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

```js
response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": "마크다운으로 응답하는 도움이 되는 도우미에요. 수학 숙제를 도와줄게요!"},
        {"role": "user", "content": [
            {"type": "text", "text": "꽃의 색깔은 무엇인가요?"},
            {"type": "image_url", "image_url": {"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Ranunculus_repens_1_%28cropped%29.JPG/192px-Ranunculus_repens_1_%28cropped%29.JPG"}
        ]}
    ],
    temperature=0.0,
)

print(response.choices[0].message.content)
```

# 4. Function Calling

GPT-4o는 사용자 입력에 기반하여 미리 정의된 함수를 호출할 수 있어요. 외부 데이터 소스나 서비스를 통합하는 데 특히 유용합니다.

<img src="https://miro.medium.com/v2/resize:fit:1200/0*YKVvRxnSDMQEWPqb.gif" />

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

## 단계 1: 함수 정의

NBA 경기의 현재 점수를 가져오는 함수를 정의하세요.

```js
def get_nba_game_score(team):
    if "lakers" in team.lower():
        return json.dumps({"team": "레이커스", "score": "102", "opponent": "워리어스", "opponent_score": "98"})
    elif "bulls" in team.lower():
        return json.dumps({"team": "불스", "score": "89", "opponent": "셀틱스", "opponent_score": "95"})
    else:
        return json.dumps({"team": team, "score": "N/A", "opponent": "N/A", "opponent_score": "N/A"})
```

## 단계 2: 대화 초기화 및 함수 호출

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

모델이 이 함수를 호출할 수 있는 대화를 만들어보세요.

```js
def function_calling():
    messages = [{"role": "user", "content": "레이커스 게임 점수가 어떻게 되나요?"}]

    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_nba_game_score",
                "description": "주어진 팀의 NBA 게임의 현재 점수를 가져옵니다.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "team": {"type": "string", "description": "NBA 팀의 이름, 예: 레이커스, 불스"},
                    },
                    "required": ["team"],
                },
            },
        }
    ]

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    if tool_calls:
        available_functions = {"get_nba_game_score": get_nba_game_score}
        messages.append(response_message)

        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            function_args = json.loads(tool_call.function.arguments)

            function_response = function_to_call(team=function_args.get("team"))

            messages.append(
                {"tool_call_id": tool_call.id, "role": "tool", "name": function_name, "content": function_response}
            )

        second_response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
        )

        return second_response

print(function_calling())
```

축하합니다!

이제 Google Colab에서 GPT-4o를 설정하고 사용하는 방법을 배웠습니다. 이 가이드는 기본 텍스트 완성, JSON 응답, 이미지 처리 및 함수 호출 내용을 다루었습니다. 이러한 기능을 확장하여 다양한 분야의 정교한 AI 응용프로그램을 구축할 수 있습니다. 즐거운 코딩하세요!

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

![Image](https://miro.medium.com/v2/resize:fit:1400/0*e35njv6_nLGt-8QY.gif)
