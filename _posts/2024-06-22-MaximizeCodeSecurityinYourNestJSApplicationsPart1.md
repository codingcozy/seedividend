---
title: "NestJS 애플리케이션의 코드 보안을 극대화하는 방법 파트 1"
description: ""
coverImage: "/assets/img/2024-06-22-MaximizeCodeSecurityinYourNestJSApplicationsPart1_0.png"
date: 2024-06-22 02:07
ogImage: 
  url: /assets/img/2024-06-22-MaximizeCodeSecurityinYourNestJSApplicationsPart1_0.png
tag: Tech
originalTitle: "Maximize Code Security in Your NestJS Applications (Part 1)"
link: "https://medium.com/gitconnected/maximize-code-security-in-your-nestjs-applications-part-1-b7abb99fa048"
---


NestJS 개발자를 위한 최고의 안전한 코드 작성 방법

![이미지](/assets/img/2024-06-22-MaximizeCodeSecurityinYourNestJSApplicationsPart1_0.png)

개발자로서, 우리는 모두 코드 보안이 얼마나 중요한지 알고 있습니다. Optus와 Medibank에서 발생한 최근 데이터 침해 사례는 코드 보안의 중요성을 다시 한 번 강조합니다. 그래서, 질문은 다음과 같습니다: 우리는 어떻게 안전한 코드를 작성하여 웹 애플리케이션에서 다양한 유형의 공격을 방지할 수 있을까요? 안전한 코드를 작성하기 위한 최고의 방법을 따르는 것은 취약점과 위협으로부터 우리 앱을 보호하는 데 필수적입니다.

우리가 어떻게 보안 위험을 방지할 수 있는지에 대해 들어가기 전에, 먼저 가장 흔한 유형의 보안 위험을 살펴보겠습니다. 이것은 우리 앱을 보호하는 과제에 대한 더 나은 이해를 제공할 것입니다.

<div class="content-ad"></div>

OWASP Top 10은 웹 애플리케이션의 가장 중요한 보안 위험을 널리 인정받는 목록으로, 산업 전문가들 간의 합의를 통해 결정됩니다. 아래는 2017년과 2021년의 상위 10위 위험 목록입니다.

![OWASP Top 10](/assets/img/2024-06-22-MaximizeCodeSecurityinYourNestJSApplicationsPart1_1.png)

상위 10위 중 많은 것들이 웹 앱의 보안에 매우 중요합니다.

두 부분으로 구성된 글의 첫 번째 부분으로, 몇 가지 위험과 위험을 방지하는 데 따를 수 있는 최상의 실천 방법에 대해 설명하겠습니다.

<div class="content-ad"></div>

아래와 같습니다:

- 액세스 제어 오류
- 서버 측 요청 위조 (SSRF)
- 대량 할당
- 민감한 정보 노출

## 액세스 제어 오류

액세스 제어 오류는 가장 흔한 위험 중 하나입니다. 공격자가 무단으로 기능이나 자원에 액세스할 수 있는 경우 발생합니다. 2014년 1월 Snapchat 사건이 실제로 발생한 사례 중 하나입니다.

<div class="content-ad"></div>

이러한 위험을 방지하기 위해 최소 권한 원칙을 따르는 것이 중요합니다. 액세스는 기본적으로 거부되어야하며 권한은 필요한 경우에만 부여해야합니다.

사용자의 역할이나 권한에 기반하여 기능이나 자원에 대한 액세스를 제한하는 역할 기반 액세스 제어 (RBAC) 또는 액세스 제어 목록 (ACL)과 같은 액세스 제어 메커니즘을 사용할 수 있습니다.

다음은 NestJS 애플리케이션에서 가드를 사용한 RBAC의 예입니다:

```js
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.role === 'admin';
  }
}

@Controller('cats')
export class CatsController {
  @UseGuards(AdminRoleGuard)
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

<div class="content-ad"></div>

위의 코드 스니펫에서는 CanActivate 인터페이스를 구현하는 AdminRoleGuard를 생성합니다. 현재 사용자의 역할을 확인하여 사용자가 관리자 인 경우 true를 반환합니다. 그런 다음 @UseGuards 데코레이터를 사용하여 AdminRoleGuard를 findAll 메서드에 적용하고 상세하게 접근을 제한하여 관리자 역할을 가진 사용자에게만 엔드포인트에 액세스 할 수 있도록 합니다.

접근 제어 메커니즘은 안전하고 유지 관리하기 쉬운 프레임워크에서 중앙 집중식 함수를 사용하여 적용해야 합니다.

또한 컨트롤러에 적용된 필수 가드를 테스트하는 단위 테스트를 작성하는 것이 좋습니다. 따라서 가드가 실수로 제거되었을 때 단위 테스트가 문제를 감지할 것입니다.

## 서버 측 요청 위조 (SSRF)

<div class="content-ad"></div>

SSRF는 공격자가 서버에 의도하지 않은 요청을 보내게 하는 사이버 공격입니다. 이러한 요청은 내부 네트워크의 제한된 자원에 액세스하는 데 사용될 수 있습니다.

SSRF를 방지하려면 사용자 입력을 적절히 확인하는 것이 중요합니다. 아래는 SSRF 위험에 노출된 엔드포인트의 예시입니다.

```js
import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';

@Controller()
export class CatsController {
  @Get()
  async getData(@Query('url') url: string, @Res() res) {
    const response = await fetch(url);
    return await response.json();
  }
}
```

위 예시에서 앱은 url 쿼리 매개변수에서 가져온 URL로 요청을 보내고 응답 데이터를 클라이언트에 반환합니다. 공격자가 내부 네트워크의 제한된 자원에 액세스하는 악성 URL을 포함한 요청을 서버로 보낼 수 있기 때문에 명백히 SSRF 공격에 취약합니다.

<div class="content-ad"></div>

아래의 위험을 방지하기 위해 URL 매개변수를 유효성 검사해야 합니다.

```js
import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { isURL } from 'validator';

@Controller()
export class CatsController {
  @Get()
  async getData(@Query('url') url: string, @Res() res) {
    if (!isURL(url)) {
      return res.status(HttpStatus.BAD_REQUEST).send('유효하지 않은 URL입니다');
    }

    const response = await fetch(url);
    return await response.json();
  }
}
```

더 나아가 보안을 더 강화하기 위해 사용자가 직접 쿼리 매개변수에 URL을 전달하도록 허용해선 안 됩니다. 대신 신뢰할 수 있는 API에서 데이터를 가져 오기 위해 기존 서비스를 사용해야 합니다.

```js
@Controller()
export class CatsController {
  @Get()
  async getData(@Query('name') dataName: string, @Res() res) {
    const response = await dataService.GetDataByName(dataName);
    return await response.json();
  }
}
```

<div class="content-ad"></div>

SSRF 공격을 방지하는 다른 방법이 있습니다:

- 신뢰할 수 있는 소스(즉, 알려진 API 또는 서비스)로만 요청을 보냅니다.
- 보안 헤더를 구현합니다(예: “X-Frame-Options”와 같은 헤더) 클릭재킹 공격 및 기타 악의적 요청을 방지합니다.
- CSP(Content Security Policy)를 사용하여 응용 프로그램 대신 요청을 허용할 소스를 지정합니다.

NestJS에서는 helmet을 사용하여 보안 헤더 및 CSP를 쉽게 설정할 수 있습니다.

## 대량 할당

<div class="content-ad"></div>

대량 할당은 취약점입니다. 공격자가 앱에 악의적인 요청을 보내어 여러 객체 속성을 수정할 수 있기 때문입니다.

아래 예시에서, 요청 본문에서 오는 데이터를 기반으로 새 사용자가 생성됩니다. 이것은 대량 할당 공격에 취약합니다. 왜냐하면 공격자가 클라이언트 객체의 중요한 필드(예: 역할 또는 비밀번호)를 덮어쓰는 악의적인 데이터를 보낼 수 있기 때문입니다.

```js
import { Controller, Post, Body } from '@nestjs/common';

@Controller("client")
export class ClientController {
  @Post()
  create(@Body() body) {
    const client = new Client(body);
    return await client.save();
  }
}
```

대량 할당을 방지하기 위해 우리는 각 객체에 허용된 속성 목록을 정의할 수 있습니다. 우리는 아래 예시에서 중요한 필드를 덮어쓰는 것을 막기 위해 속성의 화이트리스트를 구현했습니다.

<div class="content-ad"></div>

```js
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column(})
  email: string;
}

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async create(@Body() client: Pick<User, 'name' | 'email'>) {
    return await this.clientService.create(client);
  }
}
```

여기서 TypeScript의 Pick 유형을 사용하여 User 엔티티의 속성을 화이트리스트로 정의합니다. 그런 다음 @Body 데코레이터를 사용하여 요청 본문을 user 매개변수에 바인딩합니다. 이 매개변수에는 허용된 속성만 포함될 것입니다. 이를 통해 공격자가 대량 할당을 통해 다른 엔티티 속성을 수정하는 것을 방지합니다.

대량 할당을 방지하는 다른 방법은 다음과 같습니다:

- 일반 DTO 대신 축소된 DTO를 사용합니다. 예를 들어 InsertClientEntity 및 UpdateClientEntity를 만듭니다. 이러한 DTO에는 삽입 및 업데이트 작업에서 허용된 속성만 포함됩니다.
- 클라이언트 측에서 오는 객체에 직접 바인딩하지 않습니다.

<div class="content-ad"></div>

## 민감한 정보 노출

민감한 정보에는 암호, API 키 및 기타 비밀 데이터가 포함됩니다. 개인 정보나 결제 관련 정보가 포함된 데이터는 모두 민감합니다.

웹 API를 설계할 때, 종종 클라이언트로 과도한 데이터가 반환됩니다.

```js
import { Controller, Get, Param } from '@nestjs/common';
import { Client} from './client/client.entity';

@Controller()
export class ClientController {
  @Get('clients/:id')
  async getClient(@Param('id') id: string): Promise<Client> {
    // 클라이언트를 위한 모든 필드를 반환합니다
    return await Client.findById(id);
  }
}
```

<div class="content-ad"></div>

이 예시에서는 getClient 메서드가 클라이언트에 대한 모든 필드를 반환하는데, 이는 role 또는 비밀번호와 같은 민감한 데이터를 포함합니다. 클라이언트는 이러한 데이터를 사용하거나 표시하지 않지만, 공격자가 이를 가로채어 노출시킬 수 있습니다.

민감한 개인 데이터 노출을 방지하기 위해, 우리는 클라이언트가 필요로 하는 데이터인 이름과 이메일 필드만을 반환해야 합니다. 요약하자면, 최소한의 데이터만 노출해야 합니다.

```js
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Client} from './client/client.entity';

@Controller()
export class ClientController {
  @Get('clients/:id')
  async getClient(@Param('id') id: string): Promise<Client> {
    // Only return the name and email
    return await Client.findById(id).map(c => {c.name, c.email});
  }
}
```

민감한 데이터 노출을 방지하기 위해, 아래는 따라야 할 다른 지침들입니다:

<div class="content-ad"></div>

- 민감한 정보를 버전 관리에 저장하지 마세요. 이 정보에는 환경 변수 또는 구성 파일이 포함됩니다.
- 시스템 내의 민감한 정보 (GDPR, PCI, 및 PII 데이터)를 식별하고 암호화를 통해 안전하게 보호하세요.
- 앱이 클라이언트와 서버를 연결할 때 HTTPS를 사용하도록 하세요. 이렇게 하면 민감한 데이터가 전송 중 가로채지 못하게 할 수 있습니다.

## 요약

이 글은 NestJS의 맥락에서 발생하는 네 가지 일반적인 위험과 그 방지를 위한 모범 사례에 대해 논의합니다.

이러한 모범 사례를 따르면 NestJS 앱의 보안을 보장할 수 있는 안전한 코드를 작성할 수 있습니다.

<div class="content-ad"></div>

위 글의 제 2부에서는 다른 상위 OWASP 위험에 대해 계속 논의하고 있어요.

만일 이미 Medium의 유료 구독자가 아니라면, 이 링크를 방문하여 구독할 수 있어요. Medium의 모든 이야기에 무제한으로 접근할 수 있을 거에요. 저는 회원 비용의 일부를 추천 수수료로 받게 될 거에요.

즐거운 프로그래밍 되세요!