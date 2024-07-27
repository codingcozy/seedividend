---
title: "HTML과 CSS의 역할 완벽 해부"
description: ""
coverImage: "/ui-log-2/assets/no-image.jpg"
date: 2024-07-09 14:22
ogImage: 
  url: /ui-log-2/assets/no-image.jpg
tag: Tech
originalTitle: "DEMYSTIFYING THE ROLES OF HTML AND CSS"
link: "https://medium.com/@effydeehpo2/demystifying-the-roles-of-html-and-css-9f8ddc236e68"
---


우리는 매일 마주하는 웹사이트와 상호작용 애플리케이션이 직관적이고 아름답기를 기대합니다. 그러나 이런 경험들은 마법이 아니라 협력의 산물입니다. 이러한 노력 중 일부는 웹의 보이지 않는 건축가들로부터 옵니다. 이들은 복잡한 코드를 매끄러운 인터페이스로 번역하고 HTML 및 CSS와 같은 프론트엔드 기술을 사용하여 이를 가능케 합니다. 이 기사에서는 이 두 가지 프론트엔드 기술인 HTML (하이퍼텍스트 마크업 언어)와 CSS (계층 별 스타일 시트)를 탐구하며, 웹사이트를 살아있게 만드는 데 어떻게 협업하는지에 대해 깊게 이해해보겠습니다.

HTML: 청사진

HTML을 웹사이트의 청사진으로 생각해보세요. 이것은 웹페이지의 구조를 제공하고 콘텐츠와 구성을 정의합니다. 기본적으로 웹 브라우저에 모든 멋진 것들을 넣을 위치를 알려줍니다: 제목, 최신 조로프 라이스 레시피 사진 및 상상할 수 있는 모든 것들. 이 모든 작업을 수행하기 위해 요소(element)라고 불리는 개별 구성 요소를 사용합니다. 이 요소는 제목, 문단, 이미지, 하이퍼링크 등이 될 수 있습니다. 아래는 일반적인 HTML 요소 몇 가지 예시입니다:

제목(Headings): 이들은 콘텐츠의 등급 구조를 정의하며, `h1`이 가장 중요하고 `h6`이 가장 적게 중요합니다.

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

```js
# 이것은 내 과제의 제목입니다

### 여기에 하위 제목 중 하나

```

- 단락: 이것들은 일반 텍스트 콘텐츠에 사용됩니다.

```js
<p>이것은 텍스트 단락입니다</p>
```

- 이미지: `img` 태그는 웹페이지에 이미지를 표시합니다.

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


[과제 사진](img/assignment.jpg)

- 하이퍼링크: 이를 통해 다른 웹 페이지나 같은 페이지의 다른 섹션으로 이동할 수 있는 링크를 생성합니다. 하이퍼링크를 클릭하면 새로운 위치로 이동할 수 있습니다.

[이 주제에 대해 더 알아보기](https://www.example.com)

CSS: 아트 디렉터


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

이제 CSS(Cascading Style Sheets)를 예술 감독으로 상상해보세요. 그는 시각적 스타일로 웹 사이트를 꾸며주는 역할을 합니다. CSS는 배경색, 글꼴, 테두리와 같은 속성을 사용하여 텍스트 색상부터 요소 레이아웃까지 모든 것을 제어합니다. CSS는 웹페이지의 특정 부분을 스타일링하기 위해 선택자를 사용합니다. 이러한 선택자는 페인트 롤러처럼 작용하며 일반적인 옵션으로는 다음이 있습니다:

- 요소 선택자: `h1`과 같은 제목이나 `p`와 같은 단락과 같은 특정 HTML 요소를 대상으로 합니다.
- 클래스 선택자: 여러 요소에 클래스를 할당하고 해당 클래스가 적용된 모든 요소에 스타일을 적용합니다.
- ID 선택자: 특정 스타일링을 위해 웹페이지의 단일 요소를 고유하게 식별합니다.

코드 vs 스타일: HTML과 CSS의 역할 이해

- 기능성

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

HTML은 콘텐츠와 구조에 중점을 둡니다. 웹페이지를 구성하는 요소를 정의하는데, 제목, 단락, 이미지 및 링크와 같은 요소를 포함합니다.

```js
# 이것은 제목입니다.
This is a paragraph of text
![picture-description](img/assignment.jpg)
[Click here for more info](https://www.example.com)
```

CSS는 프리젠테이션과 스타일에 관여합니다. 웹사이트의 시각적인 외관을 제어합니다.

```js
h1 {
color: yellow;
font-size: 28px;
}
p {
font-family: Arial, sans-serif;
line-height: 1.5;
}
img {
width: 50%;
border: 1px solid #ddd;
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

- 가독성

HTML은 프로그래머가 아닌 사람들에게도 비교적 쉽게 이해할 수 있습니다. 코드는 자연어와 유사한 태그와 속성을 사용하여 웹페이지의 구조와 내용을 파악하기 쉽게 만듭니다. 반면에 CSS 구문은 코딩 원리에 대한 기본적인 이해가 필요합니다. 선택자와 속성은 처음에는 암호적으로 보일 수 있지만 연습을 통해 익숙해질 수 있습니다.

- 특이성

HTML은 시각적 표현에 대한 제한된 제어 기능을 제공합니다. HTML은 간단한 서식 옵션(굵게 표시하거나 이탤릭체 텍스트)을 제공하지만 주요 초점은 콘텐츠 구조 정의에 있습니다. 반면에 CSS는 시각적 표현에 대한 높은 수준의 제어를 제공합니다. 개발자들은 CSS를 사용하여 복잡한 레이아웃을 만들고 애니메이션을 적용하며 웹사이트에 독특한 시각적 아이덴티티를 부여할 수 있습니다.

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

- 관심사 분리

HTML은 내용과 구조를 프레젠테이션으로부터 분리함으로써 관심사 분리의 개념을 수용합니다. 이는 개발자가 웹사이트의 내용(HTML)과 시각적 스타일(CSS)을 독립적으로 유지할 수 있게 합니다. 책의 내용에 집중하는 작가와 별도의 디자인 팀이 글꼴, 레이아웃 및 삽화와 같은 시각적 요소를 처리하는 것을 상상해보세요. CSS는 웹사이트의 내용을 스타일링할 수 있는 전용 방법을 제공하여 이 분리를 강화합니다. 개발자는 CSS를 통해 HTML로 정의된 웹 페이지의 모양과 느낌을 수정할 수 있으며, 기존의 내용 구조를 변경하지 않고도 가능합니다. 이 분리는 코드 유지 및 재사용성을 촉진합니다.

- 정적 vs. 동적 내용

HTML은 주로 정적 웹사이트를 만드는 데 적합합니다. HTML은 하이퍼링크와 같은 기본 상호작용을 정의할 수 있지만, 동적 컨텐츠를 생성하거나 사용자 조작에 응답하는 기능은 부족합니다. 이를 이해하기 위해 인쇄된 잡지를 상상해보세요 - 정보는 페이지에 고정되어 정적인 읽기 경험을 제공합니다.

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

한편, 동적 콘텐츠 생성에 직접적으로 관여하지는 않지만 CSS는 정적 및 동적 요소의 스타일링에 중요한 역할을 합니다. 콘텐츠에 맞게 적응하는 시각적 레이어로 생각할 수 있으며, 정적이든 JavaScript와 같은 다른 기술을 사용하여 동적으로 생성된 콘텐츠든 관계없이 적용됩니다. 예를 들어, CSS는 정적 제목과 동적으로 가져온 기사가 혼합된 뉴스 피드를 일관된 시각적 디자인으로 스타일링할 수 있습니다.

협업 및 사용 사례

- 기본 스타일링으로 간단한 레이아웃

간단한 소개와 연락처 정보가 담긴 정적 랜딩 페이지를 상상해보세요. 기본 HTML은 페이지 구조(헤딩, 단락, 이미지)를 정의하고, HTML 코드 내의 인라인 스타일은 폰트 색상이나 배경 색상과 같은 간단한 디자인 요소를 다룰 수 있습니다. 이 시나리오에서 HTML은 기초를 제공하고, CSS는 시각적인 마무리를 해줍니다.

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

- 복잡한 레이아웃과 풍부한 시각 요소

제품 그리드, 애니메이션 효과 및 반응형 레이아웃을 갖춘 전자상거래 웹 사이트는 시각적 경험을 정의하는 데 CSS에 크게 의존합니다. HTML은 콘텐츠(제품 설명, 가격)를 구조화하고, CSS는 표시 방법(레이아웃, 스타일링, 반응성)을 제어합니다. 여기서 HTML은 콘텐츠 구성을 만들고, CSS가 시각적으로 구현합니다.

기본을 넘어서:

웹 개발 환경은 HTML과 CSS를 넘어서 다양합니다. Angular, Vue.js 및 ReactJS 같은 프레임워크는 프로젝트에 보다 복잡한 기능이나 상호 작용이 필요할 때 사용됩니다. 프레임워크에 관해서 말씀드리자면, 최근에 프론트엔드 개발 인턴십 프로그램에 합격했어요! 이 인턴십은 웹 개발 세계를 더 깊이 이해할 수 있는 멋진 기회이며, 놀랍게도 무엇을 사용하나요? ReactJS를 사용한다고 해요!

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

HTML과 CSS는 기초적이지만, ReactJS 같은 프레임워크는 더 발전된 수준으로 나아갈 수 있어요. 저처럼 신규 JavaScript 개발자에게는 ReactJS가 복잡하다는 평판이 있지만, 도전을 받아들일 준비가 돼 있어요. 이 인턴십은 경험 많은 개발자들이 도와주는 실용적인 학습 환경을 제공해줘요. 마지막에는 ReactJS에 대한 더 나은 이해만 아니라 개발자 도구 상자에 추가할 수 있는 가치 있는 기술 모음도 갖출 것이라 자신해요.

앞으로 제 프론트엔드 웹 개발 모험에 대한 업데이트를 기대해 주세요! 한편, 프론트엔드 개발에 대해 더 자세히 알아보고 싶으시거나 인턴십에 관한 질문이 있으시면 https://hng.tech/internship 또는 https://hng.tech/premium 에 방문해 주세요.