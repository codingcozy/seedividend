---
title: "Nextjs 13에서 NextAuth와 구글 및 자격 증명 제공자 설정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Setup Guide for NextAuth with Google and Credentials Providers in Nextjs 13"
link: "https://medium.com/@karthickragavendran/setup-guide-for-nextauth-with-google-and-credentials-providers-in-next-js-13-8f5f13414c1e"
---



이 가이드는 Next.js 13 (앱 디렉토리) 애플리케이션에 NextAuth를 통합하기 위한 간결한 단계를 제공합니다. 구글 및 자격 증명 제공자를 사용하여 인증을 수행합니다. 목표는 Next.js 프로젝트에서 구글 로그인과 전통적인 이메일/비밀번호 인증을 모두 활성화하는 것입니다. 설정 프로세스에 대해 알아보고, 구현 및 코드 예제에 초점을 맞춥니다.

![이미지](/assets/img/SetupGuideforNextAuthwithGoogleandCredentialsProvidersinNextjs13_0.png)

# 전제 조건

시작하기 전에 다음 사항이 있는지 확인하세요:

<div class="content-ad"></div>

- App 디렉터리가 활성화된 Next.js 13 프로젝트 설정.
- OAuth 자격 증명을 얻기 위한 Google Cloud 계정.

Google OAuth 자격 증명을 얻으려면:

- Google Cloud 콘솔로 이동합니다.
- 새 프로젝트를 만들거나 기존 프로젝트를 선택합니다.
- 'API 및 서비스' > '자격 증명'으로 이동합니다.
- '자격 증명 생성'을 클릭하고 'OAuth 클라이언트 ID'를 선택합니다.
- 동의 화면을 설정하고 애플리케이션 유형으로 '웹 애플리케이션'을 선택합니다.
- 로컬 개발 환경을 위해 일반적으로 http://localhost:3000/api/auth/callback/google을 '인증된 리디렉션 URI'에 추가합니다.
- 생성되면 클라이언트 ID 및 클라이언트 비밀번호를 얻게 됩니다.

# NextAuth 설치

<div class="content-ad"></div>

먼저, Next.js 프로젝트에 NextAuth를 설치해주세요:

```js
npm install next-auth
```

다음으로, authOptions 파일에서 기본 구조를 구성해주세요. 아래 코드를 사용하세요:

```js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
```

<div class="content-ad"></div>

```js
export const authOptions = {
  // 다음 단계에서 공급자 배열을 구성할 것입니다
  providers: [],
  session: {
    strategy: "jwt",
  },
  // 여기에 추가 구성이 추가될 것입니다
};
export const getAuth = () => getServerSession(authOptions);
```

이 코드는 providers에 빈 배열을 설정하여 NextAuth를 구성하며, 해당 배열은 다음 단계에서 채워지고 세션 관리에 JWT를 지정합니다. getAuth 함수는 서버 측 세션 검색을 위한 것입니다.

# Google 공급자 구성

Google 인증을 통합하려면 authOptions의 providers 배열을 업데이트하세요:

<div class="content-ad"></div>

```js
import GoogleProvider from "next-auth/providers/google";
```

```js
// ... 다른 import문
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ... 다른 프로바이더
  ],
  // ... 다른 설정
};
```

이 설정에서:

- clientId와 clientSecret는 Google Cloud Console에서 얻은 OAuth 자격 증명입니다.
- 보안을 위해 이러한 자격 증명을 환경 변수(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)에 저장하세요.

<div class="content-ad"></div>

# 5. 자격 증명 제공자 설정하기

이메일/비밀번호 인증을 위해 자격 증명 제공자를 추가하세요:

```js
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
```

```js
// ... 다른 import들
export const authOptions = {
  providers: [
    // ... GoogleProvider 설정
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        // 여기서 자격 증명을 확인하는 로직 추가
        if (!credentials) return null;
        const { email, password } = credentials;
        // 사용자와 비밀번호 해시를 데이터베이스에서 가져옴
        // 예: const user = await getUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          throw new Error("유효하지 않은 자격 증명");
        }
      },
    }),
  ],
  // ... 다른 설정들
};
```

<div class="content-ad"></div>

주요 사항:

- 이메일과 비밀번호 필드로 자격 증명을 정의합니다.
- 사용자 자격 증명을 확인하는 authorize 함수를 구현합니다.
- 데이터베이스에서 사용자의 해시화된 비밀번호를 가져옵니다.
- 제공된 비밀번호를 저장된 해시와 비교하기 위해 bcrypt를 사용합니다.
- 유효한 경우 사용자 객체를 반환하고, 그렇지 않으면 오류를 throw합니다.

이 설정을 통해 사용자들이 이메일과 비밀번호로 로그인할 수 있게 되며, Google 프로바이더를 통해 Google 계정으로 로그인할 수 있습니다. 다음 섹션에서는 이것들을 Next.js 애플리케이션 라우트에 통합하고 사용자 세션을 관리하는 방법에 대해 다룰 것입니다.

# NextAuth의 authOptions 상세 분석

<div class="content-ad"></div>

이authOptions 구조와 그 구성 요소를 자세히 살펴보겠습니다:

```js
export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider 및 CredentialsProvider 구성
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1일
  },
  jwt: {
    // JWT 인코딩 및 디코딩 구성
  },
  callbacks: {
    // signIn, 세션 콜백
  },
  pages: {
    signIn: "/signIn", // 사용자 정의 로그인 페이지
  },
};
```

이 설정에서:

- providers 배열은 Google 및 Credentials 공급자를 포함합니다.
- session은 JWT 세션 관리를 구성합니다.
- jwt는 JWT 토큰의 인코딩 및 디코딩을 처리합니다.
- callbacks는 signIn 및 세션 이벤트의 사용자 정의 처리를 허용합니다.
- pages는 로그인을 위한 사용자 정의 페이지를 지정할 수 있습니다.

<div class="content-ad"></div>

# 인증 루트

다음으로, Next.js 애플리케이션에서 인증 루트를 설정하세요. 이는 인증 요청을 처리하는 API 루트를 생성하는 것을 포함합니다:

```js
// src/app/api/auth/[...nextauth]/route.ts
```

```js
import { authOptions } from "@foundation/common/src/authOptions";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

<div class="content-ad"></div>

위 코드에서:

- NextAuth 및 authOptions를 가져옵니다.
- NextAuth(authOptions)를 사용하여 핸들러를 만듭니다.
- /api/auth/\*에서 GET 및 POST 요청을 처리하기 위해 핸들러를 기본 내보내기로 내보냅니다.

이러한 경로들은 authOptions 설정과 함께 작동하여 사용자 인증을 처리합니다. 사용자가 로그인을 시도하거나 인증 시스템과 상호 작용하려고 할 때, 이러한 API 경로는 설정에 따라 요청을 처리합니다.

인증된 사용자에게 생성된 토큰을 반환하는 경로를 가질 수 있습니다.

<div class="content-ad"></div>

```js
// src/app/api/auth/token/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
  const getCookies = cookies();
  const nextAuthSession =
    getCookies.get("next-auth.session-token")?.value || "";

  return NextResponse.json(nextAuthSession);
}
```

# 플로우

사용자는 Google 또는 이메일/비밀번호 인증 중 선택으로 시작됩니다. Google 인증을 선택한 경우 사용자는 Google로 이동한 후 다시 돌아오고, 이메일/비밀번호를 선택한 경우 자격 증명은 권한 부여 함수를 통해 확인됩니다. 이 프로세스는 유효한 자격 증명만 액세스를 부여하도록 보장하며, 성공적인 인증 후 사용자의 세션은 생성되어 이후 애플리케이션 사용을 위해 관리됩니다.

```js
|
|-- 사용자가 인증 시작
|   |-- Google 제공업체를 통해
|   |   `-- Google로 리다이렉션 -> 사용자 인증 -> 애플리케이션으로 리다이렉션
|   |
|   `-- 자격 증명 제공자를 통해
|       `-- 사용자가 이메일 및 비밀번호 입력
|           `-- 권한 부여 함수
|               |-- 유효한 경우: 사용자 인증됨
|               `-- 부적절한 경우: 오류 반환
|
|-- 인증 후
|   `-- signIn 콜백 실행
|
|-- 세션 생성 및 관리
|   `-- 세션 콜백이 세션 정보를 업데이트
|
`-- 사용자 액세스
    `-- 사용자가 완전히 인증되어 애플리케이션에 액세스
```

<div class="content-ad"></div>

# UI 구성 요소

SignIn 컴포넌트는 사용자가 인증 시스템과 상호 작용하는 주요 인터페이스 요소입니다. 이 컴포넌트는 사용자의 이메일과 비밀번호를 다루기 위해 폼 관리를 사용하며 Google로 로그인할 수 있는 옵션을 제공합니다.

```js
// signIn.tsx
export const SignIn = () => {
  const { register, handleSubmit } = useFormSignin();

  return (
    <AuthLayout title="로그인">
      <form
        onSubmit={handleSubmit(({ email, password }) =>
          signIn("credentials", { email, password })
        )}
      >
        <Label title="이메일">
          <Input {...register("email")} placeholder="이메일" />
        </Label>
        <Label title="비밀번호">
          <Input
            {...register("password")}
            type="password"
            placeholder="비밀번호"
          />
        </Label>
        <Button type="submit">제출</Button>
      </form>

      <Link href="/register">회원 가입</Link>

      <button onClick={() => signIn("google")}>Google로 로그인</button>
    </AuthLayout>
  );
};
```

```js
// register.tsx

export const Register = () => {
  const { register, handleSubmit } = useFormRegister();

  return (
    <AuthLayout title="회원 가입">
      <form
        onSubmit={handleSubmit(async ({ email, password, name }) => {
          // 백엔드 회원 가입 호출
          const user = await fetchGraphQL({
            document: CreateUserWithCredentialsDocument,
            variables: { email, password, name },
          });

          // 회원 가입 응답 처리
          if (user.error) {
            toast({ title: user.error });
          } else if (user.data) {
            toast({ title: `사용자가 생성되었습니다. 🎉` });
            signIn("credentials", { email, password, callbackUrl: "/" });
          }
        })}
      >
        <Input {...register("email")} placeholder="이메일" />
        <Input {...register("password")} type="password" placeholder="••••••" />
        <Input {...register("name")} placeholder="이름" />
        <Button type="submit">제출</Button>
      </form>

      <Link href="/signIn">이미 계정이 있으신가요? 로그인</Link>
      <button onClick={() => signIn("google")}>Google로 로그인</button>
    </AuthLayout>
  );
};
```

<div class="content-ad"></div>

회원 가입 페이지에서는 다음을 수행합니다.

- 이메일, 비밀번호 및 이름을 입력합니다.
- 등록을 위해 자체 백엔드와 상호 작용하는 제출 처리.
- 등록 과정 중 성공 또는 오류에 대한 피드백.
- 대체 로그인 방법을 위한 링크 및 옵션.

## 이 안내서의 범위 이해

NextAuth를 사용하여 Next.js에서 인증을 설정하는 세부 정보에 대해 살펴보기 전에, 이 가이드는 특히 인증 메커니즘의 프론트엔드 구성에 중점을 둔 것을 기억해주시기 바랍니다. 이 안내서에서 다루지 않는 주요 구성 요소는 다음과 같습니다:

<div class="content-ad"></div>

- 데이터베이스 스키마: 사용자 자격 증명을 저장하는 백엔드 설정, 특히 자격 증명 제공자에 관한 부분이 다루지 않았습니다. 완벽한 구현에는 암호화된 암호와 사용자 세부 정보를 저장하는 데이터베이스가 필요합니다.
- 백엔드 등록 라우트: 사용자 등록 및 관리에 필요한 백엔드 라우트가 가이드에 포함되어 있지 않으며, 이는 완전히 기능적인 인증 시스템에 필수적입니다.
- 완전한 백엔드 통합: 인증의 프론트엔드 측면을 논의하면서도, 이를 백엔드 서비스와 통합하는 것은 이 글의 범위를 벗어납니다.

이 안내서는 더 큰 설정의 일부로, Next.js 애플리케이션에서 인증을 통합하는 데 출발점을 제공하고 있습니다. 포괄적인 구현을 위해 추가적인 백엔드 개발과 데이터베이스 설정이 필요합니다.

저장소 링크: https://github.com/karthickthankyou/foundationX

읽어주셔서 감사합니다. 제 작품에 관심을 가져주셔서 감사합니다. 더 많은 완성도 있는 오픈소스 제품을 원하시면 Github나 LinkedIn에서 팔로우해주세요.

<div class="content-ad"></div>

행복한 코딩하세요. 🎉
