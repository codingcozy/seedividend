---
title: "파이썬 비동기 프로세싱 소개"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-PythonAsynchronousProcessingIntroduction_0.png"
date: 2024-07-09 20:08
ogImage:
  url: /assets/img/2024-07-09-PythonAsynchronousProcessingIntroduction_0.png
tag: Tech
originalTitle: "Python — Asynchronous Processing Introduction"
link: "https://medium.com/@tonylixu/python-asynchronous-processing-introduction-601be5ba361c"
---

![image](/TIL/assets/img/2024-07-09-PythonAsynchronousProcessingIntroduction_0.png)

# Asynchronous Processing이란 무엇인가요?

비동기 처리는 작업이나 동작을 메인 프로그램의 실행을 차단하지 않고 동시에 실행할 수 있는 프로그래밍 패러다임입니다.

![image](/TIL/assets/img/2024-07-09-PythonAsynchronousProcessingIntroduction_1.png)

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

전통적인 동기 처리 방식에서는 작업이 순차적으로 실행되며, 각 작업이 완료될 때까지 다음 작업으로 넘어가기 전에 프로그램이 기다립니다.

이 방식은 특히 파일 작업이나 네트워크 요청과 같이 I/O 대기가 필요한 작업에 대해 비효율적일 수 있습니다. 이러한 경우 프로그램은 상당한 시간 동안 유휴 상태가 될 수 있습니다.

예를 들어, 아래 코드를 실행한다면:

```js
import time

# 작업을 수행하는 동기 함수
def task(name):
    print(f"작업 {name} 시작")
    time.sleep(2)  # 2초의 지연을 모의합니다
    print(f"작업 {name} 완료")

# 메인 프로그램

print("메인 프로그램 시작")

# 작업을 순차적으로 수행
task("A")
task("B")
task("C")

print("메인 프로그램 완료")
```

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

다음 출력을 볼 수 있습니다:

```js
Main program started
Task A started
Task A completed
Task B started
Task B completed
Task C started
Task C completed
Main program completed
```

반면에 비동기 처리는 작업이 독립적으로 및 동시에 실행되도록 합니다. 이는 프로그램이 작업을 시작하고 해당 작업이 완료될 때까지 기다리지 않고 다른 작업을 계속할 수 있도록 합니다. 완료된 작업은 준비되면 프로그램이 결과를 처리하거나 실행을 계속할 수 있도록 알림이나 이벤트를 트리거합니다.

예를 들어:

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

```js
import asyncio

# 작업을 나타내는 비동기 코루틴
async def task(name):
    print(f"작업 {name} 시작")
    await asyncio.sleep(2)  # 2초의 지연을 모의
    print(f"작업 {name} 완료")

# 메인 프로그램

async def main():
    print("메인 프로그램 시작")

    # 동시에 실행할 작업 목록 생성
    tasks = [
        asyncio.create_task(task("A")),
        asyncio.create_task(task("B")),
        asyncio.create_task(task("C"))
    ]

    # 모든 작업이 완료될 때까지 대기
    await asyncio.gather(*tasks)

    print("메인 프로그램 완료")

# 메인 프로그램 실행
asyncio.run(main())
```

출력:

```js
메인 프로그램 시작
작업 A 시작
작업 B 시작
작업 C 시작
작업 A 완료
작업 B 완료
작업 C 완료
메인 프로그램 완료
```

모든 작업이 동시에 시작되며, 완료 순서는 다를 수 있습니다. 메인 프로그램은 작업이 완료될 때까지 기다리지 않고 실행을 계속하여 비동기성을 실현합니다.

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

비동기 처리는 일반적으로 코루틴, 이벤트 기반 프로그래밍 또는 콜백 기반 프로그래밍 모델과 같은 비동기 프로그래밍 기법을 사용하여 달성됩니다. 이러한 기술을 사용하면 프로그램이 블로킹 없이 여러 작업 간에 전환할 수 있어 시스템 자원을 가장 효율적으로 활용할 수 있습니다.

비동기 처리의 장점은 성능, 응답 속도, 확장성이 향상된다는 점입니다. 불필요한 대기를 피하고 리소스 사용을 최대화함으로써 응용 프로그램은 대규모의 동시 작업을 효율적으로 처리할 수 있습니다.

# 병렬성 vs 동시성 vs 스레딩

## 병렬성

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

병렬 처리는 여러 개의 연산 장치를 사용하여 동시에 여러 작업을 수행하는 것을 말합니다. 이는 주로 멀티코어 프로세서가 장착된 시스템에서 볼 수 있으며 각 작업이 별도의 CPU/프로세서에서 실행됩니다. 이는 주로 하드웨어의 기능입니다. 참된 병렬 처리에서는 여러 작업이 물리적으로 동시에 실행되며, 마치 여러 명의 작업자가 거대한 벽의 서로 다른 부분을 동시에 도색하는 것과 같습니다.

```python
from multiprocessing import Process

def worker(num):
    print(f'Worker: {num}')

if __name__ == '__main__':
    processes = [Process(target=worker, args=(i,)) for i in range(5)]

    for process in processes:
        process.start()

    for process in processes:
        process.join()
```

출력:

```python
Worker: 1
Worker: 0
Worker: 2
Worker: 3
Worker: 4
```

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

## 동시성

동시성은 동시에 여러 작업을 처리하는 것에 대한 이야기입니다. 하지만 반드시 동시에 실행되는 것은 아닙니다. 여러 작업들이 서로 기다리지 않고 전진하며, 정확히 동시에 실행되는 것은 아닐 수 있습니다.

이는 단일 코어(시분할) 및 멀티 코어 프로세서에서 발생할 수 있습니다. 실행보다는 작업 구조화와 완료에 더 관련이 있습니다. 동시성을 이해하기 위한 간단한 예는 주방에서 일하는 단일 요리사일 수 있습니다. 여기서 그는 여러 요리를 동시에 요리하는데, 빠르게 작업을 전환하여 동시에 작업을 수행하고있다는 인상을 줍니다.

```js
import asyncio

async def worker(num):
    print(f'작업자 시작: {num}')
    await asyncio.sleep(1)
    print(f'작업자 완료: {num}')

async def main():
    # 동시에 실행될 작업 목록 생성
    tasks = [
        asyncio.create_task(worker(1)),
        asyncio.create_task(worker(2)),
        asyncio.create_task(worker(3))
    ]

    # 모든 작업이 완료될 때까지 대기
    await asyncio.gather(*tasks)

asyncio.run(main())
```

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

```js
Start worker: 1
Start worker: 2
Start worker: 3
Finish worker: 1
Finish worker: 2
Finish worker: 3
```

## 스레딩

스레딩은 동시성을 달성하기 위한 프로그래밍 개념과 기술입니다. 스레드는 운영 체제의 스케줄러에 의해 독립적으로 관리될 수 있는 프로그램 명령의 가장 작은 시퀀스입니다.

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

프로그램에는 여러 개의 스레드가 포함될 수 있으며, 각각이 특정 작업을 동시에 처리할 수 있습니다. 여러 스레드를 관리함으로써 하나의 프로세스가 작업을 동시에 실행할 수 있으므로 전체 실행 속도와 효율성이 높아집니다.

시스템에 멀티코어 프로세서가 있다면, 개별 스레드도 병렬로 실행될 수 있습니다. 스레딩의 좋은 예로는 웹 서버가 서로 다른 사용자의 여러 요청을 처리하는 것이 있습니다. 각 요청은 별도의 스레드에서 처리됩니다.

스레딩에 대해 알아둬야 할 중요한 점은 IO-바운드 작업을 다룰 때 그 향상된 효율성입니다. CPU-바운드 작업과는 대조적으로, 계산이 시작부터 끝까지 CPU의 처리 능력에 크게 의존하는 작업에 비해, IO-바운드 작업은 입력/출력 작업이 완료되기를 기다리는 동안 상당한 유휴 시간이 있습니다.

```python
import threading

def worker(num):
    print(f'작업자: {num}')

if __name__ == '__main__':
    threads = [threading.Thread(target=worker, args=(i,)) for i in range(5)]

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()
```

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

```js
Worker: 0;
Worker: 1;
Worker: 2;
Worker: 4;
Worker: 3;
```

요약하면, 병행 시스템에서 작업이 겹치면서 시작, 실행 및 완료되지만, 병렬 시스템에서 작업은 동시에 실행됩니다— 이것이 핵심적인 차이점입니다. 스레딩은 우리가 동시성 및 가능한 병렬성의 목표를 달성하는 기술일 뿐입니다. 동시성에는 CPU 집약적 작업에 최적화된 다중 처리와 IO 집약적 작업에 적합한 스레딩이 포함됩니다. 다중 처리는 병렬성의 한 유형으로 간주될 수 있으며, 병렬성 자체가 동시성의 특정 종류(하위 집합)입니다.

# Python Asyncio 모듈

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

The `asyncio` 모듈은 파이썬에서 강력한 라이브러리로, 비동기 코드를 작성하는 데 필요한 지원을 제공합니다. 이는 코루틴, 이벤트 루프, 비동기 I/O 개념을 기반으로하며 효율적이고 동시성을 가진 프로그래밍을 가능하게 합니다.

`asyncio`를 사용한 비동기 프로그래밍을 통해 단일 스레드 동시성 코드를 작성하고 여러 작업을 동시에 실행할 수 있으며 블로킹 작업을 피할 수 있습니다. 이 접근 방식은 특히 장시간 대기 시간이 발생하는 네트워크 요청 또는 파일 작업과 같은 I/O 바운드 작업을 처리할 때 유용합니다.

`asyncio`는 코루틴을 정의하고 비동기 코드의 실행 흐름을 관리하는 데 사용되는 `async` 및 `await` 키워드를 소개합니다. 코루틴은 일시 중지되고 다시 시작될 수 있는 함수로, 그 사이에 다른 작업이 실행될 수 있습니다. 이벤트 루프는 중앙 스케줄러로 작동하여 이러한 코루틴의 실행을 조정하고 I/O 작업을 효율적으로 관리합니다.

## 주요 기능

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

- 코루틴: 코루틴은 async 키워드로 정의된 함수들입니다. 실행 중에 일시 중지되고 다시 실행되어 다른 코루틴이 동시에 실행될 수 있습니다.
- 이벤트 루프: 이벤트 루프는 코루틴에 대한 실행 환경을 제공합니다. 여러 코루틴 간의 스케줄링 및 전환이 관리되어 효율적이고 블로킹되지 않는 실행을 보장합니다.
- 작업: 작업은 코루틴 위에서 더 높은 수준의 추상화입니다. 비동기로 실행해야 하는 작업 단위를 나타내고 이벤트 루프에 의해 스케줄링되고 관리될 수 있습니다.
- 미래: 미래는 아직 완료되지 않을 수 있는 코루틴의 결과를 나타내는 객체입니다. 비동기 작업의 완료를 추적하고 기다릴 수 있게 합니다.
- 동기화 기본 요소: asyncio는 락, 세마포어, 큐와 같은 다양한 동기화 기본 요소를 제공하여 공유 리소스를 관리하고 동시 작업을 조정하는 데 도움을 줍니다.

그러나 asyncio는 협력적으로 멀티태스킹을 기반으로 하는 단일 스레드, 단일 프로세스 모델을 사용합니다. asyncio는 하나의 스레드 내에서 작동하지만 효과적이고 블로킹되지 않는 실행 환경을 제공하여 동시성의 환상을 만들어냅니다. asyncio의 핵심인 코루틴은 동시에 배포될 수 있지만 그 자체로는 본질적으로 동시성을 가지지 않습니다.

강조하자면, asyncio는 동시 프로그래밍의 한 형태이지만 병렬성과는 동일하게 여기지 않아야 합니다. 그 방법론은 쓰레딩(threading)과 공유(`multiprocessing`)와는 더 일치하지만 그 둘로부터 독립적이며 다양한 동시성 기술들 중에서 독자적인 방법론을 취하고 있습니다.

# async와 await

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

The async and await syntax are key components of Python's asyncio module, a library used for writing concurrent code using the async/await syntax.

## async

async is a keyword used to declare a function as an "asynchronous function". Such functions are also known as "coroutines". You define a coroutine by prefixing def with async. For example, async def my_function():.

When an async function is called, it doesn't execute in the traditional way. Instead, it returns an "awaitable" object, which is a coroutine object. This object needs to be awaited or run in an event loop to get the result. The event loop is where the asynchronous code is executed. It's the core of every asyncio application, managing and scheduling the execution of asynchronous tasks.

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

## await

await은 기다리고 있는 작업이 완료될 때까지 코루틴을 일시 중지하는 데 사용됩니다. 이는 async 함수 내에서만 사용할 수 있습니다. await 키워드 뒤에는 코루틴, Future 또는 I/O-bound 함수와 같은 "awaitable" 객체로 이루어진 식이 따릅니다.

await 표현식이 실행되면 사용된 코루틴은 awaitable이 해결될 때까지 일시 중지됩니다. 이러한 일시 중지 동안 이벤트 루프는 다른 작업을 계속 실행합니다.

## async와 await을 사용하는 이유

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

- 논블로킹: 비동기 코드는 논블로킹 I/O 작업을 허용합니다. 대기 중인 경우, 다른 코드를 실행할 수 있습니다.
- 동시성: 더 효율적이고 유지보수가 용이한 방식으로 동시성 코드를 작성할 수 있도록 합니다.
- 성능: I/O 바운드 애플리케이션에서 async/await를 사용하면 상당한 성능 향상이 가능합니다.
- 가독성: async/await 구문은 콜백과 같은 이전 비동기 프로그래밍 기법에 비해 더 읽기 쉽고 직관적입니다.

예시:

```python
import asyncio

async def my_async_function():
    await asyncio.sleep(1)
    return "안녕, 비동기 세계!"

async def main():
    result = await my_async_function()
    print(result)

# 주요 코루틴 실행
asyncio.run(main())
```
