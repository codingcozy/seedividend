---
title: "Nodejs에서 첫 번째 REST API를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-19-HowtomakeyourfirstRESTAPIinNodejs_0.png"
date: 2024-06-19 23:14
ogImage: 
  url: /assets/img/2024-06-19-HowtomakeyourfirstRESTAPIinNodejs_0.png
tag: Tech
originalTitle: "How to make your first REST API in Node.js"
link: "https://medium.com/@holasoymalva/how-to-make-your-first-rest-api-in-node-js-82c05fca9106"
isUpdated: true
---




## 5분 이내로

![이미지](/assets/img/2024-06-19-HowtomakeyourfirstRESTAPIinNodejs_0.png)

Node.js에서 REST API (Representational State Transfer Application Programming Interface)를 만드는 것은 현대 웹 개발자에게 필수적인 기술입니다. 이 유형의 API는 웹 애플리케이션과 같은 다양한 클라이언트가 상태를 유지하지 않는 일련의 작업을 사용하여 서버와 상호 작용할 수 있게 합니다. 이 튜토리얼에서는 Node.js에서 간단한 REST API를 설정하는 기본 사항을 살펴보며, 데이터 유형, 클래스 및 다양한 HTTP 메서드를 사용한 코드 예제를 다룰 것입니다.

# 필수 사항

<div class="content-ad"></div>

시작하기 전에 시스템에 Node.js가 설치되어 있는지 확인해주세요. Node.js는 nodejs.org에서 다운로드할 수 있습니다. 또한 JavaScript, Node.js, 그리고 인기 있는 Node.js 프레임워크 Express에 대한 기본적인 이해가 필요합니다.

# 단계 1: 프로젝트 설정하기

먼저, 프로젝트를 위한 새 디렉토리를 만들고 그 안에서 새 Node.js 프로젝트를 초기화하세요.

```js
mkdir my-rest-api
cd my-rest-api
npm init -y
```

<div class="content-ad"></div>

위 작업은 당신의 프로젝트 종속성을 관리할 package.json 파일을 디렉토리에 생성합니다.

# 단계 2: Express 설치하기

HTTP 요청을 쉽게 처리하려면 Express를 설치하세요.

```js
npm install express
```

<div class="content-ad"></div>

# 단계 3: 첫 번째 엔드포인트 생성하기

이제 프로젝트 디렉토리에 index.js 파일을 생성하세요. 이것이 진입점이 될 것입니다.

```js
const express = require('express');
const app = express();

app.listen(3000, () => {
 console.log("포트 3000에서 실행 중인 서버");
});
```

이 코드는 포트 3000에서 수신 대기하는 기본 Express 서버를 설정합니다.

<div class="content-ad"></div>

# 단계 4: HTTP 메소드 처리

REST API는 다양한 HTTP 메소드와 함께 작동합니다. 가장 일반적인 메소드는 GET, POST, PUT 및 DELETE입니다.

# GET 요청

간단한 메시지를 반환하는 GET 엔드포인트를 만들어 봅시다.

<div class="content-ad"></div>

```js
app.get("/msg", (req, res, next) => {
  res.json({"message": "안녕, 세계!"});
});
```

# POST 요청

POST 요청을 할 때는 종종 데이터를 받게 됩니다. 예시를 보겠습니다.

```js
app.use(express.json()); // for parsing application/json

app.post("/msg", (req, res, next) => {
  const message = req.body.message;
  res.json({"receivedMessage": message});
});
```

<div class="content-ad"></div>

# 단계 5: 클래스와 데이터 유형 사용하기

더 나은 코드 구성을 위해 클래스를 사용하여 코드를 구성할 수 있습니다. Message 클래스를 만들어 봅시다.

```js
class Message {
  constructor(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}
```

이제 이 클래스를 사용하여 POST 엔드포인트를 리팩토링할 수 있습니다.

<div class="content-ad"></div>

```js
app.post("/msg", (req, res, next) => {
  const newMessage = new Message(req.body.message);
  res.json({"receivedMessage": newMessage.getContent()}); 
});
```

# 단계 6: API 테스트하기

API를 테스트하려면 Postman이나 cURL과 같은 도구를 사용할 수 있습니다. GET 요청의 경우 브라우저에서 http://localhost:3000/msg 로 간단히 방문할 수 있습니다.

# 결론

<div class="content-ad"></div>

Node.js에서 REST API를 만드는 것은 연습을 통해 더 직관적인 과정이 되는 간단한 일입니다. Express의 사용은 다양한 HTTP 메소드를 간단하게 처리하게 해주며, 클래스와 적절한 데이터 유형을 사용하여 코드를 조직화하면 유지 관리 및 가독성을 크게 향상시킬 수 있습니다.

기억하세요, 이것은 시작점에 불과합니다. 더 편안해지면 API를 더 복잡한 라우트로 확장하거나 데이터베이스에 연결하거나 인증을 구현하는 등 다양한 기능을 추가할 수 있습니다. 계속해서 탐험하고 실험하여 더 견고하고 효율적인 API를 만들어 보세요!