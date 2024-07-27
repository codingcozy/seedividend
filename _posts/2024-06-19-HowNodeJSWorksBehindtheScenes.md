---
title: "NodeJS 작동 방식 뒷담화부터 전달합니다"
description: ""
coverImage: "/assets/img/2024-06-19-HowNodeJSWorksBehindtheScenes_0.png"
date: 2024-06-19 23:05
ogImage: 
  url: /assets/img/2024-06-19-HowNodeJSWorksBehindtheScenes_0.png
tag: Tech
originalTitle: "How Node.JS Works: Behind the Scenes"
link: "https://medium.com/@zeugurlu/how-node-js-works-behind-the-scenes-61b915cc7e72"
---



![How Node.js Works Behind the Scenes](/assets/img/2024-06-19-HowNodeJSWorksBehindtheScenes_0.png)

Node.js는 Google의 오픈 소스 V8 JavaScript 엔진을 기반으로 한 JavaScript 런타임입니다. 또한 웹 서버로 사용하기에 이상적이며, 서버 측 웹 개발에 JavaScript를 사용할 수 있는 장점을 제공합니다. Node.js는 V8 JavaScript 엔진과 런타임 환경 내의 Libuv와 같은 몇 가지 핵심 라이브러리에 의존합니다.

- V8 엔진은 JavaScript 코드를 컴퓨터가 실제로 이해할 수 있는 기계 코드로 변환합니다.
- Libuv는 비동기 I/O에 강점을 가진 오픈 소스 라이브러리입니다. 이 레이어를 통해 Node는 기본 컴퓨터 운영 체제, 파일 시스템, 네트워킹 등에 대한 액세스 권한을 얻습니다. 또한 libuv는 Node.js의 두 가지 매우 중요한 기능인 이벤트 루프와 스레드 풀도 구현합니다.

# 스레드 풀


<div class="content-ad"></div>

컴퓨터에서 Node를 사용할 때는 해당 컴퓓에서 실행 중인 프로그램을 나타내는 Node 프로세스가 있음을 의미합니다. 이 프로세스 내에서 Node.js는 단일 스레드에서 작동합니다. 이는 Node 애플리케이션을 실행할 때 해당 애플리케이션이 단일 스레드에서 실행된다는 것을 의미합니다. 

- 프로그램이 초기화될 때 모든 최상위 코드가 실행되는데, 이는 어떠한 콜백 함수 내부에 있지 않은 모든 코드를 의미합니다.
- 추가로, 애플리케이션에 필요한 모든 모듈이 로드되고, 모든 콜백이 등록됩니다.
- 그 다음, 이벤트 루프가 마침내 실행을 시작합니다.

파일 시스템 API, 암호화, 압축 및 DNS 조회와 같은 일부 작업은 이벤트 루프 내에서 실행하기에는 너무 많은 리소스가 필요하거나 비용이 많이 드는 작업이므로 단일 스레드를 차단할 수 있습니다. 이것이 스레드 풀이 필요한 이유입니다. 이 스레드 풀은 이벤트 루프와 마찬가지로 Node.JS에 Libuv 라이브러리로 제공됩니다.

- 스레드 풀은 메인 단일 스레드와 완전히 분리된 4개의 추가 스레드를 제공합니다.
- Node.js를 최대 128개의 스레드까지 사용하도록 구성할 수 있지만, 대개 4개의 스레드만으로 대부분의 애플리케이션에 충분합니다. 그렇다면 기본 스레드 풀 크기 4를 다른 숫자로 변경하는 방법은 무엇일까요?

<div class="content-ad"></div>

```js
process.env.UV_THREADPOOL_SIZE = 1;
```

- 그런 다음 이벤트 루프는 무거운 작업을 스레드 풀로 자동으로 오프로드할 수 있습니다. 이 모든 것은 자동으로 백그라운드에서 발생합니다.
- 개발자는 스레드 풀에 할당할 항목을 결정할 권한이 없습니다.

# 이벤트 루프

Node.js에서는 애플리케이션 내에서 중요한 사건이 발생할 때마다 명명된 이벤트를 방출하는 이벤트 발생자라는 특정 개체가 있습니다. 이 사건에는 서버에 요청이 도착하거나 타이머가 만료되거나 파일이 읽기 작업을 완료하는 등의 중요한 일이 포함될 수 있습니다. 이러한 이벤트는 개발자가 설정한 이벤트 리스너에 의해 수집되며, 각 리스너에 첨부된 콜백 함수가 실행됩니다.


<div class="content-ad"></div>

```js
const server = http.createServer(); server.on('request',(req,res) => { res.end('Request received'); });
```

- 서버를 생성하려면 createServer() 메서드를 사용하고 서버 변수에 저장합니다.
- server.on 메서드는 "request" 이벤트를 위해 리스너를 생성하는 데 사용됩니다.
- 서버는 이벤트를 발생시키는 발신자 역할을 하며 요청이 서버에 도달할 때마다 "request" 이벤트를 자동으로 발생시킵니다.
- 이 리스너에 연결된 콜백 함수는 자동으로 호출됩니다.
- 함수는 그런 다음 데이터를 클라이언트에 다시 보냅니다.

JavaScript 프로그래밍에서 이벤트 발생자 논리는 관찰자 패턴이라고 합니다. 결론적으로 이벤트 루프는 콜백 실행 및 네트워킹 I/O와 같은 간단한 작업을 처리하는 것을 담당하며, 스레드 풀은 파일 액세스나 압축과 같은 더 많은 작업을 처리합니다.