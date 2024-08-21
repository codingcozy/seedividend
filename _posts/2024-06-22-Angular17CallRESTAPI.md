---
title: "Angular 17에서 REST API 호출하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-Angular17CallRESTAPI_0.png"
date: 2024-06-22 15:16
ogImage:
  url: /assets/img/2024-06-22-Angular17CallRESTAPI_0.png
tag: Tech
originalTitle: "Angular 17 Call REST API"
link: "https://medium.com/@codewithmrnerd/angular-17-call-rest-api-d356897eb661"
isUpdated: true
---

이번 튜토리얼에서는 Angular 17에서 REST API에서 데이터를 가져오는 방법을 배울 거예요. HTTP 클라이언트와 독립 컴포넌트를 사용할 거에요.

다음 명령어를 사용하여 새로운 Angular 17 프로젝트를 생성해 시작해봅시다:

```js
ng new angular17http
```

프로젝트 내부로 이동한 후 다음 명령어를 실행하여 컴포넌트를 생성하세요:

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
ng g c posts
```

src/app/app.component.ts 파일을 열어서 다음과 같이 PostsComponent를 가져와 imports 배열에 추가해주세요:

```js
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
```

```js
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, PostsComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "angular17http";
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

다음으로는 src/app/app.component.html 파일을 열어서 다음과 같이 PostsComponent를 호출하십시오:

```js
<app-posts></app-posts>
```

그다음으로는 src/app/posts/posts.component.ts 파일로 이동하여 다음과 같이 업데이트하십시오:

```js
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, inject } from "@angular/core";
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

```typescript
@Component({
  selector: "app-posts",
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.css",
})
export class PostsComponent {
  httpClient = inject(HttpClient);
  public data: Array<any> = [];
  ngOnInit() {
    this.httpClient.get("https://jsonplaceholder.typicode.com/posts").subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data;
      },
      error: (err) => console.log(err),
    });
  }
}
```

우리는 HttpClientModule를 컴포넌트의 imports 배열을 통해 가져오고 HttpClient 서비스를 주입하고 HttpClient의 get 메서드를 호출하여 API 엔드포인트로 GET 요청을 보내고 반환된 Observable에 구독합니다. 그런 다음 브라우저 콘솔에 데이터를 간단히 표시하고 데이터를 데이터 배열에 할당합니다.

다음으로 src/app/posts/posts.component.html 파일을 열어 @for 지시문을 사용하여 데이터를 표시하십시오:

```typescript
@for (post of data; track post.id){
    <h1> { post.title }</h1>
    <p> { post.body } </p>
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

터미널에 가서 다음 명령어를 사용하여 Angular 17 프로젝트를 실행하세요:

```js
ng serve
```

웹 브라우저를 열고 http://localhost:4200/ 으로 이동하세요. 콘솔에서 가져온 포스트를 확인할 수 있을 거에요.
