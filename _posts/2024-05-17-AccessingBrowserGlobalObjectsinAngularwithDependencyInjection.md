---
title: "Angular에서 의존성 주입 Dependency Injection을 사용하여 브라우저 글로벌 객체에 접근하기"
description: ""
coverImage: "/assets/img/2024-05-17-AccessingBrowserGlobalObjectsinAngularwithDependencyInjection_0.png"
date: 2024-05-17 21:15
ogImage: 
  url: /assets/img/2024-05-17-AccessingBrowserGlobalObjectsinAngularwithDependencyInjection_0.png
tag: Tech
originalTitle: "Accessing Browser Global Objects in Angular with Dependency Injection"
link: "https://medium.com/@monsieur_ricky/accessing-browser-global-objects-in-angular-with-dependency-injection-3ebc9d764e84"
isUpdated: true
---




<img src="/assets/img/2024-05-17-AccessingBrowserGlobalObjectsinAngularwithDependencyInjection_0.png" />

Angular 애플리케이션에서는 종종 네이티브 브라우저 API 또는 window나 document와 같은 전역 객체와 상호 작용해야 할 때가 있습니다. 이러한 객체들을 직접 참조할 수는 있지만, 권장되지 않습니다. 왜냐하면 이는 더 강한 결합을 유발하고, 테스트하기 어렵게 만들며, 코드를 특정 플랫폼(즉, 브라우저)에 종속시키기 때문입니다.

이것이 의존성 주입 (DI)가 구원해주는 곳입니다...

# Angular의 Document 토큰

<div class="content-ad"></div>

Angular에서는 브라우저의 문서 객체를 주입할 수 있는 DOCUMENT 토큰이 있습니다. 이 토큰은 Angular의 platform-browser 패키지의 일부이며, 앱이 서버 또는 브라우저에서 실행 중인지에 관계없이 적절한 객체를 제공할 것입니다.

다음 예제는 COMPONENT에서 DOCUMENT 토큰을 주입하고 해당 함수 중 하나에 접근하는 방법을 보여줍니다:

```js
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export class TestComponent {
  private readonly document = inject(DOCUMENT);

  reloadPage(): void {
    this.document?.location?.reload();
  }
}
```

이 전 예제는 매우 간단합니다: Angular의 DOCUMENT 토큰을 가져와 주입하고, 브라우저의 위치 속성에 접근하며 다시로드하는 방법을 실행합니다.

<div class="content-ad"></div>

# 창 속성 접근

창 속성에 접근해야 할 경우, 동일한 DOCUMENT 토큰을 사용해야 합니다:

```js
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export class TestComponent {
  private readonly document = inject(DOCUMENT);
  private readonly window = this.document?.defaultView

  getLanguage(): string {
    return this.window?.navigator?.language
  }
}
```

주입된 DOCUMENT를 활용하여, defaultView 속성을 통해 창 객체에 접근할 수 있습니다. 이를 통해 모든 기능과 객체에 접근할 수 있습니다. 이 구체적인 예제에서는 브라우저 사용자 인터페이스의 언어를 나타내는 문자열을 제공하는 navigator 객체를 가져옵니다.

<div class="content-ad"></div>

이 방식은 이제 브라우저별 API와 작업하는 것이 훨씬 쉽고 안전해졌어요. 그러나 window 객체를 자주 사용해야 하는 상황이 생기면 사용자 정의 토큰을 만들 수도 있어요.

# 사용자 정의 Window 토큰

다음 예에서는 Angular의 DOCUMENT와 비슷한 커스텀 WINDOW 토큰을 생성하고 프로젝트 전반에 걸쳐 사용하는 방법을 보여줍니다:

```js
// browser-global-tokens.ts
import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

/**
 * 전역 window 객체를 위한 인젝션 토큰.
 */
export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: (): Window => inject(DOCUMENT)?.defaultView
});
```

<div class="content-ad"></div>

위의 코드 스니펫은 팩토리 함수를 사용하여 생성된 WINDOW이라는 인젝션 토큰을 정의합니다. 이 함수는 inject(DOCUMENT).defaultView를 사용하여 DOCUMENT 객체의 defaultView 속성을 검색하며, Angular 애플리케이션 내에서 의존성 주입(DI)을 통해 윈도우 객체에 접근할 수 있도록 합니다.

새로운 WINDOW 토큰을 사용하여 TestComponent 예제를 업데이트해 보겠습니다:

```js
import { WINDOW } from './browser-global-tokens.ts';
import { inject } from '@angular/core';

export class TestComponent {
  private readonly window = inject(WINDOW);

  getLanguage(): string {
    return this.window?.navigator?.language
  }
}
```

우리의 WINDOW 토큰을 직접 사용하여 브라우저의 언어에 액세스하는 코드를 약간 단순화할 수 있었습니다.

<div class="content-ad"></div>

# 결론

Angular의 의존성 주입 메커니즘을 활용하여 window와 같은 전역 객체를 안전하고 유지보수가 용이하게 애플리케이션에 주입하는 방법을 살펴보았습니다. 주입 토큰과 팩토리 함수를 사용하여 이러한 전역 객체를 우리의 코드에 매끄럽게 통합할 수 있으며 Angular의 최상의 관행을 준수할 수 있습니다.

Angular 애플리케이션에서 전역 객체에 직접 접근을 피하는 것은 좋은 코드 구성 및 테스트 가능성을 촉진할 뿐만 아니라 유형 안정성 및 크로스 플랫폼 호환성을 향상시킵니다.