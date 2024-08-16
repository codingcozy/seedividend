---
title: "Nextjs 14 동적 라우트Dynamic Route 사용 방법"
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





# Nextjs 14 동적 라우트(Dynamic Route) 사용 방법

# 동적 라우트

정확한 세그먼트 이름을 미리 알 수 없고 동적 데이터에서 라우트를 생성하려면 요청 시간에 채워지는 동적 세그먼트나 빌드 시간에 사전 렌더링되는 동적 세그먼트를 사용할 수 있습니다.

## 규칙

폴더 이름을 대괄호로 감싸면 동적 세그먼트를 만들 수 있습니다: [폴더이름]. 예를 들어, [id] 또는 [slug]입니다.

동적 세그먼트는 레이아웃(layout), 페이지(page), 라우트(route), generateMetadata 함수의 params 속성으로 전달됩니다.

<div class="content-ad"></div>

## 예시

예를 들어, 블로그는 다음과 같은 라우트를 포함할 수 있습니다: app/blog/[slug]/page.js 여기서 [slug]는 블로그 포스트의 동적 세그먼트입니다.

```typescript
export default function Page({ params }: { params: { slug: string } }) {
  return <div>내 글: {params.slug}</div>;
}
```

| 라우트                  | 예시 URL | params        |
| ----------------------- | -------- | ------------- |
| app/blog/[slug]/page.js | /blog/a  | { slug: 'a' } |
| app/blog/[slug]/page.js | /blog/b  | { slug: 'b' } |
| app/blog/[slug]/page.js | /blog/c  | { slug: 'c' } |

세그먼트의 params를 생성하는 방법을 알아보려면 generateStaticParams() 페이지를 참조하세요.

> 참고: 동적 세그먼트는 페이지 디렉터리의 동적 라우트와 동일합니다.

<div class="content-ad"></div>

## 정적 params 생성

generateStaticParams 함수는 동적 라우트 세그먼트와 함께 사용하여 요청 시간이 아닌 빌드 시간에 정적으로 라우트를 생성할 수 있습니다.

```typescript
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

generateStaticParams 함수의 주요 장점은 데이터를 스마트하게 검색할 수 있다는 것입니다. generateStaticParams 함수 내에서 fetch 요청을 사용하여 콘텐츠를 가져오면 요청은 자동으로 메모이제이션됩니다. 이는 동일한 인수를 가진 여러 generateStaticParams, 레이아웃(layout), 페이지(page)에서의 fetch 요청은 한 번만 이루어지므로 빌드 시간이 감소합니다.

페이지 디렉터리에서 마이그레이션하는 경우 마이그레이션 가이드를 참조하세요.

더 많은 정보와 고급 사용 사례에 대한 generateStaticParams 서버 함수 문서를 참조하세요.

<div class="content-ad"></div>

## Catch-all 세그먼트

동적 세그먼트는 대괄호 안에 마침표를 추가하여 이후 모든 세그먼트를 캐치할 수 있습니다: [...폴더이름].

예를 들어, app/shop/[...slug]/page.js는 /shop/clothes와 일치하지만 /shop/clothes/tops, /shop/clothes/tops/t-shirts 등도 일치합니다.

| 라우트                     | 예시 URL    | params                    |
| -------------------------- | ----------- | ------------------------- |
| app/shop/[...slug]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[...slug]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[...slug]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |

## 선택적 Catch-all 세그먼트

Catch-all 세그먼트는 이중 대괄호에 매개변수를 포함하여 선택적으로 만들 수 있습니다: [[...폴더이름]].

예를 들어, app/shop/[[...slug]]/page.js는 /shop 뿐만 아니라 /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts와도 일치합니다.

Catch-all과 선택적 catch-all 세그먼트의 차이점은 선택적으로 라우트에 매개변수가 포함되어 있어도 (/shop의 경우) 해당 라우트도 일치된다는 것입니다.

| 라우트                       | 예시 URL    | params                    |
| ---------------------------- | ----------- | ------------------------- |
| app/shop/[[...slug]]/page.js | /shop       | {}                        |
| app/shop/[[...slug]]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[[...slug]]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[[...slug]]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |

<div class="content-ad"></div>

## TypeScript

TypeScript를 사용할 때, 구성된 라우트 세그먼트에 맞게 params에 대한 타입을 추가할 수 있습니다.

```typescript
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>내 페이지</h1>;
}
```

| 라우트                            | params 타입 정의                       |
| --------------------------------- | -------------------------------------- |
| app/blog/[slug]/page.js           | { slug: string }                       |
| app/shop/[...slug]/page.js        | { slug: string[] }                     |
| app/shop/[[...slug]]/page.js      | { slug?: string[] }                    |
| app/[categoryId]/[itemId]/page.js | { categoryId: string, itemId: string } |

> 참고: 이러한 작업은 향후 TypeScript 플러그인에서 자동으로 수행될 수 있습니다.
