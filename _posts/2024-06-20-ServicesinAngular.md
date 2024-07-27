---
title: "Services in Angular"
description: ""
coverImage: "/assets/img/2024-06-20-ServicesinAngular_0.png"
date: 2024-06-20 02:58
ogImage: 
  url: /assets/img/2024-06-20-ServicesinAngular_0.png
tag: Tech
originalTitle: "Services in Angular"
link: "https://medium.com/@aqeelabbas3972/services-in-angular-b125a5b5690e"
---


<img src="/assets/img/2024-06-20-ServicesinAngular_0.png" />

알다시피, Angular은 Google이 개발한 TypeScript 프레임워크로 싱글 페이지 응용 프로그램을 개발하는 데 사용됩니다. Angular의 가장 중요한 기능 중 하나는 서비스입니다.

이 기사에서는 Angular 서비스가 무엇인지, 왜 중요한지, 그리고 애플리케이션에서 서비스를 생성하고 사용하는 방법을 살펴볼 것입니다. 또한 애플리케이션에서 사용할 수 있는 다양한 유형의 서비스와 그들과 작업하는 데 가장 좋은 방법을 살펴볼 것입니다. 중간에 우리는 코드 예제와 실제 사용 사례를 제공하여 개념을 더 잘 이해하고 실무에 적용하는 방법을 돕겠습니다.

이 기사를 마치면 Angular 서비스에 대한 sol 이름을 갖추게 되고 보다 효율적이고 효과적인 애플리케이션을 구축하는 방법을 알 수 있을 것입니다. Angular를 막 시작했다면 또는 기술을 향상시키려는 숙련된 개발자라면, 이 기사는 여러분을 위한 것입니다.

<div class="content-ad"></div>

# 목차:

- Angular 서비스 소개
- Angular 서비스 생성
- 서비스의 싱글톤 특성 이해
- 내장 서비스 (예: HttpClient, Router)
- 사용자 정의 서비스
- Angular 애플리케이션에서 서비스의 중요성
- Angular 서비스 작업을 위한 최상의 방법
- 추가 학습 자료

시작해 봅시다!

<div class="content-ad"></div>

Angular 앱의 중요한 구성 요소 중 하나는 Angular 서비스입니다. 서비스는 종종 데이터 검색, 조작 및 저장과 같은 기능을 그룹화하는 데 사용됩니다. 이러한 기능은 여러 구성 요소에서 사용할 수 있습니다.

또한, 서비스는 계산 수행, 비즈니스 로직 구현 및 외부 API와 통신하는 데 활용될 수 있습니다.

Angular에서 클래스로 선언되기 때문에 서비스는 의존성 주입 시스템을 사용하여 구성 요소 또는 다른 서비스에 주입될 수 있습니다.

일관성 유지와 메모리 누수를 방지하기 위해 Angular 서비스는 싱글톤입니다. 이는 애플리케이션 전체에서 서비스의 단일 인스턴스만 존재한다는 것을 의미합니다.

<div class="content-ad"></div>

# 서비스 생성하기

## 단계 1: 새 서비스 생성

Angular에서 새로운 서비스를 생성하려면 Angular CLI 명령 ng generate service를 사용해야 합니다. 터미널이나 명령 프롬프트를 열고 Angular 애플리케이션의 루트 디렉토리로 이동해주세요. 다음 명령을 실행하여 새로운 서비스를 생성하세요:

```js
ng generate service my-service
```

<div class="content-ad"></div>

이 명령은 응용 프로그램의 app 폴더에 my-service.service.ts라는 새 파일을 만듭니다. 이 파일은 서비스의 기본 구조를 포함하고 있습니다.

## 단계 2: 서비스 클래스 정의하기

이전 단계에서 만들어진 my-service.service.ts 파일을 엽니다. 이 파일은 서비스를 위한 기본 클래스 정의를 포함하고 있습니다. 이 클래스에 우리만의 메서드와 속성을 추가하여 서비스의 기능을 정의해야 합니다. 아래는 간단한 서비스 클래스의 예시입니다:

```js
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MyService {
  private data: string[] = [];
  getData(): string[] {
    return this.data;
  }
  addData(newData: string) {
    this.data.push(newData);
  }
}
```

<div class="content-ad"></div>

이 예제에서는 MyService라는 서비스를 정의했습니다. 이 서비스에는 문자열 배열인 data라는 private 속성과 getData() 및 addData()라는 두 가지 메서드가 있습니다. getData() 메서드는 간단히 data 속성을 반환하고, addData() 메서드는 새로운 문자열을 data 배열에 추가합니다.

이 클래스가 서비스임을 나타내기 위해 @Injectable 데코레이터를 사용했음을 주목하세요. 또한 providedIn 속성을 `root`로 설정하여 서비스가 싱글톤으로 생성되고 응용 프로그램의 루트 모듈에 주입될 것임을 나타냈습니다.

## 단계 3: 서비스를 컴포넌트에 주입하기

컴포넌트에서 서비스를 사용하려면 Angular의 의존성 주입 시스템을 사용하여 서비스를 주입해야 합니다. app.component.ts와 같은 컴포넌트 파일을 열고 다음 코드를 추가하세요.

<div class="content-ad"></div>

```js
import { Component } from '@angular/core';
import { MyService } from './my-service.service';
export class AppComponent {
  data: string[];
  newItem: string;
  constructor(private myService: MyService) {
    this.data = myService.getData();
  }
  addItem() {
    this.myService.addData(this.newItem);
    this.newItem = '';
  }
}
``` 

```js
<div>
  <h2>Data:</h2>
  <ul>
    <li *ngFor="let item of data">{{item}}</li>
  </ul>
  <input [(ngModel)]="newItem" placeholder="New item...">
  <button (click)="addItem()">Add</button>
</div>
```

이 코드에서는 MyService 클래스를 가져와서 구성 요소의 constructor에 주입했습니다. 또한 서비스의 data 속성으로 구성 요소에 프로퍼티 data를 추가했습니다. 마지막으로 사용자가 데이터 배열에 새 항목을 추가할 수 있도록 input과 button을 추가했습니다.

서비스의 데이터를 구성 요소의 템플릿에 표시하려면 *ngFor 지시문을 추가하여 데이터 배열을 반복하고 각 항목을 목록에 표시했습니다.

<div class="content-ad"></div>

컴포넌트의 newItem 속성도 양방향 데이터 바인딩인 [(ngModel)]을 이용하여 입력 필드에 바인딩했습니다. 사용자가 "추가" 버튼을 클릭하면 컴포넌트의 addItem() 메서드가 호출됩니다. 이 메서드는 서비스의 addData() 메서드를 호출하여 새로운 항목을 데이터 배열에 추가합니다.

## 단계 4: 모듈에 서비스 추가

서비스를 주입 가능하게 하려면 해당 서비스를 모듈의 providers 배열에 추가해야 합니다. app.module.ts 파일을 열고 아래 코드를 추가하세요:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyService } from './my-service.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

<div class="content-ad"></div>

이 코드에서는 MyService 클래스를 가져와 @NgModule 데코레이터의 providers 배열에 추가했습니다. 이렇게하면 서비스가 응용 프로그램 전반에 걸쳐 주입 가능하게 됩니다.

# 서비스의 싱글톤 특성 이해하기

Angular에서 서비스는 일반적으로 싱글톤으로 설계됩니다. 이는 서비스가 컴포넌트나 다른 서비스에 주입될 때 항상 동일한 서비스 인스턴스를 반환한다는 것을 의미합니다. 이 동작은 서비스를 응용 프로그램 전체에서 일관되고 예측 가능하게 사용할 수 있도록 해주어 종종 원하는 바입니다.

서비스의 싱글톤 특성을 이해하는 것은 서비스를 설계하고 사용하는 방식에 영향을 미치기 때문에 중요합니다. 이 기사에서는 싱글톤 개념을 자세히 살펴보고 Angular 응용 프로그램에서 어떻게 사용될 수 있는지 예를 살펴볼 것입니다.

<div class="content-ad"></div>

# 싱글턴이란 무엇인가요?

싱글턴은 클래스의 인스턴스화를 단 한 번으로 제한하고 해당 인스턴스에 대한 전역 액세스 지점을 제공하는 디자인 패턴입니다. 즉, 싱글턴은 한 번만 인스턴스화될 수 있는 클래스이며, 이 인스턴스는 클래스의 모든 사용자에 의해 공유됩니다.

Angular 서비스의 맥락에서, 싱글턴 서비스는 한 번 생성되고 애플리케이션 전반에 걸쳐 공유되는 서비스입니다. 서비스가 컴포넌트나 다른 서비스에 주입될 때, Angular은 항상 동일한 서비스 인스턴스를 반환합니다.

# Angular에서 싱글턴을 사용하는 이유는 무엇인가요?

<div class="content-ad"></div>

Angular 애플리케이션에서 싱글톤이 일반적으로 사용되는 몇 가지 이유가 있습니다:

## 일관성

서비스가 싱글톤임을 보장함으로써 해당 서비스를 사용하는 모든 컴포넌트와 서비스가 동일한 서비스 인스턴스에 액세스 할 수 있다고 확신할 수 있습니다. 이는 애플리케이션 전체에서 일관성을 유지하는 데 도움이 될 수 있습니다.

## 메모리 관리

<div class="content-ad"></div>

여러 서비스 인스턴스를 만드는 것은 메모리 누수와 다른 문제를 야기할 수 있습니다. 서비스를 싱글톤으로 만들면 서비스의 유일한 인스턴스가 있음을 보장하여 메모리 사용량을 줄이고 성능을 향상시킬 수 있습니다.

## 성능

서비스를 만들고 초기화하는 것은 특히 서비스가 해결해야 할 종속성이 있는 경우 비용이 많이 드는 작업일 수 있습니다. 서비스를 싱글톤으로 만들면 서비스를 여러 번 만들고 초기화하는 오버헤드를 피할 수 있습니다.

## 내장 서비스

<div class="content-ad"></div>

Angular은 웹 애플리케이션을 개발하는 데 사용할 수 있는 여러 내장 서비스를 제공합니다. 이러한 서비스는 Angular 프레임워크의 일부이며 컴포넌트로 쉽게 가져올 수 있습니다. 이 기사에서는 Angular에서 가장 일반적으로 사용되는 내장 서비스 몇 가지를 탐색하고, Angular 애플리케이션에서 어떻게 사용될 수 있는지 예제를 제공하겠습니다.

## 1. HttpClient

HttpClient 서비스는 서버에 HTTP 요청을 보낼 수 있는 Angular 모듈입니다. RESTful API와 상호 작용하고 백엔드 서버에서 데이터를 검색하는 데 사용할 수 있는 강력한 서비스입니다.

- Angular 프로젝트에서 todo.service.ts라는 새 서비스 파일을 만들고 HttpClient 서비스를 가져오세요:

<div class="content-ad"></div>

```js
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }
  
  getTodos() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  }
  
  getTodoById(id: number) {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
```

- 당신의 컴포넌트에서 TodoService를 가져와서 메서드에 구독하세요:

```js
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  template: `
    <h1>할 일 목록</h1>
    <ul>
      <li *ngFor="let todo of todos">{{ todo.title }}</li>
    </ul>
  `
})
export class TodoListComponent implements OnInit {
  todos: any[];
  
  constructor(private todoService: TodoService) { }
  
  ngOnInit() {
    this.todoService.getTodos().subscribe(response => {
      this.todos = response;
    });
  }
}
```

- 별도의 컴포넌트에서 getTodoById() 메서드를 사용하세요:


<div class="content-ad"></div>

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-details',
  template: `
    <h1>Todo Details</h1>
      <p>Title: { todo.title }</p>
      <p>Completed: { todo.completed }</p>
  `
})
export class TodoDetailsComponent implements OnInit {
  todo: any;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodoById(id).subscribe(response => {
      this.todo = response;
    });
  }
}
```

이 예시에서는 두 개의 메서드, getTodos()와 getTodoById(),를 가진 별도의 TodoService를 만들었습니다. 이러한 메서드는 HttpClient 서비스를 사용하여 원격 서버에서 할 일 목록을 검색하기 위해 HTTP 요청을 수행합니다. TodoListComponent에서 TodoService를 주입하고 getTodos() 메서드를 구독하여 할 일 목록을 검색하고 해당 내용을 템플릿에 표시했습니다. TodoDetailsComponent에서는 getTodoById() 메서드를 사용하여 라우트 매개변수에서 ID로 특정 할 일을 검색하고 그 내용을 템플릿에 표시했습니다.

## 2. Router

Angular 라우터 서비스는 Angular에서 내장된 서비스로, Angular 애플리케이션의 다른 뷰나 컴포넌트 간의 탐색을 관리하는 역할을 합니다.


<div class="content-ad"></div>

- 홈 컴포넌트인 home.component.ts를 생성하고 about 컴포넌트로 이동할 수 있는 링크를 추가하세요:

```js
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  template: `
    <h1>홈 페이지에 오신 것을 환영합니다!</h1>
    <a routerLink="/about">회사 소개</a>
  `
})
export class HomeComponent { }
```

- 어바웃 컴포넌트인 about.component.ts를 생성하고 홈 컴포넌트로 돌아갈 수 있는 링크를 추가하세요:

```js
import { Component } from '@angular/core';
@Component({
  selector: 'app-about',
  template: `
    <h1>회사 소개</h1>
    <p>우리는 멋진 소프트웨어를 만드는 회사입니다!</p>
    <a routerLink="/">홈으로 돌아가기</a>
  `
})
export class AboutComponent { }
```

<div class="content-ad"></div>

- app-routing.module.ts 파일에서 앱 라우팅을 설정하세요:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- 앱 컴포넌트 템플릿에 router-outlet 지시자를 추가하세요:

```html
<router-outlet></router-outlet>
```

<div class="content-ad"></div>

앱을 실행하면 HomeComponent가 표시되어 AboutComponent로 이동할 수 있는 링크가 나타납니다. 링크를 클릭하면 AboutComponent로 이동하고, AboutComponent에는 HomeComponent로 돌아갈 수 있는 링크가 있습니다.

템플릿에서 routerLink 지시문을 사용하여 링크를 클릭하여 다른 경로로 이동할 수 있습니다. AppRoutingModule의 RouterModule를 사용하면 앱의 경로를 정의하고 컴포넌트 뷰에 매핑할 수 있습니다. 앱 컴포넌트 템플릿의 router-outlet 지시문은 Angular에 현재 경로에 따라 컴포넌트 뷰를 렌더링할 위치를 알려줍니다.

# 3. 제목

Angular의 Title 서비스는 현재 HTML 문서의 제목을 동적으로 설정하는 방법을 제공합니다.

<div class="content-ad"></div>

기본적으로 HTML 문서의 제목은 페이지의 head 섹션에서 `title` 태그를 사용하여 설정됩니다. Angular로 구축된 단일 페이지 애플리케이션(SPA)에서 사용자가 다른 뷰나 컴포넌트 간을 이동할 때 페이지의 제목을 동적으로 변경할 수 있습니다.

Title 서비스를 사용하면 Angular 컴포넌트에서 현재 HTML 문서의 제목을 동적으로 설정할 수 있습니다. Title 서비스를 컴포넌트에 주입하고, setTitle() 메서드를 호출하여 HTML 문서의 제목을 설정할 수 있습니다.

- Angular CLI를 사용하여 새로운 Angular 서비스인 TitleService를 만드는 방법:

```js
ng generate service TitleService
```

<div class="content-ad"></div>

- src/app 폴더에 생성된 title.service.ts 파일을 열어서 다음 코드를 추가해주세요:

```js
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  setTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => {
          const title = route.snapshot.data['title'];
          if (title) {
            return title;
          }
          return '내 앱 타이틀';
        })
      )
      .subscribe((title) => this.title.setTitle(title));
  }
}
```

- 컴포넌트에서 TitleService를 import하고 setTitle() 메서드를 호출해주세요:

```js
import { Component, OnInit } from '@angular/core';
import { TitleService } from './title.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle();
  }
}
```

<div class="content-ad"></div>

- 라우트 파일에 다음과 같이 각 라우트에 title 속성을 갖는 데이터 객체를 추가해 주세요:

```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: '홈 페이지' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: '소개 페이지' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

이제 TitleService 인스턴스의 setTitle() 메서드가 호출되면 라우트 데이터를 기반으로 웹페이지의 타이틀이 동적으로 업데이트됩니다.

이것은 내장 서비스 중 일부일뿐이며, Angular 공식 문서에서 더 많은 것을 배울 수 있습니다.

<div class="content-ad"></div>

# 커스텀 서비스

Angular에서는 커스텀 서비스를 만들어서 로직과 기능을 캡슐화하고 다양한 컴포넌트나 모듈 간에 공유할 수 있습니다. Angular에서 커스텀 서비스를 만드는 예제를 살펴보겠습니다:

- 먼저, 프로젝트에서 새 파일을 만들어서 커스텀 서비스를 정의해야 합니다. 이 파일을 custom.service.ts라고 이름 짓겠습니다.
- 이 파일에서 @angular/core 모듈에서 Injectable 데코레이터를 가져와야 합니다.

```js
import { Injectable } from '@angular/core';
```

<div class="content-ad"></div>

3. 다음으로, 우리는 사용자 정의 서비스 클래스에 @Injectable 데코레이터를 추가해야 합니다. 이는 Angular에게 이 클래스가 종속성과 함께 주입될 수 있다는 것을 알려줍니다.

```js
@Injectable({
  providedIn: 'root'
})
export class CustomService {
  constructor() { }
  
  // 여기에 사용자 정의 서비스 메서드 정의
}
```

4. 이제 원하는 만큼 CustomService 클래스에 사용자 정의 메서드와 속성을 추가할 수 있습니다. 예를 들어, 인사 메시지를 반환하는 간단한 메서드를 만들어봅시다.

```js
@Injectable({
  providedIn: 'root'
})
export class CustomService {
  constructor() { }
  
  sayHello(name: string): string {
    return `안녕, ${name}!`;
  }
}
```

<div class="content-ad"></div>

5. 컴포넌트에서 사용자 정의 서비스를 사용하려면 해당 서비스를 컴포넌트의 생성자에 주입해야 합니다. MyComponent라는 새 컴포넌트를 생성하고 CustomService를 주입해 보겠습니다.

```js
import { Component } from '@angular/core';
import { CustomService } from './custom.service';
@Component({
  selector: 'app-my-component',
  template: '<p>{ message }</p>'
})
export class MyComponent {
  message: string;
  constructor(private customService: CustomService) {
    this.message = this.customService.sayHello('World');
  }
}
```

이 예시에서는 CustomService를 MyComponent 생성자에 주입하고 해당 서비스를 사용하여 컴포넌트의 메시지 속성을 설정했습니다. CustomService 클래스의 sayHello 메소드를 'World' 인자와 함께 호출하여 반환된 인사 메시지를 메시지 속성에 저장했습니다.

이제 Angular 애플리케이션 전반에 걸쳐 사용할 수 있는 사용자 정의 서비스를 갖게 되었습니다.

<div class="content-ad"></div>

# Angular에서 서비스의 중요성

확장 가능하고 유지 보수가 쉬운 애플리케이션을 만들기 위해서는 최선의 방법을 따르고 올바른 아키텍처 패턴을 사용하는 것이 중요합니다. 서비스는 Angular 애플리케이션에서 중요한 역할을 합니다.

- 코드 구성 — Angular 애플리케이션은 매우 크고 복잡해질 수 있으며, 모든 코드를 단일 구성 요소에서 관리하는 것이 어려울 수 있습니다. 서비스를 사용하여 관련 기능을 별도의 모듈로 구성할 수 있어 더 쉽게 관리하고 유지할 수 있습니다. 이는 코드 유지 관리성과 가독성을 개선하며 코드 중복 가능성을 줄입니다.
- 재사용성 — 서비스는 여러 구성 요소에서 재사용할 수 있어 애플리케이션 내에서 코드 중복을 줄입니다. 이는 특정 기능을 수정해야 할 경우 해당 서비스를 한 곳에서 업데이트하면 해당 서비스를 사용하는 모든 구성 요소에 변경이 반영됩니다.
- 의존성 주입 — Angular의 의존성 주입 시스템을 사용하여 서비스를 구성 요소에 주입할 수 있어 데이터 및 기능을 쉽게 공유할 수 있습니다. 이를 통해 느슨하게 결합된 구성 요소를 개발하기가 쉬워지며, 이는 테스트와 유지 보수가 쉬워집니다.
- 관심사 분리 — 서비스를 사용하면 애플리케이션의 표현 계층과 비즈니스 로직을 분리할 수 있습니다. 비즈니스 로직을 별도의 서비스에 유지함으로써 표현 계층과 사용자 상호작용을 위해 책임을 지는 구성 요소를 개발하는 데 집중할 수 있습니다. 이러한 관심사 분리는 앞으로의 애플리케이션을 테스트, 유지 보수 및 수정하기 용이하게 만듭니다.
- 코드 유지 보수성 — 서비스를 사용하여 향후 변경될 가능성이 높은 기능을 표현 계층에서 격리시킴으로써 미래에 코드를 유지 및 수정하는 것이 쉬워집니다. 이는 애플리케이션에서의 디버깅 및 문제 해결에 소요되는 시간을 줄일 수 있습니다.
- 테스트 — 서비스는 쉽게 테스트할 수 있는 구조로 설계되어 있어 기능의 개별 요소를 테스트하고 예상대로 동작하는지 확인하기 쉽습니다. 비즈니스 로직을 서비스로 분리함으로써 해당 서비스에 대해 더 포괄적인 단위 테스트를 작성할 수 있어 애플리케이션에서 버그 발생 가능성을 줄일 수 있습니다.

# Angular 서비스 사용시 최선의 방법

<div class="content-ad"></div>

Angular 서비스는 응용 프로그램 전체에서 기능을 구성하고 공유하는 데 중요한 역할을 합니다. Angular에서 서비스를 최대한 활용하기 위해서는 최상의 관행을 따르는 것이 중요합니다. 이 글에서는 Angular 서비스 작업 시의 최상의 관행에 대해 알아보겠습니다.

- 서비스를 한 가지 역할에 집중하세요

서비스를 한 가지 역할에 집중하는 것이 중요합니다. 여러 역할을 갖는 서비스는 관리와 유지보수가 어려워질 수 있습니다. 이는 일반적으로 단일 책임 원칙(Single Responsibility Principle, SRP)이라고 알려져 있습니다. 서비스를 한 가지 역할에 집중시킴으로써 코드를 더 모듈식으로 만들고 테스트하기 쉽게 할 수 있습니다.

- Injectable 데코레이터를 사용하세요

<div class="content-ad"></div>

Angular에서 의존성 주입을 활성화하려면 서비스에 @Injectable 데코레이터가 있어야 합니다. 이 데코레이터는 Angular이 서비스에 의존성을 주입하는 데 사용하는 메타데이터를 제공합니다.

```js
@Injectable({
  providedIn: 'root'
})
export class MyService {
  // 서비스 코드를 여기에 작성합니다
}
```

@Injectable 데코레이터의 providedIn 속성은 Angular에 서비스를 루트 수준에서 제공하도록 지시합니다. 이는 서비스가 응용 프로그램 전체에서 사용 가능하다는 것을 의미합니다.

- 서비스에서는 비공개 속성을 사용하세요

<div class="content-ad"></div>

서비스에서 비공개 속성을 사용하는 것이 좋은 방법입니다. 비공개 속성은 서비스 외부에서 직접 액세스할 수 없기 때문에 서비스의 상태에 예기치 않은 변경을 방지하는 데 도움이 됩니다.

```js
@Injectable({
  providedIn: 'root'
})
export class MyService {
  private myProperty: any;
  
  // 서비스 코드 작성
}
```

- 의존성 주입에 생성자 인젝션 사용하기

서비스에 의존성을 주입하려면 생성자 인젝션을 사용합니다. 이를 위해 생성자 매개변수에 의존성을 선언하고, Angular가 의존성 주입을 처리합니다.

<div class="content-ad"></div>

```js
@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor(private httpClient: HttpClient) {
    // Service code goes here
  }
}
```

- providers 배열에 서비스를 추가하는 대신 providedIn 속성을 사용하세요

Angular의 이전 버전에서는 서비스가 NgModule의 providers 배열에 추가되었습니다. 그러나 Angular의 최신 버전에서는 @Injectable 데코레이터의 providedIn 속성을 대신 사용할 수 있습니다. 이는 트리 쉐이킹을 가능하게 하여 최종 애플리케이션 번들의 크기를 줄일 수 있는 더 나은 접근 방식입니다.

- 컴포넌트 간에 통신하기 위해 서비스를 사용하세요


<div class="content-ad"></div>

서비스는 컴포넌트 간에 통신하는 데 사용될 수 있으며 데이터 및 기능을 서로 공유할 수 있도록 합니다. 이것은 서로 직접적으로 관련이 없지만 서로 통신해아하는 컴포넌트들에게 특히 유용합니다.

```js
@Injectable({
  providedIn: 'root'
})
export class MyService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  
  setData(data: any) {
    this.dataSubject.next(data);
  }
}
```

이 예제에서는 BehaviorSubject를 사용하여 데이터를 서비스에 저장하고 있습니다. setData 메서드를 사용하여 데이터를 업데이트하고, data$ observable을 사용하여 데이터의 변경 사항을 구독할 수 있습니다.

# 추가 학습 자료

<div class="content-ad"></div>

추가 학습을 위한 다양한 자원이 많이 있어요. 아래는 Angular에 대한 깊은 이해를 돕는 데 도움이 되는 몇 가지 자원들이에요:

- Angular 문서 — 공식 Angular 문서는 시작부터 고급 개념까지 모든 것을 다루는 종합적인 자원이에요. 튜토리얼, 안내서, API 참조 등이 포함돼 있어요. Angular에서 찾아볼 수 있어요.
- Angular University — Angular University는 Angular을 포함한 온라인 강좌와 자원을 제공하는 교육 회사에요. Angular, RxJS 등 관련 기술에 대한 강좌를 제공하고 있어요. Angular University에서 찾아볼 수 있어요.
- TekTutorialsHub — Tektutorialshub은 Angular을 비롯한 여러 기술에 대한 튜토리얼과 기사를 제공하는 웹사이트에요. Angular 튜토리얼에는 Angular 시작하기부터 반응형 폼, Angular material 등 고급 개념까지 다양한 주제가 포함돼 있어요. Angular 튜토리얼은 TekTutorialsHub에서 찾을 수 있어요.
- TutorialsPoint — TutorialsPoint는 다양한 기술에 대한 광범위한 튜토리얼, 강좌 및 책을 제공하는 인기 있는 온라인 학습 플랫폼이에요. Angular 튜토리얼에는 Angular 기본 개념부터 Angular CLI, 반응형 폼, 단위 테스트 등의 고급 주제까지 다양한 주제가 포함돼 있어요. Angular 튜토리얼은 TutorialsPoint에서 찾을 수 있어요.
- JavaTPoint — JavaTPoint는 Angular을 포함한 다양한 기술에 대한 튜토리얼과 강좌를 제공하는 온라인 학습 플랫폼이에요. Angular 튜토리얼에는 Angular 라우팅, 서비스, 애니메이션 등의 기본 개념부터 고급 주제까지 다양한 주제가 포함돼 있어요. Angular 튜토리얼은 JavaTPoint에서 찾을 수 있어요.

이것들은 Angular에서 추가 학습을 위한 몇 가지 자원일 뿐이에요. 프레임워크를 계속 다루면서 더 많은 자원을 발견할 가능성이 높아요. 중요한 것은 호기심을 갖고, 계속 배우고, Angular 커뮤니티의 최신 트렌드와 모베스트 프랙티스를 따라가는 것이에요.

여기까지 읽어주셔서 정말 감사드려요! 이 기사를 끝까지 읽어보시고 도움이 되셨기를 바래요. 저는 Medium, Twitter, Linkedin 및 Facebook에서도 저를 팔로우하실 수 있어요.

<div class="content-ad"></div>

질문이 있으면 언제든지 물어보세요.

커피 사주시면 감사하겠어요.

더 많은 재미있는 프로그래밍 코드 조각을 기대해 주세요.