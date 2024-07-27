---
title: "파이썬 함수 사용법을 일찍 배웠어야 했던 7가지 팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-7ThingsIShouldveLearntMuchEarlierForPythonFunctions_0.png"
date: 2024-07-09 14:44
ogImage:
  url: /assets/img/2024-07-09-7ThingsIShouldveLearntMuchEarlierForPythonFunctions_0.png
tag: Tech
originalTitle: "7 Things I Should’ve Learnt Much Earlier For Python Functions"
link: "https://medium.com/gitconnected/7-things-i-shouldve-learnt-much-earlier-for-python-functions-69d1108f0f62"
---

![이미지](/TIL/assets/img/2024-07-09-7ThingsIShouldveLearntMuchEarlierForPythonFunctions_0.png)

파이썬에 대한 내 이해력이 더 좋았을 텐데, 이런 것들을 내 여정에서 이른 시일 내에 어떻게든 배웠더라면 훨씬 더 좋았을 텐데요. 하지만 인생은 인생대로이고, 늦게 배우는 것은 결코 늦기보다는 낫습니다.

# 1) 타입 힌팅

```python
def magic(a, b):
  return a + b
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

파이썬은 동적으로 타입이 지정되기 때문에 변수 데이터 유형이 실행 중에 결정되어서 저렇게 함수를 작성할 수 있습니다.

```js
def magic(a:int, b:int) -> int:
  return a + b
```

^ 위와 똑같은 함수를 작성하지만, 타입 힌트를 추가했습니다.

- a는 정수여야 합니다.
- b는 정수여야 합니다.
- 함수의 반환 값도 정수여야 합니다.

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

코드베이스가 커질수록 타입 힌팅은 우리 코드를 가능한 한 사람이 읽기 쉽게 만드는 데 매우 중요해집니다. 1만 개의 함수가 있다고 상상해보세요. 이때 이 함수들이 어떤 데이터 유형을 취하는지와 반환하는 유형을 추론해야 한다면 정말 즐겁지 않을 것입니다.

```js
def test1(ls: list[int], x:float) -> list[float]:
  # 작업들
```

^ ls는 float의 리스트여야 하고, x는 float이어야 하며, 이 함수는 float의 리스트를 반환해야 합니다
