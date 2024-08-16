---
title: "이렇게 Python 함수 작성 안 하면 PR 거부"
description: ""
coverImage: "/assets/img/2024-06-23-WritePythonFunctionsLikeThisOrIllRejectYourPullRequest_0.png"
date: 2024-06-23 13:30
ogImage: 
  url: /assets/img/2024-06-23-WritePythonFunctionsLikeThisOrIllRejectYourPullRequest_0.png
tag: Tech
originalTitle: "Write Python Functions Like This Or I’ll Reject Your Pull Request"
link: "https://medium.com/@zlliu/write-python-functions-like-this-or-ill-reject-your-pull-request-d8aa501ab1c4"
isUpdated: true
---





<img src="/assets/img/2024-06-23-WritePythonFunctionsLikeThisOrIllRejectYourPullRequest_0.png" />

이건 나의 직장에서 기술 리드로부터 받았던 에너지였죠. 사실 나도 이 시점에서 그와 동의합니다.

# 우리에게 파이썬 함수를 어떻게 작성하는지 배웠는가

다음은 간단한 매개변수를 사용하는 함수입니다:


<div class="content-ad"></div>

- 숫자 목록 num_list가 있습니다.
- 숫자 num이 있습니다.
- num_list에 있는 모든 숫자에 num을 더한 새로운 목록을 반환합니다.

```js
def add_all(num_list, num):
    output = []
    for n in num_list:
        output.append(n + num)
    return output

x = add_all([3, 4, 5], 10)

print(x) # 13, 14, 15
```

문제 - 첫눈에 알기 어려운 것들:

- 이 함수가 어떤 데이터 유형을 사용하는지
- 이 함수가 어떤 데이터 유형을 반환하는지

<div class="content-ad"></div>

음, 코드를 읽으면 num_list가 숫자의 목록이고 num은 숫자이며, 함수가 숫자의 목록을 반환한다는 것을 유추할 수 있다는 걸 알 수 있어. 그러나 이건 즉시 알 수 있는 게 아니잖아.

그리고 대규모 제품용 앱에서는 수천 개의 함수가 처리되어야 한다. 정말 그 추가 시간을 들여서 데이터 유형을 이해하고 추론해야 할까?

# 타입 주석 (타입 힌트)이 구해줍니다 

참고 - 우리는 이것을 타입 힌트 또는 타입 주석이라고 부를 수 있어

<div class="content-ad"></div>

그리고 위의 함수에 몇 가지 타입 힌트를 추가해 봅시다.

```python
from typing import List, Union

def add_all(
    num_list: List[Union[int, float]],
    num: Union[int, float]
) -> List[Union[int, float]]:
    """
    num_list의 모든 숫자에 num을 추가합니다  

    inputs:
        num_list: 숫자 리스트
        num: 숫자
    """
    output = []
    for n in num_list:
        output.append(n + num)
    return output

x: List[Union[int, float]] = add_all([3, 4, 5], 10)

print(x) # 13, 14, 15
```

- Union[int, float]은 int 또는 float 중 하나를 의미합니다.
- List[Union[int, float]]은 정수 또는 소수의 리스트를 의미합니다.

num_list: List[Union[int, float]]은 num_list가 숫자 (정수 또는 소수)의 리스트여야 함을 의미합니다.

<div class="content-ad"></div>

비슷하게, `num: Union[int, float]`은 num이 정수 또는 부동 소수점 숫자여야 함을 의미합니다.

마지막으로, `- List[Union[int, float]]`은 이 함수가 정수 또는 부동 소수점 숫자들의 리스트를 반환해야 함을 의미합니다.

참고 - 함수의 첫 줄에 우리 함수가 무엇을 하는지 간단히 설명하고 문서화하기 위해 (세 개의 따옴표로 둘러싼 것) 독스트링을 추가합니다.

# 네, 이렇게 함수를 작성해야 합니다. 그렇지 않으면 PR이 거부될 것입니다.

<div class="content-ad"></div>

왜 기술 리드가 우리에게 함수를 이렇게 작성하라고 요청하는지 알려드릴게요:

- 변수의 데이터 유형이 한눈에 알 수 있습니다.
- 이를 유추할 필요가 없어져 시간을 절약할 수 있습니다.
- 함수가 반환해야 하는 것을 한눈에 알 수 있습니다.
- 독스트링을 통해 함수가 하는 일을 코드를 살펴보지 않고도 한눈에 알 수 있습니다. 더 많은 시간을 절약할 수 있죠.
- 이렇게 함으로써 함수가 장기적으로 유지보수하기에 더 적합해집니다.

# 더 널리 사용되는 타입 힌트들

기본 사항:

<div class="content-ad"></div>

```js
a: int = 5

b: float = 3.14

c: bool = True

d: str = 'apple orange pear'
```

리스트, 사전, 튜플, 셋:

```js
from typing import List, Dict, Tuple, Set

# 정수 리스트
a: List[int] = [1, 2, 3]  

# 문자열 리스트
b: List[str] = ['apple', 'orange'] 

# 키가 문자열이고 값이 정수인 사전
c: Dict[str, int] = {'apple':4, 'orange':5}

# 키가 정수이고 값이 부울인 사전
d: Dict[int, bool] = {1: True, 2: False, 3: True}
```

변수가 정수 또는 부동 소수점 숫자일 수 있는 경우 Unions을 사용합니다.

<div class="content-ad"></div>

```js
from typing import Union, Dict

def add10(number: Union[int, float]):
    # number은 정수 또는 부동소수점이어야 합니다
    pass

def test(d: Dict[str, Union[int, float, bool]]):
    # d는 사전이어야 합니다
    # d의 키는 모두 문자열이어야 합니다
    # d의 값은 정수, 부동소수점 또는 부울이어야 합니다
    pass
```

대안적인 방법으로 `Union`을 사용하는 대신에 다음과 같이 작성할 수 있습니다:

```js
from typing import Dict

def add10(number: int | float):
    # number은 정수 또는 부동소수점이어야 합니다
    pass

def test(d: Dict[str, int | float | bool]):
    # d는 사전이어야 합니다
    # d의 키는 모두 문자열이어야 합니다
    # d의 값은 정수, 부동소수점 또는 부울이어야 합니다
    pass
```

^ `Union[int, float]` 대신에 `int | float`을 사용하는 대체 방법입니다. 저는 이 방법을 더 우아하게 보이고(그리고 덜 타이핑해야 하기 때문에) 주로 사용합니다.

<div class="content-ad"></div>

아래는 옵셔널 변수에 대한 예제입니다:

```python
from typing import Optional
from random import random

def test() -> Optional[int]:
    """
    50%의 확률로 1000 반환
    50%의 확률로 None 반환
    """
    random_float: float = random()

    if random_float > 0.5:
        return 1000

    return None
```

여기서 Optional[int]는 변수가 int 또는 None 중 하나일 수 있음을 나타냅니다.

# 결론

<div class="content-ad"></div>

네, 정말이죠. 만약 우리 중 누군가가 타입 주석이나 독스트링을 추가하지 않고 코드를 작성한다면, 우리는 리더들로부터 그것을 추가하라는 의견을 받게 될 거에요.

그것이 나쁜 일은 아니에요, 왜냐하면 코드는 읽기 쉽도록 만들어졌으니까요.

# 만약 크리에이터로서 저를 지원하고 싶다면

- 제 책을 사 주세요! — 101 Things I Never Knew About Python
- 어디서 찾을 수 있나요: https://payhip.com/b/vywcf
- 이 이야기에 50번 박수를 보내주세요
- 여러분의 생각을 나에게 말씀해 주세요
- 이야기에서 가장 좋아하는 부분을 강조해 주세요

<div class="content-ad"></div>

감사합니다! 이런 작은 조치들이 큰 도움이 되고, 정말 감사드립니다!

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)