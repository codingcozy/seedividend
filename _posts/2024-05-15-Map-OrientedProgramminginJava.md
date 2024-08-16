---
title: "자바에서의 지도 지향 프로그래밍"
description: ""
coverImage: "/assets/img/2024-05-15-Map-OrientedProgramminginJava_0.png"
date: 2024-05-15 15:16
ogImage: 
  url: /assets/img/2024-05-15-Map-OrientedProgramminginJava_0.png
tag: Tech
originalTitle: "Map-Oriented Programming in Java"
link: "https://medium.com/@donraab/map-oriented-programming-in-java-cc430f25673e"
isUpdated: true
---




MOP을 사용하는 것은 때로는 편리할 수 있지만, 때로는 엉망일 수도 있습니다.

![MOP image](/assets/img/2024-05-15-Map-OrientedProgramminginJava_0.png)

# 바트폴로 가기!

Twitter 및 LinkedIn에서 개발자들이 Bag/Multiset 유형을 사용하는지 또는 Java Map만 사용하는지에 대해 투표를 진행했습니다. 놀랍게도, java.util.Map이 양쪽 투표 모두에서 우세하게 보입니다.



(1960년대 TV 버전 배트맨을 보지 못한 분들께 죄송합니다… 배트폴은 슬라이딩 서랍장 뒤에 숨겨진 두 막대이며 배트맨과 로빈은 이를 사용하여 배트케이브로 미끄러져 내려갔습니다.)

이 질문은 Bag와 Map 중 어떤 것이 더 나은 유형인지를 결정하기 위한 것이 아닙니다. 두 인터페이스는 서로 다른 목적을 위해 사용되며 다른 동작을 갖습니다. Map은 키를 값에 연결합니다. Bag는 순서가 없는 중복되지 않는 컬렉션으로, 사물의 개수를 추적하기 쉽게 해주며 일반적으로 조회 속도를 높이기 위해 Map에 의해 지원됩니다. Map은 개수를 추적하는 데 사용될 수 있으며, 마찬가지로 망치를 잭해머 대신 콘크리트에 구멍을 뚫기 위해 사용할 수 있습니다. 누구도 망치가 콘크리트에 구멍을 뚫는 데 더 나은 도구라고 주장하지 않을 것입니다. 그러나 손에 잭해머가 없다면, 가지고 있는 망치로 콘크리트를 두드려 구멍을 뚫게 될 것입니다.

어쨌든, 다시 설문과 궁극적인 질문으로… 이 설문에 언급된 세 개의 라이브러리는 Java에서 Bag/Multiset 유형을 제공합니다 - Google Guava, Apache Commons Collections 및 Eclipse Collections. 그리고 Java에서의 Map도 있습니다. 진짜 질문은 당신이 어플리케이션에 Bag/Multiset 유형을 얻기 위해 제3자 종속성을 받아들일 의사가 있는지이거나 Map-지향 프로그래밍(MOP)을 유지하는 것에 만족하는지입니다? 대부분의 개발자들은 요즘 다양한 이유로(바이너리 크기, 버전 충돌 해결, 잠재적 취약점 등) 제3자 종속성을 제한하려고 합니다. 이로 인해 대부분의 개발자들은 단지 JDK에서 제공되는 Map-지향 프로그래밍 대안을 활용하거나 Bag/Multiset 솔루션을 직접 만들어야 하는 입장에 자리 잡게 됩니다. 대부분 아는 개발자들은 Map-지향 프로그래밍 솔루션을 선택합니다.

다음 인용구는 Map-지향 프로그래밍 (MOP)의 본질입니다.



MOP의 문제는 Map이 key와 value 슬롯에 포함할 데이터에 대해 매우 유연하지만 그 동작은 동일하다는 점입니다. 말 그대로 Map이라는 것입니다. 거기에 데이터를 넣을 수도 있고, 빼낼 수도 있습니다. null이나 다른 무작위 타입을 포함하여요. 오랜 시간 동안 Java Map 인터페이스는 키가 없는 경우 기본 값을 가져오거나 요소를 병합하거나 계산할 수 있는 새로운 Map 특정 동작을 추가하여 유연성을 향상시켰습니다. 값 슬롯 중 하나에 컬렉션에 항목을 추가하거나 제거하는 등의 Map 계약의 일부가 아닌 추가 특수 동작이 코드에 노출되거나 Stream 및 Collector에 추가된 알고리즘에 끼어들게 됩니다. Map 위에 보완적인 동작을 제공하는 유형 및 구조를 가질 수 있는 능력을 상실합니다.

저는 Smalltalk와 Java에서 전문적으로 일한 경험이 있어 동적 타입 시스템과 정적 타입 시스템 모두의 혜택을 즐겼습니다. 때로는 Map과 같은 데이터 구조는 동적 타입 시스템의 혜택을 느끼게 해줍니다만 정적 타입 시스템의 혜택은 제공하지 않습니다. 제게는 여러 가지 이유로 정적 타입 시스템을 좋아합니다. 혼자 개발할 때 때로는 속도를 늦춥니다만요. Map-지향 프로그래밍을 좋아하지는 않지만 새로운 유형을 추가하는 것이 번거로운 경우 편리함을 제공할 때 가끔 사용합니다. 새로운 유형이 필요하다는 것을 발견하면 주로 추가합니다. 이것은 가끔 어려운 길일 수 있지만 보통 옳은 길입니다. 저희 애플리케이션에 있는 모든 새로운 유형 추가에는 비용이 들지만, 의사 소통, 명확성, 캡슐화, 코드 중복 감소, 증가한 안전성 및 성능 향상과 같은 혜택도 함께 있습니다.

JDK에는 Map으로 대체된 세 가지 누락된 유형이 있습니다. Map을 사용하면 기존 유형 유연성을 활용하여 비용을 피할 수 있습니다. 이 경우 프레임워크 개발자에게 부과된 비용은 Map을 반환 유형으로 사용하는 애플리케이션 개발자로 옮겨집니다. 다음은 이러한 Map 반환 유형을 사용하는 Collectors에서 변경할 수 없는 Map 반환 유형입니다. Java 8이 출시되었을 때 Collectors에 도입된 이 Map 반환 유형들입니다.

```js
// Map<Boolean, List<T>> -> Pair<T, T>
Collectors.partitioningBy()

// Map<T, Long>          -> Bag<T>
Collectors.groupingBy(Collectors.counting)

// Map<K, Collection<V>> -> Multimap<K, V> 
Collectors.groupingBy() 
```



페어(Pair), 가방(Bag) 및 멀티맵(Multimap)은 JDK에 빠진 몇 가지 유형 중 일부일 뿐이에요. 우리는 partitioningBy와 같은 경우에 Pair를 더 구체적으로 부르는 것이 가능하긴 하지만 여전히 같은 유형의 두 가지 항목으로 이루어진 Pair라는 것이에요.

# 우리는 Pair 유형이 필요 없어요!

자바에 제네릭 Pair 유형이나 제네릭 튜플 지원을 추가하지 않기로 한 결정은 신중하게 이루어 졌어요. 대신, Java Records를 통해 생성된 명명된 유형의 사용이 권장되는데, 이는 자바 16부터 릴리스된 이후부터 해당되는 사항이에요. 이 결정은 제가 완전히 지지하는 것이며, 제가 만든 오픈 소스 프레임워크(Eclipse Collections)가 Pair와 Triple 유형을 가지고 있더라도 그렇죠. 특수화된 유형을 만드는 것을 감사하게 생각하며, Java Records를 사용하여 매우 간단하게 수행할 수 있는 기술은 멋지다고 느껴요.

다음에 올 내용을 기대해 주세요.



## 지도를 이용해봅시다!

일반적인 Pair 유형으로 Map을 사용하는 것은 일반적인 Pair 유형을 추가하는 것보다 나쁠 수 있다고 말할 수 있습니다. Map을 Pair로 사용하는 방법은 무엇인가요? JDK의 Stream 및 Collectors 코드에 있는 partitioningBy의 예제가 있습니다.

다음과 같은 partitioningBy 예제를 살펴봅시다. 이 예제에서는 Integer Stream을 짝수와 홀수로 분리된 List 인스턴스로 필터링하는 과정을 한 번에 수행합니다.

```js
@Test
public void partitioningBy()
{
    Map<Boolean, List<Integer>> map =
            IntStream.rangeClosed(1, 10)
                    .boxed()
                    .collect(Collectors.partitioningBy(each -> each % 2 == 0));

    List<Integer> evens = map.get(true);
    List<Integer> odds = map.get(false);
    List<Integer> ummm = map.get(null);
    List<Integer> ohno = map.get(new Object());

    Assertions.assertEquals(List.of(2, 4, 6, 8, 10), evens);
    Assertions.assertEquals(List.of(1, 3, 5, 7, 9), odds);
    Assertions.assertNull(ummm);
    Assertions.assertNull(ohno);

    ummm = map.getOrDefault(null, evens);
    Assertions.assertEquals(List.of(2, 4, 6, 8, 10), ummm);

    ohno = map.getOrDefault(new Object(), odds);
    Assertions.assertEquals(List.of(1, 3, 5, 7, 9), ohno);
}
```



이 코드는 1부터 10까지의 정수를 가진 Stream을 가져와서 partitioningBy를 사용하여 짝수 값을 하나의 List로 필터링하고 홀수 값을 다른 List로 분할합니다. 결과는 Map`Boolean, List`Integer``입니다. 맵에서 true 값은 포함하는 필터, false 값은 배타적인 필터, null 값은... 기다려봐, 왜 이 Map에 null 값이 있는 거지? 왜 Map`Boolean, List`Integer``에서 새로운 Object() 검색이 있는 거지? 여기에서 무슨 일이 벌어지고 있는 거야!?! Map은 제네릭이 Java에 추가되기 전인 Java 5 이전에 존재했음을 기억해. Map의 get 메서드는 제네릭이 아니고 모든 종류의 객체를 수용해.

partitioningBy 결과를 깊게 파본 적이 없다면, 이 메서드는 Partition이라는 이름의 타입의 인스턴스를 반환하며, 이는 Collectors의 내부 클래스입니다. partitioningBy 메서드가 Map`Boolean, List`Type``을 반환한다는 것은 알고 있었지만, 실제 구현에 대해선 오늘 살펴보기 전까지 알지 못했어. Partition 타입은 변경할 수 없지만 위에서 설명한 대로 Map처럼 동작해. Map의 get 메서드는 제네릭이 아니기 때문에 모든 종류의 객체를 수용해. Partition 클래스는 get을 통한 부울이 아닌 접근 시 null을 반환하되 예외를 던지지는 않아. 잠재적으로 모든 종류로의 조회는 null을 반환해. getOrDefault 또는 다른 읽기 전용 Map 메서드는 다른 Map 유형과 일관된 방식으로 동작해. put과 같은 가변 메서드는 예외를 던집니다.

## 원시 BooleanObjectMap을 사용해볼까요?

부울을 키로 사용하는 원시 BooleanObjectMap의 제네릭 get 문제를 해결하기 위해 Eclipse Collections의 원시 버전을 제안할 것인지 궁금하신 분들을 위해... 나는 제안하지 않을 거야, 그리고 할 수도 없어. BooleanObjectMap 타입은 Eclipse Collections에 존재하지 않아. 우리가 원시 Map 계층 구조를 설계할 때, 우리는 부울을 키로 하는 모든 원시 맵 조합을 제거하기로 결정했어. Eclipse Collections에는 부울을 키로 하는 모든 것의 맵이 없어.



Boolean 유형의 Map은 망치처럼 사용하는 것 같은 디자인 문제가 있습니다. true와 false 각각에 대한 두 가지 값이 필요하다면 값을 저장할 두 가지 변수를 사용하고 이러한 값을 특정 유형에 넣으세요. 새 유형 안의 변수는 의도를 드러내는 이름(예: 선택된(selected) 및 거부된(rejected), Eclipse Collections의 PartitionIterable)을 가질 수 있습니다. ifTrue와 ifFalse와 같이 의미 없는 이름이 아니라 Map의 Boolean 값처럼 적은 의미를 가진 이름을 사용하지 마세요. 이러한 값들을 무언가의 단일 제네릭 인스턴스로 함께 전달하려면 새로운 유형을 추가할 수 없거나 원하지 않으므로 제네릭 Pair를 사용하세요. 구매자 유의. Pair를 사용하면 내부 값에 대해 덜 의미 있는 이름을 얻을 것입니다 (one과 two 또는 left와 right).

## 만약 Boolean 대신 Enum을 키 유형으로 사용하면 어떨까요?

같은 유형의 쌍을 나타내기 위해 Map을 사용하는 또 다른 옵션은 키로 Enum을 사용하는 것입니다. Enum 내의 이름이 의도를 드러내는 이름(예: Filter.SELECTED, Filter.REJECTED)을 가지도록 한 후 map.get(Filter.SELECTED) 대신 map.get(true)을 쓸 수 있습니다.

이 솔루션에는 키 이름을 포함할 새 Enum 유형이 만들어져야 합니다. 이미 새 유형을 추가해야 하는 경우에는 지정된 변수와 유형으로 필요한 특정 유형을 정의하는 것이 더 좋습니다(e.g., 선택된(selected) 및 거부된(rejected) 변수를 가진 Partition 유형). Enum에서 더 나은 이름도 Map의 get 메서드에 대한 일반적인 문제를 해결하지 않습니다. 사실, 여전히 map.get(true)를 작성하면 null을 반환할 수 있습니다.



# Stop Hammer time!

저는 JDK가 가능한 경우에는 Map 대신에 특정 유형을 반환하여 정적 유형의 이점을 활용하는 것이 더 나을 것이라고 생각합니다. partitioningBy에 대해 Partition 유형을 반환하는 것이 Map을 반환하는 것보다 더 의미가 있을 것으로 생각합니다. 이렇게 하면 새로운 공개 유형을 노출해야 합니다. Partition 유형은 비공개 정적입니다. 새로운 공개 유형이 Pair와 같이 완전히 일반적인 유형이 될 필요는 없습니다. Eclipse Collections의 partition 메서드는 RichIterable에서 PartitionIterable 유형을 반환합니다. Eclipse Collections 개발자가 처리하는 이 유형과 모든 하위 유형을 추가/유지하는 데는 비용이 듭니다. 라이브러리를 사용하는 개발자들에게 유형 계층구조의 다양한 수준에서 가장 안전하고 가장 구체적인 대안을 제공합니다.

```java
@Test
public void partition()
{
    PartitionMutableList<Integer> partition =
            Interval.oneTo(10)
                    .partition(each -> each % 2 == 0);

    MutableList<Integer> selected = partition.getSelected();
    MutableList<Integer> rejected = partition.getRejected();

    Assertions.assertEquals(List.of(2, 4, 6, 8, 10), selected);
    Assertions.assertEquals(List.of(1, 3, 5, 7, 9), rejected);
}
```

Collectors가 Map을 반환하는 두 가지 다른 위치가 더 구체적인 유형으로 반환될 것이 더 나았을 것입니다. 문제는 편의성과 비용입니다. Java 8 릴리스에서 Bag 또는 Multimap과 같은 보다 구체적인 유형을 도입할 필요가 있었기 때문에 Map을 반환하는 것이 더 편리했었습니다. 하지만 이는 Java 8 릴리스를 크게 지연시킬 수도 있었을 것입니다. 몇 년 전 Eclipse Collections에서 이러한 유형이 생성된 것을 본 바 있습니다. 이러한 유형은 구축 및 테스트하기가 모두 비용이 많이 드는 것으로 확인할 수 있습니다. 안타깝게도, 편의성을 따라가고 Collectors에서 Map 형식을 영원히 반환할 결정에 갇혀 있습니다.



저는 이전에 Map vs. Bag 및 Map vs. Multimap에 대해 블로그를 작성했습니다. 더 알고 싶다면 아래 링크에서 블로그를 읽어보세요.

Eclipse Collections에서 partition에 대한 몇 가지 다른 예제와 세부 정보가 있습니다. 아래 블로그에 해당 내용이 있습니다. 이 블로그에서 일부 개발자들에게 가장 흥미로운 것은 partition 메서드의 공변성을 지원하기 위해 구현된 PartitionIterable 계층 구조입니다.

# Map-중심 프로그래밍의 미래

Map은 망치입니다. 매우 유용하고 편리한 도구이지만, 우리는 Map을 모든 용도의 도구로 자주 사용하며, 유연한 반환 유형으로 너무 자주 의지합니다. Java Records는 정적 타입의 이점과 함께 새로운 편의수준을 제공합니다. Bag 및 Multimap과 같은 추가 Collection 유형은 Map의 능력을 다양한 특수화된 동작으로 보완하여 개발자가 활용할 수 있도록 합니다.



데이터 중심 프로그래밍 공간에서는 행 기반 맵 컬렉션보다 훨씬 구체적인 Dataframe 라이브러리와 같은 솔루션을 선호합니다. 이러한 라이브러리들은 기능과 목적에 대해 맵 컬렉션보다 훨씬 명확합니다. 제 생각에는 Java Record가 정적 타입 검사가 가능한 레코드 유형의 컬렉션을 생성하는 데 좋은 저회의 대안을 제공합니다. 이는 타입 안정성, 메모리 효율성 및 성능을 제공하는 데 도움이 됩니다.

JDK에 더 많은 컬렉션 유형이 통합되기를 희망합니다. 편리하지만 혼란스러운 대체로 Map을 계속 사용하는 대신 Partition, Bag 및 Multimap 유형이 포함되었으면 좋겠습니다. 이미 Partition은 구현으로 존재합니다. Partition은 Map이 된 척을 그만두고 대신 더 구체적이고 제한적인 인터페이스로 공개되거나 표현되어야 합니다. 안타깝게도 partitioningBy가 이미 Map을 반환하기 때문에 이 메서드는 아마도 변경되지 않을 것이지만 더 나은 반환 유형을 가진 대안으로 대체될 수 있도록 사용 중지 또는 폐기될 수 있습니다.

이 블로그를 통해 Map을 모든 용도의 반환 유형으로 사용할 때의 비용 대비 이점에 대해 생각해보시기를 바랍니다. 내 권장 사항 -- 그렇게 하지 마십시오! 메서드에 대해 사용 가능한 최상의 옵션이 이메일 인 경우에만 Map을 반환 유형으로 사용하십시오. 다른 유형이 더 나은 옵션이 될 경우에는 해당 유형을 생성하거나 이미 존재하는 경우 사용하십시오.

읽어 주셔서 감사합니다!



저는 Eclipse Collections OSS 프로젝트의 창시자이자 기여자입니다. 이 프로젝트는 Eclipse Foundation에서 관리됩니다. Eclipse Collections는 기여를 환영합니다.