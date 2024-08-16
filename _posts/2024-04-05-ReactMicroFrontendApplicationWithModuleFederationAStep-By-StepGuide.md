---
title: "리액트 마이크로 프론트엔드 애플리케이션 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "React Micro Frontend Application With Module Federation A Step-By-Step Guide"
link: "https://medium.com/@r.sipchenko/react-micro-frontend-application-with-module-federation-a-step-by-step-guide-6b432343d20"
isUpdated: true
---





<img src="/assets/img/ReactMicroFrontendApplicationWithModuleFederationAStep-By-StepGuide_0.png" />

## 소개:

Module Federation은 Webpack 5에서 소개된 강력한 기능으로, 개발자들이 런타임에서 별도의 코드 번들을 로드할 수 있게 해주어, 마이크로 프론트엔드 아키텍처를 구현하기에 이상적인 선택지입니다. 이 글에서는 Module Federation을 사용하여 React 마이크로 프론트엔드 애플리케이션을 만드는 과정을 안내하고, 명확한 코드 예제에 초점을 맞춥니다. 또한 Module Federation을 사용하는 마이크로 프론트엔드 애플리케이션에 대한 장단점을 논의할 것입니다.

단계 1: Webpack 5로 새 React 프로젝트 설정하기

<div class="content-ad"></div>

- 프로젝트를 위한 새 디렉토리를 만들고 해당 디렉토리로 이동해주세요:

```js
mkdir react-module-federation
cd react-module-federation
```

2. 새로운 npm 프로젝트를 초기화해주세요:

```js
npm init -y
```

<div class="content-ad"></div>

3. 필요한 종속 항목을 설치해주세요:

```js
npm install react react-dom webpack@5 webpack-cli webpack-dev-server html-webpack-plugin
```

4. 'src' 디렉토리와 'index.html' 파일을 생성해주세요:

```js
mkdir src
touch src/index.html
```

<div class="content-ad"></div>

5. 'src/index.html'에 다음 내용을 추가해주세요:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Module Federation</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

단계 2: 모듈 페더레이션을 위해 웹팩 구성하기

- 프로젝트 루트에 'webpack.config.js' 파일을 생성해주세요.

<div class="content-ad"></div>

```js
touch webpack.config.js
```

2. `webpack.config.js` 파일에 다음 내용을 추가해주세요:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "mainApp",
      remotes: {
        microApp: "microApp@http://localhost:3001/remoteEntry.js",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
```

3. 마이크로 프론트엔드 어플리케이션을 생성해주세요.

<div class="content-ad"></div>

1. 프로젝트 루트로 이동하여 새로운 마이크로 프론트엔드 애플리케이션을 생성하세요:

```js
npx create-react-app micro-app --template cra-template-pwa
```

2. 'micro-app/package.json' 파일을 열어 다음 스크립트를 추가하세요:

```js
"scripts": {
  "start": "webpack serve",
  "build": "webpack --mode production"
}
```

<div class="content-ad"></div>

3. 다음 플러그인을 포함하도록 'micro-app/webpack.config.js' 파일을 업데이트하세요:

```js
// ...
plugins: [
  // ...
  new ModuleFederationPlugin({
    name: 'microApp',
    filename: 'remoteEntry.js',
    exposes: {
      './MicroApp': './src/App',
    },
    shared: ['react', 'react-dom'],
  }),
  // ...
],
// ...
```

4. 'micro-app/src/index.js' 파일을 업데이트하세요:

```js
import React from "react";
import ReactDOM from "react-dom";
import MicroApp from "./App";

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(<MicroApp />, document.getElementById("root"));
}

export default MicroApp;
```

<div class="content-ad"></div>

단계 4: 마이크로 프론트엔드를 주 애플리케이션에 통합하기

1. 'src' 디렉토리에 'index.js' 파일을 생성하십시오:

```js
touch src/index.js
```

2. 'src/index.js' 파일에 다음 내용을 추가하십시오:

<div class="content-ad"></div>

```js
import React from "react";
import ReactDOM from "react-dom";
import MicroApp from "microApp/MicroApp";

ReactDOM.render(
  <React.StrictMode>
    <MicroApp />
  </React.StrictMode>,
  document.getElementById("app")
);
```

3. 마이크로 프론트엔드 개발 서버를 시작하세요:

```js
cd micro-app
npm start
```

4. 메인 애플리케이션 개발 서버를 시작하세요:

<div class="content-ad"></div>

```js
cd ..
npm start
```

장점:

- 웹팩 5에 기본으로 내장되어 추가 라이브러리가 필요하지 않음
- 애플리케이션 간 의존성 공유 가능
- 번들 크기를 줄여 성능 향상

단점:

<div class="content-ad"></div>

- 웹팩 5 필요
- single-spa보다 성장 단계가 낮음

결론:

본 단계별 안내서는 웹팩 5를 사용하여 React 마이크로 프론트엔드 애플리케이션을 만드는 방법을 안내합니다. Module Federation은 마이크로 프론트엔드 아키텍처를 구현하는 강력한 방법을 제공하여 코드 공유와 번들 크기를 줄이는 기능을 제공합니다. 그러나 이 방법은 웹팩 5를 필요로 하며 single-spa와 같은 대안들에 비해 성숙도가 낮습니다. Module Federation의 장단점을 평가함으로써, 귀하의 마이크로 프론트엔드 애플리케이션에 적합한 방법인지 결정할 수 있습니다.

👏 치켜들어 주시는 것을 잊지 마세요

<div class="content-ad"></div>

행복한 코딩 🚀

## 더 배우기:
