---
title: "Nextjs 13 Redirects 사용 방법"
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





# 리디렉션

리디렉션은 들어오는 요청 경로를 다른 대상 경로로 리디렉션할 수 있게 해줍니다.

리디렉션을 사용하려면 next.config.js 파일에서 redirects 키를 사용할 수 있습니다:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
```

<div class="content-ad"></div>

`redirects`는 소스, 대상 및 영구 속성을 가진 객체가 포함된 배열이 반환되는 것을 기대하는 비동기 함수입니다:

- 소스는 수신 요청 경로 패턴입니다.
- 대상은 라우팅하려는 경로입니다.
- 영구 true 또는 false - true인 경우 308 상태 코드를 사용하며 클라이언트/검색 엔진에게 리디렉트를 영구적으로 캐시할 것을 지시하고, false이면 307 상태 코드를 사용하며 일시적이며 캐시되지 않습니다.

> Next.js가 307 및 308을 사용하는 이유는 무엇인가요? 기존에는 일시적 리디렉트에 302가 사용되고 영구적 리디렉트에 301이 사용되었습니다. 그러나 많은 브라우저가 리디렉트의 요청 방법을 GET으로 변경했습니다. 예를 들어, 브라우저가 POST /v1/users로 요청을 보낸 후 302 상태 코드와 위치 /v2/users를 반환하면, 예상한 POST /v2/users 대신 GET /v2/users로 이어지는 요청이 발생할 수 있습니다. Next.js는 요청 방법을 명시적으로 유지하기 위해 307 일시적 리디렉트와 308 영구 리디렉트 상태 코드를 사용합니다.

- basePath: false 또는 undefined - false 경우 일치시 basePath는 포함되지 않으며 외부 리디렉트에만 사용될 수 있습니다.
- locale: false 또는 undefined - 일치시 로캘이 포함되지 않아야 하는지 여부.
- has는 type, key 및 value 속성을 가진 has 객체의 배열입니다.
- missing는 type, key 및 value 속성을 가진 missing 객체의 배열입니다.

<div class="content-ad"></div>

리다이렉트는 페이지 및 /public 파일을 포함하는 파일 시스템 이전에 확인됩니다.

페이지 라우터를 사용할 때, 미들웨어가 존재하고 경로와 일치하는 경우에만 클라이언트 측 라우팅(Link, router.push)에 리다이렉트가 적용되지 않습니다.

리다이렉트가 적용되면, 요청에 제공된 쿼리 값은 리다이렉트 대상으로 전달됩니다. 예를 들어 다음과 같은 리다이렉트 구성을 참조하세요:

```js
{
  source: '/old-blog/:path*',
  destination: '/blog/:path*',
  permanent: false
}
```

<div class="content-ad"></div>

/old-blog/post-1?hello=world가 요청되면, 클라이언트는 /blog/post-1?hello=world로 리디렉션됩니다.

## 경로 일치

경로 일치는 허용됩니다. 예를 들어 /old-blog/:slug은 /old-blog/hello-world와 일치합니다 (중첩된 경로 없음):

```js
module.exports = {
  async redirects() {
    return [
      {
        source: "/old-blog/:slug",
        destination: "/news/:slug", // 일치한 매개변수는 대상에서 사용할 수 있습니다
        permanent: true,
      },
    ];
  },
};
```

<div class="content-ad"></div>

### 와일드카드 경로 매칭

와일드카드 경로를 매칭하기 위해 매개변수 뒤에 *을 사용할 수 있습니다. 예를 들어, /blog/:slug*은 /blog/a/b/c/d/hello-world와 매치됩니다:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: "/blog/:slug*",
        destination: "/news/:slug*", // 일치하는 매개변수는 대상에서 사용할 수 있습니다
        permanent: true,
      },
    ];
  },
};
```

### 정규식 경로 매칭

<div class="content-ad"></div>

정규식 경로와 일치시키려면 매개변수 뒤에 괄호 안에 정규식을 감싸면 됩니다. 예를 들어 /post/:slug(\\d{1,})은 /post/123과 일치하지만 /post/abc와는 일치하지 않습니다:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: "/post/:slug(\\d{1,})",
        destination: "/news/:slug", // 일치하는 매개변수는 대상에서 사용할 수 있습니다
        permanent: false,
      },
    ];
  },
};
```

다음 문자들 (, ), {, }, :, \*, +, ? 는 정규식 경로 일치에 사용되므로 소스에서 특별하지 않은 값으로 사용할 때는 그 앞에 \\를 추가하여 이스케이프해야 합니다:

```js
module.exports = {
  async redirects() {
    return [
      {
        // 이것은 요청된 `/english(default)/something`를 일치시킵니다
        source: "/english\\(default\\)/:slug",
        destination: "/en-us/:slug",
        permanent: false,
      },
    ];
  },
};
```

<div class="content-ad"></div>

## 헤더, 쿠키 및 쿼리 일치

리디렉션을 일치시키려면 has 필드도 일치해야 하거나 missing 필드는 일치하지 않아야 합니다. 리디렉션을 적용하려면 소스와 모든 has 아이템이 일치하고 모든 missing 아이템이 일치하지 않아야 합니다.

has 및 missing 아이템에는 다음 필드가 포함될 수 있습니다:

- type: String - 반드시 header, cookie, host 또는 query 중 하나여야 합니다.
- key: String - 일치시킬 선택한 타입의 키입니다.
- value: String 또는 undefined - 검사할 값입니다. undefined인 경우 모든 값이 일치합니다. 특정 값의 일부를 캡처하기 위해 정규식과 유사한 문자열을 사용할 수 있습니다. 예: 값이 first-(?`paramName`.\*)인 경우 first-second라는 값의 경우 목적지에서 :paramName으로 second를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
module.exports = {
  async redirects() {
    return [
      // 만약 'x-redirect-me' 헤더가 있는 경우, 이 리디렉션을 적용합니다.
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "header",
            key: "x-redirect-me",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // 만약 'x-do-not-redirect' 헤더가 있는 경우, 이 리디렉션을 적용하지 않습니다.
      {
        source: "/:path((?!another-page$).*)",
        missing: [
          {
            type: "header",
            key: "x-do-not-redirect",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // 소스, 쿼리, 쿠키가 일치하는 경우 이 리디렉션을 적용합니다.
      {
        source: "/specific/:path*",
        has: [
          {
            type: "query",
            key: "page",
            value: "home",
          },
          {
            type: "cookie",
            key: "authorized",
            value: "true",
          },
        ],
        permanent: false,
        destination: "/another/:path*",
      },
      // 'x-authorized' 헤더가 있고 일치하는 값이 포함되어 있는 경우 이 리디렉션을 적용합니다.
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "x-authorized",
            value: "(?<authorized>yes|true)",
          },
        ],
        permanent: false,
        destination: "/home?authorized=:authorized",
      },
      // 호스트가 'example.com'인 경우 이 리디렉션을 적용합니다.
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "host",
            value: "example.com",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
    ];
  },
};
```

### basePath 지원하는 리디렉션

basePath를 지원하면 source 및 destination이 각각 basePath로 자동으로 접두사가 붙습니다. 이 리다이렉트에 basePath: false를 추가하지 않는 한 리다이렉션에도 basePath가 자동으로 붙습니다:

```js
module.exports = {
  basePath: "/docs",

  async redirects() {
    return [
      {
        source: "/with-basePath", // 자동으로 /docs/with-basePath가 됩니다
        destination: "/another", // 자동으로 /docs/another가 됩니다
        permanent: false,
      },
      {
        // basePath: false가 설정되어 있으므로 /docs를 추가하지 않습니다.
        source: "/without-basePath",
        destination: "https://example.com",
        basePath: false,
        permanent: false,
      },
    ];
  },
};
```

<div class="content-ad"></div>

### i18n 지원을 사용한 리다이렉트

리다이렉트를 사용할 때 i18n 지원을 활용하면 각 출발지와 목적지는 설정된 로케일을 처리하기 위해 자동으로 접두사가 붙습니다. 그렇지 않고 리다이렉트에 locale: false를 추가하지 않는 한, 출발지와 목적지에 로케일을 직접 추가해야 올바르게 일치됩니다.

```js
module.exports = {
  i18n: {
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
  },

  async redirects() {
    return [
      {
        source: "/with-locale", // 모든 로케일 자동 처리
        destination: "/another", // 로케일이 자동 전달됨
        permanent: false,
      },
      {
        // locale: false가 설정되어 있어 로케일을 자동 처리하지 않음
        source: "/nl/with-locale-manual",
        destination: "/nl/another",
        locale: false,
        permanent: false,
      },
      {
        // 'en'이 defaultLocale이므로 '/'와 일치함
        source: "/en",
        destination: "/en/another",
        locale: false,
        permanent: false,
      },
      // locale: false가 설정된 경우에도 모든 로케일을 일치시킬 수 있음
      {
        source: "/:locale/page",
        destination: "/en/newpage",
        permanent: false,
        locale: false,
      },
      {
        // '(en|fr|de)'로 변환되어 최상위 레벨에 일치하지 않음
        // `/` 또는 `/fr` 경로와 같이 `/path*`가 될 수 있음
        source: "/(.*)",
        destination: "/another",
        permanent: false,
      },
    ];
  },
};
```

드물게, 낡은 HTTP 클라이언트에게 올바른 리다이렉트를 위해 사용자 정의 상태 코드를 할당해야 할 때가 있습니다. 이런 경우에는 permanent 속성 대신 statusCode 속성을 사용할 수 있지만 둘 다 사용할 수는 없습니다. 308 상태 코드를 위해 IE11 호환성을 보장하려면 Refresh 헤더가 자동으로 추가됩니다.

<div class="content-ad"></div>

## 다른 리다이렉트

- API Routes 및 Route Handlers 내에서는 수신 요청에 따라 리다이렉트 할 수 있습니다.
- getStaticProps 및 getServerSideProps 내에서는 특정 페이지를 요청 시간에 리다이렉트 할 수 있습니다.

## 버전 이력

| 버전      | 변경 내용           |
| --------- | ------------------- |
| `v13.3.0` | `missing` 추가됨.   |
| `v10.2.0` | `has` 추가됨.       |
| `v9.5.0`  | `redirects` 추가됨. |

<div class="content-ad"></div>
