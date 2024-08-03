---
title: "Nextjs 14 인증 구현 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 인증 구현 방법

Next.js에서 인증을 구현하려면 세 가지 기본 개념에 익숙해져야 합니다:

- **인증(Authentication)**은 사용자가 자신이 말하는 대로인지 확인하는 것을 의미합니다. 사용자는 사용자 이름과 비밀번호와 같은 것으로 자신의 신원을 증명해야 합니다.
- **세션 관리(Session Management)**는 여러 요청을 통해 사용자의 상태(예: 로그인 상태)를 추적합니다.
- **권한 부여(Authorization)**는 사용자가 액세스할 수있는 응용 프로그램의 부분을 결정합니다.
  이 페이지는 Next.js 기능을 사용하여 일반적인 인증, 권한 부여 및 세션 관리 패턴을 구현하는 방법을 안내하므로 애플리케이션의 요구 사항에 따라 최적의 솔루션을 선택할 수 있습니다.

<div class="content-ad"></div>

## 인증

인증은 사용자의 신원을 확인하는 것을 의미합니다. 이것은 사용자가 로그인할 때 발생하며, 사용자는 아이디와 비밀번호 또는 Google과 같은 서비스를 통해 로그인합니다. 사용자가 주장하는 대로 정말로 사용자인지 확인하고, 사용자의 데이터와 애플리케이션을 무단 접근이나 사기 행위로부터 보호하기 위한 것입니다.

### 인증 전략

현대의 웹 애플리케이션은 일반적으로 여러 인증 전략을 사용합니다:

<div class="content-ad"></div>

- OAuth/OpenID Connect (OIDC): 사용자 자격 증명을 공유하지 않고 제3자 액세스를 활성화합니다. 소셜 미디어 로그인 및 단일 로그인(SSO) 솔루션에 이상적입니다. OpenID Connect와 함께 신원 층을 추가합니다.
- 자격 증명 기반 로그인(이메일 + 비밀번호): 이메일과 비밀번호로 로그인하는 사용자가 사용하는 웹 애플리케이션에 대한 표준 선택 사항입니다. 익숙하고 구현하기 쉬우며 피싱과 같은 위협에 대한 견고한 보안 조치가 필요합니다.
- 비밀번호 없이/토큰 기반 인증: 안전하고 비밀번호 없는 액세스를 위해 이메일 매직 링크나 SMS 일회용 코드를 사용합니다. 편리하고 향상된 보안을 제공하여 비밀번호 피로를 줄이는 데 도움이 됩니다. 그러나 사용자의 이메일 또는 전화의 가용성에 의존성이 있습니다.
- 패스키/웹인: 각 사이트에 고유한 암호화 자격 증명을 사용하여 피싱에 대한 높은 보안을 제공합니다. 안전하지만 새로운 이 전략은 구현이 어려울 수 있습니다.
  인증 전략을 선택할 때 애플리케이션의 특정 요구 사항, 사용자 인터페이스 고려 사항 및 보안 목표와 일치해야 합니다.

### 인증 구현

이 섹션에서는 웹 애플리케이션에 기본 이메일-비밀번호 인증을 추가하는 과정을 탐색합니다. 이 방법은 기본 수준의 보안을 제공하지만 OAuth나 비밀번호 없는 로그인과 같은 고급 옵션을 고려함으로써 일반적인 보안 위협에 대한 강화된 보호를 고려할 가치가 있습니다. 우리가 논의할 인증 흐름은 다음과 같습니다:

<div class="content-ad"></div>

- 사용자는 로그인 양식을 통해 자격 증명을 제출합니다.
- 양식은 서버 액션을 호출합니다.
- 성공적인 확인 후, 프로세스가 완료되며 사용자의 성공적인 인증을 나타냅니다.
- 확인에 실패하면 오류 메시지가 표시됩니다.
  사용자가 자격 증명을 입력할 수 있는 로그인 양식을 생각해봅시다:

```typescript
import { authenticate } from "@/app/lib/actions";

export default function Page() {
  return (
    <form action={authenticate}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

위 양식에는 사용자의 이메일과 비밀번호를 입력받을 수 있는 두 개의 입력 필드가 있습니다. 제출 시 authenticate 서버 액션을 호출합니다.

<div class="content-ad"></div>

인증을 처리하기 위해 서버 액션에서 인증 공급자의 API를 호출할 수 있습니다:

```typescript
"use server";

import { signIn } from "@/auth";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "잘못된 자격 증명입니다.";
        default:
          return "문제가 발생했습니다.";
      }
    }
    throw error;
  }
}
```

이 코드에서 signIn 메서드는 저장된 사용자 데이터와 자격 증명을 확인합니다. 인증 제공자가 자격 증명을 처리한 후, 두 가지 가능한 결과가 있습니다:

- 성공적인 인증: 이 결과는 로그인이 성공했음을 의미합니다. 이후에는 보호된 경로에 액세스하거나 사용자 정보를 가져오는 등의 추가 작업을 시작할 수 있습니다.
- 인증 실패: 자격 증명이 잘못된 경우나 오류가 발생한 경우에는 해당 오류 메시지를 반환하여 인증 실패를 알립니다.

<div class="content-ad"></div>

마지막으로, login-form.tsx 컴포넌트에서 React의 useFormState를 사용하여 서버 액션을 호출하고 폼 오류를 처리하며, useFormStatus를 사용하여 폼의 보류 상태를 처리할 수 있습니다:

```typescript
"use client";

import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <input type="email" name="email" placeholder="이메일" required />
      <input type="password" name="password" placeholder="비밀번호" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      로그인
    </button>
  );
}
```

Next.js 프로젝트에서 특히 여러 로그인 방법을 제공할 때 보다 간단한 인증 설정을 위해 종합적인 인증 솔루션을 고려해보세요.

## 승인

<div class="content-ad"></div>

한 번 사용자가 인증되면 사용자가 특정 경로를 방문하고 서버 액션을 통해 데이터를 변경하거나 라우트 핸들러를 호출할 수 있는지 확인해야 합니다.

### 미들웨어를 사용하여 라우트 보호

Next.js의 미들웨어를 사용하면 웹사이트의 다양한 부분에 누가 접근할 수 있는지 제어할 수 있습니다. 사용자 대시보드와 같은 영역은 보호하고 마케팅 페이지와 같은 다른 페이지는 공개로 유지하는 것이 중요합니다. 모든 경로에 미들웨어를 적용하고 공개 액세스를 위한 제외 사항을 지정하는 것이 좋습니다.
다음은 Next.js에서 인증을 위한 미들웨어를 구현하는 방법입니다:

<div class="content-ad"></div>

#### 미들웨어 설정하기:

- 프로젝트 루트 디렉토리에 middleware.ts 또는 .js 파일을 생성합니다.
- 사용자 액세스를 승인하는 논리를 포함하며, 인증 토큰을 확인하는 등의 작업을 수행합니다.

#### 보호된 라우트 정의하기:

- 모든 라우트에는 권한이 필요하지 않을 수 있습니다. Middleware에서 matcher 옵션을 사용하여 권한 확인이 필요하지 않은 라우트를 지정합니다.

<div class="content-ad"></div>

#### 미들웨어 로직:

- 사용자가 인증되었는지 확인하는 로직을 작성하세요. 루트 권한 또는 규칙을 확인하여 라우트 권한 부여를 확인합니다.

#### 권한이 없는 접근 처리:

- 권한이 없는 사용자를 적절한 경우 로그인 또는 오류 페이지로 리디렉션합니다.

<div class="content-ad"></div>

예시 미들웨어 파일:

```typescript
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

이 예시에서는 요청 파이프라인에서 조기에 리디렉션을 처리하고 액세스 제어를 중앙 집중화하여 효율적으로 처리하는 Response.redirect를 사용합니다. 특정한 리디렉션 요구사항을 충족시키기 위해 서버 컴포넌트, 라우트 핸들러 및 서버 액션에서 리디렉션 기능을 사용하여 더 많은 제어를 제공할 수 있습니다. 역할 기반 네비게이션이나 컨텍스트에 민감한 시나리오에 유용합니다.

<div class="content-ad"></div>

```typescript
import { redirect } from "next/navigation";

export default function Page() {
  // 리디렉션이 필요한지를 결정하는 로직
  const accessDenied = true;
  if (accessDenied) {
    redirect("/login");
  }

  // 다른 경로 및 로직 정의
}
```

성공적인 인증 후에는 사용자의 역할에 기반하여 사용자 탐색을 관리하는 것이 중요합니다. 예를 들어, 관리자 사용자는 관리자 대시보드로 리디렉트되고, 일반 사용자는 다른 페이지로 이동합니다. 역할별 경험 및 필요에 따른 조건부 네비게이션, 예를 들어 사용자에게 프로필 완성을 유도하는 것은 중요합니다.
권한 설정 시, 앱에서 데이터에 액세스하거나 데이터를 변경하는 위치에서 주요 보안 검사가 수행되어야 합니다. 미들웨어는 초기 유효성 검사에 유용할 수 있지만, 데이터 보호의 유일한 방어선으로서 사용해서는 안 됩니다. 대부분의 보안 검사는 데이터 액세스 계층(DAL)에서 수행되어야 합니다.
이 접근 방식은 이 보안 블로그에 강조된 대로, 모든 데이터 액세스를 전용 DAL 내에서 통합하는 것을 옹호합니다. 이 전략은 일관된 데이터 액세스를 보장하고, 권한 버그를 최소화하며 유지보수를 간소화합니다. 포괄적인 보안을 보장하려면 다음 핵심 영역을 고려하십시오:```

<div class="content-ad"></div>

- 서버 작업: 서버 측 프로세스에서 보안 검사를 구현하여 특히 민감한 작업에 대비합니다.
- 라우트 핸들러: 보안 조치를 취한 상태에서 수신된 요청을 처리하여 인가된 사용자만이 액세스할 수 있도록 합니다.
- 데이터 액세스 계층 (DAL): 데이터베이스와 직접 상호 작용하며 데이터 트랜잭션의 유효성을 확인하고 권한을 부여하는 데 중요합니다. 데이터 액세스 계층 내에서 핵심적인 확인 작업을 수행하여 데이터를 가장 중요한 상호 작용 지점에서 보호하는 것이 중요합니다. – 액세스 또는 수정.
  데이터 액세스 계층을 안전하게 보호하는 자세한 안내와 예제 코드 스니펫, 고급 보안 관행에 대한 자세한 내용은 보안 가이드의 데이터 액세스 계층 섹션을 참조해 주세요.

### 서버 작업 보호

서버 작업을 공개 API 엔드포인트와 같은 보안 고려 사항으로 취급하는 것이 중요합니다. 각 작업에 대한 사용자 인가를 확인하는 것이 중요합니다. 서버 작업 내에서 사용자 권한을 확인하기 위한 확인 절차를 구현하여 특정 작업을 관리자 사용자에게 제한하는 등의 절차를 수행해야 합니다.

<div class="content-ad"></div>

아래 예제에서는 작업을 진행하기 전에 사용자의 역할을 확인합니다:

```typescript
"use server";

// ...

export async function serverAction() {
  const session = await getSession();
  const userRole = session?.user?.role;

  // 사용자가 동작을 수행할 권한이 있는지 확인합니다
  if (userRole !== "admin") {
    throw new Error("Unauthorized access: User does not have admin privileges.");
  }

  // 권한이 있는 사용자를 대상으로 동작을 진행합니다
  // ... 동작의 구현
}
```

### 라우트 핸들러 보호하기

Next.js의 라우트 핸들러는 들어오는 요청을 처리하는 데 중요한 역할을 합니다. 서버 작업과 마찬가지로 특정 기능에 대한 액세스가 권한이 있는 사용자만 가능하도록 보호되어야 합니다. 이는 사용자의 인증 상태와 권한을 확인하는 것을 포함할 수 있습니다.

<div class="content-ad"></div>

여기에 Route Handler를 보호하는 예제가 있습니다:

```typescript
export async function GET() {
  // 사용자 인증 및 역할 확인
  const session = await getSession();

  // 사용자가 인증되었는지 확인
  if (!session) {
    return new Response(null, { status: 401 }); // 사용자가 인증되지 않은 경우
  }

  // 사용자가 'admin' 역할을 가지고 있는지 확인
  if (session.user.role !== "admin") {
    return new Response(null, { status: 403 }); // 사용자가 인증되었지만 적절한 권한이 없는 경우
  }

  // 권한이 부여된 사용자를 위한 데이터 가져오기
}
```

이 예제는 인증 및 권한 부여에 대한 두 단계 보안 확인을 가진 Route Handler를 보여줍니다. 먼저 활성 세션을 확인하고, 그런 다음 로그인한 사용자가 `admin`인지 확인합니다. 이 접근 방식은 인증 및 권한이 부여된 사용자에게만 제한된 안전한 액세스를 보장하여 요청 처리에 대한 견고한 보안을 유지합니다.

### 서버 구성 요소를 사용한 권한 부여

<div class="content-ad"></div>

Next.js의 Server Components는 서버 측 실행을 위해 설계되었으며, 권한 부여와 같이 복잡한 로직을 통합할 수 있는 안전한 환경을 제공합니다. 이들은 백엔드 리소스에 직접 액세스할 수 있어 데이터 집약적 작업에 대한 성능을 최적화하고 민감한 작업에 대한 보안을 강화합니다.
Server Components에서 흔히 사용되는 방법은 사용자 역할에 기반하여 UI 요소를 조건부로 렌더링하는 것입니다. 이 접근 방식은 사용자 경험과 보안을 향상시키며, 사용자가 볼 권한이 있는 콘텐츠에만 접근하도록 합니다.
예시:

```typescript
export default function Dashboard() {
  const session = await getSession();
  const userRole = session?.user?.role; // session 객체에 'role'이 있다고 가정

  if (userRole === "admin") {
    return <AdminDashboard />; // 관리자용 컴포넌트
  } else if (userRole === "user") {
    return <UserDashboard />; // 일반 사용자용 컴포넌트
  } else {
    return <AccessDenied />; // 권한이 없는 접근 시 보여지는 컴포넌트
  }
}
```

<div class="content-ad"></div>

이 예시에서 대시보드 컴포넌트는 `admin`, `user`, 그리고 미인가된 역할에 대해 다른 UI를 렌더링합니다. 이 패턴을 사용하면 각 사용자가 자신의 역할에 적합한 컴포넌트만 상호작용하도록 보장하여 보안과 사용자 경험을 향상시킵니다.

### Best Practices

- 안전한 세션 관리: 세션 데이터의 보안을 우선시하여 무단 접근과 데이터 유출을 방지합니다. 암호화 및 안전한 저장 관행을 사용합니다.
- 동적 역할 관리: 사용자 역할에 대해 유연한 시스템을 사용하여 권한과 역할의 변경에 쉽게 대응하고 하드코딩된 역할을 피합니다.
- 보안 우선 접근: 권한 부여 논리의 모든 측면에서 보안을 우선시하여 사용자 데이터를 보호하고 애플리케이션의 무결성을 유지합니다. 이에는 철저한 테스트 및 잠재적인 보안 취약점을 고려하는 것이 포함됩니다.

## 세션 관리

<div class="content-ad"></div>

세션 관리는 사용자가 응용 프로그램과 상호 작용하는 내용을 추적하고 관리하여 인증된 상태가 응용 프로그램의 다른 부분에서도 유지되도록 하는 것을 의미합니다.
이를 통해 반복 로그인이 필요 없게 되어 보안과 사용자 편의성이 향상됩니다. 세션 관리에 사용되는 주요 두 가지 방법은 쿠키 기반 세션과 데이터베이스 세션입니다.

### 쿠키 기반 세션

> 🎥 시청: Next.js에서 쿠키 기반 세션 및 인증에 대해 더 많이 알아보기 → YouTube (11 분)
> .

<div class="content-ad"></div>

쿠키 기반 세션은 암호화된 세션 정보를 브라우저 쿠키에 직접 저장하여 사용자 데이터를 관리합니다. 사용자가 로그인하면 이 암호화된 데이터가 쿠키에 저장됩니다. 각 후속 서버 요청에는 이 쿠키가 포함되어 반복적인 서버 쿼리를 최소화하고 클라이언트 측 효율성을 향상시킵니다.
그러나 이 방법은 데이터 보호를 위해 신중한 암호화가 필요하며, 쿠키는 클라이언트 측 보안 위험에 노출될 수 있습니다. 쿠키에 세션 데이터를 암호화하는 것은 사용자 정보를 무단 접근으로부터 보호하는 데 중요합니다. 쿠키가 도난당해도 내부 데이터가 읽을 수 없게 보장됩니다.
또한 개별 쿠키의 크기는 제한되어 있지만(일반적으로 약 4KB), 쿠키 청킹과 같은 기술을 사용하면 이 제한을 극복할 수 있습니다. 큰 세션 데이터를 여러 쿠키로 나누는 방식입니다.
Next.js 프로젝트에서 쿠키를 설정하는 방법은 다음과 같을 수 있습니다:

<div class="content-ad"></div>

서버에서 쿠키 설정하기:

```typescript
"use server";

import { cookies } from "next/headers";

export async function handleLogin(sessionData) {
  const encryptedSessionData = encrypt(sessionData); // 세션 데이터를 암호화하세요
  cookies().set("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 일주일
    path: "/",
  });
  // 쿠키를 설정한 후에 리디렉션하거나 응답을 처리하세요
}
```

서버 구성 요소에서 쿠키에 저장된 세션 데이터에 액세스하기:

```typescript
import { cookies } from "next/headers";

export async function getSessionData(req) {
  const encryptedSessionData = cookies().get("session")?.value;
  return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData)) : null;
}
```

<div class="content-ad"></div>

### 데이터베이스 세션

데이터베이스 세션 관리는 세션 데이터를 서버에 저장하고, 사용자의 브라우저는 세션 ID만을 받는 방식을 의미합니다. 이 ID는 데이터 자체를 포함하지 않고 서버 측에 저장된 세션 데이터를 참조합니다. 이 방법은 보안을 강화하여 민감한 세션 데이터를 클라이언트 측 환경에서 격리시켜 클라이언트 측 공격에 노출될 위험을 줄입니다. 데이터베이스 세션은 더 많은 데이터 저장 요구를 수용할 수 있어 확장성이 높습니다.
그러나 이 방식에는 트레이드 오프가 있습니다. 각 사용자 상호작용마다 데이터베이스 조회가 필요하므로 성능 오버헤드가 증가할 수 있습니다. 세션 데이터 캐싱과 같은 전략은 이를 완화하는 데 도움이 될 수 있습니다. 또한 데이터베이스에 의존하는 것은 세션 관리가 데이터베이스의 성능과 가용성에 의해 신뢰할 수 있음을 의미합니다.
다음은 Next.js 어플리케이션에서 데이터베이스 세션을 구현하는 간단한 예제입니다:

<div class="content-ad"></div>

서버에서 세션 생성하기:

```js
import db from "./lib/db";

export async function createSession(user) {
  const sessionId = generateSessionId(); // 고유한 세션 ID 생성
  await db.insertSession({ sessionId, userId: user.id, createdAt: new Date() });
  return sessionId;
}
```

미들웨어나 서버 측 로직에서 세션 검색:

```js
import { cookies } from "next/headers";
import db from "./lib/db";

export async function getSession() {
  const sessionId = cookies().get("sessionId")?.value;
  return sessionId ? await db.findSession(sessionId) : null;
}
```

<div class="content-ad"></div>

### Next.js에서 세션 관리 선택하기

Next.js에서 쿠키 기반 및 데이터베이스 세션 중 어떤 것을 선택할지는 애플리케이션의 요구에 따라 다릅니다. 쿠키 기반 세션은 간단하고 서버 부하가 적은 작은 애플리케이션에 적합하지만 보안이 적을 수 있습니다. 반면 데이터베이스 세션은 더 복잡하지만 더 나은 보안과 확장성을 제공하여 대규모이거나 데이터에 민감한 애플리케이션에 이상적입니다.
NextAuth.js와 같은 인증 솔루션을 사용하면 세션 관리가 더 효율적해지며, 쿠키 또는 데이터베이스 저장소를 사용합니다. 이 자동화는 개발 프로세스를 간소화하지만 선택한 솔루션에서 사용되는 세션 관리 방법을 이해하는 것이 중요합니다. 애플리케이션의 보안 및 성능 요구 사항과 일치해야 합니다.
선택에 관계없이 세션 관리 전략에서 보안을 최우선으로 해야 합니다. 쿠키 기반 세션의 경우 안전하고 HTTP-Only 쿠키를 사용하여 세션 데이터를 보호하는 것이 중요합니다. 데이터베이스 세션의 경우 정기적인 백업 및 세션 데이터의 안전한 처리가 필수적입니다. 권한이 없는 액세스를 방지하고 애플리케이션의 성능과 신뢰성을 유지하기 위해 세션 만료 및 정리 메커니즘이 중요합니다.

<div class="content-ad"></div>

## 예시

다음은 Next.js와 호환되는 인증 솔루션입니다. 아래의 빠른 시작 가이드를 참조하여 Next.js 애플리케이션에서 이러한 솔루션을 구성하는 방법을 알아보세요:

- Auth0
- Clerk
- Kinde
- Lucia
- NextAuth.js
- Supabase
- Stytch
- Iron Session

## 더 읽어보기

<div class="content-ad"></div>

인증과 보안에 대해 더 알아보려면 다음 자료를 확인해보세요:

- XSS 공격 이해하기
- CSRF 공격 이해하기

<div class="content-ad"></div>
