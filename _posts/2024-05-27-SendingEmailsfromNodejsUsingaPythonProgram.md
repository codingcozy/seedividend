---
title: "Nodejs를 사용하여 파이썬 프로그램을 이용해 이메일 보내기"
description: ""
coverImage: "/assets/img/2024-05-27-SendingEmailsfromNodejsUsingaPythonProgram_0.png"
date: 2024-05-27 18:22
ogImage: 
  url: /assets/img/2024-05-27-SendingEmailsfromNodejsUsingaPythonProgram_0.png
tag: Tech
originalTitle: "Sending Emails from Node.js Using a Python Program"
link: "https://medium.com/@preranapupadhya/sending-emails-from-node-js-using-a-python-program-042ac5b04d80"
isUpdated: true
---




이 블로그 포스트에서는 Node.js 애플리케이션에서 Python 스크립트를 호출하여 이메일을 보내는 방법을 살펴보겠습니다. 우리는 프로젝트 구조를 설계하여 관심사를 분리하고 코드베이스를 깔끔하게 유지할 것입니다.

## 목차

- 소개
- 프로젝트 구조
- 환경 설정
- Python 이메일 발신 스크립트 생성
- Node.js 컨트롤러 생성
- 라우트 설정
- 서버 생성
- 결론

### 1. 소개

<div class="content-ad"></div>

어떤 경우에는 Node.js 애플리케이션에서 Python의 기능을 활용하고 싶을 수 있습니다. 이 튜토리얼은 Node.js 백엔드에서 Python을 사용하여 이메일을 보내는 방법을 보여줍니다. 우리는 Node.js의 child_process 모듈에서 spawn 함수를 사용하여 Python 스크립트를 호출할 것입니다.

# 2. 프로젝트 구조

다음은 우리 프로젝트의 구조입니다:


server/
  ├── Controller/
  │   └── mailController.js
  ├── route/
  │   └── mailRoute.js
  ├── Utils/
  │   └── mailSender.py
  └── server.js
  └── .env


<div class="content-ad"></div>

# 3. 환경 설정하기

## 단계 1: Node.js 프로젝트 초기화

```js
mkdir email-sender
cd email-sender
npm init -y
npm install express dotenv body-parser
```

## 단계 2: 환경 변수 설정

<div class="content-ad"></div>

루트 디렉토리에 다음 내용을 사용하여 .env 파일을 만들어주세요:

```js
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

your-email@gmail.com 및 your-app-password를 실제 Gmail 주소 및 앱 비밀번호로 교체해주세요. Gmail 보안 탭 내에서 앱 비밀번호를 얻을 수 있습니다.

# 4. 파이썬 이메일 발신 스크립트 만들기

<div class="content-ad"></div>

Utils 디렉토리에 mailSender.py라는 Python 스크립트를 만들어주세요:

```python
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(to_email, subject, body):
    from_email = os.environ['GMAIL_USER']
    app_password = os.environ['GMAIL_APP_PASSWORD']

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, app_password)
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        print("이메일을 성공적으로 전송했습니다.")
    except Exception as e:
        print(f"이메일 전송에 실패했습니다: {str(e)}")

if __name__ == "__main__":
    import sys
    to_email = sys.argv[1]
    subject = sys.argv[2]
    body = sys.argv[3]
    send_email(to_email, subject, body)
```

# 5. Node.js Controller 생성

Controller 디렉토리에 mailController.js라는 파일을 만들어주세요.

<div class="content-ad"></div>

```js
const { spawn } = require('child_process');
const path = require('path');

exports.sendEmail = (req, res) => {
  const { to, subject, body } = req.body;
  const pythonProcess = spawn('python3', [path.join(__dirname, '../Utils/mailSender.py'), to, subject, body]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send('Email sent');
  });
};
```

# 6. Setting Up the Routes

라우트 설정하기

route 디렉토리에 mailRoute.js라는 파일을 만드세요:

```js
const express = require('express');
const router = express.Router();
const mailController = require('../Controller/mailController');

router.post('/send-email', mailController.sendEmail);

module.exports = router;
```

<div class="content-ad"></div>

# 7. 서버 생성

루트 디렉토리에 server.js라는 파일을 생성하세요:

```js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mailRoute = require('./route/mailRoute');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', mailRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
```

# 8. 결론

<div class="content-ad"></div>

이 블로그 포스트에서는 Node.js 애플리케이션에서 Python 스크립트를 호출하여 이메일을 보내는 방법을 소개했습니다. 프로젝트 구조 설정, 환경 변수 구성, Python 전자 메일 발신자 스크립트 작성, 그리고 Node.js 백엔드를 설정하여 spawn 함수를 사용하여 Python 스크립트를 호출하는 방법에 대해 다뤘습니다. 이 접근 방식은 Node.js와 Python의 강점을 활용하여 유연하고 강력한 이메일 발송 솔루션을 제공합니다.

이 단계를 따라가면 Python 스크립트를 Node.js 애플리케이션에 매끄럽게 통합하여 두 언어의 최상의 기능을 활용할 수 있습니다.

더 나아가 향상된 이메일 처리 및 추가 기능을 위해 Python의 smtplib의 능력과 다양한 이메일 콘텐츠 및 첨부 파일을 처리하는 방법을 탐색하고 싶을 것입니다. 즐거운 코딩 하세요!