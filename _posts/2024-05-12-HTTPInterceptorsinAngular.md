---
title: "앵귤러에서의 HTTP Interceptors"
description: ""
coverImage: "/assets/img/2024-05-12-HTTPInterceptorsinAngular_0.png"
date: 2024-05-12 23:44
ogImage: 
  url: /assets/img/2024-05-12-HTTPInterceptorsinAngular_0.png
tag: Tech
originalTitle: "HTTP Interceptors in Angular"
link: "https://medium.com/@jaydeepvpatil225/http-interceptors-in-angular-6e9891ae0538"
isUpdated: true
---




<img src="/assets/img/2024-05-12-HTTPInterceptorsinAngular_0.png" />

안녕하세요! 이 글에서는 Angular에서 HTTP Interceptor의 기본 개념과 몇 가지 예제에 대해 알아보고자 합니다. Angular 15를 사용하여 함께 살펴보겠습니다.

# 안내

- Angular란 무엇인가요?



**HTTP Interceptor란 무엇인가요?**

**Angular에서의 HTTP Interceptor**

**HTTP Interceptor의 장점**

**실용적인 구현**



# 선행 요건

- TypeScript와 Angular에 대한 기본적인 이해
- Angular CLI
- NodeJS



- VS Code

## Angular이란 무엇인가요?

Angular은 웹 애플리케이션을 구축하기 위한 인기 있는 오픈 소스 JavaScript 프레임워크입니다. Google에서 개발되었으며 현재는 Google의 Angular 팀에서 유지 보수되고 있습니다. Angular를 사용하면 개발자들은 동적인, 싱글 페이지 애플리케이션 (SPA)을 만들 수 있으며 복잡한 웹 애플리케이션을 구축하기 위한 구조화된 접근법을 제공합니다.

## HTTP Interceptor란 무엇인가요?



- HTTP Interceptors(인터셉터)는 웹 개발과 서버 측 프로그래밍에서  자주 사용되는 개념입니다. 이는 주로 웹 프레임워크와 라이브러리와 관련이 있습니다.

- 이러한 인터셉터를 통해 개발자는 응용 프로그램 전체에서 HTTP 요청과 응답을 가로채고 처리할 수 있습니다.

## Angular의 HTTP 인터셉터

- Angular의 HTTP 인터셉터는 HttpInterceptor 인터페이스를 구현하는 클래스입니다.



<img src="/assets/img/2024-05-12-HTTPInterceptorsinAngular_1.png" />

- HTTP 요청 및 응답과 관련된 다양한 작업을 수행하는 데 사용할 수 있습니다. 예를 들어 헤더 추가, 오류 처리, 요청 또는 응답 데이터 수정, 로깅, 인증 등이 있습니다.

- HttpInterceptor는 HttpRequest 및 HttpHandler 두 매개변수를 사용하는 intercept라는 단일 메서드를 정의합니다.

# HTTP 인터셉터의 장점



아래는 Angular에서 HTTP Interceptor를 사용하는 주요 이점 중 일부입니다:

테스트 용이성 및 재사용성: Interceptor는 고립된 환경에서 쉽게 테스트할 수 있어 각 Interceptor가 올바르게 작동하는지 확인할 수 있습니다.

크로스 커팅 관심사를 위한 중앙화된 코드: HTTP Interceptor를 사용하면 인증, 로깅, 오류 처리 또는 헤더 추가와 같은 일반 작업에 대한 논리를 중앙 위치에 정의할 수 있습니다.

전역 응용 프로그램 수준의 수정: Interceptor는 전역적으로 작동하여 Angular 애플리케이션이 만드는 모든 HTTP 요청과 응답을 가로챕니다. 이는 각 개별 요청이나 응답을 수동으로 수정하지 않아도 여러 API 호출에 일관되게 변경 적용하거나 작업을 수행할 수 있음을 의미합니다.



오류 처리 및 로깅: 인터셉터를 활용하여 전역적으로 오류를 처리할 수 있으며, 애플리케이션 전반에 걸친 일관된 방식으로 오류 보고 및 처리를 제공할 수 있습니다.

캐싱 및 요청/응답 조작: HTTP 인터셉터를 활용하여 캐싱 메커니즘을 구현하면 중복 요청을 줄이고 애플리케이션 성능을 최적화할 수 있습니다.

역할 분리: HTTP 인터셉터를 사용하면 데이터 검색 및 통신 (HTTP)과 관련된 문제를 컴포넌트 및 서비스의 비즈니스 로직과 분리할 수 있습니다.

보안 및 인증: 인터셉터는 인증 헤더나 인증 토큰을 발신 요청에 추가하는 데 일반적으로 사용됩니다. 이를 통해 사용자의 인증 상태가 API 호출에 자동으로 포함되어 매번 헤더를 명시적으로 설정할 필요가 없습니다.



세 번째 두 번째 줄은 Markdown 표현식으로 바꿈:

| Easy integration with third-party libraries: Interceptors can be used to integrate with third-party libraries or APIs seamlessly. For example, you can apply a specific format to API responses that are expected by a charting library or a data visualization tool. 

## 실용적인 구현

실용적인 구현부터 시작해보겠습니다; 이를 위해 다음 명령을 사용하여 새 Angular 어플리케이션을 생성해야 합니다.

이제 우리는 Angular를 사용하여 하나씩 다른 인터셉터를 만들어 보겠습니다.



1. 로깅 인터셉터

Angular에서는 로깅 인터셉터를 감사 로그 목적으로 사용할 수 있습니다. 요청과 응답 개체로 다양한 들어오는 요청과 나가는 요청을 로깅하려면 로깅 인터셉터의 도움을 받을 수 있습니다.

단계 1

다음 명령어를 사용하여 새로운 로깅 인터셉터를 생성하세요.



이 명령은 기본 구현을 사용하여 로깅 인터페이스를 생성합니다. 그러므로 아래에 나와 있는 대로 수정해주세요.

```js
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request', request);
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('Incoming HTTP response', event);
      })
    );
  }
}
```

- 여기에서는 Angular의 HTTP 패키지에서 필요한 모듈과 클래스를 가져옵니다.

- HttpInterceptor 인터페이스는 사용자 정의 인터셉터를 만들 수 있게 해주며, HttpRequest, HttpHandler 및 HttpEvent는 HTTP 요청과 응답을 처리하는 데 사용되는 클래스입니다.



- 우리는 비동기 작업을 처리하는 RxJS 라이브러리에서 Observable 및 Tap을 가져와 사용합니다.

- next.handle(request)를 호출하여 요청을 체인의 다음 인터셉터 또는 백엔드 서버로 전달합니다.

- 그런 다음, tap 연산자와 함께 pipe 메서드를 사용하여 들어오는 응답을 가로챕니다.

- tap 연산자를 사용하면 응답 자체를 수정하지 않고도 부작용(이 경우 응답을 로깅하는)을 실행할 수 있습니다.



단계 2

앱 모듈에 인터셉터를 제공하세요:

```js
import { LoggingInterceptor } from './interceptors/logging.interceptor';

providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true
    }
]
```

AppModule에서 HTTP_INTERCEPTORS 토큰을 사용하여 LoggingInterceptor 클래스를 인터셉터로 제공합니다. multi: true 옵션은 인터셉터가 기존 인터셉터 배열에 추가되도록 하며 덮어쓰지 않도록 합니다.



HTTP 요청을 보낼 때, 다음과 같은 요청과 응답이 로그에 기록됩니다:

![HTTPInterceptorsinAngular_2](/assets/img/2024-05-12-HTTPInterceptorsinAngular_2.png)

실제 시나리오에서는 필요에 따라 이 응답을 서드파티 서비스에 기록할 수 있습니다.

2. 요청에 헤더 추가



앵귤러에서는 인터셉터를 활용하여 HTTP 요청을 수정하고 요청 헤더에 추가적인 값들을 넣을 수 있어요.

단계 1

다음 명령어를 사용하여 새 헤더 인터셉터를 만들어보세요:

```js
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    const GUID = 'f4179b26-21ac-432c-bcd8-cb4bc6e50981'
    const modifiedRequest = request.clone({
      setHeaders:{
        GUID
      }
    })
    return next.handle(modifiedRequest);
  }
}
```



먼저 헤더 안에 설정할 GUID를 하드코딩합니다. 그래서 먼저 HTTP 요청을 복제하고 헤더에 값을 설정하기 위해 set headers 속성을 사용해야 합니다.

### 단계 2

앱 모듈에 인터셉터를 제공하세요:

```js
import { HeadersInterceptor } from './interceptors/headers.interceptor'

providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
    }
  ]
```



AppModule에서 HTTP_INTERCEPTORS 토큰을 사용하여 Interceptor로 HeadersInterceptor 클래스를 제공합니다. multi: true 옵션은 Interceptor가 기존 Interceptor 배열에 추가되도록 하는 것을 보장하며, 기존 Interceptor를 대체하지 않습니다.

![HTTP Interceptors in Angular](/assets/img/2024-05-12-HTTPInterceptorsinAngular_3.png)

실제 시나리오에서는 이러한 헤더 값들을 추가로 처리하는 데 활용할 수 있습니다. 예를 들어 요청을 유효성 검사하거나 다른 여러 경우에 사용할 수 있습니다.

3. 에러 처리 Interceptor



앵귤러에서, 에러 인터셉터는 HTTP 인터셉터로서 어플리케이션 전반에 걸쳐 HTTP 에러를 처리할 수 있게 해주는 기능입니다.

서버로 HTTP 요청을 보낼 때, 404나 500과 같은 에러 상태 코드로 응답을 받을 수 있는 상황이 발생할 수 있습니다.

각각의 HTTP 요청마다 이러한 에러들을 처리하는 것은 지루하고 반복적일 수 있습니다.

에러 인터셉터는 에러 처리 로직을 중앙화시켜 주며, 어플리케이션 전반에 걸쳐 일관된 방법으로 에러를 관리할 수 있도록 도와줍니다.



**단계 1**

다음 명령을 사용하여 새로운 오류 인터셉터를 생성하세요.

```js
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // 여기서 오류를 처리합니다
        console.error('오류 발생:', error);
        // 요구에 따라 오류 throw
        return throwError(error);
      })
    );
  }
}
```

- `intercept()` 메서드 내에서 RxJS의 `catchError` 연산자를 사용하여 HTTP 요청이나 응답 처리 중 발생하는 오류를 잡을 수 있습니다.



**단계 1**

· 오류를 가로채고 필요에 따라 처리하고, 오류를 선택적으로 다시 던져서 observable 체인을 계속 전파할 수 있게 합니다.

**단계 2**

· 앱 모듈에서 인터셉터를 제공하세요:

```js
import { ErrorInterceptor } from './interceptors/error.interceptor';

providers: [
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  }
]
```



· AppModule에서 HTTP_INTERCEPTORS 토큰을 사용하여 Interceptor로 HeadersInterceptor 클래스를 제공합니다. multi: true 옵션을 사용하면 Interceptor가 기존 Interceptor 배열에 추가되며 대체되지 않습니다.

4. Authentication Interceptor

Angular에서는 인증 Interceptor를 사용하여 모든 외부 HTTP 요청에 인증 토큰이나 헤더를 추가할 수 있습니다. API 요청이 모두 인증된 상태인지 확인해야 할 때 유용합니다.

단계 1



다음 명령어를 사용하여 새로운 인증 인터셉터를 만들어보세요.

```js
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(/*private authService: AuthService*/) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA";//his.authService.getToken();

    if (authToken) {
      // 요청을 복제하고 토큰을 첨부합니다
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

    // 토큰이 없는 경우 원본 요청을 전달합니다
    return next.handle(req);
  }
}
```

여기서 우리는 먼저 헤더에 설정할 하나의 토큰을 하드코딩합니다. 따라서 첫 번째로 HTTP 요청을 복제하고 요청 헤더에 값을 설정하기 위해 set headers 속성을 사용해야 합니다. 

Step 2



앱 모듈에서 인터셉터를 제공하세요:

```js
import { AuthInterceptor } from './interceptors/auth.interceptor';

providers: [
  {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }
]  
```

AppModule에서 HTTP_INTERCEPTORS 토큰을 사용하여 인터셉터로 HeadersInterceptor 클래스를 제공합니다. multi: true 옵션은 인터셉터가 기존의 인터셉터 배열에 추가되도록 하는 것을 보장합니다.

HTTP 요청을 보낼 때, 아래와 같이 헤더 내에 토큰을 설정할 것입니다.



<img src="/assets/img/2024-05-12-HTTPInterceptorsinAngular_4.png" />

여기서 볼 수 있듯이, 필요에 따라 추가 처리에 사용할 수 있는 하나의 bearer 토큰을 설정했습니다.

# GitHub URL

https://github.com/Jaydeep-007/angular-http-interceptor-demo



# 결론

이 글에서는 인터셉터의 기본, 이점 및 실시간 사용 사례를 Angular 15를 사용하여 단계별 구현을 통해 설명했습니다.

코딩하세요!

# 간단히 말해서



우리 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 칭찬하고 팔로우해 주세요! 👏
- PlainEnglish.io에서 더 많은 콘텐츠를 찾아보세요! 🚀
- 무료 주간 뉴스레터에 가입해주세요. 🗞️
- 트위터, 링크드인, 유튜브, 디스코드에서도 우리를 팔로우해주세요.