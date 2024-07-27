---
title: "파이썬에서 함수 인터페이스 사용하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-FunctionInterfacesinPython_0.png"
date: 2024-07-09 20:34
ogImage:
  url: /assets/img/2024-07-09-FunctionInterfacesinPython_0.png
tag: Tech
originalTitle: "Function Interfaces in Python"
link: "https://medium.com/towards-data-science/function-interfaces-in-python-4846ede71cd9"
---

## 파이썬 프로그래밍

<img src="/TIL/assets/img/2024-07-09-FunctionInterfacesinPython_0.png" />

파이썬은 다른 프로그래밍 언어에서 흔히 알려진 의미에서의 인터페이스를 제공하지는 않지만, 비슷한 기능을 제공합니다. 전통적인 것들은 추상 베이스 클래스(ABC)로, abc 모듈을 통해 이용할 수 있습니다. 나중에는 타입 힌트와 타입 프로토콜(typing.Protocol)이 추가되었습니다.

추상 베이스 클래스(ABC)와 타입 프로토콜은 다른 프로그래밍 언어에서의 인터페이스와 비슷한 클래스의 구조 및 행동을 정의하는 파이썬의 메커니즘으로 작용합니다. 파이썬 자체는 이 기능을 설명하기 위해 공식적으로 "인터페이스"라는 용어를 사용하지는 않지만, 파이썬의 "프로토콜"이 제공하는 내용과 밀접한 개념입니다. 사실, typing 모듈에 typing.Protocol이 추가되기 전에 파이썬에서 "프로토콜"이라는 용어가 인터페이스를 설명하는 데 사용되었습니다. 따라서 파이썬의 동적 특성은 동적 인터페이스의 생성을 허용하고, 타입 힌트와 타입 프로토콜은 정적 확인 관점에서 인터페이스의 명세를 용이하게 합니다. 이에 대해 이 기사에서 논의하겠습니다.

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

추상 기본 클래스와 타이핑 프로토콜은 주로 사용자 정의 클래스를 만들 때 고려됩니다: 사용자가 특정 구조와 동작을 갖는 클래스를 구현해야 할 때 추상 기본 클래스나 프로토콜을 만들 수 있습니다. ABC(추상 기본 클래스)는 클래스와 함께 작동하지만 타이핑 프로토콜은 ABC가 제공하지 않는 기능 인터페이스를 제공합니다.

파이썬은 원래 함수 인터페이스를 만드는 데 전용 도구를 제공하지 않았습니다. 이는 타입 힌트의 추가로 변경되었고 이제 타입 힌트와 타이핑 프로토콜을 사용해 두 가지 방법으로 함수 인터페이스를 만들 수 있습니다.

파이썬 타입 힌트를 사용하면 함수 매개변수와 반환 값의 예상 타입을 지정할 수 있습니다. 그렇다면 함수 인터페이스는 무엇을 지정할까요? 함수 인터페이스는 함수 매개변수와 반환 값의 예상 타입을 지정하지 않을까요? 이것이 타입 힌트가 있는 함수의 서명은 함수 인터페이스의 한 형태로 간주될 수 있는 이유입니다.

파이썬 타입 힌트는 클래스에 대한 인터페이스 사양에 대한 직접적인 지원은 제공하지 않습니다. 그러므로 함수에 대한 클래스와 함수에 대해 동일한 방식으로 작동하지 않습니다. 따라서 파이썬에서 함수 인터페이스를 이해하기 위해서는 클래스 인터페이스와 다르게 취급할 것을 기억해야 합니다. 이 구분의 중요한 결과는 파이썬에서 클래스 인터페이스를 정의하는 주요 도구인 추상 기본 클래스가 함수 인터페이스를 정의하는 데 직접적으로 적용되지 않는다는 것입니다.

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

이 글은 함수 인터페이스에 대해 논의하고 있어요. Python에서는 함수와 호출 가능한(callable) 객체 간에 명확한 구분이 없다는 것에 주목해주세요. 호출 가능한 객체에 대해 더 알고 싶다면 여기를 참고해보세요:

그러나 함수 인터페이스의 경우, 다양한 호출 가능한 객체가 다르게 작동할 수 있어요. 이에 대해 이 글에서 논의할 거예요.

먼저, 함수 인터페이스가 무엇인지 정의하고 함수가 인터페이스를 구현한다는 것이 무슨 의미인지 알아볼 거에요. 그 다음으로, 타입 힌트와 typing 프로토콜을 사용하여 함수 인터페이스를 생성하는 방법과 이 과정에서 마주칠 수 있는 일반적인 어려움을 살펴볼 거에요. 또한 함수 인터페이스의 간접적인 구현에 대해 이야기할 거예요. 이 과정에서, 함수 인터페이스를 구현하거나 그렇지 못할 때의 전형적인 시나리오를 안내할 거에요. 마지막으로, 주요 포인트를 요약한 결론을 내리겠어요.

# 함수 인터페이스란 무엇인가요?

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

함수 인터페이스는 함수의 기대 서명을 정의합니다: 입력(인수 및 유형) 및 출력(반환 유형).

함수 인터페이스를 만들기 위해서는 프로그래밍 언어가 필요하지 않습니다. 사실, Python이나 다른 언어를 사용해 왔다면, 심지어 이를 인지하지 못했더라도 많은 함수 인터페이스를 생성해 왔을 가능성이 높습니다. 모든 함수를 정의하면 대응하는 인터페이스도 정의한다는 이유 때문입니다. 동일한 서명을 가진 두 함수는 동일한 인터페이스를 구현합니다. 흥미로운 점은 함수가 해야 하는 작업을 설명할 때 우리가 종종 자연어로 함수 인터페이스를 만든다는 것입니다.

예를 들어, 영어로 정의된 함수 인터페이스를 고려해 보겠습니다: 두 개의 실수 인수를 사용하고 실수를 반환하는 함수. 이 설명은 해당 함수의 인터페이스를 효과적으로 영어로 전달합니다.

물론, 이 설명은 Python에서 유효한 함수 인터페이스에 필요한 구문을 사용하지는 않습니다. 이 기사에서는 이러한 개념적 함수 인터페이스를 형식적인 Python 함수 인터페이스로 번역하는 방법을 보여드리겠습니다. 바로 타입 힌트와 타입 프로토콜을 사용하는 것입니다.

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

# 파이썬에서 함수 인터페이스는 어떻게 사용되나요?

그것은 매우 타당한 질문인데, 대답은 매우 간단합니다. 파이썬에서 함수 인터페이스는 타입 힌트로 사용됩니다.

이러한 타입 힌트 — 함수 인터페이스 — 는 특정 위치에서 사용할 수 있는 함수의 종류에 대한 정보 소스로 작용하며, 커스텀 함수인 경우에는 이 함수를 어떻게 구현해야 하는지에 대한 정보를 제공합니다.

함수 인터페이스의 일반적인 사용법을 다음과 같은 주요 측면으로 분해할 수 있습니다:

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

- 문서화. 기능 인터페이스는 함수를 설명하는 가독성 좋은 방법을 제공하여 문서의 품질을 향상시킵니다. 함수의 기대되는 입력 유형과 반환 유형을 명확하게 표시하여 코드의 예상 동작을 이해하는 데 도움이 됩니다. 즉, 구현 세부 사항을 분석하지 않고도 개발자가 코드의 예상 동작을 이해하는 데 도움이 됩니다.
- 코드 가독성. 동일한 이유로, 함수 인터페이스는 함수에 관한 정보의 명확성 덕분에 코드의 가독성을 높입니다.
- 정적 유형 검사. 함수 인터페이스는 유형 힌트이며, 파이썬의 유형 힌트의 가장 중요한 목적은 정적 유형 검사를 용이하게 하는 것입니다. 예를 들어, mypy와 같은 도구를 사용하여 유형과 관련된 오류를 런타임 이전에 감지할 수 있으며, 이는 코드 신뢰성을 향상시키고 버그를 줄입니다.
- 간접 런타임 이점. 이 측면은 직접적으로 앞선 측면과 관련이 있습니다. 함수 인터페이스는 유형 힌트와 유사하게 코드 실행 전에 유형 관련 오류를 식별하는 데 도움이 됩니다. 미리 식별하지 않으면 이러한 오류가 런타임 중 발생할 수 있습니다. 따라서 함수 인터페이스를 사용하면 간접적인 런타임 이득을 얻을 수 있습니다. 이러한 이익은 정적 유형 오류가 코드에 없는 경우에만 발생하며, 유형 힌트가 런타임 성능에 아무런 영향을 미치지 않을 때 간접적이라고 할 수 있습니다.
- 설계 및 아키텍처. 명확하고 가독성 좋은 함수 인터페이스는 코드의 조직을 간단하고 더 읽기 쉽게 만들어 소프트웨어 시스템의 설계와 아키텍처를 향상시키는 데 도움이 됩니다.

# 함수 인터페이스 구현의 필수 요소

함수 인터페이스를 구현한다는 것은 무엇을 의미할까요? 간단히 말해서, 함수 인터페이스를 구현하는 Python 함수는 인터페이스가 정의한 시그니처를 가져야 합니다. 예를 들어, 앞에서 설명한 인터페이스를 고려해보겠습니다. 이 인터페이스를 구현하려면, 함수는 두 개의 인수를 정확히 — 그리고 오직 두 개의 인수만 — 가져야 하며, 이 인수들은 둘 다 부동 소수점수여아 하고 부동 소수점수를 반환해야 합니다. 이러한 함수만이 이 인터페이스를 구현합니다. 따라서 세 개의 부동 소수점수를 인수로 받는 함수가 있다면 이 인터페이스를 구현하지 않습니다.

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

이 글에서는 함수 인터페이스 용어를 사용합니다. 그러나 이미 언급했듯이 Python은 실제적인 관점에서 콜러블(callables)과 함수를 구별하지 않습니다. 기술적으로 클래스¹, 호출 가능 클래스, 함수, 부분 함수 및 익명 함수와 같은 다양한 유형의 콜러블을 만날 수 있습니다. 그러나 이 중 어느 것을 호출하더라도 차이를 알 수 없을 것입니다: 모두 동일한 방식으로 호출됩니다.

그러나 이들에는 차이가 있습니다. 호출 가능 클래스와 함수는 유형 힌트(type hints)를 사용하여 정의할 수 있지만, 부분 함수 및 익명(lambda) 함수는 그렇게 할 수 없습니다. 이러한 타이핑되지 않은 콜러블이 실제로 어떤 인터페이스를 구현할 수 있을까요? 제가 보여드릴 것처럼, 가능합니다 — 그러나 완전히 타입화된 함수와 달리 이들은 간접적으로만 인터페이스를 구현할 수 있습니다.

따라서, 콜러블, 함수, 부분 함수 및 일부 경우에는 람다 함수를 사용하여 동일한 기능을 구현할 수 있습니다. 그러나 인터페이스에 대해 이야기할 때, 일부 콜러블이 다른 콜러블보다 더 나은 결과를 가져오거나 적어도 다르게 작동할 수 있습니다. 이에 대해 더 자세히 알아보겠습니다.

# 타입 힌트를 사용한 함수 인터페이스

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

함수 인터페이스를 구현하는 가장 간단하고 기본적인 방법은 타입 힌트를 사용하는 것입니다. 그러므로 직접 타입 힌트를 사용하거나 필요한 인터페이스를 나타내는 타입 별칭을 생성할 수 있습니다. 타입 별칭은 가독성을 높일 수 있으며, 별칭을 통해 인터페이스에 이름을 부여할 수 있습니다.

우리의 함수 인터페이스에 해당하는 타입 별칭은 다음과 같습니다:

```js
from typing import Callable

ThreeFloatCallable = Callable[[float, float], float]
```

이 타입 힌트를 해석해봅시다: ThreeFloatCallable은 2개의 부동소수점 숫자를 입력으로 받아 부동소수점 숫자를 반환하는 callable입니다. 이것이 바로 우리가 정의하고자 했던 인터페이스입니다.

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

해당 인터페이스를 사용하는 방법은 어떤가요? 예를 들어, 이 인터페이스를 구현하는 함수를 입력으로 받는 다른 함수를 구현할 수 있습니다:

```js
def call_threefloats(
    x: float,
    y: float,
    func: ThreeFloatCallable
) -> float:
    return func(x, y)
```

우리는 ThreeFloatCallable 타입 별칭을 인터페이스로 생성했으나, 이와 같은 타입 별칭 없이도 call_threefloats() 함수를 정의할 수 있습니다:

```js
def call_threefloats(
    x: float,
    y: float,
    func: Callable[[float, float], float]
) -> float:
    return func(x, y)
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

위 두 정의는 함수(기술적으로는 호출될 수 있는 함수)를 예상하며, 다음 인터페이스를 구현하는 함수를 요구합니다: Callable[[float, float], float].

인터페이스가 어떻게 작동하는지 살펴봅시다:

```js
from typing import Callable

ThreeFloatCallable = Callable[[float, float], float]

def call_threefloats(
    x: float,
    y: float,
    func: ThreeFloatCallable
) -> float:
    return func(x, y)

def add(x: float, y: float) -> float:
    return x + y

call_threefloats(1., 1.5, add)
```

함수 add는 ThreeFloatCallable 인터페이스를 구현하므로 mypy는 이 코드에서 문제를 발견하지 않을 것입니다. 그러나 add() 함수를 다음과 같이 변경하세요:

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
def add(x: int, y: float) -> float:
    return x + y

call_threefloats(1, 1.5, add)
```

그리고 mypy는 다음과 같은 오류를 발생시킵니다:

```js
 error: Argument 3 to "call_threefloats" has incompatible
        type "Callable[[int, float], float]";
        expected "Callable[[float, float], float]"  [arg-type]
```

보시는 바와 같이, mypy는 우리가 정의한 형식 별칭(ThreeFloatCallable)을 사용하지 않고 전체 유형을 제공합니다.

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

동일한 함수 인터페이스를 호출 가능한 클래스를 사용하여 구현해 봅시다:

```js
class Adder:
    def __call__(self, x: float, y: float) -> float:
        return x + y

call_threefloats(1, 1.5, Adder())
```

다시 한 번, mypy는 이 코드에서 문제가 없다고 판단할 것입니다. 그러나 주의할 점은 이 Adder 클래스가 ThreeFloatCallable 인터페이스를 구현하고 call_threefloats()에서 사용되는 것이 아니라, 클래스의 인스턴스(여기서는 Adder())임을 알아두어야 합니다. 이 클래스를 사용하는 경우:

```js
call_threefloats(1, 1.5, Adder);
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

다음과 같은 정적 오류가 발생합니다:

```js
에러: "call_threefloats"의 세 번째 인자는 호환되지 않는 타입 "type[Adder]"입니다
       예상되는 타입은 "Callable[[float, float], float]"입니다
       [arg-type]
```

Adder 클래스의 메서드 중 하나인 **call**()만 구현했지만, 필요한 다른 메서드들을 구현할 수 있으며 Adder의 인스턴스는 여전히 ThreeFloatCallable 인터페이스를 구현할 것입니다.

## typing.Callable의 한계

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

typing.Callable 구문은 그 한계가 있습니다. 예를 들어, 두 개의 실수 인자와 추가 선택적 위치 및 키워드 인자를 사용하여 float를 반환하는 함수를 구현해야 할 때 어떻게 해야 할지 어려움이 있습니다.

typing.Callable 구문은 이를 자연스럽게 처리할 수 있는 방법을 제공하지 않습니다. 몇 가지 트릭을 시도해 볼 수는 있지만, 대신 다음 섹션에서 설명하는 typing 프로토콜로 넘어가 보겠습니다.

# typing 프로토콜을 사용한 함수 인터페이스

typing.Protocol을 사용하여 두 개의 함수 인터페이스를 구현해 봅시다. 먼저, 선택적 인자 없이 한 경우부터 시작합니다.

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

from typing import Protocol

class ThreeFloatCallable(Protocol):
def **call**(self, x: float, y: float) -> float:
...

이제 선택적 인수를 사용하는 인터페이스를 구현해 봅시다:

class ThreeFloatCallableWithArgsKwargs(Protocol):
def **call**(
self,
x: float,
y: float,
args: Any,
kwargs: Any
) -> float:
...

이것들은 선택적 인수입니다. 그러나 이 인터페이스를 구현하는 함수는 이러한 선택적 인수를 반드시 가져야 합니다. 따라서 이 함수는 이 인터페이스를 구현합니다:

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
def implements(
    x: float, y: float, *args: Any, **kwargs: Any
) -> float:
    ...
```

하지만 이것들은 그렇지 않습니다:

```js
def implements_not(x: float, y: float) -> float:
    ...

def implements_not_only_args(
    x: float,
    y: float,
    *args: Any
) -> float:
    ...

def implements_not_only_kwargs(
    x: float,
    y: float,
    *kwargs: Any
) -> float:
    ...
```

보는 바와 같이 인터페이스가 정의한 것과 정확히 동일한 서명을 사용해야 합니다: 동일한 수의 인수, 동일한 유형의 인수 및 동일한 반환 값 유형을 가져야 합니다.

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

인수 이름은 중요하지 않습니다. 중요한 것은 유형입니다. 따라서, 다음 두 함수 모두 ThreeFloatCallable 인터페이스를 구현합니다. 첫 번째 함수만 인터페이스와 동일한 인수 이름을 사용하지만 다음 함수도 그것을 구현합니다:

```js
def add(x: float, y: float) -> float:
    return x + y

def add_too(a: float, b: float) -> float:
    return a + b
```

ThreeFloatCallable 인터페이스에 위치 및 키워드 인수가 모두 포함된다면, 이름있는(키워드) 인수만 허용하는 함수는 이 인터페이스를 구현하지 않습니다. 그러므로 mypy는 다음 함수를 허용하지 않습니다:

```js
def add_named(*, x: float, y: float) -> float:
    return x + y
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

다음과 같은 오류 메시지가 표시됩니다:

```js
error: "call_threefloats" 함수의 3번째 인수가 호환되지 않는
       타입 "Callable[[NamedArg(float, 'a'), NamedArg(float, 'b')], float]"입니다;
       예상되는 타입은 "Callable[[float, float], float]"입니다  [arg-type]
```

그러나 함수에 위치-전용 인수가 포함된 경우, mypy에서 오류가 표시되지 않습니다:

```js
def add_a_positional(a: float, /, b: float) -> float:
    return a + b

call_threefloats(1, 1.5, add_a_positional)
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

`add_a_positional()` 함수는 ThreeFloatCallable 인터페이스를 구현합니다. 이 함수에서 a는 위치 전용 인자이지만 b는 위치 지정 또는 이름 지정 모두 가능합니다.

타이핑 프로토콜은 타입 힌트에는 없는 장점이 있습니다: docstring으로 생성할 수 있다는 것입니다. 이것은 인터페이스에 대해 더 긴 설명이 필요할 때 중요할 수 있습니다. 이런 경우에는 인터페이스가 비교적 간단한 경우라도 타이핑 프로토콜을 정의하기로 결정합니다.

## Pylint 오류

typing.Protocol을 사용하여 함수 인터페이스를 생성하고 pylint을 사용하는 경우, 일반적으로 R0903 경고가 발생할 수 있습니다: Too few public methods (x/y), 여기서 x/y의 x와 y는 각각 실제 및 예상하는 공개 메서드 수를 나타냅니다. 이 경고는 클래스가 적절하게 설계되지 않았을 가능성을 제안합니다.

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

그러나, 이 권장 사항은 항상 typing.Protocol의 사용 사례와 일치하지는 않습니다. 함수 인터페이스는 여기에 해당하는 예시입니다: 대부분의 경우에는 **call**이라는 단일 메소드를 정의하고 다른 것은 필요하지 않습니다.

만약 pylint을 사용한다면, 이 경고에 대해 대응하는 것이 좋습니다. 세 가지 가장 흔한 시나리오를 고려해 봅시다:

- 이 경고를 지역적으로 무시할 수도 있습니다. 여기에 프로토콜을 정의하는 코드에서 첫 번째 줄에 # pylint: disable=too-few-public-methods 주석을 추가하여 이를 수행할 수 있습니다. 이 방법은 코드베이스의 다른 부분에서 경고를 유지하면서 이 특정 프로토콜 정의에서는 경고를 숨깁니다:

```python
from typing import Protocol

# pylint: disable=too-few-public-methods

class FloatFloatFloat(Protocol):
    def __call__(self, x: float, y: float) -> float:
        ...

class StrFloatFloat(Protocol):
    def __call__(self, x: str, y: float) -> float:
        ...

class StrFloatStr(Protocol):
    def __call__(self, x: str, y: float) -> str:
        ...

# pylint: enable=too-few-public-methods
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

- 코드의 특정 부분에서이 경고를 억제 할 수 있습니다. 예를 들어 typing.Protocol을 사용하여 여러 함수 인터페이스를 정의하는 곳에서이를 할 수 있습니다.

```python
from typing import Protocol

# pylint: disable=R0903
class Function(Protocol):
    def __call__(self, x: float, y: float) -> float:
        ...
```

- 전체 프로젝트에서이 경고를 억제 할 수도 있습니다. pyproject.toml 파일에서이를 수행하는 방법을 보여 드리겠습니다. 파일에 다음 블록을 추가하기만 하면 됩니다.

```python
[tool.pylint."MESSAGES CONTROL"]
disable = [
    "too-few-public-methods"
]
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

- 마지막으로, 경고 메시지를 전역적으로 무시할 수 있습니다. 이것은 자주 typing.Protocol을 사용하여 함수 인터페이스를 정의할 때 유용할 수 있지만, 주의하십시오. 만약 함수 인터페이스 외의 다른 유형의 인터페이스를 정의할 때에도 typing.Protocol을 사용한다면, 모든 인터페이스에 대해 경고가 무시될 것입니다. .pylintrc 구성 파일에서 [MESSAGES CONTROL] 섹션 아래의 disable 목록에 too-few-public-methods를 추가하여 이를 수행할 수 있습니다:

```js
[MESSAGES CONTROL]
disable=too-few-public-methods,
```

위 예제 모두에서 too-few-public-methods를 해당 코드로 대체할 수 있습니다. 즉, R0903입니다. 그러나 이름을 사용하는 것이 코드를 더 읽기 쉽게 만듭니다.

# 인터페이스의 간접 구현

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

한 번 이상 다음과 같은 문제를 마주쳤습니다. 특정 인터페이스를 인수와 키워드 인수 없이 함수에 제공해야 하는데, 사용하려는 함수는 인수와 키워드 인수를 사용합니다. 어떻게 해야 할까요?

간단한 해결책이 있습니다. 위의 예제를 기반으로 다음 시나리오가 있다고 가정해 봅시다.

```js
from typing import Callable

ThreeFloatCallable = Callable[[float, float], float]

def func_of_squares(
    x: float,
    y: float,
    func: ThreeFloatCallable
) -> float:
    x2 = x*x
    y2 = y*y
    return func(x2, y2)
```

그러나 ThreeFloatCallable로 사용해야 하는 함수의 시그니처가 호환되지 않습니다.

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
def model(
    x: float,
    y: float,
    alpha: float,
    beta: float,
    gamma: float
) -> float:
    x = x/alpha
    y = y/beta
    z = (x + y)**gamma
    return z
```

model() 함수를 func_of_squares() 함수의 func 인자로 직접 사용할 수 없습니다. 왜냐하면 func는 ThreeFloatCallables 인터페이스를 구현하는 호출 가능한 객체를 요구하는 반면 model() 함수는 그렇지 않기 때문입니다.

그러면 model() 함수를 직접 사용할 수 없다면 간접적으로 사용할 수는 있을까요? 그렇다면 주어진 alpha, beta 및 gamma 값에 대해 수행해야 합니다. 예를 들어, 이들을 모두 1.0으로 설정하면 함수는 x와 y의 단순한 합을 반환합니다. 이 세 가지 인수를 고정하면 사실상 두 개의 인수, 즉 x와 y(float 및 float로 더 명확하게)를 받는 수정된 model() 함수를 얻게 됩니다.

이것이 우리가 따를 방향입니다. 일부 인수의 값이 고정된 함수를 부분 함수(partial functions)라고 합니다. 오늘은 이 주제를 자세히 다루지 않겠습니다. 별도의 기사가 필요한 만큼 우리의 작업에 집중합시다.

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

ThreeFloatCallable 타입을 따르는 부분 함수를 만들어야 합니다. 이를 여러 가지 방법으로 할 수 있습니다. 예를 들어, 다음과 같이 래퍼 함수를 정의할 수 있습니다:

```js
def modelwrapper_raw(x: float, y: float) -> float:
    return model(x, y, 1, 1, 1)
```

(이름에 \_raw를 추가한 이유는 이것이 실제로 Python 구문 설탕이 없는 일종의 처음 버전이기 때문입니다.)

modelwrapper_raw() 함수가 ThreeFloatCallable 인터페이스를 구현한다는 것에 유의하세요! 따라서 이 부분 함수를 func_of_squares()에서 사용할 수 있습니다. 이 곳에서 mypy는 오류를 주장하지 않습니다.

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
func_of_squares((x = 1.5), (y = 2.34), (func = modelwrapper_raw()));
```

modelwrapper_raw() 함수는 ThreeFloatCallable 인터페이스를 직접 구현함으로써 model() 함수가 간접적으로 인터페이스를 구현할 수 있도록 도와줍니다.

위에서는 자체 래퍼(wrapper) 함수를 정의했지만, Python은 부분 함수를 생성하기 위한 네이티브 도구를 제공합니다: functiontools.partial. 사용해 봅시다:

```js
from functools import partial

modelwrapper_partial = partial(
    model,
    alpha=1,
    beta=1,
    gamma=1
)
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

`modelwrapper_partial()`은 ThreeFloatCallable 타입의 부분 함수이므로 `func_of_squares()`에서 func로 사용할 수 있습니다. 다시 말하지만, mypy는 불평하지 않을 겁니다:

```js
func_of_squares((x = 1.5), (y = 2.34), (func = modelwrapper_partial));
```

부분 함수(partial function)는 함수를 반환하는 함수입니다. `functools.partial`을 사용할 때, 보다 정확히는 부분 함수가 반환됩니다:

```js
>>> type(model)
<class 'function'>
>>> type(modelwrapper_raw)
<class 'function'>
>>> type(modelwrapper_partial)
<class 'functools.partial'>
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

동일한 방식으로 mypy가 람다 문을 사용하여 생성된 다음 함수에 대해 불평하지 않을 것입니다:

```js
modelwrapper_lambda = lambda x, y: model(x, y, 1, 1, 1)
```

이것은 부분 함수를 만드는 또 다른 예입니다. 그러나 이 코드는 lambda 함수가 익명 함수이기 때문에 이름을 사용하는 것이 좋지 않다는 이유로 좋은 코드가 아닙니다. 이것은 분명히 파이썬스러운 코드가 아닙니다. 다시 말해 이디오매틱하지 않은 코드입니다.

재미있게도 functools.partial이나 익명 (람다) 함수를 사용하여 만든 부분 함수는 타입 힌트를 가지지 않습니다. 특히 부분 함수는 주석을 상속하지 않으며, 따라서 본래 부분화할 함수인 foo에 주석이 달린 경우에도 **annotations** 속성이 비어 있습니다. 하지만 functools.partial(foo, ...)는 **annotations** 속성을 전혀 갖지 않을 것입니다.

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

그래서 정적 체커는 왜 에러를 발생시키지 않을까요? 왜 부분 함수가 어노테이션이 없어도 인터페이스를 구현할 수 있을까요?

이와 같은 상황에서 정적 분석 중에, mypy와 같은 타입 체커는 functools.partial 함수가 원본 함수를 어떻게 변경하는지 분석하여 타입을 추론합니다. 이러한 추론을 통해 mypy는 **annotations** 속성이 없어도도 부분 객체에 원본 함수의 타입 힌트를 적용할 수 있습니다.

modelwrapper_lambda()에서도 비슷한 상황을 볼 수 있습니다: **annotations** 속성이 있지만 비어 있습니다:

```js
>>> modelwrapper_lambda = lambda x, y: model(x, y, 1, 1, 1)
>>> type(modelwrapper_lambda)
<class 'function'>
>>> modelwrapper_lambda.__annotations__
{}
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

하지만 여러분들이 원하는 방식으로 사용해야 하는 함수가 필요한 인터페이스를 구현하지 않을 때 유용한 해결책을 이 섹션에서 제시하고 있습니다. 이 해결책은 간단하며 이런 시나리오에서 대부분의 경우에 충분합니다.

# 동적 함수 인터페이스

타입 힌트는 Python 3.5에서 PEP 484의 일부로 소개되었습니다. 그 이후로 Python 타입 힌트 시스템은 크게 개선되었으며, 각 새로운 Python 버전에서 타입 힌트에 중요한 변화가 도입되고 있습니다.

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

하지만 맨 처음부터 Python이 동적 프로그래밍 언어로 개발된 것을 잊어서는 안 됩니다.

사실, Python의 동적 특성은 동적 인터페이스와 잘 어울립니다. 이는 함수가 동적으로 인터페이스를 만족시키면 해당 인터페이스를 구현한다는 것을 의미합니다. 이를 작동하게 하기 위해 타입 힌트가 필요하지 않습니다:

```python
def call_threefloats(x, y, func):
    return func(x, y)

def add(x, y):
    return x + y

call_threefloats(1.1, 1.4, add)
```

동적으로 이 코드는 완벽하게 작동할 것입니다. 왜냐하면 add() 함수가 func 인자의 인터페이스를 구현하기 때문입니다. 그러나 아래 코드 또한 동적으로 작동할 것입니다:

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

```python
def add_and_do_sth(x, y, *args, **kwargs):
    # *args 와 **kwargs를 사용하여 작업 수행
    return x + y

call_threefloats(1.1, 1.4, add_and_do_sth)
```

이 동작은 call_threefloats()가 args와 kwargs를 제공하지 않고 add_and_do_sth()를 호출하기 때문에 작동합니다. 그래서 add_and_do_sth()는 동적으로 func의 인터페이스를 구현한다고 말할 수 있습니다. 다만 args와 kwargs는 제공되지 않을 때에만 해당됩니다. 이는 이전에 부분 함수를 다룰 때 다룬 상황과 매우 유사합니다. 그때와 마찬가지로 args와 kwargs를 고정하지만 그들의 값을 제공하지는 않습니다. 즉, 그들을 아무 값도 고정한다고 볼 수 있습니다.

간단히 말해서, Python은 주석 없이도 함수 인터페이스를 사용합니다. 이 글은 파이썬의 동적 성격에 대한 논의를 목적으로 하지는 않습니다. 그러나 이 주제에 관심이 있다면 — 모든 Pythonista가 그렇기 때문에 — 예를 들어, 위에서 인용한 글을 참조해보세요.

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

함수 인터페이스는 함수를 일급 시민으로 다룰 때 특히 유용합니다. 그래서 매개변수로 전달하거나 함수와 메서드에서 반환되고, 심지어 수정되거나 삭제될 수 있는 다른 객체들처럼 사용됩니다. 그러나 함수 인터페이스는 코드 개발자와 코드 사용자 모두에게 도움이 되는 더 넓은 주제라는 것을 이해하셨죠.

우리는 함수 인터페이스를 생성하는 두 가지 방법을 다루었습니다:

- 타입 힌트
- 타입 프로토콜

이들이 어떻게 작동하는지 보여주는 것 외에도, 우리는 다음 질문에 대한 답변을 원했습니다: Python에서 함수 인터페이스를 정의하기 위해 타입 힌트를 사용해야 할까요, 아니면 타입 프로토콜을 사용해야 할까요?

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

죄송하지만 단 하나의 정답만 제공할 수는 없습니다. 선택할 메소드는 두 가지에 달려있어요: 만들어야 하는 인터페이스의 간단함과 당신의 선호도에 따라 달라져요.

간단한 시나리오에서는 타입 힌트를 선호해요. 특히, 타입 힌트를 타입 별칭 아래에 유지하면 코드가 매우 가독성 있게 될 수 있어요, 오늘 사용한 예제처럼요:

```js
from typing import Callable

ThreeFloatCallable = Callable[[float, float], float]
```

이 코드는 명확해요. 하지만 복잡한 인터페이스는 가독성이 떨어질 수 있어요. Python 문서에서 가져온 다음 예제를 살펴봅시다:

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

![Function Interfaces in Python](/TIL/assets/img/2024-07-09-FunctionInterfacesinPython_1.png)

'broadcast_message()' 함수의 시그니처를 만들어봅시다. 이 시그니처는 broadcast_message()대신 사용될 함수들의 인터페이스 역할을 할 수 있습니다:

```python
from collections.abc import Sequence
from typing import Callable

ConnectionOptions = dict[str, str]
Address = tuple[str, int]
Server = tuple[Address, ConnectionOptions]

BroadCastFunction = Callable[[str, Sequence[Server]], None]
```

또는, 타입 별칭을 사용하지 않는 경우:

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

BroadCastFunction = Callable[
[str,
Sequence[tuple[tuple[str, int],
dict[str, str]]]],
None]
]

Let’s see what it would look like when using typing.Protocol:

from typing import Protocol, Sequence

ConnectionOptions = dict[str, str]
Address = tuple[str, int]
Server = tuple[Address, ConnectionOptions]

class BroadcastMessage(Protocol):
def **call**(
self,
message: str,
servers: Sequence[Server]
) -> None:
...

or

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
from typing import Protocol, Sequence

class BroadcastMessage(Protocol):
    def __call__(
        self,
        message: str,
        servers: Sequence[
                     tuple[tuple[str, int],
                     dict[str, str]]
                 ]
    ) -> None:
        ...
```

솔직히 말하자면, 이렇게 복잡한 유형의 경우에도 타입 힌트는 대응하는 typing 프로토콜보다는 더 간단한 인터페이스라고 생각해요. 그러나 양쪽 모두 타입 별칭을 사용하는 것이 차이를 만들어 냅니다.

하지만 타입 힌트만으로는 충분하지 않은 상황도 있을 수 있어요. 그럴 경우 타이핑 프로토콜을 사용할 수밖에 없어요. 이렇게 되는 가장 일반적인 시나리오는 타입 힌트에 가변 위치 및 키워드 인수 (\*args 및 \*\*kwargs)를 포함해야 하는 경우에요. 이때 typing.Protocol을 사용해야 합니다. 왜냐하면 후자는 이러한 선택적 인수를 직접 지정할 수 없기 때문이에요.

이것은 비교적 자주 발생하는 시나리오이지만, 타입 힌트를 사용할 수 없거나 (명확성을 위해서든지) 사용하고 싶지 않은 상황이 더 많을 수 있어요. 이러한 상황의 예시는 아래와 같아요:

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

- 입력 유형에 따라 반환 유형 지정
- 인터페이스에 추가 함수 속성 포함
- 여러 인터페이스를 하나의 함수 인터페이스 내에서 결합
- 입력 유형에 따라 함수의 반환 값 유형 변경

또한 우리가 논의했던 대로, 인터페이스를 설명할 때 typing.Protocol을 사용하면 독스트링을 사용할 수 있는 큰 장점이 있습니다.

이 글을 쓸 때의 주요 목표는 함수 인터페이스에 대해 Python에서 생각하고 의식적으로 사용할 가치가 있다는 것을 설득하는 것이었습니다. 이것은 프로그래밍 중에뿐만 아니라 문제를 개념화하는 동안에도 매우 유용한 도구입니다. 함수를 정의하면서 인터페이스를 생성하게 되는데, 함수의 시그니처로 작용하는 이 인터페이스를 구현하는 함수를 만듭니다.

Python에서 함수 인터페이스는 함수를 일급 시민으로 다루기 시작할 때 특히 중요해집니다. 일반적으로 함수를 인수로 전달하거나 다른 함수에서 반환할 때 이렇게 합니다. 데코레이터 및 다른 클로저를 포함한 예가 있습니다. 그런 다음 함수 인터페이스가 중요해지는데, 이를 통해 함수의 입력 및 출력 값을 정확히 정의할 수 있습니다. 솔직히 말해서, 이러한 인터페이스는 함수의 동작을 정의하지 않고, 그렇게 하지 않아야 합니다. 그러나 이러한 함수를 호출하는 방법 및 반환 값 처리 방법을 명시하므로 함수 인터페이스가 정확히 지정해야 하는 내용입니다.

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

Markdown 형식으로 테이블 태그를 변경합니다.

The typing.Callable syntax is much richer than we’ve discussed today. It’s such a rich topic that we’ll cover it some other day, in a dedicated article. This article aimed to explain the meaning of function interfaces and their basic use cases.

# Footnotes

¹ 기술적으로 모든 클래스는 호출 가능한 것이기 때문에 클래스를 호출하여 인스턴스를 생성합니다. 그러나 파이썬 클래스가 호출 가능하다고 말할 때는 보통 클래스가 호출 가능한 인스턴스를 가지고 있다는 것을 의미합니다. 이 차이는 대부분의 파이썬 초보자와 많은 중급 사용자에게는 널리 인식되지 않습니다. 보다 깊은 이해를 위해 이 기사를 읽어보시기 바랍니다.
