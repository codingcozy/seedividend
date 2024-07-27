---
title: "Angular 16 Signals 완벽 설명 5가지 예제로 배우는 법"
description: ""
coverImage: "/assets/img/2024-06-22-Angular16SignalsExplainedWithFiveExamples_0.png"
date: 2024-06-22 03:19
ogImage: 
  url: /assets/img/2024-06-22-Angular16SignalsExplainedWithFiveExamples_0.png
tag: Tech
originalTitle: "Angular 16 Signals Explained With Five Examples"
link: "https://medium.com/@KkambizZ/angular-16-signals-explained-with-five-examples-6b773a12c974"
---


Markdown 형식으로 테이블 태그를 변경해 주세요.

<div class="content-ad"></div>

시그널의 값은 항상 게터 함수를 통해 읽습니다. 이는 Angular이 시그널이 사용된 위치를 추적할 수 있게 합니다.

그래서 이 개념을 실제로 적용하고 TypeScript에서 몇 가지 실용적인 예제로 배워봅시다:

## 예제 1: 시그널을 사용하여 총 가격 업데이트하기

가정해보죠. 사용자가 쇼핑 카트에 항목을 추가할 수 있는 전자 상거래 애플리케이션을 가지고 있다고 해봅시다. 항목의 총 가격을 표시하고 새 항목이 추가되거나 제거될 때마다 업데이트하고 싶습니다. 이를 달성하기 위해 시그널을 사용하는 방법은 다음과 같습니다:

<div class="content-ad"></div>

```js
@Component({
  selector: 'my-cart',
  template: `
    <ul>
      <li *ngFor="let item of items">
        {item.name} - ${item.price}
        <button (click)="removeItem(item)">Remove</button>
      </li>
    </ul>
    Total Price: ${totalPrice()}
  `,
})
export class CartComponent {
  items = [    { name: 'Product A', price: 10 },    { name: 'Product B', price: 15 },    { name: 'Product C', price: 20 },  ];
  
  // 장바구니의 항목 목록을 위한 신호인 itemList을 정의합니다.
  itemList = signal(this.items);
  
  // 총 가격을 위한 계산된 값인 totalPrice를 정의합니다.
  totalPrice = computed(() => {
    return this.itemList().reduce((acc, curr) => acc + curr.price, 0);
  });
  
  removeItem(item) {
    // 선택한 항목을 제거하여 itemList 신호를 업데이트합니다.
    this.itemList.set(this.itemList().filter((i) => i !== item));
  }
}
```

이 예제에서는 장바구니에 있는 항목 목록을 나타내는 신호인 itemList을 정의하고, itemList에 의존하는 총 가격인 totalPrice를 계산된 값으로 정의합니다. 장바구니에서 항목을 제거할 때 itemList 신호를 업데이트하여 totalPrice를 다시 계산합니다.

## 예제 2: 신호를 사용하여 로딩 스피너를 보이거나 숨기기

API에서 데이터를 가져와 테이블에 표시하는 컴포넌트가 있다고 가정해봅시다. 데이터를 가져오는 동안 로딩 스피너를 표시하려고 합니다. 이를 신호를 사용하여 구현하는 방법은 다음과 같습니다:

<div class="content-ad"></div>

```js
@Component({
  selector: 'my-table',
  template: `
    <div *ngIf="isLoading()">
      Loading...
    </div>
    <table *ngIf="!isLoading()">
      <thead>...</thead>
      <tbody>...</tbody>
    </table>
  `,
})
export class TableComponent {
  // 로딩 상태를 위한 신호 loading을 정의하고 초기값을 true로 설정합니다.
  
  loading = signal(true);
  
  ngOnInit() {
    // API에서 데이터를 가져옵니다.
    fetchData().subscribe((data) => {
      // 데이터가 수신되면 로딩 신호를 false로 업데이트합니다.
      this.loading.set(false);
      
      // 테이블에 데이터를 렌더링합니다.
      ...
    });
  }
  
  isLoading() {
    return this.loading();
  }
}
```

이 예제에서는 로딩 상태를 나타내는 신호 loading을 정의하고 초기값을 true로 설정합니다. 컴포넌트가 초기화될 때 API에서 데이터를 가져와 데이터를 수신했을 때 로딩 신호를 false로 업데이트합니다. isLoading 메서드는 현재 로딩 신호의 값을 반환하며, 이 값은 로딩 스피너 또는 테이블을 조건부로 렌더링하는 데 사용됩니다.

## 예제 3: 응용 프로그램에서 반응형 프로그래밍을 위한 신호 사용

이 예제에서는 여러 가지 신호, 계산된 신호 및 이펙트를 활용하여 더 복잡한 시나리오에서의 사용법을 시연합니다.

<div class="content-ad"></div>

```js
import { signal, computed, effect } from 'signal';

// Writable signals
const firstName = signal('John');
const lastName = signal('Doe');
const age = signal(30);

// Computed signal to calculate the full name
const fullName = computed(() => `${firstName()} ${lastName()}`);

// Computed signal to determine if the person is an adult
const isAdult = computed(() => age() >= 18);

// Effect to log the full name and adult status whenever any of the signals change
effect(() => {
  console.log(`Full Name: ${fullName()}`);
  console.log(`Is Adult: ${isAdult()}`);
});

// Update the values of the writable signals
firstName.set('Jane');
lastName.set('Smith');
age.set(25);
```

여기 예제에서는 세 가지 쓰기 가능한 시그널이 있습니다: firstName, lastName 및 age입니다. firstName과 lastName을 결합하는 fullName 및 나이를 기반으로 사람이 성인인지 여부를 결정하는 isAdult라는 두 개의 계산된 시그널을 만듭니다. 그런 다음, 시그널이 변경 될 때마다 전체 이름 및 성인 여부를 기록하는 효과를 만듭니다.

쓰기 가능한 시그널의 값을 업데이트하면, 해당 값이 변경되었을 때 효과가 실행되어 업데이트된 전체 이름과 성인 여부가 기록됩니다.

이 예제는 시그널, 계산된 시그널 및 효과가 데이터의 변경을 추적하고 반응하여 애플리케이션에서 반응형 프로그래밍을 가능하게 하는 방법을 보여줍니다.

<div class="content-ad"></div>

## 예제 4: 다양한 조건에 따라 데이터를 필터링, 정렬 및 계산하는 신호 사용

이 예제는 여러 신호를 통합하고 종속성을 가진 계산된 신호 및 효과를 포함하여 더 복잡한 시나리오를 다룹니다:

```js
import { signal, computed, effect } from 'signal';

// 쓰기 가능한 신호
const todos = signal([
  { id: 1, title: '장보기', completed: false },
  { id: 2, title: '세탁하기', completed: true },
  { id: 3, title: '개 산책시키기', completed: false }
]); // 할 일 목록

const showCompleted = signal(false); // 완료된 할 일을 표시해야 하는지 여부를 나타내는 플래그

// showCompleted 플래그에 기반하여 할 일을 필터링하고 정렬하는 계산된 신호
const filteredTodos = computed(() => {
  const filtered = todos().filter(todo => showCompleted() || !todo.completed);
  return filtered.sort((a, b) => a.id - b.id);
});

// 남은 할 일 수를 계산하는 계산된 신호
const remainingTodosCount = computed(() =>
  todos().reduce((count, todo) => (todo.completed ? count : count + 1), 0)
);

// 변경 시 필터링된 할 일과 남은 수를 로그하는 효과
effect(() => {
  console.log('필터링된 할 일:');
  console.log(filteredTodos());
  console.log(`남은 할 일 수: ${remainingTodosCount()}`);
});

// 쓰기 가능한 신호의 값 업데이트
todos.mutate(value => {
  value.push({ id: 4, title: '집 청소하기', completed: false });
  value[1].completed = false;
});

// showCompleted 플래그 업데이트
showCompleted.set(true);
```

이 예제에서는 할 일 목록을 나타내는 쓰기 가능한 신호 todos가 있습니다. 또한 완료된 할 일을 표시해야 하는지를 나타내는 쓰기 가능한 신호 showCompleted가 있습니다. showCompleted 플래그에 따라 할 일을 필터링하고 정렬하는 computed 신호 filteredTodos를 생성합니다. 추가로, 남은 할 일 수를 계산하는 computed 신호 remainingTodosCount를 생성합니다.

<div class="content-ad"></div>

우리는 그런 다음, 변경될 때마다 필터된 할 일 목록과 남은 항목 수를 기록하는 효과를 만듭니다. 결정이 변경될 때마다 이 효과가 여러 번 실행됩니다.

할 일 목록을 업데이트하고 showCompleted 플래그를 변경하는 경우와 같이 쓰기 가능한 시그널의 값을 업데이트할 때, 이 효과가 실행되어 업데이트된 필터된 할 일 목록과 남은 항목 수를 기록합니다. 마지막으로 showCompleted 플래그를 업데이트하여 새로운 필터된 할 일 목록으로 다시 효과를 트리거합니다.

이 예제에서는 시그널, 계산된 시그널 및 효과가 어떻게 함께 작동하여 필터링, 정렬 및 다양한 조건에 따라 데이터를 계산하는 복잡한 시나리오를 처리하는지 보여줍니다.

## 예제 5: 다수의 사용자가 공유하고 수정할 수 있는 장보기 목록 애플리케이션을 구현하는 데 시그널을 사용하는 예시

<div class="content-ad"></div>

여기 신호(Signals)를 활용하여 다수 사용자가 공유하고 수정할 수 있는 식료품 쇼핑 목록 애플리케이션을 만드는 방법 예제가 있어요.

```js
@Component({
  selector: 'my-grocery-list',
  template: `
    <h2>식료품 목록:</h2>
    <ul>
      <li *ngFor="let item of items">
        {item.name} - {item.quantity} - 최종 편집자: {item.lastEditedBy}
        <button (click)="removeItem(item)">삭제</button>
      </li>
    </ul>
    <h3>아이템 추가:</h3>
    <form (submit)="addItem()">
      <input type="text" [(ngModel)]="newItemName" placeholder="이름">
      <input type="number" [(ngModel)]="newItemQuantity" placeholder="수량">
      <button type="submit">추가</button>
    </form>
  `,
})
export class GroceryListComponent {
  items = [    { name: '사과', quantity: 5, lastEditedBy: null },    { name: '바나나', quantity: 3, lastEditedBy: null },    { name: '우유', quantity: 1, lastEditedBy: null },  ];
  
  // 아이템 목록에 대한 신호(signal) 정의
  itemList = signal(this.items);
  
  // 현재 사용자의 이름에 대한 신호(signal) 정의
  currentUser = signal('남편');
  
  addItem() {
    // 현재 사용자의 이름을 마지막으로 편집한 값으로 하는 새로운 항목을 itemList 신호에 추가
    this.itemList.set([...this.itemList(), { name: this.newItemName, quantity: this.newItemQuantity, lastEditedBy: this.currentUser() }]);
    
    // 입력 필드를 지웁니다
    this.newItemName = '';
    this.newItemQuantity = '';
  }
  
  removeItem(item) {
    // 선택한 항목을 itemList 신호에서 제거
    this.itemList.set(this.itemList().filter((i) => i !== item));
  }
}
```

이 예제에서는 식료품 쇼핑 목록의 항목 리스트를 위한 itemList 신호와 현재 사용자의 이름을 위한 currentUser 신호를 정의했습니다. 새 항목을 추가하거나 기존 항목을 제거할 때 itemList 신호를 업데이트하여 뷰의 재계산이 일어나도록 합니다. 또한 수정된 항목의 lastEditedBy 속성을 currentUser 신호의 현재 값으로 설정합니다.

addItem 메서드는 현재 사용자의 이름을 lastEditedBy 값으로 하는 새 항목을 itemList 신호에 추가합니다. removeItem 메서드는 선택한 항목을 itemList 신호에서 제거합니다.

<div class="content-ad"></div>

이 글을 읽어주셔서 감사합니다. 제 글이 유익하고 생각을 자극했기를 바랍니다.

만약 여러분이 이 글을 지금까지 즐겁게 읽으셨다면, 제 Medium 페이지를 팔로우하시고 박수를 쳐주세요! 🙂

![image](/assets/img/2024-06-22-Angular16SignalsExplainedWithFiveExamples_1.png)

팔로우하신다면 댓글 섹션에서 다른 분들과 함께 소통할 수 있는 기회도 생기고, 여러분의 의견을 항상 환영합니다. 팔로워 여러분들의 의견을 매우 소중히 여깁니다. 💬🌟

<div class="content-ad"></div>

내 다른 게시물에 대한 링크:
1. PART ONE: 간단한 예제와 함께 마이크로서비스 애플리케이션에서 사용되는 가장 일반적인 Spring Boot 어노테이션
2. PART TWO: 간단한 예제와 함께 마이크로서비스 애플리케이션에서 사용되는 가장 일반적인 Spring Boot 어노테이션
3. MySQL 및 Rest 엔드포인트를 사용하는 간단한 Spring Boot 애플리케이션
4. Spring Boot를 사용하여 마이크로서비스 애플리케이션에서 REST API를 개발할 때 따를 가장 좋은 방법들