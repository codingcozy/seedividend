---
title: "앵귤러 서비스를 활용한 깔끔한 코드"
description: ""
coverImage: "/assets/img/2024-06-20-CleanCodeUsingAngularServices_0.png"
date: 2024-06-20 05:42
ogImage: 
  url: /assets/img/2024-06-20-CleanCodeUsingAngularServices_0.png
tag: Tech
originalTitle: "Clean Code Using Angular Services"
link: "https://medium.com/@khizerrehandev/clean-code-using-angular-services-eb8bcb30af09"
---


서비스/추상화 계층 패턴을 추가하여 복잡성을 줄입니다.

![이미지](/assets/img/2024-06-20-CleanCodeUsingAngularServices_0.png)

앵귤러 애플리케이션이 초기화되기 전에 Keycloak 세부 정보를 가져오기 위해 APP_INITIALIZER를 구성합니다.

```js
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializer {
  constructor(private keycloakService: KeycloakService) {}

  initializeKeycloak(): () => Promise<any> {
    return () => this.keycloakService.init();
  }
}

export function initializeApp(appInitializer: AppInitializer) {
  return () => appInitializer.initializeKeycloak();
}

export const appInitializerProviders = [
  AppInitializer,
  { provide: APP_INITIALIZER, 
    useFactory: initializeApp, 
    deps: [AppInitializer], 
    multi: true 
  }
];
```

<div class="content-ad"></div>

나쁜 코드 예시:

![이미지](/assets/img/2024-06-20-CleanCodeUsingAngularServices_1.png)

모든 컴포넌트에 Keycloak DI를 추가하여 사용자가 버튼을 표시할 권한이 있는지 확인합니다. 기본 예제를 살펴보았지만 역할에 따라 숨겨질 수 있는 템플릿 부분이거나 제한된 로그인 사용자가 지정된 역할을 가지고 있지 않을 때 API 호출에 기반한 것이어야 합니다.

```js
// 테스트 A 컴포넌트

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Role } from './role.enum';

@Component({
  selector: 'app-component-a',
  template: `<button *ngIf="showAdminButton">Admin Button</button>`
})
export class TestAComponent implements OnInit {
  showAdminButton = false;
  userRoles: string[];

  constructor(private keycloakService: KeycloakService) {
    this.userRoles = this.keycloakService.getUserRoles();
  }

  ngOnInit() {
    this.showAdminButton = this.userRoles.includes(Role.Admin);
  }
}

// 테스트 B 컴포넌트

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Role } from './role.enum';

@Component({
  selector: 'app-component-b',
  template: `<button *ngIf="showProviderButton">Provider Button</button>`
})
export class TestBComponent implements OnInit {
  showUserButton = false;
  userRoles: string[];

  constructor(private keycloakService: KeycloakService) {
    this.userRoles = this.keycloakService.getUserRoles();
  }

  ngOnInit() {
    this.showUserButton = this.userRoles.includes(Role.Provider);
  }
}
```

<div class="content-ad"></div>

이 방식은 컴포넌트 내에서 인증 세부 정보에 직접 액세스하여 모범 사례를 위반합니다.

제가 매우 기본적인 예제를 제공하고 있지만 중대형 프로젝트에서는 복잡한 로직을 처리하고 사용자 역할에 따라 기능 액세스를 부여해야 하는 경우가 있습니다. 인터페이스를 단순화하기 위한 래퍼 서비스 또는 패싸드 레이어를 사용하는 것이 매우 유익할 것입니다. 이를 통해 복잡성을 줄이고 유연성을 높일 수 있습니다.

나쁜 코드의 문제점

- 강한 결합: 컴포넌트에 직접 서드 파티 서비스를 주입하는 것은 해당 종속성과 강하게 결합될 수 있습니다.
- 코드 중복: 각 컴포넌트가 사용자 역할을 가져오고 역할에 따라 권한을 확인하기 위해 각각 서드 파티 서비스를 주입하면 불필요한 중복이 발생합니다.
- 테스트: 새로운 종속성을 주입하는 것은 컴포넌트를 테스트하려는 복잡도를 추가하므로 컴포넌트를 분리하고 단위 테스트를 위해 종속성을 모의로 처리하기가 어려워집니다. 각 단위 테스트에서 Keycloak 서비스와 메서드를 모의 처리해야 하므로 결국 더 많은 보일러플레이트 코드가 생성됩니다.
- SRP 원칙 위반: 인증 논리를 처리하는 여러 컴포넌트로 인해 각 컴포넌트가 다중 로직을 처리하기 때문에 관리가 어려워지고 유지 보수가 더 어려워집니다.
- 확장성: 비즈니스 로직을 업데이트하거나 특정 기능에 역할을 추가해야 하는 경우 해당 변경 사항이 필요한 모든 컴포넌트에서 업데이트해야 합니다.
- 유연성: 다른 인증 공급자로 전환하려는 경우, 각 컴포넌트에 인증이 구현되어 있기 때문에 전환하기 어려우며 더 많은 작업이 필요합니다.

<div class="content-ad"></div>

따라서 공통 인터페이스를 제공하고 단일 서비스 DI를 사용하는 공유 서비스 레이어를 소개하면, 로직을 1개의 레이어로 유지할 수 있으며, 더 나아가 SRP, 캡슐화 및 Keycloak에서 역할 로직을 가져오는 추상화 소프트웨어 원칙을 준수하는 데 도움이 됩니다. 예를 들어 각 구성 요소에서 Wrapper 메서드 대신 내부 구현 방식에 따라 역할을 가져오기 위해 구성 요소에서 역할 로직을 가져오지 않아야 합니다. 이렇게 하면 구성 요소는 역할을 어떻게 가져오는지 알 필요가 없습니다.

좋은 코드 예시:

![CleanCodeUsingAngularServices_2](/assets/img/2024-06-20-CleanCodeUsingAngularServices_2.png)

사용자 권한 서비스

<div class="content-ad"></div>

```ts
import { Injectable } from '@angular/core';
import { KeycloakService } from './keycloak.service';
import { Role } from './role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {
  private userRoles: string[];

  constructor(private keycloakService: KeycloakService) {
    this.userRoles = this.keycloakService.getUserRoles();
  }

  hasRoleAdmin(): boolean {
    return this.userRoles.includes(Role.Admin);
  }

  hasRoleUser(): boolean {
    return this.userRoles.includes(Role.User);
  }
}
```

의존성 주입 서비스.

```ts
// 테스트 A 컴포넌트

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Role } from './role.enum';

@Component({
  selector: 'app-component-a',
  template: `<button *ngIf="showAdminButton">Admin Button</button>`
})
export class TestAComponent implements OnInit {
  showAdminButton = false;

  constructor(private userAuthorizationService: UserAuthorizationService) {}

  ngOnInit() {
    this.showAdminButton = this.userAuthorizationService.hasRoleAdmin()
  }
}

// 테스트 B 컴포넌트

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Role } from './role.enum';

@Component({
  selector: 'app-component-b',
  template: `<button *ngIf="showUserButton">User Button</button>`
})
export class TestBComponent implements OnInit {
  showUserButton = false;

 constructor(private userAuthorizationService: UserAuthorizationService) {
    this.userRoles = this.userAuthorizationService.getUserRoles();
  }

  ngOnInit() {
    this.showUserButton = this.userAuthorizationService.hasRoleUser()
  }
}
```

서비스 계층 또는 추상화 계층을 추가하면 모든 컴포넌트로 중복하는 로직을 간단하게 만들 수 있습니다. 이제 서비스가 권한 로직을 처리하고 컴포넌트는 서비스를 사용하여 권한을 확인하므로 권한을 가져오고 할당하는 데 명확한 (SoC)이 생깁니다. 컴포넌트는 비즈니스 로직을 분리하는 뿐만 아니라 테스트 관점에서도 도움이 됩니다. 모든 기본적인 작업이 제거되며, 이제 서비스는 독립적으로 테스트할 수 있습니다.


<div class="content-ad"></div>

# 결론

이 블로그는 외부 라이브러리를 사용할 때 일부 추상화 계층에 대해 고려하는 좋은 실천 가이드를 안내합니다. 이 방법은 코드를 유지하는 데 도움이 되는 것뿐만 아니라 External library와 상호 작용하는 복잡성을 캡슐화합니다. 이 접근 방식은 Angular 애플리케이션 내에서 코드 조직, 유지 관리 및 유연성을 향상시킵니다.

만약 이 글이 도움이 되었거나 새로운 것을 배웠다면, 좋은 독자의 박수를 얻는 것을 정말로 감사히 생각할 것입니다 👏 몇 초만 투자하면 됩니다.

지원을 계속해 주시고 계속 배우세요. 🙏

<div class="content-ad"></div>

저를 응원해 주시면 커피 한 잔 사주시는 방법이 있어요. ☕

감사합니다 :)