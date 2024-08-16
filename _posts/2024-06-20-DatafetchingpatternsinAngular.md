---
title: "앵귤러에서의 데이터 가져오기 패턴"
description: ""
coverImage: "/assets/img/2024-06-20-DatafetchingpatternsinAngular_0.png"
date: 2024-06-20 00:10
ogImage: 
  url: /assets/img/2024-06-20-DatafetchingpatternsinAngular_0.png
tag: Tech
originalTitle: "Data fetching patterns in Angular"
link: "https://medium.com/medialesson/data-fetching-patterns-in-angular-185da4cfbcde"
isUpdated: true
---




쥬타오 취(邱俊涛)는 최근 마틴 파울러의 웹사이트에 싱글 페이지 애플리케이션에서의 데이터 패칭 패턴에 관한 기사를 게시했어요. 꼭 읽어보길 추천하는데, 모든 예시는 React나 순수 JavaScript를 사용해요. 이어서 나오는 내용에서는 모든 설명된 패턴들을 Angular 애플리케이션에 적용하는 방법을 볼 거에요. Angular와 React 간의 알려진 차이 때문에 결과가 많이 다르게 나타나요.

# 라이브러리와 프레임워크

React는 라이브러리로서 자신을 소개하지만, Angular는 웹 프레임워크로 간주될 수 있어요. 싱글 페이지 애플리케이션을 구축하는 데 필요한 모든 것을 포함하고 있으며 라우팅 및 데이터 패칭을 위한 도구가 함께 제공돼요. Angular는 이러한 도구들을 사용하도록 강요하지 않지만, 물론 사용할 수 있어야 해요. 이 모든 것에는 장단점이 있지만, 이는 또 다른 이야기에요. 결국, 두 접근 방식은 높은 품질의 코드를 생성하고 실행 가능한 웹 애플리케이션을 만들 수 있게 도와줘요.

# 조금 다른 프로필 컴포넌트

<div class="content-ad"></div>

여기 설명된 소스 코드는 Angular 애플리케이션에 내장되어 있으며 Codeberg에서 사용할 수 있습니다.

Juntao Qiu는 프로필 구성 요소를 구현하는데, 사용자의 ID를 매개변수로 받습니다. 초기 렌더링 후에 그리고 이 ID가 변경될 때마다, 구성 요소는 해당 사용자의 프로필 데이터를 서버에서 가져옵니다. 그런 다음, 받은 정보를 UserBrief라는 다른 구성 요소를 사용하여 표시합니다. 나중에, 이 구성 요소는 Friends 구성 요소를 사용하여 사용자의 친구 목록을 표시합니다.

서버가 없기 때문에, 여기서 설명된 구현은 사용자, 그들의 게시물 및 사진 앨범을 모델로 만듭니다. 이 모든 것은 공개적으로 사용 가능한 JSONPlaceholder API의 일부입니다.

Angular의 HTTP 클라이언트의 주요 차이점 중 하나는 다른 구현과 비교했을 때 각 메서드가 RxJS Observable을 반환한다는 것입니다. RxJS는 반응형 프로그래밍을 위한 라이브러리로, Node.js와 TypeScript와 함께 Angular의 주요 종속성입니다. 이렇게 함으로써, Angular은 네트워크 요청을 만들 때 반응형 프로그래밍을 권장하지만 강제하지는 않는다.

<div class="content-ad"></div>

물론, 다른 HTTP 클라이언트를 사용할 수도 있습니다. 또는 Observables를 Promises로 변환하고 Juntao Qiu의 구현을 약간 수정할 수도 있습니다. 그러나 두 경우 모두 몇 가지 이점을 잃게 될 것입니다. 예를 들어 Angular의 HTTP 클라이언트를 사용하면 쉽게 인터셉터를 사용할 수 있습니다. 또한 Observables은 취소할 수 있어서 소홀히 여길 수 없는 장점입니다. 애플리케이션의 다른 페이지로 빠르게 이동하는 사용자를 상상해보세요. Promises는 트리거하는 구성 요소가 이미 파괴되었더라도 네트워크 요청을 계속하므로 무언가를 반환할 때까지 지속됩니다.

여기서 설명된 Angular의 데이터 가져오기 패턴 구현은 Angular의 내장 기능을 사용하여 반응형 프로그래밍 접근 방식을 따릅니다.¹

# 비동기 상태 핸들러

이 패턴의 일반적인 아이디어를 이해하려면 Juntao Qiu의 비동기 상태 핸들러 섹션을 읽어보세요.

<div class="content-ad"></div>

비동기 상태 핸들러의 아이디어는 비동기 작업을 명시적인 로딩 및 오류 상태와 결합하는 것입니다. 비동기 작업이 진행 중인 경우 상태는 로딩입니다. 작업은 오류 상태로 또는 작업의 실제 결과와 함께 끝납니다. 일반적인 작업 결과 T를考える 때, 비동기 상태 핸들러는 T 또는 `로딩` 또는 `오류`를 반환하는 함수입니다. 유니언 타입을 사용하면 결과가 항상 정확히 하나의 상태임을 강조합니다. 로딩 및 오류 상태를 나타내는 문자열 리터럴 타입을 사용하면 간단하지만 설명적입니다. 필요한 경우 다른 타입으로 대체할 수도 있습니다.

패턴의 선택적 확장은 재시도 기능입니다. 따라서 비동기 상태 핸들러는 비동기 작업을 다시 반복적으로 실행할 수 있는 기능을 제공해야 합니다.

## Angular에서 비동기 상태 핸들러 구현하기

우리는 커스텀 RxJS 오퍼레이터로 Angular에서 비동기 상태 핸들러를 구현할 수 있습니다. 간단한 용어로, 오퍼레이터는 observable 형태의 임의의 비동기 작업을 입력 매개변수로 받습니다. 구독할 때 즉시 로딩 상태를 발행합니다. 비동기 작업이 완료되면 결과를 반환합니다. 무언가 잘못되면 오류 상태를 반환합니다.

<div class="content-ad"></div>

```js
function toAsynchronousStateHandler<T, R>(
  projection: (value: T) => Observable<R>,
) {
  return switchMap((value: T) =>
    projection(value).pipe(
      startWith('loading' as const),
      catchError(() => of('error' as const)),
    ),
  );
}
```

프로필 컴포넌트에서는 사용자 ID를 포함하는 라우트가 변경될 때마다 해당 연산자를 사용합니다.

```js
private readonly httpClient = inject(HttpClient);
private readonly activatedRoute = inject(ActivatedRoute);

protected readonly user$: Observable<UserResponse | 'loading' | 'error'> =
  this.activatedRoute.params.pipe(
    toAsynchronousStateHandler((params) =>
      this.httpClient.get<UserResponse>(
        `https://jsonplaceholder.typicode.com/users/${params['id']}`,
      ),
    ),
  );
```

컴포넌트의 마크업에서는 Asynchronous State Handler의 현재 유형을 결정하기 위해 협소화(narrowing)를 사용할 수 있습니다. 이는 순수 TypeScript와 거의 유사합니다. 사용자 Observable에 구독하여 초기 가져오기를 초기화하고, 구독 취소로도 중지할 수 있습니다. Angular의 비동기 파이프(async pipe) 덕분에 사용자 Observable을 수동으로 구독하고 취소할 필요가 없습니다. 컴포넌트가 렌더링된 후 자동으로 구독하며, 컴포넌트가 파괴될 때 HTTP 요청을 취소할 수도 있습니다.

<div class="content-ad"></div>

```js
@if (user$ | async; as user) {
  @if (user === "loading") {
    Loading...
  } @else if (user === "error") {
    Error...
  } @else {
    <app-user-brief [user]="user" />
  }
}
```

현재 구현은 데이터를 다시 가져오는 가능성만 부족합니다. 반응형 프로그래밍에서는 물론 observable을 사용하여 이를 수행합니다. 기존 observable에 추가로 void 유형의 추가적이지만 선택적인 observable을 결합할 수 있습니다. 이 observable은 데이터를 포함하지 않고 작업을 트리거합니다.
재사용 가능한 연산자에서 모든 것을 처리하기 위해 이제 함수를 반환합니다. 이렇게 하면 소스 observable에 액세스할 수 있고 트리거 observable과 결합할 수 있습니다. 이 트리거 observable은 언제든 무언가를 발행해서는 안되므로 시작 값으로 확장해야 합니다.
결합된 observable 중 하나라도 무언가를 발행하면, 진행 중인 비동기 작업이 전부 취소되어 다시 시작되기 전에 취소됩니다.

```js
export function toAsynchronousStateHandler<T, R>(
  projection: (value: T) => Observable<R>,
  reloadTrigger = new Observable<void>(),
) {
  return function (source: Observable<T>) {
    return combineLatest([
     source, 
     reloadTrigger.pipe(startWith(void 0))
 ]).pipe(
      switchMap(([value, _]) =>
        projection(value).pipe(
          startWith('loading' as const),
          catchError(() => of('error' as const)),
        ),
      ),
    );
  };
}
```

프로필 구성요소에서는 값을 발행할 수 있는 표준 Subject를 사용하고 있습니다. 이를 연산자에 전달하고 해당 Subject의 next() 함수를 사용하여 다시 가져오기를 트리거할 수 있습니다.


<div class="content-ad"></div>

```javascript
private readonly refetchTrigger$$ = new Subject<void>();

protected readonly user$: Observable<UserResponse | 'loading' | 'error'> =
  this.activatedRoute.params.pipe(
    toAsynchronousStateHandler(
      (params) =>
        this.httpClient.get<UserResponse>(
          `https://jsonplaceholder.typicode.com/users/${params['id']}`,
        ),
      this.refetchTrigger$$.asObservable(),
    ),
  );

protected onRefetch() {
  this.refetchTrigger$$.next();
}
```

# 병렬 데이터 가져오기

쥬닷오 치우의 병렬 데이터 가져오기 섹션을 읽어보시면 이 패턴의 일반적인 아이디어를 이해할 수 있습니다.

이름 그대로, 병렬 데이터 가져오기 패턴은 데이터를 병렬로 가져오는 것을 다룹니다. 이를 통해 요청 폭포를 줄일 수 있습니다.


<div class="content-ad"></div>

## Angular에서 병렬 데이터 가져오기 구현

Angular 및 따라서 RxJS를 사용하면 여러 내장 Join Creation Operators를 사용할 수 있습니다. 이러한 연산자를 사용하면 여러 개의 observables로부터 발행된 값을 결합할 수 있습니다. Promise.all에 가장 가까운 것은 forkJoin 연산자입니다. 이 연산자는 배열 또는 observables 사전을 입력 매개변수로 사용하고 각각 배열 또는 값 사전을 발행합니다.

비동기 상태 핸들러 연산자는 모든 observable에 대해 작동하기 때문에 프로필 컴포넌트를 간단한 사용자 정보뿐만 아니라 사용자의 게시물도 가져오도록 쉽게 확장할 수 있습니다.

```js
protected readonly dataRequest$ = this.activatedRoute.params.pipe(
  toAsynchronousStateHandler(
    (params) =>
      forkJoin({
        user: this.httpClient.get<UserResponse>(
          `https://jsonplaceholder.typicode.com/users/${params['id']}`,
        ),
        posts: this.httpClient.get<PostResponse[]>(
          `https://jsonplaceholder.typicode.com/users/${params['id']}/posts`,
        ),
      }),
    this.refetchTrigger$$.asObservable(),
  ),
);
```

<div class="content-ad"></div>

마크업에서는 여전히 우리의 비동기 데이터 요청의 현재 유형(또는 상태)을 결정하기 위해 narrowing을 사용합니다. 로딩 중이거나 오류 상태가 아닌 경우에는 forkJoin 연산자에 전달한 구조에 안전하게 접근할 수 있습니다.

```js
@if (dataRequest$ | async; as dataRequest) {
  @if (dataRequest === "loading") {
    Loading...
  } @else if (dataRequest === "error") {
    Error...
  } @else {
    <app-user-brief [user]="dataRequest.user" />
    <app-posts [posts]="dataRequest.posts" />
  }
}
```

# 대체 마크업

이 패턴의 일반 아이디어를 이해하려면 전투 마크업에 대한 Juntao Qiu의 섹션을 읽어주세요.

<div class="content-ad"></div>

Fallback Markup 패턴의 아이디어는 로딩 또는 에러와 같은 비동기 작업의 다양한 상태를 처리하는 데 필요한 보일러플레이트 코드를 줄이는 데 있습니다.

## Angular에서 Fallback Markup 구현

프로필 컴포넌트의 마크업을 되짚어 봅시다. 우리는 비동기 작업의 상태를 모델링하기 위해 연합 유형을 사용하여 현실에 가깝게 표현했습니다(한 번에 하나의 상태). Angular의 제어 흐름과 유형 축소를 사용하여 비동기 작업의 현재 유형 또는 상태에 따라 조건부로 콘텐츠를 렌더링할 수 있습니다. 상태의 유형을 비호환적인 방법으로 변경하면 TypeScript 에러가 발생합니다.

```js
@if (dataRequest$ | async; as dataRequest) {
  @if (dataRequest === "loading") {
    Loading...
  } @else if (dataRequest === "error") {
    Error...
  } @else {
    <app-user-brief [user]="dataRequest.user" />
    <app-posts [posts]="dataRequest.posts" />
  }
}
```

<div class="content-ad"></div>

이제 React의 Suspense 컴포넌트와 유사한 방식을 적용할 수 있습니다. 그러나 타입을 좁게 하는 것을 잃을 가능성이 높습니다. 아니면 더 나쁜 경우에는 어떤 타입 안전성도 잃을 수 있습니다. Angular 템플릿을 다룰 때 이러한 일이 종종 발생합니다. 물론 로딩 및 오류 상태를 처리하는 전용 컴포넌트를 만들 수 있습니다. 또는 모든 네트워크 요청의 로딩 및 오류 상태를 처리하는 인터셉터를 사용할 수도 있습니다.

그러나 Angular의 제어 흐름을 통해 이미 견고하고 가독성 좋은 내장 솔루션을 얻을 수 있습니다. 나머지는 각 어플리케이션 및 오류 처리 및 로딩 상태에 대한 일반적인 전략에 의존합니다. 예를 들어, 많은 표현 컴포넌트와 모든 비동기 작업을 처리하는 몇 개의 컨테이너 컴포넌트만 있는 접근 방식은 설계적으로 이 패턴에 대한 사용 사례를 줄일 수 있습니다.

# 코드 분할

Juntao Qiu의 코드 분할 섹션을 읽어 이 패턴의 일반 아이디어를 이해해보세요.

<div class="content-ad"></div>

## Angular에서 라우터를 사용하여 코드 분할 구현하기

Angular의 내장 라우터를 사용하면 브라우저의 동적 `import` 표현식을 활용하여 모듈을 필요한 경우에만 Lazy로드할 수 있습니다. 여기서 모듈이란 Angular 모듈(NgModule), 독립적인 컴포넌트 또는 다른 라우터 구성을 의미합니다.

프로필 컴포넌트를 제공하고 다른 라우트에서 사진 앨범을 표시하는 애플리케이션의 간략한 라우터 구성은 다음과 같이 보일 수 있습니다.

```js
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(
        (module) => module.ProfileComponent,
      )
  },
  {
    path: 'albums',
    loadComponent: () =>
      import('./albums/albums.component').then(
        (module) => module.AlbumsComponent,
      )
  }
];
```

<div class="content-ad"></div>

위의 표는 Markdown 형식으로 변경하였습니다.


| Lazy chunk files  | Names            | Raw size  |
| ----------------- | ----------------- | --------- |
| chunk-OQXIE7JX.js | profile-component | 6.70 kB   | 
| chunk-FX2UNWRV.js | albums-component  | 4.96 kB   | 
| chunk-REKZS4LG.js | -                 | 500 bytes |


기본적으로 Angular 라우터가 청크의 지연 로드를 수행할 때 특별한 표시가 없습니다. 사용자 경험을 향상시키기 위해 어플리케이션의 루트 수준에 일부 로딩 표시기를 표시하는 것이 유용할 수 있습니다. Angular 라우터는 지연 로드가 시작되거나 끝날 때 두 가지 특정 이벤트를 제공합니다.

```typescript
export class AppComponent {
  private readonly router = inject(Router);

  protected readonly isRouterLazyLoading$ = this.router.events.pipe(
    filter(
      (event) =>
        event instanceof RouteConfigLoadStart ||
        event instanceof RouteConfigLoadEnd,
    ),
    map((event) => {
      if (event instanceof RouteConfigLoadStart) {
        return true;
      }
      return false;
    }),
    startWith(false),
  );
}
```

<div class="content-ad"></div>

## Angular에서 Deferrable Views로 코드 분할 구현하기

Angular의 최근에 도입된 Deferrable Views를 사용하면 컴포넌트 템플릿 내에서 컴포넌트를 지연로드할 수 있습니다. 이러한 Deferrable Views는 React의 Suspense 컴포넌트와 lazy 컴포넌트로드를 결합한 것과 유사하지만 추가 기능의 수에서 다릅니다.

우리의 프로필 컴포넌트에서 사용자의 모든 게시물을 즉시 표시하고 싶지 않다고 가정해 보겠습니다. 대신에 사용자는 게시물을 표시하기 위해 전용 버튼을 클릭해야 합니다. 이를 위해 게시물을 표시하는 컴포넌트를 Deferrable View에 넣고 버튼을 플레이스홀더로 표시할 수 있습니다. Deferrable View에 상호작용 시로드하도록 지시하여 버튼을 클릭하면 실제 내용이 로드됩니다. 비동기 상태 핸들러와 유사하게 로딩 및 오류 상태를 위한 특별한 템플릿도 전달할 수 있습니다.

```js
@defer (on interaction) {
  <app-posts [posts]="dataRequest.posts" />
} @placeholder {
  <button>Show Posts</button>
} @loading {
  Loading posts...
} @error {
  Error...
}
```

<div class="content-ad"></div>

현재 Angular가 하는 일은 Deferrable View의 내용을 별도의 청크로 분리하는 것입니다. 이 작업을 수행하려면 내용이 다른 곳에서 직접 참조되지 않아야 합니다. 빌드 결과에서 추가적인 청크를 확인할 수 있습니다.

```js
최적화 청크 파일    | 이름               |  원본 크기
chunk-OQXIE7JX.js   | 프로필 컴포넌트    |   6.70 kB | 
chunk-FX2UNWRV.js   | 앨범 컴포넌트     |   4.96 kB | 
chunk-4UTUEDCN.js   | 게시물 컴포넌트  |   2.02 kB |
chunk-REKZS4LG.js   | -                  | 500 bytes |
```

브라우저의 개발자 도구 네트워크 패널에서 버튼을 처음 클릭할 때 새로운 청크가 로드되는 것을 확인할 수 있습니다.

## 이미지 최적화와 함께 Angular에서 코드 분할 구현하기

<div class="content-ad"></div>

만약 이미지를 청크로 간주하고 코드 분할이 "필요할 때 로드되는 청크"를 다루는 것이라면, 이미지도 다른 청크와 마찬가지로 처리하는 것이 좋을 수 있습니다. 뷰포트에 보이지 않는 이미지도 많이 담고 있는 수십 개의 이미지를 표시하는 컴포넌트를 상상해보세요. 브라우저에 따라 `img` 요소는 한 번에 모든 이미지를 로드하게 할 것입니다. 심지어 이미지 로딩이 시작되면 웹사이트를 닫아야만 취소할 수 있습니다. 사용자가 단일 페이지 애플리케이션 내에서 다른 경로로 이동할 때도 모든 이미지의 다운로드가 완료될 때까지 계속될 것입니다.

샘플 애플리케이션의 앨범 컴포넌트는 사용자의 모든 사진 앨범을 표시할 것이며 각 사진의 썸네일을 모두 표시합니다.

```js
@for (album of albums; track album.id) {
  @for (photo of album.photos; track photo.thumbnailUrl) {
    <img [src]="photo.thumbnailUrl" />
  }
}
```

이러한 단순한 방법론은 위에서 언급한 모든 문제점을 함께 가져올 수 있습니다. Angular에 통합된 이미지 최적화는 뷰포트와 가깝지 않은 이미지를 지연로드하는 크로스 브라우저 솔루션입니다. 이미지의 여러 가지 최적화 기법을 적용하는 것 외에도 플레이스홀더도 지원합니다.

<div class="content-ad"></div>

```js
@for (album of albums; track album.id) {
  @for (photo of album.photos; track photo.thumbnailUrl; let index = $index) {
    <img
      [ngSrc]="photo.thumbnailUrl"
      width="150"
      height="150"
      [priority]="index < 10 // 👈 처음 10개 이미지를 우선 순위로 지정"
      [placeholder]="placeholderImage"
    />
  }
}
```

브라우저의 개발자 도구 네트워크 패널에서 페이지를 스크롤할 때마다 어떻게 더 많은 이미지가 로드되는지 추적할 수 있습니다. 이것을 취소할 수 없는 방식으로 수백 개의 이미지가 로드되는 경향과 비교해보세요.

# 사전로드

Juntao Qiu의 사전로드 섹션을 읽어 이 패턴의 일반적인 아이디어를 이해해보세요.


<div class="content-ad"></div>

## Angular에서 Deferrable Views로 선입(preload) 구현하기

Angular의 Deferrable Views는 사용자 지정 조건이나 미리 정의된 트리거에 기초하여 지연된 뷰를 선입(preload)하는 기능을 지원합니다. 예를 들어, 브라우저가 유휴 상태일 때나 사용자가 플레이스홀더 위에 호버할 때 콘텐츠를 선입(preload)할 수 있습니다.

```js
@defer (on interaction; prefetch on hover) {
  <app-posts [posts]="dataRequest.posts" />
} @placeholder {
  <button>Show Posts</button>
} @loading {
  Loading posts...
} @error {
  Error...
}
```

# 결론

<div class="content-ad"></div>

어떤 도구를 선택하든, Juntao Qiu가 설명한 패턴들은 웹 애플리케이션을 개발할 때 항상 염두에 둬야 할 가치가 있습니다. Angular는 최근 도입된 기능들을 포함한 여러 내장 기능을 제공하며, 이 패턴들을 간단하고 표준화된 방식으로 적용하는 데 도움이 됩니다.

2024년 6월 6일에 https://lukket.me에서 원본이 게시되었습니다.

- 여기에 설명된 구현의 반응성은 읽기 전용 속성의 배타적 사용에 의해 지원됩니다.
- 어떤 유형 안전성에 대해 이야기하고 있다는 것은 일부러 한 말장난입니다.
- Angular 템플릿의 컨텍스트는 Angular 16 버전 이전에 미타입화된 객체였으며, 현재는 기본값으로 unknown이 지정된 일반적인 유형입니다. 마크업에서 일반 유형을 활용하는 방법에 대한 문서는 명확하지 않습니다.
- Angular의 Deferrable Views는 플레이스홀더와 에러 케이스를 위한 전용 템플릿을 지원합니다. Deferrable View의 로드는 다양한 방법으로 트리거할 수 있으며, 사전로드도 내장 기능으로 제공됩니다. 그러나 Deferrable View는 컴포넌트의 패치 요청(XHR)을 가로채지 않지만 React의 Suspense 컴포넌트는 그렇습니다.
- Firefox는 `img` 요소의 fetchPriority 속성을 아직 지원하지 않습니다.