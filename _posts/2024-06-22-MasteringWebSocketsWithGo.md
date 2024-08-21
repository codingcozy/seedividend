---
title: "Go 언어로 WebSockets 완벽하게 마스터하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-MasteringWebSocketsWithGo_0.png"
date: 2024-06-22 13:52
ogImage:
  url: /assets/img/2024-06-22-MasteringWebSocketsWithGo_0.png
tag: Tech
originalTitle: "Mastering WebSockets With Go"
link: "https://medium.com/towards-data-science/mastering-websockets-with-go-c30d0ac48081"
isUpdated: true
---

![웹 소켓 사용 방법](/assets/img/2024-06-22-MasteringWebSocketsWithGo_0.png)

생각해보면, 일반적인 HTTP API는 정말 어리석습니다. 데이터를 가져오려면 해당 데이터에 대한 요청을 보내야 합니다. 웹 사이트의 데이터를 신선하게 유지해야 한다면 데이터를 계속 요청해야 하는 폴링이라는 방법을 사용해야 합니다.

이는 목적지에 도착했는지를 물어보는 자리에서 운전자가 "우리가 이미 도착했어"라고 말해주는 대신 뒷자리에 앉은 아이가 계속 "도착했니?"라고 물어보는 것과 같습니다. 이것이 웹사이트를 디자인할 때 사용하기 시작한 방식입니다. 참 어리석죠?

다행히도, 개발자들은 웹 소켓, WebRTC, gRPC, HTTP2 스트림, Server-Sent 이벤트 및 기타 양방향 통신과 같은 기술로 이를 해결했습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹소켓은 상호 양방향 통신의 가장 오래된 방법 중 하나이며 현재 널리 사용되고 있습니다. 대부분의 브라우저에서 지원되며 비교적 쉽게 사용할 수 있습니다.

이 튜토리얼에서는 웹소켓이 무엇이며 어떻게 작동하는지, 서버와 클라이언트 간에 통신하는 데 Go에서 사용하는 방법에 대해 다룰 것입니다. 또한 웹소켓 API에서 본 적이 있는 몇 가지 일반적인 함정을 탐구하고 이를 해결하는 방법도 살펴볼 것입니다.

이 튜토리얼에서는 다양한 채팅방에 참여할 수 있는 채팅 애플리케이션을 구축할 것입니다. 웹소켓 서버는 Go를 사용하여 구축되며 클라이언트는 순수 JavaScript를 사용하여 연결할 것입니다. 배운 패턴은 Go, Java, React 또는 다른 언어로 작성된 웹소켓 클라이언트를 사용할 때 쉽게 적용할 수 있습니다.

이 기사는 또한 녹화되어 내 YouTube 채널에서 확인할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 웹소켓이 뭔지, 그리고 왜 중요한지 알아보세요

![웹소켓](/assets/img/2024-06-22-MasteringWebSocketsWithGo_1.png)

웹소켓 표준은 RFC 645에서 정의되어 있습니다.

웹소켓은 서버로 초기 요청을 보내기 위해 HTTP를 사용합니다. 이것은 일반적인 HTTP 요청이지만, Connection: Upgrade라는 특별한 HTTP 헤더가 포함되어 있습니다. 이를 통해 클라이언트가 HTTP 요청의 TCP 연결을 장기적인 웹 소켓으로 업그레이드하려고 한다는 것을 서버에 알립니다. 서버가 HTTP 101 Switching Protocols로 응답하면 연결이 유지되어 클라이언트와 서버가 메시지를 상호간에 전이 가능하고 풀듀플렉스로 보낼 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

한 번 이 연결이 합의되면, 우리는 양쪽에서 데이터를 송수신할 수 있습니다. 웹소켓에 대해 이해해야 할 것은 더 이상 없습니다.

설치 중에 무슨 일이 벌어지는지 더 자세히 알고 싶다면, RFC를 추천드릴게요.

실시간 솔루션이 필요한지 궁금할 수도 있습니다. 그래서 다음은 웹소켓이 자주 사용되는 몇 가지 분야입니다.

- 채팅 애플리케이션 — 다른 클라이언트에게 메시지를 받아 전달해야 하는 애플리케이션들은 웹소켓에 완벽히 어울립니다.
- 게임 — 멀티플레이어를 갖고 있고 웹 기반의 게임을 개발한다면, 웹소켓은 정말 완벽한 매치입니다. 클라이언트로부터 데이터를 푸시하고 다른 플레이어들에게 브로드캐스트할 수 있습니다.
- 피드 — 데이터 피드가 필요한 애플리케이션의 경우, 업데이트된 데이터를 손쉽게 모든 클라이언트로 푸시할 수 있습니다.
- 실시간 데이터 — 실시간 데이터가 필요한 경우, 웹소켓은 탁월한 솔루션입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 애플리케이션의 기초를 설치하기

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_2.png)

간단한 HTTP 서버를 설정하여 파일 서버를 통해 웹 애플리케이션을 호스팅하는 방법으로 시작하겠습니다. React와 같은 웹 프레임워크를 사용하지 않도록 하려고 합니다. 대신 네이티브 JavaScript를 사용해 보겠습니다. 보통 WebSocket에 연결하는 단계는 매우 유사하기 때문에 사용 중인 프레임워크와의 연결에 문제가 없어야 합니다.

새 모듈을 초기화하는 것부터 시작하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
go mod init programmingpercy.tech/websockets-go
```

그런 다음 application의 시작점이 될 새로운 파일 main.go를 만듭니다.

먼저 application을 API를 서비스하고 HTML/JS 코드를 호스팅하도록 설정합니다. 그 이후에는 WebSocket 구현을 시작하여 따라가기 쉽도록 합니다.

이제 우리가 곧 구축할 웹사이트를 호스팅하기 위한 간단한 코드를 main.go에 작성해 봅시다. 우리는 곧 만들고 내용을 저장할 frontend 디렉토리만 서비스할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

자, 이제 프론트 엔드를 추가해 보겠습니다. 저희의 멋진 채팅 애플리케이션을 보여주기 위해 간단한 원시 HTML/JS/CSS 파일을 만들겠습니다. 사용자들이 특정 채팅방에 입력할 수 있는 채팅방 선택 양식과 메시지를 WebSocket을 통해 보낼 수 있는 두 번째 채팅방 메시지 양식으로 구성되어 있습니다.

이것은 단지 간단한 HTML과 JavaScript이지만, 아직 WebSocket 구현은 되어 있지 않습니다. 말하기 괜찮은 유일한 것은 클라이언트 브라우저가 WebSocket을 지원하는지 확인할 수 있는 글로벌인 window["WebSocket"]입니다. 이 값이 정의되지 않은 경우 사용자에게 그들의 브라우저가 지원되지 않는다는 경고 메시지를 보여줄 것입니다.

frontend이라는 폴더와 index.html이라는 파일을 만들어 주세요. 그런 다음 다음의 Gist로 index.html을 채워주세요. HTML과 JS 부분은 다루지 않겠습니다. 당신이 익숙하다고 가정할게요.

터미널에서 go run main.go를 실행하고 localhost:8080을 방문하면 WebSocket을 구현하기 시작할 모든 것이 갖춰진 멋진 웹사이트로 환영받을 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-22-MasteringWebSocketsWithGo_3.png" />

지금은 메시지를 보내거나 채팅방을 변경해도 콘솔에만 출력되지만, 이제 구현할 것입니다.

## 클라이언트 및 서버 사이의 WebSocket 연결

<img src="/assets/img/2024-06-22-MasteringWebSocketsWithGo_4.png" />

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

시작하기 위해 프론트엔드에 추가하여 웹소켓 API에 연결하도록 설정하겠습니다. JavaScript로는 간단하게 한 줄의 코드로 처리할 수 있어요.

JavaScript에는 가져올 필요 없이 사용할 수 있는 내장 웹소켓 라이브러리가 있어요. 우리는 new WebSocket(URL)을 사용하여 클라이언트를 생성할 수 있는데 먼저 URL을 만들어야 해요. URL은 프로토콜과 함께 일반적인 HTTP URL처럼 구성되어 있고, 그 뒤에 경로가 따라옵니다. 일반적으로 웹소켓은 /ws 엔드포인트에 배치하는 것이 표준입니다.

웹소켓을 사용할 때 두 가지 프로토콜이 있는데, ws와 wss가 있어요. 이것은 HTTP와 HTTPS처럼 작동하는데요, 여기에서의 S는 보안을 나타내며 트래픽에 SSL 암호화를 적용합니다.

이를 사용하는 것이 매우 추천되지만 인증서가 필요합니다. 이 부분은 나중에 적용할 예정이에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

windows.onload 함수에 ws://localhost/ws에 연결하는 라인을 추가해보세요.

지금까지 코드를 다시 실행해보고, 웹 사이트를 방문하면 아직 연결할 수 없다는 오류가 콘솔에 출력되는 것을 볼 수 있을 겁니다. 이는 단순히 백엔드가 아직 연결을 허용하지 않기 때문입니다.

이제 백엔드 코드를 업데이트하여 WebSocket 연결을 허용해봅시다.

먼저, 연결을 처리하고 일반 HTTP 요청을 WebSocket 연결로 업그레이드하는 Manager를 구축하겠습니다. 또한, Manager는 모든 클라이언트를 추적하는 역할도 담당할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹소켓 연결을 처리하기 위해 Gorilla WebSocket 라이브러리를 사용할 것입니다. 이는 HTTP 요청을 취해 TCP 연결을 업그레이드하는 Upgrader를 생성하여 수행됩니다. Upgrader에 버퍼 크기를 할당할 것이며, 이는 모든 새로운 클라이언트에 적용될 것입니다.

매니저는 /ws 엔드포인트에 호스팅할 serveWS라는 일반 HTTP HandlerFunc를 노출할 것입니다. 이 시점에서 연결을 업그레이드하고 간단히 다시 닫을 것이지만, 이렇게 연결할 수 있는지 확인할 수 있습니다.

manager.go라는 파일을 생성하고 코드를 gist에서 가져와서 채워 넣을 것입니다.

또한, /ws 엔드포인트에 serveWS를 추가하여 프론트엔드가 연결할 수 있게 할 것입니다. main.go의 setupAPI 함수 내에서 새로운 매니저를 생성하고 HTTP 핸들러를 추가할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! 다음 명령어를 사용하여 소프트웨어를 실행할 수 있어요.

```js
go run *.go
```

웹사이트를 방문하여 계속 진행하시면 콘솔에 더 이상 오류가 출력되지 않고 연결이 수락된 것을 확인할 수 있을 거예요.

## 클라이언트 및 관리

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-06-22-MasteringWebSocketsWithGo_5.png" />

모든 클라이언트 로직을 serveWS 함수에 추가할 수도 있지만, 그렇게 되면 매우 커질 수 있습니다. 클라이언트를 처리하는 데 사용되는 Client 구조체를 만드는 것을 추천합니다. 이 구조체는 클라이언트 관련 모든 로직을 담당하며 Manager에 의해 관리됩니다.

또한 클라이언트는 메시지를 동시에 안전하게 읽고 쓸 수 있어야 합니다. Go의 WebSocket 연결은 동시에 하나의 작성기만 허용하므로 버퍼가없는 채널을 사용하여 처리할 수 있습니다. 이 기술은 Gorilla 라이브러리 개발자들이 권장하는 기술입니다.

메시지를 구현하기 전에 Client 구조체를 생성하고 Manager에 클라이언트를 추가하거나 삭제할 수 있는 기능을 부여해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

저는 지금 client.go라는 새 파일을 만들었어요. 일단은 작고 고객과 관련된 로직을 담을 거에요.

ClientList라는 새로운 타입을 만들 건데, 이건 간단히 클라이언트를 조회하는 데 사용할 수 있는 맵이에요. 그리고 각 클라이언트가 매니저를 참조하도록 하고 싶어요. 이렇게 하면 클라이언트에서도 상태를 쉽게 관리할 수 있거든.

이제 매니저를 업데이트해서 새로 만든 ClientList를 보관하게 할 차례에요. 여러 사람이 동시에 연결할 수 있기 때문에 매니저도 sync.RWMutex를 구현해야 해요. 그래야 클라이언트 추가 전에 잠글 수 있어요.

또, NewManager 함수를 업데이트해서 ClientList를 초기화할 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

함수 serveWS를 업데이트하여 새로운 클라이언트를 연결과 함께 생성하고 매니저에 추가할 것입니다.

또한 클라이언트를 삽입하는 addClient 함수와 삭제하는 removeClient 함수로 매니저를 업데이트할 것입니다. 삭제 작업은 연결을 정상적으로 종료하도록 보장합니다.

새 클라이언트를 수락하고 추가할 준비가 되어있습니다. 아직 클라이언트를 제대로 제거할 수는 없지만 곧 할 수 있을 것입니다.

클라이언트가 메시지를 읽고 쓸 수 있는 기능을 구현해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 메시지 읽기 및 쓰기

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_6.png)

메시지 읽기 및 쓰기는 쉬운 작업처럼 보일 수 있지만, 실제로는 그렇습니다. 그러나 많은 사람들이 놓치는 작은 함정이 있습니다. WebSocket 연결은 하나의 동시 라이터만 허용됩니다. 이 문제를 해결하기 위해 버퍼가 없는 채널을 잠금 장치로 활용할 수 있습니다.

우리는 manager.go 내의 serveWS 함수를 업데이트하여 클라이언트 당 두 개의 고루틴을 생성하도록 변경할 것입니다. 현재는 작성 부분을 완전히 구현되기 전까지 주석 처리할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

소켓에서 메시지를 읽는 작업은 ReadMessage를 사용하여 수행됩니다. 이 함수는 메시지 유형, 페이로드 및 오류를 반환합니다.

메시지 유형은 전송되는 메시지의 유형이 무엇인지 설명하는 데 사용됩니다. Ping, pong, 데이터 또는 바이너리 메시지 등이 있습니다. 모든 유형은 RFC에서 확인할 수 있습니다.

오류는 무언가 잘못되었을 경우 반환될 것이며, 연결이 닫힌 후에도 오류가 반환됩니다. 따라서 특정 닫기 메시지를 확인하여 출력하고, 일반적인 닫기에 대해서는 기록하지 않도록 하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프론트엔드 코드를 업데이트하고 몇 가지 메시지를 보내서 제대로 작동하는지 확인해볼 수 있어요.

index.html 파일 내에는 지금 sendMessage라는 함수가 있는데, 현재는 콘솔에 메시지를 출력하는 역할을 합니다. 간단히 이를 업데이트하여 대신 웹소켓으로 메시지를 전송하도록 수정할 수 있어요. JavaScript로 메시지를 보내는 것은 conn.send 함수를 사용하는 것만큼 쉽습니다.

프로그램을 다시 시작하고 UI에 메시지를 입력한 후 Send Message 버튼을 누르면 메시지 유형과 페이로드가 stdout에 전송된 것을 확인할 수 있어요.

지금은 메시지를 보낼 수만 있지만 메시지를 처리하는 것은 없습니다. 이제 메시지를 작성할 수 있는 기능을 추가할 시간이 왔습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리가 WebSocket에 대해 한 번에 하나의 동시 프로세스로만 작성할 수 있다고 말한 것을 기억하시나요? 이러한 문제는 여러 가지 방법으로 해결할 수 있습니다. Gorilla가 권장하는 방법 중 하나는 동시 작성을 차단하기 위해 버퍼가 없는 채널을 사용하는 것입니다. 어떤 프로세스든 클라이언트 연결에 쓰기를 하려고 하면, 대신 이 메시지를 버퍼가 없는 채널로 작성합니다. 다른 프로세스가 현재 쓰기를 하는 경우에는 차단됩니다. 이렇게 함으로써 우리는 어떠한 동시성 문제도 피할 수 있게 됩니다.

우리는 클라이언트 구조체를 업데이트하여 이 채널을 보유하도록 하고, 생성자 함수를 사용하여 이를 초기화할 것입니다.

writeMessages 함수는 readMessages와 매우 유사합니다. 하지만 이 경우에는 연결이 닫혔음을 알리는 Err을 받지 않습니다. 우리가 대신 egress 채널이 닫힐 때 프론트엔드 클라이언트에 CloseMessage를 보내줍니다.

Go에서는 채널이 닫혔는지 여부를 알 수 있습니다. 두 번째 출력 매개변수를 수락하여 채널이 닫혔음을 나타내는 boolean을 얻을 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희는 messagetype을 첫 번째 입력 매개변수로, payload를 두 번째 입력 매개변수로 받는 connections WriteMessage 함수를 사용할 거에요.

만약 Go에 익숙하시다면, 현재 중복된 for select 문을 사용했다는 것을 알아채셨을 것입니다. 나중에 이 튜토리얼에서 선택 사항을 더 추가할 거에요.

지금은 egress로 푸시된 모든 메시지가 클라이언트에게 전송됩니다. 현재 어떤 프로세스도 메시지를 egress에 작성하지 않지만, 작동 여부를 테스트하기 위해 빠른 해킹을 할 수 있습니다.

우리는 readMessages에서 수신된 모든 메시지를 모든 다른 클라이언트에 브로드캐스트할 거에요. 간단히 말해, 모든 입력 메시지를 각 클라이언트의 egress로 출력함으로써 이 작업을 수행할 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

29번 라인에 for 루프만 추가했습니다. 나중에 제거할 거에요. 이건 단지 전체 Reading과 Writing이 의도대로 작동하는지 테스트한 거예요.

이제 프론트엔드를 업데이트해서 들어오는 메시지를 처리할 시간이에요. 자바스크립트는 웹소켓 이벤트를 다룰 때 일부 이벤트를 발생시킵니다. 그 이벤트들에 리스너를 적용할 수 있어요.

모든 이벤트는 문서에 자세히 설명되어 있어요. 빠르게 다룰 수 있을 거예요.

- Close — 웹소켓이 닫힐 때 발생합니다.
- Error — 웹소켓이 오류로 인해 닫힐 때 발생합니다.
- Message — 웹소켓이 새 메시지를 받았을 때 발생합니다.
- Open — 웹소켓 연결이 열렸을 때 발생합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프론트 엔드에서 할 일에 따라 이벤트 핸들러를 할당할 수 있어요. 저희는 메시지 이벤트에 관심이 있으므로, 일단 콘솔에 메시지를 출력하는 리스너를 추가할 거에요.

연결이 열리면 보낸 이벤트를 출력하는 간단한 함수를 추가할 거예요. 이 이벤트 객체에는 보낸 타임스탬프와 메시지 유형과 같은 많은 데이터가 들어 있어요. 우리는 데이터 필드에 포함된 페이로드를 원할 거에요.

이제 소프트웨어를 다시 시작하고 웹 사이트를 방문하여 몇 가지 메시지를 보내볼 수 있어요. 콘솔에서 이벤트가 보내고 받아지는 것을 볼 수 있어야 해요.

지금은 읽기와 쓰기가 잘 되는 것을 의미해요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 이벤트 접근을 사용한 확장

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_7.png)

지금은 연결하고 메시지를 보내고 받을 수 있습니다. 이 모든 것은 훌륭하며 기본 설정이 준비되었습니다.

이제, 하나의 종류의 메시지만 보내려면 작동할 수도 있습니다. 보통 이벤트/유형 기반 접근 방식을 채택하면 웹소켓을 확장하기가 더 쉬워집니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 말은 각 메시지를 보낼 때 기본 형식을 만든다는 것을 의미합니다. 이 형식에는 메시지 유형을 설명하는 특정 필드와 페이로드가 있습니다.

이게 익숙해보이나요?

왜냐하면 현재 WebSockets가 하는 것과 기본적으로 같습니다. 다만, 우리는 메시지를 JSON 개체로 보내고 응용 프로그램이 올바른 작업/함수를 수행하기 위해 라우팅할 수 있도록 합니다.

이 방식은 사용하기 쉽고 확장 가능하며 웹소켓을 다양한 사용 사례에 활용할 수 있는 방법입니다. 이것은 RPC 솔루션이라고 생각합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

자바스크립트 파일에 Event 클래스를 추가하여 수신 메시지를 구문 분석할 수 있도록 시작합니다. 그런 다음 이벤트를 routeEvent 함수에 전달하여 필드 유형의 값을 확인하고 해당 이벤트를 실제 핸들러로 전달합니다.

onmessage 리스너에서는 Event 클래스로 맞는 JSON 형식의 데이터를 기대할 것입니다.

또한 이벤트 이름과 페이로드를 입력으로 받는 sendEvent라는 함수를 생성할 것입니다. 이 함수는 입력을 기반으로 이벤트를 생성하고 JSON 형식으로 전송합니다.

사용자가 sendMessage를 사용하여 메시지를 보낼 때마다 sendEvent를 호출할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 JavaScript 부분을 다루는 코드를 보여주는 gist입니다.

이제 웹 사이트가 이벤트를 수락하고 보낼 수 있는 로직이 갖춰졌으니, 백엔드에서도 그 이벤트를 처리할 수 있도록 해야 합니다.

event.go라는 파일을 만들어 시작하세요. 이 파일에는 이벤트에 대한 모든 로직이 포함되어야 합니다.

우리는 백엔드에 Event 구조체를 갖고 싶을 것이고, 이는 JavaScript의 Event 클래스와 동일한 모양이어야 할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

페이로드의 데이터 타입이 json.RawMessage인 이유는 사용자가 원하는 페이로드를 보낼 수 있도록 하기 위해서입니다. 페이로드 데이터의 구조를 알고 있는 것은 이벤트 핸들러의 몫입니다.

백엔드에서 메시지를 받을 때, 우리는 type 필드를 사용하여 적절한 EventHandler로 라우팅할 것이며, eventhandler는 함수 시그니처입니다. 따라서, 새로운 기능을 추가하려면 시그니처 패턴을 충족하는 새로운 함수를 만들면 됩니다.

EventHandler 시그니처는 이벤트와 해당 메시지의 수신한 클라이언트를 받습니다. 또한 오류를 반환합니다. 클라이언트를 받는 이유는 일부 핸들러가 완료되면 응답을 반환하거나 클라이언트에게 다른 이벤트를 보낼 수 있기 때문입니다.

또한 페이로드 내에서 예상되는 형식인 SendMessageEvent를 추가할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

매니저가 EventHandlers의 맵을 저장하는 방식을 좋아합니다. 이렇게 하면 실제 응용 프로그램에서 매니저는 데이터베이스 저장소 등을 포함할 수 있어 쉽게 추가할 수 있습니다. 이를 추가하고 필요한 것들을 추가하는 데 사용되는 setupEventHandlers라는 새 함수를 추가할 것입니다.

일련의 핸들러를 쉽게 확장할 수 있는 멋진 방법은 이 EventHandlers를 Map에 저장하고 Type을 키로 사용하는 것입니다. 따라서 이벤트를 경로로 지정하는 대신 모든 핸들러를 보유한 Map을 유지할 것입니다.

들어오는 이벤트를 받아 맵에서 올바른 핸들러를 선택하는 routeEvent 함수를 추가할 것입니다.

이벤트 인프라 전체를 마련하기 전에 Client를 변경해야 할 마지막 조각입니다. 클라이언트의 readMessages는 들어오는 JSON을 이벤트로 변환한 다음 매니저를 사용하여 이벤트를 경로로 지정해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

클라이언트의 출구 채널도 raw bytes를 보내는 대신 이벤트를 보내도록 수정할 것입니다. 이는 writeMessages를 변경하여 데이터를 보내기 전에 마샬해야 한다는 것을 의미합니다.

백엔드를 다시 시작해보세요. `go run *.go`를 사용해서 메시지를 보내보세요. 'send_message [34 49 50 51 34]'와 같은 메시지가 출력되는 것을 확인할 수 있을 것입니다. 현재 Handler는 raw bytes를 파싱하지 않기 때문에 페이로드가 바이트로 출력될 것입니다.

이를 구현하기 전에 WebSocket과 관련된 몇 가지 더 다뤄야 할 주제가 있습니다.

## 하트비트 - 핑 & 퐁

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![WebSocket Ping and Pong](/assets/img/2024-06-22-MasteringWebSocketsWithGo_8.png)

웹소켓은 서버와 클라이언트 모두 Ping 프레임을 보낼 수 있습니다. Ping은 연결의 다른 부분이 여전히 살아 있는지 확인하는 데 사용됩니다.

우리는 다른 연결이 살아 있는지 확인하는 것 뿐만 아니라 그것을 계속 유지하기도 합니다. 아무 것도 하지 않는 웹소켓은 오랫동안 유휴 상태로 있으면 닫힐 수 있습니다. Ping 및 Pong은 채널을 쉽게 유지하고, 저 트래픽의 장기간 연결이 예상치 못하게 닫히는 것을 피할 수 있게 해줍니다.

Ping을 보내면 상대방은 Pong으로 응답해야 합니다. 응답이 없으면 상대방이 더 이상 살아 있지 않다고 가정할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

당신이 응답하지 않는 사람에게 계속 말하는 것은 논리적이죠.

이를 구현하려면 서버 코드에서 진행해야 합니다. API 서버는 각 클라이언트에게 자주 Pings를 보내고 Pong을 기다립니다. 그리고 만약 Pong이 없다면 해당 클라이언트를 제거할 것입니다.

먼저 사용할 타이머를 정의해 봅시다. client.go 내부에 pongWait와 pingInterval 변수를 생성할 것입니다. PongWait은 허용되는 Pong 사이의 초로, 클라이언트로부터의 각 Pong마다 리셋될 것입니다. 이 시간을 초과하면 연결을 끊을 것이며, 10초를 기다리는 것이 합리적이라고 할 수 있습니다.

pingInterval은 클라이언트에게 얼마나 자주 pings를 보내는지를 나타냅니다. 이것이 pongWait보다 낮아야 한다는 것에 주목하세요. PongWait보다 더 느리게 pings를 보내는 PingInterval을 가지고 있다면, PongWait가 취소될 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

만일 15초마다 핑을 보내지만 서버는 퐁을 받는 시간을 10초로만 허용한다면, 연결이 10초 후에 끊어질 것입니다.

이제 서버가 각 클라이언트에게 핑 메시지를 보낼 필요가 있습니다. 이는 클라이언트의 writeMessages 함수 내에서 이뤄질 것입니다. 핑 간격(pingInterval)을 기반으로 트리거하는 타이머를 생성할 것이며, 트리거되면 비어있는 페이로드를 가진 PingMessage 유형의 메시지를 보낼 것입니다.

이를 같은 함수 내에서 처리하는 이유는 연결이 동시 쓰기를 허용하지 않기 때문입니다. 이를 대신하여 egress에서 핑을 보내고 Event 구조체에 messageType 필드를 추가하는 다른 프로세스를 가질 수 있지만, 그 해결책이 조금 더 복잡하다고 생각합니다.

같은 함수 내에서 이를 실행함으로써 동시적인 쓰기를 방지하는데, 외부출력(egress)에서 읽거나 타이먼의 여부를 따질 것이기 때문에 두 경우를 동시에 수행하는 것을 막을 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Ping을 보내고 있습니다. 프론트엔드 코드를 업데이트할 필요는 없어요. 왜냐하면 RFC 명세에 따르면 PingMessage가 올 때마다 PongMessage를 보내야하는 것으로 정의되어 있거든요. WebSocket을 지원하는 브라우저들은 클라이언트가 Ping 메시지에 응답하도록 자동으로 구성되어 있어요.

그래서 서버가 클라이언트에 Ping을 보내고 있어요. 클라이언트는 Pong 메시지로 응답하지만 이제 어떻게 할까요?

서버에 PongHandler를 구성해야 해요. PongHandler는 PongMessage를 수신하면 트리거되는 함수에요. readMessages를 업데이트해서 초기 PongWait 타이머를 설정하고 연결을 유지할 시간을 역으로 카운트 다운할 거에요.

gorilla 패키지를 사용하면 SetReadDeadLine 함수를 통해 쉽게 설정할 수 있어요. 현재 시간을 가져와서 PongWait을 더한 다음, 해당 값을 연결에 설정할 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

새로운 PongMessage를 수신할 때마다 타이머를 재설정하는 pongHandler 함수를 만들 것입니다. SetReadDeadLine을 사용하여 client가 PongMessage를 받을 때마다 타이머를 재설정합니다.

좋아요, 이제 연결을 유지하여 웹사이트가 연결이 끊기지 않고 오랫동안 실행될 수 있습니다.

소프트웨어를 다시 시작해보고 서버에서 Pong 및 Pong이 인쇄되는지 확인해보세요.

대부분의 구현이 완료되었으니 이제 보안에 대해 고민해볼 시간입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 메시지 크기 제한

![image](/assets/img/2024-06-22-MasteringWebSocketsWithGo_9.png)

보안 규칙 중 하나는 항상 악의적 사용을 기대해야 한다는 것입니다. 사람들이 할 수 있다면 그들은 할 것입니다. 따라서 항상 하는 좋은 것 중 하나는 서버에서 처리할 수 있는 메시지의 최대 크기를 제한하는 것입니다.

이것은 악성 사용자가 DDOS에 대해 메가프레임을 보내거나 서버에서 다른 나쁜 일을 하는 것을 피하기 위함입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Gorilla는 백엔드에서 구성할 때 SetReadLimit을 사용하여 허용된 바이트 수를 받는 것이 매우 쉽습니다. 메시지가 제한을 초과하면 연결이 닫힐 것입니다.

사용자가 애플리케이션을 올바르게 사용하는 데 제한을 두지 않으려면 메시지의 크기를 알아야 합니다.

우리가 만들고 있는 채팅에서는 프론트엔드에서 문자 제한을 부과한 뒤 가장 큰 메시지와 일치하는 최대 크기를 지정할 수 있습니다.

각 메시지의 최대 크기를 512바이트로 설정하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

재시작하고 긴 메시지를 보내면 연결이 끊어질 수 있습니다.

## 출처 확인

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_10.png)

현재 상태에서는 어디서든 API에 연결할 수 있도록 허용하고 있습니다. 그렇게 하고 싶은 게 아니라면 이는 좋지 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

일반적으로, 프론트엔드는 어떤 서버에 호스팅되는데, 그 도메인이 유일하게 허용된 출처로 연결하는 것입니다. 이것은 Cross-Site Request Forgery를 방지하기 위해 수행됩니다.

Origin 확인을 다루기 위해 HTTP 요청을 수락하고 허용된 출처인지 간단한 문자열 체크를 통해 확인하는 함수를 작성할 수 있습니다.

이 함수는 func(r \*http.Request) bool 시그니처를 따라야 합니다. 왜냐하면 일반 HTTP 요청을 HTTP 연결로 업그레이드하는 업그레이더에는 해당 함수를 수락할 필드가 있기 때문입니다. 연결을 업그레이드하도록 허용하기 전에, 해당 요청에 대해 운영체제를 수행하여 출처를 확인합니다.

테스트하고 싶다면, 스위치 문에서 8080 이외의 다른 포트로 변경하고 UI를 방문해보십시오. 그러면 출처가 허용되지 않음 메시지와 함께 출구할 것을 볼 수 있을 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 인증

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_11.png)

API의 중요한 부분 중 하나는 인증할 수 있는 사용자만 허용해야 한다는 것입니다.

WebSocket에는 내장된 인증 유틸리티가 없습니다. 그러나 이는 문제가 되지 않습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

WebSocket 연결이 설정되기 전에 사용자를 인증하겠습니다. serveWS 함수에서.

이를 수행하는 두 가지 일반적인 방법이 있습니다. 두 가지 방법 모두 어느 정도 복잡하지만 심각한 문제는 아닙니다. 예전에는 Websocket 연결 URL에 사용자:비밀번호를 추가하여 일반적인 기본 인증을 전달할 수 있었지만 이 방법은 오랫동안 사용되지 않았습니다.

추천되는 두 가지 솔루션이 있습니다.

- 인증을 위한 일반적인 HTTP 요청이 OneTimePassword (OTP)을 반환하며 이를 WebSocket 연결에 사용할 수 있습니다.
- WebSocket에 연결하되, 특정 인증 메시지가 전달된 후에만 메시지를 수락합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

테이블 태그를 Markdown 형식으로 변경하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

RetentionMap은 OTP를 보관하는 간단한 맵을 만들 것입니다. 5초가 지난 OTP는 삭제됩니다.

또한 사용자를 인증하는 일반 HTTP 요청을 수락하는 새로운 로그인 엔드포인트를 만들어야 합니다. 이 예에서는 인증이 간단한 문자열 확인인데, 실제 프로덕션 응용프로그램에서는 인증을 실제 솔루션으로 대체해야 합니다. 인증 처리는 별도의 글을 작성할 주제입니다.

사용자가 호출할 때 OTP를 검증하도록 serveWS를 업데이트해야 하며, 프론트 엔드가 연결 요청과 함께 OTP를 보내도록 해야 합니다.

먼저 프론트 엔드를 변경하며 시작해 보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

간단한 로그인 양식을 만들고 연결 여부를 표시하는 텍스트와 함께 렌더링하려고 합니다. 따라서 index.html의 body를 업데이트하기로 합니다.

다음으로, 문서 로드 이벤트에서 WebSocket 연결을 제거할 것입니다. 사용자가 로그인하기 전에 연결을 시도하지 않기 때문입니다.

OTP 입력을 GET 매개변수로 추가하는 connectWebsocket 함수를 만들 것입니다. HTTP 헤더나 POST 매개변수로 추가하지 않는 이유는 브라우저에서 사용 가능한 WebSocket 클라이언트에서 지원되지 않기 때문입니다.

또한 onload 이벤트를 업데이트해서 loginform에 핸들러를 할당할 것입니다. 이 핸들러는 /login으로 요청을 보내고 OTP가 반환될 때까지 기다린 후 WebSocket 연결을 트리거할 것입니다. 인증 실패 시 경고를 표시할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

onopen과 onclose을 사용하여 올바른 연결 상태를 사용자에게 출력할 수 있습니다. index.html의 스크립트 섹션을 다음 함수가 있는 형태로 업데이트하세요.

이제 프론트 엔드를 시도해 볼 수 있으며, 로그인을 시도할 때 경고가 표시됩니다.

프론트 엔드에 이러한 변경 사항을 적용한 후에는 백엔드에서 OTP를 확인할 수 있도록 해야 합니다. OTP를 생성하는 여러 가지 방법이 있으며, 도움이 되는 라이브러리도 있습니다. 이 튜토리얼을 간단하게 유지하기 위해 저희는 OTP를 생성하고 만료되면 이를 제거하며 확인하는 매우 기본적인 도우미 클래스를 작성했습니다. OTP를 처리하는 더 나은 방법들이 많이 있습니다.

otp.go라는 새 파일을 생성했으며 아래의 핵심 내용이 포함되어 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

매니저를 업데이트하여 RetentionMap을 유지할 필요가 있습니다. 이를 사용하여 serveWS에서 OTP를 확인하고 사용자가 /login을 사용하여 로그인할 때 새 OTP를 생성할 수 있습니다. 보관 기간을 5초로 설정하고 기본 고루틴을 취소할 수 있는 컨텍스트를 수락해야 합니다.

다음으로 /login에서 작동하는 핸들러를 구현해야 합니다. 간단한 핸들러입니다. 인증 부분을 실제 로그인 확인 시스템으로 교체해야 합니다. 핸들러는 사용자 이름과 비밀번호가 포함된 JSON 형식의 데이터를 수락할 것입니다.

사용자 이름이 percy이고 비밀번호가 123 일 때 새 OTP를 생성하여 반환하고, 일치하지 않으면 권한이 없음 HTTP 상태를 반환할 것입니다.

또한 serveWS를 업데이트하여 otp GET 매개변수를 수락하도록 해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

마지막으로, main.go를 업데이트하여 로그인 엔드포인트를 호스팅하고 Manager에 Context를 전달해야 합니다.

이 모든 것이 준비된 후에는 이제 프론트 엔드를 사용할 수 있어야 합니다. 그러나 로그인 양식을 성공적으로 사용한 후에만 가능합니다.

해보세요. 메시지 보내기 버튼을 눌러도 아무 일도 일어나지 않을 것입니다. 그러나 로그인한 후에 WebSocket에서 메시지를 받아볼 수 있습니다.

이벤트는 콘솔에만 출력할 것입니다. 하지만 우리가 그쪽으로 갈 것입니다. 마지막으로 다룰 보안 측면이 하나 더 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## HTTPS 및 WSS를 사용하여 트래픽 암호화하기

![이미지](/assets/img/2024-06-22-MasteringWebSocketsWithGo_12.png)

우리는 지금 평문 트래픽을 사용하고 있습니다. 운영 환경으로 런칭하려면 HTTPS를 사용하는 것이 매우 중요합니다.

웹소켓을 HTTPS를 사용하도록 전환하려면 프로토콜을 ws에서 wss로 업그레이드하면 됩니다. WSS는 웹소켓 보안(WebSockets Secure)의 약어입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

index.html 파일을 열어 connectWebsocket의 연결 부분을 WSS를 사용하도록 변경해주세요.

지금 UI를 시도해도 연결되지 않을 것입니다. 왜냐하면 백엔드가 HTTPS를 지원하지 않기 때문입니다. 백엔드에 인증서와 키를 추가하여 이 문제를 해결할 수 있습니다.

만약 소유하지 않았다고 걱정하지 마세요. 이 튜토리얼 중에 사용할 자체 서명 인증서를 만들 수 있습니다.

OpenSSL을 사용하여 자체 서명 인증서를 생성하는 작은 스크립트를 만들었습니다. 그들의 Github에서 설치 노트를 확인할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
gencert.bash라는 파일을 만들어주세요. Windows를 사용하시는 경우에는 명령을 수동으로 실행할 수 있습니다.

명령을 실행하거나 bash 스크립트를 실행하세요.

bash gencert.bash

두 개의 새 파일인 server.key와 server.crt가 생성됩니다. 이 파일들을 절대로 공유하면 안 됩니다. 이 파일들을 GitHub에 실수로 푸시하지 않도록 더 안전한 위치에 저장해주세요. (진짜, 이런 일이 벌어집니다. 이런 실수를 찾는 봇들이 있습니다)
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위 작업을 완료하고 나면, main.go 파일을 업데이트하여 인증서를 사용하여 트래픽을 암호화하는 HTTP 서버를 호스팅해야 합니다. ListenAndServe 대신 ListenAndServeTLS를 사용하여 이 작업을 수행합니다. 동일한 방식으로 작동하지만 인증서 파일과 키 파일의 경로를 입력해야 합니다.

HTTPS 도메인을 허용하도록 originChecker를 업데이트하는 것을 잊지 마세요.

go run \*.go를 사용하여 서버를 다시 시작하고, 이번에는 https 사이트를 방문해보세요.

다음과 같이 에러 메시지가 표시될 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
2022/09/25 16:52:57 http: TLS handshake error from [::1]:51544: remote error: tls: unknown certificate
```

이것은 원격 오류입니다, 즉 클라이언트에서 서버로 전송된 것을 의미합니다. 이는 브라우저가 인증서 제공업체(즉, 여러분)를 인식하지 못하기 때문에 나타납니다. 이는 개발용으로 자체 서명된 인증서이므로 걱정하지 마세요.

실제 인증서를 사용하고 있다면 해당 오류를 보지 못할 것입니다.

축하합니다. 이제 HTTPS를 사용하고 있으며 WebSocket은 WSS를 사용하고 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 몇 가지 이벤트 핸들러 구현

이 튜토리얼을 마무리하기 전에, 실제 이벤트 핸들러를 구현하여 채팅이 제대로 작동하도록 해보고 싶어요.

우리는 웹소켓 관련 모든 것에 대한 프레임워크만 구현했어요. 핸들러 관련한 비즈니스 로직을 구현할 때입니다.

더 이상 아키텍처 원칙이나 웹소켓에 관한 정보를 다루지 않을 거예요. 우리는 최종적으로 실습을 통해 몇 가지 핸들러와 로직을 추가하는 간단한 과정을 진행할 거에요. 이 이벤트 접근 방식을 사용하여 웹소켓 API에 추가적인 핸들러와 로직을 어떻게 쉽게 추가할 수 있는지 확인하실 수 있을 거예요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

매니저.go를 업데이트하여 setupEventHandlers에서 실제 함수를 받도록 변경하겠습니다.

우리는 SendMessageHandler를 구현하고 싶습니다. 이 핸들러는 수신된 이벤트의 페이로드를 허용하고, 마샬링한 다음 다른 모든 클라이언트에게 출력해야 합니다.

event.go 파일에 다음을 추가할 수 있습니다.

백엔드에서 해야 할 일은 여기까지입니다. 이제 프론트엔드를 정리해서 자바스크립트가 원하는 형식으로 Payload을 보내도록 해야 합니다. 그러니 JavaScript에서 동일한 클래스를 추가하여 이를 이벤트에 보내겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

index.html의 Script 섹션 상단에 Event 유형에 대한 Class 인스턴스를 추가하십시오. 이러한 인스턴스는 event.go의 구조체와 일치해야 하므로 JSON 형식이 동일해야 합니다.

그런 다음, 새 메시지를 보낼 때 트리거되는 sendMessage 함수를 업데이트해야 합니다. 올바른 페이로드 유형을 보내도록 만들어야 합니다.

이것은 서버의 핸들러가 예상하는 SendMessageEvent 페이로드여야 합니다.

마지막으로, 클라이언트에서 메시지를 수신하면 콘솔 대신 텍스트 영역에 출력해야 합니다. NewMessageEvent를 예상하고 해당 메시지를 텍스트 영역에 추가하는 함수로 전달하는 routeEvent를 업데이트해 보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 클라이언트 간에 메시지를 보낼 수 있어야 합니다. 이를 쉽게 시도할 수 있습니다. 두 개의 브라우저 탭에서 UI를 열고 로그인한 후 자신과 채팅을 시작하세요. 그러나 밤을 새우지는 마세요!

모든 메시지를 모두에게 전달하지 않도록 새로운 채팅방을 관리할 수 있도록 쉽게 수정할 수 있습니다.

우선 index.html에 새로운 ChangeRoomEvent를 추가하고, 사용자가 채팅방을 전환했음을 알리는 채팅을 업데이트하도록 시작합시다.

manager.go에 새로운 ChangeEvent를 추가하여 새로운 이벤트를 처리하도록 setupEventHandlers에 추가하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Client 구조체에 채팅방 필드를 추가하여 사용자가 선택한 채팅방을 파악할 수 있습니다.

event.go 파일 내에 ChatRoomHandler를 추가하면 클라이언트의 새 채팅방 필드를 덮어쓸 수 있습니다.

또한 SendMessageHandler에서는 이벤트를 전송하기 전에 다른 클라이언트가 동일한 방에 있는지 확인합니다.

대단해요! 사용자가 채팅방을 전환할 수 있는 훌륭한 채팅 앱을 알게 되었습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

UI를 방문하고 한 번 시도해보세요!

## 결론

이 튜토리얼에서는 Websocket 서버를 위한 전체 프레임워크를 만들었습니다.

우리는 웹소켓을 안전하고 확장 가능하며 관리되는 방식으로 수용하는 서버를 갖게 되었습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 다음 측면을 다루었습니다.

- 웹소켓 연결 방법
- 웹소켓으로 메시지를 효과적으로 읽고 쓰는 방법
- 웹소켓을 이용한 Go 백앤드 API 구조화 방법
- 관리가 용이한 웹소켓 API를 위한 이벤트 기반 디자인 사용 방법
- PingPong이라는 하트 비팅 기법을 사용하여 연결을 유지하는 방법
- 점보 프레임을 피하기 위해 메시지 크기 제한으로 사용자가 웹소켓을 악용하는 것을 방지하는 방법
- 웹소켓이 허용하는 허용된 출처 제한 방법
- OTP 티켓팅 시스템을 구현하여 웹소켓을 사용할 때 인증하는 방법
- 웹소켓에 HTTPS 및 WSS 추가하는 방법

이 튜토리얼이 WebSocket API를 시작하기 전에 학습해야 할 모든 것을 다루었다고 강하게 믿습니다.

질문, 아이디어 또는 피드백이 있으면 언제든지 연락하길 권장합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 기사를 즐겨 보셨길 바라요! 저는 정말 즐거웠어요.
