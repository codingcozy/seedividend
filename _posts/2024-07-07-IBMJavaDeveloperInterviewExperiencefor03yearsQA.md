---
title: "IBM Java 개발자 인터뷰 경험 0-3년 질문과 답변"
description: ""
coverImage: "/assets/img/2024-07-07-IBMJavaDeveloperInterviewExperiencefor03yearsQA_0.png"
date: 2024-07-07 02:32
ogImage: 
  url: /assets/img/2024-07-07-IBMJavaDeveloperInterviewExperiencefor03yearsQA_0.png
tag: Tech
originalTitle: "IBM Java Developer Interview Experience for 0–3 years(Q,A)"
link: "https://medium.com/@rathod-ajay/ibm-java-developer-interview-experience-for-0-3-years-q-a-28cd8c57fc08"
isUpdated: true
---




안녕하세요 여러분! 이 글에서는 0-3년 경력을 가진 자바 개발자의 최근 인터뷰 경험을 살펴볼 것입니다. 이는 인터뷰를 준비하는 자바 개발자들에 도움이 될 것입니다.

![이미지](/assets/img/2024-07-07-IBMJavaDeveloperInterviewExperiencefor03yearsQA_0.png)

## 스프링 빈 범위와 사용 사례는 무엇인가요?

스프링 프레임워크는 여러 빈 스코프를 지원하며 이는 애플리케이션 컨텍스트 내에서 빈의 라이프사이클과 가시성을 정의합니다. 주요 범위는 다음과 같습니다:

<div class="content-ad"></div>

- 싱글톤: 이것은 기본 스코프입니다. 빈의 단일 인스턴스가 생성되어 전체 애플리케이션 컨텍스트 전반에 걸쳐 공유됩니다. 이것은 상태가 없는 특성을 가지고 있습니다. 사용 사례: 서비스 클래스, DAO, 리포지토리 등.
- 프로토타입: 빈의 새로운 인스턴스가 컨테이너로부터 요청될 때마다 생성됩니다. 이것은 상태가 있는 특성을 가지고 있습니다. 사용 사례: 상태를 가진 빈이거나 스레드에 안전하지 않은 경우.
- 요청: HTTP 요청마다 빈의 새로운 인스턴스가 생성됩니다. 이 스코프는 웹 애플리케이션에 특화되어 있습니다. 사용 사례: 사용자별 상태를 포함하고 스레드에 안전하지 않은 빈.
- 세션: HTTP 세션마다 빈의 새로운 인스턴스가 생성됩니다. 이 스코프는 또한 웹 애플리케이션에 특화되어 있습니다. 사용 사례: 사용자 세션 데이터를 유지해야 하는 빈.
- 애플리케이션: 빈의 단일 인스턴스가 애플리케이션의 모든 서블릿 컨텍스트에 걸쳐 공유됩니다. 사용 사례: 전역 구성 데이터와 같이 애플리케이션 수준에서 공유해야 하는 빈.
- WebSocket: WebSocket 연결마다 빈의 새로운 인스턴스가 생성됩니다. 이것은 WebSocket을 사용하는 애플리케이션에 특화되어 있습니다. 사용 사례: WebSocket 사용자 세션에 특화된 빈들.

각 스코프는 빈의 필요한 라이프사이클과 애플리케이션 전반에 걸쳐 가시성에 따라 다양한 사용 사례를 제공합니다. 싱글톤과 프로토타입이 가장 일반적으로 사용되는 스코프이며, 다른 스코프들은 주로 웹 애플리케이션에 특화되어 있습니다.

## 쓰레드를 생성할 수 있는 방법은 몇 가지인가요?

자바에서는 두 가지 주요 방법으로 쓰레드를 생성할 수 있습니다:

<div class="content-ad"></div>

- Thread 클래스 확장:

  - Thread 클래스를 확장한 새로운 클래스를 생성합니다.
  - run() 메서드를 재정의하여 새로운 스레드에서 실행할 코드를 정의합니다.
  - 클래스의 인스턴스를 생성하고 start() 메서드를 호출하여 새 스레드를 실행합니다.

- Runnable 인터페이스 구현:

  - Runnable 인터페이스를 구현한 새로운 클래스를 생성합니다.
  - run() 메서드를 구현하여 새 스레드에서 실행할 코드를 정의합니다.
  - 클래스의 인스턴스를 생성하고 Thread 개체에 전달한 뒤, Thread 개체에서 start() 메서드를 호출하여 새 스레드를 실행합니다.
  - 각 방법의 간단한 예제는 다음과 같습니다:

<div class="content-ad"></div>

Thread 클래스를 확장하는 방법:

```js
class MyThread extends Thread {
    public void run() {
        // 새로운 스레드에서 실행할 코드
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start(); // 새로운 스레드 시작
    }
}
```

Runnable 인터페이스를 구현하는 방법:

```js
class MyRunnable implements Runnable {
    public void run() {
        // 새로운 스레드에서 실행할 코드
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread t = new Thread(myRunnable);
        t.start(); // 새로운 스레드 시작
    }
}
```

<div class="content-ad"></div>

두 가지 방법 모두 유효하지만 Runnable 인터페이스를 구현하는 것이 더 유연합니다. 필요에 따라 클래스가 다른 클래스를 확장할 수 있습니다.

## 아래 코드의 출력은 무엇입니까?

```js
thread.run();
thread.run();
thread.start();
```

## String 유형의 HashSet을 만들고 중복 문자열을 추가합니다. 아래 프로그램의 출력은 무엇입니까?

<div class="content-ad"></div>

```js
hs.add("Abcd");
hs.add("efg");
hs.add("abcd");
String s = new String("Abcd");
hs.add(s);
hs.add("Abcdefg");
```

```js
System.out.println(hs);
```

## Micro-service 아키텍처를 사용하는 이점은 무엇인가요?

마이크로서비스 아키텍처는 특히 복잡하고 대규모이며 발전 중인 응용 프로그램에 대해 여러 가지 이점을 제공합니다. 다음은 주요 이점 중 일부입니다:

<div class="content-ad"></div>

- 모듈화: 복잡한 애플리케이션을 작은 관리 가능한 조각들로 분해하여 개발, 유지보수 및 이해하기 쉽게 만들어줍니다.
- 확장성: 개별 구성 요소를 독립적으로 확장할 수 있어 자원을 효율적으로 사용하고 애플리케이션 전반의 성능을 향상시킬 수 있습니다.
- 기술적 유연성: 서로 다른 프로그래밍 언어로 작성된 마이크로서비스는 다른 데이터 저장 기술을 사용하고 전체 시스템에 영향을 주지 않고 새로운 기술을 도입할 수 있습니다.
- 빠른 배포: 작고 독립적인 서비스를 빠르게 배포할 수 있어 릴리스 주기가 가속화되며 지속적 전달 및 배포가 가능합니다.
- 내구성: 한 서비스의 실패가 전체 시스템을 다운시키지 않습니다. 마이크로서비스의 모듈화 구조는 더 나은 오류 격리와 복구를 가능하게 합니다.
- 오류 격리 향상: 각 마이크로서비스가 독립적이므로 문제를 특정 서비스로 빠르게 격리할 수 있어 문제 해결과 복구가 빨라집니다.
- 개발 팀 확장이 쉬움: 마이크로서비스를 사용하면 조정 오버헤드를 거의 필요로 하지 않고 분산 개발팀이 별도 서비스에 동시에 작업할 수 있습니다.
- 클라우드 최적화: 클라우드 환경에 적합한 마이크로서비스는 탄력성, 배포 자동화 및 확장을 제공합니다.
- 비즈니스 민첩성 강화: 더 빠른 업데이트를 가능하게 하고 새로운 기능 도입 속도를 향상시킨 마이크로서비스 아키텍처는 비즈니스 민첩성을 지원하여 기업이 시장 변화에 빠르게 대응할 수 있도록 합니다.

## 마이크로서비스 간 통신에서 가벼운 프로토콜이자 보편적으로 사용되는 것은 무엇인가요?

HTTP 프로토콜 기반의 마이크로서비스가 일반적으로 사용되며, 유용한 것을 발견하면 알려주세요.

## 서비스 간의 실패가 다른 서비스로 전파되는 것을 방지하기 위해 어떤 마이크로서비스 패턴을 사용하나요?

<div class="content-ad"></div>

다른 서비스로의 장애 전이를 방지하기 위해 사용되는 마이크로서비스 패턴은 회로 차단기 패턴(Circuit Breaker pattern)입니다.

회로 차단기 패턴은 장애를 감지하고 장애가 계속 발생하는 것을 막는 로직을 캡슐화하여 시스템이 더 큰 피해를 입지 않도록 하는 것을 목표로 합니다.

마이크로서비스 구성요소가 건강하지 않아지면 회로 차단기가 작동하여 해당 구성요소로의 추가 호출이 차단되거나 리디렉션되며, 일반적으로 대체 응답이 반환됩니다. 일정 기간이 지난 후, 회로 차단기는 제한된 횟수의 테스트 요청이 통과하도록 허용합니다.

이 요청들이 성공하면 회로 차단기가 정상 작동으로 복귀하며, 그렇지 않은 경우 요청을 계속 차단합니다. 이 패턴은 분산 시스템에서 시스템 안정성과 탄력성을 유지하는 데 도움이 됩니다.

<div class="content-ad"></div>

## 마이크로서비스에서 REST API 호출을 어떻게 할 수 있나요?

마이크로서비스 아키텍처에서는 기술 스택 및 요구 사항에 따라 REST API 호출을 여러 가지 방법으로 할 수 있습니다. 여기에는 일반적인 방법들이 있습니다:

HTTP 클라이언트 라이브러리:

- Java: HttpClient (Java 11 이상), RestTemplate 또는 WebClient (Spring Framework)를 사용합니다.
- Python: requests 또는 http.client를 사용합니다.
- JavaScript (Node.js): axios, fetch 또는 http 및 https 모듈을 사용합니다.

<div class="content-ad"></div>

Feign Client (Spring Cloud): 스프링 애플리케이션에서의 마이크로서비스 통신을 위한 선언적 REST 클라이언트입니다. HTTP 클라이언트 작성을 간소화하고 로드 밸런싱을 위해 Ribbon 및 Eureka와 통합됩니다.

Retrofit (Java): 안드로이드 및 Java 애플리케이션용 안전한 HTTP 클라이언트입니다. REST 엔드포인트로 동기적 및 비동기적 HTTP 요청을 직접 보낼 수 있습니다.

gRPC: 모든 환경에서 실행할 수 있는 고성능 오픈 소스 범용 RPC 프레임워크입니다. 전송에 HTTP/2를 사용하며 인터페이스 설명 언어로 Protocol Buffers를 사용하며 인증, 로드 밸런싱 등의 기능을 제공합니다.

GraphQL: REST의 대안으로, API용 쿼리 언어이자 데이터에 대한 타입 시스템을 정의하여 해당 쿼리를 실행하는 런타임인 GraphQL입니다. 복잡한 시스템 및 마이크로서비스에 효율적이며 클라이언트가 필요로 하는 정확한 데이터를 요청할 수 있습니다.

<div class="content-ad"></div>

메시지 브로커(RabbitMQ, Apache Kafka)에 대해 언급하였죠? RESTful이 아니지만, 메시지 브로커는 마이크로서비스 간의 비동기 통신에 사용될 수 있으며 이벤트 기반 아키텍처를 지원합니다.

각 방법마다 통신 요구 사항, 데이터 형식, 성능 및 관련 서비스의 복잡성에 따라 사용 사례, 장단점이 있습니다.

## 스프링 부트에서 @RestController 주석은 무엇인가요?

Spring Boot의 @RestController 주석은 @Controller 및 @ResponseBody를 결합한 편리한 주석입니다. 클래스 수준에서 사용되며 모든 메서드가 뷰 대신 도메인 객체를 반환하는 컨트롤러임을 나타냅니다. 이 주석은 RESTful 웹 서비스의 생성을 간단화합니다.

<div class="content-ad"></div>

- @Controller: 해당 클래스를 웹 컨트롤러로 표시하여 HTTP 요청을 처리할 수 있도록 합니다.
- @ResponseBody: 메서드의 반환 값을 요청의 응답 본문으로 사용해야 함을 나타냅니다.

클래스를 @RestController로 주석 처리하면 Spring은 해당 컨트롤러로 처리하고 클래스의 각 메서드의 반환 값이 자동으로 JSON 또는 XML로 직렬화되어 HttpResponse 객체에 기록됩니다. 이를 통해 Spring Boot로 RESTful 웹 서비스를 구축하기에 이상적입니다.

```java
@RestController
public class ExampleController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}
```

이 예시에서 /hello로의 GET 요청은 "Hello, World!" 내용을 가진 일반 텍스트 응답을 반환합니다. @RestController 주석을 사용하면 이 문자열이 응답 본문에 직접 작성되도록 보장됩니다.

<div class="content-ad"></div>

## 스프링 부트에서 의존성 주입을 위한 빈으로 지정하는 주석은 무엇인가요?

스프링 부트에서 의존성 주입을 위한 빈으로 지정하는 주석은 `@Component` 입니다. 이 주석은 Java 클래스를 빈으로 표시하여, 주석 기반 구성 및 클래스 경로 스캔을 사용할 때 자동 감지 및 자동 구성 대상으로 만듭니다.

추가로, 특정 목적을 위한 몇 가지 특수화된 `@Component`의 형태가 있습니다:

- `@Service`: 주석이 달린 클래스가 "서비스"(예: 비즈니스 서비스 퍼사드)임을 나타냅니다.
- `@Repository`: 주석이 달린 클래스가 "리포지토리"(예: 데이터 액세스 객체)임을 나타냅니다.
- `@Controller`: 주석이 달린 클래스가 "컨트롤러"(예: 웹 컨트롤러)임을 나타냅니다.

<div class="content-ad"></div>

이러한 주석들은 주석이 달린 클래스가 자동 감지 및 의존성 주입 대상이 될 수 있습니다.

## 왜 Spring Boot 액추에이터를 사용해야 할까요?

Spring Boot 액추에이터는 애플리케이션이 프로덕션 환경으로 배포될 때 모니터링하고 관리하는 데 사용됩니다. 기본 제공되는 여러 Endpoints를 제공하여 애플리케이션을 모니터링하고 상호 작용할 수 있습니다. Spring Boot 액추에이터를 사용하는 주요 이유는 다음과 같습니다:

- 헬스 체크(Health Check): 애플리케이션에 대한 자세한 헬스 정보를 제공하여 프로덕션 환경에서 애플리케이션 상태를 확인하는 데 사용할 수 있습니다.
- 메트릭 수집(Metrics Collection): Actuator는 HTTP 요청 및 응답 통계, 데이터베이스 메트릭, 캐시 통계 등과 같은 애플리케이션 메트릭을 수집하므로 문제를 진단하고 애플리케이션 동작을 이해하는 데 중요할 수 있습니다.
- 애플리케이션 정보(Application Info): Git 버전 정보, 빌드 정보, 사용자 지정 애플리케이션 정보를 노출할 수 있습니다.
- 동적 로깅 레벨(Dynamic Logging Levels): Actuator는 애플리케이션의 로그 레벨을 다시 시작하지 않고도 실행 중에 변경할 수 있습니다.
- 쓰레드 덤프(Thread Dump): 쓰레드 덤프를 생성할 수 있어서 애플리케이션에서 데드락 상황을 진단하는 데 매우 유용할 수 있습니다.
- 환경 정보(Environment Information): 환경 속성, 구성 속성, 시스템 속성 및 환경 변수에 대한 자세한 정보를 제공합니다.
- 감사 이벤트(Audit Events): 애플리케이션이 감사 이벤트를 기록하도록 구성된 경우 Actuator는 사용자 로그인/로그아웃, 액세스 거부 등과 같은 보안 관련 이벤트에 대한 정보를 노출할 수 있습니다.
- 사용자 정의 Endpoints: 내장 Endpoints 이외에도 Actuator를 사용하여 애플리케이션에 관련된 특정 기능이나 데이터를 노출할 사용자 정의 Endpoints를 정의할 수 있습니다.

<div class="content-ad"></div>

Spring Boot Actuator는 애플리케이션 인사이트 및 관리를 위한 강력한 도구로, 제작 환경에서 애플리케이션을 유지 및 문제 해결하는 것을 더욱 쉽게 만들어 줍니다.

## Spring Boot 애플리케이션의 주요 메서드를 선언하는 데 사용되는 주석은 무엇입니까?

Spring Boot 애플리케이션의 주요 메서드를 선언하는 데 사용되는 주석은 @SpringBootApplication입니다. 이 주석은 일반적으로 주 클래스에 배치되며 여러 가지 목적을 제공합니다:

- 자동 구성을 가능하게 합니다. Spring Boot는 클래스패스에 존재하는 종속성에 기반하여 애플리케이션을 자동으로 구성할 수 있도록 합니다.
- 컴포넌트 스캔을 가능하게 합니다. Spring은 애플리케이션 컨텍스트 내에서 빈을 자동으로 찾아 등록할 수 있도록 합니다.
- 외부 구성을 위한 설정 속성을 가능하게 합니다.

<div class="content-ad"></div>

다음은 사용 예시입니다:

```js
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

## 일련의 알고리즘 패밀리를 정의하고 각각을 캡슐화하여 상호 교환할 수 있는 디자인 패턴은 무엇인가요?

일련의 알고리즘 패밀리를 정의하고 각각을 캡슐화하여 상호 교환할 수 있는 디자인 패턴은 **전략 패턴**입니다. 이 패턴은 알고리즘을 독립적으로 변화하도록 허용하며, 일련의 알고리즘을 정의하여 각각을 별도의 클래스로 캡슐화하고 이들을 공통 인터페이스를 통해 상호 교환할 수 있도록 합니다.

<div class="content-ad"></div>

## 객체에 동적으로 새 기능을 추가하는 데 사용되는 디자인 패턴은 무엇인가요?

개체에 새 기능을 동적으로 추가하는 데 사용되는 디자인 패턴은 데코레이터 패턴입니다. 이 패턴을 사용하면 특정 개체에 동적이나 정적으로 동작을 추가할 수 있습니다. 이 클래스의 다른 개체들의 동작에 영향을 미치지 않은 채 동작을 추가할 수 있습니다. 데코레이터 패턴은 클래스의 기능을 유연하고 재사용 가능하게 확장(장식)하는 데 자주 사용됩니다.

## 스프링 부트에서 어떻게 클라우드 쪽 로드 밸런싱이 수행되나요?

스프링 부트에서의 클라우드 측 로드 밸런싱, 즉 서버 측 로드 밸런싱은 일반적으로 응용프로그램 자체가 아닌 클라우드 인프라나 전용 로드 밸런서 장치에 의해 관리됩니다. 이 접근 방식은 클라우드 제공 업체(예: AWS, Azure, Google Cloud)나 전용 로드 밸런서(예: NGINX, HAProxy)의 기능을 활용하여 응용프로그램 트래픽을 여러 응용프로그램 인스턴스로 분산하여 응용프로그램의 응답 시간과 가용성을 향상시킵니다.

<div class="content-ad"></div>

## 자바에서 예외를 처리하는 데 사용되는 키워드는 무엇인가요?

자바에서 예외를 처리하는 데 사용되는 키워드는 try-catch입니다. 또한 예외가 발생하든 발생하지 않든 반드시 실행되어야 하는 코드와 함께 try-catch와 함께 finally 키워드를 사용할 수 있습니다.

## 정적 블록에서 예외를 던질 수 있나요?

네, 자바에서 정적 블록에서 예외를 던질 수 있습니다. 그러나 정적 블록은 클래스가 로드될 때 실행되기 때문에 클래스 선언에서 throws 키워드로 선언된 검사 예외를 던질 수 있습니다. 이것은 자바에서 허용되지 않습니다. 따라서 정적 블록에서 선언하지 않고도 검사되지 않는 예외(런타임 예외)만 선언할 수 있습니다. 예를 들어, 여기에 예시가 있습니다:

<div class="content-ad"></div>

```java
public class MyClass {
    static {
        // 정의되지 않은 (런타임) 예외를 발생시킵니다.
        throw new RuntimeException("정적 블록에서 발생한 예외");
    }
}
```

정적 블록에서 예외를 처리하지 않고 직접 확인된 예외를 발생시키려고 하면 컴파일 오류가 발생합니다.

## 하나의 try-catch 블록에 2개의 finally 블록을 사용할 수 있나요?

Java에서는 하나의 try-catch 블록에 두 개의 finally 블록을 사용할 수 없습니다. 각 try 블록 뒤에는 0개 이상의 catch 블록이 올 수 있고 오직 하나의 finally 블록만이 허용됩니다. finally 블록은 선택 사항이지만, 존재하는 경우 try와 모든 catch 블록 뒤에 와야 합니다.

<div class="content-ad"></div>

## Read timeout과 connection timeout의 차이점은 무엇인가요?

네트워크 작업과 관련된 맥락에서, HTTP 요청을 포함하는 경우, "read timeout"과 "connection timeout"이라는 용어는 두 가지 다른 시간 초과 동작을 가리킵니다:

- Connection Timeout: 두 시스템 간의 연결을 설정하는 시간 제한입니다. 이는 클라이언트가 서버와의 연결을 설정하는 데 기다릴 수 있는 최대 시간을 지정합니다. 이 시간 내에 연결을 설정할 수 없는 경우(네트워크 문제, 서버 다운 등으로 인해), 시도가 중단되고 연결 시간 초과 오류가 발생합니다.
- Read Timeout: 연결이 설정된 후에, read timeout은 클라이언트가 요청을 보낸 후에 서버로부터의 응답을 기다릴 수 있는 최대 시간을 지정합니다. 이는 데이터를 수신하기 시작하는 데 기다리는 시간을 포함하며, 응답을 다운로드하는 데 필요한 총 시간이 아닙니다. 서버가 이 시간을 초과하여 응답하는 경우, read timeout 오류가 발생하며 서버가 데이터를 보내는 데 시간이 너무 오래 걸린다는 것을 나타냅니다.

둘 다 강력한 네트워크 프로그래밍을 위해 중요한 시간 초과입니다. 응용 프로그램이 네트워크 지연과 사용 불가능 상태를 효과적으로 처리할 수 있도록 도와줍니다.

<div class="content-ad"></div>

## 정보를 수정하지 않고 정보를 안전하게 및 변함없이 검색하는 데 일반적으로 사용되는 HTTP 메소드는 무엇입니까?

정보를 수정하지 않고 안전하게 및 변함없이 정보를 검색하는 데 일반적으로 사용되는 HTTP 메소드는 GET입니다.

# 읽어 주셔서 감사합니다

- 👏 이야기에 박수를 보내주세요. 그리고 저를 팔로우해주세요 👉
- 📰 저의 Medium 페이지에서 더 많은 콘텐츠를 확인해보세요(자바 개발자 인터뷰에 관한 60개의 이야기)

<div class="content-ad"></div>

나의 책들은 여기서 찾을 수 있어요:

- 'Java 개발자 면접 가이드'는 아마존(킨들 북)과 거무로드(PDF 형식)에서 구매할 수 있어요.
- 'Spring-Boot 마이크로서비스 면접 가이드'는 거무로드(PDF 형식)와 아마존(킨들 이북)에서 구매할 수 있어요.
- 🔔 나를 팔로우해주세요: LinkedIn | Twitter | YouTube