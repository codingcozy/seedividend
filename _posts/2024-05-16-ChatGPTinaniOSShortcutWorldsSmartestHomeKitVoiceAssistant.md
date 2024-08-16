---
title: "iOS 바로가기에서 ChatGPT - 세계에서 가장 똑똑한 HomeKit 음성 어시스턴트"
description: ""
coverImage: "/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_0.png"
date: 2024-05-16 17:24
ogImage: 
  url: /assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_0.png
tag: Tech
originalTitle: "ChatGPT in an iOS Shortcut — Worlds Smartest HomeKit Voice Assistant"
link: "https://medium.com/@matemarschalko/chatgpt-in-an-ios-shortcut-worlds-smartest-homekit-voice-assistant-9a33b780007a"
isUpdated: true
---




ChatGPT과 GPT-3를 시도한 이후로는, Siri, Alexa, Google Home, 그리고 다른 "스마트" 어시스턴트들이 너무 어설프고 쓸모 없게 느껴질 것입니다.

놀랍게도, 한 시간 이내에 당신만의 스마트 어시스턴트를 만들 수 있습니다!

![이미지](/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_0.png)

# 다른 AI 어시스턴트

<div class="content-ad"></div>

다른 사용 사례에 이 도움말러와 같은 어시스턴트를 사용하는 방법을 보여 주기 위해 차 관련 문제를 논의할 수 있는 AI 자동차 정비사를 만들었습니다:

# 배경

나는 수십 개의 조명, 온도 조절 장치, 바닥 난방, 환기 장치, 카메라 등이 있는 완전히 구축된 HomeKit 스마트 홈을 갖고 있어서 Siri를 GPT-3으로 대체할 수 있다면 좋을 것 같다고 생각했습니다.

자세한 내용을 살펴보기 전에 데모를 보여 드리겠습니다. 응답은 항상 개인화되어 있으며 데모에 제한되지 않습니다. 원하는 질문을 원하는 대로 할 수 있습니다!

<div class="content-ad"></div>

# "홈 어시스턴트 프로그래밍"

GPT-3 및 특히 ChatGPT는 대화 데이터로 훈련된 언어 모델로, 인간의 지시를 이해하고 응답하는 데 굉장히 뛰어납니다.

이 챗봇 중 하나를 시도해 본 적이 있다면, 다양한 형식으로 질문하고 응답을 받는 법을 쉽게 알 수 있을 것입니다. 문제는 스마트 홈을 제어할 때 다뤄야 할 매우 구체적인 구성 요소가 있습니다. 이 문제를 어떻게 해결할 수 있을까요?

모든 이를 달성하기 위해 사용한 정확한 프롬프트는 다음과 같습니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_1.png" />

알 수 있듯이, 모든 것을 평범한 영어로 설명했습니다. 요청 유형, 응답의 구체적인 구조를 설명하고, 감각적인 AI처럼 행동하도록 요청했으며, 개인 질문에 대한 조언을 하도록 했습니다. 또한 집안의 시간, 위치 및 장치 및 각 방에 대한 몇 가지 세부 정보를 제공했습니다. 이를 통해 우리는 완벽하게 구조화된 응답을 받게 될 것입니다.

프로그래밍하는 데 필요한 모든 것이 여기에 있습니다!

# 다른 요청 유형

<div class="content-ad"></div>

이제 네 요청 카테고리를 살펴보고 영상에서 몇 가지 예시를 통해 어떻게 처리할지 살펴볼게요.

## :: 명령 실행하기

GPT-3가 스마트 홈의 특정 부분을 제어하려고 한다는 것을 감지하면 “명령” 카테고리의 액션으로 응답합니다.

예시 요청은:

<div class="content-ad"></div>

그리고 우리는 다음과 같은 응답을 받았어요:

```js
{
  "action": "command",
  "location": "office",
  "target": "light",
  "value": "on",
  "comment": "Turning the light on for you.",
  "scheduleTimeStamp": ""
}
```

솔직히 말해서, 처음 이 응답을 보았을 때 눈을 믿을 수 없었고 얼마나 예외적으로 잘 작동하는지 놀랐어요!

해당 요청은 단순히 "사무실의 불을 켜라." 와 같은 간단한 명령이 아니었습니다. 매우 비틀린 방식으로 구사되어 있었죠. 이러한 방식은 Siri, Alexa 또는 Google 홈을 즉시 헷갈리게 만드는 요소였습니다.

<div class="content-ad"></div>

위의 정보로 우리는 정확히 무엇을 해야 할지 알게 되었고, Siri 바로 가기에서 이를 나중에 처리할 것입니다.

또한 여러분은 아마도 scheduleTimeStamp가 비어 있다는 것을 알았을 것입니다. 이것은 작업이 즉시 발생해야 한다는 것을 의미하지만, 나중에 작업이 필요한 경우에는 미리 지정된 미래의 날짜와 시간이 채워진 응답을 받을 수 있습니다.

이 경우 GPT-3는 아마도 침실이 꺼져야 한다는 점을 이해하고 요청에 전달한 시간보다 20분 뒤의 올바른 타임스탬프를 추가했습니다.

<div class="content-ad"></div>

```json
{
  "action": "command",
  "location": "bedroom",
  "target": "light",
  "value": "off",
  "comment": "자녀의 침실 불 끄기.",
  "scheduleTimeStamp": "Mon Jan 16 2023 12:16:31 GMT+0000"
}
```

또 다른 흥미로운 예시는 침실 온도를 설정하는 데 저 대신에 결정을 내린 방법이었습니다:

그리고 그것은 자신의 지식을 기반으로 침실을 편안한 19도로 설정했습니다!

## :: 쿼리 액션
  

<div class="content-ad"></div>

GPT-3가 스마트 홈 장치의 상태를 읽으려는 의도를 감지하면 "query"라는 동작 범주로 응답합니다.

예시 요청:

받는 응답은:

```js
{
  "action" : "query",
  "location" : "kitchen",
  "target" : "thermostat",
  "property" : "temperature"
}
```

<div class="content-ad"></div>

훌륭합니다! 작업 유형이 쿼리로 변경되어서 이제 주방 온도계의 온도를 가져오는 작업을 진행할 수 있습니다. 다시 한 번 말씀드리지만, 이 작업은 Siri Shortcut에서 나중에 처리할 예정입니다.

## :: 대답 작업

GPT-3가 요청이 스마트 홈과 관련이 없고 일반적인 질문일 때 "대답" 작업 범주로 응답합니다.

예시 요청:

<div class="content-ad"></div>

요청에서 스마트 홈의 위치를 영국 세인트올번으로 알렸기 때문에 GPT-3은 정확히 어떻게 응답해야 하는지 알고 있어요!

```js
{
  "action": "answer",
  "answer": "세인트올번은 역사적인 명소와 볼거리가 풍부해요. 세인트올번 대성당은 노르만 양식의 멋진 건물이에요. 베룰라미움 공원은 로마 시대 유적과 아름다운 정원이 있는 멋진 장소에요. 더 현대적인 경험을 원한다면 세인트올번 박물관이나 알반 아레나에서 쇼를 감상할 수 있어요."
}
```

간단하고 좋죠! 이 정보를 다시 읽어주는 Shortcut에 전달해 줄게요.

## :: 작업 명확히하기

<div class="content-ad"></div>

마침내, GPT-3가 세 가지 작업 중 어느 것도 감지하지 못했다면, 질문을 반복하거나 다시 말해달라고 요청할 것입니다.

# Siri 단축어에서 데이터 처리하기

iOS, macOS 또는 iPadOS에서 단축어 애플리케이션을 열고 요청의 세부 정보를 추가해보세요:

![이미지](/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_2.png)

<div class="content-ad"></div>

기억해 두면 좋은 한 가지 팁은 바로 단축어를 실행할 때 Siri에게 바로 단축어의 이름을 말하는 것입니다. 그래서 "오케이 스마트 홈"이 좋은 아이디어처럼 보였어요.

다음으로는 "텍스트 요청하기..." 작업을 사용하여 사용자로부터 응답을 받습니다. 이는 Siri를 통해 단축어를 시작하면 소리로 읽어주거나, 단축어 타일을 클릭하여 실행하면 입력 필드로 표시됩니다.

이제 OpenAI에 요청을 보내기 준비가 되었습니다. 이를 위해서는 계정을 등록하고 API 토큰을 받아야 합니다. 로그인 후 "API 키 보기" 메뉴 항목 아래에 있습니다.

API 사용 비용은 요청 당 약 $0.014이 소요되므로 $1당 70회 이상의 요청을 수행할 수 있습니다. 주의할 점은 우리의 요청이 매우 길기 때문에 이것은 비용이 비싸게 느껴집니다. 그렇지만 더 짧은 요청의 경우 비례적으로 적게 지불하게 됩니다. 실험할 때 기억해 둘만한 것이 될 수도 있어요.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_3.png" />

API 토큰을 준비했으면, 요청의 세부 사항을 입력하세요:
— model: text-davinci-003
— prompt: `텍스트` 요청: `제공된 입력` 응답:
— max_tokens: 1000

헤더 섹션에 다음을 추가하세요:
— Content-Type: application/json
— Authorization: Bearer `API 토큰 추가`

API에서 응답 데이터를 받으면, JSON 응답에 중첩되어 있으므로 그것을 찾아야 합니다. 데이터를 JSON 변수에 할당한 다음, 액션 카테고리 값을 추출합니다:

<div class="content-ad"></div>

아래는 이제 if 문에서 동작 카테고리의 값을 확인할 준비가 된 것입니다:

![image](/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_5.png)

한번 동작이 "command" 였음을 알면, 우리는 위치, 대상, 값 필드를 확인하고 동작을 트리거하면 됩니다: 첫 번째 예제에서 사무실 불을 켜는 것입니다.

<div class="content-ad"></div>

`<img src="/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_6.png" />`

조건 바깥과 "End If" 블록 뒤에, 우리는 또한 요청과 함께 전송된 GPT-3의 코멘트를 보여줍니다:

`<img src="/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_7.png" />`

쿼리 명령은 내장된 HomeKit 액션과 비슷하게 작동합니다:

<div class="content-ad"></div>


![이미지](/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_8.png)

마침내, 답변 및 명확화 작업은 처리 없이 반환된 값을 보여줍니다:

![이미지](/assets/img/2024-05-16-ChatGPTinaniOSShortcutWorldsSmartestHomeKitVoiceAssistant_9.png)

이상입니다


<div class="content-ad"></div>

지금 들리긴 좀 길게 들릴 수 있지만, 솔직히 말해서, 난 집 전체를 실제로 다 하진 않았어. 하지만, 네 논리를 입력 매개변수로 더 추상화하고, 코드에서의 함수와 비슷하게 값을 반환할 수 있는 작은 바로 가기 몇 가지로 더 단순화할 수 있다는 건 알아. 이 부분을 살펴보고, 일을 간단하게 할 수 있는 방법이 있는지 확인해 보겠어. 이에 대해 아이디어가 있으면 알려줘!

내 바로 가기 링크로 넘어가서 사용해보고 적용해 볼 수 있어:
https://www.icloud.com/shortcuts/e5d4033cf8024b5796e270c8fed9e478

## 결론

이거 얼마나 멋진 일이야?? 평범한 영어로 정의한다면 스마트 어시스턴트를 만들 수 있다니, 이게 미친 일이 아니겠어!

<div class="content-ad"></div>

하지만 이것은 단지 한 예에 불과해요. GPT-3에 보낼 수 있는 다양한 프롬프트와 Siri Shortcuts에서 수행할 수 있는 다양한 작업들을 상상해 보세요.

제가 확실히 여러분이 이미 몇 가지 아이디어를 가지고 있을 거라고 확신하고 있어요. 그래서 제게 언제든지 알려주시기 바라며, 정말로 관심이 있어요!