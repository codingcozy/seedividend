---
title: "NextAuth v5를 사용한 보호된 라우팅 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_0.png"
date: 2024-05-14 11:21
ogImage: 
  url: /assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_0.png
tag: Tech
originalTitle: "Implementing Protected Routing with NextAuth v5"
link: "https://medium.com/@supunawa/implementing-protected-routing-with-nextauth-v5-ef76c7adcbca"
---


![이미지](/assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_0.png)

이 글에서는 Next.js 애플리케이션에서 NextAuth v5를 사용하여 클라이언트 측 및 서버 측 경로를 보호하는 방법을 알려드릴 거에요.

NextAuth.js는 Next.js 애플리케이션에서 널리 사용되는 인증 라이브러리로, 버전 5가 출시되면서 여러 가지 주목할만한 개선 사항과 변경 사항이 소개되었어요. 이 최신 버전에서 중요한 업데이트 중 하나는 미들웨어 시스템에서 관찰되어요. 미들웨어 API가 향상되어 인증 흐름과 접근 제어에 대해 더 많은 유연성과 제어를 제공하고 있어요.

그럼 시작해봅시다!



## 단계 1 — 새로운 Next.js 프로젝트를 생성하고 필요한 패키지 설치하기

이 글에서는 Next.js 애플리케이션을 만드는 방법에 대해 자세히 다루지는 않겠지만, nextAuth를 사용하기 위해서는 최신 버전이 필요합니다.

```js
npm install --save next-auth
```

<img src="/assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_1.png" />



## 단계 2— 애플리케이션 내에 nextAuth 제공자 설정하기

이 예제에서는 Google을 인증 제공자로 사용할 것입니다. 이제 Next 앱 내에 "services"라는 새 폴더를 만들고 그 안에 auth.ts라는 새 파일을 생성하세요. 파일을 만든 후 아래 코드를 추가하세요.

```js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  pages: {
    signIn: '/login'
  }
});
```

반드시 .env 파일을 만들어서 google 클라이언트 ID와 clientSecret를 추가해주세요.



다음으로, Next 앱 내에서 api 디렉토리(페이지 디렉토리 내부) 안에 새 폴더를 만들어주세요. 폴더의 이름은 `auth`로 지어주세요. 그 폴더 안에 `...nextAuth`(대소문자 구분 필수)라는 폴더를 만들고, 그 안에 `route.ts` 파일을 생성해주세요.

<img src="/assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_2.png" />

해당 파일을 생성한 후, 아래 코드를 추가해주세요.

```js
export { GET, POST } from '../../../../services/auth';
export const runtime = 'edge';
```



이제 제공자 설정이 모두 끝났으니, useContext API와 유사하게 전체 앱에 인증 상태를 제공하는 다른 컴포넌트를 사용하여 모든 구성 요소와 라우트를 감싸는 작업을 진행해 보겠습니다.
rootlayout.ts 파일 내에서 세션 제공자(SessionProvider)를 사용하여 컴포넌트를 감싸세요.

```js
import './globals.css';

import Navbar from '../components/nav-bar/navbar';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </SessionProvider>
      </body>
    </html>
  );
}
```

## 단계 3 — 모든 signIn 및 signOut 함수 구현

그런 다음 nextAuth를 사용하여 모든 signIn 및 signOut 함수를 구현해야 합니다. 그러나 이 문서에서는 해당 함수를 구현하지 않겠습니다. 필요한 라우트를 보호하는 방법만 안내해 드리겠습니다.



## 단계 4 — 클라이언트 측과 서버 측 라우트를 보호하는 미들웨어 생성

이 접근 방식에서는 클라이언트 측과 서버 측 라우트를 보호하기 위해 미들웨어를 사용할 것입니다. 먼저 src 폴더 안에 middleware.ts라는 새 파일을 만들고 다음 코드를 추가해주세요.

<img src="/assets/img/2024-05-14-ImplementingProtectedRoutingwithNextAuthv5_3.png" />

```js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/profile',
];
const unprotectedRoutes = ['/', '/login'];

import { auth } from './services/auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
```



해당 코드에는 "protectedRoutes"와 "unprotectedRoutes"라우트가 몇 개 있습니다. 다음 js 애플리케이션에서 라우트를 보호하려면 이 배열에서 원하는 라우트를 추가하거나 제거할 수 있습니다.

전체 문서를 보려면 방문해주세요.
세미콜론 — 기술 블로그 (semicolon-blog.vercel.app)

우리는 클라이언트 측과 서버 측 라우트를 성공적으로 보호했다고 생각합니다. 감사합니다! 👏👏👏