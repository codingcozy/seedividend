---
title: "Nodejs에서의 디자인 패턴"
description: ""
coverImage: "/assets/img/2024-05-14-DesignPatternsinNodejs_0.png"
date: 2024-05-14 13:57
ogImage: 
  url: /assets/img/2024-05-14-DesignPatternsinNodejs_0.png
tag: Tech
originalTitle: "Design Patterns in Node.js"
link: "https://medium.com/@techsuneel99/design-patterns-in-node-js-31211904903e"
isUpdated: true
---




Node.js는 이벤트 주도, 비차단 I/O 모델을 사용하여 확장 가능한 네트워크 애플리케이션을 개발할 수 있는 인기 있는 JavaScript 런타임입니다. 다양한 디자인 패턴을 사용하면 코드 재사용, 유지 관리성 및 견고성을 증진시킬 수 있습니다. 이 기사에서는 Node.js 개발에 가장 유용한 디자인 패턴 중 일부를 개요하겠습니다.

![](/assets/img/2024-05-14-DesignPatternsinNodejs_0.png)

## 디자인 패턴 소개

디자인 패턴은 소프트웨어 개발자가 코딩하는 동안 반복적으로 마주치는 문제에 대한 검증된 해결책입니다. 이는 도전적인 과제를 해결하는 구조화된 방법을 제공하며 소프트웨어 아키텍처에서 최상의 실천법을 촉진합니다. 디자인 패턴을 통합함으로써, 개발자는 더 견고하고 유지보수 가능하며 확장 가능한 코드베이스를 작성할 수 있습니다.



## 왜 Node.js에서 디자인 패턴이 중요한 이유

Node.js는 비차단 이벤트 주도 구조로 알려져 있어 소프트웨어 디자인에서 독특한 도전과 기회를 제공합니다. Node.js에 맞는 디자인 패턴을 적용하면 더 효율적이고 최적화된 애플리케이션을 개발할 수 있습니다. Node.js 생태계에서 특히 가치 있는 몇 가지 주요 디자인 패턴을 살펴보겠습니다:

## 싱글톤 패턴

싱글톤 패턴은 클래스가 하나의 인스턴스만 가지며 그에 대한 전역 액세스 지점을 제공하는 것을 보장합니다. Node.js에서 모듈이 캐시되고 애플리케이션 전체에서 공유될 수 있는 환경에서, 싱글톤 패턴을 사용하여 리소스를 효율적으로 관리할 수 있습니다. 예를 들어, 데이터베이스 연결 풀을 싱글톤으로 구현하여 자원 낭비를 방지할 수 있습니다.



```js
class Database {
  constructor() {
    this.connection = null;
  }
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance; 
  }

  connect() {
    // connect to database
    this.connection = 'Connected'; 
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // true

db1.connect(); 

console.log(db1.connection); // 'Connected'
console.log(db2.connection); // 'Connected'
```

중요한 점은:

- 생성자는 직접 인스턴스화를 방지하기 위해 비공개로 만들었습니다.
- 정적 메소드 getInstance()는 인스턴스가 아직 존재하지 않는 경우 인스턴스를 만들고 반환합니다. 이렇게 하면 하나의 인스턴스만 생성됩니다.
- db1과 db2 인스턴스는 동일한 객체를 가리킵니다.
- db1이 연결하면 동일한 객체이기 때문에 db2도 연결을 받습니다.

이를 통해 하나의 데이터베이스 인스턴스만 있고 중복 연결을 방지할 수 있습니다. 싱글톤 패턴은 클래스의 하나의 인스턴스만 존재해야 하는 상황에 유용합니다.




## 팩토리 패턴

팩토리 패턴은 생성될 객체의 정확한 클래스를 지정하지 않고 객체를 생성하는 방법을 제공합니다. Node.js에서는 파일을 읽거나 API 호출과 같은 비동기 작업을 다룰 때 객체 생성을 간소화할 수 있습니다. 팩토리 패턴은 객체 생성을 추상화함으로써 코드의 가독성과 재사용성을 향상시킵니다.

```js
class Car {
  constructor(model, price) {
    this.model = model;
    this.price = price;
  }
}

class CarFactory {
  createCar(model) {
    switch(model) {
      case 'civic':
        return new Car('Honda Civic', 20000);
      case 'accord':  
        return new Car('Honda Accord', 25000);
      case 'odyssey':
        return new Car('Honda Odyssey', 30000);
      default:
        throw new Error('Unknown model');
    }
  }
}

const factory = new CarFactory();

const civic = factory.createCar('civic');
const accord = factory.createCar('accord');

console.log(civic.model); // Honda Civic 
console.log(accord.model); // Honda Accord
```

주요 포인트는:



- CarFactory 클래스는 객체 생성 로직을 처리합니다.
- createCar() 메서드는 모델을 기반으로 Car 인스턴스를 반환합니다.
- 클라이언트 코드는 직접 생성자 호출 대신 팩토리를 사용합니다.

이는 객체 생성 로직을 추상화하여 지원되는 모델을 쉽게 확장할 수 있게 합니다. 팩토리 패턴은 복잡한 객체 생성 로직이 클라이언트 코드에 결합되지 말아야 하는 경우 유용합니다.

## 옵저버 패턴

Node.js의 이벤트 주도 특성은 옵저버 패턴과 잘 맞습니다. 이 패턴은 의존하는 객체 목록인 옵저버라는 종속 항목 목록을 유지하는 주제를 포함하며 상태 변경 시 이들에게 알립니다. Node.js의 맥락에서는 이를 활용하여 실시간 애플리케이션 및 채팅 애플리케이션과 같은 이벤트 주도 시스템을 구축할 수 있습니다.



```js
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data) {
    this.observers.forEach(o => o.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received ${data}`);
  }
}

const subject = new Subject();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello World');
// Observer 1 received Hello World
// Observer 2 received Hello World

subject.unsubscribe(observer2);

subject.notify('Hello Again');
// Observer 1 received Hello Again
```

주요 포인트는:

- Subject는 관찰자 목록을 유지합니다.
- 관찰자들은 주제에 구독하고 구독을 취소합니다.
- notify()가 호출되면 주제는 구독된 관찰자들을 모두 업데이트합니다.

이를 통해 발행자를 구독자에 결합하지 않고 여러 개체에 업데이트를 발행할 수 있습니다. Observer 패턴은 이벤트 처리와 비동기적인 워크플로에 유용합니다.




## 미들웨어 패턴

Node.js의 미들웨어 아키텍처는 웹 애플리케이션에서 요청과 응답을 처리하는 데 널리 사용됩니다. 미들웨어 패턴은 요청을 순차적으로 처리하는 함수 체인을 포함합니다. 각 함수는 요청이나 응답을 수정한 다음 체인 내의 다음 함수로 전달할 수 있습니다. 이 패턴은 모듈성을 향상시키며, 각기 다른 기능을 완벽하게 결합하지 않고도 개발자가 다양한 기능을 확장할 수 있도록 합니다.

```js
const express = require('express');
const app = express();

const logger = (req, res, next) => {
  console.log('Logged');
  next();
}

const authenticate = (req, res, next) => {
  // 사용자 인증
  next();
}

app.use(logger); 
app.use(authenticate);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

주요 포인트는:



- 미들웨어 함수 logger와 authenticate는 라우트 핸들러를 감싸고 있어요.
- 라우트 전후에 로직을 실행할 수 있어요.
- next() 함수는 다음 미들웨어로 제어를 전달해요.
- app.use()는 미들웨어를 전역으로 적용해요.

이를 통해 요청 처리를 작은 재사용 가능한 단위로 분해할 수 있어요. 미들웨어 패턴은 Express 및 다른 Node.js 프레임워크에서 로깅, 인증 등과 같은 작업에서 매우 일반적으로 사용돼요.

다른 미들웨어의 예시로는 body parsers, 압축, 속도 제한 등이 있어요. 이 패턴을 통해 모듈화된 방식으로 요청 파이프라인을 구축할 수 있어요.

## 모듈 패턴



모듈 패턴은 Node.js에서 가장 기본적이면서도 근본적인 패턴 중 하나입니다. 이 패턴을 사용하면 코드를 특정 기능을 캡슐화하는 별도의 파일 또는 모듈로 구성할 수 있습니다.

```js
// counter.js

let count = 0;

const increment = () => {
  count++;
}

const decrement = () => {
  count--;
}

const get = () => {
  return count; 
}

module.exports = {
  increment,
  decrement,
  get  
};

// app.js

const counter = require('./counter');

counter.increment();
counter.increment();

console.log(counter.get()); // 2

counter.decrement();

console.log(counter.get()); // 1
```

중요한 포인트는:

- counter.js 모듈은 private 변수인 count에 작용하는 함수들을 내보냅니다.
- 함수들은 모듈 내부에서 로직과 데이터를 캡슐화합니다.
- app.js는 모듈을 가져와 공개 API를 사용합니다.



이 패턴은 데이터 캡슐화를 제공하며 오직 공개 API만 노출합니다. 모듈 패턴은 코드를 재사용 가능하고 이식 가능한 모듈로 구성하는 데 Node.js에서 매우 일반적으로 사용됩니다.

다른 예시로는 미들웨어 모듈, 유틸리티 라이브러리, 데이터 접근 계층 등이 있습니다. 이 패턴은 의존성 관리와 구현 세부 정보 숨기기에 도움이 됩니다.

## 데코레이터 패턴

데코레이터는 다른 인스턴스에 영향을 주지 않으면서 객체에 새로운 기능을 동적으로 추가합니다. 이는 Node의 핵심 모듈을 확장하는 데 이상적입니다.



```js
class Car {
  constructor() {
    this.price = 10000;
  }

  getPrice() {
    return this.price;
  }
}

class CarOptions {
  constructor(car) {
    this.car = car;
  }

  addGPS() {
    this.car.price += 500;
  }
  
  addRims() {
    this.car.price += 300; 
  }
}

const basicCar = new Car();

console.log(basicCar.getPrice()); // 10000

const carWithOptions = new CarOptions(basicCar);

carWithOptions.addGPS();
carWithOptions.addRims();

console.log(carWithOptions.car.getPrice()); // 10800
```

주요 포인트:

- CarOptions는 Car 클래스를 래핑하고 그 동작을 확장합니다.
- addGPS()와 같은 메서드는 래핑된 Car의 상태를 수정합니다. 
- 클라이언트는 추가 기능이 있는 Car의 장식된 인스턴스를 갖게 됩니다.

이는 실행 중에 동적으로 동작을 확장할 수 있도록 해줍니다. 데코레이터 패턴은 추상화에 유용하며 작은 기능을 추가하기 위해 서브클래스를 만들 필요가 없습니다.




일부 다른 예시로는 인증된 경로, 로깅 래퍼, 캐싱 데코레이터 등이 있습니다. 이 패턴은 Node.js 애플리케이션에서 개방/폐쇄 원칙을 준수하는 유연한 방법을 제공합니다.

## 의존성 주입 패턴

의존성 주입은 모듈이나 클래스가 내부적으로 생성하는 대신 외부 소스에서 의존성을 받는 패턴입니다. 이는 간결함, 테스트 용이성, 재사용성을 촉진하는 데 도움이 됩니다.

```js
// service.js
class Service {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }

  async getUser(userId) {
    const user = await this.db.findUserById(userId);
    this.logger.log(`사용자 ${user.name}을(를) 가져왔습니다.`);
    return user;
  }
}

// app.js
const Database = require('./database'); 
const Logger = require('./logger');

const db = new Database();
const logger = new Logger();

const service = new Service(db, logger);

service.getUser(1);
```



주요 포인트는 다음과 같아요:

- Service 클래스는 생성자를 통해 의존성을 선언합니다.
- 호출 코드는 실제 의존성인 db와 logger를 주입합니다.
- 이를 통해 Service와 구체적인 의존성이 결합이 해제됩니다.

장점:

- 모듈 간의 느슨한 결합
- 의존성을 모의(mock)화하여 쉬운 테스트
- 구현체 교체 가능합니다.



의존성 주입 패턴은 NestJS와 같은 Node.js 프레임워크에서 일반적으로 사용됩니다. 이 패턴을 사용하면 코드 조직화와 재사용성을 더 효율적으로 할 수 있습니다.

## Promise 패턴

Promise는 Node.js에서 비동기 프로그래밍을 위한 패턴입니다. 이들은 비동기 작업의 최종 결과를 나타냅니다. 다음은 간단한 예제입니다:

```js
const fetchData = new Promise((resolve, reject) => {
  // 비동기 작업
  const data = getDataFromDatabase();
  
  if (data) {
    resolve(data); 
  } else {  
    reject('데이터 가져오기 오류');
  }
});

fetchData
  .then(data => {
    // 성공적인 데이터 처리
  })
  .catch(err => {
    // 에러 처리  
  });
```



주요 측면은 다음과 같습니다:

- Promise는 resolve 및 reject 함수가 포함된 콜백을 사용합니다.
- 비동기 작업은 콜백 내에서 시작됩니다.
- resolve(data)는 성공 시 데이터를 반환합니다.
- reject(error)는 실패 시 오류를 반환합니다.
- 소비자들은 .then() 및 .catch()를 사용하여 결과를 얻습니다.

장점:

- 비동기 코드에서 콜백 지옥을 피할 수 있습니다.
- 비동기 결과를 처리하는 표준화된 방법
- Promise를 연결하고 조합할 수 있는 능력



약속은 현대 Node.js 개발에 불가결하며, 깔끔한 비동기 코드 작성을 가능하게 합니다. axios와 같은 라이브러리, fs.promises와 같은 코어 API를 구동합니다.

## 디자인 패턴 구현

Node.js의 강점과 일치하는 주요 디자인 패턴을 탐색했으니, 효과적으로 구현하는 방법에 대해 자세히 알아봅시다:

## 1. 컨텍스트 이해



디자인 패턴을 적용하기 전에는 애플리케이션의 맥락을 이해하는 것이 중요합니다. 애플리케이션의 요구 사항, 확장 가능성 요구 사항 및 해결하려는 특정 문제 등을 고려해야 합니다. 디자인 패턴은 일반적인 해결책이 아니며, 프로젝트의 독특한 특성에 맞추어야 합니다.

## 2. 모듈화

Node.js는 모듈 시스템을 통해 모듈화를 촉진합니다. 디자인 패턴을 구현할 때에는 모듈을 작고 집중적이며 단일 책임을 부여하는 노력을 해야 합니다. 이렇게 하면 코드 재사용성과 유지보수성이 증가하며, 전체 애플리케이션에 영향을 미치지 않고 특정 기능을 교체하거나 향상시키기가 더 쉬워집니다.

## 3. 비동기 패턴



Node.js의 비동기적인 성격을 고려할 때, 비동기 프로그래밍 패러다임에 부합하는 디자인 패턴을 선택하는 것이 중요합니다. 옵저버 패턴과 미들웨어 패턴과 같은 패턴들은 자연스럽게 비동기 환경에 잘 맞아 이벤트 및 비동기 작업을 손쉽게 처리할 수 있게 해줍니다.

## 결론

디자인 패턴을 활용하면 Node.js 개발자들은 조직화되고 유연하며 견고한 코드를 작성할 수 있습니다. Factory, decorator, singleton과 같은 검증된 패턴을 활용하면 유지보수 및 확장이 쉬운 대규모 애플리케이션을 구축할 수 있습니다. 디자인 원칙을 적용하는 방법을 이해하는 것은 고급 Node 개발을 숙달하기 위한 핵심 요소입니다.