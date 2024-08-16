---
title: "Angular 17 데이터 공유하기 BehaviorSubject를 활용한 간단한 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-Angular17DataSharingwithBehaviorSubjectsASimpleGuide_0.png"
date: 2024-05-14 14:45
ogImage: 
  url: /assets/img/2024-05-14-Angular17DataSharingwithBehaviorSubjectsASimpleGuide_0.png
tag: Tech
originalTitle: "Angular 17 Data Sharing with BehaviorSubjects: A Simple Guide"
link: "https://medium.com/@mohsinogen/angular-17-data-sharing-with-behaviorsubjects-a-simple-guide-bab56530c832"
isUpdated: true
---




<img src="/assets/img/2024-05-14-Angular17DataSharingwithBehaviorSubjectsASimpleGuide_0.png" />

앵귤러 애플리케이션에서 컴포넌트 간 데이터 흐름을 관리하는 것은 복잡해질 수 있습니다. 이때 비동기 프로그래밍을 위한 강력한 라이브러리인 RxJS가 유용합니다. RxJS는 데이터 스트림을 처리하는 다양한 연산자와 Subject를 제공하며, 그 중에서 BehaviorSubject는 중요한 역할을 합니다. BehaviorSubject는 상태를 관리하고 Angular 애플리케이션 내에서 변경 사항을 전파하는 데 기본적인 구조로 나타납니다. 이 블로그 포스트에서는 BehaviorSubject를 사용하여 컴포넌트 간 데이터를 공유하는 방법에 대해 알아보겠습니다.

# BehaviorSubject란 무엇인가요?

기본적으로 BehaviorSubject는 RxJS 라이브러리에서 제공하는 Observable의 한 유형입니다. 특정 이벤트가 발생할 때만 값을 방출하는 전통적인 Observable과 달리, BehaviorSubject는 최신 값을 유지하고 새로운 구독자에게 즉시 전달합니다.



# 주요 기능:

## 초기값으로의 초기화:

BehaviorSubject를 생성할 때, 개발자는 초기값을 지정합니다. 이 초기값은 이후 발생하는 값들의 시작점으로 작용하며, 새로운 구독자가 구독 시 즉시 업데이트를 받을 수 있도록 보장해줍니다.

## 상태 유지:



BehaviorSubject의 독특한 특징 중 하나는 최신 값을 유지 및 구독자에게 전달할 수 있는 능력입니다. 이 행동은 추가 이벤트를 트리거할 필요 없이 컴포넌트가 가장 최신 데이터와 동기화되도록 합니다.

## next() 메서드:

next() 메서드를 통해 개발자는 BehaviorSubject가 보유한 값을 동적으로 업데이트할 수 있습니다. 이 메커니즘은 응용 프로그램 전체에 이어지는 데이터 전파를 원활하게 처리하여 반응성 및 반응적인 동작을 가능하게 합니다.

# 실제 구현:



## 1. 빈 Angular 프로젝트를 생성하세요

```js
ng new behaviorsubject-demo
```

## 2. 서비스 및 컴포넌트 생성

이 프로젝트에서는 아래와 같은 UI를 만들 예정입니다. 이를 위해 인용구 데이터를 가진 Quote 서비스를 생성하고, 인용구를 업데이트하는 컴포넌트와 인용구를 표시하는 컴포넌트를 만들 예정입니다.



아래 명령어를 실행하여 서비스와 컴포넌트를 생성하세요.

```js
ng generate service services/quote
ng generate component components/display-quote
ng generate component components/update-quote
```

폴더 구조는 아래와 같이 보일 것입니다.



<img src="/assets/img/2024-05-14-Angular17DataSharingwithBehaviorSubjectsASimpleGuide_2.png" />

## 3. 서비스에 아래 코드를 추가하세요

```js
// quote.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() {}

  // 명언 속성을 선언하고 초기화합니다. BehaviorSubject이 될 예정
  qoute = new BehaviorSubject("Hello world");

  // BehaviorSubject를 Observable로 노출합니다
  currentQuote = this.qoute.asObservable();

  // BehaviorSubject 값을 업데이트하는 함수
  updateQuote(newQuote: string){
    this.qoute.next(newQuote);
  }
}
```

## 4. 명언 서비스에서 명언 값을 표시하기



```typescript
// display-quote.component.ts

...

import { QuoteService } from '../../services/quote.service';

...
export class DisplayQuoteComponent {

  constructor(private quoteService: QuoteService){}
  
  currentQuote: string = '';

  ngOnInit(): void {
    // 현재 시간 값을 가져오기 위해 quote 서비스의 currentQuote 속성을 구독합니다
    this.quoteService.currentQuote.subscribe(
      // 컴포넌트의 속성을 업데이트합니다
      quote => this.currentQuote = quote
    );
  }
}

// display-quote.component.html

<h2>{currentQuote}</h2>
```

이제 display-quote 컴포넌트에서 quote 서비스의 초기 인용구를 볼 수 있게 될 것입니다

## 5. 인용구 값 업데이트

```typescript
// update-quote.component.ts

import { Component } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

...
export class UpdateQuoteComponent {

  constructor(private quoteService: QuoteService){}

  quote = '';

  // 서비스에서 인용구를 업데이트하는 함수
  submitHandler(){    
   this.quoteService.updateQuote(this.quote);
    this.quote="";
  }
}

// update-quote.component.html

<div>
  <input type="text" [(ngModel)]="quote" placeholder="새로운 인용구를 작성하세요" />
  <button (click)="submitHandler()">제출</button>
</div>
```



이제 update-quote 컴포넌트에서 인용구 값을 업데이트할 수 있게 되었고, 이는 display-quote 컴포넌트에 직접적으로 반영될 것입니다. 아래 다이어그램에서 프로젝트 내 데이터의 흐름을 확인할 수 있습니다.

![Diagram](/assets/img/2024-05-14-Angular17DataSharingwithBehaviorSubjectsASimpleGuide_3.png)

# 결론:

- 이 예제에서 인용구 서비스는 BehaviorSubject를 사용하여 인용구를 저장합니다. display-quote 컴포넌트는 currentQuote observable을 구독하여 최신 인용구를 가져와 로컬 변수를 업데이트합니다.
- Angular 개발에서 BehaviorSubject는 상태를 관리하고 컴포넌트 및 서비스 간 반응형 동작을 용이하게 하는 강력한 도구로 사용됩니다. 개발자들은 이를 활용하여 동적 데이터 흐름을 쉽게 다룰 수 있는 견고하고 반응적인 Angular 애플리케이션을 구축할 수 있습니다.



아래 GitHub 저장소에서 최종 코드를 얻어보세요.