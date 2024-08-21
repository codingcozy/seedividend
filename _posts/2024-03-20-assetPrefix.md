---
title: "Nextjs 14 assetPrefix 사용 방법"
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

# Nextjs 14 assetPrefix 사용 방법

> 안내: Vercel로 배포하면 Next.js 프로젝트에 글로벌 CDN이 자동으로 구성됩니다. 수동으로 자산 접두어를 설정할 필요가 없습니다.

> 유의해 주세요: Next.js 9.5+는 사용자 정의 기본 경로를 지원하며, /docs와 같은 하위 경로에 애플리케이션을 호스팅하는 데 더 적합합니다. 이 경우 사용자 정의 자산 접두어를 사용하지 않는 것이 좋습니다.

CDN 설정을 위해 자산 접두어를 설정하고 CDN의 오리진을 Next.js가 호스팅된 도메인으로 해결하면 됩니다.

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

next.config.js 파일을 열고 아래 코드를 추가해보세요:

```js
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // 프로덕션 환경에서는 CDN을 사용하고 개발 환경에서는 로컬 호스트를 사용합니다.
  assetPrefix: isProd ? "https://cdn.mydomain.com" : undefined,
};
```

Next.js는 자동으로 /\_next/ 경로 (.next/static/ 폴더)에서 로드하는 JavaScript 및 CSS 파일에 대해 지정된 asset prefix를 사용합니다. 예를 들어, 위 구성으로 설정한 경우 다음과 같은 JS 청크에 대한 요청:

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

선택한 CDN에 파일을 업로드하는 정확한 구성은 해당 CDN에 따라 다를 수 있습니다. CDN에 호스팅할 유일한 폴더는 .next/static/의 내용이어야 하며, 이 내용은 상기 URL 요청에 따라 \_next/static/으로 업로드해야 합니다. .next/ 폴더의 나머지 부분은 업로드하지 마십시오. 서버 코드 및 기타 설정을 공개해서는 안 되기 때문입니다.

assetPrefix는 \_next/static로의 요청을 다루지만 다음 경로에는 영향을 주지 않습니다:

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

- public 폴더 안의 파일들; CDN을 통해 해당 에셋을 제공하고 싶다면, 직접 접두사(prefix)를 도입해야 합니다.

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
