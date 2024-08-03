---
title: "Nextjs14 에서 generateImageMetadata로 이미지 메타데이터 생성하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# Nextjs14 에서 generateImageMetadata로 이미지 메타데이터 생성하는 방법

generateImageMetadata를 사용하여 이미지의 여러 버전을 생성하거나 하나의 경로 세그먼트에 대해 여러 이미지를 반환할 수 있습니다. 이 기능은 아이콘과 같은 하드 코딩된 메타데이터 값을 피하고 싶을 때 유용합니다.

## 매개변수

generateImageMetadata 함수는 다음 매개변수를 받습니다:

<div class="content-ad"></div>

#### params (선택 사항)

generateImageMetadata 세그먼트에서 루트 세그먼트까지가 필요한 동적 라우트 매개 변수 객체를 포함하는 객체.

```typescript
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  // ...
}
```

| Route                           | URL         | params                    |
| ------------------------------- | ----------- | ------------------------- |
| `app/shop/icon.js`              | `/shop`     | `undefined`               |
| `app/shop/[slug]/icon.js`       | `/shop/1`   | `{ slug: '1' }`           |
| `app/shop/[tag]/[item]/icon.js` | `/shop/1/2` | `{ tag: '1', item: '2' }` |
| `app/shop/[...slug]/icon.js`    | `/shop/1/2` | `{ slug: ['1', '2'] }`    |

<div class="content-ad"></div>

## 반환값

`generateImageMetadata` 함수는 이미지의 메타데이터인 alt와 크기 등을 포함한 객체 배열을 반환해야 합니다. 또한 각 항목은 이미지 생성 함수의 속성으로 전달될 id 값을 포함해야 합니다.

표 형식을 Markdown 형식으로 변경합니다.

```typescript
import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
  ]
}

export default function Icon({ id }: { id: string }) {
  return new ImageResponse(
    (
      <div
        style={
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 88,
          background: '#000',
          color: '#fafafa',
        }
      >
        Icon {id}
      </div>
    )
  )
}
```

<div class="content-ad"></div>

### 예시

#### 외부 데이터 사용

이 예시는 params 객체와 외부 데이터를 사용하여 경로 세그먼트를 위한 여러 개의 오픈 그래프 이미지를 생성합니다.

```typescript
import { ImageResponse } from "next/og";
import { getCaptionForImage, getOGImages } from "@/app/utils/images";

export async function generateImageMetadata({ params }: { params: { id: string } }) {
  const images = await getOGImages(params.id);

  return images.map((image, idx) => ({
    id: idx,
    size: { width: 1200, height: 600 },
    alt: image.text,
    contentType: "image/png",
  }));
}

export default async function Image({ params, id }: { params: { id: string }; id: number }) {
  const productId = params.id;
  const imageId = id;
  const text = await getCaptionForImage(productId, imageId);

  return new ImageResponse(
    (
      <div
        style={
          {
            // ...
          }
        }
      >
        {text}
      </div>
    )
  );
}
```

<div class="content-ad"></div>

## 버전 히스토리

| 버전      | 변경 내용                       |
| --------- | ------------------------------- |
| `v13.3.0` | `generateImageMetadata` 도입됨. |

<div class="content-ad"></div>
