---
title: "파이썬 동시성 완벽 정복을 위한 12가지 필수 팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-12EssentialTipsforMasteringPythonConcurrency_0.png"
date: 2024-07-13 19:35
ogImage: 
  url: /TIL/assets/img/2024-07-13-12EssentialTipsforMasteringPythonConcurrency_0.png
tag: Tech
originalTitle: "12 Essential Tips for Mastering Python Concurrency"
link: "https://medium.com/top-python-libraries/12-essential-tips-for-mastering-python-concurrency-4bcd5fe4b432"
---


<img src="/TIL/assets/img/2024-07-13-12EssentialTipsforMasteringPythonConcurrency_0.png" />

## 파이썬 동시성이 프로그래밍 병목 현상을 해결하는 방법

오늘은 파이썬에서 동시성을 탐색할 거에요 — 프로그램을 더 빠르게 실행할 수 있는 마법 같은 열쇠!

걱정하지 마세요, 초심자라도 동시성을 마스터할 수 있도록 단계별로 안내할게요.

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

# 1. 스레딩 소개: 멀티 스레딩 기초

카페에서 이메일 처리, 채팅 및 코딩을 동시에 하는 상황을 상상해보세요 — 그것이 멀티 스레딩입니다.

Python에서는 `threading` 모듈이 여러분의 유용한 도우미입니다.

```python
import threading
import time

def say_hello(name):
    print(f"Hello, {name}!")
    time.sleep(2)  # 시간이 오래 걸리는 작업을 모방

# 스레드 생성
thread1 = threading.Thread(target=say_hello, args=("World",))
thread2 = threading.Thread(target=say_hello, args=("Python",))

# 스레드 시작
thread1.start()
thread2.start()

# 모든 스레드가 완료될 때까지 대기
thread1.join()
thread2.join()

print("모든 작업 완료.")
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

이 코드는 서로 다른 인사말을 인쇄하는 두 개의 스레드를 만들고, 그들이 완료될 때까지 기다립니다. `join()`을 기억하세요, 스레드가 완료될 때까지 기다립니다.

# 2. 동시성 함정: 전역 인터프리터 잠금(GIL)

멀티스레딩을 논의할 때, 파이썬의 GIL에 대해 언급해야 합니다. CPU 코어가 파이썬 바이트코드를 실행하는 것에 차례를 가져가도록 하는 것인데, 이는 CPU 바운드 작업에 대해 멀티스레딩이 항상 더 빠르지는 않다는 의미입니다. 하지만 걱정하지 마세요, I/O 바운드 작업의 경우에는 멀티스레딩이 여전히 유용합니다!

# 3. 병렬 처리: GIL 우회

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

다중 코어 CPU를 최대한 활용하려면 `multiprocessing` 모듈을 사용하세요. 이 모듈은 각 프로세스에 대해 별도의 Python 해석기를 생성하여 GIL을 우회합니다.

```python
from multiprocessing import Process
import time

def worker(num):
    print(f'Worker: {num}')
    time.sleep(2)

if __name__ == '__main__':
    processes = []
    for i in range(4):
        p = Process(target=worker, args=(i,))
        processes.append(p)
        p.start()
```

각 `Process`는 GIL과 독립적으로 실행됩니다.

# 4. 동시성이 모든 문제를 해결해 주지는 않습니다.

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

동시성은 데이터 동기화 문제와 함께 복잡할 수 있습니다. 자원 충돌을 피하기 위해 잠금을 사용하면 마치 주방에서 하나의 전자 레인지를 공유하는 것처럼 자원 충돌을 피할 수 있습니다.

```python
from threading import Lock

lock = Lock()

def safe_print(number):
    with lock:
        print(f'Safe print: {number}')

safe_print(1)
safe_print(2)
```

`with`를 사용하면 잠금을 자동으로 관리하여 안전을 보장합니다.

# 5. 큐의 지혜: `queue.Queue`

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

편리하게 생각해보면 공장 조립 라인과 비슷한데, `Queue`는 스레드/프로세스 간 데이터 교환을 조율하는 조정자입니다.

```python
from queue import Queue
from threading import Thread

def producer(queue):
    queue.put('Product')

def consumer(queue):
    print(queue.get())

q = Queue()
producer_thread = Thread(target=producer, args=(q,))
consumer_thread = Thread(target=consumer, args=(q,))

producer_thread.start()
consumer_thread.start()

producer_thread.join()
consumer_thread.join()
```

큐는 혼란을 방지하고 안전한 데이터 전송을 보장합니다.

# 6. 비동기의 마법: `asyncio`

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

기다리기 싫어요? `asyncio`가 `async`/`await`으로 비동기 프로그래밍 세계로 안내합니다. 당신의 코드를 날아다니게 만들어줍니다.

```python
import asyncio

async def hello(i):
    print(f'Hello {i}')
    await asyncio.sleep(1)  # 비동기 대기

async def main():
    tasks = [hello(i) for i in range(3)]
    await asyncio.gather(*tasks)

# Python 3.7+
asyncio.run(main())
```

비동기 대기를 통해 다른 작업을 수행하면서 대기할 수 있어 효율성을 향상시킬 수 있어요.

# 7. 비동기 프로그래밍에 대한 오해

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

`asyncio`는 강력하지만 하드웨어와 직접 상호 작용하는 저수준 API와 같은 모든 함수를 비동기적으로 실행할 수 없습니다. 올바른 방법을 선택하고 강제로 async를 적용하지 마세요.

# 8. `concurrent.futures`: 간편한 Future 처리

간단한 동시 작업의 경우, 동기적 또는 비동기적으로, `concurrent.futures`를 활용하세요.

```js
from concurrent.futures import ThreadPoolExecutor

def worker(n):
    return n * n

with ThreadPoolExecutor() as executor:
    results = executor.map(worker, range(5))
    print(list(results))  # 제곱 출력
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

 ThreadPoolExecutor를 사용하여 스레드 풀을 쉽게 관리할 수 있습니다. 이를 통해 작업 실행이 음식 주문하는 것만큼 간단해집니다.

# 9. 오류 처리의 기술: 예외 gracefully 처리하기

동시성에서 오류 처리는 중요합니다. 코드를 보호하기 위해 `try-except`를 사용하여 한 작업의 실패가 전체 프로그램에 영향을 미치지 않도록합니다.

```js
try:
    # 실패할 수도 있는 동시성 코드
except Exception as e:
    print(f"예외를 잡았습니다: {e}")
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

침착하게 유지하고 오류를 세련되게 처리하여 견고한 프로그램을 만들어봐요.

# 10. 리소스 관리: 컨텍스트 관리자와 `with`

`with` 문은 파일, 락과 같은 리소스가 올바르게 해제되어 경쟁 상태에서 리소스 누출을 방지해줘요.

```js
with Lock():
    # 공유 리소스를 안전하게 조작해요
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

표 태그를 마크다운 형식으로 변경해 드릴게요.

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

실제 예시를 통해 동시에 이미지를 다운로드하여 동시성의 힘을 느껴보는 연습을 해보세요.

```python
import os
import requests
from threading import Thread

def download_image(url, filename):
    response = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(response.content)
    print(f'{filename} 다운로드 완료.')

urls = ['img_url1', 'img_url2']  # 예시 URL
threads = []

for url in urls:
    t = Thread(target=download_image, args=(url, os.path.basename(url)))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print('모든 이미지 다운로드 완료.')
```

동시 다운로드는 프로세스를 크게 가속시킵니다!

이 12가지 실용적인 팁으로 파이썬 동시성 능력을 향상시켰습니다. 진실을 확인하기 위해 연습해보세요. 프로그램을 실행시켜 빠르게 동작시켜 보세요!

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

Substack에서 최신 AI 이야기를 따라가며 연락을 유지해보세요. 함께 AI의 미래를 함께 만들어요!

Substack에서 Python 이야기를 최신 상태로 유지하기 위해 연락을 유지해보세요. 함께 Python을 배워봐요!