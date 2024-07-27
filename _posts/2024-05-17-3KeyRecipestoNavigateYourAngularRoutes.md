---
title: "앵귤러 라우트를 제대로 사용하는 방법 3가지"
description: ""
coverImage: "/assets/img/2024-05-17-3KeyRecipestoNavigateYourAngularRoutes_0.png"
date: 2024-05-17 20:22
ogImage: 
  url: /assets/img/2024-05-17-3KeyRecipestoNavigateYourAngularRoutes_0.png
tag: Tech
originalTitle: "3 Key Recipes to Navigate Your Angular Routes"
link: "https://medium.com/better-programming/3-key-recipes-to-navigate-your-angular-routes-c04528b8a38"
---


![Angular](/assets/img/2024-05-17-3KeyRecipestoNavigateYourAngularRoutes_0.png)

정직하게 말하자면, 나는 Angular과 사랑과 미움이 공존하는 관계를 가지고 있어. 모든 것이 제대로 작동할 때는 정말 멋져. 그렇지만 그렇지 않고 나에게 힌트나 '더 어려운' 자료가 없는 경우, 그때는 너무나 짜증이 나.

하지만 결국, 어떤 라이브러리, 프레임워크 또는 구글에 직면한 직관적인 답변이 없는 이상한 오류도 마찬가지로 그렇다.

많은 사람들에게 Angular 라우팅은 포기하고 싶게 만드는 문제다. 일부로, 온라인 튜토리얼 중 많은 것들이 기본 라우트를 구현하는 예제들뿐이기 때문이다. 복잡한 시나리오에 적합한 것을 찾는 것은 갑자기 시간 소모적인 시행착오 과정이 될 수 있다.

<div class="content-ad"></div>

앵귤러는 프레임워크이기 때문에 내재적으로 이해하는 데 시간이 걸릴 수 있어도 라우팅 방식이 구현되는 방식은 때로는 지루하게 느껴질 수 있습니다. 그러나 이해하고 난 뒤에는 실제로 과소평가된 보석이라고 생각해요.

리액트와 같은 것과 비교해보면, 리액트는 다양한 방법론의 아드혹 패치워크일 수 있지만, 앵귤러의 '이게 우리가 하는 방식이다' 접근 방식은 여러 팀 간 협업 시 덜 괴로울 수 있어요.

앵귤러에서는 라우트를 별도 모듈(일반적으로 AppRoutingModule)에서 정의하고 RouterModule.forRoot() 메서드를 사용하여 라우트를 등록해요. 라우트는 객체 배열로 정의되며, 각 객체는 경로와 연결된 컴포넌트를 포함해요. 반면 리액트에서는 라우트가 Route, Switch, BrowserRouter와 같은 React Router 라이브러리에서 제공되는 컴포넌트를 사용하여 정의돼요. 이러한 컴포넌트들은 JSX 코드 내에서 직접 사용되며, 라우트 구성이 더 선언적이에요.

앵귤러 라우팅의 장점(AppRoutingModule 및 RouterModule.forRoot()을 통해)은 구성이 중앙 집중화되어 있고 강력한 타입 지정으로 일관된 접근 방식을 제공한다는 점이에요. 반면, 리액트 라우팅(Route, Switch, BrowserRouter 컴포넌트를 통해)은 중앙 집중화가 부족하고 내장된 유형 확인이 없으며, 일관성 부족으로 인한 높은 불일치가 발생할 수 있어요.

<div class="content-ad"></div>

제 이야기는 여기까지 하고, 본문의 요점으로 넘어가 봅시다. 이 글에서 다루는 Angular 라우팅 시나리오/레시피 중 가장 중요한 것은 바로 세 가지입니다. 이 세 가지는 모든 앱 개발 작업과 프로젝트를 다루며, 이해하기 어려웠던 부분을 간단하게 설명해줬으면 했던 것들입니다.

# 레시피 1: 여러 수준과 동적 경로를 가진 중첩 라우팅

Angular 라우트에서 동적 경로를 가진 다중 수준의 탐색 구조는 정보가 층층이 쌓인 정체를 푸는 것 같은 신비한 상자와 같은 느낌을 줄 수 있습니다.

라우팅을 처음 배울 때, 우리는 종종 한 수준에서 시작하여 종료하는, 다음 페이지로 이동하고 다시 돌아오는 정도의 시나리오로 끝나곤 합니다. 하지만 90년대가 아니라는 것을 기억해야 합니다. 실제로 레알 앱/사이트는 카테고리, 서브카테고리, 사용자가 작성한 콘텐츠를 통해 동적 경로로 이어지는 필수 요소들이 많습니다.

<div class="content-ad"></div>

이 예시를 위해 상상해 봅시다. 우리는 그것만 있는 전자상거래 애플리케이션을 개발하고 있다고 상상해 봅시다.

## 단계 1: 카테고리, 하위 카테고리 및 제품 컴포넌트를 생성합시다

```js
ng generate component category
ng generate component subcategory
ng generate component product
```

## 단계 2: AppRoutingModule에서 라우트를 정의합시다

<div class="content-ad"></div>

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'category/:categoryId',
    component: CategoryComponent,
    children: [
      {
        path: 'subcategory/:subcategoryId',
        component: SubcategoryComponent,
        children: [
          {
            path: 'product/:productId',
            component: ProductComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

위 예제에서는 전자 상거래 앱의 각 수준에 대한 경로를 정의했습니다. 경로에서 :categoryId, :subcategoryId 및 :productId 자리 표시 자를 사용한 점에 주목하세요. 이러한 세그먼트는 앱을 통해 탐색할 때 실제 값으로 대체됩니다.

## 단계 3: 컴포넌트 템플릿에 라우터 아웃렛을 추가하여 Angular이 자식 컴포넌트를 렌더링할 위치를 알 수 있도록 합니다:

```js
<!-- category.component.html -->
<h1>Category</h1>
<router-outlet></router-outlet>

<!-- subcategory.component.html -->
<h2>Subcategory</h2>
<router-outlet></router-outlet>

<!-- product.component.html -->
<h3>Product</h3>
```

<div class="content-ad"></div>

## 단계 4: 앱을 통해 이동할 수 있는 몇 가지 라우터 링크를 생성합니다

```js
<!-- app.component.html -->
 <nav>
   <ul>
     <li *ngFor="let category of categories">
       <a [routerLink]="['/category', category.id]">{ category.name }</a>
     </li>
   </ul>
 </nav>
 <router-outlet></router-outlet>
 
```

이 예에서는 카테고리 배열이 id와 name 속성이 있는 카테고리 데이터를 포함하고 있다고 가정합니다. [routerLink] 지시문은 카테고리, 하위 카테고리 및 제품을 통해 이동할 때 적절한 URL을 생성합니다.

그게 다입니다! 이제 다중 수준 및 동적 경로를 포함하는 중첩 라우팅 구조의 기본 뼈대가 완성되었습니다. 사용자는 이제 카테고리, 하위 카테고리, 제품을 손쉽게 탐색할 수 있으며 앱의 구조는 깔끔하고 조직적입니다.

<div class="content-ad"></div>

# 레시피 2: 라우트 가드 및 역할 기반 액세스와 canActivate

오케이, 멋져요. 중첩된 내용들이 있고, 특정 사람들에게만 보기 권한을 부여하고 특정 작업을 할 수 있게끔 하는 건 어떻게 하는지 궁금하신가요? 예를 들어, 사용자들?

이것이 바로 canActivate 및 RoleGuard의 역할입니다.

Angular에서 역할 기반 액세스 제어를 구현하는 데 Route guards와 canActivate 가드를 사용할 수 있습니다. 이를 통해 응용 프로그램의 특정 부분에 대한 액세스 권한이 있는 사용자만 해당 부분에 액세스할 수 있도록 할 수 있습니다.

<div class="content-ad"></div>

일반 사용자와 관리자 사용자가 있는 응용 프로그램을 개발 중이라고 상상해 봅시다. 이제 사용자의 역할에 따라 특정 경로로의 액세스를 제한하려고 합니다. 이를 위해 RoleGuard라는 사용자 지정 라우트 가드를 만들 수 있습니다.

## 단계 1: RoleGuard 생성

```js
ng generate guard role
```

## 단계 2: RoleGuard를 생성하고 CanActivate 인터페이스를 구현하여 사용자의 역할을 확인하도록 수정하세요.

<div class="content-ad"></div>

위의 예시에서는 사용자 역할을 확인하고 해당 사용자가 관리자인 경우 true를 반환합니다. 사용자가 관리자가 아닌 경우 홈 페이지로 리디렉션하고 false를 반환합니다.

RoleGuard를 CanActivate 인터페이스를 구현하도록 수정하면, Angular에게이 가드가 사용자의 역할에 기반하여 경로를 활성화 할 수 있는지를 결정해야한다고 말하는 것과 같습니다. 이 경우 사용자의 역할을 확인하는 사용자 정의 로직을 검사합니다.

CanActivate 인터페이스를 구현하려면, 경로를 활성화 할 수 있는지(true) 아니면 할 수 없는지(false)를 나타내는 boolean 또는 boolean을 해결하는 observable 또는 promise를 반환하는 canActivate 메서드를 제공해야합니다. canActivate 메서드가 false를 반환하면, 탐색이 취소되고 사용자가 경로에 액세스하는 것이 방지됩니다.

<div class="content-ad"></div>

사용자의 역할을 확인하여 canActivate 메서드 내에서 특정 라우트에 대한 액세스를 제어할 수 있습니다. 예를 들어 응용 프로그램에 관리자 영역이 있다면, 사용자가 관리자인지 확인하는 canActivate 메서드가 포함된 RoleGuard를 사용하여 액세스를 허용하기 전에 확인할 수 있습니다. 사용자가 관리자가 아닌 경우 가드가 false를 반환하고 탐색이 취소되어 권한이없는 액세스를 방지합니다.

특정 라우트에 대한 액세스를 제어하는 유연하고 안전한 방식을 제공하기 위해 RoleGuard를 수정하여 CanActivate 인터페이스를 구현하고 사용자의 역할을 확인해야합니다. 이는 Angular 응용 프로그램 내에서 사용자 역할이나 권한에 따라 액세스 제어하는 방식입니다.

## 단계 3: 관리자만 액세스할 수 있는 관리자 구성 요소 생성

```js
ng generate component admin
```

<div class="content-ad"></div>

## 단계 4: AppRoutingModule에 관리자 컴포넌트를 위한 새 경로를 추가하고 RoleGuard를 canActivate 가드로 사용하세요.

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  // ... 다른 경로들 ...
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## 단계 5: 관리자 페이지로 이동하는 라우터 링크 생성하기

```js
<!-- app.component.html -->
<nav>
  <ul>
    <!-- ... 다른 링크들 ... -->
    <li>
      <a routerLink="/admin">Admin</a>
    </li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

<div class="content-ad"></div>

그걸로 끝이에요! ‘admin’ 역할을 가진 사용자만 관리자 경로에 액세스할 수 있고, 다른 사용자는 홈페이지로 리디렉트됩니다.

# 레시피 3: 404 오류 및 리디렉션 처리

언젠가는 사용자가 리디렉트나 404 에러를 만나게 될 것이고, 이를 다룰 필요가 있을 겁니다. 다음은 그 방법입니다.

## 단계 1: 존재하지 않는 경로에 방문한 사용자에게 표시될 NotFoundComponent를 생성하세요

<div class="content-ad"></div>

```js
ng generate component not-found
```

## Step 2: NotFoundComponent 템플릿을 수정하여 친근한 에러 메시지를 표시하도록 사용자 정의하기

```js
<!-- not-found.component.html -->
<h1>이런!</h1>
<p>찾고 있는 페이지가 없는 것 같아요.</p>
<a routerLink="/">홈페이지로 돌아가기</a>
```

## Step 3: AppRoutingModule에 NotFoundComponent를 위한 라우트 추가하기.

<div class="content-ad"></div>

모든 일치하지 않는 경로를 캐치할 수 있는 ** 경로와 와일드카드 라우트를 사용할 것입니다.

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // ... 다른 라우트 ...
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

이 설정을 사용하면 사용자가 존재하지 않는 경로로 이동할 때마다 NotFoundComponent가 표시됩니다.

# 그렇다면 리다이렉트는 어떻게 하죠?

<div class="content-ad"></div>

예전 경로에서 새 경로로 사용자를 리디렉션하고 싶을 때 AppRoutingModule에 리디렉트 경로를 추가하여 이 작업을 수행할 수 있습니다:

```js
const routes: Routes = [
   // ... 다른 경로들 ...
   {
     path: 'old-route',
     redirectTo: '/new-route',
     pathMatch: 'full'
   },
   {
     path: '**',
     component: NotFoundComponent
   },
 ];
```

이 예제에서 /old-route를 방문하는 사용자는 /new-route로 리디렉션이 됩니다. pathMatch: `full` 옵션은 전체 URL 경로가 일치해야 리디렉션이 발생합니다.

다양한 리디렉트 유형에 대한 설명은 다음과 같습니다.

<div class="content-ad"></div>

## 기본 리다이렉트

기본적으로는 방금 한 것과 똑같지만 목록을 대충 훑는 사람들을 위해 여기에 가져 두는 게 좋다고요.

```js
{
   path: 'old-page',
   redirectTo: '/new-page',
   pathMatch: 'full'
}
```

## 매개변수를 사용한 리다이렉트

<div class="content-ad"></div>

```js
{
   path: 'user/:userId/profile',
   redirectTo: '/profile/:userId',
   pathMatch: 'full'
 }
```

이 경우, /user/123/profile을 방문하는 사용자는 /profile/123로 리디렉션이 됩니다. 경로의 :userId 매개변수가 자동으로 새 경로로 전달됩니다.

## 와일드카드를 사용한 리디렉션

```js
{
   path: 'legacy/**',
   redirectTo: '/new-section'
 }
```

<div class="content-ad"></div>

/legacy/로 시작하는 모든 경로를 방문하는 사용자(e.g., /legacy/some-page, /legacy/another-page)들은 /new-section으로 리디렉션됩니다. ** 와일드카드는 legacy/ 뒤의 모든 하위 경로와 일치시키기 위해 사용됩니다.

## 쿼리 매개변수와 함께 리디렉션하기

쿼리 매개변수를 유지하면서 리디렉션하기 위해서 컴포넌트의 로직을 수정해야 합니다. 다음은 예시입니다:

```js
import { ActivatedRoute, Router } from '@angular/router';

 constructor(private route: ActivatedRoute, private router: Router) {}
 
 ngOnInit() {
   const queryParams = this.route.snapshot.queryParams;
   this.router.navigate(['/new-route'], { queryParams });
 }
```

<div class="content-ad"></div>

이 예시에서는 이전 경로와 관련된 컴포넌트가 초기화될 때 현재 쿼리 매개변수를 읽고, 쿼리 매개변수를 보존한 채 새 경로로 이동합니다.

## 조건부 리디렉션

조건부 리디렉션을 수행하려면 Route Guards를 사용할 수 있습니다. 이전 예시에서 RoleGuard로 보여졌듯이 사용자 지정 Route Guard를 생성하여 특정 조건을 확인하고 그에 따라 리디렉션할 수 있습니다.

```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConditionalRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const condition = // 여러분의 사용자 정의 조건;

    if (condition) {
      this.router.navigate(['/new-route']);
      return false;
    }

    return true;
  }
}
```

<div class="content-ad"></div>

그럼, 다음 가드를 라우트 구성에 사용해 보세요:

```js
{
   path: 'some-page',
   component: SomePageComponent,
   canActivate: [ConditionalRedirectGuard]
 }
```

# 마무리

거의 다 다룬 것 같아요. 이 내용이 유용하게 사용되기를 바라요. Angular 라우팅에는 여기서 다룬 것 이외에도 보안 취약점을 다루고 앱을 망가뜨리는 것을 방지하는 방법 등이 있어요. 하지만 아마도 그건 다음에 해보죠. 지금은 Angular 라우트를 구현하는 방법, 조각으로 만들어둔 레시피에 대해 이야기해 봤어요.

<div class="content-ad"></div>

끝까지 와 주셔서 감사합니다!