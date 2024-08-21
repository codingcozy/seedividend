---
title: "Spring Boot에서 백그라운드 처리를 다루는 방법"
description: ""
coverImage: "/assets/img/2024-08-03-HandlingBackgroundProcessinginSpringBoot_0.png"
date: 2024-08-03 18:48
ogImage:
  url: /assets/img/2024-08-03-HandlingBackgroundProcessinginSpringBoot_0.png
tag: Tech
originalTitle: "Handling Background Processing in Spring Boot"
link: "https://medium.com/stackademic/handling-background-processing-in-spring-boot-ae94aa03b869"
isUpdated: true
---

![이미지](/assets/img/2024-08-03-HandlingBackgroundProcessinginSpringBoot_0.png)

현대 애플리케이션에서 백그라운드 처리는 이메일 전송, 파일 처리, 보고서 생성 등의 작업을 처리하는 데 필수적입니다. Spring Boot는 효율적으로 백그라운드 작업을 구현하기 위한 여러 메커니즘을 제공합니다. 이 글에서는 Spring Boot에서 백그라운드 처리를 다루는 다양한 방법을 살펴봅니다. 비동기 방식, 작업 스케줄링, 메시징 시스템 사용 등이 포함됩니다.

# 1. 비동기 방식

Spring Boot는 @Async 어노테이션을 사용하여 메소드를 비동기적으로 실행할 수 있도록 허용합니다. 이는 이메일 전송이나 외부 API 호출과 같이 메인 스레드와 독립적으로 실행할 수 있는 작업에 유용합니다.

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

설정:

## 1. 비동기 지원 활성화:

비동기 처리를 활성화하려면 구성 클래스에 @EnableAsync 어노테이션을 추가하세요.

```java
@Configuration
@EnableAsync
public class AsyncConfig {
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

2. 비동기 방식 메소드 정의:
   @Async를 사용하여 비동기적으로 실행하고자 하는 메소드에 주석을 달아주세요.

```java
@Service
public class EmailService {

    @Async
    public void sendEmail(String recipient, String message) {
        // 이메일 전송 로직 모의
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("이메일을 " + recipient + " 님께 전송했습니다");
    }
}
```

3. 비동기 메소드 호출:

```java
@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestParam String recipient, @RequestParam String message) {
        emailService.sendEmail(recipient, message);
        return ResponseEntity.ok("이메일 요청이 수락되었습니다");
    }
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

# 2. 작업 일정

Spring Boot은 @Scheduled 주석을 사용하여 주기적으로 작업을 실행하거나 특정 간격으로 실행할 수 있는 스케줄링 기능을 제공합니다.

설정:

1. 스케줄링 활성화:
   @Configuration 클래스에 @EnableScheduling 주석을 추가하여 스케줄링을 활성화합니다.

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

```java
   @Configuration
   @EnableScheduling
   public class SchedulingConfig {
   }
```

2. Define Scheduled Methods:

Annotate the methods you want to run on a schedule with `@Scheduled`.

```java
@Service
public class ReportService {

   @Scheduled(fixedRate = 60000)
   public void generateReport() {
       // Simulate report generation logic
       System.out.println("Report generated at " + LocalDateTime.now());
   }
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

3. 일정 옵션:

- fixedRate: 일정 간격(예: 매 60초마다)으로 메소드를 실행합니다.
- fixedDelay: 마지막 호출 종료와 다음 시작 사이에 고정된 지연을 두고 메소드를 실행합니다.
- cron: 일정을 정의하기 위해 cron 표현식을 사용합니다.

예시:

```js
  @Scheduled(cron = "0 0 * * * ?")
   public void generateDailyReport() {
       System.out.println("Daily report generated at " + LocalDateTime.now());
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

# 3. 메시징 시스템 사용

더 복잡한 백그라운드 처리가 필요할 때 특히 작업을 여러 인스턴스나 서비스로 분산해야 하는 경우에는 RabbitMQ나 Kafka와 같은 메시징 시스템을 사용하는 것이 매우 효과적일 수 있습니다.

RabbitMQ 설정:

1. 종속성 추가:
   pom.xml이나 build.gradle에 RabbitMQ 스타터를 포함시킵니다.

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
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

2. RabbitMQ 구성:
   application.properties에서 RabbitMQ 연결 설정 구성.

```js
spring.rabbitmq.host = localhost;
spring.rabbitmq.port = 5672;
spring.rabbitmq.username = guest;
spring.rabbitmq.password = guest;
```

3. 메시지 수신기 정의:

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

```java
@Service
public class TaskListener {

    @RabbitListener(queues = "taskQueue")
    public void handleTask(String task) {
        // 작업 처리
        System.out.println("작업 처리 중: " + task);
    }
}
```

4. 메시지 보내기:

```java
@Service
public class TaskSender {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendTask(String task) {
        rabbitTemplate.convertAndSend("taskQueue", task);
    }
}
```

5. 작업을 트리거하는 컨트롤러:

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

```java
@RestController
public class TaskController {

    @Autowired
    private TaskSender taskSender;

    @PostMapping("/send-task")
    public ResponseEntity<String> sendTask(@RequestParam String task) {
        taskSender.sendTask(task);
        return ResponseEntity.ok("작업이 대기열로 전송되었습니다");
    }
}
```

# 4. Executor Services 사용하기

Spring Boot은 더 고급 스레딩 요구 사항을 충족하기 위해 `ExecutorService`를 지원합니다. 커스텀 executor를 정의하고 스레드 풀을 효과적으로 관리할 수 있습니다.

## 설정:

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

- 작업 실행기를 정의하세요:

```js
@Configuration
   public class ExecutorConfig {

       @Bean
       public Executor taskExecutor() {
           ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
           executor.setCorePoolSize(5);
           executor.setMaxPoolSize(10);
           executor.setQueueCapacity(25);
           executor.setThreadNamePrefix("MyExecutor-");
           executor.initialize();
           return executor;
       }
   }
```

2. 서비스에서 실행기 사용하기:

```js
 @Service
   public class FileProcessingService {

       @Autowired
       private Executor taskExecutor;

       public void processFiles(List<File> files) {
           for (File file : files) {
               taskExecutor.execute(() -> processFile(file));
           }
       }

       private void processFile(File file) {
           // 파일 처리 로직
           System.out.println("파일 처리 중: " + file.getName());
       }
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

# Spring Boot에서 백그라운드 처리 다루는 최상의 방법

강력한 백그라운드 처리는 견고하고 확장 가능하며 반응성 있는 Spring Boot 애플리케이션을 구축하는 데 중요합니다. Spring Boot에서 백그라운드 작업을 처리할 때 따라야 할 몇 가지 최상의 방법은 다음과 같습니다:

## 1. 작업에 적합한 도구 사용

Spring Boot는 `@Async`, `@Scheduled` 및 RabbitMQ 또는 Kafka와 같은 메시징 시스템을 포함하여 여러 방법으로 백그라운드 처리를 다룰 수 있습니다. 요구 사항에 따라 적절한 도구를 선택하세요:

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

- 간단한 비동기 작업: `@Async`를 사용하세요.
- 주기적인 작업: `@Scheduled`를 사용하세요.
- 복잡한 워크플로 또는 분산 작업: RabbitMQ나 Kafka와 같은 메시징 시스템을 사용하세요.

## 2. 스레드 풀 효과적으로 관리하기

적절한 스레드 관리는 리소스 고갈을 피하고 최적의 성능을 보장하기 위해 중요합니다. 동시 작업을 효율적으로 처리하기 위해 스레드 풀을 구성하세요:

- 사용자 정의 스레드 풀을 정의하세요:

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

```java
@Configuration
public class ExecutorConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("MyExecutor-");
        executor.initialize();
        return executor;
    }
}
```

- 대규모 풀 크기 피하기: 지나치게 큰 쓰레드 풀은 리소스 경합을 유발할 수 있습니다. 쓰레드 수를 시스템 용량과 균형 있게 맞춰주세요.

## 3. 예외 처리를 적절히 다루기

백그라운드 작업에서 처리되지 않은 예외는 예기치 않은 애플리케이션 동작이나 충돌로 이어질 수 있습니다. 항상 예외를 공손하게 처리해주세요.

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

- try-catch 블록 사용:

```js
 @Async
  public void sendEmail(String recipient, String message) {
      try {
          // 이메일 전송 로직
      } catch (Exception e) {
          // 예외 처리
      }
  }
```

- 사용자 지정 비동기 예외 처리기 사용:

```js
 @Configuration
  public class AsyncConfig implements AsyncConfigurer {

      @Override
      public Executor getAsyncExecutor() {
          ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
          executor.setCorePoolSize(10);
          executor.setMaxPoolSize(20);
          executor.setQueueCapacity(50);
          executor.setThreadNamePrefix("MyExecutor-");
          executor.initialize();
          return executor;
      }

      @Override
      public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
          return (throwable, method, obj) -> {
              // 예외 처리
          };
      }
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

## 4. Spring의 트랜잭션 관리를 활용하세요

백그라운드 작업은 종종 데이터베이스 작업을 필요로 합니다. Spring의 트랜잭션 관리를 활용하여 데이터 일관성을 유지하세요:

- 데이터베이스를 수정하는 메서드에 `@Transactional`을 사용하세요:

```js
 @Service
  public class UserService {

      @Transactional
      public void saveUser(User user) {
          userRepository.save(user);
      }
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

- 트랜잭션을 조심해서 비동기 처리와 결합하기: 특별히 설계되지 않은 한, 비동기 메서드가 호출자의 트랜잭션 컨텍스트에 의존하지 않도록 주의하세요.

## 5. 백그라운드 작업 모니터링 및 로깅

모니터링과 로깅은 백그라운드 작업의 성능과 상태를 이해하는 데 꼭 필요합니다:

- 적절한 로깅 사용: 백그라운드 작업의 진행 상황과 결과를 추적하는 로깅 문장을 포함하세요.

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

```java
@Async
public void sendEmail(String recipient, String message) {
    try {
        logger.info("Sending email to {}", recipient);
        // Email sending logic
        logger.info("Email sent to {}", recipient);
    } catch (Exception e) {
        logger.error("Error sending email to {}", recipient, e);
    }
}
```

- **모니터링 도구 통합:** 스프링 부트 액추에이터, 프로메테우스, 혹은 그라파나와 같은 도구를 사용하여 작업 실행 및 시스템 성능을 모니터링합니다.

## 6. 성능 최적화

백그라운드 작업의 성능을 최적화하여 애플리케이션의 응답성에 부정적인 영향을 미치지 않도록 합니다.

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

- 블로킹 작업은 피하십시오: 가능한 경우 블로킹 I/O 작업 및 비동기 프로그래밍 모델을 선호하십시오.
- JVM 및 가비지 수집 설정 조정: 백그라운드 작업의 성능을 향상시키기 위해 JVM 설정을 최적화하십시오.

## 7. 작업 의존성 및 조정 처리

복잡한 워크플로우의 경우 적절한 작업 조정 및 작업 간 의존성 처리를 보장하십시오:

- 오케스트레이션 프레임워크 사용: Spring Batch나 Camunda와 같은 워크플로 엔진과 같은 오케스트레이션 프레임워크 사용을 고려하십시오.
- 아이덤포턴시 보장: 가능한 경우 작업을 아이덤포텐트하게 설계하여 부작용이 발생하지 않고 재시도를 graceful하게 처리하십시오.

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

## 8. Idempotency 및 재시도 보장하기

외부 시스템 또는 네트워크와 관련된 백그라운드 작업은 재시도를 원활하게 처리하기 위해 이덤포턴트해야 합니다:

- 이덤포턴트 설계: 작업이 부작용이나 데이터 손상 없이 재시도될 수 있도록 보장합니다.
- 재시도 로직 구현: Spring Retry 또는 유사한 메커니즘을 사용하여 일시적인 실패를 처리합니다.

```java
  @Retryable(value = { SomeTransientException.class }, maxAttempts = 3, backoff = @Backoff(delay = 2000))
  public void performTask() {
      // 작업 로직
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

## 9. 안전한 백그라운드 처리

보안은 민감한 데이터를 다루거나 특권 작업을 수행할 때에 특히 백그라운드 처리에서 중요합니다:

- 민감한 작업 보호: 민감한 데이터를 처리하는 백그라운드 작업이 안전하고 보안 관련 모법에 준하는지 확인합니다.
- 적절한 인증 및 권한 사용: 백그라운드 작업이 적절한 권한과 접근 제어로 실행되도록 확인합니다.

## 10. 우아한 종료

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

친절한 톤으로 번역하면 다음과 같습니다.

"애플리케이션이 원활하게 종료되도록하고 백그라운드 작업이 완료되거나 안전하게 중단될 수 있도록해주세요:

- 원활한 종료 구현: 스레드 풀과 executor를 구성하여 종료 중에 작업이 완료될 수 있도록 합니다.

```js
 @PreDestroy
  public void onDestroy() {
      executor.shutdown();
      try {
          if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
              executor.shutdownNow();
          }
      } catch (InterruptedException e) {
          executor.shutdownNow();
      }
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

Spring Boot은 다양한 도구와 기술을 제공하여 백그라운드 처리를 다루는 데 필요한 다양한 요구 사항과 복잡성을 맞춤화할 수 있습니다. 간단한 비동기 메소드, 예약된 작업 또는 메시징 시스템을 사용한 분산 처리가 필요하더라도, Spring Boot은 백그라운드 처리를 간편하고 효율적으로 만들기 위한 견고한 지원을 제공합니다. 이 기능을 활용함으로써 응용 프로그램이 반응적이고 확장 가능하며 백그라운드에서 시간 소모적인 작업을 효율적으로 관리하는 것을 보장할 수 있습니다.

# Stackademic 🎓

끝까지 읽어 주셔서 감사합니다. 떠나시기 전에:

- 박수를 치시고 작가를 팔로우해 주세요! 👏
- 팔로우: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문: In Plain English | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠를 다루는 블로깅 플랫폼에 지치셨나요? Differ를 시도해 보세요
- Stackademic.com에서 더 많은 콘텐츠를 확인하세요
