---
title: "타입 vs 인터페이스 TypeScript에서"
description: ""
coverImage: "/assets/img/2024-05-14-TypesVsInterfacesinTypeScript_0.png"
date: 2024-05-14 15:27
ogImage: 
  url: /assets/img/2024-05-14-TypesVsInterfacesinTypeScript_0.png
tag: Tech
originalTitle: "Types Vs Interfaces in TypeScript"
link: "https://medium.com/@vikaskum660/types-vs-interfaces-in-typescript-053a3d6c4dc1"
---



![TypesVsInterfacesinTypeScript](/assets/img/2024-05-14-TypesVsInterfacesinTypeScript_0.png)

TypeScript는 놀라운 점들이 가득하고 일부 행동은 TypeScript에만 독점되어 있습니다.

오늘은 타입과 인터페이스의 차이점과 대부분의 경우에 타입을 사용해야 하는 이유에 대해 논의할 것입니다.

더 이상 미루지 말고 바로 들어가 봅시다.




차이가 무엇인가요?

이 동물 유형 및 인터페이스 정의를 분석해 봅시다:

```js
type Animal = {
  species: string
  name: string
  age: number
}


interface Animal {
  species: string
  name: string
  age: number
}
```

구문은 거의 동일한데 유형은 객체의 모양을 정의하기 위해 =로 선언됩니다.



이는 큰 차이가 아닙니다. 주요 차이점을 자세히 살펴보겠습니다.

# 확장성

확장성 측면에서 인터페이스가 승자입니다. 인터페이스는 extends 키워드를 사용하여 확장할 수 있습니다.

```js
interface Animal {
  species: string
  name: string
  age: number
}

interface Dog extends Animal {
  breed: string
}

const dog: Dog = {
  species: '포유동물',
  name: '브루노',
  breed: '저먼 셰퍼드',
  age: 5
}
```



개 인터페이스는 동물 인터페이스의 속성을 확장하며 결과로 동물 인터페이스의 속성이 개 인터페이스에 병합됩니다.

타입은 두 개의 타입을 병합하는 데 Union(`|`) 및 Intersection(`&`) 연산자를 사용하여 속성을 확장할 수도 있습니다.

```js
type Animal = {
  species: string
  name: string
  age: number
}

type Dog = {
  breed: string
} & Animal

// ❌ 작동하지 않음
interface Dog {
  breed 
} & Animal
```

# 성능



성능은 컴파일 시 TypeScript 컴파일러에서 수행되는 타입 체크를 의미합니다.
성능은 일반적으로 코드베이스가 커질수록 지수적으로 감소합니다.

이것이 왜 우리가 타입 대 인터페이스의 성능을 벤치마킹 하는 이유입니다.
나는 TypeScript 분야에서 Matt Pocock을 따르고 있습니다. Total TypeScript 강좌를 수강하는 것이 가치가 있다고 말할 수 있습니다.

Matt가 타입과 인터페이스의 차이를 설명한 비디오로, 타입과 인터페이스의 성능에는 차이가 없다는 것을 보여줍니다.

# 인터페이스가 해로울 수 있는 이유



TypeScript의 인터페이스는 선언 병합(Declaration Merging)이라는 독특한 기능을 가지고 있어.

선언 병합은 TypeScript 컴파일러가 동일한 이름을 가진 두 개 이상의 인터페이스를 하나로 병합하는 것이야.

```js
// 초기 Dog 인터페이스
interface Dog {
  species: string
  name: string
  age: number
}
// "선언 병합"을 이용해 Dog 인터페이스 보강
interface Dog {
  breed: string
}

// "병합된" 인터페이스로 새로운 "개"를 정의해봐
const dog: Dog = { name: "Bruno", age: 5, breed: "German Shepherd", species: "Mamamal" }
```

이 방법은 인터페이스에 함수 멤버가 없는 경우 잘 동작해.

그런데 함수 멤버가 있는 경우, 선언 병합은 코드베이스에 불리하고 예상치 못한 영향을 미칠 수 있어. 멤버의 우선순위는 나중에 나오는 것이 더 높아져.



```js
인터페이스 Cloner {
  clone(animal: Animal): Animal;
}
인터페이스 Cloner {
  clone(animal: Sheep): Sheep;
}
인터페이스 Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 세 가지 인터페이스가 병합되어 다음과 같은 하나의 선언으로 생성됩니다:

인터페이스 Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

각 그룹의 요소들은 동일한 순서를 유지하지만, 그룹 자체는 나중에 오버로드 세트로 병합됩니다.

## 클래스와의 안전하지 않은 병합

TypeScript 컴파일러는 속성 초기화를 확인하지 않기 때문에 예기치 않은 런타임 오류가 발생할 수 있습니다.
두 인터페이스의 병합 중에



```js
인터페이스 동물 {
    a: 문자열;
    b: 문자열;
}

인터페이스 개는 동물을 확장하며 {
    c: 문자열;
}

클래스 개 {
    constructor() {}
}
```

위 예제에서는 속성 a, b 또는 c가 초기화되었는지 여부에 관계없이 초기화되지 않았음에 대한 오류나 경고가 나타나지 않습니다.

그러나 아래 코드를 작성할 때, 여전히 Properties 'a', 'b', 및 'c'에 대한 초기화 프로그램이 없으며 생성자에서 확실하게 할당되지 않았다는 오류가 발생합니다.

```js
클래스 개 {
    a: 문자열;
    b: 문자열;
    c: 문자열;
}
```



테이블 태그를 마크다운 형식으로 변경하십시오.

| Types do not have this problem, and hence are more straightforward and safe to use as a result.                        |
|--------------------------------------------------------------------------------------------------------------------------|
| **Conclusion**                                                                                                          |
| Unless specific interface behavior is necessary, e.g. extensible refinement or implementation using OOP, your best bet is to stick with types. |
| Types are flexible and straightforward, and avoid pitfalls associated with declaration merging.                         |



인터페이스와 성능 면에서도 타입들은 동일합니다.