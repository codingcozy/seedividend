---
title: "불변 데이터를 다루는 최신 방법 Java 레코드 도입하기"
description: ""
coverImage: "/assets/img/2024-07-13-EmbracingJavaRecordsAModernApproachtoImmutableData_0.png"
date: 2024-07-13 20:42
ogImage:
  url: /assets/img/2024-07-13-EmbracingJavaRecordsAModernApproachtoImmutableData_0.png
tag: Tech
originalTitle: "Embracing Java Records: A Modern Approach to Immutable Data"
link: "https://medium.com/@MSeidl/embracing-java-records-a-modern-approach-to-immutable-data-bd477a458c73"
isUpdated: true
---

![Java Records](/assets/img/2024-07-13-EmbracingJavaRecordsAModernApproachtoImmutableData_0.png)

자바는 오랜 시간 동안 프로그래밍 언어 중에서 즐겨 사용되어 왔으며 신뢰성, 성능, 그리고 포괄적인 생태계로 유명합니다. 그러나 간단한 데이터 클래스를 생성할 때 특히 번거로운 측면이 있어왔습니다. 이것이 바로 Java 레코드가 등장한 배경입니다. Java 14에서 미리보기 기능으로 도입되었으며 Java 16에서 표준화되었습니다. 이 새로운 기능은 데이터 수송체를 선언하는 간결한 방법을 제공함으로써 번거로움 문제를 해결합니다. 이 글에서는 Java 레코드의 무엇, 왜, 어떻게에 대해 탐구하며, 혜택을 설명하기 위해 실용적인 예제를 살펴볼 것입니다.

## Java 레코드란 무엇인가?

자바에서 레코드는 불변 데이터를 보유하기 위해 설계된 특별한 종류의 클래스입니다. 레코드를 정의하면 Java는 자동으로 다음을 위한 구현을 생성합니다:

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

- 생성자
- 모든 필드에 대한 게터
- equals(), hashCode(), 그리고 toString() 메서드

이 자동화는 많은 보일러플레이트 코드 양을 크게 줄여주어 코드를 보다 간결하고 관리하기 쉽게 만듭니다.

# 레코드의 구문

다음은 Java에서 간단한 레코드를 정의하는 방법입니다:

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
public record Point(int x, int y) {}
```

이 한 줄의 코드로 Java는 두 개의 필드 (x 및 y), 생성자, 게터 (x() 및 y()), 그리고 equals(), hashCode(), 그리고 toString() 메서드를 가진 클래스를 생성합니다.

# 레코드를 사용하는 이유

# 1. 번거로운 코드 줄임

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

전통적인 자바 데이터 보유 클래스는 필드, 생성자, 게터, 세터 및 equals(), hashCode(), toString()과 같은 메서드를 재정의하는 데 여러 줄의 코드가 필요합니다. 레코드는 이러한 과정을 단순화하여 필수 요소로 축소합니다.

# 2. 불변성

레코드의 필드는 암묵적으로 final이므로 객체가 생성된 후에는 수정할 수 없습니다. 이 불변성은 견고하고 스레드 안전한 응용프로그램을 개발하는 데 도움이 됩니다.

# 3. 명확함

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

레코드의 간결한 구문은 코드 가독성을 향상시킵니다. 해당 클래스의 목적이 간단한 데이터 운반자로 동작하는 것임을 즉시 이해할 수 있습니다.

## 4. 패턴 매칭

레코드는 패턴 매칭과 완벽하게 통합되어 스위치 표현식 및 문에서 유용성이 향상됩니다.

## 레코드 사용 시기

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

레코드는 주로 데이터를 운반하는 클래스에 이상적입니다. 일반적인 사용 사례는 다음과 같습니다.

- 데이터 전송 객체 (DTO): 응용 프로그램의 다른 계층 간 데이터 전송을 간소화합니다.
- 구성 설정: 응용 프로그램 설정 또는 구성 매개변수를 보유합니다.
- 키-값 쌍: 값을 명확하고 간결하게 나타냅니다.
- 간단한 도메인 객체: 복잡한 동작이나 변경 가능한 상태가 필요 없는 엔티티를 모델링합니다.

중요한 비즈니스 로직, 복잡한 메서드 또는 변경 가능한 필드를 갖는 클래스의 경우 전통적인 클래스가 더 적절할 수 있습니다.

# 실제 예제

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

# 예제 1: 간단한 레코드 정의 및 사용

2차원 공간의 점을 나타내는 레코드의 기본 예제부터 시작해 보겠습니다:

```js
public record Point(int x, int y) {}

public class Main {
    public static void main(String[] args) {
        Point point = new Point(10, 20);
        System.out.println("x: " + point.x()); // 10 출력
        System.out.println("y: " + point.y()); // 20 출력
        System.out.println(point); // Point[x=10, y=20] 출력
    }
}
```

# 예제 2: 사용자 정의 메서드 추가

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

레코드에는 사용자 지정 메서드를 포함할 수도 있습니다. 예를 들어, 원점으로부터의 거리를 계산하는 메서드를 추가할 수 있습니다.

```js
public record Point(int x, int y) {
    public double distanceFromOrigin() {
        return Math.sqrt(x * x + y * y);
    }
}

public class Main {
    public static void main(String[] args) {
        Point point = new Point(3, 4);
        System.out.println(point.distanceFromOrigin()); // 출력 결과: 5.0
    }
}
```

# 예제 3: toString, equals, hashCode 사용자 정의하기

레코드는 기본 구현을 제공하지만 필요한 경우에는 이를 재정의할 수 있습니다.

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
public record Point(int x, int y) {
    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Point point = new Point(5, 12);
        System.out.println(point); // prints Point(5, 12)
    }
}
```

## 고급 사용법

## 중첩 레코드

레코드는 다른 레코드나 클래스 내에 중첩될 수 있습니다. 이는 복잡한 데이터 구조를 모델링하는 데 유용합니다.

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
public record 직사각형(Point 좌상단, Point 우하단) {}

public class Main {
    public static void main(String[] args) {
        Point 좌상단 = new Point(0, 10);
        Point 우하단 = new Point(10, 0);
        직사각형 직사각형 = new 직사각형(좌상단, 우하단);
        System.out.println(직사각형); // Rectangle[topLeft=Point(0, 10), bottomRight=Point(10, 0)]
    }
}
```

# 레코드와 인터페이스

레코드는 인터페이스를 구현할 수 있으므로 다형성으로 사용할 수 있습니다:

```js
public interface 도형 {
    double 면적();
}

public record 원(double 반지름) implements 도형 {
    @Override
    public double 면적() {
        return Math.PI * 반지름 * 반지름;
    }
}

public class Main {
    public static void main(String[] args) {
        도형 원 = new 원(5);
        System.out.println(원.면적()); // 78.53981633974483 출력
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

# 레코드의 한계

레코드는 강력하지만 몇 가지 제한 사항이 있습니다:

- 불변성: 필드는 최종 상태이며 초기화 후 수정할 수 없습니다.
- 상속 없음: 레코드는 다른 클래스를 확장할 수 없지만 인터페이스를 구현할 수 있습니다.
- 직렬화: 레코드는 직렬화를 위해 특별한 처리가 필요하며, 직렬화 중에 정규 생성자가 호출되어야 합니다.

# 결론

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

자바 레코드는 중요한 향상으로, 미묘한 보일러플레이트로 간단하고 변경할 수 없는 데이터 운반 클래스를 만드는 것이 더 쉬워집니다. 이들은 더 깨끗하고 가독성이 좋은 코드를 촉진하며, 패턴 매칭과 같은 다른 현대적인 자바 기능과 잘 통합됩니다. 간단한 도메인 객체, 구성 설정 또는 데이터 전송 객체를 모델링하는 경우, 레코드는 코드를 간소화하고 유지 관리성을 향상시키는 데 도움이 될 수 있습니다.

아직 자바 레코드를 탐색하지 않았다면, 지금이 시작하기에 좋은 때입니다. 이 현대적인 기능을 받아들이고 더 깔끔하고 간결한 자바 코드를 작성하는 것을 즐기세요. 즐거운 코딩되세요!

# 이 기사가 도움이 되었다면…

만약 이 기사가 도움이 되었다면, 반성의 박수를 👏 를 눌러서 지원을 보여주세요! 당신의 박수는 다른 사람들이 이 기사를 찾게 도와주고 나에게 이와 같은 내용을 더 많이 쓰도록 격려해줍니다.

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

아래에 생각이나 궁금한 점을 자유롭게 남겨주세요. 독자들과 소통하는 것을 즐기고 여러분을 돕겠습니다!

Java, 프로그래밍 Best Practices 및 소프트웨어 개발의 최신 정보에 관한 더 많은 글을 보기 위해 팔로우하지 않으시는 걸 잊지 마세요. 더 많은 통찰력 있는 콘텐츠를 기대해 주세요!

읽어주셔서 감사합니다. 즐겁게 코딩하세요!
