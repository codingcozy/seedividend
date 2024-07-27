---
title: "자바에서 Wrapper 클래스를 사용할 때 1  1은 true이고 1000  1000은 false인 이유"
description: ""
coverImage: "/assets/img/2024-07-12-Whyis11istruebut10001000isfalseWhendealingwithWrapperClassesinJava_0.png"
date: 2024-07-12 21:17
ogImage: 
  url: /assets/img/2024-07-12-Whyis11istruebut10001000isfalseWhendealingwithWrapperClassesinJava_0.png
tag: Tech
originalTitle: "Why is 1 == 1 is true but 1000 == 1000 is false When dealing with Wrapper Classes in Java?"
link: "https://medium.com/javarevisited/why-is-1-1-is-true-but-1000-1000-is-false-when-dealing-with-wrapper-classes-in-java-53c5a45ed687"
---



![image](/assets/img/2024-07-12-Whyis11istruebut10001000isfalseWhendealingwithWrapperClassesinJava_0.png)

이게 많이 다가요.

이 글에서는 Wrapper 클래스를 비교할 때 '==' 연산자를 사용할 때 발생하는 동작에 대해 논의할 것입니다.

Wrapper 클래스는 해당 기본 데이터 유형을 래핑하여 컬렉션(Lists, Sets 및 Maps와 같은)과 같이 객체만 필요한 문맥에서 객체로 사용할 수 있습니다. 예를 들어, Integer 클래스는 int 데이터 유형에 해당하고, Double은 double에 해당합니다.


<div class="content-ad"></div>

이 문서를 위해서는 Integer 클래스만 사용할 거에요.

아래의 예제를 살펴보죠:

```js
Integer a = Integer.valueOf(10);
Integer b = 10;
```

이것은 간단한 예제에요. Integer 객체를 두 개 만들었어요: 하나는 Integer 클래스에서 제공하는 valueOf() 메소드를 사용하고 다른 하나는 오토박싱 기능을 사용했어요.

<div class="content-ad"></div>

```java
System.out.println((a == b));          // true
System.out.println(a.equals(b));       // true
```

위의 코드에서 '==' 연산자와 equals() 메소드를 사용하여 두 객체를 비교했습니다. 두 경우 모두 출력은 true입니다.

그러나 다른 값을 사용할 때 상황이 달라집니다:

```java
Integer a = Integer.valueOf(350);
Integer b = 350;

System.out.println((a == b));          // false
System.out.println(a.equals(b));       // true
```

<div class="content-ad"></div>

왜 출력 결과가 다를까요?

먼저, ‘==’ 연산자는 참조 동등성을 확인하고, equals() 메서드는 실제 값들을 비교합니다.

출력 결과의 차이는 JVM이 성능을 향상시키고 메모리 소비를 줄이기 위해 'Integer 캐시'라고 하는 캐싱 메커니즘을 사용하기 때문입니다.

이 Integer 캐시는 어떻게 작동하나요?

<div class="content-ad"></div>

캐싱 범위는 -128부터 127까지입니다. Integer.valueOf() 메서드를 처음 호출할 때 해당 값이 범위 내에 있으면 값이 캐시되며, 이후 호출은 새로 생성하는 대신 캐시된 Integer를 반환합니다. 즉, 두 참조는 동일한 객체를 가리키므로 비교가 true를 반환하는 것입니다.

이것이 Integer 10의 비교가 true를 반환하고 범위 내에 없는 값의 비교가 false를 반환하는 이유입니다.

Integer 캐시 매커니즘은 자동박싱이나 Integer.valueOf() 메서드와 함께 동작합니다. 생성자를 사용하여 래퍼 객체를 만드는 경우에는 적용되지 않습니다:

```java
Integer a = new Integer(12);
Integer b = new Integer(12);

System.out.println((a == b));          // false
System.out.println(a.equals(b));       // true
```

<div class="content-ad"></div>

보시다시피, 첫 번째 비교는 값에 관계없이 항상 false를 반환합니다.

이 기사는 여기까지입니다. 읽어주셔서 감사합니다.