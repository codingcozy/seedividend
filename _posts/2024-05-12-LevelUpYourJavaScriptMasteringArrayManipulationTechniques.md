---
title: "자바스크립트 실력 업그레이드 배열 조작 기술 마스터하기"
description: ""
coverImage: "/assets/img/2024-05-12-LevelUpYourJavaScriptMasteringArrayManipulationTechniques_0.png"
date: 2024-05-12 23:57
ogImage: 
  url: /assets/img/2024-05-12-LevelUpYourJavaScriptMasteringArrayManipulationTechniques_0.png
tag: Tech
originalTitle: "Level Up Your JavaScript: Mastering Array Manipulation Techniques"
link: "https://medium.com/@tomas-svojanovsky/level-up-your-javascript-mastering-array-manipulation-techniques-c765eb46a879"
---


JavaScript에서 배열은 값들의 컬렉션을 저장하고 조작할 수 있게 해주는 기본 데이터 구조입니다.

배열이 유용한 이유 중 하나는 내장된 다양한 메서드를 제공하여 배열 내 요소를 쉽게 추가, 제거, 조작할 수 있다는 점입니다.

![이미지](/assets/img/2024-05-12-LevelUpYourJavaScriptMasteringArrayManipulationTechniques_0.png)

## Push



배열에 요소를 추가해야 할 때는 push 메서드를 사용하는 것이 좋습니다. 이 메서드는 배열의 끝에 요소를 추가하며 기존 요소에 영향을 주지 않습니다. 새 배열의 총 개수를 반환합니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];

const totalCount = animals.push("bird");

console.log(totalCount) // 5
console.log(animals); // ["dog", "cat", "chicken", "shark", "bird"]
```

## Pop

배열에서 요소를 제거하는 것은 추가하는 것만큼 간단합니다. 이 작업을 수행하는 한 가지 방법은 pop 메서드를 사용하는 것입니다. pop 메서드는 배열에서 마지막 요소를 제거하고 해당 요소를 반환합니다.



```js
const animals = ["dog", "cat", "chicken", "shark"];

const element = animals.pop();

console.log(element); // shark
console.log(animals); // ["dog", "cat", "chicken"]
```

## 연결하기

만약 여러 값을 추가하고 싶다면 어떻게 해야 할까요? push로는 예상한 대로 작동하지 않을 것입니다. 이럴 때는 concat 메서드를 사용하여 두 개 이상의 배열을 결합할 수 있습니다.

```js
let animals = ["dog", "cat", "chicken", "shark"];

animals.push(["bird", "eagle"]);
console.log(animals); // Nope ["dog", "cat", "chicken", "shark", ["bird", "eagle"]]

animals = ["dog", "cat", "chicken", "shark"];

const extendedAnimals = animals.concat(["bird", "eagle"]);

console.log(extendedAnimals); // ["dog", "cat", "chicken", "shark", "bird", "eagle"]
console.log(animals); // ["dog", "cat", "chicken", "shark", "bird"]
```



## 슬라이스

슬라이스 메소드는 전체 배열의 새로운 사본을 만들거나 배열의 일부를 추출하여 새 배열에 저장하는 데 사용할 수 있습니다.

음수 인덱스를 사용하면 배열 끝에서 요소에 접근해야 할 때 정확한 길이를 모르더라도 편리합니다.

그러나 슬라이스에 의해 생성된 사본은 얕은 복사입니다. 이는 원래 배열이 중첩된 배열이나 객체를 포함하는 경우 사본 내의 해당 중첩된 요소에 대한 수정이 원래 배열에도 반영된다는 것을 의미합니다.



```js
const animals = ["dog", "cat", "chicken", "shark"];

const last = animals.slice(-1);
const lastTwo = animals.slice(-2);
const first = animals.slice(0, 1);
const catChicken = animals.slice(1, 3);

console.log(last); // ["shark"]
console.log(lastTwo) // ["chicken", "shark"]
console.log(first); // ["dog"]
console.log(catChicken); // ["cat", "chicken"]

const copy = animals.slice();

console.log(copy);

copy.push("spider");

console.log(copy); // ["dog", "cat", "chicken", "shark", "spider"]
console.log(animals); // ["dog", "cat", "chicken", "shark"]
```

## Join

가끔 배열을 문자열로 변환해야 할 때가 있습니다. 배열 항목을 출력해야 할 때 유용합니다. 항목 사이에 끼워넣을 구분자를 지정해야 합니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];
console.log(animals.join(", ")); // dog, cat, chicken, shark
```



## 스플라이스

특정 위치에서 배열에 요소를 추가하거나 제거해야 할 때는 splice 메소드가 유용합니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];
const removed = animals.splice(1, 2);

console.log(removed); // ["cat", "chicken"]
console.log(animals); // ["dog", "shark"]
```

## Shift



배열에서 요소를 제거해야 할 때는 shift 메소드가 편리한 선택지입니다. 또한 제거된 요소를 반환합니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];

const removed = animals.shift();
console.log(removed); // "dog"
console.log(animals); // ["cat", "chicken", "shark"]
```

## Unshift

unshift 메소드를 사용하면 배열의 시작 부분에 하나 이상의 요소를 추가할 수 있습니다. push와 유사합니다. 배열의 새로운 길이를 반환합니다.



```js
const animals = ["dog", "cat", "chicken", "shark"];

const totalCount = animals.unshift("deer", "tiger");
console.log(totalCount); // 6
console.log(animals); // ["deer", "tiger", "dog", "cat", "chicken", "shark"]
```

## IndexOf

indexOf 메서드를 사용하여 배열에서 항목의 위치를 쉽게 찾을 수 있습니다. 이 메서드는 배열에서 지정된 요소의 첫 번째 발생을 검색하고 해당 인덱스를 반환합니다. 요소를 찾지 못하면 indexOf는 -1을 반환합니다.

추가로, indexOf에 두 번째 인수를 제공하여 배열에서 검색을 시작할 인덱스를 지정할 수 있습니다. 요소의 인덱스를 알게 되면 splice와 같은 메서드를 사용하여 쉽게 해당 요소를 교체하거나 제거할 수 있습니다.



```js
const animals = ["dog", "cat", "chicken", "shark"];

let index = animals.indexOf("cat");
console.log(index); // 1

index = animals.indexOf("cat", 2);
console.log(index); // -1
```

## 찾기

특정 조건에 맞는 요소를 찾아야 하는 경우가 있었나요? `find` 메소드는 배열에서 원하는 조건에 맞는 첫 번째 요소를 찾아줍니다.

```js
const animals = [
    {
        id: 1, type: "dog", name: "Luna",
    },
    {
        id: 2, type: "cat", name: "Smokey",
    },
];

const found = animals.find(animal => animal.id === 2);
const notFound = animals.find(animal => animal.id === 10);

console.log(found); // { id: 2, type: 'cat', name: 'Smokey' }
console.log(notFound); // undefined
```



## 포함 여부 확인

배열에서 항목의 존재 여부를 확인해야 하는 경우 includes 메서드가 유용합니다! 이 메서드는 부울 값으로 반환됩니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];

const hasChicken = animals.includes("chicken");
const hasTiger = animals.includes("tiger");

console.log(hasChicken); // true
console.log(hasTiger); // false
```

## ForEach



forEach는 배열을 반복하는 동안 현재 요소와 함께 인덱스 매개변수를 제공합니다. 이는 콜백 함수를 사용하는 장점으로 전통적인 for 루프와 유사하게 작동합니다.

for 루프와는 달리 forEach에서 탈출하는 내장 메커니즘이 없습니다. 그러나 콜백 내에서 예외를 throw하거나 조건문을 사용하여 조기 종료를 달성할 수 있습니다. 이러한 경우, 다른 옵션을 찾아보는 것이 좋습니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];

animals.forEach((animal, index) => {
    console.log(animal, index);
});

// dog 0
// cat 1
// chicken 2
// shark 3
```

## Map



만약 배열의 데이터를 수정하고 수정된 데이터로 새로운 배열을 만들어야 한다면, map 메서드를 사용할 수 있어요. 콜백 함수를 통해 각 요소에 대해 원하는 작업을 수행하고 수정된 값을 반환할 수 있어요.

```js
const animals = ["dog", "cat", "chicken", "salmon"];

const indexed = animals.map((animal, index) => {
    return `${index}.${animal}`;
});

console.log(indexed);
// ["1.dog", "2.cat", "3.chicken", "4.salmon"]
```

## Filter

커스텀 조건에 따라 배열에서 일부 요소를 제거하고 원하는 요소만 포함하는 새로운 배열을 얻어야 한다면, filter 메서드를 사용할 수 있어요. 이는 원본 배열을 수정하지 않고 새로운 배열을 생성한다는 점에서 map과 다릅니다.



필터에 제공하는 콜백 함수는 새 배열에 포함될 요소에 대해 true를 반환하고 제외될 요소에 대해 false를 반환해야 합니다.

```js
const animals = [
    {
        id: 1, type: "dog", name: "Luna", age: 1
    },
    {
        id: 2, type: "cat", name: "Smokey", age: 3,
    },
    {
        id: 3, type: "dog", name: "Charlie", age: 5,
    },
    {
        id: 4, type: "cat", name: "Boo", age: 1,
    },
];

const adultAnimals = animals.filter(animal => animal.age > 1);
console.log(adultAnimals);
// [
//     { id: 2, type: 'cat', name: 'Smokey', age: 3 },
//     { id: 3, type: 'dog', name: 'Charlie', age: 5 }
// ]
```

## Reduce

리듀스 메서드는 맵(map)과 필터(filter)보다 직관적이지 않습니다. 이 메서드는 배열 내 각 요소에서 작동하는 콜백 함수와 누적값(accumulated value)을 고려합니다. 누적값은 이전 반복에서 콜백 함수의 결과이며 현재 반복에서 콜백 함수에 첫 번째 인수로 전달됩니다.



reduce는 다양한 작업에 사용할 수 있는 다재다능한 함수입니다. 배열의 합을 계산하거나, 다차원 배열을 평평하게 만들거나, 조건에 따라 배열을 변형하는 등의 작업에 사용할 수 있습니다.

```js
const ages = [10, 45, 45, 8, 6, 44, 43];
const totalCount = ages.reduce((이전값, 현재값) => {
    return 이전값 + 현재값;
}, 0);

console.log(totalCount); // 201
console.log(Math.round(totalCount / ages.length)); // 29
```

## ReduceRight

이 함수는 reduce와 거의 비슷하지만, 오른쪽에서 왼쪽으로 요소를 읽어옵니다. 순서가 중요할 때 유용하게 활용할 수 있습니다.



```js
const ages = [10, 45, 45, 8, 6, 44, 43];
const totalCount = ages.reduceRight((previous, current) => {
    console.log(current); // 43, 44, 6 ...
    return previous + current;
}, 0);

console.log(totalCount); // 201
console.log(Math.round(totalCount / ages.length)); // 29
```

## Every

every 메서드는 제공된 콜백 함수에 의해 구현된 테스트를 통과하는 배열의 모든 요소를 검증하는 데 사용됩니다.

every는 모든 요소가 콜백 함수에서 지정된 조건을 충족하는 경우에만 true를 반환합니다. 콜백 함수에서 요소 중 하나라도 테스트를 통과하지 못하면 (콜백이 false를 반환하면) every는 즉시 반복을 중지하고 false를 반환합니다.



```js
const ages = [31, 10, 45, 8, 6, 44, 43];
const allOver18 = ages.every(age => {
   console.log(age); // 31, 10
   return age > 18
});
console.log(allOver18); // false
```

## 일부

every와 반대로 사용하며 하나 이상의 요소가 사용자 정의 조건을 충족하는지 확인하려면 some 메서드를 사용할 수 있습니다.

```js
const ages = [10, 45, 45, 8, 6, 44, 43];
const isSomeoneChild = ages.some(age => age < 18);
console.log(isSomeoneChild); // true
```



## Flat

flat 메서드는 모든 하위 배열 요소가 연결된 새 배열을 생성합니다. 이 프로세스는 재귀적일 수 있으며 지정된 깊이까지 중첩된 하위 배열을 평탄화합니다.

이전에는 reduce 메서드를 사용하여 평탄화를 수행할 수 있었지만, flat은 이 작업에 대해 더 간결하고 내장된 솔루션을 제공합니다.

```js
const animals = ["dog", "cat", "chicken", "salmon", ["spider", "horse"]];
console.log(animals.flat()); // [ "dog", "cat", "chicken", "salmon", "spider", "horse" ]
```



## FlatMap

이전에 평탄화할 수 있었던 것은 map과 flat을 결합함으로써 이루어졌었습니다. 그러나 flatMap은 더 간결한 방식을 제공합니다.

이 메소드는 사실상 이 두 가지 방법을 하나의 단계로 결합합니다. flatMap은 배열의 각 요소에 콜백 함수를 적용한 다음 결과를 한 단계로 평탄화하여 새 배열을 생성합니다.

filter + map을 사용한 첫 번째 예제를 살펴보겠습니다.



```js
const owners = [
  { name: "Alice", pets: [{ type: "cat", name: "Luna" }] },
  { name: "Bob", pets: [{ type: "dog", name: "Charlie" }, { type: "cat", name: "Whiskers" }] },
  { name: "Charlie", pets: [] },
];

const catNames = owners.flatMap(owner => owner.pets)
  .filter(pet => pet.type === "cat")
  .map(cat => cat.name);

console.log(catNames);
```

이제 flatMap을 사용하여 다시 작성해 봅시다.

```js
const owners = [
  { name: "Alice", pets: [{ type: "cat", name: "Luna" }] },
  { name: "Bob", pets: [{ type: "dog", name: "Charlie" }, { type: "cat", name: "Whiskers" }] },
  { name: "Charlie", pets: [] },
];

const catNames = owners
  .flatMap(owner => owner.pets.flatMap(pet => (pet.type === "cat" ? pet.name : [])));

console.log(catNames); //  ["Luna", "Whiskers"]
```

## ToSpliced




이 기능은 splice와 유사하게 작동합니다.

그러나 중요한 차이점이 있습니다: splice는 원래 배열을 직접 수정하지만 toSpliced는 제거된 요소를 제외한 새로운 배열을 생성합니다. 게다가 splice는 제거된 요소를 별도의 배열로 반환하는 반면 toSpliced는 변경된 배열 자체에 중점을 둡니다.

```js
const animals = ["개", "고양이", "닭", "상어"];

const cleanedArray = animals.toSpliced(1, 2);

console.log(removed); // ["개", "상어"]
console.log(animals); // ["개", "고양이", "닭", "상어"]
```

## 정렬



배열의 요소를 기본적으로 오름차순으로 정렬합니다. 이 메서드는 정렬된 동일한 배열에 대한 참조를 반환하며, 이제 정렬되었습니다.

```js
const animals = ["dog", "cat", "chicken", "shark"];

animals.sort();

console.log(animals); // ["cat", "chicken", "dog", "shark"]
```

## ToSorted

원 배열을 직접 수정하는 sort 메서드와 달리, toSorted는 배열의 새로운 복사본을 만듭니다. 따라서 원래 배열은 그대로 유지됩니다.



```js
const animals = ["dog", "cat", "chicken", "shark"];

const sortedAnimals = animals.toSorted();

console.log(sortedAnimals); // [ "cat", "chicken", "dog", "shark" ]
console.log(animals); // ["cat", "chicken", "dog", "shark"]
```

## With

해당 인덱스의 값을 변경합니다. 주어진 값으로 주어진 인덱스를 대체한 새로운 배열을 반환합니다. 일반적으로 대괄호와 인덱스로 이 작업을 수행하지만 기존 배열을 수정합니다.

```js
let animals = ["dog", "cat", "chicken", "shark"];

animals[0] = "spider";
console.log(animals); // ["spider", "cat", "chicken", "shark"]

animals = ["dog", "cat", "chicken", "shark"];

const newAnimals = animals.with(0, "spider");

console.log(newAnimals); // ["spider", "cat", "chicken", "shark"]
console.log(animals); // ["dog", "cat", "chicken", "shark"]
```