---
title: "Anthropic Claude V3 함수 호출 방법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-12 19:56
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Anthropic Claude V3 Function Calling"
link: "https://medium.com/gitconnected/anthropic-claude-v3-function-calling-2c7b5dc8f715"
---


이 기사에서는 Anthropics의 새로운 Claude V3 Opus 모델이 제시하는 질문에 대한 응답을 향상시키기 위해 함수 호출을 사용하는 방법을 보여드리겠습니다. 이를 위해서는 API 키를 받아와서 LLM의 API와 함께 사용해야 합니다.

API 키를 받는 방법과 API를 사용하는 방법에 대해 이전 기사에서 이야기했었는데, 아래 링크를 통해 확인할 수 있습니다.

이 기사를 더 효과적으로 활용하기 위해 먼저 그 기사를 읽는 것을 권장드립니다. API 키를 받는 세부사항에 대해서는 다시 다루지 않겠습니다. 왜냐하면 이 과정은 이미 상기한 기사에 자세히 안내되어 있기 때문입니다. 단, Claude에 대한 액세스를 업그레이드해야 하므로 해당 프로세스에는 비용이 발생한다는 점을 알아두셔야 합니다. Pay-As-You-Go 모델을 사용하면 상당히 저렴하게 이용할 수 있습니다. 저는 이미 꽤 사용해봤는데, 지금까지 약 $3 정도 비용이 들었습니다.

## 함수 호출 사용 방법

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

최선의 방법으로 코딩 작업을 수행하기 위해 별도의 코딩 환경을 설정해야 합니다. 저는 conda를 사용하지만 여러분에게 적합한 방법을 사용하시면 됩니다.

```bash
# 테스트 환경 작성
conda create -n opus_fc python=3.12 -y
```

환경이 생성되면 activate 명령을 사용하여 해당 환경으로 전환한 후 필요한 모든 라이브러리를 설치할 수 있습니다.

```bash
# 이제 활성화
conda activate opus_fc
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

```js
# 필요한 라이브러리 설치
pip install anthropic
```

```js
# 주피터 설치
conda install jupyter -y
```

이제 명령 프롬프트에 'jupyter notebook'을 입력하세요. 브라우저에서 주피터 노트북이 열리는 것을 확인할 수 있습니다. 만약 자동으로 열리지 않는다면, 주피터 노트북 명령어 입력 후 정보가 화면에 표시될 것인데, 그 중간쯤에 브라우저에 복사하여 붙여넣어야 할 URL이 있을 것입니다. 

당신의 URL은 제 것과 다를 수 있지만, 다음과 같이 보일 것입니다:-  

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


http://127.0.0.1:8888/tree?token=3b9f7bd07b6966b41b68e2350721b2d0b6f388d248cc69da


그럼, 코드 작업을 시작해봅시다. 섹션으로 나눠서 코드를 설명하는 주석을 추가할 거에요. 

우선, 함수 호출이 왜 필요한지 알아볼까요? 주요 이유 중 하나는 클로드가 최신 및/또는 실시간 정보에 액세스할 수 없기 때문이랍니다.

아래 예시를 봐봅시다. 에든버러(영국)의 현재 온도가 몇 도인지 클로드에게 물어봤을 때요.


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
# 필수 라이브러리 가져오기
#
import anthropic
import os

# API 키 설정
#
os.environ["ANTHROPIC_API_KEY"]="YOUR_ANTHROPIC_API_KEY"

import anthropic

client = anthropic.Anthropic(
    
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

내_질문= {
    "role": "user", 
    "content": "에든버러의 현재 온도를 알려주세요"
}

message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    temperature=0.0,
    messages=[
        내_질문
    ]
)
print(message.content[0].text)

>>
죄송합니다만, 저는 실시간 날씨 데이터에 접근할 수 없습니다. AI 언어 모델로써 
특정 위치의 현재 날씨 정보를 검색할 수 있는 능력이 없습니다. 그러나 
실시간 날씨 업데이트를 제공하는 날씨 앱이나 웹사이트를 사용하여 
에든버러의 현재 온도를 쉽게 확인할 수 있습니다. 인기 있는 옵션으로는 
메트 오피스, BBC 날씨, AcuWeather 등이 있습니다. 이 플랫폼에서 
"에든버러"를 검색하면 도시의 현재 온도와 관련된 기타 날씨 정보를 
찾을 수 있을 것입니다.
```

Claude가 특정 위치의 현재 온도를 모르는 것을 확인하실 수 있습니다. 이것이 함수 호출이 각자의 것으로 들어오는 곳입니다. 어떤 날씨 서버를 조사하고 특정 위치의 현재 온도를 얻을 수 있는 함수를 제공할 수 있다면 Claude가 그 함수를 호출하고 필요한 정보를 반환할 수 있습니다.

어떻게 할 수 있는지 살펴보겠습니다. 다른 LLM들이 하는 방식과 약간 다르며 조금 복잡하지만 프로세스의 각 단계는 꽤 간단합니다.

Anthropic은 용어인 도구(tool)와 함수를 서로 바꿔 사용하므로 먼저 특정 위치의 현재 온도를 가져오는 도구(함수)를 만들어야 합니다.


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

이를 위해, OpenWeatherMap의 API를 사용할 겁니다. 무료로 등록하여 API 키를 받을 수 있어요. 아래 링크를 클릭해주세요.

API 키를 사용할 수 있는데는 몇 시간 정도 소요될 수 있습니다. 따라서 처음에 코드를 시도할 때 "유효하지 않은 API 키"라는 메시지를 받으면, 1시간에서 2시간 정도 기다린 후 다시 시도해보신 후 지원팀에 문의해보세요.

```python
import requests

def get_temp(location):
    # 여기에 API 키를 입력해주세요
    API_KEY = "YOUR_WEATHERMAP_API_KEY"
    
    # url을 저장할 base_url 변수
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    
    # 여기서 변수를 API_KEY에서 api_key로 수정했습니다
    complete_url = base_url + "appid=" + API_KEY + "&q=" + location
    
    # requests 모듈의 get 메소드를 사용하여 응답 객체를 리턴합니다
    response = requests.get(complete_url)
    x = response.json()
    
    # "cod" 키의 값이 "404"와 같은 경우는 도시가 발견된 경우이며,
    # 그렇지 않으면 도시가 발견되지 않은 것입니다
    if x["cod"] != "404":
        y = x["main"]
        # 온도를 켈빈에서 섭씨로 변환하여 가독성을 높입니다
        temp_celsius = y["temp"] - 273.15
        return temp_celsius
    else:
        return None
```

일반적으로 이를 호출하려면,

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
temp = get_temp("Edinburgh")
print(f"The current temperature in Edinburgh is {temp} degrees celcius")

>>
The current temperature in Edinburgh is 4.410000000000025 degrees celcius
```

다음 단계는 이 함수를 Claude에서 사용하는 방법을 설명하는 것입니다. 이를 위해 일반적으로 YAML이나 JSON을 사용하는 대신 XML을 사용합니다.

```js
tool = """
<tool_description>
    <tool_name>get_temp</tool_name>
    <description>
        특정 위치의 현재 온도를 찾는 함수입니다.
    </description>
    <parameters>
        <parameter>
            <name>location</name>
            <type>str</type>
            <description>온도를 확인할 위치</description>
        </parameter>
    </parameters>
</tool_description>
"""
```

이제 우리의 시스템 프롬프트를 설정해야 합니다. 이 프롬프트는 Claude에게 이 추가 기능(함수 호출을 통해)이 사용 가능하다는 것을 알려줍니다.

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
system_prompt = f"""
추가적인 하나 이상의 함수 세트에 액세스할 수 있습니다. 이 함수들을 사용하여 사용자의 질문에 답변할 수 있습니다.

다음과 같이 호출할 수 있습니다:
<function_calls>
    <invoke>
        <tool_name>$TOOL_NAME</tool_name>
        <parameters>
            <$PARAMETER_NAME>$PARAMETER_VALUE</$PARAMETER_NAME>
            ...
        </parameters>
    </invoke>
</function_calls>

다음과 같은 도구들을 사용할 수 있습니다:
<tools>{tool}</tools>
최종 답변은 '현재 <location>의 온도는 <temp>도입니다' 형식이어야 합니다.
"""
```

시스템 프롬프트가 정상적으로 작동하는지 Claude에게 전송하여 확인하세요. XML 형식의 함수 호출 세부 정보를 반환해야 합니다.

```js
client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

# 클라이언트 메시지 설정
# 모델에 물어볼 내용 설정
message = client.messages.create(
    model="claude-3-opus-20240229"
    max_tokens=1024,
    temperature=0.0,
    system=system_prompt,
    messages=[
        {"role": "user", "content": "에든버러의 현재 온도는 무엇입니까?"}
    system=system_prompt
)

print(message)


>>

<function_calls>
    <invoke>
        <tool_name>get_temp</tool_name>
        <parameters>
            <location>Edinburgh</location>
        </parameters>
    </invoke>
</function_calls>
```

잘 보입니다. 이제 우리는 get_temp 도구에 전달해야 하는 매개변수를 얻기 위해 도구 설명의 XML을 구문 분석하는 헬퍼 함수가 필요합니다.


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
import re
def extract_between_tags(tag: str, string: str, strip: bool = False) -> list[str]:
    ext_list = re.findall(f"<{tag}>(.+?)</{tag}>", string, re.DOTALL)
    if strip:
        ext_list = [e.strip() for e in ext_list]
    return ext_list

extracted_location = extract_between_tags("location", message, True)
extracted_tool_name = extract_between_tags("tool_name", message, True)

if extracted_location:
    first_param = extracted_location[0]
    function_to_call = extracted_tool_name[0]
    print(f"Extracted location: {first_param}")
    print(f"Extracted function to call: {function_to_call}")
    func = locals()[function_to_call]
    result = func(first_param)
else:
    print("No location found in the message.")


>>

추출된 위치: Edinburgh
호출할 함수: get_temp
```

다시 한 번, 그건 완벽해 보입니다. 이제 할 일은 최종 값으로 Claude에게 반환하는 것뿐입니다. 먼저, Claude가 예상하는 방식으로 형식을 지정하겠습니다. 즉, XML 형식으로.

```js
def construct_successful_function_run_injection_prompt(invoke_results):
    constructed_prompt = (
        "<function_results>\n"
        + '\n'.join(
            f"<result>\n<tool_name>{res['tool_name']}</tool_name>\n<stdout>\n{res['tool_result']}\n</stdout>\n</result>" 
            for res in invoke_results
        ) + "\n</function_results>"
    )
    
    return constructed_prompt

formatted_results = [{
    'tool_name': 'get_temp',
    'tool_result': result
}]

function_results = construct_successful_function_run_injection_prompt(formatted_results)
print(function_results)

>>

<function_results>
<result>
<tool_name>get_temp</tool_name>
<stdout>
4.81
</stdout>
</result>
</function_results>
```

다음으로, 원본 메시지, Claude가 함수를 호출한 부분까지의 부분 반환, 그리고 함수 결과를 결합하여 Claude에게 최종 출력을 생성하기 위한 프롬프트를 얻겠습니다. 이 작업을 용이하게 하기 위해 Assistant 역할에서 미리 작성된 메시지를 사용합니다.

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


partial_assistant_message = message + "</function_calls>" + function_results

final_message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        my_message,
        {
            "role": "assistant",
            "content": partial_assistant_message
        }
    ],
    system=system_prompt,
    stop_sequences=["\n\nHuman:", "\n\nAssistant", "</function_calls>"]
).content[0].text

print(final_message)

>>


The tool returned that the current temperature in Edinburgh is 4.81 degrees 
Celsius. 

Therefore, the final message is:

The current temperature in Edinburgh is 4.81 degrees Celsius.


만약 이 내용이 마음에 드셨다면, 아래 관련 기사들도 흥미로울 수 있습니다.
