---
title: "실시간 성능 최적화 WebSockets와 Reactjs 통합하는 방법 Part I"
description: ""
coverImage: "/assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_0.png"
date: 2024-06-22 03:04
ogImage:
  url: /assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_0.png
tag: Tech
originalTitle: "Optimizing Real-Time Performance: WebSockets and React.js Integration Part I"
link: "https://medium.com/@SanchezAllanManuel/optimizing-real-time-performance-websockets-and-react-js-integration-part-i-e563664647d3"
isUpdated: true
---

<img src="/assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_0.png" />

요즘에는 많은 양의 데이터가 있는데, 그것을 빨리 얻고 모든 것이 잘 작동하는 것이 정말 중요해요. 하지만 때로는 예전 방식(HTTP 요청)을 사용해서 계속해서 데이터를 요청하는 것은 오늘날 앱에는 충분히 빠르지 않을 수도 있어요. 그런 상황에서 WebSockets가 등장해요. WebSockets는 거의 즉시 업데이트를 보낼 수 있어 마치 마법 같은 기술이에요. 이를 통해 최신 정보를 곧바로 받아볼 수 있어요.

그리고 React와 함께 사용한다면, 실시간으로 정보를 얻는 새로운 방식이 열립니다. React는 정말 빠른데, 너무 많은 것을 변경하면 신중하지 않으면, 앱이 느려지거나 작동을 멈출 수도 있어요. 그래서 React에서 일어나는 변경 사항을 신중하게 다루는 것은 중요해요, 특히 WebSockets를 사용할 때는요.

우선, 이를 최적화하지 않은 방법에 대해 먼저 이야기해볼게요. 나중에는 React와 WebSockets를 사용하는 최적화된 방법에 대해 더 깊이 탐구해볼 거에요. 기대해주세요, 우리는 응용 프로그램의 성능과 효율성을 극대화하기 위한 WebSockets를 활용하는 최상의 방법에 대해 탐구할 거예요.

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

# 먼저 WebSocket이란 무엇인가요? 웹소켓 이해하기

웹소켓은 단일, 오래 지속되는 연결을 통해 전이편된 통신 채널을 제공합니다. 이를 통해 클라이언트(브라우저)와 서버 간 실시간 데이터 교환이 가능해집니다. 전통적인 HTTP 요청과는 달리 웹소켓은 클라이언트와 서버가 모두 통신을 시작할 수 있어 즉각적인 업데이트가 필요한 응용 프로그램에 이상적입니다.

실시간 데이터 스트리밍의 장점

- 효율성 향상: 웹소켓을 통해 데이터 업데이트가 원활해집니다. 한 번 연결되면 데이터가 지연 없이 흘러가며 지속적인 요청 시간을 제거합니다.
- 즉각적인 업데이트: 웹소켓을 통해 즉각적으로 업데이트를 받을 수 있습니다. 시장 동향이나 암호화폐 가격 추이를 추적하는 경우에도 신속한 결정을 위해 항상 최신 정보를 얻을 수 있습니다.
- 양방향 대화: 웹소켓을 이용하면 서버와 클라이언트가 즉각적으로 양방향 대화를 할 수 있습니다. 모두가 듣고 듣는 빠른 대화와 같아서 팀워크가 쉬워집니다.
- 확장성: 데이터 요구가 증가함에 따라 웹소켓은 부하를 다룰 수 있습니다. 연결을 열어두기 때문에 많은 사용자가 있더라도 원활하게 작동합니다.

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

<img src="/assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_1.png" />

# React에서 WebSockets 사용하기

이제, 웹소켓의 강점을 React 애플리케이션으로 가져올 수 있는 "react-use-websocket"이라는 유용한 도구에 대해 이야기해보겠습니다. 이 라이브러리는 웹소켓을 React 컴포넌트에 통합하는 과정을 단순화하여 심지어 초보자들도 사용할 수 있게 해줍니다.

"react-use-websocket"을 사용하면 WebSocket 연결을 쉽게 설정할 수 있고, 메시지를 보내고 받을 수 있으며, 연결 오류를 처리할 수 있습니다 - 모두 React 컴포넌트 내에서 가능합니다. 시작하는 방법은 다음과 같습니다:

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

- 설치: 라이브러리를 설치하려면 npm 또는 yarn을 사용하여 다음과 같이 시작하세요:

```js
npm install react-use-websocket
```

또는

```js
yarn add react-use-websocket
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

2. 사용 방법: 설치한 후에는 React 컴포넌트에서 useWebSocket 훅을 가져와 사용할 수 있습니다. 아래는 기본 예제입니다:

```js
import React from "react";
import { useWebSocket } from "react-use-websocket";

const MyComponent = () => {
  const { sendMessage, lastMessage } = useWebSocket("wss://example.com/ws");

  const handleClick = () => {
    sendMessage("Hello, WebSocket!");
  };

  return (
    <div>
      <button onClick={handleClick}>메시지 보내기</button>
      <p>최근 메시지: {lastMessage ? lastMessage.data : "없음"}</p>
    </div>
  );
};

export default MyComponent;
```

이 예제에서는 'wss://example.com/ws'로 WebSocket 연결을 설정하기 위해 useWebSocket 훅을 사용하고 있습니다. sendMessage 함수를 사용하여 메시지를 보내고, lastMessage 객체를 사용하여 최근 받은 메시지를 표시합니다.

3. 이벤트 처리: "react-use-websocket"은 onOpen, onMessage, onError, onClose와 같은 다양한 WebSocket 이벤트를 처리하는 훅을 제공합니다. 이러한 훅을 사용하여 UI를 업데이트하거나 오류를 기록하는 등 다양한 WebSocket 이벤트에 기반한 작업을 수행할 수 있습니다.

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
const { sendMessage, lastMessage, readyState } = useWebSocket("wss://example.com/ws", {
  onOpen: () => console.log("WebSocket connection opened!"),
  onClose: () => console.log("WebSocket connection closed!"),
  onError: (event) => console.error("WebSocket error:", event),
  onMessage: (event) => console.log("Received message:", event.data),
});
```

“리액트-유즈-웹소켓”을 사용하면 React 애플리케이션에 WebSocket을 쉽고 직관적으로 통합할 수 있습니다. 실시간 채팅 애플리케이션, 실시간 데이터 대시보드 또는 협업 도구를 구축하든, "리액트-유즈-웹소켓"을 사용하면 익숙한 React 환경에서 WebSocket의 강력함을 활용할 수 있습니다.

# 좀 더 전체적인 예시를 살펴보겠습니다.

이를 위해 cryptocompare와 같은 외부 웹소켓을 사용할 것인데, 그를 위해 무료 API 키를 생성하기 위해 계정을 생성해야 합니다. 자세한 지침은 여기를 참고하세요.

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

API 키를 받은 후 다음 패키지를 추가하겠습니다:

```js
npm i react-use-websocket bootstrap react-bootstrap react-router-dom --save
```

또는

```js
yarn add react-use-websocket bootstrap react-bootstrap react-router-dom
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

부트스트랩 패키지는 스타일링을 위한 것입니다.

설치가 완료되면 Home.tsx 컴포넌트를 생성하겠습니다. 이 컴포넌트에는 입력 텍스트만 포함되어 있고 api 키를 제출하여 http://localhost:3000/dashboard로 리디렉션하고 api_key를 쿼리 매개변수로 추가할 것입니다.

```js
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/dashboard?api_key=${apiKey}`);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme="dark" style={{ color: "white" }}>
        <Modal.Header closeButton>
          <Modal.Title>react use websocket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Api key:</Form.Label>
              <Form.Control type="text" placeholder="Please provide api key" value={apiKey} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
```

Dashboard.tsx 컴포넌트에는 웹소켓 응답 객체를 위한 인터페이스를 생성해야 합니다.

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

위의 코드를 한글로 번역하면 다음과 같습니다:

```js
export interface CryptoMessage {
  TYPE: string;
  M: string;
  FSYM: string;
  TSYM: string;
  F: string;
  ID?: string;
  TS?: string;
  Q?: number;
  P?: number;
  TOTAL?: number;
  RTS?: string;
  CCSEQ?: number;
  TSNS?: number;
  RTSNS?: number;
}
```

그리고 useWebSocket 훅을 호출하세요.

```js
const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket < CryptoMessage > (socketUrl, { share: true });
```

이제 readyState, sendJsonMessage, lastJsonMessage가 무엇인지 설명하겠습니다.

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

ReadyState:

"useWebSocket" 훅에서 제공하는 readyState 속성은 현재 WebSocket 연결 상태를 나타냅니다. WebSocket 연결이 보류 중인지, 열린 상태인지, 닫히는 중인지 또는 닫힌 상태인지를 나타냅니다. readyState 속성은 다음 네 가지 값 중 하나를 가질 수 있는 정수 값입니다:

- CONNECTING (0): 이 상태는 WebSocket 연결이 설정 중인 상태를 나타냅니다. useWebSocket 훅을 초기 호출하고 WebSocket 연결을 시작할 때 연결이 성공적으로 설정될 때까지 CONNECTING 상태로 진입합니다.
- OPEN (1): 이 상태는 WebSocket 연결이 열려 있고 메시지를 보내고 받을 준비가 된 상태를 나타냅니다. 연결이 성공적으로 설정되면 OPEN 상태로 전환되어 클라이언트와 서버 간에 양방향 통신이 가능해집니다.
- CLOSING (2): 이 상태는 WebSocket 연결이 닫히는 중인 상태를 나타냅니다. useWebSocket 훅에서 제공하는 closeWebSocket 함수를 사용하여 WebSocket 연결을 종료하면 닫히기 전에 CLOSING 상태로 진입합니다.
- CLOSED (3): 이 상태는 WebSocket 연결이 닫힌 상태를 나타냅니다. 연결이 서버에 의해 닫히거나 클라이언트가 명시적으로 closeWebSocket 함수를 사용하여 연결을 닫으면 발생합니다. 연결이 닫힌 후에는 새 WebSocket 연결을 초기화할 때까지 CLOSED 상태로 유지됩니다.

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

"useWebSocket" 라이브러리 내의 useWebSocket 훅에서 제공하는 sendJsonMessage 함수는 WebSocket 연결을 통해 JSON 형식의 메시지를 보내는 데 유용한 유틸리티 함수입니다. 이 함수는 JavaScript 객체를 JSON 문자열로 직렬화하는 번거로운 작업을 추상화하여 구조화된 데이터를 WebSocket 서버로 보내는 프로세스를 간소화합니다.

lastJsonMessage:

"useWebSocket" 라이브러리 내의 useWebSocket 훅에서 제공하는 lastJsonMessage 속성은 WebSocket 연결을 통해 수신한 JSON 형식의 최근 메시지를 나타냅니다. 이 속성을 사용하면 React 컴포넌트 내에서 받은 마지막 메시지에 포함된 데이터에 액세스하고 처리할 수 있습니다.

다음 코드는 현재 WebSocket 연결 상태를 UI에 표시합니다:

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
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSearchParams } from "react-router-dom";

export interface CryptoMessage {
  TYPE: string;
  M: string;
  FSYM: string;
  TSYM: string;
  F: string;
  ID?: string;
  TS?: string;
  Q?: number;
  P?: number;
  TOTAL?: number;
  RTS?: string;
  CCSEQ?: number;
  TSNS?: number;
  RTSNS?: number;
}

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const api_key = searchParams.get("api_key");
  const socketUrl = `wss://streamer.cryptocompare.com/v2?api_key=${api_key}`;
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket < CryptoMessage > (socketUrl, { share: true });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "연결 중",
    [ReadyState.OPEN]: "열림",
    [ReadyState.CLOSING]: "닫히는 중",
    [ReadyState.CLOSED]: "닫힘",
    [ReadyState.UNINSTANTIATED]: "미초기화",
  }[readyState];

  return <>{connectionStatus} </>;
};

export default Dashboard;
```

"열림" 상태를 받으면 WebSocket 서비스로 메시지를 보낼 수 있습니다.

```js
useEffect(() => {
  if (readyState === ReadyState.OPEN) {
    sendJsonMessage({
      action: "SubAdd",
      subs: ["0~Coinbase~BTC~USD", "0~Coinbase~BTC~EUR", "0~Coinbase~ETH~USD", "0~Coinbase~ETH~EUR"],
    });
  }
}, [readyState, sendJsonMessage]);
```

sendJsonMessage 내에 있는 json 객체를 설명해보겠습니다:

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

# 작업:

- 해당 객체에는 값이 "SubAdd"인 action 속성이 포함되어 있습니다.
- 이는 WebSocket 서버에서 수행할 작업이 새 데이터 스트림에 구독하는 것임을 나타냅니다.

# 구독:

- 해당 객체에는 subs라는 속성이 포함되어 있으며 구독 문자열의 배열을 보유합니다.
- 각 구독 문자열은 클라이언트가 구독하려는 특정 데이터 스트림을 나타냅니다.
- 각 구독 문자열의 형식은 "0~'거래소'~'기초통화'~'견적통화'"입니다. 여기서:
- "0": 스트리밍 데이터에 대한 구독을 나타냅니다 (역사적 데이터와 대조됨).
- '거래소': 데이터를 제공하는 거래소의 이름을 나타냅니다 (예: "코인베이스").
- '기초통화': 거래 페어의 기초 통화를 나타냅니다 (예: 비트코인의 경우 "BTC", 이더리움의 경우 "ETH").
- '견적통화': 거래 페어의 견적 통화를 나타냅니다 (예: 미국 달러의 경우 "USD", 유로의 경우 "EUR").

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

요약하자면, 이 코드는 WebSocket 서버에게 새로운 데이터 스트리밍을 위한 구독을 추가하도록 지시합니다. subs 배열에 지정된 구독은 Coinbase 거래소의 다양한 거래 페어를 대상으로 하며, BTC/USD, BTC/EUR, ETH/USD 및 ETH/EUR 등이 포함됩니다. 이를 통해 클라이언트가 WebSocket 서버로부터 이러한 거래 페어의 실시간 업데이트를 받을 수 있게 됩니다.

이제 데이터를 가능한 한 빨리 받을 수 있게 되었으니, 남은 작업은 브라우저에 스트리밍 데이터를 표시하는 것 뿐입니다.

```js
const renderList = () => {
  return list.map((element: CryptoMessage, index: number) => {
    return (
      <li key={index}>
        {element.FSYM} - {element.P}
      </li>
    );
  });
};

return <>{readyState === ReadyState.OPEN ? renderList() : connectionStatus} </>;
```

각 요소에 대해, element.FSYM의 값 (암호화폐 심볼인지 ETH 또는 BTC인지)을 나타내는 JSX `li` 요소를 반환하고, 그 뒤에는 대시(-)와 element.P의 값(가격)을 나타냅니다. 결과는 다음과 같을 것입니다:

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

![2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_2](/assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_2.png)

우리 데이터를 그래프로 시각화하는 것이 훨씬 쉬울 것입니다. 이를 위해 react google charts를 설치해야 합니다.

```js
npm install --save react-google-charts
```

또는

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
yarn add react-google-charts
```

이후에 Chart를 가져와서 renderList 함수를 renderGraph로 변경합시다:

```js
const graphData: any[] = [["", "BTC", "ETH"]];
      let BTCPrice;
      let ETHPrice;
      for (const element of list) {
        if (element.FSYM === "BTC") {
          BTCPrice = element.P;
        } else if (element.FSYM === "ETH") {
          ETHPrice = element.P;
        }
        if (typeof BTCPrice === "undefined" || typeof ETHPrice === "undefined") {
          continue;
        } else {
          graphData.push(["", BTCPrice, ETHPrice]);
        }
      }
      return (
        <Chart
          graph_id="graph"
          chartType="LineChart"
          width="100%"
          height="400px"
          data={graphData}
          options={options}
        />
      );
  };

  return (
    <>{readyState === ReadyState.OPEN ? renderGraph() : connectionStatus} </>
  );
```

결과는 다음과 같을 것입니다:

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

<img src="/assets/img/2024-06-22-OptimizingReal-TimePerformanceWebSocketsandReactjsIntegrationPartI_3.png" />

그리고 마지막으로 작동 예제가 있습니다.

# 결론

이는 웹소켓을 사용하는 매우 단순한 방법이지만 문제를 해결해야 할 두 가지 중요한 문제가 있습니다. 첫 번째는 끝없는 리스트로 브라우저를 휩쓸 것이라는 점이고, 두 번째는 배열을 "n"개의 요소로 나누어도 대규모 다시 렌더링 문제가 발생하여 응용 프로그램이 반응 없거나 느려질 수 있습니다. 애플리케이션을 빠르고 부드럽게 실행하기 위한 몇 가지 기술이 있지만 이 글을 너무 길게 만들고 싶지 않아 두 부분으로 나누기로 결정했습니다.
