---
title: "Spring Boot에서 Autowired 애노테이션 사용 시 최고의 방법들"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-07 22:06
ogImage:
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Best Practices of using @Autowired annotation in spring boot"
link: "https://medium.com/@contactshubham/best-practices-of-using-autowired-annotation-in-spring-boot-6675cf7e8d9b"
isUpdated: true
---

이 게시물에서는 @Autowired 주석을 사용하여 Constructor Injection Over Field Injection을 선호하여 가장 안전하고 최상의 방법으로 활용하는 방법에 대해 설명하겠습니다. 가능한 한 간단하게 모든 논리를 설명하고 예제를 통해 보여드리겠습니다.

@Autowired가 실제로 하는 일은 무엇일까요?

보안 문제로 @Autowired 주석의 사용을 피하는 많은 게시물/기사를 봤습니다. 그래서 이 게시물을 쓰기로 결정하여 보안 문제 없이 의존성을 자동으로 주입하는 방법을 보여드리려고 합니다.

의존성을 주입하는 가장 일반적인 방법을 살펴보기 전에 Constructor Injection을 통해 @Autowired 주석을 사용하는 방법에 대해 알아보겠습니다.

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
@Service
public class UserController {

    @Autowired
    private UserService userService;

}
```

위 코드에서는 UserService 클래스를 UserController 클래스에 주입하여 나머지 어노테이션에 의해 주입된 하위 메소드를 포함한 모든 메소드에 접근할 수 있습니다.

이는 Spring 컨테이너 외부/내부의 다른 클래스에서 누구나 기본 생성자를 사용하여 인스턴스를 생성할 수 있게 해줍니다(new UserController()와 같이)만 UserService 객체(의존성으로)가 UserController에 필요합니다.

@Autowired는 어떻게 작동합니까?

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

1. 빈 인스턴스: @Autowired 주석은 완전히 초기화된 빈 인스턴스를 주입합니다. 이는 주입된 빈의 모든 종속성이 이미 해결되고 주입된 상태를 의미합니다.
2. 종속성 해결: 애플리케이션 컨텍스트에서 필요한 빈을 찾습니다.
3. 주입: 찾은 빈을 클래스 필드, 생성자 또는 메서드에 주입합니다.
4. 프록시 생성: 필요한 경우 트랜잭션과 같은 추가 기능을 위해 빈을 프록시로 래핑합니다.
5. 라이프사이클 관리: Spring은 모든 종속성이 준비되어 있고 초기화 및 소멸을 관리합니다.

이제 @Autowired 주석을 올바르게 사용하기 위해 좀 더 심층적으로 살펴보겠습니다. @Autowired를 사용하는 안전하고 효율적인 방법은 생성자 주입을 통해 이루어집니다.

# 생성자 주입은 클래스가 인스턴스화될 때 종속성이 제공되어 종속성이 명시적이고 변경할 수 없음을 보장합니다. 이 접근 방식은 코드 가독성, 유지보수성 및 테스트 용이성을 향상시킵니다.

여기 생성자 주입을 사용하여 종속성을 주입하는 방법입니다:

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
@Service
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void someMethod() {
        userService.performAction();
    }
}
```

## @Autowired를 통한 생성자 주입 사용의 이점:

- 명시적 의존성: 의존성이 명확하게 식별됩니다. 테스트할 때나 다른 상황에서 객체를 인스턴스화할 때 (예: 구성 클래스에서 명시적으로 빈 인스턴스를 생성하는 경우와 같은 경우) 하나를 잊을 수 있는 방법이 없습니다.
- 불변성: final 키워드는 주입된 의존성이 설정된 후에 변경될 수 없음을 보장하여 견고성과 스레드 안전성에 도움이 됩니다.
- 테스트가 쉽다: 의존성을 설정하기 위해 반사를 사용할 필요가 없습니다. InjectMocks는 여전히 사용 가능하지만 필수는 아닙니다. 단순히 생성자를 호출하여 직접 목을 만들고 주입할 수 있습니다.

생성자 주입을 사용하면 UserService 의존성을 실제로 해결하지 않고 UserController 객체를 만들 수 없습니다.

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

## 마지막으로, @Autowired 어노테이션을 사용하여 필드에 직접 클래스를 주입하는 것과 @Autowired 어노테이션을 사용하여 생성자 주입을 통해 클래스를 주입하는 것 사이의 차이를 보여 드렸습니다. 이는 불변성을 강제하고, 테스트 가능성을 향상시키며, Spring Boot 애플리케이션에서 종속성을 더 잘 관리할 수 있도록 도와줍니다. 생성자 주입을 택함으로써 더 명확한 코드를 확보할 수 있으며, 종속성 주입과 관련된 잠재적 문제를 줄일 수 있습니다.

전문가 팁: 생성자 호출이 하나만 있는 경우, @Autowired 어노테이션을 포함할 필요가 없습니다. 다음과 같이 사용할 수 있습니다:

```java
@Service
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

}
```

즐거운 코딩! 🚀
