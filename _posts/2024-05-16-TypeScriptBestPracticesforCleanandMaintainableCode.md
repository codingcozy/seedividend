---
title: "TypeScript 깨끗하고 유지보수가 쉬운 코드를 위한 최고의 실천 방법"
description: ""
coverImage: "/assets/img/2024-05-16-TypeScriptBestPracticesforCleanandMaintainableCode_0.png"
date: 2024-05-16 03:19
ogImage: 
  url: /assets/img/2024-05-16-TypeScriptBestPracticesforCleanandMaintainableCode_0.png
tag: Tech
originalTitle: "TypeScript: Best Practices for Clean and Maintainable Code"
link: "https://medium.com/@ritikasaxena3007/typescript-best-practices-for-clean-and-maintainable-code-01e5df26a367"
isUpdated: true
---




이 블로그에서는 더 깨끗하고 안전하며 효율적인 코드를 작성하는 데 도움이 되는 TypeScript의 필수적인 최상의 관행에 대해 살펴볼 것입니다. 엄격 모드를 활용하고 타입 주석 및 인터페이스를 포함하여 "any" 타입의 함정을 피하고 읽기 전용 속성, 선택적 체이닝, nullish 병합 및 유틸리티 타입과 같은 고급 기능을 활용하는 등, TypeScript 스킬을 향상시키고 최상의 소프트웨어 솔루션을 제공하기 위해 필요한 모든 것을 다룰 것입니다. 함께 알아보겠습니다!

- 엄격 모드 사용하기: TypeScript의 엄격 모드는 일반적인 오류를 잡고 안전한 코드를 보장하는 데 도움이 되는 여러 컴파일러 확인을 활성화합니다. 엄격 모드 활성화(tsconfig.json의 "strict": true)에는 strictNullChecks, strictPropertyInitialization, strictBindCallApply 등의 옵션이 포함됩니다. 시작부터 엄격 모드를 채택하면 프로젝트에 견고한 기반이 마련되어 많은 잠재적인 버그를 방지할 수 있습니다.

예시: TypeScript에서 엄격 모드 사용의 장점을 보여주기 위해 특히 strictNullChecks에 초점을 맞춘 간단한 예제를 고려해 봅시다.
문자열 매개변수를 받아 해당 문자열의 길이를 반환하는 함수가 있다고 가정해 봅시다:

```js
// 엄격 모드 사용하지 않았을 때
function getStringLength(input: string): number {
 return input.length; // 'input'이 null 또는 undefined인 경우 잠재적인 런타임 오류 발생
}
console.log(getStringLength("Hello")); 
console.log(getStringLength(null)); // 잠재적인 런타임 오류 발생
```



TypeScript에서는 코드를 무리없이 컴파일하지만, 실행 시 오류가 발생할 것입니다. 왜냐하면 null의 length 속성에 접근하려고 하기 때문에 오류가 발생합니다.

이제 tsconfig.json에서 strictNullChecks를 활성화해 봅시다.

```js
{
    "compilerOptions": {
        "strict": true,
        "strictNullChecks": true
    }
}
```

strictNullChecks를 활성화하면 TypeScript가 엄격한 null 검사를 적용하여, 문자열이 예상된 위치에 null 또는 undefined를 전달하는 것을 방지합니다.



```typescript
// strictNullChecks를 활성화한 상태

function getStringLength(input: string): number {
    return input.length; // TypeScript 오류: 객체가 'null' 또는 'undefined'일 수 있습니다
}

console.log(getStringLength("Hello")); 
console.log(getStringLength(null));    // TypeScript 오류: 'null'의 형식은 'string'의 매개변수에 할당할 수 없습니다
```

strictNullChecks를 활성화하면 TypeScript는 컴파일 시간에 input이 null 또는 undefined일 수 있다는 경고를 표시하여 런타임에 발생할 수 있는 잠재적 오류를 잡을 수 있습니다. 이를 통해 더 안전한 코드를 작성하고 null 및 undefined 값과 관련된 일반적인 함정을 방지할 수 있습니다.

1. Type Annotations과 Interfaces: TypeScript의 가장 큰 강점은 정적 타입 시스템에 있습니다. 타입 주석과 인터페이스를 활용하여 코드를 문서화하는 동시에 개발자와 도구에게 소중한 지원을 제공할 수 있습니다. 복잡한 데이터 구조에 대해 명확한 인터페이스를 정의하고 함수 매개변수와 반환 타입에 대해 타입 주석을 사용하여 명확성과 유지보수성을 보장하세요.

2. "any" 타입 사용 지양: TypeScript는 타입을 모르거나 동적인 상황에서 any 타입을 제공하나 최소화하는 것이 좋습니다. any 타입은 사실상 타입 검사를 건너뛰는 것이므로 TypeScript의 주요 장점 중 하나를 약화시킵니다. 대신 변수와 함수를 명시적으로 타입 지정하고 TypeScript의 타입 시스템의 전체 장점을 활용하세요.




다음은 tsconfig.json을 구성하여 어떻게 사용하지 않도록 설정할 수 있는지에 대한 설명입니다:-

```js
{
    "compilerOptions": {
        "noImplicitAny": true,
    }
}
```

4. "readonly" 사용하기: TypeScript에는 읽기 전용 속성과 변수를 만들 수 있는 readonly 수식어가 제공됩니다. 이는 초기화 후의 의도치 않은 수정을 방지합니다.
간단한 사용자 프로필 정보를 관리하는 응용프로그램을 가정해보겠습니다. 사용자 프로필이 작성된 후에는 해당 속성이 수정되지 않도록 보장하고 싶습니다. TypeScript에서 readonly 속성을 사용하여 이것을 구현할 수 있습니다.

```js
interface UserProfile {
    readonly name: string;
    readonly age: number;
    readonly email: string;
}

function createUserProfile(name: string, age: number, email: string): UserProfile {
    return { name, age, email };
}

const user: UserProfile = createUserProfile("test user", 30, "testUser@example.com");

user.name = "Sample User";  // TypeScript 에러 : const 또는 readonly 변수에 할당을 시도함
```



만약 우리가 읽기 전용 속성인 이름을 수정하려고 하면 TypeScript가 컴파일 오류를 발생시켜 사용자 프로필이 실수로 수정되는 것을 방지합니다.

이 방식을 통해 한 번 사용자 프로필이 생성되면 해당 속성을 수정할 수 없게 되어 불변성을 유지하고 코드 신뢰성을 향상시킵니다.

5. Optional Chaining과 Nullish Coalescing 사용 : TypeScript는 옵셔널 체이닝 (?.)과 널리쉬 코얼리싱 (??)과 같은 ECMAScript 기능을 지원하여 오류 처리를 간소화하고 코드 가독성을 높일 수 있습니다. Optional chaining을 사용하면 중첩된 속성에 안전하게 액세스할 수 있으며 널 또는 언디파인 값에 대해 걱정할 필요가 없습니다. 반면 널리쉬 코얼리싱은 잠재적으로 널 또는 언디파인 변수에 대한 기본 값을 처리하는 간결한 방법을 제공합니다.

예시 :
사용자의 주소, 도시, 국가에 대한 중첩 속성을 가진 객체가 있다고 가정해보겠습니다. 그러나 어떤 사용자는 주소 세부 정보를 제공하지 않을 수 있습니다. 우리는 이러한 속성에 안전하게 액세스하고 값이 누락된 경우 기본 값을 제공하고 싶습니다.



```javascript
interface User {
    name: string;
    address?: {
        city?: string;
        country?: string;
    };
}

const user1: User = {
    name: "Test User",
    address: {
        city: "New York",
        country: "USA"
    }
};

const user2: User = {
    name: "Sample User"
};

const user1City = user1.address?.city ?? "Unknown";
const user1Country = user1.address?.country ?? "Unknown";

const user2City = user2.address?.city ?? "Unknown";
const user2Country = user2.address?.country ?? "Unknown";

console.log(`${user1.name} lives in ${user1City}, ${user1Country}`); // 출력: Test User lives in New York, USA
console.log(`${user2.name} lives in ${user2City}, ${user2Country}`); // 출력: Sample User lives in Unknown, Unknown
```

위 예제에서는 선택적 체이닝 (?.)을 사용하여 주소 객체의 중첩된 속성에 안전하게 액세스했습니다. 주소 또는 그 중첩된 속성 중 하나가 null 또는 정의되지 않은 경우, 표현식은 오류를 발생시키지 않고 undefined로 평가됩니다. 또한 누리 연산자 (??)를 사용하여 누락된 속성 또는 정의되지 않은 속성에 대한 기본값("Unknown")을 제공했습니다.
이 접근 방식을 사용하면 선택적 중첩된 속성을 간결하고 안전한 방식으로 처리하여 특정 속성이 제공되지 않은 경우에도 코드가 예측 가능하게 작동하도록 할 수 있습니다.

6. 유틸리티 타입: TypeScript는 다른 타입을 조작하는 데 사용할 수 있는 일련의 유틸리티 타입을 제공합니다. 일반적으로 사용되는 유틸리티 타입에는 Partial, Pick, Omit, Record, Exclude, Extract, NonNullable 등이 있습니다.

간단한 User 타입을 사용하여 유틸리티 타입을 사용하는 예제를 만들어보고 일부 유틸리티 타입을 시연해보겠습니다:




```js
type 사용자 = {
  id: number;
  username: string;
  email: string;
  age: number;
  isAdmin: boolean;
};

type 부분사용자 = Partial<사용자>;
const 부분사용자: 부분사용자 = { id: 4 };

type 선택된사용자 = Pick<사용자, "username" | "email">;
const 선택된사용자: 선택된사용자 = { username: "dave", email: "dave@example.com" };

type 제외된사용자 = Omit<사용자, "isAdmin">;
const 제외된사용자: 제외된사용자 = { id: 5, username: "eve", email: "eve@example.com", age: 22 };
```

위 예제에서는 다음의 유틸리티 타입을 사용했습니다 -

- `Partial<사용자>`는 선택적 속성을 가진 사용자 객체를 생성할 수 있습니다.
- `Pick<사용자, "username" | "email">`은 사용자의 username과 email 속성만 선택합니다.
- `Omit<사용자, "isAdmin">`은 사용자에서 isAdmin 속성을 제거합니다.

이를 통해 동일한 타입을 여러 번 정의하지 않고 코드를 재사용 가능하고 더 깔끔하게 만들 수 있습니다.



위에서 언급한 최상의 사례를 TypeScript 개발 워크플로에 통합함으로써 코드 품질, 유지 보수성 및 개발자 생산성을 더욱 향상시킬 수 있습니다. 이를 통해 더 나은 소프트웨어 솔루션을 제공할 수 있습니다.