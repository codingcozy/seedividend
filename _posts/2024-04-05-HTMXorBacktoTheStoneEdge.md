---
title: "HTMX란 무엇인가"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "HTMX or Back to The Stone Edge"
link: "https://medium.com/@sviat-kuzhelev/htmx-or-back-to-the-stone-edge-20f3b4c8d039"
isUpdated: true
---

<img src="/assets/img/HTMXorBacktoTheStoneEdge_0.png" />

요즘에는 비교적 최근에 출시된 HTMX 라이브러리 주변에 한 종류의 붐이 있습니다.

모두가 이에 대해 이야기하고, 시도해 보기를 권장하며, 심지어 이를 기반으로 데이터 처리를 숙달하기 위한 강좌도 시작하고 있습니다.

하지만 HTMX가 무엇인가요? 솔직히 말해서 메인 페이지에는 그에 대해 많은 정보가 없지만:

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

그들의 웹사이트에서 찾을 수 있는 정보에 따르면, 그들은 React의 인기에 거의 도달했습니다. Angular을 뛰어넘어 가장 인기 있는 것으로 주장하고 있습니다(그러나 Vue가 더 뛰어난 것 같나요?). 그러나 이를 증명할 수 있는 비교나 존경받는 기관은 없습니다.

## 그렇다면 기술적 측면은 어떤가요?

우리의 여정은 원시 HTML에서부터 시작하여 jQuery와 같은 특별한 특성이 추가된 HTML로 발전해왔으며, 이제 우리가 있는 곳으로 이끌어주었습니다. 우리에게 기회를 제공하여 NextGen 라이브러리와 프레임워크인 React 및 Angular와 같은 접착성 추상화 위에 코드를 작성할 수 있게 해주었습니다.

...하지만 지금은 180도 돌아가 돌아선 것 같아요.

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

그들은 HTMX의 간단함과 정확성이 우리를 먼 곳으로 이끌 수 있다고 말했어요. 잘 알려진 HTML을 사용하면서 "X"와 같은 특별한 소스로 시작할 수 있어요. HTML 태그에 바로 추가 속성을 넣는 것입니다:

```js
  <script src="https://unpkg.com/htmx.org@1.9.11"></script>
  <!-- 버튼을 클릭하여 AJAX를 통해 POST 요청 보내기 -->
  <button hx-post="/clicked" hx-swap="outerHTML">
    Click Me
  </button>
```

이 버튼에 있는 hx-post와 hx-swap 속성은 htmx에게 다음과 같이 알려줍니다:

첫 번째 "Hello World" 앱을 쉽게 따라하고 작성할 수 있지만, 한 번 생각해보세요 — "이것을 어떻게 확장해서 실제 프로젝트의 전반적인 추상화를 유지하면서 유지 가능하게 할까요?"

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

React와 같은 잘 알려진 것들의 목적은 쉽게 쓸 수 있는 것들을 억지로 강요하거나 말하는 것이 아닙니다. 대신에 앱을 빛나게 만들어 줄 도구와 추상화를 제공하는 것입니다.

지금 HTMX를 네이티브처럼 생각하는 것이나 기본적으로 웹 개발에 사용되어야 하는 것으로 여기는 것은 잘못된 주장입니다. 웹 구성 요소에 대해 알고 있는 모두들입니다. 사실은 그것들을 사용하도록 권장하는 몇 년 된 이후에도 아직 이용할 수 없습니다.

이에는 이유가 있습니다 — 유지 보수 가능한 추상화가 없기 때문입니다.

## 사용해야 할까요?

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

HTMX는 웹 개발에 다양한 혜택을 제공하지만, 간결함, 점진적 향상, 보일러플레이트 감소, 그리고 서버 사이드 통합의 부드러운 흐름을 포함합니다. 그러나 전체적으로 채택을 주저할 만한 이유들도 있습니다.

HTMX의 간결함은 가끔 그 내재적 제약을 가리기도 합니다, 특히 기능 측면에서는요.

기본적인 클라이언트 측 상호작용을 촉진하는 데 뛰어나지만, 복잡한 UI 구성 요소나 고급 상태 관리를 필요로 하는 더 복잡한 애플리케이션들은 HTMX가 부족한 부분을 느낄 수 있습니다.

게다가 점진적 향상의 원칙은 훌륭하지만, HTMX 통합을 위해 서버 사이드 프레임워크에 의존하면 애플리케이션을 특정 기술에 묶어 유연성을 제한하고 향후 확장성을 방해할 수 있습니다.

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

이 종속성은 장기적 관리 가능성과 계속 발전하는 기술적 환경에 대한 적응력에 대한 우려를 불러일으킵니다.

## 마무리

HTMX의 커뮤니티와 생태계의 초기 단계는 고려해야 할 사항을 도입합니다.

이것은 이미 확립된 JavaScript 프레임워크에 비해 더 간단한 대안을 제공할 수 있지만, 자원, 자습서 및 제3자 플러그인/확장 기능의 상대적 부족은 지원, 확장성 및 미래 지원 측면에서 도전을 제공할 수 있습니다.

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

프로젝트의 구체적인 요구 사항, 복잡성 및 장기적 목표에 따라, 개발자들은 HTMX와 관련된 제한 사항과 의존성이 즉시 제공되는 장점을 상쇄시키는 정도로 커질 수 있음을 발견할 수 있습니다. 이로 인해 심층적인 에러 중심의 대안 솔루션을 탐색하여 간결함과 유연성 사이의 균형 잡힌 교환을 제공하는 솔루션을 탐색하는 경우가 있습니다.

매달 시도해볼 수있는 프레임 워크 및 라이브러리가 더 많아지면서 HTML은 정말 멋진 것입니다. 분명히 그것과 놀 때 즐겁게 할 것입니다. 그러나 실제 프로젝트에 통합하는 데 혜택이 될 수 있는지 고려해보세요.
