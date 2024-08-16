---
title: "TypeScript의 매핑된 타입 알아보기 기초부터 고급까지 8가지 예제"
description: ""
coverImage: "/assets/img/2024-06-22-ExploringMappedTypesinTypeScript8ExamplesfromBasictoAdvanced_0.png"
date: 2024-06-22 14:45
ogImage: 
  url: /assets/img/2024-06-22-ExploringMappedTypesinTypeScript8ExamplesfromBasictoAdvanced_0.png
tag: Tech
originalTitle: "Exploring Mapped Types in TypeScript: 8 Examples from Basic to Advanced"
link: "https://medium.com/@awwwesssooooome/exploring-mapped-types-in-typescript-8-examples-from-basic-to-advanced-b3b409172c35"
isUpdated: true
---




**Mapped types**는 TypeScript에서 한 타입의 속성을 다른 타입으로 변환하는 강력한 도구입니다. 이것들은 `map` 및 `filter`와 같은 배열 메서드와 유사하지만, 이러한 작업은 타입에 대해 수행됩니다. 실용적인 예제를 통해 그 사용법을 이해할 것이고, 이어서 기초부터 고급까지 점진적으로 8가지 Mapped type 예제를 보여드릴 것입니다. 이를 통해 이 강력한 타입 변환 도구를 손쉽게 마스터할 수 있을 거예요.

# I. 기초적인 타입 변환

TypeScript에서 때로는 한 타입의 속성을 다른 타입으로 변환해야할 때가 있습니다. 이것은 Mapped types을 사용하여 쉽게 달성할 수 있습니다. 아래에서 한 Product 타입의 속성을 문자열 타입으로 변환하는 방법을 구체적인 예제를 통해 보여드겠습니다.

<div class="content-ad"></div>

## 1. 제품 유형 정의

먼저, 세 가지 속성인 name(문자열 유형), price(숫자 유형), inStock(부울 유형)을 포함하는 Product 유형을 정의합니다.

```js
type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
```

## 2. ProductToString 유형 정의

<div class="content-ad"></div>

다음으로, 우리는 모든 Product 형식의 속성을 문자열 형식으로 변환하는 새로운 형식 ProductToString을 정의합니다.

```js
type ProductToString = {
    [Key in keyof Product]: string;
};
```

## 3. 결과 형식

마지막으로, 결과 ProductToString 형식은 다음과 같습니다:

<div class="content-ad"></div>

```typescript
type ProductToString = {
    name: string;
    price: string;
    inStock: string;
};
```

## II. Making Type Properties Optional

TypeScript에서 종종 유형의 모든 속성을 선택적으로 만들어야 합니다. 일반적으로는 내장된 Partial 유틸리티 유형을 사용하여 이것을 달성하지만, 매핑된 유형을 사용하여 동일한 효과를 얻을 수도 있습니다.

### 1. 제품 유형 정의

<div class="content-ad"></div>

```js
type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
```

## 2. Use Mapped Types to Make Properties Optional

```js
type ProductToOptional = {
    [Key in keyof Product]?: Product[Key];
};
```

## 3. Resulting Type

<div class="content-ad"></div>

```js
type ProductToOptional = {
    name?: string;
    price?: number;
    inStock?: boolean;
};
```

# III. Making Optional Properties Required

In TypeScript, sometimes we need to convert all optional properties of a type into required properties. This can be easily achieved using mapped types.

## 1. Define Product Type


<div class="content-ad"></div>

```js
종류 Product = {
    name?: string;
    price?: number;
    inStock?: boolean;
};
```

## 2. ProductToRequired 유형 정의

```js
유형 ProductToRequired = {
    [Key in keyof Product]-?: Product[Key];
};
```

## 3. 결과 유형


<div class="content-ad"></div>

```js
type ProductToRequired = {
    name: string;
    price: number;
    inStock: boolean;
};
```

# IV. Making Properties Read-Only

In TypeScript, sometimes we need to make all properties of a type read-only. This can be easily achieved using mapped types.

## 1. Define Product Type

<div class="content-ad"></div>


## 2. Define ProductToReadonly Type

```js
type ProductToReadonly = {
    readonly [Key in keyof Product]: Product[Key];
};
```

## 3. Resulting Type


<div class="content-ad"></div>

```js
type ProductToReadonly = {
    readonly name: string;
    readonly price: number;
    readonly inStock: boolean;
};
```

## V. Removing Certain Properties

TypeScript에서 때로는 유형에서 특정 속성을 제거해야 하는 경우가 있습니다. 일반적으로 내장된 Omit 유틸리티 유형을 사용하여 이를 달성하지만, 매핑된 유형을 사용하여 동일한 효과를 얻을 수도 있습니다.

### 1. Product 유형 정의

<div class="content-ad"></div>

```js
type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
```

## 2. Use Mapped Types to Remove Properties

```js
type ProductWithoutPrice = {
    [Key in keyof Product as Key extends 'price' ? never : Key]: Product[Key];
};
```

## 3. Resulting Type


<div class="content-ad"></div>

```js
타입 ProductWithoutPrice = {
    name: string;
    inStock: boolean;
};
```

# VI. 특정 속성 유형만 있는 유형 생성

TypeScript에서 조건부 타입을 사용하여 특정 유형의 속성만 포함된 새로운 타입을 생성할 수 있습니다.

## 1. 제품 유형 정의하기


<div class="content-ad"></div>

```typescript
type Product = {
    name: string;
    price: number;
    inStock: boolean;
    tags: string[];
};
```

## 2. Define OnlyStringProperties Type

```typescript
type OnlyStringProperties<Type> = {
    [Key in keyof Type as Type[Key] extends string ? Key : never]: Type[Key];
};
```

## 3. Use OnlyStringProperties


<div class="content-ad"></div>

```js
유형 ProductOnlyStringProperties = OnlyStringProperties<Product>;
```

## 4. 결과 유형

```js
유형 ProductOnlyStringProperties = {
    이름: 문자열;
};
```

# VII. 템플릿 리터럴 유형을 사용하여 새로운 속성 이름 생성하기

<div class="content-ad"></div>

TypeScript에서는 템플릿 리터럴 타입을 사용하여 특정 접두사와 대문자로 시작하는 속성 이름을 가진 새로운 타입을 생성할 수 있습니다.

## 1. 제품 타입 정의

```js
type Product = {
    name: string;
    price: number;
    inStock: boolean;
};
```

## 2. 접두사가 포함된 속성을 가진 타입 생성

<div class="content-ad"></div>

TypeScript에서는 템플릿 리터럴 타입을 사용하여 get로 접두사가 붙은 속성 이름을 가진 새로운 타입을 생성할 수 있어요.

```js
type Getters<Type> = {
    [Key in keyof Type as `get${Capitalize<string & Key>}`]: () => Type[Key];
};
```

## 3. Getters 사용하기

```js
type ProductGetters = Getters<Product>;
```

<div class="content-ad"></div>

## 4. 결과 타입

```js
type ProductGetters = {
    getName: () => string;
    getPrice: () => number;
    getInStock: () => boolean;
};
```

# VIII. 조건에 따른 중첩 Mapped 타입

TypeScript에서 Mapped 타입과 조건부 타입을 결합하여 더 복잡한 타입 변환 로직을 만들 수 있습니다. 예를 들어, 속성의 타입에 따라 다른 중첩 타입 구조를 생성할 수 있습니다.

<div class="content-ad"></div>

## 1. 중첩된 객체 유형 정의

먼저, 중첩된 객체를 포함한 다양한 유형의 속성을 포함하는 `NestedObject` 유형을 정의합니다.

```js
type NestedObject = {
    id: number;
    name: string;
    metadata: {
        createdAt: Date;
        updatedAt: Date;
    };
    tags: string[];
};
```

## 2. DeepReadonly 유형 정의

<div class="content-ad"></div>

다음으로, 모든 속성을 읽기 전용으로 변환하는 DeepReadonly 타입을 정의합니다. 이는 중첩된 객체의 속성도 포함됩니다.

```js
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

이 정의에서 T[P] extends object은 속성 타입이 객체인지 확인하기 위해 사용됩니다. 만약 객체인 경우, DeepReadonly가 재귀적으로 적용되며, 그렇지 않은 경우 속성이 읽기 전용으로 설정됩니다. 

## 3. DeepReadonly 타입 사용하기

<div class="content-ad"></div>

딥 읽기 전용을 사용하여 NestedObject의 심층적으로 읽기 전용 버전인 ReadonlyNestedObject를 정의할 수 있습니다.

```js
type ReadonlyNestedObject = DeepReadonly<NestedObject>;
```

## 4. 결과 타입

마지막으로, 결과로 나오는 ReadonlyNestedObject 타입은 다음과 같습니다:

<div class="content-ad"></div>

```js
유형 ReadonlyNestedObject = {
    readonly id: number;
    readonly name: string;
    readonly metadata: {
        readonly createdAt: Date;
        readonly updatedAt: Date;
    };
    readonly tags: readonly string[];
};
```

## 5. 사용 예시

```js
const readonlyNestedObject: ReadonlyNestedObject = {
    id: 1,
    name: "예시",
    metadata: {
        createdAt: new Date(),
        updatedAt: new Date()
    },
    tags: ["타입스크립트", "프로그래밍"]
};

// readonlyNestedObject.id = 2; // 오류: 'id'는 읽기 전용 속성이기 때문에 할당할 수 없습니다.
// readonlyNestedObject.metadata.createdAt = new Date(); // 오류: 'createdAt'는 읽기 전용 속성이기 때문에 할당할 수 없습니다.
```

TypeScript의 매핑된 유형은 다양한 복잡한 유형 변환을 달성할 수 있는 매우 강력한 기능입니다. 이를 사용하여 다음을 수행할 수 있습니다:

<div class="content-ad"></div>

- 속성 변환: 타입 내 기존 속성의 유형을 변경합니다.
- 속성 추가 또는 제거: 새로운 속성을 추가하거나 기존 속성을 제거합니다.
- 옵션 및 읽기 전용 상태 제어: 속성을 옵션으로 만들거나 읽기 전용으로 설정합니다.
- 동적 타입 생성: 조건형 타입과 템플릿 리터럴 타입을 사용하여 새로운 타입을 구성합니다. (예: 게터와 세터 생성과 같은 고급 시나리오에 적합)

Partial, Readonly, Omit과 같은 내장 유틸리티 타입은 편리한 단축키를 제공하지만, 매핑된 타입은 타입에 대한 깊은 이해와 정밀한 제어를 제공합니다.

이 기술을 더 잘 이해하고 코드를 더 깔끔하고 예측 가능하며 유지 보수가 쉬운 상태로 만들기를 바라며, 이 글이 도움이 되기를 바랍니다.