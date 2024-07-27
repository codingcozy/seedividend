---
title: "스프링 부트 예외 로깅 베스트 프랙티스 실시간 예제"
description: ""
coverImage: "/assets/img/2024-07-06-BestPracticesforExceptionLogginginSpringBootReal-TimeExamples_0.png"
date: 2024-07-06 02:35
ogImage: 
  url: /assets/img/2024-07-06-BestPracticesforExceptionLogginginSpringBootReal-TimeExamples_0.png
tag: Tech
originalTitle: "Best Practices for Exception Logging in Spring Boot: Real-Time Examples"
link: "https://medium.com/@psdevraye/best-practices-for-exception-logging-in-spring-boot-real-time-examples-5139607103aa"
---


/assets/img/2024-07-06-BestPracticesforExceptionLogginginSpringBootReal-TimeExamples_0.png

예외 로깅은 견고하고 유지보수 가능한 Spring Boot 애플리케이션을 구축하는 중요한 측면입니다. 효과적인 로깅은 문제 해결에 도움을 주는 것뿐만 아니라 애플리케이션의 건강을 모니터링하는 데도 도움이 됩니다. 본문은 Spring Boot에서 예외 로깅의 모범 사례를 실시간 예제와 함께 설명합니다.

## 1. 충분한 컨텍스트 정보 기록

예외를 로깅할 때 오류 상황을 이해하기 위해 충분한 컨텍스트를 포착하는 것이 중요합니다. 이는 예외 메시지, 스택 추적 및 관련 애플리케이션 상태 또는 매개변수를 포함합니다. Spring Boot는 예외를 효과적으로 기록하는 다양한 방법을 제공합니다.

<div class="content-ad"></div>

예시: @ControllerAdvice를 사용한 전역 예외 처리

Spring Boot의 @ControllerAdvice를 사용하면 하나의 전역 위치에서 애플리케이션 전체의 예외를 처리할 수 있습니다.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        // 예외에 대한 정보와 함께 로그 처리
        logger.error("Exception occurred: {}, Request Details: {}", ex.getMessage(), request.getDescription(false), ex);
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        // 특정 예외에 대한 로그
        logger.error("Invalid argument: {}, Request Details: {}", ex.getMessage(), request.getDescription(false), ex);
        return new ResponseEntity<>("Invalid argument", HttpStatus.BAD_REQUEST);
    }
}
```

위 예제에서:

<div class="content-ad"></div>

- 모든 내용을 제공하기 위해 예외 메시지, 스택 트레이스 및 요청 세부 정보를 로깅합니다.
- 다양한 예외 유형을 구체적으로 처리하여 정확한 로깅 및 적절한 응답을 보장합니다.

## 2. 적절한 로그 레벨 사용

올바른 로그 레벨을 선택하는 것은 효과적인 로깅에 중요합니다. 로그 레벨은 문제의 심각성을 반영해야 합니다.

예: Logback를 사용한 로그 레벨 구성

<div class="content-ad"></div>

**스프링 부트**는 기본 로깅 프레임워크로 **Logback**을 사용합니다. **application.yml** 또는 **application.properties**에서 로그 수준을 구성할 수 있습니다.

```js
logging:
  level:
    root: INFO
    com.example.yourpackage: DEBUG
    org.springframework.web: ERROR
```

이 구성에서:

- 루트 로거는 **INFO** 수준으로 설정됩니다.
- 애플리케이션 패키지와 같은 특정 패키지는 다른 로그 수준을 가질 수 있습니다 (이 경우 **DEBUG**).
- **Spring** 프레임워크 로그는 **ERROR** 수준으로 설정되어 소음을 줄입니다.

<div class="content-ad"></div>

로그 수준에 따른 예제

```js
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {

    private static final Logger logger = LoggerFactory.getLogger(ExampleController.class);

    @GetMapping("/test")
    public String testLogging() {
        try {
            // 오류 시뮬레이션
            throw new RuntimeException("테스트 예외");
        } catch (RuntimeException e) {
            // 다양한 수준으로 로그 작성
            logger.debug("디버그 메시지", e);
            logger.info("정보 메시지", e);
            logger.warn("경고 메시지", e);
            logger.error("오류 메시지", e);
            throw e;
        }
    }
}
```

## 3. 로깅 구성 중앙화 및 표준화

로깅 구성을 중앙화하면 일관성을 유지하고 관리를 단순화할 수 있습니다. Spring Boot의 application.yml 또는 application.properties를 사용하여 로깅 구성을 관리할 수 있습니다.

<div class="content-ad"></div>

예: 중앙 집중식 Logback 구성

src/main/resources 디렉토리에 logback-spring.xml을 만듭니다.

```js
<configuration>
    <property name="LOG_FILE" value="app.log"/>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE}</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} - %msg%n</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>app-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>

    <root level="INFO">
        <appender-ref ref="FILE"/>
    </root>

    <logger name="com.example.yourpackage" level="DEBUG"/>
    <logger name="org.springframework.web" level="ERROR"/>
</configuration>
```

이 구성에서:

<div class="content-ad"></div>

- 로그는 매일 롤링되면서 app.log에 작성됩니다.
- 루트 로거는 INFO로 설정됩니다.
- 특정 로거는 사용자 정의 레벨을 가지고 있습니다.

## Java 예외 로깅 3 규칙 :

Java에서 예외 로깅에 관련된 경우, 응용 프로그램의 유지 관리 및 문제 해결 능력을 크게 향상시킬 수 있는 몇 가지 최선의 방법들이 있습니다.

다음은 따르면 좋은 세 가지 중요한 규칙입니다:

<div class="content-ad"></div>

# 1. 충분한 문맥 정보 기록하기

예외를 기록할 때는 발생한 일의 이유와 왜 예외가 발생했는지 이해할 수 있는 충분한 문맥 정보를 포함하는 것이 중요합니다. 이 정보는 운영 중 발생하는 문제를 진단할 때 매우 가치 있습니다. 포함해야 할 주요 세부 사항은 다음과 같습니다:

- 예외 메시지: 오류의 간단한 설명을 제공하는 예외 메시지 자체를 로그로 남깁니다.
- 스택 추적: 반드시 예외의 스택 추적을 기록합니다. 이는 예외를 일으킨 메소드 호출의 순서를 보여주어 오류의 정확한 위치와 원인을 파악하는 데 도움이 됩니다.
- 매개변수와 상태: 예외를 일으킨 관련된 매개변수와 상태 정보를 포함합니다. 이는 메소드 매개변수, 객체 상태 또는 문제 재현을 돕는 데 유용한 다른 문맥 정보를 포함할 수 있습니다.

다음은 java.util.logging 패키지를 사용하여 충분한 문맥 정보와 함께 예외를 기록하는 예시입니다:

<div class="content-ad"></div>

```java
import java.util.logging.*;

public class ExceptionLoggingExample {

    private static final Logger logger = Logger.getLogger(ExceptionLoggingExample.class.getName());

    public void doSomething() {
        try {
            // Code that may throw an exception
            throw new IllegalArgumentException("Invalid argument provided");
        } catch (IllegalArgumentException e) {
            // Log the exception with sufficient context information
            logger.log(Level.SEVERE, "An error occurred: " + e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        ExceptionLoggingExample example = new ExceptionLoggingExample();
        example.doSomething();
    }
}
```

여기 예시를 통해:

- IllegalArgumentException을 catch합니다.
- 예외 메시지(e.getMessage()), 스택 트레이스(e)와 사용자 정의 메시지("An error occurred: ")를 로깅합니다.

# 2. 적절한 로그 레벨 사용하기

<div class="content-ad"></div>

어플리케이션에 미치는 심각성과 영향에 따라 적절한 로그 레벨을 선택하세요:

- SEVERE: 현재 작업의 실패를 나타내며 즉시 주의해야 하는 심각한 오류에 사용합니다.
- WARNING: 복구 가능한 예기치 않은 상황 또는 해결되지 않으면 오류로 이어질 수 있는 조건에 대해 사용합니다.
- INFO 또는 DEBUG: 보다 중요하지 않은 예외 또는 정보를 나타내는 용도에 사용합니다. 이는 처리된 예외 또는 정상적인 작동 중인 이벤트를 포함할 수 있습니다.

올바른 로그 레벨 사용은 로그가 정보적이면서 처리 가능한 내용임을 보장하며 불필요한 세부 정보로 로그 파일을 어지럽히지 않습니다.

# 3. 로깅 설정 통합 및 표준화

<div class="content-ad"></div>

로깅 구성을 중앙화하고 표준화하는 것은 관리를 간편하게 만들어주고 응용 프로그램 전체에서 일관성을 보장합니다. 다음과 같은 모범 사례를 고려해보세요:

- 로깅 프레임워크 사용: Log4j, Logback 또는 java.util.logging과 같은 로깅 프레임워크를 사용하여 고급 로깅 기능과 유연성을 더합니다.
- 로그 레벨 구성: 서로 다른 패키지와 클래스에 적절한 로그 레벨을 설정하여 로깅 출력의 상세 수준을 제어합니다.
- 중앙 위치에 로그 저장: 로그를 중앙 위치에 저장하거나 로깅 집계 서비스(예: ELK 스택, Splunk)를 사용하여 모니터링 및 분석을 쉽게 할 수 있습니다.
- 로깅 오류 처리: 로깅 작업 주변에 강력한 오류 처리를 구현하여 로깅 자체에 문제가 발생할 경우에도 연쇄적인 오류를 방지합니다.

다음은 Log4j를 사용한 간단한 예제입니다:

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Log4jExample {

    private static final Logger logger = LogManager.getLogger(Log4jExample.class);

    public void doSomething() {
        try {
            // 예외를 발생시킬 수 있는 코드
            throw new NullPointerException("Null 값 발생");
        } catch (NullPointerException e) {
            // Log4j로 예외를 기록
            logger.error("오류 발생: {}", e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        Log4jExample example = new Log4jExample();
        example.doSomething();
    }
}
```

<div class="content-ad"></div>

위 예시에서는:
- 우리는 로깅을 위해 Log4j를 사용합니다.
- 오류 수준(logger.error)으로 NullPointerException을 로깅하며, 예외 메시지와 예외 자체를 제공합니다.

이러한 규칙을 따르면 예외 로깅이 효과적이고 정보를 제공하며, Java 애플리케이션에서 문제를 진단하고 해결하는 데 도움이 됩니다.

# 결론

<div class="content-ad"></div>

Spring Boot에서 효과적인 예외 로깅은 충분한 컨텍스트 정보를 캡처하고 적합한 로그 레벨을 사용하며 로깅 구성을 중앙 집중화하는 것을 포함합니다. 이러한 관행을 준수하면 애플리케이션 로그가 모니터링, 문제 해결 및 유지 관리에 유용하게 활용됩니다. 이러한 최상의 방법을 따르면 Spring Boot 애플리케이션의 관측 가능성과 신뢰성을 크게 향상시킬 수 있습니다.

이 기사가 도움이 되었다면 Medium, Twitter 및 LinkedIn에서 박수를 보내주시고 팔로우해주시면 감사하겠습니다. 여러분의 지원은 저에게 이와 같은 콘텐츠를 계속해서 제작할 수 있도록 돕습니다. 감사합니다. 즐거운 코딩하세요!