---
title: "애플리케이션 성능을 높이는 Angular Signals, Reactive Context, 그리고 동적 의존성 추적 방법"
description: ""
coverImage: "/assets/img/2024-06-22-AngularSignalsReactiveContextandDynamicDependencyTracking_0.png"
date: 2024-06-22 05:00
ogImage: 
  url: /assets/img/2024-06-22-AngularSignalsReactiveContextandDynamicDependencyTracking_0.png
tag: Tech
originalTitle: "Angular Signals, Reactive Context, and Dynamic Dependency Tracking"
link: "https://medium.com/@eugeniyoz/angular-signals-reactive-context-and-dynamic-dependency-tracking-d2d6100568b0"
isUpdated: true
---




Angular Signals를 효과적으로 사용하려면 "반응형 컨텍스트" 개념과 의존성 추적 방법을 이해하는 것이 중요합니다. 이 글에서는 이 두 가지를 설명하고 관련 버그를 피하는 방법을 보여 드리겠습니다.

## 의존성 추적

Angular Signals를 사용할 때 구독하고 구독 해제에 대해 걱정할 필요가 없습니다. 작동 방식을 이해하려면 몇 가지 용어가 필요합니다:

- 의존 그래프: 노드의 그래프, 각 노드는 ReactiveNode 인터페이스를 구현합니다.
- 생산자: 값을 포함하고 새 값에 대해 알림을 보내는 노드(반응성을 "생산"함).
- 소비자: 생성된 값들을 읽는 노드(반응성을 "소비"함).

<div class="content-ad"></div>

신호는 생산자이며, computed()는 생산자이자 소비자이며, effect()는 소비자이며, 템플릿은 소비자입니다.

자동 의존성 추적이 작동하는 방식: 모든 반응 노드에 대한 전역 변수인 activeConsumer가 있고, computed()가 계산 함수를 실행할 때마다, effect()가 부수 효과 함수를 실행할 때마다, 또는 변경 사항을 확인할 때마다 실행할 때마다, 다음을 수행합니다:

- activeConsumer의 값을 읽어 이전 소비자를 기억합니다.
- 자신을 activeConsumer로 등록합니다.
- 함수를 실행하거나 템플릿을 실행합니다 (일부 신호는이 단계에서 읽힐 수 있음).
- 이전 소비자 (단계 1에서)를 activeConsumer로 등록합니다.

어떤 생산자도 읽힐 때는 activeConsumer의 값을 검색하고이 활성 소비자를 신호에 종속된 소비자 목록에 포함합니다. 신호가 업데이트되면 목록에서 각 소비자로 알림을 전송합니다.

<div class="content-ad"></div>

이 예시에서는 단계별로 어떻게 일이 진행되는지 살펴봅시다.

```js
@Component({
  template: `
   Items count: { $items().length }
   Active items count: { $activeItemsCount() }
`   
})
class ExampleComponent {
  protected readonly $items = signal([{id: 1, $isActive: signal(true) }]);

  protected readonly $activeItemsCount = computed(() => {
    return this.getActiveItems().length;
  });

  private getActiveItems() {
    return this.$items().filter(i => i.$isActive());
  }
}
```

- 템플릿은 activeConsumer의 값을 읽고 이를 prevConsumer 변수에 저장합니다. (이 변수는 템플릿 내에서만 사용 가능함);
- 템플릿은 자신을 activeConsumer로 설정합니다;
- $items() 신호를 호출하여 값을 가져옵니다;
- $items 신호는 activeConsumer의 값을 검색합니다;
- 받은 값이 비어 있지 않으므로 (이는 템플릿에 대한 링크를 포함하고 있음), $items 신호는 이 값(우리 템플릿에 대한 링크)을 소비자 목록에 넣습니다. 이후 $items가 업데이트될 때마다 템플릿에 통지됩니다 — 종속성 그래프에 새 링크가 만들어집니다;
- $items는 값으로 반환되어 템플릿에 전달됩니다;
- 템플릿은 $activeItemsCount 신호의 값을 읽습니다. 값을 반환하려면 $activeItemsCount는 계산 함수를 실행해야 합니다(computed 함수에 전달한 함수);
- 계산 함수를 실행하기 전에 $activeItemsCount는 activeConsumer의 값을 읽고 이를 로컬 변수 prevConsumer에 저장합니다. $activeItemsCount도 소비자이므로 activeConsumer 변수에 자체를 가리키는 링크를 추가합니다;
- 계산 함수는 getActiveItems() 함수를 호출합니다;
- 이 함수 내에서는 $items의 값을 읽습니다 — 3에서 6단계를 반복하지만, 템플릿이 이미 $items에 의존하고 있기 때문에, 5단계는 새 소비자를 목록에 추가하지 않습니다;
- 반환된 값(아이템 배열)을 획득하면 getActiveItems()는이 배열의 각 요소를 읽고 $isActive의 값을 읽습니다;
- $isActive는 신호입니다. 값으로 반환하기 전에 3에서 6까지 단계를 다시 반복합니다. 4단계에서 $isActive는 activeConsumer의 값을 검색합니다. 이때 activeConsumer에는 $activeItemsCount에 대한 링크가 포함되어 있으므로 5단계에서 $isActive (배열의 각 요소마다)는 $activeItemsCount를 종속 소비자 목록에 추가합니다. $isActive가 업데이트될 때마다 $activeItemsCount에 통지됩니다. $activeItemsCount는 템플릿에 값을 갱신해야 함을 통지하며 계산해야 함을 알립니다. 그 후, 템플릿에서 마침내 (통지 바로 다음이 아니라) $activeItemsCount에게 새로운 값을 물어봅니다. 그리고 7단계부터 14단계가 반복됩니다;
- getActiveItems()가 값을 반환합니다. $activeItemsCount는이 값을 계산에 사용하고 반환하기 전에 로컬 변수 prevConsumer의 값을 activeConsumer 변수에 넣습니다;
- $activeItemsCount가 값을 반환합니다;
- 템플릿은 이전에 저장한 prevConsumer 값을 activeConsumer에 넣습니다.

리스트가 길지만 꼼꼼히 읽어주시기 바랍니다.

<div class="content-ad"></div>

가장 중요한 것은 여기서 소비자들 (computed(), effect(), templates)가 읽은 신호를 종속성 목록에 추가하는 걱정을 할 필요가 없다는 것입니다. 신호들은 자체적으로 activeConsumer 변수를 사용하여 이 작업을 수행합니다. 이 변수는 모든 반응성 노드에서 접근할 수 있으므로, 어떤 신호가 함수 체인의 어느 정도 깊은 곳에서 읽히든 상관없이 모든 신호는 activeConsumer의 값을 얻고 이를 소비자 목록에 추가할 것입니다.

기억하세요: 템플릿, computed() 또는 effect() (소비자)에서 함수를 호출하고, 그 함수가 다른 함수를 읽고, 다른 함수가 다시 다른 함수를 읽는 경우에... 마침내 어떤 수준에서 함수가 신호를 읽고, 그 신호가 해당 소비자를 목록에 추가하고 업데이트에 대해 알릴 것입니다.

디버깅과 같이 읽는 것은 지루할 수 있으므로, 이 작은 앱으로 당신을 즐겁게 해드리겠습니다:

이 앱에서 다음을 수행해주십시오:

<div class="content-ad"></div>

- 버튼 “2”를 눌러 활성화하고 다시 한 번 클릭하세요. 버튼 위의 “Active items” 텍스트가 변경되는 것을 확인하세요;
- “Add Item” 버튼을 클릭하세요;
- 버튼 “4”를 클릭하세요. “Active items” 텍스트가 변경되지 않는 것을 확인하세요;
- 버튼 “2”를 클릭하세요;
- 이제 버튼 “4”를 여러 번 클릭하고 “Active items” 텍스트가 예상대로 변경되는 것을 확인하세요.

하지만 왜 그럴까요? 코드를 확인해보겠습니다:

```js
export type Item = {
  id: number;
  $isActive: WritableSignal<boolean>;
};

@Component({
  selector: 'my-app',
  template: `
    <div>Active items: { $activeItems() }</div>
    <div>
      <span>Click to to toggle:</span>
      @for(item of items; track item.id) {
        <button (click)="item.$isActive.set(!item.$isActive())" 
                [class.active]="item.$isActive()">
          { item.id }
       </button>
      }
    </div>
    <div>
      <button (click)="addItem()">Add Item</button>
    </div>
  `,
})
export class App {
  protected readonly items: Item[] = [
    { id: 1, $isActive: signal(true) },
    { id: 2, $isActive: signal(false) },
    { id: 3, $isActive: signal(true) },
  ];

  protected readonly $activeItems = computed(() => {
    const ids = [];
    for (const item of this.items) {
      if (item.$isActive()) {
        ids.push(item.id);
      }
    }
    return ids.join(', ');
  });

  protected addItem() {
    this.items.push({
      id: this.items.length + 1,
      $isActive: signal(false),
    });
  }
}
```

이제 “Active items” 라인이 정확하게 업데이트되지 않는 이유를 분석해보겠습니다.

<div class="content-ad"></div>

저희 템플릿에서 바인딩:

```js
<div>활성 항목: { $activeItems() }</div>
```

$activeItems은 computed()에 의해 제공되는 시그널입니다:

```js
protected readonly $activeItems = computed(() => {
  const ids = [];
  for (const item of this.items) {
    if (item.$isActive()) {
      ids.push(item.id);
    }
  }
  return ids.join(', ');
});
```

<div class="content-ad"></div>

computed() 함수에 전달하는 함수는 읽는 신호 중 하나라도 업데이트될 때마다 다시 실행됩니다. 그 곳에서는 어떤 신호를 읽을까요?

이는 this.items 배열의 각 항목의 $isActive 신호입니다.

그렇다면 왜 단계 2와 3 이후에 $activeItems이 업데이트되지 않았을까요?

계산 함수는 의존하는 신호 중 하나가 업데이트될 때에만 다시 실행됩니다.

<div class="content-ad"></div>

"Add Item"을 클릭하면 이.items를 수정하고 새 항목 내에 새 신호를 생성합니다. 그러나 이 순간 이전에 computed() 함수가 해당 신호를 읽어본 적이 없기 때문에 의존 목록에 없습니다.

"Add Item"을 클릭하기 전과 후에도 $activeItems가 의존하는 신호 목록은 바뀌지 않습니다: this.items의 세 항목에서 나오는 세 $isActive 신호입니다.

"Add Item"을 클릭할 때 이러한 신호 중 어느 것도 수정되지 않기 때문에 computed() 함수에 알림이 전달되지 않고 계산 함수가 다시 실행되지 않습니다.

우리는 새 항목을 버튼 목록에서 여러 번 토글할 수 있지만, 처음 세 항목의 신호만 $activeItems에 알림을 보내고 우리가 전송한 함수가 다시 실행됩니다.

<div class="content-ad"></div>

하지만 우리가 계산 함수를 다시 실행하면, 이.items에서 모든 항목을 다시 읽고 새로운 시그널을 읽게 될 것입니다. 새로운 시그널은 $activeItems 노드의 새로운 종속성이 되며, 그중 하나가 변경될 때마다 알림을 받게 될 것입니다.

이를 위해 기존 종속성 중 하나를 수정해야 합니다: 이것이 step 4에서 "2" 버튼을 클릭하는 이유입니다.

이 예시는 computed()와 effect()에 전달하는 함수가 업데이트된 생산자 중 하나가 있을 때에만 다시 실행되는 것을 상기시키기 위해 만들어졌습니다.

이것이 computed()가 어떤 종속성을 가지고 있고 그 중 어떤 것이 다시 계산을 유발해야 하는지 재확인하는 것이 언제나 유용한 이유입니다. 그 중 몇 가지는 유배제용()을 사용해야 할 수도 있습니다.

<div class="content-ad"></div>

computed() 또는 effect()에 전달하는 일부 함수는 신호를 읽을 수 있습니다 (또는 호출된 함수가 신호를 읽을 수 있습니다).

```js
this.$petWalkingIsAllowed = computed(() => {
  return this.$isFreeTime() && this.isItGoodWeatherOutside();
});

isItGoodWeatherOutside() {
  return $isSunny() && $isWarm() && !$isStormy();
}
```

원하지 않는 다시 계산을 피하기 위해 해당 호출을 untracked()로 감싸야 할지 여부를 이해하기 위해 이러한 논리를 사용할 수 있습니다:

- 만약 우리가 computed()가 새로운 값을 계산하지 말아야 하는 경우, 그 함수(isItGoodWeatherOutside())가 새로운 값을 반환할 때 untracked()로 감싸주세요:

<div class="content-ad"></div>

```js
this.$petWalkingIsAllowed = computed(() => {
  return this.$isFreeTime() && untracked(() => this.isItGoodWeatherOutside());
});

isItGoodWeatherOutside() {
  return $isSunny() && $isWarm() && !$isStormy();
}
```

- 만약 해당 함수로부터의 모든 새 값에 대해 계산을 다시 실행하길 원한다면 untracked()으로 감싸지 마세요.

보시다시피, untracked()은 우리가 추적하고 싶은 종속성을 제어하는 데 도움이 됩니다. 또한 또 다른 중요한 측면을 관리하는 데 도움이 됩니다:

## 반응형 컨텍스트


<div class="content-ad"></div>

위의 "자동 종속성 추적 방법"에서는 activeConsumer라는 변수에 대해 언급했어요.

activeConsumer가 null이 아닌 경우, 우리가 읽는 시그널은 activeConsumer를 소비자 목록에 추가하여 나중에 이 목록의 멤버들에게 시그널의 변경 사항에 대한 알림을 보내게 됩니다. 반응 노드가 읽힐 때 activeConsumer가 비어 있는 상태라면, 반응 노드의 종속성 그래프에 새로운 링크가 생성되지 않을 거에요.

다시 말해, activeConsumer가 설정되어 있을 때는 반응적인 컨텍스트 내에서 시그널을 읽고 있는 것이에요.

대부분의 경우에는 반응적인 컨텍스트가 자동으로 처리되며, 의도한 링크와 종속성만이 생성되고 제거될 거예요.

<div class="content-ad"></div>

하지만 때로는 반응적인 컨텍스트를 무의식적으로 노출시키기도 합니다.

다음 앱을 시험해 봅시다:

사용해 보면 다음을 알 수 있을 거에요:

- "항목 추가"를 클릭하면 모든 상태가 완전히 재설정됩니다.
- 상태를 토글하면 무작위로 변경되어 한 가지 버튼 이상에 영향을 줍니다.

<div class="content-ad"></div>

빠르게 버그를 발견하실 수 있나요?

```js
@Component({
  template: `
    <div>Active items: { $activeItems() }</div>
    <div class="flex-row">
      <span>Click to to toggle:</span>
      @for(item of $items(); track item.id) {
      <button (click)="item.$isActive.set(!item.$isActive())" [class.active]="item.$isActive()" [style.transform]="'scale('+item.$scale()+')'">
        { item.id }
      </button>
      }
    </div>
    <div>
      <button (click)="addItem()">Add Item</button>
    </div>
  `,
})
export class App {
  private readonly $itemsCount = signal(3);

  protected readonly $items: Signal<Item[]> = computed(() => {
    console.warn('Generating items!');
   
    const items: Item[] = [];
    for (let id = 0; id < this.$itemsCount(); id++) {
      const $isActive = signal(Math.random() > 0.5);
      const $scale = signal($isActive() ? 1.2 : 1);
      items.push({ id, $isActive, $scale });
    }
    return items;
  });

  protected readonly $activeItems = computed(() => {
    const ids = [];
    for (const item of this.$items()) {
      if (item.$isActive()) {
        ids.push(item.id);
      }
    }
    return ids.join(', ');
  });

  protected addItem() {
    this.$itemsCount.update(c => c + 1);
  }
}
```

여기서 알 수 있는 것:

- 우리는 $items에서 아이템 목록을 렌더링합니다. 이는 computed()로 구성되어 있습니다.
- $items는 새로운 아이템 배열을 생성하며, 그 수는 $itemsCount 시그널에 의해 제어됩니다. $itemsCount를 수정할 때마다 아이템이 재생성됩니다.
- addItem()은 단순히 $itemsCount를 증가시키고, $items의 재계산을 유도합니다.

<div class="content-ad"></div>

이제 "Add Item"이 이렇게 작동하는 이유를 알 수 있습니다. 이제 상태 토글이 이상하게 동작하는 이유를 알아보겠습니다.

콘솔을 열면 버튼을 클릭할 때마다 "Generating items!" 경고가 기록된다는 것을 알 수 있습니다. 하지만 왜 그럴까요? $itemsCount를 수정하지 않았는데 $items가 다시 계산되는 이유는 무엇일까요?

아마도 이미 주목했을지도 모르지만, $items의 계산 함수가 또 하나의 반응 소스를 읽고 있는 것을 알 수 있습니다: 신호 $isActive:

```js
const $scale = signal($isActive() ? 1.2 : 1);
```

<div class="content-ad"></div>

이 신호 ($isActive)은 반응적인 컨텍스트에서 읽힙니다: activeConsumer에는 $items이 포함되어 있으므로 $isActive은 모든 변경 사항에 대해 $items에 통지합니다. 따라서이 상태를 전환하려고 $isActive을 수정할 때 우리는 $items의 재계산을 발생시킵니다.

이 버그를 수정하는 여러 가지 방법이 있지만, 이 접근 방식은 반응적 컨텍스트의 누출을 방지합니다:

```js
const $scale = signal(untracked($isActive) ? 1.2 : 1);
```

untracked()가 하는 일은 무엇인가요?

<div class="content-ad"></div>

```js
/**
 * https://github.com/angular/angular/blob/75a186e321cb417685b2f13e9961906fc0aed36c/packages/core/src/render3/reactivity/untracked.ts#L15
 *
 * packages/core/src/render3/reactivity/untracked.ts
 *
 **/
export function untracked<T>(nonReactiveReadsFn: () => T): T {
  const prevConsumer = setActiveConsumer(null);
  try {
    return nonReactiveReadsFn();
  } finally {
    setActiveConsumer(prevConsumer);
  }
}
```

- activeConsumer을 null로 설정하고 반환 값을 지역 변수 prevConsumer에 저장합니다.
- 주어진 함수를 실행합니다.
- prevConsumer에서 activeConsumer을 복원합니다.

이 함수는 반응적인 컨텍스트를 일시적으로 해제하고 우리 함수를 실행한 후 반응적인 컨텍스트를 복원합니다.

따라서 우리 함수가 실행되는 동안, 시그널이 읽혀지는 경우 activeConsumer에 null을 읽고 이를 소비자 목록에 추가하지 않습니다. 즉, 새로운 종속성이 생성되지 않습니다.


<div class="content-ad"></div>

이 예에서 콘솔에는 "힌트"가 있고, 우리의 코드는 매우 작고 간단합니다. 실제 앱에서는 신호 읽기가 함수 호출 체인 내에 깊이 숨겨져 있고, 코드가 훨씬 더 크고 복잡할 수 있습니다. 이러한 버그는 실제 앱에서 디버깅하기 어려울 수 있으므로 리액티브 컨텍스트를 누출하고 싶지 않을 때는 항상 untracked()을 사용하여 미리 방지하는 것을 권장합니다.

리액티브 컨텍스트를 누락시킬 수 있는 흥미로운 예상치 못한 방법이 있습니다:

- 신호를 읽는 클래스의 인스턴스를 만들기;
- 신호를 읽는 함수를 호출하는 함수 호출하기;
- effect() 내에서 컴포넌트 생성하기;
- observable에 새 값을 발행하기.

computed()와 effect()를 사용할 때,

<div class="content-ad"></div>

- 다른 신호를 읽을 때 주의하세요. 다른 함수가 변경될 때마다 전체 함수를 다시 실행하며 다른 함수에 의해 트리거됩니다.
- 이러한 기능들을 읽고 이해하기 쉽게 만드세요;
- 함수 소비의 반응 소스를 모두 다시 확인하세요.

자주 있듯이 암시적 의존성 추적은 혜택만 가져오는 것이 아니라 어떤 점에서는 희생을 갖고 올 수도 있습니다. 하지만 숙련된 기술과 주의를 기울여 사용할 때 Angular Signals를 사용하여 멋진 앱을 만들 수 있습니다!

작성된 이 문서의 다듬어짐에 많은 기여를 한 리뷰어분들께 깊은 감사를 표합니다:

- Rainer Hahnekamp
- Josh Morony