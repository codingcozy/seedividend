---
title: "Nextjs 13 alias 경로 지정하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "절대 경로 Imports와 모듈 경로 별칭"
link: "undefined"
isUpdated: true
---

# 절대 경로 및 모듈 경로 별칭

Next.js에는 tsconfig.json 및 jsconfig.json 파일의 "paths" 및 "baseUrl" 옵션을 지원하는 기능이 내장되어 있습니다.

이러한 옵션을 사용하면 프로젝트 디렉토리를 절대 경로에 별칭으로 지정할 수 있어 모듈을 가져오기가 더 쉬워집니다. 예를 들어:

```js
// 이전
import { Button } from "../../../components/button";

// 변경 후
import { Button } from "@/components/button";
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

> 알아두면 좋은 사항: create-next-app은 이러한 옵션을 구성하도록 요청할 것입니다.

## 절대적인 Imports

baseUrl 구성 옵션을 사용하면 프로젝트의 루트에서 직접 가져올 수 있습니다.

이 구성의 예시:

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

```json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

```typescript
export default function Button() {
  return <button>Click me</button>;
}
```

```typescript
import Button from "components/button";

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  );
}
```

## 모듈 별칭

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

baseUrl 경로를 구성하는 것 외에도 "paths" 옵션을 사용하여 모듈 경로를 "별칭"할 수 있습니다.

예를 들어, 다음 구성은 "@/components/*"를 components/*에 매핑합니다:

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

```typescript
export default function Button() {
  return <button>Click me</button>;
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

```typescript
import Button from "@/components/button";

export default function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Button />
    </>
  );
}
```

각 "경로"는 baseUrl 위치를 기준으로 상대적입니다. 예를 들어:

```js
// tsconfig.json 또는 jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
    "@/styles/*": ["styles/*"],
    "@/components/*": ["components/*"]
    }
  }
}
```

```js
// pages/index.js
import Button from "@/components/button";
import "@/styles/styles.css";
import Helper from "utils/helper";

export default function HomePage() {
  return (
    <Helper>
      <h1>Hello World</h1>
      <Button />
    </Helper>
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
