---
title: "Server action으로 Nextjs에서 서버 동작 작성하는 방법"
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

# 서버 동작

당신의 Next.js 어플리케이션에서 서버 동작 동작을 구성하는 옵션입니다.

## allowedOrigins

서버 동작이 호출될 수 있는 추가 안전한 오리진 도메인 목록입니다. Next.js는 서버 동작 요청의 오리진과 호스트 도메인을 비교하여 CSRF 공격을 방지하기 위해 일치 여부를 확인합니다. 제공되지 않은 경우 동일한 오리진만 허용됩니다.

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
/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
    },
  },
};
```

## bodySizeLimit

기본적으로 Server Action으로 전송되는 요청 본문의 최대 크기는 1MB입니다. 이는 대량의 데이터를 구문 분석할 때 발생하는 과도한 서버 리소스 소비 및 잠재적인 DDoS 공격을 방지하기 위한 것입니다.

그러나 serverActions.bodySizeLimit 옵션을 사용하여이 제한을 구성할 수 있습니다. 이는 바이트 수 또는 바이트에서 지원하는 어떤 문자열 형식을 사용할 수 있습니다. 예를들어 1000, `500kb` 또는 `3mb`와 같은 형식이 가능합니다.

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
/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};
```

## 서버 액션 활성화 (v13)

서버 액션은 Next.js 14에서 안정적인 기능으로 출시되었으며 기본적으로 활성화되어 있습니다. 그러나 이전 버전의 Next.js를 사용 중이라면 experimental.serverActions를 true로 설정하여 활성화할 수 있습니다.

```js
/** @type {import('next').NextConfig}') */
const config = {
  experimental: {
    serverActions: true,
  },
};

module.exports = config;
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
