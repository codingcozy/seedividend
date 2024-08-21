---
title: "NestJS, TypeORM 및 PostgreSQL 예제  데이터베이스 마이그레이션을 사용한 전체 개발 및 프로젝트 설정 방법"
description: ""
coverImage: "/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_0.png"
date: 2024-06-23 14:00
ogImage:
  url: /assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_0.png
tag: Tech
originalTitle: "NestJS, TypeORM and PostgreSQL — full example development and project setup working with database migrations."
link: "https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f"
isUpdated: true
---

상태 데이터와 데이터베이스를 다루는 것은 어렵습니다. 특히 프로젝트가 시간이 지남에 따라 커지면 더욱 어려워집니다. 개발 프로젝트의 성공을 위해서는 처음부터 좋은 개발 및 프로젝트 설정을 갖추는 것이 중요합니다. 이 글에서는 대부분의 프로젝트를 설정하는 방법을 보여드리고, 설정 뒤에 있는 몇 가지 생각을 강조하려고 합니다.

이 예시에서는 데이터 저장을 위해 PostgreSQL 데이터베이스를 사용하는 간단한 NodeJS API 작업을 진행하고 개발자의 편의를 위해 일부 도구를 설정합니다.

다음은 설정입니다:

![이미지](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_0.png)

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

NodeJS에서 API를 빌드하기 위해 NestJS를 사용할 예정입니다. NestJS는 상당히 유연한 프레임워크로 ExpressJS 원칙에 기반을 두고 있어 NodeJS 서비스를 쉽고 빠르게 개발할 수 있게 해줍니다. 이 프레임워크에는 여러 가지 편의 기능 (전체 TypeScript 지원, 의존성 주입, 모듈 관리 등)이 내장되어 있습니다.

더 많은 정보를 보려면 여기 웹사이트를 방문해보세요: http://nestjs.com

프로젝트와 도구

NestJS는 보일러플레이트를 처리해주는 멋진 CLI 도구를 함께 제공하여 작업을 빠르게 시작할 수 있습니다. 개인적으로 CLI에서 생성된 NestJS 프로젝트가 완벽한 시작점이라고 생각합니다.

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

생성된 블랙 매직 코드는 실제로 무엇을 하는지 알지 못한 채 조정하거나 확장하려고 할 때 문제가 될 수 있습니다. 그래서 저는 항상 아주 작게 시작하고 필요한 기능을 시간이 지남에 따라 추가하고 배우는 것을 선호합니다. 필요하지 않거나 이해하지 못하는 많은 기능이 있는 오버블로운 스타터 프로젝트를 사용하지 않는 것이죠.

프로젝트 준비하기 — 보일러플레이트

좋아요, 이 몇 줄로 프로젝트를 생성하여 시작해보죠:

```js
npm i -g @nestjs/cli
nest new project-name
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

더 많은 내용은 NestJS 및 CLI에 대해 여기에서 찾아볼 수 있어요.

귀하의 프로젝트는 다음과 같이 보일 것입니다:

![project image](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_1.png)

지금까지 모든 작업이 잘 되는지 테스트해 봅시다.

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
npm run start:dev
```

이제 프로젝트 기본 설정이 완료되었으니, 데이터 영속성 레이어를 추가해 봅시다.

데이터베이스 스키마를 관리하기 위해 TypeORM을 사용할 것입니다. TypeORM의 장점은 TypeScript로 데이터 엔티티를 모델링할 수 있으며, 이후 이러한 모델을 데이터베이스의 테이블 구조로 적용하거나 동기화할 수 있다는 것입니다. (물론 PostgreSQL 데이터베이스뿐만 아니라 다른 데이터베이스와도 작동합니다. TypeORM 문서에서 지원하는 데이터베이스에 대한 자세한 정보 찾아보세요.)

로컬 PostgreSQL 데이터베이스 인스턴스 설정 - 도커 자동화와 함께!

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

로컬 데이터 지속성 작업을 위해 데이터베이스 서버와 연결해야 합니다. PostgreSQL 데이터베이스 서버를 로컬 머신에 설정해야 하는 방법 중 하나가 있지만, 저는 이 방법을 크게 선호하지 않아요. 왜냐하면 프로젝트가 내 머신에 많이 종속될 수 있기 때문이죠. 즉, 팀으로 프로젝트를 진행하거나 머신을 바꾸면 매번 다시 설정해야 하거나 어떻게든 설정 가이드를 작성해야 합니다 (서로 다른 운영 체제를 사용하는 머신에서는 더욱 까다로워집니다).

그렇다면 우리는 어떻게 이 문제를 해결할 수 있을까요? 자동화를 통해!

미리 구축된 PostgreSQL 도커 이미지를 사용하고 데이터베이스 서버를 도커 프로세스로 실행합니다. 이렇게 하면 몇 줄의 셸 코드로 전체 설정을 스크립팅하여 서버 인스턴스를 실행하고 연결할 준비가 끝난 빈 데이터베이스를 준비할 수 있습니다. 이것은 재현 가능하고 설정 코드를 프로젝트 코드의 나머지와 함께 소스 제어로 관리할 수 있어, 다른 개발자들이 프로젝트에 빠르게 참여할 수 있도록 만들어줍니다.

이 스크립트는 다음과 같이 보일 것입니다:

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

우리의 package.json 실행 스크립트에 그 명령어를 추가해서 쉽게 실행할 수 있도록 합시다.

```js
"start:dev:db": "./src/scripts/start-db.sh"
```

좋아, 이제 실행할 수 있는 명령어가 생겼고 데이터베이스 서버와 기본 데이터베이스가 설정됩니다.

프로세스를 더 견고하게 만들기 위해 항상 도커 컨테이너에 동일한 이름($SERVER 변수 스크립트에서)을 사용할 거에요. — 이렇게 하면 추가적인 확인을 추가할 수 있어요 — 만약 컨테이너가 이미 실행 중이면 종료하고 제거해서 깔끔한 상태를 보장할 수 있어요.

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

NestJS를 데이터베이스에 연결하는 방법

모든 것을 위해 이미 NestJS 프로젝트를 데이터베이스에 연결하는 데 도움이 되는 NPM 모듈이 있습니다. 우리 프로젝트에 사전 빌드된 NestJS-to-TypeORM 모듈을 사용하여 TypeORM 지원을 추가해 봅시다.

다음과 같이 필요한 모듈을 추가할 수 있습니다:

```js
npm install --save @nestjs/typeorm typeorm pg
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

더 많은 정보는 NestJS 문서에서 찾을 수 있어요.

구성 관리

이제 모든 것을 하나로 묶는 시간입니다.

NestJS에서 TypeORM에게 어떤 데이터베이스 서버에 연결해야 하는지 알려주는 방법은 TypeOrmModule을 사용하는 것이에요.
forRoot 메소드를 사용하여 구성을 전달할 수 있어요.

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

이것을 잘 작동시키려면 다음과 같이 설정 서비스를 작성할 수 있습니다.

이 config 클래스의 아이디어는 API 서버 main.ts가 시작되기 전에 실행되도록 하는 것입니다. 이 클래스는 환경 변수에서 구성을 읽어오며, 실행 중에 읽기 전용으로 값을 제공할 수 있습니다.

개발 및 운영 모드에 유연하게 대응하기 위해 dotenv 모듈을 사용할 것입니다.

```js
npm install --save dotenv
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

이 모듈을 사용하면 로컬 개발 환경의 프로젝트 루트에 " .env" 파일을 만들어 구성 값을 준비할 수 있고, 프로덕션 환경에서는 프로덕션 서버의 환경 변수에서 값만 읽어올 수 있습니다. 이는 매우 유연한 방식이며 이 파일을 팀 내 다른 개발자들과 쉽게 공유할 수도 있습니다.

참고: 그러나 이 파일을 git으로 무시하는 것을 강력히 권장합니다. 이 파일에 실제 비밀 정보를 넣을 수 있기 때문에 프로젝트 외부로 누설되거나 실수로 커밋하는 것을 원하지 않을 것입니다.

아래는 .env 파일이 어떻게 보일 수 있는지에 대한 예시입니다:

```js
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DATABASE=my_database
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
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

우리 ConfigService는 싱글톤 서비스로 실행되며 시작할 때 구성 값을 로드하여 다른 모듈에 제공합니다. 서비스에는 오류 조기 패턴이 포함됩니다. 즉, 해당 서비스가 제공할 수없는 값에 대해 요청을하면 의미 있는 오류를 throw합니다. 이렇게 함으로써 구성 오류를 런타임 라이프사이클이 아닌 빌드/부트 시간에 감지하여 설정이 더 견고해집니다. 이렇게하면 서버를 배포/시작 할 때가 아닌 소비자가 API를 사용할 때 이것을 일찍 감지할 수 있습니다.

이것이 ConfigService의 모습이며, NestJS 앱 모듈에 추가하는 방법입니다:

이제 첫 번째 테스트를 시작할 준비가 거의 완료되었지만, 실제로 개발 시 TypeScript에서 작업하려면 nodemon과 함께 ts-node를 사용할 것이므로 특별한 nodemon.json을 사용하여 typescript 컴파일러를 활성화하는 ts-node 모듈을 사용하여 개발 서버를 실행할 수 있습니다. 그러니까 nodemon과 ts-node를 설치합시다.

```js
npm i --save-dev nodemon ts-node
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

루트 디렉토리에 debug 및 ts-node 지원이 포함된 nodemon.json 파일을 추가해주세요.

```js
{
 "watch": ["src"],
 "ext": "ts",
 "ignore": ["src/**/*.spec.ts"],
 "exec": "node --inspect=127.0.0.1:9223 -r ts-node/register -- src/main.ts",
 "env": {}
}
```

마지막으로 package.json 파일의 start:dev 스크립트를 다음과 같이 수정해주세요:

```js
"start:dev": "nodemon --config nodemon.json",
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

이렇게 하면 API 서버를 시작하기 위해 npm run start:dev를 실행할 수 있어요. 시작 시 ConfigService에서 .env 값들을 가져와 데이터베이스에 TypeORM이 연결될 겁니다. 또한, 이 작업은 제 컴퓨터에 바운드되어 있지 않아요. 멋지죠!

데이터 모델 엔티티를 정의하고 로드해봅시다.

TypeORM은 데이터 모델 엔티티의 자동 로딩을 지원해요. 단순히 모든 엔티티를 한 폴더에 넣고 구성에서 패턴을 사용하여 로드할 수 있어요. 저희는 model/`name`.entity.ts에 엔티티를 넣었어요. (ConfigService의 TypeOrmModuleOptions의 entities 속성을 참고해주세요)

![이미지](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_2.png)

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

TypeORM의 또 다른 멋진 기능은 Entity 모델들이 상속을 지원한다는 것입니다.

예를 들어 특정 데이터 필드가 모든 엔티티에 있도록 원한다면 정말 멋진 기능입니다.

예를 들어, 자동으로 생성된 UUID id 필드와/또는 createDateTime, lastChangedDateTime 필드 등이 있습니다.
참고: 이러한 베이스 클래스들은 추상적이어야 합니다.

따라서 TypeORM에서 데이터 모델 엔티티를 정의하면 다음과 같이 보일 것입니다:

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

더 많은 지원되는 데이터 어노테이션을 TypeORM 문서에서 찾아보세요.

파티 시간이에요 — API를 시작하고 작동하는지 확인해 봅시다.

```js
npm run start:dev:db
npm run start:dev
```

… 멋지네요 — 작동하는 것 같지만, 사실 데이터베이스는 아직 데이터 모델을 반영하지 않았어요.

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

데이터베이스 스키마를 적용하고 데이터베이스 마이그레이션을 생성하고 실행하세요.

이전에 언급했듯이, TypeORM은 데이터 모델을 데이터베이스의 테이블로 동기화하는 기능을 제공합니다.

이 모델의 동기화는 좋지만 위험할 수도 있습니다.

왜냐하면 초창기 개발 단계에서는 좋습니다. 모든 데이터 엔티티가 아직 확정되지 않았기 때문입니다. 그래서 코드에서 클래스를 변경하면 모든 것이 데이터베이스에서 잘 동작합니다. 기본적으로 데이터베이스의 상태에 대해 생각할 필요가 그리 많지 않습니다. TypeORM이 모든 일을 대신 처리해 주니까요.

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

하지만 여기서 tricky한 부분이 나타납니다. 데이터베이스에 실제 데이터가 있을 때는 모든 엔티티 변경에서 손실을 입고 싶지 않습니다. 이것은 조금 더 복잡해집니다. 이 동기화 기능은 데이터베이스 테이블에 필요한 변경 사항을 적용하기 위해 테이블을 삭제하고 다시 생성하는 방식으로 작동합니다. 이는 테이블 내의 데이터가 손실된다는 것을 의미합니다. 당연히 프로덕션 환경에서 피해야 하지만 개발 환경에서도 예상치 못한 부작용을 야기할 수 있습니다.

그래서 저는 개발 초기부터 코드에서 데이터베이스 마이그레이션을 사용하는 것을 선호합니다.

이렇게 함으로써 데이터 세트의 변경 사항을 더 잘 추적하고 이에 대해 더 적극적으로 생각하게 하여 프로덕션 시나리오에서의 변경 및 데이터 손실을 방지하는 데 도움이 됩니다.

그러니 이 문제를 해결해 봅시다 - 다행히 TypeORM에는 이에 대한 솔루션이 포함되어 있고, SQL 명령을 생성하는 작업을 처리하는 'CLI' 명령도 있습니다. 이를 통해 내부에 어떤 마법도 없이 생성된 SQL 명령을 쉽게 확인하고 테스트할 수 있습니다.

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

이렇게 하면 typeORM CLI를 쉽게 설정할 수 있어요.

1. typeORM CLI 설정

이미 ConfigService로 필요한 모든 설정을 추가했어요.

하지만 typeORM CLI는 ormconfig.json 파일과 함께 작동하며 올바른 설정이 있어야 해요. 또한 CLI를 실제 API 서버와 별도로 실행하고 싶어요. CLI를 사용하기 전에 설정 파일을 생성하므로 .gitignore-list에 추가해주세요. 설정 파일을 작성하는 퀵 도우미 스크립트를 추가해보죠.

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
import { configService } from "../config/config.service";
const fs = require("fs");
fs.writeFileSync("ormconfig.json", JSON.stringify(configService.getTypeOrmConfig(), null, 2));
```

그리고 npm 스크립트 작업을 추가하여 해당 스크립트를 실행하고 typeorm:migration:generate 및 typeorm:migration:run 명령어를 실행할 수 있습니다.

이렇게 하면 typeORM CLI 명령을 실행하기 전에 ormconfig가 생성됩니다.

```js
"pretypeorm": "(rm ormconfig.json || :) && ts-node -r tsconfig-paths/register src/scripts/write-type-orm-config.ts",
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
"typeorm:migration:generate": "npm run typeorm -- migration:generate -n",
"typeorm:migration:run": "npm run typeorm -- migration:run"
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

2. 마이그레이션 작성

이제 이 명령을 실행하여 초기 마이그레이션을 생성할 수 있습니다:

npm run typeorm:migration:generate -- my_init

이 명령은 typeORM을 데이터베이스에 연결하고 데이터베이스 마이그레이션 스크립트 my_init`timestamp`.ts(타입스크립트)를 생성하고 프로젝트의 마이그레이션 폴더에 넣습니다.

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

참고: 이 마이그레이션 스크립트를 소스 컨트롤에 커밋하고 파일을 읽기 전용으로 다루어야 합니다. 이 스크립트는 서로 위에 순서대로 작동합니다.

만약 어떤 것을 변경하고 싶다면, cli 명령어를 사용하여 맨 위에 다른 마이그레이션을 추가하는 것이 아이디어입니다.

![migration](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_3.png)

3. 마이그레이션 실행

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
npm run typeorm:migration:run
```

이 명령어는 아직 적용되지 않은 데이터베이스에 있는 모든 마이그레이션을 적용합니다. (이미 모든 것이 최신 상태인 경우 아무 작업도 수행하지 않음)

이제 API 서버 프로젝트를 실행하지 않고도 마이그레이션을 생성하고 실행하는 데 필요한 모든 도구를 갖추었습니다. 이렇게 하면 원할 때마다 다시 실행하거나 다시 만들거나 추가할 수 있어 개발 시 유연성이 높습니다.

그러나 프로덕션 또는 스테이지 환경에서는 배포 후 API 서버를 시작하기 전에 마이그레이션 스크립트를 자동으로 실행하는 것이 안전합니다.

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

그렇게 하면 start.sh 스크립트를 추가할 수 있어요.

마이그레이션을 자동으로 실행할지 여부를 제어하기 위해 환경 변수 RUN_MIGRATIONS=`0|1`을 추가할 수도 있어요.

```js
#!/bin/bash
set -e
set -x
if [ "$RUN_MIGRATIONS" ]; then
  echo "마이그레이션 실행 중";
  npm run typeorm:migration:run
fi
echo "서버 시작";
npm run start:prod
```

디버깅 및 데이터베이스 도구

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

와우, 우리 API 및 DB 설정이 작동하는 것 같네요! 하지만 우리 데이터베이스가 실제 데이터 모델을 잘 반영하고 있는지 확인해야 해요.

이를 확인하기 위해 CLI 스크립트 쿼리를 실행하거나 빠른 디버깅을 위해 UI 데이터베이스 관리 도구를 사용할 수 있어요.

PostgreSQL 데이터베이스를 사용할 때, 저는 pgAdmin을 사용해요.

이 도구는 현재 상황을 보기 위한 멋진 UI를 제공하는 강력한 도구에요. 그러나 다음과 같은 워크플로우를 추천해 드릴게요:

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

![Table Image](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_4.png)

이제 데이터베이스에 테이블이 생성된 것을 볼 수 있습니다.

1. 프로젝트에서 정의한 항목 테이블
2. 이 테이블에서 typeORM이 이미 실행한 마이그레이션을 추적하는 마이그레이션 테이블 (참고: 이 테이블을 읽기 전용으로 처리해야만 합니다. 그렇지 않으면 typeORM CLI가 혼란스러워질 수 있습니다.)

일부 비즈니스 로직 추가중

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

이제 비즈니스 로직을 추가해 봅시다.
데모를 위해 테이블에 있는 데이터를 반환하는 간단한 엔드포인트를 추가하겠습니다.

이를 위해 항목 컨트롤러와 항목 서비스를 추가할 것이고, NestJS CLI를 사용할 겁니다.

```js
nest -- generate controller item
nest -- generate service item
```

이렇게 하면 우리를 위한 기본 템플릿이 생성되고,
그런 다음 우리가 추가해야 할 내용은요:

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

'그리고 ItemModule안에서 물건들을 함께 연결하고, 그것을 AppModule에서 가져와요.

API를 시작한 후 curl 명령어를 통해 다음을 얻을 수 있어요:

```js
curl localhost:3000/item | jq
[] # << 데이터베이스에 아이템이 없음을 나타냅니다 - 멋지죠 :)
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

엔티티를 노출하지 마세요 - DTO 및 응답 추가하기

하나의 1대1 데이터 모델을 영속성을 통해 API를 통해 소비자에게 직접 노출시키지 않는 것이 아이디어입니다.

처음 프로젝트를 설정할 때 이것을 바로 하지 않는 것은 처음에는 이점이 직접적으로 보이지 않기 때문에 유혹을 받을 수 있습니다. 물론, 각 데이터 엔티티를 데이터 전송 객체로 래핑해야 하고 직렬화 및 역직렬화를 수행해야 해서 종종 보일러플레이트처럼 느껴질 수 있습니다.

항상 이런 설정을 권장합니다. 따라서 내부 데이터 모델(API to Database)과 외부 모델(API-consumer to API) 사이에 명확한 구분을 두게 됩니다. 이렇게 하면 사물을 분리시키고 장기적으로 유지보수를 더 쉽게할 수 있습니다.

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

더 많은 이점:

- 도메인 주도 설계 원칙 적용을 위한 분리
- 성능, 쿼리 최적화가 훨씬 쉽게 가능
- 진화, 버전 관리 — 동일한 지속성으로 다른 응답을 반환
- 테스트 용이성 — 모의(mocking)를 할 수 있음
  … 그리고 훨씬 더 많은 기능

그래서 우리는 데이터베이스의 항목 엔티티에서 채워진 ItemDTO 응답 클래스를 추가할 것입니다.
간단한 서비스와 응답 DTO는 다음과 같이 보일 수 있습니다.

참고: 이를 위해 `@nestjs/swagger`, `class-validator` 및 `class-transformer`를 설치해야 합니다.

이제 우리는 이 DTO를 간단하게 다음과 같이 사용할 수 있습니다:

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

OpenAPI (Swagger) 설정하기

DTO 접근 방식을 통해 API 문서 (openAPI 또는 스웨거 문서)를 생성할 수도 있습니다. 간단히 다음을 설치하면 됩니다:

```js
npm install --save @nestjs/swagger swagger-ui-express
```

그리고 main.ts 파일에 다음 몇 줄을 추가하세요.

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

그리고 다 됐어요:

![이미지 이름](/assets/img/2024-06-23-NestJSTypeORMandPostgreSQLfullexampledevelopmentandprojectsetupworkingwithdatabasemigrations_5.png)

해당 주제에 대한 자세한 정보는 여기서 확인하세요.

씨드 데이터 정의.

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

저희는 이제 화려한 비즈니스 로직을 통해 프로젝트를 확장하는 데 필요한 거의 모든 것을 갖췄어요. 프로젝트 작업 시 당신과 팀의 생산성을 실제로 향상시킬 수 있는 것은 데이터 씨드 스크립트입니다.

이 스크립트는 데이터베이스를 테스트용이나 더미 데이터로 설정합니다. 우리는 이미 데이터베이스 서버를 자동으로 생성하고 사용할 수 있는 빈 데이터베이스를 추가했다는 것을 기억하세요. 이제 우리는 해당 데이터베이스에 "의미 있는 더미 데이터"를 생성할 수 있는 스크립트를 추가할 거예요. 이것은 개발에 도움이 되며(모두가 동일한 데이터 집합으로 로컬에서 작업하지만, 또한 영속성 상태를 알 수 있기 때문에 테스트 시스템에 대해 통합 테스트 실행도 가능합니다).

우리는 스크립트를 작성하는 방법을, 이미 정의된 모델을 사용하도록 하며(필요하다면 서비스 레이어 등도 사용할 수 있습니다). 제어의 역전, 클래스 생성자에서의 의존성 주입을 통해 프로젝트의 리포지토리와 서비스의 인스턴스를 생성할 수 있습니다. 이렇게 하면 NestJS API 서버를 시작하지 않고도 TypeScript 파일에서 데이터베이스 연결을 제공하여 수동으로 생성할 수 있습니다.

이것은 정말 좋아요 — 이러한 유형의 시험 코드를 실행하여 코드를 시험하면서 실제 서버를 시작하기 전에 독립적으로 시드 프로세스를 실행하며, 시드 스크립트 논리가 실제 비즈니스 로직 코드로 빠져나가지 않으며 오히려 그것을 활용할 수 있습니다. 보통 제가 스크립트를 매우 일반적인 방식으로 작성해서 한 번에 한 번 실행되어도 다른 것에 의존하지 않고 랜덤 값을 무작위로 생성하여 "시드-id"를 넣어 작업하는 편입니다. 이렇게 하면 스크립트를 여러 차례 실행하여 계속해서 더 많은 데이터를 생성하지만 매번 실행할 때마다 뭔가 잘못 되지 않음이 좋아요.

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

저희 스크립트에서 데이터베이스 연결을 설정하기 위해서는 작성한 configService를 재사용하고 ts-node 모듈을 사용하여 실행하면 됩니다.

씨드 스크립트는 다음과 같이 생겼을 수 있습니다:

우리는 다음처럼 실행합니다

```js
npm run start:dev:db:seed
# 결과
# 완료 -> seed2302-1
# 완료 -> seed2302-2
# ...스크립트 실행 종료까지 기다립니다
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

API를 시작한 후에는 데이터베이스에서 이 데이터를 가져옵니다.

```js
curl localhost:3000/item | jq
[
 {
  "id": "393a370b-762b-44fb-9830-9526a1d6a685",
  "name": "seed8239-1",
  "description": "created from seed"
 },
 // ...
]
```

마지막으로

로컬에서 데이터베이스 상태를 관리하는 모든 도구를 설정하는 방법을 살펴보았습니다.

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

프로젝트 설정부터 모델, 후킹, 그리고 데이터베이스 작업까지.

모든 도구는 어떤 식으로든 코드에 의존하며 UI로 가서 버튼을 클릭하여 설정하는 대신에. 이 "코드" 접근 방식을 통해 일을 쉽게 복제할 수 있습니다. 새 팀원을 온보딩하거나, 혹은 2년 후 프로젝트를 다시 방문하여 설정 방법을 잊어버렸다면 — 매우 쉽게 처리할 수 있을 것입니다. 시작하려면 단순히 3~4개의 명령을 실행하면 되며 명령이 어떻게 작동하는지 알기 위해서는 프로젝트 파일을 살펴보기만 하면 됩니다. 왜냐하면 모든 것이 코드로 제공되기 때문입니다.

저는 이를 통해 NestJS, typeORM, 그리고 PostgreSQL 데이터베이스와 함께 작업할 때 여러분을 빠르게 출발시킬 수 있었기를 바랍니다. 여러분은 어떠신가요? 비슷하거나 더 나은 도구/접근 방식이 있으신가요? 아래 댓글에 알려주시면 감사하겠습니다!

건배!
