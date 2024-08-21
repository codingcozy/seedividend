---
title: "Nextjs 14에서 lazy loading으로 렌더링 하는 방법"
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

# Nextjs 14에서 lazy loading으로 렌더링 하는 방법

Next.js의 'Lazy Loading'은 라우트를 렌더링하기 위해 필요한 JavaScript 양을 줄여 애플리케이션의 초기 로딩 성능을 향상시키는 데 도움이 됩니다.
클라이언트 컴포넌트와 가져온 라이브러리의 로딩을 지연시키고, 사용자가 필요할 때에만 클라이언트 번들에 포함시킬 수 있습니다. 예를 들어, 사용자가 모달을 열 때까지 모달의 로딩을 지연시킬 수 있습니다.
Next.js에서 'Lazy Loading'을 구현하는 두 가지 방법이 있습니다:

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

- 다음/dynamic을 사용하여 동적 가져오기
- React.lazy()와 Suspense를 사용하는 방법
  기본적으로, 서버 컴포넌트는 자동으로 코드 분할되며, 스트리밍을 사용하여 서버에서 클라이언트로 UI 조각을 점진적으로 전송할 수 있습니다. 지연 로딩은 클라이언트 컴포넌트에 적용됩니다.

## 다음/dynamic

다음/dynamic은 React.lazy()와 Suspense의 조합입니다. 앱과 페이지 디렉토리에서 동일하게 작동하여 점진적으로 마이그레이션할 수 있도록 합니다.

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

## 예시

### 클라이언트 컴포넌트 가져오기

```js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// 클라이언트 컴포넌트:
const ComponentA = dynamic(() => import("../components/A"));
const ComponentB = dynamic(() => import("../components/B"));
const ComponentC = dynamic(() => import("../components/C"), { ssr: false });

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {/* 즉시 로드되지만 별도의 클라이언트 번들에 포함됨 */}
      <ComponentA />

      {/* 필요 시에만 로드되고, 조건이 충족되면 */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>토글</button>

      {/* 클라이언트 사이드에서만 로드됨 */}
      <ComponentC />
    </div>
  );
}
```

### SSR 생략

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

React.lazy()과 Suspense를 사용할 때, Client Components는 기본적으로 사전 렌더링(서버 측 렌더링)됩니다.
만약 Client Component의 사전 렌더링을 비활성화하고 싶다면, ssr 옵션을 false로 설정하여 사용할 수 있습니다:

```js
const ComponentC = dynamic(() => import("../components/C"), { ssr: false });
```

### 서버 컴포넌트 가져오기

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

동적으로 서버 컴포넌트를 가져오면 서버 컴포넌트 자체가 지연로드되지 않고 서버 컴포넌트의 자식인 클라이언트 컴포넌트만이 지연로드됩니다.

```js
import dynamic from "next/dynamic";

// 서버 컴포넌트:
const ServerComponent = dynamic(() => import("../components/ServerComponent"));

export default function ServerComponentExample() {
  return (
    <div>
      <ServerComponent />
    </div>
  );
}
```

### 외부 라이브러리 로드

외부 라이브러리는 import() 함수를 사용하여 필요에 따라 로드할 수 있습니다. 이 예시는 퍼즈 검색을 위해 외부 라이브러리 fuse.js를 사용합니다. 사용자가 검색 입력란에 입력을 할 때에만 모듈이 클라이언트에 로드됩니다.

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
'사용자용'

import { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
      <input
        type="text"
        placeholder="검색"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // fuse.js 동적으로 로드
          const Fuse = (await import('fuse.js')).default
          const fuse = new Fuse(names)

          setResults(fuse.search(value))
        }
      />
      <pre>결과: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
```

### 사용자 정의로딩 컴포넌트 추가

```js
import dynamic from "next/dynamic";

const WithCustomLoading = dynamic(() => import("../components/WithCustomLoading"), {
  loading: () => <p>로딩 중...</p>,
});

export default function Page() {
  return (
    <div>
      {/* <WithCustomLoading/>이 로드 중일 때 로딩 컴포넌트가 렌더링됩니다 */}
      <WithCustomLoading />
    </div>
  );
}
```

### Named Exports 가져오기

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

명명된 내보내기를 동적으로 가져오려면, import() 함수에서 반환된 Promise에서 해당 내보내기를 반환할 수 있어요:

```js
"use client";

export function Hello() {
  return <p>Hello!</p>;
}
```

```js
import dynamic from "next/dynamic";

const ClientComponent = dynamic(() => import("../components/hello").then((mod) => mod.Hello));
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
