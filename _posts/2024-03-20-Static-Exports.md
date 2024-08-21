---
title: "Nextjs 14 정적 사이트 export 하는 방법"
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

# Nextjs 14 정적 사이트 export 하는 방법

Next.js를 사용하면 정적 사이트 또는 Single-Page Application (SPA)으로 시작한 다음 나중에 서버가 필요한 기능을 사용하기로 선택적 업그레이드할 수 있습니다.
`next build`를 실행하면 Next.js가 각 루트마다 HTML 파일을 생성합니다. 엄격한 SPA를 개별 HTML 파일로 분할함으로써 Next.js는 클라이언트 측에서 불필요한 JavaScript 코드를 로드하지 않아도 되어 번들 크기를 줄이고 페이지 로드 속도를 높일 수 있습니다.
Next.js는 이 정적 익스포트를 지원하기 때문에 HTML/CSS/JS 정적 에셋을 제공할 수 있는 웹 서버에 배포하고 호스팅할 수 있습니다.

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

## 구성

정적 익스포트를 활성화하려면 next.config.js 내의 출력 모드를 변경하세요:

```js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // 선택 사항: 링크 `/me` -> `/me/`로 변경하고 `/me.html` -> `/me/index.html`로 출력
  // trailingSlash: true,
  // 선택 사항: 자동으로 `/me` -> `/me/`을 방지하고 대신 `href`를 유지합니다
  // skipTrailingSlashRedirect: true,
  // 선택 사항: 출력 디렉토리를 `dist`로 변경합니다
  // distDir: 'dist',
};

module.exports = nextConfig;
```

Next.js를 실행한 후, 어플리케이션을 위한 HTML/CSS/JS 자산을 포함하는 out 폴더가 생산됩니다.

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

## 지원되는 기능

Next.js의 핵심은 정적 익스포트를 지원하도록 설계되었습니다.

### 서버 구성 요소

next build를 실행하여 정적 익스포트를 생성할 때 앱 디렉토리 내에서 사용되는 서버 구성 요소(Server Components)는 빌드 중에 실행되며, 기존 정적 사이트 생성과 유사합니다.

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

결과 컴포넌트는 초기 페이지로드를 위해 정적 HTML로 렌더링되며 클라이언트가 라우트간에 이동할 때 정적 페이로드로 제공됩니다. 정적 익스포트를 사용할 때 서버 컴포넌트에 대한 변경 사항은 필요하지 않습니다. 단, 동적 서버 함수를 사용하는 경우에는 예외입니다.

```typescript
export default async function Page() {
  // 이 fetch는 `next build` 중에 서버에서 실행됩니다
  const res = await fetch("https://api.example.com/...");
  const data = await res.json();

  return <main>...</main>;
}
```

### 클라이언트 컴포넌트

클라이언트에서 데이터를 가져오려면 SWR로 요청을 메모이즈하는 클라이언트 컴포넌트를 사용할 수 있습니다.

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
"클라이언트 사용";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Page() {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts/1`, fetcher);
  if (error) return "로드하는 데 실패했습니다";
  if (!data) return "로딩 중...";

  return data.title;
}
```

경로 전환은 클라이언트 측에서 발생하기 때문에 이것은 전통적인 SPA처럼 동작합니다. 예를 들어, 다음 인덱스 경로를 통해 클라이언트에서 다른 게시물로 이동할 수 있습니다:

```typescript
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>인덱스 페이지</h1>
      <hr />
      <ul>
        <li>
          <Link href="/post/1">게시물 1</Link>
        </li>
        <li>
          <Link href="/post/2">게시물 2</Link>
        </li>
      </ul>
    </>
  );
}
```

### 이미지 최적화

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

next/image를 통해 이미지 최적화를 할 때는 next.config.js에서 사용자 정의 이미지 로더를 정의하여 정적 익스포트와 함께 사용할 수 있습니다. 예를 들어, Cloudinary와 같은 서비스로 이미지를 최적화할 수 있습니다:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./my-loader.ts",
  },
};

module.exports = nextConfig;
```

이 사용자 정의 로더는 원격 소스에서 이미지를 가져오는 방법을 정의할 것입니다. 아래 예시는 Cloudinary를 위한 URL을 구성하는 로더를 보여줍니다:

```typescript
export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/demo/image/upload/${params.join(",")}${src}`;
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

이제 클라우드니어리 이미지의 상대 경로를 정의하여 애플리케이션에서 next/image를 사용할 수 있습니다:

```typescript
import Image from "next/image";

export default function Page() {
  return <Image alt="turtles" src="/turtles.jpg" width={300} height={300} />;
}
```

### 라우트 핸들러

라우트 핸들러는 next build를 실행할 때 정적 응답을 렌더링합니다. GET HTTP 동사만 지원됩니다. 이를 사용하여 캐시된 또는 캐시되지 않은 데이터로부터 정적 HTML, JSON, TXT 또는 기타 파일을 생성할 수 있습니다. 예를 들어:

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

위의 파일인 app/data.json/route.ts은 다음 빌드 중에 정적 파일로 렌더링되어 data.json 파일을 생성합니다. 그 안에는 { name: 'Lee' }가 포함됩니다. 만약 들어오는 요청에서 동적 값들을 읽어야 한다면, 정적 익스포트를 사용할 수 없습니다.

### 브라우저 API들

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

클라이언트 컴포넌트는 다음 빌드 중에 HTML로 사전 렌더링됩니다. 서버에서는 window, localStorage, navigator와 같은 웹 API가 사용할 수 없기 때문에 러닝 중에는 브라우저에서만 안전하게 이러한 API에 접근해야 합니다. 예를 들어:

```js
'use client';

import { useEffect } from 'react';

export default function ClientComponent() {
  useEffect(() => {
    // 이제 `window`에 접근할 수 있습니다.
    console.log(window.innerHeight);
  }, [])

  return ...;
}
```

## 지원되지 않는 기능

Node.js 서버를 필요로 하는 기능이거나 빌드 프로세스 중에 계산할 수 없는 다이나믹한 로직은 지원되지 않습니다:

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

- 동적 매개변수를 사용하는 동적 경로 설정: true
- generateStaticParams() 없이 동적 경로 설정
- Request를 의존하는 Route Handlers
- Cookies
- 다시 쓰기
- 리다이렉트
- 헤더
- 미들웨어
- 점진적 정적 재생성
- 기본 로더를 이용한 이미지 최적화
- 드래프트 모드
  위 기능 중 어떤 것이라도 next dev를 사용하려고 하면, 루트 레이아웃에서 dynamic 옵션을 error로 설정한 것과 유사한 오류가 발생합니다.

```js
export const dynamic = "error";
```

## 배포

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

Next.js의 정적 익스포트를 통해, HTML/CSS/JS 정적 에셋을 제공할 수 있는 모든 웹 서버에 Next.js를 배포하고 호스팅할 수 있습니다.
`next build`를 실행하면, Next.js는 정적 익스포트를 `out` 폴더에 생성합니다. 예를 들어, 다음과 같은 루트가 있다고 가정해보겠습니다:

- /
- /blog/[id]
  `next build`를 실행하면, Next.js는 다음과 같은 파일을 생성합니다:

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

- /out/index.html
- /out/404.html
- /out/blog/post-1.html
- /out/blog/post-2.html 이렇게 정적 호스트(Nginx 같은)를 사용하고 계신다면, 들어오는 요청을 올바른 파일로 재지정할 수 있어요:

```js
server {
  listen 80;
  server_name acme.com;

  root /var/www/out;

  location / {
      try_files $uri $uri.html $uri/ =404;
  }

  # 이 부분은 `trailingSlash: false`로 설정한 경우 필요해요.
  # `trailingSlash: true`인 경우 생략할 수 있어요.
  location /blog/ {
      rewrite ^/blog/(.*)$ /blog/$1.html break;
  }

  error_page 404 /404.html;
  location = /404.html {
      internal;
  }
}
```

## 버전 히스토리

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

| Version   | Changes                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `v14.0.0` | `next export`가 <code>"output": "export"</code>으로 대체되어 제거되었습니다.                                         |
| `v13.4.0` | App Router (Stable)이 향상된 정적 내보내기 지원을 추가했습니다. React Server Components 및 Route Handlers 사용 가능. |
| `v13.3.0` | `next export`가 폐기되고 <code>"output": "export"</code>으로 대체되었습니다.                                         |

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
