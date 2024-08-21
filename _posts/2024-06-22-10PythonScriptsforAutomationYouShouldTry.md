---
title: "시도해볼 만한 10가지 파이썬 자동화 스크립트"
description: ""
coverImage: "/assets/img/2024-06-22-10PythonScriptsforAutomationYouShouldTry_0.png"
date: 2024-06-22 02:55
ogImage:
  url: /assets/img/2024-06-22-10PythonScriptsforAutomationYouShouldTry_0.png
tag: Tech
originalTitle: "10 Python Scripts for Automation You Should Try"
link: "https://medium.com/python-in-plain-english/10-python-scripts-for-automation-you-should-try-8c685b5b230c"
isUpdated: true
---

<img src="/assets/img/2024-06-22-10PythonScriptsforAutomationYouShouldTry_0.png" />

매일 반복되는 지루한 작업을 자동화하면 어떨까요? 엑셀 파일 편집, 이메일 보내기, WhatsApp 메시지 보내기 및 일상적인 작업을 처리하는 봇 만들기와 같은 작업을 자동화할 수 있습니다. 이 스크립트에서는 매뉴얼로 수행하는 매일 작업을 자동화할 수 있는 10가지 Python 스크립트를 소개합니다. 그러니 이 글을 즐겨찾기에 추가하고 시작해보세요.

# 👉 AI 이미지 생성기

상상한 것으로부터 아름다운 이미지를 만들고 싶다면 Getimg.ai API를 활용한 Python 스크립트가 있습니다. 이 API는 매달 100개의 무료 텍스트-이미지 크레딧을 제공하며 이를 활용하여 이미지를 생성할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

단순하고 효과적인 이미지를 생성해 보세요. 웹사이트에서 무료 API를 쉽게 얻을 수 있어요.😄

```js
# AI 이미지 생성기
# pip install requests
# pip install pillow

import requests
import base64
from PIL import Image
from io import BytesIO


def Imagine(prompt):

    url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image"

    payload = { "prompt": prompt }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer 여기에 API 키 입력"
    }

    response = requests.post(url, json=payload, headers=headers)
    content = response.json()

    # 바이트를 이미지로 변환
    image = content["image"]
    image = base64.b64decode(image)
    img = Image.open(BytesIO(image))

    # 이미지 저장
    img.save("Image.png")


Imagine("아름다운 바다 위 석양과 생동적인 하늘")
```

# 👉 눈길을 끄는 이메일 전송

일반적인 텍스트 이메일을 보내는 데 파이썬을 사용하고 계실 텐데, 이메일 마케팅에서와 같이 고급 이메일을 보낼 수도 있어요. 이 Python 스크립트는 Smtplib와 Email 모듈을 사용하여 HTML로 멋진 이메일을 만드는 방법을 보여줄 거예요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래 코드는 디자인 HTML을 자유롭게 해보세요😄.

```js
# 눈에 띄는 이메일 보내기
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
your_email = "mymail@xyz.com"
your_password = "mypass"
receiver_email = "me@xzy.com"
msg = MIMEMultipart()
msg['From'] = your_email
msg['To'] = receiver_email
msg['Subject'] = "Just a Test"
# HTML 내용 생성
html = """\
<html>
  <body>
    <h1 style="color:blue;">이것은 테스트 이메일입니다</h1>
    <p>이 이메일은 Python을 사용하여 전송되었습니다!</p>
    <p>HTML 이메일에서 할 수 있는 멋진 기능들:</p>
    <ul>
      <li>CSS로 텍스트 스타일링</li>
      <li>이미지 삽입</li>
      <li>링크 추가</li>
    </ul>
    <p>최고의 문의,<br>Python 스크립트</p>
  </body>
</html>
"""
# 이메일에 HTML 내용 첨부
msg.attach(MIMEText(html, 'html'))
# 이메일 보내기
server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(your_email, your_password)
server.sendmail(your_email, receiver_email, msg.as_string())
# 서버 종료
print("이메일이 성공적으로 전송되었습니다!")
server.quit()
```

# 👉 사진 압축

사진 크기가 크고 품질을 유지한 채로 크기를 줄이고 싶다면 이 Python 스크립트가 맞을 것입니다. 이 스크립트는 이미지 처리 기술을 사용하여 이미지 크기를 줄이고 최상의 품질을 유지하는 훌륭한 모듈인 Imageio를 사용합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# 사진 압축기
# pip install imageio
import imageio
def Compress_Photo(image, quality=85):
    img = imageio.imread(image)

    output_name = 'compressed.jpg'
    imageio.imwrite(output_name, img, quality=quality)

    print("이미지 압축 완료...")
if __name__ == '__main__':
    Compress_Photo('photo.jpg')
```

# 👉 Whatsapp Bot

기본 시간에 자동으로 메시지를 보낼 수 있는 WhatsApp 봇이 필요하거나 번호로 대량 WhatsApp 마케팅 메시지를 보내고 싶으신가요? 이 파이썬 스크립트는 Pywhatkit를 사용하여 이 작업을 수행하는데 도움이 됩니다. 아래에 빌드하는 데 도움이 되는 네 가지 함수를 설명했습니다. 자유롭게 사용해보세요.

- 대량 메시징에 편리함
- 마케팅에 유용
- 예약 메시징에 유용함
- 기타 많은 기능

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Whatsapp Bot

```python
# Whatsapp Bot
# pip install pywhatkit
import pywhatkit as whatbot
def send_message(ph, msg, hr, min):
    whatbot.sendwhatmsg(ph, msg, hr, min)
    print("Message sent successfully")
def send_image(ph, img_file, caption):
    whatbot.sendwhats_image(ph, img_file, caption)
    print("Image sent successfully")
def send_msg_to_group(group_name, msg):
    whatbot.sendwhatmsg_to_group_instantly(group_name, msg)
    print("Message sent successfully")
def send_msg_to_group_delay(group_name, msg, hr, min):
    whatbot.sendwhatmsg_to_group(group_name, msg, hr, min)
    print("Message sent successfully")
send_message("+1234567890", "Hello", 12, 30)
send_image("+1234567890", "image.jpg", "This is an image")
send_msg_to_group("Group Name", "Yoo!")
send_msg_to_group_delay("Group Name", "Hello", 12, 30)
```

# 👉 Excel Bot

If you want to read, write, and edit your Excel files programmatically, you can bookmark this automation script that uses the popular Openpyxl module, my favorite for automating any Excel task. This module helps you read, write, create, style the Excel file, and more.

The script below is a beginner's guide to automating your Excel tasks with the basics.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
# Excel Bot
# pip install openpyxl
import openpyxl
from openpyxl.styles import *
# Excel 파일 로드
wb = openpyxl.load_workbook("data.xlsx")
# 시트 로드
sheet = wb.active
# 특정 열 값 가져오기
for x in sheet["A"]:
    print(x.value)
# 특정 행 값 가져오기
for x in sheet[1]:
    print(x.value)
# 특정 셀 값 가져오기
print(sheet["A1"].value)
# 특정 행과 열 값 가져오기
print(sheet.cell(row=1, column=1).value)
# 최대 행과 열 값 가져오기
print(sheet.max_row)
print(sheet.max_column)
# 쓰기 및 추가
sheet["A1"] = "Hello"
# 특정 셀에 쓰기
sheet.cell(row=2, column=2).value = "World"
# 데이터를 시트에 추가
sheet.append([1, 2, 3, 4, 5])
# 셀 병합
sheet.merge_cells("A1:B1")
# 글꼴 변경
sheet["A1"].font = Font(bold=True)
# 셀 배경색 변경
sheet["A1"].fill = PatternFill(start_color="FF0000", end_color="FF0000", fill_type="solid")
# 파일 저장
wb.save("data.xlsx")
```

# 👉 간단한 PDF에서 텍스트 추출

PDF 파일에서 텍스트를 가져오고 싶다면 PyMuPDF 모듈을 사용하는 아래 자동화 스크립트를 사용해보세요. 이 모듈은 PDF의 페이지를 반복하고 서식을 유지한 채 텍스트를 추출하는 가장 좋은 방법을 제공합니다. 아래에 사용할 수 있는 코드를 안내해드릴게요.

```js
# 간단한 PDF에서 텍스트 추출
# pip install PyMuPDF
import fitz
def PDF_To_Text(pdf_File):
    data = ""
    pdf_doc = fitz.open(pdf_File)
    for page in pdf_doc:
        data += page.get_text("text")
    return data
if __name__ == "__main__":
    pdf_File = "test.pdf"
    print(PDF_To_Text(pdf_File))
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 👉 파이썬 비디오 레코더

스크린 녹화 소프트웨어를 구입할 필요가 없어요. 여러분들만의 것을 만들 수 있으니까요. 이 자동화 스크립트는 OpenCV, Numpy 및 Pyautogui를 사용하여 화면을 최고 해상도로 60FPS로 녹화합니다. Fpsm 해상도 또는 시작 및 정지 버튼도 편집할 수 있어요. 아래 코드를 그대로 복사하고 사용하세요 😉.

```js
# 파이썬 스크린 레코더
# pip install opencv-python
# pip install numpy
# pip install pyautogui
import cv2
import numpy as np
import pyautogui
# 해상도 지정
resolution = (1920, 1080)
# 비디오 코덱 지정
codec = cv2.VideoWriter_fourcc(*"XVID")
filename = "Recording.avi"
fps = 60.0
out = cv2.VideoWriter(filename, codec, fps, resolution)
cv2.namedWindow("실시간", cv2.WINDOW_NORMAL)
cv2.resizeWindow("실시간", 480, 270)
while True:
    img = pyautogui.screenshot()

    frame = np.array(img)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    out.write(frame)
    cv2.imshow("실시간", frame)
    key = cv2.waitKey(1)

    if key == ord("s"):
        break
    elif key == ord("r"):
        continue
# 비디오 레코더 해제
out.release()
cv2.destroyAllWindows()
```

# 👉 맞춤법 검사 봇

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

온라인 맞춤법 검사기 웹 앱이 필요하지 않습니다. 이제 파이썬으로 직접 만들 수 있습니다. 맞춤법 검사를 위해 많은 텍스트가 있으면, 온라인 검사기에 하나하나 입력하는 대신 자동으로 처리할 수 있습니다. 이 파이썬 스크립트는 Autocorrect 모듈을 사용하여 맞춤법 검사 작업을 자동화할 것입니다.

```python
# 맞춤법 검사 봇
# pip install autocorrect
from autocorrect import Speller

def SpellChecker(text):
    spell = Speller(lang='en')
    corrected = spell(text)
    print(f"원본: {text}")
    print(f"수정된 내용: {corrected}")

if __name__ == "__main__":
    text = "I am goinng to the markeet"
    SpellChecker(text)
```

# 👉 무료 클라우드 저장 공간

이 자동화 스크립트는 Pydrive2 모듈을 사용하여 파일을 Google 드라이브에 저장할 것이며, 이는 클라우드 저장 공간처럼 활용할 수 있게 됩니다. 이 스크립트는 파일을 Google 드라이브에 업로드하거나 다운로드할 수 있도록 디자인되었습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 스크립트는 여러 파일이 있는 것을 상상할 때 유용합니다. 단 한 번 클릭으로 모든 파일을 Google Drive에 업로드하고 필요할 때 언제든지 다시 다운로드할 수 있습니다.

```js
# 무료 클라우드 저장소
# pip install PyDrive2
from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
def Upload_File(filename):
    auth = GoogleAuth()
    auth.LocalWebserverAuth()
    drive = GoogleDrive(auth)
    file = drive.CreateFile()
    file.SetContentFile(filename)
    file.Upload()
    print("파일이 성공적으로 업로드되었습니다")
def Download_File( filename):
    auth = GoogleAuth()
    auth.LocalWebserverAuth()
    drive = GoogleDrive(auth)
    # 검색으로 다운로드
    file_list = drive.ListFile({'q': f"title='{filename}'"}).GetList()
    for file in file_list:
        file.GetContentFile(filename)
        print("파일이 성공적으로 다운로드되었습니다")
if __name__ == "__main__":
    Upload_File("Image.png")
    Download_File("Image.png")
```

# 👉 속도 테스트 하기

이 자동화 스크립트를 사용하여 인터넷 속도에 대해 최신 정보를 얻어보세요. 이 스크립트는 OKALA 속도 테스트에서 가져온 Speedtest 모듈을 사용하여 인터넷 연결의 다운로드, 업로드 및 핑을 테스트할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

내 인터넷 속도가 떨어지거나 핑이 불안할 때 알려주는 기능이 유용합니다. 지금 바로 시도해보세요! 😎

```js
# pip install speedtest-cli
import speedtest as st
def Speed_Test():
    test = st.Speedtest()
    # 다운로드 속도 확인
    down_speed = test.download()
    down_speed = round(down_speed / 10**6, 2)
    print("다운로드 속도: ", down_speed)
    # 업로드 속도 확인
    up_speed = test.upload()
    up_speed = round(up_speed / 10**6, 2)
    print("업로드 속도: ", up_speed)
    # 핑 확인
    ping = test.results.ping
    print("핑: ", ping)
Speed_Test()
```

# 👉 마지막으로

글을 끝까지 읽어주셔서 감사합니다. 다음 프로젝트나 작업에 유용한 스크립트를 찾으셨기를 바랍니다. 공유하고 싶은 유용한 스크립트가 있으면 알려주세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래는 시청자들이 가장 사랑하는 선택된 기사들입니다. 확인해보세요.

# 간단명료한 언어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 추천하고 팔로우해 주세요 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼에서도 만나보세요: CoFeed | Differ
- 더 많은 컨텐츠는 PlainEnglish.io에서 확인하세요
