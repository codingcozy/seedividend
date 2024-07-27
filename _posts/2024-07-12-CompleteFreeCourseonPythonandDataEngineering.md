---
title: "완전 무료 강좌 Python과 데이터 엔지니어링 완벽 가이드"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_0.png"
date: 2024-07-12 20:16
ogImage: 
  url: /TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_0.png
tag: Tech
originalTitle: "Complete Free Course on Python and Data Engineering"
link: "https://medium.com/@dataakkadian/complete-free-course-on-python-and-data-engineering-716bb9c94417"
---


파이썬에는 네 가지 복잡한 유형이 있습니다: 리스트, 튜플, 세트 및 사전이 있습니다. 각각에 대해 별도로 이야기하고 실제 예제를 제공하겠습니다.

무료로 읽으려면 다음 링크를 확인하십시오:

## 리스트:

- 리스트는 변경 가능한 요소입니다.
- 문자열, 문자, 정수 및 부동 소수점 숫자와 같은 서로 다른 유형의 항목을 포함 할 수 있습니다.
- 인덱스는 0부터 시작합니다.
- 순서가 있고 중복된 요소가 있습니다. append, remove 및 수정과 같은 연산이 가능합니다.

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

아래 코드는 실제 예시입니다:


![image](/TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_0.png)


# 튜플:

- 변경할 수 없는 데이터입니다.
- 변경할 수 없는 리스트로 사용될 수 있습니다.

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
tuple = (1, 2, 3, 4, 5, "b", "c", "d")
```

3. 필드의 컬렉션으로 사용될 수 있으며, 요소의 수가 고정되어 있고 순서가 중요합니다.

```python
city, year, pop, chg, area = ('Tokyo', 2003, 32_450, 0.66, 8014)
```

아래 코드는 실제 예시입니다:

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


![Course Image](/TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_1.png)

# Sets:

- Mutable data.
- Elements are not ordered, nor duplicated.
- Sets are hashable so it’s highly optimized.
- Sets use a hashtable as its underlying data structure. This explains the O(1) membership checking, since looking up an item in a hashtable is an O(1) operation, on average.
- Operations between sets can be union, intersection, difference, or symmetric difference.

The code below is a practical example:


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


![이미지](/TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_2.png)

# 딕셔너리:

- 키-값 쌍이다.
- 키: 어떤 불변 유형이며 유일하다.
- 값: 불변 또는 가변 유형이 될 수 있다.
- 데이터를 효율적으로 조회한다.
- 키로 접근한다.
- 파이썬에서 딕셔너리는 해시 테이블로 구현된다.
- 키는 해시 가능한 객체여야 한다. 적절한 __hash__ 및 __eq__ 메서드를 구현해야 한다.
- 키에 의한 항목 접근은 매우 빠르다. 딕셔너리에 수백만 개의 키가 있을 수 있지만, 파이썬은 키의 해시 코드를 계산하고 해시 테이블에 대한 색인 오프셋을 파생하여 키를 직접 찾을 수 있으며 일치하는 항목을 찾기 위해 소수의 시도를 하게 된다.
- Python 3.7부터 dict 내장의 새로운 개선 사항은 다음과 같다: 사전 객체의 삽입 순서 보존 속성은 파이썬 언어 사양의 공식 부분으로 선언되었다. 이는 더 이상 OrderedDict가 필요하지 않다는 것을 의미한다. 거의 똑같다.

![이미지](/TIL/assets/img/2024-07-12-CompleteFreeCourseonPythonandDataEngineering_3.png)


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

# NumPy Arrays:

- 동일한 유형의 객체로 구성된 다차원 배열이다.
- NumPy 배열은 List보다 우수하다:
- List보다 효율적으로 저장된다.
- 수학 연산을 벡터화할 수 있어, Python에서 List를 순회하는 것보다 성능이 높다.
- 연산:
- 숫자 연산: sin, cos, max, mean, variance, standard deviation, dot product.
- 비숫자 연산: 색인, 슬라이싱, 쌓기, 분할, 논리 연산.

# 참고 자료:

세트는 어떻게 구현되었나요?

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

Dict 대 OrderedDict

Dict은 파이썬의 해시 테이블입니다.

파이썬 공부 교재

# 감사 노트:

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

각자의 시간을 내어 저의 글을 읽어 주셔서 감사의 말씀 전하고 싶습니다. 여러분의 지지와 참여는 저에게 너무나 소중하며, 이 멋진 청중과 제 생각과 통찰을 나눌 수 있는 기회에 진심으로 감사드립니다. 여러분의 팔로우는 저에게 가치 있는 내용을 만들기 위해 더 나은 자아를 추구하도록 영감을 줍니다. 오랜 구독자이든 새로 오신 독자이든, 여러분의 존재가 중요하며, 지지에 깊은 감사를 표합니다. 여러분과 공감되고 영감을 주는 고품질 글을 제공하기 위해 헌신할 것입니다. 여러분의 피드백과 댓글은 글쓰기에 대한 열정을 불어 넣어주고, 지속적인 성장을 동기부여합니다. 이 청중의 일원으로 함께해 주셔서 감사합니다. 여러분이 제 커뮤니티의 일원으로 있어 기쁘게 생각하며, 미래에도 여러분과 여러 새로운 아이디어를 공유하기를 기대합니다.

코드가 필요하시다면 구독하고 메시지 보내주세요.

감사합니다.