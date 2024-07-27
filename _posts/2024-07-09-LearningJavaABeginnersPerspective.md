---
title: "자바 배우기 초보자를 위한 가이드"
description: ""
coverImage: "/assets/img/2024-07-09-LearningJavaABeginnersPerspective_0.png"
date: 2024-07-09 09:37
ogImage: 
  url: /assets/img/2024-07-09-LearningJavaABeginnersPerspective_0.png
tag: Tech
originalTitle: "Learning Java: A Beginner’s Perspective"
link: "https://medium.com/@brindha220605/learning-java-a-beginners-perspective-da6e5af51a6d"
---


<img src="/assets/img/2024-07-09-LearningJavaABeginnersPerspective_0.png" />

## 여러분 안녕하세요!

저의 블로그를 마지막으로 쓴 지 어느 정도 시간이 지났네요. 얼마 후, 저는 Java 학습 여정에 대한 제 경험을 다시 공유하기 위해 여기에 왔습니다. Zealous Academy의 도움을 받아 웹 개발 여정을 시작하면서, 이제 Java 프로그래밍에 몰두할 수 있는 기회가 생겼습니다.

# "JAVA와 나: 두려움을 이겨내며":

<div class="content-ad"></div>

프로그래밍 언어 초심자로서, 자바는 복잡한 구문과 위협적인 외관 때문에 언제나 두렵게 느껴졌어요. 모두들 자바가 가장 어렵다고 말할 때, 흥미가 줄어들었죠. 하지만 학업과 다른 분야에서 자바의 중요성을 이해하면서 불안하면서도 배우겠다는 다짐을 했어요.

솔직히 말하자면, 자바를 배우는 것이 항상 내 버킷 리스트에 있었다고 과장하지 않겠어요. 오늘, Zealous Academy의 지도로 자바 세계로의 여정을 떠나게 되었어요.

## JAVA: 객체 지향 언어 

자바는 클래스와 객체를 효율적으로 구조화하는데 많은 의존성을 가진 객체 지향 프로그래밍 언어에요. Oracle이 개발하고 유지보수하고 있어 전 세계 개발자들에게 신뢰할 수 있는 언어로 꼽히고 있어요.

<div class="content-ad"></div>

자바는 주로 세 가지를 기반으로 작동합니다:

- Java 개발 키트
- Java 가상 머신
- Java 실행 환경

JDK - Java 개발 키트:

JDK는 자바 프로그램을 컴파일하고 실행하는 데 사용됩니다. 효율적으로 자바 코드를 작성, 컴파일 및 디버깅하기 위한 모든 필요한 도구를 제공합니다.

<div class="content-ad"></div>

JVM-Java Virtual Machine:

JVM은 Java 프로그래밍 언어와 하위 하드웨어 간의 해석기 역할을 하며, 다양한 플랫폼에서 Java 프로그램이 원활하게 실행되도록 보장합니다.

JRE-Java Runtime Environment:

JRE에는 다양한 내장 패키지가 포함되어 있어 Java 애플리케이션이 원활히 실행되며 Java 개발에 풍부한 환경을 제공합니다.

<div class="content-ad"></div>

아래 다이어그램은 자바에서 이 세 가지 요소의 작업 흐름을 보여줍니다:

![Java Workflow](/assets/img/2024-07-09-LearningJavaABeginnersPerspective_1.png)

## 자바의 특징

자바는 개발자들 사이에서 인기 있는 선택지로 만드는 몇 가지 주요한 기능을 자랑합니다. 객체 지향 프로그래밍(OOP) 패러다임, 멀티 스레딩 지원, 그리고 높은 수준의 보안으로 유명합니다.

<div class="content-ad"></div>

# Java 개발용 소프트웨어

Java 개발을 위한 여러 소프트웨어 도구가 있습니다. 각각 다른 요구 사항에 맞춰 제작되었습니다. 인기 있는 선택지 중 일부는

- IntelliJ
- VS Code
- Eclipse
- 메모장 (개발자가 선택할 수 있는 다양한 기능을 제공합니다).

# "Hello World: 그 외에 뭘 더 할까요?"

<div class="content-ad"></div>

새로운 프로그래밍 언어를 배울 때, 전통적인 "Hello, World!" 프로그램은 일반적으로 첫 번째 이정표입니다. 화면에 "Hello, World!"라는 구문을 표시하는 간단한 프로그램으로, 언어의 구문과 구조에 대한 기본 소개 역할을 합니다.

```js
public class Sample 
{
    public static void main(String[] args)
    {
        System.out.println("Hello World");
    }
}
```

# 키워드 및 구문:

- public: 이 키워드는 Class Sample이 다른 어떤 Class에서도 접근 가능하다는 것을 나타냅니다. Java에서 클래스는 서로 다른 접근 수준(public, private, protected, default)을 가질 수 있으며, 클래스의 접근 가능한 위치를 결정합니다.
- class: Sample이라는 새로운 Class를 정의합니다. Java에서 Class는 프로그램의 기본적인 구성 블록입니다. 데이터(속성)와 데이터에 작용하는 메소드(함수)를 캡슐화합니다.
- Sample: 클래스의 이름입니다. 파일 이름과 클래스 이름은 대소문자를 포함하여 정확히 일치해야 합니다.
- ': 클래스 본문의 시작을 나타냅니다. '' 사이의 모든 내용은 클래스의 멤버 및 메소드를 정의합니다.
- public static void main(String[] args): 이것은 메인 메소드입니다. Java 중 애플리케이션의 진입점으로 작용합니다. Java 프로그램을 실행하면 Java 가상 머신(JVM)이 메인 메소드부터 실행을 시작합니다.
- public: main 메소드가 Sample 클래스 외부(이 경우 JVM)에서 호출될 수 있음을 나타냅니다.
- static: main 메소드가 클래스 자체에 속한다는 것을 의미하며, 클래스 Sample의 객체를 만들지 않고도 호출할 수 있습니다.
- void: main 메소드가 어떤 값도 반환하지 않음을 명시합니다.
- main: 메소드의 이름입니다. JVM에 의해 Java 프로그램의 실행 시작점으로 인식되는 특별한 메소드입니다.
- String[] args: 프로그램이 실행될 때 전달된 명령행 인수를 저장하는 args라는 배열 매개변수입니다. 프로그램이 명령행에서 직접 입력을 받을 수 있게 합니다.
- ': main 메소드 본문의 시작을 나타냅니다. '' 사이의 모든 내용은 main 메소드가 호출될 때 실행되는 명령문을 정의합니다.
- System.out.println("Hello World");: 이 문은 "Hello World"라는 문자열을 표준 출력(일반적으로 콘솔)에 출력합니다. System.out은 표준 출력 스트림을 나타내는 객체입니다. println은 텍스트 줄을 출력하는 PrintStream 클래스의 메소드입니다. 이 경우 "Hello World"를 출력합니다.
- ': main 메소드 본문의 끝을 나타냅니다.
- ': 클래스 본문의 끝을 나타냅니다.

<div class="content-ad"></div>

# Java의 복잡성:

이전에 언급했듯이 Java 구문의 복잡성은 이 언어를 어렵게 느껴지게 할 수 있습니다. 그러나 코드를 더 작은 부분으로 나누고 각 구성 요소의 기능을 이해함으로써 학습 과정을 크게 간소화할 수 있습니다. 이 기본 구성 요소를 이해하는 것은 Java를 더 접근 가능하게 만들뿐 아니라 프로그래밍에서 더 고급 개념을 습득하기 위한 견고한 기반을 구축하는 데도 도움이 됩니다.

나는 Java를 배우는 초기 단계에서 얻은 주요 포인트를 소개했고, Zealous Academy의 안내를 받으며 고급 주제에 대해 더 심층적으로 탐구하고 싶습니다.

# 결론:

<div class="content-ad"></div>

결론적으로, 초심자로서 자바의 세계에 발을 들이는 것은 굉장히 보람찬 경험이 될 수 있습니다. 언어의 기본 원리를 마스터하고, 다양한 기능을 탐험하며, 다양한 소프트웨어 도구를 활용하여 코딩 기술을 향상시킴으로써, 희망하는 개발자들은 차근차근 자바에 대한 능력을 향상시킬 수 있습니다. 이 과정은 프로그래밍 원리에 대한 깊은 이해를 기르는 데 도움이 되는 동시에 계속 발전하는 기술 환경에서 혁신을 일으키고 영향력 있는 애플리케이션을 만드는 능력을 부여합니다.