---
title: "Nextjs 13 - NextRequest API 사용 방법 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "다음 요청"
link: "undefined"
isUpdated: true
---

# NextRequest

NextRequest는 Web Request API를 확장하여 추가적인 편의 기능을 제공합니다.

## 쿠키

요청의 Set-Cookie 헤더를 읽거나 변이시킵니다.

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

### set(name, value)

주어진 이름으로 요청에 해당 값의 쿠키를 설정합니다.

```js
// 수신된 요청 /home
// 배너를 숨기기 위한 쿠키 설정
// 요청은 `Set-Cookie:show-banner=false;path=/home` 헤더를 가집니다
request.cookies.set("show-banner", "false");
```

### get(name)

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

쿠키 이름이 주어지면 해당 쿠키의 값을 반환합니다. 쿠키를 찾을 수 없으면 정의되지 않은(undefined) 값이 반환됩니다. 여러 개의 쿠키가 발견되면 첫 번째 쿠키가 반환됩니다.

```js
// 수신된 요청이 /home인 경우
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get("show-banner");
```

### getAll()

쿠키 이름이 주어지면 해당 쿠키의 값을 반환합니다. 이름이 지정되지 않으면 요청에 있는 모든 쿠키를 반환합니다.

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
// 수신된 요청 /home
// [
//   { name: 'experiments', value: 'new-pricing-page', Path: '/home' },
//   { name: 'experiments', value: 'winter-launch', Path: '/home' },
// ]
request.cookies.getAll("experiments");
// 또는, 요청에 대한 모든 쿠키 가져오기
request.cookies.getAll();
```

### delete(name)

쿠키 이름을 제공하면 해당 쿠키를 요청에서 삭제합니다.

```js
// 삭제되면 true를 반환하고, 아무 것도 삭제되지 않으면 false를 반환합니다
request.cookies.delete("experiments");
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

### has(name)

쿠키 이름이 주어졌을 때, 해당 쿠키가 요청에 존재하면 true를 반환합니다.

```js
// 쿠키가 존재하면 true를 반환하고, 그렇지 않으면 false를 반환합니다
request.cookies.has("experiments");
```

### clear()

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

요청에서 Set-Cookie 헤더를 제거하세요.

```js
request.cookies.clear();
```

## nextUrl

기본 URL API를 확장하여 Next.js 특정 속성을 포함한 추가적인 편의 기능을 제공합니다.

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
// /home에 대한 요청을 받았을 때, pathname은 /home입니다.
request.nextUrl.pathname;
// /home?name=lee에 대한 요청을 받았을 때, searchParams는 { 'name': 'lee' }입니다.
request.nextUrl.searchParams;
```

다음 옵션이 가능합니다:

| Property          | Type                      | Description                                                                                                                              |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`        | `string`                  | URL의 <a href="/docs/pages/api-reference/next-config-js/basePath">base path</a>입니다.                                                   |
| `buildId`         | `string` \| `undefined`   | Next.js 어플리케이션의 빌드 식별자입니다. <a href="/docs/pages/api-reference/next-config-js/generateBuildId">사용자 정의</a> 가능합니다. |
| `defaultLocale`   | `string` \| `undefined`   | <a href="/docs/pages/building-your-application/routing/internationalization">다국어화</a>를 위한 기본 로케일입니다.                      |
| `domainLocale`    |                           |                                                                                                                                          |
| - `defaultLocale` | `string`                  | 도메인 내의 기본 로케일입니다.                                                                                                           |
| - `domain`        | `string`                  | 특정 로케일과 연결된 도메인입니다.                                                                                                       |
| - `http`          | `boolean` \| `undefined`  | 도메인이 HTTP를 사용하는지 여부를 나타냅니다.                                                                                            |
| `locales`         | `string[]` \| `undefined` | 사용 가능한 로케일 배열입니다.                                                                                                           |
| `locale`          | `string` \| `undefined`   | 현재 활성화된 로케일입니다.                                                                                                              |
| `url`             | `URL`                     | URL 객체입니다.                                                                                                                          |

## ip

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

`table` 태그는 Markdown 형식으로 변경하세요.

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

geo 속성은 요청의 지리적 정보를 포함하는 객체입니다. 이 값은 호스팅 플랫폼에서 선택적으로 제공될 수 있습니다.

> 알아 두면 좋아요: Vercel에서는
> 기본적으로 이 값이 제공됩니다. 다른 플랫폼에서는 X-Forwarded-For
> 헤더를 사용하여 IP 주소를 제공한 다음, 제 3자 서비스를 사용하여
> 지리적 정보를 조회할 수 있습니다.

```js
// Vercel에서 제공되는 경우
request.geo.city;
request.geo.country;
request.geo.region;
request.geo.latitude;
request.geo.longitude;

// 자체 호스팅의 경우
function getGeo(request) {
  let ip = request.headers.get("X-Forwarded-For");
  // 제 3자 서비스를 사용하여 지리적 정보 조회
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
