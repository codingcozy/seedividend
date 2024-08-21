---
title: "Go, HTMX, 템플로 채팅방 만드는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-MakingAChatroomwithGoHTMXandTempl_0.png"
date: 2024-07-12 19:24
ogImage:
  url: /assets/img/2024-07-12-MakingAChatroomwithGoHTMXandTempl_0.png
tag: Tech
originalTitle: "Making A Chatroom with Go, HTMX and Templ"
link: "https://medium.com/@hhartleyjs/making-a-chatroom-with-go-htmx-and-templ-aa5148737c0a"
isUpdated: true
---

마크다운 형식으로 표 태그를 변경하세요.

<img src="/assets/img/2024-07-12-MakingAChatroomwithGoHTMXandTempl_0.png" />

# 이렇게 만들어볼 거에요!

네, 알아요, 조금 무미건조해요. 용서해 주세요.

매번 같은 응답일 뿐이라는 것을 무시해 주세요. 게으름 때문입니다.

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

![Image](https://miro.medium.com/v2/resize:fit:1400/1*xVr2YsI-44Sxh8Lv0yD8KQ.gif)

# 먼저 개발 환경을 설정해보겠습니다.

# 프로젝트를 생성하고 패키지를 설치해주세요

```js
go mod init my-project

go get github.com/labstack/echo/v4
go get github.com/gorilla/websocket
go install github.com/a-h/templ/cmd/templ@latest
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

# Main.go

```go
package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", GetChatRoomPage)
	e.GET("/ws", Websocket)
	e.Logger.Fatal(e.Start(":1323"))
}
```

# Render.go

```go
// render.go
package main

import (
	"context"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func render(c echo.Context, component templ.Component) error {
	c.Response().Header().Set("Content-Type", "text/html; charset=utf-8")

	return component.Render(context.Background(), c.Response())
}
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

아래 예시는 Templ 컴포넌트를 쉽게 렌더링할 수 있도록 도와주는 작은 도우미 함수입니다.

# 채팅방 페이지

```js
//handlers.go
func GetChatRoomPage(c echo.Context) error {
 return render(c, components.ChatPage())
}
```

핸들러에서는 단순히 렌더 함수를 반환합니다.

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
//base.templ
package components

templ base() {
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <script src="https://unpkg.com/htmx.org@1.9.6" integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni" crossorigin="anonymous"></script>
            <script src="https://unpkg.com/htmx.org/dist/ext/ws.js"></script>

            <title>My amazing site</title>
        </head>
        <body>
            <div id="page_document">
                { children... }
            </div>
        </body>
    </html>
}
```

여기서는 HTMX 및 HTMX 웹소켓 플러그인/확장 프로그램인 두 개의 스크립트를 ‘import’하고 있습니다.

그런 다음 간단히 레이아웃을 구성하는 ' children... ' 컴포넌트를 추가합니다.

```js
//chat.templ

templ ChatPage() {
    @base() {
        <div hx-ext="ws" ws-connect="/ws">
          <div id="chat_room">
          </div>
          <form id="form" ws-send>
              <input name="chat_message"/>
              <button type="submit" >send</button>
          </form>

        </div>
    }
}
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

이제 베이스 템플릿을 상속하고 페이지를 만들 수 있어요.

- 먼저 웹소켓에 연결하는 상위 레이어 div를 만들어요.
- 그 다음에 "chat_room" div를 만들어요. 여기는 비어있죠. 웹소켓에서 반환하는 HTML이 이 div에 삽입될 거예요.
- 이제 웹소켓으로 데이터를 보낼 form을 선언하고, 이 데이터는 JSON으로 직렬화될 거에요.

# 웹소켓 핸들러

```js
//handlers.go
func Websocket(c echo.Context) error {
 ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
 if err != nil {
  return err
 }
 defer ws.Close()

 for {
  ChatLoop(ws, c)
 }

}
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

먼저 요청을 웹소켓으로 업그레이드하고, 웹소켓을 닫기 위해 defer를 사용합니다. 그 후에 루프를 시작하고 각 루프마다 ChatLoop 함수를 호출합니다.

```js
//chat.go
type HTMXMessage struct {
 ChatMessage string `json:"chat_message"`
 Headers     struct {
  HXRequest     string `json:"HX-Request"`
  HXTrigger     string `json:"HX-Trigger"`
  HXTriggerName string `json:"HX-Trigger-Name"`
  HXTarget      string `json:"HX-Target"`
  HXCurrentURL  string `json:"HX-Current-URL"`
 } `json:"HEADERS"`
}

func ChatLoop(ws *websocket.Conn, c echo.Context) {
 _, p, err := ws.ReadMessage()
 if err != nil {
  fmt.Println(err)
 }

 var msg HTMXMessage
 json.Unmarshal(p, &msg)

 var buf bytes.Buffer
 components.SentAndRecv(msg.ChatMessage, "You're an idiot").Render(context.Background(), &buf)
 err = ws.WriteMessage(websocket.TextMessage, buf.Bytes())
 if err != nil {
  c.Logger().Error(err)
 }

}
```

- 먼저 ReadMessage 함수를 호출하여 받은 메시지를 기다립니다.
- 메시지를 수신하면 json 라이브러리를 사용하여 바이트를 구조체로 변환합니다.
- 그 후에 데이터를 반환할 Templ을 위해 bytes.buffer를 선언합니다.
- 마지막으로 웹소켓에 바이트를 씁니다.

```js
//chat.templ
templ ChatMessage(content string) {
    <div hx-swap-oob="beforeend:#chat_room">
        <div>
            { content }
        </div>
    </div>
}

templ SentAndRecv(sent string, recv string) {
    @ChatMessage(fmt.Sprintf("User: %s", sent))
    @ChatMessage(fmt.Sprintf("Bot: %s", recv))

}
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

여기서 데이터를 반환할 2개의 템플릿 컴포넌트를 선언합니다. SentAndRecv는 클라이언트 측 자바스크립트를 사용하지 않고도 메시지를 DOM에 모두 추가하기 때문에, 사용자 경험이 놀라울 수 있습니다. 하지만 개발하기 매우 쉽습니다. 그래서 다음에 그것에 대해 생각하기로 합시다!

그런 다음 chatmessage는 hx-swap-oob 매개변수를 사용하여 div를 교체할 위치를 정의합니다. 이전에 페이지에서 선언한 chat_room div가 됩니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*xVr2YsI-44Sxh8Lv0yD8KQ.gif" />

그런 다음 매우 간단한 채팅방이 있습니다!

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

# 읽어 주셔서 감사합니다!

- 다음은 "Go 및 HTMX로 ChatGPT 작성하기"입니다 (완성되면 알림을 받으려면 팔로우해 주세요!)
- 관심이 있으시다면, 제 전자책을 확인해 보세요:
  "Go와 HTMX로 풀 스택 애플리케이션 작성하기"

# 다음 글

HTMX에 대해 더 알아보고 싶으시다면, HTMX 저자가 쓴 공식 Hypermedia Systems 책을 구매해보세요
