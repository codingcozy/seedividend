---
title: "코딩 여정 시작하기 자바 기초 완벽 설명"
description: ""
coverImage: "/assets/img/2024-07-09-KickstartYourCodingJourneyJavaBasicsExplained_0.png"
date: 2024-07-09 09:36
ogImage: 
  url: /assets/img/2024-07-09-KickstartYourCodingJourneyJavaBasicsExplained_0.png
tag: Tech
originalTitle: "Kickstart Your Coding Journey: Java Basics Explained"
link: "https://medium.com/@eniyaask2005/kickstart-your-coding-journey-java-basics-explained-eaa0796bed32"
---


<img src="/assets/img/2024-07-09-KickstartYourCodingJourneyJavaBasicsExplained_0.png" />

# 소개

자바는 다양성, 이식성 및 성능으로 유명한 세계에서 가장 인기 있는 프로그래밍 언어 중 하나입니다. 프로그래밍 여정을 시작하고 싶은 분들이나 기술 세트에 다른 언어를 추가하려는 분들에게 자바는 훌륭한 선택입니다. 이 안내서에서는 개발 환경 설정, 구문 이해 및 첫 번째 프로그램 작성을 포함한 자바의 기본을 다룰 것입니다.

# 자바의 기본 개념 이해:

<div class="content-ad"></div>

# 1. Hello World Program:

프로그램:

```java
public class HelloWorld {
public static void main(String[] args) {
System.out.println("Hello, World!");
}
}
```

- public class HelloWorld: HelloWorld라는 클래스를 정의합니다.
- public static void main(String[] args): 애플리케이션의 진입점인 메인 메서드입니다.
- System.out.println("Hello, World!");: "Hello, World!"를 콘솔에 출력합니다.

<div class="content-ad"></div>

# 2. 클래스와 객체:

- 클래스는 현실 세계 엔티티를 표현하는 새로운 데이터 유형을 정의합니다.
- 객체는 클래스의 인스턴스입니다.

프로그램:

```js
public class Dog {
 String name;
 int age;
}
Dog myDog = new Dog();
myDog.name = "Buddy";
myDog.age = 5;
```

<div class="content-ad"></div>

# 3. 변수와 데이터 유형:

프로그램:

```js
int myNumber = 10;
double myDouble = 5.99;
char myChar = 'A';
boolean myBool = true;
String myString = "Hello";
```

여기에서,

<div class="content-ad"></div>

- myNumber은 값을 10으로 가지는 int 유형의 변수입니다. 이는 계산, 인덱싱 또는 정수가 필요한 작업에 유용합니다.
- myDouble은 값을 5.99로 가지는 double 유형의 변수입니다. 이 유형은 금융 계산이나 과학 연산과 같은 소수점을 포함하는 정밀한 계산에 적합합니다.
- myChar는 문자 'A'를 보유하는 char 유형의 변수입니다. 이 유형은 개별 문자를 저장하는 데 사용되며 Unicode 문자 집합의 모든 문자를 나타낼 수 있습니다.
- myBool은 값을 true로 가지는 boolean 유형의 변수입니다. 이 유형은 if 및 while과 같은 조건문을 사용하여 프로그램 흐름을 제어하는 데 중요합니다.
- myString은 값을 "Hello"로 가지는 String 유형의 변수입니다. 문자열은 텍스트 처리, 메시지 표시 및 사용자 입력 처리에 일반적으로 사용됩니다.

# 4. 자바의 Scanner 클래스:

자바의 Scanner 클래스는 java.util 패키지의 일부이며 int, double 등 원시 유형 및 문자열을 입력받는 데 사용됩니다. 이는 콘솔에서 사용자 입력을 포함한 다양한 소스에서 입력을 읽는 편리한 방법입니다.

프로그램:

<div class="content-ad"></div>

```java
import java.util.Scanner;

public class UserInfo {
    public static void main(String[] args) {
        // 콘솔에서 입력을 읽는 Scanner 객체 생성
        Scanner scanner = new Scanner(System.in);
        
        // 사용자에게 이름을 입력하도록 안내
        System.out.print("이름을 입력하세요: ");
        String name = scanner.nextLine();
        
        // 사용자에게 나이를 입력하도록 안내
        System.out.print("나이를 입력하세요: ");
        int age = scanner.nextInt();
        
        // 입력된 값 출력
        System.out.println("안녕하세요, " + name + "님!");
        System.out.println("당신은 " + age + "살입니다.");
        
        // Scanner 닫기
        scanner.close();
    }
}
``` 

## 5. 반환 값:

자바에서 메서드는 호출자에게 값을 반환할 수 있습니다. 반환 값은 메서드가 호출한 코드로 다시 보내는 데이터입니다.

프로그램:


<div class="content-ad"></div>

```java
public class ReturnExample {
    public static int add(int a, int b) { 
        return a + b; 
    }

    public static void main(String[] args) {
        int result = add(3, 4);
        System.out.println(result);
    }
}
```

- 메소드 선언: add 메소드는 두 개의 정수 a와 b를 받아들여 그들의 합을 반환합니다.
- 반환문: return a + b;는 합계를 호출자에게 보냅니다.
- 메인 메소드:
    - 3과 4를 인자로 사용하여 add 메소드를 호출하고 반환된 값을 result에 저장합니다.
    - System.out.println(result);를 사용하여 결과를 출력합니다.

# 6. 제어문:

# - 'If-Else' 문:

<div class="content-ad"></div>

자바에서는 if-else 문을 사용하여 의사 결정을 내릴 수 있으며, 조건에 따라 특정 코드 블록을 실행할 수 있습니다. 조건이 참 또는 거짓인지를 평가하여 프로그램의 흐름을 제어하는 데 도움이 됩니다. if-else 문이 어떻게 작동하는지 살펴보고 사용 예시를 제공해보겠습니다.

구문:


if (condition) {
    // 조건이 참일 때 실행되는 코드 블록
} else {
    // 조건이 거짓일 때 실행되는 코드 블록
}


프로그램:

<div class="content-ad"></div>

```js
if (myNumber > 5) {
 console.log("5보다 큽니다");
} else {
 console.log("5 이하입니다.");
}
```

# **Else-If 문:**

자바에서 else if 문은 여러 조건을 순차적으로 확인할 수 있게 해줍니다. 이 문은 결정 과정에 두 가지 이상의 가능한 결과가 있는 경우 사용됩니다. Else if 문이 어떻게 작동하는지 살펴보고 사용 예제를 통해 설명해보겠습니다.

구문:

<div class="content-ad"></div>

만약 condition1이 참이면 '
// condition1이 참일 때 실행할 코드 블록
' else if (condition2) '
// condition1이 거짓이고 condition2가 참일 때 실행할 코드 블록
' else '
// condition1과 condition2 둘 다 거짓일 때 실행할 코드 블록
'

프로그램:

```js
public class Grade {
 public static void main(String[] args) {
 int score = 75;
if (score >= 90) {
 System.out.println("Grade: A");
 } else if (score >= 80) {
 System.out.println("Grade: B");
 } else if (score >= 70) {
 System.out.println("Grade: C");
 } else if (score >= 60) {
 System.out.println("Grade: D");
 } else {
 System.out.println("Grade: F");
 }
 }
}
```

# -중첩 If 문:`

<div class="content-ad"></div>

자바에서 중첩된 if 문을 사용하면 한 if 문을 다른 if 문 안에 배치할 수 있습니다. 이것은 여러 조건을 순차적으로 확인해야 할 때 유용하며, 각 조건이 이전 조건에 종속된 경우에 사용됩니다. 중첩된 if 문이 어떻게 작동하는지 살펴보고, 사용 예시를 제공해보겠습니다.

구문:

if (outerCondition) {
    // 바깥 블록 코드
    if (innerCondition) {
        // 안쪽 블록 코드
    }
}

프로그램:

<div class="content-ad"></div>

```java
public class NestedIfExample {
 public static void main(String[] args) {
 int score = 75;
 if (score >= 60) {
 System.out.println("Passed!");
 if (score % 2 == 0) {
 System.out.println("Score is even.");
 } else {
 System.out.println("Score is odd.");
 }
 } else {
 System.out.println("Failed!");
 }
 }
}
```

## 기타 기본 예제가 아래에 첨부되어 있습니다 :

![이미지 1](/assets/img/2024-07-09-KickstartYourCodingJourneyJavaBasicsExplained_1.png)

![이미지 2](/assets/img/2024-07-09-KickstartYourCodingJourneyJavaBasicsExplained_2.png)


<div class="content-ad"></div>

# 결론 :

Java는 소프트웨어 개발에서 다양한 기회를 열어주는 강력하고 널리 사용되는 프로그래밍 언어입니다. 기본 사항을 이해하고 환경을 설정하며 간단한 프로그램을 작성함으로써 Java에 능숙해지는 길을 걸어가고 있습니다. 계속해서 연습하고 더 고급 주제를 탐구하여 지식과 기술을 더욱 깊게 키워보세요.

의견이나 질문이 있으시면 아래 댓글 섹션에서 자유롭게 공유해주세요. 즐거운 코딩되세요!