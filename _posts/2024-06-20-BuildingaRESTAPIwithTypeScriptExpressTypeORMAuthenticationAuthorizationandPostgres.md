---
title: "TypeScript, Express, TypeORM, 인증, 권한 부여 및 Postgres를 활용한 REST API 구축하기"
description: ""
coverImage: "/assets/img/2024-06-20-BuildingaRESTAPIwithTypeScriptExpressTypeORMAuthenticationAuthorizationandPostgres_0.png"
date: 2024-06-20 05:21
ogImage:
  url: /assets/img/2024-06-20-BuildingaRESTAPIwithTypeScriptExpressTypeORMAuthenticationAuthorizationandPostgres_0.png
tag: Tech
originalTitle: "Building a REST API with TypeScript, Express, TypeORM, Authentication, Authorization, and Postgres"
link: "https://medium.com/@christianinyekaka/building-a-rest-api-with-typescript-express-typeorm-authentication-authorization-and-postgres-e87d07d1af08"
isUpdated: true
---

<img src="/assets/img/2024-06-20-BuildingaRESTAPIwithTypeScriptExpressTypeORMAuthenticationAuthorizationandPostgres_0.png" />

안녕하세요! TypeScript, Express.js, 그리고 TypeORM을 활용하여 REST API를 만드는 이 튜토리얼에 오신 것을 환영합니다. 이 튜토리얼은 JWT 인증, 데이터 캐싱, 그리고 역할 기반 권한 부여를 포함하고 있습니다. 이 튜토리얼을 완료하면 이러한 핵심 개념과 기술에 대한 튼튼한 이해를 갖게 될 것입니다.

## 사전 준비 사항:

시작하기 전에 다음 도구에 대한 경험이나 이해가 필요합니다:

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

- TypeScript
- TypeORM
- SQL
- Node.js & NPM
- JSON Web Tokens (JWT)
- Caching

## ORM과 TypeORM이 무엇이며 왜 중요한가요?

ORM은 Object-Relational Mapping의 약자로, 객체 지향 패러다임을 사용하여 관계형 데이터베이스와 상호작용을 용이하게 하는 프로그래밍 기술 및 프레임워크입니다. ORM은 관계형 데이터베이스 (예: MySQL, PostgreSQL, SQLite)와 응용 프로그램 코드 사이의 다리 역할을 하며 복잡한 SQL 쿼리와 저수준 데이터베이스 상호작용을 추상화합니다.

TypeORM은 Node.js 및 다양한 플랫폼에서 작동하는 다재다능한 ORM입니다. TypeScript 응용 프로그램에 매우 적합하며, 엔티티 및 열을 정의하기 위해 데코레이터를 사용한다는 점이 특히 잘 어울립니다.

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

## 캐시(캐싱)란 무엇인가요?

캐싱은 컴퓨터 과학과 정보 기술에서 사용되는 기술로, 주로 액세스되거나 계산된 데이터를 "캐시"라고 불리는 임시 저장 영역에 저장하는 것을 말합니다. 캐싱의 주요 목적은 데이터 액세스 및 검색 속도를 향상시키고, 대기 시간을 줄이며, 전반적인 시스템 성능을 향상시키는 것입니다.

이론은 이만하고, 이제 직접 해보자! 😎

# 프로젝트 설정

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

프로젝트를 초기화하려면 TypeORM CLI를 사용해보세요:

```js
npx typeorm init --name restAPi --database postgres
```

이 강좌에서는 Postgres를 데이터베이스로 사용하지만 mysql, mariadb, postgres, cockroachdb, sqlite, mssql, sap, spanner, oracle, mongodb, cordova, react-native, expo, nativescript 같은 다른 데이터베이스도 사용할 수 있어요.

참고: 위 명령을 실행하기 전에 컴퓨터에 TypeORM이 전역으로 설치되어 있는지 확인하세요. 만약 없다면 간단히 아래 명령을 실행해보세요:

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
npm i -g typeorm
```

Typeorm init 명령어를 실행하면 아래 파일들이 생성됩니다:

```js
restApi
├── src                   // TypeScript 코드가 저장되는 위치
│   ├── entity            // 엔티티(데이터베이스 모델)가 저장되는 위치
│   │   └── User.ts       // 샘플 엔티티
│   ├── migration         // 마이그레이션이 저장되는 위치
│   ├── data-source.ts    // 데이터 소스 및 모든 연결 구성
│   └── index.ts          // 어플리케이션의 시작점
├── .gitignore            // 표준 gitignore 파일
├── package.json          // 노드 모듈 의존성
├── README.md             // 간단한 readme 파일
└── tsconfig.json         // TypeScript 컴파일러 옵션
```

이제 추가적인 종속성을 설치해주세요.

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
npm install express dotenv bcrypt jsonwebtoken concurrently memory-cache
```

위에 언급된 각 패키지가 하는 일은 다음과 같습니다:

- Express: Node.js를 위한 웹 프레임워크로, 서버를 생성하는 데 사용됩니다.
- dotenv: 모든 환경 변수를 읽는 데 도움이 됩니다.
- bcrypt: 비밀번호를 암호화하는 데 사용됩니다.
- jsonwebtoken: 사용자를 식별하거나 사용자에 대한 정보를 전달하는 데 자주 사용되며, 웹 애플리케이션에서 인증 및 권한 부여에 토큰이 자주 사용됩니다.
- concurrently: 단일 터미널에서 여러 npm 스크립트를 동시에 실행할 수 있게 하는 Node.js 유틸리티입니다.
- memory-cache: Node.js를 위한 간단한 메모리 캐싱 라이브러리로, 데이터를 메모리에 저장하여 빠르게 액세스하고 검색할 수 있는 방법을 제공합니다.

## 이러한 종속성들에 대한 TypeScript 타입 정의 설치:

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

TypeScript로 작업하고 있으니 의존성에 대한 @types를 설치하는 것이 좋습니다.

```js
npm i @types/express @types/bcrypt @types/jsonwebtoken @types/memory-cache
```

이제 생성된 파일을 수정해야 합니다.

# 프로젝트 파일 수정하기

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

새 폴더 구조:

```js
step-by-step
 ┣ src
 ┃ ┣ controllers
 ┃ ┃ ┣ auth.controller.ts
 ┃ ┃ ┣ movie.controllers.ts
 ┃ ┃ ┗ user.controllers.ts
 ┃ ┣ dto
 ┃ ┃ ┗ user.dto.ts
 ┃ ┣ entity
 ┃ ┃ ┣ Movies.entity.ts
 ┃ ┃ ┗ User.entity.ts
 ┃ ┣ helpers
 ┃ ┃ ┗ encrypt.ts
 ┃ ┣ middleware
 ┃ ┃ ┣ errorHandler.ts
 ┃ ┃ ┣ authentification.ts
 ┃ ┃ ┗ authorization.ts
 ┃ ┣ migration
 ┃ ┃ ┣ 1698321500514-user.ts
 ┃ ┃ ┗ 1698321512351-movie.ts
 ┃ ┣ routes
 ┃ ┃ ┣ movie.routes.ts
 ┃ ┃ ┗ user.routes.ts
 ┃ ┣ data-source.ts
 ┃ ┗ index.ts
 ┣ .env
 ┣ .gitignore
 ┣ package-lock.json
 ┣ package.json
 ┣ README.md
 ┗ tsconfig.json
```

# package.json

다음 종속성을 포함하여 package.json 파일을 업데이트하세요.

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

```json
{
  "name": "restTye",
  "version": "0.0.1",
  "description": "TypeORM으로 개발된 멋진 프로젝트입니다.",
  "type": "commonjs",
  "devDependencies": {
    "@types/bcrypt": "^5.0.1",
    "@types/express": "^4.17.20",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/memory-cache": "^0.2.4",
    "@types/node": "^16.11.10",
    "concurrently": "^8.2.2",
    "ts-node": "10.7.0",
    "typescript": "4.5.2"
  },
  "dependencies": {
    "@types/cors": "^2.8.15",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "memory-cache": "^0.2.0",
    "pg": "^8.4.0",
    "reflect-metadata": "^0.1.13",
    "typeorm": "0.3.17"
  },
  "scripts": {
    "watch": "tsc -w",
    "dev": "nodemon build/index.js",
    "start:dev": "concurrently \"tsc -w\" \"nodemon build/index.js\"",
    "build": "tsc",
    "start": "ts-node src/index.ts",
    "typeorm": "typeorm-ts-node-commonjs",
    "migration": " npm run typeorm migration:run -- -d ./src/data-source.ts"
  }
}
```

필요한 종속성과 개발에 필요한 스크립트 및 마이그레이션 실행이 포함되어 있습니다.

concurrently를 사용하여 "tsc -w" 및 "nodemon build/index.js"를 동시에 실행하므로 앱을 실행하려면 npm run start:dev를 실행하면 ts 파일을 js로 컴파일한 다음 nodemon을 실행할 것입니다.

# src/index.ts

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

여기에 향상된 src/index.ts 파일이 있습니다:

```js
import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import "reflect-metadata";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;
app.use("/auth", userRouter);
app.use("/api", movieRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
```

이 index.ts 파일은 Express.js 서버를 설정하고 경로를 적용하며 서버를 시작합니다. 사용자 관련 및 영화 관련 엔드포인트를 위한 라우트도 포함되어 있습니다.

# src/data-source.ts

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

아래는 업데이트된 src/data-source.ts 파일입니다:

이 파일은 환경 변수를 읽는 등 데이터베이스 구성을 처리합니다. .env 파일에 필요한 데이터베이스 연결 세부 정보가 포함되어 있는지 확인해주세요.

```js
import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Movie } from "./entity/Movies.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: NODE_ENV === "dev" ? false : false,
  //logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Movie],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
```

# Entities

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

이것들은 데이터베이스 테이블의 구조를 정의합니다:

# 사용자 엔터티

```js
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "user" })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

# 영화 엔터티

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
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "movies" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  director: string;

  @Column({ nullable: false })
  year: number;

  @Column({ nullable: false })
  rating: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  cast: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

나는 uuid를 사용하고 있지만 rowid나 incremental 등 다른 것을 사용할 수도 있고, 필드가 비어있지 않도록 하기 위해 nullable 옵션을 false로 전달하고 있습니다.

src/helpers/helpers.ts

Encrypt 클래스는 비밀번호를 암호화하고, 로그인 프로세스를 위해 비교하며 토큰을 생성하는 데 도움이 됩니다.

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
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
```

# Middleware

# Error Handling

src/middlewares/error.middleware.ts에서 전역 오류 처리 미들웨어를 설정해보세요.

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
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  return res.status(500).json({ message: "내부 서버 오류" });
};
```

# 인증 및 권한 부여 미들웨어

src/middlewares/auth.middleware.ts에서 인증 및 권한 부여 미들웨어를 구현하십시오:

```js
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authentification = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "인가되지 않음" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "인가되지 않음" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return res.status(401).json({ message: "인가되지 않음" });
  }
  req["currentUser"] = decode;
  next();
};
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

요청에 인증 속성을 포함하는 헤더가 있는지 확인합니다. 그런 속성이 없는 경우에는 권한이 없음을 반환합니다. 사용자는 특정 경로에 액세스할 수 없습니다. 속성이 있는 경우에는 해당 토큰을 추출한 다음 그 토큰을 생성할 때 사용한 비밀 키로 복호화합니다. 그 토큰의 데이터가 올바른 경우 토큰에 있는 데이터를 요청에 전달하여 애플리케이션의 나머지 부분에서 사용할 수 있습니다. 토큰이 복호화되지 않으면 다음 함수가 호출되지 않습니다.

```js
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req[" currentUser"].id },
    });
    console.log(user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
```

# 사용자 데이터를 user.dto.ts로 사용자 정의하기

API 응답에 전송된 사용자 데이터를 맞춤 설정하는 데 user.dto.ts 파일을 활용하고자 하는 관심이 표현되었습니다. 이 특정 파일은 제공된 코드 샘플에 명시적으로 포함되지는 않았지만, API 응답을 위해 구조화하고 수정할 데이터를 형성하는 강력한 도구로 작용합니다.

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

## user.dto.ts이 무엇인가요?

user.dto.ts 파일은 Data Transfer Object의 약자로, API로부터 응답으로 전송되기 전 사용자 데이터의 형식과 내용을 정밀하게 사용자 정의할 수 있게 합니다. 이 파일 안에 특정 인터페이스, 구조 또는 변환 로직을 정의함으로써, 개발자는 응용 프로그램 또는 API를 사용하는 클라이언트의 요구 사항과 사용자 데이터를 정확하게 맞출 수 있습니다. 그리고 일부 사용자 데이터를 보안할 수 있습니다.

## user.dto.ts 활용하기

다음은 user.dto.ts 파일을 구조화하는 예시입니다:

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
export class UserResponce {
  name: string;
  email: string;
  role: string;
}
```

## 사용 방법

API 응답에서 사용자 데이터의 사용자 정의가 필요한 시나리오에서는 user.dto.ts 파일을 활용할 수 있습니다. 응답으로 보낼 원하는 형식에 맞는 UserDTO 인터페이스의 구조를 정의한 후 응답으로 보내세요.

이 접근 방식은 API 응답을 특정 요구 사항에 맞게 유연하게 조정하여 응용 프로그램의 상호 운용성과 효율성을 향상시킵니다.

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

프로젝트에 맞게 user.dto.ts 파일을 통합 및 조정하고, API 엔드포인트를 통해 전송되는 데이터를 정확하게 제어할 수 있습니다.

이 프로젝트의 경우, 저는 다음과 같이 사용했을 것입니다:

```js
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { UserResponce } from "../dto/user.dto"; // 올바른 경로에서 UserDto를 가져옵니다
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    // 응답으로 보내는 데이터 구조화를 위해 UserResponse DTO 사용
    const userDataSent = new UserResponce();
    userDataSent.name = user.name;
    userDataSent.email = user.email;
    userDataSent.role = user.role;

    const token = encrypt.generateToken({ id: user.id });

    return res.status(200).json({ message: "사용자가 성공적으로 생성되었습니다", token, userDataSent });
  }
}
```

UserResponse 클래스가 UserController 파일로 올바르게 가져와지고 속성들이 API 응답에 전송할 데이터와 일치하는지 확인하세요. 이 접근 방식을 사용하면 API 엔드포인트를 통해 전송되는 사용자 데이터를 정확하게 사용자 정의할 수 있습니다.

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

# 컨트롤러

사용자 및 영화 엔티티에 대한 컨트롤러 메소드를 정의하세요:

컨트롤러는 클라이언트(일반적으로 웹 브라우저)로부터 수신한 요청을 처리하고 응용 프로그램의 로직을 조정하는 구성 요소입니다. 컨트롤러는 응용 프로그램의 관심사를 분리하는 데 중요한 역할을 하며, 코드를 구성하고 유지보수할 수 있도록 도와줍니다. 우리의 getalluser 및 getmovies에서 캐시 메모리에서 데이터를 가져오려고 하는 데, 존재한다면 캐시에서 가져오고, 그렇지 않은 경우 데이터베이스에서 가져온 후 캐시에 일정 시간 동안 넣습니다.

# Auth Controller (src/controllers/Auth.controller.ts)

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

## 사용자 컨트롤러 (src/controllers/user.controller.ts)

```js
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    // userRepository.create({ Name, email, password });
    const token = encrypt.generateToken({ id: user.id });

    return res.status(200).json({ message: "User created successfully", token, user });
  }
  static async getUsers(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
  }
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json({ message: "udpdate", user });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
```

# 영화 컨트롤러 (src/controllers/movie.controller.ts)

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
import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movies.entity";

export class MovieController {
  static async getAllMovies(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("캐시에서 제공 중");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("데이터베이스에서 제공 중");
      const movieRepository = AppDataSource.getRepository(Movie);
      const movies = await movieRepository.find();
      cache.put("data", movies, 10000);
      return res.status(200).json({
        data: movies,
      });
    }
  }
  static async createMovie(req: Request, res: Response) {
    const { title, description, director, year, rating, image, cast } = req.body;
    const movie = new Movie();
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.save(movie);
    return res.status(200).json({ message: "영화가 성공적으로 생성되었습니다", movie });
  }

  static async updateMovie(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, director, year, rating, image, cast } = req.body;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    await movieRepository.save(movie);
    return res.status(200).json({ message: "영화가 성공적으로 업데이트되었습니다", movie });
  }

  static async deleteMovie(req: Request, res: Response) {
    const { id } = req.params;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });
    await movieRepository.remove(movie);
    return res.status(200).json({ message: "영화가 성공적으로 삭제되었습니다", movie });
  }
}
```

# 사용자 라우팅

src/routes/user.routes.ts 파일에 사용자 관리와 관련된 라우트를 정의하십시오:

라우트는 웹 애플리케이션 내에서 클라이언트가 다양한 작업을 수행하거나 특정 리소스를 요청할 수 있는 특정 URL 또는 엔드포인트를 가리킵니다. 라우트는 수신된 HTTP 요청에 대한 웹 애플리케이션이 응답하는 방식을 정의하는 데 중요한 요소입니다.

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

```javascript
import * as express from "express";
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controllers";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
const Router = express.Router();

Router.get("/users", authentification, authorization(["admin"]), UserController.getUsers);
Router.get("/profile", authentification, authorization(["user", "admin"]), AuthController.getProfile);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.put("/update/:id", authentification, authorization(["user", "admin"]), UserController.updateUser);
Router.delete("/delete/:id", authentification, authorization(["admin"]), UserController.deleteUser);
export { Router as userRouter };
```

# 영화 라우트

```javascript
import * as express from "express";
import { authentification } from "../middleware/authentification";
import { MovieController } from "../controllers/movie.controllers";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/movies", authentification, MovieController.getAllMovies);
Router.post("/movies", authentification, MovieController.createMovie);

Router.put("/movies/:id", authentification, authorization(["admin"]), MovieController.updateMovie);
Router.delete("/movies/:id", authentification, authorization(["admin"]), MovieController.deleteMovie);
export { Router as movieRouter };
```

# 미들웨어 순서 설정

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

Express.js는 미들웨어를 정의된 순서대로 실행합니다. 라우트 정의 시에 올바른 순서로 미들웨어를 배치하는 것이 중요합니다.

예를 들어 사용자 라우트의 경우, 우리는 두 개의 미들웨어 함수인 authenticate와 authorize가 있습니다. authenticate는 사용자의 신원을 확인하기 때문에 먼저 와야 합니다. authorize는 그 다음에 위치하여 사용자가 적절한 역할을 가지고 있는지 확인합니다.

# 이주

우리는 엔티티에 대한 마이그레이션을 생성하고 실행해야 합니다. 이로써 해당 데이터베이스 테이블이 생성됩니다. 문서에 나와 있는 대로 수행해야 합니다.

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

이 명령어는 src/migration 디렉토리에 마이그레이션 파일을 생성합니다. 생성된 마이그레이션 파일을 편집하여 테이블 구조를 정의하고 아래 코드에 나와 있는 대로 마이그레이션을 실행하세요.

```js
typeorm migration:create ./migrations/users
```

```js
import { MigrationInterface, QueryRunner } from "typeorm";

export class User1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
// 여기에 직접 추가할 부분
    await queryRunner.query(
      `
          --테이블 정의
          CREATE TABLE "users"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "role"  character varying NOT NULL DEFAULT 'user',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
          )





          `
    ),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
// 그리고 이 부분
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
```

```js
import { MigrationInterface, QueryRunner } from "typeorm";

export class Movie1698321512351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        --테이블 정의
        CREATE TABLE "movies"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "director" character varying NOT NULL,
            "year" integer NOT NULL,
            "rating" character varying NOT NULL,
            "image" character varying NOT NULL,
            "cast" character varying NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
          )





          `),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movies"`, undefined);
  }
}
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

패키지 JSON 파일에 데이터베이스 마이그레이션을 실행하기 위한 스크립트를 추가해야 합니다:

```js
   "migration": " npm run typeorm migration:run -- -d ./src/data-source.ts"
```

data-source.ts 파일은 데이터베이스 구성이 저장된 위치입니다.

# 테스트

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

API를 테스트하려면 Postman, cURL 또는 다른 HTTP 클라이언트와 같은 도구를 사용할 수 있습니다. API 엔드포인트에 요청을 보내어 제대로 작동하는지 확인할 수 있습니다.

# 오류 처리

제공된 errorHandler 미들웨어에서 처리되지 않은 오류가 발생하면 해당 오류가 기록되고 일반적인 오류 응답이 클라이언트에게 전송됩니다. 이 미들웨어를 사용자 정의하여 오류 처리 요구 사항에 맞게 조정할 수 있습니다.

맺음말

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

이번 튜토리얼에서는 TypeScript, Express.js 및 TypeORM을 사용하여 강력한 REST API를 만드는 여정에 출발했습니다. 이 과정에서 인증, 권한 부여 및 데이터베이스 상호 작용과 같은 기본 개념을 탐험했습니다. 우리가 배운 내용을 되짚어봅시다:

- Object-Relational Mapping (ORM)의 중요성과 특히 TypeScript 애플리케이션에서 데이터베이스 상호 작용을 간소화하는 TypeORM에 대해 이해했습니다.
- 캐싱은 데이터 액세스 및 검색 속도를 향상시키는 기술로 명료하게 설명되었으며 시스템 성능을 향상했습니다.
- 프로젝트를 설정하고 종속성을 설치하고 중요한 구성 파일을 설정했습니다.

이제 이 지식을 바탕으로 견고한 웹 애플리케이션을 만들 준비가 되었습니다. 하지만 기억하세요, 이것은 시작에 불과합니다. 탐험할 거대한 웹 개발 세계가 기다리고 있으며 더 깊이 파고들고 고급 주제를 더 탐구하고 API 기능을 확장하는 것을 장려합니다.

이 학습 여정에 함께해 주셔서 기쁩니다. 궁금한 점이 있거나 피드백이나 경험을 공유하고 싶다면 망설이지 말고 연락해주세요.

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

웹 개발의 끊임없이 발전하는 세계에서는 항상 배울 것이 더 많고 만들 것이 더 많습니다. 계속 코딩하고, 계속 탐험하고, 놀라운 것을 계속 만들어 보세요. 웹은 당신의 캔버스이며, 당신이 아티스트입니다.

이 튜토리얼의 일부가 되어 주셔서 감사합니다. 앞으로의 프로젝트에서 행운을 빕니다!

제 GitHub에서 전체 프로젝트를 확인할 수 있습니다.

이것으로 우리의 튜토리얼을 마칩니다. 유용하게 활용하셨다면 박수를 치거나 댓글을 남겨주세요. 제안이나 피드백은 언제나 환영합니다. 또한 Twitter, LinkedIn, GitHub에서 저와 소통하실 수 있습니다.
