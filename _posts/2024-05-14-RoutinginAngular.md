---
title: "앵귤러에서의 라우팅"
description: ""
coverImage: "/assets/img/2024-05-14-RoutinginAngular_0.png"
date: 2024-05-14 13:37
ogImage: 
  url: /assets/img/2024-05-14-RoutinginAngular_0.png
tag: Tech
originalTitle: "Routing in Angular"
link: "https://medium.com/@jaydeepvpatil225/routing-in-angular-924066bde43"
---


<img src="/assets/img/2024-05-14-RoutinginAngular_0.png" />

안녕하세요! 이 기사에서는 Angular에서 라우팅에 대해 이야기하고 서로 다른 컴포넌트를 렌더링하기 위해 라우팅을 사용하는 다양한 방법에 대해 알아볼 거예요.

# 아젠다

- Angular가 무엇인가요?



- 라우팅이란 무엇인가요?

- 라우팅의 장점은 무엇인가요?

- 앵귤러에서의 라우팅

- 라우팅 예시



# 요구 사항

- Node.js
- Angular
- VS Code



# 앵귤러란 무엇인가요?

앵귤러는 웹 애플리케이션을 구축하기 위한 인기있는 오픈 소스 JavaScript 프레임워크입니다. Google에서 개발되었으며 현재 Google의 앵귤러 팀에서 유지보수되고 있습니다. 앵귤러를 사용하면 개발자들은 동적인 싱글 페이지 애플리케이션(SPA)을 만들 수 있으며 복잡한 웹 애플리케이션을 구축하는 구조적인 방법을 제공합니다.

# 라우팅이란 무엇인가요?

웹 개발의 맥락에서 라우팅이란 특정 URL이나 경로에 대한 애플리케이션의 응답 방식을 결정하는 프로세스를 말합니다. 이는 URL을 애플리케이션 내의 다른 구성 요소나 뷰로 매핑하고 요청된 URL에 따라 적절한 콘텐츠를 렌더링하는 것을 포함합니다.



클라이언트 측 웹 애플리케이션인 Angular로 만든 싱글 페이지 애플리케이션(SPA)과 같은 경우에는 라우팅을 통해 사용자가 새로운 HTML 페이지를 서버에서 로드하지 않고도 서로 다른 뷰 또는 페이지 간을 이동할 수 있습니다. 대신, 요청한 라우트에 기반하여 응용 프로그램이 필요한 구성 요소와 데이터를 동적으로 업데이트하여 브라우저의 내용을 로드합니다.

라우팅의 장점

웹 애플리케이션의 라우팅은 여러 가지 이점을 제공합니다. 여기에 라우팅을 사용하는 주요 이점 중 일부가 있습니다:

사용자 경험 향상: 라우팅을 통해 전체 페이지 다시로드 없이 응용 프로그램 내에서 서로 다른 뷰나 페이지로 내비게이션할 수 있어 사용자 경험을 원활하고 상호작용적으로 만들어줍니다.



빠른 페이지 전환: 라우팅을 사용하면 요청된 경로에 필요한 컴포넌트와 데이터만 로드되어 더 빠른 페이지 전환을 경험할 수 있어요.

모듈화와 유지보수성: 라우팅은 응용 프로그램을 모듈화된 구조로 유지하도록 장려하여 특정 경로와 관련된 서로 다른 뷰나 컴포넌트로 분할합니다. 이는 코드의 재사용성, 관심사의 분리 및 더 나은 유지보수성을 촉진합니다. 각 경로에는 해당 컴포넌트가 있어서 응용 프로그램의 특정 섹션을 보다 쉽게 관리하고 업데이트할 수 있습니다.

조건부 렌더링과 동적 콘텐츠: 라우팅을 통해 현재 경로에 따라 컴포넌트를 조건부로 렌더링할 수 있습니다. 이를 통해 사용자의 탐색 경로에 따라 응용 프로그램의 특정 섹션을 표시하거나 숨길 수 있어요.

경로 매개변수와 쿼리 매개변수: 라우팅은 경로 매개변수와 쿼리 매개변수를 지원합니다. 경로 매개변수를 사용하면 URL 내에서 ID나 사용자 이름과 같은 동적값을 전달하고 해당 컴포넌트에서 이를 검색할 수 있습니다. 쿼리 매개변수는 URL에 추가 데이터를 전달하여 필터링, 정렬 또는 기타 목적으로 사용할 수 있어요.



보안 및 라우팅 가드: Angular 라우팅에는 특정 조건을 기반으로 특정 경로에 대한 액세스를 제어하는 메커니즘인 라우트 가드가 포함되어 있습니다. 라우트 가드는 인증, 권한 부여 및 기타 보안 관련 목적으로 사용할 수 있습니다. 사용자가 필요한 기준을 충족해야만 경로에 액세스하거나 작업을 수행할 수 있도록 도와줍니다.

중첩 라우트: 라우팅은 중첩된 또는 하위 경로를 지원하여 응용 프로그램 내에서 계층적 탐색 구조를 정의할 수 있습니다. 이는 다중 수준의 탐색 또는 캡슐화되고 독립적으로 관리해야 하는 섹션을 처리할 때 특히 유용합니다.

전반적으로 라우팅은 사용자 경험을 향상시키고 성능을 향상시키며 웹 애플리케이션에서 모듈식이고 유지 보수 가능한 코드 구조를 가능하게 하는 데 중요한 역할을 합니다.

# Angular에서의 라우팅



클라이언트 측 웹 애플리케이션에서 Angular을 사용하여 구축된 싱글 페이지 애플리케이션(SPA)과 같은 경우에는 라우팅을 통해 사용자가 서버로부터 새 HTML 페이지를 로딩하지 않고도 서로 다른 뷰 간을 이동할 수 있습니다. 대신에 어플리케이션은 요청된 경로에 기반하여 필요한 컴포넌트와 데이터를 동적으로 브라우저에 업데이트하여 내용을 렌더링합니다.

Angular에서의 라우팅은 일반적으로 다음 구성 요소를 포함합니다:

- 라우트(Routes): 라우트는 URL 경로와 해당 컴포넌트 간의 매핑을 정의합니다. 각 라우트는 URL 경로 및 해당 경로에 액세스할 때 렌더링될 컴포넌트로 정의됩니다.

- 라우터(Router): 라우터는 현재 URL을 해석하고 정의된 라우트를 기반으로 적절한 컴포넌트를 로딩하는 역할을 담당합니다. 라우터는 URL 변경을 감지하고 어플리케이션 내에서의 네비게이션을 처리합니다.



Router Outlet: 라우터 아웃렛은 현재 라우트의 내용이 렌더링되는 애플리케이션 템플릿의 자리 표시자입니다.

Router 링크 및 내비게이션: 링크 및 내비게이션 요소인 앵커 태그(`a`)나 버튼과 같은 요소는 애플리케이션 내에서 다른 라우트로의 이동을 트리거하는 데 사용됩니다. 이러한 요소에는 Angular의 routerLink와 같은 디렉티브로 대상 경로를 지정할 수 있습니다.

# Angular에서의 라우팅 예제

단계 1



NodeJS를 설치하세요.

https://nodejs.org/en/download

단계 2

다음 명령을 사용하여 Angular CLI를 설치하세요.



3단계

다음 명령어를 사용하여 NodeJS와 Angular CLI가 설치되었는지 확인하세요:

![Routing in Angular](/assets/img/2024-05-14-RoutinginAngular_1.png)

새로운 Angular 애플리케이션을 생성하세요.



**단계 4**

Angular 애플리케이션을 VS Code와 같은 편집기 중 하나에서 열고 다음 명령어를 사용하여 부트스트랩을 설치하세요:

이후에 angular.json 파일 내에 있는 스크립트 및 스타일 섹션에 부트스트랩 스크립트를 추가하세요.

```js
"styles": [
"src/styles.css",
"./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
"./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```



## 단계 5

터미널이나 명령 프롬프트를 열고 Angular 프로젝트 디렉터리로 이동합니다. 아래 명령어를 실행하여 컴포넌트를 생성합니다:

## 단계 6

라우팅 구성:



프로젝트에서 app-routing.module.ts 파일을 열어 새로 생성된 컴포넌트를 포함하도록 라우트 구성을 업데이트해주세요.

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductOfferComponent } from './components/product-offer/product-offer.component';
import { ProductUpdatesComponent } from './components/product-updates/product-updates.component';
import { RatingComponent } from './components/rating/rating.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // 기본 경로
  { path: 'home', component: HomeComponent },
  {
    path: 'product/:id', component: ProductComponent,
    children: [
      {path: '', redirectTo:'updates', pathMatch:'full'},
      { path: 'offers', component: ProductOfferComponent },
      { path: 'updates', component: ProductUpdatesComponent }
    ]
  },
  { path: 'about', component: AboutComponent, 
    children: [
      {path: 'rating', outlet:'rate', component:RatingComponent},
      {path: 'feedback', outlet:'feed', component:FeedbackComponent}
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

이 구성은 각 경로를 해당 컴포넌트에 매핑합니다.

Angular에서 RouterModule와 Routes는 응용 프로그램에서 라우팅을 구성하고 관리하는 데 사용되는 주요 구성 요소입니다.



## RouterModule:

RouterModule은 애플리케이션에서 라우팅을 구현하는 데 필요한 지시자, 서비스 및 기능을 제공하는 Angular 모듈입니다.

## Routes:

Routes는 애플리케이션 내에서 경로 및 구성을 정의하는 배열입니다. Routes 배열 내의 각 route 개체는 해당 경로에 액세스할 때 렌더링될 URL 경로 및 해당 구성 요소를 지정합니다.



13 번째 줄:

Angular에서 기본 경로를 정의하려면 빈 경로 ''를 Routes 배열 구성에서 경로로 사용할 수 있습니다. 빈 경로에 액세스하면 Angular가 해당 경로에 연결된 컴포넌트를 렌더링합니다.

기본 경로에 액세스할 때 다른 경로로 리디렉션하려면 redirectTo 속성을 사용하여 대상 경로로 이동할 수 있습니다. 또한 pathMatch 속성을 사용하여 경로의 일치 전략을 정의할 수 있습니다.

15 번째 줄부터 22 번째 줄까지:



제품 세부 정보를 표시하는 id 매개변수가 포함된 경로를 생성하려면 Angular에서 라우팅 구성을 다음과 같이 수정할 수 있습니다:

```js
path: 'product/:id', component: ProductComponent
```

이 예에서는 경로가 'product/:id'인 경로를 추가하여 제품 세부 정보 페이지를 나타냈습니다. :id 부분은 ProductComponent에서 액세스할 수 있는 동적 매개변수를 나타냅니다.

```js
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDetail? : any;

  constructor(private route : ActivatedRoute, private productService : ProductsService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.params['id'];
    this.getProductDetailById(productId)
  }

  getProductDetailById(id: number) {
    this.productService.getProductDetailById(id).subscribe(res => {
      this.productDetail = res
      console.log(res)
    })
  }
}
```



이 코드에서는 ActivatedRoute 서비스를 주입하여 현재 라우트의 매개변수에 액세스합니다. ngOnInit() 라이프사이클 훅에서는 this.route.snapshot.params['id']를 사용하여 id 매개변수를 검색하고 이를 나중에 구성 요소의 템플릿에서 사용하기 위해 productId 속성에 할당합니다.

마지막으로 URL에 id 값을 제공하여 제품 세부 정보 페이지로 이동할 수 있습니다. 예를 들어 id가 123인 제품이 있다면 http://localhost:4200/product/123로 이동하여 제품 세부 정보를 볼 수 있습니다.

ProductComponent는 URL에서 검색한 해당 id 매개변수로 렌더링되며 템플릿에서 관련 제품 정보를 표시하는 데 productId 속성을 사용할 수 있습니다.

ProductComponent 아래에 중첩된 자식 구성 요소인 ProductOfferComponent 및 ProductUpdatesComponent를 만들려면 Angular에서 라우팅 구성을 다음과 같이 수정할 수 있습니다:



루트 배열을 업데이트하여 ProductComponent 아래에 자식 라우트를 포함하도록 라우팅 모듈 (예: app-routing.module.ts)을 업데이트하세요:

```js
{
  path: 'product/:id', component: ProductComponent,
  children: [
    {path: '', redirectTo:'updates', pathMatch:'full'},
    { path: 'offers', component: ProductOfferComponent },
    { path: 'updates', component: ProductUpdatesComponent }
  ]
}
```

이 업데이트된 예제에서는 ProductComponent에 자식 라우트를 추가했습니다. 자식 라우트 내의 빈 경로 ''는 /product에 액세스할 때 렌더링할 기본 구성 요소로 ProductComponent에 해당합니다. offers 및 updates 경로는 각각 ProductOfferComponent 및 ProductUpdatesComponent로 매핑됩니다.



AboutComponent 아래에 중첩된 RatingComponent 및 FeedbackComponent 자식 구성 요소를 만들고, rating 및 feedback을 위한 이름이 지정된 outlet을 사용하려면 Angular에서 라우팅 구성을 다음과 같이 수정할 수 있습니다:

라우팅 모듈(예: app-routing.module.ts)의 Routes 배열을 업데이트하여 AboutComponent 아래에 자식 라우트를 이름이 지정된 outlet과 함께 포함시킵니다:

```js
{ 
  path: 'about', component: AboutComponent,
  children: [
    {path: 'rating', outlet:'rate', component:RatingComponent},
    {path: 'feedback', outlet:'feed', component:FeedbackComponent}
  ]
}
```

이 업데이트된 예제에서 AboutComponent에 자식 라우트를 추가하고 RatingComponent 및 FeedbackComponent에 대해 각각 이름이 지정된 outlet rate 및 feed을 지정했습니다.



AboutComponent 템플릿(about.component.html)을 구현하여 이름이 지정된 outlet(출구) 플레이스홀더를 포함하도록 합니다. 예를 들어:

```js
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur magni saepe sint, vel eaque veniam recusandae laboriosam numquam necessitatibus? Laborum mollitia excepturi qui. Modi corporis quasi ab minima eligendi numquam!</p>

<div class="row">
    <div class="col-md-6">
        <router-outlet name="rate"></router-outlet>
    </div>
    <div class="col-md-6">
        <router-outlet name="feed"></router-outlet>        
    </div>
</div>
```

이 템플릿에서는 'rate' 및 'feed'로 설정된 이름 속성을 가진 두 개의 `router-outlet` 플레이스홀더를 추가했습니다. 이 플레이스홀더는 AboutComponent 템플릿 내에서 RatingComponent 및 FeedbackComponent를 렌더링하는 데 사용될 것입니다.

RatingComponent 및 FeedbackComponent의 컴포넌트 파일을 필요에 맞게 업데이트하십시오.



About 및 Child 컴포넌트로 이름이 지정된 outlet을 사용하여 이동할 수 있습니다. 예를 들어, rating 컴포넌트에 액세스하려면 http://localhost:4200/about/(rate:rating//feed:feedback) 로 이동하면 됩니다.

저는 앱 컴포넌트에서 아래에 보여드린대로 외부 링크를 만들었습니다. 그러나 필요에 따라 URL을 생성할 수 있습니다. 그 경우 적절한 라우터 링크와 outlet이 필요합니다.

```js
<a class="nav-link" [routerLink]="['/about',{
  outlets:{
    'rate': ['rating'],
    'feed': ['feedback']
  }
}]">About</a>
```

30번째 줄:



앵귤러에서 이중 별표 (**) 루트는 와일드카드 루트 또는 캐치-올 루트라고도 알려진데, 미리 정의된 루트와 일치하지 않는 루트를 처리하는 데 사용됩니다. 이는 응용 프로그램 내에서 알 수 없는 또는 잘못된 URL을 처리하는 폴백 루트 역할을 합니다.

와일드카드 루트를 정의하려면 루트 배열 끝에 경로가 '**'인 구성을 추가할 수 있습니다. 이 루트는 요청된 URL과 일치하는 다른 루트가 없을 때 일치됩니다.

```js
{ path: '**', component: HomeComponent }
```

7단계



앱 컴포넌트 뷰에서 라우터 아웃렛을 언급하여 네비게이션에 따라 다른 컴포넌트를 조건부로 렌더링하세요.

```js
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo/coder.png" class="navlogo"/> 제품 어플리케이션
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" [routerLink]="['/about', {
          outlets: {
            'rate': ['rating'],
            'feed': ['feedback']
          }
        }]">About</a>
        <a class="nav-link" routerLink="/contact">Contact</a>
      </div>
    </div>
  </div>
</nav>

<router-outlet></router-outlet>
```

![라우팅 이미지 1](/assets/img/2024-05-14-RoutinginAngular_2.png)

![라우팅 이미지 2](/assets/img/2024-05-14-RoutinginAngular_3.png)



<img src="/assets/img/2024-05-14-RoutinginAngular_4.png" />

<img src="/assets/img/2024-05-14-RoutinginAngular_5.png" />

<img src="/assets/img/2024-05-14-RoutinginAngular_6.png" />

그래서, 이것이 Angular에서 라우팅에 대한 모든 것입니다.



# GitHub

https://github.com/Jaydeep-007/angular-routing

# 결론

이 글에서는 Angular에서 라우팅의 이점과 Angular 15에서 서로 다른 컴포넌트를 만든 후 단계별 구현에 대해 설명했습니다.



행복한 코딩하세요!