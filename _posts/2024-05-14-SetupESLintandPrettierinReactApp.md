---
title: "리액트 앱에서 ESLint와 Prettier 설정하기"
description: ""
coverImage: "/assets/img/2024-05-14-SetupESLintandPrettierinReactApp_0.png"
date: 2024-05-14 10:20
ogImage: 
  url: /assets/img/2024-05-14-SetupESLintandPrettierinReactApp_0.png
tag: Tech
originalTitle: "Setup ESLint and Prettier in React App"
link: "https://medium.com/@grantsky0503/setup-eslint-and-prettier-in-react-app-7c46b37697f6"
isUpdated: true
---




<img src="/assets/img/2024-05-14-SetupESLintandPrettierinReactApp_0.png" />

ESLint와 Prettier 설정은 초보자에게는 조금 긴장스러울 수 있어요. 저도 이 문제에 직면한 적이 있어서 잘 알고 있어요. 인터넷에는 린팅 설정에 관한 많은 기사가 있을 거예요. 그 중 일부는 여러분에게 맞을 지도 모르지만, 일부는 그렇지 않을 수도 있어요. 그 중 대부분은 라이브러리가 계속 업데이트되기 때문에 오래되었을 가능성이 크답니다.

그래서, 우리는 ESLint와 Prettier에 대해 이해해야 해요.

## ESLint이란?



ESLint는 구성 가능한 JavaScript 린터입니다. JavaScript 코드에서 문제를 찾아 해결하는 데 도움을 줍니다. 문제는 잠재적인 런타임 버그, 최적의 관행을 따르지 않는 것, 스타일링 문제 등 무엇이든 포함될 수 있습니다.

ESLint는 ECMAScript/JavaScript 코드에서 발견된 패턴을 식별하고 보고하는 도구로, 코드를 일관되게 만들고 버그를 피하기 위해 사용됩니다.

## Prettier란 무엇인가요?

Prettier는 대부분의 언어와 호환되는 주관적인 코드 형식 지정 도구입니다.



## 먼저 React 앱을 만들어봐요

demo-app이라는 프로젝트를 생성하려면 다음 명령어를 실행하세요:

```js
npx create-react-app demo-app
cd demo-app
npm start
```

## ESLint와 Prettier 설정



스텝 1: 프로젝트 루트 폴더에서 터미널을 열고 ESLint를 개발 의존성으로 설치하세요.

```js
npm install eslint --save-dev
 또는
yarn add eslint --dev
```

스텝 2: 아래 명령어를 실행하여 .eslintrc.json 파일을 생성하세요.

```js
npx eslint --init
 또는
yarn run eslint --init
```



이 프로세스를 통해 여러 옵션이 표시됩니다. 먼저 "구문을 확인하고 문제를 찾습니다"를 선택한 후 JavaScript 모듈(가져오기/내보내기)를 선택하고 React를 선택하세요. 그런 다음 프로젝트에 TypeScript를 사용하는지 물어볼 것입니다. 제 경우 TypeScript를 사용하지 않으므로 "아니요" 옵션을 선택하겠습니다. 브라우저를 선택한 후 JSON 옵션을 선택하세요. 그런 다음 eslint-plugin-react를 설치하라는 메시지가 표시됩니다. "예"를 클릭하세요.

프로젝트 루트 폴더에 .eslintrc.json 파일이 표시됩니다.

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
```



**단계 3: 규칙 추가**

리액트 - 18.0.0에서 파일에 리액트를 가져오는 것은 선택 사항입니다. 이를 해결하기 위해 .eslintrc.json 파일에 규칙을 추가할 겁니다. 따라서 .eslintrc 파일을 열고 규칙 내부에 이 줄을 추가해주세요. "react/react-in-jsx-scope": "off"

```js
"rules": {
    "react/react-in-jsx-scope": "off"
}
```

**단계 4: Jest를 사용 중이라면**

Jest를 사용 중이라면, eslint가 test 또는 expect가 정의되지 않았다는 오류를 보여줄 수 있습니다. 이를 해결하기 위해 env 내부에 "jest": true를 추가해야 합니다.



```js
"env": {
    "browser": true,
    "es2021": true,
    "jest": true
  }
```

단계 5: 이제 리액트와 함께 작동하도록 eslint 플러그인을 추가하고, eslint 및 prettier가 서로 충돌하지 않도록 적절한 구성을 만들어주세요.

```js
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
or 
yarn add eslint-config-prettier eslint-plugin-prettier prettier --dev
```

단계 6: 위 모듈을 모두 설치한 후, .eslintrc.json 파일에 몇 가지 prettier 구성을 추가해야 합니다. 따라서 extends 내부에 "plugin:prettier/recommended"라는 줄을 추가해주세요.
  



```js
"extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
```

step7: .prettierrc.json 파일을 생성하고 아래 코드를 붙여넣으세요

```js
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true
}
```

이제 eslint와 prettier가 설정되었으니 package.json에 스크립트를 추가합시다.



```js
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write ./**/*.{js,jsx,ts,tsx,css,md,json} --config ./.prettierrc.json"
```

위 명령어를 사용하여 소스 코드를 수정하고 확인할 수 있어요.

읽어 주셔서 감사합니다.

소스 코드: https://github.com/DreamSky1996/react-lint-prettier



아란 그랜트가 만들었습니다