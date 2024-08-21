---
title: "CSS에서 rgba 대신 color-mix를 사용해야하는 이유"
description: ""
coverImage: "/assets/img/2024-05-27-CSSGame-ChangerDitchrgbaforcolor-mix_0.png"
date: 2024-05-27 18:44
ogImage:
  url: /assets/img/2024-05-27-CSSGame-ChangerDitchrgbaforcolor-mix_0.png
tag: Tech
originalTitle: "CSS Game-Changer: Ditch rgba() for color-mix()"
link: "https://medium.com/@nico.maitre.stair/css-game-changer-ditch-rgba-for-color-mix-555b2f758830"
isUpdated: true
---

아, 당신은 Sass 변수에서 CSS 변수의 반짝이는 세계로 전환한 것인가요? 그런데 rgba() 함수를 사용하는 데 어려움을 겪고 있나요? 걱정 마세요, 혼자가 아니에요!

![image](/assets/img/2024-05-27-CSSGame-ChangerDitchrgbaforcolor-mix_0.png)

제가 아는 것처럼, 한 때 당신이 이렇게 Sass 변수에 의존했던 것처럼 말이에요:

```js
$primary: #00ccff;
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

이제 CSS 변수의 힘을 받았군요:

```js
:root {
  --primary : #00ccff;
}
```

문제는 Sass를 통해 rgba() 마법을 번역하려는 것입니다:

```js
background-color: rgba($color: $primary, $alpha: 0.6);
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

```js
/* 안돼요, 이건 작동 안 돼요! */
배경색 : rgba($color: var(--primary), $alpha: 0.6);
```

허무하죠? 그렇죠? 그럴 준비를 하세요. 왜냐하면 color-mix()가 여러분을 구할 거예요!

## 기다려봐... color-mix()는 지원돼요?

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

짧은 대답은 단언컨대 YES입니다! 모던 브라우저(일부 이전 버전 제외)가 모두 지원하고 있습니다. MDN 웹 문서와 caniuse.com에서 지원 세부 정보를 확인해보세요.

![Image 1](/assets/img/2024-05-27-CSSGame-ChangerDitchrgbaforcolor-mix_1.png)

![Image 2](/assets/img/2024-05-27-CSSGame-ChangerDitchrgbaforcolor-mix_2.png)

## 시간이 바꾸는 시간입니다!

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

color-mix()를 사용하여 rgba()로 익숙한 투명 효과를 복제하는 방법을 살펴보겠습니다.

다음과 같이 작성하던 방식을 이제 안녕하세요라고 말해보세요:

```js
background-color: rgba($color: $primary, $alpha: 0.6);
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

```js
background-color: color-mix(in srgb, var(--primary) 60%, transparent);
```

여기에 대한 설명:

- in srgb: 색 공간을 지정합니다 (sRGB는 웹의 표준입니다).
- var(--primary): 신뢰할 수 있는 CSS 변수가 섞는 첫 번째 색상입니다.
- 60%: 이는 혼합물에서 --primary 색상의 백분율을 설정합니다 (알파값 0.6과 동등합니다).
- transparent: 혼합하는 두 번째 색상입니다 (이것이 투명 효과를 만듭니다).

## color-mix()가 좋은 이유

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

- 직관적: 퍼센트 기반 접근 방식으로 투명도 수준을 시각화하는 것이 더 쉬워집니다.
- 유연: 색상이 아닌 투명도가 있는 색 뿐만 아니라 어떤 두 가지 색도 섞어 사용할 수 있습니다.
- 강력: 간단한 투명도 이외의 창의적인 색상 혼합 가능성을 열어줍니다.

## 한 번 시도해 보세요!

앞으로 나가서 color-mix()를 실험해보세요. 퍼센트를 조정하고 다양한 색상 조합을 시도해보고 어떤 놀라운 결과를 얻을 수 있는지 확인해보세요. 즐거운 스타일링 되세요!
