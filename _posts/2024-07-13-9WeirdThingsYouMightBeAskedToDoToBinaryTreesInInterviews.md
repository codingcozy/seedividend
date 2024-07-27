---
title: "면접에서 바이너리 트리에 대해 물어볼 수 있는 9가지 기묘한 질문"
description: ""
coverImage: "/assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_0.png"
date: 2024-07-13 20:57
ogImage: 
  url: /assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_0.png
tag: Tech
originalTitle: "9 Weird Things You Might Be Asked To Do To Binary Trees In Interviews"
link: "https://medium.com/@zlliu/9-weird-things-you-might-be-asked-to-do-to-binary-trees-in-interviews-edbcb65e5dc5"
---



![이미지](/assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_0.png)

면접에서 이것이 나타날 수도 있습니다. 그렇다면, 잘 준비되어 있으면 좋겠네요.

# 공통 기본 코드

```js
pip install print-btree
```

<div class="content-ad"></div>

^ binary tree를 쉽게 표시하는 데 이 라이브러리를 사용할 수 있어요.

```js
from print_btree import print_btree

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)

# binary tree 표시
print_btree(root)

'''

 __1__
 |   |
_2_  3 
| |    
4 5
 
'''
```

# 1) binary tree의 높이 찾기

binary tree의 높이를 찾는 방법을 작성하세요.

<div class="content-ad"></div>


# height = 1
'''
1
'''



# height of 2
'''
_1_
| |
2 3
'''



# height of 3
'''
 __1__
 |   |
_2_  3 
| |    
4 5
'''    



# height of 4
'''
  ____1____
  |       |
__2__     3  
|   |        
4  _5         
   |          
   6 
'''


<div class="content-ad"></div>

# 2) 이진 트리 반전

모든 노드에 대해: 왼쪽 자식이 오른쪽이 되고, 오른쪽 자식이 왼쪽이 됩니다.

```js
print_btree(root)
'''
_1_
| |
2 3
'''

print_btree(root.invert())
'''
_1_
| |
3 2
'''
```

```js
print_btree(root)
'''
 __1__
 |   |
_2_  3 
| |    
4 5
'''

root.invert()
print_btree(root)
'''
__1__
|   |
3  _2_
   | |
   5 4
'''
```  

<div class="content-ad"></div>

```json
print_btree(root)
'''
  ____1____
  |       |
__2__     3  
|   |        
4  _5         
   |          
   6  
'''

root.invert()
print_btree(root)
'''
____1____
|       |
3     __2__
      |   |
      5_  4 
       |    
       6   
'''
```

# 3) Sum of values in binary tree

Assume all values in the binary tree are numbers

```js
'''
  ____1____
  |       |
__2__     3  
|   |        
4  _5         
   |          
   6 
'''
# sum = 1+2+3+4+5+6 = 21
```

<div class="content-ad"></div>


'''
  ____1____
  |       |
__2__   __3  
|   |   |    
4   5  _6_    
       | |    
       7 8 
'''
# sum = 1+2+3+4+5+6+7+8 = 36


# 4) 중위 순회

중위 순회에서는 가장 왼쪽 노드에서 시작하여 오른쪽으로 이동합니다.


'''
 __1__
 |   |
_2_  3 
| |    
4 5 
'''

# 생성

[4, 2, 5, 1, 3]


<div class="content-ad"></div>

```js
'''
  ____1____
  |       |
__2__     3  
|   |        
4  _5_        
   | |        
   7 8        
'''

# 결과

[4, 2, 7, 5, 8, 1, 3]
```

```js
'''
  ____1____
  |       |
__2__     3__
|   |       |
4  _5_     _6 
   | |     |  
   7 8     9  
'''

# 결과

[4, 2, 7, 5, 8, 1, 3, 9, 6]
```

# 5) 수평 트리순회

수평 트리순회에서는 레벨 순서대로 이동합니다. 각 레벨에서는 좌측부터 우측으로 이동합니다.


<div class="content-ad"></div>

```js
'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''

# 생성

[1, 2, 3, 4, 5, 6]
```

```js
'''
  ____1____
  |       |
__2__     3__
|   |       |
4  _5_     _6 
   | |     |  
   7 8     9  
'''

# 생성

[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

# 6) 이진 트리의 너비 찾기

이진 트리의 너비를 찾는 메서드를 작성하세요. 아래에 예제가 있습니다:

<div class="content-ad"></div>

```js
# 3폭
'''
_1_
| |
2 3
'''
```

```js
# 4폭
'''
 __1__
 |   |
_2   3 
|      
4 
'''
```

```js
# 5폭
'''
 __1__
 |   |
_2_  3_
|     |
4     6
'''
```

```js
# 5폭 (5번 노드 추가 시 변화 없음)
'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''
```

<div class="content-ad"></div>

```js
# 5 너비(no. 7, 8, 9 노드는 아무것도 변경되지 않음)
'''
  ____1____
  |       |
__2__     3__
|   |       |
4  _5_     _6 
   | |     |  
   7 8     9  
'''
```

```js
# 4 너비
'''
   ____1    
   |        
 __2__        
 |   |        
_3   5         
|              
4  
'''

# 5는 1과 동일한 수직 레벨에 있음
```

```js
# 6 너비
'''
      ________1        
      |                
  ____2____                
  |       |                
__3       5__                
|           |                
4           6_                
             |                
             7 
'''
# 노드 6과 7은 1을 초과함
```

# 7) 이진 트리를 2D 리스트로

<div class="content-ad"></div>


'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''
# becomes
[
    [1], 
    [2, 3], 
    [4, 5, None, 6]
]
# 주의: None 값들이 리스트에 유지됩니다.



'''
    _______1________
    |              |
____2____          3__
|       |            |
4    ___5___        _6 
     |     |        |  
   apple orange     7  
'''
# becomes
[
    [1], 
    [2, 3], 
    [4, 5, None, 6], 
    [None, None, 'apple', 'orange', None, None, 7, None]
]


^ 1번 리스트에 1개의 요소, 2번 리스트에 2개의 요소, 3번 리스트에 4개의 요소, 4번 리스트에 8개의 요소, 5번 리스트에 16개의 요소가 있다는 것을 알려드립니다.

<div class="content-ad"></div>

# 8) Binary Search Tree 확인하기

바이너리 트리가 이진 검색 트리인지 확인하는 메서드를 작성해보세요. 모든 값이 고유하다고 가정합니다.

이진 검색 트리는 다음 조건을 만족하는 바이너리 트리입니다:

- 왼쪽 자식보다 크고
- 오른쪽 자식보다 작습니다

<div class="content-ad"></div>

```js
# 이진 탐색 트리가 아닙니다
'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''

#    1은 2(왼쪽 자식)보다 작습니다.
#    2는 4(왼쪽 자식)보다 작습니다.
```

```js
# 이진 탐색 트리입니다
'''
 __4__
 |   |
_2_  5_
| |   |
1 3   6
'''

# 각 노드는 다음 조건을 충족합니다.
# 1) 각 노드는 왼쪽 노드보다 크다.
# 2) 각 노드는 오른쪽 노드보다 작다.
```

# 9) 최소 힙 여부 확인

이진 트리가 최소 힙인지 확인하는 메소드를 작성하세요.

<div class="content-ad"></div>

미니 힙은 다음과 같은 규칙을 따르는 이진 트리입니다:

- 각 노드는 부모보다 작아야 합니다.
- 왼쪽 노드나 오른쪽 노드 중 어느 쪽이 작은지는 중요하지 않습니다.
- 중요한 것은 부모가 양쪽 자식보다 작아야 한다는 점입니다.

```js
# 이것은 미니 힙입니다
'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''

# 모든 부모가 자식보다 작기 때문에 미니 힙입니다
```

```js
# 미니 힙이 아닙니다
'''
 __1__
 |   |
_2_  9_
| |   |
4 5   6
'''

# 6이 이 규칙을 위반했기 때문에 미니 힙이 아닙니다
```

<div class="content-ad"></div>

# 1) 이진 트리의 높이

재귀를 사용하여 이를 해결해 봅시다:

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def height(self):
        # 기본 케이스. 노드에 자식이 없으면 높이는 1이다
        if self.left is None and self.right is None:
            return 1

        # 왼쪽 높이 및 오른쪽 높이를 0으로 초기화
        left_height = right_height = 0

        # 왼쪽 자식의 높이 재귀적으로 찾기
        if self.left:
            left_height = self.left.height()

        # 오른쪽 자식의 높이 재귀적으로 찾기
        if self.right:
            right_height = self.right.height()

        return 1 + max(left_height, right_height)
```

# 2) 이진 트리 뒤집기

<div class="content-ad"></div>

재귀를 사용해서 이것도 해봅시다.

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def invert(self):
        # 왼쪽과 오른쪽 자식을 바꿉니다.
        self.left, self.right = self.right, self.left

        # 만약 왼쪽 자식이 존재한다면 같은 작업을 수행합니다.
        if self.left: 
            self.left.invert()

        # 만약 오른쪽 자식이 존재한다면 같은 작업을 수행합니다.
        if self.right:
            self.right.invert()
```

# 3) 이진 트리의 합

다시 한 번, 재귀를 사용하세요:

<div class="content-ad"></div>

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def sum(self):
        # 왼쪽 자식 노드의 값 찾기
        # 왼쪽 자식 노드가 없으면 값은 자동으로 0
        left = 0
        if self.left:
            left += self.left.sum()

        # 오른쪽 자식 노드의 값 찾기
        # 오른쪽 자식 노드가 없으면 값은 자동으로 0
        right = 0
        if self.right:
            right += self.right.sum()
        
        # 합 = self.val + 왼쪽 값 + 오른쪽 값
        return self.val + left + right
```

# 4) 중위 순회

재귀, 재귀, 재귀.

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def in_order(self, ls=None):
        # 'ls'를 빈 목록으로 초기화
        # 참고: 'ls'는 모든 재귀 호출에서 공유됨
        if ls is None:
            ls = []

        # 왼쪽 자식이 존재하는 경우, 먼저 확인
        if self.left:
            self.left.in_order(ls=ls)
      
        # self.val을 ls에 추가
        ls.append(self.val)

        # 오른쪽 자식이 존재하는 경우, 다음으로 확인
        if self.right:
            self.right.in_order(ls=ls)
        
        # 공유된 목록 반환
        return ls
```

<div class="content-ad"></div>

일부 시각화:

```js
# 주어진 

'''
  ____1____
  |       |
__2__     3  
|   |        
4  _5_        
   | |        
   7 8        
'''
# 생성

[4, 2, 7, 5, 8, 1, 3]
```

![이미지1](/assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_1.png)

![이미지2](/assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_2.png)

<div class="content-ad"></div>

# 5) 수평 탐색

우리는 재귀 대신 큐를 사용합시다.

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def horizontal(self):
        ls = []          # 출력 리스트 초기화
        queue = [self]   # 큐를 [루트]로 초기화

        while queue:
  
            # 큐에서 첫 번째 노드 제거
            current = queue.pop(0)
            # 이 노드의 값을 리스트에 추가
            ls.append(current.val)

            # 만약 이 노드가 왼쪽 자식을 가지고 있다면, 왼쪽 자식을 큐에 추가
            if current.left: 
                queue.append(current.left)

            # 만약 이 노드가 오른쪽 자식을 가지고 있다면, 오른쪽 자식을 큐에 추가
            if current.right:
                queue.append(current.right)

        return ls
```

몇 가지 시각적 표현:

<div class="content-ad"></div>


'''
 __1__
 |   |
_2_  3_
| |   |
4 5   6
'''

# generates

[1, 2, 3, 4, 5, 6]



# while 루프 이전
queue = [node(1)]
ls = []



# 1차 반복
current = node(1)
queue = []
ls = [1]

# node(1)의 자식 노드를 다시 큐에 추가
queue = [node(2), node(3)]



# 2차 반복
current = node(2)
queue = [node(3)]
ls = [1, 2]

# node(2)의 자식 노드를 다시 큐에 추가
queue = [node(3), node(4), node(5)]


<div class="content-ad"></div>

```js
# 세 번째 반복
현재 = node(3)
대기열 = [node(4), node(5)]
ls = [1, 2, 3]

# node(3)의 자식 노드를 대기열에 다시 추가합니다.
대기열 = [node(4), node(5), node(6)]
```

```js
# 네 번째 반복
현재 = node(4)
대기열 = [node(5), node(6)]
ls = [1, 2, 3, 4]

# node(4)의 자식 노드를 대기열에 다시 추가합니다. (자식 노드가 없어 변경 사항 없음)
```

```js
# 다섯 번째 반복
현재 = node(5)
대기열 = [node(6)]
ls = [1, 2, 3, 4, 5]

# node(5)의 자식 노드를 대기열에 다시 추가합니다. (자식 노드가 없어 변경 사항 없음)
```

```js
# 여섯 번째 반복
현재 = node(6)
대기열 = []
ls = [1, 2, 3, 4, 5, 6]

# node(6)의 자식 노드를 대기열에 다시 추가합니다. (자식 노드가 없어 변경 사항 없음)
```

<div class="content-ad"></div>

현재 시점에서는 큐가 비어 있기 때문에 while 루프를 종료합니다.

# 6) 이진 트리의 너비

재귀 대신에 다음과 같이 사용합니다.

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def width(self):
        # 큐, 좌측, 우측을 초기화합니다.
        queue = [(self, 0)]
        left = right = 0

        while queue:
            # 큐에서 첫 번째 값을 제거합니다.
            current, lvl = queue.pop(0)

            # 최대 및 최소 레벨을 추적합니다.
            left = min(left, lvl)
            right = max(right, lvl)

            # 자식이 있다면 다시 큐에 추가합니다.
            if current.left:
                queue.append((current.left, lvl-1))
            if current.right:
                queue.append((current.right, lvl+1))

        return right - left + 1
```

<div class="content-ad"></div>

어떤 시각화:

```js
# 너비 6
'''
      ________1        
      |                
  ____2____                
  |       |                
__3       5__                
|           |                
4           6_                
             |                
             7 
'''
# 노드 6과 7이 1을 초과합니다
```

<img src="/assets/img/2024-07-13-9WeirdThingsYouMightBeAskedToDoToBinaryTreesInInterviews_3.png" />

^ 여기서 레벨 점수는 중앙에서의 단계 수를 의미합니다

<div class="content-ad"></div>

- 중간에 있는 노드들은 lvl이 0입니다.
- lvl이 0인 노드의 왼쪽 자식은 lvl이 -1이고, 오른쪽 자식은 lvl이 1입니다.
- lvl이 -1인 노드의 왼쪽 자식은 lvl이 -2이고, 오른쪽 자식은 lvl이 0입니다.
- lvl이 1인 노드의 왼쪽 자식은 lvl이 0이고, 오른쪽 자식은 lvl이 2입니다.

우리는 각 노드에 대한 lvl 값을 생성하기 위해 큐를 사용하고, 최대 및 최소 lvl 값을 추적합니다.

최종 답변은 max_lvl - min_lvl + 1이 될 것입니다.

# 7) 이진 트리를 2D 리스트로 변환하기

<div class="content-ad"></div>

비슷한 알고리즘인 5) 수평 순회와 동일한 방법을 사용할 수 있지만 몇 가지 조정이 필요합니다.

- None 값을 포함해야 합니다.
- 각 노드의 레벨도 포함해야 합니다.

- 루트에는 값을 0으로 할당
- 루트의 자식은 1의 값을 가지고, 손자는 2의 값을 갖게 됩니다

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def height(self):
        if self.left is None and self.right is None:
            return 1
        left_height = right_height = 0
        if self.left:
            left_height = self.left.height()
        if self.right:
            right_height = self.right.height()
        return 1 + max(left_height, right_height)

    def to_list(self):
        # 이진 트리의 높이 찾기
        height = self.height()
    
        # 출력 2차원 리스트 초기화
        out = [[] for i in range(height)]
        
        # 큐 초기화
        queue = [(self, 0)]

        while queue:

            # 큐에서 첫 번째 값 제거
            current, lvl = queue.pop(0)

            # 레벨이 높이를 초과하는 경우 무시
            if lvl >= height:
                continue
            
            if current is None:
                # None 값을 out에 추가
                out[lvl].append(None)  

                # 자식을 다시 큐에 추가
                queue.append((None, lvl+1)) 
                queue.append((None, lvl+1)) 
            else:
                # 값을 out에 추가
                out[lvl].append(current.val)
    
                # 자식을 다시 큐에 추가
                queue.append((current.left, lvl+1))
                queue.append((current.right, lvl+1))

        return out
```

<div class="content-ad"></div>

# 8) 이진 트리가 이진 탐색 트리인지 확인하기

여기서는 조기에 False를 반환할 수 있도록 재귀 대신 큐를 사용해보겠습니다.

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def is_bst(self):
        queue = [self]
        while queue:
            current = queue.pop(0)

            # 만약 왼쪽 값이 현재 값보다 크다면, 즉시 False 반환
            if current.left and current.left.val > current.val:
                return False

            # 만약 현재 값이 오른쪽 값보다 크다면, 즉시 False 반환
            if current.right and current.right.val < current.val:
                return False

            # 자식이 존재하면 큐에 다시 추가
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)

        return True
```

# 9) 이진 트리가 최소 힙인지 확인하기

<div class="content-ad"></div>

마찬가지로, 우리가 필요할 때 쉽게 False를 반환할 수 있도록 재귀 대신 모든 노드를 확인하기 위해 대기열을 사용합시다.

```js
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def is_min_heap(self):
        queue = [self]
        while queue:
            current = queue.pop(0)
          
            # 만약 노드의 값 > 자식 노드의 값인 경우, 즉시 False를 반환
            if current.left and current.left.val < current.val:
                return False
            if current.right and current.right.val < current.val:
                return False

            # 존재한다면 자식 노드를 대기열에 추가
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
        
        return True
```

# 결론

정답을 보지 않고 몇 문제를 해결할 수 있었나요?

<div class="content-ad"></div>

# 만약 제게 창작자로서 지원하고 싶다면

- 제 책을 구입해주세요! — 파이썬에 대해 전혀 몰랐던 101가지
- 이곳에서 구할 수 있어요: [https://payhip.com/b/vywcf](https://payhip.com/b/vywcf)
- 이 이야기에 대해 50번 박수를 쳐주세요
- 당신의 생각을 남겨주세요
- 이 이야기에서 가장 마음에 드는 부분을 강조해주세요

감사합니다! 이러한 작은 행동들이 큰 도움이 되고, 정말 감사드려요!

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

<div class="content-ad"></div>

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)