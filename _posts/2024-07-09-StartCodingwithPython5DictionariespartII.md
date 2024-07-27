---
title: "파이썬 코딩 시작하기 5 딕셔너리 2부"
description: ""
coverImage: "/TIL/assets/no-image.jpg"
date: 2024-07-09 15:07
ogImage: 
  url: /TIL/assets/no-image.jpg
tag: Tech
originalTitle: "Start Coding with Python: 5. Dictionaries (part II)"
link: "https://medium.com/@audrey_evans/start-coding-with-python-5-dictionaries-part-ii-e9316455f083"
---


딕셔너리를 반복하는 방법을 배울 거에요. 딕셔너리는 다양한 방식으로 정보를 저장할 수 있기 때문에, 이를 반복하는 여러 가지 방법이 있어요. 주어진 딕셔너리의 키, 값 또는 모든 키-값 쌍을 반복할 수 있어요.

## 키-값 쌍을 반복하기

세 개의 키-값 쌍을 포함하는 scientist_0 딕셔너리를 고려해봅시다.

```js
# 파일 이름: scientist.py

scientist_0 = {
    'username': 'rfeynman',
    'first name': 'richard',
    'last name': 'feynman',
    }

for key, value in scientist_0.items():
    print(f"\nKey: {key}")
    print(f"Value: {value}")
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

테이블 태그를 Markdown 형식으로 변경해주세요.