---
title: "JWT 인증 엑세스 토큰과 리프레시 토큰 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "JWT Authentication A Deep Dive into Access Tokens and Refresh Tokens"
link: "https://medium.com/stackademic/jwt-authentication-a-deep-dive-into-access-tokens-and-refresh-tokens-274c6c3b352d"
isUpdated: true
---





<img src="/assets/img/JWTAuthenticationADeepDiveintoAccessTokensandRefreshTokens_0.png" />

안녕하세요, 독자 여러분,

저희가 연결된 세상에서는 웹 애플리케이션 보안이 매우 중요합니다. 이 중요성은 세션 토큰을 어떻게 관리하고 새로 고칠지에 근본적으로 달려 있습니다. 이 글에서는 JWT 인증, Access Tokens와 Refresh Tokens 그리고 토큰 회전의 세부 사항에 대해 깊숙히 파헤쳐보겠습니다. 여정의 끝에는 백엔드(NestJS)와 프론트엔드(Angular) 구현에 모두 손을 대게 될 것입니다.

# Refresh Tokens의 필수성

<div class="content-ad"></div>

액세스 토큰은 짧은 수명을 가지며 사용자에게 응용 프로그램의 특정 부분에 대한 열쇠를 제공합니다. 그러나 이러한 키가 분실되거나, 더 나쁜 경우에는 도난당할 경우 어떻게 될까요? 짧은 수명이지만 피해는 오래 남을 수 있습니다. 이때 리프레시 토큰이 빛을 발합니다. 이들은 액세스 토큰을 갱신하는 메커니즘을 제공하여 사용자 세션을 안전하고 원활하게 유지합니다.

# 액세스 및 리프레시 토큰 해독

- 액세스 토큰: 일반적으로 15분에서 1시간까지의 짧은 수명을 가진 토큰으로, 특정 사용자 작업을 허용합니다. 일시적인 배지로 생각해보세요.
- 리프레시 토큰: 더 오래 지속되며, 주요 역할은 액세스 토큰 만료 후 액세스 토큰을 재발급하여 사용자의 접근을 끊임없이 보장합니다.

액세스 토큰만 사용하면 안전망 없이 줄타기를 하고 있는 것과 마찬가지입니다. 토큰이 짧게라도 손상된다면 그 잠재적인 낙폭은 과하게 측정해서는 안 됩니다.

<div class="content-ad"></div>

# NestJS와 함께 하는 백엔드 매직

네스트지와 함께 백엔드 모험에 떠나봅시다:

## 1. JWT 모듈 설정:

당신의 앱 모듈이나 별도의 인증 모듈에서:

<div class="content-ad"></div>

```typescript
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "yourSecretKey", // 참고: 실제 응용 프로그램에서는 더 안전하고 환경별로 설정된 값을 사용하세요
      signOptions: { expiresIn: "15m" }, // 유효 기간이 짧음
    }),
  ],
})
export class AuthModule {}
```

## b. 토큰 생성:

JWT를 사용하여 간편한 토큰 생성 및 사용자 유효성 검사.

```typescript
// authService.ts
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(userId: string) {
    return this.jwtService.sign({ id: userId }, { expiresIn: "15m" });
  }

  async createRefreshToken(userId: string) {
    const tokenId = uuid();
    return this.jwtService.sign(
      { id: userId, tokenId: tokenId },
      { expiresIn: "7d" }
    );
  }

  async validateUser(payload: any): Promise<any> {
    // 사용자가 데이터베이스에 존재하는지 등을 확인
    return { id: payload.id };
  }
}
```

<div class="content-ad"></div>

## c. 로그인 및 새로고침 엔드포인트:

로그인 엔드포인트는 액세스 및 새로고침 토큰을 생성하며, 새로고침 엔드포인트는 이를 갱신하여 지속적인 안전한 액세스를 보장합니다.

```js
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() body: { userId: string }) {
    const accessToken = await this.authService.createAccessToken(body.userId);
    const refreshToken = await this.authService.createRefreshToken(body.userId);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    return res.send({ accessToken });
  }

  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const oldRefreshToken = req.cookies['refreshToken'];

    // 이전 새로고침 토큰을 유효성 검사하고, 잘못된 경우 오류 발생.

    const userId = this.authService.decodeRefreshToken(oldRefreshToken).id;
    const newAccessToken = await this.authService.createAccessToken(userId);
    const newRefreshToken = await this.authService.createRefreshToken(userId);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    return res.send({ accessToken: newAccessToken });
  }
}
```

# Angular: 이를 어떻게 구현할까요?

<div class="content-ad"></div>

앵귤러, 리액트, 뷰 — 어떤 프론트엔드 프레임워크를 사용하든 핵심 개념은 일관적입니다. 이 예시에서는 앵귤러를 사용해보겠습니다:

## a. 액세스 토큰 저장하기:

메모리에 보관하여 최적의 보안 유지

```js
// authService.ts
private accessToken: string;

setAccessToken(token: string) {
  this.accessToken = token;
}

getAccessToken() {
  return this.accessToken;
}
```

<div class="content-ad"></div>

## b. 인터셉터에서 토큰 만료 및 갱신 처리:

인터셉터를 사용한 인증 갱신 관리

```js
// token.interceptor.ts
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // 요청 헤더에 액세스 토큰을 추가
  const authorizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken()) });

  return next.handle(authorizedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // 액세스 토큰이 만료되었으므로 갱신을 시도
        return this.authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            // 인-메모리 저장소에 새 토큰 설정
            this.authService.setAccessToken(newToken);

            // 재시도에 새 토큰 사용
            const retriedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + newToken) });
            return next.handle(retriedReq);
          })
        );
      }
      return throwError(error);
    })
  );
}
```

# 토큰 로테이션: 보안

<div class="content-ad"></div>

보안은 Access 토큰과 Refresh 토큰을 사용하여 원래 강력하지만, Refresh 토큰의 회전으로 추가적인 방어층이 더해집니다. 이 개념은 각 Refresh 토큰의 사용 시마다 새로운 것으로 대체되는 것을 규정합니다. 이는 Refresh 토큰이 노출되더라도 오용 기회가 심각하게 제한된다는 것을 보장합니다. 이러한 고급 개념을 자세히 살펴보겠습니다.

## 왜 Refresh 토큰을 회전시키나요?

코드에 들어가기 전에, 이 전략의 "왜"에 대해 확인해 봅시다. 공격자가 Refresh 토큰을 소유하고 있는 경우 시스템이 회전을 구현하지 않으면, 그들은 Access 토큰을 계속 갱신하여 무단 액세스를 유지할 수 있습니다. 그러나 회전이 이루어지면, 합법적 사용자(또는 공격자)가 Refresh 토큰을 사용한 후에는 무효화되어 세션이 재설정됩니다. 이는 합법적 사용자가 예기치 않게 로그아웃되는 것을 발견하면 시스템에 잠재적인 오용을 알릴 수 있습니다.

# NestJS로 백엔드 회전 전략:

<div class="content-ad"></div>

## a. 토큰 회전을 위한 AuthService 확장:

최신화된 AuthService에는 갱신 토큰을 안전하게 해독하고 회전시키는 기능이 추가되어 토큰 보안이 강화되었습니다.

```js
// authService.ts
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  // ... 이전 코드 ...

  decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException("유효하지 않은 갱신 토큰");
    }
  }

  async replaceRefreshToken(userId: string, oldTokenId: string) {
    // 예를 들어, 사용된 토큰 ID를 블랙리스트에 저장하여 이전 토큰을 무효화합니다.
    // 여기서는 또한 이 사용자에 대해 이전에 발급된 토큰 목록을 확인할 수도 있습니다.

    return this.createRefreshToken(userId); // 앞서 설명한대로 새 토큰 생성
  }
}
```

## b. 새로운 Refresh Endpoint 업데이트:

<div class="content-ad"></div>

새로운 새로고침 메커니즘은 이제 이전 토큰을 처리하고 유효성을 검사한 후 교체해야 합니다:

```js
// authController.ts

@Post('refresh')
async rotateRefreshToken(@Res() res: Response, @Req() req: Request) {
  const oldRefreshToken = req.cookies['refreshToken'];
  const decodedToken = this.authService.decodeRefreshToken(oldRefreshToken);

  // 이전 토큰 무효화 및 새 토큰 생성
  const newRefreshToken = await this.authService.replaceRefreshToken(decodedToken.id, decodedToken.tokenId);

  const newAccessToken = await this.authService.createAccessToken(decodedToken.id);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  return res.send({ accessToken: newAccessToken });
}
```

## c. 토큰 새로고침:

Angular 서비스에서 토큰을 새로고침할 때, 메모리 내의 액세스 토큰도 업데이트합니다.

<div class="content-ad"></div>

```js
// authService.ts

refreshToken(): Observable<string> {
  return this.httpClient.post<{ accessToken: string }>('/auth/refresh', {}).pipe(
    tap((response) => {
      this.setAccessToken(response.accessToken);
    }),
    map(response => response.accessToken)
  );
}
```

## d. 인터셉터 업그레이드:

저희 인터셉터는 계속해서 새로운 엑세스 토큰을 새로 고침하고 요청 다시 시도에 추가하는 프로세스가 그대로 유지됩니다.

# 마무리 🎁

<div class="content-ad"></div>

웹 보안에서 액세스 토큰과 리프레시 토큰은 기본적인 요소들입니다. 액세스 토큰만 사용하면 애플리케이션에 취약점이 발생할 수 있습니다. 리프레시 토큰을 활용하면, 특히 회전 메커니즘과 결합하여 우리의 방어를 강화하고 보안을 강화할 수 있습니다.

디지털 세계는 지속적인 변화 속에 있어 기회와 도전을 동시에 제공합니다. 개발자로서, 우리의 책임은 단순히 창작뿐만 아니라 잠재적인 위협에 대한 강력한 보호도 보장해야 합니다.

기억하세요, 안전한 애플리케이션은 신뢰할 수 있는 애플리케이션입니다.

웹 개발에 대한 더 많은 통찰과 토론을 위해서, 제 Medium 블로그를 방문해주시기 바랍니다.

<div class="content-ad"></div>

행복한 코딩! 🚀

# 스택아데믹

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 작가에게 박수를 보내고 팔로우해주세요! 👏
- 트위터(X), 링크드인, 유튜브에서 팔로우해주세요.
- 스택아데믹닷컴을 방문하여 전 세계에서 무료 프로그래밍 교육을 민주화하는 방법에 대해 자세히 알아보세요.
