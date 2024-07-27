---
title: "일렉트론, 리액트 보일러플레이트"
description: ""
coverImage: "/assets/img/2024-05-12-ElectronReactTheBoilerplate_0.png"
date: 2024-05-12 18:53
ogImage: 
  url: /assets/img/2024-05-12-ElectronReactTheBoilerplate_0.png
tag: Tech
originalTitle: "Electron , React: The Boilerplate"
link: "https://medium.com/@rdarida/electron-react-the-boilerplate-fc3a7d9b9ec1"
---


이 글에서는 Electron 및 React를 사용하여 크로스 플랫폼 데스크톱 애플리케이션을 개발할 수 있는 보일러플레이트를 만드는 방법을 안내하겠습니다.

# 소개

## Electron이란 무엇인가요?

Electron은 JavaScript, HTML5, CSS와 같은 웹 기술로 크로스 플랫폼(Mac, Windows, Linux) 애플리케이션을 만들기 위한 프레임워크입니다. Electron은 렌더링을 위해 Chromium을 사용하고 파일 시스템에 액세스하기 위해 Node.js를 사용합니다. 간단히 말해, Electron은 크롬 창에서 웹사이트를 실행하여 네이티브 애플리케이션처럼 보이게 합니다. 그래서...



일부 인기 있는 앱인 Discord, Figma, Notion, Obsidian, Microsoft Teams, Sourcetree은 Electron으로 제작되었습니다. (모든 앱은 여기에서 확인할 수 있어요: [https://electronjs.org/apps](https://electronjs.org/apps))

## Electron Forge란 무엇인가요?

Electron Forge는 Electron 애플리케이션을 패키징하고 배포하는 올인원 도구입니다. 각각의 단일 목적 패키지를 결합하여 작동하는 전체 빌드 파이프라인을 만듭니다.

## TypeScript가 무엇인가요?



TypeScript은 Microsoft에서 개발한 무료 오픈 소스 고수준 프로그래밍 언어로, JavaScript에 정적 타이핑을 추가하여 선택적으로 타입 주석을 제공합니다.

### Sass가 무엇인가요?

Sass는 세계에서 가장 성숙하고 안정적이며 강력한 전문가용 CSS 확장 언어입니다.

### React가 무엇인가요?



리액트는 컴포넌트를 기반으로 하는 사용자 인터페이스를 구축하기 위한 무료 오픈 소스 프론트엔드 JavaScript 라이브러리입니다. Meta (이전 Facebook)에서 유지보수되고 있습니다.

페이스북, 인스타그램, 넷플릭스, 페이팔 등과 같은 사이트들이 리액트로 개발되었습니다.

## 부트스트랩이란 무엇인가요?

부트스트랩은 반응형이고 모바일을 우선으로 하는 프론트엔드 웹 개발을 위한 무료 오픈 소스 CSS 프레임워크입니다.



## Font Awesome 4.7이란 무엇인가요?

Font Awesome은 수백만 명의 디자이너, 개발자 및 컨텐츠 제작자들이 사용하는 인터넷 아이콘 라이브러리 및 툴킷입니다.

# 시작하기

## 1. NodeJS 설치



NodeJS를 설치하세요, 아직 설치하지 않았다면요. 여기서 시스템에 맞는 최신 LTS를 다운로드할 수 있어요.

여기서 모든 단계는 운영 체제에 관계없이 적용할 수 있어요. Windows의 cmd, Mac 및 Linux에서 터미널을 사용하세요.

### 2. Electron Forge를 사용하여 초기 프로젝트 생성

새로운 cmd/터미널 창을 열고 다음 명령을 실행하세요:



```js
npm init electron-app@latest boilerplate -- --template=webpack-typescript
```

시간이 걸리지만 모든 것이 잘 되었다면 프로젝트 폴더(boilerplate) 내에서 이 파일 구조를 볼 수 있을 것입니다:

![ElectronReactTheBoilerplate_0](/assets/img/2024-05-12-ElectronReactTheBoilerplate_0.png)

이제 다음 명령어로 앱을 시작해 볼 수 있습니다:



```js
npm start
```

![이미지](/assets/img/2024-05-12-ElectronReactTheBoilerplate_1.png)

## 3. 의존성 설치

```js
npm i @popperjs/core bootstrap font-awesome react@17 react-dom@17
```



```js
npm i -D sass sass-loader autoprefixer postcss postcss-loader resolve-url-loader @types/bootstrap @types/react@17 @types/react-dom@17
```

## 4. 설정 파일 업데이트하기

tsconfig.json을 업데이트하세요.

```js
{
  "compilerOptions": {
    "target": "ES6",
    "allowJs": true,
    "module": "commonjs",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "noImplicitAny": true,
    "sourceMap": true,
    "baseUrl": ".",
    "outDir": "dist",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "paths": {
      "*": ["node_modules/*"],
      "@/*": ["src/*"]
    },
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
```



웹팩 메인 설정 파일인 wepback.main.config.ts를 업데이트 해주세요.

```typescript
import type { Configuration } from 'webpack';
import { resolve } from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  /**
   * 이 파일은 애플리케이션의 주요 진입점입니다. 메인 프로세스에서 처음으로 실행되는 파일입니다.
   */
  entry: './src/index.ts',
  // 이 아래에 일반 웹팩 설정을 넣어주세요
  module: { rules },
  plugins,
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json']
  }
};
```

웹팩 렌더러 설정 파일인 webpack.renderer.config.ts를 업데이트 해주세요.

```typescript
import type { Configuration } from 'webpack';
import { resolve } from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.(css|scss)$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    { loader: 'resolve-url-loader' },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: () => [require('autoprefixer')]
        }
      }
    },
    { loader: 'sass-loader' }
  ]
});

export const rendererConfig: Configuration = {
  module: { rules },
  plugins,
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
  }
};
```



## 5. 소스 파일 업데이트

src/scss.d.ts 파일을 생성하세요

```js
declare module '*.scss';
```

src/index.css 파일의 이름을 src/index.scss로 변경하세요.



src/index.scss을 업데이트하세요.

```scss
@import 'bootstrap';
@import 'font-awesome';
```

src/index.html을 업데이트하세요.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title></title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```



```ts
import { 엄격한모드 } from 'react';
import { 렌더 } from 'react-dom';

import '@/index.scss';

렌더(
    <엄격한모드>
        <div className="p-3">
            <h1><i className="fa fa-heart text-danger" /> 안녕하세요, 세계여!</h1>
            <p>Electron 애플리케이션에 오신 것을 환영합니다.</p>
        </div>
    </엄격한모드>,
    document.getElementById('root')
);
```

src/renderer.ts를 업데이트하세요.

```ts
import '@popperjs/core';
import 'bootstrap';

import './App';
```



src/index.ts 파일을 업데이트 해주세요.

```js
import { BrowserWindow, Menu, app } from 'electron';

// 이 부분은 TypeScript가 Forge의 Webpack 플러그인에 의해 자동으로 생성된 매직 상수를 인식할 수 있도록 합니다. 
// 이 상수들은 Electron 앱이 개발 모드든 프로덕션 모드든 Webpack으로 번들된 앱 코드를 어디에서 찾아야 하는지 알려줍니다.
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Windows에서 단축키를 추가/제거하는 처리
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // 브라우저 창을 생성합니다.
  const mainWindow = new BrowserWindow({
    title: `Boilerplate ${app.getVersion()}`,
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  Menu.setApplicationMenu(null);

  // 그리고 어플리케이션의 index.html을 로드합니다.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// 이 메서드는 Electron이 초기화를 마치고 브라우저 창을 생성할 준비가 된 시점에 호출됩니다.
// 일부 API는 이 이벤트 이후에만 사용할 수 있습니다.
app.on('ready', createWindow);

// 모든 창이 닫힐 때 앱을 종료합니다. macOS에서는 달리 동작합니다. 거기서는 사용자가 Cmd + Q로 
// 명시적으로 종료할 때까지 앱 및 메뉴바가 활성 상태로 유지되는 것이 일반적입니다.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS에서는 dock 아이콘을 클릭하고 다른 창이 열려있지 않을 때 어플리케이션의 창을 다시 만드는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 이 파일에서 어플리케이션의 특정한 메인 프로세스 코드를 포함할 수 있습니다.
// 별도의 파일에 작성하고 여기에서 가져와 사용할 수도 있습니다.
```

다시 실행해보세요: npm start

![이미지](/assets/img/2024-05-12-ElectronReactTheBoilerplate_2.png)



# 릴리스

npm run make 명령을 사용하면 Forge 구성 (forge.config.ts)을 기반으로 응용 프로그램에 대한 배포 가능한 항목을 만들 수 있습니다.

Windows에서 작업 중인 경우 출력은 다음과 같아야 합니다:

이 글이 유용하셨다면 손가락 몇 개를 눌러 주시고 다른 작품들도 확인해보세요.



읽어 주셔서 감사합니다!