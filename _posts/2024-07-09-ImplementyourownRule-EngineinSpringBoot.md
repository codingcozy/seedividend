---
title: "Spring Boot로 나만의 규칙 엔진 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-ImplementyourownRule-EngineinSpringBoot_0.png"
date: 2024-07-09 21:22
ogImage: 
  url: /assets/img/2024-07-09-ImplementyourownRule-EngineinSpringBoot_0.png
tag: Tech
originalTitle: "Implement your own Rule-Engine in Spring Boot"
link: "https://medium.com/@gainjavaknowledge/implement-your-own-rule-engine-in-spring-boot-00713e3a31e0"
isUpdated: true
---




Rule-Engine은 전문가 시스템 프로그램으로, 입력 데이터에 규칙을 실행하고 조건이 일치하면 해당 조치를 실행합니다.

![이미지](/assets/img/2024-07-09-ImplementyourownRule-EngineinSpringBoot_0.png)

소프트웨어 개발에서는 종종 데이터를 필터링하고 처리하기 위해 규칙 또는 조건 집합을 적용해야 하는 상황이 발생합니다. 전통적인 if 및 else 조건을 사용하여 이러한 규칙을 관리하면 유지보수가 어렵고 복잡해질 수 있습니다.
규칙 엔진은 이러한 규칙을 정의하고 실행하기 위한 유연하고 조직화된 접근 방법을 제공합니다.
이 기사에서는 Java 함수형 프로그래밍 원칙을 사용하여 Spring Boot 프로젝트에서 간단한 규칙 엔진을 구축하는 방법에 대해 살펴보겠습니다.

RuleEngine:
규칙 엔진은 규칙의 집합을 관리하고 해당 객체 집합에 적용하는 역할을 담당합니다. 정의된 규칙에 기반하여 객체를 필터링하고 필터링된 결과를 반환합니다.

<div class="content-ad"></div>

먼저, https://start.spring.io/를 사용하여 간단한 스프링 부트 애플리케이션을 하나 생성할 거에요.

이 애플리케이션에서는 먼저 UserController.java 클래스를 생성하고 사용자 목록을 반환하는 REST 엔드포인트를 만들 거에요.

```java
package com.example.spring_boot_rule_engine_demo.controller;

import com.example.spring_boot_rule_engine_demo.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @GetMapping
    public List<User> getAllUser(){
        return userData();
    }

    private List<User> userData() {
        List<User> users = new ArrayList<>();
        User user1 = new User("sumit", 33);
        User user2 = new User("agam", 13);
        User user3 = new User("mohit", 23);
        User user4 = new User("kailash", 43);
        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
        return users;
    }

}
```

![image](/assets/img/2024-07-09-ImplementyourownRule-EngineinSpringBoot_1.png)


<div class="content-ad"></div>

이제 저희는 사용자 나이가 30세보다 많고 이름이 'sum'으로 시작하는 사용자만 가져오는 요구 사항이 있습니다.

그러니 이제 두 가지 규칙을 만들어야하며 이를 클라이언트에게 응답을 반환하기 전에 적용해야 합니다.

규칙 정의:
규칙을 정의하기 위해 Rule이라는 Enum을 사용할 것입니다. Enum 내의 각 규칙은 우리가 평가하려는 특정 조건 또는 기준을 나타냅니다.

```js
package com.example.spring_boot_rule_engine_demo.rule;

import com.example.spring_boot_rule_engine_demo.model.User;

import java.util.function.Predicate;

public enum Rule implements TestRule {

    AGE_GREATER_THAN_30(user -> user.getAge() > 30),
    NAME_STARTS_WITH_SUM(user -> user.getName().startsWith("sum"));

    private final Predicate<User> predicate;

    Rule(Predicate<User> predicate) {
        this.predicate = predicate;
    }

    public Predicate<User> getPredicate() {
        return predicate;
    }
}
```

<div class="content-ad"></div>

TestRule 인터페이스를 만들어서 구현이 없는 메소드를 정의해보겠습니다.

```js
package com.example.spring_boot_rule_engine_demo.rule;

import java.util.function.Predicate;

public interface TestRule {
    <T> Predicate<T> getPredicate();
}
```

자체 Rule Engine 만들기:
그 다음으로 RuleEngine 클래스를 생성할 거에요. 이 클래스는 규칙을 관리하고 실행할 것입니다. 규칙 목록을 유지하고 새로운 규칙을 추가하고 이러한 규칙에 따라 객체를 필터링하는 메소드를 제공합니다.

필터링 로직 구현하기:
RuleEngine 클래스의 filter 메소드에서 우리는 객체 목록을 반복하고 Java 8 Stream API의 allMatch 메소드를 사용하여 각 규칙을 적용합니다. 이 메소드는 주어진 객체에 대해 모든 규칙을 통과하는지 확인합니다. 모든 규칙을 통과하면 해당 객체를 필터링된 목록에 추가합니다.

<div class="content-ad"></div>

```java
package com.example.spring_boot_rule_engine_demo.engine;

import com.example.spring_boot_rule_engine_demo.rule.TestRule;

import java.util.ArrayList;
import java.util.List;

public class RuleEngine<T> {
    private List<TestRule> rules;

    public RuleEngine() {
        this.rules = new ArrayList<>();
    }

    public void addRule(TestRule rule) {
        rules.add(rule);
    }

    public List<T> filter(List<T> items) {
        List<T> filteredItems = new ArrayList<>();
        for (T item : items) {
            if (rules.stream().allMatch(rule -> rule.getPredicate().test(item))) {
                filteredItems.add(item);
            }
        }
        return filteredItems;
    }
}
```

```java
public List<T> filter(List<T> items) {
    List<T> filteredItems = new ArrayList<>();
    for (T item : items) {
        if (rules.stream().allMatch(rule -> rule.getPredicate().test(item))) {
            filteredItems.add(item);
        }
    }
    return filteredItems;
}
```

이 메서드는 rules 목록에 저장된 규칙을 기반으로 항목 목록을 필터링합니다:

- 입력으로 T 유형의 항목 목록을 사용합니다.
- 모든 규칙을 충족하는 항목을 저장할 새로운 목록인 filteredItems를 생성합니다.
- 입력 목록의 각 항목에 대해 Java Streams를 사용하여 항목이 모든 규칙을 충족하는지 확인합니다.


<div class="content-ad"></div>

```js
rules.stream().allMatch(rule -> rule.getPredicate().test(item))
```

- `rules.stream()`은 rules 리스트에서 스트림을 생성합니다.
- `allMatch`는 모든 규칙이 항목에 대해 충족되어야 함을 보장합니다.
- `rule.getPredicate().test(item)`은 각 규칙의 술어를 항목에 적용합니다.

4. 항목이 모든 규칙을 만족하는 경우, 해당 항목이 `filteredItems` 리스트에 추가됩니다.

5. 메서드는 `filteredItems` 리스트를 반환합니다.

<div class="content-ad"></div>

```js
package com.example.spring_boot_rule_engine_demo.model;

public class User {

    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public User() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

이미 UserController.java 클래스에 만들어 놓은 get all user API에서 우리의 rule engine 사용법을 보여줄 것입니다. User 객체의 목록을 만들어서 AGE_GREATER_THAN_30과 NAME_STARTS_WITH_SUM 두 가지 규칙으로 RuleEngine을 초기화합니다. 그런 다음 rule engine의 filter 메서드를 호출하고 User 객체의 목록을 전달합니다. rule engine은 각 사용자에 대해 규칙을 적용하고 필터링된 목록을 반환합니다.

마지막으로 필터링된 목록을 반복하고 지정된 규칙을 충족하는 사용자 목록을 반환합니다.

```js
package com.example.spring_boot_rule_engine_demo.controller;

import com.example.spring_boot_rule_engine_demo.engine.RuleEngine;
import com.example.spring_boot_rule_engine_demo.model.User;
import com.example.spring_boot_rule_engine_demo.rule.Rule;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @GetMapping
    public List<User> getAllUser(){
        RuleEngine<User> ruleEngine = new RuleEngine<>();
        ruleEngine.addRule(Rule.AGE_GREATER_THAN_30);
        ruleEngine.addRule(Rule.NAME_STARTS_WITH_SUM);
        List<User> filteredUser = ruleEngine.filter(userData());
        return filteredUser;
    }

    private List<User> userData() {
        List<User> users = new ArrayList<>();
        User user1 = new User("sumit", 33);
        User user2 = new User("agam", 13);
        User user3 = new User("mohit", 23);
        User user4 = new User("kailash", 43);
        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
        return users;
    }
}
```

<div class="content-ad"></div>


![Image](/assets/img/2024-07-09-ImplementyourownRule-EngineinSpringBoot_2.png)
