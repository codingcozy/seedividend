---
title: "env 변수 undefined"
description: ""
coverImage: "/assets/img/2024-05-12-envvariablesundefined_0.png"
date: 2024-05-12 22:41
ogImage: 
  url: /assets/img/2024-05-12-envvariablesundefined_0.png
tag: Tech
originalTitle: ".env variables 'undefined'."
link: "https://medium.com/@zak786khan/env-variables-undefined-78cf218dae87"
isUpdated: true
---




애플리케이션을 구축할 때 VITE, REACT 또는 NEXT를 기반으로 하는 상황에 갇혀 과연 환경 변수를 어떻게 설정해야 할지 모를 때가 있나요?

저 또한 예전에 여러분과 같은 상황에 처해 있었고, 고민 끝에 제 문제에 맞는 해결책을 찾기 위해 인터넷을 뒤적였어요.

우리가 설치한 패키지/모듈의 공식 문서에 기재된 케이스와 맞지 않는 기능이 있는 프로젝트를 갖고 있는 경우가 많습니다. 따라서 이 게시물은 환경 변수와 여러분의 “상황"에서 이를 작동시키는 방법에 대한 내용입니다.

환경 변수란 정확히 무엇인가요?



환경 변수는 단순히 프로젝트의 파일 시스템 전역에서 사용하려는 변수들입니다. 하지만 이를 인터넷에서 다른 사람들에게 공개하거나 보여주고 싶지는 않아요. 기본적으로 "SECRET_KEY"나 "PUBLISHABLE_KEY"와 같은 민감한 변수나 키들입니다. 이러한 종류의 키/변수는 .env라는 파일 안에 작성됩니다.

이 .env 파일을 어떻게 만들까요?

먼저 프로젝트 폴더에서 package.json 파일의 계층을 찾으세요. 그 후, 새 파일을 만들기 위해 마우스 오른쪽 버튼을 클릭하고 파일 이름을 "env"로 작성하세요. 정확하게 이렇게 작성해 주셔야 하며, 이렇게 하시면 환경 변수 파일이 생성됩니다.

![이미지](/assets/img/2024-05-12-envvariablesundefined_0.png)



.env 파일에 환경 변수를 어떻게 작성하나요?

- Vite 애플리케이션(프론트엔드)에 환경 변수를 사용하려면 패키지(dotenv)를 설치할 필요가 없습니다. .env 파일을 생성하기만 하면 됩니다.

```js
VITE_YOUR_VARIABLE_NAME=SOMETHING
```

2. 마찬가지로 React 애플리케이션(프론트엔드)에 환경 변수를 사용하려면 패키지(dotenv)를 설치할 필요가 없습니다. .env 파일을 생성하기만 하면 됩니다.



3. REACT 앱에서 변수를 선언하는 구문은 다음과 같습니다. 변수 이름은 'REACT_APP_' 프리픽스가 있어야 합니다. 그렇지 않으면 변수가 제대로 작동하지 않습니다.

```js
REACT_APP_YOUR_VARIABLE_NAME=SOMETHING
```

4. NEXT 앱에서 환경 변수를 선언할 때 변수는 아래와 같이 보여야 합니다. "NEXT_PUBLIC_" 프리픽스가 있어야만 제대로 작동합니다.

```js
NEXT_PUBLIC_YOUR_VARIABLE_NAME=SOMETHIN
```



<img src="/assets/img/2024-05-12-envvariablesundefined_1.png" />

5. 백엔드(server) 폴더에서 환경 변수를 선언하는 경우, dotenv이라는 패키지가 필요합니다.

설치

yarn과 npm은 우리가 인터넷에서 패키지를 다운로드하여 프로젝트에서 사용하고 멋진 것을 만들 수 있도록 도와주는 패키지 관리자입니다.



```js
npm i dotenv
```

또는

```js
yarn add dotenv
```

5. 이제 서버 측 폴더의 index.js(루트 파일/진입점)에서 방금 설치한 이 패키지를 구성해야 합니다.



```js
const dotenv = require("dotenv")
dotenv.config()
```

![2024-05-12-envvariablesundefined_2.png](/assets/img/2024-05-12-envvariablesundefined_2.png)

다음에는 .env 파일을 만드는 방법에 언급된 것과 똑같은 절차를 수행합니다. 그러나 백엔드에서는 환경 변수의 이름을 원하는 대로 지정할 수 있습니다.

```js
MONGO_URL=SDAHKAFHKLJAHFLA
JWT_KEY=FHALKHFLAHF
```



그 변수를 컴포넌트 파일에서 어떻게 접근할 수 있는지 알고 계신가요?

프런트엔드

- Vite 앱의 경우

```js
const VARIABLE_NAME = import.meta.env.VITE_YOUR_KEY_VARIABLE_NAME
```



- React 앱용

```js
const VARIABLE_NAME = process.env.REACT_APP_YOUR_KEY_VARIABLE_NAME
```

- Next 앱용

```js
const VARIABLE_NAME = process.env.NEXT_PUBLIC_YOUR_VARIABLE_NAME
```



백엔드

- 원하는 변수에 액세스하려면 process.env.VARIABLE_NAME을 사용해야 합니다.

```js
const VARIABLE_NAME = process.env.YOUR_VARIABLE_NAME
```

최종 참고 사항:



- VARIABLE_NAME을 대문자로 작성하는 것이 좋지만 casing은 당신에게 달려 있어요.
- 환경 변수를 선언할 때 공백, 쉼표 또는 세미콜론을 사용하지 마세요.

이제 프런트엔드와 백엔드를 위한 환경 변수 설정의 기술을 습득했어요. 어려움이 있으면 언제든 저에게 GitHub 또는 프로필 내 링크를 통해 연락해 주세요.

마지막으로, 표준 최고의 실천 방법을 준수하면 개발 능력이 향상되고 다른 사람에게 전문성을 나타낼 수 있어요. 이 "case"에서는 대문자 또는 소문자 변수 이름 사용을 피하세요.