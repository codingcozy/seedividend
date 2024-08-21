---
title: "Nextjs 14에서 특정 페이지 캐시 날리는 방법revalidatePath"
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

# Nextjs 14에서 특정 페이지 캐시 날리는 방법(revalidatePath)

revalidatePath을 사용하면 지정된 경로에 대해 캐시된 데이터를 필요할 때 지울 수 있습니다.

> 알아두면 좋은 사항:
> revalidatePath은 Node.js 및 Edge 런타임에서 모두 사용할 수 있습니다.
> revalidatePath은 포함된 경로가 다음에 방문될 때만 캐시를 무효화합니다. 이는 동적 경로 세그먼트와 함께 revalidatePath를 호출해도 즉시 많은 재검증을 트리거하지 않는다는 것을 의미합니다. 무효화는 해당 경로가 다음에 방문될 때에만 발생합니다.
> 현재 revalidatePath는 클라이언트 측 라우터 캐시의 모든 경로를 무효화합니다. 이 동작은 일시적이며 앞으로 특정 경로에만 적용되도록 업데이트될 예정입니다.
> revalidatePath를 사용하면 서버 측 라우트 캐시에서만 특정 경로를 무효화합니다.

## 매개변수

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
revalidatePath(path: string, type?: 'page' | 'layout'): void;
```

- path: 데이터를 재유효화하려는 파일 시스템 경로를 나타내는 문자열(예: /product/[slug]/page) 또는 리터럴 경로 세그먼트(예: /product/123) 중 하나입니다. 1024자보다 작아야 합니다. 이 값은 대소문자를 구분합니다.
- type: (선택 사항) 경로 유형을 변경하는 데 사용되는 `page` 또는 `layout` 문자열입니다. 경로에 동적 세그먼트가 포함된 경우(예: /product/[slug]/page), 이 매개변수는 필수입니다.

## 반환값

revalidatePath 함수는 어떤 값도 반환하지 않습니다.

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

## 예시

### 특정 URL 다시 유효성 검사하기

```js
import { revalidatePath } from "next/cache";
revalidatePath("/blog/post-1");
```

다음 페이지 방문 시 특정 URL을 다시 유효성 검사할 수 있습니다.

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

### 페이지 경로 다시 유효성 검사하기

```js
import { revalidatePath } from "next/cache";
revalidatePath("/blog/[slug]", "page");
// 또는 경로 그룹을 사용하는 경우
revalidatePath("/(main)/post/[slug]", "page");
```

이 코드는 다음 페이지 방문 시 제공된 페이지 파일과 일치하는 모든 URL을 다시 유효성 검사합니다. 이는 특정 페이지 아래에 있는 페이지는 무효화하지 않습니다. 예를 들어, /blog/[slug]는 /blog/[slug]/[author]을 무효화하지 않습니다.

### 레이아웃 경로 다시 유효성 검사하기

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
import { revalidatePath } from "next/cache";
revalidatePath("/blog/[slug]", "layout");
// 또는 라우트 그룹을 사용하여
revalidatePath("/(main)/post/[slug]", "layout");
```

다음 페이지 방문시 제공된 레이아웃 파일과 일치하는 URL을 재유효화합니다. 이는 동일한 레이아웃을 가진 하위 페이지가 다음 방문 시 재유효화되도록 합니다. 예를 들어, 위의 경우에는 /blog/[slug]/[another]도 다음 방문 시 재유효화됩니다.

### 모든 데이터 재유효화

```js
import { revalidatePath } from "next/cache";

revalidatePath("/", "layout");
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

다음 페이지 방문 시 클라이언트 측 라우터 캐시를 퍼지하고 데이터 캐시를 재유효화합니다.

### 서버 동작

```typescript
"use server";

import { revalidatePath } from "next/cache";

export default async function submit() {
  await submitForm();
  revalidatePath("/");
}
```

### 라우트 핸들러

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
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "재검증할 경로가 누락되었습니다",
  });
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
