---
title: "리액트에서 TS를 사용하는 Function 컴포넌트 스니펫"
description: ""
coverImage: "/assets/img/2024-05-16-ReactsnippetforFunctionComponentinTS_0.png"
date: 2024-05-16 16:36
ogImage: 
  url: /assets/img/2024-05-16-ReactsnippetforFunctionComponentinTS_0.png
tag: Tech
originalTitle: "React snippet for Function Component in TS"
link: "https://medium.com/@vjnvisakh/react-snippet-for-function-component-in-ts-cd3e5125fe88"
isUpdated: true
---




알아야 할 사실을 직시합시다. React 없이는 살 수 없어요. React는 우리 삶을 정말 쉽게 만들어 주었죠. 요즘에는 웹 앱을 만드는 게 아주 쉽죠. 하지만 많은 보일러플레이트 때문에 때로는 지루할 수도 있어요. 새로운 기능을 제품에 추가할 때마다 React 함수 컴포넌트를 설정해야 하는 것 중 하나죠.

아래는 조금 더 효율적으로 코드를 작성할 수 있는 간단한 코드 스니펫입니다. VS Code에서 설정으로 이동한 다음 사용자 스니펫 구성을 찾아서 typescriptreact.json 파일로 이동하세요.

## 일반 TS — React 함수 컴포넌트

<div class="content-ad"></div>

```js
"TS React Function Component": {
  "prefix": "tsrfc",
  "body": [
   "import React from 'react';",
   "",
   "const ${1}: React.FC = () => {",
   "\treturn <div>${1}</div>;",
   "};",
   "",
   "export default ${1};"
  ],
  "description": "TypeScript에서 React 함수 컴포넌트",
 },
```

## TS — Props가 있는 React 함수 컴포넌트

```js
"TS React Function Component With Props": {
  "prefix": "tsrfcwp",
  "body": [
   "import React from 'react';",
   "",
   "type ${1}Props = {",
   "\tlabel: string",
   "};",
   "",
   "const ${1}: React.FC<${1}Props> = ({ label }) => {",
   "\treturn <div>{label}</div>;",
   "};",
   "",
   "export default ${1};"
  ],
  "description": "TypeScript에서 Props가 있는 React 함수 컴포넌트",
 },
```

## TS — Children이 있는 React 함수 컴포넌트

<div class="content-ad"></div>

```js
"TS React Function Component With Children": {
  "prefix": "tsrfcwc",
  "body": [
    "import React, { PropsWithChildren } from 'react';",
    "",
    "",
    "const ${1}: React.FC<PropsWithChildren> = ({ children }) => {",
    "\treturn <div>{children}</div>;",
    "};",
    "",
    "export default ${1};"
  ],
  "description": "React Function Component with Children in TypeScript",
 }
```

위와 같이 보입니다 —

즐거운 코딩하세요!