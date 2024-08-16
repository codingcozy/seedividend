---
title: "실시간 알림 React에서 종류 및 구현"
description: ""
coverImage: "/assets/img/2024-05-12-Real-TimeNotificationsinReactTypesandImplementations_0.png"
date: 2024-05-12 21:11
ogImage: 
  url: /assets/img/2024-05-12-Real-TimeNotificationsinReactTypesandImplementations_0.png
tag: Tech
originalTitle: "Real-Time Notifications in React: Types and Implementations"
link: "https://medium.com/@Has_San/real-time-notifications-in-react-types-and-implementations-ff720739bf6f"
isUpdated: true
---




![Real-Time Notifications in React: Types and Implementations](/assets/img/2024-05-12-Real-TimeNotificationsinReactTypesandImplementations_0.png)

## 소개:

실시간 알림은 웹 애플리케이션에서 사용자 참여를 촉진하고 적시에 업데이트를 제공하는 데 중요한 역할을 합니다. 이 안내서에서는 React 애플리케이션에서 다양한 유형의 실시간 알림과 그 구현을 탐색할 것입니다. Firebase 알림, One Signal 및 SignalR을 비롯한 많은 알림 라이브러리들이 있지만, 지금은 WebSocket, Server-Sent Events (SSE) 및 Push Notifications을 사용할 것입니다.

## 실시간 알림의 유형:



- WebSocket 통지: WebSocket은 클라이언트와 서버 간의 실시간 데이터 전송을 가능하게 하는 단일 TCP 연결 상에서 전이중(duplex) 통신 채널을 제공하는 통신 프로토콜입니다. 웹소켓 통지는 양방향 통신과 즉각적인 업데이트가 필요한 애플리케이션에 이상적입니다.
- 서버 보낸 이벤트(SSE): 서버 보낸 이벤트(SSE)는 단일 HTTP 연결 상에서 서버로부터 클라이언트로의 스트리밍 업데이트를 위한 표준입니다. SSE 알림은 단방향적이며, 데이터가 서버에서 클라이언트로 흐릅니다. 서버가 클라이언트로부터 시작되는 요청 없이 업데이트를 푸시해야 하는 애플리케이션에 적합합니다.
- 푸시 통지: 푸시 통지를 사용하면 웹 애플리케이션이 브라우저에서 열려 있지 않을 때에도 실시간 통지를 사용자에게 전달할 수 있습니다. 푸시 통지는 서버에서 사용자 기기로 서비스 작업자를 통해 전송되어, 시기 적절한 업데이트로 사용자 경험을 원활하게 만들고 사용자에게 다시 관심을 유도합니다.

## React에서 구현:

React 애플리케이션에서 각 유형의 실시간 통지를 구현하는 방법을 살펴봅시다.



React에서 WebSocket 알림을 사용하려면 socket.io-client와 같은 라이브러리를 사용하여 서버와 WebSocket 연결을 설정하고 실시간 업데이트를 수신할 수 있습니다.

```js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const NotificationsComponent = () => {
  const [notification, setNotification] = useState('');
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('notification', (data) => {
      setNotification(data.message);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h2>WebSocket 알림:</h2>
      <p>{notification}</p>
    </div>
  );
};
export default NotificationsComponent;
```

## Server-Sent Events (SSE):

React는 EventSource API를 통해 Server-Sent Events를 지원합니다. EventSource 객체를 사용하여 서버와 연결을 설정하고 업데이트를 수신할 수 있습니다.



```js
import React, { useEffect, useState } from 'react';

const NotificationsComponent = () => {
  const [notification, setNotification] = useState('');
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/notifications');
    eventSource.onmessage = (event) => {
      setNotification(event.data);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      <h2>Server-Sent Events (SSE) Notifications:</h2>
      <p>{notification}</p>
    </div>
  );
};
export default NotificationsComponent;
```

## 푸시 알림:

React에서 푸시 알림을 사용하려면 서비스 워커를 구현하여 들어오는 푸시 이벤트를 처리하고 사용자에게 알림을 표시해야 합니다.

```js
// 서비스 워커 파일 (sw.js)
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const title = '새 알림';
  const options = {
    body: data.message,
    icon: '아이콘/이미지/경로.png',
  };

event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
```



React 컴포넌트에서 서비스 워커를 등록하고 푸시 알림을 위해 Notification API를 사용하는 방법을 설명했습니다.

## 결론:

실시간 알림은 웹 애플리케이션 사용자를 정보를 제공하고 참여시키는 데 중요합니다. 이 안내서에서 WebSocket, Server-Sent Events (SSE), 및 푸시 알림 세 가지 유형의 실시간 알림을 탐색하고 React 애플리케이션에서 구현하는 방법을 안내했습니다. 실시간 알림을 통합함으로써 사용자 경험을 향상시키고 적시에 업데이트를 제공하여 React 애플리케이션의 성공에 기여할 수 있습니다. 즐거운 학습과 코딩하세요!