---
title: "몰랐으면 후회할 8가지 Python Dictionary 사용 꿀팁"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-8PythonDictionaryThingsIRegretNotKnowingEarlier_0.png"
date: 2024-07-07 02:29
ogImage:
  url: /assets/img/2024-07-07-8PythonDictionaryThingsIRegretNotKnowingEarlier_0.png
tag: Tech
originalTitle: "8 Python Dictionary Things I Regret Not Knowing Earlier"
link: "https://medium.com/@zlliu/8-python-dictionary-things-i-regret-not-knowing-earlier-bd98e94a5600"
---

![이미지](/TIL/assets/img/2024-07-07-8PythonDictionaryThingsIRegretNotKnowingEarlier_0.png)

이러한 팁들 덕분에 Python에서 사전(Dictionary)를 다루는 것이 더 즐겁고 우아해졌고, 조금 더 늦게 배워서 아쉬운 점이 있습니다.

# 1) dict(key=value)를 사용하여 사전 생성하기

참고 - 우리 개발팀이 95%의 경우에 사전을 만드는 방법입니다. ''는 그다지 사용하지 않습니다.

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

# 딕셔너리를 만드는 일반적인 방법

d = {'apple':4, 'orange':5, 'pear':6, 'pineapple':7}

# 동일한 딕셔너리를 만드는 '더 좋은' 방법

d = dict(apple=4, orange=5, pear=6, pineapple=7)

더 좋은 방법이 더 좋은 이유:

- ''를 사용하면 문자열 키에 따옴표 문자를 입력해야 함
- 예를 들어, `apple` `orange`와 같은 방식
- 따옴표 문자를 입력해야 하는 것은 키가 많아질수록 기하급수적으로 귀찮아짐
- dict()를 사용하면 따옴표 문자를 무시할 수 있음

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

물론, dict() 방법은 문자열이 아닌 키와 함께 사용할 수 없어서 두 가지 방법에는 각각의 용도가 있습니다.

# 2) \*\*를 사용하여 딕셔너리를 결합하는 방법

```js
# 여기에 2개의 딕셔너리가 있습니다.

a = {1:1, 2:2}
b = {3:3, 4:4}
```

```js
# **를 사용하여 두 개를 결합할 수 있습니다.

x = {**a, **b}

print(x) #… 출력결과를 확인하세요
```
