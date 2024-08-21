---
title: "TypeScript의 객체 리터럴 타입 이해하기 특이점과 인사이트"
description: ""
coverImage: "/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_0.png"
date: 2024-06-22 03:21
ogImage:
  url: /assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_0.png
tag: Tech
originalTitle: "Understanding TypeScript’s Handling of Object Literal Types: The Quirks and Insights"
link: "https://medium.com/stackademic/understanding-typescripts-handling-of-object-literal-types-the-quirks-and-insights-c1c8b4e49645"
isUpdated: true
---

![Understanding TypeScript's Handling of Object Literal Types](/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_0.png)

안녕하세요! TypeScript의 객체 리터럴 형식 처리는 때로 예상치 못한 동작을 일으킬 수 있다는 사실을 알고 계셨나요? TypeScript를 배우기 시작했을 때 나는 가끔 일어나는 이 문제로 어려움을 겪었습니다. 이것은 일관성이 없어 보이는 TypeScript의 동작 때문에 처음에는 감이 오지 않았습니다.

맥락을 좀 더 설명하자면, TypeScript는 현대적 웹 애플리케이션을 구축하기 위한 타입 안전성과 고급 기능을 제공하는 Javascript의 상위 집합체로서 작용합니다. TypeScript는 선택적 정적 타이핑을 도입하여 개발자가 개발 과정 초기에 오류를 빨리 찾아내고 더 신뢰할 수 있는 코드를 작성할 수 있게 지원합니다.

기본적으로, TypeScript는 이러한 상황에서 도와줍니다 (조금 미묘한 암시가 있음):-

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

![UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_1](/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_1.png)

![UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_2](/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_2.png)

그러면 블로그 주제로 넘어가 보겠습니다. 타입스크립트에 의한 객체 리터럴의 일관되지 않은 처리에 대해 다루고 있습니다. 제가 말하는 것은 객체를 다룰 때 타입스크립트의 행동에 대해 어떤 불일치가 관찰될 수 있다는 것입니다. 설명을 듣겠습니까?

# 이슈 설명

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

사용자를 생성하는 데 사용되는 기본 함수입니다. 기능이 작성되지 않은 빈 함수이지만, 여기서 다루는 문제는 기능의 유무가 아닙니다. 문제는 거의 동일한 약간의 차이가 있는 두 가지 다른 방법으로 호출할 때 발생합니다.

다음과 같은 자잘한 차이점이 있습니다.

함수에 기대하는 매개변수(이름 및 isPaid)에 email이라는 추가적인 인수를 전달하여 함수를 호출하면 오류가 발생합니다. 이는 함수를 선언할 때 정의되지 않았기 때문에 예상하지 못했던 것입니다. 꽤 기본적인 문제죠?

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

하지만 우리가 객체를 함수의 인수로 전달하는 방식을 약간 수정하면 이 오류가 말이 안 되기 시작합니다. 우리가 바로 전달한 객체를 변수에 할당한 뒤에 변수를 함수에 전달하는 방식으로 바꾸는 것인데, 이전과 동일한 오류가 발생해야 했지만 오류가 발생하지 않습니다.

![이미지](/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_5.png)

제가 말한 불일치입니다. 이런 일이 발생한 이유와 이를 방지할 수 있는 방법에 대해 논의하고 싶습니다.

# 이런 일이 발생한 이유

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

TypeScript의 설계 결정 사항 중 Excess Property Checking과 Structural Typing 때문에 오류가 발생합니다.

이 동작의 핵심은 TypeScript가 초과 속성을 확인하는 방식에 있습니다. 직접 객체 리터럴을 전달할 때 TypeScript는 함수에 추가적인 속성이 전달되지 않도록 엄격한 초과 속성 확인을 수행합니다. 이것은 잠재적인 오류를 빨리 발견하기 위한 것입니다.

반면, 객체가 변수에 할당된 경우 TypeScript는 이 엄격한 확인을 건너뜁니다. 그 이유는 해당 추가 속성이 있는 객체가 코드 다른 곳에서 사용될 수 있으며, TypeScript는 이러한 경우에 더 많은 유연성을 허용합니다. 이를 구조적 타이핑이라고하며, TypeScript는 객체가 즉시 리터럴이 아닌 경우 필수 속성만을 확인하고 추가 속성을 무시합니다.

## 관용구에는 말이 있듯이

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

<img src="/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_6.png" />

변수에 객체를 할당하고 함수에 전달할 때, TypeScript는 구조적 타이핑을 활용합니다. 이는 객체가 기대되는 타입 구조를 준수하는 한 추가적인 속성을 가질 수 있게 합니다. 이 접근법은 더 융통성이 있고 유연합니다.

장점:-

유연성: 객체를 다양한 맥락에서 더 다재다능하게 사용할 수 있습니다. 개발자는 코드의 관련없는 부분에서 오류를 일으키지 않고 추가적인 속성을 가진 객체를 생성할 수 있습니다.

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

편의성: 이 기능은 복잡한 데이터 구조를 다룰 때나 다른 목적을 위해 객체에 추가 정보를 확장할 때 특히 객체 생성 및 조작을 용이하게 만듭니다.

유형 안전성: TypeScript는 유연성을 유지하면서도 필수 속성이 존재하고 올바른 유형을 갖추도록 보장하여 유연성과 유형 안전성 사이의 균형을 제공합니다.

# 이러한 오류를 보다 엄격한 유형 안전성을 보장하고 한정하려면 어떻게 해야 합니까?

방법 1: 변경할 변수의 유형을 명시적으로 주석으로 표시합니다.

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

<img src="/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_7.png" />

여기서 우리는 추가 속성이 없도록 특정 유형으로 변수를 명시적으로 선언하고 있습니다.

방법 2: 함수 매개변수를 설정할 때 엄격한 유형을 사용합니다.

<img src="/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_8.png" />

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

여기서는 함수를 만들 때 매개변수가 엄격하게 형식화되므로 TypeScript가 알 수 없는 속성과 관련된 오류를 발생시킵니다.

방법 3: 인터페이스 유형 사용

![이미지](/assets/img/2024-06-22-UnderstandingTypeScriptsHandlingofObjectLiteralTypesTheQuirksandInsights_9.png)

여기서는 유형 안전성을 위해 인터페이스를 사용하고, 추가 속성이 필요한 사용 사례에 대해 기본 인터페이스를 확장하고 있습니다.
그러나 기본 인터페이스를 추가 속성과 함께 사용할 때 TypeScript가 알 수 없는 속성에 대한 오류를 내보내는 것을 볼 수 있습니다. 이는 맥락에 따라 쉽게 완화될 수 있으며 두 가지 목적을 제공합니다:-

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

- 만약 추가적인 이메일 속성이 필요한 상황이라면, 오류를 완화하기 위해 확장된 인터페이스를 사용할 수 있습니다.
- 만약 추가적인 이메일 속성이 필요하지 않은 상황이라면, 인터페이스는 올바른 유형 확인기로 작용하여 이메일 매개변수를 잘못 설정한 오류를 알려줍니다.

# 결론

특히 직접적인 객체 리터럴과 변수 사이의 차이에 대한 TypeScript의 처리 방식은 유형 안전성과 유연성을 균형 있게 유지하는 의도적인 설계 선택입니다. 이 동작을 이해하면 보다 견고한 TypeScript 코드를 작성하고 기능을 효과적으로 사용하는 데 도움이 됩니다. 위에서 설명한 방법을 따르면 보다 엄격한 유형 안전성을 보장하고 과도한 속성과 관련된 잠재적인 위험 요소를 피할 수 있습니다. 처음에는 일관성이 없어 보일 수 있지만 (저에게도 그랬습니다), 이것이 유연성을 제공하기 위해 설계된 기능임을 알아차리면 개발 프로세스에서 TypeScript를 더 잘 활용할 수 있습니다.

# Stackademic 🎓

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

끝까지 읽어주셔서 감사합니다! 이제 가시기 전에:

- 작가를 격려하고 팔로우해주시면 감사하겠습니다! 👏
- 팔로우하기: X | LinkedIn | YouTube | Discord
- 다른 플랫폼 방문: In Plain English | CoFeed | Differ
- Stackademic.com에서 더 많은 콘텐츠를 확인해보세요.
