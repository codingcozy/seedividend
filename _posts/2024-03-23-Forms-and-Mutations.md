---
title: "undefined"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "양식과 변이"
link: "undefined"
isUpdated: true
---





# Form & Mutation

양식을 사용하면 웹 애플리케이션에서 데이터를 생성하고 업데이트할 수 있습니다. Next.js는 API 루트를 사용하여 양식 제출과 데이터 변이를 강력하게 처리하는 방법을 제공합니다.

> 알아두면 좋은 사항:
> 곧 앱 라우터를 점진적으로 도입하고 서버 액션을 사용하여 양식 제출과 데이터 변이를 처리하는 것을 권장할 예정입니다. 서버 액션을 사용하면 컴포넌트에서 직접 호출할 수 있는 비동기 서버 함수를 정의할 수 있습니다. API 루트를 수동으로 만들지 않아도 됩니다.
> API 루트는 CORS 헤더를 지정하지 않으므로, 기본적으로 동일 출처만 허용됩니다.
> API 루트는 서버에서 실행되기 때문에 환경 변수를 통해 민감한 값(예: API 키)을 노출하지 않고 사용할 수 있습니다. 이는 애플리케이션의 보안을 위해 중요합니다.

## 예시

<div class="content-ad"></div>

### 서버 전용 폼

페이지 라우터를 사용하면 서버에서 안전하게 데이터를 변경하는 API 엔드포인트를 수동으로 생성해야 합니다.

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const id = await createItem(data);
  res.status(200).json({ id });
}
```

그런 다음 클라이언트에서 API 라우트를 호출하려면 이벤트 핸들러를 사용하세요:

<div class="content-ad"></div>

```typescript
import { FormEvent } from "react";

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    // ...
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 양식 유효성 검사

기본적인 클라이언트 측 양식 유효성 검사를 위해 required 및 type="email"과 같은 HTML 유효성을 사용하는 것을 권장합니다.

더 고급화된 서버 측 유효성 검사를 위해 데이터를 변경하기 전에 폼 필드를 유효성 검사하는 스키마 유효성 라이브러리인 zod를 사용할 수 있습니다.

<div class="content-ad"></div>

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  // ...
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const parsed = schema.parse(req.body);
  // ...
}
```

### 오류 처리

폼 제출이 실패할 때 오류 메시지를 보여주기 위해 React 상태를 사용할 수 있습니다:

```typescript
import React, { useState, FormEvent } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // 새 요청 시작 시 이전 오류를 지우기

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("데이터 제출에 실패했습니다. 다시 시도해주세요.");
      }

      // 필요한 경우 응답 처리
      const data = await response.json();
      // ...
    } catch (error) {
      // 사용자에게 표시할 오류 메시지를 캡처
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <input type="text" name="name" />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "제출"}
        </button>
      </form>
    </div>
  );
}
```

<div class="content-ad"></div>

## 로딩 상태 표시

서버에 제출되는 양식이 제출될 때 로딩 상태를 보여주기 위해 React 상태를 사용할 수 있습니다:

```typescript
import React, { useState, FormEvent } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // 요청이 시작될 때 로딩을 true로 설정

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      // 필요에 따라 응답 처리
      const data = await response.json();
      // ...
    } catch (error) {
      // 필요에 따라 오류 처리
      console.error(error);
    } finally {
      setIsLoading(false); // 요청이 완료될 때 로딩을 false로 설정
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "로딩 중..." : "제출"}
      </button>
    </form>
  );
}
```

### 리다이렉팅

<div class="content-ad"></div>

만약 변이 후에 사용자를 다른 경로로 리다이렉트하고 싶다면, 절대 또는 상대 URL로 리다이렉트할 수 있습니다:

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = await addPost();
  res.redirect(307, `/post/${id}`);
}
```

### 쿠키 설정

API Route 내에서 setHeader 메소드를 사용하여 응답에 쿠키를 설정할 수 있습니다:

<div class="content-ad"></div>

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", "username=lee; Path=/; HttpOnly");
  res.status(200).send("쿠키가 설정되었습니다.");
}
```

### 쿠키 읽기

API Route 내에서 쿠키를 읽을 수 있습니다. 다음은 쿠키 요청 도우미를 사용하는 예시입니다:

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.cookies.authorization;
  // ...
}
```

<div class="content-ad"></div>

### 쿠키 삭제

API Route 내에서 setHeader 메소드를 사용하여 쿠키를 삭제할 수 있습니다:

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", "username=; Path=/; HttpOnly; Max-Age=0");
  res.status(200).send("쿠키가 삭제되었습니다.");
}
```

<div class="content-ad"></div>
