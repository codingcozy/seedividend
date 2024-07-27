---
title: "서버 측 세션 구현하기 - Nextjs"
description: ""
coverImage: "/assets/img/2024-05-14-NextjsImplementingServer-SideSessions_0.png"
date: 2024-05-14 10:50
ogImage: 
  url: /assets/img/2024-05-14-NextjsImplementingServer-SideSessions_0.png
tag: Tech
originalTitle: "Next.js Implementing Server-Side Sessions"
link: "https://medium.com/@tareqaziz0065/next-js-implementing-server-side-sessions-b15333d9ef8d"
---


<img src="/assets/img/2024-05-14-NextjsImplementingServer-SideSessions_0.png" />

# 단계 1: 서버 측 세션 구현하기

먼저 세션 관리 시스템을 설정하세요. 일반적으로 세션을 생성하고 유효성을 검사하며, 세션 정보를 안전한 HTTP-only 쿠키에 저장하는 과정을 포함합니다.

## API 라우트에서의 세션 관리



API 라우트(app/routes/api/)에서 세션을 관리할 수 있습니다. 예를 들어, 로그인 라우트에서는 사용자를 인증하고 세션을 생성한 후 세션 쿠키를 설정할 수 있습니다.

```js
// app/routes/api/login.ts

import { createSession, getUser } from '@/lib/auth'; // 이 함수들을 구현하세요
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req.body.username, req.body.password); // 사용자 인증
  if (!user) {
    return res.status(401).json({ error: '유효하지 않은 자격 증명' });
  }

  const sessionId = await createSession(user.id); // 세션 생성
  res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`);
  res.status(200).json({ message: '성공' });
}
```

# 단계 2: App Router 미들웨어를 사용한 리디렉션

App Router 미들웨어를 사용하여 요청을 가로채고 세션 상태를 기반으로 로직을 구현할 수 있습니다.



## 미들웨어 예시

세션 유효성 검사와 리다이렉션을 처리하는 미들웨어 파일(e.g., app/middleware.ts)을 생성하세요.

```js
// app/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // 이 함수 구현 필요

export async function middleware(req: NextRequest) {
  const session = await getSession(req.cookies.sessionId); // 세션 유효성 검사

  // 세션이 없고 요청이 보호된 경로일 경우에는 로그인 페이지로 리다이렉션
  if (!session && req.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
```

# 단계 3: 클라이언트에서 세션 유효성 검사 및 리다이렉션



클라이언트 측에서는 여전히 세션 관련 업데이트를 처리해야 할 수도 있습니다. 로그인/로그아웃 후 리다이렉트 또는 로딩 상태 표시와 같은 작업들이 필요할 수 있어요.

```js
// 당신의 React 컴포넌트 안에서
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MyComponent = () => {
  const router = useRouter();

  useEffect(() => {
    // 세션 상태 확인하고 필요시 리다이렉트
    // 세션을 확인하는 API 루트에 요청을 보낼 수도 있어요.
    checkSession().then(isValidSession => {
      if (!isValidSession) {
        router.push('/login');
      }
    });
  }, []);

  // 컴포넌트 렌더링
};
```

# 결론

- 세션 보안: 안전한 HTTP-only 쿠키를 사용하여 세션 식별자를 저장하세요.
- 쿠키 플래그: SameSite 및 Secure와 같은 적절한 쿠키 플래그 설정을 통해 보안을 강화하세요.
- 확장성: 확장 가능한 애플리케이션을 위해 세션 관리에 데이터베이스나 Redis와 같은 서비스를 고려해보세요.
- 오류 처리: 세션 관리 로직에서 견고한 오류 처리를 보장하세요.
- 클라이언트 측 처리: 서버 측 확인이 있더라도, 사용자 경험을 향상시키기 위해 세션 상태에 따라 특정 클라이언트 측 동작을 처리할 수도 있습니다.



이 설정은 App Router를 사용하여 Next.js 애플리케이션에서 서버 측 세션을 관리하고 라우트 액세스를 제어하는 강력한 시스템을 제공합니다.