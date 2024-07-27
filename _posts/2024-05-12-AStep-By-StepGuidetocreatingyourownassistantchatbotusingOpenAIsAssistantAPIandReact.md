---
title: "OpenAI의 Assistant API와 React를 사용하여 나만의 도우미 챗봇 만들기"
description: ""
coverImage: "/assets/img/2024-05-12-AStep-By-StepGuidetocreatingyourownassistantchatbotusingOpenAIsAssistantAPIandReact_0.png"
date: 2024-05-12 20:53
ogImage:
  url: /assets/img/2024-05-12-AStep-By-StepGuidetocreatingyourownassistantchatbotusingOpenAIsAssistantAPIandReact_0.png
tag: Tech
originalTitle: "A Step-By-Step Guide to creating your own assistant chatbot using OpenAI’s Assistant API and React"
link: "https://medium.com/@JeffyJeff/a-step-by-step-guide-to-creating-your-own-assistant-chatbot-using-openais-assistant-api-and-react-655391215c3a"
---

## 어시스턴트 API의 힘 이해하기

![이미지](/assets/img/2024-05-12-AStep-By-StepGuidetocreatingyourownassistantchatbotusingOpenAIsAssistantAPIandReact_0.png)

# 요약

고속으로 발전하는 기술 세계에서 OpenAI는 인공 지능 분야에서 선두주자로 등장했습니다. 그들의 최신 작품인 어시스턴트 API는 이미 다양한 산업을 혁신하고 있습니다.

자신만의 개인 비서를 가지고 싶었던 적이 있나요? 더 이상 찾을 필요가 없어요! OpenAI의 어시스턴트 API는 AI의 기능을 활용하고 이를 프로젝트에 원활하게 통합할 수 있는 강력한 도구입니다. 이 API를 활용하여 개발자들은 사용자와 동적 대화를 나누며 관련 정보와 맞춤 경험을 제공할 수 있는 지능형 챗봇을 만들 수 있습니다.

이 글을 더 깊이 이해하면, 새로운 Assistant API를 사용하여 완전히 기능적인 챗봇을 구현하는 방법을 알아볼 것입니다. 이 챗봇은 아이스 하키 전문가로서 특정 지침을 줄 것입니다. 🏒

시작해 봅시다! 👏👏👏👏

## 단계 1: 개발 환경 설정

새로운 리액트 프로젝트를 만들고 필요한 라이브러리와 의존성을 설치하는 것은 어떤 리액트 개발을 시작하는 핵심 단계입니다. 몇 가지 간단한 단계를 따르면 프로젝트를 신속하게 시작할 수 있습니다.

- Node.js와 npm을 설치합니다 (이미 설치되어 있지 않은 경우)
- 터미널이나 명령 프롬프트를 엽니다
- 다음 명령어를 실행하여 Create React App을 설치합니다

```js
npm install -g create-react-app
```

4. 다음 명령어를 실행하여 새로운 리액트 앱을 만듭니다 (여기서 "my-app"은 앱의 이름입니다)

```bash
npx create-react-app my-app --template typescript
```

5. 해당 명령어를 실행하여 새 앱 디렉토리로 이동합니다.

```bash
cd my-app
```

6. Material-UI 및 그 종속성을 설치합니다.

```js
npm install @mui/material @emotion/react @emotion/styled
```

7. 다음 명령어를 실행하여 개발 서버를 시작하세요.

```js
npm start
```

이것으로 설정이 완료되었습니다! 이제 새로운 React 앱이 http://localhost:3000 에서 작동해야 합니다. 코드 편집기에서 앱을 열고 필요한 대로 코드를 사용자 정의할 수 있습니다.

# 단계 2: React 앱 챗봇 컴포넌트 생성

채팅 인터페이스를 위한 컴포넌트를 생성하세요. 각 메시지 컴포넌트를 렌더링하는 Chat 컴포넌트를 만들 수 있습니다.

/src/components/Message.tsx

```js
// src/components/Message.tsx
import React from 'react';

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div style={ textAlign: isUser ? 'right' : 'left', margin: '8px' }>
      <div style={ backgroundColor: isUser ? '#DCF8C6' : '#b8e3fc', padding: '8px', borderRadius: '8px' }>
        {text}
      </div>
    </div>
  );
};

export default Message;
```

/src/components/Chat.tsx

```js
// src/components/Chat.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import Message from './Message';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    setMessages([...messages, input]);
    setInput('');
    // 챗봇 응답을 처리하는 로직을 추가하세요
  };

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {messages.map((message, index) => (
            <Message key={index} text={message} isUser={index % 2 === 0} />
          ))}
        </Grid>
        <Grid item>
          <TextField
            label="메시지를 입력하세요"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            전송
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
```

# 단계 3: Chat 컴포넌트를 App.tsx에 통합하세요

Chat 컴포넌트를 사용하도록 src/App.tsx를 수정하세요.

/src/App.tsx

```javascript
// src/App.tsx
import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
         {/* 가운데 정렬 */}
        <h1 style={ textAlign: 'center' }>React Chatbot</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
};

export default App;
```

다음 명령어를 사용하여 React 앱을 실행하세요:

```javascript
npm start
```

# 단계 4: OpenAI 어시스턴트 API로 시작하기

어시스턴트 API를 사용하면 사용자 쿼리를 이해하고 대화식 방식으로 응답하는 지능형 챗봇을 만들 수 있습니다. 이러한 챗봇은 다양한 애플리케이션 및 플랫폼에 통합되어 사용자에게 원활한 지원을 제공할 수 있습니다. 🤖

⚠️ 진행하기 전에 API 키를 생성해야 합니다!

⚠️ OpenAI는 SPA 웹 앱과 같은 클라이언트 사이드 환경에서 API 키를 노출하는 것을 권장하지 않습니다. 요청은 항상 API 키를 안전하게 보관할 수 있는 자체 백엔드 서버를 통해 라우팅해야 합니다. 그러나 간편함을 위해, 우리는 단순하게 유지하고 프론트엔드 개발에 집중할 것입니다.

OpenAI에서 API 키를 얻으려면 다음 단계를 따르세요:

- OpenAI 계정을 만들거나 로그인하세요. 이미 OpenAI 계정이 없는 경우 새로 만들어야 합니다. OpenAI 웹사이트로 이동하여 "가입하기" 버튼을 클릭하여 계정을 만들 수 있습니다.
- API Keys 페이지로 이동하세요. 로그인한 후에는 화면 우측 상단의 계정 이름을 클릭한 다음 "API Keys"를 선택하여 API Keys 페이지에 액세스할 수 있습니다.
- 새 API 키를 생성하세요. API Keys 페이지에서 "새 비밀 키 생성" 버튼을 클릭하세요. 이렇게 하면 API 키의 이름을 입력할 수 있는 모달 창이 열립니다.
- API 키를 저장하세요. API 키를 만든 후에는 반드시 안전한 곳에 저장하세요. 다른 사람과 API 키를 공유하지 마세요. 그렇게 하면 그들이 OpenAI 계정에 액세스할 수 있게 됩니다.

API 키를 획득했다면, OpenAI API에 요청을 인증하는 데 사용할 수 있습니다. 이에 대한 자세한 정보는 OpenAI API 설명서에서 찾을 수 있습니다.

## OpenAI Assistant API의 주요 구성 요소:

- 쓰레드: 쓰레드는 Assistant API에서 대화의 기초입니다. 사용자와 어시스턴트 간에 교환된 메시지의 시퀀스를 나타냅니다. 쓰레드는 지속적일 수 있으며, 나중에 사용할 수 있도록 저장하고 검색할 수 있습니다.
- 메시지: 메시지는 쓰레드 내에서의 개별 통신 단위입니다. 사용자 또는 어시스턴트가 보낼 수 있습니다. 메시지에는 텍스트, 코드, 이미지 또는 다른 파일이 포함될 수 있습니다.
- 모델: Assistant API는 GPT-3.5 및 GPT-4와 같은 OpenAI의 텍스트 생성 모델에 액세스를 제공합니다. 이러한 모델은 텍스트 생성, 언어 번역 및 정보적인 방식으로 질문에 대답하는 데 사용할 수 있습니다.
- 도구: 도구는 추가 기능을 제공하는 Assistant API의 확장 기능입니다. 예를 들어, 코드 인터프리터, 정보 검색 및 함수 호출 도구가 있습니다.
- 지침: 지침은 Assistant API가 모델 및 도구를 사용하는 방법을 제어하는 방법입니다. 사용할 모델, 따를 지침 및 통합할 도구를 지정하는 데 사용할 수 있습니다.
- 실행: 실행은 어시스턴트의 실행을 의미합니다. 현재 쓰레드를 처리하고 응답을 생성하도록 어시스턴트를 트리거합니다. 실행은 대화에 대한 데이터 수집 및 어시스턴트의 성능을 측정하는 데 사용할 수도 있습니다.
- 파일: 파일은 대화와 관련된 데이터를 저장하고 참조하는 데 사용됩니다. 사용자가 업로드하거나 어시스턴트가 생성할 수 있습니다. 파일은 텍스트, 코드 또는 이미지와 같은 다양한 형식일 수 있습니다. 이 문서에서는 파일에 대해 다루지 않습니다.
- 역할: 역할은 쓰레드 내의 다른 유형의 메시지를 구별하는 데 사용됩니다. 현재 지원되는 역할은 사용자와 어시스턴트입니다.

이러한 구성 요소가 함께 작동하여 챗봇 및 AI 어시스턴트를 구축하는 강력하고 유연한 플랫폼을 제공합니다. Assistant API는 아직 개발 중이지만, 컴퓨터와 상호 작용하는 방식을 혁신할 잠재력이 있습니다. 🦾🤖

다음은 OpenAI Assistant API를 사용하는 방법입니다. Node.js를 사용하여 OpenAI의 Assistant API를 설정하려면 다음 단계를 따라야 합니다:

1. OpenAI Node.js 라이브러리 설치하기:

먼저 Node Package Manager (npm)을 사용하여 openai 패키지를 설치해주세요.

```js
npm install openai
```

2. 환경 파일을 생성해보세요:

루트 디렉토리에 .env 파일을 생성하여 OpenAI API 키를 안전하게 저장하세요. 다음 줄을 .env 파일에 추가해 주세요. YOUR_API_KEY를 실제 OpenAI API 키로 대체해주세요:

```js
REACT_APP_OPENAI_API_KEY = 당신의_API_KEY;
```

3. 필요한 라이브러리를 가져옵니다:

/src/components/Chat.tsx 파일에서 OpenAI 라이브러리를 가져옵니다:

```js
import OpenAI from "openai";
```

4. OpenAI 클라이언트를 초기화하세요:

OpenAI 클래스를 사용하여 API 키를 이용해 OpenAI 클라이언트를 초기화하세요:

```js
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
```

다음 단계에서 OpenAI Assistant API를 기존 코드에 통합할 때 이러한 단계를 다시 요약하겠습니다.

# 단계 5: React 앱에 OpenAI API 통합하기

이제 우리는 이전 단계에서 만든 React 앱과 OpenAI Assistant API 코드를 통합하는 필요한 단계로 들어가보겠습니다. 다음 변경 사항을 수행해주세요:

다음과 같은 MessageDto 클래스를 가지고 Models 폴더를 생성하세요:

/src/models/MessageDto.ts

```js
export class MessageDto {
  isUser: boolean;
  content: string;

  constructor(isUser: boolean, content: string) {
    this.isUser = isUser;
    this.content = content;
  }
}
```

Message.tsx 파일을 수정해주세요:

/src/components/Message.tsx

```js
// src/components/Message.tsx
import React from "react";
import { MessageDto } from "../models/MessageDto";

interface MessageProps {
  message: MessageDto;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div style={{ textAlign: message.isUser ? "right" : "left", margin: "8px" }}>
      <div
        style={{
          color: message.isUser ? "#ffffff" : "#000000",
          backgroundColor: message.isUser ? "#1186fe" : "#eaeaea",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {message.content.split("\n").map((text, index) => (
          <>
            {text}
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default Message;
```

마침내 새로운 Chat.tsx 파일을 구현해주세요:

/src/components/Chat.tsx

```js
// src/components/Chat.tsx
import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Grid, CircularProgress, LinearProgress } from "@mui/material";
import Message from "./Message";
import OpenAI from "openai";
import { MessageDto } from "../models/MessageDto";

const Chat: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());
  const [input, setInput] = useState<string>("");
  const [assistant, setAssistant] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [openai, setOpenai] = useState<any>(null);

  useEffect(() => {
    initChatBot();
  }, []);

  useEffect(() => {
    setMessages([
      {
        content: "Hi, I'm your personal assistant. How can I help you?",
        isUser: false,
      },
    ]);
  }, [assistant]);

  const initChatBot = async () => {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    // Create an assistant
    const assistant = await openai.beta.assistants.create({
      name: "Hockey Expert",
      instructions: "You are a hockey expert. You specialize in helping others learn about hockey.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4-1106-preview",
    });

    // Create a thread
    const thread = await openai.beta.threads.create();

    setOpenai(openai);
    setAssistant(assistant);
    setThread(thread);
  };

  const createNewMessage = (content: string, isUser: boolean) => {
    const newMessage = new MessageDto(isUser, content);
    return newMessage;
  };

  const handleSendMessage = async () => {
    messages.push(createNewMessage(input, true));
    setMessages([...messages]);
    setInput("");

    // Send a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: input,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    // Create a response
    let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Wait for the response to be ready
    while (response.status === "in_progress" || response.status === "queued") {
      console.log("waiting...");
      setIsWaiting(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    setIsWaiting(false);

    // Get the messages for the thread
    const messageList = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessage = messageList.data
      .filter((message: any) => message.run_id === run.id && message.role === "assistant")
      .pop();

    // Print the last message coming from the assistant
    if (lastMessage) {
      console.log(lastMessage.content[0]["text"].value);
      setMessages([...messages, createNewMessage(lastMessage.content[0]["text"].value, false)]);
    }
  };

  // detect enter key and send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Grid container direction="column" spacing={2} paddingBottom={5}>
        {messages.map((message, index) => (
          <Grid item alignSelf={message.isUser ? "flex-end" : "flex-start"} key={index}>
            <Message key={index} message={message} />
          </Grid>
        ))}
        <Grid item>
          <TextField
            label="Type your message"
            variant="outlined"
            disabled={isWaiting}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isWaiting && <LinearProgress color="inherit" />}
        </Grid>
        {!isWaiting && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isWaiting}>
              Send
            </Button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Chat;
```

React 앱을 다음 명령어로 실행해보세요:

```js
npm start
```

# 단계 6: 당신의 어시스턴트와 상호 작용하기

이제 prompt를 사용하여 새로 만든 어시스턴트와 상호 작용할 준비가 되었습니다. 응답은 짧은 지연 후 화면에 표시됩니다. 아래와 같이 표시됩니다:

Prompt:

```js
누가 사람들에게 요리를 가르치는 데 가장 적합한 이가 되었습니까?
```

답변:

```js
"가장 적합한 요리 교육자"라는 타이틀은 팬들과 요리 역사학자들 사이에서 치열한 논의의 대상입니다. 그러나 토론에서 자주 언급되는 몇 가지 이름은 다음과 같습니다:

- **웨인 그레츠키(Wayne Gretzky)**: "위대한 사람"이라고 불리는 그레츠키는 NHL 역대 최고의 골, 어시스트, 포인트 기록 보유자입니다. 그는 수많은 기록을 보유하고 4회의 스탠리컵 챔피언입니다.
- **바비 오어(Bobby Orr)**: 공격 능력으로 수비수 위치를 혁신한 오어는 2회의 아트 로스 트로피를 수상한 유일한 수비수입니다.
- **고디 하워(Gordie Howe)**: "미스터 하키"로 별명 붙은 하워는 스코어링 능력과 체력에 뛰어난 선수로 유명합니다. 그는 6회의 리그 MVP 및 4회의 스탠리컵 챔피언입니다.
- **마리오 라미우(Mario Lemieux)**: 놀라운 기술과 스코어링 능력을 가진 라미우는 경력 동안 심각한 건강 문제와 싸우면서 필츠버그 펭귄스를 2회의 스탠리컵 우승으로 이끌었습니다.
- **모리스 리차드(Maurice Richard)**: "로켓"으로 불리는 그는 50게임에서 50골을 넣는 최초의 선수였고 골을 넣는 능력과 강한 결의로 유명했습니다.

하키 토론은 또한 서로 다른 시대, 포지션 및 게임의 변화를 고려합니다. 이 선수들 모두 그들의 시대에서 지배적이었으며 이들이 스포츠에 기여한 데 대해 널리 인정받고 있습니다.
```

🛠️ 제 개인 GitHub 계정에서 완전한 솔루션 코드를 확인하실 수 있습니다. 여기를 클릭해주세요.

# 결론

OpenAI의 Assistant API 도입으로 보조 인력의 접근성이 새로운 차원으로 발전했습니다. 이제 누구나 챗봇과 AI 보조 인력의 힘과 편의성을 누릴 수 있습니다.

Assistant API는 개발자들이 AI 기반 보조 인력의 잠재력을 활용할 수 있는 손쉬운 방법을 제공합니다.

결론적으로, OpenAI의 Assistant API를 통한 보조 인력의 접근성은 개인 및 기업이 AI 기술의 힘을 활용할 수 있게 합니다. 우리 손끝에 챗봇이 있음으로써 생산성을 향상하고 고객 경험을 향상하며 다양한 산업에서 새로운 기회를 극대화할 수 있습니다.

지금까지였어요. 만약 이 이야기를 좋아하셨다면, 팔로우하고 박수를 부탁드려요. 👏👏

## 참고 자료

[1] https://platform.openai.com/docs/assistants/how-it-works. OpenAI

[2] https://medium.com/@ralfelfving/tutorial-get-started-with-the-new-openai-assistants-api-7049c2517bfe. Ralf Elfving
