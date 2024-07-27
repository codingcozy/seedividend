---
title: "일상에서 유용한 놀라운 17가지 Python 자동화 스크립트"
description: ""
coverImage: "/TIL/assets/img/2024-07-06-17MindblowingPythonAutomationScriptsIUseEveryday_0.png"
date: 2024-07-06 10:26
ogImage:
  url: /assets/img/2024-07-06-17MindblowingPythonAutomationScriptsIUseEveryday_0.png
tag: Tech
originalTitle: "17 Mindblowing Python Automation Scripts I Use Everyday"
link: "https://medium.com/pythoneers/17-mindblowing-python-automation-scripts-i-use-everyday-523fb1eb9284"
---

## 해야 할 자동화 스크립트 (컬렉션)

/assets/img/2024-07-06-17MindblowingPythonAutomationScriptsIUseEveryday_0.png

저는 거의 5년 동안 Python을 사용해왔는데, 아직도 저를 끌어들이고 더 많은 연구에 동기를 부여하는 것은 Python의 자동화 기능입니다. 지난 1년 동안 저는 Python의 자동화 부분을 탐험해 왔고, 놀라운 Python 패키지, 사실, 흥미로운 스크립트를 발견했습니다. 이 블로그에서는 저가 매일 사용하며 제 생산성과 성능을 향상시킨 여러 자동화 스크립트를 공유하겠습니다.

# 1. Speakify

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

책을 좋아하지만 혼자 읽는 것은 싫어해요. 대신에 책을 듣는 걸 좋아해요. 이 자동화 스크립트는 정말 생명 구조자인데요. PDF 파일을 듣기 위해 많이 사용해요.

```js
import PyPDF2
import pyttsx3

# PDF 파일 열기 (PDF 파일 경로 입력)
file = open('story.pdf', 'rb')
readpdf = PyPDF2.PdfReader(file)

# 텍스트 음성 변환 엔진 초기화
speaker = pyttsx3.init()
rate = speaker.getProperty('rate')   # 현재 말하는 속도 가져오기
speaker.setProperty('rate', 200)

volume = speaker.getProperty('volume')
speaker.setProperty('volume', 1)  # 볼륨 설정 (0.0 ~ 1.0)

# 가져오고…
```
