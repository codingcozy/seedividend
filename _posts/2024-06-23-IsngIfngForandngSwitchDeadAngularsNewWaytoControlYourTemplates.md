---
title: "ngIf, ngFor, ngSwitch 사라졌나요 앵귤러의 새로운 템플릿 제어 방법"
description: ""
coverImage: "/assets/img/2024-06-23-IsngIfngForandngSwitchDeadAngularsNewWaytoControlYourTemplates_0.png"
date: 2024-06-23 14:08
ogImage: 
  url: /assets/img/2024-06-23-IsngIfngForandngSwitchDeadAngularsNewWaytoControlYourTemplates_0.png
tag: Tech
originalTitle: "Is *ngIf, *ngFor and ngSwitch Dead? Angular’s New Way to Control Your Templates"
link: "https://medium.com/@hmidihamdi7/is-ngif-ngfor-and-ngswitch-dead-angulars-new-way-to-control-your-templates-881886f56516"
isUpdated: true
---





![Angular 17 Release](/assets/img/2024-06-23-IsngIfngForandngSwitchDeadAngularsNewWaytoControlYourTemplates_0.png)

Angular의 17 버전 릴리스는 템플릿 시스템을 개선하는 등 매우 흥미로운 새로운 기능이 포함되어 있습니다. 가장 중요한 추가 기능 중 하나는 제어 흐름을 위한 새로운 내장 구문입니다.

이 선언적 접근 방식은 *ngIf, *ngFor, ngSwitch와 같은 디렉티브가 필요하지 않도록하여 템플릿 로직을 프레임워크 자체 내에서 간소화합니다. 또한 Angular V17에서는 컴포넌트, 디렉티브 및 파이프를 게으르게 로드하여 성능을 향상시킬 수 있는 지연 로딩(deferrable views)을 도입했습니다. 이러한 발전은 Angular 템플릿에 상당한 영향을 미치며, 이에 따라 기존 응용 프로그램을 새로운 템플릿 시스템으로 이관하는 데 도움이 되는 새로운 ngcommand가 추가되었습니다.

다음은 템플릿에서 이 새로운 제어 흐름의 예시입니다:



<div class="content-ad"></div>

```js
@if (user.isHuman) {
  <human-profile [data]="user" />
   @for (skill of user.skills; track $index) {
     <human-skills  [name]="skill.name" [level]="skill.level" />
   } @empty {
    <span>기술이 추가되지 않았습니다.</span>
   }
} @else if (user.isRobot) {
  <!-- 로봇 사용자는 드물기 때문에 프로필을 나중에 불러옵니다. -->
  @defer {
    <robot-profile [data]="user" />
  }
} @else {
  <p>프로필을 알 수 없습니다!</p>
}
```

## @if 블록 조건

@if 블록은 조건이 참일 때 콘텐츠를 표시합니다.

```js
@if (loggedIn) {
  환영합니다 {username}
}
```

<div class="content-ad"></div>

table 태그를 Markdown 형식으로 변경할 수도 있습니다.

<div class="content-ad"></div>


@for (skill of user.skills; track $index) {
  <human-skills  [name]="skill.name" [level]="skill.level" />
}


트랙: Angular는 변경되는 컬렉션과 작업할 때 성능을 최적화하기 위해 개별 항목을 식별하는 트랙 표현식을 사용합니다. 이 기능은 각 항목을 해당 DOM 뷰와 연결하는 데 사용되는 키를 지정합니다. 이러한 키를 비교함으로써 Angular는 추가, 제거 또는 이동된 항목을 효율적으로 파악하여 불필요한 DOM 조작을 최소화할 수 있습니다. 효율적으로 트랙을 사용하면 Angular 애플리케이션의 성능을 크게 향상시킬 수 있습니다.

콘텍스트 변수: @for 내용 안에는 다음과 같은 많은 변수를 사용할 수 있습니다:

![contextual variables](/assets/img/2024-06-23-IsngIfngForandngSwitchDeadAngularsNewWaytoControlYourTemplates_1.png)


<div class="content-ad"></div>

```js
@for (skill of user.skills; track $index) {
  <human-skills  [name]="skill.name" [level]="skill.level" />
} @empty {
  <span> 기술이 추가되지 않았습니다.</span>
}
```

## @switch 블록 — 선택

다른 모든 프로그래밍 언어의 switch 문을 영감받아, 값은 === 연산자로 케이스 표현식과 비교됩니다.

<div class="content-ad"></div>

```js
@switch (condition) {
@case (caseA) {
Case A.
}
@case (caseB) {
Case B.
}
@default {
Default case.
}
}
```

Angular의 @switch 블록은 fallthrough가 없으므로 return 또는 break 문을 사용할 필요가 없습니다.

## Angular에서 @를 선택한 이유는?

Angular의 제어 흐름 및 지연 가능한 뷰 제안서는 긍정적인 피드백을 받았지만 템플릿에 대한 #-구문은 논란을 빚었습니다. 초기 RFC에서는 HTML과 유사한 태그를 제안했지만 커뮤니티 피드백은 새로운 "@-구문"을 선호했습니다. Angular 팀은 이 대안을 인기 때문에 평가하고 최종 결정을 내리기 전에 더 많은 데이터를 수집할 것입니다.

<div class="content-ad"></div>

Angular은 제어 흐름 구문 옵션인 #과 @에 대한 개발자 경험을 조사했습니다. 내부 팀, Google 개발자 전문가(GDE), 개발자 설문 및 사용자 연구를 통해 피드백을 수집했습니다. 결과는 분명하게 나타났습니다: 약 2 대 1의 비율로 개발자들이 원래의 "#-syntax" 대신 커뮤니티가 제안한 "@-syntax"를 선호했습니다.

이 차트는 Angular 팀 연례 설문에 응답한 수천 명의 개발자들의 선호도를 보여줍니다:

![Angular Team Survey](/assets/img/2024-06-23-IsngIfngForandngSwitchDeadAngularsNewWaytoControlYourTemplates_2.png)

Angular 팀이 커뮤니티가 제안한 @-syntax를 고려하는 것은 그들의 의지를 향한 증명입니다.

<div class="content-ad"></div>

## 어떤 제어 흐름이 대체될 것인가

- @switch 지시어는 여러 이점을 갖는 ngSwitch를 대체합니다. 먼저, 조건을 보관할 컨테이너 요소가 필요하지 않습니다. 둘째로, 템플릿 유형 확인을 지원합니다.
- @for 블록은 *ngFor 지시어를 대체합니다. 또한, @empty 블록 지원이 도입되며 추적에 대한 최적화를 제공합니다. 요소 컬렉션의 변경에 대한 응답으로 필요한 최소 DOM 작업 횟수를 계산하는 새로운 최적화 알고리즘을 활용합니다.

## 구조 지시어에서 마이그레이션

이 문서에서 언급된 대로, Angular 팀은 Angular 17부터 구조 지시어에서 단순화된 제어 흐름 구문으로의 마이그레이션을 고려해 왔습니다. 이 마이그레이션은 CommonModule이 필요하지 않도록 만듭니다. Angular CLI에는 이 프로세스를 자동화하는 새로운 스키매틱이 포함되어 있습니다.

<div class="content-ad"></div>

```js
$ ng generate @angular/core:control-flow
```

이 글의 끝까지 읽어 주셔서 감사합니다! 다음을 꼭 확인해 보세요:

- **박수**를 치고 작가를 팔로우 해 주세요 👏
- 저를 팔로우 해 주세요: X | LinkedIn | YouTube