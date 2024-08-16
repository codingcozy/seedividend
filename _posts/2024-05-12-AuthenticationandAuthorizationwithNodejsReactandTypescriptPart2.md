---
title: "Nodejs, React 및 TypeScript에서 인증 및 권한 부여 방법 "
description: ""
coverImage: "/assets/img/2024-05-12-AuthenticationandAuthorizationwithNodejsReactandTypescriptPart2_0.png"
date: 2024-05-12 19:37
ogImage: 
  url: /assets/img/2024-05-12-AuthenticationandAuthorizationwithNodejsReactandTypescriptPart2_0.png
tag: Tech
originalTitle: "Authentication and Authorization with Nodejs, React and Typescript — Part 2"
link: "https://medium.com/@xiaominghu19922/authentication-and-authorization-with-nodejs-react-and-typescript-part-2-ae9d320e4f74"
isUpdated: true
---



<img src="/assets/img/2024-05-12-AuthenticationandAuthorizationwithNodejsReactandTypescriptPart2_0.png" />

# 소개

이것은 웹 애플리케이션에서 사용자 인증 및 권한을 구현하는 두 부분 튜토리얼의 두 번째 기사입니다.

튜토리얼의 첫 번째 부분은 현대 웹 애플리케이션 내에서 인증 및 권한의 개념을 설명하는 데 전념되었습니다. 아직 보지 않았다면, 진행하기 전에 첫 번째 부분을 확인하는 것을 추천합니다.

기초를 다룬 기초를 바탕으로, React, Node.js 및 TypeScript를 사용하여 토큰 기반 사용자 인증 및 권한 부여를 하는 풀 스택 시스템을 단계별로 구현할 것입니다. 이 튜토리얼의 완전한 코드베이스를 이 GitHub 저장소에서 찾을 수도 있습니다. 먼저 다음 섹션에서 프로젝트 구조에 익숙해져 봅시다.

# 프로젝트 구조

![프로젝트 구조](/assets/img/2024-05-12-AuthenticationandAuthorizationwithNodejsReactandTypescriptPart2_1.png)

위의 그림 1에서 전체 풀 스택 프로젝트 구조가 나와 있습니다. 서버 및 사용자 인터페이스(UI) 내 각 구성 요소의 목적에 대해 논의해 봅시다.

## 사용자 인터페이스

사용자 인터페이스는 매우 기본적이며, 프레젠테이션 레이어의 Auth 컴포넌트로 구성됩니다. 사용자는 이러한 컴포넌트와 상호작용하여 사용자 지정 후크 useApi 및 ApiProvider 클래스를 통해 서버에 인증을 요청합니다. 서버가 사용자가 제출한 자격 증명을 유효성 검사하면 응답 내에서 JWT 토큰을 반환합니다. 유효한 서버 응답시, 컴포넌트로부터 AuthReducer로 작업이 디스패치됩니다. 디스패치된 작업은 관련 AuthState로 줄어들고, AuthContext를 통해 전체 어플리케이션 인터페이스에 제공됩니다. 사용자 인터페이스는 React 및 TypeScript를 사용하여 구현될 것입니다.

## 서버

서버는 인터페이스에서 사용자 자격 증명 데이터와 함께 요청을 받게 될 것입니다. 먼저 Cors(Cross-Origin-Resource-Sharing) 규칙을 위반하지 않는지 확인하고 제출된 입력 데이터가 유효한지를 검증할 것입니다. 이러한 단계 중 하나라도 통과하지 못하면 오류 응답이 반환됩니다. 사용자 인증은 사용자/가입 route에서 새로운 사용자가 생성되거나 사용자/로그인 route에서 기존 사용자가 인증됩니다. 이 프로젝트에서는 InMemoryDataProvider가 구현되며 사용자 데이터는 간단한 객체에 저장됩니다. 이는 튜토리얼이 복잡해지지 않도록 의도된 것이며 사용자 인증 및 권한 부여에 중점을 두었습니다. DataProviderInterface는 데이터 검색 기능을 추상화하기 위해 사용되며, 나중에 이를 구현하는 다른 제공자로 쉽게 전환할 수 있도록 설계되었습니다. 사용자가 가입 또는 로그인을 성공적으로 완료하면 서명된 서버와 함께 만료 가능한 JWT(JSON Web Token)가 생성되어 사용자 인터페이스로 반환됩니다. 이 토큰, 일반적으로 인증 토큰으로 알려져 있으며, 사용자 인터페이스에서 /resource 엔드포인트를 통해 보호된 서버 측 리소스에 액세스하기 위해 요청에 포함됩니다.

# 사전 준비 사항

이 튜토리얼을 성공적으로 완료하기 위한 전제 조건 목록은 다음과 같습니다:

- 해당 튜토리얼을 완료하려면 컴퓨터에 Node.js가 설치되어 있어야 합니다.
- Node Package Manager (NPM)은 Node.js가 설치되어 있으면서 Yarn을 선호하며 프로젝트 종속성 관리에는 Yarn이 사용될 것입니다.
- 웹이 작동하는 방식에 대한 알맞은 지식이 있어야 하며 인증 및 권한 부여 시스템을 구현한 시스템을 사용하거나 본적이 있어야 합니다.
- 본 문서 이전에 Node.js, React 및 Typescript와 함께 작업한 경험이 있어야 하지만, 코드 안내를 받을 예정이므로 심층적인 지식은 선택 사항입니다.

자, 소개는 이제 끝내고 실제 프로젝트 구현으로 넘어가 봅시다. 멋지네요! 😁

# 1. 서버 설정

## 1.1 의존성 설치

먼저 다음 명령어를 사용하여 프로젝트 디렉토리를 만들고 서버 코드 기반을 설정해보겠습니다:

```js
mkdir authentication-and-authorization &&\
cd authentication-and-authorization &&\
mkdir server &&\
cd server && mkdir src
```

시작 서버 폴더 구조는 아래와 같이 표시됩니다:

```bash
/authentication-and-authorization
  |__ /server
      |__ /src
```

/server 폴더 안에 있는 터미널에서 다음 명령어를 실행하여 노드 프로젝트를 초기화하세요:

```bash
npm init -y
```

이제 서버 프로젝트의 시작점이 있으니 다음 명령어를 사용하여 Typescript 프로젝트로 설정하겠습니다:

```js
yarn add typescript @types/node --dev && npx tsc --init
```

위 명령은 /server 폴더 안에 tsconfig.json 파일을 생성했을 겁니다. 해당 파일의 내용을 아래 코드와 같이 변경해주세요:

```js
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

가장 중요한 설정은 rootDir입니다. 이 설정은 TypeScript 컴파일러에게 .ts 파일을 어디에서 찾아 .js 파일로 변환하고 outDir로 지정된 디렉토리에 배치해야 하는지 알려줍니다.

이제 서버에 필요한 초기 패키지 종속성을 설치하겠습니다:

```js
yarn add express dotenv cors &&\
yarn add @types/express @types/dotenv @types/cors --dev
```

3rd party 패키지에 대한 타입 정의 파일도 개발 종속성으로 설치했다는 것에 유의하세요.

## 1.2 Express 서버 만들기

먼저 Express 서버의 기본 구조를 생성하고 본 강좌를 통해 이를 확장해 나갈 것입니다. /server/src 디렉토리 안에서 다음 명령을 실행하여 app.ts와 index.ts를 생성하세요:

```js
touch app.ts && touch index.ts
```

app.ts 안에는 서버 환경 변수를 초기화하고 관련 미들웨어를 사용하여 Express 앱 객체를 생성할 것입니다. app.ts의 내용은 아래와 같습니다 (이것은 해당 파일의 최종 코드가 아닙니다):

```js
/* app.ts */

// 전역 종속성
import * as dotenv from "dotenv";
dotenv.config(); // 로컬 .env 파일을 사용하여 환경 변수를 초기화합니다

// 프로젝트 종속성
import routes from "./routes";

// express 앱 설정
import express from "express";
const app = express();

// 미들웨어
app.use(express.json());

// 라우트
app.use(routes);

export default app;
```

index.ts에서는 아래와 같이 SERVER_PORT 환경 변수로 지정된 포트에서 express 서버를 실행할 것입니다:

```js
/* index.ts */

// 프로젝트 종속성
import app from "./app";
const { SERVER_PORT } = process.env;

// 앱이 listening중
app.listen(SERVER_PORT, () => {
  console.info(`앱이 포트 ${SERVER_PORT}에서 실행 중입니다`);
});
```

Git에서 무시될 수 있는 .env 파일에 프로젝트 환경 변수를 지정하는 것은 좋은 관행입니다. 이 파일은 /server폴더에 생성할 것입니다:

```js
# .env

SERVER_PORT=8000
```

익스프레스 서버를 실행하려면 /server 폴더 내에서 다음 명령을 실행할 수 있습니다:

```js
rm -rf ./dist && npx tsc && cp .env ./dist/.env && cd ./dist && node index.js
```

위 명령은 먼저 ./dist 디렉토리를 제거하고, ./src 디렉토리에 있는 모든 코드를 타입 확인하고 ./dist 디렉토리 내의 JavaScript로 변환합니다. 컴파일 단계가 완료되면 .env 파일이 ./dist 디렉토리로 복사되어 서버를 node index.js로 실행할 때 환경 변수가 올바르게 초기화됩니다. 매번 이 명령을 실행하는 것은 지루할 수 있으므로 server/package.json 내에 몇 가지 스크립트를 만들어 프로세스를 단순화하겠습니다:





```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "npx tsc && cp .env ./dist/.env",
    "start": "rm -rf ./dist && yarn build && cd ./dist && node index.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/dotenv": "^8.2.0",
    "@types/express": "^4.17.15",
    "@types/node": "^18.11.18",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  }
}
```

이제 start 스크립트를 사용하여 아래와 같이 서버를 실행할 수 있습니다:

```bash
yarn start
```

![이미지](/assets/img/2024-05-12-AuthenticationandAuthorizationwithNodejsReactandTypescriptPart2_2.png)





서버 프로젝트가 이제 설정되었습니다. 다음 섹션에서는 백엔드 인증 및 권한 시스템 설정 과정을 보여드릴 것입니다.

## 1.3 사용자 데이터 제공자

데이터 저장 레이어는 인증 시스템에 필수적입니다. 새 사용자가 생성될 때, 그들의 데이터는 유지되어야 합니다. 나중에 로그인할 때 사용자가 제출한 자격 증명을 확인할 수 있도록 합니다. 간단히 말해서, 사용자 데이터 저장을 위해 인메모리 저장을 구현할 것이지만, 나중에 실제 데이터베이스로 구현을 교체하는 것이 쉽도록 인터페이스를 사용하여 구현할 것입니다.

/server/src/data_providers 폴더를 생성하고 아래와 같이 인터페이스 IDataProvider를 정의할 것입니다.



```js
// server/src/data_providers/IDataProvider.ts

export default interface IDataProvider<Resource> {
  createData: (resource: Resource) => Promise<void>;
  readData: (args: {id: string, matchField: string}) => Promise<Resource>;
  updateData: (args: {id: string, resource: Resource}) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}
```

이 인터페이스는 일반적인 CRUD 작업을 나타내는 네 가지 메서드로 구성되어 있습니다. 이 메서드들은 Resource 타입의 일반적인 값을 소비하거나 반환합니다. IDataProvider의 InMemoryDataProvider 구현은 아래와 같이 보여집니다.

```js
// server/src/data_providers/InMemoryDataProvider.ts

import IDataProvider from "./IDataProvider";

export default class InMemoryDataProvider<Resource extends {id: string, data: any}> implements IDataProvider<Resource> {
  private _data: Resource[];

  constructor() {
    this._data = [];
  };

  public async createData(resource: Resource) {
    this._data.push(resource);
    return;
  }

  public async readData(args: {id: string, matchField: string}) {
    return this._data.filter(x => x.data[args.matchField] === args.id)[0];
  };

  public async updateData(props: { id: string; resource: Resource; }) {
    const {id, resource} = props;
    for(const datum of this._data) {
      if(datum.id === id) {
        datum.data = resource.data;
      }
    }

    return;
  };

  public async deleteData(id: string) {
    this._data = this._data.filter(datum => datum.id !== id);
    return;
  };
}
```

InMemoryDataProvider는 IDataProvider에서 정의된 공개 메서드를 엄격하게 구현합니다. 실제 데이터 저장소는 InMemoryDataProvider 클래스 인스턴스에 특정한 private \_data 배열 속성입니다. InMemoryDataProvider의 generic 타입은 Resource이며 'id: string, data: any'를 확장하였기 때문에 입력 자원은 id 및 데이터를 포함하고 기타 속성을 추가로 가져야합니다. TypeScript의 이 인터페이스 중심적 접근의 장점은 IDataProvider 인터페이스를 준수한다면 데이터 저장소를 다른 구현체로 쉽게 교체할 수 있다는 점입니다(예: SQL 데이터베이스 사용).

사용자 관련 데이터에서 CRUD 작업을 실행하기 위해 비즈니스 로직을 데이터 액세스 계층에서 분리하는 사용자 저장소를 추가로 생성할 것입니다. 먼저, 다음과 같이 정의된 추상화 Repository를 작성할 것입니다. 이 Repository는 다양한 데이터 소스 유형에서 확장될 수 있는 인터페이스를 정의합니다.

```js
// server/src/repositories/Repository.ts

import IDataProvider from "../data_providers/IDataProvider";

export default class Repository<Resource> {
  protected _provider: IDataProvider<Resource>;

  constructor(args: {provider: IDataProvider<Resource>}) {
    this._provider = args.provider;
  };

  public get provider(): IDataProvider<Resource> {
    return this._provider;
  }
}
```

Repository에서 파생된 클래스는 데이터 액세스 계층을 형성하는 IDataProvider를 구현하는 제공자(provider)를 가져야 합니다. 그리고 UserRepository 클래스는 Repository를 확장하고 사용자 데이터와 상호작용하는 자체 public 메서드를 갖습니다. 아래에서 자세히 살펴봅시다.

```js
// server/src/repositories/UserRepository.ts

import IDataProvider from "../data_providers/IDataProvider";
import Repository from "./Repository";
import { randomUUID } from "crypto";
import InMemoryDataProvider from "../data_providers/InMemoryDataProvider";

type UserData = {
  email: string,
  name: string,
  password: string,
  createdAt: string,
  updatedAt: string
};

export class UserResource {
  private _id: string;

  constructor(private _data: UserData) {
    this._id = randomUUID();
  };

  public get id(): string {
    return this._id;
  }

  public get data(): UserData {
    return this._data;
  }
}

export class UserRepository extends Repository<UserResource> {
  constructor(args: {provider: IDataProvider<UserResource>}) {
    super({provider: args.provider});
  }

  public async createUser(user: UserResource) {
    await this.provider.createData(user);
    return;
  }

  public async getUserBy(args: {id: string, matchField: string}) {
    return this.provider.readData({id: args.id, matchField: args.matchField});
  }
}

const dataProvider = new InMemoryDataProvider<UserResource>();
const userRepository = new UserRepository({provider: dataProvider});

export default userRepository;
```

사용자 데이터의 구조는 UserData 유형에 의해 정의되며, 리소스 구조는 UserResource 클래스에 의해 정의됩니다. 이 클래스는 id 및 data 공개 속성으로 구성되어 있습니다. 또한, creatUser 및 getUserBy 메서드는 데이터 액세스 레이어와 상호 작용하여 데이터를 검색하고 쓰기 위해 IDataProvider의 구현을 통해 사용됩니다.

참고: 우리는 InMemoryDataProvider의 인스턴스를 사용하여 UserRepository의 인스턴스를 생성합니다. 나중에 데이터를 데이터베이스에 저장하려면, InMemoryDataProvider 대신 IDataProvider 인터페이스를 구현하는 다른 클래스를 사용할 수 있습니다. 우리는 이제 UserRepository를 사용하여 사용자 등록 및 로그인 API 엔드포인트의 비즈니스 논리에서 사용할 수 있습니다. 이는 다음 섹션에서 설명될 것입니다.

## 1.3 사용자 등록 및 로그인을 위한 라우트

다음으로, express 라우트를 모두 보관할 폴더를 생성할 것입니다. 터미널에서 아래 명령어를 입력하세요:

```js
yarn add bcrypt jwt &&\
yarn add @types/bcrypt @types/jwt --dev &&\
cd server/src &&\
mkdir routes &&\
cd ./routes &&\
touch index.ts user.ts
```

알림: 추가적으로 npm 패키지 bcrypt 및 jwt를 서버 프로젝트 내에 설치했습니다. 사용자 비밀번호를 암호화하는 데 bcrypt를 사용하고, 성공적인 사용자 등록 및 로그인 요청에 대한 응답에 반환될 인증 토큰을 생성하기 위해 jwt를 사용할 것입니다. /server 내부의 폴더 구조는 아래와 같이 표시됩니다:

```js
/server
  |__ /src
      |__ ...
      |__ /routes
        |__ index.ts
        |__ user.ts
```

index.ts 내에서는 응용 프로그램의 모든 가능한 경로를 포함하는 중앙 라우터를 만들 것입니다. 현재는 등록 및 로그인을 위한 특정 /user 경로만 가질 것입니다.

```js
// server/src/routes/index.ts

// 전역 종속성
import { Router } from "express";
const router = Router();
import userRoute from "./user";

// API에 대한 모든 라우트
router.use("/user", userRoute);

export default router;
```

userRoute는 다음과 같이 user.ts에 구현되어 있습니다.

```js
// server/src/routes/user.ts

// 전역 종속성
const { ENCRYPTION_KEY, AUTH_TOKEN_KEY } = process.env;
import {Router} from 'express';
const userRoute = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 프로젝트 종속성
import {UserResource} from '../repositories/UserRepository';
import { validateHasParameters, validateEmailFormat, validatePasswordLength } from "../middleware/validation";
import userRepository from '../repositories/UserRepository';

/**
 * 이메일, 비밀번호 및 이름을 입력하여 사용자 등록
 */
userRoute.post(
  "/register",
  validateHasParameters("email", "password", "name"),
  validateEmailFormat,
  validatePasswordLength,
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExist = await userRepository.getUserBy({id: email, matchField: 'email'});
      if (userExist) {
        return res.status(409).json({ error: "User already exist" });
      }

      const date = new Date().toISOString();

      // 사용자 비밀번호 암호화
      const passwordHash = await bcrypt.hash(password, ENCRYPTION_KEY!);

      // 사용자 정보와 만료 날짜로 인증 토큰 생성
      const userData = {
        name: name,
        email: email,
        password: passwordHash,
        createdAt: date,
        updatedAt: date,
      };
      const newUser = new UserResource(userData);

      // 사용자 데이터 저장
      await userRepository.createUser(newUser);

      const jwtOptions = {
        expiresIn: '24h',  // 24시간 후 토큰 만료
      };

      const authToken = jwt.sign(newUser.data, AUTH_TOKEN_KEY!, jwtOptions);

      return res.status(200).json({
        success: true,
        user: {
          user_id: newUser.id,
          email: newUser.data.email,
          name: newUser.data.name,
          auth_token: authToken,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `내부 오류` });
    }
  }
);

/**
 * 입력된 이메일과 비밀번호를 사용하여 사용자 로그인 세션 인증
 */
userRoute.post(
  "/login",
  validateHasParameters("email", "password"),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // 사용자 존재 여부 및 제공된 비밀번호가 올바른지 확인
      const user = await userRepository.getUserBy({id: email, matchField: 'email'});
      const userExists = !!user;
      const passwordCorrect = userExists && (await bcrypt.compare(password, user.data.password));
      if(userExists && passwordCorrect) {

        const jwtOptions = {
          expiresIn: '24h',  // 24시간 후 토큰 만료
        };

        const authToken = jwt.sign(user.data, AUTH_TOKEN_KEY!, jwtOptions);

        return res.status(200).json({
          success: true,
          user: {
            user_id: user.id,
            email: user.data.email,
            name: user.data.name,
            auth_token: authToken,
          },
        });
      }

      return res.status(400).json({error: '잘못된 인증 정보'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `서버 오류` });
    }
  }
);

export default userRoute;
```

POST /user/register 엔드포인트에서는 요청 본문에 이름, 이메일 및 비밀번호 세 개의 매개변수를 받습니다. 사용자가 이메일을 통해 존재하는지 확인한 후, 참이면 오류를 반환합니다. 그런 다음 저장을 위해 사용자 관련 데이터 userData를 생성하며, 제공된 비밀번호는 이전에 설치한 bcrypt를 사용하여 ENCRYPTION_KEY로 암호화됩니다. 사용자 데이터의 지속성은 userRepository.createUser를 사용하여 수행하며, 사용자 생성이 성공하면 24시간 만료 기간이 있는 JWT 토큰이 초기화됩니다. JWT 토큰은 이전에 설치한 jwt를 사용하여 AUTH_TOKEN_KEY로 서명되며 사용자 관련 데이터를 포함합니다. 브라우저가 서버 응답을 받으면 이 JWT 토큰이 프론트엔드에 저장됩니다.





POST /user/login 엔드포인트에서는 요청 본문 내 email과 password 세 개의 매개변수를 받습니다. 먼저 사용자가 실제로 존재하는지 확인하고 제공된 비밀번호가 해당 사용자 이메일에 대해 찾은 복호화된 비밀번호와 일치하는지 확인합니다. 성공적인 사용자 유효성 검사 후, 동일한 JWT 서명 프로세스가 반복됩니다.

/register 및 /login 엔드포인트에 대한 사용자 입력 유효성 검사용 미들웨어도 구현했다는 것을 알았을 겁니다. 다음 명령어를 사용해 /middleware 디렉토리와 그 안에 validation.ts 파일을 생성해 보세요.

```js
cd server/src &&\
mkdir middleware &&\
touch validation.ts
```

validation.ts 파일에서는 사용자 입력을 검증하기 위한 함수들을 정의할 것입니다.

```js
// server/src/middleware/validation.ts

import { NextFunction, Request, Response } from "express";

export const validateHasParameters = (...args: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let valid = true;

    for (const arg of args) {
      if (body[arg] === undefined) {
        res.status(403).json({ error: arg + " not specified" });
        valid = false;
        break;
      }
    }

    if (valid) {
      next();
    }
  };
};

export const validatePasswordLength = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!!password && password.length > 7) {
    next();
  } else {
    res.status(403).json({ error: "The password provided is not valid" });
  }
};

export const validateEmailFormat = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!!email && re.test(String(email).toLowerCase())) {
    next();
  } else {
    res.status(403).json({ error: "The email provided is not valid" });
  }
};
```

validateHasParameter은 모든 POST 요청에 사용되며 특정 매개변수가 제출되었는지 확인합니다. validatePasswordLength 및 validateEmailFormat 미들웨어는 /user/register 엔드포인트에서 요청에 대해 유효한 비밀번호 길이와 이메일 형식을 보장하는 데 사용됩니다.

마지막으로, app.ts에서 routes를 사용하여 루터를 express 앱에 연결해야 합니다. 아래에 표시된대로 routes를 파일 맨 위에서 가져오는 것에 유의하십시오.

```js
/* app.ts */

// 전역 종속성
import * as dotenv from "dotenv";
dotenv.config(); // 로컬 .env 파일을 사용하여 환경 변수 초기화

// 프로젝트 종속성
import routes from "./routes";

// express 앱 설정
import express from "express";
const app = express();

// 미들웨어
app.use(express.json());

// 라우터
app.use(routes);

export default app;
```

이제 사용자가 방금 만든 엔드포인트를 사용하여 등록하고 로그인할 수 있습니다. 다음 섹션에서는 서버 측에서 보호된 리소스에 대한 사용자 권한 추적을 다룰 것입니다.

## 1.4 사용자 권한

사용자 권한은 인증된 사용자가 보호된 서버 리소스에 액세스하려고 시도하는 프로세스입니다. 이를 위해서는 사용자 등록 또는 로그인 이벤트에서 생성된 토큰이 사용자 브라우저 세션에서 시작된 모든 요청에 첨부되어야 합니다. 토큰은 각 사용자의 브라우저 세션에서 사용된 AUTH_TOKEN_KEY와 같은 것으로 확인될 것입니다. 앞으로 토큰이 요청과 함께 전달되는 방법을 나준에 다룰 것이며, 지금은 서버 측에서 미들웨어 사용자 권한을 구현할 것입니다.

서버/src/middleware 디렉토리 안에 auth.ts라는 추가 파일을 만들 것입니다.

```js
cd server/src/middleware && touch auth.ts
```

auth.ts 파일 안에는 들어오는 요청을 가로채고 토큰 유효성 검사 프로세스를 수행하는 checkAuthToken 미들웨어를 정의할 것입니다.

```js
// server/src/middleware/auth.ts

// 전역 의존성
import jwt, { JwtPayload } from 'jsonwebtoken';
const { AUTH_TOKEN_KEY } = process.env;

// 프로젝트 의존성
import userRepository from '../repositories/UserRepository';

export const checkAuthToken = async (req: any, res: any, next: any) => {
  const auth_token = req.headers["x-access-token"] as string;

  try {
    if (!auth_token) {
      throw new Error('Unauthorized');
    }

    const decodedUserInfo = jwt.verify(auth_token, AUTH_TOKEN_KEY!) as JwtPayload;
    // 사용자가 실제로 데이터베이스에 존재하는지 확인
    const user = await userRepository.getUserBy({ id: decodedUserInfo.email, matchField: 'email' });
    if(!user) {
      throw new Error('Unauthorized');
    }

    req.user = {...user.data, ...decodedUserInfo};
  } catch (error) {
    return res.status(403).json({error: 'Unauthorized'});
  }

  return next();
};
```

확인할 토큰은 요청 헤더 X-ACCESS-TOKEN 안에 포함될 것입니다. 추출된 토큰은 AUTH_TOKEN_KEY를 사용하여 검증되며, 해당 데이터 페이로드는 decodedUserInfo에 할당될 것입니다. 그런 다음 제출된 토큰의 유효성을 보장하기 위해 데이터 저장소에 사용자가 실제로 존재하는지 추가로 확인할 것입니다. 토큰 유효성 검사에 실패하면 403 오류 'Unauthorized' 메시지로 응답할 것입니다.

인증 논리를 테스트하려면 보호된 서버 리소스를 흉내 내는 더미 /resource API 엔드포인트를 설정할 수 있습니다. 먼저 다음 명령을 사용하여 resource.ts 파일을 만듭니다.

```js
cd server/src/routes && touch resource.ts
```

resource.ts 파일의 내용은 간단하며 단일 GET 엔드포인트로 구성되어 일부 정적 HTML을 반환합니다.

```js
// server/src/routes/resource.ts

import { Router } from "express";
const resourceRoute = Router();

resourceRoute.get("/", async (req, res) => {
  return res.status(200).send("<h1>You have successfully access resource!</h1>");
});

export default resourceRoute;
```

server/src/routes/index.ts 파일 안에 /resource 엔드포인트를 아래와 같이 추가할 수 있습니다.

```js
// server/src/routes/index.ts

// 전역 의존성
import { Router } from "express";
const router = Router();
import userRoute from "./user";
import resourceRoute from "./resource";
import { checkAuthToken } from "../middleware/auth";

// API에 대한 모든 라우트
router.use("/user", userRoute);
router.use("/resource", checkAuthToken, resourceRoute);

export default router;
```

또한 checkAuthToken 미들웨어를 import하고 /resource 엔드포인트와 연결했습니다. 이를 통해 해당 엔드포인트로 들어오는 모든 요청이 토큰 권한 부여를 위해 유효성을 검사받도록 됩니다.

## 1.5 CORS 구현

앞서 말한 튜토리얼의 제1부에서는 CORS 규칙이 서버에 의해 지정되어 특정 출처 도메인으로부터의 요청을 허용할 수 있도록합니다. 이를 위해 외부 패키지인 cors를 사용할 것이며, 따라서 다음 명령을 사용하여 먼저 서버 프로젝트에 추가해야합니다.

```js
cd server && yarn add cors && yarn add @types/cors --dev
```

실제 CORS 규칙은 다음과 같이 서버/src/app.ts에서 미들웨어로 지정됩니다.

```js
/* app.ts */

// global dependencies
import * as dotenv from "dotenv";
dotenv.config(); // 로컬 .env 파일을 사용하여 환경 변수를 초기화합니다.
import cors from "cors";

// project dependencies
import routes from "./routes";

// express 앱 설정
import express from "express";
const app = express();

// CORS 설정
app.use(
  "/",
  cors({
    origin: true, // 참고: 여기서 모든 출천을 허용하고 있습니다.
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS",
    credentials: true,
  })
);

// 미들웨어
app.use(express.json());

// 라우트
app.use(routes);

export default app;
```

가장 중요한 설정은 origin: true로 설정해야 합니다. 이 설정은 모든 도메인에서의 요청을 허용합니다. 이 설정은 로컬 개발에 충분하지만 운영 환경에서는 프로젝트별 도메인 목록에서 요청을 허용해야 합니다.

이제 서버에 필요한 모든 작업을 완료했습니다. 다음에는 사용자가 서버 애플리케이션과 상호 작용하는 방법을 보여주기 위해 프론트엔드 로그인 폼을 구현할 것입니다.

# 2. 사용자 인터페이스 설정

## 2.1 종속성 설치

사용자 인터페이스에 대해 우리는 React 코드를 호스팅하기 위해 ./authentication-and-authorization 폴더에 별도의 폴더를 만들 것입니다:

```js
mkdir ui && cd ui
```

/ui 디렉토리 내에서 Typescript를 활성화한 React 프로젝트를 설정하기 위해 다음 명령을 실행하십시오:

```js
yarn create react-app ./ --template typescript
```

설치 프로세스가 완료되면 '/ui' 폴더 내 불필요한 파일들을 정리하고 아래에 표시된 디렉토리와 동일하게 보이도록 조정할 것입니다:

```js
/ui
  |__ /node_modules
      |__ ...
  |__ /public
      |__ favicon.ico
      |__ index.html
      |__ logo192.png
      |__ logo512.png
      |__ manifest.json
      |__robots.txt
  |__ /src
      |__ App.css
      |__ App.tsx
      |__ index.css
      |__ index.tsx
      |__ react-app-env.d.ts
  |__ .gitignore
  |__ package.json
  |-- README.md
  |__ tsconfig.json
  |__ yarn.lock
```

index.tsx와 App.tsx에서 불필요한 코드와 잘못된 import를 제거하여 아래에 표시된 파일과 동일하게 만들어야 합니다:

```js
/* index.tsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```js
/* App.tsx */

import "./App.css";

function App() {
  return <div className="App">안녕</div>;
}

export default App;
```

좋은 소식은 사용자 인터페이스에 대한 모든 설정이 완료되었으며 이제 실제 리액트 애플리케이션을 만들 준비가 되었다는 것입니다!

## 2.2 전역 인증 상태 관리

어플리케이션이 동작하려면 인터페이스가 사용자의 인증 상태에 대해 알아야 합니다. 이를 React Context와 useReducer 훅을 사용하여 전역 상태로 관리할 것입니다. 먼저 ui/src/ 안에 전역 인증 상태를 위한 스토어 디렉토리를 생성합니다:





```js
cd ui/src &&\
mkdir store &&\
cd store && mkdir auth &&\
touch authAction.ts AuthContextProvier.tsx authReducer.ts
```

authAction.ts는 사용자가 인터페이스 내에서 트리거할 수 있는 가능한 액션을 포함하고 있습니다:

```js
/* ui/src/store/auth/authActions.ts */

export enum AuthActionEnum {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
};

export type AuthAction = {
  type: AuthActionEnum.LOG_IN,
  payload: {
    authToken: string;
    userId: string;
    email: string;
    name: string;
  }
} | {
  type: AuthActionEnum.LOG_OUT,
  payload: null,
}
```

authReducer.ts 내부에서는 인증 관련 액션을 해당 상태로 매핑하는 리듀서를 생성할 것입니다:

```js
/* ui/src/store/auth/authReducer.ts */

import { Reducer } from "react";
import { AuthAction } from "./authActions";

export interface AuthState {
  isLoggedIn: boolean;
  authToken?: string;
  userId?: string;
  name?: string;
  email?: string;
}

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  // 사용자가 성공적으로 인증되면
  if (action.type === "LOG_IN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return {
      ...state,
      isLoggedIn: true,
      authToken: action.payload.authToken,
      userId: action.payload.userId,
      name: action.payload.name,
      email: action.payload.email,
    };
  }

  // 사용자 로그아웃
  if (action.type === "LOG_OUT") {
    localStorage.removeItem("user");
    return defaultAuthState;
  }

  return defaultAuthState;
};

export default authReducer;
```

기본 상태는 false로 설정된 하나의 필드인 isLoggedIn으로 구성됩니다. 사용자가 인증을 한 번하면 리듀서는 LOG_IN 액션을 처리하고 사용자 관련 정보를 localStorage에 유지하며 새 인증 상태를 반환하여 동일한 정보를 유지합니다. 사용자 정보를 계속 유지해야 하는 이유는 사용자가 페이지를 나가고 나중에 방문할 때 인증 상태가 유지되어야 하기 때문입니다. LOG_OUT 액션은 리듀서에 의해 처리되어 모든 상태 및 저장된 사용자 정보가 기본 값으로 재설정됩니다.

이제 액션과 리듀서가 정의되었으므로 AuthContextProvider.tsx에서 전체 응용 프로그램에 인증 상태를 제공하는 컨텍스트 제공자 구성 요소를 만듭니다:

```js
/* ui/src/store/auth/AuthContextProvider.tsx */

// 전역 가져오기
import React, { createContext, useReducer, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 프로젝트 종속성
import { AuthActionEnum } from "./authActions";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";

type AuthProviderProps = {
  children: React.ReactElement,
};

export type UserData = {
  authToken: string,
  userId: string,
  name: string,
  email: string,
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
}

// Auth 컨텍스트
const authCtx =
  createContext <
  AuthContext >
  {
    authState: defaultAuthState,
    globalLogInDispatch: () => {},
    globalLogOutDispatch: () => {},
  };

export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();

  // 사용자 세부 정보가 지속되는지 확인, 대부분 브라우저 새로 고침에 대응
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
    }
  }, []);

  const globalLogInDispatch = useCallback(
    (props: UserData) => {
      const { authToken, email, name, userId } = props;
      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          authToken,
          userId,
          name,
          email,
        },
      });
      navigate("/resource");
    },
    [navigate]
  );

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate("/user/login");
  }, [navigate]);

  // 하위 컴포넌트로 전달할 컨텍스트 값
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
  };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;
```

AuthContextProvider 컴포넌트는 authState 및 관련 디스패치 메서드를 authCtx 컨텍스트 내의 모든 자식 컴포넌트에 제공하는 Higher Order Component (HOC)입니다. globalLogInDispatch와 globalLogOutDispatch 함수는 각각 LOG_IN 및 LOG_OUT 액션을 리듀서에 디스패치하여 인증 상태를 업데이트하는 데 사용됩니다. 인증 액션이 디스패치될 때 해당 경로로 이동하기 위해 react-router-dom도 사용하고 있습니다. 마지막으로, 사용자가 이전에 로그인했는지 여부를 확인하고 필요할 경우 localStorage에 저장된 정보를 찾아 LOG_IN 액션을 디스패치하는 useEffect 훅을 정의했습니다.

마지막 단계는 index.tsx에서 애플리케이션을 AuthContextProvider로 래핑하여 컨텍스트를 제공하는 것입니다.

```js
/* index.tsx */

import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth/AuthContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## 2.3 서버와 통신하기

인증 상태 관리가 완료되었으니 이제 내부 메모리 데이터베이스에서 사용자 데이터를 검색해야 하는 서버와의 통신에 집중해 봅시다. 이를 위해 React 컴포넌트에서 서버 엔드포인트를 요청하는 논리를 모두 재사용할 수 있도록 useApi라는 커스텀 훅을 생성할 것입니다. ui/src 내부에 코드를 호스팅할 수 있는 관련 파일이 있는 hooks 폴더를 만들어 보겠습니다:

```js
cd ui/src && mkdir hooks && cd hooks &&\
mkdir api && cd api &&\
touch apiData.ts useApi.ts
```

apiData.ts 파일에는 사용자 로그인 및 등록 이벤트에 대한 서버에서 반환될 데이터 구조가 포함되어 있습니다:

```js
/* ui/src/hooks/api/apiData.ts */

export type AuthData = {
  success: boolean,
  user: {
    user_id: string,
    email: string,
    name: string,
    auth_token: string,
  },
};
```

useApi.ts 파일에는 서버와 통신하기 위한 커스텀 훅이 들어 있어요:

```js
/* ui/src/hooks/api/useApi.ts */

// 전역 의존성
import { useState, useCallback, useContext } from "react";

// 프로젝트 의존성
import AuthContext from "../../store/auth/AuthContextProvider";

const BASE_URL = "http://localhost:8000";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState, globalLogOutDispatch } = useContext(AuthContext);

  const request = useCallback(
    async (
      endpoint: string,
      params: { [key: string]: any },
      handleSuccessResponse: (data: any) => void,
      handleErrorResponse?: (error: Error) => void
    ) => {
      setLoading(true);
      setError(null);

      try {
        // NOTE: 사용자가 로그인 중이면 요청 헤더에 auth 토큰 삽입
        if (authState.isLoggedIn) {
          params.headers["x-access-token"] = authState.authToken;
        }

        const response = await fetch(BASE_URL + endpoint, { ...params });
        if (!response.ok) {
          const data = await response.json(); // 항상 json 응답을 가정
          throw new Error(data.error);
        }
        const data = await response.json(); // 항상 json 응답을 가정

        // 응답이 정상적이고 오류가 없는 경우, 성공 응답 처리
        handleSuccessResponse && (await handleSuccessResponse(data));
      } catch (error: any) {
        // NOTE: 권한이 없는 오류인 경우 사용자 로그아웃
        if (error && error.message && error.message === "Unauthorized") {
          globalLogOutDispatch();
        }

        // 지정된 오류 처리
        if (handleErrorResponse) {
          handleErrorResponse(error.message || error.error || error);
        } else {
          setError(error.message || error.error || error);
        }
      }

      setLoading(false);
    },

    [authState.isLoggedIn, authState.authToken, globalLogOutDispatch]
  );

  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  };
};

export default useApi;
```

useApi 훅은 request 함수 내에서 fetch 요청을 보내는 것을 담당하고 있어요. 전역 인증 상태를 통해 사용자가 로그인했는지 먼저 확인하고, 사용자가 인증되면 요청 헤더 x-access-token에 authToken을 첨부합니다. 이 토큰은 요청과 함께 전송되어 서버가 사용자가 특정 리소스에 액세스할 권한이 있는지 확인할 수 있게 해줍니다. 또한, 커스텀 훅은 요청-응답 사이클 및 오류 처리의 상태 관리도 관리합니다. 서버에서 성공적인 응답을 받았다면 handleSuccessResponse 콜백을 통해 데이터를 처리하고, 응답이 실패한 경우 handleErrorResponse 콜백을 통해 오류를 처리합니다. 응답 오류에 "Unauthorized" 메시지가 있으면 globalLogOutDispatch 함수를 트리거하여 사용자 인증 상태를 재설정합니다.

## 2.4 인증 구성 요소

우리 애플리케이션의 모든 비즈니스 로직을 완료했고, 이제 화면 인터페이스를 작업할 차례입니다. 먼저 React 컴포넌트를 호스팅할 폴더를 만들어봅시다:

```js
cd ui/src && mkdir components &&\
cd components && mkdir auth &&\
touch Auth.tsx LogInForm.tsx RegisterForm.tsx validations.ts
```

먼저, LogInForm.tsx와 RegisterForm.tsx에서 각각 로그인 및 사용자 등록을 위한 양식 컴포넌트를 생성해보겠습니다:

```js
/* ui/src/components/auth/LoginForm.tsx */

import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>,
};

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div className={styles.Input}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" required placeholder="이메일 주소" />
      </div>
      <div className={styles.Input}>
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" required placeholder="비밀번호" />
      </div>
      <button type="submit">제출</button>
      <Link className={styles.Link} to={"/user/register"}>
        아직 계정이 없으신가요? 가입하기
      </Link>
    </form>
  );
};

export default LoginForm;
```

```js
/* ui/src/components/auth/RegisterForm.tsx */

import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>,
};

const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <div className={styles.Input}>
        <label htmlFor="name">이름</label>
        <input id="name" name="name" type="text" required placeholder="전체 이름" />
      </div>
      <div className={styles.Input}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" required placeholder="이메일 주소" />
      </div>
      <div className={styles.Input}>
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" required placeholder="비밀번호" />
      </div>
      <button type="submit">제출</button>
      <Link className={styles.Link} to={"/user/login"}>
        이미 계정이 있으신가요? 로그인하기
      </Link>
    </form>
  );
};

export default RegisterForm;
```

두 양식은 각각 이름, 이메일과 비밀번호 속성을 포함한 폼 제출 이벤트를 처리할 콜백 프롭인 onSubmit을 전달받습니다.

그 다음으로, Auth.tsx에서 사용자 브라우저 내의 네비게이션 경로에 따라 LogInForm 또는 RegisterForm 구성 요소 중 하나를 표시할 컴포넌트를 만들겠습니다:

```js
/* ui/src/components/auth/Auth.tsx */

// 전역 imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// 프로젝트 의존성
import useApi from "../../hooks/api/useApi";
import AuthContext from "../../store/auth/AuthContextProvider";
import { validatePasswordLength, validateEmailFormat } from "./validations";
import { AuthData } from "../../hooks/api/apiData";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { request, setError } = useApi();
  const { globalLogInDispatch } = useContext(AuthContext);
  const location = useLocation();
  const currentPathArray = location.pathname.split('/');
  const isLogin = currentPathArray[currentPathArray.length - 1] === 'login';

  // 로그인 사용자에 대한 api 응답 성공 시, 전역 auth LOG_IN 이벤트를 디스패치합니다
  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.user.auth_token,
        userId: authData.user.user_id,
        name: authData.user.name,
        email: authData.user.email,
      });
    }
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // 먼저 유효성 검사!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userName = data.get("name");
    try {
      if (
        !validateEmailFormat(userEmail?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("잘못된 자격 증명 형식입니다!");
      }
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
        }),
      };

      const endpoint = `/user/${isLogin ? 'login' : 'register'}`
      await request(endpoint, params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };

  return (
    <>
      <h2>{isLogin ? '로그인' : '가입하기'}</h2>
      {
        isLogin
          ? <LoginForm onSubmit={authHandler} />
          : <RegisterForm onSubmit={authHandler} />
      }
    </>
  );
};

export default Auth;
```

우리는 react-router-dom에서 제공하는 useLocation을 사용하여 사용자가 브라우저에서 어떤 경로에 있는지 추출합니다. 경로에 따라, LoginForm 또는 RegisterForm을 표시하도록 선택합니다. 각 폼에 대한 onSubmit 핸들러는 authHandler에 정의된 대로 작동하며, 이 핸들러는 양식 제출 이벤트에서 모든 입력 폼 속성을 추출하고 서버에서 사용자/로그인 또는 사용자/등록 엔드포인트를 요청하기 전에 이를 유효성 검사합니다.

양식 제출 이벤트에 대한 유효성 검사 로직은 기본적이며 아래 validation.ts에서 보여진 것과 같습니다:

```js
/* ui/src/components/auth/validations.ts */

export const validatePasswordLength = (password: string) => {
  return !!password && password.length > 7;
};

export const validateEmailFormat = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!email && re.test(String(email).toLowerCase());
};
```

## 2.5 Resource component

마지막으로 만들 인터페이스 구성 요소는 보호된 리소스 경로를 시뮬레이션하는 더미 페이지입니다. 코드를 호스팅할 폴더를 만들기 위해 먼저 다음 명령어를 실행하세요:

```js
cd ui/src/components &&\
mkdir resource &&\
cd resource &&\
touch Resource.tsx
```

Resource.tsx 파일 내부에 아래와 같이 구성 요소를 생성할 것입니다:

```js
/* ui/src/components/resource/Resource.tsx */

import { useCallback, useContext, useEffect, useState } from "react";
import useApi from "../../hooks/api/useApi";
import authCtx from "../../store/auth/AuthContextProvider";
import styles from "./Resource.module.css";

const Resource = () => {
  const [data, setData] = useState();
  const { request, setError } = useApi();
  const { globalLogOutDispatch } = useContext(authCtx);

  const fetchData = useCallback(async () => {
    try {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await request("/resource", params, (result) => {
        setData(result.data);
      });
    } catch (error: any) {
      setError(error.message || error);
    }
  }, [request, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.Resource}>
      <h1>{data}</h1>
      <button onClick={globalLogOutDispatch}>로그아웃</button>
    </div>
  );
};

export default Resource;
```

이 컴포넌트는 간단하며 useEffect 훅을 사용하여 서버의 /resource 엔드포인트로 호출하는 로직으로 구성되어 있습니다. 이 호출에는 pre-existing auth 토큰이 필요합니다. 반환된 데이터는 페이지에 표시되며 로그아웃 버튼을 클릭하면 auth 컨텍스트에서 globalLogOutDispatch를 트리거하여 전역 auth 상태를 재설정합니다.

## 2.6 모든 것을 연결하기

인터페이스 애플리케이션을 위한 비즈니스 로직과 프레젠테이션 컴포넌트를 작성했으니, App.tsx에서 react-router-dom을 사용하여 프론트엔드 라우팅을 통해 모든 것을 연결해보겠습니다 :

```js
/* ui/src/App.tsx */

import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./store/auth/AuthContextProvider";
import { useContext } from "react";
import Resource from "./components/resource/Resource";
import Auth from "./components/auth/Auth";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={authState.isLoggedIn ? location.pathname : "/user/login"} />} />
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        {authState.isLoggedIn && <Route path="resource" element={<Resource />} />}
      </Routes>
    </div>
  );
}

export default App;
```

App.tsx 파일 내에서는 지금 애플리케이션의 모든 라우팅이 구성되어 있습니다. /user/register, /user/login 및 /resource로 구성되어 있습니다. 컨텍스트에서 제공된 전역 인증 상태가 사용자가 인증된 상태를 나타내면 사용자에게 /resource 경로에 액세스할 수 있도록 허용하여 해당 서버의 엔드포인트로 이동하여 'protected' 데이터를 표시합니다.

# 결론

이 글에서는 풀스택 인증 시스템을 구현하는 데 필요한 기능을 만들었습니다. 인증 방법은 토큰 기반 방식으로, 이는 이 튜토리얼 시리즈의 첫 번째 글에서 논의되었습니다. 애플리케이션의 각 구성 요소에 대해 많은 세부 정보를 다뤘지만, 아직 할 일이 많습니다. 예를 들어 다음과 같은 작업을 수행할 수 있습니다:

- 프론트엔드 애플리케이션의 스타일링 개선, 이 리포지토리에서 설정한 기본 스타일링을 가져올 수 있습니다.
- 프론트엔드 및 백엔드에서 적절한 사용자 입력 유효성 검사, SQL 인젝션 방지 또는 데이터 유형 유효성 검사와 같은 작업.
- 잘못된 자격 증명을 제출했을 때 사용자 경험을 향상시키기 위한 에러 처리.
- 실제 데이터베이스를 구축하여 사용자 데이터 저장.
- AWS 또는 GCP와 같은 클라우드 제공 업체를 사용하여 애플리케이션을 컨테이너화하고 배포.

나머지는 네가 알아서 해주면 돼! 그리고 언제든지 애플리케이션을 개선하거나 다른 방법으로 작업할 수 있는 좋은 제안이 있다면 댓글을 남겨줘! 이 튜토리얼의 최종 코드는 여기서 확인할 수 있어.
