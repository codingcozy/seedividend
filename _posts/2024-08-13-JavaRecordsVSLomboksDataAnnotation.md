---
title: "Java Records VS Lombok의 Data 어노테이션 최신 비교"
description: ""
coverImage: "/assets/img/2024-08-13-JavaRecordsVSLomboksDataAnnotation_0.png"
date: 2024-08-13 11:41
ogImage: 
  url: /assets/img/2024-08-13-JavaRecordsVSLomboksDataAnnotation_0.png
tag: Tech
originalTitle: "Java Records VS Lomboks Data Annotation"
link: "https://medium.com/@ahmed.abdelfaheem/java-records-vs-lomboks-data-annotation-a1da8842f5b0"
---


<img src="/assets/img/2024-08-13-JavaRecordsVSLomboksDataAnnotation_0.png" />

자바 개발에서 데이터 클래스를 만들 때 반복적인 boilerplate 코드를 작성해야 하는 경우가 많습니다. 생성자, getter, setter, equals(), hashCode(), 그리고 toString() 메서드 등을 매번 반복해서 작성해야 하는 번거로움으로 인해 두 가지 강력한 도구가 등장했습니다: Java Records와 Lombok의 @Data 애너테이션입니다.

JDK 14에서 소개된 Java Records는 JDK 16에서 표준화되었으며 불변 데이터 클래스를 정의하는 내장된 간결한 방법을 제공합니다. 한편 Lombok의 @Data는 Lombok 라이브러리의 널리 사용되는 애너테이션으로, 기존 자바 클래스에 필요한 모든 메서드를 자동으로 생성하여 작업을 보다 쉽게 만들어 줍니다. 두 도구 모두 데이터 클래스 생성을 간단하게 만드는 것을 목표로 하지만, 각각 다른 필요에 맞추어 설계되어 있고 장단점이 있습니다. 각각을 언제 사용해야 하는지 이해하고 지나치게 의존할 경우의 잠재적인 단점을 파악하는 것은 개발자가 더 깔끔하고 유지보수하기 쉬운 코드를 작성할 수 있도록 도와줄 것입니다.

## Java Records: 새로운 데이터 클래스 시대

<div class="content-ad"></div>

Java Records는 JDK 14에서 미리보기 기능으로 소개되었으며 JDK 16에서 표준 기능이 되었습니다. Java Records는 변경할 수 없는 데이터를 보유하기 위해 설계된 Java의 특별한 종류의 클래스입니다. 기본적으로 레코드는 생성자, 접근자 메서드 (getX()), 그리고 equals(), hashCode(), toString()의 구현을 자동으로 생성합니다.

## Java Records의 주요 기능:

불변 데이터: 레코드 내의 필드는 final로 선언되어 객체 생성 후에 변경할 수 없습니다. 이는 레코드가 본질적으로 스레드 안전하게 만듭니다.

메서드의 자동 생성: 레코드를 선언하면 Java 컴파일러가 자동으로 다음을 생성합니다:**

<div class="content-ad"></div>

- 모든 필드를 위한 생성자입니다.
- equals(), hashCode(), toString() 메서드입니다.
- 각 필드에 대한 접근자 메서드 (getX())입니다.

간단한 구문: 레코드를 선언하는 것은 간단하며 뼈대 코드를 크게 줄입니다.

```java
public record Person(String name, int age) {
    // 필요한 경우 여기에 추가적인 메서드 또는 오버라이드를 추가할 수 있습니다
}
```

위 예시에서 Person은 이름과 나이 두 가지 필드를 가진 레코드입니다. Java는 이 레코드가 기능적이게 하기 위해 필요한 메서드를 자동으로 생성하여 데이터 변경 불가성과 깨끗한 코드에 초점을 맞춥니다.

<div class="content-ad"></div>

기록 사용 예:

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person("Alice", 30);
        Person person2 = new Person("Alice", 30);
        
        System.out.println(person1.name()); // 출력: Alice
        System.out.println(person1.age());  // 출력: 30
        System.out.println(person1);        // 출력: Person[name=Alice, age=30]
        
        System.out.println(person1.equals(person2)); // 출력: true
    }
}
```

이 코드는 Person 레코드의 사용법을 보여줍니다. 레코드 정의가 얼마나 간결한지, 그리고 Java가 자동으로 equals(), hashCode(), toString()과 같은 유용한 메서드를 생성하는 방법을 주목해보세요.

## 롬복의 @Data: 클래식한 접근법

<div class="content-ad"></div>

자바 레코드가 소개되기 전에 Lombok은 (지금도) 자바에서 보일러플레이트 코드를 줄이는 인기 있는 도구였습니다. @Data 주석은 클래스에 대한 모든 보일러플레이트 코드를 자동으로 생성하는 강력한 Lombok 기능으로, getters, setters, equals(), hashCode(), 그리고 toString() 메서드를 포함합니다.

Lombok @Data의 주요 기능:

- Mutable Data: Java 레코드와 달리 @Data로 주석 처리된 클래스는 기본적으로 변경 가능합니다. 이는 객체 생성 후에도 필드를 수정할 수 있다는 것을 의미합니다.
- 사용자 정의 메서드 생성: Lombok은 메서드를 자동으로 생성하지만, 개발자는 필요에 따라 여전히 사용자 정의하거나 재정의할 수 있습니다.
- 높은 유연성: Lombok @Data는 레코드뿐만 아니라 모든 자바 클래스와 함께 작동합니다. 데이터만 보유하는 것 이상의 추가 동작을 가진 클래스를 만들 수 있게 해줍니다.

예시:

<div class="content-ad"></div>

```java
import lombok.Data;

@Data
public class Person {
    private String name;
    private int age;
    
    // Additional methods or overrides can be added here if needed
}
```

이 예시에서 @Data 어노테이션은 Lombok에게 Person 클래스에 대한 getters, setters, equals(), hashCode(), 그리고 toString() 메소드를 생성하도록 지시합니다.

Lombok의 @Data 클래스 사용 예시:

```java
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.setName("Bob");
        person1.setAge(25);

        Person person2 = new Person();
        person2.setName("Bob");
        person2.setAge(25);

        System.out.println(person1.getName()); // 결과: Bob
        System.out.println(person1.getAge());  // 결과: 25
        System.out.println(person1);           // 결과: Person(name=Bob, age=25)
        
        System.out.println(person1.equals(person2)); // 결과: true
        
        // 가변성을 보여주기 위한 예시
        person1.setAge(26);
        System.out.println(person1.getAge()); // 결과: 26
    }
}
```

<div class="content-ad"></div>

여기서 Person 클래스는 가변이며 객체 생성 후에 필드를 수정할 수 있습니다. 롬복의 @Data는 필요한 메서드를 자동으로 생성하여 객체 상태를 쉽게 조작할 수 있게 합니다.

## Java 레코드와 롬복의 @Data 비교

## 불변성 vs. 가변성:

- Java 레코드: 레코드는 불변으로 설계되어 있어서 한 번 객체가 생성되면 상태를 변경할 수 없습니다. 이는 데이터 무결성과 스레드 안전성이 중요한 시나리오에 이상적입니다.
- 롬복 @Data: @Data로 주석이 달린 클래스는 가변이며, 객체 생성 후에 객체 상태를 변경할 수 있습니다. 이는 객체가 시간이 지남에 따라 발전해야 하는 상황에 유용할 수 있습니다.

<div class="content-ad"></div>

## 보일러플레이트 감소:

- Java 레코드와 롬복의 @Data는 둘 다 보일러플레이트 코드를 크게 줄여줍니다. 그러나 Java 레코드는 자동 생성자, 엑세서, 메소드 오버라이드의 필요성을 많은 경우에 없애는 점에서 더 나아갑니다.

## 사용자 정의:

- Java 레코드: 맞춤화 측면에서 유연성이 떨어집니다. 데이터 저장 이상에 사용자 정의 동작이 필요한 경우, 레코드는 제한적일 수 있습니다.
- 롬복 @Data: 더 많은 유연성을 제공합니다. 쉽게 메소드를 추가하거나 생성된 메소드를 오버라이드할 수 있어, 추가 로직이 필요한 복잡한 클래스에 더 적합합니다.

<div class="content-ad"></div>

## 상속:

- Java Records: 다른 레코드나 클래스로부터 상속을 지원하지 않습니다. 이는 간단한 데이터 운반을 위해 설계되었기 때문입니다.
- Lombok @Data: 상속 계층 구조의 클래스에서 사용할 수 있어 더 많은 유연성을 제공합니다.

## 채택과 호환성:

- Java Records: 적어도 JDK 14가 필요하며, 전체 지원은 JDK 16부터 제공됩니다. 이전 Java 버전과의 호환성을 유지해야 하는 프로젝트에는 레코드가 적합하지 않을 수 있습니다.
- Lombok @Data: JDK 6부터 옛 버전의 Java와 함께 작동하므로, 이전 Java 버전을 사용하거나 최신 Java 버전으로 마이그레이션하지 않은 레거시 시스템 또는 프로젝트에 더 나은 선택일 수 있습니다.

<div class="content-ad"></div>

## Java Records와 Lombok의 @Data를 과도하게 사용하는 것의 잠재적 단점

Java Records와 Lombok의 @Data 주석 모두 강력한 도구이지만 주의를 기울이지 않고 과도하게 사용하면 잠재적인 문제가 발생할 수 있습니다:

## 코드 가독성 감소:

- Java Records: 특히 복잡한 데이터 구조에 과도하게 사용하는 경우, records는 데이터 관리 뒤에 있는 로직을 숨기는 코드로 이어질 수 있습니다. 간결한 구문은 사용자 지정 메서드가 추가되거나 개발자들이 레코드를 익숙하지 않을 때 다른 개발자들이 코드의 구조와 동작을 이해하기 어렵게 만들 수 있습니다.
- Lombok @Data: 메서드의 자동 생성은 클래스의 기본 동작을 가려줄 수 있습니다. 중요한 비즈니스 로직이 있는 클래스에 @Data가 적용되면 문제를 추적하거나 데이터가 어떻게 조작되는지 이해하는 것이 어려울 수 있습니다.

<div class="content-ad"></div>

## 복합 객체에 대한 부적절한 사용:

- Java Records: 레코드는 단순하고 불변의 데이터 운반자로 가장 적합합니다. 복잡한 객체나 단순한 데이터 저장 이상의 동작이 필요한 엔티티에 사용할 경우 코드가 엄격해지고 유지 관리하기 어려워질 수 있습니다. 레코드는 상속을 지원하지 않으므로 다형성이 필요한 경우에는 적합하지 않습니다.
- Lombok @Data: @Data는 변경 가능한 클래스를 생성하므로, 불변성이나 데이터에 대한 제어된 액세스가 필수적인 시나리오에서 과도하게 사용하면 의도하지 않은 부작용인 데이터 수정과 같은 문제가 발생할 수 있습니다.

## 숨겨진 성능 비용:

- Java Records: 레코드는 일반적으로 효율적입니다만, equals()와 hashCode()의 자동 구현은 필드가 많거나 복잡한 데이터 유형의 클래스에게 최적이 아닐 수 있습니다. 성능에 중요한 응용 프로그램에서 기본 구현에 의존하는 것은 효율성을 떨어뜨릴 수 있습니다.
- Lombok @Data: 레코드와 유사하게, equals()와 hashCode()의 자동 생성은 대규모 클래스에 대해 가장 효율적이지 않을 수 있습니다. 또한 자동 setters는 동시 애플리케이션에서 의도하지 않은 부작용을 일으켜 잠재적인 데이터 불일치 문제를 유발할 수 있습니다.

<div class="content-ad"></div>

## 자동화에 대한 과도한 의존:

- Java Records: 개발자는 레코드의 자동 기능에 너무 의존할 수 있어서 기본 코드를 이해하거나 최적화할 필요를 무시할 수 있습니다. 성능 튜닝이나 디버깅이 필요할 때 특히 문제가 될 수 있습니다.
- Lombok @Data: Lombok에 대한 과도한 의존은 라이브러리에 대한 종속성을 야기할 수 있습니다.

# 결론

Java Records와 Lombok의 @Data 주석은 Java에서 보일러플레이트 코드를 줄이고 데이터 클래스의 생성을 간단화하는 데 상당한 이점을 제공합니다. 그러나 강력한 도구이기 때문에 신중하게 사용해야 합니다. 응용프로그램의 특정 요구 사항을 고려하지 않고 어느 기능을 과도하게 사용하는 경우, 가독성이 저하되거나 복잡한 사용 사례에 부적절한 적용, 그리고 잠재적인 성능 문제와 같은 숨겨진 함정으로 이어질 수 있습니다.

<div class="content-ad"></div>

이러한 기능을 신중히 고려하여 개발자는 Java Records와 Lombok의 @Data의 장점을 활용하면서 잠재적인 단점을 피할 수 있습니다. 불변성과 간결함을 위해 레코드를 선택하든, 유연성과 가변성을 위해 Lombok을 선택하든, 중요한 것은 이러한 도구를 분별해서 적용하는 것입니다. 애플리케이션의 아키텍처와 요구 사항의 전반적인 맥락을 염두에 두면서 이 도구들을 활용하는 것이 중요합니다.