---
title: "Nextjs 14 CSS in JS 라이브러리"
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

# Nextjs 14 CSS in JS 라이브러리

# CSS-in-JS

> 경고: 서버 컴포넌트에서 런타임 JavaScript를 필요로 하는 CSS-in-JS 라이브러리는 현재 지원되지 않습니다. CSS-in-JS를 사용하는 것은 React Server Components와 Streaming을 포함한 최신 React 버전을 지원하는 라이브러리 저자에게 필요합니다.
> 우리는 React 팀과 협업하여 React Server Components와 스트리밍 아키텍처를 지원하는 CSS 및 JavaScript 자산을 처리하기 위한 상류 API에 대해 작업 중입니다.

다음 라이브러리는 앱 디렉토리의 클라이언트 컴포넌트에서 지원됩니다(알파벳순):

- chakra-ui
- kuma-ui
- @mui/material
- @mui/joy
- pandacss
- styled-jsx
- styled-components
- stylex
- tamagui
- tss-react
- vanilla-extract

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

현재 지원 작업 중인 라이브러리는 다음과 같습니다:

- emotion

> 알아두면 좋은 점: 우리는 다양한 CSS-in-JS 라이브러리를 테스트하고 React 18 기능이나 앱 디렉토리를 지원하는 라이브러리에 대한 더 많은 예제를 추가할 예정입니다.

서버 컴포넌트를 스타일링하려면 CSS 모듈이나 PostCSS 또는 Tailwind CSS와 같은 CSS 파일을 출력하는 다른 솔루션을 사용하는 것을 권장합니다.

## 앱에서 CSS-in-JS 구성

CSS-in-JS를 구성하는 것은 세 단계의 선택 프로세스로 이루어집니다:

- 모든 CSS 규칙을 모아 놓는 스타일 레지스트리
- 사용하기 전에 스타일 레지스트리에 규칙을 주입하는 새로운 useServerInsertedHTML 훅
- 초기 서버 측 렌더링 중에 앱을 스타일 레지스트리로 래핑하는 클라이언트 컴포넌트

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

### styled-jsx

styled-jsx를 클라이언트 컴포넌트에서 사용하려면 v5.1.0을 사용해야 합니다. 먼저 새로운 레지스트리를 만들어 보세요:

```typescript
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

export default function StyledJsxRegistry({ children }: { children: React.ReactNode }) {
  // 초기 상태로 스타일시트를 한 번만 생성합니다
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
```

그런 다음 루트 레이아웃을 레지스트리로 래핑하세요:

```typescript
import StyledJsxRegistry from "./registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
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

예제는 여기에서 확인할 수 있습니다.

### Styled Components

styled-components@6 이상을 구성하는 방법에 대한 예시입니다:

먼저 next.config.js에서 styled-components를 활성화하세요.

```js
module.exports = {
  compiler: {
    styledComponents: true,
  },
};
```

그런 다음 styled-components API를 사용하여 렌더링 중에 생성된 모든 CSS 스타일 규칙을 수집하는 전역 레지스트리 컴포넌트와 해당 규칙을 반환하는 함수를 만들어 보세요. 그런 다음 useServerInsertedHTML 훅을 사용하여 레지스트리에서 수집된 스타일을 루트 레이아웃의 `<head>` HTML 태그에 주입하세요.

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
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // 초기 상태로 스타일시트를 한 번만 생성합니다
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
}
```

루트 레이아웃의 children을 스타일 레지스트리 컴포넌트로 래핑하세요:

```typescript
import StyledComponentsRegistry from "./lib/registry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
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

예제는 여기에서 확인할 수 있습니다.

> 알아두면 좋은 점:
> 서버 렌더링 중에 스타일은 전역 레지스트리로 추출되어 HTML의 `<head>`에 플러시됩니다. 이렇게 하면 스타일 규칙이 사용되는 모든 내용 앞에 배치됩니다. 향후에는 스타일을 주입할 위치를 결정하기 위해 향상된 React 기능을 사용할 수 있을 것입니다.
> 스트리밍 중에는 각 청크에서 스타일이 수집되고 기존 스타일에 추가됩니다. 클라이언트 측 하이드레이션이 완료된 후에는 styled-components가 일반적으로 이어지고 추가적인 동적 스타일을 주입합니다.
> 스타일 레지스트리의 최상위 레벨에 클라이언트 컴포넌트를 사용하는 이유는 CSS 규칙을 이 방식으로 추출하는 것이 더 효율적이기 때문입니다. 이렇게 하면 후속 서버 렌더링에서 스타일을 다시 생성하는 것을 피하고 서버 컴포넌트 페이로드로 보내지 않습니다.
> styled-components 컴파일링의 개별 속성을 구성해야 하는 고급 사용 사례에 대해서는 Next.js styled-components API 참조를 참고하세요.
