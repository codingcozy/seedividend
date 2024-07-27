---
title: "Spring Boot 트랜잭션 관리 방법 쉽게 배우기"
description: ""
coverImage: "/assets/img/2024-07-06-SpringBootTransactionManagement_0.png"
date: 2024-07-06 10:36
ogImage: 
  url: /assets/img/2024-07-06-SpringBootTransactionManagement_0.png
tag: Tech
originalTitle: "Spring Boot Transaction Management"
link: "https://medium.com/devops-dev/spring-boot-transaction-management-5e7c6944d47b"
---


저의 자세한 비디오를 확인해보시고 제 채널을 구독하여 우리 커뮤니티에 가입해보세요. 여러분의 지원은 저에게 큰 힘이 됩니다!

트랜잭션이란 무엇인가요?

트랜잭션이란 응용프로그램에서 수행되는 일련의 작업으로, 한 번에 하나의 작업을 수행하도록 파이프라인에 연결된 작업들의 집합입니다.

![Transaction](/assets/img/2024-07-06-SpringBootTransactionManagement_0.png)

<div class="content-ad"></div>

예를 들어, 항공편 표 예약도 사용자가 자신의 정보를 입력하고 티켓을 예약하기 위해 결제를 해야 하는 거래입니다.

거래 관리가 필요한 이유는 무엇인가요?

![Spring Boot Transaction Management](/assets/img/2024-07-06-SpringBootTransactionManagement_1.png)

위 예제를 통해 거래에 대해 알아봅시다.

<div class="content-ad"></div>

사용자가 정보를 입력하면 사용자 정보가 user_info 테이블에 저장됩니다. 이제 티켓을 예약하기 위해 온라인 결제를 진행하는데, 시스템 장애로 인해 결제가 취소되어 티켓이 예약되지 않습니다. 그러나 문제는 사용자의 정보가 user_info 테이블에 저장되어 있다는 것입니다. 대규모로 이러한 사례가 하루에 수천 건 발생합니다.

따라서 단일 트랜잭션의 경우(여기서는 결제 정보가 아닌 사용자 정보만 저장됨) 저장하는 것은 좋은 방법이 아닙니다.

이러한 문제를 해결하기 위해

Spring은 어노테이션을 사용한 트랜잭션 관리를 제공하여 이러한 문제를 해결합니다. 이와 같은 시나리오에서 Spring은 사용자 정보를 임시 메모리에 저장한 다음 결제 정보를 확인합니다. 결제가 성공하면 트랜잭션을 완료하고, 그렇지 않으면 트랜잭션을 롤백하고 사용자 정보가 데이터베이스에 저장되지 않습니다.

<div class="content-ad"></div>

**@Transactional Annotation**
  
Spring Boot에서는 @Transactional 어노테이션이 Spring Boot 애플리케이션에서 트랜잭션을 관리하고 트랜잭션의 범위를 정의하는 데 사용됩니다.

이 어노테이션은 클래스 레벨이나 메서드 레벨에 적용할 수 있습니다.

데이터 신뢰성과 일관성을 제공합니다.

@ Transactional 어노테이션이 지정된 메서드는 해당 트랜잭션의 컨텍스트 내에서 실행되어야 함을 나타냅니다.

<div class="content-ad"></div>

만약 트랜잭션이 성공하면 디비에 가한 변경 사항은 확정하며, 어떤 트랜잭션에 문제가 발생하면 해당 트랜잭션의 변경 사항을 모두 롤백할 수 있어서 디비가 일관된 상태를 유지할 수 있습니다.

## 스프링 부트에서 트랜잭션 구성하기

- 프로젝트 — Maven
- 언어 — Java
- 스프링 부트 — 3.3.0
- 그룹 — com.ajetch(당신의 사용 사례에 따라 수정할 수 있습니다)
- 아티팩트 — spring transaction(당신의 사용 사례에 따라 수정할 수 있습니다)
- 이름 — spring transaction(당신의 사용 사례에 따라 수정할 수 있습니다)
- 패키지 이름 — com.ajtech
- 패키징 — Jar
- Java — 17

2단계: 다음 단계는 프로젝트가 실행되기 위해 필요한 외부 라이브러리인 의존성을 추가하는 것입니다.

<div class="content-ad"></div>

- 롬복: 컴파일 시간에 작동하는 주석 처리기인 롬복은 게터, 세터 및 toString()과 같은 많은 보일러플레이트 코드를 줄여줍니다.
- 스프링 데이터 JPA: 데이터 소스 액세스가 필요한 스프링 기반 애플리케이션의 개발을 간편화합니다. Java Persistence API (JPA) 위에 구축된 이는 관계형 데이터베이스에서 데이터를 처리하기 위한 편리한 방법을 제공합니다.
- 스프링 웹: Spring MVC 프레임워크를 사용하여 RESTful 애플리케이션을 구축하는 것을 용이하게 합니다.
- MySQL 드라이버: 데이터베이스 마이그레이션 도구로서, 데이터베이스 스키마의 버전 관리와 변경 관리를 간편화합니다.

Entity

```java
package com.ajtech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double salary;
    private String dept;
}
```

```java
package com.ajtech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
```

<div class="content-ad"></div>

```js
패키지 com.ajtech.repository;

import com.ajtech.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
```

```js
패키지 com.ajtech.repository;

import com.ajtech.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
```

```js
패키지 com.ajtech.service;

import com.ajtech.entity.Department;
import com.ajtech.entity.Employee;
import com.ajtech.repository.DepartmentRepository;
import com.ajtech.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Transactional
    public void createDepartmentWithEmployees() {
        Department department = new Department();
        department.setName("HR");
        departmentRepository.save(department);

        Employee emp1 = null;
        emp1.setName("ajtech");
        emp1.setSalary(50000);
        emp1.setDept(department.getName());
        employeeRepository.save(emp1);
    }
}
```

```js
패키지 com.ajtech.controller;

import com.ajtech.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/create-employees")
    public String createDepartmentWithEmployees() {
        try {
            employeeService.createDepartmentWithEmployees();
        } catch (RuntimeException e) {
            return "Transaction rolled back due to: " + e.getMessage();
        }
        return "Department and employees created successfully";
    }
}
```

<div class="content-ad"></div>

```kotlin
spring.application.name=spring-transcation
server.port=9898
# MySQL 구성
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 하이버네이트 구성
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

고마워요, 계속 배우세요!

# ajtech

끝까지 읽어줘서 고마워요. 떠나시기 전에:

<div class="content-ad"></div>

- 작가를 응원하고 팔로우해주시면 감사하겠습니다! 👏
- LinkedIn | YouTube에서 팔로우해주세요

더 많은 흥미로운 내용을 위해 팔로우해주세요

[저를 Medium에서 팔로우해주세요](https://medium.com/@saijanand)