---
title: "정말 자바에서 직렬화Serialization를 사용하고 싶으신가요 자바 직렬화의 문제점들"
description: ""
coverImage: "/assets/img/2024-07-09-AreYouSureYouWanttoSerializeinJavaJavaSerializationProblems_0.png"
date: 2024-07-09 21:06
ogImage:
  url: /assets/img/2024-07-09-AreYouSureYouWanttoSerializeinJavaJavaSerializationProblems_0.png
tag: Tech
originalTitle: "Are You Sure You Want to Serialize in Java? Java Serialization Problems"
link: "https://medium.com/techkoala-insights/are-you-sure-you-want-to-serialize-in-java-java-serialization-problems-1b5db3302a03"
isUpdated: true
---

![Serialization in Java](/assets/img/2024-07-09-AreYouSureYouWanttoSerializeinJavaJavaSerializationProblems_0.png)

자바에서 Serialization은 객체를 바이트 스트림으로 변환하는 방법입니다. 이를 통해 객체를 쉽게 파일에 저장하거나 다른 기계로 네트워크를 통해 전송할 수 있습니다. 객체를 직렬화하면 본질적으로 해당 객체의 상태를 인코딩하는 것입니다. 나중에 이를 역직렬화하여 바이트 스트림에서 객체를 재생성할 수 있습니다.

직렬화는 소지품을 상자에 담는 것과 같다고 생각해보세요. 각 항목을 주의 깊게 포장하여 상자에 넣고 봉인하여 발송합니다. 상자가 도착하면 수취인이 개봉하고 모든 항목이 원래 상태로 복원됩니다.

자바는 Serializable 인터페이스를 통해 직렬화를 쉽게 만들어줍니다. 이 인터페이스를 구현하기만 하면 클래스가 직렬화될 수 있는 능력이 갖춰집니다. 여기에 간단한 예시가 있습니다:

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
import java.io.Serializable;

public class Person implements Serializable {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + '}';
    }
}
```

이 예제에서 Person은 Serializable을 구현했기 때문에 직렬화할 수 있는 클래스입니다. 이제 Person의 인스턴스를 직렬화하고 나중에 다시 역직렬화하여 동일한 인스턴스를 얻을 수 있습니다.

직렬화는 매우 유용합니다. 예를 들어, 객체의 상태를 파일에 저장하고 나중에 복원하거나 분산 애플리케이션에서 한 기계에서 다른 기계로 객체를 전송하는 등이 가능합니다. 간단하고 강력해 보이지만, 다음 섹션에서 알아볼 것처럼 Java의 직렬화에는 중요한 리스크와 도전 과제가 있습니다.

# 큰 문제: 보안

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

자바 직렬화의 가장 큰 문제 중 하나는 보안입니다. 객체를 역직렬화할 때, 읽히는 데이터가 안전하다고 믿습니다. 그러나 역직렬화는 공격자가 시스템에 임의의 코드를 실행할 수 있게 악용할 수 있습니다. 이는 역직렬화 프로세스가 원래 코드에서 의도하지 않은 방식으로 메서드를 호출할 수 있기 때문입니다.

중요한 보안 관련 문제 중 하나는 신뢰할 수 없는 데이터의 역직렬화입니다. 알 수 없는 또는 신뢰할 수 없는 소스에서 데이터를 역직렬화하는 경우, 애플리케이션을 잠재적인 공격으로 노출시킬 수 있습니다. 예를 들어, 공격자는 악의적인 코드를 실행하는 직렬화된 바이트 스트림을 작성할 수 있습니다.

직렬화의 공격 표면은 매우 넓습니다. 역직렬화되는 모든 클래스는 공격 표면의 일부이며, 모든 직렬화 가능한 클래스가 올바르게 처리되지 않으면 잠재적으로 악용될 수 있습니다. 특히 많은 종속성이 있는 대규모 애플리케이션에서 직렬화된 객체를 보호하는 것은 굉장히 어렵습니다.

보안 연구원들은 일반 라이브러리와 응용 프로그램에서 안전하지 않은 역직렬화 방법으로 인해 여러 취약점을 발견했습니다. 이러한 취약점은 원격 코드 실행(RCE), 서비스 거부(DoS) 공격 및 기타 악용으로 이어질 수 있습니다. 예를 들어, 역직렬화 취약점을 악용하면 공격자가 여러 클래스에서 메서드를 연결하여 악의적인 작업을 수행할 수 있는 payload를 작성할 수 있습니다.

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

위험성을 감안할 때, 직렬화를 사용할 때 특히 주의해야 합니다. 특히 믿을 수 없는 소스에서 데이터를 가져올 때 더욱 조심해야 합니다. 믿을 수 없는 데이터의 역직렬화를 피하는 것은 기본적인 보안 조치입니다. 그러나 이러한 위험을 최소화하기 위한 안전한 대안 및 모범 사례가 있습니다. 이에 대해 다음 섹션에서 알아보겠습니다.

# 직렬화 폭탄

직렬화 폭탄은 공격자가 대량의 자원을 사용하는 직렬화된 객체를 작성하는 특히 나쁜 유형의 공격입니다. 이러한 공격은 메모리, CPU 시간 또는 기타 자원을 소모하여 응용 프로그램 또는 서버를 효과적으로 다운시킬 수 있습니다.

직렬화 폭탄의 고전적인 예는 역직렬화 중에 기하급수적으로 확장되는 중첩된 데이터 구조입니다. 예를 들어, 작은 직렬화된 스트림이 역직렬화될 때 대량의 객체를 생성할 수 있으며, 이는 메모리 부족 오류 또는 과도한 CPU 사용량으로 이어질 수 있습니다.

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

아래는 중첩된 HashSet 객체를 사용한 직렬화 폭탄의 예제입니다:

```java
import java.io.*;
import java.util.HashSet;
import java.util.Set;

public class SerializationBomb {

    public static byte[] createBomb() throws IOException {
        Set<Object> root = new HashSet<>();
        Set<Object> s1 = root;
        Set<Object> s2 = new HashSet<>();

        for (int i = 0; i < 100; i++) {
            Set<Object> t1 = new HashSet<>();
            Set<Object> t2 = new HashSet<>();
            t1.add("foo"); // t1과 t2가 다르게 만듭니다
            s1.add(t1);
            s1.add(t2);
            s2.add(t1);
            s2.add(t2);
            s1 = t1;
            s2 = t2;
        }

        return serialize(root);
    }

    public static byte[] serialize(Object obj) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(obj);
        return baos.toByteArray();
    }

    public static void main(String[] args) {
        try {
            byte[] bomb = createBomb();

            // 폭탄을 역직렬화합니다
            ByteArrayInputStream bais = new ByteArrayInputStream(bomb);
            ObjectInputStream ois = new ObjectInputStream(bais);
            Object obj = ois.readObject();
            ois.close();

            System.out.println("역직렬화된 객체: " + obj);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 코드에서 createBomb 메서드는 깊게 중첩된 HashSet 구조를 생성합니다. 결과 바이트 배열을 역직렬화하면, 프로그램이 막대한 자원을 사용하게 됩니다. 직렬화된 형식은 비교적 작지만, 이를 역직렬화하면 크고 복잡한 객체 그래프가 생성됩니다.

이 폭탄을 역직렬화하면 프로그램이 전체 중첩된 구조를 다시 구축하려고 하므로 높은 CPU 및 메모리 소비가 발생합니다. 이로 인해 시스템이 응답하지 못하게 되어 서비스 거부 공격을 쉽게 유발할 수 있습니다.

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

직렬화 폭탄은 탐지와 완화가 어려울 수 있어 특히 위험합니다. 이들은 종종 간과되곤 하는 역직렬화 프로세스의 복잡성과 자원 사용을 이용합니다. 이러한 공격에 대비하기 위해서는 역직렬화 필터를 사용하고 가능한한 신뢰할 수 없는 소스에서 데이터를 역직렬화 하는 것을 피하는 것이 중요합니다.

직렬화 폭탄과 그 잠재적인 영향을 이해함으로써 개발자들은 자신들의 애플리케이션이 이러한 유형의 공격에 대해 강건하게 대처할 수 있는 조치를 취할 수 있습니다. 이어지는 섹션에서는 자바 직렬화에 대한 안전한 대안과 이러한 위험을 완화하는 데 가장 좋은 실천 방법을 탐색해보겠습니다.

# 자바 직렬화에 대한 더 안전한 대안

자바 직렬화의 보안 위험과 함정을 고려할 때, 더 안전한 대안을 찾는 것이 현명할 수 있습니다. 몇 가지 방법은 더 안전하고 유연한 방법으로 객체를 직렬화하고 역직렬화할 수 있도록 제공됩니다. 이러한 대안들은 자바의 기본 직렬화와 관련된 위험을 완화뿐만 아니라 더 나은 성능과 여러 플랫폼 간 호환성과 같은 추가 혜택을 제공합니다.

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

인기 있는 대안 중 하나는 직렬화에 JSON을 사용하는 것입니다. JSON은 가벼운 데이터 교환 형식으로, 사람이 쉽게 읽고 쓸 수 있으며 기계가 쉽게 구문 분석하고 생성할 수 있습니다. Jackson 및 Gson과 같은 라이브러리는 Java 객체를 JSON으로 변환하거나 그 반대로 변환하는 데 자주 사용됩니다.

다음은 Jackson을 사용한 간단한 예제입니다:

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class JsonExample {

    public static class Person {
        private String name;
        private int age;

        // Jackson을 위해 필요한 기본 생성자
        public Person() {}

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + '}';
        }
    }

    public static void main(String[] args) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // 객체를 JSON으로 직렬화
            Person person = new Person("Alice", 30);
            String jsonString = objectMapper.writeValueAsString(person);
            System.out.println("직렬화된 JSON: " + jsonString);

            // JSON을 객체로 역직렬화
            Person deserializedPerson = objectMapper.readValue(jsonString, Person.class);
            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

이 예제에서 Person 클래스는 JSON 문자열로 직렬화되고 그런 다음 Jackson을 사용하여 다시 Person 객체로 역직렬화됩니다. JSON 직렬화는 Java의 기본 직렬화 메커니즘에 의존하지 않고 관련된 위험을 피할 수 있기 때문에 덜 위험합니다.

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

또 다른 강력한 대안은 Protocol Buffers (protobuf)입니다. 이는 구글이 개발한 언어 및 플랫폼과 무관한 구조화된 데이터 직렬화 메커니즘으로, protobuf는 압축된 형식으로 빠르고 안정적인 직렬화를 제공합니다.

protobuf를 사용한 간단한 예시를 살펴보겠습니다:

.proto 파일에서 데이터 구조를 정의하세요:

```js
syntax = "proto3";

message Person {
  string name = 1;
  int32 age = 2;
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

protobuf 컴파일러를 사용하여 .proto 파일에서 Java 클래스를 생성하세요.

생성된 클래스를 사용하여 직렬화 및 역직렬화하세요:

```js
import com.example.PersonOuterClass.Person;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ProtobufExample {

    public static void main(String[] args) {
        try {
            // 객체를 protobuf로 직렬화
            Person person = Person.newBuilder().setName("Bob").setAge(25).build();
            FileOutputStream fos = new FileOutputStream("person.ser");
            person.writeTo(fos);
            fos.close();

            // protobuf에서 객체 역직렬화
            FileInputStream fis = new FileInputStream("person.ser");
            Person deserializedPerson = Person.parseFrom(fis);
            fis.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

이 protobuf 예제에서는 .proto 파일에서 Person 메시지를 정의하고 Java 클래스를 생성한 다음 Person 객체를 직렬화 및 역직렬화합니다. Protobuf은 Java 직렬화보다 더 효율적이고 오류가 적습니다.

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

이러한 대안을 사용하면 직렬화 프로세스를 더 잘 제어할 수 있고 보안 위험을 줄이며 다른 시스템과의 상호 운용성을 개선할 수 있습니다. 다음 섹션에서는 크로스 플랫폼 데이터 표현에 대해 자세히 살펴보고 해당 데이터가 응용 프로그램의 안전 및 기능성을 향상시키는 방법을 알아볼 것입니다.

# 크로스 플랫폼 데이터 표현

JSON 및 Protocol Buffers와 같은 크로스 플랫폼 데이터 표현은 Java 직렬화보다 보안, 성능 및 상호 운용성 측면에서 상당한 이점을 제공합니다. 이러한 형식은 서로 다른 프로그래밍 언어 및 플랫폼 간에 원활하게 작동하도록 설계되어 분산 시스템 및 웹 서비스에 이상적입니다.

JSON(JavaScript Object Notation)

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

JSON은 인간이 쉽게 읽고 쓸 수 있으며 기계가 쉽게 구문 분석하고 생성할 수 있는 가벼운 데이터 교환 형식입니다. 이는 언어에 독립적이며 웹 개발에서 클라이언트와 서버 간 데이터를 교환하는 데 널리 사용됩니다. JSON의 간결함과 유연성은 직렬화를 위한 인기 있는 선택 사항으로 만듭니다.

다음은 Gson을 사용하여 JSON 직렬화 및 역직렬화하는 예시입니다:

```java
import com.google.gson.Gson;

public class JsonExample {

    public static class Person {
        private String name;
        private int age;

        public Person() {}

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + '}';
        }
    }

    public static void main(String[] args) {
        Gson gson = new Gson();

        // Serialize object to JSON
        Person person = new Person("Alice", 30);
        String jsonString = gson.toJson(person);
        System.out.println("Serialized JSON: " + jsonString);

        // Deserialize JSON to object
        Person deserializedPerson = gson.fromJson(jsonString, Person.class);
        System.out.println("Deserialized object: " + deserializedPerson);
    }
}
```

이 예시에서는 Gson을 사용하여 Person 객체를 JSON 문자열로 변환하고 다시 Person 객체로 변환했습니다. JSON의 텍스트 기반 형식은 가독성이 좋아 직렬화된 데이터를 디버깅하고 로깅하기 쉽습니다.

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

프로토콜 버퍼 (protobuf)

프로토콜 버퍼는 구글에서 개발된 언어 및 플랫폼에 중립적인 구조화된 데이터를 직렬화하는 메커니즘입니다. Protobuf는 크기와 속도 측면에서 효율적이며 고성능 응용 프로그램에 적합합니다. 데이터 구조를 정의하기 위해 스키마를 사용하며 데이터의 구조를 정의하고 일관성과 역 하위 호환성을 보장합니다.

프로토콜 버퍼 사용 방법은 다음과 같습니다:

.proto 파일에 데이터 구조 정의하기:

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
syntax = "proto3";

message Person {
  string name = 1;
  int32 age = 2;
}
```

protobuf 컴파일러를 사용하여 .proto 파일에서 Java 클래스를 생성합니다.

생성된 클래스를 사용하여 데이터를 직렬화하고 역직렬화합니다.

```java
import com.example.PersonOuterClass.Person;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ProtobufExample {

    public static void main(String[] args) {
        try {
            // 객체를 protobuf로 직렬화
            Person person = Person.newBuilder().setName("Bob").setAge(25).build();
            FileOutputStream fos = new FileOutputStream("person.ser");
            person.writeTo(fos);
            fos.close();

            // protobuf에서 객체를 역직렬화
            FileInputStream fis = new FileInputStream("person.ser");
            Person deserializedPerson = Person.parseFrom(fis);
            fis.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException e) {
            e.printStackTrace();
        }
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

이 예에서는 .proto 파일에서 Person 메시지를 정의하고 Java 클래스를 생성하도록 컴파일한 다음 이러한 클래스를 사용하여 Person 객체를 직렬화하고 역직렬화하는 방법을 보여줍니다. Protobuf의 이진 형식은 간결하고 효율적이며 고성능 애플리케이션에 이상적입니다.

JSON과 Protocol Buffers 모두 자바의 기본 직렬화와 비교하여 데이터를 직렬화하고 역직렬화하는 보다 안전하고 효율적인 방법을 제공합니다. 이들은 서로 다른 플랫폼과 언어 간의 데이터 교환을 지원하여 애플리케이션의 유연성과 견고성을 향상시킵니다. 다음 섹션에서는 신뢰할 수 없는 데이터의 역직렬화를 피하는 중요성과 따라야 하는 모범 사례에 대해 논의할 것입니다.

# 신뢰할 수 없는 데이터의 역직렬화 피하기

직렬화 중 가장 중요한 보안 관행 중 하나는 신뢰할 수 없는 출처에서 데이터의 역직렬화를 피하는 것입니다. 신뢰할 수 없는 데이터의 역직렬화는 원격 코드 실행, 서비스 거부 및 데이터 조작을 포함한 다양한 공격에 애플리케이션을 노출시킬 수 있습니다. 이러한 위험을 완화하기 위해, 모범 사례를 따르고 방어적 프로그래밍 기법을 사용하는 것이 중요합니다.

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

먼저, 신뢰할 수 없는 또는 알 수 없는 소스로부터 직렬화된 데이터를 절대로 받지 마십시오. 이것은 역직렬화 취약점을 방지하는 가장 간단하고 효과적인 방법입니다. 어플리케이션이 외부 소스에서 데이터를 역직렬화해야 하는 경우, 해당 소스가 완전히 점검되고 신뢰할 수 있는지 확인하십시오.

신뢰할 수 없는 데이터의 역직렬화를 피할 수 없는 상황에서는, Java에서 위험을 줄이는 몇 가지 메커니즘을 제공합니다. 이 중 하나는 ObjectInputFilter를 사용하는 것인데, 이를 통해 허용되는 객체 유형을 정의할 수 있습니다.

다음은 ObjectInputFilter를 사용한 예시입니다:

```java
import java.io.*;

public class DeserializationFilterExample {

    public static class Person implements Serializable {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + '}';
        }
    }

    public static void main(String[] args) {
        try {
            // 객체 직렬화
            Person person = new Person("Alice", 30);
            FileOutputStream fos = new FileOutputStream("person.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();

            // 역직렬화 필터 설정
            ObjectInputFilter filter = info -> {
                if (info.serialClass() != null && info.serialClass() != Person.class) {
                    return ObjectInputFilter.Status.REJECTED;
                }
                return ObjectInputFilter.Status.ALLOWED;
            };

            // 필터와 함께 객체 역직렬화
            FileInputStream fis = new FileInputStream("person.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            ois.setObjectInputFilter(filter);
            Person deserializedPerson = (Person) ois.readObject();
            ois.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
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

이 예제에서 ObjectInputFilter는 Person 객체의 역직렬화만 허용하도록 설정되어 있습니다. 다른 유형의 객체를 역직렬화하려는 시도는 거부되며 악의적인 코드 실행 가능성이 줄어듭니다.

또다른 모법 사례는 이전 섹션에서 설명한 것처럼 JSON 또는 프로토콜 버퍼와 같은 안전한 직렬화 방법을 지원하는 라이브러리를 사용하는 것입니다. 이러한 형식들은 Java의 기본 직렬화 메커니즘에 의존하지 않으므로 같은 취약점을 가지지 않습니다.

애플리케이션이 데이터를 역직렬화해야 하는 경우 흑명단을 사용하는 대신 화이트리스트를 고려해보세요. 화이트리스트는 역직렬화가 허용되는 정확한 클래스를 지정하는 것을 포함하며, 흑명단은 역직렬화되지 말아야 하는 클래스를 지정하는 것을 포함합니다. 화이트리스트는 보통 알려진, 신뢰할 수 있는 클래스만 허용하기 때문에 일반적으로 더 안전합니다.

다음은 기본적인 화이트리스팅 접근 방식을 구현하는 방법입니다:

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
import java.io.*;
import java.util.HashSet;
import java.util.Set;

public class DeserializationWhitelistExample {

    public static class Person implements Serializable {
        private String name;
        private int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "Person{name='" + name + "', age=" + age + '}';
        }
    }

    public static void main(String[] args) {
        try {
            // 객체 직렬화
            Person person = new Person("Bob", 25);
            FileOutputStream fos = new FileOutputStream("person.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();

            // 화이트리스트 설정
            Set<Class<?>> allowedClasses = new HashSet<>();
            allowedClasses.add(Person.class);

            // 화이트리스트 검사를 통한 객체 역직렬화
            FileInputStream fis = new FileInputStream("person.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            Class<?> objectClass = ois.readObject().getClass();
            if (!allowedClasses.contains(objectClass)) {
                throw new InvalidObjectException("Unauthorized deserialization attempt: " + objectClass.getName());
            }
            Person deserializedPerson = (Person) ois.readObject();
            ois.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 코드에서는 화이트리스트를 사용하여 역직렬화 중인 객체의 클래스를 확인합니다. 클래스가 화이트리스트에 없는 경우 예외가 throw되어 무단 역직렬화를 방지합니다.

신뢰할 수 없는 데이터의 역직렬화를 피하고 필터와 화이트리스트와 같은 엄격한 제어를 구현함으로써 응용 프로그램의 보안성을 현저히 향상시킬 수 있습니다. 다음 섹션에서는 안전한 시리얼라이즈 가능한 클래스를 생성하는 방법을 설명하겠습니다. 여기서는 보안 및 무결성을 보장하기 위한 기법과 모범 사례에 중점을 둘 것입니다.

# 안전한 시리얼라이즈 가능한 클래스 생성하기

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

자바에서 클래스를 직렬화할 때는 보안과 유지보수를 위해 최선의 방법을 따르는 것이 중요합니다. 안전한 직렬화 가능한 클래스를 만드는 데는 주의 깊게 클래스를 설계하고 직렬화된 형태를 제어하며 필요한 검사와 균형을 구현하는 것이 핵심입니다.

먼저, 복잡한 객체에 대해 기본 직렬화 메커니즘을 사용하는 것은 피하세요. 대신 writeObject 및 readObject 메서드를 구현하여 사용자 정의 직렬화 형태를 정의하세요. 이 접근 방식을 통해 직렬화되고 역직렬화되는 내용을 정확히 제어할 수 있으며 내부 상태와 잠재적인 취약점 노출의 위험을 줄일 수 있습니다.

다음은 사용자 정의 직렬화를 가진 클래스의 예시입니다:

```java
import java.io.*;

public class SafePerson implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private transient int age; // 직렬화에서 제외하기 위해 transient로 표시

    public SafePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject(); // 기본 필드를 직렬화
        oos.writeInt(age); // transient 필드를 수동으로 직렬화
    }

    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject(); // 기본 필드 역직렬화
        age = ois.readInt(); // transient 필드를 수동으로 역직렬화
    }

    @Override
    public String toString() {
        return "SafePerson{name='" + name + "', age=" + age + '}';
    }

    public static void main(String[] args) {
        try {
            // 객체 직렬화
            SafePerson person = new SafePerson("Charlie", 28);
            FileOutputStream fos = new FileOutputStream("safePerson.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();

            // 객체 역직렬화
            FileInputStream fis = new FileInputStream("safePerson.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            SafePerson deserializedPerson = (SafePerson) ois.readObject();
            ois.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
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

이 예제에서 SafePerson 클래스에는 기본 직렬화에 포함되지 않는 transient age 필드가 있습니다. 대신 writeObject 및 readObject 메서드가 age 필드의 직렬화 및 역직렬화를 수동으로 처리하여 필요한 데이터만 직렬화되도록 합니다.

또 다른 중요한 측면은 역직렬화 중 객체의 상태를 유효성 검사하는 것입니다. readObject 메서드에 유효성 검사를 추가하여 잘못된 객체의 생성을 방지할 수 있습니다. 이 단계는 응용 프로그램의 무결성과 보안을 유지하는 데 중요합니다.

다음은 유효성 검사가 포함된 예제입니다:

```js
import java.io.*;

public class ValidatedPerson implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;

    public ValidatedPerson(String name, int age) {
        if (name == null || name.isEmpty() || age < 0) {
            throw new IllegalArgumentException("Invalid name or age");
        }
        this.name = name;
        this.age = age;
    }

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
    }

    private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        if (name == null || name.isEmpty() || age < 0) {
            throw new InvalidObjectException("Invalid name or age");
        }
    }

    @Override
    public String toString() {
        return "ValidatedPerson{name='" + name + "', age=" + age + '}';
    }

    public static void main(String[] args) {
        try {
            // Serialize the object
            ValidatedPerson person = new ValidatedPerson("Diana", 22);
            FileOutputStream fos = new FileOutputStream("validatedPerson.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();

            // Deserialize the object
            FileInputStream fis = new FileInputStream("validatedPerson.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            ValidatedPerson deserializedPerson = (ValidatedPerson) ois.readObject();
            ois.close();

            System.out.println("Deserialized object: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
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

이 예시에서 ValidatedPerson 클래스는 생성 중 및 역직렬화 후에 상태가 유효한지 확인합니다. readObject 메서드는 name과 age 필드의 무결성을 확인하고 유효하지 않을 경우 InvalidObjectException을 throw합니다.

이러한 실천 방법을 구현하면 보안 취약점을 방지하고 직렬화된 클래스가 견고하고 신뢰할 수 있도록 할 수 있습니다. 다음 섹션에서는 인스턴스 제어와 readResolve 메서드 사용을 통해 역직렬화 중에 싱글톤 속성을 유지하는 방법을 살펴보겠습니다.

# 인스턴스 제어와 readResolve 메서드

일부 경우에는 싱글톤 또는 다른 인스턴스 제어된 클래스를 구현할 때 역직렬화가 클래스의 새 인스턴스를 생성하지 않도록 해야 합니다. 대신 역직렬화는 원래 직렬화된 같은 인스턴스를 반환해야 합니다. 이는 readResolve 메서드를 사용하여 달성할 수 있습니다.

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

readResolve 메서드를 사용하면 역직렬화 프로세스 중에 역질렬화된 객체를 다른 객체로 교체할 수 있습니다. 이는 클래스의 싱글톤 속성을 유지하는 데 유용합니다. 객체가 역직렬화될 때 readResolve 메서드가 호출되며, 새로 역직렬화된 객체 대신 사용해야 할 인스턴스를 반환합니다.

다음은 싱글톤 클래스에서 readResolve를 사용하는 방법을 보여주는 예시입니다:

```java
import java.io.*;

public class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Singleton INSTANCE = new Singleton();

    private Singleton() {
        // 인스턴스 생성 방지를 위한 비공개 생성자
    }

    public static Singleton getInstance() {
        return INSTANCE;
    }

    // readResolve를 구현하여 싱글톤 인스턴스를 반환합니다
    private Object readResolve() throws ObjectStreamException {
        return INSTANCE;
    }

    @Override
    public String toString() {
        return "Singleton instance";
    }

    public static void main(String[] args) {
        try {
            // 싱글톤 인스턴스 직렬화
            Singleton instance1 = Singleton.getInstance();
            FileOutputStream fos = new FileOutputStream("singleton.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(instance1);
            oos.close();

            // 싱글톤 인스턴스 역직렬화
            FileInputStream fis = new FileInputStream("singleton.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            Singleton instance2 = (Singleton) ois.readObject();
            ois.close();

            // 두 인스턴스가 동일한지 확인
            System.out.println("Instance 1: " + instance1);
            System.out.println("Instance 2: " + instance2);
            System.out.println("Same instance: " + (instance1 == instance2));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 예시에서 Singleton 클래스는 한 인스턴스만 존재하도록 보장합니다. readResolve 메서드는 인스턴스를 역직렬화할 때 동일한 INSTANCE를 반환하여 싱글톤 속성을 유지합니다. 싱글톤을 역직렬화하면 instance1과 instance2가 동일한 인스턴스일 것입니다.

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

readResolve를 사용하는 것은 싱글톤에만 국한되지 않습니다. 이를 사용하여 역직렬화 중 특별한 처리가 필요한 클래스의 인스턴스를 제어할 수도 있습니다. 예를 들어, 재사용해야 하는 인스턴스 캐시가 있는 경우 readResolve를 사용하여 올바른 인스턴스가 반환되도록 할 수 있습니다.

이와 같은 클래스가 데이터베이스 연결을 나타내는 경우를 생각해보십시오. 존재하는 경우 이전에 생성된 인스턴스가 반환되도록 역직렬화를 보장하려면 다음과 같이 할 수 있습니다:

```java
import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class DatabaseConnection implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Map<String, DatabaseConnection> instances = new HashMap<>();

    private String connectionString;

    private DatabaseConnection(String connectionString) {
        this.connectionString = connectionString;
    }

    public static DatabaseConnection getInstance(String connectionString) {
        return instances.computeIfAbsent(connectionString, DatabaseConnection::new);
    }

    private Object readResolve() throws ObjectStreamException {
        return getInstance(connectionString);
    }

    @Override
    public String toString() {
        return "DatabaseConnection{connectionString='" + connectionString + "'}";
    }

    public static void main(String[] args) {
        try {
            // 직렬화된 데이터베이스 연결 인스턴스
            DatabaseConnection conn1 = DatabaseConnection.getInstance("jdbc:mysql://localhost:3306/mydb");
            FileOutputStream fos = new FileOutputStream("dbConnection.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(conn1);
            oos.close();

            // 역직렬화된 데이터베이스 연결 인스턴스
            FileInputStream fis = new FileInputStream("dbConnection.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            DatabaseConnection conn2 = (DatabaseConnection) ois.readObject();
            ois.close();

            // 두 인스턴스가 동일한지 확인
            System.out.println("Connection 1: " + conn1);
            System.out.println("Connection 2: " + conn2);
            System.out.println("Same connection: " + (conn1 == conn2));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 예제에서 DatabaseConnection 클래스는 인스턴스를 관리하는 캐시를 사용합니다. readResolve 메서드를 사용하면 캐시에서 사용 가능한 경우 기존 인스턴스가 반환되어 일관성을 유지하고 중복 인스턴스를 방지할 수 있습니다.

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

readResolve를 구현함으로써 직렬화 중 클래스의 인스턴스를 제어할 수 있어 원하는 인스턴스가 항상 반환되고 객체의 무결성을 유지할 수 있습니다. 다음 섹션에서는 직렬화 프록시 패턴, 직렬화 가능한 클래스의 안전성과 견고성을 향상시키는 강력한 기술에 대해 살펴보겠습니다.

# 직렬화 프록시 패턴

직렬화 프록시 패턴은 직렬화 가능한 클래스의 안전성과 견고성을 향상시키는 강력한 기술입니다. 객체가 자체를 직렬화하고 역직렬화하는 것 대신 별도의 프록시 클래스를 사용하여 직렬화 프로세스를 처리합니다. 이 접근 방식은 직렬화 취약성의 위험을 최소화하고 객체의 불변성을 유지합니다.

직렬화 프록시 패턴의 아이디어는 메인 클래스 내에 직렬화를 위한 프록시 역할을 하는 개인 정적 중첩 클래스를 생성하는 것입니다. 이 프록시 클래스에는 메인 클래스를 재생성하는 데 필요한 데이터만 포함해야 합니다. 직렬화 중에 메인 클래스는 스트림에 이 프록시 클래스의 인스턴스를 작성하고, 역직렬화 중에 프록시 클래스가 메인 클래스 인스턴스를 재구성합니다.

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

간단한 예제를 통해 직렬화 프록시 패턴을 설명해 드리겠습니다:

```java
import java.io.*;

public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 직렬화 프록시 클래스
    private static class SerializationProxy implements Serializable {
        private static final long serialVersionUID = 1L;

        private final String name;
        private final int age;

        SerializationProxy(Person person) {
            this.name = person.name;
            this.age = person.age;
        }

        private Object readResolve() {
            return new Person(name, age);
        }
    }

    private Object writeReplace() {
        return new SerializationProxy(this);
    }

    private void readObject(ObjectInputStream ois) throws InvalidObjectException {
        throw new InvalidObjectException("Proxy required");
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + '}';
    }

    public static void main(String[] args) {
        try {
            // 객체 직렬화
            Person person = new Person("Alice", 30);
            FileOutputStream fos = new FileOutputStream("personProxy.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();

            // 객체 역직렬화
            FileInputStream fis = new FileInputStream("personProxy.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            Person deserializedPerson = (Person) ois.readObject();
            ois.close();

            System.out.println("역직렬화된 객체: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 예제에서 Person 클래스는 직렬화를 처리하기 위한 SerializationProxy 중첩 클래스를 사용합니다. writeReplace 메서드는 프록시 객체가 주 객체 대신 스트림에 작성되도록 보장합니다. 역직렬화 중에 프록시의 readResolve 메서드가 Person 객체를 재구성하여 모든 불변성을 유지합니다.

이 패턴은 여러 가지 이점을 제공합니다:

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

- 캡슐화: 프록시 클래스를 사용하여 직렬화 로직을 캡슐화하여 주 클래스를 더 간단하고 집중된 상태로 유지할 수 있습니다.
- 보안: 프록시 클래스는 역직렬화 중 필요한 유효성 검사와 확인을 수행하여 취약점의 위험을 줄일 수 있습니다.
- 유연성: 주 클래스를 변경하지 않고도 직렬화 로직을 쉽게 수정할 수 있어 유지보수성을 향상시킬 수 있습니다.

직렬화 프록시 패턴은 직렬화 형식 및 역직렬화 프로세스에 엄격한 제어가 필요한 복잡한 객체에 매우 유용합니다. 특히 잠재적으로 신뢰할 수 없는 데이터를 다룰 때 직렬화를 처리하는 견고하고 안전한 방법을 제공합니다.

다음 섹션에서는 Java 직렬화에 대한 논의를 마무리하고, 응용 프로그램에서 직렬화 작업을 수행할 때 기억해야 할 주요 포인트와 권장 사항을 요약하겠습니다.
