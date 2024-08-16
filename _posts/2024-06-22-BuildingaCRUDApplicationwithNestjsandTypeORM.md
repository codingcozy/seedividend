---
title: "Nestjs와 TypeORM으로 CRUD 애플리케이션 만드는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildingaCRUDApplicationwithNestjsandTypeORM_0.png"
date: 2024-06-22 02:22
ogImage: 
  url: /assets/img/2024-06-22-BuildingaCRUDApplicationwithNestjsandTypeORM_0.png
tag: Tech
originalTitle: "Building a CRUD Application with Nest.js and TypeORM"
link: "https://medium.com/@pawanrijal/building-a-crud-application-with-nest-js-and-typeorm-352a02c46234"
isUpdated: true
---




![그림](/assets/img/2024-06-22-BuildingaCRUDApplicationwithNestjsandTypeORM_0.png)

Nest는 효율적이고 확장 가능하며 신뢰할 수 있는 서버 측 애플리케이션(웹사이트)을 구축하기 위한 혁신적인 Node JS 프레임워크입니다. 데코레이터는 이 프레임워크에서 주로 사용되며 Java의 Spring Boot 프레임워크와 유사합니다.

이 안내서에서는 Nest.js 프로젝트 설정, TypeORM을 사용한 데이터 모델 정의 및 기본 CRUD 작업(생성, 읽기, 업데이트, 삭제) 구현 과정을 안내합니다. 이 튜토리얼을 완료하면 확장 가능하고 유지보수 가능한 백엔드 애플리케이션 구축 방법을 명확히 이해하게 될 것입니다.

# 필요 조건

<div class="content-ad"></div>

시작하기 전에 먼저 컴퓨터에 Node.js와 npm이 설치되어 있는지 확인해주세요. 다음 명령을 실행하여 Nest CLI를 전역으로 설치할 수 있습니다:

```js
npm install -g @nestjs/cli
```

# 단계 1: 프로젝트 설정

새로운 Nest.js 프로젝트를 생성해봅시다. 터미널을 열고 다음 명령을 실행해주세요:

<div class="content-ad"></div>

```js
nest new nest-crud-tutorial
```

```js
cd nest-crud-tutorial
```

```js
npm install @nestjs/typeorm typeorm
```

우리는 데이터베이스로 PostgreSQL을 사용할 것이기 때문에 해당 패키지를 설치해야 합니다.

<div class="content-ad"></div>

```js
npm install pg
```

# 단계 2: 데이터베이스 구성

프로젝트 루트 디렉토리에 .env 파일을 생성하고 데이터베이스에 맞게 구성해주세요.

```js
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pawan123
POSTGRES_DATABASE=nest-crud
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
```

<div class="content-ad"></div>

기본으로 생성된 파일 app.module.ts에서 TypeORM을 구성하십시오.

```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [],
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

# 단계 3: 사용자를 위한 리소스 생성

다음 명령어로 nest-cli를 사용하여 DTO, 엔티티, 컨트롤러 및 서비스를 생성할 것입니다.

<div class="content-ad"></div>

```js
nest g resource user
```

이 명령은 CRUD 기능을 갖는 리소스를 생성하는 데 필요한 파일을 생성합니다.

# 단계 4: 엔티티 생성

이제 TypeORM을 사용하여 엔티티를 생성하여 데이터 모델을 정의해 봅시다. 이 예시에서는 fullName과 email 속성을 갖는 간단한 User 엔티티를 생성할 것입니다.

<div class="content-ad"></div>

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;
}
```

생성된 user.entity.ts 파일에 위 코드를 추가해주세요.

# 단계 5: 유효성 검사 추가

유효성 검사를 위해 nest는 기본적으로 오류 처리를 위한 검증 파이프를 제공합니다. main.ts 파일에서 검증 파이프를 사용할 수 있습니다.

<div class="content-ad"></div>

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  await app.listen(3000);
}
bootstrap();
```

유효성 검사를 위해 class-validator 패키지를 설치해야 합니다. 다음 명령을 사용하여 설치하세요.

```js
npm install class-validator
```

이제 createUserDto.ts 파일에 DTO를 생성하세요. 이는 사용자의 데이터 스키마를 정의합니다.

<div class="content-ad"></div>

```js
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// create-user-dto
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
```

또한 CreateUserDto의 부분 유형인 update-user-dto.ts 파일을 만들고 null 값을 가질 수 있습니다.

```js
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

# 6단계: 서비스 만들기


<div class="content-ad"></div>

다음으로, TypeORM을 사용하여 데이터베이스와 상호작용하는 서비스를 생성하세요. 유저 서비스에서는 TypeORM에 의해 생성된 엔티티에서 의존성 주입을 통해 만들어진 저장소를 초기화해야 합니다. 서비스 레이어는 애플리케이션의 비즈니스 로직을 처리합니다.

```js
import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const userData =
      await this.userRepository.create(
        createUserDto,
      );
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userData =
      await this.userRepository.findOne(id);
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return await this.userRepository.save(
      userData,
    );
  }

  async remove(id: number): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(
      existingUser,
    );
  }
}
```

# 단계 7: 컨트롤러 생성

HTTP 요청을 처리하고 서비스와 상호작용하는 컨트롤러를 만들어보세요.

<div class="content-ad"></div>

```js
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // route 그룹
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      await this.userService.create(
        createUserDto,
      );

      return {
        success: true,
        message: '사용자가 성공적으로 생성되었습니다',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.userService.findAll();
      return {
        success: true,
        data,
        message: '사용자가 성공적으로 검색되었습니다',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(
        +id,
      );
      return {
        success: true,
        data,
        message: '사용자가 성공적으로 검색되었습니다',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.update(
        +id,
        updateUserDto,
      );
      return {
        success: true,
        message: '사용자가 성공적으로 업데이트되었습니다',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return {
        success: true,
        message: '사용자가 성공적으로 삭제되었습니다',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
```

# 단계 8: 모든 것을 연결하기

이제 서비스, 컨트롤러 및 엔티티를 연결해보겠습니다. Nest.js는 애플리케이션 구성 요소를 관리하기 위해 의존성 주입을 사용합니다. 서비스 및 컨트롤러를 user.module.ts 파일에 import 및 등록해야 합니다.

```js
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

<div class="content-ad"></div>

축하합니다! Nest.js와 TypeORM을 사용하여 기본 CRUD 애플리케이션을 성공적으로 만드셨군요. 프로젝트 설정, 데이터 모델 정의, 서비스 및 컨트롤러 구현, 애플리케이션 테스트 등을 다뤘습니다. 이것은 시작에 불과합니다. Nest.js와 TypeORM은 견고한 백엔드 애플리케이션을 구축하기 위한 다양한 기능을 제공합니다.

편의를 위해, 이 튜토리얼의 전체 소스 코드는 제 GitHub 저장소에서 찾아볼 수 있습니다. 저장소를 클론하여 코드를 자유롭게 실험해보세요.

Nest.js와 TypeORM CRUD 튜토리얼을 따라주셔서 감사합니다. 이 튜토리얼이 숙련된 백엔드 개발자가 되는 여정에서 도움이 되셨기를 바랍니다. 즐거운 코딩되시길 바라겠습니다!