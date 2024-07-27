---
title: "Spring Cloud Eureka를 이용한 서비스 디스커버리 방법"
description: ""
coverImage: "/assets/img/2024-07-07-ServicediscoveryusingSpringcloudEureka_0.png"
date: 2024-07-07 13:04
ogImage: 
  url: /assets/img/2024-07-07-ServicediscoveryusingSpringcloudEureka_0.png
tag: Tech
originalTitle: "Service discovery using Spring cloud Eureka"
link: "https://medium.com/@cg32485/service-discovery-using-spring-cloud-eureka-26c7f4bc230b"
---


분산 시스템이나 마이크로서비스에서는 성격상 많은 노드나 구성 요소를 볼 수 있습니다. 그러한 환경에서 개별 구성 요소 간의 통신은 매우 중요해집니다.

분산 시스템은 일반적으로 다음 세 가지 방법을 통해 서로 통신합니다:

- 원격 프로시저 호출(RPI)
- 메시징 큐
- 도메인 특화 프로토콜

이 세 가지 방법 중에서 가장 쉽고 잘 알려진 방법은 RPI입니다. RPI는 REST나 유사한 프로토콜을 통해 발생합니다.

<div class="content-ad"></div>

이제 REST API 호출을 하려면 호출할 서버의 호스트 주소와 포트 번호를 알아야 합니다. 모든 서비스에 대해 호스트 IP 주소와 포트 번호를 고정시키면 문제가 되지 않습니다. 그러나 프로덕션 등급 시스템의 경우, 일반적으로 서비스를 클라우드 플랫폼에 배포합니다. 부하와 트래픽에 따라 서비스의 책임 스케일링이 클라우드 플랫폼에 위임됩니다. 이것은 시스템 부하가 높을 때 클라우드 플랫폼이 시스템에 서버의 인스턴스를 동적으로 추가 또는 제거할 수 있음을 의미합니다.

서버 인스턴스가 동적으로 추가 및 제거되면 통신 목적을 위해 새 인스턴스의 IP 주소를 추적하는 것이 중요해집니다. 서버의 통신 세부 정보를 추적하는 이 패턴은 서비스 디스커버리라고 합니다.

이는 두 가지 방식으로 제공됩니다:

- 서버 측 디스커버리
- 클라이언트 측 디스커버리

<div class="content-ad"></div>

이 기사의 나머지 부분에서는 서버 측 발견에 대해서만 다룰 것입니다.

## 사용된 기술

- Java 21
- 스프링 부트
- 도커

## 서버 측 발견

<div class="content-ad"></div>

서버 측 디스커버리에서 모든 인스턴스의 주소를 알고 있는 라우터 서비스를 소개할 것입니다. 라우터가 아닌 서비스는 안정 상태에 도달하면 라우터 서비스에 자신을 등록하고 정보를 유지할 수 있도록 만들어집니다.

![image](/assets/img/2024-07-07-ServicediscoveryusingSpringcloudEureka_0.png)

# 라우터 서비스와 단일 호출 서비스 추가

이 섹션에서는 서비스 레지스트리 및 디스커버리 서비스로 작용할 라우터 노드를 추가하고, 서비스가 디스커버리 서비스에 자체 등록하도록 할 것입니다.

<div class="content-ad"></div>

우리는 Spring Initializr에서 Spring Boot 프로젝트를 생성하여 시작합니다. 다음 종속성이 필요합니다.

```js
dependencies:
  - name: org.springframework.cloud
    artifact: spring-cloud-starter-netflix-eureka-server

  - name: org.springframework.boot
    artifact: spring-boot-starter-test
    scope: test
```

이제 application.yml 파일에 구성을 추가할 것입니다.

```js
spring:
  application:
    name: eureka-server
server:
  port: 8761
eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
```

<div class="content-ad"></div>

- 우리는 애플리케이션이 eureka-server라고 불릴 것임을 설정하고 있습니다.
- 이 애플리케이션은 8761번 포트에서 실행될 것입니다.
- 우리는 eureka.client.registerWithEureka 속성을 사용하여 이 Spring 부트 애플리케이션이 다른 탐지 서비스에 등록되지 않도록 설정하고 있습니다.
- 또한, 이 서비스가 eureka.client.fetchRegistry 속성을 통해 다른 레지스트리에서 주소를 가져오도록 하고 있습니다.

우리는 부트 클래스를 @EnableEurekaServer로 주석 처리할 것입니다. 이 주석은 이 Spring 부트 애플리케이션이 서비스 레지스트리 및 탐지 서비스로 작동할 것임을 지정합니다.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.*;
import org.springframework.cloud.netflix.eureka.server.*;

@SpringBootApplication
@EnableEurekaServer
@EnableConfigurationProperties
public class EurekaServiceRegistryApplication {

 public static void main(String[] args) {
  SpringApplication.run(EurekaServiceRegistryApplication.class, args);
 }

}
```

이제 이 애플리케이션을 Docker화할 것입니다.

<div class="content-ad"></div>


```js
FROM openjdk:21
MAINTAINER CHAITANYAGP
COPY target/eureka-service-registry-0.0.1-SNAPSHOT.jar eureka-service-registry-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/eureka-service-registry-0.0.1-SNAPSHOT.jar"]
```

도커 파일로부터 이미지를 생성합니다.

```js
docker build -t eureka-server:latest
```

이미지를 실행하고 디스커버리 서비스가 작동하는지 확인해 봅시다.


<div class="content-ad"></div>

```js
도커 실행 -p8761:8761 eureka-server:latest
```

이제 http://localhost:8761/eureka에 액세스하면 멋진 디스커버리 페이지가 표시됩니다.

<img src="/assets/img/2024-07-07-ServicediscoveryusingSpringcloudEureka_1.png" />

# 호출 서비스를 디스커버리 서비스와 등록하는 방법 추가하기


<div class="content-ad"></div>

우리는 다른 Spring Boot 애플리케이션을 만들 것입니다. 이 애플리케이션은 callee 서비스로 작동하며 eureka-server에 자체 등록합니다.

다음 의존성을 pom.xml에 추가합니다.

```js
<dependencies>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  
  <dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   <version>4.1.2</version>
  </dependency>

 </dependencies>
```

그런 다음 구성을 추가합니다.

<div class="content-ad"></div>

```js
spring:
  application:
    name: order
eureka:
  client:
    serviceUrl:
      defaultZone: http://eureka-server:8761/eureka
    instance:
      preferIpAddress: true
server:
  port: 9000
```

- spring.application.name은 이 서비스를 주문으로 호출할 것임을 지정합니다.
- server.port는 이 서비스가 9000 포트에서 실행될 것임을 나타냅니다.
- eureka.client.serviceUrl.defaultZone은 이 서비스가 자신을 발견하기 위해 등록해야 하는 eureka 서버의 URL을 지정합니다.
- eureka.client.instance.preferIpAddress는 레지스트리가 서비스의 IP 주소를 사용하여 발생해야 함을 지정합니다.

우리는 Spring 부트 애플리케이션의 기능을 증가시키기 위해 부트 클래스에 일부 데코레이터를 추가했습니다.

```js
@SpringBootApplication
@EnableConfigurationProperties
@EnableDiscoveryClient
public class OrderApplication {

 public static void main(String[] args) {
  SpringApplication.run(OrderApplication.class, args);
 }

}
```

<div class="content-ad"></div>

- @EnableDiscoveryClient 어노테이션을 부트 클래스에 추가하여 해당 서비스가 유레카 서버에 등록될 때 발견 기능을 얻을 수 있습니다.

저 또한 이 애플리케이션을 도커 이미지로 만들기 위해 동일한 단계를 따를 것입니다. 추가로 도컴포즈를 사용하여 실제 클라우드 환경을 모방할 것입니다. 내 compose 파일은 다음과 같습니다.

```js
version: "3"
services:
  eureka-server:
    image: eureka-service-registry:latest
    ports:
      - "8761:8761"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8761/eureka/"]
      interval: 30s
      timeout: 5s
      retries: 5
  order:
    image: order:latest
    depends_on:
      eureka-server:
        condition: service_healthy
    ports:
      - "9000:9000"
    environment:
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
```

위의 도컴포즈 파일에서 다음을 수행하고 있습니다.

<div class="content-ad"></div>

- 나는 services 탭 아래에 eureka-server와 order 서비스 2개를 생성 중이야.
- 각 서비스마다 포트를 구성 중이야. eureka-serve는 8761 포트를, order 서비스는 9000 포트를 구성하고 있어.
- eureka 서비스에 사용자 정의 헬스 체크 조건을 추가 중이야. 서비스가 정상적으로 실행 중인지 확인하기 위해 curl 명령어를 실행하는 간단한 체크야.
- 그리고 order 서비스에 eureka 서버에서 헬스 체크를 실행하고 헬스 체크가 통과할 때에만 시작하도록 명시 중이야.
- 마지막으로, 환경 변수 EUREKA_CLIENT_SERVICEURL_DEFAULTZONE을 구성하고 eureka 서버의 URL을 가리키게 설정 중이야.

이제 docker-compose up을 입력하면 먼저 eureka-server가 시작되고 그 후 order 서비스가 헬스 체크를 실행하고 시작될 거야. order 서비스가 우리의 eureka 서버에 성공적으로 등록된 것을 확인할 수 있어.

![이미지](/assets/img/2024-07-07-ServicediscoveryusingSpringcloudEureka_2.png)

여기까지가 이 글의 내용이야. 다음 글에서는 eureka 서버가 요청을 대상 서비스로 라우팅하는 방법을 살펴볼 거야.

<div class="content-ad"></div>

주문에 대한 소스 코드는 여기에서 찾을 수 있고, 유레카 서버에 대한 소스 코드는 여기에서 찾을 수 있어요.