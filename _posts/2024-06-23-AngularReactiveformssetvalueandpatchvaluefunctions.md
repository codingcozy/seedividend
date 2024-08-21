---
title: "Angular Reactive Forms setValue와 patchValue 함수 사용 방법"
description: ""
coverImage: "/assets/img/2024-06-23-AngularReactiveformssetvalueandpatchvaluefunctions_0.png"
date: 2024-06-23 14:08
ogImage:
  url: /assets/img/2024-06-23-AngularReactiveformssetvalueandpatchvaluefunctions_0.png
tag: Tech
originalTitle: "Angular Reactive forms: set value and patch value functions"
link: "https://medium.com/@bhagirathsinhmakwana2001/angular-reactive-forms-set-value-and-patch-value-functions-c123705562f4"
isUpdated: true
---

setValue() 및 patchValue() 함수는 Angular에서 반응형 폼 컨트롤을 채우는 데 사용됩니다. 두 함수의 사용 사례가 다릅니다.

다음의 반응형 폼 예제와 함께 두 함수가 동작하는 방식을 이해해보겠습니다.

```js
myForm: FormGroup;

constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.myForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
}
```

- setValue() 함수

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

setValue() 함수는 반응형 폼 컨트롤의 값을 설정하는 데 사용됩니다.

```js
  setValueExample() {
    this.myForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
  }
```

setValue() 함수는 폼의 모든 컨트롤을 업데이트하고 싶을 때 사용됩니다. setValue() 함수를 사용할 때에는 모든 컨트롤 값을 제공해야 하므로 부분 데이터가 있는 경우나 폼의 모든 컨트롤을 채우고 싶지 않은 경우에는 이 함수를 사용할 수 없습니다.

2. patchValue() 함수

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

patchValue() 함수는 반응형 폼 컨트롤의 값을 설정하는 데 사용됩니다.

```js
  patchValueExample() {
    this.myForm.patchValue({
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
    });
  }
```

patchValue() 함수는 반응형 폼의 모든 컨트롤을 업데이트하고 싶지 않을 때 사용됩니다. 폼의 일부 컨트롤만 채우고 싶을 때 사용됩니다.

예를 들어, 폼에 선택 사항 입력란이 하나 있고 사용자가 해당 입력란을 작성하지 않았을 때, 이 값을 데이터베이스에 null 또는 빈 문자열로 저장할 수 있습니다. 따라서 폼 컨트롤을 채울 때 이 입력 컨트롤을 업데이트하거나 채우고 싶지 않을 수 있습니다. 이럴 때 patch value를 사용할 수 있습니다. 이 함수를 사용하면 부분 폼 컨트롤을 채울 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

개발자들은 사용 사례 시나리오에 따라 두 함수를 모두 사용합니다. setValue() 함수는 양식의 모든 컨트롤을 필수적으로 채우려 할 때 사용하고, patchValue() 함수는 양식의 일부 컨트롤만 채우려 할 때 사용합니다.
