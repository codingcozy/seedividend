---
title: "5년 경력자를 위한 Angular 인터뷰 질문 35선"
description: ""
coverImage: "/assets/img/2024-06-22-AngularInterviewQuestionsFor5YearsOfExperience_0.png"
date: 2024-06-22 15:02
ogImage: 
  url: /assets/img/2024-06-22-AngularInterviewQuestionsFor5YearsOfExperience_0.png
tag: Tech
originalTitle: "Angular Interview Questions For 5 Years Of Experience"
link: "https://medium.com/@frontendinterviewquestions/angular-interview-questions-for-5-years-of-experience-8e6f833ecb90"
isUpdated: true
---




<img src="/assets/img/2024-06-22-AngularInterviewQuestionsFor5YearsOfExperience_0.png" />

출처: 5년 경력용 Angular 인터뷰 질문

더 많은 질문과 답변은 저희 웹사이트 Frontend Interview Questions에서 확인하세요.

- Angular에서 사용자 정의 지시문(custom directives)이란 무엇이며, 어떻게 만드는지 설명해주세요.

<div class="content-ad"></div>

Angular에서 사용자 정의 지시문은 HTML의 기능을 확장하여 자체 사용자 정의 HTML 요소 또는 속성을 만들 수 있도록 하는 기능입니다. 사용자 정의 지시문을 사용하면 개발자가 이벤트 리스너 추가, DOM 수정 또는 데이터 조작과 같이 자체 동작을 정의할 수 있습니다.

Angular에서 사용자 정의 지시문을 만들려면 다음 단계를 따르십시오:

- @Directive 데코레이터를 사용하여 새 지시문을 만듭니다. 데코레이터는 지시문의 선택기와 입력, 출력 및 기타 옵션을 지정합니다.
- 지시문 클래스를 정의합니다. 이 클래스에는 지시문의 논리가 포함되어야 합니다. 클래스는 OnInit 및 OnDestroy 인터페이스를 구현하여 지시문의 초기화와 소멸을 처리해야 합니다.
- 지시문을 사용할 모듈의 선언 배열에 추가합니다. 이렇게 하면 Angular이 해당 모듈에서 지시문을 사용할 수 있도록 합니다.

다음은 요소의 배경색을 변경하는 간단한 사용자 정의 지시문 예제입니다:

<div class="content-ad"></div>

```js
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}
```

이 예제에서 HighlightDirective는 요소의 배경색을 초기화할 때 노란색으로 설정하고 삭제될 때 배경색을 제거합니다. ElementRef 및 Renderer2 클래스는 DOM에서 요소에 액세스하고 조작하는 데 사용됩니다. 이 디렉티브를 템플릿에서 사용하려면 요소에 appHighlight 속성을 추가하면 됩니다:

```js
  <p apphighlight>
   이 텍스트는 새로운 노란색 배경이 생성됩니다.
  </p>
```

템플릿을 렌더링하면 HighlightDirective가 요소에 적용되어 배경색이 노란색으로 변경됩니다.

<div class="content-ad"></div>

2. Angular의 보안 기능은 무엇인가요?

Angular에는 안전한 웹 애플리케이션을 구축하는 데 도움이 되는 여러 가지 보안 기능과 모범 사례가 제공됩니다. 아래는 Angular의 주요 보안 기능 중 일부와 예시입니다:

- 템플릿 살균화(Template Sanitization):

Angular는 템플릿에서 제공된 사용자 입력을 자동으로 살균화하여 크로스 사이트 스크립팅(XSS) 공격을 방지합니다. 예를 들어, 다음과 같은 템플릿을 고려해보세요:

<div class="content-ad"></div>


{ 사용자.이름 }


만약 `user.name` 속성에 위험한 HTML 코드가 포함되어 있다면, Angular은 자동으로 이를 치환하여 일반 텍스트로 렌더링하여 스크립트 실행을 방지합니다.

- `믿을 수 없는 값을 살균화하기 위한 코드를 추가해야 합니다. 보안 컨텍스트는 HTML(바인딩된 inner HTML), style(CSS), attributes(값 바인딩), 그리고 resources(파일 참조)입니다. 사용자가 제공한 믿을 수 없는 값을 DomSanitizer로 신뢰할 수 있는 값으로 변환해야 합니다.

```javascript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class SecurityService {
    constructor(private sanitizer: DomSanitizer) {
    }
    getSafeHtml(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
```

<div class="content-ad"></div>

아래 메서드는 값의 유형에 따라 값을 신뢰할 수 있는 것으로 표시하는 데 사용됩니다:

- bypassSecurityTrustScript
- bypassSecurityTrustStyle
- bypassSecurityTrustUrl
- bypassSecurityTrustResourceUrl

2. Cross-Site Scripting (XSS) Protection:

Angular는 기본적으로 XSS(크로스 사이트 스크립팅) 공격을 방지하기 위해 보간된 값과 데이터 바인딩을 자동으로 이스케이프합니다. 예를 들어, 다음 템플릿을 고려해보세요:

<div class="content-ad"></div>



{ user.bio }  


만약 `user.bio` 속성에 스크립트 태그나 다른 HTML 코드가 포함되어 있다면 Angular는 문자를 이스케이핑하여 일반 텍스트로 렌더링하여 스크립트 실행을 방지합니다.

3. 컨텐츠 보안 정책(CSP) 지원:

Angular를 사용하면 애플리케이션에 엄격한 컨텐츠 보안 정책을 적용할 수 있습니다. 이를 통해 애플리케이션이 리소스를로드 할 수 있는 소스를 정의하여 XSS 공격으로부터 보호할 수 있습니다. 예를 들어, 다음과 같이 HTML 헤더에 CSP를 구성할 수 있습니다:


<div class="content-ad"></div>


메타 태그를 다음과 같이 Markdown 형식으로 변경하였습니다:

```js
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted-cdn.com;">
```

이 예시는 스크립트 로딩을 동일 출처와 신뢰할 수 있는 CDN으로 제한합니다.

4. HTTP Interceptors:

Angular의 HttpClient 모듈은 HTTP 요청과 응답을 수정할 수 있는 인터셉터를 제공합니다. 인터셉터를 사용하여 인증 헤더를 추가하거나 CSRF 토큰을 처리하는 등의 보안 관련 기능을 구현할 수 있습니다. 예를 들어, 모든 외부 요청에 인증 토큰을 추가하는 인터셉터를 만들 수 있습니다:


<div class="content-ad"></div>

```js
   import { Injectable } from '@angular/core';
   import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
   import { Observable } from 'rxjs';

   @Injectable()
   export class AuthInterceptor implements HttpInterceptor {
     intercept(req: HttpRequest, next: HttpHandler): Observable> {
       const token = 'your-auth-token';
       const authReq = req.clone({
         headers: req.headers.set('Authorization', `Bearer ${token}`)
       });
       return next.handle(authReq);
     }
   }
```

이 인터셉터는 각 나가는 HTTP 요청에 베어러 토큰을 사용하여 `Authorization` 헤더를 추가합니다.

5. 인증 및 권한:

Angular는 인증 및 권한 메커니즘을 구현하기 위한 유연한 프레임워크를 제공합니다. 라우트 가드, 인증 서비스 및 토큰 기반 인증(JWT 등)과 같은 기능을 활용하여 라우트를 안전하게 보호하고 보호된 리소스에 대한 액세스를 제어할 수 있습니다. 다음은 특정 라우트의 액세스를 제한하는 라우트 가드의 예시입니다:


<div class="content-ad"></div>

```js
   import { Injectable } from '@angular/core';
   import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
   import { Observable } from 'rxjs';

   @Injectable()
   export class AuthGuard implements CanActivate {
     constructor(private router: Router) {}

     canActivate(
       route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
     ): Observable | Promise | boolean | UrlTree {
       // 사용자가 인증되었는지 확인하고 보호된 경로에 대한 액세스를 허용하거나 거부합니다.
       const isAuthenticated = ...;

       if (isAuthenticated) {
         return true;
       } else {
         // 로그인 페이지로 리디렉션하거나 액세스 거부 메시지를 표시합니다.
         this.router.navigate(['/login']);
         return false;
       }
     }
   }
```

이 가드는 사용자가 인증되었는지 확인하고 그에 따라 보호된 경로에 대한 액세스를 허용하거나 거부합니다.

6. 위험한 Angular API 피하기

문서에서 "보안 위험"으로 표시된 Angular API를 피하십시오. 저희가 자주 사용하는 위험한 API는 ElementRef입니다. 이 API는 DOM에 직접 액세스를 허용하므로 응용 프로그램이 XSS 공격을 당하기 쉽습니다. 코드에서 ElementRef의 사용을 주의 깊게 검토하십시오. DOM에 직접 액세스가 필요할 때에만 이 API를 사용하십시오. Angular이 제공하는 템플릿 및 데이터 바인딩을 사용하십시오. 또한 원시 요소에 직접 액세스가 지원되지 않을 때에도 안전하게 사용할 수 있는 API를 제공하는 Renderer2를 살펴볼 수 있습니다. 이것들은 Angular에서 제공하는 보안 기능의 몇 가지 예입니다. 응용 프로그램의 요구 사항에 따라 입력 유효성 검사, 안전한 통신 프로토콜(HTTPS), 적절한 오류 처리 및 응용 프로그램에서 사용하는 종속성 및 라이브러리에 대한 정기적인 보안 업데이트와 같은 추가 보안 조치를 구현하는 것이 중요합니다.

<div class="content-ad"></div>

3. Angular에서 스토리북이란 무엇인가요?

자세한 설명은 여기를 확인해주세요

4. Angular의 디자인 패턴에는 무엇이 있나요?

웹 애플리케이션을 구축하는 인기있는 JavaScript 프레임워크 인 Angular에서 코드를 구조화하고 조직하는 데 여러 가지 디자인 패턴이 일반적으로 사용됩니다. 이러한 디자인 패턴은 개발자가 유지 관리 가능하고 확장 가능하며 모듈화된 애플리케이션을 작성하는 데 도움을 줍니다. Angular에서 자주 사용되는 일부 디자인 패턴은 다음과 같습니다:

<div class="content-ad"></div>

- 싱글톤 패턴: Angular 서비스는 종종 싱글톤 패턴을 사용하여 구현됩니다. 서비스는 한 번 인스턴스화되고 여러 컴포넌트 간에 공유되어 통신하고 데이터를 공유할 수 있습니다.

Angular에서 싱글톤 패턴을 구현하려면 다음 단계를 따를 수 있습니다:

a. Angular CLI를 사용하여 서비스 생성:

```js
ng generate service MySingletonService
```

<div class="content-ad"></div>

b. 앵귤러에서 하나의 서비스를 만드는 두 가지 방법이 있습니다.

- `providedIn` 속성 사용

- `NgModule` providers 배열 사용

c. 생성된 서비스 파일(`my-singleton-service.service.ts`)을 열고 다음과 같이 수정하십시오:

<div class="content-ad"></div>

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MySingletonService {
  // 여기에 서비스 구현이 들어갑니다
}
```

d. `providedIn: 'root'` 속성은 `@Injectable` 데코레이터 안에서 Singleton 패턴을 구현하는 데 중요합니다. 이것은 Angular에게 서비스를 Root 레벨에서 제공하도록 지시하여 응용 프로그램 전체에서 접근 가능하게 만듭니다.

e. 이제 `MySingletonService`를 컴포넌트에 주입하여 사용할 수 있습니다:

```js
import { Component } from '@angular/core';
import { MySingletonService } from './my-singleton-service.service';

@Component({
  selector: 'app-my-component',
  template: '...'
})
export class MyComponent {
  constructor(private mySingletonService: MySingletonService) {
    // 여기서 공유 서비스 인스턴스에 액세스할 수 있습니다
  }
}
```

<div class="content-ad"></div>

`MySingletonService`를 여러 컴포넌트에 주입하면 응용 프로그램 전체에서 서비스의 동일한 인스턴스에 액세스하게 되므로 데이터 일관성과 공유가 보장됩니다. Singleton 서비스의 라이프사이클은 Angular 자체가 관리한다는 점이 중요합니다. Angular은 서비스의 단일 인스턴스를 생성하고 유지하여 요청한 컴포넌트 간에 공유합니다. NgModule 제공자 배열의 경우, 서비스를 제공자 배열에 값으로 전달하여 싱글톤 서비스를 생성하고, NgModule이 루트 앱 모듈인 경우 서비스는 응용 프로그램 전체에서 싱글톤 서비스로 사용할 수 있습니다.

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MySingletonService } from './my-singleton-service.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [MySingletonService], // 서비스를 여기에 추가하세요
  bootstrap: [AppComponent]
})
export class AppModule { }
```

이렇게하면 Angular에서 서비스를 사용하여 Singleton 패턴을 구현할 수 있습니다. 이를 통해 데이터를 공유하고 상태를 유지하며 응용 프로그램 전체에서 중앙화된 기능을 제공할 수 있습니다.

2. 의존성 주입(Dependency Injection, DI) 패턴: Angular은 컴포넌트와 서비스 간의 종속성을 관리하기 위해 DI 패턴을 활용합니다. DI를 사용하면 필요한 종속성이 생성자 주입 또는 속성 주입을 통해 컴포넌트나 서비스에 제공되어 느슨하게 결합되고 테스트할 수 있습니다.

<div class="content-ad"></div>

```js
// DI를 사용하는 컴포넌트
constructor(private productService: ProductService) {
  // productService를 사용합니다.
}
```

3. 옵저버 패턴: Angular은 EventEmitter 클래스와 RxJS 라이브러리를 통해 옵저버 패턴을 활용합니다. 컴포넌트는 EventEmitters를 사용하여 이벤트를 발생시킬 수 있고, 다른 컴포넌트는 이러한 이벤트에 구독하여 적절하게 반응할 수 있습니다.

```js
// 이벤트를 발생시키는 컴포넌트
@Output() productSelected = new EventEmitter();

selectProduct(product: Product) {
  this.productSelected.emit(product);
}

// 이벤트를 구독하는 컴포넌트
```

4. 전략 패턴: 전략 패턴을 사용하면 런타임 중에 특정 조건이나 요구 사항에 따라 동적으로 다른 전략을 선택하고 전환할 수 있습니다. 이러한 행위를 별도의 클래스로 캡슐화함으로써 컴포넌트는 특정 조건에 따라 전략을 전환할 수 있습니다.


<div class="content-ad"></div>

Angular에서 전략 패턴을 구현하는 예제를 보여드리겠습니다:

a. 전략들의 공통 동작을 나타내는 인터페이스를 정의합니다. 지불 처리 시나리오를 가정해보겠습니다:

```js
// payment-strategy.interface.ts
export interface PaymentStrategy {
  processPayment(amount: number): void;
}
```

b. `PaymentStrategy` 인터페이스를 구현하는 별도의 클래스를 생성하여 다중 전략을 구현합니다. 각 클래스는 `processPayment` 메서드의 고유한 구현을 제공할 것입니다:

<div class="content-ad"></div>

```js
// credit-card-strategy.ts
export class CreditCardStrategy implements PaymentStrategy {
  processPayment(amount: number): void {
    console.log(`$${amount} 크레딧 카드 결제 처리 중입니다.`);
    // 여기에 크레딧 카드 결제 처리 로직 수행
  }
}

// paypal-strategy.ts
export class PaypalStrategy implements PaymentStrategy {
  processPayment(amount: number): void {
    console.log(`$${amount} PayPal 결제 처리 중입니다.`);
    // 여기에 PayPal 결제 처리 로직 수행
  }
}
```

c. 전략을 사용하고 활성 전략을 설정할 메서드를 제공하는 컨텍스트 클래스를 만듭니다.

```js
// payment-context.ts
import { PaymentStrategy } from './payment-strategy.interface';

export class PaymentContext {
  private strategy: PaymentStrategy;

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  processPayment(amount: number): void {
    this.strategy.processPayment(amount);
  }
}
```

d. 이제 Angular 컴포넌트나 서비스에서 전략을 활용할 수 있습니다. 예:  

<div class="content-ad"></div>

```javascript
import { Component } from '@angular/core';
import { PaymentContext } from './payment-context';
import { CreditCardStrategy } from './credit-card-strategy';
import { PaypalStrategy } from './paypal-strategy';

@Component({
  selector: 'app-payment-component',
  template: '...',
})
export class PaymentComponent {
  constructor(private paymentContext: PaymentContext) {}

  processCreditCardPayment(amount: number): void {
    this.paymentContext.setStrategy(new CreditCardStrategy());
    this.paymentContext.processPayment(amount);
  }

  processPaypalPayment(amount: number): void {
    this.paymentContext.setStrategy(new PaypalStrategy());
    this.paymentContext.processPayment(amount);
  }
}
```

이 예에서 `PaymentComponent`는 사용자 조작이나 조건에 따라 `CreditCardStrategy` 및 `PaypalStrategy`와 같은 다양한 결제 전략을 전환하는 데 `PaymentContext`를 사용합니다. `setStrategy`를 통해 활성 전략을 설정함으로써 `processPayment` 내에서 결제 처리 로직의 동적 변경이 가능합니다. 이 구현은 `PaymentStrategy` 인터페이스를 구현하여 새로운 전략을 추가하고 `PaymentComponent` 또는 결제 처리 기능이 필요한 다른 component에서 서로 교환 가능하도록 함으로써 쉬운 확장성을 제공합니다. 전략 패턴은 다른 알고리즘이나 동작의 구현을 클라이언트 코드에서 분리함으로써 유연성과 유지보수성을 제공하며 기존 코드를 수정하지 않고 전략을 변경하거나 확장할 수 있도록 합니다.

5. 데코레이터 패턴: Angular 데코레이터인 @Component 및 @Injectable과 같은 것들은 데코레이터 패턴을 기반으로 합니다. 데코레이터는 기본 코드를 직접 수정하지 않고 클래스나 클래스 멤버의 동작을 향상하거나 수정하는 방법을 제공합니다.

a. 핵심 기능을 나타내는 기본 컴포넌트를 만드세요:


<div class="content-ad"></div>

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-base-component',
  template: 'Base Component',
})
export class BaseComponent {}
```

b. 베이스 컴포넌트를 확장하는 데코레이터 컴포넌트를 생성하세요:

```js
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from './base-component';

@Component({
  selector: 'app-decorator',
  template: `
    <div>
      <p>This is the decorator component</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class DecoratorComponent extends BaseComponent {}
```

이 예시에서 `DecoratorComponent`는 `BaseComponent`의 기능을 확장한 자식 컴포넌트입니다. 해당 컴포넌트는 `BaseComponent`를 감싸고 `ng-content`를 사용하여 추가적인 콘텐츠를 넣습니다. 이를 통해 베이스 컴포넌트 주변에 추가적인 동작이나 템플릿 콘텐츠를 삽입할 수 있습니다.

<div class="content-ad"></div>

c. 애플리케이션에서 데코레이터 컴포넌트를 사용해보세요:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-decorator>
      <app-base-component></app-base-component>
    </app-decorator>
  `,
})
export class AppComponent {}
```

`AppComponent` 템플릿에서 `BaseComponent`가 `DecoratorComponent` 내에서 그 선택자인 ``app-decorator``로 감싸져 있습니다. `DecoratorComponent` 내에 다른 컴포넌트, 템플릿 또는 HTML 콘텐츠를 삽입하여 `BaseComponent`의 동작을 확장하거나 수정할 수 있습니다. Angular에서 데코레이터 패턴을 사용하면 기존 컴포넌트의 기능을 동적으로 확장하거나 수정할 수 있게 되며, 이를 통해 데코레이터 컴포넌트 내에 기존 컴포넌트를 감싸는 방식으로 코드의 유연성, 재사용성, 유지보수성을 제공합니다.

6. Facade Pattern: Facade 패턴은 구조적 디자인 패턴으로, 복잡한 서브시스템에 대한 단순화된 인터페이스를 제공하여 사용 및 이해를 용이하게 하는 패턴입니다. Angular에서 Facade 패턴을 적용하여 여러 컴포넌트, 서비스 또는 모듈과의 상호 작용의 복잡성을 캡슐화한 간소화된 API 또는 서비스를 생성할 수 있습니다.

<div class="content-ad"></div>

아래는 Angular에서 Facade 패턴을 구현하는 예시입니다:

a. 간단하게 만들고자 하는 복잡한 서브시스템이나 관련된 컴포넌트/서비스 집합을 식별합니다.

b. 복잡한 서브시스템과의 상호작용을 캡슐화하는 Facade 서비스를 만듭니다. Facade 서비스는 클라이언트가 서브시스템의 기능에 간단하게 접근할 수 있도록 단순화된 인터페이스를 제공합니다.

```typescript
import { Injectable } from '@angular/core';
import { ComplexServiceA } from './complex-service-a';
import { ComplexServiceB } from './complex-service-b';

@Injectable()
export class FacadeService {
  constructor(private serviceA: ComplexServiceA, private serviceB: ComplexServiceB) {}

  // 내부적으로 적절한 복잡한 서브시스템 메서드를 호출하는 간단화된 메서드를 제공합니다.
  performOperation(): void {
    this.serviceA.complexOperationA();
    this.serviceB.complexOperationB();
  }
}
```

<div class="content-ad"></div>

c. Facade 서비스와 상호 작용하는 복잡한 서브시스템 구성 요소/서비스를 구현하세요. 이러한 요소/서비스는 실제 복잡한 로직을 처리합니다.

```js
@Injectable()
export class ComplexServiceA {
  complexOperationA(): void {
    // 복잡한 서비스 A의 로직
    console.log('복잡한 작업 A 수행 중');
  }
}

@Injectable()
export class ComplexServiceB {
  complexOperationB(): void {
    // 복잡한 서비스 B의 로직
    console.log('복잡한 작업 B 수행 중');
  }
}
```

d. 당신의 컴포넌트에서 Facade 서비스를 사용하여 복잡한 서브시스템의 사용을 간편화하세요:

```js
import { Component } from '@angular/core';
import { FacadeService } from './facade.service';

@Component({
  selector: 'app-client-component',
  template: '...',
})
export class ClientComponent {
  constructor(private facadeService: FacadeService) {}

  performFacadeOperation(): void {
    this.facadeService.performOperation();
  }
}
```

<div class="content-ad"></div>

이 예시에서 `ClientComponent`는 `FacadeService`를 활용하여 복잡한 작업을 수행하는데 있어 복잡한 서브시스템 (`ComplexServiceA` 및 `ComplexServiceB`)과 직접 상호작용할 필요없이 작업을 수행합니다. `FacadeService`는 복잡도를 캡슐화하고 클라이언트 구성 요소가 상호작용할 간단한 인터페이스를 제공합니다. Angular에서 Facade 패턴을 사용함으로써 복합 서브시스템의 사용을 간단화하고 구현 세부 정보를 숨기며 클라이언트에게 직관적이고 사용하기 쉬운 인터페이스를 제공할 수 있습니다. 이는 단일 퍼사드 뒤에 여러 구성 요소 또는 서비스와 상호작용하는 복잡성을 추상화하여 코드 유지 관리, 가독성 및 모듈성을 증진시킵니다.

복합 패턴: 복합 디자인 패턴은 객체를 트리 구조로 조합하는 데 사용되는 구조적 디자인 패턴입니다. 구성 요소는 다른 구성 요소로 구성될 수 있으며, 트리 구조를 형성합니다. 이 패턴을 사용하면 재사용 가능하고 계층적인 UI 구성 요소를 만들 수 있습니다. Angular에서는 복합 패턴을 적용하여 구성 요소 또는 서비스 간의 계층적인 관계를 표현할 수 있습니다.

Angular에서 복합 패턴을 구현하는 예시는 다음과 같습니다:

- 개별 객체와 그룹을 대표하는 공통 동작을 나타내는 추상 클래스 또는 인터페이스를 생성하세요:

<div class="content-ad"></div>

```js
// component.interface.ts
export interface ComponentInterface {
  operation(): void;
}
```

b. 개별 객체에 대한 추상 클래스 또는 인터페이스를 구현하세요:

```js
// leaf.component.ts
import { ComponentInterface } from './component.interface';

export class LeafComponent implements ComponentInterface {
  operation(): void {
    console.log('잎 구성 요소에서 작업 수행 중입니다.');
  }
}
```

c. 개별 객체와 다른 복합 객체를 모두 포함할 수있는 복합 객체에 대한 추상 클래스 또는 인터페이스를 구현하세요:

<div class="content-ad"></div>

```js
// composite.component.ts
import { ComponentInterface } from './component.interface';

export class CompositeComponent implements ComponentInterface {
  private children: Component[] = [];

  add(component: ComponentInterface): void {
    this.children.push(component);
  }

  remove(component: ComponentInterface): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  operation(): void {
    console.log('Composite 구성 요소에서 작업을 수행합니다.');
    for (const child of this.children) {
      child.operation();
    }
  }
}
```

d. Composite 객체를 사용하여 구성 요소의 트리 구조를 생성합니다:

```js
import { ComponentInterface } from './component.interface';
import { LeafComponent } from './leaf.component';
import { CompositeComponent } from './composite.component';

// Leaf 구성 요소 생성
const leaf1: ComponentInterface = new LeafComponent();
const leaf2: ComponentInterface = new LeafComponent();

// Composite 구성 요소 생성
const composite: ComponentInterface = new CompositeComponent();
composite.add(leaf1);
composite.add(leaf2);

// 또 다른 Composite 구성 요소 생성
const composite2: ComponentInterface = new CompositeComponent();
composite2.add(composite);
composite2.add(leaf1);

// Composite 구조에 대해 작업 수행
composite2.operation();
```

e. 이 예제에서 Composite 패턴을 사용하여 트리 구조를 만듭니다. `CompositeComponent`는 개별 `LeafComponent` 객체와 다른 `CompositeComponent` 객체를 모두 포함할 수 있습니다. 최상위 `CompositeComponent`에서 `operation()` 메서드를 호출하면 자식인 leaf 구성 요소든 다른 composite 구성 요소든 모두 재귀적으로 작업을 수행합니다. Angular에서 Composite 패턴을 사용하면 구성 요소나 서비스 사이의 복잡한 계층적 관계를 일관된 방식으로 표현할 수 있습니다. 이를 통해 개별 객체와 객체 그룹을 일관된 방식으로 다루며 코드를 간소화하고 Composite 구조에 재귀적 작업을 수행할 수 있게 됩니다.


<div class="content-ad"></div>

8. 팩토리 패턴: 팩토리 패턴은 객체를 생성하는 인터페이스를 제공하면서 생성될 객체의 정확한 클래스를 지정하지 않고 객체를 생성하는 생성 디자인 패턴입니다. Angular에서는 Factory 패턴을 적용하여 객체 생성 로직을 캡슐화하고 서로 다른 클래스의 인스턴스를 생성하는 중앙 집중식 장소를 제공할 수 있습니다.

다음은 Angular에서 Factory 패턴을 구현하는 예시입니다:

a. 원하는 객체의 공통 동작을 나타내는 추상 클래스나 인터페이스를 정의하세요:

```js
// product.interface.ts
export interface Product {
  operation(): void;
}
```

<div class="content-ad"></div>

b. `Product` 인터페이스를 준수하는 여러 클래스를 구현하세요:

```js
// product-a.ts
export class ProductA implements Product {
  operation(): void {
    console.log('Product A operation.');
  }
}

// product-b.ts
export class ProductB implements Product {
  operation(): void {
    console.log('Product B operation.');
  }
}
```

c. 객체 생성 로직을 캡슐화하는 팩토리 클래스를 생성하세요:

```js
// product-factory.ts
import { Product } from './product.interface';
import { ProductA } from './product-a';
import { ProductB } from './product-b';

export class ProductFactory {
  createProduct(type: string): Product {
    if (type === 'A') {
      return new ProductA();
    } else if (type === 'B') {
      return new ProductB();
    }

    throw new Error('잘못된 제품 유형');
  }
}
```

<div class="content-ad"></div>

d. 원하는 제품의 인스턴스를 생성하기 위해 팩토리 클래스를 사용하세요:

```js
import { Component } from '@angular/core';
import { ProductFactory } from './product-factory';
import { Product } from './product.interface';

@Component({
  selector: 'app-example',
  template: '...',
})
export class ExampleComponent {
  constructor(private productFactory: ProductFactory) {}

  createProduct(type: string): void {
    const product: Product = this.productFactory.createProduct(type);
    product.operation();
  }
}
```

e. 이 예제에서 `ExampleComponent`는 제공된 유형에 기반하여 다른 제품의 인스턴스를 생성하기 위해 `ProductFactory`를 사용합니다. 원하는 유형('A' 또는 'B')으로 `createProduct` 메서드를 호출하면 해당 제품 클래스의 인스턴스를 받고 `operation()` 메서드를 호출할 수 있습니다. Angular에서 Factory 패턴을 사용하면 객체를 생성하는 중앙 집중적인 장소를 제공하며, 클라이언트 코드를 구체적인 클래스에서 분리시킵니다. 이를 통해 유연한 객체 생성이 가능하고 새로운 제품 클래스를 추가하고 팩토리 로직을 업데이트하여 쉽게 확장할 수 있습니다. 이러한 디자인 패턴은 Angular에서 흔히 사용됩니다. 그러나 Angular 자체는 컴포넌트가 컨트롤러로 작동하고 템플릿이 뷰를 나타내며 서비스가 모델로 작동하는 MVC(Model-View-Controller) 아키텍처 패턴을 따른다는 점을 유의해야 합니다.

5. Angular에서 인터셉터란 무엇인가요?

<div class="content-ad"></div>

앵귤러에서 인터셉터는 HTTP 요청과 응답을 가로채고 조작할 수 있는 클래스입니다. 이들은 서버로 보내기 전에 전역적으로 HTTP 요청을 수정하거나 호출 코드로 전달되기 전에 HTTP 응답을 수정하는 방법을 제공합니다. 인터셉터는 인증 헤더 추가, 로깅, 오류 처리, 캐싱 등과 같은 작업에 유용합니다. 앵귤러에서 인터셉터를 생성하려면 HttpInterceptor 인터페이스를 구현하고 요청과 응답을 가로채는 논리를 정의해야 합니다.

다음은 발신 요청에 인가 헤더를 추가하는 HTTP 인터셉터 예시입니다:

- 인터셉터 클래스 생성:

```typescript
// auth-interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest,
    next: HttpHandler
  ): Observable> {
    // 요청에 인가 헤더 추가
    const authToken = '여기에_인증_토큰_입력';
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    // 수정된 요청을 다음 인터셉터나 HTTP 핸들러로 전달
    return next.handle(authRequest);
  }
}
```

<div class="content-ad"></div>

2. 인터셉터 등록하기:

인터셉터를 사용하려면 AppModule 또는 HTTP 요청이 이루어지는 모듈에서 이를 제공해야 합니다.

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {}
```

이 예제에서는 AuthInterceptor를 HTTP_INTERCEPTORS 다중 제공자 토큰의 제공자로 등록합니다. `multi: true` 옵션은 이 인터셉터가 여러 개 중 하나일 수 있음을 나타냅니다. 왜냐하면 여러 인터셉터가 제공될 수 있기 때문이죠.

<div class="content-ad"></div>

이제 응용 프로그램에서 HTTP 요청이 수행될 때마다 AuthInterceptor가 요청을 가로채서 권한 부여 헤더를 추가하고 해당 요청을 다음 인터셉터나 실제 HTTP 핸들러로 전달합니다. 이렇게 하면 일반적인 HTTP 요청 관련 작업을 중앙 집중화하고 코드를 깔끔하고 유지보수 가능하게 유지할 수 있습니다.

6. Angular에서 사용자 정의 데코레이터를 생성하는 방법

데코레이터는 클래스의 수정 또는 장식을 원본 소스 코드를 수정하지 않고 분리하는 데 사용되는 디자인 패턴입니다. Angular에서 데코레이터는 함수로, 서비스, 지시자 또는 필터를 사용하기 전에 수정할 수 있게 합니다.

데코레이터 생성:

<div class="content-ad"></div>

해당 테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

이를 수행하기 위해 forkJoin을 사용할 수 있습니다. 이 operator는 observables 배열을 가져와 모든 소스 observables이 완료될 때까지 기다립니다. 그들이 모두 완료되면, 각 observable에서 마지막으로 방출된 값의 배열을 방출합니다.

예시:

```js
import { forkJoin, of, throwError } from 'rxjs';

 const observables = [
     of(1,2,3).pipe(delay(500)),
    from([10,11,12])
  ]

  const $forkJoin = forkJoin(observables);

  $forkJoin.subscribe(data=>{
    console.log('forkjoin data', data); // [3,12]로 출력됩니다. forkJoin은 각 observable의 마지막으로 방출된 값들을 반환합니다.
  })
```

이 예시에서, `forkJoin`은 'A'와 'B'를 각각 지연 시간 후에 방출하는 두 observables과 일정 시간 후에 오류를 던지는 observable을 포함하는 observables 배열을 가지고 있습니다. `forkJoin`은 모든 observables이 완료될 때까지 기다리고, 그들이 완료되면, 각 observable에서 마지막으로 방출된 값의 배열을 방출합니다. 다만, `forkJoin`의 observables 중 하나가 오류를 던지면, 해당 오류는 `subscribe` 메서드의 오류 콜백으로 전파됩니다.

<div class="content-ad"></div>

TypeScript에서 모듈이란 무엇이며 어떻게 사용할 수 있을까요?

TypeScript에서 모듈은 응용 프로그램의 다른 부분 간에 가져오고 내보낼 수 있는 재사용 가능한, 독립적인 코드 단위로 코드를 구성하는 방법입니다. 모듈에는 클래스, 함수, 인터페이스 및 기타 코드가 포함될 수 있으며, 프로젝트 내부 또는 외부 라이브러리에 속할 수 있습니다.

TypeScript에서 모듈을 사용하려면 해당 모듈을 `export` 키워드를 사용하여 정의해야 합니다. 이렇게 하면 해당 모듈의 멤버를 응용 프로그램의 다른 부분에서 사용할 수 있게 됩니다. 그런 다음 `import` 키워드를 사용하여 모듈을 가져와 코드에서 해당 멤버를 사용할 수 있습니다.

다음은 TypeScript에서 모듈을 정의하고 사용하는 예시입니다:

<div class="content-ad"></div>

```typescript
// myModule.ts
export function myFunction() {
  // 코드를 입력하세요
}

export class MyClass {
  // 코드를 입력하세요
}
```

이 예시에서는 `myFunction`이라는 함수와 `MyClass`라는 클래스를 내보내는 `myModule` 모듈을 정의했습니다. `export` 키워드를 사용하여 이러한 멤버들을 모듈 외부에서 사용할 수 있게 만듭니다.

다른 파일에서 `myModule` 모듈의 멤버들을 사용하려면 `import` 키워드를 사용하여 해당 멤버들을 가져올 수 있습니다:

```typescript
// main.ts
import { myFunction, MyClass } from "./myModule";

myFunction();
const myInstance = new MyClass();
```

<div class="content-ad"></div>

이 예제에서는 구조 분해를 사용하여 `myModule` 모듈에서 `myFunction` 함수와 `MyClass` 클래스를 가져옵니다.
그렇게 하면 가져온 이름을 사용하여 `myFunction` 함수를 호출하고 `MyClass` 클래스의 인스턴스를 생성할 수 있습니다.

TypeScript에서 모듈을 가져오고 내보내는 다양한 방법이 있습니다.
예를 들어 `* as` 구문을 사용하여 모든 멤버를 가져오거나 기본 내보내기를 가져오거나 가져온 멤버에 별칭을 사용할 수 있습니다.
프로젝트의 규모와 복잡성에 따라 다른 구문들과 그 영향을 이해하는 것이 중요합니다.

모듈을 사용하면 TypeScript에서 더 모듈식이고 유지보수가 용이한 코드를 작성할 수 있습니다.
기능을 격리시키고 명명 충돌을 줄이는 방식으로 도움이 됩니다.
그러나 너무 많은 작은 모듈을 만들지 않도록 주의하고 코드베이스의 복잡성을 증가시키지 않도록 해야 합니다.

9. 애플리케이션 컴포넌트를 로드하기 전에 API를 호출하는 방법은 무엇인가요?

<div class="content-ad"></div>

@angular/router 패키지에는 라우트를 위한 Resolve 속성이 있습니다. 그래서 라우트 뷰를 렌더링하기 전에 데이터를 쉽게 해결할 수 있습니다. 다음 예제는 요청된 라우트를 활성화하기 위해 필요한 데이터를 검색하는 resolve() 메서드를 구현한 것입니다.

```js
@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve {
  constructor(private service: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable|Promise|any {
    return this.service.getHero(route.paramMap.get('id'));
  }
}
```

여기서 정의된 resolve() 함수는 라우터 구성에서 Route 객체의 일부로 제공됩니다.

```js
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroDetailComponent,
        resolve: {
          hero: HeroResolver
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

<div class="content-ad"></div>

만약 NPM을 통해 사용할 수 없는 패키지(또는 라이브러리)가 있다면, 어떻게 앵귤러 애플리케이션에서 사용하시겠어요?

NPM 패키지가 없는 경우에는 파일을 다운로드하여 프로젝트 어딘가에 넣어야 합니다. vendor 또는 lib이라는 디렉토리에 넣는 것을 추천합니다. import 문은 사용하려는 모듈에 대한 상대경로를 사용할 수 있으므로 간단합니다. 예를 들어, 서드 파티 모듈을 vendor/some-lib.js에 넣었다면 다음과 같이 import할 수 있습니다:

예시 코드

```js
// src/foo.js
import './../vendor/some-lib';
```

좀 더 고급스럽게 사용하려면 webpack 구성에서 resolve.alias를 사용하여 상대 경로를 계산할 필요가 없도록 할 수 있습니다.

```js
// webpack.config.js
const path = require('path');

// ...
resolve: {
  alias: {
    vendor: path.resolve(__dirname, 'vendor')
  }
},

// src/foo.js
import 'vendor/some-lib';
```

<div class="content-ad"></div>

11. 온푸시(change detection) 변경 감지 전략을 사용하여 Angular 애플리케이션을 최적화하는 방법

Angular에서 `OnPush` 변경 감지 전략은 변경 감지 주기의 수를 줄여 성능을 최적화하는 데 설계되었습니다. 이는 불변성 개념에 기반을 두고 입력 속성 및 명시적 변경 감지 트리거링을 사용합니다.

## `OnPush` 전략을 사용하여 Angular 애플리케이션을 최적화하는 방법은 다음과 같습니다:

가정해보죠. `ParentComponent`라는 부모 컴포넌트와 `ChildComponent`라는 자식 컴포넌트가 있다고 합시다. 자식 컴포넌트는 항목 배열을 입력 속성으로 받아와 목록에서 이를 표시합니다. 이 시나리오를 `OnPush` 전략을 사용하여 최적화해 보겠습니다.

<div class="content-ad"></div>

- 컴포넌트에서 `OnPush` 변경 감지 전략을 사용하세요:

```js
// parent.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [items]="items"></app-child>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  addItem() {
    this.items.push('New Item'); // 배열을 업데이트하는 잘못된 방법
  }
}
```

```js
// child.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <ul>
      <li *ngfor="let item of items">{ item }</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() items: string[];
}
```

위 코드에서 `ParentComponent`와 `ChildComponent`는 둘 다 `OnPush` 변경 감지 전략을 사용하고 있습니다.

<div class="content-ad"></div>

2. 입력 속성에 불변 데이터를 사용하세요:

```js
// parent.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [items]="items"></app-child>
    <button (click)="addItem()">Add Item</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  addItem() {
    this.items = [...this.items, 'New Item']; // 스프레드 연산자를 사용하여 배열을 업데이트하는 올바른 방법
  }
}
```

`ParentComponent`에서 새로운 항목을 `items` 배열에 추가할 때는 스프레드 연산자인 `…[this.items]`를 사용하여 새로운 배열을 생성한 후 새 항목을 추가합니다. 이렇게 하면 새로운 참조가 생성되어, 입력 속성이 변경되었을 때 `ChildComponent`에서 변화 감지가 트리거됩니다.

결론:

<div class="content-ad"></div>

이 최적화 기법을 적용하면 `OnPush` 변경 감지 전략을 사용하여 Angular 애플리케이션의 성능을 향상시킬 수 있습니다. 불변 데이터를 사용하면 불필요한 변경 감지 주기를 최소화하고 효율성과 반응성을 향상시킬 수 있습니다.

12. Angular에서 사용 가능한 폼 유형은 무엇이 있나요? 구문을 사용하여 설명해주세요.

Angular에서는 사용자 입력 처리와 유효성 검사를 위한 다양한 종류의 폼이 있습니다. Angular의 주요 두 가지 폼 유형은 템플릿 기반 폼과 반응형 폼입니다.

- 템플릿 기반 폼: — 템플릿 기반 폼은 주로 Angular 지시문을 사용하여 컴포넌트의 HTML 템플릿 내에서 정의됩니다. — 폼 컨트롤 및 유효성 검사 규칙은 템플릿에서 추론되며, 컴포넌트 코드에서 명시적인 폼 컨트롤 선언이 필요하지 않습니다. — 템플릿 기반 폼은 기본적인 유효성 검사 요구사항이 있는 간단한 폼에 적합합니다.

<div class="content-ad"></div>

아래 예시 코드에서 `ngForm`은 전체 양식을 나타내는 지시자입니다. 각 입력 요소는 양방향 데이터 바인딩을 위해 `ngModel` 지시자를 사용하며, 추가적으로 `required` 및 `email`과 같은 유효성 검사를 위한 지시자도 포함되어 있습니다.

2. 반응형 양식: —

<div class="content-ad"></div>

반응형 폼은 TypeScript를 사용하여 컴포넌트 클래스에서 프로그래밍 방식으로 생성됩니다. 폼 컨트롤은 컴포넌트 코드에서 명시적으로 정의되어 있어 더 많은 제어와 유연성을 제공합니다. 반응형 폼은 동적 검증 요구사항과 고급 상호작용을 가진 복잡한 폼에 적합합니다.

문법:

```js
   import { Component, OnInit } from '@angular/core';
   import { FormGroup, FormControl, Validators } from '@angular/forms';

   @Component({
     selector: 'app-my-form',
     template: `
       <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
         <label for="name">Name:</label>
         <input type="text" id="name" formControlName="name">
         
         <label for="email">Email:</label>
         <input type="email" id="email" formControlName="email">
         
         <button type="submit">Submit</button>
       </form>
     `,
   })
   export class MyFormComponent implements OnInit {
     myForm: FormGroup;

     ngOnInit() {
       this.myForm = new FormGroup({
         name: new FormControl('', Validators.required),
         email: new FormControl('', [Validators.required, Validators.email]),
       });
     }

     onSubmit() {
       if (this.myForm.valid) {
         // 폼 제출 처리
       }
     }
   }
```

위 예시에서 `FormGroup`은 전체 폼을 나타내며, `FormControl`은 개별 폼 컨트롤을 나타냅니다. 각 폼 컨트롤에는 유효성 검사 규칙을 정의하기 위해 유효성 검사기가 적용됩니다.

<div class="content-ad"></div>

결론:

앵귤러에서 사용 가능한 주요 형식 유형은 템플릿 기반 형식과 반응형 형식입니다. 폼의 복잡성 및 요구 사항에 따라 앵귤러 응용 프로그램에 적합한 형식 유형을 선택할 수 있습니다.

13. 앵귤러 앱 성능을 향상시키는 방법

앵귤러 앱 성능을 크게 향상시킬 수 있는 몇 가지 중요한 팁입니다:

<div class="content-ad"></div>

- AoT 컴파일을 사용합니다.
- OnPush 변경 감지 전략을 사용합니다.
- 순수 파이프를 사용합니다.
- 옵저버블 구독 해제
- 지연 로딩.
- For 루프에 trackBy 옵션 사용.
- 웹 워커 사용.

14. Angular에서 AuthGuard란 무엇인가요?

Angular에서 Auth Guards는 경로를 보호하고 사용자가 특정 경로에 액세스할 수 있는지 여부를 인증 상태나 사용자 역할에 따라 결정하는 데 사용됩니다. Auth Guards는 서비스로 구현되며 일반적으로 Angular의 라우팅 시스템과 함께 사용됩니다.

다음은 Angular에서 Auth Guards가 작동하는 방식을 설명하는 예시입니다:

<div class="content-ad"></div>

- Auth Guard 서비스를 생성하세요:

```js
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // 사용자의 인증 상태 또는 역할을 확인합니다
    const isAuthenticated = /* 사용자 인증 확인 */;
    const userRole = /* 사용자 역할 가져오기 */;

    if (isAuthenticated && userRole === 'admin') {
      return true;  // 라우트에 액세스 허용
    } else {
      this.router.navigate(['/login']);  // 로그인 페이지 또는 권한 없음 페이지로 리다이렉트
      return false; // 라우트에 액세스 거부
    }
  }
}
```

2. 앱 모듈에서 라우트 정의:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

<div class="content-ad"></div>

이 예시에서는 홈 라우트, 관리자 라우트 및 로그인 라우트가 있습니다. 관리자 라우트는 `AuthGuard`로 보호되어 `canActivate` 속성을 `[AuthGuard]`로 설정합니다.

3. 보호된 컴포넌트 구현하기:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: 'Admin Page'
})
export class AdminComponent { }
```

4. 템플릿이나 컴포넌트에서 Auth Guard 사용하기:

<div class="content-ad"></div>

```js
<!-- 템플릿에서 Auth Guard 사용 예시 -->
<button [routerlink]="['/admin']" *ngif="isAuthenticated">Admin 페이지로 이동</button>

<!-- 컴포넌트에서 Auth Guard 사용 예시 -->
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-some-component',
  template: `
    <button (click)="goToAdmin()" *ngif="isAuthenticated">Admin 페이지로 이동</button>
  `
})
export class SomeComponent {
  isAuthenticated: boolean;

  constructor(private router: Router) {}

  goToAdmin() {
    if (this.isAuthenticated) {
      this.router.navigate(['/admin']);
    }
  }
}
```

위의 두 예시에서는 사용자의 인증 상태에 따라 조건에 따라 관리자 경로를 표시하거나 이동하기 위해 Auth Guard를 사용하고 있습니다. 사용자가 인증되어 있고 적절한 역할(이 경우 'admin')을 가지고 있다면 해당 경로에 액세스할 수 있습니다. 그렇지 않으면 로그인 페이지나 인가되지 않은 페이지로 리디렉션됩니다.

결론:

Auth Guards는 Angular 응용 프로그램의 특정 부분에 대한 액세스를 제어하고 인증 및 권한 규칙에 따라 경로를 보호하는 데 중요한 역할을 합니다. Auth Guards를 구현하고 사용함으로써 특정 경로가 보호되어 인가된 사용자만 액세스할 수 있도록 보장할 수 있습니다.


<div class="content-ad"></div>

15. `switchMap`, `mergeMap`, `forkJoin`, `combineLatest`, `concatMap`, `exhaustMap`을 설명해드릴게요. 만약 `switchMap`, `mergeMap`, 또는 `forkJoin` 중 하나의 요청이 실패한다면 어떻게 될까요?

## 각 오퍼레이터를 설명하고 예제와 함께 설명해볼게요. 그리고 사용할 때 요청 중 하나가 실패하는 경우 `switchMap`, `mergeMap`, 또는 `forkJoin`에 대해 논의할 거에요.

- switchMap: 이 오퍼레이터는 각 소스 값을 내부 observable에 매핑하고, 가장 최근의 내부 observable에서 값만 방출합니다. 이전 내부 observable이 완료되기 전에 새로운 소스 값이 도착하면 새 내부 observable로 전환하고 이전 것을 구독 해지합니다.

예시:

<div class="content-ad"></div>

```js
import { of, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
const $switchMap = from([1,2,3,4]).pipe(switchMap(data=>{
  return of(data).pipe(delay(500))
}));

$switchMap.subscribe(data=>{
  console.log('switch map data', data); // 4 as switchMap cancels all previous observables when new observable is emitted
})
```

이 예제에서 `sourceObservable`은 매 초마다 값을 발행합니다. 각 값이 발행될 때마다, `switchMap`은 `from` 연산자를 사용하여 내부 옵저버블을 만들고 소스 옵저버블의 값을 1초의 지연 후에 발행합니다. 이전 내부 옵저버블이 완료되기 전에 새 값이 발행되면, 새 내부 옵저버블로 전환되어 이전 것이 취소됩니다. 따라서 가장 최근의 내부 옵저버블 값만이 발행됩니다.

2. mergeMap: 이 연산자는 각 소스 값을 내부 옵저버블로 매핑하고 여러 내부 옵저버블에서 값을 단일 옵저버블로 병합합니다. 어떤 내부 옵저버블도 취소되거나 구독이 해지되지 않습니다.

예시:


<div class="content-ad"></div>

```js
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

// 세 개의 값을 방출하는 observable 생성
const sourceObservable = of(1, 2, 3);

// mergeMap을 사용하여 내부 observable의 값 병합
const resultObservable = sourceObservable.pipe(
  mergeMap((value) => {
    // 지연 후 값을 방출하는 내부 observable 생성
    return of(value).pipe(delay(1000));
  })
);

// 결과 observable을 구독
resultObservable.subscribe((value) => {
  console.log(value); // 1 2 3 
});
```

이 예제에서 `sourceObservable`은 1, 2, 3 세 개의 값들을 방출합니다. 각 값이 방출될 때마다 `mergeMap`은 `of` 연산자를 사용하여 내부 observable을 생성하고 1초의 지연 후 해당 값을 방출합니다. `mergeMap`은 내부 observable을 취소하거나 전환하지 않기 때문에 각 내부 observable에서 모든 값이 하나의 observable로 병합되어 완료된 순서대로 방출됩니다.

3. forkJoin: 이 연산자는 observable 배열을 가져와 모든 소스 observable이 완료될 때까지 기다린 후, 각 observable에서 마지막으로 방출된 값의 배열을 방출합니다.

예시:

<div class="content-ad"></div>

```js
import { forkJoin, of, throwError } from 'rxjs';

 const observables = [
     of(1,2,3).pipe(delay(500)),
    from([10,11,12])
  ]

  const $forkJoin = forkJoin(observables);

  $forkJoin.subscribe(data=>{
    console.log('forkjoin data', data); // [3,12] as forkJoin will return last emitted values of each observable
  })
```

이 예제에서 `forkJoin`은 지연 이후에 각각 'A'와 'B'를 방출하는 두 observables와 지연 이후에 오류를 발생시키는 observable을 포함하는 observables 배열을 가져옵니다. `forkJoin`은 모든 observables이 완료될 때까지 기다린 다음, 각 observable에서 마지막으로 방출된 값을 포함하는 배열을 방출합니다. 그러나 `forkJoin`에 있는 observables 중 하나라도 오류를 발생시키면 해당 오류는 `subscribe` 메소드의 오류 콜백으로 전파됩니다.

4. combineLatest: 이 연산자는 여러 observables로부터 최신 값을 결합하여 단일 observable로 만듭니다. 소스 observables 중 하나가 새 값으로 방출될 때마다 최신 값을의 배열을 방출합니다.

예:


<div class="content-ad"></div>

```js
import { combineLatest, interval } from 'rxjs';
const observables = [
  of(1,2,3,4),
  from([10,11,12])
]

const $combineLatest = combineLatest(observables);

$combineLatest.subscribe(data=> {
  console.log('combineLatest data', data);
})
/* output */
// [4, 10]
// [4,11]
// [4,12]
```

만약 아래와 같이 우리의 observable이 있다면 :

```js
const observables = [
  of(1,2,3,4).pipe(delay(500)), 
  from([10,11,12])
]
```

그러면 출력은 다음과 같을 것입니다.

// [12,1]
// [12,2]
// [12,3]
// [12,4]


프로젝트 함수의 console.log() 출력에서 볼 수 있듯이, 첫 번째로 완료된 observable이 방출한 마지막 값은 모든 계산에 사용됩니다. 이 값은 두 번째 observable 값과 결합됩니다. 따라서: 한 Observable이 다른 Observable보다 먼저 값을 방출하면 해당 값들은 손실됩니다.

<div class="content-ad"></div>

5. concatMap: 이 연산자는 각 소스 값마다 내부 observable로 매핑하고 각 내부 observable에서 값을 연속적으로 연결(concatenate)합니다. 각 내부 observable이 완료될 때까지 기다린 후 다음으로 넘어갑니다. 순서가 중요할 때는 mergeMap 대신 concatMap을 사용하세요.

예제:

```js
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

// 세 개의 값을 방출하는 observable 생성
const sourceObservable = of(1, 2, 3);

// concatMap을 사용하여 내부 observables에서 값을 연결(concatenate)
const resultObservable = sourceObservable.pipe(
  concatMap((value) => {
    // 1초 후에 값을 방출하는 내부 observable 생성
    return of(value).pipe(delay(1000));
  })
);

// 결과 observable을 구독
resultObservable.subscribe((value) => {
  console.log(value); // 1  2  3
});
```

이 예제에서 `sourceObservable`은 1, 2, 3 세 개의 값을 방출합니다. 각 값을 방출할 때, `concatMap`은 `of` 연산자를 사용하여 내부 observable을 생성하고 1초의 지연 후 값을 방출합니다. 각 내부 observable이 완료될 때까지 기다린 후 다음으로 넘어갑니다. 따라서 각 내부 observable에서 값은 매핑된 순서대로 연속적으로 방출됩니다.

<div class="content-ad"></div>

6. exhaustMap: exhaustMap 연산자는 각 소스 값마다 observable로 매핑한 다음 해당 observable에 구독하는 방식으로 작동합니다. 오직 하나의 내부 observable만이 활성화되도록 보장합니다. 내부 observable이 아직 활성화된 상태에서 새로운 소스 값이 도착하면 새 값은 내부 observable이 완료될 때까지 무시됩니다.

다음은 Angular에서 exhaustMap 사용법을 설명하는 예제입니다:

```js
 const $exhaustMap = from([1,2,3,4]).pipe(
    exhaustMap(data=>{
      return of(data).pipe(delay(500)); 
    })
  )

  $exhaustMap.subscribe(data=> {
    console.log('exhaustMap data', data); //1
  })
```

`switchMap`, `mergeMap`, 또는 `forkJoin`에서 어떤 요청이 실패하는 경우에 대한 처리 방법에 대해 이야기해 보겠습니다:

<div class="content-ad"></div>

- switchMap: `switchMap`이 생성한 내부 옵저버블 중 하나라도 오류가 발생하면 해당 오류는 `subscribe` 메서드의 오류 콜백으로 전달됩니다. 또한 이전 내부 옵저버블의 구독이 취소되며, `switchMap`은 새로운 내부 옵저버블로 전환됩니다.

- mergeMap: `mergeMap`이 생성한 내부 옵저버블 중 하나라도 오류가 발생하면 해당 오류는 `subscribe` 메서드의 오류 콜백으로 전달됩니다. 그러나 한 내부 옵저버블에서 오류가 발생해도 다른 내부 옵저버블에는 영향을 주지 않습니다. `mergeMap`은 계속해서 다른 내부 옵저버블에서 값을 병합할 것입니다.

- forkJoin: `forkJoin`에 전달된 옵저버블 중 하나라도 오류가 발생하면 해당 오류는 `subscribe` 메서드의 오류 콜백으로 전달됩니다. 이 경우에는 `forkJoin`은 어떠한 결과값도 발행하지 않을 것입니다. `forkJoin`에서 각 옵저버블의 개별 오류를 처리해야 한다면, 해당 오류를 `forkJoin`에 전달하기 전에 각 옵저버블 내에서 `catchError` 연산자를 사용할 수 있습니다.

특정 사용 사례와 코드 내에서 오류 처리 전략 및 동작 방식은 개별적으로 다를 수 있으므로 이를 유의하는 것이 중요합니다.

<div class="content-ad"></div>

16. 의존성 주입이란?

소프트웨어 엔지니어링에서 의존성 주입은 클래스 A의 인스턴스(객체)를 생성하고 이 인스턴스를 클래스 B에 제공하여 클래스 A의 기능을 클래스 B에서 사용할 수 있게 하는 프로세스입니다.

Angular의 경우, 의존성 주입은 서비스의 인스턴스(객체)를 생성하고 이 인스턴스를 컴포넌트에 제공하여 서비스의 기능을 컴포넌트에서 사용할 수 있게 하는 프로세스입니다. 의존성 주입을 구현하는 방법 중 하나는 컴포넌트의 생성자 메서드를 통해 수행하는 것입니다.

17. RxJS 옵저버블에서 발생하는 오류를 어떻게 처리하나요?

<div class="content-ad"></div>

RxJS는 옵저버블에서 발생하는 오류를 처리하는 여러 연산자를 제공합니다. 오류 처리에 대한 두 가지 주요 연산자는 `catchError`와 `retry`입니다.

- catchError: `catchError` 연산자는 옵저버블에서 발생할 수 있는 오류를 잡아내고 공손하게 처리하는 데 사용됩니다. 함수를 인수로 사용하며 해당 함수는 다른 옵저버블을 반환하거나 오류를 throw합니다. 함수가 옵저버블을 반환하면 소스 옵저버블이 반환된 옵저버블로 대체됩니다. 함수가 오류를 throw하면 해당 오류가 구독자에게 전파됩니다.

다음은 예시입니다:

```js
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

of(1, 2, 3).pipe(
  map(num => {
    if (num === 2) {
      throw new Error('Oops!');
    }
    return num;
  }),
  catchError(err => {
    console.error(err.message);
    return of(4, 5, 6);
  })
).subscribe(
  num => console.log(num),
  err => console.error(err),
  () => console.log('Complete')
);
```

<div class="content-ad"></div>

이 예시에서 `map` 연산자는 숫자 2를 만나면 오류를 발생시킵니다. `catchError` 연산자는 이 오류를 잡아서 콘솔에 오류 메시지를 기록합니다. 그런 다음 원본 Observable을 대체하는 새로운 Observable을 만들어 숫자 4, 5 및 6을 방출합니다.

`retry`: `retry` 연산자는 오류가 발생할 때 Observable을 자동으로 다시 시도하는 데 사용됩니다. 최대 재시도 횟수를 지정하는 선택적 인수를 사용할 수 있습니다.

다음은 예제입니다:

```js
import { of } from 'rxjs';
import { map, retry } from 'rxjs/operators';

of(1, 2, 3).pipe(
  map(num => {
    if (num === 2) {
      throw new Error('Oops!');
    }
    return num;
  }),
  retry(2)
).subscribe(
  num => console.log(num),
  err => console.error(err),
  () => console.log('Complete')
);
```

<div class="content-ad"></div>

이 예제에서 `map` 연산자는 숫자 2를 만나면 오류를 발생시킵니다. `retry` 연산자는 오류를 구독자에게 전파하기 전에 Observable을 최대 2회까지 다시 시도합니다.

18. RxJS에서 backpressure를 어떻게 구현하나요?

Backpressure는 반응형 프로그래밍에서 사용되는 메커니즘으로, Observable이 데이터를 발행하는 속도가 데이터를 소비하는 속도보다 빠를 때 발생하는 상황을 처리하는 데 사용됩니다. 이는 고메모리 사용, 처리 속도 저하, 심지어 크래시와 같은 문제로 이어질 수 있습니다. RxJS는 `buffer`, `throttle`, `debounce`, `sample`, `switchMap` 등의 연산자를 제공하여 backpressure를 구현할 수 있습니다.

- buffer: `buffer` 연산자는 소스 Observable에서 발행된 값을 배열에 수집하고 지정된 크기에 도달하면 배열을 발행합니다. 발생된 값을 일시적으로 저장하여 처리될 때까지 대기하는 데 사용됩니다.

<div class="content-ad"></div>

다음은 예입니다:

```js
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

interval(100).pipe(
  bufferTime(1000)
).subscribe(
  values => console.log(values),
  err => console.error(err),
  () => console.log('Complete')
);
```

이 예제에서 `interval` Observable은 매 100밀리초마다 값을 방출합니다. `bufferTime` 연산자는 방출된 값을 배열에 수집하고 1000밀리초마다 배열을 방출합니다.

2. throttle: `throttle` 연산자는 지정된 시간 창에서 발생하는 값을 삭제하여 소스 Observable의 방출을 조절합니다. 소스 Observable에서의 방출 속도를 제한하는 데 사용할 수 있습니다.

<div class="content-ad"></div>

여기 예제가 있어요:

```js
import { interval } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

interval(100).pipe(
  throttleTime(1000)
).subscribe(
  num => console.log(num),
  err => console.error(err),
  () => console.log('Complete')
);
```

이 예제에서 `interval` Observable은 매 100밀리초마다 값 하나를 발행합니다. `throttleTime` 연산자는 이전 값과 1000밀리초 이내에 발생한 값은 무시합니다.

3. debounce: `debounce` 연산자는 소스 Observable에서 값을 발행을 마지막 값으로부터 지정된 시간이 경과할 때까지 지연시킵니다. 이를 사용하여 빠른 값 발행을 걸러내고 마지막 값만을 발행할 수 있습니다.

<div class="content-ad"></div>

여기 예시가 있어요:

```js
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

fromEvent(document, 'keyup').pipe(
  debounceTime(1000)
).subscribe(
  event => console.log(event.target.value),
  err => console.error(err),
  () => console.log('Complete')
);
```

이 예시에서는 `fromEvent` Observable이 문서에서 키가 눌릴 때마다 값을 방출합니다. `debounceTime` 연산자는 마지막 방출 이후 1000밀리초가 경과할 때까지 방출을 지연시킵니다.

4. sample: `sample` 연산자는 원본 Observable에서 지정된 시간 간격마다 가장 최근의 값을 방출합니다. 이를 사용하면 일정한 간격으로 가장 최근의 값을 방출할 수 있으며, 방출되는 값의 개수와 관계없이 가장 최근의 값을 발행할 수 있습니다.

<div class="content-ad"></div>

다음은 예시입니다.

```js
import { interval } from 'rxjs';
import { sampleTime } from 'rxjs/operators';

interval(100).pipe(
  sampleTime(1000)
).subscribe(
  num => console.log(num),
  err => console.error(err),
  () => console.log('완료')
);
```

이 예시에서 `interval` Observable은 100밀리초마다 값이 발생합니다. `sampleTime` 연산자는 1000밀리초 간격으로 가장 최근의 값들을 발생시킵니다.

5. switchMap: `switchMap` 연산자는 소스 Observable에서 동시에 발생하는 값들의 수를 제한하는 데 사용될 수 있습니다.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해보겠습니다.

<div class="content-ad"></div>

19. RxJS에서 스케줄러를 사용하는 목적과 일반적인 스케줄러의 예시를 설명해 드릴까요?

RxJS에서 스케줄러는 옵저버블이 이벤트를 발생시키는 타이밍을 제어하는 객체입니다. 스케줄러는 특정 시간에 작업을 예약하거나 작업의 실행을 지연하며 작업이 실행되는 쓰레드를 지정하는 데 사용될 수 있습니다. 스케줄러를 사용하는 목적은 개발자가 옵저버블의 타이밍과 실행에 대해 더 정교한 제어를 제공하는 것입니다.

RxJS에서 일반적으로 사용되는 스케줄러 중 하나는 `observeOn()` 연산자입니다. `observeOn()` 연산자는 옵저버블이 값을 발생시킬 스케줄러를 지정하는 데 사용됩니다.

다음은 예시입니다:

<div class="content-ad"></div>

```js
import { from } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { asyncScheduler } from 'rxjs';

const source$ = from([1, 2, 3]);

const async$ = source$.pipe(
  observeOn(asyncScheduler) // Emit values on the async scheduler
);

async$.subscribe(
  value => console.log(value), // Output: 1, 2, 3
  err => console.error(err),
  () => console.log('Complete')
);
```

위 예제에서 `from()` 함수를 사용하여 값 1, 2 및 3을 내보내는 옵저버블을 생성합니다. 그런 다음 `observeOn()` 연산자를 사용하여 옵저버블이 비동기 스케줄러에서 값을 내보내도록 지정합니다. `asyncScheduler`는 `setTimeout()`을 사용하여 비동기적으로 실행되는 작업을 예약하는 RxJS의 일반적인 스케줄러입니다.

스케줄러는 작업 실행을 지연시키거나 작업 실행 순서를 제어하거나 작업을 실행해야하는 스레드를 지정하는 데 사용할 수도 있습니다. RxJS에서 일반적으로 사용되는 몇 가지 스케줄러에는 `async`, `queue`, `animationFrame`, `immediate` 등이 있습니다.

20. RxJS에서 파이프 연산자와 패치 연산자의 차이점은 무엇인가요?


<div class="content-ad"></div>

RxJS에서 연산자를 사용하는 두 가지 방법이 있습니다. 파이프 연산자 또는 패치 연산자로 사용할 수 있습니다. 둘의 주요 차이점은 코드에서 가져오고 사용하는 방식입니다.

파이프 연산자는 RxJS에서 연산자를 사용하는 권장하는 방법입니다. 5.5 버전 이후로 도입되었습니다. 파이프 연산자는 독립적인 함수로 가져온 후 `pipe()` 함수를 사용하여 연쇄적으로 연결해 파이프라인에서 사용됩니다. 파이프 연산자는 입력값으로 observable을 취하고 새로운 observable을 반환하는 순수 함수입니다. 이를 통해 여러 연산자를 조합하여 파이프라인을 형성할 수 있습니다.

## 아래는 파이프 연산자를 사용하여 observable을 변환하는 예시입니다:

```js
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);

const filtered$ = source$.pipe(
  filter(value => value % 2 === 0),
  map(value => value * 2)
);

filtered$.subscribe(
  value => console.log(value), // 출력: 4, 8
  err => console.error(err),
  () => console.log('완료')
);
```

<div class="content-ad"></div>

이 예제에서 `filter()` 및 `map()` 연산자는 독립적인 함수로 가져와서 `pipe()` 함수와 함께 사용하여 새로운 observable을 생성합니다. `filter()` 연산자는 짝수 값만 통과시키도록 사용되고, `map()` 연산자는 남은 값들을 두 배로 만듭니다.

한편, 패치 연산자는 RxJS 버전 5.5 이전에 연산자를 사용하는 원래 방법이었습니다. 패치 연산자는 `Observable` 클래스의 메소드로 가져와서 observable에 직접 호출하여 사용됩니다. 패치 연산자는 호출된 observable 인스턴스의 동작을 수정하며, pipeable 연산자처럼 함께 조합할 수 없습니다.

## 패치 연산자를 사용하여 observable을 변환하는 예시는 다음과 같습니다:

```js
import { of } from 'rxjs';

const source$ = of(1, 2, 3, 4, 5);

const filtered$ = source$
  .filter(value => value % 2 === 0)
  .map(value => value * 2);

filtered$.subscribe(
  value => console.log(value), // 출력: 4, 8
  err => console.error(err),
  () => console.log('완료')
);
```

<div class="content-ad"></div>

이 예제에서는 `filter()` 및 `map()` 연산자가 `source$` observable 인스턴스에서 직접 호출됩니다. 이렇게 하면 동작이 변경되어 짝수 값만 통과시키고 나머지 값을 두 배로 만들게 됩니다. RxJS에서는 여전히 패치 연산자를 사용할 수 있지만, 조합성과 모듈성이 향상된 파이프 가능한 연산자가 권장됩니다.

21. AOT와 JIT의 차이는 무엇인가요?

Angular에서 사용되는 AOT (Ahead-of-Time) 및 JIT (Just-in-Time)은 두 가지 컴파일 방법입니다. 다음은 두 방법의 비교입니다:

JIT (Just-in-Time):

<div class="content-ad"></div>

- 컴파일: JIT 컴파일은 사용자의 브라우저에서 런타임에서 발생합니다. Angular 컴파일러는 브라우저에서 실행되며 애플리케이션 템플릿과 컴포넌트를 JavaScript로 변환하여 애플리케이션 부트스트랩 프로세스 중에 컴파일합니다.
- 개발 모드: JIT는 주로 개발 중에 사용되며 신속한 반복과 즉각적인 피드백을 제공합니다. 핫 모듈 교체와 같은 기능을 지원하여 개발 프로세스를 가속화합니다.
- 성능: JIT 컴파일은 애플리케이션의 초기 로드 시간에 영향을 줄 수 있습니다. 이는 컴파일 프로세스가 런타임에서 발생하기 때문입니다. 브라우저는 Angular 컴파일러를 다운로드하고 컴파일 프로세스를 수행해야 하므로 초기 시작 시간이 느려질 수 있습니다.
- 디버깅: JIT는 브라우저가 컴파일된 코드를 원래의 TypeScript 소스 파일로 매핑할 수 있기 때문에 더 나은 디버깅 경험을 제공합니다. 이는 개발자가 브라우저의 개발자 도구에서 직접 디버깅할 수 있도록 도와줍니다.

AOT (Ahead-of-Time):

- 컴파일: AOT 컴파일은 애플리케이션이 배포되기 전에 발생합니다. Angular 컴파일러는 빌드 프로세스 중에 개발자의 컴퓨터에서 실행되어 사전 컴파일된 JavaScript 코드를 생성합니다. 컴파일된 코드에는 효율적인 JavaScript 코드로 변환된 템플릿과 컴포넌트가 포함됩니다.
- 제품 모드: AOT는 주로 프로덕션 배포에서 사용되어 애플리케이션의 성능과 로드 시간을 최적화합니다. 브라우저에서 Angular 컴파일러가 필요 없어져 시작 시간이 빨라지고 번들 크기가 작아집니다.
- 성능: AOT는 애플리케이션의 초기 로드 시간을 크게 개선합니다. 브라우저는 사전 컴파일된 JavaScript 코드를 다운로드하므로 런타임에서 수행해야 하는 작업량이 줄어듭니다.
- 보안: AOT는 템플릿을 사전 컴파일하고 클라이언트 측 코드에서 Angular 컴파일러를 제거함으로써 보안 수준을 제공합니다. 이는 템플릿 주입 공격의 위험을 완화합니다.
- 작은 번들 크기: AOT는 트리 쉐이킹을 허용하여 컴파일 단계에서 사용되지 않는 코드를 제거합니다. 이로 인해 사용자의 전체 다운로드 크기가 줄어들고 번들 크기가 작아집니다.
- 제한된 동적 동작: AOT는 템플릿과 컴포넌트가 빌드 프로세스 중에 사전 컴파일되기 때문에 동적 템플릿 생성이나 동적 컴포넌트 로딩과 같은 동적 행위에 제한이 있습니다.

요약하면, JIT 컴파일은 개발 중에 사용되며 더 나은 디버깅 경험을 제공하지만 초기 로드 시간에 영향을 줄 수 있습니다. 반면, AOT 컴파일은 주로 프로덕션 배포에서 사용되며 성능과 보안을 최적화하고 번들 크기를 줄이지만 동적 동작에 제한이 있습니다.

<div class="content-ad"></div>

22. RxJS에서 retry() 연산자를 어떻게 사용하며, 그 목적은 무엇인가요?

retry() 연산자는 RxJS에서 observable에 오류가 발생한 경우 observable을 다시 구독하는 데 사용됩니다. 이 연산자는 소스 observable에 자동으로 다시 구독하며, 필요에 따라 지연이나 기타 사용자 정의 옵션을 통해 값을 구독자에게 계속 발행합니다. retry() 연산자는 observable이 간헐적인 네트워크 오류나 다른 문제로 실패할 수 있는 상황에서 유용하며, 이러한 오류에서 복구하고 계속 작동할 수 있도록 합니다.

아래는 retry() 연산자를 사용하는 예시입니다:

```js
import { of } from 'rxjs';
import { map, mergeMap, retry } from 'rxjs/operators';

const source$ = of('http://my-api.com/data');

const data$ = source$.pipe(
  mergeMap(url => fetch(url)), // fetch()가 데이터를 포함한 프라미스를 반환한다고 가정
  map(response => response.json()),
  retry(3) // 오류 발생 시 3번까지 재시도
);

data$.subscribe(
  data => console.log(data),
  err => console.error(err),
  () => console.log('완료')
);
```

<div class="content-ad"></div>

이 예시에서 `source$` 옵저버블은 API 엔드포인트를 가리키는 URL 하나를 방출합니다. `mergeMap` 연산자는 URL을 사용하여 `fetch()` 함수를 호출하고 응답 데이터로 해결되는 프로미스를 반환합니다. 그 다음에 `map` 연산자가 응답 데이터를 JSON으로 파싱하는 데 사용됩니다.

에러가 발생할 경우 3번까지 재시도해야 한다고 명시하기 위해 `map()` 연산자 다음에 `retry()` 연산자가 사용됩니다. 옵저버블 실행 중에 에러가 발생하면 RxJS가 소스 옵저버블을 최대 3번까지 자동으로 다시 구독하여, 애플리케이션이 네트워크 에러로부터 복구할 수 있도록 합니다.

`retry()` 연산자는 재시도 간의 지연이나 재시도하는데 필요한 오류를 결정하는 프레디케이트 함수와 같은 추가 옵션으로 사용자 정의할 수 있다는 점을 언급할 가치가 있습니다. 이러한 옵션은 더 복잡한 시나리오를 처리하는 데 유용할 수 있습니다.

23. Angular 변경 감지란 무엇이며 어떻게 작동하나요?

<div class="content-ad"></div>

앵귤러의 변경 감지는 응용 프로그램 데이터 모델의 변경을 감지하고 전파하여 해당 뷰를 업데이트하는 메커니즘입니다. UI가 데이터의 현재 상태를 반영하도록 보장합니다. 응용 프로그램 데이터에 변경 사항이 있을 때, 앵귤러의 변경 감지 시스템은 자동으로 영향을 받는 컴포넌트 및 해당 하위 컴포넌트를 업데이트합니다. 앵귤러의 변경 감지가 작동하는 방식은 다음과 같습니다:

- 초기화: 컴포넌트가 생성될 때, 앵귤러는 변경 감지기를 초기화합니다. 변경 감지기는 컴포넌트의 속성을 추적하고 변경 사항에 대해 청취합니다.
- 변경 감지 트리: 앵귤러는 컴포넌트 계층 구조를 나타내는 변경 감지 트리라는 트리 구조를 생성합니다. 각 컴포넌트는 자체 변경 감지기를 가지며 하위 컴포넌트는 해당 부모의 변경 감지기 내에 중첩됩니다.
- 변경 감지: 앵귤러는 변경 감지 주기를 실행하여 변경 감지를 수행합니다. 이 주기는 사용자 상호작용, 타이머 또는 비동기 작업과 같은 다양한 이벤트에 의해 트리거됩니다. 기본적으로 앵귤러는 이러한 이벤트 후 전체 응용 프로그램에 대한 변경 감지를 자동으로 트리거합니다.
- 변경 감지 주기: 변경 감지 주기 중에 앵귤러는 루트 컴포넌트의 변경 감지기에서 시작하여 변경 감지 트리를 위쪽으로 트래버스합니다.
- 변경 사항 확인: 각 컴포넌트에서 앵귤러는 컴포넌트 템플릿에 바인딩된 속성을 확인합니다. 각 속성의 현재 값과 이전 값과 비교합니다.
- 뷰 업데이트: 앵귤러가 컴포넌트 속성의 변경을 감지하면 새 값을 반영하여 해당 뷰를 업데이트합니다. 이는 DOM을 업데이트하고 컴포넌트 템플릿을 다시 렌더링하고 필요한 재배치를 트리거하는 것을 포함합니다.
- 하위 컴포넌트 확인: 현재 컴포넌트를 업데이트 한 후, 앵귈러는 변경 감지 주기를 계속하여 변경 감지 트리에 있는 하위 컴포넌트로 이동합니다. 각 하위 컴포넌트에서 재귀적으로 변경 감지를 수행합니다.
- 바인딩 전파: 부모 컴포넌트에서 변경 사항이 발생하면, 앵극러는 이러한 변경 사항을 자식 컴포넌트로 전파합니다. 이를 통해 영향을 받는 모든 하위 컴포넌트가 적절하게 업데이트됩니다.
- 불변 데이터: 앵귤러의 변경 감지는 객체 참조에 의존하여 변경 사항을 감지합니다. 객체에 대한 참조가 동일한 경우, 앵귈러는 객체가 변경되지 않았다고 가정합니다. 따라서 불변 데이터 패턴을 사용할 때는 새로운 객체가 변경을 나타내도록 만드는 것이 중요합니다.
- 성능 최적화: 앵귈러의 변경 감지 시스템에는 여러 성능 최적화가 포함되어 있습니다. 변경 사항이 없는 컴포넌트에 대해 불필요한 변경 감지 주기를 건너뛰며, 앵귈러는 OnPush 변경 감지 전략도 지원합니다. 이를 통해 컴포넌트가 입력 속성이 변경될 때에만 변경을 확인해야 함을 지정할 수 있습니다.

효율적으로 변경을 감지하고 전파함으로써, 앵귈러의 변경 감지 시스템은 응용 프로그램의 UI를 기저 데이터 모델과 동기화하여 반응적이고 최신의 사용자 경험을 제공합니다.

<div class="content-ad"></div>

Zone.js은 Angular에서 사용되는 JavaScript 라이브러리로, 실행 컨텍스트를 제공하고 비동기 작업에 훅을 제공합니다. Angular가 이벤트 처리, 타이머, 프라미스, XHR 요청과 같은 비동기 작업의 실행을 추적하고 관리할 수 있게 합니다. Zone.js를 통해 Angular는 비동기 작업이 완료되었을 때 변경 감지를 수행하고 UI를 업데이트할 수 있습니다.

## Angular에서 Zone.js를 사용하는 예시가 있습니다:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="simulateAsyncTask()">Simulate Async Task</button>
    <p>Status: { status }</p>
  `
})
export class ExampleComponent {
  status: string = 'Not started';

  simulateAsyncTask() {
    this.status = 'Processing...';

    setTimeout(() => {
      // 비동기 작업 완료 시뮬레이션
      this.status = 'Completed';
    }, 2000);
  }
}
```

이 Angular 컴포넌트에서는 비동기 작업의 상태를 나타내는 버튼과 문단이 있습니다. 버튼을 클릭하면 `simulateAsyncTask()` 메서드가 호출됩니다. 이 메서드 내에서 우리는 작업이 처리 중임을 나타내도록 `status` 속성을 업데이트합니다. 그리고 2초의 지연을 시뮬레이션하기 위해 `setTimeout` 함수를 사용합니다.

<div class="content-ad"></div>

Behind the scenes, Zone.js intercepts the `setTimeout` call and hooks into the asynchronous operation. It allows Angular to track the execution of the task and ensures that change detection is triggered when the task completes. When the timeout expires, the callback function is executed, and the `status` property is updated to indicate that the task is completed. As a result, the UI is automatically updated to reflect the new status.

**Conclusion:**

Zone.js provides Angular with a way to seamlessly integrate asynchronous operations into the change detection mechanism, enabling efficient updating of the UI when asynchronous tasks finish. It simplifies the handling of asynchronous code and ensures that Angular remains aware of changes happening within the asynchronous context.

**25. How to dynamically create form fields with FormArray in Angular?**

<div class="content-ad"></div>

## Angular에서 `FormArray`를 사용하여 동적으로 양식 필드를 생성하려면 다음 단계를 따를 수 있습니다:

- 필요한 모듈 및 서비스를 가져옵니다: — `@angular/forms`에서 `FormBuilder` 및 `FormGroup`를 가져옵니다.
- 컴포넌트 내에서 양식 그룹과 양식 배열을 생성합니다: — 컴포넌트 클래스에서 `FormBuilder`를 사용하여 양식 그룹을 생성하고 내부에 양식 배열을 정의합니다.

```js
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      formArrayName: this.formBuilder.array([]),
    });
  }

  get formArray(): FormArray {
    return this.dynamicForm.get('formArrayName') as FormArray;
  }

  // 양식 배열 컨트롤을 추가, 제거 및 접근하기 위한 기타 메서드
}
```

3. 양식 배열 컨트롤을 추가하고 제거하는 메서드를 구현하세요.

<div class="content-ad"></div>

— 컴포넌트 내에서 폼 어레이 컨트롤을 추가하고 제거하는 메서드를 구현해보세요.

— 이러한 메서드는 `FormArray`의 `push()`와 `removeAt()` 메서드를 사용하여 폼 어레이 컨트롤을 추가하거나 제거해야 합니다.

```js
   //...

   addFormControl() {
     const control = this.formBuilder.control('', Validators.required);
     this.formArray.push(control);
   }

   removeFormControl(index: number) {
     this.formArray.removeAt(index);
   }

   //...
```

4. 템플릿에서 동적으로 폼 필드를 생성하세요:

<div class="content-ad"></div>

컴포넌트의 템플릿에서 `*ngFor`를 사용하여 폼 배열 컨트롤을 반복하고 해당 폼 필드를 동적으로 생성하세요.

```js
<form [formgroup]="dynamicForm" (ngsubmit)="onSubmit()">
  <div formarrayname="formArrayName">
    <div *ngfor="let control of formArray.controls; let i = index">
      <input [formcontrolname]="i" type="text">
      <button (click)="removeFormControl(i)">Remove</button>
    </div>
  </div>
  <button (click)="addFormControl()">Add Field</button>
  <button type="submit">Submit</button>
</form>
```

위 예시에서, `formArray`는 `formArrayName` 속성을 사용하여 접근되며, `*ngFor`를 사용하여 폼 배열 컨트롤을 반복합니다. 각 컨트롤은 입력 필드로 렌더링되고 해당 컨트롤을 제거하는 "Remove" 버튼이 제공됩니다.

<div class="content-ad"></div>

컴포넌트에서 폼 제출 처리 로직을 구현하세요. 'FormGroup' 인스턴스를 사용하여 폼 값에 액세스하고 필요한 작업을 수행하세요.

```js
   //...

   onSubmit() {
     if (this.dynamicForm.valid) {
       const formValues = this.dynamicForm.value;
       // 폼 제출 처리
     }
   }

   //...
```

이러한 단계를 따라하면 Angular에서 `FormArray`를 사용하여 동적으로 폼 필드를 생성할 수 있습니다. 폼 배열을 사용하면 폼 컨트롤을 동적으로 추가하거나 제거할 수 있으며, 필요에 따라 폼 값에 액세스하고 처리할 수 있습니다.

26. Angular에서 'ngZone'은 무엇인가요?

<div class="content-ad"></div>

앵귤러에서 `NgZone`은 앵귤러 프레임워크에서 제공하는 서비스로, 비동기 작업 및 변경 감지의 실행을 관리하고 제어하는 데 도움을 주는 역할을 합니다.
`NgZone`의 주요 목적은 앵귤러의 존(Zone) 밖에서 실행되는 코드를 처리하고 최적화하는 것입니다. 이는 서드파티 라이브러리에서 발생하는 이벤트나 타이머, AJAX 요청 또는 웹소켓과 같은 비동기 작업과 같은 것들을 의미합니다.

기본적으로 앵귤러는 “앵귤러 존”이라 불리는 존에서 실행됩니다. 이 존 내에서 코드가 실행될 때 앵귤러의 변경 감지 메커니즘이 자동으로 트리거되어 뷰가 업데이트됩니다. 그러나 앵귤러 존 외부에서 코드가 실행될 때 앵귤러는 변경 사항을 인지하지 못하고, 애플리케이션 상태와 뷰 동기화에 문제가 발생할 수 있습니다.

`NgZone`은 앵귤러 존 내외부에서 코드를 명시적으로 실행할 수 있는 방법을 제공합니다. `run()` 및 `runOutsideAngular()` 두 가지 메서드를 제공합니다.

<div class="content-ad"></div>

1. run() : `run()` 메서드는 Angular 존(Zone) 내에서 제공된 함수를 실행합니다. 이를 통해 함수에 의해 트리거된 모든 변경 사항이 감지되어 뷰에서 업데이트됩니다.

```js
import { Component, NgZone } from '@angular/core';

@Component({
     selector: 'app-example',
     template: `
       <button (click)="onClick()">Run Code Inside NgZone</button>
     `,
   })
   export class ExampleComponent {
     constructor(private ngZone: NgZone) {}
     onClick() {
       this.ngZone.run(() => {
         // Angular 존(Zone) 내에서 코드 실행
         // Angular 변경 감지가 트리거됩니다
       });
     }
   }
```

위 예제에서 `onClick()` 메서드는 `NgZone`의 `run()` 메서드 내에 포함되어 있습니다. 버튼을 클릭할 때, `run()` 함수 내의 코드가 Angular 존(Zone) 내에서 실행되어 변경사항이 감지되고 뷰에서 업데이트됩니다.

2. runOutsideAngular() : `runOutsideAngular()` 메서드를 사용하면 Angular 존(Zone) 외부에서 코드를 실행할 수 있습니다. 이는 Angular의 변경 감지가 필요하지 않거나 UI에 영향을 주지 않는 작업의 성능을 최적화할 때 유용합니다.

<div class="content-ad"></div>

```js
import { Component, NgZone } from '@angular/core';

@Component({
     selector: 'app-example',
     template: `
       <button (click)="onClick()">NgZone 밖에서 코드 실행</button>
     `,
   })
   export class ExampleComponent {
     constructor(private ngZone: NgZone) {}
     onClick() {
       this.ngZone.runOutsideAngular(() => {
         // NgZone 밖에서 실행되는 코드
         // Angular 변경 감지가 트리거되지 않음
       });
     }
   }
```

위 예시에서 `onClick()` 메서드는 `runOutsideAngular()` 메서드 내부에서 코드를 실행합니다. 이를 통해 코드가 Angular 존 밖에서 실행되어 불필요한 변경 감지와 뷰 업데이트를 방지합니다.

결론:

`NgZone`을 사용하여 Angular 존 내부와 외부에서 코드를 실행을 제어하고 최적화하여 효율적인 변경 감지와 응용프로그램 상태와 뷰 간의 동기화를 보장할 수 있습니다.


<div class="content-ad"></div>

27. 부모에서 트리거된 이벤트가 Angular의 OnPush 전략을 사용하는 자식 컴포넌트에서 변경 감지를 유발할 수 있을까요?

아니요, 부모 컴포넌트에서 트리거된 이벤트는 Angular의 `OnPush` 변경 감지 전략을 사용하는 자식 컴포넌트에서 직접적으로 변경 감지를 일으킬 수 없습니다. `OnPush` 전략은 다음 조건 중 하나가 충족될 때에만 컴포넌트에서 변경 감지를 트리거합니다:

- 컴포넌트의 입력 속성이 변경될 때
- 컴포넌트 자체 또는 자식 컴포넌트 중 하나에서 발생한 이벤트를 수신할 때

## 이를 설명하기 위해, 부모 컴포넌트와 `OnPush` 변경 감지 전략을 사용하는 자식 컴포넌트를 사용하는 예제를 살펴봅시다:

<div class="content-ad"></div>

```js
// parent.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="triggerEvent()">이벤트 발생</button>
    <app-child [inputproperty]="inputProperty"></app-child>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  inputProperty: string = '초기 값';

  triggerEvent() {
    // 부모 컴포넌트에서 이벤트가 발생했습니다.
    console.log('부모 컴포넌트에서 이벤트가 발생했습니다.');
    // 자식 컴포넌트의 input 프로퍼티 갱신
    this.inputProperty = '새로운 값';
  }
}
```

```js
// child.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    { inputProperty }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() inputProperty: string;
}
```

이 예시에서 `ParentComponent`는 `triggerEvent()` 메서드를 호출하는 버튼을 가지고 있습니다. 하지만, `ParentComponent`와 `ChildComponent` 둘 다 `OnPush` 변화 감지 전략을 사용하기 때문에, 부모 컴포넌트에서 발생한 이벤트가 바로 자식 컴포넌트의 변화 감지를 일으키지 않습니다.

부모에서 자식 컴포넌트로 변경을 전파하기 위해서는 자식 컴포넌트의 입력 프로퍼티를 갱신해야 합니다. 예를 들어, `ParentComponent`의 `triggerEvent()` 메서드를 다음과 같이 수정할 수 있습니다:


<div class="content-ad"></div>

```js
triggerEvent() {
  this.inputProperty = '새 값'; // 하위 컴포넌트의 입력 속성을 업데이트합니다
}
```

입력 속성 값을 업데이트함으로써 Angular의 변경 감지 메커니즘은 변경을 감지하고 `OnPush` 전략을 사용하는 하위 컴포넌트 내에서 변경 감지를 트리거합니다. 이로써 하위 컴포넌트의 뷰가 해당 변경에 따라 업데이트됩니다.

결론 :

요약하자면, 부모 컴포넌트에서 트리거된 이벤트는 `OnPush` 전략을 사용하는 하위 컴포넌트에서 변경 감지를 직접적으로 일으키지 않습니다. 하지만 부모 컴포넌트에서 하위 컴포넌트의 입력 속성을 업데이트함으로써 간접적으로 변경 감지를 트리거할 수 있습니다.


<div class="content-ad"></div>

따라서, 부모 컴포넌트에서 이벤트가 트리거될 때 `OnPush` 전략을 사용하는 자식 컴포넌트의 변경 감지가 자동으로 트리거되지 않습니다. 이 동작은 불필요한 변경 감지 주기를 줄여 성능을 최적화하기 위해 의도적으로 구현되었습니다.

28. 앵귤러에서 OnPush 전략을 사용하는 경우 자식 컴포넌트에서 트리거된 이벤트가 부모 컴포넌트의 변경 감지를 일으킬 수 있을까요?

아니요, 자식 컴포넌트에서 트리거된 이벤트는 앵귤러에서 `OnPush` 변경 감지 전략을 사용하는 부모 컴포넌트에서 직접적으로 변경 감지를 일으킬 수 없습니다. `OnPush` 전략은 해당 컴포넌트의 입력 프로퍼티 중 하나가 변경되었을 때 또는 컴포넌트 자체 또는 해당 자식 컴포넌트에서 발신된 이벤트를 수신했을 때에만 변경 감지를 트리거합니다.

그러나 EventEmitter나 공유 서비스와 같은 기술을 사용하여 자식 컴포넌트에서 부모 컴포넌트로 변경을 전파할 수 있습니다. 다음은 이를 구현하는 예시입니다:


<div class="content-ad"></div>

```js
// child.component.ts
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="triggerEvent()">이벤트 발생</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Output() childEvent: EventEmitter = new EventEmitter();

  triggerEvent() {
    this.childEvent.emit(); // 자식 컴포넌트에서 이벤트 발생
  }
}
```

```js
// parent.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (childEvent)="handleChildEvent()"></app-child>
    <p>받은 이벤트: { eventReceived }</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  eventReceived: boolean = false;

  handleChildEvent() {
    this.eventReceived = true; // 부모 컴포넌트에서 상태 업데이트
  }
}
```

이 예시에서 `ChildComponent`은 버튼을 클릭할 때 `childEvent` EventEmitter를 사용하여 사용자 정의 이벤트를 발생시킵니다. `ParentComponent`는 이 이벤트를 청취하고 `handleChildEvent()` 메서드를 트리거하여 부모 컴포넌트에서 `eventReceived` 속성을 업데이트합니다.

결론:

<div class="content-ad"></div>

부모 컴포넌트에서 상태를 업데이트하면 Angular의 변경 감지 메커니즘이 변경 사항을 감지하고 부모 컴포넌트에서 변화 감지를 트리거하여 이에 따라 뷰를 업데이트합니다.

자식 컴포넌트가 발생시킨 이벤트에 응답하여 부모 컴포넌트에서 변화 감지가 트리거되지만, 이 변화 감지는 이벤트 자체로 인해 직접적으로 발생하는 것이 아닙니다. 대신 부모 컴포넌트의 상태 변화가 변화 감지를 트리거합니다.

29. Angular 애플리케이션을 최적화하는 방법?

Angular 애플리케이션을 최적화하는 것은 성능과 효율성을 향상시키기 위한 다양한 전략과 기술을 포함합니다. Angular 애플리케이션을 최적화하는 데 필요한 몇 가지 단계는 다음과 같습니다:

<div class="content-ad"></div>

- 코드를 최소화하고 번들화하세요: Angular CLI(ng build --prod)와 같은 빌드 도구를 사용하여 코드를 최소화하고 어플리케이션 코드를 번들화하세요. 이렇게 하면 파일 크기가 줄어들고 어플리케이션의 로드 시간이 개선됩니다.
- 지연로딩 모듈: 어플리케이션을 작은 모듈로 분리하고 필요할 때 지연로딩하세요. 이 방식은 초기 번들 크기를 줄이고 어플리케이션의 초기 로드 시간을 개선합니다.
- Ahead-of-Time(AOT) 컴파일 사용: Angular 어플리케이션에서 AOT 컴파일을 활성화하세요. AOT는 템플릿을 빌드 프로세스 중에 컴파일하여 렌더링 속도가 빨라지고 성능이 개선됩니다.
- 네트워크 요청 최적화: HTTP 요청의 수를 줄이기 위해 여러 요청을 결합하는 HTTP 배치 또는 서버 측 렌더링(SSR)과 같은 기술을 사용하여 단일 요청으로 만드세요. 캐싱 메커니즘을 구현하여 자주 액세스되는 데이터를 저장하고 재사용하세요.
- 렌더링 최적화: `OnPush` 변경 감지 전략을 사용하고 필요할 때 `ChangeDetectionRef` API를 활용하여 부품의 불필요한 다시 렌더링을 피하세요.
- Angular Universal 사용: Angular Universal을 사용하여 서버 측 렌더링(SSR)을 구현하는 것을 고려하세요. SSR은 초기 렌더링 시간을 개선하고 SEO(Search Engine Optimization)를 향상시켜 검색 엔진 크롤러에 완전한 렌더링된 페이지를 제공할 수 있습니다.
- Angular 성능 도구 최적화: Angular 성능 도구인 Angular DevTools 및 Lighthouse를 활용하여 어플리케이션의 성능 병목 현상, 메모리 누수 및 기타 문제를 식별하세요. 성능 프로필링 기능을 사용하여 코드를 분석하고 최적화하세요.
- Tree shaking과 데드 코드 제거: 빌드 프로세스가 Tree shaking과 데드 코드 제거를 수행하도록 구성했는지 확인하세요. 이를 통해 사용되지 않는 코드를 제거하여 어플리케이션의 번들 크기를 줄일 수 있습니다.
- CSS 및 이미지 최적화: CSS를 최적화하여 선택자 수를 줄이고 사용되지 않는 스타일을 제거하고 CSS 파일을 최소화하세요. 여러 이미지를 모아 둔 이미지 스프라이트를 사용하세요. 이미지가 많은 웹 페이지는 로드하는 데 오랜 시간이 걸리고 여러 서버 요청을 생성할 수 있습니다. 이미지 스프라이트를 사용하면 서버 요청의 수를 줄이고 대역폭을 절약할 수 있습니다.

결론:

최적화는 반복적인 과정이며 필요한 구체적인 최적화는 어플리케이션의 성격에 따라 달라질 수 있습니다. 어플리케이션의 성능을 모니터링하고 사용자 피드백을 수집하여 추가 최적화가 필요한 부분을 파악하세요.

30. 앵귤러에서 순수 파이프와 불순 파이프에 대해 설명해주세요.

<div class="content-ad"></div>

Angular에서는 파이프를 사용하여 템플릿에서 데이터를 변환합니다. 그들은 동작과 성능 특성에 따라 순수 파이프와 불순 파이프로 분류할 수 있습니다.

- 순수 파이프: 순수 파이프는 Angular의 기본 파이프 유형입니다. 입력 값을 가져와 변환된 출력 값을 반환하는 순수 함수로 설계되어 있습니다. 순수 파이프는 상태가 없고 결정론적이며, 출력은 단순히 입력에만 의존하며 부작용이 없습니다. Angular는 순수 파이프를 최적화하여 입력 값이 변경될 때에만 실행합니다.

다음은 Angular에서 순수 파이프의 예시입니다:

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe',
  pure: true
})
export class TestPipe implements PipeTransform {
  transform(value: string): string {
    Object.keys(value).forEach(function(key,index) {
         // key: 객체 키의 이름
         // index: 객체 내 키의 순서 위치
         value[key] = value[key].toUpperCase()
     });
     return value;
  }
}
```

<div class="content-ad"></div>

위 예시에서 `TestPipe`은 문자열을 대문자로 변환하는 순수 파이프입니다. `@Pipe` 데코레이터에서 `pure: true` 설정은 이 파이프가 순수하다는 것을 나타냅니다. `value` 입력이 변경될 때만 `transform` 함수를 실행합니다.

다음과 같은 HTML 코드가 있다고 가정해봅시다:-

```js
{ user | testPipe} in HTML 
```

그리고 다음과 같은 컴포넌트 코드가 있다고 가정해봅시다:

<div class="content-ad"></div>

```js
user = { name:'test', city: 'test city'};
```

그리고 새로운 변경 사항은:-

```js
this.user.city = "new test city"
```

위 예제의 경우 object reference 가 변경되지 않기 때문에 testPipe 가 실행되지 않습니다. Pipe 가 실행되도록 하려면 testPipe 의 pure 속성을 false 로 설정하거나 컴포넌트 코드를 변경해야 합니다:-

<div class="content-ad"></div>

```js
this.user = {
     name: '새로운 테스트',
     city: '새로운 테스트 도시'
}
```

위의 코드에서 testPipe는 객체 참조가 변경되므로 실행됩니다.

2. 불순 파이프:

불순 파이프는 부작용을 일으킬 수 있는 파이프로, 더 자주 실행될 수 있습니다. `@Pipe` 데코레이터에서 `pure` 속성을 `false`로 설정함으로써 명시적으로 불순하다고 표시됩니다. 불순 파이프는 Angular에서 변경 감지를 위해 최적화되지 않으며, 입력 값이 변경되지 않았더라도 여러 번 실행될 수 있습니다.

<div class="content-ad"></div>

앵귤러에서 불순 파이프의 예시가 있어요:

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe',
  pure: false
})
export class TestPipe implements PipeTransform {
  transform(value: string): string {
    Object.keys(value).forEach(function(key, index) {
      // key: 객체 키의 이름
      // index: 객체 내 키의 순서
      value[key] = value[key].toUpperCase()
    });
    return value;
  }
}
```  

아래의 HTML 코드가 있다고 가정해 봅시다:

```js
{ user | testPipe } in HTML 
```

<div class="content-ad"></div>

위 문제를 해결하기 위해 새로운 변술을 추가해야 합니다. 돨면서 아래의 구성요素 코드를 확인해 주세요:

```js
user = { name:'test', city: 'test city'};
```

그리고 새로운 변경사항은 아래와 같습니다:

```js
this.user.city = "new test city"
```

<div class="content-ad"></div>

위의 예에서 testPipe가 실행됩니다, Impure pipes는 입력 값의 변화와 관계없이 Angular가 변경을 감지할 때마다 실행됩니다.

결론:

순수 파이프가 성능 최적화로 인해 Angular에서 기본 및 추천되는 유형이지만, 상태를 가지고 있는 또는 결정론적이지 않은 변환을 다룰 때 일부 상황에서는 불순 파이프가 유용할 수 있습니다. 그러나 불순 파이프를 과도하게 사용하거나 부적절하게 사용하면 Angular 애플리케이션의 성능에 영향을 줄 수 있습니다.

31. Angular 서비스를 테스트하는 방법?

<div class="content-ad"></div>

Angular 서비스를 테스트하기 위해 Angular의 테스트 유틸리티와 기술을 사용할 수 있습니다. 다음은 Angular 서비스를 테스트하는 방법을 보여주는 예제입니다:

간단한 사용자 관련 작업을 수행하는 `UserService`라는 서비스가 있다고 가정해 봅시다:

```js
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private users: string[] = [];

  addUser(user: string) {
    this.users.push(user);
  }

  getUserCount() {
    return this.users.length;
  }

  deleteUser(user: string) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
```

이제 Angular의 테스트 유틸리티를 사용하여 `UserService`에 대한 유닛 테스트를 작성해 보겠습니다:

<div class="content-ad"></div>

```js
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should add a user', () => {
    service.addUser('John');
    expect(service.getUserCount()).toBe(1);
  });

  it('should delete a user', () => {
    service.addUser('John');
    service.addUser('Jane');
    service.deleteUser('John');
    expect(service.getUserCount()).toBe(1);
  });
});
```

위의 테스트에서는 `describe`를 사용하여 `TestBed.configureTestingModule()`를 사용하고, `TestBed.inject()`를 사용하여 `UserService`를 주입하고 `service` 변수에 할당합니다.

`it` 함수는 개별 테스트 케이스를 정의합니다. 첫 번째 테스트에서는 사용자 'John'을 전달하여 `addUser` 메서드를 호출하고 사용자 수가 1인지를 기대합니다. 두 번째 테스트에서는 'John'과 'Jane'이라는 두 명의 사용자를 추가한 후 'John'을 사용하여 `deleteUser` 메서드를 호출하고 사용자 수가 1인지를 기대합니다.

이 서비스의 단위 테스트를 실행하려면 Angular CLI 명령 `ng test`를 사용할 수 있습니다. 이 명령은 Karma 테스트 러너를 사용하여 테스트를 실행합니다.

<div class="content-ad"></div>

결론:

Angular 서비스에 대한 테스트를 작성하여 서비스가 예상대로 작동하고 메서드 및 데이터 조작이 올바르게 이루어지는지 확인할 수 있습니다. 이는 오류를 잡고 동작을 확인하며 서비스 로직의 정확성을 유지하는 데 도움이 됩니다.

32. ngAfterContentInit 훅을 설명해주세요.

`ngAfterContentInit` 훅은 Angular에서 제공하는 라이프사이클 훅으로, 컴포넌트로 프로젝트된 콘텐츠를 Angular이 초기화한 후에 호출됩니다. 이 훅은 컴포넌트로 프로젝트된 콘텐츠가 초기화된 후에 초기화 또는 설정 로직을 수행하려는 경우 유용합니다.

<div class="content-ad"></div>

아래는 Angular 컴포넌트에서 `ngAfterContentInit` 훅을 사용하는 방법의 예시입니다:

```js
import { Component, AfterContentInit, ContentChild } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <ng-content></ng-content>
  `
})
export class MyComponent implements AfterContentInit {
  @ContentChild('myContent') myContent: ElementRef;

  ngAfterContentInit() {
    // 컨텐츠가 컴포넌트로 프로젝트된 후에 실행될 이 코드입니다.
    console.log('Content initialized:', this.myContent.nativeElement.textContent);
  }
}
```

이 예시에서 `MyComponent` 컴포넌트는 템플릿에 ``ng-content`` 태그를 포함하고 있습니다. 이 태그는 컴포넌트 사용 시 컨텐츠가 프로젝트될 자리 표시자입니다.

컴포넌트 클래스 내에서 `@ContentChild` 데코레이터를 사용하여 프로젝트된 컨텐츠에 대한 참조를 얻습니다. 이 경우 `myContent` 템플릿 참조 변수를 가진 요소를 찾고 있습니다. 귀하의 특정 사용 사례에 따라 CSS 클래스 또는 컴포넌트 유형 등 다른 선택기를 사용할 수 있습니다.

<div class="content-ad"></div>

`ngAfterContentInit` 메소드는 `AfterContentInit` 인터페이스의 일부로 구현되며, 컴포넌트의 라이프사이클에 연결할 수 있게 해줍니다. 이 메소드 안에서는 프로젝트된 컨텐츠를 기반으로 필요한 초기화 작업이나 로직을 수행할 수 있습니다. 이 예제에서는 프로젝트된 엘리먼트의 텍스트 컨텐츠를 콘솔에 로깅합니다.

다른 템플릿에서 `MyComponent` 컴포넌트를 사용하고 프로젝트할 컨텐츠를 제공할 때, `ngAfterContentInit` 메소드는 컨텐츠가 초기화된 후에 호출됩니다.

```js
<app-my-component>
  <div #mycontent>This content will be projected</div>
</app-my-component>
```

위 코드가 실행되면, `MyComponent`에서 `ngAfterContentInit` 메소드가 실행되고, 프로젝트된 ``div`` 엘리먼트의 텍스트 컨텐츠가 콘솔에 로깅됩니다.

<div class="content-ad"></div>

Angular 컴포넌트에서 `Component`, `AfterContentInit`, 및 `ContentChild`를 사용하기 위해 `@angular/core` 모듈에서 필요한 import를 추가하는 것을 잊지 마세요.

33. 예제와 함께 ngAfterViewInit 훅을 설명해보세요?

`ngAfterViewInit` 훅은 Angular에서 컴포넌트의 뷰와 자식 뷰를 초기화한 후 호출되는 라이프사이클 훅입니다. 이 훅은 컴포넌트의 뷰나 자식 뷰에 액세스가 필요한 로직이나 작업을 수행해야 할 때 유용합니다.

다음은 Angular 컴포넌트에서 `ngAfterViewInit` 훅을 사용하는 예시입니다:

<div class="content-ad"></div>

```js
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `
    <div #myDiv>일부 내용</div>
  `
})
export class MyComponent implements AfterViewInit {
  @ViewChild('myDiv') myDiv: ElementRef;

  ngAfterViewInit() {
    // 컴포넌트의 뷰가 초기화된 후에 이 코드가 실행됩니다
    console.log('뷰가 초기화됨:', this.myDiv.nativeElement.textContent);
  }
}
```

이 예제에서 `MyComponent` 컴포넌트는 `myDiv` 템플릿 참조 변수를 포함한 템플릿이 있습니다. `@ViewChild` 데코레이터를 사용하여 컴포넌트 클래스에서 이 요소에 대한 참조를 가져옵니다.

`ngAfterViewInit` 메서드는 `AfterViewInit` 인터페이스의 일부로 구현되어 있습니다. 이를 통해 컴포넌트 뷰의 라이프사이클에 연결할 수 있습니다. 이 메서드 내에서 컴포넌트 뷰의 DOM 요소에 액세스하고 조작할 수 있습니다. 이 예제에서는 `div` 요소의 텍스트 내용을 콘솔에 기록합니다. 컴포넌트의 뷰가 초기화되면 Angular는 `ngAfterViewInit` 메서드를 호출하며, 컴포넌트 뷰 또는 해당 하위 뷰에 액세스해야 하는 필요한 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

다른 템플릿에서 `MyComponent` 컴포넌트를 사용하는 예시를 보여드리겠습니다:

```js
<app-my-component></app-my-component>
```

위의 코드를 실행하면, `MyComponent` 내의 `ngAfterViewInit` 메소드가 트리거되어, ``div`` 요소의 텍스트 내용이 콘솔에 로깅됩니다.

반드시 Angular 컴포넌트에서 `@angular/core` 모듈로부터 `Component`, `AfterViewInit`, `ViewChild`, `ElementRef`에 대한 필요한 임포트를 포함시켜 주시기 바랍니다.

<div class="content-ad"></div>

결론:

참고: DOM에 직접 액세스하고 조작하는 것은 Angular의 선언적 접근 방식에 반하는 경우가 있으므로 `ngAfterViewInit` 훅을 사용할 때 주의해야 합니다. 가능한 경우 DOM을 직접 조작하는 대신 Angular의 데이터 바인딩 및 컴포넌트 상호 작용 메커니즘을 사용하는 것이 좋습니다.

34. ngAfterContentInit와 ngAfterViewInit의 차이점?

`ngAfterContentInit`와 `ngAfterViewInit` 훅은 Angular의 라이프사이클 훅이지만 서로 다른 맥락에서 사용되며 서로 다른 목적을 가지고 있습니다.

<div class="content-ad"></div>

`ngAfterContentInit`은 Angular이 컴포넌트로 프로젝션된 콘텐츠를 초기화한 후에 호출되는 라이프사이클 후크입니다. 이는 컴포넌트로 프로젝션된 콘텐츠에 의존하는 초기화 또는 설정 로직을 수행해야 할 때 사용됩니다. 이 후크는 일반적으로 부모 컴포넌트에서 콘텐츠를 프로젝션하기 위해 템플릿에 `ng-content`/ng-content` 태그가 있는 컴포넌트에서 사용됩니다. `@ContentChild` 데코레이터를 사용하여 프로젝션된 콘텐츠에 액세스할 수 있습니다.

반면, `ngAfterViewInit`은 Angular이 컴포넌트의 뷰와 그 하위 뷰를 초기화한 후에 호출되는 라이프사이클 후크입니다. 이는 컴포넌트의 뷰 또는 하위 뷰에 액세스해야 하는 로직이나 작업을 수행해야 할 때 사용됩니다. 이 후크는 주로 DOM 조작, ViewChild 요소에 액세스, 또는 뷰가 완전히 렌더링되어야 하는 타사 라이브러리와 상호작용하기 위해 사용됩니다. `@ViewChild` 데코레이터를 사용하여 뷰 요소에 액세스할 수 있습니다.

`ngAfterContentInit`와 `ngAfterViewInit` 간의 주요 차이점을 요약하면:

- 목적:

<div class="content-ad"></div>

— `ngAfterContentInit`: 프로젝트된 콘텐츠에 의존하는 초기화나 설정 로직에 사용됩니다.

— `ngAfterViewInit`: 컴포넌트의 뷰나 자식 뷰에 액세스가 필요한 로직이나 작업에 사용됩니다.

2. 타이밍:

— `ngAfterContentInit`: 콘텐트 프로젝션 초기화 후 호출됩니다.

<div class="content-ad"></div>

— `ngAfterViewInit`: 컴포넌트의 뷰와 자식 뷰가 초기화된 후에 호출됩니다.

3. 데코레이터:

— `ngAfterContentInit`: 프로젝트된 컨텐츠에 접근하려면 `@ContentChild` 데코레이터를 사용하세요.

— `ngAfterViewInit`: 뷰 엘리먼트에 접근하려면 `@ViewChild` 데코레이터를 사용하세요.

<div class="content-ad"></div>

4. 사용법:

- `ngAfterContentInit`: 일반적으로 부모 컴포넌트에서 콘텐츠를 프로젝트하는 컴포넌트에서 사용됩니다.

- `ngAfterViewInit`: 일반적으로 DOM 조작, 뷰 요소 접근 또는 제3자 라이브러리와 상호 작용에 사용됩니다.

결론:

<div class="content-ad"></div>

요약하면 `ngAfterContentInit`은 프로젝트된 콘텐츠를 기반으로 초기화 작업을 수행해야 할 때 사용되고, `ngAfterViewInit`은 컴포넌트의 뷰나 자식 뷰에 액세스해야 하는 로직이나 작업을 수행해야 할 때 사용됩니다.

35. Angular에서 뷰 캡슐화(View Encapsulation)란 무엇인가요?

Angular에서 뷰 캡슐화는 스타일이 컴포넌트에 적용되고 범위가 제어되는 기능입니다. 이는 컴포넌트에서 정의된 스타일을 다른 컴포넌트에 영향을 미치지 않도록 캡슐화하는 메커니즘입니다.

기본적으로 Angular은 ViewEncapsulation.Emulated 모드, 즉 "그림자 DOM" 에뮬레이션으로 알려진 모드를 사용합니다. 이 모드에서 Angular는 컴포넌트의 HTML 요소에 고유한 속성을 추가하고 이러한 속성을 사용하여 스타일을 적용함으로써 그림자 DOM의 동작을 모방합니다. 이렇게 함으로써 컴포넌트에서 정의된 스타일은 해당 컴포넌트의 템플릿 내 요소에만 영향을 미치고 응용 프로그램의 다른 부분으로 누출되지 않습니다.

<div class="content-ad"></div>

Angular에는 세 가지 ViewEncapsulation 모드가 있습니다:

- ViewEncapsulation.Emulated (기본값): 이 모드는 구성 요소의 요소에 고유한 속성을 추가하여 그림자 DOM을 에뮬레이트합니다. 구성 요소 템플릿 내에서 정의된 스타일은 해당 구성 요소에만 적용됩니다. ViewEncapsulation.Emulated는 웹사이트의 헤드 섹션에 CSS 스타일을 추가하고 구성 요소의 고유 ID(_ngcontent)를 참조하여 적용합니다.
- ViewEncapsulation.None: 이 모드에서 구성 요소 템플릿에 정의된 스타일은 캡슐화되지 않으며 전체 애플리케이션에 영향을 줄 수 있습니다. 이 모드를 사용할 때 주의해야 하며, 여러 구성 요소가 동일한 스타일을 사용할 때 스타일 충돌과 예기치 않은 부작용이 발생할 수 있습니다.
- ViewEncapsulation.ShadowDom: 이 모드는 네이티브 브라우저의 그림자 DOM 구현을 사용하여 스타일을 캡슐화합니다. 브라우저가 그림자 DOM을 지원해야 합니다. 이 모드에서는 구성 요소의 스타일이 구성 요소 내에서 완전히 격리되어 다른 구성 요소나 전역 스타일에 누출되지 않습니다. ViewEncapsulation.ShadowDom는 구성 요소의 생성된 DOM 내에 CSS 스타일을 추가합니다.

구성 요소의 ViewEncapsulation 모드를 지정하려면 구성 요소의 메타데이터에 `encapsulation` 속성을 사용할 수 있습니다:

```js
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  encapsulation: ViewEncapsulation.Emulated // 또는 ViewEncapsulation.None 또는 ViewEncapsulation.ShadowDom
})
export class MyComponent {
  // 구성 요소 로직을 여기에 작성합니다
}
```

<div class="content-ad"></div>

결론:

Angular에서 ViewEncapsulation을 이해하고 활용함으로써  애플리케이션 내의 컴포넌트간 스타일 간섭을 방지하고 스타일을 더 잘 제어할 수 있습니다.

36. 폴리필의 용도는 무엇인가요?

폴리필은 모든 브라우저에서 지원되지 않는 기능이나 API에 대한 호환성을 제공하는 추가 스크립트입니다. 이러한 스크립트들은 Angular 애플리케이션 빌드 과정에서 자동으로 포함되어 오래된 버전 포함하여 다양한 브라우저에서 애플리케이션이 실행될 수 있도록 합니다.

<div class="content-ad"></div>

폴리필을 사용하는 방법을 설명하기 위한 예제입니다:

- "polyfills.ts" 파일을 엽니다: Angular 프로젝트에서 "polyfills.ts" 파일을 찾아보세요. 이 파일은 일반적으로 "src" 폴더에 위치합니다. 이 파일에는 폴리필 구성이 포함되어 있습니다.
- 필요한 폴리필을 주석 처리하거나 추가합니다: "polyfills.ts" 파일 안에는 필요에 따라 주석 처리하거나 추가할 수 있는 폴리필 목록이 있는 섹션이 있습니다. 각 폴리필은 모든 브라우저에서 지원되지 않을 수 있는 특정 기능이나 API에 해당합니다.

예를 들어, 특정 JavaScript 기능을 지원하지 않는 구형 브라우저를 지원해야한다면, 해당 기능에 대한 폴리필을 주석 처리하거나 추가할 수 있습니다. 모든 브라우저에서 `Array.from` 메서드를 지원하려면 다음 줄을 주석 처리하거나 추가하면 됩니다:

```js
   // 구형 브라우저에서 'Array.from'을 지원하도록하려면 아래 주석을 해제하세요
   // import 'core-js/es/array/from';
```

<div class="content-ad"></div>

이 코드는 `Array.from` 메소드를 네이티브로 지원하지 않는 브라우저에서 작동하도록 하기 위해 "core-js" 라이브러리에서 폴리필을 가져오는 역할을 합니다.

유사하게, 필요한 기능 또는 API를 지원하기 위해 다른 폴리필을 주석 처리하거나 추가할 수 있습니다.

3. 애플리케이션 빌드 및 배포: "polyfills.ts" 파일에 필요한 폴리필을 구성한 후, Angular CLI 또는 선호하는 빌드 프로세스를 사용하여 Angular 애플리케이션을 보통대로 빌드 및 배포할 수 있습니다.

빌드 과정에서 Angular는 지정된 폴리필과 함께 애플리케이션을 번들로 묶습니다. 이러한 폴리필은 브라우저에서 자동으로 로드되어 애플리케이션 코드와 함께 실행됩니다.

<div class="content-ad"></div>

결론:

적절한 폴리필을 포함하여 Angular 애플리케이션은 최신 기능과 API를 활용하면서 이전 버전 포함 넓은 범위의 브라우저와 호환성을 유지할 수 있습니다. 폴리필을 사용하면 응용프로그램이 다양한 브라우저에서 일관되게 동작하여 원활하고 기능적인 사용자 경험을 제공합니다.

브라우저 표준의 진화에 대한 호환성을 확보하고 애플리케이션 성능을 최적화하기 위해 주기적으로 폴리필을 검토하고 업데이트하는 것을 잊지 마세요.

37. RxJS에서 scan 연산자란 무엇인가요?

<div class="content-ad"></div>

RxJS(JavaScript용 반응형 확장)에서 scan 연산자는 옵저버블 시퀀스가 방출하는 값에 대해 누적 작업을 수행하는 데 사용됩니다. JavaScript의 Array.prototype.reduce() 함수와 유사하지만 배열 대신 값의 옵저버블 스트림에서 작동합니다.

scan 연산자는 누산기 함수와 선택적 초기값을 매개변수로 사용합니다. 누산기 함수는 소스 옵저버블이 방출하는 각 값에 대해 호출되며, 직전 누적 값과 소스에서의 현재 값에 기초하여 중간 결과를 누적합니다. 누적된 값은 결과 옵저버블 시퀀스로 방출됩니다.

다음은 scan 연산자의 일반적인 구문입니다:

```js
    const $scanOperator = from([1,2,3,4]).pipe(
      scan((sum,num) => sum+num)
    );

    $scanOperator.subscribe(data=> {
      console.log('scan operator data', data);
    });

 // 출력 :
 // scan operator data 1
 // scan operator data 3
 // scan operator data 6
 // scan operator data 10
```

<div class="content-ad"></div>

노트: scan 연산자에서 중간 결과가 발생하는 반면 reduce 연산자에서는 중간 결과가 발생하지 않고 최종 결과만 발생합니다.

결론:

scan 연산자는 상태를 유지하거나 시간이 지남에 따라 값들을 누적해야 하는 경우 유용합니다. 총 개수 추적, 평균 계산 또는 러닝 토탈을 시뮬레이션하는 경우와 같은 시나리오에 도움이 됩니다.

38. Angular에서 spyOn이 작동하는 방식은 무엇인가요?

<div class="content-ad"></div>

Angular에서 `spyOn`은 Jasmine 테스트 프레임워크에서 제공하는 유틸리티로, 테스트 스파이를 생성하는 데 사용됩니다. 스파이를 사용하면 테스트 중에 함수의 동작을 관찰하고 제어할 수 있습니다. 일반적으로 일부 함수 구현을 사용자 정의 구현으로 대체하거나 함수 호출을 추적하고 그 동작을 확인하는 데 사용됩니다.

## 다음은 Angular에서 `spyOn`이 작동하는 방법을 보여주는 예시입니다:

가정해보겠습니다. 외부 API와 상호 작용하는 `DataService` 서비스가 있다고 가정해 봅시다:

```js
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  fetchData(): Promise {
    return new Promise((resolve) => {
      // 비동기 API 호출을 시뮬레이션
      setTimeout(() => {
        const data = 'API에서 가져온 데이터';
        resolve(data);
      }, 1000);
    });
  }
}
```

<div class="content-ad"></div>

이제 `spyOn`을 사용하여 API 호출을 모의화하는 `DataService`의 단위 테스트를 작성해보겠습니다:

```js
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('API에서 데이터를 가져와야 합니다', () => {
    const apiResponse = '모의 API 응답';
    spyOn(service, 'fetchData').and.returnValue(Promise.resolve(apiResponse));

    service.fetchData().then((data) => {
      expect(data).toBe(apiResponse);
      expect(service.fetchData).toHaveBeenCalled();
    });
  });
});
```

위의 테스트에서는 `DataService`의 `fetchData` 메서드에 스파이를 생성하기 위해 `spyOn` 함수를 사용합니다. `and.returnValue` 메서드는 스파이의 반환 값으로 모의 API 응답을 가진 완료된 프라미스를 지정하는 데 사용됩니다.

그런 다음 `fetchData` 메서드를 호출하고 반환된 데이터가 모의 API 응답과 일치하는지 `expect` 함수를 사용하여 확인합니다. 또한 `toHaveBeenCalled` 매처를 사용하여 `fetchData` 메서드가 호출되었는지 확인합니다.

<div class="content-ad"></div>

`spyOn`을 사용하면 `fetchData` 메소드의 원래 구현을 모의 구현으로 대체하고 테스트 중에 그 동작을 제어할 수 있습니다. 이를 통해 서비스를 격리시키고 실제 API 호출 없이 상호작용을 테스트하는 데 집중할 수 있습니다.

테스트 파일에서 적절한 패키지(`@angular/core/testing`, `jasmine` 등)에서 필요한 테스트 유틸리티(`TestBed`, `spyOn` 등)를 가져와야 합니다.

참고: `spyOn`은 Angular에 특정하지 않으며 Angular 단위 테스트에서 일반적으로 사용되는 Jasmine 테스팅 프레임워크의 일부입니다.

39. Angular에서 HTTP 요청을 모킹하는 방법은 무엇인가요?

<div class="content-ad"></div>

Angular 단위 테스트에서 HTTP 요청을 모의하려면 Angular의 테스트 유틸리티에서 제공하는 `HttpClientTestingModule`과 `HttpTestingController`를 사용할 수 있습니다.

## Angular에서 HTTP 요청을 모의하는 방법을 보여주는 예제입니다:

Angular의 `HttpClient`를 사용하여 HTTP 요청을 하는 `DataService` 서비스가 있다고 가정해 보겠습니다:

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  fetchData(): Promise<string> {
    return this.http.get<string>('https://api.example.com/data').toPromise();
  }
}
```

<div class="content-ad"></div>

이제 `DataService`에 대한 단위 테스트를 작성하고 HTTP 요청을 모의(mock)화해 봅시다:

```js
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('API에서 데이터를 가져와야 합니다', () => {
    const mockResponse = '모의 API 응답';

    service.fetchData().then((data) => {
      expect(data).toBe(mockResponse);
    });

    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
```

위의 테스트에서는 `HttpClientTestingModule`을 가져와 `TestBed.configureTestingModule()`에서 테스트 모듈을 구성하는데 사용합니다. 또한 `HttpTestingController`를 주입하여 HTTP 요청과 상호 작용합니다.

테스트 내에서, `DataService`의 `fetchData` 메서드를 호출하고 응답 데이터를 확인합니다. 그런 다음 `httpMock.expectOne()`을 사용하여 HTTP 요청을 가로채고 `req.flush()`를 사용하여 모의 응답을 반환합니다. 마지막으로, `afterEach` 블록에서 `httpMock.verify()`를 사용하여 예기치 않은 요청이 없는지 확인합니다.

<div class="content-ad"></div>

결론:

`HttpClientTestingModule`과 `HttpTestingController`를 사용하여 HTTP 요청을 모의(mock)하고 응답을 제어할 수 있으므로 실제 API 호출 없이도 서비스의 동작을 테스트할 수 있습니다. 주의: 필요한 테스트 유틸리티(`TestBed`, `HttpClientTestingModule`, `HttpTestingController` 등)를 테스트 파일에서 적절한 파키지(`@angular/core/testing`, `@angular/common/http/testing` 등)에서 가져와야 합니다.

40. RxJS에서 reduce 연산자란 무엇인가요?

RxJS에서 reduce 연산자는 옵저버블 시퀀스가 방출하는 값에 누적 함수를 적용하고 하나의 누적된 결과를 방출하는 데 사용됩니다. 이는 JavaScript의 Array.prototype.reduce() 함수와 유사합니다.

<div class="content-ad"></div>

reduce 연산자는 누적기 함수와 선택적으로 초기값을 매개변수로 사용합니다. 누적기 함수는 원본 옵저버블에서 발행된 각 값에 대해 호출되며, 이전 누적 값과 현재 값에 기반하여 중간 결과를 누적합니다. 그리고 누적된 값은 원본 옵저버블이 완료될 때 최종 결과로 발행됩니다.

아래는 reduce 연산자의 일반적인 구문입니다:

```js
const $reduceOperator = from([1,2,3,4]).pipe(
    reduce((sum, num) => {
      return sum + num;
    })
  );

$reduceOperator.subscribe(data => {
  console.log('reduce operator data', data); 
})

// 출력
// reduce operator 데이터 10
```

참고: reduce 연산자에서는 중간 결과가 발행되지 않고 최종 결과만 발행되지만, scan 연산자는 중간 결과가 발행됩니다.

<div class="content-ad"></div>

결론:

reduce 연산자는 값의 시퀀스에서 단일 누적 결과를 얻고 싶을 때 유용합니다. 값들을 더하거나 최댓값 또는 최솟값을 찾는 등의 계산에 주로 사용되며, 방출된 값에 대한 기타 축소 연산을 수행할 때 자주 사용됩니다.

41. Angular에서 trackBy의 사용 목적은 무엇인가요?

Angular에서 `trackBy` 함수는 `ngFor` 지시문과 함께 사용되어 항목 목록을 렌더링할 때 성능을 개선하는 데 사용됩니다. `trackBy` 함수를 제공함으로써 Angular은 변경이 발생할 때 전체 목록을 다시 렌더링하는 대신 목록의 개별 항목을 추적하고 업데이트할 수 있습니다.

<div class="content-ad"></div>

`trackBy` 함수는 리스트 내 항목의 인덱스와 항목 자체 두 개의 인자를 사용합니다. 각 항목에 대한 고유 식별자를 반환해야 합니다. Angular는 이 식별자를 사용하여 항목을 추적하고 리스트 내에서 변경되거나 이동했는지를 확인합니다.

아래는 `trackBy`를 `ngFor` 반복문에서 사용하는 예시입니다:

```js
<!-- my-component.component.html -->
<ul>
  <li *ngfor="let item of items; trackBy: trackByFn">{ item.name }</li>
</ul>
```

```js
// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  trackByFn(index: number, item: any): number {
    return item.id; // 각 항목에 대한 고유 식별자
  }
}
```

<div class="content-ad"></div>

이 예제에서 `trackByFn` 함수는 각 항목의 `id` 속성을 고유 식별자로 반환합니다. Angular는 변경 사항이 발생할 때 항목을 추적하고 DOM을 효율적으로 업데이트하기 위해 이 식별자를 사용합니다.

`trackBy`를 사용함으로써 Angular는 항목이 추가, 제거 또는 이동될 때 전체 목록을 다시 렌더링하고 업데이트하는 것을 피합니다. 대신 변경된 특정 항목만 업데이트하여 성능이 향상되고 대량 목록을 다룰 때 더 부드러운 사용자 경험을 제공합니다.

참고:

`trackBy` 함수가 반환하는 고유 식별자는 각 항목에 대해 변경되지 않아야 합니다. 항목이 업데이트될 때 식별자가 변경되면 Angular은 새 항목으로 간주하여 다시 렌더링합니다. 따라서 데이터 원본에서 고유 ID와 같이 항목의 수명 동안 변경되지 않는 식별자를 사용하는 것이 좋습니다.

<div class="content-ad"></div>

알아두시면 좋은 사항:

- 신입 개발자를 위한 Angular 면접 질문

- 3년 경력자를 위한 Angular 면접 질문