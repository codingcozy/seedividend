---
title: "앵귤러 시그널 해킹하기"
description: ""
coverImage: "/assets/img/2024-06-20-HackingAngularSignals_0.png"
date: 2024-06-20 05:43
ogImage:
  url: /assets/img/2024-06-20-HackingAngularSignals_0.png
tag: Tech
originalTitle: "Hacking Angular Signals"
link: "https://medium.com/@eugeniyoz/hacking-angular-signals-42e4c3afba04"
isUpdated: true
---

앵귤러 시그널이 무엇인지 살펴보고, 기능을 확장하고 디버깅하는 데 어떻게 활용할 수 있는지 알아봅시다.

## 앵귤러 시그널이란

앵귤러 시그널은 다음과 같은 메서드가 있는 함수입니다:

```js
const $val = signal(0);

// 함수:
const value = $val();

// 객체:
$val.set(4);
$val.update((v) => v * 2);
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

어떻게 가능한 걸까요? JavaScript에서는 함수가 객체이기 때문입니다:

```js
// 함수 선언
const double = (val: number) => val * 2;

// 메소드 추가
double.isEven = (number: number) => number % 2 === 0;

// 객체처럼 사용하기
double.isEven(15); // false

// 함수처럼 사용하기
double(8); // 16
```

어떻게 활용할 수 있을까요?

우리는 가능합니다:

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

- 새로운 메서드 추가하기
- 수정 사항을 가로챌 수 있도록 set() 및 update() 메서드를 오버라이딩하기
- 신호의 내부 상태 변수 및 메서드 읽기
- 읽기를 가로챌 프록시 신호 생성하기

## 신호 확장하기

가끔 변수를 신호로 사용해야 하지만 코드의 일부는 대신 Observable로 사용하려고 할 수 있습니다.

다행히도 신호 및 Observable의 인터페이스는 메서드 이름에서 충돌이 없습니다. 그러니 하이브리드를 만들어 보겠습니다:

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

```typescript
// 여기서는 단순히 기존 객체에 새로운 메서드를 추가하고 있습니다.

또는 Proxy 객체를 만들어서 요청된 메서드를 가지고 있지 않은 Signal에 대해서만 Observable의 메서드를 반환할 수 있습니다:

export function toObservableSignal<T>(s: Signal<T>) {

  const obs = toObservable(s, options);

  return new Proxy(s, {
    get(_, prop) {
      if (prop in s) {
        return (s as any)[prop];
      }
      return (obs as any)[prop];
    }
  });
}

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

아래는 사용 예시입니다:

@Component({
  //...
  template: `
    <h4>Signal A: { a() }</h4>
    <h4>Observable A: {a|async}</h4>
    <h4>Signal C (computed() A*3): {c()}</h4>

    {quote()}
  `,
})
export class App {
  a = toObservableSignal(signal<number>(1));

  // use as Observable
  b = this.a.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((v) => this.http.get('https://dummyjson.com/quotes/' + v))
  );

  // use as Signal
  c = computed(() => this.a() * 3);

  quote = toSignal(this.b);

  increment() {
    // "a" will not stop being a Signal after
    // we used it as an Observable
    this.a.update((v) => v + 1);
  }

  decrement() {
    this.a.update((v) => Math.max(1, v - 1));
  }
}

NG Extension Platform에서 이 기능을 찾을 수 있습니다.

원하는 함수로 Signal을 확장할 수 있습니다. 여기서 상상력에는 거의 제한이 없습니다. 단, set, update, asReadonly라는 이름은 사용하지 않도록 주의하세요.

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

## 기존 메서드 재정의

저희 Signal에 값을 입력 변환하거나 다른 곳에 정보를 복제하거나 디버깅을 위해 쓰기를 중간에서 가로채고 싶다고 가정해 봅시다.

function skipNonEvenNumbers(s: WritableSignal<number>) {
  const srcSet = s.set; // 재귀를 피하기 위해 소스 메서드가 필요합니다

  s.set = (value: number) => {
    if (value % 2 !== 0) {
      console.warn('[set] skipping:', value);
      return;
    }
    console.log('[set]:', value);
    srcSet(value);
  };
  s.update = (updateFn: (value: number) => number) => {
    const value = updateFn(s());
    if (value % 2 !== 0) {
      console.warn('[update] skipping:', value);
      return;
    }
    console.log('[update]:', value);
    srcSet(value);
  };
}

사용 예시:

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

이 기법은 Reactive Storage: getWritableSignal()에서 사용됩니다.

## 시그널 내부

Angular 시그널은 단순히 함수가 아니라 객체입니다. 이 객체에는 흥미로운 데이터와 함수가 담긴 숨겨진 필드 SIGNAL이 있습니다. 이것을 가지고 있어서 좋고, 남용하지 않았으면 좋겠습니다. 왜냐하면 위의 기법들은 "약간 꼼수적"이었고, 아래의 기법들은 디버깅, 개발 도구 생성, 재미를 위해서만 사용할 수 있습니다.

모든 Angular 시그널은 ReactiveNode를 확장합니다:

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

// packages/core/primitives/signals/src/graph.ts

export const REACTIVE_NODE: ReactiveNode = {
  version: 0 as Version,
  lastCleanEpoch: 0 as Version,
  dirty: false,
  producerNode: undefined,
  producerLastReadVersion: undefined,
  producerIndexOfThis: undefined,
  nextProducerIndex: 0,
  liveConsumerNode: undefined,
  liveConsumerIndexOfThis: undefined,
  consumerAllowSignalWrites: false,
  consumerIsAlwaysLive: false,
  producerMustRecompute: () => false,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};

이렇게:

// packages/core/primitives/signals/src/signal.ts

export const SIGNAL_NODE = {
  ...REACTIVE_NODE,
  equal: defaultEquals,
  value: undefined,
}

하지만 실제로 Signal 객체가 인스턴스화되면 이들이 모두 직접적으로 포함되지 않습니다. 모두 Symbol을 이름으로 사용하는 필드 아래에 숨겨져 있습니다:
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

```js
// packages/core/primitives/signals/src/signal.ts

export function createSignal<T>(initialValue: T): SignalGetter<T> {
  const node: SignalNode<T> = Object.create(SIGNAL_NODE);
  node.value = initialValue;
  const getter = (() => {
                   producerAccessed(node);
                   return node.value;
                 }) as SignalGetter<T>;

  // 다음 줄은 SIGNAL 필드에 SignalNode를 추가합니다:
  (getter as any)[SIGNAL] = node;
  return getter;
}
```

그래서 signal $value를 가지고 있고 SIGNAL 필드에 액세스하는 경우, SIGNAL_NODE가 가지고 있는 모든 필드를 얻게 됩니다.

어떻게 사용할 수 있을까요?

우리는 필드를 읽고 액세스를 가로채어 디버깅에 사용하거나 Signal 내부에서 무슨 일이 일어나는지를 설명하는 멋진 도구를 생성하는 데 사용할 수 있습니다. 종속성 그래프를 렌더링할 수 있습니다.

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

심지어 일부 필드를 엑세서로 변환할 수도 있습니다:

```js
function getSignalVersion<T>(s: WritableSignal<T>): Signal<number> {
  const node = s[SIGNAL];
  const $version = signal(0);

  Object.defineProperty(node, "version", {
    get: () => {
      const v = untracked($version);
      console.log("🟢 reading:", v);
      return v;
    },
    set: (v) => {
      untracked(() => $version.set(v));
      console.log("🔴 writing:", v);
    },
  });

  return $version.asReadonly();
}
```

StackBlitz:

또는 `effect()` 없이 Signal 읽기를 감시할 수 있는 프록시를 생성할 수도 있습니다.

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
function watchSignalReads<T, M extends Signal<T> | WritableSignal<T>>(s: M): M {
  const node = s[SIGNAL];
  const newGetter = () => {
    const value = s();
    console.log('Read:', value);
    return value;
  };
  (newGetter as any)[SIGNAL] = node;
  if (s.hasOwnProperty('set')) {
    const w = s as WritableSignal<T>;
    newGetter.set = w.set;
    newGetter.update = w.update;
    newGetter.asReadonly = w.asReadonly;
  }

  return newGetter as M;
}
```

사용 예시:

다시 말하지만, 이를 "배포 환경"에서 사용하지 말고, 대신에 멋진 도구를 만들고 인정을 받아 Angular 생태계를 풍요롭게 하는 데 활용하길 바래요 😎
