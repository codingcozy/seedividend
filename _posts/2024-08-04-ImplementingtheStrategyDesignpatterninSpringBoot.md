---
title: "Spring Boot에서 전략 디자인 패턴을 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-08-04-ImplementingtheStrategyDesignpatterninSpringBoot_0.png"
date: 2024-08-04 18:57
ogImage:
  url: /assets/img/2024-08-04-ImplementingtheStrategyDesignpatterninSpringBoot_0.png
tag: Tech
originalTitle: "Implementing the Strategy Design pattern in Spring Boot"
link: "https://medium.com/codex/implementing-the-strategy-design-pattern-in-spring-boot-df3adb9ceb4a"
isUpdated: true
---

<img src="/assets/img/2024-08-04-ImplementingtheStrategyDesignpatterninSpringBoot_0.png" />

전략 디자인 패턴은 실행 시간에 알고리즘의 동작을 선택할 수 있게 해주는 행위 패턴입니다. 이 패턴은 우리가 한 세트의 알고리즘을 정의하고, 이를 서로 다른 클래스에 배치하고 상호 교환 가능하도록 만드는 것을 가능하게 합니다.

이것은 단순히 정의일 뿐이지만, 우리가 해결하려는 문제를 알면서 더 나은 이해를 얻을 수 있습니다.

# 문제

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

파일 구문 분석이라는 기능에 작업 중이라고 가정해보겠습니다. 파일을 업로드하여 시스템이 데이터를 추출하고 데이터를 데이터베이스에 보관할 수 있는 API를 작성해야 합니다. 현재는 CSV, JSON 및 XML 파일을 지원하도록 요청받았습니다. 즉각적인 솔루션은 아래와 같이 보일 것입니다.

```java
@Service
public class FileParserService {

  public void parse(File file, String fileType) {
    if (Objects.equals(fileType, "CSV")) {
      // TODO : CSV 파일 구문 분석 및 데이터를 db에 보관하는 방대한 구현
    } else if (Objects.equals(fileType, "JSON")) {
      // TODO : JSON 파일 구문 분석 및 데이터를 db에 보관하는 방대한 구현
    } else if (Objects.equals(fileType, "XML")) {
      // TODO : XML 파일 구문 분석 및 데이터를 db에 보관하는 방대한 구현
    } else {
      throw new IllegalArgumentException("지원되지 않는 파일 형식");
    }
  }

}
```

현재는 비즈니스 측면에서 모든 것이 잘 보이지만, 나중에 더 많은 파일 형식을 지원하려고 하면 문제가 복잡해질 수 있습니다. 여러 개의 else if 블록을 추가하면서 클래스 크기가 빠르게 늘어나고 결국 유지보수하기 어려워질 수 있습니다. 파일 구문 분석기 구현 중 하나를 변경하면 클래스 전체에 영향을 미칠 수 있어 이미 작동 중인 기능에 버그가 발생할 가능성이 높아집니다.

뿐만 아니라 또 다른 문제가 있습니다. 이제 추가로 sqlite와 parquet 파일 형식을 지원해야 한다고 가정해봅시다. 두 명의 개발자가 들어가서 같은 방대한 클래스에서 작업하기 시작할 것입니다. 머지 충돌이 발생할 가능성이 매우 높으며, 이는 개발자에게 거슬리는 일 뿐만 아니라 해결하는 데 시간이 많이 걸립니다. 무엇보다도 충돌 해결 후에도 기능이 전체적으로 작동하는 데 대한 신뢰가 감소될 것입니다.

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

# 해결 방법

여기서 전략 디자인 패턴이 우리의 구조에 개입합니다. 모든 파일 파싱 구현을 전략이라는 별도의 클래스로 이동할 것입니다. 현재 클래스에서는 파일 유형에 따라 적절한 구현을 동적으로 가져와 전략을 실행할 것입니다.

다음은 우리가 구현할 디자인 패턴을 개략적으로 보여주는 UML 다이어그램입니다.

![다이어그램](/assets/img/2024-08-04-ImplementingtheStrategyDesignpatterninSpringBoot_1.png)

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

자, 이제 코드로 들어가 봅시다.

지원하는 다른 파일 유형을 유지하는 클래스가 필요할 것입니다. 나중에 이를 사용하여 사용자 정의 이름을 가진 스프링 빈(즉, 전략)을 만들 것입니다.

```js
public class FileType {
  public static final String CSV = "CSV";
  public static final String XML = "XML";
  public static final String JSON = "JSON";
}
```

File Parser를 위한 인터페이스를 만들어 보세요.

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

```js
public interface FileParser {
  void parse(File file);
}
```

인터페이스를 만들었으니, 다른 파일 유형에 대한 구현체인 전략을 작성해 보겠습니다.

```js
@Service(FileType.CSV)
public class CsvFileParser implements FileParser {

  @Override
  public void parse(File file) {
    // TODO : csv 파일 파싱하는 구현부
  }

}
```

```js
@Service(FileType.JSON)
public class JsonFileParser implements FileParser {

  @Override
  public void parse(File file) {
    // TODO : json 파일 파싱하는 구현부
  }

}
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

```java
@Service(FileType.XML)
public class XmlFileParser implements FileParser {

  @Override
  public void parse(File file) {
    // TODO : impl to parse xml file
  }

}
```

위 빈들에 대해 사용자 지정 이름을 제공했다는 점에 주목해주세요. 이는 이 세 개의 빈을 필요한 클래스에 모두 주입할 수 있게 도와줄 것입니다.

이제 파일 유형에 따라 위 구현 중 하나를 선택하는 방법을 찾아야 합니다.

FileParserFactory 클래스를 만들어봅시다. 이 클래스는 런타임 중에 파일 유형을 기반으로 어떤 구현체를 선택할지 결정하는 역할을 합니다. 우리는 스프링 부트의 멋진 의존성 주입 기능을 활용하여 런타임 중에 적절한 전략을 가져올 것입니다. (자세한 내용은 아래 코드 블록의 주석을 참조하거나 [2]를 참고하세요.)

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

```java
@Component
@RequiredArgsConstructor
public class FileParserFactory {

  /**
   * Spring 부트의 의존성 주입 기능을 활용하여 이 맵을 생성하고 맵에 사용 가능한 모든 구현을 키(bean 이름)로 포함합니다.
   * 논리적으로 맵은 아래와 같이 보일 것입니다
   * {
   *   "CSV": CsvFileParser,
   *   "XML": XmlFileParser,
   *   "JSON": JsonFileParser
   * }
   */
  private final Map<String, FileParser> fileParsers;

  /**
   * 파일 형식을 기반으로 적절한 FileParser 구현체를 반환합니다.
   * @param fileType FileType 클래스에 명시된 파일 형식 중 하나
   * @return FileParser
   */
  public FileParser get(String fileType) {
    FileParser fileParser = fileParsers.get(fileType);
    if (Objects.isNull(fileParser)) {
      throw new IllegalArgumentException("지원되지 않는 파일 형식");
    }
    return fileParser;
  }

}
```

이제 FileParserService를 수정해봅시다. fileType을 기반으로 적절한 FileParser를 가져와 parse 메소드를 호출할 것입니다.

```java
@Service
@RequiredArgsConstructor
public class FileParserService {

  private final FileParserFactory fileParserFactory;

  public void parse(File file, String fileType) {
    FileParser fileParser = fileParserFactory.get(fileType);
    fileParser.parse(file);
  }

}
```

완료되었습니다!

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

# 결론

만약 더 많은 파일 유형을 지원해야 한다면, FileParser 인터페이스를 구현하는 SqliteFileParser 및 ParquetFileParser와 같은 새로운 클래스를 생성하면 됩니다. 결과적으로 이러한 새로운 파일 파서를 구현하는 여러 개발자는 나중에 병합 충돌을 피할 수 있습니다.

기존 파일 파서는 그대로 유지되므로 기존 기능을 깨뜨릴 가능성이 줄어듭니다.

또한, 우리의 코드는 이제 SOLID 원칙과 특히 우리가 사랑하는 개방/폐쇄 원칙과 조화를 이룹니다. 파일 파싱 구현을 개별 클래스로 캡슐화함으로써, 기존 코드를 수정하지 않고도 시스템을 새로운 파싱 전략으로 확장할 수 있습니다. 이렇게 하면 시스템이 미래 요구 사항에 더 적응 가능하고 유지보수가 더 쉬워집니다.

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

이 글의 전체 코드는 제 GitHub에서 확인하실 수 있어요.

# 참고 자료

- https://refactoring.guru/design-patterns/strategy
- https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html
