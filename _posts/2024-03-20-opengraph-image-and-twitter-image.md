---
title: "Nextjs 14에서 오픈 그래프, 트위터에 보냈을 때 이미지 추가 하는 방법"
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

# Nextjs 14에서 오픈 그래프, 트위터에 보냈을 때 이미지 추가 하는 방법

opengraph-image와 twitter-image 파일 규칙을 사용하면 라우트 세그먼트에 대해 Open Graph 및 Twitter 이미지를 설정할 수 있습니다.

사용자가 사이트 링크를 공유할 때 소셜 네트워크와 메시징 앱에 나타나는 이미지를 설정하는 데 유용합니다.

Open Graph 및 Twitter 이미지 설정하는 두 가지 방법이 있습니다:

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

- 이미지 파일 (.jpg, .png, .gif)
- 이미지 생성을 위한 코드 (.js, .ts, .tsx)

## 이미지 파일 (.jpg, .png, .gif)

세그먼트의 공유 이미지를 설정하기 위해 opengraph-image 또는 twitter-image 이미지 파일을 해당 세그먼트에 배치합니다.

Next.js는 파일을 평가하고 해당 앱의 `head` 요소에 적절한 태그를 자동으로 추가합니다.

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

| File convention                               | Supported file types            |
| --------------------------------------------- | ------------------------------- |
| [opengraph-image](#opengraph-image)           | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [twitter-image](#twitter-image)               | `.jpg`, `.jpeg`, `.png`, `.gif` |
| [opengraph-image.alt](#opengraph-imagealttxt) | `.txt`                          |
| [twitter-image.alt](#twitter-imagealttxt)     | `.txt`                          |

### opengraph-image

Add an opengraph-image.(jpg|jpeg|png|gif) image file to any route segment.

```js
<meta property="og:image" content="<generated>" />
<meta property="og:image:type" content="<generated>" />
<meta property="og:image:width" content="<generated>" />
<meta property="og:image:height" content="<generated>" />
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

### twitter-image

어떤 경로 세그먼트에 twitter-image.(jpg|jpeg|png|gif) 이미지 파일을 추가하세요.

```js
<meta name="twitter:image" content="<generated>" />
<meta name="twitter:image:type" content="<generated>" />
<meta name="twitter:image:width" content="<generated>" />
<meta name="twitter:image:height" content="<generated>" />
```

### opengraph-image.alt.txt

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

같은 경로 세그먼트에 opengraph-image.(jpg|jpeg|png|gif) 이미지와 함께 opengraph-image.alt.txt 파일을 추가하세요. 해당 이미지의 alt 텍스트를 작성해 주세요.

```js
About Acme
```

```js
<meta property="og:image:alt" content="About Acme" />
```

### twitter-image.alt.txt

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
동양산업(ACME) 소개
```

```js
<meta property="twitter:image:alt" content="동양산업 소개" />
```

## 코드를 사용하여 이미지 생성 (.js, .ts, .tsx)

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

이미지 파일을 직접 사용하는 것 외에도 코드를 사용하여 이미지를 프로그래밍 방식으로 생성할 수 있습니다.

기본 내보내기 함수를 사용하여 opengraph-image 또는 twitter-image 경로를 생성하여 라우트 세그먼트의 공유 이미지를 생성합니다.

**File convention | Supported file types**

- `opengraph-image` | `.js`, `.ts`, `.tsx`
- `twitter-image` | `.js`, `.ts`, `.tsx`

> 알아두면 좋은 사항
> 기본적으로 생성된 이미지는 정적으로 최적화됩니다(빌드 시간에 생성되고 캐시됨), 동적 함수나 캐시되지 않은 데이터를 사용하지 않는 경우입니다.
> `generateImageMetadata`를 사용하여 동일한 파일에서 여러 이미지를 생성할 수 있습니다.

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

가장 쉬운 방법은 next/og의 ImageResponse API를 사용하여 이미지를 생성하는 것입니다.

```typescript
import { ImageResponse } from 'next/og'

// 라우트 세그먼트 설정
export const runtime = 'edge'

// 이미지 메타데이터
export const alt = '에이크미 소개'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// 이미지 생성
export default async function Image() {
  // 폰트
  const interSemiBold = fetch(
    new URL('./Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX 요소
      <div
        style={
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      >
        에이크미 소개
      </div>
    ),
    // ImageResponse 옵션
    {
      // 편의를 위해 opengraph-image로 내보낸 크기 설정을 이미지 응답의 너비와 높이로 재활용할 수 있습니다.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
```

```js
<meta property="og:image" content="<생성된 이미지 경로>" />
<meta property="og:image:alt" content="에이크미 소개" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Props

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

기본 내보내기 함수는 다음과 같은 props를 받습니다:

#### params (선택 사항)

루트 세그먼트에서 opengraph-image 또는 twitter-image 세그먼트까지의 동적 경로 매개변수 객체를 포함하는 객체가 혼재되어 있습니다.

```typescript
export default function Image({ params }: { params: { slug: string } }) {
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

Markdown 형식으로 변경한 테이블입니다.

### 결과

기본 내보내기 함수는 Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response를 반환해야 합니다.

> 알아두면 좋은 사실: ImageResponse는 이 반환 유형을 충족합니다.

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

### 설정 내보내기

이미지의 메타데이터를 구성할 수 있습니다. opengraph-image 또는 twitter-image 경로에서 alt, size 및 contentType 변수를 내보내는 방식으로 설정할 수 있습니다.

| Option                      | Type                                                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [alt](#alt)                 | `string`                                                                                                         |
| [size](#size)               | `{ width: number; height: number }`                                                                              |
| [contentType](#contenttype) | `string` - [이미지 MIME 타입](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) |

#### alt

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
export const alt = "나의 이미지 대체 텍스트";

export default function Image() {}
```

```js
<meta property="og:image:alt" content="나의 이미지 대체 텍스트" />
```

#### 크기

```typescript
export const size = { width: 1200, height: 630 };

export default function Image() {}
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

```js
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

#### contentType

```typescript
export const contentType = "image/png";

export default function Image() {}
```

```js
<meta property="og:image:type" content="image/png" />
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

#### 라우트 세그먼트 구성

opengraph-image와 twitter-image는 페이지 및 레이아웃과 같은 라우트 세그먼트 구성 옵션을 사용할 수 있는 특수화된 Route Handlers입니다.

| Option          | Type                                                     | Default    |
| --------------- | -------------------------------------------------------- | ---------- |
| dynamic         | `'auto' \| 'force-dynamic' \| 'error' \| 'force-static'` | `'auto'`   |
| revalidate      | `false \| 'force-cache' \| 0 \| number`                  | `false`    |
| runtime         | `'nodejs' \| 'edge'`                                     | `'nodejs'` |
| preferredRegion | `'auto' \| 'global' \| 'home' \| string \| string[]`     | `'auto'`   |

```typescript
export const runtime = "edge";

export default function Image() {}
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

### 예시

#### 외부 데이터 사용하기

이 예시는 params 객체와 외부 데이터를 사용하여 이미지를 생성합니다.

> 참고: 기본적으로 이 생성된 이미지는 정적으로 최적화됩니다. 개별 fetch 옵션이나 route 세그먼트 옵션을 구성하여 이 동작을 변경할 수 있습니다.

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
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Acme에 대해'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://.../posts/${params.slug}`).then((res) =>
    res.json()
  )

  return new ImageResponse(
    (
      <div
        style={
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    }
  )
}
```

## 버전 히스토리

| Version   | 변경 사항                                  |
| --------- | ------------------------------------------ |
| `v13.3.0` | `opengraph-image` 및 `twitter-image` 도입. |

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
