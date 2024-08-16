---
title: "앵귤러 신호 컴포넌트 입력을 위한 새로운 시대"
description: ""
coverImage: "/assets/img/2024-05-27-AngularSignalsANewEraforComponentInputs_0.png"
date: 2024-05-27 19:00
ogImage: 
  url: /assets/img/2024-05-27-AngularSignalsANewEraforComponentInputs_0.png
tag: Tech
originalTitle: "🚦Angular Signals: A New Era for Component Inputs"
link: "https://medium.com/javascript-in-plain-english/angular-signals-a-new-era-for-component-inputs-f762d06eb8b1"
isUpdated: true
---




## 안녕하세요 👋

이 문서는 시그널에 사용되는 새로운 입력 API에 대해 소개하고 있습니다. 시그널을 사용하여 Angular 앱 내에서 통신을 활성화하기 위해 사용되는 모든 새로운 API에 대해 이미 다뤘습니다. 아래에는 Angular 앱 내에서 시그널을 사용하여 통신하는 새로운 방법에 대해 더 자세히 알아볼 수 있는 구체적인 예제가 있습니다:

이전에 언급했듯이, 이 문서는 특히 새로운 입력 API에 대한 간략한 개요를 제공하는 데 초점을 맞추고 있습니다.

기존 Angular은 컴포넌트 입력을 처리하기 위해 setter나 ngOnChanges를 사용합니다. 이러한 방법은 작동하지만 명령형 스타일에 의존합니다.

<div class="content-ad"></div>

➡️ 신호 입력:

- 신호 입력은 구성 요소 입력을 관리하는 선언적인 방법을 제공합니다.
- 입력 값이 변경될 때 Angular에게 통지함으로써 반응적인 접근 방식을 제공합니다.
- 이를 통해 더 세밀한 변경 감지와 효율적인 업데이트가 가능해집니다.

➕ 신호 입력의 장점:

- 성능 향상: 변경 감지가 최적화되어 불필요한 다시 렌더링을 최소화하며, Angular 앱의 존리스 이동에 중요한 역할을 합니다.
- 단순화된 코드: 코드가 더 깨끗하고 이해하기 쉬워집니다.
- 증진된 반응성: 신호는 계산 및 효과와 같은 Angular의 반응적 기능과 원활하게 통합됩니다.

<div class="content-ad"></div>

🗝️ 중요한 개념:

- input: 입력 속성을 위한 신호를 생성합니다 (예시).
- computed: 기존 신호로부터 새 값을 파생합니다 (예시).
- effects: 신호 변경으로 인해 트리거된 부작용을 실행합니다 (더 자세한 내용은 여기에서 찾을 수 있습니다).

```js
...
export class AComponent {
  
  anInput = input.required<number>();
      
  constructor(){
    // ⚠️ 주입 환경에서 호출되어야 합니다
    effect(() => console.log(this.anInput());
  }

...
}
```

- 선택적 및 필수 입력: 신호는 초기값과 함께 선택적이거나 필수로 지정할 수 있습니다 (예시).
- 입력 변환: 입력 신호는 입력 값의 의미를 변경하지 않고 강제 혹은 구문 분석이 필요할 때 변환될 수 있습니다.

<div class="content-ad"></div>

```js
...
export class AComponent {

  disabled = input(false, {
    transform: (value: boolean|string) => typeof value === 'string' ? value === '' : value,
  });

}

// In consumer cmp
<a-cmp disabled />
```

- Input Aliasing: 신호를 사용하면 입력 속성에 별칭을 지정할 수 있습니다. (자세한 내용은 여기에서 찾을 수 있습니다)

```js
@Component({
  standalone: true,
  selector: 'a-cmp',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AComponent {
  
  aName= input.required<string>({alias: 'aliasName'});
...
}

// a-cmp 소비자
<a-cmp [aliasName]="'a name'" />
```

🎬 신호 입력을 실행하는 중:

<div class="content-ad"></div>

- 시그널로 라우트 파라미터에 액세스: 라우터에 withComponentInputBinding 옵션을 활성화하여 반응형 시그널로 라우트 파라미터에 액세스할 수 있습니다.

```js
// 1 - 앱 구성 파일( AppModule에서도 제공할 수 있음)
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())]
};

// 2 - 라우트 내부
const routes: Routes = [
  {
    title: 'Route X',
    path: 'route-x/:id',
    component: AComponent
  },
  ...
]

// 3 - AComponent 내부
id = input<string>(); // 👈 이제는 라우트 파라미터에서 id 값을 추출할 필요가 없습니다
```

- 시그널로 데이터 가져오기: 시그널을 사용하여 서비스에서 데이터를 가져올 수 있습니다.

```js
@Component({
  standalone: true,
  selector: 'a-cmp',
  template: `{ data() }`,
})
export default class AComponent {
  private readonly aService = inject(AService);

  id = input.required<string>();
  
  /*💡toSignal로 생성된 구독은 toSignal을 호출하는 컴포넌트 또는 서비스가 제거될 때 주어진 Observable에서 자동으로 구독을 해제합니다.*/
  data = toSignal(this.aService.getData(i), {initialValue: []}); // 👈 toSignal 사용 예시
}
```

<div class="content-ad"></div>

- 복잡한 시나리오: toSignal이 강력하긴 하지만, Observables를 사용해야 하는 특정 상황이 있습니다. 이는 주로 RxJS 연산자를 활용하여 데이터를 보다 효과적으로 처리하는 데 도움이 되기 때문입니다. 이를 위해 필요한 모든 프로세스를 처리하고 데이터를 신호로 쉽게 추적할 수 있는 스트림을 생성하는 toObservable 유틸리티를 사용할 수 있습니다. 다음 예시는 id 입력이 변경될 때마다 가장 최신의 새로운 id를 기반으로 즉시 getData으로 전환하고 싶을 때 간단한 케이스를 제공합니다.

```js
...
@Component({
  standalone: true,
  selector: 'a-cmp',
  template: `{ data() }`,
})
export default class AComponent {
  private readonly aService = inject(AService);

  id = input.required<string>();

  /* id 신호가 변경될 때, toObservable(this.id)는 가장 최신의 id를 발행하고 서비스의 getData(id) 함수를 트리거합니다. */
  data = toSignal(
      toObservable(this.id) // 👈 toObservable 사용
        .pipe(
          switchMap((i) => this.aService.getData(i))
        )
      );
}
```

🎯 신호 입력 이상:

이 새로운 API는 Angular 애플리케이션의 반응성과 효율성을 향상시키는 데 중요한 역할을 합니다. 이것들은 더 간단하고 반응적인 컴포넌트 디자인을 생성할 수 있게 해주며, zoneless 애플리케이션을 구축하는 데 필수적입니다.

<div class="content-ad"></div>

최종 목표는 미래에 존리스(Zoneless) 모드의 보급을 촉진하는 것입니다. 특히, 이 기능을 지원하는 실험적 API는 이미 Angular의 최신 버전(현재 버전 17)에서 사용할 수 있습니다(첫머리에서 언급된 글을 참조하세요).

여기까지가 이 기사의 내용입니다. 마음에 드셨으면 좋겣어요. 만약 이 형식을 좋아하시고 이와 유사한 간결하고 명료한 기사를 더 원하신다면 알려주세요.

오늘은 여기까지, 안녕🙋

질문이나 피드백이 있으면 댓글을 남기거나 LinkedIn을 통해 저에게 연락해주세요 — 기다리고 있겠습니다!

<div class="content-ad"></div>

부지런히 커피 한 잔 사 줄래요? ☕️

만약 제 글을 좋아하셨다면 👏, 공유 🔗, 그리고 최신 글을 받기 위해 구독 🔔 해주세요.

저와 소통하고 싶다면 Medium, Linkedin, Facebook, Instagram, YouTube, 또는 Twitter에서 연락해 주세요.

# 쉬운 용어로 🚀

<div class="content-ad"></div>

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 반드시 작가를 박수치고 팔로우하세요 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요