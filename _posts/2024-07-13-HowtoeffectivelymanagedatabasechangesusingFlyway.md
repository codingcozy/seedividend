---
title: "Flyway로 데이터베이스 변경 효과적으로 관리하는 방법"
description: ""
coverImage: "/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_0.png"
date: 2024-07-13 20:54
ogImage:
  url: /assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_0.png
tag: Tech
originalTitle: "How to effectively manage database changes using Flyway"
link: "https://medium.com/itnext/how-to-effectively-manage-database-changes-using-flyway-6a4c6a727f42"
isUpdated: true
---

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_0.png" />

현대 소프트웨어 개발은 버전 관리 없이는 혼란스러울 것입니다. 버전 관리는 업데이트를 추적하고 변경 이력을 유지하는 데 중요합니다. 응용 프로그램 논리 뿐만 아니라 데이터베이스에도 버전 관리가 필요합니다.

소프트웨어와 데이터는 분리할 수 없습니다. 대부분의 소프트웨어 시스템은 데이터베이스를 필요로 합니다. 시스템 논리가 데이터베이스에서 데이터에 액세스하는 경우 데이터 형식을 알아야 하며, 시스템 논리는 필연적으로 데이터베이스의 데이터 구조인 데이터 스키마와 긴밀하게 결합됩니다.

데이터 스키마는 소프트웨어와 함께 진화하며 새로운 기능 및 버그 수정이 적용됩니다. 소프트웨어 개발자는 소프트웨어 개발 및 배포 과정에서 소프트웨어 및 데이터베이스 스키마의 버전을 유지합니다. 데이터베이스 변경 사항을 유지하는 수동 프로세스는 예전에는 잘 작동했지만 개발이 느리고 폭포수 모델이었을 때였습니다. 그러나 현대 소프트웨어 개발에서는 새로운 기능을 자주 출시하는 빠른 프로세스로 변화하면서 소프트웨어가 혼란스러워지고 제어를 벗어납니다.

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

문제는 데이터베이스의 변경 배포가 응용 프로그램 코드와 다르다는 점입니다. 도커와 쿠버네티스의 보급 덕분에, 현대 소프트웨어 배포는 단순히 기존 인스턴스를 제거하고 최신 버전을 롤아웃하는 것으로 이루어지지만, 전체 데이터베이스를 정리하고 새로운 데이터 스키마를 다시 구축하는 것은 재앙이 될 수 있습니다! 따라서 접근 방식이 다릅니다. 기존 데이터를 보존하면서 데이터베이스에 델타 변경을 적용합니다.

예를 들어, 아래 다이어그램은 일련의 소프트웨어 버전 및 해당 데이터베이스 업데이트를 보여줍니다. 데이터 스키마의 변경은 연속적인 순서여야 합니다. 시스템을 v0.1에서 v1.3으로 업그레이드해야 하는 경우, 응용 프로그램 배포는 기존 v0.1을 간단히 제거하고 v1.3을 배포할 수 있습니다. 그러나 목표 버전까지 데이터 스키마 업데이트를 하나씩 적용해야 합니다. 테이블에 열을 추가하기 전에 이름을 바꾸는 순서를 혼합하면 데이터 스키마 스크립트가 실패할 것입니다.

데이터 변경을 관리하기 위해 수동 프로세스에 의존하는 것은 고통스럽고 오류 발생 가능성이 높습니다. 작은 실수라도 전체 시스템을 망칠 수 있기 때문에 계획하고 리허설하는 데 시간이 걸립니다. 마찬가지로, 전체 데이터베이스를 다시 구축해야 하는 경우, 예를 들어 새로운 테스트 환경을 설정하는 것은 모든 델타 변경을 기준 스키마로 통합하는 것이 쉽지 않기 때문에 번거로운 작업일 수 있습니다.

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

# 데이터베이스 버전 관리

애플리케이션 코드의 버전 관리가 일반적이며 GitHub와 같은 소스 버전 관리 도구 사용이 흔한 실천법이지만, 데이터 스키마에는 그런 실천법이 없습니다.

데이터베이스 스키마가 발전함에 따라 버전 관리를 도와줄 적절한 도구가 필요합니다. Flyway는 업계에서 제공되는 도구 중 하나로, 이 간단한 도구를 사용하면 다음과 같은 목표를 달성할 수 있습니다:

- 시퀀스대로 데이터베이스 업데이트 적용
- 데이터 스키마 변경 이력 추적
- 대상 버전까지 데이터 스키마 재구성

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

아래 다이어그램은 데이터베이스 변경 관리 및 배포 프로세스를 설명합니다. 개발자들은 GitHub와 같은 저장소에 스키마 변경 스크립트를 유지합니다. 배포 시에는 데이터베이스 마이그레이션을 위해 Flyway의 명령줄을 실행합니다. "마이그레이션"은 데이터베이스에 변경을 적용하는 것을 의미합니다.

Flyway는 데이터베이스 스키마 히스토리를 확인하여 실행할 데이터 스키마 스크립트 목록을 결정합니다. 업데이트가 적용되면 최신 변경 사항을 위해 스키마 히스토리가 업데이트됩니다. 히스토리 테이블은 모든 이전 변경 사항과 순서를 추적합니다. 따라서 우리는 현재 버전 및 이전 변경 사항을 확인해야 할 때마다 이 테이블을 참조할 수 있습니다.

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_2.png" />

이 글에서는 Flyway의 사용법과 예시 그리고 데이터베이스 변경 관리에 대해 살펴보겠습니다.

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

# Flyway 한눈에 보기

Flyway는 개발자 친화적이며, 여러 유형의 설정을 제공합니다 — 명령행, 도커, 메이븐 및 그레이들 플러그인. 로컬 머신에 설치하지 않고 도커 이미지를 사용하는 것이 권장됩니다. 도커 컨테이너를 실행하고 버릴 수 있기 때문입니다.

다음 명령어를 시도해 보세요. 이 명령은 도커 이미지를 실행하고 flyway 명령어의 사용법을 보여줍니다.

```js
docker run --rm flyway/flyway
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

테이블 태그를 마크다운 형식으로 변경해 주세요.

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

여기 도커 컴포즈 정의가 있어요. 빠르게 참고하세요:

```js
version: "3.1"
services:
  mysql:
    image: mysql:latest
    ports:
      - "3306:3306"
    volumes:
      # - ./mysql-data:/var/lib/mysql
      - ./mysql-script:/docker-entrypoint-initdb.d
    environment:
      - MYSQL_ROOT_PASSWORD=passme
    healthcheck:
      test: '/usr/bin/mysql --user=root --password=passme --execute "SHOW DATABASES;"'
      interval: 2s
      timeout: 20s
      retries: 10

  phpmyadmin:
    depends_on:
      mysql:
        condition: service_healthy
    image: phpmyadmin:latest
    ports:
      - "8080:80"
    environment:
      PMA_HOST: mysql
```

데모 레포지토리에는 스키마 설정을 위한 스크립트 세트가 함께 있어요:

- V1\_\_add_product_table.sql
- V2\_\_add_customer_table.sql
- V3\_\_drop_product_remarks_column.sql

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

Flyway는 명령줄 도구입니다. 실행이 완료되면 도커 컨테이너가 종료됩니다. 우리는 Flyway에게 최신 버전까지 사용 가능한 데이터 스키마 스크립트를 적용하도록 migrate 명령을 실행하도록 지시합니다.

Flyway가 실행되면 파일 시스템(default location: /flyway/sql)에서 스키마 스크립트를로드하고 MySQL 데이터베이스에 적용합니다. 데이터베이스 연결 및 스키마 스크립트 위치와 같은 구성은 환경 변수를 통해 모두 지정됩니다.

```js
docker run --rm \
-e FLYWAY_URL=jdbc:mysql://mysql:3306/ecommerce?allowPublicKeyRetrieval=true \
-e FLYWAY_USER=root \
-e FLYWAY_PASSWORD=passme \
-v ./flyway/sql:/flyway/sql \
--network flyway-demo_default \
flyway/flyway:latest migrate
```

Flyway가 3개의 데이터 스키마 스크립트를 적용하는 것을 나타내는 출력 메시지가 표시됩니다.

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

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_4.png" />

http://localhost:8080으로 이동하여 docker compose 파일에 지정된 암호로 root 계정을 사용하여 phpMyAdmin(MySQL의 Web UI)에 로그인하세요.

스크립트에 의해 생성된 테이블 이외에도 Flyway는 버전 이력을 추적하기 위해 flyway_schema_history라는 테이블을 생성합니다. 데이터 스키마 스크립트에 대한 이력 테이블에는 3개의 항목이 있습니다.

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_5.png" />

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

# 새로운 스키마 변경 사항 이전하기

Flyway를 통해 고객 테이블에 account_type이라는 새로운 열을 추가하는 연습을 해 봅시다.

```js
ALTER TABLE customer ADD COLUMN account_type char(1);
```

SQL 스크립트를 Flyway에 등록하려면 파일 이름 규칙인 V[버전]\__[설명].sql에 따라 등록하면 됩니다. [버전]은 V1.1, V1_1, V202401 등과 같이 언더스코어('_') 또는 점('.')이 포함된 번호일 수 있습니다.

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

버전과 설명 사이의 구분자는 2개의 밑줄 문자로 이름 지정 규칙에 따라 변경해주세요.

스크립트를 V3.1\_\_add_customer_account_type.sql로 저장하고 sql 폴더에 넣어두세요.

이제 Flyway migrate 명령어를 실행하세요.

이 명령은 폴더 안의 스크립트 파일을 flyway_schema_history 테이블의 현재 버전과 비교합니다. V3.1이 더 최신 버전이므로 데이터베이스에 스키마 변경이 적용됩니다.

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

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_6.png" />

작업이 완료되면 고객 테이블에 새로운 열이 표시됩니다.

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_7.png" />

flyway_schema_history에 새 항목이 삽입되었으며 더 높은 버전 V3.1이 적용되었음을 나타냅니다.

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

![Database Changes](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_8.png)

# 베이스라인 버전으로 데이터베이스 구축하기

여러 데이터베이스 변경 내용이 있을 때, 기준선 버전을 만들면 이전 변경 사항을 모두 하나의 스크립트로 통합하여 데이터베이스 스키마 설정을 간단하게 할 수 있습니다. 다음 스크립트로 V3까지의 베이스라인을 만들어봅시다:

```sql
#B3__initial_schema.sql

CREATE TABLE customer (
    id varchar(255),
    name varchar(255),
    email varchar(255),
    phone_no varchar(255),
    address varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id varchar(255),
    name varchar(255),
    price decimal(10,2),
    PRIMARY KEY (id)
);
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

베이스라인 버전의 파일 네이밍 규칙은 B[버전]\_\_[설명].sql입니다.

스크립트를 B3\_\_initial_schema.sql로 저장하세요. 현재 도커 컨테이너를 제거하고 다시 생성하세요:

```js
> docker compose down
> docker compose up
```

Flyway 마이그레이션 명령을 실행하고 메시지가 2개의 마이그레이션이 완료되었다고 나옵니다:

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

![Flyway](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_9.png)

히스토리 테이블을 살펴보면, 기준선인 B3만 적용되었고 V1, V2 및 V3은 적용되지 않았습니다. Flyway는 기준선 버전과 동일하거나 낮은 스크립트 파일은 건너뜁니다. 기준선 버전 및 더 높은 버전의 스크립트만 실행됩니다.

![Flyway](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_10.png)

# 마이그레이션 오류 처리

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

스크립트 이관 오류가 발생한 경우 Flyway는 이를 히스토리 테이블에 기록합니다. 오류가 수정될 때까지 다른 버전의 이관을 허용하지 않습니다.

우선 고객 레코드 삽입을 위한 새로운 버전 V4을 생성해 봅시다:

```js
# V4__insert_customers.sql

INSERT INTO customer (id, name, email, phone_no, address, account_type)
VALUES ('A001', 'Martha J. Turnbow', 'MarthaJTurnbow@dayrep.com', '661-638-7358', '3078 Atha Drive, Bakersfield, CA 93301', 'A');
```

Flyway migrate를 실행하여 V4 SQL 스크립트를 적용하세요.

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

그럼 다시 동일한 주 키로 다른 고객을 추가하는 V4.1 스크립트를 만들어보세요:

```js
# V4.1__insert_customer_again.sql

INSERT INTO customer (id, name, email, phone_no, address, account_type)
VALUES ('A001', 'Michael L. Riche', 'MichaelLRiche@armyspy.com', '203-667-5345', '32727 Asylum Avenue, Stamford, CT 06995', 'B');
```

Flyway를 다시 실행하여 새 버전을 적용하세요. 앗! 중복 주 키로 인해 SQL 스크립트가 실패했습니다.

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_11.png" />

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

오류는 히스토리 테이블에도 기록됩니다. V4.1 항목의 success 필드는 "0"으로 오류를 의미합니다.

![이미지](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_12.png)

오류가 발생했으므로 Flyway가 어떠한 버전 업데이트도 차단합니다. V4.1 스크립트의 오류를 수정했다 하더라도 작동하지 않습니다.

오류를 수정하려면 수리 명령을 실행하십시오.

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
docker run --rm \
-e FLYWAY_URL=jdbc:mysql://mysql:3306/ecommerce?allowPublicKeyRetrieval=true \
-e FLYWAY_USER=root \
-e FLYWAY_PASSWORD=passme \
--network mysql_default \
flyway/flyway:latest repair
```

위의 명령은 히스토리 테이블에서 실패한 이전 마이그레이션을 정리합니다.

![2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_13](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_13.png)

V4.1이 히스토리 테이블에서 제거되었기 때문에 SQL 스크립트를 수정하고 다시 마이그레이션을 실행할 수 있습니다.

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

![이미지](/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_14.png)

# 대상 버전까지 데이터 스키마 빌드

일반적으로 우리는 개발을 위해 최신 버전을 얻습니다. 혹시 몇몇 고객들이 이전 버전을 사용 중일지도 모릅니다. 그렇다면 버그 수정과 테스트를 위해 이전 버전을 검색해야 합니다.

최신 버전 V4로, 이전 버전 V3.1을 기반으로 데이터베이스를 다시 만들어 봅시다.

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

먼저, 기존 MySQL 컨테이너를 중지하고 다시 생성하기 위해 도커 명령어를 실행하세요.

그런 다음, 환경 변수 FLYWAY_TARGET=3.1을 통해 대상 버전이 지정된 상태로 Flyway migrate를 실행하세요.

```js
docker run --rm \
-e FLYWAY_URL=jdbc:mysql://mysql:3306/ecommerce?allowPublicKeyRetrieval=true \
-e FLYWAY_USER=root \
-e FLYWAY_PASSWORD=passme \
-e FLYWAY_TARGET=3.1 \
-v ./flyway/sql:/flyway/sql \
--network flyway-demo_default \
flyway/flyway:latest migrate
```

마이그레이션이 V3.1까지 적용되었습니다. 새 버전의 모든 데이터 스크립트들은 무시됩니다.

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

<img src="/assets/img/2024-07-13-HowtoeffectivelymanagedatabasechangesusingFlyway_15.png" />

또는 명령 인수로 대상 버전을 지정할 수도 있습니다.-target="3.1"

```js
docker run --rm \
-e FLYWAY_URL=jdbc:mysql://mysql:3306/ecommerce?allowPublicKeyRetrieval=true \
-e FLYWAY_USER=root \
-e FLYWAY_PASSWORD=passme \
-v ./flyway/sql:/flyway/sql \
--network flyway-demo_default \
flyway/flyway:latest migrate
flyway/flyway:latest -target="3.1" migrate
```

# 마지막으로 생각해보면

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

Flyway는 데이터베이스 변경 버전 관리를 쉽게 도와주는 간단한 도구입니다. 데이터베이스에 SQL 스크립트를 직접 실행하는 대신 Flyway를 통해 SQL 스크립트를 적용하면 버전 관리와 감사 기능을 제공받을 수 있습니다. 새로운 데이터베이스를 프로비저닝할 때(예: 테스트 또는 로컬 개발 환경), Flyway 명령 하나로 필요한 모든 데이터베이스 스키마 및 구성 데이터를 손쉽게 설정할 수 있습니다.

더불어, Flyway를 CI/CD 파이프라인에서 실행할 수도 있습니다. Jenkins 플러그인인 Flyway Runner과 같은 툴을 사용하면 파이프라인에서 Flyway 명령 실행 단계를 추가할 수 있습니다. 이를 통해 데이터베이스 릴리스를 자동화하고 기존 표준 소프트웨어 릴리스 파이프라인에 원활하게 통합할 수 있습니다.
