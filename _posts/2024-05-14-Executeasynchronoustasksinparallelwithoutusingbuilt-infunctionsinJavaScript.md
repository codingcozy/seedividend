---
title: "JavaScript에서 내장 함수를 사용하지 않고 비동기 작업을 병렬로 실행하기"
description: ""
coverImage: "/assets/img/2024-05-14-Executeasynchronoustasksinparallelwithoutusingbuilt-infunctionsinJavaScript_0.png"
date: 2024-05-14 13:59
ogImage: 
  url: /assets/img/2024-05-14-Executeasynchronoustasksinparallelwithoutusingbuilt-infunctionsinJavaScript_0.png
tag: Tech
originalTitle: "Execute asynchronous tasks in parallel without using built-in functions in JavaScript"
link: "https://medium.com/@sasmita-ojha/execute-asynchronous-tasks-in-parallel-without-using-built-in-functions-in-javascript-a2da20619a5f"
isUpdated: true
---




![Excute Asynchronous Tasks in Parallel without Using Built-in Functions in JavaScript](/assets/img/2024-05-14-Executeasynchronoustasksinparallelwithoutusingbuilt-infunctionsinJavaScript_0.png)

비동기 작업은 데이터베이스에서 데이터를 가져오거나 네트워크 요청을 만들거나 파일에서 읽는 등 외부 이벤트를 기다리는 작업이 포함된 상황에서 특히 흔히 발생합니다.

이러한 작업이 완료될 때까지 전체 프로그램을 멈추지 않고 비동기 작업은 서로 독립적으로 실행되며 서로 다른 시간에 완료될 수 있으므로 효율성과 반응성이 향상됩니다.

비동기 병렬 실행을 통해 작업을 동시에 실행할 수 있으므로 하드웨어의 기능(예: 다중 CPU 코어)을 활용할 수 있습니다. 이는 시스템 자원을 더 효율적으로 사용하고 작업을 빠르게 완료할 수 있게 합니다. 예: 일괄 처리, 웹 서버 요청의 동시 실행.



자바스크립트는 Promise.all()이나 Promise.race()와 같은 내장 함수를 제공하여 비동기 병렬 실행을 달성할 수 있습니다. 이러한 내장 함수들은 간단한 경우에 편리하지만, 더 복잡한 시나리오를 위해 자체 병렬 비동기 함수를 사용하면 더 많은 제어, 유연성 및 최적화 가능성을 제공할 수 있습니다.

동일한 작업을 Promises를 사용하여 수행하기 위해 사용자 지정 함수를 작성하는 샘플 예제를 찾아보세요.

```js
const executeParallel = (tasks) => {
  return new Promise((resolve, reject) => {
    const results = []; // 작업의 결과를 저장합니다
    let completedCount = 0; // 완료된 작업을 추적합니다

    const handleResolve = (result, index) => {
      results[index] = result;
      completedCount++;
      if (completedCount === tasks.length) {
        resolve(results);
      }
    };

    const handleReject = (error) => {
      reject(error);
    };

    tasks.forEach((task, index) => {
      task()
        .then((result) => {
          // 모든 작업이 완료되면 주 Promise를 해결합니다
          handleResolve(result, index);
        })
        .catch((error) => {
          handleReject(error); // 작업 중 하나라도 실패할 경우 Promise를 거부합니다
        });
    });
  });
};

// 예제 작업
const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('작업 1 완료');
    }, 200);
  });
};

const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('작업 2');
    }, 10);
  });
};

const task3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('105');
    }, 50);
  });
};

executeParallel([task1, task2, task3])
  .then((results) => {
    console.log('모든 작업 완료:', results);
  })
  .catch((error) => {
    console.error('에러:', error);
  });
```

위 구현에서:



- executeParallel() 함수는 각각이 Promise를 반환하는 함수인 작업 배열을 가져옵니다.
- executeParallel() 내에서 모든 작업의 완료를 추적하는 주요 Promise가 생성됩니다.
- 각 작업은 Promise.resolve(task())를 사용하여 비동기적으로 실행됩니다.
- 작업이 완료되면 그 결과가 배열에 저장되고 completedCount가 증가합니다.
- 작업 중에 오류가 발생하면 주요 Promise는 해당 오류로 거부됩니다.
- 모든 작업이 완료되면 주요 Promise는 결과 배열로 해결됩니다.

이 블로그가 도움이 되고 통찰력을 줬기를 바랍니다. 읽어주셔서 감사합니다.