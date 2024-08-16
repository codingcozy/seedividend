---
title: "Angular에서 컴포넌트간 데이터 전달하기"
description: ""
coverImage: "/assets/img/2024-06-20-PassingDataBetweenComponentsinAngular_0.png"
date: 2024-06-20 03:06
ogImage: 
  url: /assets/img/2024-06-20-PassingDataBetweenComponentsinAngular_0.png
tag: Tech
originalTitle: "Passing Data Between Components in Angular"
link: "https://medium.com/@reurairin/passing-data-between-components-in-angular-6230619fe0e3"
isUpdated: true
---




<img src="/assets/img/2024-06-20-PassingDataBetweenComponentsinAngular_0.png" />

작년에 Angular 개발자 포지션에 대한 면접을 많이 진행했었는데, 가장 자주 나온 질문 중 하나가 "Angular에서 컴포넌트간 데이터를 전달하는 방법은 무엇인가요?" 였어요. 이 프레임워크를 잘 알고 있는 사람들에겐 답이 상당히 직관적으로 보일 수 있지만, 처음에 생각한 것 이상으로 그 깊이가 있습니다. 이 질문은 면접관들이 선호하는데, 이는 지원자의 Angular 및 일반 웹 기술에 대한 지식을 측정할 수 있고 창의력을 발휘할 자유가 있기 때문이죠.

본 기사에서는 그것을 수행할 수 있는 방법들을 비교적 포괄적으로 나열해 보려고 합니다. 비교적 일반적이지 않은 방법에 대해 심층적으로 다루기도 합니다. 컴포넌트 간 데이터를 전달하기 위한 다양한 합리적인 방법이 있다면, 덧글에 남겨주시면 기쁘게 기사에 추가하도록 하겠습니다.

이 기사는 취업 면접을 준비하는 초보 및 중급 Angular 개발자들을 대상으로 합니다. 자세한 안내서가 아닌 모든 옵션을 보기 위한 개략적인 안내를 목적으로 합니다. 면접 준비를 위해 더 탐구할 만한 흥미로운 대화 주제들을 굵게 강조하여 포함하려고 노력했어요.

<div class="content-ad"></div>

# @Input() 데코레이터

@Input() 데코레이터는 Angular에서 컴포넌트 간 데이터를 전달하는 방법 중 가장 먼저 떠오르는 것입니다. 부모 컴포넌트로부터 데이터를 자식 컴포넌트로 전달하는 간단한 방법입니다.

@Input()은 컴포넌트 트리에서 서로 직접적으로 관련된 경우에 특히 유용합니다. 서로 직접적으로 관련되지 않은 경우에는 여러 컴포넌트 사이를 통해 동일한 데이터를 전달해야 하는 "prop drilling"이라고 불리는 방법을 사용해야 할 수도 있습니다. 이 용어는 React에서 나온 것이며, props가 Angular의 @Input()과 유사한 역할을 합니다. Prop drilling은 실수가 발생하기 쉬우며, 애플리케이션이 커질수록 불편해지고 에러가 발생할 가능성이 높아집니다.

@Input()의 또 다른 일반적인 사용 사례는 "어리석은(stupid)" 또는 "표현(representational)" 컴포넌트를 구축하는 것입니다. 이 경우, 부모 컴포넌트는 상태를 관리하고 @Input() 데코레이터를 통해 자식들로 데이터를 업데이트합니다.

<div class="content-ad"></div>

## 예시:

parent.component.ts

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h2>Parent Component</h2>
    <app-child [childMessage]="parentMessage"></app-child>
  `,
})
export class ParentComponent {
  parentMessage = "Message from Parent";
}
```

child.component.ts

<div class="content-ad"></div>

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h4>Child Component</h4>
    {{ childMessage }}
  `,
})
export class ChildComponent {
  @Input() childMessage: string;
}
```

# @Output() 데코레이터

@Input()의 정반대로, @Output() 데코레이터는 자식 컴포넌트에서 상위 컴포넌트 또는 컴포넌트 트리 상단에 있는 다른 컴포넌트로 이벤트를 발생시키는 데 사용됩니다.

@Output()을 사용하면, 자식 컴포넌트가 사용할 사용자 지정 이벤트를 정의하며, 이 이벤트를 가지고 있는 부모나 이벤트에 응답해야 하는 다른 컴포넌트가 해당 이벤트를 듣게 됩니다. 이 이벤트는 자식 컴포넌트가 부모에게 버튼 클릭, 폼 제출 또는 데이터 변경과 같은 사항이 발생했음을 알리기 위해 필요할 때 발생됩니다.


<div class="content-ad"></div>

좋은 연결고리가 될 것입니다. 또한, Event Driven Architecture에 대해 이야기할 수 있는 기회가 됩니다. 이는 본문의 범위를 벗어난 내용이지만, 더 자세히 알아볼 만한 주제입니다.

## 예시:

child.component.ts

```javascript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendMessage()">Send Message</button>
  `,
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Message from Child');
  }
}
```

<div class="content-ad"></div>

parent.component.ts

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h2>Parent Component</h2>
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
    <p>{ message }</p>
  `,
})
export class ParentComponent {
  message: string;

  receiveMessage($event: string) {
    this.message = $event;
  }
}
```

이 예시에서는 자식 컴포넌트가 @Output() 데코레이터를 사용하여 messageEvent라는 사용자 정의 이벤트를 정의합니다. sendMessage() 메서드가 호출되면 messageEvent 이벤트가 'Message from Child'라는 문자열 값을 가지고 발생됩니다.

부모 컴포넌트는 (messageEvent) 바인딩을 사용하여 messageEvent 이벤트를 청취하고 receiveMessage() 메서드에서 처리합니다. $event 매개변수는 자식 컴포넌트에서 발생된 데이터를 수신하는 데 사용됩니다.

<div class="content-ad"></div>

# RxJS Subject을 사용한 서비스 활용

컴포넌트들이 컴포넌트 트리에서 더 멀리 떨어져 있을 때, @Input() 및 @Output()을 사용하여 데이터를 전달하면 혼란스럽고 유지 관리하기 어려워질 수 있습니다. 이러한 경우에는 공유 서비스를 사용하여 데이터를 관리하고 공유할 중심적인 위치를 제공할 수 있습니다.

RxJS 라이브러리는 서비스에서 데이터를 관리하고 컴포넌트가 데이터 변경에 구독할 수 있도록 Subject 클래스를 제공합니다.

비유를 하자면, 소식을 공유하는 것과 비슷합니다. 이웃들과 소문을 공유할 때 한 명에게 정보를 전달하고 그들로부터 정보를 받는 것과 유사합니다. 이는 Angular에서 @Input() 및 @Output() 데코레이터를 사용하는 것과 비슷합니다. 그러나 반면에 기사를 작성하여 신문사에 보내면 개인적으로 알지 못하는 광범위한 청중에게 방송됩니다. 이는 Angular에서 서비스를 사용하는 것과 비슷합니다.

<div class="content-ad"></div>

## 예시:

데이터 서비스

```js
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new Subject<string>();
  data$ = this.data.asObservable();

  setData(data: string) {
    this.data.next(data);
  }
}
```

송신자 컴포넌트

<div class="content-ad"></div>

```js
import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sender',
  template: `
    <h3>보내는 컴포넌트</h3>
    <button (click)="sendData()">데이터 전송</button>
  `,
})
export class SenderComponent {
  constructor(private dataService: DataService) {}

  sendData() {
    this.dataService.setData('보내는 컴포넌트에서 온 데이터');
  }
}
```

receiver.component.ts

```js
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-receiver',
  template: `
    <h3>받는 컴포넌트</h3>
    <p>{{ data }}</p>
  `,
})
export class ReceiverComponent implements OnDestroy {
  data: string = '';
  subscription: Subscription;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.data$.subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

이 예시에서 SenderComponent는 DataService를 주입받고 setData() 메서드를 호출하여 데이터 Subject를 통해 데이터를 발행합니다. 이 데이터는 data$ Observable에 구독한 다른 컴포넌트에서 수신할 수 있습니다. ReceiverComponent는 DataService의 data$ Observable에 구독하여 새로운 데이터가 발행될 때마다 업데이트를 수신합니다. 구독을 저장하는 subscription 속성은 ngOnDestroy() 메서드에서 구독을 해지하여 메모리 누수를 방지합니다.


<div class="content-ad"></div>

# 신호를 사용한 서비스

Angular 16에서 소개된 신호는 반응성 처리를 위한 새로운 방법을 제공합니다. RxJS의 어려운 학습 곡선을 피하고자 하는 경우, 이러한 단점을 회피하는 데 도움이 됩니다.

이 접근 방식의 전반적인 논리는 동일합니다: 여전히 서비스 내부에 상태를 중앙 집중식으로 추적하고 상태 업데이트를 허용하며 업데이트된 상태로 반환하는 것이 있지만, 이 경우에는 Subject가 아닌 신호입니다.

이 글을 작성하는 시점에서 신호가 널리 사용되기까지는 시간이 걸릴 수 있습니다(기술 미리보기 단계에 있습니다) 그리고 일부 오래된 코드베이스에서는 단순히 리팩토링 비용이 너무 많이 발생하여 결코 신호를 사용하지 않을 수 있습니다. 하지만 이 프레임워크의 동향을 파악하고 있다는 것을 보여주기 때문에 면접 시 신호에 대해 언급하는 것이 좋습니다.

<div class="content-ad"></div>

## 예시:

data.service.ts

```js
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSignalService {
  private data = signal('');

  setData(update: string) {
    this.data.set(update);
  }

  getData(){
    return this.data;
  }
}
```

<div class="content-ad"></div>

```js
import { Component } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-sender-signal',
  template: `
    <h3>보내는 컴포넌트</h3>
    <button (click)="sendData()">데이터 전송</button>
  `,
})
export class SenderSignalComponent {
  constructor(private dataService: DataSignalService) {}

  sendData() {
    this.dataService.setData('보내는 컴포넌트에서 온 데이터');
  }
}
```

receiver.component.ts

```js
import { Component } from '@angular/core';
import { DataSignalService } from '../data.service';

@Component({
  selector: 'app-receiver-signal',
  template: `
    <h3>받는 컴포넌트</h3>
    <p>{ data() }</p>
  `,
})
export class ReceiverSignalComponent {
  data;

  constructor(private dataService: DataSignalService) {
    this.data = this.dataService.getData();
  }
}
```

# 상태 관리 도구

<div class="content-ad"></div>

상태 관리 도구는 많은 상태를 관리해야 할 때 특히 응용 프로그램 상태를 중앙에서 관리하는 방법을 제공합니다. 이 도구들은 코드를 조직하는 것을 쉽게 만들어줄 뿐 아니라 중복되는 데이터 흐름을 피하고 테스트를 용이하게 합니다. 이러한 도구들은 비동기 데이터를 더 쉽게 처리하고, 필요한 코드의 중복을 줄이며 컴포넌트 간에 상태를 쉽게 공유할 수 있도록 도와줍니다.

Angular를 위한 인기 있는 상태 관리 솔루션으로는 NgRx, Akita, 그리고 Elf가 있습니다. NgRx는 옵저버블을 사용하고 해당 처리를 위한 연산자 세트를 제공하는 Redux를 벤치마킹한 상태 관리 도구입니다. 더 가파른 학습 곡선과 상당한 양의 보일러플레이트 코드가 있지만 더 강력하다고 여겨집니다. Netanel Basal의 Akita는 일반적으로 NgRx보다 간단하다고 여겨지며 효과적인 메모리 관리 덕분에 성능이 우수합니다. Elf는 Netanel Basal이 저자인 더 신선하고 더 미니멀한 상태 관리 도구로, 다음 버전은 RxJS Subject를 사용할 것이라고 농담하기도 합니다.

이러한 도구들은 장점을 갖고 있지만 응용 프로그램에 추가 복잡성을 도입합니다. 상태 관리 도구를 통합하기 전에 응용 프로그램이 실제로 상태 관리 도구가 필요한지를 평가하는 것이 중요합니다. 작고 비교적 간단한 상태 관리가 필요한 작은 응용 프로그램의 경우 Redux와 유사한 도구를 사용하는 것이 지나칠 수 있고 코드베이스에 불필요한 복잡성을 추가할 수 있습니다. 그러나 응용 프로그램이 성장하고 상태 관리 요구사항이 복잡해진다면 상태 관리 도구를 사용하여 코드를 더 잘 구성하고 유지보수하기 쉽게 할 수 있습니다.

<div class="content-ad"></div>

# 백엔드 API 사용하기

요즘 프론트엔드 커뮤니티에서 큰 이슈 중 하나는 서버 상태와 클라이언트 상태를 구분하는 것입니다.

옛날에는 클라이언트가 양식 데이터를 받아서 서버로 전송하고 사용자에게 응답을 알려주는 것에만 신경을 쓰곤 했습니다. 그러나 지난 10년간 클라이언트 측은 응용 프로그램의 상태와 비즈니스 로직을 처리하는 데 점점 더 많은 책임을 맡게 되었습니다. 이제 그릇의 진자가 다시 흔들리고 있으며, 점점 더 많은 개발자들이 상태의 어느 부분이 어디에 속하는지에 대해 더 신중해지려고 합니다.

서버 상태는 서버에 저장된 데이터를 가리키며, 클라이언트가 필요할 때 서버에서 요청하는 데이터를 말합니다. 서버 상태가 자주 변경되는 애플리케이션에서는 클라이언트 측에 데이터를 캐싱하는 것이 현실적이지 않을 수 있으며, 일정 주기로 서버에서 데이터를 다시 가져와야 할 필요가 있을 수 있습니다.

<div class="content-ad"></div>

고객 상태는 다른 쪽으로, 즉 클라이언트 측에 저장되고 응용 프로그램에 의해 관리되는 데이터입니다. 이 데이터는 자주 변경될 수 있으며 일반적으로 사용자 세션에 특화됩니다. 고객 상태의 예시로는 사용자 선호도, 쇼핑 카트 데이터 및 사용자에게 고유한 데이터 등이 있습니다.

일부 경우에는 서버에 데이터를 저장하고 필요에 따라 다른 컴포넌트에서 다시 가져오는 것이 더 효율적일 수 있습니다. 이렇게 함으로써 초기 요청에서로드해야 하는 데이터 양을 줄이고 애플리케이션의 전반적인 성능을 향상시킬 수 있습니다.

다른 경우에는 데이터를 클라이언트 측에 저장하고 상태 관리 도구나 다른 클라이언트 측 저장 메커니즘을 사용하여 관리하는 것이 더 적합할 수 있습니다. 이렇게 함으로써 만들어야 하는 API 요청 수를 줄이고 응용 프로그램을 반응적으로 만들어 사용자 경험을 향상시킬 수 있습니다.

일반적으로, 데이터를 저장하고 검색하기 위해 백엔드 API를 사용하는 시기 및 방법은 응용 프로그램의 특정 요구 사항 및 작업 중인 데이터 유형에 따라 다릅니다.

<div class="content-ad"></div>

# QueryParams

그런데 Angular로 다시 돌아와서, 네비게이션에 관한 몇 가지 주제에 대해 이야기해 봅시다.

데이터를 전달하기 위해 QueryParams를 사용하면 사용자가 링크를 공유함으로써 페이지 상태를 재현하는 강력한 방법이 됩니다. 이는 Angular에 특화된 기능은 아니지만 해당 프레임워크에서 이를 처리하는 도구가 함께 제공됩니다.

쿼리 매개변수는 URL의 끝에 추가되며 경로 다음에 물음표(?)로 시작합니다. 각 매개변수는 키-값 쌍으로 구성되어 있고, 키와 값은 등호(=)로 구분됩니다. 하나의 URL에 여러 쿼리 매개변수를 포함시킬 수 있습니다. 이들은 앰퍼샌드(&)로 구분됩니다. QueryParams에 익숙하지 않다면, 이 섹션의 끝에 있는 예제 URL을 확인하여 구문을 이해하는 데 도움이 될 수 있습니다.

<div class="content-ad"></div>

일반적으로 사용자들이 서로 링크를 공유하길 원할 수 있다는 것을 알고 있다면 QueryParams를 사용하는 것이 UX에 좋습니다. 동료와 링크를 공유하고 그 링크를 클릭했을 때 정확히 같은 페이지를 보는 느낌은 정말 좋습니다.

단점은 링크를 너무 길고 마음에 들지 않게 만들 수 있으며, 특히 일부 긴 ID가 포함된 경우 사용자와 제품 소유자 양쪽에게 혼란스러울 수 있습니다. 개발자로서 "링크가 지나치게 길어도 상관없지 않냐, 중요한 것은 그게 그 일을 잘하는 것이지"라고 생각하기 쉽지만, 링크를 더 짧게 만들라는 관리자의 지시를 받을 수도 있으니 놀랍지 마세요 (진짜 이야기).

QueryParams를 사용하면 문자열이나 숫자와 같은 간단한 데이터 유형뿐만 아니라 더 복잡한 객체도 저장할 수 있습니다. 사용자가 QueryParams를 포함하는 URL로 이동하면 Angular가 QueryParams을 자동으로 구문 분석하고 ActivatedRoute 서비스를 통해 해당 컴포넌트에서 사용할 수 있게 합니다.

## 예시:

<div class="content-ad"></div>

위치 정의

```js
{ path: 'product',
  component: ProductDetailComponent,
  queryParams: {
    showReviews: 'true',
    
  }
}
```

QueryParams에 액세스하기

```js
 constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get('showReviews'))
  }
```

<div class="content-ad"></div>

결과 URL

```js
https://www.example.com/?showReviews=true&greeting=Hello%20component
```

(공백이 인코딩된 표현으로 대체되었음을 확인하세요.)

# Route Params

<div class="content-ad"></div>

QueryParams과 유사하게, Route Params는 URL을 통해 데이터를 구성하는 또 다른 방법을 제공합니다. 두 가지 방법의 차이는 QueryParams는 선택적 매개변수를 전달하는 데 사용되는 반면, Route Params는 필수입니다.

Route Params를 사용하면 URL이 더 표현적이 되고 탐색이 더 직관적해질 수 있습니다. 이는 디스크 디렉토리를 연상시키는 명확한 계층구조를 구축하기 때문입니다.

## 예시:

경로 정의

<div class="content-ad"></div>

```js
{ path: '제품/:id', component: ProductDetailComponent }
```

라우트 파라미터에 접근

```js
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe(params => {
      console.log(params.id);
    });
}
```

결과 URL

<div class="content-ad"></div>

https://www.example.com/product/1234

# 내비게이션 시 데이터 전달

Router.navigate()는 state라는 옵션 매개변수를 사용하여 데이터를 전달할 수 있습니다. 전달한 데이터는 내비게이션한 경로에서 사용할 수 있습니다. 이 기능은 쿼리 매개변수로 데이터를 전달할 수 없는 경우에 유용합니다.

다만, 이 데이터는 영속적이지 않으며 내비게이션이 이루어진 후에만 사용 가능하며, 페이지 새로고침을 하거나 다른 방법으로 페이지로 이동하는 경우에는 유실될 수 있습니다.

<div class="content-ad"></div>

## 예시:

상태 전달

```js
this.router.navigate(['/destination-route'], { state: { exampleData: 'Hello component.' } });
```

상태 수신

<div class="content-ad"></div>

```js
let state = this.router.getCurrentNavigation().extras.state;

if (state) {
    console.log(state.exampleData);
}
```

# 로컬 스토리지와 세션 스토리지

로컬 스토리지와 세션 스토리지는 내장된 브라우저 API로, 브라우저에 키-값 쌍을 저장할 수 있게 해줍니다. 두 가지의 차이점은 로컬 스토리지가 브라우저에 데이터를 영구적으로 저장하고, 브라우저를 닫았다가 다시 열어도 유지된다는 것이며, 세션 스토리지는 세션만큼만 데이터를 보관하며 사용자가 탭이나 창을 닫을 때 데이터가 손실된다는 것입니다.

Angular 애플리케이션에서 상태를 저장하는 데 로컬 스토리지나 세션 스토리지를 사용하는 것은 페이지를 다시로드할 때나 사용자가 나중에 애플리케이션으로 돌아올 때 데이터를 계속 유지하고 싶을 때 유용합니다. 그러나 로컬 스토리지나 세션 스토리지에 너무 많은 데이터를 저장하면 애플리케이션의 성능이 저하되고 극단적인 경우 애플리케이션이 다운될 수 있음을 주의해야 합니다.

<div class="content-ad"></div>

다른 고려 사항은 보안입니다. 로컬 저장소와 세션 저장소는 안전하지 않으며, 그 안에 저장된 모든 데이터는 동일 출처에서 실행 중인 모든 스크립트에 의해 액세스할 수 있습니다. 따라서 민감한 데이터를 로컬 저장소나 세션 저장소에 저장하지 않는 것이 중요합니다.

# 쿠키

유명한 쿠키는 웹사이트에서 보내어 사용자 컴퓨터에 저장되는 작은 데이터 조각입니다. 일반적으로 사용자의 기본 정보, 로그인 자격 증명 및 브라우징 기록을 저장하는 데 사용됩니다.

Angular에서 구성 요소 간에 데이터를 전달하는 맥락에서, 쿠키를 사용하여 서로 다른 세션이나 페이지 간에 지속되어야 하는 데이터를 저장할 수 있습니다. 예를 들어, 사용자 기본 설정이나 설정을 쿠키에 저장하고 애플리케이션의 다른 부분에서 이를 검색할 수 있습니다.

<div class="content-ad"></div>

쿠키에는 몇 가지 제한이 있습니다. 크기가 제한되어 있고, 브라우저에는 일반적으로 웹 사이트에서 저장할 수 있는 쿠키의 수에 제한이 있습니다. 또한 쿠키는 웹 사이트로의 모든 요청과 함께 보내지며, 성능에 영향을 줄 수 있으며 네트워크를 통해 전송해야 하는 데이터 양을 증가시킬 수 있습니다.

특정 국가의 웹 사이트에서 쿠키를 사용하는 경우 법적 책임도 고려해야 합니다. 예를 들어, EU에서는 쿠키 사용 전에 사용자의 동의를 요구해야 하므로 대부분의 웹 사이트에서 방해가 되는 팝업이 표시됩니다.

# 결론

한 컴포넌트에서 다른 컴포넌트로 데이터를 전달하는 것은 종종 응용 프로그램 상태를 관리하는 것과 함께 이루어집니다. 이는 많은 설계 결정이 필요한 복잡한 주제이므로, 본 문서가 여러분에게 옵션에 대한 간략한 개요를 제공해 드렸기를 바랍니다.

<div class="content-ad"></div>

처음에 언급했듯이, Angular에서 컴포넌트 간 데이터를 전달하는 더 많은 방법을 알고 계신다면 댓글을 남기거나 저에게 연락해주시면 함께 이 목록을 더 다채롭게 만들 수 있을 것입니다.