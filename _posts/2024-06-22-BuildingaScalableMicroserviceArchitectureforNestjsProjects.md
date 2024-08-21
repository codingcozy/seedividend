---
title: "확장 가능한 Nestjs 프로젝트를 위한 마이크로서비스 아키텍처 구축 방법"
description: ""
coverImage: "/assets/img/2024-06-22-BuildingaScalableMicroserviceArchitectureforNestjsProjects_0.png"
date: 2024-06-22 14:00
ogImage:
  url: /assets/img/2024-06-22-BuildingaScalableMicroserviceArchitectureforNestjsProjects_0.png
tag: Tech
originalTitle: "Building a Scalable Microservice Architecture for Nest.js Projects"
link: "https://medium.com/widle-studio/mastering-microservices-in-nest-js-eb143a6b9639"
isUpdated: true
---

요즘에는 마이크로서비스 아키텍처가 확장 가능하고 유지보수가 용이하며 유연한 애플리케이션을 개발할 수 있는 능력 때문에 상당한 인기를 얻고 있습니다. Nest.js는 점진적인 Node.js 프레임워크로, 마이크로서비스를 구축하기에 적합합니다. 본 문서에서는 Nest.js 프로젝트를 위한 마이크로서비스 아키텍처를 설계하고 구현하는 방법을 살펴볼 것입니다. 마이크로서비스를 구축하는 데 필요한 주요 개념, 장점 및 최선의 방법, 그리고 구현을 설명하는 실용적인 코드 예제를 포함하고 있습니다.

![마이크로서비스 아키텍처 구축](/assets/img/2024-06-22-BuildingaScalableMicroserviceArchitectureforNestjsProjects_0.png)

## 목차

- 마이크로서비스 소개
- 마이크로서비스 아키텍처의 장점
- Nest.js 프레임워크 이해
- 마이크로서비스 아키텍처 설계
  - 서비스 검색 및 레지스트리
  - 부하 분산과 게이트웨이
  - 데이터 저장 및 지속성
  - 마이크로서비스 간 통신
  - 오류 처리와 회복
- Nest.js로 마이크로서비스 구현
- Docker를 사용한 마이크로서비스 구축
- 클라우드에 마이크로서비스 배포
- 마이크로서비스 모니터링 및 확장
- 마이크로서비스 테스트 및 디버깅
- 마이크로서비스 개발을 위한 최선의 방법
- 결론

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

# 1. 마이크로서비스 소개

마이크로서비스는 응용 프로그램을 작은, 독립적이며 느슨하게 결합된 서비스 집합으로 나누는 아키텍처 스타일입니다. 각 마이크로서비스는 특정 업무 기능을 수행하며 다른 서비스와 API를 통해 통신합니다. 이 모듈식 접근법을 통해 팀은 각 서비스를 개발, 배포 및 확장할 수 있어 더 큰 유연성과 더 빠른 개발 주기를 제공합니다.

# 2. 마이크로서비스 아키텍처의 장점

마이크로서비스 아키텍처는 다음과 같은 여러 가지 장점을 제공합니다:

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

- 확장성: 각 마이크로서비스는 독립적으로 확장 가능하여 고효율로 대량 처리를 처리할 수 있습니다.
- 유지보수성: 서비스들은 전체 애플리케이션에 영향을 주지 않고 독립적으로 유지보수 및 업데이트할 수 있습니다.
- 유연성: 팀은 각 서비스의 요구 사항에 따라 다른 기술을 선택할 수 있습니다.
- 오류 격리: 한 서비스가 실패해도 전체 시스템에 영향을 미치지 않아 높은 가용성을 보장합니다.
- 빠른 개발: 작고 집중된 팀은 특정 서비스에 독립적으로 작업하여 개발 속도를 높일 수 있습니다.
- 지속적인 배포: 서비스는 다른 구성 요소에 영향을 미치지 않고 개별적으로 배포할 수 있습니다.

# 3. Nest.js 프레임워크 이해

Nest.js는 효율적이고 확장 가능하며 유지보수가 용이한 서버 측 애플리케이션을 구축하기 위해 설계된 강력한 Node.js 프레임워크입니다. API 생성, 의존성 주입 및 모듈화 아키텍처를 작성하는 데 내장 지원을 제공합니다. Nest.js는 Express.js 위에 구축되었으며 TypeScript를 활용하여 강한 타입 지정 및 향상된 생산성을 가능하게 합니다.

# 4. 마이크로서비스 아키텍처 설계

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

코드 구현에 들어가기 전에, Nest.js 프로젝트를 위한 마이크로서비스 아키텍처를 설계해 봅시다.

## 서비스 검색 및 레지스트리

마이크로서비스 아키텍처에서는 서비스들이 서로를 발견하고 통신해야 합니다. Consul이나 Eureka와 같은 서비스 레지스트리를 사용하여 마이크로서비스를 등록하고 찾을 수 있습니다.

## 부하 분산 및 게이트웨이

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

여러 인스턴스의 서비스 간에 오는 요청을 균등하게 분산시키기 위해 로드 밸런서가 필요합니다. 게이트웨이는 클라이언트의 입구 역할을 하고 요청을 적절한 마이크로서비스로 라우팅합니다.

## 데이터 저장 및 지속성

각 마이크로서비스는 독립적인 데이터 관리를 유지하기 위해 자체 데이터베이스나 데이터 저장소를 가져야 합니다.

## 마이크로서비스 간 통신

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

마이크로서비스는 RabbitMQ나 Kafka와 같은 RESTful API 또는 메시지 큐를 통해 통신합니다.

## 오류 처리와 내구성

시스템이 실패에서 우아하게 복구할 수 있도록 견고한 오류 처리 및 내구성 패턴을 구현하세요.

# 5. Nest.js로 마이크로서비스 구현하기

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

자, 이제 우리의 디자인을 실행하여 Nest.js를 사용하여 마이크로서비스를 구현해 봅시다.

단계 1: 새로운 Nest.js 프로젝트 생성
시작하려면 Nest.js CLI를 설치하고 새 프로젝트를 만듭니다:

```js
npm install -g @nestjs/cli
nest new microservices-project
cd microservices-project
```

단계 2: 종속성 설치
다음으로, 마이크로서비스를 위해 필요한 종속성을 설치하세요:

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

npm install @nestjs/microservices @nestjs/typeorm typeorm mysql

Step 3: Create Microservice Modules
각각의 마이크로서비스를 위한 별도의 모듈을 만듭니다:

```js
// app.module.ts (Gateway)
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "SERVICE_A",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3001,
        },
      },
      {
        name: "SERVICE_B",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```js
// service-a.module.ts
import { Module } from "@nestjs/common";
import { ServiceAController } from "./service-a.controller";
import { ServiceAService } from "./service-a.service";

@Module({
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {}
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

```typescript
// service-b.module.ts
import { Module } from "@nestjs/common";
import { ServiceBController } from "./service-b.controller";
import { ServiceBService } from "./service-b.service";

@Module({
  controllers: [ServiceBController],
  providers: [ServiceBService],
})
export class ServiceBModule {}
```

Step 4: 각 Microservice를 위한 Controllers 및 Services 구현
각 Microservice에 대한 controllers 및 services를 생성하십시오:

```typescript
// app.controller.ts (Gateway)
import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("SERVICE_A") private readonly clientA: ClientProxy,
    @Inject("SERVICE_B") private readonly clientB: ClientProxy
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const resultA = await this.clientA.send("getHello", "").toPromise();
    const resultB = await this.clientB.send("getHello", "").toPromise();
    return this.appService.getHello(resultA, resultB);
  }
}
```

```typescript
// service-a.controller.ts
import { Controller, Get } from "@nestjs/common";
import { ServiceAService } from "./service-a.service";

@Controller()
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get()
  getHello(): string {
    return this.serviceAService.getHello();
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

```js
// service-b.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ServiceBService } from './service-b.service';

@Controller()
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get()
  getHello(): string {
    return this.serviceBService.getHello();
  }
}
```

Step 5: 서비스 로직 구현
각 마이크로서비스에 대한 비즈니스 로직을 추가하십시오:

```js
// app.service.ts (게이트웨이)
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(serviceA: string, serviceB: string): string {
    return `서비스 A가 말합니다: ${serviceA}, 서비스 B가 말합니다: ${serviceB}`;
  }
}
```

```js
// service-a.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServiceAService {
  getHello(): string {
    return "서비스 A에서 안녕하세요";
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

```js
// service-b.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServiceBService {
  getHello(): string {
    return "Hello from Service B";
  }
}
```

# 결론

축하합니다! Nest.js 프로젝트를 위한 마이크로서비스 아키텍처를 성공적으로 구축했습니다. 마이크로서비스는 확장성, 유지보수성 및 장애 분리와 같은 여러 가지 이점을 제공합니다. 응용 프로그램을 더 작고 독립적인 서비스로 나누면 매우 유연하고 견고한 시스템을 구축할 수 있습니다. 마이크로서비스 개발을 위한 최상의 방법론을 따르는 것이 중요합니다. 서비스 검색, 부하 분산 및 적절한 오류 처리를 구현하는 것과 같은 것들을 잊지마세요.
