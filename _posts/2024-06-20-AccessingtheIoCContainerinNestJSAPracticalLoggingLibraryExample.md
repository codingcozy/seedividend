---
title: "NestJS에서 IoC 컨테이너에 접근하기 실용적인 로깅 라이브러리 예제"
description: ""
coverImage: "/assets/img/2024-06-20-AccessingtheIoCContainerinNestJSAPracticalLoggingLibraryExample_0.png"
date: 2024-06-20 04:34
ogImage: 
  url: /assets/img/2024-06-20-AccessingtheIoCContainerinNestJSAPracticalLoggingLibraryExample_0.png
tag: Tech
originalTitle: "Accessing the IoC Container in NestJS: A Practical Logging Library Example"
link: "https://medium.com/@Abdelrahman_Rezk/accessing-the-ioc-container-in-nestjs-a-practical-logging-library-example-7b34a22fe72d"
isUpdated: true
---




![2024-06-20-AccessingtheIoCContainerinNestJSAPracticalLoggingLibraryExample_0.png](/assets/img/2024-06-20-AccessingtheIoCContainerinNestJSAPracticalLoggingLibraryExample_0.png)

안녕하세요! 이 세부적인 자습서에서는 NestJS 프로젝트를 만들고 특정 메타데이터가 지정된 모든 프로바이더 및 컨트롤러의 메서드 호출을 동적으로 탐지하고 기록하는 로깅 라이브러리를 구축할 것입니다. 이 예제는 IoC(Inversion of Control) 컨테이너에 액세스하고 등록된 프로바이더 및 컨트롤러를 조사하며 사용자 정의 데코레이터를 사용하여 동적 동작을 적용하는 방법을 이해하는 데 도움이 될 것입니다.

# IoC 컨테이너란?

NestJS의 IoC 컨테이너는 애플리케이션 구성 요소의 생성, 설정 및 라이프사이클을 관리하여 의존성 주입을 가능하게 합니다. 이는 컨테이너가 필요한 클래스에 자동으로 의존성을 제공하는 의존성 주입을 허용합니다.

<div class="content-ad"></div>

# IoC 컨테이너에 접근하는 이유

IoC 컨테이너에 접근하는 것은 다음과 같은 이유로 매우 중요합니다:

- 살펴보기: 등록된 제공자(Providers) 및 컨트롤러(Controllers)를 모두 검사하기 위해.
- 동적 동작: 로깅, 모니터링 또는 메타데이터를 기반으로 동작을 수정하는 등 동적 동작을 적용하기 위해.
- 일반 라이브러리: 다양한 응용프로그램 구성 요소와 동적으로 상호작용해야 하는 라이브러리를 구축하기 위해.

# 단계별 안내

<div class="content-ad"></div>

NestJS 프로젝트를 만들고 동적 로깅 라이브러리를 빌드하는 단계를 함께 진행해 보겠습니다.

## 단계 1: NestJS 프로젝트 설정하기

- NestJS CLI를 설치합니다:

```js
npm install -g @nestjs/cli
```

<div class="content-ad"></div>

2. 새로운 NestJS 프로젝트 만들기:

```js
nest new logging-library
cd logging-library
```

3. 필수 종속성 설치:

```js
npm install @nestjs/core @nestjs/common @nestjs-plus/discovery
```

<div class="content-ad"></div>

## 단계 2: LoggerService 생성하기

NestJS 라이프사이클 훅을 사용하여 메서드 호출 로깅을 동적으로 설정하고 지우는 LoggerService를 생성합니다.

- LoggerService 생성하기:

```js
nest generate service logger
```

<div class="content-ad"></div>

2. LoggerService를 구현하세요:

```js
// src/logger/logger.service.ts
import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { DiscoveryService, Reflector, MetadataScanner } from '@nestjs/core';

@Injectable()
export class LoggerService implements OnApplicationBootstrap, OnApplicationShutdown {
  // 원본 메소드를 저장하고 종료 시 복원하기 위한 Map
  private readonly originals: Map<any, any> = new Map();

  constructor(
    // DiscoveryService는 모든 프로바이더와 컨트롤러를 찾기 위해 사용됩니다.
    private readonly discoveryService: DiscoveryService,
    // Reflector는 클래스와 메소드에서 메타데이터를 읽기 위해 사용됩니다.
    private readonly reflector: Reflector,
    // MetadataScanner는 클래스 프로토타입을 메소드 이름으로 스캔하기 위해 사용됩니다.
    private readonly metadataScanner: MetadataScanner
  ) {}

  // 모든 모듈이 초기화된 후에 실행되는 라이프사이클 훅
  onApplicationBootstrap() {
    // 애플리케이션에서 모든 프로바이더(컨트롤러 포함)를 가져옵니다.
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      // 프로바이더의 인스턴스(실제 객체) 가져오기
      const { instance } = wrapper;
      // 프로바이더의 프로토타입(모든 인스턴스에서 공유되는 메소드와 속성) 가져오기
      const prototype = instance && Object.getPrototypeOf(instance);
      // 인스턴스나 프로토타입이 없는 경우 건너뜁니다.
      if (!instance || !prototype) {
        return;
      }
      // 클래스가 @Loggable로 표시되어 있는지 확인합니다.
      const isLoggable = this.reflector.get('LOGGABLE_KEY', instance.constructor) ?? false;
      if (!isLoggable) {
        return;
      }
      // 클래스 프로토타입에서 모든 메소드 이름 가져오기
      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);
      methodKeys.forEach((methodKey) => {
        // 이름으로 메소드 가져오기
        const method = instance[methodKey];
        // 함수(메소드)인지 확인합니다.
        if (typeof method === 'function') {
          // 원본 메소드 저장
          this.originals.set(method, method.bind(instance));
          // 원본 메소드를 로깅 래퍼로 대체합니다.
          instance[methodKey] = (...args: any[]) => {
            console.log(`Calling ${methodKey} with args:`, args);
            return this.originals.get(method)(...args);
          };
        }
      });
    });
  }

  // 애플리케이션이 종료되기 전에 실행되는 라이프사이클 훅
  onApplicationShutdown(signal?: string) {
    // 모든 원본 메소드를 복원합니다.
    this.originals.forEach((original, method) => {
      method = original;
    });
    // 원본 메소드 Map을 비웁니다.
    this.originals.clear();
  }
}
```

- Instance: IoC 컨테이너에서 생성된 실제 객체입니다. 이는 응용프로그램에서 상호작용하는 실시간 객체입니다.
- Prototype: 객체의 청사진입니다. 클래스의 모든 인스턴스간에 공유되는 메소드와 속성이 포함되어 있습니다. 프로토타입을 사용하면 클래스 메소드의 동적 조회 및 수정이 가능합니다.

# 로깅 메소드의 상세 설명

<div class="content-ad"></div>

코드의 일부를 더 깊이 파헤쳐 보겠습니다. 여기서는 로깅 기능을 가진 메소드를 동적으로 래핑하는 부분에 집중해 봅시다:

```js
methodKeys.forEach((methodKey) => {
  // 메소드 이름으로 메소드를 가져옵니다
  const method = instance[methodKey];
  // 속성이 함수(메소드)인지 확인합니다
  if (typeof method === 'function') {
    // 원본 메소드를 저장합니다
    this.originals.set(method, method.bind(instance));
    // 원본 메소드를 로깅 래퍼로 교체합니다
    instance[methodKey] = (...args: any[]) => {
      console.log(`${methodKey}를 인수와 함께 호출 중:`, args);
      return this.originals.get(method)(...args);
    };
  }
});
```

## 단계별 설명

<div class="content-ad"></div>

```js
methodKeys.forEach((methodKey) => {
```

- methodKeys: 프로바이더의 프로토타입에 있는 모든 메서드 이름의 배열입니다.

2. 이름으로 메서드 가져오기:

```js
const method = instance[methodKey];
```

<div class="content-ad"></div>

- instance[methodKey]: 이름(key)으로 인스턴스의 메서드에 액세스합니다.
- method: 실제 메서드 함수에 대한 참조를 보유합니다.

3. 속성이 함수인지 확인합니다:

```js
if (typeof method === 'function') {
```

- 속성이 실제로 함수이고 다른 유형의 속성(예: 변수)이 아님을 보장합니다.

<div class="content-ad"></div>

4. 원본 메소드 저장:

```js
this.originals.set(method, method.bind(instance));
```

- this.originals: 원본 메소드 참조를 저장하는 Map 객체입니다.
- set(method, method.bind(instance)): 해당 메소드를 인스턴스에 바인딩하여 저장하여 메소드가 호출될 때 올바른 컨텍스트(this)를 유지합니다.

5. 원본 메소드를 로깅 래퍼로 대체하기:

<div class="content-ad"></div>

```js
instance[methodKey] = (...args: any[]) => {
  console.log(`Calling ${methodKey} with args:`, args);
  return this.originals.get(method)(...args);
};
```

- instance[methodKey]: 기존 메소드를 새 함수로 대체합니다.
- (...args: any[]): '...'는 새 함수를 나타내며:
- 메소드 호출과 인수를 기록합니다.
- this.originals에 저장된 참조를 사용하여 원본 메소드를 호출합니다.

# 실제 예시

createUser 및 deleteUser 메소드를 갖는 UserService 클래스가 있다고 가정해보겠습니다:

<div class="content-ad"></div>

```js
@Loggable
@Injectable()
export class UserService {
  createUser(name: string) {
    console.log(`User ${name} created.`);
  }

  deleteUser(id: number) {
    console.log(`User with id ${id} deleted.`);
  }
}
```

LoggerService가 초기화될 때 다음을 합니다:

- UserService 제공자를 탐색합니다.
- UserService에 @Loggable이 표시되어 있는지 확인합니다.
- UserService의 각 메서드(예: createUser 및 deleteUser)에 대해
- 원본 메서드를 저장합니다.
- 원본 메서드를 호출하기 전에 호출과 매개변수를 기록하는 새 함수로 메서드를 대체합니다

## 단계 3: 사용자 정의 데코레이터 정의하기


<div class="content-ad"></div>

클래스 및 메서드에 로깅을 위한 표시를 지정하기 위해 @Loggable 데코레이터를 정의합니다.

데코레이터를 생성하세요:

```js
// src/logger/loggable.decorator.ts
import { SetMetadata } from '@nestjs/common';

// loggable 메타데이터를 위한 키
export const LOGGABLE_KEY = 'LOGGABLE_KEY';
// 로깅을 위해 클래스를 표시하는 Loggable 데코레이터
export const Loggable: ClassDecorator = SetMetadata(LOGGABLE_KEY, true);
```

## 스텝 4: 사용자 지정 데코레이터 사용하기

<div class="content-ad"></div>

@Service 클래스에서 @Loggable 데코레이터를 사용하여 로깅해야 하는 메서드를 생성하세요.

- 서비스 생성:

```js
nest generate service user
```

2. UserService를 구현하세요.

<div class="content-ad"></div>

```js
// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { Loggable } from '../logger/loggable.decorator';

// UserService 클래스를 로깅하기 위해 표시합니다
@Loggable
@Injectable()
export class UserService {
  // 사용자 생성 메서드
  createUser(name: string) {
    console.log(`사용자 ${name}이(가) 생성되었습니다.`);
  }

  // 사용자 삭제 메서드
  deleteUser(id: number) {
    console.log(`ID가 ${id}인 사용자가 삭제되었습니다.`);
  }
}
```

3. 로깅을 테스트하기 위해 UserController를 생성합니다:

```bash
nest generate controller user
```

4. UserController를 구현합니다:

<div class="content-ad"></div>

```js
// src/user/user.controller.ts
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body('name') name: string) {
    return this.userService.createUser(name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
```

5. Step 5: AppModule에서 LoggerService 통합

LoggerService와 UserController가 응용 프로그램 모듈에 포함되어 있는지 확인하십시오.

AppModule 업데이트:

<div class="content-ad"></div>

```js
// src/app.module.ts
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [DiscoveryModule],
  providers: [LoggerService, UserService],
  controllers: [UserController],
})
export class AppModule {
  // Inject LoggerService to initialize it on application start
  constructor(private readonly loggerService: LoggerService) {}
}
```

## 단계 6: 로깅 테스트

curl을 사용하여 엔드포인트를 테스트하고 로깅 기능을 확인할 수 있습니다.

- 유저 생성:

<div class="content-ad"></div>

```bash
# 사용자 추가:
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe"}'
```

2. 사용자 삭제:

```bash
curl -X DELETE http://localhost:3000/users/1
```

# 결과

<div class="content-ad"></div>

```js
createUser을 다음과 같은 args와 함께 호출했습니다: ['John Doe']
사용자 John Doe가 생성되었습니다.
deleteUser을 다음과 같은 args와 함께 호출했습니다: ['1']
id가 1인 사용자가 삭제되었습니다.
```

# 요약

이 지침을 따라 NestJS 프로젝트를 생성하고, 특정 메타데이터로 표시된 모든 프로바이더 및 컨트롤러에 대한 메서드 호출을 동적으로 기록하는 로깅 라이브러리를 구축했습니다. 이 튜토리얼은 NestJS의 IoC 컨테이너에 액세스하여 등록된 프로바이더 및 컨트롤러를 검사하고 동적 동작을 적용하는 방법을 보여주었습니다.

사용자 지정 데코레이터와 메타데이터 반사를 활용하여 메서드 호출을 기록하는 유연한 시스템을 구축하여, NestJS의 강력한 IoC 컨테이너를 활용하여 고급 사용 사례에 대처하는 방법을 시연했습니다. 이 접근 방식은 NestJS 애플리케이션의 다른 부분과 동적으로 상호작용해야 하는 다양한 제네릭 및 통합 라이브러리를 구축하기 위해 확장할 수 있습니다.
