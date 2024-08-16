---
title: "Angular 17에서 CRUD 사용하는 방법 jsonplaceholder API 및 Bootstrap"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Angular 17 CRUD using jsonplaceholder API and Bootstrap"
link: "https://medium.com/@chandantechie/angular-17-crud-using-jsonplaceholder-api-and-bootstrap-9f4db29b9428"
isUpdated: true
---





<img src="/assets/img/Angular17CRUDusingjsonplaceholderAPIandBootstrap_0.png" />

JSONPlaceholder API 및 Bootstrap을 사용하여 CRUD 작업(Create, Read, Update, Delete)을 수행하는 단순화된 Angular 17 애플리케이션이 아래에 표시되어 있습니다. 이 가이드는 Angular CLI가 설치되어 있고 Angular 기초를 알고 있는 것을 전제로 합니다. Angular 17에서는 이 가이드에 영향을 줄 수 있는 새로운 기능이나 변경 사항이 있을 수 있습니다.

# 단계 1: 새 Angular 프로젝트 생성

```js
ng new jsonplaceholder-app
cd jsonplaceholder-app
```

<div class="content-ad"></div>

# 단계 2: Angular HttpClient 및 Bootstrap 추가하기

```js
npm install bootstrap
```

```js
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

angular.json 파일을 열어 "build" 아래의 "scripts" 배열에 Bootstrap의 JavaScript 파일 경로를 추가하세요.

<div class="content-ad"></div>

```js
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

```js
import { HttpClientModule } from "@angular/common/http";
// 다른 imports...

@NgModule({
  declarations: [
    // 여러분의 컴포넌트들...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // 이 줄을 추가해주세요
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

# 단계 3: API 호출을 위한 서비스 생성

```js
ng generate service data
```

<div class="content-ad"></div>

data.service.ts 파일에서 HttpClient를 주입하고 CRUD 작업을 위한 메서드를 정의하세요:

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPost(postData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }

  updatePost(id: number, postData: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, postData);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

# 단계 4: 컴포넌트 및 템플릿 생성

간단하게 하기 위해 서비스와 상호 작용하기 위해 앱 컴포넌트(app.component.ts 및 app.component.html)를 사용합시다.

<div class="content-ad"></div>

app.component.ts에 DataService를 주입하고 사용하세요:

```js
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.dataService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  addPost() {
    const newPost = { title: 'New Post', body: 'This is a new post.', userId: 1 };
    this.dataService.createPost(newPost).subscribe(() => {
      this.posts.unshift(newPost);  // For demonstration, prepend locally
    });
  }

  updatePost(post: any) {
    const updatedPost = { ...post, title: 'Updated Title' };
    this.dataService.updatePost(post.id, updatedPost).subscribe(() => {
      const index = this.posts.findIndex((p) => p.id === post.id);
      this.posts[index] = updatedPost;  // For demonstration, update locally
    });
  }

  deletePost(id: number) {
    this.dataService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
```

app.component.html에는 게시물을 표시하고 작업을 수행하기 위한 버튼이 있는 간단한 UI를 추가하세요:

```js
<div class="container mt-3">
  <button class="btn btn-success mb-3" (click)="addPost()">게시물 추가</button>
  <div *ngFor="let post of posts; let i = index" class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.body }}</p>
      <button class="btn btn-primary" (click)="updatePost(post)">수정</button>
      <button class="btn btn-danger" (click)="deletePost(post.id)">삭제</button>
    </div>
  </div>
</div>
```

<div class="content-ad"></div>

# 애플리케이션 실행하기

다음 명령어로 애플리케이션을 실행해보세요:

```js
ng serve
```

브라우저에서 http://localhost:4200/을 방문하여 애플리케이션을 확인할 수 있습니다.

<div class="content-ad"></div>

노트

이 예시는 데모를 위해 HTTP 요청 후 간단한 메모리 작업을 사용합니다. 실제 애플리케이션에서는 API 응답과 오류를 적절하게 처리해야 합니다. 사용자 경험을 향상시키기 위해 로딩 상태와 에러 처리를 구현하는 것을 고려해보세요.
