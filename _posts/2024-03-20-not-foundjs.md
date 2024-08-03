---
title: "Nextjs 14에서 not found 페이지 처리하는 방법not-foundjs"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14에서 not found 페이지 처리하는 방법(not-found.js)

not-found 파일은 루트 세그먼트 내에서 notFound 함수가 throw될 때 UI를 렌더링하는 데 사용됩니다. 커스텀 UI를 제공할 뿐만 아니라 Next.js는 스트림된 응답에 대해 200 HTTP 상태 코드를 반환하고, 스트림되지 않은 응답에 대해 404를 반환합니다.

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>요청한 리소스를 찾을 수 없습니다.</p>
      <Link href="/">홈 화면으로 돌아가기</Link>
    </div>
  );
}
```

> 유용한 정보: 예상되는 notFound() 오류를 캐치하는 것 외에도, 루트 app/not-found.js 파일은 전체 애플리케이션의 일치하지 않는 URL을 처리합니다. 이는 앱이 처리하지 않는 URL을 방문한 사용자에게 app/not-found.js 파일에 의해 내보낸 UI가 표시된다는 것을 의미합니다.

<div class="content-ad"></div>

## 속성

not-found.js 컴포넌트는 어떤 속성도 받아들이지 않습니다.

## 데이터 가져오기

기본적으로, not-found은 서버 컴포넌트입니다. 데이터를 가져와서 표시하려면 async로 표시할 수 있습니다:

<div class="content-ad"></div>

```typescript
import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");
  const data = await getSiteData(domain);
  return (
    <div>
      <h2>찾을 수 없음: {data.name}</h2>
      <p>요청한 리소스를 찾을 수 없습니다</p>
      <p>
        <Link href="/blog">모든 게시물</Link>을 보실 수 있습니다
      </p>
    </div>
  );
}
```

만약 usePathname과 같은 클라이언트 컴포넌트 후크를 사용하여 경로에 따라 콘텐츠를 표시해야 한다면, 클라이언트 측에서 데이터를 가져와야 합니다.

## 버전 히스토리

| 버전      | 변경 내용                                                   |
| --------- | ----------------------------------------------------------- |
| `v13.3.0` | Root `app/not-found`가 전역 일치하지 않는 URL을 처리합니다. |
| `v13.0.0` | `not-found`가 도입되었습니다.                               |

<div class="content-ad"></div>
