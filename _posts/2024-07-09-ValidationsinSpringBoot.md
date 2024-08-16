---
title: "Spring Boot에서 유효성 검사를 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ValidationsinSpringBoot_0.png"
date: 2024-07-09 21:42
ogImage: 
  url: /assets/img/2024-07-09-ValidationsinSpringBoot_0.png
tag: Tech
originalTitle: "Validations in Spring Boot"
link: "https://medium.com/@himani.prasad016/validations-in-spring-boot-e9948aa6286b"
isUpdated: true
---




![그림](/assets/img/2024-07-09-ValidationsinSpringBoot_0.png)

검증은 데이터의 품질을 확인하는 것과 같습니다. 선생님이 답안을 맞거나 틀리게 표시하는 것처럼, 검증은 사람들이 프로그램에 제공하는 정보가 올바르고 규칙을 따르는지 확인합니다.

Spring Boot은 주석, 사용자 정의 유효성 검사기, 오류 처리 및 그룹 유효성 검사를 포함한 다양한 검증 메커니즘을 제공합니다.

## 유효성 검사 주석

<div class="content-ad"></div>

Spring Boot에서는 특정 유효성 검사 규칙이 있는 필드를 표시하는 주석을 사용하여 유효성 검사를 쉽게 할 수 있습니다. 사용자의 간단한 등록 양식을 유효성 검사하는 예제를 살펴봅시다:

```java
public class UserRegistrationForm {
    @NotBlank(message = "Please provide a username")
    private String username;
    @Email(message = "Please provide a valid email address")
    private String email;
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    // Getter 와 Setter
}
```

- @NotNull: 필드가 null이 아님을 보장합니다.
- @NotBlank: non-null 여부를 강제하고 적어도 하나의 공백이 아닌 문자가 필요합니다.
- @NotEmpty: 컬렉션이나 배열이 비어있지 않음을 보장합니다.
- @Min(value): 숫자 필드가 지정된 최소값보다 크거나 같은지 확인합니다.
- @Max(value): 숫자 필드가 지정된 최대값보다 작거나 같은지 확인합니다.
- @Size(min, max): 문자열이나 컬렉션 크기가 특정 범위 내에 있는지 유효성을 검사합니다.
- @Pattern(regex): 필드가 제공된 정규 표현식과 일치하는지 확인합니다.
- @Email: 필드가 유효한 이메일 주소 형식을 포함하는지 보장합니다.
- @Digits(integer, fraction): 숫자 필드가 지정된 정수 및 소수 자릿수를 가지고 있는지 확인합니다.
- @Past와 @Future: 날짜나 시간 필드가 각각 과거와 미래에 있는지 확인합니다.
- @AssertTrue와 @AssertFalse: boolean 필드가 true와 false 각각인지 확인합니다.
- @CreditCardNumber: 필드가 유효한 신용카드 번호를 포함하는지 검증합니다.
- @Valid: 중첩된 객체나 속성의 유효성 검사를 트리거합니다.
- @Validated: 클래스 또는 메소드 수준에서 적용할 유효성 검사 그룹을 지정합니다.

## 13. @Valid

<div class="content-ad"></div>

@Valid 주석을 메소드 매개변수에 적용하면 Spring Boot가 해당 매개변수를 처리하기 전에 자동으로 유효성 검사를 트리거합니다. 이것은 유효성을 검사해야 하는 것을 나타내기 위해 객체 앞에 배치됩니다. 이는 해당 매개변수의 수신 데이터가 지정된 유효성 규칙에 대해 유효성을 검사하게 됨을 의미합니다.

```java
@RestController
@RequestMapping("/user")
public class ApiController {

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation failed");
        }
        userService.saveUser(user);
        return ResponseEntity.ok("User created successfully");
    }
}
```

데이터가 유효성 검사에 실패하면, Spring Boot가 자동으로 유효성 검사 오류 메시지를 생성하고 이를 입력 데이터의 적절한 필드와 연결합니다. 이러한 유효성 검사 오류는 일반적으로 BindingResult 객체에 캡쳐되며, 검증 실패를 분석하고 처리하기 위해 액세스할 수 있습니다.

## 14. @Validated

<div class="content-ad"></div>

검증 그룹을 용이하게 지원하고 빈 내의 특정 그룹 필드에 유효성 검사 규칙을 적용하는 메커니즘을 제공하기 위해 도입되었습니다. 빈 객체 전체를 유효성 검사하는 표준 @Valid 주석과 달리, @Validated를 사용하면 유효성 검사 프로세스 중에 적용할 유효성 검사 그룹을 지정할 수 있습니다.

# 중첩 속성의 유효성 검사

유효성 검사가 필요한 중첩 속성을 가진 복잡한 객체를 다룰 때, @Valid 주석과 유효성 주석을 함께 사용하여 최상위 객체와 해당 중첩 속성이 올바르게 유효성을 검사받도록 할 수 있습니다.

```js
public class Order {
    @NotNull
    private String orderId;
    @Valid
    private ShippingAddress shippingAddress;
    // 기타 속성, 게터, 세터...
}
```

<div class="content-ad"></div>

```java
public class ShippingAddress {
    @NotNull
    private String street;
    @NotNull
    @Size(min = 2, max = 50)
    private String city;
    @NotNull
    private String zipCode;
}
```

# Controller 통합

일반적으로 유효성 검사는 컨트롤러에서 이루어집니다. 사용자 입력을 받는 곳이기 때문이죠.

```java
@Controller
public class UserController {
    @PostMapping("/register")
    public String registerUser(@Valid UserRegistrationForm form, BindingResult result) {
        if (result.hasErrors()) {
            return "registrationForm"; // 에러 메시지와 함께 폼으로 되돌아갑니다
        }
        // 에러가 없으면 사용자 등록을 진행합니다
        // ...
        return "redirect:/login";
    }
}
```

<div class="content-ad"></div>

# 컨트롤러에서의 유효성 검사:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사 오류 처리
            return ResponseEntity.badRequest().body("유효성 검사 오류가 발견되었습니다.");
        }
        // 사용자 처리 및 새 사용자 생성
        // ...
        return ResponseEntity.ok("사용자가 성공적으로 생성되었습니다.");
    }
}
```

이 예제에서는 createUser 메서드 내에서 @Valid 어노테이션이 사용되어 요청 바디에 받은 User 객체를 유효성 검사합니다. BindingResult 객체를 사용하여 어떠한 유효성 검사 오류가 발생했는지 캡쳐합니다.

# 전역 예외 처리

<div class="content-ad"></div>

검증 오류는 불가피합니다. Spring Boot은 이를 전역적으로 처리할 수 있는 방법을 제공합니다:

```js
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        // 필드 오류 맵 생성
        // 적절한 오류 응답 반환
    }
}
```

@ControllerAdvice 어노테이션은 클래스를 전역 예외 처리기로 표시하며, 유효성 검사 실패 시 발생하는 MethodArgumentNotValidException을 처리합니다.

# 사용자 정의 검증:

<div class="content-ad"></div>

## 1. 사용자 지정 유효성 검사 어노테이션:

새 어노테이션을 정의하여 사용자 지정 유효성 검사 어노테이션을 만들 수 있습니다. 이 어노테이션은 클래스의 필드 또는 메소드에 적용하려는 유효성 검사 규칙을 지정합니다.

- @Target: 어노테이션이 적용 가능한 위치를 정의합니다. 예제에서는 필드와 메소드에 지정되어 있습니다.
- @Retention: 어노테이션이 유지되어야 하는 기간을 지정합니다. RUNTIME은 실행 시 유효성 검사에 사용 가능함을 의미합니다.
- @Constraint: 유효성 검사 로직을 구현하는 Validator 클래스를 지정합니다.

```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CustomValidator.class)
public @interface CustomValidation {
    String message() default "Invalid value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

<div class="content-ad"></div>

## 2. 사용자 정의 유효성 검사기:

사용자 정의 유효성 검사기는 ConstraintValidator 인터페이스를 구현한 클래스입니다. 이 예제에서 유효성 검사기 클래스는 CustomValidator이며 ConstraintValidator`CustomValidation, String`을 구현합니다. 이는 @CustomValidation 주석이 달린 String 유형의 필드를 유효성 검사하는 책임을 갖습니다.

- initialize(): 이 메서드는 유효성 검사기를 초기화합니다. 필요한 경우 어노테이션 속성에 액세스할 수 있습니다.
- isValid(): 이 메서드는 실제 유효성 검사 로직을 수행합니다. 유효성을 확인해야 하는 필드의 값(String)과 사용자 지정 유효성 검사 동작을 설정하기 위한 ConstraintValidatorContext를 받습니다.

```js
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CustomValidator implements ConstraintValidator<CustomValidation, String> {
    @Override
    public void initialize(CustomValidation constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // 여기에서 유효성 검사 로직을 구현합니다
        // 유효성을 통과하면 true를, 그렇지 않으면 false를 반환합니다
        return value != null && value.startsWith("ABC"); // 예제 유효성 검사 조건
    }
}
```

<div class="content-ad"></div>

## 3. 커스텀 유효성 검사 주석 사용하기:

클래스의 필드에 커스텀 유효성 검사 주석을 적용합니다. 예를 들어, Data 클래스에는 @CustomValidation으로 주석이 달린 customField라는 필드가 있습니다. 이 주석은 연관된 유효성 검사기(CustomValidator)에 정의된 유효성 검사 논리를 트리거합니다.

```js
public class Data {
    @CustomValidation
    private String customField;
}
```

# 유효성 검사 그룹:

<div class="content-ad"></div>

검증 그룹을 사용하면 다른 시나리오에 특정 검증 규칙을 적용할 수 있어요. 사용자 등록 양식이 있는 예시를 살펴봅시다. 이 양식에는 기본 정보와 고급 정보가 포함되어 있어요:

## 단계 1: 검증 그룹 정의

다른 검증 그룹을 위해 마커 인터페이스를 생성해보세요:

```js
public interface BasicInfo {}
public interface AdvancedInfo {}
```

<div class="content-ad"></div>

```java
public class User {

    @NotNull(groups = BasicInfo.class)
    @NotNull(groups = AdvancedInfo.class)
    private String username;

    @NotNull(groups = AdvancedInfo.class)
    private String email;
    // Other fields, getters, setters
}
```

## 단계 2: 유효성 그룹 적용

컨트롤러 메서드에서 @Validated 주석과 원하는 유효성 그룹을 사용하세요:

```java
import org.springframework.validation.annotation.Validated;
@Controller
@Validated
public class UserController {
    @PostMapping("/registerBasicInfo")
    public String registerBasicInfo(@Validated(BasicInfo.class) @ModelAttribute UserRegistrationForm form, BindingResult result) {
        if (result.hasErrors()) {
            return "basicInfoForm";
        }
        // 기본 정보 등록 처리
        return "redirect:/success";
    }
    @PostMapping("/registerAdvancedInfo")
    public String registerAdvancedInfo(@Validated(AdvancedInfo.class) @ModelAttribute UserRegistrationForm form, BindingResult result) {
        if (result.hasErrors()) {
            return "advancedInfoForm";
        }
        // 고급 정보 등록 처리
        return "redirect:/success";
    }
}
```

<div class="content-ad"></div>

# 서비스 레이어에서의 유효성 검사

가끔은 객체의 프로그래밍적 유효성 검사가 필요합니다. 최근에 요청 본문에 이미지가 포함된 작업을 진행하면서, 요청을 문자열로 받아들여 컨트롤러에서 직접 유효성 검사를 수행할 수 없었습니다. 이에 대처하기 위해 Validator 클래스를 사용하여 서비스 레이어에서 유효성 검사를 구현하였습니다.

다음은 이를 활용하는 방법입니다:

```js
import org.springframework.stereotype.Service;

@Service
@AllArgsContructor
public class UserService {
    private final Validator validator;
    public void createUser(User user) {
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        if (!violations.isEmpty()) {
            // 유효성 검사 오류 처리
        }
    }
}
```

<div class="content-ad"></div>

# BindingResult

다른 작업에서는 데이터 유효성 실패를 데이터베이스에 저장해야 했습니다. @Valid를 사용하면 예외를 던져 처리할 수 있지만, 예외를 던지지 않고 즉시 오류 처리를 하는 경우가 선호될 때가 있습니다. 이러한 경우에는 BindingResult를 활용하여 요청 후에 오류를 캡처하고 저장할 수 있습니다. Request body 바로 뒤에 넣어주세요.

```java
@RestController
@RequestMapping("/api")
public class ValidationController {

    @Autowired
    private Validator validator; // Validator를 자동 주입합니다.

    @PostMapping("/validate")
    public ResponseEntity<String> validateData(@RequestBody @Valid Data data, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                String errorMessage = error.getDefaultMessage();
            }
            return ResponseEntity.badRequest().body("유효성 검사 실패");
        }
        return ResponseEntity.ok("데이터가 성공적으로 유효성 검사되었고 처리되었습니다");
    }
}
```

커피 한 잔 사주세요 ☕️: https://www.buymeacoffee.com/himaniprasad