---
title: "모든 개발자가 알아야 할 Top 10 Python 인터뷰 질문"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-09 20:28
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Top 10 Python Interview Questions Every Developer Must Know"
link: "https://medium.com/top-python-libraries/top-10-python-interview-questions-every-developer-must-know-de7894fb3826"
---


## 파이썬 인터뷰 질문

전 세계에는 800만 명 이상의 파이썬 개발자가 있습니다. 매일 수천 명의 새로운 학습자가 파이썬 커뮤니티에 가입합니다. 혹독한 진실은, 그 중에서도 단 10~20%만이 좋은 개발자가 되어 좋은 직장을 찾을 수 있습니다. 이유는 고급 인터뷰 질문을 해결하지 못하기 때문입니다. 이제 10가지 중요하고 흔한 파이썬 인터뷰 질문을 공유하겠습니다.

# `.py` 파일과 `.pyc` 파일의 차이는 무엇인가요?

`.py` 파일은 프로그램의 소스 코드입니다. `.pyc` 파일은 컴파일된 바이트 코드입니다.

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

파이썬은 `.py` 파일을 컴파일하여 `.pyc` 파일로 저장하고, 이 파일은 파이썬 가상 머신에서 실행됩니다.

주 소스 코드를 실행하기 전에 파이썬은 컴파일된 버전인 `.pyc` 파일을 찾습니다. 찾았다면 해당 파일을 가상 머신으로 실행합니다. 찾지 못했다면 `.py` 파일을 컴파일하고 실행합니다. 요컨대, `.pyc` 파일은 이미 컴파일된 코드를 재사용하여 컴파일 시간을 단축해줍니다.

# 추상화란 무엇인가요? 파이썬에서는 어떻게 추상화를 구현할 수 있나요?

추상화는 내부 함수를 사용자로부터 숨기는 것을 말합니다. 사용자는 결과가 어떻게 생성되었는지 알지 못한 채 함수와 상호 작용합니다.

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

간단히 말하면, 추상화는 프로그램 복잡성을 줄이기 위해 관련 없는 데이터를 숨기는 것을 의미합니다. 파이썬에서는 추상화를 달성하기 위해 ABC 모듈을 사용합니다.

추상 클래스는 다른 클래스의 기반으로 사용할 수 있습니다. 추상 클래스의 객체는 생성할 수 없으므로 요소에 액세스하는 유일한 방법은 상속을 통해서입니다.

```python
from abc import ABC, abstractmethod
```

```python
class Parent(ABC):
    @abstractmethod
    def show(self):
        pass
  
class child(Parent):
    def show(self):
        print("Child Class")
obj = child() # 추상 클래스는 인스턴스화 할 수 없습니다
obj.show() # Child Class
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

# FrozenSet이란 무엇인가요? 예시와 함께 중요성을 설명해주세요.

FrozenSets는 set과 비슷하지만 변경할 수 없습니다.

`set` 요소를 언제든지 수정할 수 있지만, 생성된 후에는 `frozenset`을 변경할 수 없습니다.

생성 후에는 요소를 추가, 삭제 또는 업데이트할 수 없습니다. `frozenset`은 반복 가능한 항목을 입력으로 받아들이고 변경할 수 없게 만듭니다. 변경할 수 없기 때문에 딕셔너리의 키로 사용할 수 있습니다.

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
data = {"Name": "Roger", "Pin": 3056, "ActNo":9892345112234565}
fSet = frozenset(data)
print(fSet) # frozenset({'Name', 'Pin', 'ActNo'})
```

**얕은 복사와 깊은 복사의 차이를 설명해보겠습니다.**

`얕은 복사`는 객체에 대한 참조를 새로운 메모리 위치에 저장합니다. 새로운 위치에서의 변경 사항은 이전 위치에 반영됩니다. 깊은 복사보다 더 빠릅니다.

`깊은 복사`는 객체의 값을 새로운 위치에 저장합니다. 새 위치에서의 변경 사항이 이전 위치에 영향을 미치지 않습니다.

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

`id` 는 객체의 메모리 주소를 보는 데 사용됩니다. 예시에서의 주소는 여러분의 컴퓨터에서 다를 수 있습니다.

```js
## 얕은 복사
data = [1, 2, 3, 4, 5]
updated_data = data
updated_data.append(6)
print(updated_data) # [1, 2, 3, 4, 5, 6]
print(data) # [1, 2, 3, 4, 5, 6]
print(id(data)) # 16777216
print(id(updated_data)) # 16777216
```

```js
## 깊은 복사
import copy
data = [1, 2, 3, 4, 5]
updated_data = copy.deepcopy(data)
updated_data.append(6)
print(updated_data) # [1, 2, 3, 4, 5, 6]
print(data) # [1, 2, 3, 4, 5]
print(id(updated_data)) # 16777216
print(id(data)) # 14020317
```

# pickle을 사용하는 방법은요?

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

`피클링(Pickling)`은 Python 객체를 바이트 스트림으로 변환하여 직렬화하는 것을 말합니다.

`언피클링(Unpickling)`은 그 반대로, 바이트 스트림을 다시 Python 객체로 변환하여 역직렬화하는 것을 의미합니다.

Python에서는 직렬화와 역직렬화를 위해 `pickle.dump`와 `pickle.load`를 사용합니다.

```python
## Pickling
import pickle
data =  {
    'Names': ["Karl","Robin","Lary"],
    'Id': ('G770531','G770532','G770533'),
    'Salary':[55600,88900,76000]
    }
output = open('./data.pkl', 'wb')
pickle.dump(data, output)
output.close()
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
## 피클링
import pickle
stream = open('./data.pkl', 'rb')
data = pickle.load(stream)
print(data) # {'Names': ['Karl', 'Robin', 'Lary'], 'Id': ('G770531', 'G770532', 'G770533'), 'Salary': [55600, 88900, 76000]}
stream.close()
```

# *args와 **kwargs가 무엇인가요?

*args와 **kwargs는 함수에 가변 개수의 인수를 전달하는 것을 가능하게 합니다. 전달되는 인수가 몇 개인지 확신이 없을 때 사용합니다.

*args는 함수에 가변 개수의 인수를 전달하는 것을 가능하게 합니다.


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
def addNumbers(*numbers):
    sum = 0
    for number in numbers:
        sum = sum + number
    print("Sum: ", sum)
addNumbers(3,5) # Sum: 8
addNumbers(5,6,7) # Sum: 18
```

**kwargs는 함수에 변수 수의 키워드 인수를 전달하는 데 사용됩니다.

```python
def addNumbers(**data):
    sum = 0
    for key, value in data.items():
        sum = sum + value
    print("Sum: ", sum)
    
addNumbers(a=5, b=6) # Sum: 11
addNumbers(a=5, b=8, c=10) # Sum: 23
```

# 파이썬에서 컨텍스트 매니저란 무엇인가요?

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

컨텍스트 관리자는 리소스를 관리합니다. 필요에 따라 리소스를 할당하고 해제할 수 있게 해줍니다.

가장 일반적인 예시는 `with` 문입니다.

주로 파일을 열고 닫는 데 사용됩니다.

`with`를 사용하면 코드 한 줄에서 문제가 발생해도 파일이 올바르게 닫힙니다.

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
with open('./data.txt', 'w') as f:
    f.write("Hello")
```

# 파이썬에서 인스턴스 메소드, 클래스 메소드 및 정적 메소드란 무엇인가요?

파이썬에서는 세 가지 종류의 메소드가 있습니다: 인스턴스 메소드, 클래스 메소드 및 정적 메소드.

- 인스턴스 메소드: 클래스 내에 만드는 일반적인 메소드로, 객체와 관련이 있습니다. 인스턴스를 가리키기 위해 `self`를 사용합니다.
- 클래스 메소드: 객체가 아닌 클래스에 바운드된 메소드로, 클래스 수준의 작업을 수행하며 클래스 상태를 변경할 수 있습니다. `@classmethod` 데코레이터를 사용합니다.
- 정적 메소드: 클래스 내에 정의되어 있지만 클래스 자체와 관련이 없는 논리를 명확하게 하기 위해 사용합니다. `@staticmethod` 데코레이터를 사용합니다.

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

# nonlocal과 global 변수란 무엇인가요?

이들은 변수의 범위를 정의합니다. Global 변수는 함수 외부에서 정의됩니다.

```js
pi = 3.14  ## Global 변수
def circle(radius):
    area_of_circle = pi * (radius) ** 2
    print("원의 면적은: ", area_of_circle)
circle(7) # 원의 면적은: 153.86
```

이들의 값은 코드 전체에서 동일하며 프로그램의 어디에서든 사용할 수 있습니다.

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

중첩 함수에서 정의된 로컬 스코프 없이 비로컬 변수가 사용됩니다. 비로컬 변수의 값을 변경하면 로컬 변수의 값도 변경됩니다.

```js
def outer_function():
    x = "로컬 변수"
    def inner_function():
        nonlocal x
        x = "비로컬 변수"
        print("내부 함수:", x)
    inner_function()
    print("외부 함수:", x)
outer_function()
# 내부 함수: 비로컬 변수
# 외부 함수: 비로컬 변수
```

# 예제와 함께 제너레이터에 대해 설명해주세요.

제너레이터(generator)는 순회 가능한 객체(iterable objects)를 반환하는 함수입니다. 하나 이상의 `yield` 문을 포함해야 합니다.

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

`yield`은 함수의 현재 상태나 로컬 변수 참조를 잃지 않고 값을 반환하는 키워드입니다. `yield`가 포함된 함수를 제너레이터라고 부릅니다.

제너레이터는 필요할 때만 항목을 생성하여 메모리를 효율적으로 사용합니다.

초보자들에게 `yield`를 함수를 중지하지 않고 값을 반환하는 `return`으로 생각해보세요.

```js
def fibon(limit):
    a,b = 0,1
    while a < limit:
        yield a
        a, b = b, a + b
        
for x in fibon(10):
    print(x) # 1 2 3 5 8 13 21 34 55 89
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

# 결론

저는 10가지 흔한 Python 면접 질문을 공유했습니다. 이 질문들이 직장을 바꾸거나 직장을 찾을 때 도움이 되길 바라요!

저는 “Medium에서 빠르게 팔로워를 얻는 방법”에 대한 eBook을 쓰고 있어요. 왜냐하면 저는 최고의 증거이기 때문이죠 — 딱 한 달 만에 5,000명 이상의 팔로워를 얻었어요. 기대해주세요!

저는 Substack에서 "GPT 소개" 시리즈를 쓰고 있어요. 관심 있으시면 팔로우 해주세요!

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

10개의 글 중 10번째가 이미 완료되었습니다!

읽어주셔서 감사합니다📖, 강조해주셔서 감사합니다🖍️, 박수를 보내주셔서 감사합니다👏, 댓글을 달아주셔서 감사합니다💬, 그리고 공유해주셔서 감사합니다🗣️. "미디움의 친구"로써, 저는 매일 동료 작가들에게 제 게시물을 봐주며 보답하려 노력합니다.

최신 AI 이야기에 대한 소식을 받으려면 Substack에서 저희와 연락을 유지하세요. 함께 AI의 미래를 함께 만들어 봅시다!