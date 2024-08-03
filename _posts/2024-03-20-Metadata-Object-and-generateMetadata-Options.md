---
title: "Nextjs 14 메타데이터 설정하는 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 메타데이터 설정하는 방법 정리

이 페이지는 generateMetadata와 정적 메타데이터 객체와 함께 사용되는 모든 Config 기반 메타데이터 옵션을 다룹니다.

```typescript
import { Metadata } from "next";

// 정적 메타데이터
export const metadata: Metadata = {
  title: "...",
};

// 동적 메타데이터
export async function generateMetadata({ params }) {
  return {
    title: "...",
  };
}
```

> 알아두면 좋은 사실:
> 메타데이터 객체와 generateMetadata 함수는 서버 컴포넌트에서만 지원됩니다.
> 동일한 라우트 세그먼트에서 메타데이터 객체와 generateMetadata 함수를 모두 내보낼 수 없습니다.

<div class="content-ad"></div>

## 메타데이터 객체

정적 메타데이터를 정의하려면 layout.js 또는 page.js 파일에서 Metadata 객체를 내보내세요.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default function Page() {}
```

지원되는 옵션의 전체 목록을 보려면 메타데이터 필드를 참조하세요.

<div class="content-ad"></div>

## generateMetadata 함수

동적 메타데이터는 현재 라우트 매개변수, 외부 데이터 또는 상위 세그먼트에 있는 메타데이터와 같은 동적 정보에 따라 달라집니다. generateMetadata 함수를 내보내는 것으로 Metadata 객체를 반환할 수 있습니다.

```typescript
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // 라우트 매개변수 읽기
  const id = params.id;

  // 데이터 가져오기
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // 선택적으로 상위 메타데이터에 접근 및 확장(대체 대신)
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default function Page({ params, searchParams }: Props) {}
```

### 매개변수

<div class="content-ad"></div>

generateMetadata 함수는 다음과 같은 매개변수를 받습니다:

- props - 현재 라우트의 매개변수를 포함한 객체:
  params - root 세그먼트에서부터 generateMetadata가 호출된 세그먼트까지의 동적 라우트 매개변수 객체를 포함합니다. 예시:
  라우트 URL params
  app/shop/[slug]/page.js /shop/1 { slug: `1` }
  app/shop/[tag]/[item]/page.js /shop/1/2 { tag: `1`, item: `2` }
  app/shop/[...slug]/page.js /shop/1/2 { slug: [`1`, `2`] }
  searchParams - 현재 URL의 검색 매개변수를 포함한 객체입니다. 예시:
  URL searchParams
  /shop?a=1 { a: `1` }
  /shop?a=1&b=2 { a: `1`, b: `2` }
  /shop?a=1&a=2 { a: [`1`, `2`] }
- params - root 세그먼트에서부터 generateMetadata가 호출된 세그먼트까지의 동적 라우트 매개변수 객체를 포함합니다. 예시:
  라우트 URL params
  app/shop/[slug]/page.js /shop/1 { slug: `1` }
  app/shop/[tag]/[item]/page.js /shop/1/2 { tag: `1`, item: `2` }
  app/shop/[...slug]/page.js /shop/1/2 { slug: [`1`, `2`] }
- searchParams - 현재 URL의 검색 매개변수를 포함한 객체입니다. 예시:
  URL searchParams
  /shop?a=1 { a: `1` }
  /shop?a=1&b=2 { a: `1`, b: `2` }
  /shop?a=1&a=2 { a: [`1`, `2`] }
- parent - 상위 루트 세그먼트에서 해결된 메타데이터의 Promise입니다.

### 반환값

generateMetadata 함수는 하나 이상의 메타데이터 필드를 포함한 Metadata 객체를 반환해야 합니다.

<div class="content-ad"></div>

> 좋아 알아두기:
> 만약 메타데이터가 런타임 정보에 의존하지 않는다면, generateMetadata 대신 정적 메타데이터 객체를 사용하여 정의해야 합니다.
> generateMetadata를 통해 같은 데이터에 대한 fetch 요청은 generateStaticParams, 레이아웃, 페이지, 서버 컴포넌트 간에 자동으로 메모이제이션됩니다. fetch를 사용할 수 없는 경우 React 캐시를 사용할 수 있습니다.
> searchParams는 page.js 세그먼트에서만 사용할 수 있습니다.
> redirect() 및 notFound() Next.js 메서드를 generateMetadata 내에서도 사용할 수 있습니다.

## 메타데이터 필드

### title

title 속성은 문서의 제목을 설정하는데 사용됩니다. 간단한 문자열 또는 선택적 템플릿 객체로 정의할 수 있습니다.

<div class="content-ad"></div>

#### 문자열

```js
export const metadata = {
  title: "Next.js",
};
```

```js
<title>Next.js</title>
```

#### 템플릿 객체

<div class="content-ad"></div>

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "...",
    default: "...",
    absolute: "...",
  },
};
```

title.default은 제목을 정의하지 않은 하위 라우트 세그먼트에 대한 대체 제목을 제공하는 데 사용할 수 있습니다.

```js
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Acme",
  },
};
```

```js
import type { Metadata } from "next";

export const metadata: Metadata = {};

// 출력: <title>Acme</title>
```

<div class="content-ad"></div>

`title.template`은 자식 라우트 세그먼트에서 정의된 제목에 접두사 또는 접미사를 추가하는 데 사용할 수 있어요.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
    default: "Acme", // 템플릿을 생성할 때 기본 값이 필요해요
  },
};
```

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

// 결과: <title>About | Acme</title>
```

> 알아두면 좋아요:

- `title.template`은 자식 라우트 세그먼트에 적용되며, 선언하는 세그먼트에는 적용되지 않아요.
- `title.template`을 추가할 때는 반드시 `title.default`가 필요해요.
- layout.js에 정의된 `title.template`은 같은 라우트 세그먼트의 page.js에 정의된 제목에는 적용되지 않아요.
- page.js에 정의된 `title.template`은 페이지가 항상 종단 세그먼트이기 때문에 효과가 없어요(자식 라우트 세그먼트가 없어요).
- 라우트가 제목 또는 `title.default`를 정의하지 않은 경우 `title.template`은 효과가 없어요.

<div class="content-ad"></div>

title.absolute은 부모 세그먼트에서 설정한 title.template을 무시하는 제목을 제공하는 데 사용할 수 있습니다.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme",
  },
};
```

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "About",
  },
};

// 출력: <title>About</title>
```

> 알아두면 좋은 사항:
> layout.js
> title (문자열)과 title.default는 자체 제목을 정의하지 않는 하위 세그먼트에 대한 기본 제목을 정의합니다. 가장 가까운 부모 세그먼트의 title.template을 새롭게 보완합니다.
> title.absolute는 하위 세그먼트를 위해 기본 제목을 정의합니다. 부모 세그먼트의 title.template을 무시합니다.
> title.template은 자식 세그먼트를 위한 새로운 제목 템플릿을 정의합니다.
> page.js
> 페이지가 자체 제목을 정의하지 않는 경우, 가장 가까운 부모가 해결한 제목이 사용됩니다.
> title (문자열)은 경로의 제목을 정의합니다. 가장 가까운 부모 세그먼트의 title.template을 새롭게 보완합니다.
> title.absolute는 경로의 제목을 정의합니다. 부모 세그먼트의 title.template을 무시합니다.
> title.template은 페이지가 항상 경로의 종단 세그먼트이기 때문에 page.js에서 효과가 없습니다.

<div class="content-ad"></div>

### 설명

```js
export const metadata = {
  description: "웹을 위한 리액트 프레임워크",
};
```

```js
<meta name="description" content="웹을 위한 리액트 프레임워크" />
```

### 기본 필드

<div class="content-ad"></div>

```js
수출 대상 metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
```

```js
<meta name="application-name" content="Next.js" />
<meta name="author" content="Seb" />
<link rel="author" href="https://nextjs.org" />
<meta name="author" content="Josh" />
<meta name="generator" content="Next.js" />
<meta name="keywords" content="Next.js,React,JavaScript" />
<meta name="referrer" content="origin-when-cross-origin" />
<meta name="color-scheme" content="dark" />
<meta name="creator" content="Jiachi Liu" />
<meta name="publisher" content="Sebastian Markbåge" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
```

### metadataBase

metadataBase은 완전히 정규화된 URL이 필요한 metadata 필드를 위한 기본 URL 접두어를 설정하는 편의 옵션입니다.

<div class="content-ad"></div>

- metadataBase는 현재 route 세그먼트 및 그 아래에서 정의된 URL 기반 메타데이터 필드를, 필수적인 절대 URL 대신 상대 경로를 사용할 수 있도록 합니다.
- 필드의 상대 경로는 metadataBase와 결합되어 완전한 URL을 형성합니다.
- 구성되지 않은 경우, metadataBase는 자동으로 기본값으로 채워집니다.

```js
export const metadata = {
  metadataBase: new URL("https://acme.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    images: "/og-image.png",
  },
};
```

```js
<link rel="canonical" href="https://acme.com" />
<link rel="alternate" hreflang="en-US" href="https://acme.com/en-US" />
<link rel="alternate" hreflang="de-DE" href="https://acme.com/de-DE" />
<meta property="og:image" content="https://acme.com/og-image.png" />
```

> 알아 두면 좋은 사항:
> metadataBase는 일반적으로 루트 앱/layout.js에서 설정되어 모든 route에 걸쳐 URL 기반 메타데이터 필드에 적용됩니다.
> 절대 URL이 필요한 모든 URL 기반 메타데이터 필드는 metadataBase 옵션으로 구성할 수 있습니다.
> metadataBase에는 서브도메인(예: https://app.acme.com) 또는 베이스 경로(예: https://acme.com/start/from/here)를 포함시킬 수 있습니다.
> 메타데이터 필드가 절대 URL을 제공하는 경우, metadataBase는 무시됩니다.
> metadataBase를 구성하지 않고 URL 기반 메타데이터 필드에서 상대 경로를 사용하는 경우 빌드 오류가 발생할 수 있습니다.
> Next.js는 metadataBase(예: https://acme.com/)와 상대 필드(예: /path) 사이의 중복 슬래시를 단일 슬래시(예: https://acme.com/path)로 정규화합니다.

<div class="content-ad"></div>

#### 기본값

만약 설정이 되어있지 않다면, metadataBase에는 기본값이 있습니다.

- 만약 VERCEL_URL이 감지된다면: https://${process.env.VERCEL_URL} 그렇지 않으면 http://localhost:${process.env.PORT || 3000}로 떨어집니다.
- 기본값을 무시할 때는, URL을 계산하기 위해 환경 변수를 사용하는 것을 권장합니다. 이는 로컬 개발, 스테이징, 그리고 프로덕션 환경에 대한 URL을 구성할 수 있도록 합니다.

#### URL 구성

<div class="content-ad"></div>

URL 구성은 기본 디렉터리 이동 의미보다 개발자 의도를 우선합니다.

- metadataBase와 metadata 필드 사이에 슬래시가 있는 경우 정규화됩니다.
- metadata 필드에서 "절대" 경로(일반적으로 전체 URL 경로를 대체하는 위치)는 "상대" 경로(메타데이터베이스 끝에서 시작)로 처리됩니다.

예를 들어, 다음 metadataBase가 제공된 경우:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://acme.com"),
};
```

<div class="content-ad"></div>

위의 metadataBase를 상속하고 자체 값을 설정하는 모든 메타데이터 필드는 다음과 같이 해결됩니다:

| metadata 필드                     | 해결된 URL                       |
| --------------------------------- | -------------------------------- |
| `/`                               | `https://acme.com`               |
| `./`                              | `https://acme.com`               |
| `payments`                        | `https://acme.com/payments`      |
| `/payments`                       | `https://acme.com/payments`      |
| `./payments`                      | `https://acme.com/payments`      |
| `../payments`                     | `https://acme.com/payments`      |
| `https://beata.acme.com/payments` | `https://beta.acme.com/payments` |

### openGraph

```js
export const metadata = {
  openGraph: {
    title: "Next.js",
    description: "웹을 위한 리액트 프레임워크",
    url: "https://nextjs.org",
    siteName: "Next.js",
    images: [
      {
        url: "https://nextjs.org/og.png", // 반드시 절대 URL이어야 함
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // 반드시 절대 URL이어야 함
        width: 1800,
        height: 1600,
        alt: "내 맞춤 alt",
      },
    ],
    locale: "en_US",
    type: "웹사이트",
  },
};
```

<div class="content-ad"></div>

```js
---
title: "Next.js"
description: "웹을 위한 React 프레임워크"
---
```

```js
export const metadata = {
  openGraph: {
    title: "Next.js",
    description: "웹을 위한 React 프레임워크",
    type: "article",
    publishedTime: "2023-01-01T00:00:00.000Z",
    authors: ["Seb", "Josh"],
  },
};
```

```js
<meta property="og:title" content="Next.js" />
<meta property="og:description" content="웹을 위한 React 프레임워크" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2023-01-01T00:00:00.000Z" />
<meta property="article:author" content="Seb" />
<meta property="article:author" content="Josh" />
```

> 알아두면 좋아요:  
> Open Graph 이미지를 위한 파일 기반 메타데이터 API를 사용하는 것이 더 편리할 수 있습니다. 설정 내보내기와 실제 파일을 동기화하는 대신 파일 기반 API를 사용하면 자동으로 올바른 메타데이터가 생성됩니다.

<div class="content-ad"></div>

### 로봇

```js
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

```js
<meta name="robots" content="noindex, follow, nocache" />
<meta
  name="googlebot"
  content="index, nofollow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
/>
```

### 아이콘

<div class="content-ad"></div>

> 참고로: 가능한 경우 아이콘에 대한 파일 기반 Metadata API를 사용하는 것을 권장합니다. 실제 파일을 구성 내보내기와 동기화해야 하는 부담을 덜기 위해 파일 기반 API는 자동으로 올바른 메타데이터를 생성해 줍니다.

```js
export const metadata = {
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};
```

```js
<link rel="shortcut icon" href="/shortcut-icon.png" />
<link rel="icon" href="/icon.png" />
<link rel="apple-touch-icon" href="/apple-icon.png" />
<link
  rel="apple-touch-icon-precomposed"
  href="/apple-touch-icon-precomposed.png"
/>
```

```js
export const metadata = {
  icons: {
    icon: [{ url: "/icon.png" }, new URL("/icon.png", "https://example.com"), { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" }],
    shortcut: ["/shortcut-icon.png"],
    apple: [{ url: "/apple-icon.png" }, { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
};
```

<div class="content-ad"></div>

```js
<link rel="shortcut icon" href="/shortcut-icon.png" />
<link rel="icon" href="/icon.png" />
<link rel="icon" href="https://example.com/icon.png" />
<link rel="icon" href="/icon-dark.png" media="(prefers-color-scheme: dark)" />
<link rel="apple-touch-icon" href="/apple-icon.png" />
<link
  rel="apple-touch-icon-precomposed"
  href="/apple-touch-icon-precomposed.png"
/>
<link
  rel="apple-touch-icon"
  href="/apple-icon-x3.png"
  sizes="180x180"
  type="image/png"
/>
```

> 좋은 정보: Microsoft Edge의 Chromium 빌드에서는 더 이상 msapplication-\* 메타 태그가 지원되지 않으며 더 이상 필요하지 않습니다.

### 테마 색상

> 사용 중단: Next.js 14에서 메타데이터의 themeColor 옵션은 사용 중단되었습니다. 대신 viewport 구성을 사용하십시오.```

<div class="content-ad"></div>

### manifest

Web Application Manifest는 Web Application Manifest 사양에서 정의됩니다.

```js
export const metadata = {
  manifest: "https://nextjs.org/manifest.json",
};
```

```js
<link rel="manifest" href="https://nextjs.org/manifest.json" />
```

<div class="content-ad"></div>

### 트위터

트위터 사양은 (놀랍게도) X(이전에는 트위터로 알려졌음) 이외의 것에도 사용됩니다.

트위터 카드 마크업 참조에 대해 자세히 알아보세요.

```js
export const metadata = {
  twitter: {
    card: "summary_large_image",
    title: "Next.js",
    description: "웹을 위한 리액트 프레임워크",
    siteId: "1467726470533754880",
    creator: "@nextjs",
    creatorId: "1467726470533754880",
    images: ["https://nextjs.org/og.png"], // 반드시 절대 URL이어야 합니다
  },
};
```

<div class="content-ad"></div>

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site:id" content="1467726470533754880" />
<meta name="twitter:creator" content="@nextjs" />
<meta name="twitter:creator:id" content="1467726470533754880" />
<meta name="twitter:title" content="Next.js" />
<meta name="twitter:description" content="The React Framework for the Web" />
<meta name="twitter:image" content="https://nextjs.org/og.png" />
```

```js
export const metadata = {
  twitter: {
    card: "app",
    title: "Next.js",
    description: "The React Framework for the Web",
    siteId: "1467726470533754880",
    creator: "@nextjs",
    creatorId: "1467726470533754880",
    images: {
      url: "https://nextjs.org/og.png",
      alt: "Next.js Logo",
    },
    app: {
      name: "twitter_app",
      id: {
        iphone: "twitter_app://iphone",
        ipad: "twitter_app://ipad",
        googleplay: "twitter_app://googleplay",
      },
      url: {
        iphone: "https://iphone_url",
        ipad: "https://ipad_url",
      },
    },
  },
};
```

```html
<meta name="twitter:site:id" content="1467726470533754880" />
<meta name="twitter:creator" content="@nextjs" />
<meta name="twitter:creator:id" content="1467726470533754880" />
<meta name="twitter:title" content="Next.js" />
<meta name="twitter:description" content="The React Framework for the Web" />
<meta name="twitter:card" content="app" />
<meta name="twitter:image" content="https://nextjs.org/og.png" />
<meta name="twitter:image:alt" content="Next.js Logo" />
<meta name="twitter:app:name:iphone" content="twitter_app" />
<meta name="twitter:app:id:iphone" content="twitter_app://iphone" />
<meta name="twitter:app:id:ipad" content="twitter_app://ipad" />
<meta name="twitter:app:id:googleplay" content="twitter_app://googleplay" />
<meta name="twitter:app:url:iphone" content="https://iphone_url" />
<meta name="twitter:app:url:ipad" content="https://ipad_url" />
<meta name="twitter:app:name:ipad" content="twitter_app" />
<meta name="twitter:app:name:googleplay" content="twitter_app" />
```

### viewport

<div class="content-ad"></div>

> **Deprecated:** Next.js 14부터 metadata의 viewport 옵션이 사용되지 않습니다. 대신 viewport 구성을 사용해주세요.

### 검증

```js
export const metadata = {
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
};
```

```js
<meta name="google-site-verification" content="google" />
<meta name="y_key" content="yahoo" />
<meta name="yandex-verification" content="yandex" />
<meta name="me" content="my-email" />
<meta name="me" content="my-link" />
```

<div class="content-ad"></div>

### appleWebApp

```js
export const metadata = {
  itunes: {
    appId: "myAppStoreID",
    appArgument: "myAppArgument",
  },
  appleWebApp: {
    title: "Apple 웹 앱",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/assets/startup/apple-touch-startup-image-768x1004.png",
      {
        url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};
```

```js
<meta
  name="apple-itunes-app"
  content="app-id=myAppStoreID, app-argument=myAppArgument"
/>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Apple 웹 앱" />
<link
  href="/assets/startup/apple-touch-startup-image-768x1004.png"
  rel="apple-touch-startup-image"
/>
<link
  href="/assets/startup/apple-touch-startup-image-1536x2008.png"
  media="(device-width: 768px) and (device-height: 1024px)"
  rel="apple-touch-startup-image"
/>
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
```

### alternates

<div class="content-ad"></div>

```js
export const metadata = {
  alternates: {
    canonical: "https://nextjs.org",
    languages: {
      "en-US": "https://nextjs.org/en-US",
      "de-DE": "https://nextjs.org/de-DE",
    },
    media: {
      "only screen and (max-width: 600px)": "https://nextjs.org/mobile",
    },
    types: {
      "application/rss+xml": "https://nextjs.org/rss",
    },
  },
};
```

```js
<link rel="canonical" href="https://nextjs.org" />
<link rel="alternate" hreflang="en-US" href="https://nextjs.org/en-US" />
<link rel="alternate" hreflang="de-DE" href="https://nextjs.org/de-DE" />
<link
  rel="alternate"
  media="only screen and (max-width: 600px)"
  href="https://nextjs.org/mobile"
/>
<link
  rel="alternate"
  type="application/rss+xml"
  href="https://nextjs.org/rss"
/>
```

### 앱 링크

```js
export const metadata = {
  appLinks: {
    ios: {
      url: "https://nextjs.org/ios",
      app_store_id: "app_store_id",
    },
    android: {
      package: "com.example.android/package",
      app_name: "app_name_android",
    },
    web: {
      url: "https://nextjs.org/web",
      should_fallback: true,
    },
  },
};
```

<div class="content-ad"></div>

### 아카이브

아카이브는 역사적 흥미를 끌 수 있는 레코드, 문서 또는 다른 자료의 모음을 설명합니다.

```js
export const metadata = {
  archives: ["https://nextjs.org/13"],
};
```

<div class="content-ad"></div>

```js
<link rel="archives" href="https://nextjs.org/13" />
```

### 자산

```js
export const metadata = {
  assets: ["https://nextjs.org/assets"],
};
```

```js
<link rel="assets" href="https://nextjs.org/assets" />
```

<div class="content-ad"></div>

### 북마크

```js
export const metadata = {
  bookmarks: ["https://nextjs.org/13"],
};
```

```js
<link rel="bookmarks" href="https://nextjs.org/13" />
```

### 카테고리

<div class="content-ad"></div>

```js
export const metadata = {
  category: "technology",
};
```

```js
<meta name="category" content="technology" />
```

### 기타

내장 지원을 사용하여 모든 메타데이터 옵션을 다루어야 합니다. 그러나 사이트에 특정한 사용자 정의 메타데이터 태그나 새로 출시된 브랜드 메타데이터 태그가 있을 수 있습니다. 다른 옵션을 사용하여 사용자 정의 메타데이터 태그를 렌더링할 수 있습니다.```

<div class="content-ad"></div>

```js
export const metadata = {
  other: {
    custom: "meta",
  },
};
```

```js
<meta name="custom" content="meta" />
```

동일한 키 메타 태그를 여러 개 생성하려면 배열 값을 사용할 수 있습니다.

```js
export const metadata = {
  other: {
    custom: ["meta1", "meta2"],
  },
};
```

<div class="content-ad"></div>

```js
<meta name="custom" content="meta1" /> <meta name="custom" content="meta2" />
```

## 지원되지 않는 메타데이터

다음 메타데이터 유형은 현재 내장 지원이 없습니다. 그러나 레이아웃이나 페이지 자체에서 렌더링할 수 있습니다.

| Metadata                      | Recommendation                                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<meta http-equiv="...">`     | <a href="/docs/app/api-reference/functions/redirect">`redirect()`</a>, <a href="/docs/app/building-your-application/routing/middleware#nextresponse">`Middleware`</a>, <a href="/docs/app/api-reference/next-config-js/headers">`Security Headers`</a> |
| `<base>`                      | 레이아웃이나 페이지 자체에 태그를 렌더링하세요.                                                                                                                                                                                                        |
| `<noscript>`                  | 레이아웃이나 페이지 자체에 태그를 렌더링하세요.                                                                                                                                                                                                        |
| `<style>`                     | 자세한 내용은 <a href="/docs/app/building-your-application/styling/css-modules">`Next.js에서 스타일링하는 방법`</a>을 확인하세요.                                                                                                                      |
| `<script>`                    | 자세한 내용은 <a href="/docs/app/building-your-application/optimizing/scripts">`스크립트 사용 방법`</a>을 확인하세요.                                                                                                                                  |
| `<link rel="stylesheet" />`   | 스타일시트를 직접 레이아웃이나 페이지에 `import`하세요.                                                                                                                                                                                                |
| `<link rel="preload />`       | <a href="#link-relpreload">`ReactDOM preload method`</a>을 사용하세요.                                                                                                                                                                                 |
| `<link rel="preconnect" />`   | <a href="#link-relpreconnect">`ReactDOM preconnect method`</a>을 사용하세요.                                                                                                                                                                           |
| `<link rel="dns-prefetch" />` | <a href="#link-reldns-prefetch">`ReactDOM prefetchDNS method`</a>을 사용하세요.                                                                                                                                                                        |

<div class="content-ad"></div>

### 리소스 힌트

`link` 요소에는 브라우저에게 외부 리소스가 필요할 가능성이 있다는 힌트를 제공하는 데 사용할 수 있는 여러 가지 rel 키워드가 있습니다. 브라우저는 이 정보를 사용하여 키워드에 따라 사전로드 최적화를 적용합니다.

Metadata API는 이러한 힌트를 직접 지원하지 않지만, 새로운 ReactDOM 메서드를 사용하여 이러한 힌트를 안전하게 문서의 `head`에 삽입할 수 있습니다.

```typescript
"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("...", { as: "..." });
  ReactDOM.preconnect("...", { crossOrigin: "..." });
  ReactDOM.prefetchDNS("...");

  return null;
}
```

<div class="content-ad"></div>

페이지 렌더링(브라우저) 라이프사이클 중에 리소스를 미리 로드하기 시작하세요. MDN 문서

```js
ReactDOM.preload(href: string, options: { as: string })
```

```js
<link rel="preload" href="..." as="..." />
```

사전에 출발점으로의 연결을 초기화하세요. MDN 문서

<div class="content-ad"></div>

```js
ReactDOM.preconnect(href: string, options?: { crossOrigin?: string })
```

```js
<link rel="preconnect" href="..." crossorigin />
```

리소스를 요청하기 전에 도메인 이름을 먼저 해결하려는 시도입니다. MDN 문서

.

```js
ReactDOM.prefetchDNS(href: string)
```

<div class="content-ad"></div>

```js
<link rel="dns-prefetch" href="..." />
```

> 좋은 정보:
> 현재 이러한 방법은 초기 페이지 로드시 서버 측 렌더링된 클라이언트 구성 요소에서만 지원됩니다.
> Next.js의 내장 기능인 next/font, next/image 및 next/script는 관련 리소스 힌트를 자동으로 처리합니다.
> React 18.3에는 아직 ReactDOM.preload, ReactDOM.preconnect 및 ReactDOM.preconnectDNS에 대한 유형 정의가 포함되어 있지 않습니다. 임시적인 해결책으로 타입 오류를 피하기 위해 // @ts-ignore를 사용할 수 있습니다.

## 유형

메타데이터에 유형 안전성을 추가할 수 있습니다. IDE에 내장된 TypeScript 플러그인을 사용하는 경우 유형을 수동으로 추가할 필요가 없지만 원하는 경우 여전히 명시적으로 추가할 수 있습니다.

<div class="content-ad"></div>

### metadata object

```js
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};
```

### generateMetadata function

#### Regular function

<div class="content-ad"></div>

```js
import type { Metadata } from "next";

// Metadata 생성 함수
export function generateMetadata(): Metadata {
  return {
    title: "Next.js",
  };
}
```

#### 비동기 함수

```js
import type { Metadata } from "next";

// 비동기로 Metadata 생성하는 함수
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Next.js",
  };
}
```

#### 세그먼트 속성과 함께

<div class="content-ad"></div>

```js
import type { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: 'Next.js',
  }
}

export default function Page({ params, searchParams }: Props) {}
```

#### 부모 메타데이터를 사용하는 경우

```js
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: "Next.js",
  };
}
```

#### JavaScript 프로젝트들```

<div class="content-ad"></div>

JavaScript 프로젝트에서는 JSDoc을 사용하여 타입 안전성을 추가할 수 있어요.

```js
/** @type {import("next").Metadata} */
export const metadata = {
  title: "Next.js",
};
```

## 버전 내역

| Version   | 변경 내용                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `v13.2.0` | `viewport`, `themeColor`, 그리고 `colorScheme`이 `<code>viewport</code> 구성`을 위해 폐기되었습니다. |
| `v13.2.0` | `metadata`와 `generateMetadata`가 도입되었습니다.                                                    |

<div class="content-ad"></div>
