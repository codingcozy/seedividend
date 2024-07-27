---
title: "웹 워커 관련 프론트엔드 면접 질문"
description: ""
coverImage: "/assets/img/2024-05-02-WebWorkersInterviewQuestions_0.png"
date: 2024-05-02 00:08
ogImage: 
  url: /assets/img/2024-05-02-WebWorkersInterviewQuestions_0.png
tag: Tech
originalTitle: "Web Workers | Interview Questions"
link: "https://medium.com/gitconnected/web-workers-interview-questions-7cbc1baf0bd9"
---


주제 안내:

# 웹 워커:

웹 워커는 브라우저 기능의 일부입니다. 현재 페이지의 백그라운드에서 생성될 수 있는 실제 OS 스레드로, 복잡하고 자원 집약적인 작업을 수행할 수 있습니다.

서버에서 대량의 데이터를 가져와야 하거나 UI에 복잡한 렌더링이 필요한 경우를 상상해보세요. 이를 직접 웹페이지에서 처리한다면 페이지가 더 부드럽지 않을 수 있고 UI에 영향을 줄 수 있습니다.

<div class="content-ad"></div>

위 웹 워커를 사용하여 이 문제를 완화할 수 있어요. 웹 워커는 웹 워커라 불리는 쓰레드를 만들고, 그 웹 워커가 복잡한 작업을 처리하도록 할 수 있어요.

웹 워커와 간단하게 소통할 수 있으며, 이를 통해 워커와 UI 간에 데이터를 주고받을 수 있어요.

아래는 웹 워커의 주요 기능 몇 가지에요:

- 웹 워커는 쓰레드 기반의 JavaScript입니다.
- 웹 워커는 더 많은 공간과 CPU 시간을 요구해요.
- 웹 워커는 웹사이트의 속도를 향상시켜 줘요.
- 웹 워커는 클라이언트 측에서 코드를 실행해요 (서버 측이 아니에요).
- 웹 워커 쓰레드는 postMessage() 콜백 메서드를 사용하여 서로 소통해요.

<div class="content-ad"></div>

웹 워커의 일반적인 예시는 다음과 같습니다:

- 주식 가격, 실시간 활성 사용자 등의 실시간 데이터를 표시하는 대시보드 페이지
- 서버에서 큰 파일을 가져오는 작업
- 자동 저장 기능

## 웹 워커 생성 구문

```js
웹 워커 생성을 위해 사용됩니다
worker = new Worker("webWorker.js");
```

<div class="content-ad"></div>

## 웹 워커 종료하는 구문

```js
// 웹 워커를 종료하는 데 사용됩니다.
worker.terminate();
```

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웹 워커 예제</title>
</head>
<body>
  <h1>웹 워커 예제</h1>
  <button onclick="startWorker()">워커 시작</button>
  <p id="result"></p>

  <script>
    function startWorker() {
      const worker = new Worker('worker.js');
      
      worker.onmessage = function(event) {
        document.getElementById('result').textContent = event.data;
      };
    }
  </script>
</body>
</html>
```

```js
function doHeavyTask() {
  // 무거운 CPU 작업을 시뮬레이션합니다.
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result;
}

// 메인 스레드로부터 메시지를 수신합니다.
onmessage = function(event) {
  const heavyResult = doHeavyTask();
  postMessage(heavyResult); // 결과를 메인 스레드로 다시 보냅니다.
};
```

<div class="content-ad"></div>

## React 예제, WebWorker Websocket 예제

```js
const Homepage = () => {
  const [worker, setWorker] = useState(null);
  const [res, setRes] = useState([]);
  const [log, setLog] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  const hanldeStartConnection = () => {
    // 워커에 메시지 보내기 [postMessage]
    worker.postMessage({
      connectionStatus: "init",
    });
  };

  const handleStopConnection = () => {
    worker.postMessage({
      connectionStatus: "stop",
    });
  };
 
 //UseEffect1
  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/main.worker.js", import.meta.url)
    ); //NEW SYNTAX
    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

 //UseEffect2
  useEffect(() => {
    if (worker) {
      worker.onmessage = function (e) {
        if (typeof e.data === "string") {
          if(e.data.includes("[")){
            setLog((preLogs) => [...preLogs, e.data]);
          } else {
            setRes((prevRes) => [...prevRes, { stockPrice: e.data }]);
          }
        }

        if (typeof e.data === "object") {
          setButtonState(e.data.disableStartButton);
        }
      };
    }
  }, [worker]);

  return (
    <>
      <div className="stats">
        <div className="control-panel">
          <h3>WebWorker Websocket 예제</h3>
          <button
            id="start-connection"
            onClick={hanldeStartConnection}
            disabled={!worker || buttonState}
          >
            연결 시작
          </button>
          &nbsp;
          <button
            id="stop-connection"
            onClick={handleStopConnection}
            disabled={!buttonState}
          >
            연결 중지
          </button>
        </div>
        <LineChartComponent data={res} />
      </div>
      <Logger logs={log}/>
    </>
  );
};
```

# 웹 워커의 종류

웹 워커는 웹 페이지의 메인 스레드와 별도로 백그라운드에서 스크립트를 실행하는 방법을 제공합니다. 사용자 인터페이스를 방해하지 않고 작업을 수행할 수 있도록 합니다. 여기에는 두 가지 주요 웹 워커의 종류가 있습니다:

<div class="content-ad"></div>

## 1. 전용 워커:

- 전용 워커는 생성한 스크립트에 의해서만 접근할 수 있습니다.
- 메인 스레드와 격리된 자체 스레드에서 실행됩니다.
- 웹 페이지의 반응성에 영향을 미치지 않으면서 무거운 계산이나 시간이 오래 걸리는 작업을 처리해야 하는 상황에 유용합니다.
- 전용 워커는 일반적으로 단일 스크립트 내에서 사용됩니다.

## 2. 공유 워커:

- 공유 워커는 동일한 도메인에 속하는 여러 창, 아이프레임 또는 다른 컨텍스트에서 실행 중인 여러 스크립트에서 접근할 수 있습니다.
- 데이터를 공유하거나 응용 프로그램의 다른 부분 간의 작업을 조정해야 하는 상황에 공유 워커가 설계되었습니다.
- 서로 다른 탭이나 프레임 간의 통신과 협업을 제공합니다.
- 공유 워커는 더 다양하며 여러 스크립트가 동시에 활용할 수 있습니다.

<div class="content-ad"></div>

# 인터뷰 질문:

## 웹 워커(Web Worker)란 무엇인가요?

- 웹 워커(Web Worker)는 웹 애플리케이션의 주 실행 스레드와 별도의 백그라운드 스레드에서 스크립트를 실행할 수 있는 JavaScript 기능입니다.

## 웹 워커(Web Worker)가 해결하는 문제는 무엇인가요?

<div class="content-ad"></div>

- 웹 워커는 웹 애플리케이션의 응답성을 향상시키기 위해 주 스레드에서 작업을 오프로드하는 데 도움이 됩니다. 그들은 UI를 차단하지 않고 동시에 실행을 가능하게 합니다.

## 웹 워커를 어떻게 생성하나요?

- 웹 워커는 주 자바스크립트 코드에서 Worker 개체를 인스턴스화하고 워커 스크립트의 URL을 인수로 제공하여 생성합니다.

## 웹 워커와 주 스레드 간의 통신 메커니즘은 무엇인가요?

<div class="content-ad"></div>

- 웹 워커는 postMessage() 메서드를 사용하여 주 스레드와 통신하고 onmessage 이벤트 핸들러를 통해 메시지를 수신합니다.

### 웹 워커와 주 스레드 간에 전송할 수 있는 데이터 유형은 무엇인가요?

- 전송할 수 있는 데이터 유형에는 JSON 객체, ArrayBuffer, ArrayBufferView, 파일/블롭 객체 및 기타 구조화된 복제 가능한 객체가 포함됩니다.

### 웹 워커의 제한사항은 무엇인가요?

<div class="content-ad"></div>

- 웹 워커는 DOM, window, document와 같은 특정 API에 직접 액세스할 수 없으며 동기 XHR 요청을 수행할 수 없습니다. 또한, 동일 출처 정책으로 인해 다른 출처의 리소스에 액세스하는 데 제한이 있습니다.

**웹 워커를 종료하는 방법은 무엇인가요?**

- 메인 스레드에서 Worker 객체의 terminate() 메서드를 호출하여 웹 워커를 종료할 수 있습니다.

**웹 워커에는 어떤 종류가 있나요?**

<div class="content-ad"></div>

- 웹 워커에는 Dedicated Workers와 Shared Workers 두 가지 유형이 있어요. Dedicated Workers는 하나의 스크립트에 특화되어 있지만, Shared Workers는 여러 스크립트에서 공유할 수 있어요.

## 웹 워커의 일반적인 사용 사례는 무엇인가요?

- 웹 워커는 이미지 처리, 오디오/비디오 처리, 데이터 구문 분석 및 암호화/해독과 같은 CPU 집약적 작업에 주로 사용돼요. 또한 서버에서 데이터를 가져오거나 WebSocket을 통해 수신한 데이터를 처리하는 백그라운드 작업에도 사용할 수 있어요.

## 웹 워커에서 오류를 처리하는 방법은 무엇인가요?

<div class="content-ad"></div>

- 웹 워커 내에서 발생하는 오류는 onerror 이벤트 핸들러를 사용하여 캡처할 수 있습니다. 또한 postMessage()를 사용하여 메시지를 메인 스레드로 보내고 메인 스레드에서 처리할 수 있습니다.

## 참고 문서:

- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
- https://www.freecodecamp.org/news/how-webworkers-work-in-javascript-with-example/