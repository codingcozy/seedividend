---
title: "Nestjs 오류 처리"
description: ""
coverImage: "/assets/img/2024-06-19-NestjsErrorHandling_0.png"
date: 2024-06-19 23:16
ogImage:
  url: /assets/img/2024-06-19-NestjsErrorHandling_0.png
tag: Tech
originalTitle: "Nest.js Error Handling"
link: "https://medium.com/@zigbalthazar/nest-js-error-handling-592cde1a56cc"
isUpdated: true
---

<img src="/assets/img/2024-06-19-NestjsErrorHandling_0.png" />

# 1. 소개

NestJs는 백엔드 시스템을 개발하는 데 사용되는 프레임워크입니다. 이 프레임워크는 컨트롤러 레이어에서 오류 처리에 대한 규칙을 정의했지만, 이는 대규모 프로젝트에는 충분하지 않을 수 있습니다. 본 문서에서는 오류를 우아하게 처리하고 신중하게 대우하는 더 효과적이고 구조화된 접근 방식을 소개합니다.

# 2. 오류 처리 전략

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

# 에러 유형

코드에서 발생할 수 있는 에러 유형을 정의해보겠습니다:

- 유효성 검사 에러
- 제삼자 에러
- 데이터베이스 에러
- 일반(예기치 않은) 에러

언급된 모든 종류의 에러에 특히 주의해야 합니다.

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

특정 오류, 예를 들어 유효성 검사 오류와 같은 경우 적절한 응답이나 상태 코드로 처리할 수 있습니다. 그러나 일반 오류와 같은 다른 종류의 오류의 경우, 유지보수자에게 알리거나 높은 우선순위로 티켓을 생성하는 등의 추가 조치가 필요할 수 있습니다. 또 다른 오류 유형인 데이터베이스 오류는 복구와 복원 논리가 필요할 수 있습니다.

# 3. 다른 계층에서의 오류 처리

저는 우리의 응용프로그램 계층을 다음과 같이 분류하는 것을 선호합니다:

- 요청 계층
- 인터셉터
- 가드
- 컨트롤러 계층(\*)
- 서비스 계층
- 모델
- 데이터베이스
- 예외 처리 계층

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

컨트롤러 레이어 아래의 모든 레이어에서 오류가 발생하면 상위 레이어로 throw해야 합니다. 예를 들어:

- 데이터베이스 CRUD 함수(ORM 함수 등)에서 오류가 발생하면 Database Error 유형을 throw해야 합니다.
- 서드파티 호출(Stripe 등)에서 오류가 발생하면 Third-party 에러 유형을 throw해야 합니다.
- 예기치 않은 오류가 발생하면 Generic 에러 유형으로 간주해야 합니다.
- 등등

```js
async sampleFucntion(@AuthenticatedUser() jwtPayload: JwtDto) {
        try {
            return this.utilsService.apiResponse(200, await this.sampleService.sampleServiceFucntion(jwtPayload.id))
        } catch (error) {
            this.utilsService.handleError(error, jwtPayload, {}, 'description')
        }
    }
```

언급한 모든 오류는 상위 레이어로 throw되어야 하며, throw된 오류를 받은 해당 레이어도 Controller 레이어가 `try-catch` 블록에서 오류를 받게 될 때까지 throw해야 합니다. 그런 다음 Controller 레이어는 잡힌 오류를 utils 모듈이나 errors 모듈에 포함된 `ErrorHandler` 함수로 전달해야 합니다.

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

# 오류 처리기 함수

이 함수는 받은 오류 유형을 Switch-case 또는 if-else 방식으로 감지하여 처리해야 합니다.

```js
handleError(error, jwt: JwtDto, additionalInfo: any, description: string): void {
        if (error instanceof CheckingException) {
            throw new CheckingException(error.message, error.statusCode,error.messageData)
        } else if (error instanceof DatabaseException) {
            throw new DatabaseException(error.message, error, error.queryParams, description)
        } else if (error instanceof StripeErrorException) {
            throw new StripeErrorException(error as Stripe.errors.StripeError, error.stack, description)
        } else if (error instanceof HttpException){
                throw error
        } else {
            throw new GenericException(error.message, error, jwt, additionalInfo, description)
        }
    }
```

유형을 감지한 후, 각 오류 유형에 적합한 매개변수로 오류 유형을 생성하고 해당 오류를 throw해야 합니다.

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

샘플 Exception 클래스:

```js
export class DatabaseException extends Error {
  queryParams: any;
  description: any;
  stack: any;
  message: string;
  constructor(message: string, error: Error, q: any, description?: string) {
    super(`데이터베이스 오류가 발생했습니다: ${message}`);
    this.queryParams = q;
    this.description = description;
    this.stack = error.stack;
    this.message = error.message;
  }
}
```

특정 APP_FILTER를 정의하고 app.module에서 등록해야 합니다:

```js
providers: [
  {
    provide: APP_FILTER,
    useClass: GenericExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: checkingExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: DatabaseExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: StripeExceptionFilter,
  },
  AppService,
  UtilsService,
  JwtService,
  LoggerService,
];
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

예외 필터에서는 이제 이러한 오류 중 하나에 완벽하게 대응해야 합니다:
다음 조건을 고려해 주세요:

- 데이터베이스 및 일반적인 오류는 유지보수자에게 알리고 처리된 오류에 대한 사용자 응답이 있어야 합니다.
- Stripe 및 Checking(유효성) 오류는 사용자에게만 응답해야 합니다.

데이터베이스 및 일반적인 오류에 대한 샘플 예외 필터:

```js
// database.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { LoggerService } from "../../../../logger/logger.service";
import { GenericException } from "./generic.exception";
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
@Catch(GenericException)
export class GenericExceptionFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}
    catch(exception: GenericException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const errorData = {
            description: exception.description,
            stack: exception.stack,
            jwtPayload: exception.jwtPayload,
            additionalInfo: exception.additionalInfo,
            message: exception.message,
        }
        this.loggerService.error(exception.message, errorData)
        response.status(500).json({
            statusCode: 500,
            message: exception.message,
            error: 'Error',
        })
    }
}
```

Winston 로거를 사용하여 오류 수준 로그를 송신 및 티켓 생성을 위해 로그 전송기를 정의했습니다:

this.loggerService.error(exception.message, errorData)

일반적인 오류(외부 라이브러리 또는 유효성 검사 오류)에 대한 것입니다:

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
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CheckingException } from "./checking.exception";
```

```js
@Catch(CheckingException)
export class checkingExceptionFilter implements ExceptionFilter {
  catch(exception: CheckingException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.messageData,
      error: exception.message,
    });
  }
}
```

# 모니터링 도구

더 나은 오류 처리를 위해 몇 가지 도구를 사용할 수 있습니다:

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

- Sentry
- Raygun
- Winston
- 등

이 프로젝트에서는 Raygun을 사용하여 오류 모니터링 및 보고를 합니다.

## Raygun

Raygun은 개발자가 애플리케이션에서 문제를 식별하고 전체 소프트웨어 품질을 향상시키는 종합 오류, 충돌 및 성능 모니터링 솔루션입니다.

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
async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 사용자 생성을 위한 비즈니스 로직
    } catch (error) {
      this.raygunLoggerService.error('사용자 생성 실패', error.stack);
      throw new Error('사용자 생성 실패');
    }
```

성능 모니터링

- Raygun은 성능 메트릭을 추적하고 응용 프로그램의 병목 현상을 식별하는 실제 사용자 모니터링 (RUM) 및 응용 프로그램 성능 모니터링 (APM)도 제공합니다.

Raygun 대시보드

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

Raygun 대시 보드에 액세스하여 자세한 오류 보고서를 확인하고 응용 프로그램 성능을 추적하며 중요한 문제에 대한 경보 및 알림을 설정할 수 있습니다.

Raygun을 NestJS 애플리케이션에 통합하면 오류 및 성능 문제에 대한 강력한 통찰력을 얻어 문제를 선제적으로 해결하고 소프트웨어의 전반적인 안정성과 신뢰성을 향상시킬 수 있습니다.
