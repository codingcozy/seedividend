---
title: "Angular 17의 새로운 제어 흐름 구문 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-17-MustKnowAngular17NewControlFlowSyntax_0.png"
date: 2024-05-17 21:10
ogImage: 
  url: /assets/img/2024-05-17-MustKnowAngular17NewControlFlowSyntax_0.png
tag: Tech
originalTitle: "Must Know Angular 17 New Control Flow Syntax"
link: "https://medium.com/@chandantechie/must-know-angular-17-new-control-flow-syntax-d8c8ebed5582"
---



![New Control Flow Syntax in Angular](/assets/img/2024-05-17-MustKnowAngular17NewControlFlowSyntax_0.png)

앵귤러 17과 18에서 소개된 새로운 제어 흐름 구문에 대한 포괄적인 설명을 제공해 드릴게요. 예제를 통해 자세히 설명해 드리겠습니다:

# 앵귤러에서의 새로운 제어 흐름 구문

앵귤러 17과 18은 내장 구문을 사용하여 템플릿 내에서 제어 흐름을 더 직관적이고 선언적으로 다룰 수 있도록 제공합니다. 이를 통해 *ngIf, *ngFor, ngSwitch와 같은 디렉티브를 사용할 필요가 없어져 가독성과 유지보수성이 향상되었습니다.


<div class="content-ad"></div>

# 주요 개념:

- @if...else: 불리언 표현식에 기반하여 조건부 렌더링을 구현합니다. 프로그래밍 언어의 전통적인 if...else 문과 유사합니다.
- @for...of: 배열이나 iterable을 반복하며 각 항목과 루프 내의 컨텍스트 변수에 액세스를 제공합니다.
- @switch...case...default: 조건에 기반하여 다중 분기를 제공하며 JavaScript의 switch 문과 일치합니다.

예시

```js
<div>
  @if (isLoggedIn) {
    <p>환영합니다, { username }님!</p>
    <button (click)="logout()">로그아웃</button>
  } else {
    <p>계속하려면 로그인하세요.</p>
    <button (click)="login()">로그인</button>
  }
</div>

<ul>
  @for (let item of items; track item.id) {
    <li>{ item.name }</li>
  }
  @empty {
    <li>표시할 항목이 없습니다.</li>
  }
</ul>

<div>
  @switch (status) {
    @case ('pending') {
      <p>주문 처리 중입니다.</p>
    }
    @case ('shipped') {
      <p>주문이 발송되었습니다! <a href="#">여기</a>에서 추적하세요.</p>
    }
    @default {
      <p>주문 상태를 확인할 수 없습니다.</p>
    }
  }
</div>
```

<div class="content-ad"></div>

설명:

## 조건부 렌더링:

- @if 블록은 isLoggedIn 변수에 따라 조건부로 콘텐츠를 렌더링합니다.
- else 블록은 isLoggedIn이 false인 경우 대체 뷰를 제공합니다.

## 반복문:

<div class="content-ad"></div>

- @for (let item of items; track item.id)은 items 배열을 반복합니다.
- let item은 루프 내 각 항목에 대한 지역 변수 item을 생성합니다.
- track item.id는 효율적인 DOM 업데이트에 사용되는 trackBy 표현식입니다.
- 루프 몸체는 각 항목에 대해 목록 항목 'li'를 렌더링하고 해당 name 속성을 표시합니다.
- @empty 블록은 배열에 항목이 없는 경우 메시지를 표시합니다.

# 다중 분기:

- @switch (status)는 status 변수를 평가합니다.
- @case 블록은 특정 값(‘pending’, ‘shipped’)과 일치합니다.
- 일치하는 case 블록은 상태에 기반하여 해당 내용을 렌더링합니다.
- @default 블록은 일치하지 않는 경우를 처리합니다.

# 이점:

<div class="content-ad"></div>

- 개선된 가독성: 새로운 구문은 표준 프로그래밍 구조와 더 밀접하게 일치하여 템플릿을 이해하기 쉽게 만듭니다.
- 불필요한 길이를 줄인: 긴 지시어 구문(*ngIf, *ngFor 등)을 제거하여 코드를 더 깨끗하게 만듭니다.
- 향상된 유지보수성: 선언적 접근 방식은 로직을 단순화하고 유지보수성을 향상시킵니다.

# 추가 사항:

- 새로운 제어 흐름 구문은 선택 사항입니다. 선호하는 경우 기존 지시어를 계속 사용할 수 있습니다.
- 데이터가 없는 경우 정보 전달 메시지를 제공하려면 컬렉션을 반복할 때 @empty 블록을 사용하는 것을 고려해보세요.

Angular 17 및 18의 새로운 제어 흐름 구문에 대한 더 많은 예제를 확인할 수 있습니다. 그것의 다재다능성을 보여줍니다.  


<div class="content-ad"></div>

# 1. 중첩된 제어 흐름:

```js
- 카테고리:
- 제품:
```
이 예제는 @for를 사용하여 중첩된 루프를 보여줍니다. 외부 루프는 카테고리를 반복하고, 내부 루프는 각 카테고리 내의 제품을 반복합니다. 내부 루프 내의 @empty 블록은 카테고리에 제품이 없는 경우 메시지를 제공합니다.

# 2. bind를 사용한 조건부 속성:

<div class="content-ad"></div>

```js
<input type="text"
       @bind-disabled="!isEditEnabled"
       placeholder="이름을 입력하세요">
```

@bind 지시문을 사용하면 속성에 바인딩을 조건부로 적용할 수 있습니다. 여기서 disabled 속성은 !isEditEnabled에 바인딩됩니다. isEditEnabled가 false인 경우 입력 필드가 비활성화됩니다.

# 3. 색인($index) 및 다른 문맥 변수를 사용한 루핑:

```js
<ul>
  @for (let item of items; track item.id) {
    <li>아이템 #{ $index + 1 }: { item.name }</li>
  }
</ul>
```

<div class="content-ad"></div>

이 예시는 $index를 활용하여 각 항목의 인덱스(1부터 시작)를 표시합니다. @count (총 항목 수), @first (첫 번째 항목 여부), @last (마지막 항목 여부), @even 및 @odd와 같은 다른 문맥 변수를 사용하여 더 복잡한 형식을 지정할 수도 있습니다.

### 4. 논리 연산자와 함께 @if 조합하기:

```js
<div>
  @if (isLoggedIn && hasPermission('edit')) {
    <button (click)="editUser()">Edit User</button>
  }
</div>
```

@if를 사용하면 논리 연산자(&&, ||, !)를 사용하여 조건을 결합할 수 있습니다. 여기서 사용자가 로그인되어 있고 "편집" 권한을 가지고 있을 때에만 버튼이 표시됩니다.

<div class="content-ad"></div>

# 5. 복잡한 조건과 함께 @switch 사용하기:

```js
<div>
  @switch (userRole) {
    @case ('admin') {
      <p>환영합니다, 관리자님!</p>
    }
    @case ('editor', 'moderator') {
      <p>환영합니다, 콘텐츠 편집자/모더레이터님!</p>
    }
    @default {
      <p>환영합니다, 사용자님!</p>
    }
  }
</div>
```

@switch는 복잡한 조건을 가진 여러 경우를 처리할 수 있습니다. 여기서는 쉼표로 구분된 값들('admin', 'editor', 또는 'moderator')에 대해 확인합니다.

이것들은 단지 몇 가지 예시일 뿐입니다. 새로운 제어 흐름 구문은 Angular 템플릿에서 조건부 렌더링과 루프 로직을 유연하고 강력하게 다룰 수 있는 방법을 제공합니다. 자유롭게 실험하고 더 많은 기능을 탐구해보세요!

<div class="content-ad"></div>

수고하셨습니다,

찬단