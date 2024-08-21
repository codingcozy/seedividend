---
title: "Angular v17에서 스켈레톤 로더 활용하는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Learn how to use a skeleton loader with Angular v17"
link: "https://medium.com/@akhilabhinav/learn-how-to-use-a-skeleton-loader-with-angular-9414da7bb215"
isUpdated: true
---

![이미지](https://miro.medium.com/v2/resize:fit:800/1*r4hE6o-YvNclNlJQdb8isw.gif)

웹 개발의 동적 세계에서 사용자 경험은 최우선입니다. 페이지가 느리게 로드되는 것은 방문자들에게 큰 거부감을 일으킬 수 있으며, 이는 고 바운스율과 참여율에 부정적인 영향을 미칠 수 있습니다. 이러한 도전에 대처하기 위해, 개발자들은 혁신적인 솔루션을 찾게 되는데, 그 중 하나가 Angular의 Skeleton Loader입니다. 이 포괄적인 가이드에서는 Skeleton Loader의 세계에 대해 자세히 알아보고, 이점과 Angular에서의 구현, 그리고 그들의 매력을 보여주는 현실적인 예시를 제시할 것입니다.

# 속도의 필요성: 더 빠른 페이지 로드를 위한 탐험

매 순간이 중요한 시대에서, 더 빠른 웹 사이트의 요구는 이제껏 더 중요하지 않았습니다. 사용자는 즉각적인 만족을 기대하며, 페이지 로드에 대한 지연은 분노와 포기로 이어질 수 있습니다. 전통적인 로딩 스피너와 빈 화면만으로는 충분하지 않습니다. Skeleton Loader가 등장합니다 — 사용자들이 콘텐츠 로딩 중에 참여하고 있도록 유지하는 가벼우면서 시각적으로 매력적인 솔루션입니다.

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

# 스켈레톤 로더 이해하기: 로딩 스피너 이상의 기능

스켈레톤 로더는 기존의 로딩 스피너를 넘어서는 기능을 제공합니다. 데이터를 가져오는 동안 사용자에게 콘텐츠 구조의 sneak peek(엿보기)를 제공합니다. 이로써 긴 대기 시간을 덜 여겨보게 해주는데 그치지 않고, 진행 상황을 제공함으로써 전반적인 사용자 경험을 향상시킵니다.

# 스켈레톤 로더의 주요 기능:

- 콘텐츠 구조 모방: 스켈레톤 로더는 실제 콘텐츠의 레이아웃과 구조를 모방하여 사용자에게 향후 나타날 내용에 대한 미리보기를 제공합니다.
- 부드러운 전환: 스켈레톤에서 실제 콘텐츠로의 점진적 전환은 시각적으로 즐거운 경험을 제공하며, 지각된 로딩 시간을 줄입니다.
- 참여 유지: 사용자가 내용이 완전히 로드되기 전에도 차후 콘텐츠를 시각화할 수 있을 때 더 오래 참여할 가능성이 높아집니다.

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

# Angular에서 Skeleton Loaders 구현하기: 단계별 안내

이제 우리가 Skeleton Loaders의 중요성을 이해했으니, Angular 애플리케이션에 손쉽게 통합하는 방법을 살펴보도록 하겠습니다. Angular 프레임워크는 동적이고 반응형 웹 애플리케이션을 만들기 위한 견고한 기반을 제공하며, 이를 구현하는 데 이상적인 환경을 제공합니다.

# 단계 1: 설치 및 설정

구현에 앞서, Angular 프로젝트가 작동 중인지 확인하세요. Angular CLI를 사용하여 새 프로젝트를 생성할 수 있습니다:

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
ng new your-skeleton-loader-app
cd your-skeleton-loader-app
```

다음으로, 스켈레톤 로더를 만들기 위해 인기있는 Angular 라이브러리를 설치해 보세요:

```js
ng add ngx-skeleton-loader
```

# 단계 2: 기본 구현

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

이제 간단한 Skeleton Loader가 포함된 구성 요소를 만들어봅시다. 예를 들어, 표시할 기사 목록이 있다고 가정해보겠습니다.

```js
// article-list.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"],
})
export class ArticleListComponent implements OnInit {
  articles: any[]; // 기사가 비동기적으로 검색되었다고 가정

  constructor() {}

  ngOnInit(): void {
    // 비동기 데이터 검색 시뮬레이션
    setTimeout(() => {
      this.articles = [
        /* 실제 기사 데이터 */
      ];
    }, 2000); // 2초의 지연을 가정한 시뮬레이션
  }
}
```

# 단계 3: Skeleton Loader로 향상

이제 템플릿에 Skeleton Loader를 통합하여 부드러운 로딩 경험을 제공해보겠습니다.

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
<!-- article-list.component.html -->
<div *ngIf="articles; else skeleton">
  <!-- 실제 문서가 있는 경우 여기에 표시됩니다 -->
  <div *ngFor="let article of articles">
    <!-- 문서 세부 정보 -->
  </div>
</div>

<ng-template #skeleton>
  <!-- 스켈레톤 로더 템플릿 -->
  <div *ngSkeletonLoader="let article; let i = index;">
    <!-- 문서 아이템을 흉내 내는 스켈레톤 구조 -->
  </div>
</ng-template>
```

이 예시에서는 실제 문서가 있는 경우에만 표시되며, 불러오는 동안 스켈레톤 로더가 활성화됩니다. \*ngSkeletonLoader 지시문을 사용하면 Angular 구성 요소에 스켈레톤 로딩을 손쉽게 적용할 수 있습니다.

# 실생활 예제: 스켈레톤 로더로 사용자 경험 향상하기

Angular 애플리케이션에서 스켈레톤 로더가 사용자 경험을 크게 향상시킬 수 있는 실용적인 시나리오를 살펴봅시다.

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

# 예시 1: 사용자 프로필

소셜 미디어 플랫폼을 상상해보세요. 사용자 프로필이 비동기로 로드됩니다. 스켈레톤 로더를 구현하여 프로필 사진, 사용자 이름 및 소개 섹션의 자리 표시자를 표시하여 사용자 참여를 유지할 수 있습니다.

```js
<div *ngIf="userProfile; else skeleton">
  <!-- 실제 사용자 프로필 내용 -->
  <img [src]="userProfile.picture" alt="프로필 사진">
  <h3>{ userProfile.username }</h3>
  <p>{ userProfile.bio }</p>
</div>

<ng-template #skeleton>
  <!-- 사용자 프로필을 위한 스켈레톤 로더 -->
  <div *ngSkeletonLoader>
    <div class="profile-picture"></div>
    <div class="username"></div>
    <div class="bio"></div>
  </div>
</ng-template>
```

# 예시 2: 제품 카탈로그

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

전자 상거래 애플리케이션에서는 제품 목록을 표시하는 데 제품 세부 정보와 이미지가 필요하여 시간이 걸릴 수 있습니다. 스켈레톤 로더를 사용하면 제품 이미지 및 정보를 위한 자리 표시자를 표시하여 사용자 관심을 유지할 수 있습니다.

```js
<div *ngIf="products; else skeleton">
  <!-- 실제 제품 목록 내용 -->
  <div *ngFor="let product of products">
    <img [src]="product.image" alt="Product Image">
    <h3>{ product.name }</h3>
    <p>{ product.description }</p>
  </div>
</div>

<ng-template #skeleton>
  <!-- 제품 목록용 스켈레톤 로더 -->
  <div *ngSkeletonLoader="let product; let i = index;">
    <div class="product-image"></div>
    <div class="product-name"></div>
    <div class="product-description"></div>
  </div>
</ng-template>
```

# 결론: 스켈레톤 로더로 Angular 앱 성능 향상

요약하면, 스켈레톤 로더는 더 빠르고 매력적인 Angular 애플리케이션을 만드는 데 개발자의 강력한 도구로 등장했습니다. 로딩 기간 동안 콘텐츠 구조의 미리보기를 제공함으로써, 스켈레톤 로더는 사용자들의 인지 성능을 크게 향상시키고 전반적인 사용자 만족도를 향상시킵니다.

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

앵귤러 애플리케이션을 최적화하기 위한 여정에 들어가실 때, 스켈레톤 로더를 통합하여 원할하고 즐거운 사용자 경험을 만들어보세요. 사용자 인터페이스를 높여서 이탈률을 줄이고, 로딩 과정 전체를 수강 중인 관객들이 지루해하지 않도록 유지하세요.

스켈레톤 로더의 매력에 푹 빠져보세요 — 여러분의 사용자들이 감사해할 거에요! 🚀✨
