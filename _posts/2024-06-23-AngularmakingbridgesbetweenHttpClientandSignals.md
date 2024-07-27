---
title: "Angular HttpClient와 Signals를 연결하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-AngularmakingbridgesbetweenHttpClientandSignals_0.png"
date: 2024-06-23 14:04
ogImage: 
  url: /assets/img/2024-06-23-AngularmakingbridgesbetweenHttpClientandSignals_0.png
tag: Tech
originalTitle: "Angular: making bridges between HttpClient and Signals"
link: "https://medium.com/@IgorPak-dev/angular-making-bridges-between-httpclient-and-signals-a7a50c15ad9b"
---


Ever since the 18th release and the new upcoming releases of the Angular framework, the entire Angular community has been experiencing significant changes, such as zoneless apps and reduced usage of RxJS in everyday code. It’s essential to consider whether or not to use RxJS carefully. Still, you should understand and use both the main concepts of the reactive mechanisms we have in our applications without neglecting either of them. I recommend using signals for the state and RxJS to manage events and complex logic.

But first, let’s touch on the article’s topic: how we should interact with HttpClient-based services when connecting them with signal-based components. This involves managing the transition from HttpClient’s Observable-based responses to the Signal-based properties used in signal-based components.

Amidst the discussions about using the fetch API instead of HttpClient, I want to reiterate my advice: it’s not necessary to drop HttpClient. It offers useful out-of-the-box features that we can benefit from. Remember, we have the tools to handle the Observable-to-Signal bridge without any issues.

<div class="content-ad"></div>

## RxJS 직접 구독

가장 직접적이고 명확한 방법은 구독을 사용하는 것입니다. HTTP 호출은 한 번만 값을 반환하는 Observable이기 때문에 구독을 해제하는 것에 대해 크게 걱정할 필요가 없습니다. 또한 RxJS 오류 처리 방식을 활용할 수 있습니다(pipe 내에서 또는 오류 콜백을 통해). 가장 명확하면서도 가장 쉬운 방식으로 상황을 처리하는 방법입니다.

```js
public data = signal<number[]>([])
....
constructor(private testService: TestService) {}
....
public ngOnInit() {
  this.testService.getItems().subscribe((items) => {
    // 시그널 덮어쓰기/생성
    this.data = signal(items);
    // 또는 값 직접 설정
    this.data.set(items);
  });
}
```

## Promises 활용하기

<div class="content-ad"></div>

두 번째 방법은 프로미스를 활용하는 것입니다. 표준 then/catch 또는 async/await을 사용할 수 있습니다. 이것은 조금 까다로울 수도 있습니다, 특히 async/await의 구체적인 내용을 잊게 되었거나 모르는 경우입니다. RxJS의 firstValueFrom 함수를 사용하여 첫 번째 발행된 값을 observable로 변환할 수 있습니다(일반적으로 API 응답은 한 가지 값이기 때문에 잘 맞습니다). 여기에는 두 가지 주의해야 할 점이 있습니다:

- async/await 구문을 사용하면 프로미스가 값을 반환하거나 오류가 발생할 때까지 함수 실행이 중지된다는 것을 유의해야 합니다. 따라서 코드의 나머지 부분은 여전히 실행을 기다리고 있게 됩니다. 따라서 async/await 함정에 빠지지 않도록 주의하십시오.
- 또한 firstValueFrom은 즉시 observable 소스에 구독을 시작합니다. 이것이 문제가 될 수는 없지만, 게으르게 시작하려면 잘 작동하지 않을 수 있습니다.

```js
public async ngOnInit() {
  // observable 소스를 즉시 구독합니다
  this.data = signal(await firstValueFrom(this.testService.getItems()));
  // 주의! 이 코드는 서비스가 값을 반환할 때까지 실행되지 않음
```

코드 실행을 중지하지 않으려면 전용 함수 래퍼를 사용할 수 있습니다. 다른 방법은 IIFE를 사용하는 것입니다. 이 방법이 더 일관된 것으로 생각될 수 있습니다.

<div class="content-ad"></div>

```js
public async initData() {
  this.data = signal(await firstValueFrom(this.testService.getItems()));
}

public ngOnInit() {   
  this.initData();
  ....
}
```

```js
public ngOnInit() {    
  (async () => {
    this.data = signal(await firstValueFrom(this.testService.getItems()));
    console.log('data inited');
  })();
  ....
}
```

다른 방법은 old-faithful then을 사용하는 것입니다. 위의 모든 프로미스 케이스에서 then 콜백 실행을 마이크로태스크로 생각할 때, 그것은 자체적인 특징이 있으며 어떤 경우에는 예측할 수 없는 결과를 줄 수 있음을 잊지 마세요.

```js
public ngOnInit() {   
  firstValueFrom(this.testService.getItems()).then((items) => {
    this.data = signal(items);
  });
}
```

<div class="content-ad"></div>

## rxjs-interop을 사용하여 toSignal을 활용해보세요

rxjs-interop은 우리에게 세 번째 방법을 제공했는데, 그것은 toSignal이라고 불립니다. 간단히 말하면, 이 함수는 소스 observable을 구독하고 모든 값을 signal로 보냅니다. 그러나 HttpClient 응답을 signal로 변환하는 가장 tricky한 방법 중 하나입니다. 그래서 이러한 사항들을 주의해야 합니다:

- 주목할 점 중 하나는 firstValueFrom과 유사하게, toSignal은 실행 시 즉시 구독합니다.
- default 값을 제공하지 않으면 처음 값 (undefined)을 즉시 발행합니다.
- API 호출을 라이프사이클 훅이나 컴포넌트 클래스 메소드 어딘가에서 수행하는 경우 'Error: NG0203: toSignal() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext’' 라는 오류가 발생할 수 있습니다. 이를 극복하기 위해 injector를 주입하고 제공하거나 runInInjectionContext를 사용해야 합니다.
- 읽기 전용 signal을 제공합니다. 따라서 나중에 signal과 상호작용하려면 (설정/업데이트) 여기서 장애물을 처리해야 합니다.

```js
private _injector = inject(Injector);

public ngOnInit() {  
  this.data = toSignal(this.testService.getItems(), {
    // injector에 대한 참조 제공
    injector: this._injector,
    // default 값을 제공
    initialValue: [],
  });

  // 또는 runInInjectionContext를 사용
  runInInjectionContext(this._injector, () => {
    toSignal(this.testService.getItems(), {
      initialValue: [],
    });
  });
  ....
}
```  

<div class="content-ad"></div>

## 결론:

현재, 표준 observable 구독을 사용하는 것이 가능한 처리하기 쉬운 변형으로 보입니다. 가능한 함정과 어려움에서 보호해 줄 것입니다. 프로미스를 사용하는 것도 편리할 수 있지만, 당신과 팀원들은 async/await 및 다른 프로미스의 구체적인 부분을 알고 있어야 합니다. toSignal을 사용하는 것이 가장 번거로워 보입니다.

유용한 링크:
https://angular.dev/guide/signals
https://angular.dev/guide/di/dependency-injection-context#run-within-an-injection-context