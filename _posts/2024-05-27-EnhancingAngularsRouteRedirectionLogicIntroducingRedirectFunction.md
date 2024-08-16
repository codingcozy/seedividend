---
title: "Angular의 경로 리다이렉션 로직을 개선하는 방법 RedirectFunction 소개"
description: ""
coverImage: "/assets/img/2024-05-27-EnhancingAngularsRouteRedirectionLogicIntroducingRedirectFunction_0.png"
date: 2024-05-27 18:59
ogImage: 
  url: /assets/img/2024-05-27-EnhancingAngularsRouteRedirectionLogicIntroducingRedirectFunction_0.png
tag: Tech
originalTitle: "Enhancing Angular’s Route Redirection Logic: Introducing RedirectFunction"
link: "https://medium.com/netanelbasal/enhancing-angulars-route-redirection-logic-introducing-redirectfunction-245a45add387"
isUpdated: true
---




<img src="/assets/img/2024-05-27-EnhancingAngularsRouteRedirectionLogicIntroducingRedirectFunction_0.png" />

최근 업데이트에서 Angular는 RedirectFunction을 통해 유연한 경로 리다이렉션 접근 방식을 소개하여 라우팅 기능을 크게 개선했습니다. 이 새로운 기능을 통해 개발자는 문자열이나 UrlTree를 반환할 수 있는 함수를 사용하여 리디렉션을 정의할 수 있어 라우팅 로직에서 향상된 제어와 다양성을 제공합니다.

# RedirectFunction 이해하기

Angular에서의 전통적인 접근 방식은 Route.redirectTo 속성 내에서 직접 문자열 경로를 지정하는 것이었습니다. 효과적이지만, 이 방법은 특히 라우트 매개변수와 데이터를 기반으로 동적으로 리디렉션 경로를 생성하는 능력에서 한계가 있었습니다. 새로운 RedirectFunction은 이러한 제한을 극복하여 함수가 리디렉트 대상을 결정할 수 있도록 합니다.

<div class="content-ad"></div>

리다이렉트 기능의 주요 특징:

- 동적 리다이렉트: 이 기능은 이전의 정적 리다이렉트와 유사하게 문자열을 반환하거나 더 복잡하고 절대적인 리다이렉트를 가능하게 하는 UrlTree를 반환할 수 있습니다.
- 라우트 파라미터 및 데이터에 접근: 이전 방법과 달리, 개발자는 현재 라우트에서만 파라미터와 데이터에 액세스할 수 있었지만 RedirectFunction을 사용하면 일치하는 부모 라우트에서 파라미터와 데이터에 액세스할 수 있습니다. 이는 라우트 매칭 과정 중에 파라미터 및 데이터를 집계함으로써 달성됩니다.
- 개선된 컨텍스트 인식: 매치 중에 params와 데이터를 상속받음으로써 함수는 보다 광범위한 컨텍스트를 활용하여 더 더욱 정보에 기반한 리다이렉션 결정을 내릴 수 있습니다.

# 제약 사항 및 고려 사항:

- RedirectFunction은 전체 ActivatedRouteSnapshot 인터페이스를 제공하지 않습니다. 해결된 제목이나 레이지로드된 컴포넌트와 같은 특정 속성들은 라우트 매칭 단계에서 사용할 수 없습니다. 사용 가능한 속성은 다음과 같습니다: routeConfig, url, params, queryParams, fragment, data, outlet, title.
- 전체 라우트 트리에 의존하는 속성(예: root, parent, pathFromRoot, firstChild, children)은 아직 전체 라우트 매칭이 이루어지지 않았기 때문에 제외됩니다.

<div class="content-ad"></div>

# 실용적인 예시

검색 쿼리 매개변수에 기반하여 사용자를 리디렉션해야 하는 시나리오를 고려해보세요. 새로운 RedirectFunction을 사용하면 이를 매끄럽게 구현할 수 있습니다:

```js
export const routes: Routes = [
  {
    path: 'search',
  redirectTo: ({ queryParams }) => {
    const router = inject(Router);
    const searchQuery = queryParams['q'];

    return searchQuery
      // UrlTree 반환
      ? router.createUrlTree(['/results'], {
          queryParams: { q: searchQuery },
        })
     // 또는 문자열
      : 'home';
  },
},
{
  path: 'results',
  component: ResultsComponent,
},
{
  path: 'home',
  component: HomeComponent,
},
];
```

이 예시에서 redirectTo 함수는 검색 쿼리 매개변수가 있는 경우 동적으로 사용자를 리디렉션하는 UrlTree를 생성합니다. 검색 쿼리가 있는 경우 쿼리 매개변수를 포함하여 결과 페이지로 리디렉션하고, 없는 경우 홈 페이지로 리디렉션합니다.

<div class="content-ad"></div>

## 결론

Angular의 RedirectFunction 소개는 프레임워크의 라우팅 기능을 크게 향상시킨 것으로 평가됩니다. 이 업데이트는 라우트 컨텍스트에 더 많은 유연성과 접근성을 제공하여, 개발자들이 더 동적이고 컨텍스트에 민감한 리디렉션을 만들 수 있게 해주며, 결과적으로 Angular 애플리케이션의 전반적인 사용자 경험을 향상시킵니다.

Angular와 JS에 대해 더 많은 내용을 읽으려면 Medium나 Twitter에서 저를 팔로우해주세요!