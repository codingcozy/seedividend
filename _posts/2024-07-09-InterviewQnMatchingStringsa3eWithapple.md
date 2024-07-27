---
title: "인터뷰 질문 apple과 a3e 문자열 매칭 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-InterviewQnMatchingStringsa3eWithapple_0.png"
date: 2024-07-09 09:10
ogImage:
  url: /assets/img/2024-07-09-InterviewQnMatchingStringsa3eWithapple_0.png
tag: Tech
originalTitle: "[Interview Qn] Matching Strings “a3e” With “apple”"
link: "https://medium.com/@zlliu/interview-qn-matching-strings-a3e-with-apple-5b0740e84a74"
---

![image](/TIL/assets/img/2024-07-09-InterviewQnMatchingStringsa3eWithapple_0.png)

함수 match(string, pattern)을 작성하세요. 이 함수는 2개의 문자열을 입력받고, 문자열이 값과 일치하면 True를 반환하고 그렇지 않으면 False를 반환합니다.

- string은 사과(apple) 오렌지(orange)와 같은 문자만 포함하는 일반 문자열입니다.
- pattern은 a3e와 같은 문자와 숫자를 포함하는 문자열입니다.

일부 예시:

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

- a3e은 apple과 일치합니다. 3은 ppl 3자리와 일치합니다.
- a4e는 apple과 일치하지 않습니다. apple에서 a와 e 사이에 4개의 문자가 아닌 3개의 문자가 있기 때문입니다.
- a2e는 apple과 일치하지 않습니다. apple에서 a와 e 사이에 2개의 문자가 아닌 3개의 문자가 있기 때문입니다.

```js
def match(string: str, pattern: str) -> bool:
    """
    string: 문자열 예: 'apple', 'orange'
    pattern: 예: 'a2e', 'a3e'
    """
    # 할 일

testcases = [
    ('apple', 'a3e', True),
    ('apple', '4e', True),
    ('apple', 'a1p1e', True),
    ('apple', '5', True),
    ('apple', 'a4e', False),
    ('apple', 'a2x', False),
    ('apple', '4', False),
    ('apple', '6', False),
    ('appleorangepear', '15', True),
    ('appleorangepear', 'a12ar', True),
    ('appleorangepear', 'a13r', True),
    ('appleorangepear', '14r', True),
    ('appleorangepear', 'a13ar', False),
    ('appleorangepear', '16'…
```
