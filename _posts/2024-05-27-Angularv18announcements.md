---
title: "Angular v18 발표 내용 정리 "
description: ""
coverImage: "/assets/img/2024-05-27-Angularv18announcements_0.png"
date: 2024-05-27 18:57
ogImage: 
  url: /assets/img/2024-05-27-Angularv18announcements_0.png
tag: Tech
originalTitle: "Angular v18 announcements"
link: "https://medium.com/@hmidihamdi7/angular-v18-announcements-784bac2f55ab"
isUpdated: true
---




<img src="/assets/img/2024-05-27-Angularv18announcements_0.png" />

2024년 5월 26일, Angular 팀이 Angular 18 버전을 발표했어요. Angular 개발자로서 Angular이 새로운 반응형 시스템을 구축한 진전에 대해 너무 기대돼요. 그래서 이들의 발표를 함께 공유하려고 해요.

이번 새 릴리스는 Angular을 향상시켜 개발자 커뮤니티에 더 나은 서비스를 제공하고 웹을 발전시키기 위한 방법을 찾는 것을 목표로 하고 있어요. 이들의 향상 사항 중 일부를 나열하면:

- 템플릿 레벨의 지연 로딩과 defer 구문.
- 더 직관적인 제어 흐름.
- Angular 시그널을 활용한 반응성 개선.
- SSR(Server side rendering) 및 Hydration 지원을 포함해요.

<div class="content-ad"></div>

그리고 더 많은 개선 사항이 있습니다.

# 새로운 반응성 시스템 상태

가장 중요한 프로젝트부터 시작합니다. 그들의 반응성 시스템을 재설계하는 프로젝트가 시작되었습니다. 이 재설계 작업은 Angular v16부터 시작되었습니다.

이 프로젝트의 주요 목표는 Angular 애플리케이션에서 zone.js를 선택 사항으로 만드는 것입니다.

<div class="content-ad"></div>

이 질문에 대한 답변으로 Alex Rickabaugh는 zone.js로 구축된 응용 프로그램의 역호환성이 있다고 확인했습니다. 그리고 그들은 zone.js와 함께 반응성에 대한 성능 약점을 발견했으며 많은 유지 보수적인 도전 과제도 있었습니다. 또한 새로운 웹 API의 추가로 로딩 및 초기화 비용이 증가했습니다.

이후 Angular 팀은 다음 10년 동안 개발자의 요구를 충족시키고 웹 성능을 향상시킬 새로운 반응성 시스템에 투자하기로 결정했습니다.

Angular은 이미 Angular 16부터 새로운 반응성 시스템의 재설계를 시작했습니다. 시그널, 컴퓨티드 그리고 이펙트라는 세 가지 반응 API를 소개하여

Angular 17에서, 시그널, 컴퓨티드 그리고 이펙트는 안정된 API가 되었습니다. 이러한 API들은 새로운 반응성 시스템의 핵심이며, 우리가 사용함으로써 Angular이 응용 프로그램 상태에서 발생한 변경 사항을 이해하고 UI를 올바르고 효율적으로 업데이트할 수 있도록 할 것입니다.

<div class="content-ad"></div>

또한 Angular 팀은 NgXS 및 NgRx 팀에 접근하여 신호 API가 그들의 사용 사례를 지원하는지 확인했습니다. NgRx의 signal store의 통합은 이 협력의 열매입니다.

이 세 가지 API는 Angular에게 존을 사용하지 않고도 이 반응성 모델을 구축할 수 있는 기초를 제공합니다.

# 하이브리드 변경 감지

Angular 라이브러리 및 응용 프로그램을 존에서 독립적으로 사용할 수 있게 하기 위해 모든 구성 요소에 영향을 주지 않고 Angular 팀은 지난 여섯 달 동안 새로운 변경 감지 모드에 대해 작업해 왔습니다.

<div class="content-ad"></div>

이 모드의 목표는 정확성, 성능, 개발자 경험 및 하위 호환성을 균형있게 유지하는 것입니다.

이를 완전히 구현하는 데는 시간이 걸립니다. 또한, Angular 팀은 구글 Angular 애플리케이션에서 이러한 아이디어를 테스트하고 일부는 이미 제품에 적용되었습니다.

V18에서 새로운 변경 감지 모드의 두 가지 요소를 출시했습니다:

- 하이브리드 변경 감지 : V18에서 기본적으로 활성화되며, zone.js에 추가로 Angular은 신호도 감지하고 변경 감지를 예약합니다.
- Zone을 비활성화하는 실험적 API : 이 API는 여전히 실험 중인 상태입니다. 이 API를 사용하면 zones를 비활성화하고 애플리케이션이 완전히 zone-less 상태가 될 수 있습니다.

<div class="content-ad"></div>

V18 이후, Angular 팀에는 다음과 같은 다른 프로젝트들이 준비 중입니다:

- Angular 패키지 및 다른 생태계 라이브러리를 위한 zone-less Angular의 개발자 미리보기.
- 시그널 기반의 폼과 라우터.
- 시그널 컴포넌트.
- Angular의 안정성과 신뢰성에 대한 헌신.

# Angular 수분

이 기능은 Angular 16에서 소개되었습니다. 이는 Angular Universal과 함께 SSR을 사용할 때, Angular이 이제 서버 측 렌더링된 HTML을 클라이언트에서 재사용할 수 있게 되었음을 의미합니다.

<div class="content-ad"></div>

## DevTools에서 수분 보충 기능이 강화되었습니다

V18 Angular 팀에서는 Angular DevTools에서 수분 보충을 지원하기 위한 기능을 강화했습니다. 개발자는 수분 보충 정보를 볼 수 있습니다. 수분 보충된 컴포넌트, 건너 뛰어진 컴포넌트, 그리고 오류를 만난 컴포넌트를 쉽게 수정할 수 있습니다.

## Angular Material 컴포넌트는 수분 보충을 지원합니다

V18에서는 모든 Angular Material 컴포넌트가 수분 보충을 지원하여 애플리케이션 성능을 높일 수 있습니다.

<div class="content-ad"></div>

## i18n 블록 지원 — 미리보기

V18에서는 i18n 블록을 위한 수분 지원도 추가되었고, 이 기능은 개발자 미리보기 상태입니다.

## 이벤트 재생 — 미리보기

Angular 팀에서 미리보기 모드에 새로운 기능인 이벤트 재생(Event Replay)도 출시했습니다. 애플리케이션이 수분화되는 중에 사용자가 애플리케이션과 상호 작용할 수 있습니다. 이러한 작업은 캡쳐되어 재생할 수 있습니다. 이 기능은 JsAction에 의해 제공되며 Wiz와의 협력으로 나온 것입니다. 애플리케이션이 완전히 수분화될 때 이벤트가 캡처되어 올바른 시간에 재생됩니다.

<div class="content-ad"></div>

다음 Angular 수분화를 위해

- 루트용 렌더링 모드 선택, 클라이언트 측, 서버 측 또는 빌드 시간에 렌더링될 루트를 선택할 수 있도록 후크를 구축하려고 합니다.
- 매개변수화된 루트의 SSG(정적 사이트 생성) 경험 향상.

# Angular material 3

Angular V18은 드디어 material design 3을 지원합니다. 새로운 사용 가능한 기능은:

<div class="content-ad"></div>

- 테마 생성 체계를 변경했습니다.
- CSS 변수를 기반으로 한 간소화된 테마 스타일.
- CSS 변수를 기반으로 한 더 세부적인 테마 사용자 정의.
- 컴포넌트에 색상 변형을 적용하기 위한 더 유연한 API.

앱에서 Material 3을 사용하려면 mat.define-theme을 사용하여 sass에서 m3 테마를 생성하세요 :

![image](/assets/img/2024-05-27-Angularv18announcements_1.png)

또는 Angular CLI의 ng generate 명령을 사용하세요.

<div class="content-ad"></div>

```js
$ ng generate @angular/material:m3-theme
```

테마를 애플리케이션에 적용하려면 가져와서 적용해야 합니다:

![Angularv18announcements_2](/assets/img/2024-05-27-Angularv18announcements_2.png)

색상, 타이포그래피 등을 읽기 위한 새로운 SASS API도 소개되었습니다. 또한 M2 테마는 여전히 지원된다고 발표되었습니다.

<div class="content-ad"></div>

Angular Material의 다음 단계에 있습니다.

- 더 많은 유연성을 위해 앵귤러 마테리얼의 일부 동작을 근미래에 완전히 사용자 정의 된 CDK 구성 요소로 추출하고 있습니다.

# 기타 기능

이전에 설명한 것 외에 V18에는 다음 세대 웹 앱을 구축하는 데 도움이 되는 추가적인 작은 기능 및 버그 수정이 포함되어 있습니다.

<div class="content-ad"></div>

## 새로운 시그널 기반 API

- 시그널 입력 API: 시그널 입력을 사용하면 부모와 자식 컴포넌트 간에 값을 바인딩할 수 있습니다. 일방향 바인딩.

![](/assets/img/2024-05-27-Angularv18announcements_3.png)

- 모델 입력 API: 시그널 모델 입력을 사용하여 데이터를 두 방향 바인딩하여 동기화합니다.

<div class="content-ad"></div>


![Angular v18 Announcement Image 4](/assets/img/2024-05-27-Angularv18announcements_4.png)

- Signal Query APIs: offer an alternative approach to the decorator-based queries, namely @ViewChild, @ViewChildren, @ContentChild, and @ContentChildren, supplying query results as a Signal.

![Angular v18 Announcement Image 5](/assets/img/2024-05-27-Angularv18announcements_5.png)

To learn more about signals, check the guide: [Angular Signals Guide](https://angular.dev/guide/signals)


<div class="content-ad"></div>

## Zoneless APIs

zone.js 이벤트 통합은 V18에서 기본적으로 활성화되며, zone-less와 동일한 스케줄러를 사용합니다:

![](/assets/img/2024-05-27-Angularv18announcements_6.png)

zone.js를 사용하는 Angular은 Angular zone 밖에서 변경이 일어날 때에도 변경 감지를 스케줄할 수 있습니다:

<div class="content-ad"></div>


![Angular v18 announcements](/assets/img/2024-05-27-Angularv18announcements_7.png)

이전에 언급했듯이 Angular Material 구성 요소 및 CDK는 zone-less 호환됩니다. zone-less는 실험적인 모드에서 사용할 수 있습니다.

## Typescript 5.4

V18에서는 typescript 5.4 기능을 활용할 수 있습니다:


<div class="content-ad"></div>

- 마지막 할당 후 클로저에서의 유지된 좁힘.
- NoInfer 유틸리티 타입.
- Object.groupBy 및 Map.groupBy
- …

더 많은 TS 5.4 기능을 확인하려면 이 블로그 포스트를 확인하세요 : https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/

## 기본 `ng-content`

이 릴리스 이후, 개발자들은 이제 `ng-content`에 기본값을 제공할 수 있습니다. 이를 통해 빈 목록과 현재 콘텐츠가 없는 다른 컴포넌트에 값 할당이 가능해집니다.

<div class="content-ad"></div>


<img src="/assets/img/2024-05-27-Angularv18announcements_8.png" />

## Angular Forms 새로운 전역 observable

GitHub에서 가장 많은 투표를 받은 기능 요청을 개발했습니다. 이는 모든 컨트롤 및 해당 하위 요소에 대한 모든 종류의 이벤트를 추적하도록 구독할 수 있는 전역 observable입니다.

<img src="/assets/img/2024-05-27-Angularv18announcements_9.png" />


<div class="content-ad"></div>

## Angular.dev

해당 업데이트는 현대화된 로고를 갖춘 새로운 Angular.dev 웹사이트를 소개하였습니다.

마지막으로, Angular 팀의 전체 로드맵을 확인하고 싶다면 다음 페이지를 방문해주세요 : [Angular 로드맵](https://angular.dev/roadmap)

이 기사의 끝까지 읽어 주셔서 감사합니다! 떠나시기 전에:

<div class="content-ad"></div>

- 작가를 박수로 응원하고 팔로우하세요! 👏️
- 저를 팔로우하세요: X | LinkedIn | YouTube