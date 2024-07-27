---
title: "와 를 사용해서 Python 함수 파라미터를 깔끔하게 정리하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-UseandtoMakeYourPythonFunctionParametersLookNeater_0.png"
date: 2024-07-13 19:03
ogImage: 
  url: /TIL/assets/img/2024-07-13-UseandtoMakeYourPythonFunctionParametersLookNeater_0.png
tag: Tech
originalTitle: "Use * and   to Make Your Python Function Parameters Look Neater"
link: "https://medium.com/gitconnected/use-and-to-make-your-python-function-parameters-look-neater-7ca80f874893"
---


![TIL 이미지](/TIL/assets/img/2024-07-13-UseandtoMakeYourPythonFunctionParametersLookNeater_0.png)

파이썬에서는 위치 매개변수 또는 키워드 매개변수를 사용하여 함수에 데이터를 전달할 수 있습니다. 이는 파이썬에서 함수를 매우 유연하게 사용할 수 있게 해줍니다. 그러나 이에는 일부 제한 사항이 있습니다. 예를 들어, 일부 매개변수를 위치 전용으로 지정하고 일부를 키워드 전용으로 지정할 수 있습니다. 또 다른 일반적인 사용 사례는 기본 값이 있는 매개변수를 기본 값이 없는 매개변수보다 먼저 놓아 매개변수가 더 구성되고 사용하기 쉽도록 만드는 것입니다. 이러한 요청은 파이썬의 * 및 / 기호를 사용하여 수행할 수 있습니다.

## 기본 동작

이미 알고 있듯이, 파이썬에서는 위치 매개변수 또는 키워드 매개변수를 사용하여 함수에 데이터를 전달할 수 있습니다. 여기에 간단한 함수 예제가 있습니다:

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
def echo(x, y, z):
    print(f"{x=}, {y=}, {z=}")
```

이 함수를 호출할 때 위치 매개변수나 키워드 매개변수를 사용할 수 있습니다. 단, 키워드 매개변수는 위치 매개변수 뒤에 있어야 합니다:

```python
echo(1, 2, 3)
echo(1, 2, z=3)
echo(1, y=2, z=3)
echo(x=1, y=2, z=3)
# x=1, y=2, z=3
```

모두 작동하고 동일한 결과를 출력합니다.

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

## /를 사용하여 위치 전용 매개변수 지정하기

함수 정의에서 / 기호 앞에 배치된 매개변수는 위치 전용으로 전달돼야 합니다. echo() 함수를 업데이트하여 /를 사용해봅시다:

```js
def echo(x, /, y, z):
    print(f"{x=}, {y=}, {z=}")
```

이 업데이트로 x는 위치 매개변수로만 전달될 수 있으며, y와 z는 여전히 위치 및 키워드 매개변수로 모두 전달될 수 있습니다:

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
echo(1, 2, 3)
echo(1, 2, z=3)
echo(1, y=2, z=3)
# x=1, y=2, z=3
```

그리고 x가 키워드 매개변수로 전달되면 TypeError가 발생합니다:

```js
echo(x=1, y=2, z=3)
# TypeError: echo() got some positional-only arguments passed as keyword arguments: 'x'
```

## *를 사용하여 키워드 전용 매개변수 지정하기


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

함수 정의에서 * 기호 뒤에 올 파라미터는 키워드 인수로 전달되어야 합니다. echo() 함수에서 / 대신 *를 사용해보겠습니다:

```js
def echo(x, *, y, z):
    print(f"{x=}, {y=}, {z=}")
```

이제 x는 위치 인수 또는 키워드 인수로 전달할 수 있지만, y와 z는 키워드 인수로 반드시 전달되어야 합니다 (x가 위치 매개변수로 전달되더라도):

```js
echo(1, y=2, z=3)
echo(x=1, y=2, z=3)
# x=1, y=2, z=3

echo(1, 2, z=3)
# TypeError: echo() takes 1 positional argument but 2 positional arguments (and 1 keyword-only argument) were given

echo(1, 2, 3)
# TypeError: echo() takes 1 positional argument but 3 were given
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
* 기호의 매우 유용한 기능 중 하나는 매개변수를 보다 구성되게 보이도록 기본값이 설정된 매개변수를 기본값이 없는 매개변수보다 먼저 배치할 수 있다는 것입니다. 예를 들어, * 기호를 사용하여 y에 기본값을 지정하고 여전히 y 뒤에 z를 놓을 수 있습니다:

def echo(x, *, y=2, z):
    print(f"{x=}, {y=}, {z=}")

이것은 Python에서 유효한 구문이며 복잡한 함수 매개변수를 갖는 서드 파티 Python 라이브러리에서 흔히 사용됩니다.

이제 y와 z 둘 다 키워드 매개변수로 전달되어야 하며 y에는 기본값이 설정되어 있습니다:
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
echo(1, z=3)
echo(1, y=2, z=3)
# x=1, y=2, z=3
```

## 함수 정의에서 *와 /를 결합하기

*와 /를 결합하여 위치 매개변수와 키워드 전용 매개변수를 가진 함수를 정의할 수 있습니다:

```js
def echo(x, /, *, y=2, z):
    print(f"{x=}, {y=}, {z=}")
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

이 경우에는 x는 위치 전용이고 y와 z는 키워드 전용 매개변수입니다:

```js
echo(1, z=3)
echo(1, y=2, z=3)
# x=1, y=2, z=3

echo(x=1, z=3)
# TypeError: echo() got some positional-only arguments passed as keyword arguments: 'x'
```

이 게시물에서는 함수 정의에서 *와 / 기호를 사용한 것을 소개했는데, 이들은 다음과 같은 흥미로운 유틸리티를 가지고 있습니다:

- 일부 매개변수를 위치 전용으로 지정하고 일부를 키워드 전용으로 지정합니다.
- 기본값을 가진 매개변수는 기본값이 없는 매개변수 앞에 두어 매개변수를 더욱 구성하기 쉽고 사용하기 편리하게 합니다.

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

## 관련 포스트:

- 특별한 Python 문자열 포맷팅으로 로깅 및 단위 변환하기
- Python 코드를 더 전문적으로 만들기 위해 black, mypy, pylint 사용하기