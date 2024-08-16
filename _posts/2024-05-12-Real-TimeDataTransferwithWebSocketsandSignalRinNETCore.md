---
title: "NET Core에서 웹 소켓과 SignalR을 활용한 실시간 데이터 전송"
description: ""
coverImage: "/assets/img/2024-05-12-Real-TimeDataTransferwithWebSocketsandSignalRinNETCore_0.png"
date: 2024-05-12 19:05
ogImage: 
  url: /assets/img/2024-05-12-Real-TimeDataTransferwithWebSocketsandSignalRinNETCore_0.png
tag: Tech
originalTitle: "Real-Time Data Transfer with WebSockets and SignalR in .NET Core"
link: "https://medium.com/@siva.veeravarapu/real-time-data-transfer-with-websockets-and-signalr-in-net-core-409b0d50719b"
isUpdated: true
---




실시간 데이터 전송은 즉각적인 업데이트와 알림이 필요한 애플리케이션에 꼭 필요합니다. .NET Core에서 WebSockets 및 SignalR은 클라이언트와 서버 간의 실시간 통신을 구현하는 강력한 도구를 제공합니다. 이 안내서에서는 WebSockets 및 SignalR을 사용하여 .NET Core 애플리케이션에서 실시간 데이터 전송을 어떻게 구현하는지 살펴볼 것입니다.

DotNet-FullStack-Dev와 함께 계속해서 학습과 탐험의 여정을 떠나보세요. 더 많은 정보 확인은 https://dotnet-fullstack-dev.blogspot.com을 방문하거나 추가 정보를 얻으려면 연락해주세요.

# WebSockets 및 SignalR이란?

# WebSockets:



WebSockets는 단일 TCP 연결을 통해 전 이중 통신 채널을 제공하는 프로토콜입니다. 이를 통해 클라이언트와 서버 간에 양방향 통신이 가능하며 HTTP 폴링의 오버헤드 없이 비동기적으로 데이터를 송수신할 수 있습니다.

# WebSockets를 사용해야 하는 이유

- 실시간 통신: WebSockets를 이용하면 실시간 데이터 전송이 가능해지며, 채팅 애플리케이션, 실시간 대시보드, 온라인 게임 플랫폼과 같은 즉각적인 업데이트가 필요한 애플리케이션에 이상적입니다.
- 효율성: 전통적인 HTTP 폴링이나 롱 폴링 기술과 달리 WebSockets는 지속적인 연결을 유지하여 오버헤드를 줄이고 지연 시간을 최소화하며 네트워크 트래픽을 감소시킵니다.
- 전 이중 통신: WebSockets는 양쪽으로 동시에 데이터 전송을 지원하여 클라이언트와 서버가 독립적으로 메시지를 송수신할 수 있습니다.
- 확장성: WebSockets는 대규모 동시 연결을 효율적으로 처리할 수 있어 확장 가능하고 고성능 애플리케이션에 적합합니다.

# WebSockets 대안:

| **대안**                  | **설명**                                                                                                    |
|-----------------------|---------------------------------------------------------------------------------------------------------|
| Server-Sent Events    | 서버에서 클라이언트로 단 방향 메시지 스트림을 전송하는 기술로, WebSockets와 유사하지만 단방향 통신만 지원합니다.   |
| Long Polling           | 클라이언트가 서버에게 요청을 보내고, 서버는 데이터를 준비할 때까지 응답을 지연시키는 방법입니다.                  |



웹소켓은 실시간 통신에 널리 사용되지만, 유사한 기능을 제공하는 몇 가지 대안이 있습니다:

- Server-Sent Events (SSE): SSE은 서버가 HTTP 연결을 통해 클라이언트로 업데이트를 푸시할 수 있는 단방향 통신 프로토콜입니다. 웹소켓과 달리 SSE는 서버에서 클라이언트로의 통신에만 제한되며 양방향 통신을 지원하지 않습니다.
- Long Polling: Long Polling은 클라이언트가 서버에 요청을 보내고, 서버가 새로운 데이터가 나타날 때까지 연결을 유지하거나 타임아웃이 발생할 때까지 연결을 열어두는 기술입니다. Long Polling은 실시간 업데이트를 달성할 수 있지만, 연결을 자주 열고 닫기 때문에 웹소켓보다 효율성이 떨어집니다.

# 웹소켓의 장단점:

## 장점:



- 실시간 업데이트: 웹 소켓을 통해 실시간 통신이 가능하며 클라이언트에 즉시 업데이트를 제공합니다.
- 효율성: 웹 소켓은 폴링 기술과 비교하여 대기 시간과 네트워크 오버헤드를 줄입니다.
- 전이중 통신: 양방향 데이터 전송을 지원하여 클라이언트와 서버가 동시에 메시지를 보내고 받을 수 있습니다.
- 확장성: 웹 소켓은 많은 동시 연결을 효율적으로 처리할 수 있어 확장 가능한 애플리케이션에 적합합니다.

## 단점:

- 복잡성: 웹 소켓 연결을 구현하고 관리하는 것은 전통적인 HTTP 통신보다 더 복잡할 수 있습니다.
- 브라우저 지원: 최신 브라우저는 웹 소켓을 지원하지만 오래된 브라우저는 지원하지 않을 수 있어 대체 메커니즘이 필요할 수 있습니다.
- 방화벽 문제: 웹 소켓은 제한적인 방화벽이나 프록시 서버에서 웹 소켓 트래픽을 차단할 수 있는 문제가 있을 수 있습니다.

# SignalR:



SignalR은 .NET 애플리케이션에서 실시간 웹 기능을 간단하게 만드는 데 사용되는 웹소켓과 기타 전송 매커니즘 위에 구축된 고수준 라이브러리입니다. 이는 연결 관리를 추상화하고 클라이언트에게 메시지를 브로드캐스트하고 클라이언트-서버 통신을 다루기 위한 간단한 API를 제공합니다.

# SignalR을 사용해야 하는 이유:

- 간단한 개발: SignalR은 웹소켓 연결 관리의 복잡성을 감추고 .NET 애플리케이션에서 실시간 기능을 구현하기 위한 간단한 API를 제공합니다. 연결 관리, 메시지 라우팅 및 오류 처리를 처리하여 개발자가 응용프로그램 논리에 집중할 수 있습니다.
- 크로스 플랫폼 지원: SignalR은 서버 측 .NET 애플리케이션 및 클라이언트 측 JavaScript 프레임워크를 모두 지원하여 웹 애플리케이션, 데스크톱 애플리케이션 및 모바일 앱에서 실시간 기능을 구축하기에 적합합니다.
- 확장성: SignalR은 애플리케이션과 함께 확장되도록 설계되어 많은 동시 연결을 지원하며 다중 서버로 확장하거나 Azure SignalR 서비스와 같은 클라우드 기반 솔루션을 사용할 수 있는 옵션을 제공합니다.
- 후행 메커니즘: SignalR은 웹소켓을 지원하지 않는 클라이언트를 위해 Server-Sent Events (SSE) 또는 롱 폴링과 같은 대체 전송 메커니즘으로 자동으로 후행하므로 브라우저 및 기기에 걸쳐 넓은 호환성을 보장합니다.



신호R이 .NET 애플리케이션에서 실시간 웹 기능을 구현하는 데 인기 있는 선택지라는 것을 알고 계실 겁니다. 그러나 여러 대안들도 비슷한 기능을 제공합니다:

- Raw WebSocket APIs: 개발자들은 .NET이나 다른 프로그래밍 언어에서 제공하는 Raw WebSocket APIs를 활용하여, SignalR이 제공하는 추상화 없이 실시간 통신을 구현할 수 있습니다. 그러나 이 방식은 더 많은 수동 구성을 요구하며, 개발자들에게는 불편할 수도 있습니다.
- Third-Party Libraries: .NET 애플리케이션에서 실시간 통신을 구현하는 데 사용할 수 있는 외부 라이브러리들이 있습니다. Socket.IO for .NET이나 Fleck과 같은 라이브러리들은 추가 기능과 유연성을 제공하지만, 통합 및 유지보수에 더 많은 노력이 필요할 수 있습니다.

# SignalR의 장단점:

## 장점:



- 간편한 개발: SignalR은 실시간 기능을 구현하는 데 사용하기 위한 고수준 API를 제공하여 개발 시간과 복잡성을 줄여줍니다.
- 크로스 플랫폼 지원: SignalR은 웹 브라우저, 데스크톱 애플리케이션 및 모바일 기기를 포함한 다양한 클라이언트를 지원합니다.
- 확장성: SignalR은 애플리케이션과 함께 확장되도록 설계되어 많은 동시 연결을 지원하고 여러 서버로 확장할 수 있는 옵션을 제공합니다.
- 후행 메커니즘: SignalR은 웹소켓을 지원하지 않는 클라이언트를 위해 대체 전송 메커니즘으로 자동으로 후행하므로 넓은 호환성을 보장합니다.

## 단점:

- .NET 프레임워크/Core에 대한 의존성: SignalR은 .NET 생태계와 긴밀하게 결합되어 있어 다른 기술로 개발된 애플리케이션에는 적합하지 않을 수 있습니다.
- 성능 부하: SignalR은 개발을 단순화하지만 원시 웹소켓 구현과 비교해 일부 성능 부하를 도입할 수 있습니다.
- 복잡성: SignalR은 실시간 통신의 일부 복잡성을 추상화하지만 복잡한 시나리오에서는 추가 구성 및 문제 해결이 필요할 수 있습니다.

# 왜 실시간 데이터 전송을 사용해야 할까요?



실시간 데이터 전송은 채팅 애플리케이션, 실시간 대시보드 및 모니터링 시스템, 협업 문서 편집 도구, 온라인 게임 플랫폼, 주식 시장 추적 애플리케이션, 라이브 스포츠 점수판과 같이 실시간 업데이트가 필요한 애플리케이션에 필수적입니다.

# SignalR을 사용한 .NET Core 구현

## 단계 1: SignalR 설치



NuGet Package Manager를 사용하여 SignalR 패키지를 설치하세요:

```js
dotnet add package Microsoft.AspNetCore.SignalR
```

## 단계 2: SignalR 허브 만들기

클라이언트 연결을 관리하고 메시지 브로드캐스팅을 처리하는 SignalR 허브를 만드세요.



```js
Microsoft.AspNetCore.SignalR를 사용하여 SignalR을 구성하고 있어요. WebSocket 지원을 활성화하고 허브 엔드포인트를 매핑하려면 Startup 클래스에서 SignalR을 구성하세요.

public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<ChatHub>("/chatHub");
    });
}



## 단계 4: 클라이언트 측 통합

클라이언트 측에 SignalR을 통합하여 연결을 설정하고 실시간 업데이트를 받으세요.

<!DOCTYPE html>
<html>
<head>
    <title>SignalR 채팅</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/signalr/5.0.0/signalr.min.js"></script>
</head>
<body>
    <div id="messages"></div>
    <input type="text" id="messageInput" />
    <button onclick="sendMessage()">전송</button>

    <script>
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        connection.on("ReceiveMessage", (user, message) => {
            document.getElementById("messages").innerHTML += `<p><strong>${user}</strong>: ${message}</p>`;
        });

        connection.start().then(() => {
            console.log("SignalR 허브에 연결되었습니다");
        }).catch((err) => {
            console.error("SignalR 허브에 연결하는 중 오류가 발생했습니다:", err);
        });

        function sendMessage() {
            const user = "사용자"; // 입력값으로부터 사용자 정보 가져오기
            const message = document.getElementById("messageInput").value;
            connection.invoke("SendMessage", user, message);
        }
    </script>
</body>
</html>

이 예제를 확장하여 클라이언트로부터 메시지를 받고 백엔드와 프론트엔드 코드를 사용한 엔드 투 엔드 솔루션을 제공해보죠.



# Backend: ASP.NET Core Web API with SignalR

## Step 1: SignalR 허브 생성

클라이언트 연결을 관리하고 메시지 브로드캐스팅을 처리하는 SignalR 허브를 생성하세요.

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public void ReceiveMessage(string user, string message)
    {
        // 받은 메시지 처리(예: 데이터베이스 저장, 처리 등)
    }
}



## 단계 2: Startup에서 SignalR 구성

Startup 클래스에서 SignalR을 구성하여 WebSocket 지원을 활성화하고 허브 엔드포인트를 매핑합니다.

public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<ChatHub>("/chatHub");
    });
}

## 단계 3: 메시지 수신을 위한 컨트롤러 생성



클라이언트로부터 수신된 메시지를 처리하는 컨트롤러를 만들어보세요.

using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatController(IHubContext<ChatHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("ReceiveMessage")]
    public async Task<IActionResult> ReceiveMessage(string user, string message)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", user, message);
        return Ok();
    }
}

# Frontend: React UI with SignalR

## Step 1: SignalR 클라이언트 라이브러리 설치



JavaScript SignalR 클라이언트 라이브러리를 npm을 사용해서 설치해주세요.

npm install @microsoft/signalr

## 단계 2: WebSocket 연결 생성

SignalR 허브에 대한 WebSocket 연결을 생성하고 들어오는 메시지를 처리하세요.



import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        newConnection.on("ReceiveMessage", (user, message) => {
            setMessages([...messages, { user, message }]);
        });

        newConnection.start()
            .then(() => console.log("SignalR 허브에 연결되었습니다."))
            .catch(error => console.error("SignalR 허브에 연결 중 오류 발생:", error));

        setConnection(newConnection);
    }, []);

    const sendMessage = () => {
        const user = "User"; // 입력에서 사용자 가져오기
        const message = "안녕, SignalR!"; // 입력에서 메시지 가져오기
        connection.invoke("SendMessage", user, message)
            .catch(error => console.error("메시지 전송 중 오류 발생:", error));
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.user}</strong>: {message.message}
                    </div>
                ))}
            </div>
            <input type="text" />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default Chat;

# 결론

이 가이드에서는 .NET Core 애플리케이션에서 웹소켓과 SignalR을 사용하여 실시간 데이터 전송을 구현하는 방법을 살펴보았습니다. SignalR을 활용하면 클라이언트와 서버 간의 실시간 통신을 쉽게 구현할 수 있어서 상호작용적이고 협업이 가능한 웹 애플리케이션을 구축하기에 이상적입니다. 채팅 애플리케이션, 실시간 대시보드, 멀티플레이어 게임을 구축할 때, 사용자에게 실시간 업데이트를 제공하는 데 필요한 도구를 제공하는 SignalR을 사용할 수 있습니다.

이 가이드에서는 .NET Core 백엔드와 React 프런트엔드를 사용하여 SignalR을 통한 실시간 메시징을 구현하는 방법을 안내했습니다. 사용자는 프런트엔드에서 메시지를 보내고, 백엔드 SignalR 허브에서 모든 연결된 클라이언트에게 메시지를 수신 및 브로드캐스트합니다. 이 최종 솔루션은 웹 애플리케이션에 대한 실시간 메시징 경험을 원활하게 제공합니다.
```



표 태그를 Markdown 형식으로 변경해주실래요.