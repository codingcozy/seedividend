---
title: "파트 1 HTML 및 HTML5 시작하는 법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-07-Part1GettingstartedwithHtmlandHTML5_0.png"
date: 2024-07-07 21:24
ogImage:
  url: /assets/img/2024-07-07-Part1GettingstartedwithHtmlandHTML5_0.png
tag: Tech
originalTitle: "Part 1: Getting started with Html and HTML5"
link: "https://medium.com/@vaaluvishnu5146/getting-started-with-html-and-html5-da9a27e65b97"
---

HTML 및 HTML에서 사용 가능한 모든 태그에 대한 설명서

![HTML Image](/ui-log-2/assets/img/2024-07-07-Part1GettingstartedwithHtmlandHTML5_0.png)

# HTML이란?

HTML (하이퍼텍스트 마크업 언어)는 웹 페이지를 만드는 데 사용되는 표준 언어입니다. 이는 웹페이지의 구조를 제공하며, 이후 CSS (캐스케이딩 스타일 시트)로 스타일이 적용되며 JavaScript로 상호작용이 가능하게 됩니다. HTML은 브라우저에 콘텐츠를 어떻게 표시할지 알려주는 일련의 요소 또는 태그로 구성됩니다.

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

# HTML 태그란 무엇인가요:

HTML 코드를 작성하기 위해서는 특정한 구문, 절차 및 규칙을 따라야 합니다. 구문은 다음과 같이 보일 것입니다:

```js
<TagName></TagName>
```

우리는 두 가지 방법으로 HTML 태그를 활용할 수 있습니다:

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

- 컨테이너 태그
- 자체 닫힘 태그

```js
### 컨테이너 태그

<Tag></Tag>

### 자체 닫힘

<Tag />
```

보통 컨테이너 태그는 다른 많은 하위 요소를 포함하고, 마치 모든 물건을 수집하는 가방 역할을 합니다.

대부분의 경우, 자체 닫힘 태그는 입력 요소나 줄 바꿈 요소일 것입니다.

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

HTML의 모든 태그는 다음과 같이 여러 가지 태그로 분류할 수 있습니다:

- 구조화 태그 — 웹 문서의 구조와 레이아웃을 정의합니다.
- 서식 태그 — 텍스트 모양을 정의합니다.
- 리스트 태그 — 이용 가능한 옵션을 나열하는 데 도움이 됩니다.
- 폼 태그 — 인터랙티브 폼을 만드는 데 사용됩니다.
- 테이블 태그 — 테이블 형식으로 데이터를 관리하는 데 도움이 됩니다.

초보자를 위한 중요한 HTML 태그

여기 초보자가 배워야 할 몇 가지 필수 HTML 태그가 있습니다:

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

구조적 태그:

- `html`: HTML 문서의 루트 요소.
- `head`: 메타데이터(데이터에 대한 데이터)와 스크립트 및 스타일에 대한 링크를 포함하는 컨테이너.
- `title`: 웹 페이지의 제목을 설정합니다.
- `body`: HTML 문서의 콘텐츠를 포함합니다.
- `header`: 시작 콘텐츠나 네비게이션 링크를 위한 컨테이너를 나타냅니다.
- `nav`: 네비게이션 링크를 정의합니다.
- `main`: 문서의 주요 콘텐츠를 지정합니다.
- `footer`: 문서나 섹션에 대한 푸터를 정의합니다.
- `section`: 문서의 섹션을 정의합니다.
- `article`: 독립적이고 자체 포함된 내용을 정의합니다.
- `aside`: 본문 콘텐츠 외에 위치한 콘텐츠(예: 사이드바)를 정의합니다.
- `div`: HTML 문서의 분할 또는 섹션을 정의합니다.

서식 태그:

- `h1`에서 `h6`: `h1`이 가장 높은(또는 가장 중요한) 수준이고 `h6`이 가장 낮은 수준입니다.
- `p`: 문단을 정의합니다.
- `br`: 단일 줄 바꿈을 삽입합니다.
- `hr`: 콘텐츠의 주제 변경을 정의합니다(수평 규칙).
- `strong`: 중요한 텍스트를 정의합니다(굵게).
- `em`: 강조된 텍스트를 정의합니다(기울임).
- `b`: 굵은 텍스트를 정의합니다.
- `i`: 이탤릭 텍스트를 정의합니다.
- `u`: 밑줄 텍스트를 정의합니다.
- `span`: 문서 내 인라인 요소를 그룹화하는 데 사용됩니다.

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

# 리스트 태그:

- 'ul': 정렬되지 않은 목록을 정의합니다.
- 'ol': 순서가 있는 목록을 정의합니다.
- 'li': 목록 항목을 정의합니다.

링크 및 미디어 태그

- 'a': 하이퍼링크를 정의합니다.
- 'img': 이미지를 삽입합니다.
- 'video': 비디오를 삽입합니다.
- 'audio': 오디오 파일을 삽입합니다.
- 'source': 'video' 및 'audio'에 대한 여러 미디어 리소스를 지정합니다.

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

표 태그

- `table`: 표를 정의합니다.
- `tr`: 표의 행을 정의합니다.
- `th`: 표의 헤더 셀을 정의합니다.
- `td`: 표의 셀을 정의합니다.

폼 태그

- `form`: 사용자 입력을 위한 HTML 폼을 정의합니다.
- `input`: 입력 컨트롤을 정의합니다.
- `textarea`: 여러 줄 입력 컨트롤(텍스트 영역)을 정의합니다.
- `button`: 클릭할 수 있는 버튼을 정의합니다.
- `label`: `input` 요소에 대한 레이블을 정의합니다.
- `select`: 드롭다운 목록을 정의합니다.
- `option`: 드롭다운 목록의 옵션을 정의합니다.
- `fieldset`: 폼에서 관련된 요소들을 그룹화합니다.
- `legend`: `fieldset` 요소에 대한 캡션을 정의합니다.

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

메타데이터 태그

- `meta`: HTML 문서에 대한 메타데이터를 제공합니다.
- `link`: 문서와 외부 리소스 간의 관계를 정의합니다 (대부분 스타일 시트에 링크하는 데 사용됨).
- `style`: 문서에 대한 스타일 정보를 정의합니다.
- `script`: 클라이언트 측 스크립트를 정의합니다.

또한 HTML의 의미론을 이해해야 합니다.

HTML에서 의미론적 태그는 포함하는 내용의 의미를 정의하는 반면, 의미가 없는 태그는 스타일링이나 다른 요소의 컨테이너로 사용됩니다:

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

의미 있는 태그

- 이러한 태그들은 인간과 기계가 모두 이해할 수 있는 방식으로 의미를 명시적으로 설명하며, 그 안에 어떤 유형의 콘텐츠가 포함되어 있는지 나타냅니다. 예를 들어, `h1` 태그는 제목을 나타내는 반면, `p` 태그는 단락을 나타냅니다. `header`, `article`, `footer`와 같은 다른 의미 있는 태그의 예시도 있습니다.

의미 없는 태그

- 이러한 태그들은 내용에 대한 정보를 전달하지 않고 스타일링 목적이나 다른 요소들을 포함하기 위해 사용됩니다. 예를 들어, `div` 태그는 요소들을 그룹화하기 위해 사용될 수 있으며, `<style>` 태그는 텍스트를 스타일링하는 데 사용됩니다. 기타 의미 없는 태그의 예시로는 `hr`, `input`, `select`, `textarea`가 있습니다.

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

이 글에서 유용하고 통찰력있는 것을 얻었으면 좋겠습니다. 더 배우려면 제 미디엄과 링크드인 계정을 팔로우해주세요:

![image](/ui-log-2/assets/img/2024-07-07-Part1GettingstartedwithHtmlandHTML5_1.png)

[링크드인 프로필](https://www.linkedin.com/in/vishnu-vardhan-balasundaram-851490196/)

또한 이와 유사한 더 많은 글을 읽어보세요.
