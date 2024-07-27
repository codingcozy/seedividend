---
title: "Java에서 문자열String 다루는 방법"
description: ""
coverImage: "/assets/img/2024-07-09-StringsinJava_0.png"
date: 2024-07-09 09:27
ogImage: 
  url: /assets/img/2024-07-09-StringsinJava_0.png
tag: Tech
originalTitle: "Strings in Java"
link: "https://medium.com/@nimakarimian/strings-in-java-d2cf06f1c52e"
---


프로그래밍 현실에서는 주로 숫자, 문자열 또는 그들의 조합을 다룬다고 말할 수 있어요. 따라서 이 주제에 대해 잘 숙지하는 것이 매우 중요합니다. 오늘은 문자열, StringBuilder, 그리고 문자열 포매팅에 대해 이야기해보려고 해요.

간단한 "Hello World!" 문자열을 가지고 시작해봅시다.

```js
String hello = "Hello World!";
```

## Java에서 불변 문자열

<div class="content-ad"></div>

자바에서는 문자열이 변경 불가능합니다. C++ 배경이 있다면 이 사실에 충격을 받을 수 있습니다. 실제로 C++에서 문자열은 문자의 배열이며 원하는 인덱스에서 수정할 수 있습니다.

그러나 자바는 왜 문자열을 변경 불가능하게 만들었을까요? 비효율적이지 않은가요? 자바는 성능 면에서 더 나은 결과를 얻기 위해 이 비효율성을 받아 들인 것입니다.

![이미지](/assets/img/2024-07-09-StringsinJava_0.png)

<div class="content-ad"></div>

자바는 String을 저장하는 전략이 C 나 C++과 같은 몇 가지 다른 언어와 다릅니다. 자바는 String 객체를 힙(heap) 내의 문자열 풀(String Pool)에 저장합니다. 새로운 String 변수를 초기화하려고 할 때, 자바는 먼저 문자열 풀을 확인하고 해당하는 문자열이 있으면 해당 객체를 가리키는 포인터를 그대로 반환합니다. 예를 들어 문자열 풀에 "Hello World!"가 저장되어 있다면,

```java
String firstVariable = "Hello World!";
String secondVariable = "Hello World!";
```

firstVariable과 secondVariable은 둘 다 문자열 풀에 있는 동일한 String 객체를 가리킵니다. 문자열이 변경 가능하다면, secondVariable을 변경하면 firstVariable도 변경될 것입니다. 자바는 변경 가능한 문자열의 효율성을 포기하고 String 풀이라는 더 나은 전략을 채택했습니다.

## 자바에서의 변경 가능한 문자열

<div class="content-ad"></div>

문자열을 다른 문자열 객체에서 구성해야 하는 경우, 키 입력 또는 파일에서 단어와 같은 문자열로부터 문자열 연결을 사용하는 것은 비효율적일 수 있습니다. 각 연결 작업은 힙의 문자열 풀에 새로운 문자열 객체를 생성하며, 시간이 많이 소요되고 메모리를 많이 사용합니다.

이러한 상황에서 Java는 StringBuilder 클래스를 제공했습니다.

```java
StringBuilder builder = new StringBuilder();
//다음 부분을 추가할 때마다 append 메서드를 호출하십시오.
String firstName = "Nima";
String lastName = "Karimian";
builder.append(firstName);
builder.append("\t");
builder.append(lastName);
```

문자열에 부분을 추가할 때는 append() 메서드를 사용하십시오. 문자열에 bit와 part를 추가한 후에는 toString() 메서드를 사용하여 StringBuilder 객체를 일반 문자열 객체로 변환할 수 있습니다.

<div class="content-ad"></div>

```java
String completedString = builder.toString();
```

![2024-07-09-StringsinJava_1.png](/assets/img/2024-07-09-StringsinJava_1.png)

자바에 관한 내 기사들을 확인해보세요 — 더 많은 흥미로운 사실과 지식을 얻을 수 있습니다.

# 관련 기사:

<div class="content-ad"></div>

- 자바에서 printf를 사용한 문자열 포맷팅
- 자바에서 입력값 읽기