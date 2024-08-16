---
title: "Spring Cloud Config를 사용하여 마이크로서비스 간 설정 동기화 방법"
description: ""
coverImage: "/assets/img/2024-07-12-SynchronizingConfigurationAcrossMicroserviceswithSpringCloudConfig_0.png"
date: 2024-07-12 21:07
ogImage: 
  url: /assets/img/2024-07-12-SynchronizingConfigurationAcrossMicroserviceswithSpringCloudConfig_0.png
tag: Tech
originalTitle: "Synchronizing Configuration Across Microservices with Spring Cloud Config"
link: "https://medium.com/@AlexanderObregon/synchronizing-configuration-across-microservices-with-spring-cloud-config-a2bb36e7d8eb"
isUpdated: true
---




<img src="/assets/img/2024-07-12-SpringCloudConfigMicroservices.png" />

# 소개

마이크로서비스 아키텍처에서는 서비스의 수가 증가함에 따라 구성 관리가 힘들어질 수 있습니다. 각 서비스는 고유한 구성을 필요로 하며, 변경이 필요한 경우 동기화된 방식으로 이루어져야 안정성과 일관성을 유지하는 데 필수적입니다. Spring Cloud Config는 이 문제에 대한 해결책을 제공하며, Spring Boot를 사용하여 구축된 애플리케이션에 대한 중앙 집중식 구성 관리를 활성화합니다. 이 게시물에서는 Spring Cloud Config를 사용하여 마이크로서비스 간에 구성을 동기화하는 방법에 대해 살펴보겠습니다.

# Spring Cloud Config 소개

<div class="content-ad"></div>

마이크로서비스의 급변하는 풍경 속에서 팀들이 직면하는 주요 과제 중 하나는 애플리케이션 코드에서 외부로 분리된 구성을 관리하는 것입니다. 이러한 구성 요소에는 데이터베이스 연결, 서비스 엔드포인트, 기능 토글 및 다양한 환경별 설정 등이 포함될 수 있습니다. 이러한 구성 요소는 마이크로서비스의 동작을 변경할 수 있어 많은 서비스를 포함하는 시스템에서 이를 관리하는 것은 복잡한 작업이 됩니다. 이런 상황에서 Spring Cloud Config가 중요한 역할을 하게 됩니다.

Spring Cloud Config는 마이크로서비스 아키텍처에서 중앙 집중식 구성 관리를 위해 명시적으로 설계된 더 큰 Spring Cloud 생태계 내의 프로젝트입니다. 서버 및 클라이언트 측 지원을 제공함으로써 시스템의 모든 마이크로서비스가 중앙 집중식 소스에서 구성을 검색할 수 있도록 보장하여 일관성 있고 쉽게 관리 가능한 구성 관행을 구현합니다.

## Spring Cloud Config의 핵심 기능

- 중앙 집중식 외부 구성: 구성을 여러 서비스 저장소에 흩뿌리거나 하드코딩하는 대신 Spring Cloud Config는 이를 중앙 집중화합니다. 이 중앙 집중화는 일관성을 보장할 뿐만 아니라 구성을 변경하는 프로세스를 한 곳에서만 수행하면 되어 단순화됩니다.
- 버전 관리 통합: 두드러진 기능 중 하나는 인기 있는 버전 관리 시스템, 주로 Git과의 통합입니다. 이 통합을 통해 개발자는 구성 변경의 버전 이력을 유지할 수 있어 감사 및 롤백 목적으로 매우 유용합니다.
- 환경별 구성: 종종 환경(개발, 스테이징, 프로덕션 등)에 따라 구성이 다를 수 있습니다. Spring Cloud Config는 환경별 구성 파일을 지원하여 서로 다른 설정 간의 전환을 용이하게 만듭니다.
- 동적 새로고침: 많은 전통적인 시스템에서 구성 변경은 애플리케이션이나 서비스의 재시작을 필요로 합니다. Spring Cloud Config와 Spring Boot Actuator를 함께 사용하면 서비스를 다시 시작하지 않고도 구성을 실시간으로 새로 고칠 수 있습니다.
- 암호화 및 복호화: 보안은 중요합니다. 특히 API 키 또는 데이터베이스 자격 증명과 같은 민감한 데이터가 관련된 구성 요소의 경우 더욱 중요합니다. Spring Cloud Config는 구성 속성의 암호화와 복호화를 지원하여 민감한 데이터가 안전하게 유지되도록 합니다.
- 로컬 테스트용 네이티브 프로필: Git 저장소에 연결하지 않고 로컬로 테스트하려는 개발자들을 위해 Spring Cloud Config는 네이티브 프로필을 제공합니다. 이를 통해 설정을 로컬 파일 시스템에서 읽어들일 수 있어 로컬 개발 및 테스트 프로세스가 단순화됩니다.

<div class="content-ad"></div>

마이크로서비스 아키텍처에서 구성 관리의 중요한 측면을 다루는 Spring Cloud Config는 구성의 일관성을 유지하면서 시스템을 확장하려는 개발자 및 팀에게 중요한 도구로 부상합니다. 이후 섹션에서 설정 및 사용법을 더 자세히 살펴보면, 이 도구가 마이크로서비스 툴킷에서 얼마나 중요한 역할을 하는지 명백해질 것입니다.

# Spring Cloud Config Server 설정하기

중앙 집중식 구성은 매력적인 아이디어이지만, 제공 시스템만큼 신뢰할만한 것이어야 합니다. Spring Cloud Config Server는 여러 애플리케이션과 환경 간의 구성을 중앙 집중화하는 견고한 클라우드 네이티브 솔루션입니다. 본 섹션에서는 Spring Cloud Config Server를 설정하여 마이크로서비스 구성 관리의 기반 역할을 하는 방법에 대해 안내하겠습니다.

## Maven 종속성

<div class="content-ad"></div>

우선적으로 Maven 프로젝트에서 필요한 종속성을 가지고 있는지 확인해주세요:

```js
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

spring-cloud-config-server 종속성은 우리 애플리케이션을 구성 서버로 변환하는 데 필요한 기능을 포함하고 있습니다. spring-boot-starter-web 종속성은 서버가 HTTP 요청을 수신하며 웹 애플리케이션으로 실행될 수 있도록 보장합니다.

## 구성 서버 부트스트랩하기

<div class="content-ad"></div>

주요 애플리케이션 클래스에서는 @EnableConfigServer로 주석을 달아야 합니다. 이 주석은 이 서비스를 구성 서버로 취급하도록 Spring Boot에 알려줍니다:

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

## 백엔드 구성

Spring Cloud Config Server의 강력한 기능 중 하나는 다양한 백엔드 시스템과 통합할 수 있는 능력입니다. 가장 일반적으로 사용되는 것은 Git입니다. 이 예시에서는 서버를 Git 저장소에서 구성을 가져오도록 설정할 것입니다:

<div class="content-ad"></div>

```yaml
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/your-repository/config-repo
          default-label: main
```

- uri: 이는 모든 구성 파일을 포함하는 Git 저장소의 URL입니다.
- default-label: 특정 브랜치가 지정되지 않은 경우 가져올 기본 브랜치 이름을 나타냅니다(e.g., main 또는 master).

다른 백엔드(예: 파일 시스템 또는 볼트)를 사용하려면 프로세스는 유사하지만 설정하는 속성은 다를 수 있습니다.

## 보안 고려사항

<div class="content-ad"></div>

기본 설정으로 Config Server는 보안이 적용되지 않아 어떤 서비스나 사용자든지 구성을 열람할 수 있습니다. 실제 시나리오에서는 이것이 중요한 리스크가 될 수 있습니다. 서버를 보안하려면 다음과 같은 조치를 취할 수 있습니다:

- Spring Security를 사용하여 기본 인증을 추가합니다.
- HTTPS를 사용하여 통신을 암호화합니다.
- Spring Cloud Config의 내장 암호화 및 복호화 기능을 사용하여 민감한 구성 속성을 보호합니다.

## 서버 실행

모든 것을 설정한 후에는 다른 Spring Boot 애플리케이션과 마찬가지로 응용 프로그램을 실행할 수 있습니다. 기본적으로 Config Server는 8888 포트에서 시작됩니다. 이를 변경하려면 application.properties 또는 application.yml 파일에서 server.port 속성을 설정하면 됩니다.

<div class="content-ad"></div>

Spring Cloud Config Server를 설정하는 것은 간단한 과정이지만 중앙 집중식 및 관리되는 구성으로 제공되는 혜택은 엄청납니다. 위의 단계를 따르면 견고한 시스템을 구축하여 모든 마이크로서비스에 일관되고 신뢰할 수 있는 구성을 제공할 준비가 됩니다. 시스템이 성장하고 발전함에 따라 Config Server는 다양한 환경 및 구성의 복잡성을 관리하는 데 매우 유용할 것입니다.

# 마이크로서비스를 Config Server에 연결하기

Spring Cloud Config Server가 가동되면 다음으로 진행할 합리적인 단계는 마이크로서비스를 이 서버에 연결하여 프로필 및 환경에 기초한 적절한 구성을 검색하도록 하는 것입니다. 이 연결은 변경이 필요할 때 특히 유연성을 제공하는 동적 실시간 구성 메커니즘을 육성합니다.

## Config Client 종속성 통합

<div class="content-ad"></div>

먼저, 우리는 Config Client를 마이크로서비스에 통합해야 합니다. 이는 적절한 Maven 종속성을 추가하여 달성할 수 있습니다:

```js
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

spring-cloud-starter-config는 Config Server에 마이크로서비스를 연결하기 위해 필요한 모든 것을 포함한 스타터 팩입니다.

## Config Server 가리키기

<div class="content-ad"></div>

마이크로서비스는 Config 서버의 위치를 알아야합니다. bootstrap.properties 또는 bootstrap.yml 파일에서(Config 서버에 대한이 구성은 시작 초기 단계에서 매우 필요하기 때문에 application이 아닌) Config Server의 URI를 지정하십시오:

```js
spring:
  cloud:
    config:
      uri: http://config-server-host:8888
```

config-server-host를 Config Server가 실행되는 기기의 적절한 호스트 이름 또는 IP 주소로 대체하십시오.

## 서비스 이름 및 프로필 지정

<div class="content-ad"></div>

구성 서버가 올바른 구성을 제공하려면 서비스 이름과 활성 프로필을 알아야 합니다. 이를 bootstrap.properties 또는 bootstrap.yml 파일에 정의하세요:

```yaml
spring:
  application:
    name: service-name
  profiles:
    active: dev
```

- service-name은 구성 리포지토리의 파일 중 하나와 일치해야 합니다.
- dev은 현재 활성화된 프로필입니다. dev, prod, staging 등 여러 프로필을 가질 수 있으며, 구성 서버는 활성 프로필에 따라 특정 구성을 제공할 것입니다.

## 구성 접근하기

<div class="content-ad"></div>

위의 설정을 통해 Spring의 @Value 어노테이션이나 Environment 추상화를 사용하여 속성을 검색할 수 있습니다:

```java
@Value("${custom.property}")
private String customProperty;
```

또는:

```java
@Autowired
private Environment env;

public String getCustomProperty() {
    return env.getProperty("custom.property");
}
```

<div class="content-ad"></div>

## 빠른 실패 전략

마이크로서비스가 구성 서버에서 구성을 가져올 수 없는 경우(네트워크 문제, 잘못된 구성 또는 서버 다운 타임으로 인한 경우)에는 부정확하거나 기본 구성으로 시작하는 것보다 서비스가 빠르게 실패하는 것이 더 나을 때가 많습니다. 이를 위해 다음과 같이 설정합니다:

```js
spring:
  cloud:
    config:
      fail-fast: true
```

이렇게 하면 마이크로서비스가 구성 서버에서 구성을 검색할 수 없는 경우 서비스가 시작되지 않습니다.

<div class="content-ad"></div>

Spring Cloud Config Server에 마이크로서비스를 연결하는 것은 설정이 외부화되고 중앙 집중화되며 효율적으로 관리되도록 하는 원활한 프로세스입니다. 이 설정은 서비스 간의 설정 일관성을 유지하는 데 도움이 되는데, 각 서비스의 코드베이스에 신경 쓰지 않고 설정을 업데이트하는 프로세스를 간편화합니다. 시스템이 확장되고 복잡해지면 이러한 중앙 집중화된 설정 관리는 운영 효율성과 시스템 일관성을 보장하는 데 중요해집니다.

## 동적으로 설정 새로 고침하기

Spring Cloud Config의 중요한 기능 중 하나는 마이크로서비스가 전체 재시작 없이 동적으로 설정을 새로 고칠 수 있는 능력입니다. 이는 다운타임이 사용자 경험 및 작업에 영향을 줄 수 있는 클라우드 환경에서 매우 가치 있는 기능이 됩니다. 이 섹션에서는 이 동적 새로 고침 기능을 설정하고 활용하는 방법에 대해 논의하겠습니다.

### Spring Boot Actuator 소개

<div class="content-ad"></div>

Spring Boot Actuator는 우리의 애플리케이션에 안정적으로 운영되는 기능을 제공하여 모니터링 및 관리할 수 있게 해줍니다. 그 중 하나의 엔드포인트는 /refresh이며, 이를 사용하여 구성을 새로 고침할 수 있습니다.

먼저, 마이크로서비스에 아래의 actuator 종속성을 추가해보세요:

```js
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## /refresh 엔드포인트 노출하기

<div class="content-ad"></div>

기본적으로 Actuator의 대부분 엔드포인트는 보안 상의 이유로 비활성화되어 있습니다. /refresh 엔드포인트를 명시적으로 활성화해야 합니다. application.properties 또는 application.yml 파일을 업데이트해주세요:

```js
management:
  endpoints:
    web:
      exposure:
        include: refresh
```

## Spring Cloud Bus 사용하기 (선택 사항)

단일 마이크로서비스의 여러 인스턴스가 실행 중인 경우 개별 인스턴스에서 활성화를 수동으로 트리거하는 것은 번거로울 수 있습니다. Spring Cloud Bus는 메시지 브로커(예: RabbitMQ 또는 Kafka)와 통합하여 구성 변경을 브로드캐스트합니다. 하나의 인스턴스가 구성 변경을 수신하면 이 변경을 모든 다른 인스턴스에 브로드캐스트할 수 있습니다.

<div class="content-ad"></div>

Spring Cloud Bus를 사용하려면 다음 종속성을 추가하십시오:

```js
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

그런 다음 메시지 브로커와의 연결을 구성하고 변경 사항이 모든 연결된 마이크로서비스 인스턴스에 전파되도록합니다.

## 구성 새로 고침 트리거

<div class="content-ad"></div>

중앙 집중식 구성 저장소에서 변경 사항을 적용하고 변경을 푸시한 후에는 마이크로서비스가 업데이트된 구성을 가져가도록하고 싶을 것입니다.

구성을 새로 고치려면 마이크로서비스의 /actuator/refresh 엔드포인트로 HTTP POST 요청을 보냅니다. 이 작업은 curl과 같은 도구를 사용하여 수행할 수 있습니다:

```js
curl -X POST http://microservice-host:port/actuator/refresh
```

마이크로서비스는 Config Server에 연락하여 최신 구성을 검색하고 컨텍스트를 새로고침하며 재시작없이 모든 이를 수행합니다.

<div class="content-ad"></div>

## 새로 고침 가능한 빈에 주석 추가

일부 빈은 업데이트된 구성에 따라 변경되어야 할 수도 있습니다. 구성이 변경될 때 빈을 다시 만들어야 할 수 있습니다. 이러한 빈에는 @RefreshScope 주석을 사용할 수 있습니다:

```js
@RefreshScope
@Component
public class MyBean {
    @Value("${config.property}")
    private String configProperty;
    
    // ...
}
```

@RefreshScope로 설정하면 Spring이 구성 새로 고침 시 빈을 다시 만들어서 config.property의 새 값이 적용되도록 보장합니다.

<div class="content-ad"></div>

동적 구성 새로 고침은 마이크로서비스 생태계에 유연성과 탄력성을 제공하는 스프링 클라우드 구성의 증거입니다. 다운타임을 최소화하고 서비스가 항상 가장 최신 구성으로 실행되도록 보장하여, 이 기능은 동적이고 끊임없이 변화하는 프로덕션 환경에서 가치를 입증합니다. 스프링 클라우드 구성을 도입하면 구성을 동적으로 새로 고치는 능력이 의심할 여지없이 여러분이 가장 감사해할 기능 중 하나가 될 것입니다. 지속성과 안정성을 보장합니다.

# 결론

스프링 클라우드 구성은 분산 시스템에서 마이크로서비스 간 구성을 관리하고 동기화하는 원활한 방법을 제공합니다. 구성을 중앙 집중화함으로써 한 곳에서 변경을 하고 모든 연결된 서비스로 전파하여 일관성을 보장합니다. 또한 버전 관리 시스템과 통합되어 구성을 동적으로 새로 고치는 기능은 마이크로서비스 아키텍처를 사용하여 구축된 응용 프로그램에 대한 견고한 솔루션을 제공합니다.

- 스프링 클라우드 구성 공식 문서
- 스프링 부트 액추에이터 문서
- 스프링 클라우드 버스 문서

<div class="content-ad"></div>

`<img src="/assets/img/2024-07-12-SynchronizingConfigurationAcrossMicroserviceswithSpringCloudConfig_1.png" />`