---
title: "파이썬과 언더스코어 (_)"
description: ""
coverImage: "/assets/img/2024-05-18-Pythonandtheunderscore__0.png"
date: 2024-05-18 21:38
ogImage:
  url: /assets/img/2024-05-18-Pythonandtheunderscore__0.png
tag: Tech
originalTitle: "Python and the underscore (_)"
link: "https://medium.com/towards-data-science/python-and-the-underscore-82d7ce8706d"
isUpdated: true
---

## 파이썬 프로그래밍

![Python Programming](/assets/img/2024-05-18-Pythonandtheunderscore__0.png)

밑줄 문자인 \_는 파이썬 프로그래밍에서 중요한 역할을 하는 경우가 많습니다. 모든 파이썬 개발자는 이 다재다능한 특성을 이해하고 코딩에서 어떻게 효과적으로 밑줄을 활용할지 알아야 합니다. 가독성을 향상시키고 비공개 속성을 관리하는데부터 데이터 처리와 국제화에서 특정 기능을 활용하는 데까지, 밑줄은 단순한 문자가 아니라 파이썬 구문에서 가장 중요한 문자 중 하나로, 파이썬 언어에서 근본적인 도구입니다.

이 기사에서는 파이썬에서 밑줄의 다양한 역할을 분석하며, \_이 파이썬 언어에서 필수적인 문자가 되도록 하는 일반적이고 특수한 사용 사례를 살펴보겠습니다. 초보자든 숙련된 프로그래머든 밑줄의 용도를 이해하면 코딩 기술을 획기적으로 향상시킬 수 있습니다.

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

# 밑줄 사용 사례

## 명명

밑줄의 가장 일반적이고 중요한 사용 사례는 아마도 명명일 것입니다. PEP 8에 따르면,

따라서 밑줄은 함수와 변수 이름에서 단어를 구분하는 데 사용됩니다. 동일한 관례는 메서드 이름과 클래스 인스턴스 변수에도 사용됩니다.

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

파이썬의 관용적인 네이밍 규칙이야. 다양한 프로그래밍 언어에서 사용되는 가장 중요한 네이밍 규칙은 다음과 같아:

- 카멜 케이스 (myVariableName): 첫 번째 단어는 소문자로, 다음 단어의 첫 글자는 대문자로 쓰는 방식. 사용되는 언어: JavaScript, Java, C#, Swift.
- 파스칼 케이스 (MyVariableName): 각 단어의 첫 글자를 대문자로 쓰는 방식. 사용되는 언어: Python(클래스 이름으로), C#, Pascal, Java, C++.
- 스네이크 케이스 (my_variable_name): 단어는 소문자로 쓰고 밑줄로 구분하는 방식. 사용되는 언어: Python(변수와 함수 이름으로), Ruby.
- 대문자 스네이크 케이스 (MY_VARIABLE_NAME): 단어들을 밑줄로 구분하고 모든 글자를 대문자로 쓰는 방식. 사용되는 언어: Python(상수로), C, C++, Java.
- 케밥 케이스 (my-variable-name): 단어는 소문자로 쓰고 하이픈으로 구분하는 방식. 사용되는 곳: URL 및 CSS 클래스 이름.
- 헝가리안 표기법 (iCount, strName): 변수 이름에 타입이나 범위를 나타내는 접두사를 사용하는 방식. 사용되는 곳: 오래된 C 및 C++ 코드.

밑줄을 사용하는 파이썬 변수명의 예시는 다음과 같아:

```python
write_to_database()
read_data()

df_history
df_actual
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

파이썬에서 밑줄은 또다른 역할을 해요. PEP 8에 따르면, 예약된 이름과 충돌하는 이름(예: 인수 이름)을 만들어야 한다면, 이름 끝에 밑줄을 추가할 수 있어요.

흔한 사용 예로는 class*와 type*이 있어요.

밑줄은 상수의 이름에도 사용돼요. 다시 한 번 PEP 8에 따르면:

아래는 상수 이름의 예시 세 가지예요:

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
NO_OF_DAYS;
SIGNIF_LEVEL;
RUN_DEBUGGER;
```

알다시피 밑줄은 Python에서 사용되는 다양한 역할을 합니다. 몇 가지는 다른 것보다 더 중요하지만 — 중요한 점은 Python에서 사용되는 몇 가지 명명 규칙이 밑줄에 매우 의존한다는 것입니다.

그러나 Python 클래스는 일반적으로 밑줄을 사용하지 않습니다. 따라서 book_publisher처럼 클래스를 이름 짓지 않을 것입니다. BookPublisher로 짓겠죠. list나 dict와 같이 잘 알려진 예외가 있긴 하지만, 여러분이 직접 이러한 예외를 만들어서는 안 된다는 뜻입니다.

## Dunder (double underscore, or magic) methods

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

이 역할은 명명과 관련이 있지만, 여기서는 파이썬 언어의 내부 이름에 대해 이야기합니다. 말하는 것은 이른바 매직 메서드의 이름에 많은 언더스코어가 있는 것을 볼 수 있습니다. 이들은 더블 언더스코어(\_\_)로 시작하고 끝나는 특수 메서드들입니다. 더블 언더스코어를 사용하기 때문에 이러한 메서드들은 때로 "던더" 메서드라고도 불립니다 — 던더란 더블 언더스코어의 줄임말입니다.

던더 메서드들은 다양한 파이썬 언어 기능과 구문에서 사용됩니다. 이들의 이름에 있는 더블 언더스코어는 이 메서드들이 특별하다는 것을 나타내는 것이 중요합니다. 이 명명 규칙은 사용자 정의 메서드가 내장 (매직) 메서드를 덮어쓰는 것을 방지합니다.

다음은 파이썬에서 던더 메서드의 몇 가지 예시입니다:

- **init**: 클래스 인스턴스를 생성하는 역할을 합니다.
- **str**: 객체에 사용되는 str() 및 print() 함수의 동작을 정의합니다; 더 자세한 내용은 이 기사를 참조하세요.
- **len**: 컨테이너의 길이를 반환합니다.
- **getitem**: 인덱싱을 허용하고 정의합니다.
- **add**, **mul** 등: 객체가 산술 연산을 지원하도록 합니다.

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

주의해야 할 점은 던더 메소드를 직접 사용해서는 안 되며, 대신 파이썬 인터프리터가 다양한 작업을 실행하는 중에 호출됩니다. 예를 들어, len(x)를 호출하면 파이썬 내부적으로 x.**len**()을 호출합니다. 후자를 사용해서는 안 되지만, 정상적으로 작동합니다:

```js
>>> x = [1, 2, 3]
>>> len(x)
3
>>> x.__len__()
3
```

새로운 사용자 정의 던더 메서드를 정의하지 않는 것이 좋은 습관입니다. 기존 마법 메서드를 덮어쓰거나 사용자 정의 클래스에서 정의하는 것은 괜찮습니다.

## 특수 속성

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

더블 언더스코어로 시작하고 끝나는 메서드를 매직 또는 던더라고 부르지만, 이 네이밍 규칙을 따르는 속성은 일반적으로 특별 속성이라고 불립니다. 파이썬에 의해 자동으로 생성되고 관리되는 이러한 속성들은 객체에 관한 정보를 제공합니다. 몇 가지 예시를 확인해봅시다:

- **name**: 모듈, 클래스, 클래스 메서드 및 함수에서 사용됩니다. (재미있게도, functools.partial을 사용하여 작성된 부분 함수는 이 속성이 없습니다) 객체의 이름을 유지하는 데 사용됩니다.
- **doc**: 모듈, 클래스, 메서드 또는 함수의 독스트링을 보존합니다.
- **file**: 모듈이 로드된 파일의 경로를 저장하는 데 사용됩니다.

## 더미 변수

밑줄은 더미 변수로 사용되는 빈번한 용도로 사용됩니다. 이것은 현재 코드에서 사용되지 않는 변수를 나타내는 이름으로 밑줄을 사용한다는 것을 의미합니다.

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

이런 것은 종종 루프에서 사용되는데, 루핑 변수를 사용하지 않을 때입니다. 다음 상황을 비교해보세요:

루핑 변수를 사용하는 경우:

```js
>>> for i in range(1, 4):
...     print(f"number {i}")
1
2
3
```

루핑 변수를 사용하지 않는 경우:

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
>>> for _ in range(3):
...     print("주마 주마")
주마 주마
주마 주마
주마 주마
```

또한, 객체를 반환하는 함수나 메서드에서 해당 객체를 사용하지 않을 때 밑줄을 사용하는 것이 좋은 습관입니다. 예를 들어 여기서처럼:

```js
def save(obj: Any, path: pathlib.Path) -> bool:
    # 객체가 성공 여부에 관계없이 저장됩니다.
    if not success:
        return False
    return True

_ = save(obj, pathlib.Path("file.csv")
```

여기서는 save()의 출력을 \_에 할당했는데, 이는 코드에서 이 출력을 사용할 필요가 없기 때문입니다. 만약 사용해야 한다면, 다음과 같이 하게 됩니다:

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
저장된 = save(obj, pathlib.Path("file.csv")
```

자주 볼 수 있는 대안은 – 내 생각에는 나쁜 – 사용법이 있습니다. 여기서는 출력이 무시됩니다:

```js
save(obj, pathlib.Path("file.csv")
```

이 접근 방식이 마음에 들지 않는 이유는 save() 함수가 아무것도 반환하지 않는 것처럼 보이기 때문입니다. 함수의 출력을 무시하는 경우는 항상 None을 반환할 때뿐이라고 생각합니다.

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

## 프라이빗 메소드 및 속성 표시

Python에는 OOP에서 진정한 은행 메소드나 속성이 없습니다. 이에 대해 여기에서 읽을 수 있습니다:

그럼에도 불구하고 사용자에게 클래스 메소드나 속성 중 어떤 것을 프라이빗으로 유지하길 원하는지를 알리는 데 언더바(_)를 단일(_) 또는 이중(\_\_)으로 이름 앞에 두고 표시할 수 있습니다. 차이점을 배우려면 위의 기사를 읽어보세요. 이렇게 하면 사용자에게 클래스 외부에서 이러한 메소드나 속성을 사용하지 말아야 한다고 알리는 것과 같습니다. 사용자는 어쨌든 할 수 있지만, 그들에게는 이를 하지 말아야 한다고 알려졌습니다.

다음과 같은 클래스를 고려해보세요:

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

```python
class Me:
    def __init__(self, name, smile=":-D"):
        self.name = name
        self.smile = smile
        self._thoughts = []

    def say(self, what):
        return str(what)

    def _think(self, what):
        self._thoughts += what
```

우리에게는 나를 나타내는 Me 클래스가 있어요. 다음과 같이 나 자신을 만들 수 있어요:

- .name, public 속성 → 당신의 이름은 분명히 공개적이에요
- .smile, public 속성 → 당신의 미소는 외부에서 보여지기 때문에 분명히 공개적이에요
- .\_thoughts, private 속성 → 당신의 생각은 확실하게 비공개적이죠?

두 개의 public 속성은 언더스코어 없이 이름이 지어지고, 유일한 private 속성은 이름이 언더스코어로 시작해요.

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

이제 메서드들을 살펴보겠습니다:

- .say(), 공개 메서드 → 무언가를 말할 때, 사람들이 듣을 수 있습니다.
- .\_think(), 비공개 메서드 → 무언가를 생각할 때, 그것은 개인적인 생각입니다. 만약 크게 말하고 싶다면 공개 .say() 메서드를 사용해야 하지만, 생각을 자신에게 간직하고 싶다면 비공개 \_think() 메서드를 사용해야 합니다.

비밀 생각을 대대로 말할 수 있는 공개 메서드를 만들 수 있습니다:

```js
def say_thought(self, which):
    return self._thoughts[which]
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

## 대화형 세션에서의 마지막 작업

Python 3에서 밑줄은 대화형 세션에서의 마지막 작업 결과를 저장하는데 사용됩니다. 이것은 이전 계산이 이름에 할당되지 않았을 때 새로운 작업에서 이전 작업의 결과를 빠르게 사용하는 데 유용할 수 있습니다. 예를 들어:

```js
>>> 1 + 2
3
>>> _ * 3
9
>>> y = 10
>>> _
9
>>> 100
>>> _
100
```

보시다시피 밑줄은 이름에 할당되지 않은 마지막 작업의 결과만 유지하며, 그것이 계산이 아닌 객체일 경우에도(위 코드 블록의 100처럼) 저장됩니다.

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

## 숫자 값 형식 지정

Python 3.6에서는 밑줄을 사용하여 대형 숫자 값을 더 쉽게 읽을 수 있게 하는 기능이 추가되었습니다. 이 기능은 대형 정수에 특히 유용하지만 부동 소수점 수에도 적용할 수 있습니다. 예를 들어:

```js
>>> x = 1_000_000
>>> x
1000000
>>> 1.009_232_112
1.009232112
>>> 1_021_232.198_231_111
1021232.198231111
```

보통 대형 정수에 많이 사용되지만 밑줄은 소수값의 가독성을 향상시키는 데도 도움이 됩니다. 이러한 방식은 덜 사용되지만 가능합니다.

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

## functools.singledispatch 사용 사례

functools.singledispatch에서 밑줄(\_)은 특정 타입을 처리하기 위한 익명 구현을 나타내기 위해 함수 이름으로 흔히 사용됩니다. 이 스타일 선택은 함수의 이름이 중요하지 않으며, 오히려 함수가 처리하는 타입이 중요하다는 것을 시사합니다. 이 사용법은 네임스페이스를 깨끗하게 유지하는 데 도움이 되며, 로직이 직접 호출을 위한 것이 아니라 singledispatch 메커니즘에 직접 연결되어 있음을 강조합니다. 다음은 PEP 443에서의 예시입니다:

```js
>>> from functools import singledispatch
>>> @singledispatch
... def fun(arg, verbose=False):
...     if verbose:
...         print("Let me just say,", end=" ")
...     print(arg)
>>> @fun.register(int)
... def _(arg, verbose=False):
...     if verbose:
...         print("Strength in numbers, eh?", end=" ")
...     print(arg)
...
>>> @fun.register(list)
... def _(arg, verbose=False):
...     if verbose:
...         print("Enumerate this:")
...     for i, elem in enumerate(arg):
...         print(i, elem)
```

이 설정에서 \_는 해당 타입에 대한 동작을 구현하여 사용되지 않는 함수 이름으로 네임스페이스를 혼란스럽게 만들지 않습니다.

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

위의 코드에 MyPy와 같은 정적 체커를 사용하려면, *를 여러 번 정의하고 있다는 오류가 발생할 수 있다는 점을 알아두세요. 이 문제의 가장 간단한 해결책은 *가 정의된 줄 끝에 # type: ignore 주석을 추가하는 것입니다. 또 다른 방법으로는 현재 *로 호출되는 이러한 함수들을 *로 명명하는 것이 있습니다. 이는 functools.singledispatch에 대한 일반적이지 않은 접근법일 수 있습니다.

## 국제화와 지역화

국제화(일반적으로 i18n으로 약어)와 지역화(약어로 l10n)는 응용프로그램을 다른 언어와 지역에 적응 가능하게 만들어줍니다. 국제화를 통해 응용프로그램은 코드를 수정하지 않고도 다양한 언어와 지역에 적응할 수 있습니다. 반면에 지역화는 국제화된 소프트웨어를 특정 지역이나 언어에 맞게 적응시키는 데 도움을 줍니다. 이는 로케일별 구성 요소 추가 및 텍스트 번역을 통해 이루어집니다.

Python에서는 gettext 모듈을 사용하여 이러한 두 가지 프로세스를 수행할 수 있습니다. 이를 통해 응용프로그램이 여러 언어를 지원할 수 있게 됩니다.

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

gettext에서는 번역할 문자열을 표시하는 gettext 함수에 대한 별명으로 밑줄(\_)을 사용하는 것이 일반적입니다:

```js
>>> import gettext
>>> import locale

로캘을 폴란드어로 설정:
>>> locale.setlocale(locale.LC_ALL, "pl_PL")

.mo 번역 파일의 경로를 설정하고 텍스트 도메인을 선택:
>>> gettext.bindtextdomain(
...     "myapp",
...     "/path/to/my/locale/directory"
... )
>>> gettext.textdomain("myapp")

밑줄은 일반적으로 gettext.gettext의 별명으로 사용됩니다:
>>> _ = gettext.gettext

>>> _("Hello, World!")
Witaj, świecie!
```

여기서 _()은 번역할 텍스트를 감싸 줍니다. 번역이 있는 로캘에서 실행되면 gettext.gettext() 및 따라서 _()가 번역된 문자열을 가져옵니다. 밑줄을 사용하는 것은 단순히 더 간단합니다; 비교해 보세요:

```js
>>> gettext.gettext("Hello, World!")
Witaj, świecie!
>>> _("Hello, World!")
Witaj, świecie!
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

특히 앱이 gettext.gettext 또는 \_을 광범위하게 사용하는 경우에 유용합니다.

## 언패킹 시 값을 무시하는 방법

파이썬에서는 시퀀스를 언패킹할 때 불필요한 값을 무시하기 위해 언더스코어(\_)를 사용할 수 있습니다. 이렇게 하면 코드가 더 깔끔하고 가독성이 높아지며, 코드에서 전혀 사용되지 않는 변수를 정의하지 않아도 됩니다.

따라서 이해할 필요가 없는 값들을 언더스코어(\_)에 할당하여 일회용 변수로 사용할 수 있습니다:

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
>>> a, _, b = (1, 2, 3)
>>> a
1
>>> b
3
```

여기서는 \_ 가 중간 값을 무시하는 데 사용되었습니다 (2).

여러 값이 무시해야 하는 경우, 특히 더 긴 시퀀스의 경우에는 \*\_ 를 사용할 수 있습니다:

```js
>>> a, *_, b = [1, 2, 3, 4, 5]
>>> a
1
>>> b
5
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

리스트의 첫 번째 값과 마지막 값은 각각 a와 b에 할당되었습니다. 다른 값들 — 2, 3, 4 — 은 \* \_에 할당되어 무시되었음을 의미하며 더 이상 사용되지 않을 것입니다.

이렇게 밑줄을 사용하면 코드의 가독성이 향상되어 특정 값들이 사용되지 않고 더 이상 필요하지 않음을 명확히 합니다. 이는 코드와 관련 데이터에 초점을 유지하는 데 도움이 됩니다. 게다가, 이 세 값을 변수에 할당하는데 사용하지 않는다면, 왜 할당해야 할까요? 이는 좋은 코딩 스타일에 어긋날 것입니다.

# 결론

하나의 작은 문자, 간단한 한 줄, 밑줄은 파이썬 프로그래밍에서 굉장히 유용한 문자입니다. 이것은 파이썬 프로그래머에게 꼭 필요한 도구로 사용되는 다양한 용도를 가지고 있습니다. 또한 이것은 파이썬 자체의 중요한 요소이며, 가끔 \_이 무엇을 의미하는지 모른다면 문제를 유발할 수 있으며, 최소한 파이썬 코드를 오해하게 할 수 있습니다.

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

언더스코어의 가장 중요한 사용 사례를 다루었어요. 그러나 덜 중요한 경우 중 일부를 빠뜨렸을 수도 있어요. 그럴 경우에는 댓글로 알려주세요. 어쨌든, 이러한 다양한 사용 사례들로 인해 언더스코어는 파이썬 프로그래밍에서 없어서는 안 될 문자로 자리를 잡았어요. 이 언더스코어는 아마도 이 언어에서 가장 유용한 문자이며, 모든 파이썬 프로그래머는 그 다양한 사용 사례에 익숙해져야 해요.
