---
title: "React 스킬을 향상시키는 방법 Promises"
description: ""
coverImage: "/assets/img/2024-05-12-LevelUpYourReactSkillswithPromises_0.png"
date: 2024-05-12 19:50
ogImage: 
  url: /assets/img/2024-05-12-LevelUpYourReactSkillswithPromises_0.png
tag: Tech
originalTitle: "Level Up Your React Skills with Promises"
link: "https://medium.com/@swfungineer/react-promise-19417375eaad"
isUpdated: true
---




<img src="/assets/img/2024-05-12-LevelUpYourReactSkillswithPromises_0.png" />

React에서 Promise은 JavaScript의 기능 중 하나로 사용되는 비동기 작업을 처리하는 데 사용됩니다. Promise는 작업이 완료될 때 무엇을 할지 나타내는 객체입니다. 네트워크 요청, 파일 로드 및 데이터베이스 쿼리와 같은 비동기 작업을 처리하는 데 일반적으로 사용됩니다.

React에서 Promise은 일반적으로 데이터를 가져오거나 수정할 때 사용됩니다. 예를 들어, API 요청을 보내고 응답을 기다릴 때 Promise를 사용하여 데이터를 비동기적으로 가져옵니다.

React에서 Promise는 비동기 작업의 결과를 처리하고 상태를 업데이트하거나 UI를 업데이트하는 데 사용됩니다. 일반적으로 fetch() 함수를 사용하여 API 요청을 보내고 Promise를 사용하여 응답을 처리합니다.



예를 들어, React에서 데이터를 가져오기 위해 Promise를 사용하는 간단한 예제가 다음과 같습니다:

```js
fetch('https://api.example.com/data')
  .then(response => response.json()) // Promise를 사용하여 응답을 JSON 형식으로 파싱
  .then(data => {
    // 파싱된 데이터를 처리하거나 상태를 업데이트하는 작업 수행
    console.log(data);
  })
  .catch(error => {
    // 에러 처리
    console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
  });
```

이 예제에서, fetch() 함수를 사용하여 API에서 데이터를 가져옵니다. 이 함수는 Promise를 반환하며, 데이터가 성공적으로 가져와지면 .then() 메서드를 사용하여 응답을 처리합니다. 에러가 발생하면 .catch() 메서드를 사용하여 에러를 처리합니다.

그렇다면 비동기 작업이 필요한 이유는 무엇일까요? 비동기 작업이 필요한 주요 이유는 주로 다음과 같습니다:



- 성능 개선: 비동기 작업을 사용하여 여러 작업을 동시에 처리함으로써 전체 성능을 향상시킬 수 있습니다. 특히 네트워크 요청이나 파일 로딩과 같은 I/O 작업에서 비동기 작업을 사용하면 응답 대기 시간을 줄일 수 있습니다.
- 향상된 사용자 경험: 비동기 작업은 사용자 인터페이스를 더 반응적이고 빠르게 만듭니다. 예를 들어 데이터를 비동기적으로 가져와 웹 페이지에 표시할 때 페이지의 로딩 시간이 줄어들어 사용자가 더 빨리 상호 작용할 수 있습니다.
- 자원 관리: 비동기 작업은 효율적인 자원 관리를 가능하게 합니다. 특히 멀티스레딩을 통해 여러 작업을 동시에 처리하고 자원을 효율적으로 활용할 수 있습니다.

비동기 작업과 비교해 동기 작업은 한 번에 하나의 작업만 처리하고 다른 작업이 완료될 때까지 기다립니다. 동기 작업을 사용하면 성능이 저하되고 사용자 경험이 줄어들 수 있습니다. 왜냐하면 작업이 순차적으로 실행되기 때문입니다. 또한, 동기 작업에서 하나의 작업이 느리게 실행되면 다른 작업이 기다려야 하므로 시스템 전체 효율성이 감소합니다.

동기 작업 예시:

```js
function syncTask() {
  console.log("동기 작업 시작");
  console.log("동기 작업 진행 중...");
  console.log("동기 작업 완료");
}

console.log("프로그램 시작");
syncTask();
console.log("프로그램 종료");
```



이 코드에서 syncTask() 함수는 동기적으로 실행되며, 해당 함수의 작업이 완료될 때까지 이후의 코드가 진행되지 않습니다. 그래서 출력은 다음과 같습니다:

```js
프로그램 시작
동기 작업 시작
진행 중인 동기 작업...
동기 작업 완료
프로그램 종료
```

비동기 작업 예제:

```js
function asyncTask() {
  console.log("비동기 작업 시작");
  setTimeout(() => {
    console.log("비동기 작업 완료");
  }, 2000); // 2초 후 완료 메시지 출력
}

console.log("프로그램 시작");
asyncTask();
console.log("프로그램 종료");
```



이 코드에서는 asyncTask() 함수가 비동기적으로 실행되며 setTimeout() 함수를 사용하여 2초 후에 완료 메시지가 출력됩니다. 따라서 출력은 다음과 같습니다:

```js
프로그램 시작
비동기 작업 시작
프로그램 종료
비동기 작업 완료 // 2초 후에 출력됨
```

이제 React에서 사용되는 예제를 살펴보겠습니다.

React에서 비동기 작업을 처리하는 일반적인 방법은 useState 및 useEffect 훅을 사용하여 상태를 관리하고 비동기 작업을 처리하는 함수를 호출하는 것입니다. API에서 데이터를 가져와 화면에 표시하는 시나리오를 고려해 봅시다.



```js
import React, { useState, useEffect } from 'react';

function App() {
  // 상태 초기화
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 가져옵니다
  useEffect(() => {
    // 비동기 작업 시작
    fetchData()
      .then(response => {
        // 데이터를 가져오는 데 성공하면 상태 업데이트
        setData(response);
        setLoading(false);
      })
      .catch(error => {
        // 데이터를 가져오는 데 실패하면 에러 처리
        console.error('데이터 가져오기 오류:', error);
        setLoading(false);
      });
  }, []); // 컴포넌트가 마운트될 때 useEffect가 한 번만 실행되도록 빈 배열을 전달

  // 데이터를 가져오는 비동기 함수
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <h1>React 비동기 작업 예제</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>데이터:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
```

위 코드에서 useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번 데이터를 가져오도록 합니다. fetchData 함수를 사용하여 API에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로딩 상태를 true로 설정하여 로딩 메시지를 표시합니다. 데이터 가져오기가 성공하면 데이터 상태를 업데이트합니다. 데이터 가져오기 중에 오류가 발생하면 오류를 적절히 처리합니다.

React가 비동기 작업을 효과적으로 처리하는 방법입니다.