---
title: "Spring 마이크로서비스에서 API 목킹 구현으로 개발 속도 높이는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-ImplementingAPIMockinginSpringMicroservicesforFasterDevelopment_0.png"
date: 2024-07-12 21:10
ogImage: 
  url: /assets/img/2024-07-12-ImplementingAPIMockinginSpringMicroservicesforFasterDevelopment_0.png
tag: Tech
originalTitle: "Implementing API Mocking in Spring Microservices for Faster Development"
link: "https://medium.com/@AlexanderObregon/implementing-api-mocking-in-spring-microservices-for-faster-development-a2c16aeeb9a4"
---


<img src="/assets/img/2024-07-12-ImplementingAPIMockinginSpringMicroservicesforFasterDevelopment_0.png" />

# 소개

안녕하세요! 코드 안에서 민첩성이 중요한 요즘, 개발자들은 계속해서 작업 흐름을 최적화하기 위한 도구와 관행을 찾고 있어요. 마이크로서비스에서는 격리된 서비스들이 디자인에 의해 원활하게 상호 작용해야 하는데, API 모킹은 이 최적화의 중요한 부분이에요. 자바 생태계에서 인기 있는 프레임워크인 Spring Boot은 모킹을 쉽게 만들어주는 유틸리티를 제공해요. 이를 통해 개발자들은 품질을 희생하지 않으면서도 개발 속도를 높일 수 있어요.

# API 모킹 소개

<div class="content-ad"></div>

API 모킹은 소프트웨어 엔지니어링 분야에서 원활한 개발을 보장하기 위한 다리 역할을 합니다. 개인 프로젝트를 수행하거나 다양한 서비스를 관리하는 대규모 팀의 구성원인 경우에도 모킹을 통해 개발 및 테스트 과정에서 어떻게 과제에 접근할지가 크게 달라질 수 있습니다.

## API 모킹이란?

API 모킹은 API 세계에서의 이중자와 유사합니다. 실제 백엔드 작업에 의존하지 않고 행동을 역모방하기 위해 실제 API의 대리자 또는 시뮬레이션을 만드는 과정입니다. 전시용 자동차의 자세한 모형을 만들어 보여주는 것을 상상해보세요. 그 모형은 자동차처럼 보이고 느껴질 수 있지만 운전을 위한 내부 기계장치가 없습니다. 마찬가지로, 모킹된 API는 실제 API처럼 보이고 응답하지만 데이터를 처리하거나 백엔드 서비스를 호출하지는 않습니다.

## API 모킹이 필요한 이유

<div class="content-ad"></div>

핵심적으로 mocking은 필요성에서 발생합니다. 개발자들은 종종 다음과 같은 시나리오에 직면합니다:

- 상호 작용해야 하는 API가 아직 개발 중인 경우.
- 실제 API를 자주 호출하는 데 비용이 발생하는 경우.
- 외부 종속성이나 서비스가 신뢰할 수 없거나 다운타임이 발생하는 경우.
- 실제 서비스로 재현하기 어렵거나 복잡한 경계 케이스를 테스트해야 하는 경우.

이러한 상황에서 모킹된 버전을 가지고 있으면 개발이 중단되는 것을 방지할 수 있습니다. 또한 더욱 통제 가능하고 격리된 테스트 환경을 구축할 수 있습니다.

## 마이크로서비스 아키텍처에서 왜 필수적인가요?

<div class="content-ad"></div>

마이크로서비스 영역에서는 아키텍처가 각각 고유한 기능을 갖는 여러 격리된 서비스로 세분화됩니다. 이러한 서비스들은 독립적이지만 통신하여 함께 작동해야 합니다.

이러한 상호 연결된 성격은 도전을 일으킬 수 있습니다. 예를 들어 한 서비스(서비스 A)가 데이터를 위해 다른 서비스(서비스 B)에 의존하는 시나리오를 상상해보세요. 서비스 B가 유지보수 중이거나 아직 개발되지 않은 경우, 서비스 A의 개발이 중단될 수 있습니다. 이때 API Mocking이 빛을 발합니다. 서비스 B의 모의사본을 만들어 두면, 서비스 A 작업을 계속할 수 있습니다. 이를 통해 한 서비스의 다운타임이나 개발 지연이 전체 시스템의 생산성에 영향을 미치는 것을 방지할 수 있습니다.

## API Mocking의 이점

- 속도: Mocking은 실제 서비스에 대한 의존성을 제거하여 개발 프로세스를 가속화합니다.
- 비용 효율성: 실제 API를 호출하는 비용을 줄여줌으로써 특히 연결된 수수료가 있는 외부 서비스의 경우 비용을 절감할 수 있습니다.
- 유연성: 개발자들은 여러 시나리오를 시뮬레이트할 수 있으며, 예외 케이스, 오류 및 특이한 응답을 포함하여 포괄적인 테스트 환경을 제공할 수 있습니다.
- 병렬 개발: 팀은 한 서비스의 완료를 기다리지 않고도 동시에 서로 다른 서비스에 대해 작업할 수 있습니다. Mocking은 종속 서비스에 대한 대기 대체가 있는지 확인합니다.

<div class="content-ad"></div>

# 스프링 부트를 이용한 마이크로서비스 개요

마이크로서비스는 현대 애플리케이션의 설계, 개발 및 배포 방식을 혁신적으로 변화시켰습니다. 단일체 애플리케이션을 구축하는 대신 애플리케이션을 작은 조각으로 분해하여 독립적으로 개발, 배포 및 확장할 수 있는 느슨하게 결합된 서비스로 구성합니다. 많은 개발자들이 마이크로서비스를 구현할 때 선호하는 선택지인 스프링 부트는 풍부한 생태계로 높은 평가를 받고 있습니다. 여기에는 다음과 같은 이유가 있습니다:

## 스프링 부트란?

스프링 부트는 대규모 스프링 생태계의 파생물인 오픈소스 Java 기반 프레임워크로, 최소한의 설정만으로 제품 수준의 애플리케이션을 구축하는 과정을 단순화하기 위해 설계되었습니다. 스프링 부트는 일련의 스타터(starter) 및 자동 구성(auto-configuration)을 제공함으로써 대부분의 뼈대 설정과 구성을 자동화할 수 있습니다.

<div class="content-ad"></div>

## 미니 서비스에 Spring Boot를 선택해야 하는 이유

- 신속한 개발: Spring Boot는 '의견에 따른 기본 설정'을 통해 개발자가 내려야 하는 결정을 최소화하여 더 빠른 개발을 가능케 합니다.
- 미니 서비스용: Spring Boot는 Spring Cloud와 매끄럽게 연동되어 서비스 발견, 설정 관리, 회로 차단기와 같은 기능으로 클라우드 네이티브 미니 서비스를 더 쉽게 개발할 수 있습니다.
- 내장 서버: Spring Boot 애플리케이션은 내장 서버(예: Tomcat)로 제공되어 외부 서버 설정이 필요하지 않습니다.
- 실행기: 이 모듈은 상태 확인 및 메트릭 같은 프로덕션 준비 기능을 제공하여, 미니 서비스를 프로덕션 환경에 배포할 때 중요합니다.
- 유연성: 의견에 따른 기본 설정에도 불구하고, Spring Boot는 유연합니다. 개발자는 필요시 기본 설정을 덮어쓸 수 있어 필요한 경우 구성을 조정할 수 있는 기회를 제공합니다.

## Spring Boot는 API 모의를 어떻게 용이하게 만드나요?

Spring Boot가 테스팅에 중점을 둔다는 것은 제공하는 도구에서 확인할 수 있습니다:

<div class="content-ad"></div>

- 통합 테스팅: Spring Boot은 JUnit 및 TestNG와 같은 테스트 라이브러리와 원활하게 통합됩니다. 이 통합은 개발자가 단위 테스트와 통합 테스트를 효율적으로 작성할 수 있는 도구를 보유하고 있음을 보장합니다.
- 테스트 슬라이스: Spring Boot이 제공하는 전문화된 어노테이션으로 애플리케이션의 특정 슬라이스를 테스트할 수 있습니다. 예를 들어 @WebMvcTest는 완전한 ApplicationContext를로드하지 않고 웹 레이어를 격리해서 테스트하는 데 사용될 수 있습니다.
- Mocking 유틸리티: Spring Boot은 Mockito와 같은 라이브러리를 번들로 제공하여 모의 객체를 생성하는 것을 용이하게 합니다. 또한 @MockBean과 같은 어노테이션을 사용하여 개발자가 Spring 컨텍스트에서 빈을 손쉽게 모의화할 수 있어 서비스를 격리해서 테스트하는 것이 간단해집니다.

## Spring Boot를 통한 마이크로서비스 진화

Spring Boot은 항상 변화하는 마이크로서비스의 환경과 발맞추며 발전했습니다. 새로운 기능과 모듈의 지속적인 추가로 현대적인 응용프로그램 아키텍처의 요구를 충족시킵니다. 예를 들어, Spring Boot Admin은 모든 마이크로서비스의 전반적인 상황을 제공하며, Spring Cloud Gateway는 API 게이트웨이 솔루션을 제공하며, Spring Security는 마이크로서비스가 안전한지 확인합니다.

# 모킹을 위한 Spring Boot 프로젝트 설정

<div class="content-ad"></div>

마이크로서비스가 소프트웨어 환경을 지배할 때, 효과적인 테스트 및 개발 관행이 매우 중요해집니다. Spring Boot을 사용하면 포괄적인 도구 세트 덕분에 프로젝트를 위한 모킹 및 테스트 설정을 간단하게 할 수 있습니다. 이제 이 과정을 자세히 살펴보겠습니다.

## 스프링 부트 프로젝트 초기화

모킹에 대해 자세히 알아보기 전에 꼭 스프링 부트 프로젝트가 필요합니다. Spring Initializr를 사용하여 프로젝트를 시작할 수 있습니다.

- Spring Initializr로 이동합니다.
- 원하는 프로젝트 유형을 선택합니다. 일반적으로 Maven 프로젝트를 선택합니다.
- 프로젝트의 언어, 버전 및 다른 메타데이터를 선택합니다.
- 'Dependencies'에서 Spring Web 및 Spring Boot Starter Test를 반드시 포함해야 합니다.
- 'Generate'를 클릭하고 프로젝트 zip을 다운로드합니다.
- 다운로드한 zip 파일을 추출하고 원하는 통합 개발 환경(IDE)에서 엽니다.

<div class="content-ad"></div>

## 목업을 위한 필수 의존성

프로젝트를 설정한 후에는 pom.xml 파일에 필요한 의존성이 있는지 확인하세요:

```js
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

첫 번째 의존성은 웹 기반 애플리케이션을 구축하는 데 사용되며, 두 번째 의존성은 테스트에 중요합니다. 목업을 위한 도구 및 라이브러리를 포함하고 있습니다.

<div class="content-ad"></div>

## Mock 환경 설정하기

Spring Boot의 자동 구성 기능을 활용하면 모의 환경을 설정하는 것이 직관적입니다:

- @SpringBootTest: 이 주석을 테스트 클래스에 추가하면 Spring Boot이 이를 테스트 컨텍스트로 인식합니다. 해당 구성 및 테스트에 필수적인 빈이 설정된 응용 프로그램을 보장합니다.
- @AutoConfigureMockMvc: 이 주석은 @SpringBootTest와 함께 사용할 때 MockMvc를 구성합니다. 이를 통해 실제 서버를 가동하지 않고 HTTP 요청을 모의하는 데 중요한 역할을 합니다.

## 첫 번째 모의 테스트 작성하기

<div class="content-ad"></div>

위의 설정이 완료되면 첫 번째 목 테스트를 작성할 수 있습니다:

```java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MyService myService;

    @Test
    public void testEndpoint() throws Exception {
        when(myService.retrieveData()).thenReturn("Mocked Data");

        this.mockMvc.perform(get("/api/data"))
            .andExpect(status().isOk())
            .andExpect(content().string("Mocked Data"));
    }
}
```

이 예제에서는 다른 마이크로서비스 또는 데이터베이스와의 상호 작용을 나타낼 수 있는 MyService 클래스를 가장합니다. 실제 서비스를 호출하는 대신 /api/data 엔드포인트를 호출할 때 "Mocked Data"를 반환하는 테스트를 수행합니다.

# Spring Boot를 사용한 Mock API 구현

<div class="content-ad"></div>

Spring Boot의 설계 원칙과 그 생태계는 목업 API를 만드는 강력한 선택지로 만들어냅니다. 여기에는 당신이 이 기능을 활용하여 마이크로서비스에서 목업 엔드포인트를 구현할 수 있는 단계별 안내서가 있습니다.

## 왜 목업 API를 사용해야 하는가?

시작하기 전에 목업 API를 만들고자 하는 이유를 되새겨보는 것이 좋습니다:

- 개발 중인 서비스의 동작을 시뮬레이트하기 위해.
- 프론트엔드와 백엔드 개발을 분리함으로써 병렬 진행을 허용함.
- 테스트 목적으로, 특히 실제 서비스로는 재현하기 어려운 시나리오에 대해.

<div class="content-ad"></div>

## 기본 컨트롤러 설정하기

모의 API를 만들려면 컨트롤러가 필요합니다. 이 컨트롤러는 모킹하고자 하는 엔드포인트를 정의할 것입니다.

```js
@RestController
@RequestMapping("/api")
public class MockController {

    @GetMapping("/users")
    public List<String> getUsers() {
        return Arrays.asList("Alice", "Bob", "Charlie");
    }
}
```

위 코드 조각에서는 사용자 검색 기능을 모킹하는 간단한 엔드포인트를 설정했습니다.

<div class="content-ad"></div>

## 더욱 고급화된 모의(Mock)에 대한 서비스 레이어 활용

보다 복잡한 시나리오의 경우 다른 서비스나 데이터베이스와 상호 작용을 시뮬레이션하고 싶을 수 있습니다. 이러한 로직을 컨트롤러에 직접 넣는 대신, 서비스 레이어에 위임하세요.

```java
@Service
public class MockService {

    public List<String> retrieveMockedData() {
        // 복잡한 로직이나 상호 작용 시뮬레이션
        return Arrays.asList("Data1", "Data2", "Data3");
    }
}
```

그런 다음, 이 서비스를 컨트롤러에 활용하세요:

<div class="content-ad"></div>

```java
@RestController
@RequestMapping("/api")
public class MockController {

    @Autowired
    private MockService mockService;

    @GetMapping("/data")
    public List<String> getMockedData() {
        return mockService.retrieveMockedData();
    }
}
```

## Dynamic Mocking Using Path Variables

Spring Boot also facilitates dynamic responses based on URL path variables:

```java
@GetMapping("/user/{id}")
public String getUserById(@PathVariable String id) {
    // Mock a dynamic response based on the ID
    return "Mocked User for ID: " + id;
}
```  

<div class="content-ad"></div>

## 네트워크 대기 시간 모의를 위한 지연 도입

가끔은 네트워크 대기 시간이나 느린 응답을 모의하고 싶을 수 있습니다. 이것은 Thread.sleep()를 사용하여 쉽게 달성할 수 있습니다:

```js
@GetMapping("/delayed-data")
public String getDelayedData() throws InterruptedException {
    Thread.sleep(5000);  // 5초 지연 도입
    return "지연된 모의 데이터";
}
```

그러나 Thread.sleep()를 사용할 때 주의해야 합니다. 과도한 사용은 테스트 속도를 현저히 느리게 만들 수 있습니다. 지연을 모의하고 싶은 특정 시나리오에 사용하는 것이 이상적입니다.

<div class="content-ad"></div>

# 결론

API 모킹은 특히 마이크로서비스 아키텍처에서 개발자에게 귀중한 도구입니다. Spring Boot의 내장 테스팅 유틸리티를 활용하여 실제 시나리오를 모방하는 모의 환경을 쉽게 설정하여 개발을 가속화하고 각 서비스가 의존성을 사용할 수 없을 때도 예상대로 동작하도록 보장할 수 있습니다. 마이크로서비스가 애플리케이션 개발 환경을 지배하는 가운데, 이러한 모킹 기술을 습득하는 것은 강인하고 확장 가능하며 효율적인 애플리케이션을 전달하는 데 분명히 도움이 될 것입니다.

- Spring Initializr
- 공식 Spring Boot 문서
- Mockito - Java용 모킹 프레임워크

![이미지](/assets/img/2024-07-12-ImplementingAPIMockinginSpringMicroservicesforFasterDevelopment_1.png)