---
title: "AEM에서 문자열 상수를 사용하지 말아야 하는 이유"
description: ""
coverImage: "/assets/img/2024-08-03-DontuseStringConstantsinAEM_0.png"
date: 2024-08-03 18:45
ogImage: 
  url: /assets/img/2024-08-03-DontuseStringConstantsinAEM_0.png
tag: Tech
originalTitle: "Dont use String Constants in AEM"
link: "https://medium.com/@achimkoch/dont-use-string-constants-in-aem-23edc89e2cac"
isUpdated: true
---




아니요 — 제목이 클릭베이트는 아닙니다. 아마 조금 그렇긴 하지만요. 그리고 네 — 약간 논란이 될 수도 있어요. 일반적으로 널리 행해지는 관행이 그 반대라는 건 알고 있어요. 헬, 심지어 제 정적 코드 분석기도 항상 문자열 상수를 사용하라고 권유하죠...

![이미지](/assets/img/2024-08-03-DontuseStringConstantsinAEM_0.png)

이 글은 주로 제 자신의 생각을 정리하기 위해 쓰여졌어요. "최상의 코딩 가이드라인"을 맹목적으로 따르는 것이 항상 최상의 코드로 이끄는 것은 아니에요. 우리는 왜 특정 규칙이 존재하고, 어떤 문제를 해결하며, 어디에 적용하지 말아야 하는지 이해해야 해요. 논쟁은 언제든 환영해요.

그럼, 이것이 무엇에 관한 이야기일까요?

<div class="content-ad"></div>

자바에서는 상수로 사용되는 문자열을 사용하기 전에 먼저 선언하고 정의하는 것이 좋은 관행으로 여겨집니다. AEM에서도 이 관행을 따릅니다. 간단한 예시 모델을 살펴보겠습니다. (이것은 설명을 위해 과감히 단순화되었습니다):

```js
public class Teaser {

  private String HEADLINE = "headline";
  private String TEXT = "text";
  private String FAULTY_METHOD = "The method faultyMethod() is not supposed to be called";

  private ValueMap valueMap;
  
  public Teaser(Resource resource){
    valueMap = resource.getValueMap();
  }
  
  public String getHeadline(){
    return valueMap.get(HEADLINE);
  }

  public String getText(){
    return valueMap.get(TEXT);
  }

  public faultyMethod(){
    log.error(ERROR_MESSAGE);
  }
}
```

# 학교에서 배운 내용

왜 "선언/정의 먼저" 접근 방식이 일반적으로 권장되는지 다시 살펴보겠습니다:

<div class="content-ad"></div>

- 유지 관리성: 코드에서 문자열이 여러 번 사용될 경우, 상수로 선언하면 각 발생을 찾아 업데이트하는 대신 한 곳에서 값을 변경할 수 있습니다.
- 가독성: 서술적인 상수 이름 사용은 코드를 더 읽기 쉽고 자명하게 만들 수 있습니다. 예를 들어, public static final String ERROR_MESSAGE = "An error has occurred"; 는 문자열 "An error has occurred"를 반복해서 사용하는 것보다 더 읽기 쉽습니다.
- 오타 방지: 상수를 재사용하면 오타를 방지할 수 있습니다. 여러 곳에서 문자열을 오타로 입력하면 추적하기 어려운 버그가 발생할 수 있습니다. 상수를 사용하면 일관성이 보장됩니다.
- 최적화: Java 컴파일러는 문자열 상수의 사용을 최적화하여 메모리 사용량을 줄이고 성능을 향상시킬 수 있습니다.
- 매직 문자열 피하기: 매직 문자열은 설명 없이 코드에 나타나는 리터럴 값입니다. 코드를 이해하고 유지하는 데 어려움을 겪게 할 수 있습니다. 상수 사용은 매직 문자열을 피하는 데 도움이 됩니다.

# 대신 무엇을 해야 하는가

모두 잘 된 주장들입니다. 그렇다면 AEM에는 적용되지 않아야 하는 이유가 무엇인가요?

제 주장은 이와 같은 문자열 리터럴을 사용할 때 더 간결하고 읽기 쉽게 작성할 수 있다는 것입니다:

<div class="content-ad"></div>

```java
public class Teaser {

  private ValueMap valueMap;

  public Teaser(Resource resource){
    valueMap = resource.getValueMap();
  }

  public String getHeadline(){
    return valueMap.get("headline");
  }
  public String getText(){
    return valueMap.get("text");
  }

  public faultyMethod(){
    log.error("The method faultyMethod() is not supposed to be called");
  }
}
```

## 맥락이 중요합니다

리드 개발자로서, 코드를 작성하는 것보다 리뷰하고 디버깅하는 데 더 많은 시간을 쓰고 있습니다. 후자 스타일이 더 편리하다고 생각합니다. 또한 AEM에서 declare-first에 대한 주장이 실제로 적용되지는 않습니다:

- 유지보수성: 일반적인 콘텐츠 모델에서는 속성 이름을 나타내는 문자열이 getter에서 한 번 사용됩니다. 중앙 선언을 정당화할 만한 재사용성이 간단히 없습니다.
- 가독성: 대문자로 구성된 이름은 특히 읽기 어렵다고 생각하지 않습니다. 인간의 두뇌는 대소문자 혼합으로 읽는 것에 익숙하며, 일반적 상태의 단어를 훨씬 빠르게 인식합니다. 또한, "FAULTY_METHOD"가 "The method faultyMethod() is not supposed to be called"보다 더 읽기 쉬워야 하는 이유가 무엇인가요? 두 번째 변형이 의미를 직접 전달하기 때문에 더 읽기 쉽다고 주장합니다. 상수를 사용할 때 항상 값을 확인하여 의미를 이해하고 정확성을 검증합니다.
- 오탈자 방지: 다시 말하지만, 동일한 문자열을 두 번 사용하는 경우는 드뭅니다. 따라서 이러한 오류 가능성이 적습니다. getter에서 속성 이름을 잘못 입력하는 확률과 선언에서 잘못 입력하는 확률은 동일합니다.
- 최적화: 동일한 값을 두 번 이상 사용하는 경우에만 해당됩니다. 또한, AEM 프로젝트에서 실행되는 사용자 지정 코드 양은 프레임워크 코드와 비교할 때 미미합니다. 최적화는 심지어 측정할 수 없을 정도입니다. 또한: AEM에서 가독성을 선호합니다. 가독성은 올바른 결과를 지원하며 결과가 정확해야 하며 마이크로초 일찍 전달된다는 것보다 더 중요합니다.
- 마법의 문자열 피하기: "마법의 문자열"은 주로 프레임워크에서 메서드를 호출할 때 예상되는 문제점입니다.


<div class="content-ad"></div>

```js
// DO:
String raw = "AEM으로 개발하다";
byte[] bytes = raw.getBytes(StandardCharsets.UTF_8);

// DON'T:
String raw = "AEM으로 개발하다";
byte[] bytes = convertToBytes(raw, "UTF-8");
```

두 번째 예제는 메서드에 모드를 전달하기 위해 "UTF-8"이라는 매직 문자열을 사용합니다. 오타가 발생할 가능성이 있습니다.

하지만 저희의 예제에서는

```js
public String getLink(){
    return valueMap.get("link");
}
```

<div class="content-ad"></div>

"link"은 애매하지 않고 추측하기 어려운 매직 문자열이 아닙니다. 두 개의 코드 도메인 간 인터페이스에서 사용되지 않습니다. CRXDE이나 대화 상자 정의에서도 확인할 수 있는 속성의 이름입니다.

# 가독성 향상

사실, 상수 대신 문자열 리터럴을 사용하는 몇 가지 좋은 이유가 있습니다. 이러한 이유 중 대부분은 더 나은 가독성과 관련이 있습니다.

- 검색 없음: 리터럴이 값 자체를 직접 전달합니다. 코드를 읽을 때 속성 이름이 올바르게 철자가 되었는지 바로 확인할 수 있습니다. 그렇지 않으면 상수 "TITLE"이 정말 "title"로 철자 되었는지 확인하기 위해 항상 클래스 맨 위로 스크롤해야 합니다.
- 인지 부하 감소: 상수 하나 또는 두 상수의 값을 기억해 둘 수 있습니다. 그러나 일반적인 모델에는 하나 이상의 속성이 있습니다. 인간 뇌는 단기 기억에 일고기 정보를 최대 일곱 개까지 유지할 수 있습니다. 화면에 표시되는 내용을 외우지 않아도 됩니다. 따라서 상수 값을 기억하지 않고 복잡한 코드의 의미를 더 쉽게 이해할 수 있습니다.
- 간결성: 더 컴팩트하게 코딩하는 것만으로 코드를 더 읽기 쉽게 만들지는 않습니다. 하지만 완전히 중복되는 코드를 제거하면 가독성은 확실하게 향상됩니다. 더불어 이제는 클래스 정의가 스크롤하지 않고 화면 한 장으로 맞을 수도 있습니다.
- 비교 가능성: CRXDE에서 속성 이름을 직접 비교할 수 있습니다. 감안해야 하는 코드 조각과 함께 비교할 필요도 없이 직접 비교할 수 있습니다. 이제 검색과 기억 필요 없이도 됩니다.

<div class="content-ad"></div>

# 사용성 및 디버그 용이성 향상

상수 대신 리터럴을 사용하면 코드의 사용성도 높일 수 있습니다.

예를 들어, 로그 파일에서 "The method faultyMethod() is not supposed to be called"와 같은 오류 메시지를 발견했다고 상상해보세요. 이 메시지가 어디서 발생했는지 알고 싶을 것입니다. 단순히 IDE에서 오류 메시지를 검색하면 오류가 발생한 코드 라인으로 바로 이동할 수 있습니다. 문자열 상수를 사용하면 먼저 선언부로 이동한 후 사용 위치를 찾아야 합니다. 상수는 재사용을 장려하며 같은 오류 메시지가 여러 번 사용될 경우 어떤 코드 부분에서 오류 메시지가 발생했는지 알기 어려울 수 있습니다.

# 예외의 예외

<div class="content-ad"></div>

당신은 아마 내가 주로 클래스나 모델에 있는 프로퍼티 이름들에 초점을 맞춘 것을 눈치채셨을 것입니다. 이러한 프로퍼티 이름들은 나에게는 해당 클래스나 모델의 비공개 속성으로 간주됩니다.

다른 경우에는 주장이 조금 다를 수 있습니다:

메소드 매개변수: 당신의 코드가 프레임워크 메소드를 사용하는 것뿐만 아니라 코드의 다른 부분에서 호출되는 공개 메소드를 제공할 때, 문자열 상수 사용이 필요할 수 있습니다. 이러한 상수들은 그런 기능의 "인터페이스"의 일부가 될 것입니다. 하지만 종종 문자열 상수가 메소드 실행 모드를 설명하는 용도로 남용됩니다. 이 경우 강력한 타이핑을 제공하는 enum을 고려해야 합니다.

구성 / 문서화: 예를 들어, 여러 정적 매개변수로 클래스를 구성할 수 있는 경우가 있다고 가정해봅시다. 프로젝트 초반에는 이러한 매개변수가 무엇인지 정확히 확신하지 못하며 최적화 단계에서 이러한 매개변수를 변경하고 싶을 수 있습니다. 또한 클래스의 중요한 특성으로써 매개변수를 문서화하고 싶을 것입니다. 이 경우 클래스 상단에 상수를 선언해서 한 곳에서 쉽게 검색하고 변경할 수 있게 만드는 것이 도움이 될 수 있습니다.

<div class="content-ad"></div>

Non-Strings: 주의, 논의는 문자열에 대한 것이었습니다. 숫자나 객체에는 해당되지 않습니다. 문자열이 인간이 읽기 쉽고 자명한 경우가 많은 것이 다른 사항입니다. 이는 비문자열에는 해당되지 않습니다.

예시:

```js
// X가 1280보다 작아야 하는 이유는 무엇인가요? 두 번째 예시는 암시적으로 이유를 나타냅니다… 왜냐하면 이것이 지원되는 화면의 최대 크기이기 때문입니다.

<div class="content-ad"></div>

사람이 쉽게 이해할 수 없는 문자열에 대해 동일한 주장을 제기할 수 있습니다:

// 바람직하지 않은 방법
Connection connection = db.open("jdbc:mysql://localhost:3306/mydb"); 

// 권장하는 방법
private static String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
...
Connection connection = db.open(DATABASE_URL);

다시 말씀드리면, 첫 번째 예시에서는 그 이상한 문자열이 무엇인지 궁금해할 수 있습니다. 두 번째 예시는 암시적으로 답변합니다: 그것은 데이터베이스의 URL입니다. 게다가, 이것은 시스템을 유지 보수하는 사람이 보다 더 명확하게 보기 위해 클래스 상단에 선언하는 것이 좋습니다. (그렇습니다 — 설정 파일에 정의하는 것이 더 나아요. 그러나 설정 파일을 사용할 경우 로컬 메서드 호출이 아닌 헤더에서 정의하십시오 ;-) ).

# 결론

<div class="content-ad"></div>

“최선의 방법” 안내서를 무작정 따르지 마세요. 항상 “왜?”와 “어떤 문제를 해결하나요?”라고 물어보세요. 대안을 고려하고 교환 관계를 신중하게 균형을 맞추세요. 코딩 스타일에서 일관성을 유지하세요. 항상 같은 일을 하지 말고, 항상 같은 상황에서 같은 일을 하세요.

코딩 스타일에 대한 질문은 이미 특정 스타일이 확립된 브라운필드 프로젝트에 있을 때 특히 흥미롭습니다. 여기서도 일관성과 전체 코드베이스를 고려해야 합니다.