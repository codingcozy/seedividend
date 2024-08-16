---
title: "플러터 다트 레코드가 실제로 뭐죠"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Flutter What actually is Dart Records"
link: "https://medium.com/@marcoedomingos/flutter-what-actually-is-dart-records-1054aaab38ca"
isUpdated: true
---





한 해 전, 우리는 드디어 프로덕션으로 Dart 3가 출시된다는 소식을 들었습니다. 이 소식은 플러터 커뮤니티에게는 좋은 소식이었습니다. 왜냐하면 이번 업데이트로 Dart 레코드를 얻게 되었기 때문이죠. 하지만 Dart 레코드가 무엇이며 실제로 어떻게 작동하는 걸까요?

# Dart 레코드란 무엇인가요?

커뮤니티에서 가장 일반적인 레코드의 정의는 레코드가 여러 객체를 단일 객체로 그룹화할 수 있게 해주는 새로운 변수 유형이라는 것입니다. 아래는 레코드 변수의 간단한 예시입니다:

```js
(String, String) fullName= ('Marco', 'Domingos');
```

<div class="content-ad"></div>

알겠어요, 이건 간단하게 들리지만 정작 어떻게 작동하는지는 많이 알려주지 않죠? 그래서 문서가 레코드를 어떻게 정의하는지 자세히 살펴봅시다.

Dart 문서에 따르면 레코드는 익명이면서 불변한 집합형 자료형입니다. 다른 컬렉션 유형과 같이 여러 객체를 한 객체로 묶을 수 있게 해줍니다.

레코드에 대한 이 정의는 꽤 직관적입니다. 하지만 여전히 복잡하게 느껴진다면, 단계별로 정의를 살펴보면 더 잘 이해할 수 있을 거예요.

## 익명

<div class="content-ad"></div>

기록은 익명 유형이라고 합니다. 즉, 기록에 데이터 유형과 관련된 이름이 없음을 의미합니다. 예를 들어, 텍스트 변수를 원한다면 다음과 같이 정의해야 합니다:

```js
String name = 'marco';
```

하지만, 기록 변수를 원하는 경우 변수를 정의하기 전에 "기록"이라는 이름을 추가할 필요가 없습니다. 다음과 같이하면 됩니다:

```js
(String, String) fullName = ('Marco', 'Domingos');
```

<div class="content-ad"></div>

아래의 Markdown 형식 표를 사용하면 레코드 데이터 유형의 변수 이름을 지정할 필요 없이 동일한 결과를 얻을 수 있습니다.

## 변경 불가능

또한 레코드는 변경할 수 없는 유형임을 나타내며, 레코드가 받는 값은 변경할 수 없습니다. 다른 말로 하면, 다음 예제와 같이 최종 변수와 동일합니다.

```js
void main() {
  final String name = 'marco';

  print('안녕 $name');
}
```

<div class="content-ad"></div>

만약 변수를 정의한 후에 값을 변경하려고 하면 "최종 변수 'name'은 한 번만 정의할 수 있습니다"라는 오류가 발생합니다.

Records에 대해서도 동일하게 적용됩니다. 값을 설정한 순간부터는 그 값을 변경할 수 없습니다.

```js
void main() {
  (String, String) fullName = ('Marco', 'Domingos');
  print('hello $fullName');
}
```

## 집계

<div class="content-ad"></div>

마지막으로, 레코드는 집합 유형의 변수들이기도 합니다. 즉, 레코드는 여러 값을 가져와서 하나의 객체로 결합합니다. 여기에서 커뮤니티가 레코드의 정의를 얻은 곳이기도 합니다. 우리가 집합 유형의 변수와 상호 작용하는 것은 새로운 것이 아닙니다. 예를 들어:

```js
void main() {
  Map fullName = {
    'FirstName': 'Marco',
    'LastName': 'Domingos'
  };
```

```js
  print('안녕하세요 $fullName');
}
```

이 값을 출력하면 "hello {Name: Marco, Surname: Domingos}"이라는 Map 값이 있는 단일 객체를 얻습니다. 레코드에서도 원칙은 동일합니다:

<div class="content-ad"></div>

```js
void main() {
  (String, String) fullName = ('Marco', 'Domingos');

  print('hello $fullName');
}
```

그리고 하나의 객체 "hello (Marco, Domingos)"를 출력합니다.

# 흥미로운 사실들

여기 레코드에 관한 재미있는 사실들:

<div class="content-ad"></div>

1- 레코드는 컬렉션의 유형이 아니지만 구문이 비슷해서 종종 Collection 유형의 변수로 혼동될 수 있어요.

2- 레코드는 일반적으로 두 개 이상의 필드를 다룰 때 사용하지만, 몇몇은 레코드의 최소 필드 수가 실제로 하나인 것을 알지만, 끝에 쉼표로 끝나는 것을 주의해야 해요.

```js
void main() {
  (int,) age = (22,);
  print('나이 ${age}');
}
```

이렇게 해야 하는 이유는 일부 구현에서 한 개의 필드만 있는 Records가 괄호로 묶인 표현식과 혼동할 수 있기 때문이에요. 유형 뒤에 ‘,’를 추가함으로써, 변수의 유형을 하나의 필드를 가진 Records로 확정시킬 수 있어요.

<div class="content-ad"></div>

3- Dart 레코드 표현식은 이름 지정된 필드 또는 위치 지정된 필드의 쉼표로 구분된 목록입니다. 이는 각 필드에 접근할 수 있음을 의미합니다:

```js
void main() {
  (String, String) fullName = ('Marco', 'Domingos');

  print('안녕하세요 ${fullName.$2}');
}
```

또는 레코드의 이름 지정된 필드를 구성하고 필드의 이름을 사용하여 액세스할 수도 있습니다:

```js
void main() {
  ({String first, String last}) fullName = (first: 'Marco', last: 'Domingos');

  print('안녕하세요 ${fullName.last}');
}
```

<div class="content-ad"></div>

두 개 다 "안녕 도밍고스"를 출력할 것입니다.

## 클로저

이 글의 끝이지만, Dart Records는 여기에서 간단히 다룬 것보다 훨씬 더 능력을 발휘할 수 있음을 입증했습니다. Dart Records에 대해 더 자세히 알고 싶다면 여기에서 Dart 문서를 읽어보시기를 권장합니다.

읽어주셔서 감사합니다.

<div class="content-ad"></div>

다른 흥미로운 기사를 찾거나 나에게 연락하려면 아래를 참고하세요:

- Github
- LinkedIn
