---
title: "Nextjs 14에서 ImageResponse로 이미지 동적 생성하는 방법"
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

# Nextjs 14에서 ImageResponse로 이미지 동적 생성하는 방법

ImageResponse 생성자를 사용하면 JSX와 CSS를 사용하여 동적 이미지를 생성할 수 있습니다. 이는 Open Graph 이미지, Twitter 카드 등의 소셜 미디어 이미지를 생성하는 데 유용합니다.

다음은 ImageResponse에서 사용할 수 있는 옵션입니다:

```js
import { ImageResponse } from 'next/og'

new ImageResponse(
  element: ReactElement,
  options: {
    width?: number = 1200
    height?: number = 630
    emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
    fonts?: {
      name: string,
      data: ArrayBuffer,
      weight: number,
      style: 'normal' | 'italic'
    }[]
    debug?: boolean = false

    // HTTP 응답에 전달될 옵션
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
)
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

## 지원되는 CSS 속성

지원되는 HTML 및 CSS 기능 목록은 Satori의 문서를 참조해주세요.

## 버전 히스토리

| 버전      | 변경 내용                                                       |
| --------- | --------------------------------------------------------------- |
| `v14.0.0` | `ImageResponse`이 `next/server`에서 `next/og`로 이동되었습니다. |
| `v13.3.0` | `ImageResponse`는 `next/server`에서 가져올 수 있습니다.         |
| `v13.0.0` | `@vercel/og` 패키지를 통해 `ImageResponse`가 소개되었습니다.    |

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
