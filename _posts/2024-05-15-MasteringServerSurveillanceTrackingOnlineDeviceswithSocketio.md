---
title: "서버 감시 마스터하기 Socketio를 사용하여 온라인 장치 추적하기"
description: ""
coverImage: "/assets/img/2024-05-15-MasteringServerSurveillanceTrackingOnlineDeviceswithSocketio_0.png"
date: 2024-05-15 02:47
ogImage: 
  url: /assets/img/2024-05-15-MasteringServerSurveillanceTrackingOnlineDeviceswithSocketio_0.png
tag: Tech
originalTitle: "Mastering Server Surveillance: Tracking Online Devices with Socket.io"
link: "https://medium.com/@neerajx0/mastering-server-surveillance-tracking-online-devices-with-socket-io-a4d10ae9b972"
isUpdated: true
---




<img src="/assets/img/2024-05-15-MasteringServerSurveillanceTrackingOnlineDeviceswithSocketio_0.png" />

서버에 연결된 디바이스의 정확한 수를 파악하는 것은 오늘날의 네트워크화된 디지털 환경에서 효율성, 보안 및 전반적인 성능을 유지하는 데 중요합니다. 귀하가 거대한 네트워크 인프라나 소규모 웹 사이트를 담당하고 있든 상관없이 온라인 환경의 동력을 파악하는 것이 모든 차이를 만들 수 있습니다. 다행히도 Socket.io라는 실시간 웹 애플리케이션 엔진을 통해 디지털 풍경에 대한 중요한 정보를 제공받을 수 있습니다. 이 게시물에서는 Socket.io를 사용하여 서버에 연결된 온라인 디바이스를 모니터링하는 방법에 대해 자세히 살펴보며 초보자와 숙련된 개발자 모두에게 포괄적인 설명서를 제공할 것입니다.

서버에 연결된 인터넷 디바이스를 모니터링하기 위해 Socket.io의 기능을 활용하는 첫 번째 단계는 Node.js 프로젝트를 설정하는 것입니다. 다음 간단한 단계를 따라 프로젝트를 시작하세요:

- Node.js 설치: 아직 설치하지 않은 경우 공식 웹 사이트에서 Node.js를 다운로드하고 설치하세요. Node.js에는 프로젝트 의존성 관리에 사용할 npm(Node Package Manager)이 함께 제공됩니다.
- 프로젝트 디렉토리 생성: 파일 시스템에서 적절한 위치를 선택하고 프로젝트용 새 디렉토리를 만드세요. 명령줄을 사용하여 mkdir 명령 다음에 선택한 디렉토리 이름을 입력하여 이 작업을 수행할 수 있습니다.



```bash
mkdir socketio
```

3. 프로젝트 디렉토리로 이동: cd 명령어를 사용하여 새로 생성한 프로젝트 디렉토리로 이동합니다.

```bash
cd socketio
```

4. Node.js 프로젝트 초기화: npm init 명령어를 사용하여 새로운 package.json 파일을 생성합니다. 이 파일은 프로젝트 및 의존성에 대한 메타데이터를 저장하게 됩니다. 프로젝트 이름, 버전, 설명 등의 세부 정보를 입력하도록 프롬프트에 따라 진행하며, 대부분의 경우 기본값을 사용하기 위해 Enter 키를 누를 수 있습니다.




1. npm으로 초기화하세요.
   
   js
   npm init
   

2. 필요한 패키지 설치: 이제 프로젝트에 필요한 패키지를 설치해봅시다. 웹 서버를 만들기 위해 express와 실시간 통신을 위해 socket.io가 필요합니다.

   js
   npm install express socket.io http
   

3. 프로젝트 파일 생성: 주로 index.js와 같이 이름 지어지는 주 서버 파일을 만들고, 서버 설정 및 Socket.io 연결을 처리할 코드를 작성하세요.




```js
const express = require("express");
const socketIO = require("socket.io");
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: "GET", "POST,"
  },
});
let userCount = 0;
io.on("connection", (socket) => {
  userCount++;
  io.emit("userCount", userCount);

  socket.on("disconnect", () => {
    userCount--;
    io.emit("userCount", userCount);
  });
});
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
```

**Node.js 서버 시작하기:** 메인 서버 파일을 node 명령어를 사용하여 실행하여 Node.js 서버를 시작합니다.

```js
node index.js
```

**서버 출력 확인:** 서버가 부팅되면 지정된 포트에서 영역화되고 작동 중임을 나타내는 출력을 확인해야 합니다. 서버가 구성된 방식에 따라, 여기에서는 "서버가 3001 포트에서 청취 중입니다" 라는 메시지가 표시됩니다.




소켓 이벤트를 수신하고 실시간으로 연결된 사용자 수를 파악할 수 있어요.

방법 1: 웹페이지에서

HTML 템플릿 생성하기

```js
<!DOCTYPE html>
<html>
  <head>
    <title>실시간 사용자 수</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding-top: 50px;
      }
      #userCount {
        font-size: 48px;
        font-weight: bold;
        color: #333;
      }
    </style>
  </head>
  <body>
    <h1>연결된 사용자 수</h1>
    <div id="userCount"></div>
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js"></script>
    <script>
      const socket = io("http://localhost:3001");
      socket.on("connect", () => {
        console.log("Socket.IO 서버에 연결되었습니다");
      });
      socket.on("userCount", (count) => {
        document.getElementById("userCount").textContent = count;
      });
    </script>
  </body>
</html>
```



우리는 이전에 HTML에서 시작한 서버에 연결 중이며, 연결할 때마다 서버는 "userCount"라는 이름의 이벤트를 생성하여 해당 서버에 연결된 사용자에 대한 정보를 포함합니다.

방법 2: NodeJs 사용

```js
const io = require("socket.io-client");
const socket = io("http://localhost:3001");
socket.on("connect", () => {
    console.log("Socket.IO 서버에 연결되었습니다");
});
socket.on("userCount", (count) => {
    console.log("연결된 사용자 수:", count);
});
```

요약하자면, Socket.io와 Node.js는 실시간 사용자 모니터링을 가능하게 함으로 효과적으로 작동합니다. Socket.io를 Node.js 환경에 통합함으로써 개발자는 쉽게 사용자 행동과 서버 성능을 모니터링할 수 있습니다. 이는 예방적인 서버 자원 관리를 가능하게 하여 완벽한 사용자 경험을 보장합니다. Socket.io의 중요한 사용자 연결에 대한 통찰력을 활용함으로써 개발자는 확장 가능하고 반응성 있는 응용프로그램을 만들 수 있습니다.