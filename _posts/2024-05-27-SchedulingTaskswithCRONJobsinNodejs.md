---
title: "Nodejs에서 CRON 작업으로 일정 관리하기"
description: ""
coverImage: "/assets/img/2024-05-27-SchedulingTaskswithCRONJobsinNodejs_0.png"
date: 2024-05-27 18:09
ogImage: 
  url: /assets/img/2024-05-27-SchedulingTaskswithCRONJobsinNodejs_0.png
tag: Tech
originalTitle: "Scheduling Tasks with CRON Jobs in Node.js"
link: "https://medium.com/@surajAherrao/scheduling-tasks-with-cron-jobs-in-node-js-85680383a659"
isUpdated: true
---




CRON 작업은 특정 간격으로 실행되는 작업을 예약하는 강력한 방법입니다. 이는 뉴스레터를 보내거나 정기 백업을 수행하거나 오래된 데이터를 정리하는 등 다양한 애플리케이션에 매우 유용합니다.

예: 매주 월요일에 세일 소식을 기존 사용자에게 이메일로 보내고 싶다면, CRON이 그 역할을 수행해줄 것입니다.

이것들은 OS에서 실행되는 주기적인 작업이며, 주어진 간격에 대해 OS에 명령을 내리고 특정 작업을 실행할 수 있습니다.

이 블로그에서는 Node.js에서 CRON 작업을 설정하고 관리하는 방법을 알아볼 것입니다.

<div class="content-ad"></div>

CRON 작업을 왜 사용해야 하나요?

CRON 작업은 다음과 같은 용도로 사용됩니다:

- 백업하기: 정기적으로 데이터베이스나 파일을 백업합니다.
- 로깅: 주기적으로 로그를 생성하고 저장합니다.
- 통지: 이메일이나 푸시 알림을 사용자에게 보냅니다.
- 정리: 데이터베이스에서 오래된 파일이나 레코드를 제거합니다.

CRON 작업을 시작하려면, CRON 작업에 대한 좋은 지식이 필요합니다.

<div class="content-ad"></div>

- Node.js
- Npm

Node.js에서 CRON 작업을 생성하는 방법

1. Node.js 프로젝트 생성하기

새로운 Node.js 프로젝트를 초기화하거나 기존 프로젝트를 사용하세요

<div class="content-ad"></div>

2. 패키지 설치

사용할 패키지는 "node-cron" 입니다.
아래 명령을 실행하여 패키지를 설치하세요.

```js
npm install node-cron
```

3. 서버용 express 패키지 설치

<div class="content-ad"></div>

익스프레스 패키지를 설치하여 서버를 실행하거나 따르고자 하는 다른 방법을 사용할 수 있어요.

지금은 익스프레스를 사용해보겠습니다.

```js
npm install express 
```

4. 크론 작업 작성하기

<div class="content-ad"></div>

일정에 따라 실행되는 함수를 생성해보겠습니다. 이 예제에서는 콘솔에 메시지를 기록할 것입니다:

```js
function logMessage() {
    console.log('작업이 실행됨:', new Date().toLocaleString());
}
```

이제 함수를 만들었으니 주기적으로 실행해봅시다.

CRON 작업의 문법은 다음과 같습니다:

<div class="content-ad"></div>

```js
cron.schedule("* * * * *", function() {
    // Task
});
```

별표에 대해 이해해 봅시다.

이제 각 별표가 무언가를 정의합니다.

예를 들어 ( * * * * * * )


<div class="content-ad"></div>

아래 표는 왼쪽부터 두 번째, 분, 시간, 월 별일, 월, 및 주를 나타냅니다.

- 초 — 선택사항
- 분: 0–59
- 시간: 0–23
- 월 별일: 1–31
- 월: 1–12
- 요일: 0–7 (0과 7은 모두 일요일을 나타냅니다)

예시 :

- ( * * * * * ) — 매 분 실행
- ( 0 * * * * ) — 매 시간 실행
- ( 0 15 15 * * ) — 매달 15일 오후 3시에 실행
- ( * * 5 * * ) — 매월 5일에 실행

<div class="content-ad"></div>

위의 내용을 한국어로 번역해 드리겠습니다. 친근한 어조로 작성되었습니다.

```js
// 일반적인 임포트
const cron = require("node-cron");
const express = require("express");

// 익스프레스 초기화
app = express();

// 당신이 만든 함수
function message() {
    console.log('작업이 실행됨:', new Date().toLocaleString());
}

// cron 스케줄
cron.schedule("* * * * *", function() {
    message();
});

app.listen(3000);
```

위 스크립트를 'script.js'로 저장하세요.

5. 스크립트를 실행하세요.

<div class="content-ad"></div>

노드.js 애플리케이션을 시작하세요

```js
node script.js
```

파일 이름에 맞게 파일 이름을 변경해주세요

이렇게 하면 코드가 실행되고 함수가 주어진 간격대로 작동할 것입니다

<div class="content-ad"></div>

약간의 예시

다음은 CRON 작업의 몇 가지 더 예시입니다:

- 자정에 매일 정리

```js
cron.schedule('0 0 * * *', () => {
    console.log('자정에 작업을 실행중입니다');
    // 여기에 정리 코드를 추가하세요
});
```

<div class="content-ad"></div>

- 매주 월요일에 보고서 생성

```js
cron.schedule('0 9 * * 1', () => {
    console.log('주간 보고서 생성 중');
    // 보고서 생성 코드를 여기에 추가
});
```

일부 최상의 사례

- 에러 처리: CRON 작업에 적절한 에러 처리가 있어 예기치 않은 실패를 피할 수 있도록 합니다.

<div class="content-ad"></div>

```js
cron.schedule('0 0 * * *', () => {
    try {
        // 작업 내용
    } catch (err) {
        console.error('CRON 작업 중 오류가 발생했습니다:', err);
    }
});
```

- Logging: 작업이 실행되는 시간과 결과를 추적하기 위해 로깅 구현 필요

가능한 함정

- 시간대 문제: CRON 작업은 서버의 시간대에 따라 실행됩니다. 애플리케이션이 전 세계 사용자를 대상으로 하는 경우 시간대 차이에 유의해야 합니다.
- 동시성: 작업이 CRON 간격보다 오래 걸릴 경우, 작업이 예기치 않게 겹쳐지지 않도록 주의해야 합니다.

<div class="content-ad"></div>

다음 절차를 따라서, Node.js 애플리케이션에서 CRON 작업을 효과적으로 활용하여 간단한 로깅부터 복잡한 데이터 처리까지 다양한 작업을 자동화할 수 있습니다.

코딩해요!