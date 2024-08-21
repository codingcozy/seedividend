---
title: "Angular v18 출시 최신 기능 알아보기"
description: ""
coverImage: "/assets/img/2024-06-22-Angularv18isnowavailable_0.png"
date: 2024-06-22 04:58
ogImage:
  url: /assets/img/2024-06-22-Angularv18isnowavailable_0.png
tag: Tech
originalTitle: "Angular v18 is now available!"
link: "https://medium.com/angular-blog/angular-v18-is-now-available-e79d5ac0affe"
isUpdated: true
---

오늘은 Angular 진화의 다음 단계를 공유하게 되어 흥분됩니다! 지난 세 번의 릴리스 동안 새로운 기능과 개선사항을 많이 소개했습니다. 이번에는 새로운 API 중 많은 부분을 안정 버전으로 승격하고, 개발자의 요청에 맞는 기능을 해결하며, 열망했던 로드맵 프로젝트 중 하나인 zoneless change detection을 실험적으로 출시했습니다.

![Angularv18isnowavailable_0.png](/assets/img/2024-06-22-Angularv18isnowavailable_0.png)

이번 릴리스의 하이라이트는 다음과 같습니다:

- zoneless change detection에 대한 실험적 지원
- Angular 개발자를 위한 새로운 홈페이지인 Angular.dev
- Material 3, deferrable views, 내장 제어 흐름이 안정화되었으며 여러 개선사항이 포함되어 있습니다
- i18n 수분화 지원, 더 나은 디버깅, Angular Material의 수분화 지원, Google 검색과 동일한 라이브러리를 통해 구동되는 이벤트 재생을 통한 서버사이드 렌더링 개선내용

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

시각적 개요를 위해 릴리스 이벤트에서 비디오를 확인해보세요:

# 진화하는 변경 감지

과거에는 zone.js라는 라이브러리가 Angular의 변경 감지를 트리거하는 역할을 했습니다. 이 라이브러리는 개발자 경험과 성능 면에서 몇 가지 단점이 있었습니다. 몇 년 동안 zone.js에 의존하지 않고 Angular를 사용하는 방법을 찾고 있었으며, 우리는 zoneless의 첫 실험적 API를 공유할 수 있어 매우 흥분합니다!

오늘부터 Angular에서 실험적인 zoneless 지원을 시도해 볼 수 있습니다! 애플리케이션 부트스트랩에 provideExperimentalZonelessChangeDetection을 추가해 보세요.

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
bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()],
});
```

위와 같은 프로바이더를 추가한 후에는 angular.json 파일에서 폴리필에 있는 zone.js를 제거해주세요.

앞으로 나아가 zoneless는 개발자들에게 많은 가능성을 제공합니다:

- 마이크로 프론트엔드 및 다른 프레임워크와의 상호 운용성을 향상시킴
- 더 빠른 초기 렌더링 및 실행
- 더 작은 번들 크기 및 빠른 페이지 로딩
- 더 가독성이 좋은 스택 트레이스
- 더 간단한 디버깅

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

컴포넌트에서 zoneless를 사용하는 가장 좋은 방법은 signals로 처리하는 것입니다:

```js
@Component({
  ...
  template: `
    <h1>Hello from { name() }!</h1>
    <button (click)="handleClick()">Go Zoneless</button>
  `,
})
export class App {
  protected name = signal('Angular');

  handleClick() {
    this.name.set('Zoneless Angular');
  }
}
```

위 예시에서 버튼을 클릭하면 handleClick 메소드가 호출되어 신호 값이 업데이트되고 UI도 갱신됩니다. 이는 zone.js를 사용하는 응용 프로그램과 유사하게 작동하지만 몇 가지 차이점이 있습니다. zone.js를 사용하면 Angular은 응용 프로그램 상태가 변경될 때마다 변경 감지를 수행했습니다. 그러나 zone 없이는 Angular이 신호 업데이트와 같은 적은 트리거에 대해서만 변경 감지를 제한합니다. 이 변경에는 변경을 여러 번 연속으로 확인하는 것을 피하기 위한 코얼리싱을 포함한 새로운 스케줄러도 포함되어 있습니다.

위의 버튼을 클릭하면 Angular이 코얼리싱을 통해 변경 감지를 한 번만 실행합니다. 더 많은 정보는 당사의 문서에서 zoneless를 배우세요.

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

# 존리스로 업데이트 중

요즘 Angular는 흥미로운 진화를 거치고 있는데, 존리스는 그 핵심 요소 중 하나입니다. 프레임워크를 발전시키면서 모든 기존 API가 예상대로 작동하고 Angular에 도입하는 새로운 기능과의 호환성이 잘 유지되도록 하고 있습니다.

존리스는 우리의 호환성 접근 방식의 또 다른 예입니다. 게다가, 기존 애플리케이션을 존리스로 이전하는 과정이 가능한 간단해지도록 하고자 했습니다. Angular의 ChangeDetectionStrategy.OnPush 변경 감지 전략과 호환되는 경우, 구성 요소는 존리스와 대부분 호환되어 변환이 매끄럽게 진행될 것입니다!

# 기본값으로 병합하기

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

v18부터는 존이 없는 앱과 zone.js를 사용하며 coalescing이 활성화된 앱에 대해 동일한 스케줄러를 사용하고 있습니다. 새로운 zone.js 앱의 변경 감지 주기 수를 줄이기 위해 우리는 기본적으로 zone coalescing을 활성화했습니다.

이 동작은 이전 변경 감지 동작에 의존하는 앱에서 버그를 발생시킬 수 있기 때문에 새로운 애플리케이션에 대해서만 활성화됩니다. Coalescing은 불필요한 변경 감지 주기를 줄이고 일부 애플리케이션의 성능을 크게 향상시킵니다.

기존 프로젝트에 이벤트 coalescing을 적용하려면, bootstrapApplication에서 NgZone 프로바이더를 구성하세요:

```js
bootstrapApplication(App, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
});
```

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

# 네이티브 await을 사용하여 Zone이 필요 없는 앱

Zone.js는 Angular의 변경 감지를 위해 많은 브라우저 호출을 가로챕니다. 그러나 async/await은 zone.js가 monkey patch할 수 없는 API 중 하나이기 때문에 Angular CLI를 통해 promises로 다운레벨해야 합니다. 이것은 모든 최신 브라우저가 지원하는 비동기/대기(async/await)를 promises보다 더 표현력이 있고 JavaScript 런타임에서 최적화되었다는 점에서 최적이 아닙니다.

오늘날, 실험적인 zoneless change detection을 사용하는 앱을 만들면 Angular CLI는 네이티브 async/await을 사용하여 promises로 다운레벨링하지 않습니다. 이것은 디버깅을 개선하고 번들 크기를 줄일 것입니다.

# 컴포넌트들은 Zone을 지원합니다

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

Angular CDK와 Angular Material에서 Zoneless 지원을 활성화했습니다. 이로 인해 Zoneless 모델의 일부 문제점을 발견하고 개선할 수 있었습니다.

# Angular 개발자를 위한 새로운 홈

지난 18개월 동안 우리는 angular.dev에서 직관적이고 실용적인 시작하는 과정을 제공하고 깊이 있는 안내서를 개선하기 위해 많은 노력을 기울였습니다. 오늘, 우리는 angular.dev이 Angular의 공식 문서 웹사이트로 지정되었음을 기쁘게 알려드립니다!

새롭고 현대적인 느낌뿐만 아니라 WebContainers를 기반으로 한 대화형 실습 튜토리얼, 예제와 함께 제공되는 대화형 플레이그라운드, Algolia를 통해 구동되는 개선된 검색, 업데이트된 안내서, 간소화된 내비게이션 등이 추가되었습니다!

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

<img src="/assets/img/2024-06-22-Angularv18isnowavailable_1.png" />

angular.io의 모든 요청이 이제 자동으로 angular.dev로 리디렉션됩니다. 모든 기존 링크가 계속 작동하도록 하기 위해 개발자를 v17.angular.io로 리디렉션합니다.

angular.dev로 가서 확인해보세요!

# Material 3이 이제 안정화되었습니다!

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

몇 달 전에 저희는 Material 3에 대한 실험적인 지원을 소개했어요. 개발자들의 피드백을 고려하고 Material 3 컴포넌트를 다듬은 후, 안정 버전으로 업데이트했어요!

이와 함께, material.angular.io도 새로운 Material 3 테마와 문서로 새롭게 업데이트되었어요.

<img src="/assets/img/2024-06-22-Angularv18isnowavailable_2.png" />

이제 우리의 안내서에서 어떻게 Angular Material 3를 앱에서 사용할 수 있는지 찾아보세요!

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

# 개발자 미리보기에서의 Signal API

Angular 버전 17.1과 17.2에서 새로운 signal 입력, signal 기반 쿼리, 그리고 새로운 출력 구문이 발표되었습니다.

시그널 가이드에서 APIs를 어떻게 사용할지 알아보세요. 앞으로 몇 달 동안 여러분의 피드백을 기반으로 구현을 계속 개선하고, 안정 버전으로 승격할 것입니다.

# 지연 로드 뷰가 이제 안정화되었습니다

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

지난 6개월 동안, 우리는 deferrable views에 대한 많은 관심을 받았습니다. 이를 통해 개발자들이 앱의 핵심 웹 가치를 쉽게 향상시킬 수 있다는 것을 알게되었습니다. 예를 들어, Bill.com은 @defer를 사용하여 한 앱의 번들 크기를 50% 줄였다고 나누었습니다. 오늘, deferrable views가 이제 안정화되었습니다! 여러분은 여러분의 응용 프로그램과 라이브러리에서 이를 사용할 수 있습니다.

# 내장 제어 흐름이 이제 안정화되었습니다

v17에서 deferrable views와 함께, 성능을 개선한 새로운 내장 제어 흐름을 발표했습니다. 이 새로운 문법이 크게 채택되었고, 커뮤니티 피드백에 대응한 후, 우리는 이 API를 안정화했다는 것을 기쁘게 발표합니다!

미리보기 단계에서는 제어 흐름의 타입 체크를 추가로 개선했고, 더 많은 효율적인 암시적 변수 별칭을 활성화하고, 특정 성능 관련 안티 패턴에 대한 가드레일을 설정했습니다.

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

# 서버 측 렌더링 개선사항

1년 전에 우리는 하이드레이션을 소개했고 v17에서 안정 버전으로 출시했습니다. 공개 HTTPArchive 데이터셋을 기반으로 하면, 프리랜더링이나 서버 측 렌더링을 사용하는 Angular v17 앱 중 76%가 이미 하이드레이션을 사용하고 있습니다.

더 많은 사람들이 하이드레이션을 활용할 수 있도록 하는 데 있어 한 가지 큰 걸림돌이 있었습니다 — i18n 지원 부족이었습니다. Chrome Aurora 팀과 협력한 끝에, 우리는 i18n 블록의 하이드레이션을 개발자 미리보기 모드로 제공하는 것을 기쁘게 생겨 v18에서 사용 가능합니다!

# 이벤트 재생

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

두 달 가량 전에, 우리는 Angular과 Google의 내부 프레임워크 Wiz를 융합하는 장기 진행 중인 프로젝트를 발표했어요. Angular과 Wiz는 과거에 서로 다른 앱 세그먼트를 제공했었죠 — Wiz는 소비자를 주 타깃으로 한 앱에서 주로 사용되며 성능에 초점을 맞추었고, Angular은 생산성과 개발자 경험에 중점을 둔 것이었어요.

융합 노력의 결과로, Wiz는 Angular Signls를 그들의 렌더링 모델에 깊게 통합시켰어요. 우리는 ng-conf에서 YouTube가 이제 Angular Signls를 사용하고 있다는 사실을 공유했었죠. 비슷하게, Angular은 이제 부분 수분화와 같은 성능 중심의 기능을 더 많이 가져오고 있어요. 조금 후에 더 자세히 소개할게요.

두 경우 모두, 우리는 여러분의 기능 요청 및 다른 요구 사항을 모티브로 두 프레임워크의 중요한 기능을 융합하고 있어요.

![이미지](/assets/img/2024-06-22-Angularv18isnowavailable_3.png)

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

오늘은 Google.com에서 실행 중인 핵심 라이브러리 중 하나인 이벤트 디스패치(event dispatch)가 Angular 모노레포에 추가되었다는 좋은 소식을 전해드립니다. 이벤트 디스패치는 이제 하이브리드 렌더링을 사용할 때 이벤트 재생을 담당하며, v18부터 제공됩니다.

대부분의 개발자들은 이벤트 디스패치와 직접 상호 작용하지 않을 것이므로, 왜 이벤트 재생이 유용한지 살펴보겠습니다. 아래에 간단한 전자 상거래 웹사이트의 모형을 찾을 수 있습니다. 매우 느린 네트워크 연결을 시뮬레이션하기 위해 인위적인로딩 지연을 도입했습니다. 페이지가 아직 로딩 중이고 아직 수화되지 않은 상태에서 사용자가 카트에 여러 개의 헤드폰을 추가하려고 한다고 상상해보십시오. 페이지가 아직 수화되지 않았기 때문에 상호작용할 수 없으므로 모든 사용자 이벤트가 손실됩니다. v18에서 이벤트 디스패치를 사용하여 시작하면 Angular가 사용자 이벤트를 기록하기 시작합니다. 애플리케이션이 수화되면 이벤트 디스패치가 그것들을 재생하고 카트에 여섯 개의 항목이 생기게 됩니다.

<img src="/assets/img/2024-06-22-Angularv18isnowavailable_4.png" />

이벤트 재생 기능은 개발자 미리보기로 v18에서 사용할 수 있습니다. withEventReplay()를 사용하여 기능을 활성화할 수 있습니다.

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
bootstrapApplication(App, {
  providers: [provideClientHydration(withEventReplay())],
});
```

# 디버깅 경험을 개선했습니다

Angular DevTools를 업데이트하여 Angular의 수화 프로세스를 시각화했습니다. 각 구성 요소 옆에는 구성 요소의 수화 상태를 나타내는 아이콘이 있습니다. 페이지에서 Angular가 수화한 구성 요소를 미리 볼 수 있도록 오버레이 모드도 활성화할 수 있습니다. 앱에 수화 오류가 있는 경우 Angular DevTools가 구성 요소 탐색기에 시각화해줍니다.

<img src="/assets/img/2024-06-22-Angularv18isnowavailable_5.png" />

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

우리 커뮤니티 기여자 Matthieu Riegler에게 이 기능을 추가해 준 것에 대해 큰 감사를 전합니다!

## CDK 및 Material의 수분 보충 지원

v17에서 일부 Angular Material 및 CDK 구성 요소가 수분 보충에서 제외되어 다시 렌더링되는 문제가 있었습니다. v18부터 모든 구성 요소 및 기본 구성 요소가 완전한 수분 보충 호환성을 갖추었습니다.

## 우리의 부분적 수분 보충 계획

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

ng-conf와 Google I/O에서 부분 수분화를 발표했어요. 이 기술은 서버 사이드 렌더링 후 앱을 점진적으로 수분화할 수 있게 해줘요. 앱의 점진적 수분화는 처음에 적은 양의 JavaScript를 로드하고 앱의 성능을 향상시키는데 도움을 줘요.

부분 수분화는 지연 뷰와 동일한 기반 위에 구축돼요. 오늘과 같이 서버에서 @placeholder 블록을 렌더링하는 대신, Angular가 서버에서 @defer 블록의 주요 콘텐츠를 렌더링할 수 있는 모드를 활성화할 수 있게 될 거예요. 클라이언트에서는 Angular가 템플릿에서 지정된 트리거 조건이 충족될 때에만 연기된 블록을 다운로드하고 수분화할 거에요. 예를 들어, 다음은 가상의 API 예시에요:

```js
@defer (서버에서 렌더링; 뷰포트 진입 시) {
  <app-calendar/>
}
```

위의 블록은 캘린더 컴포넌트를 서버에서 렌더링할 거예요. 클라이언트로 도달하면 Angular가 해당 JavaScript를 다운로드하고, 뷰포트에 들어간 후에만 상호작용 가능한 캘린더를 수분화할 거에요.

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

지금까지 부분 수분 유화에 대해 노력하고 있습니다. 이미 상호 작용 트리거와 함께 사용할 수 있는 상태에 있습니다. 우리는 현재 파트너와 함께 작업하여 구성 요소가 속성을 수신하거나 바인딩 값을 변경하는 데이터 트리거의 중요성을 평가하고 있습니다.

대규모의 중요한 성능을 필요로 하는 애플리케이션을 개발하고 있고, 부분 수분 유화의 미래를 형성하는 초기 액세스 프로그램에 참여하고 싶다면 devrel@angular.io로 이메일을 보내주세요.

# Firebase 앱 호스팅으로 앱에 강력한 호스팅

웹 플랫폼의 점점 더 복잡해지면서 응용 프로그램의 호스팅은 성능, 신뢰성, 생산성 및 확장성 측면에서 중요한 역할을 합니다. 하이브리드 렌더링을 사용하는 앱은 서버 측 렌더링, 사전 렌더링 및 클라이언트 측 렌더링을 위한 다른 호스팅 요구 사항이 있습니다. 이 복잡성을 수동으로 관리하는 것은 부담스러울 수 있습니다. Firebase 앱 호스팅은 개발자를 위해 이 모든 것을 투명하게 처리하고 있습니다!

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

<img src="/assets/img/2024-06-22-Angularv18isnowavailable_6.png" />

올해 구글 I/O에서 Firebase가 앱 호스팅을 발표했습니다. 앱 호스팅은 동적 Angular 애플리케이션의 개발 및 배포를 간소화하며 기본 프레임워크 지원, GitHub 통합 및 인증, 클라우드 Firestore, Firebase의 Vertex AI와의 통합 등을 제공합니다.

Angular와 함께 Firebase 작업을 하면서 개발자 경험을 보다 원할하게 만들도록 노력해 왔습니다. 오늘 앱 호스팅을 시작하는 것에 관한 속기 보세요!

# 그리고 추가로...

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

우리가 계속 나아가는 대규모 프로젝트들과 함께, 항상 개발자들의 일반적인 요구를 해결하기 위해 시간을 보내고 있어요. v18의 하이라이트 중 일부는 다음과 같아요:

# ng-content에 대한 폴백 콘텐츠 지정

가장 많은 추천을 받은 문제 중 하나는 ng-content에 대한 기본 콘텐츠를 지정하는 것이었어요. v18에서 그것이 이제 가능해졌어요! 여기에 간단한 예시가 있어요:

```js
@Component({
  selector: "app-profile",
  template: `
    <ng-content select=".greeting">Hello </ng-content>

    <ng-content>Unknown user</ng-content>
  `,
})
export class Profile {}
```

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

이제 컴포넌트를 사용할 수 있습니다:

```js
<app-profile>
  <span class="greeting">좋은 아침 </span>
</app-profile>
```

결과는 다음과 같습니다:

```js
<span class="greeting">좋은 아침 </span>
알 수 없는 사용자
```

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

# 통합된 제어 상태 변경 이벤트

Angular Forms에서 FormControl, FormGroup 및 FormArray 클래스는 이제 events라는 속성을 노출시켜 이 폼 컨트롤의 이벤트 스트림에 구독할 수 있게 했습니다. 이를 사용하여 값 변경, 터치 상태, 원시 상태 및 제어 상태의 변경을 계속 추적할 수 있습니다.

이제 다음과 같이 사용할 수 있습니다:

```js
const nameControl = (new FormControl() < string) | (null > ("name", Validators.required));
nameControl.events.subscribe((event) => {
  // 개별 이벤트 처리
});
```

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

이 기능 요청은 GitHub에서 440개 이상의 좋아요를 받았습니다. 저희 커뮤니티 기여자 Matthieu Riegler님 덕분에 모든 사람들에게 이용할 수 있게 되었습니다!

# 응용 프로그램 빌더로의 마이그레이션 자동화

Angular v17에서 우리는 "응용 프로그램 빌더"를 안정적인 상태로 발표하고 새로운 프로젝트에 대해 기본으로 활성화했습니다. 내부적으로는 Vite와 esbuild를 사용하여 이전 webpack 경험을 대체했습니다.

대부분의 앱들에 대해, 개발자들은 angular.json을 업데이트함으로써 새로운 빌드 시스템으로 업데이트할 수 있었습니다. 지난 6개월 동안 우리는 사용자로부터 더 많은 피드백을 수집하고, 업데이트 경험을 개선하여 모두가 새로운 빌드 경험으로 이동하고 편집/새로 고침 효과를 받을 수 있도록 했습니다.

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

당사의 업데이트 가이드에서 업데이트 경험을 자동화하기 위해 개발한 도구를 찾을 수 있습니다.

새로운 빌드 시스템의 핵심 경로에 웹팩이 없기 때문에 웹팩에 대한 의존성을 선택 사항으로 만들었고, 이로 인해 Angular CLI의 총 종속성 수를 50% 이상 줄일 수 있었습니다! 이 변경으로 Angular CLI 설치 시간이 더 빨라집니다.

# 함수로 된 경로 리디렉션

리디렉션 처리 시 더 높은 유연성을 제공하기 위해 Angular v18에서 redirectTo는 이제 문자열을 반환하는 함수를 허용합니다. 예를 들어 런타임 상태에 따라 라우트로 리디렉션하고 싶은 경우 함수에서 더 복잡한 로직을 구현할 수 있습니다:

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

const routes: Routes = [
{ path: "first-component", component: FirstComponent },
{
path: "old-user-page",
redirectTo: ({ queryParams }) => {
const errorHandler = inject(ErrorHandler);
const userIdParam = queryParams['userId'];
if (userIdParam !== undefined) {
return `/user/${userIdParam}`;
} else {
errorHandler.handleError(new Error('Attempted navigation to user page without user ID.'));
return `/not-found`;
}
},
},
{ path: "user/:userId", component: OtherComponent },
];

### TypeScript 5.4

마지막으로 TypeScript의 종속성이 업데이트되어 최신 TypeScript 5.4 기능을 모두 활용할 수 있게 되었습니다!

### 커뮤니티 하이라이트

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

앵귤러에서 일어나는 혁신은 커뮤니티에서 많은 발전을 보게 되었어요!

ngrx, ngxs, rxAngular와 같은 인기 있는 상태 관리 라이브러리들은 이미 앵귤러 신호를 채택하고 컴포넌트에서 세밀한 반응성을 활성화하고 있어요.

두 달 전에 앵귤러 GDE인 Brandon Roberts는 Analog.js 버전 1.0을 발표했어요. 이는 앵귤러를 위한 커뮤니티 주도의 메타 프레임워크로, 파일 기반 라우팅, API 라우트, 일급 마크다운 지원 등의 멋진 기능을 제공해요. Analog.js 팀은 커뮤니티가 좋아하는 단일 파일 컴포넌트 형식을 실험하고 있어요!

또 다른 생태계의 인기 라이브러리가 앵귤러 어댑터를 개발하고 있는 것도 흥미롭게 보여요. Chau Tran, Arnoud de Vries, 그리고 Corbin Crutchley가 TanStack Store, TanStack Query, TanStack Forms 지원을 앵귤러로 출시했어요!

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

세계 각지의 Angular 커뮤니티 컨퍼런스에 참여할 수 있어 기뻐요. 올해 남은 행사들도 기대되네요. 수백 명의 참가자와 수십 명의 연사를 대상으로 컨퍼런스를 기획하는 것은 쉬운 일이 아니에요. 올해 이 힘든 과제를 현실로 만들어준 모든 분들께 감사의 말씀을 전합니다. 이들에는 ng-conf, Angular Belgrade, ng-de, ng-be, NGPoland, ngRome, NG Kenya, ngIndia, Angular TLV 등이 포함돼요! 만약 빠뜨린 컨퍼런스가 있다면 댓글에서 공유해주세요.

뿐만 아니라, v16 이후로 290명 이상의 사람들로부터 기여를 받았어요! 코드, 이슈, 컨텐츠, 커뮤니티 조직 또는 가능한 방법으로 도와준 모든 분들께 감사드립니다 🙏

# 우리의 진전을 되돌아보며

Angular 부흥의 일환으로 지난 2년 동안 많은 것을 선보였고 앞으로도 더 많은 혁신이 예정돼 있어요. 이 부분에서 현재를 살펴보고 어디에 있는지 축하하고 싶었어요.

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

Angular을 신호 및 고급 혼합 렌더링 기능으로 진화시키면서, 우리는 항상 개발자들이 자신감을 가지고 웹 애플리케이션을 제공할 수 있도록 하는 우리의 미션을 충실하게 이행해왔습니다. 현재 세계에서 두 번째로 큰 웹사이트인 YouTube가 Angular의 반응성 기본 요소를 사용하고 있어, 우리는 더 큰 작업 그룹의 일부로 신호를 웹 플랫폼에 추가하기 위해 협업하고 있습니다.

또한, Vite, Nx, Cypress, Puppeteer, Storybook 등의 도구 개발자들과 긴밀히 협력하여 모든 사람을 위한 개발자 경험을 향상시키고 있습니다. 동시에, Angular로 어떤 것이 가능한지 확장하는 열정적인 개발자, 커뮤니티 조직자, 저자, 연설자들로 이루어진 커뮤니티가 있어 우리는 행운이라고 생각합니다.

Angular 부흥 과정에 함께해준 여러분께 감사드립니다!
