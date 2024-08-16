---
title: "Spring에서 잘 알려지지 않았지만 강력한 기능 "
description: ""
coverImage: "/assets/img/2024-07-30-ALittle-UsedbutPowerfulFeatureinSpring_0.png"
date: 2024-07-30 17:15
ogImage: 
  url: /assets/img/2024-07-30-ALittle-UsedbutPowerfulFeatureinSpring_0.png
tag: Tech
originalTitle: "A Little-Used but Powerful Feature in Spring"
link: "https://medium.com/programming-and-ai-research/a-little-used-but-powerful-feature-in-spring-5688d49557b2"
isUpdated: true
---




환경: Spring 6.1.2

## 1. 소개

임의 메서드 대체

![이미지](/assets/img/2024-07-30-ALittle-UsedbutPowerfulFeatureinSpring_0.png)

<div class="content-ad"></div>

메소드 주입과 비교해보면, 덜 일반적으로 사용되는 형태 중 하나는 관리되는 빈(Bean)의 어떤 메소드든 다른 메소드로 교체할 수 있는 기능입니다. 간단히 말하면, 기존 빈에 있는 어떤 메소드든 사용자 정의 메소드로 교체할 수 있습니다. 예를 들어:

```java
@Component
public class PersonService {
  public String savePerson(Person person) {
    return "save person";
  }
}
```

위와 같은 PersonService 빈 객체가 savePerson 메소드를 가지고 있다고 가정해봅시다. savePerson을 호출할 때 원래 코드 실행 대신 다른 동작을 실행하고 싶을 때가 있습니다. 이전에는 이를 위해 소스 코드를 수정해야 했을지도 모릅니다. 하지만 Spring은 기존 빈의 어떤 메소드든 임의의 코드로 교체할 수 있는 메커니즘을 제공하여 지정된 코드가 원래 코드 대신 실행되도록 할 수 있습니다.

## 2. 실제 예제

<div class="content-ad"></div>

## 2.1 코드 준비

```java
public class PersonService {
  public String savePerson(Person person) {
    return "사람 저장";
  }
}
```

이 클래스의 savePerson 메서드가 대체될 메서드입니다.

```java
public class ReplacementSavePerson implements MethodReplacer {
  @Override
  public Object reimplement(Object obj, Method method, Object[] args) throws Throwable {
    System.out.println(Arrays.toString(args));
    System.out.println(obj);
    return "save person 대체";
  }
}
```

<div class="content-ad"></div>

이 클래스는 org.springframework.beans.factory.support.MethodReplacer 인터페이스를 구현하여 새로운 메서드 정의를 제공합니다. 이 클래스의 reimplement 메서드는 PersonService#savePerson 메서드의 본문을 대체할 것입니다.

## 2.2 빈 등록 및 정의

```js
public static void main(String[] args) {
  try (GenericApplicationContext context = new GenericApplicationContext()) {
    context.registerBean("replacementSavePerson", ReplacementSavePerson.class);
    context.registerBean(PersonService.class, bd -> {
      if (bd instanceof RootBeanDefinition root) {
        // 바꿀 메서드 (savePerson)와 대체할 Bean (replacementSavePerson)을 지정합니다.
        ReplaceOverride replace = new ReplaceOverride("savePerson", "replacementSavePerson");
        root.getMethodOverrides().addOverride(replace);
      }
    });
    context.refresh();
    PersonService ps = context.getBean(PersonService.class);
    System.out.println(ps.savePerson(new Person()));
  }
}
```

출력:

<div class="content-ad"></div>

```js
[com.pack.ioc.method_replace.MethodReplaceTest$Person@1e9e725a] com.pack.ioc.method_replace.MethodReplaceTest$PersonService$$SpringCGLIB$$0@15d9bc04 replace save person
```

최종 결과는 ReplacementSavePerson#reimplement 메서드에 의해 교체된 내용을 보여줍니다.

## 2.3 메서드 오버로딩

한 클래스에 여러 개의 메서드 오버로드가 있는 경우, 특정 메서드를 교체하려면 매개변수 유형을 지정할 수 있습니다.

<div class="content-ad"></div>

예를 들어, 두 개의 오버로드된 savePerson 메서드가 있는 PersonService가 있다고 가정해보겠습니다:

```java
public class PersonService {
  public String savePerson(Person person) {
    return "사람 저장";
  }

  public String savePerson(String name) {
    return String.format("%s 저장", name);
}
```

파라미터 유형을 명시하지 않으면 프로그램은 원본 내용만 출력할 것입니다.

파라미터 유형을 명시하려면:

<div class="content-ad"></div>


```js
ReplaceOverride replace = new ReplaceOverride("savePerson", "replacementSavePerson");
replace.addTypeIdentifier("com.pack.Person");
```

원하는 메서드를 정의할 수도 있습니다. 간단한 이름 또는 타입 이름의 일부분으로도 지정할 수 있어요.

## 2.4 XML 기반 설정

```js
<bean id="personService" class="com.pack.PersonService">
  <!-- 교체하고자 하는 메서드 정의 -->
  <replaced-method name="savePerson" replacer="replacementComputeValue">
      <!-- 매개변수 타입을 지정하세요; 오버로드된 메서드가 없는 경우에는 선택사항입니다 -->
      <arg-type>Person</arg-type>
  </replaced-method>
</bean>

<bean id="replacementSavePerson" class="com.pack.ReplacementSavePerson"/>
``` 


<div class="content-ad"></div>

XML 기반 구성은 더 직관적입니다. 현재 주석을 사용하여 이를 정의하는 방법이 없어 보입니다. BeanDefinition을 사용하여 ReplaceOverride를 설정해야 합니다.