---
title: "Nextjs 14 데이터 fetching, 캐싱, revalidating"
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

# Nextjs 14 데이터 fetching, 캐싱, revalidating

# 데이터 가져오기, 캐싱 및 재검증

데이터 가져오기는 모든 애플리케이션의 핵심 부분입니다. 이 페이지에서는 React 및 Next.js에서 데이터를 가져오고 캐시하고 재검증하는 방법에 대해 알아봅니다.

데이터를 가져오는 네 가지 방법이 있습니다:

- 서버에서 fetch를 사용하여
- 서버에서 제3자 라이브러리를 사용하여
- 클라이언트에서 Route Handler를 통해
- 클라이언트에서 제3자 라이브러리를 사용하여

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

## fetch를 사용하여 서버에서 데이터 가져오기

Next.js는 서버에서 각 fetch 요청에 대한 캐싱 및 재검증 동작을 구성할 수 있도록 기본 fetch Web API를 확장합니다. React는 fetch를 확장하여 React 컴포넌트 트리를 렌더링하는 동안 fetch 요청을 자동으로 메모이즈합니다.

fetch를 async/await와 함께 Server Components, Route Handlers 및 Server Actions에서 사용할 수 있습니다.

예를 들어:

```typescript
async function getData() {
  const res = await fetch("https://api.example.com/...");
  // 반환 값은 직렬화되지 않습니다
  // Date, Map, Set 등을 반환할 수 있습니다.

  if (!res.ok) {
    // 가장 가까운 'error.js' 에러 바운더리가 활성화됩니다
    throw new Error("데이터 가져오기 실패");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
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

> 알아두세요:
> Next.js는 Server Components에서 데이터를 가져올 때 유용한 함수를 제공합니다. 이 함수들은 쿠키와 헤더와 같은 요청 시간 정보에 의존하기 때문에 경로가 동적으로 렌더링됩니다.
> Route Handler에서는 fetch 요청이 메모이즈되지 않습니다. Route Handler는 React 컴포넌트 트리의 일부가 아니기 때문입니다.
> Server Actions에서는 fetch 요청이 캐시되지 않습니다 (기본값: 캐시 없음).
> TypeScript로 Server Component에서 async/await를 사용하려면 TypeScript 5.1.3 이상 및 @types/react 18.2.8 이상을 사용해야 합니다.

### 데이터 캐싱

캐싱은 데이터를 매번 데이터 소스에서 다시 가져 오지 않고 저장하는 것을 의미합니다.

기본적으로 Next.js는 서버의 데이터 캐시에 fetch의 반환 값을 자동으로 캐시합니다. 이는 데이터가 빌드 시간이나 요청 시간에 가져와 캐시되어 각 데이터 요청에 재사용될 수 있음을 의미합니다.

```js
// 'force-cache'는 기본값이며 생략할 수 있습니다
fetch("https://...", { cache: "force-cache" });
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

그러나 예외가 있습니다. fetch 요청은 다음과 같은 경우에 캐시되지 않습니다.

- Server Action 내에서 사용될 때
- POST 메서드를 사용하는 Route Handler 내에서 사용될 때

> 데이터 캐시란?
> 데이터 캐시는 영구적인 HTTP 캐시입니다. 플랫폼에 따라 캐시는 자동으로 확장되고 여러 지역에서 공유될 수 있습니다.
> 데이터 캐시에 대해 더 알아보세요.

### 데이터 재검증

재검증은 데이터 캐시를 제거하고 최신 데이터를 다시 가져오는 프로세스입니다. 데이터가 변경되고 최신 정보를 표시하려는 경우 유용합니다.

캐시된 데이터는 두 가지 방법으로 재검증될 수 있습니다.

- 시간 기반 재검증: 리소스의 캐시 수명을 설정하여 일정 시간이 지난 후 데이터를 자동으로 재검증합니다. 이는 데이터가 드물게 변경되고 신선도가 중요하지 않을 때 유용합니다.
- 요청 기반 재검증: 이벤트(예: 양식 제출)에 따라 데이터를 수동으로 재검증합니다. 요청 기반 재검증은 한 번에 여러 데이터 그룹을 재검증하도록 태그 기반이나 경로 기반 접근 방식을 사용할 수 있습니다. 내용이 업데이트되었을 때 가능한 빨리 최신 데이터가 표시되도록 할 때 유용합니다(예: 헤드리스 CMS에서 콘텐츠가 업데이트될 때).

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

#### 시간 기반 재검증

특정 간격으로 데이터를 재검증하려면 fetch의 next.revalidate 옵션을 사용하여 리소스의 캐시 수명을 설정할 수 있습니다(초 단위).

```js
fetch("https://...", { next: { revalidate: 3600 } });
```

또는 라우트 세그먼트의 모든 fetch 요청을 재검증하려면 Segment Config 옵션을 사용할 수 있습니다.

```js
export const revalidate = 3600; // 최대 한 시간마다 재검증
```

정적으로 렌더링된 라우트에 여러 fetch 요청이 있고 각각이 다른 재검증 빈도를 가지고 있는 경우 가장 낮은 시간이 모든 요청에 대해 사용됩니다. 동적으로 렌더링된 라우

트의 경우 각 fetch 요청은 독립적으로 재검증됩니다.

시간 기반 재검증에 대해 더 알아보세요.

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

#### 요청 기반 재검증

데이터는 Server Action 또는 Route Handler 내에서 경로(revalidatePath) 또는 캐시 태그(revalidateTag)별로 재검증될 수 있습니다.

Next.js에는 라우트 간에 fetch 요청을 무효화하는 캐시 태그 시스템이 있습니다.

- fetch를 사용할 때 하나 이상의 태그로 캐시 항목을 태그 지정할 수 있습니다.
- 그런 다음 revalidateTag를 호출하여 해당 태그와 관련된 모든 항목을 재검증할 수 있습니다.

예를 들어, 다음 fetch 요청은 캐시 태그 collection으로 태그 지정됩니다:

```typescript
export default async function Page() {
  const res = await fetch("https://...", { next: { tags: ["collection"] } });
  const data = await res.json();
  // ...
}
```

그런 다음 Server Action에서 collection 태그로 태그 지정된 이 fetch 호출을 revalidateTag를 호출하여 재검증할 수 있습니다:

```typescript
"use server";

import { revalidateTag } from "next/cache";

export default async function action() {
  revalidateTag("collection");
}
```

요청 기반 재검증에 대해 더 알아보세요.

#### 오류 처리 및 재검증

데이터를 재검증하려고 시도하는 동안 오류가 발생하면 마지막으로 성공적으로 생성된 데이터가 캐시에서 계속 제공됩니다. 다음 요청에서 Next.js는 데이터를 다시 재검증하기 위해 재시도합니다.

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

### 데이터 캐싱 비활성화

fetch 요청은 다음과 같은 경우에 캐시되지 않습니다.

- cache: `no-store`가 fetch 요청에 추가되었을 때.
- 개별 fetch 요청에 revalidate: 0 옵션이 추가되었을 때.
- POST 메서드를 사용하는 Router Handler 내에 fetch 요청이 있을 때.
- 헤더나 쿠키를 사용한 후에 fetch 요청이 있을 때.
- const dynamic = `force-dynamic` 라우트 세그먼트 옵션이 사용되었을 때.
- fetchCache 라우트 세그먼트 옵션이 기본적으로 캐시를 건너 뛰도록 구성되었을 때.
- fetch 요청이 Authorization이나 Cookie 헤더를 사용하고 컴포넌트 트리에서 위에 캐시되지 않은 요청이 있을 때.

#### 개별 fetch 요청

개별 fetch 요청의 캐싱을 비활성화하려면 fetch의 cache 옵션을 `no-store`로 설정할 수 있습니다. 이렇게 하면 모든 요청에 대해 동적으로 데이터를 가져올 수 있습니다.

```js
fetch("https://...", { cache: "no-store" });
```

fetch API 참조에서 사용 가능한 모든 캐시 옵션을 확인하세요.

#### 여러 fetch 요청

라우트 세그먼트(예: Layout 또는 Page)에 여러 fetch 요청이 있는 경우 세그먼트 구성 옵션을 사용하여 세그먼트 내의 모든 데이터 요청의 캐싱 동작을 구성할 수 있습니다.

그러나 각 fetch 요청의 캐싱 동작을 개별적으로 구성하는 것이 좋습니다. 이렇게 하면 캐싱 동작을 더 세밀하게 제어할 수 있습니다.

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

## 서버에서 제3자 라이브러리를 사용하여 데이터 가져오기

제3자 라이브러리를 사용하는 경우(fetch를 지원하거나 노출하지 않는 데이터베이스, CMS 또는 ORM 클라이언트와 같은 경우) Route Segment Config 옵션과 React의 cache 함수를 사용하여 해당 요청의 캐싱 및 재검증 동작을 구성할 수 있습니다.

데이터가 캐시되는지 여부는 세그먼트가 정적으로 또는 동적으로 렌더링되는지에 따라 달라집니다. 세그먼트가 정적(기본값)인 경우 요청의 출력이 라우트 세그먼트의 일부로 캐시되고 재검증됩니다. 세그먼트가 동적인 경우 요청의 출력이 캐시되지 않으며 세그먼트가 렌더링될 때마다 매번 다시 가져옵니다.

또한 실험적인 unstable_cache API를 사용할 수도 있습니다.

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

### 예시

아래 예시에서는:

- React의 cache 함수를 사용하여 데이터 요청을 메모이즈합니다.
- Layout 및 Page 세그먼트에서 revalidate 옵션이 3600으로 설정되어 있으며, 이는 데이터가 최대 한 시간마다 캐시되고 재검증됨을 의미합니다.

```typescript
import { cache } from "react";

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id });
  return item;
});
```

getItem 함수가 두 번 호출되더라도 데이터베이스에 대한 쿼리는 한 번만 실행됩니다.

```typescript
import { getItem } from "@/utils/get-item";

export const revalidate = 3600; // 최대 한 시간마다 데이터 재검증

export default async function Layout({ params: { id } }: { params: { id: string } }) {
  const item = await getItem(id);
  // ...
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

```typescript
import { getItem } from "@/utils/get-item";

export const revalidate = 3600; // 최대 한 시간마다 데이터 재검증

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const item = await getItem(id);
  // ...
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

## 라우트 핸들러를 사용하여 클라이언트에서 데이터 가져오기

클라이언트 컴포넌트에서 데이터를 가져와야 하는 경우 클라이언트에서 라우트 핸들러를 호출할 수 있습니다. 라우트 핸들러는 서버에서 실행되고 데이터를 클라이언트에 반환합니다. 이것은 API 토큰과 같은 민감한 정보를 클라이언트에 노출시키고 싶지 않을 때 유용합니다.

예제는 라우트 핸들러 문서를 참조하세요.

> 서버 컴포넌트와 라우트 핸들러
> 서버 컴포넌트는 서버에서 렌더링되기 때문에 데이터를 가져오기 위해 클라이언트에서 라우트 핸들러를 호출할 필요가 없습니다. 대신, 서버 컴포넌트 내에서 데이터를 직접 가져올 수 있습니다.

## 서드파티 라이브러리를 사용하여 클라이언트에서 데이터 가져오기

SWR 또는 TanStack Query와 같은 서드파티 라이브러리를 사용하여 클라이언트에서도 데이터를 가져올 수 있습니다. 이러한 라이브러리들은 요청을 메모이즈하고, 캐시하고, 재유효화하고, 데이터를 변경하는 데에 대한 자체 API를 제공합니다.

> 향후 API:
> use는 함수가 반환한 프로미스를 받아들이고 처리하는 React 함수입니다. fetch를 use로 래핑하는 것은 현재 클라이언트 컴포넌트에서 권장되지 않으며 여러 번의 다시 렌더링을 유발할 수 있습니다. use에 대해 더 알아보려면 React 문서를 참조하세요.
