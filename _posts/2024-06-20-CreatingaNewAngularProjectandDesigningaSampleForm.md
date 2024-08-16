---
title: "새로운 Angular 프로젝트 생성 및 샘플 폼 디자인하기"
description: ""
coverImage: "/assets/img/2024-06-20-CreatingaNewAngularProjectandDesigningaSampleForm_0.png"
date: 2024-06-20 02:54
ogImage: 
  url: /assets/img/2024-06-20-CreatingaNewAngularProjectandDesigningaSampleForm_0.png
tag: Tech
originalTitle: "Creating a New Angular Project and Designing a Sample Form"
link: "https://medium.com/@minduladilthushan/creating-a-new-angular-project-and-designing-a-sample-form-729e7dcccc42"
isUpdated: true
---




![image](/assets/img/2024-06-20-CreatingaNewAngularProjectandDesigningaSampleForm_0.png)

Angular은 동적 웹 애플리케이션을 구축하기 위한 강력한 프레임워크입니다. 새 프로젝트를 시작하거나 복잡한 폼을 디자인하더라도, Angular은 개발을 간소화하는 강력한 도구와 기능을 제공합니다. 본 문서에서는 새 Angular 프로젝트를 생성하고 샘플 폼을 디자인하는 방법을 안내해 드립니다.

# 1. Angular CLI 설치

Angular CLI (Command Line Interface)는 Angular 프로젝트를 관리하는 강력한 도구입니다. Angular CLI를 설치하려면 다음 명령어를 실행하세요.

<div class="content-ad"></div>

```js
npm install -g @angular/cli
```

# 2. 새로운 Angular 프로젝트 생성하기

CLI를 사용하여 새로운 Angular 프로젝트를 만들어보세요. 이 작업은 프로젝트 구조와 구성 파일을 자동으로 설정해줍니다.

```js
ng new my-angular-app
cd my-angular-app
ng serve
```

<div class="content-ad"></div>

다음 명령 시퀀스를 사용하세요:

1. 새 Angular 프로젝트를 'my-angular-app'이라는 이름으로 초기화합니다.
2. 프로젝트 디렉토리로 이동합니다.
3. 개발 서버를 시작하여 애플리케이션을 http://localhost:4200에서 접근할 수 있도록 합니다.

## 3. 새 컴포넌트 생성

새로운 폼을 처리할 컴포넌트를 생성합니다. 컴포넌트는 Angular 애플리케이션의 구성 요소입니다.

<div class="content-ad"></div>

```js
ng generate component sample-form
```

이 명령어는 필요한 파일(HTML, CSS, TypeScript 및 테스트를 위한 spec)과 함께 새 컴포넌트를 생성합니다.

# 4. 샘플 폼 디자인하기

생성된 컴포넌트의 HTML 파일을 열고 Angular의 폼 지시문을 사용하여 폼을 만드세요.

<div class="content-ad"></div>

```js
# sample-form.component.html #
<div class="container">
  <h2>샘플 양식</h2>
  <form (ngSubmit)="onSubmit()" #form="ngForm">
    <div class="form-group">
      <label for="name">이름:</label>
      <input type="text" id="name" class="form-control" required [(ngModel)]="model.name" name="name" #name="ngModel">
      <div *ngIf="name.invalid && name.touched" class="alert alert-danger">
        이름을 입력해주세요.
      </div>
    </div>
    <div class="form-group">
      <label for="email">이메일:</label>
      <input type="email" id="email" class="form-control" required [(ngModel)]="model.email" name="email" #email="ngModel">
      <div *ngIf="email.invalid && email.touched" class="alert alert-danger">
        유효한 이메일을 입력해주세요.
      </div>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="form.invalid">제출</button>
  </form>
</div>
```

이 예제에서:

- 이름과 이메일에 대한 두 개의 입력 필드가 만들어졌습니다. 둘 다 필수 입력 항목입니다.
- Angular의 ngModel 지시문을 통해 양방향 데이터 바인딩이 이루어졌습니다.
- 필드가 유효하지 않거나 사용자가 터치한 경우 유효성 검사 메시지가 표시됩니다.
- 제출 버튼을 클릭하면 onSubmit 메서드를 통해 양식이 제출됩니다.

# 5. 양식 제출 처리하기 #


<div class="content-ad"></div>

```js
// sample-form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent {
  model: any = {};

  onSubmit() {
    console.log('Form submitted!', this.model);
  }
}
```

여기 예제에서:

- 모델 객체가 정의되어서 폼 데이터를 저장합니다.
- `onSubmit` 메서드는 폼 제출 시 콘솔에 폼 데이터를 기록합니다.

<div class="content-ad"></div>

# 결론

Angular CLI와 폼 디렉티브를 사용하여 새 Angular 프로젝트를 생성하고 폼을 디자인하는 것은 간단합니다. Angular는 폼 처리와 유효성 검사에 강력한 도구를 제공하여 동적이고 반응적인 웹 애플리케이션을 구축하기 쉽게 만듭니다. 이러한 단계를 따라하면 빠르게 새 Angular 프로젝트를 설정하고 쉽게 복잡한 폼을 디자인할 수 있습니다.

독자 여러분, 읽어주셔서 감사합니다! 궁금한 점, 생각 또는 피드백이 있으시면 아래 댓글을 남겨주시기 바랍니다. 여러분의 참여와 지원은 웹 개발에서 Angular의 가능성을 계속 탐구하는 데 큰 도움이 됩니다.