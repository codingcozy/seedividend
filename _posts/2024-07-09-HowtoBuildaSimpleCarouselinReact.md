---
title: "React에서 간단한 캐러셀 만드는 방법"
description: ""
coverImage: "/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_0.png"
date: 2024-07-09 18:43
ogImage:
  url: /assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_0.png
tag: Tech
originalTitle: "How to Build a Simple Carousel in React"
link: "https://medium.com/bitsrc/simple-carousel-in-react-2aac73887243"
---

최근 프로젝트에서 제공되는 서비스를 쇼케이스하기 위해 캐러셀을 구현해야 했어요.

문제는, 단일 컴포넌트를 위해 전체 UI 라이브러리를 사용하고 싶지 않았다는 거였어요.

해결책은?

내 프로젝트에 맞는 간단한 캐러셀을 직접 만들어 사용하는 거예요.

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

![Carousel Step 1](/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_0.png)

# 로직, HTML 및 CSS 먼저 조사해보기

카루셀을 논리적 수준에서 어떻게 분해할까요? 무엇이 일어나는지 상상하면서요. 카루셀은 부모 컨테이너 블록인 carousel-container에 놓인 수많은 항목 — carousel-item들이 가로로 배열된 것 이상도 이하도 아닙니다. 맞나요?

![Carousel Step 2](/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_1.png)

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

기본적인 캐러셀 구조를 만들었으니 이제 CSS의 힘을 빌려 멋있게(약간) 꾸밀 때입니다. carousel 클래스는 부모 요소에 바운드를 설정하고 .carousel-item은 캐러셀 안에 표시될 항목에 대한 스타일을 설정합니다. 캐로셀의 동작을 조금 덜 지루하게 만들기 위해 transition 속성을 사용했어요.

![이미지](/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_2.png)

# 동작 추가하기

이제 구성 요소가 정적으로 완료되었으니, 이것이 수행해야 할 일을 실제로 수행하도록 넘어갈 차례입니다. 이 컴포넌트를 만드는 두 가지 방법이 있었는데요 — 캐러셀 블록 양쪽에 수동으로 항목을 변경하는 다음 및 이전 버튼을 두는 방법 또는 루프에서 계속 타일을 변경하도록 만드는 것입니다. 저는 두 번째 옵션을 선택했습니다.

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

이 구성요소를 테스트하기 위해 문자열 배열을 선언했습니다 — const data = [“1”, “2”, “3”, “4”]. 이들이 내 캐러셀 항목이 될 것입니다. 그 다음으로, 캐러셀 항목의 인덱스를 관리하기 위해 상태(state)를 사용했습니다. 이를 위해 다음과 같이 선언했습니다. 기본 상태는 0입니다: const [currentIndex, setCurrentIndex] = useState(0).

만약 현재 currentIndex로 데이터 배열에서 항목을 가져와야 한다면, “1”을 가져오게 될 것입니다. 이제 남은 일은 currentIndex 값을 계속 증가시키되 데이터.length — 1에 도달하면 다시 0으로 재설정하고 반복하는 것입니다.

<img src="/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_3.png" />

currentIndex를 처리하기 위해, 3초 간격으로 실행될 함수를 만들었고(이는 캐러셀 항목이 다음 항목으로 이동하기 전에 얼마나 오래 표시될지를 결정할 것입니다), 이 함수를 useEffect() 내에서 호출했습니다.

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

useEffect()을 사용할 때 주의할 점은 부수 효과를 다루는 것입니다. 구독이 있기 때문에 컴포넌트가 언마운트되면 부수 효과를 처리해줄 클린업 함수도 작성해야 합니다.

![Carousel](/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_4.png)

# 최종 조립

카루셀 항목과 카루셀 컨테이너가 준비되었으니, 이제 마지막 단계로 모든 조각들을 함께 조립하여 카루셀을 만들어 보겠습니다. 사용 중인 더미 데이터가 있기 때문에 간단히 array.map() 메서드를 사용하여 화면에 렌더링하는 것이 간단했습니다.

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

이제 내가 원했던 대로 동작하는 컴포넌트가 마침내 완성되었습니다. 원하는 것을 표시하는 간단한 캐로셀입니다. h1 태그를 컴포넌트, 이미지 또는 다른 것으로 쉽게 변경할 수 있습니다. 그런 다음 해당 CSS를 조정하면 됩니다.

![이미지](/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_5.png)

이렇게하여 캐로셀을 만들었습니다. 캐로셀을 만드는 다른 방법이나 더 좋은 방법이 있을 수 있지만, 이것이 가장 쉬운 방법입니다.

더 알아보기:

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

작은 단계별 React 컴포넌트 빌딩을 즐겼길 바라요.

읽어 주셔서 감사합니다.

# 레고처럼 재사용 가능한 구성 요소로 React 앱 빌드하기

<img src="/ui-log-2/assets/img/2024-07-09-HowtoBuildaSimpleCarouselinReact_6.png" />

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

Bit의 오픈 소스 도구를 사용하면 25만 명 이상의 개발자들이 구성 요소로 앱을 구축할 수 있어요.

어떤 UI, 기능 또는 페이지를 재사용 가능한 구성 요소로 전환하고 애플리케이션 간에 공유하세요. 협업하기 쉽고 빠른 속도로 빌드할 수 있어요.

→ 더 알아보기

앱을 구성 요소로 분할하여 앱 개발을 쉽게 만들고 원하는 워크플로에 최적화된 최상의 경험을 누려보세요:

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

# → 마이크로 프론트엔드

# → 디자인 시스템

# → 코드 공유 및 재사용

# → 모노 리포

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

# 더 많은 정보:
