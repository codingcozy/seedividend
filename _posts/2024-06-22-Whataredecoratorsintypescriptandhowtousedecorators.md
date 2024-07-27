---
title: "TypeScript 데코레이터란 무엇이며, 데코레이터를 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-Whataredecoratorsintypescriptandhowtousedecorators_0.png"
date: 2024-06-22 14:46
ogImage: 
  url: /assets/img/2024-06-22-Whataredecoratorsintypescriptandhowtousedecorators_0.png
tag: Tech
originalTitle: "What are “decorators” in typescript and how to use “decorators”?"
link: "https://medium.com/@InspireTech/what-are-decorators-in-typescript-and-how-to-use-decorators-d82d15c5851f"
---


`<img src="/assets/img/2024-06-22-Whataredecoratorsintypescriptandhowtousedecorators_0.png" />`

데코레이터는 클래스 선언, 메소드, 접근자, 속성 또는 매개변수에 첨부할 수 있는 특별한 선언 유형입니다. 데코레이터는 @expression 형식으로 사용되며, expression은 데코레이트된 선언에 대한 정보를 런타임에 호출할 함수로 평가되어야 합니다.

Typescript 5.0부터 Stage 3 데코레이터 지원이 가능합니다.

## 데코레이터 사용 방법:

<div class="content-ad"></div>

데코레이터에 대한 실험적인 지원을 활성화하려면 명령줄에서 tsc --target ES5 --experimentalDecorators를 사용하거나 tsconfig.json에서 experimentalDecorators 컴파일러 옵션을 활성화해야 합니다:

```js
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

사용자 클래스에 greet 메서드가 있는 경우를 고려해보세요.

```js
class User {
  constructor(private name: string, private age: number) {}

  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }

  printAge() {
    console.log(`I am ${this.age} years old`);
  }
}

const user = new User("Ron", 25);
user.greet();
user.printAge();

출력:
Hello, my name is Ron.
I am 25 years old
```

<div class="content-ad"></div>

이제 각 함수 실행이 시작하고 끝나는 시점을 기록하고 싶어요:

```js
class User {
  constructor(private name: string, private age: number) {}

  greet() {
    console.log('start: greet')
    console.log(`Hello, my name is ${this.name}.`);
    console.log('end: greet')
  }

  printAge() {
    console.log('start: printAge')
    console.log(`I am ${this.age} years old`);
    console.log('end: printAge')
  }
}

const user = new User("Ron", 25);
user.greet();
user.printAge();



Output: 
start: greet
Hello, my name is Ron.
end: greet
start: printAge
I am 25 years old
end: printAge
```

데코레이터를 만드는 것은 정말 쉬워요: logger라는 함수를 만들기만 하면 돼요:

```js
function logger(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log("start:", originalMethod.name);
    const result = originalMethod.call(this, ...args);
    console.log("end:", originalMethod.name);
    return result;
  }

  return replacementMethod;
}
```

<div class="content-ad"></div>

이제 메소드를 꾸밈을 준비했어요. 위의 예시에서 데코레이터를 사용해봅시다:

```js
class User {
  constructor(private name: string, private age: number) {}

  @logger
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }

  @logger
  printAge() {
    console.log(`I am ${this.age} years old`);
  }
}

const user = new User("Ron", 25);
user.greet();
user.printAge();



Output: 
start: greet
Hello, my name is Ron.
end: greet
start: printAge
I am 25 years old
end: printAge
```

쉽죠? TypeScript는 여러 데코레이터를 지원합니다:

<div class="content-ad"></div>

```js
  @logger
  @xyz
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
```

여러 개의 데코레이터가 적용될 때 실행 순서를 살펴봅시다.

```js
class User {
  constructor(private name: string, private age: number) {}

  @logger2
  @logger1
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const user = new User("Ron", 25);
user.greet();


function logger1(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log("log1");
    const result = originalMethod.call(this, ...args);
    return result;
  }

  return replacementMethod;
}

function logger2(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log("log2");
    const result = originalMethod.call(this, ...args);
    return result;
  }

  return replacementMethod;
}





Output: 
log2
log1
Hello, my name is Ron.
```

하나의 선언에 여러 데코레이터가 적용되면, 그 평가는 수학의 함수 합성과 유사합니다. 이 모델에서 함수 f와 g를 합성할 때, 결과 컴포지트(f ∘ g)(x)는 f(g(x))와 동등합니다.

<div class="content-ad"></div>

올바른 형식의 데코레이터 예제:

```js
function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
```

## 데코레이터 유형:

## 1. 클래스 데코레이터

<div class="content-ad"></div>

클래스 데코레이터는 클래스 선언 바로 전에 선언됩니다. 클래스 데코레이터는 클래스의 생성자에 적용되며, 클래스 정의를 관찰, 수정 또는 대체하는 데 사용할 수 있습니다. 클래스 데코레이터는 선언 파일이나 다른 주변 컨텍스트(예: 선언 클래스에 대해)에서 사용할 수 없습니다.

클래스 데코레이터의 표현식은 실행 시에 생성된 클래스의 생성자를 유일한 인수로하여 함수로 호출됩니다.

클래스 데코레이터가 값을 반환하면 제공된 생성자 함수로 클래스 선언이 대체됩니다. "새로운 생성자 함수를 반환하려면 원본 프로토 타입을 유지해야 합니다. 런타임에서 데코레이터를 적용하는 로직이 자동으로 처리해주지 않습니다."

여기에는 클래스 데코레이터를 사용하여 created 속성을 설정하려는 예제가 있습니다.

<div class="content-ad"></div>

```js
class User {
  [x: string]: any;
  constructor(public name: string) {}
}

const user = new User('John')
console.log(user.name, user.created)

// 출력:
John undefined
```

클래스 데코레이터를 사용한 예시

```js
@BaseEntity
class User {
  [x: string]: any;
  constructor(public name: string) {}
}

function BaseEntity(ctr: Function) {
  ctr.prototype.created = new Date().toISOString();
}

const user = new User('John')
console.log(user.name, user.created)
```

## 2. 메소드 데코레이터

<div class="content-ad"></div>

메소드 데코레이터는 메소드 선언 바로 전에 선언됩니다. 데코레이터는 해당 메소드의 속성 설명자에 적용되며, 메소드 정의를 관찰, 수정 또는 교체하는 데 사용할 수 있습니다. 메소드 데코레이터는 선언 파일에서, 오버로드에서, 또는 기타 환경에서 (예: 선언 클래스 내) 사용할 수 없습니다. 이미 메소드 데코레이터 예제를 보았으므로 추가적인 자세한 내용은 다루지 않겠습니다:

```js
class User {
  constructor(private name: string, private age: number) {}

  @logger
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }

  @logger
  printAge() {
    console.log(`I am ${this.age} years old`);
  }
}

const user = new User("Ron", 25);
user.greet();
user.printAge();

여러분의 프로젝트 블랙핑크에 오신 것을 환영합니다!

출력:
start: greet
Hello, my name is Ron.
end: greet
start: printAge
I am 25 years old
end: printAge
```

## 3. 접근자 데코레이터

접근자 데코레이터는 접근자 선언 바로 전에 선언됩니다. 접근자 데코레이터는 해당 접근자의 속성 설명자에 적용되며, 접근자의 정의를 관찰, 수정 또는 교체하는 데 사용할 수 있습니다. 접근자 데코레이터는 선언 파일이나 기타 환경 (예: 선언 클래스 내)에서 사용할 수 없습니다.

<div class="content-ad"></div>

액세서 데코레이터의 표현은 런타임에서 다음 세 가지 인수와 함께 함수로 호출될 것입니다:

- 정적 멤버의 경우 클래스의 생성자 함수 또는 인스턴스 멤버의 경우 클래스의 프로토타입.
- 멤버의 이름.
- 멤버의 속성 설명자(Property Descriptor).

액세서 데코레이터가 값을 반환하면 해당 값은 멤버의 속성 설명자로 사용됩니다.

다음은 Point 클래스의 멤버에 적용된 액세서 데코레이터 예시(@configurable)입니다:

<div class="content-ad"></div>

```typescript
class Point {
  private _x: number;
  constructor(x: number, y: number) {
    this._x = x;
  }

  @configurable(false)
  get x() {
    return this._x;
  }
}

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}
```

## 4. Property Decorators

프로퍼티 데코레이터는 프로퍼티 선언 바로 전에 선언됩니다. 프로퍼티 데코레이터는 선언 파일이나 다른 환경(context)에서 사용할 수 없습니다(예: declare class 내에서).

프로퍼티 데코레이터의 표현식은 런타임 시 함수로 호출되며 아래 두 인수를 전달받습니다:

<div class="content-ad"></div>

- 정적 멤버의 클래스 생성자 함수이거나 인스턴스 멤버의 클래스 프로토타입입니다.
- 멤버의 이름입니다.

TypeScript에서 속성 데코레이터의 예시를 제공합니다. 이 데코레이터는 속성의 값이 유효한 이메일 주소인지를 확인합니다:

```js
// 이메일 유효성 검사를 위한 속성 데코레이터
function ValidateEmail(target: any, propertyKey: string) {
  const privateFieldName = `_${propertyKey}`;

  // 원래의 setter 메서드를 저장합니다.
  const originalSetter = Object.getOwnPropertyDescriptor(target, propertyKey)?.set;

  // 속성을 위한 새로운 setter를 정의합니다.
  const newSetter = function (value: any) {
    if (!isValidEmail(value)) {
      throw new Error(`"${propertyKey}" 속성에 대한 유효하지 않은 이메일 주소입니다.`);
    }
    this[privateFieldName] = value;
  };

  // 속성의 setter 메서드를 대체합니다.
  Object.defineProperty(target, propertyKey, {
    set: newSetter,
    get() {
      return this[privateFieldName];
    },
    enumerable: true,
    configurable: true,
  });
}

// 이메일 주소 유효성을 검사하는 도우미 함수
function isValidEmail(email: string): boolean {
  // 간단한 이메일 유효성을 위한 정규 표현식
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

class User {
  @ValidateEmail
  email: string = 'test@example.com';

  constructor(email: string) {
    this.email = email;
  }
}

const user = new User('john@example.com');

console.log(user.email); // john@example.com

try {
  user.email = 'invalid-email'; // 오류가 발생합니다.
} catch (error) {
  console.error(error.message); // "email" 속성에 대한 유효하지 않은 이메일 주소입니다.
}

// 출력:
john@example.com
"email" 속성에 대한 유효하지 않은 이메일 주소입니다.
```

- 우리는 속성 데코레이터 ValidateEmail을 정의하여 할당된 값이 유효한 이메일 주소인지 확인합니다.
- newSetter 함수는 제공된 값이 유효한 이메일 주소인지 확인합니다. 그렇지 않으면 오류를 발생합니다.
- User 클래스의 email 속성에 @ValidateEmail 데코레이터를 적용합니다.
- User의 인스턴스를 만들 때 email 속성을 유효한 이메일 주소로 설정하면 예상대로 작동합니다.
- email 속성을 유효하지 않은 이메일 주소(예: `invalid-email`)로 설정하려고 하면 데코레이터가 유효하지 않은 이메일 주소임을 나타내는 오류를 throw합니다.

<div class="content-ad"></div>

## 5. 매개변수 데코레이터

매개변수 데코레이터는 매개변수 선언 바로 전에 선언됩니다. 매개변수 데코레이터는 클래스 생성자나 메서드 선언에 적용됩니다. 매개변수 데코레이터는 선언 파일, 오버로드 또는 다른 ambient context(declare class 내에도)에서 사용할 수 없습니다.

매개변수 데코레이터의 표현식은 런타임에 함수로 호출되며 다음 세 가지 인수와 함께 호출됩니다:

- 정적 멤버의 경우 클래스의 생성자 함수 또는 인스턴스 멤버의 경우 클래스의 프로토타입.
- 멤버의 이름.
- 함수의 매개변수 목록에서 매개변수의 순서 인덱스.

<div class="content-ad"></div>

파라미터 데코레이터의 반환 값은 무시됩니다.

다음은 간단한 정규 표현식을 사용하여 메서드 파라미터가 유효한 이메일 주소인지를 확인하는 파라미터 데코레이터의 예시입니다:

```js
// 이메일 유효성 검사를 위한 파라미터 데코레이터
function ValidateEmail(target: any, methodName: string, parameterIndex: number) {
  const originalMethod = target[methodName];

  target[methodName] = function (...args: any[]) {
    const paramValue = args[parameterIndex];

    // 간단한 이메일 유효성을 위한 정규 표현식
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(paramValue)) {
      throw new Error(`파라미터 인덱스 ${parameterIndex}의 유효하지 않은 이메일 주소가 제공되었습니다`);
    }

    return originalMethod.apply(this, args);
  };
}

class ExampleClass {
  // 이메일 파라미터를 검증하기 위해 파라미터 데코레이터를 적용
  sendEmail(@ValidateEmail email: string) {
    console.log(`${email}로 이메일을 보냅니다`);
  }
}

const exampleInstance = new ExampleClass();

// 작동합니다
exampleInstance.sendEmail("example@email.com");

// 이메일 유효성 검사로 오류가 발생합니다
try {
  exampleInstance.sendEmail("invalid-email");
} catch (error) {
  console.error(error.message); // 파라미터 인덱스 0에 유효하지 않은 이메일 주소가 제공되었습니다
}
```

- ValidateEmail이라는 이름의 파라미터 데코레이터를 정의하고, 정규 표현식을 사용하여 제공된 파라미터가 유효한 이메일 주소인지 확인합니다.
- sendEmail 메서드를 가진 ExampleClass 클래스를 만들고, email 파라미터를 검증하기 위해 @ValidateEmail 데코레이터를 적용합니다.
- sendEmail 메서드를 호출할 때, 제공된 이메일 파라미터가 이메일 유효성 정규 표현식과 일치하는지 확인합니다. 일치하지 않으면 오류를 throw합니다.
- 유효한 이메일로 한 번, 그리고 유효하지 않은 이메일을 주면 이메일 유효성 오류가 발생하는 두 가지 sendEmail 메서드 호출을 보여줍니다.

<div class="content-ad"></div>

이 예제는 메서드 매개변수의 간단한 이메일 유효성 검사를 수행하기 위해 매개변수 데코레이터를 사용하는 방법을 보여줍니다. 특정 요구 사항에 따라 정규 표현식을 조정하거나 필요에 따라 더 복잡한 이메일 유효성 검사 로직을 추가할 수 있습니다.

## TypeScript의 데코레이터는 코드의 여러 부분을 수정하거나 동작을 추가하는 강력한 메커니즘을 제공합니다. 데코레이터의 일반적인 사용 사례는 다음과 같습니다:

- 로깅 및 디버깅: 메서드 호출, 함수 매개변수 또는 속성 액세스를 기록하여 디버깅에 도움을 줄 수 있습니다.
- 유효성 검사: 데코레이터는 입력 유효성 검사에 사용될 수 있으며, 함수 매개변수나 속성 값이 특정 기준이나 제약 조건을 충족하는지 확인할 수 있습니다.
- 메모이제이션: 데코레이터를 사용하여 함수 결과를 캐시함으로써 입력 매개변수에 따라 함수를 캐싱하여 비용이 많이 드는 계산의 성능을 향상시킬 수 있습니다.
- 인증 및 권한 부여: 데코레이터를 사용하여 웹 애플리케이션의 특정 메서드나 라우트에 액세스할 수 있는 전에 사용자 인증 또는 권한을 확인할 수 있습니다.
- 의존성 주입: Angular과 같은 프레임워크에서 데코레이터를 사용하여 클래스나 컴포넌트에 주입할 서비스를 지정할 수 있습니다.
- 라우트 처리 (웹 애플리케이션): Express.js 또는 Nest.js와 같은 웹 프레임워크에서 데코레이터를 사용하여 HTTP 엔드포인트의 라우트와 요청 핸들러를 정의할 수 있습니다.
- 데이터 변환: 처리되기 전에 데이터를 변환하기 위해 데코레이터를 사용할 수 있습니다.
- 캐싱: 데코레이터를 사용하여 데이터 검색 메서드를 캐싱함으로써 외부 데이터 소스에 부하를 줄일 수 있습니다.
- 시간 측정 및 프로파일링: 함수의 실행 시간을 측정할 수 있습니다.
- 로깅 프레임워크: 사용 사례에서 데코레이터는 특정 이벤트나 작업을 로깅하기 위해 메서드에 적용될 수 있습니다.
- 유효성 검사 프레임워크: 데이터가 특정 규칙이나 제약 조건을 준수하는지 확인하기 위해 사용자 정의 유효성 검사 데코레이터를 생성할 수 있습니다.
- 데이터베이스 매핑: Object-Relational Mapping (ORM) 라이브러리에서 데코레이터는 클래스 프로퍼티와 데이터베이스 열을 매핑하는 데 사용됩니다.
- 속성 액세스 제어: 데코레이터를 사용하여 클래스 속성에 액세스 제어 정책을 강제할 수 있습니다.
- 싱글톤 패턴: 데코레이터를 사용하여 싱글톤 디자인 패턴을 구현할 수 있습니다.
- 사용자 지정 미들웨어: 웹 프레임워크에서 데코레이터는 메인 요청 핸들러 앞이나 뒤에서 실행될 사용자 정의 미들웨어 함수를 생성하는 데 사용될 수 있습니다.
- 국제화와 지역화: 텍스트 속성이나 메서드에 데코레이터를 적용하여 언어 번역 및 지역화를 처리할 수 있습니다.
- 오류 처리: 예외를 일관되게 처리하기 쉽게 하기 위해 중앙 집중식 오류 처리 논리를 데코레이터로 사용할 수 있습니다.
- 이벤트 처리: 특정 이벤트에 대한 이벤트 리스너와 핸들러를 등록하는 데 사용될 수 있습니다.
- 유형 확인 및 변환: 데이터가 예상된 유형과 형식에 맞는지 확인하기 위해 유형 확인 및 데이터 변환을 수행할 수 있습니다.
- 사용자 정의 어노테이션: 클래스, 메서드 또는 속성에 대한 추가 정보를 제공하기 위한 사용자 지정 어노테이션 또는 메타데이터를 만들 수 있습니다.

이것들은 TypeScript에서 데코레이터의 많은 사용 사례 중 일부에 불과합니다. 데코레이터는 클래스, 메서드 및 속성의 기능을 향상시키는 유연하고 확장 가능한 방법을 제공하여 코드를 더 모듈화되고 유지보수 가능하게 만듭니다.