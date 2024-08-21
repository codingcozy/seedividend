---
title: "앵귤러에서의 기능적인 라우트 가드"
description: ""
coverImage: "/assets/img/2024-06-20-FunctionalRouteGuardsinAngular_0.png"
date: 2024-06-20 05:41
ogImage:
  url: /assets/img/2024-06-20-FunctionalRouteGuardsinAngular_0.png
tag: Tech
originalTitle: "Functional Route Guards in Angular"
link: "https://medium.com/ngconf/functional-route-guards-in-angular-8829f0e4ca5c"
isUpdated: true
---

<img src="/assets/img/2024-06-20-FunctionalRouteGuardsinAngular_0.png" />

# tldr;

Angular v14.2에서 기능적 라우트 가드가 도입되어 Angular 애플리케이션의 일부를 보호하는 새로운 방법이 소개되었습니다. 이전에는 라우트 가드를 작성하는 유일한 방법이 클래스 기반 가드를 사용하는 것이었습니다. 클래스 기반 가드는 잘 작동했지만 사용하려면 많은 추가 설정이 필요했습니다.

기능적 라우트 가드는 하나의 함수만 필요로 하며 별도의 파일에 작성하거나 필요한 경우 라우트에 대해 인라인으로 작성할 수 있습니다. 이 글에서는 라우트 가드의 몇 가지 예시를 보여드리겠지만, 더 중요한 것은 기능적 라우트 가드에 대한 테스트를 작성하는 방법을 보여드릴 것입니다. 클래스 기반 가드를 기능적으로 변환하는 작업 중에 가드를 테스트하는 방법에 대한 정보를 찾을 수 없어 고민했는데, 이 글이 다른 이들을 위한 안내서 역할을 해줄 것을 바랍니다.

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

# 기능적 가드 작성하기

많은 면에서 기능적 라우트 가드를 작성하는 것이 이전보다 훨씬 쉽습니다. 인터페이스를 구현할 필요도 없고 그러한 것을 기억할 필요도 없습니다. 필요한 것은 함수를 반환하는 함수뿐입니다. 내부 함수는 CanMatchFn 또는 CanActivateFn과 같은 특정 타입의 함수입니다. 그러나 당신이 반환하는 함수의 타입을 정확히 알 필요는 없습니다. 여기에 canActivate 가드로 사용할 수 있는 매우 간단한 가드의 예가 있습니다:

```js
export function authenticationGuardArrow = () => inject(AuthService).isAuthenticated()
```

이 가드에서는 AuthService를 주입하고 isAuthenticated 메서드를 호출하여 사용자가 지정된 경로로 계속 진행할 수 있는지 확인합니다. 이 경우 가드의 내부 메서드에서 반환되는 함수의 타입이 명시적으로 정의되지 않았다는 점을 주목해 주세요.

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

여기에는 인증 가드의 명확한 버전이 있어요:

```js
export function authenticationGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);

    if (oauthService.hasAccess()) {
      return true;
    }
    oauthService.login();
    return false;
  };
}
```

이 가드의 버전에서는 사용자가 액세스 권한이 있는지 확인합니다. 권한이 있는 경우 경로로 계속합니다. 사용자에게 액세스 권한이 없는 경우에는 로그인 플로우를 시작하고 경로로 이동을 막습니다. CanActivateFn에는 ActivatedRouteSnapshot와 RouterStateSnapshot이라는 두 가지 선택적 매개변수가 있습니다. 이 매개변수들을 사용하지 않기 때문에 포함되지 않았습니다.

함수형 라우트 가드를 사용하는 또 다른 쉬운 방법은 라우트 가드로 데이터를 전달해야 할 때입니다. 이 예시에서는 어떤 플래그를 확인해야 하는지와 필요한 경우 리디렉션할 위치를 알아야 하는 피처 플래그 가드를 살펴봅시다:

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

```ts
export function featureFlagGuard(flagName: string, redirectRoute: string): CanActivateFn {
  return () => {
    const featureFlagsService: FeatureFlagsService = inject(FeatureFlagsService);
    const router: Router = inject(Router);
    const isFlagEnabled = featureFlagsService.isFeatureEnabled(flagName);

    return isFlagEnabled || router.createUrlTree([redirectRoute]);
  };
}
```

이 경우, featureFlagGuard는 두 가지 인수를 취하는데요, 확인할 플래그와 리디렉션 경로입니다. 플래그가 활성화되어있으면 사용자는 경로로 이동할 수 있습니다. 그렇지 않으면 제공된 경로로 리디렉션됩니다.

이전에는 클래스 기반 경로의 경우이 유형의 가드를 사용하려면 매개변수를 라우트 데이터 객체에 전달해야 했습니다. 이 방법이 훨씬 간단하며 그게 무슨 일이 벌어지고 있는지 더 명확합니다.

# 라우트에 함수형 라우트 가드 추가하기

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

한 번 함수형 라우트 가드를 작성했다면, 주어진 라우트에 적용해야 합니다. 좋은 점은 클래스 기반 라우트와 본질적으로 동일하다는 것입니다. 그러나 약간의 차이가 있습니다. 만약 당신의 함수가 위에서 보여준 authenticationGuardArrow 함수처럼 보인다면, 다음과 같이 라우트에 추가할 수 있습니다:

```js
const routes: Route[] = [{ path: "home", component: HomeComponent, canActivate: [authenticationGuardArrow] }];
```

이 예제에서 이전에 했던 것과 거의 같아 보입니다. 가드는 그냥 canActivate 배열에 추가됩니다. 가드가 화살표 함수를 반환하기 때문에, 가드는 자동으로 호출됩니다. 그러나 위에서 언급한 다른 두 가드에서는 함수를 명시적으로 호출해야 합니다.

```js
const routes: Route[] = [
  { path: "home", component: HomeComponent, canActivate: [authenticationGuard()] },
  { path: "feature", component: HomeComponent, canActivate: [featureFlagGuard("checkFlag", "/home")] },
];
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

이 예제에서는 이전과 같이 구성 요소에 가드를 추가하지만, 실제로 실행하려면 해당 함수를 호출해야 합니다.

클래스를 기반으로 하는 가드와 마찬가지로 이러한 새로운 함수형 가드도 부울값, UrlTrees, Promises 및 Observables를 반환할 수 있습니다.

# 라우트 가드 테스트

가드를 작성한 다음의 다음 단계는 해당 가드에 대한 테스트를 추가하는 것입니다. 여기서 조금 막혔다가 다른 사람들에게 도움이 될 것 같아요. 이러한 테스트는 새로운 RouterTestingHarness를 사용하므로 Angular v15.2 이상이 필요합니다.

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

새로운 RouterTestingHarness를 사용하면 테스트가 실제 라우터가 생성된 것처럼 작동하며, 경비를 선언하고 특정 경로에 도달할 수 있는지 여부를 확인할 수 있습니다. 이를 위해서는 일반적으로 Angular 단위 테스트를 작성할 때 사용하지 않는 TestBed 사용이 필요합니다. 하지만 실제로 매우 부드럽고 사용하기 쉽습니다.

위 경비에 대해 작성한 테스트의 몇 가지 예시를 제공하겠습니다. 이를 참고로 사용할 수 있습니다.

```js
// authentication.guard.spec.ts

@Component({ standalone: true, template: "" })
class DashboardComponent {}
describe("AuthenticationGuard", () => {
  let routes: Route[];

  beforeEach(() => {
    routes = [
      {
        path: "dashboard",
        canActivate: [AuthenticationGuard()],
        component: DashboardComponent,
      },
    ];
  });

  it("should initiate the login flow if there is no valid token", async () => {
    const mockOAuthService = {
      hasValidAccessToken: jest.fn().mockReturnValue(false),
      initCodeFlow: jest.fn(),
    };
    const mockAuthRedirectService = { saveRoute: jest.fn() };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService },
        { provide: AuthRedirectService, useValue: mockAuthRedirectService },
        provideRouter(routes),
      ],
    });
    await RouterTestingHarness.create("/dashboard");
    expect(mockOAuthService.initCodeFlow).toHaveBeenCalled();
    expect(mockAuthRedirectService.saveRoute).toHaveBeenCalledWith("/dashboard");
  });

  it("should allow access to the dashboard if the token is valid", async () => {
    const mockOAuthService = {
      hasValidAccessToken: jest.fn().mockReturnValue(true),
      initCodeFlow: jest.fn(),
    };
    const mockAuthRedirectService = { saveRoute: jest.fn() };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService },
        { provide: AuthRedirectService, useValue: mockAuthRedirectService },
        provideRouter(routes),
      ],
    });
    await RouterTestingHarness.create("/dashboard");
    expect(TestBed.inject(Router).url).toEqual("/dashboard");
  });

  it("should allow access to the dashboard if the token is not valid but there is a code query param", async () => {
    const mockOAuthService = {
      hasValidAccessToken: jest.fn().mockReturnValue(false),
      initCodeFlow: jest.fn(),
    };
    const mockAuthRedirectService = { saveRoute: jest.fn() };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService },
        { provide: AuthRedirectService, useValue: mockAuthRedirectService },
        provideRouter(routes),
      ],
    });
    await RouterTestingHarness.create("/dashboard?code=1234");
    expect(TestBed.inject(Router).url).toEqual("/dashboard?code=1234");
  });
});
```

다음으로 여기에는 기능 플래그 가드에 대한 테스트가 있습니다:

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
@Component({ standalone: true, template: "" })
class AdminComponent {}
@Component({ standalone: true, template: "" })
class LoginComponent {}

describe("FeatureFlagGuard", () => {
  let routes: Route[];
  let httpMock: HttpTestingController;

  beforeEach(() => {
    routes = [
      {
        path: "test",
        canActivate: [FeatureFlagGuard("test", "/")],
        component: AdminComponent,
      },
      { path: "home", component: LoginComponent },
    ];
  });

  it("should route back to the home route if the flag is not present and it defaults to off", async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedUtilitiesFeatureFlagsModule.forRoot({
          defaultToFlagOff: true,
          jsonUrl: "/assets/test.config.json",
        }),
      ],
      providers: [provideRouter(routes)],
    });
    httpMock = TestBed.inject(HttpTestingController);
    const mockRequest = httpMock.expectOne("/assets/test.config.json");
    mockRequest.flush({});
    await RouterTestingHarness.create("/test");
    expect(TestBed.inject(Router).url).toEqual("/");
  });

  it("should route to the test route if the flag is not present and it does not default to off", async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedUtilitiesFeatureFlagsModule.forRoot({
          defaultToFlagOff: false,
          jsonUrl: "/assets/test.config.json",
        }),
      ],
      providers: [provideRouter(routes)],
    });
    httpMock = TestBed.inject(HttpTestingController);
    const mockRequest = httpMock.expectOne("/assets/test.config.json");
    mockRequest.flush({});
    await RouterTestingHarness.create("/test");
    expect(TestBed.inject(Router).url).toEqual("/test");
  });

  it("should route to the test route if the flag is turned on", async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedUtilitiesFeatureFlagsModule.forRoot({
          defaultToFlagOff: true,
          jsonUrl: "/assets/test.config.json",
        }),
      ],
      providers: [provideRouter(routes)],
    });
    httpMock = TestBed.inject(HttpTestingController);
    const mockRequest = httpMock.expectOne("/assets/test.config.json");
    mockRequest.flush({ test: true });
    await RouterTestingHarness.create("/test");
    expect(TestBed.inject(Router).url).toEqual("/test");
  });

  it("should not route to the test route if the flag is turned off", async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedUtilitiesFeatureFlagsModule.forRoot({
          defaultToFlagOff: true,
          jsonUrl: "/assets/test.config.json",
        }),
      ],
      providers: [provideRouter(routes)],
    });
    httpMock = TestBed.inject(HttpTestingController);
    const mockRequest = httpMock.expectOne("/assets/test.config.json");
    mockRequest.flush({ test: false });
    await RouterTestingHarness.create("/test");
    expect(TestBed.inject(Router).url).toEqual("/");
  });
});
```

이러한 테스트들은 테스트를 위한 라우팅 구성뿐만 아니라 필요할 때 주입된 서비스에 대한 가짜 값을 제공하기 위한 것을 보여줍니다. 가드가 작동하는지 여부를 확인하는 방법에 대한 예제도 볼 수 있습니다.

좋은 테스트 커버리지를 갖고 가드가 예상대로 작동하는지 확인하는 것은 앱의 유지관리에 매우 중요합니다. 이 내용이 다른 사람들이 애플리케이션을 개발하는 데 도움이 되기를 바랍니다.

# 주의사항

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

One red flag to be aware of is ensuring that the `inject` method is placed correctly. It should be used inside the inner `return` method, not the outer one:

```js
export function testGuard {
  // Don't use inject here

  return () => {
    // Use inject here
  }
}
```

If you use `inject` in the outer function, you may encounter an error as shown below:

<img src="/assets/img/2024-06-20-FunctionalRouteGuardsinAngular_1.png" />

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

# 결론

기능성 라우트 가드의 소개가 어떤 큰 변화인지 정말 확신이 없었지만, 이 방법으로 가드를 작성하는 것을 선호하는 것 같습니다. 중요한 점은 나는 이 방법을 선호하든 말든 중요하지 않습니다. 왜냐하면 클래스 기반 라우터는 폐기될 예정이기 때문입니다. 기능성 라우트 가드가 가까운 미래의 유일한 방법이 될 것입니다. 가드를 변환하는 데 미리 준비하는 것을 제안하며, 이 문서가 해당 작업에 도움이 되길 바랍니다.
