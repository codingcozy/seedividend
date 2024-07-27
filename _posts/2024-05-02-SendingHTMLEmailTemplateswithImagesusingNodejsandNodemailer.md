---
title: "Node.js와 Nodemailer로 이미지를 포함한 HTML 이메일 템플릿 보내기"
description: ""
coverImage: "/assets/img/2024-05-02-SendingHTMLEmailTemplateswithImagesusingNodejsandNodemailer_0.png"
date: 2024-05-02 00:48
ogImage: 
  url: /assets/img/2024-05-02-SendingHTMLEmailTemplateswithImagesusingNodejsandNodemailer_0.png
tag: Tech
originalTitle: "Sending HTML Email Templates with Images using Node.js and Nodemailer"
link: "https://medium.com/@raghavendralacharya/sending-html-email-templates-with-images-using-node-js-and-nodemailer-719a1f1dc894"
---


<img src="/assets/img/2024-05-02-SendingHTMLEmailTemplateswithImagesusingNodejsandNodemailer_0.png" />

웹 개발의 세계에서는 맞춤화된 시각적으로 매력적인 이메일 템플릿을 보내는 것이 사용자 참여를 크게 향상시킬 수 있습니다. 이 블로그 글에서는 Node.js, Nodemailer 및 이미지가 포함된 HTML 이메일 템플릿을 사용하여 이를 어떻게 구현할 수 있는지 살펴보겠습니다.

# 준비 단계 설정

코드에 들어가기 전에 필요한 패키지가 설치되어 있는지 확인해 보겠습니다:

<div class="content-ad"></div>

```js
npm install nodemailer html-to-text
```

# 단계 1: HTML 이메일 템플릿 생성하기

내장된 이미지가 포함된 멋진 HTML 이메일 템플릿을 만들어보세요. 간단한 예제를 함께 보여드리겠습니다:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>당신의 멋진 이메일</title>
</head>
<body>
    <h1>안녕하세요 [수신자]님!</h1>
    <p>이것은 내장 이미지가 포함된 샘플 이메일입니다:</p>
    <img src="cid:uniqueImageCID" alt="내장 이미지">
    <p>읽어주셔서 감사합니다!</p>
</body>
</html>
```

<div class="content-ad"></div>

이 예제에서 우리는 src 속성을 "cid:uniqueImageCID"로 설정한 `img` 태그를 가지고 있습니다. 이 cid 표기법은 포함된 이미지를 참조하는 데 사용됩니다.

# 단계 2: Node.js 및 Nodemailer 설정

이제, 이메일을 보내기 위한 Node.js 스크립트를 설정해 봅시다. 다음 코드가 포함된 파일(예: sendEmail.js)을 생성하십시오:

```js
const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function sendEmail() {
    // HTML 템플릿 및 이미지 파일 읽기
    const htmlTemplate = await readFileAsync('path/to/your/template.html', 'utf-8');
    const imageAttachment = await readFileAsync('path/to/your/image.png');

    // Nodemailer 전송기 생성
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your.email@gmail.com',
            pass: 'your-email-password',
        },
    });

    // 이메일 보내기
    const info = await transporter.sendMail({
        from: 'your.email@gmail.com',
        to: 'recipient.email@example.com',
        subject: '제목',
        html: htmlTemplate,
        attachments: [{
            filename: 'image.png',
            content: imageAttachment,
            encoding: 'base64',
            cid: 'uniqueImageCID', // HTML 템플릿에서 참조됨
        }],
    });

    console.log('이메일 전송 완료:', info.messageId);
}

sendEmail();
```

<div class="content-ad"></div>

테이블 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

이메일 받은 편지함을 확인해보세요. 메일에 내장된 이미지가 있을 거에요.

# 결론

Node.js와 Nodemailer를 사용하여 HTML 이메일 템플릿을 보내고 이미지를 삽입하는 것은 사용자들과 시각적으로 매력적이고 맞춤형 커뮤니케이션을 만들 수 있는 강력한 방법입니다. 다양한 HTML 디자인으로 실험을 해보고 매료적인 이메일 콘텐츠로 관객을 유도해 보세요.

HTML 템플릿을 자유롭게 수정하고, 특정 요구사항에 기반해 기능을 확장해 보세요.

<div class="content-ad"></div>

좋은 이메일 보내기!