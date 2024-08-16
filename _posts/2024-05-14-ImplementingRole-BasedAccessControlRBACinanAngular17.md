---
title: "Angular 17에서 Role-Based Access Control RBAC 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinanAngular17_0.png"
date: 2024-05-14 14:19
ogImage: 
  url: /assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinanAngular17_0.png
tag: Tech
originalTitle: "Implementing Role-Based Access Control (RBAC) in an Angular 17"
link: "https://medium.com/@chandantechie/implementing-role-based-access-control-rbac-in-an-angular-17-735438af2697"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ImplementingRole-BasedAccessControlRBACinanAngular17_0.png" />

앵귤러 17 애플리케이션에서 Role-Based Access Control (RBAC)을 구현하는 것에는 특정 경로 및 기능에만 인가된 사용자가 액세스할 수 있도록 여러 단계를 거쳐야 합니다. 앵귤러 17은 서비스, 가드, 지시문과 같은 Angular의 핵심 기능을 사용하여 이러한 시나리오를 처리합니다.

여기에는 여러 부분으로 나뉘어진 완전한 예제가 있습니다:

# 1. 앵귤러 프로젝트 설정



먼저 Angular CLI가 설치되었는지 확인하세요:

```js
npm install -g @angular/cli
```

새로운 Angular 프로젝트를 생성하세요:

```js
ng new angular-rbac --routing=true --style=css
cd angular-rbac
``` 



# 2. 인증 모의 서비스

사용자 로그인을 관리하고 역할을 저장하는 간단한 인증 서비스를 만들어보세요.

```js
ng generate service auth
```

auth.service.ts를 편집하세요.



```js
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): void {
    // 데모용으로, 인증이 성공했다고 가정합니다.
    const user: User = {
      username: username,
      roles: username === 'admin' ? ['admin', 'user'] : ['user'],
    };
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthorized(allowedRoles: string[]): boolean {
    const user = this.currentUserValue;
    if (!user) return false;
    return user.roles.some(role => allowedRoles.includes(role));
  }
}
```

# 3. 라우트 보호를 위한 인증 가드

사용자 역할에 따라 라우트를 보호하는 가드를 생성하세요.

```js
ng generate guard auth
```



Edit the auth.guard.ts:

```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = next.data['roles'] as string[];
    if (this.authService.isAuthorized(allowedRoles)) {
      return true;
    }

    // Redirect to the login page or some other route
    this.router.navigate(['/login']);
    return false;
  }
}
```

# 4. Setup Routes with Role Protections

Edit the app-routing.module.ts to define roles required for each route:



```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

# 5. Create Components for Each Route

```js
ng generate component login
ng generate component admin
ng generate component user
```

각 컴포넌트는 필요에 따라 기본 정보 또는 양식을 렌더링하는 간단한 구조여야 합니다.



# 6. 로그인 기능 구현하기

사용자 로그인을 처리하기 위해 login.component.ts를 업데이트하세요:

```js
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.username, this.password);
  }
}
```

# 7. 어플리케이션 테스트하기



Angular 개발 서버를 실행해주세요:

```js
ng serve
```

http://localhost:4200 으로 이동하여 다른 사용자로 로그인하여 다양한 경로를 테스트해보세요.

이 설정은 Angular 17 애플리케이션에서 역할 기반 액세스를 위한 기본적인 프레임워크를 제공합니다. 실제 백엔드 통합, 토큰 기반 인증 처리, 그리고 더 정교한 사용자 관리 기능을 추가함으로써 더 확장시킬 수 있습니다.



감사합니다

찬단