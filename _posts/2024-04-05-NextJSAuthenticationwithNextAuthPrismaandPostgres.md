---
title: "NextAuth, Prisma 및 Postgres를 사용한 NextJS 인증 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "NextJS Authentication with NextAuth, Prisma and Postgres"
link: "https://medium.com/@rabin.nyaundi254/nextjs-authentication-with-nextauth-prisma-an-postgres-7d55b14e68ad"
isUpdated: true
---

<img src="/assets/img/NextJSAuthenticationwithNextAuthPrismaandPostgres_0.png" />

애플리케이션을 안전하고 신뢰할 수 있는 방법으로 구축할 때 인증은 매우 중요합니다. 때로는 간과되기 쉬우나 애플리케이션을 안전하게 유지하기 위해서는 권한이 있는 사용자만 액세스할 수 있도록 보장해야 합니다.

애플리케이션의 사용자는 다양한 방법으로 인증될 수 있습니다. NextAuth를 사용하면 Next.js 애플리케이션에 인증을 쉽게 추가할 수 있는 강력한 패키지입니다. 이 글에서는 Next.js 앱의 인증에 중점을 두어 설명하겠습니다. NextAuth를 통해 Google, AWS Cognito, Facebook, 자격 증명 제공자(사용자 이름, 암호) 등 NextAuth의 다양한 인증 제공자를 사용하여 인증을 관리할 수 있습니다. 이 글에서는 사용자 이름, 이메일 주소, 암호와 같은 자격 증명을 사용한 방법에 초점을 맞추겠습니다.

본 자습서에서는 NextAuth를 사용하여 Prisma(Node.js 및 TypeScript ORM)와 PostgreSQL을 이용해 사용자를 인증하는 방법을 안내합니다. 이 가이드를 읽으면 Next.js 앱을 생성하고 사용자를 인증할 수 있습니다.

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

시작해봅시다.

우리는 다음 주제들을 단계적으로 다룰 거에요.

- create next-app을 이용하여 Next.js 프로젝트 설정
- Postgres 데이터베이스 설정 (선택사항: Supabase에서 호스팅)
- Prisma ORM을 사용하여 앱을 PostgreSQL 데이터베이스에 연결
- 로그인 및 가입을 위한 엔드포인트 생성
- 회원가입 및 로그인 페이지 작성 및 구현

## Next.js 프로젝트 설정

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

Next.js 프로젝트를 설정하려면 작업 디렉토리로 이동한 다음 터미널을 열고 아래 명령을 실행하세요. 저희는 앱을 authapp이라고 부를 건데, 이는 선택 사항이에요. 마음에 드는 이름을 원하시면 아무 이름으로 하셔도 돼요.

```bash
yarn create next-app authapp
```

페이지 스타일링을 위해 Tailwind CSS를 사용할 거예요. 프로젝트에 Tailwind CSS를 설정하려면 공식 Tailwind CSS 문서를 따라가세요.

## Supabase에서 호스팅된 PostgreSQL 데이터베이스를 설정(선택 사항)

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

Supabase는 Firebase 대안으로 제공되는 플랫폼으로, Postgres 데이터베이스, 인증, 저장소 등 다양한 기능을 제공합니다. 서버를 관리할 필요없이 프로젝트를 생성하고 데이터베이스를 구성할 수 있습니다.

자, 데이터베이스를 구성해 봅시다.

Supabase에 계정을 만듭니다.

로그인한 상태에서 새 프로젝트를 선택하여 새 프로젝트를 시작합니다. 프로젝트 이름을 제공하고 데이터베이스 비밀번호를 설정하세요.

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

<img src="/assets/img/NextJSAuthenticationwithNextAuthPrismaandPostgres_1.png" />

데이터베이스 URI를 얻으려면 프로젝트 설정으로 이동한 다음 데이터베이스를 클릭하여 아래에서 볼 수 있는 데이터베이스 URI를 복사하세요. URI에서 [YOUR PASSWORD]를 이전에 설정한 데이터베이스 비밀번호로 바꿔주세요.

<img src="/assets/img/NextJSAuthenticationwithNextAuthPrismaandPostgres_2.png" />

PostgreSQL 데이터베이스 서버가 성공적으로 생성되었습니다.

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

## Prisma ORM을 사용하여 우리의 애플리케이션을 Postgres 데이터베이스에 연결하는 방법

이제 이전에 생성한 데이터베이스와 프로젝트를 연결해 봅시다. 다음을 진행해 보세요.

프로젝트 루트 디렉토리로 이동하고 아래 명령을 사용하여 Prisma CLI를 설치해 보세요.

```bash
npm install prisma --save-dev
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

이제 Prisma CLI 명령을 사용하여 Prisma 설정을 설정해보세요.

npx prisma init

이 명령은 프로젝트 디렉토리에 두 개의 파일을 생성합니다.

- schema.prisma: 데이터베이스 스키마가 포함된 파일입니다.
- .env: 데이터베이스 연결 URI 및 응용 프로그램의 다른 환경 변수를 정의하는 dotenv 파일입니다.

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

.env 파일을 열고 앞에서 설정한 데이터베이스 연결 URI를 추가하세요.
DATABASE_URL=`postgresql://postgres:[YOUR-PASSWORD]@db.ObubJTKrJYcPSkdsWqms.supabase.co:5432/postgres`

다음 단계는 Prisma를 사용하여 데이터베이스 스키마를 생성하는 것입니다. schema.prisma 파일을 열고 아래 내용을 추가하세요.

```js
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  password      String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}
```

참고: 원하는대로 사용자에 대한 더 많은 정보를 캡처하기 위해 필드를 추가할 수 있습니다. 여기 스키마 가이드라인을 따르는지 확인해주세요.

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

이제 데이터베이스를 구성했으니, 해당 데이터베이스에 테이블을 만들 수 있습니다. 이를 위해서는 다음 명령을 사용합니다.

npx prisma db push

아래와 같은 결과를 보게 될 것입니다;

<img src="/assets/img/NextJSAuthenticationwithNextAuthPrismaandPostgres_3.png" />

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

이 경우에는 User 테이블 하나만 있는데, 이 테이블은 User 모델에 정의된 사용자 정보를 저장할 것입니다. 테이블을 생성한 후에는 Prisma 클라이언트를 사용하여 데이터베이스와 상호 작용을 시작할 수 있습니다.

다음 단계는 Prisma 클라이언트 라이브러리를 설치하는 것입니다. 이 라이브러리를 사용하여 데이터베이스와 상호 작용할 수 있습니다. 라이브러리가 설치되면 Prisma 클라이언트 객체의 단일 인스턴스를 생성할 수 있습니다. 이 객체는 애플리케이션 전체에서 데이터베이스와 상호 작용하는 데 사용될 것입니다.

mkdir lib && touch lib/prisma.js

스키마를 업데이트할 때마다 Prisma 클라이언트를 업데이트하려면 다음 내용이 필요합니다.

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

안녕하세요! 아래의 코드는 Prisma 클라이언트 객체의 새 인스턴스를 생성하고 해당 파일에서 내보낼 것입니다.

```js
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };
```

위의 코드를 사용하여 lib 디렉토리로 이동한 다음 prisma.js 파일을 열어서 위의 코드를 추가해주세요.

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

프로젝트와 데이터베이스를 성공적으로 연결했습니다.

## 로그인 및 가입을 위한 엔드포인트 생성

pages/api/user 폴더에 두 개의 파일을 생성하세요.

- create.js: 새 사용자를 생성하기 위한 엔드포인트입니다.
- auth.js: 사용자 로그인을 위한 엔드포인트입니다.

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

create.js 파일을 열고 아래 코드를 추가해주세요.

프로젝트를 데이터베이스에 성공적으로 연결했습니다.

```js
import { SHA256 as sha256 } from "crypto-js";
// 우리의 Prisma 클라이언트를 가져옵니다
import prisma from "../lib/prisma";
// Prisma는 오류를 처리하고 잡는 데 도움이 됩니다
import { Prisma } from "@prisma/client";
export default async function handle(req, res) {
  if (req.method === "POST") {
    // 사용자 생성
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "허용되지 않은 메소드" });
  }
}
// crypto.js를 사용하여 사용자가 입력한 암호를 해싱합니다
export const hashPassword = (string) => {
  return sha256(string).toString();
};
// 데이터베이스에 사용자 생성하는 함수
async function createUserHandler(req, res) {
  let errors = [];
  const { name, email, password } = req.body;

  if (password.length < 6) {
    errors.push("암호 길이는 6자 이상이어야 합니다");
    return res.status(400).json({ errors });
  }
  try {
    const user = await prisma.user.create({
      data: { ...req.body, password: hashPassword(req.body.password) },
    });
    return res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}
```

위 코드는 다음과 같은 속성을 가진 새로운 사용자를 데이터베이스에 생성합니다.

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

- 이름
- 이메일
- 비밀번호

비밀번호 해싱에 사용하는 crypto-js를 설치해 주세요. 아래 명령어를 사용하세요.

npm install crypto-js

다음으로 로그인 엔드포인트를 생성합니다. api/user/auth.js 파일을 열고 아래 코드를 추가해주세요.

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

```js
import { SHA256 as sha256 } from "crypto-js";
// prisma client 불러오기
import prisma from "./lib/prisma";
import hashPassword from "./create";
export default async function handle(req, res) {
  if (req.method === "POST") {
    // 사용자 로그인
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}
async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "유효하지 않은 입력" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
      },
    });
    if (user && user.password === hashPassword(password)) {
      // 응답에서 비밀번호 제외
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "유효하지 않은 자격 증명" });
    }
  } catch (e) {
    throw new Error(e);
  }
}
// prisma로부터 반환된 사용자 비밀번호를 제외하는 함수
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
```

인증 엔드포인트를 만들었으므로 이제 우리 응용 프로그램에 CredentialsProvider를 추가하겠습니다.

pages/api/auth 폴더에 [...nextauth].js라는 파일을 만듭니다. 이 파일에서는 이 경우 CredentialsProvider인 인증 제공 업체를 구성할 것입니다. CredentialsProvider는 NextAuth 제공 업체로 사용자가 사용자 이름과 비밀번호와 같은 임의의 자격 증명으로 등록할 수 있게 합니다.

[...nextauth].js 파일을 열고 다음 코드를 추가하세요.

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

큰 영향을 미치는 작업은 아니지만 HTML에서 table 태그를 Markdown 형식으로 바꾸면 더 읽기 쉽고 편리합니다.

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

Register.js.

```js
import React, { useEffect, useState } from "react";

function SignIn() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  function validatePassword(pass, confirmPass) {
    let isValid = confirmPass === pass;
    if (!isValid) {
      setPassError(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };

    // 백엔드 호출하여 사용자 생성
    const res = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      // 등록 성공
    } else {
      // 등록 실패
    }
  }
  return (
      <div className="flex justify-center items-center m-auto p-3">
        <form
          onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name"  >
              이름
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="name" type="text" laceholder="이름"
              onChange={(e) => {
                setName(e.target.value);
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="email"  >
              이메일
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}  id="email" type="email" placeholder="이메일"
              onChange={(e) => {
                setEmail(e.target.value);
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >
              비밀번호
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password"  placeholder="***********"
              onChange={(e) => {
                setPassword(e.target.value);
              }
            />
          </div>
          <div className="mb-6">
            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password"   >
              비밀번호 확인
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="confirm-password"  type="password" placeholder="***********"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }
            />
            {passError && (
              <p className="text-red-500 text-xs italic">
                비밀번호가 일치하지 않습니다!
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline" type="submit" >
              가입하기
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" >
              계정이 있으신가요? 로그인하기
            </a>
          </div>
        </form>
      </div>
  );
}

export default SignIn;
```

Login.js

```js
import React, { useEffect, useState } from "react";
import { validateEmail } from "../../lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validate();
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
      redirect: false,
    });

    if (res?.ok) {
      // 토스트 성공
      console.log("성공");
      return;
    } else {
      // 토스트 실패
      setError("실패! 입력을 확인하고 다시 시도하세요.");
      // return;
      console.log("실패", res);
    }
    return res;
  }

  function validate() {
    let emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      setEmailInputError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordInputError(true);
    } else {
      setEmailInputError(false);
      setPasswordInputError(false);
    }
  }
  return (
      <div className="flex justify-center items-center m-auto p-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className={`border-${
                emailInPutError ? "red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="text"
              placeholder="이메일"
              onChange={(e) => {
                setEmail(e.target.value);
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className={` border-${
                passwordInPutError ? "red-500" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                setPassword(e.target.value);
              }
            />
            <p className="text-red-500 text-xs italic">
              비밀번호를 선택해주세요.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "로딩중..." : "로그인"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>
      </div>
  );
}

export default LoginPage;
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

## 마무리하며

Next.js를 사용하면 모든 기능을 갖춘 풀스택 애플리케이션을 만들 수 있습니다. NextAuth 라이브러리를 사용하여 애플리케이션의 사용자 인증을 쉽게 처리할 수 있습니다. NextAuth를 사용할 때 다양한 인증 제공업체를 사용할 수 있습니다. 앱에 적합한 것을 선택하여 사용해보세요.

다음으로는 NextAuth AWS Cognito 인증 제공자를 사용하는 방법에 대해 알아보겠습니다. 기대해주세요.

GitHub 저장소 링크: [github](github)

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

더 많은 내용을 보려면 팔로우해 주세요. 코딩을 즐기세요!
