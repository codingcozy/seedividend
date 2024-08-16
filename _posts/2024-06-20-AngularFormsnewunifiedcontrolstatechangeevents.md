---
title: "Angular 폼의 새로운 통합된 컨트롤 상태 변경 이벤트"
description: ""
coverImage: "/assets/img/2024-06-20-AngularFormsnewunifiedcontrolstatechangeevents_0.png"
date: 2024-06-20 00:32
ogImage: 
  url: /assets/img/2024-06-20-AngularFormsnewunifiedcontrolstatechangeevents_0.png
tag: Tech
originalTitle: "Angular Forms new unified control state change events"
link: "https://medium.com/@davidepassafaro/angular-forms-new-unified-control-state-change-events-9e8e361c4777"
isUpdated: true
---




Angular v18의 릴리스는 프레임워크에 흥미로운 새로운 기능과 개선 사항을 도입했습니다.

그 중 하나의 기능은 특히 유망하며, Angular Forms 라이브러리 내에서 새로운 기능을 소개하여 AbstractControl 클래스를 통해 통합된 컨트롤 상태 변경 이벤트를 향상시킵니다.

내 글에서는 주제에 집중하기 전에 기본 사항을 먼저 검토하는 것이 관습입니다. 이는 다가오는 내용을 더 잘 이해하도록 도와줄 것입니다.

# Angular 반응형 Forms: 기본 사항

<div class="content-ad"></div>

앵귤러 반응형 폼은 양식 입력을 처리하는 모델 중심 접근 방식을 제공하며, 데이터 모델에 대한 동기식 액세스, 입력 유효성 검사 및 변경 추적을 위한 강력한 도구를 Observables를 통해 제공합니다.

반응형 폼 데이터 모델은 다음 클래스를 사용하여 구성됩니다:

- FormControl: 단일 입력 양식을 나타냅니다. 값은 기본 유형입니다.
- FormGroup: FormControl 그룹을 나타냅니다. 값은 객체입니다.
- FormArray: FormControl 목록을 나타냅니다. 값은 배열입니다.

FormGroup으로 나타낼 수 있는 폼의 일반적인 예시는 다음과 같습니다:

<div class="content-ad"></div>

```js
import { FormGroup, FormControl, FormArray } from '@angular/forms';

const articleForm = new FormGroup({
  title: new FormControl(''),
  content: new FormControl(''),
  tags: new FormArray([])
});
```

이 모든 클래스들은 여기서는 컨트롤이라고만 부르겠습니다. 이 컨트롤들은 AbstractControl 클래스에서 파생되었기 때문에 공통 속성과 메소드를 공유합니다.

## 템플릿 바인딩

Angular Reactive Forms 모델 기반 접근 방식은 라이브러리 자체에서 제공하는 다양한 디렉티브에 의해 지원되며, 이는 폼 컨트롤을 HTML 요소와 쉽게 통합할 수 있도록 합니다. 

<div class="content-ad"></div>

다음의 FormGroup을 예시로 삼아보겠습니다:

```js
this.articleForm = new FormGroup({
  author: new FormGroup({
    name: new FormControl(''),
  }),
  tags: new FormArray([ new FormControl('Angular') ]),
});
```

제공된 지시문을 사용하여 템플릿에 쉽게 바인딩할 수 있습니다:

```js
<form [formGroup]="articleForm">
  <div formGroupName="author">
    <input formControlName="name" />
  </div>

  <div formArrayName="tags">
    <div *ngFor="let tag of tags.controls; index as i">
      <input [formControlName]="i" />
    </div>
  </div>
</form>
```

<div class="content-ad"></div>

잊지 말아야 할 중요한 점은, 지나치게 깊게 파고들지 않으면서도 필요한 내용은, FormGroupDirective를 사용하여 쉽게 폼을 재설정하는 버튼과 해당 값을 제출하는 버튼을 만들 수 있다는 것입니다:

```js
<form [formGroup]="articleForm">
  <!-- 폼 템플릿 -->

  <button type="reset">지우기</button>
  <button type="submit">저장</button>
</form>
```

FormGroupDirective는 이러한 버튼에서 발생하는 클릭 이벤트를 가로채어 컨트롤의 reset() 함수를 트리거하고, 컨트롤을 초기 값으로 재설정하며 directive의 ngSubmit 출력 이벤트를 트리거합니다.

## 값 변경 감시

<div class="content-ad"></div>

특정 작업을 수행하기 위해 값을 변경하는 것을 듣기 위해, 추적하려는 컨트롤의 valueChanges observable에 구독할 수 있습니다:

```js
myControl.valueChanges.subscribe(value => {
  console.log('새 값:', value)
});
```

## 비활성화된 컨트롤

각 컨트롤은 비활성화로 설정되어 사용자가 값을 편집하는 것을 방지할 수 있습니다. 이는 HTML 비활성화 속성(Disabled attribute)의 동작을 모방합니다.

<div class="content-ad"></div>

이를 수행하기 위해서는 컨트롤을 비활성화하는 방법으로 사용할 수도 있고, disable()와 enable() 함수를 사용하여 이 상태를 전환할 수도 있습니다:

```js
import { FormControl } from '@angular/forms';

const myControl = new FormControl({ value: '', disabled: true });
console.log(myControl.disabled, myControl.enabled) // true, false

myControl.enable();
console.log(myControl.disabled, myControl.enabled) // false, true

myControl.disable();
console.log(myControl.disabled, myControl.enabled) // true, false
```

위 예제에서 보듯이 AbstractControl 클래스는 이 상태를 설명하기 위해 disabled와 enabled라는 두 가지 전용 속성을 제공합니다.

## Validators

<div class="content-ad"></div>

특정 규칙을 강제하고 컨트롤이 특정 기준을 충족하는지 확인하려면 일부 유효성 검사 규칙 또는 유효성 검증기를 지정할 수도 있습니다.

유효성 검증기는 동기식일 수도 있고(@required 또는 @minLength와 같은), 외부 리소스에 의존하는 유효성 검사를 처리하는 비동기식일 수도 있습니다.

```js
import { FormControl, Validators } from '@angular/forms';
import { MyCustomAsyncValidators } from './my-custom-async-validators.ts';

const myFormControl = new FormControl('', {
  validators: [ Validators.required, Validators.minLength(3) ],
  asyncValidators: [ MyCustomAsyncValidators.validate ]
});
```

이러한 규칙을 기반으로 AbstractControl 클래스는 유효성 상태를 설명하는 몇 가지 속성도 제공합니다.

<div class="content-ad"></div>

- valid: 제어 값이 모든 유효성 검사 테스트를 통과했는지 여부를 나타내는 부울 값입니다;
- invalid: 제어 값이 모든 유효성 검사 테스트를 통과하지 못했는지 여부를 나타내는 부울 값입니다; valid 속성의 반대입니다;
- pending: 제어 값이 유효성 검사를 수행 중인지 여부를 나타내는 부울 값입니다.

## FormControlStatus

비활성 상태와 유효성 상태는 서로 연결되어 있습니다.
사실, 이들은 다음과 같이 유형이 지정된 상태 속성으로 파생됩니다:

```js
type FormControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
```

<div class="content-ad"></div>

## 원형과 접촉됨

AbstractControl 클래스는 사용자가 양식과 상호 작용한 방식을 설명하는 여러 속성도 제공합니다:

- pristine: 컨트롤이 원형 상태인지 여부를 나타내는 부울 값으로, 즉 아직 수정되지 않은 상태임을 의미합니다;
- dirty: 컨트롤이 수정되었는지 여부를 나타내는 부울 값입니다;
- untouched: 컨트롤이 아직 터치되지 않았는지 여부를 나타내는 부울 값으로, 즉 아직 상호 작용되지 않았음을 의미합니다;
- touched: 컨트롤이 터치되었는지 여부를 나타내는 부울 값입니다.

Angular 반응형 폼의 기본 사항 중 일부를 다시 살펴보았으니, 이제 이 글의 주제를 소개할 때입니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-06-20-AngularFormsnewunifiedcontrolstatechangeevents_0.png)

# 새로운 통합 제어 상태 변경 이벤트

Angular v18부터 AbstractControl 클래스는 이제 모든 제어 상태 변경 이벤트를 추적하기 위한 새로운 이벤트 observable을 노출합니다.

이를 통해 이제 PristineEvent, ValueChangeEvent, StatusEvent 및 TouchedEvent 이벤트를 통해 FormControl, FormGroup 및 FormArray 클래스를 모니터링할 수 있습니다.


<div class="content-ad"></div>

```js
myControl.events
  .pipe(filter((event) => event instanceof PristineChangeEvent))
  .subscribe((event) => console.log('Pristine:', event.pristine));

myControl.events
  .pipe(filter((event) => event instanceof ValueChangeEvent))
  .subscribe((event) => console.log('Value:', event.value));

myControl.events
  .pipe(filter((event) => event instanceof StatusChangeEvent))
  .subscribe((event) => console.log('Status:', event.status));

myControl.events
  .pipe(filter((event) => event instanceof TouchedChangeEvent))
  .subscribe((event) => console.log('Touched:', event.touched));
```

이러한 기능들은 매우 강력합니다. 특히 valueChange를 제외하고는 이전에 상태 변경을 제대로 추적하기가 어려웠습니다.

게다가 FormGroup 클래스는 events observable을 통해 FormSubmittedEvent와 FormResetEvent 두 가지 추가 이벤트를 발생시킬 수도 있습니다.

```js
myControl.events
  .pipe(filter((event) => event instanceof FormSubmittedEvent))
  .subscribe((event) => console.log('Submit:', event));

myControl.events
  .pipe(filter((event) => event instanceof FormResetEvent))
  .subscribe((event) => console.log('Reset:', event));
```

<div class="content-ad"></div>

FormSubmittedEvent와 FormResetEvent는 모두 FormGroupDirective에서 상속되며 실제로 지시자 자체에서만 발생됩니다.

## 추가 정보

이 새로운 추가로, 다음 AbstractControl 메소드들은 emitEvent 매개변수를 지원하도록 업데이트되었습니다:

- markAsPristine(): 컨트롤을 pristine으로 표시;
- markAsDirty(): 컨트롤을 dirty로 표시;
- markAsTouched(): 컨트롤을 touched로 표시;
- markAsUntouched(): 컨트롤을 untouched로 표시;
- markAllAsTouched(): 컨트롤과 하위 요소를 모두 touched 상태로 표시합니다.

<div class="content-ad"></div>

# 지금까지 읽어 주셔서 감사합니다 🙏

피드백을 받고 싶어요. 댓글을 남겨주시거나 클랩을 눌러주세요. 👏 

그리고 만약에 정말 좋았다면, 당신의 커뮤니티, 기술 브라더들, 누구든지 공유해주세요. 그리고 리링크드인 팔로우도 잊지 말아주세요. 👋😁