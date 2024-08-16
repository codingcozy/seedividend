---
title: "Nextjs 14 클라이언트 컴포넌트에서 route 동적 params 가져오는 방법"
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





# Nextjs 14 클라이언트 컴포넌트에서 route 동적 params 가져오는 방법

useParams는 현재 URL에 의해 채워진 route의 동적 매개변수를 읽을 수 있게 해주는 클라이언트 컴포넌트 후크입니다.

```typescript
"use client";

import { useParams } from "next/navigation";

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params);

  return <></>;
}
```

## 매개변수

<div class="content-ad"></div>

```js
const params = useParams();
```

useParams 함수는 어떤 매개변수도 받지 않습니다.

## 반환값

useParams 함수는 현재 라우트의 동적 매개변수가 채워진 객체를 반환합니다.

<div class="content-ad"></div>

- 각 객체의 프로퍼티는 활성 동적 세그먼트입니다.
- 프로퍼티의 이름은 세그먼트의 이름이며, 프로퍼티의 값은 세그먼트가 채워지는 내용입니다.
- 프로퍼티의 값은 동적 세그먼트의 유형에 따라 문자열 또는 문자열 배열이 될 수 있습니다.
- 라우트에 동적 매개변수가 없으면 useParams는 빈 객체를 반환합니다.
- 페이지 라우터에서 사용할 경우, useParams는 초기 렌더링 시 null을 반환하고 라우터가 준비되면 위의 규칙을 따라 프로퍼티를 업데이트합니다.

예시:


| Route                     | URL         | useParams()            |
|---------------------------|-------------|----------------------- |
| app/shop/page.js          | /shop       | {}                     |
| app/shop/[slug]/page.js    | /shop/1     | { slug: '1' }          |
| app/shop/[tag]/[item]/page.js | /shop/1/2 | { tag: '1', item: '2' } |
| app/shop/[...slug]/page.js | /shop/1/2   | { slug: ['1', '2'] }    |


## 버전 기록

<div class="content-ad"></div>

| Version   | Changes                |
| --------- | ---------------------- |
| `v13.3.0` | `useParams` introduced |

<div class="content-ad"></div>
