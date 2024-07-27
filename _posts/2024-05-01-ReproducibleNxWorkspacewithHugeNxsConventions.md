---
title: "거대Nx의 관례를 따르는 재현 가능한 Nx 워크스페이스"
description: ""
coverImage: "/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_0.png"
date: 2024-05-01 17:41
ogImage: 
  url: /assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_0.png
tag: Tech
originalTitle: "Reproducible Nx Workspace with HugeNx’s Conventions"
link: "https://medium.com/javascript-in-plain-english/reproducible-nx-workspace-with-hugenxs-conventions-a247c0541049"
---


## 거대한 Nx 모노 레포 유지 및 확장에 대한 주관적인 접근

![이미지](/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_0.png)

- 거대한 Nx의 규칙
  - 프로젝트 유형
  - 재현 가능한 생성
  - 일관된 모노 레포
- 당신의 워크스페이스 생성해봐요
  - 1. 규칙 정의하기
  - 2. create-huge-nx CLI 사용하기
- 더 많은 프리셋
- 마지막으로 생각할 것들

여러 조직을 Nx 모노 레포로 이전하고 유지 관리한 후, 각 주요 Nx 버전마다 새로운 리포지토리를 만들어 기존 리포를 모방하여 구성 파일을 비교하고 최신 Nx 버전과 일치하는지 확인했습니다.

<div class="content-ad"></div>

그러나 원본을 반영하는 완전한 리포를 다시 만드는 것은 많은 노동이 필요했습니다. 처음에는 Bash 스크립트를 사용했고, 그 다음으로는 Node.js 스크립트를 사용했습니다. 최종적으로는 HugeNx를 개발했습니다. 이는 구성 파일에서 워크스페이스를 생성하는 사용자 지정 Nx 프리셋입니다.

더 깊게 생각해 본 결과, 저는 단순히 워크스페이스를 생성하기 위한 파일을 만드는 것이 아니라, 워크스페이스 규칙을 설명하고 다른 목적에도 활용할 수 있는 파일을 만들고 있음을 깨달았습니다.

# HugeNx의 규칙

이 라이브러리의 주요 개념은 HugeNx의 규칙 파일입니다. 이 파일은 Nx 워크스페이스에 대해 내린 모든 관례적인 결정을 그룹화한 구성 파일입니다. 이 파일은 작업 공간이 어떻게 보이는지 설명할 것입니다.

<div class="content-ad"></div>


![2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_1.png](/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_1.png)

HugeNx의 Conventions 파일에 대상 워크스페이스에 관한 모든 정보가 들어 있다면, 새로운 워크스페이스를 처음부터 생성하거나 기존 워크스페이스를 유지할 수 있습니다.

## 프로젝트 유형

저는 통합하고자 하는 첫 번째 주요 규칙은 Nx 프로젝트 유형 개념입니다.

<div class="content-ad"></div>

Nx 워크스페이스를 구성하는 여러 가지 자료들을 탐색하면, 라이브러리를 범위 또는 유형별로 분류하고 경계를 정의하는 태그를 만드는 방법에 대한 상세한 설명을 만나게 될 거에요:

- 코드 구조화 및 명명 규칙
- 라이브러리 유형
- 도메인 주도 설계

하지만 저는 항상 이 ProjectTypes 목록을 구체적으로 지정하는 중심화된 방법이 부족했어요. 프로젝트를 생성할 때 소스 생성기 및 관련 기술과의 링크를 잃게 돼버리거든.

![이미지](/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_2.png)

<div class="content-ad"></div>

저는 그 정보를 유지하고 싶었던 이유입니다. HugeNx의 컨벤션을 활용하면 프로젝트를 인식할 수 있습니다. 왜냐하면 그 프로젝트들은 당신이 지정한 규칙을 따를 것이기 때문이죠.

## 재현 가능한 생성

Nx로 프로젝트를 시작하면 모든 것이 깨끗하고 일관되게 정렬됩니다. 그러나 시간이 지나면서 우리는 마이그레이션을 적용하고 사용자 정의 생성기를 만들며, 설정을 수동으로 수정하게 됩니다. 모든 이것이 개발자의 교체와 함께 누적되면 최종적으로는 좋지 않은 상황이 발생할 수 있습니다.

이것은 특히 인프라 수준에서 인프라 구성 요소로 코드를 사용하는 개념과 함께 IT에서 해결하려는 일반적인 도전 과제입니다. Ansible과 같은 도구를 사용하면 스크립트와 구성 파일에서 전체 인프라를 초기화하고 다시 구성할 수 있습니다.

<div class="content-ad"></div>

Nx를 사용하면 프리셋 목록을 사용할 수 있지만 하드코딩되어 있습니다. 각각에는 몇 가지 옵션이 있지만 더 고급 워크스페이스를 생성하는 데 충분하지 않습니다.

더 고급 워크스페이스를 만들고 싶다면 사용자 정의 프리셋을 만들어야 합니다. 이것은 씨앗을 생성하는 데 유용하지만 비교, 데모, 또는 워크샵을 위해 빠르게 워크스페이스를 생성하는 데는 번거로울 수 있습니다.

그래서 저는 HugeNx의 컨벤션을 사용하여 Nx 워크스페이스를 생성할 수 있는 사용자 정의 Nx 프리셋을 만들기로 결정했습니다. 여러분은 자체 프리셋을 만들거나 유지할 필요가 없습니다!

![Reproducible Nx Workspace](/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_3.png)

<div class="content-ad"></div>

Nx 버전에 맞게 전체 리포지토리를 다시 생성할 수 있습니다. 변경된 내용을 비교하거나 현재 Nx 프리셋을 생성하는 방식을 단순화하는 데 도움이 됩니다.

HugeNx는 모든 Nx 플러그인을 지원하므로 모든 Nx 프리셋을 쉽게 재현하고 사용자 정의 프리셋을 만들 수 있습니다.

## 일관성 있는 Monorepo

처음부터 리포지토리를 생성하는 것은 좋지만 오랜 기간 유지하는 것이 더 좋지 않나요?

<div class="content-ad"></div>

HugeNx의 규칙을 통한 주요 목표는 귀하의 작업 공간이 어떻게 보이고 작동해야 하는지 설명하는 가디언, 관리인이 되는 것입니다.

![이미지](/assets/img/2024-05-01-ReproducibleNxWorkspacewithHugeNxsConventions_4.png)

Eslint 규칙:
Eslint와 같은 도구를 활용하여 해당 파일을 읽고 규칙을 생성하여 다음을 시행할 수 있습니다:

- 각 프로젝트가 명명 규칙을 따르는지 확인
- 작업 공간 구조를 확인
- 각 프로젝트가 올바르게 하나의 ProjectType과 관련되어 있는지 확인
- nx.json 생성기의 옵션을 확인

<div class="content-ad"></div>

프로젝트 발견하기:
Nx Project Crystal에서 제공하는 프로젝트 추론 기능을 통해 네이밍 규칙에 따라 손쉽게 Nx 프로젝트를 발견할 수 있습니다.

또한 프로젝트 유형 네이밍 규칙과 일치하는 하나의 Nx 플러그인을 생성하고 프로젝트 구성을 자동으로 연결할 수도 있습니다!

마이그레이션:
특정 Nx 버전을 위해 새로운 작업 공간을 처음부터 다시 생성할 수 있다는 사실과 관련하여, 이제 최신 Nx로 작업 공간을 손쉽게 생성하고 기존 작업 공간과 비교할 수 있습니다.

<div class="content-ad"></div>

프로젝트 타입 무한히 변경하고 싶다면 Betterer와 같은 도구를 사용할 수도 있어요. 이를 통해 당신의 저장소를 HugeNx의 규칙에 맞게 단계적으로 이동할 수 있어요.

프로젝트 타입 생성기:
복잡하고 특수한 생성기를 만들 필요가 없어요. 프로젝트 타입을 읽고 해당 내용으로 프로젝트를 생성해주는 생성기를 만들 수 있어요.

# 워크스페이스 생성해볼까요?

새 TypeScript 파일을 생성해보면서 구체적인 예시로 시작해봐요.

<div class="content-ad"></div>

## 1. 규칙 정의하기

호텔을 관리하는 풀스택 애플리케이션을 만들기 위한 작업 공간을 포함하는 huge-angular-full-stack.conventions.ts 파일을 만들 수 있습니다:

```js
export default {
  version: '1.0',
  generators: {
    '@nx/angular:application': { //<-- 생성기 식별자
      linter: 'eslint', //<-- 옵션 목록
      style: 'css',
      unitTestRunner: 'jest',
      bundler: 'esbuild',
      e2eTestRunner: 'playwright',
      inlineStyle: true,
      inlineTemplate: true,
    },
    '@nx/angular:library': {
      linter: 'eslint',
      unitTestRunner: 'jest',
    },
    '@nx/angular:component': {
      style: 'css',
    },
    '@nx/js:lib': {
      bundler: 'swc',
    },
  },
  projectTypes: {
    'global:angular:app': { //<-- 프로젝트 유형 식별자
      projectPattern: '*-app', //<-- 규칙과 일치하는 프로젝트 명칭
      generators: [{ generator: '@nx/angular:application' }], //<-- 해당 유형의 프로젝트를 생성하는 데 사용되는 생성기 목록
    },
    'backend:api': {
      projectPattern: '*-api',
      generators: [{ generator: '@nx/nest:application' }],
    },
    'global:angular:lib:data-access': {
      projectPattern: '*-data-access',
      generators: [{ generator: '@nx/angular:library' }],
    },
    'global:angular:lib:feature': {
      projectPattern: '*-feature',
      generators: [{ generator: '@nx/angular:library' }],
    },
    'global:angular:lib:ui:storybook': { //<-- 이 프로젝트 유형은 라이브러리를 생성한 다음 storybook 구성을 생성함
      projectPattern: '*-ui',
      generators: [{ generator: '@nx/angular:library' }, { generator: '@nx/storybook:configuration', options: { uiFramework: '@storybook/angular' } }],
    },
    'global:ts:lib:utils': {
      projectPattern: '*-utils',
      generators: [{ generator: '@nx/js:lib', options: { bundler: 'swc' } }],
    },
  },
  workspace: { //<-- 작업 공간은 폴더와 프로젝트로 구성됨
    apps: {
      //<-- apps 폴더 생성
      'hotel-app': 'global:angular:app', //<-- global:angular:app 프로젝트 유형을 이용하여 hotel-app 프로젝트 생성
      'hotel-api': { //<-- backend:api 프로젝트 유형을 이용하여 hotel-api 프로젝트를 생성하고 추가 옵션을 사용
        projectType: 'backend:api',
        options: {
          '@nx/angular:remote': { frontendProject: 'hotel-app' },
        },
      },
    },
    libs: { //<-- libs 폴더 생성
      guest: { //<-- guest 폴더 생성
        'data-access': 'global:angular:lib:data-access', //<-- global:angular:lib:data-access 프로젝트 유형을 이용하여 guest-data-access 프로젝트 생성
        'booking-feature': 'global:angular:lib:feature', //<-- global:angular:lib:feature 프로젝트 유형을 이용하여 guest-booking-feature 프로젝트 생성
        'feedback-feature': 'global:angular:lib:feature', //<-- global:angular:lib:feature 프로젝트 유형을 이용하여 guest-feedback-feature 프로젝트 생성
      },
      room: { //<-- room 폴더 생성
        'data-access': 'global:angular:lib:data-access',
        'list-feature': 'global:angular:lib:feature',
        'request-feature': 'global:angular:lib:feature',
      },
      shared: { //<-- shared 폴더 생성
        ui: { //<-- global:angular:lib:ui:storybook 프로젝트 유형을 이용하여 shared-ui 프로젝트를 생성하고 추가 옵션을 사용
          projectType: 'global:angular:lib:ui:storybook',
          options: {
            '@nx/storybook:configuration': { project: 'shared-ui' },
          },
        },
        utils: 'global:ts:lib:utils',
      },
    },
  }
};
```

기본 생성기 옵션
Nx에서 이미 사용 가능한 것이며, 워크스페이스에서 사용 중인 각 생성기의 기본 옵션을 정의할 수 있는 nx.json 파일을 구성함으로써 설정할 수 있습니다.

<div class="content-ad"></div>

Nx API 문서에서 모든 Nx 옵션을 찾을 수 있어요.

프로젝트 유형 목록
여기서는 기술, 도메인, 라이브러리 유형, 팀 등을 기반으로 하는 ProjectType 목록을 정의할 거에요.

각 ProjectType에 대해 사용해야 하는 생성기와 주변 규칙을 모두 지정할 거예요. 기본 생성기 옵션을 사용하며 필요하면 추가 옵션을 추가할 수 있어요.

작업 영역 구조
마지막으로 작업 영역 레이아웃 내에서 프로젝트 목록을 정의할 거에요. 각 프로젝트는 특정 ProjectType에 의해 연결되고 설명될 거예요.

<div class="content-ad"></div>

해당 섹션은 생성에는 필요하지만 유지에는 필요하지 않습니다.

## 2. create-huge-nx CLI 사용하기

작업 영역을 생성하려면 이제 다음과 같이 HugeNx CLI를 사용할 수 있습니다:

```js
npx create-huge-nx@latest my-workspace --hugeNxConventions=./huge-angular-full-stack.conventions.ts --nxCloud skip
```

<div class="content-ad"></div>

아래는 작업 공간을 생성할 것입니다:

```js
my-workspace/
├─ apps/
│   ├─ hotel-api/
│   ├─ hotel-api-e2e/
│   ├─ hotel-app/
│   └─ hotal-app-e2e/
├── libs/
│   ├─ guest/
│   │   ├─ data-access
│   │   ├─ booking-feature
│   │   └─ feedback-feature
│   ├─ room/
│   │   ├─ data-access
│   │   ├─ list-feature
│   │   └─ request-feature
│   └─ shared/
│       ├─ ui
│       └─ utils
├─ nx.json
├─ package.json
├─ jest.config.json
└─ huge-nx.conventions.ts
```

기본적으로는 최신 버전의 Nx가 사용될 것이지만, --nxVersion으로 특정 Nx 버전으로 작업 공간을 생성할 수 있습니다:

```js
npx create-huge-nx@latest my-workspace --nxVersion 17 --hugeNxConventions=./huge-angular-full-stack.conventions.ts --nxCloud skip
```

<div class="content-ad"></div>

# 더 많은 프리셋

이제는 새로운 huge-nx.conventions.ts 파일을 소개함으로써 다양한 유형의 저장소를 간단히 만들 수 있습니다. 이 방식은 Nx의 모든 프리셋을 포괄하는 뿐만 아니라 Nx 문서의 라이브러리 유형 섹션에 설명된 대로 각 프로젝트 유형을 자세하게 설명할 수 있도록 합니다.

예를 들어, @angular-architects/ddd 패키지의 유형을 정의하고 이 정의를 사용하여 워크스페이스를 생성할 수 있습니다. 이 유연성을 통해 Nx의 강력하고 확장 가능한 도구 생태계를 활용하여 프로젝트의 특정 요구 사항에 맞는 매우 사용자 정의된 설정을 제공할 수 있습니다.

저는 ChatGPT를 사용하여 컨벤션 파일을 생성했습니다. 파일의 예시를 제공하고 특정한 목적을 설명했습니다:

<div class="content-ad"></div>

- Nx 워크스페이스를 나타냅니다.
- Angular 생성기를 사용해야 합니다.
- 호텔 비즈니스를 나타냅니다.
- 풀 스택 앱이어야 합니다.

# 마지막으로

HugeNx의 규칙은 특히 대규모 및 계속 발전 중인 단일 레포지토리를 관리하는 사람들을 위해 Nx 환경에서 유용한 도구를 제공하기 위해 만들어졌습니다.

워크스페이스 설정을 자동화하고 표준화함으로써 프로젝트 생성 및 유지보수와 관련된 복잡성을 줄이는 데 도움이 됩니다. 이 접근 방식은 이주 과정에서 시간과 노력을 절약하는 데 도움이 되었습니다.

<div class="content-ad"></div>

저는 여러분의 피드백을 기다리며 HugeNx를 개선하고자 합니다. 개발 툴킷에 귀한 추가가 될 수 있기를 희망합니다. 여러분의 아이디어와 경험이 이 도구를 완성하는 데 중요합니다. 그러니 의견을 공유해주세요.

곧 다시 만나요! 🚀

# 관련 정보

# 간단하게 이해하기 🚀

<div class="content-ad"></div>

제발 공개 커뮤니티인 In Plain English의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 글쓴이를 박수로 응원하고 팔로우하기 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기