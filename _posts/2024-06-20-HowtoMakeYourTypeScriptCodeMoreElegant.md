---
title: "타입스크립트 코드를 더 우아하게 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-20-HowtoMakeYourTypeScriptCodeMoreElegant_0.png"
date: 2024-06-20 05:16
ogImage: 
  url: /assets/img/2024-06-20-HowtoMakeYourTypeScriptCodeMoreElegant_0.png
tag: Tech
originalTitle: "How to Make Your TypeScript Code More Elegant"
link: "https://medium.com/javascript-in-plain-english/how-to-make-your-typescript-code-more-elegant-73645401b9b1"
isUpdated: true
---




<img src="/assets/img/2024-06-20-HowtoMakeYourTypeScriptCodeMoreElegant_0.png" />

TypeScript는 수퍼셋 언어로, JavaScript의 모든 기능을 포함하며 더 강력한 기능과 도구 지원을 제공하여 그 위에 조성되었습니다. TypeScript는 개발자가 더 견고하고 유지보수가 쉬운 코드를 작성하는 데 도움을 주고, 이를 통해 개발 효율성과 코드 품질을 향상시키려 합니다.

이 기사에서는 TypeScript의 고급 기능을 탐구하고, 이러한 기능이 어떻게 더 높은 품질의 코드 작성에 도움을 줄 수 있는지를 보여줍니다. TypeScript를 처음 시작하는 사람이거나 그 고급 기능을 깊게 탐색하려는 경우, 이 기사는 가치 있는 통찰과 실용적인 조언을 제공할 것입니다.

# 1. 템플릿 리터럴 타입

<div class="content-ad"></div>

템플릿 리터럴 유형은 TypeScript에서의 고급 유형 기능으로, 문자열 템플릿 구문을 사용하여 복잡한 문자열 조합 유형을 만들 수 있게 해줍니다. 예를 통해 살펴보겠습니다:

어플리케이션에서 서로 다른 사용자 역할과 권한 수준이 있다고 가정해봅시다. 이를 표현하는 유형을 만들고 싶은 경우, 템플릿 리터럴을 사용해 역할과 권한 수준의 조합을 나타내는 유형을 생성할 수 있습니다.

```js
type Role = "admin" | "user" | "guest";
type PermissionLevel = "read" | "write" | "execute";
type RolePermission = `${Role}-${PermissionLevel}`;

let rolePermission: RolePermission = "admin-read"; // 유효한 값
// let invalidRolePermission: RolePermission = "manager-read"; 
// 에러: 'manager-read' 유형이 'RolePermission'에 할당될 수 없습니다.
```

템플릿 리터럴 유형을 사용하여 RolePermission 유형을 생성했습니다. 이는 Role과 PermissionLevel의 각 값들을 결합해 총 아홉 가지 문자열 유형을 생성합니다: "admin-read", "admin-write", "admin-execute", "user-read", "user-write", "user-execute", "guest-read", "guest-write", 그리고 "guest-execute".

<div class="content-ad"></div>

"manager-read"은 RolePermission의 정의 범위에 없습니다. "manager"가 Role 유형에 포함되어 있지 않기 때문에 TypeScript에서 오류를 발생시킵니다. "manager-read" 타입은 `RolePermission` 타입으로 할당할 수 없다는 메시지가 표시됩니다.

템플릿 리터럴 타입을 사용하여 복잡한 문자열 조합 타입을 쉽게 생성하고 관리할 수 있습니다. 이를 통해 코드의 가독성과 타입 안정성을 높일 수 있습니다. 특히 복잡한 문자열 패턴을 정의하고 검증해야 하는 상황에서 유용합니다.

# 2. TypeScript 유형 예측(Type Predicates)을 사용하여 정확한 유형 검사

유형 예측은 특정 유형에 변수가 속하는지 확인하고 실행 시점에 유형을 보장하는 강력한 도구입니다. 유형 예측을 사용하면 유형 안전한 코드를 작성할 때 더 정확한 유형 검사를 수행하여 유형 오류를 피하고 코드의 견고성과 유지 보수성을 향상시킬 수 있습니다.

<div class="content-ad"></div>

우리는 고양이(Cat)와 개(Dog)를 포함한 동물을 나타내는 유니언 타입이 있는 경우를 상정해 봅시다:

```js
interface Cat {
  kind: "cat";
  meow: () => void;
}

interface Dog {
  kind: "dog";
  bark: () => void;
}

type Animal = Cat | Dog;
```

이제 Animal이 Cat 타입인지 확인하는 함수를 작성하려고 합니다. 이 때, 우리는 타입 가드를 사용할 수 있습니다:

```js
function isCat(animal: Animal): animal is Cat {
  return animal.kind === "cat";
}

function makeSound(animal: Animal) {
  if (isCat(animal)) {
    animal.meow(); // 여기서 TypeScript는 animal이 Cat 타입임을 알고 있습니다.
  } else {
    animal.bark(); // 여기서 TypeScript는 animal이 Dog 타입임을 알고 있습니다.
  }
}
```

<div class="content-ad"></div>

위 예시에서 우리는 isCat이라는 함수를 정의하고 결과 타입으로 타입 검사 animal is Cat를 사용하였습니다. 이 함수는 전달된 animal 객체의 kind 속성이 "cat"인지 확인합니다. 만약 "cat"이라면, 함수는 true를 반환하고 TypeScript 컴파일러에게 이 조건 분기 내에서 animal 변수가 Cat 타입임을 알려줍니다.

이렇게 함으로써, makeSound 함수는 Animal의 특정 타입을 정확히 식별하고 해당하는 조건 분기에서 Cat 또는 Dog에 특화된 메서드를 호출할 수 있습니다. 이는 코드의 타입 안정성을 향상시키는 동시에 코드를 더 명확하고 유지보수하기 쉽게 만듭니다.

# 3. 색인 액세스 타입

색인 액세스 타입은 T[K] 구문을 사용하여 T 유형에서 키 K와 연결된 유형에 액세스할 수 있도록 합니다. 이는 JavaScript에서 객체 속성에 액세스하기 위해 대괄호를 사용하는 것과 유사하지만, TypeScript에서 색인 액세스 타입은 컴파일 시간 타입 체크를 제공합니다.

<div class="content-ad"></div>

API 응답 유형에서 데이터와 오류 정보가 포함된 경우를 가정해보겠습니다:

```js
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductResponse = ApiResponse<Product>;
```

우리는 Indexed Access Types를 사용하여 ProductResponse 유형의 data 속성의 유형을 추출할 수 있습니다.

```js
type ProductDataType = ProductResponse['data']; // Product
```

<div class="content-ad"></div>

실제 응용 프로그램에서는 속성 이름을 기반으로 객체 속성에 동적으로 액세스해야 하고 형식 보호를 수행해야 하는 경우가 많습니다. 인덱스 액세스 유형과 `keyof` 연산자를 사용하여 이를 달성할 수 있습니다:

```js
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

const userId = getProperty(user, 'id'); // number
const userName = getProperty(user, 'name'); // string
const userEmail = getProperty(user, 'email'); // string
```

이 예제에서는 다음과 같은 내용이 있습니다:

- getProperty 함수는 객체 obj와 속성 이름 key를 사용하고 해당 속성의 값을 반환합니다.
- T는 객체의 유형이며, K는 속성 이름의 유형입니다(이는 T의 키여야 합니다).
- 반환 유형 T[K]는 객체 T의 키 K에 해당하는 속성의 유형을 나타냅니다.

<div class="content-ad"></div>

# 4. TypeScript의 유틸리티 타입

TypeScript에는 다양한 시나리오에서 복잡한 타입을 빠르게 생성하고 조작하는 데 도움이 되는 많은 내장 유틸리티 타입이 제공됩니다. 이 유틸리티 타입을 활용함으로써 개발 효율을 크게 향상시키고, 수동으로 타입 정의를 작성하는 작업 부담을 줄이며, 코드의 가독성과 유지보수성을 향상시킬 수 있습니다. 여기에 유틸리티 타입의 몇 가지 예시가 있습니다:

- Partial 타입은 타입 T의 모든 속성을 선택적으로 만들어줍니다. 초기에 필요하지 않은 모든 속성을 가진 객체를 구성해야 할 때 매우 유용합니다.

```js
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, update: Partial<User>) {
  // ...
}

updateUser(1, { name: "Alice" }); // 유효
updateUser(2, { email: "bob@example.com" }); // 유효
```

<div class="content-ad"></div>

- Required 유형은 T 유형의 모든 속성을 필수 속성으로 만듭니다. 객체의 모든 속성에 값이 할당된 것을 보장해야 할 때 매우 유용합니다.

```js
interface User {
  id?: number;
  name?: string;
  email?: string;
}

const completeUser: Required<User> = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
```

- Readonly 유형은 T 유형의 모든 속성을 읽기 전용으로 만들어 수정할 수 없게 합니다.

```js
interface User {
  id: number;
  name: string;
  email: string;
}

const user: Readonly<User> = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

user.id = 2; // 오류: 'id'는 읽기 전용 속성이므로 할당할 수 없습니다.
```

<div class="content-ad"></div>

- Pick 유형은 형식 T에서 특정 속성들을 선택하여 새로운 유형을 만드는 데 사용됩니다.

```js
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserSummary = Pick<User, "id" | "name">;

const userSummary: UserSummary = {
  id: 1,
  name: "Alice"
};
```

- Omit 유형은 형식 T에서 지정된 속성을 제외하여 새로운 유형을 만드는 데 사용됩니다.

```js
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserWithoutEmail = Omit<User, "email">;

const userWithoutEmail: UserWithoutEmail = {
  id: 1,
  name: "Alice",
  age: 30
};
```

<div class="content-ad"></div>

실제 개발에서는 종종 여러 유틸리티 유형을 결합하여 복잡한 유형 정의를 만들어 특정 요구 사항을 충족시키는 경우가 많습니다.

```js
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

type ReadonlyPartialUser = Readonly<Partial<User>>;

const user: ReadonlyPartialUser = {
  id: 1,
  name: "Alice"
};

user.id = 2; // 오류: 'id'는 읽기 전용 속성이기 때문에 할당할 수 없습니다.
```

# 5. TypeScript의 고급 유형 추론 활용하기

TypeScript의 고급 유형 추론 메커니즘은 해당 유형 시스템의 핵심 기능입니다. 유형 추론을 통해 TypeScript는 변수, 함수 반환 값 및 표현식의 유형을 자동으로 추론하여 명시적인 유형 주석을 줄이고 코드를 더 간결하고 우아하게 만들 수 있습니다. 아래에서는 몇 가지 고급 유형 추론 기술과 예제를 소개하여 이러한 기능을 활용하여 코드 품질과 가독성을 개선하는 방법을 설명하겠습니다.

<div class="content-ad"></div>

## 5.1 타입 추론의 기본

TypeScript는 많은 상황에서 자동으로 타입을 추론할 수 있습니다.

예를 들어 변수를 선언하고 값을 할당할 때 TypeScript는 할당된 값에 기반하여 변수의 타입을 추론합니다:

```js
let x = 42; // TypeScript는 x의 타입을 숫자로 추론합니다
let y = "Hello, TypeScript!"; // TypeScript는 y의 타입을 문자열로 추론합니다
```

<div class="content-ad"></div>

함수를 정의하고 값으로 반환할 때 TypeScript는 함수의 반환 유형을 자동으로 추론합니다:

```js
function add(a: number, b: number) {
  return a + b; // TypeScript는 함수의 반환 유형을 number로 추론합니다
}
```

이 추론 메커니즘은 코드를 더 간결하게 만들어주며, 함수의 반환 유형을 명시적으로 지정할 필요가 없어집니다.

## 5.2 고급 유형 추론 예제

<div class="content-ad"></div>

- 객체 속성 유형 추론: TypeScript는 객체 리터럴을 기반으로 속성의 유형을 자동으로 추론할 수 있어요. 

```js
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// TypeScript는 user의 유형을 { id: number; name: string; email: string; }으로 추론해요.
```

- 배열 요소 유형 추론: TypeScript는 요소를 기반으로 배열의 유형을 추론할 수 있어요.

```js
const numbers = [1, 2, 3, 4]; // TypeScript는 numbers의 유형을 number[]로 추론해요.
const names = ["Alice", "Bob", "Charlie"]; // TypeScript는 names의 유형을 string[]로 추론해요.
```

<div class="content-ad"></div>

- 일반 유형 추정: TypeScript를 사용할 때 제네릭을 사용하면 전달된 매개변수를 기반으로 제네릭의 특정 유형을 추정할 수 있습니다.

```js
function identity<T>(value: T): T {
  return value;
}

const numberIdentity = identity(42); // TypeScript는 T를 숫자로 추정합니다.
const stringIdentity = identity("Hello"); // TypeScript는 T를 문자열로 추정합니다.
```

- 조건부 유형 추정: TypeScript는 조건부 유형을 지원하여 다양한 조건에 기반해 다른 유형을 추정할 수 있습니다.

```js
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>; // "yes"
type B = IsString<number>; // "no"
```

<div class="content-ad"></div>

- 함수 매개변수 유추하기: 고계 함수를 사용할 때 TypeScript는 콜백 함수의 매개변수 유형을 추론할 수 있습니다.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // TypeScript는 n의 타입을 숫자로 추론합니다
```

## 5.3 실전에서의 고급 유추 활용

실제 프로젝트에서 TypeScript의 고급 유추 기능을 활용하면 코드가 더 간결하고 표현력이 높아집니다. 아래는 이러한 유추 기술을 실제 개발에서 적용하는 방법을 종합적으로 보여주는 예제입니다:

<div class="content-ad"></div>

```js
인터페이스 User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: "User" + id,
    email: `@example.com">user${id}@example.com`
  };
}

const users = [getUser(1), getUser(2), getUser(3)];

function sendEmail(user: User, message: string) {
  console.log(`Sending email to ${user.email}: ${message}`);
}

users.forEach(user => sendEmail(user, "Welcome!")); // TypeScript는 user의 타입을 User로 추론합니다.
```

TypeScript는 우아하고 효율적인 코드를 작성할 수 있도록 다양한 강력한 기능을 제공합니다. 타입 예측자를 사용하면 다른 유형 간 안전한 타입 전환을 보장하는 정확한 타입 검사를 수행할 수 있으며, 인덱스 액세스 유형을 사용하면 복잡한 유형을 동적으로 조작하고 액세스할 수 있습니다. 유틸리티 타입을 사용하면 유형을 정의하는 프로세스가 단순화되어 코드 가독성과 유지보수성이 향상되며, 고급 타입 추론을 통해 TypeScript가 변수와 표현식의 유형을 자동으로 추론하여 명시적인 유형 주석이 필요한 경우를 줄입니다.

이러한 기능은 개발 효율성을 향상시킬 뿐만 아니라 코드의 유형 안전성과 유지보수성을 향상시킵니다. 실제 개발에서 이러한 TypeScript 기능을 최대한 활용하면 더 깨끗하고 명확하며 견고한 코드를 작성하는 데 도움이 됩니다. TypeScript의 강력한 기능을 지속적으로 탐구하고 적용함으로써 프로젝트에서 더 높은 품질의 코드와 더 효율적인 개발 프로세스를 달성할 수 있습니다.

# 간단하게 설명하기 🚀


<div class="content-ad"></div>

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 다음에 가시기 전에:

- 반드시 박수를 보내고 작가를 팔로우해 주세요 👏️️
- 팔로잉해 주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서도 만나보세요: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요