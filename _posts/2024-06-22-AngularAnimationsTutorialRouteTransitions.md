---
title: "앵귤러 애니메이션 튜토리얼 라우트 전환 쉽게 배우기"
description: ""
coverImage: "/assets/img/2024-06-22-AngularAnimationsTutorialRouteTransitions_0.png"
date: 2024-06-22 03:31
ogImage: 
  url: /assets/img/2024-06-22-AngularAnimationsTutorialRouteTransitions_0.png
tag: Tech
originalTitle: "Angular Animations Tutorial: Route Transitions"
link: "https://medium.com/angular-animations/angular-animations-tutorial-route-transitions-3c652e09e561"
isUpdated: true
---




만약 라우팅을 갖춘 Angular 애플리케이션을 다룬 적이 있다면, 루트 간 이동 시에 트랜지션을 추가하고 싶었을 것입니다. 이렇게 하면 애플리케이션이 전체적으로 더 우아해 보입니다. 알고 계셨나요? Animation 모듈을 이용하면 이를 쉽게 구현할 수 있습니다. 이번 예제에서 그 방법을 보여드리겠습니다. 그럼 시작해봅시다.

# 시작하기 전에

자, 그러기 전에 너무 멀리 나가기 전에 Angular의 애니메이션 프레임워크에 중점을 둔 다수의 포스트를 이미 만들었다는 것을 기억하는 것이 중요합니다.

## Angular 애니메이션 자습서:

<div class="content-ad"></div>

- 기초 학습
- 입장 및 퇴장 애니메이션
- Keyframes 기능
- 쿼리 및 Stagger 함수
- 시작 및 완료 이벤트
- 병렬 애니메이션
- 알 수 없는 높이로 애니메이션 설정하기
- 매개변수로 유연성 추가
- 재사용 가능한 애니메이션 생성
- 애니메이션 비활성화 및 활성화

위 포스트들은 다양한 애니메이션 주제를 다루고 있습니다. 따라서 이 중 어떤 개념이 익숙하지 않다면, 이 포스트들을 먼저 확인해보는 것이 좋습니다. 그렇지 않으면 이 예제에서 헤맬 수 있습니다.

그리고, 이것들을 쉽게 찾을 수 있도록 우리는 Angular Animation 재생 목록을 YouTube 채널에서 만들었으니 확인해보세요!

좋아요, 충분하니까, 이제 이 포스트의 예제로 넘어가 보겠습니다.

<div class="content-ad"></div>

# 데모 애플리케이션

이 예제에서는 이 간단한 데모 애플리케이션을 사용할 것입니다. 이동할 수 있는 몇 가지 다른 페이지가 있습니다. 주 메뉴에서 링크를 클릭하면 해당 페이지로 이동됩니다. 

![image](https://miro.medium.com/v2/resize:fit:1400/0*wysR9eAe-EwO7yxd.gif)

하지만 서로 다른 페이지로 이동할 때 전환 효과가 있는 것이 더 좋을 것입니다. 여기서 보는 것처럼 횡단페이드 효과나 다른 효과가 있으면 좋을 것 같습니다.

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:1400/0*-Szw6y8W09ki2NN9.gif)

요번 예제에서 우리가 할 일이 바로 이것입니다. 하지만 먼저, 필요한 내용을 더 잘 이해하기 위해 기존 코드를 살펴보겠습니다.

# 기존 코드

그래, 언급했듯이, 이 앱은 이미 라우팅이 설정되어 있습니다. 따라서, 앱 컴포넌트를 살펴보면 템플릿에 router-outlet이 있다는 것을 알 수 있습니다.

<div class="content-ad"></div>

## main.ts

```js
@Component({
    selector: 'app-root',
    template: `
        <app-nav></app-nav>
        <router-outlet></router-outlet>
    `,
    ...
})
export class App {
}
```

내비게이션 구성 요소의 링크 중 하나를 클릭하면 라우트된 구성 요소가 router-outlet 요소의 형제로 삽입됩니다. 라우트 구성을 살펴보면, 주소 표시줄에서 볼 경로와 해당 경로로 이동할 때 표시하려는 구성 요소를 모두 제공한 곳입니다.

따라서 예를 들어 "blog" 경로로 이동하면 BlogComponent가 표시됩니다.

<div class="content-ad"></div>

```js
{
    path: 'blog',
    component: BlogComponent,
    title: '우리 블로그',
}
```

또는 "contact" 경로로 이동하면 ContactComponent가 표시됩니다.

```js
{
    path: 'contact',
    component: ContactComponent,
    title: '문의하기',
}
```

이해하셨죠? 새 경로의 활성 컴포넌트는 Angular 애니메이션 측면에서 "입력" 항목으로 간주됩니다. 그리고 이전 경로의 컴포넌트는 "떠나는" 항목으로 간주됩니다. 이것은 두 개를 모두 애니메이션화하는 방법을 갖게 될 것을 의미합니다.

<div class="content-ad"></div>

만약 "입장" 및 "퇴장" 애니메이션 개념이 익숙하지 않다면, 여기에 비디오가 있으니 꼭 확인해보세요. 개념을 더 잘 이해할 수 있습니다.

# 라우트 전환 애니메이션 만들기

자, 지금까지 모든 작업 방식에 대한 이해가 되었으니, 이제 애니메이션을 만드는 것부터 시작해봅시다. 이를 위해 애니메이션 코드를 추가하는 새 파일을 만들어야 합니다. "route-transition.ts" 라고 이름 짓겠습니다.

이제 내보낼 수 있는 상수를 추가해야 합니다. 앱 구성 요소에이 애니메이션을 가져올 수 있도록 하기 위해 "route-transition.ts"라고 이름 짓습니다. 상수의 이름은 "routeTransition"으로 지정해보겠습니다. 우리는 Angular 애니메이션 모듈에서 trigger() 함수를 사용하여 이를 설정할 것입니다. 이름으로도 routeTransition으로 지정할 수 있습니다.

<div class="content-ad"></div>

## route-transition.ts

```js
import { trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
]);
```

그 다음, transition() 함수가 필요합니다. 이 라우트 전환에서는 라우트 데이터 변경 시마다 실행되길 원할 것입니다. 따라서 별표(*)가 있는 모든 상태에서 다른 상태로 애니메이션을 적용할 것입니다.

```js
import { ..., transition } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
    transition('* => *', [
    ])
]);
```

<div class="content-ad"></div>

이제 이 애니메이션에서 처음 할 일은 항목이 "숨겨진" 상태에서 시작하도록 설정하는 것입니다. 그러니까, entering 컴포넌트를 쿼리하기 위해 query() 함수를 추가해봐요. 그런 다음 시작 스타일을 제공할 수 있도록 style() 함수를 추가할 거에요. 우리는 불투명도가 0이고 크기가 0.9인 상태로 시작할 거에요. 마지막으로 해야 할 일은 entering 항목을 찾지 못했을 때의 선택적 플래그를 추가하는 것이에요.

```js
import { ..., query, style } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, scale: 0.9 }),
        ], { optional: true })
    ])
]);
```

그렇죠, 다음은 leaving 컴포넌트를 전환할거에요. 그래서 떠나는 항목을 쿼리하기 위해 또 다른 query() 함수를 추가해봅시다.

이 항목의 경우 시작 스타일이 필요하지 않습니다. 왜냐하면 자동적으로 완전히 불투명하고 전체 크기로 시작하거든요. 우리가 해야 할 일은 애니메이션을 추가해서 animate() 함수를 추가하는 것이에요. 이 애니메이션을 정말로 볼 수 있도록 하기 위해 우리는 일 초 동안 애니메이션을 수행하도록 설정할 거에요. 그런 다음 애니메이션 효과를 줄 스타일을 추가하기 위해 다른 style() 함수를 사용하도록 해봅시다.

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

```js
export const routeTransition = trigger('routeTransition', [
    transition('* => *', [
        ...,
        query(':enter', [
            animate('1s', style({ opacity: 1, scale: 1 }))
        ], { optional: true })
    ])
]);
```

자, 애니메이션에 필요한 모든 것을 추가했습니다. 이제 전환하여 앱 컴포넌트에 추가할 수 있습니다.

# 부모 컴포넌트에 라우트 전환 애니메이션 추가

애니메이션을 사용하려면 먼저 컴포넌트 메타데이터에 애니메이션 배열을 추가해야 합니다. 이 배열 내에서 새 "routeTransition" 애니메이션을 추가해보세요.

<div class="content-ad"></div>

## main.ts

```js
import { routeTransition } from './route-transition';

@Component({
    selector: 'app-root',
    ...,
    animations: [
        routeTransition
    ]
})
export class App {
}
```

그럼, 이제 이것을 연결할 수 있습니다. 그전에 이 레이아웃이 어떻게 작동하는지 이해하는 것이 중요합니다. 그리드를 사용합니다. 첫 번째 열은 내비게이션을 위한 것이고, 두 번째 열은 라우트된 컴포넌트를 위한 것입니다. router-outlet의 형제인 모든 것은 두 번째 그리드 열에 배치됩니다. 즉, 들어오고 나가는 항목 모두 이 열 안에 서로 겹쳐 있습니다.

<img src="https://miro.medium.com/v2/resize:fit:1400/0*MTj1pIyBHdnErdu5.gif" />

<div class="content-ad"></div>

안타깝게도 여기서 해야할 일이 라우터 출력 주위에 컨테이너를 추가하는 것입니다. 애니메이션을 제대로 연결하려면 들어오고 나가는 항목을 쿼리할 수 있어야 하기 때문입니다.

하지만 걱정하지 마세요. display: contents로 설정하여 사실상 보이지 않도록 만들 수 있습니다. 그래서, div를 추가하고 이 div에 display, contents 스타일을 추가합시다.

```js
<div style="display: contents">
    <router-outlet></router-outlet>
</div>
```

그래서 여기가 우리가 애니메이션 트리거를 바인딩할 곳이며, 어떤 것에 바인딩하여 경로를 변경할 때 트리거할 것인가요?

<div class="content-ad"></div>

# 경로 전환을 트리거하는 방법

루트를 변경할 때 활성 라우트의 스냅샷 데이터 개체를 사용할 수 있습니다.

이를 위해 생성자를 추가해야 합니다. 그런 다음 ActivatedRoute를 주입해야 합니다. "route"라는 이름의 보호된 필드를 만들고 ActivatedRoute 클래스에 주입해야 합니다.

```js
import { ..., ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    ...
})
export class App {
    constructor(protected route: ActivatedRoute) {
    }
}
```

<div class="content-ad"></div>

이제 애니메이션 트리거를 div에 바인딩해봅시다. route, snapshot, data 객체에 바인딩할 거에요. 이 객체는 route가 변경될 때마다 업데이트되니 우리 애니메이션을 제대로 트리거하게 될 거에요.

```js
<div [@routeTransition]="route.snapshot.data" style="display: contents">
    <router-outlet></router-outlet>
</div>
```

좋아요, 거의 다 왔어요. 이 애니메이션이 작동하려면 providers 배열에 provideAnimations() 함수를 추가하여 애니메이션을 활성화해야 합니다.

```js
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
    providers: [ 
        ...,
        provideAnimations()
    ]
});
```

<div class="content-ad"></div>

좋아요, 이제 라우트 간에 전환할 때 필요한 모든 것이 준비되었어요. 이제 저장하고 시도해봅시다.

![image](https://miro.medium.com/v2/resize:fit:1400/0*ZC_28tRmHkrNc482.gif)

좋아요, 나가는 구성 요소와 들어오는 구성 요소를 모두 제대로 애니메이션화하는 것 같아요. 이제 조금 이상해 보이죠, 주로 얼마나 느리게 애니메이션되는지 때문에요. 기억하시죠, 나가는 항목에 1초간, 들어오는 항목에 또 1초간 애니메이션을 주고 있어요. 이것은 이러한 유형의 전환에 대해 꽤 느린 속도에요. 하지만 이 애니메이션이 어떻게 작동하는지 제시하고 싶었어요.

이제 작동하는 것을 볼 수 있고, 그것을 이해했으니, 0.2초와 같이 짧은 기간으로 전환해봅시다.

<div class="content-ad"></div>

## route-transition.ts

```js
    export const routeTransition = trigger('routeTransition', [
        transition('* => *', [
            ...,
            query(':leave', [
                animate('0.2s', ...)
            ], ...),
            query(':enter', [
                animate('0.2s', ...)
            ], ...)
        ])
    ]);
```

이제 저장하고 다시 시도해 보세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/0*FyBZwrhqsmy4Y9XB.gif)

<div class="content-ad"></div>

잘 했어요!

# 결론

물론, 이러한 종류의 애니메이션을 만드는 다양한 방법이 있습니다. 이제 Angular 애플리케이션에 라우트 전환을 추가하기 위해 필요한 모든 것을 알았으니, 상상력만이 당신을 막는 것일 뿐입니다.

아직도 Angular 애니메이션에 대해 다룰 내용이 많이 남아 있지만, 여기까지 하겠습니다. 앞으로 미래의 게시물을 계속 주시기 바랍니다.

<div class="content-ad"></div>

# 실제로 보고 싶으세요?

Stackblitz 예시에서 이 기술들의 데모 코드와 예시를 확인해보세요. 궁금한 점이나 생각이 있으시면 언제든 댓글을 남겨주세요.

# 이 내용 중에 도움이 되는 것이 있으셨나요?

만약 도움이 되는 내용이 있다면, 사랑을 표현해주고 싶다면 언제든 커피 한 잔 사주세요!

<div class="content-ad"></div>

원래 2024년 6월 13일에 https://briantree.se에서 게시된 내용입니다.