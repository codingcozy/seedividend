---
title: "파이썬 함수에서 x 사용을 멈춰야 하는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-StopUsingxinPythonFunctionParameters_0.png"
date: 2024-07-06 10:31
ogImage:
  url: /assets/img/2024-07-06-StopUsingxinPythonFunctionParameters_0.png
tag: Tech
originalTitle: "Stop Using “x=[]” in Python Function Parameters!"
link: "https://medium.com/gitconnected/mutable-default-arguments-python-bad-366459d31723"
---

/assets/img/2024-07-06-StopUsingxinPythonFunctionParameters_0.png

무언가가 합법적이라고 해서 좋은 것은 아닙니다.

이유없이 낯선 사람에게 무례하게 행동하는 것은 불법이 아니라고 해서 (보통) 좋은 일이 아닙니다.

```js
def func(ls: List[str] = []):
    ...
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

파이썬 함수에서 변경 가능한 기본 인수도 허용됩니다. 아래와 같은 코드를 실행할 수 있고 파이썬은 이를 허용합니다. 그러나 이는 좋지 않은 관행입니다.

# 가변성의 의미

데이터 구조가 생성 후에 변경될 수 있다면 해당 데이터 구조는 가변적입니다. 리스트, 딕셔너리 및 세트와 같은 데이터 유형은 파이썬에서 가변적입니다.

데이터 구조가 변경되지 않는(불변한) 것은 데이터 구조가 생성 후 변경되지 않는 경우입니다. 정수, 부동 소수점, 부울, 문자열, None, 튜플 및 frozenset과 같은 데이터 유형은 파이썬에서 변경되지 않습니다.

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

# 기본 인수를 사용하는 이유

```js
def greet(name: str, greeting: str='hello'):
    print(greeting, name)

greet('tom')
# hello tom

greet('tom', greeting='ni hao')
# ni hao tom
```

위 함수에서 greeting은 기본 인수입니다.

greeting에 값을 전달하지 않고 선택하는 경우 기본값 `hello`를 갖습니다.

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

만약 우리가 인사말에 값을 전달하면, 전달한 값을 사용합니다.
