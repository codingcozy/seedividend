---
title: "Storybook 저장소에 기여하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Code contributions"
link: "https://storybook.js.org/docs/contribute/code"
isUpdated: true
---






Storybook의 모노리포에 새 기능이나 버그 수정을 기여하세요. 이 페이지에서는 코드를 기여하기 위해 환경을 설정하는 방법을 안내합니다.

## 사전 준비 사항

- Node 버전 18이 설치되어 있는지 확인하세요 (제안: v18.16.0).
- Windows를 사용 중이라면 Windows Subsystem for Linux (WSL)을 사용하세요.

## 초기 설정



Storybook 모노 레포지토리를 포크하고 로컬로 클론하세요.

```js
git clone https://github.com/your-username/storybook.git
cd storybook
```

Storybook은 Yarn 패키지 매니저를 사용합니다. Corepack을 사용하여 Storybook과 함께 사용할 올바른 버전을 설정하세요.

```js
corepack enable
```



## 첫 번째 샌드박스 실행하기

Storybook 개발은 각각 다른 사용자 설정에 대응하는 템플릿화된 Storybook 환경인 샌드박스 세트에서 이루어집니다. 각 샌드박스 안에서는 모든 환경에서 핵심 기능과 애드온을 테스트할 수 있도록 일반화된 이야기 집합이 주입됩니다.

로컬에서 샌드박스를 실행하려면 다음 명령을 사용할 수 있습니다:

```js
yarn start
```



요구 사항을 설치하고 코드를 빌드하고 Vite React 설정을 기반으로 한 시작 예제를 만들고 연결한 다음 Storybook 서버를 시작합니다.

모든 것이 잘 진행되면 샌드박스가 실행되는 것을 볼 수 있어요.

![Codecontributions_0.png](/assets/img/Codecontributions_0.png)

## 다른 샌드박스 템플릿 실행하기



기본적으로 'start' 명령은 Vite 기반의 React 템플릿을 초기화하도록 구성되어 있습니다. 다른 렌더러에서 작업할 계획인 경우에도 동일하게 할 수 있습니다. 다음과 같이 'task' 명령을 실행하여 시작하세요:

```js
yarn task
```

알맞게 답변하여 Storybook이 귀하의 목표를 파악하도록 허용하십시오. 이러한 질문에 답변한 후에는 필요할 경우 다시 실행하려면 선택한 옵션과 함께 전체 명령이 표시되어야 합니다.

## 테스트 실행하기



첫 번째 샌드박스를 성공적으로 실행한 후에는 로컬 머신에 구축된 완전히 기능하는 Storybook 버전이 있어야 합니다. 코드 변경에 들어가기 전에 모든 것이 제대로 작동하는지 확인하는 것이 중요합니다. 특히 테스트 스위트를 확인해야 합니다.

다음 명령을 실행하여 테스트를 실행하세요:

```js
yarn test
```

## 개발을 시작하세요



이제 설정을 확인했으니 코드 작업에 들어가 봅시다. 가장 간단한 방법은 한 창에서 샌드박스를 실행하고 다른 창에서 대화형 빌드 프로세스를 실행하는 것입니다.

아마도 yarn start 명령을 실행한 후에 초기화된 Vite 기반 React 샌드박스를 실행 중이라고 가정합니다. 새로운 터미널 창을 열고 Storybook 모노레포의 코드 디렉토리로 이동한 다음 다음 명령을 실행하여 기여를 위한 새로운 브랜치를 만들어주세요:

```js
git checkout -b my-first-storybook-contribution
```

마지막으로 다음과 같이 빌드 프로세스를 실행하세요:



```js
yarn build
```

"watch" 모드에서 빌드 프로세스를 시작하라는 메시지가 나오면, 대화형 모드에서 개발하기 위해 "yes"를 선택하세요. 그 후, 어떤 패키지를 빌드할지 선택하십시오. 예를 들어, @storybook/addon-docs 기능을 개발하려면 @storybook/addon-docs와 @storybook/components 둘 다 선택하고 싶을 것입니다.

![이미지](/assets/img/Codecontributions_1.png)

작업하는 내용이 미리보기(스토리가 표시되는 가장 내부의 Storybook iframe)에 영향을 미치는 경우, 저장한 후 1~2초 후에 자동 새로고침됩니다.



그렇지 않으면(Addons이 표시되는 가장 바깥쪽 Storybook iframe에 영향을 미치면), 저장한 후 수동으로 새로 고쳐야 합니다.

![Codecontributions_2.png](/assets/img/Codecontributions_2.png)

## 작업 확인

코딩을 마치면 관련 문서와 테스트를 추가해주세요. 그렇게 하면 PR(Pull Request) 검토 과정이 간단해지고, 코드가 더 빨리 병합될 수 있습니다.



### 이야기 추가하기

당사의 스위트에 이야기 또는 범용 이야기 세트를 추가하면 작업을 테스트할 수 있습니다.

Essential 애드온 중 하나에 작업 중이라고 가정하면 완전한 이야기 세트가 이미 존재할 수 있습니다. 애드온의 template/stories 디렉토리를 확인하여 어떻게 작동해야 하는지 문서화되어 있는지 확인하고 여기에 이야기를 추가하세요.

특정 렌더러와 관련된 내용을 수정하고 있다면(예: React, Vue 3 등), 해당 렌더러와 관련된 template/stories 디렉토리도 비슷하게 있으며 이곳에 이야기를 추가해야 합니다.



### 테스트 추가하기

유닛 테스트를 통해 Storybook이 우연히 깨지지 않도록 확인할 수 있습니다. 코드가 예상치 못한 방식으로 역행할 수 있는 경우, 풀 리퀘스트에 단위 테스트를 포함시킵니다. 다음 네이밍 컨벤션을 사용하세요:

```js
+-- parentFolder
|   +-- [filename].ts
|   +-- [filename].test.ts
```

### 에드 투 엔드 테스트 (e2e)



Storybook의 monorepo는 CI 중에 Playwright를 사용한 end-to-end 테스트를 의존하도록 설정되어 있습니다. 테스트를 돕기 위해 기여를 제출하기 전에 이 테스트 스위트를 실행하는 것을 권장합니다.

샌드박스에 대한 e2e 테스트를 실행하려면 e2e-tests 작업을 사용할 수 있습니다:

```js
yarn task --task e2e-tests --template=react-vite/default-ts --start-from=auto
```

문제가 있고 디버깅을 원한다면 DEBUG=1 환경 변수를 전달하여 Playwright가 감시 모드에서 실행되도록 할 수 있습니다.



```js
DEBUG=1 yarn task --task e2e-tests --template=react-vite/default-ts --start-from=auto
```

## 풀 리퀘스트 제출하기

기여를 제출하기 전에 마지막으로 다음 명령어로 테스트 스위트를 실행해주세요:

```js
yarn test
```



이렇게 하는 것은 마지막 순간의 버그를 방지하는 것 외에도, 귀하가 풀 리퀘스트를 제출한 후 빠르게 기여물을 병합하는 좋은 방법입니다. 이를 하지 않으면 유지 보수자 중 한 명이 모든 테스트가 통과할 때까지 풀 리퀘스트에 '작업 진행 중' 레이블을 달 수 있습니다.

### 다음 브랜치 대상

테스트 스위트가 완료되면, 커밋하고 푸시하고, Storybook의 다음(기본) 브랜치에 대한 풀 리퀘스트를 오픈하세요. 이 브랜치는 모든 활발한 개발이 진행되며, 최신 프리릴리스 버전과 관련이 있습니다(예: 7.0.0-alpha.47).

귀하의 기여가 버그 수정에 초점을 맞추고 다음 안정적인 릴리스에 나타나길 원한다면, 풀 리퀘스트 설명에 언급해주세요. 발생하지 않는 변화이며 중요한 버그를 수정하는 경우에는 패치를 시도하겠습니다.



### 포크 작업 시 유용한 리소스

- 포크 동기화하기
- 상위 저장소를 포크에 병합하기

### 작업 실패를 재현하기

PR을 만든 후, CI 작업 중 하나가 실패하면 해당 작업의 로그를 확인할 때 로컬에서 작업을 재현하는 방법을 설명하는 메시지가 표시됩니다. 일반적으로 이는 작업을 올바른 템플릿에 대해 실행하는 것을 포함합니다.



```js
yarn task --task e2e-tests --template=react-vite/default-ts --start-from=install
```

일반적으로 로컬 코드가 완전히 최신 상태인지 확인하려면 설치 작업부터 시작하는 것이 좋은 아이디어입니다. 실패를 재현하면 수정을 시도해 빌드로 컴파일하고 --start-from=auto를 사용하여 작업을 다시 실행할 수 있습니다.

## 재현물과 작업 방법

버그 보고서에 재현물을 포함하는 것을 권장합니다. 단일 저장소의 예제 프로젝트에 대해 대화식으로 개발할 수 있는 것과 같이 재현 저장소에 대해 개발할 수도 있습니다.


위 작업을 수행하려면, monorepo의 루트에서 다음 명령을 실행하세요:

```js
npx storybook@next link https://github.com/your-username/your-project.git
```

이 명령은 ../storybook-repros/your-project라는 프로젝트를 생성하고, 자동적으로 로컬 Storybook 코드에 연결합니다. 연결된 이후에는 Storybook을 실행하고 위에서 언급한 대로 개발할 수 있어야 합니다.

이미 로컬 머신에 재현본이 있는 경우, --local 플래그를 사용하여 동일하게 monorepo 개발 환경에 연결할 수 있습니다:



```js
npx storybook@next link --local /path/to/local-repro-directory
```

## 템플릿 개발하기

첫 번째 단계는 모든 repro 템플릿의 마스터 목록인 code/lib/cli/src/sandbox-templates.ts에 항목을 추가하는 것입니다:

```js
'cra/default-js': {
    name: 'Create React App (Javascript)',
    script: 'npx create-react-app .',
    inDevelopment: true,
    expected: {
      framework: '@storybook/cra',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
```



프로세스를 쉽게 만들기 위해 PR이 병합될 때까지 inDevelopment 플래그를 추가해주세요 (플래그를 제거하는 두 번째 PR을 빠르게 따라올 수 있습니다). 

키 cra/default-js는 두 부분으로 구성되어 있습니다:

- 프리픽스는 재현 앱을 생성하는 데 사용된 도구입니다
- 서픽스는 기본 설치를 수정하는 옵션입니다. 예를 들어, 특정 버전이나 옵션이 포함될 수 있습니다.

스크립트 필드는 애플리케이션 환경을 생성하는 것입니다. . 인자는 "현재 작업 디렉토리"이며, 이는 키(예: repros/cra/default-js/before-storybook)를 기반으로 자동 생성됩니다. {beforeDir} 키도 사용할 수 있는데, 해당 디렉토리의 경로로 대체될 것입니다.



나머지 필드들은 쉽게 이해할 수 있어요:

skipTasks 필드는 특정 작업에서 샌드박스가 제대로 작동하지 않을 수 있기 때문에 존재합니다. 그러나 우리는 여전히 다른 작업을 실행하고 싶을 수도 있습니다. 예를 들어, 우리가 제어할 수 없는 버그가 발생하여 테스트 러너 작업에서만 실패하는 경우입니다.

name 필드에는 템플릿의 사람이 읽기 쉬운 이름/설명이 포함되어야 합니다.

expected 필드는 우리가 sb init을 통해 생성되기를 기대하는 프레임워크/렌더러/빌더를 반영합니다. 이것은 샌드박스를 생성하는 동안 단언문에 유용합니다. 예를 들어, 템플릿이 다른 기대된 프레임워크로 생성된 경우 실패하게 됩니다. 이는 회귀를 감지하는 방법으로 작동합니다.



### 샌드박스 실행하기

만약 템플릿에 inDevelopment 플래그가 있다면 해당 템플릿은 샌드박스 프로세스의 일부로 (로컬에서) 생성됩니다. 다음 명령어로 샌드박스를 생성할 수 있습니다. 여기서 `template-key`는 선택한 템플릿의 id로 대체되어야 합니다. 예: cra/default-js:

```js
yarn task --task dev --template <template-key> --start-from=install
```

inDevelopment을 가진 템플릿은 로컬 템플릿 생성에 필요하기 때문에 자동으로 --no-link 플래그와 함께 실행됩니다.



PR이 병합되면 템플릿이 매일 자동으로 생성되고 개발 중 플래그를 제거할 수 있으며 샌드박스는 템플릿 저장소에서 코드를 가져올 것입니다.

## 문제 해결

Storybook에 기여하는 방법에 대해 자세히 알아보세요

- 기능 요청을 작성하는 RFC 프로세스
- 기능 및 버그 수정을 위한 코드
- 새로운 프레임워크로 시작하는 법
- 문서 개선, 오타 수정, 명확화를 위한 문서
- 새로운 스니펫과 예제에 대한 예제