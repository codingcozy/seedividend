---
title: "Spring Boot 3로 분산 추적하는 방법  Micrometer와 OpenTelemetry 비교"
description: ""
coverImage: "/assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_0.png"
date: 2024-07-01 16:44
ogImage: 
  url: /assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_0.png
tag: Tech
originalTitle: "Distributed Tracing with Spring Boot 3 — Micrometer vs OpenTelemetry"
link: "https://medium.com/itnext/distributed-tracing-with-spring-boot-3-micrometer-vs-opentelemetry-b3593546f61b"
---


<table> 태그를 Markdown 형식으로 변경해주세요.

<div class="content-ad"></div>

## Micrometer 추적 시작하기

기존의 Spring Boot 3 애플리케이션이 있다고 가정하면, 추적을 시작하는 간단한 방법은 Micrometer Tracing 라이브러리를 사용하는 것입니다. 아래 종속성을 추가해야 합니다:

```js
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- 추적 API 추가 -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing</artifactId>
</dependency>

<!-- 추적 구현체 추가 -->
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-otel</artifactId>
</dependency>

<!-- 추적을 저장하는 익스포터 추가 -->
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-otlp</artifactId>
</dependency>
```

추적에 사용되는 라이브러리(Micrometer)와 추적 데이터가 전송되는 익스포터(Jaeger)를 모두 교체할 수 있는 OpenTelemetry와 OTLP를 완전히 공급업체 중립적인 구현으로 사용할 수 있다는 점에 유의하세요.

<div class="content-ad"></div>

Jaeger를 Exporter로 선택했기 때문에 실행해야 합니다. 아래 명령어로 시작해보세요:

```js
docker run --rm -d --name jaeger \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  jaegertracing/all-in-one:1.53
```

application.yaml 파일에 아래 항목을 추가하여 모든 요청이 추적되도록 설정하세요 (기본적으로는 요청의 10%만 추적됩니다). Jaeger의 엔드포인트도 구성되어 있습니다.

```js
spring:
  application:
    name: "http-service1"

management:
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://localhost:4318/v1/traces
  endpoints:
    web:
      exposure:
        include: "*"  
```

<div class="content-ad"></div>

저희 예제 애플리케이션은 두 개의 서비스로 구성되어 있어요. HTTP 서비스 1은 HTTP 서비스 2에 REST 호출을 하고, HTTP 서비스 2는 원격 서비스에 동기 REST 호출을 하여 커밋 메시지를 가져옵니다. 그리고 이 메시지를 서비스 1로 반환해요.

![이미지](/assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_1.png)

이제 애플리케이션을 시작하고 HTTP 요청을 보내보세요. 브라우저에서 http://localhost:16686에 Jaeger를 방문하여 요청의 추적 정보를 확인할 수 있어요.

![이미지](/assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_2.png)

<div class="content-ad"></div>

기본적으로 많은 라이브러리가 자동으로 추적됩니다. Instrumented Projects에서 전체 목록을 확인할 수 있습니다. JDBC와 같은 일부 라이브러리는 추적을 활성화하려면 pom.xml에 특정 종속성을 추가해야 합니다.

## Micrometer Observation API를 사용하여 사용자 정의 스팬 생성

기본 추적은 좋지만 실제 추적의 가치를 실현하려면 비즈니스 컨텍스트를 가진 사용자 정의 스팬을 추가해야 합니다. 이를 통해 "주문을 한 사용자는 누구인가?", "특정 테넌트의 요청이 왜 느린가?", "이 사용자가 이 추적 번호로 주문한 주문의 배송이 지연된 이유는 무엇인가?"와 같은 질문에 답변할 수 있습니다.

샘플 애플리케이션에서는 원격 서비스에서 가져온 실제 커밋 메시지를 추적하고 싶습니다. 다음은 원격 시스템에서 랜덤 "커밋 메시지"를 가져오기 위해 HTTP 호출을 수행하는 서비스의 예입니다. 실제 커밋 메시지는 스팬 태그로 캡처됩니다.

<div class="content-ad"></div>

```java
@Service
class FetchCommitService {

    private final RestTemplate restTemplate;
    private final ObservationRegistry registry;

    FetchCommitService(RestTemplate restTemplate, ObservationRegistry registry) {
        this.restTemplate = restTemplate;
        this.registry = registry;
    }

    String fetchCommit() {
        var observation = Observation.createNotStarted("fetch-commit", registry).start();

        try (var ignored = observation.openScope()) {
            String commitMsg = this.restTemplate.getForObject("https://whatthecommit.com/index.txt", String.class);
            observation.highCardinalityKeyValue("commit.message", commitMsg);
            observation.event(Observation.Event.of("commit-fetched"));
            return commitMsg;
        } finally {
            observation.stop();
        }
    }
}
```

지켜볼 것은 두 가지 유형의 관찰이 있습니다. 낮은 cardinality와 높은 cardinality가 있습니다. 만약 키에 수천 개의 다른 값이 예상되면 높은 cardinality를 사용하세요. 값이 제한된 집합이라면 낮은 cardinality 관찰을 만드세요.

Jaeger에서 추적을 확인해 봅시다. 커밋 메시지를 포함한 commit.message 태그가있는 fetch-commit이라는 새로운 스팬에 주목하세요. 추적에서 비즈니스에 관련된 데이터를 캡처했습니다!

<img src="/assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_3.png" />


<div class="content-ad"></div>

Observation API를 사용하는 또 다른 장점은 모든 관측치가 메트릭과 추적을 모두 생성한다는 것입니다. 확인해보기 위해 액추에이터 메트릭 엔드포인트인 http://localhost:8081/actuator/metrics/fetch-commit을 호출해봅시다. 기본적으로 메트릭의 개수, 총 시간 및 최대 값이 계산됩니다. Micrometer Prometheus 라이브러리를 사용하면 이러한 메트릭을 특정 형식으로 변환하고 Prometheus에 저장할 수 있습니다.

```js
{
  "name": "fetch-commit",
  "baseUnit": "seconds",
  "measurements": [
    {
      "statistic": "COUNT",
      "value": 2.0
    },
    {
      "statistic": "TOTAL_TIME",
      "value": 1.836001333
    },
    {
      "statistic": "MAX",
      "value": 0.0
    }
  ],
  "availableTags": [
    {
      "tag": "error",
      "values": [
        "none"
      ]
    }
  ]
}
```

또한 Observation API 대신 Micrometer의 저수준 추적 API를 직접 사용할 수도 있습니다. 이를 하는 유일한 이유는 메트릭을 생성하지 않기 위해서일 것입니다.

## OpenTelemetry 자동 Instrumentation 시작하기

<div class="content-ad"></div>

Micrometer은 Spring Boot 애플리케이션을 추적하는 권장 방법입니다만, 유일한 방법은 아닙니다. OpenTelemetry 자동 계측을 직접 사용하여 Micrometer가 제공하는 추상화 계층을 건너뛸 수 있습니다.

아래 종속성을 pom.xml에 추가해보세요.

```js
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- OTLP 프로토콜을 지원하는 익스포터 -->
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-otlp</artifactId>
</dependency>

<!-- 어노테이션을 활용한 사용자 지정 스패인을 위한 종속성 -->
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-instrumentation-annotations</artifactId>
    <version>${opentelemetry-instrumentation-annotations.version}</version>
</dependency>
```

OpenTelemetry를 직접 사용하기 위해서는 애플리케이션을 OpenTelemetry 에이전트와 함께 실행해야 합니다. 아래 명령어로 두 서비스를 시작해보세요:

<div class="content-ad"></div>

```js
java -javaagent:./opentelemetry-javaagent.jar \
  -Dotel.service.name=http-service1 \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -Dotel.exporter.otlp.protocol=grpc \
  -Dotel.traces.exporter=otlp \
  -Dotel.metrics.exporter=none \
  -jar otel-http/httpservice1/target/httpservice1-0.0.1-SNAPSHOT.jar

java -javaagent:./opentelemetry-javaagent.jar \
  -Dotel.service.name=http-service2 \
  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
  -Dotel.exporter.otlp.protocol=grpc \
  -Dotel.traces.exporter=otlp \
  -Dotel.metrics.exporter=none \
  -jar otel-http/httpservice2/target/httpservice2-0.0.1-SNAPSHOT.jar
```

옵션 -Dotel.traces.exporter는 내보내기자를 지정합니다 (유효한 옵션은 otlp, zipkin, console 및 none). 옵션 -Dotel.exporter.otlp.protocol은 OTLP 전송 프로토콜을 지정합니다 (유효한 옵션은 grpc, http/protobuf 및 http/json). 선택은 백엔드 및 해당 지원 옵션에 따라 다릅니다.

curl 호출을 실행하고 Jaeger에서 추적을 확인하세요:

<img src="/assets/img/2024-07-01-DistributedTracingwithSpringBoot3MicrometervsOpenTelemetry_4.png" />

<div class="content-ad"></div>

사용자 정의 span fetch-commit에는 commit.message 태그가 있는 사용자 정의 span이 있음을 알립니다. OpenTelemetry 자동 계측을 사용하면 아래와 같이 사용자 정의 span을 추가할 수 있습니다:

```js
@Service
class FetchCommitService {

    private final RestTemplate restTemplate;
    private final Tracer tracer;

    FetchCommitService(RestTemplate restTemplate, OpenTelemetry openTelemetry) {
        this.restTemplate = restTemplate;
        this.tracer = openTelemetry.getTracer(FetchCommitService.class.getName());
    }

    String fetchCommit() {
        Span span = tracer.spanBuilder("fetch-commit").startSpan();
        try (Scope ignored = span.makeCurrent()) {
            String commitMsg = this.restTemplate.getForObject("https://whatthecommit.com/index.txt", String.class);
            span.setAttribute("commit.message", commitMsg);
            return commitMsg;
        } finally {
            span.end();
        }
    }
}
```

코드가 매우 유사하지만 다른 라이브러리를 사용한다는 것을 알 수 있습니다. 이 접근 방식의 단점은 사용자 정의 메트릭이 생성되지 않는다는 것입니다. 반면, 자동으로 계측되는 라이브러리 목록은 Micrometer보다 훨씬 더 큽니다. pom.xml에 추가할 추가 종속성이 필요하지 않으며, 모든 것이 에이전트에서 제공됩니다. 계측된 라이브러리의 전체 목록은 다음을 참조하세요: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md#libraries--frameworks

## Micrometer Tracing 또는 OpenTelemetry Auto Instrumentation을 사용해야 할까요?

<div class="content-ad"></div>

그것은 정해진 사항이 아닙니다. 이 기본 선택 사항이 틀리다는 것은 없어요. 스프링 애플리케이션에는 Micrometer Tracing이 가는 방법일 것입니다.

자동 계측이 설정되면 중요 비즈니스 필드를 추가하여 컨텍스트를 확장하여 보다 유용하게 만드는 사용자 지정 스패를 천천히 추가할 수 있습니다.

Micrometer Tracing은 여전히 발전 중인 라이브러리이며, 지난 번에 (특히 Sleuth 라이브러리와 함께) 소규모 버전을 업그레이드하는 동안 문제가 발생했던 경험이 있습니다. 하지만 계속해서 향상될 것이며, 단일 API로 사용자 정의 메트릭 및 트레이스를 생성하는 유혹에 저항하기 어려운 매력이 있습니다.

## Micrometer을 활용한 통합 테스트

<div class="content-ad"></div>

비즈니스 컨텍스트를 제공하는 사용자 정의 span을 추가할 때, 실수로 삭제되지 않도록 하고 항상 새로운 코드가 계측되도록 하는 것이 중요합니다. Micrometer는 아래 종속성을 이용하여 코드를 테스트하고 spans 및 tags를 확인하는 방법을 제공합니다:

```js
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-integration-test</artifactId>
    <scope>test</scope>
</dependency>
```

아래는 Micrometer Observability API에서 생성된 spans 및 metrics를 확인하는 통합 테스트의 예제입니다.

```js
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = {
                "whatthecommit.url=http://localhost:${wiremock.server.port}",
        })
@AutoConfigureMockMvc
@AutoConfigureWireMock(port = 0)
class ApplicationIT extends SampleTestRunner {

    private static final String COMMIT_MESSAGE = "A funny commit message";

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObservationRegistry observationRegistry;

    @Autowired
    MeterRegistry meterRegistry;

    @Override
    protected ObservationRegistry createObservationRegistry() {
        return this.observationRegistry;
    }

    @Override
    protected MeterRegistry createMeterRegistry() {
        return this.meterRegistry;
    }

    @Override
    public TracingSetup[] getTracingSetup() {
        return new TracingSetup[]{IN_MEMORY_OTEL};
    }

    @Override
    public SampleTestRunnerConsumer yourCode() {

        return (bb, meterRegistry) -> {
            stubFor(get(urlEqualTo("/"))
                    .willReturn(aResponse()
                            .withStatus(SC_OK)
                            .withResponseBody(new Body(COMMIT_MESSAGE)))
            );

            this.mockMvc.perform(MockMvcRequestBuilders.get("/"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(containsString(COMMIT_MESSAGE)));

            SpansAssert.assertThat(bb.getFinishedSpans())
                    .haveSameTraceId()
                    .hasNumberOfSpansEqualTo(3)
                    // 스팬 1 확인
                    .thenASpanWithNameEqualTo("http get")
                    .hasKindEqualTo(Kind.CLIENT)
                    .hasTag("method", "GET")
                    .hasTag("status", "200")
                    .backToSpans()
                    // 스팬 2 확인
                    .thenASpanWithNameEqualTo("fetch-commit")
                    .hasTag("commit.message", COMMIT_MESSAGE)
                    .hasEventWithNameEqualTo("commit-fetched")
                    .backToSpans()
                    // 스팬 3 확인
                    .thenASpanWithNameEqualTo("http get /")
                    .hasKindEqualTo(Kind.SERVER)
                    .hasTag("method", "GET")
                    .hasTag("http.url", "/")
                    .hasTag("status", "200");

            MeterRegistryAssert.assertThat(meterRegistry)
                    .hasTimerWithNameAndTags("fetch-commit", Tags.of(Tag.of("error", "none")))
                    .hasMeterWithName("fetch-commit.commit-fetched");
        };
    }
}
```

<div class="content-ad"></div>

원격 서비스가 WireMock으로 대체되는 전형적인 IT입니다. REST 엔드포인트는 MockMvc로 호출되고 예상 응답이 확인됩니다. 또한, Micrometer에 의해 생성될 것으로 예상되는 스팬 및 메트릭을 검증합니다.

게시물을 마치기 전에 몇 가지 일반적인 우려 사항에 대해 논의하려 합니다.

## 자바 에이전트는 응용 프로그램 성능에 부정적인 영향을 미칩니다!

모든 에이전트가 그렇지는 않습니다. 제대로 작성되지 않은 에이전트는 성능에 영향을 미치기 쉬우며 OpenTelemetry 에이전트는 해당 사례 중 하나가 아닙니다. 또한, 일반적으로 에이전트의 성능에 대한 잔류적인 영향이 여러분이 생각하는 것만큼 나쁘지 않을 수 있습니다.

<div class="content-ad"></div>

애플리케이션의 성능이 중요하다면 몇 가지 테스트를 진행하고 결과를 측정한 다음 결정하세요. 그러나 에이전트 기반 솔루션을 맹목적으로 거부하는 것은 좋지 않아요.

## 추적 코드가 내 비즈니스 로직과 얽혀 있어요!

네, 안타깝게도 이것을 피할 수 없어요. 하지만 생각해보세요. 추적의 아이디어는 제품의 비즈니스 코드 동작에 대한 통찰력을 얻는 것이에요. 자동 계기 활성화는 최상의 경우에도 HTTP, JDBC, 메시징 및 기타 통합 지점 주변의 일반적인 통찰력을 제공할 뿐이에요. 그러나 제품에서 알 수 없는 사건을 이해하는 데 도움이 되는 진짜 통찰력을 얻으려면 캡처된 추적에 비즈니스 컨텍스트를 포함해야 해요.

그래서 추적이 비즈니스 로직의 필수적인 부분임을 받아들이세요. 결국 로깅 문이 비즈니스 코드 내부에 배치될 수 있다면 왜 추적을 배치하지 않을까요?

<div class="content-ad"></div>

## 추적이 필요하지 않아요. 로그에서의 상관 ID만 있으면 돼요!

네, 그렇죠. 추적 대신 로그에서의 상관 ID를 요구하는 것은 자동차가 있는데 말 소마찬가지에 달려 있는 것을 요구하는 것과 같아요. 분산 추적은 단순히 서비스 간에 요청을 연결하는 것 이상을 제공해요. 각 서비스에서 요청의 지연 시간 측정을 제공해요. 쿼리 추적을 통해 N+1 쿼리 문제를 쉽게 식별할 수 있어요. 좋은 추적 저장 엔진은 이상 현상과 특이한 추세를 식별하는 데 도움이 되며 (Honeycomb에 감사드려요!).

뿐만 아니라 Micrometer와 OpenTelemetry 라이브러리는 로그에 추적 및 Span ID를 주입할 수 있도록 지원하기 때문에 상관 ID를 포기할 필요가 없어요. 이제 더 이상 분산 추적을 피하기 위한 핑계는 없어요!

## Spring Native GraalVM 애플리케이션은 어떨까요?

<div class="content-ad"></div>

Micrometer과 OpenTelemetry은 둘 다 Spring 네이티브 애플리케이션에서 사용할 수 있어요. OpenTelemetry 에이전트는 직접 사용할 수 없지만, 특정 종속성을 추가할 수 있어요.

다음 예시 코드를 따라서 Micrometer와 Spring Native, 그리고 OpenTelemetry와 Spring Native를 사용해 보세요. 저는 개인적으로 Micrometer가 네이티브 Spring 애플리케이션과 함께 사용하기에 더 쉽다고 생각해요. OpenTelemetry의 수동 계측 (에이전트 없음)은 다양한 계측 라이브러리와 설정의 적절한 구성이 필요해 번거로울 수 있어요.

## 결론

측정 및 추적을 통한 가시성은 몇 년 전과는 많이 다르죠. Java 스택에서는 이미 라이브러리들이 성숙해졌기 때문에 지금 바로 애플리케이션에 적용하고 프로 수준의 생산 문제 해결 능력을 갖추세요!

<div class="content-ad"></div>

GitHub에서 완전히 작동하는 코드 샘플을 확인하실 수 있어요.