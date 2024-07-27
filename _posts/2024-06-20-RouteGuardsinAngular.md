---
title: "앵귤러에서의 라우팅 가드"
description: ""
coverImage: "/assets/img/2024-06-20-RouteGuardsinAngular_0.png"
date: 2024-06-20 05:24
ogImage: 
  url: /assets/img/2024-06-20-RouteGuardsinAngular_0.png
tag: Tech
originalTitle: "Route Guards in Angular"
link: "https://medium.com/@raghuvardhankaranam/route-guards-in-angular-c2c01fe6167b"
---


웹 애플리케이션에서 보안은 매우 중요합니다. Angular가 애플리케이션 보안을 도울 수 있는 한 가지 방법은 Route Guards를 통해입니다. Route Guards는 사용자가 특정 경로로 이동하거나 이동하는 것을 제어합니다. 페이지를 나갈 때 변경 사항을 저장하라는 프롬프트를 본 적이 있거나 관리자 페이지에 접근할 수 없는 경우에는 Guards를 만난 적이 있을 것입니다.

이 블로그 포스트에서는 다양한 유형의 가드와 Angular 애플리케이션에서 효과적으로 사용하는 방법 및 사용 사례에 대해 논의하겠습니다.

![RouteGuardsinAngular_0](/assets/img/2024-06-20-RouteGuardsinAngular_0.png)

# 가드란 무엇인가?

<div class="content-ad"></div>

공항 안의 보안 검문 철저히 하는 가드를 생각해보세요. 일정한 조건을 기반으로 접근을 허용하거나 거부합니다. Angular에서 가드는 특정 라우트 네비게이션의 단계 전에 실행되는 스크립트입니다. 네비게이션을 진행할지 또는 재지정할지를 결정합니다. Angular의 주요 가드 유형은 다음과 같습니다:

- CanActivate
- CanActivateChild
- CanDeactivate
- Resolve
- CanLoad

# CanActivate

CanActivate 가드는 라우트를 활성화할 수 있는지 확인합니다. 사용자 인증과 같이 특정 조건을 충족해야만 접근할 수 없어야 하는 라우트를 보호하는 데 유용합니다.

<div class="content-ad"></div>

## 사용 사례: 사용자 인증

인증된 사용자만 액세스할 수 있어야 하는 관리자 대시보드가 있다고 상상해보세요. CanActivate 가드는 사용자가 관리자 페이지로 이동하기 전에 로그인되어 있는지 확인할 수 있습니다. 사용자가 인증되지 않은 경우 가드가 로그인 페이지로 리디렉션합니다.

## CanActivate 가드 생성하기

Angular CLI를 사용하여 가드를 만들려면 다음을 실행할 수 있습니다:

<div class="content-ad"></div>

```js
ng generate guard auth
```

그리고 CanActivate를 구현합니다:

```js
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (/* 여러분의 인증 조건 */) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

## 라우트에 CanActivate 추가하기

<div class="content-ad"></div>

가드가 준비되면 보호하려는 경로에 추가하세요:

```js
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  // ...
];
```

# CanActivateChild

CanActivate과 유사하지만 하위 경로에서 작동합니다. 여러 하위 경로를 갖는 기능 모듈에 유용합니다.

<div class="content-ad"></div>

## 사용 사례: 기능 접근 제어

만약 당신의 어플리케이션에 "프로필 설정", "계정 설정", 그리고 "개인 정보 설정"과 같은 다양한 자식 경로를 가진 설정 페이지가 있다면, CanActivateChild 가드를 사용하여 적절한 권한을 가진 사용자만 이러한 자식 경로에 접근할 수 있도록 할 수 있습니다.

```js
const childRoutes: Routes = [
  { path: 'child', component: ChildComponent, canActivateChild: [AuthGuard] },
  // ...
];
```

# CanDeactivate

<div class="content-ad"></div>

이 가드는 컴포넌트에서 이탈할 때 작동합니다. 사용자가 저장되지 않은 변경 사항에 대해 경고하는 데 자주 사용됩니다.

## 사용 사례: 저장되지 않은 변경 사항

프로필 정보를 편집하는 양식 페이지가 있습니다. 사용자가 변경 사항을 가했지만 저장하지 않고 이동하려고 할 때 CanDeactivate 가드는 변경 사항을 저장하거나 저장하지 않고 나가겠다는 확인을 요청할 수 있습니다.

```js
export interface CanComponentDeactivate {
 canDeactivate: () => boolean;
}
```

<div class="content-ad"></div>

이 인터페이스를 구현하면 컴포넌트에서 사용할 수 있으며 CanDeactivate 가드에서 이를 사용할 수 있습니다.

# Resolve

Resolve 가드는 내비게이션이 완료되기 전에 데이터를 가져옵니다. 이 데이터는 라우트 매개변수를 채우는 데 사용할 수 있습니다.

## 사용 사례: 데이터 미리 로딩

<div class="content-ad"></div>

전자 상거래 애플리케이션에서 제품 상세 페이지가 있습니다. Resolve 가드는 라우트가 활성화되기 전에 제품 세부 정보를 미리 가져올 수 있으므로 사용자가 빈 페이지나 부분적으로 로드된 페이지를 보지 않게 할 수 있습니다.

```js
@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<Data> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Data {
    // 데이터를 여기서 가져옵니다
  }
}
```

# CanLoad

CanLoad는 모듈을 지연 로드해야 하는지 여부를 확인합니다. 응용프로그램 일부를 다운로드하는 것을 방지하려면 권한이 없는 사용자가 해당 모듈을 다운로드하는 것을 막으려면 중요합니다.

<div class="content-ad"></div>

## 사용 사례: 기능 게이팅

귀하의 애플리케이션에는 프리미엄 기능 모듈이 있습니다. 이 모듈은 프리미엄 사용자만 액세스할 수 있으며 따라서 다운로드도 할 수 있어야 합니다. CanLoad 가드를 사용하여 미인가된 사용자가 이 모듈을 다운로드하지 못하도록하면 대역폭을 절약하고 보안을 강화할 수 있습니다.

```js
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
    canLoad: [AuthGuard]
  },
  // ...
];
```

# 가드 등록하기

<div class="content-ad"></div>

가드를 사용하려면 Angular 모듈에서 제공해야 합니다.

```js
@NgModule({
  providers: [AuthGuard],
  // ...
})
export class AppModule {}
```

Angular의 가드는 애플리케이션 내에서 네비게이션을 효과적으로 제어하는 방법을 제공합니다. 다양한 유형의 가드를 사용하여 사용자 인증 확인, 저장되지 않은 변경 사항 알림 및 네비게이션 완료 전 데이터 사전 로드 등 다양한 조건을 처리할 수 있습니다. 개발자로서 가드를 이해하는 것은 Angular 앱의 보안 및 데이터 무결성을 보장하는 데 중요합니다.

읽는 데 즐거웠으면 좋겠습니다.

<div class="content-ad"></div>

친하게 연락해 주세요! 트위터(@urstruly_raghu)나 링크드인(https://www.linkedin.com/in/raghuvardhan-karanam/)에서 연락 주세요.