---
title: "Angular ng-deep 사용 중단 후 대체 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Angular Alternatives after the deprecation of ng-deep"
link: "https://medium.com/@simon.sharp_25406/angular-alternatives-after-the-deprecation-of-ng-deep-b51591a296e7"
isUpdated: true
---





![Angular 대체품: ng-deep 폐기 후 대안](/assets/img/AngularAlternativesafterthedeprecationofng-deep_0.png)

# 개요

어느 날부터 앵귤러 팀이 SCSS 스타일링 시스템에서 ::ng-deep 가상 클래스를 사용하지 않기로 결정했습니다. 이 가상 클래스는 전역 스타일을 정의하거나 컴포넌트의 스타일 캡슐화를 해제하는 기능을 제공했습니다. 현재 ::ng-deep 가상 클래스가 언제까지 사용 가능할지 명확하지 않습니다. 언제나 부족했던 것은 새로운 도구나 방법으로 ::ng-deep를 대체할 수 있는 것이었습니다. 더 알려지지 않은 것은 이미 존재하는 도구들입니다. 그래서 우리는 가능한 대안을 살펴보겠습니다.

# ngClass 버전

<div class="content-ad"></div>

컴포넌트에서 @Input() 어노테이션을 사용하여 변수를 전달할 수 있고, [ngClass]를 사용하여 조건부 클래스를 설정할 수 있습니다. 이렇게 하면 CSS 파일 중 하나에 정의된 클래스를 커버할 수 있습니다.

**test.component.ts** TypeScript 파일

```js
@Component({
  selector: 'test',
  styles: [
    './test.component.scss',
  ],
  template: `
    <div [ngClass]="getTestClass()">테스트</div>
  `
})
export class TestComponent {
  @Input()
  public hasSpecificStyle: boolean = false;

  public getTestClass(): {[key: string]: boolean } {
    return {
     'test__specific-style': this.hasSpecificStyle
    };
  }
}
```

**test.component.scss** 파일

<div class="content-ad"></div>

```css
.test__specific-style {
  border: 1px solid red;
}
```

이 방식은 직접 작성한 구성 요소에 대해서는 꽤 잘 작동합니다. 그러나 코드에는 상당한 오버헤드가 있습니다. 또한 새로운 스타일이 필요할 때마다 구성 요소를 변경해야 합니다. 이것은 라이브러리와 함께 사용할 때 특히 유용하지 않게 됩니다.

# styles.scss 방법

styles.scss 파일에는 스타일 캡슐화를 신경 쓰지 않는 전역 스타일이 포함되어 있습니다. 이곳에서의 변경 사항은 전역적이므로 조금 더 신경써야 합니다. 여기에서 매우 구체적으로 스타일을 캡슐화하려고 하세요.

<div class="content-ad"></div>

# 호스트 콘텍스트 버전

이 버전에서는 우리의 테스트 파일을 사용하는 페이지 컴포넌트가 컴포넌트에 클래스를 정의하고, 컴포넌트 자체가 그 클래스를 가져와 사용합니다. 클래스를 가져오기 위해 여기에서 설명된 것처럼 :host-context(.class) 가사 클래스를 사용합니다.

페이지 HTML 파일

```js
<test class="specific-style"></test>
```

<div class="content-ad"></div>

The test.component.ts TypeScript file Markdown

```typescript
@Component({
  selector: "test",
  styles: ["./test.component.scss"],
  template: ` <div class="test__main">Test</div> `,
})
export class TestComponent {}
```

And the test.component.scss file Markdown

```scss
:host {
  :host-context(.specific-style) & {
    .test {
      &__main {
        border: 1px solid red;
      }
    }
  }
}
```

<div class="content-ad"></div>

# SCSS 변수 방식

이 버전에서는 SCSS 파일의 var( — custom-border-color, red) 선언을 사용합니다. 이를 통해 각 변수당 스타일 속성을 정의할 수 있습니다. 변수가 컴포넌트를 사용할 때 페이지 블록 아래에서 설명한대로 선언되거나 덮어쓰입니다. 이 버전은 외부에 컴포넌트를 제공하는 라이브러리로 작동해야 하는 경우나 공유 컴포넌트를 위한 경우에 좋습니다. 단점은 이미 정의된 변수만 덮어쓸 수 있고 아직 설정되지 않은 새로운 스타일을 적용할 수 없다는 것입니다.

테스트 컴포넌트를 사용하고 있는 SCSS 파일입니다.

```js
:host {
  test {
    --custom-border-color: green;
  }
}
```

<div class="content-ad"></div>

테스트.component.ts 타입스크립트 파일

```js
@Component({
  selector: "test",
  styles: ["./test.component.scss"],
  template: ` <div class="test__main">테스트</div> `,
})
export class TestComponent {}
```

<img src="/assets/img/AngularAlternativesafterthedeprecationofng-deep_1.png" />

그리고 테스트.component.scss 파일

<div class="content-ad"></div>

```js
.test {
  &__main {
    border-width: 1px;
    border-style: solid;
    border-color: var(--custom-border-color, red);
  }
}
```

# 출처

https://www.youtube.com/watch?v=PPmba5cBu3w
