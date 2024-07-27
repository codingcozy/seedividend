---
title: "자바스크립트를 사용하여 한 HTML 페이지에서 다른 페이지로 값 전달하는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-HowToPassValueFromOneHTMLPageToAnotherUsingJavaScript_0.png"
date: 2024-07-09 18:12
ogImage:
  url: /assets/img/2024-07-09-HowToPassValueFromOneHTMLPageToAnotherUsingJavaScript_0.png
tag: Tech
originalTitle: "How To Pass Value From One HTML Page To Another Using JavaScript"
link: "https://medium.com/@cyberbotmachines/how-to-pass-value-from-one-html-page-to-another-using-javascript-3c9ab62df4d"
---

JavaScript의 힘을 활용하여 HTML 페이지 간에 값 전달하는 간단한 튜토리얼입니다.

![이미지](/ui-log-2/assets/img/2024-07-09-HowToPassValueFromOneHTMLPageToAnotherUsingJavaScript_0.png)

# TL;DR 요약

다른 HTML 페이지로 전달하고 싶은 간단한 텍스트나 숫자 값을 가지고 있다면 URL 매개변수를 사용하는 것이 가장 간단합니다.
(더 자세한 정보는 다음 섹션을 참조하세요.)

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

URL 매개변수 값을 설정하는 방법이 두 가지 있어요.

다른 페이지로 값을 전달하는 첫 번째 방법은 링크에 직접 값을 추가하는 것입니다:
`a href=”second_page.html?greeting=hello”`link`/a`
두 번째 방법은 JavaScript를 통해 값을 전달하는 것입니다:
window.location.href = “/second_page.html?greeting=hello”;
(이렇게 하면 링크를 클릭한 것과 같은 효과가 납니다)

값을 추가하는 간단한 방법은 정적 값이 있는 경우에는 괜찮지만 변수가 있는 경우에는 JavaScript가 유일한 옵션입니다.

그런 다음 두 번째 페이지에서는 URL 매개변수에서 값을 읽기만 하면 돼요.

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

# 추가 정보

전체 객체를 전달하려면 URL 매개변수를 통해 그렇게 하는 것이 현실적이지 않을 수 있습니다.

또한 URL 크기에는 2000자의 제한이 있습니다. 즉, URL을 통해 전달할 수 있는 데이터 양이 매우 제한적이라는 것을 의미합니다.

그런 경우에는 이미 브라우저에 내장된 localStorage 객체를 사용하는 것이 가장 좋습니다.

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

로컬스토리지는 무엇일까요?

로컬스토리지는 웹사이트의 모든 페이지에서 액세스할 수 있는 객체입니다.

로컬스토리지의 장점은 저장된 값들은 즉시 모든 페이지에서 사용할 수 있다는 것입니다.

따라서 다른 페이지로 이동해도 localStorage에 저장한 모든 값이 계속해서 사용할 수 있다는 점이 좋습니다.

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

웹사이트에서 사용하는 간단한 예제를 보여드릴게요:

중요:
localStorage에 대한 주의할 점 하나 있어요: 객체를 저장할 수 없다는 건데요.

해결책은 당신의 객체를 JSON 문자열로 변환하여 localStorage에 저장하는 것이에요. 그리고 다른 페이지에서 사용하고 싶을 때는 다시 원래 객체로 변환하면 돼요.

객체를 문자열로 변환하는 방법은 다음과 같아요:
JSON.stringify(myObject);

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

여기서 문자열을 객체로 변환하는 방법입니다:
JSON.parse(myObjectString);

이제 실제 코드 예제가 있습니다:

그리고 localStorage에서 모든 데이터를 삭제하려면 다음을 실행하십시오:
localStorage.clear();

HTML 페이지 간에 JavaScript를 사용하여 값을 전달하는 방법은 이것이 전부입니다.

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

위 내용은 다음과 같이 변환해 주시면 됩니다:

또한 JavaScript img onclick 이벤트에 관한 기사들과 html 입력 통화 및 텍스트 영역 기본 값에 대한 내용을 좋아하실 것 같습니다.

다음에 또 만나요,
윌
시니어 개발자 & SEO 알고 전문가

FYI — 창업 시 성공률을 높이고 싶다면 — 웹 사이트로의 무료 트래픽을 어떻게 확보하는지 배우세요. 왜냐하면 웹 트래픽이 없으면 창업이 아니라 꿈일 뿐입니다.
