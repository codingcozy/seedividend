---
title: "앵귤러에서 HTTP 호출용 재시도 인터셉터 구성하기"
description: ""
coverImage: "/assets/img/2024-05-13-ConfigurableRetryInterceptorinAngularForHTTPCalls_0.png"
date: 2024-05-13 00:26
ogImage: 
  url: /assets/img/2024-05-13-ConfigurableRetryInterceptorinAngularForHTTPCalls_0.png
tag: Tech
originalTitle: "Configurable Retry Interceptor in Angular For HTTP Calls"
link: "https://medium.com/stackademic/configurable-retry-http-calls-interceptor-in-angular-b0300b3af023"
---


<img src="/assets/img/2024-05-13-ConfigurableRetryInterceptorinAngularForHTTPCalls_0.png" />

API 요청이 실패하는 이유는 네트워크 오류, 가용성 문제, 서버 문제 등이 많습니다. 응용 프로그램의 신뢰성과 안정성을 높이기 위해 재시도 메커니즘을 갖는 것이 좋은 실천 방법입니다. 실패할 경우 이 메커니즘은 동일한 API 호출을 백그라운드에서 다시 시도할 것입니다.

API 호출이 일시적으로 실패하는 경우가 많아 재시도하면 응용 프로그램이 이러한 일시적 결함을 어느 정도 견딜 수 있음을 보장할 수 있습니다. 우리는 이러한 메커니즘을 달성하는 데 도움이 되는 구성 가능한 재시도 인터셉터를 Angular에서 만들 것입니다.

# 구성(Configuration)



위에서 말했듯이, 리트라이 인터셉터는 다음 구성으로 구성할 수 있습니다.

- Count: API 호출을 다시 시도할 횟수입니다.
- Delay: 다시 시도하기 전에 지연할 밀리초 수입니다.
- Timeout: API 호출이 타임 아웃될 때까지 기다릴 밀리초 수입니다.

이 구성을 위한 인터페이스와 각 구성에 대한 기본 값이 있습니다.

```js
export interface RetryApiConfig {
  count?: number;
  delay?: number;
  timeout?: number;
}

// Default Values
const CONFIG_DEFAULT: RetryApiConfig = {
  count: 3, // 3번 재시도
  delay: 500, // 500ms 대기
  timeout: 20000, // 20초 후에 API 타임 아웃
};
```



기본 구성은 제공되었지만 필요한 경우이를 재정의하는 방법을 제공할 것입니다.

# HTTP Interceptor

우리는 모든 API 호출에 대해 재시도 메커니즘을 추가하려고 합니다. Angular에서 HTTP Interceptor가 가장 적절한 위치일 것입니다.

HttpInterceptor 인터페이스를 구현한 간단한 인터셉터를 만들어 봅시다.



```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    return next.handle(request).pipe(
      // RxJS Operators
    );
}
```

옵저버블 파이프에는 재시도 메커니즘을 구현하기 위해 모든 필요한 RxJS 연산자를 추가할 것입니다. 다음 두 연산자를 사용할 예정입니다.

## retry

이름에서 알 수 있듯이 retry 연산자는 API 호출을 다시 시도합니다. HTTP 요청 옵저버블이 실패하면 이 방법은 다시 시도하기 위해 소스 원래 옵저버블에 다시 구독할 것입니다. 위에서 선언한 count와 delay 속성이 있는 구성 객체를 사용합니다.



## 타임아웃

이 연산자는 주어진 밀리초 후에 오류 옵저버블을 발행합니다. 따라서, 임계값을 초과한 요청을 취소합니다.

이제 위에서 선언한 기본 구성 개체와 함께 인터셉터에서 이 두 연산자를 사용해 봅시다.

```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    return next.handle(request).pipe(
      retry(CONFIG_DEFAULT), // 요청 재시도
      timeout(CONFIG_DEFAULT.timeout) // 주어진 시간 후 타임아웃
  );
}
```



만약 우리 애플리케이션에서 다음과 같이 이 인터셉터를 사용한다면, 예상대로 작동할 것입니다.

```js
@NgModule({
  ...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true
    },
  ],
  ...
})
export class AppModule { }
```

하지만, 누군가가 구성을 다른 값으로 재정의하고 싶다면 현재는 그 방법이 없습니다.

# 구성 가능한 인터셉터



여러 애플리케이션에서 사용 중인 라이브러리 내에 인터셉터가 있고, 각 애플리케이션마다 재시도 인터셉터의 다른 구성이 있는 경우, 애플리케이션이 인터셉터에 구성을 제공할 수 있는 방법이 있을까요?

## Injection Tokens 사용하기

애플리케이션이 구성을 재정의하려는 경우 제공할 수 있는 구성을 위한 인젝션 토큰을 생성할 수 있습니다.

```js
// 앱이 구성을 업데이트하는 데 사용할 수 있는 구성을 위한 토큰
// 예시:
//  {
//     provide: RETRY_INTERCEPTOR_CONFIG,
//     useValue: { count: 5, delay: 2000 },
//  },
export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryApiConfig>(
  'retryConfig',
  {
    providedIn: 'root',
    factory: () => {
      return CONFIG_DEFAULT;
    },
  }
);
```



이 인젝션 토큰의 유형은 우리가 위에서 선언한 인터페이스이며 "retryConfig"가 이름입니다. 두 번째 매개변수에서는 팩토리 함수를 사용하여 이 토큰의 기본 값을 제공합니다. 따라서 애플리케이션이 이 토큰을 제공하지 않으면 기본 객체가 대체값으로 사용됩니다.

이제 이 토큰을 인터셉터에 주입해 보겠습니다.

```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  // Config 객체 주입
  private retryConfig: RetryApiConfig = inject(RETRY_INTERCEPTOR_CONFIG);

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // 생략
  );
}
```

이제 애플리케이션이 제공한 구성과 기본 구성을 병합하는 방법이 필요합니다. 애플리케이션이 재시도 구성의 일부만(예: count 속성) 제공하고 다른 속성은 제공하지 않는 경우가 있을 수 있습니다.



이 둘을 병합한 후 병합된 객체를 반환하는 프라이빗 함수를 만들 수 있습니다.

```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  // 구성 객체 주입
  private retryConfig: RetryApiConfig = inject(RETRY_INTERCEPTOR_CONFIG);

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // 생략
  );

  // 병합된 객체 가져오기
  private getConfig(): Required<RetryApiConfig> {
    return {
      count:
        this.retryConfig.count ??
        COUNT_DEFAULT,
      delay:
        this.retryConfig.delay ??
        DELAY_DEFAULT,
      timeout:
        this.retryConfig.timeout ??
        TIMEOUT_DEFAULT,
    };
  }
}
```

이제 retryConfig 프로퍼티가 null 또는 정의되지 않았는지 확인하여 기본값을 취하는 것입니다.

마지막으로, 이제 이 병합된 객체를 인터셉터에서 사용할 수 있습니다.



```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private retryConfig: RetryApiConfig = inject(RETRY_INTERCEPTOR_CONFIG);

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // 합쳐진 구성 가져오기
    const config = this.getConfig();

    return next.handle(request).pipe(
      retry(config), // 여기에서 합쳐진 구성 사용
      timeout(config.timeout)
  );

  private getConfig(): Required<RetryApiConfig> {
    // 생략
  }
}
```

필요시 애플리케이션에서 기본 구성을 재정의할 수 있습니다.

```js
@NgModule({
  ...
  providers: [
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: {
        count: 2 // 이 애플리케이션에서는 count만 재정의함
      }
    }
  ],
  ...
})
export class AppModule { }
```

하지만 아직도 마지막 문제가 있습니다. 특정 API 호출이 이 구성을 재정의하려면 어떻게 해야 할까요? 예를 들어, 네트워크 부하가 큰 호출은 재시도하지 않고 싶을 수 있습니다.



## HttpContext 사용하기

Angular의 HttpContext에 대해 잘 모르신다면 먼저 여기를 읽어보세요. 우리는 어떤 API 호출이 응용 프로그램 레벨 또는 기본 구성을 재정의하고 싶을 때 제공할 수 있는 컨텍스트 토큰을 생성할 수 있습니다.

```js
export const RETRY_INTERCEPTOR_CONTEXT =
  new HttpContextToken<RetryApiConfig | null>(() => null);
```

컨텍스트의 기본값은 null입니다. HTTP 요청을 수행하는 동안 어떤 API 호출이라도 컨텍스트를 설정할 수 있습니다.



```js
this.http.get(URL, {
  context: new HttpContext().set(RETRY_INTERCEPTOR_CONTEXT, { count: 1 })
})
```

또한 getConfig 메서드를 업데이트하여 구성을 병합할 때 context를 사용해야 합니다.

```js
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  // config 객체를 주입합니다.
  private retryConfig: RetryApiConfig = inject(RETRY_INTERCEPTOR_CONFIG);

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // 생략
  );

  // 병합된 객체를 가져옵니다.
  private getConfig(request: HttpRequest<unknown>): Required<RetryApiConfig> {
    return {
      count:
        request.context.get(RETRY_INTERCEPTOR_CONTEXT)?.count ??
        this.retryConfig.count ??
        COUNT_DEFAULT,
      delay:
        request.context.get(RETRY_INTERCEPTOR_CONTEXT)?.delay ??
        this.retryConfig.delay ??
        DELAY_DEFAULT,
      timeout:
        request.context.get(RETRY_INTERCEPTOR_CONTEXT)?.timeout ??
        this.retryConfig.timeout ??
        TIMEOUT_DEFAULT,
    };
  }
}
```

context 토큰은 요청에서 검색됩니다. 먼저 context를 확인한 후 토큰 설정을 마지막으로 기본 설정을 확인하는 절차를 따릅니다.




![이미지](/assets/img/2024-05-13-ConfigurableRetryInterceptorinAngularForHTTPCalls_1.png)

이로써 HTTP 호출에 대한 완전히 구성 가능한 재시도 메커니즘을 완성했습니다.

지금까지 읽은 것이 마음에 든다면 박수 한 번 쳐주세요! 마음에 들지 않는다면 댓글을 남겨주세요😋!

연결하고 싶으시다면? LinkedIn



혹시 기부를 하고 싶으시다면, 커피 하나로 감사의 마음을 전해보세요! ☕️

# 스택캇 🎓

마지막까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 응원하고 팔로우해주시면 감사하겠습니다! 👏
- 저희를 팔로우해주세요 X | LinkedIn | YouTube | Discord
- 다른 플랫폼에서도 만나보세요: In Plain English | CoFeed | Venture | Cubed
- 더 많은 콘텐츠는 Stackademic.com에서 확인해주세요