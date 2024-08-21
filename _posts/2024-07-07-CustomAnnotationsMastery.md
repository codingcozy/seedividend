---
title: "커스텀 애너테이션 완벽 마스터하기"
description: ""
coverImage: "/assets/img/2024-07-07-CustomAnnotationsMastery_0.png"
date: 2024-07-07 13:05
ogImage:
  url: /assets/img/2024-07-07-CustomAnnotationsMastery_0.png
tag: Tech
originalTitle: "Custom Annotations Mastery"
link: "https://medium.com/@ahmed.abdelfaheem/custom-annotations-mastery-5bcf1d9f91bd"
isUpdated: true
---

![Custom Annotations Mastery](/assets/img/2024-07-07-CustomAnnotationsMastery_0.png)

자바 개발 분야에서 어노테이션은 중요한 도구로 작용하여 코드를 메타데이터로 풍부하게 만들어 기능성과 명확성을 향상시킵니다. 스프링 부트 프레임워크 내에서 어노테이션은 설정을 간소화하고 동작을 강제로 주입하며 모듈화된 디자인을 장려하는 중추적인 역할을 합니다. 우리는 ElementType과 RetentionPolicy의 이해를 품은 사용자 지정 어노테이션을 생성하고 적용해보겠습니다.

# 스프링 부트에서 어노테이션의 힘을 발휘해보기

스프링 부트의 어노테이션은 클래스, 메소드, 필드 및 기타 프로그램 요소들을 꾸며 동적으로 구성된 엔터티로 변환합니다. 어노테이션은 최상의 사례를 캡슐화하고 보일러플레이트 코드를 줄이며 모듈화된 디자인을 촉진하여 애플리케이션의 민첩성을 높이고 보다 유지보수하기 쉽게 만듭니다.

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

# ElementType 및 RetentionPolicy 이해하기

Spring Boot에서 사용자 정의 주석을 생성하기 전에 ElementType 및 RetentionPolicy의 개념을 이해하는 것이 중요합니다. 이 기본 측면들은 주석이 어떻게 적용되는지 및 Java 코드 내에서 얼마나 오래 유지되어야 하는지를 정의합니다.

## ElementType

ElementType은 주석이 적용될 수 있는 위치를 지정하는 Java의 enum입니다. 다음은 주요 상수들입니다:

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

- TYPE: 어노테이션은 클래스의 모든 요소에 적용할 수 있습니다.
- FIELD: 어노테이션은 클래스 내의 필드(인스턴스 변수)에 적용할 수 있습니다.
- METHOD: 어노테이션은 메소드에 적용할 수 있습니다.
- PARAMETER: 어노테이션은 메소드 매개변수에 적용할 수 있습니다.
- CONSTRUCTOR: 어노테이션은 클래스의 생성자에 적용할 수 있습니다.
- LOCAL_VARIABLE: 어노테이션은 지역 변수에 적용할 수 있습니다.
- ANNOTATION_TYPE: 어노테이션은 다른 어노테이션에 적용할 수 있습니다.
- PACKAGE: 어노테이션은 자바 패키지에 적용할 수 있습니다.

앞으로 할 어노테이션 정의에서 ElementType.METHOD를 지정함으로써 이 어노테이션이 메소드를 주석으로 처리하는 데만 사용될 수 있도록 보장합니다.

## RetentionPolicy

RetentionPolicy는 어노테이션이 유지되는 기간을 지정합니다. 가능한 세 가지 값이 있습니다:

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

- **원본**: 어노테이션은 컴파일러에 의해 폐기되며 클래스 파일에 포함되지 않습니다.
- **클래스**: 어노테이션은 컴파일러에 의해 유지되지만 실행시에 접근할 수 없습니다.
- **실행시**: 어노테이션은 실행시에 유지되며 반사(reflection)를 통해 접근하고 처리할 수 있습니다.

Spring Boot 애플리케이션의 맥락에서는 보안 검사 또는 트랜잭션 관리와 같은 런타임 동작을 어노테이션이 주로 지시하므로 RetentionPolicy.RUNTIME이 일반적으로 사용됩니다.

# 사용자 정의 어노테이션 만들기: @Authenticated

Spring Boot에서 RESTful API를 설계하는 경우 특정 엔드포인트에는 인증이 필요하며 spring security에 대해 아무것도 모르는 상황이라고 상상해보세요 😃. 여러 컨트롤러 메소드에 걸쳐 인증 로직을 포함하는 대신, 사용자 정의 어노테이션인 @Authenticated를 사용하여이 요구사항을 우아하게 적용할 수 있습니다.

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

## 단계 1: @Target 및 @Retention을 사용하여 주석 정의하기

@Authenticated 주석을 정의하고, 적용 범위와 유지 정책을 지정하며 ElementType 옵션을 살펴보겠습니다:

```js
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
```

```js
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authenticated {
    // 여기에 선택적 요소를 추가할 수 있습니다
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

봄 부트 경험을 높이세요: 커스텀 어노테이션 마스터리

# ElementType 및 RetentionPolicy 이해

스프링 부트에서 커스텀 어노테이션을 생성하기 전에, ElementType와 RetentionPolicy의 개념을 이해하는 것이 중요합니다. 이 기본적인 측면들은 어노테이션이 어떻게 적용되고 자바 코드 내에서 얼마나 오래 유지되어야 하는지를 정의합니다.

## ElementType

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

ElementType은 Java에서 어노테이션을 적용할 수 있는 위치를 지정하는 enum입니다. 여기에는 주요 상수들이 있습니다:

- TYPE: 어노테이션을 클래스의 모든 요소에 적용할 수 있습니다.
- FIELD: 어노테이션을 클래스 내의 필드(인스턴스 변수)에 적용할 수 있습니다.
- METHOD: 어노테이션을 메서드에 적용할 수 있습니다.
- PARAMETER: 어노테이션을 메서드 매개변수에 적용할 수 있습니다.
- CONSTRUCTOR: 어노테이션을 클래스의 생성자에 적용할 수 있습니다.
- LOCAL_VARIABLE: 어노테이션을 지역 변수에 적용할 수 있습니다.
- ANNOTATION_TYPE: 다른 어노테이션에 어노테이션을 적용할 수 있습니다.
- PACKAGE: Java 패키지에 어노테이션을 적용할 수 있습니다.

곧 정의할 어노테이션에 ElementType.METHOD을 지정하면, 이 어노테이션이 메서드에만 사용될 수 있도록 보장합니다.

## RetentionPolicy

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

보관 정책은 어노테이션이 유지되어야 하는 기간을 지정합니다. 세 가지 가능한 값이 있습니다:

- SOURCE: 컴파일러에 의해 어노테이션이 삭제되며 클래스 파일에 포함되지 않습니다.
- CLASS: 컴파일러에 의해 어노테이션이 유지되지만 실행 중에 접근할 수 없습니다.
- RUNTIME: 어노테이션이 실행 중에 유지되어 리플렉션을 통해 액세스하고 처리할 수 있습니다.

Spring Boot 애플리케이션에서는, 어노테이션들이 종종 런타임 동작을 지시하기 때문에(예: 보안 확인 또는 트랜잭션 관리), RetentionPolicy.RUNTIME이 일반적으로 사용됩니다.

# 커스텀 어노테이션 만들기: @Authenticated

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

ElementType 및 RetentionPolicy에 대한 이해를 바탕으로 Spring Boot에서 메소드 수준의 인증을 중점으로 하는 사용자 정의 어노테이션 @Authenticated을 생성해 봅시다.

## 단계 1: 어노테이션 정의

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
```

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authenticated {
    // 여기에 선택적 요소를 추가할 수 있습니다
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

@Authenticated 주석은 이제 메서드(ElementType.METHOD)에만 적용되고 실행 시간(RetentionPolicy.RUNTIME)까지 유지되도록 정의되었습니다. 이를 통해 Spring Boot가 응용 프로그램 실행 중에 이 주석을 동적으로 처리할 수 있도록 보장합니다.

## 단계 2: 컨트롤러에 @Authenticated 통합

@Authenticated가 정의되면 Spring MVC 컨트롤러에 통합하여 지정된 리소스를 보호하세요:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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

```java
@RestController
public class MyController {
    @Authenticated
    @GetMapping("/secure/resource")
    public String getSecureResource() {
        return "This is a secure resource";
    }
    @GetMapping("/public/resource")
    public String getPublicResource() {
        return "This is a public resource";
    }
}

- Secure Resource Access: getSecureResource() 메서드는 @Authenticated와 함께 사용되며 액세스에 대한 인증을 강제로 요구하여 민감한 작업을 보호합니다.
- Public Resource Access: getPublicResource() 메서드는 제한이 없어 퍼블릭 리소스로 남아 있으며 어노테이션의 유연성을 보여줍니다.

## 단계 3: 인증 로직 구현

인증을 강제하기 위해 사용자 지정 인터셉터나 Spring Security 구성을 사용하여 런타임에서 @Authenticated 어노테이션을 확인할 수 있습니다. 여기 간소화된 인터셉터 접근 방법이 있습니다:
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

```js
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
```

```js
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Authenticated authenticated = handlerMethod.getMethodAnnotation(Authenticated.class);
            if (authenticated != null) {
                // Check if user is authenticated
                if (!isLoggedIn()) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not authenticated");
                    return false;
                }
            }
        }
        return true;
    }
    private boolean isLoggedIn() {
        // Example method to check if user is authenticated
        // Implement your authentication logic here
        return true; // Replace with actual logic
    }
    // Other overridden methods for postHandle and afterCompletion
}
```

# 우아함과 효율성을 위한 Annotation 채택

Spring Boot 애플리케이션에서 @Authenticated와 같은 Annotation을 활용하여 코드의 가독성과 유지 관리성을 높일 수 있습니다. Annotation은 핵심 동작을 캡슐화하여 인증 관련 고민을 비즈니스 로직과 분리하고 모듈화 개발 관행을 촉진합니다. ElementType과 RetentionPolicy를 이해하면 컴파일 시 최적화 또는 동적 런타임 구성을 위해 Annotation을 의도된 애플리케이션 컨텍스트에 맞게 정확하게 맞춤할 수 있습니다.

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

# 결론: Spring Boot에서 사용자 정의 주석 습득하기

주석은 Spring Boot에서 중요한 역할을 합니다. 응용 프로그램 동작을 향상시키는 선언적 방식을 제공합니다. @Authenticated와 같은 사용자 정의 주석을 숙달하면 개발자는 개발을 간소화하고 보안 정책을 강제로 시행하며 코드 가독성을 높이는 강력한 능력을 활용할 수 있습니다. ElementType와 RetentionPolicy를 잘 이해하면 Spring Boot 프로젝트에서 주석을 효과적으로 활용할 수 있어 애플리케이션에서 혁신과 효율을 이끌어낼 수 있습니다. 📙

# 그다음은?

이제 여러분은 사용자 정의 주석을 탐구하고 만들 준비가 되었습니다.

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

![image](https://miro.medium.com/v2/resize:fit:996/0*n2Ue7GtLj9vRl9Li.gif)

읽는 재미를 느꼈다면 👏🏻을 50번 눌러주세요! 그리고 구독도 잊지마세요
