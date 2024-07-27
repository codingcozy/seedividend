---
title: "Docker Compose로 Keycloak과 PostgreSQL 배포하는 방법"
description: ""
coverImage: "/assets/img/2024-07-10-DockerComposeDeploymentsforKeycloakandPostgreSQL_0.png"
date: 2024-07-10 02:10
ogImage: 
  url: /assets/img/2024-07-10-DockerComposeDeploymentsforKeycloakandPostgreSQL_0.png
tag: Tech
originalTitle: "Docker Compose Deployments for Keycloak and PostgreSQL"
link: "https://medium.com/@disa2aka/docker-deployments-for-keycloak-and-postgresql-e75707b155e5"
---


# 키클로크란 무엇인가요?

![Keycloak](/assets/img/2024-07-10-DockerComposeDeploymentsforKeycloakandPostgreSQL_0.png)

## 중앙 집중식 사용자 관리

키클로크를 사용하면 여러 애플리케이션과 서비스에 걸쳐 사용자, 역할 및 권한을 더 쉽게 관리할 수 있도록 한 곳에서 사용자 관리를 중앙 집중화할 수 있습니다. 이는 기존 사용자 디렉터리인 LDAP 또는 Active Directory와 통합할 수 있는 사용자 연합을 지원합니다.

<div class="content-ad"></div>

## 싱글 사인온(SSO) 및 싱글 로그아웃

키크로크(Keycloak)의 가장 중요한 기능 중 하나는 싱글 사인온(SSO)을 지원한다는 점입니다. SSO를 통해 사용자는 한 번 로그인하면 여러 응용프로그램에 다시 로그인하지 않아도 액세스할 수 있습니다. 마찬가지로, 싱글 로그아웃은 사용자가 모든 응용프로그램에서 동시에 로그아웃할 수 있도록 합니다.

## 소셜 로그인

키클로크는 소셜 로그인을 지원하여 사용자가 구글, 페이스북, 트위터 등 소셜 미디어 계정을 사용해 로그인할 수 있습니다. 이 기능은 사용자 경험을 향상시키며 등록 및 로그인 프로세스를 간소화합니다.

<div class="content-ad"></div>

## 다중인증 (MFA)

보안을 강화하기 위해 Keycloak은 다중인증 (MFA)을 지원합니다. 이는 사용자가 응용 프로그램에 액세스하려면 두 개 이상의 인증 요소를 제공해야 하므로 추가 보안 계층을 추가합니다.

## OpenID Connect (OIDC) 및 SAML

Keycloak은 인증 및 권한 부여를 위해 OpenID Connect (OIDC) 및 SAML 2.0과 같은 현대 프로토콜을 구현하여 여러 응용 프로그램과 호환성을 갖추고 다양한 응용 프로그램과 호환성을 가집니다.

<div class="content-ad"></div>

## 사용자 정의 가능한 테마

Keycloak이 제공하는 로그인 페이지의 느낌과 디자인은 귀하의 브랜딩 요구에 따라 사용자 정의할 수 있습니다. Keycloak은 테마 사용자 정의를 허용하여 로그인, 등록 및 계정 관리 페이지의 외관을 변경할 수 있습니다.

## 관리 콘솔

Keycloak은 체계, 사용자, 역할 및 권한을 관리하기 위한 쉽게 사용할 수 있는 웹 기반 관리 콘솔을 제공합니다. Keycloak의 '렐름'이라는 공간은 사용자, 자격 증명, 역할 및 그룹을 관리하는 곳입니다.

<div class="content-ad"></div>

## 보안

Keycloak은 SSL/TLS, 비밀번호 정책, 브루트 포스 탐지 등 다양한 안전 기능을 제공합니다. 또한 사용자 자격 증명을 안전하게 저장할 수 있습니다.

## API 액세스 관리

Keycloak은 토큰 (JWT 토큰 또는 SAML 어설션)을 사용하여 애플리케이션 API를 안전하게 보호할 수 있습니다. 보호되는 자원과 해당 자원에 액세스할 수 있는 역할 또는 클라이언트를 쉽게 정의할 수 있습니다.

<div class="content-ad"></div>

## 확장성 및 고가용성

Keycloak은 확장 가능하도록 설계되어 있으며 고가용성 구성으로 배포될 수 있어 사용자 및 응용프로그램에 항상 인증 서비스를 제공할 수 있습니다.

# 도커로 설정하기

도커 컴포즈.yml 파일

<div class="content-ad"></div>

```js
버전: '3.7'

서비스:
  postgres:
    이미지: postgres:16.2
    볼륨:
      - postgres_data:/var/lib/postgresql/data
    환경:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    네트워크:
      - keycloak_network

  keycloak:
    이미지: quay.io/keycloak/keycloak:23.0.6
    명령: start
    환경:
      KC_HOSTNAME: localhost
      KC_HOSTNAME_PORT: 8080
      KC_HOSTNAME_STRICT_BACKCHANNEL: false
      KC_HTTP_ENABLED: true
      KC_HOSTNAME_STRICT_HTTPS: false
      KC_HEALTH_ENABLED: true
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres/${POSTGRES_DB}
      KC_DB_USERNAME: ${POSTGRES_USER}
      KC_DB_PASSWORD: ${POSTGRES_PASSWORD}
    포트:
      - 8080:8080
    재시작: 항상
    의존:
      - postgres
    네트워크:
      - keycloak_network

볼륨:
  postgres_data:
    드라이버: local

네트워크:
  keycloak_network:
    드라이버: bridge
```

.env 파일

```js
POSTGRES_DB=keycloak_db
POSTGRES_USER=keycloak_db_user
POSTGRES_PASSWORD=keycloak_db_user_password
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=password
```

# 서비스


<div class="content-ad"></div>

PostgreSQL 서비스 (postgres):

- 이미지: PostgreSQL 서버를 실행하기 위해 Docker 이미지 postgres:16.2를 사용합니다.
- 볼륨: 데이터베이스 데이터의 지속적인 저장을 위해 컨테이너 내부의 /var/lib/postgresql/data에 postgres_data라는 이름의 볼륨을 매핑합니다.
- 환경 변수: 환경 변수로 지정된 이름 (POSTGRES_DB), 사용자 (POSTGRES_USER), 패스워드 (POSTGRES_PASSWORD)로 데이터베이스를 구성합니다.
- 네트워크: Keycloak 서비스와 통신하기 위해 keycloak_network라는 사용자 정의 네트워크에 연결됩니다.

Keycloak 서비스 (keycloak):

- 이미지: Keycloak 서버를 실행하기 위해 quay.io/keycloak/keycloak:23.0.6를 활용합니다.
- 명령: Keycloak을 실행하기 위해 start를 명령으로 지정합니다.
- 환경 변수: 호스트명 (KC_HOSTNAME), 포트 (KC_HOSTNAME_PORT), HTTP 설정 (KC_HTTP_ENABLED, KC_HOSTNAME_STRICT_HTTPS), 헬스 체크 (KC_HEALTH_ENABLED), 어드민 자격 증명 (KEYCLOAK_ADMIN, KEYCLOAK_ADMIN_PASSWORD), 데이터베이스 연결 세부 정보 (KC_DB, KC_DB_URL, KC_DB_USERNAME, KC_DB_PASSWORD)를 설정합니다.
- 포트: 웹 접근을 위해 호스트의 포트 8080을 Keycloak 컨테이너의 포트 8080에 매핑하여 노출합니다.
- 재시작 정책: 수동으로 중지될 때까지 항상 재시작하도록 구성됩니다.
- 종속성: Postgres 서비스에 종속성을 선언하여 먼저 시작되도록 합니다.
- 네트워크: keycloak_network에도 연결되어 있습니다.

<div class="content-ad"></div>

# 볼륨

**postgres_data**: 기본 로컬 스토리지 드라이버를 사용하여 컨테이너 다시 시작 시 PostgreSQL 데이터를 영구적으로 저장하는 이름이 지정된 볼륨.

# 네트워크

**keycloak_network**: 브릿지 드라이버를 사용하여 Keycloak과 PostgreSQL 컨테이너 간 통신을 용이하게 하는 사용자 정의 네트워크.

<div class="content-ad"></div>

## 환경 변수

"POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD" 데이터베이스 구성 값을, 그리고 Keycloak 관리자 자격 증명 "KEYCLOAK_ADMIN, KEYCLOAK_ADMIN_PASSWORD"을 지정합니다. 서비스가 안전하게 통신하고 작동할 수 있도록 중요합니다.

## 요약

이 Docker Compose 파일은 Keycloak과 PostgreSQL을 설정하여 인증 시스템과 데이터 저장 공간을 제공합니다. 서비스 구성을 지정하며, 접근을 위한 환경 변수와 서비스 간 통신을 위한 사용자 정의 네트워크를 설정합니다. 개발에 이상적이며, 이 설정은 애플리케이션 인증 관리를 위한 기반을 마련합니다.

<div class="content-ad"></div>

# 소스 코드

더 많은 예제와 전체 코드를 보려면 GitHub 저장소를 확인해주세요: [ForgeContainer](https://github.com/)