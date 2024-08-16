---
title: "JPA에서 ENUM의 기본 동작 이해 및 최적화 방법"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-09 21:27
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Understanding and Optimizing the Default Behavior of JPA with ENUMS"
link: "https://medium.com/@ykods/understanding-and-optimizing-the-default-behavior-of-jpa-with-enums-ca7e1b1279c3"
isUpdated: true
---




## JPA에서 효율적인 ENUM 매핑 전략

Java Persistence API (JPA)는 Java 애플리케이션에서 관계형 데이터를 관리하는 강력한 도구입니다. 개발자가 직면하는 일반적인 문제 중 하나는 ENUM 유형을 효율적으로 처리하는 방법입니다. ENUM은 변수를 사전 정의된 상수 집합으로 만들어주는 특별한 데이터 유형입니다. 이 글은 JPA가 ENUM을 다룰 때의 기본 동작을 탐구하고 효율적인 ENUM 매핑 전략을 제공합니다.

# ENUM과 함께 JPA의 기본 동작

기본적으로 JPA는 ENUM 유형을 데이터베이스 열에 매핑할 때 ENUM의 이름이나 순서 값을 사용합니다. 이 두 접근 방식에는 각각 다른 영향이 있습니다.

<div class="content-ad"></div>

- ORDINAL 매핑:

- 설명: JPA는 ENUM을 해당 클래스에서의 ENUM 상수 위치를 나타내는 정수로 매핑합니다.
- 장점: 저장 공간 측면에서 효율적입니다.
- 단점: ENUM 상수가 재배열되거나 새로운 상수가 추가되면 오류가 발생할 수 있어 잠재적인 데이터 무결성 문제가 발생할 수 있습니다.

2. STRING 매핑:

- 설명: JPA는 ENUM을 해당 문자열 표현으로 매핑합니다.
- 장점: 읽기 쉽고 유지보수가 쉽으며, ENUM 상수 변경이 데이터베이스 값에 영향을 미치지 않아 오류가 적습니다.
- 단점: ORDINAL 매핑에 비해 더 많은 저장 공간을 사용합니다.

<div class="content-ad"></div>

# 효율적인 ENUM 매핑 전략

JPA에서 ENUM을 효율적으로 처리하기 위한 전략을 고려해보세요:

- 적절한 매핑 선택:

- 대부분의 애플리케이션에 대해 가독성이 좋고 오류 가능성이 낮은 STRING 매핑을 권장합니다. @Enumerated(EnumType.STRING) 주석을 사용하여 이를 지정할 수 있습니다.

<div class="content-ad"></div>

2. ENUM 변경 사항 처리:

- ORDINAL 매핑: ORDINAL 매핑을 사용하는 경우, ENUM 상수가 재배열되거나 제거되지 않았는지 확인하세요. 새로운 상수는 ENUM 목록의 끝에만 추가하세요.
- STRING 매핑: ENUM 이름의 변경은 신중히 관리되어야 합니다. Flyway나 Liquibase와 같은 데이터베이스 마이그레이션 도구를 사용하여 업데이트를 처리하세요.

3. 사용자 정의 변환기:

- 특별한 처리가 필요한 복잡한 ENUM을 위해 사용자 정의 변환기를 구현하세요. @Converter 주석과 AttributeConverter를 구현한 클래스를 사용하여 이 작업을 수행할 수 있습니다.

<div class="content-ad"></div>

```java
@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {
    @Override
    public String convertToDatabaseColumn(Status status) {
        switch (status) {
            case ACTIVE:
                return "A";
            case INACTIVE:
                return "I";
            default:
                throw new IllegalArgumentException("Unknown status: " + status);
        }
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
        switch (dbData) {
            case "A":
                return Status.ACTIVE;
            case "I":
                return Status.INACTIVE;
            default:
                throw new IllegalArgumentException("Unknown dbData: " + dbData);
        }
    }
}
```

JPA에서 ENUM을 관리하는 것은 데이터 무결성과 유지 관리성을 보장하기 위해 매핑 전략에 신중히 고려해야 합니다. 기본 동작을 이해하고 최고의 방법을 구현함으로써, 개발자들은 애플리케이션을 최적화하고 일반적인 함정을 피할 수 있습니다.

# 이 글을 쓰게 된 계기

데이터베이스에 상태, 즉 알림 상태를 저장하려고 했을 때, 저장 후 0으로 저장되는 것을 확인하게 되었습니다.


<div class="content-ad"></div>

사실 발생한 일은 NotificationStatus 열거형이 데이터베이스에 순서(열거형의 정수 표현)로 저장되고 있었습니다. 이것은 JPA가 열거형을 처리할 때의 기본 동작입니다. 데이터베이스에 열거형의 실제 문자열 값을 저장하려면 Notification 엔티티 클래스에 EnumType.STRING을 사용하여 @Enumerated 주석을 지정해야 합니다.

```java
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class Notification {

    // 다른 필드...

    @Enumerated(EnumType.STRING)
    private NotificationStatus status;

    // 게터와 세터...
}
```

이렇게 하면 JPA가 데이터베이스에 NotificationStatus를 문자열로 저장하도록 알려줍니다. 이제 NotificationStatus.DELIVERED로 Notification을 저장하면 "DELIVERED"가 아니라 0으로 저장된다면 "DELIVERED"로 저장될 것입니다.

새로운 것을 배웠으면 좋겠어요.❤️

<div class="content-ad"></div>

제 GitHub, LinkedIn, Twitter 계정과 연결하세요!