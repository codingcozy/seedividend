---
title: "파이썬 코딩 멀티스레딩으로 for 루프 속도 10배 향상시키는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-PythonCodingMakeForLoops10xFasterwithMultithreading_0.png"
date: 2024-07-13 19:21
ogImage: 
  url: /TIL/assets/img/2024-07-13-PythonCodingMakeForLoops10xFasterwithMultithreading_0.png
tag: Tech
originalTitle: "Python Coding: Make For Loops 10x Faster with Multithreading"
link: "https://medium.com/gitconnected/python-coding-make-for-loops-10x-faster-with-multithreading-63c3d5c5d9d9"
---



![Python Coding Make For Loops 10x Faster with Multithreading](/TIL/assets/img/2024-07-13-PythonCodingMakeForLoops10xFasterwithMultithreading_0.png)

For loops are essential in programming. They allow us to iterate over sequences efficiently. However, for time-consuming tasks, using threads can be more efficient. Learn when and how to use threads to optimize performance. You can check out code examples in my GIT repo. The link is in the footer.

Let's look at an example. We will simulate a time-consuming task by squaring numbers using a Python script with a for loop:

```python
import time

# List of numbers to process
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Function to square a number
def square_number(number):
    time.sleep(1)  # Simulate a time-consuming task
    return number * number

# Using a for loop to process each number
squared_numbers = []
start_time = time.time()
for number in numbers:
    squared_numbers.append(square_number(number))

end_time = time.time()

print("Squared numbers:", squared_numbers)
print("Time taken:", end_time - start_time, "seconds")
# Time taken: 10.082990884780884 seconds
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

이 스크립트는 square_number 함수 내의 time.sleep(1) 호출로 인해 각 숫자를 순차적으로 처리합니다. 전체 실행에는 10.1초가 소요됩니다.

## 멀티스레딩으로 최적화

다음으로, 처리 시간을 개선하기 위해 멀티스레딩 접근 방식으로 최적화할 것입니다. 멀티스레딩을 사용하여 위 예제를 최적화하려면 Python의 concurrent.futures 모듈을 사용할 수 있습니다. 이 모듈은 콜러블을 비동기적으로 실행하기 위한 고수준 인터페이스를 제공합니다.

다음은 스크립트를 멀티스레딩을 사용하도록 수정하는 방법입니다:

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
import time
from concurrent.futures import ThreadPoolExecutor

# 처리할 숫자의 목록
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 숫자를 제곱하는 함수
def square_number(number):
    time.sleep(1)  # 시간이 많이 소요되는 작업을 모방
    return number * number

# 멀티스레딩을 위해 ThreadPoolExecutor 사용
squared_numbers = []
start_time = time.time()

with ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(square_number, numbers)

# 결과 수집
squared_numbers = list(results)

end_time = time.time()

print("제곱된 숫자:", squared_numbers)
print("소요 시간:", end_time - start_time, "초")
# 소요 시간: 2.0257720947265625 초
```

이 최적화된 스크립트에서 우리는 ThreadPoolExecutor를 사용해 스레드 풀을 생성합니다. executor.map 함수는 숫자를 병렬로 처리하는 스레드에 square_number 함수를 분배합니다. max_workers를 5로 설정하여 최대 5개의 스레드가 동시에 실행되도록 하여 총 처리 시간을 크게 줄일 수 있습니다.

특정 사용 사례에 최적인 스레드 수를 찾으려면 max_workers 매개변수를 조정해보세요.

# 멀티스레딩 사용 시기


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

다중 스레딩은 다양한 시나리오에서 상당한 속도 향상을 제공할 수 있다는 것을 보셨을 것입니다. 그러나 모든 작업에 적합한 것은 아닙니다. 다음은 다중 스레딩이 특히 유익한 일반적인 사용 사례 몇 가지입니다:

## 1. I/O-바운드 작업:

- 파일 I/O: 파일 읽기 및 쓰기, 특히 크거나 많은 파일을 다룰 때.
- 네트워크 I/O: 여러 네트워크 연결을 동시에 처리하는 경우, 예를 들어 웹 스크래핑, 파일 다운로드 또는 웹 서버의 요청 처리.
- 데이터베이스 작업: I/O 바운드인 데이터베이스 쿼리 수행, 대용량 데이터 세트를 가져오거나 업데이트하는 작업 등.

## 2. 동시 작업:

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

- 실시간 데이터 처리: 여러 센서 또는 스트림에서 데이터를 실시간으로 처리하며, IoT 응용 프로그램에서 사용됩니다.
- GUI 어플리케이션: 사용자 인터페이스를 반응적으로 유지하기 위해 시간이 많이 소요되는 작업을 백그라운드에서 실행합니다.

## 3. 독립적인 작업의 병렬 처리:

- 일괄 처리: 이미지 처리 또는 데이터 변환 작업과 같이 병렬로 실행할 수 있는 많은 독립적인 작업을 처리합니다.
- 시뮬레이션: 여러 시뮬레이션 또는 몬테카를로 실험을 동시에 실행합니다.

# 멀티스레딩을 사용하지 말아야 할 때:

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

멀티스레딩은 상당한 속도 향상을 제공할 수 있지만 항상 모든 문제에 대한 최적의 해결책은 아닙니다. 멀티스레딩이 적합하지 않을 수 있는 몇 가지 시나리오는 다음과 같습니다:

- CPU 바운드 작업: 작업이 CPU에 많은 부하를 주고 순수한 수학 계산처럼 대기 시간이 거의 없는 경우, 별도의 프로세스를 생성하기 위해 multiprocessing 모듈을 사용하는 것이 더 효과적일 수 있습니다.
- 전역 인터프리터 잠금 (GIL): CPython에서 전역 인터프리터 잠금은 CPU 바운드 작업에 대한 멀티스레딩의 성능 향상을 제한할 수 있습니다. 이러한 경우에는 multiprocessing을 사용하거나 Jython이나 IronPython과 같은 GIL이 없는 구현을 사용하는 것이 효과적일 수 있습니다.
- 복잡한 공유 상태: 여러 스레드간의 복잡한 공유 상태를 관리하는 것은 경합 조건, 데드락 및 스레드 안전성과 관련된 문제와 버그를 도입할 수 있습니다.

작업의 성격과 잠재적인 병목 현상을 이해함으로써 멀티스레딩이 응용 프로그램에 적합한 해결책인지 결정할 수 있습니다.

# 전문 팁 - 데코레이터 사용하기

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

데코레이터는 함수에 멀티스레딩을 더 우아하고 재사용 가능한 방식으로 추가할 수 있습니다. 데코레이터는 다른 함수를 받아들이고 그 동작을 명시적으로 수정하지 않고 확장하는 함수입니다.

```python
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# 멀티스레딩을 추가하는 데코레이터
def multithreaded(max_workers=5):
    def decorator(func):
        def wrapper(*args, **kwargs):
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                future_to_args = {executor.submit(func, arg): arg for arg in args[0]}
                results = []
                for future in as_completed(future_to_args):
                    arg = future_to_args[future]
                    try:
                        result = future.result()
                    except Exception as exc:
                        print(f'{arg}에서 예외가 발생했습니다: {exc}')
                    else:
                        results.append(result)
                return results
        return wrapper
    return decorator

# 숫자를 제곱하는 함수
@multithreaded(max_workers=5)
def square_number(number):
    time.sleep(1)  # 시간이 오래 걸리는 작업 시뮬레이션
    return number * number

# 처리할 숫자 목록
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 데코레이터를 사용한 함수 실행
start_time = time.time()
squared_numbers = square_number(numbers)
end_time = time.time()

print("제곱된 숫자:", squared_numbers)
print("소요 시간:", end_time - start_time, "초")
```

데코레이터를 사용하여 멀티스레딩을 처리하면 코드가 단순해지는 것뿐만 아니라 재사용성이 높아지고 코드가 더 깔끔해집니다. @multithreaded 데코레이터를 쉽게 적용하여 Python 코드를 최적화하는 유연하고 강력한 방법을 제공하여 병렬로 실행해야 하는 모든 함수에 데코레이터를 쉽게 적용할 수 있습니다.

# 결론

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

멀티스레딩은 Python에서 루프를 최적화하는 강력한 도구입니다, 특히 I/O 바운드 및 동시성 작업에 대해. concurrent.futures 모듈을 활용하여 프로세스 시간을 크게 단축하고 프로그램의 효율성을 향상시킬 수 있습니다. 그러나 CPU 바운드 작업이나 복잡한 공유 상태를 다룰 때에는 멀티스레딩이 최선의 방법인지를 판단하기 위해 특정 사용 사례를 신중하게 평가하는 것이 중요합니다. 신중한 고려와 구현으로 멀티스레딩은 응용 프로그램의 성능을 크게 향상시킬 수 있습니다.

# 연락하고 싶으시다구요?

읽어 주셔서 감사합니다. 즐겁게 보셨기를 바라며 이 글에서 무언가를 얻을 수 있기를 바랍니다.

- 만약 이 글이 마음에 드셨다면 아래에서 박수를 부탁드려요 👏👏👏...
- 더 많은 AI 정보를 얻기 위해 팔로우해 주세요 🤖🤖🤖...
- LinkedIn에서 저를 찾아보세요
- GitHub에서 코드를 확인해 보세요

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

언제나 궁금한 점이나 아이디어, 추천 사항이 있으시면 언제든지 댓글로 질문해주세요.