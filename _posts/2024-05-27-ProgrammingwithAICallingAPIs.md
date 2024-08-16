---
title: "AI와 함께 하는 프로그래밍,  API 호출하기"
description: ""
coverImage: "/assets/img/2024-05-27-ProgrammingwithAICallingAPIs_0.png"
date: 2024-05-27 18:37
ogImage: 
  url: /assets/img/2024-05-27-ProgrammingwithAICallingAPIs_0.png
tag: Tech
originalTitle: "Programming with AI — Calling APIs"
link: "https://medium.com/@sausheong/programming-with-ai-calling-apis-1a01f19074b4"
isUpdated: true
---




몇 주 전에 AI 프로그래밍 수업을 가르쳐달라는 요청을 받았어요. 그래서 슬라이드와 코드를 열심히 준비했는데, 물질들이 커져갔어요. 그래서 이 모든 자료들을 하나로 모아 시리즈 형식의 글로 만들어보자는 생각이 들었죠. 수업 이후에 이를 참고할 수 있는 사람들이 많을 것이라 생각해요. 또한 이 글들은 세션 이후에도 수업에 도움이 될 수 있는 참고 자료가 될 거예요.

그래서 이 수업의 첫 번째 부분을 공유합니다. 이 부분은 REST API 및 라이브러리를 통해 AI 공급업체 API를 호출하는데 관한 내용입니다.

참고: 이것은 초보자를 위한 자료이므로 제가 생략한 내용이 많습니다. 이는 포괄적인 내용이 아니고 이해를 돕기 위한 것입니다.

![Programming with AI Image](/assets/img/2024-05-27-ProgrammingwithAICallingAPIs_0.png)

<div class="content-ad"></div>

따뜻한 시작부터 시작해봅시다. 그것은 몇 가지 API를 호출하는 것을 의미합니다. AI를 활용하기 위해 API를 호출하는 것은 AI 능력에 가장 흔하고 쉬운 방법이에요. 많은 사람들이 이를 비웃고 "충분히 AI가 아니다" 라고 생각하지만, 그건 좀 어리석은 생각이죠 - 시스템의 가치는 사용자에게 기능을 제공하는 것이지 얼마나 많은 AI가 사용되었는지에 달려 있지 않습니다.

현재 OpenAI (GPT), Google (Gemini), Anthropic (Claude), Mistral (Mistral), Cohere (Command) 등 다양한 API 제공업체들이 있어요. 이외에도 Replicate, Anyscale, Modal, Banana 등 다양한 기능을 제공하는 플랫폼 제공자들도 있습니다.

이 글에서는 우리가 REST API를 호출하는 것으로 간단히 시작할 거에요.

# REST APIs

<div class="content-ad"></div>

내가 아는 바에 의하면, 각 제공업체는 REST API를 갖고 있어요. 그들을 호출하는 것은 매우 간단해요. curl과 API URL 엔드포인트 그리고 JSON 페이로드를 전달하기만 하면 돼요.

여기 채팅 완성을 위해 OpenAI API를 호출하는 예시가 있어요.

```js
$ curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Why is the sky blue?"
      }
    ]
  }'
```

각 제공업체로부터 유효한 API 키가 필요해요. 대부분의 경우 계정에 가입하고 API 키를 생성하기만 하면 돼요. API 키를 얻었다면 직접 전달하거나 환경 변수로 설정할 수 있어요:

<div class="content-ad"></div>

```js
$ export OPENAI_API_KEY=<당신의 API 키>
```

API를 호출하면 다음과 같은 결과가 반환되어야 합니다:

```js
{
  "id": "chatcmpl-9RWBzicE7v7A1ZRLWUMX3a6zwooWd",
  "object": "chat.completion",
  "created": 1716345631,
  "model": "gpt-4o-2024-05-13",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Rayleigh 산란이라는 현상으로 인해 하늘은 푸르게 보입니다. 더 자세한 설명은 다음과 같습니다:\n\n1. **태양빛 구성**: 태양빛 또는 백색광은 서로 다른 파장을 가진 색 스펙트럼으로 구성되어 있습니다. 가시 스펙트럼은 짧은 파장(파랑과 보라색)에서 긴 파장(빨강과 주황색)까지 범위에 걸쳐 있습니다.\n\n2. **대기와의 상호작용**: 태양빛이 지구 대기에 들어오면 분자와 작은 입자와 상호작용합니다. 짧은 파장의 빛(파랑과 보라색)은 이러한 입자에 의해 더 효과적으로 산란되며, 긴 파장(빨강, 주황, 노랑)은 그보다 적게 산란됩니다. \n\n3. **인간의 지각**: 보라색 빛은 파랑 빛보다 더 많이 산란되지만, 우리 눈은 파랑 빛에 민감하며, 태양빛에는 처음부터 보라색 빛이 많이 없습니다. 게다가 일부 보라색 빛은 상층 대기에 흡수됩니다. 결과적으로 우리는 하늘을 파랗게 보게 됩니다.\n\n4. **결과적인 푸른 하늘**: 산란된 파랑 빛이 각 방향에서 우리 눈에 도달하여, 주로 지면에서 낮에 하늘을 보면 하늘이 파랗게 보입니다.\n\n이 산란 효과는 태양이 하늘에 낮게 있을 때 더 명확하게 나타납니다. 그래서 일출과 일몰 시 빨간색 계열을 보게 됩니다. 이러한 경우에는 빛이 더 많은 대기를 통과하면서 파랑과 녹색빛이 더 많이 산란되고, 빨강과 주황색이 하늘을 지배하게 됩니다."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 23,
    "completion_tokens": 286,
    "total_tokens": 309
  },
  "system_fingerprint": "fp_729ea513f7"
}
```

아마도 OpenAI가 이러한 API를 처음으로 개발한 것이거나, 더 인기가 많아서 다른 많은 공급자들이 그들의 REST API에서 비슷한 형식을 사용하는 것일 수도 있습니다. 예를 들어, Anthropic의 형식은 다음과 같습니다.

<div class="content-ad"></div>


$ curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Why is the sky blue?"}
    ]
}'


위에서 보듯이, API 키는 다른 헤더를 통해 전달되지만 페이로드는 거의 동일하지만 모델 작동 방식에 따라 약간 차이가 있습니다. 예를 들어, Anthropic에서 메시지의 일부로 시스템 역할 콘텐츠를 전달할 수 없습니다.

또 다른 예시는 Mistral의 것입니다.


$ curl https://api.mistral.ai/v1/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Accept: application/json' \
     --header "Authorization: Bearer $MISTRAL_API_KEY" \
     --data '{
    "model": "mistral-large-latest",
    "messages": [
     {
        "role": "user",
        "content": "Why is the sky blue?"
      }
    ]
  }'


<div class="content-ad"></div>

그런데, Google은 실제로 API에 대해 약간 다른 방식을 사용하며 API 키를 URL 쿼리의 일부로 전달하고 모델을 URL의 일부로 포함시킵니다. 페이로드도 다르지만 아이디어는 거의 동일합니다.

```js
$ curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=$API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ "contents":[
    { "parts":[{"text": "Why is the sky blue?"}]}
  ]
}'
```

REST API는 정말 유용하고 거의 보편적입니다. 제공 업체에서 직접 지원하지 않는 언어로 프로그래밍하는 경우 HTTP 클라이언트 라이브러리를 사용하여 REST API를 직접 호출할 수 있습니다. 대부분의 합리적인 프로그래밍 언어에는 표준 라이브러리나 서드 파티 라이브러리에 HTTP 클라이언트 라이브러리가 있으므로 문제 없습니다.

그러나 대부분의 제공 업체는 대부분 Python을 지원하기도 합니다. 그 이유는 대부분의 AI 관련 작업이 Python으로 프로그래밍되기 때문입니다.

<div class="content-ad"></div>

# 파이썬

예를 들어, OpenAI를 호출하는 방법은 이렇습니다. Python 라이브러리를 사용합니다.

```python
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Why is the sky blue?"}
  ]
)

print(completion.choices[0].message.content)
```

너무 간단하죠? 클라이언트를 만들 때 매개변수와 옵션을 설정할 수 있지만 그게 전부입니다. API 키를 더 이상 지정할 필요가 없다는 것을 알아채셨을 것입니다. 환경 변수로 API 키를 설정했다면 Python 라이브러리가 해당 환경 변수에서 가져올 거에요.

<div class="content-ad"></div>

안녕하세요! Anthropic과 Mistral도 마찬가지에요.

```js
import anthropic

message = anthropic.Anthropic().messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Why is the sky blue?"}
    ]
)

print(message.content)
```

프랜들리하게말하자면,

```js
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

client = MistralClient()

chat_response = client.chat(
    model="mistral-large-latest",
    messages=[
        ChatMessage(role="user", content="Why is the sky blue?")
    ],
)

print(chat_response.choices[0].message.content)
```

<div class="content-ad"></div>

Google의 Python 라이브러리도 사용하기 매우 쉽지만, 다른 라이브러리들과 조금 다릅니다.

```python
import google.generativeai as genai

model = genai.GenerativeModel('gemini-1.5-flash-latest')
chat = model.start_chat(history=[])
response = chat.send_message("Why is the sky blue?")

print(response.text)
```

파이썬은 매우 잘 지원되고 있는 것을 보실 수 있습니다. 다른 잘 지원되는 언어는 JavaScript입니다.

# Javascript

<div class="content-ad"></div>

파이썬이 가장 잘 지원되는 언어라고 해도, 인기가 많기 때문에 자바스크립트/타입스크립트도 많이 사용됩니다. 자바스크립트와 node.js를 사용하여 OpenAI API에 액세스하는 방법을 살펴봅시다.

```js
import OpenAI from "openai";

const openai = new OpenAI();

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Why is the sky blue?" }
  ],    
});

console.log(completion.choices[0]);
```

파이썬 라이브러리에서와 같이 API 키를 더 이상 입력할 필요가 없었습니다. 환경 변수로 API 키를 설정한 경우, 자바스크립트 라이브러리가 환경 변수에서 API 키를 자동으로 인식합니다.

이것이 JSON 결과 출력입니다 (completion.choices[0]만 표시).

<div class="content-ad"></div>

Markdown 형식으로 표를 변경하려면 다음과 같이 하면 됩니다.

```js
{
  index: 0,
  message: {
    role: 'assistant',
    content: "하늘이 파란 이유는 Rayleigh 산란이라는 현상 때문입니다. 이 산란은 태양광이 지구 대기로 들어와 공기 속 분자와 작은 입자들과 상호 작용할 때 발생합니다.\n" +
      '\n' +
      "하늘이 파란 색으로 보이는 이유를 단계별로 살펴보겠습니다:\n" +
      '\n' +
      '1. **태양광 조성**: 태양광 또는 백색광은 여러 색상으로 구성되어 있으며 각각 다른 파장을 가지고 있습니다. 색상은 보라색과 파랑 (파장이 짧은)에서 빨강과 주황 (파장이 긴)까지 이어집니다.\n' +
      '\n' +
      '2. **산란**: 태양광이 대기를 통과할 때 가스 분자와 작은 입자와 충돌합니다. 빛의 짧은 파장(파랑과 보라색)은 이러한 분자와 입자들에 의해 더 많이 길거나 (빨강과 주황과 같은)보다 더 넓은 범위로 산란됩니다.\n' +
      '\n' +
      '3. **인간의 지각**: 비록 보라색 빛이 파란 빛보다 더 많이 산란되지만, 우리 눈은 파란 빛에 민감하고 보라색 빛에 덜 민감합니다. 또한 일부의 보라색 빛은 상층 대기에 흡수됩니다. 따라서 우리에게는 하늘이 주로 파란색으로 보입니다.\n' +
      '\n' +
      '4. **시야각**: 하늘을 올려다볼 때, 우리는 하늘의 모든 부분에서 나오는 이 산란된 파란 빛을 보며 그 특징적인 색상을 부여합니다.\n' +
      '\n' +
      "요약하면, 하늘이 파란 이유는 태양광의 짧은 파장인 파란색이 지구 대기의 분자들에 의해 모든 방향으로 더 넓게 산란되고, 우리 눈이 파란색 빛을 보는 데 더 잘 적응되어있기 때문입니다."
  },
  logprobs: null,
  finish_reason: 'stop'
}
```

마찬가지로, Javascript와 node.js를 사용하여 Anthropic API를 호출하는 방법은 아래와 같습니다.

```js
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const completion = await anthropic.messages.create({
  model: "claude-3-haiku-20240307",
  max_tokens: 1024,
  messages: [
    {"role": "user", "content": "하늘이 파란 이유는 무엇인가요?"}
  ]
});

console.log(completion);
```

다른 공급자들로는 진행하지 않겠지만, 아이디어를 얻으실 수 있습니다. 공식적으로 지원되는 라이브러리를 사용하시려면 Python 및 Javascript가 좋습니다. REST API 외에도 Python 및 Javascript를 포함한 대부분의 공급자는 다른 언어에 대한 공식 지원이 없지만 Google은 훨씬 더 다양한 언어를 지원합니다.


<div class="content-ad"></div>

그러나 다른 언어용 라이브러리가 없는 것은 아닙니다.

# 서드 파티 라이브러리

주변에는 다양한 서드 파티 라이브러리가 있습니다. OpenAI 문서를 살펴보면 대부분의 인기 있는 언어에 대한 서드 파티 라이브러리 지원이 있습니다. 예를 들어, go-openai 패키지를 사용하면 Go에서 OpenAI 라이브러리를 호출할 수 있습니다.

```js
package main

import (
 "context"
 "fmt"
 "os"

 openai "github.com/sashabaranov/go-openai"
)

func main() {
 client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
 resp, err := client.CreateChatCompletion(
  context.Background(),
  openai.ChatCompletionRequest{
   Model: openai.GPT4o,
   Messages: []openai.ChatCompletionMessage{
    {
     Role:    openai.ChatMessageRoleUser,
     Content: "Why is the sky blue?",
    },
   },
  },
 )

 if err != nil {
  fmt.Printf("ChatCompletion error: %v\n", err)
  return
 }

 fmt.Println(resp.Choices[0].Message.Content)
}
```

<div class="content-ad"></div>

저기요! 여기 SwiftOpenAI라는 Swift용 써드파티 OpenAI 라이브러리가 있어요. XCode 프로젝트에서 패키지 종속성으로 추가해서 사용할 수 있어요. 이 함수는 OpenAI API를 호출하는 예시에요.

```js
    func sendMessage() async {
        let input = userInput.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !input.isEmpty else { return }
        
        let message = Message(content: input, isUser: true)
        messages.append(message)
        userInput = ""
        
        let openAI = SwiftOpenAI(apiKey: Config.openAIKey)
        let msgs: [MessageChatGPT] = [
            MessageChatGPT(text: "You are a helpful assistant.", role: .system),
            MessageChatGPT(text: input, role: .user)
        ]
        
        let optionalParameters = ChatCompletionsOptionalParameters(
            temperature: 0.7,
            stream: true,
            maxTokens: 1024
        )
        
        do {
            let stream = try await openAI.createChatCompletionsStream(
                model: .gpt4o(.base),
                messages: msgs,
                optionalParameters: optionalParameters
            )
            
            let resp = Message(content: "", isUser: false)
            messages.append(resp)
            
            for try await response in stream {
                let content = response.choices[0].delta?.content ?? ""
                if let lastMessage = messages.last, !lastMessage.isUser {
                    let updatedContent = lastMessage.content + content
                    messages[messages.count - 1] = Message(content: updatedContent, isUser: false)
                }
            }
        } catch {
            print("Error: \(error)")
            if let lastMessage = messages.last, !lastMessage.isUser {
                messages[messages.count - 1] = Message(content: "Cannot get response from OpenAI: \(error)", isUser: false)
            }
        }
    }
```

이 모든 써드파티 라이브러리들은 좋지만 대부분이 한 제공업체만 지원해요. 여러 제공업체에 접근하려면 보통 동시에 몇 개의 라이브러리를 사용하거나 LLM 프레임워크를 시도해볼 수도 있어요.

# LLM 프레임워크

<div class="content-ad"></div>

LLM 프레임워크는 LLM 기반 어플리케이션을 작성할 수 있게 해주는 어플리케이션 프레임워크의 일종입니다. 이러한 프레임워크는 지원과 구조를 제공하며, 일반적으로 LLM 기반 어플리케이션을 작성하는 방법을 표현합니다.

다양한 LLM 프레임워크가 있으며, 그 중에는 공식으로 지원되거나 제3자 라이브러리보다 인기가 있는 것도 있습니다. 이는 이러한 프레임워크가 개발자에게 다양한 능력을 제공하기 때문입니다. 이를 통해 여러 LLM 제공 업체에 동시에 연결하고, 여러 데이터 소스에 연결하며, 기본 LLM 위에 에이전트를 구현할 수 있습니다.

Langchain, LlamaIndex, Haystack 등 여러 프레임워크가 있지만, 이 글에서는 LLM 기반 어플리케이션을 만들기 위한 현재 가장 인기 있는 두 프레임워크인 Langchain과 LlamaIndex에 대해 이야기하겠습니다.

## Langchain 🦜️🔗

<div class="content-ad"></div>

가장 인기 있는 프레임워크는 아마도 Langchain일 것입니다. Langchain은 2022년 10월에 처음 릴리스되었으며 그 이후로 급속하게 발전하여 LLM 세계의 거의 모든 것을 다루는데 이르렀습니다. 현재 시점에서 거의 400개의 릴리스에 이를 정도로 성장했습니다. 한 때 릴리스는 거의 매일 발생했으며 가끔은 하루에 두 번씩 이루어졌습니다!

지난 1년 동안 Langchain은 비교적 단순한 Python 라이브러리에서 핵심 라이브러리부터 배포 서버, 관측성 도구 세트까지의 기능 생태계로 성장했습니다.

이제 Langchain을 사용하여 OpenAI에 연결하고 그 채팅 API를 호출하는 방법에 대해 간단히 설명해드리겠습니다.

```js
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model_name="gpt-4o")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{input}")
])
output_parser = StrOutputParser()

chain = prompt | llm | output_parser
results = chain.invoke({"input": "why is the sky blue?"})

print(results)
```

<div class="content-ad"></div>

코드를 한눈에 보면 그리 다른 것 같지는 않지만, 챗 프롬프트, LLM 및 출력 파서를 연결하여 결과를 생성했음을 알아차릴 수도 있을 것입니다. 이것은 Langchain의 더 강력한 기능 중 하나의 예시이며, Langchain에 이름을 부여한 것 중 하나인 연쇄입니다.

연쇄는 서로 연결된 호출의 일련이다. 연쇄는 Langchain 표현 언어(LCEL)를 사용하여 생성되며, 가장 기본적인 연쇄는 위에서 보여진 것과 같습니다:

```js
chain = prompt | llm | output_parser
```

연쇄를 실행하기 위해, 우리는 연쇄에 대해 몇 가지 메서드 중 하나를 호출하면 됩니다(위의 코드의 경우 invoke를 사용했습니다). 적절한 입력을 사용하여 호출하면 결과를 얻을 수 있습니다.

<div class="content-ad"></div>


![Programming with AI: Calling APIs](/assets/img/2024-05-27-ProgrammingwithAICallingAPIs_1.png)

체인은 강력하고 구성 가능합니다. 컨텍스트와 함께 질문을 LLM에 전달하여 간단한 검색 증강 생성(RAG)을 수행하는 방법을 살펴보겠습니다.

이 경우 싱가포르의 통신 및 정보부 (MCI) 위원회 공급위원회에 대한 2024년 1월의 국회 회의록 텍스트 문서를 사용합니다. 해당 사이트에서 텍스트를 가져와 hansard.txt라는 텍스트 파일로 저장했습니다.

```js
from langchain_community.vectorstores import DocArrayInMemorySearch
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI

def extract(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file if line.strip()]

model = ChatOpenAI(model="gpt-4o")
vectorstore = DocArrayInMemorySearch.from_texts(
    texts=extract('data/hansard.txt'),
    embedding=OpenAIEmbeddings(),
)
retriever = vectorstore.as_retriever()
template = """다음 컨텍스트를 기반으로 질문에 답하십시오:
{context}

질문: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
output_parser = StrOutputParser()
setup_and_retrieval = RunnableParallel(
    {"context": retriever, "question": RunnablePassthrough()}
)
chain = setup_and_retrieval | prompt | model | output_parser

results = chain.invoke("스마트 네이션은 어떻게 시민들의 삶을 개선했습니까?")
print(results)
```


<div class="content-ad"></div>

위의 코드에서는 먼저 hansard.txt 문서의 각 줄에서 인메모리 벡터 저장소를 만들고 OpenAI의 임베딩을 사용합니다. 벡터 저장소로부터 리트리버를 생성하여 프롬프트에 입력으로 적합한 줄을 가져올 수 있습니다.

이제 사용자의 입력이 주어지면, 해당 입력을 리트리버에 전달하여 벡터 저장소에서 줄들을 가져올 수 있습니다. 사용자 입력은 또한 프롬프트로 전달됩니다. RunnableParallel을 통해 동시에 이 두 가지가 실행되고, 출력은 질문과 문맥으로 프롬프트로 전송됩니다.

<img src="/assets/img/2024-05-27-ProgrammingwithAICallingAPIs_2.png" />

나머지 부분은 거의 동일하지만 여기에 출력이 있습니다.

<div class="content-ad"></div>

```python
% python langchain_test_rag.py
싱가포르의 스마트 네이션 이니셔티브는 2014년부터 2023년까지 정부 서비스에 대한 만족도를 73%에서 83%로 높여 시민들의 삶을 개선했습니다. 뿐만 아니라, 싱가포르인의 84%가 디지털 기술이 그들의 삶을 더 편하게 만들었다고 느끼고 있습니다. 이 이니셔티브는 일상적인 편의성과 삶의 질을 향상시키고, 사람들이 더 의미 있는 삶을 살도록 돕고, 누구도 뒤처지지 않도록 하는 것을 목표로 합니다.
```

여러분이 보실 수 있듯이, 체인은 강력한 메커니즘입니다. 이 체인 메커니즘은 Langchain에만 해당하는 것은 아닙니다. Haystack 프레임워크는 파이프라인이라고 부르며, LLMFlows와 같은 몇 개의 다른 프레임워크는 플로우라고 합니다.

## LlamaIndex

다른 인기 있는 LLM 프레임워크인 LlamaIndex가 있습니다. LlamaIndex는 2022년 11월에 GPTIndex라는 이름의 프레임워크로 시작되었습니다. LlamaIndex의 기본 개념은 LLM을 데이터에 연결하는 것입니다. 실제로 LlamaIndex와 Langchain은 거의 동시에 시작되었다는 것에 주목할 수 있습니다. 사실, Langchain의 창시자인 해리슨 체이스와 LlamaIndex의 창시자인 제리 류는 인공 지능 보안 회사인 Robust Intelligence에서 동료였습니다.


<div class="content-ad"></div>

빠른 대화 완성을 위해 LlamaIndex 사용 방법을 간단히 살펴봅시다.

```js
from llama_index.core import Settings
from llama_index.core.llms import ChatMessage
from llama_index.llms.openai import OpenAI

Settings.llm = OpenAI(model="gpt-4o")
messages = [
    ChatMessage(
        role="system", content="You are a helpful assistant."
    ),
    ChatMessage(role="user", content="Why is the sky blue?"),
]
resp = OpenAI().chat(messages)
print(resp)
```

보시다시피, Langchain이나 기타 API와 크게 다르지 않지만 LlamaIndex의 장점은 데이터와의 연결에 중점을 둔다는 점입니다. 예상대로, 간단한 RAG를 수행하는 코드는 매우 간단합니다.

```js
from llama_index.core import Settings, VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI

Settings.llm = OpenAI(model="gpt-4o")

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("How has Smart Nation improved citizen's lives?")
print(response)
```

<div class="content-ad"></div>

먼저, 데이터 디렉토리(즉, 우리의 hansard.txt 파일)에서 파일을 가져와서 벡터 저장소에 저장합니다. 그런 다음 해당 벡터 저장소를 쿼리 엔진으로 사용하여 쿼리를 보내면 문서에서 데이터를 사용하여 응답을 형성할 것입니다.

Langchain과 LlamaIndex는 진화의 급격한 속도 이후 강력한 프레임워크입니다. 각각의 강점이 있으며 현재 시점에서는 주로 개인적인 선호에 따라 사용하는 것이 대부분입니다.

# 요약

AI 프로그래밍에 대한 수업의 첫 번째 부분입니다. 다음 글에서는 지역 LLM에 대해 더 깊이 알아볼 것입니다. 즉, 자신의 기기에 배포할 수 있는 LLM에 대해 다뤄볼 것입니다. 예를 들어, 자신의 노트북에도 배포할 수 있는 LLM입니다.