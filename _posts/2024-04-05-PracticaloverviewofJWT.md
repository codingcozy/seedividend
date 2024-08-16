---
title: "React 사이트에서 JWT 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Practical overview of JWT"
link: "https://medium.com/@manishbdoley23/practical-overview-of-jwt-90263f2d8afc"
isUpdated: true
---





## React와 Node로 구축한 인증 웹 앱 소개

요즘 프로젝트를 진행하면서 JWT의 개념이 적절하게 문서화되지 않고 프런트엔드와 백엔드를 특징으로 하는 프로젝트에서 어떻게 사용해야 하는지에 대해 명확하게 정리된 자료를 찾지 못했습니다. 그래서 기본 JWT 사용 방법과 관련된 링크 및 기사들을 구체적으로 정리한 내 작업 내용을 문서화해보았습니다.

간단한 요약: 프로젝트 소개

<div class="content-ad"></div>

회원가입 프로세스:

- 사용자가 가입을 완료하면, 클라이언트가 이메일과 비밀번호를 서버로 보냅니다.
- 서버는 이메일과 비밀번호를 받은 후, 비밀번호를 해싱하고 데이터베이스에 저장합니다.
- 사용자는 로그인 페이지로 리디렉션됩니다.

로그인 프로세스 (시스템의 핵심):

- 사용자는 동일한 이메일과 비밀번호로 로그인합니다.
- 서버는 이메일과 비밀번호를 받은 후, 데이터베이스에서 해시된 비밀번호를 가져와 사용자가 보낸 비밀번호와 비교합니다. 그리고 jwt:access-token과 jwt:refresh-token을 생성합니다 (jwt:refresh-token은 항상 jwt:access-token보다 오래 지속되어야 합니다).
- jwt:refresh-token은 사용자가 가입할 때 사용한 사용자 정보와 함께 데이터베이스에 저장됩니다.
- 서버는 그런 다음, jwt:access-token과 jwt:refresh-token을 "Set-cookie" 헤더나 express를 위해 res.cookies(token, { httpOnly: true }) 내부에 설정하고 응답을 클라이언트로 다시 보냅니다 (응답에는 사용자 정보와 jwt:access-token이 포함됨).
- 클라이언트는 서버로부터 응답을 받은 후, 사용자가 '환영' 페이지로 리디렉션됩니다.

<div class="content-ad"></div>

보호된 라우트에 액세스하는 방법:

- 사용자가 다음에 보호된 라우트에 액세스하려면 클라이언트는 유효성을 검사하기 위해 서버에 요청과 함께 jwt:액세스 토큰이 포함된 쿠키를 포함해야 합니다.
- 한 번 유효성이 검사되면 "성공" 응답이 전송되고 사용자가 보호된 라우트에 액세스할 수 있습니다.

주요 사항:

- refresh-token은 access-token보다 오래 지속되어야 합니다.
- 쿠키는 서버에 의해서만 조작될 수 있습니다.
- 토큰(jwt:액세스 토큰, jwt:리프레시 토큰)은 절대 클라이언트가 액세스할 수 있는 위치에 저장되어서는 안 됩니다. 즉, 로컬 스토리지, 세션 스토리지.
- "Set-cookie" 응답 헤더는 보안 문제로 인해 클라이언트에서 액세스할 수 없으며 금지된 헤더의 일부입니다(쿠키는 서버에 의해서만 조작될 수 있습니다).
  추가 정보: https://fetch.spec.whatwg.org/#forbidden-response-header-name

<div class="content-ad"></div>

# 인증 앱

기본 설정을 할 수 있다는 가정하에 진행합니다.

먼저 회원가입 및 로그인 컨트롤러를 생성합니다.

```js
// 서버
// 회원가입 컨트롤러
// ./auth.controller.ts
export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const emailExists = await checkIfEmailExists(email);
  if (emailExists)
    return res
      .status(400)
      .json({ message: "이미 존재하는 이메일입니다. 로그인하러 이동" });

  const hashedPassword = await hash(password);
  if (hashedPassword !== undefined) {
    await createNewUser(email, hashedPassword);
  }

  res.status(201).json({ message: "사용자가 성공적으로 생성되었습니다" });
};
```

<div class="content-ad"></div>

로그인 컨트롤러와 액세스 토큰 생성기

```js
// 서버
// ./auth.controller.ts
// 액세스 및 리프레시 토큰 생성
const generateAccessAndRefreshToken = async (
 email: string,
 password: string
) => {
 try {
  const accessToken = jwt.sign(
   { email, password },
   process.env.ACCESS_TOKEN_SECRET!,
   { expiresIn: "10s" }
  );
  const refreshToken = jwt.sign(
   { email, password },
   process.env.REFRESH_TOKEN_SECRET!,
   { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
 } catch (error) {
  throw new Error(
   "토큰 생성 중에 문제가 발생했습니다"
  );
 }
};

// ./auth.controller.ts
// 로그인 컨트롤러
export const loginUser = async (req: Request, res: Response) => {
 const { email, password } = req.body;

 console.log("email:", email);
 const emailExists = await checkIfEmailExists(email);
 if (!emailExists)
  return res.status(400).json({ message: "먼저 가입하세요!" });

 const passFromDb = await getPasswordFromDb(email);
 if (!passFromDb)
  return res.status(400).json({ message: "잘못된 자격 증명!" });
 const result = await bcrypt.compare(password, passFromDb);
 if (!result)
  return res.status(400).json({ message: "유효하지 않은 자격 증명" });

 const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
  email,
  password
 );
 try {
  saveRefreshTokenToDb(email, refreshToken);
  res.status(201)
   .cookie("accesstoken", accessToken, { httpOnly: true })
   .cookie("refreshtoken", refreshToken, { httpOnly: true })
   .json({ message: "로그인 성공!! 로딩 중...", accessToken });
 } catch (error) {
  res.status(400).send("문제가 발생했습니다");
 }
};
```

프론트엔드에서 컨트롤러 호출

```js
// 클라이언트
// ./SignUp.tsx
const response = await fetch(`${import.meta.env.VITE_BACKEND}/auth/signup`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(formData),
});

// ./Login.tsx
const response = await fetch(`${import.meta.env.VITE_BACKEND}/auth/login`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify(formData),
});
```

<div class="content-ad"></div>

프론트엔드에서 쿠키를 받으려면 cors를 허용해야 해요

```js
// 서버
// ./server.ts
import cookieParser from "cookie-parser";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
```

백엔드로부터 응답을 받은 후, 로그인 시 인증 컨텍스트 상태를 설정하고 accesstoken을 설정합니다

```js
// 클라이언트
// ./Login.tsx
const { message, accessToken } = await response.json();
if (response.ok) {
  console.log("성공");
  setUser({
    accessToken,
    email: formData.email,
    password: formData.password,
  });
  navigate("/welcome");
} else {
  console.error("응답에 오류가 있어요");
}
```

<div class="content-ad"></div>

사용자가 성공적으로 로그인되었으며 쿠키가 브라우저에 설정되었습니다.

보호된 경로에 사용자가 액세스하려면 브라우저 쿠키에 jwt:accesstoken이 있어야 합니다. 이 예제에서는 middleware로 authenticateToken이 정의된 route check이 있습니다.

```js
// 서버
// ./routes/check.ts
router.get("/check", authenticateToken, (req, res) => {
  res.send({ success: "success" });
});

// ./auth.middleware.ts
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accesstoken ||
    req.header("Authorization")?.replace("Bearer ", "");

  try {
    const user = verifyToken(token);
    console.log("user:", user);
    next();
  } catch (error) {
    console.log("인증 오류");
    res.status(401).send("인가되지 않았습니다!");
  }
};
```

이제 사용자가 보호된 경로에 액세스하려고 할 때마다 클라이언트는 요청과 함께 jwt:accesstoken 쿠키를 보내야 합니다.

<div class="content-ad"></div>

# 결론

이것은 JWT 토큰이 기본 인증에 어떻게 사용되는지에 대한 기본 개요였습니다. 아직 jwt:refreshtokens의 사용을 보지 못했는데, 이것은 사용자의 인증 상태를 유지하고 사용자를 로그아웃하는 데 유용합니다. 이에 대해 저는 다가올 블로그에서 다룰 예정입니다.

그때까지는 전체 소스 코드를 확인할 수 있습니다 (jwt:refreshtoken 및 jwt:accesstoken 사용법 및 사용자 인증 내용을 frontend에 유지하는 방법 포함).

읽어 주셔서 감사합니다! 만약 이 이야기를 즐겼다면, 👏 버튼을 클릭하고 공유하여 다른 사람이 찾을 수 있도록 도와주세요! 아래에 댓글을 남겨도 괜찮습니다.

<div class="content-ad"></div>

별도로 말씀드리지만, 저는 현재 주 브랜치에서 프로젝트를 진행 중이에요. 생산성에 집착하시거나 시간을 철저히 관리하시는 분들과 연결하고 싶으시다면 LinkedIn이나 Twitter로 연락해 주세요.
