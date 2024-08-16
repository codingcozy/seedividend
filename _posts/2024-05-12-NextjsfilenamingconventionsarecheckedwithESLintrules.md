---
title: "넥스트js 파일 이름 규칙은 ESLint 규칙으로 확인됩니다"
description: ""
coverImage: "/assets/img/2024-05-12-NextjsfilenamingconventionsarecheckedwithESLintrules_0.png"
date: 2024-05-12 22:01
ogImage: 
  url: /assets/img/2024-05-12-NextjsfilenamingconventionsarecheckedwithESLintrules_0.png
tag: Tech
originalTitle: "Next.js file naming conventions are checked with ESLint rules"
link: "https://medium.com/@hiro08gh/next-js-naming-conventions-are-checked-with-eslint-rules-946371d67882"
isUpdated: true
---




<img src="/assets/img/2024-05-12-NextjsfilenamingconventionsarecheckedwithESLintrules_0.png" />

현재 프론트엔드 환경에는 많은 네이밍 규칙이 있어요. 예를 들어, 컴포넌트는 파스칼 케이스로 작성해야 하지만, 훅 관련 파일은 카멜 케이스로 작성해야 하며, 훅 프로세스는 파일 이름의 시작에 use를 붙여야 해요. 예를 들어, useHooks.ts 같은 식이죠. 프론트엔드 환경 뿐만 아니라 여러분의 환경에도 암묵적인 네이밍 규칙이 있을 거라고 확신해요.

여기 네이밍 규칙 예시가 있어요. 여러분은 프로젝트에서 네이밍 규칙을 어떻게 관리하나요?

```js
src
├ app // app 디렉터리 아래는 케밥 케이스입니다.
│ ├ layout.tsx
│ ├ not-found.tsx
│ ├ page.tsx
│ └ about
│   ├ layout.tsx
│   └ page.tsx
├ components // components 디렉터리 아래는 파스칼 케이스입니다.
│ └ Button
│   ├ Button.tsx
│   ├ Button.modules.css
│   └ index.tsx
└ features
  └ serach-feature
    ├ components
    │ └ SerchField
    ├ hooks // hooks 디렉터리 아래는 카멜 케이스입니다. 파일 이름에 "use"를 추가해주세요.
    │ └ useSearch.tsx
    ├ providers // providers 디렉터리 아래는 카멜 케이스입니다. 파일 이름에 "Provider"를 추가해주세요.
    │ └ searchProvider.tsx
    └ utils
```



그래서 ESLint 규칙과 통합하는 아이디어를 생각해냈고, Next.js 프로젝트에 완벽하게 어울리는 eslint-plugin-validate-filename을 만들었어요. 이 아이디어를 공유해주시면 피드백과 이슈를 주시면 감사하겠어요.

VSCode는 이렇게 오류를 표시할 거에요.

![image](/assets/img/2024-05-12-NextjsfilenamingconventionsarecheckedwithESLintrules_1.png)

# 설치



먼저 필요한 패키지를 설치하세요.

```js
npm install --save-dev eslint-plugin-validate-filename
```

다음으로 ESLint 구성을 추가하세요. 구성 파일에는 .eslintrc 및 .eslint.json이 포함됩니다. validate-filename은 네이밍 규칙을 가지고 있습니다.

```js
{
  "plugins": ["validate-filename"],
  "rules": {
    "validate-filename/naming-rules": [
      "error",
      {
        "rules": [
          // 여기에 규칙을 추가하세요
        ]
      }
    ]
  }
}
```



# 컴포넌트 네이밍 규칙

컴포넌트를 만들 때는 PascalCase를 사용하는 것이 좋습니다. 이 규칙은 컴포넌트와 일반 HTML 요소를 쉽게 구별할 수 있도록 도와줍니다.

케이스에는 camel, pascal, snake, kebab, flat이 있습니다. 대상은 폴더 경로의 이름이어야 합니다. index 이름은 무시됩니다.

```js
{
  "case": "pascal",
  "target": "**/components/**"
}
```



여기 유효한 예와 유효하지 않은 예가 있어요.

```js
/components/App/App.tsx // 유효함
/components/App/app.tsx // 유효하지 않음
```

# 앱 라우터 네이밍 규칙

Next.js의 앱 라우터 디렉터리 아래에서는 케밥 케이스로 작성하는 것이 좋습니다. 파일 이름이 고정되어 있고 모두 케밥 케이스이기 때문입니다.



규칙은 다음과 같습니다.

```js
{
  "case": "kebab",
  "target": "**/app/**",
}
```

다음은 유효한 예와 유효하지 않은 예시입니다.

```js
/app/page.tsx // 유효
/app/not-found.tsx // 유효
/app/appRoute.tsx // 유효하지 않음
```



앱 디렉토리 내에서 특정 파일 이름으로의 사용을 제한하려면 patterns에서 규칙을 설정하여 이를 달성할 수 있습니다.

```js
{
  "case": "kebab",
  "target": "**/app/**",
  "patterns": "^(page|layout|loading|error|not-found|route|template).tsx$"
}
```

# 훅 네이밍 규칙

훅 디렉토리 아래에 파일 이름에 use를 추가하세요. use를 포함하면 해당 파일이 훅 로직을 포함한다는 것을 나타내게 됩니다.



```js
{
  "case": "camel",
  "target": "**/hooks/**",
  "patterns": "^use"
}
```

위는 유효하고 무효한 예제입니다.

```js
/hooks/useHooks.ts // 유효
/hooks/hooks.tsx // 무효
```

Providers 하위 요소에 대해서도 동일한 규칙을 만들 수 있습니다.



```js
{
  "case": "camel",
  "target": "**/providers/**",
  "patterns": "^[a-zA-Z]*Provider"
}
```

# 요약

마지막으로, 파일 네이밍 규칙에 대한 ESLint 규칙을 구현하면 프로젝트의 가독성, 유지보수성 및 깨끗함이 향상됩니다. 프론트엔드 개발에서 여러 암시적 네이밍 규칙이 존재하므로 eslint-plugin-validate-filename을 사용하여 규칙을 수립하는 것이 좋습니다.

피드백과 이슈를 제공해 주시면 감사하겠습니다.



최종 설정

```js
{
  "plugins": ["validate-filename"],
  "rules": {
    "validate-filename/naming-rules": [
      "error",
      {
        "rules": [
          {
            "case": "pascal",
            "target": "**/components/**"
          },
          {
            "case": "kebab",
            "target": "**/app/**",
            "patterns": "^(page|layout|loading|error|not-found|route|template).tsx$"
          },
          {
            "case": "camel",
            "target": "**/hooks/**",
            "patterns": "^use"
          },
          {
            "case": "camel",
            "target": "**/providers/**",
            "patterns": "^[a-zA-Z]*Provider"
          }
        ]
      }
    ]
  }
}
```