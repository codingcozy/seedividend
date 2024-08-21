---
title: "파이썬 코드 속도를 높이는 8가지 팁"
description: ""
coverImage: "/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_0.png"
date: 2024-06-23 13:29
ogImage:
  url: /assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_0.png
tag: Tech
originalTitle: "8 Tips to Speed Up Your Python Code"
link: "https://medium.com/python-in-plain-english/8-tips-to-speed-up-your-python-code-e8df2d027f35"
isUpdated: true
---

![image](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_0.png)

파이썬은 C/C++와 같은 컴파일된 언어와 비교했을 때 효율성과 성능 면에서 몇 가지 단점을 가지고 있는 스크립팅 언어입니다. 그러나 파이썬의 효율성이 상상 이상으로 과장되지 않는 경우가 많습니다. 이 기사는 파이썬 코드의 실행 속도를 높이는 몇 가지 팁을 요약한 것입니다.

# 0 코드 최적화 원칙

![image](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_1.png)

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

이 기사는 Python 코드 실행 속도를 높이는 여러 기술을 소개할 것입니다. 코드 최적화의 세부 사항에 들어가기 전에 코드 최적화의 기본 원칙 몇 가지를 이해해야 합니다.

첫 번째 기본 규칙은 너절로 최적화하지 말아야 한다는 것입니다. 많은 사람들이 성능 최적화를 목표로 코드를 작성하기 시작합니다. "올바른 프로그램을 더 빠르게 만드는 것은 빠른 프로그램을 올바르게 만드는 것보다 훨씬 쉽습니다." 따라서 최적화의 선행 조건은 코드가 제대로 작동해야 한다는 것입니다. 조기 최적화는 종합적 성능 지표를 파악하는 것을 무시할 수 있습니다. 전역 결과를 얻기 전에 우선순위를 바꾸지 마세요.

두 번째 기본 원칙은 최적화 비용을 따져보는 것입니다. 최적화에는 비용이 발생하며 모든 성능 문제를 해결하는 것은 거의 불가능합니다. 선택해야 하는 것은 일반적으로 공간에 대한 시간 또는 시간에 대한 공간입니다. 또한, 개발 비용도 고려해야 합니다.

세 번째 원칙은 중요하지 않은 부분을 최적화하지 말아야 한다는 것입니다. 코드의 모든 부분을 최적화하려고 한다면 이러한 변경으로 코드가 읽고 이해하기 어려워질 수 있습니다. 코드가 느리게 실행된다면, 코드가 느린 부분을 찾아보고 보통 내부 루프에 해당하는 부분에 중점을 두어 최적화를 집중하세요. 그 외의 부분은 약간의 시간 손실이 큰 차이를 만들지 않습니다.

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

# 1 전역 변수 피하기

```js
# 비권장. 소요 시간: 26.8 초
import math

size = 10000
for x in range(size):
    for y in range(size):
        z = math.sqrt(x) + math.sqrt(y)
```

많은 프로그래머들은 파이썬에서 간단한 스크립트를 작성할 때 시작합니다. 스크립트를 작성할 때 일반적으로 위 코드와 같이 전역 변수로 직접 작성하는 습관이 있습니다. 그러나 전역 변수와 지역 변수의 구현 방식이 다르기 때문에 전역 범위에 정의된 코드는 함수에 정의된 코드보다 훨씬 느리게 실행됩니다. 스크립트 문장을 함수로 넣음으로써 일반적으로 15% ~ 30%의 속도 향상을 얻을 수 있습니다.

```js
# 권장. 소요 시간: 20.6 초
def main():
    size = 10000
    for x in range(size):
        for y in range(size):
            z = math.sqrt(x) + math.sqrt(y)

main()
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

# 2. 점 피하기

![image](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_2.png)

## 2.1 모듈 및 함수 속성 접근 피하기

```python
# 권장되지 않음. 실행 시간: 14.5 초
import math

def computeSqrt(size: int):
    result = []
    for i in range(size):
        result.append(math.sqrt(i))
    return result

def main():
    size = 10000
    for _ in range(size):
        result = computeSqrt(size)

main()
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

각각 . (속성 액세스 연산자)을 사용할 때 특정 메서드인 **getattribute**() 및 **getattr**()이 트리거됩니다. 이러한 메서드는 사전 작업을 수행하므로 추가 시간 소요가 발생할 수 있습니다. 속성 액세스는 from import 문을 통해 제거할 수 있습니다.

```js
from math import sqrt

def computeSqrt(size: int):
    result = []
    for i in range(size):
        result.append(sqrt(i))
    return result

def main():
    size = 10000
    for _ in range(size):
        result = computeSqrt(size)

main()
```

제1 섹션에서 전역 변수보다 로컬 변수의 검색이 빠를 것이라고 언급했습니다. 때문에 빈번하게 액세스되는 변수 sqrt에 대해 이를 로컬 변수로 변경함으로써 작업을 가속화할 수 있습니다.

```js
import math

def computeSqrt(size: int):
    result = []
    sqrt = math.sqrt
    for i in range(size):
        result.append(sqrt(i))
    return result

def main():
    size = 10000
    for _ in range(size):
        result = computeSqrt(size)

main()
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

수학.sqrt 외에도 computeSqrt 함수에는 리스트의 append 메소드를 호출하는 .이 있습니다. 이 메소드를 지역 변수에 할당하여 computeSqrt 함수의 for 루프 내부에서의 . 사용을 완전히 제거할 수 있습니다.

```js
# 권장됨. 시간 소요: 7.9초
import math

def computeSqrt(size: int):
    result = []
    append = result.append
    sqrt = math.sqrt
    for i in range(size):
        append(sqrt(i))
    return result

def main():
    size = 10000
    for _ in range(size):
        result = computeSqrt(size)

main()
```

## 2.2 내부 속성 접근 피하기

```js
# 비권장. 시간 소요: 10.4초
import math
from typing import List

class DemoClass:
    def __init__(self, value: int):
        self._value = value

    def computeSqrt(self, size: int) -> List[float]:
        result = []
        append = result.append
        sqrt = math.sqrt
        for _ in range(size):
            append(sqrt(self._value))
        return result

def main():
    size = 10000
    for _ in range(size):
        demo_instance = DemoClass(size)
        result = demo_instance.computeSqrt(size)

main()
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

`.table` 태그를 Markdown 형식으로 변경하세요.

```js
| Recommended | Cost time: 8.3 seconds |
|--------------|-----------------------|
| import math | |
| from typing import List | |
| |
| class DemoClass: | |
|&nbsp;&nbsp;def __init__(self, value: int): | |
|&nbsp;&nbsp;&nbsp;&nbsp;self._value = value | |
| |
|&nbsp;&nbsp;def computeSqrt(self, size: int) -> List[float]: | |
|&nbsp;&nbsp;&nbsp;&nbsp;result = [] | |
|&nbsp;&nbsp;&nbsp;&nbsp;append = result.append | |
|&nbsp;&nbsp;&nbsp;&nbsp;sqrt = math.sqrt | |
|&nbsp;&nbsp;&nbsp;&nbsp;value = self._value | |
|&nbsp;&nbsp;&nbsp;&nbsp;for _ in range(size): | |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;append(sqrt(value)) | |
|&nbsp;&nbsp;return result | |
| |
| def main(): | |
|&nbsp;&nbsp;size = 10000 | |
|&nbsp;&nbsp;for _ in range(size): | |
|&nbsp;&nbsp;&nbsp;&nbsp;demo_instance = DemoClass(size) | |
|&nbsp;&nbsp;&nbsp;&nbsp;demo_instance.computeSqrt(size) | |
| main() | |
```

# 3 불필요한 추상화 피하기

```js
| Not recommended | Cost time: 0.55 seconds |
|-----------------|------------------------|
| class DemoClass: | |
|&nbsp;&nbsp;def __init__(self, value: int): | |
|&nbsp;&nbsp;&nbsp;&nbsp;self.value = value | |
| |
|&nbsp;&nbsp;@property | |
|&nbsp;&nbsp;def value(self) -> int: | |
|&nbsp;&nbsp;&nbsp;&nbsp;return self._value | |
|&nbsp;&nbsp;@value.setter | |
|&nbsp;&nbsp;def value(self, x: int): | |
|&nbsp;&nbsp;&nbsp;&nbsp;self._value = x | |
| |
| def main(): | |
|&nbsp;&nbsp;size = 1000000 | |
|&nbsp;&nbsp;for i in range(size): | |
|&nbsp;&nbsp;&nbsp;&nbsp;demo_instance = DemoClass(size) | |
|&nbsp;&nbsp;&nbsp;&nbsp;value = demo_instance.value | |
|&nbsp;&nbsp;&nbsp;&nbsp;demo_instance.value = i | |
| main() | |
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

추가 계층으로 코드를 래핑할 때 (데코레이터, 프로퍼티 액세스, 디스크립터와 같은), 코드 실행 속도가 느려질 수 있습니다. 대부분의 경우, 프로퍼티 액세스 사용 정의를 다시 검토하는 것이 필요합니다. 프로퍼티 액세서를 사용할 때 getter/setter 함수를 사용하는 것은 일반적으로 C/C++ 프로그래머가 남긴 코딩 스타일입니다. 꼭 필요하지 않은 경우, 간단한 속성을 사용해보세요.

```js
# 추천하는 방법. 실행 시간: 0.33 초
class DemoClass:
    def __init__(self, value: int):
        self.value = value

def main():
    size = 1000000
    for i in range(size):
        demo_instance = DemoClass(size)
        value = demo_instance.value
        demo_instance.value = i

main()
```

# 4 데이터 복사 피하기

![image](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_3.png)

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

## 4.1 무의미한 데이터 복사 피하기

```js
# 권장하지 않습니다. 시간 소요: 6.5 초
def main():
    size = 10000
    for _ in range(size):
        value = range(size)
        value_list = [x for x in value]
        square_list = [x * x for x in value_list]

main()
```

위 코드에서 value_list는 완전히 불필요하며 불필요한 데이터 구조 또는 복사를 생성할 것입니다.

```js
# 권장합니다. 시간 소요: 4.8 초
def main():
    size = 10000
    for _ in range(size):
        value = range(size)
        square_list = [x * x for x in value]

main()
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

또 다른 상황은 Python의 데이터 공유 메커니즘에 대해 지나치게 걱정하고 있거나 Python의 메모리 모델을 충분히 이해하거나 신뢰하지 않아 copy.deepcopy()와 같은 함수를 남용하는 경우입니다. 일반적으로 이러한 코드에서는 복사 작업을 제거할 수 있습니다.

## 4.2 값을 교환할 때 중간 변수를 사용하지 마세요

```js
# 권장되지 않음. 소요 시간: 0.07초
def main():
    size = 1000000
    for _ in range(size):
        a = 3
        b = 5
        temp = a
        a = b
        b = temp

main()
```

위 코드는 값을 교환할 때 임시 변수 temp를 생성합니다. 중간 변수의 도움 없이 코드는 더 간결하고 빨리 실행됩니다.

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

```js
# 권장됨. 시간 소요: 0.06 초
def main():
    size = 1000000
    for _ in range(size):
        a = 3
        b = 5
        a, b = b, a

main()
```

# 5 if 조건문의 단락회로 기능 사용하기

```js
# 권장되지 않음. 시간 소요: 0.05 초
from typing import List

def concatString(string_list: List[str]) -> str:
    abbreviations = {'cf.', 'e.g.', 'ex.', 'etc.', 'flg.', 'i.e.', 'Mr.', 'vs.'}
    abbr_count = 0
    result = ''
    for str_i in string_list:
        if str_i in abbreviations:
            result += str_i
    return result

def main():
    for _ in range(10000):
        string_list = ['Mr.', 'Hat', 'is', 'Chasing', 'the', 'black', 'cat', '.']
        result = concatString(string_list)

main()
```

if 조건문의 단락회로 특성은 if a and b와 같은 문장에서 a가 False인 경우 직접 반환되어 b가 계산되지 않고, if a or b와 같은 문장에서 a가 True인 경우 직접 반환되어 b가 더 이상 계산되지 않는 것을 의미합니다. 따라서 실행 시간을 절약하기 위해 or 문에서는 더 높은 확률로 True인 변수가 or 앞에 나와야 하며, and는 뒤로 미루어져야 합니다.

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

```js
# 권장사항. 시간 소요: 0.03 초
from typing import List

def concatString(string_list: List[str]) -> str:
    abbreviations = {'cf.', 'e.g.', 'ex.', 'etc.', 'flg.', 'i.e.', 'Mr.', 'vs.'}
    abbr_count = 0
    result = ''
    for str_i in string_list:
        if str_i[-1] == '.' and str_i in abbreviations:
            result += str_i
    return result

def main():
    for _ in range(10000):
        string_list = ['Mr.', 'Hat', 'is', 'Chasing', 'the', 'black', 'cat', '.']
        result = concatString(string_list)

main()
```

# 6 루프 최적화

![이미지](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_4.png)

## 6.1 `while` 루프 대신 `for` 루프 사용하기

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

```js
# 비추천합니다. 소요 시간: 6.7 초
def computeSum(size: int) -> int:
    sum_ = 0
    i = 0
    while i < size:
        sum_ += i
        i += 1
    return sum_

def main():
    size = 10000
    for _ in range(size):
        sum_ = computeSum(size)

main()
```

파이썬의 `for` 루프가 `while` 루프보다 빠릅니다.

```js
# 추천합니다. 소요 시간: 4.3 초
def computeSum(size: int) -> int:
    sum_ = 0
    for i in range(size):
        sum_ += i
    return sum_

def main():
    size = 10000
    for _ in range(size):
        sum_ = computeSum(size)

main()
```

## 6.2 명시적 `for` 루프 대신 암시적 `for` 루프 사용하기

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

위의 예제에서는 명시적인 for 루프 대신 함축적인 for 루프를 사용할 수 있습니다.

```js
# 권장됨. 소요 시간: 1.7 초
def computeSum(size: int) -> int:
    return sum(range(size))def main():
    size = 10000
    for _ in range(size):
        sum = computeSum(size)

main()
```

## 6.3 내부 `for` 루프의 계산 감소

```js
# 권장되지 않음. 소요 시간: 12.8 초
import math

def main():
    size = 10000
    sqrt = math.sqrt
    for x in range(size):
        for y in range(size):
            z = sqrt(x) + sqrt(y)

main()
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

위의 코드에서 `sqrt(x)`은 for 루프 내에 있으며 각 훈련 과정마다 다시 계산되어 시간을 많이 소비합니다.

```js
# 권장됨. 소요 시간: 7초
import math

def main():
    size = 10000
    sqrt = math.sqrt
    for x in range(size):
        sqrt_x = sqrt(x)
        for y in range(size):
            z = sqrt_x + sqrt(y)

main()
```

# 7 numba.jit 사용

위에서 소개한 예시를 따라 numba.jit을 사용합니다. numba는 Python 함수를 JIT 컴파일하여 기계 코드로 변환하여 코드 실행 속도를 크게 향상시킵니다. numba에 대한 자세한 정보는 아래 홈페이지를 참조하세요: [http://numba.pydata.org/numba.pydata.org](http://numba.pydata.org/numba.pydata.org).

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

```js
# 추천. 소요 시간: 0.62 초
import numba

@numba.jit
def computeSum(size: float) -> int:
    sum = 0
    for i in range(size):
        sum += i
    return sum

def main():
    size = 10000
    for _ in range(size):
        sum = computeSum(size)

main()
```

# 8. 적절한 데이터 구조 선택하기

![image](/assets/img/2024-06-23-8TipstoSpeedUpYourPythonCode_5.png)

파이썬의 내장 데이터 구조인 str, tuple, list, set, dict은 모두 C 언어로 최하위 수준에서 구현되어 매우 빠릅니다. 성능 측면에서 내장 속도를 달성하기 위해 스스로 새로운 데이터 구조를 구현하는 것은 거의 불가능합니다.

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

List는 C++의 std::vector과 유사하며, 동적 배열이다. 일정량의 메모리 공간을 미리 할당한다. 미리 할당된 메모리 공간이 사용되고 요소가 추가될 때, 더 큰 메모리 공간이 적용된다. 그럼 기존 요소를 모두 복사하고 이전 메모리 공간을 파괴하며 새 요소를 삽입한다.

요소를 삭제할 때도 유사하다. 사용된 메모리 공간이 미리 할당된 메모리 공간의 절반보다 작으면 추가적인 작은 메모리가 적용되고, 요소 복사가 이루어진 뒤 큰 원래 메모리 공간이 파괴된다.

따라서, 자주 추가 및 삭제 작업이 이뤄지고 추가 및 삭제된 요소의 수가 많은 경우, 리스트의 효율성은 높지 않을 수 있다. 이때 collections.deque를 사용하는 것을 고려해야 한다. collections.deque는 스택과 큐의 특성을 모두 가지며, 양쪽 끝에서 O(1) 복잡도의 삽입 및 삭제 작업을 수행할 수 있다.

리스트 검색 작업도 매우 시간이 소요된다. 리스트에서 특정 요소를 자주 검색하거나 순서대로 이러한 요소에 자주 액세스해야 하는 경우, bisect를 사용하여 리스트 객체의 순서를 유지하고 검색 효율성을 향상시킬 수 있는 이진 검색을 수행할 수 있다.

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

자주 필요한 요구사항은 최솟값 또는 최댓값을 찾는 것입니다. 이 경우 heapq 모듈을 사용하여 리스트를 힙으로 변환하여 최솟값을 얻는 시간 복잡도를 O(1)로 만들 수 있습니다.

다음 웹 페이지에는 일반적으로 사용되는 Python 데이터 구조의 다양한 작업의 시간 복잡도가 나와 있습니다: [Python Time Complexity](https://wiki.python.org/moin/TimeComplexity).

참고:

- David Beazley & Brian K. Jones. Python Cookbook, Third edition. O’Reilly Media, ISBN: 9781449340377, 2013.

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

# 간단한 영어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 박수로 응원하고 팔로우해주세요! 👏
- 저희를 팔로우해 주세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼도 방문해 주세요: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠에 대해 걱정할 필요 없는 블로그 플랫폼이 필요하시다구요? Differ를 시도해보세요.
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요.
