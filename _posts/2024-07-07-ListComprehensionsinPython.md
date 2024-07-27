---
title: "파이썬 리스트 내포 쉽게 사용하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-ListComprehensionsinPython_0.png"
date: 2024-07-07 21:31
ogImage:
  url: /assets/img/2024-07-07-ListComprehensionsinPython_0.png
tag: Tech
originalTitle: "List Comprehensions in Python"
link: "https://medium.com/@mmalhotra183/list-comprehensions-in-python-a7284cdb11b4"
---

![이미지](/TIL/assets/img/2024-07-07-ListComprehensionsinPython_0.png)

파이썬은 간결함과 가독성으로 유명하며, 그 중 가장 강력한 기능 중 하나는 리스트 컴프리헨션입니다. 리스트 컴프리헨션은 리스트를 생성하는 간결한 방법을 제공합니다. 이 글에서는 리스트 컴프리헨션을 자세히 살펴보고, 작동 방식을 설명하며, 사용 예시를 통해 그 활용을 설명할 것입니다.

## 리스트 컴프리헨션이란?

리스트 컴프리헨션은 기본적으로 반복문이나 다른 순회 가능한 것들을 작성하거나 표현하는 또 다른 방법입니다. 기존에 있는 리스트나 범위와 같은 순회 가능한 항목 각각에 표현식을 적용하여 새 리스트를 만들고 선택적으로 항목들을 필터링할 수 있습니다.

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

리스트 내포는 보통 for 루프의 "구문 설탕"이라고 생각할 수 있습니다. 그러나 어떤 경우에는 일반적인 루프보다 훨씬 우수한 성능을 발휘할 수 있습니다. 성능 부분에서 자세히 다루겠습니다.

기본 구문:

```js
[표현식 for 항목 in 반복 가능 객체 if 조건]
```

구성 요소:

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

- 표현: 각 항목에 적용되는 작업 또는 필요한 처리
- 항목: 반복 가능한 요소 중 각 요소를 나타내는 변수. 예: i는 for i in range(xyz)에서 항목을 나타냅니다.
- 반복 가능한 요소: 반복되는 항목의 모음 (예: 목록 또는 범위).
- 조건(선택 사항): 특정 항목만 처리하도록 허용하는 필터.

# 기본 예제

## 1. 다른 목록에서 목록 생성

전통적인 For 루프:

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
numbers = [1, 2, 3, 4, 5]
squared_numbers = []
for n in numbers:
    # 숫자를 제곱합니다
    squared_numbers.append(n ** 2)
print(squared_numbers)
# 출력: [1, 4, 9, 16, 25]
```

리스트 컴프리헨션:

```js
numbers = [1, 2, 3, 4, 5]
squared_numbers = [n ** 2 for n in numbers]
print(squared_numbers)
# 출력: [1, 4, 9, 16, 25]
```

이 예제에서 두 가지 방법 모두 동일한 결과를 얻지만, 리스트 컴프리헨션은 보다 간결합니다.

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

## 2. 아이템 필터링

전통적인 for 루프를 사용한 필터링:

```js
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = []
for n in numbers:
    if n % 2 == 0:
        even_numbers.append(n)
print(even_numbers)
# 출력: [2, 4, 6, 8, 10]
```

필터링을 사용한 List Comprehension:

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
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [n for n in numbers if n % 2 == 0]
print(even_numbers)
# Output: [2, 4, 6, 8, 10]
```

여기서 리스트 컴프리헨션은 짝수만 필터링하는 조건을 포함하고 있습니다.

# 고급 예제

## 1. 중첩된 반복문

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

리스트 컴프리헨션이 중첩된 루프를 포함할 수 있습니다. 중첩된 for 루프처럼 동작합니다.

전통적인 중첩된 For 룹:

```js
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
flattened = []
for row in matrix:
    for item in row:
        flattened.append(item)
print(flattened)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

중첩된 루프를 사용한 리스트 컴프리헨션:

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
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
flattened = [item for row in matrix for item in row]
print(flattened)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

이 리스트 컴프리헨션은 2차원 리스트(리스트의 리스트)를 하나의 리스트로 평탄화합니다.

## 2. List Comprehensions에서 함수 사용하기

리스트 컴프리헨션의 식 부분에서 함수를 호출할 수 있습니다.

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

예시:

```js
def square(x):
    return x ** 2
numbers = [1, 2, 3, 4, 5]
squared_numbers = [square(n) for n in numbers]
print(squared_numbers)
# 출력: [1, 4, 9, 16, 25]
```

이 예시는 리스트 컴프리헨션 내에서 사용자 정의 함수를 호출하는 방법을 보여줍니다.

# 성능 비교: 리스트 컴프리헨션 대 반복문

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

컴프리헨션은 동등한 루프보다 최적화된 구현으로 인해 종종 Python에서 더 빠릅니다.

성능 비교 예시:

```python
import time
# 숫자 리스트
numbers = list(range(1000000))

# for 루프 사용
start_time = time.time()
squared_numbers_loop = []
for n in numbers:
    squared_numbers_loop.append(n ** 2)
end_time = time.time()
print("For 루프 시간:", end_time - start_time)

# 리스트 컴프리헨션 사용
start_time = time.time()
squared_numbers_comprehension = [n ** 2 for n in numbers]
end_time = time.time()
print("리스트 컴프리헨션 시간:", end_time - start_time)
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
For 루프 시간: 0.2 초
리스트 내장 시간: 0.1 초
```

이 예에서 리스트 내장은 for 루프보다 훨씬 빠르며 효율성을 입증합니다.

# 리스트 내포의 내부 작동 방식

우리가 알다시피, Python은 기본 C 위에 구축된 해석형 언어입니다. 리스트 내장을 사용할 때 Python은 이를 반복 및 리스트 구성을 효율적으로 처리하는 일련의 바이트 코드 명령으로 변환합니다. append를 반복적으로 호출하는 대신, 리스트 내포는 리스트에 요소를 더하는 작업을 더욱 효율적으로 처리하는 특수화된 바이트 코드를 사용합니다.

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

# 내부 메커니즘

여기서 뜰 속에서 무슨 일이 벌어지는지를 단계별로 설명해 드리겠습니다:

- 바이트 코드 컴파일: 리스트 내포는 바이트 코드로 컴파일되며, 이는 리스트를 생성하고 채우는 특수한 일련의 명령어를 포함합니다.
- 리스트 생성: Python은 빈 리스트를 생성합니다.
- 요소 추가: iterable이 횡단될 때 최적화된 C 함수를 직접 사용하여 append를 호출하는 대신 리스트에 요소를 추가합니다.
- 반복 제어: 루프 제어(다음 항목 가져오고 루프를 계속해야 하는지 확인하는 것)가 이 특수화된 바이트 코드 내에서 효율적으로 처리됩니다.

# 예시 해체

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

차이를 보려면 dis 모듈을 사용하여 전통적인 for 루프와 리스트 내포의 바이트코드를 분해할 수 있습니다.

For Loop Example:

```python
import dis
def for_loop_example():
    numbers = [1, 2, 3, 4, 5]
    squared_numbers = []
    for n in numbers:
        squared_numbers.append(n ** 2)
dis.dis(for_loop_example)
```

For Loop Bytecode Output:

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
  2           0 LOAD_CONST               1 (1)
              2 LOAD_CONST               2 (2)
              4 LOAD_CONST               3 (3)
              6 LOAD_CONST               4 (4)
              8 LOAD_CONST               5 (5)
             10 BUILD_LIST               5
             12 STORE_FAST               0 (numbers)
  3          14 BUILD_LIST               0
             16 STORE_FAST               1 (squared_numbers)
  4          18 LOAD_FAST                0 (numbers)
             20 GET_ITER
        >>   22 FOR_ITER                12 (to 36)
             24 STORE_FAST               2 (n)
  5          26 LOAD_FAST                1 (squared_numbers)
             28 LOAD_METHOD              0 (append)
             30 LOAD_FAST                2 (n)
             32 LOAD_CONST               6 (2)
             34 BINARY_POWER
             36 CALL_METHOD              1
             38 POP_TOP
             40 JUMP_ABSOLUTE           22
        >>   42 LOAD_CONST               0 (None)
             44 RETURN_VALUE
```

리스트 컴프리헨션 예제:

```js
import dis
def list_comprehension_example():
    numbers = [1, 2, 3, 4, 5]
    squared_numbers = [n ** 2 for n in numbers]
dis.dis(list_comprehension_example)
```

리스트 컴프리헨션 바이트코드 출력:

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
특수화된 C 함수
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

효율성은 파이썬 인터프리터 내에서 전문화된 C 함수를 사용함으로써 얻어집니다. 이러한 함수들은 목록 구성과 같은 일반적인 작업을 처리하는 데 등가하는 파이썬 코드보다 훨씬 빠르게 설계되었습니다. 리스트 컴프리헨션을 작성할 때, 파이썬의 바이트코드 컴파일러는 이러한 함수들을 사용하여 메모리 내의 리스트를 직접 조작하여, 메서드 호출 및 루프 제어에 따른 오버헤드를 피할 수 있습니다.

# 리스트 컴프리헨션이 왜 더 빠를까요??

- 오버헤드 감소:

- for 루프: 각 for 루프 반복은 append 메서드와 루프 제어 작업에 따른 반복 호출로 인한 오버헤드가 발생합니다.
- 리스트 컴프리헨션: 반복적인 오버헤드를 피하고 연속된 단일 작업으로 리스트를 구성합니다.

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

2. 최적화된 바이트 코드:

Python 코드가 실행될 때, 먼저 바이트 코드로 컴파일됩니다. 이는 소스 코드의 더 낮은 수준이며 플랫폼에 독립적인 표현입니다. Python 인터프리터(C로 작성됨)가 이 바이트 코드를 실행합니다.

- For 루프: for 루프의 각 반복은 다음 항목을 가져오는 작업, 루프 조건을 확인하는 작업, append 메서드를 반복적으로 호출하는 등 여러 바이트 코드 명령으로 이루어집니다.
- List Comprehensions: 전체 리스트 컴프리헨션은 더 효율적인 일련의 바이트 코드 명령으로 컴파일됩니다. 이러한 명령들은 오버헤드를 최소화하기 위해 최적화되어 있습니다.

3. 인플레이스 생성:

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

- 리스트 컴프리헨션은 리스트를 직접 메모리에 생성하는 반면에 일반 루프는 메소드 호출과 변수 할당과 같은 추가 단계가 필요할 수 있습니다.

## 요약

파이썬의 리스트 컴프리헨션은 리스트를 생성하는 간결하고 가독성이 높으며 효율적인 방법을 제공합니다. 이는 데이터 변환 및 필터링을 포함한 많은 사용 사례에서 전통적인 for 루프를 대체할 수 있습니다. 리스트 컴프리헨션을 효과적으로 이해하고 사용하면 더 우아하고 성능이 좋은 코드를 작성할 수 있습니다.

## 기억해야 할 중요한 사항

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

- 문법: [조건식 for 요소 in 반복가능객체 if 조건문]
- 효율성: 리스트 컴프리헨션은 동등한 for 루프보다 종종 더 빠릅니다.
- 가독성: 코드를 더 간결하고 읽기 쉽게 만듭니다.
- 사용 예: 간단한 변형 및 필터링에 이상적이지만 복잡한 로직의 경우 가독성을 위해 전통적인 루프가 더 적합할 수 있습니다.

리스트 컴프리헨션을 숙달함으로써 더 깔끔하고 빠르며 파이썬다운 코드를 작성할 수 있습니다.

즐거운 코딩 하세요!
