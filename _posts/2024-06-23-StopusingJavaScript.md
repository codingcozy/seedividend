---
title: "자바스크립트를 이제 그만 사용해야 하는 이유 5가지"
description: ""
coverImage: "/assets/img/2024-06-23-StopusingJavaScript_0.png"
date: 2024-06-23 13:14
ogImage:
  url: /assets/img/2024-06-23-StopusingJavaScript_0.png
tag: Tech
originalTitle: "Stop using JavaScript"
link: "https://medium.com/javascript-in-plain-english/stop-using-javascript-3ed7d154e24b"
isUpdated: true
---

![Table](/assets/img/2024-06-23-StopusingJavaScript_0.png)

웹 개발을 시작한 이후로 JavaScript를 열광하는 팬이었어요. 하지만 JavaScript의 결함을 깨닫게 되었던 것은 글쓰기와 잠재적 책을 집필하기 시작한 이후였어요.

마이크로소프트의 TypeScript가 그 결함을 해결하려고 노력했지만, 각자의 단점이 있었죠. 양 언어의 일반적인 차이점을 표로 보여드리고, 다음 프로젝트에 어떤 언어를 선택해야 하는지에 대해 깊이 알아보겠어요.

# 일반적인 차이점

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

기초부터 시작해보죠. 많이 읽기 귀찮은 사람들을 위한 표도 준비했어요. 이 중 일부는 글의 후반부에서 해당 내용과 같은 설명을 이해해야 합니다.

![JavaScript Table](/assets/img/2024-06-23-StopusingJavaScript_1.png)

# JavaScript

인터넷이 1990년대에 형성되기 시작할 때 JavaScript가 탄생했어요. 이는 Java의 성공에서 영감을 얻은 후 1995년에 나왔어요.

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

넷스케이프, 모직라의 전신,는 상호 작용형 웹 애플리케이션을 위해 JavaScript를 만들었습니다. 브렌단 아이크는 많은 결함이 있는 JavaScript를 몇 일 안에 완성했습니다.

![이미지](/assets/img/2024-06-23-StopusingJavaScript_2.png)

지금으로부터 빠르게 전진하면 TypeScript가 나옵니다. 그 결함들? 예, 누군가 그것들을 고쳐야 한다고 판단했습니다. 하지만 JavaScript가 도움이 되는 경우도 있습니다.

## TypeScript보다 좋은 이유

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

- TypeScript은 작은 프로젝트에 적합하지 않습니다. 이때 JavaScript가 빛을 발합니다. 이는 Microsoft 개발자들이 그런 식으로 설계했기 때문입니다. 사이드 프로젝트에서는 정적 유형, 인터페이스 등이 필요하지 않습니다.
- TypeScript 기반 프로젝트에는 시간 비용이 들어간다는 것이 JavaScript보다 더 나은 이유입니다. TS는 브라우저가 이해할 수 있게 TS 코드를 JS 코드로 변환하는 데 꽤 많은 시간이 걸립니다. 이러한 추가 비용은 작은 프로젝트에 값어치가 없습니다.
- 작은 코드 스니펫에서는 JavaScript가 네이티브 브라우저에서 디버깅하기 쉽습니다.
- 프로토타입에는 JavaScript가 더 나은데, TS나 기타 추가 비용에 드는 시간을 감당할 수 없는 작은 프로젝트와 같습니다.
- 현재 JavaScript를 사용하고 있는 대규모 프로젝트에 대해서는 계속하여 JavaScript를 사용할 수 있습니다. 코드를 TypeScript로 리팩토링하는 비용이 그렇게 가치 있는 것은 아닐 수도 있습니다.

이제 JavaScript가 머리아픈 일의 원인이 되는 경우를 설명해보겠습니다.

# TypeScript

만약 여러분이 인터넷에서 JavaScript를 없애는 해결책이 없는 이유에 궁금해 한다면, 그 이유는 JavaScript가 모든 웹 브라우저의 핵심이기 때문입니다. 웹 애플리케이션을 구축하는 데 필요한 세 가지 기술(HTML, CSS 및 JS) 중 하나입니다.

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

<img src="/assets/img/2024-06-23-StopusingJavaScript_3.png" />

그것을 대체하는 대신, 개발자들은 그것을 개선하는 데 집중했습니다. 그 결과 TypeScript가 탄생했습니다. JavaScript의 창시자 인 Brendan Eich도 TypeScript를 JavaScript에 유익한 부가 기능으로 간주합니다.

## JavaScript보다 나은 이유

- JavaScript는 호환성 문제를 가지고 있습니다. 여러 브라우저에서 ECMA 표준의 구현이 다르며, JS 코드를 파싱하기 위해 여러 해석기가 사용됩니다. 일부 브라우저는 여전히 이전 버전의 ECMAScript를 사용하고 있습니다. TypeScript를 사용하면 새로운 JavaScript 기능을 사용하여 이전 브라우저와 NodeJS 버전과 함께 사용할 수 있습니다.
- TypeScript는 JavaScript의 상위 집합입니다. TypeScript의 기능을 사용하지 않더라도 기술적으로 JavaScript 코드는 TypeScript 코드가 되고 그 반대도 성립합니다. TypeScript에는 브라우저를 위해 TS 코드를 JS로 변환해주는 컴파일러가 있습니다.
- JavaScript는 동적으로 유형이 지정되지 않아 예상치 못한 오류가 발생할 수 있습니다. 이는 데이터의 유형을 정의할 필요가 없다는 뜻입니다. TypeScript는 JavaScript에 정적 유형을 추가하여 변수, 함수 매개변수 및 반환 값의 데이터 유형을 지정할 수 있도록 하여 개발자가 개발 과정 초기에 유형 관련 오류를 미연에 방지할 수 있습니다.
- TypeScript를 사용하면 코드를 ES3 또는 그 이하의 이전 JavaScript 버전으로 변환할 수 있습니다. WebPack과 함께 사용하면 레거시 브라우저를 지원하는 데 도움이 됩니다.
- TypeScript는 인터페이스, 상속 기능, 캡슐화 능력 및 클래스를 제공합니다. 객체 지향 배경을 가진 개발자들에게 JavaScript로 전환하기가 더 쉽습니다. 새로운 환경을 배울 필요가 없고 기존의 습관을 유지할 수 있습니다.
- TypeScript를 사용하면 함수의 선택적 매개변수와 해당 선택적 또는 필수 매개변수의 기본 값을 설정할 수 있습니다.
- TypeScript에는 데코레이터가 있습니다. 클래스, 메서드 및 속성에 메타데이터를 첨부할 수 있습니다. 이는 의존성 주입 및 관점 지향 프로그래밍에 도움이 됩니다.
- TypeScript에는 제네릭이 있습니다. 구성 요소가 하나뿐만 아니라 여러 데이터 유형을 지원할 수 있습니다. Java와 같은 언어는 이미 제네릭을 지원합니다. 이를 통해 개발자는 기존 및 미래에 사용할 수 있는 구성 요소를 작성할 수 있습니다.

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

TypeScript은 유연성과 확장성을 제공합니다. 이 차별화로 보아 미래를 향해 나아가면서도 역호환성을 생각하고 있음을 알 수 있습니다. JavaScript가 실패하는 부분에서 TypeScript가 잘 해내고 있는 것이죠.

의견을 나누고 싶다면 댓글을 달아주세요. 다른 사항을 변경해야 한다면 알려주세요. 이메일 director@afankhan.com (Afan Khan LLC) 으로 언제든지 연락할 수 있습니다. 그렇지 않으면 트위터(@whyafan)를 통해서 가장 쉽게 연락할 수 있습니다.

# 쉬운 영어로 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

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

- 작가를 박수로 응원하고 팔로우하기 ️👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | 뉴스레터
- 다른 플랫폼 방문하기: CoFeed | Differ
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기
