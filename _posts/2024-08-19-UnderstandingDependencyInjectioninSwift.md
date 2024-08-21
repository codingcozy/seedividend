---
title: "스위프트에서 의존성 주입Dependency Injection 이해하기"
description: ""
coverImage: "/assets/img/2024-08-19-UnderstandingDependencyInjectioninSwift_0.png"
date: 2024-08-19 03:27
ogImage:
  url: /assets/img/2024-08-19-UnderstandingDependencyInjectioninSwift_0.png
tag: Tech
originalTitle: "Understanding Dependency Injection in Swift"
link: "https://medium.com/@harshaag99/understanding-dependency-injection-in-swift-4f5ed2c66019"
isUpdated: true
updatedAt: 1724032972018
---

![Dependency Injection](/assets/img/2024-08-19-UnderstandingDependencyInjectioninSwift_0.png)

# 의존성 주입이란?

커피숍을 운영한다고 상상해봅시다. 최고의 커피를 만들고 싶으므로 바리스타를 고용하고 커피 머신을 구입하고 커피 원두를 비축합니다. 새 지점을 열 때마다 이 작업을 반복해야 합니다. 바리스타를 구하고 머신을 사야 합니다.

그러나 그 대신 각 지점마다 최고의 커피 머신, 원두 및 훈련받은 바리스타를 공급하는 공급업체가 있다면 어떨까요? 이렇게 하면 많은 시간이 절약되며 모든 지점이 동일한 고품질을 보장받을 수 있습니다.

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

프로그래밍에서 이는 의존성 주입(Dependency Injection, DI)과 유사합니다. 여러분의 클래스가 필요로 하는 객체를 생성(또는 "소유")하는 대신, 이러한 객체들을 클래스로 전달하게 됩니다. 이렇게 하면 코드를 관리하고 테스트하며 업데이트하기가 더 쉬워집니다.

# Swift에서는 어떻게 작동하나요?

Swift에서 DI는 여러 가지 방법으로 수행할 수 있지만, 그중에서도 가장 일반적인 두 가지 방법은 다음과 같습니다:

1. 생성자 주입(Constructor Injection): 의존성을 클래스의 이니셜라이저(생성자)를 통해 전달합니다.

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

```js
class CoffeeShop {
    let barista: Barista
    let coffeeMachine: CoffeeMachine

    init(barista: Barista, coffeeMachine: CoffeeMachine) {
        self.barista = barista
        self.coffeeMachine = coffeeMachine
    }

    func makeCoffee() {
        // Use barista and coffeeMachine to make coffee
    }
}
```

여기에서 CoffeeShop 클래스는 자체 Barista 또는 CoffeeMachine을 만들지 않습니다. 초기화될 때 제공됩니다. 이렇게하면 CoffeeShop 자체를 변경하지 않고도 다른 바리스타나 기계를 교체할 수 있습니다.

2. 속성 주입: 객체 생성 후에 속성을 사용하여 종속성을 설정합니다.

```js
class CoffeeShop {
    var barista: Barista?
    var coffeeMachine: CoffeeMachine?

    func makeCoffee() {
        // 종속성이 설정되었는지 확인
        guard let barista = barista, let coffeeMachine = coffeeMachine else {
            print("Dependencies not set")
            return
        }

        // barista와 coffeeMachine을 사용하여 커피를 만듭니다.
    }
}
```

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

이 방식은 Swift에서는 덜 흔하지만 의존성 설정을 지연시키고 싶을 때 유용할 수 있습니다.

# 실생활 비유

영화 감독을 생각해보세요. 감독이 배우를 고용하고 카메라를 구하고 스튜디오를 빌리는 대신, 이 모든 것을 위해 편성을 마친 프로듀서와 함께 일합니다. 감독은 영화 제작에 집중할 수 있고 모든 부분을 함께 모으느라 시간을 쏟지 않아도 됩니다. 프로듀서가 이러한 의존성을 "주입"합니다.

# 왜 의존성 주입을 사용해야 할까요?

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

- 유연성: 다른 구현을 간단히 교체할 수 있습니다. 만약 다른 커피 머신을 사용하고 싶다면, CoffeeShop을 생성할 때 다른 머신을 제공하기만 하면 됩니다.
- 테스트 용이성: 테스트 중에 mock이나 가짜 의존성을 전달할 수 있습니다. 예를 들어, CoffeeShop에 특정한 방식으로 동작하는 테스트용 Barista를 전달하여 상점이 올바르게 작동하는지 쉽게 확인할 수 있습니다.

# 예외 상황

1. 순환 의존성: 두 클래스가 서로 의존할 때 DI가 복잡해질 수 있습니다. 두 친구가 서로 계속 돈을 빌려주는 상황을 상상해보세요. 어느 시점에서 누군가는 사이클을 시작할 돈을 갖고 있어야 합니다. 코드에서는 이러한 루프를 피하도록 설계를 다시 생각해야 합니다.

```swift
class A {
    var b: B?

    init(b: B?) {
        self.b = b
    }
}

class B {
    var a: A?

    init(a: A?) {
        self.a = a
    }
}
```

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

- In this case, A와 B는 서로 의존하게 되어 복잡성이 발생합니다.

2. Over-Injection: 클래스가 너무 많은 의존성을 갖게 되면 관리하고 이해하기 어려워집니다. 너무 많은 재료를 다뤄야 하는 요리사를 상상해보세요 — 상황이 금방 엉망이 될 수 있습니다.

# 실패 시나리오

1. Missing Dependencies: 의존성을 제공하는 것을 잊어버리면 해당 클래스가 충돌하거나 제대로 작동하지 않을 수 있습니다. CoffeeShop 예시를 사용하면, 커피 머신을 제공하는 것을 잊으면 상점이 커피를 만들 수 없습니다.

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

시나리오: 필요한 의존성이 제공되지 않아 충돌이 발생하거나 예기치 않은 동작이 발생합니다.

예시: CoffeeShop 클래스에 CoffeeMachine을 제공하는 것을 잊었다고 상상해보세요.

```js
class CoffeeShop {
    let barista: Barista
    let coffeeMachine: CoffeeMachine?

    init(barista: Barista, coffeeMachine: CoffeeMachine?) {
        self.barista = barista
        self.coffeeMachine = coffeeMachine
    }

    func makeCoffee() {
        guard let coffeeMachine = coffeeMachine else {
            print("Error: CoffeeMachine is missing!")
            return
        }
        barista.makeCoffee(using: coffeeMachine)
    }
}

let barista = Barista()
// 커피 머신을 전달하는 것을 잊어버림
let coffeeShop = CoffeeShop(barista: barista, coffeeMachine: nil)
coffeeShop.makeCoffee()
```

발생하는 일: makeCoffee()가 호출될 때 앱이 "Error: CoffeeMachine is missing!"을 출력하고 커피를 만들지 못합니다. 실제 앱에서는 충돌이나 기능이 손상될 수 있습니다.

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

실제 세계 비유: 커피 전문점을 오픈하는데 주문한 커피 머신이 도착하지 않습니다. 바리스타는 준비가 되어 있지만, 머신이 없으면 커피를 만들 수 없어서 고객들이 실망할 것입니다.

잘못된 의존성: 잘못된 종류의 의존성을 제공할 경우 버그가 발생할 수 있습니다. 커피 전문점에 커피 머신 대신 차 머신을 제공한다고 상상해 보세요. 전문점은 예상대로 작동하지 않을 것입니다.

시나리오: 잘못된 유형이나 구성의 의존성이 주입되어 의도하지 않은 동작이 발생하는 상황입니다.

예시: 실수로 CoffeeMachine 대신 TeaMachine을 주입했다고 가정해 봅시다.

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

```swift
class CoffeeMachine {
    func brewCoffee() {
        print("Brewing coffee...")
    }
}

class TeaMachine {
    func brewTea() {
        print("Brewing tea...")
    }
}

class CoffeeShop {
    let barista: Barista
    let coffeeMachine: CoffeeMachine

    init(barista: Barista, coffeeMachine: CoffeeMachine) {
        self.barista = barista
        self.coffeeMachine = coffeeMachine
    }

    func makeCoffee() {
        coffeeMachine.brewCoffee()
    }
}

// 원인: 이 상황에서는 Swift가 컴파일 시간에 오류를 제공하여 코드 실행을 방지합니다. 그러나 더 느슨하게 타입이 지정된 언어나 상황에서는 런타임 오류나 예기치 않은 동작이 발생할 수 있습니다.

실제 상황과 비교: 커피 머신을 주문했지만 공급 업체가 오인으로 차 머신을 보냈다고 상상해보세요. 바리스타는 커피 머신 사용법을 배웠기 때문에 차 머신은 그 무용지물이고 커피를 제공할 수 없게 됩니다.

3. 초기화 순서: 때로는 의존성이 특정 순서로 초기화되어야 한다는데 의존할 때 있습니다. 올바른 순서로 주입하지 않으면 문제가 발생할 수 있습니다.
```

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

상황: 의존성이 서로 의존하지만 잘못된 순서로 주입되어 실패가 발생합니다.

예시: 고객과 계좌 두 가지에 의존하는 은행 클래스를 고려해보세요. 계좌는 먼저 고객이 생성되어야 하지만, 의존성이 올바른 순서로 주입되지 않으면 문제가 발생합니다.

```js
class Customer {
    let name: String
    init(name: String) {
        self.name = name
    }
}

class Account {
    let customer: Customer
    init(customer: Customer) {
        self.customer = customer
    }
}

class Bank {
    var account: Account?

    func openAccount(for customer: Customer) {
        account = Account(customer: customer)
        print("Account opened for \(customer.name)")
    }
}

let customer = Customer(name: "Alice")
let bank = Bank()

// 고객이 제대로 설정되기 전에 계좌를 개설
bank.openAccount(for: customer)
```

무슨 일이 일어날까요?: 이 예시에서는 고객이 계좌보다 먼저 생성되기 때문에 모든 것이 작동합니다. 그러나 만약 openAccount 내의 로직이 존재하지 않는 고객을 액세스하려고 하거나 계좌가 아직 초기화되지 않은 다른 의존성에 의존한다면, 충돌이 발생하거나 정의되지 않은 동작이 발생할 수 있습니다.

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

실제 세계에서의 비유: 은행이 고객 신원을 확인하기 전에 은행 계좌를 열려고 하는 상황을 생각해보세요. 고객 정보가 충분히 확립되지 않았다면, 은행은 잘못된 또는 불완전한 데이터로 계정을 열어 에러를 발생시킬 수 있습니다.

# 의존성 주입을 사용하지 말아야 할 때

DI가 항상 최선의 해결책은 아닙니다. 앱이 작고 간단한 경우, DI는 불필요한 복잡성을 추가할 수 있습니다. 단일하고 강하게 결합된 클래스의 경우, 클래스 내에서 의존성을 직접 생성하는 것이 더 간편할 수 있습니다.

# 결론

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

의존성 주입은 Swift에서 강력한 패턴으로, 코드를 더 유연하고 테스트 가능하며 유지보수하기 쉽게 만들어 줍니다. 객체를 생성하는 책임과 사용하는 책임을 분리함으로써 더 깔끔하고 모듈식인 코드를 만들 수 있어요. 그러나 순환 의존성과 과도한 주입 같은 특수한 상황과 함께 발생할 수 있는 잠재적인 문제에 유의해야 합니다.

의존성 주입에 대해 더 깊이 파고들고 싶다면, 아래 몇 가지 훌륭한 글들을 살펴보세요:

- Sahibinden Technology에 의한 'Swift에서 의존성 주입'
- Vikramios에 의한 'Swift에서 의존성 주입'

이 글들은 의존성 주입을 더 자세히 설명하고 예제를 제공하여 Swift 프로젝트에서 의존성 주입을 더 잘 이해하고 구현할 수 있도록 도와줍니다.

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

## TL;DR

의존성 주입(Dependency Injection, DI)은 스위프트(Swift)에서 객체의 의존성(예: 커피숍의 커피 머신)을 객체 내부에서 생성하는 대신 외부에서 제공하는 기술입니다. 이를 통해 코드를 더 유연하고 테스트 가능하며 유지 관리하기 쉽게 만들 수 있습니다.

DI를 사용하는 이유는 무엇인가요?

- 유연성: 다양한 종속성을 쉽게 교체할 수 있습니다.
- 테스트 가능성: 테스트용 목 객체(mock object)를 사용할 수 있습니다.

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

일반적인 DI 유형:

- 생성자 주입: 의존성은 초기화 함수를 통해 전달됩니다.
- 속성 주입: 객체가 생성된 후 속성을 통해 의존성이 설정됩니다.

경계 사례 및 함정:

- 순환 의존성은 복잡성을 초래할 수 있습니다.
- 누락된 또는 잘못된 의존성은 충돌 또는 버그를 유발할 수 있습니다.
- 초기화 순서 문제에 주의하세요.

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

추가 읽을거리:

- Sahibinden Technology의 Swift에서의 의존성 주입
- Vikramios의 Swift에서의 의존성 주입

코딩 즐기세요!
