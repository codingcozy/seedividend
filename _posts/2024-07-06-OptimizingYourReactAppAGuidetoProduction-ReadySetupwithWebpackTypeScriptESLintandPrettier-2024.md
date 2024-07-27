---
title: "2024년 Webpack, TypeScript, ESLint, Prettier를 사용한 생산 준비 완료 React 앱 최적화 가이드"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_0.png"
date: 2024-07-06 00:14
ogImage:
  url: /ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_0.png
tag: Tech
originalTitle: "Optimizing Your React App: A Guide to Production-Ready Setup with Webpack, TypeScript, ESLint, and Prettier - 2024"
link: "https://dev.to/shivampawar/optimizing-your-react-app-a-guide-to-production-ready-setup-with-webpack-typescript-eslint-and-prettier-2024-4lcl"
---

이 블로그 포스트에서는 배포 준비가 된 React 앱을 설정하는 데 필요한 모든 것을 다룰 것입니다.

GitHub 저장소: [https://github.com/shivam-pawar/sample-react-app](https://github.com/shivam-pawar/sample-react-app)

## 전제 조건

시작하기 전에 컴퓨터에 Node.js 및 npm (또는 yarn)이 설치되어 있는지 확인해주세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 새 프로젝트 초기화하기

명령줄(Command Line)을 사용하여 프로젝트의 루트 폴더로 이동한 후에 다음을 입력하세요.

```js
npm init
```

프로젝트 이름, 작성자 이름, 설명 및 라이선스와 같은 기본 정보를 묻습니다. 이 정보를 기반으로 package.json 파일이 생성됩니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## React와 TypeScript 설치하기

- React와 ReactDOM을 의존성으로 설치하세요:

```js
npm install react react-dom
```

- TypeScript 및 해당 타입을 개발 의존성으로 설치하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
npm install --save-dev typescript @types/react @types/react-dom
```

## 웹팩 설정하기

필요한 웹팩 종속성을 설치하세요:

```js
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin webpack-merge ts-loader terser-webpack-plugin uglify-js
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지의 package.json은 이와 같이 보일 것입니다:

<img src="/ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_0.png" />

```js
- root/project 레벨에 webpack 폴더를 생성하고 그 안에 다음 3개의 설정 파일을 추가하세요.
webpack.common.js
webpack.config.js
webpack.dev.js
webpack.prod.js
- webpack.common.js
- webpack.config.js
- webpack.dev.js
- webpack.prod.js
- root/project 레벨에 src 폴더를 생성하고 그 안에 다음 2개의 파일을 추가하세요.
index.tsx
index.html
- index.tsx
- index.html
- index.tsx 파일에 아래 코드를 복사하세요.
```

해당 정보들을 참고하시고 개발 작업을 진행해주세요. 문제가 있거나 추가 질문이 있으시면 언제든지 물어보세요!

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>Hello, React!</div>;
};

const rootElement = document.getElementById("root") as Element;
const root = createRoot(rootElement);

root.render(<App />);
```

- 아래 코드를 index.html에 복사하여 붙여넣으세요.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

이제 웹팩 구성 파일을 업데이트해 봅시다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- webpack.common.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
  ],
  devServer: {
    static: "./dist",
  },
};
```

- webpack.config.js

```js
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- webpack.dev.js

```js
const webpack = require("webpack");

module.exports = {
  mode: "개발",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("development"),
    }),
  ],
};
```

- webpack.prod.js

```js
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "운영",
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("production"),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        extractComments: true,
        parallel: true,
        test: /\.(ts|js)x?$/,
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- package.json 파일의 scripts 섹션을 업데이트/교체해주세요:

```js
"scripts": {
    "start": "webpack serve --config webpack/webpack.config.js --env env=dev",
    "build": "webpack --config webpack/webpack.config.js --env env=prod"
}
```

## TypeScript 설정

프로젝트 루트 수준에 tsconfig.json 파일을 추가하고 아래 구성을 붙여넣어주세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Node",
    "types": ["react", "react-dom", "@types/react", "@types/react-dom"],
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

프로젝트 폴더와 파일 구조는 다음과 같이 보일 것입니다:

![이미지](/ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_1.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 개발 서버 실행하기

터미널/명령 프롬프트에서 아래 명령어를 실행하여 개발 서버를 실행하세요:

```js
npm start
```

이제 React 앱이 http://localhost:8080에서 실행 중이어야 합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## ESLint 및 Prettier 설정하기

- ESLint, Prettier 및 필요한 플러그인 설치:

```js
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react
```

- 프로젝트 루트에 .eslintrc.json 파일을 만들고 다음 설정을 추가하세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

- 프로젝트 루트에 다음 구성으로 .prettierrc 파일을 만드세요:

```js
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}
```

- package.json 파일의 scripts 섹션을 업데이트하세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

"scripts": {
"start": "webpack serve --config webpack/webpack.config.js --env env=dev",
"build": "webpack --config webpack/webpack.config.js --env env=prod",
"lint": "eslint . --ext .ts,.tsx --fix"
}

- Run ESLint to check for any linting issues:

```bash
npm run lint
```

Your final `package.json` will look like this:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_2.png)

Your final folder structure will look like this:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/ui-log-2/assets/img/2024-07-06-OptimizingYourReactAppAGuidetoProduction-ReadySetupwithWebpackTypeScriptESLintandPrettier-2024_3.png" />

## 결론

이 가이드를 따라하면 이제 Webpack, TypeScript, ESLint 및 Prettier를 사용하여 제작 준비가 된 React 애플리케이션 설정이 완료되었습니다. 이 설정은 최상의 관행이 준비되어 확장 가능하고 유지 관리 가능한 React 애플리케이션을 구축하는데 튼튼한 기반을 제공합니다.
의존성을 최신 상태로 유지하고 이러한 도구에 대해 계속 배우며 개발 워크플로우를 최적화하세요.
즐거운 코딩하세요!❤️

Dev.To에서 더 많은 기사 읽기 ➡️ Shivam Pawar

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
