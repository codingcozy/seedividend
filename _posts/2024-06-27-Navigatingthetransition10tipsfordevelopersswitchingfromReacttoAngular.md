---
title: "React에서 Angular로 전환하는 개발자를 위한 10가지 팁"
description: ""
coverImage: "/assets/img/2024-06-27-Navigatingthetransition10tipsfordevelopersswitchingfromReacttoAngular_0.png"
date: 2024-06-27 17:59
ogImage:
  url: /assets/img/2024-06-27-Navigatingthetransition10tipsfordevelopersswitchingfromReacttoAngular_0.png
tag: Tech
originalTitle: "Navigating the transition: 10 tips for developers switching from React to Angular"
link: "https://medium.com/fever-engineering/navigating-the-transition-10-tips-for-developers-switching-from-react-to-angular-b308aba185e5"
isUpdated: true
---

![이미지](/assets/img/2024-06-27-Navigatingthetransition10tipsfordevelopersswitchingfromReacttoAngular_0.png)

React에서 Angular로 전환하는 것은 개발자들에게 도전적이면서 보상이 있는 여정일 수 있습니다. 각 프레임워크마다 고유한 원칙, 구문 및 관습이 있어 전환 과정은 신중히 진행되어야 합니다.

Fever에서는 특정 언어나 프레임워크의 경험보다는 기술에 기반하여 최고 수준의 엔지니어를 채용하기를 우선시합니다. 따라서, React에서 Angular로의 전환은 우리 엔지니어들에게 일상적인 일입니다.

본 글에서는 React에서 Angular로의 개발자 전환을 원활히 돕기 위해 우리에게 유용했던 10가지 팁을 살펴보겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 팁 01: ngIf 구조 지시문 사용하기

● React에서는 조건부 렌더링을 사용하여 컴포넌트나 요소를 렌더링할지 여부를 결정할 수 있습니다. 다음은 이를 구현한 예시입니다:

```js
const ConditionalComponent = ({ shouldRender }) => {
  return shouldRender ? <div>조건에 따라 렌더링됩니다</div> : null;
};
```

● Angular에서는 템플릿에서 \*ngIf 구조 지시문을 사용하여 요소를 조건부로 렌더링하는 것이 일반적합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<ng-container *ngIf="shouldRender">
  This is rendered conditionally
</ng-container>
```

\*Angular v17 will have a new built-in control flow template syntax for if block conditionals

## Tip 02: Using ngFor structural directive

- In React, you use the map function to iterate over an array and create a list of elements.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
const ListComponent = ({ items }) => {
  return (
    - 목록
      - {items.map((item, index) => (
        - <li key={item.id}>
          - {index + 1}. {item.name}
      - ))}
  );
};
```

- Angular에서는 \*ngFor 구조 지시자를 사용하여 템플릿에서 요소를 반복할 수 있습니다.

```js
- 목록
    - <li *ngFor="let item of items; let i = index">
        { i + 1 }. { item.name }
    - </li>
```

- Angular v17에서는 블록 반복기를 위한 새로운 내장 제어 흐름 템플릿 구문이 제공될 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 팁 03: TrackByFunction을 사용하여 목록 렌더링 개선하기:

● React에서 요소 목록을 렌더링할 때는 각 요소에 고유한 key 속성을 할당해야 합니다. 이를 통해 React가 각 요소를 고유하게 식별하고 효율적으로 DOM을 업데이트할 수 있습니다.

```js
const ListComponent = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          {index + 1}. {item.name}
        </li>
      ))}
    </ul>
  );
};
```

● Angular에서는 trackBy 함수를 사용하여 동일한 결과를 얻을 수 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { Component } from "@angular/core";

interface ListItem {
  id: number;
  name: string;
}

@Component({
  selector: "app-list",
  template: `
    <ul>
      <li *ngFor="let item of items; trackBy: trackByFn">{ item.id } - { item.name }</li>
    </ul>
  `,
})
export class ListComponent {
  items: Array<ListItem> = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  trackByFn(index: number, item: ListItem): number {
    return item.id; // Return a unique identifier for each item
  }
}
```

## 팁 04: 프로퍼티 바인딩

● React에서는 데이터가 부모 구성 요소에서 자식 구성 요소로 props로 전달됩니다. 자식 구성 요소는 이러한 props을 받아 렌더링에 사용합니다.

```js
import React from "react";

const ImageComponent = ({ imageUrl }) => {
  return <img src={imageUrl} alt="React Image" />;
};

export default ImageComponent;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

안녕하세요! 다음은 Angular에서 속성 바인딩을 사용하는 방법입니다. 속성 바인딩은 컴포넌트의 속성을 HTML 요소 속성이나 디렉티브에 바인딩하는 데 사용됩니다.

```js
<img [src]="imageUrl" alt="Angular Image" />
```

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-example",
  template: '<img [src]="imageUrl" alt="Angular Image" />',
})
export class ExampleComponent {
  @Input() imageUrl: string;
}
```

## 팁 05: 이벤트 바인딩

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

● React에서는 콜백 함수를 전달하기 위해 props를 사용하여 동일한 기능을 구현할 수 있습니다.

```js
const ChildComponent = ({ onCustomEvent }) => (
  <button onClick={onCustomEvent}>Click me</button>
);

const App = () => {
  const [message, setMessage] = useState('');

  const handleCustomEvent = () => {...};

  return (
    <ChildComponent onCustomEvent={handleCustomEvent} />
  );
};
```

● Angular에서는 이벤트 바인딩을 통해 사용자 작업 (키 입력, 마우스 이동, 클릭, 터치 등)을 감지하고 대응할 수 있습니다.

```js
@Component({
  selector: 'app-child',
  template: `
    <button (click)="doSomething()">Click me</button>
  `,
})
export class ChildComponent {
  doSomething() {...}
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

만일 자료를 부모 컴포넌트로 전달하고 싶다면, 자식 컴포넌트에서 @Output() 데코레이터를 사용할 수 있어요. 이 데코레이터가 있는 속성은 EventEmitter 유형이어야하며, 사용자 정의 이벤트를 발생시킬 때 사용돼요.

```js
@Component({
  selector: 'app-child',
  template: `
    <button (click)="customEvent.emit()">Click me</button>
  `,
})
export class ChildComponent {
  @Output() customEvent: EventEmitter<void> = new EventEmitter<void>();
}

@Component({
  selector: 'app-root',
  template: `<app-child (customEvent)="handleCustomEvent()"></app-child>`,
})
export class AppComponent {
  handleCustomEvent(): void {...}
}
```

## 팁 06: 의존성 주입

● React에서 의존성 주입을 관리하는 일반적인 방법 몇 가지가 있어요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Props
- Context API
- Higher-Order Components (HOCs)
- Render Props
- React Hooks

● Angular에서는 의존성 주입이 프레임워크의 핵심 부분입니다. Angular는 서비스의 인스턴스를 생성하고 관리하는 역할을 담당하는 인젝터를 제공합니다. 간단한 예시를 확인해보세요:

```js
@Injectable({
  providedIn: 'root',
})
export class MyService {
  getData(): string {
    return 'Angular 서비스로부터의 데이터';
  }
}

@Component({
  selector: 'app-root',
  template: `<p>{ message }</p>`,
})
export class AppComponent implements OnInit {
  message: string;
  private readonly myService = inject(MyService);

  ngOnInit(): void {
    this.message = this.myService.getData();
  }
}
```

## 팁 07: 리졸버

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

React에는 Angular의 resolver 기능과 직접적인 동등물이 없습니다. 데이터 가져오기는 보통 컴포넌트 자체 내에서 또는 라이프사이클 메서드, 훅, 또는 외부 라이브러리의 도움으로 처리됩니다. React 컴포넌트에서 사용자 정의 훅을 사용한 간단한 예제가 여기 있어요:

```js
const useCustomHook = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // 의존성 배열이 비어있어서 효과가 마운트시 한 번만 실행됨
  return data;
};

const MyComponent = () => {
  const { data } = useCustomHook();
  return <div>{data ? <p>Data from React component: {data}</p> : <p>Loading...</p>}</div>;
};
export default MyComponent;
```

Angular에서는 resolver를 사용하여 라우트가 활성화되기 전 데이터를 가져와 해당 컴포넌트가 렌더링되기 전에 필요한 데이터를 보장합니다.

```js
@Injectable({
  providedIn: 'root',
})
export class MyDataResolver implements Resolve<string> {
  private readonly myDataService = inject(MyDataService);

  resolve(): Observable<string> {
    return this.myDataService.fetchData();
  }
}

const routes: Routes = [
  {
    path: 'my-route',
    component: MyComponent,
    resolve: {
      myData: MyDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 팁 08: 인터셉터

● React에서는 Redux와 같은 상태 관리 미들웨어를 통해 HTTP 인터셉터 기능을 구현할 수 있습니다. 미들웨어는 액션이 리듀서에 도달하기 전에 해당 액션을 가로챌 수 있고 수정하거나 새로운 액션을 디스패치하거나 비동기 작업을 수행할 수 있습니다. Redux 미들웨어를 사용한 간단한 예시를 살펴보겠습니다:

```js
const myMiddleware = (store) => (next) => (action) => {
  // 액션 수정 또는 다른 작업 수행

  // 예를 들어, 액션이 리듀서에 도달하기 전에 액션을 로깅하는 경우
  console.log("Action:", action);

  // 다음 미들웨어나 리듀서에 액션 전달
  return next(action);
};

export default myMiddleware;
```

```js
const store = createStore(rootReducer, applyMiddleware(myMiddleware));

export default store;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

● Angular에서 인터셉터는 HttpClient와 등록하여 HTTP 요청이나 응답을 가로챌 수 있는 서비스입니다. React의 미들웨어와는 달리 내장된 HTTPClient에만 작동합니다.

인터셉터를 사용하면 모든 HTTP 요청이나 응답에 전역적으로 공통 동작이나 수정을 적용할 수 있습니다. 아래는 간단한 Angular 인터셉터 예제입니다:

```js
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 요청을 수정하거나 응답을 전역적으로 처리합니다

    // 예를 들어, 각 요청에 사용자 지정 헤더 추가
    const modifiedRequest = request.clone({
      setHeaders: { "X-Custom-Header": "Custom Value" },
    });

    return next.handle(modifiedRequest);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 팁 09: Rxjs

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

RxJS 라이브러리는 비동기 및 이벤트 기반 프로그래밍을 더 선언적이고 조립 가능한 방식으로 처리할 수 있는 도구 세트를 제공합니다. Angular에서 널리 사용됩니다. 간단히 설명하면 다음과 같습니다:

Observables:

- Observable은 시간에 따른 데이터 스트림의 표현입니다.
- 비동기적으로 여러 값을 방출할 수 있습니다.
- Observables는 이벤트, 프로미스 또는 수동으로 생성할 수 있는 다양한 소스에서 만들어질 수 있습니다.

Observers:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Observer는 Observable에 가입하여 Observable이 방출한 변경 사항이나 새 값에 대한 알림을 받습니다.
- Observer에는 next(다음 값 처리), error(오류 처리), complete(작업 완료 처리)와 같이 세 가지 콜백 함수가 있습니다.

주요 RxJS 연산자:

- map: 제공된 함수를 사용하여 Observable이 방출한 값을 변환합니다.
- filter: 주어진 조건에 따라 Observable이 방출한 값을 필터링합니다.
- mergeMap: 각 소스 값을 Observable로 프로젝트하고 결과 Observable을 하나의 Observable 스트림으로 병합합니다.
- combineLatest: 여러 Observables에서 최신 값들을 합쳐 하나의 Observable로 조합합니다.

```js
const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    // 버튼 클릭에서 Observable 생성
    const buttonClick$ = fromEvent(document.getElementById("myButton"), "click");

    // 각 클릭 이벤트를 처리하고 API 호출을 트리거하는 mergeMap 사용
    const apiCall$ = buttonClick$.pipe(
      mergeMap(() => fetch("https://api.example.com/data")),
      mergeMap((response) => response.json())
    );

    // API 응답에서 원하는 특정 데이터를 추출하기 위해 map을 사용
    const subscription = apiCall$.subscribe(
      (responseData) => setData(responseData.data),
      (error) => console.error("오류:", error)
    );

    return () => subscription.unsubscribe(); // 컴포넌트 해제 시 정리
  }, []);

  return (
    <div>
      <button id="myButton">클릭하세요</button>
      <p>{data}</p>
    </div>
  );
};

export default App;
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

여기서 연산자의 전체 리스트를 확인할 수 있습니다: [Operators List](https://rxjs.dev/guide/operators#categories-of-operators).

## 팁 10: Rxjs 구독 취소 시점

Angular에서 메모리 누수를 방지하기 위해 옵저버블의 구독을 해제하는 것이 중요합니다. 옵저버블을 구독하면 옵저버와 옵저버블 사이에 연결이 생성되는데, 이 연결은 더 이상 필요하지 않을 때 닫혀야 합니다. 구독을 해제하지 않으면 잔류 참조와 메모리 누수로 이어질 수 있습니다.

Angular에서 구독을 취소해야 하는 일반적인 시나리오 몇 가지를 살펴보겠습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- 컴포넌트 파괴:

```js
@Component({
  selector: 'app-my-component',
})
export class MyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = someObservable.subscribe(data => {
      // 데이터 처리
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

2. 무한 옵저버블:

```js
export class MyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private infiniteObservableService: InfiniteObservableService) {}

  ngOnInit() {
    this.subscription = interval(1000).pipe(
      map((value) => {
        // 필요에 따라 발행된 값 변환
        return value * 2;
      })
      .subscribe((data) => {
        this.infiniteData = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

3. 라우터 이벤트:

```js
@Component({
  selector: 'app-my-component',
})
export class MyComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  private router = inject(Router);

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(event => {...});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

4. AsyncPipe

Angular에서 async 파이프는 Observable에 대한 구독을 자동화하고 구성 요소가 파기될 때 구독 해제를 처리합니다. 이는 템플릿에서 비동기 데이터를 다루는 과정을 간소화합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

`async` 파이프를 활용하면 Angular 템플릿에서 Observable에 직접 구독하고 값을 끊임없이 바인딩할 수 있습니다:

```js
<div>{observable$ | async}</div>
```

실제로는 async 파이프가 구독 및 구독 해제 수명주기를 관리해주므며, 깔끔한 자원 관리를 보장하고 메모리 누수를 방지합니다.

- Angular에는 고유한 용어가 있습니다. 익숙하지 않다면 Angular 용어집이 유용할 것입니다: Angular 용어집.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 영감을 받은 곳:

[https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3](https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3)

[https://dev.to/yashjsalian/switching-to-angular-after-working-with-react-5bam](https://dev.to/yashjsalian/switching-to-angular-after-working-with-react-5bam)

# 참고:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

https://angular.io/api/common/NgIf

https://angular.io/guide/control_flow#if-block-conditionals

https://angular.io/api/common/NgFor

https://angular.io/guide/control_flow#for-block---repeaters

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- [TrackByFunction](https://angular.io/api/core/TrackByFunction)
- [Property Binding](https://angular.io/guide/property-binding)
- [Event Binding](https://angular.io/guide/event-binding)
- [inputs-outputs#sending-data-to-a-parent-component](https://angular.io/guide/inputs-outputs#sending-data-to-a-parent-component)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

[https://angular.io/api/core/EventEmitter](https://angular.io/api/core/EventEmitter)

[https://angular.io/api/core/Output](https://angular.io/api/core/Output)

[https://angular.io/guide/http-intercept-requests-and-responses](https://angular.io/guide/http-intercept-requests-and-responses)

[https://angular.io/api/common/http/HttpClient](https://angular.io/api/common/http/HttpClient)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

https://angular.io/api/router/Resolve

https://angular.io/guide/rx-library

https://rxjs.dev/guide/operators#categories-of-operators

https://angular.io/api/common/AsyncPipe

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

https://angular.io/guide/glossary
