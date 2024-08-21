---
title: "Spring Boot Async 사용하여 API 호출 비동기 처리하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-SpringBootAsyncAnnotationMakeAPICallsAsynchronous_0.png"
date: 2024-07-09 21:47
ogImage:
  url: /assets/img/2024-07-09-SpringBootAsyncAnnotationMakeAPICallsAsynchronous_0.png
tag: Tech
originalTitle: "Spring Boot @Async Annotation — Make API Calls Asynchronous"
link: "https://medium.com/@basecs101/spring-boot-async-annotation-make-api-calls-asynchronous-2024-latest-dcce878d0fe2"
isUpdated: true
---

## 스프링 부트 개념과 어노테이션

![Spring Boot](/assets/img/2024-07-09-SpringBootAsyncAnnotationMakeAPICallsAsynchronous_0.png)

`@Async` 어노테이션은 스프링 부트에서 메서드를 비동기적으로 실행한다는 것을 나타내기 위해 사용됩니다. 이는 해당 메서드가 별도의 스레드에서 실행되며, 호출하는 스레드가 메서드의 완료를 기다리는 동안 차단되지 않는다는 것을 의미합니다. 이는 오랜 시간이 걸리는 작업에 유용할 수 있습니다. 비동기 작업이 실행되는 동안 호출 스레드가 다른 요청을 계속 처리할 수 있기 때문입니다.

`@Async` 어노테이션은 스프링 빈에 선언된 모든 메서드와 함께 사용할 수 있습니다. 그러나 어노테이션을 사용할 때 몇 가지 주의할 점이 있습니다:

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

- 메소드는 반드시 public이어야 합니다.
- 메소드는 체크된 예외를 던지지 않아야 합니다. 만약 메소드가 체크된 예외를 던진다면, 해당 예외는 런타임 예외로 래핑되어 호출 스레드로 전달됩니다.
- 메소드는 CompletableFuture를 기본적으로 구현한 Future 인터페이스를 반환해야 합니다. 이는 호출 스레드가 비동기 작업의 결과를 완료된 후에 가져올 수 있도록 합니다.
- 또는 메소드는 void 반환 타입을 가져야 합니다.

# 참고 —

이제 @Async 능력을 시연하고 호출 스레드와 백그라운드 스레드와의 작동 방식을 살펴보기 위해 스프링 부트 애플리케이션을 빌드해 봅시다.

## 1. 스프링의 비동기 능력 활성화:

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

저희 Spring Boot 애플리케이션에서 비동기 지원을 활성화하려면 주요 애플리케이션 클래스(메인 메서드가 있는 클래스)에 @EnableAsync 어노테이션을 추가해야 합니다. 이 어노테이션을 사용하면 Spring이 @Async로 주석이 달린 메서드에 대한 비동기 처리를 구성하고 관리하도록 지시합니다.

아래의 클래스에서는 Executor를 사용자 정의하며 새 빈(taskExecutor)을 정의합니다. 여기서 메서드 이름은 taskExecutor로 지정되어 있습니다. 이는 Spring이 검색할 특정 메서드 이름이기 때문입니다.

이 경우에는 최대 동시 스레드 수를 10으로 제한하고 대기열 크기를 500으로 제한하려고 합니다. 조정할 수 있는 설정 항목이 많이 있습니다.

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

## 2. Async Service 생성:

비동기로 실행하고자 하는 메서드가 있는 서비스 클래스를 만듭니다. 이 메서드에 @Async를 주석으로 달아줍니다.

```java
package com.basecs101.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AsyncService {
    @Async
    public void performAsyncTask() {
        // 시간이 소요되는 작업 시뮬레이션
        try {
            Thread.sleep(5000); // 5초간 대기
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("비동기 작업 완료!");
    }
}
```

위의 샘플 코드에서 해당 메서드는 값을 반환하지 않습니다. 쓰레드를 메인 쓰레드로 실행하여 값을 반환하고 싶다면 다음과 같은 샘플 코드를 사용할 수 있습니다:

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
package com.basecs101.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class AsyncService {
    @Async
    public CompletableFuture<String> performAsyncTask() {
        // 시간이 많이 소요되는 작업을 모방합니다
        try {
            Thread.sleep(5000); // 5초 동안 대기
            System.out.println("비동기 작업이 완료되었습니다!");
            return CompletableFuture.completedFuture("비동기 작업이 완료되었습니다!");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return CompletableFuture.completedFuture("비동기 작업 완료에 실패했습니다!");
    }
}
```

위의 샘플 코드에서 실행 스레드는 5초 후에 CompletableFuture`String`을 반환합니다. 호출 스레드(기본적으로 메인 스레드)는 이 반환 값을 소비하거나 메인 스레드에서 반환해야 합니다.

## 3. 컨트롤러 또는 서비스에서 비동기 서비스 사용:

AsyncService를 컨트롤러 또는 다른 서비스에서 사용할 수 있습니다. performAsyncTask 메서드를 호출하면 별도의 스레드에서 비동기로 실행됩니다.

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

위의 컨트롤러는 값을 반환하지 않는 비동기 메서드에 대해 잘 작동합니다. 비동기 메서드가 CompletableFuture와 같은 값을 반환하는 경우에는 아래와 같이 컨트롤러 클래스를 업데이트해야 합니다:

```js
package com.basecs101.controller;

import com.basecs101.service.AsyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
public class MyController {

    private final AsyncService asyncService;

    public MyController(AsyncService asyncService) {
        this.asyncService = asyncService;
    }

    @GetMapping("/async-task")
    public CompletableFuture<String> triggerAsyncTask() {
        return asyncService.performAsyncTask();
    }
}
```

주 메인 스레드는 새로운 요청을 수락하고 이를 새 스레드로 위임하여 이러한 새 스레드에서 처리할 수 있지만, 각 비동기 스레드는 결과를 주 스레드에 반환하기 전에 10초 동안 기다립니다. 그러나 실제 애플리케이션에서는 결과를 기다리는 시간이 너무 길지 않을 것이며, 또한 스레드 수를 조정하여 전체 응답의 대기 시간을 최소화할 수 있습니다.

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

## 4. 애플리케이션 실행:

이전에 언급한 대로 우리만의 Spring Boot 애플리케이션을 빌드하고 실행해 봅시다. " /async-task" 엔드포인트에 액세스하면 performAsyncTask 메소드가 비동기적으로 실행되어 애플리케이션이 작업이 완료될 때까지 기다리지 않고 다른 요청에 응답할 수 있습니다.

이제 " /async-task" 엔드포인트에 액세스하면 즉시 "Async task triggered!" 메시지가 반환되며, 몇 초 후 콘솔에 "Async task completed!"가 출력되어 비동기 작업이 처리되었다는 것을 나타냅니다.

생산 애플리케이션에서 적절한 스레드 풀 크기를 구성하고 성공적으로 예외를 처리하여 애플리케이션의 비동기 처리가 효율적이고 안정적이며 성능이 우수하게 이뤄지도록 항상 설정 및 세밀하게 조정해야 합니다.

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

비크람 구프타를 팔로우하면 비슷한 콘텐츠를 확인할 수 있어요.

## 1. Java에서 ArrayList와 LinkedList 비교

## 2. Java에서 HashMap의 내부 작업

## 3. Java에서 HashMap과 ConcurrentHashMap 비교

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

## 4. Java에서 LinkedHashMap 가이드를 완성해 보세요.

## 5. Java Collection Framework에서 TreeMap의 내부 동작 방식

## 6. Java에서 HashSet의 내부 동작 방식
