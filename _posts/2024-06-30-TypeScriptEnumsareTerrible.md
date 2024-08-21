---
title: "TypeScript Enum이 정말 별로인 이유 5가지"
description: ""
coverImage: "/assets/img/2024-06-30-TypeScriptEnumsareTerrible_0.png"
date: 2024-06-30 18:34
ogImage:
  url: /assets/img/2024-06-30-TypeScriptEnumsareTerrible_0.png
tag: Tech
originalTitle: "TypeScript Enums are Terrible"
link: "https://medium.com/@vikaskum660/typescript-enums-are-terrible-38078cf1fbb2"
isUpdated: true
---

![TypeScript Enums](/assets/img/2024-06-30-TypeScriptEnumsareTerrible_0.png)

## Enum의 역사

TypeScript는 2012년에 등장하여 컴파일 시간에 타입을 확인하는 새로운 시대를 연 했습니다.

TypeScript는 JavaScript의 하위 집합이므로 개발자들이 구현하기 쉬웠으며, 코드는 마침내 JavaScript로 컴파일되었습니다.

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

TypeScript에는 클래스와 같은 새로운 기능이 도입되었습니다. 이 기능은 2015년 JavaScript에 도입되었습니다.

또한 TypeScript에 추가된 열거형(enum)이라는 또 다른 기능이 있는데, 이 기능은 아직 JavaScript에 구현되지 않았습니다.

이것이 JavaScript에 왜 아직 구현되지 않았는지 궁금해지는 이유입니다.

# 열거형(enum)이란 무엇을 하는 것인가요?

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

열거형은 사용할 때 반드시 원본 개체를 참조해야하는 값을 정의하는 방법입니다.

```js
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const move = (direction: Direction) => {};

move(Direction.Up);
move(Direction.Down);
```

우리는 이들이 어떻게 작동하는지 배워보고, 어쩌면 왜 클래스처럼 JavaScript에 아직 추가되지 않았는지 알아봅시다.

# TypeScript의 열거형은 어떻게 작동하나요?

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

이전 예제를 가져와서 변환된 JavaScript 코드를 살펴보겠습니다.

열거형은 실행 중에 약간 예측할 수 없는 동작을 합니다.

다음과 같이 Direction 열거형이 있다고 가정해 봅시다.

```js
enum Direction {
  Up,
  Down,
}
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

기본적으로 Up의 값은 0이 되고 Down은 1이 됩니다. 자연스레 모두가 이 enum이 객체처럼 끝날 것이라고 생각할 것입니다.

```js
const Direction = {
  Up: 0,
  Down: 1,
};
```

그러나 JavaScript의 변환 코드를 살펴보면, 우리가 예상한 것과 약간 다른 복잡하고 심상치 않은 코드를 발견할 수 있습니다.

```js
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
})(Direction || (Direction = {}));
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

요런 객체가 나올 거에요. 예상했던 것과 매우 다르죠.

```javascript
const Direction = {
  Up: 0,
  0: "Up",
  Down: 1,
  1: "Down",
};
```

만약 Object.values(Direction)을 실행하면 ["Up, "Down", 0, 1]과 같은 결과를 얻게 됩니다. 이것은 예상치 못한 결과이며 제대로 된 객체가 아닙니다.

이것이 enum에 대해 짜증나는 첫 번째 점입니다. 기대에 맞게 동작하지 않는다는 것이죠.

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

문자열 열거형의 경우에는 적절한 객체가 생성됩니다.

```js
enum Direction  {
  UP = "Up",
  DOWN = "Down",
}

// 변환된 코드

"use strict";
var Direction;
(function (Direction) {
    Direction["UP"] = "Up";
    Direction["DOWN"] = "Down";
})(Direction || (Direction = {}));

// 적절한 JS 객체

const Direction = {
  "UP": "Up",
  "DOWN": "DOWN"
}
```

그럼에도 불구하고 이에는 문제가 있습니다. 이를 보여드릴게요.

어떤 함수에서 Direction 열거형 값을 액세스하려고 하는 경우를 가정해 봅시다.

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

열거형 Direction {
UP= "위",
DOWN = "아래",
}

함수 logDirection(direction: Direction) {
콘솔.로그(direction)
}

✅ 잘 작동합니다
logDirection(Direction.UP)

❌ 작동하지 않습니다 - 열거형의 멤버값으로 함수를 호출할 수 없습니다
logDirection("위")

logDirection 함수를 Direction의 멤버 값으로 호출할 수 없다는 것을 알 수 있습니다.
TypeScript를 보면 런타임 값보다는 이름에 신경을 쓴다는 저의 기대대로 동작합니다.

Direction.UP와 Up의 값은 동일하며 이상적으로 TypeScript는 신경 쓰지 않을 것으로 예상되지만 열거형의 경우 이 규칙이 깨집니다.

또한 const 열거형도 있으며 열거형을 사용하고 싶다면 유용할 수 있지만 주의할 점도 있습니다.

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
const enum Direction  {
  UP = "Up",
  DOWN = "Down",
}

// transpile code

"use strict";
// nothing
```

보면 알 수 있듯이 enum을 const로 만드는 즉시, transpile code가 없다는 것은 이 경우 TypeScript에서 처리되며 구현 세부 사항에 대해 끝 사용자를 혼동시키지 않습니다. 멋지죠 😎 하지만 다시 한 번 주의할 점이 있어요.

이를 사용해서 **왜 절대 사용해서는 안 되는지**에 대해 강조한 문서의 별도 섹션이 있습니다.

[여기](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls)를 참조해주세요.

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

# 열거형의 혼란을 해결하는 방법

열거형 대신 값을 수정하지 않을 객체와 함께 항상 as const를 사용해야 합니다.
빠르게 예시를 살펴보겠습니다.

```js
const Direction = {
  UP: "Up",
  DOWN: "Down"
} as const


type GetValues<T> = T[keyof T]

type UnionOfObjectValues = GetValues<typeof Direction>

function logDirection(direction: UnionOfObjectValues) {
  console.log(direction)
}

✅ 동작합니다
logDirection(Direction.UP)

✅ 또한 동작합니다
logDirection("Up")
```

이 방법은 TypeScript의 기대에 완벽히 부합하며 작동 방식을 이해하기 쉽게 만듭니다.

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

만약 더 쉽게 만들고 싶다면, 오브젝트 값 대신 Direction의 키에서 union을 유도할 수 있어요.

```js
const Direction = {
  UP: "Up",
  DOWN: "Down"
} as const

type Directions = keyof typeof Direction

function logDirection(direction: Directions) {
  console.log(`${Direction[direction]} is present`)
}

✅ 잘 작동해요
logDirection("UP")

✅ 잘 작동해요
logDirection("DOWN")
```

Matt Pocock와 Aaron이 이넘의 최악의 악몽을 설명하는 아주 좋은 비디오가 있어요. 이 비디오가 이 기사를 쓰게 된 동기가 되었죠.

# 결론

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

우리는 항상 enum을 사용하는 대신 간단한 객체와 어떤 종류의 매직을 사용해야 합니다. enum은 이해하기 쉽고 어떤 놀라움도 주지 않습니다.

TypeScript는 OOP를 더 중시하기 위해 enum을 도입했지만, 제 생각에 그것은 좋은 결정이 아니었습니다.
