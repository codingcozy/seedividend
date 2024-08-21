---
title: "Nextjs 14에서 generateStaticParams로 동적 경로 세그먼트 생성하기"
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

# Nextjs 14에서 generateStaticParams로 동적 경로 세그먼트 생성하기

generateStaticParams 함수는 동적 경로 세그먼트와 함께 사용되어, 요청 시간이 아닌 빌드 시간에 라우트를 정적으로 생성할 수 있습니다.

```js
// [slug] 동적 세그먼트를 채우기 위한 `params` 목록 반환
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다
export default function Page({ params }) {
  const { slug } = params;
  // ...
}
```

> 좋아하는 기능
> 동적 세그먼트가 generateStaticParams로 생성되지 않은 경우 어떻게 처리할지를 제어할 수 있는 dynamicParams 세그먼트 구성 옵션을 사용할 수 있습니다.
> next dev에서는 라우트로 이동할 때 generateStaticParams가 호출됩니다.
> next build에서는 해당 레이아웃이나 페이지가 생성되기 전에 generateStaticParams가 실행됩니다.
> revalidation (ISR) 중에는 generateStaticParams가 다시 호출되지 않습니다.
> generateStaticParams는 페이지 라우터의 getStaticPaths 함수를 대체합니다.

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

## 매개변수

options.params (선택 사항)

루트에 여러 동적 세그먼트가 있는 경우 generateStaticParams를 사용해 각 동적 세그먼트를 생성합니다. 부모가 생성하는 매개변수 집합마다 자식 generateStaticParams 함수가 한 번씩 실행됩니다.

params 객체에는 부모 generateStaticParams로부터 생성된 매개변수가 포함되어 있습니다. 이를 사용하여 자식 세그먼트의 매개변수를 생성할 수 있습니다.

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

## 반환값

generateStaticParams은 각 개별 경로의 채워진 동적 세그먼트를 나타내는 객체 배열을 반환해야 합니다.

- 객체 내 각 속성은 경로에 대해 채워야 할 동적 세그먼트입니다.
- 속성의 이름은 세그먼트의 이름이며, 속성의 값은 그 세그먼트를 채워야 할 값입니다.

Markdown 형식으로 변경된 표입니다.

| 예제 경로                        | `generateStaticParams` 반환 형식          |
| -------------------------------- | ----------------------------------------- |
| `/product/[id]`                  | `{ id: string }[]`                        |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]`            | `{ slug: string[] }[]`                    |

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

## 단일 동적 세그먼트

```typescript
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

// `generateStaticParams`에서 반환된 `params`를 사용하여
// 이 페이지의 세 가지 버전이 정적으로 생성될 것입니다.
// - /product/1
// - /product/2
// - /product/3
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  // ...
}
```

## 다중 동적 세그먼트

```typescript
export function generateStaticParams() {
  return [
    { category: "a", product: "1" },
    { category: "b", product: "2" },
    { category: "c", product: "3" },
  ];
}

// `generateStaticParams`에서 반환된 `params`를 사용하여
// 이 페이지의 세 가지 버전이 정적으로 생성될 것입니다.
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default function Page({ params }: { params: { category: string; product: string } }) {
  const { category, product } = params;
  // ...
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

## 모든 동적 세그먼트 캐치하기

```typescript
export function generateStaticParams() {
  return [{ slug: ["a", "1"] }, { slug: ["b", "2"] }, { slug: ["c", "3"] }];
}

// `generateStaticParams`에서 반환된 `params`를 사용하여
// 이 페이지의 세 가지 버전이 정적으로 생성됩니다.
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  // ...
}
```

## 예시

### 라우트에서 여러 동적 세그먼트 사용하기

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

현재 레이아웃 또는 페이지 위에 동적 세그먼트를 생성할 수 있지만 아래에는 생성할 수 없습니다. 예를 들어, app/products/[category]/[product] 경로가 주어졌을 때:

- app/products/[category]/[product]/page.js는 [category] 및 [product] 모두에 대한 매개변수를 생성할 수 있습니다.
- app/products/[category]/layout.js는 [category]에 대한 매개변수만 생성할 수 있습니다.

여러 동적 세그먼트를 갖는 경로에 대한 매개변수를 생성하는 두 가지 방법이 있습니다:

### 아래에서부터 위로 매개변수 생성

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

```typescript
// [category] 및 [product]을 모두 위한 세그먼트 생성
export async function generateStaticParams() {
  const products = await fetch("https://.../products").then((res) => res.json());

  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }));
}

export default function Page({ params }: { params: { category: string; product: string } }) {
  // ...
}
```

### 위에서 아래로 매개변수 생성

먼저 상위 세그먼트를 생성하고 결과를 사용하여 하위 세그먼트를 생성합니다.

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

```typescript
// [category]에 대한 세그먼트를 생성합니다
export async function generateStaticParams() {
  const products = await fetch("https://.../products").then((res) => res.json());

  return products.map((product) => ({
    category: product.category.slug,
  }));
}

export default function Layout({ params }: { params: { category: string } }) {
  // ...
}
```

부모 세그먼트가 생성하는 각 세그먼트마다 자식 라우트 세그먼트의 generateStaticParams 함수가 한 번씩 실행됩니다.

자식 generateStaticParams 함수는 부모 generateStaticParams 함수에서 반환된 params를 사용하여 자체 세그먼트를 동적으로 생성할 수 있습니다.

```typescript
// [product]에 대한 세그먼트를 `generateStaticParams` 함수에서 전달된 `params`를 사용하여 생성합니다
export async function generateStaticParams({ params: { category } }: { params: { category: string } }) {
  const products = await fetch(`https://.../products?category=${category}`).then((res) => res.json());

  return products.map((product) => ({
    product: product.id,
  }));
}

export default function Page({ params }: { params: { category: string; product: string } }) {
  // ...
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

> 좋은 정보입니다: fetch 요청은 모든 generate 접두사 함수, 레이아웃, 페이지 및 서버 구성 요소 전체에서 동일한 데이터에 대해 자동으로 메모이제이션됩니다. fetch를 사용할 수 없을 때 React 캐시를 사용할 수 있습니다.

### 매개변수의 하위 집합만 생성

원하는 동적 세그먼트만 생성하려면 배열 형태로 돌려주되 generateStaticParams로 생성되지 않은 동적 세그먼트가 방문되었을 때 어떻게 처리할지를 제어할 수 있습니다. 이를 위해서 dynamicParams 세그먼트 구성 옵션을 사용합니다.

```js
// 상위 10개의 게시물을 제외한 모든 게시물은 404가 될 것입니다.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());
  const topPosts = posts.slice(0, 10);

  return topPosts.map((post) => ({
    slug: post.slug,
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

## 버전 이력

| 버전      | 변경 내용                      |
| --------- | ------------------------------ |
| `v13.0.0` | `generateStaticParams` 도입됨. |

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
