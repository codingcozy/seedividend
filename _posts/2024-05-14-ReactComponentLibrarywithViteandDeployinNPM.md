---
title: "Vite와 함께 React 컴포넌트 라이브러리 만들기 그리고 NPM에 배포하기"
description: ""
coverImage: "/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_0.png"
date: 2024-05-14 11:28
ogImage: 
  url: /assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_0.png
tag: Tech
originalTitle: "React Component Library with Vite and Deploy in NPM"
link: "https://medium.com/wesionary-team/react-component-library-with-vite-and-deploy-in-npm-579c2880d6ff"
---


![ReactComponentTutorial](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_0.png)

안녕하세요! 이 튜토리얼은 React 및 Vite를 사용하여 TypeScript 템플릿으로 React 컴포넌트를 빌드하고, 그것을 NPM에 게시하는 방법을 안내하기 위해 만들어졌어요. 이 빌드 패키지는 다른 React 애플리케이션에서도 재사용할 수 있어요. 저희는 빌드 도구 및 로컬 개발 환경으로 Vite를 사용할 거예요. 로컬 개발 환경으로 storybook을 사용할 수도 있지만, 간단함을 위해 vite를 사용할 거에요.

# 준비물

- Git이 설치되어 있어야 해요.
- NodeJs와 NPM이 설치되어 있어야 해요.
- NPM 계정이 있어야 해요. 계정이 없다면, NPM 계정을 만들어 주세요.



# 초기 설정 및 컴포넌트 라이브러리 생성

## 단계 1: Vite를 사용하여 React 프로젝트 생성하기

Vite를 사용하여 TypeScript 템플릿을 갖춘 React 프로젝트를 생성해보세요. 아래 명령어를 사용하여 React 프로젝트를 생성할 수 있습니다.

```js
npm init vite@latest react-vite-library -- --template react-ts
```



프레임워크를 선택하라는 안내가 있을 것입니다.

![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_1.png)

React를 선택하고 입력하라고 하면

![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_2.png)



TypeScript 변형을 선택하고 입력하세요. TypeScript로 만들어진 React 프로젝트가 생성됩니다.

## 단계 2: Prettier와 ESLint 구성

Prettier와 ESLint를 구성하는 이유는 프로그래밍 및 스타일 오류에 대한 일련의 규칙에 대해 분석하여 소스 코드를 평가하고 디버깅하는 데 도움이 되기 때문입니다. 이를 통해 개발자가 코드를 실행하기 전에 오류를 찾을 수 있습니다. 규칙은 또한 최상의 코드 표준과 관행을 시행하며, 더 좋은 코드 품질, 더 가독성이 좋고 유지보수하기 쉬운 코드를 제공합니다.

프로젝트에 ESLint를 설치해 봅시다.



```js
yarn global add eslint // 전역에 설치합니다
yarn add -D eslint  // 이 명령어는 package.json의 devDependencies에 eslint를 추가합니다
```

eslint를 설치한 후, eslint --init을 실행하여 프로젝트에서 eslint를 구성하세요. 그럼 질문이 나올 텐데, 주어진 옵션을 선택하고 eslint가 프로젝트에 구성될 때까지 계속 입력하세요.

<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_3.png" />

프로젝트용 모듈 유형을 선택하고 입력하세요.




![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_4.png)

React 프레임워크를 선택하고 입력해주세요.

![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_5.png)

프로젝트는 TypeScript를 사용하므로 '예'를 선택하고 입력해주세요.



<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_6.png" />

JSON을 선택하고 입력하세요

<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_7.png" />

마지막 단계에서 패키지를 설치하라는 메시지가 표시됩니다. 이때 yes를 선택하면 npm이 패키지를 설치해 줍니다. 만약 yarn을 사용 중이라면 no를 선택하고 yarn을 사용하여 패키지를 설치할 수 있습니다.



md
![React Component Library with Vite and Deploy in NPM](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_8.png)

프로젝트 루트에 .eslintc.json 파일이 생성됩니다. 이 파일에는 기본 구성이 포함되어 있습니다. 필요에 따라 규칙을 추가할 수 있습니다. 아래의 구성을 직접 사용할 수도 있습니다: .eslintc.json.

위 구성에는 prettier, react-hooks 및 simple-import-sort가 포함되어 있습니다. 다음 명령어를 사용하여 패키지를 설치할 수 있습니다.

```js
yarn add -D react-hooks eslint-plugin-simple-import-sort prettier

npm install -D react-hooks eslint-plugin-simple-import-sort prettier
``` 




프로젝트 루트에 .prettierrc 파일을 만들고 다음 코드를 포함하세요. 이 코드는 코드를 서식 맞추는 데 사용됩니다.

package.json에 다음 스크립트를 추가하세요.

```js
"lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
"lint:fix": "eslint --fix 'src/**/*.{jsx,ts,tsx}'",
"format": "prettier --write src//**/*.{ts,tsx,css} --config ./.prettierrc",
```

## 단계 3: husky 및 lint-staged 구성하기



Git 훅은 git 실행 중 특정 시점에서 액션을 트리거할 수 있게 해줍니다. 코드베이스를 깨끗하게 유지하는 데 중요한 역할을 합니다. 코드 형식을 확인하거나 린트를 실행하거나 코드가 커밋되거나 원격 저장소로 푸시되기 전에 테스트를 실행하는 등의 작업을 수행할 수 있습니다. Husky를 사용하면 git 훅을 더 쉽게 사용할 수 있습니다. 이 프로젝트에서는 pre-commit 훅만 사용하며 lint-staged 패키지를 사용하여 git 훅을 staged 파일에만 적용합니다.

```js
npm install husky --save-dev
yarn add -D husky
```

package.json에 다음 스크립트를 추가하고 yarn prepare를 실행합니다. 스크립트를 실행한 후 프로젝트 루트에 .husky 폴더가 생성됩니다.

```js
"prepare": "husky install"
```



그런 다음 다음 명령을 실행하여 pre-commit 훅을 추가합니다.

```js
npx husky add .husky/pre-commit "yarn lint-staged"
git add .husky/pre-commit
```

이제 아래 내용으로 package.json 파일을 업데이트하십시오.

프로젝트에 Husky와 lint-staged가 성공적으로 추가되었습니다.



## 단계 4: 라이브러리에 포함시킬 컴포넌트들 생성하기

src/components 폴더 안에 컴포넌트들을 생성하세요.

- src/components/HelloWorld.tsx
- src/components/style.css



src/components/index.ts: 이 파일은 모든 것이 이 한 파일에서 내보내어지는 컴포넌트의 주 진입점입니다.

## 단계 5: vite.config.ts 설정

컴포넌트 라이브러리의 빌드 버전을 생성하기 위해 vite.config.ts 파일을 구성해야 합니다.

- 에디터에서 /vite.config.js를 열고 다음을 붙여넣으세요:



2. linterPlugin은 프로젝트의 린트를 확인하는 데 사용됩니다. dts은 구성 요소 라이브러리에서 사용되는 유형 정의를 생성하는 데 사용됩니다. dts 내부에는 구성 요소가 포함된 폴더의 위치가 포함되어 있습니다.

3. name: `ReactViteLibrary`를 귀하의 구성 요소의 이름으로 교체하는지 확인하십시오.

4. 마찬가지로, fileName 값의 react-vite-library가 귀하의 구성 요소의 이름으로 변경되었는지 확인하십시오.

5. entry: resolve("src","component.index.ts")를 귀하의 구성 요소에서 모든 것이 내보내지는 주 파일의 경로로 대체하십시오. 이는 귀하의 구성 요소의 주 진입점입니다.



6. `rollupOptions`은 직접적으로 기존의 Rollup 번들을 사용자 정의할 수 있습니다. 이는 Rollup 구성 파일에서 내보낼 수 있는 옵션들과 동일하며, Vite의 내부 Rollup 옵션과 병합됩니다.

## 단계 6: tsConfig.json 및 tsConfig.node.json 구성하기

tsConfig.json에 다음 코드를 포함하세요.

위의 예시에서, `react-vite-library: ["src","component.index.ts"]`는 `componentLibraryName: main entry file 위치`를 나타내며, `typeRoots`는 빌드 요소에 포함될 유형을 나타냅니다.



tsConfig.node.json에 다음 코드를 포함하세요.

## 단계 7: package.json 구성

다음 내용으로 package.json을 업데이트하세요.

- react-vite-library의 모든 인스턴스를 귀하의 컴포넌트/패키지 이름으로 바꿉니다. 다른 npm 패키지에서 이미 존재하지 않아야 합니다. 이 이름은 사용자가 프로젝트에 귀하의 컴포넌트를 설치하는 데 입력할 것이기 때문에 예를 들어: npm install my-component. 해당 이름이 이미 사용 중인지 npm 웹 사이트에서 검색하여 확인할 수 있습니다.
- description, author 및 keywords에 자체 값 추가
- 라이선스를 선호하는 대로 변경
- React를 개발 종속성으로 설치하세요. 리액트 앱은 귀하의 컴포넌트 패키지에 대한 React 제품 의존성을 책임지기 때문에 프로덕션 종속성으로 설치하지 않습니다.
- repository, bugs 및 homepage에 자체 GitHub 저장소 링크를 추가하세요



## 단계 8: 빌드

만약 yarn build를 실행하면, 프로젝트 루트에 dist 폴더가 생성됩니다. 이 폴더 안에는 4단계에서 빌드한 컴포넌트들이 포함되어 있습니다.

# 버전 태그 생성

빌드한 패키지를 릴리스하기 위해 버전 태그를 생성해야 합니다. package.json 파일에서 버전 태그를 간단하게 편집할 수 있습니다. 여기서는 버전을 개발하기 위해 GitHub 액션을 사용할 것입니다.



- GitHub 저장소로 이동해서 액션을 클릭해주세요

![액션 클릭](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_9.png)

2. 직접 workflow를 설정하고 아래 코드를 복사하여 붙여넣기해주세요

버전 태그를 생성하기 위해 이 액션을 패치해야 합니다. 이를 위해 액션으로 이동해야 합니다.



- 버전을 생성하는 GitHub 액션을 선택하고 아래에 표시된 "Run workflow"를 클릭하세요:

![GitHub 액션](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_10.png)

2. GitHub 액션이 완료되면 버전 태그를 받게 됩니다.

![버전 태그](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_11.png)



# NPM에 발행하기

컴포넌트 라이브러리를 NPM에 발행하려면 NPM 계정이 있어야 합니다. 계정이 없다면 NPM에 발행하기 전에 먼저 계정을 만들어주세요. NPM에 컴포넌트 라이브러리를 발행하는 방법은 두 가지가 있습니다: NPM 명령줄을 사용하여 직접 발행하거나 GitHub 작업을 사용해 발행합니다.

명령줄 도구를 사용하여 발행하기

단계 1: 먼저 package.json 파일의 버전 번호가 올바른지이며, 의미론적 버전 규칙을 준수하는지 확인하세요. 각 새로운 버전 번호로 NPM에 발행할 때마다 이 작업을 수행해야 합니다.



단계 2: 테스트를 작성했다면, 테스트 및 린트 규칙을 모두 통과하는지 확인하세요.

```js
yarn run test
yarn run lint
```

단계 3: 컴포넌트를 빌드하려면 `yarn build`를 실행하세요. UMD 및 ESM 모듈 형식이 생성되고 `/dist` 폴더에 배치됩니다.

단계 4: npm에 로그인되어 있는지 확인하세요. 그렇지 않은 경우 다음을 입력하세요:



```js
npm login
```

단계 5: 컴포넌트를 게시합니다

```js
npm publish
```

GitHub 작업을 사용하여 게시하기



단계 1: GitHub 리포지토리로 이동하여 Actions를 클릭하세요.

단계 2: 새 워크플로우를 클릭하세요.

![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_12.png)

단계 3: 직접 워크플로우를 설정하기를 클릭하세요.



![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_13.png)

단계 4: 다음 코드를 복사하여 GitHub 작업을 생성합니다.

단계 4: GitHub 작업 위에 secrets.NPM_TOKEN이 있습니다. 따라서 NPM에서 액세스 토큰을 생성해야 합니다.

- https://www.npmjs.com/으로 이동하여 계정에 로그인합니다. 프로필 아이콘을 클릭하면 다음 드롭다운 메뉴가 표시되며, 액세스를 선택합니다.



![새 토큰 생성하기](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_14.png)

2. 새 토큰을 생성하세요

![정보 작성 및 액세스 토큰 생성](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_15.png)

3. 정보를 작성하고 액세스 토큰을 생성하세요



<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_16.png" />

4. 방금 생성한 액세스 토큰을 복사한 후 깃허브 리포지토리 설정으로 이동하십시오. 그리고 새 리포지토리 시크릿을 클릭하세요.

<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_17.png" />

5. 액세스 토큰을 붙여넣고 시크릿을 추가하세요.



<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_18.png" />

비밀 키를 리포지토리에 성공적으로 추가했습니다.

단계 5: 이제 '새 릴리스 만들기'를 클릭하여 릴리스를 생성하세요.

<img src="/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_19.png" />



단계 6: 버전 태그를 선택하고 정보를 입력한 후 '릴리스 게시'를 클릭하세요.

![Image](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_20.png)

단계 7: 게시를 클릭한 후에는 만든 GitHub 작업이 실행됩니다. "액션"으로 이동하여 확인할 수 있습니다.

![Image](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_21.png)



8단계: 패키지가 성공적으로 게시되었습니다. NPM 계정으로 이동하여 확인해주세요.

![이미지](/assets/img/2024-05-14-ReactComponentLibrarywithViteandDeployinNPM_22.png)

# 결론

React 컴포넌트 라이브러리를 성공적으로 만들었고 NPM에 게시했습니다. 이제 할 일 중 하나는 테스트 애플리케이션을 만들고 NPM에서 컴포넌트를 설치하는 것입니다. 그런 다음 의도한 대로 작동하는지 확인할 수 있습니다.



# 보너스

저는 이 간단한 방법을 사용하여 구축한 또 다른 컴포넌트 라이브러리가 있습니다. 해당 라이브러리를 사용하면 하나의 패키지로 다른 종류의 모달을 사용할 수 있습니다. https://www.npmjs.com/package/react-global-modal

코딩 즐기세요. 👨🏻‍💻