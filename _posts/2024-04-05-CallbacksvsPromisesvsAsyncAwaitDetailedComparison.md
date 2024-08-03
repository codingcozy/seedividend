---
title: "콜백 vs 프로미스 vs Async Await 자세한 비교 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Callbacks vs Promises vs Async Await Detailed Comparison"
link: "https://medium.com/womenintechnology/callbacks-vs-promises-vs-async-await-detailed-comparison-d1f6ae7c778a"
---



<img src="/assets/img/CallbacksvsPromisesvsAsyncAwaitDetailedComparison_0.png" />

# 소개

콜백, 프로미스 및 async/await, 이것들은 자바스크립트에서 비동기 동작을 처리하는 방법입니다. 서버에서 데이터를 가져오거나 파일을 업로드하거나 사용자 상호작용을 처리하기 위해 비동기 프로그래밍이 필요합니다. 처음에는 콜백을 사용했지만, 중첩이 깊어지고 코드가 복잡해지는 등의 문제가 있었습니다. 이러한 상황을 해결하기 위해 프로미스와 async/await 같은 개념이 소개되었습니다. 이러한 개념들은 가독성 있고 깔끔한 코드를 제공하는 데 도움이 되었습니다. 이제 사용 방법에 따라 이들을 비교하는 방법에 대해 자세히 알아보겠습니다.

# 콜백

<div class="content-ad"></div>

콜백(callback)은 다른 함수에 인수로 전달되어 특정 작업이 완료되면 실행되는 함수들입니다.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("데이터를 가져왔어요");
  }, 1000);
}

fetchData((result) => {
  console.log(result); // 출력: 데이터를 가져왔어요
});
```

위 예제에서는 fetchData() 함수를 정의했는데, 1초의 지연시간이 있습니다. 그렇기 때문에 결과는 1초 후에 렌더링됩니다.

콜백 지옥(callback hell) 문제: 여러 비동기 작업이 있는 경우 문제가 발생합니다. 중첩 구조를 형성하여 코드를 읽기 어렵고 복잡하게 만듭니다.

<div class="content-ad"></div>

콜백의 장점

- 매우 간단하고 널리 지원됩니다.
- 간단한 비동기 작업을 처리할 때 효율적입니다.

콜백의 단점

- 여러 개의 비동기 작업을 다룰 때 복잡해져서 콜백 지옥에 빠질 수 있습니다.
- 코드가 복잡해지고 이해하기 어려워져 에러 처리가 어려운 작업입니다.

<div class="content-ad"></div>

# 프라미스

프라미스는 비동기 작업의 완료 또는 실패를 나타내는 것입니다. 여러 비동기 작업을 연결할 수 있도록 해줍니다. 프라미스에는 기본적으로 세 가지 상태가 있습니다. 즉, resolve, pending 및 reject입니다.

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("데이터 가져옴");
    }, 1000);
  });
}

fetchData()
  .then((result) => {
    console.log(result); // Output: 데이터 가져옴
  })
  .catch((error) => {
    console.error(error);
  });
```

위의 코드에서는 fetchData() 함수를 포함하고 있는데, 해당 함수는 프라미스를 반환합니다. 프라미스가 해결되면 결과가 표시되며, 거부되면 catch 블록이 실행되어 오류가 표시됩니다.

<div class="content-ad"></div>

Promise 체이닝:

```js
fetchData()
  .then((result) => {
    return processData(result);
  })
  .then((processedData) => {
    console.log(processedData);
  })
  .catch((error) => {
    console.error(error);
  });
```

위 코드에서 fetchData() 함수는 해결되거나 거부됩니다. 요청이 해결된 경우 .then이 단계별로 실행됩니다. 그러나 요청이 거부된 경우 체인은 .catch 블록에 도달할 때까지 실행되어 오류를 표시합니다.

프로미스의 장점

<div class="content-ad"></div>

- Promises는 체이닝을 제공하여 콜백 지옥의 주요 문제를 해결합니다. 이는 코드를 더 읽기 쉽고 깔끔하게 만듭니다.
- Promises를 사용하면 .catch()를 사용하여 에러 처리를 개선할 수 있습니다.

Promises의 단점

- Promises API를 깊게 이해해야 하기 때문에 여러 속성과 메서드가 포함되어 있습니다.

# Async/Await

<div class="content-ad"></div>

비동기/대기는 프로미스 위에 구축된 기능으로, 더 나은 성능을 위해 만들어졌습니다. 더 간결하고 동기식과 유사한 방식으로 비동기 프로그램을 작성할 수 있습니다. await 키워드는 항상 async 함수 범위 내에서 사용됩니다.

```js
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 1000);
  });
}

async function getData() {
  try {
    const result = await fetchData();
    console.log(result); // 출력: Data fetched
  } catch (error) {
    console.error(error);
  }
}

getData();
```

위 코드에서 fetchData() 함수는 프로미스를 반환합니다. getData()는 try catch 블록을 포함하는 async 함수입니다. fetchData() 함수의 결과를 기다리는 result가 있습니다. 프로미스가 해결되면 결과가 표시되고, 그렇지 않으면 catch 블록이 실행됩니다.

비동기/대기의 장점:

<div class="content-ad"></div>

# 비교

장점

- 비동기/대기는 프로미스 및 콜백에 비해 훨씬 가독성이 좋습니다. 동기 코드와 매우 유사하여 이해하기 쉽습니다.
- 프로미스를 기반으로 구축되어 두 가지 사이의 호환성을 제공합니다.

단점

- 오래된 버전에서의 지원이 제한적입니다.

<div class="content-ad"></div>

- 성능: 비교해봤을 때, 프로미스와 async/await은 콜백에 비해 약간의 오버헤드가 발생합니다. 이는 추상화 레이어 때문인데, 그 차이는 거의 무의미합니다.
- 가독성 및 유지보수성: Async/await이 가장 읽기 쉽고 유지보수하기 쉬운 코드를 제공하며, 그 다음으로 프로미스가 따릅니다. 그러나 콜백은 콜백 지옥에 빠지기 쉽습니다.
- 오류 처리: Async/await은 가장 깔끔한 코드를 제공하는 최고의 오류 처리 구문을 제공합니다. 이를 프로미스가 따르며, 콜백은 대부분 오류에 취약합니다.
- 순차 vs 병렬 작업: 세 가지 접근 방식 모두 순차 및 병렬 작업을 모두 제공합니다. Async/await 및 프로미스는 순차 작업에 대해 깔끔하고 유지보수 가능한 구문을 제공합니다.

# 모베스트 프랙티스 및 사용 사례

- 콜백 사용 시기: 콜백은 간단하고 쉬운 비동기 작업이나 콜백만 지원하는 API를 처리할 때 사용합니다.
- 프로미스 사용 시기: 프로미스는 .then을 사용해 보다 구조화된 방식으로 여러 비동기 작업을 처리하기에 적합합니다.
- Async/Await 사용 시기: 복잡한 작업을 포함하는 여러 비동기 작업에 적합하며, 깔끔하고 읽기 쉬운 비동기 코드를 작성할 때 Async/Await을 사용하세요.

# 이주 및 적용

<div class="content-ad"></div>

- Callbacks에서 Promises로의 이전: 향상된 가독성과 에러 핸들링을 위해 콜백 기반 코드를 Promises로 다시 작성합니다.
- Promises에서 Async/Await로의 이전: Promises를 Async/Await로 변환하여 더 깔끔하고 동기적인 코드를 완성합니다.

# 결론

콜백, Promises, 그리고 Async/Await는 JavaScript에서 비동기 작업을 처리하는 다양한 방법을 제공합니다. 콜백은 간단하지만 콜백 지옥에 빠질 가능성이 있고, Promises와 Async/Await는 더 깔끔하고 가독성이 좋은 코드 구조를 제공합니다. 올바른 방법을 선택하는 것은 비동기 작업의 특정 요구사항과 복잡성에 따라 다릅니다.
