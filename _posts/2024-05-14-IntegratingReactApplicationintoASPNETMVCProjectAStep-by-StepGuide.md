---
title: "ASPNET MVC 프로젝트에 React 애플리케이션 통합하기 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_0.png"
date: 2024-05-14 11:11
ogImage: 
  url: /assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Integrating React Application into ASP.NET MVC Project: A Step-by-Step Guide"
link: "https://medium.com/@tauseefakram396/integrating-react-application-into-asp-net-mvc-project-a-step-by-step-guide-c75802627b32"
isUpdated: true
---




소개: 웹 개발 분야에서, React와 같은 현대적인 JavaScript 프레임워크를 전통적인 MVC (Model-View-Controller) 응용 프로그램에 통합하는 것이 일반적인 실천 방법이 되었습니다. 이러한 통합을 통해 개발자들은 React의 구성 요소 기반 아키텍처의 강점을 ASP.NET MVC의 익숙한 구조 내에서 활용할 수 있습니다. 이 안내서에서는 React 애플리케이션을 ASP.NET MVC 프로젝트에 매끄럽게 통합하는 과정을 안내하겠습니다.

Create React App: 먼저 create-react-app이나 기타 선호하는 방법을 사용하여 React 애플리케이션을 설정하세요.

필수 패키지 설치: 아래 명령을 실행하여 React 개발에 필요한 패키지를 설치하세요:

- npm install react react-dom
- npm install — save-dev babel-core babel-loader @babel/preset-react @babel/preset-env
- npm install babel-polyfill
- npm install — save-dev webpack webpack-cli



웹팩 구성하기: 루트 폴더에 webpack.config.js 파일을 생성하고 제공된 구성 코드를 붇여넣어주세요.

```js
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'React', 
    'react-dom': 'ReactDOM', 
  },
};
```

Babel 구성: 루트 폴더에 .babelrc 파일을 생성하고 Babel을 위한 제공된 프리셋을 추가해주세요.

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```



ESLint 구성 (선택 사항): 린팅 이슈가 발생하면, .eslintrc.json 파일을 만들고 지정된 대로 구성하세요.

```js
   // .eslintrc.json
   {
       "env": {
         "browser": true,
         "es2021": true,
         "node": true
       },
       "extends": "eslint:recommended",
       "parserOptions": {
         "ecmaVersion": 12,
         "sourceType": "module"
       },
       "rules": {
         // 여기에 다른 규칙을 추가하세요
       },
       "globals": {
         "React": "writable",
         "ReactDOM": "writable",
         "createRoot": "writable"
       }
     }
```

Package.json 업데이트: package.json의 스크립트 섹션에 "wpb": "webpack"을 추가하세요.

![이미지](/assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_0.png)



리액트 앱 컴파일: 리액트 애플리케이션을 컴파일하려면 npm run wpb를 실행하세요. 이렇게 하면 지정된 dist 폴더에 bundle.js 파일이 생성됩니다.

리액트 폴더 구조는 다음과 같이 보일 것입니다:

![React Folder Structure](/assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_1.png)

# MVC 애플리케이션 설정하기



MVC 애플리케이션 생성: 먼저 Visual Studio나 선호하는 다른 IDE에서 새 ASP.NET MVC 애플리케이션을 생성해보세요.

.cshtml 파일 업데이트: 렌더링하려는 React 컴포넌트를 포함하고자 하는 .cshtml 파일을 열어주세요.

폴더 구조 생성: MVC 앱 내에서 컴파일된 React JS 파일을 저장할 폴더를 생성하세요. 그리고 React 앱에서 생성된 bundle.js 파일을 해당 폴더에 넣어두세요. (예: wwwroot/dist)

React 파일 참조: .cshtml 파일에서 React 종속성 및 컴파일된 bundle.js 파일을 참조하도록 다음 코드 스니펫을 포함해주세요:



```jsx
<div id="root"></div>
```

## Scripts
```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="~/dist/bundle.js"></script>
```

![Illustration](/assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_2.png)

# 결과:

MVC 애플리케이션 실행...완료!




![이미지](/assets/img/2024-05-14-IntegratingReactApplicationintoASPNETMVCProjectAStep-by-StepGuide_3.png)

결론: 이 단계별 지침을 따르면 React 응용 프로그램을 ASP.NET MVC 프로젝트에 원활하게 통합할 수 있습니다. 이 접근 방식을 통해 React의 컴포넌트 기반 아키텍처의 이점을 활용하면서 서버 측 렌더링 및 비즈니스 로직 처리에 ASP.NET MVC의 견고함을 활용할 수 있습니다.