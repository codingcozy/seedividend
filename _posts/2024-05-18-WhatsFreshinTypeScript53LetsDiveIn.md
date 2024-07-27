---
title: "TypeScript 53에 새로 추가된 내용 정리"
description: ""
coverImage: "/assets/img/2024-05-18-WhatsFreshinTypeScript53LetsDiveIn_0.png"
date: 2024-05-18 21:47
ogImage: 
  url: /assets/img/2024-05-18-WhatsFreshinTypeScript53LetsDiveIn_0.png
tag: Tech
originalTitle: "What’s Fresh in TypeScript 5.3: Let’s Dive In!"
link: "https://medium.com/@Evelyn.Taylor/whats-fresh-in-typescript-5-3-let-s-dive-in-cc2cf822012c"
---



![2024-05-18-WhatsFreshinTypeScript53LetsDiveIn_0](/assets/img/2024-05-18-WhatsFreshinTypeScript53LetsDiveIn_0.png)

자바스크립트로 작업 중인 상황을 상상해보세요. 이 언어는 유연하지만 때로는 까다로운 면이 있습니다.

타입스크립트는 코드를 실행하기 전에 실수를 잡아주는 일종의 보조 역할을 하는데요.

변수와 함수와 같은 요소들의 타입을 명시하는 방법을 추가함으로써 이를 수행합니다.


<div class="content-ad"></div>

그러니까, 흔한 오류를 미리 방지하는 데 넘어서 TypeScript는 테이블에 몇 가지 멋진 기능을 가져다 줍니다. 이것을 한 마디로 말하면, 오타를 만들 것 같을 때나 특정 사항을 확인을 잊었을 때 지적해주는 스마트한 친구가 있다고 생각해보세요. 하나 더, 코드를 작성하는 동안 당신을 도와주기도 합니다.

Visual Studio 또는 VS Code를 사용해 본 적이 있다면, 자동 완성, 코드 탐색, 코드를 더 깔끔하게 만드는 매력적인 부분이 TypeScript가 뒷담화로 작동하고 있다는 거죠.

호기심이 생겼고 TypeScript를 한 번 시도해 보고 싶다면, TypeScript를 사용하는 방법은 다음과 같습니다:

TypeScript를 시작해 보려면 NuGet을 사용하여 가져올 수 있고, npm 세계에 더 익숙하다면 다음 명령어를 입력해 보세요:

<div class="content-ad"></div>

```js
npm install -D typescript
```

# Import 속성

TypeScript 5.3에서 새로 추가된 멋진 기능 중 하나는 import 속성입니다. 이것들은 런타임에 가져온 항목들을 다루는 방법에 대한 특정 세부사항을 알려주는 작은 태그 같은 역할을 합니다.

예를 들어, JSON 파일을 가져올 때 이것이 JSON으로 처리되고 실행 가능한 JavaScript로 처리되지 않도록 하려면 다음과 같이 할 수 있습니다:


<div class="content-ad"></div>

```js
import obj from "./something.json" with { type: "json" };
```

이러한 속성은 TypeScript 자체에서 확인되지 않습니다. 대신 브라우저나 런타임이 따를 주석과 같습니다. 따라서 자유롭게 사용할 수 있지만, 무의미한 유형을 사용하여 브라우저를 혼란스럽게 하지 않도록 주의하십시오:

```js
import * as foo from "./foo.js" with { type: "fluffy bunny" };
```

동적 임포트인 import()로 만든 임포트도 이러한 임포트 속성을 사용할 수 있습니다:

<div class="content-ad"></div>

```javascript
const obj = await import("./something.json", {
    with: { type: "json" }
});
```

재밌는 점은 TypeScript가 예전 기능인 "import assertions"에서 이 새로운 import 속성으로 이동하고 있다는 것입니다.

이제 더 이상 assert 키워드를 사용하는 대신 with를 사용합니다. 이전 코드에 assert가 있는 경우, 새로운 문법인 with를 사용하도록 업데이트하는 것이 권장됩니다.

# Import 타입에서 버그 수정된 해상도 모드 안정성 지원


<div class="content-ad"></div>

현재는 Markdown 형식을 사용하고 있는 것 같네요. 예를 들어, 코드에서 타입 가져오기를 기존 require처럼 처리하거나 현대적인 import처럼 처리할지 결정할 때 사용하는 설정과 비슷한 거죠.

코드에서 타입 가져오기를 예전 방식인 require()처럼 처리하고 싶다면 다음과 같이 할 수 있어요:

```js
import type { TypeFromRequire } from "pkg" with {
    "resolution-mode": "require"
};
```

그리고 새로운 import 방식을 선호한다면, 이렇게 할 수도 있죠:

<div class="content-ad"></div>

```js
import type { TypeFromImport } from "pkg" with {
    "resolution-mode": "import"
};
```

하지만 여기에 멋진 부분이 있어요. 이 기능은 처음에 import 어써션에 사용할 수 없었는데요, 이는 모듈이 어떻게 처리되어야 하는지에 대한 힌트 같은 것입니다.

지금은 TypeScript 5.3에서 이 "resolution-mode" 속성을 import 타입에도 확장했습니다. 따라서, 이제 일반적인 import뿐만 아니라 import()를 사용하여 동적으로 타입을 끌어올 때에도 사용할 수 있어요.

여기에 더 실용적인 예시가 있습니다:

<div class="content-ad"></div>

```js
export type TypeFromRequire =
    import("pkg", { with: { "resolution-mode": "require" } }).TypeFromRequire;

export type TypeFromImport =
    import("pkg", { with: { "resolution-mode": "import" } }).TypeFromImport;

export interface MergedType extends TypeFromRequire, TypeFromImport {}
```

# resolution-mode All Module Modes에서 지원됩니다.

과거에는 node16 및 nodenext와 같은 특정 moduleResolution 옵션에서만 resolution-mode 마법을 사용할 수 있었습니다.

하지만 생각해보세요! TypeScript 5.3가 삶을 더 간단하게 만들어줍니다. 이제 bundler, node10 및 심지어 classic와 같은 모든 다른 moduleResolution 옵션과 함께 resolution-mode를 사용할 수 있습니다.

<div class="content-ad"></div>

더는 당신이 타입을 다루는 방식을 조정하고 싶어서 발생하는 오류가 더 이상 나타나지 않는다.

 TypeScript는 여러분이 원하는 모듈 모드에서 자유롭게 작업할 수 있도록 더 널널해졌어요. 멋지죠?

# switch (true) 좁히기

이제 true로 설정된 switch 문을 다룰 때, TypeScript가 각 case의 조건에 따라 타입을 똑똑하게 좁힐 수 있어요. 자세히 설명해 드릴게요.

<div class="content-ad"></div>

자, 이런 함수가 있다고 하자:

```js
function f(x: unknown) {
    switch (true) {
        case typeof x === "string":
            // 'x'은 여기서 'string'입니다.
            console.log(x.toUpperCase());
            // 계속 진행...

        case Array.isArray(x):
            // 'x'는 여기서 'string | any[]' 입니다.
            console.log(x.length);
            // 계속 진행...

        default:
            // 'x'는 여기서 'unknown'입니다.
            // ...
    }
}
```

여기서 하는 일은, 각 case의 조건에 따라 TypeScript가 'x'의 유형을 더 수월하게 파악하는 것입니다.

예를 들어, 'x'가 문자열이면, 그것을 알고 있으며, toUpperCase()와 같은 문자열 관련 작업을 수행할 수 있습니다. 배열인 경우에도 이해합니다.

<div class="content-ad"></div>

# 불리언에 대한 비교 좁히기

당신이 직접적으로 true 또는 false와 비교를 할 때를 말해요. 스타일적 이유이거나 JavaScript의 특징을 처리하기 위해서 명시적으로 무언가가 true인지 false인지 확인할 때 그렇습니다.

이전에 TypeScript는 이러한 비교를 인지하지 못했지만, 이제는 도와줄 준비가 되어 있어요. 한 예제로 보여드릴게요:

```js
interface A {
    a: string;
}

interface B {
    b: string;
}

type MyType = A | B;

function isA(x: MyType): x is A {
    return "a" in x;
}

function someFn(x: MyType) {
    if (isA(x) === true) {
        console.log(x.a); // TypeScript가 이해했어요!
    }
}
```

<div class="content-ad"></div>

그래, isA(x) === true를 보셨나요? TypeScript가 그것을 이해하고 if 블록 내에서 타입을 더 좁게 인식할 수 있게 되었습니다.

그래서 TypeScript가 불평하지 않고도 console.log(x.a)와 같은 작업을 자신 있게 수행할 수 있습니다.

# Symbol.hasInstance를 통한 좁히기

instanceof를 사용할 때, [Symbol.hasInstance]로 정의된 메서드를 고려하여 더 똑똑해졌습니다. 이는 사용자 정의 타입 가드를 사용하여 타입을 더 정확하게 좁힐 수 있게 되었다는 것을 의미합니다.

<div class="content-ad"></div>

예를 통해 설명해 드리겠습니다:

Point라는 클래스가 있다고 상상해 보세요. 이제 TypeScript를 사용하여 [Symbol.hasInstance]를 사용하여 해당 클래스에 특별한 메서드를 정의할 수 있습니다. 이 메서드에서는 Point와 유사한지를 확인하기 위한 사용자 지정 로직을 구현할 수 있습니다.

```js
class Point {
    static [Symbol.hasInstance](val: unknown): val is PointLike {
        // 여기에 사용자 정의 타입 가드 로직을 넣으세요
    }
}
```

그런 다음 코드에서 instanceof를 사용할 때 TypeScript는 사용자 정의 타입 가드를 인식하고 활용할 수 있습니다. 예를 들면:

<div class="content-ad"></div>

```ts
function f(value: unknown) {
    if (value instanceof Point) {
        // Now, you can access properties defined in PointLike,
        // but you won't have access to specific Point methods or properties.
    }
}
```

그래서 이 기능은 기본적으로 TypeScript가 사용자 정의 유형 확인을 정말 이해하고 유형을 더 정확하게 좁힐 수 있도록 합니다.

# 인스턴스 필드에서 수퍼 속성 액세스를 위한 검사

클래스를 다룰 때 기반 클래스에서 메서드에 접근하기 위해 super 키워드를 사용할 수 있습니다. 이것은 "이 클래스에서 상속 받은 클래스로부터 메서드를 가져오게 해줘"라는 방식입니다.


<div class="content-ad"></div>

예를 들어:

```js
class Base {
    someMethod() {
        console.log("베이스 메서드 호출됨!");
    }
}

class Derived extends Base {
    someMethod() {
        console.log("파생 메서드 호출됨!");
        super.someMethod();
    }
}

new Derived().someMethod();
// 출력:
//   파생 메서드 호출됨!
//   베이스 메서드 호출됨!
```

따라서 super.someMethod()은 베이스 클래스에서 메서드를 특별히 얻는 방법임을 알 수 있습니다.

이제 여기가 tricky한 부분입니다. 클래스 필드(전체의 속성)를 다룬다면, 동일한 방식으로 super를 사용하는 것이 예상대로 작동하지 않을 수 있습니다. TypeScript 5.3는 이를 잘 파악하여 경고를 제공합니다.

<div class="content-ad"></div>

여기 예시가 있어요:

```js
class Base {
    someMethod = () => {
        console.log("someMethod called!");
    }
}

class Derived extends Base {
    someOtherMethod() {
        super.someMethod(); // 이제 오류가 발생할 거예요!
    }
}

new Derived().someOtherMethod();
// 💥
// 'super.someMethod'이 'undefined'이기 때문에 작동하지 않아요.
```

그래서 TypeScript 5.3은 super를 사용하여 무언가에 접근할 때 그것이 클래스 필드인지 확인해요. 그게 맞다면, super를 통해 접근하려고 하면 TypeScript가 런타임 오류에 부딪히기 전에 멈춰줄 거예요. 코드에 잠입하는 교묘한 버그를 막기 위해 친구가 코드를 한 번 더 확인해주는 것 같죠!

# 자동 Imports 유형을 선호하는 설정

<div class="content-ad"></div>

자동으로 타입에 대한 import를 추가할 때, 이전에는 사용자 설정을 기반으로 했습니다. 예를 들어, Person이라는 타입이 있는 경우:

```js
export let p: Person;
```

TypeScript는 보통 다음과 같이 import를 추가했을 것입니다:

```js
import { Person } from "./types";

export let p: Person;
```

<div class="content-ad"></div>

하지만 설정에 따라 다를 수 있습니다. 예를 들어, verbatimModuleSyntax와 같은 특정 설정이 있는 경우에는 type 수정자를 추가할 수도 있습니다:

```js
import { type Person } from "./types";

export let p: Person;
```

이제 TypeScript는 더 많은 제어권을 제공합니다. 특정한 선호도가 있거나 코드베이스에서 특정 옵션을 사용할 수 없는 경우, 가능한 경우에는 항상 명시적인 타입 가져오기를 설정할 수 있습니다. 이는 "안녕 TypeScript, 이렇게 해 달라고 말했어, 깜짝 놀라지 말고"라고 말하는 것과 같습니다. 그래서 TypeScript를 자신이 원하는 방식으로 작동하도록 만드는 것입니다.

# TypeScript 5.3에서 몇 가지 최적화가 소개되었습니다:

<div class="content-ad"></div>

우선, JSDoc 파싱을 스킵하고 있습니다. 이는 TypeScript가 JSDoc에 불필요한 시간과 메모리를 소비하지 않아 컴파일 속도를 높일 수 있음을 의미합니다.

특히 변경 사항이 빈번한 감시 모드에서 이 점이 특히 두드러집니다. 게다가, 이 개선은 TypeScript 자체뿐만 아니라 typescript-eslint와 Prettier와 같은 도구들도 이 속도 및 메모리 향상으로 이점을 얻을 수 있습니다.

또한, TypeScript가 교차(intersections)를 처리하는 방식에 최적화가 있습니다. 이는 TypeScript가 유니언과 교차에서 특히 타입을 비교하는 데 능숙해지고 있는 것과 같습니다.

원본 교차형식을 살펴보면, 이제 더 빠르게 확인할 수 있어 타입 평가가 더 효율적으로 이루어집니다.

<div class="content-ad"></div>

마지막으로 TypeScript는 tsserverlibrary.js 및 typescript.js 라이브러리 파일을 합치면서 봄철처럼 청소를 하고 있어요.

중복을 줄이고 일관성을 높이기 위해 이들을 결합하고 있습니다.

이렇게 하면 API 사용이 보다 간소화되며 자원 사용량이 감소하는데 도움이 됩니다. 모든 것이 제 자리에 있고 원활하게 작동되도록 집을 정리하는 것과 같아요.

자세한 변경 사항에 대한 내용은 여기에서 확인할 수 있는 완전한 릴리스 로그를 참조해 주세요.

<div class="content-ad"></div>

제 Medium 페이지와 연결해 보세요! ✍ : https://medium.com/@Evelyn.Taylor