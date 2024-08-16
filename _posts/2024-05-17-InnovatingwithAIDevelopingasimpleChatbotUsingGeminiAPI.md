---
title: "Gemini API를 활용한 간단한 챗봇 개발하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_0.png"
date: 2024-05-17 03:21
ogImage: 
  url: /assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_0.png
tag: Tech
originalTitle: "Innovating with AI: Developing a simple Chatbot Using Gemini API"
link: "https://medium.com/@nencyvpatel3010/innovating-with-ai-developing-a-simple-chatbot-using-gemini-api-4589b531cc3e"
isUpdated: true
---




<img src="/assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_0.png" />

요즘 빠르게 변화하는 세상에서 모두가 빠른 답변을 기대합니다. 그래서 많은 회사들이 챗봇을 사용합니다 - 사람들을 즉시 도와주고 대화할 수 있는 스마트 프로그램입니다. 개발자가 더 똑똑한 챗봇을 만들 수 있도록 도와주는 Gemini API를 사용해 간단한 챗봇을 만들었습니다. 이 블로그 포스트에서 제가 어떻게 챗봇을 만들었는지 단계별로 안내할 거에요. 사용한 도구와 방법도 공유할게요.

이 프로젝트에서는 효율적이고 확장 가능한 웹 애플리케이션을 만드는 데 개발자들 사이에서 인기 있는 두 가지 도구인 Node.js와 Express를 사용하기로 결정했습니다. Node.js는 서버 측에서 JavaScript를 실행하는 강력한 플랫폼을 제공하여 여러 연결을 쉽게 처리할 수 있게 해줍니다. Express는 유연한 Node.js 웹 애플리케이션 프레임워크로, 쉽게 서버 설정을 구축하고 라우트를 관리하며 요청을 처리하고 사용자에게 응답을 보낼 수 있는 도구를 제공했습니다.

챗봇의 핵심 인텔리전스는 Gemini API에서 왔습니다. 이 강력한 API를 통해 챗봇은 사용자의 언어를 처리하고 이해하는 능력을 갖추어 사용자와 의미 있는 대화를 할 수 있게 됩니다. API의 기능을 통해 자연어 이해와 동적 응답 생성과 같은 기능을 구현할 수 있었는데, 이는 사용자를 효과적으로 지원하는 챗봇을 만드는 데 필수적인 요소입니다.

<div class="content-ad"></div>

이제 이를 구현해 보겠습니다. 단계를 나눠서 진행할 텐데, 첫 번째 단계는 다음과 같습니다:

1. API 설정:

저는 Gemini 플랫폼에 등록하고 API 키를 발급받았어요. 이 API 키는 API 기능에 액세스하기 위해 필요한 고유 식별자에요. Gemini API를 챗봇에 통합하기 전에 해당 플랫폼에서 액세스를 설정해야 해요. 이를 위해 애플리케이션이 요청을 인증하는 데 사용할 API 키를 만들어야 해요. 시작하는 방법은 다음과 같아요:

- Gemini API 문서 방문: 먼저 Gemini API 문서 페이지로 이동하세요. 이 웹사이트에는 API가 작동하는 방식과 설정하는 방법에 필요한 모든 정보가 제공돼요.
- API 키 생성: Gemini API 사이트에 들어가시면, 등록 또는 로그인하는 방법을 따라주세요. 로그인한 후에 API 관리 섹션으로 이동하면 새 API 키를 생성할 수 있는데, 이 키는 Node.js 애플리케이션에서 Gemini API로 요청을 보내는 데 필수적인 요소에요.
- API 키 보안: API 키를 안전하게 보관해야 해요. 클라이언트 측 코드에서 노출되지 않도록 주의하고, 적절한 보안 수단(환경 변수 또는 비밀 관리 도구)을 사용하지 않고 애플리케이션 코드베이스에 직접 저장하지 말아주세요.

<div class="content-ad"></div>

2. 프로젝트 구조:

- node_modules/: 모든 npm 종속성이 포함되어 있습니다.
- public/: 클라이언트 측의 CSS 및 JavaScript와 같은 정적 파일이 저장됩니다.
- css/style.css: 프론트엔드에 대한 사용자 정의 스타일입니다.
- js/script.js: 프론트엔드 논리를 처리합니다.
- views/: 특히 사용자 인터페이스용 index.html과 같은 HTML 파일이 포함되어 있습니다.
- .gitignore: 버전 관리에서 무시할 파일 및 디렉토리가 지정됩니다.
- config.env: 환경 변수와 API 키를 안전하게 저장합니다.
- index.js: Express 서버를 구성하고 실행하는 주요 서버 파일입니다.
- package.json 및 package-lock.json: 프로젝트 종속성을 관리하고 특정 버전에 잠급니다.
- Readme.md: 프로젝트 설명서 및 설정 지침을 제공합니다.

이 설정은 구조화된 Node.js 및 Express 애플리케이션에 패키지된 Gemini API를 사용하여 반응형 및 상호작용형 챗봇을 개발하는 견고한 기반을 제공합니다.

3. 서버 구성

<div class="content-ad"></div>

프로젝트의 이 부분에서는 Node.js와 Express를 사용하여 서버를 설정했습니다. 이 서버는 우리의 챗봇의 핵심 역할로서 요청을 처리하고 Gemini API를 통해 응답을 보내는 역할을 합니다. 서버 설정 및 구성을 단계별로 살펴보겠습니다.

먼저 Express 및 HTTP를 사용하여 서버를 초기화합니다. 이는 애플리케이션의 네트워킹 측면을 처리하는 데 필수적입니다. 이 프로젝트에 적합한 유연하고 미니멀한 구조를 가진 Express 프레임워크를 사용합니다.

```js
const express = require('express');
const http = require('http');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
```

또한 JSON 바디를 구문 분석하고 정적 파일을 제공하는 필수적인 미들웨어를 설정하여 서버가 들어오는 요청을 이해하고 HTML, CSS 및 JavaScript 파일을 올바르게 제공할 수 있도록 합니다:

<div class="content-ad"></div>

```js
app.use(express.json());
app.use(express.static(__dirname + '/views'));  // HTML 파일 제공
app.use(express.static(__dirname + '/public')); // JS, CSS, 이미지 제공
```

Gemini API와 통합

저희 서버의 주요 기능은 /chat 엔드포인트로의 POST 요청 처리입니다. 여기서 사용자 입력을 받아들이고 처리합니다. 요청 처리는 다음과 같이 설정되어 있습니다:

```js
app.post('/chat', async (req, res) => {
    if (!req.body) {
        return res.status(400).send('요청 본문이 없습니다');
    }

    console.log(req.body.text, "reqq");

    try {
        const apiKey = process.env.APIKEY;  // API 키 안전하게 액세스
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const postData = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": req.body?.text
                        }
                    ]
                }
            ]
        };

        const response = await axios.post(apiUrl, postData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data });
        
    } catch (error) {
        
        res.status(500).send('응답 가져오기 실패');
    }
});
```

<div class="content-ad"></div>

이 세그먼트에서는 사용자의 텍스트를 추출하고 적절한 JSON 페이로드를 구성하여 Axios를 사용하여 Gemini API로 보내 POST 요청을 처리합니다. 그런 다음 API의 응답을 다시 사용자에게 반환합니다.

서버 시작

마지막으로, 지정된 포트에서 서버를 수신 대기 상태로 만들어들어오는 연결을 처리할 준비가 되도록합니다:

```js
const port = 5000;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
```

<div class="content-ad"></div>

이 설정은 챗봇의 백엔드 핵심을 구성하며 사용자 쿼리를 효율적으로 처리하고 응답하는 데 도움이 됩니다. Node.js와 함께 Express를 사용하여 요청을 비동기적으로 처리하고 외부 API와 안전하게 통신하는 견고한 서버를 구축했습니다.

3. 클라이언트 측 구성

우리의 챗봇을 위해 사용자 친화적이고 매력적인 인터페이스를 만들기 위해 HTML 및 JavaScript의 설정을 간소화했습니다. 사용자 입력을 처리하고 응답을 효과적으로 표시하는 데 이 구성은 필수적입니다.

우리의 웹 페이지는 기능과 사용성에 중점을 두고 직관적으로 설계되었습니다. 우리 index.html에는 다음 코드 스니펫이 있습니다:

<div class="content-ad"></div>

```js
<!-- 기본 입력 상자 및 버튼 설정 -->
<input type="text" id="userInput" placeholder="무엇인가를 말해보세요...">
<button onclick="sendMessage()" id="sendBtn">보내기</button>
<p id="response">여기에 응답이 나타납니다...</p>
```

이러한 요소들은 사용자가 챗봇과 상호 작용할 수 있는 필요한 인터페이스를 제공합니다. 스타일링을 위해 외부 CSS 파일에 링크되어 있으며 논리 처리를 담당하는 JavaScript 파일과도 연결되어 있습니다.

우리의 JavaScript 파일 Script.js는 사용자 입력을 캡처하고 서버와 상호 작용하며 챗봇의 응답을 표시하는 데 중요합니다:

```js
function sendMessage() {
    const userInput = document.getElementById('userInput').value; // 사용자 입력 캡처
    document.getElementById('response').innerText = '봇: 입력 중...'; // 대기하는 동안의 피드백

    // 데이터를 서버로 전송하고 응답을 처리
    fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = `봇: ${data.reply}`;
    })
    .catch(error => {
        console.error('에러:', error);
        document.getElementById('response').innerText = '에러: 챗봇과 통신할 수 없습니다';
    });
}
```

<div class="content-ad"></div>

이 스크립트는 사용자 메시지가 서버로 전송되고 챗봇 응답이 신속하고 효과적으로 표시되도록 보장합니다.

CSS의 세부사항은 여기에 자세히 나와 있지 않지만, 스타일은 채팅 인터페이스가 다양한 기기에서 접근 가능하고 미적으로 매력적으로 표시되도록 합니다. 레이아웃은 데스크톱 및 모바일 사용자 모두에게 부드럽게 조정되어 일관된 사용자 경험을 유지합니다.

3. Postman을 사용한 챗봇 API 테스트

챗봇을 대중에 출시하기 전에 서버가 요청과 응답을 올바르게 처리하는지 확인하는 것이 중요합니다. 이를 위해 우리는 Postman을 사용합니다. 이 강력한 도구를 사용하면 클라이언트 요청을 시뮬레이션하고 API 기능을 테스트할 수 있습니다.

<div class="content-ad"></div>

- 요청 구성:

- 서버가 /chat 엔드포인트에서 POST 요청을 예상하므로 메서드를 POST로 설정합니다.
- 챗봇 API 엔드포인트의 URL을 입력하세요. 로컬에서 테스트하는 경우 http://localhost:5000/chat와 비슷할 수 있습니다.

2. 헤더 및 본문 설정:

- 헤더 아래에서 Content-Type을 application/json으로 설정하여 서버에게 JSON 데이터를 전송한다고 알립니다.
- 본문 섹션에서 'raw'를 선택하고 text 키와 사용자 입력을 나타내는 값을 가진 JSON 객체를 입력합니다. 예를 들어 '"text": "안녕, 챗봇!"'과 같이 입력하세요.

<div class="content-ad"></div>

3. 요청 보내고 응답 분석하기:

- "보내기" 버튼을 클릭하여 챗봇 서버에 요청을 제출하세요. 반환되는 응답을 관찰해보세요.

## Gemini API를 활용한 간단한 AI 챗봇 데모

커다란 개발과 테스트를 거쳐, 저희는 Gemini API로 구동되는 AI 챗봇의 실시간 데모를 자랑스럽게 선보이게 되었습니다. 아래에서 실시간으로 챗봇이 어떻게 보이고 응답하는지 확인하실 수 있으며, 사용자에게 원활하고 상호작용적인 경험을 제공합니다.

<div class="content-ad"></div>

- 초기 사용자 상호 작용

![사용자 이미지](/assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_1.png)

여기서 사용자가 입력 상자에 "안녕"을 입력했습니다. 이 초기 인사는 간단하지만, 챗봇의 처리를 시작하는 데 충분합니다.

2. 챗봇 처리

<div class="content-ad"></div>

![image](/assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_2.png)

사용자가 "보내기"를 누른 직후 챗봇은 "Bot: 입력 중..."을 표시합니다. 이는 챗봇이 Gemini API를 사용하여 입력을 처리하여 관련성 있고 지능적인 답변을 생성 중임을 나타냅니다.

3. 챗봇 응답

![image](/assets/img/2024-05-17-InnovatingwithAIDevelopingasimpleChatbotUsingGeminiAPI_3.png)

<div class="content-ad"></div>

저는 챗봇을 직접 시도해보시라고 권유합니다. 그렇게 하면 이 챗봇의 반응성과 그 뒤에 숨겨진 기술을 완전히 이해할 수 있을 거예요. 이번 데모는 시작에 불과하며, 계속해서 기술을 개선하고 확장하여 여러분의 요구를 더 잘 충족시킬 수 있도록 노력하고 있습니다.

AI 챗봇과 상호작용하는 데 즐거움을 느끼시길 바랍니다. 이 데모는 연구, 개발, 테스트의 결실이며, 현대 AI 기술과 첨단 프로그래밍 기법의 힘을 증명하는 것입니다.

이 기사를 읽어주셔서 감사합니다! 🥰 만약 유익하고 도움이 된다면, 이 기술에 대해 배우고 싶어하는 다른 분들과 공유하실 수 있습니다. 그리고 만약 즐거우셨다면 👏 를 꼭 한 번 클릭해주세요!

여기에서 전체 소스 코드를 확인하고 자세한 문서를 볼 수 있으며, 계속 진행 중인 개발에 기여할 수도 있습니다.

<div class="content-ad"></div>

행복한 하루 보내세요! 코딩을 즐기세요! 🤗