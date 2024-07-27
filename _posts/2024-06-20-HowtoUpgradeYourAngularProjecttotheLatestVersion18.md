---
title: "새로운 버전 18로 Angular 프로젝트를 업그레이드하는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoUpgradeYourAngularProjecttotheLatestVersion18_0.png"
date: 2024-06-20 05:33
ogImage: 
  url: /assets/img/2024-06-20-HowtoUpgradeYourAngularProjecttotheLatestVersion18_0.png
tag: Tech
originalTitle: "How to Upgrade Your Angular Project to the Latest Version 18"
link: "https://medium.com/@rs4528090/how-to-upgrade-your-angular-project-to-the-latest-version-18-79c9a0fa4bf2"
---


Angular은 웹 애플리케이션을 구축하기 위한 강력하고 널리 사용되는 프레임워크입니다. Angular 프로젝트를 최신 버전으로 유지하면 새로운 기능, 성능 향상, 보안 업데이트를 활용할 수 있습니다. Angular 18에는 개선 사항 및 업데이트가 여러 가지 포함되어 있어 개발 프로세스를 더욱 효율적으로 처리할 수 있습니다. 이 블로그 포스트에서는 Angular 프로젝트를 최신 버전 18로 업그레이드하는 과정을 안내해 드릴 것입니다.

# Angular 18으로 업그레이드하는 단계별 안내서

# 1. 현재 버전 및 의존성 확인

업그레이드 프로세스를 시작하기 전에 현재 Angular 버전과 프로젝트의 의존성을 파악하는 것이 중요합니다. 이를 통해 업그레이드 단계를 효과적으로 계획할 수 있습니다.

<div class="content-ad"></div>

프로젝트 디렉토리를 열어주세요.

현재 사용 중인 Angular 버전을 확인하려면 다음 명령어를 실행해보세요:


ng version


Angular CLI, Angular 프레임워크 및 기타 종속성을 확인하고 메모해주세요.

<div class="content-ad"></div>

# 2. Angular CLI 및 Angular Core 업데이트

Angular CLI (Command Line Interface)는 Angular 프로젝트를 관리하는 데 중요한 도구입니다. 먼저 Angular CLI를 전역적으로 업데이트하세요:

- 현재 Angular CLI를 제거하기 위해 다음 명령어를 실행하세요:

```bash
npm uninstall -g @angular/cli
```

<div class="content-ad"></div>

가장 최신 Angular CLI를 설치해보세요:


npm install -g @angular/cli@latest


프로젝트의 로컬 Angular CLI를 업데이트해보세요:


ng update @angular/cli


<div class="content-ad"></div>

다음으로 Angular 코어 및 기타 관련 패키지를 업데이트해보세요:

Angular 코어 및 기타 Angular 패키지 업데이트:

ng update @angular/core

선택적인 업데이트가 있다면 Angular이 제안할 것입니다. Angular CLI에서 제공하는 지침에 따라 진행해주세요.

<div class="content-ad"></div>

# 3. 제3자 종속성 다루기

Angular 18과 호환되기 위해 서드파티 종속성이 업데이트되어야 할 수도 있습니다. 오래된 패키지가 있는지 확인해보세요:

다음 명령어를 실행하여 오래된 패키지를 확인해보세요:

```bash
npm outdated
```

<div class="content-ad"></div>

#### 더 이상 사용되지 않는 패키지를 업데이트하세요:


npm update


일부 패키지는 주요 업데이트나 호환되지 않는 변경사항이 있을 경우 수동 개입이 필요할 수 있습니다. 각 패키지의 설명서를 확인하여 특정 업데이트 지침을 확인하세요.

#### 4. TypeScript 버전 업데이트

<div class="content-ad"></div>

Angular 18은 특정 TypeScript 버전이 필요할 수 있습니다. 올바른 TypeScript 버전이 설치되어 있는지 확인해 주세요:

필요한 TypeScript 버전을 확인하려면 Angular 문서를 참조하세요.

필요한 버전으로 TypeScript를 업데이트하세요:

```bash
npm install typescript@`required_version`
```

<div class="content-ad"></div>

Angular 문서에 명시된 버전으로 'required_version'을 바꿔주세요.

## 5. Breaking Changes와 Deprecated 사항 수정하기

업데이트 후에는 해결해야 할 Breaking Changes 또는 Deprecated 사항이 있을 수 있습니다. Angular CLI는 이러한 문제를 식별하고 수정하는 데 도움이 되는 도구를 제공합니다:

다음 명령어를 실행하여 잠재적인 사항을 식별하십시오:

<div class="content-ad"></div>

ng lint

문제를 고쳐주세요. 공식 안티 연규 및 문서를 참고하여 일반적인 호환성 문제에 대한 해결책을 확인할 수 있습니다.

## 6. 애플리케이션 테스트하기

업데이트를 완료한 후에는 애플리케이션을 철저히 테스트하여 모든 것이 올바르게 작동하는지 확인해주세요:

<div class="content-ad"></div>

유닛 테스트를 실행하세요:


ng test


엔드 투 엔드 테스트를 실행하세요:


ng e2e


<div class="content-ad"></div>

귀하의 응용 프로그램의 주요 부분을 수동으로 테스트하여 모든 기능이 정상적으로 작동하는지 확인하세요.

# 7. 문서와 종속성 업데이트

마지막으로, 업그레이드 프로세스 중에 수행된 변경 사항을 반영하도록 내부 문서를 업데이트하세요. 또한 package.json을 업데이트하여 향후 개발자가 사용 중인 버전을 파악할 수 있도록 해주세요.

# 결론

<div class="content-ad"></div>

앵귤러 프로젝트를 최신 버전 18로 업그레이드하는 것은 어려울 수 있지만, 이러한 단계를 체계적으로 따라가면 원활한 전환을 보장할 수 있습니다. 프로젝트를 최신 상태로 유지하는 것은 새로운 기능과 개선 사항뿐만 아니라 응용 프로그램의 보안과 안정성도 유지하는 데 도움이 됩니다. 즐거운 코딩하세요!