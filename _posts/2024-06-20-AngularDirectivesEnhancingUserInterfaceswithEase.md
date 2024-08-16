---
title: "앵귤러 디렉티브 쉽게 사용자 인터페이스 향상하기"
description: ""
coverImage: "/assets/img/2024-06-20-AngularDirectivesEnhancingUserInterfaceswithEase_0.png"
date: 2024-06-20 02:46
ogImage: 
  url: /assets/img/2024-06-20-AngularDirectivesEnhancingUserInterfaceswithEase_0.png
tag: Tech
originalTitle: "Angular Directives: Enhancing User Interfaces with Ease"
link: "https://medium.com/@ayushgrwl365/angular-directives-enhancing-user-interfaces-with-ease-bb99d74e69cd"
isUpdated: true
---




<img src="/assets/img/2024-06-20-AngularDirectivesEnhancingUserInterfaceswithEase_0.png" />

앵귤러, 인기 있는 자바스크립트 프레임워크로, 개발자에게 강력한 도구를 제공하여 동적이고 대화식 웹 애플리케이션을 만들 수 있게 합니다. 이 중요한 도구 중 하나는 디렉티브입니다. 이 블로그 게시물에서는 앵귤러의 디렉티브에 대해 깊이 있는 내용을 다루고, 그 종류를 탐색하며 사용법을 보여주는 코드 예제를 제공할 것입니다.

# 디렉티브란 무엇인가요?

디렉티브는 HTML을 확장하여 DOM 요소에 사용자 지정 동작을 부여하거나 새 HTML 요소를 생성하는 방법입니다. 이는 앵귤러의 선언적 사용자 인터페이스 구축 방식의 중요한 부분입니다. 디렉티브를 사용하면 DOM을 조작하거나 CSS 스타일을 적용하고 사용자 입력을 처리하는 등 다양한 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

# 지시문의 종류

Angular는 네 가지 종류의 지시문을 제공합니다.

- 컴포넌트 지시문: Angular에서 가장 일반적인 지시문 유형입니다. 컴포넌트는 템플릿이 있는 지시문입니다. 사용자 인터페이스의 일부를 캡슐화하며 종종 연관된 로직을 갖습니다. 재사용 가능한 UI 구성 요소를 만드는 데 사용됩니다.
- 속성 지시문: 속성 지시문은 요소, 컴포넌트 또는 다른 지시문의 외관 또는 동작을 변경합니다. 일반적으로 HTML 요소의 속성으로 적용됩니다. 예시로는 ngClass, ngStyle 및 ngModel이 있습니다.
- 구조 지시문: 구조 지시문은 요소를 추가하거나 제거함으로써 DOM 구조를 수정합니다. 가장 잘 알려진 구조 지시문은 ngIf, ngFor 및 ngSwitch입니다.
- 사용자 정의 지시문: 개발자는 Angular의 기능을 확장하기 위해 사용자 정의 지시문을 생성할 수 있습니다. 사용자 정의 지시문은 속성 지시문, 구조 지시문 또는 둘 다가 될 수 있습니다. 복잡한 동작을 캡슐화하고 코드를 더 모듈화하는 데 유용합니다.

이제 Angular에서 지시문을 사용하는 방법을 이해하기 위한 일부 실용적인 예제를 살펴보겠습니다.

<div class="content-ad"></div>

# 예제 1: ngIf 구조 지시문 사용하기

ngIf 지시문은 주어진 표현식에 기반하여 요소를 조건부로 렌더링하는 데 사용됩니다.

```js
<!-- app.component.html -->

<div *ngIf="isLoggedIn">
  <p>Welcome, { username }!</p>
</div>
```

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoggedIn = true;
  username = 'John';
}
```

<div class="content-ad"></div>

이 예제에서는 isLoggedIn이 true인 경우에만 문단 요소가 렌더링됩니다.

# 예제 2: 최소 글자 수를 위한 커스텀 디렉티브 생성

텍스트 필드에 사용자 입력이 최소 글자 요구 사항을 충족하는지 확인하고 싶다고 상상해보세요. Angular의 커스텀 디렉티브를 사용하여 이를 달성할 수 있습니다. 이를 위해 appMinLength이라는 커스텀 디렉티브를 생성해 봅시다.

## 디렉티브 생성

<div class="content-ad"></div>

위에있는 텍스트를 친절한 톤으로 한국어로 번역해 드리겠습니다.

여기 AppMinLength 지시문을 만드는 방법이 있습니다:

```js
// min-length.directive.ts
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMinLength]',
})
export class MinLengthDirective {
  @Input('appMinLength') minLength: number;
  constructor(private el: ElementRef) {}
  @HostListener('input') onInput() {
    const inputValue: string = this.el.nativeElement.value;
    if (inputValue.length < this.minLength) {
      this.el.nativeElement.setCustomValidity(`최소 길이는 ${this.minLength}자여야 합니다.`);
    } else {
      this.el.nativeElement.setCustomValidity('');
    }
  }
}
```

이 지시문을 단계별로 이해해 봅시다:

- 우리는 [appMinLength] 선택자를 사용하여 HTML 요소의 속성으로 사용될 것임을 나타내는 MinLengthDirective 라는 사용자 정의 지시문을 정의합니다.
- @Input('appMinLength') minLength: number; 데코레이터를 사용하여 지시문에 최소 길이를 입력으로 전달할 수 있습니다. 이 길이는 템플릿에서 지시문을 사용할 때 지정됩니다.
- 생성자에서 ElementRef를 주입하여 지시문이 적용된 DOM 요소에 액세스할 수 있습니다.
- @HostListener('input') 데코레이터를 사용하여 요소에서 입력 이벤트를 청취합니다. 이 이벤트는 사용자가 입력 필드에 문자를 입력하거나 삭제할 때 트리거됩니다.
- onInput 메서드 내에서 요소로부터 현재 입력 값을 검색합니다.
- 입력 값의 길이를 지정된 minLength과 비교합니다. 입력 길이가 필요한 최소값보다 작으면 setCustomValidity를 사용하여 사용자에게 최소 문자 요구 사항을 보여주는 사용자 지정 유효성 메시지를 설정합니다.
- 입력 길이가 최소 요구 사항을 충족하는 경우 사용자 정의 유효성 메시지를 지웁니다.

<div class="content-ad"></div>

## 사용자 정의 지시문 적용

Angular 컴포넌트 템플릿에서 이 사용자 정의 지시문을 사용하려면 다음과 같이 입력 필드에 속성처럼 적용할 수 있습니다:

```js
<!-- app.component.html -->

<input type="text" placeholder="텍스트 입력" [appMinLength]="5" required>
```

이 예시에서는 입력 필드의 최소 길이를 5글자로 지정했습니다. 사용자가 다섯 글자 미만으로 양식을 제출하려고 시도하면 유효성 검사 오류가 발생하여 입력이 필요한 최소 길이를 충족시키도록 보장됩니다.

<div class="content-ad"></div>

이런 맞춤 지시문을 사용하면 Angular 애플리케이션에서 특정 동작이나 제약 조건을 강제할 수 있어요. 이렇게 하면 요소들 사이의 일관성과 사용성이 향상됩니다.

# 예시 3: ngFor 구조 지시문 사용

ngFor 지시문은 컬렉션을 반복하고 각 항목에 대해 요소를 렌더링하는 데 사용됩니다.

```js
<!-- app.component.html -->
<ul>
  <li *ngFor="let item of items">{ item }</li>
</ul>
```

<div class="content-ad"></div>

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

이 예제에서는 items 배열의 각 요소마다 목록 항목이 생성됩니다.

# 결론

Angular 디렉티브는 동적이고 상호작용적인 웹 애플리케이션을 만드는 강력한 도구입니다. 이를 사용하여 DOM을 조작하고 요소 렌더링을 제어하고 재사용 가능한 동작을 캡슐화할 수 있습니다. 디렉티브를 이해하고 효과적으로 사용함으로써 유지보수 가능하고 유연한 Angular 애플리케이션을 만들 수 있습니다. 프로젝트에서 디렉티브를 실험해보고 진정한 잠재력을 발견할 수 있을 것입니다.
