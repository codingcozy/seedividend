---
title: "Nextjs 13 저장소 다국어 셋팅 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "국제화 i18n 라우팅"
link: "undefined"
---



# 국제화 (i18n) 라우팅

Next.js는 v10.0.0부터 내장된 국제화(i18n) 라우팅을 지원합니다. 여러분은 로케일 목록, 기본 로케일 및 도메인별 로케일을 제공하면 Next.js가 자동으로 라우팅을 처리해줍니다.

현재 i18n 라우팅 지원은 이미 존재하는 react-intl, react-i18next, lingui, rosetta, next-intl, next-translate, next-multilingual, tolgee 등 다른 i18n 라이브러리 솔루션을 보완하기 위해 라우트 및 로케일 구문 분석을 단순화하는 것을 목표로 합니다.

## 시작하기

<div class="content-ad"></div>

시작하려면 next.config.js 파일에 i18n 구성을 추가하세요.

로케일은 UTS 로캘 식별자로, 로케일을 정의하는 표준화된 형식입니다.

일반적으로 로캘 식별자는 언어, 지역 및 스크립트로 구성되며, 대시로 구분됩니다: 언어-지역-스크립트. 지역과 스크립트는 선택 사항입니다. 예를 들면:

- en-US - 미국에서 사용되는 영어
- nl-NL - 네덜란드에서 사용되는 네덜란드어
- nl - 네덜란드어, 특정 지역 없음

<div class="content-ad"></div>

사용자 로케일이 nl-BE이고 구성에 나열되어 있지 않으면, 사용 가능한 경우 nl로 이동하거나 그렇지 않으면 기본 로케일로 이동됩니다. 나라의 모든 지역을 지원할 계획이 없다면, 대체되는 요소로 작동할 나라 로케일을 포함하는 것이 좋은 실천법입니다.

```js
module.exports = {
  i18n: {
    // 애플리케이션에서 지원하려는 모든 로케일입니다.
    locales: ["en-US", "fr", "nl-NL"],
    // 방문하는 경우 사용할 기본 로케일입니다.
    defaultLocale: "en-US",
    // 로컬 도메인 목록 및 해당 로케일입니다.
    // 도메인 라우팅을 설정할 때에만 필요합니다.
    // 서브도메인은 "fr.example.com"과 일치해야 함을 주의해야 합니다.
    domains: [
      {
        domain: "example.com",
        defaultLocale: "en-US",
      },
      {
        domain: "example.nl",
        defaultLocale: "nl-NL",
      },
      {
        domain: "example.fr",
        defaultLocale: "fr",
        http: true,
      },
    ],
  },
};
```

## 로케일 전략

로케일 처리 전략은 두 가지가 있습니다: 하위 경로 라우팅 및 도메인 라우팅.

<div class="content-ad"></div>

### 하위 경로 경로 지정

하위 경로 라우팅은 로케일을 URL 경로에 추가합니다.

```js
module.exports = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL"],
    defaultLocale: "en-US",
  },
};
```

위의 구성에서 en-US, fr 및 nl-NL이 경로 지정될 수 있고, en-US가 기본 로캘입니다. 만약 pages/blog.js를 가지고 있다면 아래 URL들이 사용 가능합니다:

<div class="content-ad"></div>

- /blog
- /fr/blog
- /nl-nl/blog

기본 로캘에는 접두사가 없습니다.

### 도메인 라우팅

도메인 라우팅을 사용하여 다른 도메인에서 제공되는 로캘을 구성할 수 있습니다.

<div class="content-ad"></div>


module.exports = {
i18n: {
locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
defaultLocale: 'en-US',

    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
        // specify other locales that should be redirected
        // to this domain
        locales: ['nl-BE'],
      },
    ],

},
}


예를 들어, 만일 당신이 pages/blog.js 파일을 가지고 있다면 다음과 같은 URL을 사용할 수 있습니다:

- example.com/blog
- www.example.com/blog
- example.fr/blog
- example.nl/blog
- example.nl/nl-BE/blog

## 자동 로캘 탐지

<div class="content-ad"></div>

사용자가 애플리케이션 루트(보통 /)를 방문하면 Next.js는 Accept-Language 헤더와 현재 도메인을 기반으로 사용자가 선호하는 로캘을 자동으로 감지하려고 시도합니다.

기본 로캘이 아닌 다른 로캘이 감지되면 사용자는 다음 중 하나로 리디렉션됩니다:

- 서브-패스 라우팅을 사용하는 경우: 로캘이 접두사로 붙은 경로
- 도메인 라우팅을 사용하는 경우: 해당 로캘이 기본값으로 지정된 도메인

도메인 라우팅을 사용하는 경우, Accept-Language 헤더가 fr;q=0.9 인 사용자가 example.com을 방문하면 해당 도메인이 기본적으로 fr 로캘을 처리하므로 example.fr로 리디렉션됩니다.

<div class="content-ad"></div>

서브 경로 라우팅을 사용할 때, 사용자는 /fr로 리디렉션됩니다.

### 기본 로캘에 접두사 추가하기

Next.js 12와 미들웨어를 사용하여 기본 로캘에 접두사를 추가할 수 있습니다. 해결책이 필요합니다.

예를 들어, 몇 가지 언어를 지원하는 next.config.js 파일이 있습니다. "default"로캘이 의도적으로 추가되었음을 유의하세요.

<div class="content-ad"></div>

```js
module.exports = {
  i18n: {
    locales: ["default", "en", "de", "fr"],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: true,
};
```

다음으로, 커스텀 라우팅 규칙을 추가하기위해 미들웨어를 사용할 수 있습니다:

```js
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next") || req.nextUrl.pathname.includes("/api/") || PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";

    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
  }
}
```

이 미들웨어는 API 경로와 폰트 또는 이미지와 같은 공개 파일에 대한 기본 접두사 추가를 건너 뜁니다. 요청이 기본 로캘로 이루어지면 접두사 /en으로 리디렉션됩니다.

<div class="content-ad"></div>

### 자동 로캘 감지 비활성화

자동 로캘 감지를 비활성화하려면 다음과 같이 설정할 수 있습니다:

```js
module.exports = {
  i18n: {
    localeDetection: false,
  },
};
```

localeDetection을 false로 설정하면 Next.js가 더 이상 사용자의 선호하는 로캘에 따라 자동으로 리디렉션하지 않고 위에서 설명한 로캘 기반 도메인이나 로캘 경로에서 감지된 로캘 정보만 제공합니다.

<div class="content-ad"></div>

## 로캘 정보에 액세스하기

Next.js 라우터를 통해 로캘 정보에 액세스할 수 있습니다. 예를 들어, useRouter() 훅을 사용하면 다음과 같은 속성들에 접근할 수 있습니다:

- locale: 현재 활성화된 로캘을 포함합니다.
- locales: 구성된 모든 로캘을 포함합니다.
- defaultLocale: 구성된 기본 로캘을 포함합니다.

getStaticProps 또는 getServerSideProps로 페이지를 사전 렌더링할 때, 로캘 정보는 함수에 제공된 컨텍스트에 제공됩니다.

<div class="content-ad"></div>

getStaticPaths를 활용할 때, 설정한 로케일은 locales 밑에 있고, 설정한 기본 로케일은 defaultLocale 밑에 제공됩니다.

## 로케일 간 전환

로케일 간 전환을 위해 next/link 또는 next/router를 사용할 수 있습니다.

next/link를 사용할 경우, locale 속성을 제공하여 현재 활성화된 로케일에서 다른 로케일로 전환할 수 있습니다. locale 속성을 제공하지 않는 경우 클라이언트 전환 중에 현재 활성화된 로케일이 사용됩니다. 예를 들어:

<div class="content-ad"></div>

```js
import Link from "next/link";

export default function IndexPage(props) {
  return (
    <Link href="/another" locale="fr">
      To /fr/another
    </Link>
  );
}
```

다음은 next/router 메서드를 직접 사용할 때 전환 옵션을 통해 사용할 로캘을 지정할 수 있습니다. 예를 들어:

```js
import { useRouter } from 'next/router'

export default function IndexPage(props) {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push('/another', '/another', { locale: 'fr' })
      }
    >
      to /fr/another
    </div>
  )
}
```

로케일만 전환하면서 동적 경로 쿼리 값이나 숨겨진 href 쿼리 값과 같은 모든 경로 정보를 보존하는 경우(href 매개변수를 객체로 제공하면 됩니다.

<div class="content-ad"></div>

```js
import { useRouter } from "next/router";
const router = useRouter();
const { pathname, asPath, query } = router;
// 다른 route 정보를 유지하면서 로캘(locale)만 변경합니다.
router.push({ pathname, query }, asPath, { locale: nextLocale });
```

`router.push`에 대한 객체 구조에 대한 자세한 정보는 여기를 참조하십시오.

이미 로캘이 포함된 href가 있는 경우 로캘 접두사 자동 처리를 선택적으로 사용할 수 있습니다:

```js
import Link from "next/link";

export default function IndexPage(props) {
  return (
    <Link href="/fr/another" locale={false}>
      /fr/another로 이동
    </Link>
  );
}
```

<div class="content-ad"></div>

## NEXT_LOCALE 쿠키 활용하기

Next.js는 accept-language 헤더를 NEXT_LOCALE=the-locale 쿠키로 재정의하는 기능을 지원합니다. 이 쿠키는 언어 변경기를 통해 설정할 수 있으며 사용자가 사이트로 돌아올 때, /에서 적절한 locale 위치로 리디렉션할 때 쿠키에 지정된 locale을 활용합니다.

예를 들어, 사용자가 accept-language 헤더에서 fr locale을 선호하지만 NEXT_LOCALE=en 쿠키가 설정된 경우, /를 방문할 때는 사용자가 en locale 위치로 리디렉션됩니다. 쿠키가 제거되거나 만료될 때까지 en locale 위치로 유지됩니다.

## 검색 엔진 최적화

<div class="content-ad"></div>

Next.js는 사용자가 방문하는 언어를 인식하기 때문에 `html` 태그에 자동으로 lang 속성을 추가합니다.

Next.js는 페이지의 변형에 대해 알지 못하기 때문에 hreflang 메타 태그를 next/head를 사용하여 수동으로 추가해야 합니다. hreflang에 대해 더 자세히 알아보려면 Google 웹마스터 문서를 참조하세요.

## 정적 생성과 어떻게 작동합니까?

> 국제화된 라우팅은 `export` 출력과 통합되지 않으므로 Next.js 라우팅 레이어를 활용하지 않습니다. `export` 출력을 사용하지 않는 하이브리드 Next.js 애플리케이션은 완벽히 지원됩니다.

<div class="content-ad"></div>

### 동적 라우트 및 getStaticProps 페이지

동적 라우트와 getStaticProps를 사용하는 페이지의 경우, 미리 렌더링되어야 하는 페이지의 모든 로케일 변형은 getStaticPaths에서 반환되어야 합니다. 경로에 대한 반환된 params 개체와 함께, 렌더링하려는 로케일을 지정하는 locale 필드도 반환할 수 있습니다.

예를 들어:

```js
export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      // 'locale'이 제공되지 않은 경우 defaultLocale만 생성됩니다.
      { params: { slug: "post-1" }, locale: "en-US" },
      { params: { slug: "post-1" }, locale: "fr" },
    ],
    fallback: true,
  };
};
```

자동으로 정적으로 최적화된 동적이 아닌 getStaticProps 페이지의 경우, 각 로케일에 대한 페이지 버전이 생성됩니다. 무엇보다 이를 고려하는 것이 중요합니다. 왜냐하면 getStaticProps 내에서 구성된 로케일 수에 따라 빌드 시간이 증가할 수 있기 때문입니다.

<div class="content-ad"></div>

예를 들어, 10개의 동적 페이지를 사용하여 구성된 50개의 로케일이 있다면, getStaticProps를 사용하여 500회 호출될 것입니다. 각 빌드마다 10개의 페이지의 50가지 버전이 생성될 것입니다.

getStaticProps를 사용하여 동적 페이지의 빌드 시간을 줄이려면 fallback 모드를 사용하세요. 이를 통해 getStaticPaths에서 빌드 중에 미리 렌더링할 가장 인기 있는 경로와 로케일만 반환할 수 있습니다. 그럼 Next.js는 요청이 들어올 때 남은 페이지를 런타임에서 빌드합니다.

### 자동으로 정적으로 최적화된 페이지

자동으로 정적으로 최적화된 페이지의 경우, 각 로케일마다 해당 페이지의 버전이 생성됩니다.

<div class="content-ad"></div>

### 동적이 아닌 getStaticProps 페이지

동적이 아닌 getStaticProps 페이지의 경우, 위와 같이 각 로캘에 대한 버전이 생성됩니다. getStaticProps는 각 렌더링 중인 로캘과 함께 호출됩니다. 특정 로캘이 사전 렌더링되지 않도록 하려면 getStaticProps에서 notFound: true를 반환하면 해당 페이지의 이 변형이 생성되지 않습니다.

```js
export async function getStaticProps({ locale }) {
  // 외부 API 엔드포인트를 호출하여 게시물을 가져옵니다.
  // 데이터 가져오기 라이브러리를 사용할 수 있습니다
  const res = await fetch(`https://.../posts?locale=${locale}`);
  const posts = await res.json();

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  // { props: posts }를 반환하면 Blog 컴포넌트에서
  // 빌드 시간에 `posts`를 prop으로 받게 됩니다
  return {
    props: {
      posts,
    },
  };
}
```

## i18n 구성에 대한 제한

<div class="content-ad"></div>

- 로케일: 총 100개 로케일
- 도메인: 총 100개 로케일 도메인 아이템

> 알아 두면 좋은 점: 이러한 제한은 빌드 시 잠재적인 성능 문제를 방지하기 위해 처음에 추가되었습니다. Next.js 12에서 미들웨어를 사용하여 사용자 정의 라우팅으로 이러한 제한을 우회할 수 있습니다.

<div class="content-ad"></div>
