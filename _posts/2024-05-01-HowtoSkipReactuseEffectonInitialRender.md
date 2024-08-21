---
title: "React의 useEffect를 초기 렌더링 단계에서 건너뛸 수 있는 방법"
description: ""
coverImage: "/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_0.png"
date: 2024-05-01 17:40
ogImage:
  url: /assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_0.png
tag: Tech
originalTitle: "How to Skip React useEffect on Initial Render"
link: "https://medium.com/@dpericich/how-to-bypass-useeffect-on-your-first-page-render-c31b7ba112a7"
isUpdated: true
---

![이미지](/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_0.png)

많은 React 개발자들이 클래스 컴포넌트보다 함수 컴포넌트를 선호합니다. 함수 컴포넌트는 더 작고, 자체 상태를 관리하는 자식 UI 요소를 구성하는 기능을 제공합니다. 그러나 몇 가지 단점이 있습니다. 최근 버그 찾기 세션에서 한 가지 문제점은 함수 컴포넌트의 초기 렌더 기능을 제어할 수 없다는 것이었습니다. 폼 페이지의 첫 번째 렌더에서 useEffect 호출을 우회하지 않아 발생한 오류를 발견했을 때 이것이 분명해졌습니다.

## useEffect와 어떤 문제가 있었나요?

useEffect 훅은 React 개발자들이 컴포넌트 상태에 기반한 작업을 대기열에 넣을 수 있게 합니다. React는 JQuery와 같은 선행자들과 다르게 상태 유지(stateful) 또는 상태 없음(stateless) 컴포넌트를 구축할 수 있도록 허용합니다. 이러한 컴포넌트는 내부 상태 변수를 통해 사용자 상호작용과 데이터를 추적할 수 있습니다.

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

useEffect 훅은 상태를 가지고 있는 컴포넌트의 기능을 더 발전시킵니다. useEffect의 주요 부분은 작업을 수행하는 콜백 함수와 변경 사항을 감시할 상태 변수의 배열입니다. 상태 변수 중 하나라도 변경되면 콜백이 실행됩니다:

![이미지](/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_1.png)

이 훅을 사용하면 상태 변경으로부터 작업을 트리거할 수 있지만 일부 제한 사항이 있습니다. 우리가 주로 다루는 주요 제한 사항은 useEffect 콜백이 초기 렌더링 중에 호출되어 앱에 의도치 않은 부작용을 일으킬 수 있다는 것입니다.

## 멀티 셀렉트에서 제품 데이터 로드하기

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

이 문제와 해결책을 살펴보려면 사용자가 목록에서 항목을 선택하고 모든 항목의 정보를 볼 수 있는 페이지를 만드는 티켓을 받았다고 상상해보세요. 사용자는 초기 페이지 로드에 검색 창을 사용하여 임의의 쿼리 용어를 입력할 수 있습니다. 이 쿼리는 API 호출을 트리거하여 서버에서 연속되는 검색 용어 항목 컬렉션을 반환합니다.

<img src="/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_2.png" />

이 페이지의 상태를 설정하는 일반적인 방법은 검색 창을 제어 컴포넌트로 만드는 것입니다 (즉, 부모 페이지 컴포넌트가 이 입력 상태를 유지하고 쿼리 값을 다시 입력으로 보내 표시합니다) 그리고 입력에 대한 onChange 이벤트 핸들러를 갖는 것입니다. 불필요한 API 호출을 피하기 위해 입력에 debounce를 추가하여 키가 눌릴 때마다 API 호출을 방지할 수 있습니다. 쿼리는 제품에 대한 API 호출을 트리거할 useEffect 훅에 추가됩니다.

이 프로세스의 요약은 다음과 같습니다: 사용자가 텍스트 입력란에 용어를 입력하면 입력이 쿼리 상태를 업데이트하고 쿼리 상태가 useEffect를 트리거하여 데이터를 얻기 위해 API에 요청을 보냅니다:

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

![이미지](/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_3.png)

이론적으로는 텍스트 입력란에 사용자가 입력할 때마다 API 호출을 하는 좋은 설정이 있습니다. 실제로 콘솔을 열면 페이지가 처음로드될 때 useState의 쿼리에 대한 기본값이 무엇이냐에 따라 쿼리 용어로 '정의되지 않음' 또는 빈 문자열과 함께 API 호출이 트리거됨을 볼 수 있습니다. useEffect가 일찍 호출되어 불필요하게 호출됩니다.

## useRef를 사용하여 초기 렌더링 useEffect 호출 우회 방법

문서에서 명확하지 않지만, 컴포넌트가 로드될 때 상태 변수들이 초기로 설정되면 useEffect 훅이 값이 변경되거나 정의될 때 트리거되어 부작용을 일으킬 수 있습니다. 초기 렌더링에 대한 useEffect 동작을 우회해야 합니다.

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

어떻게 해야 할까요? 제가 찾은 가장 좋은 방법은 useRef 훅을 사용하는 것입니다. 이 훅을 사용하면 상태와는 관련이 없는 값을 설정하고 참조할 수 있습니다. 그 문장의 마지막 부분이 중요한데요, 상태 변경은 다른 훅 및 컴포넌트가 어떻게 그리고 언제 다시 렌더링되는지에 영향을 미치게 됩니다.

페이지가 초기 렌더링되었는지 여부를 확인하여 useEffect가 사용자 상호작용에서 호출되었는지 알아내고 싶습니다. 이를 위해 hasPageBeenRendered용 useRef 변수를 만들 수 있습니다. 그 후에 useRef 변수를 참조하는 조건부 래퍼로 useEffect 콜백을 감쌀 수 있습니다. 간단한 예는 다음과 같습니다:

![이미지](/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_4.png)

React 변수를 가져와서 useRef 변수를 초기화하고, useState로 쿼리 값을 초기화하고, API 호출 로직을 설정합니다. useRef의 초기 상태는 false이므로 useRef를 true로 설정하기 전에 API 호출을 우회합니다. 이후 API 호출 로직으로 들어가서 데이터베이스를 쿼리하여 다음 호출에 대한 정보를 가져옵니다.

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

## 이 방식의 문제점

이제 브라우저와 서버 콘솔에서 불필요한 호출과 오류가 사라져 좋은 결과를 거뒀네요. 그러나, 이것은 간단한 예제일 뿐입니다. 만약 우리가 초반 트리거를 방지하고 싶은 여러 useEffect 메소드가 있다면 어떻게 될까요?

각각의 useEffect에 대해 별도의 useRef 변수를 생성할 수 있습니다. 각각의 useEffect가 초기 렌더링 시 호출되는 것을 막고 싶다면 우리는 각 useEffect에 대해 하나의 useRef를 생성할 수 있습니다. 이 방법도 가능하지만, 더 복잡한 로직이 들어갈수록 컴포넌트 헤더가 엉망이 될 것입니다.

각 useEffect에 새로운 useRef를 추가하는 대신에, useRef 값을 다차원으로 만들어서는 어떨까요? 현재 useRef는 부울 값을 설정 및 업데이트하고 있습니다. 코드를 정리하기 위해 useRef 값을 해시로 설정하여 각 키가 다른 useEffect를 가리키도록 할 수 있습니다. 이렇게 보일 것입니다:

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

아래는 Markdown 형식으로 표현한 내용입니다.

![How to Skip React useEffect on Initial Render](/assets/img/2024-05-01-HowtoSkipReactuseEffectonInitialRender_5.png)

이러한 방법으로 중앙 useRef 변수로 모든 로직을 관리할 수 있어요. 이 작은 수정으로 함수 컴포넌트를 지저분하게 만들지 않으면서도 많은 useEffect를 관리할 수 있어요.
