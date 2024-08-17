---
title: "Java에서 컬렉션과 숨바꼭질 효과적 사용 방법을 알아보자"
description: ""
coverImage: "/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_0.png"
date: 2024-08-13 11:38
ogImage: 
  url: /assets/img/2024-08-13-HideandSeekwithCollectionsinJava_0.png
tag: Tech
originalTitle: "Hide and Seek with Collections in Java"
link: "https://medium.com/@donraab/hide-and-seek-with-java-collections-cb988aeef558"
isUpdated: true
updatedAt: 1723863993900
---


Eclipse Collections의 Collection Accessor Method 패턴을 다시 살펴보자.

![이미지](/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_0.png)

# 관계는 복잡해요

이 블로그는 사고실험입니다. 전통적인 아이디어들을 다시 살펴보고 새로운 아이디어를 탐구하고 있습니다. 몇 가지 직감이 있는데, 그것들을 코드 예제를 통해 확인하려고 합니다. 조급해하지 마세요. 여기에 중요한 것이 있다고 생각해요.

<div class="content-ad"></div>

변화는 일어날 수 있고, 그를 관리하는 것은 도전적일 수 있어요. 객체지향 도메인을 모델링할 때 안전하게 변화를 관리하는 방법은 해결해야 할 주요 문제 중 하나에요. "많은"을 나타내는 클래스 간의 관계는 종종 컬렉션을 사용해 메모리 안에서 모델링돼요. 이 블로그에서는 Order와 LineItem의 간단한 모델을 탐구할 거에요. Order는 LineItem과의 0개 이상의 관계를 가지고 있어요.

![이미지](/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_1.png)

관계를 가진 클래스를 설계할 때 선택권이 있어요. 이 관계를 Java에서 어떻게 표현할지 결정해야 해요. List, Set, Bag, Stack 또는 Map을 사용할까요? 이 관계를 공개적으로 알려줄까요 아니면 비공개로 유지할까요? 이 관계에 속한 객체에 대한 정보를 외부 세계와 어떻게 공유할까요?

이 다이어그램에서 Order 클래스를 구현하는 여러 가지 방법이 있어요. LineItem 클래스는 훨씬 간단해요. 우리는 Java 레코드를 사용하고 상태를 불변하게 만들 거에요.

<div class="content-ad"></div>

우리는 블로그에서 컬렉션을 사용하여 객체 지향 도메인을 안전하게 모델링하고 구현하는 세 가지 방법을 살펴볼 겁니다.

- 컬렉션 접근자 메서드(켄트 벡의 두 책에서)
- 불변 컬렉션
- 읽기 전용 컬렉션

세 가지 접근 방식은 모두 한 가지 공통 규칙을 공유합니다. 도메인 클래스의 공개 메서드로 변경 가능한 컬렉션 인터페이스를 노출해서는 절대로 안 됩니다. 클래스는 클라이언트가 내부 상태를 직접 수정할 수 없도록 해야 합니다. 이 규칙은 논리적인 조언처럼 들리겠지만, 모든 Java Collection Framework 인터페이스가 변경 가능한 것임을 깨달을 때까지는 그렇지 않은 것 같습니다. 오 와우! 이것은 모든 도메인이 모델링되고 Java 컬렉션 유형을 노출하는 것이 본질적으로 결함이고 안전하지 않다는 것을 의미합니다. 아야. Java 개발자들에게는 불편한 진실입니다.

그래서 여기서 우리는 Java 컬렉션을 숨기고 찾는 게임을 시작합니다.

<div class="content-ad"></div>

# Collection Accessor Method

일반적인 컬렉션을 의도를 드러내는 방법으로 보호하는 아이디어는 꽤 오래된 것입니다. 나는 켄트 백(Kent Beck)이 쓴 두 권의 책에서 이 상식적인 조언을 Collection Accessor Method라는 패턴에 거슬러 올라간 것을 발견할 수 있었습니다. 첫 번째 책은 Smalltalk Best Practice Patterns (SBPP, p.96)로, 1997년부터 존재해 왔습니다. 이 책에는 Smalltalk 개발자를 위한 훌륭한 조언이 담겨 있으며, 사실 어떤 객체지향 언어를 사용하는 개발자들에게도 좋은 충고가 있습니다. 두 번째 책은 Implementation Patterns (IP, p.91)으로, 2007년에 출간되었습니다. 이 책은 SBPP에서 패턴을 다시 살펴보고 Java 개발자들에게 훌륭한 조언을 담아 다듬었습니다.

두 책 모두 컬렉션의 요소에 접근하는 가장 간단한 방법은 getter 메서드를 통해 컬렉션을 노출하는 것이라고 합니다. 이것이 변경과 관련된 문제가 시작되는 지점입니다. 두 책 모두 클라이언트가 포함 클래스의 컨텍스트 외부에서 가변 컬렉션을 수정할 수 있는 문제점을 설명하고 더 나은 대안을 권장합니다.

한 가지 방법이 여섯, 반가지 방법이 여섯입니다.

<div class="content-ad"></div>

SBPP 및 IP가 작성될 당시, Smalltalk 및 Java 개발자 양쪽 모두에게 사용 가능했던 컬렉션 옵션은 변경 가능한 컬렉션들이었습니다. 변경 가능한 컬렉션을 사용하여 Java에서 컬렉션을 캡슐화하는 간단한 예제를 작성했습니다. 도메인은 간단합니다. 주문은 일련의 LineItem 인스턴스를 일정한 컬렉션 유형에 유지하는 것입니다.

이 문제의 이번 반복에서는 Eclipse Collections의 MutableList을 사용하고 있습니다. 모든 MutableList에 대한 액세스는 Order 클래스에서 노출된 메서드로 보호받습니다. LineItem은 단순히 이름과 값을 갖는 Java의 레코드 클래스입니다.

Clients는 컬렉션의 유형을 알 필요가 없습니다. 컬렉션은 List, Set, Stack, Bag 또는 간단한 배열일 수 있으며, 클라이언트들은 차이를 알 수 없습니다.

```js
public class Order
{
    private final MutableList<LineItem> lineItems = Lists.mutable.empty();

    public Order addLineItem(String name, double value)
    {
        this.lineItems.add(new LineItem(name, value));
        return this;
    }

    public void forEachLineItem(Procedure<LineItem> procedure)
    {
        this.lineItems.forEach(procedure);
    }

    public int totalLineItemCount()
    {
        return this.lineItems.size();
    }

    public int countOfLineItem(String name)
    {
        return this.lineItems.count(lineItem -> lineItem.name().equals(name));
    }

    public double totalOrderValue()
    {
        return this.lineItems.sumOfDouble(LineItem::value);
    }
}

public record LineItem(String name, double value) {}
```

<div class="content-ad"></div>

이 간단한 사용 사례에서는 lineItems 컬렉션의 쿼리가 제한적이므로 이 방법이 잘 작동합니다. 다음 테스트 클래스는 Order와 LineItem의 사용법 및 다양한 접근자 메서드를 보여줍니다.

```js
public class OrderTest
{
    private final Order order =
            new Order().addLineItem("컵", 5.50)
                    .addLineItem("접시", 7.50)
                    .addLineItem("포크", 3.00)
                    .addLineItem("숟가락", 2.50)
                    .addLineItem("칼", 3.50);

    @Test
    public void lineItemCount()
    {
        Assertions.assertEquals(5, this.order.totalLineItemCount());
    }

    @Test
    public void totalOrderValue()
    {
        Assertions.assertEquals(22.0, this.order.totalOrderValue());
    }

    @Test
    public void forEachLineItem()
    {
        StringJoiner join = new StringJoiner(",");
        this.order.forEachLineItem(lineItem -> join.add(lineItem.name()));
        Assertions.assertEquals(
                "컵,접시,포크,숟가락,칼", 
                join.toString());
    }

    @Test
    public void countOfLineItem()
    {
        Assertions.assertEquals(1, this.order.countOfLineItem("접시"));
        Assertions.assertEquals(1, this.order.countOfLineItem("포크"));
        Assertions.assertEquals(1, this.order.countOfLineItem("숟가락"));
        Assertions.assertEquals(0, this.order.countOfLineItem("냅킨"));
    }
}
```

이 특정 Order 구현의 단점은 컬렉션 액세서 메서드와 함께 사용한 것입니다. Order는 변할 수 있으며 스레드 안전하지 않습니다. 메소드 호출이 서로 충돌하지 않도록 보호하는 SynchronizedOrder라는 동기화된 Order 버전을 생성할 수 있습니다. 내부 목록에 대한 모든 호출을 보호하기 위해 컬렉션 액세서 메서드를 사용하므로 액세스하는 각 메서드를 단순히 동기화할 수 있습니다.

```js
public class SynchronizedOrder
{
    private final MutableList<LineItem> lineItems = Lists.mutable.empty();

    public synchronized SynchronizedOrder addLineItem(String name, double value)
    {
        this.lineItems.add(new LineItem(name, value));
        return this;
    }

    public synchronized void forEachLineItem(Procedure<LineItem> procedure)
    {
        this.lineItems.forEach(procedure);
    }

    public synchronized int totalLineItemCount()
    {
        return this.lineItems.size();
    }

    public synchronized int countOfLineItem(String name)
    {
        return this.lineItems.count(lineItem -> lineItem.name().equals(name));
    }

    public synchronized double totalOrderValue()
    {
        return this.lineItems.sumOfDouble(LineItem::value);
    }
}
```

<div class="content-ad"></div>

더 많은 메서드를 추가하면 과도해질 수 있습니다. 또한 추가하는 각 메서드에 대해 스레드 안전성을 테스트하는 도전도 있고, 미래에 누군가가 메서드 중 하나에서 synchronized 키워드를 추가하거나 삭제하는 것을 잊어버릴 수도 있습니다.

Order 클래스의 lineItems 정의를 다음과 같이 변경함으로써 Order를 스레드 안전하게 만들 수 있습니다.

빈 MutableList에서 asSynchronized를 호출하여 SynchronizedList를 만들 수 있습니다.

```js
private final MutableList<LineItem> lineItems = Lists.mutable.empty().asSynchronized();
```

<div class="content-ad"></div>

동기화된 목록(SynchronizedList)은 목록에 접근하는 독자와 작성자를 차단할 것입니다. 동기화된 목록(SynchronizedList)의 유일한 보호되지 않는 위치는 iterator입니다. Iterator를 사용할 때 컬렉션에 대한 액세스를 수동으로 동기화하는 일은 사용자에게 달려 있습니다. 특히 Order 내에서 Iterator를 사용하지 않고 lineItems을 클라이언트에 노출하지 않으므로 이 특정 유즈케이스에는 문제가 되지 않습니다.

Eclipse Collections에는 스레드 안전한 List에 대한 다른 대안이 있습니다. MultiReaderList를 사용할 수 있습니다.

```java
private final MutableList<LineItem> lineItems = 
        Lists.multiReader.empty();
```

MultiReaderList는 그 이름이 시사하는 대로 작동합니다. 여러 독자가 목록의 쿼리 메서드에 액세스할 수 있고, 단일 작성자는 추가 또는 삭제와 같은 변이 메서드에 액세스할 때 모든 독자를 차단할 것입니다.

<div class="content-ad"></div>

수시로도 좋은 점은 Collection Accessor Method를 사용하면 내부 구현을 변경할 수 있지만 클라이언트에는 영향을 미치지 않는다는 것입니다. 이것은 캡슐화를 사용하여 의도된 것처럼 사용하는 것입니다.

# 변경할 수 없는 Collections

우리는 Eclipse Collections을 통해 Java에서 추가적인 옵션을 가지고 있습니다. 이는 2007년에 구현 패턴이 발행된 당시에는 오픈 소스로 사용할 수 없었던 것입니다. Mutable collections을 Collection Accessor Method를 통해 캡슐화하는 것이 나는 생각하는 모든 경우에 우선적입니다. 그러나 콜렉션의 "읽기 전용" 버전을 노출시키는 상황에서는 타입에서 제공해야 하는 콜렉션 쿼리 메소드의 수를 줄일 수 있습니다. 타입의 콜렉션의 보호 여부와 Eclipse Collections와 같은 콜렉션 라이브러리의 전체 API를 복제하지 않고도 고수준 콜렉션 쿼리 메소드를 사용할 수 있는 유연성 간에는 상충관계가 있습니다.

만약 Mutable Collection 타입만 사용하는 경우라면 Collection Accessor Method 패턴이 최선의 선택입니다. 변경할 수 없는 래퍼를 통해 콜렉션을 노출하거나 제거 메소드가 강제로 제거된 Iterator만 노출하는 것은 최악의 경우에는 끔찍하며, 매우 위험합니다. 선택이 주어진다면 절대 Java Collection에 Iterator를 노출하지 않을 것입니다. Iterator는 동시성에 대한 악몽입니다. 나는 항상 forEach와 같은 내부 반복자를 선호합니다. 이들은 적절하게 콜렉션 타입에 의해 보호될 수 있습니다. Iterator는 사용하는 개발자 이외에는 누구도 보호할 수 없습니다. 이는 콜렉션을 사용하는 소비자에게 의도한 지식과 콜렉션을 제공하는 쪽에 대한 신뢰가 필요합니다.

<div class="content-ad"></div>

아무도 믿지 말고, 계약적으로 그리고 구조적으로 Immutable Collection 유형을 사용하세요. "불변" 컬렉션이 가변 인터페이스 뒤에 안전하지 않게 감춰져 있지 않도록 암묵적으로 믿지 마세요.

Order 및 LineItem의 도메인을 Immutable Collection 유형을 사용하도록 변환하면, 신뢰 요소를 방정식에서 제거할 수 있습니다. 소비자들은 컬렉션이 변경되지 않을 것이라고 믿을 수 있습니다. 제공 업체들은 클라이언트가 컬렉션을 직접 수정할 수 있는 방법이 없다는 것을 믿을 수 있습니다.

![이미지](/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_3.png)

다음은 Java 레코드를 사용하여 Order를 정의하고 라인아이템 컬렉션에 ImmutableBag`LineItem`를 사용하는 구현 예시입니다. LineItem 또한 Java 레코드입니다.

<div class="content-ad"></div>

```js
public record Order(ImmutableBag<LineItem> lineItems)
{
    public Order()
    {
        this(Bags.immutable.empty());
    }

    public Order addLineItem(String name, double value)
    {
        return new Order(lineItems.newWith(new LineItem(name, value)));
    }

    public double totalOrderValue()
    {
        return this.lineItems.sumOfDouble(LineItem::value);
    }
}

public record LineItem(String name, double value) {}
```

여기에는 빈 생성자가 있어서 ImmutableBag`LineItem`를 전달하지 않고도 Order를 생성할 수 있습니다. 이는 편의를 위해 만들어졌으며 Collection Accessor Method와 매우 유사한 addLineItem 메서드를 사용하여 불변 Order를 구성하는 것을 흉내 낼 수 있습니다.

이 새로운 Order 정의로 단위 테스트가 변경됩니다.

```js
public class OrderTest
{
    private final Order order =
            new Order().addLineItem("Cup", 5.50)
                    .addLineItem("Plate", 7.50)
                    .addLineItem("Fork", 3.00)
                    .addLineItem("Spoon", 2.50)
                    .addLineItem("Knife", 3.50);

    @Test
    public void lineItemCount()
    {
        assertEquals(5, this.order.lineItems().size());
    }

    @Test
    public void totalOrderValue()
    {
        assertEquals(22.0, order.totalOrderValue());
    }

    @Test
    public void forEachLineItem()
    {
        StringJoiner joiner = new StringJoiner(",");
        this.order.lineItems()
                .toSortedListBy(LineItem::name)
                .forEach(lineItem -> joiner.add(lineItem.name()));
        assertEquals("Cup,Fork,Knife,Plate,Spoon", joiner.toString());
    }

    @Test
    public void makeStringLineItems()
    {
        assertEquals(
                "Cup,Fork,Knife,Plate,Spoon",
                this.order.lineItems()
                        .toSortedListBy(LineItem::name)
                        .makeString(LineItem::name, "", ",", ""));
    }

    @Test
    public void countOfLineItem()
    {
        Bag<String> counts =
                this.order.lineItems().countBy(LineItem::name);

        assertEquals(1, counts.occurrencesOf("Plate"));
        assertEquals(1, counts.occurrencesOf("Fork"));
        assertEquals(1, counts.occurrencesOf("Spoon"));
        assertEquals(0, counts.occurrencesOf("Napkin"));
    }

    @Test
    public void iteratorRemoveThrowsOnImmutableBag()
    {
        assertThrows(
                UnsupportedOperationException.class,
                () -> this.order.lineItems().iterator().remove());
    }
}
```

<div class="content-ad"></div>

뮤터블과 이뮤터블 케이스 사이의 addLineItem 호출은 매우 유사해 보이지만 결과는 매우 다를 수 있습니다. 이뮤터블 케이스에서 addLineItem을 호출할 때마다 새로운 Order와 ImmutableBag 'LineItem'이 생성됩니다. addLineItem에 대해 코드를 자세히 살펴보면 차이를 알 수 있을 것입니다. 클라이언트 코드는 매우 유사해 보입니다.

ImmutableBag가 계약적으로나 구조적으로 변경할 수 없다는 점 때문에 여기서 lineItems를 클라이언트에 노출해도 안전합니다. ImmutableBag에는 추가나 제거와 같은 변이 메서드가 없습니다. 이뮤터블 케이스의 Order는 lineItems 컬렉션이 수정될 수 없으며 어떠한 레이스 조건도 발생하지 않기 때문에 스레드 안전합니다. 이로써 Order에서 작성해야 하는 쿼리 코드의 양이 줄어들고, lineItems을 조회할 때 클라이언트가 사용할 수 있는 총 동작 양이 증가합니다. Collection Accessor Method를 사용하여 Order에서 제공해야 할 것이 무엇인지는 독자의 판단에 맡기겠습니다.

# 읽기 가능한 컬렉션

Collection Accessor Method를 완전히 사용하거나 명시적으로 ImmutableList 'LineItem'에 직접 액세스하는 두 가지 안전한 방법을 사용하여 컬렉션을 가진 객체 지향 도메인을 설계할 수 있습니다. 저는 Immutable Collection 방식을 선호하지만, Collection Accessor Method와 Immutable Collection 사이 어딘가에 위치한 또 다른 해결책이 있는데, 이를 읽기 가능한 컬렉션이라고 부릅니다.

<div class="content-ad"></div>

Eclipse Collections의 컬렉션 유형 디자인은 예측 가능한 세 가지 인터페이스를 사용합니다. 이 인터페이스는 Mutable, Immutable 및 Readable입니다. Readable 인터페이스는 때로는 Iterable 접미사로 끝나는데, 이는 List, Set, Map과 같이 java.util에서 정의된 가변 컬렉션 유형과 충돌을 방지하기 위함입니다.

![이미지](/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_4.png)

여기서 RichIterable 타입은 "Readable"입니다. 이 타입에는 컬렉션을 수정하지 않는 읽기 전용 메서드만이 있습니다. 예외적으로 Iterator의 remove 메서드는 iterator를 호출한 후에 액세스할 수 있습니다. 이는 RichIterable이 java.lang.Iterable 인터페이스를 확장하여 Java 5 스타일 foreach 루프에서 사용될 수 있도록 만들기 위한 디자인 상의 절충입니다.

Order 인터페이스를 통해 수정을 보호하기 위해 Collection Accessor Method 접근 방식을 사용할 수 있지만, lineItems에 대해 RichIterable과 같이 "readable" 인터페이스를 노출할 수 있습니다.

<div class="content-ad"></div>


![Hide and Seek with Collections in Java](/assets/img/2024-08-13-HideandSeekwithCollectionsinJava_5.png)

하나 더 알아둘 트릭은 asUnmodifiable을 호출하여 Unmodifiable 래퍼로 lineItems을 감싸는 것입니다. 이렇게 하면 클라이언트가 타입을 Mutable 타입으로 캐스팅하여 직접 컬렉션을 수정할 수 없도록 보장합니다. 사실 Eclipse Collections의 MultiReaderCollection 타입은 iterator()를 구현하지 않기 때문에, 클라이언트가 lineItems().iterator().remove()을 호출하는 위험이 없습니다. Iterator 인스턴스는 스레드에 위험할 수 있기 때문입니다.

아래는 RichIterable`LineItem`으로 공개된 lineItems에 대한 Readable 접근 방식이 구현된 것입니다.

```java
public class Order
{
    private final MultiReaderBag<LineItem> lineItems = 
            Bags.multiReader.empty();

    public Order addLineItem(String name, double value)
    {
        this.lineItems.add(new LineItem(name, value));
        return this;
    }

    public RichIterable<LineItem> lineItems()
    {
        return this.lineItems.asUnmodifiable();
    }

    public double totalOrderValue()
    {
        return this.lineItems.sumOfDouble(LineItem::value);
    }
}
```

<div class="content-ad"></div>

다음은 Order 클래스가 어떻게 사용되는지 보여주는 단위 테스트입니다.

```js
public class OrderTest
{
    private final Order order =
            new Order().addLineItem("Cup", 5.50)
                    .addLineItem("Plate", 7.50)
                    .addLineItem("Fork", 3.00)
                    .addLineItem("Spoon", 2.50)
                    .addLineItem("Knife", 3.50);

    @Test
    public void lineItemCount()
    {
        assertEquals(5, this.order.lineItems().size());
    }

    @Test
    public void totalOrderValue()
    {
        assertEquals(22.0, order.totalOrderValue());
    }

    @Test
    public void forEachLineItem()
    {
        StringJoiner joiner = new StringJoiner(",");
        this.order.lineItems()
                .toSortedListBy(LineItem::name)
                .forEach(lineItem -> joiner.add(lineItem.name()));
        assertEquals("Cup,Fork,Knife,Plate,Spoon", joiner.toString());
    }

    @Test
    public void makeStringLineItems()
    {
        assertEquals(
                "Cup,Fork,Knife,Plate,Spoon",
                this.order.lineItems()
                        .toSortedListBy(LineItem::name)
                        .makeString(LineItem::name, "", ",", ""));
    }

    @Test
    public void countOfLineItem()
    {
        Bag<String> counts =
                this.order.lineItems().countBy(LineItem::name);

        assertEquals(1, counts.occurrencesOf("Plate"));
        assertEquals(1, counts.occurrencesOf("Fork"));
        assertEquals(1, counts.occurrencesOf("Spoon"));
        assertEquals(0, counts.occurrencesOf("Napkin"));
    }

    @Test
    public void iteratorThrowsOnMultiReaderBag()
    {
        assertThrows(UnsupportedOperationException.class,
                () -> this.order.lineItems().iterator());
    }
}
```

### 마지막으로

우리는 클래스 간 관계를 나타내는 컬렉션을 사용하여 OO 도메인을 모델링하는 세 가지 방법을 탐구했습니다.

<div class="content-ad"></div>

- 컬렉션 액세서 메소드
- 불변 컬렉션
- 읽기 전용 컬렉션

컬렉션 액세서 메소드는 컬렉션을 사용하여 모델링할 때 가장 안전하고 직접적인 접근 방식입니다. 그러나 유연성은 가장 낮습니다. 컬렉션 쿼리 메소드를 더 필요로 할 때는 도메인 클래스에 더 많은 메소드를 추가하여 이러한 메소드에 액세스할 수 있도록 제공해야 합니다.

불변 컬렉션은 안전성과 유연성을 최상의 조합으로 제공합니다. 애플리케이션 데이터가 "앞에서 데이터를 한 번에 로드하여 읽기 전용 쿼리" 스타일을 따를 경우 이 접근 방식은 매우 잘 작동합니다. 그러나 애플리케이션 데이터가 계속 변경되는 경우 불변 컬렉션의 데이터를 계속 변경하는 데에는 비용이 발생합니다.

읽기 전용 컬렉션은 안전성과 유연성을 잘 조합하여 제공하며, 애플리케이션 라이프사이클 동안 애플리케이션 데이터에 가끔씩 발생하는 쓰기 작업에 더 적합합니다.

<div class="content-ad"></div>

## 네 번째 방법이 있어요 (쉿!!!)

이것에 대해 아직 준비가 되었는지 잘 모르겠어요. Readable Collections Order 구현에서 lineItems 메서드를 다음과 같이 변경하면 어떻게 될까요:

```js
public RichIterable<LineItem> lineItems()
{
    return this.lineItems.asLazy();
}
```

Order 테스트는 여전히 통과하지만, MultiReaderBag에서 iterator에서 예외가 throw됩니다. Iterator는 remove에서 throw됩니다.

<div class="content-ad"></div>

RichIterable의 클래스 다이어그램을 다시 살펴보면 LazyIterable이라는 하위 유형이 있다는 것을 알 수 있습니다. LazyIterable은 Collection이 아닙니다. LazyIterable은 Stream과 같이 지연된 특성을 가지지만 Stream처럼 "일회용"이 아닙니다. LazyIterable은 반복적으로 안전하게 사용할 수 있으며 모든 Iterable과 같이 작동합니다.

LazyIterable 사용 가능성을 탐색하는 것은 독자에게 연습으로 남깁니다.

읽어 주셔서 감사합니다. 이 블로그가 당신의 객체 지향 도메인 클래스를 컬렉션과 함께 더 안전하고 효율적으로 모델링하는 데 도움이 되길 바랍니다.

즐겁게 보내세요!

<div class="content-ad"></div>

저는 Eclipse Collections OSS 프로젝트의 창조자이자 기여자입니다. 해당 프로젝트는 Eclipse Foundation에서 관리됩니다. Eclipse Collections는 기여를 환영합니다.