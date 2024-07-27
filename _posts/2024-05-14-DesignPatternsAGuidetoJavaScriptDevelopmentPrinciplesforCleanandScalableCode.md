---
title: "디자인 패턴 깨끗하고 확장 가능한 코드를 위한 JavaScript 개발 원칙 안내"
description: ""
coverImage: "/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_0.png"
date: 2024-05-14 15:59
ogImage: 
  url: /assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_0.png
tag: Tech
originalTitle: "Design Patterns: A Guide to JavaScript Development Principles for Clean and Scalable Code"
link: "https://medium.com/javascript-in-plain-english/design-patterns-a-guide-to-javascript-development-principles-for-clean-and-scalable-code-cf90771b48f2"
---


![이미지](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_0.png)

## 소프트웨어 개발 원칙

# 소개 — JavaScript 디자인 패턴

![이미지](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_1.png)



## 디자인 패턴의 본질

안녕하세요 여러분! 저는 시니어 소프트웨어 엔지니어로 활동한 지 오랜 시간이 되었지만, 깔끔하고 확장 가능한 코드를 작성하는 데 있어 단순히 무엇을 만드냐 보다는 코드의 구조가 중요하다는 것을 깨닫게 되었습니다. 여기서 디자인 패턴이 중요한 역할을 한다는 사실을 발견했습니다.

## 디자인 패턴 — 무엇인가요?

디자인 패턴은 소프트웨어 개발 중에 흔히 발생하는 문제에 대한 검증된 해결책으로, 코드 구조를 안내하는 템플릿 역할을 하여 우리가 코드를 구조화하는 데 도움을 줍니다. 디자인 패턴을 사용하면 더 읽기 쉽고 유연하며 유지보수하기 쉬운 코드를 작성하는 것이 쉬워지며, 개발자들이 더 효과적으로 소통할 수 있는 일종의 공통 언어를 제공하기도 합니다.



## 자바스크립트 디자인 패턴의 힘

자바스크립트는 다양한 프로그래밍 스타일을 지원하여 다재다능하며, 이는 중요한 장점이지만 동시에 언어를 혼란스럽게 만들 수도 있습니다. 그러나 디자인 패턴은 코드를 조직화하고 효율적으로 유지할 수 있는 방법을 제공합니다.

다음 섹션에서는 자바스크립트 디자인 패턴을 더 깊게 탐색하며, 생성, 구조 및 행동 패턴을 탐구하고 각 유형에 대한 실용적인 예제를 제공하며 장단점 및 잠재적인 위험을 논의할 것입니다.

# 자바스크립트 디자인 패턴 유형 탐색



![image](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_2.png)

## 생성 디자인 패턴: 객체 생성

JavaScript에서 객체는 핵심 기능이며 종종 유사한 특성을 갖는 개체 또는 것들을 나타내는 데 사용됩니다. 이러한 객체의 생성을 조직화하기 위해 생성 디자인 패턴을 사용합니다.

생성 패턴은 객체의 생성, 구성 및 표현 방식과는 독립적인 시스템을 만들어 인스턴스화 프로세스를 추상화하는 데 도움을 줍니다.



공장 패턴

공장 패턴은 객체를 생성하는 방법을 제공하지만 하위 클래스가 생성될 객체의 유형을 변경할 수 있습니다.

```js
function CarFactory() {
  this.createCar = function(model) {
    let car;
    if (model === '세단') {
      car = new Sedan();
    } else if (model === 'SUV') {
      car = new SUV();
    }
    return car;
  };
}
```

싱글톤 패턴



싱글톤 패턴은 클래스가 여러 객체를 생성하는 것을 제한하며, 특정 동작을 제어해야 할 때 유용합니다.

```js
let Singleton = (function () {
  let instance;
 
  function createInstance() {
    return new Object("I am the instance");
  }
 
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
```

빌더 패턴

빌더 패턴은 클라이언트가 타입과 내용에만 집중해 복잡한 객체를 구축할 수 있도록 하고, 객체를 조립하는 작업을 관리합니다.



```js
function CarBuilder() {
  this.car = null;

  this.step1 = function () {
    this.car = new Car();
  };

  this.step2 = function () {
    this.car.addParts();
  };

  this.get = function () {
    return this.car;
  };
}
```

## 구조적 디자인 패턴: 코드 모양을 만드는 방법

구조적 패턴은 서로 다른 클래스와 객체를 조직화하여 더 큰 구조를 형성하는 것에 관한 것이며 시스템의 한 부분이 변경될 때 전체 시스템이 함께 바뀌지 않도록 보장합니다.

어댑터 패턴



어댑터 패턴은 호환되지 않는 인터페이스를 가진 클래스가 함께 작동할 수 있도록 객체 주변에 래핑하고 해당 객체와 상호 작용하는 표준 인터페이스를 노출하는 것을 가능하게 합니다.

```js
class OldCalculator {
  constructor() {
    this.operations = function(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return term1 + term2;
        case 'sub':
          return term1 - term2;
        default:
          return NaN;
      }
    };
  }
}

class NewCalculator {
  constructor() {
    this.add = function(term1, term2) {
      return term1 + term2;
    };
    this.sub = function(term1, term2) {
      return term1 - term2;
    };
  }
}

class CalculatorAdapter {
  constructor() {
    const newCalc = new NewCalculator();
    
    this.operations = function(term1, term2, operation) {
      switch (operation) {
        case 'add':
          return newCalc.add(term1, term2);
        case 'sub':
          return newCalc.sub(term1, term2);
        default:
          return NaN;
      }
    };
  }
}
```

데코레이터 패턴

데코레이터 패턴은 동일한 클래스의 다른 객체들의 행동에 영향을 미치지 않고 특정 개체에 정적 또는 동적으로 추가할 동작을 설명합니다.



```js
function Car(name) {
  this.name = name;
}

Car.prototype.getName = function () {
  return this.name;
};

function DecoratedCar(car, color, price) {
  this.car = car;
  this.color = color;
  this.price = price;
}

DecoratedCar.prototype.getName = function () {
  return this.car.getName() + ' has color ' + this.color + ' and price ' + this.price;
};
```

프록시 패턴

프록시 패턴은 원본 객체에 대한 액세스를 제어하기 위해 대리자 또는 플레이스홀더 객체를 제공합니다.

```js
function NetworkAccess() {
  this.connect = function () {
    console.log('네트워크에 연결되었습니다.');
  };
}

function NetworkProxy() {
  this.network = new NetworkAccess();
  this.connect = function () {
    console.log('네트워크 프록시를 사용합니다.');
    this.network.connect();
  };
}
```



## 행동 디자인 패턴: 객체 협업 관리

행동 디자인 패턴은 객체 간 통신에 관심을 가지며, 객체들이 작동하고 책임을 수행하는 방식에 대해 다룹니다. 대부분의 경우 객체 간 통신을 유연하게 처리할 수 있도록 돕습니다.

옵저버 패턴

옵저버 패턴은 객체 간의 일대다 종속성을 정의하여 한 객체의 상태가 변경되면 해당 객체에 의존하는 모든 객체가 자동으로 통지되고 업데이트됩니다.



```js
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyAll(data) {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(data);
        }
    }
}

class Observer {
    notify(data) {
        console.log(`Observer received: ${data}`);
    }
}
```

전략 패턴

전략 패턴은 클라이언트가 인식하지 못하고 메서드(전략)를 런타임에 다른 메서드로 교체할 수 있게 하는 것을 가능하게 합니다. 이것은 교환 가능한 알고리즘 그룹입니다.

```js
class Shipping {
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    calculate(parcel) {
        return this.strategy.calculate(parcel);
    }
}

class UPS {
    calculate(parcel) {
        return `$${parcel.weight * 1.75}`;
    }
}

class FedEx {
    calculate(parcel) {
        return `$${parcel.weight * 2.45}`;
    }
}

class USPS {
    calculate(parcel) {
        return `$${parcel.weight * 1.25}`;
    }
}
```



## 커맨드 패턴

커맨드 패턴은 요청의 구체적인 내용을 알지 못한 채로 작업을 객체에 캡슐화하는 기능을 제공합니다.

```js
class Switch {
  execute(command) {
    command.execute();
  }
}

class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }
}

class Light {
  turnOn() {
    console.log('불이 켜졌습니다');
  }

  turnOff() {
    console.log('불이 꺼졌습니다');
  }
}
```

다음 섹션에서 이러한 패턴이 실제 JavaScript 애플리케이션에서 어떻게 사용되며 깔끔하고 확장 가능한 코드를 어떻게 이끌어내는지 알아보겠습니다.



# JavaScript 디자인 패턴의 실제 응용

![Design Patterns](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_3.png)

디자인 패턴은 강력한 도구입니다. 하지만 실제 상황에서 그들의 응용을 통해 우리는 그들의 힘을 진정으로 이해할 수 있고, 이를 보여주기 위해 우리가 논의한 패턴 중 일부가 실제 상황에서 어떻게 활용될 수 있는지 살펴봅시다.

## 사용자 프로필 생성



사회적 미디어 사이트를 위한 사용자 프로필 시스템을 만드는 작업이 있다고 상상해보세요: Factory 패턴을 사용하면 미리 정의된 템플릿을 사용하여 프로필을 만들어 프로세스를 간소화할 수 있습니다.

```js
function UserFactory() {
  this.createUser = function(type) {
    let user;

    if (type === '개인') {
      user = new PersonalUser();
    } else if (type === '비즈니스') {
      user = new BusinessUser();
    }

    user.type = type;
    user.say = function() {
      console.log(this.type + ": 프로필이 생성되었습니다");
    }
    return user;
  }
}
```

## 제3자 API와의 통합

다른 상황에서는 응용 프로그램에 제3자 API를 통합해야 할 필요가 있다고 상상해보세요. 그러나 이 API의 인터페이스가 응용 프로그램의 기존 시스템과 일치하지 않는 경우: Adapter 패턴을 사용하여 기존 코드베이스를 변경하지 않고 API를 응용 프로그램과 호환되도록 만들 수 있습니다.




```js
class ThirdPartyAPI {
  constructor() {
    this.specificRequest = function() {
      return "Third-party API response";
    };
  }
}

class Adapter {
  constructor(thirdPartyAPI) {
    this.request = function() {
      return thirdPartyAPI.specificRequest();
    };
  }
}

// Using the Adapter
const thirdPartyAPI = new ThirdPartyAPI();
const adapter = new Adapter(thirdPartyAPI);
adapter.request();
```

## 사용자 프로필에 기능 추가하기

Decorator Pattern은 사용자 프로필에 프리미엄 뱃지나 사용자 정의 테마와 같은 새로운 기능을 추가하고 원래의 사용자 객체를 변경하지 않고 싶을 때 적용할 수 있습니다.

```js
function User(name) {
  this.name = name;
}

User.prototype.getName = function () {
  return this.name;
};

function DecoratedUser(user, badge, theme) {
  this.user = user;
  this.badge = badge;
  this.theme = theme;
}

DecoratedUser.prototype.getName = function () {
  return `${this.user.getName()}, Badge: ${this.badge}, Theme: ${this.theme}`;
};
```



## 게시물과 사용자 상호작용

옵저버 패턴은 사용자가 게시물과 상호작용할 수 있는 시스템을 구현해야 할 때 유용합니다. 사용자가 게시물을 좋아하거나 댓글을 달 수 있는 경우, 각 게시물이 주제로 작용하고 다른 사용자가 상호작용을 통지받는 관찰자로 작용할 수 있습니다.

```js
class Post {
  constructor() {
    this.observers = [];
  }

  like(user) {
    this.notifyAll(`게시물이 ${user}님에 의해 좋아요!`);
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyAll(message) {
    for (let observer of this.observers) {
      observer.notify(message);
    }
  }
}

class User {
  notify(message) {
    console.log(`사용자에게 알림: ${message}`);
  }
}
```

## 다양한 배송 방법



이제 전자 상거래 애플리케이션이 다른 배송 방법을 지원해야 하는 경우를 가정해 보겠습니다: 각 배송 방법을 별도의 전략으로 구현할 수 있기 때문에 Strategy Pattern은 이 경우에 완벽합니다.

```js
class Shipping {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(parcel) {
    return this.strategy.calculate(parcel);
  }
}

class UPS {
  calculate(parcel) {
    return `$${parcel.weight * 1.75}`;
  }
}

class FedEx {
  calculate(parcel) {
    return `$${parcel.weight * 2.45}`;
  }
}

class USPS {
  calculate(parcel) {
    return `$${parcel.weight * 1.25}`;
  }
}
```

## 웹사이트 테마 사용자 정의

사용자가 테마를 사용자 정의할 수 있는 웹사이트가 있다고 상상해보세요. 여러 테마 객체를 만들기 위해 Factory Pattern을 사용하고, 그 테마에 추가 기능을 추가하기 위해 Decorator Pattern을 사용할 수 있습니다.



```js
// 팩토리 패턴
function ThemeFactory() {
  this.createTheme = function(type) {
    let theme;

    if (type === 'Dark') {
      theme = new DarkTheme();
    } else if (type === 'Light') {
      theme = new LightTheme();
    }

    theme.type = type;
    return theme;
  }
}

// 데코레이터 패턴
function DecoratedTheme(theme, color) {
  this.theme = theme;
  this.color = color;
}

DecoratedTheme.prototype.getName = function () {
  return this.theme.getName() + ' in ' + this.color + ' color';
};
```

## 할인 이벤트가 적용된 전자 상거래 사이트

전자 상거래 사이트를 상상해보세요. 여러분은 제품에 특별 할인 이벤트를 적용하는 시스템을 구현하려고 합니다. 여기서는 다양한 종류의 특별 할인을 나타내기 위해 전략 패턴을 사용하고 관심 있는 제품에 특별 할인이 적용될 때 고객들에게 알리기 위해 옵서버 패턴을 사용할 수 있습니다.

```js
// 전략 패턴
class SpecialOffer {
  apply(product) {
    // abstract method
  }
}

class BlackFridayOffer extends SpecialOffer {
  apply(product) {
    product.price *= 0.8;  // 20% 할인
  }
}

class ChristmasOffer extends SpecialOffer {
  apply(product) {
    product.price *= 0.85;  // 15% 할인
  }
}

// 옵서버 패턴
class Product {
  constructor(price) {
    this.price = price;
    this.observers = [];
  }

  setPrice(price) {
    this.price = price;
    this.notifyAll();
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyAll() {
    for (let observer of this.observers) {
      observer.notify(this);
    }
  }
}

class Customer {
  notify(product) {
    console.log(`제품 가격이 $${product.price}로 업데이트되었습니다.`);
  }
}
```



## 성능 모니터링 시스템

알겠어요, 그럼 어떤 응용 프로그램의 다른 모듈의 성능을 모니터링하는 시스템을 구축한다고 생각해봅시다. 이러한 모듈은 Factory Pattern을 사용하여 나타낼 수 있으며 이러한 모듈의 성능을 관찰하고 문제를 보고하려면 Proxy Pattern을 사용할 수 있습니다.

```js
// Factory Pattern
function ModuleFactory() {
  this.createModule = function(type) {
    let module;

    if (type === 'Database') {
      module = new DatabaseModule();
    } else if (type === 'Network') {
      module = new NetworkModule();
    }

    module.type = type;
    return module;
  }
}

// Proxy Pattern
class PerformanceProxy {
  constructor(module) {
    this.module = module;
  }

  monitor() {
    console.log('성능 모니터링 중...');
    // 호출을 원래 객체로 위임합니다.
    this.module.monitor();
  }
}
```

## 채팅 애플리케이션



매우 흔한 채팅 애플리케이션에서는 ChatRoom 클래스의 인스턴스가 하나만 있는지를 보장하기 위해 싱글톤 패턴을 사용할 수 있으며, 각 사용자는 옵서버가 되어 다른 사용자가 메시지를 보낼 때마다 메시지를 수신할 수 있습니다.

```js
// 싱글톤 패턴
let ChatRoom = (function() {
  let instance;

  function createInstance() {
    let object = new Object("ChatRoom");
    return object;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// 옵서버 패턴
class User {
  notify(message) {
    console.log(`Received message: ${message}`);
  }
}
```

## 온라인 게임 시스템

온라인 게임 시스템과 같은 다른 예시에서는 게임 캐릭터의 다른 유형을 생성하기 위해 팩토리 패턴을 사용할 수 있고, 캐릭터가 맞았을 때 다른 플레이어에게 알리기 위해 옵서버 패턴을 사용할 수 있으며, 캐릭터에 특별 능력을 추가하기 위해 데코레이터 패턴을 사용할 수 있습니다.



```js
// Factory Pattern
function CharacterFactory() {
  this.createCharacter = function(type) {
    let character;

    if (type === 'Warrior') {
      character = new Warrior();
    } else if (type === 'Mage') {
      character = new Mage();
    }

    character.type = type;
    return character;
  }
}

// Observer Pattern
class Character {
  hit() {
    // Notify all observers
  }
}

// Decorator Pattern
function EnhancedCharacter(character, ability) {
  this.character = character;
  this.ability = ability;
}

EnhancedCharacter.prototype.useAbility = function() {
  console.log(`Using ability: ${this.ability}`);
}
```

These examples demonstrate the power of combining different design patterns to create a flexible and scalable solution, but remember: the key is not to force the use of patterns, it’s to identify when a pattern can improve code quality and maintainability.

# Design Patterns를 사용할 때 피해야 할 함정

![Design Patterns](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_4.png)




디자인 패턴은 소프트웨어 개발 프로세스에서 중대한 차이를 만들어낼 수 있지만, 모든 도구와 마찬가지로 신중하게 사용해야 합니다.

다음은 피해야 할 몇 가지 일반적인 함정입니다:

## 디자인 패턴 과용

디자인 패턴은 흔한 문제에 대한 해결책이지만, 모든 소프트웨어 개발 고민의 치료약은 아니기 때문에 필요하지 않은 곳에 사용하면 불필요하게 복잡하고 난해한 코드로 이어질 수 있습니다.



## 디자인 패턴 오용

각 디자인 패턴은 빛을 발하는 특정 시나리오가 있으며, 그것이 맞지 않는 문맥에서 사용하면 혼란스럽고 유지보수하기 어려운 코드로 이어질 수 있습니다.

## 패턴을 완전히 이해하지 못한 경우

디자인 패턴을 사용하기 전에 그 구조, 목적 및 영향을 완전히 이해하는 것이 중요합니다. 이해하지 못하면 잘못된 구현 및 디버깅하기 어려운 버그로 이어질 수 있습니다.



## 간단함의 원칙을 무시하다

KISS (Keep It Simple, Stupid) 원칙은 소프트웨어 개발에서 중요한 요소이며 항상 강조하는 편입니다: 때로는 복잡한 디자인 패턴보다 간단한 절차적 해결책이 더 적합할 수 있습니다.

# 요약 및 권장 사항

![](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_5.png)



본질적으로 디자인 패턴은 반복되는 코딩 문제에 효율적인 해결책을 제공합니다. 그러나 이를 남용하지 않는 것이 중요합니다. 남용하거나 이해없이 적용하면 코드가 불필요하게 복잡해질 수 있습니다.

## 추가 학습

지속적인 학습과 능력 향상을 위해 다양한 디자인 패턴을 실험하고, 강점과 약점을 이해하며 효율적으로 사용할 수 있는 방법을 찾아보세요.

자바스크립트에 더 깊이 파고들고 싶은 분들을 위해, 저의 라이브러리에서 이 글들을 추천합니다: "JavaScript 오브젝트 구조 분해와 스프레드 구문 활용: Use Case 및 Best Practice" 그리고 "JavaScript Promises: 에러 처리와 Best Practice에 대한 깊은 탐구"



두 기사 모두 JavaScript의 특정 측면에 대한 실용적인 통찰을 제공하여 디자인 패턴과 같이 개발 작업을 향상시킬 수 있습니다.

항상 여러분의 이야기를 듣는 것에 흥미가 있어요. 댓글에서 여러분의 생각, 경험 또는 질문을 공유해주세요. 우리는 서로서로에서 배우고, 여러분의 통찰은 커뮤니티에 도움이 될 수 있습니다.

![이미지](/assets/img/2024-05-14-DesignPatternsAGuidetoJavaScriptDevelopmentPrinciplesforCleanandScalableCode_6.png)

PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.



우리의 무료 주간 뉴스레터를 구독하세요. 트위터, 링크드인, 유튜브, 디스코드에서도 팔로우하세요.