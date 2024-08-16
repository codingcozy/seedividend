---
title: "네스트JS에서 인증 구현하는 방법에 대한 상세 가이드"
description: ""
coverImage: "/assets/img/2024-05-14-ADetailedGuideonImplementingAuthenticationinNestJS_0.png"
date: 2024-05-14 14:21
ogImage: 
  url: /assets/img/2024-05-14-ADetailedGuideonImplementingAuthenticationinNestJS_0.png
tag: Tech
originalTitle: "A Detailed Guide on Implementing Authentication in NestJS"
link: "https://medium.com/@awaisshaikh94/a-detailed-guide-on-implementing-authentication-in-nestjs-4a347ce154b6"
isUpdated: true
---




이 포괄적인 안내서는 강력한 Node.js 프레임워크인 NestJS에서 인증 구현에 대한 단계별 안내를 제공합니다. 기본 개념, 최선의 실천법 및 실전 예제를 다루며, 이 안내서는 NestJS 애플리케이션을 위한 견고한 인증 시스템을 구축하기 위한 지식을 개발자들에게 제공하는 것을 목표로 합니다.

![이미지](/assets/img/2024-05-14-ADetailedGuideonImplementingAuthenticationinNestJS_0.png)

인증은 많은 애플리케이션의 기능성에서 중요한 구성 요소로 자리 잡고 있습니다. 인증 관리는 특정 프로젝트의 특정 요구 사항에 맞게 맞춘 각기 다른 접근 방식과 전략을 탐색하는 과정을 포함합니다. 이 섹션에서는 여러 인증 접근 방식을 개요하여 다양한 응용프로그램의 명백한 요구 사항을 충족시킬 수 있는 사용자 정의 옵션을 설명합니다.

특정 시나리오에서 클라이언트는 사용자 이름과 비밀번호로 인증하여 프로세스를 시작합니다. 성공적인 인증 후에 서버는 JWT(JSON Web Token)를 생성하고, 이를 인증 확인을 위한 후속 요청의 권한 부여 헤더로 전송할 수 있는 베어러 토큰으로 전송합니다. 더불어, 유효한 JWT가 포함된 요청에서만 접근 가능한 안전한 경로를 설정할 것입니다.



# 스텝 바이 스텝 가이드:

진행은 초기 요구 사항으로 시작됩니다: 사용자 인증. 그 다음으로는 JWT를 생성하고 발급함으로써 이를 확장합니다. 마지막으로는 수신 요청 내의 유효한 JWT의 존재를 확인하는 보호된 라우트를 구축합니다.

## 1. 종속성 설치

```js
npm install @nestjs/jwt passport-jwt @types/passport-jwt
```



## 2. 인증 및 사용자 모듈 생성하기

```js
nest g module auth
nest g controller auth
nest g service auth
```

AuthService를 구현할 때 유용하게 사용자 작업을 캡슐화하는 UsersService를 만드는 것이 좋습니다. 그러니 바로 해당 모듈과 서비스를 생성합시다:

```js
nest g module users
nest g service users
```



## 3. 사용자 DTO 구현

Data Transfer Object (DTO)는 응용 프로그램의 다른 부분 간에 네트워크를 통해 전송될 데이터를 정의하고 유효성 검사하는 데 사용되는 디자인 패턴입니다.

```js
// backend/src/dto/user/base-user.dto.ts
```

```js
import { ApiProperty } from '@nestjs/swagger';
export class BaseUser {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword?: string;
  @ApiProperty()
  designation?: string;
}
```



```js
// backend/src/dto/user/create-user.dto.ts
```

```js
import { BaseUser } from "./base-user.dto";
export class CreateUserDto extends BaseUser {
  createdAt: Date;
}
```

```js
// backend/src/dto/user/update-user.dto.ts
```

```js
import { BaseUser } from "./base-user.dto";
export class UpdateUserDto extends BaseUser {
  updatedAt: Date;
}
```



## 4. 사용자 엔티티 구현

엔티티란 TypeScript 클래스 또는 오브젝트를 가리키며 데이터베이스 테이블이나 문서의 모델을 나타냅니다. 엔티티는 TypeORM이나 Sequelize와 같은 ORM 라이브러리와 함께 사용되어 데이터베이스와 상호 작용합니다. 엔티티는 데이터 구조를 정의하며 주로 데이터베이스 테이블의 직접적인 표현입니다.

```js
// backend/src/entities/user.entity.ts
```

```js
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
```



**사용자 클래스**는 **@Entity 데코레이터**로 표시되어 엔티티를 나타낸다는 것을 나타냅니다. 클래스 속성 (id, username, email, password, confirmPassword, createdAt, updatedAt)은 @PrimaryGeneratedColumn 및 @Column과 같은 데코레이터로 주석이 달려 있어 데이터베이스 스키마에서의 역할을 지정합니다.

## 5. Auth Controller 구현

이 NestJS 컨트롤러, **AuthController**,는 인증 관련 HTTP 요청을 처리합니다. 라우트 처리를 위해 데코레이터를 활용하고, 설명서를 위해 Swagger를 통합하며, 타입 확인을 위해 DTO를 사용합니다. **@Public 데코레이터**는 특정 엔드포인트가 인증을 요구하지 않는 것을 나타내며, **AuthService**는 실제 인증 로직을 담당합니다.

```js
// backend/src/modules/auth/auth.controller.ts
```




## 6. 인증 모듈 구현

이 NestJS 모듈인 AuthModule은 컨트롤러, 서비스 및 가드를 포함한 인증 관련 컴포넌트를 캡슐화하고 조직화하기 위해 설계되었습니다. 전반적으로, AuthModule은 코드 조직화를 촉진하고 재사용성을 촉진하며 인증 관련 컴포넌트를 관리하는 중앙 모듈로 작용합니다. 가드, 서비스의 사용 및 JwtModule 및 TypeOrmModule과 같은 외부 모듈의 구성은 NestJS에서 모듈화되고 확장 가능한 애플리케이션 아키텍처에 가장 적합한 방법을 따릅니다.

```js
// backend/src/modules/auth/auth.module.ts
```



```js
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule {}
```

- JwtModule: JwtModule을 구성하고 가져와서 JSON Web Tokens (JWT)을 다루는 데 사용되며 비밀 및 만료 시간과 같은 지정된 옵션을 제공합니다.
- TypeOrmModule.forFeature([UserEntity]): TypeORM을 구성하여 모듈 내에서 UserEntity를 제공하도록 설정합니다.
- 'provide: APP_GUARD, useClass: AuthGuard': APP_GUARD 토큰을 사용하여 AuthGuard를 글로벌 가드로 등록합니다. 해당 가드는 JWT 토큰을 유효성 검사하고 사용자의 인증 상태를 보장하는 역할을 합니다.
- AuthService: 해당 모듈 내에서 제공자로 AuthService를 등록합니다. 해당 서비스는 사용자 인증을 위한 비즈니스 로직을 포함하고 있을 것입니다.

## 7. 인증 가드 구현:

NestJS의 AuthGuard 클래스는 애플리케이션 내의 루트를 보호하기 위한 사용자 정의 인증 가드를 구현하는 역할을 합니다. 이 AuthGuard는 미들웨어로 사용되어 인증이 필요한 루트를 보호합니다. 루트의 메타데이터를 확인하고 JWT 토큰을 유효성 검사함으로써, 애플리케이션의 특정 부분에만 인증된 사용자만 접근하도록 보장합니다. 또한, 사용자 페이로드는 편리하게 요청 객체에 첨부되어 라우트 핸들러에서 추가 처리를 위해 사용됩니다.



```js
// backend/src/modules/auth/auth.guard.ts
```

```js
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-strategy';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

## 8. Auth Service 구현

NestJS 애플리케이션에서 이 AuthService 클래스는 사용자 인증 및 가입 프로세스를 처리하는 역할을 담당합니다.





```js
// backend/src/modules/auth/auth.service.ts
```

```js
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/dto/user/create-user.dto";
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOneBy(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }
}
```

## 9. JWT 사용하여 비밀 키를 보관하는 상수 구현

JWT 기반 인증에서, 비밀 키는 토큰의 무결성과 신뢰성을 보장하기 위해 사용되는 중요한 정보입니다. 이는 토큰을 발급하는 서버와 토큰을 유효성을 검증하는 서버 또는 클라이언트 사이에서 공유되는 비밀 키로 작용합니다.



```js
// backend/src/modules/auth/constants.ts
```

```js
export const jwtConstants = {
  secret: "JWTSecret#@!",
};
```

## 10: Implement Public Strategy

이 전략은 AuthModule에서 위에서 AuthGuard를 사용하여 전역 인증을 활성화했기 때문에 인증이 필요하지 않음을 나타내는 루트 또는 핸들러를 표시하는 유틸리티를 정의합니다. route 또는 핸들러에 메타데이터를 첨부하기 위해 @nestjs/common 모듈에서 SetMetadata 함수를 사용합니다.



```js
// backend/src/modules/auth/public-strategy.ts
```

```js
import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

## 11. 사용자 모듈 구현

이 모듈인 UsersModule은 응용 프로그램 내에서 사용자 관리와 관련된 기능을 구성하고 제공하는 데 전념합니다.



```js
// backend/src/modules/users/users.module.ts
```

```js
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class UsersModule {}
```

- providers 배열: UsersService를 providers 배열에 포함합니다. 이는 UsersService가 모듈 전반에 걸쳐 injectable하게 만듭니다.

2. exports 배열: UsersService를 exports 배열에 추가합니다. 즉, UsersModule을 import하는 다른 모듈에서 UsersService를 사용할 수 있습니다.
  



3. `imports` 배열: Utilizes `TypeOrmModule.forFeature([UserEntity])`를 사용하여 UserEntity를 모듈에 import합니다. 이를 통해 UserEntity와 관련된 TypeORM 기능에 액세스할 수 있습니다.

## 12. 사용자 서비스 구현

UsersService는 사용자 관련 데이터와 상호 작용하는 데 책임이 있으며, 이메일로 사용자를 찾거나 새 사용자를 생성하는 메서드를 제공합니다. 이 서비스에서 `@InjectRepository(UserEntity)`를 사용하여 MongoRepository`UserEntity`를 서비스에 주입합니다. 이 저장소는 UserEntity와 관련이 있으며 데이터베이스 상호 작용을 위한 메서드를 제공합니다.

```js
// backend/src/modules/users/users.service.ts
```



```js
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseUser } from "src/dto/user/base-user.dto";
import { CreateUserDto } from "src/dto/user/create-user.dto";
import { UserEntity } from "src/entities/user.entity";
import { MongoRepository } from "typeorm";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
) { }
  async findOneBy(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
        ...createUserDto,
        createdAt: new Date(),
    });
  }
}
```

UsersService는 사용자 관련 작업에 대한 로직을 캡슐화하여 사용자 데이터와 상호 작용하는 깔끔하고 모듈식 방법을 제공합니다. 리포지토리 사용, 의존성 주입, 그리고 TypeORM과의 통합은 NestJS로 확장 가능하고 유지보수 가능한 애플리케이션을 구축하기 위한 모범 사례와 일치합니다.

## Swagger에 따라 모든 것이 잘 설정되었습니다 😜:

<img src="/assets/img/2024-05-14-ADetailedGuideonImplementingAuthenticationinNestJS_1.png" />




<img src="/assets/img/2024-05-14-ADetailedGuideonImplementingAuthenticationinNestJS_2.png" />

## 참고자료: