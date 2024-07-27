---
title: "Angular afterRender, afterNextRender 새로운 phases API"
description: ""
coverImage: "/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_0.png"
date: 2024-06-20 00:28
ogImage: 
  url: /assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_0.png
tag: Tech
originalTitle: "Angular afterRender , afterNextRender NEW phases API"
link: "https://medium.com/@amosisaila/angular-afterrender-afternextrender-new-phases-api-ddf2432455e2"
---


앵귤러는 컴포넌트 상호 작용을위한 강력한 라이프사이클 후크를 제공하지만 때로는 렌더링 후에 DOM과 직접 작업해야 하는 경우가 있습니다. 이때 afterRender 및 afterNextRender가 유용합니다.

## 필요성 이해하기

DOM 요소를 시각화하는 데 DOM을 사용하는 타사 차트 라이브러리를 통합하려고 상상해보십시오. 표준 라이프사이클 후크는 이러한 시나리오에 이상적이지 않을 수 있으며 라이브러리가 초기화되기 전에 DOM이 완전히 준비되어 있어야 할 수도 있습니다. 이러한 경우에 afterRender 및 afterNextRender가 해결책을 제공합니다.

## 주요 차이점

<div class="content-ad"></div>

두 후크가 후처리 작업을 다루지만 중요한 차이점이 있습니다:

- afterRender: 각 렌더 사이클 다음에 실행되는 콜백을 등록할 수 있습니다.
- afterNextRender: DOM이 로드될 때마다 한 번만 실행되는 콜백을 등록합니다.

![이미지](/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_0.png)

# 적절한 후크 선택하기

<div class="content-ad"></div>

- `afterNextRender`은 초기화 되어야 하는 타사 라이브러리를 설정하거나 엘리먼트 관찰자를 설정하는 것과 같은 일회성 DOM 조작에 사용합니다.
- `afterRender`은 동적으로 콘텐츠에 기반하여 엘리먼트 크기를 동적으로 조정하는 것과 같이 빈번한 DOM 변경에 반응해야 할 때 사용합니다.

기억해주세요: `afterRender`을 자주 사용하면 성능에 영향을 줄 수 있으므로 신중하게 사용해야 합니다. 그리고 이 두 가지는 모두 삽입 컨텍스트 내에서 사용되어야 합니다. 이 후크들은 SSR 또는 사전 렌더링에서 작동하지 않습니다.

# 단계의 순서

![Order of Phases](/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_1.png)

<div class="content-ad"></div>

Angular은 렌더링 중에 제어된 DOM 액세스를 위한 구분된 단계를 정의합니다:

- EarlyRead: 후속 쓰기 작업 전에 DOM에서 데이터를 읽을 수 있습니다.
- Write: DOM에 데이터를 쓰는 것을 허용합니다 (이 단계에서 읽기는 피하십시오).
- MixedReadWrite: 읽기와 쓰기가 모두 가능하지만 성능 저하 가능성으로 신중하게 사용해야 합니다.
- Read: DOM에서 데이터를 읽는 것을 허용합니다 (이 단계에서 쓰기는 피하십시오).

# 콜백 실행 순서 ➡️

동일한 단계 내에서 등록된 콜백은 등록된 순서대로 실행됩니다.

<div class="content-ad"></div>

각 렌더 주기가 끝난 후에는 콜백이 실행됩니다. 그리고 다음과 같은 특정 단계 순서를 따릅니다:

- earlyRead
- write
- mixedReadWrite
- read

# 초기화 과정 중 (angular.dev 기준)

![Angular Initialization](/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_2.png)

<div class="content-ad"></div>

# 이후의 업데이트 (angular.dev에서)

![이미지](/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_3.png)

# 단계 간 매개변수 전달

첫 번째 단계 콜백(earlyRead)은 매개변수를 전달받지 않습니다.

<div class="content-ad"></div>

각 후속 단계 콜백은 이전에 실행된 단계 콜백의 반환 값을 매개변수로 받습니다. 이를 통해 여러 단계에 걸쳐 작업을 조정할 수 있습니다.

![이미지](/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_4.png)

# 수익성 있는 예시

다음은 이러한 후크를 사용하는 몇 가지 실용적인 사례들입니다:

<div class="content-ad"></div>

- 써드파티 라이브러리 초기화: DOM이 준비되기 전에 Chart.js와 같은 라이브러리를 초기화하기 전에 afterNextRender를 사용해주세요.
- 엘리먼트 감시 설정: afterNextRender를 활용하여 IntersectionObserver 또는 ResizeObserver를 설정하십시오. 이들 API는 엘리먼트가 DOM에 존재해야만 작동합니다.
- 동적 콘텐츠 사이즈 조정: 동적으로 로드된 콘텐츠에 기반하여 엘리먼트 차원을 조정하기 위해 Read 단계와 함께 afterRender를 구현하십시오.
- 임시 엘리먼트 분리: 렌더링 프로세스 중에 추가한 임시 엘리먼트를 제거하기 위해 afterNextRender를 사용하십시오(모달을 닫은 후 정리하는 등).

# 중요 고려 사항 ⚠️

- afterRender와 afterNextRender는 브라우저별 작업에 사용되며 서버 측 렌더링 중에는 작동하지 않습니다.
- 가능한 경우 Angular의 내장 기능 인 ngAfterViewInit을 사용하여 컴포넌트 초기화 작업을 수행할 수 있습니다.
- afterRender는 DOM을 읽는 것을 가능하게 하지만, 서버와 클라이언트 렌더링 간의 수분화 불일치로 인해 주의해야 합니다.
- 이들은 주입 컨텍스트에서만 선언할 수 있습니다.

이러한 개념을 이해함으로써 Angular 애플리케이션과 DOM 간에 원활한 상호 작용을 만들기 위해 afterRender 및 afterNextRender를 효과적으로 활용할 수 있습니다.

<div class="content-ad"></div>

# 사용자 지정 Inject 함수

OnInit 로그인을 사용자 정의 inject 함수로 캡슐화할 수 있습니다. 이 기능을 제공해준 Chau Tran에게 감사드립니다.

<img src="/assets/img/2024-06-20-AngularafterRenderafterNextRenderNEWphasesAPI_5.png" />

여기서 코드를 실험해볼 수 있습니다.

<div class="content-ad"></div>

https://stackblitz.com/edit/stackblitz-starters-a39kev?file=package.json

# 지금까지 읽어 주셔서 감사합니다 🙏

피드백을 주시면 감사하겠습니다. 댓글이나 박수, 팔로우 부탁드려요. 👏

좋았다면 꼭 여러분의 커뮤니티, 기술 동료 또는 원하는 누군가와 공유해주세요. 그리고 LinkedIn, YouTube 또는 Substack에서도 팔로우 부탁드립니다. 👋😁