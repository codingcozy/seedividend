---
title: "Nextjs 13 - NextResponse API 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "NextResponse"
link: "undefined"
---



# NextResponse

NextResponse는 웹 응답 API를 확장하여 추가적인 편리한 메소드를 제공합니다.

## cookies

응답의 Set-Cookie 헤더를 읽거나 수정할 수 있습니다.

<div class="content-ad"></div>

### set(name, value)

주어진 이름으로 응답에 주어진 값을 갖는 쿠키를 설정합니다.

```js
// 수신된 요청인 /home이 주어졌을 때
let response = NextResponse.next();
// 배너를 숨기기 위한 쿠키 설정
response.cookies.set("show-banner", "false");
// 응답은 `Set-Cookie:show-banner=false;path=/home` 헤더를 갖게 됩니다
return response;
```

### get(name)

<div class="content-ad"></div>

쿠키 이름을 제공하면 해당 쿠키의 값이 반환됩니다. 쿠키를 찾을 수 없는 경우 undefined가 반환됩니다. 여러 개의 쿠키가 발견되면 첫 번째 쿠키가 반환됩니다.

```js
// 들어오는 요청 /home을 기준으로
let response = NextResponse.next();
// { name: 'show-banner', value: 'false', Path: '/home' }
response.cookies.get("show-banner");
```

### getAll()

쿠키 이름을 제공하면 해당 쿠키의 값이 반환됩니다. 이름이 제공되지 않은 경우 응답에서 모든 쿠키가 반환됩니다.

<div class="content-ad"></div>

```js
// 수신된 요청 /home 일 때
let response = NextResponse.next();
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
response.cookies.getAll("experiments");
// 또는, 응답에 대한 모든 쿠키를 가져옵니다
response.cookies.getAll();
```

### delete(name)

쿠키 이름을 지정하여 응답에서 쿠키를 삭제합니다.

```js
// 수신된 요청 /home 일 때
let response = NextResponse.next();
// 삭제된 경우 true를 반환하고, 삭제된 것이 없으면 false를 반환합니다
response.cookies.delete("experiments");
```

<div class="content-ad"></div>

## json()

주어진 JSON 본문을 포함하는 응답을 생성합니다.

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ error: "내부 서버 오류" }, { status: 500 });
}
```

## redirect()

<div class="content-ad"></div>

```js
import { NextResponse } from "next/server";

return NextResponse.redirect(new URL("/new", request.url));
```

위의 코드는 URL로 리디렉션하는 응답을 생성합니다.

리디렉션할 URL은 NextResponse.redirect() 메서드에서 사용되기 전에 생성 및 수정할 수 있습니다. 예를 들어, 현재 URL을 가져오기 위해 request.nextUrl 속성을 사용하여 현재 URL을 가져온 다음 다른 URL로 리디렉션하도록 수정할 수 있습니다.

```js
import { NextResponse } from "next/server";

// 받은 요청을 기반으로...
const loginUrl = new URL("/login", request.url);
// /login URL에 ?from=/incoming-url 추가
loginUrl.searchParams.set("from", request.nextUrl.pathname);
// 새 URL로 리디렉션
return NextResponse.redirect(loginUrl);
```

<div class="content-ad"></div>

## rewrite()

지정된 URL을 유지하면서 URL을 다시 작성(프락시)하는 응답을 생성합니다.

```js
import { NextResponse } from "next/server";

// 수신된 요청: /about, 브라우저에 표시되는 URL: /about
// 다시 작성된 요청: /proxy, 브라우저에 표시되는 URL: /about
return NextResponse.rewrite(new URL("/proxy", request.url));
```

## next()

<div class="content-ad"></div>

next() 메소드는 미들웨어에서 유용합니다. 이 메소드를 사용하면 일찍 반환하고 라우팅을 계속할 수 있습니다.

```js
import { NextResponse } from "next/server";

return NextResponse.next();
```

응답 생성 시 헤더를 전달할 수도 있습니다.

```js
import { NextResponse } from "next/server";

// 수신된 요청이 있다면...
const newHeaders = new Headers(request.headers);
// 새 헤더 추가
newHeaders.set("x-version", "123");
// 새 헤더로 응답 생성
return NextResponse.next({
  request: {
    // 새 요청 헤더
    headers: newHeaders,
  },
});
```



<div class="content-ad"></div>

