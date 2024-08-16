---
title: "Java - N차원 배열 출력하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-JavaHowtoprintanNdimensionalArray_0.png"
date: 2024-07-12 21:16
ogImage: 
  url: /assets/img/2024-07-12-JavaHowtoprintanNdimensionalArray_0.png
tag: Tech
originalTitle: "Java — How to print an N dimensional Array?"
link: "https://medium.com/@viraj_63415/java-how-to-print-an-array-of-arrays-cbdc69e61000"
isUpdated: true
---




<img src="/assets/img/2024-07-12-JavaHowtoprintanNdimensionalArray_0.png" />

자바 개발자로서 디버깅을 위해 콘솔에 Java 배열을 출력하고 싶을 때가 많습니다. 그러나 System.out.println(..)을 사용하여 출력하면 놀랍게도 우리는 다른 결과를 얻습니다.

```js
// 일반 출력
String[] cities = {"뭄바이", "뉴욕", "워싱턴 DC"};
System.out.println(cities);

// 출력
[Ljava.lang.String;@3feba861
```

출력 문이 엉터리인 것을 볼 수 있습니다. 실제로 출력 문은 배열의 내용이 아닌 배열의 메모리 주소를 출력하고 있습니다. 이는 toString() 메서드가 없는 객체를 출력할 때의 출력과 일관성이 있습니다.

<div class="content-ad"></div>

그러나, 이것은 분명히 우리에게 유용하지 않습니다.

## Arrays.toString(..)

이 문제를 해결하기 위해 Java의 Arrays 클래스에 toString(..)이라는 편리한 메서드가 있습니다. 이를 사용해 봅시다.

```js
// Arrays.toString(..) 사용
String[] cities = {"뭄바이", "뉴욕", "워싱턴 DC"};
System.out.println(Arrays.toString(cities));

// 출력
[뭄바이, 뉴욕, 워싱턴 DC]
```

<div class="content-ad"></div>

Arrays.toString(..)를 사용하면 출력이 예상대로 더 유용하게 나타납니다.

그러나 만약 배열의 배열을 출력하고 싶다면 어떻게 해야 할까요? 무슨 말인지 살펴봅시다.

```js
// 배열의 배열 출력
String[][] cities = { 
        {"뉴욕", "워싱턴 DC"}, 
        {"뭄바이", "뉴델리"} 
};
System.out.println(Arrays.toString(cities));

// 출력
[[Ljava.lang.String;@5b480cf9, [Ljava.lang.String;@6f496d9f]
```

이 코드에서 cities 변수는 문자열 객체의 배열의 배열입니다. 이 코드는 알 수 없는 형태의 배열을 출력합니다. 다시 말해, Arrays.toString(..) 메소드는 1차원 배열만 처리하며, 해당 배열의 내부까지 탐색하지 못합니다.

<div class="content-ad"></div>

# Arrays.deepToString(..)

Arrays에는이 문제를 해결하는데 도움이 되는 또 다른 유용한 메소드인 deepToString(..)이 있습니다.

```js
// Array of Arrays 출력
String[][] cities = { 
        {"New York", "Washington DC"}, 
        {"Mumbai", "New Delhi"} 
};
System.out.println(Arrays.deepToString(cities));

// 출력
[[New York, Washington DC], [Mumbai, New Delhi]]
```

이제 deepToString(..)이 예상대로 String을 반환하는 것을 볼 수 있습니다.

<div class="content-ad"></div>

이 기술은 String 배열뿐만 아니라 모든 클래스에 적용됩니다. 예를 들어, 다음은 User 객체의 배열 배열에 대한 코드입니다.

```js
// User 객체의 배열 배열 출력
record User(String name, int age) {}

User johnDoe = new User("John Doe", 10);
User janeDoe = new User("Jane Doe", 12);
User jackDoe = new User("Jack Doe", 25);
User jillDoe = new User("Jill Doe", 30);

User[][] users = {
        { johnDoe, janeDoe},
        { jackDoe, jillDoe}
};
System.out.println(Arrays.deepToString(users));

// 출력
[[User[name=John Doe, age=10], User[name=Jane Doe, age=12]], [User[name=Jack Doe, age=25], User[name=Jill Doe, age=30]]]
```

여기서 User는 레코드로 정의되었습니다. 4개의 User 객체를 정의하고 User의 배열 배열을 생성했습니다.

이를 통해 이중 배열의 사용자가 매우 유용한 방식으로 정확하게 출력됩니다. 더불어, 이는 모든 차원의 배열에 적용되며, 특히 1차원 및 2차원 배열의 예시를 살펴보았습니다.

<div class="content-ad"></div>

# 기본 타입 배열

또 하나 언급할 점은 위의 두 배열 메서드가 기본 유형(int, float, double 등)의 배열과도 아주 잘 작동한다는 것입니다.

```js
// 기본 타입 배열
int[][] nums = { 
        {1,2,3}, 
        {9, 10}
};
System.out.println(Arrays.deepToString(nums));

// 출력
[[1, 2, 3], [9, 10]]
```

위 예제에서 nums 변수는 기본 정수형 배열의 배열이며 결과는 우리가 예상하는 대로 가독성이 좋고 유용합니다.

<div class="content-ad"></div>

만약 이 게시물이 도움이 되었다면, 지원을 보여주기 위해 아래의 박수 버튼 👏을 몇 번 클릭해 주세요. 읽어 주셔서 감사합니다!