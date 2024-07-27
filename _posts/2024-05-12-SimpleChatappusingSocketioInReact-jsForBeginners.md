---
title: "React-js를 이용한 초보자를 위한 Socketio를 활용한 간단한 채팅 애플리케이션"
description: ""
coverImage: "/assets/img/2024-05-12-SimpleChatappusingSocketioInReact-jsForBeginners_0.png"
date: 2024-05-12 19:26
ogImage: 
  url: /assets/img/2024-05-12-SimpleChatappusingSocketioInReact-jsForBeginners_0.png
tag: Tech
originalTitle: "Simple Chat app using Socket.io In React-js For Beginners"
link: "https://medium.com/@maitrikt1998/simple-chat-app-using-socket-io-in-react-js-for-beginners-76a7ceba8068"
---


안녕하세요 여러분! 이 글에서는 socket.io와 React js를 사용하여 간단한 채팅 애플리케이션을 만드는 방법에 대해 알아볼 거에요. 특히 초보자분들을 위한 내용으로 모든 단계를 차근차근 알려드릴 거에요. 마지막에는 React-js로 간단한 채팅 애플리케이션을 만들게 될 거에요.

![SimpleChatappusingSocketioInReact-jsForBeginners](/assets/img/2024-05-12-SimpleChatappusingSocketioInReact-jsForBeginners_0.png)

## Socket.io란 무엇인가요?

Socket.IO는 웹 클라이언트와 서버 간 실시간 양방향 통신을 용이하게 하는 강력한 JavaScript 라이브러리입니다. 사용자와 응용 프로그램 간 즉각적인 데이터 교환을 허용하는 다리 역할을 하며, 라이브 채팅, 멀티플레이어 게임 및 협업 편집 도구와 같은 참여형 경험을 만들기에 이상적입니다. 강력한 기능과 사용 편의성을 갖춘 Socket.IO는 현대적이고 인터랙티브한 웹 애플리케이션을 구축하기 위한 주요 기술로 자리잡았습니다.



단계 1: 새 폴더 생성하기

여기서 빈 폴더를 생성합니다. 이 폴더 안에 클라이언트 측(react)과 서버 측(socket.io)의 2개 개별 폴더를 생성합니다.

```js
mkdir react-chatapp
cd react-chatapp
```

단계 2: socket.io를 사용하여 소켓 만들기



먼저 서버 측 작업을 위해 서버 폴더를 만들어야 해요. 다음 명령어를 사용하세요.

```js
mkdir server
cd server
```

새로운 Node.js 프로젝트를 초기화하세요:

```js
npm init -y
```




socket.io 라이브러리 설치하기

```js
npm install socket.io
```

socket.io를 설치한 후 server.js 파일을 만들고 아래 코드를 추가해주세요.

```js
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hello World');
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('사용자가 연결을 끊었습니다.');
    });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
```



여기, 이 코드는 Node.js의 내장 http 모듈을 사용하여 기본 HTTP 서버를 설정하고 Socket.IO 서버를 연결하는 방법을 보여줍니다. Socket.IO 서버는 클라이언트 연결을 수신하고 모든 연결된 클라이언트에 메시지를 브로드캐스트하며 클라이언트가 연결 또는 연결 해제될 때 로그를 기록합니다.

단계 3: React js에서 Socket.io 구현

"react-chatapp" 폴더로 이동하여 리액트 프로젝트를 만듭니다.

```js
npx create-react-app client
```



리액트 프로젝트를 설치한 후 프로젝트 안으로 이동하여 의존성을 설치하세요.

```js
cd client
npm start
```

리액트 기본 의존성을 설치한 후 socket.io-client와 부트스트랩 라이브러리를 리액트에 설치하세요.

```js
npm install socket.io-client bootstrap
```



- Socket.IO-Client:

- socket.io-client은 Socket.IO를 위한 클라이언트 측 라이브러리로, 실시간 양방향 통신 라이브러리입니다.
- 이를 통해 웹 클라이언트(예: 브라우저)가 Socket.IO 서버와 연결을 설정하고 실시간으로 통신할 수 있습니다.
- 서버에 이벤트를 전송하거나 서버로부터 받은 이벤트를 처리하는 방법을 제공합니다.
- socket.io-client를 사용하면 채팅, 실시간 업데이트, 협업과 같은 기능을 지원하는 대화형 웹 애플리케이션을 개발할 수 있습니다.

2. Bootstrap:

- Bootstrap은 반응형 및 모바일 우선 웹 프로젝트를 구축하기 위한 인기 있는 프론트엔드 프레임워크입니다.
- 버튼, 폼, 내비게이션 바와 같은 사전 스타일이 적용된 CSS 컴포넌트 및 모달, 툴팁과 같은 JavaScript 플러그인을 제공합니다.
- Bootstrap의 그리드 시스템을 통해 다양한 화면 크기와 장치에 대응하는 반응형 레이아웃을 생성할 수 있습니다.
- Bootstrap을 사용하면 다양한 준비가된 컴포넌트와 스타일을 제공하여 웹 애플리케이션을 디자인하고 스타일링하는 데 시간과 노력을 절약할 수 있습니다.



그럼 src/App.js 파일로 이동하여 다음 코드로 교체하세요

src/App.js

```js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsUsernameSet(true);
    }

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUsernameSubmit = () => {
    localStorage.setItem('username', username);
    setIsUsernameSubmitted(true);
  };

  const handleMessageSend = () => {
    if (!inputMessage.trim()) return;

    socket.emit('message', {
      username,
      text: inputMessage
    });

    setInputMessage('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Chat App</h5>
              {!isUsernameSubmitted ? (
                <div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="사용자 이름 입력"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleUsernameSubmit}
                  >
                    사용자 이름 설정
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="text-center mb-4">환영합니다, {username}님!</h4>
                  <div className="message-container row">
                    {messages.map((msg, index) => (
                      <div key={index} className="message col-md-8 offset-md-2">
                        <strong>{msg.username}:</strong> {msg.text}
                      </div>
                    ))}
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="메시지 입력..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleMessageSend}
                    >
                      전송
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

이 코드에서는 React와 Socket.IO를 사용하여 실시간 채팅 애플리케이션을 만드는 과정을 안내하겠습니다. 우리는 먼저 애플리케이션의 기본 구조를 설정한 다음 사용자가 실시간으로 메시지를 보내고 받을 수 있도록 기능을 점진적으로 추가할 것입니다.



단계 1: 사용자 이름 입력 컴포넌트 생성

- 먼저 UsernameInput이라는 React 컴포넌트를 만드세요. 이 컴포넌트는 사용자가 사용자 이름을 입력할 수 있는 입력 필드를 렌더링합니다.
- useState 훅을 사용하여 사용자 이름 입력 필드의 상태를 관리하세요.
- 사용자 이름이 제출되었는지 여부에 따라 채팅 인터페이스를 조건부로 렌더링하세요.

단계 2: 채팅 인터페이스 표시

- 사용자가 사용자 이름을 제출하면 채팅 인터페이스를 표시하세요.
- 메시지를 입력할 수있는 입력 필드와 메시지를 전송하는 버튼을 제공하세요.
- 사용자 이름이 제출되었을 때에만 채팅 인터페이스를 표시하도록 조건부 렌더링을 사용하세요.



단계 3: 메시지 제출 처리

- 메시지 제출을 처리하기 위해 handleMessageSend라는 함수를 정의하십시오.
- 사용자가 전송 버튼을 클릭하면이 함수를 호출하여 Socket.IO를 통해 서버로 메시지를 전송하십시오.
- useState 훅을 사용하여 입력 메시지 필드의 상태를 관리하고, 메시지를 전송 한 후에 필드를 지우십시오.

단계 4: 실시간 통신을 위한 Socket.IO 통합

- socket.io-client 라이브러리를 가져와 Socket.IO 서버에 연결을 설정하십시오.
- 서버에 io 함수를 사용하여 연결하고 서버 URL을 제공하십시오.
- 서버에서 수신된 메시지를 처리하는 이벤트 리스너를 정의하십시오.
- 사용자가 메시지를 보낼 때 서버로 메시지를 발신하고, 클라이언트와 서버 간의 양방향 통신을 보장하십시오.



그럼 src/App.css 파일 안으로 들어가서 다음 코드를 다음과 같이 바꿔주세요.

src/App.css

```css
body{
  background-color: cadetblue;
}

/* Card를 가운데 정렬 */
.card {
  margin-top: 50px;
}

/* 메시지 컨테이너를 스타일링 */
.message-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
}

/* 각각의 메시지 스타일링 */
.message {
  background-color: burlywood;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

/* 입력 그룹을 스타일링 */
.input-group {
 
  /* bottom: 0;
  left: 0;
  right: 0; */
  padding: 15px;
  /* background-color: #f9f9f9;
  border-top: 1px solid #ccc; */
}
```

위 단계를 모두 완료하면 서버를 실행할 시간입니다.
서버 폴더로 이동하여 다음 명령어를 실행하세요.



```js
node server.js
```

다음으로, client 폴더로 이동하여 다음 명령어를 실행하세요

```js
npm start
```

결과:



![이미지 1](/assets/img/2024-05-12-SimpleChatappusingSocketioInReact-jsForBeginners_1.png)

![이미지 2](/assets/img/2024-05-12-SimpleChatappusingSocketioInReact-jsForBeginners_2.png)

도움이 되길 바라요...