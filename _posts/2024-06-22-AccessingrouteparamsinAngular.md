---
title: "Angular에서 경로 매개변수 접근하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-AccessingrouteparamsinAngular_0.png"
date: 2024-06-22 15:15
ogImage:
  url: /assets/img/2024-06-22-AccessingrouteparamsinAngular_0.png
tag: Tech
originalTitle: "Accessing route params in Angular"
link: "https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617"
isUpdated: true
---

![Route Parameters](/assets/img/2024-06-22-AccessingrouteparamsinAngular_0.png)

라우트에서 매개변수를 읽어야 하는 다양한 시나리오가 있을 수 있습니다. 이러한 매개변수는 쿼리 매개변수(예: test?username=...) 또는 라우트 매개변수(예: test/:testId)일 수 있습니다.

또한 Angular 라우팅의 Route 개체 내부에 있는 데이터 속성을 통해 아래와 같이 사용자가 원하는 값도 전달할 수 있습니다:

```js
export const appRoutes: Route[] = [
  {
    path: "test/:testId",
    loadComponent: () => import("./test.component"),
    data: {
      permission: "admin",
    },
  },
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

# ActivatedRoute

모든 상황에서는 컴포넌트에 ActivatedRoute를 주입하여 시작해야 합니다. 이 클래스는 컴포넌트가 정의된 라우트에 대한 액세스를 제공합니다.

```js
private activatedRoute = inject(ActivatedRoute);
```

이 클래스 내에서 두 가지 옵션으로 라우트 매개변수를 검색할 수 있습니다.

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

## 스냅샷

첫 번째 옵션은 스냅샷 객체를 사용하는 것입니다. 이름에서 알 수 있듯이 경로 상태의 스냅샷을 가져와 작업할 수 있습니다.

```js
testId = this.activatedRoute.snapshot.params["testId"];
permission = this.activatedRoute.snapshot.data["permission"];
user = this.activatedRoute.snapshot.queryParams["user"];
```

스냅샷 객체를 사용하면 정적 값이 제공되므로 매개변수가 변경되어도 구성 요소를 다시로드하지 않는 한 알림을받지 못할 것입니다.

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

일반적으로 다음 옵션을 선택하는 것이 더 안전하다고 생각됩니다:

## Observable

또는 각 매개변수를 observable로 리스닝할 수 있습니다. 조금 더 복잡하게 느껴질 수 있지만, 값이 변경될 때 알림을 받을 수 있는 장점을 제공합니다.

```js
testId$ = this.activatedRoute.params.pipe(map((p) => p["testId"]));
permission$ = this.activatedRoute.data.pipe(map((d) => d["permission"]));
user$ = this.activatedRoute.queryParams.pipe(map((q) => q["user"]));
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

서포터블을 사용하면 asyncPipe 또는 subscribe 함수를 사용하여 이러한 스트림을 구독하고 매개변수 값이 변경될 때 알림을 받을 수 있습니다.

이를 통해 컴포넌트에서 더 동적이고 반응적인 동작이 가능해집니다.

# Ngrx Router Store

당신의 애플리케이션에서 Ngrx를 사용하고 있다면 Selector를 통해 라우트 매개변수를 검색하는 데 관심이 있을 수 있습니다.

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

먼저, @ngrx/router-store npm 패키지를 추가하고 main.ts 파일의 bootstrapApplication 함수에 포함해야 합니다:

```js
import { provideStore } from "@ngrx/store";
import { provideRouterStore, routerReducer } from "@ngrx/router-store";

import { AppComponent } from "./app.component";

bootstrapApplication(AppComponent, {
  providers: [
    //...
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
  ],
});
```

다음으로 Ngrx는 사용할 수 있는 다양한 셀렉터를 가진 getRouterSelector 함수를 제공합니다. 이를 다음과 같이 구조분해할 수 있습니다:

```js
import { getRouterSelectors, RouterReducerState } from "@ngrx/router-store";

// 다른 셀렉터도 사용할 수 있습니다:
// https://next.ngrx.io/guide/router-store/selectors
export const { selectQueryParam, selectRouteParam, selectRouteDataParam } = getRouterSelectors();
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

컴포넌트 내부에서 다음과 같이 라우트 매개변수 속성에 액세스할 수 있습니다:

```js
testId$ = this.store.select(selectRouteParam("testId"));
permission$ = this.store.select(selectRouteDataParam("permission"));
user$ = this.store.select(selectQueryParam("user"));
```

이렇게 하면 옵저버블이 생성되며, 알림을 받기 위해 구독해야 합니다.

# Angular v16에서 RouterInput

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

Angular v16은 개발 경험 (DX)을 향상시키기 위해 많은 새로운 기능이 포함된 채로 출시되었어요. 그 중 하나는 RouterInput이라는 기능인데, 이를 통해 입력을 통해 경로 정보를 검색할 수 있습니다.

RouterInput을 활용하기 위해서는 main.ts 파일에서 라우트 제공자를 다음과 같이 업데이트해야 해요:

```js
import { provideRouter, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent,
  providers: [provideRouter(appRoutes,
      withComponentInputBinding() // 👈
    )]
)
```

업데이트된 라우트 제공자로, 이제 컴포넌트에서 입력 바인딩을 통해 라우트 매개변수를 수신할 수 있어요:

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

```typescript
@Input() testId!: string;
@Input() permission!: string;
@Input() user!: string;
```

참고사항:

- testId 입력 값이 변경되면 컴포넌트가 알림을 받습니다 (옵저버블 스트림으로).
- 라우터 입력 값은 라우트된 컴포넌트 내에서만 액세스할 수 있습니다. 자식 컴포넌트 내에서 이러한 매개변수에 액세스해야 하는 경우, 앞에서 언급한 방법 중 하나를 사용하거나 부모 및 자식 컴포넌트 사이의 입력 바인딩을 통해 입력을 전달할 수 있습니다.
- 더 구체적인 데코레이터 이름을 선호하는 경우 다음과 같이 정의에서 재매핑할 수 있습니다:

```typescript
import { Input as RouterInput } from "@angular/core";

export class Component {
  @RouterInput() testId!: string;
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

Angular 챌린지 #22에서 새로운 기술을 탐험하고 테스트해보세요. 이 프로젝트의 기능을 실험해보며 즐기세요.

저는 Medium, Twitter 또는 Github에서 만날 수 있습니다. 궁금한 점이 있다면 언제든지 연락 주세요.
