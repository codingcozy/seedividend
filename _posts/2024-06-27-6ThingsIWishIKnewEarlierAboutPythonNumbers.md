---
title: "파이썬 숫자에 대해 미리 알았으면 좋았을 6가지 팁"
description: ""
coverImage: "/assets/img/2024-06-27-6ThingsIWishIKnewEarlierAboutPythonNumbers_0.png"
date: 2024-06-27 17:55
ogImage: 
  url: /assets/img/2024-06-27-6ThingsIWishIKnewEarlierAboutPythonNumbers_0.png
tag: Tech
originalTitle: "6 Things I Wish I Knew Earlier About Python Numbers"
link: "https://medium.com/@zlliu/6-things-i-wish-i-knew-earlier-about-python-numbers-dc83443d3da1"
isUpdated: true
---




아래는 Mardown 형식을 사용한 표태그입니다:


| 열1 | 열2 |
|-----|-----|
| 내용1 | 내용2 |
| 내용3 | 내용4 |


<div class="content-ad"></div>

```python
y: float = 3.45e-4

print(y) # 0.000345
```

- 1.25e5 means 1.25 * 10 ^ 5 (which is 100000)
- 3.45e-4 means 3.45 * 10 ^ -4 (which is 0.0001)

With this, we can easily type out very large and very small numbers without having to ensure that we’ve typed the correct number of zeros.

# 2) We can insert underscores in our numbers


<div class="content-ad"></div>

그래서 숫자를 읽기 쉽게 하기 위해 0을 모아 놓을 수 있습니다.

```js
x: int = 1_000_000_000

print(x) # 1000000000
```

^ 여기서는 3개의 0 사이마다 _ 하나를 넣어서 한 눈에 10억이라는 것을 알 수 있도록 만듭니다.

```js
y: int = 1_0_0_00_000

print(y) # 10000000
```

<div class="content-ad"></div>

^ 각 그룹당 3 개의 숫자가 있어야 하는 것은 의무적이 아닙니다. 원하는 만큼 많은 숫자 그룹당 0을 넣을 수 있지만, 저는 3개로 고정하는 것이 가장 읽기 쉽다고 생각했습니다.

# 3) 음수 소수 자릿수로 round() 할 수 있습니다

숫자를 -2 소수 자릿수로 round() 하면, 해당 숫자를 가장 가까운 100의 배수로 반올림합니다.

```js
x: int = 123456

print(round(x, -2)) # 123500
```

<div class="content-ad"></div>

숫자를 -3 소수점 자리로 round() 함수를 사용하면, 가장 가까운 1000으로 올립니다.

```js
x: int = 123456

print(round(x, -3)) # 123000
```

숫자를 -4 소수점 자리로 round() 함수를 사용하면, 가장 가까운 10000으로 올립니다.

```js
x: int = 123456

print(round(x, -4)) # 120000
```

<div class="content-ad"></div>

# 4) divmod() 함수를 사용하여 //와 %를 동시에 수행할 수 있어요

```js
a, b = divmod(57, 10)

print(a) # 5
print(b) # 7
```

내장 함수인 divmod(a, b)는 2개의 정수 a와 b를 입력으로 받고, (몫, 나머지)를 담은 튜플을 반환해요.

- 57을 10으로 나눈 결과는 몫이 5이고, 나머지가 7이에요
- a // b를 하면 몫을 얻을 수 있어요
- a % b를 하면 나머지를 얻을 수 있어요

<div class="content-ad"></div>

`divmod` 함수를 사용하면 동시에 이를 수행할 수 있어서, 우리가 `//`와 `%`를 동시에 해야 할 때 코드 한 줄을 절약할 수 있어요.

# 5) 양수 무한대와 음수 무한대

`float('inf')`를 사용하면, 사실 양의 무한대를 얻을 수 있어요.

```js
x: float = float('inf')

print(x) # inf
```

<div class="content-ad"></div>

그리고 float(`-inf`)를 실행하면 음의 무한대를 얻습니다.

```js
y: float = float('-inf')

print(y) # -inf
```

양의 무한대는 다른 모든 숫자보다 큽니다. 반면 음의 무한대는 다른 모든 숫자보다 작습니다.

```js
x: float = float('inf')

print(x > 1)          # True
print(x > 1_000_000)  # True
print(x > 3.14e100)   # True
```

<div class="content-ad"></div>

```js
y: float = float('-무한대')

print(y < -1)          # True
print(y < -1_000_000)  # True
print(y < -1e1000)     # True
```

우리는 다른 모든 숫자보다 크거나 작은 숫자가 필요할 때 양의 무한대 혹은 음의 무한대를 사용할 수 있습니다.

# 6) 내장 decimal 모듈

Python에는 내장된 decimal 모듈이 있어서 간단히 가져와서 사용할 수 있으며, 십진수 숫자를 다룰 수 있는 기능을 제공합니다.

<div class="content-ad"></div>

```python
from decimal import Decimal

a: Decimal = Decimal(1) / Decimal(3)

print(a) # 0.3333333333333333333333333333
```

하지만 왜 우리는 보통의 부동 소숫점 숫자 대신 이것을 사용해야 할까요?

- 부동 소숫점 숫자는 근사값입니다
- 부동 소숫점 숫자는 부동 소수점의 정확도 문제가 발생할 수 있습니다
- Decimal은 더 정확하게 설계되어 있습니다

```python
a: float = 2.0
b: float = 2.000000000000000000000001

print(a == b) # True
```

<div class="content-ad"></div>

특정 지점을 넘어서면 부동 소수점 정밀도 부정확성이 발생할 수 있으며, 이는 작은 숫자에 대해 문제가 될 수 있습니다.

# 7) (보너스) 복소수

수학 수업에서 복소수라는 이상한 개념을 다뤘던 기억이 나시나요? 파이썬에서도 이를 할 수 있습니다.

```python
a: complex = complex(5, 7)

print(a)        # (5+7j)
print(type(a))  # <class 'complex'>
```

<div class="content-ad"></div>

여기서 5 + 7j는 5 + 7i를 의미해요 (실수 부분 5 + 허수 부분 7)

```js
a: complex = complex(5, 7)

print(a.real)  # 5.0
print(a.imag)  # 7.0
```

^ 우리는 .real과 .imag을 사용하여 허수의 실수부와 허수부를 추출할 수 있어요.

```js
import cmath
```  

<div class="content-ad"></div>

^ 내장 cmath 모듈을 가져와서 다양한 복소수 연산을 수행할 수 있어요! (자세히 설명하지는 않겠죠)

저는 직장에서 이것을 사용해본 적이 없어요 (왜 쓰겠어요 ㅋㅋ), 그래도 재미있는 사실을 알게 되어서 기뻤어요.

# 유머 콘텐츠

# 제작자로서 저를 지원하고 싶으시다면

<div class="content-ad"></div>

- 제 책을 구매해주세요! — 파이썬에 대해 알지 못했던 101가지 이야기
- 어디서 찾을 수 있나요: https://payhip.com/b/vywcf
- 이 이야기에 박수 50번 치세요
- 당신의 생각을 남겨주세요
- 이 이야기에서 가장 마음에 드는 부분을 강조해주세요

감사합니다! 이 작은 행동이 큰 도움이 되며, 정말 감사드립니다!

YouTube: https://www.youtube.com/@zlliu246

LinkedIn: https://www.linkedin.com/in/zlliu/