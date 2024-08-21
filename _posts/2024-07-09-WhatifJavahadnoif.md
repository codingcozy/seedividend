---
title: "자바에 if문이 없다면 어떻게 할까"
description: ""
coverImage: "/assets/img/2024-07-09-WhatifJavahadnoif_0.png"
date: 2024-07-09 21:17
ogImage:
  url: /assets/img/2024-07-09-WhatifJavahadnoif_0.png
tag: Tech
originalTitle: "What if Java had no if?"
link: "https://medium.com/@donraab/what-if-java-had-no-if-ea88d90b76c3"
isUpdated: true
---

그게 뭔데?

![이미지](/assets/img/2024-07-09-WhatifJavahadnoif_0.png)

# 흐름은 어디에?

만약 우리가 Java에서 if 문, for 루프, while 문과 같은 것들이 없었다면 Java로 프로그래밍하는 건 정말 어려울 것입니다. 이러한 것들은 우리가 프로그램 내에서 코드가 언제, 어떻게 실행되는지 결정하는 데 도움을 주는 편리한 언어 구성요소입니다. 이것이 프로그램에서의 제어 흐름의 본질입니다. 모든 프로그래밍 언어는 제어 흐름이 발생할 수 있도록 하는 메커니즘을 갖고 있습니다. 대부분의 프로그래밍 언어는 내장된 명령문을 통해 언어 자체에서 제어 흐름 메커니즘을 제공합니다.

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

다음 코드는 Java에서 기본 제어 흐름 문을 보여줍니다.

```java
public static void main(String[] args)
{
    if (args.length > 1)
    {
        int i = Integer.parseInt(args[1]);
        for (int j = 0; j < i; j++)
        {
            System.out.println(args[0]);
        }
    }
    else if (args.length > 0)
    {
        System.out.println(args[0]);
    }
    else
    {
        System.out.println("Hello World!");
    }
}
```

이 코드는 args 문자열 배열 길이를 확인하여 프로그램에 전달된 인수가 0, 1 또는 2개인지를 확인합니다. 0개의 인수가 전달된 경우 프로그램은 "Hello World!"를 출력합니다. 1개의 인수가 전달된 경우 프로그램은 인수를 출력합니다 (arg[0]). 2개의 인수가 전달된 경우 프로그램은 두 번째 인수 (arg[1])에 지정된 횟수만큼 첫 번째 인수 (arg[0])를 출력합니다. 이 코드에는 두 번째 매개변수가 실제로 숫자인지 확인하는 안전 검사가 없습니다.

# 객체와 메서드를 사용한 제어 흐름 모델링

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

작은 말투로 번역을 시작하겠습니다.

Smalltalk은 프로그래밍 언어로, 제어 흐름을 언어가 아닌 클래스 라이브러리에서 모델링합니다. Smalltalk에는 if 문, for 루프, while 문이 없습니다. 대신 제어 흐름을 가능하게 하는 클래스의 메서드가 있습니다. 메서드는 제어 흐름을 모델링하는 데 사용되는 추상화이며, 코드 블록(람다 또는 클로저로 알려져도 됨)과 함께 사용됩니다. Smalltalk을 처음 배울 때, 이러한 제어 흐름 메서드가 어디에 있는지 배우고, 람다와 함께 사용하는 방법을 익혀야 했습니다. 람다를 필요한 모든 제어 구조에서 사용해야 하므로, 람다에 매우 빨리 익숙해질 수 있다고 믿습니다.

Smalltalk에서 제어 구조를 찾는 첫 번째 곳은 Boolean에 대한 클래스 계층 구조였습니다. 아래는 Smalltalk에서 Boolean 유형이 모델링된 UML 클래스 다이어그램 예시입니다.

![Boolean Class Diagram](/assets/img/2024-07-09-WhatifJavahadnoif_1.png)

Smalltalk의 Boolean 클래스는 and:, or:, ifTrue:, ifFalse:, ifTrue:ifFalse:, ifFalse:ifTrue와 같은 메서드를 정의합니다. 각각의 메서드는 하나 또는 두 개의 블록 매개변수를 사용합니다. Smalltalk의 블록은 리터럴 람다 구문으로 표현할 수 있는 유형입니다. 블록의 기본 구문은 왼쪽에 매개변수를 구분하는 파이프가 있는 대괄호와 오른쪽에 표현식이 있습니다. 블록에 매개변수가 없는 경우 파이프가 없을 것입니다. 다음은 리터럴 블록(람다 또는 클로저로도 알려져 있음)의 예시입니다.

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

- [] — 값이 nil을 반환하는 빈 블록입니다.
- [true] — true를 반환하는 인자가 없는 블록입니다.
- [:a | a] — 하나의 인자를 받아 해당 값을 반환하는 블록입니다.
- [:a :b | a + b] — 두 개의 인자를 받아 합을 반환하는 블록입니다.
- [:a :b :c | a + b + c] — 세 개의 인자를 받아 합을 반환하는 블록입니다.

# Smalltalk에서 조건문 평가하기

Smalltalk에 if 문이 없다면, Boolean의 두 하위 클래스 (True와 False)의 인스턴스 (true 및 false)와 Block을 사용하여 조건부 로직을 수행할 수 있습니다.

위 다이어그램에 문서화된 True 및 False 클래스의 메서드를 사용하여 Smalltalk에서 조건부 로직을 수행하는 방법은 다음과 같은 테스트를 통해 확인할 수 있습니다.

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

다음은 True에 대한 다양한 결과를 보여주는 테스트입니다.

```js
testTrue

 self assert: (true and: [ true ]).
 self assert: (true or: [ true ]).

 self deny: (true and: [ false ]).
 self assert: (true or: [ false ]).

 self assert: (true ifTrue: [ true ]).
 self assert: (true ifTrue: [ true ] ifFalse: [ false ]).
 self deny: (true ifFalse: [ true ] ifTrue: [ false ]).

 self assert: (6 > 5 ifTrue: [ true ]).
 self assert: (4 > 5 ifTrue: [ true ]) equals: nil.
```

다음은 False에 대한 다양한 결과를 보여주는 테스트입니다.

```js
testFalse

 self deny: (false and: [ true ]).
 self assert: (false or: [ true ]).

 self deny: (false and: [ false ]).
 self deny: (false or: [ false ]).

 self assert: (false ifFalse: [ true ]).
 self assert: (false ifTrue: [ false ] ifFalse: [ true ]).
 self deny: (false ifFalse: [ false ] ifTrue: [ true ]).

 self assert: (6 > 5 ifFalse: [ true ]) equals: nil.
 self assert: (4 > 5 ifFalse: [ true ]).
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

# 수동 대 액티브 부울린 클래스

자바에는 부울린의 원시 형식과 객체 형식이 모두 있습니다. 원시 버전은 boolean으로 이름이 지어졌습니다. 객체 버전은 Boolean으로 이름이 지어졌습니다. Boolean 클래스는 자바의 원시 boolean 유형을 제네릭 컬렉션인 목록(List), 세트(Set) 및 맵(Map)과 같이 사용할 수 있도록 래퍼 역할을 합니다. Java 21 기준으로 Boolean 클래스는 toString, hashCode, equals, compareTo, describeConstable, booleanValue의 여섯 개의 인스턴스 메소드만 정의합니다. 이 클래스에는 아무 동작도 수행하지 않는 액티브 메소드가 없습니다. 대부분의 메소드는 표현되는 값의 다른 유형을 반환합니다. 현재의 자바 Boolean 클래스는 내가 말하는 바에는 수동 클래스입니다. 이 클래스는 원시 boolean 값의 객체 데이터 보관자일 뿐입니다.

자바에서 Boolean을 액티브 클래스로 만들 수 있습니다. 실험적으로 새로운 Boolean 봉인 인터페이스를 정의하고 True와 False 구현을 정의했습니다.

public sealed interface Boolean permits Boolean.True, Boolean.False
{
Boolean TRUE = new True();
Boolean FALSE = new False();

    static Boolean valueOf(boolean value)
    {
        return value ? TRUE : FALSE;
    }

    default Boolean and(Supplier<Boolean> block)
    {
        return null;
    }

    default Boolean or(Supplier<Boolean> block)
    {
        return null;
    }

    default <R> R ifTrue(Supplier<R> trueBlock)
    {
        return null;
    }

    default <R> R ifFalse(Supplier<R> falseBlock)
    {
        return null;
    }

    default <R> R ifTrueIfFalse(
            Supplier<R> trueBlock,
            Supplier<R> falseBlock)
    {
        return null;
    }

    default <R> R ifFalseIfTrue(
            Supplier<R> falseBlock,
            Supplier<R> trueBlock)
    {
        return null;
    }

    final class True implements Boolean {}

    final class False implements Boolean {}

}

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

만약 여러분이 아버지 Boolean 인터페이스의 기본 구현을 True 및 False 클래스의 상속되었는 지를 상상하고 더 많은 Supplier 및 Boolean 인스턴스 변수를 사용하여 코드를 명확하게 구현할 수 있는 새로운 Boolean 인터페이스를 사용하는 Control Flow Java 예제를 재구성하려면, 기본 boolean을 Boolean 인터페이스로 변환하는 정적 메서드를 제공해야 했습니다.

구현을 완료했을 때, 이 블로그의 첫 번째 섹션에서 이 Boolean 인터페이스를 사용하여 제어 흐름 Java 예제를 다시 작성했습니다. 가독성을 높이기 위해 변수에 Supplier 및 Boolean 인스턴스가 있는 코드는 아래와 같습니다.

```java
public static void main(final String[] args)
{
    Supplier<Object> moreThanOneSupplier = () ->
    {
        IntInterval.oneTo(Integer.parseInt(args[1]))
                .forEach(j -> System.out.println(args[0]));
        return null;
    };

    Supplier<Object> moreThanZeroSupplier = () ->
    {
        System.out.println(args[0]);
        return null;
    };

    Supplier<Object> noArgumentSupplier = () ->
    {
        System.out.println("Hello World!");
        return null;
    };

    Boolean argsGreaterThanOne = Boolean.valueOf(args.length > 1);
    Boolean argsGreaterThanZero = Boolean.valueOf(args.length > 0);

    argsGreaterThanOne.ifTrueIfFalse(
            moreThanOneSupplier,
            () -> argsGreaterThanZero.ifTrueIfFalse(
                    moreThanZeroSupplier,
                    noArgumentSupplier));
}
```

활성 Boolean 버전의 코드에서는, Eclipse Collections의 IntInterval을 사용하여 for 루프의 OO 버전을 표현합니다. 활성 Boolean 버전의 코드는 조립 가능하며 모든 것을 명확하게 구획화하여 논리를 이동하기가 쉽습니다. Supplier 인스턴스를 인라인하는 경우 코드는 다음과 같습니다.

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
public static void main(final String[] args)
{

    Boolean argsGreaterThanOne = Boolean.valueOf(args.length > 1);
    Boolean argsGreaterThanZero = Boolean.valueOf(args.length > 0);

    argsGreaterThanOne.ifTrueIfFalse(
            () ->
            {
                IntInterval.oneTo(Integer.parseInt(args[1]))
                        .forEach(j -> System.out.println(args[0]));
                return null;
            },
            () -> argsGreaterThanZero.ifTrueIfFalse(
                    () ->
                    {
                        System.out.println(args[0]);
                        return null;
                    },
                    () ->
                    {
                        System.out.println("Hello World!");
                        return null;
                    }));
}
```

위의 자바 코드가 원래 코드에서 if 문과 for 루프를 사용한 내용을 더 적은 스크롤링과 쉬운 비교를 위해 수정한 것입니다.

```js
public static void main(String[] args)
{
    if (args.length > 1)
    {
        int i = Integer.parseInt(args[1]);
        for (int j = 0; j < i; j++)
        {
            System.out.println(args[0]);
        }
    }
    else if (args.length > 0)
    {
        System.out.println(args[0]);
    }
    else
    {
        System.out.println("Hello World!");
    }
}
```

원시 boolean 예제의 코드는 if 문을 사용하여 덜 장황하지만 논리를 옮기려면 복사 및 붙여넣기가 더 필요할 수 있습니다.

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

현재 사용 중인 액티브 부울리안 인터페이스의 번잡성은 부분적으로 Smalltalk이 Boolean과 함께 블록을 사용하는 방식과 더 유사한 서플라이어를 선택했기 때문입니다. Smalltalk의 Boolean 메소드는 블록을 사용하여 메소드의 결과로 불리언 표현식을 형성할 수 있습니다. 부울리안 표현식에서 값을 반환하는 데 신경 쓰지 않는다면 메소드를 Runnable을 사용하여 모델링할 수 있습니다.

다음 코드는 Runnable을 사용했을 때 코드가 어떻게 보일지 보여줍니다.

```java
public static void main(final String[] args)
{

    Boolean argsGreaterThanOne = Boolean.valueOf(args.length > 1);
    Boolean argsGreaterThanZero = Boolean.valueOf(args.length > 0);

    argsGreaterThanOne.ifTrueIfFalse(
        () -> IntInterval.oneTo(Integer.parseInt(args[1]))
                .forEach(j -> System.out.println(args[0])),
        () -> argsGreaterThanZero.ifTrueIfFalse(
                () -> System.out.println(args[0]),
                () -> System.out.println("Hello World!")));
}
```

한 줄의 코드로 각 if 문의 각 브랜치를 덮을 수 있기 때문에 중괄호가 모두 사라집니다. 자바의 람다는 한 줄 람다 표현식에 대해 중괄호를 제거할 수 있게 해줍니다. 이렇게 하면 불필요한 많은 코드 줄이 제거되지만 텍스트 압축 및 자연적인 공백의 손실 때문에 가독성이 일부 저하될 수 있습니다.

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

Runnable 인스턴스를 코드에서 변수로 추출하면 다음과 같이 보일 것입니다.

```java
public static void main(final String[] args)
{
    Boolean argsGreaterThanOne = Boolean.valueOf(args.length > 1);
    Boolean argsGreaterThanZero = Boolean.valueOf(args.length > 0);

    Runnable moreThanOneRunnable = () ->
            IntInterval.oneTo(Integer.parseInt(args[1]))
                .forEach(j -> System.out.println(args[0]));

    Runnable moreThanZeroRunnable = () -> System.out.println(args[0]);

    Runnable noArgumentRunnable = () -> System.out.println("Hello World!");

    argsGreaterThanOne.ifTrueIfFalse(
            moreThanOneRunnable,
            () -> argsGreaterThanZero.ifTrueIfFalse(
                    moreThanZeroRunnable,
                    noArgumentRunnable));
}
```

# 마지막으로

이 블로그는 Java의 true/false와 Smalltalk의 true/false 간의 차이를 간단하게 설명하는 것을 목적으로 했습니다. Java는 프로그램 제어 흐름에 대한 사용자 관리를 위해 언어에서 제공하는 문을 사용합니다. Smalltalk은 동일한 작업을 수행하기 위해 객체, 메서드 및 람다를 사용합니다. 두 접근 방식은 장단점이 있습니다. 합성 가능성과 다소 언급이 서로 충돌할 때가 있습니다. 논리 분기절 내의 메서드를 추출하면 두 가지 접근 방식으로 더 나은 합성 가능성과 덜 불필요한 부분을 얻을 수 있습니다.

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

제가 여기서 보여준 활성 부욜안 접근 방식은 Java의 Boolean 클래스에 추가하여 활성 부욜안 객체로 만들 수 있습니다. 이를 통해 Boolean 클래스가 메서드를 통해 제어 흐름을 관리할 수 있게 됩니다. 이 접근 방식의 장점은 현재의 Java 메커니즘인 삼항 표현식을 사용하여 복잡한 if 표현식을 에뮬레이트하고 읽기 쉽게 만드는 것입니다.

업데이트: Java에서 활성 부욜안 객체 접근 방식을 실용적으로 만드는 것의 한 가지 단점은 조건부 람다에서 사용되는 변수 외부의 로컬 변수에 액세스해야 하는 경우입니다. 이 경우 조건부 람다 범위 외부의 로컬 변수를 업데이트할 수 있도록 final 배열을 사용하는 지저분한 트릭이 필요할 수 있습니다. if 문 접근 방식은 조건부 범위 외부에서 정의된 모든 변수에 액세스할 수 있습니다. 또 다른 단점은 Java 람다가 비로컬 반환을 지원하지 않는다는 것인데, 이는 조건부에서 메서드를 빠져나가는 것을 제한할 것입니다. LinkedIn의 Oleg Pliss님께서 Java 람다와 Smalltalk 블록 간의 중요한 차이점을 지적해 주셔서 감사합니다.

같은 문제를 해결하기 위해 서로 다른 전략을 사용하는 여러 언어를 배우는 것은 유용합니다. 새로운 언어를 배우는 데에는 시간이 걸립니다. 저의 희망은 Java와 Smalltalk의 기본 제어 흐름 비교를 통해 여러분이 다른 접근 방식의 장단점을 이해할 수 있도록 도움이 되기를 바라는 것입니다.

읽어 주셔서 감사합니다!

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

제가 이클립스 컬렉션 OSS 프로젝트의 창시자이자 기여자입니다. 해당 프로젝트는 Eclipse Foundation에서 관리됩니다. Eclipse Collections는 기여를 환영합니다.
