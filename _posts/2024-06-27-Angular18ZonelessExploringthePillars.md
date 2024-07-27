---
title: "Angular 18 Zoneless 2024년 핵심 기능 탐구"
description: ""
coverImage: "/assets/img/2024-06-27-Angular18ZonelessExploringthePillars_0.png"
date: 2024-06-27 18:23
ogImage: 
  url: /assets/img/2024-06-27-Angular18ZonelessExploringthePillars_0.png
tag: Tech
originalTitle: "Angular 18 Zoneless: Exploring the Pillars"
link: "https://medium.com/gitconnected/angular-18-zoneless-0c8b1e9aa4bc"
---



![Image](/assets/img/2024-06-27-Angular18ZonelessExploringthePillars_0.png)

"동의하지 않을 수도 있지만, 저는 Angular이 존리스(zoneless)가 되길 원했고 실현될 줄은 상상도 못 했습니다. 이제 실험 모드로 Angular 18에서 사용할 수 있습니다. 제발 프로덕션 환경에서 사용하지 마십시오."

# 존리스(zoneless)란?

네, 맞습니다. Angular의 존리스 설정에서 Angular 스케줄러는 컴포넌트 내에서 무언가 변경되었을 때 변경 감지를 자동으로 트리거하지 않습니다. 대신 Angular의 ChangeDetectorRef 서비스를 사용하여 변경 감지를 수동으로 트리거해야 합니다.


<div class="content-ad"></div>

여기 간단한 설명이 있어요:

Zone.js를 사용하는 기존 Angular 애플리케이션에서는 Angular이 모든 비동기 작업(HTTP 요청, setTimeout, 사용자 상호작용 등)이 완료될 때 자동으로 변경 감지를 트리거합니다. Zone.js는 이러한 비동기 작업들을 monkey-patch하여 Angular에게 변경 감지를 실행할 때 알리게 합니다.

우리가 무언가를 요리했다고 생각하실 지도 모르겠지만, 네 개의 기둥은 어디에 있을까요? 🧐

우선, Angular 18의 zoneless API를 확인하는 설정을 해야 합니다.

<div class="content-ad"></div>

- 설치.

```js
ng install @angular/cli@^18
```

2. 새 앱 만들기

```js
ng new zoneless-app
cd zoneless-app
```

<div class="content-ad"></div>

3. app.config.ts 파일이나 애플리케이션 부트스트랩 파일로 이동하세요.

```js
import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes)]
};
```

4. angular.json의 폴리필에서 zone.js를 제거하세요.

<img src="/assets/img/2024-06-27-Angular18ZonelessExploringthePillars_1.png" />

<div class="content-ad"></div>

이제 모든 설정이 완료되었으니 애플리케이션을 실행하면 됩니다.

이제 이 설정 이후에는 Angular가 자동으로 변경 감지를 트리거하지 않습니다.

# 왜 zoneless를 사용해야 하는가? .

불필요한 변경 감지를 피하기 위해서 간단하게 제안드립니다.

<div class="content-ad"></div>

모든 컴포넌트의 비동기 작업이 발생할 때 Angular는 루트부터 모든 하위 컴포넌트를 확인하는데, 이는 비효율적일 수 있습니다.

"changeDetection" 전략 "OnPush"를 사용하여 이 문제를 극복할 수 있는 옵션이 있습니다. 이는 컴포넌트와 해당 모든 하위 컴포넌트를 일반 변경 감지 주기에서 격리시킵니다.

# 네 기둥이 무엇인가요?

- 이벤트 핸들러.
- MarkForChanges 관리.
- 비동기 파이프.
- 시그널.

<div class="content-ad"></div>

## 이벤트 핸들러 :

앵귤러의 이벤트 핸들러는 템플릿의 이벤트에 바인딩된 컴포넌트 클래스 내의 메서드입니다.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<button (click)="onClick()">{state}</button>'
})
export class AppComponent {
 state = "Click Me";
  onClick() {
    this.state = "Clicked";
  }
}
```

## MarkForChanges 관리하기:

<div class="content-ad"></div>

앵귤러에서, markForCheck은 앵귤러의 기본 변경 감지가 변경 사항을 감지하지 못하는 시나리오에서 사용됩니다. 이는 OnPush 변경 감지 전략 및 지금은 zoneless에서 일반적입니다.

```js
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      {data}
      <button (click)="update()">Update</button>
     `,
})
export class AppComponent {
  data = '초기 데이터';

  constructor(private cdr: ChangeDetectorRef) { }

  update() {
    this.data = '업데이트된 데이터';
    this.cdr.markForCheck();
  }
}
```

## Async 파이프 :

앵귤러의 AsyncPipe는 Observable 또는 Promise에 자동으로 구독하고 최신 값을 반환합니다. 또한 컴포넌트가 파괴될 때 자동으로 구독을 해제합니다.

<div class="content-ad"></div>

```js
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import 'zone.js';
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
     Hello world
     {data$ | async }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class App {
  name = 'Angular';
  data$: Observable<string> | undefined;
  cRef = inject(ChangeDetectorRef);

  constructor() {
    setTimeout(() => {
      this.data$ = of('Hello, AsyncPipe!');
      this.cRef.markForCheck();
    }, 4000);
  }
}

bootstrapApplication(App);
```

## Signals:

Angular에 Signals가 포함되어 정말 기쁩니다. 이전에는 불필요한 다시 렌더링 오버헤드를 극복하기 위해 신호를 사용해야 했습니다. 또한 이제 더 선언적 프로그래밍 스타일로 코드를 작성할 수 있고, 대부분의 주요 API는 Signals과 호환됩니다. 이것은 반응성을 위해 더 이상 RxJS에 의존하지 않아도 된다는 것을 의미합니다.

```js
import { Component } from '@angular/core';
import { Signal, createSignal } from '@angular/core/signals';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div class="counter">
      <h1>Counter: { count.value }</h1>
      <button (click)="decrement()">-</button>
      <button (click)="increment()">+</button>
    </div>
  `,
  styles: [`
    .counter {
      text-align: center;
      margin-top: 50px;
    }
    button {
      margin: 0 5px;
      padding: 10px;
      font-size: 16px;
    }
  `]
})
export class CounterComponent {
  // Count 상태를 관리하기 위한 Signal 생성
  count: Signal<number> = createSignal(0);

  // Count 증가 메소드
  increment() {
    this.count.set(this.count.value + 1);
  }

  // Count 감소 메소드
  decrement() {
    this.count.set(this.count.value - 1);
  }
}
```

<div class="content-ad"></div>

"markForCheck" 또는 수동 변경 감지가 필요하지 않습니다.

신호 패턴 때문에 수동 변경 감지 확인이 필요하지 않습니다. 수동 코드 작성 부담이 줄어들고, Angular 팀은 Input/Output, ViewChild 및 기타 모든 API를 신호로 변환하고 있습니다.

## 마지막 기둥:

SSR은 Angular의 마지막 기둥입니다. 다음 포스트에서 계속합니다.

<div class="content-ad"></div>

## 결론:

Angular은 이제 시그널의 도입으로 올바른 방향으로 나아가고 있습니다. Angular를 지원하는 중요한 요소 가운데 시그널이 특히 두드러집니다. 시그널은 Angular 18에서 존리스 작업으로의 전환을 용이하게 하뿐만 아니라 불필요한 다시 렌더링과 수동 변경 감지 확인의 부담으로부터 자유로움을 제공합니다. 이 방식은 성능을 향상시키는 것뿐만 아니라 더 선언적인 코딩 스타일을 촉진합니다.

서버 측 렌더링(SSR)은 Angular의 중요한 측면으로 남아 있으며, 제가 이후에 다룰 것입니다. 이 네 가지 중요한 요소인 이벤트 핸들러, MarkForChanges 관리, 비동기 파이프, 그리고 시그널을 계속 탐험하면 코드를 더 읽기 쉽고 간단하게 만드는 데 기여하는 방법을 발견할 것입니다.

즐거운 코딩되세요!