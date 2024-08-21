---
title: "자바스크립트에서 Rest 매개변수 사용하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-WhatIstheRestParameterinJavaScript_0.png"
date: 2024-05-17 20:26
ogImage:
  url: /assets/img/2024-05-17-WhatIstheRestParameterinJavaScript_0.png
tag: Tech
originalTitle: "What Is the … Rest Parameter in JavaScript?"
link: "https://medium.com/javascript-in-plain-english/what-is-the-rest-parameter-in-javascript-91ecb02c902d"
isUpdated: true
---

## ES6 REST 문법

![이미지](/assets/img/2024-05-17-WhatIstheRestParameterinJavaScript_0.png)

# 소개: REST 파라미터의 힘

자바스크립트 세계는 끊임없이 발전하는 풍경 속에서, 코딩을 더 효율적이고 유연하며 재미있게 만들어주는 멋진 기능들로 가득 차있습니다.

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

ECMAScript 6 (ES6)에서 소개된 하나의 기능은 ...나머지 매개변수이며 ...rest 매개변수로도 쓰입니다.

이 마법같은 구문을 사용하면 함수 인수를 하나의 배열로 쉽게 수집할 수 있습니다.

시작하기 전에 REST와 ...나머지가 완전히 다른 개념임을 언급해야 합니다. REST(API와 관련된 REST)에 대해서는 이 기사들을 확인해주세요:

이제 재미있는 이모지 예제를 활용하여 나머지 파라미터의 기능을 탐험해 봅시다. 어떻게 하는지 알고 있겠죠?

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

# 🚀 자바스크립트의 ES6 Rest 파라미터로 미사일 발사

...rest 파라미터는 자바스크립트 함수로 전달된 다양한 수의 인수를 처리하는 간단하면서도 강력한 방법입니다.

여러 개의 이모지 인수를 받아들이는 함수가 있다고 상상해보세요. 이들을 모두 출력해야 할 때의 과제가 생겼다고 가정해 봅시다.

...rest 파라미터를 사용하지 않으면 arguments 객체를 처리해야 할 것입니다. 그러나 ...rest 파라미터를 사용하면 보다 우아하게 처리할 수 있습니다:

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

```js
function printEmojis(...emojis) {
  emojis.forEach((emoji) => console.log(emoji));
}

printEmojis("🚀", "🌕", "👩‍🚀");
// 출력:
// 🚀
// 🌕
// 👩‍🚀
```

이 예제에서 ...rest 파라미터는 모든 이모지들을 하나의 배열로 모아줍니다. 그리고 우리는 배열을 반복하여 각각을 개별적인 줄에 출력합니다.

# 🧙‍♂️ Rest 파라미터와 구조 분해(Destructuring) 결합하기

Rest 파라미터를 destructuring과 결합하여 더욱 강력하게 사용할 수 있습니다. 이런 조합은 마치 마술처럼 보일 수 있습니다.

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

이 기술은 이모지 배열에서 특정 요소를 추출하고 별도로 처리할 수 있게 해줍니다. 이것이 어떻게 동작하는지 실습을 통해 살펴보겠습니다:

```js
function emojiParty(firstEmoji, ...otherEmojis) {
  console.log(`첫 번째 이모지: ${firstEmoji}`);
  console.log(`다른 이모지들: ${otherEmojis}`);
}

emojiParty("🎉", "🎈", "🎊", "🎁");
// 출력:
// 첫 번째 이모지: 🎉
// 다른 이모지들: 🎈,🎊,🎁
```

이 예제에서는 함수 인수를 구조 분해하여 첫 번째 이모지를 firstEmoji 변수에 할당합니다.

그런 다음, ... rest 파라미터 구문을 사용하여 나머지 이모지를 otherEmojis 배열에 수집합니다.

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

이 마술 묘기로, 첫 번째 이모지와 나머지 이모지를 쉽게 나눠서 표시할 수 있어요.

여러 개의 첫 번째 매개변수를 포함하고, 끝에 ...rest 구문만 사용하면 돼요.

# 🔧 인수 객체의 단점을 수정하기

나머지 매개변수는 특히 옛날 ES5 기능인 arguments 객체와 비교할 때 상쾌한 기운을 불어넣어요.

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

인수 개체와는 달리, 나머지 매개변수는 실제 배열이며 모든 유용한 배열 메서드를 사용할 수 있습니다.

```js
function printArguments() {
  // 인수 객체를 배열로 변환
  const argsArray = Array.from(arguments);
  // 배열을 순환하며 각 인수를 출력
  argsArray.forEach((arg) => console.log(arg));
}

printArguments("🍔", "🍟", "🥤");
// 출력:
// 🍔
// 🍟
// 🥤
```

인수 개체와는 달리 인수 개체의 forEach 메서드를 사용할 수 없습니다. 이는 열거 가능한 속성을 가진 객체가 아닌 배열류 객체이기 때문입니다.

나머지 매개변수가 배열이므로 "나머지"의 사용은 훨씬 더 간단하고 즐거워집니다. 한번 살펴보세요:

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

```js
function sumEmojisLength(...emojis) {
  return emojis.reduce((total, emoji) => total + emoji.length, 0);
}

const totalLength = sumEmojisLength("🎂", "🥳", "🎈", "🎉");

console.log(`Total emoji length: ${totalLength}`);
// Output: Total emoji length: 8
// Each emoji has a string length of 2 characters, and 2×4 === 8
```

이 예시에서는 이모티콘 배열에 reduce 메서드를 사용하여 모든 이모티콘의 총 길이를 계산할 수 있습니다.

나머지 매개변수를 사용함으로써, Array.from()을 사용하여 먼저 인자 객체를 배열로 변환할 필요 없이 번거로움을 줄일 수 있습니다.

JavaScript의 화살표 함수 구문을 사용하면 이 코드가 더 짧아지면서도 여전히 매우 가독성이 높아집니다.

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

```js
const calculateEmojiLength = (...emojis) => emojis.reduce((total, emoji) => total + emoji.length, 0);

const totalLength = calculateEmojiLength("🎂", "🥳", "🎈", "🎉");

console.log(`Total emoji length: ${totalLength}`);
// 출력: Total emoji length: 8
// 각 이모지는 2개의 문자로 이루어져 있으며, 2×4 === 8
```

# 🤹 조작하기: 스프레드 연산자 + 나머지 매개변수

나머지 매개변수의 동생인 스프레드 연산자도 세 개의 점 구문을 사용하지만 다른 목적을 가지고 있습니다.

나머지 매개변수는 함수 인수를 배열로 수집하는 반면, 스프레드 연산자는 반대로 작용합니다.

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

펼침 연산자(Spread)는 배열이나 객체를 개별 요소로 확장하거나 얕은 복사를 하는 데 사용됩니다.

나머지 매개변수와 함께 사용되는 펼침 연산자는 데이터를 쉽게 조작하고 전달할 수 있는 강력한 동료를 만듭니다.

다음 코드 예제에서 이들의 힘을 결합해 보겠습니다:

```js
const mixEmojis = (...emojis) => emojis.join(" ");

const partyEmojis = ["🎉", "🎈", "🎁"];
const celebration = mixEmojis("🥳", ...partyEmojis, "🎂");

console.log(`Celebration: ${celebration}`);
// 출력: Celebration: 🥳 🎉 🎈 🎁 🎂
```

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

이 예제에서는 partyEmojis 배열 요소를 개별 인수로 mixEmojis 함수에 전달하기 위해 전개 연산자를 사용합니다.

그런 다음 나머지 매개변수가 이를 단일 배열로 수집하고 문자열로 결합합니다. 축하할 일이네요!

# 결론: ... 나머지 매개변수 활용하기

우리가 보았듯이, 나머지 매개변수는 다양한 수의 함수 인수를 우아하게 처리할 수 있는 다재다능한 도구입니다.

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

ES6 해체 및 전개 연산자와 ...rest 매개변수를 결합하여 더 나은, 더 간단한 코드를 작성할 수 있어요.

물론, React 규칙을 따르고 매개변수로 객체를 전달하는 것이 좋아요. ...rest는 필요없어요!

다른 쪽으로, Tailwind CSS와 함께 작업할 때 항상 간단한 classNames 함수가 필요해서 ... rest 구문을 매일 사용하고 있지만:

```js
const classNames = (...args: string[]) => args.filter(Boolean).join(" ");
```

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

여기 아이디어는 문자열 목록을 전달하고, Prettier로 정렬된 Tailwind CSS 클래스 이름을 합치는 것입니다.

만약 그 필터 트릭이 이해되지 않는다면, 왜 이것이 멋지다고 생각하는지 설명한 이전 게시물로 돌아가보세요.

...나머지 매개변수의 마법을 받아들이고, 코드에 이 "스놀랙스 구문"을 뿌려넣어 코드를 휴식 시키는 것을 바랍니다!

코딩을 즐기세요! 😴

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

# 더 읽을 거리

- Yug Shah이 GeeksforGeeks.org에서 나머지 매개변수에 대해 쓴 글을 참고해보세요.

- 웹 관련 내용을 학습할 때 항상 MDN 문서를 먼저 참고합니다.

- Dhanajay kumar이 Telerik에서 나머지(rest)에 대해 이야기합니다.
