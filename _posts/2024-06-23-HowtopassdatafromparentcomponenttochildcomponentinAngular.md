---
title: "Angular에서 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달하는 방법"
description: ""
coverImage: "/assets/img/2024-06-23-HowtopassdatafromparentcomponenttochildcomponentinAngular_0.png"
date: 2024-06-23 14:07
ogImage: 
  url: /assets/img/2024-06-23-HowtopassdatafromparentcomponenttochildcomponentinAngular_0.png
tag: Tech
originalTitle: "How to pass data from parent component to child component in Angular"
link: "https://medium.com/fuzzy-code/how-to-pass-data-from-parent-component-to-child-component-in-angular-737ec17ecfd7"
---


<img src="/assets/img/2024-06-23-HowtopassdatafromparentcomponenttochildcomponentinAngular_0.png" />

Angular에서 부모 컴포넌트에서 자식 컴포넌트로 데이터/변수를 전달하는 여러 가지 방법이 있습니다. 가장 흔한 두 가지 방법은 다음과 같습니다:

- @Input 데코레이터 사용
- 공유 서비스 사용

## 1. @Input 데코레이터 사용

<div class="content-ad"></div>

한 가지 방법은 자식 컴포넌트에서 데이터를 수신할 변수를 선언하는 데 @Input() 데코레이터를 사용하는 것입니다.

부모 컴포넌트의 템플릿에서, 속성 바인딩 구문(대괄호)을 사용하여 변수의 값을 자식 컴포넌트의 입력에 바인딩합니다.

예를 들어, 부모 컴포넌트의 템플릿에서:

```js
<!--parent.component.html-->

<app-child [inputFromParent]="data"></app-child>
```

<div class="content-ad"></div>

아이 컴포넌트의 클래스에서:

```js
// child.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>{ inputFromParent }</p>
  `
})
export class ChildComponent {
  @Input() inputFromParent: any;
}
```

## 2. 공유 서비스 사용

다른 방법은 공유 서비스를 사용하는 것입니다. 공유 서비스는 서로 직접적으로 관련이 없는 컴포넌트 간에 데이터를 공유하는 방법입니다.

<div class="content-ad"></div>

부모 컴포넌트의 클래스에서:

```js
// parent.component.ts

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
  `
})
export class ParentComponent {
  constructor(private dataService: DataService) {
    this.dataService.data = '부모 컴포넌트에서 안녕하세요!';
  }
}
```

자식 컴포넌트의 클래스에서:

```js
// child.component.ts

import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-child',
  template: `
    <p>{ data }</p>
  `
})
export class ChildComponent {
  data: any;
  constructor(private dataService: DataService) {
    this.data = this.dataService.data;
  }
}
```

<div class="content-ad"></div>

Angular에서 부모 컴포넌트에서 자식 컴포넌트로 변수를 전달하는 다른 방법이 있을 수 있습니다. 이것들은 기본 접근 방법 중 두 가지에 불과합니다.