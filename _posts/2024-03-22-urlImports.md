---
title: "Nextjs 13 urlImports 사용 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# urlImports

URL imports는 실험적인 기능으로, 외부 서버에서 모듈을 직접 가져올 수 있게 해줍니다 (로컬 디스크가 아닌).

> 주의: 이 기능은 실험적입니다. 기곤하신 도메인만 사용하여 다운로드하고 기계에서 실행하십시오. 기능이 안정적으로 플래그 지정되기 전까지 주의하고 신중하게 사용하십시오.

참여하려면 다음의 허용된 URL 접두사를 next.config.js 안에 추가하십시오:

<div class="content-ad"></div>

```js
module.exports = {
  experimental: {
    urlImports: ["https://example.com/assets/", "https://cdn.skypack.dev"],
  },
};
```

그리고 다음과 같이 URL에서 모듈을 직접 가져올 수 있습니다:

```js
import { a, b, c } from "https://example.com/assets/some/module.js";
```

URL Imports는 일반적인 패키지 가져오기가 가능한 곳이라면 어디에서든 사용할 수 있습니다.

<div class="content-ad"></div>

## 보안 모델

이 기능은 보안을 최우선으로 고려하여 설계되고 있습니다. 먼저, URL 가져오기를 명시적으로 허용해야 하는 실험적인 플래그가 추가되었습니다. 이 기능을 보다 나아가, Edge Runtime을 사용하여 브라우저 샌드박스에서 URL 가져오기를 제한하는 작업을 진행 중에 있습니다.

## 잠금 파일

URL 가져오기를 사용할 때, Next.js는 lockfile과 가져온 에셋이 포함된 next.lock 디렉토리를 생성합니다. 이 디렉토리는 .gitignore에 무시되지 않고 Git에 커밋되어야 합니다.

<div class="content-ad"></div>

- Next.js에서 next dev를 실행하면 새로 발견된 모든 URL Imports이 lockfile에 추가되는 동시에 다운로드됩니다.
- Next.js에서 next build를 실행하면 애플리케이션을 프로덕션용으로 빌드할 때 lockfile만 사용됩니다.

일반적으로 네트워크 요청이 필요하지 않으며 오래된 lockfile은 빌드를 실패하게 만들 수 있습니다. 예외는 Cache-Control: no-cache로 응답하는 리소스입니다. 이러한 리소스는 lockfile에 no-cache 항목이 포함되어 있으며 각 빌드마다 네트워크에서 항상 가져올 것입니다.

## 예시

### Skypack

<div class="content-ad"></div>

```js
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    confetti();
  });
  return <p>Hello</p>;
};
```

### 정적 이미지 가져오기

```js
import Image from "next/image";
import logo from "https://example.com/assets/logo.png";

export default () => (
  <div>
    <Image src={logo} placeholder="blur" />
  </div>
);
```

### CSS에서의 URL

<div class="content-ad"></div>

```js
.className {
  background: url('https://example.com/assets/hero.jpg');
}
```

### 자산 가져오기

```js
const logo = new URL("https://example.com/assets/file.txt", import.meta.url);

console.log(logo.pathname);

// 출력: "/_next/static/media/file.a9727b5d.txt"
```

<div class="content-ad"></div>
