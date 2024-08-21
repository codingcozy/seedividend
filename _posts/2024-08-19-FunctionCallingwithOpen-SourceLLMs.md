---
title: "오픈소스 LLM을 활용한 함수 호출법"
description: ""
coverImage: "/assets/img/2024-08-19-FunctionCallingwithOpen-SourceLLMs_0.png"
date: 2024-08-19 03:16
ogImage:
  url: /assets/img/2024-08-19-FunctionCallingwithOpen-SourceLLMs_0.png
tag: Tech
originalTitle: "Function Calling with Open-Source LLMs"
link: "https://medium.com/@rushing_andrei/function-calling-with-open-source-llms-594aa5b3a304"
isUpdated: true
updatedAt: 1724032909604
---

<img src="/assets/img/2024-08-19-FunctionCallingwithOpen-SourceLLMs_0.png" />

"Function Calling" 또는 "Tool Calling" (교환 가능하게 사용)은 LLM의 기능으로, 개발자가 시스템의 다른 부분을 호출하기 위해 메소드 호출이나 API 호출을 통해 사용할 수 있는 형식화된 텍스트 출력을 생성하는 능력입니다.

소유 LLM 공급 업체는 도구를 LLM에 노출시키는 것을 간단하게 만드는데, 이는 API로 전송되는 메시지 배열과 별도의 도구 매개변수로 이루어집니다. 도구는 일반적으로 JSON 형식의 Open API 명세서에서 설명됩니다. 내부에서 LLM 공급 업체는 메시지, 도구 및 시스템 프롬프트가 함께 결합됩니다.

오픈 소스 LLM을 사용할 때, 함수 호출을 구현하는 두 가지 접근 방식이 있습니다. LLM이 기본적으로 함수 호출을 지원하지 않는 경우 프롬프트 엔지니어링, 세밀한 조정 및 제약 디코딩의 조합을 사용할 수 있습니다. 함수 호출을 네이티브로 지원하는 LLM은 이 능력을 래핑하기 위해 특수 토큰을 활용합니다.

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

아래 예시에서 오픈 소스 LLM은 네이티브 지원이 없습니다. 저희는 prompt 엔지니어링을 통해 함수 호출을 구현합니다. 지난해에는 이것이 흔한 프롬프팅 기술이었습니다:

```js
다음 도구를 사용할 수 있습니다:

{tools}

다음 형식을 사용하세요:

질문: 답변할 입력 질문
생각: 항상 무엇을 해야 하는지 생각해야 합니다
동작: {도구_이름} 중 하나여야 하는 동작
동작 입력: 동작에 대한 입력
```

LLM이 도구를 호출하기로 선택했다면, 아래 형식과 일치하는 텍스트를 반환할 것입니다. 이를 RegEx 처리할 수 있습니다:

```js
동작: 날씨
동작 입력: 샌프란시스코, 캘리포니아
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

오픈 소스 모델은 이 접근 방식을 사용하여 어느 정도 잘 동작합니다. 하지만 더 나은 결과와 일관성 있는 결과를 얻고 싶다면 세밀한 조정과 제약이 있는 디코딩을 함께 사용해야 할 것입니다.

그러나 훨씬 더 나은 성능을 얻으려면 함수 호출을 네이티브로 지원하는 LLMs를 사용하는 것이 좋습니다. 이러한 모델은 해당 방법으로 훈련된 모델을 사용하여 효율적으로 함수 호출을 수행함으로써 더 나은 성능을 얻을 수 있습니다. 모델을 효과적으로 함수 호출하도록 훈련하는 것은 모델의 토크나이저를 사용하여 도구 호출을 감싸는 특별한 토큰을 인식하는 것을 포함합니다.

예를 들어, mistralai/Mistral-7B-Instruct 모델의 토크나이저는 다음과 같은 특별한 토큰을 정의하고 사용합니다:

- [AVAILABLE_TOOLS][/AVAILABLE_TOOLS]
- [TOOL_CALLS] (닫히는 태그가 없음)
- [TOOL_RESULTS][/TOOL_RESULTS]

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

이 부분에 대한 표준화가 아직 많이 이루어지지 않았습니다. NousResearch/Hermes-2-Theta-Llama-3-8B에서는 다음과 같은 특별 토큰을 정의하고 있습니다:

- ` tools``/tools `
- ` tool_call``/tool_call `
- ` tool_response``/tool_response `

모델은 이러한 토큰을 찾아 사용할 수 있도록 훈련 및/또는 세밀 조정되었습니다.

모델이 어떻게 프롬프트를 구조화하고 이러한 토큰을 사용하여 도구 호출과의 멀티턴 대화를 수행하는지 살펴보겠습니다.

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

이전에 언급된 Mistral-7B-Instruct 모델에 초점을 맞출 것이지만, Berkley Function Calling Leaderboard에서 다른 기능 호출이 가능한 모델들도 테스트해보는 것을 권장합니다.

# 설정

Ollama를 사용하여 오픈 소스 LLMs를 실행할 것입니다. Ollama를 쉽게 로컬로 설정할 수 있습니다. 그것의 지시사항을 따르세요.

다음과 같은 get_current_weather() 함수가 있다고 가정해 봅시다:

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
{
  "type": "function",
  "function": {
    "name": "get_current_weather",
    "description": "Get the current weather",
    "parameters": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string",
          "description": "The city and state, e.g. San Francisco, CA"
        },
        "format": {
          "type": "string",
          "enum": [
            "celsius",
            "fahrenheit"
          ],
          "description": "The temperature unit to use."
        }
      },
      "required": [
        "location",
        "format"
      ]
    }
  }
}
```

이 함수를 프롬프트에서 노출시켜 LLM이 필요할 때 호출할 수 있도록 할 거에요. 프롬프트가 어떻게 구조화되어야 하는지 확인하기 위해 API 요청-응답 쌍의 일련의 작업을 실행할 거에요.

첫 번째 턴에서 [INST] [/INST] 태그로 묶인 함수 정의와 사용자 메시지가 포함된 프롬프트를 보냅니다. 신속 모드를 사용하면 Ollama가 프롬프트에 템플릿을 적용하지 않아요.

턴 1:

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
curl --location "http://localhost:11434/api/generate" \
--header "Content-Type: application/json" \
--data "{
  \"model\": \"mistral:7b-instruct-v0.3-fp16\",
  \"prompt\": \"[AVAILABLE_TOOLS][{'type': 'function', 'function': {'name': 'get_current_weather', 'description': 'Get the current weather', 'parameters': {'type': 'object', 'properties': {'location': {'type': 'string', 'description': 'The city and state, e.g. San Francisco, CA'}, 'format': {'type': 'string', 'enum': ['celsius', 'fahrenheit'], 'description': 'The temperature unit to use.'}, 'required': ['location', 'format']}}][/AVAILABLE_TOOLS][INST]What's the weather like today in Paris?[/INST]\",
  \"stream\": false,
  \"raw\": true
}"
```

```js
{
  "response": "[TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': 'Paris, France', 'format': 'celsius'}]"
}
```

모델은 올바른 매개변수로 get_current_weather 함수를 호출하기로 결정하였습니다. 해당 도구 호출 앞에 [TOOL_CALLS]를 추가함으로써 이를 나타냅니다. 도구 호출이 뒤따르는 [/TOOL_CALLS] 닫는 태그는 존재하지 않습니다. 모델 어휘 사전에는 해당 태그가 없습니다.

우리 시스템에서 도구 호출을 추출하고 실행합니다.

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
get_current_weather(location: '파리, 프랑스', format: '섭씨')
#=> 25도
```

그런 다음 우리는 도구 호출과 도구 호출 결과 자체를 둘 다 [TOOL_RESULTS][/TOOL_RESULTS]로 묶어 다시 프롬프트 문자열에 추가하고 모델을 다시 호출합니다.

2회전:

```js
curl --location "http://localhost:11434/api/generate" \
--header "Content-Type: application/json" \
--data "{
  \"model\": \"mistral:7b-instruct-v0.3-fp16\",
  \"prompt\": \"[AVAILABLE_TOOLS][{'type': 'function', 'function': {'name': 'get_current_weather', 'description': '현재 날씨 가져오기', 'parameters': {'type': 'object', 'properties': {'location': {'type': 'string', 'description': '도시와 국가, 예: 샌프란시스코, CA'}, 'format': {'type': 'string', 'enum': ['섭씨', '화씨'], 'description': '사용할 온도 단위'}, 'required': ['location', 'format']}}][/AVAILABLE_TOOLS][INST]오늘 파리 날씨는 어떤가요[/INST][TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': '파리, 프랑스', 'format': '섭씨'}]</s>[TOOL_RESULTS][{'content': '22F'}][/TOOL_RESULTS]\",
  \"stream\": false,
  \"raw\": true
}"
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

```json
{
  "response": "파리의 현재 온도는 화씨 22도입니다. (섭씨로 원하신다면, 약 -5.6도입니다.)"
}
```

대화를 이어나가기 위해 [INST][/INST] 태그로 감싼 다른 사용자 메시지를 추가합니다.

턴 3

```json
curl --location "http://localhost:11434/api/generate" \
--header "Content-Type: application/json" \
--data "{
  \"model\": \"mistral:7b-instruct-v0.3-fp16\",
  \"prompt\": \"[AVAILABLE_TOOLS][{'type': 'function', 'function': {'name': 'get_current_weather', 'description': '현재 날씨 가져오기', 'parameters': {'type': 'object', 'properties': {'location': {'type': 'string', 'description': '도시와 주, 예: 샌프란시스코, 캘리포니아'}, 'format': {'type': 'string', 'enum': ['celsius', 'fahrenheit'], 'description': '사용할 온도 단위'}, 'required': ['location', 'format']}}][/AVAILABLE_TOOLS][INST]오늘 파리의 날씨가 어떤가요[/INST][TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': '파리, 프랑스', 'format': 'celsius'}]</s>[TOOL_RESULTS][{'content': '22F'}][/TOOL_RESULTS] 파리의 현재 온도는 화씨 22도입니다. (섭씨로 원하신다면, 약 -5.6도입니다.)[INST] 캘리포니아는 어떤가요?[/INST]\",
  \"stream\": false,
  \"raw\": true
}"
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

```js
{
  "response": "[TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': 'San Francisco, CA', 'format': 'fahrenheit'}]"
}
```

응답에서 다른 함수 호출을 받았어요. 저희는 그 함수를 실행한 뒤에 도구 호출과 도구 호출 결과를 프롬프트에 추가하고 다시 LLM을 호출할 거예요.

4번째 턴:

```js
curl --location "http://localhost:11434/api/generate" \
--header "Content-Type: application/json" \
--data "{
  \"model\": \"mistral:7b-instruct-v0.3-fp16\",
  \"prompt\": \"[AVAILABLE_TOOLS][{'type': 'function', 'function': {'name': 'get_current_weather', 'description': 'Get the current weather', 'parameters': {'type': 'object', 'properties': {'location': {'type': 'string', 'description': 'The city and state, e.g. San Francisco, CA'}, 'format': {'type': 'string', 'enum': ['celsius', 'fahrenheit'], 'description': 'The temperature unit to use.'}, 'required': ['location', 'format']}}][/AVAILABLE_TOOLS][INST]What's the weather like today in Paris[/INST][TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': 'Paris, France', 'format': 'celsius'}]</s>[TOOL_RESULTS][{'content': '22F'}][/TOOL_RESULTS] 파리의 현재 온도는 화씨 22도에요. (섭씨로 보시려면 대략적으로 -5.6도예요.)[INST] 샌프란시스코는 어때요?[/INST][TOOL_CALLS] [{'name': 'get_current_weather', 'arguments': {'location': 'San Francisco, CA', 'format': 'fahrenheit'}][TOOL_RESULTS][{'content': '25C'}][/TOOL_RESULTS]\",
  \"stream\": false,
  \"raw\": true
}"
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

```json
{
  "response": "샌프란시스코의 현재 온도는 섭씨 25도입니다. (화씨로 하시려면 약 77도입니다.)"
}
```

# Langchain.rb

만약 루비를 사용하고 있고 Mistral과 같은 오픈 소스 모델을 사용하여 도구 호출과 멀틴턴 채팅 대화를 시도해 보고 싶다면, Langchain.rb를 사용해보세요:

```js
require "langchain"

# Ollama를 통해 LLM 클라이언트를 인스턴스화
llm = Langchain::LLM::Ollama.new(url: ENV["OLLAMA_URL"], default_options: { completion_model_name: "mistral:7b-instruct-v0.3-fp16"})

# 어시스턴트 인스턴스화
assistant = Langchain::Assistant.new(
  llm: llm,
  tools: [Langchain::Tool::Weather.new(api_key: ENV["OPEN_WEATHER_API_KEY"])]
)
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

우린 여기서 사전 빌트인 Langchain::Tool::Weather 도구 중 하나를 사용하는 중이야. 하지만 네가 쉽게 네 자신의 클래스와 도구를 만들 수도 있어. 이 도구들은 자동으로 [AVAILABLE_TOOLS][/AVAILABLE_TOOLS] 태그 안에 감싸질 거야.

어시스턴트와 채팅을 시작해보자:

```js
assistant.add_message_and_run(content: "오늘 파리 날씨가 어때?")
```

LLM으로부터 받은 마지막 메시지를 확인하여 응답을 확인해봐.

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
assistant.messages.last
#=> #<Langchain::Messages::OllamaMessage:0x000000011e199bb8
#   @content="[TOOL_CALLS] [{\"name\"=>\"weather__execute\", \"arguments\"=>{\"input\"=>\"Paris\"}]",
#   @role="assistant",
#   @tool_calls=[{"name"=>"weather__execute", "arguments"=>{"input"=>"Paris"}]>
```

도구 호출 결과를 수동으로 추가하거나 도구가 자동으로 실행되도록 다시 Assistant를 실행할 수 있습니다.

```js
# 수동 추가
assistant.submit_tool_output(output: "[{content: '25C'}]")
```

```js
# 자동 실행
assistant.run(auto_tool_execution: true)
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

auto_tool_execution 옵션은 보류 중인 도구 호출을 자동으로 실행하고 새 메시지에 결과를 추가합니다.

Assistant를 사용하는 방법에 대한 자세한 정보는 여기를 참조하세요: [Assistant 사용 방법](https://github.com/patterns-ai-core/langchainrb?tab=readme-ov-file#creating-an-assistant).

# 각주

- 이 블로그 글의 많은 아이디어는 2024년 6월 AI 엔지니어 월드 페어에서 Rick Lamers가 하는 "오픈소스 LLMS를 활용한 도구 사용"이라는 강연에서 온 것입니다.
- 최근 병합된 Ollama PR은 도구 호출 지원(도구: 매개변수 수락)이 다가오는 릴리스에 포함될 예정임을 나타냅니다.
- Groq는 지금까지 가장 높은 성능의 함수 호출 오픈소스 모델을 출시했습니다: [Groq 블로그](https://wow.groq.com/introducing-llama-3-groq-tool-use-models/)
- 이 주제를 더 깊이 이해하고 싶다면 훌킨페이스 리소스가 훌륭한 참고 자료입니다: [HuggingFace 리소스](https://huggingface.co/docs/transformers/main/chat_templating#advanced-tool-use--function-calling)
- @dottxtai의 벤치마크에 따르면 구조적 생성이 BFCL 모델 성능 개선에 도움이 되는 것으로 나타났습니다: [dottxtai 트위터](https://x.com/dottxtai/status/1797692104023363765) & [dottxtai 트위터](https://x.com/dottxtai/status/1798443290913853770)
- "여기서의 연구 결과는 간단한 함수 호출 (복잡한 계획이나 체인된 함수 호출 없이)에 대해, 오픈소스 모델 수정이 프로프리트 모델과 동등한 효과를 낼 수 있다는 것을 제안하고 있습니다." ([버클리 함수 호출 리더보드](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html))
