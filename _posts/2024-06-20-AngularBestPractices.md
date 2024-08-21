---
title: "앵귤러 최고의 권장사항"
description: ""
coverImage: "/assets/img/2024-06-20-AngularBestPractices_0.png"
date: 2024-06-20 00:18
ogImage:
  url: /assets/img/2024-06-20-AngularBestPractices_0.png
tag: Tech
originalTitle: "Angular Best Practices"
link: "https://medium.com/@indrajitsaha7597/angular-best-practices-cd200719233d"
isUpdated: true
---

![Angular Best Practices](/assets/img/2024-06-20-AngularBestPractices_0.png)

안녕하세요, 개발자 여러분! Angular 개발에서 더 일관된 코딩 스타일을 찾고 계신가요? Angular 애플리케이션의 성능을 향상시키고 싶으신가요? 그렇다면 이 문서가 여러분을 위한 것입니다! 여기에서 Angular 개발자를 위한 스타일 가이드, 최고의 실천 방법 및 팁을 공유하겠습니다. 이를 통해 여러분의 Angular 프로젝트를 성능적이고 깔끔하게 유지할 수 있습니다.

- 모듈화 아키텍처:
  확장성에 있어서 모듈화는 매우 중요합니다. 코드를 기능 모듈로 구성하고 각 모듈에 명확한 책임과 정의된 인터페이스를 부여하세요. 이는 코드 재사용, 관리 가능성 및 확장성을 촉진합니다.

- 일관된 폴더 구조:
  표준화된 폴더 구조는 코드 조직화를 더 잘 할 수 있게 하며 팀원들 간의 원활한 협업을 촉진합니다. 파일을 논리적으로 분류하고 컴포넌트, 서비스, 모듈 및 기타 리소스에 특정 디렉토리를 할당함으로써, 개발자가 응용 프로그램의 아키텍처를 효율적으로 탐색할 수 있는 명확한 지도를 만듭니다. 이러한 조직화된 접근 방식은 관련 코드 세그먼트에 신속하게 액세스할 수 있게 하며 응용 프로그램 구조를 쉽게 이해할 수 있도록 도와줍니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
src | (data - access) | auth | facade;
auth.facade.ts | gateway;
auth.gateway.ts | feature | auth | login;
login.component.ts;
login.component.html;
login.component.scss;
auth.module.ts;
```

3. 반응형 프로그래밍:
   RxJS 및 Angular Forms API와 같은 도구를 활용하여 데이터 및 이벤트 스트림을 효율적으로 처리하십시오. 이를 통해 코드의 간결성, 반응성 및 유지 관리성이 향상됩니다.

```js
// search.component.ts
this.search.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query: string) => this.apiService.search(query))
  )
  .subscribe((result: string[]) => {
    this.items = result;
  });
```

4. 지연 로딩:
   필요할 때에만 모듈을 지연로딩하여 성능을 향상시키십시오. 이는 초기 로드 시간을 줄이고 사용자 경험을 향상시킵니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", loadChildren: () => import("./about/about.module").then((m) => m.AboutModule) },
];
```

5. Ahead-of-Time Compilation (AOT):
   애헤드 오브 타임(AOT) 컴파일:
   빌드 프로세스 중에 AOT 컴파일을 활성화하여 애플리케이션 성능과 보안을 향상시킵니다.

```bash
ng build --prod --aot
```

6. Change Detection Strategy OnPush:
   변경 감지 전략 OnPush:
   변경 감지는 Angular에서 근본적인 메커니즘으로, 애플리케이션 성능에 깊은 영향을 미칩니다. 이는 애플리케이션 데이터의 변화를 감지하고 이후에 뷰를 업데이트하는 것을 포함합니다. 기본적으로 Angular는 'Default' 변경 감지 전략을 사용하며, 이는 상당한 자원 소모를 요구할 수 있습니다. 그러나 'OnPush' 변경 감지 전략을 채택하여 성능을 최적화하는 것이 가능합니다. 'OnPush'를 사용하면 변경 사항이 컴포넌트의 입력 속성이 수정될 때나 이벤트가 트리거될 때에만 감지됩니다. 아래는 'OnPush' 전략의 구현을 보여줍니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `
    <div>{ item.name }</div>
    <div>{ item.price | currency }</div>
    <button (click)="addToCart()">Add to Cart</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item: Item;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addItem(this.item);
  }
}
```

7. 반응형 폼:
   Angular 반응형 폼은 Angular 애플리케이션에서 동적이고 인터랙티브한 폼을 만들기 위한 견고한 매커니즘을 제공합니다. 템플릿 기반 폼과 달리 반응형 폼은 프로그래밍적으로 생성되어 폼 동작 및 유효성 검사에 대한 더 큰 유연성과 제어를 제공합니다. 반응형 폼을 사용하면 개발자들은 유지 보수성과 확장성을 보장하면서 쉽게 복잡한 폼을 생성할 수 있습니다.

```js
// contact.component.ts
this.contactForm = this.formBuilder.group({
  name: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
  message: ["", Validators.required],
});
```

8. 스마트 및 덤 컴포넌트:
   스마트 및 덤 컴포넌트 패턴을 채택하여 역할을 분리하세요. 스마트 컴포넌트는 애플리케이션 상태를 관리하고, 덤 컴포넌트는 표현에 집중합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// todo-list-container.component.ts
export class TodoListContainerComponent {
 todos$: Observable<Todo[]>;
 constructor(private todoService: TodoService) { … }
}
// todo-list.component.ts
export class TodoListComponent {
 @Input() todos: Todo[];
}
```

9. Angular Material을 사용하여 UI 구성 요소:
   Material Design 가이드라인을 기반으로 사전 제작 및 사용자 정의 가능한 UI 구성 요소에 Angular Material을 사용하십시오. 이는 현대적이고 일관된 UI를 보장합니다.

```js
ng add @angular/material
```

10. 단위 테스트 작성:
    컴포넌트, 서비스 및 응용 프로그램의 다른 부분에 대한 단위 테스트를 작성하여 코드 품질과 유지 관리를 보장하십시오.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
// my.component.spec.ts
describe('MyComponent', () => {
  ...
});
```

11. Angular CLI 사용법:
    Angular CLI를 활용하여 Angular 애플리케이션을 생성, 관리 및 빌드할 수 있습니다. 이를 통해 개발 작업을 간편화하고 최적의 관행을 준수할 수 있습니다.

```js
ng generate component my-component
ng test
ng build
```

결론:
이 11가지 모범 사례를 준수함으로써 확장 가능하고 유지보수가 용이하며 성능이 우수한 Angular 애플리케이션을 개발할 수 있습니다. 이러한 모범 사례에 더불어 Git과 같은 버전 관리 시스템을 사용해야 합니다. 계속해서 개발 관행을 검토하고 업데이트하여 발전하는 표준을 수용하고 애플리케이션 성능을 최적화해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

더 읽을 거리:

피드백:
만약 이 안내서가 도움이 되었다면, 공유해주시고 향후 개선을 위한 피드백을 제공해주십시오. 읽어주셔서 감사합니다!
