---
title: "간단한 파이썬 포트 스캐너 사용법"
description: ""
coverImage: "/TIL/assets/img/2024-07-09-Asimplepythonportscanner_0.png"
date: 2024-07-09 09:14
ogImage:
  url: /assets/img/2024-07-09-Asimplepythonportscanner_0.png
tag: Tech
originalTitle: "A simple python port scanner"
link: "https://medium.com/@alhobabtagiddin/a-simple-python-port-scanner-57f99c154cef"
---

![포트 스캐너](/TIL/assets/img/2024-07-09-Asimplepythonportscanner_0.png)

포트 스캐너는 시스템의 네트워크 보안을 분석하기 위해 사용되는 도구로, 열린 포트를 스캔하여 확인합니다. 포트는 컴퓨터의 문과 같이 다양한 유형의 통신을 허용합니다. 포트 스캐너는 대상 시스템에서 열린 포트, 닫힌 포트 또는 필터링된 포트를 식별할 수 있어 잠재적인 취약점을 평가하고 네트워크를 보호하는 데 도움이 됩니다.

코드를 시작하기 전에 시스템에 Python이 설치되어 있는지 확인하세요. 공식 Python 웹사이트(https://www.python.org/downloads/)에서 다운로드할 수 있습니다.

선호하는 편집기를 사용하여 코드를 작성할 수 있습니다.

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

제가 선호하는 것은 PyCharm입니다 :)

## 이제 중요한 라이브러리를 가져와 봅시다

```js
import sys
import socket
from datetime import datetime
```

## 이제 대상을 정의해 봅시다

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

부분 1

```js
if len(sys.argv) == 2:
    target = socket.gethostbyname(sys.argv[1])
else:
       print("인수의 수가 올바르지 않습니다.")
       print("구문: python3 scanner.py ,ip.")
```

이 내용은 호스트 이름을 IPv4로 변환할 것입니다......

이제 예쁜 배너를 추가해 봅시다.

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

```python
print("*" * 50)
print("scanning target: "+target)
print("time started: "+str(datetime.now()))
print("*" * 50)
```

포트 스캔을 위한 for 루프

파트 2

```python
try:
    for port in range(50,85):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)
        # 1초 이내에 응답이 없으면 넘어감
        result = s.connect_ex((target,port))
        if result == 0:
            print(f"port {port} is open ")
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

```js
s.close();
```

마지막으로

```js
except KeyboardInterrupt:
    print("\n프로그램을 종료합니다")
    sys.exit()
#Ctrl+C를 눌렀을 때
except socket.gaierror:
    print("호스트 이름을 해석할 수 없습니다")
    sys.exit()
```

```js
except socket.error:
    print("서버에 연결할 수 없습니다")
    sys.exit()
#서버가 응답하지 않을 때
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

# 파트1

```js
우리는 길이의 방법을 사용했고 sys.argv(우리가 주는 인수의 양입니다)라고 말했습니다.
```

```js
그래서 2개의 인수가 필요합니다... 3개가 있으면 오류가 발생합니다... 1개가 있으면 오류가 발생합니다.
마치 이렇게 말하고 있는 것처럼 :
python 3 scanner.py 192.168.1.10 4444
오류가 발생합니다
길이를 만족하지 않는 경우 우리는 target = socket.gethostbyname(sys.argv[1])로 우리의 대상을 설정할 것입니다... 그리고 [1]은 ip 주소의 인수입니다
```

# 파트2

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
50부터 85까지 포트에 대한 for 루프를 실행했습니다.
```

```js
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 변수를 설정했습니다.
AF_INET을 통해 ipv4를 수집했는데, 이는 ipv4에 해당합니다.
그리고 우리가 연결할 포트는 socket.SOCK_STREAM을 통해 얻었습니다.
타겟은 우리가 제공하고 포트는 50-85 범위 내에서 제공될 것입니다.
만약 포트가 열려있으면 결과는 0입니다.
포트가 열려있지 않으면 소켓 연결이 닫히고 루프로 돌아갑니다.
```
