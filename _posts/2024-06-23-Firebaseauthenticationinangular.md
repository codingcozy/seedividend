---
title: "Angular에서 Firebase 인증 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-Firebaseauthenticationinangular_0.png"
date: 2024-06-23 14:06
ogImage:
  url: /assets/img/2024-06-23-Firebaseauthenticationinangular_0.png
tag: Tech
originalTitle: "Firebase authentication in angular"
link: "https://medium.com/@gabriel.cournelle/firebase-authentication-in-angular-ab1b66d041dc"
isUpdated: true
---

이 기사에서는 Angular 프로젝트에 Firebase 인증을 Google Single Sign-On (SSO)과 빠르게 설정하는 방법을 제안합니다. 또한 선택한 백엔드에 인증된 요청을 하는 방법도 포함되어 있습니다.

![이미지](/assets/img/2024-06-23-Firebaseauthenticationinangular_0.png)

전체 코드는 여기에서 확인할 수 있습니다: https://github.com/Gabriel2409/demofirebase

# Firebase 설정

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Firebase에 가서 새 프로젝트를 만들어주세요.

## 앱 설치

프로젝트 개요 페이지에서 Web 아이콘을 클릭하거나 +앱 추가 아이콘을 클릭하여 웹 애플리케이션을 추가하세요.

![이미지](/assets/img/2024-06-23-Firebaseauthenticationinangular_1.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

열리는 창에서 앱에 이름을 지정하고, 예를 들어 myangularapp처럼 등록해주세요. Firebase 구성을 어딘가에 저장하세요. 다음과 같이 보여야 합니다:

```js
const firebaseConfig = {
  apiKey: "<firebase-api-key>",
  authDomain: "<my-project-id>.firebaseapp.com",
  projectId: "<my-project-id>",
  storageBucket: "<my-project-id>.appspot.com",
  messagingSenderId: "<my-messaging-sender-id",
  appId: "<my-app-id>",
};
```

프로젝트 설정의 일반 탭(톱니바퀴 아이콘)로 이동하여 아무 때나 앱의 Firebase 구성에 액세스할 수 있음을 유념하세요.

## 인증 설정

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

모든 제품으로 이동한 다음 **인증**을 선택하세요. **로그인 방법**에서 **새로운 제공자 추가**를 클릭하고 Google을 선택하세요. Firebase는 Google과 긴밀하게 통합되어 있기 때문에 별도의 설정이 필요하지 않습니다.

그게 다에요! 이제 Google SSO를 사용하여 Firebase 사용자를 인증할 준비가 되었습니다.

참고: 다른 제공자도 추가할 수 있습니다(예: 이메일/비밀번호, 아래 이미지 참조), 하지만 이 기사에서는 Google SSO에 중점을 두고 있습니다.

![이미지](/assets/img/2024-06-23-Firebaseauthenticationinangular_2.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Angular 설정

## 프로젝트 생성

먼저, npm install -g @angular/cli를 사용하여 Angular을 전역으로 설치하세요. 저는 버전 17.0.1을 사용하고 있어요.

그런 다음, demofirebase라는 새 폴더를 만들고 해당 폴더에서 ng new frontend --no-standalone --routing ssr=false을 실행하세요. 이렇게 하면 필요한 파일이 포함된 frontend 폴더가 생성됩니다. 이 단계를 마치면 저장소 구조는 다음과 같아야 합니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
demofirebase
└── frontend
```

하나의 추가 패키지가 필요합니다. frontend 폴더에서 npm i @angular/fire 명령어를 실행해주세요.

다음으로, 개발 및 프로덕션을 위한 환경을 생성할 때 ng g environments를 사용합니다.
이는 src/environments 폴더에 2개의 파일을 생성합니다: environment.development.ts와 environment.ts.
로컬에서 개발할 때는 environment.ts가 environment.development.ts로 대체되어 environment.ts에서 import를 하면 자동으로 environment.development.ts의 변수들을 사용할 수 있습니다. 이는 angular.json 파일에서 확인할 수 있습니다:

```js
"fileReplacements": [
    {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.development.ts"
    }
]
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Firebase 구성을 environment.development.ts에 붙여 넣으세요.

```js
// environment.development.ts
export const environment = {
  production: false,
  // 백엔드에 요청을 보낼 수 있는 가정
  backendUrl: "http://127.0.0.1:8000",
  // 콘솔에서 가져온 Firebase 구성입니다.
  // 이것은 민감한 정보가 아님을 주의하세요
  firebaseConfig: {
    apiKey: "<firebase-api-key>",
    authDomain: "<my-project-id>.firebaseapp.com",
    projectId: "<my-project-id>",
    storageBucket: "<my-project-id>.appspot.com",
    messagingSenderId: "<my-messaging-sender-id",
    appId: "<my-app-id>",
  },
};
```

참고: production용 (environment.ts 파일)으로 가시려면, backendUrl을 배포된 백엔드로, firebaseConfig을 production 구성으로 대체하시면 됩니다. Firebase 프로젝트는 여러 환경을 가질 수 없으므로 환경마다 프로젝트를 생성하는 것이 좋습니다. 지금은 빠른 진행을 위해 더미 값만 사용하셔서 IDE에서 필드 부족으로 에러가 발생하지 않도록 하세요.

```js
// environment.ts
export const environment = {
  production: true,
  backendUrl: "backendUrl",
  firebaseConfig: {},
};
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

앱 모듈(app.module.ts)에 필요한 import 문을 추가하고 애플리케이션을 초기화하세요:

```js
//app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 필요한 컴포넌트와 라우트 생성

첫째로, Google SSO를 위한 컴포넌트를 생성하려면 'ng g c signin'을 사용하고, 랜딩 페이지를 위한 컴포넌트를 생성하려면 'ng g c landing'을 사용하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래는 Markdown으로 테이블 태그를 변경하세요.

그럼, app-routing.module.ts을 수정하세요:

```typescript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "signin", component: SigninComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

마지막으로, app.component를 수정하세요:

```typescript
// app.component.ts
<nav>
  <ul>
    <li>
      <a routerLink="/">랜딩 페이지</a>
    </li>
    <li>
      <a routerLink="/signin">로그인 페이지</a>
    </li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

지금 ng serve를 실행하고 http://localhost:4200으로 이동하면 아주 아름다운 페이지를 볼 수 있고, 랜딩 페이지와 로그인 페이지 사이를 이동할 수 있습니다.

![이미지](/assets/img/2024-06-23-Firebaseauthenticationinangular_3.png)

## 구글 SSO 추가하기

구글 SSO를 추가하려면 단순히 버튼에 click 이벤트 리스너를 추가하면 됩니다. 저는 재사용 가능하도록 지시어를 사용하는 것을 선호하는데, 아래에 제가 보여주는 구현 방법을 사용하시면 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

구글 SSO를 실행하여 지시문을 만들고 app.module.ts에 자동으로 추가합니다.

```js
//google-sso.directive.ts
import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";

@Directive({
  selector: "[googleSso]",
})
export class GoogleSsoDirective {
  constructor(private angularFireAuth: AngularFireAuth) {}
  @HostListener("click")
  async onClick() {
    const creds = await this.angularFireAuth.signInWithPopup(
      new GoogleAuthProvider(),
    );
    // 자격 증명으로 할 일을 실행합니다, 예를 들어 Firestore에 추가하기...
  }
}
```

app.module.ts에 지시문을 추가하십시오.

이제 로그인 페이지에서 해당 지시문을 사용할 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<!-- signin.component.html -->
<button googleSso>Google 계정으로 로그인</button>
```

그게 다에요. 작동하는지 확인하려면 프론트엔드로 이동하여 만든 버튼을 클릭하세요. 로그인한 후에 Firebase 콘솔로 돌아가세요. 인증에서 사용자 탭으로 이동하면 로그인에 사용한 이메일이 나타날 것입니다.

계속 진행하기 전에 로그아웃이 가능하도록 로그인 구성요소를 수정해봅시다.

```js
// signin.component.ts
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.scss",
})
export class SigninComponent {
  constructor(public angularFireAuth: AngularFireAuth) {}
  logOut() {
    this.angularFireAuth.signOut();
  }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<!-- signin.component.html -->

@if (angularFireAuth.authState | async) {
<button (click)="logOut()">Log out</button>
} @else {
<button googleSso>Sign in with google</button>
}

## Adding a route available only for logged in users

Let’s create another component: ng g c require-auth

Then let’s create a guard: ng g g auth then select CanActivate

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// auth.guard.ts
import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

export const authGuard: CanActivateFn = async (route, state) => {
  const angularFireAuth = inject(AngularFireAuth);
  const user = await angularFireAuth.currentUser;
  // coerce to boolean
  const isLoggedIn = !!user;
  return isLoggedIn;
};
```

그런 다음 app-routing.module.ts의 라우트를 수정합니다.

```js
// app-routing.module.ts - new lines
...
import { RequireAuthComponent } from './require-auth/require-auth.component';
import { authGuard } from './auth.guard';
const routes: Routes = [
  ...
  {
    path: 'require-auth',
    component: RequireAuthComponent,
    canActivate: [authGuard],
  },
];
...
```

app.component.html에 추가하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<li>
  <a routerLink="/require-auth">Auth protected</a>
</li>
```

이제 로그인한 상태에서만 액세스할 수 있는 경로가 생겼어요.

## 백엔드 경로로 bearer 토큰을 보내는 인터셉터

백엔드에서 요청을 인증하려면 Firebase에서 제공한 토큰을 Authorization 헤더에 추가해야 합니다. 백엔드에서는 토큰을 확인하는 작업을 담당할 것입니다(본 문서의 범위를 벗어남).

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

ng g interceptor bearer-token 명령을 사용하여 interceptor를 생성하세요.

```js
// bearer-token.interceptor.ts
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, lastValueFrom } from "rxjs";
import { environment } from "../environments/environment";

// 토큰을 얻는 작업이 비동기적이므로 이 함수를 추가해야 합니다.
const addBearerToken = async (req: HttpRequest<any>, next: HttpHandlerFn): Promise<HttpEvent<any>> => {
  const angularFireAuth = inject(AngularFireAuth);
  const firebaseUser = await angularFireAuth.currentUser;
  const token = await firebaseUser?.getIdToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return lastValueFrom(next(req));
};
export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // 이 bearer token을 백엔드로 보내는 요청에만 추가합니다.
  // 특정 요청에만 bearer token을 추가하도록 사용자 정의할 수 있습니다.
  if (req.url.startsWith(environment.backendUrl)) {
    return from(addBearerToken(req, next));
  } else {
    return next(req);
  }
};
```

그런 다음 app.module.ts에 provider를 추가해야 합니다.

```js
// app.module.ts

...
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bearerTokenInterceptor } from './bearer-token.interceptor';
...
  providers: [provideHttpClient(withInterceptors([bearerTokenInterceptor]))],
...
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

마지막으로 확인해보기 위해 백엔드를 호출하는 서비스를 생성해봅시다: ng g s api

```js
// api.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // 현재 사용자의 firebase 사용자 ID를 반환하는 백엔드 URL
  userIdUrl = `${environment.backendUrl}/userid`;
  constructor(private http: HttpClient) {}
  getUserId(): Observable<any> {
    return this.http.get(this.userIdUrl);
  }
}
```

그리고 랜딩 컴포넌트에서:

```js
<button (click)="getUserId()">사용자 ID 가져오기</button>
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { Component } from "@angular/core";
import { ApiService } from "../api.service";
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrl: "./landing.component.scss",
})
export class LandingComponent {
  constructor(private apiService: ApiService) {}
  getUserId() {
    this.apiService.getUserId().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
```

이제 백엔드에 요청을 보내는 버튼이 생겼어요. 개발자 도구의 네트워크 탭에서 인증되어 있다면 토큰이 Authorization 헤더에 추가되는 것을 확인할 수 있어요.

![이미지](/assets/img/2024-06-23-Firebaseauthenticationinangular_4.png)

## 추가 정보: Firebase는 로그인 정보를 어디에 저장하나요?

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

저희가 인터셉터를 사용할 때 다음 코드를 사용했습니다:

```js
const angularFireAuth = inject(AngularFireAuth);
const firebaseUser = await angularFireAuth.currentUser;
const token = await firebaseUser?.getIdToken();
```

하지만 이 코드는 실제로 어떻게 작동할까요? 정보는 어디에 저장되나요?

사실, Google SSO로 인증할 때, 인증 정보가 브라우저에 저장됩니다. 브라우저 개발자 도구를 열고 저장소 탭 (Chrome의 경우 Application)으로 이동하신 다음 Indexed DB로 이동해보세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<table> 태그를 Markdown 형식으로 변경해주세요.
