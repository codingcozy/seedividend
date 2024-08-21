---
title: "Nextjs 14 프로젝트 sitemapxml 만드는 방법"
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

# Nextjs 14 프로젝트 sitemap.xml 만드는 방법

사이트맵(.xml|js|ts)은 검색 엔진 크롤러가 귀하의 사이트를 더 효율적으로 인덱싱할 수 있도록 돕기 위해 Sitemaps XML 형식에 일치하는 특별한 파일입니다.

### 사이트맵 파일 (.xml)

작은 애플리케이션의 경우, 사이트맵.xml 파일을 생성하여 앱 디렉터리의 루트에 배치할 수 있습니다.

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 코드를 사용하여 사이트맵 생성하기 (.js, .ts)

sitemap.(js|ts) 파일 컨벤션을 사용하여 프로그래밍적으로 사이트맵을 생성할 수 있습니다. 기본 함수를 내보내어 URL 배열을 반환합니다. TypeScript를 사용하는 경우 Sitemap 유형을사용할 수 있습니다.

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
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

```js
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 다중 사이트맵 생성

대부분의 애플리케이션에는 단일 사이트맵이 작동합니다. 그러나 대규모 웹 애플리케이션의 경우 사이트맵을 여러 파일로 분할해야 할 수도 있습니다.

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

여러 개의 사이트맵을 만드는 두 가지 방법이 있습니다:

- 다음과 같이 여러 경로 세그먼트 안에 사이트맵.(xml|js|ts)을 중첩해서 만들기 (예: app/sitemap.xml 및 app/products/sitemap.xml).
- generateSitemaps 함수를 사용하는 방법.

예를 들어, generateSitemaps를 사용하여 사이트맵을 분할하려면, 사이트맵 ID가 있는 객체 배열을 반환한 다음 해당 ID를 사용하여 고유한 사이트맵을 생성하세요.

```typescript
import { BASE_URL } from "@/app/lib/constants";

export async function generateSitemaps() {
  // 총 제품 수를 가져와 필요한 사이트맵 수를 계산합니다.
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // 구글의 제한은 사이트맵 당 50,000개의 URL입니다.
  const start = id * 50000;
  const end = start + 50000;
  const products = await getProducts(`SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`);
  return products.map((product) => ({
    url: `${BASE_URL}/product/${id}`,
    lastModified: product.date,
  }));
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

프로덕션 환경에서 생성된 사이트맵은 /.../sitemap/[id].xml 경로에서 확인할 수 있습니다. 예를 들어, /product/sitemap/1.xml입니다.

개발 환경에서는 생성된 사이트맵을 /.../sitemap.xml/[id] 경로에서 확인할 수 있습니다. 예를 들어, /product/sitemap.xml/1 입니다. 이 차이는 일시적이며 프로덕션 형식을 따를 것입니다.

자세한 정보는 generateSitemaps API 레퍼런스를 참조하세요.

## 반환 결과

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

디폴트 함수는 sitemap.(xml|ts|js)에서 다음과 같은 속성을 가진 객체 배열을 반환해야 합니다:

```js
type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}>
```

## 버전 히스토리

| Version   | Changes                                                |
| --------- | ------------------------------------------------------ |
| `v13.4.5` | `changeFrequency` 및 `priority` 속성을 sitemap에 추가. |
| `v13.3.0` | `sitemap` 도입.                                        |

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
