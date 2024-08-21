---
title: "Angular에서 간단한 코드로 SCSS를 활용해 트리 계층구조를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-Howtomakesimpletreehierarchyinangularusingscsswithsimplecoding_0.png"
date: 2024-05-17 20:59
ogImage:
  url: /assets/img/2024-05-17-Howtomakesimpletreehierarchyinangularusingscsswithsimplecoding_0.png
tag: Tech
originalTitle: "How to make simple tree hierarchy in angular using scss with simple coding"
link: "https://medium.com/@jigaruvpc/how-to-make-simple-tree-hierarchy-in-angular-using-scss-with-simple-coding-3a767151d3eb"
isUpdated: true
---

![Tree Hierarchy Example](/assets/img/2024-05-17-Howtomakesimpletreehierarchyinangularusingscsswithsimplecoding_0.png)

한 가지 문자열 배열이 있다고 가정해봅시다. 만약 우리가 문자열 배열을 트리 구조로 그리고 싶다면, 어떻게 할 수 있을까요? 함께 살펴보겠습니다.

![Tree Hierarchy Example](/assets/img/2024-05-17-Howtomakesimpletreehierarchyinangularusingscsswithsimplecoding_1.png)

# 단계 1:

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

샘플 Angular 애플리케이션을 cmd를 사용하여 생성합니다.

# 단계 2:

treeData 배열을 생성하고 기본값으로 초기화합니다.

```js
//app.component.ts

import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  treeData: string[];

  constructor() {
    this.treeData = ["Root", "Node1", "Node2", "Node3"];
  }
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

# 단계 3:

SCSS 파일에 믹스인 함수를 만드세요.

```scss
//app.component.scss

@mixin generate($prefix, $property, $length) {
  $spacing: 20px;
  @for $i from 1 through $length {
    .#{$prefix}-#{$i} {
      #{$property}: $spacing * $i;
    }
  }
}

@include generate(li, margin-left, 20);
```

믹스인을 사용하면 스타일을 정의하고 스타일 시트 전체에서 재사용할 수 있습니다. 이를 통해 .float-left와 같은 의미 없는 클래스를 사용하는 것을 피하고 스타일 모음을 라이브러리로 분배하는 것이 쉬워집니다.

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

자세히 보기: https://sass-lang.com/documentation/at-rules/mixin/

`generate()` 함수는 주어진 접두사, 속성 및 길이로 여러 클래스를 생성하는 데 사용됩니다. 'li', 'margin-left', '20'을 전달하면 다음과 같은 클래스가 생성됩니다.

```js
.li-1 {
  margin-left: 20px;
}

.li-2 {
  margin-left: 40px;
}

.li-3 {
  margin-left: 60px;
}
...
...
...
.li-20 {
  margin-left: 400px;
}
```

이 클래스를 사용하여 각 반복에서 왼쪽 마진을 증가시킵니다.

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

# 단계 4:

`ul` 및 `li` 태그를 사용하여 HTML 파일에 목록을 만들고 `li` 태그에 \*ngFor를 추가합니다.

```js
<ul>
  <li *ngFor="let data of treeData;index as i" [ngClass]="'li-'+i">
    {data}
  </li>
</ul>
```

여기서 `[ngClass]=”’li-’+i”`를 추가했습니다. 각 반복마다 동적으로 생성된 클래스를 사용한다는 의미입니다.

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

[ngClass]="'li-1'"
[ngClass]="'li-2'"
[ngClass]="'li-3'"
[ngClass]="'li-4'"
....
....
[ngClass]="'li-20'"

# Step 5:

코드를 실행하고 즐기세요!

코딩을 즐기세요!!!
