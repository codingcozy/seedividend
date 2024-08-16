---
title: "엔터티 클래스가 정말 필요한가요"
description: ""
coverImage: "/assets/img/2024-07-12-Doyoureallyneedentityclasses_0.png"
date: 2024-07-12 21:27
ogImage: 
  url: /assets/img/2024-07-12-Doyoureallyneedentityclasses_0.png
tag: Tech
originalTitle: "Do you really need entity classes?"
link: "https://medium.com/better-programming/do-you-really-need-entity-classes-d9656534ea82"
isUpdated: true
---




<img src="/assets/img/2024-07-12-Doyoureallyneedentityclasses_0.png" />

웹 브라우저는 데이터 시각화에 편리한 도구입니다. 브라우저에서는 비교적 적은 노력으로 대화형 차트나 표로 데이터를 표현할 수 있습니다.

많은 준비된 옵션 중에서 상상할 수 있는 모든 차트를 선택할 수 있습니다 (예를 들어 https://observablehq.com/@d3/gallery 또는 https://plotly.com/javascript를 살펴보세요). 그래서 기업에서는 모니터링과 데이터 분석을 위해 사용자 정의 웹 응용 프로그램을 사용하는 것이 일반적입니다.

웹 응용 프로그램의 백엔드는 어떤 언어로든 작성할 수 있습니다. Java는 다른 옵션보다 몇 가지 이점을 가지고 있습니다. 예를 들어, 미리 구성된 애플리케이션 서버인 Tomcat을 사용하면 배포가 쉽습니다. 백엔드가 데이터베이스와 인가된 사용자 간의 데이터를 중계하는 경우, 개발이 빠릅니다.

<div class="content-ad"></div>

상상해보세요. 데이터 웨어하우스에서 유도된 통계를 표시하는 응용 프로그램이 있습니다. 많은 SQL 쿼리의 결과를 표시합니다. 새로운 비즈니스 요구에 따라 응용 프로그램을 자주 개선해야 합니다. 각 쿼리의 결과를 로드하고 직렬화하기 위한 개별 클래스가 필요할까요?

쿼리 결과가 배열로 변환되어야 하는 제품을 조인하는 경우 JPA 쿼리를 사용하면 가능한 짧은 코드를 생성할 수 있습니다.

그러나 결과 객체에 중첩된 객체의 배열이 포함되지 않은 경우, 엔티티 없이 코드가 더 짧고 조정하기가 더 쉽습니다. 이 게시물에서 이러한 경우를 탐구했습니다.

# 엔티티란 무엇인가요?

<div class="content-ad"></div>

데이터베이스에서 로드된 데이터는 일반적으로 DTOs(데이터 전송 객체) 또는 엔티티라고 불리는 클래스로 변환됩니다. 양 용어 모두 기능적으로 정확히 같은 의미를 갖습니다. 엔티티는 SQL 쿼리 결과에서 한 행 또는 여러 관련 행을 나타내는 클래스입니다. 데이터가 네트워크로 전송될 때, 엔티티는 편리하게 JSON으로 변환됩니다.

엔티티는 코드입니다. 애플리케이션 코드가 짧을수록 개발이 쉬워집니다. 애플리케이션이 많은 테이블을 처리하거나 테이블에 많은 열이 있는 경우, 엔티티의 코드는 Java 코드의 큰 부분을 차지합니다. 엔티티 내의 코드에는 로직이 없지만 맞춤법 오류가 발생할 수 있는 텍스트 값을 가진 어노테이션이 많이 포함되어 있습니다.

## 샘플 애플리케이션

Spring Boot는 샘플 Java 웹 애플리케이션을 쉽게 실행할 수 있게 해줍니다. 누구나 샘플 애플리케이션의 소스 코드를 다운로드하여 실행할 수 있습니다. 또한 의존성을 포함하고 약간 줄어든 코드로 작성할 수 있습니다. 따라서 제 데모 애플리케이션은 Spring Boot에 의존합니다. 그러나 제 생각에는 데모 애플리케이션이 아닌 개발에 가장 직접적인 옵션이라고 생각하지는 않습니다.

<div class="content-ad"></div>

애플리케이션은 MySQL 데이터베이스의 샘플 Sakila 스키마의 Film 테이블을 수정한 테이블에서 모든 직렬화 가능한 데이터 유형인 문자열, 숫자, 날짜 및 부울 값을 포함한 데이터를 표시합니다.

아래에서 데이터베이스에서 데이터를로드하는 세 가지 접근 방식의 코드를 비교합니다:

- JPA
- JDBC로 채워진 Entity
- Entity 없는 JDBC

세 가지 방법으로 생성된 객체는 Spring Boot와 기본으로 제공되는 Jackson 라이브러리를 사용하여 직렬화됩니다.

<div class="content-ad"></div>

웹 응용 프로그램에서 다른 방법으로 축적된 데이터를 데이터베이스에서 표시하는 최상의 방법을 선택해야 합니다. 이 응용 프로그램은 사용자의 새로운 아이디어에 따라 정기적으로 조정되어야 합니다.

동일한 컨트롤러 클래스는 세 가지 접근 방식에서 생성된 데이터를 제공합니다.

```js
@CrossOrigin
@RestController
class MyController {

    @Autowired
    EntityRepository jpa;
    
    @Autowired
    JdbcRepository jdbc;
    
    @Autowired
    JdbcTableRepository jdbcTable;

    @GetMapping("/jpa")
    public List jpa() {
        return jpa.findAll();
    }

    @GetMapping("/jdbc")
    public List jdbc() throws SQLException {
        return jdbc.getAll();
    }

    @GetMapping("/jdbcTable")
    public List jdbcTable() throws SQLException {
        return jdbcTable.getAll();
    }
}
```

그런 다음 프론트 엔드 코드는 데이터를 단순한 표로 시각화합니다. 각 접근 방식에서 수신한 데이터는 개별 탭에 표시됩니다. 탭을 전환하여 세 가지 접근 방식의 출력이 동일한지 확인할 수 있습니다.여기서 확인할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-07-12-Doyoureallyneedentityclasses_1.png" />

# JPA로 데이터 로딩

JPA 기반의 코드는 엔티티 외에도 꽤 간결할 수 있습니다. 엔티티가 크기 때문에 일부만 보여드립니다:

```java
@Entity
@Table(name = "FILM")
public class Film {

    @Id
    @Column(name = "FILM_ID")
    @JsonProperty("FILM_ID")
    Short filmId;

    @Column(name = "TITLE")
    @JsonProperty("TITLE")
    String title;

    @Column(name = "RELEASE_YEAR")
    @JsonProperty("RELEASE_YEAR")
    @Temporal(TemporalType.DATE)
    Date releaseYear;

    ...
}
```

<div class="content-ad"></div>

개발을 간소화하는 한 가지 방법은 SQL, Java 및 JavaScript 코드에서 동일한 이름을 사용하는 것입니다. 그러면 새 열을 추가해야 할 경우 해당 이름을 모든 종류의 코드에 붙여 넣을 수 있습니다. 또는 특정 열을 다루는 Java 또는 JavaScript 코드를 찾아야 할 경우 해당 열 이름을 검색 상자에 간단히 붙여 넣을 수 있습니다.

위의 엔티티는 IDE에서 생성되었고, 그 후에 @JsonProperty를 추가했습니다. 이 샘플 애플리케이션에 대해 클래스 필드 이름을 변경하는 것은 의미가 없습니다.

데이터가 관계적이지 않은 경우, 저장소 코드는 매우 간단합니다:

```js
@Repository
public interface EntityRepository extends JpaRepository<Film, Integer>{
}
```

<div class="content-ad"></div>

이 코드는 상당히 직관적으로 보입니다. 이제 사용자가 요청한 일반적인 변경 사항이 어느 정도의 노력을 필요로 할지 고려해 봅시다. 모든 변경은 JavaScript 코드를 변경해야 하지만 클라이언트 측 코드의 변경 사항은 세 접근 방식 모두에서 동일하기 때문에 귀찮은 작업은 무시할 수 있습니다.

새로운 열을 추가해야 하는 경우, 엔티티에 주석이 달린 새로운 필드를 추가해야 합니다.

데이터를 다른 테이블에서도 불러와야 하는 경우, 엔티티 클래스와 레포지토리 클래스를 추가해야 합니다.

# JDBC를 사용하여 데이터 불러오기

<div class="content-ad"></div>

이 접근 방식은 가능하지만 위의 JPA 기반 접근 방식보다 더 짧지는 않습니다.

이 접근 방식에서 필드들은 특정 타입을 갖지 않아도 되며, 모든 필드는 객체가 될 수 있습니다. 엔티티에는 @Id 및@Column 어노테이션이 필요하지 않습니다. JPA 엔티티와 달리, 클래스는 모든 필드에 대한 값을 받는 매우 큰 생성자가 필요합니다:

```js
public class Film2 {

    public Film2(Object filmId, Object title, Object description, Object releaseYear, Object languageId, Object originalLanguageId, Object rentalDuration,
            Object rentalRate, Object length, Object replacementCost,
            Object rating, Object specialFeatures, Object lastUpdate, Object available) {
        this.filmId = filmId;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.languageId = languageId;
        this.originalLanguageId = originalLanguageId;
        this.rentalDuration = rentalDuration;
        this.rentalRate = rentalRate;
        this.length = length;
        this.replacementCost = replacementCost;
        this.rating = rating;
        this.specialFeatures = specialFeatures;
        this.lastUpdate = lastUpdate;
        this.available = available;
    }

    @JsonProperty("FILM_ID")
    Object filmId;

    @JsonProperty("TITLE")
    Object title;
    
    ...
}
```

소스 열의 이름들은 상대적으로 큰 리포지토리 클래스에 명시되어 있습니다:

<div class="content-ad"></div>

```java
@Repository
public class JdbcRepository {

    @Autowired
    DataSource ds;
 
    public List<Film2> getAllFilms() throws SQLException {
        try ( Connection con = ds.getConnection();  Statement st = con.createStatement();  ResultSet rs = st.executeQuery("SELECT * from film")) {

            List<Film2> l = new LinkedList<>();

            while (rs.next()) {
                l.add(new Film2(
                        rs.getObject("FILM_ID"),
                        rs.getObject("TITLE"),
                        rs.getObject("DESCRIPTION"),
                        rs.getObject("RELEASE_YEAR"),
                        rs.getObject("LANGUAGE_ID"),
                        rs.getObject("ORIGINAL_LANGUAGE_ID"),
                        rs.getObject("RENTAL_DURATION"),
                        rs.getObject("RENTAL_RATE"),
                        rs.getObject("LENGTH"),
                        rs.getObject("REPLACEMENT_COST"),
                        rs.getObject("RATING"),
                        rs.getObject("SPECIAL_FEATURES"),
                        rs.getObject("LAST_UPDATE"),
                        rs.getObject("AVAILABLE")
                ));
            }

            return l;
        }
    }
}
```

새로운 열을 추가해야 하는 경우, 해당 엔터티에 주석과 함께 새로운 필드를 추가하고, 해당 생성자와 저장소 클래스의 코드를 조정해야 합니다.

또 다른 테이블에서 데이터를 로드해야 하는 경우, 엔터티 클래스와 저장소 클래스를 추가해야 합니다.

# JDBC를 사용하여 데이터를로드하고 배열로 직렬화하기

<div class="content-ad"></div>

마지막 옵션은 브라우저에서 객체 배열로 변환되는 2차원 배열로 데이터를 직렬화하는 것입니다.

저장소 클래스 코드는 길어 보일 수 있지만 범용적이며 어떤 SQL 쿼리 결과도 로드하는 데 사용할 수 있습니다:

```js
@Repository
public class JdbcTableRepository {

    @Autowired
    DataSource ds;

    public List getAllFilms() throws SQLException {
        return loadAsArray("SELECT * from film");
    }

    List loadAsArray(String sql) throws SQLException {

        try ( Connection con = ds.getConnection();  Statement st = con.createStatement();  ResultSet rs = st.executeQuery(sql)) {
            ResultSetMetaData md = rs.getMetaData();
            int colCount = md.getColumnCount();

            List rows = new LinkedList<>();
            List row = new LinkedList<>();
            for (int c = 1; c <= colCount; c++) {
                row.add(md.getColumnLabel(c));
            }
            rows.add(row);
            while (rs.next()) {
                row = new LinkedList<>();
                for (int c = 1; c <= colCount; c++) {
                    row.add(rs.getObject(c));
                }
                rows.add(row);
            }

            return rows;
        }
    }
}
```

일부 열을 로드하지 말아야 하는 경우 (예: CLOBs), select 문은 별표 대신 열의 이름을 지정해야 합니다.

<div class="content-ad"></div>

클라이언트 측 코드에 두 차원 배열을 객체 배열로 변환하는 작은 추가 함수가 필요합니다.

```js
function objectsFromRows(rows) {
    const headers = rows[0];
    return rows.slice(1)
            .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));

}
```

JPA 접근 방식에서 사용되는 Film 엔티티의 크기를 고려하면, 해당 접근 방식에 특화된 코드가 세 가지 접근 방식 중 가장 짧습니다.

열을 추가해야 한다면, 별표를 사용하는 경우 Java 코드를 변경할 필요가 없습니다. 열 이름을 지정하는 select 문을 사용하는 경우, 해당 열 이름을 쿼리에 추가해야 합니다. 가능한 경우 테이블이 아닌 뷰에서 선택하는 것이 좋습니다. 그럼 서버 측 코드를 변경하지 않고 열을 추가하거나 제거할 수 있습니다.

<div class="content-ad"></div>

만약 다른 테이블에서 데이터를 로드해야 한다면, 원하는 쿼리로 loadAsArray(String sql)를 호출하는 추가 메서드를 추가하기만 하면 됩니다.

내부망에서는 중요하지 않지만, 네트워크를 통해 전송되는 데이터의 크기가 작고 요청 실행 시간이 짧아집니다.

# 결론

Entities는 코드입니다. Entities는 브라우저에서 수신된 JSON을 역직렬화하고 데이터베이스에 저장하는 가장 쉬운 해결책입니다. 올바르게 사용하면 JPA는 응용 프로그램 성능을 저하시키지 않고 관련 데이터를로드하는 작업을 단순화합니다.

<div class="content-ad"></div>

But there is little sense in using entities for loading read-only data without relations. If each row of a query results produces a new object, it is easier to convert the rows into an array of objects in the client-side code. The shorter the code, the easier it is to modify it and meet the client's needs.

You can download the source code from my GitHub Repository. The source code is a maven project, and the application uses an in-memory H2 database.

- To build the application, type: mvn clean install
- To launch the application, type: java -jar target/noEntities.jar
- Then, open a browser and go to http://localhost:8080/

Thank you for reading.