---
title: "TS Types와 Interfaces를 사용하는 방법 및 시기"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-TSWhentouseTypesandwhentouseInterfaces_0.png"
date: 2024-07-02 21:53
ogImage:
  url: /TIL/assets/img/2024-07-02-TSWhentouseTypesandwhentouseInterfaces_0.png
tag: Tech
originalTitle: "TS: When to use Types and when to use Interfaces"
link: "https://medium.com/@a.kago1988/ts-when-to-use-types-and-when-to-use-interfaces-561e8cab2166"
---

TypeScript를 처음 접했을 때 인터페이스와 타입이 서로 교환 가능해 보일 수 있습니다, 특히 객체 모양을 설명할 때입니다. 실제로 TPerson 및 IPerson을 모두 가져오는 코드를 볼 수 있는데, 이는 둘 다 클래스 또는 객체 구조를 정의할 수 있다는 것을 시사합니다. 이 명백한 유사성은 각각을 사용해야 할 때에 대한 혼란을 야기할 수 있습니다.

그러나 중요한 차이가 존재합니다: 인터페이스는 객체 및 클래스를 설명하는 데 사용되지만, 타입은 어떤 유형의 데이터 구조든 표현할 수 있습니다. 이 기본적인 대조는 TypeScript 프로젝트에서 각각을 언제 사용해야 할지에 대한 기준을 마련합니다.

# 명백한 유사성

다음과 같이 보이는 동등한 정의를 고려해보세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
interface IPerson {
  name: string;
  age: number;
}

type TPerson = {
  name: string,
  age: number,
};

const person1: IPerson = { name: "Alice", age: 30 };
const person2: TPerson = { name: "Bob", age: 25 };
```

IPerson과 TPerson은 둘 다 이름과 나이 속성을 가진 객체를 설명할 수 있지만, 그 기능은 여기서부터 다릅니다.

# 인터페이스: 클래스 제한을 위한 전문가

TypeScript의 인터페이스는 특정 목적에 맞게 설계되었습니다: 객체와 클래스의 형태를 설명하는 데 사용됩니다. 원시 값의 별칭을 만들거나, 결합 유형 또는 교차 유형을 생성하는 데 사용할 수 없습니다. 이 특화된 기능은 인터페이스를 객체지향 프로그래밍 시나리오에서 특히 강력하게 만듭니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

TypeScript을 공부할 때 인터페이스와 타입의 차이를 이해하는 것이 중요합니다. 기억해야 할 주요 차이는 인터페이스는 객체와 클래스를 설명하는 데만 사용되지만, 타입은 어떤 종류의 데이터 구조든 나타낼 수 있다는 점입니다. 이 기본적인 대조는 TypeScript 프로젝트에서 각각을 언제 어떻게 사용해야 하는지를 결정합니다.

인터페이스의 주요 장점은 다음과 같습니다:

- 객체 모양 정의: 인터페이스는 객체가 특정 구조를 준수하는지 확실하게 보장하는 방법을 제공합니다.
- 확장성: 인터페이스를 확장할 수 있어 복잡한 객체 유형을 시간이 지남에 따라 발전시키는 데 이상적입니다.
- 클래스 구현: implements 키워드를 이용하여 클래스를 제한하고 인터페이스 계약을 준수하도록 함으로써 코드의 견고성을 향상시킵니다.

간단한 예시를 살펴보겠습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
interface IAnimal {
  name: string;
  age: number;
  speak(): void;
}

class Dog implements IAnimal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log("Woof!");
  }
}
```

그리고 여기에 `extends` 키워드를 잘 활용한 예제가 있어요.

```js
interface IAnimal {
  name: string;
  speak(): void;
}

interface IDog extends IAnimal {
  breed: string;
  wagTail(): void;
}

class Dog implements IDog {
  name: string;
  breed: string;

  constructor(name: string, breed: string) {
    this.name = name;
    this.breed = breed;
  }

  speak() {
    console.log("Woof!");
  }

  wagTail() {
    console.log(`${this.name}가 꼬리를 흔들고 있어요.`);
  }
}

const myDog = new Dog("Buddy", "Labrador");
myDog.speak();
myDog.wagTail();
```

주의하셔야 할 점은 아래의 문법이 객체를 제한하는 경우에서는 클래스가 아닌 객체를 제한하는 경우에만 맞는 구문이에요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```typescript
인터페이스 IPerson {
  이름: 문자열;
  나이: 숫자;
}

상수 person1: IPerson = { 이름: "Alice", 나이: 30 };
```

# 타입: 다재다능한 파워하우스

인터페이스는 객체 모양에만 제한되지만, 타입은 더 다양한 가능성을 제공합니다:

- 다재다능성: 타입은 객체뿐만 아니라 기본 유형, 유니온, 교차, 튜플 등을 대표할 수 있습니다.
- 복잡한 타입 작성: 유니언(|) 및 교차(&) 연산자로 타입을 정교하게 정의할 수 있습니다.
- 별칭: 타입 별칭은 복잡한 타입에서 코드 가독성을 높일 수 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 예제 입니다:

```js
type TName = string;
type TAge = number;

type TPerson = {
  name: TName,
  age: TAge,
};

type TAnimal = {
  name: string,
  age: number,
  speak(): void,
};

type TDog = TAnimal & { breed: string };

const myDog: TDog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever",
  speak() {
    console.log("Woof!");
  },
};
```

# 인터페이스와 유형 사이 선택하기

각각의 한계와 강점을 이해하고, 다음 권장 사항을 고려해보세요:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Interfaces를 사용하는 경우:

  - 오브젝트나 클래스와 작업할 때
  - 오브젝트가 지켜야 하는 계약을 정의할 때
  - 오브젝트 정의를 확장하거나 병합해야 할 때

- Types를 사용하는 경우:
  - 오브젝트를 포함한 모든 종류의 타입 정의를 생성할 때
  - 유니언, 교차 또는 기본형과 작업할 때
  - 타입 생성에서 최대 유연성이 필요할 때

# 결론

TypeScript에서의 인터페이스와 타입의 차이는 분명합니다: 인터페이스는 오브젝트 형태를 설명하는 데 특화되어 있고, 타입은 모든 종류의 타입 정의에 대해 더 큰 유연성을 제공합니다. 이 기본적인 차이를 이해하면 TypeScript 프로젝트에서 보다 정보를 얻고 더 나은 결정을 내릴 수 있습니다.

인터페이스는 클래스 기반 시나리오에서 뛰어나며, 오브젝트 구조의 일관성을 보장해야 하는 경우에 유용합니다. 타입은 그들의 다양성으로 인해 복잡한 정의와 다양한 데이터 구조에 대한 가독성 향상에 필요한 도구입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

마지막으로, 클래스와 타입을 제한하는 데 인터페이스를 사용하고 그 외에는 거의 모든 것에 인터페이스를 사용해야 합니다. 이렇게 하면 더 표현력이 뛰어나고 유지보수하기 쉽고 견고한 TypeScript 코드를 작성할 수 있습니다. 기억하세요, 이 도구들을 사용하여 시간이 지나도 유지할 수 있는 명확하고 자기 설명적인 코드를 작성하는 것이 목표입니다.
