---
title: "템플릿 간소화하기 Angular 17에서의 제어 흐름"
description: ""
coverImage: "/assets/img/2024-05-18-StreamlineYourTemplatesControlFlowinAngular17_0.png"
date: 2024-05-18 22:35
ogImage: 
  url: /assets/img/2024-05-18-StreamlineYourTemplatesControlFlowinAngular17_0.png
tag: Tech
originalTitle: "Streamline Your Templates: Control Flow in Angular 17"
link: "https://medium.com/@mayankjain1394/streamline-your-templates-control-flow-in-angular-17-6045eca1a6c0"
---


<img src="/assets/img/2024-05-18-StreamlineYourTemplatesControlFlowinAngular17_0.png" />

안녕하세요, Angular 열정가 여러분! 오늘은 Angular 17의 새로운 혁신인 내장 제어 흐름 구문을 발표하려고 왔어요! 이 새로운 기능을 사용하면 추가 지시문 (ngIf, ngFor, ngSwitch)을 버리고 집에 온 듯한 키워드를 사용하여 템플릿에서 제어 흐름 로직을 직접 작성할 수 있어요 (자바스크립트 같아요!). 이것이 어떻게 당신의 Angular 경험을 향상시키는 지 한번 알아봐요!

우리는 여러 해 동안 조건부로 콘텐츠를 렌더링하고 데이터를 반복하는 데 지시문을 의존해 왔어요. 그들은 작동하지만 템플릿에 혼란과 복잡성의 추가 레이어를 덧붙일 수 있어요. Angular 17은 @if, @else if, @switch 및 @for 같은 익숙한 키워드를 사용하여 템플릿 내에서 직접 제어 흐름 로직을 작성할 수 있게 해줘요. 이러면 코드가 더 깔끔하고 읽기 쉽고 일반적인 자바스크립트를 작성하는 느낌이 들어요!

## 왜 지시문 대신 제어 흐름을 선택해야 할까요?

<div class="content-ad"></div>

아래는 변경하는 것이 좋은 몇 가지 설득력 있는 이유입니다:

- 뚜렷한 가독성: 제어 흐름 구문은 JavaScript의 제어 흐름 구조를 반영하여, JavaScript에 익숙한 사람들에게 이해하기 쉬운 템플릿을 만드는 데 도움이 됩니다.
- 중복성 감소: ✂️ 제어 흐름을 통해 여분의 지시문이 필요 없어져 더 깔끔하고 간결한 템플릿을 생성할 수 있습니다.
- 현대적인 개발 경험: 제어 흐름은 현대적인 JavaScript 관행과 일치하며, 일관되고 익숙한 개발 경험을 촉진합니다. 이는 더 적은 정신 부담과 놀라운 기능을 구축하는 데 더 많은 시간을 집중할 수 있다는 것을 의미합니다!

# @if와 @else로 익숙함을 받아들이다

참/거짓 변수에 따라 메시지를 표시하려는 시나리오를 상상해보십시오. 기존에는 다음과 같이 사용할 것입니다:

<div class="content-ad"></div>

```js
@if (isLoggedIn) {
  <p>다시 오신 것을 환영합니다!</p>
} @else {
  <p>로그인해주세요.</p>
}
```

이렇게 제어 흐름 구문을 사용하면 JavaScript에서 제어 흐름을 작성하는 방식과 더 자연스러워집니다. 더 복잡한 조건을 위해 @else if 문을 연결할 수도 있습니다.

<div class="content-ad"></div>

# Level Up Loops with @for

데이터 컬렉션을 반복하는 것은 Angular 애플리케이션의 기본적인 부분입니다. 이전에 우리는 *ngFor을 사용했습니다. 제어 흐름은 유사한 접근 방식을 제공합니다:

```js
<ul>
  <li *ngFor="let fruit of fruits">{ fruit.name }</li>
</ul>
```

제어 흐름에 대한 비교:

<div class="content-ad"></div>

```js
<ul>
  @for (과일 in 과일들; trackBy: 과일.name) {
    <li>{ 과일.name }</li>
  } @empty {
    <li>과일이 없습니다.</li>
  }
</ul>
```

하지만 기능이 향상되었습니다! 제어 흐름 구문을 사용하려면 trackBy를 사용하여 추적 함수를 지정해야 합니다. 이렇게 하면 Angular가 컬렉션 내의 변경 사항을보다 효율적으로 식별하여 앱이 특히 대규모 데이터 세트로도 원활하게 실행되도록 지원합니다! ❤️

# @switch로 결정 내리기 ⚖️

여러 조건에 따라 콘텐츠를 렌더링해야 하는 경우 @switch 문이 구원의 손을 내밀어줍니다:


<div class="content-ad"></div>

```js
@switch(selectedFruit) {
  @case(apple){
    <p>사과를 선택하셨네요!</p>
  }
  @case(banana){
    <p>바나나는 포타슘의 좋은 원천입니다!</p>
  }
  @default {
    <p>그것은 제가 알아듣는 과일이 아니에요.</p>
  }
}
```

이렇게 하면 템플릿 안에서 switch-case 로직을 보다 간결하고 가독성 있게 처리할 수 있어요. 멋지죠? ✨

# 링크

아래에서 제어 흐름 구문의 상세 정보를 찾을 수 있어요:

<div class="content-ad"></div>

- Angular — @for
- Angular — @switch
- Angular — @if