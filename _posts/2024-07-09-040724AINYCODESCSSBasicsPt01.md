---
title: "2024년 CSS 기초 - Part 1 알아두어야 할 필수 개념들"
description: ""
coverImage: "/ui-log-2/assets/no-image.jpg"
date: 2024-07-09 14:02
ogImage: 
  url: /ui-log-2/assets/no-image.jpg
tag: Tech
originalTitle: "040724 AINYCODES ~ CSS Basics Pt. 01"
link: "https://medium.com/@wastblog/css-basics-pt-01-040724-ainycodes-fc983b2c928f"
---


안녕하세요! 오늘은 FreeCodeCamp의 반응형 웹 디자인 인증을 위한 설문 조사 양식 프로젝트에 참여했어요. CSS가 제공하는 다양한 옵션에 깜짝 놀랐어요! 마치 쇼핑몰에 가서 보는 옷마다 사고 싶은 기분이에요.

먼저, Google Fonts에 대해 이야기해보죠. 아름다운 폰트를 좋아하는 사람이 누구일까요? Google Fonts를 이용하면 몇 줄의 코드로 전문적으로 보이는 폰트를 사이트에 추가할 수 있어요.

Google Fonts를 사용하는 몇 가지 방법이 있어요:

- `link` 태그를 통한 링크 추가: 아래 코드를 HTML의 헤드 부분에 추가하세요:

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
[Google Fonts](https://fonts.google.com/)에서 가져올 글꼴 패밀리(Lato, Poppins, Roboto)를 지정한 것입니다.
여러 개의 매개변수를 분리하는 데 사용되는 '&(앤드)'입니다.
글꼴 디스플레이 옵션을 지정하는데, 여기서 'swap(스왑)'은 사용자 정의 글꼴이 로드될 때까지 시스템 글꼴로 일시적으로 대체됨을 의미합니다.

2. @import 규칙을 통해 가져오기: CSS에 다음 내용을 추가하세요::

@import url('https://fonts.googleapis.com/css2?family=Lato&family=Poppins&family=Roboto&display=swap');

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

3. 폰트 패밀리 속성 사용하기: CSS에 다음을 추가하세요:

body { font-family: 'Lato', 'Poppins', 'Roboto', sans-serif; }

다음으로, 배경에 대해 이야기해 볼까요? 누가 배경 이미지나 색상을 좋아하지 않겠어요? CSS를 사용하면 다양한 종류의 배경을 사이트에 추가할 수 있습니다.

다음은 배경을 사용하는 몇 가지 방법입니다:

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

- 단색: 단색 배경을 원하시나요? 쉬워요! body에 ' background-color: #f2f2f2; '을 추가하세요.
- 이미지: 배경 이미지를 추가해보세요: body에 ' background-image: url(`이미지.jpg`); '를 넣어보세요.
- 그라데이션: 그라데이션이 멋져요! body에 ' background: linear-gradient(to bottom, #f2f2f2, #ffffff); '를 적용해보세요.
- 반복 패턴: 반복 패턴을 적용해보세요: body에 ' background-image: url(`패턴.png`); background-repeat: repeat; '을 추가하세요.

셀렉터는 CSS에서 강력한 도구입니다. 이 도구를 활용하여 원하는 요소를 선택하고 스타일을 적용할 수 있어요.

다음은 셀렉터를 사용하는 방법입니다:

- ID 셀렉터: ID로 요소를 스타일링하고 싶다면? '#header'에 ' background-color: #f2f2f2; '를 넣어보세요.
- 클래스 셀렉터: 클래스로 요소를 스타일링해보세요: '.header'에 ' background-color: #f2f2f2; '를 적용해보세요.
- 태그 셀렉터: 모든 h1 태그를 스타일링해보세요: 'h1'에 ' font-size: 36px; '를 적용해보세요.
- 속성 셀렉터: 특정 속성을 갖는 입력란을 스타일링해보세요: 'input[type="email"]'에 ' border: 1px solid #ccc; '를 추가해보세요.

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

마지막으로, 속성과 값에 대해 이야기해 봅시다! 이들은 CSS의 기본 구성 요소입니다. 속성과 값으로 사이트를 마음대로 스타일링할 수 있어요.

여기 몇 가지 예시가 있어요:

- 글꼴 크기: 텍스트 크게 만들기: h1 ' font-size: 36px; '
- 색상: 텍스트 색상 변경: h1 ' color: #333; '
- 안쪽 여백: 여백 추가하기: div ' padding: 20px; '
- 테두리: 테두리 추가하기: div ' border: 1px solid #ccc; '

지금까지 입니다만, CSS에는 여러분을 위한 더 많은 비밀과 놀라움이 숨어 있어요.
곧 다음 글을 기대해 주세요. 고급 주제를 더 자세히 다룰 거예요!