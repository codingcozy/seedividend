---
title: "알고 계셨나요  Python 내장 우선순위 큐 소개"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-DidYouKnowPythonHasABuilt-inPriorityQueue_0.png"
date: 2024-07-07 21:48
ogImage:
  url: /assets/img/2024-07-07-DidYouKnowPythonHasABuilt-inPriorityQueue_0.png
tag: Tech
originalTitle: "Did You Know — Python Has A Built-in Priority Queue"
link: "https://medium.com/gitconnected/did-you-know-python-has-a-built-in-priority-queue-cd65acc4a5d6"
---

<img src="/TIL/assets/img/2024-07-07-DidYouKnowPythonHasABuilt-inPriorityQueue_0.png" />

우선 순위 큐:

- 요소들의 집합
- 각 요소는 어떤 종류의 우선 순위가 할당되어 있음
- 큐 내에서 가장 높은 우선 순위를 가진 요소가 먼저 처리됨
- 요소를 큐에 넣는 순서는 중요하지 않음

예를 들어, 이 숫자들이 포함된 우선 순위 큐가 있다고 가정해봅시다. 낮은 숫자가 높은 우선 순위를 의미합니다.

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
pq = [3, 7, 1, 6, 4, 5];
```

- 여기서 3이 먼저 삽입되고, 그 다음에 7, 그 다음에 1이 들어갑니다.
- 그러나 3은 큐에서 제일 먼저 떠난 요소가 아닙니다.

```js
# 큐에서 팝
1

# 큐에서 팝
3

# 큐에서 팝
4
```

- 1이 3보다 먼저 나가는 이유는 더 높은 우선순위를 가지고 있기 때문입니다.
- 3은 1 다음으로 가장 높은 우선순위를 가지고 있기 때문에 다음에 나갑니다.
- 4는 3 다음으로 가장 높은 우선순위를 가지고 있기 때문에 그 다음에 나갑니다.

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

# 이런. 정렬만 하면 되잖아요?

```js
pq = [3, 7, 1, 6, 4, 5]
pq.sort()

# pq = [1, 3, 4, 5, 6, 7]
```

이제는 우선순위대로 1, 3, 4 순으로 pop할 수 있습니다. 네 할 수 있어요.

하지만 문제는 이 목록에 새 숫자를 추가하려고 할 때 발생합니다.
