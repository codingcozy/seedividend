---
title: "백엔드 서버를 작성하면 어드민 대시보드를 무료로 제공받을 수 있습니다"
description: ""
coverImage: "/assets/img/2024-05-16-WriteabackendserverandyougetanAdminDashboardforfree_0.png"
date: 2024-05-16 16:30
ogImage:
  url: /assets/img/2024-05-16-WriteabackendserverandyougetanAdminDashboardforfree_0.png
tag: Tech
originalTitle: "Write a backend server, and you get an Admin Dashboard for free!"
link: "https://medium.com/@victor.teo/write-a-backend-server-and-you-get-an-admin-dashboard-for-free-bb2d2aeb041f"
isUpdated: true
---

테오(Teo)는 당신을 위해 관리자 대시보드를 생성할 수 있는 훌륭한 웹 프레임워크입니다.

![Teo Admin Dashboard](https://miro.medium.com/v2/resize:fit:1400/1*1SeQK64Z5ERRtbDqA4sEmQ.gif)

이 기사에서는 당신에게 Teo를 사용하여 간단한 백엔드 서버를 작성하고 무료로 생성된 관리자 대시보드를 보여드릴 것입니다.

# 프로젝트 생성

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

새로운 디렉토리를 만들어서 그 안에 "schema.teo"라는 파일을 생성합시다. 문법 강조와 자동 완성을 위해 이 VSCode 플러그인을 설치할 수 있어요.

```js
connector {
  provider: .sqlite,
  url: "sqlite:./database.sqlite",
}

server {
  bind: ("0.0.0.0", 5054)
}

admin {
  dest: "../hello-teo-admin-dashboard",
  host: .inject("process.env.TEO_HOST"),
  languages: [.enUs, .enUk, .de, .es, .fr, .he, .hi, .ja, .ko, .zhCn, .zhTw]
}

@identity.tokenIssuer($identity.jwt(expired: 3600 * 24 * 365))
@identity.jwtSecret(ENV["JWT_SECRET"]!) @admin.administrator
model Root {
  @id @autoIncrement @readonly
  id: Int
  @unique @onSet($if($presents, $isEmail)) @identity.id
  email: String
  @writeonly @onSet($presents.bcrypt.salt) @admin.secureInput
  @identity.checker($get(.value).presents.bcrypt.verify($self.get(.password).presents))
  password: String

  include handler identity.signIn
  include handler identity.identity
}

@identity.tokenIssuer($identity.jwt(expired: 3600 * 24 * 365))
@identity.jwtSecret(ENV["JWT_SECRET"]!) @admin.administrator
model Admin {
  @id @autoIncrement @readonly
  id: Int
  @unique @onSet($if($presents, $isEmail)) @identity.id
  email: String
  @unique @identity.id
  phoneNo: String
  @writeonly @onSet($presents.bcrypt.salt) @admin.secureInput
  @identity.checker($get(.value).presents.bcrypt.verify($self.get(.password).presents))
  password: String

  include handler identity.signIn
  include handler identity.identity
}

enum Sex {
  male
  female
}

model Record {
  @id @autoIncrement @readonly
  id: Int
  string: String
  bool: Bool
  int: Int
  float: Float
  decimal: Decimal
  date: Date
  dateTime: DateTime
  sex: Sex
}

model NullableRecord {
  @id @autoIncrement @readonly
  id: Int
  string: String?
  bool: Bool?
  int: Int?
  float: Float?
  decimal: Decimal?
  date: Date?
  dateTime: DateTime?
  sex: Sex?
}

middlewares [identity.identityFromJwt(secret: ENV["JWT_SECRET"]!)]

autoseed dataset default {
  group Admin {
    record admin {
      email: "admin@gmail.com",
      phoneNo: "13588888888",
      password: "Aa123456"
    }
  }
  group Root {
    record root {
      email: "root@gmail.com",
      password: "Aa123456"
    }
  }
}
```

테오 스키마 언어는 아주 자세하고 읽기 쉽습니다. 이 스키마에서 다음과 같은 사항을 선언합니다:

- HTTP 서버가 어떻게 바인딩되는지
- 어떤 데이터베이스에 연결하는지
- 어디에 우리의 Admin 대시보드 코드를 생성하는지
- 인증 미들웨어
- 모델 정의
- 시드 데이터

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

우리는 딱 100줄로 많은 것들을 선언했어요. 구문이 매우 간결해요.

인증 미들웨어와 모델 데코레이터에서 "JWT_SECRET"라는 환경 변수가 있을 거에요. 이 내용을 담은 " .env" 파일을 만들어봐요.

```js
JWT_SECRET = my_top_secret;
```

# Teo 설치하기

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

당신의 기술 스택과 선호도에 따라 Rust 버전, Node.js 버전 또는 Python 버전을 설치할 수 있어요. 이 중 하나를 선택해 주세요.

Rust 버전을 설치하려면 "cargo"를 사용하세요.

```js
cargo install teo
```

Node.js 버전을 설치하려면, 이 명령을 실행하여 로컬 디렉토리에 설치하세요.

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

npm init -y
npm install typescript ts-node -D
npx tsc --init
npm install @teocloud/teo

파이썬 버전을 설치하려면 venv를 추천합니다.

python3.12 -m venv .venv
source .venv/bin/activate
pip install teo

Teo는 다른 웹 프레임워크와 마찬가지로 프로그래밍 코드로 라우트 핸들러를 작성하고 Teo의 ORM API에 접근할 수 있습니다. 이 글에서는 그를 다루지 않을 거예요.

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

# 어드민 대시보드 생성하기

Teo를 설치한 후, 이 몤령어를 실행하여 어드민 대시보드 코드를 생성하세요. 어드민 대시보드는 TypeScript와 React로 작성되어 있습니다. 완전히 사용자 정의가 가능합니다. 생성된 코드와 사용자 확장 코드는 충돌하지 않습니다.

Rust 명령어:

```js
cargo teo generate admin
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

Node.js 명령어:

```bash
npx teo generate admin
```

Python 명령어 (venv를 활성화한 상태):

```bash
teo generate admin
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

# 서버 시작하기

서버를 시작하려면 'teo serve' 명령을 사용하세요.

Rust 명령:

```js
cargo teo serve
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

Markdown 형식의 표:

| 언어                 | 명령어          |
| -------------------- | --------------- |
| Node.js              | `npx teo serve` |
| Python (venv 활성화) | `teo serve`     |

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

# 관리자 대시보드 시작하기

생성된 관리자 대시보드가 있는 디렉토리로 이동하세요. 의존성을 설치하고 웹팩 서버를 시작하세요. 시스템에 Node.js가 설치되어 있어야 합니다.

```js
npm install
npm start
```

# 브라우저에서 localhost:9000 열기

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

마지막 단계는 브라우저를 열어 확인해 보는 거예요. 여기 로그인 자격 증명이 있어요:

- 관리자 이메일: admin@gmail.com
- 루트 이메일: root@gmail.com
- 비밀번호: Aa123456

계정 중 하나를 선택해서 로그인하세요.

이제 레코드를 나열하거나 생성, 업데이트, 삭제할 수 있어요. 차트, 그래프 및 표와 같은 더 많은 기능이 나중에 구현될 거예요.

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

![image](https://miro.medium.com/v2/resize:fit:1400/1*vEfD5wQTIrAAsGBqxOapJw.gif)

# 요약

이 글이 마음에 드셨다면, GitHub에서 별을 클릭하여 우리에게 격려를 해주세요.

GitHub: https://github.com/teocloud/teo

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

공식 웹사이트: [https://teodev.io](https://teodev.io)

더욱 개선해 나갈 것이며, 여러분의 요구에 맞게 더 많은 기능을 추가할 예정입니다.
