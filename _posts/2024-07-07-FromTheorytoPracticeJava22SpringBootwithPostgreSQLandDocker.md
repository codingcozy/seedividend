---
title: "이론에서 실습까지 Java 22, Spring Boot, PostgreSQL, Docker 사용법"
description: ""
coverImage: "/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_0.png"
date: 2024-07-07 20:07
ogImage: 
  url: /assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_0.png
tag: Tech
originalTitle: "From Theory to Practice: Java 22 Spring Boot with PostgreSQL and Docker"
link: "https://medium.com/@samuelwatson.swe/from-theory-to-practice-java-22-spring-boot-with-postgresql-and-docker-af0ccf6a769f"
isUpdated: true
---




![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_0.png)

최신 기술로 API를 개발하고 싶으신가요? 시작해봅시다!

함께 Java 22, Spring Boot, PostgreSQL 및 Docker Compose를 활용할 거에요.

현재의 빠른 기술 환경에서 효율적이고 확장 가능하며 컨테이너화된 애플리케이션을 만드는 것은 더 이상 선택이 아닌 필수입니다.

<div class="content-ad"></div>

# 사전 준비 사항

## Java 22 설치

아래 지시사항을 따라 작업 체제에 따라 Java 22를 설치하고 경로가 올바르게 설정되었는지 확인해주세요.

이 게시물에서는 Amazon Corretto를 사용할 것입니다.

<div class="content-ad"></div>

도커 데스크톱 설치하기

# 시작하기

## 맥락 설정

이 블로그의 모든 글과 마찬가지로, 실제 세계 응용 프로그램의 맥락에 맞춰 설명하려고 합니다. 먼저 SQL 대 NoSQL의 장단점과 도커를 사용해야 하는 이유에 대해 알아보겠습니다. 그런 다음에는 구축해나갈 거예요.



<div class="content-ad"></div>

SQL 대비 NoSQL 데이터베이스

먼저, SQL 데이터베이스와 NoSQL 데이터베이스를 사용하는 사례에 대해 이야기해봅시다. SQL을 사용해야 하는 이유에 대한 사례는 다음과 같습니다:

- 데이터 무결성 — SQL은 더 많은 데이터 무결성을 시행하는 것으로 알려져 있습니다. 데이터가 항상 일관되고 특정 제약 조건을 따르는지 검증할 수 있습니다. 예를 들어, 온라인 자동차 부품 재고가 있다면, 나열된 모든 자동차 부품이 유효한 공급업체 ID를 가져야 하며, 그 ID는 공급업체에 대한 모든 정보가 포함된 다른 테이블과 연결되어야 합니다.
- ACID(원자성, 일관성, 격리성, 지속성) 준수 — 현재 많은 현대 NoSQL 데이터베이스가 ACID를 준수하고 있지만, SQL 데이터베이스는 이를 오래 전부터 지원하고 ACID 준수에 대한 평판을 갖고 있습니다. ACID 준수의 예는 고객이 적금에서 수표로 돈을 이체할 때, 데이터베이스 트랜잭션의 어느 부분이 실패하더라도 이전 상태로 롤백되어 부분적 트랜잭션이 발생하지 않는 것입니다. 참고: 이것은 ACID 준수의 작은 예시일 뿐이며, 매우 깊은 주제일 수 있습니다.
- 복잡한 쿼리와 집계 — SQL 데이터베이스는 더 복잡한 쿼리와 집계를 지원하는 것으로 알려져 있습니다. 예를 들어, 각 제품별 시간당 평균 매출을 검색하는 쿼리를 만들고 싶을 수 있습니다 (NoSQL은 이 작업이 더 어려울 수 있으며 더 많은 응용 프로그램 로직이 필요할 수 있음).
- 스키마가 자주 변경되지 않고 유연할 필요가 없음 — NoSQL은 열을 추가하는 것이 SQL에 비해 쉬우며 응용프로그램에 유연성을 갖기가 어렵습니다.
- 스케일링과 성능에 더 많은 투자를 할 의사가 있음 — NoSQL 데이터베이스는 일반적으로 스케일 업이 더 잘 되며, 쿼리가 복잡하지 않다면 성능이 더 우수합니다.

어플리케이션과 함께 Docker를 사용하는 이유?

<div class="content-ad"></div>

도커의 장점은 정말 많습니다. 오늘날 도커는 산업 표준이 되었죠. 도커를 사용하면 여러 가지 이점이 있습니다.

- 빠른 시작 및 개발 시간 — 도커를 사용하면 애플리케이션이 거의 모든 기기에서 실행되고 필요한 종속성이 모두 포함됩니다. 이를 통해 새로운 환경(예: 프로덕션 환경 대비 사전 프로드 환경)에서 애플리케이션을 쉽게 시작할 수 있고, 개발자가 더 빨리 테스트할 수 있습니다. 예를 들어, Java Spring Boot 애플리케이션이 이미 Java, Gradle, 필요한 데이터베이스 종속성을 포함하고 있다면, 개발자들은 특정 버전의 Java, Gradle 및 데이터베이스 종속성을 설치하는 데 시간을 소비할 필요가 없게 됩니다.
- 확장 가능 — 컨테이너를 사용하면 여러 대의 기기에서 애플리케이션 인스턴스를 쉽게 생성할 수 있으며, 각 컨테이너는 독립적으로 실행됩니다. 한 기기에서도 여러 개의 인스턴스를 추가로 생성하거나 CPU 및 메모리 사용량을 제한할 수 있습니다.

도커의 이점은 이외에도 더 많습니다. 이는 그중에 몇 가지에 불과합니다.

## 애플리케이션 빌드하기

<div class="content-ad"></div>

오늘은 기본적인 온라인 서점을 만들어 보려고 해요. 이를 위해 데이터베이스에 여러 개의 테이블이 필요할 거에요. 이 어플리케이션은 다음을 보여줄 거에요 —

- 어떻게 PostgreSQL 인스턴스를 빠르게 설정하는지
- 데이터베이스 관리를 위한 PGAdmin 사용법 (서버 추가 포함)
- 온라인 서점을 위한 테이블 생성하는 방법
- 데이터베이스로 직접 데이터 입력하는 방법
- 잘 구조화된 API 생성하고 데이터베이스에서 데이터 검색하는 방법
- 어플리케이션을 도커화하고 도컴포즈 스택에 추가하는 방법

다음 세션에서 API에 더 복잡한 쿼리를 추가하는 방법을 안내할 거에요.

그럼 이렇게 말고 시작해볼까요?

<div class="content-ad"></div>

## Step 1: Spring Boot 애플리케이션 초기화

먼저 https://start.spring.io/ 로 이동해보겠습니다. 이 사이트는 Spring Boot 프로젝트를 만드는 데 탁월한 도구입니다. 여기서 선호하는 빌드 자동화 시스템을 선택할 수 있고(Gradle, Apache Maven (Groovy 또는 Kotlin)), 언어 및 버전(Java, Kotlin, Groovy)을 선택할 수 있으며, 애플리케이션 이름을 지정할 수도 있습니다.

프로젝트에 다음 정보를 입력해주세요.

- 빌드: Gradle (Groovy)
- 언어: Java
- Spring Boot: 3.3.1
- 그룹: com.empiricaldeveloper
- 아티팩트: online-bookstore
- 이름: OnlineBookstore
- 설명: 온라인 서점용 Spring Boot 애플리케이션
- 패키지 이름: com.empiricaldeveloper.onlinebookstore

<div class="content-ad"></div>

의존성

우리 애플리케이션에는 다음을 추가할 것입니다. 오른쪽 상단의 "의존성 추가"를 클릭하여 추가하세요.

- 도커 컴포즈 지원
- 스프링 웹
- 스프링 부트 데브 툴
- PostgreSQL 드라이버

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_1.png)

<div class="content-ad"></div>

### Step 2: IDE로 가져오기

모든 필드를 채웠다면 하단의 "생성"을 클릭하세요.

"생성"을 클릭하면 프로젝트 파일이 기기에 다운로드됩니다. 이제 이 폴더를 IDE로 끌어다 놓을 수 있어요.

제 IDE는 VS Code를 사용하고 있어요. 이것은 모두 개인 취향이고 어떤 개발자들은 Eclipse나 Intellij-IDEA를 선호할 수도 있어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_2.png)

## 단계 3: 포스트그레 + PGAdmin을 위한 도커 컴포즈 생성

우선 우리는 모든 것을 도커를 사용하여 연결하지는 않을 겁니다. 제 개인적인 의견으로 이는 개발 속도를 높일 수 있습니다 (도커 컨테이너를 매번 실행하지 않아도 되기 때문입니다).

그러나 우리는 데이터베이스로 포스트그레를 구동해야 하며 PGAdmin도 필요합니다. PGAdmin은 브라우저를 통해 데이터베이스를 관리하는 도구입니다.


<div class="content-ad"></div>

먼저, 깃허브의 compose.yml 파일을 수정해봅시다.

```js
서비스:
  postgres:
    이미지: postgres:latest
    컨테이너_이름: postgres
    환경:
      POSTGRES_USER: onlinebookstore
      POSTGRES_PASSWORD: bookstorepassword
      POSTGRES_DB: postgres
    포트:
      - "5432:5432"
    볼륨:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    이미지: dpage/pgadmin4:latest
    컨테이너_이름: pgadmin
    환경:
      PGADMIN_DEFAULT_EMAIL: admin@bookstore.com
      PGADMIN_DEFAULT_PASSWORD: bookstoreadmin
    포트:
      - "5050:80"
    종속성:
      - postgres

볼륨:
  postgres_data:
```

이 도커 컴포즈 파일은

- 포트 5432에 매핑된 PostgreSQL 데이터베이스 인스턴스를 생성합니다. (Postgres의 기본 포트)
- 브라우저를 통해 postgres를 관리할 수 있는 PGAdmin 인스턴스를 생성합니다.
- 도커 볼륨을 생성합니다. (이를 통해 컨테이너가 중지되거나 제거되어도 데이터가 유지됩니다)

<div class="content-ad"></div>

터미널에서 다음을 실행하여 이제 그들을 시작할 수 있습니다.

```js
docker-compose up -d
```

![여행 이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_3.png)

## 단계 4: PGAdmin에 우리의 PostgreSQL 서버 추가하기

<div class="content-ad"></div>

가장 먼저 할 일은 PgAdmin에 로그인하는 것입니다. 브라우저에서 다음 URL로 이동하세요.


http://localhost:5050/


이제 compose.yml 파일에서 제공된 PGADMIN_DEFAULT_EMAIL 및 PGADMIN_DEFAULT_PASSWORD를 사용하여 로그인할 수 있습니다.

다음 페이지에서 "Servers"를 우클릭하고 "Register"를 클릭하여 서버를 등록할 수 있습니다.

<div class="content-ad"></div>


아래는 "Connection" 탭으로 이동하여 POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB 및 포트 아래에서 (우리의 compose.yml에서도 동일하게) 다음 정보를 입력하십시오. 

![online-bookstore-dev](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_4.png)

서버 이름을 online-bookstore-dev로 지정합시다.

![online-bookstore-dev](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_5.png)

<div class="content-ad"></div>

여행 중인 길을 잃었다고 느껴지나요? 걱정하지 마세요! 당신을 위한 해결책이 있어요.

```js
호스트 이름 / 주소: host.docker.internal
포트: 5432
사용자 이름: onlinebookstore
비밀번호: bookstorepassword
```

[여기를 클릭](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_6.png)해서 새 서버를 등록해보세요! "저장" 버튼을 클릭하여 변경 내용을 저장합니다.

<div class="content-ad"></div>

6단계: 포스트그레스 인스턴스에 테이블 추가하기

데이터베이스 'postgres'를 마우스 오른쪽 버튼으로 클릭하고 '쿼리 도구'를 클릭하여 쿼리 도구를 엽니다.

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_7.png)

이제 다음 SQL을 쿼리 도구에 삽입하게 됩니다.

<div class="content-ad"></div>

중요한 패스워드 관련 참고사항: 데이터베이스에 패스워드를 저장하는 것은 권장하지 않습니다. 이러한 상황을 다루는 더 좋은 방법이 많이 있습니다. 이것은 단지 데모용인 것이니 참고하세요.

```javascript
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    published_date DATE,
    genre VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BookInstances (
    instance_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Books(book_id),
    status VARCHAR(20) CHECK (status IN ('available', 'checked_out', 'reserved')) NOT NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Checkouts (
    checkout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    instance_id INT REFERENCES BookInstances(instance_id),
    checkout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP
);
```

테이블을 생성하려면 위의 SQL을 복사하여 붙여넣고 스크린샷에서 본 것처럼 “스크립트 실행”을 클릭하세요. Markdown 형식으로 사진을 보려면 아래와 같이 표현하면 됩니다.  

![이미지 내용](이미지 URL)

<div class="content-ad"></div>

여기 우리 테이블 스키마에 대한 분석입니다.

사용자 테이블:

- user_id: 각 사용자의 고유 식별자.
- username: 사용자의 사용자 이름.
- email: 사용자의 이메일 주소.
- password: 사용자의 비밀번호 (실제 애플리케이션에서는 이상적으로 해시화됨).
- created_at: 사용자가 생성된 타임스탬프.

책 테이블:

<div class="content-ad"></div>

- book_id: 각 책의 고유 식별자.
- title: 책의 제목.
- author: 책의 저자.
- isbn: 책의 고유한 ISBN 번호.
- published_date: 책의 발간 날짜.
- genre: 책의 장르.
- created_at: 책이 추가된 타임스탬프.

BookInstances 테이블:

- instance_id: 각 책 인스턴스의 고유 식별자.
- book_id: Books 테이블의 book_id를 참조합니다.
- status: 책 인스턴스의 상태(available, checked_out, reserved).
- due_date: 책을 반납해야 하는 날짜(대출된 경우).
- created_at: 책 인스턴스가 생성된 타임스탬프.

Checkouts 테이블:

<div class="content-ad"></div>


# 단계 7: 표에 항목 추가하기

나중에 API에서 데이터를 삽입하기 위한 몇 가지 POST 루트를 추가할 것이지만, 시작할 때 데이터베이스에 일부 데이터를 입력할 것입니다. Create Table SQL을 제거하고 데이터베이스에 데이터를 입력하기 위해 다음 SQL을 사용하세요.

```js
-- Users에 삽입
INSERT INTO Users (username, email, password) VALUES
('johndoe', 'john@example.com', 'password123'),
('janedoe', 'jane@example.com', 'password456');

-- Books에 삽입
INSERT INTO Books (title, author, isbn, published_date, genre) VALUES
('위대한 개츠비', 'F. Scott Fitzgerald', '9780743273565', '1925-04-10', '클래식'),
('아들을 죽이다', 'Harper Lee', '9780061120084', '1960-07-11', '클래식'),
('1984', 'George Orwell', '9780451524935', '1949-06-08', '디스토피아');

-- BookInstances에 삽입
INSERT INTO BookInstances (book_id, status, due_date) VALUES
(1, 'available', NULL),
(1, 'checked_out', '2024-07-15'),
(2, 'available', NULL),
(3, 'reserved', '2024-07-20'),
(3, 'available', NULL);

-- Checkouts에 삽입
INSERT INTO Checkouts (user_id, instance_id, checkout_date, return_date) VALUES
(1, 2, '2024-07-01 10:00:00', NULL), -- 존 도가 "위대한 개츠비"를 대출합니다
(2, 4, '2024-07-02 11:00:00', NULL); -- 제인 도가 "1984"를 예약합니다
```

<div class="content-ad"></div>

# Step 8: 포스트그레SQL에서 데이터 보기

퍼블릭 스키마로 이동해서 "데이터 보기/편집"을 클릭하면 포스트그레SQL에서 데이터를 볼 수 있어요.

![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_9.png)

# Step 9: 우리의 Java 어플리케이션 실행하기

<div class="content-ad"></div>

애플리케이션에서 API 경로나 실제 기능이 없더라도, 보통은 "hello-world" 스타일의 애플리케이션을 실행하여 새로운 기능을 추가할 때 문제를 쉽게 해결할 수 있도록 하는 것이 좋은 실천 방법입니다.

아래 명령을 실행하여 애플리케이션을 실행할 수 있습니다.

```js
gradle bootRun
```

이를 실행하면 서버가 Tomcat 서버를 사용하여 포트 8080에서 실행 중임을 나타내는 다음 내용이 출력됩니다.

<div class="content-ad"></div>

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_10.png)

# 10단계: 구성, 종속성 및 폴더 설정하기

아래 파일 경로에 다음 구성을 추가할 것입니다. 이를 통해 API가 데이터베이스에 연결할 수 있게 됩니다.

```js
online-bookstore/src/main/resources/application.properties
```

<div class="content-ad"></div>

```yaml
# PostgreSQL 구성
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=onlinebookstore
spring.datasource.password=bookstorepassword
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA 구성
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

아래 예시 확인

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_11.png)

이제 JPA를 의존성에 추가할 것이며, 데이터베이스에서 데이터와 상호작용하기 위해 JPA를 사용할 것입니다.

<div class="content-ad"></div>

지금은 API를 구조화하기 위해 나중에 생성할 파일들을 위한 필수 폴더를 만들 것입니다. 다음 경로에 다음 폴더를 생성해주세요.

```js
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_12.png)

<div class="content-ad"></div>


온라인 서점 프로젝트의 폴더 구조:

- controller
- model
- repository
- service

## 단계 11: 데이터베이스에서 책을 읽는 API 경로 생성하기


<div class="content-ad"></div>

# 모델 생성하기

먼저 데이터베이스의 Books 테이블에 대한 모델을 생성할 것입니다. 이 파일을 아래와 같이 만들어주세요.

파일명은 `Books.java`로 지정하겠습니다.

<div class="content-ad"></div>

다음 파일 경로에서

```js
online-bookstore/src/main/java/com/empiricaldeveloper/onlinebookstore/model
```

위와 같은 패키지 경로에 책을 나타내는 클래스를 만들어 봅시다.

```js
package com.empiricaldeveloper.onlinebookstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;

    // Getter와 Setter 메서드
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
```

리포지토리 만들기

<div class="content-ad"></div>

해당 파일을 추천된 파일 경로에 생성해주세요.

```java
BooksRepository.java
```

```java
package com.empiricaldeveloper.onlinebookstore.repository;

import com.empiricaldeveloper.onlinebookstore.model.Books;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
}
```

서비스를 생성합니다.

<div class="content-ad"></div>

제안된 파일 경로에 다음과 같은 파일을 만들어주세요.

```js
BooksService.java
```

```js
online-bookstore/src/main/java/com/empiricaldeveloper/onlinebookstore/service
```

파일 안에는 다음 소스 코드를 넣어주세요.

<div class="content-ad"></div>

```java
package com.empiricaldeveloper.onlinebookstore.service;

import com.empiricaldeveloper.onlinebookstore.model.Books;
import com.empiricaldeveloper.onlinebookstore.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BooksService {

    @Autowired
    private BooksRepository bookRepository;

    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    public Books getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }
}
```

컨트롤러 생성하기

```java
컨트롤러 생성하기
```

제안된 파일 경로에 다음 파일을 생성하세요


<div class="content-ad"></div>

```js
BooksController.java
```

```js
online-bookstore/src/main/java/com/empiricaldeveloper/onlinebookstore/controller
```

아래 소스 코드를 파일에 추가해주세요.

```js
package com.empiricaldeveloper.onlinebookstore.controller;

import com.empiricaldeveloper.onlinebookstore.model.Books;
import com.empiricaldeveloper.onlinebookstore.service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BooksController {

    @Autowired
    private BooksService booksService;

    @GetMapping
    public List<Books> getAllBooks() {
        return booksService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Books getBookById(@PathVariable Long id) {
        return booksService.getBookById(id);
    }
}
```

<div class="content-ad"></div>

당신의 디렉토리는 다음과 같이 보여야 합니다

![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_13.png)

# 단계 12: API 실행 및 엔드포인트 호출

이제 마침내 API를 실행하고 몇 개의 엔드포인트를 호출할 차례입니다.

<div class="content-ad"></div>

모든 파일을 저장하는 것을 잊지 마세요!

API를 실행하려면 아래와 같이 실행하세요.

```js
gradle bootRun
```

브라우저에서 아래 엔드포인트를 열어 모든 책을 볼 수 있습니다.

<div class="content-ad"></div>

```js
http://localhost:8080/api/books
```

![이미지](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_14.png)

특정 책의 데이터를 가져오려면 ID를 전달하세요.

```js
http://localhost:8080/api/books/1
```

<div class="content-ad"></div>

![Step 13](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_15.png)

# 단계 13: API에 Docker 추가하기

이제 Docker만 추가하면 됩니다!

프로젝트의 루트 디렉토리에 다음 파일을 만드십시오. 이 파일은 응용 프로그램을 빌드하는 지침을 작성합니다. 이는 Docker에게 java22용 gradle을 사용하여 응용 프로그램을 컴파일하도록 지시한 다음 amazoncorretto:22를 사용하여 응용 프로그램을 실행하도록 합니다.

<div class="content-ad"></div>

```js
FROM gradle:jdk22 as build

# Gradle 프로젝트를 이미지로 복사합니다
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

# 테스트를 실행하지 않고 애플리케이션을 빌드합니다
RUN gradle build --no-daemon -x test || ./gradlew build --no-daemon -x test

# 런타임에 Amazon Corretto 이미지를 사용합니다
FROM amazoncorretto:22

# 빌드 단계에서 생성된 JAR 파일을 복사합니다
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

# 애플리케이션을 실행합니다
CMD ["java", "-jar", "app.jar"]
```

이제 도커 이미지를 빌드하려면 다음 명령을 실행해야 합니다.

```js
docker build -t bookstore-app .
```

![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_16.png)


<div class="content-ad"></div>

이 명령어는 현재 디렉토리에 있는 Dockerfile을 사용하여 도커 컨테이너를 "bookstore-app"으로 태그하게 됩니다.

# 단계 13: 우리 API를 Docker Compose에 추가하기

도커 컴포즈에 API를 추가하려면 "app"이라는 새 섹션을 추가해야 합니다.

완성된 도커 컴포즈 파일은 다음과 같습니다.

<div class="content-ad"></div>

```yaml
services:
  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_USER: onlinebookstore
      POSTGRES_PASSWORD: bookstorepassword
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@bookstore.com
      PGADMIN_DEFAULT_PASSWORD: bookstoreadmin
    ports:
      - "5050:80"
    depends_on:
      - postgres

  app:
    build: .
    container_name: bookstore-app
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/postgres
      SPRING_DATASOURCE_USERNAME: onlinebookstore
      SPRING_DATASOURCE_PASSWORD: bookstorepassword

volumes:
  postgres_data:
```

이 설정을 통해 API가 포트 8080에서 실행되며 API로 사용자 이름과 비밀번호, 그리고 데이터베이스 연결 URL을 전달합니다.

운영 환경에서는 이러한 값을 안전한 위치에 저장하고 컨테이너를 배포하는 동안 주입할 것입니다.

이제 전체 응용 프로그램을 실행할 수 있습니다.

<div class="content-ad"></div>

```bash
docker-compose up
```

![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_17.png)

이제 브라우저에서 URL을 다시 입력할 수 있어요!

![image](/assets/img/2024-07-07-FromTheorytoPracticeJava22SpringBootwithPostgreSQLandDocker_18.png)


<div class="content-ad"></div>

그게 다에요!

다음 포스트에서는 이 예시를 재사용하여 더 복잡한 쿼리를 추가하고 중요한 데이터베이스 개념을 설명할 예정이에요.

읽어주셔서 감사합니다!

고지: 이 안내서 작성 중에 OpenAI의 ChatGPT가 빠른 코드 생성, 예시 및 지침을 위해 사용되었습니다.