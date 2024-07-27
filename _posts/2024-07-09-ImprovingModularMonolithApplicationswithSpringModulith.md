---
title: "Spring Modulith로 모듈형 모놀리식 애플리케이션 개선하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_0.png"
date: 2024-07-09 21:19
ogImage: 
  url: /assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_0.png
tag: Tech
originalTitle: "Improving Modular Monolith Applications with Spring Modulith"
link: "https://medium.com/itnext/improving-modular-monolith-applications-with-spring-modulith-edecc787f63c"
---


<img src="/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_0.png" />

시리즈의 첫 블로그에서는 모듈식 단일체 애플리케이션을 Spring Boot 및 DDD로 구축하고 구현하는 방법을 살펴보았습니다. 그 블로그의 끝에서 우리는 구현의 몇 가지 제한 사항을 확인했습니다. 이 블로그에서는 해당 제한 사항을 해결하여 더 유지보수 가능한 솔루션을 만드는 방법을 시도할 것입니다. Spring Modulith가 핵심 역할을 하는 방법을 볼 것입니다. 첫 번째 블로그를 아직 읽지 않았다면, 먼저 읽어 주세요!

## 새로운 비즈니스 요구 사항

이전 블로그에서 우리는 도서관이 독자들에 의해 책을 빌릴 수 있는 응용프로그램을 구현했습니다. 구현은 호응이 좋았고 도서관 관리자들은 물리적 레지스트리를 유지보다는 대출 프로세스를 관리하기 위한 소프트웨어로 전환하는 것을 기쁘게 생각했습니다.

<div class="content-ad"></div>

하지만 곧 그 이후에, 도서관이 한 가지 문제에 직면했어요. 애플리케이션이 책을 대출하는 것을 처리할 수 있었지만, 도메인 모델링에서 중요한 측면이 빠졌어요. 독자가 책을 대출하려고 요청할 때 즉시 해당 책을 "대출 완료"로 표시했어요. 도서관 사서들은 대출된 책이 실제로 독자에 의해 수령되었는지 확인할 수 없었어요. 때로는 독자가 수령하지 않고 책이 잘못되게 대출된 채로 남아 있는 경우가 있었어요.

도메인 전문가들과의 논의 끝에, 책 보유라는 새로운 개념이 나왔어요. 독자 요청 시 즉시 책을 발행하는 대신, 책을 먼저 보류하도록 변경되었어요. 독자가 책을 수령하면, 그 책이 대출된 것으로 간주될 거예요. 이렇게 하면 대출된 책이 도서관에 있지 않고 독자에게 있음이 명확해질 거예요.

## 도메인 모델 재검토

현재의 도메인 모델은 두 가지 하위 도메인인 대출(Borrow)과 재고(Inventory)로 구성되어 있어요. 이는 동일한 경계 컨텍스트에 구현되었어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_1.png)

이전 블로그에서 언급된 제한 사항을 보면, 두 경계 컨텍스트 간에 강한 결합이 존재한다는 것을 알 수 있습니다. 대여자가 책을 대출하면 인벤토리의 책 상태가 동기적으로 대출 상태로 표시됩니다. 이 구현의 테스트 및 유지 관리에 영향을 미치므로 결합을 느슨하게 만들고 싶습니다(비동기적으로?). 

인벤토리 서브도메인은 도서관에 있는 모든 책을 추적하는 역할도 합니다. 이는 도서관 내의 책 목록과 대출 및 반납으로 인해 변경되는 가용성을 추적하고 있음을 의미합니다. 이들이 실제로 하나로 모델링된 두 서브도메인이라고 가정하면 어떨까요?

![이미지](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_2.png)


<div class="content-ad"></div>

새 서브도메인 '카탈로그'는 책의 메타데이터를 캡처하는 역할을 맡게 될 것이며, 가용성에 대해 걱정하지 않을 것입니다. 가용성은 여전히 '인벤토리' 서브도메인에 남아 있을 것입니다.

이 말인즉슨 우리가 새로운 3개의 바운디드 컨텍스트를 가지게 된다는 말일까요? 잠시 생각해 봅시다. 대출 및 인벤토리 바운디드 컨텍스트(BC)는 여전히 같은 의존성을 공유합니다. 도메인 이벤트를 사용하여 이 의존성을 이벤트 유발 일관성으로 모델링한다면 어떨까요? 그렇다면 어떤 모습이 될까요?

여기에서 발생하는 이벤트는 도메인 이벤트보다는 요청-응답 이벤트와 같아 보입니다. 대출 상태는 인벤토리 BC가 응답할 때까지 '활성' 또는 '거부'로 변경되지 않는 것으로 보이며, 이는 강한 결합을 나타냅니다. 이벤트를 도입함으로써 통신을 비동기식으로 전환하는 것뿐이지만 기본 결합의 강도는 여전합니다.

## 두 서브도메인, 하나의 바운디드 컨텍스트?

<div class="content-ad"></div>

만약 Borrow와 Inventory 하위도메인을 동일한 바운디드 컨텍스트 내에서 모델링한다면 어떨까요? 기억해주세요, 바운디드 컨텍스트는 언어적 경계입니다. 모델의 의미는 바운디드 컨텍스트 내에서 변하지 않습니다. Borrow와 Inventory 컨텍스트 사이에서 "Book"이 다른 의미를 갖는지 기억하십니까? Inventory 바운디드 컨텍스트에서 "Book"의 가장 중요한 속성은 가용성 상태입니다. Borrow 바운디드 컨텍스트에서는 책의 가용성 상태가 대출 및 반납으로 인해 영향을 받습니다. 이 모델은 두 컨텍스트 모두에서 동일합니다. Borrow와 Inventory는 동일한 바운디드 컨텍스트에서 모델링하는 것이 좋아보입니다!

새 책이 도서관 (카탈로그)에 추가될 때, Borrow 바운디드 컨텍스트는 인벤토리를 업데이트하기 위해 이 사실을 알아야 합니다. 아래와 같이 이벤트로 모델링할 수 있습니다:

카탈로그와 Borrow 바운디드 컨텍스트는 비동기적으로 이벤트를 통해 통신할 때 느슨하게 결합되어 있습니다. 왜냐하면 책을 대출하는 프로세스가 더 이상 카탈로그에 의존하지 않기 때문입니다.

<div class="content-ad"></div>

새로운 통찰력과 새로운 도메인 모델을 갖추었기 때문에 이제는 책에 대한 예약 요구 사항을 처리할 수 있습니다. 이 문제는 Borrow BC 내에서만 해결될 수 있습니다. 자세한 내용을 살펴보겠습니다.

## 대출 Bounded Context (새로운 통찰력 포함)

대출 BC로 들어가 봅시다. 그전과 마찬가지로 Loan 집합에는 여전히 책이 포함되어 있지만, 추가로 Catalog BC가 소유한 책들의 읽기 전용 캐시인 Book 집합도 포함되어 있습니다. Borrow BC에 복사본을 유지함으로써, Borrow BC의 모든 사용 사례를 처리하는 데 Catalog BC에 대한 의존성이 없습니다.

![이미지](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_4.png)

<div class="content-ad"></div>

대출과 도서 집계 간의 통신을 이벤트로 모델링하여 결과적인 일관성을 달성하기로 결정했습니다. 이는 두 집계를 동일한 트랜잭션에서 업데이트할 필요가 없도록하기 위한 것입니다. 이렇게 하면 집계가 느슨하게 결합되고 독립적인 테스팅이 가능해집니다. 이벤트는 또한 미래의 확장 지점이 되며(예: 도서가 수령되면 독자에게 알림), LoanManagement 서비스는 유스케이스가 실행됨에 따라 이벤트를 발생시킵니다.

```java
@Transactional
@Service
@RequiredArgsConstructor
public class LoanManagement {

    private final LoanRepository loans;
    private final BookRepository books;
    private final ApplicationEventPublisher events;
    private final LoanMapper mapper;

    public LoanDto hold(String barcode, Long patronId) {
        var book = books.findByInventoryNumber(new Barcode(barcode))
                .orElseThrow(() -> new IllegalArgumentException("Book not found!"));

        if (!book.available()) {
            throw new IllegalStateException("Book not available!");
        }

        var dateOfHold = LocalDate.now();
        var loan = Loan.of(barcode, dateOfHold, patronId);
        var dto = mapper.toDto(loans.save(loan));
        events.publishEvent(
                new BookPlacedOnHold(
                        book.getId(),
                        book.getIsbn(),
                        book.getInventoryNumber().barcode(),
                        loan.getPatronId(),
                        dateOfHold));
        return dto;
    }
}
```

이벤트 BookPlacedOnHold는 Java 레코드로 정의됩니다. 도서와 홀드한 독자 및 홀드한 날짜의 모든 관련 정보를 포함합니다.

<div class="content-ad"></div>

```js
public record BookPlacedOnHold(Long bookId, 
                               String isbn, 
                               String inventoryNumber,
                               Long patronId, 
                               LocalDate dateOfHold) {
}
```

InventoryManagement 서비스는 이벤트를 수신하고 책을 예약 상태로 표시합니다.

```js
@Transactional
@Service
@RequiredArgsConstructor
public class InventoryManagement {

    private final BookRepository books;

    @ApplicationModuleListener
    public void on(BookPlacedOnHold event) {
        var book = books.findById(event.bookId())
                .map(Book::markOnHold)
                .orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없습니다!"));
        books.save(book);
    }
}
```

어노테이션 @ApplicationModuleListener에 주목해주세요. 이는 Spring Modulith 라이브러리에서 옵니다. @TransactionalEventListener, @Async 및 @Transactional(propagation = Propagation.REQUIRES_NEW)과 동일합니다. 이를 통해 이벤트 리스너 메서드가 다른 스레드에서 및 별도 트랜잭션에서 실행되도록 보장합니다. 이벤트를 트리거한 코드는 리스너와 관계없이 항상 완료됩니다.


<div class="content-ad"></div>

이 문제는 새로운 도전을 소개합니다. 이벤트를 트리거한 코드가 이미 완료된 상태일 때, 청취기 실행에 실패하는 경우(예: 데이터베이스 트랜잭션이 실패한 경우) 무엇이 발생할까요? 이 경우, 대출 집계는 HOLDING 상태에 남아 있지만 Book 집계는 ON_HOLD로 표시되지 않을 것입니다. 우리는 이벤트를 영속화하고 청취기 메서드 실행을 다시 트리거할 방법이 필요합니다.

## Spring Modulith 이벤트 게시 레지스트리

Spring Modulith 종속성은 다음과 같이 pom.xml에 추가할 수 있습니다.

```js
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.modulith</groupId>
      <artifactId>spring-modulith-bom</artifactId>
      <version>1.1.1</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependency>
    <groupId>org.springframework.modulith</groupId>
    <artifactId>spring-modulith-starter-core</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.modulith</groupId>
    <artifactId>spring-modulith-starter-jpa</artifactId>
</dependency>
```

<div class="content-ad"></div>

스프링 모듈리스터터 JPA 종속성을 사용하면 이벤트 발행 레지스트리가 활성화됩니다. 이 레지스트리는 백그라운드의 영속성 기술 (이 경우 H2)을 통해 구동됩니다. H2를 사용하면 다음과 같은 테이블 EVENT_PUBLICATION이 생성됩니다:

```js
CREATE TABLE IF NOT EXISTS EVENT_PUBLICATION
(
  ID               UUID NOT NULL,
  COMPLETION_DATE  TIMESTAMP(9) WITH TIME ZONE,
  EVENT_TYPE       VARCHAR(512) NOT NULL,
  LISTENER_ID      VARCHAR(512) NOT NULL,
  PUBLICATION_DATE TIMESTAMP(9) WITH TIME ZONE NOT NULL,
  SERIALIZED_EVENT VARCHAR(4000) NOT NULL,
  PRIMARY KEY (ID)
)
```

다른 지원되는 데이터베이스의 스키마는 여기에서 확인할 수 있습니다: https://docs.spring.io/spring-modulith/reference/appendix.html#schemas

Spring의 ApplicationEventPublisher에서 이벤트를 발행할 때, 레지스트리는 해당 이벤트를 수신할 것으로 예상되는 모든 트랜잭션 이벤트 리스너를 찾아 위 테이블에 항목을 작성합니다. 기본적으로 항목은 미완료로 표시됩니다 (COMPLETION_DATE 열이 NULL임). 트랜잭션 이벤트 리스너가 성공적으로 완료되면 항목이 완료로 표시됩니다. 이렇게 함으로써, 리스너 실행 실패 시 이벤트가 손실되지 않고 리스너 실행이 성공적으로 완료될 때까지 다시 트리거됩니다.

<div class="content-ad"></div>

## 모듈의 격리된 테스트

모듈 간의 통신 패턴으로 이벤트를 활용하면 독립적인 테스트가 가능해집니다. 이를 확인해봅시다.

```java
@Transactional
@ApplicationModuleTest
class LoanIntegrationTests {

    @DynamicPropertySource
    static void initializeData(DynamicPropertyRegistry registry) {
        registry.add("spring.sql.init.data-locations", () -> "classpath:borrow.sql");
    }

    @Autowired
    LoanManagement loans;

    @Test
    void shouldCreateLoanOnPlacingHold(Scenario scenario) {
        scenario.stimulate(() -> loans.hold("13268510"))
                .andWaitForEventOfType(BookPlacedOnHold.class)
                .toArriveAndVerify((event, dto) -> {
                    assertThat(event.inventoryNumber()).isEqualTo("13268510");
                    assertThat(dto.status()).isEqualTo(LoanStatus.HOLDING);
                });
    }
}
```

Spring Modulith는 @ApplicationModuleTest라는 주석을 제공하는데, 이는 @SpringBootTest와 유사하지만 Spring 애플리케이션 컨텍스트를 테스트 중인 패키지(모듈을 대표함)로 자동으로 제한하고 다른 것을 허용하지 않습니다. 이를 통해 Catalog 모듈 코드를 부팅하지 않고도 Borrow 모듈을 테스트할 수 있습니다.

<div class="content-ad"></div>

위의 조각은 LoanManagement::hold를 호출하여 홀드를 놓는 시나리오를 테스트하고, 올바른 페이로드로 생성된 이벤트 BookPlacedOnHold를 확인하는 것을 테스트합니다.

Spring Modulith와 통합 테스트에 대해 더 자세히 알아보려면 https://docs.spring.io/spring-modulith/reference/testing.html을 확인하세요.

## Spring Modulith로 강력한 모듈 경계 설정하기

이전에는 클래스 가시성에 의존하여 동일한 패키지(모듈)에서만 특정 클래스에 액세스할 수 있도록 보장했습니다. 이는 모듈 내의 패키지 구조의 유연성을 심각하게 제한하며 장기적으로 이를 유지하는 것은 거의 불가능합니다.

<div class="content-ad"></div>

Spring Modulith은 클래스 가시성에 의존하지 않는 솔루션을 제공합니다. Spring Modulith에서는 모든 최상위 패키지가 모듈로 간주됩니다. 이 패키지를 API 패키지라고 합니다. 이 패키지에 있는 모든 클래스는 다른 모듈(최상위 패키지)에서 자동으로 사용할 수 있습니다. 최상위 패키지의 하위 패키지는 내부적으로 처리되며 다른 모듈에서 접근할 수 없습니다.

더 잘 이해하기 위해 패키지 구조를 살펴보겠습니다.

```js
src/main/java
└── example
    ├── borrow
    │   ├── book
    │   │   └── ...
    │   ├── loan
    │   │   └── ...
    │   └── patron
    │       └── ...
    ├── catalog
    │   └── ...
    └── LibraryApplication
```

example.borrow와 example.catalog와 같은 최상위 패키지는 API 패키지 또는 모듈입니다. 패키지 example.catalog에는 Borrow 모듈에서 사용되는 도메인 이벤트인 BookAddedToCatalog 클래스만 포함되어 있습니다.

<div class="content-ad"></div>

example.borrow.book 및 example.borrow.loan 패키지 내의 모든 클래스는 example.catalog 패키지 내의 클래스에서 접근할 수 없습니다.

아래의 테스트를 통해 이 제한을 적용할 수 있습니다.

```js
class SpringModulithTests {

    ApplicationModules modules = ApplicationModules.of(SpringModulithWithDddApplication.class);

    @Test
    void verifyPackageConformity() {
        modules.verify();
    }
}
```

다른 모듈에서 모듈의 내부 클래스에 액세스하려고 하면 위와 유사한 오류로 테스트가 실패합니다.

<div class="content-ad"></div>

```js
org.springframework.modulith.core.Violations: - Module 'borrow' depends on non-exposed type example.catalog.internal.BookAddedToCatalog within module 'catalog'!
BookAddedToCatalog declares parameter BookAddedToCatalog.on(BookAddedToCatalog) in (InventoryManagement.java:0)
```

이제 팀은 이러한 위반 사항을 코드 리뷰에서 잡아내야 할 걱정 없이 편안해질 수 있어요.

## 모듈 간 통신 문서화

응용 프로그램이 시간이 지남에 따라 성장하면서 새 모듈이 추가되고 기존 모듈에 새 사용 사례가 구현됩니다. Spring Modulith를 사용하면 모듈 간 관계를 설명하는 문서 스니펫 및 C4 다이어그램을 생성할 수 있어요.

<div class="content-ad"></div>

또 다른 테스트를 추가해보세요.

```java
class SpringModulithTests {

    ApplicationModules modules = ApplicationModules.of(SpringModulithWithDddApplication.class);

    @Test
    void createModulithsDocumentation() {
        new Documenter(modules).writeDocumentation();
    }
}
```

우리 애플리케이션 모듈의 C4 다이어그램입니다.

![C4 다이어그램](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_5.png)

<div class="content-ad"></div>

해당 테스트는 각 모듈(경계 컨텍스트)에 대한 문서 조각도 생성합니다.

![이미지](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_6.png)

이는 내부 개발자 문서로 매우 유용하며 특히 새로 합류한 팀원들이 코드베이스를 빠르게 이해하는 데 도움이 됩니다.

## 모듈 내 아키텍처 문서화 및 유효성 검사

<div class="content-ad"></div>

Spring Modulith(스프링 모듈리쓰)는 모듈 간 통신 구조를 문서화하고 유효성을 검사하는 데 도움을 줍니다. 하지만 모듈 내부 구조는 어떨까요?

모듈 내에서 아키텍처를 따르는 선택을 하게 됩니다 — 이는 계층화된, 헥사고날, 양파 등이 될 수 있습니다. 저희 코드 베이스에서는 주로 아래 패턴을 따릅니다:

- 집계(Aggregate), 값 객체(ValueObject), 저장소(Repository) 등 DDD 패턴.
- Eric Evans의 정의에 따라 사용자 인터페이스/프레젠테이션 계층 (REST API), 애플리케이션 계층 (행동을 조율하는 서비스), 도메인 계층 (비즈니스 로직을 포착한 도메인 모델), 인프라스트럭처 계층 (영속성 및 메시징을 위한 기술적 서비스)로 구성된 클래스를 구조화하는 계층화된 아키텍처.

선택한 아키텍처를 문서화하고 검증하는 방법이 있을까요? 네, jMolecules(제이 모큐렐스)가 그 방법입니다!

<div class="content-ad"></div>

JMolecules는 "A set of libraries to help developers implement domain models in distraction-free, plain old Java."로 설명됩니다. 프로젝트에 이를 포함해 보겠습니다.

```js
<dependency>
    <groupId>org.jmolecules</groupId>
    <artifactId>jmolecules-bom</artifactId>
    <version>${jmolecules-bom.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

<dependency>
   <groupId>org.jmolecules</groupId>
   <artifactId>jmolecules-ddd</artifactId>
</dependency>

<dependency>
   <groupId>org.jmolecules</groupId>
   <artifactId>jmolecules-layered-architecture</artifactId>
</dependency>

<!-- testing -->
<dependency>
   <groupId>org.jmolecules.integrations</groupId>
   <artifactId>jmolecules-archunit</artifactId>
   <scope>test</scope>
</dependency>
```

jMolecules DDD와 Layered architecture에 대한 의존성을 포함했습니다. 첫 번째는 @AggregateRoot, @Entity(DDD entity, not JPA entity), @ValueObject 등과 같은 주석을 제공하며 각 클래스에 적용할 수 있습니다. 예시로 Book.java를 참조해보세요. 저는 개인적으로 타입 기반 모델이 더 강력하다고 생각합니다.

Layered architecture 의존성은 스테레오타입 주석인 @InterfaceLayer, @ApplicationLayer, @DomainLayer 및 @InfrastructureLayer를 제공합니다. 이러한 주석은 해당 패키지의 package-info.java에 적용할 수 있습니다.

<div class="content-ad"></div>

주석을 추가한 상태로 Intellij IDEA에 jMolecules 플러그인을 설치해 봅시다. 아래 이미지에서 확인할 수 있듯이 이 플러그인은 스테레오타입 뷰를 꾸밉니다.

![이미지](/assets/img/2024-07-09-ImprovingModularMonolithApplicationswithSpringModulith_7.png)

마지막으로, 새로운 기능이 추가될 때마다 현재 구축 중인 구조를 유지하기 위해 테스트를 추가해 봅시다.

```js
@AnalyzeClasses(packages = "example")
public class JMoleculesTests {

    @ArchTest
    ArchRule dddRules = JMoleculesDddRules.all();

    @ArchTest
    ArchRule layering = JMoleculesArchitectureRules.ensureLayering();
}
```

<div class="content-ad"></div>

dddRules 테스트는 집합이 다른 집합을 식별자(ID)를 통해 참조하고 있는지를 확인하는 DDD 관련 검사를 수행합니다. 여기에서 규칙의 전체 목록을 확인할 수 있어요.

업데이트: Spring Modulith 라이브러리는 클래스패스에서 jmolecules-archunit 종속성을 찾으면 DDD 규칙 테스트를 자동으로 실행합니다. 따라서 dddRules 테스트는 필요하지 않아요.

레이어링 테스트는 각 레이어 간의 통신이 계층화 아키텍처 규칙을 위반하지 않는지를 확인합니다(예: 도메인 레이어의 클래스가 애플리케이션 레이어의 클래스를 참조하는 경우). 테스트 코드는 매우 자명합니다:

```js
public static LayeredArchitecture ensureLayering() {
  return layeredArchitecture()
    .whereLayer(INTERFACE).mayNotBeAccessedByAnyLayer()
    .whereLayer(APPLICATION).mayOnlyBeAccessedByLayers(INTERFACE)
    .whereLayer(DOMAIN).mayOnlyBeAccessedByLayers(APPLICATION, INTERFACE)
    .whereLayer(INFRASTRUCTURE).mayOnlyBeAccessedByLayers(DOMAIN, APPLICATION, INTERFACE);
}
```

<div class="content-ad"></div>

## 결론

이 블로그에서는 도메인 모델을 개선하고 바운디드 컨텍스트를 재구성했습니다. Spring Modulith가 어떻게 느슨하게 결합된 모듈식 단일체 응용 프로그램을 구축하는 데 도움이 되며 자체 문서화되고 테스트하기 쉽며 유지보수하기 쉬운지 살펴보았습니다. 첫 번째 블로그에서 언급된 모든 제한 사항을 해결할 수 있었습니다.

시리즈의 다음 블로그에서는 헥사고날 아키텍처를 탐사함으로써 응용 프로그램을 더 개선하는 방법을 살펴볼 것입니다.

업데이트: 파트 3가 게시되었습니다! 여기서 읽어보세요: [링크 추가하기]

<div class="content-ad"></div>

아래에서 코드를 확인하고 실행해보고 싶다면 참조해보세요.