---
title: "Nextjs Webpack 설정 하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# 사용자 정의 Webpack 설정

> 참고: 웹팩 구성 변경은 세맨버로 덮지 않으므로 자신의 책임 하에 진행하십시오.

귀하의 애플리케이션에 사용자 정의 웹팩 구성을 추가하기 전에 Next.js가 이미 귀하의 사용 사례를 지원하는지 확인하십시오:

- CSS 임포트
- CSS 모듈
- Sass/SCSS 임포트
- Sass/SCSS 모듈

<div class="content-ad"></div>

일부 자주 요청되는 기능은 플러그인으로 제공됩니다:

- @next/mdx
- @next/bundle-analyzer

웹팩의 사용을 확장하기 위해 next.config.js 내에서 구성(config)을 확장하는 함수를 정의할 수 있습니다. 아래와 같이:

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // 중요: 수정된 구성을 반환하세요
    return config;
  },
};
```

<div class="content-ad"></div>

> 웹팩 함수는 서버(nodejs / edge 실행 환경)에 대해 두 번, 클라이언트에 대해 한 번 실행됩니다. 이를 통해 isServer 속성을 사용하여 클라이언트와 서버 구성을 구분할 수 있습니다.

웹팩 함수의 두 번째 인수는 다음과 같은 속성을 가진 객체입니다:

- buildId: String - 빌드 id로 두 빌드 간에 고유 식별자로 사용됩니다.
- dev: Boolean - 컴파일이 개발 중에 수행될지 여부를 나타냅니다.
- isServer: Boolean - 서버 측 컴파일에 대해서는 true이며, 클라이언트 측 컴파일에 대해서는 false입니다.
- nextRuntime: String | undefined - 서버 측 컴파일을 위한 대상 런타임; "edge" 또는 "nodejs" 중 하나이며, 클라이언트 측 컴파일에 대해서는 정의되지 않습니다.
- defaultLoaders: Object - Next.js에서 내부적으로 사용되는 기본 로더:
  babel: Object - 기본 babel-loader 구성

defaultLoaders.babel 사용 예시:

<div class="content-ad"></div>

```js
// 베이블 로더에 의존하는 로더를 추가하는 예시 설정
// 이 소스는 @next/mdx 플러그인 소스에서 가져왔습니다:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: pluginOptions.options,
        },
      ],
    });

    return config;
  },
};
```

#### nextRuntime

nextRuntime이 "edge" 또는 "nodejs"인 경우 isServer가 true임을 알 수 있습니다. 현재 nextRuntime "edge"는 미들웨어 및 에지 런타임에서만 서버 컴포넌트를 위한 것입니다.

<div class="content-ad"></div>
