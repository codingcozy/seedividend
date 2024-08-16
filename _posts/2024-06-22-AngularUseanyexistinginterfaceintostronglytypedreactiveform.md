---
title: "기존 인터페이스를 강력한 타입의 리액티브 폼으로 사용하는 방법 Angular"
description: ""
coverImage: "/assets/img/2024-06-22-AngularUseanyexistinginterfaceintostronglytypedreactiveform_0.png"
date: 2024-06-22 03:12
ogImage: 
  url: /assets/img/2024-06-22-AngularUseanyexistinginterfaceintostronglytypedreactiveform_0.png
tag: Tech
originalTitle: "Angular — Use any existing interface into strongly typed reactive form"
link: "https://medium.com/@nexsol-tech/angular-use-any-existing-interface-into-strongly-typed-reactive-form-90a6ab672b37"
isUpdated: true
---




Angular 14+에서 우리는 기다리던 바대로 반응형 폼에 타입을 지정할 수 있는 기회를 얻었습니다. 문제는 폼 자체에 대한 특정 모델을 만들어야 하므로, 앱이 더 복잡한 객체를 사용할 때 폼 타입이 약간 더 복잡하고 유지하기 어려워진다는 점입니다.

![이미지](/assets/img/2024-06-22-AngularUseanyexistinginterfaceintostronglytypedreactiveform_0.png)

간단한 모델이 있는 경우에는 어느 정도 쉽게 이해됩니다. 이런 식으로 User 인터페이스를 가진 경우를 살펴봅시다:

```js
export interface User {
    id: number;
    name: string;
}
```

<div class="content-ad"></div>

위 인터페이스를 기반으로 강력한 유형화된 반응형 폼을 만들려면, 폼 컨트롤을 보유할 미러 모델이 필요합니다:

```js
export interface UserForm {
    id: FormControl<number>;
    name: FormControl<string>;
}
```

그리고 많은 모델을 가지고 있을 때, 이 방법은 꽤 지루하고 시간이 많이 걸릴 수 있어요.

## 모델을 복제하는 것은 해결책이 아닙니다.

<div class="content-ad"></div>

Typescript의 힘을 이용해서, 우리는 인터페이스를 래핑할 타입을 만들 것이고, 이를 통해 프로젝트에서 모델 중복을 피할 수 있습니다.

시작해봅시다!

우리의 타입은 Generics을 사용하여 어떤 종류의 인터페이스든 받을 수 있어야 하며, 이를 FormGroup으로 변환하고 모든 속성을 FormControl로 변환해야 합니다.

```js
export type ToFormType<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K] | null>;
}>;
```

<div class="content-ad"></div>

쉽죠? 이제 우리가 하는 일 인터페이스 T를 감싸는 슈퍼 타입을 만들어요. 이 슈퍼 타입은 FormGroup으로 변환하고 각 속성은 FormControl으로 변환하죠.

사용법:

```js
public myForm: ToFormType<User>;

...

myForm = this.fb.group(...);
```

기다려 주세요! 아직 끝나지 않았어요.

<div class="content-ad"></div>

저희 유저 인터페이스에 작은 변경사항을 가해보도록 하죠:

```js
export interface User {
    id: number;
    name: string;
    address: Address;
}

export interface Address {
    zipCode: number;
    city: string;
}
```

음... 이전 유형에서 오류가 발생했네요.

```js
'Type 'FormGroup<{…}>' is not assignable to type 'ToFormType<User>'.
Types of property 'controls' are incompatible.
```

<div class="content-ad"></div>

잘 했어요… FormControl과 FormGroup을 처리할 수 있도록 유형을 업데이트해야 해요.

다음과 같이 시도해 봅시다:

```js
export type ToFormType<T> = FormGroup<{
    [K in keyof T]: T[K] extends object
        ? ToFormType<T[K]>
        : FormControl<T[K] | null>;
}>;
```

작동하는 것으로 보이네요. 중첩된 객체가 있는 경우에도 처리할 수 있어요. 하지만, 한 가지 문제가 있어요: 만약 User에 birthDate 속성이 있다면 어떻게 될까요? Date는 object를 확장한다네요… 안타깝지만요.

<div class="content-ad"></div>

위에 있는 내용을 친한 톤으로 한국어로 번역해 드리겠습니다:

말씀하신 대로, 쉽게 코드를 업데이트하여 작동시킬 수 있습니다:

```js
export type ToFormType<T> = FormGroup<{
    [K in keyof T]: T[K] extends object
        ? T[K] extends Date
            ? FormControl<T[K] | null>
            : ToFormType<T[K]>
        : FormControl<T[K] | null>;
}>;
```

조금은 섬세하지 않지만, 대부분의 경우에는 작동할 것입니다.

```js
export interface User {
    id: number;
    name: string;
    address: Address;
    hobbies: Hobby[];
}

export interface Address {
    zipCode: number;
    city: string;
}

export interface Hobby {
    name: string;
    description: string;
}
```

<div class="content-ad"></div>

다음과 같이 번역됩니다:

```js
'Type 'FormGroup<{…}>'은(는) 'ToFormType<User>' 유형에 할당할 수 없습니다. 'controls' 속성의 유형이 호환되지 않습니다.
```

익숙하신가요? 어떻게 해야 할 지 알겠어요! 다시 한번 형식을 발전시켜 봅시다!

이렇게 하고 싶은 유혹을 느낄 수 있어요.

<div class="content-ad"></div>

```js
T[K]이 배열을 확장한다면 FormArray<ToFormType<T[K]>>으로 ....를 설정합니다.

그러나 이 방법은 작동하지 않을 것입니다. 이유는 타입이 일치하지 않기 때문입니다. 

이를 피하기 위해서는 배열로부터 타입을 « 추출 » 할 때 infer를 사용해야 합니다. (자세한 내용은 https://blog.logrocket.com/understanding-infer-typescript/에서 확인할 수 있습니다):

export type ToFormType<T> = FormGroup<{
    [K in keyof T]: T[K]이 객체를 확장한다면
        ? T[K]이 날짜인 경우
            ? FormControl<T[K] | null>
            : T[K]이 알 수 없는 배열인 경우
                ? FormArray<ToFormType<T[K] extends (infer V)[] ? V : T[K]>>
                : ToFormType<T[K]>
        : FormControl<T[K] | null>;
}>;

<div class="content-ad"></div>

이제 우리에게 대부분의 인터페이스를 강력하게 입력 형식화된 반응 형식으로 변환할 수 있는 타입이 생겼어요!

폼 내부에서 인터페이스를 풍부하게 제공하거나 부분적으로 사용하려면 Typescript의 Pick, Required, Intersection, Omit과 같은 기능을 활용할 수도 있어요. 예를 들면:
ToFormType<Pick<User, 'id' | 'name' >>;
// OR
ToFormType<User & { birthDate: Date }>;

그리고 모든 사용 사례에 대해 중복으로 정의하지 않고 단일 인터페이스를 사용할 수 있어요:)

<div class="content-ad"></div>

참고 자료

- [Typescript 공식 문서: 제네릭](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript의 infer 키워드 이해하기](https://blog.logrocket.com/understanding-infer-typescript/)
- [Typescript 공식 문서: 유틸리티 타입 - `Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)
- [Typescript 공식 문서: 병합과 교차 타입](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)

지금까지였습니다! 즐겁게 보셨길 바라요!

이와 같은 글을 계속해서 놓치고 싶지 않다면, 저희를 팔로우해주시면 감사하겠습니다 :)