---
title: "Nodejs와 Expressjs로 간단하게 구현하는 Keycloak RBAC 방법"
description: ""
coverImage: "/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_0.png"
date: 2024-06-23 13:24
ogImage: 
  url: /assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_0.png
tag: Tech
originalTitle: "Simple Keycloak RBAC with Node.js , Express.js"
link: "https://medium.com/@erinlim555/simple-keycloak-rbac-with-node-js-express-js-bc9031c9f1ba"
isUpdated: true
---




안녕하세요!

오늘은 Node.js 및 Express.js API에 대한 간단한 역할 기반 액세스 제어 (RBAC)를 구축하는 방법을 알아볼 것입니다. 이를 위해 인증을 위해 Keycloak을 사용할 것입니다.

Keycloak 인증을 통해 Node + Express API를 안전하게 보호하는 해결책을 찾던 중 Keycloak Node.js 어댑터인 keycloak-connect를 만났습니다. 이 어댑터는 모든 요청과 함께 제공된 Bearer 토큰을 확인하는 프로세스를 간소화해주지만, 특정 역할이 있는 사용자가 특정 경로에 액세스할 수 있는지 확인하는 것은 조금 더 복잡해졌습니다.

조사한 결과, Keycloak에서 큰 설정이 필요하지 않는 해결책을 찾을 수 있었습니다. 함께 알아보겠습니다.

<div class="content-ad"></div>

## 준비 사항

안내서를 따라 가기 전에 이미 독립적인 Keycloak 설정이 완료되어 있어야 합니다. 그렇지 않은 경우 Docker를 사용하여 빠르게 로컬에서 설정할 수 있습니다. 또한 사용자 액세스 토큰을 생성하는 방법이 이미 설정되어 있는 것을 기대합니다. (이전 글에서 구성한 프론트엔드 설정을 재사용할 수 있습니다)

# 새로운 Node.js 프로젝트 만들기

먼저, 로컬에서 새로운 Node.js 프로젝트를 시작해 보겠습니다.

<div class="content-ad"></div>

```js
npm init
```

구성을 원하는 대로 변경할 수 있어요. 주로 기본 설정을 사용해요.

## npm 패키지 설치

이 프로젝트에 필요한 패키지를 설치해봐요.

<div class="content-ad"></div>

```js
npm i cors dotenv express jsonwebtoken keycloak-connect nodemon
```

각 패키지에 대해 자세히 알아보려면 해당 공식 문서를 확인할 수 있어요.

jwt를 사용하여 API 요청을 통해 전달된 Bearer 토큰을 읽고, keycloak-connect를 사용하여 토큰을 확인할 거에요.

로컬에서 API 서버를 실행하려면 package.json 파일에 스크립트를 추가해야 해요. "scripts" 아래에 이 줄을 객체에 추가하세요.

<div class="content-ad"></div>

```js
// 파일: package.json

...

"start": "nodemon index.js",

...
```

사용 편의를 위해 package.json 파일에 루트 및 미들웨어 디렉토리의 경로 별칭도 추가했습니다.

```js
// 파일: package.json

...

"imports": {
  "#routes/*": "./routes/*.js",
  "#middlewares/*": "./middlewares/*.js"
}

...
```

## 기본 프로젝트 생성하기

<div class="content-ad"></div>

API가 작동하는지 테스트하려면 간단한 기본 프로젝트를 만들어 보겠습니다. 루트 폴더에 index.js 파일을 추가해주세요.

```js
// 파일: index.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');

const port = process.env.PORT;

// 라우터
const testRoutes = require('#routes/test');

const errorHandler = (error, req, res, next) => {
  const status = error.status || 422;
  res.status(status).send(error.message);
}

const app = express();

app.use(express.json());
app.use(cors());

// 라우트 등록
app.use('/api', testRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 시작되었습니다.`);
});
```

여기서 환경 변수를 사용하는 것을 주목했나요?

프로젝트용 .env 파일을 만들고, 이미 만들지 않았다면 API에 사용할 포트 번호를 할당해주세요.

<div class="content-ad"></div>

우리는 테스트를 위해 라우트 파일을 사용하고 있습니다. 다음으로 그것을 생성해 봅시다.

```js
// 파일: routes/test.js

const express = require('express');
const router = express.Router();

// 테스트 라우트
router.get('/test', (req, res) => {
  res.json({
    message: "API 연결이 설정되었습니다.",
    status: "성공"
  })
  .status(200);
});

module.exports = router;
```

## 기본 프로젝트를 가동해 봅시다

로컬에서 API를 실행하려면 터미널에서 다음을 실행하세요 :

<div class="content-ad"></div>

```js
npm start
```

터미널에서 'Server Started at `port`'와 같은 메시지가 표시될 것입니다.

모든 것이 동작하는지 확인하려면 브라우저에서 http://localhost:`port`/api/test을 열어보세요. 여기에서는 test.js 라우트 파일에서 만든 응답 객체를 확인할 수 있어야 합니다. 이는 우리의 기본 프로젝트가 기대한 대로 동작 중임을 의미합니다.

# 사용을 위한 Keycloak 구성하기


<div class="content-ad"></div>

설정한 Keycloak으로 새로운 프로젝트를 위한 Realm을 생성해보세요. 저는 간단하게 "rbacDemo"라고 지었습니다.

만들어진 Realm으로 이동한 후, 좌측의 "Clients"를 선택하고 "Client 목록" 탭에서 "Client 만들기" 버튼을 클릭해보세요. "Client 만들기" 양식에서 "일반 설정" 아래에 새로운 클라이언트 ID를 지정해주세요.

"Realm 역할"로 이동하여 좌측에 있는 "역할 만들기" 버튼을 클릭해주세요. 우리는 이 Realm을 위한 관리자 역할을 만들 예정입니다.

<div class="content-ad"></div>

![이미지1](/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_1.png)

이제 "Realm roles"로 돌아가면 방금 만든 관리자 역할을 볼 수 있어야 합니다.

이제 우리의 realm 및 클라이언트가 준비되었으므로 사용자가 필요합니다. 2명만 있으면 됩니다. 하나는 관리자 사용자이고 다른 하나는 일반 사용자입니다. "사용자"로 이동하고 "사용자 추가" 버튼을 클릭하세요.

![이미지2](/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_2.png)

<div class="content-ad"></div>

관리자 사용자가 생성되면 사용자의 "사용자 세부정보" 페이지로 이동하여 "자격 증명" 탭에서 사용자의 비밀번호를 설정해주세요.


![이미지](/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_3.png)


한 번 더 "사용자" 페이지로 돌아가서 다른 사용자를 추가해주세요.


![이미지](/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_4.png)


<div class="content-ad"></div>

카렌을 위해도 비밀번호를 만들지 않도록하세요.
"사용자"로 돌아가서 이제 목록에 Admin과 Karen 두 명의 사용자가 있는 것을 확인할 수 있을 거에요.

이제 어드민 사용자로 이동하여 "Role mapping" 탭 아래에서 사용자에게 역할을 할당해볼까요?

![이미지](/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_5.png)

이제 우리 어드민 사용자에게 "admin" 역할이 할당된 것을 확인할 수 있을 거에요.

<div class="content-ad"></div>


<img src="/assets/img/2024-06-23-SimpleKeycloakRBACwithNodejsExpressjs_6.png" />

그것만으로도 Keycloak에서 RBAC 작업을 시작할 준비가 끝났습니다.

# API에 RBAC 구현하기

먼저 Keycloak Realm 및 Client ID를 .env 파일에 추가해야 합니다.


<div class="content-ad"></div>

```js
키클로크가 있는 위치에 따라 KEYCLOAK_URL을 변경해주세요.

## 키클로크 미들웨어 설정

keycloak-connect를 라우트의 미들웨어로 사용하려면, 새로운 미들웨어를 만들어야 합니다.
```  

<div class="content-ad"></div>

```js
// file: middlewares/keycloak.js

const Keycloak = require("keycloak-connect");
const dotenv = require('dotenv').config();

const config = {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": `${process.env.KEYCLOAK_URL}`,
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT,
  "bearer-only": true
}

module.exports = new Keycloak({}, config);
```

그런 다음 우리는 index.js에 방금 만든 미들웨어를 사용하도록 알려주어야 합니다.

```js
// file: index.js

...

const express = require('express');
const keycloak = require('#middlewares/keycloak'); // Keycloak

...

app.use(keycloak.middleware());
app.use(express.json());

...
```

## 라우트에 Keycloak 미들웨어 추가하기


<div class="content-ad"></div>

새로운 라우트 파일을 만들어 미들웨어를 사용할 것이에요.

```js
// 파일: routes/menuItems.js

const express = require("express");
const router = express.Router();

// 미들웨어
const keycloak = require("#middlewares/keycloak");

// 가짜 데이터
const menuItems = [
  {
    name: "크루아상",
    price: "$1",
    onMenu: true
  },
  {
    name:"라떼",
    price: "$5",
    onMenu: true
  },
  {
    name: "로티 차나이",
    price: "$0.50",
    onMenu: true
  },
  {
    name: "핫 초콜릿",
    price: "$5",
    onMenu: false
  },
  {
    name: "사테",
    price: "$8",
    onMenu: false
  },
  {
    name: "팟 타이",
    price: "$7",
    onMenu: false
  }
];

// 어떤 역할이든 열려 있는 라우트
router.get("/menu-items",
[keycloak.protect()],
async (req, res, next) => {
  try {
    let filtered = menuItems.filter(item => {
      if (item.onMenu === true) {
        return item;
      }
    });

    // 필터된 데이터 반환
    res.json(filtered);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
```

라우트가 데이터 세트를 반환하도록 지시할 거에요. 일반적으로는 데이터베이스에서 하겠지만 여기서는 가짜 데이터를 사용할 거에요.

## Keycloak 미들웨어 테스트하기

<div class="content-ad"></div>

알림: 여기서 사용자의 엑세스 토큰을 생성해야 합니다.

Bearer 토큰을 요청의 인증 헤더로 파싱하고 있다고 가정하면, 메뉴에 있는 항목만 응답을 받아야 합니다. /menu-items 경로는 모든 사용자에게 열려 있기 때문에 관리자와 카렌이 동일한 응답을 받아야 합니다.

Postman을 사용하여 이를 테스트할 수 있습니다.

## Bearer 토큰에서 데이터 디코딩 및 추출하기

<div class="content-ad"></div>

이제 "admin" 역할을 가진 사용자에게만 제한된 또 다른 경로를 추가해 봅시다.

먼저 두 개의 미들웨어를 추가해야 합니다.
하나는 jsonwebtoken을 사용하여 Bearer 토큰에서 사용자 데이터를 해독 및 추출하는 것이고, 다른 하나는 해당 사용자가 필요한 역할을 가졌는지 확인하는 것입니다.

```js
// file: middlewares/extractToken.js

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // 액세스 토큰 디코딩
    const bearerToken = req.headers.authorization;
    // bearerToken은 "Bearer <access_token>"을 반환합니다.

    const token = bearerToken.split(" ");
    // token은 ["Bearer", "<access_token>"]을 반환합니다.

    const tokenData = jwt.decode(token[1]);
    // tokenData는 사용자 데이터를 반환합니다.

    // 해독된 토큰 데이터를 요청에 저장
    req.tokenData = tokenData;

    next();
  } catch (error) {
    next(error);
  }
}
```

```js
// file: middlewares/checkIfAdmin.js

module.exports = async (req, res, next) => {
  try {
    const tokenData = req.tokenData;
    const roles = tokenData.realm_access.roles;
    // roles는 문자열 배열을 반환합니다.

    const isAdmin = roles.includes("admin");

    if (isAdmin) {
      // 사용자가 Admin 역할을 가지고 있는 경우, 진행합니다.
      next();
    } else {
      // 사용자가 관리자가 아닌 경우 오류 발생
      const error = new Error("액세스 거부: 이에 액세스할 수 있는 권한이 없습니다.");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}
```

<div class="content-ad"></div>

작성된 미들웨어와 새로운 라우트를 메뉴 아이템 라우트 파일에 추가해보세요.

```js
// 파일: routes/menuItems.js

...

// 미들웨어
const keycloak = require("#middlewares/keycloak");
const extractToken = require("#middlewares/extractToken");
const checkIfAdmin = require("#middlewares/checkIfAdmin");

...

// 어드민 역할만 접근 가능한 라우트
router.get("/menu-items/all", 
[keycloak.protect(), extractToken, checkIfAdmin],
async ( req, res, next) => {
  try {
    // 모든 데이터 반환
    res.json(menuItems);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
```

이제 이 새로운 API 라우트를 Postman을 사용하여 두 사용자로 테스트해보세요.

Karen의 토큰을 사용하면 액세스 거부 오류가 발생합니다.

<div class="content-ad"></div>

만약 Admin의 토큰을 사용했다면, 메뉴에 있는 모든 항목을 얻을 수 있습니다.

# 마무리

여기서는 Node + Express API에 간단한 Role-Based Access Control (RBAC)를 구현하는 방법을 안내했습니다. Keycloak를 사용했습니다.

이 안내서는 여러분의 API에 사용할 수 있는 방법을 쉽게 보여주기 위해 간소화되었습니다. 이 안내서에서는 GET 요청만 사용했지만 사실상 다른 요청 방법과 함께 사용할 수 있습니다.

<div class="content-ad"></div>

이 가이드의 소스 코드는 여기에서 확인할 수 있어요. 이 기사에 대해 토론할 내용이 있다면 언제든지 연락해 주세요.

읽어 주셔서 감사합니다. 다음에 또 만나요! 👋