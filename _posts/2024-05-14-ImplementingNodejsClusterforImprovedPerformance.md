---
title: "노드js 클러스터 구현으로 성능 개선하기"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementingNodejsClusterforImprovedPerformance_0.png"
date: 2024-05-14 16:05
ogImage: 
  url: /assets/img/2024-05-14-ImplementingNodejsClusterforImprovedPerformance_0.png
tag: Tech
originalTitle: "Implementing Node.js Cluster for Improved Performance"
link: "https://medium.com/@mjdrehman/implementing-node-js-cluster-for-improved-performance-f800146e58e1"
isUpdated: true
---




<img src="/assets/img/2024-05-14-ImplementingNodejsClusterforImprovedPerformance_0.png" />

Node.js는 확장 가능하고 효율적인 서버 측 애플리케이션을 만들기 위한 인기있는 런타임 환경입니다. 멀티 코어 시스템의 잠재력을 최대한 활용하고 Node.js 애플리케이션의 성능을 향상시키기 위해 내장된 클러스터 모듈을 사용하여 클러스터링을 구현할 수 있습니다. 클러스터링은 여러 워커 프로세스를 생성하여 들어오는 요청을 처리하므로 성능이 향상되고 시스템 자원을 더 효율적으로 활용할 수 있습니다.

이 글에서는 Node.js에서 클러스터링의 개념을 탐구하고, 이점을 이해하며, 클러스터링 있는 경우와 없는 경우의 워크스루를 설명하고, 성능 평가를 위해 loadtest 패키지를 사용한 로드 테스트를 소개합니다.

## 클러스터링 이해하기



Node.js에서의 클러스터링은 여러 워커 프로세스를 만들어들어오는 작업 부하를 공유하는 것을 포함합니다. 각 워커 프로세스는 자체 이벤트 루프에서 실행되며 사용 가능한 CPU 코어를 활용합니다. 마스터 프로세스는 워커 프로세스를 관리하고 들어오는 요청을 분배하며 프로세스 실패를 처리합니다.

## 클러스터링의 장점:

- 성능 향상: 클러스터링을 통해 여러 코어에 걸쳐 요청을 병렬로 처리함으로써 응용 프로그램의 성능과 응답성이 향상됩니다. 이는 특히 여러 CPU 코어를 가진 기기에서 사용 가능한 시스템 자원을 더 잘 활용할 수 있게 합니다.
- 확장성: 클러스터링은 동시에 발생하는 요청들을 병렬로 처리하여 Node.js 애플리케이션의 확장성을 향상시킵니다. 작업 부하가 증가하면 추가 워커 프로세스가 동적으로 생성되어 부하를 효과적으로 분산시킬 수 있습니다.
- 내결함성: 워커 프로세스가 충돌하거나 응답이 없어지면 마스터 프로세스가 해당 실패를 감지하고 자동으로 워커 프로세스를 다시 시작할 수 있습니다. 이 내결함성은 프로세스 실패가 발생해도 응용 프로그램이 계속 사용 가능하도록 보장합니다.

## 예시 구현- 클러스터링과 함께:



Node.js Express 애플리케이션에서 클러스터링을 구현하는 예제를 살펴보겠습니다:

```js
const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 ${process.pid}가 실행 중입니다`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`워커 프로세스 ${worker.process.pid}가 종료되었습니다. 다시 시작 중...`);
    cluster.fork();
  });
} else {
  const app = express();

  // Express 앱을 구성합니다
  // ...

  const server = app.listen(3000, () => {
    console.log(`워커 프로세스 ${process.pid}가 3000 포트에서 수신 대기 중입니다`);
  });
}
```

이 예제에서는 마스터 프로세스가 사용 가능한 CPU 코어 수에 기반하여 워커 프로세스를 생성합니다. 각 워커 프로세스는 Express 앱의 인스턴스를 실행하여 병렬 요청 처리를 활성화합니다.

## 클러스터링 없이 구현한 예시:



비교를 위해 클러스터링 없이 구현한 예제를 보여드립니다:

```js
const express = require('express');

const app = express();

// Express 앱 구성
// ...

const server = app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다');
});
```

이 단순화된 예제에서는 클러스터링이 없고, 응용 프로그램은 단일 프로세스에서 실행됩니다.

## 클러스터링과 부하 테스트 비교:



클러스터링은 병렬 처리를 통해 성능을 향상시키지만, 로드 테스팅은 다양한 작업 부하 아래 응용 프로그램의 성능을 평가합니다. 우리는 로드테스트 패키지를 사용하여 부하를 시뮬레이션하고 성능을 평가하여 이러한 방법을 비교할 수 있습니다.

## 로드 테스팅 구현:

응용 프로그램을 로드 테스트하려면 다음 단계를 따르세요:

단계 1: 프로젝트 디렉토리에서 다음 명령을 실행하여 loadtest 패키지를 설치합니다.



```js
npm install -g loadtest
```

단계 2: 터미널에서 node app.js를 실행하여 Express 애플리케이션을 시작합니다.

단계 3: 새로운 터미널 창을 열고 다음 명령을 실행하여 애플리케이션을 로드 테스트합니다:

```js
loadtest -c 10 --rps 100 -n 100 http://localhost:3000
```



이 예시에서는 특정 URL에 초당 100개의 요청률을 가진 10개의 동시 사용자를 모의하는 것입니다.

## 관찰 사항

클러스터링 없음: 100개의 요청 중 100개의 오류 발생

![이미지](/assets/img/2024-05-14-ImplementingNodejsClusterforImprovedPerformance_1.png)



캐슁터링을 이용한: 0개의 오류/100개의 요청

![이미지](/assets/img/2024-05-14-ImplementingNodejsClusterforImprovedPerformance_2.png)

응답 시간, 처리량, 그리고 오류와 같은 메트릭을 포함한 부하 테스트 결과를 살펴보세요. 이러한 메트릭은 지정된 부하 하에서 애플리케이션의 성능에 대한 통찰을 제공합니다.

## 결론:



이 글에서는 Node.js 애플리케이션에서 클러스터링의 이점을 탐색했습니다. 병렬 요청 처리를 통한 성능 향상, 확장성 및 오류 허용성을 통해 성능을 향상시킬 수 있다고 설명했습니다. 별도의 클러스터링을 사용한 예제와 그렇지 않은 예제를 제공하며, 여러 워커 프로세스를 활용하는 장점을 강조했습니다.

게다가, loadtest 패키지를 사용하여 시뮬레이션된 워크로드에서 응용 프로그램의 성능을 평가하는 수단으로서 부하 테스트에 대해 논의했습니다. 부하 테스트는 응답 시간, 처리량 및 오류율을 평가하여 성능 최적화에 도움을 줍니다.

Node.js 애플리케이션에서 클러스터링 및 부하 테스트를 활용함으로써 높은 성능, 확장성 및 고품질 트래픽 상황을 효과적으로 처리할 수 있습니다.