---
title: "Kubernetes에서 Vault와 Spring Boot로 Postgres 동적 비밀 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_0.png"
date: 2024-07-02 23:18
ogImage:
  url: /assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_0.png
tag: Tech
originalTitle: "How to set up dynamic secrets for Postgres using Vault and Spring Boot on Kubernetes"
link: "https://medium.com/@martin.hodges/how-to-set-up-dynamic-secrets-for-postgres-using-vault-and-spring-boot-on-kubernetes-757f759d22b4"
isUpdated: true
---

이 기사에서는 Hashicorp Vault 시크릿 매니저를 사용하여 Spring Boot 애플리케이션에 동적 Postgres 자격 증명을 추가하는 방법에 대해 살펴보겠습니다.

![이미지](/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_0.png)

최근에, 제가 Kind Kubernetes 클러스터에 스켈레톤 Spring Boot 애플리케이션을 만들었습니다. 이 코드 베이스에서 Vault 동적 시크릿을 Postgres 자격 증명으로 사용하는 방법을 보여드리겠습니다. 해당 애플리케이션 및 모든 구성 파일에 대한 코드는 이 GitHub 저장소에서 찾을 수 있습니다.

# 자격 증명 관리의 중요성

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

당신의 데이터베이스는 아마도 인프라에서 가장 중요한 시스템 중 하나일 것입니다. 사용자와 고객의 데이터를 보유하고 있습니다. 불법적인 사람들이 접근하려고 하는 시스템입니다.

당신은 데이터베이스에 대한 액세스를 주의 깊게 그리고 안전하게 제어해야 한다는 것을 분명히 인지해야 합니다.

이를 위한 한 가지 방법은 애플리케이션이 데이터베이스에 액세스할 때 사용하는 자격 증명(사용자 이름과 암호)을 정기적으로 교체하는 것입니다. 이렇게 함으로써 자격 증명이 유출되더라도 그것들이 무효화되기 전에 짧은 시간 동안만 사용될 수 있습니다.

이 글은 Kubernetes, Vault, Postgres 및 Spring Boot 애플리케이션을 사용하여 자격 증명을 자동으로 회전하는 방법을 살펴봅니다.

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

# 작동 방식

Vault에는 데이터베이스 시크릿 엔진이 있어서 데이터베이스에 액세스할 수 있는 사용자를 관리할 수 있습니다.

어플리케이션이 데이터베이스에 연결하려고 할 때 Vault에게 사용자 이름과 비밀번호를 요청합니다. Vault는 시크릿 캐시를 확인하고, 데이터베이스 자격 증명을 찾지 못하면 데이터베이스에 사용자를 생성하여 사용자 이름과 비밀번호를 캐시에 저장한 뒤 어플리케이션에 반환합니다.

다음에 어플리케이션이 자격 증명을 요청하면 Vault는 캐시에서 찾게 됩니다. 최대 수명 시간(TTL)을 초과하지 않은 한, 이전 자격 증명이 반환됩니다. 기한이 만료되면 데이터베이스에 새 자격 증명이 생성되고 이전 자격 증명은 삭제됩니다. 그리고 캐시된 자격 증명은 새 자격 증명으로 대체됩니다.

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

요런 경우가 최적인 것 같아요. 애플리케이션이 모르는 채 자격 증명이 자동으로 교체됩니다.

그러나 Spring Boot 애플리케이션을 Vault에 통합할 때 Spring Cloud Vault 프레임워크는 예상했던 대로 작동하지 않는다는 점에 주의해야 합니다. 자격 증명이 만료된 경우, 애플리케이션이 재시작될 때까지 자동으로 교체되지 않습니다. 이는 연결 풀이나 활성 트랜잭션을 망가뜨리지 않도록 일부러 그렇게 설계된 것입니다.

자격 증명을 회전시키기 위해 애플리케이션을 다시 시작하는 것은 무식한 방법이며, 저는 이 것을 추천하지 않습니다.

## 대체 솔루션

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

만약 Spring Cloud Vault를 사용하고 싶지 않다면, 대안적인 해결책이 있습니다.

우리는 Vault Agent를 사용해서 우리 애플리케이션을 대신해 자격 증명을 얻고 애플리케이션에 삽입할 수 있습니다.

Vault Agent는 주 애플리케이션의 사이드카입니다. 이는 Pod 내에서 자체적인 두 번째 컨테이너 안에 있습니다. Vault로부터 자격 증명을 가져와 만료되면 갱신을 처리합니다.

자격 증명을 획득한 후, Vault Agent는 메인 애플리케이션 내로 파일로 삽입하여 볼륨을 사용합니다. 이 볼륨은 두 컨테이너에 모두 장착되며 Spring Boot 애플리케이션의 컨테이너에도 장착됩니다.

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

해당 애플리케이션은 이제 자격 증명을 동적으로 읽고 데이터베이스에 액세스하는 데 사용할 수 있습니다.

우리가 할 일은 다음과 같습니다.

## 설정

다음 다이어그램에 나와 있는 것처럼 설정해야 할 부분이 네 가지 있습니다.

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

![Vault and Spring Boot on Kubernetes](/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_1.png)

- 어플리케이션을 대표로 하는 Vault Agent가 Vault로부터 시크릿을 요청해야 합니다. 이를 위해 올바른 정책이 연관된 유효한 Vault 토큰이 필요합니다 (myapp-db-policy).
- 토큰을 얻기 위해 Vault Agent는 Kubernetes 자격 증명(JWT)을 사용해 Vault와 인증해야 합니다. 이는 Kubernetes ServiceAccount(myapp-sa)로부터 얻은 것으로, 올바른 접근 정책이 적용된 Vault 액세스 토큰을 제공합니다.
- Vault는 Vault Agent의 자격 증명을 확인할 수 있어야 합니다. 이를 위해 Vault는 쿠버네티스 API를 통해 Kubernetes에 요청합니다. 이를 위해 Vault는 자체 자격 증명이 필요합니다.
- Vault Agent와 마찬가지로 Vault는 설치될 때 생성된 자체 ServiceAccount로부터 자격 증명을 얻습니다. (이는 Vault Agent와 동일한 클러스터에서 Kubernetes를 실행 중이기 때문에 (거의) 자동으로 이루어집니다. 외부에서 실행하거나 다른 클러스터에서 실행 중인 경우 추가 구성이 필요합니다)

이제 Vault Agent는 Vault에 액세스하고 데이터베이스 시크릿을 검색할 수 있으므로 새로운 흐름이 발생합니다.

![Vault and Spring Boot on Kubernetes](/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_2.png)

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

- Vault 에이전트는 이전에 획득한 Vault 액세스 토큰과 연결된 myapp-db-policy와 관련하여 Vault에서 데이터베이스 자격 증명을 요청합니다.
- Vault는 필요한 자격 증명을 보유하고 있지 않음을 깨닫거나 (또는 만료되었음을 인지하면), Postgres에게 myapp-db-role에서 가져온 문장을 사용하여 새 자격 증명을 생성하도록 요청합니다. 그리고 myapp-db-cnx 연결을 통해 데이터베이스에 연결합니다.
- 자격 증명을 생성한 후, 이를 Vault 에이전트에게 전달하여 공유된 인-메모리 볼륨에 저장합니다.
- 저희 Spring Boot 애플리케이션은 자격 증명 파일을 폴링하고 변경 사항이 있을 때 데이터 소스를 업데이트합니다.
- 응용 프로그램이 데이터베이스에 액세스하려는 경우, Vault에서 마지막으로 생성된 자격 증명을 사용합니다.

자격 증명이 만료되고 새로운 자격 증명이 생성되는 사이에 타이밍 레이스가 발생할 수 있다고 생각하실 수도 있습니다. 그렇다고 맞는 말이지만, 타이밍은 기존 자격 증명과 새 자격 증명이 모두 작동하는 유예 기간이 있다는 점을 알아두셔야 합니다. 응용 프로그램이 자격 증명 파일을 자주 폴링하여 이전 자격 증명이 만료되기 전에 연결을 업데이트하도록 충분히 빈도를 조정해야 합니다.

이렇게 할 일이 많아 보이시죠!

다음을 설정해야 합니다:

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

- Postgres 자격 증명 관리를 위한 보이트
- 쿠버네티스 인증을 위한 보이트
- Spring Boot 애플리케이션이 회전하는 데이터베이스 자격 증명을 사용하도록 설정
- 어플리케이션을 배포하여 모두 작동하도록 함

## Vault 설정

Vault 설정을 관리하는 몇 가지 옵션에 대해 간략히 설명하겠습니다. Vault를 구성하는 방법은 다음과 같습니다:

- 사용자 인터페이스/콘솔을 통해
- 명령줄 인터페이스(CLI)를 통해
- API를 통해

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

어떤 설정 과정도 반복 가능하고 빠르게 이루어져야 합니다. 이렇기 때문에 콘솔의 사용은 배제됩니다. 설정이 예상대로 작동하는지 확인하는 데는 유용하지만, 실수 없이 해야 하는 일인 만큼 사람이 클릭을 해야 합니다.

CLI를 사용하면 매우 긴 명령어 라인이 되어 관리하기 어려워집니다. 우리가 사용하는 Vault 이미지는 파일 시스템에 구성 파일을 작성할 수 없기 때문에 이러한 명령어들은 스크립팅할 수 없습니다. CLI의 장점은 --output-curl-string 옵션을 추가하면 API와 함께 사용할 curl 명령어 라인을 제공한다는 점입니다. 이 옵션은 명령어 라인의 맨 뒤가 아닌, 예상대로 맨 앞에 위치해야 한다는 점을 명심해야 합니다.

이런 상황에서 API가 남게 되는데, 이것이 매우 유용하고 개발 머신의 명령어 라인에서 사용할 수 있는 GitHub 저장소에 파일을 추가할 수 있게 해줍니다.

그래서 이 글에서는 curl 명령어와 구성 파일을 사용하여 API를 활용했습니다. 이를 위해 Vault 액세스 토큰이 필요합니다.

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

Vault를 설치할 때 받은 액세스 토큰을 기반으로 환경 변수를 설정하세요:

```js
export VAULT_TOKEN=<ROOT_TOKEN>
```

이제 아래에 제공된 명령어를 (대부분) 복사하여 붙여넣을 수 있습니다.

# 1. Vault를 사용하여 Postgres 자격 증명 관리하기

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

벌트는 다음과 같이 설정되어 있어야 합니다:

- 데이터베이스 자격 증명을 관리하기 위한 데이터베이스 엔진 (myapp-db)
- 저희 데이터베이스에 대한 연결 (myapp-db-cnx)
- 자격 증명을 생성하고 회전할 수 있는 데이터베이스 역할 (myapp-db-role)

## 데이터베이스 엔진 활성화

Vault가 데이터베이스 자격 증명을 관리하는 데 도움을 주려면 데이터베이스 엔진을 활성화해야 합니다.

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

Vault에서 시크릿 엔진을 활성화하려면 마운트 포인트에서 수행해야 합니다. 이 글에서는 'myapp-db'를 마운트 포인트로 선택했습니다. 이를 위해 먼저 엔진의 구성을 설정해야 합니다.

k8s/vault/enable-db-engine.json

```json
{
  "type": "database",
  "description": "myapp을 위한 데이터베이스 엔진",
  "config": {
    "options": null,
    "default_lease_ttl": "1h",
    "max_lease_ttl": "24h",
    "force_no_cache": false
  },
  "local": false,
  "seal_wrap": false,
  "external_entropy_access": false,
  "options": null
}
```

이렇게 하면 기본 Time To Live (TTL)이 1시간으로 설정되며, 이 시간 이전에 자격 증명을 새로 고칠 필요가 있습니다. 24시간이 기본 최대 TTL로 설정됩니다. 이 시간이 지나면 자격 증명을 더 이상 새로 고칠 수 없고 다시 만들어야 합니다. 이러한 기본값은 나중에 오버라이드할 수 있습니다.

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

자, 이제 엔진을 활성화합니다:

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/sys/mounts/myapp-db -d @k8s/vault/enable-db-engine.json
```

우리는 이제 데이터베이스 엔진을 설정했습니다. Vault 콘솔에 액세스할 수 있다면, 사용자 인터페이스(UI)의 Secrets Engine 섹션에서 엔진을 볼 수 있어야 합니다.

## 데이터베이스에 연결하기

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

Vault는 사용자 자격 증명을 생성하고 삭제하기 위해 데이터베이스에 연결해야 합니다. 이를 위해 데이터베이스 엔진 내에서 구성된 연결을 사용합니다.

다시 한 번 강조하면, 데이터베이스에 연결하는 구성을 가진 파일을 생성합니다. 만약 함께 따라오고 계신다면, 쿠버네티스 클러스터에 'myapp'이라는 데이터베이스가 있는 포스트그레스 클러스터를 설정해두어야 합니다. 이것이 우리가 연결하고자 하는 데이터베이스입니다.

k8s/vault/myapp-db-cnx.json

```js
{
  "plugin_name": "postgresql-database-plugin",
  "allowed_roles": "myapp-db-role",
  "connection_url": "postgresql://{username}:{password}@db-cluster-rw.pg.svc:5432/myapp",
  "max_open_connections": 5,
  "max_connection_lifetime": "5s",
  "username": <CREATE_USER_USERNAME>,
  "password": <CREATE_USER_PASSWORD>
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

이 연결은 사용자 생성에만 사용됩니다. 그래서 연결 수명이 매우 짧고 연결 수가 낮습니다. 또한 이 연결은 myapp-db-role을 기반으로 사용자를 생성할 수 있도록 허용합니다.

또한 데이터베이스 클러스터 읽기/쓰기 서비스 (db-cluster-rw.pg.svc)에 대한 내부 DNS 이름으로 연결 문자열을 설정했음을 주의하세요. 이는 이러한 구성을 다른 클러스터에서 사용할 수 있도록 하기 위한 것입니다.

'username'과 'password' 필드는 Vault가 생성하는 자격 증명을 추가해야 하는 위치를 알기 위해 사용되는 템플릿입니다. 특히 myapp 데이터베이스를 대상으로합니다.

아직 정의하지 않은 두 필드인 `CREATE_USER_USERNAME`와 `CREATE_USER_PASSWORD`가 있음을 알 수 있습니다. 개발 단계에서는 postgres 슈퍼 사용자를 사용할 수 있지만, 저는 제가 생산 환경을 구성하고 있다는 습관을 들이는 것을 선호합니다. 그렇게 하면 나중에 본격적인 운영 환경에 도달했을 때 무엇을 해야 하는지 알게 될 것입니다.

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

다음으로는 Vault에서 사용할 자격 증명을 생성할 겁니다. create_users라는 사용자를 만들 거에요.

데이터베이스 Pod를 다음 명령어로 찾아보세요:

```bash
kubectl get pods -n pg
```

그런 다음 데이터베이스를 위한 명령줄을 얻고 PostgreSQL CLI에 들어가세요 (db-cluster-1을 데이터베이스 Pod의 이름으로 변경하세요):

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
kubectl exec -it db-cluster-1 -n pg -- psql
```

포스트그레스에서 사용자는 로그인 권한이 있는 역할입니다. 저희 경우에는 사용자가 로그인할 수 있도록 해주어야 하므로 사용자를 생성할 것입니다. 아래의 코드를 사용해주세요 (`` 필드에 자신의 값으로 대체해주세요):

```js
create user create_users with password '<내 초보 비밀번호>' createrole;
grant connect on database myapp to create_users;
```

이제 이 자격 증명을 연결 파일에서 사용할 수 있습니다.

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

이전에 활성화한 Vault 데이터베이스 엔진에 대한 연결 구성을 다음과 같이 적용하세요:

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/myapp-db/config/myapp-db-cnx -d @k8s/vault/myapp-db-cnx.json
```

우리는 이 연결을 myapp-db-cnx로 호출하고 있습니다. 데이터베이스 권한이나 자격 증명에 문제가 있는 경우 연결이 이루어지지 않을 수 있으며 데이터베이스에서 반환되는 오류를 확인할 수 있습니다.

이 단계는 거의 완료되었습니다. UI 내에서 연결을 볼 수 있어야 합니다. 마지막으로 우리의 연결 사용자를 안전하게 보호하는 작업이 남았습니다.

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

지금은 create_users의 암호가 설정 파일을 통해 접근 가능할 것으로 생각됩니다. Vault를 사용하는 장점 중 하나는 Vault만이 이 사용자의 암호를 회전시킬 수 있게 함으로써 더 이상 여러분 외에는 액세스할 수 없게 해줍니다!

UI에서 연결을 찾은 다음 루트 자격 증명 회전 버튼을 클릭하세요. 회전이 완료되면 연결이 완료되어 사용할 준비가 됩니다.

## Vault에 사용자 생성 방법 알려주기

Vault 데이터베이스 엔진이 Postgres 데이터베이스에 사용자를 생성하는 방법을 알고 있더라도, 여전히 사용자를 설정하는 방법을 알려줘야 합니다. 이는 특히 권한에 관련하여 사용자를 어떻게 설정하길 원하는지를 Vault에 알려줘야 하기 때문입니다. 우리는 SQL 명령 템플릿을 제공하여 Vault에게 어떻게 할 것인지 알려줍니다.

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

Vault 데이터베이스 엔진은 데이터베이스 역할 시스템을 사용하여 사용자를 올바른 권한으로 생성하는 방법을 지정합니다. 이 데이터베이스 역할은 SQL 명령어 템플릿을 보유하고 있습니다.

이전에 엔진에서 구성한 허용된 역할과 일치하는 myapp-db-role이라는 역할을 생성해 보겠습니다.

먼저 Vault 역할을 정의할 구성 파일을 생성해주세요:

```js
k8s / vault / myapp - db - role.json;
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

{
"db_name": "myapp-db-cnx",
"creation_statements": "CREATE ROLE \"{name}\" WITH LOGIN INHERIT PASSWORD '{password}' IN ROLE \"app-user\" VALID UNTIL '{expiration}';,ALTER USER \"{name}\" SET ROLE = \"app-user\";",
"default_ttl": "10m",
"max_ttl": "1h"
}

여기서 아래 사항들을 확인할 수 있어요:

- 저희 데이터베이스 연결인 myapp-db-cnx를 참조하고 있어요.
- 생성할 사용자에게 데이터베이스 내 우리의 스키마 myapp에서의 모든 권한을 부여하며, 이 사용자로 생성된 모든 객체의 소유자가 일시적 사용자가 아니라 app-user로 설정되도록 하는 것을 보장해요.
- 기본 TTL과 최대 TTL 매개변수를 덮어쓰기합니다.

생성 문을 당신의 필요에 맞게 수정해야 해요. 제가 제안드리는 바는, 프로덕션 환경에서는 사용자가 어떤 데이터를 삭제하지 못하도록 하는 것이 좋을 수도 있지만, 이는 다른 날의 더 깊은 토론으로 넘어가죠.

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

이제 이 파일을 사용하여 Vault 데이터베이스 엔진을 구성하십시오:

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/myapp-db/roles/myapp-db-role -d @k8s/vault/myapp-db-role.json
```

이제 콘솔을 사용하여 이 역할을 찾고 새 자격 증명을 생성할 수 있어야 합니다.

임대된 자격 증명을 사용하여 데이터베이스 클라이언트로 로그인하여 임시 자격 증명으로 작업을 수행할 수 있어야 합니다. 어쨌든 10분 동안!

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

이제 Volt와 데이터베이스 통합이 완료되었습니다.

# 2. Vault와 Kubernetes 통합

이 솔루션에는 두 가지 인증 프로세스가 관련되어 있습니다. 이 프로세스들은 다음과 같은 필요성을 중심으로 구성되어 있습니다:

- Vault 에이전트가 Volt로부터 시크릿을 요청합니다.
- Volt가 Kubernetes에게 Volt 에이전트의 신원을 확인하도록 요청합니다.

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

첫 번째 경우에는 애플리케이션을 대행하여 행동하는 Vault 에이전트가 Vault에 대해 인증을 받을 수 있어야 합니다.

두 번째 경우에는 Vault가 쿠버네티스와 자체적으로 인증할 수 있어야 합니다. 이렇게 하면 쿠버네티스에게 Vault 에이전트의 인증 요청을 인증해 달라고 요청할 수 있습니다.

![이미지](/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_3.png)

## Vault kubernetes authentication engine

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

먼저 Vault와 Kubernetes 간의 인증을 설정해보겠습니다. 실제로 중요한 점은 Vault 내부의 Kubernetes 인증 엔진이 Vault Agent를 통해 Kubernetes로의 인증 요청을 프록시해야 한다는 것입니다.

먼저, kubernetes 인증 엔진을 활성화합니다. 이를 위해 구성 파일을 생성해야 합니다:

k8s/vault/enable-k8s-engine.json

```json
{
  "type": "kubernetes",
  "description": "ServiceAccount를 통해 Pod를 인증하는 인증 엔진",
  "config": {
    "options": null,
    "default_lease_ttl": "0s",
    "max_lease_ttl": "0s",
    "force_no_cache": false
  },
  "local": false,
  "seal_wrap": false,
  "external_entropy_access": false,
  "options": null
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

기본 위치(auth/kubernetes)에 마운트할 것입니다.

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/sys/auth/kubernetes -d @k8s/vault/enable-k8s-engine.json
```

쿠버네티스 엔진을 활성화한 후에는 설정을 해주어야 합니다. 쿠버네티스에서 Vault를 실행하면 Vault는 쿠버네티스의 Kubelet이 생성하고 유지하는 파일에서 필요한 몇 가지 값을 추출할 수 있지만, 여전히 쿠버네티스 API의 위치를 알려주어야 합니다. 다음과 같이 파일을 생성해주세요:

k8s/vault/vault-k8s-config.json

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

```json
{
  "kubernetes_host": "https://kubernetes.default.svc.cluster.local:443"
}
```

이제 구성을 쿠버네티스 엔진에 추가하세요:

```json
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/auth/kubernetes/config -d @k8s/vault/vault-k8s-config.json
```

쿠버네티스 인증 엔진을 설정했지만, 더 많은 구성이 필요합니다.

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

## Vault 에이전트

쿠버네티스 인증 엔진은 이제 인증 요청을 쿠버네티스에 프록시할 수 있지만, Vault 에이전트가 데이터베이스 비밀에 액세스하도록 구성되어 있어야 합니다.

애플리케이션의 서비스 계정을 Vault 시크릿에 연결해야 하며, 이를 위해 접근을 규제하는 정책을 제공해야 합니다.

먼저 정책을 생성해 봅시다. 생성하려는 정책은 다음과 같습니다:

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

```json
{
  "path": "myapp-db/creds/myapp-db-role",
  "capabilities": ["read"]
}
```

이 정책과 연결된 토큰이 myapp-db에 마운트된 데이터베이스 엔진에서 데이터베이스 자격 증명을 읽을 수 있도록 합니다.

이를 curl과 함께 사용할 수 있는 JSON 페이로드로 변환해 봅시다. 다음 파일을 생성해 주세요:

k8s/vault/myapp-db-policy.json

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

이제 정책을 만들어 보겠습니다:

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/sys/policies/acl/myapp-db-policy -d @k8s/vault/myapp-db-policy.json
```

이렇게 하면 데이터베이스 자격 증명을 읽을 수 있는 정책이 만들어집니다. 이제 쿠버네티스 인증 엔진과 연결해야 합니다. 인증이 완료되면 반환된 토큰에 이 정책이 포함됩니다.

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

한번 더 설정 파일을 생성해 봅시다:

k8s/vault/myapp-k8s-role.json

```json
{
  "bound_service_account_names": "myapp-sa",
  "bound_service_account_namespaces": "default",
  "policies": "myapp-db-policy",
  "ttl": "1h"
}
```

이는 Pod(예: Vault 에이전트)가 Vault Kubernetes 엔진을 통해 Kubernetes에 대해 인증할 수 있도록 하는 구성입니다. 우리의 경우, 엔진은 default 네임스페이스 내의 myapp-sa 서비스 계정을 사용하여 Vault 에이전트를 인증합니다. 인증된 후, 응용 프로그램(Vault 에이전트)이 받는 토큰은 myapp-db-policy 접근 정책에 바인딩되어 있으며 1시간 동안 유효합니다.

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

우리는 그런 다음 Vault 쿠버네티스 엔진에 이 역할을 추가해요:

```js
curl -X POST -H "X-Vault-Token: ${VAULT_TOKEN}" http://localhost:31400/v1/auth/kubernetes/role/myapp-k8s-role -d @k8s/vault/myapp-k8s-role.json
```

이 구성 단계를 마치기 전에, 우리가 위에서 언급한 쿠버네티스 서비스 계정("bound_service_account_names": "myapp-sa")을 만드는 것이 유용해요.

우리는 쿠버네티스를 통해 이를 실행해요. 이를 위해 매니페스트 파일이 필요해요.

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

k8s/myapp-service-account.yml 파일에는 아래와 같은 내용이 있어요:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: myapp-sa
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: myapp-tokenreview-binding
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
  - kind: ServiceAccount
    name: myapp-sa
    namespace: default
```

이제 ServiceAccount를 생성해 볼게요:

```bash
kubectl apply -f k8s/myapp-service-account.yml
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

**3. 스프링 부트 어플리케이션**

Vault Kubernetes 통합 단계를 완료했습니다. 다음으로는 스프링 부트 어플리케이션을 수정해야 합니다.

스프링 부트 어플리케이션 설정의 마지막으로 도착했습니다. Vault 연결을 사용하도록 스프링 부트 어플리케이션을 설정해야 합니다. 제가 작성한 시리즈를 계속 따라오고 계셨다면, REST API가 포스트그레스 데이터베이스를 이용하는 스프링 부트 어플리케이션의 기본 뼈대가 구성되어 있을 것입니다. 지금까지 독립형, 연결형, 그리고 k8s-debug 프로필에 대해 설명했습니다. 이제 로컬-클러스터 프로필에 집중할 차례입니다. 이 프로필에서는 앞에서 설명한 대로 Vault 에이전트를 사용하여 비밀을 주입할 것입니다.

간단히 복습하면, Vault 에이전트는 스프링 부트 어플리케이션의 프록시 역할을 하며 데이터베이스 자격 증명을 Vault에서 요청합니다. 에이전트는 갱신과 만료를 자동으로 처리합니다.

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

![Img](/assets/img/2024-07-02-HowtosetupdynamicsecretsforPostgresusingVaultandSpringBootonKubernetes_4.png)

Vault Agent은 그 후에 받은 자격 증명을 애플리케이션의 Pod에 마운트되는 인메모리 볼륨을 통해 애플리케이션에 넣습니다. 애플리케이션 관점에서, 필요한 자격 증명은 파일 시스템의 파일에 있다고 인식합니다.

이 문서에서 설명한 구성으로, 애플리케이션은 /vault/secrets/myapp-db라는 파일을 통해 자격 증명을 받습니다.

먼저, 주기적으로 파일을 업데이트하는 스케줄된 작업을 애플리케이션에 추가합니다. 변경 사항을 감지하면 새로운 자격 증명을 데이터 소스에 적용한 후, 우리의 예제에서는 기본 Hikari 데이터 소스입니다. 이를 구성하는 방법은 다음 스니펫에서 확인할 수 있습니다. (전체 파일을 보려면 링크를 방문하세요):

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

이 코드 스니펫에서는 application.dynamic-db-config.enabled 속성이 true로 설정된 경우에만 작성된 Service로 설정했다는 것을 볼 수 있습니다. 이는 우리가 local-cluster 프로필에 이를 연결할 수 있도록 하여 다른 프로필에서 자격 증명 덮어쓰기를 피할 수 있게 합니다.

또한 이 작업이 기본 속도로 5분마다 트리거되도록 Scheduled되어 있음을 볼 수 있습니다. 이 속성은 application.dynamic-db-config.refresh를 사용하여 조정할 수 있습니다. 이 값은 Vault 데이터베이스 엔진에 의해 생성된 시크릿의 TTL보다 최소 두 배 이상 빨라야 합니다.

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

Vault 에이전트가 주입 할 파일의 이름을 정의하는 속성(application.dynamic-db-config.filename)도 있습니다. 이러한 속성들은 application-local-cluster.yml 에 설정해주어야 합니다 (기본값은 application.yml 에 설정되어 있으며 기본적으로이 새로 고침 메커니즘을 비활성화합니다).

일정 작업에서는 파일을 읽어 현재 사용자 이름과 비밀번호를 비교합니다. 변경 사항이 있으면 현재 사용자 이름과 비밀번호가 수정된 값으로 대체됩니다. 그런 다음 데이터 소스에는 새 자격 증명이 제공되고 소프트 포기 방법을 사용하여 연결 풀이 회전됩니다. 이렇게하면 연결이 닫히기 전에 트랜잭션이 완료되는 것을 보장합니다. 이 기능은 다음 코드 스니펫에서 확인할 수 있습니다:

config.DatabaseDynamicCredentialsJob

```js
...
            boolean refreshed = !StringUtils.equals(username, hikariDataSource.getUsername()) ||
                                !StringUtils.equals(password, hikariDataSource.getPassword());

            if (refreshed) {
                log.info("데이터베이스 자격 증명 업데이트 중");
                hikariDataSource.setUsername(username);
                hikariDataSource.setPassword(password);
                hikariDataSource.getHikariPoolMXBean().softEvictConnections();
            }
...
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

로컬 클러스터 프로필의 스프링 부트 구성에 자격 증명 삽입 코드 속성을 설정해야 합니다. 아래 스니펫을 k8s/application-local-cluster.yml 파일에 추가해주세요:

```js
...
application:
  dynamic-db-config:
    enabled: true
    filename: "/vault/secrets/myapp-db"
    refresh: 5
...
```

이렇게 하면 3단계가 완료되었고, Vault에 의해 데이터베이스 자격 증명이 자동으로 회전될 때 스프링 부트 애플리케이션이 자동으로 연결을 업데이트하게 됩니다.

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

# 4. 애플리케이션 배포

이제 우리는 다음과 같은 것들을 갖고 있습니다:

- Vault 데이터베이스 엔진이 유지 및 회전하는 동적 데이터베이스 자격 증명
- Kubernetes와 인증할 수 있는 Vault 쿠버네티스 엔진. 이를 통해 Vault Agent 자격 증명을 확인할 수 있습니다.
- 적절한 Vault 액세스 토큰이 데이터베이스 자격 증명에 액세스할 수 있는 Vault 정책
- 적절한 ServiceAccount와 연관된 Vault Agent가 데이터베이스 자격 증명에 액세스할 수 있는 기능
- Vault Agent가 주입된 자격 증명을 읽고 사용하며 업데이트할 수 있는 Spring Boot 애플리케이션

마지막 단계 하나만 남았습니다. 즉, Vault Agent가 포함된 Spring Boot 애플리케이션을 배포하는 것입니다.

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

이전에 Vault에서 데이터베이스 비밀을 접근할 수 있도록 하는 ServiceAccount를 생성했던 것을 기억하실 겁니다. 이를 myapp-sa라고 부르며, 배포 manifest에서 이 애플리케이션이 이와 연관되도록 해야 합니다.

로컬 클러스터 배포를 위한 yml 파일이 없다면, 이전 글의 k8s-debug.yml 파일을 복사하여 생성할 수 있습니다.

파일에서 데이터베이스를 위한 secrets를 설정하는 env stanza에서 STATIC_DB_USERNAME과 STATIC_DB_PASSWORD 변수를 삭제하시고, SPRING_PROFILES_ACTIVE를 local-cluster로 변경해주세요.

그리고 배포할 내용을 정의하는 template stanza에 다음의 annotations stanza를 추가하면 됩니다.

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

k8s/local-cluster-deployment.yml

```js
...
  template:
    metadata:
      labels:
        app: sb-k8s-template
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "myapp-k8s-role"
        vault.hashicorp.com/agent-inject-secret-myapp-db: "myapp-db/creds/myapp-db-role"
        vault.hashicorp.com/agent-inject-file-secret-myapp-db: "myapp-db.creds"
        vault.hashicorp.com/auth-path: "auth/kubernetes"
        vault.hashicorp.com/agent-run-as-user: "1881"
        vault.hashicorp.com/agent-pre-populate: "true"
        vault.hashicorp.com/agent-pre-populate-only: "false"...
```

이러한 주석들은 다음을 수행합니다:

- agent-inject: Vault가 비밀을 주입하기 위한 사이드카를 생성하도록 지시
- role: 에이전트가 인증될 때 Vault가 토큰에 제공하는 역할
- agent-inject-secret-xxx: 주입할 비밀(xxx)과 해당 경로
- agent-inject-file-secret-xxx: Vault 에이전트가 비밀 xxx를 위해 생성할 비밀 파일의 경로
- auth-path: 사용할 Vault 인증 엔진의 경로
- agent-run-as-user: Vault 에이전트 컨테이너가 루트 사용자로 실행되지 않도록 함
- agent-pre-populate: 이를 true로 설정함으로써, 애플리케이션 실행 전에 데이터베이스 자격 증명을 사용할 수 있도록 함 (Vault는 초기화 컨테이너를 사용함)
- agent-pre-populate-only: 이를 false로 설정함으로써, 자격 증명이 시작할 때만 업데이트되는 것이 아니라 계속해서 업데이트되도록 함 (Vault는 사이드카 컨테이너를 사용함)

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

위의 주석 내용에 대한 자세한 내용은 여기에서 확인할 수 있어요.

이제 배포 매니페스트 업데이트가 완료되었습니다. 애플리케이션을 배포하기 전에 Docker 이미지를 수정해야 할 사항이 있어요.

## Dockerfile 업데이트

이전에 따라오신 분들은 Docker/Dockerfile.k8s.debug 파일이 있을 겁니다. 이 파일을 사용하여 Docker 이미지를 만들죠. 이 파일은 애플리케이션을 디버깅할 수 있는 이미지를 생성합니다. 이제 우리는 프로덕션용 빌드로 전환하고 있기 때문에, 원격 디버깅 기능이 비활성화된 새 파일을 만들어야 합니다.

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

도커/Dockerfile.local.cluster

```js
FROM openjdk:17.0.2-slim-buster
RUN addgroup --system spring && useradd --system spring -g spring
USER spring:spring
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080 8081
```

새로운 구성 파일로 JAR 파일을 만든 후, 다음과 같이 도커 이미지를 만들어보세요:

```js
docker build -t sb-k8s-template:01 -f Docker/Dockerfile.local.cluster .
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

이제 Kind 클러스터에 업로드해 보세요:

```js
kind load docker-image sb-k8s-template:01
```

그리고 새로운 배포 매니페스트를 사용하여 클러스터에 배포해보세요:

```js
kubectl apply -f k8s/local-cluster-deployment.yml
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

# 시도해보기

애플리케이션을 배포한 후에는 로그를 확인하여 애플리케이션이 정상적으로 작동하는지 확인해보세요.

그런 다음 이 기사에서 설명하는대로 물고기와 어핽을 추가해 볼 수 있습니다.

프로세스에서 회전을 보고 싶다면 데이터베이스 연결의 TTL을 몇 분으로 줄여서 애플리케이션이 변경을 찾는 빈도를 늘리는 것을 기억해야합니다.

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

# 만약 문제가 발생한다면

**WHEN_THINGS_GO_WRONG.md** 파일이 저장소에 추가되어 있습니다. 이 프로젝트를 준비하면서 유용하다고 느낀 몇 가지 팁을 제공합니다.

# 요약

이 긴 글을 읽어주셔서 감사합니다. 아쉽게도, 우리의 Spring Boot — Kubernetes — Vault — Postgres 솔루션에서 동적 자격 증명을 활성화하기 위해 수행해야 하는 활동이 많아요. 이 모든 작업은 완료되어야 솔루션이 작동할 수 있습니다.

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

이 기사를 다시 한번 요약해보자면:

- 우리는 데이터베이스에서 동적 자격 증명을 관리하기 위해 Vault를 구성했습니다.
- 애플리케이션을 Kubernetes에 대한 인증을 위해 Vault를 구성했습니다.
- 정책을 사용하여 Vault 구성을 안전하게 보호했습니다.
- 회전하는 데이터베이스 자격 증명을 수락하도록 애플리케이션을 수정했습니다.
- 애플리케이션이 프록시 역할을 하는 Vault 에이전트를 활용하도록 애플리케이션 구성과 배포를 수정했습니다.

이 기사가 마음에 드셨기를 바라며, 적어도 한 가지 새로운 것을 배우셨기를 희망합니다.

만약 이 기사가 유익했다면, 박수를 눌러주시면 감사하겠습니다. 이를 통해 어떤 내용이 도움이 되는지 확인하고 앞으로 어떤 주제를 다루어야 할지 판단할 수 있습니다. 의견이나 제안이 있으시면 메모나 답글로 남겨주세요.
