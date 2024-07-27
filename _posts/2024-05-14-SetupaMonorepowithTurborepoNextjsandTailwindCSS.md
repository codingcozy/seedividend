---
title: "TurboRepo, Nextjs 및 Tailwind CSS를 사용하여 Monorepo 설정하기"
description: ""
coverImage: "/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_0.png"
date: 2024-05-14 10:31
ogImage: 
  url: /assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_0.png
tag: Tech
originalTitle: "Setup a Monorepo with Turborepo, Next.js, and Tailwind CSS"
link: "https://medium.com/@mrizkiaiman/setup-a-monorepo-with-turborepo-next-js-and-tailwind-css-5cd751d34bc9"
---


현대 웹 애플리케이션이 크기와 복잡성 모두 증가함에 따라, 개발자들은 코드베이스를 더 효율적으로 관리할 방법을 찾고 있습니다. 모노리포는 여러 프로젝트를 단일 저장소에서 관리할 수 있는 솔루션을 제공합니다.

그러나 모노리포를 수동으로 설정하는 것은 거대한 작업일 수 있습니다. 여기서 Turborepo가 나타납니다. Turborepo는 여러 단계를 자동화하여 모노리포를 만드는 프로세스를 간소화하는 도구입니다. 이 글에서는 Turborepo를 사용하여 Next.js(기본 프로젝트)를 프로젝트 베이스로, Tailwind CSS를 스타일링으로 포함하는 모노리포를 설정해보겠습니다.

시작해봅시다!

![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_0.png)



# 1. 새로운 Monorepo 생성하기

먼저 다음 명령어를 사용하여 Turborepo Monorepo를 만들어보겠습니다:

```js
npx create-turbo@latest
```

이 명령어를 실행하면, 생성 위치를 선택하고 패키지 매니저를 선택하라는 프롬프트가 표시됩니다. 본 문서에서는 yarn을 사용하겠지만, npm이나 pnpm과 같은 원하는 패키지 매니저를 선택할 수 있습니다.



<img src="/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_1.png" />

설치가 완료되면 디렉토리로 이동하세요 (cd yourProjectName) 그리고 원하는 IDE에서 프로젝트를 열어보세요.

이제 다음 명령어를 사용하여 실행 테스트를 할 수 있습니다.

```js
yarn install && yarn dev
```



만약 당신의 터미널이 아래와 같이 나타나면, 세팅이 완료된 것입니다.

![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_2.png)

## 2. 디렉터리 설명

자, 이제 Turborepo에 의해 생성된 폴더 구조와 프로젝트에 대해 이야기해보겠습니다.



![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_3.png)

- apps는 이 단일 리포지토리에 있는 모든 애플리케이션입니다. 기본적으로 (npx create-turbo@latest로부터), docs 및 web 애플리케이션(Next.js)이 생성됩니다.
- packages 파일에는 eslint, tsconfig 및 모든 리포지토리 전체에 걸쳐 요소를 지배하는 공유 구성요소가 포함됩니다.
- package.json 이 설정의 주목할만한 측면 중 하나는 Yarn 작업 영역을 사용하여 단일 리포지토리 내에서 여러 패키지와 종속성을 관리할 수 있다는 것입니다. package.json에는 또한 apps 디렉터리에서 단일 리포지토리의 애플리케이션을 실행하는 데 필요한 종속성 및 스크립트도 포함되어 있습니다.

![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_4.png)

- turbo.json은 Turborepo가 파이프라인을 구성하고 관리하는 데 사용하는 구성 파일입니다. 이 파이프라인은 특정한 순서로 실행되는 일련의 명령을 조직화하고 관리합니다. 예를 들어 빌드 파이프라인은 신뢰성과 효율성을 위해 ^로 표시된 dependsOn 기호와의 위상적인 종속성에 의존할 수 있습니다.



# 3. Tailwind CSS 설정하기

다양한 프로젝트에서 tailwind.config.js 파일이 단일 정보 원천으로 작용하도록 보장하기 위해, packages 폴더 내에 새 구성 패키지를 생성할 예정입니다. 이는 앱과 packages/ui 디렉토리 모두에서 Tailwind 클래스를 사용할 수 있게 해줍니다.

다음 단계를 따를 것입니다:

## A. packages 폴더에 Tailwind CSS 구성 설정하기



- 먼저 packages 디렉토리 내에 configs 폴더를 생성합니다. 이 폴더 안에 package.json, tailwind.config.js 및 postcss.config.js와 같은 설정에 필요한 여러 필수 파일을 생성할 것입니다.

![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_5.png)

package.json

```js
{
  "name": "@mrizkiaiman/configs",
  "version": "0.0.0",
  "private": true
}
```  



```js
tailwind.config.js

module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
};
```

postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```



## B. 앱 내에서 Tailwind CSS 구성 구현

- 루트 디렉토리에서 다음 명령을 실행하세요

```js
yarn workspace docs add -D tailwindcss autoprefixer
```

2. tailwind.config.js 및 postcss.config.js 파일을 생성하세요



좋아요! 여기서 테이블 태그를 마크다운 형식으로 변경했습니다:


| 파일명            | 설정 내용                                       |
|----------------------|-----------------------------------------------------|
| tailwind.config.js    | `module.exports = require("@mrizkiaiman/configs/tailwind/tailwind.config");` |
| postcss.config.js       | `module.exports = require("@mrizkiaiman/configs/tailwind/postcss.config");` |




3. 패키지/ui 폴더로 이동하여 다음 파일을 생성하세요: tailwind.config.js, postcss.config.js, 그리고 styles.css

tailwind.config.js

```js
module.exports = require("@mrizkiaiman/configs/tailwind/tailwind.config");
```

postcss.config.js



```js
module.exports = require("@mrizkiaiman/configs/tailwind/postcss.config");
```

styles.css

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. apps/docs 폴더로 돌아가서 pages 디렉토리로 이동하세요. 모노레포의 Tailwind CSS 초기화를 위해 이전에 생성한 전역 스타일을 가져오는 _app.tsx 파일을 만드세요.



_app.tsx

```js
import "ui/styles.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

설정이 완료되었습니다. 이제 테스트해 봅시다!

![이미지](/assets/img/2024-05-14-SetupaMonorepowithTurborepoNextjsandTailwindCSS_6.png)



테스트 중:

![image](https://miro.medium.com/v2/resize:fit:1400/1*z9BAP-pz5fi8N9eR8Gpc4Q.gif)

`monorepo` 내의 기타 앱, 예를 들어 `apps/web`와 같은 앱에 대해 동일한 단계를 따를 수 있습니다.

요약하면, Turborepo로 단일 저장소(monorepo)를 구축하면 업무 흐름을 혁신적으로 개선할 수 있습니다. 구성된 구조와 간소화된 프로세스를 통해 이 조합은 대규모 프로젝트와 다중 응용 프로그램을 쉽게 관리하고 시간을 절약하며 신뢰성을 향상시킬 수 있습니다. 직접 시도하고 작업 방식을 변화시킬 수 있는 방법을 확인해 보세요.



읽어 주셔서 감사합니다. 어떤 피드백이든 정말 감사히 받겠습니다.

GitHub 저장소: https://github.com/mrizkiaiman/turborepo-withtailwind