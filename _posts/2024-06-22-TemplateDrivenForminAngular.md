---
title: "2024년 최신 Angular에서 템플릿 기반 폼을 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-TemplateDrivenForminAngular_0.png"
date: 2024-06-22 03:32
ogImage: 
  url: /assets/img/2024-06-22-TemplateDrivenForminAngular_0.png
tag: Tech
originalTitle: "Template Driven Form in Angular"
link: "https://medium.com/@zeeshankhan8838/template-driven-form-in-angular-b80a3ebbcd24"
---


이 기사에서는 템플릿 폼과 언제 템플릿 드리븐 폼을 사용해야 하는지에 대해 안내하겠습니다.

현실적인 예로 병원을 방문할 때 종이를 받아서 기본 정보를 적어야 하는 상황이나 학교 입학 신청서를 작성해야 하는 상황이 있습니다. 이 정보들은 소프트웨어에 업로드됩니다. 따라서 폼은 본질적으로 정보를 수집하는 종이라고 할 수 있습니다. 기술적 관점에서 Angular는 템플릿 드리븐 폼을 제공하여 사물에 대한 정보를 수집하게 됩니다.

참고: Angular에서 폼을 사용하는 경우에는 AppModule에서 FormModule을 반드시 import해야 합니다.

# 템플릿 드리븐 폼

<div class="content-ad"></div>

- 사용하기 쉽습니다
- 간단한 시나리오에 적합합니다.
- 복잡한 시나리오에는 권장하지 않습니다.
- 구문은 이전 버전의 AngularJS와 유사합니다.
- 템플릿 기반 폼에 사용되는 구문은 양방향 데이터 바인딩 [(NgModel)]로, 최소한의 컴포넌트 코드를 사용합니다.
- 폼 및 데이터의 자동 추적(앵귤러에서 처리)
- 템플릿 유효성 검사는 지시어를 통해 검증됩니다.
- 템플릿 기반 폼의 단위 테스트는 값 변경과 유효성 검사가 비동기적이라는 문제가 있습니다.
- 데이터 모델은 구조적이지 않습니다.
- 템플릿 폼에서의 예측 가능성은 비동기적입니다.
- 폼 유효성 검사는 필드에 보다 많은 유효성 검사 태그를 추가하거나 복잡한 교차 필드 유효성 검사를 추가할수록 폼의 가독성이 떨어집니다.

# 언제 템플릿 기반 폼을 사용해야 하는가:

로그인과 같이 기본적이고 간단한 요구사항을 갖는 앱에서는 템플릿 기반 폼을 사용해야 합니다.

예제 템플릿 기반 폼

<div class="content-ad"></div>

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';        // FormsModule 가져오기
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule                    // Imports 배열에 추가
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```js
<form #SingUpForm="ngForm">

// 템플릿에서 변수를 생성합니다. 앵귤러에서는 이를 템플릿 참조 변수라고 합니다
```

# ngForm이란 무엇인가요?

ngForm은 다음을 실행합니다:


<div class="content-ad"></div>

- `Form` 지시문에 자체 바인딩
- 최상위 FormGroup 인스턴스 생성
- ngModel 지시문이있는 각 자식 컨트롤에 대해 FormControl 인스턴스 생성
- NgModelGroup 지시문에 대해 각각 FormGroup 인스턴스를 생성

# 템플릿 기반의 FormControl 인스턴스

이들은 firstName, lastName 및 다른 필드입니다. 이들을 formControl 인스턴스에 바인딩해야 합니다. 이는 ngModel 지시문을 사용하여 수행합니다.

```js
<input type="text" name="firstname" ngModel>
```

<div class="content-ad"></div>


파일을 다음과 같이 수정해주세요. 


<form #singUpForm="ngForm" (ngSubmit)="onSubmit(singUpForm)">
 
  <p>
    <label for="firstname">이름</label>
    <input type="text" name="firstname" ngModel>
  </p>
 
  <p>
    <label for="lastname">성</label>
    <input type="text" name="lastname" ngModel>
  </p>
 
  <p>
    <label for="email">이메일</label>
    <input type="text" id="email" name="email" ngModel>
  </p>
 
  <p>
    <label for="gender">성별</label>
    <input type="radio" value="male" name="gender" ngModel> 남성
    <input type="radio" value="female" name="gender" ngModel> 여성
  </p>
 
  <p>
    <label for="isMarried">결혼 여부</label>
    <input type="checkbox" name="isMarried" ngModel>
  </p>
 
  <select name="country" ngModel>
    <option [ngValue]="c.id" *ngFor="let c of countryList">
      {c.name}
    </option>
  </select>
 
  <p>
    <button type="submit">제출</button>
  </p>
  
</form>


```typescript
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '템플릿 기반 폼';
 
  countryList:country[] = [
    new country("1", "파키스탄"),
    new country('2', '아랍에미리트'),
    new country('3', '미국')
  ];
}
 
export class country {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }

 onSubmit(contactForm) {
    console.log(contactForm.value);
  }
}
```

# 내장 검증기

내장 검증기는 필수(required), 최소 길이(minlength), 최대 길이(maxlength), 패턴(pattern)과 같은 HTML5 유효성 검사 속성을 사용합니다. Angular는 이러한 유효성 검사 속성을 해석하고, FormControl 인스턴스에 유효성 검사기 함수를 추가합니다.


<div class="content-ad"></div>

# 필수 유효성 검사

필수 유효성 검사는 양식 컨트롤에 비어있지 않은 값이 입력된 경우에만 true를 반환합니다.

# 최소길이 유효성 검사

이 유효성 검사기는 컨트롤 값이 유효성 검사기에 지정된 값보다 적은 수의 문자를 가져서는 안 된다는 것을 요구합니다.

<div class="content-ad"></div>

예를 들어, minlength validator는 사용자 이름 값이 적어도 20자여야 함을 보장합니다.

```js
<input type="text" id="userName" name="userName" required minlength="20">
```

# Maxlength Validation

이 Validator는 문자 수가 속성 값 이상으로 초과되지 않아야 함을 요구합니다.

<div class="content-ad"></div>

예를 들어, maxlength 검증기는 사용자 이름 값이 최대 20자까지인지 확인합니다.

```js
<input type="text" id="userName" name="userName" required maxlength="20">
```

# 패턴 유효성 검사

이 유효성 검사기는 컨트롤 값이 속성에 제공된 정규식 패턴과 일치해야 함을 요구합니다. 예를 들어, 패턴 ^[a-zA-Z]+$는 문자만 허용됨을 보장합니다 (공백도 허용되지 않음). 이 패턴을 사용자 이름에 적용해 보겠습니다.

<div class="content-ad"></div>


# 이메일 유효성 검사

이 유효성 검사기는 제어 값이 유효한 이메일 주소여야 함을 요구합니다.

```js
<input type="text" id="email" name="email" required email>
```

<div class="content-ad"></div>

# 유효성 스타일링

모델 기반 폼과 유사하게, 우리는 각 모델 폼 컨트롤의 상태에 접근할 수 있습니다. 이를 위해서는 최상위 폼 그룹을 통해 이동해야 합니다.

ngForm 지시자는 최상위 FormGroup를 form 속성을 통해 제공하므로, 이메일 필드의 유효성, 수정 여부, 터치 여부를 다음과 같이 표시할 수 있습니다:

```js
<pre>유효함? {f.form.controls.email?.valid}</pre>
<pre>수정됨? {f.form.controls.email?.dirty}</pre>
<pre>터치됨? {f.form.controls.email?.touched}</pre>
```

<div class="content-ad"></div>

# 엘비스 연산자

? 기호를 엘비스 연산자라고 합니다. 만약 ? 왼쪽에 위치한 속성이 null이 아닌 경우에만 ? 오른쪽에 속성을 호출하려고 시도합니다. 템플릿 기반 형식에서 Angular이 페이지를 빌드할 때 컨트롤이 가끔 null 일 수 있으므로 안전을 위해 엘비스 연산자를 사용합니다.

```js
<pre>Valid? {f.form.controls.email?.valid}</pre>
```

# 폼 초기화

<div class="content-ad"></div>

```js
<form (ngSubmit)="onSubmit()" #myForm="ngForm">
```

```js
@ViewChild('myForm') form: any;

onSubmit() {
  if (this.form.valid) {
    console.log("Form Submitted!");
    this.form.reset();
  }
}
```

## NgModelGroup 지시자

ngModelGroup 지시자를 사용하면 관련 있는 입력을 그룹화하여 폼에 의해 표현되는 객체를 유용하고 예측 가능한 방식으로 구조화할 수 있습니다. ngModelGroup는 주로 fieldset과 결합하여 사용되는데, 이들은 대부분 "입력을 그룹화함"이라는 같은 아이디어를 나타냅니다.

<div class="content-ad"></div>

```js
import {Component, ViewChild} from "@angular/core";
@Component({
    selector: 'app',
    template: `
<form 
    #formRef="ngForm" 
    (ngSubmit)="onSubmit(formRef.value)"
    >
    <fieldset ngModelGroup="login">
        <input 
            #usernameRef="ngModel"
            name="username"
            [(ngModel)]="username"
            type="text"        
            required
            minlength="3"
        >    
        <div *ngIf="usernameRef.errors?.required">This field is required</div>
        <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {usernameRef.errors?.minlength.requiredLength} characters. You only typed {usernameRef.errors?.minlength.actualLength}</div>
        
        <input type="password" ngModel name="password">
    </fieldset>
    <button type="submit">Submit</button>
</form> 
{formRef.value | json}   
{formRef.valid | json}   

``` 

# 출력

```js
{ "login": { "username": "Zeeshan", "password": "" } } true
```

```js
import {Component, ViewChild} from "@angular/core";
@Component({
    selector: 'app',
    template: `
<form 
    #formRef="ngForm" 
    (ngSubmit)="onSubmit(formRef.value)"
    >
    <fieldset ngModelGroup="login">
        <input 
            #usernameRef="ngModel"
            name="username"
            [(ngModel)]="username"
            type="text"        
            required
            minlength="3"
        >    
        <div *ngIf="usernameRef.errors?.required">This field is required</div>
        <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {usernameRef.errors?.minlength.requiredLength} characters. You only typed {usernameRef.errors?.minlength.actualLength}</div>
        
        <input type="password" ngModel name="password">
    </fieldset>
     <fieldset ngModelGroup="signUp">
        <input 
            #usernameRef="ngModel"
            name="username"
            [(ngModel)]="username"
            type="text"        
            required
            minlength="3"
        >    
        <div *ngIf="usernameRef.errors?.required">This field is required</div>
        <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {usernameRef.errors?.minlength.requiredLength} characters. You only typed {usernameRef.errors?.minlength.actualLength}</div>
        
        <input type="password" ngModel name="password">
    </fieldset>
    
    <button type="submit">Submit</button>
</form> 
{formRef.value | json}   
{formRef.valid | json}   

```


<div class="content-ad"></div>

# 결과

```js
{ "login": { "username": "Zeeshan", "password": "" },
  "signUp": { "username": "Zeeshan", "password": "" } } true
```

# 유효성 검사/오류 메시지 표시

Angular은 각 필드에 적용된 ngModel 지시문을 갖는 각각의 필드에 대해 FormControl을 생성합니다. FormControl은 유효(valid), 변경된(dirty), 터치(touched) 등과 같은 폼 요소의 상태를 노출합니다.

<div class="content-ad"></div>

FormControl에 대한 참조를 얻는 두 가지 방법이 있습니다.

- 하나는 contactForm 변수를 사용하는 방법입니다. myForm.controls.firstname.valid를 사용하여 firstname이 유효한지 확인할 수 있습니다.
- 다른 방법은 각 FormControl을 위해 새로운 로컬 변수를 만드는 것입니다. 예를 들어 다음과 같이 firstname="ngModel"을 생성하면 firstname 변수에 FormControl 인스턴스가 만들어집니다.

```js
<input type="text" id="firstname" name="firstname" required minlength="10" 
            #firstname="ngModel">
```

이제 firstname FormControl 인스턴스에 대한 참조가 있으므로 해당 상태를 확인할 수 있습니다. firstname에 오류가 있는지 확인하기 위해 valid 속성을 사용합니다.

<div class="content-ad"></div>

```js

<div *ngIf="!firstname?.valid && (firstname?.dirty || firstname?.touched)">
Invalid First Name
</div>
```

# 결론

우리는 템플릿 주도형 폼이 여전히 모델 주도형 폼과 동일한 클래스를 사용하지만 템플릿 주도 접근 방식에서는 모델이 명시적으로 컴포넌트에서 생성되는 것이 아니라 템플릿에서 디렉티브에 의해 생성된다는 것을 배웠습니다.