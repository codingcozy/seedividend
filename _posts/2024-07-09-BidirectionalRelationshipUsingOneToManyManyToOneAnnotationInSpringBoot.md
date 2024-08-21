---
title: "Spring Boot에서 OneToMany ManyToOne 애너테이션으로 양방향 관계 설정하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_0.png"
date: 2024-07-09 21:59
ogImage:
  url: /assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_0.png
tag: Tech
originalTitle: "Bidirectional Relationship Using @OneToMany @ManyToOne Annotation In Spring Boot"
link: "https://medium.com/@arijit83work/bidirectional-relationship-using-onetomany-manytoone-annotation-in-spring-boot-3b91980ca222"
isUpdated: true
---

Spring Boot은 JPA(Java Persistence API)와 인기 있는 ORM(Object-Relational Mapping) 프레임워크인 Hibernate를 활용하여 두 개체 간에 상호 일대다 관계를 구현할 수 있게 해줍니다.

# 1. 양방향 일대다 관계란 무엇인가요?

양방향 관계에서는 두 관련된 개체에 대한 정보를 각각 별도로 조회할 수 있습니다. 다시 말해, 한 개체에서 다른 개체로 이동하고 그 반대로 이동할 수 있습니다.

이전 튜토리얼에서는 일대다 관계의 단방향 관계를 살펴보았을 때 하나의 소유자(Owner)가 여러 블로그(Blog)의 작성자인 예시를 살폈었습니다. 이제 소유자(Owner)와 블로그(Blog) 간의 관계를 살펴 양방향 관계를 보여드리겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 블로그와 소유자 간의 관계 예시입니다:

```java
// Blog 클래스
public class Blog {
  private int id;
  ...
  private String title;
  Private Owner owner;
  ...
}

// Owner 클래스
public class Owner {
  private int id;
  ...
  private List<Blog> blogs;
  ...
}
```

단방향 관계를 유지하기 위해 Blog 클래스에 Owner의 참조를 추가했습니다. 이미 소유자가 블로그와 관계를 맺은 상태이기 때문에 Owner 엔티티에는 변경이 없습니다. 이제 블로그를 통해 소유자를 얻을 수 있고, 소유자의 블로그 목록도 얻을 수 있습니다.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_0.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

👉 지금 의문 하나가 생겼어요: One-To-Many 관계를 Many-To-One 관계라고 부를 수 있을까요? 당연히 가능해요. 다음 예시를 살펴보세요: 한 소유주가 많은 블로그를 작성했고, 하나의 출판사가 여러 작가의 책을 출판했다고 가정해봅시다. 결과적으로, Many-To-One 관계에서 많은 엔티티들이 하나의 엔티티와 관련되어 있습니다.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_1.png)

# 2. 스프링 부트 프로젝트 생성

우리는 Spring Initializr을 사용하여 새로운 스프링 부트 프로젝트를 생성할 거에요. 이는 스프링 부트 프로젝트를 위한 기본 구조를 생성할 거에요. 다음 종속성이 추가되었습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Spring Boot DevTools — 필수 개발 도구
- Spring Web — Spring MVC 및 Spring Boot 애플리케이션을 실행할 내장 Tomcat을 위함
- Spring Data JPA — Java Persistence API
- MySQL Driver — MySQL을 위한 JDBC 드라이버 (다른 DB의 경우 해당 DB를 위한 의존성을 선택해야 함)

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_2.png)

이제 GENERATE를 클릭하여 프로젝트 zip 파일을 다운로드하세요. zip 파일을 압축 해제하세요. 그리고 Maven 프로젝트로 Eclipse/Visual Studio Code에서 프로젝트를 가져오세요.

# 3. 데이터베이스에 연결하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리는 MySQL을 데이터베이스로 사용하기 때문에 연결 정보를 애플리케이션에 넣을 거에요. 하이버네이트는 이 정보를 사용해서 데이터베이스에 연결할 거에요. application.properties 파일에는 이름/값 쌍이 포함돼 있어요. 연결 정보는 아래 스니펫에서 설명돼 있어요:

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_3.png)

여기서 datasource.url은 JDBC 연결의 URL로 설정했어요. 데이터베이스 자격 증명은 datasource.user와 datasource.password에 기재돼 있어요.

Spring Boot는 연결 URL로부터 데이터베이스에 대한 필요한 정보를 수집할 수 있기 때문에 datasource.driver-class-name을 명시할 필요가 없어요. 하지만, 우리가 driver-class-name을 명시하는 것이 더 안전할 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

애플리케이션이 실행 중이면 jpa.show-sql을 설정하면 Hibernate SQL 쿼리가 콘솔에 표시됩니다. jpa.hibernate.ddl-auto는 update로 설정되어 있어서 애플리케이션을 다시 시작할 때마다 데이터베이스 스키마가 업데이트됩니다. 그리고 hibernate.dialect는 사용 중인 데이터베이스 방억을 나타냅니다.

# 4. 엔티티

entity라는 패키지를 만들고 그 안에 Blog 클래스를 생성하세요:

이전에 설명한 것처럼, Blog 엔티티의 소유자와 관계를 @ManyToOne 주석을 사용하여 생성했습니다. @JoinColumn을 사용하여 owner_id 열을 정의했습니다; 이는 실제로 Owner를 가리킬 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 entity 패키지에 Owner 클래스를 생성해보세요:

이번에는 Owner 엔티티가 Blog 엔티티와 일대다 관계를 갖습니다. 여기서는 일대다 관계를 정의할 때 @OneToMany 어노테이션에서 mappedBy를 사용했습니다. 이것은 실제로 Blog 엔티티의 owner 속성을 가리킵니다. 결과적으로 owner는 이제 blog 엔티티를 참조하게 됩니다.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_4.png)

데이터베이스에서의 관계는 다음과 같습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_5.png)

# 5. Repositories

Spring Boot에서의 리포지토리는 Spring Data JPA를 사용하여 실제 데이터베이스와 상호 작용할 수 있는 데이터 액세스 레이어입니다. OwnerRepositoryBlogRepository를 확장하여 데이터베이스 작업(삽입, 업데이트, 삭제)을 수행하기 위해 필요한 보일러플레이트 코드의 양을 크게 줄였습니다.

repository라는 패키지를 만들고 그 안에 BlogRepository 인터페이스를 생성하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

리포지토리 패키지에 OwnerRepository 인터페이스를 생성하십시오:

## 6. 컨트롤러

컨트롤러는 하나 이상의 공개 메소드를 가진 클래스입니다. 일반적으로 컨트롤러는 Controller 디렉터리에 배치됩니다. Spring Boot에서 @Controller 또는 @RestController로 주석이 달린 클래스는 컨트롤러로 사용되며, 해당 공개 메소드는 @PostMapping 또는 @GetMapping으로 주석이 달린 경우 HTTP 엔드포인트로 노출됩니다.

결과적으로 http://localhost:PORT/method-name에 대한 HTTP GET 요청은 ExampleController 클래스의 @GetMapping 메소드를 호출합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지를 만들어서 이름을 controller로 지정하고 OwnerController 클래스를 생성하세요. OwnerController에는 네 가지 메소드가 포함되어 있습니다:

- 첫 번째 메소드는 블로그 세부 정보를 포함하여 새로운 소유자를 저장합니다 (/saveOwner).
- 두 번째 메소드는 기존 소유자에게 블로그 세부 정보를 저장합니다 (/saveBlog).
- 세 번째 메소드는 id에 따라 소유자 세부 정보를 가져옵니다 (/getOwner/'id').
- 네 번째 메소드는 id에 따라 블로그 세부 정보를 가져옵니다 (/getBlog/'id').

OwnerRepository와 BlogRepository를 @Autowired 어노테이션을 사용하여 컨트롤러에 주입했습니다. 코드는 다음과 같습니다:

```java
//OwnerController 클래스 예제
package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private BlogReository blogReository;

    // 메소드들 구현

}
```

# 7. 프로젝트 실행

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Visual Studio Code에서 프로젝트를 실행하려면 다음 단계를 따라주세요:

- SpringbootonetomanybiApplication.java 파일을 열어주세요.
- Java 프로그램을 실행하려면 실행(Run)을 클릭해주세요.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_6.png)

Eclipse에서 프로젝트를 실행하려면 다음 단계를 따라주세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- SpringbootonetomanybiApplication.java 파일을 마우스 오른쪽 버튼으로 클릭합니다.
- 그런 다음 Run As를 선택하고 Spring Boot App을 클릭합니다.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_7.png)

결과적으로 Hibernate가 OWNER_DETAILS와 BLOG_DETAILS 두 개의 테이블을 생성했습니다. 테이블 이름은 해당 POJO에 언급되어 있으며, BLOG_DETAILS 테이블을 수정하여 OWNER_DETAILS의 id에 의해 참조되는 foreign key( owner_id)를 추가합니다.

![이미지](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_8.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

application.properties 파일에서 포트를 지정하지 않았기 때문에 프로젝트는 8080 포트에서 실행될 것입니다. 이 프로젝트에서 REST API에 액세스하기 위한 기본 URL은 http://localhost:8080/입니다. 프로젝트가 로컬 머신에서 실행되기 때문에 localhost를 사용했습니다. 프로젝트가 원격 서버나 EC2에서 실행 중이면 해당 서버의 IP 주소나 엘라스틱 IP 주소를 사용해야 합니다.

# 8. REST API 테스트

이제 OwnerController에서 생성한 REST API를 테스트해 보겠습니다.

## 👉 새 소유자 만들기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

새로운 소유자 및 그의/그녀의 블로그를 생성하려면 Postman에서 다음 URL을 호출하십시오:

```js
http://localhost:8080/owner/saveOwner
```

<img src="/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_9.png" />

또한 콘솔에서 감사 로그를 확인하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래는 문서에서 제공한 내용입니다. 하이버네이트는 먼저 OWNER_DETAILS 테이블에 소유자를 삽입한 후, BLOG_DETAILS 테이블에 블로그를 삽입합니다.

이제 데이터베이스의 OWNER_DETAILS 테이블을 살펴보겠습니다:

![OWNER_DETAILS 테이블](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_11.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그리고 BLOG_DEAILS 데이터베이스 테이블:

![BLOG_DEAILS](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_12.png)

BLOG_DETAILS 테이블의 owner_id 열에는 OWNER_DETAILS 테이블의 ID 열 값이 포함되어 있음을 확인할 수 있습니다.

## 👉 새 블로그를 만들어보세요

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```bash
http://localhost:8080/owner/saveBlog?id=1
```

![Image](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_13.png)

Also, check the audit logs in the console:

![Image](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_14.png)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

그 결과로 Hibernate는 Blogs를 저장하기 전에 제공된 id를 사용하여 소유자 세부정보를 먼저 검색합니다.

데이터베이스에서 BLOG_DEAILS 테이블을 살펴보겠습니다:

![BLOG_DEAILS 테이블](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_15.png)

기존 소유자에게 블로그 세부정보를 성공적으로 저장했습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 👉 소유자 세부정보 가져오기

```js
http://localhost:8080/owner/getOwner/1
```

<img src="/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_16.png" />

또한 콘솔에서 감사 로그를 확인하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_17.png" />

주인의 세부 정보와 그의/그녀의 블로그를 소유자 ID를 사용하여 가져왔어요.

## 👉 블로그 가져오기

```js
http://localhost:8080/owner/getBlog/2
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래의 명령어를 콘솔에서 실행하여 감사 로그를 확인해보세요:

![Audit Log](/assets/img/2024-07-09-BidirectionalRelationshipUsingOneToManyManyToOneAnnotationInSpringBoot_19.png)

해당 블로그와 그 소유자를 불러왔습니다. 블로그 ID를 사용했습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 9. 결론

상호 관계로 우리 삶은 더 편리해집니다. 일대일 또는 일대다 관계로 연결된 경우에는 한 엔티티에서 다른 엔티티로 쉽게 이동할 수 있습니다.

원문은 https://codenicetomedear.blogspot.com에서 확인할 수 있습니다.
