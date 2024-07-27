---
title: "CSS 선택자에서 , , 및  기호의 사용 방법 이해하기"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_0.png"
date: 2024-07-09 18:53
ogImage:
  url: /assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_0.png
tag: Tech
originalTitle: "Understanding use of the +, >, and ~ symbols in CSS selectors"
link: "https://medium.com/gitconnected/understanding-use-of-the-and-symbols-in-css-selectors-95552eb436f5"
---

![CSS Selector](/ui-log-2/assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_0.png)

CSS 선택자는 하나 이상의 간단한 선택자를 포함할 수 있습니다. 간단한 선택자 사이에는 결합자를 포함할 수 있습니다.

CSS에는 네 가지 다른 결합자가 있습니다:

- 하위 선택자 (공백)
- 자식 선택자 (>)
- 인접 형제 선택자 (+)
- 일반 형제 선택자 (~)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

서로 다른 기호(+, `,와 ~)를 CSS 선택기에서 어떻게 사용하고 그 차이를 살펴봅시다.

먼저 예시 HTML을 살펴봅시다.

```js
<div class="container">
  <p>Apple</p>
  <div>
    <p>An apple a day keeps doctor away!</p>
  </div>
  <p>Banana</p>
  <p>Cherry</p>
</div>
```

## 1. 공백

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

CSS에서 가장 일반적으로 사용되는 선택자 중 하나입니다.

```js
div.container p {
 font-size: 20px;
}
```

위 코드에서 볼 수 있듯이 div.container와 p 사이에 공백이 있습니다. 이는 후손 선택자라고 불립니다. 이를 사용하면 컨테이너 div 내부의 모든 `p` 태그가 대상이 됩니다. 즉, 어떤 깊이에서든 #container의 자식인 모든 `p` 요소를 대상으로 합니다.

## 2. ‘`’ 기호

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

이것은 자식 선택기라고 합니다. CSS 규칙은 특정 요소의 직계 자식인 요소에 적용됩니다.

```js
div.container > p {
  border-bottom: 1px dashed black;
}
```

<img src="/ui-log-2/assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_1.png" />

이 규칙은 container `div`의 직계 자식인 모든 `p` 태그를 대상으로 하며, 자식의 자식은 선택되지 않습니다. (빨간 점으로 표시된 것처럼 초록 점으로 HTML 이미지에서 나타납니다)

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

## 3. '+' 기호

이것은 인접 형제 선택기입니다. 지정된 요소의 모든 인접 형제 요소를 선택합니다.

형제 요소는 동일한 부모 요소를 가져야하며 "인접"은 "바로 다음에 따르는"를 의미합니다.

```js
div + p {
  background-color: yellow;
}
```

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

![Understanding use of the ~ and symbols in CSS selectors](/ui-log-2/assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_2.png)

In our example, it will target Banana only because the `p` tag comes just after the `div` tag.

## 4. The ‘~’ Symbol

It is General Sibling Selector and similar to Adjacent Sibling Selector. It selects all next elements that are siblings of a specified element.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

다음 예제는 `div` 요소의 형제인 모든 다음 `p` 요소를 선택합니다.

```js
div ~ p {
  background-color: yellow;
}
```

<img src="/ui-log-2/assets/img/2024-07-09-UnderstandinguseoftheandsymbolsinCSSselectors_3.png" />

이 코드는 Banana와 Cherry의 `p` 요소를 대상으로합니다.

<!-- ui-log 수평형 -->

<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-4877378276818686"
  data-ad-slot="9743150776"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>

  <script>
  (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

CSS 조합자에 대한 이 간단한 복습이 마음에 들었으면 좋겠어요.

제 글이 마음에 든다면, 커피는 저를 움직이게 해요. 한 잔 사주세요! :P

- Aniket Kudale
