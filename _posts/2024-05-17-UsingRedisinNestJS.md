---
title: "Nest JS에서 Redis 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-UsingRedisinNestJS_0.png"
date: 2024-05-17 20:30
ogImage: 
  url: /assets/img/2024-05-17-UsingRedisinNestJS_0.png
tag: Tech
originalTitle: "Using Redis in NestJS"
link: "https://medium.com/@mut1aq/using-redis-in-nestjs-8ca1a009670f"
isUpdated: true
---




<img src="/assets/img/2024-05-17-UsingRedisinNestJS_0.png" />

# 소개

확장 가능하고 고성능 응용 프로그램을 구축하는 기술은 모든 개발자가 추구하는 기술입니다.

이 글에서는 Redis를 활용하여 응용 프로그램의 속도와 보안을 향상시키는 방법을 알아보겠습니다.

<div class="content-ad"></div>

NestJS와 함께 사용할 것입니다. 네스트는 Kamil Mysliwiec가 만든 간단하고 가벼운 프레임워크로, 강건함과 개발자 친화적인 아키텍처로 유명합니다.

응용 프로그램이 복잡성이 증가하고 데이터 처리량이 증가함에 따라, 효율적인 데이터 캐싱은 응답 시간을 향상시키고 데이터베이스에 가해지는 부하를 줄이는 데 필수적입니다. 여기에서 Redis가 등장합니다. Redis는 강력한 인메모리 데이터 구조 저장소로, NestJS에서 캐싱 솔루션으로 사용될 수 있습니다.

# NestJS와 Redis 설치

가정: -


<div class="content-ad"></div>

- NodeJS가 설치되어 있습니다.
- VS Code 또는 원하시는 편집기가 설치되어 있습니다.
- NestJS의 기본 지식

시작하려면 명령줄을 실행하고 선택한 폴더로 이동하세요 (해당 폴더에 코드를 작성할 것입니다). 그리고 다음 명령을 실행하세요.

```js
npm i -g @nestjs/cli 
nest new using-redis-in-nestjs #원하는 프로젝트 이름으로 "using-redis-in-nestjs"를 대체할 수 있습니다
```

해당 폴더로 이동하면 다음처럼 간단한 시작 코드가 있는 기본 NestJS 프로젝트가 표시됩니다…

<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-UsingRedisinNestJS_1.png" />

새로 만든 NestJS 프로젝트를 위해 프로젝트 시작

이 문서의 주요 관심사가 캐싱이므로 이 파일들이 무엇을 의미하고 하는지는 다루지 않고 캐싱과 Redis 사용에 초점을 맞출 것입니다.

첫 번째 할 일은 NestJS의 캐시 매니저와 패키지 cache-manager 자체를 설치하는 것입니다.

<div class="content-ad"></div>


```js
npm install @nestjs/cache-manager cache-manager
```

@nestjs/cache-manager은 원래 @nestjs/common 패키지의 일부였으며 NestJS 자체를 사용하여 캐시와 상호작용할 수 있게 해주는 패키지입니다. 캐시 패키지를 직접 사용하는 대신 NestJS의 통합 API를 사용하여 코드를 변경하지 않고도 더 편리하게 사용할 수 있습니다. 이는 우리가 나중에 캐시 공급업체를 변경하기로 결정해도 코드를 변경할 필요가 없기 때문에 우리에게 유리합니다.

이제 캐시 모듈을 설정하려면 "app.module.ts" 파일로 이동하여 @nestjs/cache-manager에서 캐시 모듈을 import하고 매개변수 없이 register 메서드를 사용하면 됩니다.

```js
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
```


<div class="content-ad"></div>

```js
@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

이 레지스트리를 통해 "app.service.ts" 파일에서 캐시 매니저를 사용하여 데이터를 저장하고 검색할 수 있게 되었습니다. 사용하려면 "app.service.ts"의 생성자에 주입해야 합니다.

```javascript
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! 이 import를 빠뜨리지 마세요
import { Inject, Injectable } from '@nestjs/common';
```

```javascript
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getHello(): string {
    return 'Hello World!';
  }
}
```

<div class="content-ad"></div>

캐시 모듈은 NestJS의 다른 모듈과 마찬가지로 작동합니다. 따라서 사용 중인 모듈에서 가져오거나 전역으로 사용할 수 있도록 설정해야 합니다.

```js
CacheModule.register({isGlobal: true})
```

이제 사용 방법을 알아보겠습니다. 시작하려면 세 가지 메서드만 알아야 합니다.

```js
await this.cacheManager.set('키', '값'); // 캐시에 데이터 설정
const value = await this.cacheManager.get<string>('키'); // 캐시에서 데이터 가져오기
await this.cacheManager.del('키'); // 캐시에서 데이터 삭제
```

<div class="content-ad"></div>

이 세 가지 메소드는 기본적으로 캐싱과 관련된 거의 모든 작업을 수행할 수 있도록 해줍니다. 이를 실제로 보기 위해 세 가지 메소드를 테스트할 수 있는 세 가지 라우트를 준비했는데요. 이를 따라오시면서 저의 GitHub을 방문하셔서 코드를 확인해보실 수 있어요.

아래는 컨트롤러에서의 라우트들입니다.

```js
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateDataDto } from 'dtos/create-data.dto';
import { AppService } from './app.service';
```

```js
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Post()
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Delete()
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
```

<div class="content-ad"></div>

그리고 이것이 서비스입니다.

```js
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! 이 임포트를 빠트리지 마세요
import { Inject, Injectable } from '@nestjs/common';
import { CreateDataDto } from 'dtos/create-data.dto';
```

```js
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getData(): Promise<string | undefined> {
    const value = await this.cacheManager.get<string>('key'); // ? 캐시에서 데이터를 가져옵니다
    return value;
  }
  async postData(createDataDto: CreateDataDto) {
    const { value } = createDataDto;
    await this.cacheManager.set('key', value); // ? 캐시에 데이터를 설정합니다
  }
  async deleteData() {
    await this.cacheManager.del('key'); // ? 캐시에서 데이터를 삭제합니다
  }
}
```

NestJS의 캐시 모듈을 사용하는 것은 매우 간단하고 쉬우며, 꽤 간단한 애플리케이션에서 필요한 모든 것일 수 있음을 확인할 수 있습니다. 물론, 여기에 그치지 않습니다.

<div class="content-ad"></div>

# Redis

네스트JS가 사용하는 기본 인메모리 스토어는 우리가 찾고 있는 체계적인 해결책이 아닐 수 있습니다. 스토어를 변경하려면 캐시 모듈 등록 방식을 변경해야 합니다.

먼저 네스트JS 캐시 매니저 옵션을 살펴봅시다.

```js
export interface CacheManagerOptions {
    store?: string | CacheStoreFactory | CacheStore;
    ttl?: number;
    max?: number;
    isCacheableValue?: (value: any) => boolean;
}
```

<div class="content-ad"></div>

옵션에 'store' 속성이 있는 것을 확인할 수 있습니다. 여기에는 Redis Store의 초기화가 필요합니다.

먼저 캐시 매니저 Redis Store를 설치해야 합니다.

```js
npm i --save cache-manager-redis-store
```

이제 레지스터 메서드를 변경해야 합니다. 코드를 깔끔하게 유지하기 위해 'configs'라는 폴더를 만들고 그 안에 'app-options.constants.ts'라는 파일을 생성하여 레지스터 메서드를 작성했습니다.

<div class="content-ad"></div>

```js
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
```

```js
export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT')!),
      },
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
```

그리고 앱 모듈에서 간단히 사용하세요.

```js
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from 'configs/app-options.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
```

<div class="content-ad"></div>

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

# 프로덕션 앱에서 Redis 활용하기

이제 이 모듈을 활용하기 시작해봅시다. 우리가 프로덕션 앱에서 이 모듈을 어떻게 사용해야 하는지 살펴봅시다.

- 응답 캐싱 (속도)
- JWT 토큰 유효성 검사 (보안)
- 채팅을 위한 소켓 ID 저장 (속도)

<div class="content-ad"></div>

그럼 하나씩 깊이 파고들어 봅시다.

# 1. 응답 캐싱

응답 캐싱은 API에 터보 부스트를 제공하는 것과 같습니다. 특정 위치(엔드포인트)에서 무언가를 요청하는 첫 번째 시간에, 우리는 받은 것을 캐시에 저장합니다. 그러니까, 짧은 시간 내에 같은 것을 다시 요청하면, 우리는 메인 저장소(데이터베이스)로 돌아가는 대신 저장된 버전을 그대로 전달합니다.

NestJS로 이를 실현하려면, GET 요청에서 반환된 데이터를 추적하고 저장할 Interceptor를 사용해야 합니다.

<div class="content-ad"></div>

물론 NestJS에서 인터셉터를 사용하는 것은 매우 간단합니다. 원하는 컨트롤러에 내장 인터셉터를 바인딩하기만 하면 됩니다.

```js
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { Body, UseInterceptors } from '@nestjs/common/decorators';
import { CreateDataDto } from 'dtos/create-data.dto';
import { AppService } from './app.service';
```

```js
@Controller()
@UseInterceptors(CacheInterceptor) // 여기에 추가하세요
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Post()
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Delete()
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
```

이렇게 캐싱 인터셉터를 추가하면 기본 TTL에 따라 모든 GET 라우트 핸들러 응답이 캐시됩니다. 물론 이는 register 메서드에서 수정할 수 있습니다.

<div class="content-ad"></div>

```js
{
  ttl: 5, // 초
  max: 10, // 캐시에 저장될 최대 항목 수
}
```

우리 앱 전체의 모든 GET 요청을 캐시하려면 앱 모듈에서 전역으로 바인딩해야 합니다.

```js
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisOptions } from 'configs/app-options.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 인터셉터를 전역으로 바인딩
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
```

<div class="content-ad"></div>

캐시의 지속 시간이나 라우트에 저장된 키를 사용자 정의하는 경우 NestJS의 데코레이터를 사용할 수 있습니다.

- 기본 킷 값은 엔드포인트의 이름이며, 이를 변경하면 쿼리 매개변수와 함께 요청에 영향을 주므로 코드가 손상되지 않도록 주의하는 것이 중요합니다.

```js
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { Body, UseInterceptors } from '@nestjs/common/decorators';
import { CreateDataDto } from 'dtos/create-data.dto';
import { AppService } from './app.service';
```

```js
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @CacheKey('custom_key') // 키 제어
  @CacheTTL(20) // 지속시간 제어
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Post()
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Delete()
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
```

<div class="content-ad"></div>

# 2. JWT 토큰 유효성 검사

이 섹션을 읽기 전에 사용자 인증하는 방법을 알고 있는 것이 명백하게 선행되어야 합니다.

현재 JWT 기반 인증을 사용하는 사람들의 주요 문제점은 JWT가 쉽게 가져가지고, 디코딩하며, 복사할 수 있다는 것을 잊는다는 것이며, 모든 사람이 민감한 데이터를 내부에 저장한다는 문제점도 있습니다.

이외에도, 대다수의 자습서들은 사용자가 로그인할 때 JWT가 특정 기간 동안 생성되지만 해당 사용자가 로그아웃했을 때에도 일정 기간이 지나지 않았더라도 토큰을 폐기해야 하는 것에 대해 언급하지 않는 것 같습니다.

<div class="content-ad"></div>

그럼 이 경우에는 무엇을 해야 할까요? Redis를 세션 관리자로 사용할 수 있어요!

사용자의 ID를 키로 저장하고 값으로 JavaScript 오브젝트를 만들면, 그 안에 "accessToken": "..."를 저장할 수 있어요!

이게 무슨 말인지 알려 드릴게요.

```js
{
  "64c900a9d01c8c1a4351040c": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIndoeSBhcmUgeW91IjoibG9va2luZyBoZXJlPyJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.l_2-T20JUdnz5rrOORgH6zfI6nrEzmIHMH5JlU76IIE"
  }
}
```

<div class="content-ad"></div>

물론 "HEST" 명령어를 사용하여 순수 Redis로 구현할 수도 있고, Redis 명령어를 NestJS 캐시 매니저를 사용하여 추상화하여 통일된 API 아이디어를 유지할 수도 있어요.

아래의 코드를 원하는 곳에 자유롭게 넣어보세요. 단, 캐시 모듈과 함께 연결되어 있는지 확인해주세요.

```js
async hset(key: string, field: string, value: string) {
    const stringObject = await this.cache.get<string>(key);
    const object = checkNullability(stringObject)
      ? JSON.parse(stringObject!)
      : {};
    object[field] = value;
```

```js
    await this.cache.set(key, JSON.stringify(object));
  }
```

<div class="content-ad"></div>

만약 순수한 Redis를 사용하고 싶다면, underline client를 가져와서 'HSET' 메서드를 호출할 수 있어요.

```js
private readonly redisStore!: RedisStore;
constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    this.redisStore = cache.store as unknown as RedisStore;
}
```

그리고 함수 내부에서 client를 호출하고 'HSET' 명령을 실행할 수 있어요.

```js
const client = this.redisStore.getClient();
await client.HSET('KEY', 'FIELD', 'VALUE')
```

<div class="content-ad"></div>

이제 서버 캐시에 액세스 토큰을 저장할 수 있으므로 사용자 로그아웃시 이를 제거하고 이 아이디어를 기반으로 논리를 구축할 수 있습니다.

# 3. 채팅을 위한 소켓 ID 저장

이전에 채팅 애플리케이션을 구축한 사람은 두 사람 간의 채팅을 위한 소켓 ID를 어디에 저장해야 할지에 대한 질문에 직면했습니다. 인터넷에서 본 바로는 대부분의 사람들이 이 정보를 DB에 저장하거나 인메모리 변수 내에 저장하는 것으로 보여집니다. 둘 다 실행 가능한 방법이지만 최적은 아닙니다.

일반적인 DB에 저장하는 것의 문제점은 당연히 속도 입니다. 우리는 이전에 얼마나 느릴 수 있는지에 대해 논의했던 것을 기억할 겁니다.

<div class="content-ad"></div>

그 반면, 메모리 변수에 저장하는 것은 많은 사용자 수에 대응할 수 없는 해결책입니다.

이제 두 가지 옵션이 남았습니다. 소켓.io 내장 기능을 활용하거나 이전 섹션에서 논의한 캐시된 사용자 객체에 저장하는 방법입니다.

```js
{
  "64c900a9d01c8c1a4351040c": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIndoeSBhcmUgeW91IjoibG9va2luZyBoZXJlPyJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.l_2-T20JUdnz5rrOORgH6zfI6nrEzmIHMH5JlU76IIE",
    "socketID": "소켓 ID"
  }
}
```

이제 상담 중인 상대방으로부터 소켓 ID를 받아와 두 당사자 간 쉽게 메시지를 전송할 수 있게 됩니다.

<div class="content-ad"></div>

- 이 글이 제 첫 글이니, 내가 실수를 한 경우 언제든지 연락주세요

# 결론

Redis를 NestJS 애플리케이션에 사용하면 성능을 향상시키고 보안을 강화하며 실시간 기능을 활성화하는 다면적인 접근 방법을 제공합니다.
Redis를 캐싱 솔루션으로 원활하게 통합하여 응답 시간을 크게 개선하고 데이터베이스 부하를 줄이면서 전반적인 사용자 경험을 향상시킬 수 있습니다.
또한 Redis는 JWT 토큰 유효성 검사를 위한 신뢰할 수 있는 세션 관리자로 작용하며, 실시간 애플리케이션의 소켓 연결을 관리하는 전략적 방법을 제공하여 애플리케이션 보안을 보장하는 데 귀중한 역할을 합니다.
본 문서를 통해 개발자들은 Redis의 전체 잠재력을 깨달을 수 있어서, NestJS 프로젝트를 확장 가능성, 효율성 및 견고성을 향상시키는 데 도움이 될 것입니다.

🚀 전문 풀스택 개발자로 프로젝트를 강화하세요 🚀

<div class="content-ad"></div>

안녕하세요! 저는 요르단 암만을 기반으로 활동하는 숙련된 시니어 풀스택 웹 개발자, 무틀락 알사따입니다.
원활한 디지털 경험을 만들어내는 데 열정을 가지고 문제 해결에 능숙한 저는 아이디어를 기능적이고 매력적인 웹 솔루션으로 변환하는 데 전문화되어 있습니다.

👨‍💻 기술 전문성: 전체 웹 개발 스펙트럼에 걸쳐 전문 지식을 확보하고 있습니다. Angular와 같은 프런트엔드 기술부터 NestJS와 같은 백엔드 프레임워크까지 다룹니다.
기능과 디자인을 완벽하게 조화시키는 응용 프로그램 설계에서 힘을 발휘합니다.

🔗 엔드 투 엔드 솔루션: 사용자 중심 인터페이스 구축, 백엔드 성능 최적화, 서드파티 서비스 통합 등 다양한 프로젝트 요구 사항을 충족하는 종합적인 솔루션을 만드는 데 능숙합니다.

💡 혁신적인 문제 해결자: 복잡한 도전에 직면하는 것을 즐깁니다.
캐싱 전략을 통한 성능 최적화 경험 및 안전한 사용자 인증 솔루션 구현을 통해 혁신에 대한 저의 헌신을 확인할 수 있습니다.

<div class="content-ad"></div>

🛠️ 맞춤형 개발: 모든 프로젝트는 같지 않습니다. 저는 각 클라이언트의 고유한 요구 사항에 맞게 접근 방식을 맞춤화하는 데 자부심을 갖고 있습니다. 전자 상거래 플랫폼부터 동적 웹 앱까지, 영향을 주는 맞춤 솔루션을 전달하는 데 헌신하고 있습니다.

🌐 글로벌 시각: 글로벌 기술 분야의 통찰력을 활용하여 다양한 시각을 제공합니다. 협동적인 성향과 다양한 산업 트렌드에 적응하는 능력을 바탕으로 프로젝트가 최첨단 기술을 유지하도록 보장합니다.

🌱 지속적인 학습: 끊임없이 변화하는 기술 세계에서 앞서 나가는 것이 저에게 중요합니다. 새로운 도구, 프레임워크 및 모베스트 프랙티스를 지속적으로 탐색하여 제공하는 솔루션이 기술의 선두에 있도록 합니다.

📊 결과 중심: 제 관심사는 코드 작성뿐만 아니라 측정 가능한 결과를 제공하는 데 있습니다. 사용자 참여도 개선, 사이트 속도 향상 또는 전환율 최적화 등 명확한 결과를 달성하기 위해 헌신하고 있습니다.

<div class="content-ad"></div>

🤝 고객 중심 접근: 효과적인 커뮤니케이션과 이해는 제 프리랜스 실무의 핵심입니다. 저는 고객과 긴밀히 협력하여 그들의 비전이 기능적 현실로 옮겨지고 기대를 뛰어넘는 결과물이 되도록 합니다.

🌟 함께 협업해요: 디지털 포부를 실현해 줄 전문 풀스택 개발자를 찾고 계시다면, 여러분의 프로젝트에 참여할 수 있는 기회를 소개해드릴게요. MutlaqAlsadeed@gmail.com 으로 연락 주시거나, 어떻게 제가 여러분의 성공에 기여할 수 있는지 알아보세요.

LinkedIn에서 저와 연결하세요: Mutlaq Alsadeed
GitHub에서 제작물을 탐험하세요: Mut1aq