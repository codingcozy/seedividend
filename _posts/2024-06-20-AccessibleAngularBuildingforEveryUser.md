---
title: "Angular 접근성 모든 사용자를 위해 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-AccessibleAngularBuildingforEveryUser_0.png"
date: 2024-06-20 00:30
ogImage: 
  url: /assets/img/2024-06-20-AccessibleAngularBuildingforEveryUser_0.png
tag: Tech
originalTitle: "Accessible Angular: Building for Every User"
link: "https://medium.com/@babatundelamidi/accessible-angular-building-for-every-user-86c2855ba4ad"
---


<img src="/assets/img/2024-06-20-AccessibleAngularBuildingforEveryUser_0.png" />

모든 사용자의 능력에 관계없이 웹 애플리케이션을 만드는 것은 도덕적인 의무뿐만 아니라 실용적인 필요성도 있습니다. Angular는 강력한 기능과 모듈식 구조로 장애를 가진 사람들을 포함한 모든 사용자를 대상으로 하는 접근성과 포괄성 있는 웹 애플리케이션을 구축하기에 적합합니다. 본 문서에서는 Angular 애플리케이션이 모든 사람에게 접근 가능하도록 하는 데 필요한 모범 사례와 기술을 탐구합니다. 이 문서는 어느 한 형태에 국한되지 않고 개개인들이 포용을 필수적인 애플리케이션을 구축하는 데 필요한 구성 요소로 간주하도록 독려합니다.

## 접근성의 필요성

접근성은 장애를 가진 사람들을 포함한 모든 사용자가 웹 콘텐츠를 인지, 이해, 탐색 및 상호 작용할 수 있도록 보장합니다. 이는 포용성, 사용성 및 종종 법적 준수에 관한 문제입니다. 접근성이 있는 웹 애플리케이션은 사용자 경험을 개선하고 대중의 범위를 확대하며 사회적 책임을 실천함을 나타냅니다.

<div class="content-ad"></div>

## 웹 접근성의 주요 원칙

## 인지할 수 있는

모든 사용자가 인지할 수 있는 방식으로 콘텐츠를 제공해야 합니다. 이에는 비텍스트 콘텐츠에 대한 텍스트 대체물을 제공하고 정보가 다양한 방식(예: 소리와 시각)으로 제공되도록 하는 것이 포함됩니다.

## 조작할 수 있는

<div class="content-ad"></div>

인터페이스 요소들은 작동 가능해야 합니다. 사용자들은 키보드, 마우스, 터치 등 다양한 입력 방법을 사용하여 콘텐츠를 탐색하고 상호 작용할 수 있어야 합니다.

## 이해하기 쉬움

콘텐츠는 이해하기 쉬워야 합니다. 사용자들은 사용자 인터페이스의 정보와 작동을 이해할 수 있어야 합니다.

## 견고함

<div class="content-ad"></div>

넓은 범위의 사용자 에이전트 및 보조 기술을 신뢰할 수 있는 방식으로 해석할 수 있도록 콘텐츠가 강화되어야 합니다.

## 접근 가능한 Angular 애플리케이션 구축을 위한 모범 사례

## 1. 의미 있는 HTML 사용

의미 있는 HTML은 웹 콘텐츠에 의미를 부여하여 접근성을 높입니다. ``header``, ``nav``, ``main``, 그리고 ``footer``와 같은 태그는 응용 프로그램에 구조를 제공하고 보조 기술이 콘텐츠를 올바르게 해석하는 데 도움을 줍니다.

<div class="content-ad"></div>


html
<header>
  <nav>
    <a routerLink="/" aria-current="page">Home</a>
    <a routerLink="/me">Me</a>
    <a routerLink="/blog">Blogs</a>
  </nav>
</header>
<main>
  <h1>Welcome to my Page</h1>
  <p>Subscribe to my YouTube Channel! @babatundelmd</p>
</main>
<footer>
  <p>© 2024 Babatunde Lamidi</p>
</footer>


## 2. Implement ARIA (Accessible Rich Internet Applications)

ARIA 속성은 웹 콘텐츠의 의미를 향상시켜 보조 기술에 대한 추가 정보를 제공하여 응용 프로그램을 보다 접근성이 높게 만들어줍니다. ARIA 역할, 상태 및 속성을 사용하여 응용 프로그램을 더 쉽게 접근할 수 있도록 만들어보세요.


<button aria-label="close" role="button">X</button>


<div class="content-ad"></div>

## 3. 키보드 탐색 보장하기

모든 상호작용 요소가 키보드로 접근할 수 있도록 보장하세요. 이는 `tabindex` 속성과 Angular의 기본 포커스 관리를 사용하는 것을 포함합니다.

```js
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
@Component({
 selector: 'app-example',
 template: `<button #myButton>Click Me</button>`,
})
export class ExampleComponent implements AfterViewInit {
 @ViewChild('myButton') myButton: ElementRef;
ngAfterViewInit() {
 this.myButton.nativeElement.focus();
 }
}
```

## 4. 포커스 프로그래밍 방식으로 관리하기

<div class="content-ad"></div>

Angular의 FocusMonitor를 사용하여 포커스를 동적으로 관리하여 사용자가 항상 애플리케이션 내에서 자신의 위치를 인식할 수 있도록합니다.

```js
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
 selector: 'app-focus-example',
 template: `<input #inputField type="text" />`,
})
export class FocusExampleComponent implements OnInit {
 @ViewChild('inputField') inputField: ElementRef;
 private focusMonitor = inject(FocusMonitor)

 ngOnInit() {
  this.focusMonitor.monitor(this.inputField.nativeElement).subscribe(origin => {
   if (origin) {
    console.log('Focused from', origin);
   } else {
    console.log('Blurred');
   }
  });
 }
}
```

## 5. 양식 접근성 확보

양식 컨트롤에 레이블을 올바르게 지정하고 적절한 ARIA 속성을 사용하십시오. 키보드를 사용하여 양식을 탐색하고 제출할 수 있도록 보장하세요.

<div class="content-ad"></div>


<label for="username">사용자 이름</label>
<input type="text" id="username" name="username" />
<label for="email">이메일</label>
<input type="email" id="email" name="email" />
<button type="submit" role="button">제출</button>


## 6. 충분한 색 대비 보장

시각 장애가 있는 사용자를 위해 텍스트와 배경 간의 높은 대비는 가독성을 향상시킵니다. WebAIM의 색 대비 점검기와 같은 도구를 사용하여 접근성 표준을 준수하는지 확인해보세요.

## 7. 비 텍스트 콘텐츠를 위한 텍스트 대체 제공하기


<div class="content-ad"></div>

```js
<img src="image.jpg" alt="이미지 설명" aria-label="프로필 사진">
<video controls>
  <source src="intro.mp4" type="video/mp4" />
  <track kind="captions" src="intro_captions.vtt" srclang="en" label="영어">
</video>
```

## Angular CDK를 활용한 접근성 강화

Angular Component Dev Kit (CDK)은 접근성이 뛰어난 애플리케이션 구축을 더 쉽게 해주는 도구를 제공합니다.

<div class="content-ad"></div>

## A11yModule

이 모듈은 포커스 관리 및 실시간 공지를 포함한 다양한 접근성 유틸리티를 제공합니다.

```js
import { A11yModule } from '@angular/cdk/a11y';
@NgModule({
 imports: [A11yModule],
})
export class AppModule {}
```

## FocusTrap

<div class="content-ad"></div>

특정 요소 내에서 포커스를 잡아두어, 모달과 대화 상자 등에 유용합니다.

```js
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
 selector: 'app-modal',
 template: `<div #modalContent><button>Close</button></div>`,
})
export class ModalComponent implements AfterViewInit {
 @ViewChild('modalContent') modalContent: ElementRef;
 private focusTrap;

 constructor(private focusTrapFactory: FocusTrapFactory) {}

 ngAfterViewInit() {
 this.focusTrap = this.focusTrapFactory.create(this.modalContent.nativeElement);
 this.focusTrap.focusInitialElement();
 }
}
```

## 웹 접근성을 고려한 Angular Material

Angular Material은 웹 접근성을 고려하여 설계되었습니다. 해당 컴포넌트는 WCAG(`Web Content Accessibility Guidelines` 표준)을 준수하는 데 사용되어, 애플리케이션이 강력한 접근성 기반으로 시작될 수 있도록 합니다.

<div class="content-ad"></div>

```js
import { MatInputModule, MatButtonModule } from '@angular/material';
@NgModule({
 imports: [MatInputModule, MatButtonModule],
})
export class AppModule {}
```

웹 접근성이란 모든 사용자에게 포용되고 사용하기 쉬운 웹 환경을 만드는 데 준수만큼 중요합니다. Angular의 도구와 기능을 활용하고 최상의 모범 사례를 따르며 애플리케이션을 지속적으로 테스트하고 개선함으로써 모든 사용자가 웹 애플리케이션에 접근하고 혜택을 받을 수 있도록 보장할 수 있습니다. 개발 프로세스에서 웹 접근성을 핵심 원칙으로 받아들이면 포괄적이고 사용자 친화적인 애플리케이션을 구축할 수 있습니다.