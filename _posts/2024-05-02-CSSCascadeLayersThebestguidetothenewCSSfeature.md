---
title: "CSS 캐스케이드 레이어: 새로운 CSS 기능에 대한 가이드(2024년)"
description: ""
coverImage: "/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_0.png"
date: 2024-05-02 00:05
ogImage:
  url: /assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_0.png
tag: Tech
originalTitle: "CSS Cascade Layers: The best guide to the new CSS feature"
link: "https://medium.com/javascript-in-plain-english/css-cascade-layers-the-best-guide-to-the-new-css-feature-8886a4183b4f"
isUpdated: true
---

![sandwich](/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_0.png)

샌드위치를 상상해보세요. 샌드위치는 여러 가지 재료가 서로 층을 이루듯 쌓여져 있습니다. 상추, 토마토, 패티, 소스, 치즈. 각 재료는 전체 샌드위치에 중요하며 추가될 때마다 그 맛이 달라집니다. 맨 위에 추가된 재료의 우선순위가 다른 모든 재료를 압도합니다. 따라서 샌드위치를 섭취하는 경우 치즈, 소스, 패티, 토마토, 그리고 상추의 맛을 느낄 것입니다.

CSS 캐스케이드 레이어도 마찬가지입니다. 각 CSS 레이어에는 요소 선택기에 적용되는 특정한 명시도가 있습니다. 특정 레이어가 특정 레이어 뒤에 나타날 경우, 이전 요소의 선택기보다 더 높은 명시도를 가진 동일한 요소에 대해서도 이전 레이어의 명시도를 무시합니다. 3개의 레이어가 있는 경우 어떤 CSS 스타일이 적용될지 이해하기 위해 아래 다이어그램을 살펴보세요.

![CSS Cascade Layers](/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_1.png)

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

위의 이미지에서, 3개의 층이 서로 겹쳐져 있습니다. 첫 번째 층은 Layer 1이 처음에 나타나고, Layer 3은 가장 아래에 나타납니다. 샌드위치 비유에 따르면, Layer 1은 샌드위치의 밑바닥(상추)에 있고, Layer 3은 위쪽(치즈)에 있습니다. 여기서 div 요소에 대한 고도의 선택자를 가지고 있는 Layer 1과 Layer 2도 있지만, 적용되는 최종 스타일은 Layer 3의 것입니다. 이것은 카스케이딩의 원리에 따라 작동합니다.

CSS 레이어는 CSS 파일에서 @layer를 사용하여 정의할 수 있습니다. 단일 파일 내에서 여러 개의 카스케이드 레이어가 있는 경우, @layer를 사용하여 레이어 우선 순위 순서를 정의할 수 있습니다. 즉, base, utilities, component의 우선 순위 순서를 정의하는 것입니다. 이것은 base가 가장 낮은 우선 순위를 가지고 component가 가장 높은 우선 순위를 가진다는 것을 말합니다. HTML 요소에 적용되는 스타일의 순서는 먼저 base, 그 다음에 utilities, 마지막으로 component입니다. 아래 코드를 확인해보세요:

HTML

```js
<p class="alert">좀비에 주의하세요</p>
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

CSS

```js
@layer base, utilities;

@layer utilities {
  .alert {
    background-color: brown;
  }
  p {
    border: medium solid limegreen;
  }
}

@layer base {
  .alert {
    border: medium solid violet;
    background-color: yellow;
    color: white;
  }
}
```

결과

<img src="/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_2.png" />

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

위의 코드에서 우리는 우선순위 순서가 명확히 정의되어 있음을 볼 수 있습니다. 가장 높은 우선순위는 유틸리티에게 주어지며, 첫 번째 줄의 레이어 목록에서 맨 뒤에 나타납니다. 그 다음으로 스타일은 아래 형식을 사용하여 레이어 내에 정의할 수 있습니다:

```js
@layer LAYER_NAME {
// 여기에 스타일 규칙을 작성하세요
}

@layer LAYER_NAME {
// 여기에 스타일 규칙을 작성하세요
}
```

레이어는 개발자가 파일 맨 위에 요소에 레이어가 적용되어야 하는 우선순위를 이미 정의했기 때문에 임의의 순서로 정의할 수 있습니다.

계층 내의 스타일 규칙은 함께 적용됩니다. 이것은 CSS에서 캐스케이딩에 대해 더 세부적인 제어를 개발자에게 제공합니다.

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

## 익명 캐스케이드 레이어

레이어 외에 있는 모든 스타일 규칙은 익명 레이어로 묶이고 이 익명 레이어는 모든 정의된 레이어보다 높은 우선순위를 갖습니다. 예를 들어 아래와 같이 구성할 수 있습니다.

```css
@layer utilities {
  .alert {
    background-color: brown;
  }
  p {
    border: medium solid limegreen;
  }
}

@layer base {
  .alert {
    border: medium solid violet;
    background-color: yellow;
    color: white;
  }
}

.alert {
  background-color: red;
}
```

위의 경우, 출력 결과는 아래와 같습니다:

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

\[이미지\]\(/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_3.png\)

한 번 레이어 순서가 정해지면 특이성과 나타나는 순서는 무시됩니다. CSS 캐스케이드 레이어의 이 기능을 통해 개발자들은 더 간단한 선택자를 만들 수 있습니다. 더 이상 특이성을 무효화해야 하는 곳에 해킹이나 치트를 찾을 필요가 없어졌습니다.

익명 캐스케이드 레이어는 레이어를 만들되 이름을 할당하지 않음으로써 만들 수 있습니다:

```js
@layer {
  p {
    margin-block: 1rem;
  }
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

## 스타일 규칙을 레이어로 가져오기

개발자들은 다른 CSS 모듈 파일을 가져와서 레이어에 할당할 수 있습니다. 예를 들어,

```js
@import "theme.css" layer(utilities);
```

위 예시에서 theme.css 파일의 내용이나 스타일 규칙이 utilities 레이어에 할당됩니다.

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

## 중첩 레이어

레이어는 아래 형식을 사용하여 중첩될 수 있습니다:

```js
@layer framework {
  @layer layout {
  }
}
```

새로운 스타일 규칙은 다음 형식을 사용하여 레이아웃 레이어에 추가할 수 있습니다. 즉, 부모 레이어와 자식 레이어 사이에 . 을 추가하는 것입니다:

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
@layer framework.layout {
  p {
    margin-block: 1rem;
  }
}
```

## 브라우저 호환성

@layer와 이 기능의 브라우저 호환성이 매우 뛰어나며 요즘에는 널리 사용됩니다.

![이미지](/assets/img/2024-05-02-CSSCascadeLayersThebestguidetothenewCSSfeature_4.png)

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

이 기사가 도움이 되었으면 좋겣아. 이 기사를 CSS 친구들이나 웹 개발에 관심 있는 친구들과 공유해 주시면 감사하겠어요. 제 Medium 블로그를 구독하고 이 기사를 좋아요를 눌러주세요. @layer의 사용 사례를 댓글 섹션에 언급해 주세요.

# 간단하게 설명 🚀

In Plain English 커뮤니티의 일원이 되어 주셔서 감사합니다! 떠나시기 전에:

- 반드시 박수를 치고 작가를 팔로우해 주세요 ️👏️️
- 우리를 팔로우하세요: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼에서 저희를 방문해보세요: Stackademic | CoFeed | Venture | Cubed
- PlainEnglish.io에서 더 많은 콘텐츠를 확인하세요
