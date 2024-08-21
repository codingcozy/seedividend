---
title: "Java의 toString, equals, hashCode 완벽 해설"
description: ""
coverImage: "/assets/img/2024-07-09-JavastoStringequalsandhashCodeExplained_0.png"
date: 2024-07-09 09:28
ogImage:
  url: /assets/img/2024-07-09-JavastoStringequalsandhashCodeExplained_0.png
tag: Tech
originalTitle: "Java’s toString(), equals(), and hashCode() Explained"
link: "https://medium.com/@AlexanderObregon/javas-tostring-equals-and-hashcode-explained-27cfc9bb1497"
isUpdated: true
---

![image](/assets/img/2024-07-09-JavastoStringequalsandhashCodeExplained_0.png)

# 소개

자바는 객체 비교와 디버깅에 중요한 세 가지 필수 메서드를 제공합니다: toString(), equals(), hashCode(). 이러한 메서드는 올바르게 이해하고 구현할 때 코드의 효과성과 가독성을 크게 향상시킬 수 있습니다. 이 글에서는 이러한 메서드의 동작 메커니즘을 살펴보고, 기본 구현, 사용자 정의 기술, 적절한 사용 시나리오에 대해 논의하겠습니다.

# toString(), equals(), hashCode()의 기본 사항

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

자바에서는 toString(), equals(), hashCode() 메서드가 객체의 핵심 기능에 중요합니다. 이러한 메서드들은 모든 클래스의 상위 클래스인 Object 클래스에서 상속됩니다. 이러한 메서드를 이해하고 언제 그리고 어떻게 재정의해야 하는지를 알아야 합니다. 왜냐하면 이러한 메서드들은 객체 비교, 해싱, 디버깅에 중요한 역할을 합니다.

## toString()

toString() 메서드는 객체의 문자열 표현을 제공합니다. 기본적으로, toString() 메서드는 클래스 이름 뒤에 "@" 문자와 객체의 해시 코드를 16진수로 표현한 문자열을 반환합니다. 이 기본 동작은 빠른 디버깅에 유용하지만 객체의 상태에 대한 더 자세하고 사람이 읽기 쉬운 설명이 필요한 경우에 부족할 수 있습니다.

다음은 기본 toString() 동작의 예시입니다:

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
public class Example {
    public static void main(String[] args) {
        Example example = new Example();
        System.out.println(example.toString());
    }
}
```

Output:

```js
Example@6d06d69c
```

위와 같이 볼 수 있듯이, 이 출력은 매우 유익하지 않습니다. 더 유의미한 정보를 제공하기 위해 클래스에서 toString() 메서드를 재정의할 수 있습니다. 특히 객체의 세부 정보를 출력하거나 로깅할 때 유용합니다. 현재 객체 상태를 이해하는 데 도움이 될 수 있는 관련 데이터를 포함할 수 있기 때문입니다.

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

# equals()

equals() 메서드는 두 개의 객체가 동일한지 여부를 결정합니다. Object 클래스의 equals()의 기본 구현은 메모리 주소를 비교하여 두 참조가 동일한 객체를 가리키는지 확인합니다. 이 동작은 객체의 동등성이 주로 메모리 주소가 아닌 객체의 데이터에 기반하는 현실 세계 응용 프로그램에서 종종 충분하지 않습니다.

예를 들어, 동일한 이름과 나이를 가진 두 Person 객체를 고려해보십시오. 기본적으로 이러한 객체는 메모리 내 다른 인스턴스이기 때문에 동등한 것으로 간주되지 않습니다. 데이터에 기반하여 객체를 비교하려면 equals() 메서드를 오버라이드해야 합니다.

다음은 기본 equals() 동작의 예시입니다:

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
public class Example {
    public static void main(String[] args) {
        Example example1 = new Example();
        Example example2 = new Example();
        System.out.println(example1.equals(example2)); // false
        System.out.println(example1.equals(example1)); // true
    }
}
```

**hashCode()**

`hashCode()` 메서드는 해싱 알고리즘에 의해 생성된 정수 값을 반환하며, HashMap, HashSet 및 Hashtable과 같은 해시 기반 컬렉션에서 객체를 고유하게 식별하는 데 사용됩니다. `hashCode()`의 기본 구현은 객체의 메모리 주소를 기반으로 각 객체에 대해 고유한 정수를 반환합니다. 그러나 `equals()` 메서드를 재정의할 때는 동일한 객체가 동일한 해시 코드를 생성하도록 `hashCode()`를 재정의해야 하며, `hashCode()` 메서드의 일반적인 계약을 유지해야 합니다.

다음은 기본 `hashCode()` 동작의 예시입니다:

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
public class Example {
    public static void main(String[] args) {
        Example example = new Example();
        System.out.println(example.hashCode());
    }
}
```

# 사용자 정의 기법

toString(), equals(), 및 hashCode()의 기본 구현을 이해하는 것은 중요하지만, 이러한 메서드를 클래스의 특정 요구에 맞게 사용자 정의하는 것은 이들의 전체 잠재력을 발휘할 수 있는 곳입니다. 이 섹션에서는 toString(), equals(), hashCode()를 효과적으로 사용자 정의하는 방법을 탐색하여 여러 시나리오에서 객체가 올바르게 동작하도록 보장하는 방법에 대해 살펴볼 것입니다.

## toString()

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

toString() 메서드는 종종 객체의 더 가독성이 좋은 표현을 제공하기 위해 재정의됩니다. 이는 디버깅 및 로깅 목적에 특히 유용하며, 객체의 상태를 빠르게 이해할 수 있게 해줍니다.

toString() 메서드를 사용자 정의하려면 클래스 내에서 재정의하고, 객체의 가장 관련성 있는 필드를 포함한 문자열을 반환하면 됩니다.

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }

    public static void main(String[] args) {
        Person person = new Person("Kaitlyn", 30);
        System.out.println(person.toString());
    }
}
```

출력:

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
Person{name='Kaitlyn', age=30}
```

이 예에서 toString() 메서드는 Person 객체의 상태를 이해하기 쉽게 표현하는 데 도움이 되어 명확하고 정보를 제공합니다. 출력되거나 기록될 때 Person 객체의 상태를 이해하는 데 도움이 됩니다.

## equals()

equals() 메서드는 객체를 메모리 주소가 아닌 데이터를 기반으로 비교하도록 재정의되었습니다. 특히 객체의 동등성을 의존하는 컬렉션을 다룰 때 객체 비교를 올바르게 구현하기 위해 중요합니다.

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

`equals()` 메소드를 오버라이드할 때는 다음 규칙을 준수하는지 확인해야 합니다:

- 반사성(Reflexive): 모든 null이 아닌 참조 값 x에 대해, x.equals(x)는 true를 반환해야 합니다.
- 대칭성(Symmetric): 모든 null이 아닌 참조 값 x와 y에 대해, x.equals(y)는 y.equals(x)가 true를 반환하는 경우에만 true여야 합니다.
- 추이성(Transitive): 모든 null이 아닌 참조 값 x, y, z에 대해, x.equals(y)가 true이고 y.equals(z)가 true인 경우, x.equals(z)는 true여야 합니다.
- 일관성(Consistent): 모든 null이 아닌 참조 값 x와 y에 대해, x.equals(y)를 여러 번 호출하더라도 객체 간의 equals 비교에 사용된 정보가 수정되지 않는 한 일관되게 true 또는 false를 반환해야 합니다.
- 모든 null이 아닌 참조 값 x에 대해, x.equals(null)은 false를 반환해야 합니다.

다음은 `equals()` 메소드를 오버라이드하는 방법입니다:

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }

    public static void main(String[] args) {
        Person person1 = new Person("Kaitlyn", 30);
        Person person2 = new Person("Kaitlyn", 30);
        Person person3 = new Person("Alex", 25);
        System.out.println(person1.equals(person2)); // true
        System.out.println(person1.equals(person3)); // false
    }
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

위 예에서 equals() 메서드는 먼저 비교 대상인 객체(obj)가 현재 객체(this)와 동일한 인스턴스인지 확인합니다. 동일한 인스턴스이면 true를 반환합니다. obj가 null이거나 현재 객체와 동일한 클래스가 아닌 경우 false를 반환합니다. 그렇지 않은 경우, obj를 Person 객체로 캐스트하고 이름 및 나이 필드를 비교하여 동일성을 확인합니다. 이렇게 함으로써 두 Person 객체가 동일한지 확인하는 조건은 이름과 나이 필드가 동일한 경우에만 동일하다고 간주됩니다.

## hashCode()

hashCode() 메서드는 HashMap 및 HashSet과 같은 해쉬 기반 컬렉션에서 사용되는 정수 값을 반환합니다. equals()를 재정의할 때는 동일한 객체가 동일한 해시 코드를 가지도록 hashCode()를 재정의하는 것이 중요합니다.

hashCode()의 일반적인 규약은:

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

- 두 객체가 equals(Object) 메소드에 따라 동일하다면 두 객체 각각에 대해 hashCode() 메소드를 호출하면 동일한 정수 결과가 나와야 합니다.
- 두 객체가 equals(Object) 메소드에 따라 다르다면 두 객체 각각에 대해 hashCode() 메소드를 호출하더라도 서로 다른 정수 결과가 나와야 하는 것은 필수적이지 않습니다. 그러나 다른 객체에 대해 서로 다른 정수 결과를 만드는 것이 해시 기반 컬렉션의 성능을 향상시킬 수 있다는 점을 개발자는 인식해야 합니다.

hashCode()를 오버라이드하는 예시를 살펴보겠습니다:

```java
import java.util.Objects;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    public static void main(String[] args) {
        Person person1 = new Person("Kaitlyn", 30);
        Person person2 = new Person("Kaitlyn", 30);
        System.out.println(person1.equals(person2)); // true
        System.out.println(person1.hashCode() == person2.hashCode()); // true
    }
}
```

equals()와 hashCode()를 모두 오버라이드 함으로써, HashMap 및 HashSet와 같은 해싱에 의존하는 컬렉션에서 객체가 올바르게 관리되도록 보장할 수 있습니다. 이는 이러한 컬렉션의 무결성과 성능을 유지하는 데 매우 중요합니다.

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

# 적절한 사용 시나리오

toString(), equals(), hashCode() 메서드를 언제 어떻게 효과적으로 사용해야 하는지 이해하면 Java 애플리케이션의 기능성과 유지 보수성을 향상시킬 수 있습니다. 이러한 메서드를 적절하게 오버라이드해야 하는 중요한 시나리오를 살펴보겠습니다.

## toString()

- 로깅 및 디버깅: toString() 메서드를 오버라이드하면 객체의 상태를 더 읽기 쉬운 형태로 제공하여 로깅 및 디버깅에 매우 유용합니다. 일반적인 클래스 이름과 해시 코드 대신 문제를 빨리 식별하는 데 도움이 되는 의미 있는 정보가 표시됩니다.
- UI 표현: 사용자 인터페이스에서 객체 정보를 표시할 때, 잘 구현된 toString() 메서드는 표시된 데이터가 명확하고 정보를 제공함을 보장합니다. 이는 객체에 대한 이해할 수 있는 세부 정보를 제공하여 사용자 경험을 향상시킬 수 있습니다.

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

예시:

```js
public class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}
```

위의 toString() 구현을 사용하면 제품 객체를 로깅하거나 표시할 때 이름과 가격이 표시되어 객체의 상태를 이해하기 쉬워집니다.

## equals() 및 hashCode()

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

- 컬렉션: HashSet, HashMap 및 Hashtable과 같은 컬렉션을 사용할 때 equals() 및 hashCode()를 올바르게 재정의하는 것이 매우 중요합니다. 이러한 컬렉션은 객체 동등성을 결정하고 해시 기반 저장 및 검색을 효율적으로 관리하기 위해 이러한 메서드에 의존합니다.
- 비즈니스 로직: equals()를 구현하면 객체를 메모리 주소가 아닌 데이터를 기반으로 비교할 수 있어서 객체 동일성이 내용을 기반으로 하는 비즈니스 로직에 종종 필요합니다. 이렇게 함으로써 비교가 의미 있고 정확해집니다.
- 데이터베이스 엔티티: Hibernate와 같은 ORM 프레임워크를 사용할 때 equals()와 hashCode()를 올바르게 재정의하면 엔티티가 올바르게 식별되고 관리되도록 할 수 있습니다. 이는 지속성 레이어의 정확한 기능을 위해 필수적입니다.

예시:

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Person> people = new HashSet<>();
        Person person1 = new Person("Kaitlyn", 30);
        Person person2 = new Person("Kaitlyn", 30);
        Person person3 = new Person("Alex", 29);

        people.add(person1);
        people.add(person2); // 중복이므로 추가되지 않습니다.
        people.add(person3);

        for (Person person : people) {
            System.out.println(person);
        }
    }
}
```

위 예시에서는 HashSet를 사용하여 Person 객체를 저장합니다. equals()와 hashCode() 메서드를 사용하여 person2가 person1과 같은 것으로 간주되어 세트에 추가되지 않도록 합니다. 이는 이러한 메서드가 중복 항목을 방지하여 컬렉션의 무결성을 유지하는 데 어떻게 도움이 되는지 보여줍니다.

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

# 결론

우리는 Java의 toString(), equals(), 그리고 hashCode() 메서드의 중요성과 사용법을 탐구했습니다. 이러한 메서드들은 객체 비교, 해싱, 그리고 디버깅에 근본적인 역할을 합니다. 기본 구현을 이해하고 사용자 정의하는 방법을 배우면, 더 효과적이고 유지보수가 쉬운 Java 응용 프로그램을 만들 수 있습니다. 이러한 메서드를 적절히 오버라이딩하면, 객체가 컬렉션 및 기타 시나리오에서 올바르게 작동하고 코드의 기능성과 신뢰성을 향상시킬 수 있습니다.

- Java Documentation — toString() 메서드
- Java Documentation — equals() 메서드
- Java Documentation — hashCode() 메서드
- Oracle’s Java Tutorials — 메서드 오버라이딩

독해해 주셔서 감사합니다! 만약 이 안내서가 도움이 되었다면, 하이라이팅, 박수, 응답 또는 Twitter/X에서 저와 연락하는 것도 매우 감사하며, 이와 같은 콘텐츠를 무료로 유지할 수 있도록 도와줍니다!
