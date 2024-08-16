---
title: "React TypeScript와 Jest를 위한 테스트 환경 설정하기"
description: ""
coverImage: "/assets/img/2024-05-12-SetupTestingEnvironmentforReactTypeScriptwithJest_0.png"
date: 2024-05-12 20:55
ogImage: 
  url: /assets/img/2024-05-12-SetupTestingEnvironmentforReactTypeScriptwithJest_0.png
tag: Tech
originalTitle: "Setup Testing Environment for React TypeScript with Jest !"
link: "https://medium.com/@maous/setup-testing-environment-for-react-typescript-with-jest-1f5eb453aa2"
isUpdated: true
---




![image](/assets/img/2024-05-12-SetupTestingEnvironmentforReactTypeScriptwithJest_0.png)

자동화된 테스트는 코딩 퍼즐에서 매우 중요한 부분입니다. 이 글에서는 React/TypeScript 앱을 @testing-library/react + jest로 테스트하는 환경을 설정하는 방법을 알려드릴 거에요. 이렇게 함으로써 코드/제품의 품질을 최대화할 수 있어요! 그런데 한 가지 주의할 점은, 이 글에서는 자동화된 테스팅의 "무엇"에 대해서는 다루지 않아요!

먼저, 왜 자동화된 테스트를 해야 할까요? 마우스와 키보드로 앱을 테스트하면 안 되나요?

그렇게 하면 안 돼요. 자기 자신의 이익을 위해 해야 합니다. 가장 극단적인 예로, 수천 명의 가상 사용자가 웹 애플리케이션과 상호작용하는 것을 모방하여 애플리케이션이 어떻게 동작하는지 확인할 수 있는데, 이러한 동작을 수동 테스트로 시뮬레이션하는 것은 불가능해요. 이런 기능은 개발자들에게 많은 시간을 절약시켜 줘요!



이 설정에 필요한 패키지는 무엇인가요?

먼저 jest, @types/jest, ts-jest를 설치해야 합니다:

```js
yarn add --dev jest @types/jest ts-jest
```

```js
npm install --save-dev jest @types/jest ts-jest
```



리액트와 타입스크립트가 모두 설치되어 있다고 가정하고

이제 환경을 설정해 봅시다!

위의 패키지를 설치한 후에 jest 구성 파일을 초기화해 봅시다:

jest.config.js 파일이 생성될 것입니다.



테스트 폴더 및 목 모듈 생성:

프로젝트 루트 디렉토리로 이동한 다음, 해당 디렉토리 내에 테스트 폴더를 만들어 목 폴더를 만듭니다:

```js
├── tests
│   ├── components
│   ├── mocks
│   │   ├── fileMock.ts
│   │   └── styleMock.ts
│   ├── pages
│   │   └── login.test.tsx
│   └── setupTests.ts
├── tsconfig.json
├── webpack.config.ts
├── jest.config.ts
└── yarn.lock
```

이 트리를 보면, 모델, 서비스, 자산 등에 대한 목 모듈도 생성해야 합니다!



3. 설정 파일 완성하기:

jest.config 파일을 마무리하려면 몇 가지 속성을 더 추가해야 합니다:

그리고 더 매끄럽게 리액트와 함께 작동하도록 하려면 .babelrc (바벨 구성 파일)에서 다음을 추가하세요:

```js
{
....
"presets": [
     "@babel/env",
     ["@babel/preset-react", { "runtime": "automatic" }],
     "@babel/preset-typescript"
   ]
}
```



4. 리액트를 위한 테스팅 라이브러리 설치 :

이제, 일어나게 만들어줄 라이브러리들을 추가해야 합니다 (VDOM 액세스, 상호 작용 등), 이 라이브러리들은 "@testing-library/dom", "@testing-library/jest-dom", "@testing-library/react", 그리고 "@testing-library/user-event" 입니다.

```js
yarn add --dev @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

```js
npm install -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```



5. package.json에 jest 추가해 주세요:

```js
"scripts": {
    ...
    "test": "cross-env NODE_ENV=test jest tests/"
}
```

6. 코드를 테스트해 보세요:

다음은 로그인 페이지를 테스트하는 예시입니다:



![이미지](/assets/img/2024-05-12-SetupTestingEnvironmentforReactTypeScriptwithJest_1.png)

결론:

찾으시던 정보를 얻으셨길 바라요! 만일 제가 실수한 부분이 있으면 얼마든지 알려주세요!