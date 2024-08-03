---
title: "Nextjs 14 프로젝트 파비콘, 애플 아이콘 설정 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs 14 프로젝트 파비콘, 애플 아이콘 설정 방법

파비콘, 아이콘 또는 애플 아이콘 파일 관례를 사용하면 애플리케이션에 아이콘을 설정할 수 있습니다.

웹 브라우저 탭, 휴대폰 홈 화면 및 검색 엔진 결과와 같은 위치에 나타나는 앱 아이콘을 추가하는 데 유용합니다.

앱 아이콘을 설정하는 두 가지 방법이 있습니다:

<div class="content-ad"></div>

- 이미지 파일 사용하기 (.ico, .jpg, .png)
- 아이콘 생성을 위한 코드 사용하기 (.js, .ts, .tsx)

## 이미지 파일 (.ico, .jpg, .png)

앱 아이콘을 설정하기 위해 이미지 파일을 사용하세요. 파일명을 favicon, icon, 또는 apple-icon으로 설정하고 이를 /app 디렉토리 안에 넣어두세요. favicon 이미지는 app/ 디렉토리의 최상위에만 위치해야 합니다.

Next.js는 파일을 평가하여 앱의 `head` 요소에 적절한 태그를 자동으로 추가할 것입니다.

<div class="content-ad"></div>

| File convention           | Supported file types                    | Valid locations |
| ------------------------- | --------------------------------------- | --------------- |
| [favicon](#favicon)       | `.ico`                                  | `app/`          |
| [icon](#icon)             | `.ico`, `.jpg`, `.jpeg`, `.png`, `.svg` | `app/**/*`      |
| [apple-icon](#apple-icon) | `.jpg`, `.jpeg`, `.png`                 | `app/**/*`      |

### favicon

`/app` 경로 세그먼트에 favicon.ico 이미지 파일을 추가합니다.

```js
<link rel="icon" href="/favicon.ico" sizes="any" />
```

<div class="content-ad"></div>

### 아이콘

아이콘을 추가합니다. (ico|jpg|jpeg|png|svg) 이미지 파일.

```js
<link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
```

### 애플 아이콘

<div class="content-ad"></div>

아래는 Markdown 형식으로 table tag를 변경한 내용입니다.

| Good to know                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| You can set multiple icons by adding a number suffix to the file name. For example, icon1.png, icon2.png, etc. Numbered files will sort lexically.                                                                                             |
| Favicons can only be set in the root /app segment. If you need more granularity, you can use icon.                                                                                                                                             |
| The appropriate `link` tags and attributes such as rel, href, type, and sizes are determined by the icon type and metadata of the evaluated file. For example, a 32 by 32px .png file will have type="image/png" and sizes="32x32" attributes. |
| sizes="any" is added to favicon.ico output to avoid a browser bug where an .ico icon is favored over .svg.                                                                                                                                     |

<div class="content-ad"></div>

이미지 파일을 직접 사용하는 것 외에도 코드를 사용하여 프로그래밍적으로 아이콘을 생성할 수 있습니다.

기본적으로 함수를 내보내는 아이콘 또는 apple-icon 경로를 만들어서 앱 아이콘을 생성해보세요.

| 파일 규칙    | 지원하는 파일 유형   |
| ------------ | -------------------- |
| `icon`       | `.js`, `.ts`, `.tsx` |
| `apple-icon` | `.js`, `.ts`, `.tsx` |

아이콘을 생성하는 가장 쉬운 방법은 next/og에서 ImageResponse API를 사용하는 것입니다.

<div class="content-ad"></div>

```typescript
import { ImageResponse } from "next/og";

// 라우트 세그먼트 구성
export const runtime = "edge";

// 이미지 메타데이터
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// 이미지 생성
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX 요소
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        A
      </div>
    ),
    // ImageResponse 옵션
    {
      // 편의를 위해 내보낸 아이콘 크기 메타데이터를 이미지 응답의 너비와 높이로 설정할 수 있습니다.
      ...size,
    }
  );
}
```

```js
<link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
```

> 잘 알아두세요
> 기본적으로 생성된 아이콘은 정적으로 최적화됩니다(빌드 시 생성되고 캐시됨), 동적 함수나 캐시되지 않은 데이터를 사용하지 않는 이상.
> generateImageMetadata를 사용하여 동일한 파일에서 여러 아이콘을 생성할 수 있습니다.
> 파비콘 아이콘을 생성할 수 없습니다. 대신 아이콘이나 favicon.ico 파일을 사용하세요.

### 속성들

<div class="content-ad"></div>

기본 내보내기 함수는 다음과 같은 프롭을 받습니다:

#### params (옵션)

루트 세그먼트부터 세그먼트 아이콘 또는 apple-icon까지의 동적 라우트 매개변수 객체를 포함하는 객체입니다.

```typescript
export default function Icon({ params }: { params: { slug: string } }) {
  // ...
}
```

<div class="content-ad"></div>

## 테이블

| Route                           | URL         | `params`                  |
| ------------------------------- | ----------- | ------------------------- |
| `app/shop/icon.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/icon.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/icon.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
| `app/shop/[...slug]/icon.js`    | `/shop/1/2` | `{ slug: ['1', '2'] }`    |

### 반환값

기본 내보내기 함수는 Blob | ArrayBuffer | TypedArray | DataView | ReadableStream | Response 중 하나를 반환해야 합니다.

> 참고: ImageResponse는 이 반환 유형을 충족합니다.

<div class="content-ad"></div>

### Config exports

아이콘 또는 애플 아이콘 루트에서 size 및 contentType 변수를 내보내어 아이콘의 메타데이터를 선택적으로 구성할 수 있습니다.

| Option                      | Type                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [size](#size)               | `{ width: number; height: number }`                                                                                                                                                                                                                                                                                                                                                                                 |
| [contentType](#contenttype) | `string` - [image MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types) <span><svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="width:14px;height:14px"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span> |

#### size

<div class="content-ad"></div>

```typescript
export const size = { width: 32, height: 32 };

export default function Icon() {}
```

```js
<link rel="icon" sizes="32x32" />
```

#### contentType

```typescript
export const contentType = "image/png";

export default function Icon() {}
```

<div class="content-ad"></div>

```js
<link rel="icon" type="image/png" />
```

#### 라우트 세그먼트 구성

아이콘 및 애플 아이콘은 페이지 및 레이아웃과 동일한 라우트 세그먼트 구성 옵션을 사용할 수 있는 특수화된 라우트 핸들러입니다.

| Option                                                                                           | Type                                                                       | Default    |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------- |
| [dynamic](/docs/app/api-reference/file-conventions/route-segment-config#dynamic)                 | `'auto'   \| 'force-dynamic' \| 'error'    \| 'force-static'`              | `'auto'`   |
| [revalidate](/docs/app/api-reference/file-conventions/route-segment-config#revalidate)           | `false    \| 'force-cache'   \| 0          \| number`                      | `false`    |
| [runtime](/docs/app/api-reference/file-conventions/route-segment-config#runtime)                 | `'nodejs' \| 'edge'`                                                       | `'nodejs'` |
| [preferredRegion](/docs/app/api-reference/file-conventions/route-segment-config#preferredregion) | `'auto'   \| 'global'        \| 'home'     \| string          \| string[]` | `'auto'`   |

<div class="content-ad"></div>

```typescript
export const runtime = "edge";

export default function Icon() {}
```

## Version History

| Version   | Changes                                        |
| --------- | ---------------------------------------------- |
| `v13.3.0` | `favicon`, `icon`, and `apple-icon` introduced |

<div class="content-ad"></div>
