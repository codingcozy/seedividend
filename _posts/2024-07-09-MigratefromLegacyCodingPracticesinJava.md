---
title: "구식 코딩 관행에서 최신 자바로 전환하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-MigratefromLegacyCodingPracticesinJava_0.png"
date: 2024-07-09 21:36
ogImage: 
  url: /assets/img/2024-07-09-MigratefromLegacyCodingPracticesinJava_0.png
tag: Tech
originalTitle: "Migrate from Legacy Coding Practices in Java"
link: "https://medium.com/@saranganjana/migrate-from-legacy-coding-practices-in-java-9d948d08f5c3"
---


<img src="/assets/img/2024-07-09-MigratefromLegacyCodingPracticesinJava_0.png" />

개발자로서 우리는 종종 코딩을 처리할 때 쉬운 길을 선택하며, 때로는 이미 설정된 코딩 표준을 따르지 않는 실수를 범할 때가 있습니다. 이는 빠른 속도로 일을 처리해야 하는 현대 세계에서 흔한 함정입니다. 작업을 빠르게 끝내는 것이 정확히 처리하는 것을 덮어씌울 수 있기 때문입니다.

Java에서는 레거시 코딩 관행을 피할 수 있도록 도와주는 많은 새로운 추가 기능이 있습니다. 예전 방식이 잘못된 것은 아니지만 종종 구식이며 현대적인 코딩 환경에서 권장되지 않는 것들입니다. 이러한 새로운 기술을 받아들이면 코드 품질을 향상시킬 뿐만 아니라 유지 보수성과 효율성을 보장하여 개발 프로세스를 더 견고하고 미래를 준비할 수 있게 만듭니다. 🚀👨‍💻

본 기사는 개발자들이 하는 일반적인 실수들을 강조하고 있으나, 이러한 점은 논의의 여지가 있습니다. 마찬가지로, 본 기사의 권장 사항 목록도 논쟁의 여지가 있으며 모든 프로젝트에 완벽하게 들어맞지 않을 수 있습니다. 그러나 Java 코딩을 위한 튼튼한 기초와 다양한 모범 사례를 제시합니다.

<div class="content-ad"></div>

이러한 제안을 고려함으로써 코딩 관행을 개선하고 현재 표준에 부합하며 깨끗하고 효율적인 코드를 생성할 수 있습니다. 이 방법은 Java의 변화하는 환경과 더 자세히 함께하고 싶은 사람들에게 특히 유익합니다. 📚✨

![이미지](/assets/img/2024-07-09-MigratefromLegacyCodingPracticesinJava_1.png)

## 1. 텍스트 블록 무시

잘못된 관행: 여러 줄 문자열에 대해 전통적인 문자열 연결을 사용하는 것.

<div class="content-ad"></div>

```js
문자열 html = "<html>\n" +
 "<body>\n" +
 "<p>Hello, World!</p>\n" +
 "</body>\n" +
 "</html>";
```

좋은 예: Java 13 이상에서 여러 줄 문자열에 대한 텍스트 블록 사용하기.

```js
문자열 html = """
 <html>
 <body>
 <p>Hello, World!</p>
 </body>
 </html>
 """;
```

## 2. `instanceof`에 대한 패턴 매칭 활용하지 않기

<div class="content-ad"></div>

나쁜 예: `instanceof` 확인 후 전통적인 형 변환 방식.

```js
if (obj instanceof String) {
 String str = (String) obj;
 System.out.println(str.length());
}
```

좋은 예: `instanceof`에 대한 패턴 매칭 사용 (Java 16+).

```js
if (obj instanceof String str) {
 System.out.println(str.length());
}
```

<div class="content-ad"></div>

## 3. 불변 데이터에서 `Records`를 무시하세요

나쁜 예: 장황한 불변 데이터 클래스를 생성합니다.

```java
public class Person {
  private final String name;
  private final int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }
}
```

좋은 예: 불변 데이터 클래스에 레코드를 사용합니다 (Java 14+).

<div class="content-ad"></div>

```js
public record Person(String name, int age) {}
```

## 4. 의존성 주입 사용하지 않기

나쁜 예: 클래스 내에서 의존성을 하드 코딩하는 것.

```js
public class Service {
 private Repository repository = new Repository();
}
```

<div class="content-ad"></div>

좋은 실천법: Spring Boot와 같은 의존성 주입 프레임워크를 사용하여 종속성을 관리합니다.

```java
public class Service {
 private Repository repository;
 public Service(Repository repository) {
   this.repository = repository;
 }
}
```

## 5. 적절한 예외 처리를 사용하지 않는 것

나쁜 실천법: 일반 예외 사용

<div class="content-ad"></div>

```js
try {
 // code
} catch (Exception e) {
 e.printStackTrace();
}
```

좋은 습관: 구체적인 예외 사용 및 정보 제공

```js
try {
 // code
} catch (FileNotFoundException e) {
 System.out.println(“File not found: “ + e.getMessage());
}
```

## 6. 로깅을 위해 System.out.println 사용하기

<div class="content-ad"></div>

안좋은 방법: System.out.println을 사용하여 로깅하기

좋은 방법: SLF4J나 Log4j와 같은 로깅 프레임워크를 사용하기

```java
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.debug("Debug 메시지");
```

## 7. 설정 값 하드코딩하기

안좋은 방법: 코드에 설정 값을 하드코딩하기

<div class="content-ad"></div>

```js
문자열 dbUrl = “jdbc:mysql://localhost:3306/mydb”;
```

좋은 예: 구성 파일이나 환경 변수를 사용합니다.

```js
문자열 dbUrl = System.getenv(“DB_URL”);
```

## 8. 리소스를 닫지 않는 것

<div class="content-ad"></div>

나쁜 예: 파일 스트림과 같은 리소스를 제대로 닫지 않는 것.

```js
FileInputStream fis = new FileInputStream("file.txt");
```

좋은 예: try-with-resources를 사용하여 리소스가 닫힘을 보장하는 것.

```js
try (FileInputStream fis = new FileInputStream("file.txt")) {
    // 스트림 사용하기
}
```

<div class="content-ad"></div>

## 9. 고정된 상수 세트에 Enums을 사용하지 않는 오류

나쁜 예: 고정된 상수 세트에 문자열이나 정수를 사용하는 것.

```java
public static final int STATUS_ACTIVE = 1;
public static final int STATUS_INACTIVE = 2;
```

좋은 예: 고정된 상수 세트에 Enums를 사용하는 것.

<div class="content-ad"></div>


## 10. 유틸리티 클래스에 정적 메서드 사용하기

나쁜 예: 일반 클래스에서 정적 메서드 사용하기.

```java
public class Utility {
 public static void performAction() {
 // 동작
 }
}
```

<div class="content-ad"></div>

좋은 실천 방법: 비공개 생성자를 가진 유틸리티 클래스 만들기.

```js
public class Utility {
 private Utility() {
 // 인스턴스화 방지를 위한 비공개 생성자
 }
 public static void performAction() {
 // 동작
 }
}
```

[1]