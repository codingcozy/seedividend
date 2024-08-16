---
title: "DTO를 Java에서 프로처럼 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-UseYourDTOsinJavaLikeaPro_0.png"
date: 2024-07-09 21:15
ogImage: 
  url: /assets/img/2024-07-09-UseYourDTOsinJavaLikeaPro_0.png
tag: Tech
originalTitle: "Use Your DTOs in Java Like a Pro"
link: "https://medium.com/javarevisited/use-your-dtos-in-java-like-a-pro-1cd3f6b2fda8"
isUpdated: true
---




<img src="/assets/img/2024-07-09-UseYourDTOsinJavaLikeaPro_0.png" />

만일 여러분이 Medium 회원이 아니라면, 아래 링크를 통해 이 기사에 완전히 접근할 수 있습니다:

https://medium.com/javarevisited/use-your-dtos-in-java-like-a-pro-1cd3f6b2fda8?sk=27cfbd023fd601ebff88fa61d15dc898

## 소개

<div class="content-ad"></div>

REST API를 작성할 때 사용자가 요청한 객체를 반환해야 하는 경우나 사용자로부터 객체를 가져와 데이터베이스에 저장할 객체를 생성해야 하는 상황이 종종 발생합니다.

아마도 모델이나 하이버네이트 엔티티와 같이 현실을 단순화하는 것이 있을 것입니다. 그러나 API로 노출할 때 때로는 정확한 모델을 노출하고 싶지 않을 수도 있고, 새로운 개체를 만들기 위해 엔티티의 모든 필드가 필요하지 않을 수도 있습니다. 혹은 두 엔티티로부터 데이터를 하나의 객체로 노출하고 싶은 경우도 있을 것입니다.

여기서 데이터 전송 객체(DTO) 디자인 패턴이 중요한 역할을 합니다.

## DTO란 무엇인가요?

<div class="content-ad"></div>

DTO(Data Transfer Object)는 데이터를 송수신하는 데 사용되는 객체입니다. 많은 소프트웨어 개발자들이 사용하는 일반적인 디자인 패턴입니다. 이는 개발자가 필드가 모델과 다른 경우 응답 또는 요청 바디를 모델링하는 데 사용됩니다. 우리는 프로세스 간 전송되는 데이터 크기를 증가시키는 불필요한 필드를 제거할 수 있습니다.

## 어떻게 작성하나요?

예제를 통해 배우는 게 가장 좋으니, 간단한 하나를 제시하겠습니다. 다음 예제에서 Hibernate 엔티티와 롬복을 사용하겠습니다.

우리는 두 개의 엔티티, Book과 Author가 있습니다 (Book이 항상 한 명의 저자에 의해 쓰인다고 간소화한 상황):

<div class="content-ad"></div>

```java
@Entity
@Table(name = "books")
@NoArgsConstructor
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookId;
    private String title;
    private int pages;
    private String description;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

}
```

```java
@Entity
@Table(name = "authors")
@NoArgsConstructor
@Data
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long authorId;
    private String firstName;
    private String lastName;
    @OneToMany(mappedBy = "author")
    private Set<Book> books;
}
```

간단한 CRUD를 작성하고 싶습니다. 따라서 책을 저장하고 모든 책을 가져올 수 있는 엔드포인트(및 기타 엔드포인트)를 가질 것입니다. 그러나 반복되는 작업에 빠지고 싶지 않을 뿐더러 books 필드를 포함하지 않고 작성자(author) 객체를 반환하길 원합니다. 또한, 새로운 책을 데이터베이스에 저장하기 위해 bookId 및 전체 작성자(author) 객체는 필요하지 않습니다. DTO를 작성할 것입니다.

아마 가장 일반적인 DTO 작성 방법은 POJO(Plain Old Java Object)를 직접 만드는 것입니다. 이 방법은 간단하지만 상당한 선행 작업 코드로 제공됩니다. 다음과 같이 보일 것입니다:

<div class="content-ad"></div>

```java
@Data
public class BookDTO {
    private final long bookId;
    private final String title;
    private final int pages;
    private final String description;
    private final AuthorDTO author;

    @JsonCreator
    public BookDTO(long bookId, String title, int pages, String description, AuthorDTO author) {
        this.bookId = bookId;
        this.title = title;
        this.pages = pages;
        this.description = description;
        this.author = author;
    }
}
```

DTO 객체에서는 세터를 사용할 필요가 없습니다. 이러한 객체들은 변경 불가능해야 합니다.

이렇게 해도 동작은 하지만, 더 나은 방법이 있습니다.

첫 번째 옵션은 Lombok 라이브러리를 사용하여 불필요한 보일러플레이트 코드를 제거하는 것입니다. 향상된 후에 우리의 DTO는 다음과 같이 보일 것입니다:

<div class="content-ad"></div>

```java
@AllArgsConstructor
@Getter
public class BookDTO {
    private long bookId;
    private String title;
    private int pages;
    private String description;
    private AuthorDTO author;
}
```

멋지게 보이지만 사실, 외부 라이브러리를 사용하지 않고 더 나은 방법이 있습니다. Java는 빠르게 발전하고 새 버전에서 많은 새로운 기능을 제공합니다. 그 중 하나는 레코드(Records)입니다. 레코드 키워드는 Java 14와 함께 도입되었습니다. 레코드 기능을 만드는 목적 중 하나는 POJO(Plain Old Java Object)에 따라 오는 보일러플레이트(boilerplate)를 줄이는 것입니다.

레코드를 선언하면 다음과 같은 것들을 얻을 수 있습니다:
- 데이터 조각마다 private, final 필드
- 각 필드에 대한 getter
- 각 필드에 해당하는 인수가 있는 public 생성자
- 모든 필드가 일치할 때 동일한 클래스의 객체에 대해 true를 반환하는 equals 메서드
- 모든 필드가 일치할 때 동일한 값을 반환하는 hashCode 메서드
- 클래스 이름, 각 필드의 이름 및 해당 값이 포함된 toString 메서드


<div class="content-ad"></div>

상기 내용을 고려하면 기록(Records)은 DTO에 완벽합니다. 롬복 구현을 레코드로 바꿔보겠습니다:

```js
public record BookDTO(long bookId, String title, int pages, String description, AuthorDTO author) {}
```

이게 전부입니다!

책을 저장하는 데 필요한 DTO에도 마찬가지로 적용할 수 있습니다. 여기서는 작가 ID만 필요하고 아직은 책 ID가 필요하지 않습니다:

<div class="content-ad"></div>

```js
public record BookSaveDTO(String title, int pages, String description, long authorId) {}
```

이제 컨트롤러에서 이들을 어떻게 사용할 수 있는지 살펴봅시다:

```js
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.getBooks().stream()
                .map(this::toBookDTO)
                .collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<BookDTO> saveBook(@RequestBody BookSaveDTO bookSaveDTO) {
        Book savedBook = bookService.saveBook(bookSaveDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(toBookDTO(savedBook));
    }

    private BookDTO toBookDTO(Book book) {
        Author author = book.getAuthor();
        AuthorDTO authorDTO = new AuthorDTO(
                author.getAuthorId(),
                author.getFirstName(),
                author.getLastName()
        );
        return new BookDTO(book.getBookId(), book.getTitle(), book.getPages(), book.getDescription(), authorDTO);
    }
}
```

그게 다에요, 쉽고 간단하죠.

<div class="content-ad"></div>

옵션으로는 DTO를 쉽게 만들고 가독성을 높이기 위해 빌더 디자인 패턴을 적용할 수 있습니다. 예를 들어 Lombok 빌더 어노테이션을 사용하여 이를 달성할 수 있습니다.

## 흔한 실수

❌ DTO에 비즈니스 로직을 주입하는 것. DTO는 데이터 전송을 위한 것이며 비즈니스 로직과 섞어서 사용해서는 안 됩니다. 이 규칙을 위반하는 가장 흔한 경우는 멀티레이어 아키텍처의 서비스 레이어에서 REST API에서 DTO를 반환하는 상황입니다. 이 경우 DTO는 웹과 엄격하게 연결되어 있으며 컨트롤러에서 처리해야 합니다.

❌ DTO의 남용. 모든 상황이나 엔드포인트마다 별도의 DTO를 만들어서는 안 됩니다.

<div class="content-ad"></div>

❌ 모든 상황에 대해 하나의 DTO. 이것은 위의 반대입니다. 우리는 너무 많은 DTO를 원하지 않기 때문에 추가적인 필드가 있는 경우라도 하나의 DTO만 사용합니다. 균형이 필요합니다.

## 요약

데이터 전송 객체는 많은 개발자들에 의해 널리 사용되는 일반적인 패턴입니다. 대부분의 사람들은 POJO를 사용하여 이를 생성하지만, 저는 더 나은 옵션이 있다고 여러분을 설득할 수 있었지 않았나요? 😉.

글이 마음에 드셨다면, 클랩(clap)과 댓글을 남겨주세요. Medium 알고리즘을 개선하고 제 콘텐츠를 확인할 기회를 얻을 수 있습니다.

<div class="content-ad"></div>

내 글을 놓치고 싶지 않다면, 팔로우해주세요.

다른 플랫폼에서 저에게 연락하고 싶다면 제 개인 웹사이트를 방문해주세요:

제가 사용한 자료들

- https://www.baeldung.com/java-record-keyword