---
title: "TypeScript 네트워크 서버 구축법 Nodejs 멀티스레드 함수 작성하기"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-HowToWriteATypescriptNodeJSMulti-ThreadedFunction_0.png"
date: 2024-07-13 20:38
ogImage: 
  url: /TIL/assets/img/2024-07-13-HowToWriteATypescriptNodeJSMulti-ThreadedFunction_0.png
tag: Tech
originalTitle: "How To Write A Typescript Node JS Multi-Threaded Function"
link: "https://medium.com/gitconnected/how-to-write-a-typescript-node-js-multi-threaded-function-8b6fa847d272"
---



![링크](/TIL/assets/img/2024-07-13-HowToWriteATypescriptNodeJSMulti-ThreadedFunction_0.png)

TypeScript과 Node.js는 단일 스레드 및 이벤트 기반 모드에서 작동합니다. 그러나 Node.js에는 특정 시나리오를 위해 멀티 스레딩을 가능하게 하는 Worker Threads 모듈이 제공됩니다. Worker Threads 모듈을 사용하면 TypeScript 코드를 병렬로 실행하여 필요할 때 여러 스레드를 활용할 수 있습니다.

# Node.js에서 멀티 스레딩

단일 스레드 형식 — 기본적으로 Node.js는 TypeScript 코드를 실행하는 데 단일 스레드를 사용합니다. 이 설계는 여러 스레드를 관리하는 복잡성을 피하므로 비동기 작업을 간단하게 처리할 수 있습니다.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

워커 스레드 모듈 - 워커 스레드 모듈은 Node.js의 기능으로, 개발자가 메인 스레드와 별도로 추가 스레드를 생성할 수 있게 합니다. 이러한 워커 스레드는 TypeScript 코드를 독립적으로 실행하여 작업을 병렬로 처리할 수 있는 방법을 제공합니다.

멀티 스레딩의 사용 사례 - 멀티 스레딩은 CPU 집중형 계산이나 병렬 비동기 작업과 같이 특정 작업을 분할하고 동시에 실행할 수 있는 시나리오에서 유용합니다. 이를 통해 여러 스레드의 처리 능력을 활용하여 응용 프로그램의 전반적인 성능을 향상시킬 수 있습니다.

예제로 넘어가기 전에.... 

# 멀티 스레딩에 대한 추가 고려 사항

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

많은 이유로 멀티스레딩을 피하고 Node.js의 싱글 스레드 특성을 활용하는 것이 좋습니다. 전진하기 전에 고려해야 할 몇 가지 중요한 부분이 있습니다.

스레드 관리 오버헤드: 멀티스레딩은 특정 시나리오에서 성능을 향상시킬 수 있지만, 스레드 관리와 관련된 오버헤드도 동반됩니다. 개발자들은 해당 상황에서 멀티스레딩의 이점이 해당 사용 사례에서의 오버헤드를 상회하는지 신중히 검토해야 합니다.

동시성과 동기화: 여러 스레드로 작업할 때, 개발자들은 동시성과 동기화와 관련된 문제들을 다뤄야 합니다. 이는 공유 리소스를 관리하고 경쟁 조건을 방지하며 스레드 간 데이터 일관성을 보장하는 것을 포함합니다.

확장성: 멀티스레딩은 멀티 코어 프로세서에서 사용 가능한 리소스를 효율적으로 활용할 수 있도록 해 확장성을 향상시킬 수 있습니다. 그러나 멀티스레드 애플리케이션을 확장하기 위해서는 부하 분산 및 리소스 경합과 같은 요소들을 신중히 고려하여 최적의 성능을 달성해야 합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

디버깅 복잡성: 멀티스레드 응용 프로그램을 디버깅하는 것은 단일 스레드 응용 프로그램보다 얽힌 스레드 상호작용과 잠재적 동시성 문제로 인해 더 도전적일 수 있습니다. 개발자는 쓰레딩 관련 문제를 효과적으로 진단하고 해결하기 위해 전문적인 디버깅 도구와 기술을 사용해야 할 수도 있습니다.

자원 관리: 멀티스레드 응용 프로그램은 단일 스레드 응용 프로그램보다 더 많은 시스템 자원(예: 메모리 및 CPU)을 소비할 수 있습니다. 개발자는 성능 저하와 잠재적 병목 현상을 피하기 위해 자원 사용을 주의 깊게 관리해야 합니다.

잠재적 함정: 멀티스레드로 인해 성능 이점을 얻을 수 있지만, 데드락, 라이브락 및 스레드 기아와 같은 잠재적 함정이 소개될 수도 있습니다. 개발자는 이러한 개념을 이해하고 응용 프로그램 신뢰도와 성능에 미치는 영향을 완화하기 위해 최선의 방법을 사용해야 합니다.

다음은 Worker Threads를 사용한 TypeScript 예시를 제공하겠습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```typescript
import { Worker, isMainThread, parentPort } from 'worker_threads';

function runWorkerThread() {
  if (isMainThread) {
    // 이것은 메인 스레드입니다

    // 새로운 워커 스레드를 생성합니다
    const worker = new Worker(__filename);

    // 워커 스레드로부터 메시지를 수신합니다
    worker.on('message', (result: any) => {
      console.log('워커로부터 결과:', result);
    });

    // 워커 스레드로 데이터를 보냅니다
    worker.postMessage({ data: '메인 스레드로부터 안녕하세요!' });
  } else {
    // 이것은 워커 스레드입니다

    // 메인 스레드로부터 메시지를 수신합니다
    parentPort?.on('message', (message: any) => {
      console.log('메인 스레드로부터 메시지:', message);

      // 일부 무거운 계산을 수행합니다
      const result = performHeavyComputation();

      // 결과를 다시 메인 스레드로 보냅니다
      parentPort?.postMessage(result);

      // 워커 스레드를 종료합니다
      parentPort?.close();
    });

    function performHeavyComputation() {
      // 무거운 계산을 시뮬레이션합니다
      let result = 0;
      for (let i = 0; i < 1e9; i++) {
        result += i;
      }
      return result;
    }
  }
}

// 워커 스레드 실행을 위해 함수를 호출합니다
runWorkerThread();
```

이 예시는 메인 스레드와 워커 스레드로 구성된 멀티 스레드 설정을 보여줍니다. 무거운 계산은 워커 스레드에서 수행되고, 그 결과가 메인 스레드로 보내집니다.

워커 스레드를 생성하고 관리하는 로직은 runWorkerThread 함수 내에 캡슐화되어 있습니다. 워커 스레드를 시작하려면 이 함수를 필요할 때 호출할 수 있습니다.

본 내용을 즐기셨고 이러한 노력을 지원하고 싶으시다면 다음 링크를 방문해주세요: [https://ko-fi.com/jacobmacinnis](https://ko-fi.com/jacobmacinnis)
