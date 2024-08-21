---
title: "만약 Java 컬렉션들에 필터, 맵, 플랫맵과 같은 이식한 메서드가 있다면 어떻게 될까"
description: ""
coverImage: "/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_0.png"
date: 2024-07-09 21:38
ogImage:
  url: /assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_0.png
tag: Tech
originalTitle: "What If Java Collections Had Eager Methods for Filter, Map, FlatMap?"
link: "https://medium.com/better-programming/what-if-java-collections-had-eager-methods-for-filter-map-flatmap-a61ef07fa52a"
isUpdated: true
---

## 불필요한 탄수화물 없이 고단백 이터레이션 패턴을 탐색해보세요

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_0.png)

3년 전에 니킬 나니바데카(Nikhil Nanivadekar)와 함께 실험적인 콜렉션 프레임워크를 개발했었는데, 이 프레임워크는 공개 카타 저장소에서 사용되었고, 2020년 4월 JCP 이사회에 제출한 발표를 위해 준비했습니다. 이 블로그를 작성하여 우리가 배운 지식을 더 넓은 자바 커뮤니티와 공유하고자 합니다.

만약 이 블로그를 읽으시면, 25년 된 자바 컬렉션 프레임워크에 몇 가지 고급 자바 언어 기능을 이용하여 새로운 활력을 불어 넣는 방법에 대해 알 수 있을 겁니다. 우리 모두는 레거시 코드 베이스와 라이브러리를 다뤄야 합니다. 이 블로그에서 논의된 자바 기능을 활용하는 방법을 배우면, 당신의 레거시 코드 베이스를 안정적으로 유지하면서 오랜 기간 동안 발전시킬 수 있는 전략을 채택할 수 있을 겁니다.

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

제가 소개할 자바 언어의 주요 기능들은 다음과 같습니다:

- Covariant Return Types (Java 5부터 사용 가능)
- 인터페이스에서의 Default 및 Static 메서드 (Java 8부터 사용 가능)
- Sealed Classes (Java 16부터 final로 추가됨)

Covariant Return Types는 다른 기능들보다 덜 다뤄졌다고 느끼는 중요한 Java 기능입니다. Java 21에서의 Sequenced Collections의 추가로 최근 이 중요한 기능에 대한 관심이 증가했습니다. SequencedCollection 인터페이스에는 reversed라는 메서드가 있으며, 이 메서드는 SequencedSet, Deque, List 등에서 보다 구체적인 반환 유형을 가진 공변 재정의를 갖습니다.

인터페이스의 Default Methods와 Static Methods는 실험에서 사용한 레시피의 진수입니다. Default Methods on Interfaces는 Covariant Return Types와 아주 잘 맞았습니다. 이 블로그의 나머지 부분에서 이 세 가지 기능에 대해 논의하겠습니다.

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

이전에 Sealed Classes에 대한 블로그를 작성했습니다. Sealed Types를 사용하여 Immutable 컬렉션 유형을 구현한 방법에 대해 자세히 설명된 별도의 블로그에 링크하겠습니다.

# 고단백질 Java Collection 실험

우리는 Java Collection 인터페이스에 즉시 반복 패턴을 직접 추가하는 방법을 탐색했습니다. Java Stream 인터페이스 및 Collector 유틸리티의 지연 반복 패턴과 일치하는 메서드 이름을 사용했습니다. 결과적으로 표준 Java Collection 인터페이스를 확장하는 새로운 읽기 전용, 가변 및 불변 Collection 인터페이스 세트가 만들어졌습니다.

다음 UML 클래스 다이어그램은 실험의 일환으로 설계 및 코딩된 새로운, 청록색과 보라색의 인터페이스를 보여줍니다. 보라색 인터페이스는 Sealed Classes를 활용하여 구조적으로, 계약적으로, 그리고 검증 가능한 불변성을 제공하는 별도이지만 관련된 실험의 일부였습니다.

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

참고: 이 블로그의 나머지 부분에서 일부 코드 예제를 설명할 때 다음 다이어그램을 가끔 참조하겠습니다.

## 읽기 전용 인터페이스

읽기 전용 List, Set 및 Bag 인터페이스는 청록색으로 표시됩니다. 이러한 인터페이스는 List, Set 및 Bag의 Mutable 및 Immutable 버전 간에 일반적인 동작을 가능케 합니다. java.util.List와 읽기 전용 List, 또는 java.util.Set과 읽기 전용 Set 사이에는 관계가 없습니다. 이로써 이러한 새로운 인터페이스는 계약적으로 읽기 전용이 될 수 있습니다. 계약적으로 읽기 전용이라 함은 add 또는 remove와 같은 변경 메서드가 없는 것을 의미합니다.

## Mutable 인터페이스

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

가변 인터페이스는 모두 java.util 패키지의 해당 인터페이스를 확장합니다. java.util에는 Bag 유형이 없으므로 MutableBag은 MutableCollection과의 상속 관계를 통해 java.util.Collection을 확장합니다.

## 불변 인터페이스

불변 인터페이스는 java.lang.Iterable과 읽기 전용 인터페이스만을 확장합니다. java.lang.Iterable과의 관계는 읽기 전용 RichIterable 인터페이스를 통해 이루어집니다.

블로그의 나머지 부분에서 우리는 고급 Java 언어 기능 중 일부를 탐색하여 Java 컬렉션에 고품질 이너쉬 이터레이션 패턴을 추가한 방법에 대해 살펴보겠습니다. 먼저 Java Stream을 사용하여 간단한 필터링 문제를 해결하는 데 필요한 코딩 오버헤드를 다시 살펴볼 것입니다. List, Set 및 Bag에서 짝수를 필터링할 것입니다.

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

# Java Stream을 사용한 고탄수화물 이터레이션 패턴

Java Stream을 java.util.Collection과 함께 사용하려면 먼저 Collection에 stream 또는 parallelStream이름으로 "bun" 메소드를 호출해야 합니다. filter, map, flatMap과 같은 "protein" 메소드는 Stream 인터페이스에서 호출할 수 있습니다. filter 및 map과 같은 Lazy 메소드는 코드가 실행되려면 추가로 forEach 또는 Collector와 함께 collect를 호출하는 bun 작업이 필요합니다.

## MutableList에서 Stream을 사용한 Lazy filter 예제

다음 코드 예제는 MutableList을 사용하여 Integer List에서 짝수를 필터링하는 방법을 보여줍니다. MutableList은 우리가 생성한 새로운 인터페이스입니다.

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
@Test
public void filterEvensFromListToList()
{
    // MutableList 인터페이스의 of() 메서드를 사용하여 정적 리스트 생성
    MutableList<Integer> list = MutableList.of(1, 2, 3);

    // Stream에서의 Lazy 필터링 - 2개의 탄수화물, 1개의 단백질
    List<Integer> lazy = list.stream()
            .filter(each -> each % 2 == 0)
            .toList();

    // ImmutableList 인터페이스의 of() 메서드를 사용하여 정적 리스트 생성
    ImmutableList<Integer> expected = ImmutableList.of(2);
    Assertions.assertEquals(expected, lazy);
}
```

MutableList와 ImmutableList에는 인스턴스를 생성하는 of라는 정적 메서드가 있습니다.

Java Stream을 사용하면 stream, filter 및 toList를 호출해야 합니다. 중간에 두 가지 번 메서드(stream 및 toList)와 하나의 단백질 메서드(filter)가 있습니다.

## MutableSet에서 Stream을 사용한 Lazy 필터 예제

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

소스 컬렉션을 MutableSet으로 변경하면 코드가 어떻게 보이는지 살펴봅시다.

```js
@Test
public void filterEvensFromSetToSet()
{
    // MutableSet 인터페이스의 of() 정적 메서드
    MutableSet<Integer> set = MutableSet.of(1, 2, 3);

    // Stream의 Lazy 필터 - 2개의 중량, 1개의 단백질, 1개의 유틸리티 메서드
    Set<Integer> lazy = set.stream()
            .filter(each -> each % 2 == 0)
            .collect(Collectors.toSet());

    // ImmutableSet 인터페이스의 of() 정적 메서드
    ImmutableSet<Integer> expected = ImmutableSet.of(2);
    Assertions.assertEquals(expected, lazy);
}
```

MutableSet 및 ImmutableSet에 of 이름의 정적 메서드가 있습니다. Java Stream을 사용하면 stream, filter, collect 및 toSet을 호출해야 합니다. 두 번 메서드(stream 및 collect), 중간에 하나의 단백질 메서드(filter) 및 추가 유틸리티 메서드(Collectors.toSet)가 있습니다. 추가 유틸리티 메서드가 필요한 이유는 Stream에서 직접 toSet 메서드가 제공되지 않기 때문입니다.

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

## MutableBag에서 Stream을 사용한 Lazy filter 예제

MutableBag를 필터링하는 코드를 살펴보겠습니다. JDK에 포함되어 있지 않은 Collection 유형입니다.

```java
@Test
public void filterEvensFromBagToBag()
{
    // MutableBag 인터페이스의 of() 정적 메서드
    MutableBag<Integer> bag = MutableBag.of(1, 2, 3);

    // Stream에서 Lazy filter - 2개의 탄수화물, 1개의 단백질, 1개의 유틸리티, 1개의 메서드 참조
    Bag<Integer> lazy = bag.stream()
            .filter(each -> each % 2 == 0)
            .collect(Collectors.toCollection(MutableBag::empty));

    // ImmutableBag 인터페이스의 of() 정적 메서드
    ImmutableBag<Integer> expected = ImmutableBag.of(2);
    Assertions.assertEquals(expected, lazy);
}
```

MutableBag 및 ImmutableBag에서 of로 명명된 정적 메서드가 있습니다. 이러한 인터페이스의 인스턴스를 생성합니다.

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

Java Stream을 이용해야 합니다. stream, filter, collect, toCollection을 호출하고 empty에 대한 메소드 참조를 생성해야 합니다. 중간에 두 가지 bun 메소드(stream 및 collect), 하나의 protein 메소드(filter)가 있으며 추가적인 유틸리티 메소드(Collectors.toCollection)와 메소드 참조(MutableBag::empty)가 있습니다. 추가 유틸리티 메소드와 메소드 참조가 필요한 이유는 JDK에 Bag 유형이 없으며 Stream에 대한 toBag 메소드가 없기 때문입니다.

이제 Collection 인터페이스에 추가된 고단백질 반복 패턴을 살펴봅시다.

# Collections에서의 고단백질 반복 패턴

위 UML 클래스 다이어그램에 표시된 Stream 인터페이스의 게으른 메소드와 Collection 인터페이스에 직접 있는 즉시 메소드 간의 차이는 미묘하면서 중요합니다. Collection 인터페이스에 직접 사용 가능한 즉시 메소드가 있으면 사용법과 구현 코드가 간단해집니다. 2020년 4월에 다음 블로그를 작성하여 게으른 방식보다 즉시 방식이 더 쉽게 학습할 수 있는 이유를 설명했습니다.

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

열심히 반복하는 패턴에서는 "bun" 메서드(예: stream, collect, toList)가 더 이상 필요하지 않습니다. 대신 Collection 자체에서 filter 및 map과 같은 고단백 메서드를 직접 호출할 수 있습니다. 각 Collection 유형의 이러한 메서드의 반환 유형은 Collection 유형 자체이며, 각 하위 유형은 주어진 하위 유형에 적합한 가장 구체적인 유형을 반환하는 공변적 재정의를 제공할 수 있습니다. 단일 단백질 메서드를 사용하는 경우, 게으른 반복 패턴 대신 열심히 반복 패턴을 사용하여 성능을 향상시킬 수도 있습니다.

## MutableList을 사용한 열심히 필터링 예제

다음 코드 예제는 MutableList을 사용하여 Integer List에서 짝수를 필터링하는 방법을 보여줍니다.

```js
@Test
public void filterEvensFromMutableListToMutableList()
{
    // MutableList 인터페이스의 of() 정적 메서드
    MutableList<Integer> list = MutableList.of(1, 2, 3);

    // MutableList에서 공변적 반환을 사용한 열심히 필터링 - 1단백질
    MutableList<Integer> eager =
            list.filter(each -> each % 2 == 0);

    // ImmutableList 인터페이스의 of() 정적 메서드
    ImmutableList<Integer> expected = ImmutableList.of(2);

    Assertions.assertEquals(expected, eager);
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

MutableList에 대한 eager filter 메소드의 공변 리턴 타입은 MutableList입니다.

## MutableSet 및 MutableBag로 Eager filter

MutableSet 및 MutableBag에 대한 eager filter 메소드를 사용하는 솔루션은 위의 MutableList에 대한 것과 매우 유사해 보일 것입니다. MutableSet에 대한 filter 메소드의 공변 리턴 타입은 MutableSet입니다. MutableBag에 대한 filter 메소드의 공변 리턴 타입은 MutableBag입니다.

이제 이러한 예제들을 가능하게 한 멋진 언어 기능 중 일부를 탐구해 보겠습니다.

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

# 인터페이스의 정적 메소드

우리가 먼저 살펴볼 것은 MutableList 및 ImmutableList에 대한 정적 메소드의 구현입니다. 저는 위의 필터 테스트에서 이 두 인터페이스의 인스턴스를 생성하는 데 사용했습니다.

## MutableList의 정적 메소드

MutableList 인터페이스에는 여러 정적 메소드가 추가되었습니다. 저는 위의 필터 예제에서 of 메소드만 사용했습니다.

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

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_1.png)

이러한 메소드들을 사용하면 개발자들이 비어있는 MutableList를 만들거나, 한 개의 요소를 포함하는 MutableList를 만들거나, 오버로드된 방법을 이용하여 vararg 배열에서 MutableList를 만들 수 있습니다.

MutableList의 static 메소드에서 생성된 ArrayList2라는 새 클래스가 있습니다. ArrayList2의 구현은 간단합니다. ArrayList2는 단순히 ArrayList를 확장하고 MutableList 인터페이스를 구현하며, 일부 생성자를 재정의합니다.

다음은 ArrayList2에 대한 전체 클래스 정의입니다.

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

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_2.png)

ArrayList2는 상태나 ArrayList에서 사용 가능한 것을 제외한 행동을 정의하지 않습니다. 기존의 java.util.ArrayList 클래스는 이 인터페이스를 구현하고 이것이 ArrayList에서 필요한 유일한 변경 사항이어야 합니다. 현재 java.util.List 인터페이스에 변경을 가할 필요는 없습니다.

## MutableSet과 MutableBag 정적 메서드

MutableList과 유사하게, MutableSet과 MutableBag 인터페이스에는 empty와 of로 명명된 정적 메서드가 있습니다. MutableSet의 경우, 반환된 구현은 HashSet2가 될 것입니다. HashSet2는 java.util.HashSet를 확장하고 MutablSet 인터페이스를 구현합니다. 해당 클래스는 java.util.HashSet의 생성자만 재정의합니다.

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

JDK에는 Bag 유형이 존재하지 않아 MutableBag의 empty 및 of 메서드에서 참조된 HashBag 클래스는 처음부터 구현해야 했습니다. HashBag은 MutableBag 구현을 위한 기본 구현 세부 정보를 포함하고 있습니다. HashBag은 java.util.HashMap을 확장하는 HashMap2라는 새로운 클래스를 활용합니다. 이 코드를 자신만의 방식으로 살펴보시고 HashMap2에 의해 구현된 MutableMap 인터페이스를 확인할 수 있을 것입니다.

이제 인터페이스의 Default Methods가 만들어내는 엄청난 가능성을 살펴보겠습니다.

# 인터페이스의 Default Methods

Java 8부터 인터페이스에 default 메서드를 정의할 수 있게 되었습니다. Default 메서드를 사용하면 인터페이스에서 메서드의 구현을 정의할 수 있습니다. 인터페이스를 구현하는 클래스는 해당 메서드의 기본 구현을 받게 됩니다. 적절한 오버라이드를 제공하지 않는 한, 기존 구현을 손상시키지 않고 라이브러리의 인터페이스에 새로운 동작을 추가하는 것이 "안전"하다고 이론적으로 설명할 수 있습니다. 수십 년간 존재하고 널리 사용된 라이브러리의 경우에는 이 안전성에 일부 주의해야 합니다. 일반적으로 default 메서드 기능은 야생에서 정의된 메서드와 충돌이 없는 한 매우 잘 작동합니다.

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

Java Collection 유형에 대한 새로운 동작을 정의하기 위해 MutableList과 같은 확장 인터페이스에서만 기본 메서드를 정의하여 얼마나 멀리 갈 수 있는지 보고 싶었습니다. 우리는 상당히 멀리 갈 수 있었습니다. ArrayList2와 HashSet2에서 볼 수 있듯이, 클래스에 새로운 동작을 추가할 필요가 없었습니다. 생성자 재정의를 제외하고는 인터페이스를 확장하기만 하면 됐습니다.

이 섹션의 나머지 부분에서는 filter, map 및 flatMap의 eager 구현에 대해 설명하겠습니다. 추가한 나머지 동작은 위의 클래스 다이어그램에서 확인할 수 있으며 코드를 찾아볼 수 있습니다.

## RichIterable 인터페이스

계층 구조의 맨 위에는 RichIterable이라는 인터페이스가 있습니다. filter, map, flatMap에 대한 추상 메서드는 RichIterable에서 정의됩니다. 또한 각 메서드에 대해 대상 컬렉션을 매개변수로 사용하는 디폴트 오버로드된 구현도 있습니다.

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

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_3.png)

## RichIterable filter

RichIterable에 정의된 추상 및 기본 filter 메서드의 코드입니다.

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_4.png)

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

`filter` 메서드는 대상 기본 메서드와 함께 어떤 Collection 구현을 인자로 받을 수 있으며, 해당 유형이 메서드의 반환 유형이 됩니다. 이 메서드는 코드 중복을 줄이기 위해 각 하위 유형에서 사용됩니다.

## RichIterable map

다음은 RichIterable에 정의된 추상 및 기본 map 메서드에 대한 코드입니다.

![image](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_5.png)

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

`table` 태그를 Markdown 형식으로 변경해주세요.

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

`flatMap` 메서드의 타겟 디폴트 메서드는 인자로 MutableCollection 구현체를 사용할 수 있으며, 이 특정 서브타입이 메서드의 반환 타입으로 정의됩니다.

`flatMap`은 Iterable을 반환하는 함수를 인자로 취하기 때문에 Collection 대신에 여기서는 부모 반환 타입으로 MutableCollection이 사용됩니다. Collection 타입은 Iterable을 반환하는 addAll 메서드만을 갖고 있습니다. MutableCollection 인터페이스는 Iterable을 인자로 받는 default addAllIterable 메서드를 정의하고 있습니다.

여기 MutableCollection 인터페이스에 정의된 addAllIterable 메서드에 대한 코드가 있습니다. 해당 인터페이스는 RichIterable을 확장합니다.

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_7.png)

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

이 메소드에서 instanceof 기능에 대한 패턴 매칭이 사용된 것을 알 수 있습니다.

## MutableList 인터페이스

RichIterable에서 제공된 map, filter, flatMap의 기본 구현은 하위 유형의 구현을 간단하게 만들어줍니다. 대부분은 특정 유형을 전달하여 상위 메소드를 호출하여 Covariant Return Types를 제공하는 것이 대부분입니다.

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_8.png)

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

## MutableList filter

MutableList에서 정의된 기본 필터 메서드 코드가 여기 있습니다.

![MutableList filter method](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_9.png)

이 메서드는 RichIterable에 정의된 추상 필터 메서드를 재정의하며 RichIterable을 반환합니다. MutableList의 필터 메서드는 Covariant Return Type을 갖습니다. 이는 MutableList에서 filter를 호출하면 결과로 MutableList를 반환한다는 것을 의미합니다.

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

## MutableList map

MutableList의 기본 map 메서드에 대한 코드입니다.

<img src="/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_10.png" />

이 메서드는 RichIterable에 정의된 추상 map 메서드를 재정의하며 RichIterable을 반환합니다. MutableList의 map 메서드는 Covariant Return Type이 MutableList입니다. 즉, MutableList에서 map을 호출하면 결과로 MutableList를 얻게 됩니다.

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

## MutableList flatMap

기본 flatMap 메서드가 MutableList에서 정의된 코드입니다.

![flatMap method on MutableList](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_11.png)

이 메서드는 RichIterable에 정의된 추상 flatMap 메서드를 오버라이드하며 RichIterable을 반환합니다. MutableList의 flatMap 메서드는 Covariant Return Type이 MutableList인 반면을 반복한다. 이는 MutableList에서 flatMap을 호출하면 결과로 MutableList를 다시 얻게 됩니다.

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

## MutableSet 및 MutableBag 인터페이스

MutableSet 및 MutableBag 인터페이스의 filter, map 및 flatMap에 대한 기본 구현은 MutableList에서 정의된 것과 매우 유사하게 보일 것입니다. 이들은 RichIterable에 정의된 동일한 filter, map 및 flatMap 메서드를 기반으로 구축되며 더 구체적인 유형을 반환합니다.

![이미지](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_12.png)

인터페이스의 Default 및 Static 메서드, 공변 반환 유형을 결합하여 기존의 Java Collections Framework 구현에 중요한 확장 기능을 제공할 수 있었습니다.

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

# 불변 컬렉션 유형을 위한 Sealed 클래스

저는 Java에서 구조적, 계약적, 그리고 확인 가능한 불변성을 제공하는 ImmutableCollection 유형을 구현하기 위해 Sealed 클래스를 사용하는 방법에 대해 썼어요. 아래 블로그에서는 이 접근 방법을 자세히 설명하고 있어요. 이 별개이지만 관련된 컬렉션 디자인 실험을 읽는 데 즐거움을 느끼실 거에요.

# Pet Kata로 코드 테스트하기

저는 IntelliJ IDE를 열고 Eclipse Collections Pet Kata를 사용하여 2020년 초에 Nikhil Nanivadekar와 함께 작업한 유형 및 구현을 사용하여 얼마나 많은 문제를 해결할 수 있는지 다시 살펴봤어요. Pet kata를 구현하기 위해 일부 빠진 기능을 추가해야 했어요. 필요한 메서드를 추가하고 테스트를 작성하는 데 몇 시간을 보냈어요. Code Katas 저장소에 Pull Request로 notEmpty, containsBy, countByEach, groupByEach를 추가했어요. 또한 원본 필터, 맵 및 flatMap 구현을 리팩토링했어요. 이 메서드의 오버로드를 추출하여 대상 컬렉션까지의 RichIterable을 사용하는 방법으로 이 중복 for 루프 코드를 제거했어요.

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

저는 Pet Kata에서 실험적인 프레임워크를 사용하여 사용한 유형은 ImmutableList, Bag, MutableBag, MutableList, MutableSet, 그리고 MutableListMultimap입니다.

Pet Kata에서 사용한 즉시 실행 메서드는 containsBy, countBy, map, MutableBag.empty, MutableList.of, ImmutableList.of, MutableBag.of, ImmutableList.empty, map, filter, filterNot, anyMatch, allMatch, count, findFirst, flatMap, countByEach, groupBy, groupByEach입니다.

다음은 Eclipse Collections Pet Kata의 연습 문제 1부터 3까지의 코드 솔루션입니다. 저는 Person 및 Pet 클래스에 대해 Java 21 레코드를 사용했습니다. 아래에서 제 솔루션을 확인하시고, Eclipse Collections를 사용하는 Pet Kata의 솔루션과 비교해보세요.

## Person 레코드

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
public record Person(String firstName, String lastName, ImmutableList<Pet> pets)
{
    public String getFullName()
    {
        return this.firstName + ' ' + this.lastName;
    }

    public boolean named(String name)
    {
        return name.equals(this.getFullName());
    }

    public boolean hasPet(PetType petType)
    {
        return this.pets.containsBy(Pet::type, petType);
    }

    public boolean hasPet(String petEmoji)
    {
        return this.hasPet(PetType.fromEmoji(petEmoji));
    }

    public Bag<PetType> getPetTypes()
    {
        return this.pets.countBy(Pet::type);
    }

    public Bag<String> getPetEmojis()
    {
        return this.getPetTypes().map(Object::toString, MutableBag.empty());
    }

    public IntStream getPetAges()
    {
        return this.pets.stream().mapToInt(Pet::age);
    }

    public boolean isPetPerson()
    {
        return this.pets.notEmpty();
    }
}
```

## Pet record

```js
public record Pet(PetType type, String name, int age)
{
    @Override
    public String toString()
    {
        return this.type.toString();
    }
}
```

## PetType Enum

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
public enum PetType
{
    CAT("🐱"),
    DOG("🐶"),
    HAMSTER("🐹"),
    TURTLE("🐢"),
    BIRD("🐦"),
    SNAKE("🐍");

    private final String emoji;

    PetType(String emoji)
    {
        this.emoji = emoji;
    }

    @Override
    public String toString()
    {
        return this.emoji;
    }

    public static PetType fromEmoji(String searchEmoji)
    {
        return Stream.of(PetType.values())
                .filter(petType -> petType.emoji.equals(searchEmoji))
                .findFirst()
                .orElse(null);
    }
}
```

## PetDomainForKata

```java
public abstract class PetDomainForKata
{
    protected MutableList<Person> people;

    @BeforeEach
    public void setUp() throws Exception
    {
        this.people = MutableList.of(
                new Person("Mary", "Smith",
                    ImmutableList.of(new Pet(PetType.CAT, "Tabby", 2))),
                new Person("Bob", "Smith" ,
                    ImmutableList.of(
                        new Pet(PetType.CAT, "Dolly", 3),
                        new Pet(PetType.DOG, "Spot", 2))),
                new Person("Ted", "Smith",
                    ImmutableList.of(new Pet(PetType.DOG, "Spike", 4))),
                new Person("Jake", "Snake",
                    ImmutableList.of(new Pet(PetType.SNAKE, "Serpy", 1))),
                new Person("Barry", "Bird",
                    ImmutableList.of(new Pet(PetType.BIRD, "Tweety", 2))),
                new Person("Terry", "Turtle",
                    ImmutableList.of(new Pet(PetType.TURTLE, "Speedy", 1))),
                new Person("Harry", "Hamster",
                    ImmutableList.of(
                        new Pet(PetType.HAMSTER, "Fuzzy", 1),
                        new Pet(PetType.HAMSTER, "Wuzzy", 1))),
                new Person("John", "Doe", ImmutableList.empty())
        );
    }

    public Person getPersonNamed(String fullName)
    {
        return this.people.findFirst(person -> person.named(fullName))
            .orElse(null);
    }
}
```

## Exercise1Test

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
public class Exercise1Test extends PetDomainForKata
{
    @Test
    public void getFirstNamesOfAllPeople()
    {
        MutableList<String> firstNames =
            this.people.map(Person::firstName);

        var expectedFirstNames =
            MutableList.of("Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John");
        Assertions.assertEquals(expectedFirstNames, firstNames);
    }

    @Test
    public void getNamesOfMarySmithsPets()
    {
        Person person = this.getPersonNamed("Mary Smith");

        ImmutableList<Pet> pets = person.pets();

        ImmutableList<String> names =
            pets.map(Pet::name);

        Assertions.assertEquals(
            "Tabby",
            names.stream().collect(Collectors.joining("")));
    }

    @Test
    @DisplayName("getPeopleWithCats 🐱")
    public void getPeopleWithCats()
    {
        MutableList<Person> peopleWithCats =
            this.people.filter(person -> person.hasPet(PetType.CAT));

        var expectedLastNames = MutableList.of("Smith", "Smith");

        Assertions.assertEquals(
            expectedLastNames,
            peopleWithCats.map(Person::lastName));
    }

    @Test
    @DisplayName("getPeopleWithoutCats 🐱")
    public void getPeopleWithoutCats()
    {
        MutableList<Person> peopleWithoutCats =
            this.people.filterNot(person -> person.hasPet(PetType.CAT));

        var expectedLastNames =
            MutableList.of("Smith", "Snake", "Bird", "Turtle", "Hamster", "Doe");

        Assertions.assertEquals(
            expectedLastNames,
            peopleWithoutCats.map(Person::lastName));
    }
}
```

## Exercise2Test

```js
public class Exercise2Test extends PetDomainForKata
{
    @Test
    @DisplayName("doAnyPeopleHaveCats 🐱?")
    public void doAnyPeopleHaveCats()
    {
        Predicate<Person> predicate =
            person -> person.hasPet("🐱");

        Assertions.assertTrue(this.people.anyMatch(predicate));
    }

    @Test
    public void doAllPeopleHavePets()
    {
        boolean result =
            this.people.allMatch(Person::isPetPerson);

        Assertions.assertFalse(result);
    }

    @Test
    @DisplayName("howManyPeopleHaveCats 🐱?")
    public void howManyPeopleHaveCats()
    {
        int count =
            this.people.count(person -> person.hasPet("🐱"));

        Assertions.assertEquals(2, count);
    }

    @Test
    public void findMarySmith()
    {
        Person result =
            this.people.findFirst(person -> person.named("Mary Smith"))
                .orElse(null);

        Assertions.assertEquals("Mary", result.firstName());
        Assertions.assertEquals("Smith", result.lastName());
    }

    @Test
    @DisplayName("findPetNamedSerpy 🐍")
    public void findPetNamedSerpy()
    {
        MutableList<Pet> petList =
            this.people.flatMap(Person::pets);

        Pet serpySnake =
            petList.findFirst(pet -> pet.name().equals("Serpy"))
                .orElse(null);

        Assertions.assertEquals("🐍", serpySnake.type().toString());
    }

    @Test
    public void getPeopleWithPets()
    {
        MutableList<Person> petPeople =
            this.people.filter(Person::isPetPerson);

        Assertions.assertEquals(7, petPeople.size());
    }

    @Test
    public void getAllPetTypesOfAllPeople()
    {
        MutableSet<PetType> petTypes =
            this.people.flatMap(Person::getPetTypes, MutableSet.empty());

        var expected =
            MutableSet.of(PetType.CAT,
                    PetType.DOG,
                    PetType.TURTLE,
                    PetType.HAMSTER,
                    PetType.BIRD,
                    PetType.SNAKE);
        Assertions.assertEquals(expected, petTypes);
    }

    @Test
    public void getAllPetEmojisOfAllPeople()
    {
        MutableSet<String> petEmojis =
            this.people.flatMap(Person::getPetEmojis, MutableSet.empty());

        var expected =
            MutableSet.of("🐱", "🐶", "🐢", "🐹", "🐦", "🐍");
        Assertions.assertEquals(expected, petEmojis);
    }

    @Test
    public void getFirstNamesOfAllPeople()
    {
        MutableList<String> firstNames =
            this.people.map(Person::firstName);

        var expected =
            MutableList.of("Mary", "Bob", "Ted", "Jake", "Barry", "Terry", "Harry", "John");
        Assertions.assertEquals(expected, firstNames);
    }

    @Test
    @DisplayName("doAnyPeopleHaveCatsRefactor 🐱?")
    public void doAnyPeopleHaveCatsRefactor()
    {
        boolean peopleHaveCatsLazy =
            this.people.stream().anyMatch(person -> person.hasPet("🐱"));
        Assertions.assertTrue(peopleHaveCatsLazy);

        boolean peopleHaveCatsEager =
            this.people.anyMatch(person -> person.hasPet("🐱"));
        Assertions.assertTrue(peopleHaveCatsEager);
    }

    @Test
    @DisplayName("doAllPeopleHaveCatsRefactor 🐱?")
    public void doAllPeopleHaveCatsRefactor()
    {
        boolean peopleHaveCatsLazy =
            this.people.stream().allMatch(person -> person.hasPet("🐱"));

        Assertions.assertFalse(peopleHaveCatsLazy);

        boolean peopleHaveCatsEager =
            this.people.allMatch(person -> person.hasPet("🐱"));

        Assertions.assertFalse(peopleHaveCatsEager);
    }

    @Test
    @DisplayName("getPeopleWithCatsRefactor 🐱?")
    public void getPeopleWithCatsRefactor()
    {
        MutableList<Person> peopleWithCats =
            this.people.filter(person -> person.hasPet("🐱"));

        Assertions.assertEquals(2, peopleWithCats.size());
    }

    @Test
    @DisplayName("getPeopleWithoutCatsRefactor 🐱?")
    public void getPeopleWithoutCatsRefactor()
    {
        MutableList<Person> peopleWithoutCats =
            this.people.filterNot(person -> person.hasPet("🐱"));

        Assertions.assertEquals(6, peopleWithoutCats.size());
    }
}
```

## Exercise3Test

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
public class Exercise3Test extends PetDomainForKata
{
    @Test
    public void getCountsByPetEmojis()
    {
        MutableList<PetType> petTypes =
            this.people.flatMap(Person::pets).map(Pet::type);

        Map<String, Long> petEmojiCounts =
            petTypes.stream()
              .collect(Collectors.groupingBy(Object::toString,
                      Collectors.counting()));

        var expectedMap =
            Map.of("🐱", 2L, "🐶", 2L, "🐹", 2L, "🐍", 1L, "🐢", 1L, "🐦", 1L);
        Assertions.assertEquals(expectedMap, petEmojiCounts);

        MutableBag<String> counts =
            this.people.countByEach(Person::getPetEmojis);

        var expected =
            MutableBag.of("🐱", "🐱", "🐶", "🐶", "🐹", "🐹", "🐍", "🐢", "🐦");
        Assertions.assertEquals(expected, counts);
    }

    @Test
    public void getPeopleByLastName()
    {
        MutableListMultimap<String, Person> lastNamesToPeople =
            this.people.groupBy(Person::lastName);

        Assertions.assertEquals(3, lastNamesToPeople.get("Smith").size());
    }

    @Test
    public void getPeopleByTheirPetTypes()
    {
        MutableListMultimap<PetType, Person> petTypesToPeople =
            this.people.groupByEach(Person::getPetTypes);

        Assertions.assertEquals(2, petTypesToPeople.get(PetType.CAT).size());
        Assertions.assertEquals(2, petTypesToPeople.get(PetType.DOG).size());
        Assertions.assertEquals(2, petTypesToPeople.get(PetType.HAMSTER).size());
        Assertions.assertEquals(1, petTypesToPeople.get(PetType.TURTLE).size());
        Assertions.assertEquals(1, petTypesToPeople.get(PetType.BIRD).size());
        Assertions.assertEquals(1, petTypesToPeople.get(PetType.SNAKE).size());
    }

    @Test
    public void getPeopleByTheirPetEmojis()
    {
        MutableListMultimap<String, Person> petEmojisToPeople =
            this.people.groupByEach(Person::getPetEmojis);

        Assertions.assertEquals(2, petEmojisToPeople.get("🐱").size());
        Assertions.assertEquals(2, petEmojisToPeople.get("🐶").size());
        Assertions.assertEquals(2, petEmojisToPeople.get("🐹").size());
        Assertions.assertEquals(1, petEmojisToPeople.get("🐢").size());
        Assertions.assertEquals(1, petEmojisToPeople.get("🐦").size());
        Assertions.assertEquals(1, petEmojisToPeople.get("🐍").size());
    }
}
```

# Java Collections 2.0은 어디로 갔을까요?

2020년 4월, 저희는 Java Community Process (JCP) Executive Committee (EC)에게 Collections 2.0에 대한 JSR을 제안하는 발표를 진행했습니다. 저희는 이 실험적인 컬렉션 프레임워크를 구축하여 Java 프로그래밍 언어의 모든 멋진 기능 및 다양한 컬렉션 라이브러리에서 얻은 교훈을 활용한 가능성을 보여주고자 했습니다. 저희는 이 실험적인 코드를 덱 오브 카드 카타와 같은 모듈에 넣었는데, 이는 다양한 Java 컬렉션 프레임워크 및 JVM 언어를 비교하고 대조하기 위해 사용될 수 있는 코드 카타입니다. 이 발표는 Java 14 출시 후 약 한 달 후에 진행되었습니다.

하지만 이후로는 Collections 2.0을 위한 JSR을 밀어내겠다는 생각을 버렸습니다. 저는 이제 덜 가본 길을 걷어와서 두 번이나 갔습니다! 저는 Java용 오픈 소스 컬렉션 라이브러리에 20년을 투자해왔습니다. Eclipse Collections는 여러 개의 디자인 선택 사항에 일조한 디자인으로 자신을 증명해왔으며, 이 실험적인 프레임워크를 구축할 때 우리가 취한 일부 디자인 선택 사항에 영감을 주었습니다. Eclipse Collections는 저와 함께 여전히 수백만 개의 프로덕션 사용 사례에서 유용성을 증명하면서, 현장에서 만나보지 못할 오픈 소스 개발자들과 협력하여 유용한 문제를 해결하는 데 기쁨을 느끼게 해줍니다. Java Collections이 새로운 인터페이스나 기존 인터페이스에 빠른 반복 패턴을 제공하든지 하지 않든지, 저는 Eclipse Collections 작업을 계속할 것입니다.

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

저는 여전히 JDK에서 Java Collection 유형에 직접 열망적인 반복 패턴을 제공하는 가치가 있다고 믿습니다. 이 블로그를 쓴 이유는 다른 사람들이 이 실험에서 배울 수 있기를 바라는 것입니다. 이는 자신의 Java 라이브러리 작업을 위한 것이든 기존의 Java Collections 프레임워크의 계속된 진화를 이끌어나가는 데 참여할 수도 있습니다.

## 기존의 Java Collection 인터페이스를 왜 업데이트하지 않는 걸까요?

만약 filter, map, flatMap과 같은 메서드가 java.util.Collection, java.util.List, java.util.Set에 추가되지 않은 이유에 궁금하다면 StackOverflow의 아래 답변이 도움이 될지도 모릅니다.

RichIterable, MutableCollection, MutableList 등의 새 인터페이스를 도입하여 실험적 컬렉션 프레임워크에서 취한 방식은 잠재적인 충돌 표면 문제를 상당히 줄입니다.

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

기존의 Java Collections Framework를 발전시키는 한 가지 아이디어는 기존 구현체들 (예: ArrayList, HashSet)을 새로운 인터페이스 확장을 구현함으로써 발전시키는 것입니다. 다음 다이어그램은 이러한 발전 가능성 중 하나를 보여줍니다.

![다이어그램](/assets/img/2024-07-09-WhatIfJavaCollectionsHadEagerMethodsforFilterMapFlatMap_13.png)

# 이 블로그에서 얻을 수 있는 것들

지난 10년간 Java 언어의 발전은 정말 놀라운 것입니다. 인터페이스의 Default 및 Static 메서드들은 Java 라이브러리 개발자들에게 많은 새로운 디자인을 가능하게 합니다. 다이아몬드 계층 구조를 다룰 때 몇 가지 "주의할 점"이 있지만, 가능성은 무궁무진합니다. 이 블로그가 몇 가지 언어 기능을 함께 사용하여 무엇이 가능한지를 보여줄 수 있기를 희망합니다.

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

실험에서 코드를 확인하고 공변 반환 유형, 인터페이스의 기본 및 정적 메서드, 그리고 Sealed 클래스에 대해 직접 몇 가지 실험을 해보시는 걸 적극 권장합니다. 문제 해결에 새로운 접근법을 배울 때 우리 모두가 혜택을 받을 수 있어요.

지금까지 읽어주셔서 감사합니다! 선택한 모든 길에서 행운을 빕니다!

저는 Eclipse Collections OSS 프로젝트의 창조자이자 커미터이며, 해당 프로젝트는 Eclipse Foundation에서 관리됩니다. Eclipse Collections는 기여를 환영합니다.
