---
title: "MERN 스택에서 사용자 인증 시스템 이해하기 단계별 안내  파트1 - 서버 사이드"
description: ""
coverImage: "/assets/img/2024-06-20-UnderstandingUserAuthenticationSystemtheMERNStackAStep-by-StepGuidePart1-ServerSide_0.png"
date: 2024-06-20 04:13
ogImage: 
  url: /assets/img/2024-06-20-UnderstandingUserAuthenticationSystemtheMERNStackAStep-by-StepGuidePart1-ServerSide_0.png
tag: Tech
originalTitle: "Understanding User Authentication System the MERN Stack: A Step-by-Step Guide | Part1 - Server Side"
link: "https://medium.com/@alitalhacoban/understanding-user-authentication-system-the-mern-stack-a-step-by-step-guide-part1-server-side-0810da291505"
---


안녕하세요 개발자 여러분! 이 이야기에서는 서버 및 클라이언트 측을 모두 포함한 인증 시스템을 구축할 것입니다. 그러나 이 부분에서는 서버 측만 구축할 것입니다.

이 프로젝트의 레포지토리 링크는 다음과 같습니다. 미리 확인해보세요.

## 목차

- 소개
- 프로젝트 설정하기
- 환경 변수 설정하기
- 데이터베이스 구성하기
- 모델 생성하기
- 컨트롤러 구축하기
- 미들웨어 구현하기
- 라우트 설정하기
- 서버 테스트하기

<div class="content-ad"></div>

## 1. 소개

인증은 모든 애플리케이션의 중요한 부분입니다. 사용자가 자신이 주장하는 대로인지 확인하고 그들이 자격이 있는 리소스에 액세스할 수 있도록 보장합니다. 이 안내서에서는 Node.js, Express 및 JWT (JSON Web Tokens)를 사용하여 간단한 토큰 기반 인증 시스템을 구축할 것입니다.

이야기 끝에 프로젝트 폴더 구조는 다음과 같이 보일 것입니다:

![프로젝트 폴더 구조](/assets/img/2024-06-20-UnderstandingUserAuthenticationSystemtheMERNStackAStep-by-StepGuidePart1-ServerSide_0.png)

<div class="content-ad"></div>

그럼 시작해보겠습니다!

## 2: 프로젝트 설정

먼저, 프로젝트를 설정해보겠습니다. 터미널을 열고 아래 명령어를 실행해주세요:

```bash
mkdir user-auth-system
cd user-auth-system
mkdir server
mkdir client
cd server
npm init -y
```

<div class="content-ad"></div>

프로젝트 폴더를 만들었는데 서버 및 클라이언트 폴더를 모두 포함하고 있어요. 하지만 클라이언트 쪽은 Part 2에서 만들 거에요. 이제 프로젝트의 서버 쪽에 사용할 필수 패키지를 설치해봐요.

다음 패키지들을 사용할 거에요:

- 서버용으로 express
- 토큰 처리를 위한 jsonwebtoken
- 패스워드 해싱을 위한 bcryptjs
- 환경 변수를 관리하는 dotenv
- 데이터베이스용으로 mongoose
- Node.js 서버를 자동으로 재시작하는 nodemon
- Cross-Origin Resource Sharing를 활성화하기 위한 cors

아래 명령어를 실행하여 이러한 모든 패키지를 설치해주세요:

<div class="content-ad"></div>

```js
npm install express jsonwebtoken bcryptjs dotenv mongoose nodemon cors
```

## 3. 환경 변수 설정

루트 디렉터리에 .env 파일을 만들고 다음 환경 변수를 추가하세요.

```js
MONGO_URI="mongodb://127.0.0.1/UserAuthSystem" // 본인의 정보로 대체해주세요
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

<div class="content-ad"></div>

- JWT_SECRET: JWT(JSON Web Token) 비밀 키는 토큰을 서명하고 확인하기 위해 사용되는 문자열입니다. 신뢰할 수 있는 출처에서 발급되었으며 조작되지 않았음을 서버가 확인하여 토큰의 무결성과 신뢰성을 보장합니다. 비밀 키를 문서에 책임을 증명하는 서명이나 봉인과 같다고 생각해보세요.
- MONGO_URI: MongoDB URI는 응용 프로그램을 MongoDB 데이터베이스에 연결하는 연결 문자열입니다. 데이터베이스 주소, 포트 번호, 데이터베이스 이름 및 인증 자격 증명과 같은 정보를 포함합니다. 데이터베이스의 소포 주소처럼 생각해보세요. 응용 프로그램이 데이터베이스를 찾고 통신할 수 있도록 하는 것입니다. 사용자는 로컬 및 클라우드 기반 연결 문자열을 모두 사용할 수 있습니다.

보안상의 이유로 Node.js 프로젝트의 .env 파일은 민감한 정보가 버전 관리에서 노출되지 않도록 .gitignore 파일에 포함되어야 합니다.

## 4. 서버 생성

server.js라는 파일을 만들어 간단한 Express 서버를 만들어봅시다. 다음 코드를 추가하세요:

<div class="content-ad"></div>

```js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("./config/db");

//Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
```

아래 명령으로 코드를 실행할 수 있습니다:

```js
node src/server.js
```

서버를 시작하는 데 nodemon 패키지를 사용할 수도 있습니다. nodemon을 사용하면 파일 변경 후 서버를 다시 시작할 필요가 없습니다.

<div class="content-ad"></div>

저희 package.json 파일의 scripts 섹션을 업데이트해야 합니다:

```json
 "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
```

이제 다음 명령어를 실행해주세요:

```bash
npm run dev
```

<div class="content-ad"></div>

터미널에서 포트 5000에서 서버가 실행 중임을 확인해야 해요. 확인되면 좋아요! 우리 서버가 가동 중이에요!

![이미지](https://miro.medium.com/v2/resize:fit:900/0*0feaPgbIGqHg0vXg.gif)

## 5. 데이터베이스 구성

데이터베이스로 MongoDB를 사용할 거예요. 데이터베이스 연결을 구성하기 위해 src/config 폴더에 db.js 파일을 생성해주세요.

<div class="content-ad"></div>

```js
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => {
    console.log("DATABASE CONNECTION ERROR", err);
    process.exit(1);
  });
```

URL 'mongodb://127.0.0.1/UserAuthSystem'를 로컬에서 사용할 수 있습니다. 그러나 여기서 온라인 데이터베이스를 생성할 수도 있습니다. 프로젝트를 생성한 다음 클러스터를 만들면 됩니다. 거기서 얻은 URL을 사용하여 자신의 데이터베이스를 사용할 수 있습니다. 양쪽 모두 문제없이 작동합니다.

## 6. 모델 생성

다음으로 src/models/User.js에 User 모델을 생성해보겠습니다.

<div class="content-ad"></div>

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  created_at: {
    type: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("user", UserSchema);
```

- 사용자 문서를 저장하기 전에, 사전 저장 후크가 암호가 수정되었는지 확인합니다.
- 암호가 수정되었으면, bcryptjs를 사용하여 솔트를 생성하고 암호를 해시하여 데이터베이스에 저장합니다.

## 7. Controllers 만들기

컨트롤러는 route의 로직을 처리합니다. 이제 src/controllers 폴더에 authController.js를 생성하세요.

<div class="content-ad"></div>

```js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

async function Login(req, res) {
  try {
    await check("email", "유효한 이메일을 입력해주세요").isEmail().run(req);
    await check("password", "비밀번호를 입력해주세요").exists().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        msg: "유효하지 않은 자격 증명",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "유효하지 않은 자격 증명",
        success: false,
      });
    }

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
}

async function Register(req, res) {
  try {
    await check("username", "사용자 이름을 입력해주세요").not().isEmpty().run(req);
    await check("email", "유효한 이메일을 입력해주세요").isEmail().run(req);
    await check("password", "비밀번호는 6자 이상이어야 합니다")
      .isLength({ min: 6 })
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) { 
      return res.status(400).json({ 
        msg: "이미 등록된 사용자",
        success: false,
      });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
}

async function GetUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "서버 에러" });
  }
}

module.exports = { Login, Register, GetUser };
``` 

- 이 컨트롤러 파일은 로그인, 등록 및 사용자 데이터 가져오기와 같은 핵심 기능을 제공하며, 인증을 위해 JSON Web Token을 활용합니다. 이러한 기능을 라우트에서 사용할 것입니다.
- 인증 시스템의 로그인 및 등록 부분에서 토큰이 생성됩니다. 이 토큰은 클라이언트로 보내는 응답에 포함됩니다. 인증 검증에 중요한 역할을 합니다. 또한 클라이언트 측에서 토큰은 후속 사용을 위해 쿠키에 저장됩니다.
- express-validator npm 패키지를 사용하여 이메일 및 비밀번호가 제공되고 유효한지 확인합니다.

## 8. 미들웨어 구현

토큰을 확인하기 위한 미들웨어가 필요합니다. 계속하기 전에 미들웨어가 무엇인지 설명드리겠습니다.

<div class="content-ad"></div>

- 미들웨어는 웹 애플리케이션에서 요청이 최종 라우트 핸들러에 도달하기 전에 처리하는 함수입니다. 인증, 로깅 또는 요청 및 응답 객체 수정과 같은 작업을 처리할 수 있습니다.
- 미들웨어를 공항의 보안 점검 및 프로세스와 비슷하게 생각해보세요. 비행기를 탑승하기 전에 보안, 세관, 탑승 등 다양한 점검점을 거치는 것처럼 요청도 최종 라우트 핸들러에 도달하기 전에 여러 미들웨어 함수를 거칩니다. 각 미들웨어는 특정 작업을 수행한 다음 요청을 다음 미들웨어로 전달하여 코드를 모듈화하고 재사용 가능하게 만듭니다.

우리는 src/middlewares/verifyAuth.js에서 이를 달성합니다.

```js
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "유효한 토큰이 없습니다",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      msg: "유효한 토큰이 없습니다",
      success: false,
    });
  }
};
```

- 이 코드 스니펫은 x-token으로 할당된 요청 헤더에서 토큰을 확인합니다.
- 토큰이 유효하면 토큰을 디코드하고 디코딩된 사용자 정보를 req.user에 할당한 다음 next()를 호출하여 제어를 다음 미들웨어 또는 라우트 핸들러로 전달합니다.

<div class="content-ad"></div>

## 9. 라우트 설정하기

이제 라우트를 설정해봅시다. src/routes 폴더에 auth.js를 생성하세요.

```js
const express = require("express");
const { Login, Register, GetUser } = require("../controllers/authController");
const verifyAuth = require("../middlewares/verifyAuth");

const router = express.Router();

router.post("/login", Login);

router.post("/register", Register);

router.get("/user", verifyAuth, GetUser);

module.exports = router;
```

또한 server.js 파일을 업데이트하여 라우트를 연결해야 합니다.

<div class="content-ad"></div>

```js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

require("./config/db");

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", require("./routes/auth"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`));
```

<img src="https://miro.medium.com/v2/resize:fit:960/0*ggZsEOvbfphfI42C.gif" />

## 10. 서버 테스트하기

이제 서버를 테스트해보는 시간입니다. 제대로 작동하는지 확인해봅시다.


<div class="content-ad"></div>

- npm run dev 명령어로 서버를 다시 실행한 후 Postman과 같은 API 플랫폼을 사용하여 /register 및 /login 엔드포인트를 테스트해보세요.
- 또는 다른 쉬운 방법을 제안할 수도 있어요. VS Code 확장 프로그램인 REST Client를 사용해보세요.

![이미지](/assets/img/2024-06-20-UnderstandingUserAuthenticationSystemtheMERNStackAStep-by-StepGuidePart1-ServerSide_1.png)

- 이 확장 프로그램을 활용하기 위해 .rest 확장자를 가진 파일을 생성해야 해요. 그 파일에 HTTP 메서드를 입력하고 간편하게 요청을 보낼 수 있어요. 이 방법을 사용하여 라우트를 테스트하는 것을 선호한다면 이 방법을 사용할 수도 있어요.

다음은 routes.rest 파일 내용입니다.

<div class="content-ad"></div>


POST http://localhost:3000/login
Content-Type: application/json

{
    "email":"test@gmail.com",
    "password":"123456"
}

###

POST http://localhost:3000/register
Content-Type: application/json

{
    
    "email":"test@gmail.com",
    "username":"alitalhacoban",
    "password":"123456"
}

###

GET http://localhost:3000/user
Content-Type: application/json
x-token:your_access_token


<img src="https://miro.medium.com/v2/resize:fit:990/0*Fl_hEz8V6Z0DRz88.gif" />

이 글에서는 간단한 토큰 기반 인증 시스템을 Node.js에서 구축했습니다. 이 설정은 Node.js 애플리케이션에서 안전한 인증을 구현하기 위한 견고한 기반을 제공합니다. Part 2에서는 이 프로젝트의 클라이언트 측을 구축하여 인증용 사용자 인터페이스를 만드는 방법과 서버와의 연결 방법에 대해 살펴볼 것입니다.

이 글이 여러분에게 도움이 되기를 바랍니다. 계속 주시고 이와 같은 내용을 더 원하시면 박수를 치세요! 즐거운 코딩하세요!


<div class="content-ad"></div>

아래 링크를 확인해 보세요.

- cobanalitalha@gmail.com
- github.com/carpodok
- linkedin.com/alitalhacoban