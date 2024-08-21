---
title: "Path를 사용할까 말까 고민된다면 비교와 선택 가이드"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-09 21:09
ogImage:
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "To path or not to path…"
link: "https://medium.com/juliusbaerengineering/to-path-or-not-to-path-34f06d26fff1"
isUpdated: true
---

## 이야기…

저희 침투 테스팅 팀은 Spring Boot 애플리케이션 (Spring Boot 2.7.x)에서 문제를 발견했습니다. 문제는 애플리케이션이 잘못된 문자를 포함하는 경우 해당 요청 경로 자체를 사용자에게 반환했다는 것이었습니다. 이러한 잘못된 문자는 세미콜론이나 Spring이 안전하지 않은 문자로 간주하는 다른 문자가 될 수 있습니다.

이러한 동작은 보안에 문제가 될 수 있습니다. 왜냐하면 잘못된 경로가 사용자의 브라우저에서 JavaScript 코드로 해석되거나 외부 스크립트 요청으로 해석될 수 있기 때문입니다. 브라우저가 적절하게 처리되지 않으면 보안 취약점으로 이어질 수 있습니다.

Spring Boot은 악의적인 요청에 대해 강력한 보호 기능을 기본 제공하지만, 자동으로 구성할 수 있는 상황이 아닌 것을 명심하는 것이 중요합니다.

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

## 스프링 프레임워크는 잘못된 요청을 어떻게 처리하나요?

Spring Boot는 잘못된 요청에 대한 강력한 기본 처리 기능을 제공합니다. 이는 경로 순회나 악의적인 자바스크립트 삽입과 같은 일반적인 공격에 대한 방어를 수동으로 구성할 필요가 없다는 것을 의미합니다.

이 구성의 주요 구성 요소는 org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration 클래스입니다. 이 클래스는 애플리케이션 컨텍스트에서 ErrorController 유형의 기존 빈을 확인합니다. 빈이 없는 경우 org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController 클래스의 인스턴스를 자동으로 만들어 오류 응답을 처리합니다.

```js
 @Bean
 @ConditionalOnMissingBean(value = ErrorController.class, search = SearchStrategy.CURRENT)
 public BasicErrorController basicErrorController(ErrorAttributes errorAttributes,
   ObjectProvider<ErrorViewResolver> errorViewResolvers) {
  return new BasicErrorController(errorAttributes, this.serverProperties.getError(),
    errorViewResolvers.orderedStream().collect(Collectors.toList()));
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

이 컨트롤러는 보안 필터에 의해 처리 파이프라인 초기 단계에서 거부된 요청에 대한 오류를 다룹니다. 경로 관련 문제는 org.springframework.security.web.firewall.StrictHttpFirewall 클래스에서 감지됩니다. 이 클래스는 일부 구성 옵션을 제공하지만 완전히 사용자 정의할 수는 없습니다.

# 해결책

이 문제에 대한 해결책으로는 여러 가지 방법이 있으며, 내견에는 BasicErrorController를 재정의하는 것이 가장 간단한 옵션이었습니다.

오류 응답을 작성할 때 오류 컨트롤러는 org.springframework.boot.web.servlet.error.DefaultErrorAttributes 클래스에서 정의된 속성 목록을 사용합니다. 기본적으로 이 클래스에는 요청 경로뿐만 아니라 스택 추적 및 예외 세부 정보와 같은 다른 속성도 포함됩니다. 그러나 이후의 속성은 구성에 의해 제거할 수 있지만 경로는 그렇지 않습니다.

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

저희 Spring Boot 애플리케이션 모음에서는 일반적인 해결책이 필요했습니다. 이는 각 애플리케이션에서 개별적으로 수정하는 대신 Spring 자동 구성을 사용하는 라이브러리를 생성하는 것을 의미했습니다. 결과적으로 라이브러리를 포함하면 기본 Spring 컨트롤러를 자동으로 대체하고 결함을 수정할 수 있습니다.

첫 번째 단계: 자동 구성 설정

첫 번째 단계는 물론 Spring에 자동 구성할 내용이 있다고 알려주는 것입니다. 이를 위해 라이브러리의 리소스 디렉토리 내 META-INF/spring 하위에 org.springframework.boot.autoconfigure.AutoConfiguration.imports라는 파일을 생성해야 합니다. 이 파일에는 한 줄을 포함해야 합니다:

com.library.autoconfigure.CustomErrorControllerConfiguration

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

이 줄은 필요한 빈을 구성하는 클래스를 지정합니다.

ErrorMvcAutoConfiguration 클래스를 살펴보면, 이 솔루션에 관련된 두 개의 빈을 생성하는 것을 볼 수 있습니다: DefaultErrorAttributes 및 BasicErrorController. 후자는 ErrorAttributes 형식의 빈을 필요로 하며(물론 DefaultErrorAttributes에 의해 구현됨), Spring은 이들의 생성을 집합으로 관리합니다.

이상적으로, 누군가는 Spring의 올 또는 없음 접근 방식에 의존하는 대신에 빈 생성에 대한 보다 세부적인 제어를 선호할 수 있습니다. 다행히, 이 제한 사항에 대한 해결책이 있습니다.

두 번째 단계: 자동 구성 구현

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

중요한 점은 ErrorMvcAutoConfiguration 클래스보다 설정 클래스가 인스턴스화되어야한다는 것입니다. 그렇지 않으면 우리의 사용자 지정 컨트롤러가 컨텍스트에 등록되지 않습니다. 그래서 @AutoConfiguration(before = ErrorMvcAutoConfiguration.class) 어노테이션이 사용됩니다.

아래의 두 조건문은 서블릿 기반 애플리케이션에 꼭 필요한 것은 아니지만, 명확성을 위해 포함했습니다. ServerProperties 클래스는 이 컨텍스트 내에서 사용되므로 Servlet 클래스에 대한 조건과 유사하게 사용됩니다.

```js
@AutoConfiguration(before = ErrorMvcAutoConfiguration.class)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({Servlet.class, DispatcherServlet.class})
@EnableConfigurationProperties({ServerProperties.class})
public class CustomErrorControllerConfiguration {
   private final ServerProperties serverProperties;
   public CustomErrorControllerConfiguration(ServerProperties serverProperties) {
      this.serverProperties = serverProperties;
   }
...
```

내 사용자 지정 빈이 우선순위를 가지도록 하려면 ErrorMvcAutoConfiguration이 인스턴스화되기 전에 명시적으로 정의해야했습니다. 이를 위해 CustomErrorController 및 ErrorAttributes 빈을 수동으로 생성하는 것이 포함되었습니다.

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
@Bean
@ConditionalOnMissingBean(value = ErrorAttributes.class, search = SearchStrategy.CURRENT)
public DefaultErrorAttributes errorAttributes() {
   return new DefaultErrorAttributes();
}
@Bean
@ConditionalOnMissingBean(value = ErrorController.class, search = SearchStrategy.CURRENT)
public CustomErrorController customErrorController(ErrorAttributes errorAttributes,
                                                  ObjectProvider<ErrorViewResolver> errorViewResolvers) {
   return new CustomErrorController(errorAttributes, this.serverProperties,
                                    errorViewResolvers.orderedStream().collect(Collectors.toList()));
}
```

세 번째 단계: 컨트롤러 구현

컨트롤러 구현 자체는 상당히 간단합니다. 주로 응답 본문에서 호출자에게 반환되는 속성에 중점을 둡니다. 특히 응답 자체를 구성할 필요가 없습니다. 대신 응답에 포함되지 말아야 하는 정보를 지정하는 데 초점을 맞춥니다. 생성자 내에서, 예외와 그에 딸린 스택 추적을 노출 제한하도록 선택했습니다. 이 정보들은 다른 곳에서 기록됩니다.

```java
@Primary
@RestController
public class CustomErrorController extends BasicErrorController {
   public CustomErrorController(ErrorAttributes errorAttributes, ServerProperties serverProperties,
                              List<ErrorViewResolver> errorViewResolvers) {
      super(errorAttributes, serverProperties.getError(), errorViewResolvers);
      final var errProperties = super.getErrorProperties();
      errProperties.setIncludeException(false);
      errProperties.setIncludeStacktrace(IncludeAttribute.NEVER);
   }
...
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

마지막으로, 경로 제거에 대해 다루어 봅시다...

```java
@Override
protected Map<String, Object> getErrorAttributes(final HttpServletRequest request, final ErrorAttributeOptions options) {
    final Map<String, Object> errorAttributes = super.getErrorAttributes(request, options);
    errorAttributes.remove("path");
    return errorAttributes;
}
```

결론

Spring Framework는 개발자들을 위한 엔드포인트 보안을 간소화하는 데 뛰어납니다. 또한, 특정 동작을 사용자 정의하는 것이 항상 단일 빈을 재정의하는 것만큼 간단하지는 않을 수 있지만, 개별 요구 사항에 맞춰 기능을 맞춤화하는 방법은 항상 있습니다.
