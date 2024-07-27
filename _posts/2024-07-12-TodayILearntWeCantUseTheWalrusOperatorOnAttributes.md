---
title: "오늘 배운 사실  왜 속성에 바다코끼리 연산자를 사용할 수 없을까"
description: ""
coverImage: "/TIL/assets/img/2024-07-12-TodayILearntWeCantUseTheWalrusOperatorOnAttributes_0.png"
date: 2024-07-12 19:35
ogImage: 
  url: /TIL/assets/img/2024-07-12-TodayILearntWeCantUseTheWalrusOperatorOnAttributes_0.png
tag: Tech
originalTitle: "Today I Learnt — We Can’t Use The Walrus Operator On Attributes??"
link: "https://medium.com/@zlliu/today-i-learnt-we-cant-use-the-walrus-operator-on-attributes-4ed7af348d66"
---



![Example of the walrus operator](/TIL/assets/img/2024-07-12-TodayILearntWeCantUseTheWalrusOperatorOnAttributes_0.png)

The walrus operator := can condense 2 lines of code into one.

```javascript
// without walrus operator

let x = 'apple';
if (x == 'apple') {
    console.log('ok');
}
```

```javascript
// with walrus operator

if ((x := 'apple') === 'apple') {
    console.log('ok');
}
```


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

(x := `apple`)라는 구문에서 2가지 작업이 발생합니다:

- x가 `apple`에 할당됩니다.
- (x := `apple`) 자체가 `apple` 값을 반환합니다.

# 배악 체이너와 속성

하지만 객체 속성으로 이 작업을 시도할 때 오류가 발생합니다.

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

```js
class Dog:
    pass

dog = Dog()

if (dog.age = 5) == 5:
    print('ok')

# SyntaxError: cannot use assignment expressions with attribute
```

그래서 우리는 dog.age와 같은 속성에 월러스 연산자 :=을 사용할 수 없다는 것을 알 수 있습니다. 저에게는 좀 이상한 것 같네요.

그렇다면 어떻게 한 줄의 코드로 여전히 동일한 효과를 얻을 수 있을까요?

# 해결책

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

먼저 속성을 설정하는 방법에 대해 알아봅시다

```js
dog.name = 'rocky'
```

```js
# 위와 동일합니다
setattr(dog, 'name', 'rocky')

# setattr()은 None을 반환합니다
```

다음으로 x 또는 `hello` 구문을 살펴보겠습니다

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

```js
# x은 Truthy 값입니다. 예: 5, 'apple'

x = 'apple'
y = x 또는 'hello'

print(y)  # apple
```

```js
# x은 Falsy 값입니다. 예: None, 0, ''

x = None
y = x 또는 'hello'

print(y)  # hello
```

^ x 또는 `hello`에서:

- x가 Truthy 값이면, 이 식은 x의 원래 값 반환
- x가 Falsy 값이면, 이 식은 `hello`를 반환합니다.

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

여기서 이점을 취할 수 있어요:

```js
# 우리가 이루려고 하는 것 (이건 불법입니다)

if (dog.name := 'rocky') == 'rocky':
    # 작업
```

```js
# 우리의 해결책

if (setattr(dog, 'name', 'rocky') or 'rocky') == 'rocky':
    # 작업
```

# 결론

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

이 건은 하나의 줄로 코드를 작성하길 원하는 경우에만 필요합니다. 그게 아니라면 2줄로 작성하세요.

참고 - 프로덕션 코드에서는 사용하지 마세요

# 만약 제가 크리에이터로서를 지원하길 원한다면

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

- 제 책을 구매해주세요! — 파이썬에 대해 전혀 몰랐던 101가지 이야기
- 찾을 수 있는 곳: [여기를 클릭해주세요](https://payhip.com/b/vywcf)
- 이 이야기를 칭찬해주세요. 50번!
- 자신의 생각을 남겨주세요.
- 이야기 중에서 가장 마음에 드는 부분을 강조해주세요.

감사합니다! 이런 작은 행동들이 큰 변화를 만듭니다. 정말 감사드립니다!

YouTube: [여기를 클릭해주세요](https://www.youtube.com/@zlliu246)

LinkedIn: [여기를 클릭해주세요](https://www.linkedin.com/in/zlliu/)