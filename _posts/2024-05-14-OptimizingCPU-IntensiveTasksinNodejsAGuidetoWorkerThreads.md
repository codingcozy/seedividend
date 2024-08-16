---
title: "Nodejs에서 CPU 집약적 작업 최적화하기 워커 스레드 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-OptimizingCPU-IntensiveTasksinNodejsAGuidetoWorkerThreads_0.png"
date: 2024-05-14 14:40
ogImage: 
  url: /assets/img/2024-05-14-OptimizingCPU-IntensiveTasksinNodejsAGuidetoWorkerThreads_0.png
tag: Tech
originalTitle: "Optimizing CPU-Intensive Tasks in Node.js: A Guide to Worker Threads"
link: "https://medium.com/@danish512/optimizing-cpu-intensive-tasks-in-node-js-a-guide-to-worker-threads-8fd55374f84a"
isUpdated: true
---




<img src="/assets/img/2024-05-14-OptimizingCPU-IntensiveTasksinNodejsAGuidetoWorkerThreads_0.png" />

# 소개

Node.js는 주로 단일 스레드 이벤트 루프 모델에서 작동합니다. 이는 즉, 코드가 한 번에 한 가지 작업만 수행할 수 있다는 뜻입니다. 그러나 Node.js는 또한 libuv와 같은 라이브러리를 통해 디스크에서 파일을 읽는 것과 같은 I/O 작업을 백그라운드 스레드에 지원하는 메커니즘도 제공합니다. 이러한 백그라운드 스레드는 파일 I/O, 네트워크 요청 및 DNS 조회와 같은 작업을 처리하여 주 스레드가 다른 이벤트를 계속 처리할 수 있도록 합니다.

이제, 복잡한 수학 문제를 해결하거나 대형 이미지 또는 비디오 압축을 처리하는 등 매우 어려운 작업이 있다고 상상해보십시오. Node.js가 이러한 유형의 작업을 처리할 때, 완전히 점령되어 다른 작업을 완료할 때까지 아무 것도 할 수 없습니다. 이는 다른 작업이 대기 중인 경우, 그 일이 완료될 때까지 기다려야 한다는 것을 의미합니다.



컴퓨터에 여러 개의 프로세서(코어)가 있더라도 Node.js는 이러한 어려운 작업을 자동으로 분산시키지 않습니다. 모든 것을 처리하기 위해 하나의 프로세서, 하나의 코어만 사용하며, 다른 것들도 사용 가능한 상황에서도 이를 계속 사용합니다. 따라서 현대 컴퓨터는 여러 코어로 더 많은 처리량을 갖고 있지만, Node.js는 이러한 어려운 작업에 대해 그것들을 완전히 활용하지 못합니다. 이는 응용 프로그램이 많은 작업을 처리해야 할 경우 속도를 늦출 수 있습니다.

이를 극복하기 위해 Node.js는 "worker-threads"라는 모듈을 도입했습니다. 이를 사용하면 서로 다른 작업을 동시에 처리할 수 있는 별도의 스레드를 생성할 수 있습니다. 한 스레드가 작업을 마치면 결과를 메인 스레드로 다시 보내어 기다리지 않고 계속 작업할 수 있습니다. 따라서 워커 스레드를 사용하면 CPU 집약적인 작업이 메인 스레드를 더 이상 막지 않고 큰 작업을 여러 스레드로 나누어 속도를 높일 수 있습니다.

Node.js 앱과 CPU 집약적 작업이 메인 스레드를 차단하는 노드를 통해 워커 스레드를 탐색해 보겠습니다. CPU 집약적 작업을 다른 스레드로 오프로드하여 메인 스레드를 차단하지 않고 작업을 진행할 수 있도록 워커 스레드 모듈을 사용할 것입니다. 마지막으로 CPU-바운드 작업을 나누어 네 개의 스레드가 병렬로 작업할 수 있도록 하여 작업을 가속화할 것입니다.

# 프로젝트 및 종속성 설정하기



시작하기 전에 프로젝트 디렉터리를 만들어 주세요:

```js
mkdir multi-threading
cd multi-threading
```

이후, npm init 명령어를 사용하여 npm을 통해 프로젝트 디렉터리를 초기화해주세요:

```js
npm init -y
```



다음으로, 다음 종속성을 설치하세요:

```js
npm install express
```

Express를 사용하여 블로킹 및 논블로킹 엔드포인트를 갖는 서버 애플리케이션을 만들 것입니다. 워커 스레드 모듈은 Node.js와 함께 제공되므로 별도로 설치할 필요가 없습니다.

# 프로세스와 스레드 이해하기



CPU 바운드 작업을 시작하기 전에, 컴퓨터에서 하나 이상의 코어를 가지고 있는 프로세스와 스레드가 어떤 것인지 이해하는 것이 중요합니다.

## 프로세스

프로세스란 운영 체제에서 실행 중인 프로그램입니다. 각각의 프로세스는 자체 메모리를 가지고 있으며, 다른 실행 중인 프로그램의 메모리에 접근할 수 없습니다. 무한 루프가 포함된 Node 프로그램을 만들어보겠습니다. 이 프로그램은 실행 중지되지 않고 계속 실행될 것입니다.

process.js 라는 이름의 파일을 생성하고 아래 코드를 입력해주세요:



```js
const process_name = process.argv.slice(2)[0];
let count = 0;
while (true) {
  count++;
  if (count === 200 || count === 400) {
    console.log(`${process_name}: ${count}`);
  }
}
```

이 프로그램을 node 명령어를 사용하여 실행해봅시다:

```js
node process.js A &
```

A는 프로그램으로 전달된 명령행 인수로, process_name 변수에 저장됩니다. &는 노드 프로그램이 백그라운드에서 실행되도록 하며, 이것을 통해 셸에서 더 많은 명령을 입력할 수 있습니다.



```js
결과
[1] 15228
A: 200
A: 400
```

숫자 7754는 운영 체제가 할당한 프로세스 ID입니다. A: 200 및 A: 400은 프로그램의 출력입니다.

node 명령을 사용하여 프로그램을 실행하면(가정으로 Node.js를 참조하는 경우), 프로세스가 생성됩니다. 운영 체제는 프로그램을위한 메모리를 할당하고, 컴퓨터의 디스크에서 프로그램 실행 파일을 찾아 메모리로 로드하는 작업과 같은 작업을 처리합니다. 그런 다음 프로그램에 프로세스 ID(PID)를 할당하고 실행을 시작합니다. 이 단계에서 프로그램은 프로세스가됩니다.

Node 프로세스에 대한 간단한 요약을 얻으려면:



```js
ps | grep node
```

```js
출력
15228 pts/1    00:00:15 node
```

하나의 프로그램에서 여러 프로세스를 생성할 수 있어요. 예를 들어, 다음 명령어를 사용해서 서로 다른 인수를 가진 세 개의 프로세스를 생성하고 백그라운드로 실행할 수 있어요:

```js
node process.js B & node process.js C & node process.js D &
```



위의 명령을 실행한 후 출력 결과가 다음과 비슷할 수 있지만 순서가 다를 수 있습니다:

```js
출력:
[1] 15925
[2] 15926
[3] 15927
B: 200
C: 200
B: 400
D: 400
C: 400
D: 400
```

출력을 주의 깊게 살펴보면 실행 순서가 고정되어 있지 않다는 것을 알 수 있습니다. B, C 및 D의 순서로 시작했지만 다른 순서로 완료될 수 있습니다. 이러한 동작의 이유는 OS가 각 프로세스를 실행할 시기를 결정하는 스케줄링 알고리즘을 가지고 있기 때문입니다.

단일 코어 기계에서는 프로세스가 동시에 실행됩니다. 이는 OS가 일정 시간 동안 프로세스를 전환하는 것을 의미합니다. 예를 들어, 프로세스 D가 한정된 시간 동안 실행된 다음에는 상태가 어딘가에 저장되고 OS가 프로세스 B를 실행할 수 있도록 일정 시간을 예약하고, 이와 같은 방식으로 계속 진행됩니다. 이것은 모든 작업이 완료될 때까지 계속됩니다. 출력에서는 각 프로세스가 완료된 것처럼 보일 수 있지만 실제로는 OS 스케줄러가 계속해서 프로세스 간을 전환하고 있는 것입니다.



멀티 코어(4코어) 운영 체제에서는 각 프로세스를 동시에 각 코어에서 실행하도록 OS가 스케줄링합니다. 이를 병렬 처리라고 합니다. 그러나 4개의 코어에 4개의 프로세스를 생성하면(총 8개의 프로세스), 각 코어는 두 개의 프로세스를 동시에 실행하여 완료될 때까지 처리합니다.

# 스레드

Node.js의 스레드는 프로세스와 유사하지만 단일 프로세스의 메모리 내에서 작동합니다. 프로세스는 자체 메모리 공간을 갖지만 각 스레드는 부모 프로세스의 메모리를 공유합니다. Node.js에서 프로세스를 생성하면 worker_threads 모듈을 사용하여 JavaScript 작업을 동시에 실행하기 위해 여러 스레드를 생성할 수 있습니다. 스레드는 메시지 전달이나 프로세스 메모리 내에서 데이터를 공유함으로써 서로 통신합니다. 프로세스와는 달리 스레드를 생성할 때 운영 체제에서 추가 메모리가 필요하지 않아 가벼우면서 작업을 병렬로 실행하기에 효율적입니다.

스레드 실행 시, 프로세스와 유사하게 동작합니다. 단일 코어 시스템에 여러 스레드가 있는 경우 운영 체제는 정기적으로 스레드 간 전환을 수행하여 각 스레드가 단일 CPU에서 직접 실행되는 차례를 부여합니다. 다중 코어 시스템의 경우 OS는 모든 코어에 걸쳐 스레드를 스케줄링하여 JavaScript 코드를 동시에 실행할 수 있도록 합니다. 사용 가능한 코어보다 더 많은 스레드가 생성된 경우, 각 코어는 여러 스레드를 동시에 처리하여 리소스 사용을 최적화합니다.



# Node.js에서 숨겨진 스레드들

Node.js는 입출력 (I/O) 작업을 보다 효율적으로 처리하기 위해 추가 스레드를 활용하기 때문에 종종 "다중 스레드"라고 불립니다. 작동 방식은 다음과 같습니다:

도입에서 설명한 바와 같이 JavaScript 자체는 단일 스레드형이기 때문에 한 번에 한 가지 작업만 처리합니다. 프로그램이 파일을 읽거나 네트워크 요청을 만들어야 할 때, 이러한 작업이 완료될 때까지 기다리며 주 스레드를 차단할 수 있습니다.

그러나 Node.js는 libuv 라이브러리를 구현하여 4개의 추가 스레드를 Node.js 프로세스에 제공합니다. 이러한 스레드를 이용하여 I/O 작업을 별도로 처리하며, 작업이 완료되면 이벤트 루프가 해당 I/O 작업과 관련된 콜백을 마이크로태스크 대기열에 추가합니다. 주 스레드의 호출 스택이 비워지면 콜백이 호출 스택에 푸시되고 실행됩니다. 명확히 하기 위해 주어진 I/O 작업과 관련된 콜백은 병렬로 실행되지 않지만, 파일을 읽거나 네트워크 요청 등의 작업은 추가 스레드의 도움으로 병렬로 처리됩니다. I/O 작업이 완료되면 해당 콜백이 주 스레드에서 실행됩니다.



위의 네 개 스레드에 추가로 V8 엔진은 자동 가비지 수집과 같은 작업을 처리하기 위해 두 개의 스레드도 제공합니다.

이 말은 모든 노드 프로세스가 총 일곱 개의 스레드를 가지고 있다는 것을 의미합니다. 우리의 process.js 파일을 다시 실행하여 백그라운드에서 실행되도록 확인해보겠습니다:

```js
node process.js A &
```

이제 스레드를 확인하기 위해 top 명령어를 사용하고 그에게 프로세스 ID를 전달해보겠습니다.



```js
top -H -p 19821
```

위 명령을 실행하면 출력물은 다음과 유사합니다:

![image](/assets/img/2024-05-14-OptimizingCPU-IntensiveTasksinNodejsAGuidetoWorkerThreads_1.png)

출력물에서 알 수 있듯이, Node.js 프로세스에는 총 일곱 개의 스레드가 있습니다: JavaScript를 실행하는 주 스레드 하나, Node.js 스레드 네 개, 그리고 V8 스레드 둘입니다.



이제 Node.js 프로세스의 스레드에 대해 알았으니, 다음 섹션에서 CPU 바운드 작업을 수행하고 주요 스레드를 관찰해 보겠습니다.

# 워커 스레드를 사용하지 않고 CPU 바운드 작업 생성하기

Express 서버를 생성하여 두 가지 경로를 가지는 서버를 만들어봅시다: blocking과 non-blocking(컴퓨터 집약적 작업 실행).

```js
const express = require("express");

const app = express();
const port = 8000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("비차단 페이지");
});

app.get("/blocking", async (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20000000000; i++) {
    counter++;
  }
  res.status(200).send(`결과는 ${counter} 입니다`);
});

app.listen(port, () => {
  console.log(`포트 ${port}에서 서버 실행 중`);
});
```



위의 코드 블록에서 Express.js를 사용하여 HTTP 서버를 만들었습니다. CPU 집약적인 작업을 실행하는 /non-blocking route와 /blocking route를 만들었습니다. 200 억 번을 반복하는 for 루프를 만들어 각 반복마다 카운터 변수를 1씩 증가시킵니다.

아래 명령어를 실행하여 서버를 시작해 봅시다:

```js
node index.js

출력:
Server running on port: 8000
```

이제 http://localhost:8000/non-blocking을 방문하면 즉시 응답을 받을 수 있습니다. 그 다음으로 새 탭에서 http://localhost:8000/blocking을 열고 다시 http://localhost:8000/non-blocking을 열면 즉시 응답을 받지 못하고 페이지가 계속로드를 시도하는 것을 볼 수 있습니다. /non-blocking route는 단지 /blocking route가 응답 결과를 반환할 때만 결과를 반환합니다. 결과는 20000000000입니다.



이유는 CPU 바운드 루프로 인해 메인 스레드가 차단되기 때문입니다. 메인 스레드가 차단되면 Node.js는 CPU 바운드 작업이 완료될 때까지 어떤 요청도 처리할 수 없습니다. 따라서 /non-blocking route로 동시에 수천 개의 GET 요청이 있는 경우, /blocking route로의 단일 방문은 앱이 반응하지 않게 만들 수 있습니다.

이제 CPU 집약적 작업이 애플리케이션에 미치는 영향을 이해했으니, 이제 약속(promises)을 사용하여 메인 스레드를 차단하지 않도록 노력해보겠습니다.

# 약속(promises) 사용하여 CPU 바운드 작업 오프로드하기

개발자들이 CPU 바운드 작업으로 인한 차단 효과를 알게 되면 약속(promises)을 사용하여 코드를 차단되지 않게 만들어보려 합니다. 이들은 readFile() 및 writeFile()과 같은 차단되지 않는 약속 기반 I/O 메서드 사용에 대한 지식에서 비롯됩니다. 그러나 알고 계시다시피, I/O 작업은 Node.js의 숨겨진 스레드를 사용하지만, CPU 바운드 작업은 아닙니다. 그럼에도 불구하고 이 섹션에서는 CPU 바운드 작업을 약속으로 감싸 차단되지 않도록 시도할 것입니다. 이 방법은 작동하지 않지만, 다음 섹션에서 할 일인 워커 스레드 사용의 가치를 알 수 있습니다.



우리의 index.js 파일을 프로미스를 위해 수정해 봅시다:

```js
const express = require("express");

const app = express();
const port = 8000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("non-blocking 페이지");
});

function calculateCount() {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
      counter++;
    }
    resolve(counter);
  });
}


app.get("/blocking", async (req, res) => {
  const counter = await calculateCount();
  res.status(200).send(`결과: ${counter}`);
});

app.listen(port, () => {
  console.log(`서버가 포트에서 실행 중: ${port}`);
});
```

웹 브라우저에서 http://localhost:8000/blocking을 방문하고 로드될 때, 빠르게 http://localhost:8000/non-blocking 탭을 새로 고쳐보세요. 알 수 있듯이, non-blocking 라우트도 영향을 받아 /blocking 라우트가 로딩을 완료할 때까지 모두 기다립니다. 라우트가 여전히 영향을 받기 때문에, 프로미스는 자바스크립트 코드를 병렬로 실행시키지 않고 CPU 바운드 작업을 비차단형으로 만드는 데 사용할 수 없습니다.

# CPU 바운드 작업 완화를 위해 worker-threads 사용하기



이제 메인 스레드를 차단하지 않기 위해 worker-thread 모듈을 사용할 것입니다.

worker.js 파일을 만들고 다음 코드를 추가해봅시다:

```js
const { parentPort } = require("worker_threads");

let counter = 0;
for (let i = 0; i < 20000000000; i++) {
  counter++;
}

parentPort.postMessage(counter);
```

그 다음에 index.js를 수정해주세요:



```js
const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = 8000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("non-blocking 페이지");
});

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).send(`결과는 ${data} 입니다`);
  });
  worker.on("error", (msg) => {
    res.status(404).send(`오류 발생: ${msg}`);
  });
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
```

파일을 저장한 후 서버를 실행하세요:

```js
node index.js
```

웹 브라우저에서 http://localhost:8000/blocking 탭을 다시 방문해보세요. 이 페이지가 로딩을 완료하기 전에 http://localhost:8000/non-blocking 탭을 모두 새로고침 해보세요. 이제 /blocking 루트가 로딩을 마치기를 기다리지 않고 바로 로딩되는 것을 알 수 있을 겁니다. 이는 CPU 바운드 작업이 다른 스레드로 오프로드되어 메인 스레드가 모든 요청을 처리하기 때문입니다.




요런식으로 워커 스레드를 사용하여 CPU 집약 작업을 블로킹되지 않게 만들 수 있어요.

- 기사 영감: Stanley Ulili and Rachel Lee
- Danish Shaikh | LinkedIn
- Danish Shaikh | Github