---
title: "30줄 코드로 쉽게 해결하는 프라미스 동시성 문제 해결 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtoSolvethePromiseConcurrencyIssuewith30LinesofCode_0.png"
date: 2024-06-22 02:01
ogImage:
  url: /assets/img/2024-06-22-HowtoSolvethePromiseConcurrencyIssuewith30LinesofCode_0.png
tag: Tech
originalTitle: "How to Solve the Promise Concurrency Issue with 30 Lines of Code"
link: "https://medium.com/javascript-in-plain-english/how-to-solve-the-promise-concurrency-issue-with-30-lines-of-code-3da4a5cb5136"
isUpdated: true
---

![image](/assets/img/2024-06-22-HowtoSolvethePromiseConcurrencyIssuewith30LinesofCode_0.png)

# 1. Why

## Why Control Concurrency?

Controlling concurrency is essential for effectively managing system resources, preventing overload, improving performance and response time, ensuring system stability, and maintaining a good user experience. By limiting the number of concurrent requests, the system can continue to operate normally even under high load conditions.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 2. 무엇

## 2.1 동시성이란 무엇인가요?

동시성은 시스템 또는 프로그램이 동시에 여러 작업이나 요청을 처리할 수 있는 능력을 의미합니다. 일반적으로 이는 여러 프로세스나 스레드가 동시에 작업을 실행하여 시스템의 처리량과 응답 속도를 높이는 것을 포함합니다. 동시 환경에서 여러 작업이 번갈아가며 실행되어 리소스 활용이 더 효율적으로 이루어집니다. 그러나 리소스 충돌, 성능 저하, 데드락과 데이터 불일치 등의 문제를 방지하기 위해 효과적인 관리와 제어가 필요합니다.

## 2.2 일반적인 동시 작업

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

웹 개발에서 일반적인 동시 작업이 많이 있습니다. 프론트엔드, 백엔드, 데이터베이스 작업 및 시스템 수준의 작업 처리 등을 다룹니다. 웹 개발에서 일반적인 동시 작업의 몇 가지 예는 다음과 같습니다:

- 여러 동시 인터페이스 요청: 프론트엔드 개발에서는 데이터를 가져오기 위해 동시에 여러 API 엔드포인트에 요청을 보내는 것이 일반적입니다.
- 동시에 여러 요청 처리: 웹 서버는 동시에 여러 클라이언트 요청을 처리합니다.
- 병렬로 작업 실행: 예를 들어 Node.js의 비동기 기능을 사용하여 여러 작업을 병렬로 실행하는 것입니다.

# 3. 방법

## 3.1 Promise.all

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

프론트엔드에서 동시 요청을 보낼 때 Promise.all을 많이 사용합니다. 예를 들어:

```js
// 비동기 작업을 시뮬레이션하는 함수
function asyncOperation(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`총 ${duration}밀리초 소요`);
    }, duration);
  });
}

// 모든 비동기 작업이 완료될 때까지 기다리기 위해 Promise.all 사용
function simulatePromiseAll() {
  const promise1 = asyncOperation(1000);
  const promise2 = asyncOperation(2000);
  const promise3 = asyncOperation(3000);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      console.log("모든 작업이 완료되었습니다:");
      results.forEach((result) => console.log(result));
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
}

// Promise.all 함수 시뮬레이션 실행
simulatePromiseAll();
```

그러나 Promise.all은 동시성을 제어할 수 없거나 정확히는 이 능력을 가지고 있지 않습니다. 따라서 각 asyncOperation을 수정하여 Promise.all이 Promise를 실행할 때 동시성 제어를 지원하도록 몇 가지 수정을 해야 합니다.

## 3.2 구현 방법

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

기본 아이디어는 100개의 동시 작업이 있고 최대 동시성을 10으로 설정한다면 다음 단계를 따릅니다:

1. 먼저 10개의 슬롯을 설정합니다.
2. 처음 10개의 동시 작업이 슬롯을 차지하고 실행됩니다.
3. 어떤 슬롯이 먼저 작업을 완료했는지 모니터링한 후, 나머지 작업에서 다른 작업을 가져와 슬롯을 채웁니다.
4. 모든 동시 작업이 완료될 때까지 단계 3을 반복합니다.

```js
// 우리가 구현해야 하는 함수
const simulateLimit = () => {
  // 코드 작성
};

// 비동기 작업을 시뮬레이션하는 함수
function asyncOperation(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completed in ${duration} ms`);
    }, duration);
  });
}

// 동시성을 제한하기 위해 simulateLimit을 사용합니다
function simulateControlledPromiseAll() {
  const limit = simulateLimit(10);

  const tasks = [
    limit(() => asyncOperation(1000)),
    limit(() => asyncOperation(2000)),
    limit(() => asyncOperation(3000)),
    limit(() => asyncOperation(1500)),
    limit(() => asyncOperation(2500)),
    limit(() => asyncOperation(3500)),
    // 여기에 더 많은 작업을 추가하세요
    // ...
  ];

  Promise.all(tasks)
    .then((results) => {
      console.log("모든 작업이 완료되었습니다:");
      results.forEach((result) => console.log(result));
    })
    .catch((error) => {
      console.error("에러가 발생했습니다:", error);
    });
}

simulateControlledPromiseAll();
```

3.3 30줄의 코드로 simulateLimit를 구현하는 방법

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

테이블 태그를 마크다운 형식으로 바꿔주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

반환된 함수 내부에서는 실제 작업 함수 fn을 래핑하는 작업 함수를 만듭니다. task가 호출되면 activeCount를 증가시키고 작업 함수 fn을 실행합니다. 작업이 완료되면 성공 또는 실패 여부에 상관없이 다음 함수가 호출됩니다.

```js
const task = () => {
  activeCount++;

  fn(...args).then(
    (value) => {
      resolve(value);
      next();
    },
    (error) => {
      reject(error);
      next();
    }
  );
};
```

현재 작업이 완료된 후 next 함수가 호출됩니다. activeCount를 감소시키고 대기 중인 작업이 있고 동시성 제한이 아직 초과되지 않았다면 대기열에서 다음 작업을 가져와 실행합니다.

```js
const next = () => {
  activeCount--;
  if (queue.length > 0 && activeCount < concurrency) {
    const nextTask = queue.shift();
    nextTask();
  }
};
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

반환된 함수 내부에서 현재 활성 작업 수 activeCount가 동시성 제한(concurrency)보다 작은지 확인합니다. 작업 수가 모자라면 해당 작업을 즉시 실행하고, 그렇지 않다면 해당 작업을 대기열에 추가합니다.

```js
if (activeCount < concurrency) {
  task();
} else {
  queue.push(task);
}
```

전체 코드 구현은 아래와 같습니다:

```js
function simulateLimit(concurrency) {
  const queue = [];
  let activeCount = 0;

  return function (fn, ...args) {
    return new Promise((resolve, reject) => {
      const task = () => {
        activeCount++;
        fn(...args).then(
          (value) => {
            resolve(value);
            next();
          },
          (error) => {
            reject(error);
            next();
          }
        );
      };

      const next = () => {
        activeCount--;
        if (queue.length > 0 && activeCount < concurrency) {
          const nextTask = queue.shift();
          nextTask();
        }
      };

      if (activeCount < concurrency) {
        task();
      } else {
        queue.push(task);
      }
    });
  };
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

실제로 이것은 유명한 라이브러리인 p-limit의 소스 코드입니다. 더 완벽한 사용법과 정제된 코드를 보려면 npm에서 p-limit을 참조해주세요. 배워갔나요?

# 간단하고 쉬운 영어로 🚀

In Plain English 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우하기 ️👏️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서 만나기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 만나보기
