---
title: "Angular의 inject 함수 사용으로 1000줄의 코드를 절약한 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-HowUsingAngularsinjectFunctionHasSavedMe1000LinesofCode_0.png"
date: 2024-07-07 21:51
ogImage:
  url: /assets/img/2024-07-07-HowUsingAngularsinjectFunctionHasSavedMe1000LinesofCode_0.png
tag: Tech
originalTitle: "How Using Angular’s inject() Function Has Saved Me 1000 Lines of Code"
link: "https://medium.com/javascript-in-plain-english/how-using-the-angulars-inject-function-has-saved-me-1000-lines-of-code-82b699183da8"
---

# inject() 함수란 무엇인가요?

Angular 14에서 소개된 inject() 함수는 서비스, 컴포넌트, 디렉티브 등에 종속성을 주입하는 데 사용됩니다. 클래스 생성자를 사용하여 종속성을 주입하는 대신 inject() 함수를 사용할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-07-HowUsingAngularsinjectFunctionHasSavedMe1000LinesofCode_0.png)

## 생성자를 사용하여 종속성을 주입하는 예전 방식:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
import { Component } from '@angular/core';

@Component({ /* ... */ })
export class MyComponent {
  constructor(
    @Inject(SOME_TOKEN) private readonly someToken: string,
    private readonly myService: MyService,
    private readonly httpClient: HttpClient,
  ) {}
}
```

## inject() 함수를 사용한 의존성 주입의 새로운 방법:

```js
import { Component, inject } from '@angular/core';

@Component({ /* ... */ })
export class MyComponent {
  private readonly someToken = inject(SOME_TOKEN);
  private readonly myService = inject(MyService);
  private readonly httpClient = inject(HttpClient);
}
```

# inject() 사용의 장점 vs 생성자 사용하기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

주목하신 대로, 생성자 대신 inject()을 사용하는 것에는 여러 가지 장점이 있습니다:

- 코드를 더 깔끔하고 가독성이 좋고 일관성 있게 만듭니다 (토큰 vs 서비스 주입 시에도)
- 타입이 자동으로 추론되어 수동으로 지정할 필요가 없습니다
- 상속이 간편하고 덜 장황합니다 (자세한 내용은 아래에서 설명)

# 더 나은 상속

저는 상속과 관련된 경우 inject() 함수가 특히 유용하다고 생각합니다. 코드를 재사용하고 여러 자식 클래스에 의해 확장될 부모 서비스 추상 클래스가 있는 시나리오를 고려해 보세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
export abstract class ParentService {
  constructor(
    protected readonly configKey: string,
    protected readonly httpClient: HttpClient,
    protected readonly helperService: HelperService,
  ) {}

  // ... some code here that will be reused in the children of ParentService
}
```

ParentService의 하위 클래스는 다음과 같이 확장됩니다:

```js
@Injectable({ providedIn: 'root' })
export class ChildService extends ParentService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly helperService: HelperService,
  ) {
    super('my-config-key', httpClient, helperService);
  }

  // ... some child-specific code here
}
```

보시다시피 많은 반복이 있습니다: 모든 자식 클래스들은 HttpClient와 HelperService를 가져와야 하는데 이는 ParentService의 생성자가 필요하기 때문입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

inject() 함수 덕분에 이 불필요한 반복을 피할 수 있어요:

```js
export abstract class ParentService {
  protected abstract readonly configKey: string; // "abstract"을 사용하여 자식 클래스가 이 필드를 초기화하도록 강제합니다
  protected readonly httpClient = inject(HttpClient);
  protected readonly helperService = inject(HelperService);

  // ... 부모 서비스의 자식에서 재사용될 코드가 있습니다 ...
}

@Injectable({ providedIn: 'root' })
export class ChildService extends ParentService {
  protected readonly configKey = 'my-config-key';

  // ... 자식에만 해당하는 코드가 있습니다
}
```

결과적으로 코드가 훨씬 깔끔해지고 반복을 피할 수 있습니다: ParentService의 자식들은 HttpClient 및 HelperService를 가져와 부모에게 전달할 필요가 없지만, 필요한 경우에 this.httpClient 및 this.helperService에 액세스 할 수 있습니다.

의존성이 많고 많은 자식이 기본 클래스를 확장하는 시나리오를 상상해보세요, inject()를 사용하면 많은 코드 라인을 절약할 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 실제 사용 사례 예

2019년에 Angular을 사용하여 구축한 오래된 프로젝트를 리팩토링할 때 inject() 함수를 사용했습니다. 생성자를 없애거나 사용을 줄이는 것만으로 약 1000줄 이상의 코드를 제거할 수 있었습니다. 변경 내용은 이 커밋에서 확인할 수 있습니다.

네, 무엇을 생각하고 계시는지 알겠어요. 상속 대신 구성을 고려해볼 수 있었다는 주장을 할 수 있겠지만, 이에 대한 논의는 이 글의 범위를 벗어납니다.

# 결론

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- inject() 함수는 일반적으로 생성자를 사용하는 것보다 선호되는 의존성을 효율적이고 현대적인 방법으로 주입해주는 기능을 제공합니다.
- inject()를 사용하도록 코드베이스를 마이그레이션하는 것이 쉽고, 특히 상속을 다루어야 할 때 유용할 것입니다.
- 기존 레거시 프로젝트에서도 gradually(점진적으로) inject()를 채택할 수 있으며, 코드베이스를 한꺼번에 마이그레이션할 필요가 없습니다.
