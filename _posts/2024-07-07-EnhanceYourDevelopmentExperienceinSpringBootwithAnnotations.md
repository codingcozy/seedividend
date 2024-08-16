---
title: "Spring Boot 애플리케이션 개발 경험을 향상시키는 애노테이션 사용법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-07 22:08
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Enhance Your Development Experience in Spring Boot with Annotations"
link: "https://medium.com/@asgreen200/enhance-your-development-experience-in-spring-boot-with-annotations-db9e5037bce0"
isUpdated: true
---




이 블로그에서는 Spring Boot에서 개발 경험을 향상시킬 수 있는 어노테이션 목록을 소개하겠습니다.

# @Getter, @Setter

코드를 작성하다 보면 다음과 같이 게터와 세터를 작성해야 합니다.

```js
public class ScoreRequestBody {

    @NotNull
    private String playerUsername;

    @NotNull
    private Integer score;

    @NotNull
    private Long timestamp;

    public String getPlayerUsername() {
        return playerUsername;
    }

    public void setPlayerUsername(String playerUsername) {
        this.playerUsername = playerUsername;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
```  

<div class="content-ad"></div>

여기서 문제가 무엇인가요?

- 필드가 늘어날수록 클래스가 더 길어지고 유지보수하기 어려워집니다.
- 이 클래스에 새로운 필드가 추가되면, 게터와 세터를 수동으로 작성해야 합니다.

이러한 보일러플레이트 코드를 자동으로 생성해 주는 라이브러리가 있는지 궁금할 것입니다. 답은 있습니다. Lombok입니다.

Lombok은 유용한 두 가지 어노테이션, @Getter와 @Setter를 제공하여 게터와 세터 메서드를 작성하는 데 소요되는 시간을 줄일 수 있습니다. 이전 클래스를 이러한 어노테이션을 사용하여 다시 작성해 보겠습니다.

<div class="content-ad"></div>

```java
@Getter
@Setter
public class ScoreRequestBody {

    @NotNull
    private String playerUsername;

    @NotNull
    private Integer score;

    @NotNull
    private Long timestamp;
    
}
```

이러한 어노테이션을 발견했을 때 기쁨이 가득했어요. 이들은 이 클래스의 코드 라인 수를 줄이는 데 상당히 도움이 되었어요. @Getter 및 @Setter 외에도 Lombok은 @AllArgsConstructor 및 @NoArgsConstructor 같은 생성자를 자동으로 생성하는 어노테이션도 제공해요.

# @Accessors

이전 코드는 정말 놀라운데요. 이게 바로 클래스에 값을 할당하는 방법이에요


<div class="content-ad"></div>

```java
ScoreRequestBody body = new ScoreRequestBody();
body.setPlayerUsername("asgreen")
    .setScore(10)
    .setTimestamp(System.currentTimeMillis());
```

여기에 문제는 없어요. 하지만 세터에 대해 다른 방식을 소개해 드릴게요. 보통 세터의 반환 타입은 void입니다. 때로는 세터가 클래스 인스턴스를 반환하도록 하고 싶을 수도 있어요. 이럴 때 Lombok 애노테이션 @Accessors를 사용해 이를 달성할 수 있어요.

```java
@Getter
@Setter
@Accessors(chain = true)
public class ScoreRequestBody {
    @NotNull
    private String playerUsername;
    @NotNull
    private Integer score;
    @NotNull
    private Long timestamp;
}
```

@Accessors(chain = true)를 사용하면 세터가 수정된 인스턴스를 반환하여, 다음과 같이 부드러운 코딩 스타일을 구현할 수 있어요:


<div class="content-ad"></div>

```kotlin
ScoreRequestBody body = new ScoreRequestBody();
        body.setPlayerUsername("asgreen")
                .setScore(10)
                .setTimestamp(System.currentTimeMillis);
```

# @Builder

소프트웨어 엔지니어링에서 Builder 디자인 패턴을 만나볼 수 있습니다. 빌더 메서드를 수동으로 작성하는 대신 @Builder 주석을 사용하여이 프로세스를 자동화 할 수 있습니다.

```kotlin
@Getter
@Setter
@Builder
public class ScoreRequestBody {
    @NotNull
    private String playerUsername;
    @NotNull
    private Integer score;
    @NotNull
    private Long timestamp;
}
```

<div class="content-ad"></div>

요렇게 데이터를 초기화할 수 있어요

```js
ScoreRequestBody body = ScoreRequestBody.builder()
                .playerUsername("asgreen")
                .score(10)
                .timestamp(System.currentTimeMillis())
                .build();
```

# @FieldNameConstants

코딩 여정에서 JpaSpecificationExecutor의 필터 쿼리를 작성할 때와 같이 클래스 내 필드의 이름을 검색해야 할 때가 있을 거예요.

<div class="content-ad"></div>

예를 들어, 사용자의 점수 데이터에 액세스해야 할 때 다음과 같이 작성할 수 있습니다.

```java
@Getter
@Setter
@Builder
public class ScoreRequestBody {
    @NotNull
    private String playerUsername;
    @NotNull
    private Integer score;
    @NotNull
    private Long timestamp;
}
// 예시
String scoreFieldName = "score";
```

"score"를 "userScore"로 리팩터링하기로 결정했을 때, scoreFieldName의 값을 자동으로 업데이트할 수 없습니다. @FieldNameConstants를 사용하면 이를 달성할 수 있습니다.

```java
@Getter
@Setter
@Builder
@FieldNameConstants
public class ScoreRequestBody {

    @NotNull
    private String playerUsername;

    @NotNull
    private Integer score;

    @NotNull
    private Long timestamp;
}
// 예시
String scoreFieldName = Fields.score;
```

<div class="content-ad"></div>

# 결론

롬복 어노테이션인 @Getter, @Setter, @Accessors, @Builder 및 @FieldNameConstants는 Spring Boot에서 자바 개발을 간소화하는 강력한 도구를 제공합니다. 이러한 어노테이션은 보일러플레이트 코드를 줄이고 코드 가독성을 향상시켜 더 효율적이고 즐거운 코딩 경험을 제공합니다.