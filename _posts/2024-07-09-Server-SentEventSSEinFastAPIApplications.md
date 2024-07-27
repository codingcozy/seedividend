---
title: "FastAPI 애플리케이션에서 Server-Sent EventSSE 사용 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Server-SentEventSSEinFastAPIApplications_0.png"
date: 2024-07-09 09:22
ogImage:
  url: /assets/img/2024-07-09-Server-SentEventSSEinFastAPIApplications_0.png
tag: Tech
originalTitle: "Server-Sent Event(SSE) in FastAPI Applications"
link: "https://medium.com/@rajansahu713/server-sent-event-sse-in-fastapi-applications-387dcd395d8d"
---

서버 전송 이벤트(Server-Sent Events, SSE)는 서버가 싱글 HTTP 연결을 통해 웹 클라이언트에 실시간 업데이트를 푸시할 수 있는 서버 푸시 기술입니다. 대시보드, 알림 또는 실시간 분석과 같이 실시간 업데이트가 필요한 애플리케이션에 특히 유용합니다.

![SSE](/TIL/assets/img/2024-07-09-Server-SentEventSSEinFastAPIApplications_0.png)

## SSE 소개

- SSE는 서버가 초기 클라이언트 연결을 설정하자마자 브라우저 클라이언트로 데이터 전송을 시작할 수 있는 표준입니다.
- 웹소켓과 달리 SSE는 양방향 통신이 아닌 단방향이며, 서버에서 클라이언트로 데이터가 흐릅니다.
- 이로써 SSE는 서버가 클라이언트로 업데이트를 푸시해야 하는 경우에 더 간단한 대안이 됩니다.

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

## 왜 SSE를 사용해야 하나요?

SSE는 다음과 같은 시나리오에서 유용합니다:

- 실시간 업데이트: 실시간 업데이트를 클라이언트에 푸시해야 하는 애플리케이션들, 예를 들어 실시간 스포츠 점수, 주식 시장 업데이트, 또는 채팅 애플리케이션 등.
- 서버 모니터링 및 대시보드: 실시간 모니터링 대시보드는 SSE를 활용하여 클라이언트가 서버를 계속 폴링할 필요 없이 메트릭 및 상태를 업데이트할 수 있습니다.
- 알림: 서버에서 보내는 알림을 SSE로 효율적으로 관리할 수 있어서, 클라이언트 측에서 지속적으로 폴링할 필요가 줄어듭니다.
- 스트리밍 데이터: 대용량 데이터 세트나 로그를 실시간으로 스트리밍하는 것을 SSE로 간단하게 구현할 수 있습니다.

# FastAPI에서 SSE 구현하기

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

FastAPI은 속도와 사용 편의성으로 유명하며, sse-starlette 라이브러리와 통합하여 SSE를 구현하는 데 잘 작동합니다. 다음은 설정 방법입니다.

# 예제 구현

## 단계 1: 필요한 라이브러리 설치

먼저, FastAPI와 sse-starlette를 설치하세요:

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
pip install fastapi sse-starlette
```

## Step 2: FastAPI 애플리케이션 생성

```js
from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
import asyncio

app = FastAPI()
async def event_generator():
    while True:
        await asyncio.sleep(1)
        yield {"data": "This is a server-sent event!"}
@app.get("/events")
async def sse_endpoint():
    return EventSourceResponse(event_generator())
```

이 예시에서 event_generator는 매 초마다 새 이벤트를 생성하는 비동기 생성자입니다. sse_endpoint 엔드포인트는 EventSourceResponse를 사용하여 SSE 연결을 처리합니다.

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

## FastAPI에서 SSE 사용 사례

- 대시보드용 실시간 업데이트:

  - SSE는 모니터링 시스템이나 실시간 분석 대시보드와 같은 실시간 메트릭을 표시하는 애플리케이션에 복잡한 WebSocket 관리 없이 업데이트를 푸시하는 간단한 방법을 제공합니다.

- 실시간 알림:

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

- 사용자에게 이벤트 알림이 필요한 애플리케이션(메신저 앱이나 알림 시스템과 같은)은 SSE를 사용하여 이러한 업데이트를 신속하게 전달할 수 있습니다.

- 스트리밍 로그:

- SSE는 실시간 로그나 기타 스트리밍 데이터를 표시해야 하는 애플리케이션에 잘 맞는 가벼운 솔루션입니다.

## SSE의 장점:

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

- 간편함: SSE는 웹소켓에 비해 구현과 관리가 간단합니다.
- 자동 재연결: 브라우저가 자동으로 재연결을 처리하여 SSE가 실시간 업데이트에 강력합니다.
- HTTP 호환성: SSE는 표준 HTTP/2 연결을 통해 작동하므로 기존 인프라와 작업하기 쉽습니다.

## SSE 대안:

- 웹소켓:

- 양방향 통신: 양방향 통신이 필요한 경우 웹소켓을 선호합니다.
- 낮은 지연 시간: 웹소켓은 SSE보다 낮은 지연 시간을 제공하여 온라인 게임과 같이 매우 상호작용적인 애플리케이션에 적합합니다.

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

- Long Polling:

- 호환성: Long polling은 오래된 브라우저와 호환되며 WebSockets이나 SSE를 지원하지 않는 경우에 사용할 수 있습니다.
- 오버헤드: 반복된 요청으로 인해 SSE나 WebSockets에 비해 더 많은 오버헤드를 도입합니다.

# SSE의 현실 세계에서의 사용 사례

서버-전송 이벤트 (SSE)는 실시간 업데이트를 필요로하는 현실 세계 애플리케이션에서 널리 사용되고 있습니다. 여기에 몇 가지 주목할 만한 예시가 있습니다:

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

- 라이브 스포츠 스코어
- 주식 시장 및 금융 데이터
- 소셜 미디어 플랫폼 등등..

우리는 ESPN이나 BBC Sports와 같이 제공되는 라이브 스포츠 스코어 업데이트 애플리케이션의 예시를 더 자세히 살펴보겠습니다.

진행 중인 축구 경기에 대한 실시간 업데이트를 제공하는 라이브 스포츠 스코어 애플리케이션을 상상해보세요. 이 애플리케이션은 골 득점 및 경기 통계와 같은 업데이트를 제공해야 합니다. 이곳이 [GitHub 링크](GitHub Link).

## SSE 구현

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

- 서버 측 구현:

아래 파일은 경기 개요를 포함하고 있습니다.

```js
// scores.py

[
  {
    time: "00:01",
    scores: "1:0",
    event: "Goal! Team A scores!",
  },
  {
    time: "00:05",
    scores: "1:1",
    event: "Goal! Team B scores!",
  },
  {
    time: "00:10",
    scores: "2:1",
    event: "Goal! Team A scores again!",
  },
];
```

- 서버는 경기 데이터의 실시간 피드를 유지하며 SSE를 사용하여 연결된 클라이언트에게 전송합니다.
- 어떤 이벤트(골, 교체 등)가 발생할 때마다, 서버는 이 업데이트를 모든 연결된 클라이언트에게 푸시합니다.

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

# main.py

from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
import asyncio
import json

app = FastAPI()

async def event_generator():
with open("scores.json", "r") as file:
scores = json.load(file)
for score in scores:
await asyncio.sleep(5)  
 yield f"Match Summary: {json.dumps(score)}\n\n"

@app.get("/live-scores")
async def live_scores_endpoint():
return EventSourceResponse(event_generator())

# Adding CORS middleware

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

Client-Side Implementation:

- 웹 응용 프로그램인 클라이언트는 서버와 SSE 연결을 설정하고 업데이트를 수신합니다.

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>Live Sports Scores</title>
  </head>
  <body>
    <h1>Live Football Scores</h1>
    <div id="score-updates"></div>

    <script>
      const eventSource = new EventSource("http://127.0.0.1:8000/live-scores");

      eventSource.onmessage = function (event) {
        const newElement = document.createElement("div");
        newElement.innerHTML = event.data;
        document.getElementById("score-updates").appendChild(newElement);
      };

      eventSource.onerror = function (event) {
        console.error("EventSource failed:", event);
        eventSource.close();
      };
    </script>
  </body>
</html>
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

## 참고

- https://fastapi.tiangolo.com/
- https://pypi.org/project/sse-starlette/

# 결론

sse-starlette를 사용하면 FastAPI 애플리케이션에 SSE를 통합하는 것이 간편하고 효율적입니다. 실시간 대시보드, 알림 시스템 또는 데이터 스트리밍 애플리케이션을 개발 중이든, SSE는 견고하고 간편한 해결책을 제공합니다.

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

읽어 주셔서 감사합니다! 만일 어떠한 오류를 발견하시거나 개선 제안이 있으시다면 아래 댓글에 공유해 주세요.

이 글이 마음에 들었다면 👏 버튼을 눌러 다른 사람들이 발견할 수 있도록 도와주세요. GitHub에서 제 프로필을 팔로우하고 LinkedIn에서 저와 연결해도 괜찮아요.
