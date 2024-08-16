---
title: "Socket.io, React.js, Node.js 및 Express.js를 사용한 실시간 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-05-01-BuildingReal-TimeApplicationswithSocketioReactjsNodejsandExpressjsAComprehensiveGuide_0.png"
date: 2024-05-01 17:48
ogImage: 
  url: /assets/img/2024-05-01-BuildingReal-TimeApplicationswithSocketioReactjsNodejsandExpressjsAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Building Real-Time Applications with Socket.io, React.js, Node.js, and Express.js: A Comprehensive Guide"
link: "https://medium.com/bitsrc/building-real-time-applications-with-socket-io-adc86da2f9f1"
isUpdated: true
---




**실시간 웹 개발: Socket.io, React.js, Node.js 및 Express.js를 활용한 대화형 애플리케이션 구축에 대한 포괄적인 가이드**

![BuildingReal-TimeApplicationswithSocketioReactjsNodejsandExpressjsAComprehensiveGuide_0.png](/assets/img/2024-05-01-BuildingReal-TimeApplicationswithSocketioReactjsNodejsandExpressjsAComprehensiveGuide_0.png)

오늘날의 디지털 환경에서 실시간 통신은 웹 애플리케이션의 중요한 측면이 되었습니다. 채팅 애플리케이션, 협업 도구 또는 실시간 업데이트와 같이 사용자는 페이지를 새로 고치지 않고 즉시 업데이트를 기대합니다. 이것이 Socket.io, React.js, Node.js 및 Express.js가 등장하는 곳입니다.

Socket.io는 웹 서버와 클라이언트 간의 양방향 및 이벤트 기반 통신을 가능하게 하는 강력한 라이브러리입니다. React.js, 사용자 인터페이스를 구축하기 위한 인기 있는 JavaScript 라이브러리, 그리고 Express.js를 통한 Node.js와 결합하면 다양한 웹 애플리케이션을 만들 수 있는 다재다능한 웹 애플리케이션 프레임워크를 통해 개발자는 원활하고 대화형 실시간 애플리케이션을 만들 수 있습니다.

<div class="content-ad"></div>

이 블로그에서는 Socket.io의 기본을 탐구하고 React.js, Node.js, Express.js와 통합하는 방법을 알아볼 것입니다. 우리는 기본 개념, 단계별 구현 방법, 실시간 애플리케이션을 구축하는 데 가장 좋은 방법에 대해 이야기할 것입니다. 이 안내서를 마치면 이러한 기술을 활용하여 사용자가 실시간으로 참여하는 동적이고 반응적인 어플리케이션을 만드는 방법에 대해 확고한 이해를 갖게 될 것입니다. 그러니 Socket.io, React.js, Node.js, Express.js와 함께하는 실시간 웹 개발의 흥미로운 여정을 시작해봅시다!

먼저 클라이언트 및 서버 폴더가 필요합니다. 서버 폴더에서 Node.js 프로젝트를 초기화하세요.

```js
npm init
```

그런 다음 필요한 종속성(Express, Cors, Nodemon, Socket.io)을 설치하세요.

<div class="content-ad"></div>

```js
npm install express cors nodemon socket.io
```

- Express: Express는 Node.js를 위한 인기 있는 웹 애플리케이션 프레임워크입니다. 웹 애플리케이션과 API를 구축하는 간편하고 유연한 방법을 제공합니다.
- Cors: Cross-Origin Resource Sharing (CORS)는 웹 브라우저에 의해 구현된 보안 메커니즘으로, 다른 출처의 리소스에 대한 액세스를 제한합니다. 웹 애플리케이션을 개발할 때, 하나의 도메인에서 다른 도메인으로 요청을 보낼 때 CORS 문제가 발생할 수 있습니다. cors 라이브러리를 사용하여 Express 애플리케이션에서 CORS 관련 문제를 처리합니다.
- Nodemon: Nodemon은 소스 코드에 변경 사항이 감지될 때마다 Node.js 애플리케이션을 자동으로 다시 시작하는 개발 유틸리티입니다.
- Socket.io: Socket.io는 웹 브라우저와 서버 간에 실시간 양방향 통신을 가능하게 하는 JavaScript 라이브러리입니다. 주로 즉각적인 데이터 업데이트나 대화형 기능이 필요한 애플리케이션을 구축하는 데 사용됩니다.

그 후, 서버 폴더에 index.js 파일을 만들고 다음 코드를 추가하세요.

```js
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});

server.listen(4000, () => { console.log("listening on *:4000"); });
```

<div class="content-ad"></div>

이제 클라이언트 폴더로 이동하여 리액트 앱을 만들어봅시다.

```js
npx create-react-app .
```

여기서 소켓 IO 클라이언트 종속성을 설치해야 합니다.

```js
npm install socket.io-client
```

<div class="content-ad"></div>

앱.js에 다음 코드를 추가하세요.

```js
import "./App.css";
import { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  function sendMessage() {
    console.log("버튼 클릭됨");
    socket.emit("send_message", { message: "클라이언트에서 안녕하세요" });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder="메시지" />
      <button onClick={sendMessage}>메시지 보내기</button>
    </div>
  );
}

export default App;
```

게다가, 서버 폴더에 있는 index.js 파일에 다음 코드를 추가하세요.

```js
io.on("connection", (socket) => {
  console.log(`유저가 연결되었습니다 ${socket.id}`);
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
```

<div class="content-ad"></div>

이 코드 줄들로 기본 메시지 '클라이언트에서 안녕하세요'를 보낼 수 있고, 다른 모든 사용자에게 방송할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*owCRflCEFkCAw6365cvt0g.gif)

지금까지 socket.io가 올바르게 작동하고 있습니다. 이제 할 일은 메시지 데이터를 전송하는 것뿐입니다.

여기 클라이언트 앱의 최종 버전인 app.js 파일이 있습니다.

<div class="content-ad"></div>

```js
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  function sendMessage() {
    console.log("Button clicked");
    socket.emit("send_message", { message: message });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="메시지를 입력하세요"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>메시지 보내기</button>
      <h1>
        받은 메시지: {messageReceived}
      </h1>
    </div>
  );
}

export default App;
```

서버의 index.js 파일 최종 버전은 다음과 같습니다.

```js
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`사용자가 연결되었습니다: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
server.listen(4000, () => {
  console.log("4000번 포트에서 수신 대기 중");
});
```

최종 결과는 다음과 같습니다.

<div class="content-ad"></div>

![Real-time applications](https://miro.medium.com/v2/resize:fit:1400/1*f0e54kuZSGu0pvAivmOJug.gif)

이 포괄적인 가이드는 Socket.io, React.js, Node.js 및 Express.js를 사용하여 실시간 애플리케이션을 구축하는 방법을 탐구합니다. 이러한 기술을 활용하여 개발자는 사용자에게 즉각적인 업데이트를 제공하는 동적 대화형 애플리케이션을 만들 수 있습니다. 이 안내서는 기본 개념, 단계별 구현 및 모베스트 프랙티스를 다룹니다. 전체 소스 코드는 GitHub 저장소 https://github.com/matheshyogeswaran/React_socket_io.git 를 방문해주세요. 즐겁게 코딩하세요!