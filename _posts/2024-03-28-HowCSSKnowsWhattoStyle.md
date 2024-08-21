---
title: "CSS가 어떤 스타일을 지정하는지 알아보는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "How CSS Knows What to Style"
link: "https://medium.com/@rashmipatil24/css-selectors-59db4d9a97aa"
isUpdated: true
---

## 셀렉터 사가

CSS가 어떤 요소를 어떻게 스타일링해야 하는지 알고 있을까요? 그것이 CSS 셀렉터가 나오는 곳입니다. 셀렉터가 어떻게 작동하는지 이해하는 것은 웹의 언어를 배우는 것과 같습니다. 이를 통해 디자인에 대한 완전히 새로운 수준의 제어가 가능해집니다. 이 블로그에서는 CSS 셀렉터의 기본에 대해 알아보겠습니다.

셀렉터:

CSS 셀렉터는 HTML 문서 내에서 하나 이상의 요소를 선택하고 스타일을 적용하는 데 사용되는 패턴입니다. 셀렉터는 태그 이름, 속성, 클래스, ID, 문서 트리 내 위치 또는 다른 요소와의 관계를 기반으로 요소를 대상으로 할 수 있습니다.

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

# 셀렉터 조합자:

콤비네이터(Combinators)는 보다 구체적인 대상 지정 규칙을 만들기 위해 셀렉터를 결합하는 데 사용되는 기호입니다. 이들은 HTML 문서 내의 서로 다른 요소 간의 관계를 정의하는 데 도움을 줍니다. 콤비네이터에는 공백(하위 셀렉터), 크게-더하기 기호(자식 셀렉터), 플러스 기호(인접 형제 셀렉터), 틸드(일반 형제 셀렉터)가 포함됩니다.

# 셀렉터 사용 방법:

셀렉터를 사용하려면, 단순히 셀렉터를 지정한 다음 중괄호{}로 둘러싼 원하는 스타일을 기술하는 CSS 규칙을 작성하면 됩니다.

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

![HowCSSKnowsWhattoStyle_0](/assets/img/HowCSSKnowsWhattoStyle_0.png)

# 선택자의 종류:

## 전체 선택자:

CSS에서 전체 선택자는 별표(\*)로 나타내며 어떤 요소 타입이든 일치합니다. 이는 웹 페이지에서 태그 이름, 속성, ID 또는 클래스에 관계없이 모든 요소를 선택합니다.

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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## 요소 선택자:

HTML 태그 이름을 기반으로 요소를 선택합니다.

```js
p {
    color: blue;
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

## 클래스 선택자:

특정 클래스 속성을 가진 요소를 대상으로합니다.

```js
.highlight {
    background-color: yellow;
}
```

## ID 선택자:

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

특정 ID 속성을 가진 요소를 대상으로합니다.

```js
#navbar {
font-size: 18px;
}
```

## 속성 선택자:

속성에 따라 요소를 대상으로합니다.

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

```css
input[type="text"] {
  border: 1px solid #ccc;
}
```

## 가상 클래스:

요소의 상태나 위치에 따라 대상 요소를 선택합니다.

```css
a:hover {
  color: red;
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

## 가상 요소:

요소의 특정 부분을 대상으로합니다.

```js
p::first-line {
font-weight: bold;
}
```

## 하위 선택자:

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

다른 지정된 요소의 하위 요소를 대상으로합니다.

```js
div p {
margin-bottom: 10px;
}
```

## 자식 선택자:

다른 지정된 요소의 직계 자식 요소를 대상으로합니다.

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
ul > li {
list-style-type: square;
}
```

## 인접 형제 선택자:

지정된 요소 바로 앞에 오는 요소를 대상으로합니다.

```js
h2 + p {
font-style: italic;
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

## 일반 형제 선택자:

다른 지정된 요소의 형제 요소를 대상으로합니다.

```js
h3 ~ p {
color: green;
}
```

# 피해야 할 흔한 실수:

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

- 페이지 내에서 ID는 고유해야 합니다. 이로 인해 클래스보다 재사용성이 낮아집니다. ID를 오용하면 특정성 문제가 발생할 수 있고 CSS를 유지 관리하기 어려워질 수 있습니다.
- 인라인 스타일은 편리할 수 있지만 HTML을 혼란스럽게 만들고 웹사이트 전반적인 일관된 스타일 유지 보수를 어렵게 할 수 있습니다. 더 나은 조직화와 유지 보수성을 위해 외부 CSS 파일을 사용하는 것을 고려해보세요.

# 팁 & 요령:

- 의도치 않은 스타일 덮어쓰기를 피하려면 필요에 따라 선택기를 구체적으로 작성하세요.
- 가능한 경우 약식 속성을 사용하여 CSS 코드를 간소화하고 가독성을 개선하세요.
- 관련된 선택기를 함께 그룹화하여 CSS 코드를 구성하고 유지 보수성을 향상시키세요.
- 브라우저 개발자 도구를 사용하여 CSS를 검사하고 디버그하여 스타일링 문제를 식별하고 해결하는 것을 쉽게 해보세요.

기본 원리를 파악했으니 이제 색상 변경, 요소 크기 조정 또는 애니메이션 추가를 원한다면 CSS 선택기를 활용하세요. CSS 선택기는 처음에는 복잡해 보일 수 있지만 조금의 연습으로 숙련된 사용자가 될 수 있습니다. 그러니 실험해보고 창의성을 발휘해보세요!

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

웹 개발의 멋진 세계에 대한 더 많은 통찰력을 기대해 주세요. 즐거운 코딩 하세요!
