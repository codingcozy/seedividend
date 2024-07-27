---
title: "Angular에서 이벤트 핸들링 HostListener와 HostBinding 탐구하기"
description: ""
coverImage: "/assets/img/2024-06-23-EventHandlinginAngularExploringHostListenerandHostBinding_0.png"
date: 2024-06-23 14:13
ogImage: 
  url: /assets/img/2024-06-23-EventHandlinginAngularExploringHostListenerandHostBinding_0.png
tag: Tech
originalTitle: "Event Handling in Angular: Exploring HostListener and HostBinding"
link: "https://medium.com/@mariodante/event-handling-in-angular-exploring-hostlistener-and-hostbinding-4a533c3815a4"
---


<img src="/assets/img/2024-06-23-EventHandlinginAngularExploringHostListenerandHostBinding_0.png" />

안녕하세요!
저는 Angular에서 거의 잊혀진 2가지 디렉티브를 소개하고 싶어요. 이 디렉티브들은 웹 페이지를 더 매혹적이고 매력적으로 만드는 열쇠를 쥐고 있어요.

# 소개

Angular에서 이벤트 처리는 상호작용적이고 동적인 애플리케이션을 만드는 데 중요한 역할을 합니다. HostListener와 HostBinding이라는 두 강력한 데코레이터는 컴포넌트나 디렉티브 내에서 호스트 요소의 이벤트를 처리하고 속성을 바인딩하는 중요한 기능을 제공합니다. 이 글에서는 HostListener와 HostBinding의 기술적 측면, 사용 방법, 예제, 차이점 및 최적 사용 방법에 대해 자세히 알아보겠습니다.

<div class="content-ad"></div>

# HostListener

HostListener는 Angular에서 호스트 요소에서 이벤트를 수신할 수 있게 해주는 데코레이터입니다. 컴포넌트나 디렉티브의 호스트 요소에서 발생하는 이벤트를 수신하도록 할 수 있습니다. 클릭, 키 변경, 스크롤 등의 이벤트에 대응하여 DOM 요소에 이벤트 핸들러를 추가할 수 있습니다. 컴포넌트 메소드를 특정 이벤트에 바인딩하여 이벤트가 발생할 때 해당 메소드를 실행할 수 있습니다.

## Import/Usage

HostListener를 가져오고 사용하는 방법은 다음과 같습니다:

<div class="content-ad"></div>

1- @angular/core에서 필요한 데코레이터를 가져와주세요:

```js
import { Component, Directive, HostListener } from '@angular/core';
```

2- 컴포넌트나 디렉티브 내에서 적절한 속성이나 메소드에 HostListener 데코레이터를 적용해주세요.

## 예시 1:

<div class="content-ad"></div>

```js
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<button (click)="onClick()">Click Here</button>`
})
export class ExampleComponent {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }

  onClick() {
    console.log('Button clicked');
  }
}
```

이 예시에서는 HostListener를 사용하여 문서에서 keydown 이벤트를 감지하고 해당 이벤트가 트리거될 때 handleKeyboardEvent() 메소드를 호출합니다. 이 handleKeyboardEvent() 메소드는 키를 누를 때마다 메시지를 보여줍니다.

또한 버튼에 일반 클릭 이벤트를 사용하여 onClick() 메소드를 호출합니다.

## 예시 2:

<div class="content-ad"></div>

```js
import { HostListener, Component } from "@angular/core";

@Component({
  selector: 'app',
  template: `<h1>Hello, you have pressed enter {counter} number of times!</h1> Press enter key
to increment the counter.
  <button (click)="resetCounter()">Reset Counter</button>`
})
class AppComponent {
  counter = 0;
  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.counter++;
  }

  @HostListener('window:keydown.Backspace', ['$event'])
  handleBackspace(event: KeyboardEvent) {
    this.counter--;
  }

  resetCounter() {
    this.counter = 0;
  }
}
```

이 경우, 이 예제에서는 Angular 컴포넌트가 정의되어 있습니다. 해당 컴포넌트는 카운터와 버튼을 표시합니다. Enter 키를 누를 때마다 카운터가 증가하고, BackSpace 키를 누를 때마다 카운터가 감소하며, 버튼을 클릭하여 0으로 재설정할 수 있습니다.

@HostListener 데코레이터는 창에서 `keydown.enter` 이벤트를 감지하고 해당 이벤트가 발생할 때마다 handleKeyDown 메서드를 호출합니다. handleKeyDown 메서드에서는 카운터가 하나씩 증가합니다.

비슷한 아이디어가 적용됩니다. HostListener 데코레이터가 창에서 `keydown.Backspace` 이벤트를 감지하고 'Backspace' 이벤트가 발생할 때마다 handleKeyDown 메서드를 호출합니다(카운터가 하나씩 감소).

<div class="content-ad"></div>

마지막으로 resetCounter 메서드는 카운터 변수에 0의 값을 할당합니다.

## HostBinding

HostBinding은 Angular에서 호스트 요소의 속성을 컴포넌트 또는 디렉티브의 속성에 바인딩할 수 있게 해주는 또 다른 데코레이터입니다. 이를 사용하여 호스트 요소에 속성 값을 설정하는 데 사용하며 컴포넌트 또는 디렉티브 속성의 값에 따라 호스트 요소에 속성 값을 설정합니다.

## Import/사용법

<div class="content-ad"></div>

HostBinding을 가져와 사용하려면 다음 단계를 따르세요:

1- @angular/core에서 필요한 데코레이터를 가져옵니다:

```js
import { Component, Directive, HostBinding } from '@angular/core';
```

2- HostBinding 데코레이터를 컴포넌트나 디렉티브의 적절한 속성에 적용하세요.

<div class="content-ad"></div>

# 예시 1

```js
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<div>컴포넌트 내용</div>`,
  styles: [`
    :host {
      display: block;
      background-color: yellow;
    }
  `]
})
export class ExampleComponent {
  @HostBinding('style.color') color = 'red';
  @HostBinding('class.active') isActive = true;
}
```

이 예시에서는 HostBinding을 사용하여 호스트 요소의 style.color 속성을 컴포넌트의 color 속성과 바인딩합니다. 또한 호스트 요소의 active 클래스를 컴포넌트의 isActive 속성과 바인딩합니다. 이를 통해 컴포넌트의 속성 값에 따라 호스트 요소에 값을 설정할 수 있습니다.

# 예시 2

<div class="content-ad"></div>

```js
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<div>Component Content</div>`,
  styles: [`
    :host {
      display: block;
      background-color: yellow;
    }
  `]
})
export class ExampleComponent {
  @HostBinding('attr.role') role = 'button';
}
```

이 예제에서는 HostBinding을 사용하여 호스트 요소의 role 속성을 컴포넌트의 role 속성과 바인딩합니다. 이를 통해 호스트 요소의 role 속성을 동적으로 설정할 수 있게 됩니다.

# 차이점 및 사용 방법

HostListener와 HostBinding의 주요 차이점은 기능입니다:

<div class="content-ad"></div>

- HostListener은 호스트 요소에서 특정 이벤트를 수신하고 해당 이벤트에 따라 구성 요소나 지시문 메서드를 실행하는 데 사용됩니다. 예를 들어, 클릭 또는 키 변경과 같은 이벤트가 있습니다.
- HostBinding은 구성 요소나 지시문 속성을 호스트 요소의 속성에 바인딩하고 이러한 속성 값에 따라 호스트 요소에 값을 설정하는 데 사용됩니다. 구성 요소나 지시문 속성 값에 따라 호스트 요소의 속성에 값을 설정해야 하는 경우에 사용하며, 스타일, 클래스 등과 같은 속성에 값을 설정하는 데 유용합니다.

# 결론

본 문서에서는 Angular에서 강력한 데코레이터인 HostListener와 HostBinding을 탐색했습니다. HostListener를 사용하면 호스트 요소에서 이벤트를 수신하고 해당 이벤트에 따라 메서드를 실행할 수 있습니다. HostBinding을 사용하면 구성 요소나 지시문 속성을 호스트 요소의 속성에 바인딩하여 호스트 요소를 동적으로 조작할 수 있습니다. 이러한 데코레이터를 사용하는 방법과 차이점을 이해하고 최선의 실천 방법을 알아보면 Angular 애플리케이션을 상호작용적이고 반응적으로 개선할 수 있습니다.

관심 가져주셔서 감사합니다!

<div class="content-ad"></div>

# 참고 자료

- https://angular.io/api/core/HostListener
- https://angular.io/api/core/HostBinding
- https://www.digitalocean.com/community/tutorials/angular-hostbinding-hostlistener