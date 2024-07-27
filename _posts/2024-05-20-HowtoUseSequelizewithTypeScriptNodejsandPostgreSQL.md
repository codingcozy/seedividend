---
title: "TypeScript, Nodejs, 그리고 PostgreSQL과 함께 Sequelize를 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-20-HowtoUseSequelizewithTypeScriptNodejsandPostgreSQL_0.png"
date: 2024-05-20 22:18
ogImage: 
  url: /assets/img/2024-05-20-HowtoUseSequelizewithTypeScriptNodejsandPostgreSQL_0.png
tag: Tech
originalTitle: "How to Use Sequelize with TypeScript, Node.js, and PostgreSQL"
link: "https://medium.com/javascript-in-plain-english/how-to-use-sequelize-with-typescript-node-js-and-postgresql-c6ff58a3af76"
---


시작 가이드: TypeScript로 Sequelize 구성하기 

모델, 연결 및 데이터베이스 연결을 정의하여 Sequelize를 TypeScript와 함께 설정하는 방법에 대해 알아보겠습니다.

# 소개

이 글에서는 Sequelize를 설정하여 TypeScript Node.js 및 Express를 연동하여 PostgreSQL 데이터베이스에 연결하고, 그 후에 조회용 샘플 모델을 만들어 보겠습니다.

TypeScript, Node.js, Express.js 및 PostgreSQL을 함께 사용하면 견고한 백엔드 개발을 위한 강력한 조합을 제공합니다. Node.js를 위한 인기 있는 ORM인 Sequelize와 TypeScript의 정적 유형 지정 그리고 PostgreSQL의 신뢰성을 활용하여 효율적인 데이터 관리와 확장 가능성을 확보할 수 있습니다. 이 통합은 데이터의 모델링, 쿼리, 그리고 조작을 원활하게 하며 개발 경험을 향상시키면서 코드 무결성과 데이터베이스 무결성을 유지하는 데 도움이 됩니다.

<div class="content-ad"></div>

새로운 실시간 Node.js 앱이나 서비스를 시작할 때 가장 먼저 고려해야 할 것은 어디서 시작해야 하는지, 어떤 프레임워크나 ORM을 사용해야 하는지, 그리고 그것이 성능에 어떻게 영향을 미칠지 입니다. 또한, SQL 또는 NoSQL 데이터베이스를 선택하는 것에 따라 이 질문이 달라질 수 있습니다.

# 사전 준비

이 글에서는 TypeScript와 Express를 사용하여 이미 만들어 놓은 Node.js 보일러플레이트 코드를 사용할 것입니다.

우리는 sequelize, pg, pg-hstore이 npm 모듈을 사용하여 어플리케이션을 설정할 것이고, Jest를 사용하여 유닛 테스트 케이스도 추가했습니다.

<div class="content-ad"></div>

```js
// 애플리케이션 복제하기
git clone https://github.com/santoshshinde2012/node-boilerplate.git

// 새 디렉토리로 변경
cd node-boilerplate

// 모든 모듈 설치
npm install

// 애플리케이션 시작
npm start
```

# 단계 1: PostgreSQL 설정 및 데이터베이스 생성

아래 스크립트로 폴더 docker/postgresql에 Dockerfile.postgis 파일을 생성합니다.

```js
FROM postgres:latest

# PostGIS 확장 기능 설치
RUN apt-get update \
    && apt-get install -y postgis postgresql-12-postgis-3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 초기 쿼리를 실행하기 위해 init.sql에 쿼리를 작성할 수 있습니다
COPY init.sql /docker-entrypoint-initdb.d/

# PostGIS 확장 기능 활성화
RUN echo "CREATE EXTENSION IF NOT EXISTS postgis;" >> /docker-entrypoint-initdb.d/init.sql
```

<div class="content-ad"></div>

도커 Compose 파일을 만들어주세요. docker/postgresql 폴더에 아래 스크립트를 작성해주세요.

```js
# PostgreSQL을 위한 docker-compose.yml

version: '3.8'

services:
  db:
    build:
      context: .
      dockerfile: Dockerfile.postgis  # 커스텀 Dockerfile 사용
    restart: always
    environment:
      POSTGRES_USER: user1
      POSTGRES_PASSWORD: user1@123
      POSTGRES_DB: database
    healthcheck:
      # 이 명령어는 데이터베이스가 준비되어 있는지 소스 db 서버에서 확인합니다.
      test: [ "CMD-SHELL", "pg_isready" ]
      interval: 5s
      timeout: 5s
      retries: 5
    ports:
      - "5432:5432"
    volumes:
      - postgres_data_v:/var/lib/postgresql/data
volumes:
  postgres_data_v:
```

package.json 안에 Docker Compose 파일을 실행시키는 명령어를 추가해주세요.

```js
"db:up": "docker-compose -f docker/postgresql/docker-compose.yml up",
"db:down": "docker-compose -f docker/postgresql/docker-compose.yml down"
```

<div class="content-ad"></div>

Postgresql을 실행하고 다음 명령어를 사용하여 데이터베이스를 생성하세요: npm run db:up.

![image](/assets/img/2024-05-20-HowtoUseSequelizewithTypeScriptNodejsandPostgreSQL_0.png)

# 단계 2: Sequelize의 설치 및 구성

Sequelize는 npm (또는 yarn)을 통해 사용할 수 있습니다.

<div class="content-ad"></div>

```js
npm install --save sequelize
npm install --save pg pg-hstore # Postgres
```

작업을 마치면 코드를 배치할 폴더 구조를 확인해야 합니다. 코드가 깨끗하고 가독성 있게 유지되도록 하기 위해 코드베이스를 여러 폴더로 나누었습니다. 데이터베이스 관련 부분은 database 폴더 아래에 위치해야 합니다.

<img src="/assets/img/2024-05-20-HowtoUseSequelizewithTypeScriptNodejsandPostgreSQL_1.png" />

src/database/config 폴더의 index.ts 파일에 데이터베이스 연결을 정의하고, .env npm 모듈을 사용하여 환경 변수를 가져옵니다. 환경에 따른 로직은 필요에 따라 수정할 수 있습니다.


<div class="content-ad"></div>

```js
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

타입 DbConnection = {
    호스트: 문자열;
    포트: 숫자;
    사용자: 문자열;
    비밀번호: 문자열;
    데이터베이스: 문자열;
    dbLogging: 부울;
};

const connection: DbConnection = {
    호스트: process.env.DB_HOST,
    포트: Number(process.env.DB_PORT),
    사용자: process.env.DB_USER,
    비밀번호: process.env.DB_PASSWORD,
    데이터베이스: process.env.DB_NAME,
    dbLogging:
        process.env.NODE_ENV === 'development' || process.env.LOG === 'true',
};

export default connection;
```

src/database 폴더에 index.ts 파일을 생성하여 sequelize 연결을 만듭니다.

```js
import { Dialect, Sequelize } from 'sequelize';
import connection from './config';

const { database, user, password, host, dbLogging } = connection;

const sequelizeConnection = new Sequelize(database, user, password, {
    host,
    logging: dbLogging,
    dialect: 'postgres' as Dialect,
});

export default sequelizeConnection;
```

src/App.ts 또는 서버 응용 프로그램의 진입 파일에 assertDatabaseConnection 메서드를 만들어 데이터베이스 확인을하는 메서드를 호출하세요.


<div class="content-ad"></div>

```js
개인 async assertDatabaseConnection(): Promise<void> {
    try {
     await database.authenticate();
     await database.sync();
     logger.info('연결이 성공적으로 설정되었습니다.');
    } catch (error) {
 logger.error('데이터베이스에 연결할 수 없습니다:', error);
    }
}
```

# 단계 3: Sequelize를 사용하여 테이블(모델) 생성

src/database/models 폴더에 모델을 정의하세요; 여기서는 샘플 모델인 Enquiry.ts를 생성할 것입니다.

```js
import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface EnquiryAttributes {
 id: string;
 name: string;
 subject: string;
 body: string;
 email: string;
 country: string;
}

interface EnquiryCreationAttributes
 extends Optional<EnquiryAttributes, 'id'> {}

class Enquiry
 extends Model<EnquiryAttributes, EnquiryCreationAttributes>
 implements EnquiryAttributes
{
 public id!: string;
 public name!: string;
 public country!: string;
 public subject!: string;
 public body!: string;
 public email!: string;

 public readonly createdAt!: Date;
 public readonly updatedAt!: Date;
}

Enquiry.init(
 {
  id: {
   type: DataTypes.UUID,
   defaultValue: UUIDV4,
   primaryKey: true,
  },
  name: {
   type: DataTypes.STRING(100),
   allowNull: false,
  },
  country: {
   type: DataTypes.STRING(100),
   allowNull: false,
  },
  subject: {
   type: DataTypes.STRING(200),
   allowNull: false,
  },
  email: {
   type: DataTypes.STRING(100),
   allowNull: false,
  },
  body: {
   type: DataTypes.STRING(400),
   allowNull: false,
  }
 },
 {
  sequelize,
  modelName: 'Enquiry',
  tableName: 'Enquiry',
  timestamps: true,
 },
);

export { Enquiry, EnquiryAttributes, EnquiryCreationAttributes };
```

<div class="content-ad"></div>

```js
import { 데이터 유형, 모델, 선택적, UUIDV4 } from 'sequelize';
import sequelize from '../index';

인터페이스 조회 속성 {
 id: string;
 이름: string;
 주제: string;
 본문: string;
 이메일: string;
 국가: string;
}

인터페이스 EnquiryCreationAttributes 에 이어, EnquiryAttributes의 선택적 해제 {}

클래스 Enquiry은 Model<EnquiryAttributes, EnquiryCreationAttributes>를 확장하며 EnquiryAttributes를 구현합니다 {
 공공 id!: string;
 공공 이름!: string;
 공공 국가!: string;
 공공 주제!: string;
 공공 몸통!: string;
 공공 이메일!: string;

 공공 readonly createdAt!: Date;
 공공 readonly updatedAt!: Date;
}

Enquiry.init(
 {
  아이디: {
   유형: 데이터 유형.UUID,
   기본값: UUIDV4,
   기본 키: 참,
  },
  이름: {
   유형: 데이터 유형.STRING(100),
   허용하지 않음: 거짓,
  },
  국가: {
   유형: 데이터 유형.STRING(100),
   허용하지 않음: 거짓,
  },
  주제: {
   유형: 데이터 유형.STRING(200),
   허용하지 않음: 거짓,
  },
  이메일: {
   유형: 데이터 유형.STRING(100),
   허용하지 않음: 거짓,
  },
  몸통: {
   유형: 데이터 유형.STRING(400),
   허용하지 않음: 거짓,
  }
 },
 {
  시퀄라이즈,
  모델 이름: '조회',
  테이블 이름: '조회',
  타임 스탬프: 참,
 },
);

수출 { 조회, EnquiryAttributes, EnquiryCreationAttributes };
```

<img src="/assets/img/2024-05-20-HowtoUseSequelizewithTypeScriptNodejsandPostgreSQL_2.png" />

# 단계 4: 구성 요소에서 서비스 및 컨트롤러 설정

- 구성 요소 구성 요소는 두 부분으로 나뉩니다: 컨트롤러 및 서비스 서비스는 해당 데이터베이스 모델과 통신하는 데 책임이 있습니다.
- 라우트 — 컨트롤러 및 해당 레스트 엔드포인트의 등록 방법을 등록합니다.
- 공통 서비스 —이 서비스는 여러 데이터베이스 모델 간의 일반 작업 수행에 책임이 있습니다.
- 이를 구성 요소 서비스에 주입하고 구성 요소 서비스에서 컨트롤러에서 해당 메서드에 액세스할 수 있습니다.


<div class="content-ad"></div>

```js
// src/components/enquiry/EnquiryService.ts 파일을 생성하여 sequelize를 사용하여 생성된 모델의 데이터베이스 작업을 처리합니다.

import {
 Enquiry,
 EnquiryAttributes,
 EnquiryCreationAttributes,
} from '../../database/models/Enquiry';
import logger from '../../lib/logger';
import ApiError from '../../abstractions/ApiError';
import { StatusCodes } from 'http-status-codes';

export class EnquiryService {

 async getAll(): Promise<EnquiryAttributes[]> {
  try {
   const enquiries = await Enquiry.findAll();
   return enquiries;
  } catch (error) {
   logger.error(error);
   throw error;
  }
 }

 async getById(id: string | number): Promise<EnquiryAttributes> {
  try {
   const enquiry = await Enquiry.findByPk(id);
   if (!enquiry) {
    throw new ApiError('Enquiry not found', StatusCodes.NOT_FOUND);
   }
   return enquiry;
  } catch (error) {
   logger.error(error);
   throw error;
  }
 }

 async update(
  id: string | number,
  payload: Partial<EnquiryCreationAttributes>,
 ): Promise<EnquiryAttributes> {
  try {
   const enquiry = await Enquiry.findByPk(id);
   if (!enquiry) {
    throw new ApiError(
     'Enquiry not found',
     StatusCodes.NOT_FOUND,
    );
   }
   const updatedEnquiry = await enquiry.update(payload);
   return updatedEnquiry;
  } catch (error) {
   logger.error(error);
   throw error;
  }
 }

 async create(
  payload: EnquiryCreationAttributes,
 ): Promise<EnquiryAttributes> {
  try {
   const enquiry = await Enquiry.create(payload);
   return enquiry;
  } catch (error) {
   logger.error(error);
   throw error;
  }
 }

 async delete(id: string | number): Promise<boolean> {
  try {
   const deletedEnquiryCount = await Enquiry.destroy({
    where: { id },
   });

   return !!deletedEnquiryCount;
  } catch (error) {
   logger.error(error);
   throw error;
  }
 }
}
```

```js
// src/components/enquiry/EnquiryController.ts 파일을 생성하여 REST API의 컨트롤러 부분을 처리합니다.

import { NextFunction, Request, Response, Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseApi from '../BaseApi';
import { EnquiryService } from './EnquiryService';
import { EnquiryAttributes } from '../../database/models/Enquiry';
import ApiError from '../../abstractions/ApiError';

/**
 * Enquiry controller
 */
export default class EnquiryController extends BaseApi {
 private enquiry: EnquiryService;
 public basePath: string = 'enquiries';

 constructor() {
  super();
  this.enquiry = new EnquiryService();
 }

 /**
  *
  */
 public routes(): RouteDefinition[] {
  return [
   { path: '/', method: 'get', handler: this.getEnquiries.bind(this) },
   { path: '/:id', method: 'get', handler: this.getEnquiry.bind(this) },
   { path: '/', method: 'post', handler: this.createEnquiry.bind(this) },
   { path: '/:id', method: 'put', handler: this.updateEnquiry.bind(this) },
   { path: '/:id', method: 'delete', handler: this.delete.bind(this) }
  ];
 }

 /**
  *
  * @param req
  * @param res
  * @param next
  */
 public async getEnquiries(
  req: Request,
  res: Response,
  next: NextFunction,
 ): Promise<void> {
  try {
   const enquiries: EnquiryAttributes[] =
    await this.enquiry.getAll();
   res.locals.data = enquiries;
   // call base class method
   this.send(res);
  } catch (err) {
   next(err);
  }
 }

 // 이하 생략
}
```

<div class="content-ad"></div>

# 단계 5: 구성 요소를 위한 REST API 생성

문의: 문의는 속성 집합을 가진 주요 엔터티입니다.

- GET /v1/enquiries 모든 문의 목록을 가져옵니다.
- POST /v1/enquiries 새로운 문의를 생성합니다.
- GET /v1/enquiries/'id' 특정 문의의 세부 정보를 가져옵니다.
- PUT /v1/enquiries/'id' 특정 문의의 세부 정보를 업데이트합니다.
- DELETE /v1/enquiries/'id' 특정 문의를 삭제합니다.

우리는 이전에 정의한 경로를 등록해야 합니다. 이를 위해 src/routes.ts에 항목을 만들어야 합니다.

<div class="content-ad"></div>

아래 링크에서 전체 코드베이스를 찾을 수 있습니다. 초보자를 염두에 두고 설계된 이 저장소는 백엔드 프로젝트를 시작하는 데 튼튼한 출발점을 제공합니다. 단위 테스트 케이스가 포함된 잘 정리된 코드베이스로 깊게 파고들며 학습하고 문제 해결을 쉽게 할 수 있습니다. 게다가 GitHub Actions 워크플로가 통합되어 있어 테스트와 배포를 자동화할 수 있습니다. 학습을 시작하거나 첫 번째 실제 애플리케이션을 구축하려는 경우에도 유용합니다.

읽어 주셔서 감사합니다. 이 블로그가 학습에 가치가 있다고 생각되면 의견을 공유하고 클랩(clap)을 눌러주세요.

<div class="content-ad"></div>

# 친절한 언어로 🚀

In Plain English 커뮤니티에 참여해 주셔서 감사합니다! 떠나시기 전에:

- 작가를 claps하고 팔로우 해주세요 👏️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 만나보세요