---
title: "Durandal 대 Angular"
description: ""
coverImage: "/assets/img/2024-05-14-DurandalvsAngular_0.png"
date: 2024-05-14 14:32
ogImage: 
  url: /assets/img/2024-05-14-DurandalvsAngular_0.png
tag: Tech
originalTitle: "Durandal vs. Angular"
link: "https://medium.com/gitconnected/durandal-vs-angular-677cb4d14045"
isUpdated: true
---





![Durandal Logo](/assets/img/2024-05-14-DurandalvsAngular_0.png)

알고 계신가요? Durandal을 들어보신 적이 있나요? 만일 JS 개발자 경험이 적다면 들어보지 못했을 것입니다. 10년 전에 이것은 인기 있는 싱글 페이지 앱 (SPA) 프레임워크였습니다.

당시 저는 Durandal을 사용한 중요한 프로젝트에서 1년 이상 일했습니다. 저는 그것을 좋아했어요. 작고, 유연하며 확장하기 쉬웠습니다.

10년은 IT분야에서 긴 시간입니다. 지금은 Durandal이 더 이상 사용되지 않고 있습니다. 새로운 세대의 프런트 엔드 JS 프레임워크가 웹 애플리케이션의 세계를 지배하고 있습니다.




최근에 오래된 Durandal 애플리케이션에 소규모 개선 작업을 하게 되었어요. 옛 친구를 다시 만난 기분이었죠. 당연히 현재의 JS 프레임워크인 Angular 16과 비교해보았어요.

아시다시피 Angular는 거의 모든 면에서 Durandal을 앞섰어요. 하지만 Durandal의 많은 디자인 개념들은 여전히 그 가치를 지키고 있어요. 이러한 비교를 보면 지난 10년 동안 Single Page App (SPA) 프레임워크가 얼마나 발전했는지 명확해져요. 우리가 얼마나 멀리 왔는지 보는 것은 꽤 흥미롭죠.

## 프레임워크 개요

Durandal은 단순함과 모듈성을 중점으로 둔 가벼운 SPA 프레임워크로 만들어졌어요. Knockout과 Require.js와 같은 라이브러리의 조합을 활용하여 목표를 달성했어요.



Durandal은 SPA를 만드는 데 필수적인 기능을 제공합니다. 또한 다른 라이브러리와 쉽게 통합할 수 있도록 설계되었습니다.

반면에 Angular는 완전한 패키지입니다. 그래서 그것은 "배터리 포함"이라고 불립니다. 이는 Angular가 대규모 및 복잡한 프로젝트에 적합한 풍부한 싱글 페이지 웹 앱을 구축하는 데 필요한 모든 것을 제공한다는 것을 의미합니다.

## AMD vs ES6 module

Durandal은 모듈 로딩과 의존성 관리를 위해 Asynchronous Module Definition (AMD) 패턴을 사용합니다. AMD의 한 예는 아래와 같습니다:



```js
// Durandal에서 AMD를 사용하여 모듈 정의하기
define(['knockout'], function(ko) {
    var viewModel = {
        message: ko.observable('안녕, Durandal!')
    };
    return viewModel;
});
```

Angular 및 다른 새로운 JS 프레임워크는 ES6 모듈을 사용합니다. AMD와 달리, ES6 모듈은 JavaScript에 기본적으로 내장되어 있어 추가적인 로더나 Require.js와 같은 라이브러리가 필요하지 않습니다. ES6 모듈은 정적 분석을 가능하게 하여 더 나은 도구 지원, 트리 쉐이킹 및 성능 향상을 제공합니다. ES6 모듈은 기본적으로 더 나은 캡슐화를 제공하여 의존성을 관리하는 것을 쉽게 만들고 의도하지 않은 충돌을 방지합니다. 아래는 사용 예시입니다.

```js
// 모듈 가져오기
import { greet } from './myModule';

// Angular 컴포넌트
@Component({
  selector: 'app-greeting',
})
export class GreetingComponent {
  message: string;

  constructor() {
    // 가져온 함수 사용하기
    this.message = greet('John');
  }
}
```

## 컴포넌트 기반 아키텍처




현대 SPA 프레임워크에서 기본적인 설계 패러다임인 구성 요소 기반 아키텍처는 사용자 인터페이스를 재사용 가능한 독립적인 구성 요소로 분해하여 모듈화 및 유지 관리성을 촉진합니다.

Durandal은 구성 요소 개념을 갖고 있지만 현대 SPA에서 볼 수 있는 구조화된 구성 요소 기반 아키텍처가 부족합니다.

Angular은 구성 요소 기반 아키텍처를 강조하며 재사용 가능한 구성 요소 내에서 기능을 캡슐화하여 명확한 관심사 분리와 유지 관리성을 촉진하는 구조화된 개발 접근 방식을 강제합니다.

## 상태 관리



Durandal은 뷰 모델, 라우팅, 라이프사이클 메소드 및 저장 옵션의 조합을 사용하여 상태를 관리하고 유지하는 데 도움을 줍니다. 애플리케이션이 커지면 다른 컴포넌트 및 뷰 간의 상태 전이를 추적하고 관리하는 것이 더 어려워질 수 있습니다.

Angular에는 많은 상태 관리 프레임워크가 있습니다. 가장 인기 있는 것은 Redux에서 영감을 받은 상태 관리 라이브러리인 NgRx입니다. 이를 통해 응용 프로그램 상태를 구조화하고 복잡한 데이터 흐름을 처리하기 쉬워집니다.

## 의존성 주입

Durandal은 전용 의존성 주입 컨테이너를 제공하지는 않지만 모듈 구조와 Require.js와 같은 AMD(비동기 모듈 정의) 로더와 통합을 제공합니다.



Angular의 의존성 주입(Dependency Injection, DI)은 우리에게 종속성을 손쉽게 관리하고 주입할 수 있는 강력한 메커니즘입니다. 내장된 DI를 통해 코드를 깔끔하고 조직적으로 유지하고 테스트할 수 있으므로, 견고한 웹 응용 프로그램을 개발하는 데 탁월한 기능입니다.

```js
// 의존성 주입이 포함된 Angular 컴포넌트
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-example',
  template: '<p>{ message }</p>',
})
export class ExampleComponent {
  constructor(private dataService: DataService) {
    this.message = this.dataService.getMessage();
  }
}
```

## 바인딩

Durandal은 Knockout을 이용한 양방향 데이터 바인딩을 사용하여 동적 UI 업데이트를 처리할 수 있었습니다.



```js
<!-- Durandal 바인딩 -->
var vm = {
    message = ko.observable('안녕 세상아')
};
ko.applyBindings(vm);
```

Angular은 자체적인 양방향 데이터 바인딩 메커니즘을 제공하며 시간이 지남에 따라 성능과 유연성이 향상되었습니다.

```js
<!-- Angular HTML 템플릿 -->
<input [(ngModel)]="message" />
<p>{ message }</p>
```

React와 같은 다른 최신 프론트엔드 JS 프레임워크들은 이벤트를 통해 데이터 상태를 업데이트하여 성능을 향상시키는 단방향 데이터 바인딩을 활용합니다.




## 도구, CLI 및 성능 최적화

Durandal은 간단하고 모듈식이지만 CLI 도구가 없었습니다. 또한 내장된 성능 최적화 기능도 제공하지 않았습니다.

Angular와는 달리 Durandal에는 기본적으로 서버 측 렌더링 지원이 없었습니다.

Angular에는 자체 CLI가 함께 제공됩니다. Angular 앱을 구축, 테스팅 및 배포하기 위한 풍부한 툴킷입니다. 개발자들에게 생활을 쉽게 만들어주며 생산성을 크게 향상시킵니다.



Angular 16은 AOT 컴파일 및 향상된 트리 쉐이킹과 같은 멋진 성능 트릭으로 한 단계 더 나아갑니다. 이는 더 빠른 로드 시간과 더 작은 번들로 앱 전체를 보다 빠르게 만들어줍니다. 

Angular 16은 향상된 Angular Universal을 롤아웃하여 적절한 서버 측 렌더링 기능을 제공합니다. 이로 인해 페이지가 더 빨리 로드되고 SEO를 향상시킵니다.

이러한 중요한 발전은 현대적인 단일 페이지 앱(SPAs)을 한 단계 발전시켰습니다. 이러한 앱들은 강력하며 유지 보수가 쉽고 매우 빠릅니다. Angular와 Durandal을 비교하면 새로운 멋진 스포츠카와 오래된 모델을 비교하는 것과 같습니다. Durandal은 그 시대에 놀랍지만, 새로운 세대의 SPA 프레임워크는 모든 것을 새로운 수준으로 끌어올렸습니다!