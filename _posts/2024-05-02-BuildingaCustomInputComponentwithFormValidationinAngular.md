---
title: "Angular에서 폼 유효성을 갖춘 인풋 요소 만들기"
description: ""
coverImage: "/assets/img/2024-05-02-BuildingaCustomInputComponentwithFormValidationinAngular_0.png"
date: 2024-05-02 00:18
ogImage: 
  url: /assets/img/2024-05-02-BuildingaCustomInputComponentwithFormValidationinAngular_0.png
tag: Tech
originalTitle: "Building a Custom Input Component with Form Validation in Angular"
link: "https://medium.com/@hish.abdelshafouk/building-a-custom-input-component-with-form-validation-in-angular-fa3f93d5363e"
isUpdated: true
---




<img src="/assets/img/2024-05-02-BuildingaCustomInputComponentwithFormValidationinAngular_0.png" />

현대 웹 개발에서 재사용 가능하고 유효성이 검증된 폼 컴포넌트를 만드는 것은 매우 중요합니다. Angular를 탐험하는 이 과정에서 여러 입력 유형을 처리하고 Angular 애플리케이션 내에서 신속하게 폼 유효성을 검증하는 다목적 Custom Input Component를 만들었습니다.

# 1. Angular 프로젝트 설정하기:

새로운 Angular 프로젝트 생성하기:

<div class="content-ad"></div>

```js
ng new custom-input-project
```

커스텀 입력 컴포넌트 생성:

```js
ng generate component custom-input
```

## 디렉토리 구조:

<div class="content-ad"></div>

```js
사용자 정의 입력 프로젝트/
├── src/
│ ├── app/
│ │ ├── custom-input/
│ │ │ ├── custom-input.component.html
│ │ │ ├── custom-input.component.css
│ │ │ ├── custom-input.component.spec.ts
│ │ │ └── custom-input.component.ts
│ │ ├── app.component.html
│ │ ├── app.component.css
│ │ ├── app.component.spec.ts
│ │ └── app.component.ts
│ │ ├── app.module.ts
│ │ └── …
│ └── …
└── …
```

# 2. 커스텀 입력 컴포넌트 생성하기:

CustomInputComponent는 입력 필드를 캡슐화하고 다양한 입력 유형을 처리하며 Angular의 FormControl 및 Validators를 사용하여 기본 양식 유효성을 구현할 것입니다.

## 컴포넌트 구조(custom-input.component.ts):

<div class="content-ad"></div>

The CustomInputComponent TypeScript file (custom-input.component.ts):

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter<string>();

  control: FormControl = new FormControl('', Validators.required);

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
  }
}
```

Component Template (custom-input.component.html):

The CustomInputComponent HTML template (custom-input.component.html):

<div class="content-ad"></div>

```js
<div class="form-group">
  <label>{ label }</label>
  <input
    [type]="type"
    class="form-control"
    [formControl]="control"
    [attr.placeholder]="label"
  />
  <div *ngIf="control.invalid && control.touched" class="text-danger">
    This field is required.
  </div>
</div>
```

## 설명:

- CustomInputComponent TypeScript 파일은 컴포넌트의 논리를 정의합니다.
- @Input을 사용하여 label 및 type 속성을 받아들이고, @Output을 사용하여 값 변경을 발생시킵니다.
- FormControl은 기본 유효성 검사를 포함한 폼 처리에 활용됩니다 (이 경우, 필수 필드).
- 템플릿은 입력 필드를 렌더링하고 필수 필드에 대한 유효성 검사 메시지를 표시합니다.
- 컴포넌트 스타일은 UI 조정에 필요한 대로 사용자 정의할 수 있습니다.

# 3. 폼에서 사용자 정의 입력 구현하기:

<div class="content-ad"></div>

사용자 지정 입력 구성 요소를 반응형 양식 내에서 통합하는 것은 Angular 양식 환경 내에서의 기능을 보여줍니다.

컴포넌트의 상위 (app.component.ts):

```js
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
}
```

상위 컴포넌트의 템플릿 (app.component.html):

<div class="content-ad"></div>

```js
<form [formGroup]="form">
  <app-custom-input
    label="이름 입력"
    [type]="'text'"
    formControlName="name"
  ></app-custom-input>
</form>
```

## 설명:

- AppComponent는 FormBuilder를 사용하여 form group 및 input 필드에 대한 form control을 생성합니다.
- 상위 컴포넌트 템플릿(app.component.html)에서 CustomInputComponent가 form 내부에서 사용되고 formControlName을 사용하여 form control에 바인딩됩니다.
- label 및 input type은 CustomInputComponent의 @Input 속성으로 지정됩니다.
- CustomInputComponent 내의 input 필드는 이제 Angular 반응형 폼 내에서 작동하며 유효성 검증을 위해 form control 속성을 활용합니다.

# 4. Custom Input Component 테스트하기:

<div class="content-ad"></div>

사용자 지정 입력 구성 요소의 유효성 및 기능을 서로 다른 입력 유형 및 유효성 검사 시나리오에 걸쳐 검증하고 테스트하는 것이 중요합니다.

구성 요소 테스트 (custom-input.component.spec.ts):

```js
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('should validate required field', () => {
    const control = formBuilder.control('', { required: true });
    const form = formBuilder.group({ testInput: control });

    component.control = control;
    fixture.detectChanges();

    expect(form.valid).toBeFalsy();

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Test Value';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
  });

  it('should render the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('Test Label');
  });

  // 다양한 입력 유형, 유효성 검사 및 동작에 대한 더 구체적인 테스트 추가
});
```

## 설명:

<div class="content-ad"></div>

- CustomInputComponent의 테스트 스위트에는 입력 컴포넌트의 다양한 측면을 검증하는 여러 테스트가 포함되어 있습니다.
- 첫 번째 테스트는 CustomInputComponent의 성공적인 생성을 확인합니다.
- 두 번째 테스트는 입력 필드가 컴포넌트 내에 표시되는지 확인합니다.
- 세 번째 테스트는 필수 필드 기능을 확인합니다. 폼 컨트롤을 생성하고 컴포넌트에 할당하며 사용자 입력을 시뮬레이트하여 필드의 유효성을 확인합니다.
- 네 번째 테스트는 컴포넌트 내에 레이블이 렌더링되는지 확인합니다.

# 결론:

Angular의 기능을 통해 유연성과 신뢰성에 뛰어난 Custom Input Component를 구축했습니다. 시작부터 철저한 테스트까지, Angular 애플리케이션 내에서 폼 상호 작용을 증진시키는 재사용 가능한 컴포넌트를 만드는 과정을 탐험했습니다. 이 여정은 다양하고 검증된 입력 필드를 통해 사용자 중심 경험을 만드는 길을 열어줍니다.