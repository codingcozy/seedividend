---
title: "타입스크립트로 설명하는 결합도와 응집도 이해하기"
description: ""
coverImage: "/assets/img/2024-06-22-CouplingandCohesionexplainedwithtypescript_0.png"
date: 2024-06-22 14:48
ogImage: 
  url: /assets/img/2024-06-22-CouplingandCohesionexplainedwithtypescript_0.png
tag: Tech
originalTitle: "Coupling and Cohesion explained with typescript"
link: "https://medium.com/@gustavobruno/coupling-and-cohesion-explained-with-typescript-2949f9ee1c97"
isUpdated: true
---




![image](/assets/img/2024-06-22-CouplingandCohesionexplainedwithtypescript_0.png)

소프트웨어 개발에서 낮은 결합을 추구하는 것은 유연하고 쉽게 유지보수할 수 있는 시스템을 만드는 데 중요하며, 이는 소프트웨어 품질의 측정 항목입니다.

결합은 시스템의 서로 다른 모듈이나 구성 요소 간의 의존성을 나타내며, 적절하게 관리되지 않으면 코드를 복잡하게 만들어 수정하기 어렵게 만들 수 있습니다.

따라서 다양한 종류의 결합과 그 영향을 이해하는 것은 견고하고 확장 가능한 시스템을 만들려는 개발자들에게 중요합니다.

<div class="content-ad"></div>

# 커플링이란 무엇인가요?

커플링은 소프트웨어 엔지니어링에서 시스템의 다른 부분 간의 의존도를 나타내는 것을 말합니다. 구성 요소 간에 높은 커플링이 있다면 더 강한 상호의존성을 의미합니다.

높은 커플링은 모듈이 긴밀하게 연결되어 있어 하나의 모듈에서의 변경이 다른 모듈들에 영향을 미칠 수 있다는 것을 의미합니다. 낮은 커플링은 모듈이 독립적이므로 하나의 모듈에서의 변경이 다른 모듈에 미치는 영향이 최소화됩니다.

소프트웨어 시스템의 구조와 유지관리에 영향을 미치는 여러 유형의 커플링이 존재합니다.

<div class="content-ad"></div>

# 주요 결합 유형:

1 — 데이터 결합:

다른 모듈에 특정 데이터 구조에만 의존하는 경우 발생합니다. 모듈은 독립적이며, 서로 전달되는 데이터 유형에 한정된 종속성을 갖습니다.

```js
// 예시 A
class User {
  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }
}

// 예시 B
class UserManager {
  constructor(private user: User) {}

  showUserName(): void {
    console.log(this.user.getName());
  }
}

// 모듈 A와 B 사용
const user = new User("Ana");
const userManager = new UserManager(user);
userManager.showUserName();
```

<div class="content-ad"></div>

이 예제에서 UserManager은 User에 직접적으로 의존하므로 User 클래스 구조나 동작에 대한 변경사항이 UserManager에 직접적인 영향을 미칠 수 있습니다.

2 - 스탬프 결합:

복잡한 데이터 구조에서 모듈이 많은 필드를 공유하지만 각 모듈은 이 필드의 일부분만 사용하는 데이터 결합 형태를 가리킵니다.

```js
// 예제 A
class Order {
  constructor(private id: number, private description: string, private amount: number) {}

  getId(): number {
    return this.id;
  }
}

// 예제 B
class OrderManager {
  constructor(private order: Order) {}

  showOrderId(): void {
    console.log(this.order.getId());
  }
}

// 모듈 A와 B 사용법
const order = new Order(1, "Product A", 100);
const orderManager = new OrderManager(order);
orderManager.showOrderId();
```

<div class="content-ad"></div>

이 예시에서 OrderManager는 복잡한 데이터 구조를 가진 Order 객체에 종속되지만 특정 하위 집합 필드만 사용합니다(이 경우 id). 이는 스탬프 결합을 보여줍니다.

3 — 제어 결합:

프로그램 실행 흐름에 영향을 미치는 플래그 값 또는 표시기와 같은 공유 제어 정보로 인해 모듈간의 의존성이 발생합니다.

```js
// 예시 A
class PaymentProcessor {
  processPayment(status: boolean): void {
    if (status) {
      console.log("결제가 성공적으로 처리되었습니다.");
    } else {
      console.log("결제 처리에 실패했습니다.");
    }
  }
}

// 예시 B
class ShoppingCart {
  constructor(private processor: PaymentProcessor) {}

  completePurchase(status: boolean): void {
    this.processor.processPayment(status);
  }
}

// 모듈 A와 B 사용법
const processor = new PaymentProcessor();
const cart = new ShoppingCart(processor);
cart.completePurchase(true);
```

<div class="content-ad"></div>

이 예제에서 ShoppingCart은 PaymentProcessor에 의존하여 결제 상태에 따라 구매가 성공적으로 완료되었는지를 결정합니다. 이것은 제어 결합을 보여줍니다.

4 - 공통 결합:

두 개 이상의 모듈이 자신의 기능을 수행하기 위해 공통의 세 번째 모듈에 의존하는 경우 발생합니다. 이렇게 되면 모듈 간에 강한 상호의존성이 생기며, 시스템을 모듈화하고 유지하기가 더 어려워집니다.

```js
// 예제 A
class Logger {
  logMessage(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

// 예제 B
class AuthenticationService {
  constructor(private logger: Logger) {}

  authenticateUser(): void {
    // 인증 로직
    this.logger.logMessage("사용자가 성공적으로 인증되었습니다.");
  }
}

// Module A와 B 사용법
const logger = new Logger();
const authService = new AuthenticationService(logger);
authService.authenticateUser();
```

<div class="content-ad"></div>

이 예시에서 AuthenticationService는 인증 프로세스 중 로그 메시지를 기록하기 위해 Logger에 의존합니다. 두 모듈 모두 Logger에 의존하므로 공통적으로 결합되어 있음을 나타냅니다.

5 — 콘텐츠 결합:

모듈이 다른 모듈의 내부 구현에 직접적으로 의존하며 내부 변수에 액세스하고 조작하는 가장 강력한 결합 형태입니다.

```js
// 예제 A
class Calculator {
  private result: number = 0;

  add(a: number, b: number): void {
    this.result = a + b;
  }

  getResult(): number {
    return this.result;
  }
}

// 예제 B
class CalculatorLogger {
  private calculator: Calculator;

  constructor(calculator: Calculator) {
    this.calculator = calculator;
  }

  logResult(): void {
    console.log(`Operation result: ${this.calculator.getResult()}`);
  }
}

// 모듈 A와 B 사용법
const calculator = new Calculator();
calculator.add(2, 3);
const logger = new CalculatorLogger(calculator);
logger.logResult();
```

<div class="content-ad"></div>

이 예제에서 CalculatorLogger는 Calculator의 내부 구현에 직접 의존하며 결과 변수에 액세스하고 조작합니다. 이는 content coupling을 나타내며 가장 강한 유형으로 간주됩니다.

# 낮은 결합도의 장점:

- 더 쉬운 유지 보수: 낮은 결합도는 하나의 모듈 내 변경이 다른 모듈에 미치는 영향을 줄이며, 개별 구성 요소의 수정 또는 교체을 용이하게 합니다.
- 향상된 모듈화: 낮은 결합도는 모듈이 독립적으로 개발되고 테스트될 수 있도록 해 코드의 모듈화와 재사용성을 향상시킵니다.
- 더 나은 확장성: 낮은 결합도는 새로운 모듈 추가와 기존 모듈 제거를 용이하게 하여 필요에 따라 시스템의 확장성을 증진시킵니다.

# 높은 결합도의 단점:

<div class="content-ad"></div>

- 증가된 복잡성: 높은 결합은 모듈간의 상호 의존성을 증가시켜 시스템이 더 복잡하고 이해하기 어렵게 만듭니다.
- 유연성 감소: 높은 결합은 개별 구성 요소를 수정하거나 교체하기가 전체 시스템에 영향을 미치게 만들어 어렵게 합니다.
- 모듈성 저하: 높은 결합은 독립적으로 모듈을 개발하고 테스트하는 것을 복잡하게 만들어 코드 모듈성과 재사용성을 줄입니다.

# 응집도

소프트웨어 개발에서 응집력이란 시스템 내의 다른 구성 요소에 어떻게 책임이 할당되는지와 관련된 개념입니다.

높은 응집력은 시스템의 구성 요소가 서로 관련이 깊고 명확한 목적을 수행하는 것을 의미하며, 낮은 응집력은 구성 요소가 구별되고 느슨하게 관련된 책임을 가지고 있는 것을 나타냅니다.

<div class="content-ad"></div>

커플링과 유사하게, 응집도는 소프트웨어의 품질과 유지 보수성에 중요한 역할을 합니다. 시스템의 모듈화 및 확장 가능성에 직접적인 영향을 미칩니다.

# 응집도의 주요 유형:

1 — 기능 응집도:

기능 응집도는 모듈 내 요소가 관련되어 단일 특정 기능이나 작업을 수행할 때 발생합니다. 이는 모듈 내 각 구성 요소가 해당 주요 기능과 직접적으로 관련되어 동일한 목표를 달성하는 데 기여한다는 것을 의미합니다.

<div class="content-ad"></div>

```js
// 기능 응집의 예
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    return a / b;
  }
}
```

이 예제에서 Calculator 클래스는 서로 다른 수학 연산을 수행하는 메서드를 가지고 있어서, 각 메서드가 계산기의 주요 기능에 기여함으로써 기능 응집성을 유지합니다.

2 - 순차 응집:

순차 응집은 모듈 내의 작업이 특정 순서로 구성되어 있고, 한 작업의 출력이 다음 작업의 입력으로 작동할 때 발생합니다. 즉, 모듈 요소들이 순차적으로 관련되어 있고 서로 의존하여 일련의 단계를 순서대로 실행하기 위해 필요합니다.

<div class="content-ad"></div>

```js
// 순차 응집의 예
class OrderProcessor {
  processOrder(order: Order): void {
    this.validateOrder(order);
    this.updateInventory(order);
    this.sendConfirmation(order);
  }

  validateOrder(order: Order): void {
    // 주문 유효성 검사 로직
  }

  updateInventory(order: Order): void {
    // 재고 업데이트 로직
  }

  sendConfirmation(order: Order): void {
    // 확인 메일 보내기 로직
  }
}
```

이 예제에서 OrderProcessor 클래스는 주문 처리를 위한 순차적 단계를 실행하는 메서드를 갖고 있습니다. 각 메서드는 이전 메서드의 결과에 종속되어 높은 순차 응집을 유지합니다.

3 — 시간적 응집:

시간적 응집은 모듈 내의 작업이 시간적으로 관련이 있고 시간적 종속성으로 인해 함께 실행되어야 하는 경우 발생합니다. 이는 모듈 요소가 특정 기능이 아닌 실행해야 할 시간에 따라 그룹화되는 것을 의미합니다.


<div class="content-ad"></div>

```js
// 시간적 응집력의 예제
class TaskScheduler {
  scheduleTask(task: Task, time: string): void {
    // 작업 예약 논리
  }

  cancelTask(task: Task): void {
    // 작업 취소 논리
  }

  executeTask(task: Task): void {
    // 작업 실행 논리
  }
}
```

이 예제에서 TaskScheduler 클래스는 작업을 예약, 취소, 실행하는 메서드를 가지고 있으며, 각 메서드가 시간적으로 관련되어 특정 시점에 실행되어야 하므로 높은 시간적 응집력을 유지합니다.

4 — 논리적 응집력:

논리적 응집력은 모듈 내의 요소가 특정 로직에 의해 관련되거나 동일한 데이터 집합을 처리할 때 발생합니다. 이는 모듈 요소가 공유된 논리나 동일한 데이터 조작을 기준으로 그룹화되어 있는 것을 의미합니다.


<div class="content-ad"></div>

```js
// 논리 응집의 예
class FormValidator {
  validateRequiredField(value: string): boolean {
    // 필수 필드 유효성 검사 로직
    return value.trim() !== '';
  }

  validateEmailField(value: string): boolean {
    // 이메일 필드 유효성 검사 로직
    return /\S+@\S+\.\S+/.test(value);
  }

  validateForm(form: Form): boolean {
    // 폼 유효성 검사 로직
    return this.validateRequiredField(form.name) && this.validateEmailField(form.email);
  }
}
```

이 예제에서 FormValidator 클래스는 각 메서드가 특정 유효성 검사 로직에 의해 관련되어 있어 높은 논리 응집을 유지하고 있습니다.

5 — 우연한 응집:

우연한 응집은 모듈 내 요소들이 중요한 관련성 없이 임의로 그룹화된 경우입니다. 이는 모듈 요소들이 편리함이나 우연한 이유로 함께 그룹화된 것을 의미하며, 공통 목적이나 논리를 위해 그룹화된 것이 아닙니다.


<div class="content-ad"></div>

```js
// Coincidental Cohesion의 예제
class Utility {
  generateReport(data: any): void {
    // 보고서 생성 로직
  }

  sendEmail(recipient: string, message: string): void {
    // 이메일 발송 로직
  }

  calculateTaxes(data: any): void {
    // 세금 계산 로직
  }
}
```

이 예제에서 Utility 클래스는 중요한 관계 없이 다양한 작업을 수행하는 메서드를 가지고 있어서 우연한 응집력이 낮습니다.

다양한 응집력 유형을 이해하는 것은 모듈식, 유연하며 유지보수 가능한 소프트웨어 시스템을 설계하는 데 중요합니다. 각 구성 요소에 적합한 응집력 유형을 선택함으로써, SOLID 및 다른 소프트웨어 설계 원칙을 따르며 더 견고하고 확장 가능한 시스템을 만들 수 있습니다.

읽어 주셔서 감사합니다!


<div class="content-ad"></div>

제 주변을 따라오세요!😜

- 포트폴리오: gustavobruno.dev
- GitHub: @gustavobrunodev
- LinkedIn: @gustavobrunodev