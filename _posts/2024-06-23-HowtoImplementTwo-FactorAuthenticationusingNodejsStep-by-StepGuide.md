---
title: "Nodejs를 이용한 이중 인증 구현 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_0.png"
date: 2024-06-23 13:21
ogImage: 
  url: /assets/img/2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_0.png
tag: Tech
originalTitle: "How to Implement Two-Factor Authentication using Node.js: Step-by-Step Guide"
link: "https://medium.com/gitconnected/go-beyond-passwords-secure-your-node-js-empire-with-two-factor-authentication-2fa-ff63c4b93112"
---


오늘날의 디지턈 시대에서는 보안이 매우 중요합니다, 특히 웹 애플리케이션의 경우에는 더욱 그렇습니다. 두 단계 인증(2FA)을 구현하는 것은 애플리케이션의 보안을 향상시키는 효율적인 기술입니다.

이 게시물은 node.js 개발자에게 가치 있는 정보일 것이지만, 개발자가 아니더라도 모든 프로그래밍 언어에 적용되는 주제이므로 여러분에게 많은 도움이 될 것입니다. Twilio Authy, Microsoft Authenticator, Google Authenticator 등 인기있는 인증 앱이 많이 있습니다. 이 튜토리얼에서는 Google Authenticator를 사용하여 2FA가 무엇인지, 애플리케이션 보안에 어떻게 도움이 되는지, 그리고 구현하는 방법에 대한 단계별 지침을 제공할 것입니다.

## 두 단계 인증(2FA)이란 무엇인가요?

<div class="content-ad"></div>

이중 인증 또는 2FA는 사용자가 자신의 신원을 확인하기 위해 두 가지 다른 요소를 제공해야하는 보안 메커니즘입니다. 이러한 요소는 일반적으로 세 가지 범주로 나뉩니다:

- 알고 있는 것 (예: 비밀번호)
- 소지품 (예: 모바일 기기)
- 본인인 것 (예: 생체 인식)

일반적인 사용자 이름 및 비밀번호 조합 이외에도 2FA는 더 높은 수준의 보안을 추가합니다. 해커가 비밀번호를 얻거나 추측해도 두 번째 요소 없이 계정에 액세스할 수 없습니다.

## Google Authenticator를 사용한 Node.js에서의 2FA 구현

<div class="content-ad"></div>

2FA를 Node.js 애플리케이션에 Google Authenticator 앱을 사용하여 통합하는 방법을 알아봐요. 코딩 부분에 들어가기 전에 먼저 이 과정에 포함된 단계를 이해해 봅시다.

- 비밀 키 생성: 사용자 등록 시마다 각 사용자를 위한 고유한 비밀 키를 생성해요.
- QR 코드 생성: 비밀 키를 사용하여 사용자가 Google Authenticator 앱으로 스캔할 수 있는 QR 코드를 생성해요.
- 사용자 설정: 애플리케이션에서 사용자에게 QR 코드 또는 비밀 키를 제공해요. 사용자는 Google Authenticator 앱으로 QR 코드를 스캔해야 해요.
- OTP 코드 생성: 서버에서 비밀 키를 사용하여 시간 기반 일회용 암호(TOTP)를 생성해요. 이 코드는 매 30초마다 바뀌어요.
- 사용자 인증: 로그인 시 사용자는 Google Authenticator 앱에서 생성된 현재 OTP를 입력해야 해요.
- 검증: 사용자가 입력한 OTP를 서버에서 생성된 OTP와 비교해요. 일치하면 사용자가 인증됩니다.

이제 재미있는 부분이 다가와요 :) 우리는 위 단계들을 모두 코드로 변환할 거에요.

<div class="content-ad"></div>

양방향 인증을 구현하기 전에 다음 사전 요구 사항을 갖추었는지 확인해주세요:

- JavaScript 또는 TypeScript의 기본 지식.
- API 디자인과 CRUD 패턴에 대한 기본 이해.
- 시스템에 Node.js의 최신 버전이 설치되어 있어야 합니다.
- Node.js와 Express에 대한 기본 지식이 있어야 합니다.

## 단계 1: Node.js 프로젝트 설정

시작하기 위해 프로젝트용 새 디렉토리를 만들고 터미널에서 해당 디렉토리로 이동한 후 새 Node.js 프로젝트를 초기화하고 필요한 패키지를 설치하세요. 아래 명령어를 터미널에서 실행해보세요.

<div class="content-ad"></div>

```js
mkdir node_2fa
cd node_2fa
npm init -y
npm install express otpauth hi-base32
```

- express – Node.js 웹 프레임워크
- otpauth – TOTP를 생성하고 유효성을 검사하는 라이브러리
- hi-base32 – 데이터를 Base32 형식으로 인코딩 및 디코딩하는 기능을 제공하는 라이브러리입니다. Authenticator 앱에서 TOTP를 생성하는 데 사용할 것입니다.

## 단계 2: Express 서버 설정

프로젝트에 index.js 파일을 만들고 기본 express 서버를 설정하세요.

<div class="content-ad"></div>

```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('이중 인증 예제');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다`);
});
```

## 단계 3: 사용자 등록

이 단계에서는 사용자 등록을 구현하고 사용자 정보를 안전하게 저장합니다. 보통 이를 위해 데이터베이스를 사용하지만, 이 예시에서는 간단함을 위해 내부 배열을 사용합니다. MongoDB를 이용한 포괄적인 예시는 제 GitHub 레포지토리에서 확인할 수 있습니다. https://github.com/Nik720/2fa-nodejs

```js
const users = [];

// 새로운 사용자 등록을 위한 엔드포인트
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1;

  // 사용자 정보를 안전하게 저장 (사용자의 비밀번호 포함)
  users.push({ id, username, password });
  res.status(201).send({
    status: "성공",
    message: "사용자가 성공적으로 생성되었습니다"
  });
});
```

<div class="content-ad"></div>


![Step 4: Enable Two-Way Authentication](/assets/img/2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_1.png)

## 단계 4: 두 가지 요소 인증 활성화

이제 otpauth 라이브러리를 사용하여 두 가지 요인 인증을 구축해 봅시다. 사용자가 인증 앱으로 스캔할 수있는 QR 코드를 표시하고 일회용 코드를 확인하는 비밀 키를 생성하는 것이 이 프로세스의 단계입니다.

```js
const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');

// 두 가지 요소 인증 활성화를 위한 엔드포인트
app.post('/enable-2fa', (req, res) => {
  const { username } = req.body;

  // 사용자를 사용자 이름으로 찾기 (여기서는 데이터베이스를 사용해야 함)
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send('사용자를 찾을 수 없습니다.');
  }

  // 사용자를 위한 비밀 키 생성
  const base32_secret = generateBase32Secret();
  user.secret = base32_secret;

  // 사용자가 스캔할 QR 코드 URL 생성
  let totp = new OTPAuth.TOTP({
      issuer: "YourSite.com",
      label: "YourSite",
      algorithm: "SHA1",
      digits: 6,
      secret: base32_secret,
  });

  let otpauth_url = totp.toString();

  // 생성된 QR 코드를 응답으로 보내기
  QRCode.toDataURL(otpauth_url, (err) => {
        if(err) {
            return res.status(500).json({
                status: 'fail',
                message: "QR 코드 생성 중 오류 발생"
            })
        }
        res.json({
            status: "success",
            data: {
                qrCodeUrl: qrUrl,
                secret: base32_secret
            }
        })
    })
});

const generateBase32Secret = () => {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
};
```


<div class="content-ad"></div>

위 코드 스니펫에서 개발한 GenerateBase32Secret() 메서드는 base32로 인코딩된 비밀 키를 생성하는 데 사용됩니다. 이 키는 TOTP 생성 메커니즘의 중요한 구성 요소입니다. 또한 필요한 인수로 인스턴스화 한 후에 totpvariable에 OTPAuth.TOTP 클래스를 할당했습니다.

다음으로, totp.toString() 함수를 사용하여 TOTP Auth URL을 가져왔습니다. QR 코드를 생성하고 응용 프로그램에서 TOTP 인증을 구성하기 위해 필요한 인코딩된 비밀과 필요한 설정은 이 URL에서 사용할 수 있습니다. 또한, 미래에 이러한 값을 사용할 수 있도록 base32 비밀 문자열을 사용자 객체에 저장했습니다.

마지막 단계에서는 QR 코드 라이브러리를 사용하여 otpauth_url로 QR 코드를 만들고 JSON 응답에 QR 코드 URL과 base32 비밀 문자열을 반환했습니다. 클라이언트에게 이러한 값을 반환함으로써 클라이언트 측 구현을 유연하고 쉽게 할 수 있습니다. 이를 통해 클라이언트는 base32 비밀 문자열을 사용하거나 인증 애플리케이션을 스캔하여 QR 코드를 사용하여 관련 TOTP 토큰을 생성할 수 있습니다.

<div class="content-ad"></div>

인증 확인의 마지막 단계로 진행하기 전에, 먼저 인증 앱을 구성하여 다음 단계에서 토큰으로 제공될 6자리 코드를 생성해야 합니다.

Google Authenticator 앱을 활성화하기 위해 중요한 몇 가지 단계가 필요합니다. 이를 편리하게 하기 위해 여기서는 Chrome 확장 프로그램을 사용하고 있습니다. API에서 제공된 base64 비밀을 수동으로 입력하거나 계정을 추가하기 위해 QR 코드를 스캔해야 합니다.

![2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_3.png](/assets/img/2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_3.png)

## 단계 5: 양방향 인증 확인하기

<div class="content-ad"></div>

마침내, 사용자가 제공한 일회용 코드를 확인하는 엔드포인트를 구현하세요. 이 단계에서는 인증 앱에서 생성된 6자리 코드를 전달하여 사용자의 신원을 확인해야 합니다.

```js
// 두 단계 인증 코드를 검증하는 엔드포인트
app.post('/verify-2fa', (req, res) => {
  const { username, token } = req.body;

  // 사용자명으로 사용자 찾기
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).send('사용자를 찾을 수 없습니다');
  }

  // 토큰을 검증합니다.
  let totp = new OTPAuth.TOTP({
      issuer: "YourSite.com",
      label: "YourSite",
      algorithm: "SHA1",
      digits: 6,
      secret: user.secret!,
   });

  let delta = totp.validate({ token });

  if(delta) {
        res.json({
            status: "success",
            message: "인증 성공"
        })
    } else {
        res.status(401).json({
            status: "fail",
            message: "인증 실패"
        }) 
    }
});
```

<img src="/assets/img/2024-06-23-HowtoImplementTwo-FactorAuthenticationusingNodejsStep-by-StepGuide_4.png" />

이 게시물은 2단계 인증의 기본 설정 및 사용법을 다룹니다. 사용자의 존재 여부를 확인하는 기능을 구현했지만, 실제 구현에서는 2FA를 활성화하거나 비활성화하거나 인증하기 전에 사용자 로그인 상태를 추가로 확인해야 합니다.

<div class="content-ad"></div>

MongoDB 데이터베이스를 활용한 포괄적인 예제를 구축했어요. 모든 필수 API 엔드포인트와 미들웨어를 통합했습니다. 자세한 내용은 GitHub 레포지토리를 방문해주세요. https://github.com/Nik720/2fa-nodejs

최초 블로그 게시: https://codeshakti.com/how-to-implement-two-factor-authentication-using-node-js-step-by-step-guide/

## 결론

이 게시물에서 설명된 기술들인 QR 코드 기반 토큰 생성 및 안전한 OTP 확인을 적용함으로써, 무단 접근에 대한 강력한 방어막을 만들고 Node.js 사용자에게 비교할 수 없는 보호를 제공할 수 있습니다. 오늘부터 2FA 시스템을 구축하여 더 안전한 디지털 공간으로 나아가는 첫걸음을 내딛어보세요!

<div class="content-ad"></div>

# 이 글을 즐겼나요?

다음 글에서는 노드 JS 클러스터 모듈을 활용하여 로드 밸런서를 만드는 방법에 대해 더 자세히 다룰 것입니다.

제 글이 마음에 드셨다면 아래 작은 👏을 눌러주세요 (50번 타포도 가능합니다). 더 많은 기술 기사를 위해 팔로우해주세요. 친구들 👦, 동료들 👭 🧑‍🤝‍🧑 와 공유해주세요.

여러분의 지지를 감사히 받겠습니다. 💚 읽어 주셔서 감사합니다! 🙏

<div class="content-ad"></div>

제 블로깅 사이트 codeshakti.com에서 기술 블로그에 대해 더 많은 정보를 찾아보세요.

코딩 즐거움을 느끼세요... 😁