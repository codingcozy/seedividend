---
title: "리액트 설정 WebPack, 린트 그리고 핫리로드 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ReactSetupusingWebPackalongwithlintandhotreload_0.png"
date: 2024-06-22 03:01
ogImage: 
  url: /assets/img/2024-06-22-ReactSetupusingWebPackalongwithlintandhotreload_0.png
tag: Tech
originalTitle: "React Setup using WebPack along with lint and hotreload"
link: "https://medium.com/@opensrc0/react-setup-using-webpack-along-with-lint-and-hotreload-76b16e39c2cc"
---


## React의 기본 설정, 핫 리로딩, 린트, 웹팩

![React 설정](/assets/img/2024-06-22-ReactSetupusingWebPackalongwithlintandhotreload_0.png)

## 1. 폴더 생성

```js
mkdir 폴더명
cd 폴더명
```

<div class="content-ad"></div>

## 2. git 설치하기

```js
git init // 명령을 완료하려면 Enter 키를 여러 번 누르세요
```

## 3. .gitignore 파일 생성

.gitignore 파일을 생성하고 아래 코드를 추가하세요

<div class="content-ad"></div>

```js
// .gitignore 파일에 아래 라인 추가

node_modules
.DS_Store
```

## 4. 루트 폴더에 Package.json 생성

```js
npm init // 명령어를 실행하고 엔터 키를 여러 번 눌러주세요
```

## 5. 루트 폴더에 린트 추가하기

<div class="content-ad"></div>

프로젝트에 lint 패키지를 소개하고 있어요. Airbnb는 우리가 사용할 표준 lint 패키지입니다. 먼저 아래 명령어로 패키지를 설치해주세요.

```js
// lint npm 패키지 및 의존성 설치
npx install-peerdeps --dev eslint-config-airbnb
```

.eslintrc 파일을 만들고 아래 코드를 추가해주세요.

```js
{
  "extends": "airbnb",
  "parser": "@babel/eslint-parser",
  "plugins": [
    "react-hooks"
  ],
  "globals": {
    "globalThis": true,
    "google": true,
    "document": true
  },
  "rules": {
    "import/no-extraneous-dependencies": ["off"], // webpack-dashboard와 같은 외부 종속성 사용 필요
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }] // jsx 사용 필요
  },
  "parserOptions": {
    "ecmaVersion":"latest" // 최신 ECMA 스크립트 지원을 위해
}
```

<div class="content-ad"></div>

Markdown 형식으로 표 태그를 변경하십시오. 

또한 VScode에 ESLint 플러그인을 설치하십시오. vscode에서 eslint 확장 프로그램 이미지를 아래 이미지에서 확인하십시오.

![eslint extension in vscode](/assets/img/2024-06-22-ReactSetupusingWebPackalongwithlintandhotreload_1.png)

## 6. 루트 폴더에 .editorconfig 파일 생성

그 다음 단계로, 코드 형식을 유지하기 위해 .editorconfig 파일을 생성합니다.

<div class="content-ad"></div>


루트 = 참

[*]
들여쓰기_스타일 = 공간
들여쓰기_크기 = 2
줄의_끝 = lf
문자셋 = utf-8
뒤의_공백_제거 = 참
마지막_새줄_삽입 = 참


## 7. 루트 폴더 내 .vscode 폴더에 setting.json 만들기

우리는 .vscode라는 폴더를 생성하고 .vscode 폴더 내에 setting.json 파일을 만듭니다. 아래 라인을 추가하여 린트 자동 수정 및 탭 들여쓰기가 2인 설정을 합니다. setting.json에 아래 코드를 추가하세요.


{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll": "always", 
    "editor.tabSize": 2 
  },
  "eslint.workingDirectories": [
      {"mode": "auto"}
    ],
  },
  "search.exclude": {
      "**/index.js": true,
      "**/__build-es/**": true
   }
}


<div class="content-ad"></div>

## 8. 앱 폴더 생성

앱 폴더를 만들어보겠습니다. 모든 개발 관련 파일은 앱 폴더 아래에 위치합니다.

우리는 client.js라는 새 파일을 추가하고 있습니다. 일단 client.js 내에 콘솔을 추가하고 있습니다. 나중에는 애플리케이션을 부트스트랩하기 위해 리액트 코드를 추가할 것입니다.

```js
console.log('Client file loaded');
```

<div class="content-ad"></div>

## 9. webpack.config.js 추가하기

웹팩과 웹팩-cli를 설치하여 webpack.config.js를 구성하세요.

```js
npm install webpack webpack-cli webpack-dev-server --save-dev
```

다음 단계에서는 싱글 페이지 애플리케이션을 위해 webpack.config.js를 생성하고 구성해 봅시다.

<div class="content-ad"></div>

```js
const path = require('path');

 module.exports = {
   entry: {
     client: './app/client.js',
   },
   mode: 'development',
   output: {
     filename: 'client.js',
     path: path.resolve(__dirname, 'build'),
     publicPath: '',
   },
 };
```

package.json 파일 내 script 오브젝트에 명령어 추가

```js
"build": "webpack --config webpack.config.js"
```

터미널에서 명령어 실행

```js
npm run build
```

<div class="content-ad"></div>

와우, 빌드 폴더 내의 js 파일을 Transpile하는 설정을 완료했어요. 빌드 폴더가 생성되었고 client.js Transpile 파일이 포함되어 있어요.

## 10. JSX 지원 제공

npm i @babel/preset-react --save-dev를 설치해주세요.

그리고 루트 폴더에 .babelrc 파일을 추가하고 아래 코드를 추가해주세요. 이렇게 하면 JSX 지원이 제공됩니다.

<div class="content-ad"></div>

```js
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

## 11. babel-loader를 사용하여 React 코드를 Javascript로 변환하기

```js
npm i babel-loader --save-dev
```

mode: "development" 이후에 webpack.babel.js 안에 babel-loader를 추가하세요.

<div class="content-ad"></div>

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
    },
  ],
},
```

## 12. 프로젝트에서 React 및 JSX 사용하기

React 및 react-dom 설치

```js
npm i react react-dom --save
```

<div class="content-ad"></div>

아래 코드를 client.js 파일 안에 추가해주세요.

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const APP = (
  <div>앱이 실행 중입니다</div>
);

createRoot(document.getElementById('root')).render(APP);
```

## 13. 루트 폴더에 index.html을 추가해봅시다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>App 1</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="build/client.js"></script>
  </body>
</html>
```

<div class="content-ad"></div>

index.html 파일을 실행해 주세요.

와우, 설치가 완료되었습니다.

## 14. 핫 리로딩 추가하기

client.js 파일 변경이 페이지에 반영되지 않는군요. webpack-dev-server를 이용해 핫 리로딩을 추가해 봅시다.

<div class="content-ad"></div>

```js
npm install webpack-dev-server
```

이제 package.json의 start 스크립트를 변경해야 합니다.

```js
// 이전 설정
"start": "webpack  --config webpack.config.js"

// 이제 핫리로딩이 가능한 설정
"start": "webpack-dev-server  --config webpack.config.js"
```

webpack.config.json 파일에 webpack-dev-server를 추가해주세요.

<div class="content-ad"></div>

```js
devServer: {
  devMiddleware: { writeToDisk: true },
  static: {
    directory: path.join(__dirname, '/'),
  },
  compress: true,
  port: 9000,
},
```

그거 정말 멋지죠. 이제 http://localhost:9000/에서 애플리케이션을 실행할 수 있어요.

## 결론:

이 설정에서 우리는 지원을 제공했습니다.

<div class="content-ad"></div>

- git (버전 관리)
- Airbnb의 ESlint
- 코드 형식 유지
- Linting 자동 수정
- JSX 지원
- React 지원
- 핫 리로딩