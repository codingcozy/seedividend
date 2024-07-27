---
title: "디자인 패턴 더 나은 코드 작성하기"
description: ""
coverImage: "/assets/img/2024-05-12-DesignPatternsBuildingBetterCode_0.png"
date: 2024-05-12 23:46
ogImage: 
  url: /assets/img/2024-05-12-DesignPatternsBuildingBetterCode_0.png
tag: Tech
originalTitle: "Design Patterns : Building Better Code"
link: "https://medium.com/@attiadhouha/design-patterns-building-better-code-e6ef06b86628"
---


<img src="/assets/img/2024-05-12-DesignPatternsBuildingBetterCode_0.png" />

## 소개

소프트웨어 개발 세계에서 효율적이고 유지보수 가능하며 확장 가능한 코드를 작성하는 것이 매우 중요합니다. 하지만 프로젝트가 복잡해지면 이를 관리하는 것이 점점 어려워집니다. 여기서 디자인 패턴이 필요해집니다.

## 디자인 패턴이란 무엇인가요?



디자인 패턴은 코딩에서 흔히 발생하는 문제에 대한 준비된 솔루션과 같아요. 그들은 개발자들이 항상 직면하는 까다로운 코딩 퍼즐을 해결하기 위한 레시피 같습니다. 요리를 할 때 레시피를 사용하는 것처럼, 개발자들은 디자인 패턴을 사용하여 똑똑한 방식으로 코드를 작성해요.

## 디자인 패턴을 사용하는 이유는?

디자인 패턴은 유용합니다:

코드 재사용성: 재사용 가능한 솔루션을 제공하기 때문에, 개발자들은 문제를 만날 때마다 바퀴를 다시 발명할 필요가 없어요.



# 확장성: 새로운 기능을 추가하거나 프로젝트의 규모를 확장하는 데 도움을 줍니다. 이렇게 함으로서 코드를 엉망으로 만들지 않고 처리할 수 있습니다.

# 유지보수성: 프로젝트가 시간이 지나도 코드를 조직화하고 이해하기 쉽게 도와줍니다.

# 오류 감소: 정해진 패턴을 따름으로써 개발자는 흔한 실수와 버그를 피할 수 있습니다.

# 성능 향상: 디자인 패턴은 효율적인 코딩 방법을 장려하여 더 나은 성능의 소프트웨어로 이끕니다.



협업: 여러 개발자가 동일한 코드베이스에서 작업하기가 더 쉽습니다. 팀워크와 생산성을 촉진합니다.

## 디자인 패턴의 종류

주요 세 가지 유형이 있습니다:

생성 패턴: 이러한 패턴은 객체가 어떻게 생성되는지 다룹니다. 객체를 언제, 어떻게 생성할지 결정하는 데 도움이 됩니다. 코드의 유연성과 성능을 향상시킬 수 있습니다.



구조 패턴: 이러한 패턴은 클래스와 객체가 대형 구조를 형성하는 방식에 중점을 둡니다. 코드를 이해하고 유지 관리하기 쉬운 방식으로 구조화하는 데 도움을 줍니다.

행동 패턴: 이러한 패턴은 객체 간의 통신 방식을 정의합니다. 코드를 유연하고 결합도가 낮은 방식으로 설계할 수 있게 도와줍니다. 이는 코드의 다른 부분이 서로에게 지나치게 의존하지 않도록 합니다.

## 일반적으로 사용되는 디자인 패턴

생성 패턴:



- 팩토리 메서드: 이 패턴은 구체적으로 인스턴스화할 클래스를 지정하지 않고 객체를 생성하는 데 도움을 줍니다. 이는 느슨한 결합을 촉진하고 코드를 더 유연하게 만듭니다.

```js
{
class Fruit {
constructor(name) {
this.name = name;
}
eat() {
console.log(`${this.name}을(를) 먹는 중`);
}
}
class FruitStand {
static create(name) {
return new Fruit(name);
}
}
const fruit1 = FruitStand.create("사과");
const fruit2 = FruitStand.create("오렌지");
fruit1.eat(); // 사과를 먹는 중
fruit2.eat(); // 오렌지를 먹는 중
}
```

- 싱글톤: 이 패턴은 클래스가 하나의 인스턴스만 가지도록 보장하고 해당 인스턴스에 대한 전역 액세스 지점을 제공합니다. 설정 또는 로깅에 유용하지만 남용하면 결합이 강화될 수 있으므로 삼가 사용하세요.

```js
class Singleton {
constructor() {
if (Singleton.instance) {
return Singleton.instance;
}
Singleton.instance = this;
}
// 여기에 코드 작성
}
module.exports = Singleton;
```



프론트엔드 개발자님 안녕하세요!

- Builder: 복합 객체의 생성을 표현으로부터 분리하여 동일한 생성 프로세스가 다양한 표현을 만들 수 있게 합니다. 많은 선택적 매개변수나 구성을 갖는 객체를 다룰 때 매우 유용합니다.

구조 패턴:

- Adapter: 이 패턴을 사용하면 호환되지 않는 인터페이스끼리 함께 작동할 수 있습니다. 서로 다른 인터페이스를 가진 두 클래스 사이에 다리 역할을 합니다.

```js
// 기존 Animal 클래스
class Animal {
constructor(name) {
this.name = name;
}
speak() {
console.log(`${this.name} makes a sound.`);
}
}
// Adapter 클래스
class LionAdapter {
constructor(animal) {
this.animal = animal;
}
roar() {
console.log(`${this.animal.name} roars loudly!`);
}
}
// 사용법
const genericAnimal = new Animal("일반 동물");
const lion = new LionAdapter(genericAnimal);
lion.roar(); // 일반 동물이 크게 웁니다!
```



- 데코레이터: 이 패턴은 기존 객체에 동적으로 새로운 기능을 추가합니다. 핵심 기능을 수정하지 않고 여러 데코레이터를 추가할 수 있습니다.

행동 패턴:

- 옵저버: 이 패턴은 객체 간의 일대다 종속성을 정의합니다. 한 객체의 상태 변경 시 모든 종속 객체에게 알립니다. 이는 이벤트 처리나 실시간 업데이트와 같은 기능을 구현하는 데 유용합니다.

```js
class FruitObserver {
constructor() {
this.observers = [];
}
subscribe(fn) {
this.observers.push(fn);
}
unsubscribe(fn) {
this.observers = this.observers.filter(fruitListener => fruitListener !== fn);
}
notify(data) {
this.observers.forEach(observer => observer(data));
}
}
const fruitObserver = new FruitObserver();
fruitObserver.subscribe(data => console.log(`Subscribed to ${data}`));
fruitObserver.notify("Apple"); // Subscribed to Apple
```



- 전략: 이 패턴은 알고리즘의 동작을 실행 중에 동적으로 변경할 수 있게 합니다. 클라이언트 코드를 수정하지 않고 다양한 전략 사이를 전환할 수 있습니다.

## 결론

디자인 패턴을 코드의 구성 요소로 생각해보세요. 프로그래머들이 자주 마주치는 문제에 대한 검증된 솔루션이죠. 이러한 패턴을 배움으로써, 초보자든 전문가든 상관없이 빠르게 더 좋은 코드를 작성할 수 있습니다.

읽어주셔서 감사합니다! 🎉