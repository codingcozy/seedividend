---
title: "이진 트리 출력용 파이썬 패키지 제작기 재미로 했어요"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-ICreatedAPythonPackageToPrintBinaryTreesForFun_0.png"
date: 2024-07-12 20:57
ogImage: 
  url: /TIL/assets/img/2024-07-12-ICreatedAPythonPackageToPrintBinaryTreesForFun_0.png
tag: Tech
originalTitle: "I Created A Python Package To Print Binary Trees For Fun"
link: "https://medium.com/gitconnected/i-created-a-python-package-to-print-binary-trees-for-fun-e68011db9b08"
---


<img src="/TIL/assets/img/2024-07-12-ICreatedAPythonPackageToPrintBinaryTreesForFun_0.png" />

이번에 이진 트리와 힙을 다루다가, 나만의 트리를 빠르고 쉽게 표시하고 시각화하는 방법이 필요했어요.

그래서 온라인에서 Python 패키지를 검색해보니 몇 개가 그 역할을 해줄 수 있었어요. 그래도 사용하기가 귀찮은 경우가 많았어요.

기존 솔루션을 사용하고 코드를 약간 더 써가며 내 시간을 낭비하는 대신, 개발자들이 흔히 하는 것처럼, 몇 일을 허비해서 처음부터 내가 직접 패키지를 만들기로 결정했죠.

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

# 내 패키지 — print-btree

내 패키지를 설치하는 방법:

```js
pip install print-btree
```

Github: https://github.com/zlliu246/print_btree

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

# 기본 사용 방법

```js
from print_btree import print_btree

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# 이진 트리를 만드세요
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

print_btree(root)

'''

 __1__
 |   |
_2_  3 
| |    
4 5   

'''
```

만약 이진 트리 Node가 .val .left 및 .right를 사용한다면, print_btree 함수를 간단히 가져와 트리를 출력할 수 있습니다

# 노드가 다른 이름을 사용하는 경우 어떻게 하나요?

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
from print_btree import print_btree

class BNode:
    def __init__(self, value):
        self.value = value
        self.left_node = None
        self.right_node = None

root = BNode(1)
root.left_node = BNode(2)
root.right_node = BNode(3)
root.left_node.left_node = BNode(4)
root.left_node.right_node = BNode(5)
root.right_node.right_node = BNode(100)

# we pass in the names here
print_btree(root, 
            val='value',
            left='left_node',
            right='right_node')

'''

 __1__
 |   |
_2_  3__
| |    |
4 5   100

'''
```

저희 클래스는 다음과 같이 사용합니다:

- 노드 대신 BNode
- .val 대신 .value
- .left 대신 .left_node
- .right 대신 .right_node

문제없이 이 이름들을 print_btree에 전달할 수 있습니다.

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

# 일부로 매우 긴 값 이름을 지원합니다

```js
from print_btree import print_btree

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = Node('apple')
root.left = Node('pie')
root.right = Node('juice')
root.left.left = Node('pear')
root.left.right = Node('pineapplejuice')
root.right.right = Node('durian')

print_btree(root)

'''
       ________apple________
       |                   |
 _____pie_____           juice_
 |           |                |
pear   pineapplejuice       durian

'''
```

물론, Node(`appleorangepearwithcherriesontop`) 같은 값이 들어있는 경우, 출력된 이진 트리 모양은 여전히 잘못 보일 수 있어요

# 빠른 논리 요약

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

가정하에 이진 트리를 출력해야 한다고 가정합시다.

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = Node('apple')
root.left = Node('pie')
root.right = Node('juice')
root.left.left = Node('pear')
root.left.right = Node('pineapplejuice')
root.right.right = Node('durian')

'''
       ________apple________
       |                   |
 _____pie_____           juice_
 |           |                |
pear   pineapplejuice       durian
'''
```

단계 1) 이진 트리를 2D 리스트로 변환하세요.

```python
# 입력
root

# 출력
[
    ['apple'],
    ['pie', 'juice'],
    ['pear', 'pineapplejuice', None, 'durian']
]

# 참고: None 값은 순서를 유지하기 위해 유지됩니다.
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

테이블 태그를 마크다운 형식으로 변경해주세요.

Step 2) 가장 아래에 있는 목록에서 문자열 생성하기

```js
['pear', 'pineapplejuice', None, 'durian']

# 다음과 같은 형태로 변환

'pear   pineapplejuice  ?   durian'

# None 값은 ?으로 변환됩니다
```

Step 3) 이전 문자열에서 값과 일치하는 파이프 |를 포함하는 문자열 생성하기

```js
# 다음과 같은 문자열에서
'pear   pineapplejuice  ?   durian'

# 다음을 생성
' |           |          |    |'


# 현재는 트리의 기초만 갖추어져 있습니다
'''
 |           |         |     |
pear   pineapplejuice  ?   durian
'''
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

"4단계) 다음으로 아래에 있는 목록에서 문자열 생성하기

```js
# from 
['pie', 'juice']    # 그리고
' |        |      |      |  '

# generate
' _____pie_____           juice_'


# 현재 우리가 가지고 있는 것
'''
 _____pie_____          _juice_
 |           |          |     |
pear   pineapplejuice   ?   durian
'''
```

5단계) 루트에 도달할 때까지 단계 3과 4 반복하기

```js
'''
 _____pie_____          _juice_
 |           |          |     |
pear   pineapplejuice   ?   durian
'''

# 다음으로

'''
       |                   |
 _____pie_____          _juice_
 |           |          |     |
pear   pineapplejuice   ?   durian
'''

# 그리고 아래처럼 변환됩니다

'''
       ________apple________
       |                   |
 _____pie_____          _juice_
 |           |          |     |
pear   pineapplejuice   ?   durian
'''

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

이 작은 프로젝트가 이진 트리와 힙 등을 다룰 때 조금이나마 도움이 되었으면 좋겠어요.

만약 버그를 발견하거나 이 패키지에 대한 제안이 있으시다면 언제든지 알려주세요!

응원합니다

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

# 만약 제가 만든 작품을 지원하고 싶다면

- 제 책을 구입해주세요! — 101가지 파이썬에 대해 몰랐던 것들
- 구입처: [여기를 클릭하세요](https://payhip.com/b/vywcf)
- 이 이야기에 박수를 50번 치십시오
- 여러분의 생각을 댓글로 나누어 주세요
- 이야기 중에서 가장 좋아하는 부분을 강조해 주세요

감사합니다! 이런 작은 동작들이 큰 도움이 되고, 저는 정말로 감사하게 생각합니다!

YouTube: [여기를 클릭하세요](https://www.youtube.com/@zlliu246)

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

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)