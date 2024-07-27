---
title: "Dart Flutter에서의 믹스인 사용하기"
description: ""
coverImage: "/assets/img/2024-05-18-MixinsinDartFlutterAndHowitisdifferentfromInheritance_0.png"
date: 2024-05-18 22:20
ogImage:
  url: /assets/img/2024-05-18-MixinsinDartFlutterAndHowitisdifferentfromInheritance_0.png
tag: Tech
originalTitle: "Mixins in Dart (Flutter) — And How it is different from Inheritance ?"
link: "https://medium.com/flutter-community/exploring-mixins-in-dart-flutter-43514cd9952b"
---

<img src="/assets/img/2024-05-18-MixinsinDartFlutterAndHowitisdifferentfromInheritance_0.png" />

안녕하세요!

오늘은 믹스인에 대해 이야기해 보겠습니다. 한 가지 질문이 있는데요.

믹스인이란 무엇인가요? 상속과 어떻게 다른가요? 상속과 어떤 점이 다른지 알고 계시면 섹션 2로 스크롤하셔서 믹스인을 구현하는 방법을 확인해보세요 :) 모르신다면 여기에서 자세히 설명해 드리겠습니다!

<div class="content-ad"></div>

## 섹션 1: 정의부터 시작합시다

맞죠? 대부분 mixins에 대해 검색할 때 가장 많이 볼 내용이죠. 대부분은 제처럼 상속과 혼동할 수도 있어요 :) . 그러니, mixins에 대해 시작하기 전에 is-a 관계(상속)와 has-a 관계(구성)에 대해 알아야 합니다.

그러니 이 개념들에 대해 간단히 명확화해 볼까요? 이 이미지를 살펴보세요

![이미지](/assets/img/2024-05-18-MixinsinDartFlutterAndHowitisdifferentfromInheritance_1.png)

<div class="content-ad"></div>

무엇을 관찰하셨나요?

첨부된 실시간 예제를 참고하면 다음과 같이 관찰할 수 있습니다.

- 삼성은 모바일이에요.
- 삼성은 카메라를 가지고 있고 블루투스도 가지고 있어요.

자세한 통찰력을 얻기 위해 다음 정의를 확인해보세요.

<div class="content-ad"></div>

is-a 관계: 두 클래스 간의 직접적인 관계로 정의될 수 있으며, 한 클래스(예: Class B)가 다른 클래스(예: Class A)의 하위 클래스인 경우입니다. 이를 상속이라고 합니다.

---

has-a 관계: 한 클래스(예: Class A)가 다른 클래스(예: Class B)의 인스턴스를 멤버로 포함하는 관계로 정의될 수 있습니다. 이 관계를 통해 Class A가 Class B의 기능과 속성에 액세스할 수 있도록 해주므니다. 이런 관계를 합성이라고 합니다.

마지막으로 이것이 프로그래밍적으로 어떻게 보이는지 살펴봅시다.

<div class="content-ad"></div>

_주의: 코멘트에 집중해주세요._

```js
// 부모 클래스
class Mobile {
}

// 하위 클래스 또는 자식 클래스
// 삼성이 Mobile을 확장한 is-a 관계의 예시
class Samsung extends Mobile {

// has-a 관계의 예시
 Wifi wifi = Wifi();
 Camera camera = Camera();
}
```

이제 is-a 및 has-a 관계에 대해 분명히 이해하셨기를 바랍니다.

이제 이미 mixin의 정의를 읽으셨다면, 다시 한번 읽어보세요.

<div class="content-ad"></div>

믹신을 사용하는 클래스들은 모든 속성과 기능을 상속받지만 서브클래스로 지칭할 수는 없어요.

그 이유는 뭘까요???

믹신은 클래스와 믹신이 제공하는 기능 사이에 "has-a" 관계와 비슷하지만 정확히는 그렇지 않은 관계를 설정합니다. 이는 믹신에 정의된 메서드와 속성에 접근할 수 있게 합니다.

하지만, 차이점은 클래스 자체가 믹신의 인스턴스를 보유하지 않고 그냥 상속한다는 것입니다. 엄격한 계층 구조는 엄격한 부모-자식 관계의 계층 구조와 결합되어 있지 않으므로 그렇죠.

<div class="content-ad"></div>

이 유연성을 통해 클래스들은 믹스인이 제공하는 기능을 직접적인 "is-a relationship" 없이 활용할 수 있습니다.

이해했어요? 그렇지 않다면, 기다려 주세요 — Section 2에서 자세히 설명하겠습니다. 금방 이해하실 거예요!

![이미지](https://miro.medium.com/v2/resize:fit:996/1*ETWMK2xQnq54XonmQMumIw.gif)

## Section 2 : 믹스인 구현

<div class="content-ad"></div>

이제 Dart와 Flutter에서 이들을 어떻게 구현할 수 있는지 살펴봐요.

1. 믹신 선언: 믹신은 믹신 키워드를 사용하여 선언하며 믹신의 이름이 뒤따릅니다. 믹신에는 메서드와 프로퍼티가 포함될 수 있어요.

```js
mixin MixinLogger {

 void logMessage(String message) {
   print("MESSAGE: $message");
 }

}
```

2. 믹신 사용: 클래스에서 믹신을 사용하려면 믹신의 이름이 따르는 with 키워드를 사용해요. 이를 통해 클래스는 믹신에서 정의된 기능을 상속받을 수 있어요.

<div class="content-ad"></div>

```js
class APIService with MixinLogger {

  void getPosts() {
    try {
      final response = http.get('https://www.example.com/posts');
     } catch (Exception e) {
        // mixin 메소드 호출
        logMessage(e.toString());
     }
    }

  }
```

이제!

![image](https://miro.medium.com/v2/resize:fit:996/1*i7xIxer3Ijfhk9r7xR_USg.gif)

```js
void main(){
  APIService apiService = APIService();

  if(apiService.runtimeType is MixinLogger){
    print("APIService는 MixinLogger 타입입니다.");
  }
  else{
    print("APIService는 MixinLogger 타입이 아닙니다.");
  }
}
```

<div class="content-ad"></div>

무엇이 출력될까요?

1 섹션을 모르거나 건너뛴 경우, 다시 살펴보세요.

그래서 결과는 "APIService is not off type MixinLogger"가 될 것입니다.

왜 그럴까요???? 같은 답변이지만 이번에는 이해하리라고 기대합니다.

<div class="content-ad"></div>

믹신은 클래스와 믹신이 제공하는 기능 사이에 "has-a" 관계와 유사하지만 정확히 동일하지는 않는 관계를 수립합니다. 이를 통해 믹신에서 정의된 메서드와 속성에 액세스할 수 있습니다.

그러나 차이점은 클래스 자체가 믹신의 인스턴스를 보유하지 않고 단순히 상속한다는 것입니다. 엄격한 계층 구조는 없습니다. 따라서 부모-자식 관계의 엄격한 계층 구조에 제한받지 않습니다.

이 유연성을 통해 클래스는 믹신과 직접적인 "is-a 관계"를 형성하지 않고도 믹신이 제공하는 기능을 활용할 수 있습니다.

이제 더 많은 기능을 살펴보겠습니다.

<div class="content-ad"></div>

![image](https://miro.medium.com/v2/resize:fit:996/1*j5nDu39KHxe3669LfJKieg.gif)

## 3. mixin에 있는 기능:

mixin에서의 on 키워드:

원하는 클래스의 하위 클래스에서만 사용되도록 mixin을 제한하려면 mixin 클래스를 on 키워드와 함께 선언해야 합니다.

<div class="content-ad"></div>

Markdown 형식에 맞게 표 태그를 변경해주세요.

mixin `mixinname` on `class_name_on_which_mixin_should_restricted`

_주의: 주석에 집중_

```js
mixin MixinDiscount on Product{

  performDiscountOperation(double price,double discount){
     // perform discount operations
    }

}


class Product{

}
```

여기서 Discount mixin은 제한되어서 Product 클래스 Type의 하위 클래스와 함께만 사용할 수 있습니다.

<div class="content-ad"></div>

```js
// 컴파일 시간에 오류가 발생하여 텔레비전이 Product를 구현해야 함을 지정
class Television with MixinDiscount {

}
```

```js
// 규칙을 준수하므로 작동합니다.
class Television extends Product with MixinDiscount {

  void doSomeOperation() {
    // 이제 메서드를 직접 호출할 수 있습니다
    performDiscountOperation(1000, 10);
  }

}
```

여러 mixin 상속:

하나의 함수를 포함하는 MixinA 및 MixinB를 선언해봅시다.

<div class="content-ad"></div>

```js
mixin MixinA{

  void functionA(){
    print("function A");
   }

}

mixin MixinB{

  void functionB(){
    print("function B");
  }

}
```

```js
class Consumer with MixinA, MixinB{

}

void main(){
  final consumer = Consumer();
  //Now consumer can be able to use both functions from mixin A and B
  consumer.functionA();
  consumer.functionB();
}
```

만약 여러 가지믹신이 동일한 함수 시그니처를 갖는다면?

Dart가 대비할 준비가 되어 있습니다 :)

<div class="content-ad"></div>

```js
mixin MixinA {
  void foo() {
    print('A.foo');
  }
}

mixin MixinB {
  void foo() {
    print('B.foo');
  }
}
```

이제 믹신 A와 B를 사용하는 클래스 C를 정의해 봅시다:

```js
class ClassC with MixinA, MixinB {
  // 클래스 구현...
}

void main() {
  final c = ClassC();
  c.foo(); // 결과: B.foo
}
```

이 상황에서 클래스 C는 믹신 A와 B에서 foo() 메서드를 모두 얻게 됩니다. 하지만 충돌이 있기 때문에 Dart는 어떤 것을 사용할지 결정해야 합니다. Dart는 마지막으로 사용된 믹신인 B의 foo() 메서드를 선택합니다. 따라서 클래스 C의 인스턴스를 만들고 foo()를 호출하면 mixin B의 함수가 호출됩니다.

<div class="content-ad"></div>

여러 상속을 지원하는 프로그래밍 언어는 다이아몬드 문제로 알려진 이러한 시나리오에 대한 복잡성을 가지고 있습니다. 그런데 Dart에는 쉽죠? :)

지금까지입니다.

읽어 주셔서 감사합니다 !!!

![image](https://miro.medium.com/v2/resize:fit:1280/1*R6bQiuW46ycpDFAI2tSUcw.gif)

<div class="content-ad"></div>

내 첫 블로그 포스팅이에요! 도움이 되었으면 좋겣아요 :)

이브라힘 사이드.
