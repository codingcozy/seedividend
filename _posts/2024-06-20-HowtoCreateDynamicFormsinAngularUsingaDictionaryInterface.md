---
title: "앵귤러에서 사전 인터페이스를 활용하여 동적 폼 생성하기"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoCreateDynamicFormsinAngularUsingaDictionaryInterface_0.png"
date: 2024-06-20 02:35
ogImage: 
  url: /assets/img/2024-06-20-HowtoCreateDynamicFormsinAngularUsingaDictionaryInterface_0.png
tag: Tech
originalTitle: "How to Create Dynamic Forms in Angular Using a Dictionary Interface"
link: "https://medium.com/stackademic/how-to-create-dynamic-forms-in-angular-using-a-dictionary-interface-36aac956fa86"
---



![이미지](/assets/img/2024-06-20-HowtoCreateDynamicFormsinAngularUsingaDictionaryInterface_0.png)

앵귤러에서 동적 폼을 생성하면 유연한 데이터 구조를 처리하는 강력한 방법이 될 수 있습니다. 특히 복잡하거나 중첩된 JSON 객체를 반환하는 API와 작업할 때 유용합니다. 이 기사에서는 Dictionary 인터페이스와 동적 폼 생성기 서비스를 사용하여 앵귤러에서 동적 폼을 생성하는 방법을 보여드리겠습니다.

## Dictionary 인터페이스 정의하기

먼저 Dictionary 인터페이스를 정의해봅시다. 이 인터페이스를 사용하면 문자열 또는 중첩된 사전을 포함할 수 있는 재귀 형식을 사용할 수 있습니다.


<div class="content-ad"></div>

```js
export interface Dictionary {
  [key: string]: string | Dictionary;
}
```

## 동적 폼 생성기 서비스 만들기

다음으로, 딕셔너리의 구조에 기반하여 폼 컨트롤을 생성할 수 있는 서비스가 필요합니다. 이 서비스는 중첩된 딕셔너리에 대해 재귀적으로 폼 그룹을 생성하고 문자열 값에 대해 폼 컨트롤을 만들 것입니다.

다음은 DynamicFormGeneratorService입니다:

<div class="content-ad"></div>

```ts
@Injectable({
  providedIn: 'root',
})
export class DynamicFormGeneratorService {
  #fb = inject(FormBuilder);

  createForm(data: Dictionary): FormGroup {
    const formControls = this.createControls(data);
    return this.#fb.group(formControls);
  }

  private createControls(data: Dictionary): { [key: string]: AbstractControl } {
    return Object.keys(data).reduce((controls, key) => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        controls[key] = this.#fb.group(this.createControls(data[key] as Dictionary));
      } else {
        controls[key] = new FormControl(data[key] as string, Validators.required);
      }
      return controls;
    }, {} as { [key: string]: AbstractControl });
  }
}
```

## 동적 폼 그룹 컴포넌트 생성

이제, 이 서비스를 사용하여 사전 데이터를 기반으로 폼을 생성하는 컴포넌트를 생성해 봅시다. 이 컴포넌트는 폼을 랜더링하고 폼 제출을 처리하는 역할을 담당할 것입니다.

다음은 DynamicFormGroupComponent의 TypeScript 코드입니다:


<div class="content-ad"></div>

```js
@Component({
  selector: 'app-dynamic-form-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form-group.component.html',
})
export class DynamicFormGroupComponent implements OnInit {
  @Output() formValues = new EventEmitter<Dictionary>();
  @Input() initialData?: Dictionary;
  @Input() formGroup: FormGroup = new FormGroup({});

  #dynamicFormService = inject(DynamicFormGeneratorService);
  objectKeys = Object.keys;

  ngOnInit(): void {
    if (this.initialData) {
      this.formGroup = this.#dynamicFormService.createForm(this.initialData);
    }
  }

  onSubmit(): void {
    if (!this.initialData || this.formGroup.invalid) return;
    this.formValues.emit(this.formGroup.value);
  }

  isGroup(control: AbstractControl | null): control is FormGroup {
    return control instanceof FormGroup;
  }

  getFormGroup(control: AbstractControl | null): FormGroup {
    return control as FormGroup;
  }
}
```

그리고 해당하는 HTML 템플릿:

```js
<form
  [formGroup]="formGroup"
  class="p-6 bg-indigo-50 border border-red-200 rounded-lg shadow-sm space-y-4"
>
  <!-- 이 루프는 formGroup.controls 객체의 키를 반복합니다. -->
  <!-- 각 키는 폼 컨트롤이나 중첩된 폼 그룹을 나타냅니다. -->
  <ng-container *ngFor="let key of objectKeys(formGroup.controls)">
    <!-- 현재 폼 컨트롤이 FormGroup인지 확인하는 조건문입니다. -->
    <ng-container *ngIf="isGroup(formGroup.get(key)); else singleControl">
      <!-- 그것이 FormGroup이면, 해당하는 필드셋이 생성됩니다. -->
      <fieldset
        [formGroupName]="key"
        class="border border-gray-300 rounded-lg p-4 bg-white"
      >
        <legend class="text-lg font-semibold text-gray-700 mb-2">{ key }</legend>

        <!-- 중첩된 FormGroup은 formGroup 입력 프로퍼티를 사용하여 컴포넌트에 전달됩니다. -->
        <app-dynamic-form-group
          [formGroup]="getFormGroup(formGroup.get(key))"
        ></app-dynamic-form-group>
      </fieldset>
    </ng-container>
    <ng-template #singleControl>
      <!-- 현재 폼 컨트롤이 FormGroup가 아닌 경우, 해당하는 입력 필드가 생성됩니다. -->
      <!-- formControlName 지시문은 이 입력 필드를 해당 폼 컨트롤과 연결합니다. -->
      <div class="flex flex-col space-y-2">
        <label [for]="key" class="text-sm font-medium text-gray-600">{ key }</label>
        <input
          [formControlName]="key"
          id="{ key }"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </ng-template>
  </ng-container>

  <!-- initialData가 있는지 확인하고 있으면 제출 버튼을 추가합니다. -->
  <button
    *ngIf="initialData"
    (click)="onSubmit()"
    [disabled]="formGroup.invalid"
    class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    제출
  </button>
</form>
```

# 모두 함께 넣어보기


<div class="content-ad"></div>

이 동적 양식을 애플리케이션에서 사용하려면 일반적으로 사전 데이터를 제공하고 양식 제출을 처리하는 부모 구성 요소가 있는 것이 일반적입니다:

```js
export class AppComponent {
  title = 'dynamic-forms';

  onFormValues(values: Dictionary) {
    console.table(values);
  }

  contract: Dictionary = {
    contractId: 'C12345',
    contractType: 'Employment',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    employer: {
      name: 'Tech Corp Inc.',
      address: '456 Technology Drive, Silicon Valley, USA',
      contact: {
        phone: '555-1234',
        email: 'hr@techcorp.com',
      },
    },

    jobDetails: {
      jobTitle: 'Senior Developer',
      jobDescription:
        'Responsible for developing and maintaining web applications.',
      salary: '75000',
      benefits: 'Health, Dental, Vision',
    },
  };
}
```

# 미리보기

<img src="/assets/img/2024-06-20-HowtoCreateDynamicFormsinAngularUsingaDictionaryInterface_1.png" />

<div class="content-ad"></div>

# 결론

이 기사에서는 Angular를 사용하여 사전 인터페이스를 활용해 동적 양식을 생성하는 방법을 보여드렸습니다. Angular의 반응형 폼과 재귀적 접근을 활용하여 복잡한 형식을 생성하고 모든 데이터 구조에 적응할 수 있습니다. 이 방법은 특히 API에서 동적 데이터를 처리하고 유연한 폼 구성 요소를 생성하는 데 유용합니다.

더 많은 Angular 팁과 트릭을 기대해 주세요! 👨‍💻

이 기사를 즐겼고 연결하고 싶다면 LinkedIn에서 저를 팔로우해 주세요.

<div class="content-ad"></div>

# 스택데미크 🎓

끝까지 읽어주셔서 감사합니다. 떠나시기 전에:

- 작가를 클랩하고 팔로우해주시면 감사하겠습니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문하기: In Plain English | CoFeed | Differ
- 스택데미크 닷컴에서 더 많은 컨텐츠 확인하기