---
title: "ViteJS React 프로젝트에 ESLint과 Prettier를 추가하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Adding ESLint and Prettier to a ViteJS React project"
link: "https://medium.com/stackademic/adding-eslint-and-prettier-to-a-vitejs-react-project-84a0752c0fc5"
isUpdated: true
---





<img src="/assets/img/AddingESLintandPrettiertoaViteJSReactproject_0.png" />

요즘 ViteJS를 Create React App의 대안으로 시도해 보기로 결정했어요. ViteJS는 이미 React 애플리케이션을 위한 기본 템플릿을 제공하지만 ESLint와 Prettier가 포함되어 있지는 않아요. 이 포스트에서는 ViteJS로 생성된 React 프로젝트에서 이 두 패키지를 설치하고 구성하는 방법을 간단히 살펴볼 거에요.

# 단계 1: 종속성 설치

ESLint와 Prettier 외에도 다음 종속성을 설치할 거에요:

<div class="content-ad"></div>

- @typescript-eslint/eslint-plugin: TypeScript 프로젝트용 린트 규칙 모음입니다.
- @typescript-eslint/parser: TypeScript용 코드 구문 분석기입니다.
- eslint-config-prettier: ESLint와 Prettier 간의 충돌하는 규칙을 비활성화하기 위한 ESLint 구성입니다.
- eslint-plugin-import: ES6+ import/export 구문을 처리하기 위해 ESLint를 활성화하는 플러그인입니다.
- eslint-plugin-jsx-a11y: 몇 가지 접근성 규칙이 있는 플러그인입니다.
- eslint-plugin-react: React 프로젝트를 위한 규칙이 있는 플러그인입니다.
- eslint-plugin-react-hooks: React 훅을 함수 컴포넌트 외부에서 사용하지 않도록 하는 규칙이 있는 플러그인입니다.

모든 종속성을 설치하려면 다음 명령을 실행하세요:

```js
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

npm을 사용하는 경우 yarn add -D를 npm install --dev로 대체하세요.

<div class="content-ad"></div>

# 단계 2: ESLint 구성

의존성이 이미 설치되었으니, ESLint 구성 파일을 만드는 시간입니다. 먼저, ESLint 구성을 관리할 .eslintrc 파일을 만들겠습니다.

.eslintrc

```js
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_"
      }
    ],
    "react/react-in-jsx-scope": "off"
  }
}
```

<div class="content-ad"></div>

안녕하세요! 사용하지 않는 변수가 발생하면 에러가 발생하도록 no-unused-vars를 설정했어요. react/react-in-jsx-scope 규칙을 비활성화했기 때문에 ESLint에서 JSX 파일에서 React를 가져오도록 강제하지 않아요 (import React from `react`). React 17.0부터는 JSX 파일에서 React를 가져오는 것이 필수가 아니에요.

이제 .eslintignore 파일을 만들 거에요. 이 파일은 ESLint에게 어떤 파일을 린트하지 않아야 하는지 알려줄 거에요:

.eslintignore

```js
node_modules / dist / env.d.ts;
```

<div class="content-ad"></div>

프로젝트 단추에서 시작하여 .ts 및 .tsx 파일 전체에 대해 eslint를 실행하도록 lint 스크립트를 package.json의 스크립트 섹션에 추가하는 것이 좋습니다. 그러면 yarn lint 또는 npm run lint을 실행하여 ESLint를 실행할 수 있습니다:

package.json

```js
"scripts": {
  ...
  "lint": "eslint . --ext .ts,.tsx"
}
```

lint 스크립트는 프로젝트 단추에서 시작하여 모든 .ts 및 .tsx 파일 위에 eslint를 실행할 것입니다.

<div class="content-ad"></div>

# 단계 3: Prettier 구성

ESLint를 구성할 때와 마찬가지로, 이제 Prettier 설정을 담은 .prettierrc 파일을 만들겠습니다. 사용 가능한 옵션에 대해 더 알아보려면 Prettier 문서를 확인해보세요.

.prettierrc

```js
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

<div class="content-ad"></div>

그리고, .prettierignore:

.prettierignore

```js
node_modules/
dist/
```

# 단계 4: VSCode와 통합하기

<div class="content-ad"></div>

최종적으로, 우리는 VSCode를 구성하여 ESLint와 Prettier를 사용하여 각각 코드 문제를 찾고 형식을 정리할 것입니다. 아직 이 확장 프로그램을 설치하지 않으셨다면, 설치해주세요: Prettier — Code formatter와 ESLint.

이미 설치된 확장 프로그램이 있다면, VSCode를 구성하여 파일 저장 시 Prettier를 사용하여 형식을 정리해야 합니다. 현재 작업 영역에 유효한 구성 파일이 있으면 (.eslintrc), ESLint 확장 프로그램이 자동으로 작동해야 합니다.

아직 .vscode/settings.json 파일이 없다면, 다음 설정으로 파일을 만들어주세요:

.vscode/settings.json

<div class="content-ad"></div>

```js
{
  ...
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

잘 했어요! 이제 ESLint가 코드 문제를 편집하는 동안 강조하고, Prettier는 저장 시에 가능한 경우 서식을 적용해줄 거예요.

<img src="https://miro.medium.com/v2/resize:fit:1400/0*X47IZ1le2c5GwdDd.gif" />
