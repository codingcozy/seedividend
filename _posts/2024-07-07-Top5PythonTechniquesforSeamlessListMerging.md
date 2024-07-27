---
title: "리스트 병합을 쉽게 만드는 상위 5가지 파이썬 기법"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-07 21:33
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Top 5 Python Techniques for Seamless List Merging"
link: "https://medium.com/top-python-libraries/top-5-python-techniques-for-seamless-list-merging-fcd52c05dc2d"
---


## 파이썬 리스트 병합 간단히 알아보기

파이썬 프로그래밍에서는 종종 두 개 이상의 리스트를 하나로 병합해야 할 때가 있습니다.

이러한 과정은 일반적으로 데이터 처리나 더 복잡한 작업을 수행할 때 사용됩니다.

리스트 병합은 두 개 이상의 리스트에서 요소들을 하나로 결합하는 것을 의미합니다. 파이썬은 이를 수행하는 여러 가지 방법을 제공하는데, 각각 다른 상황에 적합한 방법이 있습니다.

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

# 1. `+` 연산자 사용하기

가장 간단한 방법은 두 개의 리스트를 합치는 `+` 연산자를 사용하는 것입니다.

```js
list1 = [1, 2, 3]
list2 = [4, 5, 6]
merged_list = list1 + list2
print(merged_list) # 출력: [1, 2, 3, 4, 5, 6]
```

이 방법은 두 리스트를 직접 연결해야 할 때 빠르고 쉽습니다.

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

# 2. `extend()` 메소드 사용하기

리스트의 `extend()` 메소드를 사용할 수도 있는데, 이 메소드는 한 리스트의 모든 요소를 다른 리스트의 끝에 추가합니다.

```js
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
print(list1) # 출력: [1, 2, 3, 4, 5, 6]
```