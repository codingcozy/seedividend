---
title: "VsCode에 React 앱을 설치하는 방법(2024년 최신)"
description: ""
coverImage: "/assets/img/2024-05-17-HowtoInstallReactAppInVsCode2024_0.png"
date: 2024-05-17 20:57
ogImage: 
  url: /assets/img/2024-05-17-HowtoInstallReactAppInVsCode2024_0.png
tag: Tech
originalTitle: "How to Install React App In VsCode 2024"
link: "https://medium.com/@reactmasters.in/how-to-install-react-app-in-vscode-2024-6b66f7c5358c"
---


React.js은 실시간 응용 프로그램 및 사용자 인터페이스 개발에 널리 사용되는 JavaScript 라이브러리입니다. 이는 종종 프런트엔드 JavaScript 프레임워크로 언급됩니다. Visual Studio Code (VSCode)는 가벼우면서 강력한 코드 편집기로, React.js 개발에 탁월한 지원을 제공합니다. 이 글에서는 React.js를 빠르고 주관적인 빌드 도구인 Vite와 함께 VSCode에 설정하는 과정을 안내해 드리겠습니다. 그러니, 빠르게 React 앱을 VS Code에 설치해 봅시다.

![이미지](/assets/img/2024-05-17-HowtoInstallReactAppInVsCode2024_0.png)

# 사전 준비 사항:

설치 프로세스에 진입하기 전에, 필요한 모든 사전 요구 사항이 갖추어져 있는지 확인해 보겠습니다:

<div class="content-ad"></div>

- Node.js 및 npm:

- React.js는 Node.js와 npm (Node Package Manager)에 의존합니다. 아직 설치하지 않은 경우, nodejs.org로 이동하여 최신 버전을 다운로드하고 설치해보세요.

2. Visual Studio Code:

- 컴퓨터에 Visual Studio Code가 설치되어 있는지 확인해주세요. 아직 설치하지 않은 경우, code.visualstudio.com에서 운영 체제와 호환되는 최신 버전을 다운로드하고 설치하세요.

<div class="content-ad"></div>

# 단계 1: Visual Studio Code를 실행하세요

Visual Studio Code를 열면 여정이 시작됩니다. 아직 설치하지 않았다면, 지금 설치하는 것이 바로 시기입니다.

# 단계 2: React 앱 만들기

## 2.1 통합 터미널 열기

<div class="content-ad"></div>

상위 메뉴로 이동하여 View - Terminal을 선택하거나 바로 가기 Ctrl +를 사용하여 Visual Studio Code 내에 통합 터미널을 열어보세요.

# 2.2 새 React 앱 생성하기

다음 명령을 실행하여 새 React 앱을 만들어보세요. 원하는 프로젝트 이름으로 my-react-app을 사용자 정의할 수 있습니다.

```js
npx create-react-app my-react-app
```

<div class="content-ad"></div>

# 단계 3: 프로젝트로 이동하기

다음 명령어를 사용하여 프로젝트 디렉토리로 이동하세요:

```js
cd my-react-app
```

# 단계 4: 개발 서버 실행하기

<div class="content-ad"></div>

# 4.1 개발 서버 시작하기

다음 명령어를 사용하여 개발 서버를 시작하세요:

```js
npm start
```

이 명령어를 실행하면 React 앱이 개발 모드로 실행되며, 브라우저를 통해 http://localhost:3000/ 에서 접근할 수 있습니다.

<div class="content-ad"></div>

# 4.2 원활한 개발을 위한 자동 업데이트

React 코드를 조정하고 수정하는 동안 개발 서버가 자동으로 업데이트되어 원활하고 효율적인 개발 경험을 제공합니다.

# 단계 5: React 앱 구조 살펴보기

Visual Studio Code를 열고 프로젝트 폴더로 이동합니다. src 폴더는 소스 코드용이고 public 폴더는 정적 자산용 등 필수 폴더를 포함한 표준 React 프로젝트 구조가 여러분을 기다리고 있습니다.

<div class="content-ad"></div>

# 단계 6: 향상된 개발을 위한 선택 도구

# 6.1 React 개발자 도구 확장

Visual Studio Code에서 "React 개발자 도구" 확장을 통합하여 개발 경험을 향상시킵니다. 이 확장은 React 애플리케이션을 디버깅하는 데 유용한 통찰력과 도구를 제공합니다.

- 확장 뷰( Ctrl + Shift + X)를 열고 "React Developer Tools"를 검색한 후 설치를 클릭하세요.

<div class="content-ad"></div>

# 6.2 ESLint과 Prettier를 통한 코드 품질 관리

코드 일관성과 품질을 유지하기 위해 React 프로젝트에 ESLint와 Prettier를 통합하는 것을 고려해보세요.

- ESLint를 전역으로 설치하세요:

```js
npm install -g eslint
```

<div class="content-ad"></div>

- Visual Studio Code에 ESLint 확장 프로그램을 설치해보세요.
- ESLint 구성 파일을 만들어보세요:

```js
npx eslint --init
```

Prettier를 설치해보세요:

```js
npm install --save-dev prettier
```

<div class="content-ad"></div>

- 프로젝트에 .prettierrc 파일을 만들어 Prettier를 구성하세요.

## 단계 7: 코딩 어드벤처 시작하기

축하합니다! 이제 비주얼 스튜디오 코드에서 React.js 프로젝트를 성공적으로 설정했고, 이제 창의력을 발휘할 준비가 되었습니다. 강력한 React 컴포넌트를 구축하고, React 라이브러리의 방대한 생태계를 탐험하며, 웹 개발의 무한한 가능성에 대해 탐구해보세요.

## 결론:

<div class="content-ad"></div>

2024년이 시작되면서 React.js는 현대 웹 개발의 선두에 있습니다. React.js를 정복하면 다양한 기회의 문을 열 수 있습니다. 이 포괄적인 안내를 따르면, Visual Studio Code에 React를 설치하고도 풍부한 코딩 여정을 경험할 수 있게 될 것입니다.