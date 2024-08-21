---
title: "자바 레코드 코드에서 사용을 시작해야 하는 이유는"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-09 22:02
ogImage:
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Java Records: Should you start using them in code ?"
link: "https://medium.com/@abhijeet.gite/java-records-should-you-start-using-them-in-code-2b4b7d75be84"
isUpdated: true
---

# 소개

Java 16에서, 개발자들은 Java 생태계에 새로운 거주자인 record 키워드를 만났습니다. Lombok 같은 기존 도구들과 Scala 같은 경쟁 언어의 기능들 사이에서 이 추가가 어떤 위치에 맞는지 살펴보겠습니다.

# Java Records를 더 자세히 살펴보기

Java Records는 데이터 표현을 위한 클래스를 정의하는 간단한 방법을 제공합니다. 명확성을 위해.

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
public record User(String name, int age) {}
```

이 구문은 이름(name)과 나이(age) 필드를 가지는 User를 정의하는 것 뿐만 아니라, equals, hashCode, toString과 같은 메소드를 자동으로 추가해 줍니다.

# 속 깊은 곳: 레코드의 작동 방식

자바 레코드는 마치 마법처럼 보일 수 있지만, 실제로는 다음과 같이 작동합니다.

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

- 필드: Java는 각 구성 요소마다 private final 필드를 만듭니다.
- 생성자: 공개 생성자를 만들어 이러한 필드를 초기화합니다.
- 메서드: Java는 또한 공개 get 메서드(겟터) 및 equals, hashCode, 그리고 toString과 같은 필수 메서드를 생성합니다.
- 레코드는 본질적으로 final 클래스입니다. Java 코드에서 레코드 선언을 작성하면 Java 컴파일러가 이 선언을 처리하고 전통적인 클래스의 경우와 마찬가지로 레코드를 위한 .class 파일을 생성합니다. 이 .class 파일을 JVM이 실행합니다.
- 레코드 속성: 결과 .class 파일에는 일반 클래스와 구별되는 특별한 레코드 속성이 포함됩니다.
- 클래스 생성: 레코드는 final 클래스로 변환되어 컴파일 후 .class 파일이 생성됩니다.

# Spring Boot에서 레코드 만나기: 자세히 살펴보기

Java 레코드는 데이터 표현에서의 새로운 패러다임을 제시하며, 적응성에 중점을 둔 프레임워크인 Spring Boot는 이 추가를 수용했습니다. Spring Boot가 레코드를 처리하는 방식과 Spring Boot 애플리케이션에서 효과적으로 활용하는 방법을 알아봅시다.

1. 레코드를 빈으로 사용하기

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

레코드는 클래스와 마찬가지로 @Component, @Service, @Repository 또는 @Controller와 같은 주석으로 주석 처리될 수 있습니다. Spring으로 관리되는 빈으로 선언합니다. 레코드 빈의 인스턴스는 Spring 컨테이너에서 관리되며 수명 주기는 클래스 기반 빈과 동일합니다.

예시:

```java
@Component
public record UserService(UserRepository repo) {
    // 비즈니스 로직
}
```

2. 의존성 주입

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

Spring의 의존성 주입 메커니즘은 레코드와 완벽하게 호환이 됩니다. 레코드의 불변성 특성을 감안할 때, 생성자 주입이 가장 자연스러운 선택입니다.

예시:

```java
@RestController
@RequestMapping("/users")
public record UserController(UserService userService) {

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
```

3. 라이프사이클

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

레코드 빈의 라이프사이클은 클래스 기반 빈의 것과 별반 다르지 않습니다. 일반적인 라이프사이클 콜백 (@PostConstruct 및 @PreDestroy)은 레코드에도 적용됩니다.

4. 구성 속성

@ConfigurationProperties와 함께 사용할 때 레코드가 정말 빛을 발합니다. 이 시너지를 통해 속성의 안전한 타입 바인딩이 가능해져 깔끔하고 구조화된 구성 클래스를 얻을 수 있습니다.

```java
@ConfigurationProperties(prefix = "app")
@ConstructorBinding
public record AppConfig(String name, DatabaseConfig database) {
    public record DatabaseConfig(String url, String username, String password) {}
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

위 기능에 대한 spring-boot-configuration-processor 종속성을 포함해주시기 바랍니다.

5. 제한 사항 및 고려 사항

Record는 훌륭한 추가 기능이지만 Spring Boot와 함께 사용할 때 고려해야 할 사항이 있습니다:

- Record는 불변이므로 record 구성 요소에 직접 @Autowired를 사용한 필드 주입이 불가능합니다.

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
public record UserService(@Autowired UserRepository repo) {
    // 이 방법은 작동하지 않을 겁니다!
}
```

- 현재 records는 그들의 final 속성 때문에 기본적으로 동적 프록시 메커니즘을 지원하지 않습니다. 따라서, 일부 Spring의 특정 기능 (예: 특정 종류의 Aspect-Oriented 프로그래밍)은 records에 직접 적용될 때 제한 사항을 가질 수 있습니다.

# Spring Boot와 Records에 대한 결론

Records는 Spring Boot 코드베이스에 간결함과 명확성을 도입합니다. 많은 Spring Boot 기능과 잘 통합되지만, 그들의 특성과 가끔씩 발생할 수 있는 제한 사항을 유의하는 것이 중요합니다. 일반적인 원칙은 무엇일까요? Records는 필요한 곳에서 사용하여 가독성을 향상시키지만, 모든 곳에 강제로 적용하지는 마세요.

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

# Records vs. 롬복

롬복은 @Data와 같은 주석을 사용하여 보일러플레이트로부터 구원받았습니다. 이제 Java에 내장된 레코드가 등장했습니다. 둘 다 가치가 있지만, 레코드는 간단한 데이터 표현에 대한 네이티브 접근 방식을 제공합니다.

# Kotlin, Scala 및 레코드 영감

Java의 경쟁자들이 침묵하지 않습니다. Kotlin은 "데이터 클래스"를 갖고 있고, Scala는 "케이스 클래스"를 제공합니다. Scala는 다음과 같습니다:

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
case class User(name: String, age: Int)
```

레코드는 자바가 변화하는 환경에 발 맞추려는 노력의 결과입니다.

# 레코드의 본질

- 간결함: 레코드는 데이터에 집중합니다.
- 내장된 솔루션: 주요 Java 기능인 레코드는 서드파티 종속성을 건너뛰었습니다.
- 진화: Java 레코드는 이 언어가 현대적인 방향을 지키겠다는 약속을 반영합니다.

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

# 1. 레코드와 컬렉션

- 매끄러운 통합: 레코드를 Java의 컬렉션 프레임워크 내의 다른 객체와 마찬가지로 사용할 수 있습니다. 예를 들어, List`RecordType`, Set`RecordType`, 또는 Map`RecordType, AnotherType`과 같이 사용할 수 있습니다.
- 불변성으로 인한 안전성: 레코드의 불변성은 예측 가능한 동작을 제공합니다. 레코드가 컬렉션의 일부인 경우에는 해당 상태가 일정하게 유지되므로 읽기 액세스에 대해 스레드 안전성이 보장됩니다.
- 자동 생성된 메소드: 레코드는 기본적으로 equals(), hashCode(), 그리고 toString()와 같은 메소드가 자동으로 생성됩니다. 이로써 해시 맵 또는 해시셋과 같은 해시 기반 컬렉션과 잘 맞는 것을 보장합니다.

# 2. 레코드와 스레딩

- 본질적인 스레드 안전성: 불변성을 가지고 있기 때문에 레코드는 공유 읽기 액세스에 대해 본질적으로 스레드 안전합니다.
- 기본적으로 잠금 메커니즘 없음: 동기화가 필요한 경우에는 Java의 표준 동기화 메커니즘을 사용하세요.
- 가변 구성 요소 주의: 레코드의 구성 요소가 가변 구조(예: List와 같은 것)에 대한 참조인 경우, 해당 구조는 가변 상태로 유지됩니다. 공유된 변이가 있는 경우 적절한 동기화가 필요합니다.

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

# 3. 기록과 반성

- 접근 가능한 구성 요소: 자바의 reflection API를 사용하여 레코드의 구성 요소와 그 값에 쉽게 접근할 수 있습니다. 이는 일반 클래스의 필드와 마찬가지로 작동합니다.
- 메타데이터: reflection API를 통해 레코드를 명확하게 식별할 수 있어 클래스가 레코드인지를 확인할 수 있습니다.
- 제약: reflection을 사용하여 레코드를 검사할 수는 있지만, 레코드의 불변성 때문에 레코드의 구성 요소 값을 생성 이후에 수정하는 것과 같은 일부 작업은 허용되지 않습니다.

# 4. 기록과 수정자

- 암시적 수정자: 모든 레코드 구성 요소는 암시적으로 final입니다. 따라서 할당된 값은 변경할 수 없습니다.
- 공개 레코드 구성 요소: 기본적으로 레코드 구성 요소는 public이지만, 레코드 자체에는 public, protected 또는 패키지-내부 접근자와 같은 접근 수정자를 가질 수 있습니다.
- 확장 가능성 제한: 레코드는 다른 클래스를 확장할 수 없지만 인터페이스를 구현할 수 있습니다. 이 설계는 데이터 일관성과 간결함을 보장합니다.

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

# 결론:

레코드를 사용할 때:

- 줄이고 변경할 수 없음이 기본으로 제공되는 뼈대를 즐기세요.
- 가변 구성요소나 반사와 관련된 미묘한 점을 유의해야 합니다.
- 데이터가 많은 작업에 특히 강점을 활용해 더 깨끗하고 유지보수 가능한 코드를 작성하세요.

레코드는 단순함과 강력함을 결합하여 현대적인 Java 개발자라면 반드시 알아야 할 도구입니다.

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

# 이전 방식: @Value 사용

`records`와 `@ConfigurationProperties`의 보급화 이전에는 Spring Boot 개발자들이 종종 속성 값을 주입하기 위해 @Value에 의존했습니다. 이는 때때로 코드 전반에 흩어진 주석으로 이어질 수 있어 관리와 이해가 어려워질 수 있었습니다.

@Value를 사용한 예시:

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String name;

    @Value("${app.database.url}")
    private String databaseUrl;

    @Value("${app.database.username}")
    private String databaseUsername;

    @Value("${app.database.password}")
    private String databasePassword;

    // getter, setter 및 기타 메서드
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

이 방법은 작동하지만 많은 프로퍼티를 처리할 때에는 번거로워지고 조각날 수 있습니다.

# 새로운 방법: 레코드와 함께 @ConfigurationProperties 사용하기

레코드의 등장과 이미 존재하는 @ConfigurationProperties를 이용하면 더 깔끔하고 조직되어 있는 설정을 정의할 수 있습니다.

레코드와 함께 @ConfigurationProperties를 사용한 예제:

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
@ConfigurationProperties(prefix = "app")
@ConstructorBinding
public record AppConfig(String name, DatabaseConfig database) {

    public record DatabaseConfig(String url, String username, String password) {}

}
```

이 설정을 사용하면 속성이 보다 구조화된 방식으로 바인딩되어 구성을 읽기 쉽고 관리하기 쉽게 만들 수 있습니다. 중첩된 record인 DatabaseConfig는 관련 속성을 논리적으로 그룹화하는 방법을 보여줍니다.

이 기능을 활성화하려면 spring-boot-configuration-processor 종속성을 추가하고 주요 애플리케이션 클래스 또는 구성 클래스에 @EnableConfigurationProperties를 주석으로 달아야 합니다.

블로그에 이 섹션을 통합하여 Spring Boot에서 속성 구성의 진화와 record가 @ConfigurationProperties와 함께 코드베이스를 단순화하는 방법을 강조할 수 있습니다.

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

# 이것을 시도해볼까요?

레코드의 우아함은 탁월하지만, 프로젝트 요구 사항에 기반하여 그들의 적용 가능성을 고려하는 것이 중요합니다.

1. 사용자 정의보다 간소함

만약 당신의 클래스가 주로 간단한 데이터 홀더이고, 보일러플레이트 코드를 최소화하고 싶다면, 레코드는 훌륭한 선택입니다. 레코드는 명확한 의미론을 제공합니다. 그러나 클래스 내에서 정교한 사용자 정의가 필요하다면 전통적인 클래스가 더 적합할 수 있습니다.

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

2. 성능 영향

레코드를 사용하는 것이 성능상 이점이 있는지 궁금할 수 있습니다. 사실, 원시 성능 측면에서 레코드는 전통적인 클래스보다 중요한 개선을 제공하지는 않습니다. 둘 다 바이트 코드로 컴파일되며 JVM에서 유사하게 처리됩니다. 레코드의 실질적인 가치는 가독성과 줄어든 보일러플레이트에 있으며 이는 인간의 실수를 줄일 수 있습니다.

3. 기존 코드 리팩터링

POJO(Plain Old Java Objects)를 레코드로 일괄 변환해야 할까요? 아마 그렇지 않을 것입니다. 레코드는 멋진 기능이지만, 이미 존재하고 잘 테스트된 코드를 전면 개편하는 것은 노력과 잠재적인 위험을 정당화할만한 충분한 이점을 제공하지 않을 수 있습니다.

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

그러나 새로운 구성 요소나 모듈, 특히 간단한 데이터 운송체가 필요한 경우 레코드를 고려할 가치가 있습니다.

4. 라이브러리 및 프레임워크 호환성

레코드를 적극적으로 활용하기 전에 기존의 라이브러리와 프레임워크가 레코드와 잘 작동하는지 확인하세요. Spring Boot와 같은 주요 프레임워크는 레코드를 수용했지만, 일부 오래된 라이브러리는 레코드를 인식하거나 올바르게 처리하지 못할 수 있습니다.

# 적용에 대한 결론

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

Java records은 주목할 만한 추가 기능이지만, 모든 상황에 완벽한 해결책은 아닙니다. Java 도구 상자 속에서 또 다른 도구일 뿐입니다. 데이터 중심 클래스에서 불변성과 명확성이 중요한 경우를 고려해 보세요. 새로운 기능을 도입할 때는 프로젝트 상황을 고려하여 장단점을 생각해 보고, 특정 요구 사항에 맞추어 전통적인 클래스와 레코드를 혼용하는 것을 두렵지 않아해주세요.
