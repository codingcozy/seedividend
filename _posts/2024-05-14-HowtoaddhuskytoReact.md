---
title: "React에 Husky를 추가하는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtoaddhuskytoReact_0.png"
date: 2024-05-14 10:22
ogImage: 
  url: /assets/img/2024-05-14-HowtoaddhuskytoReact_0.png
tag: Tech
originalTitle: "How to add husky to React"
link: "https://medium.com/@mariokandut/how-to-add-husky-to-react-233f0ca48752"
isUpdated: true
---




## Husky를 사용하여 오류를 줄이고 일관된 코드베이스를 유지하세요

이 스토리는 원래 이곳에서 발행되었습니다.

Husky는 현대적인 네이티브 Git 훅을 React 프로젝트에서 쉽게 사용할 수 있게 해줍니다. 커밋 메시지의 린트, 테스트 실행, 코드 린팅 등 커밋하거나 푸시할 때 수행할 수 있습니다.

그렇다면 Git 훅은 무엇이며 어떻게 프로젝트에 Husky를 추가할 수 있을까요?



## Git 훅이란 무엇인가요?

Git 훅은 git의 실행 중 일정 시점에 실행될 수 있도록 설정할 수 있는 스크립트/프로그램입니다 (git 라이프사이클). 이러한 시점은 커밋의 다른 스테이지를 포함하며, 커밋 전(pre-commit)이나 커밋 후(post-commit)와 같은 시점이 있습니다.

Git 훅을 사용하면 npm 테스트를 커밋 전에 실행하거나 eslint 오류 및 경고를 피하기 위해 eslint를 실행하는 것과 같이 다른 스크립트를 자동화하여 작업을 실행하여 개발자가 표준을 강제할 수 있습니다.

Husky는 모든 Git 훅을 지원합니다. 제공되는 모든 Git 훅 목록은 여기에서 확인할 수 있습니다.



# 리액트 프로젝트에 husky 추가하기

프로젝트에 husky를 설치하는 두 가지 방법이 있어요:

- 자동 (권장)
- 수동

## 자동 설치 (권장)



패키지 husky-init은 husky와 함께 프로젝트를 빠르게 설치하고 초기화하는 데 사용됩니다.

프로젝트 루트에서 husky를 설치하려면 다음 명령어를 입력하세요 (사용 중인 패키지 매니저에 따라 달라집니다).

중요: package.json이 하위 디렉토리에 있는 경우 husky와 함께 사용자 정의 디렉토리를 설정하는 방법을 확인하세요.

```bash
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
```



이 스크립트를 성공적으로 실행한 후 몇 가지 일이 발생했습니다:

- 프로젝트 루트에 .husky라는 폴더가 추가되었습니다. 이 폴더에는 pre-commit이라는 파일이 포함되어 있습니다. 이 파일은 초기 pre-commit 후크입니다. 또한 자동으로 생성된 husky를 위한 셸 스크립트가 있는 _라는 폴더도 있습니다. (이것을 커밋하지 마세요, .gitignore를 참조하세요)
- package.json이 수정되었습니다. prepare 스크립트가 추가되었고 husky가 devDependency로 추가되었습니다.
- 그리고 package-lock.json이 업데이트되었습니다.

이제 React 프로젝트에서 husky를 사용할 준비가 되었습니다. 😀

## 수동 설치



세 개 단계, 그러나 결과물은 자동 설치와 동일해야 합니다.

- Husky 설치하기

```js
npm install husky --save-dev
```

- Git 훅 활성화하기



```js
npx husky install
```

- 설치 후 자동으로 Git 훅을 활성화하려면 package.json을 편집하세요.

```js
npm pkg set scripts.prepare="husky install"
```

## 훅 사용하기



성공적인 설치 후에는 이미 pre-commit 훅이 설치되어 있어야 합니다.

생성된 pre-commit 훅의 내용은 다음과 같습니다:

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

이는 매 commit 전에 npm test 스크립트가 실행된다는 것을 의미합니다. 테스트가 실패하면 오류가 발생하고, 테스트를 수정하지 않는 이상 commit할 수 없습니다. 이미 작은 규모의 프로젝트에서도 이것이 얼마나 유용한지 알 수 있을 것 같습니다.



## 훅 생성

훅에 명령을 추가하거나 새 훅을 만드는 구문은 다음과 같습니다:

```js
husky add <file> [cmd]
```

예를 들어, pre-commit 훅에서 npm test 이후 ng lint를 실행하려면 다음과 같이 합니다.



```js
husky add .husky/pre-commit ng lint
```

프리 커밋 후크가 업데이트되었습니다:

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
ng lint
```

🌟축하합니다🌟 React 프로젝트에 husky가 성공적으로 설치되었고 설정되었습니다.



## TL;DR

- Husky는 git 훅을 쉽게 사용하여 git 라이프사이클 이벤트에서 스크립트를 자동으로 실행하는 도구입니다.
- 예를 들어: 코드를 커밋하기 전에 npm 스크립트를 실행하려면 pre-commit 훅을 사용하세요.

읽어 주셔서 감사합니다. 궁금한 점이 있으시면 댓글 기능을 사용하거나 @mariokandut으로 메시지를 보내주세요. React에 대해 더 알고 싶다면 React 튜토리얼을 확인해보세요.

참고문헌 (그리고 큰 감사): Git hooks, React, Husky, NPM — husky