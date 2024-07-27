---
title: "Python __all__ 이해하기 - 15초 설명"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-__all__inPythonExplainedin15Seconds_0.png"
date: 2024-07-13 20:09
ogImage: 
  url: /TIL/assets/img/2024-07-13-__all__inPythonExplainedin15Seconds_0.png
tag: Tech
originalTitle: "__all__ in Python Explained in 15 Seconds"
link: "https://medium.com/gitconnected/all-in-python-explained-in-15-seconds-0cdb2135fdfd"
---



![image](/TIL/assets/img/2024-07-13-__all__inPythonExplainedin15Seconds_0.png)

## Case 1: No __all__

```python
# a.py

a = 'apple'
b = 'boy'
c = 'cat'
d = 'donkey'
e = 'elephant'
f = 'fish'
```

```python
# b.py

from a import *

print(dir())

# [..., 'a', 'b', 'c', 'd', 'e', 'f']
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

여기서 from a import *는 a.py에서 모든 항목을 b.py로 가져옵니다. 이것이 b.py의 dir()에 a, b, c, d, e 및 f가 나타나는 이유입니다.

# Case 2: __all__이 정의된 경우

```python
# a.py

a = 'apple'
b = 'boy'
c = 'cat'
d = 'donkey'
e = 'elephant'
f = 'fish'

__all__ = ['a', 'b']
```

```python
# b.py

from a import *

print(dir())

# [..., 'a', 'b']
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

위에서 "from a import *"은 a와 b만 가져옵니다. 이는 a.py의 __all__ 때문에 b.py에게 a와 b만 가져와야 한다고 알려주기 때문입니다.

참고 - 이 작업은 "from a import *"에서만 작동합니다. 여전히 from a import c, d, e, f를 사용할 수 있습니다.

# 왜/언제 사용해야 하는가

만약 a.py에 무작위로 많은 것이 들어있지만 우리가 '내보낼' 것은 a와 b뿐이라면, 우리가 from a import *를 사용할 때 실수로 많은 불필요한 것들을 가져오지 않도록 하기 위해 __all__을 사용해야 합니다.

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

이해하기 쉽고 명확했길 바랍니다.

# 만약 제작자로서 저를 지원하고 싶다면

- 이 이야기에 대해 50번 박수를 치세요
- 귀하의 생각을 나에게 알려주는 댓글을 남겨주세요
- 이야기 중 가장 좋아하는 부분을 강조해주세요

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

감사합니다! 이런 작은 조치들이 큰 도움이 되고, 정말 감사합니다!

YouTube: [https://www.youtube.com/@zlliu246](https://www.youtube.com/@zlliu246)

LinkedIn: [https://www.linkedin.com/in/zlliu/](https://www.linkedin.com/in/zlliu/)