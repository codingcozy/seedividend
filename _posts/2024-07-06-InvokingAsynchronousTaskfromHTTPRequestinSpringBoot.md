---
title: "Spring Boot에서 HTTP 요청으로 비동기 작업 호출하는 방법"
description: ""
coverImage: "/assets/img/2024-07-06-InvokingAsynchronousTaskfromHTTPRequestinSpringBoot_0.png"
date: 2024-07-06 10:37
ogImage:
  url: /assets/img/2024-07-06-InvokingAsynchronousTaskfromHTTPRequestinSpringBoot_0.png
tag: Tech
originalTitle: "Invoking Asynchronous Task from HTTP Request in Spring Boot"
link: "https://medium.com/@dennisholee/invoking-asynchronous-task-from-http-request-in-spring-boot-fccf61be41f6"
isUpdated: true
---

HTTP 요청 내에서 오랜 시간이 걸리는 작업을 호출해야 하는 상황에서 비동기 스레드를 생성하면 전체 요청-응답 시간을 줄일 수 있습니다. 보통 스레드 풀을 사용하여 비동기 프로세스를 수행하지만, 작업 대기열이 메모리 상에만 존재하기 때문에 복원력이 부족합니다. 아래 솔루션은 대기열 유형과 실행자 구현을 추상화하는 인터페이스를 도입하여 영구 저장 및 다중 인스턴스 작업자 솔루션을 가능하게 합니다.

이 솔루션의 응용흐름을 강조한 다음의 순서도를 확인할 수 있습니다:

/assets/img/2024-07-06-InvokingAsynchronousTaskfromHTTPRequestinSpringBoot_0.png

다음은 의존성입니다:

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
<의존성>
  <그룹ID>org.springframework.boot</그룹ID>
  <아티팩트ID>spring-boot-starter-webflux</아티팩트ID>
  <버전>3.2.2</버전>
</의존성>

<의존성>
  <그룹ID>org.springframework.boot</그룹ID>
  <아티팩트ID>spring-boot-starter</아티팩트ID>
  <버전>3.2.2</버전>
</의존성>

<의존성>
  <그룹ID>org.springframework.boot</그룹ID>
  <아티팩트ID>spring-boot-starter-log4j2</아티팩트ID>
  <버전>3.2.2</버전>
</의존성>

<의존성>
  <그룹ID>org.projectlombok</그룹ID>
  <아티팩트ID>lombok</아티팩트ID>
  <버전>1.18.30</버전>
  <범위>provided</범위>
</의존성>
```

Command 패턴은 요청을 비동기적으로 실행하기 위해 필요한 모든 정보를 캡슐화합니다. 서로 다른 구현을 수용할 수 있는 인터페이스가 정의됩니다.

```js
public interface Command<R> {

 R execute();
}
```

CommandQueue는 명령 (또는 스레드 풀이 실행할 작업)을 저장하기 위한 인터페이스를 제공합니다. 이 솔루션에서는 메모리 내 블로킹되지 않는 동시 큐를 사용합니다. 그러나 데이터 저장소를 사용하면 서비스의 전체 탄력성이 향상됩니다.

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
public interface CommandQueue<C extends Command<?>> {

 boolean put(C command);

 C pop();

}
```

이 큐는 내부 메모리 구조 또는 회복력을 위해 데이터베이스로 구현할 수 있습니다. 이 솔루션에서 CommandQueueDecorator는 내부 메모리 큐를 래핑하고 다음 기능을 제공합니다:

- put : 명령을 큐에 넣습니다.
- pop : 스레드 풀 처리를 위해 명령을 큐에서 제거합니다.

```java
import java.util.Queue;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
public class CommandQueueDecorator<C extends Command<?>> implements CommandQueue<C> {

 @NonNull
 Queue<C> queue;

 @Override
 public boolean put(C command) {

  try {
   queue.add(command);

   log.info("Worker queue size is {}", this.queue.size());
   return true;
  } catch (Exception e) {
   log.warn(e);
   return false;
  }
 }

 @Override
 public C pop() {

  C command = this.queue.poll();
  log.info("Dequeue command [cmd={}]", command);

  return command;
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

PrintMessageCommand은 명령의 샘플 구현체입니다.

```java
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PrintMessageCommand implements Command<Void> {

 @NonNull
 String message;

 @Override
 public Void execute() {

  System.out.println("PrintMessageCommand> " + message);

  return null;
 }
}
```

CommandExecutor에는 명령 지시를 실행하는 비동기 메서드가 포함되어 있습니다.

```java
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@EnableAsync
@Log4j2
public class CommandExecutor<C extends Command<?>> {

 @NonNull
 CommandQueue<C> commandQueue;

 @Async("threadpool")
 public void consume() {
  log.info("Consuming command.");

  C command = this.commandQueue.pop();
  command.execute();
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

대안으로 명령은 REST API를 통해 별도의 worker 인스턴스로 전송될 수 있습니다.

FooApplication은 비교적 간단한 사용 사례로, 비동기 처리를 위해 명령을 생성하고 명령 대기열에 배치하는 데 사용됩니다.

```js
import io.forest.concurrency.common.Command;
import io.forest.concurrency.common.CommandExecutor;
import io.forest.concurrency.common.CommandQueue;
import io.forest.concurrency.common.PrintMessageCommand;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
public class FooApplication {

    @NonNull
    CommandQueue<Command<?>> commandQueue;

    @NonNull
    CommandExecutor<Command<?>> commandExecutor;

    public void foo() throws InterruptedException {

        log.info("Create print message command.");
        Command<Void> cmd = new PrintMessageCommand("Hello World!");

        log.info("Append print message command to queue.");
        commandQueue.put(cmd);

        commandExecutor.consume();
    }

}
```

다음 두 클래스는 Command Pool 및 REST API에 대한 스프링 빈 구성입니다.

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
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import io.forest.concurrency.application.FooApplication;
import io.forest.concurrency.common.Command;
import io.forest.concurrency.common.CommandExecutor;
import io.forest.concurrency.common.CommandQueue;
import io.forest.concurrency.common.CommandQueueDecorator;

public class ApplicationConf {

 @Bean
 Queue<Command> queue() {
  return new ConcurrentLinkedQueue<Command>();
 }

 @Bean
 CommandQueue commandQueue(@Autowired Queue<Command> queue) {
  return new CommandQueueDecorator(queue);
 }

 @Bean
 FooApplication fooApplication(@Autowired CommandQueue commandQueue, @Autowired CommandExecutor commandPoolExecutor) {
  return new FooApplication(commandQueue, commandPoolExecutor);
 }

 @Bean
 CommandExecutor commandPoolExecutor(@Autowired CommandQueue commandQueue) {
  return new CommandExecutor(commandQueue);
 }

 @Bean(name="threadpool")
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setThreadNamePrefix("threadpool-");
        executor.initialize();
        return executor;
    }
}
```

```java
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Mono;

@Log4j2
public class AdapterRestApiConf {

 @Autowired(required = true)
 FooApplication fooApplication;

 @Bean
 RouterFunction<ServerResponse> composedNotifyRoutes() {
  return route().GET("/foo", accept(MediaType.APPLICATION_JSON), this::foo)
    .build();
 }

 Mono<ServerResponse> foo(ServerRequest request) {
  log.info("Request received");

  fooApplication.foo();

  return ServerResponse.ok()
    .bodyValue("OK");
 }

}
```

마지막으로, 어플리케이션 자체입니다.

```java
@SpringBootApplication
@EnableAsync
@Import({AdapterRestApiConf.class, ApplicationConf.class})
public class Application {

 public static void main(String[] args) {
  SpringApplication.run(Application.class, args);
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

다음은 PrintMessageCommand가 별도의 스레드에서 실행되었음을 강조한 샘플 로그 출력입니다.

```js
NettyWebServer         : Netty started on port 8080
Application            : Started Application in 2.431 seconds (process running for 2.929)
AdapterRestApiConf     : Request received
FooApplication         : Create print message command.
FooApplication         : Append print message command to queue.
CommandQueueDecorator  : Worker queue size is 1
CommandExecutor        : Consuming command.
CommandQueueDecorator  : Dequeue command [cmd=io.forest.concurrency.common.PrintMessageCommand@2995353b]
PrintMessageCommand> Hello World!
```
