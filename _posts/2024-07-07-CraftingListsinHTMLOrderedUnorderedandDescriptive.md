---
title: "HTML에서 리스트 만드는 방법 순서 목록, 비순서 목록, 설명 목록"
description: ""
coverImage: "/assets/img/2024-07-07-CraftingListsinHTMLOrderedUnorderedandDescriptive_0.png"
date: 2024-07-07 21:27
ogImage:
  url: /assets/img/2024-07-07-CraftingListsinHTMLOrderedUnorderedandDescriptive_0.png
tag: Tech
originalTitle: "Crafting Lists in HTML: Ordered, Unordered, and Descriptive"
link: "https://medium.com/@aliccagatay/crafting-lists-in-html-ordered-unordered-and-descriptive-a8e8f31b8c81"
isUpdated: true
---

![Crafting Lists in HTML: Ordered, Unordered, and Descriptive](/assets/img/2024-07-07-CraftingListsinHTMLOrderedUnorderedandDescriptive_0.png)

맑고 푸른 바다 끝에 선 듯한 상상을 해 보세요. 태양은 건드려지지 않은 모래 위에 황금빛을 쏟아내면서, 걱정거리가 각종 파도와 함께 사라집니다. 이 이상적인 상상은 잘 된 휴가의 매력을 요약한 것입니다. 이것은 일상에서 벗어나 강조된 상상에 대한 벗방입니다. 그렇지만 환상에서 현실로의 여정은 비행기 표를 예약하고 호텔 객실을 예약하고 여행용품 목록을 작성하는 등 여러 세부사항이 관련되어 있습니다. 지루해 보일 수도 있지만, 여행용품 목록을 만드는 것은 여행이 순조롭게 진행되게 할 수 있는 정교한 과정입니다. 이것은 여행 계획의 필수 요소로, 기대와 경험 사이의 간극을 메꾸기 위한 것입니다. 항목을 나열하는 것 이상을 포함하며 여행지, 계획된 활동 및 잠재적인 예상치 않은 모험에 따라 필수품목을 선별해야 합니다.

정리된 여행용품 목록이 순조로운 여행 경험을 위한 중요한 요소인 것처럼, HTML 목록은 인터넷 넓은 바다에서 정보를 구조화하는 데 필수적인 도구입니다. 이것은 웹 콘텐츠의 기반이며, 제작자들이 데이터를 조직적이고 접근 가능한 방식으로 배열할 수 있게 합니다. 식료품 목록의 단순함부터 웹사이트 내비게이션 메뉴의 복잡함까지, HTML 목록은 혼돈 속에 질서를 가져옵니다.

# HTML 목록 이해하기

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

HTML 및 웹 개발의 광활하고 끊임없이 발전하는 세계에서 목록은 가장 일반적으로 사용되는 요소 중 하나입니다. 그들은 웹 페이지 정보를 구조화하고 정리하는 데 중요한 역할을 합니다. 목록은 직관적인 내비게이션 메뉴를 만들어 웹 사이트를 안내하거나 콘텐츠를 쉽게 소화할 수 있는 형식으로 제시하는 등 다양한 응용 프로그램에서 중요합니다. 그들의 다양성과 사용자 친화성은 웹 개발자에게 필수적인 도구로 만듭니다.

HTML에서의 목록은 웹 페이지의 접근성과 검색 엔진 최적화(SEO)를 향상시키는 데 중요한 역할을 합니다. 접근성 측면에서 목록은 스크린 리더가 사용자에게 풍부한 맥락 정보를 제공할 수 있게 해주어 목록의 항목 수 및 콘텐츠를 간편하게 탐색할 수 있습니다. 이러한 기능은 다양한 능력을 가진 사람들을 위한 사용자 경험을 향상시켜 웹 사이트를 더 포괄적으로 만들 수 있습니다. SEO 측면에서는 검색 엔진이 목록 구조를 사용하여 웹 페이지 콘텐츠를 더 잘 이해하고 색인화하며 분류합니다. 이는 검색 결과에서 사이트의 순위를 높여 웹 가시성을 향상시키고 사이트로의 트래픽을 더 많이 유도할 수 있는 중요한 요소입니다. 따라서 HTML 목록의 적절한 이해와 사용은 콘텐츠를 긍정적으로 영향을 미치게 하여 사용자 친화성이 뛰어나고 검색 엔진에서 쉽게 발견되게 할 수 있습니다. 이는 사용자 참여와 웹 사이트 또는 웹 애플리케이션의 광범위한 영향력 및 효과를 향상시킬 수 있습니다.

HTML에서는 목록을 효과적으로 구성하고 제시하는 데 사용되는 세 가지 주요 목록 유형이 있습니다. 이는 `ol` 태그로 표시되는 순서 있는 목록, `ul` 태그로 표시되는 순서 없는 목록, 그리고 `dl` 태그로 표시되는 설명 목록입니다. 각 목록 유형은 독특한 기능을 제공하며 적절한 사용은 웹 페이지의 사용자 경험과 접근성을 크게 향상시킬 수 있습니다.

## 순서 없는 목록(`ul`)

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

HTML 목록을 나타내는 `ul` 태그는 등장 순서가 중요하지 않은 항목을 그룹화하는 데 사용되는 기본 구성 요소입니다. 이러한 목록은 다양한 웹 구성 요소에서 사용되며, 네비게이션 메뉴나 전자 상거래 사이트의 항목 목록과 같은 형태로 표시됩니다. 기본 구문은 `li` 태그로 표시된 개별 목록 항목을 `ul` 요소 내에 포함하는 것입니다. 예를 들어, 네비게이션 메뉴는 보통 순서가 없는 목록으로 표시되며, 각 메뉴 항목은 목록 요소로 나타납니다. 이를 통해 순서에 관계없이 옵션을 명확하고 정리된 방식으로 표시할 수 있습니다. 비슷하게, 전자 상거래 웹 사이트에서는 제품 특징이나 카테고리를 목록형식으로 나열하여 쇼핑객에게 깔끔하고 접근성이 좋은 형식으로 제공할 수 있습니다. 이 구조는 정보를 이해하기 쉬운 레이아웃으로 제시함으로써 사용자 경험을 향상시키며, 쇼핑의 목적에 맞게 설계된 순서가 없는 목록의 주요 장점을 강조합니다.

아래에는 네비게이션 메뉴를 만들거나 전자 상거래 환경에서 항목을 나열하는 두 가지 일반적인 시나리오에서 `ul`을 사용하는 HTML 코드 예제가 있습니다.

**네비게이션 메뉴:**

```js
<h2>Navigation Menu</h2>
<ul>
  <li><a href="#home">Home</a></li>
  <li><a href="#services">Services</a></li>
  <li><a href="#about">About Us</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
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

제품 특징:

```js
## 제품 특징

- 50m 수준의 방수 기능
- 검정, 파랑, 빨강, 녹색 총 네 가지 색상으로 구매 가능
- 2년 보증 포함
- 내구성 있는 유리 표면 제공
```

## 순서 있는 목록(`ol`)

HTML의 순서 있는 목록은 `ol` 태그로 표시되며, 순차적으로 항목을 나열하여 의미 있는 진행을 전달하는 데 사용됩니다. 이 목록은 요리 레시피와 같이 순서가 지정된 단계를 따라야 하는 경우나 상위 열 명 차트 같은 순위가 매겨진 목록에서 주로 유용합니다.

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

순서가 지정된 목록의 기본 구조는 `ol` 태그를 사용하여 각각의 목록 항목을 `li` 태그로 묶는 것입니다. 아래는 기본 구문의 예시입니다:

```js
<ol>
  <li>첫 번째 항목</li>
  <li>두 번째 항목</li>
</ol>
```

순서가 지정된 목록의 시작점을 조정하려면 start 속성을 사용합니다. 이 속성은 목록이 시작하는 숫자를 변경합니다. 예를 들어, start="5"로 설정하면 목록이 5부터 세기 시작합니다.

```js
<ol start="5">
  <li>다섯 번째 항목</li>
  <li>여섯 번째 항목</li>
</ol>
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

보다 복잡한 데이터 표현을 위해 순서가 지정된 목록과 무순서 목록을 서로 중첩시킬 수 있습니다. 이는 주로 법적이거나 기술적 명세와 같이 상세한 문서에 유용합니다. 여기서 섹션 별로 순서가 필요하고 각 섹션 아래의 하위 항목이 우선순위가 없는 목록으로 제시하는 것이 가장 적절한 경우입니다. 순서가 지정된 요소와 무순서 요소를 혼합한 중첩 목록의 모습은 아래와 같습니다:

```js
1. 준비물 확인
   - 밀가루
   - 설탕
   - 계란
2. 재료 섞기
3. 350도에서 20분 동안 굽기
```

이 구조는 내용을 명확하고 계층적으로 전달하며 가독성과 조직성을 향상시키는 데 중요합니다.

## 설명 목록(`dl`)

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

HTML 설명 목록은 용어를 정의에 맞게 연결하여 관련 항목 및 설명을 표시하는 데 완벽하며, 주로 용어집, 기사 요약, 제품 기능 및 FAQ와 같이 명확하고 조직적인 데이터 표현이 중요한 경우에 유용합니다.

설명 목록의 기본 구문에는 일련의 `dt` (정의 용어) 및 `dd` (정의 설명) 요소를 포함한 `dl` 태그를 사용합니다. `dt` 태그는 정의되는 용어를 나타내고, `dd` 태그는 해당 용어의 설명 또는 정의를 제공합니다. 아래에는 이러한 태그를 사용하는 간단한 예제가 나와 있습니다:

```js
<dl>
  <dt>HTML</dt>
  <dd>웹 페이지를 만드는 데 사용되는 표준 마크업 언어인 하이퍼텍스트 마크업 언어</dd>
  <dt>CSS</dt>
  <dd>HTML로 작성된 문서의 표현을 설명하는 스타일시트 언어인 캐스케이딩 스타일 시트</dd>
</dl>
```

설명 목록은 웹 페이지 커뮤니케이션을 향상시키는 다양한 응용 프로그램을 제공합니다. 예를 들어, 각 전문 용어가 해당 정의와 함께 매칭되어 기술적이거나 특수화된 어휘가 사용자에게 접근 가능하게 만들어지는 용어집에 이상적입니다. 기사 요약의 맥락에서 설명 목록은 주요 요점을 세부적인 설명과 함께 체계적으로 조직하여 독자에게 간결하고 빠른 개요를 제공합니다. 게다가 제품 설명에서는 기능을 명시하고 명료하게 설명하여 정보를 쉽게 탐색하고 이해할 수 있도록 합니다. 이 레이아웃은 정보가 쉽게 탐색 및 이해되도록 보장하여 데이터의 조직적 및 접근 가능한 프레젠테이션을 유지함으로써 사용자 경험을 크게 향상시킵니다. 이러한 예는 설명 목록의 다양한 콘텐츠 설정에서의 다양성과 효과성을 강조합니다.

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

# 고급 목록 기술

HTML 목록 작성에 대한 고급 기술은 기본적인 서식 설정을 넘어서 접근성, 반응형 디자인 및 SEO(검색 엔진 최적화) 관련 최상의 실천법을 포함합니다. 이를 통해 목록이 시각적으로 더 매력적이며 다양한 기기 및 사용자 요구에 대해 기능적으로 작동하도록 보장합니다.

## 접근성 고려 사항

웹 콘텐츠를 디자인할 때 접근성을 우선시하는 것이 중요합니다. 이는 스크린 리더와 같은 보조 기술을 사용하는 사용자도 목록을 효과적으로 탐색하고 이해할 수 있도록 보장합니다. 목록 접근성을 위한 주요 사항은 올바른 HTML 태그 사용입니다. `ul`, `ol`, 및 `dl` 태그를 사용하면 목록 구조를 명확히 정의해 보조 기술이 쉽게 해석할 수 있습니다. 이러한 태그는 목록의 유형을 나타내는 것뿐만 아니라 논리적인 읽기 순서를 유지하는 데도 도움이 됩니다. 더 나아가 접근성을 강화하기 위해 개발자는 ARIA (접근성 향상된 리치 인터넷 애플리케이션) 속성을 활용해야 합니다. 예를 들어, aria-labelledby를 사용하면 목록 항목을 페이지 다른 곳에 있는 설명 텍스트와 연결하여 맥락을 제공하고 이해를 개선할 수 있습니다. 마찬가지로 role="list" 및 role="listitem"을 설정하면 사용자 지정 스타일이 적용된 목록도 스크린 리더에서 목록으로 인식됩니다. 상호작용 가능한 목록의 포커스 상태를 관리하는 것도 중요합니다. 키보드 사용자가 목록 항목을 쉽게 탐색할 수 있도록 하는 것이죠. 이러한 실천법을 적용함으로써 개발자는 목록을 보다 접근성 있게 만들어 모든 사용자가 정보를 쉽게 탐색하고 이해할 수 있는 포용적인 웹 환경을 조성할 수 있습니다.

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

예를 들어:

```js
<body>
  <h2 id="shoppingHeader">쇼핑 목록</h2>
  <!-- ul 요소는 보조 기술에서 목록으로 명확히 표시됩니다 -->
  <ul aria-labelledby="shoppingHeader" role="list">
    <!-- 각 목록 항목은 목록의 일부로 인식되도록 role="listitem"을 가지고 있습니다 -->
    <li role="listitem">우유</li>
    <li role="listitem">계란</li>
    <li role="listitem">빵</li>
    <li role="listitem">버터</li>
  </ul>

  <h2 id="stepsHeader">레시피 단계</h2>
  <!-- ARIA 역할 및 속성이 지정된 순서 목록 -->
  <ol aria-labelledby="stepsHeader" role="list">
    <li role="listitem">그릇에 모든 재료를 섞어주세요.</li>
    <li role="listitem">혼합물을 베이킹 팬에 부어주세요.</li>
    <li role="listitem">350도에서 20분간 구워주세요.</li>
  </ol>
</body>
```

## 반응형 디자인 고려 사항

현대 웹 개발에서 반응형 디자인은 다양한 화면 크기를 가진 다양한 디바이스에서 콘텐츠, 예를 들어 목록들을 접근 가능하고 가독성 있게 만드는 데 중요합니다. 반응형으로 목록을 디자인하기 위해서는 특정 스타일이나 스크립트에 의존하지 않고 다양한 화면 크기에 맞춰 구조와 레이아웃의 적응성에 초점을 맞춰야 합니다. 예를 들어, 모바일 기기에서 한 열로 표시되는 목록은 데스크톱에서 공간을 효율적으로 사용하고 가독성을 향상시키기 위해 여러 열로 재구성될 수 있습니다. 또한 목록 항목 간의 간격과 터치 스크린에서의 사용자 친화적 상호작용을 위해 클릭 영역의 크기도 중요합니다. 목록을 다양한 환경에서 테스트하여 장치에 관계 없이 적절하게 확장되어 기능을 유지하고 사용자 경험을 원활하게 제공하는 것이 필요합니다. 이 반응형 디자인 접근 방식은 CSS 또는 JavaScript의 복잡성에 빠지는 대신 기본적인 레이아웃 및 구조적 적응성에 중점을 두며 적응성과 사용자 경험을 우선시합니다.

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

예를 들어, 다음은 기본 HTML 코드 예제입니다. 이 예제는 기본 HTML 요소와 뷰포트 메타 태그만을 사용하여 반응형 목록을 생성하며, 콘텐츠가 다양한 기기에서 잘 적응되도록 보장합니다:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive List Example</title>
  </head>

  <body>
    <h1>Task List</h1>
    <ul>
      <li>Check emails</li>
      <li>Attend team meeting</li>
      <li>Complete project report</li>
      <li>Call supplier</li>
      <li>Prepare presentation</li>
    </ul>
  </body>
</html>
```

## SEO 최선의 실천 방법

HTML에서 목록을 효과적으로 활용하면 웹사이트의 SEO를 크게 향상시킬 수 있습니다. 목록을 적절하게 활용하면 검색 엔진이 쉽게 해석하고 색인화할 수 있는 명확하고 구조화된 콘텐츠가 제공됩니다. `ul`은 정렬되지 않은 목록, `ol`은 정렬된 목록, `dl`은 정의 목록과 같은 적절한 목록 구조를 활용하면 콘텐츠 계층 구조를 명확하게 하고 정보를 논리적으로 구성할 수 있습니다. 예를 들어, 단계별 지침에 순서가 있는 목록 `ol`을 사용하면 단계의 순서를 강조하여 콘텐츠의 명확성과 사용 편의성을 향상시킬 수 있습니다. 따라서 시간당 페이지 방문 횟수가 증가할 수 있는데, 검색 엔진은 이를 품질있는 콘텐츠의 지표로 고려할 수 있습니다. 비슷하게, 비정렬 목록 `ul`을 사용하면 기능 집합이나 중요한 포인트를 강조할 수 있어 사용자와 검색 엔진 알고리즘 모두에게 페이지를 쉽게 스캔할 수 있도록 만들 수 있습니다. 또한, 설명적인 제목으로 시작하는 대형 섹션 내에 목록을 중첩하거나 다른 의미론적 HTML 요소와 통합하여 콘텐츠 구조를 더 명확하게 정의할 수 있습니다. 이러한 구조적 접근 방식은 사용자 경험을 향상시키는데 그치지 않고 검색 엔진이 콘텐츠의 각 부분 간의 관계와 중요도를 이해하는 데 도움이 되어 SEO 전략의 중요한 측면이 됩니다.

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

# 흔한 함정 및 그것을 피하는 방법들

## 목록의 과용 또는 부적절한 사용

웹 디자인에서 흔한 함정 중 하나는 목록의 과용 또는 부적절한 사용으로, 이는 전체 사용자 경험과 콘텐츠의 명확성을 해치는 요인이 될 수 있습니다. 목록은 정보를 간결하게 정리하는 데 유용하지만, 지나치게 사용하면 각 항목의 중요성이 희석된 혼잡한 페이지를 만들어낼 수 있습니다. 가독성과 구조를 향상시키는 대신, 지나친 목록 사용은 사용자들을 분할된 정보로 압도하며 핵심 요소를 식별하기 어렵게 만들 수 있습니다. 또한 잘못된 종류의 목록을 사용하는 경우 (예: 항목의 순서가 중요하지 않을 때 순서가 지정된 목록을 사용) 정보의 의도된 계층 구조나 중요성에 대한 사용자의 혼란을 야기할 수 있습니다. 이러한 문제를 피하기 위해서는 목록을 분별하여 사용하고 내용에 적합한지 확인하는 것이 중요합니다. 텍스트의 이해를 높이는 명확하고 논리적인 그룹이나 순서가 있는 정보가 있는 경우 목록을 사용하십시오. 또한, 제목이 없는 목록, 순서가 있는 목록 및 설명적 목록 사이의 선택이 콘텐츠의 성격과 일치하도록 하여 깔끔하고 조직적이며 사용자 친화적인 페이지 레이아웃을 유지하십시오.

다음은 지나치게 사용되거나 부적절하게 사용된 목록 요소가 있는 웹페이지의 예시입니다:

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Overuse of Lists</title>
  </head>

  <body>
    <h1>Welcome to Our Bakery</h1>
    <h2>Our Products</h2>
    - Cakes
      - Chocolate Cake
      - Vanilla Cake
      - Red Velvet Cake
    - Cookies
      - Chocolate Chip Cookies
      - Sugar Cookies
      - Snickerdoodles
    - Pies
      - Apple Pie
      - Peach Pie
      - Cherry Pie

    <h2>Our Services</h2>
    - Catering
      - Weddings
      - Birthday Parties
      - Corporate Events
    - Delivery
      - Local Area
      - Special Orders
      - Online Orders
    - Custom Orders
      - Design Your Own Cake
      - Personalised Cookies
      - Theme-Based Decorations

    <h2>Why Choose Us</h2>
    - High-Quality Ingredients
    - Experienced Bakers
    - Friendly Staff
    - Excellent Customer Service
    - Competitive Prices
    - Convenient Location
    - Lots of Parking
    - Family Friendly
  </body>
</html>
```

이 예에서는 제품 및 서비스 범주마다 자세한 하위 목록이 포함된 리스트 형식으로 페이지의 거의 모든 정보가 제공되었습니다. 이것은 여러 문제를 야기할 수 있습니다:

- 시각적 과부하: 중첩 목록의 광범위한 사용으로 시각적 "텍스트 벽" 효과가 발생하여 사용자가 탐색하기 까다롭고 두려운 인상을 주게 됩니다.
- 중요 정보 희석: 정보가 목록으로 구성되어 있어 중요한 부분을 식별하거나 효과적으로 관심을 집중시키는 것이 어려워집니다.
- 중복과 혼란: 제품, 서비스, 회사 강점 등 다양한 정보 유형에 대해 목록 형식을 반복적으로 사용하면 각 섹션의 독특성이 흐려져 내용이 단조롭고 흥미롭지 않게 보일 수 있습니다.

이를 개선하기 위해 정보 표현을 더 막스킬적인 기술로 균형을 맞추거나, 이미지, 제목 또는 문단과 같은 다른 디자인 요소를 통합하여 콘텐츠를 분리하는 웹 페이지를 더 동적이고 소화하기 쉽게 만들 수 있습니다.

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

## 리스트를 잘못 중첩하는 것 (의미 구조)

리스트를 잘못 중첩하는 것은 웹 페이지의 의미 구조를 방해할 수 있는 빈번한 실수로, 사용자와 검색 엔진 모두에게 혼란을 초래할 수 있습니다. 적절하게 구조화된 HTML은 콘텐츠 내의 계층 구조와 관계를 반영해야 하며, 중첩된 목록은 보다 폭넓은 범주 아래의 하위 항목이나 관련 세부 정보를 나타내기 위해 사용됩니다. 잘못된 방식은 주문된 목록 내에 논리적인 종속성이 없는 비주문된 목록을 중첩하는 것이거나, 아이템 간의 관계를 명확히 하지 않고 불분명한 중첩 목록 계층을 사용하는 것일 수 있습니다. 예를 들어 명확한 계층적 연결이 없는 비주문 목록 내에 상세한 설명 목록을 넣는 것은 사용자가 정보 흐름을 따르기 어렵게 만들고, 스크린 리더가 페이지를 정확하게 해석하는 것을 방해할 수 있습니다. 이러한 관행은 콘텐츠를 덜 탐색 가능하고 이해하기 어렵게 만들어 사용자 경험을 저하시킬 수 있습니다. 이러한 오류를 피하기 위해 개발자는 중첩된 목록이 논리적으로 구성되어 하위 또는 관련된 요소를 명확히 나타내며, 가독성과 SEO를 향상시키는 일관된 및 접근 가능한 콘텐츠 구조를 유지해야 합니다.

다음은 리스트를 잘못 중첩하는 예시입니다. 여기서 의미적 구조가 요소들 간의 관계를 명확히 대변하지 않습니다:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Incorrectly Nested Lists</title>
  </head>

  <body>
    <h1>우리의 메뉴</h1>
    <ol>
      <li>
        주요 요리
        <ul>
          <li>치킨 파르미지아</li>
          <li>채식주의자용 라자냐</li>
        </ul>
      </li>
      <li>
        디저트
        <!-- 기술적인 목록 내에 주문된 목록을 잘못 중첩함 -->
        <dl>
          <dt>치즈케이크</dt>
          <dd>리치하고 크리미한 그라함 크래커 크러스트가 특징</dd>
          <dt>사과 파이</dt>
          <dd>시나몬 향이 나는 전통 레시피</dd>
          <ol>
            <li>재료</li>
            <li>조리 절차</li>
          </ol>
        </dl>
      </li>
    </ol>
  </body>
</html>
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

이 예시에서는 주문 목록 'ol'이 각각 다른 메뉴 카테고리에 대한 항목을 올바로 포함하고 있습니다. 그러나 디저트 섹션이 구조화된 방법에 문제가 있습니다:

- 설명 목록에서의 잘못된 중첩: 'Desserts'의 'li' 안에서 각 디저트에 대한 세부 정보를 제공하기 위해 설명 목록 ('dl')이 사용되었는데, 이는 의미론적으로 올바릅니다. 그러나 문제는 'dl' 내부에 명확한 관계없이 정렬 목록 'ol'이 중첩되어 있는 것입니다. 'ol'은 일반적인 절차("성분" 및 "준비 단계")에 대한 자세한 정보를 시작하는 것으로 보이는데, 이는 치즈케이크나 사과 파이와 직접적으로 관련이 없지만 두 항목 아래에 모두 나타나며 혼란을 야기합니다.

중첩된 목록의 오용은 사용자와 스크린 리더가 콘텐츠의 조직을 이해하기 어렵게 만들 수 있으며, 콘텐츠의 계층 구조가 명확하게 정의되지 않아 사용자 경험을 저하시키고 SEO에 부정적인 영향을 미칠 수 있습니다. 올바르게 목록을 중첩하는 방법은 항상 콘텐츠 조각 간에 명확하고 관련성 있는 계층적 관계를 반영해야 합니다.

# 목록을 사용한 예시 페이지 만들기

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

지금은 HTML과 그 목록 요소를 사용하여 웹 페이지를 생성해 봅시다. 이 예시에서는 잘 알려진 이탈리아 음식인 스파게티 카르보나라에 대한 간단한 한 페이지 레시피 페이지를 만들 것입니다. 이 예시를 통해 HTML의 목록 구성 요소를 사용하여 웹 페이지를 적절하게 구조화하고 시각적으로 매력적이면서 의미론적으로 의미있게 만드는 방법을 보여줄 것입니다.

# 단계 1: 웹 페이지의 기본 HTML 구조 만들기

먼저 선호하는 텍스트 편집기를 열고 index.html이란 이름의 새 HTML 파일을 만드세요. 그리고 이 파일 안에 DOCTYPE 선언과 HTML 태그를 추가하여 시작하세요.

```js
<!DOCTYPE html>
<html lang="en">
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

# 단계 2: 헤드 섹션 생성

'html' 태그 아래에 'head' 섹션을 삽입하세요. 이 섹션에는 메타 태그와 제목이 포함되어 있습니다.

```js
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>스파게티 카르보나라 레시피</title>
</head>
```

# 단계 3: 컨텐츠를 위한 본문 태그 생성하기

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

# 단계 4: 헤더 섹션 생성

열린 body 태그 아래에 주요 제목이 있는 헤더 섹션을 만듭니다.

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
<header>
  <h1 id="mainHeader">스파게티 카르보나라 레시피</h1>
</header>
```

# 단계 5: 재료 목록 만들기

페이지에 재료 목록을 추가해 보겠습니다. 재료들이 목록 형식으로 되어 있기 때문에, 이를 목록 요소로 나타내는 것이 좋습니다. 요소에는 id 이름과 aria 레이블을 포함시키는 것을 잊지 말아주세요. 이렇게 함으로써 우수한 SEO 성능뿐만 아니라 모든 사용자에 대한 접근성도 확보할 수 있습니다.

```js
<section>
  <h2 id="ingredientsHeader">재료</h2>
  <ul aria-labelledby="ingredientsHeader" role="list">
    <li role="listitem">100g 팬체타 (전통적 대안으로 구안찰레)</li>
    <li role="listitem">350g 스파게티</li>
    <li role="listitem">큰 달걀 2개</li>
    <li role="listitem">50g 신선한 파마산 치즈 (대체재로 페코리노 로마노 치즈 사용 가능)</li>
    <li role="listitem">마찰 흑후추</li>
    <li role="listitem">파스타 물에 소금</li>
  </ul>
</section>
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

주의: 재료 목록에 특정한 순서가 없기 때문에 순서 없는 목록 요소를 사용했습니다.

# 단계 6: 지시사항 목록 생성하기

이제 위에 나열된 재료들을 사용하여 맛있는 스파게티 카르보나라를 준비하는 지시사항을 자세히 설명해 보겠습니다. 이러한 지시사항의 순차적 성격을 고려하여 명확한 시각적 표현을 위해 목록 요소를 사용하는 것이 좋습니다. 또한, 이러한 지시사항의 순서가 중요하기 때문에 이번에는 순서가 있는 목록을 사용해야 합니다.

```js
<section>
  <h2 id="instructionsHeader">지시사항</h2>
  <ol aria-labelledby="instructionsHeader" role="list">
    <li role="listitem">
      대규모 냄비에 물을 끓이세요. 소금 한 꼬집을 넣고 스파게티를 넣으세요. 일반적으로 알 뎬테로 요리하도록 포장 지시에
      따라 9분 정도 삶아주세요.
    </li>
    <li role="listitem">
      파스타를 삶는 동안, 팬체타를 작은 조각이나 줄기로 잘라 팬에서 중약 불에 넣으세요. 지방이 녹고 팬체타가 바삭해질
      때까지 조리하세요. 불에서 내려놓고 대기시켜주세요.
    </li>
    <li role="listitem">볼 안에 계란을 푹푹 풀어 그래이트한 페코리노 로마노 치즈를 섞어주세요.</li>
    <li role="listitem">
      파스타를 건져 물을 따로 두세요. 뜨거운 스파게티를 팬체타가 있는 팬에 바로 넣으세요 (불 끔). 스파게티가 팬체타
      지방에 잘 묻도록 흔들어주세요.
    </li>
    <li role="listitem">
      계란과 치즈 혼합물을 파스타 위에 부어 계속 섞어주세요. 소스가 너무 농힌 경우 조금의 온기를 보관한 파스타 물을
      넣어주세요.
    </li>
    <li role="listitem">신선하게 갈은 후추로 풍부하게 얹어 즉시 제공해주세요.</li>
  </ol>
</section>
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

이전 예제와 마찬가지로 최적의 SEO 성능과 접근성을 위해 적절한 ID 이름과 aria 역할 레이블을 사용했습니다.

# 단계 7: 용어 해설 섹션 생성

위에서 언급된 팬처 및 페코리노 로마노 치즈와 같은 특정 재료에 익숙하지 않은 독자가 있을 수 있습니다. 따라서 우리의 웹페이지 끝에 용어 해설 섹션을 포함하는 것이 도움이 될 것입니다. 이 섹션에는 이러한 주요 용어와 그 정의가 포함됩니다. 아마도 이 용어 해설을 구성하는 가장 좋은 방법 중 하나가 설명 목록을 사용하는 것이라고 짐작하실 것입니다.

```js
<section>
  <h2 id="glossaryHeader">용어 해설</h2>
  <dl aria-labelledby="glossaryHeader" role="list">
    <dt role="listitem">팬처</dt>
    <dd>소금으로 절인 돼지 복부 고기로 만든 이탈리아식 베이컨으로, 검은 후추로 맛을 낸다.</dd>
    <dt role="listitem">페코리노 로마노 치즈</dt>
    <dd>양모로 만든 질기고 짜고 맛있는 이탈리아 치즈로, 전통적으로 로마 요리에 사용된다.</dd>
  </dl>
</section>
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

# 단계 8: body 태그 닫기

페이지 내용이 완료되었습니다. 이제 이전에 열었던 body 태그를 닫아봅시다.

```js
</body>
```

# 단계 9: HTML 태그 닫기

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

작업을 계속하기 전에, 처음에 여는 HTML 태그를 닫아 웹 페이지를 완성합시다.

```js
</html>
```

이제 스파게티 카르보나라 레시피가 표시되는 웹 페이지가 준비되었습니다. 이 파일을 저장하고 웹 브라우저에서 열어 레시피를 확인해보세요. 원한다면 여기에 코드의 전체 버전도 있습니다:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>스파게티 카르보나라 레시피</title>
  </head>

  <body>
    <header>
      <h1 id="mainHeader">스파게티 카르보나라 레시피</h1>
    </header>
    <section>
      <h2 id="ingredientsHeader">재료</h2>
      <ul aria-labelledby="ingredientsHeader" role="list">
        <li role="listitem">
          100g 팬체타 (전통적인 대안으로 구안찰 (guanciale))
        </li>
        <li role="listitem">350g 스파게티</li>
        <li role="listitem">대략 2개의 큰 달걀</li>
        <li role="listitem">
          50g 신선한 파마산 치즈 (대체로 페코리노 로마노 치즈)
        </li>
        <li role="listitem">신선한 후추 가루</li>
        <li role="listitem">파스타 물에 소금</li>
      </ul>
    </section>
    <section>
      <h2 id="instructionsHeader">조리 방법</h2>
      <ol aria-labelledby="instructionsHeader" role="list">
        <li role="listitem">
          큰 냄비에 물을 끓이세요. 소금을 약간 넣고 스파게티를 넣으세요. 보통 알 덴테까지 요리해주세요. 보통 9분 정도 소요됩니다.
        </li>
        <li role="listitem">
          파스타가 요리되는 동안 팬체타를 작은 조각이나 줄로 잘라 후열에서 중불로 익혀주세요. 기름이 녹고 팬체타가 바삭해질 때까지 요리하세요. 불에서 내리고 한쪽에 놓아두세요.
        </li>
        <li role="listitem">
          그릇에 달걀을 푸녀준 뒤, 갈은 페코리노 로마노 치즈를 섞어주세요.
        </li>
        <li role="listitem">
          파스타를 건져 물을 건져내고, 1컵의 파스타 끓는 물을 남겨두세요. 뜨거운 스파게티를 바로 팬체타가 있는 팬으로 옮겨주세요 (불은 꺼주세요). 파스타가 팬체타 기름에 덮이도록 잘 섞어주세요.
        </li>
        <li role="listitem">
          달걀과 치즈 혼합물을 파스타에 부으면서 계속 섞어주세요. 너무 짙은 소스인 경우 약간의 보낸 파스타 물을 추가해주세요.
        </li>
        <li role="listitem">
          신선한 후추 가루로 풍성하게 양념하고 즉시 제공해주세요.
        </li>
      </ol>
    </section>
    <section>
      <h2 id="glossaryHeader">용어 해설</h2>
      <dl aria-labelledby="glossaryHeader" role="list">
        <dt role="listitem">팬체타(Pancetta)</dt>
        <dd>
          이탈리아식 베이컨으로 돼지 배 타액을 사용하여 소금에 절이고 후추로 향을 낸 이탈리아식 베이컨.
        </dd>
        <dt role="listitem">페코리노 로마노 치즈(Pecorino Romano Cheese)</dt>
        <dd>
          양의 우유로 만든 질기하고 짭쪼름한 이탈리아 치즈로, 로마 요리에 전통적으로 사용됩니다.
        </dd>
      </dl>
    </section>
  </body>
</html>
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

# 마무리하면

다양한 HTML 리스트 유형을 사용하는 데 익숙해지는 것이 웹 콘텐츠를 돋보이게 만드는 데 중요합니다. 순서 없는 리스트, 순서 있는 리스트 또는 설명형 리스트를 사용하는 과정을 잘 파악하는 것은 정보를 깔끔하게 유지하고, 읽기 쉽고, 스크린 리더를 사용하는 사람들을 포함한 모든 사용자에게 정보에 쉽게 접근할 수 있게 도와줍니다. 게다가 이러한 리스트는 사이트의 SEO를 향상시키며 발견될 수 있는 확률을 높일 수 있습니다. HTML 리스트는 콘텐츠를 조직하는 방법 이상이며, 사용자 경험을 향상시키고 사이트 기능을 개선하는 강력한 도구입니다. 간단한 할일 목록을 만들거나 복잡한 메뉴를 구조화하거나 상세한 데이터를 제공하고자 할 때, 적절한 리스트 유형은 큰 차이를 만들어줍니다.

단계별 지침에 적합한 것은 순서 있는 리스트, 일반적인 그룹을 나누는 데는 순서 없는 리스트, 용어와 정의를 짝지어 나열하는 데는 설명형 리스트가 이상적입니다. 웹 프로젝트를 더 깊이 파고들면, 리스트를 다루는 데 실험해보는 것이 중요합니다. 다양한 스타일과 중첩 기술을 시도하여 콘텐츠를 제시하는 창의적인 방법을 찾아보세요.

복잡한 데이터를 처리하기 위해 순서 있는 리스트와 순서 없는 리스트를 섞어서 사용하거나, 명확성과 맥락을 추가하기 위해 설명형 리스트를 사용하세요.

HTML 리스트는 매우 다재다능하므로 즐겁게 활용하며 웹사이트를 더 매력적이고 사용자 친화적으로 만들어보세요! 리스트를 실험하는 것은 시각적 매력을 향상시키는 데 도움뿐만 아니라 모든 사용자를 위해 더 잘 구성된 접근 가능한 사이트를 보장하는 데도 도움이 됩니다. 즐거운 코딩이 되길 바라며, 다음 기사에서 뵙겠습니다. :)
