---
title: "웹 소켓 만들기 프로그래머의 실시간 경험"
description: ""
coverImage: "/assets/img/2024-05-12-CraftingWebSocketsTheReal-TimeExperiencesofAProgrammer_0.png"
date: 2024-05-12 23:06
ogImage: 
  url: /assets/img/2024-05-12-CraftingWebSocketsTheReal-TimeExperiencesofAProgrammer_0.png
tag: Tech
originalTitle: "Crafting Web Sockets: The Real-Time Experiences of A Programmer"
link: "https://medium.com/stackademic/crafting-web-sockets-the-real-time-experiences-of-a-programmer-de67aa915422"
isUpdated: true
---




![Crafting Web Sockets: The Real-Time Experiences of A Programmer](/assets/img/2024-05-12-CraftingWebSocketsTheReal-TimeExperiencesofAProgrammer_0.png)

거의 1년이 지난 지금, 포트폴리오를 풍부하게 하기 위해 레스토랑 관리 시스템을 개발하는 여정을 시작한 지 얼마 되지 않았습니다. 이 시스템은 다음 세 가지 주요 패널을 갖추고 있습니다: 웹에서 액세스할 수 있는 관리자 패널과 웹을 통해 액세스할 수 있는 사용자용 패널 그리고 최적화된 모바일 사용을 위해 만들어진 라이더 패널이 있습니다. 이 여정에서 웹 소켓이 무엇이며 왜 중요한지, 그리고 일반 HTTP 요청과 어떻게 다른지 탐험하면서 그 내용을 기록한 이 블로그는 그 시기에 배운 기본 원리를 소개합니다.

# 차이 발견하기: 웹 소켓 VS HTTP 요청

웹 소켓과 HTTPS 요청은 각기 다른 연결 동작을 가지고 있습니다. HTTP에서는 현재 요청이 끝나면 연결이 종료되기 때문에 실시간 데이터 전송에는 적합하지 않습니다. 그에 반해 웹 소켓은 오픈 연결을 유지하여 사용자가 언제든지 데이터를 보내고 받을 수 있도록 합니다. 채팅이 웹 소켓 기술의 가장 일반적인 사용 사례 중 하나일 것입니다. 사용자들은 계속해서 연결되어 있어야 하기 때문입니다.



YouTube 동영상, 기사 및 웹 소켓 관련 문서를 참고해도 MERN 스택에서 내 웹 앱을 개발하는 것은 상당히 어려웠어요. 웹 소켓을 다루기가 쉽지 않아서 성능이 문제가 될 수 있어요. 아래에 몇 가지 관련 단계가 나와 있습니다.

- 설치: Node.js에서 웹 소켓을 다루기 위한 필요한 라이브러리를 설치하세요

```js
npm install socket.io
npm install https
```

2. 설정: React 프론트 엔드와 Node.js 백엔드에서 웹 소켓을 설정하여 서버와 클라이언트 간의 통신이 원활하지 않게 되지 않도록 해야 해요



```js
import { Server } from 'socket.io';
import http from "http"

const server = http.createServer(app)

const io = new Server(server,{
  cors: {
      origin: process.env.BASE_URL, 
      methods: ["GET", "POST"]
  }
})
/*
프론트엔드의 URL 주소는 해당 origin으로 설정됩니다. 예를 들어, 프론트엔드가 localhost:3000에 위치한다면 http://localhost:3000/ 가 됩니다.
/*
```

위의 코드는 웹 소켓을 설정하는 방법을 보여줍니다. 먼저 서버는 HTTP 서버로 생성되고 server 변수에 저장됩니다. 그 후, 이 서버는 실시간 통신을 가능하게 하는 웹 소켓 서버를 초기화하는 데 사용됩니다. 이를 통해 서버가 CORS를 지원하므로 백엔드와 프론트엔드 간 상호작용을 허용하여 실시간 통신이 가능해집니다. 마찬가지로, 설정을 올바르게 지정하여 백엔드에 있는 애플리케이션이 지정된 엔드 포인트를 통해 올바른 위치로 이동하도록 해야 합니다.

```js
const app = express();

app.listen(PORT, () => console.log(`서버 포트: ${PORT}`));
```

위와 같이 앱을 서버를 통해 듣도록 설정해야 합니다.




```js
서버.listen(PORT, () => console.log(`서버 포트: ${PORT}`));
```

웹 소켓이 연결되었는지 확인하려면 아래 코드를 사용하여 웹 소켓이 성공적으로 설정되었는지 테스트할 수 있습니다.

```js
io.on("connection",(socket)=>{
  console.log("사용자가 연결되었습니다",socket.id);
}
```

3. 기능 구현: 필요한 기능을 구성하고 웹 소켓을 통해 제공되는 함수를 사용하여 적용하세요. 기능 구현



라이브 데이터 전송 능력을 가진 대시 가능성으로 인해 구현 기능의 가능성은 무한하지만 어렵습니다. 관리자 패널에서 창의성을 시연하기 위해 한 예로는 데이터베이스 테이블을 모니터링하여 발생할 수 있는 변경 사항을 확인했습니다. 변경 사항이 발생하면 즉시 관리자 패널을 통해 경고 메시지를 보냅니다. 이 기능은 시스템의 기능을 전반적으로 크게 향상시킬 수 있는 즉각적인 인식과 신속한 의사 결정 옵션을 제공하는 것 외에도 관리자 인터페이스의 응답 속도와 효율성을 높입니다.

```js
import Orders from "./model/orders.js"
const changeStream = Orders.watch()

changeStream.on('change', function(data) {

console.log("주문 테이블에서 변경 감지");
}
```

위의 코드는 Node.js를 사용하여 MongoDB 테이블에서 변경 사항을 감지하는 방법을 보여줍니다. 이 경우 Orders 모델이 있으며 이는 파일 model/orders.js에 위치한 MongoDB 컬렉션입니다. Orders 컬렉션은 watch() 메서드를 사용하여 변경 사항을 실시간으로 모니터링하는 변경 스트림을 생성합니다. 이벤트 리스너 changeStream.on('change', function(data) '...')로 감지된 변경 사항이 있을 경우 콘솔에 주문 테이블에서 변경 감지가 출력됩니다. 변경 스트림 기능은 MongoDB를 사용할 때 테이블 내에서 편집, 삭제 또는 추가와 같은 변경 사항을 더 나은 방식으로 효과적으로 모니터링하기 위해 실제로 구현되었습니다.

React.JS에서 웹 소켓을 설정하는 첫 번째 단계는 socket.io-client를 설치하는 것입니다.



```js
npm i socket.io-client
```

이후에 아래 코드를 통해 React JS에서 웹소켓을 구성하는 방법을 보여줍니다.

```js
import io from 'socket.io-client';
const socket=io.connect(process.env.BASE_URL);

/*
process.env.BASE_URL를 기반 URL로 연결하면 
서버 URL인 localhost:5000와 같은 서버가 있는 경우에는 
http://localhost:5000/가 됩니다.
/*
```

마지막 단계는 백엔드에서 프론트엔드로 데이터를 전송하기 위해 웹소켓을 활용하는 것입니다. 예를 들어, 데이터베이스 테이블이 변경되는 경우, 서버 사이트에서 프론트엔드로 메시지를 효과적으로 전송할 수 있을까요?



우리는 사실 io.emit 기능을 사용하여 이것을 할 수 있어요. 위의 코드를 다음과 같이 다시 작성해 봅시다.

```js
import Orders from "./model/orders.js"
const changeStream = Orders.watch()

changeStream.on('change', function(data) {

  io.emit("statusChanged", { message: "주문 테이블에서 변경이 감지되었습니다" });
}
```

이제 io.emit()은 모든 연결된 클라이언트에게 메시지를 보내고, 다음과 같은 코드를 사용하여 프론트엔드에서 메시지를 받을 수 있어요.

```js
useEffect(() => {

  socket.on('statusChanged', data => {

    const filtered = data.filter(item => item.status.includes("보류 중"));
    SetOrdersData(filtered)
  });

}, [socket])
```



useEffect()은 React 컴포넌트로, 컴포넌트가 로드될 때마다 실행됩니다. 그러나 [socket]을 매개변수로 전달했기 때문에 useEffect()은 socket에 변경이 있을 때마다 실행됩니다.

# Stackademic 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 박수를 치고 작가를 팔로우해 주시면 감사하겠습니다! 👏
- 저희를 팔로우해 주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼도 방문해 주세요: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로그 플랫폼에 지쳤나요? Differ를 시도해 보세요
- Stackademic.com에서 더 많은 콘텐츠를 확인해 보세요