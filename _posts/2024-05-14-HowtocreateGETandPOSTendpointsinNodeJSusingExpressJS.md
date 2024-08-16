---
title: "NodeJS에서 ExpressJS를 사용하여 GET 및 POST 엔드포인트를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtocreateGETandPOSTendpointsinNodeJSusingExpressJS_0.png"
date: 2024-05-14 15:00
ogImage: 
  url: /assets/img/2024-05-14-HowtocreateGETandPOSTendpointsinNodeJSusingExpressJS_0.png
tag: Tech
originalTitle: "How to create GET and POST endpoints in NodeJS using ExpressJS?"
link: "https://medium.com/@anshmunjal/how-to-create-get-and-post-endpoints-in-nodejs-using-expressjs-77fd3953ec38"
isUpdated: true
---




<img src="/assets/img/2024-05-14-HowtocreateGETandPOSTendpointsinNodeJSusingExpressJS_0.png" />

GET 및 POST 엔드포인트는 REST API에서 가장 일반적인 엔드포인트 중 두 가지입니다. GET 엔드포인트를 사용하면 클라이언트가 서버에서 데이터를 검색할 수 있고, POST 엔드포인트를 사용하면 클라이언트가 서버로 데이터를 보낼 수 있습니다. 여기에서는 NodeJS와 ExpressJS를 사용하여 필수 GET 및 POST 엔드포인트를 만드는 방법을 보여드릴 거에요.

# GET 엔드포인트 생성

GET 엔드포인트를 만들려면 app.get() 메서드를 사용할 수 있어요. 이 메서드는 두 개의 매개변수를 가지는데, 첫 번째는 엔드포인트의 경로이고, 두 번째는 클라이언트가 엔드포인트에 GET 요청을 할 때마다 실행될 콜백 함수입니다.



다음은 /users-list 경로에 GET 엔드포인트를 만드는 방법의 예시입니다:

```js
const express = require('express');

const app = express();

app.get('/users-list', (req, res) => {
  // 사용자 목록 전체를 가져옵니다
  const usersList = [];

  // 사용자 목록을 클라이언트에 응답으로 전송합니다
  res.send(usersList);
});
```

다음은 위에서 만든 엔드포인트를 사용하여 GET 요청을 보내는 방법의 예시입니다:

```js
const fetch = require('fetch');

fetch('http://localhost:3000/users-list')
  .then(response => response.json())
  .then(usersList => {
    console.log(usersList.data);
    // 응답으로 수행하려는 동작을 작성합니다
  })
  .catch(error => {
    console.log(error);
    // 요청이 성공적이지 않을 때의 오류를 처리합니다
  });
```



만일 이 엔드포인트를 테스트하고 싶다면, Postman에서 다음 단계를 따르세요:

- Postman을 열고 새 요청을 생성하세요.
- HTTP 메소드를 GET으로 설정하세요.
- URL을 http://localhost:3000/users-list로 설정하세요.
- 보내기 버튼을 클릭하여 요청을 보내세요.

가끔은 GET 요청과 함께 쿼리 매개변수를 보내야 할 때가 있습니다. 여기에 간단한 코드 조각이 있습니다:

```js
const express = require('express');
const app = express();
app.get('/users-list/:id', (req, res) => {
  const id = req.params.id;
  // 데이터베이스에서 사용자 데이터 가져오기
  const user = {
    id: 1,
    name: 'John Doe',
  };
  // 클라이언트에 응답 보내기
  res.send({
    user: user,
  });
});
```



# POST 엔드포인트 생성하기

POST 엔드포인트를 만들려면 app.post() 메소드를 사용할 수 있어요. 이 함수는 app.get() 메소드와 유사하게 두 개의 매개변수를 사용해요. 하지만 여기서는 콜백 함수에서 요청 바디인 즉, 클라이언트가 요청할 때 보내는 데이터에 접근할 수 있어요. 이 엔드포인트를 사용하여 새로운 사용자를 만들 수 있어요.

다음은 /users-list 경로에 POST 엔드포인트를 만드는 예시에요:

```js
const express = require('express');

const app = express();

app.post('/users-list', (req, res) => {
  const usersList = req.body;

  // 클라이언트가 보낸 사용자 데이터를 저장해요

  // 요청이 성공적이었음을 보여주는 응답을 클라이언트에게 보내요
  res.send({
    message: '새 사용자가 목록에 추가되었어요',
  });
});
```



위에서 만든 엔드포인트를 사용하여 POST 요청을 보내는 예시입니다:

```js
const fetch = require('fetch');

const user = {
  name: "John Doe",
  email: "john.doe@example.com"
};

fetch('http://localhost:3000/users-list', {
  method: 'POST',
  body: JSON.stringify(user)
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
});
```

아래는 이 엔드포인트를 Postman에서 테스트하는 방법에 대한 단계입니다:

- Postman을 열고 새 요청을 작성합니다.
- HTTP 메서드를 POST로 설정합니다.
- URL을 http://localhost:3000/users-list로 설정합니다.
- Body 탭에서 content-type 헤더를 application/json로 설정합니다.
- 그런 다음 보내고 싶은 JSON 데이터를 본문 탭에 붙여넣습니다.
- Send 버튼을 클릭하여 요청을 보냅니다.



위에 제시된 예시들은 매우 기본적이고 데모 목적으로 제공되었어요. 그러나 당신의 요구에 따라 더 복잡한 엔드포인트를 생성하기 위해 같은 단계를 따를 수 있어요.

아래는 엔드포인트를 생성하는 동안 고려할 수 있는 몇 가지 추가 팁이에요:

- 개발자가 실제로 엔드포인트가 무엇을 하는지 이해하는 데 도움이 되는 설명적인 엔드포인트 경로를 사용하세요.
- POST 엔드포인트의 요청 본문을 유효성 검사할 수도 있어요. 이것은 받는 데이터가 올바른 형식에 있는지 확인하는 추가적인 검사층 역할을 해요.
- 가능하다면 팀 내 다른 개발자에게 쉽게 엔드포인트를 설명할 수 있는 철저한 문서를 유지하는 것이 좋아요.

위의 정보가 도움이 되었기를 바래요. 읽어주셔서 감사해요. 질문, 의견 또는 관심사가 있으면 아래에 댓글을 남겨주세요.