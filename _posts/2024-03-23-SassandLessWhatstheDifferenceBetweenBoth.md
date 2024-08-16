---
title: "Sass와 Less 두 가지의 차이점 비교 정리"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "Sass and Less Whats the Difference Between Both"
link: "https://medium.com/@shariq.ahmed525/sass-and-less-whats-the-difference-between-both-6b77f9aeca4a"
isUpdated: true
---





![Sass vs Less](/assets/img/Sass-and-Less:-What’s-the-Difference-Between-Both_0.png)

CSS에서는 변수, 임포트, 내장 기능, 중첩 규칙 및 믹스인과 같은 기능을 사용할 수 없습니다. CSS 전처리기를 사용해야 합니다. 다행히 이러한 기능을 모두 활용할 수 있는 것이 있습니다: Sass.

Sass를 사용하면 CSS가 더 구조화되고 유지 관리가 쉬워집니다. 또한 복잡한 스타일을 쉽게 만들 수도 있습니다.

그런데 기다려봐요. 사실 전처리기가 뭔가요? 간단히 말해, 전처리기는 일반 프로그램으로 컴파일된 스크립트 언어입니다. 다른 프로그램으로의 입력 데이터를 제공해 그 결과를 생성하는 역할을 합니다.

<div class="content-ad"></div>

그런데 브라우저는 Sass 코드를 이해하지 못합니다. Sass 코드를 CSS로 변환해주는 Sass 프리프로세서를 사용해야 합니다. 이 전체 과정을 변환(Transpiling)이라고도 합니다. Sass를 사용하는 또 다른 이점은 변수를 사용하여 스타일을 재사용할 수 있다는 것입니다. 또한 Sass에서는 변수에 문자열, 숫자, 색상, 목록, 불리언, 널(null)과 같은 정보를 저장할 수 있습니다.

이러한 모든 변수는 Sass에서 $와 함께 사용되어야 합니다. 반면에 이러한 변수들의 범위는 정의된 중첩 수준에서 유효합니다. 더 나아가 Sass는 CSS 선택자를 중첩할 수 있도록 허용하여 중첩 선택자를 작성하고 Sass가 자동으로 작업을 결합하도록 할 수 있어서 작업 효율성이 매우 높아집니다.

Sass 외에도 Leaner Style Sheets(Less)라는 다른 CSS 프리프로세서가 있습니다. Less는 CSS에 대한 스크립팅 언어이자 하위 호환성 있는 언어 확장입니다. 그러나 Sass와는 달리 Less의 변수는 @로 초기화됩니다. 그러나 Less에서는 Sass보다 더 적은 프레임워크가 있습니다.

<div class="content-ad"></div>

하지만 Less와 Sass 사이에서 어떤 것을 사용해야 할까요? 사실 이 둘의 차이는 무엇일까요? 그 차이점은 Sass가 Ruby로 작성되었으며, 반면에 Less는 JavaScript로 작성되었다는 것입니다. 더불어, Sass는 변수에 $를 사용하고, Less에서는 @를 사용합니다. Less의 소프트웨어 지원은 Sass에 비해 조금 분산되어 있습니다.

그럼에도 불구하고, 저는 Sass 대신 Less를 선호합니다. 왜냐하면 Less가 오류의 정확한 위치를 알려주기 때문입니다. Sass는 이를 제대로 알려주지 않습니다. 오류의 정확한 위치를 가리키지 않거든요.
