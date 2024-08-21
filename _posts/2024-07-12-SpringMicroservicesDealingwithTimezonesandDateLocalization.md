---
title: "스프링 마이크로서비스 타임존 및 날짜 로컬라이제이션 처리 방법"
description: ""
coverImage: "/assets/img/2024-07-12-SpringMicroservicesDealingwithTimezonesandDateLocalization_0.png"
date: 2024-07-12 21:12
ogImage:
  url: /assets/img/2024-07-12-SpringMicroservicesDealingwithTimezonesandDateLocalization_0.png
tag: Tech
originalTitle: "Spring Microservices: Dealing with Timezones and Date Localization"
link: "https://medium.com/@AlexanderObregon/spring-microservices-dealing-with-timezones-and-date-localization-3924817d8be2"
isUpdated: true
---

![이미지](/assets/img/2024-07-12-SpringMicroservicesDealingwithTimezonesandDateLocalization_0.png)

# 소개

현재 글로벌화된 세상에서, 다양한 지리적 지역의 사용자를 대상으로 하는 애플리케이션을 개발하는 것은 선택 사항이 아닌 필수 사항입니다. 이는 서로 다른 시간대, 날짜 형식, 심지어 언어별 표기법을 처리하는 것을 포함합니다. Spring Microservices는 이러한 복잡성을 관리하는 견고한 기반을 제공합니다. 이 포스트에서는 Spring Microservices가 시간대 및 날짜 지역화를 다루는 데 어떻게 도움을 줄 수 있는지 살펴볼 것입니다.

# Microservices에서의 시간대 도전

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

마이크로서비스와 분산 아키텍처의 증가하는 채택으로 인해, 개발자들이 서로 다른 시간대를 다루면서 발생하는 복잡성에 대해 대책을 세워야 하는 필수적인 일이 되었습니다. 전 세계 어플리케이션 시대로 더 깊이 파고들수록, 다양한 시간대에서의 시간 데이터를 관리하고 해석하는 것이 간단히 이쁨이 아니라 필수적인 일임을 알 수 있습니다.

## 분산 시스템과 시간대 복잡성

마이크로서비스에 대해 이야기할 때, 우리는 종종 더 복잡한 어플리케이션을 형성하기 위해 협력하는 여러 작고 독립적인 서비스 세트를 떠올립니다. 이러한 서비스들은 종종 최종 사용자에 가까운 위치, 규정 제한 또는 인프라 비용 등의 이유로 서로 다른 지리적 위치에 배포됩니다.

실제 시나리오를 살펴보겠습니다: 세계적인 전자 상거래 플랫폼. 런던에 있는 사용자가 오후 3시 GMT에 주문을 한다고 가정해보겠습니다. 이 주문은 싱가포르에 위치한 데이터 센터에서 호스팅되는 재고 확인 마이크로서비스를 활성화할 수 있습니다. 동시에 뉴욕에 위치한 알림 서비스가 활성화되어 창고 팀에 알림을 줄 수도 있습니다. 이 간단한 거래는 세 개의 다른 시간대를 걸쳐 이루어집니다.

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

## 그렇다면, 어떤 도전 과제가 있는가요?

- 데이터 무결성: 올바르게 관리되지 않으면 주문 처리 시간에 오차가 발생할 수 있어 잠재적인 비즈니스 손실을 야기할 수 있습니다. 시스템은 주문을 싱가포르의 다음 날로 오해하거나 뉴욕의 이전 날로 잘못 해석할 수 있습니다.
- 사용자 경험: 사용자의 관점에서는 매끄러운 경험을 기대합니다. 알림이나 업데이트를 받을 때 시간 차이를 계산할 필요가 없어야 합니다. 그들에게는 주문이 오후 3시에 이루어졌으며, 모든 시스템 상호작용이 그를 반영해야 합니다.
- 서비스 조정: 마이크로서비스는 본질적으로 독립적으로 작동하도록 설계되었습니다. 한 서비스가 다른 서비스로 날짜-시간 정보를 표준 형식이나 시간대가 다른 방식으로 보낸다면 혼돈을 초래할 수 있습니다. 서비스 간에 시간 데이터가 어떻게 전달되어야 하는지에 대한 일관성이 필요합니다.

## UTC의 중요성

협정 세계 표준시(UTC)는 이러한 여러 시간대의 복잡한 문제에 대한 슈퍼히어로로 등장합니다. 그렇다면 UTC가 왜 중요한 것일까요?

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

- 균일한 표준: 세계 표준시(UTC)는 일광 절약 시간(DST) 조정이나 지역 시간대의 특이 사항에 영향을 받지 않습니다.
- 간소화: 마이크로서비스의 내부 작업은 UTC에 뿌리를 둔 채 유저에게 노출되는 기능은 유저의 지역 시간대로 변환할 수 있습니다. 이 분리는 핵심 비즈니스 로직이 다양한 시간대의 도전에 영향을 받지 않도록 보장합니다.
- 글로벌 동기화: 글로벌 시스템, 특히 금융 거래 플랫폼이나 항공편 예약 시스템과 같은 고도로 동기화가 필요한 시스템에서는 UTC에서 작동함으로써 거래 시간에 모호함이 없도록 보장합니다.

## 시간대 데이터 저장 및 검색

날짜 및 시간 데이터를 저장할 때 사용하는 전략은 시간대 관리에 중요한 역할을 합니다:

- 데이터베이스 시간대 설정: 많은 데이터베이스는 시간대 설정을 가지고 있습니다. 이 설정이 UTC를 사용하도록 구성되어 있는지 확인하는 것이 중요합니다. 기본 설정에서 두면 일부 데이터베이스가 서버 시간대를 사용할 수 있어 혼란과 오해를 야기할 수 있습니다.
- 유저 프로필 시간대: 언제나 유저 프로필에 시간대 필드를 유지하세요. 이 관행은 필요할 때마다 데이터를 유저의 지역 시간대로 변환하고 표시하는 데 도움이 됩니다. 또한 유저가 여행을 할 때에도 유저 프로필을 조정하여 현재 시간대를 반영할 수 있습니다.
- 서비스 간 통신: 한 마이크로서비스가 다른 서비스와 통신할 때는 항상 UTC에서 날짜 및 시간 데이터를 전송하세요. 이 접근 방식은 서비스가 호스팅되는 위치나 해당 지역 설정에 관계없이 시간 데이터가 일관되게 유지되도록 합니다.

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

# Spring을 사용하여 날짜 로컬라이징하기

날짜 로컬라이징은 시간대를 조정하는 것만이 아닙니다. 사용자의 문화적, 지역적 기대치와 부합하는 방식으로 날짜 및 시간 데이터를 표현하는 것또한 중요합니다. 서로 다른 지역에는 서로 다른 날짜 형식, 요일 시작일 및 심지어 서로 다른 달력 시스템이 있습니다. Spring 프레임워크는 날짜 로컬라이징을 간단하게 만들어주는 도구들을 제공합니다.

## 로케일의 중요성 이해하기

로케일은 특정 지리적, 정치적 또는 문화적 지역을 나타냅니다. 이는 언어 선호도 뿐만 아니라 날짜, 시간, 숫자 및 통화 형식을 지시합니다. 날짜 관련 맥락에서의 차이는 "MM/dd/yyyy" 또는 "dd/MM/yyyy"와 같은 날짜 형식이 달라지는 것만 일 수도 있습니다.

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

스프링의 코어 모듈은 국제화(i18n)와 지역화(l10n)를 지원하며, 날짜, 시간 및 메시지의 표현을 포함합니다.

## 스프링을 사용하여 로캘 컨텍스트 설정하기

스프링의 LocaleContextHolder를 사용하면 현재 로캘을 검색하거나 변경할 수 있습니다.

```js
import org.springframework.context.i18n.LocaleContextHolder;

// ...

Locale currentLocale = LocaleContextHolder.getLocale();
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

Spring에서 로캘은 다양한 방법으로 결정될 수 있어요:

- 명시적 사용자 설정: 사용자는 프로필 설정에서 로캘 환경설정을 할 수 있어요. 이 로캘 정보는 그 후 모든 사용자별 작업에 사용될 수 있어요.
- 브라우저/클라이언트 설정: HTTP 요청의 Accept-Language 헤더는 사용자의 로캘을 추론하는 데 사용될 수 있어요.
- 기본 시스템 로캘: 특정 로캘이 결정되지 않은 경우 시스템의 기본 로캘을 사용할 수 있어요.

## 사용자 로캘로 날짜 서식 지정

사용자의 로캘이 결정되면 날짜를 사용자의 기대에 맞게 서식 지정할 수 있어요.

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
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

// ...

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("long", currentLocale);
String formattedDate = LocalDateTime.now().format(formatter);
```

여기서는 날짜 형식 지정을 위해 "long" 스타일을 사용하고 있습니다. 이 스타일은 미국에서 "January 15, 2023"와 같은 출력물을 생성할 수 있지만, 유럽의 많은 지역에서는 "15 January 2023"와 같은 출력물이 나올 수 있습니다.

## MessageSource와 날짜 패턴

Spring의 MessageSource는 국제화에 강력한 메커니즘입니다. 이 메커니즘은 날짜 패턴에도 사용될 수 있습니다. 각 지역마다 다른 날짜 패턴을 가지도록 설정하는 것을 고려해보세요:

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
# messages_en_US.properties
date.pattern=MM/dd/yyyy

# messages_en_GB.properties
date.pattern=dd/MM/yyyy
```

```js
import org.springframework.context.MessageSource;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

// ...

@Autowired
MessageSource messageSource;

// ...

String pattern = messageSource.getMessage("date.pattern", null, currentLocale);
DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
String formattedDate = LocalDate.now().format(formatter);
```

위 예시에서는 사용자의 로캘에 기반하여 날짜 패턴이 추출되어 형식화에 사용됩니다.

## 비-그레고리안 달력 처리하기

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

Spring은 일본 또는 태국 불교 달력과 같은 그레고리오력이 아닌 달력을 지원하는 기능도 제공합니다. 만약 여러분의 애플리케이션이 그레고리오력이 아닌 달력을 사용하는 지역을 대상으로 한다면, 해당 날짜가 지역화되어야 한다는 것이 중요합니다.

# 스프링 부트로 시간대 다루기

시간대를 관리하는 것은 견고하고 전 세계에서 접근 가능한 애플리케이션을 구축하는 데 중요한 측면입니다. 스프링 프레임워크의 확장인 스프링 부트는 내장된 솔루션과 간소화된 구성을 통해 시간대 관리와 관련된 많은 복잡성을 단순화합니다.

## 시간대 관리의 중요성

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

솔루션에 들어가기 전에, 시간대 관리의 중요성에 대해 간략히 논의해 봅시다:

- 사용자 경험: 사용자가 로컬 시간대로 날짜와 시간을 볼 수 있도록 하는 것은 사용자 경험을 향상시키며, 응용 프로그램을 직관적이고 사용자 친화적으로 만듭니다.
- 데이터 무결성: 적절한 시간대 처리는 시간 기반 데이터의 무결성을 보장하며, 다양한 지리적 위치에서도 일관되고 정확하게 유지되도록 합니다.
- 비즈니스 로직: 많은 비즈니스 운영은 시간에 민감합니다. 정확한 시간대 처리는 예약된 작업, 알림 또는 프로모션이 의도한 시간에 작동하도록 보장합니다.

## Java 8의 Date and Time API

Java 8은 java.time 패키지 아래에 새로운 Date and Time API를 도입했으며, 이를 통해 날짜와 시간 조작을 위한 포괄적이고 변경할 수 없는 클래스 세트가 제공되었습니다. ZoneId 및 ZonedDateTime과 같은 클래스를 사용하여 시간대 처리를 간단하게 수행할 수 있습니다.

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

## 날짜 저장하기: UTC 방식

애플리케이션에서 날짜를 다룰 때 가장 좋은 방법은 표준화된 형식으로 저장하는 것인데, 일반적으로 그것은 조정된 세계시(UTC)로 표시됩니다.

자바의 Instant 클래스를 사용하면, UTC로 현재 시간을 간단하게 캡처할 수 있습니다:

```js
import java.time.Instant;

// ...

Instant now = Instant.now();
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

데이터베이스에 저장할 때 UTC로 현재 시간을 나타내면 일관성이 유지됩니다.

## 스프링 부트로 지역 시간대에 맞추기

일단 날짜를 UTC로 저장하면 사용자에게 제시하기 위해 로컬 시간대로 변환해야 합니다. ZoneId 클래스를 사용하면 이 작업을 간단하게 할 수 있습니다:

```js
import java.time.ZoneId;
import java.time.ZonedDateTime;

// ...

ZoneId userZoneId = ZoneId.of("Europe/London"); // 예시
ZonedDateTime userLocalTime = now.atZone(userZoneId);
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

사용자의 시간대를 결정하는 여러 가지 방법이 있습니다. 다음 중 하나를 통해 결정할 수 있습니다:

- 사용자의 프로필 설정에서 확인하기.
- 사용자의 IP 주소를 통해 추론하기.
- 브라우저나 기기 설정을 이용하기.

## Spring Boot에서 기본 시간대 설정하기

날짜를 UTC로 저장하는 것이 좋지만, 때로는 레거시 시스템이나 서드 파티 API와 통합할 때와 같이 Spring Boot 애플리케이션에 기본 시간대를 설정해야 할 수도 있습니다.

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

시작 시 JVM의 기본 시간대를 설정할 수 있어요:

```js
java -Duser.timezone=UTC -jar your-spring-boot-app.jar
```

또는 프로그래밍 방식으로 설정할 수도 있어요:

```js
TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
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

JVM의 기본 시간대를 변경하면 응용 프로그램의 모든 날짜 및 시간 작업에 영향을 미칩니다. 그러므로 보통은 기본값에 의존하는 대신 명시적으로 시간대를 처리하는 것이 가장 좋습니다.

## Hibernate 및 JDBC 시간대 설정

만약 Spring Boot와 JPA 그리고 Hibernate를 사용 중이라면, Hibernate가 날짜와 시간 값을 UTC로 처리하도록 하는 것이 매우 중요합니다. 다음 속성을 적용해야 합니다. application.properties 또는 application.yml 파일에:

```js
spring.jpa.properties.hibernate.jdbc.time_zone = UTC;
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

이 구성은 하이버네이트가 모든 날짜-시간 작업에 대해 UTC를 사용하도록 보장합니다.

# 타임존을 고려한 마이크로서비스 구축 팁

타임존을 고려한 마이크로서비스를 구축하는 것은 글로벌 애플리케이션에서 일관성, 신뢰성 및 훌륭한 사용자 경험을 보장하기 위해 중요합니다. 이를 달성하기 위한 몇 가지 모베스트 프랙티스와 팁을 살펴보겠습니다:

## 항상 내부적으로 UTC 사용하기

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

- UTC를 기준으로 표준화: 모든 마이크로서비스가 조정 세계시(UTC)를 표준으로 사용하도록 합니다. 이는 일관된 기준을 제공하여 필요할 때 로컬 시간대로 변환하기 쉽게 합니다.
- 비즈니스 로직에 지역 시간 사용하지 않기: 서버의 지역 시간을 기반으로 한 비즈니스 로직을 사용해서는 안 됩니다. 서버 위치가 변경될 수 있거나 동일 서비스가 다른 시간대에서 실행될 수 있기 때문입니다.

## 통신에 시간대 정보 포함하기

- 명시적으로 시간대 명시: 마이크로서비스 간에 날짜 및 시간 데이터를 통신할 때 항상 시간대 정보를 포함해야 합니다. 모호성을 제거합니다. 예를 들어, “2023–10–14 16:00”을 보내는 대신 “2023–10–14T16:00:00Z”를 보냅니다 (‘Z’는 UTC를 나타냅니다).
- ISO 8601 형식 사용: 이는 날짜와 시간에 대해 국제적으로 인정받는 형식으로, 명확성을 보장합니다. 이 형식은 사람이 읽기 쉽고 프로그램적으로 구문 분석하기 쉽습니다.

## 서머타임(Daylight Saving Time, DST)에 유의하기

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

- 가정하지 말기: UTC와 로컬 시간대 간의 오프셋이 일정하다고 가정하지 말아야 합니다. 일광 절약 시간(DST) 때문에 변할 수 있습니다.
- 라이브러리 활용: Java의 java.time 패키지나 Joda-Time과 같은 이미 구축된 라이브러리를 사용하세요. 이 라이브러리에는 DST 규칙이 내장되어 있습니다.

## 사용자 프로필에는 시간대 정보를 저장해야 합니다

- 사용자 시간대 저장: 사용자 프로필에는 항상 시간대 필드가 있어야 합니다. 이렇게 하면 사용자 인터페이스 애플리케이션에서 날짜와 시간 정보를 로컬화하는 작업이 쉬워집니다.
- 업데이트 허용: 사용자가 다른 시간대로 이동할 수 있습니다. 필요할 때 사용자가 시간대 설정을 업데이트할 수 있도록 허용해야 합니다.

## 적절한 데이터베이스 구성 확인하기

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

- UTC에 대한 데이터베이스 구성: 데이터베이스는 UTC로 날짜를 저장하도록 구성되어야 합니다. 이를 통해 데이터 일관성이 유지되며, 특히 데이터베이스 서버가 이동하거나 다른 시간대 간 복제가 있는 경우에도 도움이 됩니다.
- 데이터베이스 시간대 동작 테스트: 서로 다른 데이터베이스는 시간대를 다르게 처리합니다. 날짜 및 시간 저장 및 검색에 대한 가정이 유효한지 정기적으로 테스트해야 합니다.

## 다양한 시간대를 걸쳐 테스트

- 시간대 테스트 자동화: 테스트 스위트에 여러 시간대에서 작업을 흉내내는 테스트가 포함되어야 합니다. 이를 통해 잠재적인 시간대 관련 버그를 잡을 수 있습니다.
- 실제 시나리오 시뮬레이션: 서로 다른 시간대에 위치한 여러 마이크로서비스에 걸쳐 작업을 흉내내도록 합니다. 이를 통해 동기화나 데이터 무결성 문제에 대한 통찰력을 제공합니다.

## 시간대 컨텍스트에 헤더 사용

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

- 시간대를 위한 HTTP 헤더: RESTful API를 노출할 때는 HTTP 헤더를 사용하여 시간대 컨텍스트를 지정하는 것이 좋습니다. 예를 들어, X-User-Timezone과 같은 사용자의 시간대를 나타내는 사용자 정의 헤더를 사용할 수 있습니다.
- 기본값은 UTC: 서비스 간 통신에서 시간대가 제공되지 않는 경우에는 항상 일관성을 유지하기 위해 기본적으로 UTC를 사용하는 것이 좋습니다.

# 결론

Spring Microservices에서 시간대와 날짜 지역화를 처리하는 것은 신중한 고려가 필요합니다. UTC에 날짜를 저장하고 Java의 새로운 날짜 및 시간 API를 활용함으로써, 최선의 방법을 준수하면 견고하고 시간대를 고려하는 애플리케이션을 구축할 수 있습니다. Spring은 이 작업을 보다 쉽게 만들기 위한 다양한 도구를 제공하여 개발자가 진정한 글로벌 애플리케이션을 만들 수 있도록 지원합니다.

- Oracle의 Java 8 Date-Time API 문서
- IANA 시간대 데이터베이스
- Joda-Time — Java 날짜 및 시간 API

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

![Image](/assets/img/2024-07-12-SpringMicroservicesDealingwithTimezonesandDateLocalization_1.png)
