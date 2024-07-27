---
title: "Java 마이크로서비스 탐구 ZEALOUS TECH CORP 인턴십 경험기"
description: ""
coverImage: "/allround-coder.github.io/assets/no-image.jpg"
date: 2024-07-09 09:29
ogImage: 
  url: /allround-coder.github.io/assets/no-image.jpg
tag: Tech
originalTitle: "Exploring Java Microservices: My Internship Journey at ZEALOUS TECH CORP"
link: "https://medium.com/@bharathiselvakumar286/exploring-java-microservices-my-internship-journey-at-zealous-tech-corp-caa5d44c9891"
---


# 소개

자바 마이크로서비스를 시작하는 것은 깊은 물 속으로 뛰어든 것 같을 수 있습니다. 인턴십 때도 마찬가지로 느꼈지만, 모든 것을 관리 가능한 단계로 나누는 것이 모든 것을 훨씬 쉽게 만든다는 것을 빨리 깨달았습니다. 이 포스트에서는 개발 환경 설정부터 자바 기초 핵심 교훈을 공유하겠습니다.

## 개발 환경 설정하기

개발 환경을 설정하는 것이 첫 번째 과제였는데, 여러 중요한 단계가 뒤따랐습니다.

<div class="content-ad"></div>

1. JVM 설치하기: Java Virtual Machine (JVM)은 Java 애플리케이션을 실행하는 데 필수적입니다. 제가 다양한 운영 체제에 다운로드하고 설치하는 방법을 배웠어요. 공식 Java 웹사이트에서 안내에 따라 진행하면 굉장히 간단해요.

2. IntelliJ IDEA 설치하기: Java 코드를 작성하고 테스트하기 위해 저는 IntelliJ IDEA라는 강력한 통합 개발 환경(IDE)를 사용했어요. IntelliJ를 설치하는 것은 간단했고, 강력한 기능과 사용자 친화적 인터페이스로 코딩이 훨씬 효과적해졌어요.

Java 기초: 변수와 데이터 유형

마이크로서비스 세계에 뛰어들기 전에 Java 기초에 대한 굳은 기반을 필요로 했어요:

변수: Java에서 변수는 데이터 값을 보관하는 컨테이너와 같아요. `int`(정수용), `float`(부동 소수점 숫자용), `String`(텍스트용)과 같은 다양한 유형의 변수에 대해 배웠어요.

<div class="content-ad"></div>

데이터 유형: 데이터 유형은 변수가 어떤 종류의 데이터를 보유할 수 있는지를 지정합니다. 자바에는 `byte`, `short`, `int`, `long`, `float`, `double`, `char`, 그리고 `boolean`과 같은 여러 가지 기본 데이터 유형이 있습니다.

# 객체 지향 프로그래밍(OOP) 개념

OOP를 이해하는 것은 제게 큰 전환점이었습니다. 여기에 주요 개념을 요약해 드리겠습니다.

1. 클래스와 객체: 클래스는 객체를 생성하기 위한 청사진과 같습니다. 클래스를 정의하고 해당 클래스를 기반으로 객체를 만드는 방법을 배웠습니다.

2. 상속: 상속은 한 클래스가 다른 클래스로부터 필드와 메소드를 상속받아 코드를 재사용하기 쉽게 만듭니다.

<div class="content-ad"></div>

3. 다형성: 이 개념은 하나의 인터페이스를 일반적인 작업 클래스로 사용할 수 있도록 합니다. 구체적인 동작은 상황의 정확한 성격에 따라 달라집니다.

4. 캡슐화: 캡슐화는 클래스 내부의 데이터를 외부 간섭으로부터 보호하는 것입니다. 데이터와 데이터를 조작하는 코드를 함께 한 곳에 유지합니다.

5. 추상화: 추상화는 복잡한 구현 세부사항을 숨기고 객체의 필요한 특징만을 보여주는 것을 포함합니다.

Control Flow:

<div class="content-ad"></div>

제어 흐름 문장을 사용하면 코드에서 결정을 내릴 수 있어요:

제어 흐름은 모든 프로그래밍 언어에서 필수적이며 Java도 예외는 아닙니다. 제어 흐름에는 if, else if, else 및 중첩 if 문을 포함한 다양한 조건문에 대해 배웠어요. 이러한 구조를 사용하면 프로그램이 특정 조건에 따라 결정을 내릴 수 있어 코드가 더 동적이고 반응적으로 작동하게 됩니다.

# 배열

배열은 여러 값들을 단일 변수에 저장하는 데 굉장히 유용해요:

<div class="content-ad"></div>

자바에서 배열은 기본 데이터 구조입니다. 배열을 사용하는 방법을 배우는 데 많은 시간을 소비했습니다. 배열을 초기화하는 방법, 요소에 접근하는 방법, 정렬 및 검색과 같은 다양한 작업을 수행하는 방법을 배웠습니다. 배열을 숙달하는 것은 자바에서 데이터 컬렉션을 효율적으로 처리하는 데 중요합니다.

## 배열 개념에 대해 배운 샘플 코드 :

import java.util.Arrays;
import java.util.Scanner;

/////////////////////// for-each 루프////////////////////////////////////////////////////////////////////

<div class="content-ad"></div>

```java
클래스 Insert {
    public void InsertArray() {
        String[] id = {"EvilJack", "DevilCrime", "kingJD", "KingOfDevil"};
        
        for(String new_id : id) {
            System.out.println("newID: " + new_id);
        }
    }
}

클래스 Forloop extends Insert {
    public void for_loop() {
        int[] array = {1, 2, 3, 4, 5};
        System.out.println(array[2]);
        array[2] = 10;
        System.out.println(array[2]);

        for(int i = 0; i < array.length; i++) {
            System.out.println("the array " + array[i]);
        }
    }
}
```  

<div class="content-ad"></div>

```java
class TOstring extends Forloop {
    public void TOString() {
        int[] newArray = {12, 323, 455, 6667};
        System.out.println("The NewArray" + Arrays.toString(newArray));
    }
}

class SCanner extends TOstring {
    public void sCANNER() {
        int[] array = new int[10];
        Scanner scan = new Scanner(System.in);

        System.out.println("Enter the number to inserting into the array");
        for (int i = 0; i < array.length; i++) {
            array[i] = scan.nextInt();
        }

        for (int new_array : array) {
            System.out.println("the array is " + new_array);
        }
    }
}
```

<div class="content-ad"></div>

class Update extends Scanner {
    public void update() {
        String[] names = {"EJ", "DevilCrime", "kingJD", "KingOfDevil"};
        Scanner scan = new Scanner(System.in);
        
        System.out.println(Arrays.toString(names));
        System.out.println("Enter the position or index which you want to update: ");
        int index = scan.nextInt();
        scan.nextLine();
        
        System.out.println("Enter the name you want to update to:");
        String new_name = scan.nextLine();

        names[index] = new_name;

        System.out.println("The updated array of names is: " + Arrays.toString(names));

        System.out.println("Enter the name you want to search:");
        String search_name = scan.nextLine();
    }
}

<div class="content-ad"></div>

```java
String[] Name = {"John", "Alice", "Bob", "Eve"};
String Search_name = "Alice";
for(int find=0; find<Name.length; find++) {
    if(Search_name.equalsIgnoreCase(Name[find])) {
        System.out.println("The "+Search_name+" is found and the index is "+find);
        return;
    }
}
System.out.println("The name "+Search_name+" is not found");
```

`passing_array` 클래스는 파라미터로 배열 데이터를 전달하는 데 사용됩니다.
```java
import java.util.Arrays;

class PassingArray {
    public void Passing_array(String[] ff_id) {
        ff_id[1] = "devil crime";
        ff_id[0] = "Evil jack";
        System.out.println("My squad " + Arrays.toString(ff_id));
    }

    public void id() {
        System.out.println("Introducing my FF Squad ");
    }
}
```

`array` 클래스:
```java
public class Array {
    public static void main(String[] args) {
        PassingArray obj = new PassingArray();
        obj.Passing_array(new String[2]);
        obj.id();
    }
}
```

<div class="content-ad"></div>

```java
////////////
passing obj1 = new passing();
String[] id_ff = {"ej", "DC", "kingJD", "kingOfDevil"};
obj1.Passing_array(id_ff);
'
'

# 데이터베이스 개념

## MySQL

자바 뿐만 아니라 SQL에 대해 공부한 적이 있습니다. SQL 쿼리 작성, 조인 이해 및 SQL에서 코드 주석 작성 방법을 배웠습니다. 이러한 기술은 많은 애플리케이션의 중요한 구성 요소인 데이터베이스와 상호 작용하는 데 중요합니다.
```

<div class="content-ad"></div>

앞으로 다가올 것을 기대하며, 인턴십에서 저는 Java Spring Boot에 대해 배우게 될 예정에 흥분하고 있어요. Spring Boot는 Java 기반 백엔드 응용 프로그램을 구축하는 데 사용되는 프레임워크입니다. 이를 습득하는 것은 백엔드 개발자로서 나아가는 내 여정에서 중요한 한걸음일 것입니다.

# 결론

이번 인턴십은 놀라운 학습 경험이었고, Java와 SQL에 강한 기반을 제공해주었습니다. JVM 설치, IntelliJ 설정을 통한 실전 실습, Java 기초 및 객체지향 개념에 대한 깊은 탐구는 가치 있었어요. 배열과 조건문에 대한 지식과 기술을 향상시킨 것은 내 프로그래밍 능력을 강화시키고, SQL에 대한 소개로 필수적인 데이터베이스 관리 기술을 갖추었습니다.

Spring Boot를 학습하러 전진하는 것에 있어서, 제가 잘 준비되어 있고 백엔드 개발 분야에서 전문 지식을 확장하기를 열망하고 있어요. 이번 인턴십은 기술 능력을 향상시키는 데 그치지 않고, 소프트웨어 개발에 대한 열정을 불어넣어주어, 미래 직업을 위한 견고한 토대를 마련해주었습니다.