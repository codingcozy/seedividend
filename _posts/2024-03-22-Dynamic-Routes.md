---
title: "Nextjs 13 PageRouter Dynamic Route"
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





# 다이내믹 라우트

당신이 정확한 세그먼트 이름을 미리 알 수 없고 동적 데이터에서 라우트를 생성하고 싶을 때, 요청 시 채워지는 동적 세그먼트나 빌드 시 미리 렌더링되는 동적 세그먼트를 사용할 수 있습니다.

## 규칙

동적 세그먼트는 파일이나 폴더 이름을 대괄호로 감싸서 생성할 수 있습니다: [세그먼트명]. 예를 들면 [id]나 [slug]와 같이 사용할 수 있습니다.

<div class="content-ad"></div>

`useRouter`를 통해 동적 세그먼트에 접근할 수 있습니다.

## 예시

예를 들어, 블로그는 다음과 같은 route `pages/blog/[slug].js`를 포함할 수 있으며 여기서 `[slug]`는 블로그 포스트를 위한 동적 세그먼트입니다.

```js
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Post: {router.query.slug}</p>;
}
```

<div class="content-ad"></div>

| Route                | Example URL | `params`      |
| -------------------- | ----------- | ------------- |
| pages/blog/[slug].js | /blog/a     | { slug: 'a' } |
| pages/blog/[slug].js | /blog/b     | { slug: 'b' } |
| pages/blog/[slug].js | /blog/c     | { slug: 'c' } |

## Catch-all Segments

동적 세그먼트는 대괄호 내부에 ellipsis를 추가하여 이후 모든 세그먼트를 포함할 수 있습니다. ([...segmentName]).

예를 들어, pages/shop/[...slug].js는 /shop/clothes와 /shop/clothes/tops, /shop/clothes/tops/t-shirts 등과 일치합니다.

<div class="content-ad"></div>


| Route                  | Example URL           | `params`            |
|------------------------|-----------------------|---------------------|
| `pages/shop/[...slug].js` | `/shop/a`              | `{ slug: ['a'] }`   |
| `pages/shop/[...slug].js` | `/shop/a/b`            | `{ slug: ['a', 'b'] }` |
| `pages/shop/[...slug].js` | `/shop/a/b/c`          | `{ slug: ['a', 'b', 'c'] }` |

## Optional Catch-all Segments

Catch-all Segments can be made optional by including the parameter in double square brackets: [[...segmentName]].

For example, `pages/shop/[[...slug]].js` will also match `/shop`, in addition to `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts`.


<div class="content-ad"></div>

catch-all과 optional catch-all 세그먼트의 차이점은 옵션으로, 매개 변수 없이 라우트도 일치합니다(위 예제의 경우 /shop).

| Route                       | Example URL   | `params`                    |
| --------------------------- | ------------- | --------------------------- |
| `pages/shop/[[...slug]].js` | `/shop`       | `{ slug: [] }`              |
| `pages/shop/[[...slug]].js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `pages/shop/[[...slug]].js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `pages/shop/[[...slug]].js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

<div class="content-ad"></div>
