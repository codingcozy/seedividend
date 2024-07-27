---
title: "리액트 앱 만들기 Create React App 없이"
description: ""
coverImage: "/assets/img/2024-05-12-CreateReactAppwithoutCreateReactApp_0.png"
date: 2024-05-12 19:42
ogImage: 
  url: /assets/img/2024-05-12-CreateReactAppwithoutCreateReactApp_0.png
tag: Tech
originalTitle: "Create React App without Create React App"
link: "https://medium.com/bitsrc/create-react-app-without-create-react-app-b0a5806a92"
---



![이미지](/assets/img/2024-05-12-CreateReactAppwithoutCreateReactApp_0.png)

이 기사는 "create-react-app", "NextJS" 등의 라이브러리 또는 프레임워크를 사용하지 않고 리액트 앱을 만드는 과정에 대해 이야기합니다.

## 사전 지식 개념

- Webpack — 코드를 하나의 파일로 번들링하는 데 도움을 줍니다.
- Babel — ECMAScript 2015+ (ES6+) 코드를 이전 JavaScript 엔진에서 실행할 수 있는 하위 호환 버전으로 변환하는 데 사용됩니다.
- Node.js — 노드 설치, package.json 생성 및 npm을 사용하여 노드 모듈 설치




## 이 기사는 다음 사항을 이해하는 데 도움이 됩니다

- 웹팩(webpack)과 바벨(babel)이 어떻게 실제로 작동하는지;
- 리액트(React) 앱을 빌드하는 시작부터 끝까지의 흐름;
- 개발 및 프로덕션 빌드 설정 방법 및 중요성;
- 필요한 서버 세부 정보 설정;
- 웹팩(webpack)과 바벨(babel) 구성 파일 작성 및 그곳에 존재하는 논리 이해;
- 클라이언트 측 및 서버 측 렌더링 구성 방법;
- React에서 HMR(Hot Module Replacement)이 작동하는 방식 이해.

## 소스 코드

- 리포지토리 — https://github.com/kannanagasamy/react-app-without-cra
- 브랜치 — main



더 알아보기:

## 절차

1. 시스템에 node가 설치되어 있는지 확인합니다

시스템에 Node.js를 설치하고 터미널에서 node -v를 입력하여 설치되어 있는지 확인합니다.



## 2. 프로젝트 폴더 및 package.json 생성하기

아무 이름으로 프로젝트 폴더를 생성하고 해당 폴더로 이동한 후 npm init을 사용하여 폴더 안에 package.json 파일을 생성합니다. 폴더로 이동하세요.

## 3. 웹팩 종속성 설치하기

```js
npm i --save-dev webpack webpack-cli webpack-dev-server
```



- 웹팩 — 코드를 모두 번들로 묶어 최종 빌드를 생성할 수 있습니다.
- 웹팩-cli — 개발자가 커스텀 웹팩 프로젝트를 설정할 때 속도를 높이기 위해 유연한 명령 집합을 제공하는 CLI 도구입니다. 웹팩 v4 이상을 사용하고 명령 줄에서 웹팩을 호출하려면 이 도구가 필요합니다.
- 웹팩-dev-server — 웹팩 개발 서버는 미니 노드.js 익스프레스 서버입니다. SockJS라는 라이브러리를 사용하여 웹 소켓을 흉내냅니다. 로컬호스트 개발 환경을 만들 수 있게 해줍니다.

## 4. Babel 종속성 설치

```js
npm i --save-dev babel-loader @babel/preset-env @babel/core 
@babel/plugin-transform-runtime 
@babel/preset-react 
@babel/eslint-parser 
@babel/runtime
@babel/cli
```

- babel-loader — JavaScript 파일을 babel과 웹팩을 사용하여 변환할 수 있게 해줍니다. 각 파일에 대한 Babel 구성의 사용자 정의 처리를 추가할 수 있는 로더 빌더 유틸리티를 노출합니다.
- @babel/preset-env — 해당 환경에 필요한 syntax 변환 및 브라우저 폴리필을 세밀하게 관리하지 않고 최신 JavaScript를 사용할 수 있도록 합니다. 이렇게 함으로써 JavaScript 번들이 더 작아지고 개발자의 작업을 더욱 쉽게 할 수 있습니다!
- @babel/core — 코어 패키지
- @babel/plugin-transform-runtime — Babel의 주입된 도우미 코드를 재사용하여 코드 크기를 줄이도록 하는 플러그인
- @babel/preset-react — Reactjs를 사용할 때 React 프리셋을 사용합니다. HTML 파일을 React 기반 파일로 변환하는 데 도움이 됩니다.
- babel-eslint — Babel에 의해 변환된 소스 코드에서 ESLint를 실행할 수 있게 하는 파서
- @babel/runtime — 폴리필 및 다른 Babel이 참조할 수 있는 것들을 포함하는 패키지
- @babel/cli — Babel을 사용하기 위한 명령 줄 인터페이스



## 5. 필요한 린터 및 경로 설치하기

```js
npm i --save-dev eslint eslint-config-airbnb-base 
eslint-plugin-jest 
eslint-config-prettier
path
```

## 6. 리액트와 리액트 돔 설치하기

```js
npm i react react-dom
```



## 7. index.html 파일 생성하기

프로젝트의 루트에 "public"이라는 폴더를 생성하세요. 그 안에 index.html 파일을 만들어주세요.

## 8. App.js 파일 생성하기

src 폴더를 생성하고 그 안에 App.js 파일을 만드세요. 다음 코드를 추가해주세요:



## 8. index.js 파일 만들기

프로젝트의 루트 또는 원하는 곳에 index.js 파일을 만듭니다. 이 파일은 webpack의 진입점으로 작동할 것입니다.

다음 코드를 추가합니다:

## 9. webpack.config.js 파일 만들기



프로젝트 루트에 webpack.config.js 파일을 생성하고 다음 코드를 추가하세요. 더 나아가 이 파일은 파일들을 하나의 닠 파일로 번들링하고 개발 서버를 설정하는 구성을 포함하고 있습니다.

코드 내의 주석은 각 줄이 무엇을 하는지 이해하는 데 도움이 됩니다:

## 10. .babelrc 파일 생성

루트에 .babelrc 파일을 생성하고 다음 코드를 추가하세요.



이것은 Babel을 위한 설정 파일입니다. babel이 내부에 정의된 플러그인과 프리셋을 사용하도록 지시할 것입니다.

## 11. package.json 파일 업데이트

7번째와 8번째 줄에 start 및 build 스크립트를 추가하십시오.

- start 스크립트는 웹팩 개발 서버를 현재 프로젝트의 public 폴더에서 9500 포트로 실행하라는 것입니다.
- build 명령은 main.js 파일에 이 패키지를 빌드하라는 것입니다. 이는 사실상 webpack.config.js 파일의 모든 논리를 실행합니다.



## 12. 최종 프로젝트 폴더 구조가 이렇게 되어야 합니다

![프로젝트 폴더 구조](/assets/img/2024-05-12-CreateReactAppwithoutCreateReactApp_1.png)

## 13. "npm run build" 실행하기

- 위의 코드를 추가한 후 npm run build를 실행하세요. 이렇게 하면 public 폴더에 main.js 파일이 생성됩니다. 이 파일은 실제로 1MB 이상의 크기를 가지고 있습니다. 이것이 개발용 빌드입니다.



## 14. "npm start" 명령 실행하기

터미널에서 `npm start` 명령을 실행하여 애플리케이션을 시작하세요. 이렇게 하면 개발 서버가 시작됩니다.

코드 전체는 위에서 공유한 저장소 링크에서 찾을 수 있습니다.

# 기타 주요 사항



## 프로덕션 빌드로 변경하기

- 이제 프로덕션 빌드로 변경해 볼 수 있어요. 이를 위해 webpack.config.js 파일에 다음 변경을 해야 합니다.

```js
mode: "production"
```

- 이제 npm run build를 실행하면 다시 main.js 파일이 생성되지만 사이즈가 매우 작아질거에요 (`200kb).
- 1000KB에서 200KB로 최적화되어 더 나은 프로덕션 빌드를 사용하는 것이 좋을 수 있어요. 하지만 개발 중에는 핫 리로딩이 더 빠르기 때문에 개발 모드를 사용해야 해요.



## 핫 모듈 교체

- HMR은 webpack-dev-server에서 처리됩니다. 페이지 로드 옵션 없이도 HMR을 사용할 수 있습니다. 필요한 옵션을 설정하면 성능 측면에서 큰 도움이 됩니다.
- 다양한 시나리오에 대한 아래 코드 스니펫을 확인해보세요:

```js
//HMR을 사용하지만 라이브 리로드를 사용하지 않으려면 webpack.config.js에서 아래 구성을 사용하세요.
devServer: {
        hot: true ,
        liveReload:false
    }

//HMR을 사용하고 싶지 않지만 라이브 리로드를 사용하려면,
devServer: {
        hot: false ,
        liveReload: true
    },

//라이브 리로드를 사용하고 싶지 않다면,
devServer: {
        hot: false , //이 옵션은 필수로 false로 설정해야 합니다.
        liveReload: false
    },
```

## 참고문헌



- 웹팩의 HMR — https://webpack.js.org/guides/hot-module-replacement/
- 번들 크기를 줄이는 다양한 방법 — https://blog.jakoblind.no/3-ways-to-reduce-webpack-bundle-size/
- devserver 이해 및 자세한 작업 방법 — https://webpack.js.org/configuration/dev-server/#devserverlivereload
- 프로덕션을 위한 번들 최소화 — https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
- 웹팩을 사용한 프로덕션 사이트 구축 방법 — https://webpack.js.org/guides/production/
- 완벽한 devpack 서버 설정 — https://linguinecode.com/post/how-to-setup-webpack-dev-server-react-babel
- 로더 자세히 살펴보기 — https://webpack.js.org/concepts/loaders/
- babel-preset-env 자세히 이해하기 — https://blog.jakoblind.no/babel-preset-env/

이 글이 도움이 되셨기를 바라며. 다음 글도 기대해주세요.

# 리액트 앱을 레고처럼 재사용 가능한 컴포넌트로 만들기

![이미지](/assets/img/2024-05-12-CreateReactAppwithoutCreateReactApp_2.png)



Bit의 오픈 소스 도구는 25만 명 이상의 개발자가 컴포넌트를 사용하여 앱을 개발할 수 있게 도와줍니다.

어떤 UI, 기능 또는 페이지든 재사용 가능한 컴포넌트로 전환하고 애플리케이션 간에 공유하세요. 협업이 더 쉽고 빠르게 개발할 수 있습니다.

→ 자세히 알아보기

앱을 구성 요소로 분할하여 앱 개발을 쉽게 만들고 원하는 워크플로에 최상의 경험을 누릴 수 있습니다:



## → 마이크로 프론트엔드

## → 디자인 시스템

## → 코드 공유 및 재사용

## → 모노 레포



## 더 알아보기: