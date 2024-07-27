---
title: "시와 파이썬의 타이핑 문제 해결 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-Peskytypingissueswithpoetryandpython_0.png"
date: 2024-07-07 21:32
ogImage:
  url: /assets/img/2024-07-07-Peskytypingissueswithpoetryandpython_0.png
tag: Tech
originalTitle: "Pesky typing issues with poetry and python"
link: "https://medium.com/@mnghamaty/pesky-typing-issues-with-poetry-and-python-6666a958d1f4"
---

![이미지](/TIL/assets/img/2024-07-07-Peskytypingissueswithpoetryandpython_0.png)

파이썬에서 커스텀 타입을 더 자주 사용하게 되었습니다. TypeScript와 달리 파이썬의 typing은 비교적 자유롭게 정의됩니다(학술적 정의도 있지만, 본 글을 위해서는 IDE가 가장 중요하게 생각합니다). 계약 포지션에서 일할 때 코드베이스를 빨리 적응할 수 있도록 합니다.

물론 PEP-0585의 instanceof와 같은 해결책이 있습니다. 예를 들어 문제를 제시해보죠. 함수와 루비를 사용한 적이 있는 사람에게 요청된 특정 타입이 있는 경우를 살펴봅시다:

```python
def my_special_function(test: Test) -> Output:
  return Output()
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

당연하지만 실제 유형은 전통적인 Python 인터프리터에서 테스트되지 않았습니다. 그러나 우리가 매개변수로 전달되는 것을 정확히 알고 싶다면 다음을 추가할 수 있습니다:

```js
def my_special_function(test: Test) -> Output:
  if not isintanceof(test, Test):
    raise Exception("이런! 저는 뭔가 다른 것을 기대하고 있었어요!")
  return Output()
```

만약 이를 자동으로 처리하는 고차 함수를 만들어 숙제를 하고 싶다면 이를 PEP 요청으로 보내서 표준 릴리스에 포함되도록 요청할 수도 있어요.

Python 3.12 이상에서 추가된 다른 항목(P.E.P. 0695)은 'type' 키워드입니다. 사용자 정의 유형을 제공하여 다음과 같이 정의할 수 있습니다:

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
import typing

type EMAIL = typing.String
```
