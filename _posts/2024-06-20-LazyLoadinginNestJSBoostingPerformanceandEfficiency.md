---
title: "NestJS에서의 Lazy Loading 성능과 효율성 향상"
description: ""
coverImage: "/assets/img/2024-06-20-LazyLoadinginNestJSBoostingPerformanceandEfficiency_0.png"
date: 2024-06-20 01:43
ogImage:
  url: /assets/img/2024-06-20-LazyLoadinginNestJSBoostingPerformanceandEfficiency_0.png
tag: Tech
originalTitle: "Lazy Loading in NestJS: Boosting Performance and Efficiency"
link: "https://medium.com/@Abdelrahman_Rezk/lazy-loading-in-nestjs-boosting-performance-and-efficiency-2c6350a6ab84"
isUpdated: true
---

<img src="/assets/img/2024-06-20-LazyLoadinginNestJSBoostingPerformanceandEfficiency_0.png" />

게으른로딩은 실제로 필요할 때까지 리소스의 초기화를 지연시키는 강력한 디자인 패턴입니다. 이는 응용 프로그램의 성능과 리소스 관리를 현저히 개선할 수 있습니다. NestJS에서는 동적 모듈과 @nestjs/core의 LazyModuleLoader를 사용하여 게으른 로딩을 구현할 수 있습니다. 이 문서에서는 두 가지 방법을 탐구하며 자세한 예제를 제공하여 NestJS 응용 프로그램에서 게으른 로딩을 구현하는 데 도움을 줍니다.

## 게으른 로딩의 이점

게으른 로딩은 다음을 도와줍니다:

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

- 초기 로드 시간 단축: 모든 것을 시작할 때 불러오지 않아도 애플리케이션이 더 빨리 시작됩니다.
- 리소스 사용 최적화: 실제로 필요한 경우에만 구성 요소 또는 모듈을 로드합니다.
- 확장성 향상: 리소스를 효율적으로 사용하면 애플리케이션이 더 잘 확장될 수 있습니다.

# Lazy Loading을 위해 LazyModuleLoader 사용하기

NestJS에서 Lazy Loading을 구현하려면 @nestjs/core의 LazyModuleLoader를 사용합니다.

## 단계 1: Lazy Loading할 모듈 생성하기

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

이전과 같이 ReportsModule을 생성하세요.

```js
// reports.module.ts
import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
```

## 단계 2: Lazy Loaded Module을 위한 서비스 생성

ReportsModule을 위한 서비스를 정의하세요.

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
// reports.service.ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportsService {
  getReport(): string {
    console.log("lazily loaded reports module");
    return "This is a report!";
  }
}
```

## Step 3: Define the Main Module

ReportsModule을 나중에 import할 것이기 때문에 AppModule을 정의합니다.

```js
// app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
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

## 단계 4: 레이지 로딩 및 기타 로직을 처리하는 컨트롤러 생성

ReportsModule을 동적으로 로드하는 LazyModuleLoader를 사용하는 컨트롤러를 생성하세요.

```js
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { ReportsModule } from './reports/reports.module';
import { ReportsService } from './reports/reports.service';

@Controller()
export class AppController {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  @Get()
  async getLazyReport(): Promise<string> {
    // ReportsModule의 초기화 시간을 알아내기 위해 console.time() 및 console.timeEnd() 사용
    console.time();
    const moduleRef = await this.lazyModuleLoader.load(() => ReportsModule);
    const reportsService = moduleRef.get(ReportsService);
    console.timeEnd();
    return reportsService.getReport();
  }
}
```

# 예시 사용법

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

엔드포인트에 처음 요청이 발생하면 ReportsModule이 게으르게 로드되며, ReportsService가 요청을 처리하고 보고서를 반환할 것입니다.

```js
$ curl http://localhost:3000/lazy-reports
이것은 보고서입니다!
```

그리고 여러 요청을 생성하면 각 연속적인 시도마다 ReportsModule을 로드하는 것이 훨씬 빨라집니다. load 메서드는 모듈의 캐시된 인스턴스를 반환합니다.

한 번 이상의 요청을 생성하면 앱 로그에 이와 같은 출력이 표시됩니다.

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
default: 6.226ms
Reports 모듈을 게으르게 로드했습니다
[Nest] 208649  - 2024년 5월 26일, 오후 8:33:22     LOG [LazyModuleLoader] ReportsModule 종속성이 초기화되었습니다
default: 2.323ms
Reports 모듈을 게으르게 로드했습니다
[Nest] 208649  - 2024년 5월 26일, 오후 8:33:22     LOG [LazyModuleLoader] ReportsModule 종속성이 초기화되었습니다
default: 2.012ms
Reports 모듈을 게으르게 로드했습니다
```

# 결론

NestJS에서 게으른 로딩을 구현하면 응용프로그램의 성능과 자원 효율성을 크게 향상시킬 수 있습니다.

NestJS에서 LazyModuleLoader를 사용하면 모듈이 처음으로 게으르게 로드되고 캐시되어 성능 및 자원 사용량을 최적화합니다. 이 접근 방식은 동적 모듈 로딩을 효율적으로 관리하여 초기 로드 시간과 런타임 효율성 사이의 균형을 제공합니다.
