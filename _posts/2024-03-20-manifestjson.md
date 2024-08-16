---
title: "Nextjs 14 사이트 정보를 담은 manifestjson 작성 방법"
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





# Nextjs 14 사이트 정보를 담은 manifest.json 작성 방법

웹 어플리케이션에 관한 정보를 브라우저에 제공하기 위해 앱 디렉토리 루트에 Web Manifest Specification과 일치하는 manifest.(json|webmanifest) 파일을 추가하거나 생성해 주세요.

## 정적 Manifest 파일

```js
{
  "name": "나의 Next.js 어플리케이션",
  "short_name": "Next.js 어플",
  "description": "Next.js로 만들어진 어플리케이션",
  "start_url": "/"
  // ...
}
```

<div class="content-ad"></div>

## Manifest 파일 생성하기

Manifest 객체를 반환하는 manifest.js 또는 manifest.ts 파일을 추가해주세요.

```typescript
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js 앱",
    short_name: "Next.js 앱",
    description: "Next.js 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
```

### Manifest 객체

<div class="content-ad"></div>

manifest 오브젝트에는 새로운 웹 표준에 따라 업데이트 될 수 있는 많은 옵션 목록이 포함되어 있습니다. 현재 옵션에 대한 모든 정보는 TypeScript를 사용하는 경우 코드 편집기에서 `MetadataRoute.Manifest` 타입을 참조하거나 MDN 문서를 확인해주세요.

<div class="content-ad"></div>
