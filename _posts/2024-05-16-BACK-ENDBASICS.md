---
title: "백엔드 기본 사항"
description: ""
coverImage: "/assets/img/2024-05-16-BACK-ENDBASICS_0.png"
date: 2024-05-16 03:46
ogImage: 
  url: /assets/img/2024-05-16-BACK-ENDBASICS_0.png
tag: Tech
originalTitle: "BACK-END BASICS"
link: "https://medium.com/@guilhermehuther/back-end-basics-e9a2ed1f244a"
isUpdated: true
---




## Node.js와 PostgreSQL 데이터베이스를 활용한 RESTful API 및 AWS EC2 인스턴스 배포 기본

![Image](/assets/img/2024-05-16-BACK-ENDBASICS_0.png)

이 튜토리얼은 백엔드 개발의 특정 측면에 초점을 맞춥니다: Node.js를 사용하여 PostgreSQL 데이터베이스를 Docker에 호스팅하고 AWS EC2 인스턴스에 배포하는 RESTful API 생성.

이 튜토리얼은 백엔드 개발의 모든 측면을 다루지는 않지만 이러한 구체적인 구성 요소 내에서 범위를 유지할 것입니다.



# 백엔드

과도하게 단순화해서 말하면, 모든 애플리케이션의 백엔드는 일반적으로 어떤 종류의 데이터 저장 시스템과 상호 작용하는 데이터 처리 작업을 포함합니다.

백엔드는 여러 시스템으로 구성될 수 있습니다. 예를 들어, 마이크로 서비스 아키텍처에서는 수십 개의 API가 있는데, 각각이 특정 프로세스를 처리하여 프론트엔드 애플리케이션에서의 요청을 이행합니다.

# API



API(Application Programming Interface)은 사용자(프로그래머, 소비자 등)와 프로세스, 시스템 또는 도구 사이의 인터페이스를 만들기 위해 설계되었습니다.

예를 들어, 운영 체제(OS, Operating System)의 많은 기능 중 하나는 프로그래머와 하드웨어에서 제공되는 리소스 사이의 인터페이스 역할을 하는 것입니다. OS는 각 CPU에서의 프로세스 실행 할당 작업을 추상화하여 프로그래머가 프로그램을 실행할 때마다 각각 구현할 필요가 없도록 합니다.

따라서, API는 입력 값을 받아 이러한 값들을 처리하고 결과를 반환합니다. 이 결과는 API의 인터페이스에서 지정된 성공적인 실행을 나타내는 확인 메시지 또는 다른 출력일 수 있습니다.



# HTTP/HTTPS

HTTP (Hypertext Transfer Protocol)은 월드 와이드 웹(WWW)에서 클라이언트와 서버 간 메시지 교환을 위한 인터페이스로 작동합니다.

시간이 지나면서 이 프로토콜은 적용 범위를 확대하며 인터넷 상의 클라이언트-서버 응용 프로그램 중 가장 널리 사용되는 프로토콜 중 하나가 되었습니다.

HTTP는 세 가지 주요 구성 요소인 메서드, 헤더 및 상태 코드의 구조를 기반으로 합니다.



메소드는 요청에서 실행할 수 있는 작은 일련의 작업입니다. 주로 사용되는 메소드에는 GET, POST, PUT 및 DELETE가 포함됩니다.

![이미지](/assets/img/2024-05-16-BACK-ENDBASICS_2.png)

이전에 설명한대로 HTTP는 어떤 종류의 애플리케이션에도 적용 가능하다는 특성을 갖고 있어 웹 페이지에 대한 작업이 추상화되고, 앞에서 언급한 메소드는 일반적으로 유사한 작업을 수행하기 위해 사용됩니다. 자세한 정보는 아래 표를 참조해주세요.

헤더는 HTTP 요청에 추가 정보를 제공합니다. 표준 헤더에는 Content-Type: application/json과 같이 요청 본문에 보내는 객체가 JSON임을 지정하는 예와, 일반적으로 애플리케이션 수준에서 인증에 사용되는 Authorization Header와 같은 예가 있습니다.



마침내 HTTP 통신에서 응답을 표준화하는 데 사용되는 상태 코드입니다.

![이미지](/assets/img/2024-05-16-BACK-ENDBASICS_3.png)

이들은 응답의 성격을 나타내는 카테고리로 그룹화됩니다. 예를 들어, 403 상태 코드는 'Forbidden(금지됨)'을 의미하며, 일반적으로 클라이언트가 제공한 권한이 서버에서 유효하지 않다고 판단될 때 사용됩니다. 상태 코드의 각 카테고리는 요청 처리에 대한 통찰력을 제공하며, 일반적으로 서버 측에서 디버깅과 응용프로그램 관리에 도움이 됩니다.

# RESTful



RESTful (Representational State Transfer)은 인터넷을 위한 아키텍처 스타일입니다. 이 스타일은 HTTP 프로토콜을 사용하고, 균일한 인터페이스, 클라이언트-서버, 상태를 저장하지 않음, 캐시 가능, 계층화된 시스템 다섯 가지 원칙을 따릅니다.

- 명확히 정의된 인터페이스가 필수입니다.
- 서버와 클라이언트는 독립적입니다.
- 통신에 필요한 모든 정보는 요청 안에 포함되어 있습니다.
- 캐싱이 필요한 경우 명시적으로 명시되어야 합니다.
- 통신에 관여하는 구성 요소는 전체 시스템을 인식할 필요가 없습니다.

자세한 설명은 제공된 참고 자료와 아래 비디오를 참조하십시오.

# 구현



친절한 톤으로 번역해드리겠습니다.

보다 실용적인 관점을 제공하기 위해 RESTful API를 구현하고 사용 및 배포하는 방법을 보여드리겠습니다.

이 구현에는 PostgreSQL 데이터베이스를 Docker에서 실행하고 Node.js를 사용하여 해당 데이터베이스에서 CRUD(Create, Retrieve, Update, Delete) 작업을 수행하는 것이 포함됩니다.

튜토리얼을 더 잘 따를 수 있도록, 이미 구현된 예제 애플리케이션을 사용할 것이며 해당 예제는 GitHub 리포지토리에서 사용 가능합니다.

먼저, 다음 애플리케이션을 다운로드해야 합니다:



- 서버용으로 Node.js
- HTTP 요청을 만들기 위해 Postman
- PostgreSQL 데이터베이스를 실행하기 위해 Docker
- 데이터베이스에서 SQL 쿼리를 실행하기 위해 DBeaver

# DOCKER

우선, PostgreSQL 데이터베이스를 만들어야 합니다. 이를 위해 아래 명령을 실행하는 Docker를 사용할 것입니다.

```js
sudo docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres
```



이 작업이 어떤 역할을 하는지 더 잘 이해하려면 Docker Hub의 이 문서를 읽어보세요.

# 데이터베이스 테이블

이제 DBeaver를 열고 Docker run 명령어에 사용한 자격 증명을 입력하여 생성한 PostgreSQL 데이터베이스에 액세스하세요.

연결에 필요한 데이터에 주의를 기울이세요. 암호를 포함한 필수 정보는 Docker run 명령어에 명시되어 있습니다.



마지막으로, GitHub 저장소에서 찾을 수 있는 SQL 스크립트를 실행해주세요. 이 스크립트는 애플리케이션에서 사용자를 기본 저장하는 데 사용됩니다.

이제 테이블과 데이터베이스가 설정되었으니, 다음 단계는 데이터베이스를 서버에 연결하고 해당 데이터베이스에 쿼리를 시작하는 것입니다.

# 서버

시작하기 전에 이 API가 무엇을 추상화할지 명확하게 알아봅시다.



데이터베이스 관련 작업에서는 SQL 문을 사용하여 행을 생성, 검색, 업데이트 및 삭제합니다.

이를 기억하면, 이 서버에서 할 일은 이 SQL 명령어의 입력 부분을 채울 값들을 간단히 수락하는 것입니다. 

예를 들어 사용자를 생성할 때, 이름, 이메일 및 비밀번호를 문자열로 삽입 문에 채워야 새로운 행을 만들 수 있습니다. 이제 API를 통해 사용자 입력을 받고 이러한 문자열을 채울 수 있습니다.

우리가 추상화하는 내용을 이해했으니, 계속하기 위해 저장소를 복제해야 합니다.



저장소를 복제한 후, 필요한 Node.js 패키지를 설치하고 다음 명령을 실행하여 서버를 시작하세요.

```js
npm i
npm start
```

이제 서버가 http://localhost:3000/ 에서 실행 중입니다. 그러나 서버를 사용하기 전에 이 문서의 DOCUMENTATION 섹션을 완료하는 것을 제안합니다.

이제 한 걸음 물러나서 RESTful API를 생성하는 데 필요한 것들을 다시 살펴보겠습니다.



인터페이스를 각 메소드마다 정의해야 하며, 사용할 메소드를 지정하고 각 메소드가 무엇을 추상화할지 결정해야 합니다. 이를 위해 이 구조를 반영하도록 설계된 디렉터리 트리를 생성했습니다.

```js
backend-basics/
├── dml.sql
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── src
    ├── controllers
    │   └── users.js
    ├── helpers
    │   └── pg.js
    ├── queries
    │   └── users.js
    └── routes
        └── routes.js
```

src 폴더 아래에는 API를 RESTful하게 만드는 데 필요한 모든 요소가 포함되어 있습니다.

다음 섹션에 나오는 코드는 GitHub 저장소에서 추출된 것으로 모두를 포함하고 있지 않습니다. 설명을 위해 일부 조각으로 제공됩니다.



## 매개변수

RESTful API의 가장 중요한 측면은 사용자가 서버 쪽으로 보내는 정보입니다. 일반적으로 세 가지 유형의 매개변수 전달 방법이 적용됩니다: 경로, 쿼리 및 본문.

- **경로**: 매개변수가 URL에 직접 포함됩니다. 예: http://localhost:3000/api/users/Guilherme Huther.
- **쿼리**: 매개변수는 URL에서 매개변수 이름을 사용하여 지정됩니다. 예: http://localhost:3000/api/users?id_users=d290f1ee-65c54-4b01-90e6-d701748f0851.
- **본문**: 본문은 요청에서 페이로드 부분에 전송됩니다. 이는 JSON부터 HTML까지 다양한 유형의 콘텐츠일 수 있으며, 일반적으로 클라이언트가 보내는 Content-Type 헤더와 관련하여 데이터 유형을 명시합니다.

## 컨트롤러



컨트롤러에는 HTTP 프로토콜의 인터페이스, 상태 코드 및 *헤더가 포함되어 있습니다.

필요한 작업을 효과적으로 실행하기 위해 쿼리 및 도우미가 필요합니다.

```js
// backend-basics/src/controllers/users.js

const pool = require("../helpers/pg");

const {
  sql_get_all_users,
  sql_get_users,
} = require("../queries/users");

const get_users = async (req, res) => {
  const id_users = req.query.id_users;

  if (id_users) {
    pool.query(sql_get_users, [id_users], (err, response) => {
      if (err) {
        res.status(500).send("사용자 가져오는 중 오류 발생: " + err.message);

        return;
      }
      res.status(200).send(response.rows);

      return;
    });

    return;
  } else {
    pool.query(sql_get_all_users, (err, response) => {
      if (err) {
        res.status(500).send("사용자 가져오는 중 오류 발생: " + err.message);

        return;
      }
      res.status(200).send(response.rows);

      return;
    });
    return;
  }
};
```

이 코드에서는 사용자 입력 매개변수를 처리하고 이러한 매개변수를 사용하여 데이터베이스에서 쿼리를 실행한 후 클라이언트에 응답을 제공합니다. 작업이 실패하면 오류가 발생하고 성공하면 쿼리된 데이터가 반환됩니다.



*헤더: 컨트롤러에서 헤더를 관리할 수 있지만, 이 상황에서는 주로 Express Node.js 패키지를 통해 그들의 사용이 용이해집니다.

## 쿼리 및 헬퍼

이 두 구성 요소에는 API를 통해 중재될 프로세스가 포함되어 있습니다. 이 경우에는 PostgreSQL 데이터베이스에서 CRUD 작업이 포함됩니다.

쿼리는 저장 시스템에서 실행될 SQL 문입니다. 마지막으로, 헬퍼는 Node.js에서 PostgreSQL과 함께 SQL을 실행하는 데 필요한 연결을 관리합니다.



```js
// backend-basics/src/helpers/pg.js

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
```

쿼리를 실행하는 데 필요한 PostgreSQL 데이터베이스 연결입니다.

```js
// backend-basics/src/queries/users.js

const sql_get_all_users = `
SELECT 
    * 
FROM 
    users;
`;

const sql_get_users = `
SELECT 
    * 
FROM 
    users 
WHERE
    id_users = $1;
`;
```

컨트롤러에서 사용되는 쿼리는 사용자의 입력에 따라 달라집니다.



## 경로

여기서 각 컨트롤러에 대한 HTTP 메소드가 설정되어 있습니다. GET, POST, PUT, DELETE 메소드는 수행 중인 작업의 유형을 나타냅니다.

예를 들어, 이 API에서 POST 엔드포인트는 CRUD에서 "만들기" 작업에 해당하며, 데이터베이스에서 새 인스턴스를 만듭니다.

```js
// backend-basics/src/routes/routes.js

const express = require("express");
const router = express.Router();

const {
    get_users,
    create_users,
    update_users,
    delete_users,
} = require("../controllers/users.js");

router.get("/users", get_users);
router.post("/users", create_users);
router.put("/users", update_users);
router.delete("/users", delete_users);

module.exports = router;
```



라우트는 컨트롤러 프로세스를 활용하여 각 메소드가 무엇을 수행할지와 사용 가능한 메소드를 지정합니다.

## 서버의 다음 단계

보안, 확장성 및 효율성을 강화하기 위해 미들웨어, 웹 소켓 및 기타 기능을 추가할 수도 있습니다.

# 사용법



이제 API를 테스트하고 상호 작용하기 위해 Postman을 사용할 것입니다.

이 도구를 사용하면 사용자가 HTTP 요청을 만들고 요청의 모든 구성 요소를 사용자 정의할 수 있습니다. 요청에 헤더를 설정하거나 메서드를 변경하거나 요청을위한 URL을 지정하고 본문에 데이터를 보낼 수 있습니다.

기본 사용법을 보여주는 이미지와 API를 테스트하는 방법에 대한 설명서가 여기 있습니다.

# 문서화



문서 작성은 개발의 중요한 부분입니다. 당신이 무엇을 하는지 이해하는 데 도움이 되며, 무엇보다도 프로젝트의 다른 사람들이 당신의 작업을 이해할 수 있게 해줍니다.

이것은 매우 중요한데, 종종 다른 팀원들이 당신의 기여에 대해 명확한 이해를 가지고 있지 않을 수 있기 때문입니다. 그러므로 철저한 문서 작성이 당신이 성취한 것을 설명하는 가장 좋은 방법입니다.

이 API에는 문서가 포함되어 있으며 다음 URL을 통해 액세스할 수 있습니다:

```js
http://localhost:3000/docs
```



# AWS 배포

이 섹션에서는 AWS EC2 인스턴스에 애플리케이션을 배포하는 방법을 안내하겠습니다.

먼저, AWS에서 계정을 생성하고 제공되는 서비스를 사용하기 위해 신용카드 정보를 입력해야 합니다. 비록 무료 티어에 속해있더라도 서비스를 이용하려면 이 작업을 해주셔야 합니다.

다음은 수행해야 할 단계들입니다:



- EC2 인스턴스 생성;
- GitHub 저장소 복제;
- 데이터베이스 설정;
- 서버 설정.

## EC2 인스턴스 생성

![이미지]("/assets/img/2024-05-16-BACK-ENDBASICS_4.png")

![이미지]("/assets/img/2024-05-16-BACK-ENDBASICS_5.png")




![Image 6](/assets/img/2024-05-16-BACK-ENDBASICS_6.png)
![Image 7](/assets/img/2024-05-16-BACK-ENDBASICS_7.png)
![Image 8](/assets/img/2024-05-16-BACK-ENDBASICS_8.png)
![Image 9](/assets/img/2024-05-16-BACK-ENDBASICS_9.png)
  



<img src="/assets/img/2024-05-16-BACK-ENDBASICS_10.png" />

## 깃허브 저장소 복제하기

이제 EC2 인스턴스 내에서 GitHub 계정에 새 SSH 키를 등록하여 머신에 저장소를 복제할 수 있습니다.

Windows - PowerShell(관리자 권한으로 실행해야 함)



```js
ssh-keygen -t ed25519 -C "<YOUR_GITHUB_EMAIL>"

cat <PUBLIC_KEY_PATH>
# 출력을 복사하고 다음 링크에서 새 SSH 키를 만드세요:
# https://github.com/settings/keys

Get-Service -Name ssh-agent | Set-Service -Startup Manual
Start-Service ssh-agent
ssh-add <PRIVATE_KEY_PATH>
git clone <SSH_GITHUB_CLONE_CODE>
```

Linux - Bash

```js
ssh-keygen -t ed25519 -C "<YOUR_GITHUB_EMAIL>"

cat <PUBLIC_KEY_PATH>
# 출력을 복사하고 다음 링크에서 새 SSH 키를 만드세요:
# https://github.com/settings/keys
```

일반적으로 키는 .ssh 디렉토리에 위치합니다. 설정이 완료되면 `git clone REPOSITORY_SSH_URL` 명령어를 사용하여 리포지토리를 복제할 수 있습니다. 




## 데이터베이스 설정

이제 다음 명령을 실행하여 데이터베이스용 Docker를 다운로드해야 합니다.

```js
sudo apt update
sudo apt upgrade

sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

다음으로 다음 Docker 명령을 실행하여 PostgreSQL 데이터베이스를 생성하세요:



```js
sudo docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres
```

마지막으로 데이터베이스 테이블을 만들려면 설정한 도커 컨테이너 안에서 dml.sql 스크립트를 실행하세요:

```js
cat /home/ubuntu/backend-basics/dml.sql | sudo docker exec -i postgresdb psql -U postgres -d postgres
```

이제 새로 만든 테이블이 포함된 데이터베이스가 작동 중입니다.



## 서버 설정

마침내, 서버를 실행할 수 있도록 Node.js와 npm을 다운로드해야 합니다.

```js
sudo apt update

sudo apt install npm
sudo apt-get install nodejs
```

다운로드를 완료한 후, 해당 디렉토리에 액세스하여 서버를 시작하고 필요한 패키지를 다운로드한 다음, 서버를 인스턴스화하는 명령을 실행해야 합니다.



```js
cd /home/ubuntu/backend-basics

npm i

npm i pm2

pm2 start server.js --watch  # 서버를 문제없이 실행하기 위해 시작합니다 
#
# 혹은 npm start
#
# pm2 stop server.js         # 서버를 중지하는 명령어
# pm2 logs                   # 서버 로그를 확인하는 명령어
```

AWS EC2 인스턴스에서 실행 중인 서버에 액세스하려면 인스턴스의 공용 IPv4 주소를 사용하세요. API 요청에서 로컬 주소를 인스턴스의 공용 IPv4로 교체하세요.

사용 방법 섹션에 있는 http://localhost:3000을 http://`EC2_PUBLIC_IPV4`:3000으로 변경하세요.

## AWS 배포의 다음 단계




이제 서버가 배포되었으니, HTTPS 연결 설정, 로드 밸런서 구현, 복제 구성 등 잠재적인 문제에 대해 대응해야 합니다. 이러한 도전에 대해 사전에 대비하고 시스템의 보안 및 성능을 계속 향상시키세요.

링크드인과 깃허브에서 저를 팔로우하세요.

# 참고 자료

- Tanenbaum, A.S. and Wetherall, D.J. (2011) Computer Networks. 5th Edition, Prentice Hall, Inc., 미국.
- Andrew S. Tanenbaum and Herbert Bos. 2014. Modern Operating Systems (4th. ed.). Prentice Hall Press, 미국.
- https://github.com/guilhermehuther/backend-basics
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://www.ibm.com/topics/rest-apis
- https://aws.amazon.com/what-is/restful-api/
- https://restfulapi.net
- https://www.postgresql.org/docs/current/
- https://nodejs.org/docs/latest/api
- https://docs.docker.com