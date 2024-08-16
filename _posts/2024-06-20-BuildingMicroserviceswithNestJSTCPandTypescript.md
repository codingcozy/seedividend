---
title: "NestJS, TCP 및 Typescript로 Microservices 구축하기"
description: ""
coverImage: "/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_0.png"
date: 2024-06-20 00:09
ogImage: 
  url: /assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_0.png
tag: Tech
originalTitle: "Building Microservices with NestJS, TCP and Typescript"
link: "https://medium.com/itnext/building-microservices-with-nestjs-tcp-and-typescript-dda33aad8b89"
isUpdated: true
---




## 마이크로서비스가 서로 상호 작용하는 방법

![이미지](/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_0.png)

프로젝트가 점점 커지면서 더욱 고급 아키텍처가 필요해집니다. 그래서 소프트웨어 엔지니어로서, 현대적이고 인기 있는 마이크로서비스 아키텍처를 소개하고자 합니다. 이 아키텍처는 SOA (Service Oriented Architecture) 개념을 따릅니다.

이 글에서는 단일체와 마이크로서비스 아키텍처의 차이를 이야기하고, NestJS, TCP 및 Typescript를 사용하여 이를 구축하는 방법을 보여드리려고 합니다. 먼저 마이크로서비스가 무엇인지 살펴보겠습니다.

<div class="content-ad"></div>

# 미크로서비스란 무엇인가

미크로서비스는 소프트웨어 개발의 아키텍처적 관점으로, 소프트웨어가 작고 독립적인 서비스로 구성되어 서로 정의된 API를 통해 통신하는 방식입니다. 각 서비스는 특정 작업이나 비즈니스 목표를 지원하며 다른 모듈 및 서비스와 통신하기 위해 API를 사용합니다. 이를 통해 애플리케이션을 확장하고 더 빠르게 개발할 수 있어 혁신을 가능하게 하며 새로운 기능을 시장에 빠르게 내놓을 수 있게 됩니다.

모놀리식 아키텍처와 미크로서비스 아키텍처의 주요 차이는 무엇인가요? 모놀리식 아키텍처에서는 모든 기능과 서비스가 결합돼 단일 단위로 작동합니다. 그러나 미크로서비스에서는 기반 로직을 서로 다른 작업이나 서비스로 분해하여 개별적으로 개발하고, 배포하며 API를 통해 노출하는 것이 특징입니다.

더 나은 이해를 위해 저희는 함께 NestJS에서 미크로서비스 프로젝트를 개발할 예정입니다.

<div class="content-ad"></div>

# 프로젝트 설정하기

시작하기 전에, 저희 프로젝트의 두 가지 주요 측면을 강조하고 싶습니다:

- auth-microservice: 사용자 권한을 관리하는 인증 서비스
- API Gateway: 클라이언트와 마이크로서비스 사이에 위치하며 HTTP API 엔드포인트로부터 이벤트를 발생시키는 서비스

간략히 설명하면, 사용자가 자격 증명으로 /api/login 엔드포인트를 통해 로그인하면 API 게이트웨이에 연결됩니다. API 게이트웨이는 그런 다음 요청-응답 스타일의 메시지 패턴을 사용하여 인증 마이크로서비스와 메시지를 주고받습니다. 이러한 방식으로 저희 앱이 작동할 것입니다.

<div class="content-ad"></div>

여러 서비스를 구축할 예정이므로 여러 앱과 라이브러리가 포함된 단일 버전 관리 코드 저장소인 모노레포 프로젝트를 가지는 것이 좋습니다. 따라서 모노-저장소에서 웹 앱 및 서비스를 빌드하고 확장할 수 있는 Nx 도구를 사용할 것입니다.

우선 다음 명령어로 모노레포 프로젝트를 만들어 봅시다:

```js
npx create-nx-workspace nestjs-microservices --preset=nest
```

앱 이름을 api-gateway로 지정해주세요.

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_1.png" />

이제 다음 명령을 실행하여 프로젝트 종속성을 설치해봅시다:

```js
cd nestjs-microservices
npm i @nestjs/microservices class-validator class-transformer
```

# Auth 모듈 추가하기

<div class="content-ad"></div>

우리 프로젝트가 생성되었으므로, nx는 이미 API Gateway 서비스 애플리케이션을 생성해 주었습니다. 이제 API Gateway 앱에서 인증 모듈을 만들어서 인증 관련 요청을 처리할 것입니다.

사용자가 앱에 요청을 보내면 API Gateway가 요청을 받아서 마이크로서비스로 전송합니다. 그래서 동일한 데이터 유형을 사용하기 때문에 중복되는 코드를 피하기 위해 모놀리포 내에서 공유 라이브러리를 만들겠습니다. 아래 명령어를 사용해 코드를 여기저기 중복 생성하지 않고 공유 라이브러리를 만드는 것이 좋습니다:

```js
nx g @nx/nest:lib shared
```

이제 dto 폴더를 만들어서 create-user.dto.ts 파일을 추가해 주세요:

<div class="content-ad"></div>

```ts
// shared/src/lib/dto/create-user.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
```

또한 tsconfig.base.json에 경로 항목을 추가하고 절대 경로로 가져올 수 있습니다:

```json
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@nestjs-microservices/shared": ["shared/src/index.ts"]
    }
  },
  ...
}
```

NestJS는 기본 TCP 전송 계층을 사용하여 서로 다른 마이크로서비스 인스턴스 간에 메시지를 전달합니다. NestJS는 microservice 전송자를 설명하는 객체 배열을 인자로받는 static register() 메서드를 노출하는 ClientsModule을 제공합니다. 다음 코드 라인을 사용하여 auth.service.ts를 추가하고 AUTH_MICROSERVICE를 등록해 보겠습니다:

<div class="content-ad"></div>

```js
// apps/api-gateway/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```

위 코드에서 각 transporter는 name 속성, 선택적인 transport 속성 (기본값은 Transport.TCP), 그리고 선택적인 transporter에 특화된 options 속성을 가지고 있습니다.

모듈을 import한 후에는 @Inject() 데코레이터를 사용하여 auth.service.ts 파일에서 AUTH_MICROSERVICE transporter 매개변수를 사용하여 구성된 ClientProxy 인스턴스를 주입할 수 있습니다. 아래와 같이 사용합니다:

```js
// apps/api-gateway/src/auth/auth.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDto, User } from '@nestjs-microservices/shared';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy
  ) {}

  getUser(createUserDto: CreateUserDto) {
    return this.authClient.send<User, CreateUserDto>('get_user', createUserDto);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send<User, CreateUserDto>('create_user', createUserDto);
  }
}
```

<div class="content-ad"></div>

위에서 보듯이, get_user 또는 create_user 패턴을 사용하여 인증 마이크로서비스에 메시지를 보낼 수 있습니다. 사용자가 로그인하거나 등록할 때 이를 사용할 것입니다.

send 메서드는 마이크로서비스를 호출하고 응답으로 Observable을 반환하도록 설계되었습니다. 이는 두 가지 인수를 사용합니다:

- pattern — @MessagePattern() 데코레이터에서 정의된 것 중 하나
- payload — 마이크로서비스에 전달하려는 메시지

마지막으로, login 및 signup을 위한 두 API 엔드포인트를 갖는 AuthController 클래스를 만들 것입니다:

<div class="content-ad"></div>

```js
// apps/api-gateway/src/auth/auth.controller.ts

import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto, User } from '@nestjs-microservices/shared';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user: User = await lastValueFrom(this.authService.getUser(createUserDto), {
      defaultValue: undefined,
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = user.password === createUserDto.password;
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }

    console.log(`User ${user.username} successfully logged in.`);

    return user;
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user: User = await lastValueFrom(this.authService.getUser(createUserDto), {
      defaultValue: undefined,
    });
    if (user) {
      throw new BadRequestException(
        `Username ${createUserDto.username} already exists!`
      );
    }

    return this.authService.createUser(createUserDto);
  }
}
```

앞서 언급했듯이, getUser 및 createUser 인증 클라이언트 메서드는 Obserable을 반환하므로 메시지가 전송되기 전에 명시적으로 구독해야 합니다. 그러나 rxjs에서 가져온 lastValueFrom 메서드를 사용하여 Observable을 Promise로 변환할 수 있습니다.

# 인증 마이크로서비스 생성

이제 다음 명령을 실행하여 첫 번째 인증 마이크로서비스를 생성할 것입니다:

<div class="content-ad"></div>

```js
nx g @nx/nest:app auth-microservice
```

안녕하세요! auth-microservice 앱의 main.ts 파일 내 bootstrap() 함수 보일러플레이트 코드를 NestFactory.createMicroservice() 메소드로 업데이트해보겠습니다:

```js
// apps/auth-microservice/src/main.ts

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    }
  );

  await app.listen();

  Logger.log('🚀 Auth microservice is listening');
}

bootstrap();
```

NestFactory 클래스의 createMicroservice() 메소드를 사용하여 마이크로서비스의 인스턴스를 생성할 수 있습니다. 아주 간단하죠! 만약 궁금한 점이 있거나 도움이 필요하시다면 언제든지 물어주세요! 😊✨


<div class="content-ad"></div>

그러면 사용자 엔티티를 공유 라이브러리에서 생성하여 UsersRepository 클래스에서 사용할 겁니다. 이를 통해 사용자 데이터를 저장하고 사용자를 검색하는 작업을 수행할 수 있습니다.

```js
// shared/src/lib/entities/user.entity.ts

export class User {
  id?: number;
  username: string;
  password: string;
}
```

우리는 어떤 데이터베이스도 사용하지 않으며 간결함을 위해 이 데모에서는 데이터를 메모리에 저장할 겁니다. UserRepository 클래스를 포함한 간단한 user.repository.ts 파일을 만들어보죠.

```js
// apps/auth-microservice/src/app/user.repository.ts

import { Injectable } from '@nestjs/common';

import { CreateUserDto, User } from '@nestjs-microservices/shared';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  save(user: CreateUserDto): User {
    const newUser = new User();
    newUser.id = this.users.length + 1;
    newUser.username = user.username;
    newUser.password = user.password;
    this.users.push(newUser);
    return newUser;
  }

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
```

<div class="content-ad"></div>

이제 createUser() 및 getUser()를 app.service.ts에서 UserRepository 메소드를 사용하여 사용자를 생성하고 찾는 메소드를 추가할 것입니다:

```js
// apps/auth-microservice/src/app/app.service.ts

import { Injectable } from '@nestjs/common';

import { CreateUserDto, User } from '@nestjs-microservices/shared';

import { UserRepository } from './user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(newUser: CreateUserDto): User {
    return this.userRepository.save(newUser);
  }

  getUser(username: string): User | undefined {
    return this.userRepository.findOne(username);
  }
}
```

마지막으로, @nestjs/microservices 패키지에서 가져온 @MessagePattern() 데코레이터를 사용하여 요청-응답 패러다임을 기반으로 한 메시지 핸들러 메소드를 생성합니다.

```js
// apps/auth-microservice/src/app/app.controller.ts

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_user') // get_user 메시지 패턴을 수신 대기
  handleGetUser(user: CreateUserDto) {
    return this.appService.getUser(user.username);
  }

  @MessagePattern('create_user') // create_user 메시지 패턴을 수신 대기
  handleCreateUser(newUser: CreateUserDto) {
    return this.appService.createUser(newUser);
  }
}
```

<div class="content-ad"></div>

위 코드에서 handleGetUser() 메시지 핸들러는 get_user 메시지 패턴과 일치하는 메시지를 수신합니다. 이 메시지 핸들러는 클라이언트로부터 전달된 CreateUserDto 유형의 사용자를 인자로 취합니다.

# 서비스 실행 및 테스트

모든 서비스를 테스트하려면 다음 명령어를 개별적으로 별도의 터미널에서 실행해야 합니다:

```js
nx serve api-gateway
nx serve auth-microservice
```

<div class="content-ad"></div>

앱을 테스트하려면 Postman이나 다른 API 클라이언트를 사용할 수 있어요.

## 잘못된 자격 증명으로 로그인

<img src="/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_2.png" />

## 가입

<div class="content-ad"></div>

<img src="/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_3.png" />

## 로그인

<img src="/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_4.png" />

## 동일한 사용자 이름으로 가입

<div class="content-ad"></div>

![이미지](/assets/img/2024-06-20-BuildingMicroserviceswithNestJSTCPandTypescript_5.png)

# 결론

코드를 모두 확인하려면 GitHub 링크를 클릭하세요.

읽어 주셔서 감사합니다 — 이 글이 도움이 되셨으면 좋겠습니다. 즐거운 코딩 되세요!

<div class="content-ad"></div>

# 자원