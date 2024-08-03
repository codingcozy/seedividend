---
title: "Nextjs 13 Turbo팩 사용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: ""
link: ""
---



# 터보 (실험 중)

터보팩은 다양한 파일을 변환하고 모듈 해결 방법을 변경하기 위해 사용자 정의할 수 있습니다.

> 참고 사항:
> 이러한 기능은 실험 중이며 다음 --turbo로만 작동합니다.
> Next.js용 터보팩에는 내장된 기능을 위한 로더나 로더 구성이 필요하지 않습니다. 터보팩은 CSS 및 현대적인 JavaScript를 컴파일하는 기능을 내장하고 있으므로 @babel/preset-env를 사용하는 경우 css-loader, postcss-loader 또는 babel-loader가 필요하지 않습니다.

## 웹팩 로더

<div class="content-ad"></div>

만약 내장되어 있는 것 이상의 로더 지원이 필요하다면, 많은 웹팩 로더들이 이미 Turbopack과 호환된다. 현재 몇 가지 제한사항이 있습니다:

- 웹팩 로더 API의 핵심 하위 집합만 구현되어 있습니다. 현재는 일부 인기 있는 로더를 다룰 수 있을 만큼 충분한 지원이 있으며, 앞으로 API 지원을 확대할 것입니다.
- JavaScript 코드를 반환하는 로더만 지원됩니다. 스타일시트나 이미지와 같은 파일을 변환하는 로더는 현재 지원되지 않습니다.
- webpack 로더에 전달되는 옵션은 일반 JavaScript 기본형, 객체, 배열이어야 합니다. 예를 들어 require()된 플러그인 모듈을 옵션 값으로 전달하는 것은 불가능합니다.

로더를 구성하려면, 설치한 로더의 이름과 next.config.js에 로더의 파일 확장자를 로더 목록에 매핑하여 옵션을 추가하십시오:

```js
module.exports = {
  experimental: {
    turbo: {
      rules: {
        // 옵션 형식
        "*.md": [
          {
            loader: "@mdx-js/loader",
            options: {
              format: "md",
            },
          },
        ],
        // 옵션이 없는 형식
        "*.mdx": ["@mdx-js/loader"],
      },
    },
  },
};
```

<div class="content-ad"></div>

위의 구성을 사용하면 앱에서 변환된 코드를 사용할 수 있습니다:

```js
import MyDoc from "./my-doc.mdx";

export default function Home() {
  return <MyDoc />;
}
```

> 알아두면 좋은 사항: Next.js 버전 13.4.4 이전에는 experimental.turbo.rules가 experimental.turbo.loaders로 이름이 지어졌으며 \*.mdx 대신 .mdx와 같은 파일 확장자만 허용했습니다.

### 지원되는 로더

<div class="content-ad"></div>

다음 렌더러들은 Turbopack의 웹팩 로더 구현과 함께 작동하는 것으로 확인되었습니다:

- babel-loader
- @mdx-js/loader
- @svgr/webpack
- svg-inline-loader
- yaml-loader
- string-replace-loader
- raw-loader

### 커스텀 로더

외부 패키지를 가져와서 로더 옵션으로 전달해야 하는 경우, 웹팩 로더를 자체적으로 래핑하여 해당 옵션을 지정할 수 있습니다. 이는 임시적인 해결책이며 향후에는 필요하지 않을 것입니다.

<div class="content-ad"></div>

이 로더는 @mdx-js/loader를 감싸고 rehypePrism rehype 플러그인을 구성합니다:

```js
const mdxLoader = require("@mdx-js/loader");
const rehypePrism = require("@mapbox/rehype-prism");

module.exports = function (code) {
  const prevGetOptions = this.getOptions.bind(this);
  this.getOptions = function getOptions(...args) {
    return {
      ...prevGetOptions(...args),
      rehypePlugins: [rehypePrism],
    };
  };

  mdxLoader.call(this, code);
};
```

그런 다음, Next.js를 구성하여 래퍼 로더를 로드하도록 설정하세요:

```js
module.exports = {
  experimental: {
    turbo: {
      rules: {
        "*.mdx": ["./my-mdx-loader"],
      },
    },
  },
};
```

<div class="content-ad"></div>

## 별칭 해결

Turbopack을 통해 모듈 해결을 수정할 수 있는 next.config.js를 통해 `resolve.alias` 구성과 유사한 방식으로 별칭을 정의할 수 있습니다.

별칭을 설정하려면, imported patterns을 next.config.js에서 새 목적지로 매핑하십시오:

```js
module.exports = {
  experimental: {
    turbo: {
      resolveAlias: {
        underscore: "lodash",
        mocha: { browser: "mocha/browser-entry.js" },
      },
    },
  },
};
```

<div class="content-ad"></div>

이 명령어는 Underscore 패키지를 Lodash 패키지로 가져오는 별칭(alias)를 설정합니다. 다시 말하면, `underscore`에서 Underscore를 가져오는 대신 Lodash 모듈을 불러올 겁니다.

Turbopack은 또한 Node.js의 조건부 익스포트와 유사한 방식으로 이 필드를 통해 조건부 별칭을 지원합니다. 현재는 브라우저 조건만 지원됩니다. 위의 예에서 Turbopack이 브라우저 환경을 대상으로 할 때 mocha 모듈의 가져옴을 mocha/browser-entry.js로 별칭 지정할 겁니다.

## 확장자 해석

next.config.js를 통해 Turbopack을 확장자 해석을 커스터마이징하여 모듈을 해석할 수 있습니다. 이는 webpack의 resolve.extensions 구성과 유사합니다.

<div class="content-ad"></div>

다음과 같이 next.config.js 파일의 resolveExtensions 필드를 사용하여 resolve 확장자(extension)를 구성할 수 있습니다:

```js
module.exports = {
  experimental: {
    turbo: {
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
};
```

이것은 제공된 목록으로 기존의 resolve 확장자(extension)를 덮어씁니다. 기본 확장자들도 포함되어 있는지 확인해주세요.

Webpack에서 앱을 Turbopack으로 이관하는 방법에 대한 자세한 정보 및 지침은 webpack 호환성에 대한 Turbopack 문서를 참조하세요.

<div class="content-ad"></div>
