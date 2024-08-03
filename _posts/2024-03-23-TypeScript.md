---
title: "Nextjs 13에서 타입스크립트 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: "undefined"
---



# TypeScript

Next.js는 React 애플리케이션을 구축하기 위한 TypeScript를 우선으로 한 개발 환경을 제공합니다.

필요한 패키지를 자동으로 설치하고 적절한 설정을 구성하기 위한 내장된 TypeScript 지원이 제공됩니다.

## 새 프로젝트

<div class="content-ad"></div>

프로젝트에 TypeScript를 추가하려면 파일을 .ts / .tsx로 이름을 변경하세요. 그런 다음 next dev 및 next build를 실행하여 필요한 종속성을 자동으로 설치하고 권장 구성 옵션으로 tsconfig.json 파일을 추가할 수 있습니다.

<div class="content-ad"></div>

만약 이미 jsconfig.json 파일이 있는 경우에는, 이전 jsconfig.json 파일에서 paths 컴파일러 옵션을 새 tsconfig.json 파일로 복사하고 이전 jsconfig.json 파일을 삭제해주세요.

## TypeScript 최소 버전

적어도 TypeScript v4.5.2 버전 이상을 사용하는 것이 매우 권장됩니다. 이를 통해 import 이름에 대한 유형 수정자 및 성능 향상과 같은 구문 기능을 얻을 수 있습니다.

## 정적 생성과 서버 사이드 렌더링

<div class="content-ad"></div>

getStaticProps, getStaticPaths, getServerSideProps에 대한 정보를 공유드릴게요. 각각 GetStaticProps, GetStaticPaths 및 GetServerSideProps 유형을 사용할 수 있습니다:

```js
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps = (async (context) => {
  // ...
})가 GetStaticProps을 만족시킵니다

export const getStaticPaths = (async () => {
  // ...
})가 GetStaticPaths를 만족시킵니다

export const getServerSideProps = (async (context) => {
  // ...
})가 GetServerSideProps을 만족시킵니다
```

> 알아두면 좋아요: TypeScript 4.9에 satisfies가 추가되었습니다. TypeScript의 최신 버전으로 업그레이드하는 것을 권장합니다.

## API Routes

<div class="content-ad"></div>

다음은 API 라우트에 내장된 유형을 사용하는 예시입니다:

```js
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
```

또한 응답 데이터에 유형을 지정할 수 있습니다:

```js
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string,
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" });
}
```

<div class="content-ad"></div>

## 사용자 정의 앱

사용자 정의 앱이 있으신 경우, 내장된 AppProps 유형을 사용하고 파일 이름을 ./pages/\_app.tsx로 변경할 수 있습니다:

```js
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

## 경로 별칭 및 baseUrl

<div class="content-ad"></div>

Next.js는 tsconfig.json의 "paths" 및 "baseUrl" 옵션을 자동으로 지원합니다.

이 기능에 대해 자세히 알아보려면 Module Path aliases documentation을 확인해보세요.

## Type checking next.config.js

next.config.js 파일은 Babel이나 TypeScript에서 구문 분석되지 않으므로 JavaScript 파일이어야 합니다. 그러나 아래와 같이 JSDoc을 사용하여 IDE에서 일부 유형 검사를 추가할 수 있습니다:

<div class="content-ad"></div>

```js
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
};

module.exports = nextConfig;
```

## 점진적 타입 확인

v10.2.1부터 Next.js는 tsconfig.json에서 활성화된 경우
증분 유형 확인을 지원합니다. 이 기능을 사용하면 큰 애플리케이션에서 타입 확인 속도를 높일 수 있습니다.

## TypeScript 오류 무시하기

<div class="content-ad"></div>

Next.js는 프로젝트에 TypeScript 오류가 있을 때 `next build`를 통해 프로덕션 빌드에 실패합니다.

만약 Next.js가 애플리케이션에 오류가 있더라도 프로덕션 코드를 생성하도록 하려면 내장된 타입 체크 단계를 비활성화할 수 있습니다.

비활성화된 경우 빌드나 배포 프로세스의 일부로 타입 체크를 실행하는지 확인하십시오. 그렇지 않으면 매우 위험할 수 있습니다.

`next.config.js` 파일을 열고 typescript 구성에서 `ignoreBuildErrors` 옵션을 활성화하세요:

<div class="content-ad"></div>

```js
module.exports = {
  typescript: {
    // !! 경고 !!
    // 프로젝트에 유형 오류가 있더라도 제작 빌드를 성공적으로 완료할 수 있도록합니다.
    // !! 경고 !!
    ignoreBuildErrors: true,
  },
};
```

## 사용자 정의 유형 선언

사용자 정의 유형을 선언해야하는 경우 next-env.d.ts를 수정하려는 유혹에 빠질 수 있습니다. 그러나이 파일은 자동으로 생성되므로 수행 한 모든 변경 내용이 덮어 씌워 집니다. 대신 새 파일을 만들어야합니다. 새 파일을 new-types.d.ts라고 부르고 tsconfig.json에서 참조하세요.

```js
{
  "compilerOptions": {
    "skipLibCheck": true
    //...생략...
  },
  "include": [
    "new-types.d.ts",
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": ["node_modules"]
}
```

<div class="content-ad"></div>

## 버전 변경사항

| Version   | Changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v13.2.0` | 정적으로 타입이 지정된 링크가 베타 버전으로 사용 가능합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `v12.0.0` | 더 빠른 빌드를 위해 TypeScript 및 TSX를 컴파일하기 위해 기본적으로 <a href="/docs/architecture/nextjs-compiler">SWC</a>이(가) 사용됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `v10.2.1` | <code>tsconfig.json</code>에서 활성 상태인 경우 <a href="https://www.typescriptlang.org/tsconfig#incremental" rel="noopener noreferrer nofollow" target="_blank">잘못된 타입 확인<span class="inline-flex"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:currentColor;width:14px;height:14px"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span></a> 대응이 추가되었습니다. |

<div class="content-ad"></div>
