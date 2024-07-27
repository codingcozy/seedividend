---
title: "코딩 없이 바로 사용할 수 있는 실용적인 파이썬 팁 5가지"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_0.png"
date: 2024-07-12 20:52
ogImage: 
  url: /TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_0.png
tag: Tech
originalTitle: "5 Practical Python Tips: No Coding Required, Ready to Use!"
link: "https://medium.com/top-python-libraries/5-practical-python-tips-no-coding-required-ready-to-use-b433e8e9e407"
---


## 파이썬 기술

요즘에는 Python이 복잡한 기능을 달성하기 위해 더 적은 코드를 작성할 수 있도록 해서 인기를 얻었습니다. Python 개발자 커뮤니티는 복잡한 구현을 캡슐화하면서도 사용자 친화적인 도구를 환영합니다.

그러나 Python의 단순함은 여기서 끝나지 않습니다. 아무 코드도 작성하지 않고 Python을 사용할 수 있다고 믿을 수 있나요? 다음 기사에서는 코드를 작성하지 않고 Python의 내장 기능을 사용하는 다섯 가지 예제를 소개하겠습니다.

# Python CLI "-m" 매개변수

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

파이썬 CLI (명령줄 인터페이스)로 시작해봅시다. 나중에 언급할 기능들을 사용하기 위해 코드를 작성할 필요는 없지만, 파이썬이 우리가 무엇을 하고 싶은지 알 수 있도록 파이썬 명령줄을 사용해야 합니다.

컴퓨터에 파이썬이 설치되어 있다면, 파이썬 명령줄에 `python --help`를 입력하여 지원되는 모든 매개변수를 표시할 수 있습니다.

![이미지](/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_0.png)

출력이 길기 때문에 위 이미지는 일부만 보여줍니다. 여기서 강조하고 싶은 것은 `-m mod` 매개변수인데, 이는 파이썬 모듈을 스크립트로 실행합니다. 모듈이 명령줄 작업을 지원한다면, 해당 모듈을 명령줄에서 바로 사용할 수 있습니다.

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

# 서버 포트 테스트

가끔은 IP 포트의 아웃바운드 네트워크 트래픽을 테스트하고 싶을 때가 있습니다. 보통 telnet 명령어를 사용하는 것이 좋습니다. Windows에서는 telnet이 기본적으로 설치되어 있지 않아 수동으로 설치해야 합니다. 간단한 테스트를 위해서 telnet을 설치하는 것은 자원의 낭비일 수도 있습니다.

하지만 Python이 설치되어 있다면 별도로 telnet을 설치할 필요가 없습니다. Python에 내장된 모듈이 있기 때문입니다. Google 검색 사이트의 443 포트를 테스트할 수 있습니다.

```js
python -m telnetlib -d 142.250.70.174 443
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

# 로컬 웹 서버 시작하기

많은 Python 사용자들은 처음에 이 소식을 듣고 놀랍습니다. 네, Python을 사용하여 어떤 코드도 작성하지 않고도 웹 서버를 시작할 수 있습니다. 명령줄에서 다음 명령을 실행하기만 하면 됩니다.

```js
python -m http.server
```

실행한 후에는 서비스가 로컬 8000 포트에서 수신 대기합니다. 그런 다음 브라우저에서 http://localhost:8000/을 통해 접속할 수 있습니다.

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


![2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_1](/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_1.png)

이 웹 서버는 로컬 파일 시스템을 명령 시작 경로의 루트 디렉토리로 표시합니다. 다시 말해서 우리는 그의 상위 디렉토리에 액세스할 수 없습니다.

이 기능의 사용처는 무엇인가요? 예를 들어, 컴퓨터의 디렉토리에서 많은 텍스트/PDF/이미지 파일/하위 디렉토리를 친구들과 공유하려고 한다면, 이 방법을 사용하면 쉽습니다.

![2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_2](/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_2.png)


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

# JSON 문자열 확인 및 서식 지정

JSON 문자열이 매우 길고 서식이 지정되지 않았다면, 읽기가 어려울 수 있습니다. 보통 저는 Sublime이나 VS Code와 같은 JSON 플러그인이 있는 텍스트 편집기를 사용하여 JSON 문자열을 서식 지정합니다. 하지만 이러한 도구를 사용할 수 없는 경우, Python이 일시적인 해결책이 될 수 있습니다. 아래는 짧은 JSON 문자열을 사용한 예제입니다.

```js
echo '{"name": {"first_name":"Chris", "last_name":"Tao"} "age":33}'
```

위 명령줄 도구로는 원래의 형식으로 표시되지만, Python의 `json.tool` 도구를 사용하면 JSON 문자열이 잘 서식이 지정됩니다.

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

죄송합니다! JSON 문자열이 잘못되었네요. `json.tool`을 사용하면 문제를 파악할 수 있어요. "name" 객체 뒤에 쉼표를 빠뜨렸네요. 쉼표를 추가하면 JSON이 올바르게 됩니다.

이제 JSON 문자열은 완벽히 들여쓰기된 형식으로 출력되어 가독성이 좋아졌어요.

# 텍스트 에디터 만들기

맞아요, Python을 사용하여 텍스트 에디터를 "만들" 수 있어요. 물론 기능이 제한적이지만, 더 나은 옵션이 없을 때 유용해요. Vim이나 Nano와 기능 면에서 비교할 수 없지만, 명령줄 텍스트 에디터가 아닌 UI 에디터에요. 이 에디터는 Tkinter를 기반으로 한 `idlelib` 모듈에 의해 만들어졌기 때문에 크로스 플랫폼이에요.

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

간단한 Python 프로그램을 작성하여 현재 시간을 표시하려고 합니다. 큰 코드 편집기를 다운로드하고 설치하지 않고 빠르게 코드를 작성하려면 다음 명령을 실행해 봅시다.

```js
mkdir get_time_app
python -m idlelib get_time_app/print_time.py
```

파일 디렉토리가 존재하지 않으면 `idlelib`가 생성할 수 없으므로 필요한 경우 직접 만들어야 합니다. 명령을 실행한 후 `print_time.py` 파일은 저장되어 로컬에만 생성됩니다. 이제 편집기가 나타나며 구문 강조 기능이 있는 코드를 작성할 수 있습니다.

![Image](/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_3.png)

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


`ctrl+s`를 사용하여 코드를 저장하고 편집기를 닫으세요. 명령줄에서 편집된 코드 파일을 확인하고 문제가 없어야 합니다.

```js
cat get_time_app/print_time.py
```

# 실행 가능한 애플리케이션 만들기

현재 시간을 가져오는 간단한 애플리케이션을 만들고 싶다면, PyInstaller와 같은 서드파티 도구가 필요하지 않습니다. Python의 내장 Zipapp을 사용할 수 있습니다. "현재 시간 가져오기" 애플리케이션으로 패키지하려면, 명령줄에서 다음 명령을 실행하세요.


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


python -m zipapp get_time_app -m "print_time:main"


우리는 `zipapp` 이름을 `get_time_app`으로 설정하고, 파이썬 프로그램의 진입 파일과 진입 함수를 지정하기만 하면 됩니다. `.pyz` 확장자를 가진 파일이 우리가 만든 애플리케이션입니다. 이 프로젝트를 폴더가 아닌 단일 파일로 배포할 수 있습니다.

![image](/TIL/assets/img/2024-07-12-5PracticalPythonTipsNoCodingRequiredReadytoUse_4.png)

프로그램을 실행하는 것은 간단합니다. Python을 사용하여 직접 호출하면 됩니다.


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
python get_time_app.pyz
```

안녕하세요! 제가 "Medium에서 빠르게 팔로워를 얻는 방법"에 관한 이북을 쓰고 있습니다. 저는 최고의 증거이기 때문에 말이죠. 딱 한 달 만에 5,000명 이상의 팔로워를 얻었습니다. 계속해서 소식을 지켜봐 주세요!

저는 Substack에서 "GPT 소개" 시리즈를 쓰고 있어요. 관심이 있으시면 팔로우 해주세요!

총 10편의 글 중 8번째 글이 이미 완료되었습니다!

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

위의 글을 읽어 주셔서 감사합니다!📖 형광펜으로 강조해 주시고🖍️ 박수를 보내 주시고👏 댓글을 남겨 주시고💬 공유해 주셔서 감사합니다🗣️. "미디엄의 친구"로서 매일 열심히 노력하고 있습니다.

또한, 뉴스레터를 구독하여 제가 위와 같은 멋진 콘텐츠를 게시할 때마다 알림을 받을 수 있습니다📰. 고맙습니다, 친애하는 챔프!🤓

최신 Python 이야기를 따르려면 Substack에서 저희와 연락하십시오. 함께 Python의 미래를 함께 만들어 봅시다!

# 즐기세요