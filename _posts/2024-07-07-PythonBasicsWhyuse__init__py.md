---
title: "Python 기초 __init__py를 사용해야 하는 이유"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-PythonBasicsWhyuse__init__py_0.png"
date: 2024-07-07 21:47
ogImage:
  url: /assets/img/2024-07-07-PythonBasicsWhyuse__init__py_0.png
tag: Tech
originalTitle: "Python Basics: Why use __init__.py?"
link: "https://medium.com/@sarangsurve/python-basics-why-use-init-py-c88589e44c91"
---

![Screenshot](/TIL/assets/img/2024-07-07-PythonBasicsWhyuse__init__py_0.png)

안녕하세요! 오늘은 Python의 **init**.py에 대해 이해해보겠습니다. 아주 작지만 중요한 역할을 하는 파일이에요. 기술 용어 없이 쉽게 파악해봐요.

## **init**.py란?

Python 파일이 모인 디렉터리를 패키지로 취급하고 싶다면 **init**.py 파일을 넣어주면 됩니다. 그러면 Python이 그 디렉터리를 패키지로 인식해요. 코드와 Python 사이의 비밀 악수 같은 존재죠.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*vRslGzL6g4YZkmkF5DDX1g.gif)

# 이 init.py 파일 안에는 무엇이 있을까요?

파이썬의 **init**.py에 대해 궁금해 해보셨나요? 이 파일은 단순히 빈 파일일 수도 있고, 특별한 설정이 필요한 경우 일부 초기화 코드를 포함할 수도 있습니다. 하지만 대부분의 경우, 비어있는 **init**.py 파일만 있어도 충분합니다. **init**.py 파일을 패키지의 사용 준비가 되어 있다고 생각해보세요. 누군가 당신의 패키지를 사용하고자 할 때, 그들은 코드에서 그것을 import하고 Python은 그 마법같은 **init**.py를 찾아볼 것입니다.

**init**.py가 없으면, Python은 당신의 디렉토리를 패키지로 인식하지 못하며 표준 "import" 문을 사용하여 해당 모듈을 가져올 수 없습니다.

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

![](https://miro.medium.com/v2/resize:fit:1400/1*ICEW26oY5tK3yjpO267rHw.gif)

# \_\_init\_\_.py 가 파이썬 패키지 생성에 어떻게 도움이 될까요?

\_\_init\_\_.py 는 코드를 모듈화된 청크로 구성할 수 있게 해주어 모든 것을 매우 효율적으로 관리하고 재사용할 수 있습니다. 패키지의 청사진으로 상상해보세요 — \_\_init\_\_.py 에서 공통 함수, 변수를 정의하거나 다른 모듈을 import하여 패키지의 기능에 대한 기반을 설정할 수 있습니다.

# 예제

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

간단한 패키지인 my_package를 생성해보겠습니다. my_package 디렉토리 내부에서 어떻게 **init**.py가 작동하는지 설명하기 위해 빈 **init**.py 파일을 만들고 greetings.py 파일을 생성하여 say_hello() 함수를 작성해봅시다. 이 함수는 “Hello, World!”를 출력합니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*Bk3i_Yta7rGPZ9b_xap4KA.gif)

```python
# greetings.py
def say_hello():
  print("Hello, World!")
```

이제 my_package 디렉토리 외부의 어떤 파일에서든 greetings 모듈을 가져와 say_hello() 함수를 사용할 수 있습니다. 이 때 **init**.py 파일이 greetings 모듈을 my_package 네임스페이스 내에서 접근 가능하게 만들어주기 때문에 “Hello, World!”가 출력됩니다.

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

<img src="https://miro.medium.com/v2/resize:fit:1400/1*fcHy0Fyq7xfaCafR3hcGHw.gif" />

# 결론

**init**.py는 구조화되고 조직화된 Python 패키지를 만드는 데 중요한 기본 요소입니다. 코드를 함께 유지하는 보이지 않는 접착제처럼 동작하여 재사용하고 공유하기가 쉬워집니다. 간단히 말하면, **init**.py는 Python 프로젝트의 시작 선과도 같습니다.

좋아요, 멋진 분들! 여기까지가 전부에요. **init**.py를 Python 프로젝트의 중요한 역할로 생각해보세요! 조용하게 존재하지만 모든 코드 조각들을 함께 모아 깔끔하게 정리하고 공유할 수 있게 도와줍니다. 언제나처럼, 즐거운 코딩하시고 여러분의 프로젝트가 항상 조직적이기를 바라겠습니다!
