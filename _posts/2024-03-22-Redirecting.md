---
title: "Nextjs 13 Redirecting 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: ""
link: ""
isUpdated: true
---

# 리다이렉팅

Next.js에서 리다이렉트하는 여러 가지 방법이 있습니다. 이 페이지에서는 사용 가능한 각 옵션, 사용 사례 및 많은 리다이렉트를 관리하는 방법을 설명합니다.

| API                                                          | 목적                                     | 위치                  | 상태 코드                  |
| ------------------------------------------------------------ | ---------------------------------------- | --------------------- | -------------------------- |
| [useRouter](#userouter-hook)                                 | 클라이언트 사이드 네비게이션 실행        | 구성요소              | N/A                        |
| [next.config.js](#redirects-in-nextconfigjs)                 | 경로를 기반으로 들어오는 요청을 리디렉트 | `next.config.js` 파일 | 307 (임시) 또는 308 (영구) |
| [NextResponse.redirect](#nextresponseredirect-in-middleware) | 조건에 따라 들어오는 요청을 리디렉트     | 미들웨어              | 아무거나                   |

## useRouter() 훅

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

컴포넌트 내에서 리디렉션해야 하는 경우 useRouter 훅의 push 메서드를 사용할 수 있어요. 예를 들어:

```typescript
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
```

> 알아두면 좋아요:
> 사용자를 프로그래밍적으로 이동시킬 필요가 없는 경우 `Link` 컴포넌트를 사용하는 것이 좋아요.

추가 정보는 useRouter API 레퍼런스를 확인해보세요.

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

## next.config.js에서의 리다이렉트

next.config.js 파일의 리다이렉트 옵션을 사용하면 들어오는 요청 경로를 다른 목적지 경로로 리다이렉트할 수 있습니다. 이는 페이지의 URL 구조를 변경하거나 미리 알고 있는 리다이렉트 목록이 있는 경우 유용합니다.

리다이렉트는 경로(path), 헤더(header), 쿠키(cookie), 쿼리(query) 매칭을 지원하여 들어오는 요청에 기반해 사용자를 리다이렉트할 수 있는 유연성을 제공합니다.

리다이렉트를 사용하려면 next.config.js 파일에 옵션을 추가하세요.

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
module.exports = {
  async redirects() {
    return [
      // 기본 리디렉션
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      // 와일드카드 경로 일치
      {
        source: "/blog/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
    ];
  },
};
```

추가 정보를 위해 리디렉션 API 참조를 확인해보세요.

> 알아두면 좋은 점:
> 리디렉션은 permanent 옵션과 함께 307 (임시 리디렉션) 또는 308 (영구적 리디렉션) 상태 코드를 반환할 수 있습니다.
> 리디렉션은 플랫폼에 제한이 있을 수 있습니다. 예를 들어, Vercel의 경우 1,024개의 리디렉션 제한이 있습니다. 많은 수의 리디렉션(1000개 이상)을 관리하려면 Middleware를 사용하여 커스텀 솔루션을 만들어 보세요. 추가 정보는 대규모 리디렉션 관리를 확인하세요.
> 리디렉션은 Middleware보다 먼저 실행됩니다.

## Middleware에서의 NextResponse.redirect

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

미들웨어는 요청이 완료되기 전에 코드를 실행할 수 있게 해줍니다. 그런 다음 수신된 요청을 기반으로 NextResponse.redirect를 사용하여 다른 URL로 리다이렉트할 수 있습니다. 이것은 조건에 따라 사용자를 리디렉션하거나(예: 인증, 세션 관리 등) 또는 많은 수의 리디렉션을 가지고 있는 경우 유용합니다.

예를 들어, 사용자가 인증되어 있지 않은 경우 /login 페이지로 리디렉트하려면 다음과 같이 하면 됩니다:

```typescript
import { NextResponse, NextRequest } from "next/server";
import { authenticate } from "auth-provider";

export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request);

  // 사용자가 인증되어 있을 경우 정상적으로 계속 진행
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // 인증되어 있지 않은 경우 로그인 페이지로 리디렉트
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/dashboard/:path*",
};
```

> 알아두면 좋은 사항:
> 미들웨어는 next.config.js에서 리디렉트 후에 실행되며 렌더링 전에 실행됩니다.

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

미들웨어 문서에서 더 많은 정보를 확인해보세요.

### 대규모 리디렉션 관리하기 (고급)

대량의 리디렉션(1000개 이상)을 관리하려면, 미들웨어를 사용하여 사용자 정의 솔루션을 만들어보는 것이 좋습니다. 이를 통해 애플리케이션을 다시 배포할 필요 없이 프로그래밍 방식으로 리디렉션을 처리할 수 있습니다.

이를 수행하려면, 다음을 고려해야 합니다:

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

- 리디렉트 맵을 만들고 저장하기.
- 데이터 조회 성능 최적화.

> Next.js 예시: 블룸 필터와 함께 미들웨어를
> 사용하여 아래 추천 사항을 구현한 예제를 보십시오.

### 1. 리디렉트 맵 만들고 저장하기

리디렉트 맵은 보통 데이터베이스(일반적으로 키-값 저장소)나 JSON 파일에 저장할 수 있는 리디렉트 목록입니다.

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

다음 데이터 구조를 고려해보세요:

```js
{
  "/old": {
    "destination": "/new",
    "permanent": true
  },
  "/blog/post-old": {
    "destination": "/blog/post-new",
    "permanent": true
  }
}
```

Middleware에서는 Vercel의 Edge Config나 Redis와 같은 데이터베이스에서 데이터를 읽어오고,
들어오는 요청을 기반으로 사용자를 리디렉션할 수 있습니다.

```typescript
import { NextResponse, NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const redirectData = await get(pathname);

  if (redirectData && typeof redirectData === "string") {
    const redirectEntry: RedirectEntry = JSON.parse(redirectData);
    const statusCode = redirectEntry.permanent ? 308 : 307;
    return NextResponse.redirect(redirectEntry.destination, statusCode);
  }

  // 리다이렉션이 없는 경우, 리다이렉션 없이 계속 진행
  return NextResponse.next();
}
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

### 2. 데이터 조회 성능 최적화

매번 들어오는 요청마다 대량의 데이터셋을 읽는 것은 느리고 비싸다. 데이터 조회 성능을 최적화하는 두 가지 방법이 있습니다:

- 빠른 조회를 위해 최적화된 데이터베이스를 사용하거나 Redis와 같은 것을 활용합니다.
- 더 큰 리디렉션 파일이나 데이터베이스를 읽기 전에 리디렉션이 있는지 효율적으로 확인하기 위해 블룸 필터와 같은 데이터 조회 전략을 사용합니다.

이전 예제를 고려해보면, Middleware에 생성된 블룸 필터 파일을 가져와 들어오는 요청 경로명이 블룸 필터에 있는지 확인할 수 있습니다.

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

그렇다면, 사용자에게 적절한 URL로 리디렉션해주기 위해 실제 파일을 확인하고 API Routes로 요청을 전달합니다. 이렇게 함으로써 Middleware에 큰 리디렉션 파일을 가져오는 것을 피할 수 있어서 모든 요청을 늦출 수 있는 문제를 방지할 수 있어요.

Markdown 형식으로 표를 변경해보겠습니다.

```typescript
import { NextResponse, NextRequest } from "next/server";
import { ScalableBloomFilter } from "bloom-filters";
import GeneratedBloomFilter from "./redirects/bloom-filter.json";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

// Initialize bloom filter from a generated JSON file
const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any);

export async function middleware(request: NextRequest) {
  // Get the path for the incoming request
  const pathname = request.nextUrl.pathname;

  // Check if the path is in the bloom filter
  if (bloomFilter.has(pathname)) {
    // Forward the pathname to the Route Handler
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    );

    try {
      // Fetch redirect data from the Route Handler
      const redirectData = await fetch(api);

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined = await redirectData.json();

        if (redirectEntry) {
          // Determine the status code
          const statusCode = redirectEntry.permanent ? 308 : 307;

          // Redirect to the destination
          return NextResponse.redirect(redirectEntry.destination, statusCode);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // No redirect found, continue the request without redirecting
  return NextResponse.next();
}
```

그리고 API Route에서는 다음과 같습니다:

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import redirects from "@/app/redirects/redirects.json";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pathname = req.query.pathname;
  if (!pathname) {
    return res.status(400).json({ message: "Bad Request" });
  }

  // Get the redirect entry from the redirects.json file
  const redirect = (redirects as Record<string, RedirectEntry>)[pathname];

  // Account for bloom filter false positives
  if (!redirect) {
    return res.status(400).json({ message: "No redirect" });
  }

  // Return the redirect entry
  return res.json(redirect);
}
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

> 좋은 정보:
> 블룸 필터를 생성하려면 bloom-filters와 같은 라이브러리를 사용할 수 있어요.
> Route Handler에 요청을 유효성 검사하여 악의적인 요청을 방지해야 해요.

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
