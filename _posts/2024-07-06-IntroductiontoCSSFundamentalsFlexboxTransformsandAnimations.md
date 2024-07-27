---
title: "CSS 기초, Flexbox, Transforms, 애니메이션 완벽 가이드"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_0.png"
date: 2024-07-06 10:09
ogImage:
  url: /assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_0.png
tag: Tech
originalTitle: "Introduction to CSS Fundamentals, Flexbox, Transforms, and Animations"
link: "https://medium.com/@ahmadirfankhan/introduction-to-css-fundamentals-flexbox-transforms-and-animations-7fd02f478354"
---

/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_0.png

CSS (Cascading Style Sheets)은 HTML 문서를 스타일링하는 데 사용되는 언어입니다. 이는 HTML 요소가 어떻게 표시되어야 하는지 설명하며 색상, 레이아웃, 그리고 애니메이션을 통해 웹 페이지에 생명을 불어넣습니다. 이 문서에서는 CSS 기본원리, Flexbox, 변형, 그리고 애니메이션을 체계적으로 다루어 시각적으로 매력적이고 동적인 웹 페이지를 만드는 데 필요한 지식을 제공할 것입니다.

# CSS 기본원리

Flexbox, 변형, 그리고 애니메이션과 같은 고급 주제에 대해 들어가기 전에 CSS의 기본 구성 요소를 이해하는 것이 중요합니다.

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

HTML 문서를 CSS로 스타일링할 때 세 가지 주요 옵션이 있어요:

- 인라인 CSS
- 내부 CSS
- 외부 CSS

각 방법은 각자의 사용 사례, 장단점이 있어요.

## 인라인 CSS

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

인라인 CSS는 style 속성을 사용하여 HTML 요소에 스타일을 직접 적용하는 것을 말합니다. 이 방법은 작고 특정한 스타일 변경에 적합하지만 유지 보수 문제로 인해 대규모 프로젝트에 권장되지 않습니다.

장점:

- 작고 일회성 스타일에 대해 빠르고 쉽게 적용할 수 있습니다.
- 별도의 CSS 파일에 링크를 걸 필요 없이 스타일이 즉시 표시됩니다.

단점:

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

- 유지 및 업데이트가 어려워집니다.
- HTML 파일의 크기가 증가합니다.
- 다른 방법들과 비교했을 때 재사용성이 낮아집니다.

## 내부 CSS

내부 CSS는 HTML 문서의 `head` 섹션 안의 `style` 태그 내에 정의됩니다. 이 방법은 한 페이지에 스타일을 적용하고 모든 스타일을 한 곳에 유지하는 데 유용합니다.

장점:

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

- 스타일은 문서 내에서 한 곳에 중앙 집중됩니다.
- 한 페이지 웹사이트나 스타일이 고유한 페이지에 유용합니다.

단점:

- 스타일을 여러 페이지에서 재사용할 수 없습니다.
- HTML 파일을 커지고 읽기 어렵게 만들 수 있습니다.

## 외부 CSS

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

외부 CSS는 모든 스타일을 포함하는 별도의 CSS 파일에 링크하는 방식을 의미합니다. 이 방법은 재사용성과 유지 보수성을 증진시키기 때문에 대규모 웹사이트에서 선호됩니다.

장점:

- 스타일이 여러 HTML 파일에서 재사용 가능합니다.
- HTML 파일을 깔끔하고 가독성 있게 유지합니다.
- 스타일을 보다 쉽게 유지 보수하고 업데이트할 수 있습니다.

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

- CSS 파일을로드하려면 추가 HTTP 요청이 필요합니다.
- CSS 파일의 변경 사항은 모든 연결된 HTML 파일에 영향을 미치므로 제대로 관리되지 않으면 문제점이 발생할 수 있습니다.

## 선택자

선택자는 스타일링을 위해 HTML 요소를 대상으로하는 데 사용됩니다. 가장 일반적인 유형은 다음과 같습니다.

- 요소 선택자: 태그 이름으로 요소를 선택합니다(예: p, h1, div).
- 클래스 선택자: 클래스 이름으로 요소를 선택합니다(예: .class-name).
- ID 선택자: ID로 요소를 선택합니다(예: #id-name).

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

## 속성과 값

CSS 속성은 요소가 어떻게 스타일링되어야 하는지를 정의하며, 값은 해당 속성의 설정을 지정합니다.

![CSS Box Model](/ui-log-2/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_1.png)

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

CSS Box Model은 웹 디자인에서 요소가 구조화되고 표시되는 방식을 설명하는 기본 개념입니다. 요소가 차지하는 공간을 정의하는 여러 구성 요소로 구성되어 있으며, 이에는 내용 영역, 안간격(padding), 테두리(border), 여백(margin) 등이 포함됩니다.

내용 상자

- 요소의 실제 내용(텍스트, 이미지 등)이 표시되는 상자 모델의 가장 안쪽 부분입니다.
- 요소의 너비와 높이 속성이 내용 상자의 크기를 정의합니다.

안간격(padding)

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

- 내용 상자와 테두리 사이의 공간.
- 여백(padding)은 요소 내부에 공간을 추가하여 내용을 안쪽으로 밀어 넣습니다.
- 패딩은 각각의 면(위, 오른쪽, 아래, 왼쪽)에 개별적으로 설정하거나 모든 면에 대해 균일하게 설정할 수 있습니다.

테두리(Border)

- 패딩과 내용 주변에 있는 가장자리.
- 테두리는 스타일링(실선, 대시선, 점선 등), 색상 및 지정된 너비를 가질 수 있습니다.

여백(Margin)

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

- 테두리 외의 공간은 요소 사이의 간격을 조절합니다.
- 여백은 각 측면별로 개별적으로 설정하거나 모든 측면에 균일하게 설정할 수도 있습니다.
- 여백은 축소될 수 있으며, 인접한 수직 여백이 결합하여 더 큰 값을 가진 단일 여백으로 합병될 수 있습니다.

# 플렉스박스

/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_2.png

플렉스박스 (Flexible Box Layout)는 float 또는 positioning을 사용하지 않고 유연하고 반응형 레이아웃 구조를 디자인하는 데 도움이 되는 CSS 모듈입니다.

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

## 플렉스 컨테이너

플렉스박스를 사용하기 시작하려면 부모 요소에서 display 속성을 flex로 설정하여 플렉스 컨테이너를 정의해야 합니다.

## 플렉스 아이템

플렉스 컨테이너의 자식 요소는 플렉스 아이템이 됩니다. 플렉스 아이템에 대한 중요한 속성 몇 가지는 다음과 같습니다:

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

- justify-content: 항목을 수평으로 정렬합니다 (예: flex-start, center, space-between).
- align-items: 항목을 수직으로 정렬합니다 (예: stretch, center, flex-start).

## Flex 컨테이너 속성

플렉스 컨테이너를 만들려면 요소의 display 속성을 flex 또는 inline-flex로 설정합니다. 이렇게 하면 모든 직계 하위 항목이 플렉스 항목으로 변환됩니다.

flex-direction: 플렉스 컨테이너에 위치한 플렉스 항목의 방향을 정의합니다.

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

표 태그를 마크다운 형식으로 변경하세요.

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

## 플렉스 아이템 속성

플렉스 아이템은 플렉스 컨테이너 내에서 그들의 동작을 제어하기 위한 특정 속성들을 가질 수 있습니다.

- order: 플렉스 아이템의 순서를 변경합니다.
- flex-grow: 필요에 따라 플렉스 아이템이 성장할 수 있는 능력을 정의합니다.

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

유연 길이 조절: 유연 아이템이 필요한 경우 줄어들 수 있는 능력을 정의합니다.

기본 크기 지정: 남은 공간이 분배되기 전 요소의 기본 크기를 정의합니다.

개별 정렬: 개별적인 플렉스 아이템을 나머지와 다르게 정렬할 수 있도록 합니다.

# 변형(QtCore)

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

/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_3.png

Transforms는 요소를 2차원 또는 3차원 공간에서 조작할 수 있게 해줍니다. 일반적인 변환 함수에는 translate, rotate, scale, skew 등이 있습니다.

다음은 사용할 수 있는 주요 변환 함수입니다:

Translate

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

- 현재 위치에서 요소를 이동합니다.
- translateX(x)는 요소를 수평으로 이동시킵니다.
- translateY(y)는 요소를 수직으로 이동시킵니다.
- translate(x, y)는 요소를 수평 및 수직으로 모두 이동시킵니다.

회전

- 요소를 중심을 기준으로 회전시킵니다.
- rotate(angle)은 요소를 지정된 각도만큼 회전시킵니다.

확대/축소

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

- 요소의 크기를 조절합니다.
- scaleX(sx)는 요소를 수평으로 확대합니다.
- scaleY(sy)는 요소를 수직으로 확대합니다.
- scale(sx, sy)는 요소를 수평 및 수직으로 확대합니다.

기울임

- X 또는 Y축을 따라 요소를 기울입니다.
- skewX(ax)는 요소를 X축을 따라 기울입니다.
- skewY(ay)는 요소를 Y축을 따라 기울입니다.
- skew(ax, ay)는 요소를 X 및 Y축을 따라 기울입니다.

행렬

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

- 모든 변환 기능을 하나로 결합합니다.
- matrix(a, b, c, d, e, f)는 행렬을 사용하여 2D 변환을 적용합니다.

## 변환 합치기

여러 변환 기능을 하나의 transform 속성에 결합할 수 있습니다. 함수는 지정된 순서대로 적용됩니다.

## 변환 원점

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

transform-origin 속성을 사용하면 변환을 적용하는 지점을 변경할 수 있습니다. 기본적으로 지점은 요소의 중앙에 있습니다.

# 애니메이션

/assets/img/2024-07-06-IntroductiontoCSSFundamentalsFlexboxTransformsandAnimations_4.png

CSS 애니메이션을 사용하면 지정된 기간 동안 스타일 간의 부드러운 전환을 통해 동적이고 매력적인 웹 경험을 만들 수 있습니다. 애니메이션은 웹 페이지를 더 인터랙티브하고 시각적으로 매력적으로 만들어 사용자 경험을 향상시킬 수 있습니다.

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

## 키프레임

키프레임은 애니메이션의 시작점과 끝점을 정의하며 중간 단계도 정의합니다.

키프레임은 @keyframes 규칙을 사용하여 정의됩니다. 애니메이션의 이름과 애니메이션의 단계(또는 키프레임) 및 각 단계의 스타일을 지정합니다.

## 애니메이션 적용

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

`animation` 속성을 사용하여 요소에 정의된 keyframes를 적용하세요.

요소에 애니메이션을 적용하려면 다음과 같은 애니메이션 관련 속성을 사용합니다:

- `animation-name`: @keyframes 애니메이션의 이름을 지정합니다.
- `animation-duration`: 애니메이션의 지속 시간을 지정합니다.
- `animation-timing-function`: 애니메이션의 타이밍 함수를 지정합니다 (예: ease, linear, ease-in, ease-out, ease-in-out).
- `animation-delay`: 애니메이션이 시작되기 전의 지연 시간을 지정합니다.
- `animation-iteration-count`: 애니메이션이 몇 번 실행되어야 하는지를 지정합니다 (예: infinite, 1, 2, 3).
- `animation-direction`: 애니메이션이 순방향, 역방향 또는 번갈아 가며 재생되어야 하는지를 지정합니다.
- `animation-fill-mode`: 애니메이션 전후에 스타일이 적용되는 방식을 지정합니다.
- `animation-play-state`: 애니메이션이 실행 중인지 일시 정지 상태인지를 지정합니다.

## 추가적인 애니메이션 속성

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

- animation-timing-function: 애니메이션의 속도 곡선을 정의합니다. 일반적인 값으로는 ease, linear, ease-in, ease-out, ease-in-out 등이 있습니다.
- animation-delay: 애니메이션 시작 전의 지연 시간을 정의합니다.
- animation-iteration-count: 애니메이션이 반복되는 횟수를 정의합니다. 연속적인 반복을 위해 무한(infinite)을 사용할 수 있습니다.
- animation-direction: 애니메이션의 방향을 제어합니다. 값으로는 normal, reverse, alternate, alternate-reverse 등이 있습니다.
- animation-fill-mode: 애니메이션 전후에 스타일이 적용되는 방식을 지정합니다. 값으로는 none, forwards, backwards, both 등이 있습니다.
- animation-play-state: 애니메이션을 일시 중지하거나 재개할 수 있게 합니다. 값으로는 running, paused가 있습니다.

# 결론

CSS 기본, Flexbox, 변형 및 애니메이션을 이해함으로써 동적이고 반응형 웹 페이지를 만들 수 있습니다. 선택자 및 속성의 기본부터 시작하여 레이아웃 제어를 위해 Flexbox를 마스터하고, 요소를 공간 내에서 조작하기 위해 변형을 사용하고, 마지막으로 애니메이션을 통해 디자인을 부활시킬 수 있습니다. 즐거운 코딩 되세요!
