---
title: "자바 클래스 로더의 미스터리 핵심 원리 해부하기"
description: ""
coverImage: "/assets/img/2024-07-09-TheMysteryBehindJavasClassLoadersUnravellingtheCore_0.png"
date: 2024-07-09 21:49
ogImage: 
  url: /assets/img/2024-07-09-TheMysteryBehindJavasClassLoadersUnravellingtheCore_0.png
tag: Tech
originalTitle: "The Mystery Behind Java’s ClassLoaders: Unravelling the Core"
link: "https://medium.com/gitconnected/the-mystery-behind-javas-classloaders-unravelling-the-core-fbf914b7df24"
---



![Mystery Behind Java's Class Loaders](/assets/img/2024-07-09-TheMysteryBehindJavasClassLoadersUnravellingtheCore_0.png)

# 수수께끼 같은 만남: 클래스로더가 프로젝트를 구하는 날

상상해봐: 나는 중요한 클라이언트를 위해 중요한 Java 애플리케이션을 작업 중이다. 발표일이 다가오고 있고 압력이 증가하고 있다. 나와 우리 팀은 모든 것이 완벽하다는 것을 보장하기 위해 끊임없이 코딩하고 밤낮을 새우고 이른 아침을 일한다. 마침내, 애플리케이션은 준비가 끝났고 튼튼하며 완벽해 보였다 - 또는 그렇게 생각했다.

마지막 테스트 라운드 동안, 우리가 스스로를 칭찬하려는 순간, 신비한 ClassNotFoundException이 나타났다. 공포가 느껴진다. 오류를 발생시키는 클래스, 일단 com.ourapp.utils.SpecialFormatter라고 부르자. 우리 코드베이스에 그 패키지에 빠르게 앉아 있었다. 그런데 JVM은 그것이 누락되었다고 고집한다.


<div class="content-ad"></div>

Java 개발을 한 10년 간 해오면서 수많은 신비로운 상황에 직면해왔는데, 그 중에서도 이번 경우는 정말 특별한 케이스였어요. 복잡한 어플리케이션, 총리한 데드라인, 이성을 거스르는 에러 등 여러 어려움이 있었죠. 수십 시간 동안 고민하고 코드베이스를 리뷰하며 빌드 설정을 여러 차례 확인한 끝에, 답은 의외의 주인공인 Java의 ClassLoader에서 나왔어요.

ClassLoaders를 이해하는 것은 종종 간과되는 부분이지만, 이번 수수께끼를 해결하는 데 중요한 열쇠였어요. SpecialFormatter 클래스는 존재했지만 예상대로 로딩되지 않았음을 깨달았고, 그것을 로그 트레이싱을 통해 확인했어요.

이 문제의 핵심은 이런 거예요: 저희 프로젝트는 여러 모듈로 구성되어 있었고 각 모듈은 별도의 JAR 파일로 빌드되었어요. SpecialFormatter는 유틸리티 모듈인 utils.jar에 있었는데, 이 모듈이 메인 어플리케이션 모듈의 의존성이었어요. 그러나 프로젝트 최근 재구조화로 인해 메인 어플리케이션 JAR의 매니페스트에 정의된 클래스패스가 오래된 버전의 utils.jar을 가리키고 있었어요. 이 오래된 버전의 utils.jar에는 SpecialFormatter가 없었죠.

ClassLoader는 열심히 일했지만 클래스패스에서 지정된 위치에서 SpecialFormatter를 찾지 못해 클래스를 찾을 수 없는 ClassNotFoundException을 발생시켰어요.

<div class="content-ad"></div>

수정한 내용? 불일치를 확인하자마자, 주 애플리케이션 JAR의 매니페스트 파일에서 classpath를 업데이트하여 utils.jar의 올바른 버전을 참조하도록 했어요. 이 작은 변경이 마치 잠겨 있는 문을 여는 것 같았어요. 갑자기 ClassLoader가 SpecialFormatter를 찾을 수 있게 되고, 그 순간 애플리케이션이 에러 없이 살아나는 모습이었어요.

이 경험은 Java ClassLoader의 어려움을 생생히 상기시켰어요. 그 역할은 뒷담화처럼 보일 수 있지만, 애플리케이션이 실행되는 방식에 중요한 역할을 하고 있어요. ClassLoader의 심층을 파헤치고 그 동작을 이해함으로써, 추적하고 해결하기 어려워 보이던 문제를 해결할 수 있었어요. 이로써 잠재적인 재앙으로부터 프로젝트를 보호하고 제 정신을 유지할 수 있었어요.

# ClassLoader: Java의 잊혀진 영웅들

그래서, ClassLoader는 정확히 무엇일까요? Java의 ClassLoader는 방대한 도서관 속 사서와 비슷해요. 마치 사서가 책을 필요로 할 때 책장 속에서 필요한 책을 찾아주는 것처럼, ClassLoader는 JVM이 그들을 필요로 할 때 클래스를 가져와줘요. "음, ClassLoader야, 이 클래스가 필요해. 가져와 줄래?" 라고 말하면 ClassLoader는 코드와 라이브러리의 깊은 곳으로 들어가 그 클래스를 찾아 로드해줘요.

<div class="content-ad"></div>

다음은 간단한 코드 예시입니다:

```js
public class MyClass {
    public static void main(String[] args) {
        // We are asking the ClassLoader to find and load the class named "MyClass"
        ClassLoader classLoader = MyClass.class.getClassLoader();
        try {
            Class<?> aClass = classLoader.loadClass("MyClass");
            System.out.println("Class Loaded: " + aClass.getName());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

이 코드 스니펫에서는 ClassLoader에게 "MyClass"라는 이름의 클래스를 찾아 로드하도록 요청합니다. 모든게 잘되면 "Class Loaded: MyClass"가 출력됩니다. 그렇지 않을 경우, 해결해야 할 수수꾸러미가 생길지도 모릅니다!

# 클래스로더가 왜 중요한가요?

<div class="content-ad"></div>

- 조직: 사서가 없는 도서관을 상상해보세요. 책(클래스)들이 어디에나 흩어져 있어서 아무것도 찾을 수 없게 됩니다. ClassLoader는 여러분의 클래스를 정리해줍니다.
- 보안: ClassLoader들은 보안 요원처럼 동작하여 안전하고 권한이 부여된 클래스만 JVM에 로드되도록 합니다.
- 효율성: 필요한 시점에만 클래스를 로드합니다. 이러한 게으른 로딩은 메모리를 효율적으로 관리하는 데 도움이 되며, 대규모 애플리케이션에 매우 중요합니다.

그러므로 ClassLoader들은 자바 개발의 중요한 배경 캐릭터들처럼 보일지 모르지만, 여러분의 애플리케이션이 원활하고 안전하게 실행되도록 보장합니다. 이를 이해하는 것은 여러분이 자바의 많은 미스터리를 해결하는 비밀 무기가 될 수 있습니다.

# 자바 ClassLoader 해독

자바에서 ClassLoader를 이해하는 것은 처음에는 매우 복잡해 보일 수 있지만, 결국에는 꽤 간단한 프로세스입니다. 이 개념을 해독하고 가능한 간단하게 만들어봅시다.

<div class="content-ad"></div>

# Java에서 ClassLoaders의 정의 및 주요 기능

Java에서 ClassLoader는 Java Runtime Environment (JRE)의 일부로, Java 클래스를 동적으로 Java Virtual Machine (JVM)으로 로드하는 역할을 합니다. 이는 코드에서 JVM으로 클래스를 가져오는 다리 역할을 하며, 한 곳에서 다른 곳으로 상품을 운반하는 수송자와 같은 역할을 합니다.

# ClassLoaders가 클래스를 JVM으로 가져오는 방법

Java 프로그램이 실행될 때, 필요한 모든 클래스에 대해 미리 알지 못합니다. ClassLoader가 개입하여 필요할 때 동적으로 이러한 클래스를 로드합니다.

<div class="content-ad"></div>

가상 머신이 Greeting 클래스에 대해 알지 못하는 상태에서 Main 클래스가 실행될 때, new Greeting() 라인에 도달하면 ClassLoader가 동작하여 Greeting 클래스를 JVM에 로드하여 사용할 수 있게 됩니다.

# 클래스 네임스페이스 개념

<div class="content-ad"></div>

자바에서 각 ClassLoader는 자체 네임스페이스를 갖습니다. 이는 두 개의 동일한 이름을 가진 클래스가 다른 ClassLoader에 의해 로드되었다면 존재할 수 있다는 것을 의미합니다. 마치 두 사람이 동일한 이름을 가지지만 서로 다른 집 주소를 갖기 때문에 구분될 수 있는 것과 마찬가지입니다.

```js
ClassLoader classLoaderA = new CustomClassLoader();
ClassLoader classLoaderB = new CustomClassLoader();
Class<?> classA = classLoaderA.loadClass("com.example.MyClass");
Class<?> classB = classLoaderB.loadClass("com.example.MyClass");
System.out.println(classA == classB); // 이 문장은 'false'를 출력합니다.
```

이 예시에서는 MyClass가 두 ClassLoader에 의해 로드되었지만, 서로 다른 네임스페이스를 가지기 때문에 JVM에서 서로 다른 클래스로 처리됩니다.

# ClassLoader의 계층구조

<div class="content-ad"></div>

자바의 ClassLoaders 세계는 각 ClassLoader가 특정 역할을 하고 계층 구조에서 특정 위치를 가지고 있는 가족 나무처럼 구성되어 있습니다.

## 시각화

계층 구조를 시각화하려면 피라미드를 상상해보세요:

![피라미드 시각화](/assets/img/2024-07-09-TheMysteryBehindJavasClassLoadersUnravellingtheCore_1.png)

<div class="content-ad"></div>

- 부트스트랩 ClassLoader는 피라미드 정상처럼 맨 위에 위치합니다.
- 익스텐션 ClassLoader는 중간층을 형성합니다.
- 시스템/응용프로그램 ClassLoader는 대부분의 애플리케이션 작업이 발생하는 기반을 형성합니다.

이 계층 구조를 이해하는 것은 매우 중요합니다. 이는 클래스가 어떻게 로드되고 어떤 순서로 로드되는지를 규정하기 때문입니다. 이는 핵심 자바 클래스가 우선순위를 가지고 올바른 버전의 클래스가 충돌없이 로드되도록 보장합니다.

## 부트스트랩 ClassLoader: 기초

ClassLoader 계층 구조의 정상에는 부트스트랩 ClassLoader가 있습니다. 이것은 모든 ClassLoader의 '할머니'입니다. 이 ClassLoader는 Java Runtime Environment (JRE)의 일부이기 때문에 매우 기본적입니다. 이 ClassLoader는 java.lang.String 또는 java.util.List와 같은 핵심 Java 클래스를 로드하는 책임을 갖고 있습니다. Java를 Java답게 만드는 클래스를 로드하는 ClassLoader로 생각해보세요.

<div class="content-ad"></div>

이렇게 작은 코드 조각을 통해 실제로 확인해 볼 수 있어요:

```java
Class<String> stringClass = String.class;
ClassLoader bootstrapClassLoader = stringClass.getClassLoader();
System.out.println("Bootstrap ClassLoader: " + bootstrapClassLoader);
```

이 코드를 실행하면 null이 출력된다는 것을 알게 될 거예요. Java에서는 Bootstrap ClassLoader가 Java 코드가 아닌 네이티브 코드의 일부이기 때문에 null로 표시됩니다.

## Extension ClassLoader: 기초 확장

<div class="content-ad"></div>

다음은 Extension ClassLoader입니다. 이 클래스로는 계층 구조에서 '상위' 역할을 합니다. 이 클래스는 표준 코어 자바 클래스의 확장인 클래스를 로드합니다. 일반적으로 JRE/lib/ext 폴더나 java.ext.dirs 시스템 속성에서 지정된 다른 경로에 있는 클래스들입니다.

Extension ClassLoader가 작동하는 것을 보려면 다음을 사용할 수 있습니다:

```js
ClassLoader extensionClassLoader = ClassLoader.getSystemClassLoader().getParent();
System.out.println("Extension ClassLoader: " + extensionClassLoader);
```

이 코드는 시스템 ClassLoader의 상위인 Extension ClassLoader를 검색합니다.

<div class="content-ad"></div>

## 시스템/응용 ClassLoader: 가장 일반적인 ClassLoader

마침내, 우리에게 시스템 또는 응용 ClassLoader가 있습니다. 이것은 가장 많이 상호작용하는 ClassLoader입니다. Java 응용 프로그램을 실행할 때 클래스 경로 환경 변수에서 찾은 클래스 또는 -cp 또는 -classpath 옵션에서 지정한 클래스를 로드합니다.

다음은 시스템 ClassLoader를 가져오는 방법입니다:

```java
ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
System.out.println("시스템/응용 ClassLoader: " + systemClassLoader);
``` 

<div class="content-ad"></div>

이 코드는 애플리케이션 클래스를 로드하는 ClassLoader를 가져옵니다.

# ClassLoaders의 위임 모델

ClassLoaders 패밀리에서는 독특한 전통이 따르는데, 그것은 부모 위임 모델입니다. 이 모델은 자바에서 클래스가 어떻게 로드되는지를 안내하는 가족 규칙과 같습니다.

## 부모 위임 모델: 가족 전통

<div class="content-ad"></div>

클래스 로더가 클래스를 로드해야 할 때, 즉시 찾아가는 것이 아니라 부모 클래스 로더에게 작업을 위임합니다. 이 위임은 부트스트랩 클래스 로더에 도달할 때까지 계층 구조를 따라 계속됩니다. 부모 클래스 로더가 클래스를 찾지 못할 경우, 책임은 원래 클래스 로더로 반환됩니다.

다음은 이를 설명하는 간단한 예제입니다:

```js
public class MyClass {
    public static void main(String[] args) {
        ClassLoader classLoader = MyClass.class.getClassLoader();
        while (classLoader != null) {
            System.out.println("클래스 로더: " + classLoader);
            classLoader = classLoader.getParent();
        }
        System.out.println("부트스트랩 클래스 로더에 도달했습니다 (null로 표시됨)");
    }
}
```

이 코드는 MyClass 클래스의 클래스 로더 계층 구조를 출력하여 시스템 클래스 로더에서부터 부트스트랩 클래스 로더까지의 위임을 보여줍니다.

<div class="content-ad"></div>

# 부모 위임 모델의 장점

## 보안

부모부터 시작함으로써 Java는 잠재적으로 해로운 클래스가 핵심 java.lang.String을 같은 이름으로 덮어쓰지 못하도록 보장합니다.

## 성능

<div class="content-ad"></div>

부모 ClassLoader에 이미 로드된 클래스를 다시로드하는 것을 피해 시간과 자원을 절약하는 모델입니다.

# 사용자 지정 ClassLoader

가끔은 자바의 표준 ClassLoader가 프로젝트의 고유한 요구 사항에 맞지 않는 경우가 있습니다. 마치 표준 사이즈의 신발이 모두에게 완벽하게 맞지 않는 것처럼 말이죠. 이런 경우에는 사용자 지정 ClassLoader를 만들어야 합니다. 이유와 만드는 방법에 대해 알아봅시다.

## 사용자 지정 ClassLoader가 필요한 이유와 시기

<div class="content-ad"></div>

사용자 지정 ClassLoader는 표준 ClassLoader에서 충족할 수 없는 구체적인 클래스 로딩 요구 사항이 있을 때 필요합니다. 툴박스 안의 보통 도구로 작업을 수행할 수 없는 상황에서 독특한 도구가 필요한 것과 같아요.

# 시나리오:

- 비표준 소스에서 클래스 로드: 로컬 파일 시스템 외의 소스에서 클래스를 로드해야 할 때, 예를 들어 데이터베이스나 네트워크 소스 등.
- 핫 디플로이먼트 구현: 응용 프로그램을 다시 시작하지 않고도 클래스를 동적으로 다시 로드하는 것은 개발 환경에서 유용합니다.
- 보안 강화: 특정 클래스만 로드되도록하여 안전한 환경을 만드는 데 도움이 됩니다.

# 사용자 지정 ClassLoader 만드는 필수 단계

<div class="content-ad"></div>

다음과 같이 만들 수 있어요:

## 단계 1: ClassLoader 확장하기

먼저 java.lang.ClassLoader 클래스를 확장해야 해요.

```java
public class MyClassLoader extends ClassLoader {
  // …
}
```

<div class="content-ad"></div>

## 단계 2: findClass 메서드 오버라이딩

가장 중요한 부분은 findClass 메서드를 오버라이드하는 것입니다. 여기서 당신의 ClassLoader가 클래스를 찾아 로드하는 방법을 정의합니다.

```js
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] b = loadClassData(name);
        return defineClass(name, b, 0, b.length);
    }
    private byte[] loadClassData(String name) {
      // 클래스 데이터를 로드하는 구현 (예: 파일에서 읽기, 데이터베이스에서 읽기 등)
    }
}
```

## 단계 3: 사용자 정의 ClassLoader 사용하기

<div class="content-ad"></div>

이제 사용자 정의 ClassLoader를 사용하여 클래스를 로드할 수 있습니다.

```js
MyClassLoader myClassLoader = new MyClassLoader();
Class<?> myClass = myClassLoader.loadClass("com.example.MyCustomClass");
```

# 실제 시나리오: 사례 연구 또는 예제

## 사례 연구 1: 데이터베이스에서 클래스 로드

<div class="content-ad"></div>

상상해보세요. 데이터베이스에 저장된 클래스를 로드해야 할 경우 일반 ClassLoader는 작동하지 않습니다. 그래서 사용자 정의 ClassLoader를 만들어보세요. 왜 누군가 그것을 원할지 궁금할 수도 있습니다.

다양한 경우가 있습니다. 예를 들어, 웹 브라우저와 같이 플러그인이나 확장 기능을 지원하는 소프트웨어 제품을 생각해보세요. 개발자들은 플러그인을 작성할 수 있습니다. 이를 파일로 배포하는 대신 중앙 데이터베이스에 업로드할 수 있습니다.

사용자가 특정 플러그인을 활성화하려고 할 때, 애플리케이션은 데이터베이스에서 관련 클래스 파일을 가져와 실행 중인 애플리케이션에 로드할 수 있습니다. 이 설정은 플러그인의 배포 및 업데이트를 간편하게 만들고 사용 가능한 플러그인을 제어하며 최신 상태를 유지함으로써 보안을 강화할 수 있습니다.

## 사례 연구 2: 핫 디플로이먼트 구현

<div class="content-ad"></div>

개발 환경에서 애플리케이션의 클래스를 다시로드하고 싶을 수 있습니다. 사용자 정의 ClassLoader를 사용하면 이를 용이하게 할 수 있습니다.

사용자 정의 ClassLoader를 사용하면 특별한 방식으로 클래스를 로드할 수 있습니다. 마치 장인이 특정 작업을 위해 특별한 도구가 필요한 것과 같습니다. 이를 통해 클래스를 일반적이지 않은 소스에서 로드하거나, 고급 기능을 구현하거나, Java 애플리케이션의 보안을 강화할 수 있는 가능성이 열립니다.

# 자바의 ClassLoader에서 발생하는 일반적인 문제 및 문제 해결

자바의 ClassLoader 세계를 탐험하는 것은 때로 미로를 걷는 것처럼 느껴질 수 있습니다. 그 과정에서 몇 가지 성가신 문제에 직면할 수 있습니다. 일반적인 문제와 그 해결 방법에 대해 알아보겠습니다.

<div class="content-ad"></div>

## ClassNotFoundException 대 NoClassDefFoundError

이 두 가지 예외는 비슷하게 들리지만 실제로 다르기 때문에 많은 자바 초심자들을 당황하게 만듭니다.

자바 예외에 관한 저의 기사에서 더 자세히 읽을 수도 있습니다:

## ClassNotFoundException

<div class="content-ad"></div>

이 예외는 ClassLoader가 특정 클래스를 찾을 수 없을 때 발생합니다. 책장에서 책을 찾으려고 하는데 발견하지 못하는 것과 비슷한 상황입니다. 이는 주로 클래스 경로에 불일치가 있을 때 발생합니다.

개발자가 이 예외에 부딪히기 쉬운 일반적인 시나리오 중 하나는 JDBC를 사용하여 데이터베이스에 연결하려고 할 때입니다.

```js
     try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydatabase", "user", "password");
     } catch (ClassNotFoundException e) {
       e.printStackTrace();
     }
```

위의 코드에서 만약 MySQL JDBC 드라이버 JAR 파일이 클래스 경로에 포함되어 있지 않다면 Class.forName() 호출은 ClassNotFoundException을 발생시킵니다.

<div class="content-ad"></div>

## NoClassDefFoundError

이 오류는 클래스로더가 컴파일 시점에 클래스를 찾았지만 런타임 시에 누락되었을 때 발생합니다. 이는 책의 페이지를 표시했지만 돌아와서는 페이지가 없는 것과 같습니다.

이 오류가 발생하는 일반적인 시나리오는 동일한 라이브러리의 두 가지 버전이 클래스 경로에 있는 경우입니다. 한 가지가 다른 것을 덮어씌울 수 있으며, 예상했던 것과 다른 버전에서 클래스가 로드될 수 있는 상황을 만들어낼 수 있으며, 이로 인해 유의미한 차이가 있으면 NoClassDefFoundError가 발생할 수 있습니다.

# 흔한 함정 및 그것을 피하는 방법

<div class="content-ad"></div>

## 함정 1: 올바르지 않은 클래스패스

클래스패스를 올바르게 설정하지 않으면 ClassLoader에 부정확한 지도를 제공하는 것과 같습니다. 항상 클래스패스 설정을 두 번 확인해 주세요.

## 함정 2: 충돌하는 라이브러리

같은 라이브러리의 다른 버전을 포함하면 예상치 못한 동작을 일으킬 수 있습니다. 올바른 버전의 라이브러리를 갖고 있는지 확인하세요. 특히 외부 라이브러리의 종속성을 어떻게 관리하는지 주의하세요. 예를 들어, Apache Commons Lang에 의존하는 두 라이브러리가 있을 경우, 이에 따라 다른 버전을 가질 수 있으므로 프로젝트에는 Apache Commons Lang의 한 버전만 있어야 하고 원래 라이브러리 종속성에서 제외하여 오류를 피할 수 있습니다.

<div class="content-ad"></div>

## 함정 3: 패키지 이름을 놓치지 마세요

Java는 대소문자를 구분하고 패키지 이름에 정확하고 일관된지 확인하십시오. 다행히 요즘에는 IntelliJ IDEA나 Eclipse와 같은 IDE가 도와주며 자동으로 확인해줍니다!

# 클래스로더 관련 문제 진단 도구

## 도구 1: 상세한 클래스 로딩

<div class="content-ad"></div>

**테이블 태그를 Markdown 형식으로 변경하세요.**

이제, JVM 인수로 -verbose:class를 사용하여 응용 프로그램을 실행하여 어떤 클래스가 로드되는지 확인할 수 있습니다.

## 도구 2: JVisualVM

JDK와 함께 제공되는 이 무료 도구를 사용하면 JVM에서 무슨 일이 벌어지는지 모니터링할 수 있습니다.

ClassLoader 관련 문제를 탐색하는 것은 까다로울 수 있지만, 올바른 이해와 도구를 사용하면 이러한 퍼즐을 해결하고 Java 응용 프로그램을 원할하게 유지할 수 있습니다.

<div class="content-ad"></div>

# 모던 자바의 ClassLoaders

자바가 계속 발전함에 따라 ClassLoaders가 어떻게 작동하는지에 상당한 영향을 줄 수 있는 변화가 소개됩니다. 최근 몇 년간 가장 주목할 만한 변화 중 하나는 Java 9에서 Java 플랫폼 모듈 시스템(JPMS)이 소개된 것입니다. 이로 인해 자바가 클래스와 모듈을 다루는 방식이 재정의되어 ClassLoaders에도 영향을 미치고 있습니다.

# Java 플랫폼 모듈 시스템 (JPMS)

Java 9에서 모듈을 소개함으로써, 마치 난잡한 도서관을 체계적으로 구성된 아카이브로 재구성하는 것과 유사합니다. 이를 통해 개발자들은 코드를 캡슐화하고 응용 프로그램이나 다른 모듈의 다른 부분에 접근할 수 있는 코드의 일부를 명확하게 정의할 수 있습니다.

<div class="content-ad"></div>

# 클래스로더에 미치는 영향

JPMS(JAVA Platform Module System)를 사용하면 각 모듈은 고유한 클래스로더를 갖습니다. 이는 한 모듈의 클래스가 명시적으로 내보낼 때까지 다른 모듈에서는 보이지 않음을 의미합니다. 이는 각 방이 있는 집과 같습니다. 각 방에는 다른 방에서는 보이지 않는 아이템이 있습니다. 그러나 공유하면 볼 수 있습니다.

## 예시 시나리오:

간단한 모듈을 생성하고 클래스로더와 함께 작동되는 방법을 살펴보겠습니다:

<div class="content-ad"></div>

모듈 설명자를 생성하십시오 (module-info.java):

```java
module com.example.myModule {
    exports com.example.myModule;
}
```

위 설명자는 com.example.myModule이라는 모듈을 정의하고 동일한 이름의 패키지를 내보냅니다.

모듈 내에서 클래스를 생성하십시오:

<div class="content-ad"></div>

```java
package com.example.myModule;
public class MyClass {
    public void printMessage() {
        System.out.println("Hello from myModule!");
    }
}
```

모듈을 컴파일하고 실행하십시오:

```java
javac -d out --module-source-path src src/com.example.myModule/module-info.java src/com.example.myModule/com/example/myModule/MyClass.java
java --module-path out --module com.example.myModule/com.example.myModule.MyClass
```

이렇게 모듈을 컴파일하고 MyClass를 실행합니다. 모듈 경로가 표시된 모듈 구조에 유의하세요.

<div class="content-ad"></div>

모듈을 사용하면 ClassLoader는 클래스 계층뿐만 아니라 모듈 경계도 탐색해야 합니다. 이는 복잡성을 더 추가하지만 더 많은 제어와 캡슐화를 제공합니다.

# ClassLoader 동작에 미치는 영향

- 캡슐화: 한 모듈의 클래스는 다른 모듈의 클래스에 자동으로 접근할 수 없어서 캡슐화가 강화됩니다.
- 가시성: ClassLoader는 이제 클래스를 로드할 때 모듈 경계를 고려해야 하므로 모듈간 클래스의 가시성에 영향을 줄 수 있습니다.
- 의존성 관리: 모듈을 통해 명시적인 의존성 관리가 가능해져서 클래스 경로와 관련된 문제를 줄일 수 있습니다.

Java 9에서 모듈이 도입됨으로써 ClassLoader의 작동 방식에 패러다임 전환이 일어나며, 캡슐화와 명시적인 모듈 의존성이 강조됩니다. 이러한 변화를 이해하는 것은 현대 Java 애플리케이션에서 클래스와 의존성을 효과적으로 관리하기 위해 개발자들에게 중요합니다.

<div class="content-ad"></div>

# 클래스로더의 '언더 더 후드' 메커니즘

자바의 ClassLoaders는 클래스를 로드하는 것뿐만 아니라 하드웨어 '언더 더 후드'에서 복잡하고 중요한 작업을 수행합니다. 이러한 메커니즘은 자바 애플리케이션의 기능 뿐만 아니라 보안과 무결성도 보장합니다.

## 바이트코드 로딩

클래스로더가 클래스를 로드할 때, 그냥 클래스 파일을 읽는 것이 아니라 Java 가상 머신 (JVM)이 이해할 수 있는 형태인 바이트코드로 변환합니다.

<div class="content-ad"></div>

표 태그를 Markdown 형식으로 변경하겠습니다.

<div class="content-ad"></div>

바이트코드가 로드되면 ClassLoader가 구조적으로 올바르며 JVM의 규칙을 준수하는지 확인하기 위해 검증을 수행합니다.

JVM은 로드된 클래스의 여러 측면을 확인합니다.

- 형식: 바이트코드가 클래스 파일 형식을 준수하는지 확인합니다.
- 검사: 코드가 Java의 타입 시스템을 위반하지 않도록 확인합니다.
- 보안: 코드가 보안을 해치는 비법적 작업을 수행하지 않도록 확인합니다.

이 프로세스는 대부분 JVM에 의해 자동화되고 내부적으로 처리되지만, 애플리케이션의 무결성과 보안을 유지하는 데 중요합니다.

<div class="content-ad"></div>

# 자바 보안 모델에서 ClassLoaders의 역할

ClassLoaders는 자바의 보안 모델에서의 문지기 역할을 합니다. 이들은 클래스가 신뢰할 수 있는 소스에서로딩되고 잠재적으로 해로운 코드가 실행되지 않도록 보장합니다.

## ClassLoaders와 코드 소스

ClassLoaders는 안전하고 신뢰할 수 있는 위치에서 로드된 클래스와 잠재적으로 위험한 곳에서 로드된 클래스를 구별할 수 있습니다.

<div class="content-ad"></div>

## 보안 관리자 및 권한

자바의 보안 관리자는 ClassLoader와 손을 잡고 특정 작업에 대한 액세스를 허용하거나 제한하는 역할을 합니다. 클래스가 로드된 위치에 따라 특정 작업에 대한 권한을 부여하거나 제한합니다.

```java
public class RestrictedAction {
    public static void main(String[] args) {
        SecurityManager securityManager = System.getSecurityManager();
        if (securityManager != null) {
            securityManager.checkPermission(new RuntimePermission("examplePermission"));
        }
        // 민감한 작업 수행
    }
}
```

이 예시에서는 코드가 특정 작업을 수행할 권한이 있는지 확인합니다. 부여되는 권한은 이 클래스를 로드한 ClassLoader에 따라 다를 수 있습니다.

<div class="content-ad"></div>

# 최상의 방법

클래스로더를 효과적으로 다루는 것은 원활하게 작동하는 애플리케이션과 클래스 로딩 문제가 얽힌 난잡한 상황 사이의 차이를 만들 수 있습니다. 클래스 로딩을 깔끔하고 효율적으로 유지하는 몇 가지 최상의 방법을 살펴보겠습니다.

## 클래스로더 계층 구조 이해

<div class="content-ad"></div>

사용자가 호출 시 테이블 태그를 마크다운 형식으로 변경해주세요.

<div class="content-ad"></div>

정적 변수는 동일한 ClassLoader로 로드된 클래스들 사이에서 공유됩니다. 여러 ClassLoader를 사용하면 예상치 못한 동작이 발생할 수 있습니다.

```js
public class SharedResource {
  public static int counter = 0;
}
```

이 경우, SharedResource가 다른 ClassLoader에 의해 로드되면 각각이 카운터 변수의 자체 버전을 갖게 됩니다.

## 의존성을 현명하게 관리하기

<div class="content-ad"></div>

---

애플리케이션에서 사용하는 라이브러리와 의존성에 주의하세요. 충돌이나 동일한 라이브러리의 여러 버전은 클래스 로딩 문제를 일으킬 수 있습니다.

## 팁:

Maven 또는 Gradle과 같은 빌드 도구를 사용할 때 의존성을 관리하고 버전 충돌을 피하기 위해서 의존성을 책임지는 쪽이 되어야 합니다. 다른 것에 무작정 의존하지 말고 의존성 문제를 자동으로 해결해주지 못하는 것을 인식하세요. 그들은 많은 것들을 커버하지만 여전히 문제를 일으킬 수 있습니다.

# 깔끔하고 효율적인 클래스 로딩 유지를 위한 팁

<div class="content-ad"></div>

## 1. 클래스 경로를 깨끗하게 유지해주세요

가능한 한 클래스 경로를 깨끗하고 간결하게 유지하십시오. 필요한 디렉토리와 JAR 파일만 포함해주세요.

## 2. 성능 모니터링

애플리케이션이 크다면, 클래스 로딩이 성능에 영향을 줄 수 있습니다. 어플리케이션을 모니터링하고 프로파일링하여 병목 현상을 식별해주세요.

<div class="content-ad"></div>

## 3. Lazy Loading을 현명하게 사용해 보세요

클래스의 Lazy Loading은 시작 시간을 개선할 수 있지만 런타임 성능에 영향을 줄 수 있습니다. 애플리케이션의 요구에 맞게 신중하게 사용하세요.

Lazy Loading은 initialize를 false로 설정하여 java.lang.Class.forName(String name, boolean initialize, ClassLoader loader) 메서드를 사용하여 구현할 수 있습니다.

## 4. Graceful한 방법으로 예외 처리하기

<div class="content-ad"></div>

클래스로더(ClassLoader)를 다룰 때는 ClassNotFoundException과 같은 예외가 발생할 수 있습니다. 이러한 예외를 세련되게 처리하고 의미 있는 오류 메시지를 제공하세요.

## 5. 다양한 환경에서 테스트하기

클래스 로딩 문제는 환경에 따라 다를 수 있습니다. 애플리케이션을 다양한 환경에서 테스트하여 클래스로더 관련 문제를 잡아내세요.

이러한 모베스트 프랙티스와 팁을 따르면 클래스로더(ClassLoader)의 세계를 보다 효과적으로 탐험할 수 있으며, 자바 애플리케이션이 견고하고 효율적이며 유지보수하기 쉬워집니다.

<div class="content-ad"></div>

# 결론

자바의 ClassLoader는 코드 실행 프로세스 전체를 이해하는 데 매우 중요합니다. 매일적으로 직접 사용되지는 않지만 코드를 실행할 때마다 작동합니다. 그래서 ClassLoader를 알고 이해하는 것이 중요합니다. 이 지식이 여러분을 수시로 발생하는 디버깅 시간을 줄여줄지도 모릅니다!

다음에 또 만나요. 코딩하고 혁신하며 학습을 멈추지 마세요. 함께하는 개발자 여러분, 건배해요!

만약 이 기사를 즐겁게 읽으셨다면, 커피 한 잔 사주시겠어요? 💗 그리고 자바, 기술, 인공지능 등에 관한 더 많은 기사들을 기대해주세요! 👩🏻‍💻