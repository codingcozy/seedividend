---
title: "Angular 17 새로 나온 내용 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Angular 17 New Changes You Should Know"
link: "https://medium.com/habilelabs/angular-17-new-changes-you-should-know-39491de6afad"
isUpdated: true
---

## 나이테시 아그라왈(Nitesh Agrawal)

![Angular 17 New Changes](/assets/img/Angular17NewChangesYouShouldKnow_0.png)

작년 11월 구글이 Angular의 최신 버전인 Angular 17을 발표했습니다. 이 기사를 작성하는 현재까지, Angular 17은 아직 베타 단계에 있습니다. 이번 릴리스에서는 많은 변화가 소개되었습니다.

본 기사에서는 Angular의 새 버전에서 알아야 할 가장 중요한 변경 사항을 탐색해보겠습니다. 그럼 시작해보겠습니다...

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

![Angular New Changes](/assets/img/Angular17NewChangesYouShouldKnow_1.png)

# Angular이 새로운 외관을 갖고 있다는 걸 알고 있나요?

Angular은 이전 문서 웹사이트를 새롭고 생동감 넘치는 웹사이트와 새로운 로고로 업데이트했습니다.

- 이전 웹사이트는 여기에서 확인할 수 있습니다.
- 새 웹사이트는 여기에서 확인할 수 있습니다.

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

# Angular 놀이터

Angular는 새 웹사이트에서 코드를 직접 실험할 수 있는 놀이터(우리가 Angular 놀이터라고 부를게요)를 통합했어요. 이를 통해 개발자들이 실제 시스템에 Angular 환경을 설치하지 않고도 Angular을 연습할 수 있게 될 거에요.

# Angular 독립 구성 요소

Angular 17부터 독립 구성 요소가 기본 값이에요. 기본적으로, ngModule이나 다른 모듈을 가져와야 할 필요가 없어졌어요. FormsModule와 같은 것들을 컴포넌트에 직접 가져올 수 있어요. standalone을 false로 설정하여 구성 요소를 비-독립으로 변환할 수 있어요.

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
@Component({
  selector: 'profile-photo',
  templateUrl: 'profilePhoto.html',
  styleUrl: 'styles.css',
  Standalone: true  // 이 줄은 컴포넌트를 독립 혹은 비독립으로 설정할 때 사용할 수 있어요
})
```

# Angular에서 컴포넌트를 지연 로딩하려면?

이미 알고 계시다시피 Angular은 우리가 모듈을 호출할 때 loadChildren 속성을 사용해 지연 로딩 기능을 제공하죠. 이제 새로운 Angular 17 기능으로 컴포넌트를 직접적으로 지연 로딩할 수 있어요.

다음 코드를 사용하여 컴포넌트의 지연 로딩을 수행할 수 있어요:

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

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

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

새로운 선언적인 제어 흐름은 *NgIf, *NgFor 및 \*NgSwitch의 기능을 프레임워크 자체로 통합하고 Angular @defer는 템플릿이 하나 이상의 구성 가능한 트리거 조건에 응답하여 콘텐츠를 지연로드할 수 있습니다.

이 변경 사항을 예제로 살펴보겠습니다.

```js
<div *ngIf="user.isHuman">
  <human-profile [data]="user" />
</div>
```

위와 같은 구문을 사용하여 데이터를 조건부로 렌더링해야했지만 문제는 데이터를 숨기거나 보여주기만 할 뿐이며 여전히 로드된다는 것입니다. 그래서 Angular v17에서 놀라운 일을 했습니다; 그들은 콘텐츠를 게으르게로드하기 위해 " @defer"를 추가했습니다.

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

아래 예시를 확인해보세요:

```js
@if (user.isHuman) {
  <human-profile [data]="user" />
} @else if (user.isRobot) {
  <!-- 로봇 사용자는 드물기 때문에 그들의 프로필은 필요할 때만 로드됩니다 -->
  @defer {
    <robot-profile [data]="user" />
  }
  @error {
    <span>에러</span>
  }
  @loading(minimum 1s) {
    <span>로딩 중...</span>
  }
} @else {
  <p>프로필을 알 수 없습니다!
}
```

위 예시에서 Angular 16 이전에 없던 세 가지를 볼 수 있습니다. Angular는 @if, @else 구문을 도입했는데, 이는 우리에게 더 익숙합니다. 두 번째는 필요할 때 콘텐츠를 로드할 수 있는 @defer 블록입니다.

세 번째는 로딩 메시지를 표시하는 @loading 블록입니다. 위 예시에서 "user.isRobot" 조건이 참이 되기 전까지 "robot-profile"이 심지어 로드되지 않을 것입니다. 그래서 페이지를 더 빨리 렌더링하는 데 도움이 될 것입니다.

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

그 두 가지에 대해 이야기할 거에요. 먼저 @defer가 무엇인지부터 시작해볼게요.

선언적 트리거 조건과 함께 @defer를 사용하는 방법

지원되는 트리거 유형은 다음과 같아요:

- 상호작용 시
- 호버 시
- 아이들 시
- 타이머 시
- 뷰포트 내에서

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

이제 각 조건에 대한 예제를 살펴보겠습니다.

# 상호 작용 시 @defer

Angular은 사용자가 @placeholder 블록과 상호 작용할 때 "상호 작용" 블록을 렌더링합니다. 상호 작용 방법은 클릭 또는 키프레스 또는 키업과 같은 입력 이벤트일 수 있습니다.

```js
@defer (on interaction) {
  <span>span is clicked</span>
}
@placeholder {       // 사용자가 이 플레이스홀더와 상호 작용할 때
 <span>Placeholder (click on it!)</span> // 그럼 defer 블록이 표시됩니다.
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

# @defer 오버 호버

Angular은 사용자가 플레이스홀더 블록이나 콘텐츠 위에 마우스를 올리면 "오버 호버" 블록을 표시합니다.

```js
@defer (오버 호버) {
  <span>마우스를 올렸습니다</span>
}
@placeholder {
  <span>플레이스홀더 (위에 호버하세요!)</span>
}
```

# @defer 무반응 시

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

Angular은 페이지가 로드된 후 브라우저가 아이들 상태에 도달하면 "on idle" 블록 콘텐츠를 보여줍니다:

```js
@defer (on idle) {
  <span>브라우저가 아이들 상태에 도달했습니다</span>
}
@placeholder {
  <span>자리 표시자</span>
}
```

# @defer on timer

Angular은 지정된 시간이 완료되면 "on timer" 블록을 표시합니다. 이는 JS에서 사용한 "setTimeout"과 유사합니다.

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
@defer (5초 후에) { // 이 블록을 lazy load하기 위해 시간을 설정할 수 있음
  <span>5초 후에 보입니다</span>
}
@placeholder {
  <span>자리 표시자</span>
}
```

# @defer 뷰포트에 대한

Angular은 "뷰포트에 대한" 블록 내용을 렌더링합니다. 플레이스홀더가 브라우저의 뷰포트에 들어갈 때입니다.

```js
@defer (뷰포트에 대한) {
  <app-c2 text="블록이 뷰포트에 들어갔습니다"/>
}
@placeholder {
  <span>자리 표시자</span>
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

# 미리 가져오기

또 다른 조건으로 미리 가져오기를 사용할 수도 있습니다. 예를 들어, 우리는 defer 블록에 대한 Interaction 조건을 사용하고 있지만, hover 또는 타이머에 대한 추가 @defer 조건을 사용하여 데이터를 미리 가져올 수도 있습니다.

아래 예제에서는 placeholder 위에 마우스를 올릴 때 데이터를 가져옵니다. 그러나 실제 데이터가 보이지 않고, 상호작용할 때 @defer 블록이 나타날 것입니다. 이는 데이터가 많을 때 유용합니다.

```js
@defer (on interaction; prefetch on hover) {
  <app-c3/>
}
@placeholder {
  <span>Placeholder (마우스를 올리고, 클릭하세요!)</span>
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

# 이제 새로운 \*ngIf 구문에 대해 이야기해 봐요

알다시피, 이전에는 앵귤러에서 조건부 렌더링을 달성하기 위해 ng-template을 사용했어요.

아래 예제를 보고 새로운 구문과 이전 구문의 차이를 이해해 봐요:

```js
// 이전 구문
<div *ngIf="isTrue; else other">
this is true
</div>
<ng-template #other>
  This is not true!
</ng-template>
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

Angular은 이제 우리가 익숙한 버전으로 구문을 업데이트했습니다.

```js
// 새로운 것
@if (isTrue) {
  <p>This is true</p>
} @else {
  <p>This is not true</p>
}
```

# 새로운 \*ngSwitch 구문

Angular는 if-else로 끝나지 않고 *ngSwitch 구문도 업데이트했습니다. 새로운 구문을 사용하면 내용을 더 쉽게 사용하거나 표시할 수 있습니다. 이제 새 *ngSwitch 구문을 사용하는 방법을 알아보겠습니다.

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

자, 이제 예제를 이전 및 새로운 구문 두 가지에 대해 살펴보겠습니다.

```js
// 이전 구문
<div [ngSwitch]="animal">
  <p *ngSwitchCase="'monkey'">원숭이를 선택했습니다.</p>
  <p *ngSwitchCase="'donkey'">당나귀를 선택했습니다.</p>
  <p *ngSwitchCase="'elephant'">코끼리를 선택했습니다.</p>
  <p *ngSwitchDefault>알 수 없는 동물입니다.</p>
</div>
```

```js
// 새로운 구문
@switch (animal) {
  @case ('monkey') { <p>원숭이를 선택했습니다.</p> }
  @case ('donkey') { <p>당나귀를 선택했습니다.</p> }
  @case ('elephant') { <p>코끼리를 선택했습니다.</p> }
  @default { <p>알 수 없는 동물입니다.</p> }
}
```

# 새로운 \*ngFor 구문

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

당연히 이제 앵귤러는 다른 Angular Structural Directives를 업데이트하는 동안 \*ngFor를 잊을 수 없게 되었습니다.

여기 앵귤러가 \*ngFor 구문을 변경한 내용입니다: 동물들에 대한 배열이 있다고 가정해봅시다; 예를 들어

```js
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
```

```js
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "control-flows-ng17";
  animals: string[] = ["Monkey", "Donkey", "Elephant"];
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

이제 동물 배열을 \*ngFor를 사용하여 반복하려면 다음과 같이 할 수 있습니다:

```js
// 예전 방법
<p>동물 배열을 반복하는 중</p>
<div *ngFor="let animal of animals">
  <ul>
    <li>{animal}</li>
  </ul>
</div>
```

이제 새로운 방식이 나왔습니다:

```js
// 새로운 방식
<h1>새로운 방식을 확인해봅시다</h1>
@for (animal of animals; track $index) {
  <ul>
    <li>{animal}</li>
  </ul>
} @empty {
  동물 목록이 비어 있습니다
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

Angular의 새 @for 루프는 옵션으로 제공되는 @empty 블록을 통해 0개의 항목을 가진 컬렉션을 쉽게 처리할 수 있게 해줍니다. 그래서, 만약 우리의 배열에 데이터가 없다면 메시지를 표시할 수 있습니다.

# 최신 Angular Control Flow를 시도해보세요

기존 프로젝트에서 최신 Angular 제어 흐름을 시도하려면 다음 명령을 사용해주세요:

```js
ng generate @angular/core:control-flow
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

# 결론

우리가 본 것처럼, 앵귤러 17에는 많은 새로운 변화가 있습니다.

이 중에서 제어 플로우와 지연 가능한 뷰는 유망하게 보여 웹사이트가 더 빠르게 느껴지고 콘텐츠를 다루는 것이 이제 꽤 쉬워졌습니다. 이 외에도, 컴포넌트의 지연 로딩을 사용하는 습관도 만들어야 합니다.

여러분의 생각을 알려주시면 감사하겠습니다. 여태까지 읽어 주셔서 감사합니다!
