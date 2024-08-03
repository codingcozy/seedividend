---
title: "React JS에서 Webpack을 설치 및 세팅 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How to install Webpack and configure in React JS"
link: "https://medium.com/@ns-tech-learn/how-to-install-webpack-and-configure-in-react-js-88b4b0bd0af9"
---



웹팩은 React 프로젝트에서 일반적으로 사용되는 인기 있는 Javascript 모듈 번들러입니다. 이는 프로젝트 자산을 관리하고 번들하는 데 도움이 됩니다. 코드, 자산 및 종속성을 구성하고 최적화하는 데 도움을 줍니다.

다음은 React 프로젝트에서 웹팩을 설치하고 구성하는 방법을 단계별 가이드입니다:

### 단계 1: React 프로젝트 생성

아직 React 프로젝트를 생성하지 않았다면 `create-react-app`을 사용하여 빠르게 새 프로젝트를 설정할 수 있습니다. 터미널을 열고 다음 명령을 실행하세요:

<div class="content-ad"></div>

```js
npx create-react-app my-react-app
cd my-react-app
```

### 단계 2: 웹팩 및 관련 패키지 설치

npm (Node Package Manager)을 사용하여 웹팩과 관련 도구들을 설치해 보세요:

```js
npm install webpack webpack-cli webpack-dev-server --save-dev
```

<div class="content-ad"></div>

- `webpack`: 웹팩의 핵심 모듈입니다.

- `webpack-cli`: 웹팩의 명령줄 인터페이스입니다.

- `webpack-dev-server`: 실시간 새로고침을 제공하는 개발 서버입니다.

### 단계 3: 웹팩 구성 파일 만들기

<div class="content-ad"></div>

프로젝트 루트에 `webpack.config.js`라는 이름의 Webpack 구성 파일을 생성해주세요. 아래 내용을 추가해주세요:

```js
const path = require("path");
module.exports = {
  entry: "./src/index.js", // 애플리케이션의 진입점
  output: {
    filename: "bundle.js", // 출력 번들 파일명
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"), // 이 디렉토리에서 파일 제공
    port: 3000, // 개발 서버 포트
    open: true, // 서버 시작 시 기본 웹 브라우저 열기
  },
};
```

이 구성 파일은 애플리케이션의 진입점(`src` 디렉토리의 `index.js`)과 출력 번들 파일(`dist` 디렉토리의 `bundle.js`)을 지정합니다. 또한 JavaScript 및 JSX 파일을 변환하기 위해 Babel을 사용하는 규칙을 정의합니다.

### 단계 4: `package.json` 업데이트

<div class="content-ad"></div>

`package.json` 파일을 열어서 Webpack 개발 서버를 실행하는 `”start”` 스크립트를 추가해보세요. 다음과 같이 `”scripts”` 섹션을 업데이트해주세요:

```js
"scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production"
},
```

- `”start”` 스크립트는 개발 모드에서 Webpack 개발 서버를 실행합니다.

- `”build”` 스크립트는 애플리케이션을 프로덕션용으로 번들합니다.

<div class="content-ad"></div>

### 단계 5: `public` 디렉토리 생성하기

프로젝트의 루트에 `public` 디렉토리를 만듭니다. 이 디렉토리에는 번들된 JavaScript 파일을 로드하는 HTML 파일이 포함됩니다.

### 단계 6: `public/index.html` 파일 생성하기

다음 내용을 가진 `public` 디렉토리 안에 `index.html` 파일을 생성하세요:

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>React App</title>
</head>

<body>
    <div id="root"></div>
</body>

</html>
```

### 단계 7: 개발 서버 실행하기

이제 터미널에서 다음 명령어를 실행하여 개발 서버를 실행할 수 있습니다:

```js
npm start
```

<div class="content-ad"></div>

웹팩 개발 서버를 시작하면 React 앱이 `http://localhost:3000` 에서 사용 가능해집니다.

### 추가 사항:

- 이는 웹팩을 사용한 React 프로젝트의 기본 설정입니다. 프로젝트의 복잡성에 따라 추가적인 로더(loader) 및 플러그인(plugins)을 설치해야 할 수도 있습니다.

- 프로젝트 요구 사항에 따라 웹팩 구성이 더욱 복잡해질 수 있습니다. 제공된 구성은 시작점일 뿐이며, 사용자 지정할 수 있습니다.

<div class="content-ad"></div>

- 만약 Create React App을 사용하고 있다면, 자체 미리 구성된 Webpack 설정이 함께 제공되므로 일반적으로 Webpack을 수동으로 구성할 필요가 없습니다.
