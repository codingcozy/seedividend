---
title: "제목 Angular 프로젝트를 처음부터 만드는 방법DidLoad 어드바이저, 당신의 열정과 프로그래밍 기술이 빛을 발하는 시간입니다 오늘은 Angular 프로젝트를 처음부터 만들어보는 방법에 대해 알아볼 거에요 함께 시작해볼까요 "
description: ""
coverImage: "/assets/img/2024-06-20-HowtoCreateanAngularProjectfromScratch_0.png"
date: 2024-06-20 00:29
ogImage: 
  url: /assets/img/2024-06-20-HowtoCreateanAngularProjectfromScratch_0.png
tag: Tech
originalTitle: "How to Create an Angular Project from Scratch"
link: "https://medium.com/@dgongoragamboa/how-to-create-an-angular-project-from-scratch-b4031abeb4de"
---



![Angular Project](/assets/img/2024-06-20-HowtoCreateanAngularProjectfromScratch_0.png)

Angular은 강력하고 확장 가능한 웹 애플리케이션을 구축할 수 있는 널리 사용되는 웹 개발 프레임워크입니다. Angular에 처음이신 분들을 위해 스크래치에서 자체 프로젝트를 개발하기 시작하고 싶다면, 이 기사가 필요한 단계를 안내해 드립니다. 새 프로젝트를 설정하고, 컴포넌트를 생성하고, 라우트를 구현하는 방법 등을 배우게 될 것입니다. 시작해 봅시다!

Read this article in Spanish: Crear un proyecto en Angular | Medium

# Prerequisites


<div class="content-ad"></div>

시작하기 전에, 당신의 컴퓨터에 Node.js가 설치되어 있는지 확인해주세요. Node.js는 공식 Node.js 웹사이트(https://nodejs.org)에서 다운로드하여 설치할 수 있습니다. Angular는 Node.js와 npm(Node Package Manager)을 사용하여 종속성 및 개발 환경을 관리합니다.

# 단계 1: Angular CLI 설치

Angular CLI(Command Line Interface)는 Angular 프로젝트를 쉽게 생성하고 관리할 수 있도록 도와주는 명령줄 도구입니다. 터미널을 열고 다음 몤령어를 실행하여 Angular CLI를 전역으로 설치해보세요:

```js
npm install -g @angular/cli
```

<div class="content-ad"></div>

설치가 완료되었으면 다음 명령을 실행하여 Angular CLI가 성공적으로 설치되었는지 확인하세요:

```js
ng version
```

# 단계 2: 새 프로젝트 생성

이제 Angular CLI를 설치했으므로 새 Angular 프로젝트를 생성할 수 있습니다. 터미널에서 다음 명령을 실행하세요:

<div class="content-ad"></div>

```js
ng new my-angular-project
```

이 명령은 "my-angular-project"라는 새 디렉토리를 만들고 초기 프로젝트 구조를 생성합니다.

# 단계 3: 프로젝트 디렉토리로 이동

다음 명령을 사용하여 새로 생성된 프로젝트 디렉토리로 이동하세요:

<div class="content-ad"></div>

```js
cd my-angular-project
```

# 단계 4: 개발 서버 시작하기

프로젝트 디렉토리에 들어간 후, 아래 명령을 실행하여 Angular 개발 서버를 시작하세요:

```js
ng serve
```

<div class="content-ad"></div>

프로젝트를 컴파일하고 로컬 서버에서 실행합니다. 웹 브라우저를 열고 http://localhost:4200으로 이동하세요. Angular 애플리케이션이 정상적으로 작동하는 것을 확인할 수 있습니다.

# 단계 5: 컴포넌트 생성하기

컴포넌트는 Angular에서의 기본적인 구성 요소입니다. 다음 명령어를 사용하여 컴포넌트를 생성할 수 있습니다:

```js
ng generate component 컴포넌트명
```

<div class="content-ad"></div>

이렇게 하면 새로운 컴포넌트를 위해 필요한 TypeScript 파일, HTML 템플릿 및 CSS 스타일링 파일이 자동으로 생성됩니다.

# 단계 6: 라우트 구성

라우트를 설정하면 애플리케이션 내의 여러 컴포넌트 간을 이동할 수 있습니다. 라우트를 구성하려면 app-routing.module.ts 파일을 열고 다음 코드를 추가하세요:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
```

<div class="content-ad"></div>

```js
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

위 코드는 "HomeComponent"와 "AboutComponent" 두 개의 컴포넌트를 위한 라우트를 구성합니다. 이에 따라 이러한 컴포넌트와 해당하는 템플릿을 만들어주세요.

# 단계 7: 컴포넌트에 내용 추가하기

이제 새롭게 생성한 컴포넌트에 내용을 추가할 수 있습니다. 컴포넌트 파일 (component-name.component.ts, component-name.component.html, 그리고 component-name.component.css)을 열고 필요에 맞게 사용자 정의하세요. 텍스트, 이미지, 링크 등을 추가할 수 있습니다.  

<div class="content-ad"></div>

# 단계 8: 애플리케이션 실행

컴포넌트에 내용을 추가한 후 파일을 저장하고 터미널로 돌아가세요. Angular 개발 서버가 여전히 실행 중인지 확인해주세요. 그렇지 않은 경우 다음 명령을 다시 실행하세요:

```js
ng serve
```

그런 다음 브라우저를 열고 http://localhost:4200 으로 이동하세요. 여태까지 생성한 Angular 애플리케이션과 컴포넌트 및 라우트가 표시되어야 합니다.

<div class="content-ad"></div>

축하합니다! 처음으로 Angular 프로젝트를 처음부터 만드셨군요. 이제 더 많은 것을 탐험하고 배우실 수 있을 거에요.

# 요약 및 권장 사항

이 글에서는 처음부터 Angular 프로젝트를 만드는 방법을 배우셨습니다. Angular CLI 설치부터 라우트 구성, 컴포넌트 생성까지 기본 단계를 다뤘습니다. 몇 가지 최종 권장 사항을 안내해드리겠습니다:

- Angular CLI에 의해 생성된 파일 구조에 익숙해지세요. 프로젝트를 효율적으로 구성하는 데 도움이 될 거에요.
- Angular 공식 문서(https://angular.io)를 살펴보세요. 프레임워크의 기능과 능력에 대해 더 알 수 있을 거에요.
- 다양한 컴포넌트를 구축하고 Angular 기능들을 실험해보세요.
- Angular 커뮤니티에 가입하고 포럼과 토론 그룹에 참여하세요. 다른 개발자들로부터 배우고 교류하는 좋은 방법입니다.

<div class="content-ad"></div>

이제 자신의 프로젝트를 Angular로 만들 준비가 되셨군요! 즐거운 여정을 즐기시고 계속해서 배워 나가세요.

이 게시물을 좋아하신다면 제 팔로우를 눌러주시거나 이야기에 박수를 보내주시거나 내가 준비 중인 다음 이야기를 구독해주시면 감사하겠습니다.