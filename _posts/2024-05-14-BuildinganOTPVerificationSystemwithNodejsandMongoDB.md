---
title: "Nodejs와 MongoDB를 사용하여 OTP 인증 시스템 구축하기"
description: ""
coverImage: "/assets/img/2024-05-14-BuildinganOTPVerificationSystemwithNodejsandMongoDB_0.png"
date: 2024-05-14 13:33
ogImage: 
  url: /assets/img/2024-05-14-BuildinganOTPVerificationSystemwithNodejsandMongoDB_0.png
tag: Tech
originalTitle: "Building an OTP Verification System with Node.js and MongoDB"
link: "https://medium.com/@techsuneel99/building-an-otp-verification-system-with-node-js-and-mongodb-1c70eb3c6171"
isUpdated: true
---




요즘의 디지털 세계에서는 보안이 매우 중요합니다. 특히 사용자 인증 프로세스에서 보안을 강화하는 일반적인 방법 중 하나는 일회용 비밀번호(OTP) 확인입니다. OTP는 사용자가 자격 증명과 함께 입력해야 하는 고유한 코드를 생성하여 보안의 추가적인 계층을 더합니다. 이 튜토리얼에서는 Node.js와 MongoDB를 사용하여 OTP 확인 시스템을 구축하는 과정을 단계별로 안내하겠습니다.

![이미지](/assets/img/2024-05-14-BuildinganOTPVerificationSystemwithNodejsandMongoDB_0.png)

# 저와 소통하기:

Linkedin: [링크](https://www.linkedin.com/in/suneel-kumar-52164625a/)



사전 준비 사항: 구현에 들어가기 전에 다음을 설치했는지 확인하세요:

- Node.js: 시스템에 Node.js가 설치되어 있는지 확인하세요. 공식 Node.js 웹사이트에서 다운로드할 수 있습니다.
- MongoDB: 사용자 데이터 및 OTP 정보를 저장할 MongoDB를 설치하세요. 공식 MongoDB 웹사이트에서 다운로드할 수 있습니다.
- 텍스트 편집기: 원하는 텍스트 편집기나 IDE를 선택하세요. VS Code, Sublime Text 또는 Atom이 인기 있는 선택지입니다.

프로젝트 설정: 프로젝트 디렉토리를 설정하고 필요한 종속성을 설치하는 것으로 시작해봅시다. 터미널을 열고 다음 단계를 따르세요:

- 프로젝트용 새 디렉토리를 만드세요:



```js
mkdir otp-verification-system
cd otp-verification-system
```

새로운 Node.js 프로젝트를 초기화하세요:

```js
npm init -y
```

필요한 종속성을 설치하세요:



```js
npm install express mongoose twilio dotenv body-parser
```

- express: 웹 서버를 만들기 위해 사용됩니다.
- mongoose: MongoDB와 상호 작용하기 위해 사용됩니다.
- twilio: SMS를 통해 OTP를 전송하는 데 사용됩니다.
- dotenv: 환경 변수를 관리하기 위해 사용됩니다.
- body-parser: 들어오는 요청 본문을 구문 분석하기 위한 미들웨어입니다.

이제 프로젝트가 설정되었으므로 OTP 인증 시스템을 구축할 차례입니다.

MongoDB 설정: 먼저 MongoDB 데이터베이스를 설정해보겠습니다. 프로젝트 디렉토리에 db.js라는 파일을 생성하고 다음 코드를 추가하세요:




```js
const mongoose = require('mongoose');

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/otp_verification', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', error => {
      console.error('MongoDB 연결 오류:', error);
      reject(error);
    });

    db.once('open', () => {
      console.log('MongoDB에 연결되었습니다');
      resolve();
    });
  });
}

module.exports = { connect };
```

이 코드는 로컬 MongoDB 인스턴스에 연결하고 otp_verification이라는 이름의 데이터베이스를 생성합니다.

사용자 모델 생성: 이제 사용자 정보를 저장할 사용자 모델을 만들어 봅시다. models/User.js 파일을 생성하고 다음 코드를 추가하세요:

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  otp: String,
  otpExpiration: Date,
});

module.exports = mongoose.model('User', userSchema);
```



이 스키마는 MongoDB의 사용자 문서 구조를 정의합니다. 여기에는 사용자 이름, 전화번호, OTP 및 OTP 만료 시간 필드가 포함됩니다.

OTP 생성 및 전송: 이제 SMS를 통해 OTP를 생성하고 전송하는 로직을 만들어 봅시다. 이를 위해 Twilio API를 사용하겠습니다. utils/otp.js라는 파일을 만들고 다음 코드를 추가하세요:

```js
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendOTP(phone, otp) {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log(`OTP sent to ${phone}: ${message.sid}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

module.exports = { sendOTP };
```

Twilio 계정을 설정하고 필요한 자격 증명(Account SID, Auth Token 및 전화번호)을 얻었는지 확인하십시오. 이 정보는 .env 파일에 저장되어야 합니다.



OTP 인증 엔드포인트 구현하기: 이제 OTP 인증을 처리하는 엔드포인트를 만들어 봅시다. routes/auth.js라는 파일을 만들고 아래 코드를 추가해주세요:

```js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendOTP } = require('../utils/otp');
const {randomInt} = require('crypto')

router.post('/sendotp', async (req, res) => {
  const { phone } = req.body;

  // 6자리 OTP 생성
  //const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otp =  randomInt(100000, 999999);

  try {
    // OTP 및 만료 시간을 데이터베이스에 저장
    const user = await User.findOneAndUpdate(
      { phone },
      { otp, otpExpiration: Date.now() + 600000 }, // OTP는 10분 후에 만료됨
      { upsert: true, new: true }
    );

    // SMS로 OTP 전송
    await sendOTP(phone, otp);

    res.status(200).json({ success: true, message: 'OTP 전송 성공' });
  } catch (error) {
    console.error('OTP 전송 중 오류 발생:', error);
    res.status(500).json({ success: false, message: 'OTP 전송 실패' });
  }
});

router.post('/verifyotp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    // 전화번호와 OTP로 사용자 찾기
    const user = await User.findOne({ phone, otp });

    if (!user || user.otpExpiration < Date.now()) {
      return res.status(400).json({ success: false, message: '유효하지 않은 OTP' });
    }

    // 성공적으로 확인된 후 OTP 및 만료 시간 비우기
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'OTP 확인 성공' });
  } catch (error) {
    console.error('OTP 확인 중 오류 발생:', error);
    res.status(500).json({ success: false, message: 'OTP 확인 실패' });
  }
});

module.exports = router;
```

이 코드는 /sendotp 엔드포인트로 OTP를 생성하고 전송하고, /verifyotp 엔드포인트로 사용자가 입력한 OTP를 확인합니다.

서버 시작하기: 마지막으로 애플리케이션을 시작하기 위한 주 서버 파일을 생성해봅시다. server.js라는 파일을 만들고 아래 코드를 추가해주세요:



```js
const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./db'); // db.js에서 connect 함수를 가져옴
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(bodyParser.json());

// 라우트
app.use('/auth', authRoutes);

// 서버를 시작하기 전에 데이터베이스에 연결
connect()
  .then(() => {
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
    });
  })
  .catch(error => {
    console.error('데이터베이스 연결 중 오류 발생:', error);
  });
```

이 코드는 Express 서버를 설정하고, 수신된 JSON 요청을 파싱하며, 인증을 위한 라우트를 정의합니다.

결론: 축하합니다! Node.js와 MongoDB를 사용하여 OTP(일회용 비밀번호) 확인 시스템을 성공적으로 구축했습니다. SMS로 전송된 일회용 비밀번호를 통해 사용자의 신원을 확인함으로써 응용 프로그램에 추가적인 보안층을 추가했습니다. OTP 확인을 기반으로 한 이메일, 요청 속도 제한, 오류 처리 기능을 추가함으로써 이 시스템을 확장하실 수 있습니다.

이 튜토리얼에서 다룬 내용:
  



- 사용자 데이터 저장을 위해 MongoDB 설정하기
- Twilio를 사용하여 SMS를 통해 OTP 생성 및 전송
- OTP 인증 엔드포인트 구현하기