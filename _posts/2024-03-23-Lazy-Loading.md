---
title: "Nextjs 13 이미지 Lazy Loading 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "게으름을 떼다"
link: "undefined"
isUpdated: true
---

# Lazy Loading

레이지 로딩은 Next.js에서 경로를 렌더링하는 데 필요한 JavaScript 양을 줄여 애플리케이션의 초기 로딩 성능을 향상시켜주는 기능입니다.

클라이언트 컴포넌트와 가져온 라이브러리의 로딩을 지연시키고, 필요할 때에만 클라이언트 번들에 포함되도록 합니다. 예를 들어 사용자가 모달을 열 때까지 모달의 로딩을 지연시키고 싶을 수 있습니다.

Next.js에서 레이지 로딩을 구현하는 두 가지 방법이 있습니다:

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

- 다이나믹 임포트를 next/dynamic로 사용하기
- React.lazy() 및 Suspense를 사용하기

기본적으로, 서버 컴포넌트는 자동으로 코드를 분할하며, 서버에서 클라이언트로 UI 조각들을 점진적으로 전송할 수 있는 스트리밍을 사용할 수 있습니다. Lazy loading은 클라이언트 컴포넌트에 적용됩니다.

## next/dynamic

next/dynamic은 React.lazy()와 Suspense의 결합체입니다. 앱 및 페이지 디렉토리에서 동일한 방식으로 작동하여 점진적인 이주를 가능하게 합니다.

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

next/dynamic을 사용하면 헤더 컴포넌트가 페이지의 초기 JavaScript 번들에 포함되지 않습니다. 페이지는 Suspense 대기 상태를 먼저 렌더링한 다음, Suspense 경계가 해결되면 헤더 컴포넌트를 렌더링합니다.

```js
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/header"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DynamicHeader />;
}
```

> 알아두면 좋은 점: import(`경로/컴포넌트`)에서 경로는 명시적으로 작성되어야 합니다. 템플릿 문자열이나 변수로 사용할 수 없습니다. 또한 import()는 webpack 번들/모듈 ID를 specific dynamic() 호출에 일치시키고 렌더링 전에 프리로드하기 위해 dynamic() 호출 내부에서 이뤄져야 합니다. dynamic()는 React 렌더링 내부에 사용할 수 없으며, 프리로딩이 작동하려면 모듈의 최상위 수준에서 표시되어야 합니다. React.lazy와 유사합니다.

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

## 이름이 지정된 내보내기

이름이 지정된 내보내기를 동적으로 가져오려면, import()에서 반환된 Promise로부터 해당 값을 반환할 수 있습니다:

```js
export function Hello() {
  return <p>Hello!</p>;
}

// pages/index.js
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/hello").then((mod) => mod.Hello));
```

## SSR 없이

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

클라이언트 측에서 컴포넌트를 동적으로 로드하려면 ssr 옵션을 사용하여 서버 렌더링을 비활성화할 수 있습니다. 이 기능은 외부 종속성이나 컴포넌트가 window와 같은 브라우저 API에 의존하는 경우 유용합니다.

```js
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/header"), {
  ssr: false,
});
```

## 외부 라이브러리 사용하기

이 예제는 퍼지 검색을 위해 외부 라이브러리인 fuse.js를 사용합니다. 사용자가 검색 입력란에 입력을 할 때에만 모듈이 브라우저에서 로드됩니다.

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

```jsx
import { useState } from "react";

const names = ["Tim", "Joe", "Bel", "Lee"];

export default function Page() {
  const [results, setResults] = useState();

  return (
    <div>
      <input
        type="text"
        placeholder="검색"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // 동적으로 fuse.js를 로드합니다
          const Fuse = (await import("fuse.js")).default;
          const fuse = new Fuse(names);

          setResults(fuse.search(value));
        }}
      />
      <pre>결과: {JSON.stringify(results, null, 2)}</pre>
    </div>
  );
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
