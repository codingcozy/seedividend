---
title: "파이썬으로 코딩 시작하기 5 딕셔너리 part II  반복문 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-StartCodingwithPython5DictionariespartIIlooping_0.png"
date: 2024-07-09 20:57
ogImage:
  url: /assets/img/2024-07-09-StartCodingwithPython5DictionariespartIIlooping_0.png
tag: Tech
originalTitle: "Start Coding with Python: 5. Dictionaries (part II — looping)"
link: "https://medium.com/@audrey_evans/start-coding-with-python-5-dictionaries-part-ii-e9316455f083"
---

딕셔너리를 순회하는 방법을 배울 거에요. 딕셔너리는 여러 가지 방법으로 정보를 저장할 수 있기 때문에 이를 순회하는 다양한 방법이 있어요. 주어진 딕셔너리의 키, 값 또는 모든 키-값 쌍을 순회할 수 있어요.

## 키-값 쌍을 순회하기

세 개의 키-값 쌍을 포함하는 scientist_0 딕셔너리를 고려해봐요:

```js
# 파일 이름: scientist.py

scientist_0 = {
    'username': 'rfeynman',
    'first name': 'richard',
    'last name': 'feynman',
    }

for key, value in scientist_0.items():
    print(f"\n키: {key}")
    print(f"값: {value}")
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

루프에 대한 예시를 보면, 코드를 실행하면 다음과 같이 결과가 나옵니다

```js
$ python3 scientist.py

Key: username
Value: rfeynman

Key: first name
Value: richard

Key: last name
Value: feynman
```

이후에 자세히 설명하겠습니다.

키와 값에 대해 간단히 k와 v를 사용할 수 있습니다. 따라서 아래와 같이 코드를 작성하면 (특히 루프 부분을 참조하십시오), Python이 이전 코드와 정확히 동일하게 이해합니다.

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
# 파일 이름: scientist.py

scientist_0 = {
    'username': 'rfeynman',
    'first name': 'richard',
    'last name': 'feynman',
    }

for k, v in scientist_0.items():
    print(f"\nKey: {k}")
    print(f"Value: {v}")
```

위의 for 문에서 scientist_0 사전의 이름 뒤에 items() 메서드가 따라옵니다. 이 메서드는 키-값 쌍을 반환합니다. 그런 다음 각 키-값 쌍이 여기에서 Key와 Value로 정의된 두 변수에 할당됩니다.

## 키값만 루핑

items() 메서드 대신 keys() 메서드를 사용하면 사전의 키만을 순회할 수 있습니다.

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
# file name: scientist_hobby.py

scientist_hobby = {
    'einstein': '바이올린',
    'feynman': '봉고',
    'dirac': '사색',
    }

for name in scientist_hobby.keys():
    print(name.title())
```

위 코드에서는 scientist_hobby라는 사전이 정의되어 있습니다. 이 사전은 이름이 과학자의 이름이고 값이 과학자의 취미인 세 개의 키-값 쌍으로 이루어져 있습니다. 만약 여기서 값이 아닌 과학자들의 이름인 키만 필요하다면, keys() 메서드를 사용하면 됩니다.

```js
$ python3 scientist_hobby.py
Einstein
Feynman
Dirac
```

위 코드를 실행하면 사전의 키만을 반환합니다. 여기서 간단히 언급하고 싶은데, 이러한 상황(값이 아닌 키만 반환하는 것)은 keys() 메서드를 특별히 지정하지 않을 때의 기본 동작입니다.

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
# 파일명: scientist_hobby.py

scientist_hobby = {
    'einstein': '바이올린',
    'feynman': '봉고',
    'dirac': '사색',
    }

for anything in scientist_hobby:
    print(anything.title())
```

위 코드에서 .keys()를 제외하였지만, 이 코드를 실행하면 과학자들의 이름만 반환하여 결과는 똑같이 나올 것입니다.

알파벳 순서로 키를 순회하고 싶다면 sorted() 메서드를 사용할 수 있습니다:

```python
# 파일명: scientist_hobby.py

scientist_hobby = {
    'einstein': '바이올린',
    'feynman': '봉고',
    'dirac': '사색',
    }

for name in sorted(scientist_hobby.keys()):
    print(name.title())
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

위의 코드를 실행하면 다음과 같이 됩니다

```js
$ python3 scientist_hobby.py
Dirac
Einstein
Feynman
```

## 값만 반복

상담하신 것처럼, 우리는 키가 없는 값의 순서를 반환하기 위해 위에서 논의한 keys() 메소드와 대조해서 values() 메소드를 사용할 수 있습니다.

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
# 파일 이름: scientist_hobby.py

scientist_hobby = {
    'einstein': 'violin',
    'feynman': 'bongo',
    'dirac': 'pondering',
    'heisenberg': 'violin',
    }

print("이러한 취미가 언급되었습니다:")
for hobby in scientist_hobby.values():
    print(hobby.title())
```

위의 코드를 실행하면 다음이 반환됩니다:

```js
$ python3 scientist_hobby.py
이러한 취미가 언급되었습니다:
Violin
Bongo
Pondering
Violin
```

여기서 바이올린은 두 명이 동일한 취미를 가지고 있기 때문에 반복됩니다. 이러한 종류의 반복을 방지하고 싶은 경우 아래에 표시된 대로 set() 메소드를 사용할 수 있습니다:

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
# file name: scientist_hobby.py

scientist_hobby = {
    'einstein': 'violin',
    'feynman': 'bongo',
    'dirac': 'pondering',
    'heisenberg': 'violin',
    }

print("These hobbies have been mentioned:")
for hobby in set(scientist_hobby.values()):
    print(hobby.title())
```

```python
$ python3 scientist_hobby.py
These hobbies have been mentioned:
Violin
Pondering
Bongo
```

Now Violin is returned only once.

One can also make a set using braces ({}). However, in contrast to a dictionary where a set of key-value pairs are given inside '{}', in a set each single element should be separated by a comma.

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
>>> 취미 = {'바이올린', '봉고', '사색', '바이올린', '봉고'}
>>> 취미
{'사색', '바이올린', '봉고'}
```

딕셔너리와 집합 사이의 차이를 알아두면 혼란을 방지할 수 있어요.

![이미지](/TIL/assets/img/2024-07-09-StartCodingwithPython5DictionariespartIIlooping_0.png)

![이미지](/TIL/assets/img/2024-07-09-StartCodingwithPython5DictionariespartIIlooping_1.png)

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

![image](/TIL/assets/img/2024-07-09-StartCodingwithPython5DictionariespartIIlooping_2.png)
