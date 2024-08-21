---
title: "리액트 앱에서 노드js 백엔드를 통해 API 호출 보안하기"
description: ""
coverImage: "/assets/img/2024-06-20-SecuringAPICallsinReactAppswithNodejsBackend_0.png"
date: 2024-06-20 07:35
ogImage:
  url: /assets/img/2024-06-20-SecuringAPICallsinReactAppswithNodejsBackend_0.png
tag: Tech
originalTitle: "Securing API Calls in React Apps with Node.js Backend"
link: "https://medium.com/@aifuture/securing-api-calls-in-react-apps-with-node-js-backend-a485812955c6"
isUpdated: true
---

오늘날 연결된 세상에서 안전한 웹 앱을 만드는 것은 매우 중요합니다. 애플리케이션의 통신 링크는 민감한 사용자 데이터를 관리하거나 거래를 돕는 경우 모두 안전해야 합니다. 다른 이의 엿보는 데서 민감한 데이터를 보호하기 위해, 리액트 프로젝트에서 API 호출을 안전하게 하는 방법에 대해 살펴보면서 업계 모베스트 프랙티스를 준수합니다.

소개
프런트엔드와 백엔드 간의 통신을 보호하는 것은 웹 애플리케이션 보안에서 가장 중요한 부분 중 하나입니다. 이는 API 엔드포인트를 보호하고 데이터 통신을 암호화하며 강력한 인증 절차를 수립하는 것을 포함합니다. 이러한 안전장치를 구현함으로써 무단 접근, 데이터 유출 및 기타 보안 결함의 가능성을 줄일 수 있습니다.

# Node.js 백엔드 설정하기

우리의 여정은 Node.js와 Express.js를 사용하여 백엔드를 설정하는 것으로 시작됩니다. Express.js는 Node.js를 위한 인기 있는 웹 애플리케이션 프레임워크입니다. 우리는 인증 기능을 갖춘 간단한 RESTful API를 만들어 보호된 리소스에만 인증된 사용자가 접근할 수 있도록 합니다.

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

저희 Node.js 백엔드에서는:

- Express.js를 사용하여 서버를 생성하고 HTTP 요청을 처리합니다.
- 인증은 현대적인 웹 애플리케이션에서 널리 사용되는 stateless 인증 메커니즘인 JSON Web Tokens (JWT)를 사용하여 구현됩니다.
- 사용자 로그인 (/login) 및 보호된 데이터 검색 (/api/data)을 위한 라우트를 정의하고, 후자에 대한 인증을 강제합니다.

```js
// server.js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key";

app.use(express.json());

// 사용자 데이터 모의 (실제 시나리오에서는 데이터베이스에서 검색됨)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// JWT 토큰 생성을 위한 로그인 라우트
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "유효하지 않은 사용자 이름 또는 비밀번호" });
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY);
  res.json({ token });
});

// 보호된 라우트
app.get("/api/data", verifyToken, (req, res) => {
  res.json({ message: "보호된 데이터" });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "인가되지 않음" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "유효하지 않은 토큰" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
```

# React로 프론트엔드 구현하기

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

백엔드 설정이 완료되어, 이제 프론트엔드에 주력하게 됩니다. 리액트 애플리케이션을 구축하여 백엔드 API와 상호작용할 것입니다. 리액트 앱은 사용자 인증을 용이하게 하며, 보호된 데이터를 가져오기 위해 백엔드로 요청을 보냅니다.

우리의 리액트 프론트엔드에서 주요한 부분은 다음과 같습니다:

- React 컴포넌트 내에서 백엔드 엔드포인트에 HTTP 요청을 보내기 위해 fetch API를 사용합니다.
- 성공적으로 인증된 후, JWT 토큰을 클라이언트의 로컬 상태에 저장합니다.
- 토큰은 보호된 API 엔드포인트로의 후속 요청의 Authorization 헤더에 포함됩니다.

```js
// App.js
import React, { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState("");

  const login = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "user1", password: "password1" }),
    });
    const { token } = await response.json();
    setToken(token);
  };

  const fetchData = async () => {
    const response = await fetch("/api/data", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const result = await response.json();
    setData(result.message);
  };

  return (
    <div>
      <button onClick={login}>로그인</button>
      {token && <button onClick={fetchData}>데이터 가져오기</button>}
      <div>{data}</div>
    </div>
  );
}

export default App;
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

# API 호출 및 데이터 전송 보안

API 호출을 보호하는 것은 여러 층의 보호를 포함합니다:

- HTTPS: 백엔드 API가 HTTPS를 통해 제공되도록하여 클라이언트와 서버 간에 전송되는 데이터를 암호화하여 도청과 변경을 방지합니다.
- JWT 인증: JWT 토큰을 사용하여 클라이언트가 자신을 인증하고 안전하게 보호된 리소스에 액세스할 수 있도록 인증합니다.
- 권한 부여: 민감한 정보에 액세스할 수 있는 사용자가 인증되었는지 확인하기 위해 보호된 엔드포인트에 권한 확인을 구현합니다.
- 프록시된 요청: 클라이언트에게 백엔드 API의 세부 정보를 숨기기 위해 서버를 통해 요청을 프록시 처리하여 보안을 강화하고 백엔드 엔드포인트가 직접 노출되는 것을 방지합니다.

# 결론

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

React 프로젝트에서 Node.js 백엔드와 API 호출을 할 때는 최상의 방법을 준수하고 견고한 보안 메커니즘을 적용하여 안전하게 보호할 수 있습니다. JWT 토큰으로 인증 설정부터 서버를 통해 요청 프록시하는 것까지, 각 단계는 미인가된 접근으로부터 민감한 데이터를 보호하고 잠재적인 보안 문제를 예방하는 데 중요합니다.

데이터 프라이버시와 보안이 중요한 점이 갈수록 높아지는 현대 세계에서는 이러한 보안 원칙을 구현하는 것이 권장 사항뿐만 아니라 사용자 신뢰와 확신을 구축하기 위한 필수 요소입니다. 보안을 강조함으로써, 우리는 웹 애플리케이션이 증가하는 위협과 취약점에 강건하게 대응하여 사용자에게 안전하고 안전한 경험을 제공할 수 있습니다.
