---
title: "리액트 타입스크립트 프로젝트에서 ESLint 설정하기 2022"
description: ""
coverImage: "/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_0.png"
date: 2024-05-12 22:17
ogImage: 
  url: /assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_0.png
tag: Tech
originalTitle: "Setting ESLint on a React Typescript project (2022)"
link: "https://medium.com/@andrebnassis/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba"
isUpdated: true
---




<img src="/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_0.png" />

# 소개

내 React Typescript 프로젝트에 ESLint를 설치하고 이해하려는 데 많은 어려움을 겪은 후, React Typescript 프로젝트에 ESLint를 설정하는 확정 가이드를 작성하기로 결정했습니다.

이 튜토리얼의 주요 목표는 단계별로 설정하고 추가 또는 실행된 각 줄을 설명하는 것입니다. 단순히 여러 구성을 가진 많은 파일을 제공하고 무엇이 일어나고 있는지를 이해할 수 있기를 바랄 뿐인 대신 설명합니다.



그럼 시작해볼까요!

## 준비물

참고: Node 버전 `= 10`이 설치되어 있어야 합니다. 설치되어 있지 않다면 NodeJS 웹사이트로 이동하여 로컬 머신에 다운로드하고 설치해 주세요. (https://nodejs.org/en/)

## 단계 1: TypeScript로 React 프로젝트 생성



다음 명령어는 my-app이라는 폴더 내에 프로젝트를 생성합니다.

터미널에서 다음을 실행하세요:

```js
npx create-react-app my-app --template typescript
```

# 단계 2: React 프로젝트에서 미리 설정된 ESLint 구성 제거하기



래스크는 eslint 설정이 미리 설정되어 있어요. 이 설정을 제거해서 더 나은 설정을 할 수 있도록 해봐요. 이를 위해 'package.json' 파일에서 아래 코드를 제거해주세요.

```js
"eslintConfig": {
   "extends":[
      "react-app",
      "react-app/jest"
   ]
}
```

# 단계 3: ESLint 패키지 설치하기

프로젝트 디렉토리 안에서 터미널을 열어주세요.



터미널에서 다음을 실행해 주세요:

```js
npm install eslint --save-dev
```

위 명령을 실행하면 'package.json' 파일에서 "eslint"가 개발용 종속성으로 추가된 것을 확인할 수 있습니다.

```js
"devDependencies": {
   "eslint": "^7.20.0"
}
```



# 단계 4: ESLint 설정

프로젝트 디렉토리 안에서 터미널을 열어주세요.

터미널에서 다음을 실행하세요:



```js
npx eslint --init
```

이 명령을 실행할 때 설정에 관한 몇 가지 질문에 답변해야합니다.

이후, 설치해야 할 종속 항목을 확인한 다음 다음과 같이 물어볼 것입니다:

그런 다음 필요한 모든 패키지를 설치합니다. 설치 프로세스가 완료되면 "package.json" 파일의 'devDependencies'는 다음과 같이 보여야 합니다:



```js
"devDependencies": {
"@typescript-eslint/eslint-plugin": "^4.15.1",
"@typescript-eslint/parser": "^4.15.1",
"eslint": "^7.20.0",
"eslint-config-airbnb": "^18.2.1",
"eslint-plugin-import": "^2.22.1",
"eslint-plugin-jsx-a11y": "^6.4.1",
"eslint-plugin-react": "^7.22.0",
"eslint-plugin-react-hooks": "^4.2.0"
}
```

PS: 위 예시와 버전이 일치하지 않아도 괜찮아요.

# Step 5: ESLint 실행하기

프로젝트 디렉토리에서 터미널을 열어주세요.



ESLint를 실행하고 가리키는 오류를 확인하려면 다음을 실행하세요:

```js
npx eslint <대상파일>
```

일부 오류를 자동으로 수정하려면 '--fix'를 사용할 수 있어요:

```js
npx eslint <대상파일> --fix
```



만약 경고를 무시하고 싶다면 ‘--quiet’를 사용할 수 있어요.

```js
npx eslint <대상파일> --quiet
```

# 단계 5.1: 실행해봅시다!

만약 'src' 디렉토리 안의 모든 파일에 대해서 eslint를 실행하면 35개의 오류가 나타날 거예요. 와우!



```js
npx eslint src/* 
```

ESLint 출력:

<img src="/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_1.png" />

자동 수정으로 실행하면 무서운 부분은 줄어들었지만 해결해야 할 오류가 여전히 22개 남아 있어요. 대박이에요!



```bash
npx eslint src/* --fix
```

ESLint의 출력:

![Setting ESLint on a React Typescript project](/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_2.png)

그래서 우리는 모든 단계를 거치고 Typescript로 ReactJS의 '안녕, 세계' 프로젝트를 수행했는데도 이 모든 오류가 발생했습니다. 대부분의 오류는 확장 파일 오류나 심지어 React 자체의 사용과 같은 무의미한 것들이었습니다.



짜증나는 일이죠?

좋은 소식은 이미 이 지옥을 겪어가며 이 문제들을 해결했고, 이제 ESLint를 제대로 사용할 수 있도록 모든 구성을 끝마칠 수 있습니다. 이 문제를 하나씩 살펴보고 어떻게 해결해야 하는지 알아보겠습니다!

## 남은 문제 해결하기

### 문제: "'no-use-before-define'"



에러 샘플: 'React'가 정의되기 전에 사용되었습니다.

## 해결 방법

'eslintrc.json' 파일에서 "rules" 섹션 아래에 다음을 추가하십시오:

```js
"rules": {
  "no-use-before-define": "off",
  "@typescript-eslint/no-use-before-define": ["error"]
}
```



위 설명은 이 스택 오버플로 포스트에 있어요 (https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916)

# 문제: "'react/jsx-filename-extension"

에러 샘플: 확장자 '.tsx'를 가진 파일에서 JSX가 허용되지 않음

## 해결책



'eslintrc.json' 파일에서 "rules" 아래에 다음을 추가하세요:

```js
"rules": {
...
"react/jsx-filename-extension": [ "warn", {"extensions": [".tsx"]} ]
}
```

# 문제: "import/no-unresolved"

에러 샘플: './App' 모듈에 대한 경로를 해결할 수 없음



## 해결 방법

- 프로젝트 디렉토리 내에서 터미널을 열고 eslint-import-resolver-typescript 패키지를 설치하세요.

```js
npm install eslint-import-resolver-typescript --save-dev
```

- 'eslintrc.json' 파일에 다음과 같이 새로운 "settings" 속성을 추가하세요:



```json
"settings": {
    "import/resolver": {
        "typescript": {}
    }
}
```

# 문제: "import/extensions"

에러 샘플: './App'에 대한 'tsx' 파일 확장자 누락

## 해결책



'eslintrc.json' 파일에서 "rules" 아래에 다음을 추가해 주세요:

```js
"rules": {
…
"import/extensions": [
"error",
"ignorePackages",
{
"ts": "never",
"tsx": "never"
}
]
}
```

# 문제: "no-undef"

에러 샘플: 'test'가 정의되지 않았습니다



## 해결 방법

'eslintrc.json' 파일에서 "extends" 항목에 "plugin:@typescript-eslint/recommended"를 추가하십시오:

```js
"extends": [
…
"plugin:@typescript-eslint/recommended"
],
```

# 문제: "no-shadow"



에러 샘플: 'Enum'이 이미 상위 스코프에서 선언되었습니다.

## 해결 방법

‘eslintrc.json’ 파일에서 "rules" 아래에 다음을 추가하십시오:

```js
"rules":{
…
"no-shadow": "off",
"@typescript-eslint/no-shadow": ["error"]
}
```



스택 오버플로우 게시물에 설명이 있습니다(https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope)

# 문제: 'js', 'jsx', 'ts', 또는 'tsx' 확장자 파일이 아닌 파일에 대한 오류

## 해결책:

‘.eslintignore’ 파일에 추가하여 ESLint가 특정 파일을 무시하도록 할 수 있습니다.



그럼,

- 프로젝트 루트에 '.eslintignore' 파일을 만듭니다.
- 다음 텍스트를 추가합니다:

```js
*.css
*.svg
```

# 추가:



# 적용해 볼 좋은 규칙들

## 모든 함수에 명시적인 반환 유형을 강제로 적용하기

‘eslintrc.json’ 파일에서 "rules" 아래에 다음을 추가해주세요:

```js
"rules":{
...
"@typescript-eslint/explicit-function-return-type": [
"error",
{
"allowExpressions": true
}
]
}
```



## 코드 라인의 최대 길이

'.'eslintrc.json' 파일에 "rules" 항목 아래에 다음 코드를 추가해주세요:

```js
"rules":{
…
"max-len": ["warn", { "code": 80 }]
}
```

## React Hooks 규칙



'**eslintrc.json**' 파일에서 "plugins" 섹션에 다음을 추가해주세요:

```js
"plugins": [
…
"react-hooks"
],
```

그리고 "rules" 섹션에도 다음을 추가해주세요:

```js
"rules":{
…
"react-hooks/rules-of-hooks": "error",
"react-hooks/exhaustive-deps": "warn"
}
```



# 무시할 몇 가지 규칙:

## 기본 내보내기 사용 선호

`eslintrc.json`에서 "rules" 아래에 다음을 추가해주세요:

```js
"rules":{
…
"import/prefer-default-export": "off"
}
```



## 프롭 타입 규칙

`eslintrc.json` 파일에서 "rules" 항목에 다음 내용을 추가해 주세요:

```js
"rules":{
…
"react/prop-types": "off"
}
```

# 결론



그래서 이러한 구성을 통해 ReactJS with Typescript 프로젝트의 코드 품질을 향상시킬 수 있습니다. 즐기세요! :)

# VS Code: 저장할 때 파일에서 ESLint 자동 수정 실행

게다가, VS Code에서 자동 수정을 구성하는 방법을 보여드리겠습니다. 그러나 이는 선택 사항입니다. 코드를 저장할 때마다 ESLint를 자동 수정하려면 다음 단계를 수행하실 수 있습니다.

- 프로젝트 루트에 '.vscode' 폴더를 생성합니다.
- '.vscode/' 폴더 안에 'settings.json' 파일을 생성하고 다음 코드를 삽입합니다.



<img src="/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_3.png" />

```js
{
"editor.defaultFormatter": "dbaeumer.vscode-eslint",
"editor.formatOnSave": true,
"eslint.alwaysShowStatus": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}
}
```

- VS Code ESLint 확장 프로그램 설치

VS Code 'Extensions' 섹션으로 이동하여 수동으로 설치할 수 있습니다:



![이미지](/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_4.png)

또는 VS Code 빠른 열기(Ctrl+P)를 실행하고 다음 몤령어를 실행하세요:

```js
ext install dbaeumer.vscode-eslint
```

- VS Code에서 ESLint 익스텐션 사용 허용하기:



처음 사용하는 경우 ESLint 확장 프로그램이 차단될 것입니다. 그럼에도 불구하고 허용해야 합니다:

1. 상태 표시줄 아이콘을 클릭합니다.

![이미지](/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_5.png)

2. 팝업이 나타납니다. '허용' 옵션을 선택합니다.



<img src="/assets/img/2024-05-12-SettingESLintonaReactTypescriptproject2022_6.png" />

완료되었습니다! 이제 모든 파일을 저장할 때마다 ESLint 규칙을 자동으로 수정할 수 있습니다.

# 참고