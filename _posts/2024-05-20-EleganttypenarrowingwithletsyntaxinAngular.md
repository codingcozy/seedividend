---
title: "앵귤러에서 let 구문을 사용해 타입 축소하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-EleganttypenarrowingwithletsyntaxinAngular_0.png"
date: 2024-05-20 22:15
ogImage:
  url: /assets/img/2024-05-20-EleganttypenarrowingwithletsyntaxinAngular_0.png
tag: Tech
originalTitle: "Elegant type narrowing with @let syntax in Angular"
link: "https://medium.com/javascript-everyday/elegant-type-narrowing-with-let-syntax-in-angular-a6cf2cd18964"
isUpdated: true
---

![이미지](/assets/img/2024-05-20-EleganttypenarrowingwithletsyntaxinAngular_0.png)

Angular 18은 아직 릴리즈되지 않았지만, 18.1 버전에 이미 새로운 강력한 추가 기능이 기다리고 있습니다. 바로 템플릿 로컬 변수 또는 @let 구문이라고도 알려진 기능입니다.

간단히 말해서, 이제 템플릿에서 JavaScript 파일과 동일한 방식으로 보조 로컬 변수를 정의할 수 있게 됩니다.

가능한 응용 중 하나는 AsyncPipe를 사용하여 구독하는 스트림에서 값 unwrap하는 것입니다.

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

현재 솔루션

```js
<ng-container *ngIf="data$ | async as data">
  <p>{ data }</p>
</ng-container>
```

```js
<ng-container *ngIf="{ data: data$ | async } as vm">
  <p>{ vm.data }</p>
</ng-container>
```

새로운 솔루션

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
@let data = data$ | async ;

<p>{ data }</p>
```

이것은 '동적' 뷰 모델 속성을 생성할 수도 있게 해줍니다. 특히, 사용자 선택에 따라 변경되는 isActive와 같은 컬렉션을 다룰 때 특히 유용합니다.

Enea Jahollari의 훌륭한 기사에서 새로운 구문의 다양한 사용법에 대해 더 읽어볼 수 있습니다.

언급할 가치가 있는 점은 신호의 값을 템플릿 로컬 변수에 저장할 수 있는 능력입니다. 이것은 타입 좁힘이 매우 중요합니다.

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

아래는 해당 컴포넌트를 고려해봅시다:

```js
type AnalysisState =
  | { status: 'pending' }
  | { status: 'completed'; result: string };

@Component({
  selector: 'app-analysis-card',
  standalone: true,
  templateUrl: './analysis-card.component.html',
  styleUrl: './analysis-card.component.scss',
})
export class AnalysisCardComponent {
  public analysisState: AnalysisState = { status: 'pending' };

  constructor() {
    // mock change simulation
    setTimeout(() => {
      this.analysisState = { status: 'completed', result: 'xyz' };
    }, 5000);
  }
}
```

```js
@if (analysisState.status === "pending") {
  <p>Analysis is pending</p>
} @else {
  <p>Analysis completed with result: { analysisState.result }</p>
}
```

새로운 제어 흐름 구문을 통해 이전의 \*ngIf 디렉티브로는 불가능했던 적절한 타입 축소가 가능해졌습니다. 상세 내용은 제 이전 글 중 하나에서 확인하실 수 있어요.

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

그러나, 컴포넌트 상태를 처리하기 위해 시그널을 사용하는 경우:

```js
@Component({
  selector: 'app-analysis-card',
  standalone: true,
  templateUrl: './analysis-card.component.html',
  styleUrl: './analysis-card.component.scss',
})
export class AnalysisCardComponent {
  public analysisState: WritableSignal<AnalysisState> = signal({
    status: 'pending',
  });

  constructor() {
    // 모의 변경 시뮬레이션
    setTimeout(() => {
      this.analysisState.set({ status: 'completed', result: 'xyz' });
    }, 5000);
  }
}
```

타입 추론이 작동하지 않습니다:

```js
@if (analysisState().status === "pending") {
  <p>분석 대기 중</p>
} @else {
  <!-- 'result' 속성이 'AnalysisState' 타입에 존재하지 않습니다. -->
  <p>분석이 완료되었습니다. 결과: { analysisState().result }</p>
}
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

두 가지 해결 방법이 있습니다:

- 시그널 값과 함께 게터를 사용하세요

```js
@Component({
  selector: 'app-analysis-card',
  standalone: true,
  templateUrl: './analysis-card.component.html',
  styleUrl: './analysis-card.component.scss',
})
export class AnalysisCardComponent {
  public _analysisState: WritableSignal<AnalysisState> = signal({
    status: 'pending',
  });

  get analysisState() {
    return this._analysisState();
  }

  constructor() {
    // 모의 변경 시뮬레이션
    setTimeout(() => {
      this._analysisState.set({ status: 'completed', result: 'xyz' });
    }, 5000);
  }
}
```

```js
@if (analysisState.status === "pending") {
  <p>분석 대기 중</p>
} @else {
  <p>분석 완료 및 결과: { analysisState.result }</p>
}
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

- 보조 if 블록으로 신호의 값 언래핑하기

```js
@Component({
  selector: 'app-analysis-card',
  standalone: true,
  templateUrl: './analysis-card.component.html',
  styleUrl: './analysis-card.component.scss',
})
export class AnalysisCardComponent {
  public analysisState: WritableSignal<AnalysisState> = signal({
    status: 'pending',
  });

  constructor() {
    // mock change simulation
    setTimeout(() => {
      this.analysisState.set({ status: 'completed', result: 'xyz' });
    }, 5000);
  }
}
```

```js
@if (analysisState(); as analysisState) {
  @if (analysisState.status === "pending") {
    <p>Analysis is pending</p>
  } @else {
    <p>Analysis completed with result: { analysisState.result }</p>
  }
}
```

새로운 방법으로 템플릿 지역 변수를 만드는 방법을 소개했으므로 목표를 달성하는 더 우아한 방법이 있습니다:

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
analysisState = analysisState();

if (analysisState.status === "pending") {
  console.log("Analysis is pending");
} else {
  console.log(`Analysis completed with result: ${analysisState.result}`);
}
```

The `analysisState` variable now holds the result of the `analysisState()` function call. If the status is "pending," a message saying "Analysis is pending" will be logged. If the status is anything else, a message saying "Analysis completed with result: " followed by the actual result will be logged.

Thank you, and have a great day! 😊
