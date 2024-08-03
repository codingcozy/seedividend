---
title: "Nextjs 14에서 NextAuth의 Credential provider를 사용한 앱 라우터 인증 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Authentication in Nextjs 14 App Router using NextAuth with Credential provider"
link: "https://medium.com/@julispitangso/authentication-in-next-js-14-app-router-using-nextauth-with-credential-provider-c6c6e64433de"
---



![이미지](/assets/img/AuthenticationinNextjs14AppRouterusingNextAuthwithCredentialprovider_0.png)

NextAuth.js가 뭔가요?

NextAuth는 Next.js를 위한 인기 있는 인증 라이브러리입니다. 간단하고 유연하며 안전합니다. 이 튜토리얼에서는 NextAuth를 사용하여 사용자 이름과 비밀번호 인증을 설정하는 방법을 보여드리겠습니다.

의존성 설치

<div class="content-ad"></div>

시작하기 전에 이 튜토리얼을 위해 몇 가지 종속성을 설치해 봅시다.

```js
npm install next-auth
```

유저를 인증하기 위한 서버 서비스 생성하기

유저를 인증하는 서버 함수를 생성하겠습니다. 유저를 찾았을 때에는 유저의 상세정보를 반환할 것입니다. 유저를 찾지 못했거나 비밀번호가 일치하지 않을 때에는 null을 반환할 것입니다. 왜 에러 메시지 대신에 일치하지 않는 비밀번호라고 null을 반환하는지 궁금하실 수도 있습니다. 사용자가 비밀번호를 추측하는 것을 방지하기 위해서입니다.

<div class="content-ad"></div>

```js
// /src/server/services/userService.ts

export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (username !== "admin" && password !== "admin") {
    //(1)
    return null; //(2)
  }

  const user = {
    id: "9001",
    name: "Web Admin",
    email: "admin@example.com",
  }; //(3)

  return user; //(4)
}
```

설명:

- 이 간단한 튜토리얼을 위해 사용자 이름과 비밀번호를 'admin'으로 하드코딩했습니다. 나중에는 데이터베이스에서 조회하거나 외부 API에서 가져오도록 변경해야 합니다.
- 사용자가 인증되지 않았을 경우 null을 반환하며, UI에 오류를 표시하고 사용자에게 어떤 정보가 잘못되었는지 알려주지 않고 세부 정보를 확인할 수 있도록 합니다.
- 사용자가 인증되었다고 가정하고, 사용자 객체를 생성하고 세부 정보를 채워서 반환합니다.

<div class="content-ad"></div>

```js
//src/server/auth.ts

import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "node_modules/next-auth/providers/credentials";
import { userService } from "./services/userService";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if(account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: '/login', //(4) custom signin page path
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
         const { username, password } = credentials as {
          username: string
          password: string
         };

        return userService.authenticate(username, password); //(5)
      }
    })
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
```

- Credentials 프로바이더는 JSON Web Tokens이 활성화된 상태에서만 사용할 수 있습니다.
- 여기서는 사용자 Id를 User 객체에 저장하고 싶습니다. Id는 "credentials" 타입일 때 authorize 콜백에서 제공되며 account 매개변수에 사용 가능합니다. 이 섹션에서는 토큰에 데이터베이스나 외부 API에서 추가 정보를 추가할 수도 있습니다.
- jwt 콜백에서 토큰이 생성된 후, userId를 user.id로 전달하여 UI에서 사용할 수 있도록 설정해야 합니다. User 타입은 name, email 및 image만 포함되어 있으므로 나중에 User 객체에 id를 추가하도록 타입 정의를 만들 것입니다.
- 우리는 사용자 정의 로그인 페이지도 생성했으므로 해당 페이지가 위치한 경로를 정의해야 합니다.
- 여기서는 이전에 생성한 서비스를 사용하여 사용자 이름과 비밀번호를 인증합니다.
- 세션을 가져올 때 authOptions를 다시 가져오지 않아도 되도록 하는 도우미 기능을 만들었습니다.

타입 생성

Typescript 인텔리센스가 User 타입에 id 속성이 있다는 것을 알 수 있도록 next-auth 모듈 변경을 추가하십시오.

<div class="content-ad"></div>

```js
//src/types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
```

```js
// /src/types/user.ts

export type User = {
  id?: string | null,
  name?: string | null,
  email?: string | null,
};
```

NextAuth.js api 핸들러를 만들기

NextAuth.js가 모든 요청을 /api/auth/\*로 처리할 수 있도록 동적 라우트 핸들러를 만듭니다

<div class="content-ad"></div>

```js
// /src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";

import { authOptions } from "@/server/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

페이지 생성하기

이제 루트 페이지에 현재 사용자 세션 및 로그인 및 로그아웃 버튼을 표시하는 간단한 페이지를 만들 것입니다.

```js
//src/app/page.tsx

import UserInfo from "@/components/UserInfo";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function HomePage() {
  const authSession = await getServerAuthSession(); //(1)

  return (
    <main className="flex items-center justify-center h-screen">
      {authSession?.user && <UserInfo user={authSession?.user} />} //(2)
      {!authSession?.user && ( //(3)
        <Link
          className="font-medium mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          로그인
        </Link>
      )}
    </main>
  );
}
```

<div class="content-ad"></div>

- 기본적으로 이는 서버 구성 요소이기 때문에 이 서버 함수를 직접 사용할 수 있습니다. 이 함수는 서버에서 세션 객체를 가져오는 데 사용됩니다.
- 세션의 사용자 객체가 있는 경우 UserInfo 컴포넌트를 렌더링합니다.
- 세션에 사용자 객체가 없는 경우 (로그인되지 않은 경우) 로그인 페이지로의 링크를 렌더링합니다.

그 다음으로 클라이언트용 UserInfo 컴포넌트를 만들어 사용자 정보와 로그아웃 버튼을 렌더링합니다.

```js
// /src/components/UserInfo.tsx

"use client";

import { User } from "@/types/user";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: User,
};

export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="rounded-lg border shadow-lg p-10">
      <div>Id : {user.id}</div>
      <div>Name : {user.name}</div>
      <div>Email : {user.email}</div>
      <button
        className="font-medium mt-2 text-blue-600 hover:underline"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}
```

마지막으로 로그인 페이지를 생성합니다.

<div class="content-ad"></div>

```js
// /src/app/login/page.tsx

"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

type LoginInput = {
  username: string,
  password: string,
};

type PageProps = {
  searchParams: { error?: string },
};

export default function LoginPage({ searchParams }: PageProps) {
  const [inputs, setInputs] =
    useState < LoginInput > { username: "", password: "" };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      username: inputs.username,
      password: inputs.password,
      callbackUrl: "/",
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  value={inputs.username || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {searchParams.error && (
              <p className="text-red-600 text-center capitalize">
                Login failed.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
```

그것이 모두입니다. 이제 Next.js 14 (앱 라우터)에서 NextAuth.js 라이브러리를 사용하여 자격 증명 제공자를 사용한 인증을 만들었습니다. 도움이 되었으면 좋겠네요. 감사합니다.

소스 코드를 확인하세요.

참고 자료 :
https://github.com/nextauthjs/next-auth-example/tree/main
https://create.t3.gg/en/usage/next-auth
https://next-auth.js.org/configuration/providers/credentials
https://orm.drizzle.team/kit-docs/overview




