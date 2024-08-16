---
title: "Angular를 사용한 Hexagonal 아키텍처"
description: ""
coverImage: "/assets/img/2024-05-18-HexagonalArchitecturewithAngular_0.png"
date: 2024-05-18 22:05
ogImage: 
  url: /assets/img/2024-05-18-HexagonalArchitecturewithAngular_0.png
tag: Tech
originalTitle: "Hexagonal Architecture with Angular"
link: "https://medium.com/@alet.aurelien/hexagonal-architecture-with-angular-7e4d070155ea"
isUpdated: true
---




## Angular 앱에 육각형 아키텍처를 적용하는 방법을 보여주는 구체적인 예시입니다.

![이미지](/assets/img/2024-05-18-HexagonalArchitecturewithAngular_0.png)

# 요약

- 소개
- 완전하고 작동하는 예시
- 구현 선택 사항
- Angular에서의 육각형 아키텍처의 이점
- 언제 Angular에서 육각형 아키텍처를 사용해야 하는가
- 결론

<div class="content-ad"></div>

# 1 — 소개

오랜 시간 동안, 모델 뷰 컨트롤러는 소프트웨어 개발자들의 즐겨 사용하는 아키텍처였습니다. 이것은 백엔드에서 사용되었을 뿐 아니라 프론트엔드 코드에서도 사용되었습니다. 그러나 커뮤니티가 도메인 주도 설계에 대한 관심이 높아지면서, 이 아키텍처는 그 사촌인 "헥사고널" (또는 "포트와 어댑터") 아키텍처에 의해 도전을 받았습니다.

MVC와 마찬가지로, 헥사고널 아키텍처는 분리 원칙을 사용하지만 더 많은 추상화를 포함하며, 도메인 코드가 아키텍처의 중심에 위치합니다.
헥사고널 아키텍처에 대해 더 많은 정보를 원하신다면, 이 아키텍처의 설계자인 알리스터 코크번이 작성한 완전한 기사가 있습니다.

현재 헥사고널 아키텍처는 대부분 백엔드 코드에서 사용되고 있으며, 특히 Angular에 대한 프론트엔드 코드에 대한 정보가 부족합니다.

<div class="content-ad"></div>

Angular에서 여섯각형 아키텍처를 적용하는 방법은 무엇인가요? 이것이 유익할까요? 만약 이러한 질문에 관심이 있다면, 이 글을 읽어보세요.

# 2 — 완전한, 작동하는 예시

다음 설명은 내가 개발하고 Github에서 사용 가능한 예시 앱을 기반으로 합니다. 이 앱은 Angular의 영웅 투어를 기반으로 합니다. 앱을 실행하면 표시되는 인터페이스는 Angular 튜토리얼과 동일하지만 코드 구조는 매우 다릅니다. 이 작은 앱의 원칙은 영웅 목록을 표시하고(생성, 삭제, 수정) 관리하는 것입니다. 외부 API 호출을 시뮬레이트하기 위해 angular-in-memory-web-api 모듈이 사용됩니다.

이 예시 아키텍처 개요입니다:

<div class="content-ad"></div>


![Hexagonal Architecture with Angular](/assets/img/2024-05-18-HexagonalArchitecturewithAngular_1.png)

And the associated code organization:

![Hexagonal Architecture with Angular](/assets/img/2024-05-18-HexagonalArchitecturewithAngular_2.png)

## Domain


<div class="content-ad"></div>

헥사고널 아키텍처에서는 전체 도메인 관련 코드가 격리되어 있습니다. 히어로즈 앱은 다음과 같은 목적을 갖고 있습니다: 히어로 목록 표시, 특정 히어로에 대한 세부 정보 표시, 그리고 사용자가 수행한 작업 로그 표시. 도메인 관련 클래스는 아키텍처의 핵심입니다: HeroesDisplayer, HeoresDetailDisplayer, 그리고 MessagesDisplayer.

## 포트

도메인 관련 코드가 우리의 히어로즈 앱에서 홀로 있는 것은 상상하기 어렵습니다. Angular 컴포넌트에 해당하는 사용자 인터페이스 관련 코드와 Angular 서비스에 해당하는 외부 API 호출도 있습니다. 매 헥사고날 아키텍처에서 도메인 관련 코드는 이 모든 코드와 직접 상호작용하지 않습니다. 대신 포트라 불리는 객체를 사용하며, 인터페이스 클래스로 구현됩니다. 이렇게 하면 아키텍처의 요소들 간의 결합이 약해집니다.

우리의 히어로즈 앱에서 HeroesDisplayer와 HeoresDetailDisplayer는 히어로 관련 상호작용을 저장하는 외부 서비스와 상호작용해야 합니다. 이를 위해 IManageHeroes 포트를 노출할 것입니다. 각 도메인 클래스에 대해 모든 사용자 상호작용을 기록하고 싶습니다. 이를 위해 IManageMessages 포트도 가지고 있습니다.

<div class="content-ad"></div>

사용자들은 앱에서 실제 작업을 디스플레이 인터페이스를 통해 수행합니다. 이러한 인터페이스는 목적에 따라 여러 카테고리로 나눌 수 있습니다. Angular 투어 오브 히어로즈 앱과의 충실한 비교를 보장하기 위해 우리는 영웅을 표시하는 인터페이스(영웅 목록 및 대시보드), 영웅 세부 정보를 표시하는 인터페이스, 그리고 메시지를 표시하는 인터페이스가 있어야 합니다. 따라서 관련된 포트는 각각 IDisplayHeroes, IDisplayHeroDetail 및 IDisplayMessages여야 합니다.

## 어댑터

이제 포트들이 정의되었으니, 해당 포트에 어댑터를 연결해야 합니다. 헥사고날 아키텍처의 장점 중 하나는 어댑터 간 전환할 때 용이함입니다. 예를 들어, IManageHeroes에 연결된 어댑터는 REST API를 호출하는 어댑터일 수 있으며, GraphQL API를 사용하는 어댑터로 쉽게 교체할 수 있습니다. 우리의 경우, 앱을 Google 투어 오브 히어로즈 앱과 동일하게 만들고 싶습니다. 따라서 우리는 메모리 기반의 웹 API를 호출하는 Angular 서비스인 HeroAdapterService와, 메시지를 로컬로 저장하는 MessageAdapterService를 구현합니다.

다른 세 포트에 대한 어댑터는 사용자 인터페이스 관련 어댑터입니다. 우리의 앱에서는 이러한 어댑터들이 Angular 컴포넌트로 구현될 것입니다. IDisplayHeroes 포트가 세 어댑터로 구현된 것을 확인할 수 있습니다. 자세한 내용은 다음에 제공됩니다.

<div class="content-ad"></div>

위에서 설명한대로, 우리의 어댑터에는 그 특성 때문에 비대칭성이 있습니다. 아키텍처 다이어그램은 이를 다음과 같이 나타냅니다: 아키텍처의 왼쪽 어댑터는 사용자 상호작용을 위해 설계되었고, 오른쪽 어댑터는 외부 서비스 상호작용을 위해 설계되었습니다.

# 3 — 구현 선택사항

헥사고날 아키텍처는 백엔드 애플리케이션을 위해 설계되었기 때문에, 코드 구현에 일부 조치가 취해졌습니다. 이러한 선택사항은 다음 부분에서 설명될 것입니다.

## 도메인 코드 내 Angular 관련 객체

<div class="content-ad"></div>

호반 구조에서 좋은 실천 방법 중 하나는 도메인 관련 코드를 어떤 프레임워크에서도 독립적으로 유지하여 어댑터 유형에 대해 기능적이라는 것을 보증하는 것입니다. 하지만 저희 코드에서는 도메인이 Angular 및 rxjs 객체에 매우 의존적입니다. 사실, TypeScript나 JavaScript 프레임워크를 여러 개 사용하지 않을 것으로 가정할 수 있으며 인터페이스 일관성을 유지하기 위해서입니다. 또한, Angular 의존성 주입 시스템은 제어의 역전 원칙을 성취하는 데 매우 유용합니다. 그러나 rxjs Observable 대신 JavaScript Promises를 사용할 수 있어야 하지만, 우리 클래스에 많은 보일러플레이트 코드를 작성해야 할 것입니다.

## Observable return type in left-side ports

코드 뒤에 있는 로직이 도메인에서 처리되므로 IDisplayHeroDetail, IDisplayHeroes 및 IDisplayMessages 포트에서 Observable 객체를 반환하는 이유를 궁금해 할 수 있습니다. 실제로 서비스에서 반환된 각 객체는 도메인 코드 내에서 pipe와 tap 메서드를 사용하여 처리됩니다. 예를 들어, HeroAdapterService에서 반환된 히어로 상세 저장 결과는 직접 HeroDetailDisplayer에서 처리됩니다.

그럼에도 불구하고 askHeroNameChange 메서드에서 빈 observable을 반환하는 것은 데이터가로드 된 시기를 인터페이스 어댑터가 알 수 있도록 하는 데 흥미로울 수 있습니다. 예를 들어, 히어로 상세 정보가 변경되었을 때, 이전 페이지로 돌아가도록 할 수 있습니다.

<div class="content-ad"></div>

이 구현 선택의 단점은 좌측 측면 어댑터 내에서 각 도메인 함수 호출에 구독해야 하는 필요성입니다.

## HeroesDisplayer 클래스가 두 번 인스턴스화됨

우리 앱에서 의존성 주입은 app.module.ts에서 처리됩니다. 의존성 주입 토큰을 사용하여 Angular 컴포넌트 내에서 도메인 클래스에 액세스할 수 있습니다. 예를 들어 HeroDetail 컴포넌트로 IDisplayHeroDetail을 주입하는 방법은 다음과 같습니다:

IDisplayHeroDetail 구현체로 HeroesDetailDisplayer 인스턴스 설정

<div class="content-ad"></div>

HeroDetailComponent 안에 HeroDetailDisplayer를 삽입합니다.

그러나 코드 어딘가에 섬세한 점이 있습니다: HeroesDisplayer 클래스를 위한 두 가지 다른 인젝션 토큰이 생성됩니다. 게다가 HeroesComponent와 DashboardComponent는 동일한 인젝션 토큰을 공유하며, HeroSearchComponent 구성 요소는 다른 토큰을 사용합니다.

HeroesComponent와 DashboardComponent가 HeroesDisplayer의 동일한 인스턴스를 공유할 수 있는 이유는 그들이 동일한 영웅 목록을 표시하기 때문입니다. 반면에 HeroSearchComponent가 이 같은 인스턴스를 가진다면 각 검색이 표시된 영웅에 영향을 미칠 것입니다. 왜냐하면 HeroesDisplayer의 askHeroesFiltered 메소드에 의해 heroes 속성이 수정되기 때문입니다. 세 구성 요소에 대해 동일한 토큰을 공유한다면 우리 앱의 동작이 변경될 겁니다:

![image](https://miro.medium.com/v2/resize:fit:1400/1*8pOHcNceUxS-xw2uoGF4bg.gif)

<div class="content-ad"></div>

# 4 — Angular에서의 육각형 아키텍처 이점

육각형 아키텍처의 주요 본질은 서로 교환 가능한 어댑터를 갖고 있어 우리 앱이 사람, 시스템 또는 테스트에 의해 동일하게 구동될 수 있다는 점에 있습니다. 우리 앱은 Angular 프레임워크와 긴밀히 연결되어 있으므로 이 아키텍처 자산에서 전체적인 이점을 얻지 못하는 상황입니다. 그러나 앞단 코드에서 이를 경험함으로써 약간의 유망한 통찰을 얻었습니다.

## 분리된 프레젠테이션 레이어, 코어 레이어 및 외부 서비스 호출

코어 레이어에 해당하는 도메인 코드는 포트를 통해 명확하게 인터페이스 어댑터인 프레젠테이션 레이어와 분리됩니다. 이러한 포트 덕분에 외부 서비스 호출에 원치 않는 코드를 추가하는 위험이 줄어듭니다. 모든 핵심 로직은 도메인 클래스에서 처리됩니다.

<div class="content-ad"></div>

도메인 클래스를 가져와 코드 레이어에 대응합니다.

뷰 안에서 도메인 코드로 처리되는 히어로 정보를 사용하며, 프레젠테이션 레이어에 대응합니다.

## 코드 인수화

원래의 히어로 애플리케이션 투어를 살펴보면, HeroesComponent, HeroSearchComponent 및 DashboardComponent의 주요 목적이 매우 유사합니다. 모든 구성 요소는 히어로 목록을 표시하지만 구성 요소에 따라 가능한 상호 작용이 다릅니다. 따라서 표시된 정보에 대한 반환 서비스를 매핑하는 관련 핵심 코드를 인수화해야 합니다. 우리의 코드에서는 세 구성 요소에 대한 도메인 관련 코드를 인수화했습니다. 헥사고날 포트 재사용성을 활용했습니다.

<div class="content-ad"></div>

## 테스트

가끔은 Angular 테스트가 매우 고통스러울 수 있습니다. 특히 코어 코드가 컴포넌트 내의 프레젠테이션 코드와 섞여 있는 경우 더 그렇습니다. 이 코드는 응용 프로그램이 발전함에 따라 계속해서 늘어납니다. 디스플레이 컴포넌트, 도메인 코드 및 서비스를 서로 분리하여 유지하면 테스트가 더 간단해집니다. 다른 레이어를 쉽게 모의(mock)화할 수 있고 현재 클래스를 테스트하는 데 집중할 수 있습니다.

히어로 세부 정보 디스플레이 테스트: 도메인 클래스와 메서드를 쉽게 모의화(mock)할 수 있습니다

# 5 — Angular에서 헥사고날 아키텍처를 사용해야 하는 시점

<div class="content-ad"></div>

비록 백엔드 코드와 완전하게 비교할 순 없지만, 헥사고날 아키텍처는 일부 프론트엔드 애플리케이션에서 매우 유용한 이점을 가질 수 있습니다. 특히 특정 사용 사례들은 이 아키텍처에 특히 적합해 보입니다.

## 프로필 기반 앱

프레젠테이션 레이어를 분리했기 때문에, 프로필 기반 앱과 같은 인터페이스 내에서 동일한 로직이 사용되는 애플리케이션은 우리의 아키텍처를 위한 좋은 후보입니다. 관리자 패널 브랜치는 어드민 패널 인터페이스를 추가했을 때 앱이 어떻게 보일지 예시를 제공합니다. 이 인터페이스는 어드민 사용자를 위해 설계되었으며, 단일 뷰 안에서 모든 관리 작업을 수행할 수 있습니다: 히어로 추가, 변경, 삭제 또는 검색. 히어로 앱에는 AdminPanelComponent만 추가되었고, 도메인 코드나 서비스 내부의 변경은 없으며 재사용 가능한 속성을 보여줍니다.

관리자 인터페이스를 시작하려면, 관리자 패널 브랜치에서 npm run start:admin을 실행하세요.

<div class="content-ad"></div>

## 다중 외부 서비스를 호출하는 앱

같은 목적을 제공하는 여러 외부 서비스에 연락해야 하는 경우 Angular 헥사고날 아키텍처를 채택할 수도 있습니다. 다시 한번, 도메인 코드의 재사용으로 작업을 간단하게 만들 수 있습니다. 예를 들어, 우리가 메모리에 있는 히어로 서비스 대신 온라인 서비스를 호출하려고 한다면 Yoann Cribier의 슈퍼히어로 API를 사용할 수 있습니다. `SuperheroApiAdapterService`를 추가하는 것만으로도 충분합니다. superhero-api 브랜치에서 확인할 수 있습니다.

앱이 슈퍼히어로 API와 통신하도록 하려면 superhero-api 브랜치에서 `npm run start:superhero-api`를 실행하면 됩니다. 주의: 이 예시에서는 히어로 수정 및 삭제가 온라인 서비스에 구현되지 않았습니다.

# 6 - 결론

<div class="content-ad"></div>

이 작은 앱은 Angular 앱에 육각형 아키텍처를 적용할 수 있다는 것을 보여줍니다. 투어 오브 히어로즈 튜토리얼 앱에서 다루지 않은 일부 문제를 해결할 수 있습니다.

읽어 주셔서 감사합니다!
이 글을 즐겁게 보셨기를 바라며, 이 아키텍처 도입에 대한 어떠한 피드백도 매우 관심이 있습니다.

또한, 이 글을 교정해 주신 Leila에게 감사드립니다.

원문은 2022년 8월 10일에 https://dev.to에서 최초로 게시되었습니다.