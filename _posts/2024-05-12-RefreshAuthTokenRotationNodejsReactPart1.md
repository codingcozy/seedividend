---
title: "인증 토큰 갱신 및 변경Nodejs, React - 파트 1"
description: ""
coverImage: "/assets/img/2024-05-12-RefreshAuthTokenRotationNodejsReactPart1_0.png"
date: 2024-05-12 19:12
ogImage: 
  url: /assets/img/2024-05-12-RefreshAuthTokenRotationNodejsReactPart1_0.png
tag: Tech
originalTitle: "Refresh Auth Token Rotation (Node js , React ) — Part 1"
link: "https://medium.com/@tokosbex/auth-token-rotation-node-js-react-part-1-b83a87d7fb4d"
---


<img src="/assets/img/2024-05-12-RefreshAuthTokenRotationNodejsReactPart1_0.png" />

요즘은 보안이 점점 중요해지고 있어요. 그래서 우리는 적어도 보안 문제와 팁 및 요령의 기본을 명확히 이해해야 해요. 많은 웹사이트들이 약한 인증을 가지고 있습니다. 심지어 귀하의 애플리케이션이 민감한 정보를 포함하지 않더라도, 단순히 이메일 주소만 가지고 있다 하더라도, 귀하의 사용자를 존중하고 최소한의 보안을 제공해야 해요. 이 글에서는 접근 및 새로 고침 토큰을 사용한 간단한 JWT 토큰 기반 인증 시스템을 보여드릴게요. 우리는 Node.js 백엔드, 프론트엔드에는 React, 그리고 MongoDB를 사용할 거에요. 이 기술들에 익숙하지 않다면, 이에 대해 좀 더 알아보고 시작하기 전에 시간을 내어 숙지해주세요. 그러나 JavaScript 기술과 기본 REST 지식이 있다면, 함께 이를 살펴보고 함께 파헤쳐보아요. :)

우선 Node.js 백엔드를 설정하는 것부터 시작해봅시다. 먼저 Node 애플리케이션을 초기화하세요:

```js
npm init
```



다음으로, Express를 설치해주세요:

```js
npm install express
```

백엔드에서 사용할 파일 및 폴더 계층 구조는 다음과 같습니다:

![이미지](/assets/img/2024-05-12-RefreshAuthTokenRotationNodejsReactPart1_1.png)



서버.js 파일을 생성해주세요:

```js
const express = require("express");
const port = 5000;
const app = express();

app.listen(port, () => {
  console.log(`포트 ${port}에서 서버 실행 중`);
});
```

이제 앱을 위한 데이터베이스를 추가해볼까요? MongoDB를 설치하세요. 익숙하지 않다면 유용한 링크가 있습니다.

```js
npm install mongoose
```



아래와 같이 데이터베이스 연결 파일을 생성해 주세요:

```js
const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://127.0.0.1/TokenRotation") // TokenRotation은 데이터베이스 이름입니다
  .then(() => console.log("MongoDB에 연결되었습니다..."))
  .catch((err) => console.error("MongoDB에 연결할 수 없습니다...", err));

module.exports = db;
```

서버의 server.js 파일에 데이터베이스 연결을 추가하는 걸 잊지 마세요:

```js
const db = require("./dbconnection");
```



이제 추가 패키지를 설치해볼게요:

```js
npm install jsonwebtoken
npm install dotenv
npm install bcrypt
```

그럼 이제 사용자 모델을 만들어보겠습니다:

```js
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 1024,
  },
  refreshtoken: [String],
});

userSchema.methods.generateAuthToken = function () {
  const accesstoken = jwt.sign(
    { _id: this._id },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: "10s",
    }
  );
  const refreshtoken = jwt.sign(
    { _id: this._id },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "1d" }
  );

  const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken };
  return tokens;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
```



우리는 MongoDB에서 사용자 데이터를 위한 스키마를 정의합니다.

각 사용자 문서에는 이메일, 패스워드, 그리고 리프레시 토큰을 저장하기 위한 배열이 포함될 것입니다.

우리는 사용자 스키마에 generateAuthToken이라는 메소드를 추가합니다.

- 이 메소드는 jsonwebtoken 패키지를 사용하여 액세스 토큰과 리프레시 토큰을 생성합니다.
- 액세스 토큰은 10초 후에 만료되며 사용자의 _id를 포함합니다.
- 리프레시 토큰은 1일 후에 만료되며 또한 사용자의 _id를 포함합니다.



우리는 사용자 스키마를 기반으로 하는 Mongoose 모델인 User를 생성합니다.

- 이 모델은 사용자를 위한 MongoDB 컬렉션과 상호 작용하기 위해 사용됩니다.
- 우리는 다른 부분에서 사용하기 위해 User 모델을 내보냅니다.

# AppError 및 TryCatch

우리는 더 나은 오류 처리를 위해 두 가지 유틸리티 함수인 AppError와 tryCatch로 코드베이스를 향상시키고 있습니다.



AppError 클래스는 구조화된 방식으로 오류 정보를 캡슐화하기 위해 설계되었습니다. 이 클래스는 기본 Error 클래스를 확장하고 errorCode 및 statusCode와 같은 사용자 정의 속성을 추가하여 오류를 분류하고 적절한 HTTP 상태 코드로 응답할 수 있도록 합니다. 이것은 응용 프로그램 전반에 걸쳐 오류 처리의 일관성을 보장합니다.

```js
class AppError extends Error {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
```

tryCatch 함수는 비동기 컨트롤러 함수 내에서 오류를 처리하는 편리한 방법을 제공합니다. 이 함수는 컨트롤러 함수를 입력으로 받고 새로운 비동기 함수를 반환합니다. 이 새로운 함수는 원래의 컨트롤러 함수를 try-catch 블록으로 감싸줍니다. 컨트롤러 함수 실행 중에 오류가 발생하면 해당 오류가 catch되어 기록되고 Express의 next 함수로 전달됩니다. 이 추상화는 라우트 핸들러에서 오류 처리를 간소화시키며 더 깔끔하고 유지보수하기 쉬운 코드를 장려합니다.

```js
exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
```



이 유틸리티 함수들을 코드베이스에 통합함으로써, 우리의 에러 처리 메커니즘의 가독성이 향상되어 전체 신뢰성과 사용자 경험이 향상됩니다.

# 루트

다음으로, 사용자 인증 및 세션 관리를 위한 엔드포인트를 설계할 것입니다. SignIn, SignUp, RefreshToken 및 LogOut을 포함하고 있습니다. 우선, 이러한 기능을 위한 루트를 정의해 보겠습니다.

```js
const express = require("express");
const authController = require("./controllers");
const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();

//인증 기반 루트
router.post("/signUp", authController.SignUp);
router.post("/signIn", authController.SignIn);
router.get("/refresh", authController.refreshToken);
router.get("/logout", authController.logOut);

module.exports = router;
```



Node.js 어플리케이션에서, 서비스와 컨트롤러는 코드베이스를 조직화하고 구조화하는 데 중요한 구성 요소로서 역할을 합니다. 이는 관심사 분리와 유지보수를 촉진합니다.

- 서비스: 서비스는 비즈니스 로직과 데이터 조작 작업을 캡슐화합니다. 특정 도메인과 관련된 작업이나 특정 작업을 수행하는 데 책임이 있습니다. 서비스는 작업이 어떻게 구현되는지에 대한 세부 정보를 추상화하여 컨트롤러가 HTTP 요청 및 응답 처리에 집중하고 가볍게 유지할 수 있도록 합니다. 서비스는 종종 응용 프로그램의 여러 부분에서 재사용 가능하며 비즈니스 로직을 외부 종속성으로부터 격리하여 테스트를 용이하게 합니다.
  
- 컨트롤러: 컨트롤러는 수신된 HTTP 요청을 처리하고 응용 프로그램의 엔드포인트를 정의합니다. 요청에서 데이터를 추출하고 필요한 작업을 수행하기 위해 서비스와 상호 작용하며 적절한 응답을 클라이언트에 반환합니다. 컨트롤러는 클라이언트 측 인터페이스(예: 웹 브라우저 또는 모바일 앱)와 기저 응용 프로그램 로직 사이의 다리 역할을 합니다. 컨트롤러는 비즈니스 로직이 표현 계층과 분리되도록 하여 작업을 조직화하고 서비스에 작업을 위임합니다. 라우팅 및 요청/응답 처리를 담당하여 요청-응답 주기에서 중요한 구성 요소로 작용합니다.

이제 SignUp 기능을 구현해 보겠습니다.

```js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../../utils/tryCatch");
const AppError = require("../../utils/AppError");
const authServices = require("./services");
const { User } = require("../../Models/user");

exports.SignUp = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email: email });
  
  if (!user) {
    throw new AppError(
      409,
      "데이터베이스에 이미 존재하는 이메일 주소입니다!",
      409
    );
  }

  try {
    const response = await authServices.signUp(email, password);
    const accessToken = response.token.accesstoken;
    const refreshToken = response.token.refreshtoken;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken: accessToken }).end();
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message).end();
  }
});
```



위 코드 스니펫은 Node.js 애플리케이션에서 사용자 등록 요청을 처리하는 SignUp 컨트롤러 함수를 정의합니다. 이 함수는 비밀번호 해싱을 위한 bcrypt 및 토큰 생성을 위한 jsonwebtoken과 같은 필요한 모듈을 가져오며 사용자 지정 오류 처리 유틸리티도 가져옵니다. 요청을 받으면 요청 본문에서 이메일과 비밀번호를 추출하고 동일한 이메일을 가진 기존 사용자를 확인하며, 중복된 이메일이 없으면 SignUp 서비스를 호출하여 사용자 생성을 처리하고 액세스 및 리프레시 토큰을 생성하여 보안을 위해 리프레시 토큰을 HTTP-only 쿠키에 설정하고 응답에 액세스 토큰을 보냅니다. SignUp 프로세스 중 발생하는 모든 오류는 오류 상태 코드와 메시지로 적절히 처리됩니다.

SignUp 서비스:

```js
const bcrypt = require("bcrypt");
const { User } = require("../../Models/user");
const { UserProfile } = require("../../Models/userProfile");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const signUp = async (email, password) => {
  const newUser = new User({
    email: email,
    password: password,
    refreshtoken: "",
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const tokens = newUser.generateAuthToken();
  newUser.refreshtoken = tokens.refreshtoken;
  await newUser.save();
  const data = {
    token: tokens,
    id: newUser.id,
  };

  return data;
};
```

이 서비스 함수 signUp은 애플리케이션에 새로운 사용자를 생성하는 역할을 합니다. 이메일과 비밀번호를 매개변수로 받습니다. 함수 내에서는 제공된 이메일과 비밀번호로 User 객체를 생성하고 비어있는 리프레시 토큰 필드를 가집니다. 그런 다음 보안을 위해 bcrypt를 사용하여 비밀번호를 해싱합니다. 사용자 모델의 generateAuthToken 메서드를 사용하여 인증 토큰을 생성하는 책임이 있는 사용자 모델의 객체에 리프레시 토큰을 할당합니다. 마지막으로 새 사용자를 데이터베이스에 저장하고 생성된 토큰과 사용자 ID를 포함하는 객체가 반환됩니다. 이 함수는 사용자 암호가 데이터베이스에 저장되기 전에 안전하게 해싱되며 새로 생성된 사용자에 대한 인증 토큰을 제공합니다.



동일한 스키마를 사용하여 SignIn 기능을 이제 구현하겠습니다:

```js
exports.SignIn = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(
      404,
      "이메일 주소를 찾을 수 없습니다. 이메일을 확인하고 다시 시도해주세요.",
      404
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new AppError(
      401,
      "잘못된 비밀번호입니다. 비밀번호를 다시 확인하고 다시 시도해주세요.",
      401
    );
  }

  try {
    let newRefreshTokenArray = "";

    // 사용자의 기존 refresh 토큰 확인
    let refreshToken = "";
    if (!cookies?.jwt) {
      refreshToken = user.refreshtoken;
    } else {
      refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();
      
      if (!foundToken) {
        console.log("로그인 시 시도된 refresh 토큰 재사용!");
        // 토큰이 데이터베이스에 없으면 쿠키를 지우기
        res.clearCookie("jwt", { httpOnly: true });
        refreshToken = "";
      }
    }
    const response = await authServices.signIn(user, newRefreshTokenArray);
    const accessToken = response.token.accesstoken;
    refreshToken = response.token.refreshtoken;
    const profilePic = response.profilePic;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ accessToken: accessToken, profilePic: profilePic })
      .end();
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json(err.message).end();
  }
});
```

이 코드 세그먼트는 Node.js 애플리케이션에서 SignIn 기능을 구현하여 사용자 인증을 안전하게 처리합니다. 먼저 요청 본문에서 사용자 자격 증명을 추출하고 제공된 이메일에 따라 데이터베이스에서 사용자를 검색합니다. 사용자를 찾을 수 없거나 비밀번호가 일치하지 않는 경우 해당 문제를 나타내는 사용자 정의 오류가 발생합니다. 그런 다음 사용자의 기존 refresh 토큰을 확인하고 토큰의 재사용을 방지하기 위해 유효성을 검사합니다. 성공적으로 인증된 후, 새로운 액세스 및 refresh 토큰을 생성하고 사용자의 프로필 사진을 가져오기 위해 서비스 함수를 호출합니다. 새 refresh 토큰은 보안을 위해 HTTP-only 쿠키에 설정되고, 액세스 토큰과 프로필 사진은 응답으로 반환됩니다. 프로세스 중 발생하는 모든 오류는 적절히 처리되어 상응하는 상태 코드와 메시지로 오류 응답으로 반환됩니다.

```js
const signIn = async (user, newRefreshTokenArray) => {
  const token = user.generateAuthToken();
  user.refreshtoken = [...newRefreshTokenArray, token.refreshtoken];
  await user.save();
  const data = {
    token: token,
    userId: user.id,
  };
  return data;
};

module.exports = {
  signUp,
  signIn,
};
```



서비스 기능 signIn은 사용자 인증에 성공한 경우 인증 토큰을 생성하고 사용자 프로필 정보를 검색하는 작업을 처리합니다. 이 함수는 인증된 사용자 객체와 새로운 리프레시 토큰 배열을 매개변수로 받습니다. 그런 다음 사용자 객체의 generateAuthToken 메서드를 사용하여 인증 토큰을 생성합니다. 새로운 리프레시 토큰은 사용자의 refreshtoken 배열에 추가되고 사용자 객체가 데이터베이스에 다시 저장됩니다. 마지막으로 생성된 토큰과 사용자 ID가 포함된 객체를 구성하고 반환합니다. 이 함수는 인증 토큰이 안전하게 생성되고 저장되며 사용자 정보가 정상적으로 검색되어 제공되도록 보장합니다.

여기까지가 기본 인증 흐름입니다. 이제 로그아웃 기능만 필요합니다.

```js
exports.logOut = tryCatch(async (req, res) => {
  // 클라이언트에서는 accessToken도 삭제하세요
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  // 데이터베이스에 리프레시 토큰이 있는지 확인합니다.
  const foundUser = await User.findOne({ refreshtoken: refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // 데이터베이스에서 리프레시 토큰 삭제
  foundUser.refreshtoken = foundUser.refreshtoken.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
});
```

이 코드 스니펫은 Node.js 애플리케이션에서 사용자 로그아웃 요청을 처리하는 logOut 컨트롤러 함수를 정의합니다. 오류 처리를 위해 tryCatch 유틸리티가 사용됩니다. 이 함수는 먼저 사용자가 쿠키에 저장된 리프레시 토큰을 확인합니다. 그렇지 않은 경우 204(내용 없음) 상태 코드를 보내어 작업이 필요하지 않음을 나타냅니다. 리프레시 토큰이 발견되면 함수는 데이터베이스를 쿼리하여 존재 여부를 확인합니다. 데이터베이스에서 리프레시 토큰을 찾을 수 없는 경우 리프레시 토큰 쿠키를 지우고 204 상태 코드를 보냅니다. 그렇지 않으면 사용자가 저장한 리프레시 토큰에서 리프레시 토큰을 제거하고 업데이트된 사용자 객체를 다시 데이터베이스에 저장한 다음 리프레시 토큰 쿠키를 지우고 204 상태 코드를 보내 성공적으로 로그아웃 여부를 나타냅니다. 이 함수는 리프레시 토큰을 안전하게 처리하여 관리하고 관련 쿠키를 지움으로써 사용자 로그아웃 요청을 적절하게 처리합니다.



# 리프레시 엔드포인트

리프레시 토큰을 사용하면 인증 시스템에서 새 액세스 토큰을 얻을 수 있어요. 액세스 토큰이 만료될 때 이를 사용하여 새 액세스 토큰을 요청할 수 있어요. 액세스 토큰이 수명이 짧지만, 리프레시 토큰은 긴 수명을 가지며 보통 몇 일이나 심지어 몇 주 동안 유효합니다. 액세스 토큰이 만료되었을 때 리프레시 토큰은 사용자가 다시 로그인할 필요 없이 새 액세스 토큰을 요청할 수 있도록 도와줘요. 이를 통해 민감한 자격 증명 노출을 최소화하고 사용자 인증 빈도를 줄여 보안을 강화할 수 있어요. 리프레시 토큰은 클라이언트 측에 안전하게 저장되며 보통 HTTP-only 쿠키에 저장되며 안전한 인증 흐름을 통해 새 액세스 토큰으로 교환됩니다.

그래서 조금 더 명확하게 설명되었나요? 이를 향상시키기 위해 사용자 액세스 키가 만료된 경우 “무음"이라고 부를 수 있는 리프레시 토큰 엔드포인트가 필요해요.



```js
exports.refreshToken = tryCatch(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true });
  const foundUser = await User.findOne({ refreshtoken: refreshToken });
  
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        const hackedUser = await User.findOne({ username: decoded._id });
        hackedUser.refreshtoken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = foundUser.refreshtoken.filter(
    (rt) => rt !== refreshToken
  );

  //evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshtoken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || foundUser._id.toString() !== decoded._id) {
        return res.sendStatus(403);
      }
      //refreshtoken still valid
      const accessToken = jwt.sign(
        { _id: decoded._id },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        { _id: foundUser._id },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "1d" }
      );
      foundUser.refreshtoken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(accessToken);
    }
  );
});
```

- Refresh Token 확인: 먼저 "jwt"라는 쿠키에 저장된 리프레시 토큰이 있는지 확인합니다. 만약 없다면 401(권한없음) 상태 코드로 응답하여 사용자가 인증해야 함을 알립니다.
- 쿠키 삭제: 리프레시 토큰의 존재 여부와 상관없이 보안을 위해 "jwt" 쿠키를 제거합니다.
- 사용자 찾기: 그 후 데이터베이스에서 리프레시 토큰과 연결된 사용자를 찾습니다. 사용자를 찾지 못하면 리프레시 토큰의 무결성을 확인합니다.
- 리프레시 토큰 확인: 환경 변수에 저장된 비밀 키를 사용하여 리프레시 토큰을 확인합니다. 토큰이 유효하지 않거나 만료되었다면 403(금지됨) 상태 코드로 응답합니다. 또한 확인에 사용된 사용자를 찾아 사용자와 연관된 모든 리프레시 토큰을 제거하여 잠재적인 남용을 방지합니다.
- 토큰 갱신: 리프레시 토큰이 유효하고 사용자와 연관되어 있다면 액세스 토큰과 리프레시 토큰을 갱신합니다. 짧은 만료 시간(여기서 10초)을 갖는 새로운 액세스 토큰과 긴 만료 시간(여기서 1일)을 갖는 새로운 리프레시 토큰을 생성합니다. 사용자의 리프레시 토큰 배열을 새로운 리프레시 토큰으로 업데이트하고 데이터베이스에 변경 사항을 저장합니다.
- 새로운 쿠키 설정: 마지막으로 새로운 리프레시 토큰을 안전하게 설정하기 위해 HTTP-only 플래그와 최대 24시간 나이가 있는 쿠키로 설정합니다. 새로운 액세스 토큰과 함께 200(성공) 상태 코드로 응답합니다.

또한 데이터베이스로부터 사용자 이메일을 가져오는 보안된 엔드포인트가 필요합니다:

```js
exports.getUserData = tryCatch(async (req, res) => {
  const userId = req.params.id;
  const foundUser = await User.findOne({ _id: userId });

  const data = {
    userEmail: foundUser.email,
  };

  res.status(200).json(data).end();
});
```



저희 라우트에도 다음을 추가해야 합니다:

```js
const express = require("express");
const authController = require("./controllers");
const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();

//Auth 기반 라우트
router.post("/signUp", authController.SignUp);
router.post("/signIn", authController.SignIn);
router.get("/refresh", authController.refreshToken);
router.get("/logout", authController.logOut);

router.get("/getUser/:id", verifyJWT, authController.getUserData);

module.exports = router;
```

여기서 verifyJWT 미들웨어에 대해 이야기해야 합니다:

```js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split("Bearer ")[1];
  console.log(token);
  console.log("access secret", process.env.ACCESS_SECRET_KEY);
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    console.log(decoded);
    if (err) {
      console.log(err);
      return res.status(403).json({ error: "Forbidden: JWT token expired!" });
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
```



이 코드에서는 응용 프로그램에서 인증에 사용되는 JSON Web Token (JWT)을 확인하는 verifyJWT라는 미들웨어 함수를 정의합니다. 먼저, JWT 확인을 처리하기 위해 jsonwebtoken 패키지를 가져오고 환경 변수에 안전하게 액세스하기 위해 dotenv 패키지를 가져옵니다. verifyJWT 함수는 req (요청), res (응답) 및 next라는 세 가지 매개변수를 사용하여 Express 애플리케이션에서 미들웨어로 작동할 수 있습니다. 함수 내에서는 들어오는 요청의 Authorization 헤더에서 JWT 토큰을 추출합니다. 헤더가 누락되거나 형식이 잘못된 경우 즉시 상태 코드가 401 (인증되지 않음)으로 응답됩니다. 그렇지 않으면 헤더를 분할하여 "Bearer " 접두사를 제거하고 토큰을 분리합니다. 그런 다음 jwt.verify를 사용하여 토큰을 디코딩하고 환경 변수에 저장된 엑세스 시크릿 키와의 일치 여부를 확인합니다. 확인이 실패하는 경우(예: 토큰 만료 또는 잘못된 서명), 상태 코드가 403(금지됨)으로 응답되고 오류 메시지가 표시됩니다. 그렇지 않으면 토큰이 유효한 경우 디코딩된 페이로드(일반적으로 사용자 정보를 포함)를 추출하여 req.user로써 요청 객체에 첨부합니다. 마지막으로 next 함수를 호출하여 요청-응답 주기에서 다음 미들웨어나 라우트 핸들러로 제어를 전달합니다. 이 미들웨어를 사용하면 유효한 JWT 토큰을 가진 요청만 보호된 경로에 액세스할 수 있도록하며 응용 프로그램의 보안을 강화합니다.

필요한 모든 것을 생성한 후에는 서버.js에 cors 및 쿠키 구문 분석을 위한 추가 설정이 필요합니다:

```js
const express = require("express");
const cors = require("cors");
const db = require("./dbconnection");
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const userRoutes = require("./apis/users/routes");

const frontendURI = "http://localhost:5173";

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: frontendURI, // 귀하의 프론트엔드 도메인으로 대체
    credentials: true, // 자격 증명(쿠키, 인가 헤더) 허용
  })
);
app.use("/users", userRoutes);
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행중입니다.`);
});
```

- CORS(Cross-Origin Resource Sharing):



- Cors 미들웨어는 우리 애플리케이션에서 Cross-Origin Resource Sharing을 활성화하는 역할을 합니다. 이를 통해 서버의 리소스가 원래 출처(origin)와 다른 도메인에서 요청될 수 있습니다. 이것은 서로 다른 도메인의 서버로 요청을 하는 클라이언트 측 웹 애플리케이션에게 중요합니다.
- 우리의 코드에서는 cors를 특정한 옵션으로 구성합니다:
  - origin: 크로스-오리진 요청의 허용된 원본을 지정합니다. 이 경우, "http://localhost:5173"인 특정 프론트엔드 URI(frontendURI)에서의 요청을 허용합니다.
  - credentials: 서버가 요청에 쿠키나 인증 헤더와 같은 자격 증명을 포함해야 하는지 여부를 나타냅니다. 이를 true로 설정하면 클라이언트가 그러한 자격 증명을 포함할 수 있습니다.

2. bodyParser:

- bodyParser 미들웨어는 들어오는 요청 본문을 구문 분석하고 구문 분석된 데이터를 req.body 속성 아래에서 사용할 수 있게 합니다. 특히 POST 또는 PUT 요청을 처리할 때 클라이언트로부터 전송된 데이터를 처리하는 데 필수적입니다.
- 우리의 코드에서는 bodyParser.json()을 사용하여 JSON 인코딩된 요청 본문을 구문 분석합니다. 또한 요청 본문 크기의 제한을 5MB로 설정하여 단일 요청에서 전송할 수 있는 데이터 양을 제한하여 잠재적인 서비스 거부 공격을 방지합니다.

3. cookieParser:



- CookieParser 미들웨어는 클라이언트 요청에 첨부된 쿠키를 구문 분석하고 req.cookies 속성 아래에서 사용할 수 있도록 만듭니다. 클라이언트가 보낸 쿠키를 처리하는 데 중요한데, 이는 세션 관리, 인증 및 기타 목적으로 자주 사용됩니다.
- 저희 코드에서는 추가 구성 없이 cookieParser의 기본 설정을 사용하고 있습니다.

이제 백엔드 구현을 다룼으로써, 애플리케이션을 위한 최소한의 프론트엔드를 만들어 모든 것을 연결해 보겠습니다. 프론트엔드 인터페이스를 구축함으로써 방금 개발한 백엔드 기능과 상호 작용할 수 있게 됩니다. React를 사용하여 기본 프론트엔드 구조를 설정해 보겠습니다. 우리는 SignUp, SignIn, RefreshToken 및 LogOut과 같은 백엔드에 구현한 인증 엔드포인트와 상호 작용할 수 있는 사용자 인터페이스 구성 요소를 만들 것입니다. 더불어 Axios와 같은 도구를 활용하여 백엔드 API로 HTTP 요청을 보내고 사용자 인증 흐름을 원활하게 처리할 것입니다. 그러니 이제 소매를 걷어 올리고 프론트엔드 개발 프로세스로 뛰어 들어 백엔드 아키텍처를 보완해 봅시다!

모든 것이 정확히 완료되었는지 확인하고 보장하려면, 이 코드의 GitHub 저장소를 방문해 주세요.

제2부에서 여러분을 만나는 것을 고대하겠습니다!