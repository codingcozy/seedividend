---
title: "30초 만에 이해하는 Python의 연산자"
description: ""
coverImage: "/assets/img/2024-08-17-PythonsOperatorIn30Seconds_0.png"
date: 2024-08-17 01:30
ogImage:
  url: /assets/img/2024-08-17-PythonsOperatorIn30Seconds_0.png
tag: Tech
originalTitle: "Pythons  Operator In 30 Seconds"
link: "https://medium.com/@zlliu/pythons-operator-in-30-seconds-3172c3ad4a77"
isUpdated: true
updatedAt: 1723864230359
---

안녕하세요! 아래는 Markdown 형식으로 표를 변경한 것입니다.

![이미지](/assets/img/2024-08-17-PythonsOperatorIn30Seconds_0.png)

이건 참 뜻밖의 일이었어요.

이 파이썬 연산자는 내가 여태껏 놓쳐 왔던 것이었어요. 그런데 이제야 알게 되었네요.

@ 연산자는 행렬 곱셈을 위한 연산자에요. (데코레이터 구문의 @와는 구분해야 합니다)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
결과 = 행렬1 @ 행렬2
```

우리는 주로 numpy에서 이것을 사용해요

# Numpy의 간단한 예시

우리는 numpy에서 @를 사용하여 행렬 곱셈을 수행합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
import numpy as np

m1 = np.array([[1, 2], [3, 4]])
m2 = np.array([[1, 2], [2, 1]])

print(m1 @ m2)

# [[ 5  4]
#  [11 10]]
```

여기서는 @ 연산자를 사용하여 2개의 행렬 m1과 m2를 곱해줍니다.

# **matmul**을 사용하여 사용자 정의하기

이를 사용자 정의하려면 **matmul** 매직 메서드를 정의하기만 하면 됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
class Dog:
    def __matmul__(self, other):
        return f'hello {other}'

dog = Dog()

print(dog @ 500)    # hello 500
```

기본적으로 객체는 **matmul** 매직 메서드를 정의하지 않는 한 @ 연산자를 사용할 수 없음을 유념하십시오.

```js
class Dog:
    pass

dog = Dog()

print(dog @ 500)    # ERROR
```

# 결론

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

**matmul**을 사용하면 이제 객체들이 @ 연산자를 사용할 수 있습니다. 이해하기 쉽고 명확했기를 바랍니다.

# 만약 제가 크리에이터로서 저를 지원하고 싶다면

- https://zlliu.substack.com/ 에서 내 Substack 뉴스레터 가입하기 - 나는 매주 Python에 관련된 이메일을 보냅니다.
- https://payhip.com/b/vywcf 에서 나의 책 101 Things I Never Knew About Python 구매하기
- 이 이야기에 대해 50번 박수치기
- 여러분의 생각을 나에게 알려 주는 댓글 남기기
- 이야기 중 가장 마음에 드는 부분을 강조하기

감사합니다! 이 작은 행동들이 많은 도움이 되고, 정말 감사합니다!

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)
