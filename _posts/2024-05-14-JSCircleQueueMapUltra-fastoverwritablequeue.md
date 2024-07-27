---
title: "자바스크립트 CircleQueue  Map  빠르고 덮어쓸 수 있는 큐"
description: ""
coverImage: "/assets/img/2024-05-14-JSCircleQueueMapUltra-fastoverwritablequeue_0.png"
date: 2024-05-14 13:03
ogImage: 
  url: /assets/img/2024-05-14-JSCircleQueueMapUltra-fastoverwritablequeue_0.png
tag: Tech
originalTitle: "[JS] CircleQueue + Map = Ultra-fast overwritable queue"
link: "https://medium.com/@codespitz/circlequeue-map-ultra-fast-overwritable-queue-c8cfb60981d3"
---


시퀀셜하게 실행해야 하는 작업들을 대기열에 넣고 일정 간격으로 처리하는 시스템은 매우 흔합니다. 프론트엔드용 새로운 뷰 시스템을 개발하는 도중, 프레임별로 대기열에서 처리할 수 있는 작업량만 시간 제한 내에 처리하는 메커니즘을 도입했습니다. 초당 60프레임 제한으로 한 프레임 당 실행 시간은 16밀리초입니다. 대기열 작업 처리가 16밀리초를 초과하면 남은 작업은 다음 프레임에서 처리됩니다.

대기열에 누적된 많은 작업들이 매 프레임마다 실행되어야 하는 경우, 빠른 속도로 대기열 작업을 디큐하는 과정이 필요했습니다. 또한, 대기열에 이미 동일한 식별 키를 갖는 작업이 존재할 경우 해당 작업은 무시되고 새 작업으로 덮어쓰이는 기능을 구현해야 했습니다.

- 고속 인큐 및 디큐 작업.
- 각 작업에 할당된 키가 동일한 경우 덮어쓰기.

먼저 간단한 자바스크립트로 이 문제를 해결해 보겠습니다. 가장 먼저 떠오르는 방법은 서큘러 큐입니다. 버퍼 크기를 초과하지 않는 한 요소를 인큐하고 디큐하는 것은 쉽습니다. 저는 이를 단순한 버전으로 구현했습니다.



```js
class MapQueue{
  #size;
  #front = 0;
  #rear = 0;
  #length = 0;
  constructor(size){this.#size = size;}
  length(){return this.#length;}
  add(value){
    if(this.#length === this.#size) throw new Error('overflow');
    this[this.#rear++] = value;
    if(this.#rear === this.#size) this.#rear -= this.#size;
    this.#length++;
  }
  shift(){
    if(!this.#length) return null;
    this.#length--;
    const data = this[this.#front++];
    if(this.#front === this.#size) this.#front -= this.#size;
    return data;
  }
}
```

원과 리어 포인터를 사용하는 원형 큐의 매우 전형적인 구현으로, 모듈로 연산 대신에 사이즈를 미리 빼는 약간의 성능적 이점이 있습니다.

객체가 배열이 아니기 때문에 이미 이것만으로 초고속 큐가 완성되었습니다. 이제 두 번째 요구사항에 대해 다룰 차례입니다: 같은 키에 대한 덮어쓰기입니다.

```js
const EMPTY = Object.create(null);
class MapQueue{
  #keys = Object.create(null);
  #size;
  #front = 0;
  #rear = 0;
  #length = 0;
  constructor(size){this.#size = size;}
  length(){return this.#length;}
  set(key, value){
    if(this.#keys[key] === undefined){
      if(this.#length === this.#size) throw new Error('overflow');
      this.#keys[key] = this.#rear;
      this[this.#rear++] = value;
      if(this.#rear === this.#size) this.#rear -= this.#size;
      this.#length++;
    }else{
      const old = this[this.#keys[key]];
      this[this.#keys[key]] = value;
      return old;
    }
  }
  get(key){
    if(this.#keys[key] === undefined) return null;
    return this[this.#keys[key]];
  }
  remove(key){
    if(this.#keys[key] === undefined) return;
    this[this.#keys[key]] = EMPTY;
    delete this.#keys[key];
    this.#length--;
  }
  shift(){
    if(!this.#length) return null;
    while(this[this.#front] === EMPTY){
      delete this[this.#front];
      this.#front++;
      if(this.#front === this.#size) this.#front -= this.#size;
    }
    const data = this[this.#front];
    delete this[this.#front];
    this.#front++;
    if(this.#front === this.#size) this.#front -= this.#size;
    this.#length--;
    return data;
  }
}
```



특성:
- #keys: 키와 해당 키의 인덱스를 큐에 저장하는 맵으로 사용되는 객체입니다.
- #size: 큐의 최대 크기입니다.
- #front: 큐의 맨 앞 요소의 인덱스입니다.
- #rear: 다음 요소가 큐에 추가될 인덱스입니다.
- #length: 큐 안 현재 요소의 수입니다.

메서드:
- constructor(size): 주어진 최대 크기로 큐를 초기화하는 생성자 메서드입니다.
- length(): 큐 안 현재 요소의 수를 반환합니다.
- set(key, value): 지정된 키와 값으로 새 요소를 큐에 추가합니다. 키가 이미 존재하는 경우 해당 값이 업데이트되고 이전 값을 반환합니다. 큐가 꽉 찬 경우 'overflow' 오류를 발생시킵니다.
- get(key): 큐에서 지정된 키와 관련된 값을 검색합니다. 키가 존재하지 않는 경우 null을 반환합니다.
- remove(key): 큐에서 지정된 키를 가진 요소를 제거합니다. 키가 존재하지 않는 경우 아무 작업도 수행하지 않습니다. 제거된 요소를 EMPTY로 표시합니다.
- shift(): 큐에서 맨 앞 요소를 제거하고 반환합니다. 큐가 비어 있는 경우 null을 반환합니다. 큐의 맨 앞에 있는 EMPTY 요소를 건너뛰고 제거합니다.

이 코드는 객체 기반의 원형 큐 접근 방식을 사용하여 빠른 큐를 구현합니다. 고유한 키로 요소를 추가하고, 기존 키에 대한 값 업데이트, 키별로 요소 제거, 맨 앞 요소 검색을 지원합니다. 큐는 요소가 큐 중간에서 제거될 때 해당 요소를 EMPTY로 표시하고, 앞에서 요소를 이동할 때 해당 요소를 건너뛰는 방식으로 효율적으로 처리합니다.