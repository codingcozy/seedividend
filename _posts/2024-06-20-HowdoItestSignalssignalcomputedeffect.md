---
title: "시그널 signal, computed, effect을 테스트하는 방법은 무엇인가요"
description: ""
coverImage: "/assets/img/2024-06-20-HowdoItestSignalssignalcomputedeffect_0.png"
date: 2024-06-20 05:37
ogImage: 
  url: /assets/img/2024-06-20-HowdoItestSignalssignalcomputedeffect_0.png
tag: Tech
originalTitle: "How do I test Signals (signal, computed, effect)?"
link: "https://medium.com/ngconf/how-do-i-test-signals-signal-computed-effect-6d97e0732f2c"
---


![image](/assets/img/2024-06-20-HowdoItestSignalssignalcomputedeffect_0.png)

가벼운 "반응형 기본 요소"로서의 신호는 Angular 애플리케이션의 미래를 형성할 것입니다. 이 글을 쓰는 시점에서 signal() 및 computed()는 안정적이며, effect()는 개발자 미리보기 상태입니다.

개발자 미리보기는 불안정한 기능을 가지고 있다는 것이 아니라 Angular 팀이 주요 버전 내에서 파괴적인 변경 사항을 도입할 수 있다는 것을 의미합니다. 해당 기능이 안정적이지 않다면 실험적인 레이블이 달려 있을 것입니다.

특히 신호 입력과 함께, 신호는 일상적인 작업에서 더 많이 사용되고 있습니다. 이제 신호를 코드베이스에 통합하는 것을 고려할 때입니다.

<div class="content-ad"></div>

그것은 우리가 테스트를 작성할 수 있어야 한다는 것을 요구합니다.

시각적으로 더 잘 배우시는 분을 위해 영상이 준비되어 있습니다:

# 신호 및 반응력 개요

computed()와 effect()를 사용하여 파생된 신호를 생성하거나 신호의 값이 변경될 때 부수효과를 실행합니다. 그것이 신호의 반응성입니다.

<div class="content-ad"></div>

RxJs와 비교할 때 반응성은 수동 구독이 필요하지 않습니다. Angular가 대신해줍니다.

signal()이나 computed()으로 생성된 신호는 의존성 주기가 발생하는 반응적인 컨텍스트 안에서 실행되어야 합니다. Angular에서는 두 가지가 있습니다:

- 컴포넌트의 템플릿
- effect() 함수

다시 말해, 템플릿이나 effect() 안에서 Signal을 호출할 때마다 Signal은 반응성을 갖게 됩니다.

<div class="content-ad"></div>

"Reactive Signal(반응형 신호)”이 변경되면, 그 신호는 computed(), effect() 또는 템플릿을 구독하는 소비자들에게 알릴 것입니다. computed()은 더 많은 소비자들을 가질 수도 있고, 그 소비자들도 다시 소비자들을 가질 수 있습니다.

반응형 컨텍스트에 따라 DOM 업데이트(템플릿) 또는 사이드 이펙트(effect() 실행)가 발생합니다.

변경 감지(Change Detection) 중에 반응형 컨텍스트가 실행됩니다: 마지막 값만 통과됩니다. 변화 감지 실행 사이에 신호가 여러 번 변경되더라도 마지막 값을 처리합니다. 즉, computed(), effect(), 그리고 템플릿은 중간 값이 아닌 마지막 값을 처리합니다.

이 동작은 프론트엔드 프레임워크의 관점에서 신호를 보면 완전히 이해할 수 있습니다. 만약 세 번의 동기(중간) 변경이 있다면, 왜 세 번 DOM을 업데이트해야 할까요? 기술적으로 가능하더라도 서로 다른 렌더링 프레임에서 값이 변경되기 때문에 최종 사용자는 새로운 값이 보이지 않을 것입니다. 신호가 “안정 상태”에 도달할 때까지 기다린 후에 DOM을 업데이트하는 것이 훨씬 나은 접근입니다."

<div class="content-ad"></div>

이 동작은 "Glitch-free effect" 또는 "Push/Pull"로 알려져 있어요.

어쩌면 이 애니메이션이 "Glitch-free effect"를 이해하는 데 도움이 될 수도 있어요.

# 테스트 대상 구성 요소

저희 구성 요소는 온라인 쇼핑몰의 바구니입니다. 사용자가 제품 수량을 증가시키거나 감소시킬 수 있는 곳이에요:

<div class="content-ad"></div>

```js
@Component({
  selector: 'app-basket',
  template: `<h2>Basket</h2>
    <div class="w-[640px]">
      <div class="grid grid-cols-4 gap-4 auto-cols-fr">
        <div class="font-bold">이름</div>
        <div class="font-bold">가격</div>
        <div class="font-bold">수량</div>
        <div>&nbsp;</div>
        @for (product of products(); track product.id) {
          <div>{ product.name }</div>
          <div>{ product.price }</div>
          <div>{ product.amount }</div>
          <div>
            <button
              mat-raised-button
              (click)="decrease(product.id)"
              data-testid="btn-decrease"
            >
              <mat-icon>remove</mat-icon>
            </button>
            <button
              mat-raised-button
              (click)="increase(product.id)"
              data-testid="btn-increase"
            >
              <mat-icon>add</mat-icon>
            </button>
          </div>
        }

        <div class="font-bold">총 가격</div>
        <div class="font-bold" data-testid="total">{ totalPrice() }</div>
      </div>
    </div>`,
  standalone: true,
  imports: [MatButton, MatIcon],
})
export default class BasketComponent {
  products = signal([
    { id: 1, name: '커피', price: 3, amount: 1 },
    { id: 2, name: '슈니첼', price: 15, amount: 1 },
  ]);

  syncService = inject(SyncService);

  constructor() {
    effect(() => this.syncService.sync(this.products()));
  }

  totalPrice = computed(() =>
    this.products().reduce(
      (total, product) => total + product.price * product.amount,
      0,
    ),
  );

  decrease(id: number) {
    this.#change(id, (product) =>
      product.amount > 0 ? { ...product, amount: product.amount - 1 } : product,
    );
  }

  increase(id: number) {
    this.#change(id, (product) => ({ ...product, amount: product.amount + 1 }));
  }

  #change(id: number, callback: (product: Product) => Product) {
    this.products.update((products) =>
      // some logic to update the products
    );
  }
}
```

<div class="content-ad"></div>

```js
@Injectable({ providedIn: 'root' })
export class SyncService {
  sync(products: Product[]) {
    console.log(products);
  }
}
```

그렇게 많지 않아요😀, 하지만 가능한 짧은 예제를 유지하고 싶습니다.

# 변경 감지를 사용한 테스트

Signals의 핵심인 변경 감지의 중요성을 고려하면, 변경 감지가 테스트의 일부인 경우 테스트가 훨씬 쉽다는 것이 명백해질 것입니다.

<div class="content-ad"></div>

우리의 테스트가 DOM을 통해 Component와 통신하고 TestBed.createComponent를 통해 Component를 생성할 때 항상 발생하는 경우입니다.

## computed() 테스트

이것은 DOM을 통해 총 가격을 확인하는 테스트입니다:

```js
it('상품의 수량을 증가시켜야 합니다', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [BasketComponent],
  }).createComponent(BasketComponent);
  fixture.detectChanges();

  const total: HTMLDivElement = fixture.debugElement.query(
    By.css('[data-testid="total"]'),
  ).nativeElement;
  expect(total.textContent).toBe('18');

  fixture.debugElement
    .query(By.css('[data-testid="btn-increase"]'))
    .nativeElement.click();
  fixture.detectChanges();

  expect(total.textContent).toBe('21');
});
```

<div class="content-ad"></div>

그 테스트가 예상대로 작동합니다. 깜짝 놀랄 일이 없네요!

변경 감지를 올바른 위치에서 실행하면 모든 것이 잘 됩니다. 그 올바른 위치는 클릭과 같은 이벤트 이후와 컴포넌트를 초기화할 때입니다.

## effect() 테스트

effect()를 테스트에 포함하는 경우 약간 복잡해집니다.

<div class="content-ad"></div>

effect() 함수가 SyncService를 실행하기 때문에 그 호출 횟수를 세고 싶습니다.

매 변경 감지 시, effect() 함수는 products의 값이 변경되었는지 확인합니다. 값이 변경되면 effect() 함수는 SyncService를 실행합니다.

우리는 DOM을 통해 SyncService의 실행을 단언할 수 없습니다. 그래서 SyncService 인스턴스에 스파이를 적용해야 합니다. 이를 위해 컴포넌트 인스턴스에 접근할 수 있어야 합니다.

업데이트된 테스트:

<div class="content-ad"></div>

```js
it('SyncService를 실행해야 합니다', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [BasketComponent],
  }).createComponent(BasketComponent);
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');
  fixture.detectChanges();

  expect(spy).toHaveBeenCalledTimes(1);
});
```

우리는 effect()가 제품이 변경되고 Change Detection이 실행될 때만 실행되는 것을 확인할 수 있습니다.

다음 두 가지 테스트가 실패해야 합니다:

```js
it('SyncService를 실행해야 합니다', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [BasketComponent],
  }).createComponent(BasketComponent);
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');

  // Change Detection이 실행되지 않았습니다
  expect(spy).toHaveBeenCalledTimes(1); 
})

it('SyncService를 실행해야 합니다', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [BasketComponent],
  }).createComponent(BasketComponent);
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');
  fixture.detectChanges();

  expect(spy).toHaveBeenCalledTimes(1);
  
  // 총합이 변경되지 않아서 효과가 없습니다
  fixture.detectChanges();
  expect(spy).toHaveBeenCalledTimes(2); 
})
```

<div class="content-ad"></div>

우리는 바구니에 있는 금액을 늘릴 수 있고, 변경 감지의 또 다른 실행 후에 SyncService가 두 번 실행된 것을 볼 수 있어야 합니다:

```js
it('SyncService를 실행해야 합니다', () => {
  const fixture = TestBed.configureTestingModule({
    imports: [BasketComponent],
  }).createComponent(BasketComponent);
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');
  fixture.detectChanges();

  expect(spy).toHaveBeenCalledTimes(1);

  const total: HTMLDivElement = fixture.debugElement.query(
    By.css('[data-testid="total"]'),
  ).nativeElement;
  expect(total.textContent).toBe('18');

  fixture.debugElement
    .query(By.css('[data-testid="btn-increase"]'))
    .nativeElement.click();

  fixture.detectChanges();
  expect(spy).toHaveBeenCalledTimes(2);
});
```

다음으로 변경 감지가 사용 불가능한 다른 테스트 유형으로 넘어가 봅시다.

# 변경 감지 없이 테스트하기

<div class="content-ad"></div>

BasketComponent의 로직을 BasketService로 추출했습니다:

```js
@Injectable({ providedIn: 'root' })
export class BasketService {
  products = signal([
    {
      id: 1,
      name: 'Coffee',
      price: 3,
      amount: 1,
    },
    { id: 2, name: 'Schnitzel', price: 15, amount: 1 },
  ]);

  syncService = inject(SyncService);

  constructor() {
    effect(() => this.syncService.sync(this.products()));
  }

  totalPrice = computed(() =>
    this.products().reduce(
      (total, product) => total + product.price * product.amount,
      0,
    ),
  );

  decrease(id: number) {
    this.#change(id, (product) =>
      product.amount > 0 ? { ...product, amount: product.amount - 1 } : product,
    );
  }

  increase(id: number) {
    this.#change(id, (product) => ({ ...product, amount: product.amount + 1 }));
  }

  #change(id: number, callback: (product: Product) => Product) {
    this.products.update((products) =>
      products.map((product) => {
        if (product.id === id && product.amount > 0) {
          return callback(product);
        } else {
          return product;
        }
      }),
    );
  }
}

@Component({
  selector: 'app-basket',
  template: '<!-- 이전과 같은 템플릿 -->',
  standalone: true,
  imports: [MatButton, MatIcon],
})
export default class BasketComponent {
  basketService = inject(BasketService);

  products = this.basketService.products;
  totalPrice = this.basketService.totalPrice;

  decrease(id: number) {
    this.basketService.decrease(id);
  }

  increase(id: number) {
    this.basketService.increase(id);
  }
}
```

이전의 테스트는 유지했습니다. 이제 Component와 두 개의 Service를 모두 커버합니다.

BasketService만을 커버하는 테스트는 어떻게 작성할 수 있을까요?

<div class="content-ad"></div>

우리는 Component가 없으므로 이제 fixture.detectChanges()를 실행할 수 없습니다. 따라서 ComponentFixture도 없습니다.

## computed() 테스트

totalPrice Signal을 확인하는 SignalService 테스트는 다음과 같이 보일 것입니다:

```js
it('BasketService를 테스트해야 합니다', () => {
  const basketService = TestBed.inject(BasketService);
  expect(basketService.totalPrice()).toBe(18);

  basketService.increase(1);
  expect(basketService.totalPrice()).toBe(21);
});
```

<div class="content-ad"></div>

위의 테스트는 작동합니다. 왜냐하면 totalPrice를 반응적으로 만들려면 변경 감지 실행이 필요한 것 아닌가요?

맞아요. 그렇지만 우리의 경우에는 totalPrice를 반응적인 방식으로 사용하지 않아요. 우리는 totalPrice를 직접 호출해요.

computed()를 기반으로 한 Signal은 언제든지, 종속성이 변경되었는지 알 수 있고 (즉, 더티 상태인지), 다시 처리해야 해요.

다시 처리를 시작하려면, 누군가가 그 값을 요청할 때 까지 기다려야 해요.

<div class="content-ad"></div>

'컴포넌트 테스트에서 "호출자"는 변경 감지였습니다. 테스트에서 우리가 그것을 했죠.

## effect() 테스트하기

computed() 신호는 변경 감지 없이 간단히 테스트할 수 있지만, 실제 어려움은 effect()에서 발생합니다.

computed()과 마찬가지로 effect()는 내부적으로 먼저 변경 유무를 알고 있습니다(의존성 중 하나가 값이 변경되었을 경우). 유감스럽게도 computed() 신호처럼 접근할 수는 없습니다.'

<div class="content-ad"></div>

Angular 16에서 effect()를 테스트하는 유일한 방법은 Service를 "Helper Component"로 감싸는 것이었습니다. 그러나 Angular 17부터는 새로운 함수가 등장했습니다. 이 함수는 effect를 "호출"합니다: TestBed.flushEffects().

이제 실제로 코드를 보겠습니다:

```js
it('BasketService를 테스트해야 합니다', () => {
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');

  const basketService = TestBed.inject(BasketService);
  TestBed.flushEffects();

  basketService.increase(1);
  TestBed.flushEffects();
  expect(spy).toHaveBeenCalledTimes(2);
});
```

다시 한 번 강조하면 Component 테스트와 동일한 동작을 볼 수 있습니다. effect()를 실행하려면 두 가지가 필요합니다:

<div class="content-ad"></div>

1. effect() 함수는 더러워야 하고
2. "액티브 엑세스"가 있어야 합니다.

이 테스트들은 다시 실패할 것입니다:

```js
it('BasketService를 테스트해야 합니다', () => {
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');
  TestBed.inject(BasketService);

  // effect가 실행되지 않았습니다
  expect(spy).toHaveBeenCalledTimes(1);
});

it('BasketService를 테스트해야 합니다', () => {
  const syncService = TestBed.inject(SyncService);
  const spy = spyOn(syncService, 'sync');
  TestBed.inject(BasketService);

  TestBed.flushEffects();
  expect(spy).toHaveBeenCalledTimes(1);

  // effect가 더러우지 않았습니다
  TestBed.flushEffects();
  expect(spy).toHaveBeenCalledTimes(2);
});
```

# 요약

<div class="content-ad"></div>

우리는 시그널을 사용하는 코드를 테스트할 때 "Glitch-free" 효과를 알아야 합니다.

테스트에 변경 감지(Change Detection)가 포함되어 있는 경우, 해당 테스트는 우리 애플리케이션과 동일하게 작동합니다.

변경 감지가 포함되지 않은 테스트 유형의 경우, 시그널을 직접 호출하고 TestBed.flushEffects()를 실행하여 "dirty side effects"를 실행해야 합니다.

Repository에 접근할 수 있습니다:

<div class="content-ad"></div>

https://github.com/rainerhahnekamp/how-do-i-test

만약 여러분이 테스트 과제를 직면하고 저에게 도움 요청을 하고 싶다면 언제든지 연락해 주세요!

추가 정보와 업데이트를 받으려면 LinkedIn에서 저와 연락하시거나 X와 함께 워크샵 및 테스팅에 관한 컨설팅 서비스를 탐색해 주세요.

https://www.angulararchitects.io/en/training/professional-angular-testing-playwright-edition/