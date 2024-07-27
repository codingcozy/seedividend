---
title: "TypeScript 제네릭 이해하기 쉽게 정리하기"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_0.png"
date: 2024-07-07 21:53
ogImage:
  url: /assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_0.png
tag: Tech
originalTitle: "Making sense of TypeScript generics"
link: "https://medium.com/jobteaser-dev-team/making-sense-of-typescript-generics-6b830e66eeff"
---

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_0.png" />

TypeScript는 JavaScript 개발을 혁신적으로 개선했습니다. 코드 신뢰성과 유지 보수성을 향상시키며 개발자들에게 더 적은 런타임 오류를 보장하고 생산성을 높여줍니다.

하지만 TypeScript를 사용하기 시작하면 구문이 약간 압도적일 수 있습니다.

TypeScript에서 가장 두려운 기능 중 하나는 "제네릭"입니다. 아래 예제를 보세요 🤯 두려워하지 않으시죠?

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_1.png" />

그러나 걱정하지 마세요. 단계별로 진행하겠습니다. 제네릭을 이해하면 얼마나 강력한지 알게 될 거예요.

# 최적의 any 대안

이 아주 간단한 JavaScript 함수를 상상해보세요. 이 함수는 배열의 첫 번째 요소를 반환합니다. (네, 제가 동의합니다. 이 함수는 그다지 유용하지 않지만 설명을 위해서입니다).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_2.png" />

어떻게 타입을 지정할까요? 🤔 배열의 타입은 무엇이어야 할까요? 이 함수에서는 어떤 것이든 들어갈 수 있는 배열일 수 있습니다 (문자열, 숫자, 객체). 따라서 유혹받아 "any"라는 이름을 부를 수 없는 타입으로 지정하는 것이 유혹스러울 수 있습니다 😱

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_3.png" />

하지만 이는 매우 나쁜 타이핑입니다. 왜냐하면 TypeScript가 이 함수의 반환 타입을 올바르게 추론할 수 없기 때문입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_4.png)

어쨌든, 우리가 가능한 모든 다른 유형들을 지정할 수 있을까요?

![이미지](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_5.png)

좋은 생각이 아닙니다. 먼저, 이 함수에 대한 가능한 모든 유형의 큰 목록을 유지해야 한다는 점 때문입니다. 그리고 무엇보다 중요한 것은 이 추론 문제를 해결하지 못한다는 것입니다. TypeScript는 함수를 호출할 때 유형을 추측할 수 없을 만큼 똑똑하지 않습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

그럼 TypeScript에서 as를 사용해 캐스팅하는 것을 도와줄 수 있을 것 같네요!

![image](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_6.png)

하지만 그렇게 하는 건 이기적인 행동이에요! 이 타입 어설션으로 TypeScript에게 말하는 건, "타입 검사를 멈추고 나를 믿어, 내가 뭐 하는 지 안다"고 하는 거예요. 이렇게 하면 타입 안전성이 약화되고, TypeScript를 사용하는 핵심 목적이 퇴색됩니다.

그렇게 하지 마세요! 이걸 타입하는 더 안전하고 깨끗한 방법이 있어요.
이름이 뭐라고 생각하시나요? ✨ 제네릭스✨

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 제네릭 소개

이전 예제를 계속해 봅시다.

우리가 함수에 전달하고 싶은 내용은 "파라미터로 '무엇인가'의 배열을 받고, '무엇인가' 요소를 반환할 것"이라고 말하는 것입니다.

그것이 바로 제네릭이란 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이렇게 보일 것입니다:

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_7.png" />

이 코드의 일부를 자세히 살펴보겠습니다:

🟣 이전처럼 매개변수를 any[]로 입력하는 대신, 우리는 제네릭을 사용하여 매개변수를 정의합니다: 우리는 그것을 SomeType이라고 이름 짓겠습니다. 제네릭은 타입 자체가 아니라 타입 매개변수로, 함수가 호출될 때 지정될 타입을 나타내는 자리 표시자입니다. 당신은 원하는 대로 이름을 지을 수 있습니다(예약어나 이미 가져온 타입 이름이 아닌 경우). 우리는 종종 T와 같은 단일 문자를 제네릭으로 사용합니다. TypeScript에게 "이 함수는 어떤 타입의 배열을 매개변수로 받을 것"이라고 알립니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

🟢 이것은 함수의 반환 유형을 지정합니다. Typescript에게 "함수가 매개 변수 배열의 요소와 동일한 유형의 요소를 반환할 것"이라고 말하는 것입니다.

🟡 함수 괄호 앞의 이 부분은 이 함수에서 사용할 일반적인 요소를 각괄호 안에 나열한 것입니다. 여기서는 하나의 일반적인 (SomeType)만 사용하게 될 것이지만, 나중에 여러 개의 일반적인을 사용할 수 있다는 것을 보여 드리겠습니다.

우리가 일반적인을 사용하여 함수를 입력한 방식은 단지 "매개 변수가 어떤 유형의 배열이며, 함수가 이와 동일한 유형으로 반환될 것"이라는 뜻입니다.

이 함수를 작성하는 더 일반적인 방법은 T를 사용하는 것입니다 (문법이 덜 복잡하게 보이도록).

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_8.png" />

이 소개가 제네릭의 본질을 이해하는 데 도움이 되기를 바랍니다.

# 제네릭은 어디에나 있어요

이미 TypeScript를 사용해 보셨다면, 모르는 사이에 제네릭을 사용해 본 적이 있을 겁니다. 예를 들어 DOM API의 querySelector 함수를 생각해 보세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_9.png" />

이 예에서 querySelector는 반환된 요소가 HTMLElement 유형인지를 보장하기 위해 제네릭을 사용합니다. 이 유형 정보는 TypeScript가 반환된 요소에 대한 정확한 자동완성 및 유형 확인을 제공할 수 있도록 합니다. TypeScript에서 HTMLElement와 같은 네이티브 유형은 표준 라이브러리의 타입 선언인 lib.dom.d.ts에 의해 정의됩니다.

제네릭을 사용하면 요소를 다음과 같이 처리할 수 있습니다:

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_10.png" />

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이렇게 제네릭을 사용하지 않은 경우와의 차이는 다음과 같습니다:

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_11.png" />

제네릭 타입을 사용하지 않으면 TypeScript는 요소의 특정 타입을 알 수 없어서 도움이 되는 자동완성을 받을 수 없으며 오류가 발생할 수 있습니다 (캐스팅을 통해 수정 가능하지만 여전히 좋은 아이디어는 아닙니다).

제네릭을 사용하면 TypeScript가 작업 중인 요소의 정확한 종류를 이해할 수 있기 때문에 더 나은 타입 안전성과 개발자 경험을 제공합니다. 따라서 제네릭이 네이티브 API 및 라이브러리에서 널리 사용되는 것은 놀라운 일이 아닙니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 제네릭을 더 깊게 파헤쳐보기

제네릭은 단순한 함수에만 국한되지 않습니다. 더 유연하고 재사용 가능한 코드를 만들기 위해 다양한 방법으로 사용할 수 있습니다.

심도 있는 예시를 살펴보겠습니다. 첫 번째 요소를 가져오는 것보다 실제 세계의 문제에 더 가까운 예제를 살펴보겠습니다. API 응답을 다루는 예시입니다.

다음 코드를 살펴봅시다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![이미지](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_12.png)

ApiResponse 유형을 정의합니다. 이 유형은 항상 숫자 상태, 문자열 메시지 및 모든 유형의 데이터를 반환합니다.

그러나 본문의 첫 부분에서 본 것처럼 any를 사용하는 것은 유형을 올바르게 추론하지 못하게 합니다.

제네릭을 사용하여 그것을 개선해 봅시다:

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

![Image](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_13.png)

이 코드에 조금 더 가까이 들어가 봅시다.

🟡 먼저, 여기서 새로운 구문을 볼 수 있습니다. 이것은 제네릭 형식입니다. 제네릭을 사용하는 유형을 정의하고 있습니다. 이전에 본 함수 예제와 비슷하게 작동합니다:

- 꺽쇠 괄호 내에서 사용된 제네릭을 나열합니다.
- 제네릭을 유형 정의 내에서 사용합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

🟣 이제는 이 타입을 사용할 때마다, T의 타입을 각괄호 안에 명확하게 지정해야 합니다. 이 fetch에 대한 API 응답 데이터가 ' name: string; age: number ' 타입임을 명시하고 있습니다. 이것은 타입 인자입니다.

그리고 이제, fetchData 함수가 잘 타입화되었으므로 TypeScript가 해당 반환 타입을 올바르게 추론할 수 있습니다.

# 일반화 제한하기

가끔, 제네릭이 모든 타입을 허용하지 않고 더 많은 제약이 있는 상태로 제한하고 싶은 경우가 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

API 응답의 예제를 계속 사용하면 데이터가 항상 객체여야하고 그 외의 것들이 들어가지 않아야 합니다.

`extends` 키워드를 사용하여 가능합니다.

![image](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_14.png)

만약 객체가 아닌 다른 것으로 함수를 호출하려고 하면 TypeScript에서 오류가 발생합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

특정 속성을 갖는 객체를 제약하는 방법도 있습니다. 예를 들어 API 데이터가 항상 id를 포함하는 객체여야 하는 경우:

![이미지](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_15.png)

# 제네릭을 위한 기본 타입

제네릭의 또 다른 멋진 기능은 기본 타입을 제공할 수 있다는 것입니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

지금까지 본 모든 예제에서 우리는 제네릭 타입을 사용할 때 type 인자를 명확히 지정해야 했습니다. 예를 들어: ApiResponse`' name: string; age: number '`.

그러나 만약 당신이 자주 동일한 타입을 제네릭에 사용한다면, 타입 정의에서 =로 기본값을 지정할 수 있습니다.

![image](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_16.png)

심지어 제약 조건과 함께 사용할 수도 있습니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_17.png" />

# 여러 제네릭

가끔은 한 가지 제네릭만으로는 부족하고 2개 이상이 필요할 때가 있습니다.

꺽쇠 괄호 안에 제네릭을 콤마로 구분하여 나열하면 됩니다. 함수를 호출할 때도 타입 인자를 동일하게 나열해 주세요.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

한 예시를 살펴보겠습니다:

![generics](/TIL/assets/img/2024-07-07-MakingsenseofTypeScriptgenerics_18.png)

제네릭은 처음에는 무서울 수 있지만, 이들이 어떻게 작동하는지 이해하면 그들의 힘을 빨리 깨닫고 TypeScript 생태계의 중심에 왜 있는지 이해하게 됩니다.

함수와 컴포넌트가 다양한 유형으로 작동할 수 있도록 허용하면서도 강한 유형 안전성을 유지함으로써, TypeScript 제네릭은 견고하고 유지 관리가 용이한 코드를 작성하는 능력을 크게 향상시키며 개발자 경험을 놀라운 것으로 만들어 줍니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

행복한 코딩하세요!
