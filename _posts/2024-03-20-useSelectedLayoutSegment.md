---
title: "Nextjs 14 클라이언트 컴포넌트에서 현재 라우트 정보 가져오는 방법"
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

# Nextjs 14 클라이언트 컴포넌트에서 현재 라우트 정보 가져오는 방법

useSelectedLayoutSegment는 클라이언트 컴포넌트 후크로, 해당 컴포넌트에서 호출된 레이아웃 아래 레벨의 활성 라우트 세그먼트를 읽을 수 있게 해줍니다.

부모 레이아웃 내의 탭과 같은 내비게이션 UI에 유용하며, 활성 자식 세그먼트에 따라 스타일이 변경되는 경우에 사용할 수 있습니다.

```typescript
"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment();

  return <p>활성 세그먼트: {segment}</p>;
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

> 알아두면 좋은 사항:
> useSelectedLayoutSegment은 클라이언트 컴포넌트 후크이며, 레이아웃은 기본적으로 서버 컴포넌트이므로 useSelectedLayoutSegment는 일반적으로 레이아웃으로 가져온 클라이언트 컴포넌트를 통해 호출됩니다.
> useSelectedLayoutSegment는 한 수준 아래의 세그먼트만 반환합니다. 모든 활성 세그먼트를 반환하려면 useSelectedLayoutSegments를 참조하십시오.

## 매개변수

```js
const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
```

useSelectedLayoutSegment은 선택 사항으로 parallelRoutesKey를 허용하며, 해당 슬롯 내에서 활성 경로 세그먼트를 읽을 수 있습니다.

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

## 반환값

useSelectedLayoutSegment 함수는 활성 세그먼트의 문자열을 반환하거나 세그먼트가 없는 경우 null을 반환합니다.

예를 들어, 아래 레이아웃과 URL이 주어졌을 때, 반환되는 세그먼트는 다음과 같습니다:

| 레이아웃                  | 방문한 URL                     | 반환된 세그먼트 |
| ------------------------- | ------------------------------ | --------------- |
| `app/layout.js`           | `/`                            | `null`          |
| `app/layout.js`           | `/dashboard`                   | `'dashboard'`   |
| `app/dashboard/layout.js` | `/dashboard`                   | `null`          |
| `app/dashboard/layout.js` | `/dashboard/settings`          | `'settings'`    |
| `app/dashboard/layout.js` | `/dashboard/analytics`         | `'analytics'`   |
| `app/dashboard/layout.js` | `/dashboard/analytics/monthly` | `'analytics'`   |

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

### 활성 링크 컴포넌트 만들기

useSelectedLayoutSegment를 사용하여 활성 세그먼트에 따라 스타일이 변경되는 활성 링크 컴포넌트를 만들 수 있습니다. 예를 들어, 블로그의 사이드바에 특집 포스트 목록을 표시하는 경우:

```typescript
"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

// 이 *client* 컴포넌트는 블로그 레이아웃으로 가져올 수 있습니다
export default function BlogNavLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  // `/blog/hello-world`로 이동시 'hello-world'를 선택된 레이아웃 세그먼트로 반환
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/blog/${slug}`}
      // 링크가 활성 상태인지에 따라 스타일 변경
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </Link>
  );
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
// 클라이언트 컴포넌트를 부모 레이아웃(Server 컴포넌트)에 가져오기
import { BlogNavLink } from "./blog-nav-link";
import getFeaturedPosts from "./get-featured-posts";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const featuredPosts = await getFeaturedPosts();
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  );
}
```

## 버전 기록

| 버전      | 변경 내역                       |
| --------- | ------------------------------- |
| `v13.0.0` | `useSelectedLayoutSegment` 도입 |

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
