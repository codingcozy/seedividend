---
title: "Nextjs 14에서 응답을 쉽게 처리하는 방법NextResponse"
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





# Nextjs 14에서 응답을 쉽게 처리하는 방법(NextResponse)

NextResponse는 더 많은 편의 기능을 제공하는 웹 응답 API를 확장합니다.

## cookies

응답의 Set-Cookie 헤더를 읽거나 수정할 수 있습니다.

<div class="content-ad"></div>

### set(name, value)

주어진 이름에 대한 값을 사용하여 응답에 쿠키를 설정합니다.

```js
// 수신된 요청 /home인 경우
let response = NextResponse.next();
// 배너 숨기기용 쿠키 설정
response.cookies.set("show-banner", "false");
// 응답은 `Set-Cookie:show-banner=false;path=/home` 헤더를 가집니다.
return response;
```

### get(name)

<div class="content-ad"></div>

쿠키 이름을 제공하면 해당 쿠키의 값을 반환합니다. 쿠키를 찾을 수 없는 경우 undefined가 반환됩니다. 여러 개의 쿠키가 발견되면 첫 번째 쿠키가 반환됩니다.

```js
// 수신된 요청 /home
let response = NextResponse.next();
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get("show-banner");
```

### getAll()

쿠키 이름을 제공하면 해당 쿠키의 값들을 반환합니다. 이름이 제공되지 않은 경우 응답에 있는 모든 쿠키를 반환합니다.

<div class="content-ad"></div>

```js
// 수신된 요청인 /home이 주어진 경우
let response = NextResponse.next();
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll("experiments");
// 또는 응답에 대한 모든 쿠키를 가져올 수도 있습니다
response.cookies.getAll();
```

### delete(name)

쿠키 이름이 주어진 경우, 해당 쿠키를 응답에서 삭제합니다.

```js
// 수신된 요청인 /home이 주어진 경우
let response = NextResponse.next();
// 삭제된 경우 true를 반환합니다. 삭제된 것이 없으면 false를 반환합니다
response.cookies.delete("experiments");
```

<div class="content-ad"></div>

## json()

주어진 JSON 데이터를 포함한 응답을 생성합니다.

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
```

## redirect()

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";

return NextResponse.redirect(new URL("/new", request.url));
```

위의 코드는 URL을 생성하여 수정한 후 NextResponse.redirect() 메서드에서 사용할 수 있습니다. 예를 들어, request.nextUrl 속성을 사용하여 현재 URL을 가져와서 다른 URL로 리다이렉션할 수 있습니다.

```js
import { NextResponse } from "next/server";

// 수신된 요청을 기준으로...
const loginUrl = new URL("/login", request.url);
// /login URL에 ?from=/incoming-url 추가
loginUrl.searchParams.set("from", request.nextUrl.pathname);
// 그리고 새 URL로 리다이렉트
return NextResponse.redirect(loginUrl);
```

<div class="content-ad"></div>

## rewrite()

제공된 URL을 유지하면서 다시 작성(프록시)하는 응답을 생성합니다.

```js
import { NextResponse } from "next/server";

// 수신 요청: /about, 브라우저에 표시됨: /about
// 다시 작성된 요청: /proxy, 브라우저에 표시됨: /about
return NextResponse.rewrite(new URL("/proxy", request.url));
```

## next()

<div class="content-ad"></div>

`next()` 메서드는 미들웨어에 유용한데요. 이 메서드를 사용하면 일찍 반환할 수 있고 라우팅을 계속할 수 있습니다.

```js
import { NextResponse } from "next/server";

return NextResponse.next();
```

응답 생성 시 헤더를 전달할 수도 있어요:

```js
import { NextResponse } from "next/server";

// 들어오는 요청이 있다면...
const newHeaders = new Headers(request.headers);
// 새 헤더 추가
newHeaders.set("x-version", "123");
// 새 헤더를 포함한 응답을 생성해요
return NextResponse.next({
  request: {
    // 새 요청 헤더
    headers: newHeaders,
  },
});
```

<div class="content-ad"></div>
