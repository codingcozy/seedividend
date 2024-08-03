---
title: "Angular 스타일 캡슐화 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_0.png"
date: 2024-07-13 18:52
ogImage: 
  url: /assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_0.png
tag: Tech
originalTitle: "How To Prevent Style Encapsulation To Break In Angular"
link: "https://medium.com/codex/how-to-prevent-style-encapsulation-to-break-in-angular-7d593ee6e812"
---


![image](/assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_0.png)

Medium 회원이 아니세요? 이 게시물을 일반 Medium 회원으로 보려면 여기를 클릭하세요.

스타일 캡슐화는 프론트엔드 개발을 더 쉽게 만드는 기능입니다. 이를 통해 웹 앱에서 발견되는 일반적인 문제인 하나의 컴포넌트에 의도된 CSS 스타일 선언이 다른 관련 없는 컴포넌트에 영향을 미치는 가능성을 줄일 수 있습니다. 범위가 지정된 스타일을 사용하고 전역 스타일을 최소화하는 것으로, 잠재적인 부작용을 줄이고 필요한 스타일을 해당 컴포넌트와 함께 유지할 수 있습니다.

물론, 전역 스타일을 사용해야 하는 경우가 있습니다 (예: 테마). Angular 애플리케이션에서 전역 스타일을 적용하는 두 가지 방법이 있습니다:

<div class="content-ad"></div>

- styles.css: 이 생성된 스타일시트에는 전체 애플리케이션에 적용되는 전역 CSS 스타일이 포함될 것입니다.
- 컴포넌트 수준에서 비활성화하거나 사용자 지정 ::ng-deep 의사 클래스를 사용하여 뷰 캡슐화를 피합니다.

기본적으로 Angular는 컴포넌트의 스타일이 해당 컴포넌트의 템플릿에서 정의된 요소에만 적용되도록 에뮬레이션된 캡슐화를 사용합니다. 이 모드에서 프레임워크는 각 컴포넌트 인스턴스에 고유한 HTML 속성을 생성하고 해당 속성을 컴포넌트의 템플릿 요소에 추가하며 해당 속성을 컴포넌트 스타일에서 정의된 CSS 셀렉터에 삽입합니다. 이 모드는 컴포넌트 스타일이 외부로 누출되어 다른 컴포넌트에 영향을 미치지 않도록 보장합니다.

<img src="/assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_1.png" />

그러나 직접 제어할 수 없는 서드 파티 컴포넌트를 다룰 때 스타일을 재정의해야 하는 경우가 있습니다. Angular의 에뮬레이션된 캡슐화 모드는 사용자 지정 의사 클래스인 ::ng-deep를 지원합니다. 이 의사 클래스를 CSS 규칙에 적용하면 해당 규칙에 대해 캡슐화가 비활성화되어 전역 스타일로 변환됩니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_2.png" />

이것은 간단한 예제입니다만, 프로젝트가 커지고 디버깅하기 어려워지는 상황을 상상할 수 있습니다. 이 경우에는 개발자가 의도하지 않았을 것으로 생각되는 언더라인이 없는 링크가 생기게 됩니다. 이러한 문제를 피하기 위해, 컴포넌트 스타일 선언에서 글로벌 스타일을 도입하기 어렵게 만들고 싶습니다.

## 스타일린트가 해결해 줍니다 🚒

스타일린트는 CSS(+SCSS 및 LESS와 같은 전처리기도 포함)에 대한 린터로, 코드베이스에서 오류를 피하고 일관성을 유지할 수 있도록 도와줍니다. 웹스톰 / VS 코드용 IDE 플러그인을 사용하거나 명령줄에서 직접 실행할 수 있습니다.

<div class="content-ad"></div>

selector-disabled-list 규칙을 활용할 것입니다. 시작과 끝에 슬래시(/)가 있어야만 stylelint가 이것을 정규 표현식으로 이해하도록 도와줍니다. selector가 ::ng-deep:로 시작하는지 확인하고, 만약 그렇다면 stylelint가 그것을 강조 표시할 것입니다.

```js
"selector-disallowed-list": [
   "/^::ng-deep/",
   {
     "splitList": true,
      "ignore": ["inside-block"]
   }
 ]
```

이 규칙은 ::ng-deep가 사용되지 않도록 하는 것은 아닙니다. 이상적인 상황에서는 실제로 이것을 피하실 것입니다. 그러나 이 규칙은 ::ng-deep를 첫 번째 selector로 사용하지 못하도록 하고, 이로 인해 뷰 캡슐화가 깨지고 다른 UI 요소에 의도치 않게 영향을 줄 수 있습니다. 블록 내부에서는 ::ng-deep를 사용하는 것이 적절할 수 있습니다.

<img src="/assets/img/2024-07-13-HowToPreventStyleEncapsulationToBreakInAngular_3.png" />

<div class="content-ad"></div>

어쩌면 stylelint에서 발생하는 오류를 주석으로 조용히 할 수 있습니다:

```js
/* stylelint-disable-next-line selector-disallowed-list */
::ng-deep body {
  background: red;
}
```

## 결론

이 짧은 포스트를 읽어주셔서 감사합니다! 뷰 캡슐화는 웹 애플리케이션에서 스타일이 누출되는 것을 방지하는 유용한 기능입니다. 그러나 Angular 애플리케이션에서 실수로 손쉽게 발생할 수 있기 때문에 실수를 커밋하기 전에 린터가 경고를 표시하는 것이 도움이 될 수 있습니다. 전역 스타일 문제에 대한 경험을 댓글로 공유해주세요.