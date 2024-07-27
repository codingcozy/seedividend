---
title: "코믹 힙에서 요소 추가 및 제거 과정 이해하기"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-ComicHowAddingRemovingStuffFromHeapsWork_0.png"
date: 2024-07-02 21:45
ogImage:
  url: /TIL/assets/img/2024-07-02-ComicHowAddingRemovingStuffFromHeapsWork_0.png
tag: Tech
originalTitle: "[Comic] How Adding Removing Stuff From Heaps Work"
link: "https://medium.com/@zlliu/comic-how-adding-removing-stuff-from-heaps-work-017060a7eab6"
---

![image](/TIL/assets/img/2024-07-02-ComicHowAddingRemovingStuffFromHeapsWork_0.png)

# 간단한 소개

힙(heap)은 우선순위 큐(priority queue)의 구현 방식입니다. 힙에서는 우선 순위가 가장 높은 요소가 먼저 나갑니다. 우선 순위는 다음과 같이 정의될 수 있습니다:

- 최대 힙(max heap)의 경우 가장 큰 숫자가 먼저 나갑니다.
- 최소 힙(min heap)의 경우 가장 작은 숫자가 먼저 나갑니다.
