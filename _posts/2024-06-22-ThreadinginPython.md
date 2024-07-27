---
title: "파이썬에서 쓰레딩 사용 하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ThreadinginPython_0.png"
date: 2024-06-22 02:41
ogImage: 
  url: /assets/img/2024-06-22-ThreadinginPython_0.png
tag: Tech
originalTitle: "Threading in Python"
link: "https://medium.com/gitconnected/threading-in-python-4fe4da581369"
---


<img src="/assets/img/2024-06-22-ThreadinginPython_0.png" />

# 소개

이 게시물은 threading 모듈과 concurrent.futures 모듈의 ThreadPoolExecutor 클래스를 사용한 Python의 다중 스레딩에 대한 소개입니다.

마지막에 있는 리소스 섹션에는 해당 주제를 깊이 파헤칠 수 있는 멋진 자료에 대한 링크가 있어요 🤓

<div class="content-ad"></div>

관련 포스트

- 병행성과 병렬성 소개
- Python에서의 멀티프로세싱
- Python에서의 ProcessPoolExecutor

## 쓰레드란

쓰레드는 프로세스 내에서 실행의 기본 단위입니다. 독립적인 실행 흐름으로, 동일한 프로세스 내의 다른 독립적인 실행 흐름과 동일한 주소 공간을 공유합니다. 프로세스는 하나 이상의 쓰레드를 가질 수 있으며, 이 중 하나는 메인 쓰레드입니다. 이는 Python 프로세스의 기본 쓰레드입니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-ThreadinginPython_1.png" />

프로그램을 작성하여 여러 스레드를 활용하면 프로그램이 하나의 코어에서 동시에 실행될 수 있습니다. 코루틴을 사용하면 하나의 스레드 프로그램을 동시에 실행할 수도 있습니다.

Python (CPython 구현) 프로세스 내의 스레드는 Python의 글로벌 인터프리터 락 (GIL) 때문에 다른 프로그래밍 언어의 스레드 (예: Java, C/C++, Go)와 달리 여러 코어가 있는 경우에도 병렬로 실행되지 않습니다. Python에서 CPU 바운드 작업이 필요하고 병렬 구현이 필요한 경우 multiprocessing 모듈이나 ProcessPoolExecutor 클래스 (Python의 Multiprocessing 참조)를 사용해야 합니다.

프로그램을 작성한다고 상상해보세요. 실행이 시작되면 단일 프로세스가 될 것입니다. 또한 해당 프로세스는 두 개의 스레드를 갖게 될 것입니다. 두 개의 스레드가 있으면 동시성을 활용할 수 있습니다.

<div class="content-ad"></div>

싱글 코어 CPU에서는 프로그램이 동시에 실행될 수 있습니다. 하나의 코어와 두 개의 스레드로, 스레드가 동일한 코어 내에서 서로 교환될 수 있습니다. 이를 컨텍스트 스위칭이라고 합니다.

컨텍스트 스위칭 중에는 한 스레드가 CPU에서 스위칭되어 다른 스레드가 실행될 수 있도록 합니다. 이를 위해 프로세스나 스레드의 상태가 저장되어 나중에 복원되어 나중에 다시 실행될 수 있게 되며, 그 후 이전에 저장된 상태가 복원됩니다.

컨텍스트 스위칭은 일반적으로 계산적으로 비용이 많이 듭니다. 프로세스나 스레드 간의 스위치 컨텍스트는 레지스터 및 다른 작업의 저장 및 로드에 일정 시간이 소요됩니다. 스레드 간의 컨텍스트 전환은 일반적으로 프로세스 간의 전환보다 빠릅니다.

# 스레딩 사용 사례

<div class="content-ad"></div>

다중 스레딩이 가장 적합한 작업은 I/O 바운드 작업입니다. 예를 들어, 스레드가 데이터베이스에 요청을 보내야 하는 명령을 실행하는 경우, 응답을 기다리는 스레드로 CPU 코어를 차단하는 것은 현명하지 않습니다. 대신에 첫 번째 스레드가 기다리는 동안에 다른 스레드가 코어를 사용할 수 있도록 하는 것이 자원을 더 잘 활용하는 방법입니다.

아래 그림에서 빈 원은 스레드가 무언가 발생할 때까지 기다리는 I/O 작업을 나타냅니다. 첫 번째 I/O 작업이 시작될 때(빈 녹색 원), 운영 체제는 빠르게 대기 중인 스레드를 빨간색 스레드로 전환하여 계산 자원을 더 잘 할당합니다. 이것은 OS가 하는 결정이며, 개발자는 언제 스레드간 전환을 할지 결정할 수 없습니다.

프로그램이 병렬로 여러 스레드를 사용하지 않고 대신에 단일 스레드 내에서 순차적으로 작업을 실행하는 경우, 녹색 작업을 완료하기를 기다려서 빨간 작업을 실행하기 시작해야 하므로, 두 작업을 완료하는 데 더 많은 시간이 소요됩니다.

<div class="content-ad"></div>

`<img src="/assets/img/2024-06-22-ThreadinginPython_3.png" />`

I/O 작업을 다룰 때 멀티스레딩은 자원을 더 잘 할당할 수 있는 좋은 선택입니다.

이제 멀티스레드 프로그램 구현 몇 가지를 살펴보겠습니다! 🥷🏽

# Python 스레딩 초급 단계

<div class="content-ad"></div>

먼저 I/O 바운드와 CPU 바운드 작업을 정의해 봅시다. io_bound_operation은 지정된 초 수만큼 "잠들어" 있습니다. cpu_bound_operation은 지정된 숫자 범위를 더합니다. 두 함수 모두 결과를 shared_list에 추가합니다. 동일한 프로세스의 스레드는 데이터를 공유할 수 있다는 것을 기억해 주세요.

```js
import logging
from threading import Thread
from time import perf_counter, sleep

from concurrency.utils import flaten_list_of_lists, get_saving_path, postprocess_times
from concurrency.visualize import barh


format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")

shared_list = []  # 동일한 프로세스의 스레드는 데이터를 공유합니다.

def io_bound_operation(secs: float | int) -> None:
    """secs 초 동안 1개의 I/O 바운드 작업을 실행하고 결과를 shared_list에 추가합니다."""
    start = perf_counter()
    sleep(secs)
    finish = perf_counter()

    shared_list.append([(start, finish)])

def cpu_bound_operation(n: int) -> None:
    """CPU 바운드 작업."""
    start = perf_counter()
    count = 0
    for i in range(n):
        count += i
    finish = perf_counter()

    shared_list.append([(start, finish)])
```

이제 두 개의 새 스레드 t1과 t2를 생성할 것입니다. Thread 객체를 인스턴스화 할 때는 스레드에서 실행할 작업/함수인 target을 추가해야 합니다. 인자는 args 매개변수를 통해 전달될 수 있으며, 이는 Iterable 객체를 받습니다.

이 예제에서는 I/O 바운드 작업이 1초 동안 지속되도록 하고, 프로세서가 이 100,000,000개의 숫자를 더하는 데 약 3.5초가 걸립니다.

<div class="content-ad"></div>

```js
def threading_two_threads():
    # 두 개의 스레드 객체 생성
    t1 = Thread(target=io_bound_operation, args=(1,))
    t2 = Thread(target=cpu_bound_operation, args=(100000000,))

    # 활동 시작 -> run() 메서드를 호출
    t1.start()
    sleep(0.1)
    t2.start()

    # 호출 스레드 블록 -> 스레드가 완료될 때까지 계속 실행됨
    t1.join()
    t2.join()

    logging.info(f"shared_list {shared_list}")
```

그런 다음 스레드 활동을 시작해야 합니다. 이는 start() 메서드를 호출하여 수행됩니다. 이는 객체의 run() 메서드가 별도의 제어 스레드에서 호출되도록 정렬합니다.

또한 sleep(0.1) 함수가 있어 두 번째 스레드가 조금 늦게 시작되도록합니다. 이를 통해 시각화를 더 잘할 수 있습니다.

```js
def threading_two_threads():
    # 두 개의 스레드 객체 생성
    t1 = Thread(target=io_bound_operation, args=(1,))
    t2 = Thread(target=cpu_bound_operation, args=(100000000,))

    # 활동 시작 -> run() 메서드를 호출
    t1.start()
    sleep(0.1)
    t2.start()

    # 호출 스레드 블록 -> 스레드가 완료될 때까지 계속 실행됨
    t1.join()
    t2.join()

    logging.info(f"shared_list {shared_list}")
```

<div class="content-ad"></div>

마지막으로, 스레드 객체의 join() 메서드를 호출해야 스레드가 종료될 때까지 기다릴 수 있습니다.

메인 스레드는 두 스레드가 모두 완료될 때까지 종료되지 않습니다.

스레드를 결합하면 호출 중인 스레드(메인 스레드)가 join() 메서드가 호출된 스레드가 정상적으로 종료되거나 처리되지 않은 예외를 통해 또는 선택적으로 제한 시간이 발생할 때까지 블록됩니다.

이 예제를 변경해보세요. 만약 두 join() 메서드의 주석 처리를 해도 프로그램은 예외를 발생시킬 것입니다. 왜냐하면 shared_list에는 아무것도 없기 때문에 postprocess_times 함수가 빈 목록을 색인화하려고 시도할 것입니다.

<div class="content-ad"></div>

```js
def threading_two_threads():
    # 두 개의 스레드 객체를 생성합니다.
    t1 = Thread(target=io_bound_operation, args=(1,))
    t2 = Thread(target=cpu_bound_operation, args=(100000000,))

    # 활동 시작 -> run() 메서드를 호출합니다.
    t1.start()
    sleep(0.1)
    t2.start()

    # 호출 스레드를 차단 -> 스레드가 완료될 때까지 계속 실행되지 않도록 합니다.
    t1.join()
    t2.join()

    logging.info(f"shared_list {shared_list}")

    # 차트 표시를 위한 일부 처리
    start_points, end_points = postprocess_times(flaten_list_of_lists(shared_list))
    # start_points, end_points = postprocess_times(shared_list)

    barh(
        title="동시 실행, 2개의 스레드, 1초의 I/O 바운드 작업 + 약 3.5초의 CPU 작업",
        start_points=start_points,
        end_points=end_points,
        path=get_saving_path("threading/images/first_multithreaded_program.png"),
        n=2,
    )

if __name__ == "__main__":
    logging.info(f"동시 작업 시작")
    threading_two_threads()
    logging.info(f"동시 작업 완료")
```

아래 이미지는 각 스레드가 완료하는 데 소요된 시간을 보여줍니다. sleep 함수는 두 번째 스레드(cpu_bound_operation)가 조금 늦게 시작하도록 만듭니다. 그래프에서 첫 번째 스레드(0)가 시작한 후 0.1초 후 두 번째 스레드가 시작됩니다.

<div class="content-ad"></div>

I/O 바운드 작업은 단 1초 동안 지속되고 io_bound_operation 함수는 해당 작업만 수행해야 합니다. 이 때 I/O 바운드 작업이 대기하는 동안(전체 1초 동안) CPU 바운드 작업이 실행될 수 있습니다. 이것이 CPU 바운드 작업(두 번째 스레드)이 약 3.5초 동안만 지속되며 I/O 바운드 작업에 의해 지연되지 않는 이유입니다.

![image](/assets/img/2024-06-22-ThreadinginPython_4.png)

Thread 객체는 스레드를 만드는 가장 간단한 방법 중 하나이지만, 더 편리한 방법들이 있습니다. 그러나 더 자세히 파헤치기 전에 좀 더 간단한 예제를 살펴보겠습니다.

# threading 모듈을 이용한 멀티스레딩 시간 시각화

<div class="content-ad"></div>

## 예시 1–2 스레드

- 스레드 1–1: 약 1초의 I/O-바운드 작업과 1초 정도의 CPU-바운드 작업
- 스레드 2–1: 약 3.5초의 CPU-바운드 작업

이제 첫 번째 스레드가 CPU-바운드 작업 1초 정도와 I/O-바운드 작업 1초로 구성된 작업을 실행하는 대신 I/O-바운드 작업만을 실행하는 작업이 아닌 경우를 고려해 봅시다.

따라서 이제 두 개의 새로운 스레드를 생성하는 프로그램이 있습니다. 하나는 I/O-바운드 작업과 CPU-바운드 작업을 수행하고, 또 다른 하나는 약 3.5초의 CPU-바운드 작업을 수행합니다.

<div class="content-ad"></div>

```python
def cpu_io_bound_operations(secs: float | int, n: int) -> None:
    """한 가지 I/O 바운드 작업(초 단위)과 한 가지 CPU 바운드 작업을 실행하는 함수입니다. 결과는 shared_list에 추가됩니다."""
    start = perf_counter()
    count = 0
    for i in range(n):  # CPU 바운드
        count += i
    sleep(secs)  # I/O 바운드
    finish = perf_counter()

    shared_list.append([(start, finish)])
```

쓰레드 2는 프로세서에서 약 3.5초가 필요하며, 쓰레드 1은 1초만에 처리합니다.

쓰레드 1이 1초만에 처리하는 이유는 CPU 바운드 작업 때문이며, I/O 바운드 작업의 대기 시간은 쓰레드 2가 활용합니다.

쓰레드 2(3.5초) + 쓰레드 1(1초)을 더하면 4.5초의 CPU 작업 시간이 필요합니다.

<div class="content-ad"></div>

위의 그래프는 두 작업이 모두 4.5초 동안 실행된다는 것을 보여줍니다. 각 CPU 집약적 작업에 필요한 시간은 약간 다를 수 있습니다.

<img src="/assets/img/2024-06-22-ThreadinginPython_5.png" />

그러나 스레드 1은 종료하는 데 3초가 걸립니다. 이는 우리가 컨텍스트 스위치가 언제 발생하는지 제어하지 않기 때문에, I/O 바운드 작업이 종료된 후에도 스레드 1이 프로세서를 사용하기 위해 얼마간의 대기 시간이 있을 수 있기 때문입니다. 컨텍스트 스위치는 개발자의 제어를 벗어나므로, 실제로 원하는 것보다 더 자주 발생할 수 있으며 다른 스레드로 스위치하고 싶지 않은 순간에 발생할 수 있습니다.

이제 몇 가지 추가 예시를 빠르게 살펴보겠습니다! 이미 이해하셨다면이 부분을 건너뛰고 바로 다음 섹션인 ThreadPoolExecutor로 이동할 수 있습니다 🚀

<div class="content-ad"></div>

## 예제 2-1 스레드

- 10개의 IO 바운드 작업을 1초씩 순차적으로 수행합니다.

여기서는 순차적 실행을 표현하고 더 많은 스레드를 생성할 필요가 없습니다. 메인 스레드 하나로 충분합니다.

```python
def sequential(n: int = 10, secs: float | int = 1) -> None:
    """1개 스레드에서 n개의 I/O 바운드 작업을 secs 초 동안 순차적으로 수행하고 수평 막대 차트를 플롯합니다.
    """
    # n개의 I/O 바운드 작업 수행, 각 작업에 대한 튜플 저장
    times = [io_bound_operation(secs) for _ in range(n)]
    start_points, end_points = postprocess_times(times)

    barh(
        title="순차 실행, 1개 스레드, 10개의 1초 IO 바운드 작업",
        start_points=start_points,
        end_points=end_points,
        path=get_saving_path("threading/images/ex_1_one_thread.png"),
    )
```

<div class="content-ad"></div>

위 그림에서 각 스레드가 작업을 수행했기 때문에 스레드가 막대로 표시되었습니다(입출력 바인드 및 CPU 바인드 작업을 결합해도 동일한 작업으로 간주했습니다).

이제 10개의 다른 입출력 바인드 작업이 동일한 스레드에서 실행되므로 각 작업을 더 잘 시각화할 수 있습니다. 따라서 이 열개의 막대는 동일한 스레드에 속합니다.

![이미지](/assets/img/2024-06-22-ThreadinginPython_6.png)

## 예제 3–1 thread

<div class="content-ad"></div>

- 2개의 CPU 바운드 작업

만약 우리가 동일한 스레드에서 연속적으로 3.5초 정도 걸리는 CPU 바운드 작업 두 개를 실행한다면, 약 7초 정도 소요된다는 것을 확인할 수 있습니다.

두 번째 작업을 시작하기 전에 첫 번째 작업이 완료되어야 합니다.

```python
def sequential(counts: int, n: int = 10) -> None:
    # n개의 CPU 바운드 작업 수행, 각 작업에 대한 튜플 저장
    times = [cpu_bound_operation(counts) for _ in range(n)]
    start_points, end_points = postprocess_times(times)
```

<div class="content-ad"></div>

![스레드](/assets/img/2024-06-22-ThreadinginPython_7.png)

## 예제 4-2 스레드

- 스레드 1–1: 대략 3.5초 소요되는 CPU 바운드 작업
- 스레드 2–1: 대략 3.5초 소요되는 CPU 바운드 작업

위의 두 CPU 바운드 작업은 동시에 실행될 때 매우 다른 차트를 보여줍니다. 두 작업은 모두 7초가 걸리는 것처럼 보이지만, 실제로는 각각 3.5초가 걸립니다. 그들은 서로 번갈아가며 작업을 완료할 때까지 전환됩니다.

<div class="content-ad"></div>

멀티스레딩을 사용하는 방법이 제대로 되지 않았어요. 현재는 교육 목적으로만 사용하고 있어요. CPU 바운드 작업만 한다면 멀티스레딩을 사용해도 시간이 단축되지 않아요.

```js
def thread_cpu_bound_operations(counts: int) -> None:
    """Run a CPU-bound task and append the results to shared_list."""
    shared_list.append([cpu_bound_operation(counts)])


def threading_two_threads() -> None:
    # 두 개의 스레드 객체를 생성합니다. 각 스레드는 다섯 개의 I/O 바운드 작업을 수행할 거에요
    t1 = Thread(target=thread_cpu_bound_operations, args=(100000000,))
    t2 = Thread(target=thread_cpu_bound_operations, args=(100000000,))

    # 활동 시작 -> run() 메서드를 호출합니다
    t1.start()
    t2.start()

    # 호출한 스레드가 완료될 때까지 기다립니다 -> 스레드가 모두 끝날 때까지 진행을 막습니다
    t1.join()
    t2.join()
```

![이미지](/assets/img/2024-06-22-ThreadinginPython_8.png)

## 예제 5-2 스레드

<div class="content-ad"></div>

- 1초 동안 5개의 I/O 바운드 작업을 가진 스레드 1 실행
- 1초 동안 5개의 I/O 바운드 작업을 가진 스레드 2 실행

총 10개의 1초 동안 동작하는 I/O 바운드 작업과 두 개의 스레드가 있습니다. 각 스레드는 순차적으로 다섯 개의 I/O 바운드 작업을 실행하며, 두 그룹의 다섯 개의 작업은 동시에 실행됩니다.

```python
def thread_io_bound_operations(n: int, secs: float | int) -> None:
    """n개의 I/O 바운드 작업을 secs 초 동안 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([io_bound_operation(secs) for _ in range(n)])


def threading_two_threads() -> None:
    # 각각 다섯 개의 I/O 바운드 작업을 수행할 두 개의 스레드 개체 생성
    t1 = Thread(target=thread_io_bound_operations, args=(5, 1))
    t2 = Thread(target=thread_io_bound_operations, args=(5, 1))

    # 활동 시작 -> run() 메서드 호출
    t1.start()
    t2.start()

    # 호출 스레드 블록 -> 스레드가 완료되지 않은 상태로 계속 실행되는 것을 방지
    t1.join()
    t2.join()
```

![Python에서 쓰레딩하기](/assets/img/2024-06-22-ThreadinginPython_9.png)

<div class="content-ad"></div>

## 예제 6–10 스레드

- 각 스레드 — 1초 동안의 1개의 I/O 바운드 작업

지난 예제와 비슷하지만, 이제는 두 개가 아닌 열 개의 스레드가 있으며 각각은 1초 동안의 단 하나의 I/O 바운드 작업을 실행합니다.

```js
def thread_io_bound_operations(n: int, secs: float | int) -> None:
    """n개의 secs 초 동안의 I/O 바운드 작업을 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([io_bound_operation(secs) for _ in range(n)])


def threading_two_threads() -> None:
    threads = []
    # 열 개의 스레드 객체 생성, 각 스레드는 하나의 I/O 바운드 작업을 수행합니다
    for _ in range(10):
        t = Thread(target=thread_io_bound_operations, args=(1, 1))
        t.start()
        threads.append(t)

    # 호출 스레드 블로킹 -> 스레드가 완료되지 않은 상태로 계속 실행되지 않도록 함
    [thread.join() for thread in threads]
```

<div class="content-ad"></div>


![Example 7-2 threads](/assets/img/2024-06-22-ThreadinginPython_10.png)

## Example 7-2 threads

- Thread 1: CPU-bound task of approximately 3.5s
- Thread 2: 5 I/O-bound tasks of 1s each

Now we have two threads. Thread 1 executes a CPU-bound operation taking about 3.5 seconds, while thread 2 executes five I/O-bound tasks, each taking 1 second.


<div class="content-ad"></div>

I/O 작업이 대기하는 동안 CPU 집약 작업이 실행됩니다. 매번 I/O 작업이 시작될 때마다 OS는 빠르게 스레드를 전환합니다.

```js
def thread_io_bound_operations(n: int, secs: float | int) -> None:
    """Run n I/O-bound tasks of secs seconds and append the results to shared_list."""
    shared_list.append([io_bound_operation(secs) for _ in range(n)])


def thread_cpu_bound_operations(counts: int) -> None:
    """Run a CPU-bound task and append the results to shared_list."""
    shared_list.append([cpu_bound_operation(counts)])


def threading_two_threads() -> None:
    # 두 개의 스레드 개체 생성, 각 스레드는 다섯 가지의 I/O 작업을 수행할 것입니다
    t1 = Thread(target=thread_cpu_bound_operations, args=(100000000,))
    t2 = Thread(target=thread_io_bound_operations, args=(5, 1))

    # 활동 시작 -> run() 메서드 호출
    t1.start()
    t2.start()

    # 호출 스레드 차단 -> 스레드가 완료될 때까지 계속 실행하지 못하도록 함
    t1.join()
    t2.join()
```

![image](/assets/img/2024-06-22-ThreadinginPython_11.png)

## 예제 8-6 스레드

<div class="content-ad"></div>

- Thread 1–1 CPU-bound task of 3.5s approx (bar 5)
- Thread 2–1 CPU-bound task (bar 4)
- Thread 3–1 CPU-bound task (bar 3)
- Thread 4–1 I/O-bound task of 1s
- Thread 5–1 I/O-bound task of 1s
- Thread 6–1 I/O-bound task of 1s

여기에서는 세 개의 스레드가 각각 하나의 I/O 작업을 수행하고, 세 개의 스레드가 각각 하나의 CPU 집약적인 작업을 수행합니다. 세 개의 CPU 집약적인 작업이 완료되기까지 걸리는 시간이 다릅니다.

3.5초 동안 계속되는 가장 긴 작업이 처음에 시작됩니다(바 5). 다른 두 가지 CPU 집약적인 작업 때문에 거의 6초가 걸립니다.

```python
def 스레드_io_bound_operations(n: int, secs: float | int) -> None:
    """n개의 secs 초동안 I/O-bound 작업을 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([io_bound_operation(secs) for _ in range(n)])
    

def 스레드_cpu_bound_operations(counts: int) -> None:
    """CPU-bound 작업을 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([cpu_bound_operation(counts)])


def threading_six_threads() -> None:
    # 두 가지 스레드 객체 생성, 각 스레드는 다섯 개의 I/O-bound 작업을 수행할 것임
    t1 = Thread(target=thread_cpu_bound_operations, args=(100000000,))
    t2 = Thread(target=thread_cpu_bound_operations, args=(50000000,))
    t3 = Thread(target=thread_cpu_bound_operations, args=(20000000,))
    t4 = Thread(target=thread_io_bound_operations, args=(1, 1))
    t5 = Thread(target=thread_io_bound_operations, args=(1, 1))
    t6 = Thread(target=thread_io_bound_operations, args=(1, 1))

    # 활동 시작 -> run() 메서드 호출
    t1.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t6.start()

    # 호출 스레드 차단 -> 스레드가 완료되지 않은 채로 계속 실행되지 않도록 함
    t1.join()
    t2.join()
    t3.join()
    t4.join()
    t5.join()
    t6.join()
```

<div class="content-ad"></div>

<img src="/assets/img/2024-06-22-ThreadinginPython_12.png" />

## 예제 9-4 쓰레드

쓰레드 1은 각각 3.5초의 두 개의 CPU-bound 작업을 순차적으로 실행합니다(막대 6 및 7). 쓰레드 2는 각각 거의 1초의 두 개의 CPU-bound 작업을 순차적으로 실행합니다(막대 4 및 5).

다른 막대는 I/O-bound 작업을 나타내며 각각 1초씩 두 개가 있습니다.

<div class="content-ad"></div>

```js
def thread_io_bound_operations(n: int, secs: float | int) -> None:
    """n개의 I/O 바운드 작업을 secs 초 동안 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([io_bound_operation(secs) for _ in range(n)])


def thread_cpu_bound_operations(counts: int, n: int) -> None:
    """CPU 바운드 작업을 실행하고 결과를 shared_list에 추가합니다."""
    shared_list.append([cpu_bound_operation(counts) for _ in range(n)])


def threading_four_threads() -> None:
    # 두 개의 쓰레드 객체를 생성하며 각 쓰레드는 다섯 개의 I/O 바운드 작업을 수행합니다.
    t1 = Thread(target=thread_cpu_bound_operations, args=(100000000, 2))
    t2 = Thread(target=thread_cpu_bound_operations, args=(20000000, 2))
    t3 = Thread(target=thread_io_bound_operations, args=(2, 1))
    t4 = Thread(target=thread_io_bound_operations, args=(2, 1))

    # 활동 시작 -> run() 메소드를 호출합니다.
    t1.start()
    t2.start()
    t3.start()
    t4.start()

    # 호출 쓰레드를 차단 -> 쓰레드들이 완료될 때까지 계속 실행되지 않도록 합니다.
    t1.join()
    t2.join()
    t3.join()
    t4.join()
```

<img src="/assets/img/2024-06-22-ThreadinginPython_13.png" />

쓰레드 1(막대 6과 7)가 첫 번째 3.5초 CPU 바운드 작업(막대 6)을 실행할 때, 다른 쓰레드들과 교차되어 최종적으로 실행을 완료하는 데 5초가 걸립니다. 모든 I/O 바운드 작업은 약 1초가 걸리지만, CPU 집약적 작업이 실행 중일 때 대기하고 있을 수 있습니다. 따라서 쓰레드 1은 첫 번째 작업을 완료하는 데 주로 쓰레드 2의 두 CPU 바운드 작업(막대 4와 5)으로 인해 5초가 걸립니다.

쓰레드 1(막대 6과 7)가 두 번째 3.5초 CPU 바운드 작업(막대 7)을 실행하는 경우에는 프로세서의 모든 성능을 직접 활용할 수 있습니다. 따라서 약 3.5초가 걸립니다.

<div class="content-ad"></div>

위에서는 이 개념을 명확히 설명하기 위한 몇 가지 예시였습니다. 이제 다른 더 편리한 방법들에 대해 알아봅시다!

# ThreadPoolExecutor

concurrent.futures 모듈은 스레드를 만들기 위해 사용할 수 있는 ThreadPoolExecutor 객체와 multiprocessing을 위한 ProcessPoolExecutor 객체를 제공합니다.

이 글에서는 스레드에 초점을 맞추기 때문에 ThreadPoolExecutor만 사용할 것입니다.

<div class="content-ad"></div>

# 이유

ThreadPoolExecutor 클래스는 비동기적으로 호출을 실행하는 데 쓰이는 Executor 하위 클래스입니다.

ThreadPoolExecutor는 스레드나 워커 스레드의 컬렉션을 생성하고 관리하여 재사용할 수 있게 합니다. 우리가 위에서 한 것처럼 작업을 동시에 실행하고자 할 때마다 스레드를 생성하고 소멸하는 것을 피할 수 있습니다. 이렇게 하면 이러한 작업이 시간이 많이 소요되기 때문에 성능이 향상됩니다.

# 작동 방식

<div class="content-ad"></div>

## The Executor 클래스

`ProcessPoolExecutor` 클래스와 마찬가지로 `ThreadPoolExecutor`도 `Executor` 클래스를 확장합니다. `Executor` 클래스는 다섯 가지 메서드만을 정의하는 추상 기본 클래스로 다음과 같습니다:

- `submit()`
- `map()`
- `shutdown()`

다른 두 메서드는 사실 `__enter__()`와 `__exit__()`로, 이는 파이썬의 매직 메서드로 컨텍스트 관리 프로토콜을 구현합니다. 이들 덕분에 `ThreadPoolExecutor`를 `with` 문에서 사용할 수 있습니다(권장). `with` 문은 `__enter__()` 메서드를 호출하며, `with` 코드 블록을 벗어날 때 `__exit__()`가 호출됩니다.

<div class="content-ad"></div>

```python
class Executor(object):
    """구체적인 비동기 업무 처리자들을 위한 추상 기본 클래스입니다."""
    ...
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.shutdown(wait=True)
        return False
```

Executor는 단지 추상 클래스이며 대부분의 로직은 ThreadPoolExecutor 메서드에서 구현됩니다. submit() 및 shutdown() 메서드는 ThreadPoolExecutor 클래스에서 구현되었으며 map() 메서드의 로직은 Executor 클래스에서 구현되었습니다. 내부적으로 submit()을 사용하기 때문입니다.

## ThreadPoolExecutor 클래스

Python의 concurrent.futures 모듈의 ThreadPoolExecutor는 작업을 관리하기 위해 내부적으로 큐를 사용합니다. 큐는 ThreadPoolExecutor의 생성자에서 생성됩니다.


<div class="content-ad"></div>

## __init__() 메서드

__init__() 메서드는 새로운 ThreadPoolExecutor 인스턴스를 초기화하고 큐 및 몇 가지 더 많은 객체를 생성합니다.

아래의 SimpleQueue 클래스는 간단한 비제한 FIFO(선입선출) 큐입니다. 먼저 들어간 순서대로 큐에서 항목이 처리되거나 제거되는 선입선출 원칙을 따릅니다.

max_workers 매개변수에 인자로 전달하여 사용할 수있는 스레드의 최대 수를 설정할 수 있습니다. 그렇게 하지 않으면 기본값은 머신의 프로세서 수에 4를 더한 값이 됩니다. 그 값이 32를 초과하지 않습니다.

<div class="content-ad"></div>

```python
class ThreadPoolExecutor(_base.Executor):
    ...

    def __init__(self, max_workers=None, thread_name_prefix='',
                 initializer=None, initargs=()):
        ...
        if max_workers is None:
            # 두 종류의 작업에 대해 process_cpu_count + 4를 사용합니다.
            # 그러나 많은 코어를 가진 기계에서 예상치 못하게 많은 리소스를 소비하도록 제한합니다.
            max_workers = min(32, (os.process_cpu_count() or 1) + 4)
        ...

        self._max_workers = max_workers
        self._work_queue = queue.SimpleQueue()
        ...
```

우리는 쓰레드에 선택적으로 이름 접두사를 전달하고, 워커 쓰레드를 초기화하는 데 사용되는 호출 가능한 객체, 그리고 그 인수를 포함하는 튜플을 전달할 수 있습니다.

## submit() 메서드

submit() 메서드는 호출 가능한 객체를 실행할 수 있도록 예약합니다. 호출 가능한 객체는 함수 이름과 해당 인수를 전달하는 인수로 사용됩니다.

<div class="content-ad"></div>

```python
with ThreadPoolExecutor(max_workers=1) as executor:
    future = executor.submit(pow, 323, 1235)
    print(future.result())  # blocks
```

이 작업은 호출 가능한 함수의 비동기 실행을 나타내는 Future 객체로 래핑되어 있으며, submit() 메서드에 의해 즉시 반환됩니다.

Future는 비동기 작업의 최종 결과를 나타내는 추상화로, 초기에 결과를 알 수없는 결과를 대신하는 객체입니다. 보통 결과의 계산이 아직 완료되지 않았기 때문에 결과가 아직 알려지지 않았을 때 사용됩니다.

future.result()는 호출한 함수(pow 함수)에서 반환된 값을 반환합니다. 호출이 아직 완료되지 않았을 경우 이 메서드는 최대 timeout 초까지 대기합니다 (timeout은 result(timeout=None)의 유일한 매개변수입니다). 호출이 timeout 초 내에 완료되지 않으면 TimeoutError가 발생합니다. timeout은 int 또는 float가 될 수 있으며, 지정되지 않거나 None인 경우 대기 시간 제한이 없습니다.


<div class="content-ad"></div>

아래는 ThreadPoolExecutor 클래스의 일부 소스 코드를 볼 수 있습니다. submit() 메서드가 호출되면 Future와 _WorkItem 객체가 생성됩니다. 그런 다음 _WorkItem은 _work_queue에 넣어집니다.

```js
class ThreadPoolExecutor(_base.Executor):
    ...

    def submit(self, fn, /, *args, **kwargs):
        with self._shutdown_lock, _global_shutdown_lock:
            ...

            f = _base.Future()
            w = _WorkItem(f, fn, args, kwargs)

            self._work_queue.put(w)
            self._adjust_thread_count()
            return f
        ...
```

_WorkItem은 작업 (fn), 인수들 (args 및 kwargs) 및 미래 객체 (_base.Future())를 함께 래핑하는 데 사용되는 객체입니다. 작업이 실행되고 결과가 Future 객체에 설정되는 run() 메서드를 구현합니다.

```js
class _WorkItem:
    def __init__(self, future, fn, args, kwargs):
        self.future = future
        self.fn = fn
        self.args = args
        self.kwargs = kwargs

    def run(self):
        if not self.future.set_running_or_notify_cancel():
            return

        try:
            result = self.fn(*self.args, **self.kwargs)
        except BaseException as exc:
            self.future.set_exception(exc)
            # 예외 'exc'와의 참조 순환을 끊습니다
            self = None
        else:
            self.future.set_result(result)

    __class_getitem__ = classmethod(types.GenericAlias)
```

<div class="content-ad"></div>

run() 메서드는 작업자 스레드에서 호출됩니다. worker 모듈 함수인 _worker에 구현되어 있으며, 이 함수는 스레드에 대상으로 전달된 함수입니다.

```js
def _worker(executor_reference, work_queue, initializer, initargs):
    ...

            if work_item is not None:
                work_item.run()
                # 객체에 대한 참조 삭제. GH-60488 참조
                del work_item
                continue

            ...
```

스레드는 ThreadPoolExecutor 클래스 생성자에서 호출되는 _adjust_thread_count() 메서드에서 생성됩니다.

```js
class ThreadPoolExecutor(_base.Executor):

    def _adjust_thread_count(self):
        ...
        if num_threads < self._max_workers:
            thread_name = '%s_%d' % (self._thread_name_prefix or self,
                                     num_threads)
            t = threading.Thread(name=thread_name, target=_worker,
                                 args=(weakref.ref(self, weakref_cb),
                                       self._work_queue,
                                       self._initializer,
                                       self._initargs))
            t.start()
            self._threads.add(t)
            _threads_queues[t] = self._work_queue
    ...
```

<div class="content-ad"></div>

## map() 메소드

map()은 Executor 클래스에 직접 구현되어 있으며 내부적으로 submit() 메소드를 사용합니다.

```js
class Executor(object):
    """이것은 구체적인 비동기 executor를 위한 추상 기본 클래스입니다."""
    ...
    def map(self, fn, *iterables, timeout=None, chunksize=1):
        ...
        fs = [self.submit(fn, *args) for args in zip(*iterables)]
        ...
```

map()은 스레드 풀에 작업을 제출하는 또 다른 방법입니다. 내장된 map(fn, *iterables) 함수와 유사하지만 fn으로 전달하는 함수는 비동기적으로 실행되며 fn에 대해 여러 호출을 동시에 수행할 수 있습니다.

<div class="content-ad"></div>

내장 map() 함수는 지연 평가를 제공합니다. 이는 해당 함수에서 반환된 iterable의 값들이 요청될 때에만 계산되고 반환된다는 것을 의미합니다.

그러나 Executor.map(fn, *iterables)를 호출할 때에는 해당 함수가 제공된 iterable의 모든 항목을 미리 가져옵니다. 이는 필요시에만 처리되는 '지연 평가' 방식과 대조적입니다.

이는 우리가 작업에서 값을 가져오기 위해 순서가 지정된 iterable에서 값들을 가져올 때 반복할 수 있는 iterator를 반환합니다.

만약 timeout이 지정되지 않거나 None이면 대기 시간 제한이 없습니다. 따라서 반복을 시작할 때 첫 번째 요소가 이용 가능할 때까지 두 번째 요소에는 액세스하지 않습니다. timeout이 특정 int나 float로 설정된 경우 주어진 시간 초과 후 결과를 얻을 수 없는 경우 TimeoutError가 발생합니다.

<div class="content-ad"></div>

만약 함수 호출이 예외를 발생시키면, 해당 예외는 반복자에서 값을 검색할 때 발생됩니다.

예제를 살펴보겠습니다! 이 예제는 정말 멋지고, 제가 20번 정도 실행했어요 🤭

기본적으로 ThreadPoolExecutor를 사용하여 5개의 워커 스레드로 위키피디아에서 20가지 이국적인 호주 동물을 로드합니다.

특정 시점에는 하나의 스레드만 실행될 수 있지만, 5개의 스레드가 사용 가능합니다. 따라서 첫 번째 스레드가 실행을 시작하면 컨텍스트 스위치가 발생하고 두 번째 스레드가 시작할 수 있습니다. 왜냐하면 OS가 I/O 작업임을 감지하고 자원을 다른 스레드에 할당함으로써 시간 자원을 낭비하지 않습니다.

<div class="content-ad"></div>

아래 표를 보면 언제나 동시에 5개의 스레드만 작동 중임을 알 수 있습니다. 하나의 스레드가 작업을 완료하면 다른 작업을 시작하기 위해 재사용됩니다. 작업을 완료하는 데는 4초 미만이 소요됩니다.

![image](/assets/img/2024-06-22-ThreadinginPython_14.png)

반면에, 만약 우리가 20마리의 호주 동물을 동기적으로 로드한다면 거의 15초가 걸립니다! 😱

![image](/assets/img/2024-06-22-ThreadinginPython_15.png)

<div class="content-ad"></div>

위 코드에서는 20가지의 이국적인 호주 동물을 확인할 수 있어요.

```js
import concurrent.futures
from time import perf_counter, time
import urllib.request
import logging

from concurrency.utils import get_saving_path, postprocess_times
from concurrency.visualize import barh


format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")


URLS = [
    "https://en.wikipedia.org/wiki/Emu",
    "https://en.wikipedia.org/wiki/Wombat",
    "https://en.wikipedia.org/wiki/Kangaroo",
    "https://en.wikipedia.org/wiki/Platypus",
    "https://en.wikipedia.org/wiki/Koala",
    "https://en.wikipedia.org/wiki/Tasmanian_devil",
    "https://en.wikipedia.org/wiki/Echidna",
    "https://en.wikipedia.org/wiki/Dingo",
    "https://en.wikipedia.org/wiki/Kookaburra",
    "https://en.wikipedia.org/wiki/Wallaby",
    "https://en.wikipedia.org/wiki/Macrotis",
    "https://en.wikipedia.org/wiki/Quokka",
    "https://en.wikipedia.org/wiki/Cassowary",
    "https://en.wikipedia.org/wiki/Sugar_glider",
    "https://en.wikipedia.org/wiki/Laughing_kookaburra",
    "https://en.wikipedia.org/wiki/Rainbow_lorikeet",
    "https://en.wikipedia.org/wiki/Coastal_taipan",
    "https://en.wikipedia.org/wiki/Mistletoebird",
    "https://en.wikipedia.org/wiki/Thylacine",
    "https://en.wikipedia.org/wiki/Quoll",
]

animals = {}


# I/O-bound operation
def load_url(url: str) -> tuple[float]:
    """Retrieve a single page and return start and finish times."""
    start = perf_counter()
    with urllib.request.urlopen(url) as conn:
        animals[url] = conn.read()
    finish = perf_counter()
    return start, finish


def asynchronous_load_australian_animals() -> None:
    start = time()
    # Use ThreadPoolExecutor to manage concurrency
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        # Use the map method to apply load_url to each URL
        results = executor.map(load_url, URLS)

        # Process the results and times
        times = [time for time in results]
        start_points, end_points = postprocess_times(times)
    end = time()

    total_time = round(end - start) + 1

    barh(
        title="비동기 실행, 5개 스레드, I/O 바운드 작업, 호주 동물",
        start_points=start_points,
        end_points=end_points,
        path=get_saving_path("thread-pool-executor/images/ThreadPoolExecutor_ex1.png"),
        n=len(URLS),
        secs=total_time,
    )


if __name__ == "__main__":
    logging.info("비동기 작업 초기화")
    asynchronous_load_australian_animals()
    logging.info(f"len(animals): {len(animals)}")
    logging.info("비동기 작업 완료")
```

submit() 메서드를 사용하면 다음과 같이 보일 수 있지만, 실행할 때마다 많이 달라집니다.

<img src="/assets/img/2024-06-22-ThreadinginPython_16.png" />

<div class="content-ad"></div>

as_completed() 함수를 사용하여 Future 인스턴스를 반복 처리해야 합니다. 그렇지 않으면 postprocess_times() 함수가 예외를 발생시킬 수 있습니다.

as_completed() 함수는 결과로 제공된 Future 인스턴스에 대한 iterator를 반환하며 완료된 또는 취소된 Future를 생성합니다.

```python
def asynchronous_load_australian_animals() -> None:
    start = time()
    # 동시성 관리를 위해 ThreadPoolExecutor 사용
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        # submit 메서드를 사용하여 각 URL에 load_url을 적용
        results = [executor.submit(load_url, url) for url in URLS]

        # 결과 및 시간 처리
        times = [result.result() for result in concurrent.futures.as_completed(results)]
        start_points, end_points = postprocess_times(times)
    end = time()

    total_time = round(end - start) + 1
```

## shutdown() 메서드

<div class="content-ad"></div>

ThreadPoolExecutor을 with 문으로 context manager로 호출하면 shutdown() 메소드를 호출할 필요가 없습니다. 왜냐하면 shutdown() 메소드가 __exit__() 매직 메소드 내에서 호출되기 때문입니다. 그렇지 않으면 현재 대기 중인 futures가 실행을 완료한 후 사용 중인 모든 리소스를 해제해야 하는 executor에게 신호를 보내기 위해 호출해야 합니다.

```js
class Executor(object):
    """이것은 구체적인 비동기 executor를 위한 추상 기본 클래스입니다."""
    ...
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.shutdown(wait=True)
        return False
```

이러한 도구들로 할 수 있는 일이 많습니다. Future 객체에는 프로그램 동작을 사용자 정의하는 데 사용할 수 있는 여러 메소드가 있습니다(예: cancel(), running(), done(), 등).

concurrent.futures 모듈에는 완료를 기다리도록 허용하는 wait() 함수도 제공됩니다. return_when 매개변수를 통해 반환할 시점을 지정할 수 있습니다.

<div class="content-ad"></div>

위에 나열한 자료들은 이 주제를 더 잘 이해하는 데 도움이 되었어요.

언제든지 어떤 소셜 네트워크로든 연락 주세요. 피드백은 언제든지 환영합니다!

읽어 주셔서 감사합니다 🙂

javideveloper.com

<div class="content-ad"></div>

# 기타 자료

- 동시성 및 병렬성 소개
- threading 모듈 문서
- threading 모듈 소스 코드. Python 3.13
- concurrent.futures 모듈 문서
- concurrent.futures 모듈 소스 코드
- queue 모듈 소스 코드
- thread pool 위키백과
- map(fn, *iterables) 내장 함수
- concurrency-python 저장소
- 파이썬 스레딩: SuperFastPython의 완전 가이드
- Python의 ThreadPoolExecutor: SuperFastPython의 완전 가이드