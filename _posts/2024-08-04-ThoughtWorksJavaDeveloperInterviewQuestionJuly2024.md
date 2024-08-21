---
title: "ThoughtWorks 자바 개발자 면접 질문 - 2024년 7월"
description: ""
coverImage: "/assets/img/2024-08-04-ThoughtWorksJavaDeveloperInterviewQuestionJuly2024_0.png"
date: 2024-08-04 19:01
ogImage:
  url: /assets/img/2024-08-04-ThoughtWorksJavaDeveloperInterviewQuestionJuly2024_0.png
tag: Tech
originalTitle: "ThoughtWorks Java Developer Interview Question July 2024"
link: "https://medium.com/@rathod-ajay/thoughtworks-java-developer-interview-question-july-2024-726fe48d1721"
isUpdated: true
---

## 안녕하세요 여러분, 제 친구가 나와 공유한 이 자바 기술 라운드 스크립트를 소개합니다. 문제와 가능한 답변을 확인해 보겠습니다. 자바 개발자 인터뷰를 준비 중이라면, 이 스크립트를 살펴보는 것이 더 나은 준비를 도울 것입니다. 함께 살펴봅시다.

앞으로 제 모든 글은 제 개인 블로그에 공개될 예정입니다. 구독해주세요 — htttps://ajayrathod.blog

![이미지](/assets/img/2024-08-04-ThoughtWorksJavaDeveloperInterviewQuestionJuly2024_0.png)

면접관이 코딩 문제로 시작했습니다. 문제는 다음과 같습니다.

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

일반적인 자바 인터뷰에서 문자열 및 배열과 관련된 코딩 문제를 예상할 수 있어요. 이 중에서 자주 묻는 문제 중 하나를 연습해보세요.

## 배열의 각 요소에 대한 다음으로 큰 요소 찾기

다음은 배열의 각 요소에 대한 다음으로 큰 요소를 찾는 Java 코드 예제입니다. 이 문제는 종종 "다음으로 큰 요소" 문제로 언급됩니다. 이 솔루션은 스택을 사용하여 효율적으로 다음으로 큰 요소를 찾습니다:

```java
import java.util.Arrays;
import java.util.Stack;

public class NextGreaterElement {
    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 25, 7, 8};
        int[] result = findNextGreaterElements(arr);

        System.out.println("배열: " + Arrays.toString(arr));
        System.out.println("다음으로 큰 요소: " + Arrays.toString(result));
    }

    public static int[] findNextGreaterElements(int[] arr) {
        int[] result = new int[arr.length];
        Stack<Integer> stack = new Stack<>();

        for (int i = arr.length - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }

        return result;
    }
}
```

### 설명:

**결과 배열 및 스택 초기화**:

- `result` 배열은 각 위치의 다음으로 큰 요소를 저장합니다.
- `stack`은 아직 다음으로 큰 요소를 찾지 못한 요소들을 추적하는데 사용됩니다.

2. **오른쪽에서 왼쪽으로 배열 탐색**:

- 각 요소에 대해, 현재 요소보다 작거나 같은 요소들은 다음으로 큰 요소가 될 수 없기 때문에 스택에서 해당 요소를 팝합니다.

3. **다음으로 큰 요소 할당**:

- 스택이 비어있지 않으면, 현재 요소에 대한 다음으로 큰 요소는 스택의 맨 위에 있는 요소입니다.
- 스택이 비어있으면, 더 큰 요소가 없으므로 `-1`을 할당합니다.

4. **현재 요소를 스택에 푸시**:

- 이렇게 함으로써 현재 요소가 왼쪽의 요소들에 대한 다음으로 큰 요소로 사용될 수 있습니다.

이 솔루션의 시간 복잡도는 \(O(n)\)이며 각 요소가 스택에 최대 한 번씩 푸시 및 팝되기 때문입니다. 공간 복잡도도 \(O(n)\)입니다.

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

## PostgreSQL과 MySQL 데이터베이스의 차이점은 무엇인가요?

- ACID 컴플라이언스: PostgreSQL은 완전히 ACID 컴플라이언트이지만, MySQL의 컴플라이언스는 스토리지 엔진에 따라 다릅니다 (InnoDB는 ACID 컴플라이언트).
- SQL 컴플라이언스: PostgreSQL은 높은 수준의 SQL 컴플라이언트를 가지고 있지만, MySQL은 그렇지 않으며 필수적인 기능을 지원합니다.
- 데이터 타입: PostgreSQL은 JSONB를 포함한 다양한 데이터 타입을 지원합니다. MySQL은 더 적은 유형을 지원하지만 JSON을 포함합니다.
- 성능: PostgreSQL은 복잡한 쿼리와 대규모 데이터셋에서 뛰어나지만, MySQL은 간단하고 읽기 위주의 작업에서 더 빠를 수 있습니다.
- 확장성: PostgreSQL은 사용자 정의 함수와 유형을 지원하는 높은 확장성을 가지고 있지만, MySQL은 그렇지 않습니다.
- 복제: 둘 다 복제를 지원하지만, PostgreSQL은 논리 복제와 같은 고급 기능을 제공합니다.
- 커뮤니티: 둘 다 강력한 커뮤니티 지원을 가지고 있으며, PostgreSQL은 외부 도구가 많이 활용됩니다.
- 라이선스: PostgreSQL은 허용성 있는 라이선스를 사용하고, MySQL은 오라클의 상업적 옵션을 통해 GPL을 사용합니다.
- 인덱싱: PostgreSQL은 고급 인덱싱 기술을 지원하며, MySQL은 기본적인 인덱싱을 지원합니다.
- 외래 키: PostgreSQL에서 완전히 지원되지만, MySQL의 InnoDB 엔진에서는 지원되지만 MyISAM에서는 지원되지 않습니다.

## Java 8의 주요 기능은 무엇인가요?

Java 8에서는 여러 중요한 기능과 개선 사항이 도입되었습니다:

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

- 람다 표현식: 함수를 인수로 전달할 수 있어 함수형 프로그래밍을 가능하게 합니다.
- 스트림 API: map, filter, reduce와 같은 함수형 스타일의 작업을 컬렉션에서 수행할 수 있게 합니다.
- Optional 클래스: null 값을 더 우아하게 처리하여 NullPointerException의 위험을 줄입니다.
- 기본 메서드: 인터페이스의 메서드가 기본 구현을 가질 수 있도록 합니다.
- 함수형 인터페이스: 람다 표현식과 주로 함께 사용되는 단일 추상 메서드가 있는 인터페이스입니다.
- 날짜 및 시간 API: 날짜 및 시간 조작을 위한 새로운 종합적인 API(java.time 패키지)입니다.
- Nashorn JavaScript Engine: 자바 응용 프로그램 내에서 JavaScript 코드를 포함하기 위한 새로운 JavaScript 엔진입니다.
- 메서드 참조: 람다 표현식을 통해 메서드를 호출하는 약식 표기법입니다.
- 타입 어노테이션: 어노테이션에 대한 향상된 지원으로 더 많은 곳에서 사용할 수 있습니다.
- 반복 어노테이션: 동일한 어노테이션을 동일 선언에 여러 번 적용할 수 있습니다.

## Java 17의 기능은 무엇이 있나요?

장기 지원 (LTS) 릴리스인 Java 17은 다음과 같은 여러 가지 새로운 기능과 개선 사항을 도입했습니다:

- Sealed 클래스: 클래스 계층 구조에 대한 제어를 제공하며, 어떤 클래스가 확장 또는 구현될 수 있는지를 제한합니다.
- switch에 대한 Pattern Matching (미리 보기): switch 문을 개선하여 pattern matching을 지원하여 더 강력하고 표현력 있게 만듭니다.
- 레코드: 주로 데이터를 저장하는 데 사용되는 클래스를 선언하는 간소화된 구문을 제공합니다.
- 텍스트 블록: 여러 줄의 문자열 리터럴을 간소화합니다.
- 향상된 switch 표현식: switch를 식으로 사용하여 값을 반환할 수 있습니다.
- 외부 함수 및 메모리 API (Incubator): 자바 힙 외부의 네이티브 코드 및 메모리와 상호 작용을 용이하게 합니다.
- Deprecated API 제거: 오래된, 사용되지 않는 API와 기능을 정리하기 위해 제거되었습니다.
- 기본적으로 강력한 캡슐화: 모듈은 이제 기본적으로 모든 내부 요소를 강력하게 캡슐화합니다.
- 새 macOS 렌더링 파이프라인: Apple Metal API를 사용하여 macOS용 새 렌더링 파이프라인을 도입했습니다.
- Applet API 폐기: Applet API는 향후 릴리스에서 제거 예정이므로 사용이 폐지되었습니다.

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

## Singleton과 불변성(immutability)의 차이는 무엇인가요?

Singleton과 불변성은 소프트웨어 엔지니어링에서 두 가지 다른 디자인 개념입니다. 다음은 주요 차이점입니다:

**Singleton**

- **목적**: 클래스가 하나의 인스턴스만 가지고 그에 대한 전역 접근 지점을 제공합니다.
- **구현**: 일반적으로는 비공개 생성자, 인스턴스를 가져오는 정적 메서드 및 인스턴스를 보유하는 정적 변수를 포함합니다.
- **상태**: 단일 인스턴스는 변할 수 있는 상태를 가질 수 있으며, 즉 인스턴스가 생성된 후에 필드를 변경할 수 있습니다.
- **사용**: 구성 설정, 로깅 또는 연결 풀과 같은 공유 리소스를 관리하는 데 주로 사용됩니다.

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

불변성

- 목적: 객체의 상태가 생성된 후 변경될 수 없도록 보장합니다.
- 구현: 전체 필드를 final로 만들고 setter를 제공하지 않으며 생성자로 전달된 가변 객체가 깊은 복사되도록 하는 것이 일반적입니다.
- 상태: 객체의 상태는 생성 후 고정되고 변경할 수 없습니다.
- 사용: 값 객체, 스레드 안전한 데이터 구조 및 함수형 프로그래밍에 일반적으로 사용됩니다.

요약

- 싱글톤: 잠재적으로 가변 상태를 가진 클래스의 단일 인스턴스에 초점을 맞춥니다.
- 불변성: 객체를 생성한 후에 상태가 변경될 수 없도록 하는 데 중점을 두고 있습니다.

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

## 싱글톤 디자인 패턴을 깨는 방법은?

싱글톤 디자인 패턴을 깨는 방법은 종종 의도하지 않은 상태에서도 여러 가지 방법으로 할 수 있습니다. 일반적인 방법은 다음과 같습니다:

1. 리플렉션

리플렉션을 사용하여 싱글톤 클래스의 비공개 생성자에 접근하여 여러 인스턴스를 생성할 수 있습니다.

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
import java.lang.reflect.Constructor;

public class SingletonBreaker {
    public static void main(String[] args) {
        Singleton instanceOne = Singleton.getInstance();
        Singleton instanceTwo = null;

        try {
            Constructor<Singleton> constructor = Singleton.class.getDeclaredConstructor();
            constructor.setAccessible(true);
            instanceTwo = constructor.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(instanceOne.hashCode());
        System.out.println(instanceTwo.hashCode());
    }
}

class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

2. Serialization and Deserialization

Serialization and deserialization can create a new instance of the Singleton class

```java
import java.io.*;

public class SingletonBreaker {
    public static void main(String[] args) {
        Singleton instanceOne = Singleton.getInstance();
        Singleton instanceTwo = null;

        try (ObjectOutput out = new ObjectOutputStream(new FileOutputStream("singleton.ser"))) {
            out.writeObject(instanceOne);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try (ObjectInput in = new ObjectInputStream(new FileInputStream("singleton.ser"))) {
            instanceTwo = (Singleton) in.readObject();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        System.out.println(instanceOne.hashCode());
        System.out.println(instanceTwo.hashCode());
    }
}

class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    // To prevent creating a new instance during deserialization
    protected Object readResolve() {
        return getInstance();
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

3. 복제

복제는 싱글톤 클래스의 새 인스턴스를 생성할 수 있습니다.

```js
public class SingletonBreaker {
    public static void main(String[] args) {
        Singleton instanceOne = Singleton.getInstance();
        Singleton instanceTwo = null;

        try {
            instanceTwo = (Singleton) instanceOne.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }

        System.out.println(instanceOne.hashCode());
        System.out.println(instanceTwo.hashCode());
    }
}

class Singleton implements Cloneable {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

4. 다중 클래스 로더

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

다른 클래스 로더들은 싱글톤 클래스를 여러 번로드하여 여러 인스턴스를 만들 수 있습니다.

싱글톤 깨지지 않게 하는 방법

이러한 문제를 방지하려면 다음을 할 수 있습니다:

- Singleton을 구현하기 위해 enum을 사용하십시오. 이 방법은 리플렉션, 직렬화 및 복제 문제로부터 안전합니다.
- 직렬화를 위해 readResolve 메서드를 구현합니다.
- CloneNotSupportedException을 던지도록 clone 메서드를 재정의합니다.

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
public enum Singleton {
    INSTANCE;
}
```

Enum을 사용하면 Java에서 Singleton을 구현하는 가장 견고한 방법입니다.

## 데이터 엔진이란 무엇인가요?

데이터 엔진, 종종 데이터베이스 엔진 또는 저장 엔진으로 불리며, 데이터베이스 관리 시스템 (DBMS)이 데이터베이스에서 데이터를 생성, 읽기, 업데이트 및 삭제 (CRUD)하는 데 사용하는 기저 소프트웨어 구성 요소입니다. 데이터가 어떻게 저장, 검색되고 조작되는지 관리하는 역할을 담당합니다.

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

## @Repository와 @Service 주석을 교환하면 무엇이 발생하나요?

무엇이 바뀌나요?

- 기능: 응용 프로그램의 주요 기능은 여전히 작동할 수 있을 것입니다. 두 주석 모두 클래스를 Spring이 관리하는 빈으로 만들기 때문입니다. 그러나 각 주석과 관련된 구체적인 역할과 행동이 손실될 수 있습니다.
- 예외 변환: DAO 클래스에 @Repository 대신 @Service를 주석 처리하면 @Repository가 제공하는 자동 예외 변환 기능이 손실됩니다.
- 의미론: 코드가 의미론적으로 올바르지 않아 다른 개발자가 응용 프로그램의 의도된 디자인 및 아키텍처를 이해하기 어려워질 수 있습니다.
- 모베스트 프랙티스: 모베스트 프랙티스와 관습을 위반하면 유지 보수의 어려움과 앞으로의 잠재적인 버그를 야기할 수 있습니다.

## 함수형 인터페이스(functional interface)란 무엇인가요?

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

자바에서의 함수형 인터페이스(functional interface)는 정확히 하나의 추상 메서드를 포함하는 인터페이스를 말합니다. 여러 개의 default나 static 메서드를 가질 수 있지만, 추상 메서드는 오직 하나여야 합니다. 함수형 인터페이스는 주로 람다 표현식과 메서드 참조를 사용하기 위해 사용됩니다.

주요 요점:

- 단일 추상 메서드: 정확히 하나의 추상 메서드가 있어야 합니다.
- @FunctionalInterface 어노테이션: 선택적이지만 인터페이스가 함수형 인터페이스로 사용되고 있는지를 나타내기 위해 권장됩니다.
- 사용법: 람다 표현식과 메서드 참조를 사용하여 함수형 프로그래밍을 촉진합니다.

```java
@FunctionalInterface
public interface MyFunctionalInterface {
    void execute(); // 단일 추상 메서드

    // Default 메서드
    default void defaultMethod() {
        System.out.println("Default method");
    }

    // Static 메서드
    static void staticMethod() {
        System.out.println("Static method");
    }
}

// 함수형 인터페이스를 사용하여 람다 표현식 사용
MyFunctionalInterface func = () -> System.out.println("실행 중...");
func.execute();
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

## HashMap의 기본 크기는 무엇인가요?

Java에서 HashMap의 기본 초기 용량은 16입니다. 이는 초기 용량을 지정하지 않고 HashMap을 만든 경우 초기 용량이 16 버킷으로 설정된다는 것을 의미합니다.

주요 포인트:

- 초기 용량: 해시 테이블의 버킷 수로, 기본적으로 16으로 설정됩니다.
- 로드 팩터: 기본 로드 팩터는 0.75이며, HashMap은 용량의 75%가 채워지면 크기가 조정됩니다.
- 임계 값: HashMap이 크기를 조정할 때의 지점으로, 초기 용량 _ 로드 팩터 (예: 16 _ 0.75 = 12)로 계산됩니다.

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
import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        // 기본 초기 용량 (16)과 로드 팩터 (0.75)를 갖는 HashMap 생성
        HashMap<String, String> map = new HashMap<>();

        // HashMap에 요소 추가
        map.put("key1", "value1");
        map.put("key2", "value2");

        // HashMap 출력
        System.out.println(map);
    }
}
```

## 로드 팩터란 무엇인가요?

Java에서 HashMap의 기본 초기 용량은 16이며, 기본 로드 팩터는 0.75입니다. 이 구성은 대부분의 사용 사례에 대해 공간과 시간 복잡성 사이의 좋은 균형을 제공하여 메모리 사용과 성능을 조화시킵니다.

## 로드 팩터를 넘어설 때 무슨 일이 벌어질까요?

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

해시맵의 크기가 로드 팩터 임계값을 초과하면 해시맵은 효율적인 성능을 유지하기 위해 자동으로 크기를 조정합니다. 이 과정을 다시해싱이라고 합니다.

크기 조정 단계:

- 새 용량 계산: 새로운 용량은 일반적으로 현재 용량의 두 배입니다.
- 항목 다시 해싱: 모든 기존 항목이 다시 해싱되어 새로운 큰 버킷 배열로 재분배됩니다.

주요 포인트:

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

- 로드 팩터: 기본 로드 팩터는 0.75입니다. 항목 수가 용량 \* 로드 팩터를 초과하면 크기 조정이 발생합니다.
- 임계값: 임계값은 크기 조정이 발생하는 지점으로, 초기 용량 \* 로드 팩터로 계산됩니다.
- 성능 영향: 크기 조정은 모든 기존 항목을 재해싱해야 하므로 비용이 많이 들지만, 이를 통해 HashMap은 미래 작업에 대해 효율적인 성능을 유지할 수 있습니다.

```java
import java.util.HashMap;

public class HashMapResizeExample {
    public static void main(String[] args) {
        // Default initial capacity (16) 및 load factor (0.75)를 가진 HashMap 생성
        HashMap<Integer, String> map = new HashMap<>();

        // HashMap에 요소 추가
        for (int i = 0; i < 20; i++) {
            map.put(i, "Value" + i);
        }

        // HashMap 출력
        System.out.println(map);
    }
}
```

이 예시에서 항목 수가 12(16 \* 0.75)를 초과하면 HashMap은 새로운 용량인 32로 크기를 조정합니다.

# 요약:

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

해시맵의 크기가 로드 팩터 임계값을 초과하면 해시맵은 자체적으로 용량을 두 배로 늘리고 모든 기존 항목을 다시 해싱하여 크기를 조정합니다. 이를 통해 해시맵은 효율적인 성능을 유지하지만 크기 조정 작업 자체는 계산적으로 비용이 많이 듭니다.

# 읽어 주셔서 감사합니다

- 👏 이야기에 박수를 치고 제 팔로우를 눌러주세요 👉
- 📰 제 Medium에서 더 많은 컨텐츠를 읽어보세요 (자바 개발자 면접에 관한 60편의 이야기)

저의 책은 여기서 찾아보실 수 있습니다:

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

- 아마존에서 제공하는 이 책으로 친절한 자바 개발자 면접 가이드를 확인하세요 (킨들북) 그리고 Gumroad에서도 제공됩니다 (PDF 형식).
- Gumroad에서 제공하는 이 책으로 스프링 부트 마이크로서비스 면접을 성공시키는 방법을 확인하세요 (PDF 형식) 그리고 아마존에서도 제공됩니다 (킨들 eBook).
- 🔔 저를 팔로우하세요: LinkedIn | Twitter | Youtube
