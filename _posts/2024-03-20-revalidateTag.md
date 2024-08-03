---
title: "Nextjs 14에서 특정 태그에 대한 캐시 날리는 방법revalidateTag"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# revalidateTag

revalidateTag을 사용하면 특정 캐시 태그에 대해 필요할 때 캐시된 데이터를 제거할 수 있습니다.

> 알아 두면 좋은 점:
> revalidateTag은 Node.js 및 Edge 런타임에서 모두 사용할 수 있습니다.
> revalidateTag은 경로가 다음에 방문될 때만 캐시를 무효화합니다. 이는 동적 경로 세그먼트와 함께 revalidateTag을 호출하면 즉시 많은 다시 유효화가 발생하지 않는다는 것을 의미합니다. 무효화는 경로가 다음에 방문될 때에만 발생합니다.

## 매개변수

<div class="content-ad"></div>

```js
revalidateTag(tag: string): void;
```

- tag: 데이터를 다시 유효화하려는 캐시 태그를 나타내는 문자열입니다. 256자 이하이어야 합니다. 대소문자를 구분합니다.

다음과 같이 태그를 추가할 수 있습니다:

```js
fetch(url, { next: { tags: [...] } });
```

<div class="content-ad"></div>

## 반환값

revalidateTag은 어떤 값도 반환하지 않습니다.

## 예시

### 서버 작업

<div class="content-ad"></div>

```typescript
"사용자 정의 서버";

import { revalidateTag } from "next/cache";

export default async function submit() {
  await addPost();
  revalidateTag("posts");
}
```

### Route Handler

```typescript
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag);
  return Response.json({ revalidated: true, now: Date.now() });
}
```

<div class="content-ad"></div>
