---
title: "Dart 변수"
description: ""
coverImage: "/assets/img/2024-05-16-DartVariables_0.png"
date: 2024-05-16 03:26
ogImage: 
  url: /assets/img/2024-05-16-DartVariables_0.png
tag: Tech
originalTitle: "Dart Variables"
link: "https://medium.com/@dhananjaya08fdo/dart-variables-240ff8b742a6"
isUpdated: true
---




다트(Dart)에서 변수는 가변성, 유형 및 범위에 따라 여러 범주로 나눌 수 있습니다. 다음은 다트의 주요 변수 유형입니다.

![Dart Variables 0](/assets/img/2024-05-16-DartVariables_0.png)

- final: 한 번 초기화된 값이 변경될 수 없는 변수입니다. 정확히 한 번만 초기화해야 합니다.

![Dart Variables 1](/assets/img/2024-05-16-DartVariables_1.png)



- const: 컴파일 시간 상수입니다. 그들의 값은 컴파일 시간에 결정되며 런타임에서 변경할 수 없습니다.

![이미지](/assets/img/2024-05-16-DartVariables_2.png)

- var: 할당된 값에 기반하여 Dart 컴파일러가 추론하는 동적으로 타입이 지정된 변수입니다.
- dynamic: 어떤 유형의 값이든 보유할 수 있는 특별한 유형입니다. 유형은 런타임에 결정됩니다.

특정 유형 선언:



- int: 정수 값들.
- double: 부동 소수점 숫자.
- bool: 부울 값 (참 또는 거짓).
- String: 문자의 시퀀스.
- List: 객체의 순서가 정해진 컬렉션.
- Map: 키-값 쌍의 컬렉션.
- Set: 고유한 객체들의 정렬이 되지 않은 컬렉션.

- Function: 함수 유형을 나타냅니다.

- Local Variables: 함수나 블록 내에서 정의되며 해당 범위 내에서만 접근할 수 있는 변수.
- Global Variables: 코드의 어디에서든 접근할 수 있는 변수인 전역 변수입니다.

- this: 클래스의 현재 인스턴스를 가리킵니다.
- super: 클래스의 슈퍼클래스를 가리킵니다.
- null: 값이 없음을 나타냅니다.



여기서 Dart의 공식 변수 문서를 확인할 수 있어요: [https://dart.dev/language/variables](https://dart.dev/language/variables).