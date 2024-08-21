---
title: "Angular에서 쿼리 매개변수와 경로 조건을 사용해 동적 콘텐츠 표시 및 숨기기 방법"
description: ""
coverImage: "/assets/img/2024-06-22-DynamicallyShoworHideContentinAngularUsingQueryParametersandRouteConditions_0.png"
date: 2024-06-22 03:38
ogImage:
  url: /assets/img/2024-06-22-DynamicallyShoworHideContentinAngularUsingQueryParametersandRouteConditions_0.png
tag: Tech
originalTitle: "Dynamically Show or Hide Content in Angular Using Query Parameters and Route Conditions"
link: "https://medium.com/@Prathmesh_Chavan/dynamically-show-or-hide-content-in-angular-using-query-parameters-and-route-conditions-1b870d2648c1"
isUpdated: true
---

현대 웹 애플리케이션에서는 현재 경로나 쿼리 매개변수에 따라 동적 콘텐츠가 필요한 경우가 일반적입니다. 이 게시물에서는 Angular 애플리케이션에서 쿼리 매개변수 및 경로 조건을 사용하여 요소를 조건부로 표시하는 방법을 보여드리겠습니다. 홈 페이지에서는 검색 창이 표시되지만 프로필 페이지에서는 숨겨지는 실제 예제를 통해 안내해 드리겠습니다.

# 단계 1: 라우트 정의

app-routing.module.ts에서 라우트를 정의하세요:

```js
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 2: 컴포넌트 생성

이제 HomeComponent와 ProfileComponent를 생성하세요.

HomeComponent

```js
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

ProfileComponent

```js
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

# 내용을 동적으로 표시하거나 숨기기

홈페이지에서는 검색 창을 표시하고 프로필 페이지에서는 숨기고 싶습니다. 이를 위해 Angular의 ActivatedRoute 및 Router 서비스를 사용하여 라우트 변경을 감지하고 조건에 따라 검색 창을 표시할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 단계 3: Navbar 컴포넌트 업데이트

NavbarComponent를 경로 변경에 반응하도록 업데이트하세요.

```js
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showSearchBar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showSearchBar = this.router.url !== '/profile';
    });
  }
}
```

# 단계 4: Navbar 템플릿 업데이트

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<nav>
  <!-- other nav elements -->
  <div *ngIf="showSearchBar">
    <input type="text" placeholder="Search...">
  </div>
</nav>
```

# 설명

- 라우트 정의: 홈 및 프로필 페이지를 위한 라우트를 정의합니다.
- 컴포넌트: HomeComponent 및 ProfileComponent를 위한 기본 컴포넌트가 생성되었습니다.
- 네비게이션 바 컴포넌트:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- NavbarComponent는 Angular의 Router 서비스를 사용하여 라우트 변경을 구독합니다.
- 현재 URL을 확인하여 검색 창을 표시하거나 숨길지 여부를 결정합니다.
- URL이 /profile인 경우 showSearchBar를 false로 설정하여 검색 창을 숨깁니다. 그 외의 경우에는 true로 설정됩니다.
