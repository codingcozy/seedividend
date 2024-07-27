---
title: "Angular의 새로운 let 구문 탐험 템플릿 변수 선언 강화"
description: ""
coverImage: "/assets/img/2024-06-20-ExploringAngularsNewletSyntaxEnhancingTemplateVariableDeclarations_0.png"
date: 2024-06-20 00:34
ogImage: 
  url: /assets/img/2024-06-20-ExploringAngularsNewletSyntaxEnhancingTemplateVariableDeclarations_0.png
tag: Tech
originalTitle: "Exploring Angular’s New @let Syntax: Enhancing Template Variable Declarations"
link: "https://medium.com/netanelbasal/exploring-angulars-new-let-syntax-enhancing-template-variable-declarations-40487b022b44"
---



![이미지](/assets/img/2024-06-20-ExploringAngularsNewletSyntaxEnhancingTemplateVariableDeclarations_0.png)

Angular의 진화가 계속되면서 최근 병합된 @let 구문과 같은 흥미로운 새로운 기능들이 추가되었습니다. 이 기능은 아직 릴리스되지 않았지만 최근에 병합되었습니다. 이러한 추가 기능은 개발자가 템플릿 내에서 로컬 변수를 선언하고 제어 흐름을 직접 관리할 수 있는 간소화된 방법을 제공합니다. 이 기능은 템플릿 로직을 간단화하고 가독성을 향상시키는 데 초점을 맞추며, 특히 비동기 데이터와 복잡한 조건 처리 시 유용합니다. 새로운 @let 구문의 다양한 사용 사례와 장점을 자세히 살펴보겠습니다.

# @let 구문 이해

@let 구문을 사용하면 Angular 템플릿 내에서 로컬 변수를 선언하고 사용할 수 있습니다. 사용법을 설명하기 위해 다음과 같이 간단한 예제를 살펴봅시다:


<div class="content-ad"></div>

```js
@let user = user$ | async;
@let greeting = user ? 'Hello, ' + user.name : 'Loading';

# <h1>{ greeting }</h1>
```

이 예제에서 user$는 사용자 데이터를 방출하는 observable입니다. @let 구문을 사용하면 비동기 데이터 처리 및 조건부 렌더링 작업을 간단하게 처리할 수 있습니다.

# let 구문의 사용 사례

## Falsy 값 회피 또는 Async Pipe를 사용한 여러 구독 방지


<div class="content-ad"></div>

템플릿에서 관측 가능한 항목과 해당 값들을 처리하는 것은 반복적인 코드와 여러 구독을 야기할 수 있습니다. 자주 발생하는 문제 몇 가지와 @let이 이를 해결하는 방법을 살펴봅시다.

첫째, @if 문 내에서 async 파이프를 사용할 때 관측 가능한 값이 falsy인 경우(예: 0 또는 false) 제대로 작동하지 않습니다:

```js
@if (total$ | async as total) {
  <p>{ total }</p>
}
```

둘째, async 파이프를 직접 여러 곳에서 사용하면 여러 구독이 발생하여 비효율적이며 성능 문제를 야기할 수 있습니다.

<div class="content-ad"></div>

```js
@let total = total$ | async;

<div>{ total }</div>
<div>{ total }</div>
```

해결 방법은 observable 값에 대한 변수를 선언하기 위해 @let 구문을 사용하는 것입니다. 이 접근 방식은 단일 구독을 보장하고 falsy 값에 대해 올바르게 처리합니다.

## 템플릿에서의 신호 유형 좁히기

<div class="content-ad"></div>

신호에 대한 가장 귀찮은 문제 중 하나는 템플릿 내에서의 타입 좁힘 능력의 부재입니다. Angular은 이에 대한 해결책을 개발 중이지만, 그 동안 우리는 @let 기능을 활용하여 이 문제를 해결할 수 있습니다:

```js
@let txType = tx().type;

@switch(txType) {
  @case('a') {}
  @case('b') {}
}

@let address = person()?.address();

@if (address) {
 <app-address [address]="address">
}
```

## for 루프 내부

@let 구문은 특히 @for 루프 내에서 유용합니다. 개발자는 템플릿 내에서 중간 속성을 생성하여 가독성을 높이고 추가 컴포넌트 로직이 필요한 경우를 줄일 수 있습니다. 예를 들어:

<div class="content-ad"></div>

```js
@for (user of users(); track user.id) {
  @let address = user.address;

  <div>
    <h3>User: { user.name }</h3>
    <div>
      <p>Street: { address.street }</p>
      <p>City: { address.city }</p>
      <p>Zipcode: { address.zipcode }</p>
    </div>
    @for (order of user.orders) {
      <div>
        <h4>Order: { order.id }</h4>
        <p>Product: { order.productName }</p>
        <p>Quantity: { order.quantity }</p>
      </div>
    }
  </div>
}
```

## 파이프를 여러 번 사용하는 경우

템플릿에서 비용이 많이 드는 파이프를 여러 번 사용할 때는 종종 변환된 데이터를 저장할 컴포넌트의 속성을 만들어야합니다. @let 구문을 사용하면 변환된 변수를 한 번 선언하고 재사용하여 계산 부하를 줄이고 템플릿을 깔끔하게 유지할 수 있습니다.

```js
@let expensiveResult = someData | expensivePipe;

<p>{ expensiveResult }</p>
<p>{ expensiveResult }</p>
```

<div class="content-ad"></div>

# 결론

Angular의 @let 구문은 @if 및 @for과 같은 새로운 제어 흐름 기능과 결합되어 템플릿 변수 선언 및 제어 흐름 관리에 상당한 향상을 제공합니다. 상태 관리를 위해 계속 시그널 사용을 주장하는 사람도 있지만, @let 구문은 템플릿 내부의 로컬 변수를 처리하는 우아한 해결책을 제공합니다. Falsy 값 처리, 다중 구독 피하기 및 반복 코드 감소와 같은 일반적인 도전 과제를 해결함으로써이 새로운 기능은 Angular 개발자들에게 개발 경험을 향상시키기 위한 준비를 마쳤습니다.

Angular 및 JS에 관해 더 많이 읽으시려면 Medium이나 Twitter에서 저를 팔로우해주세요!