---
title: "JVM이란 무엇인가요"
description: ""
coverImage: "/assets/img/2024-07-09-WhatisJVM_0.png"
date: 2024-07-09 09:26
ogImage: 
  url: /assets/img/2024-07-09-WhatisJVM_0.png
tag: Tech
originalTitle: "What is JVM?"
link: "https://medium.com/@singourhimanshu3/what-is-jvm-473a67366e0e"
---



![JVM Structure](/assets/img/2024-07-09-WhatisJVM_0.png)

자바 가상 머신 (JVM)은 자바 바이트 코드를 실행하여 모든 장치나 운영 체제에서 자바 프로그램을 실행할 수 있도록 합니다.

## JVM 구조

- 클래스 로더: 자바 클래스 파일을 로드합니다.
2. 메모리 영역:
    - 메서드 영역: 클래스 데이터 저장.
    - 힙: 객체 저장.
    - 스택: 로컬 변수 및 메서드 호출 보유.
    - PC 레지스터: 현재 명령을 추적.
    - 네이티브 메서드 스택: 네이티브 메서드 호출 처리.
3. 실행 엔진:
    - 인터프리터: 바이트 코드 명령을 하나씩 실행.
    - JIT 컴파일러: 빠른 성능을 위해 바이트 코드를 네이티브 기계 코드로 변환.


<div class="content-ad"></div>

## 예시: JVM 작동 방식

1. Java 프로그램 작성 및 컴파일:

```java
public class Himanshu {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

`javac Himanshu.java`로 컴파일하여 `Himanshu.class` 파일을 생성합니다.

2. JVM에서 바이트코드 실행:

`java HelloWorld`

- 클래스 로더가 `HelloWorld.class`를 로드합니다.
- 메모리 영역이 객체와 메소드를 위한 공간을 할당합니다.
- 실행 엔진이 바이트코드를 실행합니다.
- 프로그램은 콘솔에 "Hello, World!"를 출력합니다.

요약

<div class="content-ad"></div>

JVM은 Java의 플랫폼 독립성에 중요한 역할을 합니다. JVM을 통해 컴파일된 바이트코드를 실행하여 Java 프로그램을 JVM이 탑재된 모든 기기에서 실행할 수 있습니다.