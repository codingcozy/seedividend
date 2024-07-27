---
title: "알아두었으면 좋았을 Python 리스트 방법 12가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-12PythonListThingsIRegretNotKnowingEarlier_0.png"
date: 2024-07-09 19:32
ogImage:
  url: /assets/img/2024-07-09-12PythonListThingsIRegretNotKnowingEarlier_0.png
tag: Tech
originalTitle: "12 Python List Things I Regret Not Knowing Earlier"
link: "https://medium.com/gitconnected/12-python-list-things-i-regret-not-knowing-earlier-ad841b527666"
---

![이미지](/TIL/assets/img/2024-07-09-12PythonListThingsIRegretNotKnowingEarlier_0.png)

파이썬 여행을 하면서 몇 가지를 좀 늦게 알게 되었는데, 아마 당신이 이것들을 더 빨리 배울 수 있을 거에요.

### 1) 리스트를 결합하기 위해 \* 사용하기

리스트 앞에 \*을 추가하면 언팩합니다:

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
a = [1, 2]
b = [3, 4]

c = [*a, *b, 5]

print(c) # [1, 2, 3, 4, 5]
```

- 첫 번째 \*는 a의 요소를 c에 풀어 헤친다
- 두 번째 \*는 b의 요소를 c에 풀어 헤친다
- 이것이 왜 1, 2, 3, 4, 5가 동일한 목록 c에 들어 있는지 이유입니다

```js
a = [1, 2]
b = [3, 4]
c = [5, 6]
d = [7, 8]

x = [*a, b, *c, d]

print(x) # [1, 2, [3,4], 5, 6, [7, 8]]
```

^ \*이 붙은 리스트(a와 c)만 풀어 헤쳐진다는 것을 주목해 주세요. b와 d는 일반 요소처럼 처리됩니다.

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

# 2) \*를 사용하여 리스트 언패킹하기

리스트를 언패킹할 때, 우리는 \*를 변수 앞에 사용하여 즉시 사용하지 않을 초과 요소를 받을 수 있습니다.

```js
mylist = ['apple', 'orange', 'pear', 'pineapple', 'durian']

a, b, *others = mylist

print(a)       # apple
print(b)       # orange
print(others)  # ['pear', 'pineapple', 'durian']
```

- a는 mylist의 첫 번째 요소에 할당됩니다.
- b는 mylist의 두 번째 요소에 할당됩니다.
- others는 mylist의 모든 다른 요소를 받는 리스트에 할당됩니다.

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

노트 - a와 b가 반드시 가장 앞에 있을 필요는 없습니다.

```js
mylist = ['apple', 'orange', 'pear', 'pineapple', 'durian']

a, *others, b = mylist

print(a)       # apple
print(b)       # durian
print(others)  # ['orange', 'pear', 'pineapple']
```

- a는 mylist의 첫 번째 요소에 할당됩니다.
- b는 mylist의 마지막 요소에 할당됩니다.
- others는 mylist 사이에 모든 다른 요소를 캐치하는 리스트에 할당됩니다.

# 3) 리스트를 함수 인수로 언패킹하는 방법

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

함수 이름, 나이, 성별을 받는 test 함수가 있다고 가정해보죠. 이 함수를 사용하려면 test(이름, 나이, 성별)와 같이 전달해주어야 합니다.

```js
def test(name, age, gender):
    print(name, age, gender)

test('rocky', 5, 'male') # rocky 5 male
```

만약 올바른 함수 인수를 포함하는 리스트 x = ['rocky', 5, 'male']가 있다면, \*를 사용하여 해당 인수를 함수에 전달할 수 있습니다.

```js
x = ['rocky', 5, 'male']

test(*x) # rocky 5 male
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

위 내용은 다음과 같습니다:

```js
test("rocky", 5, "male");
```

# 4) 리스트 컴프리헨션

어떤 이유로 인해 나는 리스트 컴프리헨션에 대해 상대적으로 늦게 배웠다 (자료 구조와 알고리즘에 대해서 배운 후에야).

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

만약 우리가 [1, 2, 3, 4, 5]라는 리스트가 있고, 각 요소를 10씩 곱해서 [10, 20, 30, 40, 50] 리스트를 만들고 싶다면, 리스트 컴프리헨션 없이는 어떻게 할 수 있을까요:

```js
numbers = [1, 2, 3, 4, 5]

newlist = []
for number in numbers:
    newlist.append(number * 10)

print(newlist)  # [10, 20, 30, 40, 50]
```

리스트 컴프리헨션을 사용하여 훨씬 더 우아하게 할 수 있는 방법은 다음과 같습니다:

```js
numbers = [1, 2, 3, 4, 5]

newlist = [n * 10 for n in numbers]

print(newlist)  # [10, 20, 30, 40, 50]
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

# 5) 중첩된 리스트에 대한 리스트 컴프리헨션

하지만 중첩된 for 루프는 어떻게 할까요? 걱정하지 마세요. 리스트 컴프리헨션은 이를 쉽게 처리할 수 있습니다. 리스트 컴프리헨션을 사용하지 않은 예시를 통해 살펴보겠습니다:

```js
newlist = []

for i in [1, 2]:
    for j in [3, 4]:
        t = (i, j)
        newlist.append(t)

print(newlist) # [(1, 3), (1, 4), (2, 3), (2, 4)]
```

리스트 컴프리헨션을 사용하여 정확히 동일한 작업을 수행할 수 있습니다:

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
newlist = [(i,j) for i in [1,2] for j in [3,4]]

print(newlist) # [(1, 3), (1, 4), (2, 3), (2, 4)]
```

^ 중첩된 for 루프를 리스트 내포로 변환할 때는 외부 for 루프가 먼저 오고, 그 다음에 내부 for 루프가 옵니다.

# 6) 튜플 대 리스트

비기너였을 때 저는 꽤 오랫동안 튜플을 무시했습니다.

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

튜플은 그냥 변경할 수 없는 목록입니다. 변경할 수 없다는 것은 튜플을 만든 후에는 변경할 수 없다는 것을 의미합니다.

```js
# 리스트는 변경할 수 있습니다. .append를 사용하여 만든 후에도 요소를 추가할 수 있습니다.

mylist = [1, 2, 3]

mylist.append(4)
print(mylist)      # [1, 2, 3, 4]
```

```js
# 튜플은 변경할 수 없습니다. 만든 후에는 아무것도 추가할 수 없습니다

mytuple = (1, 2, 3)

mytuple.append(4) # ERROR
```

그래서 튜플은 목록의 안 좋은 버전으로 보입니다. 왜 튜플을 사용해야 할까요?

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

튜플의 불변성의 가장 큰 장점은 해시 가능하다는 것입니다.

- 리스트는 사전 키가 될 수 없지만 튜플은 될 수 있습니다
- 리스트는 집합에 추가할 수 없지만 튜플은 추가할 수 있습니다

```js
# 리스트는 1) 사전 키로 사용할 수 없으며 2) 집합에 추가할 수 없음

d = {
    [1, 2, 3]: 4,
    [5, 6, 7]: 8
}

# ERROR
```

```js
# 하지만 튜플은 가능합니다

d = {
    (1, 2, 3): 4,
    (5, 6, 7): 8
}

# OK
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

# 7) .insert()을 사용하여 특정 인덱스에 새 요소를 삽입합니다.

.append()은 리스트의 뒷부분에만 새 요소를 추가할 수 있습니다.

하지만 .insert()을 사용하면 새 요소를 어떤 인덱스에든 추가할 수 있습니다.

```js
mylist = [1, 2, 3]

# 새 값 100을 인덱스 0에 추가
mylist.insert(0, 100)

print(mylist) # [100, 1, 2, 3]
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

^ 기존 요소가 모두 오른쪽으로 이동해야 하므로 이 작업은 O(n) 시간이 걸립니다.

```js
mylist = [1, 2, 3]

# 인덱스 2에 새로운 요소 150 추가
mylist.insert(2, 150)

print(mylist) # [1, 2, 150, 3]
```

^ 1과 2는 그대로 있지만, 3은 오른쪽으로 이동해야 합니다.

# 8) .pop()을 사용하여 요소 제거

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

.pop() 메소드를 사용하면 2가지 작업을 동시에 할 수 있습니다:

- 리스트의 마지막 요소를 삭제합니다.
- 삭제된 이 요소를 반환합니다.

```js
mylist = [1, 2, 3]

# 마지막 요소 제거하고 x에 할당
x = mylist.pop()

print(x)      # 3
print(mylist) # [1, 2]
```

.pop()에 인덱스를 전달하면 해당 인덱스의 요소를 제거할 수 있습니다.

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
내목록 = [1, 2, 3]

# 인덱스 0의 요소를 제거하고 x에 할당
x = 내목록.pop(0)

print(x)       # 1
print(내목록)  # [2, 3]
```

.pop(n)은 모두 n 이후에 위치한 인데스의 요소를 좌측으로 이동해야 하므로 O(n) 시간이 걸린다는 것을 알아두세요. 이것은 우리 목록이 매우 큰 경우 비효율적일 수 있다는 것을 의미합니다.

# 9) .extend()를 사용하여 목록 결합

.extend()는 한 목록의 모든 요소를 다른 목록에 추가할 수 있게 해줍니다.

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
a = [1, 2, 3]
b = [4, 5, 6]

# b의 모든 요소를 a에 추가합니다.
a.extend(b)

print(a)  # [1, 2, 3, 4, 5, 6]
print(b)  # [4, 5, 6]
```

^ b가 변경되지 않았음에 유의해주세요

# 10) sort() vs sorted()

- `.sort()`은 리스트 자체를 정렬합니다.

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
mylist = [1, 3, 2]

mylist.sort()

print(mylist) # [1, 2, 3]
```

sorted() 함수는 리스트를 정렬한 복사본을 생성합니다. 원본 리스트는 그대로 유지됩니다. 원본 리스트의 순서를 보존하고 싶을 때 이것을 사용합니다.

```js
mylist = [1, 3, 2]

newlist = sorted(mylist)

print(newlist)  # [1, 2, 3]
print(mylist)   # [1, 3, 2]
```

# 11) 사용자 정의 조건으로 .sort()하기

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

**참고— 이것은 .sort()와 sorted()에 대해 동일하게 작동합니다.**

기본 .sort()는 문자열을 알파벳 순서대로 정렬합니다:

```js
fruits = ['orange', 'apple', 'pear']

fruits.sort()

print(fruits) # ['apple', 'orange', 'pear']
```

우리는 .sort()에서 key 인자에 함수를 전달하여 사용자 정의 정렬 조건을 정의할 수 있습니다. 예: list.sort(key=your_function)

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

- 함수는 전체 요소를 가져와서
- 우리가 정렬하려는 값을 반환합니다.

문자열 내의 p의 개수로 정렬하고 싶다고 가정해 봅시다.

- 따라서 사용자 정의 함수는 여전히 전체 요소를 가져와서
- p 문자의 개수를 반환합니다.

```js
def your_condition(element: str) -> int:
    return element.count('p')

fruits = ['orange', 'apple', 'pear']

fruits.sort(key=your_condition)

print(fruits) # ['orange', 'pear', 'apple']
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

테이블 태그를 Markdown 형식으로 변경하세요.

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

노트 - 이 코드는 .sort()와 sorted() 모두에 작동합니다.

학생을 나타내는 각각의 사전이 포함된 목록이 있다고 가정해 봅시다.

```js
students = [
  { name: "A", math: 100, science: 81 },
  { name: "B", math: 100, science: 71 },
  { name: "C", math: 100, science: 91 },
  { name: "D", math: 80, science: 91 },
  { name: "E", math: 80, science: 93 },
  { name: "F", math: 80, science: 92 },
];
```

그리고 그들의 수학 점수에 따라 정렬한다고 가정합시다:

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
students.sort(key=lambda x:x['math'])

print(students)

'''
[
  {'name': 'D', 'math': 80, 'science': 91},
  {'name': 'E', 'math': 80, 'science': 93},
  {'name': 'F', 'math': 80, 'science': 92},
  {'name': 'A', 'math': 100, 'science': 81},
  {'name': 'B', 'math': 100, 'science': 71},
  {'name': 'C', 'math': 100, 'science': 91}
]
'''

^ math=80 at the front, math=100 at the back. But notice that their science score is not sorted.

And what if we want to sort by math first, then science?

- first sort by math score
- for students with the same math score, sort by science score
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

이를 수행하기 위해서는 우리의 주요 함수는 단순히 튜플 (첫 번째 조건, 두 번째 조건)을 반환하면 됩니다. 이 경우에는 (수학 점수, 과학 점수)가 될 것입니다.

```js
students.sort(key=lambda x:(x['math'], x['science']) )

print(students)

'''
[
  {'name': 'D', 'math': 80, 'science': 91},
  {'name': 'F', 'math': 80, 'science': 92},
  {'name': 'E', 'math': 80, 'science': 93},
  {'name': 'B', 'math': 100, 'science': 71},
  {'name': 'A', 'math': 100, 'science': 81},
  {'name': 'C', 'math': 100, 'science': 91}
]
'''
```

그리고 여기서, 수학 점수가 동일한 학생들은 과학 점수에 의해 정렬됨을 주목해 보세요.

참고 — 3가지 조건에 따라 정렬하려면, 단순히 (첫 번째 조건, 두 번째 조건, 세 번째 조건)의 튜플을 반환하면 됩니다.

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

# 결론

이 내용이 명확하고 이해하기 쉬웠으면 좋겠어요!

# 친구들을 위한 Python 농담

# 만약에 제작자로서 저를 지원하고 싶다면

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

- 제 책을 구입해 주세요! — 101 Things I Never Knew About Python
- 확인할 수 있는 곳: [여기](https://payhip.com/b/vywcf)
- 이 이야기를 위해 50번 클랩을 해주세요
- 댓글로 당신의 생각을 남겨주세요
- 이야기 중 가장 좋아하는 부분을 강조해주세요

감사합니다! 이런 작은 행동이 큰 도움이 되고, 정말 감사드립니다!

YouTube: [여기](https://www.youtube.com/@zlliu246)

LinkedIn: [여기](https://www.linkedin.com/in/zlliu/)
