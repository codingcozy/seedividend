---
title: "Angular와 ngRX를 사용하여 OIDC 인증 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtoimplementOIDCauthenticationwithAngularandngRX_0.png"
date: 2024-06-22 14:54
ogImage: 
  url: /assets/img/2024-06-22-HowtoimplementOIDCauthenticationwithAngularandngRX_0.png
tag: Tech
originalTitle: "How to implement OIDC authentication with Angular and ngRX"
link: "https://medium.com/@kamil-konopka/how-to-implement-oidc-authentication-with-angular-and-ngrx-f955147cff38"
---


angular-oauth2-oidc 라이브러리를 사용하여 JWT 토큰 처리를 자동화하고 있어요.

![이미지](/assets/img/2024-06-22-HowtoimplementOIDCauthenticationwithAngularandngRX_0.png)

다들 OIDC를 여기서, 거기서 계속 듣곤 하는데, 정확히 무슨 의미일까요?

Microsoft의 정의를 따르면 OpenId Connect (OIDC)은 권한 부여 (OAuth 2.0의 확장)의 인증 프로토콜로, 디지털 서비스에 액세스하기 위한 로그인 프로세스를 표준화한 것이라고 해요.

<div class="content-ad"></div>

다른 말로, 사용자 데이터를 공유하지 않고 관련없는 응용 프로그램에서 사용자를 확인하는 메커니즘입니다. 이 방법을 통해 사용자는 한 번만 로그인하고 여러 응용 프로그램에 액세스할 수 있습니다.

이러한 메커니즘은 이미 상당히 인기가 있으며 기업들이 이미 자사의 생태계에 통합하기 시작했습니다.

그래, 이제 기본 개념을 파악하고 OIDC가 해결하고자 하는 문제 유형과 목표를 알게 되었습니다. 그 목표는 다음 단계를 통해 달성됩니다:

- 사용자가 특정 응용 프로그램에 입력하여 OpenID 제공자로 리디렉션됩니다.
- 사용자가 사용자 이름과 암호를 제공합니다.
- 사용자 자격 증명이 OpenID 제공자로 전달됩니다.
- 제공자가 자격 증명을 확인하고 권한을 획득합니다.
- 사용자가 ID 토큰을 포함하여 원래의 응용 프로그램으로 리디렉션됩니다.

<div class="content-ad"></div>

복잡해 보이죠?

하지만 구현하기가 생각보다 어렵지 않습니다. 외부 라이브러리를 전혀 사용하지 않고 자체 솔루션을 구축하려고 하면 좀 더 많은 시간이 걸릴 것입니다. 로켓 과학은 아니지만 전적으로 혼자서 해결할 필요는 없습니다. Angular 세계에서 소개 없이 잘 알려진 Manfred Steyer가 개발한 angular-oauth2-oidc 라이브러리가 있습니다.:-))

이 라이브러리는 모듈 기반 및 독립형 접근 방식을 포함하여 다양한 Angular 버전을 지원합니다. 제대로 설정하면 리디렉션, 요청 헤더에 토큰 추가, 심지어 토큰 갱신에 대해 걱정할 필요가 없습니다!

먼저 모듈 기반 접근 방식부터 시작해 보죠. 하지만 그 전에 프로젝트 의존성에 라이브러리를 추가해야 합니다:

<div class="content-ad"></div>

```js
npm i angular-oauth2-oidc --save
```

라이브러리가 성공적으로 설치되면 구성 및 처리를 설정하기 위해 일부 준비를 해야합니다.

인가를 처리하기 위해 이미 존재하는 사용자 기능 저장소의 구현을 사용할 것입니다. 해당 주제에 익숙하지 않다면 다른 기사를 참조해주세요:

이제 동일한 페이지에 있는 경우 사용자 기능 저장소를 확장하여 OIDC를 처리해봅시다.

<div class="content-ad"></div>

먼저 user.state.ts 파일에서 UserState를 아래와 같이 추가 속성과 함께 확장해 보겠습니다.

```js
export interface UserState {
  // ... 다른 속성들
  loggedIn: boolean;
  logInRequestHandled: boolean;
}

export const initialState: UserState = {
  // ... 다른 속성들
  loggedIn: false,
  logInRequestHandled: false,
};
```

또한 user.selectors.ts 파일에서 store에서 정보를 다시 가져오기 위한 selector를 만들어 봅시다.

```js
export const selectIsLogInRequestHandled = createSelector(
  selectUserState,
  ({ logInRequestHandled }: UserState) => logInRequestHandled
);
```

<div class="content-ad"></div>

전체 프로세스를 탐색하는 데 도움이 되는 일부 동작을 정의해야 합니다. 이를 user.actions.ts 파일 내에 다음과 같이 작성해야 합니다:

```js
const user = '[사용자]';
// ... 다른 액션들
export const logIn = createAction(`${user} 로그인`);
export const logInSuccess = createAction(`${user} 로그인 성공`);
export const logInError = createAction(`${user} 로그인 오류`);
```

우리의 액션들은 상태에 영향을 미쳐야 하므로 user.reducer.ts 파일 내에서 이러한 상태 변경이 어떻게 발생할지를 정의해야 합니다:

```js
import { createReducer, on } from '@ngrx/store';
import {
  initialState,
  logInSuccess,
  UserState,
  logInError,
} from './index';

export const userReducer = createReducer(
  initialState,
  // ... 일부 다른 액션들
  on(logInSuccess, (state: UserState) => ({ 
      ...state, 
      loggedIn: true, 
      logInRequestHandled: true,
   })),
  on(logInError, (state: UserState) => ({ 
      ...state, 
      loggedIn: false, 
      logInRequestHandled: true,
   }))
);
```

<div class="content-ad"></div>

거의 완성 단계에 다다랐어요. UsersFacade를 user.facade.ts 파일 내부에서 업데이트해야하며, 모두 통합할 수 있게 될 거예요.

```js
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './user.state';
import { logIn } from './user.actions';
import { selectIsLogInRequestHandled } from './user.selectors';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserFacadeService {
    readonly logInRequestHandled$: Observable<boolean> = this.store.select(selectIsLogInRequestHandled);

    constructor(private readonly store: Store<UserState>) {} // 생성자 대신에 주입 토큰 사용할 수 있어요

    logIn(): void {
        this.store.dispatch(logIn());
    }
}
```

이제 준비 상태를 설정하겠어요. 앞으로 모두 통합하기 위해 user.effects.ts 파일 내에서 비동기 작업을 정의해야 해요:

```js
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, from, iif } from 'rxjs';
import {
    getUserSettings,
    logIn,
    logInError,
    logInSuccess,
} from './index';
import { OAuthErrorEvent, OAuthEvent, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly oAuthService: OAuthService
    ) {
        this.oAuthService.configure(environment); // 공급자 구성
        this.oAuthService.setupAutomaticSilentRefresh(); // 조용한 자동 토큰 새로고침, 그렇지 않으면 토큰이 오래되어 refresh되지 않을 수 있어요
    }

    listenOAuth$ = createEffect(() =>
        this.oAuthService.events.pipe(
            mergeMap((event: OAuthEvent) => {
                if (event instanceof OAuthErrorEvent) {
                    return [logInError()];
                }
                if (event instanceof OAuthSuccessEvent && event.type === 'token_received') {
                    return [logInSuccess()];
                }

                return EMPTY;
            })
        )
    );

    logIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logIn),
            mergeMap(() =>
                iif(
                    () => this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken(),
                    [logInSuccess()],
                    from(this.oAuthService.loadDiscoveryDocumentAndLogin()).pipe(
                        tap((result: boolean): void => {
                            if (!result) {
                                this.oAuthService.initCodeFlow();
                            }
                        }),
                        mergeMap(() => EMPTY),
                        catchError(() => [logInError()])
                    )
                )
            )
        )
    );

    logInSuccess$ = createEffect(() => this.actions$.pipe(ofType(logInSuccess), map(getUserSettings)));

    logInError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logInError),
                tap(() => this.router.navigate(['no-access']))
            ),
        { dispatch: false }
    );
}
```

<div class="content-ad"></div>

그래서, 이제 angular-oauth2-oidc 라이브러리 구현에 대해 이야기해보겠습니다. 라이브러리 자체에 공급자 정보를 설정하기 위해 전달하는 초기 정보가 있는 구성 파일이 필요합니다. 아래는 라이브러리 문서에서 가져온 기본 구현입니다. 그러나 애플리케이션이 배포될 다양한 환경에 따라 구성이 다를 수 있으므로, 이를 환경.$'specific'.ts 파일 내에 유지하는 것을 제안합니다.

Markdown 포맷으로 표를 변경하겠습니다:

```typescript
import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
    // Identity Provider의 URL
    issuer: 'https://idsvr4.azurewebsites.net',

    // 로그인 후 사용자를 리디렉션할 SPA의 URL
    redirectUri: window.location.origin + '/index.html',

    // SPA의 ID. 해당 ID로 SPA가 권한 서버에 등록됨
    clientId: 'spa',

    // 권한 서버에서 비밀번호를 요구하는 경우 필요함. 일반적으로 이 경우,
    // 권한 서버가 SPA를 고려하여 구성되지 않았다는 것을 의미하며, 보안을 위해 중요한 추가적인 최선의 방법을 강요할 수도 있음
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // 클라이언트가 요청해야 하는 권한의 범위 설정
    // 처음 네 가지는 OIDC에서 정의된 것들임
    // 중요: refresh 토큰을 받으려면 offline_access를 요청
    // api scope는 usecase-specific한 것임
    scope: 'openid profile email offline_access api',

    showDebugInformation: true,
};
```

모듈 기반 접근 방식:

<div class="content-ad"></div>

```typescript
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserFacadeService } from './store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

function initializeLogIn(userFacade: UserFacadeService): () => void {
    return (): Observable<boolean> => {
        userFacade.logIn();
        return userFacade.logInRequestHandled$.pipe(filter(Boolean));
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: { // You can pass the array of URIs entitled to include the authorization token or allow all requests by not passing it at all.
                sendAccessToken: true,
            },
        }),
    ],
    providers: [
        { 
          provide: APP_INITIALIZER, 
          useFactory: initializeLogIn, 
          deps: [UserFacadeService], 
          multi: true 
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
```

위의 코드를 분석해봅시다. 우리는 initializeLogIn을 APP_INITIALIZER로 선언하고, 이를 주 애플리케이션 모듈 내의 providers 배열 안에 전달했습니다. 여기서 로그인 시도가 호출되고, UserFacade 소스로부터의 logInRequestHandled$ Observable이 true를 발행할 때까지 기다립니다.

APP_INITIALIZER가 무엇인지 잘 모르겠나요? 해당 주제와 관련된 다른 기사를 확인해보세요:

또한 주 애플리케이션 모듈 내에서 Angular common 라이브러리에서 HttpClientModule와 방금 설치한 라이브러리인 OAuthModule을 import 했습니다.


<div class="content-ad"></div>

# 독립 실행 방식 Angular v15:

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideOAuthClient } from 'angular-oauth2-oidc';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    { 
      provide: APP_INITIALIZER, 
      useFactory: initializeLogIn, 
      deps: [UserFacadeService], 
      multi: true,
    },
  ]
});
```

# 독립 실행 방식 Angular v14:

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideOAuthClient(),
    { 
      provide: APP_INITIALIZER, 
      useFactory: initializeLogIn, 
      deps: [UserFacadeService], 
      multi: true,
    },
  ]
});
```

<div class="content-ad"></div>

Angular v14에서는 독립적인 구성 요소가 여전히 실험 단계였고 모든 기능이 과거와 같이 공급자를 갖추지 않았다는 것이 차이점입니다.

그게 전부에요, 이제 ngRX 기반의 OIDC 구현이 준비되었습니다!

정말 쉬웠죠?

프로젝트에 대한 상담이 필요하다면 언제든 연락주세요. 앱을 망치지 마시고 문의해주세요 :-)