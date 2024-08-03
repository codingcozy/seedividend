---
title: "앵귤러에서 NgRx 사용하지 마세요"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Stop using NgRx in Angular"
link: "https://medium.com/@hclatomic/stop-using-ngrx-in-angular-a3ab7c694a14"
---



구글 엔지니어들이 외부 라이브러리인 NgRx와 같은 게임으로 만든 라이브러리가 필요할 정도로 미숙한 것 같나요? 구글 엔지니어들이 V8 자바스크립트 엔진과 노드.js를 발명한 사람들이 자바스크립트에 미숙해서 복잡하고 무거운 웹 앱을 만들기 위해 독립된 프레임워크를 제작할 수 없을 정도인 것 같나요?

그렇게 생각하신다면, Angular 기술의 실제 파워와 가져온 혁신을 모르고 계신 거죠. 설명해 드릴게요.

자바스크립트/HTML에서 주요한 문제점은 컴포넌트 간 통신입니다. 컴포넌트, 즉 HTML 조각과 연결된 자바스크립트 조각은 기본적으로 다른 컴포넌트와 독립적입니다. 이것은 자바스크립트가 페이지 전체에 대한 전역 변수 개념을 기본적으로 포함하지 않기 때문입니다. 필요하다면, 컴포넌트 간 연결을 담당하는 미들웨어를 코딩해야 하고, 따라서 컴포넌트 간의 전역 변수 개념, 즉 2-way 데이터 바인딩을 만들어야 합니다. 이러한 작업을 2000년대에는 많은 양의 자바스크립트와 JQuery 코드로 하고 있었는데, 그때 전문 라이브러리가 나오기 시작하면서 Redux가 가장 유명해졌죠.

이러한 전통적인 방식의 문제점은 복잡한 코딩이 필요하다는 것입니다. A 컴포넌트에서 공유 변수를 선언해야 하며, 이것이 변경될 경우 각 구체적인 다른 B, C 컴포넌트에서 무엇을 해야 하는지 정의해야 합니다. 게다가, 만약 변수가 C에서 변경된다면, 다른 D, E 컴포넌트에서는 무엇을 해야 하는지도 얽혀 있죠. 따라서 응용 프로그램이 복잡해질수록 Redux 코드가 무겁고 복잡해지면서 지연, 유지 보수, 디버깅 등도 증가합니다. 그러나 선택의 여지가 없습니다. 자바스크립트가 강요하기 때문에 이와 같이 해야 합니다. React나 Vue와 같은 일부 프레임워크는 아직도 이 기술을 사용하고 있으나 이제는 자체 Redux와 같은 것을 구현하기 시작했습니다.

그리고 Angular가 나타납니다. 물론 React나 Vue와 같이 Angular는 각 단일 컴포넌트의 HTML과 자바스크립트 코드 간의 2-way 데이터 바인딩을 보장하지만 추가로 컴포넌트 간의 2-way 데이터 바인딩도 자체적으로 제공합니다. 즉, NgRx와 같은 것이 필요하지 않습니다. 이것이 혁명입니다. Angular은 10ms의 setInterval로 구성된 무한 루프에 기반하여 전체 애플리케이션을 확인하고 변수의 변경을 자동으로 다른 컴포넌트로 전파합니다. 이를 수행하기 위해 변수는 Angular 서비스(@Injectable)에 등록되어야 하며 해당 변수가 필요한 컴포넌트는 이 서비스를 가져와야 합니다. 여기까지입니다.

NgRx를 사용하면 Angular의 기본 2-way 데이터 바인딩에 컴포넌트 간 추가적인 2-way 데이터 바인딩을 덧씌울 뿐입니다. 이렇게 하면 프레임워크가 제대로 작동하지 않습니다. 이겍은 무용하며, 시간이 오래 걸리고 생산성을 떨어뜨립니다.

“애플리케이션 상태를 제어”하고 NgRx가 제공하는 “불변성”이 꼭 필요하다면 Angular 기술로 그것을 하세요, 훨씬 간단합니다. Angular 서비스를 생성하고, Redux를 그리워하는 사람이라면 “store”라고 부르세요. 그리고 이 서비스를 'root'로 제공하여 애플리케이션의 상태를 설명하기 위해 필요한 변수를 등록한 다음 해당 변수와 관련된 컴포넌트에서 이 서비스를 가져오세요. 컴포넌트 중 하나에서 스토어 변수를 변경하면 10ms 내에 스토어가 업데이트되고 다른 컴포넌트도 업데이트됩니다. 언제든지 서비스 스토어는 애플리케이션의 전체 상태를 나타낼 것입니다. 그러면 이를 세션 개체, 로컬 스토리지, IndexedDB 또는 서버에 백업하여 애플리케이션 상태를 되감거나 빨리감기할 수 있는 불변성의 개념을 구현할 수 있습니다. 실제로 백업으로 현재 스토어를 대체하는 것은 한 줄의 코드뿐입니다. 이.store = backup[i]를 실행하면 나머지는 10ms 동안 애플리케이션 전체에서 마법의 루프가 수행할 것입니다.

자바스크립트 개발자의 두 번째 큰 고통은 비동기성입니다. 자바스크립트에서 모든 것은 비동기입니다, 심지어 화면을 클릭하는 것도 말이죠. 이를 처리하기 위해 Promise와 오늘날의 슈퍼 Promise인 Observable과 같은 도구가 있습니다. Redux와 같은 기술인 NgRx를 사용하면 Observable이 컴포넌트 내에서 해결되어(subscribe) 아무 문제가 없습니다만 코드를 조금 작성해야하며, 때로는 복잡한 작업도 필요합니다. 올바르게 구독 취소해 주지 않으면 메모리 누수가 발생할 수도 있습니다. Angular에서는 그렇지 않습니다. 비동기성은 공유 서비스 내에서 더 잘 처리되며, 마법의 무한 루프가 나머지 일을 처리, 즉 “store”를 가져오고 업데이트합니다. 'store'를 가져오는 컴포넌트에서 Observable을 처리할 필요가 없으므로 많은 코드 및 복잡성을 줄일 수 있을 뿐만 아니라 메모리 누수가 발생할 수도 없다는 점입니다.

사실 Angular의 목표는 프런트엔드 개발자의 작업을 최대한 편리하게 만드는 것입니다. 중간웨어 및 Observable에 가능한 적은 시간을 할애하고 대신 최종 사용자가 기대하는 높은 비즈니스 가치가 있는 인터페이스를 생성하기 위한 최대한의 시

<div class="content-ad"></div>

# user.ts

사용자 유형을 정의합시다.

```js
export interface User {
  firstname: string;
  lastname: string;
  age: number;
}
```

# store.service.ts

<div class="content-ad"></div>

우리는 store라는 서비스를 설정하고, 그 안에 User 타입의 user라는 전역 변수를 선언합니다.

```js
import { Injectable } from "@angular/core";
import { User } from "../classes/user";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  user: User | any;
}
```

# api.service.ts

서버에 호출하는 흉내를 내기 위해 서버에 비동기성을 구현하는 API 서비스를 설정합니다.

<div class="content-ad"></div>

```typescript
import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(public store: StoreService, private http: HttpClient) {}

  mockCallServer() {
    this.http.get("/assets/users.json").subscribe((user: any) => {
      // The observable send by the http.get is directly resolved
      // into the shared service at the return of the api
      this.store.user = user;
    });
  }
}
```

# a.component.ts

이 컴포넌트는 스토어 서비스에서 가져온 공유 데이터를 표시하는 것만을 목적으로 합니다.

```typescript
import { Component } from "@angular/core";
import { StoreService } from "../../services/store.service";

@Component({
  selector: "comp-a",
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <b>Component A: 가져온 스토어 표시</b><br /><br />
      {store.user.firstname} {store.user.lastname}
    </div>
  `,
  styleUrl: "./a.component.css",
})
export class AComponent {
  constructor(public store: StoreService) {}
}
```

<div class="content-ad"></div>

# b.component.ts

이 컴포넌트는 스토어 서비스에서 가져온 공유 데이터를 수정하는 데 사용됩니다.

```js
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'comp-b',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <b>Component B : 가져온 스토어 변경</b><br><br>
      이름 : <input type="text" [(ngModel)]="store.user.firstname">
      성 : <input type="text" [(ngModel)]="store.user.lastname">
    </div>
  `,
  styleUrl: './b.component.css'
})
export class BComponent {
  constructor(public store: StoreService) { }
}
```

# c.component.ts

<div class="content-ad"></div>

이 컴포넌트는 외부 라이브러리나 디자인 시스템에서 제공되는 컴포넌트처럼 @Input/@Output을 사용하기 때문에 스토어를 가져오지 않습니다. 그러나 app.component.ts에서 설명된 방법으로 스토어에 연결할 수 있습니다.

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../classes/user';

@Component({
  selector: 'comp-in-out',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (user) {
      <div class="container">
        <b>Component C : independent Input/Output connected to the store</b><br><br>
        Firstname : <input type="text" [(ngModel)]="user.firstname">
        Lastname : <input type="text" [(ngModel)]="user.lastname">
      </div>
    }
  `,
  styleUrl: './in-out.component.css'
})
export class InOutComponent {
  @Input() user!: User;
  @Output() userChange = new EventEmitter<User>();
}
```

# app.component.ts

app 컴포넌트는 API 서비스를 호출하여 비동기 데이터를 검색하고, 이 데이터가 스토어 서비스에서 사용 가능할 때 컴포넌트를 표시합니다.

<div class="content-ad"></div>

```js
import { Component, OnInit } from '@angular/core';

import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { InOutComponent } from './components/in-out/in-out.component';

import { StoreService } from './services/store.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'my-comp',
  standalone: true,
  providers: [StoreService, ApiService],
  imports: [
    AComponent,
    BComponent,
    InOutComponent,
  ],
  template: `
    @if(!store.user) {
      <div class="loading"> 로딩 중입니다. 잠시만 기다려주세요...</div>
    }
    @else {
      <comp-a></comp-a>
      <comp-b></comp-b>
      <comp-in-out [(user)]="store.user"></comp-in-out>
    }
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(public store: StoreService, public api: ApiService) {}

  ngOnInit() {
    // 모의 서버를 호출하여 store.user에 데이터를 넣습니다.
    this.api.mockCallServer();
  }
}
```

이제 NgRx와 observables을 사용하여 이 예시를 재현해보고, 두 코드 및 개발 시간을 비교해보세요. 확신이 들 것입니다.

결론은 NgRx를 사용하고 observables을 번갈아 사용하는 것을 그만두어야 하며, Angular 기술의 모든 힘을 대신 활용하여 똑똑하게 게으르게 개발해야 합니다. 귀하의 상사 및 최종 사용자들은 납기 준수, 저렴한 비용, 쉬운 유지보수 및 응용 프로그램의 진화력 향상에 대한 개선으로 인해 축하를 전해줄 것입니다.
