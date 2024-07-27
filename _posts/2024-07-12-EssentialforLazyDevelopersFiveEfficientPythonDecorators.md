---
title: "게으른 개발자를 위한 필수 효율적인 파이썬 데코레이터 5가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_0.png"
date: 2024-07-12 20:47
ogImage: 
  url: /TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_0.png
tag: Tech
originalTitle: "Essential for Lazy Developers: Five Efficient Python Decorators"
link: "https://medium.com/faun/essential-for-lazy-developers-five-efficient-python-decorators-a8d5964994f8"
---


<img src="/TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_0.png" />

파이썬은 가독성이 뛰어나고 데이터 분석 및 웹 개발과 같은 여러 분야에서 강력한 응용 프로그램을 제공하여 개인적으로 가장 좋아하는 프로그래밍 언어입니다.

하지만, 충분한 코드를 작성하고 있음에도 불구하고, 제가 절대적으로 필요한 경우가 아닌 한 @staticmethod를 사용하여 클래스 내의 정적 메서드를 꾸미는 데코레이터를 거의 사용하지 않습니다.

그러나 코드 리뷰 중에 코드에 소개된 예외 처리 데코레이터를 발견했는데, 이는 제 생각을 바꾸어 코드를 더 읽기 쉽게 만들었으며 간결한 형태로 강력한 기능을 제공했습니다. 이것이 나의 호기심을 자극하여 데코레이터의 다른 기능을 탐구하게 만들었으므로, 이 글에서는 데코레이터의 개념을 깊이 탐구하고 우리의 파이썬 코드를 개선하는 데 도움이 되는 다섯 가지 실용적인 데코레이터를 소개하겠습니다.

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

# 데코레이터란

![image](/TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_1.png)

데코레이터는 파이썬의 강력한 언어 기능으로, 원본 함수 코드를 수정하지 않고도 기능을 동적으로 추가하거나 함수 동작을 수정할 수 있게 해줍니다. 데코레이터는 다른 함수나 클래스를 매개변수로 받아 새로운 함수나 클래스를 반환하는 함수입니다.

데코레이터는 함수를 수정, 확장 또는 래핑하여 코드를 보다 가독성 있고 유지보수하기 쉽게 만드는 간결하고 우아한 방법을 제공합니다.

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

데코레이터는 일반적으로 다음과 같은 시나리오에서 사용됩니다:

- 추가 기능 또는 로직 추가, 로깅, 성능 분석, 입력 유효성 검사 등;
- 함수의 동작 수정, 결과 캐싱, 재시도 메커니즘 추가 또는 입력 매개변수를 가로채서 매개변수를 확인하고 많은 assert 문을 사용하는 대신;
- 관심을 분리하고 자르로 자르로 사용되는 관심사항을 핵심 비즈니스 로직과 분리합니다.

# 5 매우 간단하지만 유용한 데코레이터

## 01 타이머: 함수 실행 시간 측정

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

코드 성능 최적화는 매우 중요합니다. 이 데코레이터는 특정 함수의 실행 시간을 추적하고 경과 시간을 출력하는 데 도움을 줍니다. 이 데코레이터로 함수를 감싸면 병목 현상을 신속하게 식별하고 코드의 핵심 부분을 최적화할 수 있습니다.

```js
import time

def timer(func):
    def wrapper(*args, **kwargs):
        # 타이머 시작
        start_time = time.time()
        # 데코레이트된 함수 호출
        result = func(*args, **kwargs)
        # 시간 다시 측정
        end_time = time.time()
        # 경과 시간 계산 및 출력
        execution_time = end_time - start_time
        print(f"실행 시간: {execution_time} 초")
        # 데코레이트된 함수 실행 결과 반환
        return result
    # wrapper 함수에 대한 참조 반환
    return wrapper
```

파이썬에서 데코레이터를 만들려면 timer라는 함수를 정의해야 합니다. 이 함수는 데코레이터 함수임을 나타내는 func라는 매개변수를 받습니다. timer 함수 내부에서는 원하는 함수를 데코레이트하기 위해 매개변수를 일반적으로 전달하는 wrapper라는 다른 함수를 정의합니다.

wrapper 함수 내에서는 제공된 인수를 사용하여 필요한 함수를 호출합니다. 이렇게 할 수 있습니다: result = func(*args, **kwargs).

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

마지막으로, 래퍼 함수는 장식된 함수의 실행 결과를 반환합니다. 데코레이터 함수는 방금 만든 래퍼 함수에 대한 참조를 반환해야 합니다.

데코레이터를 활용하기 위해서는 원하는 함수에 @ 기호를 사용하여 적용하면 됩니다.

```js
@timer
def train_model():
    print("Starting the model training function...")
    # 프로그램을 5초간 일시 중지하여 함수 실행을 시뮬레이션합니다
    print("Model training completed!")

train_model()
```

## 02 debugger: Make Debug Easier

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

유용한 추가 래퍼 함수를 만들어 디버깅을 용이하게 할 수 있습니다. 각 함수의 입력 및 출력을 출력하여 실행 흐름을 확인할 수 있습니다. 이 방법을 통해 복수의 print 문으로 애플리케이션을 혼란스럽게 만들 필요가 없습니다.

```python
def debugger(func):
    def wrapper(*args, **kwargs):
        # 함수 이름과 인수 출력
        print(f"Calling {func.__name__} with args: {args} kwargs: {kwargs}")
        # 함수 호출
        result = func(*args, **kwargs)
        # 결과 출력
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper
```

호출된 함수의 이름을 가져오기 위해 __name__ 매개변수를 사용할 수 있으며, args와 kwargs 매개변수를 사용하여 전달된 내용을 출력할 수 있습니다.

```python
@debugger
def add_numbers(x, y):
    return x + y
add_numbers(7, y=5)  
# 출력: Calling add_numbers with args: (7,) kwargs: {'y': 5}
# add_numbers returned: 12
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

## 03 memoize: 반환 결과 캐시

우리는 코드 베이스에서 특정 코드 조각들의 동작을 거의 변경하지 않습니다. 그러나 이러한 코드들의 반복 실행은 상당한 컴퓨팅 자원을 소비할 수 있습니다. 이 경우 memoize 데코레이터를 사용하여 함수 호출을 캐시할 수 있습니다.

이 시점에서 입력이 동일하면 함수는 한 번만 실행됩니다. 각 후속 실행에서는 결과가 캐시에서 가져옵니다. 따라서 비용이 많이 드는 계산을 항상 수행할 필요가 없습니다.

```js
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args in cache:
            return cache[args]
        else:
            result = func(*args)
            cache[args] = result
            return result
    return wrapper
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

데코레이터는 함수 매개변수와 반환 값을 저장하는 사전(dictionary)을 사용합니다. 이 함수를 실행할 때, 데코레이터는 이전 결과 사전을 확인합니다. 저장된 값이 없을 때만 실제 함수가 호출됩니다.

아래는 피보나치 수 계산 함수입니다. 이 함수는 재귀적으로 작동하므로 동일한 함수가 여러 번 실행됩니다. 그러나 캐싱을 사용하면 이 과정을 빠르게 만들 수 있습니다.

```js
@memoize
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```

이 함수의 실행 시간을 캐시를 사용하거나 사용하지 않을 때 각각 측정한 결과입니다. 캐시된 버전은 실행에 몇 밀리초만 소요되지만, 캐시되지 않은 버전은 거의 1분이 소요됩니다.

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

이전 실행 결과를 저장할 때 사전을 사용하는 것은 간단하고 직관적인 방법입니다. 더 강력한 기능을 제공하기 위해 데이터를 캐시하는 인메모리 데이터베이스인 Redis나 Memcache와 같은 것을 사용할 수 있습니다.

## 04 재시도: 실행 재시도

데이터 과학과 소프트웨어 개발에서는 종종 외부 시스템에 의존하지만 모든 외부 시스템이 신뢰성있는 것은 아닙니다.

예기치 않은 이벤트가 발생할 때 코드가 일정 시간을 기다려 외부 시스템이 복구되기를 기다리고 다시 시도할 수 있기를 원할 수 있습니다.

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

그런 retry 로직을 Python 데코레이터로 구현하는 것이 좋습니다. 이렇게 하면 재시도 동작을 어떤 함수에든 적용할 수 있어요.

```python
import time

def retry(max_attempts, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    print(f"Attempt {attempts} failed: {e}")
                    time.sleep(delay)
            print(f"Function failed after {max_attempts} attempts")
        return wrapper
    return decorator
```

우리는 데코레이터에 대한 다른 래퍼 함수를 정의할 수 있어요. 이전 예제와 유사하게 구현해요. 그러나 이번에는 검증 함수를 입력 변수로 전달하는 대신 max_attempts와 delay와 같은 특정 매개변수를 전달해요.

데코레이터 함수가 호출되면 wrapper 함수가 호출돼요. 이 함수는 시도 횟수(0부터 시작)를 기록하고 while 루프에 진입해요. 루프는 장식된 함수를 실행하려고 시도하고, 성공하면 결과를 즉시 반환해요. 그러나 예외가 발생하면 시도 횟수를 증가시키고, 시도 횟수와 발생한 특정 예외를 나타내는 오류 메시지를 출력해요. 지정된 지연 시간 동안 함수를 다시 시도하기 전에 time.sleep을 사용해요.

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

이 함수를 호출하려면 각 함수 호출 사이의 최대 시도 횟수와 시간 간격(초)을 지정할 수 있습니다.

```js
@retry(max_attempts=3, delay=2)
def fetch_data(url):
    print("데이터를 가져오는 중..")
    # 서버 응답 없음을 모의하기 위해 시간 초과 오류 발생..
    raise TimeoutError("서버가 응답하지 않습니다.")
fetch_data("https://example.com/data")  
# 시도 간격이 2초인 3번 재시도
```

## 05 exception_handler: Graceful Exception Handling

exception_handler는 함수에서 발생한 모든 예외를 잡아 적절히 처리할 수 있습니다.

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

요구 사항에 맞게 래퍼 함수에서 예외 처리를 사용자 정의할 수 있습니다. 예를 들어 예외를 로깅하거나 추가 오류 처리 단계를 수행할 수 있습니다.

```js
def exception_handler(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            # 예외 처리
            print(f"예외가 발생했습니다: {str(e)}")
            # 선택적으로 추가 오류 처리 또는 로깅 수행
            # 필요한 경우 예외를 다시 발생시킵니다.
    return wrapper
```

이것은 우리의 코드를 간소화하고 예외 처리 및 오류 로깅을 처리하는 통합된 절차를 수립하는 데 매우 유용합니다.

```js
@exception_handler
def divide(x, y):
    result = x / y
    return result
divide(10, 0)  
# 출력: 예외가 발생했습니다: division by zero
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

# 요약

![이미지](/TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_2.png)

데코레이터는 함수에 새로운 동작을 쉽게 적용할 수 있는 매우 편리한 방법입니다. 래퍼(wrapper)를 사용하여 복잡한 작업을 간소화하고 코드 가독성을 높이며 생산성을 향상시킬 수 있습니다.

![이미지](/TIL/assets/img/2024-07-12-EssentialforLazyDevelopersFiveEfficientPythonDecorators_3.png)

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

## 👋 만약 이 게시물이 도움이 된다면, 작가를 지원하는 의미로 아래 👏 버튼을 클릭해 주세요 

## 🚀 FAUN 개발자 커뮤니티에 가입하고 매주 이메일로 유사한 이야기를 받아보세요