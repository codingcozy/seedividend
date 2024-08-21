---
title: "Nextjs 14에서 request API를 편리하게 사용 하는 방법NextRequest"
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

# Nextjs 14에서 request API를 편리하게 사용 하는 방법(NextRequest)

- NextRequest는 Web Request API를 확장하여 추가적인 편리한 메소드를 제공합니다.

## 쿠키

- 요청의 Set-Cookie 헤더를 읽거나 변경할 수 있습니다.

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

주어진 이름으로 요청에 주어진 값의 쿠키를 설정합니다.

```js
// 수신된 요청 /home
// 배너를 숨기기 위한 쿠키 설정
// 요청에 `Set-Cookie:show-banner=false;path=/home` 헤더가 포함됩니다.
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

쿠키 이름을 입력하면 해당 쿠키의 값을 반환합니다. 찾을 수 없는 경우 undefined가 반환됩니다. 여러 개의 쿠키가 발견되면 첫 번째 쿠키가 반환됩니다.

```js
// 받은 요청 /home
// { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get("show-banner");
```

### getAll()

쿠키 이름을 입력하면 해당 쿠키의 값을 반환합니다. 이름이 지정되지 않은 경우 요청에 있는 모든 쿠키를 반환합니다.

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

쿠키 이름을 지정하여 요청에서 쿠키를 삭제합니다.

```js
// 삭제된 경우 true 반환, 아무것도 삭제되지 않으면 false 반환
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

쿠키 이름을 지정하면 해당 쿠키가 요청에 존재하는 경우 true를 반환합니다.

```js
// 쿠키가 존재하는 경우 true를 반환하고, 존재하지 않는 경우 false를 반환합니다.
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

기본 URL API를 확장하여 Next.js 특정 속성을 포함한 추가적인 편리한 메소드를 제공합니다.

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
// 요청이 /home으로 들어오면, pathname은 /home이에요.
request.nextUrl.pathname;
// /home?name=lee로 요청이 들어오면, searchParams는 { 'name': 'lee' }가 됩니다.
request.nextUrl.searchParams;
```

다음 옵션들을 선택할 수 있어요:

| Property       | Type                    | Description                                                                                                                           |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`     | `string`                | URL의 <a href="/docs/app/api-reference/next-config-js/basePath">베이스 패스</a>.                                                      |
| `buildId`      | `string` \| `undefined` | Next.js 애플리케이션의 빌드 식별자. <a href="/docs/app/api-reference/next-config-js/generateBuildId">사용자 정의 설정</a> 가능합니다. |
| `pathname`     | `string`                | URL의 경로명입니다.                                                                                                                   |
| `searchParams` | `Object`                | URL의 검색 매개변수입니다.                                                                                                            |

> 참고: 페이지 라우터에서의 국제화 속성은 앱 라우터에서 사용할 수 없어요. 앱 라우터와 함께 국제화에 대해 자세히 알아보세요.

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

## IP

IP 프로퍼티는 요청의 IP 주소를 포함한 문자열입니다. 이 값은 호스팅 플랫폼에서 선택적으로 제공될 수 있습니다.

> 알아 두면 좋아요: Vercel에서는
> , 이 값이 기본적으로 제공됩니다. 다른 플랫폼에서는 X-Forwarded-For
> 헤더를 사용하여 IP 주소를 제공할 수 있습니다.

```js
// Vercel에서 제공됨
request.ip;
// 자체 호스팅
request.headers.get("X-Forwarded-For");
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

## 지오

지오 속성은 요청의 지리적 정보를 포함하는 객체입니다. 이 값은 호스팅 플랫폼에서 선택적으로 제공될 수 있습니다.

> 좋아 알아두기: Vercel
> 에서는 이 값이 기본 제공됩니다. 다른 플랫폼에서는 X-Forwarded-For
> 헤더를 사용하여 IP 주소를 제공한 다음, 제 3자 서비스를 사용하여 지리 정보를 조회할 수 있습니다.

```js
// Vercel에서 제공
request.geo.city;
request.geo.country;
request.geo.region;
request.geo.latitude;
request.geo.longitude;

// Self-hosting
function getGeo(request) {
  let ip = request.headers.get("X-Forwarded-For");
  // 제 3자 서비스를 사용하여 지리 정보 조회
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
