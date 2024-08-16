---
title: "시니어 자바 리드 인터뷰 질문 고급 - 2024 최신 목록"
description: ""
coverImage: "/assets/img/2024-07-30-SeniorJavaLeadInterviewQuestionsAdvanced-04_0.png"
date: 2024-07-30 17:13
ogImage: 
  url: /assets/img/2024-07-30-SeniorJavaLeadInterviewQuestionsAdvanced-04_0.png
tag: Tech
originalTitle: "Senior Java Lead Interview QuestionsAdvanced-04"
link: "https://medium.com/@vikas.taank_40391/senior-java-lead-interview-questions-advanced-04-636b8d118ed2"
isUpdated: true
---





![Image](/assets/img/2024-07-30-SeniorJavaLeadInterviewQuestionsAdvanced-04_0.png)

# 스프링 부트에서 자동 구성을 비활성화하는 방법은 무엇인가요?

@SpringBootApplication의 exclude 속성을 사용할 수 있습니다.

```java
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

<div class="content-ad"></div>

```java
@SpringBootApplication(excludeName = {"org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration"})
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

애플리케이션의 `application.properties` 또는 `application.yml` 파일에서 `spring.autoconfigure.exclude` 속성을 사용할 수 있습니다. 코드에 제외 사항을 적용하려면 이 방법이 좋습니다.

```java
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

```java
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class MyApplicationConfig {
    
}
```

<div class="content-ad"></div>

# Patch와 Post의 차이점은 무엇인가요?

# POST

사용 방법:

- 자원 생성: POST는 컬렉션 내에 새로운 자원을 만드는 데 자주 사용됩니다. 예를 들어 POST /users는 새로운 사용자를 만듭니다.
- 데이터 제출: 폼 데이터를 제출하거나 파일을 업로드하는 데 사용될 수 있습니다.
- 기타 작업: 때로는 표준 CRUD (Create, Read, Update, Delete) 작업으로 들어맞지 않는 작업에 사용됩니다. 예를 들어 동작 수행 (예: POST /orders/123/cancel).

<div class="content-ad"></div>

# PATCH

PATCH 방법은 리소스에 대한 부분적 업데이트에 사용됩니다.

- Idempotency: PATCH는 멱등성을 가질 수 있지만 반드시 그렇다고 요구되는 것은 아닙니다. 멱등한 PATCH 요청은 동일한 PATCH 요청을 여러 번 적용해도 초기 적용 이후에는 추가적인 효과가 없음을 의미합니다.

사용법:

<div class="content-ad"></div>

- PATCH는 부분 업데이트에 사용될 수 있습니다: PATCH는 리소스 데이터의 일부만 업데이트해야 할 때 사용됩니다. 예를 들어 사용자 리소스가 있고 사용자의 이메일만 업데이트하려는 경우, 새 이메일 값을 지정한 payload와 함께 PATCH /users/123를 사용할 것입니다.
- 네트워크 대역폭을 최소화하기 위해 클라이언트와 서버 간에 전송되는 데이터양을 최소화하고 싶을 때 이점이 있습니다. 전체 리소스를 전송하는 대신 변경 사항만 전송됩니다.

# Spring Beans의 범위에는 어떤 차이가 있나요?

## 1. Singleton (기본값)

- 싱글톤 범위는 Spring 컨테이너에 빈의 인스턴스가 하나만 있는 것을 보장합니다. 한 번 정의되면 동일한 인스턴스가 반환됩니다.

<div class="content-ad"></div>

```jsx
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {

    @Bean // 싱글톤 범위가 기본값입니다.
    public MySingletonBean mySingletonBean() {
        return new MySingletonBean();
    }

    static class MySingletonBean {
        // 빈 구현
    }
}
```

## 2. 프로토타입

- 프로토타입 범위는 컨테이너에서 빈을 요청할 때마다 새 인스턴스를 생성합니다.

- 사용 사례: 각 소비자가 새 인스턴스를 요구하는 상태를 유지해야 하는 빈에 유용합니다.


<div class="content-ad"></div>

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class ApplicationConfiguration {

    @Bean
    @Scope("prototype")
    public MyPrototypeBean myPrototypeBean() {
        return new MyPrototypeBean();
    }

    static class MyPrototypeBean {
        // Bean implementation
    }
}
```

## 3. 요청

- 사용 사례: 단일 HTTP 요청 내에서 빈 상태를 유지해야 하는 웹 애플리케이션에 적합

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.RequestScope;

@Configuration
public class WebAppConfig {

    @Bean
    @RequestScope
    public MyRequestBean myRequestBean() {
        return new MyRequestBean();
    }

    static class MyRequestBean {
        // Bean implementation
    }
}
```

<div class="content-ad"></div>

## 4. 세션

## 유스 케이스: 동일 세션 내에서 여러 HTTP 요청 간에 지속되어야 하는 사용자별 데이터를 유지하는 데 이상적입니다.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

@Configuration
public class WebAppConfig {

    @Bean
    @SessionScope
    public MySessionBean mySessionBean() {
        return new MySessionBean();
    }

    static class MySessionBean {
        // Bean 구현
    }
}
```

## 5. 어플리케이션

<div class="content-ad"></div>

- 애플리케이션 범위는 ServletContext의 라이프사이클을 따르는 빈 인스턴스를 생성합니다.

- 사용 사례: 구성 데이터와 같이 공유 애플리케이션 상태 객체에 유용합니다.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.ApplicationScope;

@Configuration
public class WebAppConfig {

    @Bean
    @ApplicationScope
    public MyApplicationBean myApplicationBean() {
        return new MyApplicationBean();
    }

    static class MyApplicationBean {
        // Bean 구현
    }
}
```

## 6. 웹 소켓

<div class="content-ad"></div>

- 범위: WebSocket 범위는 WebSocket 세션 수명 동안 빈 인스턴스를 만들며, 각 WebSocket 세션마다 새 인스턴스가 생성됩니다.
- 사용 사례: WebSocket 상호 작용의 범위 내에서 데이터를 관리하는 데 유용합니다.

```js
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.context.annotation.WebSocketScope;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler").setAllowedOrigins("*");
    }

    @Bean
    @WebSocketScope
    public MyWebSocketBean myHandler() {
        return new MyWebSocketBean();
    }

    static class MyWebSocketBean {
        // Bean 구현, WebSocketHandler 인터페이스도 구현할 수 있습니다.
    }
}
```

## 차이점 및 고려 사항:

- 싱글톤 및 응용 프로그램 범위는 응용 프로그램 수명주기에 맞춰 긴 수명을 가지지만
- 프로토타입, 요청, 세션 및 WebSocket 범위는 더 짧고 동적인 인스턴스를 정의합니다.
- 싱글톤 및 응용 프로그램 범위 빈은 상태 없는 동작 또는 공유 상태에 이상적이지만
- 프로토타입, 요청, 세션 및 WebSocket 범위는 상태를 가진 상호 작용을 관리하는 데 적합합니다.
- 프로토타입 범위는 요청 당 새로운 인스턴스 생성으로 인해 높은 메모리 소비 및 리소스 사용을 유발할 수 있습니다.
- 싱글톤 범위는 리소스를 효율적으로 사용합니다.
- 요청, 세션, 응용 프로그램 및 WebSocket 범위는 Web 컨텍스트에서 사용되도록 의도된 웹 인식적인 특성을 가지고 있습니다.

<div class="content-ad"></div>

이전 기사에서 스프링 빈 범위에 대해 확인해보세요.

내 컨텐츠를 읽어주셔서 정말 감사합니다. 멋진 독자이십니다. 공유하고 박수를 부탁드려요. 여러분의 시간과 지원 정말 감사합니다.