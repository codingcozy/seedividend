---
title: "각진 노하우 프로젝트 구조와 조직에 대한 팁"
description: ""
coverImage: "/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_0.png"
date: 2024-06-20 02:55
ogImage: 
  url: /assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_0.png
tag: Tech
originalTitle: "Angular Best Practices: Tips for Project Structure and Organization"
link: "https://medium.com/@marketing_26756/angular-best-practices-tips-for-project-structure-and-organization-490ca7950829"
isUpdated: true
---




새로운 프로젝트를 처음부터 구축하기 시작할 때 첫 번째 질문은 무엇이 좋은 프로젝트 아키텍처여야 하는가인데요. 어떤 기술 스택을 사용하든, 우리는 프로젝트 아키텍처가 새로운 애플리케이션을 구축하는 과정에서의 건축 기본 요소임을 알고 있습니다.

모든 프로젝트와 사용 사례에 가장 적합한 아키텍처를 찾는 것은 거의 불가능하지만, 확장 가능한 구조를 찾아야 합니다. 본 글은 확장 가능하고 유지보수가 용이한 Angular 프로젝트 구조에 대한 상세한 정보를 제공합니다.

![AngularBestPractices](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_0.png)

# 전체 프로젝트 구조

<div class="content-ad"></div>

기본적으로 좋은 프로젝트 아키텍처는 애플리케이션의 성능을 향상시키지 않거나 더 빠르게 또는 더 잘 실행되지 않습니다. 그러나 Angular 아키텍처의 최상의 실천 방법을 활용하면 소스 파일로 신속하게 이동하고 모든 것이 어디에 보관되는지 이해할 수 있습니다. 그럼으로써 쉬운 디버깅을 실현하고 개발자나 신입사원들이 파일을 찾으려고 여기저기 배회하는 노력을 최소화하는 데 도움이 됩니다.

Angular 프로젝트 구조의 최상의 실천 방법으로 Angular 팀이 소개하는 LIFT 원칙은 다음과 같습니다:

- 코드 신속하게 찾기 — 관련 파일을 쉽게 찾을 수 있는 그룹에 유지합니다.
- 한눈에 코드 식별하기 — 파일명을 사용하여 즉시 해당 내용과 표현물을 알 수 있도록 합니다.
- 평평한 폴더 구조 — 가능한 한 평면 폴더 구조를 유지하여 모든 것을 하나의 차원에 제공합니다.
- DRY 하게 유지하기 — DRY(Don’t Repeat Yourself)를 따르지만 가독성을 희생하지 않는 한도 내에서 DRY해야 합니다.

초보 Angular 구조는 Angular CLI 명령을 사용하여 작성된 것처럼 보입니다.

<div class="content-ad"></div>

![image](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_1.png)

## 전체 프로젝트 구조를 이해해봅시다. 일반적으로 워크스페이스 구성 파일, 애플리케이션 프로젝트 파일 및 소스 파일이 포함됩니다.

.vscode — 이 폴더는 코드베이스가 VS Code 편집기에서 열릴 때 Visual Studio Code에 의해 생성 및 e2e로 대체되었습니다. 프로젝트 워크스페이스 설정을 보관합니다.

node_modules/ — 전체 워크스페이스에 npm 패키지를 제공합니다. 이 폴더를 열어서 사용 가능한 패키지를 볼 수 있습니다.

<div class="content-ad"></div>

**Src/** - 애플리케이션의 모든 코드를 포함합니다.

**.editorconfig** - 코드 편집기 설정을 보유합니다.

**.gitignore** - Git이 무시해야 하는 의도적으로 추적되지 않은 파일을 지정합니다.

**angular.json** - Angular 앱 구성을 보유합니다.

<div class="content-ad"></div>

package-lock.json은 설치된 각 종속성의 정확한 버전을 기록합니다. 그에 포함된 하위 종속성과 그들의 버전도 함께 포함됩니다.

package.json에는 프로젝트에 관한 설명적이고 기능적인 메타데이터가 포함되어 있습니다. 프로젝트의 이름, 버전 및 종속성 등이 포함됩니다.

README.md는 애플리케이션에 대한 문서화를 위한 Markdown 파일입니다.

tsconfig.app.json은 애플리케이션 기준으로 구성을 조정할 수 있는 추가적인 설정 파일입니다. Angular CLI 워크스페이스에 여러 애플리케이션이 있는 경우 유용합니다.

<div class="content-ad"></div>

tsconfig.json은 TypeScript 구성을 포함하는 일반 파일입니다. 여러 개의 Angular 하위 프로젝트가 있는 경우, 각각의 tsconfig.app.json 구성을 가지고 있어 유용합니다.

tsconfig.spec.json은 애플리케이션 테스트를 위한 TypeScript 구성을 보관합니다.

# 디렉토리 구조

디렉토리 구조, 각 디렉토리의 필요성 및 사용에 대해 자세히 알아봅시다. 파일을 기능 및 목적에 따라 디렉토리 구조를 활용하여 조직화할 수 있습니다.

<div class="content-ad"></div>

## node_modules

`node_modules`는 빌드 도구를 위한 디렉토리입니다. 앱 내 `package.json` 파일은 `npm install`을 실행할 때 `node_modules`에 설치될 라이브러리를 정의합니다. 타사 패키지를 설치할 때마다 `node_modules` 디렉토리에 그들의 폴더가 저장됩니다.

참고: 앱을 프로덕션 서버로 배포하거나 git 저장소에 커밋할 때 `node_modules`는 제외해야 합니다. 프로젝트를 다른 위치로 이전할 때도 이 폴더는 포함해서는 안 되며, 대신 `npm`을 실행하여 `node_modules`를 생성해야 합니다.

## SRC

<div class="content-ad"></div>

어플리케이션의 모든 소스 코드를 넣어야 하는 곳입니다. Angular 애플리케이션을 생성하면 기본적으로 angular CLI가 src 디렉토리에 여러 파일과 디렉토리를 생성합니다. 또한 각 모듈, 컴포넌트, 서비스 및 관련 소스 코드를 src 디렉토리에 넣어야 합니다.

![Angular Best Practices](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_2.png)

## App

app 디렉토리는 루트 애플리케이션 폴더로 작동하며 앱 모듈 역할을 합니다. 앱 모듈 또한 src 디렉토리 내에 위치합니다. Angular 애플리케이션은 적어도 하나의 컴포넌트와 모듈이 있어야 하며 기본적으로 앱 모듈입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_3.png" />

앱 모듈에는 모듈 파일 (app.module.ts), 라우팅 파일 (app-routing.module.ts) 및 컴포넌트 (app.component.ts)이 포함되어 있습니다.

app.module.ts — 이 파일은 Angular에 다른 특정 Angular 모듈에 대해 알려줍니다. 이 파일에는 Imports, Declarations, Providers, Bootstraps 및 기타 구성 옵션이 포함됩니다. Imports 섹션에서 다른 모듈을 가져와서 Declarations 섹션에 컴포넌트를 선언하고 Providers 섹션에 서비스를 제공합니다.

app-routing.module.ts — 라우팅을 위해 라우트 목록과 해당 컴포넌트를 선언합니다.

<div class="content-ad"></div>

다음 섹션에서는 남은 구성 파일에 대해 이야기할 예정입니다.

자산

자산 파일에는 애플리케이션에 필요한 정적 데이터가 저장됩니다. 예를 들어 이미지, 아이콘 등이 있습니다.

`<img src="/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_4.png" />`

<div class="content-ad"></div>

환경

여러 환경을 설정하기 위해 이 디렉토리를 생성해야 합니다. 여기에 환경 파일을 추가하여 환경별 설정을 저장할 수 있습니다. 예를 들어:

![environment](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_5.png)

운영 환경용 environment.prod.ts 파일을 만들어야 합니다.

<div class="content-ad"></div>

개발 환경을 위한 설정

스타일
공유 CSS 파일을 styles 디렉토리에 넣는 것이 좋은 아이디어입니다. 전체 애플리케이션에서 사용할 사용자 정의 CSS 파일(예: 색 변수 파일, 공유 타이포그래피 등)을 추가해야 합니다.

![이미지](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_6.png)

# 모듈 구성

<div class="content-ad"></div>

Angular Module은 관련 기능을 그룹화하고 정리하는 개념입니다. 각 Module은 독립적이고 분리된 기능을 나타냅니다. Angular 애플리케이션의 초기 기본은 app module이라고 하는 단일 모듈만 있습니다. 이는 작은 애플리케이션의 경우에 효과적입니다. Angular Modules를 사용하면 디렉터리 구조를 효과적으로 구성할 수 있는 훌륭한 시작점을 제공받을 수 있습니다.

우리는 Angular Module의 모베스트를 따라 잘 정리된 애플리케이션을 만들 수 있습니다. 좋은 실천으로 코드를 모듈로 묶고, 모듈을 최대한 활용하기 위해 아래와 같이 네 가지 카테고리로 모듈을 지정합니다.

- App Module
- Core Module
- Features Module
- Shared Module

## App Module

<div class="content-ad"></div>

앵귤러 CLI에 의해 생성된 루트 모듈인 앱 모듈은 애플리케이션의 진입점입니다. 애플리케이션이 시작될 때 앱 모듈이 로드되며, 모든 다른 모듈도 함께 로드됩니다. 애플리케이션이 성장함에 따라 루트 모듈을 발전시킵니다. 앱 모듈에는 코어, 기능 및 공유 모듈이 모두 포함되어 있습니다.

![image](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_7.png)

## 코어 모듈

애플리케이션 전반에 걸쳐 전역적으로 공유되는 코어 기능, 서비스 및 모델은 기능 모듈과 관련이 없는 경우 코어 모듈의 일부여야 합니다.

<div class="content-ad"></div>

싱글톤 서비스는 애플리케이션 당 하나의 인스턴스만 가져야 하므로 여기에 구현되어야 합니다. 이 모듈에는 인증 서비스 및 헤더, 푸터, 네비게이션 바, 사이드바, 인터셉터, 가드, 상수, 열거형, 유틸리티 및 범용 모델과 같은 정적 구성 요소가 포함되어 있습니다.

앱 루트 모듈에서는 핵심 모듈만 가져와야 합니다. 다른 모듈은 핵심 모듈을 가져오면 안 됩니다.

## 공유 모듈

여러 모듈 간에 공유되는 구성 요소, 지시문 및 파이프는 공유 모듈에 유지해야 합니다. 예를 들어, 검색 및 로더는 여러 기능에서 사용될 수 있습니다. 공유 모듈에 저장된 항목은 다른 기능 모듈에 선언된 구성 요소에 의해 재사용 및 참조됩니다.

<div class="content-ad"></div>


![Shared Module](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_8.png)

큰 애플리케이션 작업 시 공유 모듈이 더 유용합니다. 이는 애플리케이션의 번들 크기와 초기 빌드 시간을 줄이고 성능을 향상하기 위해 애플리케이션의 지연 로딩을 고려할 때 더 유용합니다. 공유 모듈은 애플리케이션의 다른 모듈에 의존해서는 안 됩니다.

참고: 여기서 서비스를 정의해서는 안 됩니다. 공유 모듈은 어디서든 가져오기(import) 때문에 지연 로딩된 모듈에서 가져오면 서비스의 새 인스턴스가 생성될 수 있습니다.

## 기능 모듈


<div class="content-ad"></div>

우리는 응용 프로그램 요구 사항을 분리하고 응용 프로그램을 기능으로 분해해서 Feature Based Architectures로 불리는 것에 대해 이야기했어요. 우리는 src/app/features/ 모듈 아래 각 기능에 대한 별도 서브 모듈을 만들어야 해요. 이렇게 하면 코드가 독립적이고, 특정 기능에 중점을 둔 단일 책임을 갖게 됩니다.

![Angular Best Practices Tips for Project Structure and Organization](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_9.png)

의료 응용 프로그램을 구축한다고 가정해 봅시다. 우리는 예약, 처방, 환자, 결제 등을 위한 기능을 가져야 해요.

## Feature Based Architecture

<div class="content-ad"></div>

각 모듈은 모듈 이름 또는 기능을 따라 폴더 이름을 지정해야 합니다. 각 모듈에는 해당 모듈에서 필요로 하는 컴포넌트, 디렉티브, 파이프, 페이지, 다이얼로그, 및 서비스가 있으며, Redux 패턴을 사용하는 경우 각각을 블록으로 작성합니다.

이러한 방식으로 코드를 구조화하면 특정 요소를 쉽게 찾을 수 있고 코드의 재사용성이 증가합니다. 모듈은 코드를 구성하고 분리하는 방법입니다. 여러 모듈을 가질 수 있으며 일부 모듈은 지연로드할 수 있습니다.

![Angular Best Practices](/assets/img/2024-06-20-AngularBestPracticesTipsforProjectStructureandOrganization_10.png)

# 컴포넌트 구조

<div class="content-ad"></div>

Angular 어플리케이션을 만드는 데 구성 요소는 필수적입니다. 이들은 거대한 애플리케이션을 사용자 뷰를 정의하는 코드 조각들로 나눕니다. 구성 요소는 더 모듈화되고 유지보수하기 쉬운 어플리케이션을 만듭니다. 재사용 가능하고...자세히 알아보려면 여기를 클릭하세요