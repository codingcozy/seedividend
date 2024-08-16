---
title: "앵귤러에서 let을 사용하여 템플릿 로컬 변수 생성하기"
description: ""
coverImage: "/assets/img/2024-05-18-TemplatelocalvariableswithletinAngular_0.png"
date: 2024-05-18 21:55
ogImage: 
  url: /assets/img/2024-05-18-TemplatelocalvariableswithletinAngular_0.png
tag: Tech
originalTitle: "Template local variables with @let in Angular"
link: "https://medium.com/@eneajahollari/template-local-variables-with-let-in-angular-4c6b3adfd9be"
isUpdated: true
---




![image](/assets/img/2024-05-18-TemplatelocalvariableswithletinAngular_0.png)

# Angular에서 let 사용하기

Angular를 오랫동안 사용해본 적이 있다면, 언젠가는 템플릿 내에서 변수를 선언하고 싶은 경우가 있을 것입니다. 이것은 나중에 템플릿에서 사용할 값을 저장하고 싶을 때 흔히 발생하는 상황입니다.

가장 일반적인 방법은 ngIf와 같은 디렉티브를 사용하여 as 키워드를 이용해 변수에 값을 할당하는 것입니다. 예를 들면:

<div class="content-ad"></div>

```js
<div *ngIf="user$ | async as user">
  <h1>{ user.name }</h1>
</div>

<!-- 또는 새로운 제어 흐름 사용 -->
@if (user$ | async; as user) {
  <h1>{ user.name }</h1>
}
```

숫자를 다루고 있을 때는 어떻게 될까요?

```js
<div>
    @if (points$ | async; as points) {
        <h1>당신은 { points } 포인트를 가지고 있습니다!</h1>
    }
</div>
```

템플릿에서 포인트가 0이라면 어떻게 표시될까요? 아무것도 표시되지 않을 것입니다! 왜냐하면 0은 falsy한 값이기 때문에 if 블록 내에서 사용될 때 내용을 표시하지 않습니다.

<div class="content-ad"></div>

새로운 @let 블록이 작용하는 곳입니다. @let 블록을 사용하면 템플릿 내에서 변수를 선언하고 나중에 템플릿에서 사용할 수 있습니다. 어떻게 작동하는지 살펴봅시다.

```js
<div>
    @let points = (points$ | async) ?? 0;  
    <h1>You have: { points } points!</h1>
</div>
```

이렇게 하면 points가 0이더라도 내용이 렌더링됩니다. 이는 let 블록이 Falsy 값을 확인하지 않기 때문에 발생하는 것이며 템플릿에서 그 시점에 변수를 선언하기 때문입니다.

또한, @let 블록의 가장 일반적인 사용 사례 중 하나는 복잡한 표현식에 대한 별칭을 저장할 수 있는 변수를 저장하는 것입니다. 예를 들어:

<div class="content-ad"></div>

```js
@let someField = someService.someSignal().someProperty.someOtherProperty;
<div>{ someField }</div>
```

# Angular에서 @let 사용 방법

다음은 새로운 @let를 여러 방법으로 사용할 수 있습니다:

- 비동기 파이프와 함께:

<div class="content-ad"></div>


```js
<div>
    @let user = (user$ | async) ?? { name: 'Guest' };  
    <h1>{ user.name }</h1>
</div>
```

- With control flow directives:

```js
<div>
    @let user = user$ | async;  
    @if (user) {
        <h1>{ user.name }</h1>
    }
</div>
```

- Inside @for to refactor code duplications:


<div class="content-ad"></div>

```js
<mat-selection-list>
    @for (item of items(); track item.id) {
        @let isSelected = item.id === selectedId();
        <mat-list-option [selected]="isSelected" [class.selected]="isSelected">
            { item.text } 
            @if (isSelected) {
                <span>(selected)</span>
            }
        </mat-list-option>
    }
</mat-selection-list>
```

- 삼항 연산자 활용:

```js
<div>
    @for (game of games; track game.id) {
        @let points = calcPoints(game.points > 0 ? game.points : 0);  
        <h1>You have: { points } points!</h1>
    }
</div>
```

- 기본 산술 연산자 활용:

<div class="content-ad"></div>

```js
<div>
   @for (게임 of 게임목록; 게임.id로 순회) {
       @let 합계 = 이전합계 + 게임.점수; 
       <h1>총 점수: { 합계 }</h1>
   }
</div>
```

- 신호와 함께:

```js
<div>
    @let 사용자이름 = 사용자()?.이름 ?? '손님';
    <h1>환영합니다, { 사용자이름 }</h1>
</div>
```

- 여러 선언을 한 줄에 나열하거나 여러 줄에 나눠서 선언하기:

<div class="content-ad"></div>

```js
<div>  
    @let total = count + previousCount, average = calcAverage(count), (여기서 `total`을 사용할 수 있을까요?)
    
    @let total = count + previousCount, 
         average = calcAverage(count)
    <h1>{total}</h1>
</div>
```

# 좋은 정보

let 선언은 JavaScript의 let 선언과 거의 동일하게 작동합니다.

- 스코핑은 JavaScript의 let과 동일하게 작동합니다.
- 타입 추론이 그대로 작동합니다!
- let 선언은 구성 속성보다 로컬 let 선언을 우선시합니다.
- let 선언은 정의되기 전에 참조할 수 없으며, 예외는 이벤트 핸들러 내에서 사용될 때입니다. 


<div class="content-ad"></div>

이 기능은 2017년 3월부터 열려 있던 문제를 해결합니다.

이 PR에서는 @let 블록이 도입되기 전에 고려된 여러 대안을 볼 수 있습니다.

- @let 대신 @const
- 새로운 키워드 전체
- @let 대신 @var
- 블록 형식의 구문

PR에 대한 자세한 정보는 여기에서 확인할 수 있습니다:

<div class="content-ad"></div>

여기서 새로운 @let 블록을 Angular 템플릿에서 사용하는 방법이 있습니다. 이 기능은 아마도 예상대로 다가오는 달에 출시될 Angular v18.1에서 사용 가능할 것으로 예상됩니다.

Angular 템플릿에서 @let 블록의 다른 사용 사례에 대해 떠오르는 것이 있으면 알려주세요. 🚀

# 읽어 주셔서 감사합니다!

만약 이 글이 흥미로웠고 유용하다고 생각되고 Angular에 대해 더 배우고 싶다면, 제게 커피 한 잔 사주는 걸로 응원해주세요 ☕️ 또는 X(이전 트위터) @Enea_Jahollari에서 저를 팔로우해주세요. Angular 최신 뉴스, 신호, 비디오, 팟캐스트, 업데이트, RFC, 풀 리퀘스트 등에 대해 많이 트윗하고 블로깅합니다. 💎