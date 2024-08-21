---
title: "Nextjs 13 프로젝트 번들 분석 도구"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "번들 분석 도구"
link: "undefined"
isUpdated: true
---

# 번들 분석기

@next/bundle-analyzer는 Next.js용 플러그인으로서 자바스크립트 모듈의 크기를 관리하는 데 도움이 됩니다. 각 모듈과 해당 종속성의 크기에 대한 시각적 보고서를 생성합니다. 이 정보를 사용하여 큰 종속성을 제거하거나 코드를 분할하거나 필요할 때 일부 부분만 로드하도록 설정하여 클라이언트로 전송되는 데이터 양을 줄일 수 있습니다.

## 설치

다음 명령을 실행하여 플러그인을 설치하세요:

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
npm i @next/bundle-analyzer
# 또는
yarn add @next/bundle-analyzer
# 또는
pnpm add @next/bundle-analyzer
```

그런 다음 bundle analyzer의 설정을 next.config.js에 추가하세요.

```js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
```

## 번들 분석하기

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

아래 명령어를 실행하여 번들을 분석하세요:

```js
ANALYZE=true npm run build
# 또는
ANALYZE=true yarn build
# 또는
ANALYZE=true pnpm build
```

이 보고서는 브라우저에서 세 개의 새 탭을 열어 확인할 수 있습니다. 개발하면서 정기적으로 이를 수행하고 사이트를 배포하기 전에 확인하는 것은 큰 번들을 빨리 식별하고 응용 프로그램을 더 효율적으로 설계하는 데 도움이 될 수 있습니다.

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
