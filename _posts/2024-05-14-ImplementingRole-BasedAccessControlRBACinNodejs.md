---
title: "Nodejs에서 Role-Based Access Control RBAC 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_0.png"
date: 2024-05-14 14:52
ogImage: 
  url: /assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_0.png
tag: Tech
originalTitle: "Implementing Role-Based Access Control (RBAC) in Node.js"
link: "https://medium.com/@techsuneel99/implementing-role-based-access-control-rbac-in-node-js-871591b80a83"
---


역할 기반 액세스 제어 (RBAC)는 응용 프로그램 보안의 중요한 측면입니다. 조직 또는 응용 프로그램 내에서 사용자의 역할에 따라 리소스에 대한 액세스를 관리하고 제한하는 구조화된 접근 방식을 제공합니다. 이 포괄적인 안내서에서는 RBAC 개념을 탐색하고 혜택을 논의하며 Node.js 응용 프로그램에 RBAC를 구현하는 과정을 안내합니다. 이 글을 마치면 직접 프로젝트에 대해 RBAC를 설계하고 구현하는 방법을 명확히 이해할 수 있을 것입니다.

![2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_0](/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_0.png)

# 목차

- 역할 기반 액세스 제어 (RBAC) 소개



- RBAC이란 무엇인가요?
- RBAC의 장점들

- Node.js 환경 설정하기

- 준비물
- 프로젝트 구조

- 예시 프로젝트: RBAC 실습하기



- 간단한 업무 관리 시스템 구축
- 역할 및 권한 정의
- 인증 및 권한 부여 구현
- RBAC 시스템 테스트

- 최상의 실천 방법 및 보안 고려 사항

- 데이터 유효성 검사
- 감사 추적
- 세분화된 권한
- 정기적인 업데이트 및 모니터링

- 결론



# 1. 역할 기반 액세스 제어 (RBAC) 소개

# RBAC란 무엇인가요?

역할 기반 액세스 제어 (RBAC)은 시스템 액세스를 인가된 사용자로 제한하는 보안 개념입니다. RBAC에서는 액세스 권한이 역할과 연관되며 사용자에게 하나 이상의 역할이 할당됩니다. 이러한 역할은 사용자가 시스템 내에서 어떤 작업이나 작업을 수행할 수 있는지를 정의합니다.

RBAC는 권한을 중앙 집중화하여 액세스 제어를 간소화하며, 관리자가 고수준에서 사용자 액세스를 관리할 수 있게 합니다. 사용자가 자신의 역할을 수행하는 데 필요한 권한만 갖도록 보장하여 보안을 강화하며, 무단 조치의 위험을 줄입니다.



# 롤 기반 인증 이해하기

롤 기반 인증은 사용자에게 역할을 할당하고 해당 역할에 따라 리소스에 대한 액세스를 결정하는 액세스 제어 방법입니다. 보통 각 역할에는 관련된 권한 집합이 있고, 사용자들은 할당된 역할에 기반하여 리소스에 액세스 권한이 부여됩니다.

응용 프로그램에 따라 역할은 다양할 수 있지만 일반적으로 사용되는 역할은 다음과 같습니다:

- Admin: 일반적으로 모든 기능에 액세스하고 관리 작업을 수행할 수 있는 관리 권한이 있는 사용자입니다.
- User: 기본 기능 및 기능에 액세스 권한이 있는 표준 사용자입니다.
- Moderator: 콘텐츠를 조절하거나 사용자를 관리하는 역할을 맡은 권한이 있는 사용자입니다.
- Guest: 인증되지 않은 사용자로서 애플리케이션에 제한된 액세스 권한을 갖는 사용자입니다.



# RBAC의 장점

RBAC를 구현하면 다음과 같은 여러 가지 이점이 있습니다:

- 보안: RBAC는 응용 프로그램 내에서 미인가된 액세스나 작업의 위험을 최소화하여 보안 취약점을 줄입니다.
- 간편함: RBAC는 권한을 역할로 그룹화하여 사용자 액세스 관리를 간편하게 만들어 관리를 더 간편하게 합니다.
- 확장성: RBAC는 매우 확장 가능하여 소규모 및 대규모 응용 프로그램에 모두 적합합니다.
- 준수: GDPR 및 HIPAA와 같은 많은 규제 프레임워크는 RBAC와 같은 견고한 액세스 제어 메커니즘을 요구합니다.
- 감사 기능: RBAC를 사용하면 사용자 작업을 추적하고 감사할 수 있어 보안 침해를 식별하는 데 중요합니다.

이제 RBAC의 개념과 장점을 이해했으니, Node.js 애플리케이션에서 구현해 봅시다.



# 2. Node.js 환경 설정하기

# 요구 사항

RBAC 구현에 들어가기 전에, 다음의 요구 사항이 갖춰져 있는지 확인해주세요:

- 시스템에 Node.js가 설치되어 있어야 합니다.
- 코드 편집기(예: Visual Studio Code)가 필요합니다.
- JavaScript와 Node.js의 기본 지식이 요구됩니다.
- Node.js 애플리케이션을 실행하기 위한 터미널 또는 명령 프롬프트가 있어야 합니다.
- 의존성을 설치하기 위한 npm(Node Package Manager)이 필요합니다.



# 프로젝트 구조

이번 튜토리얼에서 사용할 기본 프로젝트 구조입니다:

```js
rbca/
│
├── helpers/
│   ├── db.js
│   ├── errorHandler.js
│   ├── jwt.js
│   └── role.js
│
├── models/
│   └── user.js
│
├── public/
│   └── stylesheets/
│       └── style.css
│
├── routes/
│   ├── index.js
│   └── user.controllers.js
│
├── services/
│   └── user.services.js
│
├── views/
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
│
├── .gitignore
├── README.md
├── app.js
├── config.json
├── package-lock.json
└── package.json
```

이 프로젝트 구조는 튜토리얼을 진행하면서 점진적으로 구성해 나갈 것입니다.



# 의존성 설치

```js
npm install bcryptjs@^2.4.3 cookie-parser@~1.4.4 cors@^2.8.5 debug@~2.6.9 express@~4.16.1 express-jwt@^6.0.0 http-errors@~1.6.3 jade@~1.11.0 jsonwebtoken@^8.5.1 mongoose@^5.9.25 morgan@~1.9.1 rootpath@^0.1.2 --save
```

# helpers/db.js:

```js
const config = require("../config.json");
const mongoose = require("mongoose");
const conenctionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
try {
  mongoose
    .connect(
      process.env.MONGODB_URI || config.connectionString,
      conenctionOptions
    )
    .then((res) => console.log(`MOngoDB connected Successfully..!`));
} catch (error) {
  console.log(`MongoDB Error: `, error.message);
  process.exit(1);
}

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/user"),
};
```



- mongoose 모듈을 가져옵니다
- 설정에서 데이터베이스 URL을 읽어옵니다
- 연결 옵션을 설정합니다
- 연결 및 오류 이벤트를 처리합니다
- Promise 라이브러리를 구성합니다
- 다른 곳에서 사용할 모델을 내보냅니다

helpers/errorHandler.js:

```js
function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // 사용자 정의 애플리케이션 오류
    return res.status(400).json({ message: err });
  }
  if (err.name === "ValidationError") {
    // mongoose 유효성 검사 오류
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt 인증 오류
    return res.status(401).json({ message: "잘못된 토큰" });
  }

  // 기본적으로 500 서버 오류
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
```

helpers/jwt.js:



```js
const expressJwt = require("express-jwt");
const config = require("../config.json");
const db = require("../helpers/db");

function jwt(roles = []) {
  // roles 매개변수는 단일 역할 문자열 (예: Role.User 또는 'User')이거나 역할 배열 ([Role.Admin, Role.User] 또는 ['Admin', 'User'])일 수 있습니다.
  if (typeof roles === "string") {
    roles = [roles];
    console.log(roles);
  }

  const secret = config.secret;

  return [
    // JWT 토큰을 인증하고 사용자를 요청 객체(req.user)에 추가합니다.
    expressJwt({ secret, algorithms: ["HS256"] }),

    // 사용자 역할에 따라 권한 부여
    async (req, res, next) => {
      const user = await db.User.findById(req.user.sub);

      if (!user || (roles.length && !roles.includes(user.role))) {
        // 사용자 역할이 허가되지 않았습니다.
        return res.status(401).json({ message: "Only Admin is Authorized!" });
      }
      // 인증 및 권한 부여 성공
      req.user.role = user.role;
      next();
    },
  ];
}

module.exports = jwt;
```

helpers/role.js:

```js
module.exports = {
  Admin: "Admin",
  User: "User",
};
```

models/user.js:




```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id, delete ret.password;
  },
});

module.exports = mongoose.model("User", schema);
```

routes/index.js:

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

routes/user.controllers.js:




```js
const express = require("express");
const router = express.Router();
const userServices = require("../services/user.services");
const Role = require("../helpers/role");
const jwt = require("../helpers/jwt");

// 라우트
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", jwt(Role.Admin), getAll);
router.get("/current", jwt(), getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

// 라우트 함수
function authenticate(req, res, next) {
  userServices
    .authenticate(req.body)
    .then((user) => {
      console.log(user);
      user
        ? res.json({ user: user, message: "사용자가 로그인되었습니다." })
        : res
            .status(400)
            .json({ message: "사용자 이름 또는 비밀번호가 잘못되었습니다." });
    })
    .catch((error) => next(error));
}

function register(req, res, next) {
  userServices
    .create(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: `이메일 ${req.body.email}으로 성공적으로 등록되었습니다.`,
      })
    )
    .catch((error) => next(error));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "권한이 없습니다!" });
  }
  userServices
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  console.log(req);
  userServices
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.status(404)))
    .catch((error) => next(error));
}

function getById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "사용자를 찾을 수 없습니다!" });
        next();
      }
      return res.json(user);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  userServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `ID가 ${req.params.id}인 사용자가 성공적으로 업데이트되었습니다.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  userServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `ID가 ${req.params.id}인 사용자가 성공적으로 삭제되었습니다.`,
      })
    )
    .catch((error) => next(error));
}
```

services/user.services.js:

```js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const db = require("../helpers/db");
const User = db.User;

// 사용자 자격 증명을 인증하는 함수
async function authenticate({ email, password }) {
  // 이메일로 사용자 찾기
  const user = await User.findOne({ email });
  console.log("사용자 모델", user);
  // 사용자가 있고 암호가 일치하면 토큰 생성
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
      expiresIn: "7d",
    });
    
    return { ...user.toJSON(), token };
  }
}

// 모든 사용자 가져오기
async function getAll() {
  return await User.find();
}

// ID를 사용하여 사용자 가져오기
async function getById(id) {
  console.log("ID를 찾는 중: ", id);
  return await User.findById(id);
}

// 사용자 추가
async function create(userParam) {
  // 사용자가 있는지 확인
  const user = await User.findOne({ email: userParam.email });
  // 유효성 검사
  if (user) throw `동일한 이메일이 이미 존재합니다: ${userParam.email}`;

  // 사용자 객체 생성
  const newUser = new User(userParam);
  if (userParam.password) {
    newUser.password = bcrypt.hashSync(userParam.password, 10);
  }

  await newUser.save();
}

// 사용자 업데이트
async function update(id, userParam) {
  const user = await User.findById(id);
  if (!user) throw "사용자를 찾을 수 없습니다.";
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw `동일한 이메일을 가진 사용자가 이미 존재합니다: ${userParam.email}`;
  }

  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  // 사용자 객체 복사
  Object.assign(user, userParam);
  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
```



```js
레이아웃 확장

콘텐츠 블록
  h1= 메시지
  h2= 오류 상태
  pre #{error.stack}
```

views/index.jade:

```js
레이아웃 확장

콘텐츠 블록
  h1= 제목
  p 환영합니다 #{title}
```

views/layout.jade:



```json
{
  "database": {
    "host": "localhost",
    "username": "admin",
    "password": "password123",
    "port": 3306
  },
  "server": {
    "port": 5000,
    "corsOptions": {
      "origin": "*"
    }
  }
}
```



```json
{
  "connectionString": "//당신의 MONGODB URI",
  "secret": "//JWT 토큰을 위한 원하는 시크릿 키"
}
```

사용자 등록

![사진](/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_1.png)

사용자 인증




![Current User](/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_2.png)

![Unauthorize](/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_3.png)




<img src="/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinNodejs_4.png" />

# 7. 모범 사례 및 보안 주의 사항

Node.js 애플리케이션에서 RBAC를 구현할 때 다음 모범 사례와 보안 주의 사항을 고려해보세요:

# 데이터 유효성 검사



사용자 입력을 항상 유효성 검사하여 SQL 인젝션, XSS 공격 등과 같은 보안 취약점을 방지하세요. 데이터 무결성을 보장하기 위해 유효성 검사 라이브러리나 프레임워크를 사용하세요.

## 감사 로그

사용자 활동과 액세스 시도를 추적하기 위해 감사 로그를 구현하세요. 이는 보안 위반이나 무단 활동을 식별하는 데 중요할 수 있습니다.

## 세분화된 권한



사용자가 자신의 업무를 수행하는 데 필요한 최소한의 권한을 보장하기 위해 세밀한 권한을 정의하십시오. 역할에 권한을 너무 많이 할당하지 않도록 주의하십시오.

## 정기적인 업데이트와 모니터링

RBAC 시스템을 최신 상태로 유지하십시오. 응용 프로그램이 발전함에 따라 역할과 권한을 조정해야 할 수 있습니다. 보안을 유지하기 위해 정기적으로 RBAC 정책을 모니터링하고 검토하십시오.

## 저와 소통하기:



Linkedin: [https://www.linkedin.com/in/suneel-kumar-52164625a/](https://www.linkedin.com/in/suneel-kumar-52164625a/)

# 8. 결론

이 포괄적인 안내서에서는 Role-Based Access Control (RBAC)의 개념을 탐구하고 Node.js 애플리케이션에 구현하는 방법을 시연했습니다. 역할 및 권한 정의, 사용자 인증, 역할 할당, 역할 기반 미들웨어, 그리고 RBAC가 작동하는 방식을 보여 주기 위해 샘플 작업 관리 시스템을 만들었습니다.

RBAC를 구현함으로써 Node.js 애플리케이션의 보안을 크게 향상시키고 사용자 액세스를 효과적으로 제어하며 보안 위협을 줄일 수 있습니다. 또한, 최적의 방법을 따르고 보안 고려 사항을 고려함으로써 RBAC 시스템의 견고성을 보장할 수 있습니다.