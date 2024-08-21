---
title: "Nextjs 에서 특정 페이지 캐싱하지 않는 방법unstable_noStore"
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

# Nextjs 에서 특정 페이지 캐싱하지 않는 방법(unstable_noStore)

unstable_noStore 는 정적 렌더링을 거부하고 특정 컴포넌트가 캐시되지 않아야 함을 선언적으로 나타내는 데 사용할 수 있습니다.

```js
import { unstable_noStore as noStore } from 'next/cache';

export default async function Component() {
  noStore();
  const result = await db.query(...);
  ...
}
```

> 유의할 점:
> unstable_noStore 는 fetch에서 사용되는 cache: `no-store` 와 동일합니다.
> unstable_noStore 는 export const dynamic = `force-dynamic` 보다 세밀하며 컴포넌트별로 사용할 수 있기 때문에 선호됩니다.

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

- unstable_cache 내부에서 unstable_noStore를 사용하는 경우 정적 생성을 선택하지 않습니다. 대신, 결과를 캐시할지 여부를 결정하는 데 캐시 구성을 따를 것입니다.

## 사용법

fetch에 추가 옵션을 전달하는 것을 선호하지 않는 경우(예: cache: `no-store` 또는 next: { revalidate: 0 }와 같은), 이러한 모든 경우의 대체로 noStore()를 사용할 수 있습니다.

```js
import { unstable_noStore as noStore } from 'next/cache';

export default async function Component() {
  noStore();
  const result = await db.query(...);
  ...
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

## 버전 내역

| 버전      | 변경 사항                            |
| --------- | ------------------------------------ |
| `v14.0.0` | `unstable_noStore`이 도입되었습니다. |

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
