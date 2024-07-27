---
title: "Angular 18의 새로운 기능 정리 비교"
description: ""
coverImage: "/assets/img/2024-05-12-Angular18NewFeatures_0.png"
date: 2024-05-12 23:30
ogImage:
  url: /assets/img/2024-05-12-Angular18NewFeatures_0.png
tag: Tech
originalTitle: "Angular 18 New Features"
link: "https://medium.com/@sergey.dudik/angular-18-new-features-babdeb6bc84e"
---

<img src="/assets/img/2024-05-12-Angular18NewFeatures_0.png" />

웹 어플리케이션을 구축하기 위한 주요 프레임워크 중 하나인 Angular은 현대 웹 개발 요구 사항을 충족하기 위해 지속적으로 발전해 왔습니다. 각 버전마다 새로운 기능, 최적화, 개선 사항을 가져왔습니다. 커뮤니티는 Angular 18의 릴리즈를 열심히 기다리며, 다음 주요 버전에서 기대할 수 있는 것을 살펴보겠습니다.

Angular 18은 2024년 5월에 발매 예정이며, 이미 다가오는 버전에 포함될 확정된 여러 기능이 있어서 이번 버전에서 논의할 수 있습니다.

# 함수를 이용한 경로 리디렉션

Angular 18에서는 리디렉트를 관리하는 새로운 기능이 도입되었습니다. 이제 라우트 객체의 redirectTo 속성 내에서 리디렉트 URL을 지정하기 위해 문자열 대신 함수를 사용할 수 있습니다. 이 향상된 기능은 라우팅에서 더 많은 유연성을 제공하며 새로운 가능성을 열어줍니다.

해당 함수 내에서는 URL 정보를 포함하는 객체에 액세스가 허용됩니다.

```js
//
export const routes: Routes = [
  {
    path: "page1",
    redirectTo: "/page2",
    pathMatch: "full",
  },
];

//redirectTo function
export const routes: Routes = [
  {
    path: "page1",
    redirectTo: (url) => {
      return "/page2";
    },
    pathMatch: "full",
  },
];
```

함수는 문자열 또는 UrlTree를 반환해야 합니다. Angular에서 UrlTree는 URL을 나타내는 데이터 구조입니다. 이는 Angular 라우터가 응용 프로그램 내에서 탐색하는 데 사용하는 URL의 구문 분석된 표현입니다. UrlTree에는 URL 세그먼트, 쿼리 매개변수 및 조각과 같은 정보가 캡슐화되어 있습니다. 이는 Angular의 라우팅 시스템에서 URL 조작, 탐색 및 라우팅 가드와 같은 작업에 일반적으로 사용됩니다. UrlTree를 사용함으로써 Angular은 응용 프로그램 내에서 일관된 신뢰할 수 있는 탐색 동작을 보장합니다.

“url" 객체에는 라우트에 관한 모든 정보가 포함되어 있습니다. 이 정보에는 데이터, 제목, 쿼리 매개변수, 라우팅 세그먼트 등이 포함됩니다.

# 새로운 RedirectCommand

Angular 버전 18에서는 NavigationExtras를 처리하기 위해 설계된 새 RedirectCommand 클래스가 소개되었습니다. 이 추가로 Guards 및 Resolvers 내에서 향상된 리디렉션 기능을 구현할 수 있습니다. RedirectCommand 클래스의 통합은 유지보수성과 유연성을 크게 향상시키며, Angular 애플리케이션에서 복잡한 네비게이션 패턴을 보다 쉽게 관리할 수 있습니다.

```js
const route: Route = {
  path: "page1",
  component: PageComponent,
  canActivate: [
    () => {
      const router: Router = inject(Router);
      const urlTree: UrlTree = router.parseUrl("./page2");
      return new RedirectCommand(urlTree, { skipLocationChange: true });
    },
  ],
};
```

# ng-content 기본 콘텐츠

이제는 ng-content 태그에 기본 콘텐츠를 넣을 수 있습니다. 이 기능은 ng-content 요소의 논리적 확장입니다. 콘텐츠를 위한 태그가 있는 경우, 기본 콘텐츠도 해당 태그 자체에 포함되어야 합니다.

예를 들어, 템플릿에서 ng-content가 포함된 컴포넌트가 있다면 제공된 콘텐츠가 없을 경우 렌더링될 기본 콘텐츠도 포함할 수 있습니다.

```js
<div>
  <h1>헤더</h1>
  <ng-content>기본</ng-content>
</div>
```

# Zoneless applications

Signals의 주요 목표 중 하나는 zone.js 없이 응용 프로그램이 작동할 수 있도록 하는 것입니다. 초기에는 이 것이 Signal Components를 통해서만 가능했을 것입니다. 그러나 그 이후에 상황이 변화했습니다. 이제 Angular 18부터는 Signal Components를 사용하지 않고도 이것을 달성할 수 있을 것입니다. Angular 18은 다음 달에 발표될 예정입니다.

Matthieu Riegler와 Enea Jahollari는 이 주제에 집중한 각각의 기사를 게시했습니다.

Matthieu의 기사는 새로운 하이브리드 변경 감지 시스템을 탐구하며, 어느 Signal 변경, 비동기 파이프 또는 markForCheck를 호출하는 다른 작업이 zone.js 외부에서 발생하더라도(예외적인 상황) 이제 자동으로 변경 감지가 트리거될 것이라고 합니다.

Enea의 글은 zone.js를 완전히 비활성화하고 응용 프로그램 상태 변경을 관리하는 데 이러한 새로운 트리거 메커니즘에만 의존하는 과정을 논의합니다.

# 읽어 주셔서 감사합니다!

여러분의 생각을 듣고 싶어요. 그러니 자유롭게 댓글을 남겨주시거나 박수를 보내거나 팔로우해 주세요. 👏

이 글이 마음에 들었다면, 여러분의 커뮤니티, 기술 친구 및 흥미를 가질 것으로 생각되는 다른 사람들과 공유하는 것도 생각해보세요. LinkedIn에서도 제 소식을 더 받아보기 위해 팔로우를 잊지 말아주세요!
