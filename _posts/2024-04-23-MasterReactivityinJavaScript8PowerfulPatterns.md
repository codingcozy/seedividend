---
title: "자바스크립트 반응성 8가지 패턴 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Master Reactivity in JavaScript 8 Powerful Patterns"
link: "https://medium.com/@lokesh-prajapati/master-reactivity-in-javascript-8-powerful-patterns-e17bc19d3d54"
---



웹 개발 영역에서 반응성은 중요한 역할을 합니다. 시스템이 데이터 변경에 동적으로 응답하는 방식을 나타냅니다. 이 게시물에서는 반응성을 효과적으로 활용할 수 있는 여덟 가지 주요 JavaScript 패턴에 대해 다뤄보겠습니다.

![MasterReactivityinJavaScript8PowerfulPatterns_0.png](/assets/img/MasterReactivityinJavaScript8PowerfulPatterns_0.png)

왜 반응성을 채택해야 하는가?

프론트엔드 개발자로서, 브라우저 내에서 비동기 환경과 끊임없이 씨름합니다. 현대적인 웹 인터페이스는 사용자 상호작용에 신속하게 반응해야 합니다. 이는 UI 업데이트, 네트워크 요청 보내기, 탐색 관리 등 여러 작업을 포함합니다.

<div class="content-ad"></div>

프레임워크는 종종 반응성과 동일시되지만, 순수 JavaScript에서 이러한 패턴을 구현함으로써 심층적인 이해를 얻을 수 있습니다. 우리는 이러한 패턴을 직접 개발하는 것뿐만 아니라, 반응성의 기초 위에 구축된 핵심 브라우저 API를 탐험할 것입니다.

목차:

- Pub/Sub: 간편한 데이터 흐름 관리
- Custom Events: 쉬운 반응성을 위한 브라우저 내장 Pub/Sub
- Custom Event Targets: 집중된 반응성 제어
- Observer Pattern: 독립된 코드를 위한 유연한 업데이트
- Proxy를 사용한 반응 속성: 실시간 변경 추적
- 개별 속성 반응성: 세밀한 객체 추적
- MutationObserver로 반응하는 HTML 속성: DOM 변경으로 작용하는 트리거
- IntersectionObserver로 반응하는 스크롤: 가시성 기반 상호작용

## 1. Pub/Sub: 간편한 데이터 흐름 관리

<div class="content-ad"></div>

PubSub은 가장 일반적으로 사용되는 기본적인 반응성 패턴 중 하나입니다. 이는 데이터 업데이트를 전파하는 발행자(데이터 업데이트에 반응하는 엔티티)와 해당 업데이트에 반응하는 구독자(반응하는 엔티티) 간의 커뮤니케이션 채널을 설정합니다.

예시:

```js
class PubSub {
  constructor() {
    this.topics = {}; // 이벤트 이름을 구독자 배열에 매핑
  }
  subscribe(topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);
  }
  publish(topic, data) {
    if (this.topics[topic]) {
      this.topics[topic].forEach((callback) => callback(data));
    }
  }
}

const pubsub = new PubSub();
pubsub.subscribe("news", (message) => console.log(`받은 뉴스: ${message}`));
pubsub.publish("news", "신선한 헤드라인 도착!");
```

그 중요한 사용 예시 중 하나는 Redux입니다. 이 인기 있는 상태 관리 라이브러리는 이 패턴(나아가 Flux 아키텍처)을 기반으로 합니다. Redux의 컨텍스트에서 작업은 매우 간단합니다:

<div class="content-ad"></div>

- Publisher: 상점은 발행자 역할을 합니다. 행동이 발생하면 상점은 모든 구독한 구성 요소들에게 상태 변경에 대해 알립니다.
- Subscriber: 응용 프로그램의 UI 구성 요소는 구독자입니다. Redux 상점을 구독하고 상태가 변경될 때마다 업데이트를받습니다.

## 2. 사용자 지정 이벤트: 간편한 반응성을 위한 브라우저 내장 Pub/Sub

브라우저는 CustomEvent 클래스 및 dispatchEvent 메서드를 통해 사용자 지정 이벤트를 트리거하고 구독하는 API를 제공합니다. 후자는 이벤트를 트리거하는 뿐만 아니라 원하는 데이터를 첨부할 수 있는 기능을 제공합니다.

예시:

<div class="content-ad"></div>

```js
const customEvent = new CustomEvent("customEvent", {
  detail: "사용자 지정 이벤트 데이터",
});

const element = document.getElementById("custom-event-target-element");
element.addEventListener("customEvent", (event) =>
  console.log(`사용자 정의 이벤트를 수신함: ${event.detail}`)
);
element.dispatchEvent(customEvent);
```

## 3. 사용자 정의 이벤트 타깃: 집중적인 반응성 제어

만약 전역적으로 window 객체에 이벤트를 발행하고 싶지 않다면, 직접 이벤트 타깃을 만들 수 있습니다.

원시 EventTarget 클래스를 확장하여 새 인스턴스로 이벤트를 발행할 수 있습니다. 이렇게 하면 이벤트가 새 클래스 자체에서만 트리거되어 전역 전파가 방지됩니다. 게다가, 이 특정 인스턴스에 직접 핸들러를 추가할 수 있는 유연성을 가질 수 있습니다.

<div class="content-ad"></div>

예시:

```js
class CustomEventTarget extends EventTarget {
  constructor() {
    super();
  }
  triggerCustomEvent(eventName, eventData) {
    const event = new CustomEvent(eventName, { detail: eventData });
    this.dispatchEvent(event);
  }
}

const customTarget = new CustomEventTarget();
customTarget.addEventListener("customEvent", (event) =>
  console.log(`Custom event received with data: ${event.detail}`)
);
customTarget.triggerCustomEvent(
  "customEvent",
  "Hello, This is a custom event!"
);
```

## 4. Observer Pattern: Decoupled Code에 유연한 업데이트

옵서버 패턴은 PubSub과 매우 유사합니다. Subject에 구독하고 Subject는 구독자(Observer)에게 변경 사항을 알리고, 그에 따라 반응할 수 있도록 합니다. 이 패턴은 Decoupled 및 유연한 아키텍처 구축에서 중요한 역할을 합니다.

<div class="content-ad"></div>

예시:

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
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`${this.name} received an update: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// 주제에 관찰자 추가
subject.addObserver(observer1);
subject.addObserver(observer2);

// 변경 사항에 대해 관찰자에게 알림
subject.notify();

// 콘솔 로그:
// Observer 1이 업데이트를 받았습니다.
// Observer 2가 업데이트를 받았습니다.
```

## 5. Proxy를 사용한 반응적인 속성: 실시간 변경 추적

Proxy 객체는 객체 내의 속성 액세스 작업(get 및 set)을 가로채는 기능을 제공합니다. 이를 통해 속성 값이 검색되거나 수정될 때마다 리액티브(반응형)를 구현하고 코드를 실행할 수 있습니다.

<div class="content-ad"></div>

안녕하세요! 표 태그를 Markdown 형식으로 변경해보겠습니다.

예시:

```js
let data = {
  name: "Lokesh",
  age: 25,
};

let reactiveData = new Proxy(data, {
  get(target, property) {
    console.log(
      `Property "${property}" has been read, current value: ${target[property]}`
    );
    return target[property];
  },
  set(target, property, value) {
    if (value !== target[property]) {
      // 변경 사항 로깅 전 실제 변경 여부 확인
      console.log(
        `Property "${property}" changed from ${target[property]} to ${value}`
      );
      target[property] = value;
      // 여기서 UI 업데이트와 같은 추가 작업을 트리거할 수 있음
      console.log(`Updated property "${property}" to ${value}`);
    }
    return true; // 속성이 성공적으로 설정되었음을 나타냄
  },
});

// 반응형 데이터와 상호작용하는 예시 함수
function updateName(newName) {
  reactiveData.name = newName;
}

function readName() {
  console.log(`The name is: ${reactiveData.name}`);
}

// 속성 업데이트와 조회 시뮬레이션
updateName("Rajesh");
readName();
```

## 6. 개별 속성 반응성: 세밀한 객체 추적

객체의 모든 필드를 추적할 필요가 없는 경우 Object.defineProperty를 사용하여 특정 속성을 선택하거나 Object.defineProperties를 사용하여 그룹화할 수 있습니다.

<div class="content-ad"></div>

## 7. `MutationObserver`를 사용하여 반응형 HTML 속성: DOM 변경으로 인한 동작 트리거

`MutationObserver`는 DOM(Document Object Model)의 변경 사항, 속성 변경, 요소의 추가 또는 제거 등을 관찰할 수 있게 해주는 JavaScript API입니다. 이를 통해 DOM 수정에 대응하는 코드를 수동으로 추적하지 않고도 코드를 실행할 때 특히 유용합니다.

<div class="content-ad"></div>

예제:

```html
<div id="observed-element">내 변경 사항을 주시하세요!</div>
<button onclick="toggleClass()">클래스 전환</button>
```

```js
// 관찰할 요소 선택
const observedElement = document.getElementById("observed-element");

// 클래스를 전환하는 함수 정의
function toggleClass() {
  observedElement.classList.toggle("highlight");
}

// 변이를 관찰할 때 실행할 콜백 함수
const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      console.log(`클래스 속성이 변경되었습니다!`);
      // 여기에 더 많은 동작 추가 가능 (예: 스타일 변경, 자세한 내용 로깅 등)
      if (observedElement.classList.contains("highlight")) {
        observedElement.style.backgroundColor = "yellow";
      } else {
        observedElement.style.backgroundColor = "";
      }
    }
  }
};

// 콜백 함수를 전달하여 새 MutationObserver 생성
const observer = new MutationObserver(callback);

// 구성 설정: 속성 변경 관찰
const config = { attributes: true };

// 지정된 요소 관찰 시작
observer.observe(observedElement, config);
```

## 8. IntersectionObserver를 활용한 적응형 스크롤링: 가시성 기반 상호작용

<div class="content-ad"></div>

IntersectionObserver은 대상 요소와 상위 요소 또는 최상위 문서 뷰포트의 교차점에서 발생하는 변화를 비동기적으로 관찰하는 방법을 제공하는 API입니다. 이는 요소가 뷰포트에 들어오거나 나갈 때 또는 다른 특정 요소와 교차할 때 코드를 실행할 수 있음을 의미합니다.

이는 이미지의 지연로딩, 무한 스크롤, 스크롤 위치에 기반한 애니메이션 등에 특히 유용합니다.

예시:

```js
<div
  id="special-element"
  style="height: 500px; background-color: grey; margin-top: 1000px;"
>
  화면에 보이면 색상이 변경됩니다!
</div>
```

<div class="content-ad"></div>

```js
// 관찰 대상 요소와 교차하는 경우 호출할 함수
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundColor = "lightgreen";
    } else {
      entry.target.style.backgroundColor = "grey";
    }
  });
}

// 콜백 함수를 사용하여 IntersectionObserver 생성
const observer = new IntersectionObserver(handleIntersection);

// 요소를 관찰 시작
const specialElement = document.getElementById("special-element");
observer.observe(specialElement);
```

## 읽어 주셔서 감사합니다!

이 글이 유용했으면 좋겠어요. 궁금한 점이나 제안 사항이 있으면 댓글을 남겨주세요. 여러분의 피드백이 저에게 도움이 됩니다.

구독하지 않을래요⭐```
