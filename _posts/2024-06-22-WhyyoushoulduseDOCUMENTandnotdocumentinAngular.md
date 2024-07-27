---
title: "Angular에서 DOCUMENT를 사용해야 하는 이유"
description: ""
coverImage: "/assets/img/2024-06-22-WhyyoushoulduseDOCUMENTandnotdocumentinAngular_0.png"
date: 2024-06-22 03:14
ogImage: 
  url: /assets/img/2024-06-22-WhyyoushoulduseDOCUMENTandnotdocumentinAngular_0.png
tag: Tech
originalTitle: "Why you should use DOCUMENT and not document in Angular"
link: "https://medium.com/@laban405/why-you-should-use-document-and-not-document-in-angular-b592908ff687"
---



![image](/assets/img/2024-06-22-WhyyoushoulduseDOCUMENTandnotdocumentinAngular_0.png)

DOCUMENT은 Angular에서 제공하는 의존성 주입 토큰으로, 문서 객체 모델(DOM)을 나타내는 주요 렌더링 컨텍스트를 나타냅니다. DOCUMENT 토큰은 @angular/common 패키지에서 import됩니다. 문서 객체 모델(DOM)은 웹 페이지를 스크립트나 프로그래밍 언어와 연결해주는 역할을 합니다. 일반적으로 JavaScript를 참조하지만, HTML, SVG 또는 XML 문서를 객체로 모델링하는 것은 JavaScript 언어의 핵심 부분은 아닙니다. DOCUMENT와 document 객체 모두 DOM에 액세스할 수 있지만, Angular 애플리케이션에서 전역 document 객체 대신 DOCUMENT를 사용하는 것에는 장점이 있습니다. 먼저, Angular 애플리케이션에서 DOCUMENT와 document를 사용하는 한 가지 사례를 살펴보겠습니다.

다음 예제는 HTML 템플릿의 섹션을 보고자 할 때 document를 사용하는 방법을 보여줍니다.

```js
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const myButton = document.getElementById('myButton');
    myButton.addEventListener('click', () => {
      const targetElement = document.getElementById('targetElement');
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
```

<div class="content-ad"></div>

다음 예제는 이전 기능에 DOCUMENT를 사용하는 방법을 보여줍니다.

```js
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    const myButton = this.document.getElementById('myButton');
    myButton.addEventListener('click', () => {
      const targetElement = this.document.getElementById('targetElement');
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
```

위 예제에서는 DOCUMENT 서비스를 주입하고 Document 객체의 메서드와 속성에 액세스합니다. 두 구현은 거의 유사해 보이지만 DOCUMENT 주입 토큰을 사용하는 이점을 살펴보겠습니다.

- 플랫폼에 독립적: DOCUMENT 토큰은 플랫폼에 독립적이므로 전역 document 객체가 사용할 수 없는 서버 측 렌더링 (SSR) 시나리오에서 사용할 수 있습니다. SSR을 사용할 때 document는 Domino에 의해 생성됩니다.
- 의존성 주입: DOCUMENT 토큰은 Angular의 의존성 주입으로 주입될 수 있습니다. 이를 통해 컴포넌트를 전역 범위에서 분리함으로써 더 나은 코드 구성, 테스트 가능성, 유지 관리성이 증진됩니다.
- 타입 안전성: DOCUMENT 토큰은 타입 정의를 제공하여 IDE에서 더 나은 타입 안전성과 코드 완성을 가능하게 합니다.
- Angular zone 인식: Angular의 DOCUMENT는 Angular의 zone.js 라이브러리를 인식하고 변경 감지 메커니즘과 원활하게 통합됩니다. 이를 통해 Angular 컴포넌트에 의해 트리거된 DOM 업데이트가 올바르게 감지되고 처리되며, 변경 감지로 인한 발생할 수 있는 문제를 방지하여 일관된 사용자 경험을 보장합니다.

<div class="content-ad"></div>

전역 문서는 특정 시나리오에 적합할 수 있지만 Angular의 DOCUMENT 토큰은 플랫폼 중립성, 의존성 주입, 유형 안전성 및 Angular 특정 기능 측면에서 여러 가지 장점을 제공합니다.