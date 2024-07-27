---
title: "코드 형태의 형상  코드 생성을 활용하여 개발자의 작업 흐름 최적화하기"
description: ""
coverImage: "/assets/img/2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_0.png"
date: 2024-05-12 22:06
ogImage: 
  url: /assets/img/2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_0.png
tag: Tech
originalTitle: "Code Shaper — optimizing developer workflows using code generation"
link: "https://medium.com/@NareshBhatia/code-shaper-optimizing-developer-workflows-using-code-generation-f34661e6618a"
---


스타터 템플릿과 코드 생성기는 개발자들이 새로운 언어나 프레임워크로 시작하는 인기 있는 방법입니다. 그러나 많은 경우 이들은 효율적이고 견고한 개발 워크플로우를 지원하지 못하는 것이 문제입니다. 대부분의 코드 생성기는 프로덕션 품질의 도구가 없으며 생성 능력이 제한되어 사용자 정의를 공유하기 어렵게 만듭니다.

![Code Shape 사진](/assets/img/2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_0.png)

오늘은 이러한 문제를 해결하기 위해 전면부터 설계된 코드 생성 플랫폼인 Code Shaper를 소개하고 싶습니다. 여기 몇 가지 주요 기능을 소개합니다:

- 모듈식이므로 프로덕션 품질의 도구 추가 가능
- React, Next.js, Remix와 같은 인기있는 프레임워크용 사전 제공 생성기 포함
- 린팅, 테스팅, 컴포넌트 개발, API 모킹에 대한 의견이 분분한 선택 제공
- 워크플로우 사용자 정의가 필요한 경우 사용자 정의 생성기 빌드 가능
- npm 등의 레지스트리를 사용하여 팀과 생성기 공유 가능



Code Shaper은 작업 흐름을 신속하고 일관되게 그리고 표준화된 방식으로 만들어줍니다. Code Shaper가 어떻게 여러분의 작업 흐름을 최적화할 수 있는지 느껴보기 위해 간단한 Next.js 앱을 만들어보겠습니다.

아래는 Code Shaper 사이트의 전체 설명서를 요약한 것입니다. 여러분은 전체 연습을 직접 경험하거나 다른 프레임워크를 시도해볼 수 있는 곳으로 바로 이동할 수 있습니다.

# 시작하기

Code Shaper를 사용하면 단일 저장소에서 여러 아티팩트를 생성할 수 있습니다. 이는 웹 애플리케이션, 재사용 가능한 라이브러리, 코드 생성기 또는 상상할 수 있는 모든 것일 수 있습니다. 각 아티팩트에는 자체 워크스페이스가 있습니다. 워크스페이스는 저장소의 구성 요소로 생각할 수 있습니다.



코드 쉐이퍼를 설정하는 것은 두 단계로 이루어져요:

- 새로운 레포지토리 생성하기
- 그 안에 하나 이상의 아티팩트 추가하기

단계 2는 서로 다른 언어와 프레임워크를 사용하는 아티팩트를 추가하기 위해 여러 번 반복할 수 있어요.

그럼 이제 새로운 레포지토리를 만들어 시작해볼까요?



## 새로운 레포지토리 만들기

먼저, 앱과 라이브러리와 같은 다양한 아티팩트를 추가할 기반으로 사용할 새로운 레포지토리를 만들겠습니다. 계속하기 전에 가져야 할 몇 가지 전제 조건이 있습니다:

- 머신에 Node Version Manager (NVM)가 설치되어 있는지 확인하세요. NVM을 통해 명령 줄을 통해 다양한 노드 버전을 사용할 수 있습니다. NVM을 설치하려면 아래 지침을 따르세요:
  NVM for MacOS
  NVM for Windows
- TypeScript를 이해하는 IDE가 설치되어 있는지 확인하세요. Visual Studio Code (무료)와 WebStorm (유료) 모두 좋은 선택지입니다.

```js
# 보통 새 프로젝트를 만드는 위치(예: ~/projects)로 디렉터리 변경
cd ~/projects

# 레포지토리용으로 빈 디렉터리를 만들고 해당 디렉터리로 이동합니다.
# 레포지토리는 일반적으로 케밥 케이스로 명명됩니다.
mkdir movie-magic
cd movie-magic

# 빈 package.json 파일 생성
npm init -y

# Code Shaper 및 해당 레포지토리 플러그인 설치
npm install code-shaper @code-shaper/repo

# Code Shaper 실행하고 프롬프트에 따라 turborepo를 초기화합니다.
npx shaper
? 어떤 플러그인을 실행하시겠습니까? Repo
? 어떤 생성기를 실행하시겠습니까? turborepo
? 이 생성기는 레포지토리의 일부 파일을 덮어쓸 것입니다. 계속 하시겠습니까? y
```



Code Shaper가 Turborepo와 새로운 package.json 파일을 사용하여 저장소를 초기화했습니다. 아래 명령을 실행하여 새로운 종속성을 설치한 후 첫 번째 커밋을 만들어보세요:

```js
# 현재 디렉토리에 git 저장소를 초기화합니다
git init

# 필요한 Node.js 버전을 사용합니다.
# 필요한 Node.js 버전이 설치되어 있지 않으면
# 설치하라는 프롬프트가 표시됩니다.
nvm use

# 새로 생성된 package.json 파일로 초기 설치를 수행합니다
rm -rf package-lock.json node_modules
npm install

# 첫 번째 커밋을 만듭니다
# 매 단계가 끝날 때마다 커밋하여 완료된 단계를 표시합니다.
# 커밋 메시지에는 일반적인 규약을 따르는 것에 주의하세요.
# `npm run commit` 명령을 사용하여 프롬프트를 통해 도와줍니다.
# 다음 git 명령을 직접 실행하는 것과 동일합니다:
#   git commit -m "chore: initial commit"
git add .
npm run commit
 ? 이 변경 내용의 유형을 선택하세요 (필수): chore
 ? 이 변경 내용의 범위를 선택하세요 (선택사항) (Enter를 눌러 건너뛰기): <Enter 키>
 ? 이 짧은 문장을 완료하세요 (필수): "이 커밋을 적용하면...": (최대 100자)
 initial commit
 ? 변경 사항에 대한 자세한 설명을 제공하세요 (선택사항): (Enter를 눌러 건너뛰기): <Enter 키>
 ? 파손되는 변경 사항이 있나요?: 아니요
 [master (root-commit)] chore: initial commit
```

이제 저장소가 모두 설정되었으니, 첫 번째 아티팩트를 추가해봅시다. 우리는 Next.js 앱으로 시작할 것입니다.

## Next.js 앱 만들기



Code Shaper 플러그인을 Next.js에 설치해보세요.

```js
npm install @code-shaper/nextjs
```

이제 Next.js 애플리케이션을 생성해봅시다. 관례적으로 애플리케이션은 apps 디렉토리에 만들어집니다. 거기에 하나를 만들어볼까요?

```js
npx shaper
? 어떤 플러그인을 실행하고 싶으신가요? Next.js
? 어떤 생성기를 실행하고 싶으신가요? app
? 애플리케이션 이름은? movie-magic-nextjs
? 상위 디렉토리는? apps
? 패키지 이름(게시용)? @movie-magic/movie-magic-nextjs
? Tailwind CSS를 사용하시겠습니까? Yes
```



다음 명령어를 실행하여 추가 설정을 하고 모든 변경 사항을 커밋하세요:

```js
# 영화 매직을 위한 로컬 환경 파일 생성
cp apps/movie-magic-nextjs/.env.example apps/movie-magic-nextjs/.env.local

# 의존성 설치:
npm install

# 앱 빌드 및 실행하여 작동 확인
npm run build
npm run dev

# 브라우저를 http://localhost:3000/ 로 이동하세요.
# 실행 중인 앱을 볼 수 있어야 합니다.

# Storybook 실행하여 작동 확인
npm run storybook

# 브라우저를 http://localhost:6006/ 로 이동하세요.
# 실행 중인 Storybook을 볼 수 있어야 합니다.

# 커밋
git add .
git commit -m "chore: add movie-magic-nextjs app"
```

이제 우리는 스타터 앱을 확장할 준비가 되었습니다. 앱 이름에서 짐작하실 수 있듯이, 세계에서 가장 놀라운 최고 10개의 영화를 보여주는 앱을 만들 것입니다. 🎬

<img src="/assets/img/2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_1.png" />



## 앱 확장하기

이 예제에서 사용할 라이브러리를 설치하려면 레포지토리의 루트 디렉토리에서 다음 명령을 실행하세요.

```js
npm install clsx axios @tanstack/react-query --workspace @movie-magic/movie-magic-nextjs
```

TypeScript 정의 생성
우리 앱에서 필요한 데이터 구조에 대한 TypeScript 정의를 생성해봅시다. 완료된 예제에서 다음 4개의 파일을 복사하여 앱의 movie-magic-nextjs/src/models 폴더에 붙여넣어주세요.



- index.ts
- Movie.ts
- PaginationInfo.ts
- QueryParams.ts

영화 목록 컴포넌트 만들기
이제 우리는 영화 목록을 받아와서 보여주는 MovieList 컴포넌트를 생성할 것입니다. 이러한 컴포넌트들은 presentational components라고 불립니다 - 데이터를 어떻게 얻었는지에 대해 걱정하지 않고, 단순히 렌더링하는 것이 그들의 일입니다.

Next.js 플러그인이 제공하는 컴포넌트 생성기를 사용하여 `MovieList` 컴포넌트를 생성할 것입니다. 아래 단계를 따라주세요:

```js
npx shaper
? 어떤 플러그인을 실행하시겠습니까? Next.js
? 어떤 생성기를 실행하시겠습니까? component
? 컴포넌트 이름은? MovieList
? 이 작업은 어느 워크스페이스에 속하나요? apps/movie-magic-nextjs
? 워크스페이스 내 어느 디렉토리에 위치시키시겠습니까? src/components/MovieList
```



예를 위해 MovieList 컴포넌트를 위한 플레이스홀더가 생성되었습니다. 또한 Storybook 스토리를 위한 플레이스홀더가 생성되었습니다. 이제 Storybook를 사용하여 MovieList를 인터랙티브하게 구현해 봅시다.

```js
npm run storybook
```

브라우저를 http://localhost:6006 주소로 연결하세요. Storybook은 MovieList의 플레이스홀더 구현을 보여줍니다.

MovieList 컴포넌트 구현하기
이제 우리는 실제 MovieList를 구현할 준비가 되었습니다.



- 영화 데이터를 렌더링할 데이터를 만드세요. 완료된 예제에서 movies.ts 파일을 앱/movie-magic-nextjs/src/mocks 폴더로 복사하세요.
- 완료된 예제에서 MovieList 컴포넌트의 placeholder 구현을 덮어쓰세요. 앱/movie-magic-nextjs/src/components/MovieList/MovieList.tsx에 있습니다.
- 완료된 예제에서 MovieList의 placeholder 스토리를 덮어쓰세요. 앱/movie-magic-nextjs/src/components/MovieList/MovieList.stories.tsx에 있습니다.

다음은 최종 Storybook 스토리의 스냅샷입니다.

![코드 형태 최적화를 통해 개발자 워크플로우를 개선하는 2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_2.png](/assets/img/2024-05-12-CodeShaperoptimizingdeveloperworkflowsusingcodegeneration_2.png)

## MovieList 컴포넌트를 테스트하세요



컴포넌트에 대한 유닛 테스트를 작성하면 다음을 보장할 수 있어요:

- 정상적으로 작동하는지 확인할 수 있고,
- 리포지토리의 어떤 코드가 변경되더라도 계속해서 정상적으로 작동하는지 확인할 수 있어요.

MovieList 컴포넌트에 대한 유닛 테스트를 작성해봅시다. 이 테스트는 올바른 영화 수를 렌더링하는지 확인할 거에요. React Testing Techniques에서 더 많은 유닛 테스트에 대한 모범 사례를 찾을 수 있어요.

완성된 예시에서 apps/movie-magic-nextjs/src/components/MovieList/MovieList.test.tsx의 플레이스홀더 테스트를 덮어씌워주세요.



루트 디렉토리에서 테스트를 실행하세요. 모든 테스트가 통과해야 해요.

```js
npm test
```

MovieList가 이제 완전히 구현되었습니다. 코드를 커밋합시다:

```js
# 커밋
git add .
git commit -m "feat: MovieList 추가"
```



# 요약

이 연습을 통해 코드 생성을 통해 작업 흐름을 최적화 할 수 있는 Code Shaper가 어떻게 도움이 될 수 있는지 감을 잡았을 것입니다. 이제 샘플 앱을 만들었으니, 품질 좋은 코드 생성 플랫폼이 어떻게 빠르게 견고한 응용프로그램을 개발하는 데 도움이 될 수 있는지 보실 수 있을 것입니다.

다음은 추가로 살펴볼 수 있는 자료입니다:

- 시작하기 — Code Shaper의 더 많은 기능을 다루는 심층 튜토리얼
- Off-the-shelf 플러그인
- 자체 사용자 정의 생성기 만들기
- Movie Magic — 다양한 프레임워크를 사용하여 응용프로그램을 생성하는 방법의 예제



이 기사는 원문을 참조하여 작성되었습니다: [https://www.nareshbhatia.dev/articles/code-shaper-optimizing-developer-workflows](https://www.nareshbhatia.dev/articles/code-shaper-optimizing-developer-workflows)