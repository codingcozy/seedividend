---
title: "기본기를 넘어 WebSockets로 고성능 실시간 채팅 애플리케이션 만들기"
description: ""
coverImage: "/assets/img/2024-07-09-BeyondtheBasicsCreateaHigh-PerformanceReal-TimeChatApplicationwithWebSockets_0.png"
date: 2024-07-09 09:00
ogImage:
  url: /assets/img/2024-07-09-BeyondtheBasicsCreateaHigh-PerformanceReal-TimeChatApplicationwithWebSockets_0.png
tag: Tech
originalTitle: "Beyond the Basics: Create a High-Performance Real-Time Chat Application with WebSockets!"
link: "https://medium.com/@learntocodetoday/beyond-the-basics-create-a-high-performance-real-time-chat-application-with-websockets-8c0cc49036c5"
---

![image](/assets/img/2024-07-09-BeyondtheBasicsCreateaHigh-PerformanceReal-TimeChatApplicationwithWebSockets_0.png)

고성능 실시간 채팅 애플리케이션을 구축하는 것은 WebSockets를 활용하여 클라이언트와 서버 간에 양방향 통신을 하는 것을 의미합니다. WebSockets는 지연 시간이 낮은 상태로 데이터가 원활하게 흐를 수 있도록 지속적인 연결을 제공합니다. 이 튜토리얼에서는 서버 측에 Python을, 클라이언트 측에 JavaScript를 사용하여 실시간 채팅 애플리케이션을 만들어보겠습니다.

# 단계 1: 환경 설정하기

# 필수 라이브러리 설치

<div class="content-ad"></div>

먼저 Python과 Node.js가 설치되어 있는지 확인해주세요. 그런 다음 pip를 사용하여 필요한 Python 라이브러리를 설치해주세요.

```js
pip install websockets asyncio
```

클라이언트 측에서는 순수한 HTML, CSS 및 JavaScript를 사용할 것입니다.

# 단계 2: WebSocket 서버 생성

<div class="content-ad"></div>

파이썬의 asyncio와 웹소켓 라이브러리를 사용하여 서버를 생성할 거에요.

# 서버 코드

server.py 라는 파일을 만들고 다음 코드를 추가해주세요:

```python
import asyncio
import websockets

clients = set()

async def register(websocket):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
```
