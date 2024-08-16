---
title: "Nextjs 14에서 generateSitemaps로 사이트맵 생성하기"
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





# Nextjs 14에서 generateSitemaps로 사이트맵 생성하기

generateSitemaps 함수를 사용하여 애플리케이션에 대한 여러 사이트맵을 생성할 수 있습니다.

## 반환값

generateSitemaps 함수는 id 속성을 가진 객체 배열을 반환합니다.

<div class="content-ad"></div>

## URL

프로덕션 환경에서 생성된 사이트맵은 /.../sitemap/[id].xml에서 확인할 수 있습니다. 예를 들어, /product/sitemap/1.xml.

개발 환경에서 생성된 사이트맵은 /.../sitemap.xml/[id]에서 확인 가능합니다. 예를 들어, /product/sitemap.xml/1. 이 차이는 임시적이며, 프로덕션 형식을 따를 것입니다.

## 예시

<div class="content-ad"></div>

예를 들어, generateSitemaps를 사용하여 사이트맵을 분할하려면 sitemap id를 포함한 객체 배열을 반환하세요. 그런 다음 해당 id를 사용하여 고유한 사이트맵을 생성하세요.

```typescript
import { BASE_URL } from "@/app/lib/constants";

export async function generateSitemaps() {
  // 총 제품 수를 가져와 필요한 사이트맵 수를 계산합니다
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Google의 제한은 사이트맵 당 50,000개의 URL입니다
  const start = id * 50000;
  const end = start + 50000;
  const products = await getProducts(`SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`);
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }));
}
```

<div class="content-ad"></div>
