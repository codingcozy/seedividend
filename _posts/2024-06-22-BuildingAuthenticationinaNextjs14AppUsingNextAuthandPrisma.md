---
title: "Nextjs 14 앱에서 NextAuth와 Prisma로 인증 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildingAuthenticationinaNextjs14AppUsingNextAuthandPrisma_0.png"
date: 2024-06-22 03:25
ogImage: 
  url: /assets/img/2024-06-22-BuildingAuthenticationinaNextjs14AppUsingNextAuthandPrisma_0.png
tag: Tech
originalTitle: "Building Authentication in a Next.js 14 App Using NextAuth and Prisma."
link: "https://medium.com/@pawanrijal/building-authentication-in-a-next-js-14-app-using-nextauth-and-prisma-59c9d67a0eca"
---


<img src="/assets/img/2024-06-22-BuildingAuthenticationinaNextjs14AppUsingNextAuthandPrisma_0.png" />

안녕하세요! 이번 튜토리얼에서는 NextJS 앱에 인증을 추가하는 방법을 Next Auth를 사용하여 보여드릴 거에요. 저는 NextJS 애플리케이션을 실행하기 위해 런타임으로 bun을 사용할 거에요.

Step I : Next 14 프로젝트 설정하기

```js
bunx create-next-app@latest next-auth-prisma
```

<div class="content-ad"></div>

위의 명령어를 입력하시거나 프로젝트 설정을 위해 NextJS의 공식 문서를 참고하시면 됩니다.

단계 II: NextAuth API route 설정

Next 앱을 설치한 후에는 다음 명령어를 통해 앱 안에 next-auth 패키지를 설치해야 합니다.

```js
bun add next-auth
```

<div class="content-ad"></div>

이제 다음 인증에 사용할 인증 옵션을 구성해야 합니다. 기본 폴더로 이동하여 lib라는 새 폴더를 만들고 lib 폴더 안에 auth.ts라는 새 파일을 만들고 다음 코드를 복사하세요.

/lib/auth.ts

```js
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        return user;
      },
    }),
  ],
};
```

위 코드는 다음 인증 구성 설정 프로세스를 보여줍니다. 저는 next-auth에서 CredentialsProvider를 사용했지만 Google, Github, Facebook 등의 다른 프로바이더를 사용할 수 있습니다. 이러한 프로바이더를 구현하려면 해당 프로바이더의 구성에 대해 공식 문서를 참조하세요.

<div class="content-ad"></div>

지금 자격 증명 객체에는 로그인 양식에 표시되는 이메일과 비밀번호가 필드로 포함되어 있습니다. 인증 단계에는 목업 사용자 객체를 반환하는 더미 자격 증명이 있습니다.

다음 단계는 NextAuth에서 인증 요청을 처리하는 API 경로를 생성하는 것입니다. 시작하려면 앱 디렉토리 내에 api라는 새 폴더를 만들고 그 안에 auth라는 새 폴더를 만들어주시고 auth 내부에 catch-all-routes 폴더 [...nextauth]을 만든 다음 auth 폴더 내에 route.ts라는 이름의 파일을 만들어주시고 다음 코드를 붙여넣어주세요.

/app/api/auth/[…nextauth]/route.ts

```js
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

<div class="content-ad"></div>

프렌들리하게 번역하면 다음과 같습니다:

우리는 이전에 NextAuth 함수 안에서 미리 구성한 authOptions를 가져왔고, next auth 핸들러를 내보냈습니다.

3단계: 버튼 만들기

애플리케이션의 페이지 간 이동을 쉽게 하기 위해 브라우저에 수동으로 URL을 입력하는 대신 버튼을 만들겠습니다. 기본 폴더 내에 components라는 새 폴더를 만들고 buttons.component.tsx라는 파일을 생성하세요.

/components/buttons.component.tsx

<div class="content-ad"></div>

```js
"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button style={ marginRight: 10 } onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={ marginRight: 10 }>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={ marginRight: 10 } onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
```

이제 홈 컴포넌트에서 버튼들을 import하세요.

```js
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  );
}
```

이제 NextAuth에서 JWT 인증을 추가해야 하므로 프로젝트의 루트 디렉토리 내 .env 파일에 JWT의 시크릿을 정의해야 합니다.


<div class="content-ad"></div>

```yaml
#.env

NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000

이제 http://localhost:3000/를 방문하여 애플리케이션에 액세스하고 홈페이지에서 클릭하여 로그인 버튼을 누르면 로그인 양식으로 이동합니다.

![이미지](/assets/img/2024-06-22-BuildingAuthenticationinaNextjs14AppUsingNextAuthandPrisma_1.png)
```

<div class="content-ad"></div>

We have mock credentials, so feel free to use any email and password to submit the form. Once the submission is successful, you will be redirected back to the home page. At that point, you can view the application's cookies.

![Cookie Image](/assets/img/2024-06-22-BuildingAuthenticationinaNextjs14AppUsingNextAuthandPrisma_2.png)

Step IV: Integrating with database

For real-world users, we need to connect to a database. I will be using PostgreSQL as the database and Prisma as the ORM.

<div class="content-ad"></div>

새 데이터베이스를 생성하고 데이터베이스 URL을 .env 파일에 넣으세요

```js
DATABASE_URL=postgresql://postgres:pawan123@localhost:5432/next-auth?schema=public
```

이제 다음 명령어를 사용하여 prisma ORM과 bcryptjs를 설치하여 사용자 비밀번호를 해싱하세요.

```js
npm add @prisma/client bcryptjs && npm add -D ts-node prisma @types/bcryptjs
```

<div class="content-ad"></div>

프리즈마를 설정하고 포스트그리스 데이터베이스에 연결하려면 다음 명령을 실행하여 프로젝트에서 프리즈마를 초기화하고 포스트그레스SQL용 데이터 소스를 만드세요.

```js
npx prisma init --datasource-provider postgresql
```

이제 schema.prisma 파일 내에 User 모델을 만들어보세요.

```js
// 이것은 당신의 프리즈마 스키마 파일입니다.
// 자세한 내용은 다음 문서에서 확인하세요: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       String @id @default(uuid())
  name     String
  email    String @unique
  password String
}
```

<div class="content-ad"></div>

이제 새 사용자를 생성하고 데이터베이스에 저장하는 등록 기능을 만들 수 있지만, 나는 직접 데이터베이스에 사용자를 입력할 것이다. 시작하려면 prisma 디렉토리에 seed.ts 파일을 만들고 아래 코드를 복사해 넣어라.

prisma/seed.ts

```js
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

쉽게 테스트 사용자로 데이터베이스에 시드(seed)를 생성할 수 있도록 하기 위해 package.json 파일에 스크립트를 추가할 것이다. 파일을 열어 다음 스크립트를 추가하라:

<div class="content-ad"></div>

```json
{
    "prisma": {
        "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    }
}
```

이제 다음 명령을 사용하여 마이그레이션을 생성하고 사용자 스키마를 데이터베이스에 푸시하세요.

```js
npx prisma migrate dev --name init
```

마이그레이션을 생성한 후 다음 명령을 사용하여 데이터베이스에 사용자를 시드하세요.

<div class="content-ad"></div>

```js
npx prisma db seed
```

이제 PostgreSQL 데이터베이스와 통신할 수 있도록 @prisma/client 패키지를 사용하여 전역 PrismaClient 인스턴스를 생성할 것입니다. 이를 위해 lib 폴더 안에 prisma.ts라는 파일을 만들고 다음 코드를 추가해주세요.

```js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

Prisma와 데이터베이스 설정을 완료했으니, 이제 auth.ts 파일에서 로그인 양식을 인증할 것입니다.

<div class="content-ad"></div>

```js
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "로그인",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "일부 랜덤 키",
        };
      },
    }),
  ],
};
```

이제 사용자 정의 키를 추가할 수 있습니다. 다음은 NextAuth 구성의 콜백 속성에서 콜백을 수정하는 방법입니다. 이렇게 하면 세션 개체와 JWT에 필요한 정보를 포함시킬 수 있으며 응용 프로그램에 언제든지 어디서나 액세스할 수 있습니다.

```js
callbacks: {
    session: ({ session, token }) => {
      console.log("세션 콜백", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT 콜백", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
```

Step V: NextAuth 세션 데이터 가져오기


<div class="content-ad"></div>

next 앱 내에서 권한이 부여된 사용자 세션 데이터를 얻는 두 가지 방법이 있습니다.

i. 서버 컴포넌트에서

서버 컴포넌트 내에서 세션 데이터를 가져오기 위해 getServerSession 함수를 사용할 수 있습니다.

```js
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </main>
  );
}
```

<div class="content-ad"></div>

서버 페이지를 무단 사용자로부터 보호하기 위해 미인가 사용자를 signin 페이지로 리다이렉트하는 다음 코드를 사용할 수 있습니다.

```js
if (!session) {
    redirect("/api/auth/signin");
}
```

ii. 클라이언트 컴포넌트

클라이언트 컴포넌트에서 세션 데이터를 검색하려면 next auth에서 제공하는 세션 제공자를 사용하고 앱을 세션 제공자로 래핑해야 합니다.

<div class="content-ad"></div>

기본 디렉토리에 providers 폴더를 만들고, NextAuthProvider.tsx라는 새 파일을 생성한 다음 아래 코드를 붙여넣어주세요.

```js
"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```

이제 layout.tsx 파일에서 프로바이더를 감싸주세요.

```js
import { NextAuthProvider } from "./providers/NextAuthProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
```

<div class="content-ad"></div>

이제 세션 데이터를 가져오는 클라이언트 컴포넌트를 생성해보세요.

```js
"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};
```

이제 권한이 없는 사용자로부터 클라이언트 컴포넌트를 보호하기 위해 아래 코드를 클라이언트 컴포넌트에 붙여넣어주세요.

```js
const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }
```

<div class="content-ad"></div>

결론

이 튜토리얼에서는 NextAuth를 새로운 Next.js 14 앱에 통합하는 방법에 대해 배웠습니다. 이 글이 유익하고 즐거웠기를 바랍니다. 피드백이나 질문이 있으면 언제든 댓글을 남겨주세요.