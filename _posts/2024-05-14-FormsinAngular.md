---
title: "Angular에서 양식Form"
description: ""
coverImage: "/assets/img/2024-05-14-FormsinAngular_0.png"
date: 2024-05-14 14:30
ogImage: 
  url: /assets/img/2024-05-14-FormsinAngular_0.png
tag: Tech
originalTitle: "Forms in Angular"
link: "https://medium.com/@jaydeepvpatil225/forms-in-angular-8fde7d0dcdf6"
---


<img src="/assets/img/2024-05-14-FormsinAngular_0.png" />

안녕하세요! 이번 글에서는 Angular에서 양식과 그 종류에 관해 단계별 실제 구현과 함께 살펴보려고 해요.

# 안내

- Angular란 무엇인가요?



## Angular에서의 폼

## 폼의 종류

## 실무 적용

### Prerequisites



- TypeScript에 대한 기본적인 이해

- NodeJS

- Angular CLI

- Vs Code



# 앵귤러란?

앵귤러는 웹 애플리케이션을 구축하는 인기 있는 오픈 소스 JavaScript 프레임워크입니다. 구글에서 개발되었으며 현재는 구글의 앵귤러 팀에서 유지보수되고 있습니다. 앵귴러는 개발자들이 동적인 싱글 페이지 애플리케이션(SPA)을 만들 수 있게 하며 복잡한 웹 애플리케이션을 구축하기 위한 체계적인 접근 방식을 제공합니다.

# 앵귤러에서의 폼

- 앵귤러에서 폼은 사용자 입력을 처리하고 관리하는 데 도움이 되는 다양한 기능을 제공합니다.



- 웹 애플리케이션의 주요 부분인 Forms. 사용자들이 애플리케이션과 상호 작용하고 애플리케이션으로 데이터를 제출할 수 있게 합니다.

## Angular에서 제공하는 Forms의 종류

Angular는 다음 두 가지 유형의 Forms를 제공합니다:

### 1. Template-Driven Forms



- 템플릿 기반 폼은 제한된 수의 필드 및 간단한 유효성 검사를 개발하기에 적합한 기본 폼입니다.

- 이 폼에서 각 필드는 컴포넌트 클래스의 속성으로 표시됩니다.

- '@angular/forms' 패키지에서 FormsModule를 가져와야 합니다.

다음은 Angular에서 템플릿 기반 폼을 생성하는 동안 사용하는 유효성 검사 객체, 지시문, 속성과 관련된 주요 개념입니다.



- ngForm 디렉티브: 이 디렉티브는 Angular 폼을 나타내며 유효성 검사 및 데이터 조작과 관련된 메서드 및 속성을 노출합니다.

- ngModel 디렉티브: 이 디렉티브는 서로 다른 폼 컨트롤 요소 간의 양방향 데이터 바인딩을 달성하는 데 사용됩니다.

- 유효성 검사 속성: Angular는 폼 컨트롤에 적용할 수있는 다양한 유효성 검사기 속성을 제공합니다.

1. touched: 해당 컨트롤이 터치되었는지를 나타내는 부울 값입니다.



2. untouched: 터치되지 않은 상태

3. valid: 컨트롤 값이 유효한지 나타내는 부울 값.

4. invalid: valid의 반대

- 유효성 검사 디렉티브: Angular는 몇 가지 내장 유효성 검사 디렉티브를 제공하여 ngModel과 함께 사용하여 유효성 검사를 수행할 수 있습니다. 일반적으로 사용되는 몇 가지 디렉티브에는 다음이 있습니다:



1. required: 값이 비어 있지 않도록 보장합니다.

2. min length 및 max length: 값의 최소 및 최대 길이를 지정합니다.

3. pattern: 값을 정규 표현식과 비교합니다.

4. email: 값이 유효한 이메일 주소인지 확인합니다.



## 2. 반응형 폼

- 반응형 폼 또는 모델 기반 폼은 Angular에서 큰 양의 폼을 만들거나 다양한 폼 필드 및 복잡한 검증이 필요한 경우에 적합한 종류의 폼입니다.

- 반응형 폼에서, 각 폼 필드는 Form Control로 간주되며, 폼 컨트롤 집합은 Form Group이라고 합니다.

- 검증 규칙은 Validators 객체를 사용하여 컴포넌트에서 정의되며, 검증 메시지는 템플릿에서 validation 속성을 사용하여 표시할 수 있습니다.



· ReactiveFormModule은 '@angular/forms' 패키지에서 가져와야 합니다.

Angular에서 반응형 폼을 생성하는 동안 사용된 유효성 객체 및 속성과 관련된 주요 개념은 다음과 같습니다.

· FormControl

Angular에서 폼 컨트롤은 반응형 폼에서 개별 폼 요소를 나타냅니다. 또한 입력 폼 요소의 다른 상태와 값들을 관리합니다. 유효성 규칙을 정의할 수 있는 다양한 속성이 있습니다.



1. Value: 양식 컨트롤의 현재 값을 확인하는 데 도움을 줍니다.

2. Status: 상태는 양식 컨트롤의 상태를 나타냅니다.

3. Valid: 컨트롤이 유효한지를 확인하는 부울 유효성 속성입니다.

4. Invalid: 컨트롤이 유효하지 않은지를 확인하는 부울 유효성 속성입니다.



5. 에러: 이는 폼 컨트롤의 유효성 검증 오류를 보유한 객체입니다.

- **Validators**

Validators는 폼 컨트롤의 유효성 검증 규칙을 정의하는 데 사용할 수 있는 함수들입니다.

1. required: 컨트롤이 비어있지 않은 값을 가지고 있는지를 검증합니다.



2. Min(최소값) 및 max(최대값): 컨트롤 값이 지정된 숫자 범위 내에 있는지 확인합니다.

3. pattern(패턴): 컨트롤 값이 정규 표현식과 일치하는지 확인합니다.

4. email(이메일): 컨트롤 값이 유효한 이메일 주소인지 확인합니다.

5. minLength(최소길이) 및 maxLength(최대길이): 컨트롤 값의 길이를 확인합니다.



- FormGroup

폼 그룹은 여러 폼 컨트롤을 포함하는 컨테이너입니다. 관련된 폼 컨트롤을 함께 그룹화하고 단일 단위로 유효성을 관리할 수 있습니다.

- FormBuilder

FormBuilder 서비스는 FormGroup 및 FormControl의 인스턴스를 생성하는 데 사용되며 유효성 규칙을 정의하는 편리한 방법을 제공합니다.



# 실용적인 구현

단계 1

새로운 Angular 애플리케이션을 생성하세요.

단계 2



다음 명령어를 사용하여 부트스트랩 모듈을 설치해 보세요:

npm install bootstrap

Angular JSON 파일에서 Bootstrap을 구성하세요.

```js
 "styles": [
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "./node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
```



Step 3

다음으로, 새롭게 생성된 프로젝트에 두 개의 컴포넌트를 추가해보세요.

template-driven-form.component.html

```js
<div class="container">
    <h2 class="heading">템플릿 기반 폼</h2>
    <form #userForm="ngForm" (ngSubmit)="submitForm(userForm)">
   
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" name="name" [(ngModel)]="userDetails.name" required>
        <div *ngIf="userForm.controls.name?.touched && userForm.controls.name?.invalid" class="text-danger">
          이름을 입력해주세요.
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" class="form-control" id="email" name="email" [(ngModel)]="userDetails.email" required email>
        <div *ngIf="userForm.controls.email?.touched && userForm.controls.email?.invalid" class="text-danger">
          올바른 이메일 주소를 입력해주세요.
        </div>
      </div>

      <div class="form-group">
        <label for="address">주소</label>
        <input type="text" class="form-control" id="address" name="address" [(ngModel)]="userDetails.address" required>
        <div *ngIf="userForm.controls.address?.touched && userForm.controls.address?.invalid" class="text-danger">
          주소를 입력해주세요.
        </div>
      </div>

      <div class="form-group">
        <label for="mobile">휴대폰 번호</label>
        <input type="tel" class="form-control" id="mobile" name="mobile" [(ngModel)]="userDetails.mobile" required pattern="[0-9]{10}">
        <div *ngIf="userForm.controls.mobile?.touched && userForm.controls.mobile?.invalid" class="text-danger">
          올바른 휴대폰 번호를 입력해주세요.
        </div>
      </div>

      <div class="form-group">
        <label for="age">나이</label>
        <input type="number" class="form-control" id="age" name="age" [(ngModel)]="userDetails.age" required min="20" max="60">
        <div *ngIf="userForm.controls.age?.touched && userForm.controls.age?.invalid" class="text-danger">
          올바른 나이를 입력해주세요.
        </div>
      </div>

      <div class="form-group">
        <label for="gender">성별</label>
        <select class="form-control" id="gender" name="gender" [(ngModel)]="userDetails.gender" required>
          <option value="" disabled>성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
        <div *ngIf="userForm.controls.gender?.touched && userForm.controls.gender?.invalid" class="text-danger">
          성별을 선택해주세요.
        </div>
      </div>

      <button type="submit" class="btn btn-primary">제출</button>
    </form>
  </div>
```



```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {
  userDetails = {
    name: '',
    email: '',
    address: '',
    mobile: '',
    age: null,
    gender: ''
  };

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form data:', this.userDetails);
    }
  }
}
```

- 이 예제에서 #userForm="ngForm"은 폼 참조를 생성하여 컴포넌트 내의 사용자 객체의 속성에 접근할 수 있도록 합니다. [(ngModel)] 지시문은 입력 요소와 사용자 객체의 속성 간에 양방향 데이터 바인딩을 설정합니다.

- 유효성 검사 지시문 (required 및 email)이 폼 컨트롤에 적용되며, 오류 메시지는 컨트롤의 상태에 따라 조건부로 표시됩니다.




<img src="/assets/img/2024-05-14-FormsinAngular_1.png" />

다음으로 아래와 같이 반응형 폼을 생성하세요.

reactive-form.component.html

```js
<div class="container">
    <h2 class="heading">반응형 폼</h2>
    <form [formGroup]="userForm" (ngSubmit)="submitForm()">

        <div class="form-group">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" formControlName="name">
        <div *ngIf="userForm?.get('name')?.invalid && userForm?.get('name')?.touched" class="text-danger">
          이름을 입력해주세요.
        </div>
      </div>
  
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" class="form-control" id="email" formControlName="email">
        <div *ngIf="userForm?.get('email')?.invalid && userForm?.get('email')?.touched" class="text-danger">
          유효한 이메일을 입력해주세요.
        </div>
      </div>
  
      <div class="form-group">
        <label for="address">주소</label>
        <input type="text" class="form-control" id="address" formControlName="address">
        <div *ngIf="userForm?.get('address')?.invalid && userForm?.get('address')?.touched" class="text-danger">
          주소를 입력해주세요.
        </div>
      </div>
  
      <div class="form-group">
        <label for="mobile">휴대전화 번호</label>
        <input type="tel" class="form-control" id="mobile" formControlName="mobile">
        <div *ngIf="userForm?.get('mobile')?.invalid && userForm?.get('mobile')?.touched" class="text-danger">
          유효한 휴대전화 번호를 입력해주세요.
        </div>
      </div>
  
      <div class="form-group">
        <label for="age">나이</label>
        <input type="number" class="form-control" id="age" formControlName="age">
        <div *ngIf="userForm?.get('age')?.invalid && userForm?.get('age')?.touched" class="text-danger">
          유효한 나이를 입력해주세요 (1에서 120 사이).
        </div>
      </div>
  
      <div class="form-group">
        <label for="gender">성별</label>
        <select class="form-control" id="gender" formControlName="gender">
          <option value="" disabled>성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
        <div *ngIf="userForm?.get('gender')?.invalid && userForm?.get('gender')?.touched" class="text-danger">
          성별을 선택해주세요.
        </div>
      </div>
  
      <button type="submit" class="btn btn-primary">제출</button>
    </form>
  </div>
```



```js
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  userForm: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(50)]],
      gender: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.userForm?.valid) {
      console.log('Form data:', this.userForm.value);
    }
  }
}
```

![FormsinAngular_2](/assets/img/2024-05-14-FormsinAngular_2.png)

# GitHub




https://github.com/Jaydeep-007/angular-forms

# 결론

이 글에서는 Angular에서 사용할 수 있는 양식의 기본 개념과 단계별 구현 방법, 다양한 유효성 검사기와 속성을 통해 다양한 유형의 양식을 살펴보았습니다.