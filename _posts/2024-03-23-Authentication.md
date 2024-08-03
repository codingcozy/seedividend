---
title: "Nextjs 13 사이트에서 사용자 인증 기능 구현하기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "인증 Authentication"
link: "undefined"
---



# 인증

Next.js에 인증을 구현하려면 세 가지 핵심 개념을 익혀 보세요:

- 인증은 사용자가 자신이 주장하는 대로 자신인지 확인하는 과정입니다. 사용자는 사용자 이름과 비밀번호와 같은 것으로 신원을 증명해야 합니다.
- 세션 관리는 사용자의 상태(예: 로그인 여부)를 여러 요청에 걸쳐 추적합니다.
- 권한 부여는 사용자가 어떤 애플리케이션 부분에 접근할 수 있는지를 결정합니다.

이 페이지에서는 Next.js 기능을 사용하여 일반적인 인증, 권한 부여 및 세션 관리 패턴을 구현하는 방법을 보여줍니다. 이를 통해 애플리케이션의 요구 사항에 맞게 최상의 솔루션을 선택할 수 있습니다.

<div class="content-ad"></div>

## 인증

인증은 사용자의 신원을 확인하는 과정입니다. 이는 사용자가 로그인할 때 발생하며, 사용자 이름과 비밀번호 또는 구글과 같은 서비스를 통해 이루어집니다. 사용자가 주장하는 것이 정말로 그들 자신인지 확인하여, 사용자의 데이터와 앱이 미인가된 접근이나 사기 행위로부터 보호되도록 합니다.

### 인증 전략

현대의 웹 애플리케이션은 일반적으로 여러 인증 전략을 사용합니다:

<div class="content-ad"></div>

- OAuth/OpenID Connect (OIDC): 사용자 자격 증명을 공유하지 않고 제3자 액세스를 활성화합니다. 소셜 미디어 로그인 및 단일 로그인(SSO) 솔루션에 이상적입니다. OpenID Connect를 이용하여 신원 계층을 추가합니다.
- 자격 증명 기반 로그인(이메일 + 비밀번호): 사용자가 이메일과 비밀번호로 로그인하는 웹 애플리케이션에서의 표준 선택사항입니다. 익숙하고 구현하기 쉽지만 피싱과 같은 위협에 대비하기 위해 강력한 보안 조치가 필요합니다.
- 비밀번호 없음/토큰 기반 인증: 안전한 비밀번호 없는 액세스를 위해 이메일 매직 링크나 SMS 일회용 코드를 사용합니다. 편리하고 높은 보안성으로 인기가 있으며, 비밀번호 부담을 줄이는 데 도움이 됩니다. 사용자의 이메일이나 전화의 가용성에 의존하므로 제한사항이 있습니다.
- 패스키/웹인: 각 사이트에 고유한 암호화 자격 증명을 사용하여 피싱에 대비한 높은 보안성을 제공합니다. 안전하지만 새로운 방법이므로 구현하기 어려울 수 있습니다.

인증 전략을 선택할 때는 애플리케이션의 특정 요구 사항, 사용자 인터페이스 고려 사항 및 보안 목표와 일치해야 합니다.

### 인증 구현

이 섹션에서는 웹 애플리케이션에 기본적인 이메일-비밀번호 인증을 추가하는 과정을 살펴보겠습니다. 이 방법은 기본 수준의 보안을 제공하지만, 흔히 발생하는 보안 위협에 대비하기 위해 OAuth나 비밀번호 없는 로그인과 같은 고급 옵션을 고려하는 것이 좋습니다. 다룰 인증 흐름은 다음과 같습니다:

<div class="content-ad"></div>

- 사용자는 로그인 양식을 통해 자격 증명을 제출합니다.
- 양식이 API 경로에서 처리되는 요청을 보냅니다.
- 성공적으로 인증된 경우, 사용자의 성공적인 인증을 나타내는 프로세스가 완료됩니다.
- 인증이 실패하면 오류 메시지가 표시됩니다.

사용자가 자격 증명을 입력할 수 있는 로그인 양식을 고려해보세요:

```typescript
import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/profile");
    } else {
      // 오류 처리
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="이메일" required />
      <input type="password" name="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
  );
}
```

위 양식은 사용자의 이메일과 비밀번호를 입력할 수 있는 두 개의 입력 필드가 있습니다. 제출시, /api/auth/login 경로로 POST 요청을 보내는 함수가 트리거됩니다.

<div class="content-ad"></div>

인증 공급자의 API를 호출하여 인증을 처리하려면 API 경로에서 다음 코드를 사용할 수 있습니다:

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    await signIn("credentials", { email, password });

    res.status(200).json({ success: true });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
```

이 코드에서 signIn 메서드는 사용자 데이터에 대한 자격 증명을 확인합니다. 인증 공급자가 자격 증명을 처리한 후에는 두 가지 가능한 결과가 있습니다:

- 성공적인 인증: 이 결과는 로그인이 성공했음을 의미합니다. 이후에는 보호된 경로에 액세스하거나 사용자 정보를 가져오는 등의 추가 작업을 시작할 수 있습니다.
- 인증 실패: 자격 증명이 잘못되었거나 오류가 발생한 경우, 함수는 해당 인증 실패를 나타내는 해당 오류 메시지를 반환합니다.

<div class="content-ad"></div>

Next.js 프로젝트에서 보다 간편한 인증 설정을 위해, 특히 여러 로그인 방식을 제공할 때에는 포괄적 인증 솔루션을 사용하는 것을 고려해보세요.

## 권한 부여

사용자가 인증되면 특정 경로를 방문하거나 서버 액션을 통해 데이터 변경 및 라우트 핸들러를 호출하는 등의 작업을 수행할 수 있는지 확인해야 합니다.

### 미들웨어를 사용한 라우트 보호

<div class="content-ad"></div>

Next.js에서의 미들웨어는 웹사이트의 다른 부분에 누가 접근할 수 있는지를 제어하는 데 도움을 줍니다. 사용자 대시보드와 같은 영역을 보호하면서 마케팅 페이지와 같은 다른 페이지를 공개로 유지하는 데 중요합니다. 미들웨어는 모든 경로에 적용하고 공개 액세스를 위해 제외 사항을 지정하는 것이 좋습니다.

다음은 Next.js에서 인증을 위한 미들웨어를 구현하는 방법입니다:

#### 미들웨어 설정:

- 프로젝트의 루트 디렉토리에 middleware.ts 또는 .js 파일을 만듭니다.
- 사용자 액세스를 승인하기 위한 논리를 포함하고, 예를 들어 인증 토큰을 확인하는 것과 같은 작업을 수행합니다.

<div class="content-ad"></div>

#### 보호 된 라우트 정의:

- 모든 라우트가 권한 부여를 필요로하는 것은 아닙니다. 권한 검사가 필요하지 않은 라우트를 지정하려면 미들웨어의 matcher 옵션을 사용하십시오.

#### 미들웨어 로직:

- 사용자가 인증되었는지 확인하는 로직을 작성하십시오. 라우트 권한을 위해 사용자 역할이나 권한을 확인하십시오.

<div class="content-ad"></div>

### 권한이 없는 액세스 처리:

- 권한이 없는 사용자를 해당하는 로그인 또는 오류 페이지로 리디렉션합니다.

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

<div class="content-ad"></div>

이 예제는 Response.redirect를 사용하여 요청 파이프라인 초기에 리디렉션을 처리하여 효율적이고 접근 통제를 중앙 집중화하는 방법을 보여줍니다.

인증에 성공한 후에는 사용자 탐색을 역할에 기반하여 관리하는 것이 중요합니다. 예를 들어, 관리자 사용자는 관리자 대시보드로 리디렉션되고, 보통 사용자는 다른 페이지로 이동될 수 있습니다. 이것은 역할별 경험 및 필요한 경우 사용자에게 프로필 완성을 요청하는 등 조건부 탐색에 중요합니다.

인가를 설정할 때, 앱이 데이터에 액세스하거나 변경하는 곳에서 주요 보안 확인이 발생하도록 보장하는 것이 중요합니다. 미들웨어는 초기 유효성 검사에 유용할 수 있지만, 데이터 보호의 주요 방어선이 되어서는 안 되는 것이 좋습니다. 대다수의 보안 확인은 데이터 액세스 계층(DAL)에서 수행되어야 합니다.

### API 경로 보호하기

<div class="content-ad"></div>

Next.js에서 API 라우트는 서버 측 로직 처리와 데이터 관리에 필수적입니다. 특정 기능에 대한 액세스 권한을 가진 사용자만 접속할 수 있도록 이러한 라우트를 안전하게 유지하는 것이 중요합니다. 일반적으로는 사용자의 인증 상태와 역할 기반 권한을 확인하는 것이 포함됩니다.

다음은 API 라우트를 안전하게 유지하는 예시입니다:

```typescript
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req);

  // 사용자가 인증되었는지 확인
  if (!session) {
    res.status(401).json({
      error: "사용자가 인증되지 않았습니다.",
    });
    return;
  }

  // 사용자가 'admin' 역할을 가졌는지 확인
  if (session.user.role !== "admin") {
    res.status(401).json({
      error: "접근 권한이 없습니다: 사용자가 관리자 권한이 없습니다.",
    });
    return;
  }

  // 인가된 사용자를 위한 라우트 진행
  // ... API 라우트 구현
}
```

이 예시는 인증과 권한 부여에 대한 두 단계의 보안 검사가 있는 API 라우트를 보여줍니다. 먼저 활성 세션을 확인하고 나중에 로그인한 사용자가 'admin'인지 확인합니다. 이러한 접근 방식은 인가된 사용자에게만 제한된 안전한 액세스를 보장하여 요청 처리의 강력한 보안을 유지합니다.

<div class="content-ad"></div>

### 최선의 실행 방법

- 안전한 세션 관리: 권한이 없는 액세스와 데이터 침해를 방지하기 위해 세션 데이터의 보안을 우선시하십시오. 암호화 및 안전한 저장 관행을 사용하십시오.
- 동적 롤 관리: 사용자 역할에 대한 유연한 시스템을 사용하여 권한 및 역할 변경에 쉽게 대응하고 하드코딩된 역할을 피하십시오.
- 보안 중심 접근 방식: 권한 부여 로직의 모든 측면에서 보안을 우선시하여 사용자 데이터를 보호하고 응용 프로그램의 무결성을 유지하십시오. 이에는 철저한 테스팅 및 잠재적인 보안 취약점 고려가 포함됩니다.

## 세션 관리

세션 관리는 사용자가 응용 프로그램과 상호 작용하는 과정을 시간별로 추적 및 관리하며, 사용자의 인증된 상태가 응용 프로그램의 다양한 부분에서 유지되도록 보장하는 것을 포함합니다.

<div class="content-ad"></div>

이렇게 하면 반복해서 로그인할 필요가 없으며, 보안과 사용자 편의성이 모두 향상됩니다. 세션 관리에는 쿠키 기반 및 데이터베이스 세션 두 가지 주요 방법이 사용됩니다.

### 쿠키 기반 세션

> 🎥 시청: Next.js와 함께 쿠키 기반 세션 및 인증에 대해 더 알아보기 → YouTube (11분)
> .

쿠키 기반 세션은 브라우저 쿠키에 암호화된 세션 정보를 직접 저장하여 사용자 데이터를 관리합니다. 사용자가 로그인하면 이 암호화된 데이터가 쿠키에 저장됩니다. 각 후속 서버 요청에는 이 쿠키가 포함되어 반복되는 서버 쿼리의 필요성을 줄이고 클라이언트 측 효율성을 향상시킵니다.

<div class="content-ad"></div>

그러나 이 방법은 쿠키가 클라이언트 측 보안 위험에 노출될 수 있기 때문에 민감한 데이터를 보호하기 위해 신중한 암호화가 필요합니다. 쿠키에 세션 데이터를 암호화하는 것은 사용자 정보를 무단 접근으로부터 보호하는 데 중요합니다. 쿠키가 도난당하더라도 내부 데이터가 알아볼 수 없게 보호됩니다.

또한, 개별 쿠키의 크기는 제한되어 있지만(일반적으로 약 4KB), 쿠키 청킹과 같은 기술을 사용하면 대규모 세션 데이터를 여러 개의 쿠키로 분할하여 이 제한을 극복할 수 있습니다.

Next.js 프로젝트에서 쿠키를 설정하는 방법은 다음과 같을 수 있습니다:

서버에서 쿠키 설정하기:

<div class="content-ad"></div>

```typescript
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionData = req.body;
  const encryptedSessionData = encrypt(sessionData);

  const cookie = serialize("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "쿠키가 성공적으로 설정되었습니다!" });
}
```

### 데이터베이스 세션

데이터베이스 세션 관리는 세션 데이터를 서버에 저장하고 사용자 브라우저가 세션 ID만 받는 방식을 포함합니다. 이 ID는 클라이언트 측 환경에서 민감한 세션 데이터를 포함하지 않고 서버측에 저장된 세션 데이터를 참조합니다. 이 방법은 보안을 강화하여 클라이언트 측 공격에 노출 위험을 줄이는 효과가 있습니다. 데이터베이스 세션은 데이터 저장 요구 사항이 큰 경우에 더 확장 가능합니다.

그러나 이 방식에는 트레이드오프가 있습니다. 사용자 상호 작용마다 데이터베이스 조회가 필요하여 성능 부담이 증가할 수 있습니다. 세션 데이터 캐싱과 같은 전략을 통해 이를 완화할 수 있습니다. 또한 데이터베이스에 의존하면 세션 관리는 데이터베이스의 성능 및 가용성에 의존하게 됩니다.

<div class="content-ad"></div>

여기에 Next.js 애플리케이션의 데이터베이스 세션을 구현하는 간단한 예제가 있어요:

서버에서 세션 생성:

```typescript
import db from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = req.body;
    const sessionId = generateSessionId();
    await db.insertSession({
      sessionId,
      userId: user.id,
      createdAt: new Date(),
    });

    res.status(200).json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
```

### Next.js에서 세션 관리 선택하기

<div class="content-ad"></div>

Cookie 기반과 데이터베이스 세션 중 어떤 것을 선택할지는 Next.js 애플리케이션의 요구 사항에 따라 다릅니다. Cookie 기반 세션은 간단하고 서버 부하가 적은 작은 애플리케이션에 적합하지만 보안성이 떨어질 수 있습니다. 데이터베이스 세션은 더 복잡하지만 높은 보안성과 확장성을 제공하여 대규모이면서 데이터에 민감한 애플리케이션에 이상적입니다.

NextAuth.js와 같은 인증 솔루션을 사용하면 세션 관리가 더욱 효율적해지며, 쿠키 또는 데이터베이스 저장소를 사용할 수 있습니다. 이러한 자동화는 개발 프로세스를 간소화하지만 선택한 솔루션에서 사용하는 세션 관리 방법을 이해하는 것이 중요합니다. 애플리케이션의 보안 및 성능 요구 사항과 일치하는지 확인하십시오.

선택한 방식에 관계없이 세션 관리 전략에서 보안을 우선시하세요. 쿠키 기반 세션의 경우 안전하고 HTTP-only 쿠키를 사용하여 세션 데이터를 보호하는 것이 중요합니다. 데이터베이스 세션의 경우 정기적인 백업 및 세션 데이터의 안전한 처리가 필수적입니다. 무단 액세스를 방지하고 애플리케이션의 성능과 신뢰성을 유지하기 위해 두 접근 방식 모두에서 세션 만료 및 정리 메커니즘을 구현하는 것이 중요합니다.

## 예시

<div class="content-ad"></div>

다음은 Next.js와 호환되는 인증 솔루션입니다. 아래의 빠른 시작 가이드를 참조하여 Next.js 애플리케이션에서 이들을 구성하는 방법을 배우세요:

- Auth0
- Clerk
- Kinde
- Lucia
- NextAuth.js
- Supabase
- Stytch
- Iron Session

## 더 많은 자료

인증 및 보안에 대해 계속 학습하려면 다음 자원을 확인하세요:

<div class="content-ad"></div>

- XSS 공격 이해
- CSRF 공격 이해

<div class="content-ad"></div>
