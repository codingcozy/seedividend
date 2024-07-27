---
title: "칼레이도스코프로 자바 클래스와 메서드를 바라보는 방법"
description: ""
coverImage: "/assets/img/2024-07-07-LookingataJavaClassanditsMethodsThroughaKaleidoscope_0.png"
date: 2024-07-07 22:09
ogImage: 
  url: /assets/img/2024-07-07-LookingataJavaClassanditsMethodsThroughaKaleidoscope_0.png
tag: Tech
originalTitle: "Looking at a Java Class and its Methods Through a Kaleidoscope"
link: "https://medium.com/javarevisited/looking-at-a-java-class-and-its-methods-through-a-kaleidoscope-998b510e39ac"
---


여러 관점에서 Java Stream 메소드들을 탐구해봅니다

![Java Class](/assets/img/2024-07-07-LookingataJavaClassanditsMethodsThroughaKaleidoscope_0.png)

# Java 클래스의 여섯 가지 시각

저는 큰 자바 클래스의 메소드를 이해하는 다양한 방법들을 탐구해왔습니다. 여기서 큰 클래스란 코드 라인 수를 말하는 것이 아니라 메소드의 수를 의미합니다. 기능이 풍부한 인터페이스들은 때로 인간적인 인터페이스라 불리지만, 이름을 모른다면 메소드를 찾거나 패턴을 발견하고 타입 간의 대칭을 찾는 일이 꽤 힘들 수 있습니다. 다행히 우리에게는 많은 양의 데이터를 매우 빠르게 처리할 수 있도록 도와주는 컴퓨터들이 있습니다. 클래스와 메소드 선언은 자바 개발자들이 손쉽게 접근할 수 있는 라이브러리와 응용 프로그램에 대한 정보의 보물창고입니다. 하지만 안타깝게도, 좋은 Javadoc 이외에는 그들을 대화시키는 방법이 많지 않습니다.

<div class="content-ad"></div>

저는 Eclipse Collections의 기능이 풍부한 API를 이해하기 위해 간단한 문서화 도구를 만들었습니다. 물론, Eclipse Collections를 사용하여 Eclipse Collections를 이해하는 데 도움을 받고 있죠. 제가 만들고 있는 도구들은 Eclipse Collections 클래스뿐만 아니라 모든 Java 클래스와 해당 메서드 인스턴스를 이해할 수 있도록 해줍니다. 제가 실험 중인 도구들을 Javadoc++의 한 종류로 생각할 수 있을 것입니다. 이 블로그를 쓰는 이유는 이러한 클래스/메서드 뷰들의 유용성을 확인하거나 부정하는 데 있습니다.

또한, 이 블로그를 통해 Java에서 누락된 사용자 정의 메서드 그루핑 기능에 관심을 끌고 싶습니다. 스몰톡에서 배운 메서드 카테고리(Method Categories)라는 기능입니다. Java Class의 각 메서드를 선택적으로 methodCategory="filtering" 또는 methodCategory="transforming"과 같이 태그할 수 있다고 상상해보세요. 그런 다음 JavaDoc, IDE 및 개발자들이 이 정보를 메서드 인터페이스를 통해 쿼리할 수 있는 상황이라면 어떨까요. 다시 본론으로 돌아가겠습니다. 새로운 Java 기능을 사용하지 않고도 만들어낸 뷰와 그룹들에 대해 이야기하겠습니다.

클래스와 해당 메서드에 대한 다섯 개의 AsciiDoc 생성 뷰를 만들어서, 클래스 내의 메서드가 어떻게 구성되어 있는지 이해하고 흥미로운 패턴이 있는지 확인할 수 있게 되었습니다. 이러한 뷰들은 클래스 범위, 네이밍 패턴 및 존재할 수 있는 어떤 대칭성/비대칭성을 이해하는 데 도움이 될 수 있습니다.

이 블로그에서 살펴볼 Java 클래스의 여섯 가지 뷰는 다음과 같습니다:

<div class="content-ad"></div>

- Javadoc
- 첫 글자로 메소드 분류
- 접두사로 메소드 분류
- 접미사로 메소드 분류
- 반환 유형에 따른 메소드 분류
- 기능 인터페이스 매개변수 유형에 따른 메소드 분류

뷰 두 번째부터 여섯 번째까지, 저는 Java의 클래스와 메소드 유형을 기준으로 다른 속성에 따라 메소드를 그룹화하고 계산하기 위해 Eclipse Collections를 사용했습니다.

현재 Java 메소드에 사용자 정의 그룹화 메커니즘이 없으며, 이는 Smalltalk의 메소드 카테고리와 동등할 것입니다. Method에 대한 사용 가능한 메타데이터를 사용하여 메소드의 그룹화를 구축하고 생성된 AsciiDoc을 사용하여 메소드의 추가 뷰를 만들었습니다. Java Stream 클래스에 대한 생성된 AsciiDoc을 gists에 호스팅했습니다. 아래의 gist에 링크되어 있으며 GitHub의 AsciiDoc 렌더링 기능을 사용하여 인라인에 괜찮아 보이는 테이블을 표시했습니다.

Java Stream 클래스와 해당 메소드의 다음 뷰를 즐기세요!

<div class="content-ad"></div>

# Java Stream의 여섯 가지 관점

Java Stream을 예시로, Java 클래스의 여섯 가지 관점을 살펴보겠습니다.

## 1. Javadoc

첫 번째 관점은 해당 클래스의 Javadoc입니다.

<div class="content-ad"></div>

Javadoc 뷰에서는 클래스에 대한 모든 문서를 보여주며, 모든 메소드를 알파벳 순으로 정리한 메소드 요약을 제공합니다. 이는 어떤 목적에 적합할 수 있지만, 메소드에 대한 패턴을 찾는 데 도움이 되지 않습니다. 왜냐하면 특별한 그룹 지정 없이 평평한 뷰만 있는데 때문입니다. 정적 메소드, 인스턴스 메소드, 추상 메소드 및 기본 메소드로 메소드를 필터링할 수 있습니다.

우리는 유용한 검색 위젯을 사용하여 원하는 것을 찾을 수 있습니다. 또한 Java Stream이 사용된 JDK의 위치를 보여주는 흥미로운 "Use" 탭도 있습니다.

## 2. 첫 글자별 Stream 메소드

이것은 클래스의 메소드를 나타내는 가장 간단한 뷰입니다. 저는 Eclipse Collections를 사용하여 Stream 클래스의 모든 메소드를 첫 글자에 따라 그룹화하고, 가장 빈도가 높은 첫 글자부터 가장 낮은 빈도까지 정렬합니다.

<div class="content-ad"></div>

각 글자마다 메소드가 알파벳순으로 정렬되어 있습니다. 이러한 방식의 장점은 메소드 압축이 가능하다는 것입니다. Stream에 대한 Javadoc 보기에서는 모든 메소드를 보려면 스크롤을 내려야 합니다. 이 방식에서는 27인치 모니터나 노트북 화면 모두 스크롤하지 않아도 됩니다.

## 3. 접두사별 Stream 메소드

이 보기는 첫 글자별로 그룹화하는 것보다 약간 더 흥미로운 형태입니다. 여기서는 "map"이나 "for"와 같은 접두사에 따라 메소드를 그룹화합니다. 접두사는 메소드의 초기 소문자 글자와 첫 대문자 글자 사이의 구분을 통해 결정됩니다. 접두사가 없거나 모든 소문자 글자인 메소드는 "No Prefix" 범주에 표시됩니다. 이 범주는 가장 빈도가 높은 접두사부터 가장 낮은 빈도의 접두사까지 정렬된 테이블에서 처음에 나타납니다. 접두사는 그룹화 및 화면 공간 압축을 하며 대부분의 메소드 카테고리에 대한 대략적인 근사치 역할도 합니다.

## 4. 접미사별 Stream 메소드

<div class="content-ad"></div>

이 뷰는 접두사로 그룹화하는 흥미로운 변형입니다. 여기서는 "int" 또는 "match"와 같은 접미사로 메소드를 그룹화합니다. 접미사는 메소드에서 마지막 대문자와 나머지 소문자 사이의 구분으로 결정됩니다. 접미사가 없는 메소드나 모든 소문자를 가진 메소드는 "No Suffix"라는 카테고리에 표시됩니다. 이 카테고리는 테이블을 가장 빈도가 높은 접미사부터 가장 낮은 빈도까지 정렬하기 때문에 먼저 표시됩니다.

## 5. 반환 유형별 스트림 메소드

이 뷰에서는 반환 유형별로 메소드가 그룹화되어 있습니다. 각 메소드에 대한 더 많은 정보를 볼 수 있습니다. 매개변수 유형을 포함한 메소드를 볼 수 있습니다. 이 작업은 스크린 공간을 좀 더 차지하지만 추가 정보가 유용할 수 있습니다. 테이블은 가장 빈도가 높은 반환 유형부터 가장 낮은 반환 유형까지 정렬됩니다. Stream에서 가장 빈도가 높은 반환 유형은 Stream이며, 이는 Stream 인터페이스의 느린 메소드가 상당히 많다는 것을 의미합니다. 또한 네 개의 BaseStream 메소드 및 아홉 개의 기본 스트림(IntStream, LongStream, DoubleStream) 메소드도 느립니다.

## 6. 기능 인터페이스 매개변수 유형별 스트림 메소드

<div class="content-ad"></div>

이 중에서도 가장 복잡한 뷰로 생성하는 데 시간이 많이 걸렸어요. 이 뷰에서는 각 매개변수 유형별로 매개변수 수를 이모티콘으로 표시한 메서드를 볼 수 있어요. 메서드는 함수형 인터페이스(예: Predicate, Function, Consumer)로만 사용되는 매개변수 유형만 포함되도록 필터링되었어요. 이 뷰는 어떤 메서드가 람다로 사용할 수 있는지 알려주며, 어떤 함수형 인터페이스가 해당 매개변수 유형으로 가장 많이 사용되는지도 알 수 있어요. 매개변수 수를 포함한 이유는 테이블의 BinaryOperator 행을 보면 reduce의 오버로드된 버전이 세 가지 있기 때문이에요.

이 뷰를 사용하면 “Stream에서 Predicate를 사용할 수 있는 곳은 어디인가요?” 또는 “Stream에 Function을 사용할 수 있는 곳은 어디인가요?”와 같은 질문에 빠르게 답할 수 있어요.

## Stream과 RichIterable 람다 활성화 메서드 비교

Stream 인터페이스 메서드 중 여섯 번째 뷰를 통해 RichIterable 인터페이스와 비교하여 가장 잘 알려진 네 종류의 함수형 인터페이스를 매개변수로 사용하는 메서드 수를 기반으로 Stream이 얼마나 람다로 사용할 수 있는지 비교할 수 있었어요.

<div class="content-ad"></div>


![이미지](/assets/img/2024-07-07-LookingataJavaClassanditsMethodsThroughaKaleidoscope_1.png)

위 차트에서 Consumer는 Eclipse Collections에서 동등한 유형으로 Procedure라는 이름입니다.

Stream에 유용한 메서드가 누락된 것 같다면, RichIterable에서 찾을 수도 있습니다. 함수형 인터페이스 매개변수 유형별 RichIterable 메서드의 상세보기는 아래에서 확인할 수 있습니다.

# 최종 의견


<div class="content-ad"></div>

가끔은 우리가 사용하는 Java 클래스와 메소드의 이해를 돕기 위한 도구를 만드는 것이 도움이 될 수 있습니다. Java는 코드에서 유용한 정보를 쿼리할 수 있는 능력을 제공합니다. 파일에서 모든 것을 찾으려면 많은 스크롤링과 메모리 테스트가 필요할 수 있습니다. 정보 청킹은 인간에게 매우 유용합니다. 그룹화 및 필터링은 정보 청킹을 돕는 좋은 옵션입니다.

Medium 블로그에 포함된 gist에서 AsciiDoc를 사용한 적이 있습니다. GitHub에 의해 AsciiDoc 테이블이 자동으로 렌더링된 것에 감격했습니다. 이 가능한 사실을 알게 되었으니, 향후에는 AsciiDoc 테이블을 화면 캡처 대신에 gist에 사용할 수도 있겠네요.

이 블로그와 Java Stream 클래스의 다섯 개의 AsciiDoc 생성된 Class/Method 뷰가 유용했길 바랍니다. Java Stream 클래스의 메소드 네이밍과 구성에 대해 더 배우고 싶을 것으로 생각되는 다른 사람들과 이 블로그를 공유해주세요!

즐겁게 이용해주세요!

<div class="content-ad"></div>

저는 Eclipse Collections OSS 프로젝트의 창조자이자 기여자입니다. 해당 프로젝트는 Eclipse Foundation에서 관리됩니다. Eclipse Collections는 기여를 환영합니다.