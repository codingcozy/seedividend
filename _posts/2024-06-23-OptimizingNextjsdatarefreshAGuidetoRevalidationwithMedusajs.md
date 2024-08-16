---
title: "Nextjs 데이터 새로 고침 최적화 Medusajs로 리밸리데이션하는 방법 안내"
description: ""
coverImage: "/assets/img/2024-06-23-OptimizingNextjsdatarefreshAGuidetoRevalidationwithMedusajs_0.png"
date: 2024-06-23 13:45
ogImage: 
  url: /assets/img/2024-06-23-OptimizingNextjsdatarefreshAGuidetoRevalidationwithMedusajs_0.png
tag: Tech
originalTitle: "Optimizing Next.js data refresh: A Guide to Revalidation with Medusa.js"
link: "https://medium.com/rigby-software-house/optimizing-next-js-data-refetch-a-guide-to-revalidation-with-medusa-js-2906d8ae2c8f"
isUpdated: true
---




![OptimizingNext.jsdatarefreshAGuidetoRevalidationwithMedusajs_0](/assets/img/2024-06-23-OptimizingNextjsdatarefreshAGuidetoRevalidationwithMedusajs_0.png)

안녕하세요! 내부 서버를 사용하여 Next.js 애플리케이션에서 다시 유효성을 설정하는 가이드에 오신 것을 환영합니다. 이 자습서에서는 다양한 다시 유효성 유형을 탐색하고 그들의 보안을 향상하는 방법을 살펴볼 것입니다.

# 왜 다시 유효성 검사가 중요한가요?

다시 유효성 검사는 매 요청마다 소스에서 데이터를 가져오는 것을 피하고 웹 응용 프로그램의 성능을 향상시키기 위해 중요합니다. 기본적으로 Next.js는 fetch를 사용하여 요청을 캐시하며, POST 요청도 포함됩니다. 다시 유효성 검사를 하지 않거나 데이터 캐시를 선택적으로 사용하지 않는 경우, 애플리케이션이 사실상 정적으로 변할 것입니다.

<div class="content-ad"></div>

### 재확인의 두 가지 유형:

- 시간 기반 재확인
- 요청에 따른 재확인

### 1. 시간 기반 재확인

시간 기반 재확인은 Next.js 애플리케이션의 데이터에 대한 캐시 유효 기간을 설정하는 간단한 방법입니다. 밀리초(millisecond)로 간격을 지정함으로써 데이터가 캐시에서 유효한 기간을 정의할 수 있습니다. 다음은 이를 구현하는 방법입니다:

<div class="content-ad"></div>

```js
fetch('https://example.pl/api/products', { next: { revalidate: 3600 } })
```

이 예제에서 revalidate 옵션이 3600초(1시간)로 설정되어 있습니다. 이는 지정된 API 엔드포인트에서 가져온 데이터가 최대 1시간 동안 신선하다고 간주됨을 의미합니다. 이 기간이 지나면 데이터를 새로 고칠 요청이 이루어집니다.

대안으로 페이지나 구성 요소 파일 자체에서 revalidate 속성을 사용할 수도 있습니다:

```js
// app/products/page.tsx

export const revalidate = 3600 // 최대 1시간마다 재검증
```

<div class="content-ad"></div>

이 접근 방식은 캐시를 주기적으로 업데이트하고 애플리케이션이 지속적인 요청으로 서버를 과부하시키지 않고 최신 데이터를 제공하는 데 특히 유용합니다.

## 2. 요청에 의한 재유효화

요청에 의한 재유효화는 필요할 때만 데이터를 새로 고쳐야 하는 유연성을 제공하며, 이를 캐시 태그나 서버 액션 또는 라우트 핸들러 내에서 특정 경로를 사용하여 달성할 수 있습니다. 아래는 설정 방법입니다:

```js
export default async function Page() {
  const res = await fetch(
    'https://example.pl/api/products', 
    { next: { tags: ['products'] } } // 이 부분이 마법이 일어나는 곳입니다
  ) 
  const data = await res.json()

  return (
  ...
}
```

<div class="content-ad"></div>

위의 코드를 한국어로 번역하면 다음과 같습니다.

Next.js에서 라우트 핸들러를 만들어보겠습니다

```js
// app/api/revalidate/[tag]/route.ts

export async function POST(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  const tag = params.tag

  revalidateTag(tag);

  return NextResponse.json({ revalidated: tag });
}
```

이 라우트에 접근할 때 URL http://localhost:3000/api/revalidate/products를 사용하면 캐시를 삭제하고 최신 데이터로 다시 가져옵니다.

내부 서버에서 다시 유효성을 검증하는 방법

<div class="content-ad"></div>

우리의 라우트 핸들러를 개선하여 쿼리 매개변수에 비밀 키를 포함시키는 것이 좋겠어요. 이렇게 하면 권한이 있는 사용자만 재확인 프로세스를 수동으로 트리거할 수 있습니다.

```js
// app/api/revalidate/[tag]/route.ts

export async function POST(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  const tag = params.tag
  // 검색 매개변수에서 비밀 키 가져오기
  const secret = request.nextUrl.searchParams.get('secret');

  // 비밀 키 확인
  if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: tag });
}
```

환경 변수에 REVALIDATE_SECRET도 추가해주세요:

```js
// .env
REVALIDATE_SECRET=supersecret_revalidate_key
```

<div class="content-ad"></div>

이제 Medusa.js를 사용하고 있다고 가정하고 서버로 이동하여 각 제품 업데이트마다 구독자를 구현해 봅시다.

```js
// src/subscribers/product.ts
import axios from "axios";

class ProductSubscriber {
  constructor({ eventBusService }) {
    eventBusService.subscribe(
      "product.created",
      this.revalidateOnDemand
    );
    eventBusService.subscribe(
      "product.updated",
      this.revalidateOnDemand
    );
    eventBusService.subscribe(
      "product.deleted",
      this.revalidateOnDemand
    );
  }

  revalidateOnDemand = async () => {
    await axios.post(process.env.FRONTEND_REVALIDATE_URL/products, {
      params: {
        secret: process.env.FRONTEND_REVALIDATE_SECRET
      },
    });
  };
}

export default ProductSubscriber;
```

`.env` 파일에 다음 변수들을 포함시키세요.

```js
// .env
REVALIDATE_SECRET=supersecret_revalidate_key
FRONTEND_REVALIDATE_URL=http://localhost.3000/api/revalidate
```

<div class="content-ad"></div>

# 마무리

이러한 전략을 활용하여 성능 최적화와 데이터 신선도 사이의 균형을 유지할 수 있습니다. URL 매개변수에 비밀 키를 추가하여 권한이 있는 사용자만 수동 재확인을 트리거할 수 있도록하는 것은 귀하의 애플리케이션의 보안을 강화합니다.

본 문서가 도움이 되었기를 바랍니다.

읽어 주셔서 감사합니다.