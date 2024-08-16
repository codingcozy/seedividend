---
title: "새로운 Angular 17 기능 새로운 제어 흐름 구문"
description: ""
coverImage: "/assets/img/2024-05-14-NewAngular17featurenewcontrolflowsyntax_0.png"
date: 2024-05-14 14:12
ogImage: 
  url: /assets/img/2024-05-14-NewAngular17featurenewcontrolflowsyntax_0.png
tag: Tech
originalTitle: "New Angular 17 feature: new control flow syntax"
link: "https://medium.com/itnext/new-angular-17-feature-new-control-flow-syntax-256696d10103"
isUpdated: true
---




# Angular의 새로운 선언적 제어 흐름을 시그널 기반 예시로 설명합니다

![이미지](/assets/img/2024-05-14-NewAngular17featurenewcontrolflowsyntax_0.png)

Angular 17은 11월 초에 출시될 예정이며, 선언적 제어 흐름을 갖는 새로운 템플릿 제어 블록 구문을 제공할 것입니다. 이 새로운 블록을 사용하는 두 가지 그룹의 특징이 있습니다:

- 지연 로딩 블록: Angular 17은 블록 내용의 지연 로딩을 가능케 하는 @defer 제어 블록을 가집니다. 블록 내용의 종속 항목에도 지연 로딩이 적용됩니다: 모든 컴포넌트, 지시문 및 파이프도 지연 로딩이 될 것입니다. 이전 기사에서 defer 블록이 어떻게 작동하는지 예시로 보여드렸습니다.
- 조건부 렌더링과 컬렉션 항목 렌더링을 제공하는 블록 (RFC): 이는 NgIf, NgFor 및 NgSwitch 지시문에 대한 대안입니다.



이러한 새 제어 블록의 가장 중요한 이점 중 하나는 시그널을 통해 영역이 없는 애플리케이션을 지원한다는 것입니다.

이 기사에서는 다음을 보여줍니다:

- 새 제어 블록 구문을 사용하여 @if와 @else를 사용하여 조건에 따라 렌더링되는 블록 만들기
- @switch, @case, @default를 사용하여 스위치 및 케이스 블록 만들기
- @for를 사용하여 루프를 만들고 @empty 블록으로 빈 컬렉션을 처리하는 방법
- ngIf, ngFor 및 ngSwitch를 새 제어 블록 구문으로 이전하는 방법

전체 소스 코드는 여기에서 사용할 수 있습니다:



https://github.com/gergelyszerovay/angular-17-control-flow

저는 Angular v17.0.0-next.8을 사용했습니다. 독립 구성 요소와 시그널을 사용했습니다. 프론트엔드를 시작하려면 yarn run start 또는 npm run start를 입력하세요.

# 조건적으로 렌더링되는 컨트롤 블록: @if 및 @else

첫 번째 예제에서는 체크박스를 만들고 isChecked 시그널에 바인딩합니다. 시그널의 기본값은 true이므로 초기에 체크박스가 선택되고 @if 블록 내용이 렌더링됩니다. 아래 예제는 src\app\app.component.html 템플릿 파일에서 가져온 것입니다.



```js
<h3>&#64;if and &#64;else</h3>
<div>
  <input #checkbox type="checkbox" [checked]="isChecked()" (change)="isChecked.set(checkbox.checked)" id="checkbox"/>
</div>
<div>
@if (isChecked()) {
  <span>Checked</span>
} 
@else {
  <span>Not checked</span>
}
</div>
```

'@if (logical_expression)' 문은 논리 표현식을 사용하여 @if 블록을 생성합니다. 저는 논리 표현식으로 isChecked() 신호를 사용했는데, 이는 부울 값으로 평가됩니다.

@else 블록을 @if 블록 아래에 추가했습니다. 이 블록은 @if 블록의 논리 표현식이 false로 평가될 때 렌더링됩니다. 즉, isChecked() 신호의 값이 false인 경우에 해당합니다. 따라서 체크박스를 해제하면 Angular가 @else 블록의 내용을 렌더링합니다.

새로운 제어 블록 구문과 관련된 중요한 사항이 하나 더 있습니다: '@', '' 및 '' 문자에 특별한 의미가 있기 때문에 템플릿의 텍스트에서 이를 대체해야 합니다. HTML 엔티티를 사용해야 합니다:




- '@' 대신에 &#64;을 사용하세요. 위 코드의 'h3' 헤딩을 확인해보세요.
- ' ' 대신에 &#123;을 사용하세요.
- ' ' 대신에 &#125;을 사용하세요.

그렇지 않으면 다음과 같은 컴파일 오류 중 하나가 발생할 수 있습니다:

- [ERROR] NG5002: Incomplete block "…". If you meant to write the @ character, you should use the "@" HTML entity instead. [plugin angular-compiler]
- [ERROR] NG5002: Unexpected character "EOF" (Do you have an unescaped "'" in your template? Use "'' ‘'’ ''") to escape it.)

# Collection의 항목을 렌더링하기 위해 @for 블록 사용



아이템 배열을 컴포넌트 클래스에서 정의해 봅시다:

```js
collection = [
    { id: 1, name: '아이템 1' },
    { id: 2, name: '아이템 2' },
    { id: 3, name: '아이템 3' }
  ];
```

컬렉션 요소를 렌더링하기 위해 @for (item of items; track item.id) ' 블록을 사용할 수 있습니다:

```js
<ul>
@for (item of collection; track item.id; let index = $index, first = $first; let last = $last, even = $even, odd = $odd; let count = $count) {
<li><strong>{item.name}</strong> index={index} first={first} last={last} even={even} odd={odd} count={count}</li>
}
</ul>
```



컬렉션 내 각 항목은 고유한 속성(예: id와 같은)을 가져야 하며, 이 값을 track 인수로 참조해야 합니다. 컬렉션이 객체가 아닌 문자열이나 숫자를 포함하는 경우에는 항목 자체를 track 값으로 사용할 수 있습니다: @for (item of items; track item) '.

현재 항목 옆에 @for 표현식을 사용하면 블록 내에서 다음 값에 액세스할 수 있습니다:

- $index: 컬렉션 내 항목의 인덱스
- $even: 인덱스가 짝수인 경우 true
- $odd: 인덱스가 홀수인 경우 true
- $count: 컬렉션 내 항목 수
- $first: 현재 항목이 컬렉션 내 첫 번째인 경우 true
- $last: 현재 항목이 컬렉션 내 마지막인 경우 true

# @for에서 전달된 빈 컬렉션을 처리하기 위해 @empty 블록 사용하기



@for 블록 아래에 @empty 블록을 추가할 수 있습니다. @empty 블록의 내용은 @for 블록에 전달한 컬렉션이 비어있을 때 렌더링됩니다:

```js
<ul>
@for (item of emptyCollection; track item.id;) {
<li><strong>{item.name}</strong></li>
}
@empty {
  <span>컬렉션이 비어 있습니다</span>
}
</ul>
```

# @switch, @case 및 @default로 제어 흐름 변경

다음 예시에서 네 개의 라디오 버튼과 radioValue signal을 생성합니다. signal의 초기값은 1이며 사용자가 라디오 버튼을 클릭할 때 signal의 값이 1, 2, 3 또는 4로 변경됩니다:



```js
<div>
  <div>
    <input type="radio" [checked]="radioValue() === 1" (change)="radioValue.set(1)" id="radio1"/>
    <label for="radio1">1</label>
  </div>
  <div>
    <input type="radio" [checked]="radioValue() === 2" (change)="radioValue.set(2)" id="radio2"/>
    <label for="radio2">2</label>
  </div>
  <div>
    <input type="radio" [checked]="radioValue() === 3" (change)="radioValue.set(3)" id="radio3"/>
    <label for="radio3">3</label>
  </div>
  <div>
    <input type="radio" [checked]="radioValue() === 4" (change)="radioValue.set(4)" id="radio4"/>
    <label for="radio4">4</label>
  </div>
</div>
<div>
```
라디오 버튼 3개를 선택했습니다.
```js
@switch (radioValue()) {
  @case (1) {
    <span>Case 1</span>
  }
  @case (2) {
    <span>Case 2</span>
  }
  @default {
    <span>Default case (Not 1 or 2)</span>
  }
}
</div>
```



앱 템플릿의 이전 구조 지시문을 새 제어 블록으로 변환하려면 다음 스키마틱을 실행하세요:

```js
ng g @angular/core:control-flow-migration
```

# 요약

본 문서에서는 Angular 17의 새로운 제어 흐름이 어떻게 작동하는지를 보여드렸습니다: 새로운 제어 블록 구문을 사용하여 조건부 블록 및 반복문을 만드는 방법을 안내했습니다. 내 튜토리얼이 유용했기를 바라며!



이 기사 시리즈의 첫 부분에서는 새로운 지연 블록의 작동 방식과 이러한 블록 내용의 로딩 및 렌더링을 트리거할 조건을 지정하는 방법에 대해 설명했습니다: 새로운 Angular 17 기능: 지연 로딩.

그리고 언제든지 피드백을 주시면 감사하겠습니다!

# 👨‍💻저자 소개

내 이름은 Gergely Szerovay이고, 프론트엔드 개발 챕터 리드로 일하고 있습니다. Angular 가르치기 (및 배우기)는 제 소질 중 하나입니다. Angular 관련 콘텐츠를 매일 소비합니다 — 기사, 팟캐스트, 컨퍼런스 강연 등을 포함하여요.



저는 매달 발견한 최고의 자료를 여러분에게 보낼 수 있도록 Angular Addict 뉴스레터를 만들었어요. 경험 많은 Angular Addict 이든 초보자든 모두 대상입니다.

뉴스레터 외에도 Angular Addicts라는 제 판에서 — 맞아요! — 수집한 가장 유익하고 흥미로운 자료들을 소개하고 있어요. 글쓴이로 참여하고 싶다면 언제든지 알려주세요.

함께 Angular를 배워봐요! 여기서 구독하기 🔥

Substack, Medium, Dev.to, Twitter 또는 LinkedIn에서 저를 팔로우해서 Angular에 대해 더 많은 정보를 얻어보세요!