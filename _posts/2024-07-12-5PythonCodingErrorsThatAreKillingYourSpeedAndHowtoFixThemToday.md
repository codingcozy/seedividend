---
title: "파이썬 속도를 떨어뜨리는 다섯 가지 코딩 실수 및 오늘 해결하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-5PythonCodingErrorsThatAreKillingYourSpeedAndHowtoFixThemToday_0.png"
date: 2024-07-12 20:38
ogImage: 
  url: /TIL/assets/img/2024-07-12-5PythonCodingErrorsThatAreKillingYourSpeedAndHowtoFixThemToday_0.png
tag: Tech
originalTitle: "5 Python Coding Errors That Are Killing Your Speed (And How to Fix Them Today)"
link: "https://medium.com/python-in-plain-english/5-python-coding-errors-that-are-killing-your-speed-and-how-to-fix-them-today-8064f4d32e20"
---


<img src="/TIL/assets/img/2024-07-12-5PythonCodingErrorsThatAreKillingYourSpeedAndHowtoFixThemToday_0.png" />

안녕하세요, 파이썬 개발자 여러분! 저는 구글 출신인 다니엘입니다. 현재는 Django를 사용하여 웹 애플리케이션을 개발하고 파이썬에 대한 집착을 키우는 데 시간을 할애하고 있습니다. 저는 주말에는 Medium에서 활발하게 활동하며 시간이 흐른 만큼 축적한 가치 있는 통찰을 전달하고, 여러분을 프로그래밍 대가로 변신시키기 위해 노력하고 있습니다.

솔직히 말해서, 무력한 거북이 속도로 작동하는 파이썬 스크립트로 인한 특정 유형의 좌절감이 있죠. 웹 사이트가 느려 보이거나 데이터 분석 업무가 몇 시간 동안 계속되는 경우든, 느린 코드는 모든 관련자들에게 나쁜 경험을 안겨주며 프로젝트의 성과를 위협할 수도 있습니다.

하지만 걱정하지 마세요! 이 글에서는 제가 보고(심지어 제가 직접 한 것) 온갖 성능 저하 요인을 분석해 보여드릴 것입니다. 그리고 어떤 것을 하지 말아야 하는지뿐만 아니라, 실제 해결책과 코드 예제를 제공하여 여러분의 스크립트를 부드럽고 강력한 파이썬 기계로 만들어 줄 겁니다.

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

# 실수 #1: 1999년처럼 루핑하기

알다시피, 제가 다른 개발자들처럼 잘 만들어진 for 루프에 대한 애정이 매우 큽니다. 이것들은 우리 작업의 많은 부분을 이루는 기초를 형성합니다. 그러나 특히 대규모 데이터셋에서 순수한 속도에 대해 논의할 때, 신뢰할 수 있는 루프들은 부스트보다는 무게 같이 느껴질 수 있습니다.

## 예시: 몇 개의 숫자를 더해봅시다

거대한 숫자 목록의 제곱을 합산해야 한다고 상상해보세요. 여기에는 루프 방식이 있습니다:

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
numbers = [1, 2, 3, 4, 5, ... , 10000]  # A big list
total = 0
for number in numbers:
    squared = number * number
    total += squared
```

이렇게 해도 괜찮아 보이지만 실제로는 Python이 각 요소마다 많은 개별 계산을 수행하고 있습니다.

## 해결책: NumPy가 구해줄게요!

이것이 NumPy가 슈퍼히어로처럼 나타나는 곳입니다. 이것은 벡터화에 관한 모든 것입니다 — 한 번에 전체 배열에 대한 연산 수행하기. 그 예시를 다시 써보겠습니다:

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
import numpy as np

numbers = np.array([1, 2, 3, 4, 5, ... , 10000])  
squared = numbers * numbers  # Vectorized squaring!
total = squared.sum()
```

Boom! Instead of processing element by element, NumPy takes care of the entire calculation in one go.

## Bonus: The Comprehensible Compromise

List comprehensions are like the stealthy middle ground:

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
total = sum(number * number for number in numbers)
```

일반적인 루프보다 빠르지만, 강력한 숫자 계산을 위한 NumPy만큼의 세기는 아닐 수 있습니다.

# 실수 #2: 잘못된 도구 선택

망치 하나만으로 집을 짓는다고 상상해보세요. 집을 완성할 수는 있지만, 정말 혼란스러울 것입니다. 마찬가지로, Python에서 모든 작업에 대해 리스트만을 의존하는 것은 등이 뒤로 돌아가있는 채 프로그래밍하는 것과 같습니다.

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

## 예시: 내 전화번호는 어디에?

만약 다음과 같이 연락처 목록이 있다면:

```js
contacts = [
    {"name": "Alice", "phone": "123-4567"},
    {"name": "Bob", "phone": "789-0123"},
    # ... 추가 연락처
]
```

Bob의 전화번호를 찾으려면 목록을 훑어봐야 합니다. 모든 연락처를 확인해야 할 수도 있어요! 어떡하지?

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

## 문제 해결: 초능력을 지닌 데이터 구조들

- Dictionaries: 키를 이용한 신속한 검색 파트너 키(예: "이름")로 검색하는 경우, 사전이 당신의 신뢰할 수 있는 도우미가 될 것입니다.

```js
contacts_dict = {
    "Alice": "123-4567",
    "Bob": "789-0123",
    # ... 더 많은 연락처
}
bobs_number = contacts_dict["Bob"]  # 즉시 접근!
```

- Sets: 고유성 강제하기 고유한 웹사이트 방문자들을 추적해야 하는가요? Set은 중복을 자동으로 제거합니다.

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
unique_visitors = set()
unique_visitors.add("192.168.1.100")
unique_visitors.add("124.58.23.5")
unique_visitors.add("192.168.1.100")  # No duplicate added
```

파이썬 노하우 도구로는 순서가 있는 딕셔너리, 특별 큐를 위한 데크 등이 준비되어 있어요. 이 도구를 언제 사용해야 하는지 알아두면 좋은 스크립트와 훌륭한 스크립트를 구분할 수 있어요.

# 실수 #3: 어둠 속에서 최적화하기

코드가 느릴 것 같은 느낌을 익히 알고 계실 거예요. 그런데 그 이유가 왜 그런지는 모르겠다고요. 토치(Torch) 없이 누수하는 천장을 고치는 것과 유사합니다. 화가 난답니다! 여기서 프로파일러(Profiler)가 등장합니다.


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

## 예시: 예상하지 못한 범인

가정해 봅시다. 피보나치 수를 계산하는 복잡한 함수가 있다고 상상해 보세요. 수학을 정밀하게 다듬기 위해 많은 노력을 기울였지만 여전히 속도가 느립니다. 결과를 파일에 기록하는 방식이 마치 은밀한 것처럼 작용하는 것이 병목일 수도 있습니다.

## 해결책: cProfile이 구원해줍니다!

Python의 내장 cProfile 모듈이 성능 탐지 요원이 됩니다. 다음은 그 사용법입니다:

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
import cProfile

def my_function():
    # 프로파일링할 코드 입력

cProfile.run('my_function()')
```

이 코드는 여러 가지 통계를 생성합니다. 주요 확인 사항은 다음과 같습니다:

- ncalls: 함수가 호출된 횟수.
- tottime: 함수 내에서 총 소요된 시간.
- cumtime: tottime과 유사하지만 해당 함수 내에서 호출된 모든 함수에서 소요된 시간을 포함합니다.

단서를 통해 정보 확인하기 위해 이러한 숫자들은 실제 병목 현상을 찾아내는 데 도움이 됩니다. 최적화 노력을 가장 큰 영향을 줄 수 있는 곳에 집중할 수 있도록 도와줍니다.

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

# 오류 #4: DIY 함정

여기 뭐든지 처음부터 만드는 충동이 강하죠. 이해해요! 하지만 때로는 발명의 바퀴를 다시 만드는 것은 비행기에 타지 않고 나라를 걸어 다니기로 결정하는 것과 같아요. Python은 극도로 최적화된 내장 함수로 여러분을 지원해줄 거예요.

## 예시: 정렬해봅시다

숫자 목록을 정렬해야 하나요? 버블 정렬을 구현해 볼 수도 있지만... Python의 sorted()를 사용해보는 것은 어떨까요?

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
my_list = [5, 3, 1, 4, 2]

# The long way (probably pretty slow)
def my_bubble_sort(list): 
   # ... your sorting code here

# The Pythonic way
sorted_list = sorted(my_list)
```

아마도 사용자 정의 정렬 알고리즘은 내장 알고리즘의 효율성에 거의 미치지 못할 것입니다.

문제 해결법: 보물 창고를 발견하세요

Python 표준 라이브러리는 개발자의 가장 좋은 친구입니다. 이러한 강력한 기능들을 알아보세요:

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

- itertools: 이터레이터 작업을 강화해주는 모듈 (효율적인 반복문을 위한 상급 루프라고 생각해보세요)
- heapq: 힙(heap)을 관리하기 위한 모듈 (우선순위 큐에 관심 있으신가요?)
- bisect: 정렬된 리스트를 유지하고 빠르게 동작하는 모듈

기억해주세요: 내장 함수를 배우는 데 시간을 투자하면 나중에 최적화하는 데 시간을 절약할 수 있습니다.

# 실수 #5: 하드 드라이브와 너무 많이 대화하기

컴퓨터의 메모리(RAM)를 초고속 작업 영역, 하드 디스크를 도시 반대편에 있는 저장 창고로 생각해보세요. 파일에 접근하거나 수정할 때마다 전달원을 왕복하도록 하는 것과 같습니다. 너무 많은 왕복으로 코드가 대기하는 것처럼 느껴지기 시작합니다.

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

## 예시: 라인별 처리 지연

대용량 로그 파일을 처리한다고 가정해보겠습니다:

```js
with open("huge_log.txt", "r") as file:
    for line in file:
        # 각 라인을 천천히 처리합니다
```

각 라인을 읽을 때마다 하드 드라이브에서 별도의 가져오기가 필요합니다. 아야!

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

## 문제 해결: 더 똑똑하게 일하기

- 한 번에 모두 읽기(용량이 작을 때): 작은 파일의 경우, 때로는 파일 전체를 메모리에 한꺼번에 불러오는 것이 가장 빠릅니다:

```js
with open("huge_log.txt", "r") as file:
    contents = file.read() 
    # 메모리에서 내용 처리
```

- 버퍼링으로 구조화: 세밀한 제어가 필요할 때, 버퍼링이 도움이 됩니다.

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
with open("huge_log.txt", "r") as file:
    while True:
        chunk = file.read(4096)  # Read in chunks
        if not chunk:
            break
        # Process the chunk
```

블록으로 생각하라, 바이트로는 아니다. "창고"로의 왔다갔다를 최소화하면 굉장한 영향을 미친다.

# 결론: 파이썬에 올인하세요!

자, 이제 우리의 속도 저하는 원인을 다시 한 번 요약해 봅시다:

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

- 루프 과부화: NumPy로 벡터화를 활용해보세요.
- 잘못된 도구: 룩업에는 사전, 고유성에는 세트... 현명하게 선택하세요!
- 맹목적 최적화: 실제 병목 현상을 확인하기 위해 cProfile로 프로파일링하세요.
- 직접 만들기 열풍: Python의 내장 함수들은 여러분의 친구입니다. 활용하세요!
- 디스크 부하 너무 많이: 전략적으로 읽고 현명하게 버퍼링하세요.

성능은 일회성 수정이 아닙니다. 이것을 마라톤 훈련처럼 생각해보세요: 코드를 프로파일링하고 핫 스팟을 최적화한 뒤, 이 과정을 반복하세요. 곧 여러분은 치타처럼 우아하게 실행되는 Python 스크립트를 가지게 될 것입니다.

## 행동 요구

이것을 실천하실 준비가 되셨나요? 여러분의 코드에서 이러한 실수를 찾아보세요! 여러분이 얻는 속도 향상에 대한 소식을 듣고 싶습니다. 결과를 댓글로 공유해주세요. 함께 최적화를 축하해봐요!

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

## 더 알고 싶나요?

만약 이 내용이 도움이 되었다면, 더 많은 Python 팁과 트릭을 보기 위해 제 Medium을 팔로우해주세요. 좋은 리뷰는 언제나 환영이에요 😉. 그리고, 컨텐츠를 좋아하신다면, Patreon에 가입하여 독점 혜택을 받거나, 제가 Python에 대해 종일 이야기를 나누는 Discord 커뮤니티에 가입해보세요.

## 즐거운 코딩되세요!

# 쉽게 이해할 수 있는 English 🚀

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

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 클랩하고 팔로우해 주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠 확인 가능합니다