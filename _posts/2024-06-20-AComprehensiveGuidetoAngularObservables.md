---
title: "앵귤러 Observable의 포괄적 가이드"
description: ""
coverImage: "/assets/img/2024-06-20-AComprehensiveGuidetoAngularObservables_0.png"
date: 2024-06-20 00:41
ogImage: 
  url: /assets/img/2024-06-20-AComprehensiveGuidetoAngularObservables_0.png
tag: Tech
originalTitle: "A Comprehensive Guide to Angular Observables"
link: "https://medium.com/@lquocnam/a-comprehensive-guide-to-angular-observables-bde5542346fc"
---


<img src="/assets/img/2024-06-20-AComprehensiveGuidetoAngularObservables_0.png" />

# 소개

Angular에서 Observables는 반응형 프로그래밍의 필수 요소로, 데이터 스트림을 통한 변경 전파에 중점을 둔 프로그래밍 패러다임입니다. Observables는 개발자가 콜백 또는 프로미스와 같은 전통적인 기술보다 비동기 데이터와 이벤트를 보다 간단하고 효율적으로 처리할 수 있게 합니다.

Observables는 실시간 데이터 업데이트, 이벤트 처리 및 더 많은 기능을 필요로 하는 복잡한 애플리케이션을 구축하는 강력한 도구입니다. 이 글에서는 Angular에서 Observables의 기본 개념, 작동 방식 및 가장 일반적인 사용 사례에 대해 알아보겠습니다. 이 글을 마치면 Observables가 어떻게 더 나은 Angular 애플리케이션을 구축하는 데 도움을 줄 수 있는지에 대해 확고한 이해를 갖게 될 것입니다.

<div class="content-ad"></div>

# 옵저버블이란 무엇인가요?

옵저버블은 Angular에서 반응형 프로그래밍의 핵심 기능입니다. 옵저버블은 시간에 따라 관찰할 수 있는 데이터 스트림입니다. 옵저버블은 배열이나 다른 데이터 구조와 유사하지만 몇 가지 주요 차이점이 있습니다:

- 옵저버블은 시간에 따라 여러 값을 반환할 수 있지만 배열은 정적이며 고정된 값 집합을 포함합니다.
- 옵저버블은 사용자 입력, 네트워크 요청 및 타이머와 같은 비동기 데이터 소스를 다룰 수 있지만 배열과 같은 동기 데이터 구조는 그렇지 않습니다.
- 옵저버블은 다양한 방식으로 결합, 변환 및 조합되어 더 복잡한 데이터 스트림을 생성할 수 있습니다.

옵저버블은 Angular 프레임워크의 중심 요소이며 이벤트 처리, 데이터 바인딩 및 비동기 프로그래밍에 널리 사용됩니다. 다음 섹션에서 Angular에서 옵저버블을 어떻게 생성하는지 살펴보겠습니다.

<div class="content-ad"></div>

# Observable Creation

앵귤러에서 Observable을 생성하는 여러 가지 방법이 있습니다. 사용 사례와 작업 중인 데이터 소스에 따라 다릅니다. 여기 몇 가지 일반적인 기술이 있습니다:

- 처음부터 Observable 생성: Observable 생성자를 사용하여 처음부터 Observable을 만들 수 있습니다. 이를 사용하면 사용자 지정 데이터 스트림을 정의하고 next() 메서드를 사용하여 수동으로 값을 전달할 수 있습니다. 다음은 예시입니다:

```js
const myObservable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});
```

<div class="content-ad"></div>

- RxJS 연산자 사용하기: RxJS는 Angular에서 Observables와 함께 작업하는 데 널리 사용되는 라이브러리로, Observables을 생성, 변환 및 결합하는 다양한 연산자를 제공합니다. 예를 들어, of() 연산자를 사용하여 다음과 같이 일정한 값 집합을 방출하는 Observable을 생성할 수 있습니다:

```js
import { of } from 'rxjs';

const myObservable = of(1, 2, 3);
```

- 이벤트에서 Observables 생성하기: DOM 이벤트나 다른 이벤트 소스로부터 Observable을 만들 수 있습니다. 이를 위해 fromEvent() 연산자를 사용할 수 있습니다. 이를 사용하면 사용자 입력이나 다른 이벤트를 반응적이고 효율적으로 처리할 수 있습니다. 다음은 예제입니다:

```js
import { fromEvent } from 'rxjs';

const button = document.getElementById('myButton');
const clickObservable = fromEvent(button, 'click');
```

<div class="content-ad"></div>

Angular에서 Observable을 만드는 많은 다른 기술들 중에는 promises, timers, 그리고 HTTP 요청과 함께 작업하는 방법이 포함됩니다. 다음 섹션에서는 operators를 사용하여 Observables를 다루는 방법을 살펴볼 것입니다.

# Observables와 Operators

Operators는 Angular에서 Observables를 다루는 핵심 기능입니다. Operators는 Observables를 다양한 방법으로 변환하거나 조작할 수 있게 해주는 함수들입니다. Angular에서 가장 일반적으로 사용되는 operators 중 일부는 다음과 같습니다:

- map(): map() operator는 Observable이 방출하는 각 값에 함수를 적용하여 변환합니다. 예를 들어, map()을 사용하여 숫자 스트림을 이들의 제곱 스트림으로 변환할 수 있습니다.

<div class="content-ad"></div>

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const numbers = of(1, 2, 3);
const squared = numbers.pipe(map(x => x * x));

squared.subscribe(x => console.log(x)); // 출력: 1, 4, 9
```

- filter(): filter() 연산자는 Observable이 지정된 조건을 충족하지 않는 값을 방출하지 않도록 필터링합니다. 예를 들어, filter()를 사용하여 스트림에서 짝수만 방출할 수 있습니다. 아래와 같이:

```js
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const numbers = of(1, 2, 3, 4, 5);
const evenNumbers = numbers.pipe(filter(x => x % 2 === 0));

evenNumbers.subscribe(x => console.log(x)); // 출력: 2, 4
```

- merge(): merge() 연산자는 여러 Observable을 하나의 값 스트림으로 결합합니다. 예를 들어, 두 개의 숫자 스트림을 단일 스트림으로 결합할 때 merge()를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
import { of, merge } from 'rxjs';

const numbers1 = of(1, 2, 3);
const numbers2 = of(4, 5, 6);
const merged = merge(numbers1, numbers2);

merged.subscribe(x => console.log(x)); // Output: 1, 2, 3, 4, 5, 6
```

Angular에는 tap(), switchMap(), 그리고 catchError()와 같은 다양한 연산자가 있습니다. 이러한 연산자들은 Angular 애플리케이션에서 더 강력하고 효율적인 데이터 스트림을 생성하는 데 도움이 될 수 있습니다.

# Observables 구독하기

Observable이 방출하는 데이터를 사용하려면 해당 Observable을 구독해야 합니다. Observable을 구독하는 것은 이벤트 리스너를 등록하는 것과 유사하며, Observable이 방출하는 값을 받아 처리할 수 있게 해줍니다. 다음은 Observable을 구독하는 예제입니다:

<div class="content-ad"></div>

```js
import { of } from 'rxjs';

const numbers = of(1, 2, 3);
numbers.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('Completed')
);
```

이 예제에서는 of() 연산자를 사용하여 Observable을 만들어 정해진 값 집합을 방출합니다. 그런 다음 Observable을 구독하고 세 가지 콜백 함수를 인수로 제공합니다:

- 첫 번째 함수는 Observable에서 방출된 각 값에 대해 처리하고 콘솔에 기록합니다.
- 두 번째 함수는 Observable 스트림 중 발생한 오류를 처리하고 콘솔에 기록합니다.
- 세 번째 함수는 Observable이 완료될 때 호출되어 콘솔에 메시지를 기록합니다.

이 코드를 실행하면 콘솔에 1, 2, 3 값이 기록된 후 "Completed" 메시지가 표시됩니다.

<div class="content-ad"></div>

Observables는 게으르다는 것이 중요합니다. 이는 구독하지 않는 한 값을 방출하지 않는다는 뜻입니다. Angular 애플리케이션에서 데이터를 검색하고 처리하는 방법과 시기를 제어할 수 있게 해줍니다. 그러나 Observables를 사용한 작업이 끝난 후에는 구독을 해제하여 메모리 누수와 다른 문제를 방지하는 것도 중요합니다.

# Angular 서비스에서 Observables 사용하기

Angular에서 Observables를 사용하는 가장 일반적인 사례 중 하나는 서비스에서 사용됩니다. 여기서 Observables를 사용하여 API, 데이터베이스 또는 기타 소스에서 데이터를 가져오고 조작할 수 있습니다. 다음은 가짜 API에서 데이터를 가져오기 위해 Observables를 사용하는 간단한 서비스 예제입니다:

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '<https://jsonplaceholder.typicode.com/posts>';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
```

<div class="content-ad"></div>

이 예제에서는 Angular의 내장 HttpClient를 사용하여 URL이 https://jsonplaceholder.typicode.com/posts인 가짜 API에 GET 요청을 하는 DataService라는 서비스를 만듭니다. 우리는 any[] 유형의 Observable을 반환하는 getPosts() 메서드를 정의합니다. 

컴포넌트에서 이 서비스를 사용하려면 생성자에 주입하고 getPosts() 메서드를 호출하면 됩니다:

```js
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Posts</h1>
    <ul>
      <li *ngFor="let post of posts">{{ post.title }}</li>
    </ul>
  `
})
export class AppComponent {
  posts: any[];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getPosts().subscribe(
      data => this.posts = data,
      error => console.error(error),
      () => console.log('Posts loaded')
    );
  }
}
```

이 예제에서는 AppComponent라는 컴포넌트를 만들어 DataService를 사용하여 가짜 API에서 게시물 목록을 가져옵니다. ngOnInit() 메서드를 정의하여 getPosts() Observable을 구독하고 전달된 값들을 처리합니다. Observable이 완료되면 컴포넌트의 posts 속성을 검색된 데이터로 설정합니다.

<div class="content-ad"></div>

이 방법으로 Obserbables와 서비스를 사용하면 Angular 애플리케이션에서 강력하고 유연한 데이터 파이프라인을 만들 수 있어요.

# Observables 조합하기

Observables의 가장 강력한 기능 중 하나는 다양한 방법으로 조합하고 조작할 수 있는 기능입니다. 이를 통해 다양한 유즈 케이스를 처리하는 복잡한 데이터 파이프라인을 만들 수 있어요. Angular에서 Observables를 조합하는 방법의 예시 몇 가지는 다음과 같아요:

- Merge: merge() 연산자를 사용하면 여러 Observables을 단일 스트림으로 결합할 수 있어요. 여기에 예시가 있어요:

<div class="content-ad"></div>

```js
import { interval, merge } from 'rxjs';

const source1 = interval(1000);
const source2 = interval(2000);
const merged = merge(source1, source2);
merged.subscribe(
  value => console.log(value)
);
```

이 예시에서는 interval() 연산자를 사용하여 1초마다 값과 2초마다 값이 발행되는 두 개의 Observable을 생성합니다. 그런 다음 merge() 연산자를 사용하여 이 두 개의 Observable을 하나의 스트림으로 병합합니다. 마지막으로 병합된 Observable을 구독하고 각 발행된 값마다 콘솔에 기록합니다.

- CombineLatest: combineLatest() 연산자를 사용하면 여러 Observable이 발행한 최신 값들을 하나의 스트림으로 결합할 수 있습니다. 다음은 예시입니다:

```js
import { interval, combineLatest } from 'rxjs';

const source1 = interval(1000);
const source2 = interval(2000);
const combined = combineLatest(source1, source2);
combined.subscribe(
  value => console.log(value)
);
```

<div class="content-ad"></div>

이 예제에서는 interval() 연산자를 사용하여 각각 1초마다 값과 2초마다 값이 방출되는 두 Observables을 만듭니다. 그런 다음 combineLatest() 연산자를 사용하여 두 Observables에서 최신 값들을 결합하여 단일 스트림으로 만듭니다. 마지막으로 결합된 Observable에 구독하여 각 방출된 값을 콘솔에 기록합니다.

- Zip: zip() 연산자를 사용하면 여러 Observables에서 방출된 값들을 배열로 결합할 수 있습니다. 다음은 예시입니다:

```js
import { of, zip } from 'rxjs';

const source1 = of(1, 2, 3);
const source2 = of('a', 'b', 'c');
const zipped = zip(source1, source2);
zipped.subscribe(
  value => console.log(value)
);
```

이 예제에서는 of() 연산자를 사용하여 일정한 값 집합을 방출하는 두 Observables을 만듭니다. 그런 다음 zip() 연산자를 사용하여 두 Observables에서 방출한 값을 배열로 결합합니다. 마지막으로 zipped Observable을 구독하여 각 방출된 값을 콘솔에 기록합니다.

<div class="content-ad"></div>

이 방식으로 옵저버블을 결합하고 조작함으로써, Angular 애플리케이션에서 다양한 유즈 케이스를 처리할 수 있는 복잡한 데이터 파이프라인을 만들 수 있습니다.

# 데이터를 변형하고 필터링하기 위해 오퍼레이터 사용하기

오퍼레이터는 옵저버블이 방출한 데이터를 변형하거나 필터링하거나 기타 방식으로 조작할 수 있는 함수들입니다. Angular 옵저버블과 함께 사용할 수 있는 많은 오퍼레이터가 RxJS 라이브러리에 제공되며, 여기에 몇 가지 예시가 있습니다:

- Map: map() 오퍼레이터를 사용하면 옵저버블에서 방출된 각 값을 새 값으로 변환할 수 있습니다. 다음은 예시입니다:

<div class="content-ad"></div>

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const source = of(1, 2, 3);
const mapped = source.pipe(map(value => value * 2));
mapped.subscribe(
  value => console.log(value)
);
```

이 예제에서는 of() 연산자를 사용하여 값을 고정된 세트로 방출하는 Observable을 생성합니다. 그런 다음 map() 연산자를 사용하여 각 방출된 값에 2를 곱해 변환합니다. 마지막으로 매핑된 Observable에 구독하고 각 방출된 값을 콘솔에 로깅합니다.

- Filter: filter() 연산자를 사용하면 주어진 조건에 따라 Observable에서 방출된 값을 필터링할 수 있습니다. 다음은 예시입니다:

```js
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const source = of(1, 2, 3);
const filtered = source.pipe(filter(value => value % 2 === 0));
filtered.subscribe(
  value => console.log(value)
);
```

<div class="content-ad"></div>

이 예시에서는 of() 연산자를 사용하여 Observable을 만듭니다. 이 연산자는 고정된 값 집합을 방출합니다. 그런 다음 filter() 연산자를 사용하여 짝수인 값만 방출하도록합니다. 마지막으로 필터링된 Observable을 구독하고 콘솔에 각 방출된 값을 기록합니다.

- Reduce: reduce() 연산자를 사용하면 Observable이 방출하는 값들을 누적하고 단일 값으로 반환할 수 있습니다. 다음은 예제입니다:

```js
import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';

const source = of(1, 2, 3);
const reduced = source.pipe(reduce((acc, value) => acc + value));
reduced.subscribe(
  value => console.log(value)
);
```

이 예시에서는 of() 연산자를 사용하여 고정된 값 집합을 방출하는 Observable을 만듭니다. 그런 다음 reduce() 연산자를 사용하여 Observable이 방출하는 값들을 누적하고 그 합계를 반환합니다. 마지막으로 누적된 Observable을 구독하고 콘솔에 최종 누적 값의 로그를 남깁니다.

<div class="content-ad"></div>

연산자인 map(), filter(), reduce()와 같은 것을 사용하여 Observable이 방출하는 데이터를 변환, 필터링하고 조작하여 Angular 애플리케이션에서 특정한 사용 사례에 맞게 맞출 수 있습니다.

# Subjects를 사용하여 값을 방출하기

Observable 외에도 RxJS 라이브러리는 여러 구독자에게 값을 방출할 수 있는 Subject 클래스를 제공합니다. Subject는 Observable과 Observer 둘 다이므로 값을 방출하고 다른 Observables에 구독할 수 있습니다.

다음은 Angular에서 Subject를 생성하는 예제입니다:

<div class="content-ad"></div>

```js
import { Subject } from 'rxjs';

export class MyComponent {
  mySubject = new Subject<string>();
  emitValue(value: string) {
    this.mySubject.next(value);
  }
}
```

이 예시에서는 문자열 유형의 Subject를 생성하고 MyComponent 클래스의 속성으로 저장합니다. 그런 다음 emitValue() 메서드를 정의하고 해당 값을 mySubject 객체의 next() 메서드를 호출하여 구독자에게 해당 값을 방출합니다.

Subject를 다른 Observable처럼 구독할 수 있습니다:

```js
myComponent.mySubject.subscribe(
  value => console.log(value)
)
```

<div class="content-ad"></div>

이 예시에서는 myComponent 객체의 mySubject Subject에 구독(subscribe)하여 발생한 모든 값들을 콘솔에 기록합니다.

한 가지 주의할 점은 Subject를 구독할 때 Subject가 생성된 이후에 발생한 모든 값들을 받게 되는 것입니다. 구독 이후에 발생한 값들만 받고 싶다면 BehaviorSubject를 사용할 수 있습니다:

```js
import { BehaviorSubject } from 'rxjs';

export class MyComponent {
  mySubject = new BehaviorSubject<string>('initial value');
  emitValue(value: string) {
    this.mySubject.next(value);
  }
}
```

이 예시에서는 string 타입의 BehaviorSubject를 생성하고 초기값을 `initial value`로 설정합니다. BehaviorSubject를 구독하면 초기값을 먼저 받은 뒤에 구독 이후에 발생한 모든 값들을 받게 됩니다.

<div class="content-ad"></div>

Subject 및 BehaviorSubject을 사용하면 Angular 애플리케이션에서 값들을 발행하고 구독하는 강력한 방법이 될 수 있습니다. 이를 통해 컴포넌트와 서비스 간에 데이터를 쉽게 공유할 수 있으며 복잡한 데이터 흐름 시나리오를 간단화할 수 있습니다.

# 결론

Angular Observables은 Angular 애플리케이션의 비동기 데이터 흐름을 관리하는 강력한 도구입니다. RxJS 라이브러리의 도움으로 사용자 입력부터 HTTP 요청까지 모두 처리할 수 있는 Observables을 만들고 조작할 수 있습니다.

이 글에서는 Observables의 기본을 다룰 때, 생성하고 구독하는 방법 및 연산자를 사용하여 발행된 값들을 변환하고 필터링하는 방법을 다뤘습니다. 또한 Subject을 사용하여 여러 구독자에게 값을 발행하는 고급 주제도 살펴보았습니다.

<div class="content-ad"></div>

앵귤러 옵저버블을 효과적으로 활용하는 방법을 이해하면, 더 반응형이고 빠른 응용 프로그램을 만들어 사용자 경험을 향상시킬 수 있습니다. 간단한 양식 데이터든 복잡한 데이터 스트림이든 옵저버블을 사용하면 쉽게 관리할 수 있습니다.

다음에 앵귤러 응용 프로그램을 작성할 때는 데이터 흐름 요구 사항을 처리하기 위해 옵저버블을 사용해보세요. 강력한 기능과 다양한 기능 세트로, 보다 견고하고 유연하며 확장 가능한 응용 프로그램을 만들 수 있을 것입니다.