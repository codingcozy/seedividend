---
title: "Angular 인증 Angular 18로 업그레이드하기 "
description: ""
coverImage: "/assets/img/2024-06-20-AngularAuthenticationUpgradetoAngular18_0.png"
date: 2024-06-20 05:45
ogImage: 
  url: /assets/img/2024-06-20-AngularAuthenticationUpgradetoAngular18_0.png
tag: Tech
originalTitle: "Angular Authentication: Upgrade to Angular 18 🚀"
link: "https://medium.com/@nikosanif/angular-authentication-upgrade-to-angular-18-46489184b40f"
isUpdated: true
---




아래는 Markdown 형식의 표입니다.

Cover Photo by Gareth Davies on Unsplash.

사용자 인증 흐름에 대한 최상의 실천 방법을 보여주는 Angular 애플리케이션입니다.

## 라이브 데모

라이브 애플리케이션: angular-authentication.netlify.app

<div class="content-ad"></div>

# 도전! 🤔

세 해 전에, Angular 애플리케이션에서 인증 및 권한 부여를 보여주기 위해 Angular Authentication이라는 오픈 소스 프로젝트를 만들었습니다. 이 프로젝트는 Angular 13로 구축되었으며 사용자 인증 및 권한 흐름, 보호된 경로 등을 특징으로 하였습니다. 그러나 Angular가 발전함에 따라 성능 향상, 새로운 기능, 향상된 보안을 갖춘 새로운 버전이 출시되었습니다. 프로젝트를 최신 상태로 유지하고 최신 기술을 활용하기 위해 Angular 13에서 Angular 18로 업그레이드하기로 결정했습니다.

Angular 프로젝트를 업그레이드하는 것은 주요 버전을 여러 개 걸쳐서 업데이트하는 것처럼 보일 수 있지만, Angular CLI의 강력함, 성능 향상의 장점, 새로운 기능 및 향상된 보안은 노력을 충분히 가치 있게 만듭니다. 이 글에서는 Angular 인증 오픈 소스 프로젝트를 Angular 13에서 Angular 18로 업그레이드하는 과정을 안내하겠습니다. 의존성 업데이트, 새로운 Angular 기능 채택, UI 구성 요소 이전 등을 다룰 것입니다.

# 간단 요약 🎯

<div class="content-ad"></div>

- ✅ Angular 버전: 13 ➡️ 18
- ✅ 종속성: 종속성을 최신 버전으로 업데이트합니다.
- ✅ UI 이주: 새로운 Angular Material Design Components (Material 3)를 사용해보세요.
- ✅ 릴리스 관리: versioning 및 changelog 생성을 위해 release-it으로 이주합니다.
- ✅ 기능: 새로운 Angular 18 기능을 채용합니다.
- ✅ 내장 제어 흐름: 새로운 제어 흐름 구문으로 이주합니다.
- ✅ 독립형 구성 요소: 모듈성을 위해 독립형 구성 요소를 활용합니다.
- ✅ 라우트 가드: 라우트 가드를 함수로 리팩토링합니다.
- ✅ 타입드 폼: 개선된 타입 안전성을 위해 타입드 폼을 사용합니다.
- 🕣 시그널 API 사용: 새로운 시그널 입력, 시그널 기반 쿼리, 그리고 새로운 출력 구문으로 이주를 시도해보세요.
- 🕣 Zoneless 변경 감지: zone.js를 종속성에서 제거합니다.
- 🕣 미루기 가능한 뷰: 미루기 가능한 뷰를 위한 새로운 화려한 기능을 사용합니다.

# 점진적 업그레이드 프로세스 🚀

# 초기 설정

[단계 1] ⏩ Angular 업그레이드 가이드 방문하기:

<div class="content-ad"></div>

- Angular 업데이트 가이드는 각 버전 업그레이드에 대한 자세한 단계와 정보를 제공합니다.

[단계 2] ⏩ Node 16용 의존성 설치:

```js
npm install
```

[단계 3] ⏩ Node 18로 전환: 저는 Node 버전 관리자(nvm)를 사용하여 Node 18로 전환했습니다.

<div class="content-ad"></div>

```bash
nvm 사용 18

# Angular 업데이트 점진적으로 진행하기

[단계 4] ⏩ Angular 14로 업데이트하기:

ng update @angular/core@14 @angular/cli@14 --force

<div class="content-ad"></div>

- --force 플래그를 사용하면 버전 호환성 검사를 우회합니다. 나중에 수동으로 문제를 수정할 거에요.

[단계 5] ⏩ 순차적인 업데이트:

ng update @angular/core@15 @angular/cli@15 --force
ng update @angular/core@16 @angular/cli@16 --force
ng update @angular/core@17 @angular/cli@17 --force

[단계 6] ⏩ Node 20으로 전환:

<div class="content-ad"></div>

nvm 사용 20

[Step.7] ⏩ 최신 Angular 버전(v18)으로 업데이트:

ng update @angular/core@latest @angular/cli@latest --force

# 조정 및 비교
```  

<div class="content-ad"></div>

[단계 8] ⏩ 비교를 위해 새 Angular 프로젝트 생성하기:

- 최신 버전의 Angular 프로젝트를 생성하여 구성을 비교하고 필요한 조정 사항을 식별합니다.

```js
ng new new-angular-project
```

[단계 9] ⏩ 개발 의존성 업데이트하기:

<div class="content-ad"></div>

- 모든 패키지를 최신 버전으로 업데이트해주세요.
- eslint 문제를 수정해주세요.
- package.json에 있는 모든 명령어를 테스트하여 호환성을 확인해주세요.

# 최종 Angular 업데이트

[Step.10] ⏩ Node 버전 20으로 강화하기:

- package.json의 engines 필드를 업데이트하여 Node 20.x를 사용하도록 설정해주세요.

<div class="content-ad"></div>

```json
"engines": {
  "node": "20.x"
}
```

[Step.11] ⏩ 기능 및 구성 요소 분리:

- 기능을 분리하고 하나씩 Angular 18로 마이그레이션을 시작하세요. 이 방법을 통해 문제를 식별하고 점진적으로 수정할 수 있습니다. — Angular CLI schematics를 사용하여 최신 Angular 18 기능을 갖춘 새로운 컴포넌트와 서비스를 생성하세요. 예를 들어:

```js
ng g @angular/core:control-flow # 새로운 제어 플로우로 이주
```

<div class="content-ad"></div>

# UI 및 의존성 이주

[Step.12] ⏩ TaigaUI에서 Angular MDC로 UI 이주:

- Angular Material Design Components (MDC)로 전환합니다. TaigaUI도 훌륭한 라이브러리이지만 새로운 Material 3 컴포넌트는 이제 안정화되었고 저는 시도해 보기로 결정했습니다.
- TaigaUI 컴포넌트를 MDC와 대체합니다.

[Step.13] ⏩ 사용되지 않는 종속성 제거:

<div class="content-ad"></div>

- angular-in-memory-web-api를 제거하고 대안적인 데이터 모킹 솔루션이나 실제 백엔드 서비스를 사용하도록 프로젝트를 업데이트해주세요.
- API 요청과 응답을 처리하기 위한 사용자 지정 HTTP 인터셉터를 구현해주세요.

[Step.14] ⏩ 독립 구성 요소 채택:

- Angular의 독립 컴포넌트 기능을 활용하여 모듈 관리를 간단화하고 코드 모듈성을 개선해보세요.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css'],
})
export class StandaloneComponent {}
```

<div class="content-ad"></div>

[단계 15] ⏩ 새로운 내장 제어 흐름 사용:

- Angular 18에서 소개된 새로운 내장 제어 흐름 기능을 사용하여 비동기 작업을 간소화하고 코드 가독성을 향상시킵니다. 구체적으로 ngIf 대신 @if 키워드를 사용하고 ngFor 대신 @for를 사용해주세요.

[단계 16] ⏩ 가드를 함수로 리팩토링:

- 라우트 가드를 함수로 리팩토링하여 코드를 간소화하고 유지보수성을 향상시키세요.

<div class="content-ad"></div>

```js
export const canActivate = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // 가드 로직
};
```

[Step.17] ⏩ 타입드 폼:

- 유형화된 폼을 사용하여 폼 처리에서의 유형 안전성을 향상시키고 오류를 줄입니다.

```js
loginForm = new FormGroup({
  username: new FormControl(/* ... */),
  password: new FormControl(/* ... */),
});
```

<div class="content-ad"></div>

# 기타 향상된 기능

[Step.18] ⏩ 릴리즈를 release-it으로 마이그레이션:

- 프로젝트 standard-version이 더 이상 사용되지 않아 release-it으로 버전 관리와 변경 로그 생성을 마이그레이션하기로 결정했습니다.
- release-it을 사용하여 릴리즈 프로세스를 간단히 만들어 버전 관리와 변경 로그 생성을 자동화합니다.

```js
npm install --save-dev release-it
```

<div class="content-ad"></div>

- .release-it.json 파일을 사용하여 release-it을 구성하세요:

```js
{
  "git": {
    "commitMessage": "chore(release): ${version}",
    "requireBranch": ["main"]
  }
  // ... 다른 구성
}
```

# 향후 개선 사항 💡

- 더 많은 Angular 기능 채택하기: Angular 18에서 소개된 향상된 성능, 업데이트된 API 및 향상된 도구 등 새로운 기능과 개선 사항을 탐색하세요.
- 독립형 컴포넌트 사용하기: 컴포넌트에서 모든 @NgModule 선언을 제거하고 더 나은 모듈화를 위해 독립형 컴포넌트를 사용하세요.
- Zoneless 변경 감지: 성능을 향상시키고 오버헤드를 줄이기 위해 zoneless Angular로 마이그레이션을 고려하세요.
- Signal API 사용하기: Angular 18에서 소개된 새 Signal API를 통해 비동기 작업을 간단하게 해보세요.
- 지연 가능한 뷰: 렌더링 성능과 사용자 경험을 향상시키기 위해 지연 가능한 뷰를 구현하세요.

<div class="content-ad"></div>

# 결론 ✅

Angular 프로젝트를 13버전에서 18버전으로 업그레이드하는 것에는 종속성 업데이트, 이슈 수정 및 새로운 기능 적용 등 여러 단계가 필요합니다. 이 체계적인 방법을 따르면 원활한 업그레이드 경로를 보장하고 Angular의 최신 기술 발전을 활용할 수 있습니다.

만약 이 글이 도움이 되었다면 👏을 눌러 더 많은 사람들에게 도움이 되도록 지원해주세요. 🙏

질문이 있으시면 언제든지 연락해 주세요 — 아래에 댓글을 남기거나 X에서 DM을 보내거나 LinkedIn에서 연락해주세요.