---
title: "Angular v18에서 RedirectCommand를 사용하여 Redirect Guards 및 Resolvers 다루기"
description: ""
coverImage: "/assets/img/2024-06-20-RedirectingGuardsandResolversinAngularv18withRedirectCommand_0.png"
date: 2024-06-20 03:05
ogImage:
  url: /assets/img/2024-06-20-RedirectingGuardsandResolversinAngularv18withRedirectCommand_0.png
tag: Tech
originalTitle: "Redirecting Guards and Resolvers in Angular v18 with RedirectCommand"
link: "https://medium.com/@davidepassafaro/redirecting-guards-and-resolvers-in-angular-v18-with-redirectcommand-7313100f85b0"
isUpdated: true
---

웹 개발의 현대 시대에서는 동적이고 인터랙티브한 애플리케이션을 만드는 것이 일반적입니다. 특정 사용자에게 독점적이거나 특정 조건에서 사용 가능한 기능을 구현하는 것은 매우 복잡한 도전일 수 있습니다.

그래서 Angular는 Routes, rules, 그리고 components에 기반한 라우팅 시스템을 제공하여 쉽게 애플리케이션을 디자인할 수 있게 합니다.

이 글에서는 Angular v18에서 소개된 새로운 기능을 사용하여 사용자를 다른 곳으로 리디렉션하는 Routes를 보호하는 방법에 대해 논의할 것입니다.

그러나 진행하기 전에 Angular 라우터에 대해 간단히 리뷰해보겠습니다...

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

# Angular 라우터 가드 및 리졸버

Angular 라우터 라이브러리를 사용하면 Angular 애플리케이션 내에서 네비게이션을 관리할 수 있으며 Routes 목록을 정의할 수 있습니다.

각 Route는 접근 경로, 로드할 Angular 컴포넌트, 하위 Routes 등과 같은 일련의 정보로 정의됩니다.

```js
import { Route } from "@angular/router";
import { MyFeatureComponent, MyFeatureGuard } from "./my-feature";

const routes: Route[] = [
  {
    path: "my-feature",
    component: MyFeatureComponent,
    canActivate: [MyFeatureGuard],
    data: {
      id: "my-feature-id",
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

하나 이상의 루트를 보호하여 특정 조건에 따라 접근 또는 빠져나갈 수 있습니다. 이는 가드라고 불리는 함수를 사용합니다.

```js
import { Route } from '@angular/router';
import { MyService } from './my-feature';

const myRoute: Route = [
  path: 'my-feature',
  canMatch: [() => inject(MyService).canMatch()],
  canActivate: [() => inject(MyService).canActivate()],
  canActivateChild: [() => inject(MyService).canActivateChild()],
  canDeactivate: [() => inject(MyService).canDeactivate()],
];
```

Angular 가드에는 다음과 같이 네 가지 유형이 있습니다. 각각의 역할은 다릅니다:

- canMatch: 루트가 로드될 수 있는지 확인하는 데 사용됩니다. 하나의 경로에 대해 여러 루트를 정의하고 특정 조건에 따라 하나만 선택하려면 이 가드를 사용할 수 있습니다.
- canActivate: 특정 루트를 활성화할 수 있는지 여부를 결정하는 데 사용됩니다. 예를 들어, 특정 사용자만 접근할 수 있는 페이지에 대한 액세스를 제어하는 데 사용할 수 있습니다.
- canActivateChild: canActivate와 유사하지만, 주 루트의 자식 루트에 대한 액세스도 제어합니다. 다른 자식 루트에서 시작되었더라도 모든 자식 루트로의 네비게이션에 대해 실행됩니다.
- canDeactivate: 사용자가 특정 루트에서 빠져나갈 수 있는지를 확인하는 데 사용됩니다. 예를 들어 페이지를 떠날 때 확인을 요청하는 데 사용할 수 있습니다.

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

더불어 Route에 데이터를 준비하기 위해 Resolver 함수를 사용할 수 있습니다:

```js
import { Route } from '@angular/router';
import { MyService } from './my-feature';

const myRoute: Route = [
  path: 'my-feature',
  resolve: {
    user: () => inject(MyService).getUserInfo(),
    config: () => inject(MyService).getUserConfig()
  }
];
```

Resolver를 사용하는 것은 Route에 액세스하기 전에 데이터의 존재 여부를 보장하고 페이지에서 누락된 데이터를 처리하지 않도록 하는 훌륭한 접근 방식입니다.

<img src="/assets/img/2024-06-20-RedirectingGuardsandResolversinAngularv18withRedirectCommand_0.png" />

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

기초 사항을 다루었으니 이제 라우트를 보호하기 위해 사용자를 다른 곳으로 리디렉션하는 방법을 살펴보겠습니다.

# 가드(Guards) 및 리졸버(Resolvers) 사용하여 네비게이션을 리디렉트하기

Angular 가드(Guards)를 사용하면 하나 이상의 라우트 접근 또는 종료를 막아 네비게이션을 차단할 수 있습니다.

그러나 더 부드러운 사용자 경험을 보장하기 위해서는 종종 사용자를 다른 라우트로 리디렉트하는 것이 선호됩니다.

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

가드 덕분에 매우 쉽게 이것을 달성할 수 있습니다. 현재 내비게이션을 차단하기 전에 새로운 내비게이션을 시작할 수 있습니다.

```js
import { inject } from "@angular/core";
import { Route, Router } from "@angular/router";
import { MyPage } from "./pages/my-page";

const route: Route = {
  path: "my-page",
  component: MyPage,
  canActivate: [
    () => {
      const router = inject(Router);

      router.navigate(["./my-other-page"]);
      return false;
    },
  ],
};
```

Resolver를 사용하여 비슷한 결과를 얻을 수도 있습니다. Resolver를 이용하여 내부에서 새로운 내비게이션을 시작할 수 있습니다.

```js
import { Route, Router } from '@angular/router';
import { MyService } from './my-feature';

const myRoute: Route = [
  path: 'my-feature',
  resolve: {
    user: () => {
      const router = inject(Router);

      router.navigate(['./my-other-page']);
      return null;
    }
  }
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

## UrlTree를 사용한 Redirect

또 다른 방법으로, Guards와 Resolvers를 사용하여 새로운 Route를 나타내는 UrlTree를 반환함으로써 네비게이션을 리다이렉트할 수 있습니다:

```js
import { inject } from "@angular/core";
import { Route, Router, UrlTree } from "@angular/router";
import { MyPage } from "./pages/my-page";

const route: Route = {
  path: "my-page",
  component: MyPage,
  canActivate: [
    () => {
      const router: Router = inject(Router);

      const urlTree: UrlTree = router.parseUrl("./my-other-page");
      return urlTree;
    },
  ],
};
```

그러나 이 기술은 이전 기술이 허용하는 NavigationExtras를 사용하여 네비게이션을 리다이렉트하는 것을 허용하지는 않습니다:

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
canActivate: [
  () => {
    const router = inject(Router);

    router.navigate(["./my-other-page"], { skipLocationChange: true });
    return false;
  },
];
```

## Redirect with RedirectCommand

해결책으로 Angular v18에서는 NavigationExtras를 처리할 수 있는 새로운 RedirectCommand 클래스를 소개했습니다. 이를 통해 Guards 및 Resolvers에서 네비게이션을 리다이렉트할 수 있습니다:

```js
import { inject } from "@angular/core";
import { RedirectCommand, Route, Router, UrlTree } from "@angular/router";
import { MyPage } from "./pages/my-page";

const route: Route = {
  path: "my-page",
  component: MyPage,
  canActivate: [
    () => {
      const router: Router = inject(Router);
      const urlTree: UrlTree = router.parseUrl("./my-other-page");

      return new RedirectCommand(urlTree, { skipLocationChange: true });
    },
  ],
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

이 새로운 RedirectCommand 클래스의 도입은 가드 및 리졸버의 유지 보수성을 크게 향상시킵니다.

![RedirectingGuardsandResolversinAngularv18withRedirectCommand_1](/assets/img/2024-06-20-RedirectingGuardsandResolversinAngularv18withRedirectCommand_1.png)

특히 이러한 사용 사례에 특별히 설계된 이 클래스는 앞으로 필요한 새로운 매개변수에 쉽게 대응할 수 있습니다.

# 지금까지 읽어 주셔서 감사합니다 🙏

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

피드백을 주실 수 있다면 댓글을 남겨주세요. 👏

그리고 정말 좋았다면 꼭 여러분의 커뮤니티, 기술 관련 그룹, 원하시는 분들과 공유해주세요. 그리고 LinkedIn 팔로우도 잊지마세요. 👋😁
