---
title: "React TypeScript로 npm 패키지 생성하고 배포하는 방법 데모 및 자동 빌드 포함"
description: ""
coverImage: "/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_0.png"
date: 2024-05-12 22:36
ogImage: 
  url: /assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_0.png
tag: Tech
originalTitle: "How to Create and Publish React TypeScript npm Package With Demo and Automated Build"
link: "https://medium.com/better-programming/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca"
isUpdated: true
---




## 제로부터 놀라운 프로젝트를 만드는 법을 배워보세요

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_0.png)

# 소개

npm 패키지를 발행하는 데 대해 더 많은 기사를 쓰기로 결정한 이유는 무엇일까요? 제가 스스로 이러한 패키지를 만들어야 할 때, 인터넷의 대부분의 지침이 오래되었거나 제품 제작에 거의 도움이 되지 않는 매우 짧았기 때문입니다.



모든 단계를 가능한 명확하게 설명하고자 노력하겠습니다. 그래서 여러분도 처음부터 직접 프로젝트를 만들어보실 수 있을 거에요. 시작해 봐요!

간단한 React 애플리케이션을 만드는 것을 제안합니다. 두 개의 버튼으로 이루어진 카운터 값을 증가시키거나 감소시키는 애플리케이션입니다.

우리 애플리케이션은 이렇게 생겼을 거에요:

데모: [링크](https://gapon2401.github.io/my-react-typescript-package/)
저장소: [링크](https://github.com/gapon2401/my-react-typescript-package)



우리는 모든 것을 다루는 14단계가 있어요:

- 프로젝트 준비하기
- React 애플리케이션 만들기
- Git 구성하기
- ESLint 구성하기
- Prettier 구성하기
- Jest로 테스트 추가하기
- package.json 구성하고 발행 준비하기
- 코드를 커밋하고 푸시하기
- NPM에 발행하기
- 예제 폴더 생성하기
- 자동 빌드 설정하기
- 데모 페이지
- README.md 파일과 shields.io
- 릴리스 만들기

# 단계 1. 프로젝트 준비

- 프로젝트의 명령줄에서 다음을 실행하세요:



```js
npm init -y
```

이 명령어를 실행하면 기본 값으로 package.json 파일이 생성되고, 나중에 필요에 따라 수정할 수 있습니다.

- src 폴더를 생성하세요.

이 폴더에 모든 프로젝트 파일을 보관할 예정입니다.



프로젝트에 React와 TypeScript를 추가해 보겠어요 (만약 상관 없다면 yarn을 사용할 거에요)

```js
yarn add -D react react-dom typescript @types/react
```

이제 node_modules 폴더와 yarn.lock 파일이 생성되었어요 — 꽤 좋죠!

- TypeScript를 컴파일하기 위해 프로젝트 루트에 다음 내용을 가진 tsconfig.json 파일을 생성하세요:



위의 내용을 참조하시면 가능한 모든 속성을 확인할 수 있어요: https://www.typescriptlang.org/tsconfig

주요 내용:

- rootDir — 소스 파일 내에서의 루트 폴더

- include— TypeScript 프로젝트에 포함될 파일을 지정



- exclude — TypeScript 프로젝트에서 제외할 파일을 지정합니다. dist 폴더와 모든 node_modules를 포함하고 싶지 않습니다.

- outDir — 이것은 컴파일된 출력물의 위치입니다.

- 빈 README.md 및 LICENSE 파일을 생성합니다.

어떤 라이센스를 사용할지는 당신에게 달려있습니다. 저는 MIT를 사용할 것입니다. 해당 파일의 내용을 확인할 수 있습니다.



위에 있는 내용을 마크다운 형식으로 바꿔보세요:

![structure](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_1.png)

## 단계 2. React 애플리케이션 만들기

src 폴더 안에 components 폴더를 만들어주세요. 여기에 프로젝트의 모든 컴포넌트를 보관할 수 있습니다. 이 글에서는 여기에 App.tsx라는 파일 하나만 만들어보겠습니다. 파일에는 아래 내용을 넣어주세요:



저희의 React 애플리케이션이에요.

이제 src 폴더 안에 index.ts 파일을 만들어주세요. 모듈을 내보내세요.

프로젝트를 컴파일할 시간이에요!

package.json을 열어서 scripts 섹션을 변경해봐요:



터미널에서 다음 명령을 실행하세요:

```js
yarn build
```

모든 컴파일된 코드와 함께 dist 폴더가 나타날 것입니다.

축하합니다! 컴파일된 애플리케이션을 생성했습니다. 조금 더 나가야 할 과정이 남았습니다! (아마도.)



위에서 언급한 단계 2 이후의 프로젝트 구조를 비교해보세요:

![프로젝트 구조](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_2.png)

## 단계 3. git 설정하기

프로젝트를 빠르게 만들었으니 이제 git을 설정할 시간입니다.



프로젝트 루트에서 다음 명령어로 git을 초기화하세요:

```js
git init
```

프로젝트 루트에 다음 내용을 가진 .gitignore 파일을 생성하세요:

```js
node_modules
.idea
dist
yarn-error.log
```



Jetbrains IDE를 사용하여 개발을 도와주기 때문에 .idea를 추가했어요.

.gitignore 파일에는 리포지토리에 포함하고 싶지 않은 파일과 디렉터리를 나열합니다.

GitHub에서 git repo를 만드세요. 나중에 초기 커밋을 만들고 원격 git을 로컬 git에 연결할 거에요.

# 단계 4. ESLint 구성



ESLint은 코드를 정적으로 분석하여 빠르게 문제를 찾아줍니다. 우리는 개발 시에만 필요합니다.

다음 코드로 eslint와 모든 필요한 구성 요소를 추가해주세요:

```js
yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

원하는 대로 구성할 수 있으며, 자세한 사용자 가이드는 여기에 있어요: https://eslint.org/docs/user-guide/configuring/



프로젝트의 루트에 .eslintrc 파일을 만드는 것을 제안합니다:

.eslintignore 파일을 추가하세요:

```js
node_modules
dist
```

우리는 컴파일된 파일이 위치한 dist 폴더와 node_modules를 체크하지 않도록 무시할 것입니다.



테이블 태그를 마크다운 형식으로 변경해 주세요.



```js
yarn lint
```

에러가 없어야 해요. 

스텝 4 이후 프로젝트 구조를 비교해보세요:

![프로젝트 구조 비교](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_3.png)



# 단계 5. Prettier 구성

Prettier는 코드 포매터입니다. 팀으로 작업할 때 사용하면 모두의 코드가 동일한 표준을 준수하게 됩니다.

터미널에서 다음 명령을 실행해주세요:

```js
yarn add -D eslint-config-prettier eslint-plugin-prettier prettier
```



프로젝트 루트에서 .prettierrc.json 파일을 만들어주세요:

모든 옵션에 대해 더 알아보려면 여기를 확인해주세요: https://prettier.io/docs/en/options.html.

.eslintrc에 prettier 플러그인을 추가해주세요:

prettier 설정이 완료되었습니다! 이제 yarn lint를 실행하여 포맷 에러를 확인해보세요. 에러가 없다면, 인간인지 확인해보세요 😆.



<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_4.png" />

이제 그것들을 수정해 봅시다! package.json에 다음을 추가하세요:

```js
"prettier": "prettier --write \"{src,tests,example/src}/**/*.{js,ts,jsx,tsx}\""
```

좋아요, yarn prettier를 실행하면 다음과 유사한 결과를 얻을 수 있습니다:




![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_5.png)

이제 yarn lint를 실행한 후에는 오류가 없어야 합니다. src/components/App.tsx 및 src/index.ts 파일을 확인해보세요. 변경되었습니다.

package.json의 scripts 섹션:

```js
"scripts": {
  "build": "tsc",
  "lint": "eslint \"{**/*,*}.{js,ts,jsx,tsx}\"",
  "prettier": "prettier --write \"{src,tests,example/src}/**/*.{js,ts,jsx,tsx}\""
}
``` 



Step 5 이후 프로젝트 구조를 비교해보세요:

![프로젝트 구조](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_6.png)

## 단계 6. Jest를 사용한 테스트 추가

테스트를 만들기 위해 저는 Jest 라이브러리를 사용하고 있어요. Jest는 꽤 유용하고 강력한 테스트 프레임워크에요. 얼마나 어려운 테스트를 작성할지는 당신에게 달렸어요.



프로젝트에 jest를 추가해주세요:

```js
yarn add -D jest jest-canvas-mock jest-environment-jsdom ts-jest @types/jest @testing-library/react
```

프로젝트 루트 파일 jestconfig.json을 생성해주세요.

폴더 tests를 만들어주세요.



첫 번째 테스트를 작성하는 시간입니다. 우리는 매우 간단한 테스트를 작성할 것인데, 렌더링이 성공적으로 이루어졌는지 확인할 것입니다.

tests 폴더 안에 common.test.tsx 파일을 만들어주세요.

package.json 파일의 scripts 섹션을 변경해주세요:

```js
"test": "jest --config jestconfig.json"
```



yarn test 명령을 실행해보세요. 테스트가 통과해야 합니다:

![프로젝트 구조 비교 후 이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_7.png)

스텝 6 이후의 프로젝트 구조를 비교해보세요:

![스텝 6 이후 프로젝트 구조 이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_8.png)



# 단계 7. package.json 구성 및 발행 준비

저는 빌드를 분리하는 것을 제안합니다. 우리는 패키지를 가능한 한 접근하기 쉽게 만들기 위해 ECMAScript 모듈뿐만 아니라 CommonJs 모듈도 컴파일할 것입니다.

package.json 파일에서 다음을 대체하세요:

```json
"build": "tsc",
```



다음 코드를 사용하여

```js
"build": "yarn build:esm && yarn build:cjs",
"build:esm": "tsc",
"build:cjs": "tsc --module commonjs --outDir dist/cjs",
```

build:esm과 build:cjs를 추가하고 이를 하나의 명령어로 결합했습니다.

yarn build를 실행하면, 이제 dist/ 폴더에 cjs 폴더가 생성된 것을 확인할 수 있습니다.



더 나아가보세요.

package.json 파일에서는 패키지가 게시될 때 자동으로 호출되는 매직 스크립트를 사용할 수 있습니다. 이러한 스크립트를 사용하면 패키지를 모든 종류의 오류로부터 확인하고 실수로 업데이트를 업로드하여 패키지가 사용되는 수백 만 프로젝트를 충돌시키지 않도록 도와줍니다!

- prepare — 패키지가 패킹되고 게시되기 전에 실행됩니다. 인수 없이 로컬 npm install에서 실행됩니다.
- prepublishOnly — 패키지가 준비되고 패킹되기 전에 실행됩니다. npm publish에서만 실행됩니다. 여기에는 테스트가 들어갑니다.

다음을 스크립트 섹션에 추가하세요:



```json
"scripts": {
  "prepare": "npm run build",
  "prepublishOnly": "npm test && npm run prettier && npm run lint"
},
"main": "dist/index.js",
"types": "dist/index.d.ts"
```



```js
"main": "index.js",
```

다음과 같이 변경해주세요:

```js
"main": "./dist/cjs/index.js",
"module": "./dist/esm/index.js",
"types": "./dist/esm/index.d.ts",
```

원격 Git 저장소에 대한 정보를 추가해주세요 (단계 3에서 제공한 Git URL을 명시해주세요):



```js
"repository": {
  "type": "git",
  "url": "git+https://github.com/gapon2401/my-react-typescript-package.git"
},
```

우리 패키지를 사용할 프로젝트는 적어도 `=16` 버전 이상의 리액트 버전을 가져야 합니다:

```js
"peerDependencies": {
  "react": ">=16"
},
```

패키지가 불필요한 파일이 없도록하려면, 허용된 파일 및 폴더만 사용하여 패키지에 추가하십시오:




```js
"files": [
  "dist",
  "LICENSE",
  "README.md"
],
```

프로젝트를 찾을 수 있도록 키워드를 추가해주세요:

```js
"keywords": [
  "react",
  "typescript",
  "awesome-project"
],
```

라이선스를 명시해주세요:



```js
"license": "MIT",
```

저자 이름 변경하는거 잊지 마세요:

```js
"author": "Igor Gaponov (gapon2401)",
```

그게 충분한 것 같아요.



README.md 파일에 설명을 추가해주세요.

현재 README 파일에는 한 줄만 있습니다. 이것이 h1 입니다:

```js
# my-react-typescript-package
```

package.json 파일의 최종 버전을 확인해보세요.



# 단계 8. 코드를 커밋하고 푸시하세요

우선, 원격 및 로컬 저장소를 연결하고 프로젝트를 푸시해 봅시다.

다음 코드를 실행해 주세요:

```js
git add .
git commit -m "Initial commit"
git remote add origin <저장소 URL>
git push -u origin master
```



본인의 `Repository Url`을 변경하는 것을 잊지 마세요. 이는 https URL이거나 ssh 일 수 있습니다. 이 URL은 레포지토리에서 얻을 수 있습니다.

다음과 같은 예시를 살펴보세요.

- HTTPS 레포지토리 URL (인증이 필요합니다)

```js
git remote add origin https://github.com/gapon2401/my-react-typescript-package.git
```



- SSH 저장소 URL (SSH 연결 구성 필요)

```js
git remote add origin git@github.com:gapon2401/my-react-typescript-package.git
```

저는 두 번째 해결책을 사용했어요.

# 단계 9. NPM에 발행



- 패키지 이름 선택하기

우리 패키지의 이름을 사용할 수 있는지 확인해야 합니다. https://www.npmjs.com/ 웹사이트로 이동하여 검색 도구를 사용해보세요.

package.json 파일에서 프로젝트의 기본 이름을 찾아 변경할 수 있습니다:

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_9.png)



나의 경우에는 my-react-typescript-package 이 있습니다. 아직 그런 패키지는 없네요.

다음과 같이 링크에 이름을 직접 삽입하여 확인하는 것이 더 좋다고 생각해요:

```js
https://www.npmjs.com/package/<당신의 패키지 이름>
```

`당신의 패키지 이름` 자리에 프로젝트의 이름을 넣어주세요.



다음 URL을 받았어요:

```js
https://www.npmjs.com/package/my-react-typescript-package
```

만약 이름이 무료하면 404 페이지가 표시됩니다:

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_10.png)



- NPM에 등록/로그인하기

프로젝트를 게시하려면 https://www.npmjs.com/에서 인증해야 합니다.

아직 계정이 없다면 https://www.npmjs.com/signup에서 등록하거나 명령줄을 사용해 주세요:

```js
npm adduser
```



사용자 이름, 비밀번호 및 이메일을 입력하라는 메시지가 표시됩니다.

이미 계정이 있는 경우에는 다음을 실행하세요:

```js
npm login
```

그리고 인증을 완료하세요.



- 배포하기

배포하기 전에 필요한 파일만 패키지에 포함되었는지, 오류가 없는지, 그리고 모든 것이 올바르게 포맷되어 있는지 확인하는 것을 추천합니다. 이를 위해 아래 명령어를 실행할 수 있습니다:

```js
npm publish --dry-run
```

패키지가 실제로 게시되지는 않을 거에요, 걱정 마세요.



"매직 스크립트인 prepublishOnly가 호출되어 테스트 및 코드 형식 지정이 실행됨을 확인하게 될 거에요.

그런 다음 프로젝트에 포함된 모든 파일 목록을 볼 수 있게 되며:

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_11.png)

Tarball 콘텐츠에는 package.json에서 지정된 파일 및 폴더가 포함되어 있습니다:"



```js
"files": [
   "dist",
   "LICENSE",
   "README.md"
 ],
```

모든 준비가 끝났어요! 이제 패키지를 게시하면 돼요!

다음 명령어를 실행해 주세요:

```js
npm publish
```



이 명령을 실행할 때마다 항상 걱정이 돼요.

명령 호출의 전체 결과를 첨부합니다:

![Command Result](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_12.png)

이제 축하해요! 패키지가 발행되었어요. 공개되었고, 누구든 사용할 수 있어요! 생각보다 어렵지 않았죠.



NPM에서 해당 패키지를 확인해보세요.

이전에 열었던 링크를 열어보세요.

```js
https://www.npmjs.com/package/<당신의 패키지 이름>
```

<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_13.png" />



잘 보이네요!

# 단계 10. 예제 폴더 만들기

우리 패키지를 계속 발전시키는 재미를 느껴봐요. 이번 단계에서는 패키지를 어떻게 활용할 수 있는지 보여줄 예제 폴더를 만들 것입니다. 이 폴더에서는 서버를 빠르게 시작하고 코드를 테스트할 수 있어요. 
애플리케이션을 빠르게 실행하려면 https://parceljs.org/를 사용할 거에요.

`example`라는 폴더를 생성하세요.



해당 폴더 안에 비어 있는 src 폴더와 파일을 만들어주세요:

- .gitignore:

```js
node_modules
yarn.lock
.parcel-cache
dist
yarn-error.log
```

- package.json:



- README.md:

자, 지금 주의를 기울여봐! 프로젝트의 루트 디렉토리에서 명령줄을 열고 예제 폴더로 이동해봐:

```js
cd example
```

그리고 실행해봐:



```js
yarn add -D parcel my-react-typescript-package react react-dom @types/react-dom @types/react
```

src 폴더 안에 index.html 파일을 만듭니다.

이제, 우리 패키지를 가져와서 사용하는 예제를 작성해야 합니다.

src 폴더 안에 index.tsx 파일을 만듭니다.



서버를 실행할 시간입니다! 아래 명령어를 사용해주세요:

```js
yarn start
```

서버가 성공적으로 실행되면 다음 메시지가 표시됩니다:

<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_14.png" />



아래의 예시를 확인하려면 http://localhost:1234 링크를 열어보세요:

![예시 이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_15.png)

모든 설치와 서버 실행 후의 예시 폴더 구조를 비교해보세요. 아래와 같은 모양이어야 합니다:

![예시 이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_16.png)



# 단계 11. 자동 빌드 설정하기

자동 빌드에 대해 이야기해보겠습니다. 변경 사항을 git에 푸시하고 각 릴리스마다 npm에 푸시해야 하는 것은 꽤 불편합니다. 이 프로세스를 GitHub Actions로 자동화할 것입니다.

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_17.png)

프로젝트 구조의 루트에 .github라는 폴더를 생성해주세요.



안녕하세요! 친절한 안내드립니다.

Markdown 형식으로 테이블 태그를 변경하고,

폴더 workflows를 만드세요.

그 안에 파일 publish.yml을 만드세요:

파일 안에는 중요한 포인트들이 주석처리되어 있습니다.

GitHub에 릴리스할 때 우리의 패키지가 자동으로 빌드되어 NPM에 푸시됩니다.



다음 라인을 확인해 주세요:

```js
# 우리 NPM 계정에 필요합니다
NODE_AUTH_TOKEN: ${ secrets.NPM_TOKEN }
```

이 방법으로 GitHub를 NPM과 연결할 예정입니다.

브라우저에서 https://www.npmjs.com/ 에서 계정을 열고 토큰이 있는 페이지로 이동해 주세요:



아래는 Markdown 형식으로 변경된 내용입니다.


![이미지1](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_18.png)

새 토큰을 생성하십시오:

![이미지2](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_19.png)

이름을 입력하고 유형을 선택하라는 메시지가 표시됩니다. Automation은 github-actions에 적합합니다.



![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_20.png)

토큰을 복사하고 Github 레포지토리를 엽니다.

탭 설정으로 이동하여 Secrets — Actions를 엽니다. 새 저장소 시크릿 변수를 만듭니다. NPM_TOKEN이라는 이름을 주고 NPM에서 받은 토큰 값을 붙여넣습니다:

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_21.png)



잘 했어요! 이제 프로젝트의 새 버전을 만들고 GitHub에 푸시하기만 남았어요.

어떤 변경 사항을 커밋하기 전에 다음 명령어를 실행하는 것을 잊지 마세요:

```js
yarn prepublishOnly
```

코드가 깔끔하게 유지될 수 있도록 확인하는 것이 좋아요.



프로젝트를 푸시한 후에 Actions 탭으로 이동하면 GitHub이 워크플로 액션을 감지했음을 알 수 있습니다. 그러나 아직 아무것도 시작되지 않았습니다. 왜냐하면 우리가 아직 릴리스를 만들지 않았기 때문입니다.)

![image](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_22.png)

# 단계 12. 데모 페이지

이미 패키지를 사용하는 예제가 있는 폴더가 있지만, 전체 프로젝트를 클론하지 않고도 사용자가 빠르게 패키지 작업을 볼 수 있도록 서로 다른 페이지를 만들고 싶습니다. 이 페이지를 만들어 봅시다!



우리는 깃허브 페이지를 사용하여 데모를 만들 거에요.

새 깃 브랜치를 만들어보세요:

```js
git checkout -b gh-pages
```

이제 프로젝트에서 모든 파일을 지우세요!



이전 파일들은 모두 안전하게 다른 master 브랜치에 보관될 거니까 걱정하지 마세요. gh-pages 브랜치는 데모용으로만 사용될 거에요. 그래서 모든 파일을 삭제해야 해요. 자, 모두 삭제해주세요!

그런 다음 명령 줄에서 다음을 실행하세요:

```js
npm init -y
```

이 명령은 package.json 파일을 생성할 거에요. 이번에는 자세히 설정하지 않을 거에요.



데모 페이지에는 우리가 익숙한 Parcel을 사용하는 것을 제안합니다 (단계 10)

다음을 실행해보세요:

```js
yarn add -D parcel my-react-typescript-package react react-dom @types/react-dom @types/react typescript
```

`.gitignore` 파일을 생성하세요:



```js
node_modules
yarn.lock
.parcel-cache
dist
yarn-error.log
```

다음 내용을 포함한 파일 tsconfig.json을 생성하세요.

Eslint를 설정하는 단계 4를 따르세요.

빈 폴더 src를 생성하세요. 그 안에 다음 내용을 가진 파일 index.html을 생성하세요.



새로운 index.tsx 파일을 생성해주세요.

package.json 파일의 scripts 섹션에 아래 코드를 추가해주세요:

```json
"start": "parcel src/index.html",
"build": "parcel build src/index.html --dist-dir docs --public-url ."
```

제 package.json 파일을 확인해주세요.



서버를 실행하여 모든 것이 잘 작동하는지 확인하세요:

```js
yarn start 
```

이제 다음 명령어를 사용하여 오류를 확인하는 코드를 실행하세요:

```js
yarn lint
```



수정 사항 없습니다! 멋져요! 이제 페이지를 만들 차례에요.

```js
yarn build
```

데모 프로젝트의 모든 파일이 포함된 docs 폴더가 표시될 거예요.

다음은 브랜치 gh-pages의 구조입니다:



<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_23.png" />

이제 변경 사항을 모두 git에 푸시합시다. 다음을 실행하세요:

```js
git add .
git commit -m "초기 페이지 커밋"
git push -u origin gh-pages
```

GitHub 저장소를 열어서 설정으로 이동하고 페이지로 이동합니다. 소스에서 /docs를 선택한 후 Save를 누릅니다:



<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_24.png" />

약 3-5분 정도 기다리시면 지정된 URL에 사이트가 이용 가능해집니다. 페이지에 표시된 URL을 확인해보세요.

<img src="/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_25.png" />

데모 페이지 작업이 끝났습니다. 보시다시피 사용자의 취향에 맞게 원하는 대로 커스터마이즈하고 어떠한 복잡도의 페이지나 웹사이트를 만들 수 있습니다.



여기 결과가 있어요: [https://gapon2401.github.io/my-react-typescript-package/](https://gapon2401.github.io/my-react-typescript-package/)

# 단계 13. README.md 파일 및 shields.io

이제 코드 작업이 끝났으니, 이제 패키지의 설명 파일로 전환해 볼게요.

git에서 master 브랜치로 전환하고 README.md 파일을 열어주세요.



테이블 태그를 마크다운 형식으로 변경해주세요:


For the description file, we are using markdown.

In README.md, I have added a short description of the package, link to demo-page, and a usage section.

At the beginning of the readme file, I have small cute icons. This is [shields.io](https://shields.io/). It is very convenient to have them. I’ve added just a couple as an example, you can use as many as you want.



GitHub 앱lications에 shields.io를 추가해보세요.

파일 끝을 살펴보세요; 이미지와 링크가 있는 변수를 만들었습니다. Markdown을 사용하면 이러한 변수를 만들 수 있기 때문에 설명 파일이 더 정확해집니다. 저장소 경로와 패키지 이름을 변경하는 것을 잊지 마세요.

package.json에서 버전을 변경하고, 커밋하고 파일을 레포지토리에 푸시하세요. 모든 작업은 스스로 진행해주세요. 이전 단계에 이미 수행했던 것과 같은 절차입니다.

# 단계 14. 릴리스 만들기



이것이 마지막 단계입니다. 짧을 거에요.

우리가 계획했던 모든 것을 완료했어요! 이제 공식 릴리스를 GitHub에 작성하고 자동 빌드가 어떻게 작동하는지 확인할 수 있어요.

저장소의 메인 페이지로 이동해서 '새 릴리스 생성'을 클릭하세요:

![Create a new release](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_26.png)



현재 버전을 지정하는 태그를 추가하세요. 릴리스 시 자동으로 생성됩니다. 릴리스 제목과 설명을 인쇄하고 릴리스를 발행하려면 클릭하십시오.


![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_27.png)

이제 탭 "Actions"를 열고 빌드가 성공적으로 완료되었는지 확인하세요.

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_28.png)



패키지를 NPM에서 업데이트했는지 확인해 봐요.

패키지 링크를 열어 볼게요:

```js
https://www.npmjs.com/package/<패키지 이름>
```

제것을 열어 볼게요:



```js
https://www.npmjs.com/package/my-react-typescript-package
```

새 버전과 새 설명이 나와 있어요:

![이미지](/assets/img/2024-05-12-HowtoCreateandPublishReactTypeScriptnpmPackageWithDemoandAutomatedBuild_29.png)

긴 여정이었지만, 매우 유용하길 바랍니다. 처음 패키지를 게시할 때 어려웠던 모든 것을 설명하기 위해 노력했고, 이 정보들을 조각 조각 모았어요.



읽어 주셔서 감사합니다! ❤