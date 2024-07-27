---
title: "Hibernate JPA에서 N1 로딩 문제 완벽 가이드"
description: ""
coverImage: "/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_0.png"
date: 2024-07-07 22:04
ogImage: 
  url: /assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_0.png
tag: Tech
originalTitle: "Ultimate Guide to N+1 Loading Problem in Hibernate JPA."
link: "https://medium.com/@chikim79/ultimate-guide-to-n-1-loading-problem-in-hibernate-jpa-42e8e6cfb9f3"
---


하이버네이트/JPA 시리즈 두 번째 시간에 오신 걸 환영합니다! 이 기사에 뛰어들기 전에, Spring Data JPA에서 모든 데이터베이스 쿼리 기술을 탐색한 첫 번째 기사를 확인하는 것을 추천합니다.

# 배경

## Lazy Loading이란

N+1 로딩에 대해 얘기하기 전에, 먼저 Lazy Loading이 무엇인지 살펴보아야 합니다. Lazy Loading은 JPA의 기능으로, 연관된 객체의 초기화를 필요할 때까지 지연시키는 것을 말합니다. 예를 들어, 간단한 사용자 테이블과 게시물 테이블이 있다고 가정해봅시다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_0.png" />

사용자 목록을 단순히 가져올 때, 이 사용자가 작성한 모든 기사가 필요하지 않을 수 있습니다. 따라서 User.articles에 대한 관계를 게으른 관계로 설정할 수 있습니다. 이는 JPA에게 기본적으로 기사 정보를 로드하지 않도록 지시합니다.

```java
public class User {

  @OneToMany(fetch = FetchType.LAZY)
  List<Article> articles = new ArrayList<>();

...
}
```

이제 JPA에서 사용자 목록을 가져올 때, 'C'로 시작하는 이름을 가진 사용자를 예로 들어보겠습니다. JPA는 연관된 기사 정보를 검색하지 않고 사용자 정보만 검색합니다. 각 사용자의 기사는 액세스할 때만 (즉시) 검색됩니다. 이것이 '게으른 로딩'이라는 용어입니다.

<div class="content-ad"></div>

이는 사용자 정보만 필요한 경우의 성능을 향상시킵니다. (하지만 우리가 곧 보게 될 다른 경우에는 해당되지 않습니다)

## N+1 로딩이란

N+1 로딩 문제는 응용 프로그램이 초기 데이터를 검색하기 위해 한 쿼리를 실행하고 관련 데이터를 검색하기 위해 추가 쿼리를 수행하는 경우에 발생합니다 (예: 사용자 목록). 여기서 관련 데이터는 초기 데이터에 포함되지 않았습니다 (예: 사용자의 기사). 따라서, N명의 사용자가 있다면, 응용 프로그램은 모든 사용자를 가져 오기 위해 1개의 쿼리를 실행하고 각 사용자의 기사를 가져 오기 위해 N개의 추가 쿼리를 실행하여 N+1개의 쿼리를 실행합니다.

그래서 우리의 예에서 사용자와 기사로 구성된 경우, 모든 사용자를 검색했을 때 10명이 있다고 가정합시다 (N=10). 그 후 기사 정보에 액세스할 때 각 사용자에 연관된 기사가 로드되며, 10명의 사용자가 있었으므로 각각에 대해 별도의 새 쿼리가 트리거됩니다. 초기 쿼리를 1로 계산하고 지연 실행된 쿼리 (N=10)에 대한 쿼리 실행이 N+1번이 발생합니다.

<div class="content-ad"></div>

```js
List<User> allUsers = userRepository.getAll(); // 시스템에서 10명의 사용자를 불러옵니다

for(User user in Users) {

  List<Article> myArticles = user.getArticles(); // Lazy Loading을 트리거합니다
  ...
}
```

네트워크, 트랜잭션, 직렬화/역직렬화의 오버헤드가 있기 때문에 각 쿼리 실행마다 상당한 오버헤드가 발생하여 응용 프로그램 및 데이터베이스 서버에 부정적인 영향을 줍니다.

## 모든 것을 단일 쿼리로 넣기

음, 이건 어리석은 것 같다고 말할 수 있습니다. 네이티브 SQL 쿼리를 작성하여 필요한 경우 모든 것을 단일 쿼리로 넣을 수 있습니다.


<div class="content-ad"></div>

```js
SELECT u.name, u.email, a.title 
FROM USERS u
JOIN ARTICLES a on u.id = a.author_id
```

And just grab user information when you just need user information

```js
SELECT u.name, u.email
FROM USERS u
```

And this is perfectly viable strategy, but how can we tell JPA to do the same? We can do that via setting Fetch Strategy.

<div class="content-ad"></div>

# JPA 관계 및 페치 전략

## JPA FetchType

각 관계 주석에 FetchType를 설정할 수 있습니다. 이전에 FetchType를 LAZY로 정의했을 때, EAGER로 설정하여 이 동작을 재정의할 수 있습니다.

```java
public class User {

  @OneToMany(fetch = FetchType.EAGER)
  List<Article> articles = new ArrayList<>();

...
}
```

<div class="content-ad"></div>

지금은 사용자가 검색될 때마다 연관된 기사도 Join Fetching을 통해 검색됩니다. 마치 위에서 SQL을 작성하여 모든 정보를 단일 쿼리로 검색한 것처럼 말이죠. 그러나 이것에 또 다른 단점이 있습니다. 이제 User 객체에 대한 모든 쿼리는 항상 관련된 article을 반환합니다.

JPA에게 가끔은 User 정보만 가져오라고 할 때도 있고, 때로는 하나의 쿼리로 연관된 Article 정보도 로드하라고 말하는 방법은 무엇일까요? 이를 달성하는 다양한 방법이 있습니다. 하나씩 살펴보겠습니다.

## 기본 Fetch 전략

해결책을 살펴보기 전, JPA에서 다른 관계 유형의 기본 fetch 전략을 다루기 전에 알아야 합니다.

<div class="content-ad"></div>

Spring JPA의 기본 동작은 (컬렉션과 같은) 다대다 관계를 게으르게 로드하고 다른 엔티티에 대한 직접 참조와 같은 일대일 관계를 즉시 로드하는 것입니다. 우리의 예제에서 본 것처럼 이 접근 방식은 애플리케이션의 액세스 패턴에 따라 최적이 아닐 수 있습니다. User to Article 관계는 OneToMany이므로 기본 동작은 LAZY입니다. 다시 말해, @OneToMany(fetch = FetchType.LAZY)를 통해 명시적으로 fetch를 LAZY로 설정할 필요가 없었습니다.

![image](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_1.png)

JPA 동작을 제어하는 해결책은 fetch 동작을 재정의하는 것에 관한 것입니다. 

# N+1 문제 깊게 들여다보기

<div class="content-ad"></div>

Entity Relationship Diagram에 다시 돌아갑시다. 이제 하나의 엔티티가 더 추가되었습니다.

![ER다이어그램](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_2.png)

각 관계 유형에 관련된 기본 FetchType을 사용한다고 가정하면, User와 Articles의 관계는 OneToMany로 Lazy가 적용됩니다. Article과 Category의 관계는 ManyToOne으로 Eager가 적용됩니다.

게으르게 로딩된 관계가 사용자와 게시물 사이에서만 존재하기 때문에 N+1 문제는 사용자와 게시물을 다룰 때에만 발생할 것으로 생각할 수 있지만, 게시물과 카테고리를 다룰 때에도 더 쉽게 발생할 수 있습니다.

<div class="content-ad"></div>

데이터베이스에서 모든 기사를 단순히 조회하는 쿼리를 고려해 봅시다(예: Spring JPA Query Method의 findAll()). 이 경우 3개의 다른 카테고리에 속하는 5개의 기사가 나옵니다. 그래픽으로 보면 다음과 같이 보일 수 있습니다.

![이미지](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_3.png)

이로 인해 N+1 로딩이 발생하여 총 4개의 쿼리가 실행됩니다: 기사를 로드하기 위한 초기 쿼리와 각 카테고리를 로드하기 위한 3개의 추가 쿼리. 그래서 카테고리 정보가 필요하지 않았더라도 이를 항상 로드하게 됩니다. N개의 SQL은 다음과 같이 보일 것입니다: select c.* from category c where c.id = ?

최종 결과는 다음과 같이 표시될 수 있습니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_4.png)

원 대 원 관계가 Lazy로 설정되어 있더라도 카테고리에 액세스하면 게을러 초기화를 트리거하는 것으로 인해 N+1이 발생할 수 있습니다.

참고: 이전에는 Lazy optional OneToOne을 지원하지 않았습니다. 이제는 관계 소유자 쪽에서 Lazy 로딩이 구성되어 있다면 지원됩니다. 그렇지 않으면 바이트 코드 강화가 필요합니다. 많은 설명이 있지만, 제가 발견한 가장 좋은 것은 Vlad Mihalcea와 그의 YouTube 채널에서 찾았습니다.

사용자를 쿼리할 때는 어떻게 되나요? 데이터베이스에서 모든 사용자(녹색)를 쿼리한다고 가정해 보겠습니다. (3명의 사용자) 그들은 7개의 기사(빨간색)와 연관되어 있으며, 이 중 5개의 카테고리(파란색)와 즉시 연관되어 있습니다.


<div class="content-ad"></div>

아래는 Markdown 형식으로 표를 작성하였습니다:


![이미지1](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_5.png)

사용자별 연관된 기사에 액세스하면서 게으른 초기화를 트리거하는 경우, 총 몇 개의 쿼리가 실행될까요? 7 + 1이 될까요? 5 + 1이 될까요? 아니요, 정답은 여전히 4입니다. Hibernate가 사용자별 기사에 대한 게으른 초기화를 트리거할 때, 카테고리를 Left Join Fetch도 함께 가져옵니다. 각 게으른 쿼리는 다음과 같이 보이는 SQL 문을 실행합니다: select a.*, c.* from article a left join category c on c.id = a.category_id where a.author = ?

![이미지2](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_6.png)

이 경우, '게으른' 연관이 가능했으므로 각 초기화에 대해 '페치 경계'를 확장할 수 있었습니다.


<div class="content-ad"></div>

즉, 하이버네이트는 초기 쿼리의 "페치 경계(fecth boundary)"를 증가시키기 위해 EAGER 페치를 사용하지 않습니다. 이것은 게으른(지연) 쿼리에만 해당됩니다.

우리 예제 모두에서 LAZY 또는 EAGER로 정의된 데이터베이스의 하위 관계가 무엇이든 추가 쿼리 없이 한 번의 쿼리로 모든 필요한 정보를 검색하는 것이 원하는 바입니다.

![이미지](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_7.png)

이 모든 것을 다룬 후에, 마침내 초기 쿼리의 "페치 경계"를 수동으로 제어하는 방법에 대해 이야기할 수 있게 되었습니다. 주로 사용되는 두 가지 전략이 있습니다.

<div class="content-ad"></div>

- 쿼리에서 JOIN FETCHING 사용하기
- 엔티티 그래프 정의하기

# JPQL/HQL 페치 조인으로 페치 경계 확장하기

다음 섹션에서 Member/User를 서로 바꿔서 사용하고 있습니다. 혼란을 드려 죄송합니다.

“Fetch Join”은 JPQL/HQL을 정의할 때 “Fetch Boundary”를 확장하는 전략입니다. 하이버네이트 문서에서 페치 조인을 다음과 같이 정의합니다.

<div class="content-ad"></div>

다시 말해, Fetch Join은 개발자가 처음 주요 엔티티 쿼리와 함께 어떻게 연관된 엔티티가 로드되어야 하는지 지정할 수 있는 기능입니다.

우리 예시에서는 각 쿼리를 다음과 같이 정의할 수 있습니다.

```js
public interface ArticleRepository extends ListCrudRepository<Article, Long> {

    @Query("select a from Article a left join fetch a.category")
    List<Article> getAll();
```

여기서는 Article에서 Category 관계를 "Join Fetch"합니다.

<div class="content-ad"></div>

```java
public interface MemberRepository extends ListCrudRepository<Member, Long> {

    @Query("""
            select m from Member m
            join fetch m.articles a
            left join fetch a.category
            """)
    List<Member> getAll();
}
```

네스트된 연관관계를 정의할 수도 있어요. 여기서는 각 사용자의 모든 게시물과 각 게시물의 카테고리를 받아올 수 있도록 정의해뒀습니다.

Article to Category가 "LEFT JOIN FETCH"로 정의된 것을 주목하세요. 이는 관계가 존재하지 않을 수 있는 경우에 필요합니다. 우리의 경우에는 Article to Category가 @OneToOne(optional = true)로 정의되어 있어서 필요한 것입니다. 위의 JPQL에서 User to Article은 "LEFT JOIN FETCH"를 사용하지 않았는데, 이는 아무 게시물이 없는 사용자를 무시하는 결과를 가져올 수 있습니다. 이를 원치 않는다면 쿼리를 아래와 같이 수정해야 합니다.

```java
-- 게시물이 없는 회원도 가져오게 됩니다
select m from Member m left join fetch m.articles a left join fetch a.category
```

<div class="content-ad"></div>

JPQL Join Fetching과 마찬가지로 Criteria Query에서 Fetch를 정의할 수 있습니다.

```js
CriteriaBuilder builder = entityManager.getCriteriaBuilder();

CriteriaQuery<Article> criteria = builder.createQuery(Article.class);
Root<Article> root = criteria.from(Article.class);

// 왼쪽 조인 Fetching 카테고리
Fetch<Article, Category> personFetch = root.fetch("category", JoinType.LEFT);

List<Article> articles = entityManager.createQuery(criteria).getResultList();
```

Join Fetch를 활용하면 기본 "Fetch Boundary"를 덮어쓰는 것이 간단해집니다. 이 접근 방식의 단점은 개발자가 각 쿼리마다 수동으로 정의해야 한다는 것입니다. 이때 Entity Graph를 활용할 수 있습니다.

Spring Data JPA에서 데이터베이스 쿼리 기술을 모두 탐색하는 "Exploring Every Database Query Technique in Spring Data JPA"에서 더 자세히 알아보세요.

<div class="content-ad"></div>

# 엔티티 그래프 정의

EntityGraph는 JPA 2.1의 일부로 소개된 기능입니다. 엔티티의 속성 및 관계의 하위 집합을 데이터베이스에서 단일 쿼리로 가져오도록 정의하는 템플릿입니다. 이를 통해 개발자는 엔티티의 어떤 속성 또는 관계가 즉시 로드되어야 하는지, 어떤 것이 지연되어야 하는지를 지정할 수 있습니다.

Spring Data의 Query Methods 또는 Spring Data의 Specification을 사용하고 있다면 EntityGraph를 사용하여 "Fetch Boundary"를 제어할 수 있습니다.

EntityGraph는 보통 엔티티 클래스에서 정의됩니다.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-07-UltimateGuidetoN1LoadingProbleminHibernateJPA_8.png)

사용자(멤버) - 게시물 - 카테고리의 예제로 가보겠습니다. 우리는 member.articles와 article.category를 모두 가져오기를 원합니다. @NamedEntityGraph를 구성하여 이를 달성할 수 있습니다.

```java
@Entity
@Data
@NamedEntityGraph(
  name = "graph.Member.articles.category",
  attributeNodes = 
      @NamedAttributeNode(value = "articles", subgraph = "article.category"),
  subgraphs = {
      @NamedSubgraph(
              name = "article.category",
              attributeNodes = @NamedAttributeNode("category")
      )
  }
)
public class Member {

    @Id @GeneratedValue
    private Long id;

    private String name;

    private String email;

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    private List<Article> articles;
}
```

여기서 graph.Member.articles.category라는 이름의 EntityGraph를 정의합니다. 항상 관련된 게시물을 가져오도록 설정되며 또한 게시물에 대한 카테고리 연관을 가져오도록 구성된 subgraph가 정의됩니다.


<div class="content-ad"></div>

Spring Data Query Methods에서 @EntityGraph 주석을 사용하면 이를 간단히 사용할 수 있습니다.

```java
@EntityGraph("graph.Member.articles.category")
List<Member> getUsingEntityGraphByNameStartingWith(String name);
```

이렇게하면 각 관계에 대해 "Left Join"을 사용하는 SQL이 생성됩니다.

만약 Article - Category를 Article에서 정의하고 싶다면 fetch 구성을 재사용할 수도 있습니다.

<div class="content-ad"></div>

```java
@Entity
@Data
@NamedEntityGraph(
        name = "graph.Article.category",
        attributeNodes = @NamedAttributeNode(value = "category")
)
public class Article {

    @Id
    @GeneratedValue
    private Long id;
```

이제 Member 클래스에서는 subgraph를 정의할 필요가 없고, Article 엔티티에 정의된 그래프를 간단히 사용할 수 있습니다.

```java
@Entity
@Data
@NamedEntityGraph(
    name = "graph.Member.articles.category",
    attributeNodes = 
      @NamedAttributeNode(value = "articles", subgraph = "graph.Article.category")
)
public class Member {

    @Id @GeneratedValue
    private Long id;
```

EntityGraph를 사용하면 기존 정의를 재사용하고 새로운 사용 사례가 발생할 때만 새로 정의하면 됩니다.

<div class="content-ad"></div>

만약 원한다면, 쿼리 자체에서 일회성 EntityGraph를 직접 정의할 수도 있습니다.

```js
@EntityGraph(attributePaths = {"category"})
List<Article> findByTitleStartingWith(String title);
```

EntityGraph를 사용할 때 무한 루핑에 주의해야 합니다. 예를 들어, Member가 Member인 친구 관계를 가지고 있는 경우, EntityGraph는 영원히 루핑을 시도하지 않도록 설정되어야 합니다. 예시) 최상위 레벨 친구만 가져오고 친구의 친구는 가져오지 않도록 설정.

# N+1 성능 향상을 위해 BatchSize 사용하기

<div class="content-ad"></div>

또 다른 전략은 "Fetch Boundary"에 대한 토론과 직접적으로 관려되진 않지만 BatchSize 입니다.

BatchSize는 기본적으로 N+1의 일부인 N을 그룹화하여 SQL을 IN 쿼리로 만들어 전체 쿼리 수를 줄입니다.

```js
select * from category where (?, ?, ? ....)
```

Article-Category의 예제에서, 각각의 고유한 카테고리를 가진 100개의 기사를 검색한다고 가정해보겠습니다. 기본적으로는 101개의 쿼리가 발생할 것입니다. 그러나 Entity 클래스에 정의된 BatchSize(size=20)를 사용하면 총 6개의 쿼리로 줄어들 것입니다, (100/20) + 1.

<div class="content-ad"></div>

```java
@Entity
@Data
@BatchSize(size=20)
public class Category {
    @Id @GeneratedValue
    private Long id;

    private String name;
}
```

# 결론

하이버네이트와 JPA에서 N+1 문제를 해결하는 것은 레이지로딩 또는 이저로딩을 사용하거나 Fetch Joins 및 Entity Graphs와 같은 고급 기능을 사용하는 전략적 선택을 포함합니다. 이러한 옵션을 이해하면 응용 프로그램에서 데이터 가져오기를 효과적으로 최적화할 수 있습니다.

최종적으로 도메인 주도 개발(Domain-Driven Development)과 함께 Entity Design에 대해 더 자세히 논의하여 이러한 선택을 더욱 간단히 만들 것입니다. 기대해주세요!


<div class="content-ad"></div>

하지만 그 전에 다룰 사항이 몇 가지 있어요. 그래서 다음으로 'Tx vs 세션 바운더리'에 관한 다음 글이 있습니다.