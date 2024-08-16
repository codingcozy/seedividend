---
title: "Angular 부트스트래핑 해부 포괄적인 가이드"
description: ""
coverImage: "/assets/img/2024-05-15-DemystifyingAngularBootstrappingAComprehensiveGuide_0.png"
date: 2024-05-15 15:30
ogImage: 
  url: /assets/img/2024-05-15-DemystifyingAngularBootstrappingAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Demystifying Angular Bootstrapping: A Comprehensive Guide"
link: "https://medium.com/@vishalini.sharma/demystifying-angular-bootstrapping-a-comprehensive-guide-3602fbcbd120"
isUpdated: true
---




앵귤러는 강력한 프론트엔드 프레임워크로, 응용 프로그램을 초기화하고 실행하는 강력한 메커니즘을 제공합니다. 앵귤러 부트스트래핑은 앵귤러 프레임워크를 초기화하고 응용 프로그램 구성 요소를 실행하는 과정을 의미합니다. 이것은 앵귤러 응용 프로그램의 시작점으로, UI 구성 요소를 렌더링하고 사용자 상호작용을 처리하는 데 필요한 설정 및 구성을 조정합니다.

앵귤러 부트스트래핑의 주요 구성 요소:

- Index.html: 앵귤러 응용 프로그램의 시작점인 index.html 파일은 초기 HTML 구조를 제공하며 필요한 스크립트 및 스타일시트를 포함합니다.
- Main.ts (또는 main.js): main.ts (또는 main.js) 파일은 앵귤러 응용 프로그램이 부트스트래핑되는 곳입니다. @angular/platform-browser-dynamic에서 platformBrowserDynamic를 import하고 bootstrapModule() 메서드를 사용하여 루트 모듈 (AppModule)을 초기화합니다.

```js
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```



<img src="/assets/img/2024-05-15-DemystifyingAngularBootstrappingAComprehensiveGuide_0.png" />

3. AppModule: 루트 모듈(AppModule)은 app.module.ts 파일에 정의됩니다. 필요한 Angular 모듈을 가져오고, 컴포넌트를 선언하며, @NgModule 데코레이터의 bootstrap 속성을 사용하여 부트스트랩할 루트 컴포넌트를 지정합니다.

```js
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

4. App Component: 루트 컴포넌트(AppComponent)는 애플리케이션의 최상위 컴포넌트를 나타내며, app.component.ts 파일에 정의됩니다. HTML 템플릿과 컴포넌트 로직을 정의합니다.



```js
import { Component } from "@angular/core";
@Component({
  selector: "app-root",
  template: ` <h1>Hello Angular!</h1> `,
  styles: [],
})
export class AppComponent {}
```

부트스트래핑은 Angular 애플리케이션에서 중요한 역할을 하며, 프레임워크를 시작하고 컴포넌트의 실행을 용이하게합니다. Angular를 처음 접하는 초보자이거나 깊이있는 이해를 위해 노력하는 숙련된 개발자이던간에, 부트스트래핑을 습득하는 것은 견고하고 확장 가능한 Angular 애플리케이션을 구축하기 위한 기본 단계입니다.

즐거운 코딩하세요! 😇
