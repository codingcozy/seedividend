---
title: "Python으로 WhatsApp에서 AI를 사용하여 자신 복제하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_0.png"
date: 2024-07-12 20:13
ogImage: 
  url: /TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_0.png
tag: Tech
originalTitle: "Cloning Yourself on WhatsApp with AI in Python"
link: "https://medium.com/@crisvelasquez/cloning-yourself-on-whatsapp-with-ai-in-python-7eea05f60fe6"
---



![Cloning Yourself on WhatsApp with AI in Python](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_0.png)

친구들, 가족, 동료들로부터 온 WhatsApp 메시지를 계속해서 따라갈 수 있는 자신을 복제할 수 있다면 얼마나 좋을까요? 이 글에서는 정확히 그렇게 해볼 것입니다.

우리는 여러분을 대신해 대화를 처리할 수 있는 챗봇을 만드는 방법을 보여드리겠습니다. OpenAI의 GPT 모델과 Twilio의 WhatsApp API를 사용하여 여러분의 채팅 스타일을 모방하고 이미지를 이해하여 여러분을 위해 대화할 수 있는 디지털 친구를 만들어볼 것입니다.

이 글의 구성은 다음과 같습니다:


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

# 1. 환경 설정

## 단계 1. Twilio에 가입하기

- Twilio 웹 사이트로 이동합니다.
- 무료 체험 계정을 등록합니다. $15의 무료 크레딧이 제공됩니다.
- 가입 프로세스 중에 이메일과 전화번호를 인증합니다.

## 단계 2. Twilio WhatsApp 샌드박스 설정

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

- Twilio 콘솔에 로그인합니다.
- ‘All Products & Services’ -> ‘Programmable Messaging’ -> ‘Try it Out’ -> ‘Try WhatsApp’로 이동합니다.
- WhatsApp 샌드박스를 설정하는 지침에 따릅니다. WhatsApp을 통해 Twilio 번호로 코드를 보내어 샌드박스에 참여합니다.
- 가입하고 나면 샌드박스 번호를 메모해 둡니다.

## 단계 3. Ngrok 설정

Ngrok은 로컬 개발 환경으로 안전한 터널을 생성하여 로컬 서버를 인터넷에 노출시킬 수 있는 도구입니다.

이는 Twilio와 같은 서비스와의 웹훅 통합을 테스트하는 데 특히 유용합니다.

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

1. ngrok을 ngrok.com/download에서 다운로드하세요.

2. 다운로드한 파일 압축 해제: 다운로드 후 ngrok 파일을 압축 해제하세요.

3. Ngrok 인증: ngrok을 사용하기 전에 ngrok 인증 토큰을 사용하여 인증해야 합니다. ngrok 대시보드에서 인증 토큰을 찾을 수 있습니다. 터미널이나 명령 프롬프트를 열고 다음 명령을 실행하여 ngrok 인증 토큰을 실제 ngrok 인증 토큰으로 바꿔치기하세요: 

[2024-07-12-CloningYourselfonWhatsAppwithAIinPython_1.png](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_1.png)

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

4. 포트 5000을 터널링하기 위해 Ngrok 실행: Flask 애플리케이션은 일반적으로 기본적으로 포트 5000에서 실행됩니다. 따라서 이 포트를 터널링할 필요가 있습니다. 터미널이나 명령 프롬프트에서 ngrok이 위치한 디렉토리로 이동한 후 다음 명령을 실행하세요:

```js
ngrok http 5000
```

만약 이 명령이 작동하지 않는다면, 대신 다음 명령을 시도해보세요:

```js
./ngrok http 5000
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


![이미지](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_2.png)

5. 전달 URL 주의: ngrok가 실행되면 https://12345.ngrok.io와 같은 전달 URL을 제공합니다. 이 URL은 WhatsApp에서 수신된 메시지를 받기 위해 Twilio 구성에서 웹훅 URL로 사용됩니다.

중요 사항:

- 애플리케이션을 테스트하는 동안 ngrok를 계속 실행하십시오. ngrok를 중지하면 전달 URL이 작동하지 않게 되며 새로운 전달 URL로 Twilio의 웹훅 URL을 업데이트해야 합니다.
- 무료 버전의 ngrok는 임시 URL을 제공하며, ngrok를 다시 시작할 때마다 변경됩니다. 장기간 테스트 또는 개발에 안정적인 URL이 필요한 경우 유료 ngrok 플랜으로 업그레이드를 고려해보세요.


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

## 단계 4. Twilio 샌드박스 설정하기

- Twilio 콘솔의 WhatsApp 샌드박스로 돌아갑니다.
- ngrok URL 다음에 /whatsapp 엔드포인트가 이어지도록 '메시지 수신 시' 웹훅을 구성합니다. https://12345.ngrok.io/whatsapp와 같은 형식이어야 합니다. 아래 이미지를 참고하세요.
- 변경 사항을 저장하세요.

![이미지](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_3.png)

## 단계 5. Twilio 자격 증명 얻기

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

Twilio 대시보드에서 "설정"으로 이동하여 "계정 SID" 및 "인증 토큰"을 메모해주세요. 이 정보는 Python에서 API 요청을 인증하는 데 사용됩니다.

![이미지](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_4.png)

## 단계 6. OpenAI API 자격 증명 획득

OpenAI의 모델과 상호 작용하려면 API 자격 증명을 획득해야 합니다. 이를 통해 요청이 인증됩니다.

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

<img src="/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_5.png" />

# 2. Python Automation Script

## 2.1. Install Python Libraries

코딩을 시작하기 전에 몇 가지 라이브러리를 설치해야 합니다. 터미널이나 명령 프롬프트를 열고 다음 명령을 입력하세요:

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
pip install flask twilio openai
```

## 2.2. Python에서 자격 증명 설정

이제 코드 편집기에서 자격 증명을 설정할 차례입니다. 단순함을 위해 VS Code 안의 Jupyter Notebook을 사용하고 있습니다.

플레이스홀더를 실제 Twilio 및 OpenAI 자격 증명으로 교체해주세요.


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

```python
from flask import Flask, request
from twilio.rest import Client
import openai
import requests
from requests.auth import HTTPBasicAuth
import base64
import os

# Twilio credentials
account_sid = ''
auth_token = ''
twilio_number = 'whatsapp:+14155238886'
twilio_client = Client(account_sid, auth_token)
# OpenAI API Key
openai_api_key = ''
```

## 2.3. 플라스크 어플리케이션 설정

우리는 Flask를 사용하여 웹 서버를 생성하여 새로운 WhatsApp 메시지가 도착할 때 Twilio가 호출할 수 있는 URL 엔드포인트(라우트)를 정의하는데 사용합니다. 

파이썬 파일의 자격 증명들 아래에서 Flask 어플리케이션을 초기화하고 업로드를위한 디렉토리를 설정합니다.


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

```python
app = Flask(__name__)

uploads_dir = 'uploads'
os.makedirs(uploads_dir, exist_ok=True)
```

이 코드 라인은 Flask 클래스의 인스턴스를 생성합니다. __name__은 Python의 특별한 변수로, 모듈로 import되었을 때는 모듈의 이름을 가리키지만, 스크립트가 직접 실행될 때는 `__main__`으로 설정됩니다.

Flask 및 첫 Flask 애플리케이션을 설정하는 방법에 대해 더 많이 알아 보려면 공식 Flask 문서를 참조하십시오.

## 2.4. 트위리오(Twilio)와 WhatsApp 통합하기

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

Twilio는 WhatsApp과 프로그래밍적으로 상호 작용하는 간편한 방법을 제공합니다. Twilio의 WhatsApp 샌드박스를 사용하면 WhatsApp 비즈니스 API를 직접 설정해야 하는 복잡성 없이 메시지를 보내고 받을 수 있습니다.

WhatsApp 번호에서 메시지를 받을 때마다 Twilio는 Flask 앱에서 지정한 라우트로 HTTP POST 요청을 보냅니다. 그런 다음 Flask 앱은 이 메시지를 처리합니다.

WhatsApp을 Twilio와 통합하려면 SMS, 음성, 비디오, 이메일 및 WhatsApp과 같은 메시징 앱을 통해 통신을 관리하는 일련의 도구를 제공하는 Twilio API를 사용합니다.

여기 작동 방식의 간소화된 개요입니다:

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

- 플라스크 애플리케이션은 서버에서 실행되며 특정 경로에서 수신되는 HTTP POST 요청을 수신합니다.
- Twilio는 WhatsApp 번호가 메시지를 수신할 때마다 해당 경로로 HTTP POST 요청을 보냅니다.
- 서버는 요청을 처리하고 (메시지에 회신하는 등) Twilio에 다시 응답합니다.

Twilio와 WhatsApp을 통합하려면 WhatsApp용 Twilio API 문서를 참조하십시오.

이미지와 같은 미디어 메시지를 처리하려면 Twilio가 요청할 때 보내는 MediaUrl 매개변수를 처리해야 합니다.

이러한 URL은 서버에서 가져와 처리할 수 있는 미디어 콘텐츠를 가리킵니다.

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

Twilio를 사용하여 미디어 메시지를 수신하는 방법에 대한 자세한 내용은 Twilio를 사용하여 미디어 메시지를받는 섹션을 참조하십시오.

```js
@app.route("/whatsapp", methods=['POST'])
def reply_whatsapp():
    # 여기서 수신된 메시지를 처리합니다
    pass
```

## 2.5. 수신된 메시지 처리하기

reply_whatsapp 함수 내에서 수신된 메시지를 처리하고 그것들을 저장할 위치를 설정하기 시작하세요.

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

플라스크에서 수신 메시지를 처리하려면 다음을 수행해야 합니다:

- 새 메시지가 도착했을 때 Twilio가 호출할 수 있는 라우트를 정의합니다.
- 요청에서 메시지 내용 및 발신자 정보를 추출합니다.
- 메시지 내용에 따라 어떻게 응답하거나 작동할지 결정합니다.

저희 경우, 자동 챗봇을 구축 중이므로 수신 메시지에서 텍스트나 미디어 URL을 가져와 응답을 생성할 예정입니다.

이러한 수신 메시지를 처리하는 방법에 대한 자세한 내용은 Twilio의 메시지 수신 및 답장 가이드를 확인해주세요.

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
conversation_histories = {}

@app.route("/whatsapp", methods=['POST'])
def reply_whatsapp():
    incoming_msg = request.values.get('Body', '').lower()
    from_number = request.values.get('From')
    user_history = conversation_histories.get(from_number, [])
    # We will continue to build on this function
    return 'OK', 200
```

## 2.6. OpenAI의 GPT 모델 통합

다음과 같은 두 가지 목적으로 OpenAI의 두 모델을 사용할 것입니다:

- 텍스트용 GPT-4: 이러한 모델은 입력에 기반하여 인간과 같은 텍스트를 이해하고 생성할 수 있습니다. WhatsApp 봇의 맥락에서는 텍스트 메시지에 대한 답변을 생성하는 데 사용할 수 있습니다.
- 이미지용 GPT-4 비전: 이미지와 같은 미디어를 처리할 때 모델의 비전 기능을 사용하여 이미지의 내용을 이해하고 설명을 제공할 수 있습니다.

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

대화를 관리하기 위해 각 채팅의 컨텍스트를 저장하기 위해 conversation_histories 사전을 사용합니다.

이렇게 하면 사용자로부터 메시지를 받을 때 사용자의 대화 기록을 새 메시지와 함께 OpenAI에 전송하여 모델이 일관된 응답을 생성할 수 있게 됩니다.

## 2.7. 대화 기록 구축하기

대화 기록을 유지하는 것은 우리의 AI가 상호 작용 과정에서 더 일관되고 관련성 있는 응답을 생성할 수 있도록 컨텍스트를 유지하는 데 도움이 됩니다.

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

어떻게 만들까요:

- 각 대화를 송신자의 번호를 키로 사용하여 사전(dictionary)에 저장합니다.
- 새로운 메시지를 대화 기록에 추가한 후 OpenAI의 API로 전송합니다.
- API 요청마다 대화 기록이 함께 전달되도록 합니다.

## 2.8. 완성된 코드

이제 모든 것을 완성된 코드로 조합해 봅시다. 다음은 전체 스크립트가 어떻게 보일지에 대한 자세한 설명이 포함된 것입니다:

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

```python
from flask import Flask, request
from twilio.rest import Client
import openai
import requests
from requests.auth import HTTPBasicAuth
import base64
import os

app = Flask(__name__)

# Twilio credentials
account_sid = ''
auth_token = ''
twilio_number = ''
twilio_client = Client(account_sid, auth_token)

# OpenAI API Key
openai_api_key = ''

# Ensure the 'uploads' directory exists
uploads_dir = 'uploads'
os.makedirs(uploads_dir, exist_ok=True)

conversation_histories = {}

@app.route("/whatsapp", methods=['POST'])
def reply_whatsapp():
    incoming_msg = request.form.get('Body', '').lower()
    media_url = request.form.get('MediaUrl0')
    from_number = request.form.get('From')
    message_sid = request.form.get('MessageSid')

    # Prepare the headers for OpenAI API
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai_api_key}"
    }

    # Get the user's conversation history, if it exists
    user_history = conversation_histories.get(from_number, [])

    if media_url:
        # Process as an image
        print('Image URL detected, attempting to retrieve the image...')
        response = requests.get(media_url, auth=HTTPBasicAuth(account_sid, auth_token))
        if response.status_code == 200:
            # Save the image to a file in the 'uploads' directory
            image_path = os.path.join(uploads_dir, f'{message_sid}.png')
            with open(image_path, "wb") as image_file:
                image_file.write(response.content)

            # Encode the image in base64
            base64_image = encode_image(image_path)

            # Prepare the payload for the OpenAI API
            payload = {
                "model": "gpt-4-vision-preview",  # Use the correct model name for images
                "messages": user_history + [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 300
            }

            # Send the request to the OpenAI API
            openai_response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            description = openai_response.json().get('choices')[0].get('message').get('content') if openai_response.ok else "Failed to get a description from OpenAI."
            
            # Update the user's conversation history with the image description
            user_history.append({"role": "assistant", "content": description})
            conversation_histories[from_number] = user_history

            # Respond back on WhatsApp with the description
            twilio_client.messages.create(
                body=description,
                from_=twilio_number,
                to=from_number
            )
        else:
            print('Failed to retrieve the image.')
    else:
        # Process as text
        print('No image URL found, processing text...')
        payload = {
            "model": "gpt-4",  # Use the appropriate model for text
            "messages": user_history + [
                {
                    "role": "user",
                    "content": incoming_msg
                }
            ],
            "max_tokens": 300
        }
        # Send the request to OpenAI API for text messages
        openai_response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response_text = openai_response.json().get('choices')[0].get('message').get('content') if openai_response.ok else "Failed to get a response."

        # Update the user's conversation history
        user_history.append({"role": "assistant", "content": response_text})
        conversation_histories[from_number] = user_history

        # Respond back on WhatsApp with the text response
        twilio_client.messages.create(
            body=response_text,
            from_=twilio_number,
            to=from_number
        )

    return 'OK', 200

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
``` 

# 3. OpenAI 어시스턴트로 자동화하기

이 섹션에서는 개인 대화 스타일을 모방하고 Twilio와 통합하며 텍스트 및 이미지 메시지를 처리하는 OpenAI 어시스턴트를 생성하는 방법에 대해 알아보겠습니다.

OpenAI 어시스턴트 사용의 장점은 더 정확하게 파일을 첨부하고 동작을 수정하여 개인 커뮤니케이션 스타일을 가장 유사하게 모방할 수 있다는 데 있습니다.

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

## 3.1 대화 기록 정리하기

대화 스타일을 모방할 수 있는 OpenAI 어시스턴트를 만들기 위해 WhatsApp 대화 기록을 정리해야 합니다.

이것이 중요한 이유는 어시스턴트가 개인의 의사 소통 스타일과 일관된 방식으로 응답하는 방법을 배우기 위해 이 기록을 사용하기 때문입니다.

고려해야 할 주요 사항:

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

## 3.2 특정 사람의 대화 스타일을 복제할 수 있는 Open AI 어시스턴트 생성

특정 사람의 대화 스타일을 과거 채팅 데이터를 기반으로 재현할 수 있는 AI 어시스턴트를 만드는 방법:

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

- WhatsApp 대화 기록을 구문 분석하고 OpenAI가 훈련에 사용할 수 있는 형식으로 변환합니다.
- openai.File.create() 메서드를 사용하여 이 대화 기록을 OpenAI에 업로드하고 이를 사용하여 사용자 정의 어시스턴트를 훈련시킵니다.
- openai.Assistant.create()를 사용하여 업로드한 파일을 어시스턴트의 훈련 참조로 제공하여 어시스턴트를 생성합니다.

고려 사항:

- 어시스턴트는 AI 성격을 드러내지 않아야 하며, 인간과 유사한 상호 작용의 환영을 유지해야 합니다.
- 이미지 설명을 포함한 다양한 입력을 처리하여 대화를 원활하게 이어가야 합니다.

```js
import openai
from openai import OpenAI

def parse_whatsapp_history(file_path):
    # WhatsApp 채팅 기록을 구문 분석하는 함수

# OpenAI API 키 설정
openai.api_key = ''

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=openai.api_key)

# WhatsApp 대화 기록 구문 분석
whatsapp_messages = parse_whatsapp_history(r"WhatsApp Conversation between Alex.txt")

# WhatsApp 메시지를 파일로 업로드
file = client.files.create(
    file=open(r"WhatsApp Conversation between Alex.txt", 'rb'),
    purpose='assistants'
)

instructions = (
    "당신은 Alex입니다. WhatsApp 기록을 기반으로 Alex의 대화 스타일을 모방합니다."
    "반드시 AI임을 밝히지 마십시오."
    "가끔 이미지 설명을 받을 수 있습니다."
    "대화에 자연스럽게 이 설명을 통합하고 어떠한 파일의 존재에 대해 언급하지 않습니다."
    "이미지를 직접 본 것처럼 행동합니다."
    "대화의 흐름을 유지합니다."
)

# 검색 도구가 활성화된 사용자 정의 어시스턴트 생성
assistant = client.beta.assistants.create(
    name="나의 WhatsApp 클론",
    instructions=instructions,
    # 모델
    # 파일
    # 도구
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

OpenAI 어시스턴트를 사용하여 WhatsApp 대화를 자동화하는 방법을 자세히 살펴보고 싶은 분들을 위해 www.entreprenerdly.com에서 상세한 안내가 제공되고 있어요:

![이미지](/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_6.png)

## 3.3 Twilio와 어시스턴트 통합

훈련된 OpenAI 어시스턴트를 Twilio API와 통합하여 WhatsApp 메시지에 응답하도록 설정하는 것에 대해 알아봐요.

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

통합하는 방법:

- Flask를 사용하여 Twilio가 새 메시지를 수신할 때 HTTP POST 요청을 보낼 수 있는 웹 서버를 생성합니다.
- Flask 라우트 핸들러를 사용하여 수신된 메시지 및 미디어를 처리합니다.
- openai.Completion.create()를 사용하여 텍스트 응답 또는 openai.Image.create()를 사용하여 이미지 처리를 위해 OpenAI 어시스턴트와 상호 작용합니다.
- Twilio의 메시징 API를 통해 어시스턴트의 응답을 사용자에게 보냅니다.

주요 통합 단계:

- Flask 앱에 Twilio에서의 POST 요청을 처리할 수 있는 라우트를 설정합니다 (/whatsapp으로 코드에서).
- requests 라이브러리를 사용하여 Twilio 번호로 보낸 이미지를 검색하고 OpenAI API와 상호 작용합니다.
- 어시스턴트로부터 응답을 사용자에게 보내기 위해 대화 기록을 유지합니다.

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

```python
from flask import Flask, request
from twilio.rest import Client
import openai
import requests
from requests.auth import HTTPBasicAuth
import base64
import os
import time

app = Flask(__name__)

# Twilio credentials
account_sid = ''
auth_token = ''
twilio_number = 'whatsapp:+14155238886'
twilio_client = Client(account_sid, auth_token)

# OpenAI API Key
openai_api_key = ''

# Ensure the 'uploads' directory exists
uploads_dir = 'uploads'
os.makedirs(uploads_dir, exist_ok=True)

conversation_histories = {}

# Initialize the OpenAI client
client = openai.OpenAI(api_key=openai_api_key)

# Create the custom assistant (replace 'assistant_id' with your actual assistant ID)
assistant_id = assistant.id #'asst_g5yiS6TewzdO75JSrBuNBwEV'

@app.route("/whatsapp", methods=['POST'])
def reply_whatsapp():
    # Function to handle incoming WhatsApp messages

def interact_with_assistant(assistant_id, message_content, image_path=None):
    # Function to interact with assistant using text and images

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
```

## 4. Further Practical Applications

알아봤던 OpenAI와 Twilio를 사용하여 WhatsApp 대화를 자동화하는 기술은 개인 메시지 이상의 폭넓은 실용적인 응용 프로그램을 갖고 있습니다. 이 기술이 어떻게 적응되고 다른 시나리오에서 적용될 수 있는지 살펴보겠습니다:

### 4.1 고객 지원 자동화

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

자주 묻는 질문과 흔한 문제에 대한 대답을 자동화하여 고객 지원의 응답 시간과 효율성을 높일 수 있습니다.

구현 방안:

- 지난 고객 서비스 상호작용에 대한 AI 모델을 세밀하게 조정하여 일반적인 쿼리를 처리합니다.
- CRM 시스템과 통합하여 고객 이력을 기반으로 개인화된 응답을 제공합니다.
- 복잡한 문제가 발생할 때에는 인적 에이전트들에게 일을 넘깁니다.

자원:
이미 개발된 솔루션을 사용하려면 Salesforce의 AI 기반 고객 관계 관리 솔루션인 Einstein AI를 확인해보세요.

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

## 4.2 전자 상거래 챗봇

제품 추천, 재고 업데이트 및 주문 추적을 제공할 수 있는 인공 지능 챗봇을 활용하여 온라인 쇼핑 경험을 향상시킵니다.

구현:

- 실시간 정보를 제공하기 위해 전자 상거래 플랫폼의 데이터베이스와 상호 작용하는 챗봇을 개발합니다.
- 대화형 인공 지능을 사용하여 고객이 구매 프로세스를 안내하거나 상품을 업셀링/크로스셀링 할 수 있습니다.
- 채팅 인터페이스를 통해 사용자가 주문을 직접 할 수 있도록 거래 기능을 구현합니다.

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

리소스:
이미 개발된 솔루션을 위해 Magento와 Shopify은 AI를 전자 상거래 플랫폼에 통합하기 위한 API 및 개발자 리소스를 제공합니다.

## 4.3 정신 건강 지원

자동화된 공감 표현 응답을 통해 예비 정신 건강 지원 및 위기 대응을 제공합니다.

구현:

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

- AI를 프로그램하여 정신 건강에 대한 언어를 인식하고 지원 자원을 제공하도록 합니다.
- 기밀을 보장하고 전문적인 도움 링크를 제공합니다.
- 상황의 긴급성을 판단하기 위해 감정 분석을 사용하고 필요시 인간 상담자에게 경고할 수 있습니다.

자원:
이미 개발된 솔루션에 대해 Woebot 등의 AI 기반 정신 건강 플랫폼을 참고하여 학습하십시오.

## 4.4 교육 튜터 및 언어 학습

컨셉을 설명하고 질문에 답변하며 언어 학습을 돕는 대화형 AI로 교육 자료를 보강하세요.

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

구현:

- 교육 콘텐츠에 특화된 도우미를 만들어 숙제와 시험 준비를 돕습니다.
- 사용자와 대화하여 실수를 바로 잡고 개선점을 제안하는 언어 학습 봇을 구축합니다.

자원:
이미 개발된 솔루션을 찾으려면 Duolingo의 언어 연습용 챗봇을 살펴보세요.

## 4.5 이벤트 계획과 알림

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

친절한 톤으로 번역해보겠습니다.

캘린더를 관리하는 데 도움을 주어 이벤트 계획을 자동화하고 리마인더를 보내며 약속을 재스케줄링할 수 있습니다.

구현:

- 캘린더 API와 동기화하여 사용자가 WhatsApp을 통해 이벤트를 추가하고 쿼리할 수 있도록 합니다.
- 대화에서 날짜와 시간 참조를 이해하기 위해 자연어 처리를 사용합니다.

자원:
이미 개발된 솔루션의 경우 Google Calendar API는 이벤트를 프로그래밍 방식으로 관리하는 기능을 제공합니다.

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

# 5. 도전과 한계

오픈 에이 아이(OpenAI)와 트윌리오(Twilio)를 사용하여 WhatsApp 대화를 자동화하는 것은 여러 이점을 제공하지만, 발생할 수 있는 도전과 한계를 인식하는 것이 중요합니다.

## 5.1 프라이버시와 보안에 대한 고려 사항

도전: 민감한 개인 데이터를 처리하는 것은 개인정보 보호 법 및 보안 조치를 엄격히 준수하여 데이터 침해를 방지해야 합니다.

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

고려 사항:

- GDPR 및 HIPAA와 같은 규정 준수 보장
- 데이터 전송 및 저장을 위해 end-to-end 암호화 구현
- 새로운 위협에 대비하기 위해 보안 프로토콜을 정기적으로 감사 및 업데이트

## 5.2 대화 맥락과 일관성

도전 과제: AI 모델이 긴 또는 복잡한 대화에서 맥락과 일관성을 유지하는 것은 도전적일 수 있습니다.

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

고려 사항:

- 고급 자연 언어 처리 기술을 활용하여 맥락을 이해합니다.
- 계속해서 새로운 데이터로 모델을 훈련하여 일관성을 유지하는 능력을 향상시킵니다.
- AI가 일관된 응답을 제공할 수 없는 상황을 우아하게 처리하기 위한 후행 메커니즘을 구현합니다.

## 5.3 모호함과 오해 다루기

도전: 자연어는 종종 모호하며, AI 모델은 사용자 의도나 감정을 오해할 수 있습니다.

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

고려해야 할 사항:

- 메시지의 감정적 톤을 더 잘 이해하기 위해 감성 분석을 사용하세요.
- 모호성을 해소하고 정확한 응답을 보장하기 위해 명확한 질문을 사용하세요.
- 반복되는 문제를 식별하고 수정하기 위해 AI 응답을 정기적으로 모니터링하고 검토하세요.

## 5.4 확장성 및 성능

도전 과제: 사용자 수가 증가함에 따라 성능과 확장성을 유지하는 것이 어려워질 수 있습니다.

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

고려해야 할 사항:

- 고효율로 대량의 요청을 처리하기 위해 백엔드 인프라를 최적화합니다.
- 수요 변동을 관리하기 위해 로드 밸런싱과 자동 확장을 구현합니다.
- 시스템 성능을 정기적으로 모니터링하고 필요에 따라 조정합니다.

## 5.5 윤리적 및 사회적 영향

과제: AI의 개인 커뮤니케이션에서 윤리적 문제가 발생할 수 있습니다. 예를 들어 사람을 흉내내거나 인간 상호작용의 침해가 될 수 있습니다.

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

고려사항:

- 사용자에게 AI 사용 사실을 명확히 알리고 동의를 받습니다.
- 사용자의 복지와 개인정보 보호를 우선시하는 책임 있는 AI 사용을 위한 지침을 개발합니다.
- 윤리적 우려를 다루고 사회 기대에 적응하기 위해 이해 관계자와 지속적인 대화에 참여합니다.

## 5.6 기술적 제약사항

과제: 현재 AI 모델은 복잡한 언어 뉘앙스, 관용구 및 문화적 언급을 이해하는 데 제약이 있습니다.

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

고려 사항:

- 언어 능력을 향상시키기 위해 AI 모델을 지속적으로 업데이트하고 개선합니다.
- 다양한 교육 데이터를 통합하여 모델이 다양한 언어와 문화를 이해하도록 합니다.
- AI의 능력과 한계에 대해 사용자들에게 현실적인 기대를 설정합니다.

# 마무리

자신을 복제하는 개념은 의사 소통을 관리하는 것을 넘어, 자동으로 작동할 수 있는 대체 디지털 존재를 만드는 것입니다. 언젠가 그 대체 존재가 우리 대신에 일과 개인 생활의 측면을 처리할 수도 있습니다.

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

기술, 철학적 및 규제적 도전 과제로 가득한 여정은 신중하게 탐색되어야 합니다. 인상적인 기술이기는 하지만 결함이 없는 것은 아니며, 배치되는 과정은 주의 깊게 그리고 전망을 내다보는 마음가짐으로 다뤄져야 합니다.

읽어 주셔서 감사합니다. 만약 이 기사가 유익하다고 생각되시면 👏를 눌러서 향후 콘텐츠를 지원해 주시기 바랍니다.

Entrepren erdly.com에서는 행동 가능한 지식으로 권한을 부여하는 튜토리얼, 코드 및 전략 전체 스위트를 제공합니다.

<img src="/TIL/assets/img/2024-07-12-CloningYourselfonWhatsAppwithAIinPython_7.png" />

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

# 관련 기사: