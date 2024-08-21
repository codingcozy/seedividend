---
title: "Expressjs 프로젝트를 AWS EC2에 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_0.png"
date: 2024-06-22 14:03
ogImage:
  url: /assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_0.png
tag: Tech
originalTitle: "How to deploy Express.js project to AWS EC2?"
link: "https://medium.com/@yingxueliu73/c2how-to-deploy-express-js-project-to-aws-ec2-3c6e68d7dca4"
isUpdated: true
---

<img src="/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_0.png" />

# 목차

- AWS EC2 인스턴스 생성 (Linux)
- SSH 액세스용 키페어 생성
- 서버 환경 설정
- 서버 어플리케이션 실행

# 1. AWS EC2 인스턴스 생성 (Linux)

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

AWS 콘솔에 로그인하면 상단 바에 검색 상자가 나타납니다. "ec2"를 입력하고 EC2 대시보드를 엽니다.

![이미지 설명](/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_1.png)

EC2 대시보드에서 '인스턴스 시작' 패널을 찾아 새 인스턴스를 생성하려면 '인스턴스 시작'을 클릭하세요. 이렇게 하면 아래와 같은 새 페이지가 열릴 것입니다.

![이미지 설명](/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_2.png)

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

인스턴스 이름을 입력하고 인스턴스 OS로 "Amazon Linux"을 선택하세요.

"Key pair(login)" 패널에서 인스턴스용 키페어를 만드세요. 이미 키페어가 있는 경우, 기존 것을 선택하시면 됩니다.

<img src="/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_3.png" />

그리고 .pem 파일을 저장하여 EC2 인스턴스에 액세스하세요.

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

# 2. SSH 액세스를 위한 키페어 생성

이미 Node 프로젝트용 EC2 인스턴스가 있으면이 단계를 건너 뛰세요.

EC2 인스턴스가 있지만 SSH 액세스를 위한 키페어가 없는 경우 "EC2 Key pair" 페이지를 만들 수 있습니다.

![EC2 Key pair](/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_4.png)

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

![image](/assets/img/2024-06-22-HowtodeployExpressjsprojecttoAWSEC2_5.png)

"Create key pair"를 클릭하여 .pem 파일을 다운로드할 수 있으며, 이것은 "Key pairs" 페이지 표에 나열됩니다.

예를 들어, pem 파일 이름이 ec2-key.pem이고 인스턴스 이름이 ec2-012-345-678.computer-1.amazonaws.com이라고 가정해 봅시다.

이제 터미널에서 EC2 인스턴스에 액세스할 수 있습니다.

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

터미널을 열고 ec2-key.pem 파일이 있는 디렉토리로 이동해주세요.

```js
$ ssh -i ec2-key.pem ec2-user@ec2-012-345-678.computer-1.amazonaws.com

"Amazon Linux"의 새로운 릴리스가 있습니다.
  Version 2023.3.20240219:
  Version 2023.3.20240304:
  Version 2023.3.20240312:
  Version 2023.4.20240319:
  Version 2023.4.20240401:
  Version 2023.4.20240416:
  Version 2023.4.20240429:
  Version 2023.4.20240513:
  Version 2023.4.20240528:
  Version 2023.4.20240611:
전체 릴리스 및 버전 업데이트 정보 확인을 위해 "/usr/bin/dnf check-release-update"를 실행하세요.
   ,     #_
   ~\_  ####_        Amazon Linux 2023
  ~~  \_#####\
  ~~     \###|
  ~~       \#/ ___   https://aws.amazon.com/linux/amazon-linux-2023
   ~~       V~' '->
    ~~~         /
      ~~._.   _/
         _/ _/
       _/m/'
마지막 로그인: 2024년 6월 20일 목요일 20:21:34, 91.74.112.249부터 로그인했습니다.
-bash: export: `.bashrc': not a valid identifier
[ec2-user@EC2_HOSTNAME ~]$
```

콘솔에 위와 같은 메시지가 나타날 것입니다.

# 3. 서버 환경 설정

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

Express.js 서버를 실행하려면 EC2에 Node를 설치해야 합니다.

nvm을 사용하여 Node.js를 설치하세요.

nvm 설치 방법:

```js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
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

Node(20)을 설치하세요:

```js
nvm install 20
```

올바르게 설치되었는지 확인하세요:

```js
node --version
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

만약 GitHub에 Express 프로젝트가 있다면, git clone 명령어를 사용하여 프로젝트를 EC2로 가져올 수 있습니다.

파일과 디렉토리를 살펴보려면 ls를 사용하세요. 숨겨진 파일과 디렉토리를 모두 볼 때는 ls -a를 사용하세요. 그리고 마침표(.)로 시작하는 모든 파일과 디렉토리를 볼 수 있습니다.

만약 GitHub 프로젝트가 없다면 지금은 괜찮습니다.

node-app이라는 폴더를 만들기 위해 mkdir node-app를 사용하세요. Node.js 프로젝트를 만들기 위해 npm init -y를 사용할 수 있습니다.

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
cd mkdir
npm init -y
```

그런 다음 이 간단한 Express.js 애플리케이션 코드를 붙혀넣어주세요.

```js
npm install express

nano app.js
```

이 코드를 app.js에 복사해주세요.

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
const express = require("express");

// express의 인스턴스 생성
const app = express();

// 루트 URL ("/")에 대한 라우트 정의
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 포트 3000에서 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
```

이제 간단한 hello-world Node 서버 애플리케이션이 준비되었습니다.

`node app` 명령을 실행하면 콘솔에 '서버가 http://localhost:3000에서 실행 중입니다.' 메시지가 표시됩니다.

브라우저를 열고 다음 URL을 입력하여 확인해보세요: `http://ec2-012-345-678.computer-1.amazonaws.com:3000`. 브라우저에 'Hello World!'가 표시될 것입니다.

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

좋아요, 거의 완료하셨네요!

보이지 않으신가요? 제게 알려주세요.

# 4. 서버 애플리케이션 실행

터미널을 닫으면 서버 애플리케이션이 종료됩니다.

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

서버 애플리케이션을 실행하려면 pm2 모듈을 사용할 수 있어요.

pm2 모듈을 전역으로 설치하고 프로젝트 폴더에서 pm2 start app을 실행하세요.

pm2에 대한 자세한 정보는 pm2 공식 웹사이트에서 확인할 수 있어요.
